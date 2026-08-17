#!/usr/bin/env python3
"""Tests for optional extension transaction plans."""

from __future__ import annotations

import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from claude_obsidian.extensions import dragonscale_bundle
from claude_obsidian.transaction import apply_bundle, inspect_bundle


class ExtensionTests(unittest.TestCase):
    def vault(self, parent: Path) -> Path:
        root = parent / "vault"
        (root / "wiki").mkdir(parents=True)
        (root / ".raw").mkdir()
        return root

    def bundle(self, vault: Path, operation_id: str = "dragonscale-test") -> dict:
        return dragonscale_bundle(
            vault,
            operation_id=operation_id,
            generated_at="2026-07-11T12:00:00Z",
        )

    def test_plan_is_read_only_and_apply_is_create_only(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            vault = self.vault(Path(directory))
            bundle = self.bundle(vault)
            plan = inspect_bundle(vault, bundle)
            self.assertEqual(4, len(plan["changed_paths"]))
            self.assertFalse((vault / ".vault-meta").exists())
            result = apply_bundle(vault, bundle)
            self.assertEqual(4, len(result["changed_paths"]))
            self.assertEqual(
                "1\n", (vault / ".vault-meta/address-counter.txt").read_text()
            )
            self.assertIn(
                "# rollout: 2026-07-11",
                (vault / ".vault-meta/legacy-pages.txt").read_text(),
            )

    def test_existing_values_are_preserved_and_rerun_is_noop(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            vault = self.vault(Path(directory))
            meta = vault / ".vault-meta"
            meta.mkdir()
            (meta / "address-counter.txt").write_text("42\n", encoding="utf-8")
            first = self.bundle(vault)
            apply_bundle(vault, first)
            self.assertEqual("42\n", (meta / "address-counter.txt").read_text())
            second = self.bundle(vault, "dragonscale-second")
            self.assertEqual([], second["writes"])
            self.assertEqual("42\n", (meta / "address-counter.txt").read_text())


if __name__ == "__main__":
    unittest.main()
