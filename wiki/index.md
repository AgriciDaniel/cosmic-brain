---
type: meta
title: "Wiki Index"
updated: 2026-07-14
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

Last updated: 2026-07-14 | Total pages: 291 | Sources ingested: 137

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

## Documentation & Knowledge Management

- [[Business Process Documentation]] — writing methodology for repeatable processes: recipe metaphor, How-to naming, standard template sections, visuals-last, user testing; Atlassian 12-step framework; $47M/year cost of knowledge gaps (status: evergreen)
- [[Documentation Culture]] — organizational layer: documentation as deliverable, "definition of done", crowdsourced ownership, assigned stewards, anti-patterns (knowledge hoarding, perfectionism, one-and-done) (status: evergreen)
- Source: [[documentation-business-process-bergren]] (c-000271) — 2026-06-26 | Jen Bergren | practical 3-phase guide
- Source: [[art-of-writing-good-documentation]] (c-000272) — 2026-06-26 | Pragati Sinha | philosophy & culture
- Source: [[atlassian-process-documentation-guide]] (c-000273) — 2026-06-26 | Atlassian | 12-step methodology, failure modes, tools

---

## Framas

### Core
- [[framas/_index|Framas Wiki Index]] — company, architecture, databases, operations (status: current)
- [[framas/company-profile|Framas Company Profile]] — Frantz Martz & Sons; 1948-founded German footwear manufacturer; 3,600+ employees; 9 global regions; 150+ customers (status: current)
- [[framas/architecture|Monorepo Architecture]] — .NET 10 Blazor: Git Bare + Worktree, per-feature branches, per-dev .sln, apphost write-protection, port conventions (status: current)
- [[framas/databases|Database Architecture]] — Multi-tenant DOGE_WH + Winline via SYNONYM schema linking (wl, hy, re) per location (status: current)
- [[framas/framas-scanner|FramasScanner]] — in-house mobile app: scan FGs/raw-material QR labels for WH movement tracking (status: current)

### Tenants & Locations
- [[framas/tenants/DOGE_WH|DOGE_WH]] — main OMS database; setup with Winline/Hydra/RecycledApp synonym schemas (status: current)
- [[framas/tenants/fGE|fGE (Germany)]] — Pirmasens HQ; MESOCOMP 01FG; CWL database (status: current)
- [[framas/tenants/fVN|fVN (Vietnam)]] — Đồng Nai; MESOCOMP VNT1; VNT86 database (status: current)
- [[framas/tenants/fFT|fFT (Vietnam FT)]] — Nhơn Trạch II; MESOCOMP FTT1; FTT2021/FTL2021 databases (status: current)
- [[framas/tenants/fIN|fIN (Indonesia)]] — 3 facilities; MESOCOMP 05FI; CWLDATA database (status: current)

