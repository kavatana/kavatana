import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
REQUIRED_FILES = [
    "README.md",
    "AGENTS.md",
    "CLAUDE.md",
    "CONTRIBUTING.md",
    "SECURITY.md",
    ".github/CODEOWNERS",
    ".github/copilot-instructions.md",
    ".github/workflows/ci.yml",
    ".github/dependabot.yml",
    ".gitignore",
    "package.json",
    "docs/AI_NATIVE_WORKFLOW.md",
    "docs/GITHUB_ACCOUNT_CLEANUP.md",
    "content/startup-portfolio.json",
    "content/projects/studio-os.json",
]
REQUIRED_GUIDE_TERMS = [
    "public proof",
    "private startup",
    "verify claims",
    "npm run verify",
    "AI involvement",
]
STALE_STUDIO_OS_CLAIMS = [
    "zero network calls",
    "zero private information",
    "zero private personal data",
    "tree-shakes my real data",
    "tree-shaking my real identity",
    "no server business logic",
    "intentionally no backend, database, or api",
]
SECRET_PATTERNS = [
    re.compile(r"(?:ghp|gho)_[A-Za-z0-9]{20,}"),
    re.compile(r"github_pat_[A-Za-z0-9_]{20,}"),
    re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----"),
]
MEDIA_SUFFIXES = {".avif", ".gif", ".jpeg", ".jpg", ".mp3", ".png", ".webp"}
SOURCE_TEXT_SUFFIXES = {".css", ".js", ".json", ".md", ".mjs", ".ts", ".vue"}
FORBIDDEN_STALE_PATHS = {
    "generate_components.js",
    "remove_bg.py",
    "remove_bg_v2.py",
    "review/final-visual-polish",
    "scripts/capture-phsaros.mjs",
    "unrealmicikcz12-mystic-realm-of-minecraft-235545.mp3",
}
REQUIRED_STARTUP_TRACKS = {
    "bayonhub",
    "svaeng-yul",
    "chomkar",
    "sat-digital",
    "vantrex",
    "phsaros",
    "chnai-lab",
}
ALLOWED_STARTUP_STATUSES = {"building", "incubating", "operating"}
PINNED_ACTIONS = {
    "actions/checkout": "9c091bb21b7c1c1d1991bb908d89e4e9dddfe3e0",
    "actions/setup-node": "820762786026740c76f36085b0efc47a31fe5020",
}


def read(relative_path: str) -> str:
    path = ROOT / relative_path
    if not path.is_file():
        raise SystemExit(f"Missing required file: {relative_path}")
    content = path.read_text(encoding="utf-8")
    if not content.strip():
        raise SystemExit(f"Required file is empty: {relative_path}")
    return content


def verify_content_json() -> None:
    for path in sorted((ROOT / "content").rglob("*.json")):
        try:
            json.loads(path.read_text(encoding="utf-8"))
        except json.JSONDecodeError as error:
            raise SystemExit(f"Invalid JSON in {path.relative_to(ROOT)}: {error}") from error


def verify_package_scripts() -> None:
    scripts = json.loads(read("package.json")).get("scripts", {})
    for name in ["check:repo", "typecheck", "lint", "generate", "verify"]:
        if not scripts.get(name):
            raise SystemExit(f"package.json is missing script: {name}")


def verify_startup_portfolio() -> None:
    tracks = json.loads(read("content/startup-portfolio.json"))
    if not isinstance(tracks, list):
        raise SystemExit("content/startup-portfolio.json must contain a list")

    ids = [track.get("id") for track in tracks if isinstance(track, dict)]
    if len(ids) != len(tracks) or len(ids) != len(set(ids)):
        raise SystemExit("Startup portfolio track IDs must be present and unique")

    actual = set(ids)
    if actual != REQUIRED_STARTUP_TRACKS:
        missing = sorted(REQUIRED_STARTUP_TRACKS - actual)
        unexpected = sorted(actual - REQUIRED_STARTUP_TRACKS)
        raise SystemExit(
            f"Startup portfolio mismatch; missing={missing}, unexpected={unexpected}"
        )

    for track in tracks:
        for field in ["name", "category", "summary", "status", "statusLabel"]:
            if not isinstance(track.get(field), str) or not track[field].strip():
                raise SystemExit(f"Startup track {track['id']} is missing {field}")
        if track["status"] not in ALLOWED_STARTUP_STATUSES:
            raise SystemExit(
                f"Startup track {track['id']} has unsupported status: {track['status']}"
            )
        href = track.get("href")
        if isinstance(href, str) and href.startswith("/projects/"):
            project_id = href.removeprefix("/projects/")
            if not (ROOT / "content" / "projects" / f"{project_id}.json").is_file():
                raise SystemExit(f"Startup track {track['id']} links to a missing case study")


