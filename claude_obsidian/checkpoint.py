"""Explicit, exact-operation Git checkpoints for completed transactions."""

from __future__ import annotations

import errno
import hashlib
import json
import os
import stat
import subprocess
import sys
import tempfile
import uuid
from contextvars import ContextVar, Token
from datetime import date, datetime, timezone
from pathlib import Path
from typing import Any, Mapping, Sequence

from .json_utils import parse_finite_json_float
from .lint_engine import lint_vault
from .paths import canonical, directory_open_flags, read_open_flags
from .transaction import (
    RESULT_SCHEMA,
    MutationLock,
    TransactionError,
    _safe_hash,
    _safe_vault_path,
    safe_operation_id,
    sha256_bytes,
)


CHECKPOINT_SCHEMA = "claude-obsidian.checkpoint.v1"
PENDING_SCHEMA = "claude-obsidian.checkpoint-pending.v1"
PENDING_NAME = "checkpoint.pending.json"
FINAL_NAME = "checkpoint.json"
MAX_CHECKPOINT_STATE_BYTES = 8 * 1024 * 1024
MAX_CHECKPOINT_MESSAGE_BYTES = 64 * 1024
MAX_CHECKPOINT_RUNTIME_ENTRIES = 4096

BLOCKING_LINT_CATEGORIES = (
    "dead_links",
    "ambiguous_targets",
    "missing_frontmatter",
    "stale_index_entries",
    "read_errors",
    "configuration_errors",
    "provenance_errors",
)


class CheckpointError(TransactionError):
    exit_code = 4


_ACTIVE_ROOT: ContextVar[tuple[Path, int] | None] = ContextVar(
    "claude_obsidian_checkpoint_root",
    default=None,
)


def _active_root_fd(root: Path) -> int | None:
    active = _ACTIVE_ROOT.get()
    if active is None or active[0] != root:
        return None
    return active[1]


def _descriptor_root_path(root: Path) -> tuple[Path, tuple[int, ...]]:
    """Return a subprocess cwd pinned to the held vault directory."""

    descriptor = _active_root_fd(root)
    if descriptor is None:
        return root, ()
    if sys.platform.startswith("linux"):
        candidate = Path(f"/proc/self/fd/{descriptor}")
    elif sys.platform == "darwin":
        try:
            import fcntl

            resolved = fcntl.fcntl(
                descriptor,
                fcntl.F_GETPATH,
                bytes(1024),
            ).split(b"\0", 1)[0]
        except (AttributeError, OSError) as exc:
            raise CheckpointError(
                "CHECKPOINT_FD_CWD_UNSUPPORTED",
                f"cannot resolve the pinned vault descriptor for Git: {exc}",
            ) from exc
        if not resolved:
            raise CheckpointError(
                "CHECKPOINT_FD_CWD_UNSUPPORTED",
                "cannot resolve the pinned vault descriptor for Git",
            )
        candidate = Path(os.fsdecode(resolved))
    else:
        raise CheckpointError(
            "CHECKPOINT_FD_CWD_UNSUPPORTED",
            "descriptor-anchored Git requires WSL/Linux or macOS",
        )
    probe: int | None = None
    try:
        opened = os.fstat(descriptor)
        flags = os.O_RDONLY | getattr(os, "O_CLOEXEC", 0)
        probe = os.open(candidate, flags)
        alias = os.fstat(probe)
    except OSError as exc:
        raise CheckpointError(
            "CHECKPOINT_FD_CWD_UNSUPPORTED",
            f"cannot expose the pinned vault descriptor to Git: {exc}",
        ) from exc
    finally:
        if probe is not None:
            os.close(probe)
    if (
        not stat.S_ISDIR(alias.st_mode)
        or (opened.st_dev, opened.st_ino) != (alias.st_dev, alias.st_ino)
    ):
        raise CheckpointError(
            "CHECKPOINT_FD_CWD_UNSUPPORTED",
            "descriptor Git cwd does not identify the selected vault",
        )
    return candidate, (descriptor,)


def _same_as_active_root(root: Path, candidate: Path) -> bool:
    descriptor = _active_root_fd(root)
    if descriptor is None:
        return canonical(candidate) == root
    try:
        expected = os.fstat(descriptor)
        actual = candidate.stat()
    except OSError:
        return False
    return (expected.st_dev, expected.st_ino) == (actual.st_dev, actual.st_ino)


def _git_environment(overrides: Mapping[str, str] | None = None) -> dict[str, str]:
    environment = dict(os.environ)
    # The selected vault, not an inherited Git override, defines checkpoint scope.
    exact_overrides = {
        "GIT_ALTERNATE_OBJECT_DIRECTORIES",
        "GIT_CEILING_DIRECTORIES",
        "GIT_COMMON_DIR",
        "GIT_CONFIG",
        "GIT_CONFIG_COUNT",
        "GIT_CONFIG_GLOBAL",
        "GIT_CONFIG_NOSYSTEM",
        "GIT_CONFIG_SYSTEM",
        "GIT_DIR",
        "GIT_DISCOVERY_ACROSS_FILESYSTEM",
        "GIT_GRAFT_FILE",
        "GIT_INDEX_FILE",
        "GIT_NAMESPACE",
        "GIT_OBJECT_DIRECTORY",
        "GIT_REPLACE_REF_BASE",
        "GIT_SHALLOW_FILE",
        "GIT_WORK_TREE",
    }
    for name in list(environment):
        if name in exact_overrides or name.startswith(
            ("GIT_CONFIG_KEY_", "GIT_CONFIG_VALUE_")
        ):
            environment.pop(name, None)
    environment["GIT_LITERAL_PATHSPECS"] = "1"
    environment["GIT_CONFIG_NOSYSTEM"] = "1"
    environment["GIT_CONFIG_GLOBAL"] = os.devnull
    if overrides:
        environment.update(overrides)
    return environment


