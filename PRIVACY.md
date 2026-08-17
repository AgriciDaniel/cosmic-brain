# Privacy

claude-obsidian is local-first and has no telemetry or analytics. The portable
core stores vault content on the selected filesystem and does not make network
requests. This does not mean every host is offline: the AI coding agent, an
invoked web tool, or a configured external adapter may send selected content to
its provider under that tool's own policy.

## Local by default

- Markdown pages, raw source bytes, ledgers, queues, transaction journals,
  BM25 indexes, and hot context stay in the user vault by default.
- The SessionStart hook is silent unless the user explicitly exports
  `CLAUDE_OBSIDIAN_SESSION_CONTEXT=1`. With that opt-in, it emits bounded,
  sanitized `wiki/hot.md` data into the Claude session context; it never
  captures a transcript. A workspace config may spend that global consent only
  on a vault inside its own project tree. For an intentional external-vault
  route, also set `CLAUDE_OBSIDIAN_SESSION_CONTEXT_VAULT` to that vault's exact
  canonical path; this prevents an untrusted project config from redirecting
  automatic context injection into another private vault.
- The Stop hook emits only aggregate recovery state when intervention is
  required; it does not include operation identifiers, paths, or note content.
- Filesystem capture copies bytes content-addressably and never removes the
  visible inbox source.
- Image, PDF, and EPUB support is metadata-only in core. URL, YouTube, OCR,
  transcription, and semantic extraction do not execute in core.
- Lint, migration dry runs, capture plans, contract checks, and artifact audits
  are read-only.

## Explicit egress

Network access requires an intentional workflow and consent at the operation
boundary:

- `autoresearch` and URL cleaning send search terms or URLs through the host's
  web tools.
- Contextual-prefix generation may send page text to a configured model only
  with its explicit egress flag; local/BM25 fallbacks remain available.
- Remote Ollama endpoints are refused unless the remote opt-in is supplied.
- External capture actions are inert argv plans. A separately configured runner
  must revalidate HTTPS redirects and public network addresses before use.

Never put credentials in a source note, URL query, tracked config, transaction
bundle, or capture queue. Distribution builds also reject recognizable personal
email addresses; only reserved example domains and GitHub-generated noreply
identities are accepted. Release scanning is defense in depth, not a secrets or
identity-discovery service. See [SECURITY.md](SECURITY.md) for private reporting.
