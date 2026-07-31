---
type: source
title: "HYDRA Service Interface (SCS-SIF 8.1)"
created: 2026-07-14
updated: 2026-07-14
address: c-000347
tags:
  - source
  - mes
  - hydra-8
  - mpdv
  - service-interface
  - rest-api
  - repository-metamodel
status: current
related:
  - "[[HYDRA Service Interface (SIF)]]"
  - "[[HYDRA SIF DLG Service Catalog]]"
  - "[[hydra-8-documentation]]"
  - "[[HYDRA SCS Module]]"
  - "[[MPDV HYDRA]]"
  - "[[WinLine WebServices Security Model]]"
sources:
  - "[[hydra-8-documentation]]"
source_type: data
author: "MPDV Mikrolab GmbH"
date_published: 2020-09-23
url: ""
confidence: high
key_claims:
  - "The HYDRA Service Interface (SIF) is a general-purpose HTTP/REST API layer for calling any HYDRA service or legacy PDM dialog (DLG=...), not a hardware-connectivity module — despite being filed under Products/SCS_81/ alongside the unrelated OPC/hardware layer (SCS/PCC)"
  - "Client identity uses a licensed AccessId (8-digit customer installation ID or 6-digit MPDV partner ID) plus a Basic-Auth-derived session cookie that expires after 30 minutes of inactivity"
  - "The Repository is a metadata-driven service description model (Domain/Service/ServiceGui/ServiceParameter/ServiceParameterGui/Property/ControlDataSource/ReferenceData/Authorization) that drives both server-side request interpretation and client-side GUI generation from the same data"
  - "Services of type Wrapper/InterpretedWrapper explicitly do not support dynamic Where clauses -- structurally analogous to WinLine WebServices' AllowWhereStatementInWebService gate, but enforced by service-type choice rather than a runtime flag"
  - "Licensing is two-tier (SCS-SIF basic + SCS-SIC per-client 'named device') and services/dialogs are further gated per-user via Svc:<name> function authorizations, categorized DC (Data Collection) / SM (Status Management) / DP (Data Processing)"
---

# HYDRA Service Interface (SCS-SIF 8.1)

**Source file:** `.raw/hydra/md/HYDRA_8_Documentation Oct 2020/Products/SCS_81/SCS-SIF_81.md`
**Original doc:** SCS-SIF_81.docx, Version 1.1.23372, last changed 2020-09-23, 535 pages / 22,361 markdown lines
**Publisher:** MPDV Mikrolab GmbH

## What this document actually is

Filed under `Products/SCS_81/` alongside the OPC/hardware-connectivity module documented at [[HYDRA SCS Module]], **SCS-SIF is a completely different, much larger concept**: the general-purpose HTTP/REST service-call interface (Service Interface) used to invoke any HYDRA service or legacy PDM dialog (`DLG=...`) from any external client — .NET, Java, JavaScript/Node.js, Excel VBA, or a raw HTTP request. It is the API layer sitting on top of the entire HYDRA product suite (BDE, MDE, HLS, PZE, PZW, WRM, HR/ZKS/PEP, MPL, PDV, CAQ, and more), not a machine-connectivity adapter. See [[HYDRA Service Interface (SIF)]] for the synthesized architecture concept and [[HYDRA SIF DLG Service Catalog]] for the DLG=/BAPI reference table extracted from chapters 9-19.

The document's own naming makes the overlap look worse than it is: "SCS-SIF" (basic license) and "SCS-SIC" (per-client license) share the "SCS" prefix with "SCS-PDM" (the legacy dialog-string protocol SIF now wraps) and with the actual SCS hardware module (PCC/OPC/Modbus/Siemens), but none of these three are the same thing. See [[HYDRA SCS Module]] for the explicit disambiguation.

## Document structure (19 chapters)

