|     |     |     |     | Upload of inspection results  |
| --- | --- | --- | --- | ----------------------------- |

1  Upload of inspection results
Upload for Single Results
| Message Type::  |     | ZHYQMIDI_ORIGINAL_VALUES         |     |     |
| --------------- | --- | -------------------------------- | --- | --- |
| IDoc Type::     |     | ZHYQMIDI_ORIGINAL_VALUES01       |     |     |
| Segment::       |     | Z2QAISE000X000 (single results)  |     |     |

| Field name:  |     | T  L  | D  Description  | Use in HYDRA  |
| ------------ | --- | ----- | --------------- | ------------- |
SATZART  CHAR  3    Record type  “Q51”  Quantitative single result
“Q52”  Code as single result
“Q53”  Valuation OK/not OK as
  single result
“Q54”  Quantitative single result
  for inspection point
“Q55”  Code as single result for
  inspection point
“Q56”  Valuation as single
  result for inspection
  point
RUECKMELNR  NUMC 8    Confirmation no. of the charact.   Confirmation number in
accordance with specification
PROBENR  NUMC 6    Number of the partial sample     Number of partial sample
(without inspection points)
  Number of inspection point
STUECKNR  NUMC 4    Consecutive number for test units     Number of sample (without
inspection points)
  Number of inspection point
KZSERNR  CHAR  1    Ind.: serial number filled   “X”  If recording of serial
  numbers is required
“ “  If recording of serial
  numbers is not required
SERIALNR  CHAR  18    Serial no. of the test unit   Contains serial number if recording
of serial number is required
| KZLWERT   |     | CHAR  1    | Ind.: last single value   | Not used  |
| --------- | --- | ---------- | ------------------------- | --------- |
| KZLPROBE  |     | CHAR  1    | Ind.: last sample         | Not used  |
KZABSCHL  CHAR  1    Ind.: close characteristic (sample)   Not used
| KZBEWEEXT  |     | CHAR  1    | Ind.: transfer valuation   | Not used  |
| ---------- | --- | ---------- | -------------------------- | --------- |
ATTRIBUT  CHAR  1    Attribute of the individual result   “/”  Single value was set
  invalid
“ “  Valid value
| MESSWERT  |     | CHAR  16    | Measured value   | Measured value   |
| --------- | --- | ----------- | ---------------- | ---------------- |
| GRUPPE1   |     | CHAR  8     | Code group 1     | Code group 1     |
| CODE1     |     | CHAR  4     | Code 1           | Code 1           |
| GRUPPE2   |     | CHAR  8     | Code group 2     | Code group 2     |
| CODE2     |     | CHAR  4     | Code 2           | Code 2           |
| GRUPPE3   |     | CHAR  8     | Code group 3     | Code group 3     |
| CODE3     |     | CHAR  4     | Code 3           | Code 3           |
| GRUPPE4   |     | CHAR  8     | Code group 4     | Code group 4     |
| CODE4     |     | CHAR  4     | Code 4           | Code 4           |

MBL_SAP_Implementation_QM_Up.docx  Version: 1.0.1362  Page 1 of 8

|     |     |     |     | Upload of inspection results  |
| --- | --- | --- | --- | ----------------------------- |

| Field name:  |     | T  L       | D  Description  | Use in HYDRA          |
| ------------ | --- | ---------- | --------------- | --------------------- |
| GRUPPE5      |     | CHAR  8    | Code group 5    | Code group 5          |
| CODE5        |     | CHAR  4    | Code 5          | Code 5                |
| BEWERTUNG    |     | CHAR  1    | Valuation       | “A”  Acceptance (OK)  |
“R”  Rejection (not OK)
FEHLKLAS  CHAR  2    Defect class   Defect class if available
| ANZFEHLER  |     | NUMC 2    | Number of defects   | Number of defects  |
| ---------- | --- | --------- | ------------------- | ------------------ |
PRUEFDATUV  DATE  8    Start date of the inspection   Start date of the inspection
PRUEFZEITV  TIME  6    Start time of the inspection   Start time of the inspection
PRUEFER  CHAR  12    Name of the inspector   If result was recorded at HYDRA
console, it contains the user;
otherwise it contains the personal
card number.
QERGDATH  CHAR  2    Origin of results data (on completion)   According to customizing
| MASCHINE  |     | CHAR  18    | Machine                   | Machine / work centre  |
| --------- | --- | ----------- | ------------------------- | ---------------------- |
| POSITION  |     | NUMC 4      | Position on the machine   | Position               |
PRUEFBEMKT  CHAR  40    Short text for inspection description   Short text for inspection
description
| MBEWERTGPR  |     | CHAR  1    | Valuation of the sample   | Not used  |
| ----------- | --- | ---------- | ------------------------- | --------- |
FEHLKLASPR  CHAR  2    Defect class for sample valuation   Not used
MBEWERTGMK  CHAR  1    Valuation of the characteristic   Not used
FEHLKLASMK  CHAR  2    Defect class for characteristic valuation  Not used

