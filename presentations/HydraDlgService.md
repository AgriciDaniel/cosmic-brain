---
title: "HYDRA SIF DLG Command Service — Implementation Specification"
audience: "C# developer implementing a client wrapper around HYDRA's legacy DLG command interface"
status: draft
created: 2026-07-22
sources:
  - "wiki/sources/hydra-service-interface-sif.md"
  - "wiki/concepts/HYDRA Service Interface (SIF).md"
  - "wiki/concepts/HYDRA SIF DLG Service Catalog.md"
  - "wiki/sources/sop-hydra-multi-mold-machine.md"
  - ".raw/hydra/md/HYDRA_8_Documentation Oct 2020/Products/SCS_81/SCS-SIF_81.md"
---

# HYDRA SIF DLG Command Service — Implementation Spec

This document specifies the DLG commands needed to build a C# service that talks to HYDRA's Service Interface (SIF) using the legacy `DLG=` dialog protocol. It covers transport, auth, wire format, and every DLG command discussed so far, with enough field-level detail to write typed request/response models.

## 1. Transport

- Protocol: HTTP/HTTPS.
- Legacy dialog calls go through `POST /dlg/command`.
- Body is **not JSON** — it's a raw pipe-delimited string: `DLG=<name>|FIELD=value|FIELD=value|...|`
- Response body: `RET={0=ok}|KT={short text}|LT={long text}|` (plus any command-specific return fields).
- `RET=0` means success; any non-zero code is an error. `KT`/`LT` carry short/long human-readable messages (localized via `languageKey`, see §3).

## 2. Auth model

Two stacked identities — both required in practice:

1. **AccessId** — identifies the *client application*, not the human user.
   - 8-digit installation ID (customers) or 6-digit partner ID (MPDV partners).
   - Sent as URL param `X-Access-Id` or HTTP header.
   - Mandatory as of MW 4.0; harmless to always send (ignored on MW 3.x).
2. **Session cookie** — identifies the *human user*.
   - First call: HTTP Basic Auth. Server returns a session cookie.
   - Replay the cookie on every subsequent call.
   - Auto-expires after 30 min idle → HTTP 401 ("Full authentication is required to access this resource").
   - **Reuse one session** — do not open a new session per call; call `/logout` when done. Many parallel sessions degrade server performance.

Per-service/dialog authorization (MW 4.0+): user needs `Svc:DLG_<DialogName>` grant (wildcards `*`/`?` supported, but `Svc:DLG_*` "not recommended").

### C# implementation notes
- Session should be held in a singleton/scoped `HttpClient` wrapper with a `CookieContainer`, not recreated per request.
- Wrap 401 responses with automatic re-authentication (re-run Basic Auth, retry once) rather than surfacing raw 401 to callers.
- AccessId should be a constructor-injected config value, added to every request unconditionally.

## 3. Wire format details

Standard header on every DLG call:
```
DLG={dialog}|USR={N4 user number}|DAT={mm/dd/yyyy}|ZEI={seconds since midnight}|<fields>|
```
- `DAT`/`ZEI` — nearly every dialog needs a timestamp pair. `ZEI` is seconds-since-midnight, not a clock string — convert `DateTime.Now.TimeOfDay.TotalSeconds` server-local-time.
- Fields are `KEY=value`, pipe-separated, backslash-escaped if a value contains `|`.
- Two key patterns for identifying a resource — always alternatives, never send both:
  - Single ID: `RESID` (N10)
  - Composite key: `RESTYP` (C4) + `RES` (C40)
- `KOMMENTAR` (C500) appears on most write dialogs — free-text comment persisted to `event_res` / `event_dlg_data` for audit trail. Always safe to pass, never required.
- Return envelope: `RET={0=ok}|KT={short}|LT={long}|` — model as a shared `DlgResponse` base with `Success => Ret == 0`.

### Suggested C# shape

```csharp
public abstract record DlgRequest
{
    public abstract string DialogName { get; }
    public DateOnly Date { get; init; }
    public int SecondsSinceMidnight { get; init; }
    public string? Comment { get; init; } // KOMMENTAR

    // Each derived record implements this to produce the pipe-delimited body
    public abstract string ToWireFormat();
}

public record DlgResponse(int Ret, string? Kt, string? Lt)
{
    public bool Success => Ret == 0;
}
```

