"""Vault-root discovery and path-containment helpers."""

from __future__ import annotations

import errno
import json
import os
import stat
import unicodedata
from dataclasses import dataclass
from pathlib import Path
from typing import Mapping

from .json_utils import parse_finite_json_float

WORKSPACE_CONFIG = ".claude-obsidian.json"
VAULT_SCHEMA = "claude-obsidian.workspace.v1"
MAX_WORKSPACE_CONFIG_BYTES = 64 * 1024


class VaultSelectionError(RuntimeError):
    """Raised when a mutable command cannot select one safe vault root."""

    def __init__(self, code: str, message: str):
        super().__init__(message)
        self.code = code


@dataclass(frozen=True)
class VaultSelection:
    root: Path
    source: str
    legacy: bool = False


def canonical(path: str | os.PathLike[str] | Path) -> Path:
    return Path(path).expanduser().resolve(strict=False)


def is_relative_to(path: Path, parent: Path) -> bool:
    try:
        path.relative_to(parent)
        return True
    except ValueError:
        return False


def _portable_path_key(path: Path) -> str:
    """Return the case/normalization-insensitive identity used by policy."""

    return unicodedata.normalize("NFC", os.fspath(path).replace("\\", "/").casefold())


def supports_confined_dirfd() -> bool:
    """True when the POSIX openat-style confinement primitives all exist.

    Native Windows lacks ``O_DIRECTORY`` and dir_fd support entirely; callers
    take a path-based degraded branch there instead of descriptor confinement.
    ``legacy_lock._supports_confined_runtime`` and the inline probe in
    ``hook_adapter`` intentionally require different primitive sets and stay
    separate.
    """

    return (
        os.name != "nt"
        and hasattr(os, "O_DIRECTORY")
        and os.open in os.supports_dir_fd
        and os.mkdir in os.supports_dir_fd
        and os.rename in os.supports_dir_fd
        and os.stat in os.supports_dir_fd
        and os.unlink in os.supports_dir_fd
    )


def directory_open_flags() -> int:
    """Directory-pinning open flags; flags absent on this platform become 0."""

    return (
        os.O_RDONLY
        | getattr(os, "O_DIRECTORY", 0)
        | getattr(os, "O_CLOEXEC", 0)
        | getattr(os, "O_NOFOLLOW", 0)
    )


def read_open_flags() -> int:
    """Regular-file read flags.

    ``O_BINARY`` matters: the Windows CRT defaults descriptors to text mode,
    which strips ``\\r\\n`` during reads and silently corrupts content hashes.
    """

    return (
        os.O_RDONLY
        | getattr(os, "O_CLOEXEC", 0)
        | getattr(os, "O_NOFOLLOW", 0)
        | getattr(os, "O_BINARY", 0)
    )


# Name-surrogate reparse tags only: symlinks and junctions/mount points redirect
# the name lookup, while cloud placeholders (OneDrive/Dropbox) and dedup files
# carry FILE_ATTRIBUTE_REPARSE_POINT without aliasing the path, so a blanket
# attribute check would fail-closed every vault stored in a synced folder.
_NAME_SURROGATE_REPARSE_TAGS = frozenset(
    {
        getattr(stat, "IO_REPARSE_TAG_SYMLINK", 0xA000000C),
        getattr(stat, "IO_REPARSE_TAG_MOUNT_POINT", 0xA0000003),
    }
)


def is_name_surrogate(value: os.stat_result) -> bool:
    """True when the stat result names a path-redirecting object.

    Covers POSIX symlinks plus Windows junctions/mount points, which since
    Python 3.8 lstat as ordinary directories (``S_ISLNK`` is False) but still
    redirect name lookups exactly like a symlink would.
    """

    return (
        stat.S_ISLNK(value.st_mode)
        or getattr(value, "st_reparse_tag", 0) in _NAME_SURROGATE_REPARSE_TAGS
    )


def assert_unaliased_directory(path: str | os.PathLike[str] | Path) -> os.stat_result:
    """lstat ``path`` and fail unless it is a plain, non-redirecting directory.

    This is a point-in-time check, not descriptor pinning: it offers the same
    guarantee level as the documented degraded (non-dirfd) mode.  Raises
    ``OSError(ELOOP)`` for a symlink or a Windows junction/mount point and
    ``OSError(ENOTDIR)`` for anything that is not a directory, mirroring what
    ``O_DIRECTORY | O_NOFOLLOW`` opens produce on POSIX so callers can share
    one error-mapping path.
    """

    value = os.lstat(path)
    if is_name_surrogate(value):
        raise OSError(errno.ELOOP, f"path is a symlink or directory junction: {path}")
    if not stat.S_ISDIR(value.st_mode):
        raise OSError(errno.ENOTDIR, f"not a directory: {path}")
    return value


