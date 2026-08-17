"""Race-safe compatibility implementation for the deprecated v1 page locks.

The persistent ``.vault-meta/locks/*.lock`` records intentionally retain the
v1 wire format because old integrations acquire and release them in separate
processes.  Mutating commands are serialized by the canonical vault mutation
lock.  Every legacy runtime lookup and mutation is relative to pinned directory
descriptors, so a vault-controlled symlink swap cannot redirect an operation.
"""

from __future__ import annotations

import errno
import hashlib
import os
import re
import stat
import sys
import time
import unicodedata
import uuid
from contextlib import contextmanager
from dataclasses import dataclass
from pathlib import Path, PurePosixPath
from typing import Iterator, Sequence

from .paths import VaultSelectionError, assert_not_plugin_tree, canonical
from .transaction import (
    MutationLock,
    TransactionConflict,
    TransactionError,
    TransactionValidationError,
)


DEFAULT_STALE_AFTER_SECONDS = 60
DEFAULT_CLEAR_AFTER_SECONDS = 3600
MAX_DECIMAL_DIGITS = 18
MAX_RECORD_BYTES = 64 * 1024
MAX_PATH_BYTES = 1024
MAX_PATH_COMPONENT_BYTES = 255
LOCK_TIMEOUT_SECONDS = 5.0
MAX_LOCK_DIRECTORY_ENTRIES = 4096
_WINDOWS_DRIVE = re.compile(r"^[A-Za-z]:")
_HEX_SHA1_LOCK = re.compile(r"^[0-9a-f]{40}\.lock$")


USAGE = """wiki-lock.sh -- deprecated v1 compatibility lock helper

Usage:
  wiki-lock.sh [--stale-after-sec N] acquire <vault-rel-path>
  wiki-lock.sh release <vault-rel-path>
  wiki-lock.sh list
  wiki-lock.sh clear-stale [--max-age N | N]
  wiki-lock.sh peek <vault-rel-path>

Exit codes: 0 success, 2 usage/vault selection, 3 unsafe runtime path,
4 invalid vault-relative path, 75 held/temporarily unavailable.
"""


class LegacyLockError(RuntimeError):
    """One stable compatibility failure with its historical exit status."""

    def __init__(self, code: str, message: str, exit_code: int):
        super().__init__(message)
        self.code = code
        self.exit_code = exit_code


@dataclass(frozen=True)
class LockRecord:
    pid: int
    epoch: int
    path: str

    def encode(self) -> bytes:
        return f"{self.pid} {self.epoch} {self.path}\n".encode("utf-8")


@dataclass(frozen=True)
class RecordRead:
    exists: bool
    record: LockRecord | None


@dataclass(frozen=True)
class ParsedArguments:
    command: str
    operands: tuple[str, ...]
    stale_after: int
    max_age: int | None


def _runtime_error(message: str) -> LegacyLockError:
    return LegacyLockError("UNSAFE_LEGACY_LOCK_RUNTIME", message, 3)


def _usage_error(message: str) -> LegacyLockError:
    return LegacyLockError("INVALID_LEGACY_LOCK_USAGE", message, 2)


def _path_error(message: str) -> LegacyLockError:
    return LegacyLockError("INVALID_LEGACY_LOCK_PATH", message, 4)


def _normalize_decimal(value: str, *, option: str) -> int:
    if (
        not value
        or len(value) > MAX_DECIMAL_DIGITS
        or any(character < "0" or character > "9" for character in value)
    ):
        raise _usage_error(
            f"{option} must be an unsigned decimal of at most "
            f"{MAX_DECIMAL_DIGITS} digits"
        )
    return int(value, 10)


