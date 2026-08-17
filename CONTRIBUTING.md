# Contributing to claude-obsidian

Contributions are welcome in the public canonical repository:
https://github.com/AgriciDaniel/claude-obsidian.

For a substantial change, open an issue that describes the user problem,
proposed behavior, compatibility impact, privacy/egress implications, and a
hermetic test strategy. Security reports follow [SECURITY.md](SECURITY.md), not
the public issue tracker.

## Engineering contract

- Read the affected behavior, callers, contracts, and tests before editing.
- Keep product code and user-vault state separate.
- Prefer the smallest deterministic implementation with explicit failure and
  recovery behavior.
- Preserve existing user files unless the user reviews an explicit replacement
  or destructive plan.
- Route one logical knowledge mutation through one recoverable transaction.
- Keep parallel workers draft-only and query/lint operations read-only.
- Require explicit consent for remote egress, destructive repair, and external
  state changes.
- Do not add capability, performance, or competitor claims without current,
  traceable evidence.
- Keep skill frontmatter to exactly `name` and `description`.

## Local workflow

Create a focused branch from a public fork. Python 3.11 or newer is required.
The public default branch is an artifact-clean, self-validating product tree;
never add root vault state (`wiki/`, `.raw/`, or `.vault-meta/`) to a
contribution.

```bash
make test
```

The test target discovers every `tests/test_*.py` and `tests/test_*.sh` file,
then executes product/capability and package contracts. Tests must be hermetic:
no network, model server, personal paths, global config, or persistent product
state. A network integration belongs behind an explicit consent flag and needs
an offline test double.

Behavior changes should include:

1. a regression test that fails for the old behavior;
2. success, conflict, invalid-input, and recovery coverage proportional to risk;
3. updated user and contract documentation;
4. an entry under `## [Unreleased]` in `CHANGELOG.md`.

Run the read-only fresh-context verifier in `agents/verifier.md` for non-trivial
changes. It may inspect the full worktree or a declared path scope; it never
stages, commits, pushes, or modifies files. Resolve BLOCKER and HIGH findings
before requesting review.

Use Conventional Commits where practical. The pull request should explain the
problem, behavior, compatibility/rollback story, exact verification run, and
any remaining limitations. Do not include vault content, credentials, generated
runtime state, or unreviewed binaries.

By contributing, you agree that your contribution is licensed under the
[MIT License](LICENSE) and governed by [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
