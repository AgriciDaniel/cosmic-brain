#!/usr/bin/env python3
"""Windows compatibility tests for the degraded (non-dirfd) vault paths.

On POSIX these tests simulate the degraded platform by disabling the dirfd
capability probes and removing ``os.O_DIRECTORY`` (safe: every test file runs
in its own process).  On real Windows the same branches run natively with no
patching, plus a few native-only assertions.

What the simulation CANNOT prove (covered only by the windows-smoke CI job on
real Windows): CRT text-mode translation (O_BINARY), ``os.open`` refusing
directories (EACCES), Win32 filename stripping, junction/reparse semantics,
case-insensitive ``Path.resolve`` normalization, and NTFS stat identity.
"""

from __future__ import annotations

import contextlib
import errno
import io
import json
import os
import stat as stat_module
import sys
import tempfile
from pathlib import Path
from unittest import mock

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

import claude_obsidian.cli as cli_module
import claude_obsidian.paths as paths_module
import claude_obsidian.transaction as transaction_module
from claude_obsidian.transaction import (
    BUNDLE_SCHEMA,
    TransactionValidationError,
    apply_bundle,
    inspect_bundle,
)

IS_WINDOWS = os.name == "nt"


def make_vault(root: Path) -> Path:
    root.mkdir(parents=True)
    (root / ".obsidian").mkdir()
    (root / "wiki").mkdir()
    (root / ".raw").mkdir()
    return root


def bundle(operation_id: str, writes: list[dict], expected: dict | None = None) -> dict:
    preconditions = {write["path"]: None for write in writes}
    if expected is not None:
        preconditions.update(expected)
    return {
        "schema": BUNDLE_SCHEMA,
        "operation_id": operation_id,
        "operation_type": "generic",
        "expected_hashes": preconditions,
        "writes": writes,
    }


@contextlib.contextmanager
def windows_mode():
    """Force the degraded non-dirfd branches on POSIX; no-op on Windows."""

    if IS_WINDOWS:
        yield
        return
    saved_flag = getattr(os, "O_DIRECTORY", None)
    with (
        mock.patch.object(paths_module, "supports_confined_dirfd", lambda: False),
        mock.patch.object(
            transaction_module, "_supports_confined_dirfd", lambda: False
        ),
    ):
        if saved_flag is not None:
            del os.O_DIRECTORY
        try:
            yield
        finally:
            if saved_flag is not None:
                os.O_DIRECTORY = saved_flag


def expect_validation_error(code: str, callable_, *args, **kwargs):
    try:
        callable_(*args, **kwargs)
    except TransactionValidationError as exc:
        assert exc.code == code, f"expected {code}, got {exc.code}: {exc}"
        return exc
    raise AssertionError(f"expected TransactionValidationError {code}")


def test_inspect_dry_run_succeeds_without_dirfd() -> None:
    with tempfile.TemporaryDirectory() as td, windows_mode():
        vault = make_vault(Path(td) / "vault")
        # CRLF bytes prove hash stability; on real Windows this additionally
        # exercises O_BINARY (text-mode reads would strip the \r).
        existing = vault / "wiki" / "Existing.md"
        existing.write_bytes(b"# Existing\r\nline two\r\n")
        existing_hash = transaction_module.sha256_file(existing)
        plan = inspect_bundle(
            vault,
            bundle(
                "win-dry-run",
                [
                    {"path": "wiki/A.md", "mode": "create", "content": "# A\n"},
                    {
                        "path": "wiki/Existing.md",
                        "mode": "replace",
                        "content": "# Replaced\n",
                    },
                ],
                {"wiki/Existing.md": existing_hash},
            ),
        )
        assert plan["valid"] is True
        assert plan["changed_paths"] == ["wiki/A.md", "wiki/Existing.md"]
        identity = plan["vault_identity"]
        assert identity["state"] == "existing"
        assert isinstance(identity["device"], int)
        assert isinstance(identity["inode"], int)
        assert plan["approval_sha256"]


def test_vault_root_alias_rejected_without_dirfd() -> None:
    with tempfile.TemporaryDirectory() as td, windows_mode():
        import unicodedata

        parent = Path(td) / "parent"
        if IS_WINDOWS:
            # NTFS cannot host a pure case alias; use an NFC/NFD pair of the
            # same name, which it preserves as distinct directory entries
            # sharing one portable key.
            accented = "va" + chr(0xFA) + "lt"  # vault with u-acute
            vault = make_vault(parent / unicodedata.normalize("NFC", accented))
            alias = parent / unicodedata.normalize("NFD", accented)
        else:
            vault = make_vault(parent / "vault")
            alias = parent / "Vault"
        try:
            alias.mkdir()
        except (FileExistsError, OSError):
            return  # case-insensitive POSIX volume: alias not constructible
        expect_validation_error(
            "CASEFOLD_PATH_ALIAS",
            inspect_bundle,
            vault,
            bundle("root-alias", [{"path": "wiki/A.md", "mode": "create", "content": "x"}]),
        )


