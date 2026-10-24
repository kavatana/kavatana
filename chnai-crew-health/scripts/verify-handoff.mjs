import { readFile, readdir, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, resolve, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(await readFile(resolve(root, 'research/provenance/recovery-manifest.json'), 'utf8'));
let verified = 0;
for (const record of manifest.files) {
  if (!['included', 'existing-project-copy'].includes(record.disposition)) continue;
  const path = resolve(root, record.repository_path);
  const rel = relative(root, path);
  if (rel === '..' || rel.startsWith(`..${sep}`)) throw new Error('Manifest path leaves project');
  const bytes = await readFile(path);
  const actual = createHash('sha256').update(bytes).digest('hex');
  if (actual !== record.repository_sha256) throw new Error(`Research hash mismatch: ${rel}`);
  verified++;
}

async function walk(directory) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) result.push(...await walk(path));
    else if (entry.isFile()) result.push(path);
  }
  return result;
}

let jsonFiles = 0;
for (const path of await walk(resolve(root, 'research'))) {
  if (path.endsWith('.json')) {
    JSON.parse(await readFile(path, 'utf8'));
    jsonFiles++;
  }
}

const navigation = [
  'START_HERE.md', 'CODEX_HANDOFF_PROMPT.md', 'README.md', 'research/README.md', 'research/RECOVERY.md',
  ...(await walk(resolve(root, 'docs/handoff'))).filter(p => p.endsWith('.md')).map(p => relative(root, p)),
];
let links = 0;
for (const name of navigation) {
  const path = resolve(root, name);
  const text = await readFile(path, 'utf8');
  for (const match of text.matchAll(/\[[^\]\n]+\]\(([^)\s]+)\)/g)) {
    const target = match[1].split('#')[0];
    if (!target || /^[a-z][a-z0-9+.-]*:/i.test(target)) continue;
    await stat(resolve(dirname(path), decodeURIComponent(target)));
    links++;
  }
}
console.log(`Handoff verified: ${verified} research-copy hashes, ${jsonFiles} readable JSON files, ${links} local navigation links.`);
console.log('This is artifact integrity, not browser, clinical or historical acceptance-test execution.');