def _git(
    root: Path,
    arguments: Sequence[str],
    *,
    check: bool = True,
    environment: Mapping[str, str] | None = None,
    input_text: str | None = None,
) -> subprocess.CompletedProcess[str]:
    cwd, pass_fds = _descriptor_root_path(root)
    completed = subprocess.run(
        ["git", *arguments],
        cwd=cwd,
        pass_fds=pass_fds,
        env=_git_environment(environment),
        input=input_text,
        capture_output=True,
        text=True,
        check=False,
        timeout=30,
    )
    if check and completed.returncode != 0:
        message = (
            completed.stderr.strip() or completed.stdout.strip() or "git command failed"
        )
        raise CheckpointError("GIT_FAILED", message)
    return completed


def _git_bytes(
    root: Path,
    arguments: Sequence[str],
    *,
    check: bool = True,
    environment: Mapping[str, str] | None = None,
    input_bytes: bytes | None = None,
) -> subprocess.CompletedProcess[bytes]:
    cwd, pass_fds = _descriptor_root_path(root)
    completed = subprocess.run(
        ["git", *arguments],
        cwd=cwd,
        pass_fds=pass_fds,
        env=_git_environment(environment),
        stdin=subprocess.DEVNULL if input_bytes is None else None,
        input=input_bytes,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=False,
        check=False,
        timeout=30,
    )
    if check and completed.returncode != 0:
        message = (
            completed.stderr.decode("utf-8", errors="replace").strip()
            or completed.stdout.decode("utf-8", errors="replace").strip()
            or "git command failed"
        )
        raise CheckpointError("GIT_FAILED", message)
    return completed


def _oid(value: Any, *, field: str) -> str:
    if (
        not isinstance(value, str)
        or len(value) not in {40, 64}
        or any(character not in "0123456789abcdef" for character in value)
    ):
        raise CheckpointError("CORRUPT_CHECKPOINT", f"{field} is not a Git object ID")
    return value


def _document_fingerprint(value: Mapping[str, Any]) -> str:
    return sha256_bytes(
        json.dumps(
            value, sort_keys=True, separators=(",", ":"), ensure_ascii=False
        ).encode("utf-8")
    )


def _repository_head(root: Path) -> str:
    inside = _git(root, ["rev-parse", "--is-inside-work-tree"], check=False)
    if inside.returncode != 0 or inside.stdout.strip() != "true":
        raise CheckpointError(
            "NOT_A_GIT_REPOSITORY", f"vault is not a Git repository: {root}"
        )
    top = _git(root, ["rev-parse", "--show-toplevel"], check=False)
    if top.returncode != 0 or not _same_as_active_root(root, Path(top.stdout.strip())):
        raise CheckpointError(
            "VAULT_NOT_GIT_ROOT",
            "the selected vault must be the root of its Git repository",
        )
    head = _git(root, ["rev-parse", "--verify", "HEAD^{commit}"], check=False)
    if head.returncode != 0:
        raise CheckpointError(
            "GIT_HEAD_MISSING",
            "the vault repository has no checkpoint parent; create and review an initial "
            "baseline commit before checkpointing an operation",
        )
    return _oid(head.stdout.strip(), field="HEAD")


def _head_ref(root: Path) -> str | None:
    completed = _git(root, ["symbolic-ref", "-q", "HEAD"], check=False)
    if completed.returncode != 0:
        return None
    value = completed.stdout.strip()
    valid = _git(root, ["check-ref-format", value], check=False)
    if not value.startswith("refs/heads/") or valid.returncode != 0:
        raise CheckpointError(
            "UNSAFE_HEAD_REF", f"HEAD uses an unsupported symbolic ref: {value}"
        )
    return value


def _validated_operation_id(value: Any) -> str:
    try:
        operation_id = safe_operation_id(value)
    except TransactionError as exc:
        raise CheckpointError(exc.code, str(exc)) from exc
    if operation_id in {".", ".."}:
        raise CheckpointError(
            "INVALID_OPERATION_ID", "operation_id is not a path component"
        )
    return operation_id


def _strict_json_object(raw: bytes, *, label: str, code: str) -> dict[str, Any]:
    def reject_duplicates(pairs: list[tuple[str, Any]]) -> dict[str, Any]:
        value: dict[str, Any] = {}
        for key, item in pairs:
            if key in value:
                raise ValueError(f"duplicate JSON key: {key}")
            value[key] = item
        return value

    def reject_constant(constant: str) -> None:
        raise ValueError(f"non-finite JSON number is not permitted: {constant}")

    try:
        parsed = json.loads(
            raw.decode("utf-8"),
            object_pairs_hook=reject_duplicates,
            parse_constant=reject_constant,
            parse_float=parse_finite_json_float,
        )
    except (UnicodeDecodeError, json.JSONDecodeError, ValueError) as exc:
        raise CheckpointError(code, f"cannot parse {label}: {exc}") from exc
    if not isinstance(parsed, dict):
        raise CheckpointError(code, f"{label} must be a JSON object")
    return parsed


