#!/usr/bin/env python3
"""Distribution boundary and deterministic sample tests."""

from __future__ import annotations

import hashlib
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from claude_obsidian.lint_engine import lint_vault
from claude_obsidian.transaction import apply_bundle
from claude_obsidian.vault_ops import build_vault_bundle


def fingerprint(root: Path) -> dict[str, str]:
    result: dict[str, str] = {}
    for path in sorted(
        candidate for candidate in root.rglob("*") if candidate.is_file()
    ):
        relative = path.relative_to(root).as_posix()
        if relative.startswith(".vault-meta/transactions/"):
            continue
        result[relative] = hashlib.sha256(path.read_bytes()).hexdigest()
    return result


class DistributionVaultTests(unittest.TestCase):
    def test_template_and_sample_are_lint_clean(self) -> None:
        for relative in ("templates/vault", "examples/sample-vault"):
            root = ROOT / relative
            report = lint_vault(root)
            self.assertEqual(0, report["summary"]["issues_found"], (relative, report))
            self.assertFalse((root / ".vault-meta").exists())
            self.assertIn(
                ".vault-meta/",
                (root / ".gitignore").read_text(encoding="utf-8").splitlines(),
            )
            self.assertIn(
                ".mcp.json",
                (root / ".gitignore").read_text(encoding="utf-8").splitlines(),
            )

    def test_two_pinned_initializations_are_byte_identical(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            parent = Path(directory)
            fingerprints = []
            for name in ("first", "second"):
                vault = parent / name
                vault.mkdir()
                operation = build_vault_bundle(
                    vault,
                    operation_id="deterministic-sample",
                    operation_type="setup",
                    generated_at="2026-07-11T00:00:00Z",
                    adopt=False,
                )
                apply_bundle(vault, operation)
                fingerprints.append(fingerprint(vault))
                self.assertFalse((vault / ".git").exists())
                self.assertEqual(0, lint_vault(vault)["summary"]["issues_found"])
            self.assertEqual(fingerprints[0], fingerprints[1])


if __name__ == "__main__":
    unittest.main()