Each dialog below should be its own `record : DlgRequest` plus a matching response type where the dialog returns extra fields beyond `RET/KT/LT`.

### 3.1 HYDRA field type → C# type mapping

Source docs use two type prefixes: `C` = fixed-length character/string, `N` = fixed-length numeric. The trailing number is **max length**, not a precision spec — treat it as a validation bound (`MaxLength` / `StringLength`), not a storage size.

| HYDRA type | Meaning | C# type | Notes |
|---|---|---|---|
| `C1` | 1-char code | `char` or `string` | Used for single-letter flags, e.g. `PROD={F\|B\|U}` |
| `C4` | up to 4 chars | `string` | Type codes (`RESTYP`), reason codes |
| `C8` | up to 8 chars | `string` | `MNR` (machine number) in some dialogs |
| `C10` | up to 10 chars | `string` | `PNR`, `KNR`, `RESVER` |
| `C12` | up to 12 chars | `string` | `ZLO` (storage location) |
| `C20` | up to 20 chars | `string` | `RESVER`, `MNR` in other dialogs |
| `C30` | up to 30 chars | `string` | segment names (`HSODATA.SEGNAM`) |
| `C40` | up to 40 chars | `string` | `RES`, `RES:M`, `RES:T` (resource names), `ANR` in some dialogs |
| `C500` | up to 500 chars | `string` | `KOMMENTAR` — always free text, never validate beyond length |
| `C1000` | up to 1000 chars | `string` | `HSODATA.SDATA` data record |
| `N4` | numeric, ≤4 digits | `int` (or `short`) | Reason codes (`EGG:GUT`, `EGG:AUS`), `MST` |
| `N8` | numeric, ≤8 digits | `int` | Quantities (`EGR:GUT`, `EGR:AUS`) — max 99,999,999 fits comfortably in `int32` |
| `N10` | numeric, ≤10 digits | `long` | `RESID`, `RESSTA` — **use `long`, not `int`**: 10 nines (9,999,999,999) exceeds `int32.MaxValue` (2,147,483,647) even though most real IDs won't hit it |
| `{mm/dd/yyyy}` | date | `DateOnly` | Format on the wire is fixed US-style `mm/dd/yyyy`; convert explicitly, don't rely on culture-default `ToString()` |
| `{seconds}` | seconds since midnight | `int` | Not a `TimeSpan` serialization — compute as `(int)DateTime.Now.TimeOfDay.TotalSeconds` in local server time |

Practical rule: when a field is described as an "alternative key" pair (`RESTYP`+`RES` vs `RESID`), keep both representations as nullable properties on the request record and validate exactly-one-set in `ToWireFormat()`, as shown in the `RES_STATUS` example above.

For fields that are genuinely bounded enums (`PROD`, `TYP`, `ACTION`), prefer a C# `enum` over a raw `string` even though the wire type is `C1`/`C4` — serialize the enum to its wire code in `ToWireFormat()` rather than passing magic strings through calling code.

## 4. Command catalog

### 4.1 `SCMD;53` — Reload terminal lists

Not a resource/order dialog — pushes the HYDRA server to tell a specific terminal to refresh its cached lists immediately instead of waiting for the next cyclic poll.

```
DLG=SCMD;53|TYP=INFO|ACTION=LST_RELOAD|LOAD=…|TNR=…|
```

| Field | Type | Required | Description |
|---|---|---|---|
| `LOAD` | enum list | yes | Comma-separated: `ANR` (operations logged on), `MNR` (assigned machines), `PNR` (staff logged on), `MAT` (input materials), `RES` (machine resources), `PPKT` (CAQ inspection points — needs extra `RECTYP,BER,PANNR,PAUNR,EINTTYP,EINTNR,CAUSE`) |
| `TNR` | int | yes | Terminal number |