def test_write_path_alias_rejected_without_dirfd() -> None:
    import unicodedata

    with tempfile.TemporaryDirectory() as td, windows_mode():
        vault = make_vault(Path(td) / "vault")
        if IS_WINDOWS:
            # On-disk NFD spelling vs NFC bundle path: same portable key,
            # different entry name (bundle paths must themselves be NFC).
            accented = "p" + chr(0xE1) + "ge.md"  # page with a-acute
            on_disk = unicodedata.normalize("NFD", accented)
            target = "wiki/" + unicodedata.normalize("NFC", accented)
        else:
            on_disk = "page.md"
            target = "wiki/Page.md"
        (vault / "wiki" / on_disk).write_text("x", encoding="utf-8")
        expect_validation_error(
            "CASEFOLD_PATH_ALIAS",
            inspect_bundle,
            vault,
            bundle(
                "write-alias",
                [{"path": target, "mode": "create", "content": "y"}],
            ),
        )


def test_no_self_alias_false_positive() -> None:
    with tempfile.TemporaryDirectory() as td:
        parent = Path(td) / "parent"
        vault = make_vault(parent / "vault")
        operation = bundle(
            "self-alias", [{"path": "wiki/A.md", "mode": "create", "content": "x"}]
        )
        with windows_mode():
            assert inspect_bundle(vault, operation)["valid"] is True
        if IS_WINDOWS:
            # Case-insensitive resolve() must canonicalize the typed spelling
            # so the vault is never reported as its own alias.
            assert inspect_bundle(parent / "VAULT", operation)["valid"] is True
        else:
            # Unit-level equivalent of the case-insensitive-volume scenario:
            # scandir shows "vault" while the caller spelled "VAULT".  Passing
            # the actual on-disk entry's lstat as the vault's own identity makes
            # _is_leaf_itself recognize the entry as the vault, not an alias.
            # (must not raise; without self_lstat it must still raise)
            transaction_module._assert_no_portable_vault_leaf_alias_at(
                parent, "VAULT", self_lstat=os.lstat(vault)
            )
            try:
                transaction_module._assert_no_portable_vault_leaf_alias_at(
                    parent, "VAULT", self_lstat=None
                )
            except TransactionValidationError as exc:
                assert exc.code == "CASEFOLD_PATH_ALIAS"
            else:
                raise AssertionError("alias must be flagged without self identity")


def test_sibling_limit_enforced_without_dirfd() -> None:
    with tempfile.TemporaryDirectory() as td, windows_mode():
        parent = Path(td) / "parent"
        vault = make_vault(parent / "vault")
        (parent / "unrelated-sibling").mkdir()
        with mock.patch.object(transaction_module, "MAX_PORTABLE_SIBLING_ENTRIES", 1):
            expect_validation_error(
                "VAULT_DIRECTORY_LIMIT",
                inspect_bundle,
                vault,
                bundle(
                    "limit", [{"path": "wiki/A.md", "mode": "create", "content": "x"}]
                ),
            )


def test_unaliased_directory_rejects_indirection() -> None:
    with tempfile.TemporaryDirectory() as td:
        base = Path(td)
        real = base / "real"
        real.mkdir()
        value = paths_module.assert_unaliased_directory(real)
        assert stat_module.S_ISDIR(value.st_mode)
        regular = base / "file.txt"
        regular.write_text("x", encoding="utf-8")
        try:
            paths_module.assert_unaliased_directory(regular)
        except NotADirectoryError:
            pass
        else:
            raise AssertionError("regular file must raise ENOTDIR")
        if IS_WINDOWS:
            import subprocess

            junction = base / "junction"
            probe = subprocess.run(
                ["cmd", "/c", "mklink", "/J", str(junction), str(real)],
                capture_output=True,
            )
            if probe.returncode == 0:
                try:
                    paths_module.assert_unaliased_directory(junction)
                except OSError as exc:
                    assert exc.errno == errno.ELOOP
                else:
                    raise AssertionError("junction must raise ELOOP")
        else:
            link = base / "link"
            link.symlink_to(real, target_is_directory=True)
            try:
                paths_module.assert_unaliased_directory(link)
            except OSError as exc:
                assert exc.errno == errno.ELOOP
            else:
                raise AssertionError("symlink must raise ELOOP")


