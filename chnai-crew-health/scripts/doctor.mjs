// Local setup inspection only: no installs, network calls, or medical/database reads.
import {spawnSync} from 'node:child_process';
import {existsSync, readFileSync, mkdirSync, writeFileSync} from 'node:fs';
import {arch, cpus, platform, release, totalmem} from 'node:os';
import {fileURLToPath} from 'node:url';
import {join} from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const python = process.env.CHNAI_PYTHON ?? join(root, '.venv/bin/python');
const manifest = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const pins = Object.fromEntries(readFileSync(join(root, 'api/requirements.lock'), 'utf8').trim().split('\n').map(line => line.trim().split('==')));
const checks = [{name: 'Node 22 or newer', passed: Number(process.versions.node.split('.')[0]) >= 22}];
let pythonInfo = null;
if (existsSync(python)) {
  const code = `import json, sys, sqlite3, importlib.metadata as m
pins=json.loads(sys.stdin.read())
installed={}
for name in pins:
    try: installed[name]=m.version(name)
    except m.PackageNotFoundError: installed[name]=None
print(json.dumps({'version':sys.version.split()[0], 'sqlite':sqlite3.sqlite_version, 'installed':installed}))`;
  const result = spawnSync(python, ['-c', code], {input: JSON.stringify(pins), encoding: 'utf8', timeout: 15000, cwd: root});
  if (result.status === 0) {
    try { pythonInfo = JSON.parse(result.stdout); } catch { /* Failed probe stays explicit. */ }
  }
}
checks.push({name: 'Python runtime available', passed: !!pythonInfo});
checks.push({name: 'Python 3.12 qualification baseline', passed: /^3\.12\./.test(pythonInfo?.version ?? '')});
const mismatches = Object.entries(pins).filter(([name, version]) => pythonInfo?.installed[name] !== version)
  .map(([name, expected]) => ({package: name, expected, installed: pythonInfo?.installed[name] ?? null}));
checks.push({name: 'Pinned Python dependencies installed', passed: mismatches.length === 0});
const git = spawnSync('git', ['rev-parse', 'HEAD'], {cwd: root, encoding: 'utf8', timeout: 2000});
const report = {
  schema: 'chnai-readiness/1', observedAt: new Date().toISOString(), projectVersion: manifest.version,
  sourceCommit: git.status === 0 ? git.stdout.trim() : null,
  runtime: {platform: platform(), architecture: arch(), osRelease: release(), cpu: cpus()[0]?.model ?? 'Unknown',
    memoryGiB: Math.round(totalmem() / 1024 ** 3 * 10) / 10, node: process.versions.node,
    python: pythonInfo?.version ?? null, sqlite: pythonInfo?.sqlite ?? null},
  checks, dependencyMismatches: mismatches,
  scope: 'Setup inspection only. No browser, clinical, real-device, LLM or performance qualification.',
  targetMacTest: platform() === 'darwin' ? 'Hardware reported; manual walkthrough still required.' : 'Not run on target Mac.',
};
const folder = join(root, '.runtime/qualification');
mkdirSync(folder, {recursive: true, mode: 0o700});
const filename = `readiness-${report.observedAt.replace(/[:.]/g, '-')}.json`;
writeFileSync(join(folder, filename), JSON.stringify(report, null, 2) + '\n', {flag: 'wx', mode: 0o600});
console.log(`CHNAI ${manifest.version} — local setup readiness`);
for (const check of checks) console.log(`${check.passed ? 'PASS' : 'BLOCKED'}  ${check.name}`);
console.log(`Host: ${report.runtime.platform}/${report.runtime.architecture} · ${report.runtime.memoryGiB} GiB RAM`);
console.log(`Local report: .runtime/qualification/${filename}`);
if (mismatches.length) console.log('Install the pinned dependencies using the README Python setup command.');
console.log('Next: docs/LOCAL_ACCEPTANCE.md. Browser and actual Mac qualification are separate.');
process.exitCode = checks.every(check => check.passed) ? 0 : 1;
