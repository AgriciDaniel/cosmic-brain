---
type: concept
title: "HYDRA Service Interface (SIF)"
created: 2026-07-14
updated: 2026-07-14
address: c-000348
tags:
  - concept
  - mes
  - hydra-8
  - module
  - rest-api
  - repository-metamodel
  - integration-services
status: current
related:
  - "[[MPDV HYDRA]]"
  - "[[HYDRA 8 Function Catalog]]"
  - "[[HYDRA SCS Module]]"
  - "[[HYDRA SIS Module]]"
  - "[[HYDRA EIS Module]]"
  - "[[HYDRA SIF DLG Service Catalog]]"
  - "[[WinLine WebServices Security Model]]"
  - "[[WinLine WebServices API]]"
sources:
  - "[[hydra-service-interface-sif]]"
complexity: advanced
domain: "Manufacturing Execution Systems"
---

# HYDRA Service Interface (SIF) — HTTP/REST API layer

**Code:** SCS-SIF (basic license) + SCS-SIC (per-client license)
**Version:** 8.1 (doc v1.1.23372, 2020-09-23)
**Source:** [[hydra-service-interface-sif]]

## Purpose

SIF is HYDRA's general-purpose HTTP/REST service-call interface — the API layer any external system uses to read/write HYDRA data or invoke HYDRA business logic, spanning the entire product suite ([[HYDRA BDE Module|BDE]], [[HYDRA MDE Module|MDE]], [[HYDRA HLS Module|HLS]], [[HYDRA PZE Module|PZE]], [[HYDRA PZW Module|PZW]], [[HYDRA WRM Module|WRM]], [[HYDRA MPL Module|MPL]], [[HYDRA PDV Module|PDV]], [[HYDRA CAQ Module|CAQ]], [[HYDRA PEP Module|PEP]], and more). It also carries the entire pre-REST **PDM dialog protocol** (`DLG=OBJEKT.AKTION|...`) through the same HTTP surface via `POST /dlg/command`, so a single interface spans both modern REST-native services and the ~1990s-era dialog-string API.

**Do not confuse with:** [[HYDRA SCS Module]] (PCC/OPC hardware connectivity — a completely different concept that happens to share the "SCS" product-family prefix), or SCS-PDM (the legacy dialog-string wire protocol itself, which SIF wraps rather than is).

## Auth model: AccessId + session

Two stacked identity concepts, neither of which is optional in practice:

- **AccessId** — identifies the *client implementation/partner*, not the human user. Customers use an 8-digit installation ID; MPDV partners use a 6-digit assigned ID. Passed as URL param or `X-Access-Id` header. Mandatory as of MW 4.0; a well-written client always sends it so it works unmodified on MW 3.x too.
- **Session cookie** — first call uses HTTP Basic Auth; server returns a session cookie the client must replay on every subsequent call. Auto-expires after 30 min idle (http 401). Clients are expected to reuse one session, not open a new one per call — many parallel sessions degrade server performance.

Per-service authorization (MW 4.0+/MIP): `Svc:<ServiceName>` or `Svc:DLG_<DialogName>` function authorizations, wildcard-capable (`*`, `?`). Pre-MW 4.0 used one blanket `svcitf.login` grant for everything — the shift to per-service granularity is real security hardening across MW versions.

## HTTP mechanics (summary)

- GET (no params) or POST (JSON body: `params`/`columns`/`requestId`/`returnAsObject`).
- `GET /meta` and `GET /meta/<domain>/<service>` make the service catalog and per-service parameter/operator metadata queryable over the wire — self-describing API, same data the offline Repository Client renders.
- Result rows tagged `__rowType`: `META` | `DATA` | `OBJECT` (2x payload, easier client parsing) | `ERROR`.
- Legacy dialogs: `POST /dlg/command` with raw `DLG=...|` text body (not JSON).
- File transfer (`/dlg/fileDownload`, `/dlg/fileUpload`) gated by a separate, server-admin-edited `filePermissions.json` allow-list — an independent authorization layer scoped to filesystem globs, not services.

## The Repository — metadata model

The Repository is the system's core architectural idea: a single metadata store that drives **both** server-side request interpretation **and** client-side GUI generation from the same records — "you can generate most of the applications on the client using the configurations of the repository... programming on the client is not required" (source doc §7.1). Comparable in spirit to OData `$metadata` / GraphQL introspection, but layered over a legacy dialog-string protocol it wraps rather than replaces.

**Object hierarchy:**

```
Domain (smallest deployable unit, "update package")
 └─ Service (Name, Function, ServiceType, DLG/SystemCall)
     ├─ ServiceGui (client presentation: title, help file, description)
     └─ ServiceParameter (one field: Acronym+ResultSet key, WebServiceType,
         Can* filter-operator matrix, DBField/DBAlias/DBTabelle, Constraints)
         └─ ServiceParameterGui (per-service presentation override:
             ControlType, VisibleCondition/EditableCondition, IsKey)
             ↓ falls back to
         Property (system-wide unique acronym: WebServiceType, SemanticType,
             SyntacticType, OutputFormat/InputFormat)
             ↓ falls back to
         SemanticType → SyntacticType (inheritance chain)

ControlDataSource (named reusable selection-list: web service | ReferenceData | script)
ReferenceData (static selection-list entries: Type + db_key + Designation)
Authorization (GUI-layer permission: Acronym | AcronymGroups | Application | Functions)
```

