---
type: meta
title: "Operation Log"
updated: 2026-06-05
tags:
  - meta
  - log
status: evergreen
related:
  - "[[index]]"
  - "[[hot]]"
  - "[[overview]]"
  - "[[sources/_index]]"
---

# Operation Log

Navigation: [[index]] | [[hot]] | [[overview]]

Append-only. New entries go at the TOP. Never edit past entries.

Entry format: `## [YYYY-MM-DD] operation | Title`

Parse recent entries: `grep "^## \[" wiki/log.md | head -10`

## [2026-06-08] ingest | v_OMS_WHInfo — DOGE_WH warehouse info view (fGE)
- Source: `raw/framas/app/framas_scanner/tenants/fGE/v_OMS_WHInfo.sql`
- Summary: [[sources/framas-v-oms-whinfo]]
- Pages created: [[sources/framas-v-oms-whinfo]] (c-000235)
- Pages updated: [[framas/tenants/DOGE_WH]] (added Views section), [[framas/framas-scanner]] (added Warehouse Configuration section), [[index]], [[hot]]
- Key insight: `v_OMS_WHInfo` is scoped to current company year via `ST045_CurrentCompYear`; scanner flags default to 0 via `ISNULL` when a WH has no `lmpScannerClient_Warehouse` row; `ActualPostWHNo` returns NULL on fGE/fKV/fFT because `T335.U003` not yet provisioned on those tenants.

## [2026-06-08] batch-ingest | Mesonic WinLine help (6 modules from cwl0.chm)
- Source: `raw/winline/cwl0/cwl0.chm` (decompiled German CHM, ~2900 topics; 6 modules selected: ACC1/ACC2/PROD/LIST/ADMN/Settings)
- Summary pages: [[WinLine FIBU]], [[WinLine KORE]], [[WinLine PPS]], [[WinLine LIST]], [[WinLine ADMIN]], [[WinLine Settings]]
- Pages created: [[Mesonic WinLine]] (c-000222), [[WinLine LIST]] (c-000223), [[WinLine FIBU]] (c-000224), [[Bilanz- und Betriebswirtschaftliche Kennzahlen (BKZ BWA)]] (c-000225), [[WinLine Wirtschaftsjahr]] (c-000226), [[WinLine Jahresabschluss]] (c-000227), [[WinLine Offene Posten (OP)]] (c-000228), [[WinLine Mandant]] (c-000229), [[WinLine KORE]] (c-000230), [[WinLine PPS]] (c-000231), [[WinLine ADMIN]] (c-000232), [[WinLine Benutzer- und Berechtigungsverwaltung]] (c-000233), [[WinLine Settings]] (c-000234)
- Pages updated: [[index]], [[hot]], [[sources/_index]], [[entities/_index]], [[concepts/_index]]
- Key insight: WinLine is a modular Austrian ERP; modules share one Mandant + data stand. Wirtschaftsjahr is stored as a relative index so LIST formulas survive year-end close. Cross-links to existing [[Framas]] / [[Framas WL Schema]] (Framas runs on WinLine). Synthesized to 1 summary page per module + cross-cutting concepts — NOT a 1:1 topic mirror. Remaining modules (FAKT, LOHN, ANBU, INFO/CRM, BI, KASSE) not yet ingested.

## [2026-06-08] ingest | Framas Scanner HANGING_HC_BAG Procs (fGE)
- Source: `raw/framas/app/framas_scanner/tenants/fGE/` (2 stored procs + app description)
- Summary: [[framas-scanner-hc-bag-procs]]
- Pages created: [[framas-scanner-hc-bag-procs]] (c-000219), [[FramasScanner]] (c-000220), [[Framas Scanner Label Scan Flow]] (c-000221)
- Pages updated: [[Framas]], [[Framas DBO Schema]], [[index]], [[concepts/_index]], [[entities/_index]], [[sources/_index]]
- Key insight: FramasScanner backend is a two-phase, per-mode/per-tenant proc pattern — CheckLabel (validate + lock pending row) → PostSingle (commit + delete pending). FT176 doubles as the HC scan-tag/dedup store; display strings are MAUI XAML returned from SQL.
- Note: `scripts/allocate-address.sh` unusable here (no `flock` in Windows git-bash); addresses allocated via inline Bash, counter → 222.

## [2026-06-05] ingest | MSSQL Obsolete Object Finder (re-ingest v2)
- Source: `raw/mssql/mssql-obsolete-objects.md` (hash: facfedb0b1d677946ea1ff9b6b1f2e1c)
- Summary: [[mssql-obsolete-objects-detection]]
- Pages created: (none — delta only)
- Pages updated: [[mssql-obsolete-objects-detection]], [[SQL Server DMV Usage Tracking]], [[Research - MSSQL Obsolete Object Detection]]
- Key insight: v2 query adds ActiveCallers CTE (force score to 0 if caller has execution history), TableReads CTE (suppress zero-row bonus for staging tables), ObsoleteVerdict/ScoreReason output columns, and a documented blind-spots table; max score raised to 10, verdict threshold ≥7 = very likely obsolete

## [2026-06-05] autoresearch | MSSQL Obsolete Object Detection
- Rounds: 2 | Searches: 9 | Sources fetched: 5
- Pages created: [[mssql-obsolete-objects-detection]] (source), [[SQL Server DMV Usage Tracking]] (concept), [[SQL Server Object Dependency Tracking]] (concept), [[SQL Server Object Deprecation Workflow]] (concept), [[Research - MSSQL Obsolete Object Detection]] (synthesis)
- Synthesis: [[Research - MSSQL Obsolete Object Detection]]
- Key finding: DMV stats reset on restart and on plan eviction — absence from sys.dm_exec_procedure_stats never proves non-use; persistent storage pattern (capture to table, detect restart via tempdb create_date) is required for reliable usage history

## [2026-06-05] autoresearch | Google OR-Tools
- Rounds: 1 (broad) | Searches: 8 | Sources fetched: 12
- Pages created: [[google-or-tools]] (c-000213), [[Google OR-Tools]] (c-000214), [[CP-SAT Solver]] (c-000215), [[PDLP Solver]] (c-000216), [[Vehicle Routing Problem]] (c-000217), [[Combinatorial Optimization]] (c-000218), [[Research: Google OR-Tools]] (c-000219)
- Synthesis: [[Research: Google OR-Tools]]
- Key finding: CP-SAT is the best free CP solver (2024 MiniZinc gold sweep); PDLP is the only free LP solver at billion-nonzero scale; OR-Tools routing underpins Google Maps Route Optimization API

