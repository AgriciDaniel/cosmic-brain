---
address: c-000264
title: "WinLine WebServices Integration"
tags:
  - concept
  - winline
  - webservices
  - integration
  - framas
created: 2026-06-22
status: current
related:
  - "[[Mesonic WinLine]]"
  - "[[WinLine WebServices API]]"
  - "[[WinLine WebServices Security Model]]"
  - "[[WinLine PPS]]"
  - "[[WinLine FAKT]]"
  - "[[WinLine FIBU]]"
  - "[[Framas]]"
  - "[[Framas HYDRA EIS-DBI Interface]]"
---

# WinLine WebServices Integration

This page covers practical integration guidance for working with the [[WinLine WebServices API]] — relevant for Framas development work involving data exchange between external systems (e.g. HYDRA MES, OMS/T3PO, custom apps) and [[Mesonic WinLine]].

> [!note] Second HYDRA bridge documented for Framas
> [[Framas HYDRA EIS-DBI Interface]] documents an earlier (2019-2021) WinLine↔HYDRA production-order bridge built by [[SOFTAGE]] that writes directly into HYDRA's `HYSAP_*` EIS-DBI staging tables — a different mechanism from the Type 40/42 WebServices pattern below. Unclear which is the current live path, or whether WebServices superseded the EIS-DBI concept. See [[Framas]] entity for the open question.

## Prerequisites Checklist

Before any integration work can begin, confirm:

- [ ] WinLine corporate license (or compact with add-on) is in place
- [ ] WinLine EXIM module is licensed
- [ ] MDP license (Runtime or Developer) is available
- [ ] 64-bit Applikationsserver is licensed and running
- [ ] An MDP Partner is engaged for implementation/maintenance
- [ ] A dedicated WinLine user account is created and marked as **EWL-Benutzer**
- [ ] The EWL-Benutzer has permissions to access the Vorlage(n) to be used
- [ ] Templates are created in WinLine START → Vorlagen → Vorlagen Anlage → Export-/Import-Vorlagen with **"Webservice-Vorlage"** checkbox enabled
- [ ] `AllowWhereStatementInWebService=1` is added to server.config if multi-key or WHERE-based exports are needed — see [[WinLine WebServices Security Model]] before enabling: it lifts a deliberate SQL-injection guardrail

## Authentication Flow

```
1. POST /ewlservice/login?user=<u>&password=<pw>&company=<mandant>
   → returns: Session=845743da-94f7-11e1-ccce-4487fc4877d6-3948-2416

2. Use Session= in all subsequent calls.

3. Optional: GET /ewlservice/test?Session=<id>  (health check)

4. On completion: GET /ewlservice/logout?Session=<id>
```

**Session management rules:**
- Sessions expire 1 hour after the last command (default; configurable via `MaxHTTPSessionKeepAliveTime` in server.config)
- Always reuse a session across a batch of operations to avoid the login/logout performance overhead
- A session can be tested with `/ewlservice/test` before relying on it
- Sessionless calls (passing user/password/company inline) work but are slower

## Configuring Vorlagen (Templates)

Templates define which data fields are included in an Export or Import XML. The template name is passed as the `Vorlage=` parameter.

### Creating a Template

1. In WinLine, navigate to: **START → Vorlagen → Vorlagen Anlage → Export-/Import-Vorlagen**
2. Choose the template type (e.g. Personenkonten, Belege, Produktionsauftrag)
3. Add the fields required for the integration
4. Enable the **"Webservice-Vorlage"** checkbox — this is mandatory
5. Save the template

### Testing a Template

With "Webservice-Vorlage" enabled, additional buttons appear in the template window:

| Button | Action |
|--------|--------|
| Export | Run an export with a test selection; opens result XML in default program; saves to `MESOWebService/` folder |
| Prüfen | Validate an XML file against this template; result shown on screen and saved with timestamp |
| Import | Import an XML file directly using this template |
| Webservice-Schema exportieren (Ribbon) | Generate XSD file describing the XML structure |

**Test export selection syntax:**

| Syntax | Meaning |
|--------|---------|
| `230A001` | Single record by key |
| `'230A001','230B002'` | Multiple records (comma-separated, quoted) |
| `FilterTopKunden` | Apply named filter "TopKunden" |
| `ZaehllisteSchnelldreher` | Use Zählliste "Schnelldreher" (Inventur only) |
| `J100-150` | Buchungsnummern 100–150 (Buchungsstapel/Lagerbuchungen) |
| `P3-4` | Perioden 3–4 |

### Generating the XSD

Use the XSD to understand the expected XML structure and validate your integration code. The XSD is generated per-template and reflects the fields selected in that template.

## Common Export Patterns

### Pattern 1: Master Data Export (Stammdaten)

Relevant types: 1 (Personenkonten), 4 (Artikel), 9 (Kostenstellen), 20 (Mitarbeiter), etc.

