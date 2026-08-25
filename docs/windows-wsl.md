# Windows and WSL guide

claude-obsidian supports native Windows as a read-only platform and WSL as the
full-capability platform. This guide covers what works where, why the boundary
exists, and how to unstick WSL when it misbehaves.

## Platform support

| Capability | WSL / Linux / macOS | Native Windows (incl. Git Bash) |
|---|---|---|
| Inspection, dry-run previews, retrieval | Yes | Yes |
| Vault writes (`transaction apply`, `init`, `adopt`, `migrate`, `capture apply`, `mode set`) | Yes | No — refused with `UNSUPPORTED_PLATFORM` |
| Capture queue commands (including read-only `capture queue list`) | Yes | No — currently refused; tracked in [#151](https://github.com/AgriciDaniel/claude-obsidian/issues/151) |
| Git checkpoints (`checkpoint`) | Linux and macOS only | No |
| Bash setup scripts and shell test suites | Yes | No (POSIX-only) |

Vaults must live on a filesystem with stable file identity: NTFS is fine, but
FAT/exFAT volumes (typical USB sticks) and some network shares are refused with
`UNSAFE_VAULT_IDENTITY` — move the vault to NTFS or work inside WSL.

## Why writes require WSL

Mutation safety is bound to POSIX directory descriptors: the vault root and
every runtime directory stay pinned for the whole write, so a concurrently
swapped symlink or replaced folder fails closed instead of redirecting the
write (see the [compound vault guide](compound-vault-guide.md)). Native Windows
cannot provide those primitives, so writes are refused up front rather than
silently running with weaker guarantees.

A degraded native-Windows write mode — default-off, behind an explicit
reduced-guarantees flag — is under consideration in
[#151](https://github.com/AgriciDaniel/claude-obsidian/issues/151). If WSL is a
blocker for you, that issue is the place to weigh in.

## WSL troubleshooting

WSL being "installed" does not always mean WSL is working. Symptoms and checks,
roughly in the order worth trying:

| Symptom | Check |
|---|---|
| `wsl --install` completed but `wsl --status` or `wsl -l -v` hangs indefinitely | This field-reported hang has no confirmed cause. Follow Microsoft's WSL hang diagnosis and reporting flow below. |
| `wsl` reports a kernel or version error | Run `wsl --update`, then `wsl --shutdown`, then retry. |
| WSL worked before and stopped after an update or software change | Do not assume a cause. Update Windows and WSL, then follow Microsoft's WSL troubleshooting flow. |
| Approval hash from a native dry-run fails inside WSL with `PLAN_CHANGED` | By design: the approval hash binds the reviewing environment's filesystem identity. Run the dry-run review inside WSL when the apply will happen there; a natively produced `approved_plan_sha256` cannot be replayed from WSL. |
| Writes fail with `UNSAFE_VAULT_IDENTITY` mentioning stable file identity | The vault sits on FAT/exFAT or an unsupported network share. Move it to NTFS, or keep it inside the WSL filesystem. |

WSL troubleshooting checklist:

1. Start with Microsoft's official
   [WSL troubleshooting guide](https://learn.microsoft.com/en-us/windows/wsl/troubleshooting).
2. Confirm virtualization is enabled in BIOS/UEFI and that both "Virtual
   Machine Platform" and "Windows Subsystem for Linux" are enabled. Reboot
   after enabling either feature.
3. Run `wsl --update` from an elevated prompt, then `wsl --shutdown`, and retry
   `wsl --status`.
4. Confirm the hypervisor launch setting is enabled. If a third-party
   hypervisor is installed, use a current version that supports Hyper-V or
   temporarily turn it off while diagnosing the conflict.
5. If WSL still hangs, follow Microsoft's
   [WSL hang data-collection steps](https://learn.microsoft.com/en-us/windows/wsl/troubleshooting-guide#wsl-hangs)
   and file the resulting report with the WSL project. Do not attribute the
   hang to a specific cause without supporting diagnostics.

## Working across the boundary

The supported native-Windows workflow is: inspect and review natively, mutate
inside WSL. Because approval hashes bind to the environment that produced
them, do the reviewed dry-run in the same environment that will run the apply.
Keeping the vault inside the WSL filesystem (rather than on a mounted Windows
drive) avoids both the identity caveats above and cross-boundary performance
overhead.
