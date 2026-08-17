# External read transports

The portable baseline reads vault files directly. The official Obsidian CLI is
an optional read surface when runtime probing reports it usable. MCP servers and
REST plugins are optional third-party integrations, never prerequisites.

## Selection policy

1. Prefer direct filesystem reads for portability and least privilege.
2. Use the official Obsidian CLI read-only when `detect-transport.sh --peek`
   reports it usable.
3. Consider an MCP or REST adapter only when the user needs a capability the
   first two choices cannot provide and explicitly approves installation.
4. Keep all vault mutations in a claude-obsidian operation transaction. An
   external transport must not bypass expected hashes, journaling, or recovery.

## Third-party review

Installation recipes, package names, flags, and permissions change. Consult the
adapter's current primary documentation before use, pin a reviewed version,
and verify publisher and source. Do not execute floating `latest` packages,
unverified downloads, or opaque install scripts from this reference.

For any adapter:

- grant access only to the selected vault;
- bind network listeners to loopback unless the user has designed and approved
  authenticated remote access;
- keep tokens out of notes, shell history, logs, and repository files;
- preserve TLS verification rather than using global bypass environment flags;
- default to read-only and test with non-sensitive data;
- document what data can leave the machine and how to disable the adapter.

Loopback binding reduces exposure but does not make disabled certificate
verification or leaked bearer tokens safe.

## Verification

Report adapter readiness only after a harmless read probe succeeds. Binary or
configuration presence alone means `available`, not `verified`. If a probe
fails, fall back to filesystem reads without changing mutation semantics.