class _CheckpointStore:
    """Pinned transaction/checkpoint state for one held mutation lock."""

    def __init__(self, lock: MutationLock, root: Path, operation_id: str):
        self.lock = lock
        self.root = root
        self.operation_id = operation_id
        self.meta_fd = lock.duplicate_parent_fd()
        self.transactions_fd = -1
        self.operation_fd = -1
        try:
            self.transactions_fd = lock.open_metadata_dir_fd("transactions")
            self.operation_fd = lock.open_metadata_dir_fd(
                f"transactions/{operation_id}"
            )
        except (OSError, TransactionError) as exc:
            self.close()
            cause = exc.__cause__ if isinstance(exc, TransactionError) else exc
            if isinstance(cause, OSError) and cause.errno in {
                errno.ELOOP,
                errno.ENOTDIR,
            }:
                raise CheckpointError(
                    "UNSAFE_TRANSACTION_DIRECTORY",
                    f"transaction directory is not a confined directory: {operation_id}",
                ) from exc
            raise CheckpointError(
                "TRANSACTION_RESULT_MISSING",
                f"cannot find completed transaction {operation_id}: {exc}",
            ) from exc

    @property
    def display_directory(self) -> Path:
        return self.root / ".vault-meta" / "transactions" / self.operation_id

    def close(self) -> None:
        for name in ("operation_fd", "transactions_fd", "meta_fd"):
            descriptor = getattr(self, name, -1)
            if descriptor >= 0:
                os.close(descriptor)
                setattr(self, name, -1)

    def __enter__(self) -> "_CheckpointStore":
        return self

    def __exit__(self, _type: Any, _value: Any, _traceback: Any) -> None:
        self.close()

    def _assert_current(self) -> None:
        self.lock.assert_runtime_namespace_current()
        try:
            transactions = os.stat(
                "transactions", dir_fd=self.meta_fd, follow_symlinks=False
            )
            pinned_transactions = os.fstat(self.transactions_fd)
            operation = os.stat(
                self.operation_id,
                dir_fd=self.transactions_fd,
                follow_symlinks=False,
            )
            pinned_operation = os.fstat(self.operation_fd)
        except OSError as exc:
            raise CheckpointError(
                "RUNTIME_NAMESPACE_CHANGED",
                f"checkpoint runtime namespace changed: {exc}",
            ) from exc
        if (
            not stat.S_ISDIR(transactions.st_mode)
            or not stat.S_ISDIR(operation.st_mode)
            or (transactions.st_dev, transactions.st_ino)
            != (pinned_transactions.st_dev, pinned_transactions.st_ino)
            or (operation.st_dev, operation.st_ino)
            != (pinned_operation.st_dev, pinned_operation.st_ino)
        ):
            raise CheckpointError(
                "RUNTIME_NAMESPACE_CHANGED",
                "checkpoint runtime namespace changed while the lock was held",
            )

    def exists(self, name: str) -> bool:
        try:
            metadata = os.stat(name, dir_fd=self.operation_fd, follow_symlinks=False)
        except FileNotFoundError:
            return False
        except OSError as exc:
            raise CheckpointError(
                "CORRUPT_CHECKPOINT", f"cannot inspect {name}: {exc}"
            ) from exc
        if not stat.S_ISREG(metadata.st_mode):
            raise CheckpointError(
                "CORRUPT_CHECKPOINT", f"checkpoint state is not regular: {name}"
            )
        return True

    def read(self, name: str, *, label: str, code: str) -> dict[str, Any]:
        descriptor = -1
        try:
            before = os.stat(name, dir_fd=self.operation_fd, follow_symlinks=False)
            if (
                not stat.S_ISREG(before.st_mode)
                or before.st_size > MAX_CHECKPOINT_STATE_BYTES
            ):
                raise CheckpointError(code, f"{label} is not a bounded regular file")
            descriptor = os.open(name, read_open_flags(), dir_fd=self.operation_fd)
            opened = os.fstat(descriptor)
            if (opened.st_dev, opened.st_ino) != (before.st_dev, before.st_ino):
                raise CheckpointError(code, f"{label} changed before it could be read")
            chunks: list[bytes] = []
            remaining = MAX_CHECKPOINT_STATE_BYTES + 1
            while remaining > 0:
                block = os.read(descriptor, min(remaining, 1024 * 1024))
                if not block:
                    break
                chunks.append(block)
                remaining -= len(block)
            raw = b"".join(chunks)
            after = os.fstat(descriptor)
            stable = ("st_dev", "st_ino", "st_size", "st_mtime_ns", "st_mode")
            if len(raw) > MAX_CHECKPOINT_STATE_BYTES or any(
                getattr(opened, field) != getattr(after, field) for field in stable
            ):
                raise CheckpointError(code, f"{label} changed while it was read")
            return _strict_json_object(raw, label=label, code=code)
        except FileNotFoundError as exc:
            raise CheckpointError(code, f"cannot find {label}") from exc
        except OSError as exc:
            raise CheckpointError(code, f"cannot read {label}: {exc}") from exc
        finally:
            if descriptor >= 0:
                os.close(descriptor)

    def write(self, name: str, value: Mapping[str, Any]) -> None:
        self._assert_current()
        raw = (
            json.dumps(value, indent=2, sort_keys=True, ensure_ascii=False) + "\n"
        ).encode("utf-8")
        if len(raw) > MAX_CHECKPOINT_STATE_BYTES:
            raise CheckpointError(
                "CHECKPOINT_STATE_TOO_LARGE",
                f"checkpoint state exceeds {MAX_CHECKPOINT_STATE_BYTES} bytes",
            )
        temporary = f".{name}.tmp-{os.getpid()}-{uuid.uuid4().hex}"
        descriptor = -1
        try:
            descriptor = os.open(
                temporary,
                os.O_WRONLY
                | os.O_CREAT
                | os.O_EXCL
                | os.O_NOFOLLOW
                | getattr(os, "O_CLOEXEC", 0),
                0o600,
                dir_fd=self.operation_fd,
            )
            with os.fdopen(descriptor, "wb") as handle:
                descriptor = -1
                handle.write(raw)
                handle.flush()
                os.fsync(handle.fileno())
            os.replace(
                temporary,
                name,
                src_dir_fd=self.operation_fd,
                dst_dir_fd=self.operation_fd,
            )
            os.fsync(self.operation_fd)
            self._assert_current()
        finally:
            if descriptor >= 0:
                os.close(descriptor)
            try:
                os.unlink(temporary, dir_fd=self.operation_fd)
            except FileNotFoundError:
                pass

    def unlink(self, name: str) -> None:
        self._assert_current()
        try:
            os.unlink(name, dir_fd=self.operation_fd)
        except FileNotFoundError:
            return
        except OSError as exc:
            raise CheckpointError(
                "CORRUPT_CHECKPOINT", f"cannot remove {name}: {exc}"
            ) from exc
        os.fsync(self.operation_fd)
        self._assert_current()

    def other_pending(self) -> str | None:
        try:
            with os.scandir(self.transactions_fd) as entries:
                names: list[str] = []
                for entry in entries:
                    names.append(entry.name)
                    if len(names) > MAX_CHECKPOINT_RUNTIME_ENTRIES:
                        raise CheckpointError(
                            "CORRUPT_CHECKPOINT",
                            "transaction runtime exceeds the checkpoint entry limit",
                        )
                names.sort()
        except OSError as exc:
            raise CheckpointError(
                "CORRUPT_CHECKPOINT", f"cannot list transaction state: {exc}"
            ) from exc
        flags = directory_open_flags()
        for name in names:
            if name == self.operation_id:
                continue
            descriptor = -1
            try:
                descriptor = os.open(name, flags, dir_fd=self.transactions_fd)
                try:
                    pending = os.stat(
                        PENDING_NAME,
                        dir_fd=descriptor,
                        follow_symlinks=False,
                    )
                except FileNotFoundError:
                    continue
                if not stat.S_ISREG(pending.st_mode):
                    raise CheckpointError(
                        "CORRUPT_CHECKPOINT",
                        f"unsafe pending checkpoint state: {name}",
                    )
                return name
            except FileNotFoundError:
                continue
            except OSError as exc:
                raise CheckpointError(
                    "CORRUPT_CHECKPOINT", f"unsafe transaction entry {name}: {exc}"
                ) from exc
            finally:
                if descriptor >= 0:
                    os.close(descriptor)
        return None


