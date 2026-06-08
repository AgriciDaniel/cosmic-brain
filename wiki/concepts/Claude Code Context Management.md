---
type: concept
title: "Claude Code Context Management"
created: 2026-05-25
updated: 2026-05-25
address: c-000035
status: developing
tags:
  - claude-code
  - context-management
  - token-efficiency
  - session-management
related:
  - "[[Claude Code Best Practices]]"
  - "[[LLM Wiki Pattern]]"
  - "[[Hot Cache]]"
---

# Claude Code Context Management

The context window is **the most important resource to manage** in Claude Code. Every message, file read, and command output consumes it. LLM performance degrades as context fills — Claude may "forget" earlier instructions or make more mistakes.

Track usage: custom status line at <https://code.claude.com/docs/en/statusline>.

## Why Context Matters

- Single debugging session can consume tens of thousands of tokens
- Performance degrades with filling context
- "Forgetting" earlier instructions → more mistakes
- All best practices derive from this constraint

## Strategies

### Keep Sessions Focused

| Strategy | When to Use |
|---|---|
| `/clear` | Between unrelated tasks |
| New session | After writing a spec, start fresh for implementation |
| Session naming (`/rename`) | Each workstream gets its own named session |

### Interrupt and Redirect

| Action | Effect |
|---|---|
| `Esc` | Stop Claude mid-action, context preserved |
| `Esc+Esc` or `/rewind` | Open rewind menu to checkpoint |
| "Undo that" | Revert recent changes |

### Compaction

Claude auto-compacts conversation history when approaching limits. Manual control options:
- `/compact <instructions>` — focus on what matters
- `/rewind` → **Summarize from here** or **Summarize up to here**
- Customize behavior in CLAUDE.md: "When compacting, preserve the full list of modified files and test commands"

### Side Questions

Use `/btw` for quick questions. The answer appears in a dismissible overlay and never enters conversation history.

### Subagents for Research

Delegate exploration to subagents. They run in separate context windows, report summaries. Keeps main conversation clean.

```
Use subagents to investigate how our authentication system handles token refresh
```

Also use subagents for code review after implementation to verify correctness with fresh eyes.

### After Failed Corrections

If Claude gets something wrong twice in one session: **don't correct a third time.** The context is polluted with failed approaches. `/clear` and start fresh with an improved prompt that incorporates what you learned.

## Context Budgeting by Operation

| Operation | Token Cost | Mitigation |
|---|---|---|
| Reading a large file | High (full file in context) | Read only needed sections |
| Extensive Grep/Glob | Low (results only) | Use liberally |
| Subagent exploration | Zero in main context | Prefer for open-ended research |
| Long conversation | Cumulative | /clear between tasks |
| Pasting large error logs | High | Trim to relevant portion |

## Anti-Patterns

1. **Kitchen sink session**: unrelated tasks in one session → `/clear` between tasks
2. **Infinite exploration**: unscoped "investigate" → hundreds of files read → scope narrowly or use subagents
3. **Over-correcting**: multiple fixes for same issue → after 2 failures, new session
4. **Chatty instructions**: bloated CLAUDE.md → important rules get lost → prune ruthlessly

## Related Concepts

- [[Hot Cache]] — claude-obsidian's own ~500-word context file for cross-session efficiency
- [[LLM Wiki Pattern]] — wiki design that respects token budgets with index-first, drill-down retrieval
- [[Compounding Knowledge]] — why structured knowledge beats accumulating raw context