Notes for implementation:
- No `RET/KT/LT`-style business response beyond the standard envelope — this is fire-and-forget push, not a query.
- Delivered over the network directly to the terminal (port 9002, or 9005 for PCC) — **not** relevant to the SIF HTTP client itself, but document it so ops knows to open that port.
- Do not call frequently — source docs explicitly warn against polling/frequent reload; treat as an on-demand admin action, not a scheduled job.
- Does **not** initialize MDE data (machine status, counters) — only refreshes terminal display lists. Don't use this to "reset" machine state.

```csharp
public record ReloadTerminalListsRequest(int TerminalNumber, IReadOnlyList<string> Lists) : DlgRequest
{
    public override string DialogName => "SCMD;53";
    public override string ToWireFormat() =>
        $"DLG=SCMD;53|TYP=INFO|ACTION=LST_RELOAD|LOAD={string.Join(",", Lists)}|TNR={TerminalNumber}|";
}
```

### 4.2 `A_TR` — Post part quantity (partial confirmation)

Posts yield/scrap quantities against an in-progress order operation without ending it.

```
DLG=A_TR|USR=…|DAT=…|ZEI=…|ANR=…|MNR=…|KNR=…|EGR:GUT=…|EGR:AUS=…|EGG:AUS=…|
```

| Field | Type | Required | Description |
|---|---|---|---|
| `ANR` | string | yes | MES order number (fully qualified key) |
| `MNR` | C8 | yes | Workplace/machine number |
| `PNR` | C10 | one of PNR/KNR | Personnel number |
| `KNR` | C10 | one of PNR/KNR | Staff badge number |
| `EGR:GUT` | N8 | no | Yield quantity |
| `EGR:AUS` | N8 | no | Scrap quantity |
| `EGG:GUT` | N4 | no | Yield reason code |
| `EGG:AUS` | N4 | **required if `EGR:AUS` set** | Scrap reason code |
| `EGE:GUT` | C4 | no | Unit of yield |
| `EGE:AUS` | C4 | no | Unit of scrap |

Validation rule to enforce in C# before sending: if `EGR:AUS` is non-null/non-zero, `EGG:AUS` must be present — fail fast client-side rather than round-tripping a server error.

```csharp
public record PostPartialQuantityRequest(
    string OrderNumber,
    string MachineNumber,
    string? PersonnelNumber,
    string? BadgeNumber,
    int? YieldQty,
    int? ScrapQty,
    int? YieldReason,
    int? ScrapReason,
    string? YieldUnit,
    string? ScrapUnit
) : DlgRequest
{
    public override string DialogName => "A_TR";

    public override string ToWireFormat()
    {
        if (ScrapQty is not null && ScrapReason is null)
            throw new ArgumentException("ScrapReason (EGG:AUS) is required when ScrapQty (EGR:AUS) is set.");
        // build pipe-delimited string...
        throw new NotImplementedException();
    }
}
```

### 4.3 `RES_STATUS` — Set resource status

The richest resource dialog. Sets a resource's status directly, or via a `PROD` lookup code. Also the confirmed write-trigger for the `res_ress_belegung` occupancy table (any status where `verarb_planung != 'K'` creates a block entry).

```
DLG=RES_STATUS|RESID=…|RESSTA=…|PROD=F|DATB=…|ZEIB=…|DATE=…|ZEIE=…|ZLO=…|KOMMENTAR=…|
```

| Field | Type | Required | Description |
|---|---|---|---|
| `RESID` | N10 | alt-A | Resource ID (unique) |
| `RESTYP` + `RES` | C4 + C40 | alt-B | Composite resource key (type + name) — mutually exclusive with `RESID` |
| `RESSTA` | N10 | no* | Target status. Ignored if `PROD` is set. |
| `PNR` / `KNR` | C10 | one of | Personnel/badge |
| `RESVER` | C20 | no | Version ID |
| `PROD` | C1 (`F`\|`B`\|`U`) | no | Status lookup shortcut: `F`=release status (= `RES_FREI`), `B`=logoff status (= `RES_ABSTA`), `U`=upload status (= after `RES_UPLOAD`). Looked up via `res_status_zuord.prod`; if set, `RESSTA` is ignored. |
| `DATB` / `ZEIB` | date/sec | no | Block window start. Omitted or past → applied immediately. |
| `DATE` / `ZEIE` | date/sec | no | Block window end. Omitted → unlimited validity. `ZEIE` empty/0 auto-becomes `86400`. |
| `ZLO` | C12 | no | Receiving storage location. Empty → default from status config. |

