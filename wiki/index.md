---
type: meta
title: "Wiki Index"
updated: 2026-04-07
tags:
  - meta
  - index
status: evergreen
related:
  - "[[overview]]"
  - "[[log]]"
  - "[[hot]]"
  - "[[dashboard]]"
  - "[[Wiki Map]]"
  - "[[concepts/_index]]"
  - "[[entities/_index]]"
  - "[[sources/_index]]"
  - "[[LLM Wiki Pattern]]"
  - "[[Hot Cache]]"
  - "[[Compounding Knowledge]]"
  - "[[Andrej Karpathy]]"
---

# Wiki Index

Last updated: 2026-05-24 | Total pages: 57 | Sources ingested: 22

Navigation: [[overview]] | [[log]] | [[hot]] | [[dashboard]] | [[Wiki Map]] | [[getting-started]]

---

## Concepts

- [[LLM Wiki Pattern]] — the pattern for building persistent, compounding knowledge bases using LLMs (status: mature)
- [[Hot Cache]] — ~500-word session context file, updated after every ingest and session (status: mature)
- [[Compounding Knowledge]] — why wiki knowledge grows more valuable over time, unlike RAG (status: mature)
- [[Ecosystem-Patterns]] — 12 design patterns from 16+ Claude+Obsidian projects; delta tracking, multi-depth queries, goal cascade, vault adoption (status: current)
- [[cherry-picks]] — prioritized feature backlog from ecosystem research; 13 features to add to claude-obsidian (status: current)
- [[SVG Diagram Style Guide]] — canonical visual style for all diagrams: Space Grotesk, #0A0A0A dark theme, #E07850 accent, full design tokens (status: evergreen)
- [[Pro Hub Challenge]] — community challenge pattern for building claude-seo/claude-blog extensions; first challenge produced 6 submissions, 5 integrated in v1.9.0 (status: evergreen)
- [[Semantic Topic Clustering]] — SERP-based keyword grouping replacing paid tools; hub-spoke architecture with interactive visualization (status: evergreen)
- [[Search Experience Optimization]] — "read SERPs backwards" methodology for page-type mismatch detection and persona scoring (status: evergreen)
- [[SEO Drift Monitoring]] — "git for SEO" baseline/diff/track with 17 comparison rules and SQLite persistence (status: evergreen)
- [[DragonScale Memory]] — memory-layer spec inspired by the Heighway dragon curve; fold operator, deterministic page addresses, semantic tiling, boundary-first autoresearch (status: shipped v0.4, all four mechanisms opt-in)
- [[Persistent Wiki Artifact]]: durable Markdown page as the LLM's memory object, distinct from ephemeral chat turns (status: developing)
- [[Source-First Synthesis]]: provenance discipline; raw sources stay immutable while the wiki layer is synthesized and cited (status: developing)
- [[Query-Time Retrieval]]: wiki query path synthesizes with citations; complementary to Obsidian's in-vault search (status: developing)
- [[FluentUI Blazor Badge]] — Badge, CounterBadge, PresenceBadge components in FluentUI Blazor; accessibility patterns for non-focusable indicators (status: developing)
- [[FluentUI Blazor Styles]] — two-layer CSS model (`default-fuib.css` auto, `reboot.css` opt-in) plus full design-token vocabulary as CSS variables on `<html>` (status: developing)
- [[Fluent 2 Design Principles]] — Microsoft's four Fluent 2 principles, each pairing a functional aspect with an emotional aspect (status: developing)
- [[Fluent 2 Color System]], [[Fluent 2 Color Tokens]], [[Fluent 2 Design Tokens]] — Fluent 2 color palettes, web alias catalog, two-layer token architecture (status: developing)
- [[Fluent 2 Typography]], [[Fluent 2 Layout]], [[Fluent 2 Shapes]], [[Fluent 2 Iconography]] — Fluent 2 type ramps, 4px spacing & 12-col grid, four forms + radius tokens, icon collections + naming (status: developing)
- [[Fluent 2 Elevation]], [[Fluent 2 Material]], [[Fluent 2 Motion]] — Fluent 2 shadow ramps, four surface materials (solid/acrylic/mica/smoke), four motion principles + choreography (status: developing)
- [[Fluent 2 Accessibility]], [[Fluent 2 Content Design]] — Fluent 2 WCAG 2.1 AA targets, voice/tone + writing rules (status: developing)
- [[Fluent 2 Handoffs]], [[Fluent 2 Onboarding]], [[Fluent 2 Wait UX]] — Fluent 2 Copilot workflow transitions, onboarding patterns, loading-state catalogue (status: developing)
- [[Fluent 2 Content Engineering]], [[Fluent 2 Responsible AI]], [[Fluent 2 Types of AI Harm]] — Fluent 2 system-prompt construction, RAI principles + rubric, six AI harm categories (status: developing)

