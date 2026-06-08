---
type: meta
title: "Wiki Index"
updated: 2026-05-25
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

Last updated: 2026-06-05 | Total pages: 249 | Sources ingested: 104

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
- [[DevExpress Blazor DxToolbar]] — horizontal toolbar with adaptivity, data binding, dropdown modes, radio-group items, and customizable templates; comparison with FluentUI Blazor (status: developing)
- [[DevExpress Blazor AI Extensions]] — provider-agnostic AI for Blazor via Microsoft.Extensions.AI/IChatClient; 6 provider options, BYOK, 9 example repos, inference parameter tuning (status: developing)
- [[DevExpress Blazor DxAIChat]] — AI chat UI component: properties (Temperature, MaxTokens, FileUploadEnabled), events (ResponseReceived, MessageSent), prompt suggestions, dynamic model switching, IAIChat interface (status: developing)
- [[DevExpress Blazor AI Examples]] — catalog of 9 official DevExpress GitHub repos: function calling, A2A protocol, MCP integration, tool confirmation, multi-model chat, cross-platform, editors, spell checker (status: developing)
- [[DevExpress Blazor AI v26.1 Roadmap]] — mid-June 2026: IChatResponseProvider abstraction layer (Agent Framework, OpenAI Responses API), MessageSending event with e.Cancel, EmptyMessageAreaText/InputBoxNullText, end of Bootstrap v4 (status: developing)
- [[DevExpress Blazor DxGrid]] — full-featured data grid: 5 binding modes, sort, group, 5 filter UI modes, 5 edit modes, summaries, master-detail, export, virtual scrolling, drag-and-drop, keyboard nav (status: developing)
- [[DevExpress Blazor DxTreeList]] — hierarchical grid+tree: 5 binding modes including load-on-demand, sort, 4 filter modes, 5 edit modes, drag-and-drop hierarchy changes (status: developing)
- [[DevExpress Blazor DxFilterBuilder]] — standalone filter builder: flat/hierarchical/collection fields, customizable editors per field, CriteriaOperator two-way binding to Grid/TreeList/PivotTable/ListBox (status: developing)
- [[DevExpress Blazor Data Editors]] — 17 standalone/in-grid editors (Calendar to TimeEdit), AI smart autocomplete in DxMemo, masks, validation, command buttons (status: developing)
- [[DevExpress Blazor Component Catalog]] — complete v25.2 catalog: 65+ components across 12 categories, organized by type with class names and summaries (status: developing)
- [[Fluent 2 Design Principles]] — Microsoft's four Fluent 2 principles, each pairing a functional aspect with an emotional aspect (status: developing)
- [[Fluent 2 Color System]], [[Fluent 2 Color Tokens]], [[Fluent 2 Design Tokens]] — Fluent 2 color palettes, web alias catalog, two-layer token architecture (status: developing)
- [[Fluent 2 Typography]], [[Fluent 2 Layout]], [[Fluent 2 Shapes]], [[Fluent 2 Iconography]] — Fluent 2 type ramps, 4px spacing & 12-col grid, four forms + radius tokens, icon collections + naming (status: developing)
- [[Fluent 2 Elevation]], [[Fluent 2 Material]], [[Fluent 2 Motion]] — Fluent 2 shadow ramps, four surface materials (solid/acrylic/mica/smoke), four motion principles + choreography (status: developing)
- [[Fluent 2 Accessibility]], [[Fluent 2 Content Design]] — Fluent 2 WCAG 2.1 AA targets, voice/tone + writing rules (status: developing)
- [[Fluent 2 Handoffs]], [[Fluent 2 Onboarding]], [[Fluent 2 Wait UX]] — Fluent 2 Copilot workflow transitions, onboarding patterns, loading-state catalogue (status: developing)
- [[Fluent 2 Content Engineering]], [[Fluent 2 Responsible AI]], [[Fluent 2 Types of AI Harm]] — Fluent 2 system-prompt construction, RAI principles + rubric, six AI harm categories (status: developing)

---

## Framas

