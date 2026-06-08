---
type: source
title: "Claude Code Best Practices"
created: 2026-05-25
updated: 2026-05-25
address: c-000033
status: developing
tags:
  - claude-code
  - best-practices
  - context-management
  - workflow
  - anthropic
source_url: https://code.claude.com/docs/en/best-practices
source_file: raw/Best practices for Claude Code.md
related:
  - "[[Claude Code Best Practices]]"
  - "[[Claude Code Context Management]]"
  - "[[LLM Wiki Pattern]]"
---

# Claude Code Best Practices

Source URL: <https://code.claude.com/docs/en/best-practices>
Fetched: 2026-05-25 (clippings)

## Summary

Anthropic's official best practices guide for Claude Code. Covers patterns proven effective across internal teams and external engineers. The central thesis: **Claude's context window is the most important resource to manage**, and most best practices derive from this single constraint.

## Key Sections

1. **Verification** — give Claude tests, screenshots, or expected outputs to verify its own work (single highest-leverage practice)
2. **Explore → Plan → Code** — separate research from implementation; use plan mode for multi-file changes
3. **Specific prompts** — reference files, point to patterns, scope tasks precisely
4. **Environment configuration** — CLAUDE.md, permissions, CLI tools, MCP servers, hooks, skills, subagents, plugins
5. **Communication** — ask codebase questions, let Claude interview you for complex features
6. **Session management** — /clear between tasks, Esc to interrupt, /rewind to checkpoint, subagents for research
7. **Automation & scaling** — non-interactive mode (`claude -p`), parallel sessions, fan-out, auto mode
8. **Failure patterns** — kitchen sink sessions, over-correcting, bloated CLAUDE.md, trust-then-verify gap, infinite exploration

## Pages Created

- [[Claude Code Best Practices]] — full concept page with all patterns
- [[Claude Code Context Management]] — deep dive on context window discipline

## Key Insight

Every Claude Code best practice traces back to one constraint: the context window. Verification, subagents, /clear, explicit prompting, and CLAUDE.md pruning all serve the same goal of keeping context clean and focused.