def _parse_arguments(argv: Sequence[str]) -> ParsedArguments:
    if not argv:
        raise _usage_error("no command given")

    command = ""
    operands: list[str] = []
    stale_after = DEFAULT_STALE_AFTER_SECONDS
    max_age: int | None = None
    saw_stale = False
    saw_max_age = False
    index = 0
    positional_only = False
    while index < len(argv):
        value = argv[index]
        if not positional_only and value == "--":
            positional_only = True
            index += 1
            continue
        if not positional_only and value in {"-h", "--help"}:
            raise LegacyLockError("HELP", USAGE.rstrip(), 0)
        if not positional_only and value == "--stale-after-sec":
            if saw_stale:
                raise _usage_error("--stale-after-sec may be specified only once")
            if index + 1 >= len(argv):
                raise _usage_error("--stale-after-sec needs a value")
            stale_after = _normalize_decimal(
                argv[index + 1], option="--stale-after-sec"
            )
            saw_stale = True
            index += 2
            continue
        if not positional_only and value == "--max-age":
            if saw_max_age:
                raise _usage_error("--max-age may be specified only once")
            if index + 1 >= len(argv):
                raise _usage_error("--max-age needs a value")
            max_age = _normalize_decimal(argv[index + 1], option="--max-age")
            saw_max_age = True
            index += 2
            continue
        if not positional_only and value.startswith("-"):
            raise _usage_error(f"unknown flag: {value}")
        if not command:
            command = value
        else:
            operands.append(value)
        index += 1

    if not command:
        raise _usage_error("no command given")
    if command in {"acquire", "release", "peek"}:
        if len(operands) != 1:
            raise _usage_error(f"{command} needs exactly one path")
    elif command == "list":
        if operands:
            raise _usage_error("list does not accept positional arguments")
    elif command == "clear-stale":
        if len(operands) > 1:
            raise _usage_error("clear-stale accepts at most one positional max age")
        if operands and max_age is not None:
            raise _usage_error("choose either --max-age or a positional max age")
        if operands:
            max_age = _normalize_decimal(operands[0], option="clear-stale max age")
        if max_age is None:
            max_age = DEFAULT_CLEAR_AFTER_SECONDS
    else:
        raise _usage_error(
            f"unknown command: {command} (try acquire|release|list|clear-stale|peek)"
        )
    return ParsedArguments(command, tuple(operands), stale_after, max_age)


def _supports_confined_runtime() -> bool:
    required_dir_fd = (os.open, os.mkdir, os.stat, os.unlink, os.link)
    return (
        os.name != "nt"
        and hasattr(os, "O_DIRECTORY")
        and hasattr(os, "O_NOFOLLOW")
        and os.listdir in os.supports_fd
        and all(function in os.supports_dir_fd for function in required_dir_fd)
        and os.stat in os.supports_follow_symlinks
        and os.link in os.supports_follow_symlinks
    )


def _directory_flags() -> int:
    return os.O_RDONLY | os.O_DIRECTORY | getattr(os, "O_CLOEXEC", 0) | os.O_NOFOLLOW


def _fsync_directory(descriptor: int) -> None:
    try:
        os.fsync(descriptor)
    except OSError as exc:
        if exc.errno not in {errno.EINVAL, errno.ENOTSUP, errno.EROFS}:
            raise _runtime_error(f"cannot flush legacy lock directory: {exc}") from exc


def _open_root(vault_root: Path) -> int:
    if not _supports_confined_runtime():
        raise _runtime_error("this platform lacks no-follow directory-FD operations")
    try:
        descriptor = os.open(vault_root, _directory_flags())
        metadata = os.fstat(descriptor)
    except OSError as exc:
        raise _runtime_error(f"cannot open selected vault safely: {exc}") from exc
    if not stat.S_ISDIR(metadata.st_mode):
        os.close(descriptor)
        raise _runtime_error("selected vault is not a directory")
    return descriptor