- [[Framas]] — manufacturing company; DOGE_WH SQL Server database; [[Mesonic WinLine]] ERP (wl schema, 330 tbl) + HYDRA MES + custom OMS/T3PO (dbo schema, 62 tbl + 4 views) (status: developing)
- [[DOGE WH Database Schema]] — SQL Server database architecture, two schemas (dbo + wl), integration flows, dbdocs publishing pipeline (status: developing)
- [[Framas DBO Schema]] — OMS/T3PO tables (order mgmt, label/QC, ETC calc, HYDRA bridge, PO material mgmt, plastic box mgmt) (status: developing)
- [[Framas WL Schema]] — WinLine ERP tables (finance, accounting, purchasing, products, tax, CRM, currency) (status: developing)
- [[Framas Monorepo Architecture]] — .NET 10 Blazor team setup: Git Bare + Worktree, per-feature branches, per-dev .sln, write-protected apphost, port conventions (status: developing)
- [[Git Bare Worktree Pattern]] — reusable Git pattern: bare repo as object store + named worktrees per branch; no branch-switching needed (status: developing)
- [[FramasScanner]] — in-house mobile app: scan FGs/raw-material QR labels to track WH movement; SQL Server proc backend per scan mode + tenant (status: developing)
- [[Framas Scanner Label Scan Flow]] — two-phase scan pattern: CheckLabel (validate, lock) → PostSingle (commit); `lmpScannerClient_ScanningLabel`/`ScannedLabel` table pair (status: developing)
- Source: [[framas-scanner-hc-bag-procs]] — 2026-06-08 | fGE HANGING_HC_BAG CheckLabel + PostSingle stored procs

---

## Entities

- [[Fluent 2 Design System]] — Microsoft's current-generation design system; cross-platform token vocabulary + four guiding principles; parent of [[FluentUI Blazor]] (status: developing)
- [[FluentUI Blazor]] — Microsoft Blazor component library implementing [[Fluent 2 Design System]]; v5.0.0-RC.3 (status: developing)
- [[DevExpress Blazor]] — commercial Blazor UI suite (40+ components, v24.2); DxToolbar, DataGrid, Charts; entity page (status: developing)
- [[ActualLab-Fusion]] — .NET end-to-end reactivity framework; `[ComputeMethod]`, auto caching+dependency tracking, distributed invalidation, fastest .NET RPC (status: developing)
- [[Framas]] — manufacturing company; DOGE_WH SQL Server database (status: developing)

---

- [[framas-db-schema-management]] — 2026-06-05 | FramasDbSchemaManagement GitHub repo | 5 pages created: Framas entity, DOGE_WH schema overview, dbo schema, wl schema
- [[hydra-cuthdb-data-model]] — 2026-05-26 | MPDV HYDRA CUT-HDB data model (846-page PDF) | 16 pages created covering all 14 product groups and ~800+ tables
- [[hydra-8-documentation]] — 2026-05-27 | HYDRA 8 complete documentation (1,557 files) | 6 pages created: function catalog, glossary, client types, procedures, release notes, entity update

---

## HYDRA MES

- [[MPDV HYDRA]] — Manufacturing Execution System by MPDV Mikrolab GmbH; 14 product groups, ~800+ tables (status: developing)
- [[HYDRA ANALYSIS Module|ANALYSIS]] (11 tbl) — [[HYDRA BDE Module|BDE]] (40 tbl) — [[HYDRA CAQ Module|CAQ]] (82 tbl) — [[HYDRA HLS Module|HLS]] (6 tbl) — [[HYDRA KERNEL Module|KERNEL]] (65 tbl) — [[HYDRA LLE Module|LLE]] (12 tbl) — [[HYDRA MDE Module|MDE]] (17 tbl) — [[HYDRA MLE Module|MLE]] (11 tbl) — [[HYDRA MPL Module|MPL]] (22 tbl) — [[HYDRA PDV Module|PDV]] (31 tbl) — [[HYDRA PEP Module|PEP]] (4 tbl) — [[HYDRA PZE Module|PZE]] (58 tbl) — [[HYDRA WRM Module|WRM]] (21 tbl) — [[HYDRA ZKS Module|ZKS]] (91 tbl)

---

## WinLine ERP (Mesonic)