def _transaction_result(
    store: _CheckpointStore,
) -> tuple[dict[str, Any], str]:
    result = store.read(
        "changed-paths.json",
        label=f"transaction {store.operation_id} result",
        code="TRANSACTION_RESULT_MISSING",
    )
    if (
        result.get("schema") != RESULT_SCHEMA
        or result.get("operation_id") != store.operation_id
        or result.get("status") != "complete"
        or not isinstance(result.get("changed_paths"), list)
        or not isinstance(result.get("hashes"), dict)
        or not isinstance(result.get("modes"), dict)
    ):
        raise CheckpointError(
            "INVALID_TRANSACTION_RESULT",
            f"transaction result is invalid: {store.operation_id}",
        )
    return result, _document_fingerprint(result)


def _selected_paths(
    vault_root: Path, result: Mapping[str, Any], *, include_raw: bool
) -> tuple[list[str], dict[str, str], dict[str, int]]:
    raw_paths = result["changed_paths"]
    raw_hashes = result["hashes"]
    raw_modes = result["modes"]
    if (
        any(not isinstance(value, str) for value in raw_paths)
        or any(not isinstance(value, str) for value in raw_hashes)
        or any(not isinstance(value, str) for value in raw_modes)
    ):
        raise CheckpointError(
            "INVALID_TRANSACTION_RESULT",
            "transaction paths and hash keys must be strings",
        )
    if set(raw_hashes) != set(raw_paths) or set(raw_modes) != set(raw_paths):
        raise CheckpointError(
            "INVALID_TRANSACTION_RESULT",
            "transaction changed paths, hashes, and modes must have exact coverage",
        )
    selected: list[str] = []
    expected: dict[str, str] = {}
    expected_modes: dict[str, int] = {}
    seen: set[str] = set()
    for value in raw_paths:
        if not isinstance(value, str) or value in seen:
            raise CheckpointError(
                "INVALID_TRANSACTION_RESULT", "transaction paths must be unique strings"
            )
        seen.add(value)
        try:
            relative, _ = _safe_vault_path(vault_root, value)
        except TransactionError as exc:
            raise CheckpointError("INVALID_TRANSACTION_RESULT", str(exc)) from exc
        if relative == ".git" or relative.startswith(".git/"):
            raise CheckpointError(
                "INVALID_TRANSACTION_RESULT",
                "transaction result may not address Git internals",
            )
        digest = raw_hashes.get(relative)
        mode = raw_modes.get(relative)
        if (
            not isinstance(digest, str)
            or len(digest) != 64
            or any(character not in "0123456789abcdef" for character in digest)
        ):
            raise CheckpointError(
                "INVALID_TRANSACTION_RESULT", f"invalid SHA-256 for {relative}"
            )
        if (
            not isinstance(mode, int)
            or isinstance(mode, bool)
            or not 0 <= mode <= 0o777
        ):
            raise CheckpointError(
                "INVALID_TRANSACTION_RESULT", f"invalid file mode for {relative}"
            )
        if (
            relative.startswith(".raw/")
            and relative != ".raw/.manifest.json"
            and not include_raw
        ):
            continue
        selected.append(relative)
        expected[relative] = digest
        expected_modes[relative] = mode
    if not selected:
        raise CheckpointError(
            "NO_CHECKPOINT_PATHS", "transaction has no checkpointable paths"
        )
    return selected, expected, expected_modes


def _ignored_untracked_paths(root: Path, paths: Sequence[str]) -> list[str]:
    """Return transaction paths excluded by the vault's reviewed Git policy."""

    if not paths:
        return []
    completed = _git_bytes(
        root,
        ["check-ignore", "-z", "--stdin"],
        check=False,
        # check-ignore's --stdin parser does not support Git's injected
        # :(literal) pathspec form; NUL-delimited stdin is already unambiguous.
        environment={"GIT_LITERAL_PATHSPECS": "0"},
        input_bytes=b"\0".join(os.fsencode(path) for path in paths) + b"\0",
    )
    if completed.returncode not in {0, 1}:
        detail = completed.stderr.decode("utf-8", errors="replace").strip()
        raise CheckpointError(
            "GIT_IGNORE_CHECK_FAILED", detail or "cannot evaluate Git ignore policy"
        )
    return sorted(set(_decode_paths(completed.stdout)))


def _verify_worktree(
    vault_root: Path,
    expected_hashes: Mapping[str, str],
    *,
    root_fd: int | None = None,
) -> None:
    for relative, expected in expected_hashes.items():
        try:
            actual = _safe_hash(vault_root, relative, root_fd=root_fd)
        except TransactionError as exc:
            raise CheckpointError("TRANSACTION_DRIFT", f"{relative}: {exc}") from exc
        if actual != expected:
            raise CheckpointError(
                "TRANSACTION_DRIFT", f"{relative} changed after transaction completion"
            )


