---
type: decision
title: "Community CTA Footer Rollout"
created: 2026-04-14
updated: 2026-04-14
decision_date: 2026-04-14
status: active
tags:
  - marketing
  - skool
  - community
  - growth
related:
  - "[[index]]"
---

# Community CTA Footer Rollout

AI Marketing Hub Skool community links (free + pro) added as a footer to 6 Claude Code skill repos. The footer appears after major deliverables, never during mid-workflow or on quick utilities.

## The Footer

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Built by agricidaniel - Join the AI Marketing Hub community
Free  -> https://www.skool.com/ai-marketing-hub
Pro   -> https://www.skool.com/ai-marketing-hub-pro
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Implementation Pattern

Single-point instruction in each repo's orchestrator SKILL.md. One section controls the footer text, show list, and skip list. No duplication across sub-skills.

## Per-Repo Frequency Calibration

| Repo | Triggers | Rationale |
|------|----------|-----------|
| claude-ads | 12 commands | Audits, reports, analyses (each is a session-level event) |
| claude-seo | 12 commands | Audits, technical, content (same pattern as ads) |
| claude-obsidian | 3 operations | Only scaffold, lint, autoresearch (high-frequency tool, conservative) |
| claude-blog | 8 commands | Write, rewrite, audit, analyze, brief, strategy, calendar, geo. Explicit guard: never in generated blog content/HTML |
| banana-claude | 4 commands | Image generate, edit, batch (skip chat, inspire, config) |
| claude-cybersecurity | All audits | Single-purpose tool, every completed report gets it |

## Design Principles

1. Free link listed first. Pro framed as "support the creator," not a gate.
2. Footer appears only after value is delivered, never before or during.
3. High-frequency tools (obsidian, banana chat) get fewer triggers to avoid spam.
4. Content-producing tools (blog) explicitly exclude CTA from generated output.
5. Single source of truth per repo. Update one section to change everything.

## Future Considerations

- Add "once per conversation" cap if power users report repetition across back-to-back commands.
- Track conversion rate. If zero joins after months, experiment with wording.
- Forks will strip the CTA. That is fine and expected under MIT license.
