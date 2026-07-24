from __future__ import annotations

import importlib.util
import tempfile
import unittest
from pathlib import Path
from unittest import mock


SCRIPT_PATH = Path(__file__).resolve().parents[1] / "scripts" / "verify_repo.py"
SPEC = importlib.util.spec_from_file_location("verify_repo", SCRIPT_PATH)
if SPEC is None or SPEC.loader is None:
    raise RuntimeError("Unable to load repository verifier")
verify_repo = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(verify_repo)


class VerifyRepositoryTests(unittest.TestCase):
    def test_current_repository_passes(self) -> None:
        verify_repo.main()

    def test_credential_shape_is_rejected(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "notes.md").write_text("ghp_" + "a" * 40, encoding="utf-8")

            with mock.patch.object(verify_repo, "ROOT", root):
                with self.assertRaisesRegex(SystemExit, "Potential credential"):
                    verify_repo.verify_no_credential_shapes()

    def test_invalid_content_json_is_rejected(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            content = root / "content"
            content.mkdir()
            (content / "broken.json").write_text('{"status":', encoding="utf-8")

            with mock.patch.object(verify_repo, "ROOT", root):
                with self.assertRaisesRegex(SystemExit, "Invalid JSON"):
                    verify_repo.verify_content_json()

    def test_unpinned_ci_action_is_rejected(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            workflow = root / ".github" / "workflows" / "ci.yml"
            workflow.parent.mkdir(parents=True)
            workflow.write_text(
                "permissions:\n"
                "  contents: read\n"
                "jobs:\n"
                "  verify:\n"
                "    steps:\n"
                "      - name: Checkout\n"
                "        uses: actions/checkout@v7\n",
                encoding="utf-8",
            )

            with mock.patch.object(verify_repo, "ROOT", root):
                with self.assertRaisesRegex(SystemExit, "immutable commit"):
                    verify_repo.verify_ci_hardening()


if __name__ == "__main__":
    unittest.main()