def _open_child_directory(
    parent_descriptor: int,
    name: str,
    *,
    create: bool,
) -> int | None:
    try:
        descriptor = os.open(name, _directory_flags(), dir_fd=parent_descriptor)
    except FileNotFoundError:
        if not create:
            return None
        try:
            os.mkdir(name, 0o700, dir_fd=parent_descriptor)
            _fsync_directory(parent_descriptor)
            descriptor = os.open(name, _directory_flags(), dir_fd=parent_descriptor)
        except FileExistsError:
            try:
                descriptor = os.open(name, _directory_flags(), dir_fd=parent_descriptor)
            except OSError as exc:
                raise _runtime_error(
                    f"legacy runtime component is not a safe directory: {name}: {exc}"
                ) from exc
        except OSError as exc:
            raise _runtime_error(
                f"cannot create legacy runtime directory {name}: {exc}"
            ) from exc
    except OSError as exc:
        raise _runtime_error(
            f"legacy runtime component is not a safe directory: {name}: {exc}"
        ) from exc

    metadata = os.fstat(descriptor)
    if not stat.S_ISDIR(metadata.st_mode):
        os.close(descriptor)
        raise _runtime_error(f"legacy runtime component is not a directory: {name}")
    return descriptor


@contextmanager
def _lock_directory(vault_root: Path, *, create: bool) -> Iterator[int | None]:
    root_descriptor = _open_root(vault_root)
    meta_descriptor: int | None = None
    locks_descriptor: int | None = None
    try:
        meta_descriptor = _open_child_directory(
            root_descriptor, ".vault-meta", create=create
        )
        if meta_descriptor is None:
            yield None
            return
        locks_descriptor = _open_child_directory(
            meta_descriptor, "locks", create=create
        )
        yield locks_descriptor
    finally:
        if locks_descriptor is not None:
            os.close(locks_descriptor)
        if meta_descriptor is not None:
            os.close(meta_descriptor)
        os.close(root_descriptor)


@contextmanager
def _serialized_lock_directory(vault_root: Path) -> Iterator[int]:
    try:
        with MutationLock(vault_root, timeout=LOCK_TIMEOUT_SECONDS) as mutation_lock:
            # Use the exact `.vault-meta` directory pinned by MutationLock.
            # Re-resolving it by pathname here would create a split-lock race
            # if that public entry were renamed and replaced between the two
            # opens. The canonical API returns a duplicate that this adapter
            # owns and closes independently.
            pinned_meta = mutation_lock.duplicate_parent_fd()
            locks_descriptor: int | None = None
            try:
                locks_descriptor = _open_child_directory(
                    pinned_meta, "locks", create=True
                )
                if (
                    locks_descriptor is None
                ):  # pragma: no cover - create=True is exhaustive
                    raise _runtime_error("cannot create legacy lock directory")
                yield locks_descriptor
            finally:
                if locks_descriptor is not None:
                    os.close(locks_descriptor)
                os.close(pinned_meta)
    except TransactionConflict as exc:
        raise LegacyLockError(exc.code, str(exc), 75) from exc
    except TransactionValidationError as exc:
        raise LegacyLockError(exc.code, str(exc), 3) from exc
    except TransactionError as exc:
        raise LegacyLockError(exc.code, str(exc), exc.exit_code) from exc


def _normalized_relative_path(value: str) -> tuple[str, ...]:
    if not value:
        raise _path_error("path cannot be empty")
    if unicodedata.normalize("NFC", value) != value:
        raise _path_error("path must use NFC Unicode normalization")
    if len(value.encode("utf-8")) > MAX_PATH_BYTES:
        raise _path_error(f"path exceeds the {MAX_PATH_BYTES}-byte compatibility limit")
    if (
        "\\" in value
        or value.startswith("/")
        or _WINDOWS_DRIVE.match(value)
        or any(ord(character) < 32 or ord(character) == 127 for character in value)
    ):
        raise _path_error("path must be canonical vault-relative POSIX syntax")
    parsed = PurePosixPath(value)
    if (
        value in {".", ".."}
        or ".." in parsed.parts
        or parsed.as_posix() != value
        or any(part in {"", ".", ".."} for part in value.split("/"))
    ):
        raise _path_error(f"path must stay inside the vault: {value}")
    if any(
        len(part.encode("utf-8")) > MAX_PATH_COMPONENT_BYTES for part in parsed.parts
    ):
        raise _path_error(
            f"path component exceeds the {MAX_PATH_COMPONENT_BYTES}-byte portability limit"
        )
    return parsed.parts