- [[Mesonic WinLine]] — modular Austrian/DACH ERP suite (CWL); modules share one Mandant + data stand; the product behind Framas's [[Framas WL Schema|wl schema]] (status: developing)
- [[WinLine FIBU]] — ACC1, Finanzbuchhaltung: accounts, BKZ/BWA, Buchen, OP, Bilanz, Austrian tax (UVA/ZM/FinanzOnline) (status: developing)
- [[WinLine KORE]] — ACC2, Kostenrechnung: Kostenstellen/-arten/-träger, Umlage, BAB, Vor-/Nachkalkulation (status: developing)
- [[WinLine PPS]] — PROD, Produktion: Ressourcen, Stücklisten, Produktionsaufträge, Materialentnahme, Endmeldung (status: developing)
- [[WinLine LIST]] — Listgenerator: List-Assistent, Listentyp scopes, formula parameters (SUMKTO/KORESUM) (status: developing)
- [[WinLine ADMIN]] — ADMN: users/permissions/2FA, backup/restore, DMS archive, MSM + WinLine Server, SQL tools (status: developing)
- [[WinLine Settings]] — START → Parameter: per-module Applikations-Parameter + per-workstation Einstellungen (status: developing)
- Concepts: [[WinLine Mandant]], [[WinLine Wirtschaftsjahr]], [[WinLine Jahresabschluss]], [[WinLine Offene Posten (OP)]], [[Bilanz- und Betriebswirtschaftliche Kennzahlen (BKZ BWA)]], [[WinLine Benutzer- und Berechtigungsverwaltung]]
- Source: [[raw/winline/cwl0/cwl0.chm]] — 2026-06-08 | German CHM, ~2900 topics, 6 modules ingested

---

## Database

- [[Database Indexing]] — B+Tree mental model, Heap Table vs Clustered Index, four golden rules, SQL operations with indexes, EXPLAIN and cost model (status: developing)
- [[Database Index Advanced Techniques]] — expression, partial, spatial, trigram, JSON, hash, and prefix indexes; index-only queries; ghost conditions (status: developing)
- [[Database Schema and Performance]] — UUID vs auto-increment, denormalization, constraints, partitioning, pre-aggregation, keyset pagination, CTEs (status: developing)
- [[Nguyễn Thế Huy]] — author of the source ebook, 10+ years experience at ViettelPost, Giaohangtietkiem, CBTW; email: huynt57@gmail.com, blog: https://huynt.dev (status: developing)

### MSSQL / SQL Server Maintenance

- [[SQL Server DMV Usage Tracking]] — sys.dm_exec_procedure_stats, sys.dm_db_index_usage_stats, restart-reset problem, persistent storage pattern, Extended Events, SQL Server Audit (status: developing)
- [[SQL Server Object Dependency Tracking]] — sys.sql_expression_dependencies, dynamic SQL gap, sys.sql_modules LIKE workaround, four-layer dependency scan (status: developing)
- [[SQL Server Object Deprecation Workflow]] — score → rename/quarantine → monitor → drop; Extended Properties deprecation marking; Redgate/ApexSQL tooling (status: developing)
- [[Research - MSSQL Obsolete Object Detection]] — synthesis: all five detection signals, scoring formula, contradictions, open questions (status: developing)
- Source: [[mssql-obsolete-objects-detection]] — 2026-06-05 | composite | raw vault file + MS Learn docs + SQLShack + SQLServerCentral

---
## Claude Code

