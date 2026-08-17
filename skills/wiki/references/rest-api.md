# REST adapter safety contract

The Local REST API is an optional third-party Obsidian plugin. claude-obsidian
does not install it, require it, or use it as a mutation transport.

## Before use

- Confirm the user installed and enabled the plugin intentionally.
- Read the plugin's current primary documentation and verify the exact API
  version and endpoints instead of relying on remembered examples.
- Keep the listener on loopback by default and store its credential in a
  protected environment or secret manager.
- Never print the credential, embed it in a note, commit it, or place it in a
  reusable command transcript.
- Require normal TLS verification. Do not use `curl -k`,
  `NODE_TLS_REJECT_UNAUTHORIZED=0`, or another process-wide bypass.

## Allowed role

Use a configured REST adapter only for read and search operations that the user
has placed in scope. Validate returned paths and reject traversal or symlink
escapes. A successful HTTP response proves transport behavior, not the truth of
the returned content.

Create, replace, append, patch, move, and delete requests are outside this
adapter contract. Express every vault change as one inspected
`claude-obsidian.transaction.v1` operation so expected hashes, provenance,
journaling, and recovery remain enforced.

If secure TLS or least-privilege access cannot be configured, use direct
filesystem reads or the verified official CLI read surface instead.