def test_vault_identity_path_mode_states() -> None:
    with tempfile.TemporaryDirectory() as td, windows_mode():
        base = Path(td)
        vault = make_vault(base / "vault")
        existing = transaction_module._vault_object_identity(vault)
        probe = os.lstat(vault)
        assert existing == {
            "state": "existing",
            "device": probe.st_dev,
            "inode": probe.st_ino,
        }
        absent = transaction_module._vault_object_identity(base / "not-yet")
        assert absent["state"] == "absent"
        assert absent["leaf"] == "not-yet"
        assert isinstance(absent["parent_device"], int)
        assert isinstance(absent["parent_inode"], int)
        file_vault = base / "file-vault"
        file_vault.write_text("x", encoding="utf-8")
        expect_validation_error(
            "VAULT_NOT_DIRECTORY",
            transaction_module._vault_object_identity,
            file_vault,
        )


def test_zero_inode_identity_fails_closed() -> None:
    fake = os.stat_result((stat_module.S_IFDIR | 0o755, 0, 7, 1, 0, 0, 0, 0, 0, 0))
    expect_validation_error(
        "UNSAFE_VAULT_IDENTITY",
        transaction_module._require_stable_identity,
        fake,
        Path("fat32-vault"),
    )
    assert paths_module.is_same_object(fake, fake) is False


def test_apply_refused_before_any_side_effect() -> None:
    with tempfile.TemporaryDirectory() as td, windows_mode():
        vault = make_vault(Path(td) / "vault")
        operation = bundle(
            "refused", [{"path": "wiki/A.md", "mode": "create", "content": "x"}]
        )
        exc = expect_validation_error(
            "UNSUPPORTED_PLATFORM", apply_bundle, vault, operation
        )
        assert "WSL" in str(exc)
        assert "docs/windows-wsl.md" in str(exc), "refusal must point at the guide"
        assert not (vault / ".vault-meta").exists(), "refusal must be side-effect free"
        assert not (vault / "wiki" / "A.md").exists()


def test_cli_surfaces_platform_error_without_traceback() -> None:
    with tempfile.TemporaryDirectory() as td, windows_mode():
        vault = make_vault(Path(td) / "vault")
        operation = bundle(
            "cli-win", [{"path": "wiki/A.md", "mode": "create", "content": "# A\n"}]
        )
        bundle_path = Path(td) / "bundle.json"
        bundle_path.write_text(json.dumps(operation), encoding="utf-8")
        out, err = io.StringIO(), io.StringIO()
        with contextlib.redirect_stdout(out), contextlib.redirect_stderr(err):
            inspect_rc = cli_module.main(
                ["transaction", "inspect", "--vault", str(vault), str(bundle_path)]
            )
        assert inspect_rc == 0, err.getvalue()
        plan = json.loads(out.getvalue())
        assert plan["valid"] is True
        out, err = io.StringIO(), io.StringIO()
        with contextlib.redirect_stdout(out), contextlib.redirect_stderr(err):
            apply_rc = cli_module.main(
                [
                    "transaction",
                    "apply",
                    "--vault",
                    str(vault),
                    str(bundle_path),
                    "--approved-plan-sha256",
                    str(plan["approval_sha256"]),
                ]
            )
        assert apply_rc == 2
        assert err.getvalue().startswith("ERR UNSUPPORTED_PLATFORM:")
        assert "Traceback" not in err.getvalue()


def test_init_apply_refused_before_mkdir() -> None:
    # A refused init must not create-and-abandon the destination directory
    # (failed Init roots are deliberately never path-deleted).
    with tempfile.TemporaryDirectory() as td, windows_mode():
        destination = Path(td) / "new-vault"
        out, err = io.StringIO(), io.StringIO()
        with contextlib.redirect_stdout(out), contextlib.redirect_stderr(err):
            rc = cli_module.main(
                [
                    "init",
                    str(destination),
                    "--generated-at",
                    "2026-07-31T00:00:00Z",
                    "--operation-id",
                    "win-init",
                    "--apply",
                    "--approved-plan-sha256",
                    "0" * 64,
                ]
            )
        assert rc == 2, err.getvalue()
        assert err.getvalue().startswith("ERR UNSUPPORTED_PLATFORM:")
        assert not destination.exists(), "refused init must not create the root"


