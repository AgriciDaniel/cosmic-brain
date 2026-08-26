Operations Data Download SAP --> HYDRA
Operations Data Download SAP --> HYDRA

1  Operations Data Download SAP --> HYDRA

Operation data
The following structure is part of the PP-PDC / CC4 interface and is used to transfer maintenance orders
to subsystems.
| Message type:      | OPERA4  |                        |     |     |
| ------------------ | ------- | ---------------------- | --- | --- |
| IDoc type:         | OPERA4  |                        |     |     |
| Segments:          | OPERA4  |                        |     |     |
| Message function:  | APP     |   Delta download      |     |     |
|                    | DEL     |   Deletion download   |     |     |
|                    | UPD     |   Base data download  |     |     |

| Field Name  | T  L  | Description  | Rel.  | HYDRA      |
| ----------- | ----- | ------------ | ----- | ---------- |
|             |       |              | KK4   | Reference  |
RUECK*  NUMC 10  Operation confirmation number  x  Is stored for the confirmation,
not used elsewhere
AUFNR  CHAR  12  Order number  x  According to Configuration (*1)
APLFL  CHAR  6  Operation sequence  x  According to Configuration (*1)
VORNR  CHAR  4  Operation number  x  According to Configuration (*1)
UVORN  CHAR  4  Sub procedure  x  According to Configuration (*1)
| SPLIT*  | NUMC 3     | Split number                   | x  Not used  |     |
| ------- | ---------- | ------------------------------ | ------------ | --- |
| KAPAR*  | CHAR  3    | Capacity type                  | x  Not used  |     |
| BDEGR*  | CHAR  3    | Subsystem connection grouping  | x  Not used  |     |
| MGVRG   | DEC  10.3  | Default quantity               | -            |     |
| ASVRG   | DEC  10.3  | Scrap quantity                 | -            |     |
| MEINH   | CHAR  3    | Operation quantity unit        | -            |     |
| UMREN   | DEC  5.0   | Conversion denominator         | -            |     |
| UMREZ   | DEC  5.0   | Conversion Numerator           | -            |     |
| KMEIN   | CHAR  3    | Header quantity unit           | -            |     |
| UNTMG   | DEC  10.3  | Underdelivery quantity         | -            |     |
| UEBMG   | DEC  10.3  | Overdelivery quantity          | -            |     |
| ACTI1   | DEC  10.3  | Planned activity 1             | -            |     |
| UNIT1   | CHAR  3    | Planned activity 1 unit        | -            |     |
| ACTI2   | DEC  10.3  | Planned activity 2             | -            |     |
| UNIT2   | CHAR  3    | Planned activity 2 unit        | -            |     |

MBL_SAP_Implementation_CC4_Down.docxVersion: 1.0.1362  Page 1 of 3

    Operations Data Download SAP --> HYDRA
Operations Data Download SAP --> HYDRA

| Field Name  | T  L       | Description               | Rel.  | HYDRA      |
| ----------- | ---------- | ------------------------- | ----- | ---------- |
|             |            |                           | KK4   | Reference  |
| ACTI3       | DEC  10.3  | Planned activity 3        | -     |            |
| UNIT3       | CHAR  3    | Planned activity 3 unit   | -     |            |
| ACTI4       | DEC  10.3  | Planned activity 4        | -     |            |
| UNIT4       | CHAR  3    | Planned activity 4 unit   | -     |            |
| ACTI5       | DEC  10.3  | Planned activity 5        | -     |            |
| UNIT5       | CHAR  3    | Planned activity 5 unit   | -     |            |
| ACTI6       | DEC  10.3  | Planned activity 6        | -     |            |
| UNIT6       | CHAR  3    | Planned activity 6 unit   | -     |            |
| LMNGA       | DEC  10.3  | Planned yield             | -     |            |
| XMNGA       | DEC  10.3  | Planned scrap quantities  | -     |            |
ISTAT  CHAR  5  Operation progress  x  OPs with completion status
("E") are not transferred
| ISM01  | DEC  10.3  | Actual activity 1                 | -              |     |
| ------ | ---------- | --------------------------------- | -------------- | --- |
| ISM02  | DEC  10.3  | Actual activity 2                 | -              |     |
| ISM03  | DEC  10.3  | Actual activity 3                 | -              |     |
| ISM04  | DEC  10.3  | Actual activity 4                 | -              |     |
| ISM05  | DEC  10.3  | Actual activity 5                 | -              |     |
| ISM06  | DEC  10.3  | Actual activity 6                 | -              |     |
| LEK01  | CHAR  1    | Completion indicator activity 1   | -              |     |
| LEK02  | CHAR  1    | Completion indicator activity 2   | -              |     |
| LEK03  | CHAR  1    | Completion indicator activity 3   | -              |     |
| LEK04  | CHAR  1    | Completion indicator activity 4.  | -              |     |
| LEK05  | CHAR  1    | Completion indicator activity 5   | -              |     |
| LEK06  | CHAR  1    | Completion indicator activity 6   | -              |     |
| ARBPL  | CHAR  8    | Workplace                         | x  OP machine  |     |
(see note)
| WERKS  | CHAR  4  | Workplace plant         | x  Plant     |     |
| ------ | -------- | ----------------------- | ------------ | --- |
| ARBPI  | CHAR  8  | Actual workplace        | x  Not used  |     |
| WERKI  | CHAR  4  | Actual workplace plant  | x  Not used  |     |
ISMNW  DEC  10.3  Actual work (cannot be negative)  x  Not used
| ISMNE  | CHAR  3   | Actual work unit   | x  Not used              |     |
| ------ | --------- | ------------------ | ------------------------ | --- |
| ARBEI  | DEC  6.1  | Planned work       | x  Target duration       |     |
| ARBEH  | CHAR  3   | Planned work unit  | x  "STD" / "H"  / "HUR"  |     |
"MIN"
"S" / "SEC"
OFMNW  DEC  6.1  Remaining work (cannot be negative)  x  Not used
| OFMNE  | CHAR  3  | Remaining work unit           | x  Not used        |     |
| ------ | -------- | ----------------------------- | ------------------ | --- |
| LEKNW  | CHAR  1  | Indicator: no remaining work  | x  Not used        |     |
| FSAVD  | DATS  8  | Earliest start date           | x  PPS start date  |     |
| FSAVZ  | TIMS  6  | Earliest start time           | x  PPS Start time  |     |
| SSEDD  | DATS  8  | Latest end date               | x  PPS end date    |     |

MBL_SAP_Implementation_CC4_Down.docxVersion: 1.0.1362  Page 2 of 3

    Operations Data Download SAP --> HYDRA
Operations Data Download SAP --> HYDRA

| Field Name  | T  L     | Description      | Rel.             | HYDRA      |
| ----------- | -------- | ---------------- | ---------------- | ---------- |
|             |          |                  | KK4              | Reference  |
| SSEDZ       | TIMS  6  | Latest end time  | x  PPS end time  |            |
*)  The actual work (field ISMNW) may not exceed 590 hours.
(*1)   See below for more information on generating the HYDRA order number.
Upload Requirement
The upload requirement controls the confirmation upload to SAP. All available confirmations will be
transferred to SAP in response to such upload requirement sent from SAP to HYDRA.
| Message type:      | REQUI4  |                        |     |     |
| ------------------ | ------- | ---------------------- | --- | --- |
| IDoc type:         | REQUI4  |                        |     |     |
| Segments:          | REQUI4  |                        |     |     |
| Message function:  | REQ     |   Upload Requirement  |     |     |

MBL_SAP_Implementation_CC4_Down.docxVersion: 1.0.1362  Page 3 of 3