def _decode_paths(payload: bytes) -> list[str]:
    return [os.fsdecode(value) for value in payload.split(b"\0") if value]


def _index_tree(
    root: Path,
    *,
    environment: Mapping[str, str] | None = None,
    code: str = "GIT_FAILED",
) -> str:
    completed = _git(root, ["write-tree"], check=False, environment=environment)
    if completed.returncode != 0:
        detail = (
            completed.stderr.strip()
            or completed.stdout.strip()
            or "cannot write Git index tree"
        )
        raise CheckpointError(code, detail)
    return _oid(completed.stdout.strip(), field="index tree")


def _staged_paths(root: Path) -> list[str]:
    completed = _git_bytes(
        root, ["diff", "--cached", "--name-only", "-z", "--"], check=False
    )
    if completed.returncode != 0:
        detail = completed.stderr.decode("utf-8", errors="replace").strip()
        raise CheckpointError(
            "UNRELATED_STAGED_CHANGES", detail or "cannot inspect Git index"
        )
    return sorted(set(_decode_paths(completed.stdout)))


def _intent_to_add_paths(root: Path) -> list[str]:
    """Return index-only paths hidden from the normal cached diff."""

    index = _git_bytes(root, ["ls-files", "--stage", "-z"]).stdout
    index_paths: set[str] = set()
    for record in index.split(b"\0"):
        if not record:
            continue
        try:
            _, raw_path = record.split(b"\t", 1)
        except ValueError as exc:
            raise CheckpointError(
                "UNRELATED_STAGED_CHANGES", "cannot parse Git index entries"
            ) from exc
        index_paths.add(os.fsdecode(raw_path))
    head_paths = set(
        _decode_paths(
            _git_bytes(root, ["ls-tree", "-r", "--name-only", "-z", "HEAD"]).stdout
        )
    )
    staged = set(_staged_paths(root))
    return sorted(index_paths.difference(head_paths, staged))


def _assert_index_clean(root: Path, base_tree: str) -> None:
    staged = _staged_paths(root)
    intent_to_add = _intent_to_add_paths(root)
    index_tree = _index_tree(root, code="UNRELATED_STAGED_CHANGES")
    if staged or intent_to_add or index_tree != base_tree:
        visible = staged + [f"{path} (intent-to-add)" for path in intent_to_add]
        detail = ", ".join(visible) if visible else "index differs from HEAD"
        raise CheckpointError(
            "UNRELATED_STAGED_CHANGES",
            "refusing checkpoint while the Git index already has staged state: "
            + detail,
        )


def _tree_entries(
    root: Path, tree: str, paths: Sequence[str]
) -> dict[str, tuple[str, str]]:
    completed = _git_bytes(
        root, ["ls-tree", "-r", "-z", "--full-tree", tree, "--", *paths]
    )
    entries: dict[str, tuple[str, str]] = {}
    for record in completed.stdout.split(b"\0"):
        if not record:
            continue
        try:
            header, raw_path = record.split(b"\t", 1)
            mode, kind, object_id = header.decode("ascii").split(" ")
        except (ValueError, UnicodeDecodeError) as exc:
            raise CheckpointError(
                "INVALID_GIT_TREE", "Git returned an invalid tree entry"
            ) from exc
        relative = os.fsdecode(raw_path)
        if kind != "blob" or relative in entries:
            raise CheckpointError(
                "INVALID_GIT_TREE", f"unexpected Git entry for {relative}"
            )
        entries[relative] = (mode, _oid(object_id, field=f"blob for {relative}"))
    return entries


def _tree_diff_paths(root: Path, base: str, tree: str) -> set[str]:
    completed = _git_bytes(
        root,
        ["diff-tree", "--no-commit-id", "--name-only", "-r", "-z", base, tree, "--"],
    )
    return set(_decode_paths(completed.stdout))


def _verify_tree(
    root: Path,
    *,
    base: str,
    tree: str,
    paths: Sequence[str],
    expected_hashes: Mapping[str, str],
    expected_modes: Mapping[str, int],
) -> None:
    entries = _tree_entries(root, tree, paths)
    if set(entries) != set(paths):
        missing = sorted(set(paths) - set(entries))
        raise CheckpointError(
            "COMMITTED_CONTENT_MISMATCH",
            "candidate tree is missing transaction paths: " + ", ".join(missing),
        )
    for relative in paths:
        expected_git_mode = "100755" if expected_modes[relative] & 0o111 else "100644"
        if entries[relative][0] != expected_git_mode:
            raise CheckpointError(
                "COMMITTED_MODE_MISMATCH",
                f"Git mode differs from the transaction result for {relative}",
            )
        blob = _git_bytes(root, ["cat-file", "blob", entries[relative][1]]).stdout
        if hashlib.sha256(blob).hexdigest() != expected_hashes[relative]:
            raise CheckpointError(
                "COMMITTED_CONTENT_MISMATCH",
                f"Git blob bytes differ from the transaction result for {relative}",
            )
    changed = _tree_diff_paths(root, base, tree)
    if not changed:
        raise CheckpointError(
            "NOTHING_TO_COMMIT", "transaction paths have no Git changes"
        )
    unexpected = changed.difference(paths)
    if unexpected:
        raise CheckpointError(
            "UNRELATED_TREE_CHANGES",
            "candidate checkpoint contains unrelated paths: "
            + ", ".join(sorted(unexpected)),
        )


def _commit_metadata(root: Path, commit: str) -> tuple[str, str]:
    line = (
        _git(root, ["rev-list", "--parents", "-n", "1", commit]).stdout.strip().split()
    )
    if len(line) != 2 or line[0] != commit:
        raise CheckpointError(
            "CORRUPT_CHECKPOINT", "checkpoint must be a single-parent commit"
        )
    parent = _oid(line[1], field="checkpoint parent")
    tree = _oid(
        _git(root, ["rev-parse", "--verify", f"{commit}^{{tree}}"]).stdout.strip(),
        field="checkpoint tree",
    )
    return parent, tree