## [2026-06-05] ingest | Framas Monorepo Architecture Guide
- Source: `raw/framas/architects/architecture-guide.md`
- Summary: [[framas-monorepo-architecture-guide]] (c-000209)
- Pages created: [[framas-monorepo-architecture-guide]] (c-000209), [[Framas Monorepo Architecture]] (c-000210), [[Git Bare Worktree Pattern]] (c-000211)
- Pages updated: [[Framas]] (added dev architecture section), [[concepts/_index]] (new Software Architecture section), [[index]]
- Key insight: Framas 10-dev team rejected Plugin Architecture (DLL-from-SQL) in favor of Monorepo; Git Bare + Worktree gives each feature its own folder so devs run parallel features on separate ports without stashing.

## [2026-06-05] ingest | FramasDbSchemaManagement (DOGE_WH)
- Source: `raw/articles/framas-db-schema-management-2026-06-05.md`
- Summary: [[framas-db-schema-management]]
- Pages created: [[Framas]] (c-000201), [[DOGE WH Database Schema]] (c-000202), [[Framas DBO Schema]] (c-000203), [[Framas WL Schema]] (c-000204), [[framas-db-schema-management]] (c-000200)
- Pages updated: [[entities/_index]] (added Framas org), [[index]], [[hot]]
- Key insight: `dbo` schema is the integration hub — FT400+ bridges WinLine ERP PO data, FT600 bridges HYDRA production orders. Both WinLine (`wl.*`) and OMS (`dbo.FT*`) use obfuscated `cNNN` column names with business meaning only in DBML `note:` fields.

## [2026-06-05] ingest | HYDRA BDE/MDE Column Detail + Query Pattern
- Source: `raw/hydra/CUT-HDB_DataModel_2021.pdf` (BDE p.27-177, MDE p.477-530)
- Pages updated: [[HYDRA BDE Module]], [[HYDRA MDE Module]]
- Pages created: [[HYDRA Order-Machine Query Pattern]] (c-000199)
- Key insight: `hy_zykl` stores machine cycles but has no `auftrag_nr` — first injection time requires bridging via `auftrag_status.e_anmeld_dat/e_anmeld_zeit` as lower bound anchor.

---

## [2026-05-27] ingest | HYDRA 8 Documentation (October 2020)
- Source: `raw/hydra/HYDRA_8_Documentation Oct 2020/` (1,557 files: 1,556 PDFs + 1 .doc)
- Summary: [[hydra-8-documentation]]
- Pages created: [[hydra-8-documentation]] (source, c-000177), [[HYDRA 8 Function Catalog]] (c-000178), [[HYDRA 8 Glossary]] (c-000179), [[HYDRA 8 Client Types]] (c-000180), [[HYDRA 8 Configuration Procedures]] (c-000181), [[HYDRA 8 Release Notes]] (c-000182)
- Pages updated: [[MPDV HYDRA]] (entity), [[index]], [[concepts/_index]], [[hot]]
- Key insight: HYDRA 8 spans 23 product modules with ~200 distinct function documents duplicated across 8 client types (AIP Windows terminal, HWEB web, MBL mobile, MOC Management Cockpit, MESC QlikView analytics, MTS master terminal, SMA Smart App, CT5 legacy). The 12-module SAP integration layer (EIS) covers PP-PDC, HR-PDC, PP-PI, PM, PS, MM, CO, and QM interfaces. Documentation is organized into 7 sections: Functions (751 PDFs), Glossary (17), Objects (17), Procedures (124), Products (~515 release notes), TechnicalInformation (15), Tutorials (1).

## [2026-05-27] ingest | HYDRA CUT-HDB Data Model (2021)
- Source: `raw/hydra/CUT-HDB_DataModel_2021.pdf`
- Summary: [[hydra-cuthdb-data-model]]
- Pages created: [[MPDV HYDRA]] (entity, c-000162), [[HYDRA ANALYSIS Module]] (c-000163), [[HYDRA BDE Module]] (c-000164), [[HYDRA CAQ Module]] (c-000165), [[HYDRA HLS Module]] (c-000166), [[HYDRA KERNEL Module]] (c-000167), [[HYDRA LLE Module]] (c-000168), [[HYDRA MDE Module]] (c-000169), [[HYDRA MLE Module]] (c-000170), [[HYDRA MPL Module]] (c-000171), [[HYDRA PDV Module]] (c-000172), [[HYDRA PEP Module]] (c-000173), [[HYDRA PZE Module]] (c-000174), [[HYDRA WRM Module]] (c-000175), [[HYDRA ZKS Module]] (c-000176)
- Pages updated: [[index]], [[concepts/_index]], [[entities/_index]], [[hot]]
- Key insight: MPDV HYDRA is a comprehensive MES with ~800+ tables across 14 product groups covering the full manufacturing execution lifecycle — from production data collection (BDE) and machine monitoring (MDE) through quality (CAQ), time tracking (PZE), SAP integration (MLE), and access control (ZKS). Cross-cutting patterns: event-driven architecture, archive/reload tables, PDM field ID traceability, and mixed natural/technical key strategies.

## [2026-05-26] ingest | Database Indexing & Những Điều Developer Cần Biết
- Source: `raw/database/Database Indexing & Những Điều Developer Cần Biết.md`
- Summary: [[database-indexing-developer-guide]]
- Pages created: [[Nguyễn Thế Huy]], [[Database Indexing]], [[Database Index Advanced Techniques]], [[Database Schema and Performance]]
- Pages updated: [[index]], [[concepts/_index]], [[entities/_index]], [[hot]], [[log]]
- Key insight: B+Tree indexing is a systematic discipline governed by four golden rules — understanding the Heap vs Clustered storage model distinction and the cost model behind query optimization is more valuable than memorizing B-Tree algorithm internals.

