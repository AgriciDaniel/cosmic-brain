Confirmations Upload HYDRA --> SAPConfirmations
Upload HYDRA --> SAP

1  Confirmations Upload HYDRA --> SAP

HYDRA Supported Record Types and Activities
HYDRA BDE reports the following time ticket related record types back to SAP R/3 PP:
| Record  | SAP Meaning  |     | HYDRA triggering action  |     |     |
| ------- | ------------ | --- | ------------------------ | --- | --- |
Type
T20  Partial  Time  Ticket  Automatic or manual order interruption at the BDE
|     | Completion  |     | terminal or BDE console.  |     |     |
| --- | ----------- | --- | ------------------------- | --- | --- |
T40  Time Ticket Completion  Order completion message at the BDE terminal or BDE
console.

| Please note  |     |     |     |     |     |
| ------------ | --- | --- | --- | --- | --- |
When HYDRA MPL is active, each generated output batch (output batch change message) will generate
OP interruption or logoff time tickets plus an L20 partial completion message.
Report Structure E2CONF7
HYDRA ADE reports time ticket related information back to SAP. Its base data consists of the order-
related postings (U / E records) and the duration data in these records. The badge number is added
before transmission to SAP.
| Message type:  |     | CONF42   |     |     |     |
| -------------- | --- | -------- | --- | --- | --- |
| IDoc type:     |     | CONF42   |     |     |     |
| Segments:      |     | E2CONF7  |     |     |     |

| Field Name  | Type  | Length  | Text                | HYDRA Reference  |     |
| ----------- | ----- | ------- | ------------------- | ---------------- | --- |
| SATZA       | CHAR  | 3       | Report record type  | T20 or T40       |     |
| TERID       | CHAR  | 4       | Terminal ID         | Not used         |     |
LDATE  DATS  8  Logical date / Actual reporting  Logoff date
date
LTIME  TIMS  6  Logical time / Actual reporting  Logoff time
time
| ERDAT  | DATS  | 8   | Report entry date  | Reporting date  |     |
| ------ | ----- | --- | ------------------ | --------------- | --- |

MBL_SAP_Implementation_CC4_Up.docx Version: 1.0.1362  Page 1 of 2

  Confirmations Upload HYDRA --> SAPConfirmations
Upload HYDRA --> SAP

| Field Name  | Type  | Length  | Text               | HYDRA Reference  |     |
| ----------- | ----- | ------- | ------------------ | ---------------- | --- |
| ERTIM       | TIMS  | 6       | Report entry time  | Reporting time   |     |
BUDAT  DATS  8  Report booking time  Set based on the booking
record shift date
| ARBPL    | CHAR  | 8    | Workplace                     | HYDRA workplace      |     |
| -------- | ----- | ---- | ----------------------------- | -------------------- | --- |
| WERKS    | CHAR  | 4    | Plant                         | Plant                |     |
| ZAUSW    | NUMC  | 8    | Badge number                  | Time badge number    |     |
| AUFNR    | CHAR  | 12   | Order number                  | Follows default      |     |
| VORNR    | CHAR  | 4    | Operation number              | Follows default      |     |
| UVORN    | CHAR  | 4    | Sub-operation number          | Follows default      |     |
| SPLIT    | NUMC  | 3    | Split number                  | Not used             |     |
| KAPAR    | CHAR  | 3    | Capacity type                 | Not used             |     |
| ABWEI    | CHAR  | 4    | Deviation basis               | Not used             |     |
| ABARB    | NUMC  | 3    | Completion level              |                      |     |
| PEDD     | DATS  | 8    | Predicted end date            | Not used             |     |
| PEDZ     | TIMS  | 6    | Predicted end time            | Not used             |     |
| LEKNW    | CHAR  | 1    | Indicator: no remaining work  | Not used             |     |
| LTXA1    | CHAR  | 40   | Report text                   | Not used             |     |
| ISMNW *  | DEC   | 6.1  | Actual work                   | P_DAUER              |     |
| ISMNE    | CHAR  | 3    | Actual work unit              | "H" / "STD" / "HUR"  |     |
"MIN"
"S" / "SEC"
Default "STD"
| LEARR  | CHAR  | 6   | Activity type  | Not used  |     |
| ------ | ----- | --- | -------------- | --------- | --- |
IDAUR *  DEC  4.1  Actual duration  Actual duration BMK11
IDAUE  CHAR  3  Actual duration unit  "H" / "STD" / "HUR"
"MIN"
"S" / "SEC"
Default "STD"
| ODAUR *  | DEC   | 4.1  | Remaining duration       | Not used     |     |
| -------- | ----- | ---- | ------------------------ | ------------ | --- |
| ODAUE    | CHAR  | 3    | Remaining duration unit  | Not used     |     |
| OFMNW *  | DEC   | 6.1  | Remaining work           | Not used     |     |
| OFMNE    | CHAR  | 3    | Remaining work unit      | Not used     |     |
| ISDD     | DATS  | 8    | Execution start date     | Logon date   |     |
| ISDZ     | TIMS  | 6    | Execution start time     | Logon time   |     |
| IEDD     | DATS  | 8    | Execution end date       | Logoff date  |     |
| IEDZ     | TIMS  | 6    | Execution end time       | Logoff time  |     |

MBL_SAP_Implementation_CC4_Up.docx Version: 1.0.1362  Page 2 of 2