```
GET /ewlservice/export?Session=<id>&Type=1&Vorlage=KundenExport&Key=230A001&Format=1
```

For all records matching a filter:
```
GET /ewlservice/export?Session=<id>&Type=1&Vorlage=KundenExport&Key=FilterAlleKunden&Format=1
```

For records matching a SQL condition (requires `AllowWhereStatementInWebService=1`):
```
GET /ewlservice/export?Session=<id>&Type=1&Vorlage=KundenExport&Key=where T055.C004=2&Format=1&byref=1
```

### Pattern 2: FIBU Buchungsstapel Export

```
GET /ewlservice/export?Session=<id>&Type=31&Vorlage=StapelExport&Key=P1-3&Format=1
```

Export Periode 1–3 without automatic bookings:
```
Key=J1-999P1-3A
```

### Pattern 3: Production Order Export (for HYDRA bridging)

Export a specific production order with all components:
```
GET /ewlservice/export?Session=<id>&Type=40&Vorlage=ProdAuftrag&Key=+++T324C002=25343&Format=1&byref=1&Data=order25343.xml
```

Export only SOLL-Zeiten for an order:
```
GET /ewlservice/export?Session=<id>&Type=42&Vorlage=Sollzeiten&Key=+++T160C00725505+T160c00327032020+Flag0&Format=1&byref=1
```

### Pattern 4: Belege Export

Export voucher by account + serial number:
```
GET /ewlservice/export?Session=<id>&Type=30&Vorlage=BelegExport&Key='230A001-247'&Format=1
```

### Pattern 5: Warehouse Bookings Export

Export by period range:
```
GET /ewlservice/export?Session=<id>&Type=38&Vorlage=LagerExport&Key=P1-3&Format=1&byref=1
```

## Common Import Patterns

### Pattern 1: Stammdaten Import (new or update)

```
POST /ewlservice/import?Session=<id>&Type=1&Vorlage=KundenImport&ActionCode=1&Data=kunden.xml&byref=1&Format=1
```

For validation only (dry run):
```
ActionCode=0
```

**XML structure:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<MESOWebService TemplateType="1" Template="KundenImport">
  <KundenImport>
    <Kontonummer>230A001</Kontonummer>
    <!-- additional fields per template definition -->
  </KundenImport>
</MESOWebService>
```

### Pattern 2: Belegimport (new voucher)

```
POST /ewlservice/import?Session=<id>&Type=30&Vorlage=BelegImport&ActionCode=1&Data=beleg.xml&byref=1&Format=1
```

**XML with options:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<MESOWebService TemplateType="30" Template="BelegImport" option="0" printVoucher="4">
  <BelegImport>
    <Kontonummer>230A001</Kontonummer>
    <!-- article lines etc. per template -->
  </BelegImport>
</MESOWebService>
```

Setting `option="1"` converts Auftrag → Lieferschein. Setting `option="2"` converts Lieferschein → Rechnung. Use `printVoucher="4"` to print as Rechnung immediately.

### Pattern 3: FIBU Buchungsstapel Import + Post

Step 1 — import the stack:
```
POST /ewlservice/import?Session=<id>&Type=31&Vorlage=Buchungen&ActionCode=1&ImportID=20260622-001&Data=buchungen.xml&byref=1
```

Step 2 — post it (can also skip step 1 and use ActionCode=2 to import+post in one call):
```
GET /ewlservice/POSTING?Session=<id>&ImportID=20260622-001&RemoveStack=1
```

> [!warning] The `ImportID` is critical for Buchungsstapel. Always use a unique, deterministic ID (e.g. timestamp-based) to prevent double-posting if the call is retried. It also doubles as the provenance record POSTING checks — see [[WinLine WebServices Security Model]]: POSTING can only post a batch that was itself imported via this same Type 31 channel.

### Pattern 4: Production Order Import

Create a new production order:
```
POST /ewlservice/import?Session=<id>&Type=40&Vorlage=Prodauftraganlage&ActionCode=2&Data=order.xml&byref=1&Format=1
```

**Required XML:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<MESOWebService TemplateType="40" Template="Prodauftraganlage">
  <Prodauftraganlage>
    <JournalKey>001</JournalKey>
    <Produktionsauftragsnummer>25448</Produktionsauftragsnummer>
    <Ebene>0</Ebene>
    <ArtikelNummer>19005</ArtikelNummer>
    <MengeAuftrag>11.00</MengeAuftrag>
    <Produktionsdatum>2017-08-13</Produktionsdatum>
  </Prodauftraganlage>