| # | Chapter | Lines (approx) | Content |
|---|---------|-----------------|---------|
| 1 | HYDRA Service Interface | 617-671 | Purpose, requirements, licensing prerequisite, integration into MES Weaver (MW) 3.0/4.0 |
| 2 | Interface Technology | 672-3327 | Formats/standards, AccessId & session auth, http operations, communication process, programming examples (curl/wget, Java, .NET/C#, Excel VBA, JavaScript), troubleshooting |
| 3 | Tutorial: Node.js | 3328-3534 | Worked example: insert/update/delete a unit via `MDUnits.*` services, error-path demo |
| 4 | Service Tester | 3535-4126 | Standalone GUI test tool: main view, SQL client, DLG request window, Settings, batch mode (`-c`/`-r`/`-l`/`-a` CLI flags) |
| 5 | Licensing | 4127-5304 | SCS-SIF/SCS-SIC license model, 5 worked licensing examples, released-service catalog by module (Global, BDE, MDE, CAQ, HLS/PEP, HR, MPL, PDV, WRM) |
| 6 | Repository Client | 5305-5787 | MRC desktop tool: worksets, perspectives, grids, relations, references, service documentation |
| 7 | **The Repository** | 5788-6868 | **The metadata model**: Domain, Service, ServiceGui, ServiceParameter, ServiceParameterGui, Property, ControlDataSource, ReferenceData, Authorization |
| 8 | PDM — Preface | 6869-7008 | Legacy `DLG=` dialog-string format: header (DLG/USR/DAT/ZEI), field data, return values (RET/KT/LT), BAPI call reference, lock mechanism |
| 9 | PDM Basis — Data Collection | 7009-7436 | Server time, terminal status, list reload, MLE outbound segments, logging, escalation |
| 10 | PDM Basis — Master Data | 7437-8811 | Terminal config, function auth/profiles, responsibility profiles, user admin, paths, licensing, INI config, number ranges |
| 11 | PDM BDE/MDE — Data Collection | 8812-11443 | Order/staff/machine posting catalog (`A_AN`, `A_TR`, `A_UN`, `A_AB`, `A_BE`, `A_MR`, `P_AN`, `M_MST`, etc.), shift-change postings, reading BDE/MDE/HLS data |
| 12 | PDM BDE — Master Data | 11444-14447 | BDE log records (`ADEPRO.*`), reason texts/reasons, huge order/operation/sequencing catalog (`ANR.*`, `ANETZ.*`) |
| 13 | PDM MDE — Master Data | 14448-15463 | Machine config (`MNR.*`), status texts/classes, counter config, terminal assignment, MDE postings (`MDEPRO.*`) |
| 14 | PDM HR — PZE/PZW/ZKS/PEP | 15464-17347 | SAP HR data transfer, time-event/access-log posting, access authorizations, terminal/access lists, incentive wage data |
| 15 | PDM MPL — Data Collection | 17348-18856 | Batch postings (`CA_WL`, `CE_AN`, `C_GEN`, `C_MBEW`, etc.), reading MPL data, packing/palletizing (`*_PA`) |
| 16 | PDM MPL — Master Data | 18857-19800 | Material types/buffer/transport units, batch stock, material movements, cutting plan, transport management |
| 17 | PDM PDV — Master Data | 19801-20261 | Events (`PDVEVENTCFG.*`), logical channels (`LOGCHAN.*`), characteristic attributes (`PAUMMAUSP.*`) |
| 18 | PDM WRM — Data Collection | 20262-21617 | Resource logon/off/status (`RES_*`), DNC download/upload, resource lists (`LIST;NN`) |
| 19 | PDM WRM — Master Data | 21618-22361 | Resources (`RES.*`), free attributes, resource families, maintenance, material lists (`MATLIST.*`) |

## Auth model: AccessId + session cookie

Two identity concepts stack:

1. **AccessId** — identifies the *client implementation*, not the user. Format-dependent: customers use their 8-digit installation ID (leading zeros); MPDV partners use a 6-digit individually-assigned ID. Passed as URL param (`?X-Access-Id=...`) or http header. Mandatory as of MW 4.0; optional/ignored on MW 3.x (so a well-behaved client always sends it, working on both). It exists to detect misbehaving/unauthorized clients and gate per-partner licensing, not to authenticate the human user.
2. **User session** — first request uses HTTP Basic Auth; the server returns a session cookie that must be replayed on every subsequent request. Sessions auto-expire after 30 minutes idle (http 401 `"Full authentication is required to access this resource"`). Opening many parallel sessions is explicitly flagged as a server resource drain — clients are expected to reuse one session per logical connection and call `/logout` when done.

Function authorizations are per-service as of MW 4.0/MIP: a user needs `Svc:<ServiceName>` (or `Svc:DLG_<DialogName>` for legacy PDM dialogs) with wildcard support (`*`, `?`). `Svc:*` and `Svc:DLG_*` exist but are explicitly "not recommended." Pre-MW 4.0 systems use a single blanket `svcitf.login` authorization instead — the shift to per-service authorization is a real hardening step MPDV made between MW 3.x and MW 4.0.

## HTTP mechanics

- REST over http/https, GET (no params) or POST (JSON body with `params`/`columns`/`requestId`/`returnAsObject`).
- `GET /meta` lists all existing services; `GET /meta/<domain>/<service>` returns full parameter/operator metadata for one service — this makes the Repository partially self-describing over the wire, not just in the offline Repository Client tool.
- Result envelope: array of rows tagged `__rowType` = `META` (column definitions) | `DATA` (positional array) | `OBJECT` (full JSON object, when `returnAsObject=true`, ~2x payload size) | `ERROR`.
- Legacy PDM dialogs are reachable through the same REST layer via `POST /dlg/command` with a raw `DLG=...|` string body (not JSON) — this is the bridge that lets SIF carry the entire pre-REST HYDRA dialog API (chapters 8-19) without a rewrite.
- File download/upload (`/dlg/fileDownload`, `/dlg/fileUpload`, SP13+) is gated by a separate `filePermissions.json` allow-list (per-user READ/WRITE glob rules) that the *system administrator* edits by hand on the server — this is a second, independent authorization layer on top of function authorizations, scoped to filesystem paths rather than services.
- Error bodies carry a `languageKey` (e.g. `lkServiceMissingFctAuth`, `lkParamMissing`, `lkServiceUnavailable`, `lkRetCodeHydra`) resolvable via `TranslationService.list` for localized client-side messages — errors are internationalized data, not hardcoded English strings, even though the http status/message defaults to English.

## Tools

- **Service Tester** — standalone Java desktop app for manually testing service/dialog calls; also runnable headless in **batch mode** (`java -jar Service_Tester.jar -c <serverconfig.json> -r <requestfile.json> -l <logfile.json> [-a]`) for scripted regression testing or bulk data import via repeated service calls. Exit code 7 signals at least one server-side error occurred. Includes a read-only SQL client for direct DB inspection.
- **Repository Client (MRC)** — .NET desktop tool for browsing/editing the Repository. Requires a separate developer license (`mpdvWrite.lic`) to write; read-only otherwise. Data sources ("worksets") can layer with priority: local dev directory (writable) over server/client runtime structure (read-only) over ZIP archive (read-only, e.g. training material). Has a built-in **Validate** function that emits a CSV of repository irregularities. As of MRC 1.8.STD.65500 (early 2019) it also renders the extended service documentation inline.

## The Repository — metadata model (full detail)

This is the most architecturally significant content in the document. See [[HYDRA Service Interface (SIF)]] for the synthesized version; key fields transcribed here for reference:

**Domain** — smallest deployable/updatable unit ("update package"); UpperCamelCase name; groups all services + client presentation + auth for one application.

**Service** — `Name` (usually `Domain.function`), `Function` (list/insert/update/delete/new/...), `ServiceType` (see below), `ListMode` (Y = PDM dialog returns a file), `DLG`/`SystemCall` (which legacy dialog or external program a Wrapper/InterpretedWrapper service invokes).

ServiceType is the single most important architectural fork in the whole model:

| ServiceType | Use | Notes |
|---|---|---|
| `InterpretedJavaService2` | Read (list/report) services | Recommended for new reads; streams data |
| `InterpretedJavaService` | (obsolete) | superseded by above |
| `InterpretedBAPIService` | Write (insert/update/...) services | Recommended for new writes |
| `ExternalJavaService` | Reads or writes too complex for interpretation | Full Java implementation |
| `InterpretedWrapper` | Wraps a legacy PDM dialog | **"does not support any dynamic Where"** |
| `Wrapper` (obsolete) | Wraps a legacy BAPI function | Same "no dynamic Where" limitation |
| `JavaService` (obsolete) | Full Java | superseded |

**ServiceGui** — client presentation metadata for a service (ApplicationID/Title/HelpFile, description language key).

**ServiceParameter** — one input/output field of a service: `Acronym`+`ResultSet` (unique key pair), `WebServiceType` (decimal/integer/string/boolean/binary/datetime — binary unsupported except in user exits), `IsResult`/`IsSpecialParameter`/`IsFilterParameter`/`IsMandatory`, the `Can*` filter-operator matrix (CanEqual, CanLike, CanBetween, CanIn, CanLt/Lte/Gt/Gte, each with an `...OrNull` variant), `DBField`/`DBAlias`/`DBTabelle` (raw SQL mapping — lower-case field names, alias-qualified for joins), `Constraints` (pipe-delimited key=value processing hints: `KEY`, `SERIAL`, `SEP_DATETIME`, `BOOL=<true>;<false>;<null>;<type>`, `MODIFY_TS`, `MODIFY_BY`, `CREATE_TS`, `CREATE_BY`).

**ServiceParameterGui** — client presentation overrides for a parameter (only populate to override the Property default): `Label`/`Tooltip`, `ControlType` (CheckEdit/ColorEdit/ComboBoxEdit/DateTimeEdit/MemoEdit/RadioGroup/TextEdit), `ControlDataSource`+`ControlDataSourceMode` (Lookup=web service, Reference=static ReferenceData, Script), `VisibleCondition`/`EditableCondition` (boolean expressions over other field values, `&&`/`||`/`AND`/`OR`, no parentheses support), `IsKey` (drives both DB identity and client cursor positioning after edit — every `IsKey` field must be `IsMandatory` except list services and composite-key wrappers).

**Property** — the system-wide unique-acronym base layer that ServiceParameterGui overrides sit on top of: `WebServiceType`, `NETType` (color/duration/image/preview/timestamp — client-side type coercion hints), `SemanticType` (meaning — e.g. `order.id`), `SyntacticType` (uniform presentation independent of meaning — e.g. all durations render the same way regardless of what they measure), `OutputFormat`/`InputFormat` (MPDV format providers: `{0:mpdv_timespan}`, `{0:mpdv_cycletime}`, `{0:mpdv_calc;MULT=5;DIV=2;...}`, plus regex-based logical formats like `ORDER`, `NUMBER_N3`, `TIMESPAN`). Resolution priority for any display characteristic: `FormatType` override > `ServiceParameterGUI` > `Property` > `SemanticType` > `SyntacticType`.

**ControlDataSource** — named, reusable selection-list source: web service (`Source` = derived data-logic name, e.g. `MDUser.list` → `MDUserList`), `ReferenceData` (static list), or search application. `Result` field position encodes Value/ControlValue/LabelValue/dependent-lookup-columns by ordinal position (1-4+), not by name.

**ReferenceData** — static (non-service-backed) selection-list entries: `ref_data_key` (usually `type:db_key`), `Type`, `db_key`, `is_default`, `Designation`, `sort_key`.

**Authorization** — GUI-layer permission gate distinct from the function-authorization (`Svc:`) mechanism: `Authorization type` (Acronym / AcronymGroups / Application / Functions), `Authorization Context`, `Authorization ID`, `Authorization key`. Controls field/application/function visibility and editability on the client, on top of (not instead of) service-call authorization.

**Key architectural insight**: the Repository is genuinely bidirectional metadata — the same records that tell the *server* how to interpret an `InterpretedJavaService2`/`InterpretedBAPIService` request into SQL also tell the *client* which control to render, what format to use, and what to hide. This is a metadata-driven low-code pattern: "You can generate most of the applications on the client using the configurations of the repository. [...] programming on the client is not required" (§7.1). It is the same category of idea as OData `$metadata` or GraphQL introspection, but applied to a legacy 1990s dialog-string protocol (`DLG=...`) that it wraps rather than replaces.

## Legacy PDM dialog wire format (chapters 8-19)

Every `DLG=` call shares one envelope:

- **Header** (always present): `DLG={dialog ID}`, `USR={N4 HYDRA user}`, `DAT={mm/dd/yyyy}`, `ZEI={seconds since midnight}`. Fields separated by `|`; `\` and `|` inside values must be backslash-escaped.
- **Return**: `RET={N8}` (0 = success), `KT={C20}` short text, `LT={C40}` long text, optional `ID` echo.
- **BAPI naming convention**: `OBJEKT.AKTION`, e.g. `MNR.INSERT`. `*.NEW`/`*.SELECT`/`*.LOCK` return one record (`DATA=<Objekt>` + unprefixed fields); `*.LIST` returns a file-backed list (colons become underscores in column names).
- **Lock mechanism**: `*.LOCK`/`*.UNLOCK` operate on a virtual dataset (can span multiple records). `*.UPDATE`/`*.DELETE` check the lock first; a conflicting lock returns error code 1666 plus the locking user/client's identity. `*.DELETE` will not proceed on a still-locked record even without a prior `*.LOCK` call from the deleting client.

Full DLG=/BAPI catalog with one-line purpose per call, organized by module: [[HYDRA SIF DLG Service Catalog]].

## Licensing model

Two-component license:
- **SCS-SIF** (basic) — releases the interface itself, includes dev tools + Service Tester test access.
- **SCS-SIC** (per connected client, "named device") — required for *every* distinct client (a BDE terminal, an industrial PC, a machine control extension, a monitoring web server, an ERP system's own call-back into HYDRA). The doc works through 5 concrete licensing-count examples (industrial PCs, machining-center controllers, monitor displays, ERP-triggered callbacks, ERP order transfer via EIS) to disambiguate "client" from "user."
- Services/dialogs are further categorized **DC** (Data Collection — basic posting/master-data), **SM** (Status Management — read current state), **DP** (Data Processing — computed/aggregated results, e.g. OEE reports, HR labor-time calc). Customer-specific services (`U_` prefix, whether built by MPDV or the customer via MES Development Suite) are always category DP.
- Released services are cataloged per module in §5.2: Global (~40+ services covering user/unit/escalation/INI/number-range admin), BDE, MDE, CAQ, HLS/PEP, HR, MPL, PDV, WRM. Each entry pairs an "outdated" legacy PDM dialog with the REST-native service that superseded it (e.g. `BEARBFKT.LIST` (Dialog) vs. `SYSAuthorization.list` (Service, *SP16)) — the whole catalog reads as a live migration map from dialog-string to REST-native APIs, not a green-field service set.

## Cross-product observation: WinLine WebServices parallel

[[WinLine WebServices Security Model]] (a different ERP product, Mesonic WinLine, documented 2026-07-13) independently arrived at the same two design instincts for gating an HTTP service-call surface over an ERP/MES:

1. **Gate raw SQL by construction, not just by permission.** WinLine's `AllowWhereStatementInWebService` server flag is a runtime toggle that must be explicitly turned on to allow raw `Where=`/`Key=where` SQL fragments. HYDRA SIF reaches a similar outcome through service-type choice instead of a flag: `Wrapper`/`InterpretedWrapper` services (the ones that proxy legacy PDM dialogs) are documented as **structurally incapable** of dynamic Where clauses — "it does not support any dynamic Where" (§7.3.3) — while only the newer `InterpretedJavaService2`/`InterpretedBAPIService` types get the richer `Can*` filter-operator matrix (CanEqual/CanLike/CanBetween/CanIn and their `...OrNull` variants) that lets a client build parameterized (not raw-SQL) filters. Both systems land on "the caller cannot inject arbitrary SQL through the API by default" — WinLine via a config flag, HYDRA via type-system design.
2. **Opaque session/access identity as the connection-level gate.** WinLine issues a 1-hour session token; HYDRA SIF layers a licensed AccessId (identifies the client implementation/partner) with a 30-minute-idle session cookie (identifies the logged-in user). Neither system treats "having network access to the endpoint" as sufficient.
3. **License/authorize at service granularity, not just connection granularity.** WinLine gates whole endpoint templates behind EXIM+MDP licensing; HYDRA SIF gates every individual service/dialog behind a `Svc:<name>` function authorization plus the SCS-SIF/SCS-SIC license pair — a finer-grained but philosophically identical stance ("licensed and explicitly enabled, not merely reachable").

This is a real convergent pattern across two independently-built DACH-region business-system HTTP APIs (Mesonic and MPDV), not a coincidence specific to either vendor. It suggests "gate raw SQL by default, require an explicit trust escalation to unlock it" is close to a de facto industry norm for ERP/MES service layers of this era, worth treating as a checklist item when evaluating any similar system: does its public API let callers express raw predicates, and if so, is that opt-in or opt-out?

## See Also

- [[HYDRA Service Interface (SIF)]] — synthesized architecture concept (AccessId/session model, Repository metamodel summary, licensing, tools)
- [[HYDRA SIF DLG Service Catalog]] — DLG=/BAPI reference table by module
- [[hydra-8-documentation]] — master catalog for the whole Oct-2020 HYDRA 8 doc set (updated to disambiguate SIF from SCS)
- [[HYDRA SCS Module]] — the actual hardware/OPC connectivity module, cross-referenced to avoid confusion
- [[WinLine WebServices Security Model]] — the cross-product architectural parallel