def test_identity_change_detected_in_path_mode() -> None:
    with tempfile.TemporaryDirectory() as td, windows_mode():
        base = Path(td)
        vault = make_vault(base / "vault")
        original_prepare = transaction_module._prepare_writes

        def swapping_prepare(*args, **kwargs):
            result = original_prepare(*args, **kwargs)
            os.rename(vault, base / "vault-taken")
            replacement = make_vault(base / "vault")
            del replacement
            return result

        with mock.patch.object(
            transaction_module, "_prepare_writes", swapping_prepare
        ):
            expect_validation_error(
                "VAULT_IDENTITY_CHANGED",
                inspect_bundle,
                vault,
                bundle(
                    "swap", [{"path": "wiki/A.md", "mode": "create", "content": "x"}]
                ),
            )


def test_unportable_write_paths_rejected_on_every_platform() -> None:
    with tempfile.TemporaryDirectory() as td:
        vault = make_vault(Path(td) / "vault")
        for bad in (
            "wiki/a:b.md",  # NTFS alternate data stream
            "wiki/CON.md",  # reserved device name
            "wiki/con.txt",
            "wiki/trailing./x.md",
            "wiki/foo.",
            "wiki/trailing-space /x.md",
        ):
            expect_validation_error(
                "UNPORTABLE_WRITE_PATH",
                inspect_bundle,
                vault,
                bundle("bad-name", [{"path": bad, "mode": "create", "content": "x"}]),
            )


def test_native_windows_bundle_and_workspace_config_load() -> None:
    # Settles the lstat-vs-fstat identity agreement question empirically on
    # real NTFS; meaningless under POSIX simulation, so native-only.
    if not IS_WINDOWS:
        return
    with tempfile.TemporaryDirectory() as td:
        base = Path(td)
        vault = make_vault(base / "vault")
        operation = bundle(
            "native", [{"path": "wiki/A.md", "mode": "create", "content": "x"}]
        )
        bundle_path = base / "bundle.json"
        bundle_path.write_text(json.dumps(operation), encoding="utf-8")
        assert inspect_bundle(vault, bundle_path)["valid"] is True
        workspace = base / "workspace"
        workspace.mkdir()
        config = workspace / paths_module.WORKSPACE_CONFIG
        config.write_text(
            json.dumps({"schema": paths_module.VAULT_SCHEMA, "vault": str(vault)}),
            encoding="utf-8",
        )
        selection = paths_module.resolve_vault_root(start=workspace)
        assert selection.root == paths_module.canonical(vault)


def test_capability_predicates_are_false_on_nt() -> None:
    import claude_obsidian.legacy_lock as legacy_lock_module

    with mock.patch.object(os, "name", "nt"):
        assert paths_module.supports_confined_dirfd() is False
        assert transaction_module._supports_confined_dirfd() is False
        assert legacy_lock_module._supports_confined_runtime() is False
        try:
            transaction_module._require_lock_dirfd_support()
        except OSError as exc:
            assert exc.errno == errno.ENOTSUP
        else:
            raise AssertionError("lock support must be refused on nt")
        expect_validation_error(
            "UNSUPPORTED_PLATFORM", transaction_module._require_write_platform
        )


def test_crlf_page_hash_is_stable_across_read_paths() -> None:
    # Regression for the retrieval staleness split: hashing CRLF content via
    # bytes-decode must match hashing the same content read through the
    # transaction reader (read_text would silently normalize and diverge).
    with tempfile.TemporaryDirectory() as td:
        vault = make_vault(Path(td) / "vault")
        page = vault / "wiki" / "CRLF.md"
        page.write_bytes(b"---\r\naddress: c1\r\n---\r\nbody line\r\n")
        text_via_bytes = page.read_bytes().decode("utf-8", errors="replace")
        raw = transaction_module.read_vault_regular(
            vault, "wiki/CRLF.md", limit=1 << 20, missing_ok=False
        )
        assert raw is not None
        assert raw.decode("utf-8", errors="replace") == text_via_bytes
        assert "\r\n" in text_via_bytes


def main() -> None:
    test_inspect_dry_run_succeeds_without_dirfd()
    test_vault_root_alias_rejected_without_dirfd()
    test_write_path_alias_rejected_without_dirfd()
    test_no_self_alias_false_positive()
    test_sibling_limit_enforced_without_dirfd()
    test_unaliased_directory_rejects_indirection()
    test_vault_identity_path_mode_states()
    test_zero_inode_identity_fails_closed()
    test_apply_refused_before_any_side_effect()
    test_cli_surfaces_platform_error_without_traceback()
    test_init_apply_refused_before_mkdir()
    test_identity_change_detected_in_path_mode()
    test_unportable_write_paths_rejected_on_every_platform()
    test_native_windows_bundle_and_workspace_config_load()
    test_capability_predicates_are_false_on_nt()
    test_crlf_page_hash_is_stable_across_read_paths()
    print("All windows-compat tests passed.")


if __name__ == "__main__":
    main()