Upload for Sample Results
| Message type:  |     | ZHYQMIDI_SAMPLE_VALUES           |     |     |
| -------------- | --- | -------------------------------- | --- | --- |
| IDoc type:     |     | ZHYQMIDI_SAMPLE_VALUES01         |     |     |
| Segment::      |     | Z2QAISR000X000 (sample results)  |     |     |

| Field name:  |     | T  L  | D  Description  | Use in HYDRA  |
| ------------ | --- | ----- | --------------- | ------------- |
SATZART  CHAR  3    Record type   “Q61”  Quantitative sample
  result
“Q62”  Code as sample result
“Q63”  Valuation OK/not OK for
  sample
“Q64”  Quantitative result for
  inspection point
“Q65”  Code for inspection
  point
“Q66”  Valuation OK/not OK for
  inspection point
“Q69”  Close sample record
RUECKMELNR  NUMC 8    Confirmation no. of the charact.   Confirmation number in
accordance with specification
PROBENR  NUMC 6    Ind.: close characteristic     Number of partial sample
(without inspection points)
  Number of inspection point
| KZLRPOBE  |     | CHAR  1    | Ind.: transfer valuation   | Not used  |
| --------- | --- | ---------- | -------------------------- | --------- |
KZABSCHL  CHAR  1    Attribute of the results record   Not used

MBL_SAP_Implementation_QM_Up.docx  Version: 1.0.1362  Page 2 of 8

|     |     |     |     | Upload of inspection results  |
| --- | --- | --- | --- | ----------------------------- |

| Field name:  |     | T  L  | D  Description  | Use in HYDRA  |
| ------------ | --- | ----- | --------------- | ------------- |
KZBEWEEXT  CHAR  1    Valuation of characteristic for usage Not used
decision
ATTRIBUT  CHAR  1    Defect class   “/”  Single value was set
  invalid
