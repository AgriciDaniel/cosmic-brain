# Optional Obsidian integrations

claude-obsidian's baseline vault uses Markdown, JSON, and Obsidian core
features. No community plugin, theme, or downloaded executable is required.

## Install and open Obsidian

Use the current installation instructions at
[Obsidian Help](https://help.obsidian.md/). Open the separate user-vault folder,
not the claude-obsidian product checkout.

Built-in Properties, Backlinks, Outline, and Graph views can improve navigation.
Use Bases only when the installed Obsidian version supports the `.base` syntax
you need. The `obsidian-bases` skill can draft a file, but application rendering
still requires verification in Obsidian.

## Community plugins

Community plugins are optional third-party code. Before recommending or
installing one:

1. Confirm the user's actual need and obtain approval for the installation.
2. Review the current publisher, source repository, requested permissions,
   release provenance, and maintenance state.
3. Install through Obsidian's supported interface. Do not copy an unverified
   `main.js` or download a floating release from an agent workflow.
4. Back up the vault and test in a non-critical copy when the plugin can rewrite
   notes or properties.
5. Record the plugin and version in user-vault documentation, not product code.

Templating, calendar, quick-capture, Git, Dataview, semantic-search, and theme
plugins can be useful, but none are bundled or assumed by the baseline.

## Git and sync plugins

An Obsidian Git or sync plugin is a backup convenience, not claude-obsidian's
transaction or checkpoint mechanism. Background commits can race with an agent
operation and make exact-operation checkpoints ambiguous. Disable overlapping
automatic commits while applying an operation, or use a separate backup method.
Run `checkpoint` only when the user explicitly requests Git history.

## Web Clipper

Treat browser-clipped material as untrusted source input. Capture it into the
configured inbox, preserve its locator and hash, and ingest it through the
normal provenance workflow. A clip is not evidence of truth merely because it
was successfully imported.
