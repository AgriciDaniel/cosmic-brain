---
type: meta
title: "Concepts Index"
updated: 2026-05-27
tags:
  - meta
  - index
  - concept
domain: knowledge-management
status: evergreen
related:
  - "[[index]]"
  - "[[dashboard]]"
  - "[[Wiki Map]]"
  - "[[Hot Cache]]"
  - "[[LLM Wiki Pattern]]"
  - "[[Compounding Knowledge]]"
  - "[[LLM Wiki Pattern]]"
  - "[[Hot Cache]]"
  - "[[Compounding Knowledge]]"
---

# Concepts Index

Navigation: [[index]] | [[entities/_index|Entities]] | [[sources/_index|Sources]]

All concept pages — ideas, patterns, and frameworks extracted from sources.

---

## Knowledge Management

- [[LLM Wiki Pattern]] — the core architecture for persistent, compounding knowledge bases
- [[Hot Cache]] — ~500-word session context file, updated after every ingest
- [[Compounding Knowledge]] — why the wiki grows more valuable over time, unlike RAG
- [[Ecosystem-Patterns]] — 12 design patterns from 16+ Claude+Obsidian projects; delta tracking, multi-depth queries, goal cascade, hybrid search, vault adoption (status: current)
- [[DragonScale Memory]] — memory-layer spec: fold operator, deterministic page addresses, semantic tiling, boundary-first autoresearch (status: shipped v0.4, all four mechanisms opt-in)
- [[Persistent Wiki Artifact]]: durable Markdown page as the LLM's memory object (developing)
- [[Source-First Synthesis]]: provenance discipline for LLM wiki layers (developing)
- [[Query-Time Retrieval]]: query synthesis with citations, complementary to Obsidian search (developing)

---

## Blazor / UI Components

- [[FluentUI Blazor Badge]] — three badge variants (Badge, CounterBadge, PresenceBadge), 9 anchor positions, non-focusable, accessibility via parent labeling (status: developing)
- [[FluentUI Blazor Styles]] — two-layer CSS model (`default-fuib.css` auto, `reboot.css` opt-in) plus full design-token vocabulary as CSS variables (status: developing)
- [[DevExpress Blazor DxToolbar]] — horizontal toolbar component with adaptivity, data binding, dropdown support, and radio-group items (status: developing)
- [[DevExpress Blazor AI Extensions]] — provider-agnostic AI integration via Microsoft.Extensions.AI/IChatClient; 6 provider tiers, BYOK model, 9 example repos (status: developing)
- [[DevExpress Blazor DxAIChat]] — AI chat UI component: file upload, prompt suggestions, function calling, dynamic model switching, event handling (status: developing)
- [[DevExpress Blazor AI Examples]] — catalog of 9 official GitHub example repos: function calling, A2A, MCP, tool confirmation, multi-model, cross-platform, editors (status: developing)
- [[DevExpress Blazor AI v26.1 Roadmap]] — mid-June 2026: IChatResponseProvider abstraction, MessageSending event, EmptyMessageAreaText/InputBoxNullText, end of Bootstrap v4 (status: developing)
- [[DevExpress Blazor DxGrid]] — full-featured data grid: 5 data binding modes, sorting, grouping, 5 filter UI modes, 5 edit modes, summaries, master-detail, export, virtual scrolling (status: developing)
- [[DevExpress Blazor DxTreeList]] — hierarchical grid+tree hybrid: 5 binding modes (including load-on-demand), sorting, 4 filter modes, 5 edit modes, drag-and-drop hierarchy changes (status: developing)
- [[DevExpress Blazor DxFilterBuilder]] — standalone filter UI with flat/hierarchical/collection fields, customizable editors, CriteriaOperator two-way binding to Grid/TreeList/PivotTable (status: developing)
- [[DevExpress Blazor Data Editors]] — 17 editor components (Calendar through TimeEdit): standalone or in-grid, AI smart autocomplete in DxMemo, masks, validation (status: developing)
- [[DevExpress Blazor Component Catalog]] — complete v25.2 catalog: 65+ components across 12 categories (editors, buttons, navigation, layout, overlays, charts, rich content, scheduling, loading, AI) (status: developing)