### Legacy References
- [[Framas]] — manufacturing company; DOGE_WH SQL Server database; [[Mesonic WinLine]] ERP (wl schema, 330 tbl) + HYDRA MES + custom OMS/T3PO (dbo schema, 62 tbl + 4 views) (status: developing)
- [[DOGE WH Database Schema]] — SQL Server database architecture, two schemas (dbo + wl), integration flows, dbdocs publishing pipeline (status: developing)
- [[Framas DBO Schema]] — OMS/T3PO tables (order mgmt, label/QC, ETC calc, HYDRA bridge, PO material mgmt, plastic box mgmt) (status: developing)
- [[Framas WL Schema]] — WinLine ERP tables (finance, accounting, purchasing, products, tax, CRM, currency) (status: developing)
- [[Framas Monorepo Architecture]] — .NET 10 Blazor team setup: Git Bare + Worktree, per-feature branches, per-dev .sln, write-protected apphost, port conventions (status: developing)
- [[Git Bare Worktree Pattern]] — reusable Git pattern: bare repo as object store + named worktrees per branch; no branch-switching needed (status: developing)
- [[FramasScanner]] — in-house mobile app: scan FGs/raw-material QR labels to track WH movement; SQL Server proc backend per scan mode + tenant (status: developing)
- [[Framas Scanner Label Scan Flow]] — two-phase scan pattern: CheckLabel (validate, lock) → PostSingle (commit); `lmpScannerClient_ScanningLabel`/`ScannedLabel` table pair (status: developing)
- Source: [[framas-scanner-hc-bag-procs]] — 2026-06-08 | fGE HANGING_HC_BAG CheckLabel + PostSingle stored procs
- Source: [[sources/framas-v-oms-whinfo|framas-v-oms-whinfo]] (c-000235) — 2026-06-08 | `dbo.v_OMS_WHInfo` view: warehouse master list (identity, physical specs, location, scanner flags)
- [[Framas HYDRA EIS-DBI Interface]] (c-000342) — WinLine↔HYDRA production-order bridge via EIS-DBI SQL staging tables (`HYSAP_*`); MES-Auftragsnummer encoding; parallel-sequence BOM derivation (status: current)
- [[Framas Delivery Date Calculation]] (c-000343) — Priority Matrix + RTD/RTC/LTD/LTC/LTDF/LTDB/CSD/ETD/ETC field chain; two-pass calc (order entry vs. HYDRA feedback) (status: current)
- [[SOFTAGE]] (c-000344) — WinLine implementation partner; built the EIS-DBI interface + delivery-date-calc engine for Framas (status: current)
- [[Framas ExportOrder Implementation]] (c-000345) — framLib.dll decompilation: `ExportOrder` DTO tree, `HY72_Segment` serialization, 66-field USRFLD container (1 slot used), `auftrags_bestand` field mapping (status: current)
- Source: [[framas-hydra-interface-concept-2019]] (c-000340) — 2026-07-13 | MPDV 2019 interface concept (v1) | scopes FRAM-002/003/004
- Source: [[framas-winline-hydra-schnittstelle-konzept]] (c-000341) — 2026-07-13 | SOFTAGE concept doc v1.08 (2019-2021) | full EIS-DBI + delivery-date build spec

---

## Entities

- [[Fluent 2 Design System]] — Microsoft's current-generation design system; cross-platform token vocabulary + four guiding principles; parent of [[FluentUI Blazor]] (status: developing)
- [[FluentUI Blazor]] — Microsoft Blazor component library implementing [[Fluent 2 Design System]]; v5.0.0-RC.3 (status: developing)
- [[DevExpress Blazor]] — commercial Blazor UI suite (40+ components, v24.2); DxToolbar, DataGrid, Charts; entity page (status: developing)
- [[ActualLab-Fusion]] — .NET end-to-end reactivity framework; `[ComputeMethod]`, auto caching+dependency tracking, distributed invalidation, fastest .NET RPC (status: developing)
- [[Voxt.ai]] — Fusion's production dogfood app; real-time voice chat, rebrand of Actual Chat (status: developing)
- [[Framas]] — manufacturing company; DOGE_WH SQL Server database (status: developing)

---

- [[framas-db-schema-management]] — 2026-06-05 | FramasDbSchemaManagement GitHub repo | 5 pages created: Framas entity, DOGE_WH schema overview, dbo schema, wl schema
- [[hydra-cuthdb-data-model]] — 2026-05-26 | MPDV HYDRA CUT-HDB data model (846-page PDF) | 16 pages created covering all 14 product groups and ~800+ tables
- [[hydra-8-documentation]] — 2026-05-27 | HYDRA 8 complete documentation (1,557 files) | 6 pages created: function catalog, glossary, client types, procedures, release notes, entity update
- Markdown sources — 2026-06-09 | `.raw/hydra/md/` (markdown-converted versions of all HYDRA docs) | 13 new module pages added
- [[hydra-service-interface-sif]] — 2026-07-14 | HYDRA Service Interface manual SCS-SIF 8.1 (535 pages) | 2 pages created: [[HYDRA Service Interface (SIF)]] architecture concept, [[HYDRA SIF DLG Service Catalog]] reference table
- [[sop-hydra-multi-mold-machine]] — 2026-07-14 | `presentations/sop_hydra-multi-mold-machine.md`, re-verified SOP rewrite | 1 page created, 3 updated: expanded resource-type codes (PAC/ENT/PRU), `RES_STATUS`→`res_ress_belegung` trigger cross-link to SIF, new "multi-slot simultaneous" gap section, contradiction flag on HLS-MFB/HLS-AGS/BDE-APF/BDE-SSG