</MESOWebService>
```

Record a Schnellendmeldung (quick completion report):
```
ActionCode=9
```

**Required fields for Schnellendmeldung:** JournalKey, Produktionsauftragsnummer, Ebene, ArtikelNummer, Materialmenge, MengeAuftrag, Produktionsdatum, MengeVomLager, MengeZuProduzieren, MengeAusschuss.

### Pattern 5: IST-Zeiten Import (PPS time booking)

```
POST /ewlservice/import?Session=<id>&Type=42&Vorlage=istzeitenimport&ActionCode=0&Data=zeiten.xml&byref=1&Format=1
```

To delete the same IST-Zeit: use `ActionCode=1` with the same XML file.

### Pattern 6: Inventur Import

```
POST /ewlservice/import?Session=<id>&Type=41&Vorlage=Inventur&ActionCode=1&Data=inventur.xml&byref=1
```

With Zählliste:
```xml
<MESOWebService TemplateType="41" Template="Inventur" ZListe="Schnelldreher" option="1">
```

## Error Handling

The Import endpoint returns XML with status:
```xml
<MESOWebServiceResult>
  <OverallSuccess>true|false</OverallSuccess>
  <ResultDetails>
    <KeyValue>BELEGKEY: 1</KeyValue>
    <VoucherNumber>517</VoucherNumber>
    <Success>true|false</Success>
  </ResultDetails>
</MESOWebServiceResult>
```

Always check `<OverallSuccess>` and each `<ResultDetails>/<Success>` node. A failed import returns `OverallSuccess=false` with error information in the result details.

**Validation before commit:** Use `ActionCode=0` (check only) to test XML validity without writing data. The same validation that would run on import executes, but the transaction is rolled back before writing.

## Data Format Rules

| Data type | Format |
|-----------|--------|
| Date | `YYYY-MM-DD` |
| DateTime | `YYYY-MM-DDThh:mm:ss` |
| Boolean/Checkbox | `true`, `false`, `0`, or `1` |
| Note fields | Plain text (RTF stripped on export) |
| Encoding | UTF-8 (set `Format=1`) |
| Empty dates | Cannot be sent as empty; use `31.12.2999` to explicitly clear a date field (e.g. Kontakte Inaktiv flag) |

## Automatic Number Assignment

When creating new master data records, you can request automatic number assignment instead of specifying a key:

| Key value | Behavior |
|-----------|----------|
| `+` | Use standard number range or FIBU parameter |
| `Nummernkreis+` | Increment from end of named number range |
| `Startnummer+` | Find next free number from starting number |
| `78000+` (FORM) | Find next free FORM-Schlüsselobjekt value from 78000 |

## byref vs Inline Data Transfer

| Mode | Use case |
|------|----------|
| `byref=1` + `Data=filename.xml` | File already on WinLine server filesystem; path is relative to CWL server directory |
| `byref=0` + `Data=<xml>` | Inline XML in the request URL (must be ASCII < 127 encoded) |
| `byref=1` + no `Data` | Export: temp file created on server; browser receives link. Import: not valid — file path required |

For large XML payloads, always use `byref=1` with a server-side file. Inline XML is only practical for small test payloads.

## Framas-Specific Considerations

Framas uses WinLine across multiple tenants (fGE Pirmasens, fVN Vietnam, fFT Vietnam FT, fIN Indonesia). When integrating:

- Specify `company=<MESOCOMP>` for the correct tenant (e.g. `01FG` for fGE, `VNT1` for fVN)
- Use `CompanyYear=` if working with a non-current fiscal year
- The [[Framas WL Schema]] maps the WinLine table structure (T-prefixed tables) to the `wl` schema in DOGE_WH
- The WebService bypasses the SQL synonyms — it always works via WinLine's own application layer

Key integration scenarios at Framas:
- **Production bridging:** Export/import Produktionsaufträge (Type 40) and PPS Zeiten (Type 42) between WinLine PPS and HYDRA MES
- **Warehouse movements:** Export/import Lagerbuchungen (Type 38) between WinLine FAKT and the OMS
- **Document generation:** Import Belege (Type 30) from external order systems, trigger print via `printVoucher`
- **Time recording:** Import IST-Zeiten (Type 42) from shop-floor systems into WinLine PPS

## Voucher Download

To retrieve a PDF copy of a printed voucher:
```
GET /ewlservice/POSTING?Session=<id>&Account=230A001&SerialNo=247
```

Or by Belegnummer (may return multiple PDFs if voucher traversed multiple stages):
```
GET /ewlservice/POSTING?Session=<id>&Account=230A001&VoucherNo=FD17-4367
```

PDFs are saved to `MESOWebserviceVoucherinfo/` on the WinLine server.

## See Also

- [[WinLine WebServices API]] — complete endpoint and parameter reference
- [[WinLine WebServices Security Model]] — the SQL-injection and batch-origin guardrails and why they matter here
- [[Mesonic WinLine]] — the ERP system
- [[WinLine PPS]] — production planning module (Type 40, 42)
- [[WinLine FAKT]] — invoicing and warehouse module (Type 30, 38, 39)
- [[WinLine FIBU]] — financial accounting module (Type 31)
- [[MPDV HYDRA]] — MES system that may need production data bridged via WebServices
- [[Framas]] — company context for integration work