---

## Claude Code

- [[Claude Code Best Practices]] — Anthropic's official guide: verification, plan mode, prompting, environment config, session management, scaling patterns, failure modes (status: developing)
- [[Claude Code Context Management]] — context window discipline: /clear, subagents, compaction, side questions, anti-patterns, token budgeting by operation (status: developing)

---

## Design Systems — Fluent 2 (Microsoft)

Foundations:
- [[Fluent 2 Design Principles]] — four principles paired as functional + emotional aspects (status: developing)
- [[Fluent 2 Color System]] — three palettes (neutral, shared, brand), semantic subset, interaction states (status: developing)
- [[Fluent 2 Color Tokens]] — web alias catalog: neutrals, brand, status, 30+ generic palettes (status: developing)
- [[Fluent 2 Design Tokens]] — two-layer architecture: global vs alias tokens; native theming support (status: developing)
- [[Fluent 2 Typography]] — Segoe + native fallbacks; per-platform type ramps; contrast minimums (status: developing)
- [[Fluent 2 Layout]] — 4 px spacing ramp, 12-col grid, six breakpoints, five responsive techniques (status: developing)
- [[Fluent 2 Shapes]] — four forms, six corner-radius tokens, four stroke thicknesses (status: developing)
- [[Fluent 2 Iconography]] — three collections; literal-shape naming convention; modifier rules (status: developing)
- [[Fluent 2 Elevation]] — shadow ramps (low/high) per theme; brand-color shadow luminosity formula (status: developing)
- [[Fluent 2 Material]] — solid, acrylic, mica, smoke; mode awareness per material (status: developing)
- [[Fluent 2 Motion]] — four principles, easing types, choreography (staggering + hierarchy) (status: developing)
- [[Fluent 2 Accessibility]] — WCAG 2.1 AA targets; contrast ratios; zoom & assistive-tech requirements (status: developing)
- [[Fluent 2 Content Design]] — voice and tone, writing rules, punctuation, global readiness (status: developing)

AI-era UX:
- [[Fluent 2 Handoffs]] — Copilot-mediated workflow transitions across M365 (status: developing)
- [[Fluent 2 Onboarding]] — five principles, five goals (Welcome/Orient/Notify/Explain/Take action) (status: developing)
- [[Fluent 2 Wait UX]] — six visual patterns, timing table, perceived-performance rules (status: developing)
- [[Fluent 2 Content Engineering]] — system-prompt construction (Role/Task/Rules/Example) (status: developing)
- [[Fluent 2 Responsible AI]] — five principles, agent requirements, evaluation rubric (status: developing)
- [[Fluent 2 Types of AI Harm]] — six harm categories with UI mitigations (status: developing)

---

## Elsa Workflows