---

## HYDRA MES

- [[MPDV HYDRA]] — Manufacturing Execution System by MPDV Mikrolab GmbH; 23 product modules, ~800+ tables (status: developing)
- [[HYDRA Running and Scheduled Orders Query]] — synthesis: list running orders (`prod_kenn='L'`) + orders scheduled in a date window (`erranf_dat`), caveats on planned vs actual machine (status: developing)
- **Production:** [[HYDRA BDE Module|BDE]] — [[HYDRA MDE Module|MDE]] — [[HYDRA HLS Module|HLS]] — [[HYDRA MPL Module|MPL]] — [[HYDRA TRT Module|TRT]] — [[HYDRA DNC Module|DNC]]
- **Quality:** [[HYDRA CAQ Module|CAQ]] — [[HYDRA ANALYSIS Module|ANALYSIS]] — [[HYDRA PDV Module|PDV]] — [[HYDRA FEP Module|FEP]] — [[HYDRA WEP Module|WEP]] — [[HYDRA REK Module|REK]] — [[HYDRA PMV Module|PMV]] — [[HYDRA QMS Module|QMS]]
- **HR & Time:** [[HYDRA PZE Module|PZE]] — [[HYDRA PZW Module|PZW]] — [[HYDRA LLE Module|LLE]] — [[HYDRA PEP Module|PEP]]
- **Infrastructure:** [[HYDRA KERNEL Module|KERNEL]] — [[HYDRA WRM Module|WRM]] — [[HYDRA ZKS Module|ZKS]] — [[HYDRA EMG Module|EMG]] — [[HYDRA SIS Module|SIS]] — [[HYDRA EIS Module|EIS]] — [[HYDRA SCS Module|SCS]] — [[HYDRA MLE Module|MLE]]
- **Terminal UI:** [[HYDRA AIP Module|AIP]]
- [[HYDRA Service Interface (SIF)]] — general-purpose HTTP/REST API layer spanning the whole product suite (AccessId+session auth, bidirectional Repository metamodel, `/dlg/command` legacy-dialog bridge); not to be confused with [[HYDRA SCS Module|SCS]] hardware connectivity despite the shared doc folder (status: current)
- [[HYDRA SIF DLG Service Catalog]] — reference table of ~150 `DLG=`/BAPI call families by module, callable through SIF (status: current)
- [[HYDRA SIF RET Error Codes]] — catalog of 94 distinct `RET=` return codes from SCS-SIF_81.md (table + prose sweep) (status: current)
- [[HYDRA Multi-Tool Resource Configuration]] — MOC/WRM click-path: one machine + many molds, mold pools (Required resources), cavity partitioning, parallel OPs (capacity per-mill), AIP cavity recording; now also `res_ress_belegung` write-trigger (SIF `RES_STATUS`) + open "multi-slot simultaneous" mechanism gap (status: developing)
- [[Framas HYDRA EIS-DBI Interface]] — real-world EIS-DBI deployment (non-SAP ERP) bridging [[Mesonic WinLine]] to HYDRA at [[Framas]] (status: current)

---

## WinLine ERP (Mesonic)