---

## Entities

- [[Fluent 2 Design System]] — Microsoft's current-generation design system; cross-platform token vocabulary + four guiding principles; parent of [[FluentUI Blazor]] (status: developing)
- [[FluentUI Blazor]] — Microsoft Blazor component library implementing [[Fluent 2 Design System]]; v5.0.0-RC.3 (status: developing)
- [[Andrej Karpathy]] — AI researcher, creator of the LLM Wiki pattern, former Tesla AI director (status: developing)
- [[obsidian-wiki]] — multi-agent compatible LLM Wiki plugin; emerging schema, delta tracking manifest, vision ingestion (status: current)
- [[Nexus-MCP]] — native Obsidian plugin + MCP bridge; workspace memory, task management, semantic search (status: current)
- [[obsidian-claude-pkm]] — goal cascade PKM; auto-commit hooks, /adopt command, specialized agents (status: current)
- [[rvk7895-llm-knowledge-bases]] — 3-depth query system, Marp slides, parallel deep research (status: current)
- [[kepano-obsidian-skills]] — official skills from Obsidian creator; defuddle, obsidian-bases (status: current)
- [[Claudian-YishenTu]] — native Obsidian plugin embedding Claude Code; plan mode, @mention (status: current)
- [[Claude SEO]] — Tier 4 Claude Code skill for SEO analysis; 23 skills, 17 agents, 30 scripts at v1.9.0 (status: evergreen)

---

## Sources

- [[claude-obsidian-ecosystem-research]] — 2026-04-08 | web research across 16+ repos | 8 wiki pages created
- [[Ecosystem-Analysis]] — 2026-05-25 | synthesis of 16+ Claude+Obsidian projects; 4 categories, 12 design patterns, strategic gaps & recommendations (status: current)
- [[fluent-ui-blazor-badge-components]] — 2026-05-23 | FluentUI Blazor v5 official docs | Badge, CounterBadge, PresenceBadge components
- [[fluent-ui-blazor-styles]] — 2026-05-24 | FluentUI Blazor v5 official docs | default-fuib.css + reboot.css layers, full design-token CSS variables
- [[fluent-2-design-principles]] — 2026-05-24 | fluent2.microsoft.design | four Fluent 2 design principles paired as functional + emotional aspects
- 18 additional Fluent 2 sub-pages ingested 2026-05-24 — color, color-tokens, design-tokens, elevation, iconography, layout, material, motion, shapes, typography, accessibility, content-design, handoffs, onboarding, wait-ux, content-engineering, responsible-AI, ai-harm. Each is filed as a concept page (`[[Fluent 2 ...]]`) under [[Fluent 2 Design System]]. Raw fetches under `raw/articles/<topic>-2026-05-24.md`.

---

## Questions

- [[How does the LLM Wiki pattern work]] — how the pattern works and why it outperforms RAG at human scale (status: developing)

---

## Comparisons

- [[Wiki vs RAG]] — when to use a wiki knowledge base versus RAG; verdict: wiki wins at <1000 pages
- [[Ecosystem-Analysis]] — strategic positioning of claude-obsidian vs. 15+ competitors; 4 categories, strengths, gaps, prioritized recommendations (status: current)

---

## Decisions

- [[2026-04-14-community-cta-rollout]] - Skool community CTA footer added to 6 skill repos with per-tool frequency rules (status: active)
- [[2026-04-15-slides-and-release-session]] - Claude SEO v1.9.0 slides (15-slide HTML deck) + GitHub release v1.9.0 with PDF asset (status: complete)
- [[2026-04-15-release-report-session]] - Claude SEO v1.9.0 Release Report PDF: dark theme, 13 pages, WeasyPrint layout fixes, Challenge v2 added (status: complete)
- [[2026-04-14-claude-seo-v190-session]] - Claude SEO v1.9.0 Pro Hub Challenge integration: 5 submissions, 4 new skills, 4 review rounds, cybersecurity audit (status: complete)

---

## Domains

<!-- Add domain entries here after scaffold -->
