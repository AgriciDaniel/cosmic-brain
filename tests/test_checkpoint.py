#!/usr/bin/env python3

from __future__ import annotations

import hashlib
import os
import subprocess
import sys
import tempfile
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

import claude_obsidian.checkpoint as checkpoint_module
from claude_obsidian.checkpoint import CheckpointError, checkpoint_operation
from claude_obsidian.transaction import BUNDLE_SCHEMA, MutationLock, apply_bundle


def git(root: Path, *args: str) -> str:
    return subprocess.run(
        ["git", *args], cwd=root, check=True, capture_output=True, text=True
    ).stdout.strip()


def git_bytes(root: Path, *args: str) -> bytes:
    return subprocess.run(
        ["git", *args], cwd=root, check=True, capture_output=True
    ).stdout


def expect_code(code: str, callback) -> None:
    try:
        callback()
    except CheckpointError as exc:
        assert exc.code == code, (exc.code, str(exc))
    else:
        raise AssertionError(f"expected {code}")


def make_repo(root: Path) -> Path:
    root.mkdir()
    (root / ".obsidian").mkdir()
    (root / ".raw").mkdir()
    (root / "wiki").mkdir()
    (root / "wiki/index.md").write_text(
        "---\ntitle: Index\ntype: meta\nstatus: evergreen\ncreated: 2026-01-01\nupdated: 2026-01-01\ntags: [meta]\n---\n# Index\n"
    )
    git(root, "init", "-q")
    git(root, "config", "user.email", "test@example.com")
    git(root, "config", "user.name", "Test")
    git(root, "add", ".")
    git(root, "commit", "-qm", "initial")
    return root


def transaction(root: Path, operation_id: str = "save-one") -> dict:
    return apply_bundle(
        root,
        {
            "schema": BUNDLE_SCHEMA,
            "operation_id": operation_id,
            "operation_type": "save",
            "expected_hashes": {"wiki/Note.md": None},
            "writes": [
                {
                    "path": "wiki/Note.md",
                    "mode": "create",
                    "content": "---\ntitle: Note\ntype: concept\nstatus: developing\ncreated: 2026-01-01\nupdated: 2026-01-01\ntags: [test]\n---\n# Note\nContent.\n",
                }
            ],
        },
    )


def test_checkpoint_commits_exact_operation() -> None:
    with tempfile.TemporaryDirectory() as td:
        root = make_repo(Path(td) / "vault")
        transaction_result = transaction(root)
        result = checkpoint_operation(root, "save-one", run_lint=False)
        assert result["paths"] == ["wiki/Note.md"]
        assert "wiki/Note.md" in git(
            root, "show", "--name-only", "--pretty=format:", "HEAD"
        )
        committed = git_bytes(root, "show", "HEAD:wiki/Note.md")
        assert (
            hashlib.sha256(committed).hexdigest()
            == transaction_result["hashes"]["wiki/Note.md"]
        )
        assert (
            subprocess.run(
                ["git", "diff", "--cached", "--quiet", "--"], cwd=root, check=False
            ).returncode
            == 0
        )
        assert checkpoint_operation(root, "save-one", run_lint=False) == result