def is_same_object(left: os.stat_result, right: os.stat_result) -> bool:
    """samestat with a degraded-identity guard.

    A zero inode (FAT/exFAT, some SMB redirectors) means the filesystem does
    not expose stable identity, so equality can never be asserted.
    """

    if left.st_ino == 0 or right.st_ino == 0:
        return False
    return (left.st_dev, left.st_ino) == (right.st_dev, right.st_ino)


def _strict_json_loads(value: str) -> object:
    def reject_duplicates(pairs: list[tuple[str, object]]) -> dict[str, object]:
        result: dict[str, object] = {}
        for key, item in pairs:
            if key in result:
                raise ValueError(f"duplicate JSON object key: {key}")
            result[key] = item
        return result

    def reject_constant(constant: str) -> None:
        raise ValueError(f"non-finite JSON number is not permitted: {constant}")

    return json.loads(
        value,
        object_pairs_hook=reject_duplicates,
        parse_constant=reject_constant,
        parse_float=parse_finite_json_float,
    )


def assert_within(
    root: Path,
    candidate: str | os.PathLike[str] | Path,
    *,
    allow_root: bool = False,
) -> Path:
    """Return a canonical candidate or reject a path outside ``root``.

    Existing symlinks are resolved by :meth:`Path.resolve`; non-existing leaf
    paths inherit the canonicalized parent. This makes the check suitable for
    both reads and planned writes.
    """

    root = canonical(root)
    raw = Path(candidate)
    joined = raw if raw.is_absolute() else root / raw
    resolved = joined.resolve(strict=False)
    if resolved == root and allow_root:
        return resolved
    if resolved == root or not is_relative_to(resolved, root):
        raise VaultSelectionError(
            "PATH_OUTSIDE_VAULT",
            f"path resolves outside the selected vault: {candidate}",
        )
    return resolved


def _read_workspace_config(path: Path) -> Path:
    descriptor = -1
    try:
        before = path.lstat()
        if (
            not stat.S_ISREG(before.st_mode)
            or before.st_size > MAX_WORKSPACE_CONFIG_BYTES
        ):
            raise ValueError(
                f"workspace config must be a regular file of at most "
                f"{MAX_WORKSPACE_CONFIG_BYTES} bytes"
            )
        descriptor = os.open(path, read_open_flags())
        opened = os.fstat(descriptor)
        if (
            not stat.S_ISREG(opened.st_mode)
            or (opened.st_dev, opened.st_ino) != (before.st_dev, before.st_ino)
            or opened.st_size > MAX_WORKSPACE_CONFIG_BYTES
        ):
            raise ValueError("workspace config changed before it could be read")
        raw = os.read(descriptor, MAX_WORKSPACE_CONFIG_BYTES + 1)
        if len(raw) > MAX_WORKSPACE_CONFIG_BYTES or os.read(descriptor, 1):
            raise ValueError("workspace config exceeds its read limit")
        after = os.fstat(descriptor)
        stable = ("st_dev", "st_ino", "st_size", "st_mtime_ns", "st_mode")
        if any(getattr(opened, field) != getattr(after, field) for field in stable):
            raise ValueError("workspace config changed while it was read")
        data = _strict_json_loads(raw.decode("utf-8"))
    except (OSError, UnicodeDecodeError, json.JSONDecodeError, ValueError) as exc:
        raise VaultSelectionError(
            "INVALID_WORKSPACE_CONFIG", f"cannot read {path}: {exc}"
        ) from exc
    finally:
        if descriptor >= 0:
            os.close(descriptor)
    if not isinstance(data, dict):
        raise VaultSelectionError(
            "INVALID_WORKSPACE_CONFIG", f"{path} root must be a JSON object"
        )
    if data.get("schema") != VAULT_SCHEMA:
        raise VaultSelectionError(
            "INVALID_WORKSPACE_CONFIG",
            f"{path} must declare schema={VAULT_SCHEMA!r}",
        )
    configured = data.get("vault")
    if not isinstance(configured, str) or not configured.strip():
        raise VaultSelectionError(
            "INVALID_WORKSPACE_CONFIG", f"{path} has no non-empty 'vault' value"
        )
    candidate = Path(configured).expanduser()
    if not candidate.is_absolute():
        candidate = path.parent / candidate
    return canonical(candidate)


def _find_workspace_config(start: Path) -> tuple[Path, Path] | None:
    current = canonical(start)
    if current.is_file():
        current = current.parent
    for directory in (current, *current.parents):
        config = directory / WORKSPACE_CONFIG
        try:
            config.lstat()
        except FileNotFoundError:
            continue
        except OSError as exc:
            raise VaultSelectionError(
                "INVALID_WORKSPACE_CONFIG", f"cannot inspect {config}: {exc}"
            ) from exc
        return config, _read_workspace_config(config)
    return None


def is_initialized_vault(path: Path) -> bool:
    path = canonical(path)
    return (path / "wiki").is_dir() and (
        (path / ".obsidian").is_dir() or (path / ".raw").is_dir()
    )