“ “  Valid value
| GRUPPE1  |     | CHAR  8    | Code group 1   | Code group 1   |
| -------- | --- | ---------- | -------------- | -------------- |
| CODE1    |     | CHAR  4    | Code 1         | Code 1         |
| GRUPPE2  |     | CHAR  8    | Code group 2   | Code group 2   |
| CODE2    |     | CHAR  4    | Code 2         | Code 2         |
| GRUPPE3  |     | CHAR  8    | Code group 3   | Code group 3   |
| CODE3    |     | CHAR  4    | Code 3         | Code 3         |
| GRUPPE4  |     | CHAR  8    | Code group 4   | Code group 4   |
| CODE4    |     | CHAR  4    | Code 4         | Code 4         |
| GRUPPE5  |     | CHAR  8    | Code group 5   | Code group 5   |
| CODE5    |     | CHAR  4    | Code 5         | Code 5         |
ANZWERTG  NUMC 4    Number of valid values   Number  of  valid  values  if
QAIMV.BEWARTSP = “A” or “B”
ANZFEHLEH  NUMC 4    Number of non-conforming units   Number of non-conforming units if
QAIMV.BEWARTSP = “A”
ANZFEHLER  NUMC 4    Number of defects   Number of defects if
QAIMV.BEWARTSP = “B”
ANZWERTO  NUMC 4    Values above upper tolerance limit   Values above upper tolerance limit
ANZWERTU  NUMC 4    Values below lower tolerance limit   Values below lower tolerance limit
MITTELWERT  CHAR  16    Average of valid measured values   Average of valid measured values
if QAIMV.BEWARTSP = “C”
VARIANZ  CHAR  16    Variance of valid measured values   Average of valid measured values
if QAIMV.BEWARTSP = “C”
MAXWERT  CHAR  16    Max. of valid measured values   Max. of valid measured values
MEDIANWERT  CHAR  16    Median of valid measured values   Median of valid measured values
MINWERT  CHAR  16    Min. of valid measured values   Min. of valid measured values
PRUEFDATUV  DATE  8    Start date of the inspection   Start date of the inspection
PRUEFDATUB  DATE  8    Finish date of the inspection   Finish date of the inspection
PRUEFZEITV  TIME  6    Start time of the inspection   Start time of the inspection
PRUEFZEITB  TIME  6    Finish time of the inspection   Finish time of the inspection
PRUEFER  CHAR  12    Name of the inspector   If result was recorded at HYDRA
console, it contains the user;
otherwise it contains the personal
card number.
QERGDATH  CHAR  2    Origin of results data   According to customizing
| MASCHINE  |     | CHAR  18    | Machine                   | Machine / work centre  |
| --------- | --- | ----------- | ------------------------- | ---------------------- |
| POSITION  |     | NUMC 4      | Position on the machine   | Position               |
PRUEFBEMKT  CHAR  40    Short text for inspection descript.   Short text for inspection
description
| MBEWERTGPR  |     | CHAR  1    |     | Not used  |
| ----------- | --- | ---------- | --- | --------- |
| FEHLKLASPR  |     | CHAR  2    |     | Not used  |
| MBEWERTGMK  |     | CHAR  1    |     | Not used  |
| FEHLKLASMK  |     | CHAR  2    |     | Not used  |

MBL_SAP_Implementation_QM_Up.docx  Version: 1.0.1362  Page 3 of 8

|     |     |     |     | Upload of inspection results  |
| --- | --- | --- | --- | ----------------------------- |

Upload for Characteristic Results
| Message type:  |     | ZHYQMIDI_FEATURE_VALUES                  |     |     |
| -------------- | --- | ---------------------------------------- | --- | --- |
| IDoc type:     |     | ZHYQMIDI_FEATURE_VALUES01                |     |     |
| Segment:       |     | Z2QAIMR000X000 (characteristic results)  |     |     |

| Field name:  |     | T  L       | D  Description  | Use in HYDRA         |
| ------------ | --- | ---------- | --------------- | -------------------- |
| SATZART      |     | CHAR  3    | Record type     | “Q71”  Quantitative  |
  characteristic result
“Q72”  Code as characteristic
  result
“Q73”  Valuation OK/not OK for
  characteristic
“Q79”  Close characteristic
RUECKMELNR  NUMC 8    Confirmation no. of the charact.   Confirmation number in
accordance with specification
KZABSCHL  CHAR  1    Ind.: close characteristic   “X”  If record type “Q79”
“ “  All other record types
KZBEWEEXT  CHAR  1    Ind.: transfer valuation   Ind.: transfer valuation in
accordance to specification
ATTRIBUT  CHAR  1    Attribute of the results record   “/”  Single value was set
  invalid