def _verify_commit(
    root: Path,
    *,
    commit: str,
    parent: str,
    tree: str,
    paths: Sequence[str],
    expected_hashes: Mapping[str, str],
    expected_modes: Mapping[str, int],
) -> None:
    actual_parent, actual_tree = _commit_metadata(root, commit)
    if actual_parent != parent or actual_tree != tree:
        raise CheckpointError(
            "CORRUPT_CHECKPOINT", "checkpoint commit does not match its pending record"
        )
    _verify_tree(
        root,
        base=parent,
        tree=tree,
        paths=paths,
        expected_hashes=expected_hashes,
        expected_modes=expected_modes,
    )


def _build_pending(
    root: Path,
    *,
    operation_id: str,
    result_fingerprint: str,
    paths: Sequence[str],
    expected_hashes: Mapping[str, str],
    expected_modes: Mapping[str, int],
    ignored_paths: Sequence[str],
    lint_as_of: str | None,
    include_raw: bool,
    commit_message: str,
) -> dict[str, Any]:
    parent = _repository_head(root)
    head_ref = _head_ref(root)
    base_tree = _oid(
        _git(root, ["rev-parse", "--verify", f"{parent}^{{tree}}"]).stdout.strip(),
        field="base tree",
    )
    _assert_index_clean(root, base_tree)

    with tempfile.TemporaryDirectory(prefix="claude-obsidian-checkpoint-") as temporary:
        index = Path(temporary) / "index"
        environment = {"GIT_INDEX_FILE": str(index)}
        _git(root, ["read-tree", parent], environment=environment)
        _git(root, ["add", "--", *paths], environment=environment)
        tree = _index_tree(root, environment=environment)
        _verify_tree(
            root,
            base=parent,
            tree=tree,
            paths=paths,
            expected_hashes=expected_hashes,
            expected_modes=expected_modes,
        )
        created = _git(
            root,
            ["commit-tree", tree, "-p", parent, "-F", "-"],
            input_text=commit_message.rstrip("\n") + "\n",
        )
        commit = _oid(created.stdout.strip(), field="checkpoint commit")
        _verify_commit(
            root,
            commit=commit,
            parent=parent,
            tree=tree,
            paths=paths,
            expected_hashes=expected_hashes,
            expected_modes=expected_modes,
        )

    # Ref and real-index state must still be the exact state that was reviewed.
    if _repository_head(root) != parent or _head_ref(root) != head_ref:
        raise CheckpointError(
            "HEAD_CHANGED_DURING_CHECKPOINT", "Git HEAD changed during checkpoint"
        )
    _assert_index_clean(root, base_tree)
    return {
        "schema": PENDING_SCHEMA,
        "operation_id": operation_id,
        "transaction_result_sha256": result_fingerprint,
        "base_commit": parent,
        "base_tree": base_tree,
        "head_ref": head_ref,
        "target_tree": tree,
        "commit": commit,
        "paths": list(paths),
        "hashes": dict(expected_hashes),
        "modes": dict(expected_modes),
        "ignored_paths": list(ignored_paths),
        "lint_as_of": lint_as_of,
        "raw_payloads_included": include_raw,
        "message": commit_message,
    }


def _validate_pending(
    root: Path,
    pending: Mapping[str, Any],
    *,
    operation_id: str,
    result_fingerprint: str,
    paths: Sequence[str],
    expected_hashes: Mapping[str, str],
    expected_modes: Mapping[str, int],
    ignored_paths: Sequence[str],
    lint_as_of: str | None,
    include_raw: bool,
    commit_message: str,
) -> dict[str, Any]:
    if (
        pending.get("schema") != PENDING_SCHEMA
        or pending.get("operation_id") != operation_id
        or pending.get("transaction_result_sha256") != result_fingerprint
        or pending.get("paths") != list(paths)
        or pending.get("hashes") != dict(expected_hashes)
        or pending.get("modes") != dict(expected_modes)
        or pending.get("ignored_paths") != list(ignored_paths)
        or pending.get("lint_as_of") != lint_as_of
        or pending.get("raw_payloads_included") is not include_raw
        or pending.get("message") != commit_message
    ):
        raise CheckpointError(
            "PENDING_CHECKPOINT_MISMATCH",
            "pending checkpoint does not match the transaction result and requested options",
        )
    head_ref = pending.get("head_ref")
    if head_ref is not None:
        if not isinstance(head_ref, str) or not head_ref.startswith("refs/heads/"):
            raise CheckpointError(
                "CORRUPT_CHECKPOINT", "pending checkpoint has an unsafe ref"
            )
        if _git(root, ["check-ref-format", head_ref], check=False).returncode != 0:
            raise CheckpointError(
                "CORRUPT_CHECKPOINT", "pending checkpoint has an invalid ref"
            )
    validated = dict(pending)
    validated["base_commit"] = _oid(pending.get("base_commit"), field="base commit")
    validated["base_tree"] = _oid(pending.get("base_tree"), field="base tree")
    validated["target_tree"] = _oid(pending.get("target_tree"), field="target tree")
    validated["commit"] = _oid(pending.get("commit"), field="checkpoint commit")
    actual_base_tree = _oid(
        _git(
            root,
            ["rev-parse", "--verify", f"{validated['base_commit']}^{{tree}}"],
        ).stdout.strip(),
        field="base tree",
    )
    if actual_base_tree != validated["base_tree"]:
        raise CheckpointError("CORRUPT_CHECKPOINT", "pending base tree is invalid")
    _verify_commit(
        root,
        commit=validated["commit"],
        parent=validated["base_commit"],
        tree=validated["target_tree"],
        paths=paths,
        expected_hashes=expected_hashes,
        expected_modes=expected_modes,
    )
    return validated