def is_adoptable_vault(path: Path) -> bool:
    path = canonical(path)
    return path.is_dir() and (
        (path / ".obsidian").is_dir()
        or (path / "wiki").is_dir()
        or (path / WORKSPACE_CONFIG).is_file()
    )


def _nearest_vault(start: Path) -> Path | None:
    current = canonical(start)
    if current.is_file():
        current = current.parent
    for directory in (current, *current.parents):
        if is_initialized_vault(directory):
            return directory
    return None


def validate_vault_root(
    root: str | os.PathLike[str] | Path,
    *,
    allow_uninitialized: bool = False,
) -> Path:
    resolved = canonical(root)
    if not resolved.exists():
        if allow_uninitialized:
            parent = resolved.parent
            if not parent.exists() or not parent.is_dir():
                raise VaultSelectionError(
                    "VAULT_PARENT_MISSING", f"vault parent does not exist: {parent}"
                )
            return resolved
        raise VaultSelectionError("VAULT_MISSING", f"vault does not exist: {resolved}")
    if not resolved.is_dir():
        raise VaultSelectionError("VAULT_NOT_DIRECTORY", f"not a directory: {resolved}")
    if not allow_uninitialized and not is_adoptable_vault(resolved):
        raise VaultSelectionError(
            "VAULT_SENTINEL_MISSING",
            f"{resolved} is not a claude-obsidian or Obsidian vault",
        )
    return resolved


def assert_not_plugin_tree(
    candidate: str | os.PathLike[str] | Path,
    plugin_root: str | os.PathLike[str] | Path,
    *,
    source: str = "explicit",
) -> Path:
    """Reject mutable vault state anywhere inside the installed product tree."""

    resolved = canonical(candidate)
    plugin = canonical(plugin_root)
    resolved_key = _portable_path_key(resolved)
    plugin_key = _portable_path_key(plugin).rstrip("/")
    same_product = resolved_key == plugin_key
    product_descendant = resolved_key.startswith(plugin_key + "/")
    if same_product:
        if source == "cwd-discovery":
            raise VaultSelectionError(
                "PLUGIN_ROOT_IS_NOT_VAULT",
                "implicit discovery selected the plugin installation; pass a user vault with --vault",
            )
        raise VaultSelectionError(
            "PLUGIN_ROOT_IS_NOT_VAULT",
            "refusing to write mutable vault state into the plugin installation",
        )
    if product_descendant:
        raise VaultSelectionError(
            "PLUGIN_TREE_IS_NOT_VAULT",
            "refusing to write mutable vault state into plugin templates, examples, or other product files",
        )
    return resolved


def resolve_vault_root(
    explicit: str | os.PathLike[str] | Path | None = None,
    *,
    start: str | os.PathLike[str] | Path | None = None,
    environ: Mapping[str, str] | None = None,
    plugin_root: str | os.PathLike[str] | Path | None = None,
    allow_uninitialized: bool = False,
    allow_plugin_root: bool = False,
) -> VaultSelection:
    """Resolve one vault using documented precedence and fail closed.

    Precedence: explicit argument, ``CLAUDE_OBSIDIAN_VAULT``, nearest workspace
    config, then nearest initialized vault from the current working directory.
    The plugin installation root is never accepted by implicit discovery.
    """

    env = os.environ if environ is None else environ
    cwd = canonical(Path.cwd() if start is None else start)
    plugin = canonical(plugin_root) if plugin_root is not None else None
    source: str
    if explicit is not None:
        candidate = canonical(explicit)
        source = "explicit"
    elif env.get("CLAUDE_OBSIDIAN_VAULT"):
        candidate = canonical(env["CLAUDE_OBSIDIAN_VAULT"])
        source = "environment"
    else:
        configured = _find_workspace_config(cwd)
        if configured is not None:
            _, candidate = configured
            source = "workspace-config"
        else:
            # Product distributions intentionally exclude contributor vault
            # sentinels.  Refuse implicit discovery from the product tree
            # before searching ancestors so source and packaged checkouts have
            # identical, actionable behavior.
            if plugin is not None and not allow_plugin_root:
                assert_not_plugin_tree(cwd, plugin, source="cwd-discovery")
            nearest = _nearest_vault(cwd)
            if nearest is None:
                raise VaultSelectionError(
                    "VAULT_NOT_FOUND",
                    "no vault selected; pass --vault or set CLAUDE_OBSIDIAN_VAULT",
                )
            candidate = nearest
            source = "cwd-discovery"

    candidate = validate_vault_root(candidate, allow_uninitialized=allow_uninitialized)
    if plugin is not None and not allow_plugin_root:
        assert_not_plugin_tree(candidate, plugin, source=source)

    legacy = not (candidate / WORKSPACE_CONFIG).is_file()
    return VaultSelection(root=candidate, source=source, legacy=legacy)