“ “  Valid value
MBEWERTG  CHAR  1    Valuation of characteristic for usage “A”  Acceptance (OK)
|     |     |     | decision   | “R”  Rejection (not OK)  |
| --- | --- | --- | ---------- | ------------------------ |
FEHLKLAS  CHAR  2    Defect class   Defect class if available
| GRUPPE1  |     | CHAR  8    | Code group 1   | Code group 1   |
| -------- | --- | ---------- | -------------- | -------------- |
| CODE1    |     | CHAR  4    | Code 1         | Code 1         |
| GRUPPE2  |     | CHAR  8    | Code group 2   | Code group 2   |
| CODE2    |     | CHAR  4    | Code 2         | Code 2         |
| GRUPPE3  |     | CHAR  8    | Code group 3   | Code group 3   |
| CODE3    |     | CHAR  4    | Code 3         | Code 3         |
| GRUPPE4  |     | CHAR  8    | Code group 4   | Code group 4   |
| CODE4    |     | CHAR  4    | Code 4         | Code 4         |
| GRUPPE5  |     | CHAR  8    | Code group 5   | Code group 5   |
| CODE5    |     | CHAR  4    | Code 5         | Code 5         |
ANZWERTG  NUMC 7    Number of valid values   Number  of  valid  values  if
QAIMV.BEWARTSP = “A” or “B”
ANZFEHLEH  NUMC 7    Number of non-conforming units   Number of non-conforming units if
QAIMV.BEWARTSP = “A”
ANZFEHLER  NUMC 7    Number of defects   Number of defects if
QAIMV.BEWARTSP = “B”
ANZWERTO  NUMC 7    Values above upper tolerance limit   Values above upper tolerance limit
ANZWERTU  NUMC 7    Values below lower tolerance limit   Values below lower tolerance limit
MITTELWERT  CHAR  16    Average of valid measured values   Average of valid measured values
if QAIMV.BEWARTSP = “C”
VARIANZ  CHAR  16    Variance of valid measured values   Average of valid measured values
if QAIMV.BEWARTSP = “C”
MAXWERT  CHAR  16    Max. of valid measured values   Max. of valid measured values
MEDIANWERT  CHAR  16    Median of valid measured values   Median of valid measured values

MBL_SAP_Implementation_QM_Up.docx  Version: 1.0.1362  Page 4 of 8

|     |     |     |     |     | Upload of inspection results  |
| --- | --- | --- | --- | --- | ----------------------------- |

| Field name:  |     | T  L  | D   | Description  | Use in HYDRA  |
| ------------ | --- | ----- | --- | ------------ | ------------- |
MINWERT  CHAR  16    Min. of valid measured values   Min. of valid measured values
IVARIANZ  CHAR  16    Inner variance of measured values   Inner variance of measured values
PRUEFDATUV  DATE  8    Start date of the inspection   Start date of the inspection
PRUEFDATUB  DATE  8    Finish date of the inspection   Finish date of the inspection
PRUEFZEITV  TIME  6    Start time of the inspection   Start time of the inspection
PRUEFZEITB  TIME  6    Finish time of the inspection   Finish time of the inspection
PRUEFER  CHAR  12    Name of the inspector   If result was recorded at HYDRA
console, it contains the user;
otherwise it contains the personal
card number.
QERGDATH  CHAR  2    Origin of results data   According to customizing
| MASCHINE  |     | CHAR  18    | Machine                   |     | Machine / work centre  |
| --------- | --- | ----------- | ------------------------- | --- | ---------------------- |
| POSITION  |     | NUMC 4      | Position on the machine   |     | Position               |
PRUEFBEMKT  CHAR  40    Short text for inspection description  Short text for inspection
description

Upload for Inspection Points
| Message type:  |     | ZHYQMIDI_INSP_POINTS                |     |     |     |
| -------------- | --- | ----------------------------------- | --- | --- | --- |
| IDoc type::    |     | ZHYQMIDI_INSP_POINTS01              |     |     |     |
| Segment:       |     | Z2QAIPP000X000 (inspection points)  |     |     |     |

| Field name:  |     | T  L  | D   | Description  | Use in HYDRA  |
| ------------ | --- | ----- | --- | ------------ | ------------- |
“Q83”  Creation / update of an
| SATZART  |     | CHAR  3    | Record type  |     |     |
| -------- | --- | ---------- | ------------ | --- | --- |
  inspection point
“Q84”  Valuation for inspection
  point
