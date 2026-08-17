# Optional Git history

Git is optional. Vault correctness comes from operation transactions, expected
hashes, recovery journals, and deterministic validation, not from background
commits.

## Initialize only with approval

Do not initialize a repository, add a remote, stage files, commit, or push merely
because a vault was scaffolded. If the user requests local history, first show
the selected vault and planned action, then initialize Git in that vault. Keep
workspace state, caches, secrets, and trash excluded.

A typical user-vault ignore policy includes:

```gitignore
.obsidian/workspace.json
.obsidian/workspace-mobile.json
.trash/
.DS_Store
.vault-meta/
```

Transaction bundles, recovery journals, queues, and derived chunks may contain
note text, local paths, or source URLs, so keep all `.vault-meta/` ignored by
default. If the user deliberately wants to version a stable configuration file
from that directory, add the narrowest reviewed exception while leaving runtime
subtrees ignored. Adjust the remaining entries to actual plugins and privacy
needs. Do not copy the product repository's ignore file blindly.

`checkpoint` commits exactly one completed operation and therefore requires an
existing parent commit. After `git init`, create a separate reviewed baseline
before running any operation you intend to checkpoint:

```bash
git status --short
git add -- <reviewed-baseline-paths>
git diff --cached --stat
git diff --cached
git commit -m "vault: reviewed baseline"
```

Select baseline paths deliberately; do not stage ignored runtime state, secrets,
or raw payloads merely to make the repository non-empty. The checkpoint command
never creates this baseline or silently folds pre-existing files into an
operation commit.

## Exact-operation checkpoints

After a successful claude-obsidian transaction, an explicitly requested
checkpoint is:

```bash
python3 "$CORE" checkpoint OPERATION_ID --vault "$VAULT"
```

The command verifies recorded hashes, refuses any pre-existing staged state,
runs deterministic lint by default, and excludes raw source payloads unless the
user opts in. It builds and verifies the commit through a temporary index, then
advances the ref by compare-and-swap. A durable pending record makes an
interrupted finalization retry-safe. Review the returned commit with `git show`.
Pushing or adding a remote is a separate external action that requires explicit
user authorization.

Avoid automatic-commit plugins during agent operations because they can capture
partial or unrelated state and invalidate exact-operation history.