## [2026-05-25] batch-ingest | FluentUI Blazor v5 Component Reference (~556 files from raw/fluentui_v5/)
- Sources: 179 `.md` files + 362 `.razor` examples + 15 `.razor.cs` files from `raw/fluentui_v5/`; preprocessed with `{{ }}` template expansion (317 razor examples embedded, 105 API refs, 37 includes)
- Pages created: [[fluentui-blazor-v5-component-reference]] (source, c-000155) + 55 concept pages (c-000100–c-000154): [[FluentUI Blazor Installation]], [[FluentUI Blazor v5 Migration]], [[FluentUI Blazor MCP Server]], [[FluentUI Blazor Theming]], [[FluentUI Blazor Styles and Spacing]], [[FluentUI Blazor Localization]], [[FluentUI Blazor Button]], [[FluentUI Blazor Checkbox]], [[FluentUI Blazor Radio]], [[FluentUI Blazor Switch]], [[FluentUI Blazor Slider]], [[FluentUI Blazor Number]], [[FluentUI Blazor Text Inputs]], [[FluentUI Blazor ColorPicker]], [[FluentUI Blazor InputFile]], [[FluentUI Blazor Forms]], [[FluentUI Blazor Accordion]], [[FluentUI Blazor Card]], [[FluentUI Blazor Grid]], [[FluentUI Blazor Layout and Stack]], [[FluentUI Blazor Splitter]], [[FluentUI Blazor Dialog]], [[FluentUI Blazor Popover]], [[FluentUI Blazor Tabs]], [[FluentUI Blazor Divider]], [[FluentUI Blazor Wizard]], [[FluentUI Blazor List and Select]], [[FluentUI Blazor Autocomplete]], [[FluentUI Blazor Combobox]], [[FluentUI Blazor Menu]], [[FluentUI Blazor Nav]], [[FluentUI Blazor AppBar]], [[FluentUI Blazor TreeView]], [[FluentUI Blazor Link]], [[FluentUI Blazor Overflow]], [[FluentUI Blazor Avatar]], [[FluentUI Blazor Badges]], [[FluentUI Blazor Icon]], [[FluentUI Blazor Image]], [[FluentUI Blazor Emoji]], [[FluentUI Blazor Text and Typography]], [[FluentUI Blazor Progress and Skeleton]], [[FluentUI Blazor Toast]], [[FluentUI Blazor Tooltip]], [[FluentUI Blazor MessageBar]], [[FluentUI Blazor RatingDisplay]], [[FluentUI Blazor Table]], [[FluentUI Blazor KeyCode]], [[FluentUI Blazor ErrorBoundary]], [[FluentUI Blazor Counter]], [[FluentUI Blazor DataGrid]], [[FluentUI Blazor DateTime]], [[FluentUI Blazor Drag and Drop]], [[FluentUI Blazor Paginator]], [[FluentUI Blazor PullToRefresh]]
- Pages updated: [[index]], [[concepts/_index]], [[hot]], [[log]]
- Vault stats: 202 pages, 97 sources ingested, counter advanced to 156
- Key insight: Complete FluentUI Blazor v5 component API reference now in wiki; every page includes real razor code examples expanded from the source docs. The MCP Server page documents how FluentUI Blazor exposes component info to AI agents via the Model Context Protocol.