def verify_claims() -> None:
    studio_os = read("content/projects/studio-os.json").casefold()
    stale = [claim for claim in STALE_STUDIO_OS_CLAIMS if claim in studio_os]
    if stale:
        raise SystemExit(f"Studio OS contains stale blanket claim(s): {', '.join(stale)}")

    readme = read("README.md").casefold()
    for term in ["bounded workspace", "read-only github", "collaboration system"]:
        if term not in readme:
            raise SystemExit(f"README.md is missing public evidence term: {term}")


def verify_no_credential_shapes() -> None:
    extensions = {".js", ".mjs", ".ts", ".vue", ".json", ".md", ".yml", ".yaml"}
    for path in ROOT.rglob("*"):
        if not path.is_file() or path.suffix.lower() not in extensions:
            continue
        if any(part in {".git", ".nuxt", ".output", "node_modules"} for part in path.parts):
            continue
        content = path.read_text(encoding="utf-8", errors="ignore")
        for pattern in SECRET_PATTERNS:
            if pattern.search(content):
                raise SystemExit(f"Potential credential in {path.relative_to(ROOT)}")


def verify_public_media() -> None:
    for relative_path in FORBIDDEN_STALE_PATHS:
        if (ROOT / relative_path).exists():
            raise SystemExit(f"Stale generated path must not be committed: {relative_path}")

    references: set[str] = set()
    for path in ROOT.rglob("*"):
        if not path.is_file() or path.suffix.lower() not in SOURCE_TEXT_SUFFIXES:
            continue
        if any(part in {".git", ".nuxt", ".output", "node_modules", "public"} for part in path.parts):
            continue
        content = path.read_text(encoding="utf-8", errors="ignore")
        references.update(
            re.findall(
                r"/(?:audio|images)/[A-Za-z0-9._/-]+\.(?:avif|gif|jpe?g|mp3|png|webp)",
                content,
            )
        )

    public_media = {
        f"/{path.relative_to(ROOT / 'public').as_posix()}"
        for path in (ROOT / "public").rglob("*")
        if path.is_file() and path.suffix.lower() in MEDIA_SUFFIXES
    }
    missing = sorted(references - public_media)
    orphaned = sorted(public_media - references)
    if missing:
        raise SystemExit(f"Referenced public media is missing: {', '.join(missing)}")
    if orphaned:
        raise SystemExit(f"Unreferenced public media must be removed: {', '.join(orphaned)}")


def verify_ci_hardening() -> None:
    workflow = read(".github/workflows/ci.yml")
    if not re.search(r"(?m)^permissions:\s*\n\s+contents:\s+read\s*$", workflow):
        raise SystemExit("CI must declare least-privilege contents: read permissions")

    action_uses = re.findall(r"(?m)^\s*uses:\s*([^\s#]+)", workflow)
    if not action_uses:
        raise SystemExit("CI workflow does not use any actions")
    for action_use in action_uses:
        action, separator, revision = action_use.partition("@")
        if not separator or not re.fullmatch(r"[a-f0-9]{40}", revision):
            raise SystemExit(f"CI action is not pinned to an immutable commit: {action_use}")
        expected = PINNED_ACTIONS.get(action)
        if expected and revision != expected:
            raise SystemExit(f"CI action pin changed without verifier review: {action_use}")

    dependabot = read(".github/dependabot.yml")
    if 'package-ecosystem: "github-actions"' not in dependabot:
        raise SystemExit("Dependabot must monitor the github-actions ecosystem")


def main() -> None:
    for path in REQUIRED_FILES:
        read(path)

    guide = read("AGENTS.md").casefold()
    missing_terms = [term for term in REQUIRED_GUIDE_TERMS if term.casefold() not in guide]
    if missing_terms:
        raise SystemExit(f"AGENTS.md is missing required terms: {', '.join(missing_terms)}")

    if ".env*" not in read(".gitignore"):
        raise SystemExit(".gitignore must exclude environment files")

    verify_content_json()
    verify_package_scripts()
    verify_startup_portfolio()
    verify_claims()
    verify_no_credential_shapes()
    verify_public_media()
    verify_ci_hardening()


if __name__ == "__main__":
    main()
