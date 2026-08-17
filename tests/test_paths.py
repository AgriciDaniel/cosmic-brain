#!/usr/bin/env python3
"""Hermetic tests for vault-root selection."""

from __future__ import annotations

import json
import os
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from claude_obsidian.paths import (
    MAX_WORKSPACE_CONFIG_BYTES,
    VaultSelectionError,
    assert_not_plugin_tree,
    assert_within,
    directory_open_flags,
    is_same_object,
    read_open_flags,
    resolve_vault_root,
    supports_confined_dirfd,
)


def make_vault(root: Path) -> Path:
    root.mkdir(parents=True)
    (root / ".obsidian").mkdir()
    (root / "wiki").mkdir()
    (root / ".raw").mkdir()
    return root


def test_precedence_and_config() -> None:
    with tempfile.TemporaryDirectory() as td:
        base = Path(td)
        explicit = make_vault(base / "explicit")
        env = make_vault(base / "env")
        configured = make_vault(base / "configured")
        workspace = base / "workspace"
        workspace.mkdir()
        (workspace / ".claude-obsidian.json").write_text(
            json.dumps(
                {"schema": "claude-obsidian.workspace.v1", "vault": "../configured"}
            ),
            encoding="utf-8",
        )
        nested = workspace / "nested"
        nested.mkdir()
        selected = resolve_vault_root(
            explicit, start=nested, environ={"CLAUDE_OBSIDIAN_VAULT": str(env)}
        )
        assert selected.root == explicit.resolve()
        selected = resolve_vault_root(
            start=nested, environ={"CLAUDE_OBSIDIAN_VAULT": str(env)}
        )
        assert selected.root == env.resolve()
        selected = resolve_vault_root(start=nested, environ={})
        assert selected.root == configured.resolve()


def test_plugin_root_rejected_implicitly_and_explicitly() -> None:
    with tempfile.TemporaryDirectory() as td:
        root = make_vault(Path(td) / "plugin")
        for explicit in (None, root):
            try:
                resolve_vault_root(explicit, start=root, environ={}, plugin_root=root)
            except VaultSelectionError as exc:
                assert exc.code == "PLUGIN_ROOT_IS_NOT_VAULT"
            else:
                raise AssertionError("plugin root must be rejected")
        selected = resolve_vault_root(
            root,
            start=root,
            environ={},
            plugin_root=root,
            allow_plugin_root=True,
        )
        assert selected.root == root.resolve()


def test_plugin_tree_without_vault_sentinels_is_still_rejected_implicitly() -> None:
    with tempfile.TemporaryDirectory() as td:
        plugin = Path(td) / "installed-product"
        child = plugin / "scripts"
        child.mkdir(parents=True)
        for start, expected in (
            (plugin, "PLUGIN_ROOT_IS_NOT_VAULT"),
            (child, "PLUGIN_TREE_IS_NOT_VAULT"),
        ):
            try:
                resolve_vault_root(start=start, environ={}, plugin_root=plugin)
            except VaultSelectionError as exc:
                assert exc.code == expected, (exc.code, str(exc))
            else:
                raise AssertionError("sentinel-free plugin discovery must fail closed")


def test_plugin_descendants_are_never_mutable_vaults() -> None:
    with tempfile.TemporaryDirectory() as td:
        plugin = Path(td) / "plugin"
        make_vault(plugin)
        for relative in ("templates/vault", "examples/sample-vault"):
            descendant = make_vault(plugin / relative)
            try:
                resolve_vault_root(descendant, environ={}, plugin_root=plugin)
            except VaultSelectionError as exc:
                assert exc.code == "PLUGIN_TREE_IS_NOT_VAULT"
            else:
                raise AssertionError(f"plugin descendant must be rejected: {relative}")


def test_missing_or_ambiguous_selection_fails_closed() -> None:
    with tempfile.TemporaryDirectory() as td:
        root = Path(td)
        try:
            resolve_vault_root(start=root, environ={})
        except VaultSelectionError as exc:
            assert exc.code == "VAULT_NOT_FOUND"
        else:
            raise AssertionError("missing selection must fail")


def test_assert_within_resolves_symlink_escape() -> None:
    with tempfile.TemporaryDirectory() as td:
        base = Path(td)
        vault = make_vault(base / "vault")
        outside = base / "outside"
        outside.mkdir()
        (vault / "escape").symlink_to(outside, target_is_directory=True)
        try:
            assert_within(vault, "escape/file.md")
        except VaultSelectionError as exc:
            assert exc.code == "PATH_OUTSIDE_VAULT"
        else:
            raise AssertionError("symlink escape must fail")


def test_workspace_config_root_must_be_an_object() -> None:
    for value in ([], None, "vault"):
        with tempfile.TemporaryDirectory() as td:
            root = Path(td)
            (root / ".claude-obsidian.json").write_text(
                json.dumps(value), encoding="utf-8"
            )
            try:
                resolve_vault_root(start=root, environ={})
            except VaultSelectionError as exc:
                assert exc.code == "INVALID_WORKSPACE_CONFIG"
            else:
                raise AssertionError("non-object workspace config must fail closed")


