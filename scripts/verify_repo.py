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


if __name__ == "__main__":
    main()