## [2026-05-25] batch-ingest | Elsa Workflows 3 Documentation (~150 files from raw/elsa/)
- Sources: ~150 files from `raw/elsa/` (markdown + C# code + JSON workflow examples + YAML configs)
- Pages created: [[Elsa Workflows]] (entity, c-000052) + [[elsa-workflows-documentation]] (source, c-000053) + 46 concept pages (c-000054–c-000099): [[Elsa Workflow Concepts]], [[Elsa Architecture]], [[Elsa Hello World]], [[Elsa Packages]], [[Elsa Database Configuration]], [[Elsa Containers]], [[Elsa Application Types]], [[Elsa Workflow Dispatcher]], [[Elsa Onboarding]], [[Elsa Security]], [[Elsa Deployment]], [[Elsa Clustering]], [[Elsa V2 to V3 Migration]], [[Elsa Blazor Dashboard]], [[Elsa Persistence]], [[Elsa API Client]], [[Elsa HTTP Workflows]], [[Elsa Plugins and Modules]], [[Elsa Running Workflows]], [[Elsa Studio Guide]], [[Elsa Workflow Patterns]], [[Elsa Troubleshooting]], [[Elsa External Application Interaction]], [[Elsa Loading Workflows from JSON]], [[Elsa Performance]], [[Elsa Activities]], [[Elsa Blocking Activities and Triggers]], [[Elsa Control Flow]], [[Elsa MassTransit Integration]], [[Elsa Diagnostics]], [[Elsa Workflow as Activity]], [[Elsa Expressions]], [[Elsa Custom Activities]], [[Elsa Multitenancy]], [[Elsa Workflow Instance Variables]], [[Elsa Workflow Activation Strategies]], [[Elsa Incidents]], [[Elsa Log Persistence]], [[Elsa Retention]], [[Elsa Workers]], [[Elsa Distributed Hosting]], [[Elsa Studio Design]], [[Elsa Studio Localization]], [[Elsa Authentication]], [[Elsa Alterations]], [[Elsa Logging Framework]]
- Pages updated: [[index]], [[concepts/_index]], [[entities/_index]], [[hot]], [[log]]
- Vault stats: 146 pages, 96 sources ingested, counter advanced to 100
- Key insight: Elsa is a comprehensive .NET workflow platform covering the full spectrum from embedded engine to standalone workflow server; its modular architecture with visual designer, bookmark-based long-running workflows, and horizontal scaling makes it suitable for both simple automation and enterprise orchestration.

## [2026-05-25] batch-ingest | ActualLab.Fusion Documentation (125 files from raw/fusion_docs/)
- Sources: 125 files from `raw/fusion_docs/` (root .md + .cs + `to-be-used/` + `video/` + `img-src/*.mmd`)
- Pages created: [[ActualLab-Fusion]] (entity) + 22 concept pages: [[ActualLab-Fusion Overview]], [[Fusion Story & Philosophy]], [[Fusion Compute Services]], [[Fusion States]], [[Fusion Cache-Aware API Design]], [[Fusion Authentication]], [[Fusion Blazor Integration]], [[Fusion RPC Framework]], [[Fusion CommandR]], [[Fusion Operations Framework]], [[Fusion EF Integration]], [[Fusion Interceptors & Proxies]], [[Fusion Native AOT]], [[Fusion Serialization]], [[Fusion TypeScript Port]], [[Fusion Core Foundation]], [[Fusion Performance & Benchmarks]], [[Fusion HelloCart Tutorial]], [[Fusion API Reference]], [[Fusion NuGet Packages]], [[Fusion FAQ]], [[Fusion External Resources]] + 2 source pages: [[fusion-video-distributed-state-sync]], [[fusion-video-fastest-rpc]]
- Pages updated: [[index]], [[concepts/_index]], [[entities/_index]], [[sources/_index]], [[log]], [[hot]]
- Key insight: ActualLab.Fusion is a production-proven .NET end-to-end reactivity framework (powers Voxt.ai). Unifies caching + real-time via automatic dependency tracking — `[ComputeMethod]` on virtual async methods gives you caching, dependency graphs, and cascading invalidation. ~100x faster than Redis (20M cache-resolving calls/s/core), fastest .NET RPC (2-7x faster than gRPC/SignalR). Architecture spans 13 Part* series: Core, Fusion, RPC, CommandR, Operations, EF, Blazor, Auth, Interception, AOT, Serialization, TypeScript. Licensed MIT.

---
- Sources: 60 files moved from Clippings/ to raw/ — full DevExpress Blazor v25.2 component API references
- Pages created: [[DevExpress Blazor Component Catalog]] (c-000050) — 65+ components in 12 categories
- Pages updated: [[DevExpress Blazor]], [[index]], [[concepts/_index]]
- Key insight: DevExpress Blazor offers 65+ components. The catalog organizes them into Data Editors (17), Navigation (10), Layout (6), Overlays (6), Charts (5), Buttons (4), Rich Content (3), Loading (3), File/Upload (2), Data Display (3), Scheduling (1), and AI-powered (5+).

## [2026-05-25] batch-ingest | DevExpress Blazor Grid, TreeList, FilterBuilder, Data Editors
- Sources: `raw/Blazor Grid  Blazor.md`, `raw/Blazor TreeList  Blazor.md`, `raw/DxFilterBuilder Class  Blazor.md`, `raw/Data Editors  Blazor.md` (moved from Clippings/)
- Pages created: [[DevExpress Blazor DxGrid]], [[DevExpress Blazor DxTreeList]], [[DevExpress Blazor DxFilterBuilder]], [[DevExpress Blazor Data Editors]] (concepts) + 4 source pages
- Pages updated: [[DevExpress Blazor]], [[index]], [[concepts/_index]]
- Key insight: DxGrid is the most feature-rich component (5 binding/filter/edit modes). DxTreeList mirrors Grid for hierarchical data. DxFilterBuilder is the standalone CriteriaOperator bridge. Data Editors catalog covers 17 components.

## [2026-05-25] ingest | DxAIChat Class API Reference + v26.1 Roadmap Blog
- Sources: `raw/DxAIChat Class  Blazor.md`, `raw/DevExpress Blazor AI Chat — Multi-Model Support, MCP Server Integration, and a Look at What's Coming Next.md`
- Pages created: [[devexpress-blazor-dxaichat-class]] (source), [[DevExpress Blazor AI v26.1 Roadmap]] (concept)
- Pages updated: [[DevExpress Blazor DxAIChat]] (expanded 3x: all templates, tool calling, OpenAI Assistants, Markdown, streaming, Blazor Hybrid)
- Key insight: v26.1 (mid-June 2026) introduces IChatResponseProvider to decouple from IChatClient; tool calling layer adds target-aware resolution and dynamic contexts. MCP integration maps tools/resources/prompts to DxAIChat features.

## [2026-05-25] ingest | DevExpress Blazor DxAIChat + AI Examples
- Source: `raw/articles/devexpress-blazor-dxaichat-2026-05-25.md` + 9 example repos
- Pages created: [[DevExpress Blazor DxAIChat]], [[DevExpress Blazor AI Examples]]
- Pages updated: [[index]], [[concepts/_index]]
- Key insight: DxAIChat adapts to any IChatClient provider; ChatClientServiceKey enables runtime switching. 9 official repos cover function calling, A2A, MCP, tool confirmation, and editor AI.

## [2026-05-25] ingest | DevExpress AI-powered Extensions for Blazor
- Source: `raw/DevExpress AI-powered Extensions for Blazor  Blazor.md`
- Summary: [[devexpress-blazor-ai-extensions]]
- Pages created: [[DevExpress Blazor AI Extensions]]
- Pages updated: [[DevExpress Blazor]], [[index]], [[concepts/_index]]
- Key insight: DevExpress AI uses Microsoft.Extensions.AI/IChatClient as the abstraction layer. 6 provider tiers. BYOK model — no proprietary API. Switching from local Ollama to Azure OpenAI requires only DI changes.

## [2026-05-25] ingest | Claude Code Best Practices
- Source: `raw/Best practices for Claude Code.md`
- Summary: [[claude-code-best-practices]]
- Pages created: [[Claude Code Best Practices]], [[Claude Code Context Management]]
- Pages updated: [[index]], [[concepts/_index]]
- Key insight: Every Claude Code best practice derives from one constraint: the context window. Verification, subagents, /clear, explicit prompts, and CLAUDE.md pruning all serve context discipline.

## [2026-05-25] ingest | DevExpress Blazor DxToolbar
- Source: `raw/articles/devexpress-blazor-dxtoolbar-2026-05-25.md`
- Summary: [[devexpress-blazor-dxtoolbar]]
- Pages created: [[DevExpress Blazor DxToolbar]], [[DevExpress Blazor]]
- Pages updated: [[index]], [[concepts/_index]], [[entities/_index]]
- Key insight: DxToolbar is a feature-complete Blazor toolbar with built-in adaptivity, data binding, radio groups, and split dropdown buttons. Commercial competitor to FluentUI Blazor. Cloudflare blocked direct fetch; content sourced via web search.

## [2026-05-24] batch-ingest | Fluent 2 sub-pages (×18)
- Sources: 18 URLs under https://fluent2.microsoft.design/{color,color-tokens,design-tokens,elevation,iconography,layout,material,motion,shapes,typography,accessibility,content-design,handoffs,onboarding,wait-ux,content-engineering,responsible-AI,ai-harm}
- Raw files: `raw/articles/<topic>-2026-05-24.md`
- Pages created (18 concept pages): [[Fluent 2 Color System]] (c-000012), [[Fluent 2 Elevation]] (c-000013), [[Fluent 2 Iconography]] (c-000014), [[Fluent 2 Layout]] (c-000015), [[Fluent 2 Material]] (c-000016), [[Fluent 2 Motion]] (c-000017), [[Fluent 2 Shapes]] (c-000018), [[Fluent 2 Typography]] (c-000019), [[Fluent 2 Accessibility]] (c-000020), [[Fluent 2 Content Design]] (c-000021), [[Fluent 2 Design Tokens]] (c-000022), [[Fluent 2 Color Tokens]] (c-000023), [[Fluent 2 Handoffs]] (c-000024), [[Fluent 2 Onboarding]] (c-000025), [[Fluent 2 Wait UX]] (c-000026), [[Fluent 2 Content Engineering]] (c-000027), [[Fluent 2 Responsible AI]] (c-000028), [[Fluent 2 Types of AI Harm]] (c-000029)
- Pages updated: [[Fluent 2 Design System]] (now an index of all 18 sub-topics), [[concepts/_index]], [[index]], [[hot]]
- Pattern deviation: batched 18 closely-related reference pages as single concept pages with embedded source metadata (`source_url`, `raw_file` in frontmatter) instead of separate source + concept pairs. The raw fetches preserve the verbatim content under `raw/articles/`.
- Key insight: Fluent 2's full surface area decomposes into 13 foundations (color/tokens/typography/layout/shapes/iconography/elevation/material/motion/accessibility/content-design + meta) plus 6 AI-era UX patterns (handoffs/onboarding/wait-ux/content-engineering/responsible-AI/ai-harm). The latter group is conceptually new in v2 and reframes content engineering as a content designer's discipline, not an engineering one.

## [2026-05-24] ingest | Fluent 2 Design Principles
- Source: `raw/articles/design-principles-2026-05-24.md` (fetched from https://fluent2.microsoft.design/design-principles)
- Summary: [[fluent-2-design-principles]]
- Pages created: [[fluent-2-design-principles]] (c-000009), [[Fluent 2 Design Principles]] (c-000010), [[Fluent 2 Design System]] (c-000011)
- Pages updated: [[FluentUI Blazor]], [[concepts/_index]], [[entities/_index]], [[index]], [[hot]]
- Key insight: Fluent 2 has four principles, each deliberately two-layered as functional + emotional aspects. "Natural on Every Platform" codifies an 80/20 split — ~80% of any Fluent experience should ride native platform conventions, leaving 20% for signature/brand work. This shapes how downstream toolkits like FluentUI Blazor decide what to expose vs defer.

## [2026-05-24] ingest | Styles - FluentUI Blazor Components
- Source: `raw/Styles - FluentUI Blazor Components.md`
- Summary: [[fluent-ui-blazor-styles]]
- Pages created: [[fluent-ui-blazor-styles]] (c-000007), [[FluentUI Blazor Styles]] (c-000008)
- Pages updated: [[FluentUI Blazor]], [[concepts/_index]], [[index]], [[hot]]
- Key insight: FluentUI Blazor ships styling in two opt-in layers (`default-fuib.css` auto, `reboot.css` via `<body use-reboot>`) plus a complete design-token vocabulary as CSS variables on `<html>` — covering spacing, typography, motion curves, 34 named color palettes, and shadows. Microsoft does not guarantee component correctness without `default-fuib.css`.

## [2026-05-23] ingest | Badge components - FluentUI Blazor Components
- Source: `.raw/Badge components - FluentUI Blazor Components.md`
- Summary: [[fluent-ui-blazor-badge-components]]
- Pages created: [[fluent-ui-blazor-badge-components]], [[FluentUI Blazor Badge]], [[FluentUI Blazor]]
- Pages updated: [[index]], [[log]], [[hot]]
- Key insight: FluentUI Blazor provides three badge variants (Badge, CounterBadge, PresenceBadge); badges are non-focusable and require parent-level aria labels for accessibility.

## [2026-04-24] save | v1.6.0 public release notes (Teams, Karpathy-style)
- Type: release doc + visual assets
- Locations (new): `docs/releases/v1.6.0.md` (346 lines, 6 sections, Karpathy-style prose), `wiki/meta/dragonscale-mechanism-overview.svg` (4-mechanism diagram with shared .vault-meta/ gate), `wiki/meta/dragonscale-6-test-flow.svg` (validation timeline), `wiki/meta/dragonscale-frontier-graph.svg` (M4 candidate + 3 filed pages)
- Locations (modified): `wiki/meta/2026-04-24-v1.6.0-release-session.md` (cross-reference added pointing to public release notes)
- Scope: Teams approach. R1 (chair) wrote 3 original SVGs per SVG Diagram Style Guide. R2 (codex worker) drafted Karpathy-style release prose. R3 (chair) stitched SVGs, pivoted Wikipedia imagery to text links only (no binary vendoring per permission). R4 (codex verifier) returned ACCEPT WITH FIXES, 3 wording fixes on version narrative. R5 (chair) applied fixes, committed.
- Style: direct, short, signal-dense, lists over prose, no em dashes, no marketing terms. Verifier confirmed zero em-dashes and zero banned marketing language ('revolutionary', 'seamless', 'world-class', 'game-changing', 'unlock', 'transform').
- Distribution (all three destinations covered): (1) `docs/releases/v1.6.0.md` public-facing file (commit `85515bb`), (2) `wiki/meta/2026-04-24-v1.6.0-release-session.md` internal engineering record (cross-linked), (3) GitHub Release body (user to paste from docs/releases/v1.6.0.md when ready to `gh release create v1.6.0`).
- Wikipedia imagery: referenced as text link to `https://en.wikipedia.org/wiki/Dragon_curve` rather than hotlinked or vendored. Cleaner license-wise (no CC-BY-SA attribution needed) and no external dependency. The 3 original SVGs carry the visual load instead.
- PII scan post-write: `docs/releases/v1.6.0.md` + all three SVGs are clean. No `/home/` paths, no real emails, no tokens.
- Next recommended: user runs `gh release create v1.6.0 --notes-file docs/releases/v1.6.0.md` when ready to cut the public release. This also creates the annotated tag.

## [2026-04-24] save | DragonScale end-to-end validation pass (Teams, 6 tests)
- Type: validation + first real fold + first real autoresearch
- Tests executed (all green):
  - T0 ollama pull `nomic-embed-text`: done (274MB, 15s wall)
  - T1 M1 dry-run k=3 via codex: DRY-RUN OK, 8 children, no em-dashes
  - T2 M2 real allocate: counter advanced 2 to 3, got `c-000002` (unassigned reservation; gap acceptable per spec)
  - T3 M3 full tiling with model present: 41 pages scanned, 21 embedded, 20 correctly skipped (meta/excluded/embed-error), 0 errors at >=0.9, 15 pairs in 0.8-0.9 review band (top 0.8822 Compounding Knowledge vs LLM Wiki Pattern, a legitimate semantic neighbor), report at `wiki/meta/tiling-report-2026-04-24.md`
  - T4 M1 commit via codex: first real fold committed, `wiki/folds/fold-k3-from-2026-04-23-to-2026-04-24-n8.md` (115 lines, 8 children, flat extractive). Flips the long-standing "no fold committed yet" status
  - T6 M4 autoresearch no-topic via codex: selected "How does the LLM Wiki pattern work?" as candidate (score 1.7022, #3 after skipping top-1 source + top-2 self-reference); 6 web fetches (Karpathy gist, RAG paper arXiv 2005.11401, MemGPT arXiv 2310.08560, Obsidian docs); 3 new concept pages filed, each with Primary Sources
- Locations (new): `wiki/folds/fold-k3-from-2026-04-23-to-2026-04-24-n8.md`, `wiki/meta/tiling-report-2026-04-24.md`, `wiki/concepts/Persistent Wiki Artifact.md`, `wiki/concepts/Source-First Synthesis.md`, `wiki/concepts/Query-Time Retrieval.md`
- Locations (modified): `.vault-meta/address-counter.txt` (2 to 3), `wiki/index.md` (3 concept links), `wiki/concepts/_index.md` (3 concept links)
- Scope: six-test menu the user approved. Codex gpt-5.4 for T1/T4/T6 (sub-agent delegation); chair for T0/T2/T3 (one-shot shell) and all integration (index, log, hot, commit).
- Style: all new content uses colons or parens instead of em-dashes. Pre-existing em-dashes in index entries and wiki/concepts/_index.md left as-is (clean-room boundary; deferred to F-slice style pass).
- Tests still green: `make test` passes (74+ assertions).
- Integration: chair added the 3 new concepts to `wiki/index.md` and `wiki/concepts/_index.md` with colon-style descriptions so the fresh pages are discoverable. The cluster extends `[[How does the LLM Wiki pattern work?]]` and cross-references `[[LLM Wiki Pattern]]`.
- Next recommended slice: either (G) commit this test batch and declare v1.6.0 validated, or (H) run a second fold k=3 now that 8 newer entries exist above this one and close the hierarchical-fold-not-yet-supported loop in a future phase.

## [2026-04-24] save | v1.6.0 closeout (Teams, chair-led)
- Type: docs + release hygiene
- Locations (new): wiki/meta/2026-04-24-v1.6.0-release-session.md (release session summary, 346 lines), wiki/meta/boundary-frontier-2026-04-24.md (first M4 run artifact against this vault), docs/dragonscale-guide.md (user-facing DragonScale guide, 563 lines)
- Locations (modified): wiki/hot.md (tag-claim fix, Scripts line adds boundary-score, tests line adds test_boundary_score, push-line drift, tiling line-count, one em-dash), docs/install-guide.md (version 1.5.0 to 1.6.0, DragonScale callout expanded to all four mechanisms, "hierarchical log folds" corrected to "flat extractive log folds", points to docs/dragonscale-guide.md), README.md (DragonScale parenthetical expanded to all four mechanisms plus guide link)
- Scope: Teams approach, chair-led. Slice A (2 codex read-only explorers: closeout punch list + doc-surface map). Slice B (6 bounded writes: 4 chair, 2 codex workers, non-overlapping write scopes). Slice C (codex adversarial verifier, ACCEPT WITH FIXES). Slice D (fix pass + log entry + manual commit of docs + README).
- Verifier: C1 found 11 items across 6 files. All 11 applied. Flag typos `--allow-remote-ollama` and `--report PATH` corrected in release-session; boundary-frontier provenance corrected to `--top 7` to match default vs explicit top; hot.md tiling line-count claim stripped to avoid drift; hot.md "local tag only" corrected to "local commits only, no git tag"; install-guide log-fold wording corrected from "hierarchical" to "flat extractive"; dragonscale-guide rollback wording corrected (`.vault-meta/` is a shared gate across M2+M3+M4, not per-mechanism).
- Model: codex gpt-5.4 used throughout. User requested gpt-5.5; not reachable via codex CLI 0.123.0 / this account at the time. models_cache lists max gpt-5.4, and the API rejects gpt-5.5 with "does not exist or you do not have access". Existing config already has `service_tier = "fast"` and `sandbox_mode = "workspace-write"`, matching the "fast for chatgpt with permission of full access" intent.
- Tests: `make test` passes. test_allocate_address.sh (shell, 12 assertions), test_tiling_check.py (python, 18 assertions), test_boundary_score.py (python, 44 assertions). Zero ollama dependency.
- Tags: still no local v1.5.0 / v1.5.1 / v1.6.0 tags. User controls tag creation and push. Pre-existing tags unchanged (v1.1, v1.4.0 through v1.4.3).
- Deliberately NOT done: no real M1 fold committed; no M3 end-to-end run (needs `ollama pull nomic-embed-text`); pre-existing em-dashes in install-guide.md and README.md left untouched (clean-room boundary, not in write scope this slice); CLAUDE.md pre-existing uncommitted change left untouched.
- Next recommended slice: either (E) push to origin/main and create annotated tags v1.5.0, v1.5.1, v1.6.0 in landing order, or (F) dedicated style pass to scrub pre-existing em-dashes across install-guide.md, README.md, and any other wiki files flagged by a grep scan.

## [2026-04-24] save | DragonScale Phase 4 — boundary-first autoresearch shipped (v1.6.0)
- Type: feature release
- Locations (new): scripts/boundary-score.py (with --top, --page, --json, stdout-only CLI), tests/test_boundary_score.py (40+ assertions)
- Locations (modified): skills/autoresearch/SKILL.md (new Topic Selection section A/B/C with helper-failure fallback), commands/autoresearch.md (no-topic candidate flow with agenda-control label), wiki/concepts/DragonScale Memory.md (v0.4: M4 flipped from NOT IMPLEMENTED to shipped; exact formula without recency floor; filename-stem disclosure; fence-handling qualifiers), CHANGELOG.md, .claude-plugin/{plugin,marketplace}.json (1.5.0 -> 1.6.0), Makefile (test-boundary target), wiki/hot.md, wiki/index.md, wiki/concepts/_index.md (status drift resolved).
- Scope: boundary-first autoresearch as opt-in Topic Selection mode. `/autoresearch` without a topic surfaces top-5 frontier pages; user picks/overrides/declines. Explicit helper-failure fallback to user-ask. Labeled "agenda control" throughout to match the spec's scope disclosure.
- Correctness: filename-stem resolution including folder-qualified `[[notes/Foo]]` -> Foo.md. Self-loops, unresolved targets, meta-targets, symlinks, and vault escapes all excluded. Code-fence parser handles backticks AND tildes with CommonMark length tracking (longer opening fence is not closed by shorter inner fence). Indented blocks intentionally not filtered (Obsidian bullet convention).
- Recency: exp(-days/30), no floor. Stale pages approach zero weight so they do not dominate frontier ranking.
- Review rounds: codex adversarial Phase 4 round 1 (10 items: 7 reject + 3 refine). Round 2 (7 accept + 3 still-reject: folder-qualified stem, docstring floor mention, hot.md historical drift). Round 3 (3 accept, PASS).
- Phase 3.6 (pre-Phase-4 hardening) already landed as v1.5.1: tiling --report VAULT_ROOT confinement, rollout baseline, AGENTS.md consistency, wiki-ingest .raw/ contradiction, install-guide version.
- All four DragonScale mechanisms now shipped and opt-in. 44 commits ahead of origin/main, no push.

## [2026-04-24] save | DragonScale Phase 3.5 — cross-phase hardening to v1.5.0
- Type: release hardening
- Locations (new): bin/setup-dragonscale.sh (opt-in installer), tests/test_allocate_address.sh, tests/test_tiling_check.py, Makefile, CHANGELOG.md
- Locations (modified): hooks/hooks.json (+.vault-meta/ staging), agents/wiki-ingest.md (single-writer rule for addresses), agents/wiki-lint.md (Mechanism 2+3 checks), skills/wiki-ingest/SKILL.md (aligned non-DragonScale wording), wiki/concepts/DragonScale Memory.md (M2 severity matches lint, M4 marked NOT IMPLEMENTED, seed page gets address c-000001), .claude-plugin/{plugin.json,marketplace.json} (1.4.2/1.4.3 → 1.5.0), README.md (11 skills + DragonScale callout), wiki/hot.md (refreshed for v1.5.0), .raw/.manifest.json (address_map now has DragonScale Memory.md → c-000001), .gitignore (.vault-meta/.tiling.lock + cache), .vault-meta/address-counter.txt (advanced to 2).
- Scope: resolve the 10 hold-ship items from the cross-phase audit. Add reproducible test harness (make test passes). Version-bump plugin.json and marketplace.json to 1.5.0. Create CHANGELOG.md. Refresh hot cache.
- Review rounds: codex 3.5a (5/5 accept on doc/agent fixes), codex final holistic (10/10 accept on audit items + 2 surgical regression fixes: wiki-ingest/wiki-lint non-DragonScale wording alignment, README skill count).
- Tests: `make test` runs 12 shell assertions (allocator) + 18 python assertions (tiling-check). All pass; no ollama dependency.
- Phase 3.5 complete. Repo state: 6 developer commits added this pass (f2e73c1, 2b49a0c, 8b28e48, 19ad7e4, 365f557, 2e7dd16). Total 39 commits ahead of origin/main. No push.

## [2026-04-24] save | DragonScale Phase 3 — semantic tiling MVP
- Type: skill update + new script + threshold state
- Locations: scripts/tiling-check.py (485 lines), .vault-meta/tiling-thresholds.json (seed defaults), skills/wiki-lint/SKILL.md (109-line Semantic Tiling section + item #10 in checks), wiki/concepts/DragonScale Memory.md (Mechanism 3 cost framing clarified)
- Scope: opt-in embedding-based duplicate detection via ollama nomic-embed-text. Default bands error>=0.90, review>=0.80, explicitly documented as conservative seeds (not literature-backed interpolation). Calibration procedure documented, not automated.
- Security: default OLLAMA_URL locked to 127.0.0.1; non-localhost requires --allow-remote-ollama flag. Symlinks and vault-root escapes rejected before file reads (prevents data exfil).
- Correctness: cache keyed on sha256(model+body); orphan GC on save; model-drift auto-invalidation on load.
- Concurrency: flock(LOCK_EX) on .vault-meta/.tiling.lock; per-PID temp file for atomic writes.
- Scale: warn >500 pages; hard-fail exit 4 at >5000 pages.
- Exit codes: 0/2/3/4/10/11 distinctly surfaced in wiki-lint wiring (not collapsed into "unknown").
- Review rounds: 4 codex exec adversarial passes covering security, cache correctness, feature gate, inclusion logic, scale, threshold honesty, concurrency, exit codes, model drift, terminology coupling.
  Round 1: 10 items -> 7 reject + 3 refine.
  Round 2: 6 accept + 4 still-reject (symlink ordering, prose sync, exit-code wiring, terminology in checklist + "no API cost" claim).
  Round 3: 3 accept + 1 still-reject (cost-framing phrasing).
  Round 4: accept.
- Final verdict: 10/10 accept.
- Phase 3 complete. All three DragonScale mechanisms that were in-scope for the initial spec are now shipped as opt-in features. Mechanism 4 (boundary-first autoresearch) was flagged as agenda-control out-of-scope per the v0.2 scope boundary; may or may not ship as a future phase.

## [2026-04-23] save | DragonScale Phase 2 — deterministic page addresses MVP
- Type: skill update + new script
- Locations: scripts/allocate-address.sh, skills/wiki-ingest/SKILL.md (Address Assignment section), skills/wiki-lint/SKILL.md (Address Validation section), wiki/concepts/DragonScale Memory.md (Mechanism 2 rewritten v0.2→v0.3), .vault-meta/address-counter.txt, .raw/.manifest.json (new)
- Scope: MVP address format `c-NNNNNN` (creation-order counter, zero-padded 6 digits). Rollout baseline 2026-04-23. Legacy pages exempt until deliberate backfill (future `l-` prefix). No content hash, no fold-ancestry encoding in the MVP (both deferred).
- Concurrency: atomic allocation via flock-guarded Bash helper. Counter recovery from max observed `c-` address, never silent reset to 1.
- Lint: post-rollout pages without address are errors; legacy pages without address are informational. Optional `.vault-meta/legacy-pages.txt` manifest grandfathers pages with missing/wrong `created:` metadata.
- Re-ingest idempotency: `.raw/.manifest.json` `address_map` preserves path→address mapping across re-ingests and renames.
- Naming: mechanism renamed from "content-addressable paths" to "deterministic page addresses" (the MVP is a counter, not a content hash; the old name was overclaim).
- Review rounds: 2 codex exec adversarial passes. Round 1: 8 rejects covering counter mutation, race conditions, uniqueness atomicity, missing-file recovery, terminology drift, silent regression path, legacy classification, re-ingest idempotency. Round 2: 7 accept + 1 reject (manifest.json absent). Round 3 (item 8 only): accept after creating `.raw/.manifest.json`.
- Final verdict: 8/8 accept.
- Phase 2 complete. Phase 3 (semantic tiling lint) gated on human approval.

## [2026-04-23] save | DragonScale Phase 1 — wiki-fold skill shipped
- Type: skill
- Location: skills/wiki-fold/SKILL.md, skills/wiki-fold/references/fold-template.md
- Scope: flat extractive fold over raw wiki/log.md entries. Dry-run default via Bash stdout (no Write tool, avoids PostToolUse hook residue). Structural idempotency via deterministic fold_id. Duplicate-range detection. Fold-of-folds explicitly out of scope.
- Review rounds: 3 codex exec adversarial passes. Round 1: 1 refine + 6 reject across 7 items (allowed-tools, hook-mutation risk, idempotency claim, dry-run faithfulness, children structure, Mechanism 1 coverage, auto-commit conflict). Round 2: 6 accept + 1 reject (25/26 count inversion). Round 3 (item 4 only): accept.
- Final verdict: 7/7 accept.
- Dry-run artifact: /tmp/wiki-fold-dry-run-v2.md (not committed). fold_id: fold-k3-from-2026-04-10-to-2026-04-23-n8.
- Phase 1 complete. Phase 2 (content-addressable paths) gated on human approval.

## [2026-04-23] save | DragonScale Memory v0.2 — post-adversarial-review
- Type: concept revision
- Location: wiki/concepts/DragonScale Memory.md
- Review: codex exec adversarial review rejected all 7 load-bearing claims in v0.1
- Changes: weakened LSM analogy, removed strong prompt-cache claim, replaced 0.85 threshold with calibration procedure, justified 2^k as MVP convenience, acknowledged scope-boundary leak for boundary-first autoresearch, added Operational Policies section (retention/tombstones/versioning/conflict/concurrency/provenance/ACL), tagged claims as [sourced]/[derived]/[conjecture], narrowed tagging scope per re-review
- Re-review result: 7/7 accepted (after one surgical fix on tagging-scope language)
- Phase 0 complete. Phase 1 (wiki-fold skill) gated on human approval.

## [2026-04-23] save | DragonScale Memory — Phase 0 design doc (proposed)
- Type: concept
- Location: wiki/concepts/DragonScale Memory.md
- From: brainstorming session on applying Heighway dragon curve properties to LLM wiki memory architecture
- Scope: memory-layer only, NOT agent reasoning. Four mechanisms: (1) fold operator (LSM-style exponential compaction at 2^k log entries), (2) content-addressable page paths for prompt-cache stability, (3) semantic tiling lint (embedding-based dedup, 0.85 cosine threshold), (4) boundary-first autoresearch scoring
- Status: proposed. Phase 0 pending codex adversarial review. Phase 1+ (fold skill, address anchors, tiling lint, boundary score) gated on review pass.
- Primary sources verified: Dragon curve (Wikipedia, boundary dim 1.523627086), Regular paperfolding sequence (OEIS A014577), LSM trees (arXiv 2504.17178, LevelDB 10x level ratio), MemGPT (arXiv 2310.08560), Anthropic prompt caching docs (5min/1hr TTL, 20-block lookback)
- Links updated: wiki/concepts/_index.md, wiki/index.md

## [2026-04-15] save | Claude SEO v1.9.0 Slides and GitHub Release
- Type: session
- Location: wiki/meta/2026-04-15-slides-and-release-session.md
- From: built 15-slide HTML presentation deck (v190.html), fixed hardcoded path in release_report.py, pushed 68 files to GitHub, tagged v1.9.0, created GitHub release with PDF asset
- Key lessons: Path.home() not hardcoded paths, git pull --rebase before big pushes, Chrome blocks file:// cross-origin images, .claude/ always in .gitignore
- Release: https://github.com/AgriciDaniel/claude-seo/releases/tag/v1.9.0

## [2026-04-15] save | Claude SEO v1.9.0 Release Report — PDF Complete
- Type: session
- Location: wiki/meta/2026-04-15-release-report-session.md
- From: full session completing the v1.9.0 PDF release report. Dark theme, 13 pages, 1.53 MB. Fixed logo (double-space filename), empty spaces, page-break orphans, file:// URL encoding.
- Key fixes: `urllib.parse.quote()` for file:// URIs; `display:table-cell` is atomic in WeasyPrint (no page-break); fixed `height:297mm` causes empty space; replaced orphan tables with paragraphs
- Challenge v2 added: keyword LEADS, $600 prize pool, deadline April 28
- Output: `~/Desktop/Claude-SEO-v1.9.0-Release-Report.pdf`

## [2026-04-14] save | Claude SEO v1.9.0 — Pro Hub Challenge Integration Session
- Type: session + 4 concept pages + 1 entity page
- Location: wiki/meta/2026-04-14-claude-seo-v190-session.md
- From: full v1.9.0 implementation session — reviewed 5 community submissions, integrated 4 new skills (seo-cluster, seo-sxo, seo-drift, seo-ecommerce), enhanced seo-hreflang, added DataForSEO cost guardrails
- Pages created: [[2026-04-14-claude-seo-v190-session]], [[Claude SEO]], [[Pro Hub Challenge]], [[Semantic Topic Clustering]], [[Search Experience Optimization]], [[SEO Drift Monitoring]]
- Review rounds: 4 (code review x3 + cybersecurity audit). Score: 87 → 93 → 97 → 85 security
- Key learnings: always verify subagent output (40-line count error caught), insertion-point bugs caught by max-effort plan review, pre-existing security debt identified (10 of 15 findings)

## [2026-04-14] save | SVG Diagram Style Guide
- Type: concept
- Location: wiki/concepts/SVG Diagram Style Guide.md
- From: extracted design tokens from 17 production SVGs in claude-ads/assets/diagrams/
- Covers: colors, typography, layout primitives, card patterns, arrow connectors, numbered circles, file naming

## [2026-04-14] save | Community CTA Footer Rollout
- Type: decision
- Location: wiki/meta/2026-04-14-community-cta-rollout.md
- From: session adding Skool community footer to 6 skill repos (claude-ads, claude-seo, claude-obsidian, claude-blog, banana-claude, claude-cybersecurity)
- Key insight: frequency calibration per tool type; single-point orchestrator instruction pattern

## [2026-04-10] save | Backlink Empire - Blog Posts, Karpathy Gist, GitHub Cross-Linking
- Type: session
- Location: wiki/meta/2026-04-10-backlink-empire-session.md
- From: full session covering blog creation (claude-obsidian + claude-canvas), Karpathy gist comment, 26 GitHub README updates with Author/community/backlink sections, homepage URLs on 10 repos, topics on 25 repos, rankenstein.pro backlinks on 5 SEO repos
- Blog posts: agricidaniel.com/blog/claude-obsidian-ai-second-brain, agricidaniel.com/blog/claude-canvas-ai-visual-production
- Impact: ~87 new backlinks from DA 96 github.com, 6 rankenstein.pro backlinks, 25 Skool community links

## [2026-04-08] save | claude-obsidian v1.4 Release Session
- Type: session
- Location: wiki/meta/claude-obsidian-v1.4-release-session.md
- From: full release cycle covering v1.1 (URL/vision/delta tracking, 3 new skills), v1.4.0 (audit response, multi-agent compat, Bases dashboard, em dash scrub, security history rewrite), and v1.4.1 (plugin install command hotfix)
- Key lessons: plugin install is 2-step (marketplace add then install), allowed-tools is not valid frontmatter, Bases uses filters/views/formulas not Dataview syntax, hook context does not survive compaction, git filter-repo needs 2 passes for full scrub

## [2026-04-08] ingest | Claude + Obsidian Ecosystem Research
- Type: research ingest
- Source: `.raw/claude-obsidian-ecosystem-research.md`
- Queries: 6 parallel web searches + 12 repo deep-reads
- Pages created: [[claude-obsidian-ecosystem]], [[cherry-picks]], [[claude-obsidian-ecosystem-research]], [[Ar9av-obsidian-wiki]], [[Nexus-claudesidian-mcp]], [[ballred-obsidian-claude-pkm]], [[rvk7895-llm-knowledge-bases]], [[kepano-obsidian-skills]], [[Claudian-YishenTu]]
- Key finding: 16+ active Claude+Obsidian projects; 13 cherry-pick features identified for v1.3.0+
- Top gap confirmed: no delta tracking, no URL ingestion, no auto-commit

## [2026-04-07] session | Full Audit, System Setup & Plugin Installation
- Type: session
- Location: wiki/meta/full-audit-and-system-setup-session.md
- From: 12-area repo audit, 3 fixes, plugin installed to local system, folder renamed

## [2026-04-07] session | claude-obsidian v1.2.0 Release Session
- Type: session
- Location: wiki/meta/claude-obsidian-v1.2.0-release-session.md
- From: full build session — v1.2.0 plan execution, cosmic-brain→claude-obsidian rename, legal/security audit, branded GIFs, PDF install guide, dual GitHub repos


- Source: `.raw/` (first ingest)
- Pages updated: [[index]], [[log]], [[hot]], [[overview]]
- Key insight: The wiki pattern turns ephemeral AI chat into compounding knowledge — one user dropped token usage by 95%.

## [2026-04-07] setup | Vault initialized

- Plugin: claude-obsidian v1.1.0
- Structure: seed files + first ingest complete
- Skills: wiki, wiki-ingest, wiki-query, wiki-lint, save, autoresearch