- [[Claude Code Best Practices]] — Anthropic's official guide: verification, plan mode, prompting patterns, environment config (CLAUDE.md, permissions, hooks, skills), session management, scaling, failure patterns (status: developing)
- [[Claude Code Context Management]] — context window discipline strategies: /clear, subagents, compaction, side questions, anti-patterns, token budgeting by operation (status: developing)
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
- [[devexpress-blazor-dxtoolbar]] — 2026-05-25 | DevExpress Blazor v24.2 docs (via web search) | DxToolbar API reference, code examples, adaptivity
- [[devexpress-blazor-ai-extensions]] — 2026-05-25 | DevExpress Blazor v25.2 docs | AI extensions architecture, 6 providers, integration code examples, 9 example repos
- [[devexpress-blazor-dxaichat]] — 2026-05-25 | DevExpress Blazor v25.2 docs (via web search) | DxAIChat component API, events, file upload, prompt suggestions
- [[devexpress-blazor-dxaichat-class]] — 2026-05-25 | DevExpress Blazor v25.2 official API reference | DxAIChat class: full API, Markdown rendering, templates, tool calling, OpenAI Assistants
- DevExpress Blazor AI Chat blog — 2026-05-25 | DevExpress community blog 2026-05-22 | multi-model chat, MCP integration, v26.1 roadmap
- [[devexpress-blazor-grid]] — 2026-05-25 | DevExpress Blazor v25.2 docs | DxGrid component overview
- [[devexpress-blazor-treelist]] — 2026-05-25 | DevExpress Blazor v25.2 docs | DxTreeList component overview
- [[devexpress-blazor-filterbuilder]] — 2026-05-25 | DevExpress Blazor v25.2 docs | DxFilterBuilder API reference
- [[devexpress-blazor-data-editors]] — 2026-05-25 | DevExpress Blazor v25.2 docs | 17 data editor components overview
- [[claude-code-best-practices]] — 2026-05-25 | Anthropic official docs | Claude Code best practices, context management, failure patterns
- [[fluent-ui-blazor-styles]] — 2026-05-24 | FluentUI Blazor v5 official docs | default-fuib.css + reboot.css layers, full design-token CSS variables
- [[fluent-2-design-principles]] — 2026-05-24 | fluent2.microsoft.design | four Fluent 2 design principles paired as functional + emotional aspects
- 18 additional Fluent 2 sub-pages ingested 2026-05-24 — color, color-tokens, design-tokens, elevation, iconography, layout, material, motion, shapes, typography, accessibility, content-design, handoffs, onboarding, wait-ux, content-engineering, responsible-AI, ai-harm. Each is filed as a concept page (`[[Fluent 2 ...]]`) under [[Fluent 2 Design System]]. Raw fetches under `raw/articles/<topic>-2026-05-24.md`.
- [[fusion-docs-overview]] — 2026-05-25 | ActualLab.Fusion official docs | complete VitePress documentation set (125 files): 17 concept pages, 5 reference pages, 2 video transcripts
- [[fusion-video-distributed-state-sync]] — 2026-05-25 | 2h video transcript | Fusion architecture, perf vs Redis, Voxt demo, dependency graphs
- [[fusion-video-fastest-rpc]] — 2026-05-25 | 1h video transcript | RPC design, benchmarks vs gRPC/SignalR, mesh demo

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

## .NET / ActualLab.Fusion

