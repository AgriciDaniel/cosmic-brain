---
type: source
address: c-000219
title: "Framas Scanner — HANGING_HC_BAG Procs (fGE)"
created: 2026-06-08
updated: 2026-06-08
tags:
  - source
  - framas
  - scanner
  - sql-server
  - stored-procedure
status: current
source_path: "raw/framas/app/framas_scanner/tenants/fGE/"
related:
  - "[[FramasScanner]]"
  - "[[Framas Scanner Label Scan Flow]]"
  - "[[Framas DBO Schema]]"
  - "[[Framas]]"
---

# Framas Scanner — HANGING_HC_BAG Procs (fGE)

Two SQL Server stored procedures from the [[FramasScanner]] app, tenant `fGE`, implementing the `HANGING_HC_BAG` scan mode for Heelcounter (HC) compound/material lot labels.

- `raw/framas/app/framas_scanner/tenants/fGE/sp_FramasScanner_CheckLabel_Mode_HANGING_HC_BAG.sql`
- `raw/framas/app/framas_scanner/tenants/fGE/sp_FramasScanner_PostSingle_Mode_HANGING_HC_BAG.sql`
- App context: `raw/framas/app/framas_scanner/framas_scanner.md`

Author: congdat.nguyen@framas.com. Create date: 2026-06-08.

## QR Label Format

HC material lot label: `Product-LotNO`, e.g. `RCM00001-000023`. Split on `-` via `fn_SplitStringToColumns(@qr, '-')` → `C1` = product code, `C2` = lot.

## sp_FramasScanner_CheckLabel_Mode_HANGING_HC_BAG (validation phase)

Validates a label before it is posted. Returns a wide result row (`Accept`, `Message`, `Reload`, plus all display/input/nfc fields).

Validation flow:
1. Reject if QR has no `-` (`This label is invalid. %s`).
2. Reject if QR already exists active in `FT176` (`C001 = @qr`, `Actived = 1`) — message `This label was scan before. At %s by %s` using `CreatedDate`/`CreatedBy`.
3. Split QR → `@productCode`; resolve product name from `CWL..T027` (`C002 = @productCode` → `C003`) into `@inputValue1`.
4. `@accept = 1`.
5. At `COMPLETE`: build `@displayText1` (QR, gold) and `@displayText2` (product name) as MAUI `<Label>` XAML strings.
6. If `@accept = 1` and `@lock = 1`: insert a pending row into `lmpScannerClient_ScanningLabel` with `OUTPUT INSERTED.*`, then `RETURN`. Otherwise fall through to the final `SELECT`.

Localized messages via `sp_FramasScanner_GetLocalizeText` + `FORMATMESSAGE`.

## sp_FramasScanner_PostSingle_Mode_HANGING_HC_BAG (post phase)

Commits a validated scan.

1. Split QR → `@productCode`.
2. Insert the scan tag into `FT176`: `C000 = @qr`, `C001 = @qr`, `C002 = @productCode`, plus audit columns (`CreatedDate/By/Machine`, `ModifiedDate/By/Machine` all from `@postTime`/`@userId`/`@deviceId`), `Actived = 1`, `TransactionId`.
3. Delete the pending `lmpScannerClient_ScanningLabel` row by `@scanningId`.
4. Insert the final record into `lmpScannerClient_ScannedLabel` (`OUTPUT inserted.Id INTO @generated_keys`), including `Quantity2 = @inputQuantity * 1000`, `c020` (PostingType) = NULL, NFC values, `Flag`, `TraceId`, `UnitPrice`.
5. `@success = 1`; return the posted row joined from `@generated_keys` (guarded by `WHERE @@ROWCOUNT > 0`).

## Cleanup applied during ingest

CheckLabel: removed unused locals `@location`, `@compGoodsId`, `@weightTotal`, and write-only `@lot`; filled the empty `Description` header. PostSingle: added missing `@productCode` declaration (was used but never declared → compile error); filled `Description`.

## Notes / Open Questions

- `FT176` is the **fGE FGs-injection-to-HYDRA-machine link** table (see [[Framas DBO Schema]]). Scanner uses it here as the dedup/scan-tag store: `C001` = the scanned QR, uniqueness enforced via the `Actived = 1` existence check, not a DB constraint.
- `lmpScannerClient_ScanningLabel` (pending, lock) vs `lmpScannerClient_ScannedLabel` (committed) — the scanner client's two-stage table pair.
- `CWL..T027` is a cross-database product lookup (`C002` → `C003` product name). DB `CWL` not yet documented in the wiki.
- Tenant folder `fGE` matches the `fGE` note on `FT175`/`FT176` — likely a tenant/plant code.