def _ref_value(root: Path, ref: str) -> str:
    completed = _git(root, ["rev-parse", "--verify", f"{ref}^{{commit}}"], check=False)
    if completed.returncode != 0:
        raise CheckpointError(
            "CHECKPOINT_REF_CHANGED", f"checkpoint ref is missing: {ref}"
        )
    return _oid(completed.stdout.strip(), field=f"ref {ref}")


def _is_ancestor(root: Path, ancestor: str, descendant: str) -> bool:
    completed = _git(
        root, ["merge-base", "--is-ancestor", ancestor, descendant], check=False
    )
    if completed.returncode not in {0, 1}:
        detail = completed.stderr.strip() or "cannot compare checkpoint history"
        raise CheckpointError("GIT_FAILED", detail)
    return completed.returncode == 0


def _final_payload(pending: Mapping[str, Any]) -> dict[str, Any]:
    return {
        "schema": CHECKPOINT_SCHEMA,
        "operation_id": pending["operation_id"],
        "commit": pending["commit"],
        "parent": pending["base_commit"],
        "tree": pending["target_tree"],
        "paths": list(pending["paths"]),
        "ignored_paths": list(pending["ignored_paths"]),
        "lint_as_of": pending["lint_as_of"],
        "raw_payloads_included": pending["raw_payloads_included"],
        "transaction_result_sha256": pending["transaction_result_sha256"],
    }


def _resume_pending(
    root: Path,
    store: _CheckpointStore,
    pending: Mapping[str, Any],
) -> dict[str, Any]:
    base = pending["base_commit"]
    commit = pending["commit"]
    target_tree = pending["target_tree"]
    symbolic_ref = pending["head_ref"]
    target_ref = symbolic_ref or "HEAD"
    ref_value = _ref_value(root, target_ref)

    if ref_value == base:
        if _head_ref(root) != symbolic_ref:
            raise CheckpointError(
                "CHECKPOINT_REF_CHANGED",
                "HEAD no longer names the pending checkpoint ref",
            )
        _assert_index_clean(root, pending["base_tree"])
        updated = _git(
            root,
            ["update-ref", target_ref, commit, base],
            check=False,
        )
        if updated.returncode != 0 and _ref_value(root, target_ref) != commit:
            detail = updated.stderr.strip() or "Git ref changed during checkpoint"
            raise CheckpointError("CHECKPOINT_REF_CHANGED", detail)
        ref_value = _ref_value(root, target_ref)

    if ref_value != commit and not _is_ancestor(root, commit, ref_value):
        raise CheckpointError(
            "CHECKPOINT_REF_CHANGED",
            "pending checkpoint ref diverged before finalization",
        )

    # Synchronize the real index only when it is in one of our known states.
    current_head = _repository_head(root)
    if current_head == commit and _head_ref(root) == symbolic_ref:
        index_tree = _index_tree(root, code="CHECKPOINT_INDEX_CHANGED")
        if index_tree == pending["base_tree"]:
            _git(root, ["read-tree", target_tree])
            index_tree = _index_tree(root, code="CHECKPOINT_INDEX_CHANGED")
        if index_tree != target_tree:
            raise CheckpointError(
                "CHECKPOINT_INDEX_CHANGED",
                "Git index changed during checkpoint; pending state was preserved",
            )

    checkpoint = _final_payload(pending)
    store.write(FINAL_NAME, checkpoint)
    store.unlink(PENDING_NAME)
    return checkpoint


def _existing_checkpoint(
    root: Path,
    store: _CheckpointStore,
    *,
    operation_id: str,
    result_fingerprint: str,
    paths: Sequence[str],
    expected_hashes: Mapping[str, str],
    expected_modes: Mapping[str, int],
    ignored_paths: Sequence[str],
    lint_as_of: str | None,
    include_raw: bool,
) -> dict[str, Any] | None:
    if not store.exists(FINAL_NAME):
        return None
    checkpoint = store.read(
        FINAL_NAME,
        label=f"checkpoint {operation_id}",
        code="CORRUPT_CHECKPOINT",
    )
    if (
        checkpoint.get("schema") != CHECKPOINT_SCHEMA
        or checkpoint.get("operation_id") != operation_id
        or checkpoint.get("paths") != list(paths)
        or checkpoint.get("ignored_paths") != list(ignored_paths)
        or checkpoint.get("lint_as_of") != lint_as_of
        or checkpoint.get("raw_payloads_included") is not include_raw
        or checkpoint.get("transaction_result_sha256") != result_fingerprint
    ):
        raise CheckpointError(
            "CORRUPT_CHECKPOINT", "checkpoint record does not match its transaction"
        )
    commit = _oid(checkpoint.get("commit"), field="checkpoint commit")
    parent, tree = _commit_metadata(root, commit)
    if checkpoint.get("parent") != parent or checkpoint.get("tree") != tree:
        raise CheckpointError(
            "CORRUPT_CHECKPOINT", "checkpoint commit metadata is invalid"
        )
    _verify_tree(
        root,
        base=parent,
        tree=tree,
        paths=paths,
        expected_hashes=expected_hashes,
        expected_modes=expected_modes,
    )
    current = _repository_head(root)
    if current != commit and not _is_ancestor(root, commit, current):
        raise CheckpointError(
            "CHECKPOINT_REF_CHANGED",
            "current HEAD no longer contains the completed checkpoint commit",
        )
    return checkpoint