def test_workspace_config_rejects_ambiguous_or_nonregular_authority() -> None:
    with tempfile.TemporaryDirectory() as td:
        base = Path(td)
        first = make_vault(base / "first")
        second = make_vault(base / "second")
        workspace = base / "workspace"
        workspace.mkdir()
        config = workspace / ".claude-obsidian.json"
        config.write_text(
            '{"schema":"claude-obsidian.workspace.v1",'
            f'"vault":"{first}","vault":"{second}"}}',
            encoding="utf-8",
        )
        try:
            resolve_vault_root(start=workspace, environ={})
        except VaultSelectionError as exc:
            assert exc.code == "INVALID_WORKSPACE_CONFIG"
            assert "duplicate JSON object key" in str(exc)
        else:
            raise AssertionError("duplicate vault authority must fail closed")

        config.write_bytes(b"{" + b" " * MAX_WORKSPACE_CONFIG_BYTES + b"}")
        try:
            resolve_vault_root(start=workspace, environ={})
        except VaultSelectionError as exc:
            assert exc.code == "INVALID_WORKSPACE_CONFIG"
        else:
            raise AssertionError("oversized workspace authority must fail closed")

        config.unlink()
        outside = base / "outside-config.json"
        outside.write_text(
            json.dumps({"schema": "claude-obsidian.workspace.v1", "vault": str(first)}),
            encoding="utf-8",
        )
        config.symlink_to(outside)
        try:
            resolve_vault_root(start=workspace, environ={})
        except VaultSelectionError as exc:
            assert exc.code == "INVALID_WORKSPACE_CONFIG"
        else:
            raise AssertionError("symlinked workspace authority must fail closed")

        if hasattr(os, "mkfifo"):
            config.unlink()
            os.mkfifo(config)
            try:
                resolve_vault_root(start=workspace, environ={})
            except VaultSelectionError as exc:
                assert exc.code == "INVALID_WORKSPACE_CONFIG"
            else:
                raise AssertionError(
                    "FIFO workspace authority must fail without reading"
                )


def test_product_tree_exclusion_uses_portable_case_and_unicode_identity() -> None:
    with tempfile.TemporaryDirectory() as td:
        base = Path(td)
        plugin = make_vault(base / "Product-Ś")
        case_alias = make_vault(base / "product-ś" / "wiki-child")
        for candidate in (base / "product-ś", case_alias):
            try:
                assert_not_plugin_tree(candidate, plugin)
            except VaultSelectionError as exc:
                assert exc.code in {
                    "PLUGIN_ROOT_IS_NOT_VAULT",
                    "PLUGIN_TREE_IS_NOT_VAULT",
                }
            else:
                raise AssertionError(
                    f"portable product alias must be rejected: {candidate}"
                )

        # Long-s/case-fold plus composition is another normalization-sensitive
        # identity pair even though Linux can create both spellings distinctly.
        unicode_plugin = make_vault(base / "Unicode-Ś")
        unicode_alias = make_vault(base / "unicode-ſ́" / "child")
        try:
            assert_not_plugin_tree(unicode_alias, unicode_plugin)
        except VaultSelectionError as exc:
            assert exc.code == "PLUGIN_TREE_IS_NOT_VAULT"
        else:
            raise AssertionError("post-casefold canonical aliases must be rejected")


def test_platform_flag_helpers_degrade_without_posix_flags() -> None:
    import stat as stat_helper

    directory_flags = directory_open_flags()
    read_flags = read_open_flags()
    assert directory_flags & os.O_RDONLY == os.O_RDONLY
    assert read_flags & os.O_RDONLY == os.O_RDONLY
    if hasattr(os, "O_DIRECTORY"):
        assert directory_flags & os.O_DIRECTORY
        saved = os.O_DIRECTORY
        del os.O_DIRECTORY
        try:
            assert directory_open_flags() & saved == 0
            assert not supports_confined_dirfd()
        finally:
            os.O_DIRECTORY = saved
    fake_zero = os.stat_result((stat_helper.S_IFDIR, 0, 3, 1, 0, 0, 0, 0, 0, 0))
    fake_real = os.stat_result((stat_helper.S_IFDIR, 42, 3, 1, 0, 0, 0, 0, 0, 0))
    assert is_same_object(fake_real, fake_real)
    assert not is_same_object(fake_zero, fake_zero), "zero inode is never equal"
    assert not is_same_object(fake_real, fake_zero)


def main() -> None:
    test_precedence_and_config()
    test_plugin_root_rejected_implicitly_and_explicitly()
    test_plugin_tree_without_vault_sentinels_is_still_rejected_implicitly()
    test_plugin_descendants_are_never_mutable_vaults()
    test_missing_or_ambiguous_selection_fails_closed()
    test_assert_within_resolves_symlink_escape()
    test_workspace_config_root_must_be_an_object()
    test_workspace_config_rejects_ambiguous_or_nonregular_authority()
    test_product_tree_exclusion_uses_portable_case_and_unicode_identity()
    test_platform_flag_helpers_degrade_without_posix_flags()
    print("All path tests passed.")


if __name__ == "__main__":
    main()