def test_checkpoint_respects_gitignore_and_reports_skipped_metadata() -> None:
    with tempfile.TemporaryDirectory() as td:
        root = make_repo(Path(td) / "vault")
        (root / ".gitignore").write_text(".vault-meta/\n", encoding="utf-8")
        git(root, "add", ".gitignore")
        git(root, "commit", "-qm", "ignore runtime state")
        apply_bundle(
            root,
            {
                "schema": BUNDLE_SCHEMA,
                "operation_id": "setup-with-metadata",
                "operation_type": "setup",
                "expected_hashes": {
                    "wiki/overview.md": None,
                    ".vault-meta/address-counter.txt": None,
                },
                "writes": [
                    {
                        "path": "wiki/overview.md",
                        "mode": "create",
                        "content": "---\ntype: meta\n---\n# Overview\n",
                    },
                    {
                        "path": ".vault-meta/address-counter.txt",
                        "mode": "create",
                        "content": "1\n",
                    },
                ],
            },
        )
        result = checkpoint_operation(root, "setup-with-metadata", run_lint=False)
        assert result["paths"] == ["wiki/overview.md"]
        assert result["ignored_paths"] == [".vault-meta/address-counter.txt"]
        assert (
            git(root, "show", "--name-only", "--pretty=format:", "HEAD")
            == "wiki/overview.md"
        )
        assert (
            subprocess.run(
                ["git", "cat-file", "-e", "HEAD:.vault-meta/address-counter.txt"],
                cwd=root,
                capture_output=True,
                check=False,
            ).returncode
            != 0
        )


def test_existing_checkpoint_is_not_success_after_branch_reset() -> None:
    with tempfile.TemporaryDirectory() as td:
        root = make_repo(Path(td) / "vault")
        transaction(root)
        result = checkpoint_operation(root, "save-one", run_lint=False)
        git(root, "reset", "--hard", "-q", result["parent"])
        expect_code(
            "CHECKPOINT_REF_CHANGED",
            lambda: checkpoint_operation(root, "save-one", run_lint=False),
        )


def test_checkpoint_ignores_external_git_object_store_overrides() -> None:
    with tempfile.TemporaryDirectory() as td:
        base = Path(td)
        root = make_repo(base / "vault")
        transaction(root)
        outside = base / "external-objects"
        outside.mkdir()
        names = ("GIT_OBJECT_DIRECTORY", "GIT_ALTERNATE_OBJECT_DIRECTORIES")
        prior = {name: os.environ.get(name) for name in names}
        os.environ["GIT_OBJECT_DIRECTORY"] = str(outside)
        os.environ["GIT_ALTERNATE_OBJECT_DIRECTORIES"] = str(root / ".git/objects")
        try:
            result = checkpoint_operation(root, "save-one", run_lint=False)
        finally:
            for name, value in prior.items():
                if value is None:
                    os.environ.pop(name, None)
                else:
                    os.environ[name] = value
        assert list(outside.iterdir()) == []
        assert git(root, "rev-parse", "--verify", "HEAD^{commit}") == result["commit"]


def test_unrelated_staging_and_drift_are_rejected() -> None:
    with tempfile.TemporaryDirectory() as td:
        root = make_repo(Path(td) / "vault")
        transaction(root)
        (root / "other.txt").write_text("other\n")
        git(root, "add", "other.txt")
        expect_code(
            "UNRELATED_STAGED_CHANGES",
            lambda: checkpoint_operation(root, "save-one", run_lint=False),
        )
        assert git(root, "diff", "--cached", "--name-only") == "other.txt"
        git(root, "reset", "-q", "HEAD", "--", "other.txt")
        git(root, "add", "wiki/Note.md")
        expect_code(
            "UNRELATED_STAGED_CHANGES",
            lambda: checkpoint_operation(root, "save-one", run_lint=False),
        )
        assert git(root, "diff", "--cached", "--name-only") == "wiki/Note.md"
        git(root, "reset", "-q", "HEAD", "--", "wiki/Note.md")
        (root / "wiki/Note.md").write_text("drift\n")
        expect_code(
            "TRANSACTION_DRIFT",
            lambda: checkpoint_operation(root, "save-one", run_lint=False),
        )


def test_intent_to_add_index_state_is_rejected_and_preserved() -> None:
    with tempfile.TemporaryDirectory() as td:
        root = make_repo(Path(td) / "vault")
        transaction(root)
        intent = root / "intent.txt"
        intent.write_text("not part of the transaction\n", encoding="utf-8")
        git(root, "add", "-N", "intent.txt")
        before = git(root, "ls-files", "--stage", "--", "intent.txt")
        assert before

        expect_code(
            "UNRELATED_STAGED_CHANGES",
            lambda: checkpoint_operation(root, "save-one", run_lint=False),
        )
        assert git(root, "ls-files", "--stage", "--", "intent.txt") == before
        assert git(root, "rev-list", "--count", "HEAD") == "1"