- [[ActualLab-Fusion Overview]] — what Fusion is, the MSBuild/Make analogy, three core abstractions, complexity tiers (status: developing)
- [[Fusion Story & Philosophy]] — origins (ServiceTitan, Quora LiveNode, Knockout.js), philosophy behind caching+real-time unification (status: developing)
- [[Fusion Compute Services]] — `[ComputeMethod]`, `IComputeService`, `Computed<T>` lifecycle, `ComputedRegistry`, invalidation chains, `ComputedOptions` (status: developing)
- [[Fusion States]] — `IState<T>`, `MutableState<T>`, `ComputedState<T>`, `StateFactory`, update delayers, reactive UI pattern (status: developing)
- [[Fusion Cache-Aware API Design]] — fine-grained cacheable units, fetch IDs first, stable arguments, speculative execution, pseudo-dependencies (status: developing)
- [[Fusion Authentication]] — `IAuth`/`IAuthBackend`, `Session`, multi-provider, `ServerAuthHelper`, Blazor WASM default session (status: developing)
- [[Fusion Blazor Integration]] — `ComputedStateComponent<T>`, component hierarchy, `UICommander`, parameter optimization, `MixedStateComponent` (status: developing)
- [[Fusion RPC Framework]] — Compute Service Clients, WebSocket transport, `RpcStream<T>`, `RpcNoWait`, reverse RPC, call routing, 2-7x faster than gRPC/SignalR (status: developing)
- [[Fusion CommandR]] — CQRS pipeline, `ICommander`, `[CommandHandler]`, `CommandContext`, MediatR comparison (status: developing)
- [[Fusion Operations Framework]] — multi-host invalidation, Transactional Outbox Pattern, operation logging, log watchers, reprocessing (status: developing)
- [[Fusion EF Integration]] — `DbHub<TDbContext>`, sharding, `DbEntityResolver`, operation-scoped DbContext (status: developing)
- [[Fusion Interceptors & Proxies]] — compile-time proxy generation via `ActualLab.Generators`, `Interceptor`, `Invocation`, ~8x faster than Castle DynamicProxy (status: developing)
- [[Fusion Native AOT]] — `CodeKeeper`, `RuntimeCodegen` modes, trimming support (status: developing)
- [[Fusion Serialization]] — `IByteSerializer`/`ITextSerializer`, type-decorated serialization, MemoryPack/MessagePack backends (status: developing)
- [[Fusion TypeScript Port]] — `@actuallab/fusion`, React hooks (`useComputedState`, `useMutableState`), RPC client (status: developing)
- [[Fusion Core Foundation]] — `Result<T>`, `Moment`, `AsyncLock`, `PropertyBag`, `Symbol`, resilience types (status: developing)
- [[Fusion Performance & Benchmarks]] — 8,127x speedup, RPC vs gRPC/SignalR, memory management, production numbers from Voxt.ai (status: developing)
- [[Fusion HelloCart Tutorial]] — step-by-step sample app from in-memory to distributed (status: developing)
- [[Fusion API Reference]] — complete type reference for all Fusion namespaces (status: developing)
- [[Fusion NuGet Packages]] — package catalog with selection guide (status: developing)
- [[Fusion FAQ]] — common questions about Fusion usage and comparisons (status: developing)
- [[Fusion External Resources]] — videos, blog posts, code samples, community links (status: developing)

## FluentUI Blazor v5

- [[FluentUI Blazor]] — Microsoft's Blazor component library implementing Fluent 2 Design System; v5.0.0-RC.3 (status: developing)
- [[FluentUI Blazor Installation]] — NuGet setup, service registration, render modes (status: developing)
- [[FluentUI Blazor DataGrid]] — full-featured data grid with sorting, paging, virtualization, hierarchical rows (status: developing)
- Source: [[fluentui-blazor-v5-component-reference]] — complete v5 docs; 55 concept pages from 179 .md + 362 .razor files (status: current)

## Elsa Workflows

- [[Elsa Workflows]] — open-source .NET workflow engine; visual designer, long-running workflows, multi-tenancy, horizontal scaling; v3.x (status: developing)
- [[Elsa Workflow Concepts]] — 13 core concepts: Workflow, Activity, Bookmark, Trigger, Burst of Execution, Correlation ID, Outcome, Input/Output, Variable, Incident, Alteration (status: developing)
- Source: [[elsa-workflows-documentation]] — complete Elsa v3 docs; 46 concept pages from ~150 source files (status: current)

## Operations Research / Optimization

- [[Google OR-Tools]] — Google's open-source combinatorial optimization suite; CP-SAT, PDLP, Glop, MPSolver, RoutingModel; Apache 2.0; v9.15 (2026) (status: developing)
- [[CP-SAT Solver]] — portfolio CP+SAT+MIP solver; LCG + CDCL + LNS on parallel threads; won all 2024 MiniZinc Challenge gold medals (status: developing)
- [[PDLP Solver]] — first-order LP solver using PDHG; handles 6.3B+ nonzeros single machine, 92B distributed (status: developing)
- [[Vehicle Routing Problem]] — VRP and variants (CVRP, VRPTW, pickup/delivery) via OR-Tools RoutingModel; underpins Google Maps Route Optimization API (status: developing)
- [[Combinatorial Optimization]] — domain overview: LP/MIP/CP/VRP/SAT problem classes, key algorithms, solver landscape (status: developing)
- Source: [[google-or-tools]] — GitHub repo + official docs + Google Research; 7 pages created

## Domains

<!-- Add domain entries here after scaffold -->