- [[Elsa Workflow Concepts]] — core concepts: Workflow, Activity, Bookmark, Trigger, Burst of Execution, Correlation ID, Outcome, Input/Output, Variable, Incident, Alteration (status: developing)
- [[Elsa Architecture]] — four-layer architecture, execution model (Execute vs Dispatch), bookmarks/triggers/stimuli, data flow, 5 deployment topologies, extensibility, security, monitoring (status: developing)
- [[Elsa Hello World]] — Console and ASP.NET Core tutorial with step-by-step setup (status: developing)
- [[Elsa Packages]] — NuGet package ecosystem, Feedz previews, versioning strategy (status: developing)
- [[Elsa Database Configuration]] — EF Core, SQL Server, PostgreSQL, SQLite, MySQL providers with connection string setup (status: developing)
- [[Elsa Containers]] — Docker images, Docker Compose setups (SQLite/PostgreSQL), Traefik reverse proxy (status: developing)
- [[Elsa Application Types]] — Elsa Server, Elsa Studio (Blazor WASM), Server+Studio WASM combined mode (status: developing)
- [[Elsa Workflow Dispatcher]] — three execution models (IWorkflowRunner/IWorkflowDispatcher/IWorkflowRuntime), dispatch request types, event flow (status: developing)
- [[Elsa Onboarding]] — hosting Elsa in existing ASP.NET apps, NuGet selection, EF Core setup, common pitfalls (status: developing)
- [[Elsa Security]] — auth modes (none/Identity/OIDC/custom), tokenized bookmark resume, CORS, secrets management (status: developing)
- [[Elsa Deployment]] — Kubernetes deployment, ConfigMap/Secrets/HPA/PDB/Ingress, cloud guidance (status: developing)
- [[Elsa Clustering]] — distributed runtime, locking (Redis/PostgreSQL), cache invalidation, Quartz.NET clustering (status: developing)
- [[Elsa V2 to V3 Migration]] — complete rewrite migration guide, NuGet/namespace mapping, side-by-side activity rewrite (status: developing)
- [[Elsa Blazor Dashboard]] — Blazor Server vs WASM hosting, auth, CORS, cross-origin deployment (status: developing)
- [[Elsa Persistence]] — EF Core, MongoDB, Dapper providers; six logical stores; EF migrations; indexing; retention (status: developing)
- [[Elsa API Client]] — HTTP APIs and elsa-api-client library, auth, publishing, querying, bookmarks, resilience (status: developing)
- [[Elsa HTTP Workflows]] — HttpEndpoint/SendHttpRequest/WriteHttpResponse, programmatic and designer approaches, CRUD tutorial (status: developing)
- [[Elsa Plugins and Modules]] — FeatureBase lifecycle, custom features, extension methods, module contributions, NuGet packaging (status: developing)
- [[Elsa Running Workflows]] — Studio, triggers (HTTP/Timer/Cron/Event), Dispatch Workflow activity, REST API (status: developing)
- [[Elsa Studio Guide]] — Studio interface, expressions (JS/C#/Liquid/JSON), custom UI components, framework integration (status: developing)
- [[Elsa Workflow Patterns]] — Human-in-the-Loop Approval, Fan-Out/Fan-In, Timeout/Escalation, Saga/Compensation, Idempotent Calls (status: developing)
- [[Elsa Troubleshooting]] — symptom playbooks, logging config, OpenTelemetry tracing, testing infrastructure, production checklist (status: developing)
- [[Elsa External Application Interaction]] — two-app pattern, webhooks, RunTask activity, external MVC app integration (status: developing)
- [[Elsa Loading Workflows from JSON]] — console/auto-discovery/blob storage approaches, IActivitySerializer (status: developing)
- [[Elsa Performance]] — commit strategies, DB optimization, Quartz tuning, distributed lock optimization, KPIs (status: developing)
- [[Elsa Activities]] — activity model, base classes, inputs/outputs, outcomes, composite activities, DI, registration (status: developing)
- [[Elsa Blocking Activities and Triggers]] — bookmark system, WaitForApproval pattern, SignalFanIn trigger, resume patterns (status: developing)
- [[Elsa Control Flow]] — Sequence, Flowchart, Decision, If/Switch, Fork/Join, ForEach, Parallel, Delay (status: developing)
- [[Elsa MassTransit Integration]] — auto-generated activities from message types, event-driven workflow orchestration (status: developing)
- [[Elsa Diagnostics]] — Log activity, structured logging, custom log sinks, execution log entries (status: developing)
- [[Elsa Workflow as Activity]] — composing workflows as reusable activities, inputs/outputs/outcomes (status: developing)
- [[Elsa Expressions]] — C# (Roslyn), JavaScript (Jint), Python (Pythonnet), Liquid (Fluid); global member references (status: developing)
- [[Elsa Custom Activities]] — base classes, attributes, 14 UI hints, custom outcomes, DI, IActivityProvider, reusable triggers (status: developing)
- [[Elsa Multitenancy]] — tenant isolation strategies, Tenant model, resolution pipeline, setup (status: developing)
- [[Elsa Workflow Instance Variables]] — programmatic and REST API variable management (status: developing)
- [[Elsa Workflow Activation Strategies]] — Always/Singleton/Correlation/CorrelatedSingleton strategies (status: developing)
- [[Elsa Incidents]] — incident recording, FaultStrategy, ContinueWithIncidentsStrategy, configuration (status: developing)
- [[Elsa Log Persistence]] — four-level scope hierarchy, LogPersistenceMode options (Include/Exclude/Inherit) (status: developing)
- [[Elsa Retention]] — sweep intervals, delete policies with dynamic filters, custom entity archiving (status: developing)
- [[Elsa Workers]] — MediatorOptions for command/job/notification worker counts, tuning (status: developing)
- [[Elsa Distributed Hosting]] — four pillars: distributed runtime, locking, caching (MassTransit), Quartz clustering (status: developing)
- [[Elsa Studio Design]] — editor UI, activity pickers, 20 UI Hints, content visualisers, field extensions (status: developing)
- [[Elsa Studio Localization]] — ILocalizationProvider, Blazor Server/WASM setup (status: developing)
- [[Elsa Authentication]] — three modes (None/Elsa.Identity/OIDC) with configuration (status: developing)
- [[Elsa Alterations]] — alteration plans, async/immediate execution, REST API, custom alteration extensibility (status: developing)
- [[Elsa Logging Framework]] — sink setup, Log activity, custom sink factory creation (status: developing)

---
## FluentUI Blazor v5 — Component Reference

**Get Started & General:**
- [[FluentUI Blazor Installation]] — NuGet setup, service registration, render modes (status: developing)
- [[FluentUI Blazor v5 Migration]] — breaking and non-breaking changes from v4 to v5 (status: developing)
- [[FluentUI Blazor MCP Server]] — Model Context Protocol server: 7 tools, resources, prompts, AI Skills, security (status: developing)
- [[FluentUI Blazor Theming]] — light/dark themes, system colors, theme designer (status: developing)
- [[FluentUI Blazor Styles and Spacing]] — spacing system, default values, reboot layer (status: developing)
- [[FluentUI Blazor Localization]] — IFluentLocalizer, .resx files, ASP.NET globalization (status: developing)

**Inputs:**
- [[FluentUI Blazor Button]] — 6 button variants (Button/Anchor/Compound/Menu/Split/Toggle), appearances, shapes, sizes (status: developing)
- [[FluentUI Blazor Checkbox]] — two-state, indeterminate, three-state, CheckState (status: developing)
- [[FluentUI Blazor Radio]] — FluentRadioGroup/FluentRadio, label templates, items binding (status: developing)
- [[FluentUI Blazor Switch]] — toggle switch, label positioning, ReadOnly/Disabled (status: developing)
- [[FluentUI Blazor Slider]] — min/max/step, orientation, custom thumb, debounce (status: developing)
- [[FluentUI Blazor Number]] — numeric input, step buttons, culture/format, prefix/suffix (status: developing)
- [[FluentUI Blazor Text Inputs]] — TextInput/TextArea/Label/Field, validation, masks, templates (status: developing)
- [[FluentUI Blazor ColorPicker]] — FluentColorPicker/FluentColorPickerInput, swatches, color wheel (status: developing)
- [[FluentUI Blazor InputFile]] — file upload (SaveToTemporaryFolder/Buffer/Stream), drag-drop (status: developing)
- [[FluentUI Blazor Forms]] — EditForm, FluentValidationSummary, DataAnnotationsValidator, validation (status: developing)

**Layout:**
- [[FluentUI Blazor Accordion]] — expand/collapse, single/multi mode, marker & block, programmatic control (status: developing)
- [[FluentUI Blazor Card]] — appearances, shadows, clickable, PowerPoint template (status: developing)
- [[FluentUI Blazor Grid]] — 12-col CSS grid system, breakpoints, responsive (status: developing)
- [[FluentUI Blazor Layout and Stack]] — FluentLayout + FluentStack + FluentSpacer (status: developing)
- [[FluentUI Blazor Splitter]] — multi-panel splitter, resizable panes (status: developing)
- [[FluentUI Blazor Dialog]] — Dialog/Drawer/MessageBox/Overlay: modals, drawers, alerts (status: developing)
- [[FluentUI Blazor Popover]] — popover with anchor positioning (status: developing)
- [[FluentUI Blazor Tabs]] — tabbed interface, tab panels, dynamic tabs (status: developing)
- [[FluentUI Blazor Divider]] — visual separator (status: developing)
- [[FluentUI Blazor Wizard]] — multi-step wizard with FluentWizardStep (status: developing)

**Lists, Menus & Navigation:**
- [[FluentUI Blazor List and Select]] — FluentSelect/FluentListbox, multi-select, option templates (status: developing)
- [[FluentUI Blazor Autocomplete]] — async search, single/multi-select, option templates (status: developing)
- [[FluentUI Blazor Combobox]] — editable select with filtering, free-form entry (status: developing)
- [[FluentUI Blazor Menu]] — FluentMenu/FluentMenuList/FluentMenuItem, submenus, context menus (status: developing)
- [[FluentUI Blazor Nav]] — FluentNav/FluentNavItem/FluentNavCategory, accordion, density (status: developing)
- [[FluentUI Blazor AppBar]] — vertical/horizontal app bar, icons, popover overflow (status: developing)
- [[FluentUI Blazor TreeView]] — hierarchical tree, manual/dynamic mode, lazy load, multi-select (status: developing)
- [[FluentUI Blazor Link]] — hyperlink with icon start/end, inline mode (status: developing)
- [[FluentUI Blazor Overflow]] — overflow container, MoreButton template, ellipsis mode (status: developing)

**Media & Display:**
- [[FluentUI Blazor Avatar]] — image/initials/icon, active, colorful, shapes, sizes (status: developing)
- [[FluentUI Blazor Badges]] — Badge/CounterBadge/PresenceBadge: appearances, colors, positions (status: developing)
- [[FluentUI Blazor Icon]] — 2200+ icons, filled/regular, custom icons, slot placement (status: developing)
- [[FluentUI Blazor Image]] — lazy loading, fallback, fit modes, shapes (status: developing)
- [[FluentUI Blazor Emoji]] — 1500+ emoji, 3 styles, 6 skin tones, 9 groups (status: developing)
- [[FluentUI Blazor Text and Typography]] — Text component (10 sizes, 4 weights) + Highlighter (status: developing)

**Feedback & Status:**
- [[FluentUI Blazor Progress and Skeleton]] — ProgressBar/Spinner/Skeleton: loading indicators, placeholders (status: developing)
- [[FluentUI Blazor Toast]] — toast service: 3 types, 4 intents, timed/conditional dismissal (status: developing)
- [[FluentUI Blazor Tooltip]] — anchor-based, 13 positioning modes, delay, spacing (status: developing)
- [[FluentUI Blazor MessageBar]] — 4 intents, 3 layouts, actions template (status: developing)
- [[FluentUI Blazor RatingDisplay]] — star rating, half-star, compact mode (status: developing)

**Advanced:**
- [[FluentUI Blazor DataGrid]] — 22 sub-pages: PropertyColumn/TemplateColumn, sort, page, virtualize, hierarchical, multi-select, dynamic columns, remote data, EF Core/OData (status: developing)
- [[FluentUI Blazor DateTime]] — Calendar/DatePicker/TimePicker/ToTimeAgo: culture, views, selection modes (status: developing)
- [[FluentUI Blazor Drag and Drop]] — FluentDragContainer/FluentDropZone + FluentSortableList (status: developing)
- [[FluentUI Blazor Paginator]] — pagination with PaginationState, templates, localization (status: developing)
- [[FluentUI Blazor PullToRefresh]] — pull-to-refresh with custom templates (status: developing)

**Utilities:**
- [[FluentUI Blazor Table]] — styled HTML table, CSS-only row selection (status: developing)
- [[FluentUI Blazor KeyCode]] — keyboard capture, local + global via IKeyCodeService (status: developing)
- [[FluentUI Blazor ErrorBoundary]] — error boundary with 3 detail levels (status: developing)
- [[FluentUI Blazor Counter]] — demo counter component (status: developing)

---
## MES / HYDRA Manufacturing Execution System

- [[MPDV HYDRA]] — comprehensive MES by MPDV Mikrolab GmbH; 14 product groups, ~800+ tables, covers full manufacturing execution lifecycle (status: developing)
- [[HYDRA ANALYSIS Module]] — Statistical Process Control & analytics data pool; 11 tables (status: developing)
- [[HYDRA BDE Module]] — Production data collection (Betriebsdatenerfassung): work plans, orders, quantities, scrap; 40 tables (status: developing)
- [[HYDRA CAQ Module]] — Computer-Aided Quality: inspections, FMEA, control plans, dynamic sampling, assessment catalogs; 82 tables (status: developing)
- [[HYDRA HLS Module]] — Shop floor scheduling with individual shift/assignment times; 6 tables (status: developing)
- [[HYDRA KERNEL Module]] — System core: event engine, user management, terminals, logging, printing, licensing, dialog framework; 65 tables (status: developing)
- [[HYDRA LLE Module]] — Performance-based pay (Leistungslohnerfassung): wage type determination, time tickets, bonuses; 12 tables (status: developing)
- [[HYDRA MDE Module]] — Machine data collection (Maschinendatenerfassung): machine statuses, events, cycles, downtime; 17 tables (status: developing)
- [[HYDRA MLE Module]] — SAP integration: IDoc inbound/outbound, distribution models, TID management; 11 tables (status: developing)
- [[HYDRA MPL Module]] — Material & production logistics: lots/batches, materials, buffers, production events; 22 tables (status: developing)
- [[HYDRA PDV Module]] — Process data visualization: measurement channels, tags, SPC, process parameters, table repository; 31 tables (status: developing)
- [[HYDRA PEP Module]] — Personnel & production planning: machine scheduling, qualification matrix; 4 tables (status: developing)
- [[HYDRA PZE Module]] — Personnel time recording (Personalzeiterfassung): attendance, absences, wage types, time accounts, shifts; 58 tables (status: developing)
- [[HYDRA WRM Module]] — Tool & resource management (Werkzeug-/Ressourcenmanagement): inventory, maintenance, BOMs, status booking; 21 tables (status: developing)
- [[HYDRA ZKS Module]] — Access control (Zutrittskontrollsystem): badges, zones, calendars, access groups; 91 tables (status: developing)
- [[HYDRA 8 Function Catalog]] — complete cross-referenced function listing: ~200 function codes across 23 product modules (v8.1/v8.2/v8.3) (status: developing)
- [[HYDRA 8 Glossary]] — 17 manufacturing and SAP integration terminology definitions (status: developing)
- [[HYDRA 8 Client Types]] — 9 client interface types: AIP, CT5, HWEB, MBL, MOC, MESC, MTS, SMA, SystemFunctions (status: developing)
- [[HYDRA 8 Configuration Procedures]] — 124 how-to procedures catalog: SAP integration, DMC, MDS, module config, setup guides, connectors (status: developing)
- [[HYDRA 8 Release Notes]] — ~515 release note PDFs organized by module and version across v8.1, v8.2, v8.3 (status: developing)

---

## Software Architecture / Git

- [[Framas Monorepo Architecture]] — .NET 10 Blazor team architecture: Git Bare + Worktree per feature, per-dev .sln, write-protected shared branch, port conventions for 10-dev team (status: developing)
- [[Git Bare Worktree Pattern]] — bare repo as object store + named worktrees per branch; eliminates branch-switching, enables parallel feature development (status: developing)
- [[Framas Scanner Label Scan Flow]] — two-phase scanner backend: CheckLabel (validate + lock pending row) → PostSingle (commit); per-mode/per-tenant proc naming; MAUI XAML display strings from SQL (status: developing)

---
## WinLine ERP (Mesonic)

- [[Bilanz- und Betriebswirtschaftliche Kennzahlen (BKZ BWA)]] — two account-classification keys in FIBU: BKZ (9-digit balance-structure key, 3 groups) and BWA (operating figures, up to 3 per account) (status: developing)
- [[WinLine Wirtschaftsjahr]] — fiscal year stored as a relative index, not the literal year; LIST/KORE formulas auto-retarget after year-end close (status: developing)
- [[WinLine Jahresabschluss]] — year-end close / Wirtschaftsjahreswechsel: EB-Buchung (opening entries), Umbuchung Jahressalden (status: seed)
- [[WinLine Offene Posten (OP)]] — open items lifecycle: Faktura → Zahlung → Ausgleich; OP-Parameter tolerances; Mahnung dunning (status: developing)
- [[WinLine Mandant]] — a client/company within an installation; all modules operate on the current Mandant + data stand (status: seed)
- [[WinLine Benutzer- und Berechtigungsverwaltung]] — ADMIN user model: bidirectional permissions (Benutzer↔Mandant), groups, profiles, 2FA (status: developing)

---
## Add new concepts here as they are extracted from sources.

---
## Database

- [[Database Indexing]] — B+Tree mental model, Heap Table vs Clustered Index, four golden rules, SQL operations with indexes, cost model and EXPLAIN debugging (status: developing)
- [[Database Index Advanced Techniques]] — expression indexes, partial indexes, index-only queries, JSON indexing, spatial/trigram/hash indexes, ghost conditions, range-to-equality transformation (status: developing)
- [[Database Schema and Performance]] — UUID vs auto-increment PK, denormalization, constraints and exclusion constraints, partitioning, pre-aggregation, keyset pagination, CTEs, data manipulation techniques (status: developing)

---

## .NET / ActualLab.Fusion

- [[ActualLab-Fusion Overview]] — what Fusion is, the MSBuild/Make analogy, three core abstractions, complexity tiers (status: developing)
- [[Fusion Story & Philosophy]] — origins (ServiceTitan, Quora LiveNode, Knockout.js), philosophy (status: developing)
- [[Fusion Compute Services]] — `[ComputeMethod]`, `IComputeService`, `Computed<T>` lifecycle, `ComputedRegistry`, `ComputedOptions`, invalidation chains (status: developing)
- [[Fusion States]] — `IState<T>`, `MutableState<T>`, `ComputedState<T>`, `StateFactory`, update delayers (status: developing)
- [[Fusion Cache-Aware API Design]] — fine-grained cacheable units, fetch IDs first, stable arguments, speculative execution, pseudo-dependencies (status: developing)
- [[Fusion Authentication]] — `IAuth`/`IAuthBackend`, `Session`, multi-provider, `ServerAuthHelper`, Blazor WASM session (status: developing)
- [[Fusion Blazor Integration]] — `ComputedStateComponent<T>`, component hierarchy, `UICommander`, parameter optimization (status: developing)
- [[Fusion RPC Framework]] — Compute Service Clients, WebSocket transport, `RpcStream<T>`, `RpcNoWait`, reverse RPC, 2-7x faster than gRPC/SignalR (status: developing)
- [[Fusion CommandR]] — CQRS pipeline, `ICommander`, `[CommandHandler]`, `CommandContext`, MediatR comparison (status: developing)
- [[Fusion Operations Framework]] — multi-host invalidation, Transactional Outbox Pattern, operation logging, log watchers (status: developing)
- [[Fusion EF Integration]] — `DbHub<TDbContext>`, sharding, `DbEntityResolver`, operation-scoped DbContext (status: developing)
- [[Fusion Interceptors & Proxies]] — compile-time proxy generation, `Interceptor`, `Invocation`, ~8x faster than Castle DynamicProxy (status: developing)
- [[Fusion Native AOT]] — `CodeKeeper`, `RuntimeCodegen` modes, trimming support (status: developing)
- [[Fusion Serialization]] — `IByteSerializer`/`ITextSerializer`, type-decorated serialization, MemoryPack/MessagePack (status: developing)
- [[Fusion TypeScript Port]] — `@actuallab/fusion`, React hooks, RPC client (status: developing)
- [[Fusion Core Foundation]] — `Result<T>`, `Moment`, `AsyncLock`, `PropertyBag`, `Symbol`, resilience (status: developing)
- [[Fusion Performance & Benchmarks]] — 8,127x speedup, RPC benchmarks, memory management, Voxt.ai production numbers (status: developing)
- [[Fusion HelloCart Tutorial]] — step-by-step sample from in-memory to distributed (status: developing)
- [[Fusion API Reference]] — complete type reference for all Fusion namespaces (status: developing)
- [[Fusion NuGet Packages]] — package catalog with selection guide (status: developing)
- [[Fusion FAQ]] — common questions about Fusion usage and comparisons (status: developing)
- [[Fusion External Resources]] — videos, blog posts, code samples, community links (status: developing)
