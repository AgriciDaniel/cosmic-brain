# Windows host, WSL writes (fork setup)

Fork-local companion to [windows-wsl.md](windows-wsl.md). That guide explains
*why* vault writes require WSL; this one records how this fork actually runs on
a Windows host with the vault kept on an NTFS Windows drive.

## The wrapper

`bin/co.sh` is the single entry point for every core call.

```bash
bash bin/co.sh doctor --vault 'P:/vaults/main'
bash bin/co.sh init 'P:/vaults/main'
```

On Linux and macOS it calls `scripts/claude-obsidian.py` directly. On native
Windows it translates drive-letter paths (`P:\vaults\main` and `P:/vaults/main`
both become `/mnt/p/vaults/main`) and re-runs the command inside WSL. Skills
keep their upstream instructions; point their `CORE` at this wrapper instead of
at `python3 "$CORE"`.

| Variable | Default | Purpose |
|---|---|---|
| `CO_WSL_DISTRO` | `Debian` | Which distribution runs the core |
| `CO_WSL_MOUNT_ROOT` | `/mnt` | DrvFs mount root inside that distribution |
| `CO_PYTHON` | `python3` | Interpreter name |
| `CO_PRINT_COMMAND` | unset | Print the resolved command instead of running it |

Git Bash rewrites POSIX-looking arguments before handing them to a Windows
executable, which would turn `/mnt/p/...` into `C:/Program Files/Git/mnt/p/...`.
The wrapper sets `MSYS_NO_PATHCONV` and `MSYS2_ARG_CONV_EXCL` to stop that.

`tests/test_co_wrapper.sh` covers the translation from either host.

## Required: DrvFs metadata

A vault on a mounted Windows drive needs metadata support, or applies fail
after the write with:

```
ERR RESULT_DRIFT: completed operation path drifted: .claude-obsidian.json
(expected sha256=… mode=0600, found sha256=… mode=511)
```

Content hashes match; only the mode does not. Without the `metadata` mount
option, DrvFs reports every file as `0777` (decimal 511) and `chmod` is a no-op,
so the transaction's own verification fails and rolls the operation back. The
rollback is clean — only `.vault-meta/transactions/<id>/` survives — but no
write ever completes.

Enable it once (**inside WSL, requires your sudo password**):

```bash
printf '[automount]\noptions = "metadata"\n' | sudo tee /etc/wsl.conf
```

Then from Windows:

```powershell
wsl --shutdown
```

Verify after the distribution restarts:

```bash
mount | grep ' /mnt/p '   # should now list metadata among the options
```

The alternative is moving the vault inside the WSL filesystem, which upstream
recommends and which sidesteps this entirely.

## Plan and apply pin together

Approval hashes bind to the environment that produced them, and the plan hash
covers `operation_id` and `generated_at`. Re-running a bare dry-run before the
apply produces a *new* plan and fails with `PLAN_CHANGED`. Pin all three values
from the dry-run you reviewed:

```bash
bash bin/co.sh init 'P:/vaults/main' \
  --operation-id init-20260814T212039Z \
  --generated-at 2026-08-14T21:20:39Z \
  --approved-plan-sha256 ec5727c5… \
  --apply
```

Because the wrapper always routes through WSL, the dry-run and the apply share
an environment automatically — the native/WSL hash mismatch described upstream
cannot happen as long as every call goes through `bin/co.sh`.