def test_executable_mode_drift_is_rejected_before_ref_update() -> None:
    with tempfile.TemporaryDirectory() as td:
        root = make_repo(Path(td) / "vault")
        transaction(root)
        note = root / "wiki/Note.md"
        note.chmod(0o700)

        expect_code(
            "COMMITTED_MODE_MISMATCH",
            lambda: checkpoint_operation(root, "save-one", run_lint=False),
        )
        assert git(root, "rev-list", "--count", "HEAD") == "1"
        assert note.stat().st_mode & 0o111


def test_operation_ids_and_transaction_directories_are_confined() -> None:
    with tempfile.TemporaryDirectory() as td:
        base = Path(td)
        root = make_repo(base / "vault")
        transaction(root)
        for unsafe in (
            ".",
            "..",
            "../outside",
            "/tmp/outside",
            "nested/id",
            "bad\nname",
        ):
            expect_code(
                "INVALID_OPERATION_ID",
                lambda unsafe=unsafe: checkpoint_operation(
                    root, unsafe, run_lint=False
                ),
            )

        outside = base / "outside"
        outside.mkdir()
        escape = root / ".vault-meta/transactions/escape"
        escape.symlink_to(outside, target_is_directory=True)
        expect_code(
            "UNSAFE_TRANSACTION_DIRECTORY",
            lambda: checkpoint_operation(root, "escape", run_lint=False),
        )
        assert list(outside.iterdir()) == []


def test_temporary_index_freezes_verified_bytes() -> None:
    with tempfile.TemporaryDirectory() as td:
        root = make_repo(Path(td) / "vault")
        transaction_result = transaction(root)
        expected = (root / "wiki/Note.md").read_bytes()
        original_git = checkpoint_module._git
        raced = False

        def racing_git(repo, arguments, **kwargs):
            nonlocal raced
            completed = original_git(repo, arguments, **kwargs)
            environment = kwargs.get("environment") or {}
            if (
                arguments[:1] == ["add"]
                and "GIT_INDEX_FILE" in environment
                and not raced
            ):
                raced = True
                (root / "wiki/Note.md").write_text("changed after temporary staging\n")
            return completed

        checkpoint_module._git = racing_git
        try:
            result = checkpoint_operation(root, "save-one", run_lint=False)
        finally:
            checkpoint_module._git = original_git

        assert raced
        committed = git_bytes(root, "show", f"{result['commit']}:wiki/Note.md")
        assert committed == expected
        assert (
            hashlib.sha256(committed).hexdigest()
            == transaction_result["hashes"]["wiki/Note.md"]
        )
        assert (
            root / "wiki/Note.md"
        ).read_text() == "changed after temporary staging\n"


def test_retry_finalizes_one_commit_after_final_record_failure() -> None:
    with tempfile.TemporaryDirectory() as td:
        root = make_repo(Path(td) / "vault")
        transaction(root)
        original_write = checkpoint_module._CheckpointStore.write
        failed = False

        def fail_final(store, name, value):
            nonlocal failed
            if name == checkpoint_module.FINAL_NAME and not failed:
                failed = True
                raise OSError("injected finalization failure")
            return original_write(store, name, value)

        checkpoint_module._CheckpointStore.write = fail_final
        try:
            try:
                checkpoint_operation(
                    root, "save-one", run_lint=True, as_of="2026-07-11"
                )
            except OSError as exc:
                assert "injected finalization failure" in str(exc)
            else:
                raise AssertionError("final record failure must propagate")
        finally:
            checkpoint_module._CheckpointStore.write = original_write

        committed = git(root, "rev-parse", "HEAD")
        transaction_dir = root / ".vault-meta/transactions/save-one"
        assert (transaction_dir / checkpoint_module.PENDING_NAME).is_file()
        assert not (transaction_dir / checkpoint_module.FINAL_NAME).exists()
        before = git(root, "rev-list", "--count", "HEAD")

        result = checkpoint_operation(root, "save-one", run_lint=True)
        assert result["commit"] == committed
        assert result["lint_as_of"] == "2026-07-11"
        assert git(root, "rev-list", "--count", "HEAD") == before
        assert not (transaction_dir / checkpoint_module.PENDING_NAME).exists()
        assert (transaction_dir / checkpoint_module.FINAL_NAME).is_file()