def _validate_target_path(vault_root: Path, value: str) -> None:
    parts = _normalized_relative_path(value)
    descriptor = _open_root(vault_root)
    try:
        for index, part in enumerate(parts):
            try:
                metadata = os.stat(part, dir_fd=descriptor, follow_symlinks=False)
            except FileNotFoundError:
                return
            except OSError as exc:
                raise _path_error(
                    f"cannot inspect vault-relative path {value}: {exc}"
                ) from exc
            if stat.S_ISLNK(metadata.st_mode):
                raise _path_error(f"path may not traverse a symlink: {value}")
            if index == len(parts) - 1:
                return
            if not stat.S_ISDIR(metadata.st_mode):
                raise _path_error(f"path parent is not a directory: {value}")
            try:
                child = os.open(part, _directory_flags(), dir_fd=descriptor)
            except OSError as exc:
                raise _path_error(
                    f"cannot inspect vault-relative path {value}: {exc}"
                ) from exc
            os.close(descriptor)
            descriptor = child
    finally:
        os.close(descriptor)


def _lock_name(path: str) -> str:
    # SHA-1 is the fixed v1 filename wire format, not a security primitive.
    digest = hashlib.sha1(path.encode("utf-8"), usedforsecurity=False)
    return f"{digest.hexdigest()}.lock"


def _portable_lock_key(path: str) -> str:
    """Collapse aliases that can name one file on supported vault volumes."""

    return unicodedata.normalize("NFC", path.casefold())


def _read_bounded_regular(descriptor: int, name: str) -> bytes | None:
    try:
        before = os.stat(name, dir_fd=descriptor, follow_symlinks=False)
    except FileNotFoundError:
        return None
    except OSError:
        return b""
    if not stat.S_ISREG(before.st_mode) or before.st_size > MAX_RECORD_BYTES:
        return b""
    flags = os.O_RDONLY | getattr(os, "O_CLOEXEC", 0) | os.O_NOFOLLOW
    opened = -1
    try:
        opened = os.open(name, flags, dir_fd=descriptor)
        current = os.fstat(opened)
        if (
            not stat.S_ISREG(current.st_mode)
            or current.st_size > MAX_RECORD_BYTES
            or (current.st_dev, current.st_ino) != (before.st_dev, before.st_ino)
        ):
            return b""
        chunks: list[bytes] = []
        remaining = MAX_RECORD_BYTES + 1
        while remaining > 0:
            chunk = os.read(opened, min(remaining, 8192))
            if not chunk:
                break
            chunks.append(chunk)
            remaining -= len(chunk)
        raw = b"".join(chunks)
        after = os.fstat(opened)
        stable_fields = ("st_dev", "st_ino", "st_size", "st_mtime_ns", "st_mode")
        if len(raw) > MAX_RECORD_BYTES or any(
            getattr(current, field) != getattr(after, field) for field in stable_fields
        ):
            return b""
        return raw
    except OSError:
        return b""
    finally:
        if opened >= 0:
            os.close(opened)


def _parse_record(raw: bytes, *, expected_name: str) -> LockRecord | None:
    if not raw or not raw.endswith(b"\n") or b"\n" in raw[:-1] or b"\r" in raw:
        return None
    try:
        fields = raw[:-1].decode("utf-8").split(" ", 2)
    except UnicodeDecodeError:
        return None
    if len(fields) != 3:
        return None
    pid_text, epoch_text, path = fields
    try:
        pid = _normalize_decimal(pid_text, option="record pid")
        epoch = _normalize_decimal(epoch_text, option="record epoch")
        _normalized_relative_path(path)
    except LegacyLockError:
        return None
    if _lock_name(path) != expected_name:
        return None
    return LockRecord(pid=pid, epoch=epoch, path=path)


