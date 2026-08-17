# WinLine WebServices — Create Article (Artikel, Type 4)

Article = "Artikel", Export/Import Type Code **4**.

## Prerequisites

- EWL-Benutzer account exists, licensed
- Vorlage (template) for Type 4 Artikel created in WinLine: **START → Vorlagen → Vorlagen Anlage → Export-/Import-Vorlagen**
- "Webservice-Vorlage" checkbox enabled on that template
- (Optional) Generate XSD via ribbon button "Webservice-Schema exportieren" to see exact field structure

## Steps (curl)

Sessionless — `user`/`password`/`company` go directly as query params on `/import`. No login/logout call. Single POST, `byref=0`, XML goes in the multipart body field `data`.

### Create article (single call)

```bash
curl -X POST "http://<WinLineServer>/ewlservice/import?language=1&user=<EWLUser>&password=<EWLPassword>&company=<mesocomp>&companyyear=2026&type=4&format=1&byref=0&actioncode=1&vorlage=ArtikelImport" \
  -F 'data=<?xml version="1.0" encoding="UTF-8"?>
<MESOWebService>
  <ArtikelImport>
    <Artikelnummer>+</Artikelnummer>
    <!-- fields per your Vorlage def -->
  </ArtikelImport>
</MESOWebService>'
```

### Dry-run check (validate only, no write)

Swap `actioncode=1` → `actioncode=0`:

```bash
curl -X POST "http://<WinLineServer>/ewlservice/import?language=1&user=<EWLUser>&password=<EWLPassword>&company=<mesocomp>&companyyear=2026&type=4&format=1&byref=0&actioncode=0&vorlage=ArtikelImport" \
  -F 'data=<?xml version="1.0" encoding="UTF-8"?>
<MESOWebService>
  <ArtikelImport>
    <Artikelnummer>+</Artikelnummer>
  </ArtikelImport>
</MESOWebService>'
```

`Artikelnummer` = `+` for auto-number (or `Nummernkreis+` / `Startnummer+` for custom range). Root element wraps repeatable `<ArtikelImport>` blocks (multiple records same call — see multi-record example below).

### Multi-record example (pattern from Bruno `AndroidScan` Type 38 template)

```bash
curl -X POST "http://<WinLineServer>/ewlservice/import?language=1&user=<EWLUser>&password=<EWLPassword>&company=<mesocomp>&companyyear=2026&type=4&format=1&byref=0&actioncode=1&vorlage=ArtikelImport" \
  -F 'data=<MESOWebService>
  <ArtikelImport>
    <Artikelnummer>+</Artikelnummer>
  </ArtikelImport>
  <ArtikelImport>
    <Artikelnummer>+</Artikelnummer>
  </ArtikelImport>
</MESOWebService>'
```

## Result XML

```xml
<MESOWebServiceResult>
  <OverallSuccess>true</OverallSuccess>
  <ResultDetails>
    <KeyValue>BELEGKEY: 1</KeyValue>
    <VoucherNumber>517</VoucherNumber>
    <Success>true</Success>
  </ResultDetails>
</MESOWebServiceResult>
```

Check `<OverallSuccess>` + each `<ResultDetails>/<Success>`.

## Notes

- Sessionless calls (`user`/`password`/`company` inline) skip login/logout but incur an internal login/logout penalty per call — fine for occasional calls, reuse a `Session=` param instead for batch/high-frequency work.
- `byref=0` + multipart form field `data` = XML in request body directly, no ASCII-only limit like the old query-string inline method.
- Field list depends on your specific Vorlage — pull exact XML shape via ribbon button "Webservice-Schema exportieren" (XSD export).

Sources: [[WinLine WebServices API]], [[WinLine WebServices Integration]]
