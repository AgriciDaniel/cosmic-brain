---
type: concept
title: "Documentation Culture"
address: c-000275
created: 2026-06-26
status: evergreen
tags:
  - documentation
  - knowledge-management
  - organizational-culture
  - operations
related:
  - "[[Business Process Documentation]]"
  - "[[art-of-writing-good-documentation]]"
  - "[[atlassian-process-documentation-guide]]"
  - "[[documentation-business-process-bergren]]"
---

# Documentation Culture

The organizational habits, norms, and systems that make documentation a sustainable, shared activity rather than an afterthought or one person's burden.

> [!key-insight]
> Documentation is a culture problem before it's a tooling problem. Teams that fix the culture produce documentation even in bad tooling. Teams that skip the culture fix produce nothing even with perfect tooling.

---

## Why Culture is the Root Problem

The typical documentation failure cycle:
1. No documentation → everyone asks questions verbally
2. Verbal answers consume time → less capacity to write docs
3. Time pressure → documentation deprioritized
4. Gaps grow → knowledge silos deepen → cycle repeats

The exit requires treating documentation as a deliverable on equal footing with code, prototypes, or other work products. That is a cultural shift, not a tooling fix.

---

## Core Principles

### Documentation is a deliverable

Include documentation in the "definition of done." A feature is not complete until it's documented. A process change is not complete until the doc is updated. This is how documentation gets done consistently — when it's a prerequisite, not an optional extra.

### Any documentation is better than none

A one-paragraph description that exists beats a comprehensive document that doesn't. The enemy of good documentation is perfectionism. Ship imperfect documentation early; improve it on every execution.

### Knowledge should leave heads

> "Information that is only located in someone's head — if you need to have a meeting to get access to it — is not documented." — Jen Bergren

Knowledge silos are a business risk. When a key person leaves, changes roles, or takes unplanned leave, undocumented knowledge can vanish permanently. The goal is converting individual expertise into organizational knowledge.

### Living documentation

Processes change. Documentation must change with them. The goal is not a complete, frozen artifact — it's a living document that gets updated every time the process is executed or changed. Marking sections as `[TBD]` is acceptable; shipping nothing is not.

---

## Organizational Practices

### Crowdsourced ownership

Documentation should NOT be one person's job. Invite business and technical contributors. Distributed authorship:
- Improves accuracy (more perspectives)
- Builds buy-in and adoption (people use what they help create)
- Reduces single-point-of-failure risk on the documentation itself

### Assigned stewards

Distributed authorship needs coordination. Assign documentation owners/stewards per area or process:
- They are accountable for quality and accuracy — not necessarily the only author
- They approve changes
- They are the named contact for questions

### Peer review and early sharing

Don't wait for perfection before sharing. Get documentation in front of reviewers early:
- Work-in-progress docs benefit from fresh eyes
- Unfamiliar reviewers reveal where steps are unclear before they're used for real onboarding
- Shared early → more people invest in its accuracy

### Make it visible

Documentation that no one knows about doesn't get used. After publishing:
- Announce in relevant channels
- Link to it from related docs, onboarding flows, project briefs
- Store in a searchable, central knowledge base — one source of truth

---

## Measuring Documentation Culture Health

Signs of a healthy culture:
- Documentation is updated as part of completing a task (not scheduled separately)
- Multiple team members contribute to the same doc over time
- Docs are referenced in meetings rather than explained verbally
- Onboarding time decreases as doc coverage increases
- Feedback on docs arrives organically ("this step was unclear, I updated it")

Signs of a broken cycle:
- One person is responsible for all documentation
- Docs go months without an update despite process changes
- Team members answer the same questions repeatedly
- Knowledge is locked in one person's head

---

## Common Anti-Patterns

| Anti-pattern | Description |
|---|---|
| Knowledge hoarding | Keeping expertise exclusive as perceived job security; countered by normalizing transparency as a team value |
| Documenting the ideal | Writing what the process *should* be, not what it *is*; produces docs that no one can follow in practice |
| Perfection paralysis | Never publishing v1 because it's not complete; kills the culture before it starts |
| One-and-done | Writing docs once and never revisiting; produces stale documentation that erodes trust |
| Documentation debt | Accumulating undocumented processes; harder to pay down than to prevent |

---

## Relationship to Knowledge Management

Documentation culture is the operational layer of knowledge management:
- **Knowledge management** = the system for capturing, organizing, and distributing organizational knowledge
- **Documentation culture** = the habits that keep the system fed with current, accurate content

Without the culture, a knowledge management system is a graveyard of stale pages. The culture is what makes it a living resource.

---

## Cross-references

- [[Business Process Documentation]] — the mechanics of writing individual process docs; this page is the organizational layer above those mechanics
- [[art-of-writing-good-documentation]] — Sinha's philosophy; primary source for the "documentation as deliverable" and "definition of done" framing
- [[atlassian-process-documentation-guide]] — structured breakdown of failure modes and organizational practices
- [[documentation-business-process-bergren]] — practical entry point; Bergren's "living documentation" and "first draft is a start" framing
