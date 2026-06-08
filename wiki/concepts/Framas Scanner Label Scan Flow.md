---
type: concept
address: c-000221
title: "Framas Scanner Label Scan Flow"
created: 2026-06-08
updated: 2026-06-08
tags:
  - concept
  - framas
  - scanner
  - sql-server
  - workflow
status: developing
related:
  - "[[FramasScanner]]"
  - "[[Framas DBO Schema]]"
  - "[[framas-scanner-hc-bag-procs]]"
  - "[[Framas]]"
---

# Framas Scanner Label Scan Flow

The two-phase server pattern behind the [[FramasScanner]] app: every scan is **validated** (CheckLabel) then **committed** (PostSingle). Each scan mode + tenant gets its own proc pair.

## Naming Convention

```
sp_FramasScanner_CheckLabel_Mode_<MODE>    -- validation phase
sp_FramasScanner_PostSingle_Mode_<MODE>    -- commit phase
```

Stored under `raw/framas/app/framas_scanner/tenants/<tenant>/`. Documented mode: `HANGING_HC_BAG` (Heelcounter compound/material lot), tenant `fGE`.

## Phase 1 — CheckLabel (validate)

Input: `@qr`, `@userId`, `@mode`, `@whFrom`, `@whTo`, `@lock`, optional input/nfc values, `@culture`.

1. Format check (mode-specific). HC mode: QR must contain `-` (`Product-LotNO`).
2. Dedup check: reject if QR already active. HC mode checks `FT176.C001 = @qr AND Actived = 1`, returning the prior `CreatedDate`/`CreatedBy`.
3. Resolve data: split QR, look up product name (`CWL..T027`), populate `@inputValueN` and `@displayTextN`.
4. Set `@accept`.
5. If `@accept = 1 AND @lock = 1`: write a **pending** row to `lmpScannerClient_ScanningLabel` and `OUTPUT INSERTED.*`, then `RETURN`.
6. Otherwise return a synthesized result row (no insert).

Output contract (both branches): `Accept`, `Message`, `Reload`, then the full field set (`QRCode`, `Quantity`, `Lock`, `Mode`, WH, `InputDefN`, `DisplayTextN`, `InputValueN`, `NfcDefN`, `NfcValueN`, `Editable`, `DeviceId`, `TraceId`, ...).

## Phase 2 — PostSingle (commit)

Input adds `@scanTime`, `@postTime`, `@scanningId` (the pending row id), `@unitPrice`, `@flag`, `@traceId`.

1. Resolve data (re-split QR → `@productCode`).
2. Write the scan tag to the mode's domain table (HC mode: `FT176`, `C000=C001=@qr`, `C002=@productCode`).
3. Delete the pending `lmpScannerClient_ScanningLabel` row by `@scanningId`.
4. Insert the committed `lmpScannerClient_ScannedLabel` row (`OUTPUT inserted.Id INTO @generated_keys`).
5. Return `Success`, `Message`, and the committed row (joined via `@generated_keys`, guarded by `@@ROWCOUNT > 0`).

## Client Table Pair

| Table | State | Written by |
|-------|-------|-----------|
| `lmpScannerClient_ScanningLabel` | pending / locked | CheckLabel (when `@lock = 1`) |
| `lmpScannerClient_ScannedLabel` | committed | PostSingle |

The pending row is the lock: it holds the scan until PostSingle commits and deletes it.

## Cross-cutting

- **Localization**: `sp_FramasScanner_GetLocalizeText @template, @culture, @out OUTPUT` then `FORMATMESSAGE` for `%s` substitution. Default culture `en`.
- **Display strings**: server returns MAUI `<Label>` XAML in `@displayTextN` — UI rendering pushed to the DB layer.
- **Dedup**: enforced by an `EXISTS` check on `Actived = 1`, not a unique constraint. Concurrent scans of the same QR between CheckLabel and PostSingle are not DB-serialized.

## See Also

- [[Framas DBO Schema]] — `FT175`/`FT176` fGE FGs-injection link tables.
- [[framas-scanner-hc-bag-procs]] — source detail for the HC bag proc pair.