def _read_record(descriptor: int, name: str) -> RecordRead:
    raw = _read_bounded_regular(descriptor, name)
    if raw is None:
        return RecordRead(exists=False, record=None)
    return RecordRead(exists=True, record=_parse_record(raw, expected_name=name))


def _unlink(descriptor: int, name: str) -> bool:
    try:
        os.unlink(name, dir_fd=descriptor)
    except FileNotFoundError:
        return False
    except OSError as exc:
        raise _runtime_error(f"cannot remove legacy lock record safely: {exc}") from exc
    _fsync_directory(descriptor)
    return True


def _write_all(descriptor: int, data: bytes) -> None:
    offset = 0
    while offset < len(data):
        written = os.write(descriptor, data[offset:])
        if written <= 0:
            raise OSError("short write while creating legacy lock record")
        offset += written


def _atomic_create(descriptor: int, name: str, data: bytes) -> bool:
    temporary = f".{name}.{os.getpid()}.{uuid.uuid4().hex}.tmp"
    flags = (
        os.O_WRONLY
        | os.O_CREAT
        | os.O_EXCL
        | getattr(os, "O_CLOEXEC", 0)
        | os.O_NOFOLLOW
    )
    file_descriptor = -1
    linked = False
    try:
        file_descriptor = os.open(temporary, flags, 0o600, dir_fd=descriptor)
        _write_all(file_descriptor, data)
        os.fsync(file_descriptor)
        os.close(file_descriptor)
        file_descriptor = -1
        try:
            os.link(
                temporary,
                name,
                src_dir_fd=descriptor,
                dst_dir_fd=descriptor,
                follow_symlinks=False,
            )
            linked = True
        except FileExistsError:
            return False
        _fsync_directory(descriptor)
        return True
    except OSError as exc:
        raise _runtime_error(f"cannot create legacy lock record safely: {exc}") from exc
    finally:
        if file_descriptor >= 0:
            os.close(file_descriptor)
        try:
            os.unlink(temporary, dir_fd=descriptor)
        except FileNotFoundError:
            pass
        except OSError:
            if linked:
                # The published record is valid; an invisible temp hard link
                # can be cleaned by an operator without weakening the lock.
                pass


def _acquire(vault_root: Path, path: str, *, stale_after: int) -> int:
    _validate_target_path(vault_root, path)
    name = _lock_name(path)
    now = int(time.time())
    record = LockRecord(pid=os.getpid(), epoch=now, path=path)
    with _serialized_lock_directory(vault_root) as descriptor:
        existing = _read_record(descriptor, name)
        if existing.record is not None and now - existing.record.epoch <= stale_after:
            return 75
        # Preserve the exact SHA-1 v1 filename while conservatively excluding
        # case/Unicode aliases. Default macOS vault volumes resolve such names
        # to one file; allowing both locks would make safety host-dependent.
        requested_key = _portable_lock_key(path)
        for candidate in _record_names(descriptor):
            if candidate == name or not _HEX_SHA1_LOCK.fullmatch(candidate):
                continue
            collision = _read_record(descriptor, candidate).record
            if (
                collision is not None
                and _portable_lock_key(collision.path) == requested_key
                and now - collision.epoch <= stale_after
            ):
                return 75
        if existing.exists:
            _unlink(descriptor, name)
        return 0 if _atomic_create(descriptor, name, record.encode()) else 75


def _release(vault_root: Path, path: str) -> int:
    _validate_target_path(vault_root, path)
    with _serialized_lock_directory(vault_root) as descriptor:
        _unlink(descriptor, _lock_name(path))
    return 0