def test_binary_raw_checkpoint_uses_blob_bytes() -> None:
    with tempfile.TemporaryDirectory() as td:
        root = make_repo(Path(td) / "vault")
        payload = "binary\x00payload\n".encode()
        result = apply_bundle(
            root,
            {
                "schema": BUNDLE_SCHEMA,
                "operation_id": "capture-one",
                "operation_type": "capture",
                "expected_hashes": {".raw/captured/payload.bin": None},
                "writes": [
                    {
                        "path": ".raw/captured/payload.bin",
                        "mode": "create",
                        "content": payload.decode(),
                    }
                ],
            },
        )
        expect_code(
            "NO_CHECKPOINT_PATHS",
            lambda: checkpoint_operation(root, "capture-one", run_lint=False),
        )
        checkpoint = checkpoint_operation(
            root, "capture-one", include_raw=True, run_lint=False
        )
        committed = git_bytes(
            root, "show", f"{checkpoint['commit']}:.raw/captured/payload.bin"
        )
        assert committed == payload
        assert (
            hashlib.sha256(committed).hexdigest()
            == result["hashes"][".raw/captured/payload.bin"]
        )


def test_provenance_lint_is_checkpoint_blocking() -> None:
    with tempfile.TemporaryDirectory() as td:
        root = make_repo(Path(td) / "vault")
        transaction(root)
        original_lint = checkpoint_module.lint_vault
        checkpoint_module.lint_vault = lambda _root, **_kwargs: {
            "provenance_errors": [{"path": "wiki/meta/ledgers/claim-ledger.json"}]
        }
        try:
            expect_code(
                "LINT_FAILED",
                lambda: checkpoint_operation(root, "save-one"),
            )
        finally:
            checkpoint_module.lint_vault = original_lint
        assert git(root, "rev-list", "--count", "HEAD") == "1"


def test_checkpoint_records_pinned_provenance_date() -> None:
    with tempfile.TemporaryDirectory() as td:
        root = make_repo(Path(td) / "vault")
        transaction(root)
        result = checkpoint_operation(
            root, "save-one", run_lint=True, as_of="2026-07-11"
        )
        assert result["lint_as_of"] == "2026-07-11"
        assert checkpoint_operation(root, "save-one", run_lint=True) == result


def test_checkpoint_rejects_datetime_as_a_date() -> None:
    with tempfile.TemporaryDirectory() as td:
        root = make_repo(Path(td) / "vault")
        expect_code(
            "INVALID_AS_OF",
            lambda: checkpoint_operation(
                root,
                "save-one",
                run_lint=True,
                as_of=datetime(2026, 7, 11),
            ),
        )


def test_nested_vault_cannot_checkpoint_parent_repository() -> None:
    with tempfile.TemporaryDirectory() as td:
        parent = Path(td) / "parent"
        parent.mkdir()
        git(parent, "init", "-q")
        git(parent, "config", "user.email", "test@example.com")
        git(parent, "config", "user.name", "Test")
        root = parent / "vault"
        root.mkdir()
        (root / ".obsidian").mkdir()
        (root / ".raw").mkdir()
        (root / "wiki").mkdir()
        (root / "wiki/index.md").write_text("# Index\n")
        git(parent, "add", ".")
        git(parent, "commit", "-qm", "initial")
        transaction(root)
        expect_code(
            "VAULT_NOT_GIT_ROOT",
            lambda: checkpoint_operation(root, "save-one", run_lint=False),
        )