**ServiceType is the key architectural fork** — it decides whether a service can express dynamic filters at all:

| ServiceType | Use | Dynamic Where? |
|---|---|---|
| `InterpretedJavaService2` | Reads (recommended) | Yes, via `Can*` operator matrix |
| `InterpretedBAPIService` | Writes (recommended) | N/A (targeted insert/update) |
| `ExternalJavaService` | Complex reads/writes | Full Java, no interpreter limits |
| `InterpretedWrapper` / `Wrapper` (obsolete) | Proxies a legacy PDM dialog/BAPI | **No — explicitly unsupported** |
| `InterpretedJavaService` / `JavaService` (obsolete) | superseded | — |

Resolution priority for any display characteristic (label, format, control type): `FormatType` override > `ServiceParameterGUI` > `Property` > `SemanticType` > `SyntacticType`.

Full field-by-field detail: [[hydra-service-interface-sif]] §"The Repository — metadata model (full detail)".

## Legacy dialog wire format

Every `DLG=` call: header `DLG={id}|USR={N4}|DAT={mm/dd/yyyy}|ZEI={sec since midnight}|` + fields, pipe-separated, backslash-escaped. Returns `RET={0=ok}|KT={short}|LT={long}|`. BAPI naming: `OBJEKT.AKTION` (e.g. `MNR.INSERT`). Lock mechanism: `*.LOCK`/`*.UNLOCK` on a virtual dataset; conflicting lock returns error 1666 + the locking user's identity. Full catalog: [[HYDRA SIF DLG Service Catalog]].

## Tools

- **Service Tester** — GUI + headless batch mode (`-c serverconfig.json -r requestfile.json -l logfile.json [-a]`) test/automation tool. Includes read-only SQL client.
- **Repository Client (MRC)** — .NET desktop editor for Repository data; write access requires a separate developer license; layered worksets (local dev > server/client runtime > ZIP archive, each read-only except local dev); built-in CSV-export validator.

## Licensing model

- **SCS-SIF** (basic, once) + **SCS-SIC** (per connected client, "named device") — a client is any distinct terminal, PC, machine-control extension, monitoring display, or callback-initiating ERP system.
- Services/dialogs categorized **DC** (Data Collection) / **SM** (Status Management) / **DP** (Data Processing, includes all customer-specific `U_`-prefixed services).
- Released-service catalog (§5.2 of source) is organized by module (Global, BDE, MDE, CAQ, HLS/PEP, HR, MPL, PDV, WRM) and reads as a live dialog-to-REST migration map: nearly every legacy PDM dialog has a paired "outdated, use service instead" REST-native replacement.

## Positioning in the HYDRA architecture

```
External client (any language/framework)
        ↓ HTTP/REST, AccessId + session cookie
SIF (Web Service Provider WSP extension)
        ↓ Repository-interpreted request → SQL, or /dlg/command → legacy DLG= dispatch
Any HYDRA module: BDE / MDE / HLS / PZE / PZW / WRM / HR (PZE+ZKS+PEP) / MPL / PDV / CAQ / ...
```

Where [[HYDRA SCS Module]] is the hardware abstraction layer (machine → HYDRA database), SIF is the **application abstraction layer** (external system ↔ HYDRA business logic). They are complementary, not overlapping: a machine's OPC signal flows in through SCS; an ERP system's order download flows in through SIF (or [[HYDRA EIS Module|EIS]] for dedicated SAP connectors — SIF is the generic/DIY path, EIS is the packaged SAP-specific path). See also [[HYDRA SIS Module]] for the adjacent System Integration Services (SSO, escalation, signatures).

## Cross-product parallel: WinLine WebServices

[[WinLine WebServices Security Model]] (Mesonic WinLine ERP, unrelated product, documented 2026-07-13) independently converges on the same defensive posture for an HTTP service-call surface:

- **Gate raw SQL by construction.** WinLine: off by default behind `AllowWhereStatementInWebService`. HYDRA SIF: `Wrapper`/`InterpretedWrapper` service types are structurally incapable of dynamic Where at all; only `InterpretedJavaService2`/`InterpretedBAPIService` get the parameterized `Can*` filter matrix. Different mechanism (config flag vs. type system), same outcome: no raw SQL injection surface by default.
- **Opaque session identity as connection gate.** WinLine: 1h session token. HYDRA: AccessId (client/partner identity, license-checked) + 30-min-idle session cookie (user identity).
- **License/authorize at fine granularity.** WinLine: per-endpoint-template EXIM+MDP license. HYDRA: per-service `Svc:<name>` function authorization + SCS-SIF/SCS-SIC license pair.

Two independently-built DACH-region ERP/MES HTTP APIs landing on the same three safeguards is a useful checklist for evaluating any comparable system: (1) can callers express raw predicates, and is that opt-in? (2) is client/partner identity checked separately from user identity? (3) is authorization scoped per-endpoint or only per-connection?