Business rules to encode in C#:
- `RESID` XOR (`RESTYP` + `RES`) — validate mutual exclusivity client-side.
- If `PROD` is set, treat `RESSTA` as ignored — either omit it in the builder or warn if both are set.
- `RES_FREI` and `RES_ABSTA` are legacy convenience dialogs now superseded by `RES_STATUS|PROD=F` / `RES_STATUS|PROD=B` — **implement only `RES_STATUS`** with a `Prod` enum; don't build separate wrapper methods for the deprecated dialogs unless a caller specifically needs the old name.
- If the "bill of material processing" license (WRM-STL/DNC-STL) is active on the server, blocking a resource cascades a collective-block-counter increment up the BOM parent chain — this is server-side behavior, no client action needed, but worth a code comment so nobody "fixes" an apparently-unrelated parent-resource block later.

```csharp
public enum ResourceStatusProd { None, ReleaseStatus, LogoffStatus, UploadStatus } // F / B / U

public record SetResourceStatusRequest(
    string? ResourceId,       // RESID — alt A
    string? ResourceType,     // RESTYP — alt B (paired with ResourceName)
    string? ResourceName,     // RES — alt B
    int? TargetStatus,        // RESSTA — ignored if Prod != None
    ResourceStatusProd Prod,
    DateOnly? BlockStart, int? BlockStartSeconds,
    DateOnly? BlockEnd, int? BlockEndSeconds,
    string? StorageLocation,  // ZLO
    string? PersonnelNumber, string? BadgeNumber, string? VersionId
) : DlgRequest
{
    public override string DialogName => "RES_STATUS";

    public override string ToWireFormat()
    {
        var hasResId = ResourceId is not null;
        var hasComposite = ResourceType is not null && ResourceName is not null;
        if (hasResId == hasComposite)
            throw new ArgumentException("Specify exactly one of ResourceId or (ResourceType + ResourceName).");
        // build pipe-delimited string...
        throw new NotImplementedException();
    }
}
```

### 4.4 `RES_AN` / `RES_AB` — Log resource on / off order

Logs an already-identified resource on/off a specific order. **Does not resolve which resource to use from a pool** — caller must already know the resource ID before invoking this (see gap note in §5).

```
DLG=RES_AN|USR=…|DAT=…|ZEI=…|RESID=…|MNR=…|ANR=…|KNR=…|KOMMENTAR=…|
```

| Field | Type | Required | Description |
|---|---|---|---|
| `RESID` | N10 | alt-A | Resource ID |
| `RESTYP` + `RES` | C4 + C40 | alt-B | Composite resource key |
| `MNR` | C20 | no | Machine number |
| `ANR` | C40 | yes | Order number |
| `PNR` / `KNR` | C10 | one of | Personnel/badge |
| `RESVER` | C20 | no | Version ID |

`RES_AB` has an identical field set — model both from one shared base type, differing only in `DialogName`.

```csharp
public abstract record ResourceOrderLogRequest(
    string? ResourceId, string? ResourceType, string? ResourceName,
    string? MachineNumber, string OrderNumber,
    string? PersonnelNumber, string? BadgeNumber, string? VersionId
) : DlgRequest;

public record LogResourceOnRequest(...) : ResourceOrderLogRequest(...)
{
    public override string DialogName => "RES_AN";
}

public record LogResourceOffRequest(...) : ResourceOrderLogRequest(...)
{
    public override string DialogName => "RES_AB";
}
```

### 4.5 `RES_EIN` / `RES_AUS` — Mount / demount resource (BOM relationship)

Establishes or removes a physical mother/daughter BOM relationship between two resources (e.g. mounting a mold into a machine). Records an event only — **no quantity/time posting**.