def _record_names(descriptor: int) -> list[str]:
    try:
        names: list[str] = []
        count = 0
        with os.scandir(descriptor) as entries:
            for entry in entries:
                count += 1
                if count > MAX_LOCK_DIRECTORY_ENTRIES:
                    raise _runtime_error(
                        "legacy lock directory exceeds its entry limit"
                    )
                if entry.name.endswith(".lock"):
                    names.append(entry.name)
        return sorted(names)
    except OSError as exc:
        raise _runtime_error(
            f"cannot list legacy lock directory safely: {exc}"
        ) from exc


def _list(vault_root: Path) -> int:
    with _lock_directory(vault_root, create=False) as descriptor:
        if descriptor is None:
            return 0
        now = int(time.time())
        for name in _record_names(descriptor):
            if not _HEX_SHA1_LOCK.fullmatch(name):
                print("WARN: ignored corrupt legacy lock record", file=sys.stderr)
                continue
            record = _read_record(descriptor, name).record
            if record is None:
                print("WARN: ignored corrupt legacy lock record", file=sys.stderr)
                continue
            print(f"pid={record.pid} age={now - record.epoch}s path={record.path}")
    return 0


def _clear_stale(vault_root: Path, *, max_age: int) -> int:
    removed = 0
    now = int(time.time())
    with _serialized_lock_directory(vault_root) as descriptor:
        for name in _record_names(descriptor):
            read = _read_record(descriptor, name)
            if read.record is None or now - read.record.epoch > max_age:
                removed += int(_unlink(descriptor, name))
    print(removed)
    return 0


def _peek(vault_root: Path, path: str) -> int:
    _validate_target_path(vault_root, path)
    with _lock_directory(vault_root, create=False) as descriptor:
        if descriptor is None:
            print("unheld")
            return 0
        record = _read_record(descriptor, _lock_name(path)).record
        if record is None:
            print("unheld")
        else:
            sys.stdout.buffer.write(record.encode())
    return 0


def _select_vault(plugin_root: Path) -> Path:
    raw = os.environ.get("WIKI_LOCK_VAULT") or os.environ.get("CLAUDE_OBSIDIAN_VAULT")
    try:
        vault_root = canonical(raw if raw else Path.cwd())
    except OSError as exc:
        raise _usage_error(
            f"selected legacy lock vault cannot be resolved: {exc}"
        ) from exc
    try:
        metadata = vault_root.lstat()
    except OSError as exc:
        raise _usage_error("selected legacy lock vault is not a directory") from exc
    if not stat.S_ISDIR(metadata.st_mode):
        raise _usage_error("selected legacy lock vault is not a directory")
    try:
        return assert_not_plugin_tree(vault_root, plugin_root, source="legacy-lock")
    except VaultSelectionError as exc:
        raise _usage_error(str(exc)) from exc


def run(argv: Sequence[str], *, plugin_root: Path) -> int:
    parsed = _parse_arguments(argv)
    vault_root = _select_vault(plugin_root)
    command = parsed.command
    if command == "acquire":
        return _acquire(vault_root, parsed.operands[0], stale_after=parsed.stale_after)
    if command == "release":
        return _release(vault_root, parsed.operands[0])
    if command == "list":
        return _list(vault_root)
    if command == "clear-stale":
        assert parsed.max_age is not None
        return _clear_stale(vault_root, max_age=parsed.max_age)
    if command == "peek":
        return _peek(vault_root, parsed.operands[0])
    raise AssertionError(f"unreachable command: {command}")


def main(argv: Sequence[str] | None = None) -> int:
    arguments = tuple(sys.argv[1:] if argv is None else argv)
    plugin_root = Path(__file__).resolve().parents[1]
    try:
        return run(arguments, plugin_root=plugin_root)
    except LegacyLockError as exc:
        stream = sys.stdout if exc.exit_code == 0 else sys.stderr
        if exc.exit_code == 0:
            print(str(exc), file=stream)
        else:
            print(f"ERR: {exc}", file=stream)
        return exc.exit_code
    except (OSError, ValueError) as exc:
        print(f"ERR: legacy lock operation failed safely: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