- [[Mesonic WinLine]] — modular Austrian/DACH ERP suite (CWL); modules share one Mandant + data stand; the product behind Framas's [[Framas WL Schema|wl schema]] (status: developing)
- [[WinLine FIBU]] — ACC1, Finanzbuchhaltung: accounts, BKZ/BWA, Buchen, OP, Bilanz, Austrian tax (UVA/ZM/FinanzOnline) (status: developing)
- [[WinLine KORE]] — ACC2, Kostenrechnung: Kostenstellen/-arten/-träger, Umlage, BAB, Vor-/Nachkalkulation (status: developing)
- [[WinLine PPS]] — PROD, Produktion: Ressourcen, Stücklisten, Produktionsaufträge, Materialentnahme, Endmeldung (status: developing)
- [[WinLine LIST]] — Listgenerator: List-Assistent, Listentyp scopes, formula parameters (SUMKTO/KORESUM) (status: developing)
- [[WinLine ADMIN]] — ADMN: users/permissions/2FA, backup/restore, DMS archive, MSM + WinLine Server, SQL tools (status: developing)
- [[WinLine Settings]] — START → Parameter: per-module Applikations-Parameter + per-workstation Einstellungen (status: developing)
- [[WinLine FAKT]] — Fakturierung: Belegerfassung, 4 formula types (Zeilen-/Beleg-/Belegkopfformel Laden+Speichern), VBScript, exchange-rate vars, T025 user columns (status: developing)
- [[WinLine FAKT Formeln]] — Formula system: types, execution triggers, Invoicing object vars, exchange-rate capture (Value 616/618), writing to T025 user columns (U000…) on save (status: developing)
- [[WinLine FAKT - Voucher Save Hook va Exchange Rate]] — Synthesis: Belegkopfformel (Speichern) hook, exchange rate Value(0,618), T025 user columns, Batchbeleg gap + SQL Agent Job workaround (status: developing)
- [[WinLine MDP Module]] — Modification Development Platform: custom windows (CWLCTK), DB extensions, CTK window scripts; two MDP-licensed VBScript contexts (status: developing)
- [[WinLine CWLCTK]] — GUI tool for creating user-defined WinLine windows; module areas, window numbering (900+), control View/Var bindings (status: developing)
- [[WinLine User-Defined Windows]] — event-driven VBScript windows; OnPushButton/OnCheckUserField; bResult.Value=False blocks; ScreenContents vs Contents (status: developing)
- [[WinLine MDP Database Extensions]] — append table columns (U000=Var500…), user-defined tables T650–T699; Update/Insert only on user tables; CWLGrid two-tier API (status: developing)
- [[WinLine Makros]] — record/replay VBScript automation; ~40 CWLMacro methods; MParameters array for parameterized runs; MSavePreview for 8 export formats (status: developing)
- [[WinLine VBScript Engine]] — embedded VBScript in 7 contexts: FIBU/FAKT/LOHN/ANBU/Makros (standard) + System Skripten/Fenster Skripten (MDP-licensed) (status: developing)
- [[WinLine CWL Object Model]] — object hierarchy: CWLStart→CWLScript→CWLCurrentModule→CWLCurrentWindow; v10.5 EN vs v12.24 DE (status: developing)
- [[WinLine CWLCurrentWindow]] — central event hub for CTK scripts; ScreenContents (not Contents) = in-flight value during OnCheck events (status: developing)
- [[WinLine CWL MacroCommands]] — batch automation commands; complement to object methods in CWL scripting (status: developing)
- [[WinLine WebServices API]] — REST API via MDP WebServices; requires EXIM + MDP license + 64-bit server; XML+template-driven; session token 1h (status: developing)
- [[WinLine WebServices Integration]] — Type 40/42 production order bridge to HYDRA MES; Type 31 Buchungsstapel import with ImportID idempotency (status: developing)
- [[WinLine WebServices Security Model]] — AllowWhereStatementInWebService SQL gate + POSTING batch-origin restriction, synthesized as security boundaries (status: current)
- Concepts: [[WinLine Mandant]], [[WinLine Wirtschaftsjahr]], [[WinLine Jahresabschluss]], [[WinLine Offene Posten (OP)]], [[Bilanz- und Betriebswirtschaftliche Kennzahlen (BKZ BWA)]], [[WinLine Benutzer- und Berechtigungsverwaltung]]
- Sources: [[.raw/winline/cwl0/cwl0.chm]] (CHM, 7 modules), [[winline-mdp-workshop-example-docs]] (MDP seminar examples, Framas 2020), [[winline-mdp-workshop-slides]] (MDP workshop slides, mesonic 2020), [[winline-makro12]] (Makros v12, 2021), [[winline-webservices]] (WebServices white paper v12), [[winline-cwl-object-model-en]] (CWL Object Model EN v10.5), [[winline-cwl-object-model-de]] (CWL Objektmodell DE v12.24)

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