```
DLG=RES_EIN|DAT=…|ZEI=…|RESTYP:M=…|RES:M=…|RESTYP:T=…|RES:T=…|PNR=…|KOMMENTAR=…|
```

| Field | Type | Required | Description |
|---|---|---|---|
| `RESTYP:M` | C4 | yes | Mother resource type |
| `RES:M` | C40 | yes | Mother resource name |
| `RESTYP:T` | C4 | yes | Daughter resource type |
| `RES:T` | C40 | yes | Daughter resource name |
| `PNR` / `KNR` | C10 | one of | Personnel/badge |

`RES_AUS` (demount) shares the identical field set — same base-type pattern as §4.4.

```csharp
public abstract record ResourceMountRequest(
    string MotherType, string MotherName,
    string DaughterType, string DaughterName,
    string? PersonnelNumber, string? BadgeNumber
) : DlgRequest;

public record MountResourceRequest(...) : ResourceMountRequest(...)
{
    public override string DialogName => "RES_EIN";
}

public record DemountResourceRequest(...) : ResourceMountRequest(...)
{
    public override string DialogName => "RES_AUS";
}
```

### 4.6 `RES_UMB` — Repost resource (change storage location)

```
DLG=RES_UMB|ZLO=…|KOMMENTAR=…|
```

| Field | Type | Required | Description |
|---|---|---|---|
| `ZLO` | C12 | no | New target storage location. Empty → default from status config. |

```csharp
public record RepostResourceRequest(string? NewStorageLocation) : DlgRequest
{
    public override string DialogName => "RES_UMB";
}
```

## 5. Known gaps — do not silently "fix" these in code

- **No pool-resolution service.** `RES_AN` logs an already-chosen resource; nothing in the source docs provides a "give me a free mold from this pool" service call. If the C# service needs to support multi-mold pools, that resolution logic (reading `res_ress_belegung` for free resources, or a barcode scan) has to be built as new application logic — it is not a HYDRA SIF capability to wrap.
- **No cavity-scoped lock/release dialog.** `RES_STATUS` blocks a whole resource, not an individual cavity slot. Don't assume a "block cavity 3 only" call exists.
- **No literal worked example** combining pool-decision + `RES_AN` end-to-end in any source document — the request/response shapes above are derived from field specs, not a tested transcript. Add integration tests against a real HYDRA test instance before trusting the wire format assembled here in production.
- **HLS-MFB / HLS-AGS / BDE-APF / BDE-SSG** (multi-machine-in-parallel case) — names are unverified against source docs; do not implement dialogs under these names without reading `Products/HLS_82/HLS-MFB_82.pdf` / `HLS-AGS_82.pdf` first.

## 6. Error handling

- Standard envelope `RET/KT/LT` — non-zero `RET` is an error; surface `LT` (long text) to logs, `KT` (short text) to any UI.
- Error bodies also carry a `languageKey` (e.g. `lkServiceMissingFctAuth`, `lkParamMissing`, `lkServiceUnavailable`, `lkRetCodeHydra`) — resolvable via `TranslationService.list` for localized messages. If the consuming app is multi-language, look this up rather than hardcoding English `LT` text.
- HTTP 401 mid-session = expired session cookie (30 min idle) — re-authenticate and retry once; don't treat as a hard failure on first occurrence.
- Locking conflicts (on the legacy `*.LOCK`/`*.UNLOCK` mechanism, not used by any dialog above directly but relevant if extending this catalog) return error `1666` plus the locking user's identity — worth a named exception type (`ResourceLockedException`) if/when lock-family dialogs are added.

## 7. Open items before implementation starts

1. Confirm target MW version (3.x vs 4.0+) — affects whether `AccessId` and per-service `Svc:` authorization are enforced or optional.
2. Decide whether to model `RES_FREI`/`RES_ABSTA` as separate methods for API ergonomics, even though they're implemented as `RES_STATUS|PROD=F`/`PROD=B` under the hood (recommended: yes, as thin convenience wrappers over `SetResourceStatusRequest`).
3. Get access to a live/test HYDRA SIF endpoint to validate wire-format assembly and capture real `RET/KT/LT` responses — everything above is derived from spec text, not observed traffic.
