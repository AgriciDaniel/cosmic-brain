#!/usr/bin/env python3
"""Adversarial tests for the deprecated lock helper's pinned runtime paths."""

from __future__ import annotations

import os
import sys
import tempfile
import unittest
from pathlib import Path
from unittest import mock

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from claude_obsidian import legacy_lock


def ascii_path_of_length(length: int) -> str:
    value = "missing"
    while len(value) + 2 <= length:
        value += "/a"
    value += "b" * (length - len(value))
    assert len(value.encode("utf-8")) == length
    return value


class LegacyLockRuntimeRaceTests(unittest.TestCase):
    def _fixture(self, temporary: Path) -> tuple[Path, Path, Path, str, str]:
        plugin = temporary / "installed-product"
        plugin.mkdir()
        vault = temporary / "vault"
        locks = vault / ".vault-meta" / "locks"
        locks.mkdir(parents=True)
        (vault / "wiki").mkdir()
        target = "wiki/Page.md"
        name = legacy_lock._lock_name(target)
        (locks / name).write_text(f"123 1 {target}\n", encoding="utf-8")
        return plugin, vault, locks, target, name

    def test_locks_parent_swap_cannot_redirect_release(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            temporary = Path(directory)
            plugin, vault, locks, target, name = self._fixture(temporary)
            outside = temporary / "outside-locks"
            outside.mkdir()
            outside_record = outside / name
            outside_record.write_bytes(b"outside-record-must-survive\n")
            before = outside_record.read_bytes()
            pinned = locks.with_name("locks-pinned")
            original = legacy_lock._open_child_directory
            swapped = False

            def open_then_swap(
                parent: int, component: str, *, create: bool
            ) -> int | None:
                nonlocal swapped
                descriptor = original(parent, component, create=create)
                if component == "locks" and descriptor is not None and not swapped:
                    swapped = True
                    locks.rename(pinned)
                    locks.symlink_to(outside, target_is_directory=True)
                return descriptor

            with (
                mock.patch.dict(os.environ, {"WIKI_LOCK_VAULT": str(vault)}),
                mock.patch.object(legacy_lock, "_open_child_directory", open_then_swap),
            ):
                self.assertEqual(
                    legacy_lock.run(["release", target], plugin_root=plugin),
                    0,
                )

            self.assertTrue(swapped)
            self.assertEqual(outside_record.read_bytes(), before)
            self.assertFalse((pinned / name).exists())

    def test_meta_parent_swap_cannot_redirect_release_or_canonical_unlock(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            temporary = Path(directory)
            plugin, vault, locks, target, name = self._fixture(temporary)
            meta = locks.parent
            pinned = meta.with_name(".vault-meta-pinned")
            outside_meta = temporary / "outside-meta"
            outside_locks = outside_meta / "locks"
            outside_locks.mkdir(parents=True)
            outside_record = outside_locks / name
            outside_record.write_bytes(b"outside-record-must-survive\n")
            outside_owner = outside_meta / "mutation.lock" / "owner.json"
            outside_owner.parent.mkdir()
            outside_owner.write_bytes(b"outside-owner-must-survive\n")
            record_before = outside_record.read_bytes()
            owner_before = outside_owner.read_bytes()
            original = legacy_lock._open_child_directory
            swapped = False

            def open_then_swap(
                parent: int, component: str, *, create: bool
            ) -> int | None:
                nonlocal swapped
                if component == "locks" and not swapped:
                    swapped = True
                    meta.rename(pinned)
                    meta.symlink_to(outside_meta, target_is_directory=True)
                return original(parent, component, create=create)

            with (
                mock.patch.dict(os.environ, {"WIKI_LOCK_VAULT": str(vault)}),
                mock.patch.object(legacy_lock, "_open_child_directory", open_then_swap),
            ):
                self.assertEqual(
                    legacy_lock.run(["release", target], plugin_root=plugin),
                    0,
                )

            self.assertTrue(swapped)
            self.assertEqual(outside_record.read_bytes(), record_before)
            self.assertEqual(outside_owner.read_bytes(), owner_before)
            self.assertFalse((pinned / "locks" / name).exists())
            self.assertFalse((pinned / "mutation.lock").exists())

    def test_path_limit_matches_readable_record_contract(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            temporary = Path(directory)
            plugin, vault, locks, _target, _name = self._fixture(temporary)
            allowed = ascii_path_of_length(legacy_lock.MAX_PATH_BYTES)
            oversized = ascii_path_of_length(legacy_lock.MAX_PATH_BYTES + 1)
            original_names = {path.name for path in locks.iterdir()}

            with mock.patch.dict(os.environ, {"WIKI_LOCK_VAULT": str(vault)}):
                self.assertEqual(
                    legacy_lock.run(["acquire", allowed], plugin_root=plugin), 0
                )
                self.assertEqual(
                    legacy_lock.run(["acquire", allowed], plugin_root=plugin), 75
                )
                self.assertEqual(
                    legacy_lock.run(["release", allowed], plugin_root=plugin), 0
                )
                with self.assertRaises(legacy_lock.LegacyLockError) as raised:
                    legacy_lock.run(["acquire", oversized], plugin_root=plugin)

            self.assertEqual(raised.exception.exit_code, 4)
            self.assertEqual({path.name for path in locks.iterdir()}, original_names)

            overlong_component = "missing/" + "a" * (
                legacy_lock.MAX_PATH_COMPONENT_BYTES + 1
            )
            with self.assertRaises(legacy_lock.LegacyLockError) as component_error:
                legacy_lock._normalized_relative_path(overlong_component)
            self.assertEqual(component_error.exception.exit_code, 4)

    def test_lock_directory_enumeration_is_cardinality_bounded(self) -> None:
        if os.name == "nt":
            self.skipTest("fd-based directory enumeration is POSIX-only")
        with tempfile.TemporaryDirectory() as directory:
            locks = Path(directory)
            (locks / "one").write_text("x", encoding="utf-8")
            (locks / "two").write_text("x", encoding="utf-8")
            descriptor = os.open(locks, os.O_RDONLY | getattr(os, "O_DIRECTORY", 0))
            try:
                with (
                    mock.patch.object(legacy_lock, "MAX_LOCK_DIRECTORY_ENTRIES", 1),
                    self.assertRaises(legacy_lock.LegacyLockError) as raised,
                ):
                    legacy_lock._record_names(descriptor)
            finally:
                os.close(descriptor)
            self.assertEqual(raised.exception.code, "UNSAFE_LEGACY_LOCK_RUNTIME")


if __name__ == "__main__":
    unittest.main()