## SQL Server Performance Tuning

### Concepts
- [[SQL Server Query Tuning Methodology]] — B.E. C.R.E.E.P.I. step-by-step process; estimates-vs-actuals 10x rule; logical reads over wall-clock time; the 30-minute hourglass technique (status: seed)
- [[Query Execution Plan]] — Estimated vs Actual plan types, top-to-bottom/right-to-left reading convention, row-count gap as stale-statistics signal (status: developing)
- [[SQL Server Statistics and Cardinality Estimation]] — DBCC SHOW_STATISTICS histograms, sampling, sargability, tipping point, multi-tenant blind spot (status: seed)
- [[Parameter Sniffing]] — plan reuse across data distributions; emergency response via sp_BlitzCache; long-term fixes (RECOMPILE, OPTIMIZE FOR, branching) (status: seed)
- [[SQL Server Locking, Blocking, and Concurrency Control]] — blocking vs deadlocks, lock escalation, RCSI/Snapshot Isolation (status: seed)
- [[SQL Server Wait Statistics]] — wait-type framework: PAGEIOLATCH, LCK, CXPACKET, SOS_SCHEDULER_YIELD, WRITELOG (status: seed)
- [[SQL Server Performance Monitoring Tools]] — SET STATISTICS TIME/IO, sp_whoisactive, Extended Events, Query Store, First Responder Kit (status: seed)
- [[First Responder Kit]] — Brent Ozar Unlimited's free open-source diagnostic toolkit (status: seed)
- [[SQL Server Query Hints]] — explicit directives (NOLOCK, RECOMPILE, OPTIMIZE FOR); fix symptoms not causes (status: seed)

### Entity
- [[Brent Ozar Unlimited]] — SQL Server performance-tuning consultancy; creator of First Responder Kit, sp_Blitz* tools, blog/Podcast/classes (status: current)

### Sources (Brent Ozar Unlimited — 21 sources, batch 2026-07-02)
- [[blocking-and-locking-how-to-find-and-fight-concurrency-problems]] — concurrency, blocking chains, deadlock graphs, lock escalation
- 4-part How to Think Like the Engine: [[how-to-think-like-the-engine-part-1|Part 1]] — [[how-to-think-like-the-engine-part-2|Part 2]] — [[how-to-think-like-the-engine-part-3|Part 3]] — [[how-to-think-like-the-engine-part-4|Part 4]]
- [[how-to-think-like-the-sql-server-all-demo-edition]] — all-demo edition: execution plans, index tuning, wait stats
- How to Think Like the Engine standalone articles: [[how-to-think-like-the-sql-server-engine-part-1-clustered-index|Clustered Index]], [[how-to-think-like-the-sql-server-engine-part-2|Caching & Memory Grants]], [[how-to-think-like-the-sql-server-engine-part-3|Statistics]]
- [[how-to-think-like-the-sql-server-engine-part-3-statistics-memory-grants]] — detailed statistics + memory grant deep-dive
- [[how-to-tune-indexes-fast]] — index tuning methodology (missing/duplicate/unused indexes, diagnoses)
- [[how-to-tune-queries-fast]] — query tuning walk-through (reads vs time, execution plan analysis)
- sp_Blitz tool guides: [[how-to-use-sp-blitzcache|sp_BlitzCache]] — [[how-to-use-sp-blitzfirst|sp_BlitzFirst]] — [[how-to-use-sp-blitzindex|sp_BlitzIndex]]
- [[identifying-and-fixing-parameter-sniffing-issues|Identifying and Fixing Parameter Sniffing Issues]] — parameter sniffing deep-dive
- [[brent-ozar-mssql-performance-tuning-live|Microsoft SQL Server Performance Tuning, Live]] — live tuning class transcript
- [[brent-ozar-office-hours-database-qa|Office Hours Microsoft Database Q&A]] — database Q&A session transcript
- [[sql-query-optimization-why-is-it-so-hard-to-get-right|SQL Query Optimization: Why Is It So Hard To Get Right?]] — optimizer and complexity deep-dive
- [[watch-brent-tune-queries-sqlsaturday-oslo|Watch Brent Tune Queries — SQLSaturday Oslo]] — live tuning demo transcript
- [[watch-brent-tune-queries-2020|Watch Brent Tune Queries 2020]] — live tuning demo transcript