def test_checkpoint_state_message_and_runtime_bounds_fail_closed() -> None:
    with tempfile.TemporaryDirectory() as td:
        root = make_repo(Path(td) / "vault")
        transaction(root)
        transaction_dir = root / ".vault-meta/transactions/save-one"

        original_state_limit = checkpoint_module.MAX_CHECKPOINT_STATE_BYTES
        try:
            checkpoint_module.MAX_CHECKPOINT_STATE_BYTES = 32
            with MutationLock(root) as mutation_lock:
                with checkpoint_module._CheckpointStore(
                    mutation_lock, root, "save-one"
                ) as store:
                    expect_code(
                        "CHECKPOINT_STATE_TOO_LARGE",
                        lambda: store.write(
                            "oversized-state.json", {"payload": "x" * 64}
                        ),
                    )
                    assert not (transaction_dir / "oversized-state.json").exists()

                    (transaction_dir / "oversized-state.json").write_text(
                        '{"payload":"' + "x" * 64 + '"}\n', encoding="utf-8"
                    )
                    expect_code(
                        "CORRUPT_CHECKPOINT",
                        lambda: store.read(
                            "oversized-state.json",
                            label="oversized checkpoint state",
                            code="CORRUPT_CHECKPOINT",
                        ),
                    )
        finally:
            checkpoint_module.MAX_CHECKPOINT_STATE_BYTES = original_state_limit

        original_runtime_limit = checkpoint_module.MAX_CHECKPOINT_RUNTIME_ENTRIES
        (root / ".vault-meta/transactions/another").mkdir()
        try:
            checkpoint_module.MAX_CHECKPOINT_RUNTIME_ENTRIES = 1
            with MutationLock(root) as mutation_lock:
                with checkpoint_module._CheckpointStore(
                    mutation_lock, root, "save-one"
                ) as store:
                    expect_code("CORRUPT_CHECKPOINT", store.other_pending)
        finally:
            checkpoint_module.MAX_CHECKPOINT_RUNTIME_ENTRIES = original_runtime_limit

        expect_code(
            "INVALID_COMMIT_MESSAGE",
            lambda: checkpoint_operation(
                root,
                "save-one",
                message="x" * (checkpoint_module.MAX_CHECKPOINT_MESSAGE_BYTES + 1),
                run_lint=False,
            ),
        )
        expect_code(
            "INVALID_COMMIT_MESSAGE",
            lambda: checkpoint_operation(
                root,
                "save-one",
                message="",
                run_lint=False,
            ),
        )
        assert not (transaction_dir / checkpoint_module.PENDING_NAME).exists()
        assert git(root, "rev-list", "--count", "HEAD") == "1"


def main() -> None:
    test_checkpoint_commits_exact_operation()
    test_checkpoint_respects_gitignore_and_reports_skipped_metadata()
    test_existing_checkpoint_is_not_success_after_branch_reset()
    test_checkpoint_ignores_external_git_object_store_overrides()
    test_unrelated_staging_and_drift_are_rejected()
    test_intent_to_add_index_state_is_rejected_and_preserved()
    test_executable_mode_drift_is_rejected_before_ref_update()
    test_operation_ids_and_transaction_directories_are_confined()
    test_temporary_index_freezes_verified_bytes()
    test_retry_finalizes_one_commit_after_final_record_failure()
    test_binary_raw_checkpoint_uses_blob_bytes()
    test_provenance_lint_is_checkpoint_blocking()
    test_checkpoint_records_pinned_provenance_date()
    test_checkpoint_rejects_datetime_as_a_date()
    test_nested_vault_cannot_checkpoint_parent_repository()
    test_checkpoint_state_message_and_runtime_bounds_fail_closed()
    print("All checkpoint tests passed.")


if __name__ == "__main__":
    main()