| PRUEFLOS  |     | NUMC 12    | Inspection batch number   |     |     |
| --------- | --- | ---------- | ------------------------- | --- | --- |
Inspection batch number in
accordance to specification
PLNFL  CHAR  6    Operation sequence in task list   Operation sequence in task list in
accordance to specification
VORNR  CHAR  4    Operation number   Operation number in accordance
to specification
PROBENR  NUMC 6    Sample number   Consecutive number for the
inspection point
| TEILLOS  |     | NUMC 6    | Partial batch number   |     | Recorded value if  |
| -------- | --- | --------- | ---------------------- | --- | ------------------ |
QAIVC.TEILLOSPFL = „X“
MENGE  CHAR  17    Inspection point quantity   Recorded quantity if
QAIVC.QUANTITIES = „X“
EINHPR  CHAR  3    Unit of measure for inspection point   Unit of measure for inspection
point
EQUNR  CHAR  18    Equipment number Cannot be defined Not used
|     |     |     | freely  | (value  range  determined  | by  |
| --- | --- | --- | ------- | -------------------------- | --- |
inspection batch); inspection points of
|     |     |     | type  1  | through  3  already      | defined  |
| --- | --- | --- | -------- | ------------------------ | -------- |
|     |     |     | (these   | inspection  points  can  | be       |
retrieved with function module
TPLNR  CHAR  30    Number  of  functional  location  (see Not used
EQUNR)

MBL_SAP_Implementation_QM_Up.docx  Version: 1.0.1362  Page 5 of 8

|     |     |     |     | Upload of inspection results  |     |     |
| --- | --- | --- | --- | ----------------------------- | --- | --- |

| Field name:  |     | T  L  | D  Description  | Use in HYDRA  |     |     |
| ------------ | --- | ----- | --------------- | ------------- | --- | --- |
PHYNR  CHAR  12    Number  of  physical  sample  (see Not used
EQUNR)
USERC1  CHAR  18    User field for 18 characters   Recorded value if
QAIVC.KZUSERC1 = „X“ or “1” to
“6”
USERC2  CHAR  10    User field for 10 characters   Recorded value if
QAIVC.KZUSERC2 = „X“ or “1” to
“6”
USERN1  NUMC 10    User field for 10 digits   Recorded value if
QAIVC.KZUSERN1 = „X“ or “1” to
“6”
USERN2  NUMC 3    User field for 3 digits   Recorded value if
QAIVC.KZUSERN2 = „X“ or “1” to
“6”
| USERD1  |     | DATE  8    | User field for date   | Recorded value if  |     |     |
| ------- | --- | ---------- | --------------------- | ------------------ | --- | --- |
QAIVC.KZUSERD1 = „X“ or “1” to
“6”
| USERT1  |     | TIME  6    | User field for time   | Recorded value if  |     |     |
| ------- | --- | ---------- | --------------------- | ------------------ | --- | --- |
QAIVC.KZUSERT1 = „X“ or “1” to
“6”
| VKATART  |     | CHAR  1    | Catalog type   | “Q83”  Not used  |     |     |
| -------- | --- | ---------- | -------------- | ---------------- | --- | --- |
“Q84”  Catalog type
| VWERKS  |     | CHAR  4    | Plant   | “Q83”  Not used  |     |     |
| ------- | --- | ---------- | ------- | ---------------- | --- | --- |
“Q84”  Plant
VAUSWAHLMG  CHAR  8    Selected set of the usage decision for “Q83”  Not used
|     |     |     | the inspection point   | “Q84”  Selected  | set       | of  the   |
| --- | --- | --- | ---------------------- | ---------------- | --------- | --------- |
|     |     |     |                        |   usage          | decision  | for  the  |
  inspection point
VCODEGRP  CHAR  8    Code group of the usage decision   “Q83”  Not used
“Q84”  Code group of the usage
  decision
VCODE  CHAR  4    Code of the usage decision   “Q83”  Not used
|     |     |     |     | “Q84”  Code  | of  the  | usage  |
| --- | --- | --- | --- | ------------ | -------- | ------ |
  decision
VTEXT  CHAR  40    Short text for partial batch   “Q83”  Not used
“Q84”  Recorded value
MATNR  CHAR  18    Material number   Material number in accordance to
specification
| CHARG  |     | CHAR  10    | Batch number   | Recorded value if  |     |     |
| ------ | --- | ----------- | -------------- | ------------------ | --- | --- |
QAIVC.CHARGPFL = “X”
PRUEFDATUM  DATE  8    Start date of the inspection   Start date of the inspection
PRUEFZEIT  TIME  6    Start time of the inspection   Start time of the inspection
PRUEFER  CHAR  12    Name of the inspector   If result was recorded at HYDRA
console, it contains the user;
otherwise it contains the personal
card number.
KZRMART  CHAR  1    Confirmation type, currently not used   Not used
URSACHEAS  CHAR  4    Reason for scrap, currently not used   Not used
| MENGEAS  |     | CHAR  17    | Scrap quantity   | “Q83”  Not used  |     |     |
| -------- | --- | ----------- | ---------------- | ---------------- | --- | --- |
“Q84”  Recorded value
| MENGENA  |     | CHAR  17    | Rework quantity   | “Q83”  Not used  |     |     |
| -------- | --- | ----------- | ----------------- | ---------------- | --- | --- |
“Q84”  Recorded value

MBL_SAP_Implementation_QM_Up.docx  Version: 1.0.1362  Page 6 of 8

|     |     |     |     | Upload of inspection results  |
| --- | --- | --- | --- | ----------------------------- |

Upload for Usage Decision
| Message type:  |     | ZHYQMIDI_USAGE_DECISION          |     |     |
| -------------- | --- | -------------------------------- | --- | --- |
| IDoc type:     |     | ZHYQMIDI_USAGE_DECISION01        |     |     |
| Segment:       |     | Z2QAIVE000X000 (usage decision)  |     |     |

| Field name:  |     | T  L       | D  Description  | Use in HYDRA              |
| ------------ | --- | ---------- | --------------- | ------------------------- |
| SATZART      |     | CHAR  3    | Record type     | “Q88”  Transfer of usage  |
  decision
“Q89”  Cancellation of
  inspection, usage
  decision transferred

PRUEFLOS  NUMC 12    Inspection batch number   Inspection batch number in
accordance to specification
AUSWMENGE  CHAR  8    Selected set of the usage decision   Selected set of the usage decision
in accordance to specification
AUSWMGWRK  CHAR  4    Plant of the selected set   Plant of the selected set in
accordance to specification
| CODE        |     | CHAR  4    | Code         | Recorded Value  |
| ----------- | --- | ---------- | ------------ | --------------- |
| CODEGRUPPE  |     | CHAR  8    | Code group   | Recorded Value  |
VNAME  CHAR  12    Person who made usage decision   If result was recorded at HYDRA
console, it contains the user;
otherwise it contains the personal
card number.
VDATUM  DATE  8    Date when usage decision was made   Date when usage decision was
made
VZEIT  TIME  6    Time when usage decision was made   Time when usage decision was
made
VTEXT  CHAR  80    Text for usage decision   Text for usage decision

Upload for Defect Items
| Message type:  |     | ZHYQMIDI_DEFECT_ITEMS      |     |     |
| -------------- | --- | -------------------------- | --- | --- |
| IDoc type      |     | ZHYQMIDI_ DEFECT_ITEMS 01  |     |     |
Segment:
Z2QMIFE000X000 (defect items)

| Field name:  |     | T  L  | D  Description  | Use in HYDRA  |
| ------------ | --- | ----- | --------------- | ------------- |

MBL_SAP_Implementation_QM_Up.docx  Version: 1.0.1362  Page 7 of 8

|     |     |     |     |     |     | Upload of inspection results  |     |     |
| --- | --- | --- | --- | --- | --- | ----------------------------- | --- | --- |

| Field name:  |     | T  L       | D             | Description  |     | Use in HYDRA                      |     |     |
| ------------ | --- | ---------- | ------------- | ------------ | --- | --------------------------------- | --- | --- |
| SATZART      |     | CHAR  3    | Record type   |              |     | “Q90”  Defect item for            |     |     |
|              |     |            |               |              |     |   inspection batch                |     |     |
|              |     |            |               |              |     | “Q91”  Defect item for operation  |     |     |
|              |     |            |               |              |     | “Q92”  Defect item for            |     |     |
|              |     |            |               |              |     |   characteristic                  |     |     |
|              |     |            |               |              |     |   independent multiple            |     |     |
|              |     |            |               |              |     |   sample                          |     |     |
|              |     |            |               |              |     | “Q95”  Defect item for operation  |     |     |
|              |     |            |               |              |     |   with reference to               |     |     |
|              |     |            |               |              |     |   inspection point                |     |     |
|              |     |            |               |              |     | “Q96”  Defect item for            |     |     |
|              |     |            |               |              |     |   characteristic with             |     |     |
|              |     |            |               |              |     |   reference to inspection         |     |     |
|              |     |            |               |              |     |   point                           |     |     |
| PRUEFLOS     |     | NUMC 12    |               |              |     | Inspection point number in        |     |     |
Inspection batch number
accordance to specification
| PLNFL  |     | CHAR  6    |     |     |     | Sequence of operations in task list  |     |     |
| ------ | --- | ---------- | --- | --- | --- | ------------------------------------ | --- | --- |
Sequence of operations in task list
in accordance to specification
| VORNR  |     | CHAR  4    |     |     |     | Operation number in accordance  |     |     |
| ------ | --- | ---------- | --- | --- | --- | ------------------------------- | --- | --- |
Operation number
to specification
| MERKNR  |     | NUMC 4    |     |     |     | Characteristic  | number  | in  |
| ------- | --- | --------- | --- | --- | --- | --------------- | ------- | --- |
Characteristic number
accordance to specification
PROBENR  NUMC 6    Number  of  partial  sample/inspection Number  of  partial
|             |     |           | point         |         |                  | sample/inspection point             |                 |     |
| ----------- | --- | --------- | ------------- | ------- | ---------------- | ----------------------------------- | --------------- | --- |
| RUECKMELNR  |     | NUMC 8    |               |         |                  | Confirmation number for inspection  |                 |     |
|             |     |           | Confirmation  | number  | for  inspection  |                                     |                 |     |
|             |     |           |               |         |                  | characteristic                      | in  accordance  | to  |
characteristic
specification
| POSNR  |     | NUMC 4    | Sort number for item   |     |     | Consecutive number  |     |     |
| ------ | --- | --------- | ---------------------- | --- | --- | ------------------- | --- | --- |
FEKAT  CHAR  1    Catalog type - defects   Catalog type - defects
FEGRP  CHAR  8    Code group - defects   Code group - defects
| FECOD  |     | CHAR  4    | Defects   |     |     | Defects   |     |     |
| ------ | --- | ---------- | --------- | --- | --- | --------- | --- | --- |
SERIALNR  CHAR  18    Single-unit  number  of  unit  to  be Single-unit number of unit to be
|     |     |     | inspected   |     |     | inspected   |     |     |
| --- | --- | --- | ----------- | --- | --- | ----------- | --- | --- |
ANZFEHLER  CHAR  7    Number of defects   Number of defects
| FEQKLAS  |     | CHAR  2    | Defect class   |     |     | Defect class   |     |     |
| -------- | --- | ---------- | -------------- | --- | --- | -------------- | --- | --- |
KZSYSFE  CHAR  1    Indicator: systematic defect   Indicator: systematic defect
OTKAT  CHAR  1    Catalog type - object parts   Catalog type - object parts
OTGRP  CHAR  8    Code group - object parts   Code group - object parts
| OTEIL  |     | CHAR  4    | Object part   |     |     | Object part   |     |     |
| ------ | --- | ---------- | ------------- | --- | --- | ------------- | --- | --- |
FETXT  CHAR  40    Short text for defect item   Short text for defect item
| BAUTL  |     | CHAR  18    | Assembly   |     |     | Assembly   |     |     |
| ------ | --- | ----------- | ---------- | --- | --- | ---------- | --- | --- |
FEHLBEW  CHAR  10    Quantitative defect valuation   Quantitative defect valuation
UNITFLBEW  UNIT  3    Unit for defect valuation   Unit for defect valuation
FENAM  CHAR  12    Name of person who processed defect If result was recorded at HYDRA
|     |     |     | record   |     |     | console, it contains the user;  |     |     |
| --- | --- | --- | -------- | --- | --- | ------------------------------- | --- | --- |
otherwise it contains the personal
card number.
FEDAT  DATS  8    Date of record processing   Date of record processing
FZEIT  TIMS  6    Time of record processing   Time of record processing

MBL_SAP_Implementation_QM_Up.docx  Version: 1.0.1362  Page 8 of 8