def checkpoint_operation(
    vault_root: Path | str,
    operation_id: str,
    *,
    message: str | None = None,
    include_raw: bool = False,
    run_lint: bool = True,
    as_of: date | str | None = None,
) -> dict[str, Any]:
    root = canonical(vault_root)
    operation_id = _validated_operation_id(operation_id)
    if not run_lint:
        lint_as_of = None
    elif as_of is None:
        # Reuse a durable pending/final date below; choose today only for a
        # brand-new checkpoint.
        lint_as_of = None
    elif isinstance(as_of, datetime):
        raise CheckpointError(
            "INVALID_AS_OF", "as_of must be an ISO date, date object, or null"
        )
    elif isinstance(as_of, date):
        lint_as_of = as_of.isoformat()
    elif isinstance(as_of, str):
        try:
            lint_as_of = date.fromisoformat(as_of).isoformat()
        except ValueError as exc:
            raise CheckpointError(
                "INVALID_AS_OF", "as_of must be ISO YYYY-MM-DD"
            ) from exc
    else:
        raise CheckpointError(
            "INVALID_AS_OF", "as_of must be an ISO date, date object, or null"
        )
    with MutationLock(root) as mutation_lock:
        root_fd = mutation_lock.duplicate_root_fd()
        active_token: Token[tuple[Path, int] | None] = _ACTIVE_ROOT.set((root, root_fd))
        try:
            with _CheckpointStore(mutation_lock, root, operation_id) as store:
                _repository_head(root)
                result, result_fingerprint = _transaction_result(store)
                if run_lint and lint_as_of is None:
                    for state_name in (FINAL_NAME, PENDING_NAME):
                        if not store.exists(state_name):
                            continue
                        stored = store.read(
                            state_name,
                            label=f"checkpoint {operation_id} {state_name}",
                            code="CORRUPT_CHECKPOINT",
                        ).get("lint_as_of")
                        if isinstance(stored, str):
                            try:
                                lint_as_of = date.fromisoformat(stored).isoformat()
                            except ValueError as exc:
                                raise CheckpointError(
                                    "CORRUPT_CHECKPOINT",
                                    "stored lint_as_of is not an ISO date",
                                ) from exc
                            break
                    if lint_as_of is None:
                        lint_as_of = datetime.now(timezone.utc).date().isoformat()
                paths, expected_hashes, expected_modes = _selected_paths(
                    root, result, include_raw=include_raw
                )
                ignored_paths = _ignored_untracked_paths(root, paths)
                if ignored_paths:
                    ignored = set(ignored_paths)
                    paths = [path for path in paths if path not in ignored]
                    expected_hashes = {
                        path: digest
                        for path, digest in expected_hashes.items()
                        if path not in ignored
                    }
                    expected_modes = {
                        path: mode
                        for path, mode in expected_modes.items()
                        if path not in ignored
                    }
                if not paths:
                    raise CheckpointError(
                        "NO_CHECKPOINT_PATHS",
                        "transaction has no checkpointable paths after Git ignore policy: "
                        + ", ".join(ignored_paths),
                    )
                operation_type = result.get("operation_type")
                if not isinstance(operation_type, str) or not operation_type:
                    operation_type = "operation"
                commit_message = (
                    message
                    if message is not None
                    else f"wiki: {operation_type} {operation_id}"
                )
                if (
                    not isinstance(commit_message, str)
                    or not commit_message
                    or "\x00" in commit_message
                ):
                    raise CheckpointError(
                        "INVALID_COMMIT_MESSAGE",
                        "commit message must be non-empty text",
                    )
                try:
                    encoded_message = commit_message.encode("utf-8")
                except UnicodeEncodeError as exc:
                    raise CheckpointError(
                        "INVALID_COMMIT_MESSAGE",
                        "commit message must contain Unicode scalar values only",
                    ) from exc
                if len(encoded_message) > MAX_CHECKPOINT_MESSAGE_BYTES:
                    raise CheckpointError(
                        "INVALID_COMMIT_MESSAGE",
                        f"commit message exceeds {MAX_CHECKPOINT_MESSAGE_BYTES} bytes",
                    )

                checkpoint = _existing_checkpoint(
                    root,
                    store,
                    operation_id=operation_id,
                    result_fingerprint=result_fingerprint,
                    paths=paths,
                    expected_hashes=expected_hashes,
                    expected_modes=expected_modes,
                    ignored_paths=ignored_paths,
                    lint_as_of=lint_as_of,
                    include_raw=include_raw,
                )
                if checkpoint is not None:
                    store.unlink(PENDING_NAME)
                    return checkpoint

                pending = (
                    store.read(
                        PENDING_NAME,
                        label=f"pending checkpoint {operation_id}",
                        code="CORRUPT_CHECKPOINT",
                    )
                    if store.exists(PENDING_NAME)
                    else None
                )

                if pending is None:
                    other = store.other_pending()
                    if other is not None:
                        raise CheckpointError(
                            "PENDING_CHECKPOINT_EXISTS",
                            f"checkpoint {other} must be resumed before starting another checkpoint",
                        )
                    _verify_worktree(root, expected_hashes, root_fd=root_fd)
                    if run_lint:
                        lint_root, _ = _descriptor_root_path(root)
                        report = lint_vault(lint_root, as_of=lint_as_of)
                        blockers = {
                            category: len(report.get(category, []))
                            for category in BLOCKING_LINT_CATEGORIES
                            if report.get(category)
                        }
                        if blockers:
                            raise CheckpointError(
                                "LINT_FAILED",
                                "vault lint has blocking findings: "
                                + ", ".join(
                                    f"{key}={value}"
                                    for key, value in sorted(blockers.items())
                                ),
                            )
                    pending = _build_pending(
                        root,
                        operation_id=operation_id,
                        result_fingerprint=result_fingerprint,
                        paths=paths,
                        expected_hashes=expected_hashes,
                        expected_modes=expected_modes,
                        ignored_paths=ignored_paths,
                        lint_as_of=lint_as_of,
                        include_raw=include_raw,
                        commit_message=commit_message,
                    )
                    store.write(PENDING_NAME, pending)

                validated = _validate_pending(
                    root,
                    pending,
                    operation_id=operation_id,
                    result_fingerprint=result_fingerprint,
                    paths=paths,
                    expected_hashes=expected_hashes,
                    expected_modes=expected_modes,
                    ignored_paths=ignored_paths,
                    lint_as_of=lint_as_of,
                    include_raw=include_raw,
                    commit_message=commit_message,
                )
                return _resume_pending(root, store, validated)
        finally:
            _ACTIVE_ROOT.reset(active_token)
            os.close(root_fd)
