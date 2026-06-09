Download von Vorgangsdaten SAP --> HYDRA

1  Download of Operation Data SAP --> HYDRA
Summary

Transaction data
The following structure is part of the PP-PDC/ CC3 interface and is used to transfer maintenance orders
to sub-systems.
| Message type:      | OPERA3    |                       |     |
| ------------------ | --------- | --------------------- | --- |
| IDoc type:         | OPERA3    |                       |     |
| Segments:          | E2OPERA1  |                       |     |
| Message function:  | APP       |   Delta download     |     |
|                    | DEL       |   Deletion download  |     |
|                    | UPD       |   Initial download   |     |

| Field name  | T  L  | Description  | Rel.  Usage in HYDRA  |
| ----------- | ----- | ------------ | --------------------- |
KK3
RUECK*  NUMC 10  Confirmation number of the operation  x  Saved for the confirmation,
besides no other usage
| AUFNR   | CHAR  12   | Order number                     | x  Order number        |
| ------- | ---------- | -------------------------------- | ---------------------- |
| APLFL   | CHAR  6    | Operation sequence               | x  Not used            |
| VORNR   | CHAR  4    | Operation number                 | x  Operation number    |
| UVORN   | CHAR  4    | Sub-operation                    | x  Sub-operation no.   |
| SPLIT*  | NUMC 3     | Split number                     | x  Not used            |
| KAPAR*  | CHAR  3    | Capacity type                    | x  Not used            |
| BDEGR*  | CHAR  3    | Grouping subsystem connection    | x  Not used            |
| MGVRG   | DEC  10.3  | Default quantity                 | -                      |
| ASVRG   | DEC  10.3  | Scrap quantities                 | -                      |
| MEINH   | CHAR  3    | Operation quantity unit          | -                      |
| UMREN   | DEC  5.0   | Denominator for the conversion   | -                      |
| UMREZ   | DEC  5.0   | Numerator for the conversion     | -                      |
| KMEIN   | CHAR  3    | Header quantity unit             | -                      |
Underdelivery quantity
| UNTMG  | DEC  10.3  |                        | -    |
| ------ | ---------- | ---------------------- | ---- |
| UEBMG  | DEC  10.3  | Overdelivery quantity  | -    |
| ACTI1  | DEC  10.3  | Planned activity 1     | -    |

MBL_SAP_Implementation_CC3_Down.docxVersion: 1.0.1362  Page 1 of 4

    Download von Vorgangsdaten SAP --> HYDRA

| Field name  | T  L  | Description  | Rel.  Usage in HYDRA  |
| ----------- | ----- | ------------ | --------------------- |
KK3
| UNIT1  | CHAR  3    | Unit of the planned activity 1  | -                   |
| ------ | ---------- | ------------------------------- | ------------------- |
| ACTI2  | DEC  10.3  | Planned activity 2              | -                   |
| UNIT2  | CHAR  3    | Unit of the planned activity 2  | -                   |
| ACTI3  | DEC  10.3  | Planned activity 3              | -                   |
| UNIT3  | CHAR  3    | Unit of the planned activity 3  | -                   |
| ACTI4  | DEC  10.3  | Planned activity 4              | -                   |
| UNIT4  | CHAR  3    | Unit of the planned activity 4  | -                   |
| ACTI5  | DEC  10.3  | Planned activity 5              | -                   |
| UNIT5  | CHAR  3    | Unit of the planned activity 5  | -                   |
| ACTI6  | DEC  10.3  | Planned activity 6              | -                   |
| UNIT6  | CHAR  3    | Unit of the planned activity 6  | -                   |
| LMNGA  | DEC  10.3  | Planned yield                   | -                   |
| XMNGA  | DEC  10.3  | Planned scrap quantity          | -                   |
| ISTAT  | CHAR  5    | Status of the operation         | x                   |
| ISM01  | DEC  10.3  | Actual activity 1               | -                   |
| ISM02  | DEC  10.3  | Actual activity 2               | -                   |
| ISM03  | DEC  10.3  | Actual activity 3               | -                   |
| ISM04  | DEC  10.3  | Actual activity 4               | -                   |
| ISM05  | DEC  10.3  | Actual activity 5               | -                   |
| ISM06  | DEC  10.3  | Actual activity 6               | -                   |
| LEK01  | CHAR  1    | End indicator for activity 1    | -                   |
| LEK02  | CHAR  1    | End indicator for activity 2    | -                   |
| LEK03  | CHAR  1    | End indicator for activity 3    | -                   |
| LEK04  | CHAR  1    | End indicator for activity 4.   | -                   |
| LEK05  | CHAR  1    | End indicator for activity 5    | -                   |
| LEK06  | CHAR  1    | End indicator for activity 6    | -                   |
| ARBPL  | CHAR  8    | Workplace                       | x  HYDRA workplace  |
| WERKS  | CHAR  4    | Plant for the workplace         | x  Plant            |
| ARBPI  | CHAR  8    | Actual workplace                | x  Not used         |
| WERKI  | CHAR  4    | Plant for the actual workplace  | x  Not used         |
ISMNW  DEC  10.3  Actual working time (must not be neg.)  x  Not used
| ISMNE  | CHAR  3   | Unit of the actual work  | x  Not used         |
| ------ | --------- | ------------------------ | ------------------- |
| ARBEI  | DEC  6.1  | Planned work             | x  Target BMK11 *)  |
ARBEH  CHAR  3  Unit of the planned work  x  S/SEC/MIN/STD/H/HUR/HR
OFMNW  DEC  6.1  Remaining work (must not be neg.)  x  Not used
| OFMNE  | CHAR  3  | Unit of the remaining work    | x  Not used        |
| ------ | -------- | ----------------------------- | ------------------ |
| LEKNW  | CHAR  1  | Indicator: no remaining work  | x  Not used        |
| FSAVD  | DATS  8  | Earliest start date           | x  PPS start date  |
| FSAVZ  | TIMS  6  | Earliest start time           | x  PPS start time  |

MBL_SAP_Implementation_CC3_Down.docxVersion: 1.0.1362  Page 2 of 4

    Download von Vorgangsdaten SAP --> HYDRA

| Field name  | T  L  | Description  | Rel.  Usage in HYDRA  |
| ----------- | ----- | ------------ | --------------------- |
KK3
| SSEDD  | DATS  8  | Latest end date  | x  PPS end date  |
| ------ | -------- | ---------------- | ---------------- |
| SSEDZ  | TIMS  6  | Latest end time  | x  PPS end time  |
*)  The actual working time (field ISMNW) must not exceed a duration of 590 hours.
Upload request
The upload request can be used to control the upload of confirmations to SAP. If such an upload request
is received from SAP in HYDRA, all available confirmations will - in turn - be transferred to SAP.
| Message type:      | REQUI3  |                    |     |
| ------------------ | ------- | ------------------ | --- |
| IDoc type:         | REQUI3  |                    |     |
| Segments:          | REQUI3  |                    |     |
| Message function:  | REQ     |   Upload request  |     |

MBL_SAP_Implementation_CC3_Down.docxVersion: 1.0.1362  Page 3 of 4

Download von Vorgangsdaten SAP --> HYDRA
MBL_SAP_Implementation_CC3_Down.docxVersion: 1.0.1362 Page 4 of 4