### Sources (Third-party SQL articles — 4 sources, pre-existing)
- [[sql-query-performance-tuning-tips|7 SQL Query Performance Tuning Tips]] — 7 practical tuning tips (links: Database Indexing, Execution Plan)
- [[sqlshack-query-optimization-tips-and-tricks|Query optimization techniques in SQL Server tips and tricks]] — SQLShack guide: 12 optimization techniques
- [[sql-performance-tuning-tips-for-newbies|SQL Performance Tuning tips for newbies]] — beginner-focused tuning introduction
- [[sql-query-optimization-18-techniques|SQL Query Optimization: 18 Proven Techniques and Tips]] — Dremio blog: 18 techniques catalog

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
- 18 additional Fluent 2 sub-pages ingested 2026-05-24 — color, color-tokens, design-tokens, elevation, iconography, layout, material, motion, shapes, typography, accessibility, content-design, handoffs, onboarding, wait-ux, content-engineering, responsible-AI, ai-harm. Each is filed as a concept page (`[[Fluent 2 ...]]`) under [[Fluent 2 Design System]]. Raw fetches under `.raw/articles/<topic>-2026-05-24.md`.
- [[fusion-docs-overview]] — 2026-05-25 | ActualLab.Fusion official docs | complete VitePress documentation set (125 files): 17 concept pages, 5 reference pages, 2 video transcripts
- [[fusion-video-distributed-state-sync]] — 2026-05-25 | 2h video transcript | Fusion architecture, perf vs Redis, Voxt demo, dependency graphs
- [[fusion-video-fastest-rpc]] — 2026-05-25 | 1h video transcript | RPC design, benchmarks vs gRPC/SignalR, mesh demo
- [[yakunin-fusion-vs-signalr]] — 2026-07-14 | Alex Yakunin, Medium (~2019) | creator's own Fusion-vs-SignalR comparison, summarized (gap-fill: was link-only before)

---

## Questions

- [[How does the LLM Wiki pattern work]] — how the pattern works and why it outperforms RAG at human scale (status: developing)
- [[hydra-multi-mold-machine]] — one machine with N mold slots: model as meta-resource (`meta_res='J'`) + subordinate WZ molds in a `res_familie`, cavity mgmt (WRM-NST), occupancy in `res_ress_belegung`; MOC setup + res_familie-vs-Required-resource clarification; now flags HLS-MFB/HLS-AGS/BDE-APF/BDE-SSG as unverified per contradiction from [[sop-hydra-multi-mold-machine]] (status: developing)

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
- [[Fusion NuGet Packages]] — package catalog with selection guide; net10.0 target framework (status: developing)
- [[Fusion FAQ]] — common questions about Fusion usage and comparisons (status: developing)
- [[Fusion External Resources]] — videos, blog posts, code samples, community links (status: developing)
- [[Voxt.ai]] — production dogfood app behind the benchmark numbers; rebrand of Actual Chat; real-time voice chat w/ live transcription/translation/AI summaries (status: developing)
- [[yakunin-fusion-vs-signalr]] — creator's own comparison: Fusion vs SignalR solve different problems, not competitors (status: developing)
- [[Research - ActualLab.Fusion Recent Developments & Community Reception]] — gap-fill synthesis: net10.0 targeting, Voxt.ai identity, escalating benchmark claims, no independent third-party reviews found (status: developing)

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
