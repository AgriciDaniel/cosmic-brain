|     |     |     |     | Upload von Rückmeldungen HYDRA --> SAP  |     |
| --- | --- | --- | --- | --------------------------------------- | --- |

1  Upload of Confirmations HYDRA --> SAP
Summary

Confirmation PP-PDC/ CC3
| Record  | SAP meaning  |     | HYDRA action to be triggered  |     |     |
| ------- | ------------ | --- | ----------------------------- | --- | --- |
type
I20  Time ticket - partial end  Automatic or manual order interruption at the BDE terminal or
at the BDE console
I40  Time ticket end  Notification of the end of an order at the BDE terminal or at
the BDE console

HYDRA BDE confirms to SAP on the basis of time tickets. Transferred are the staff durations from the B-
records (personnel postings). They are transferred to SAP together with the personnel number.
A  transfer  of  correction  notifications  is  not  included  in  the  SAP  default  interface  PP-PDC/  CC3.
Confirmation structure "E2CONF32"
| Message type:  |     | CONF32   |     |     |     |
| -------------- | --- | -------- | --- | --- | --- |
| IDoc type:     |     | CONF32   |     |     |     |
| Segments:      |     | E2CONF5  |     |     |     |

| Field name   | Type  | Length  | Text                | Usage in HYDRA  |     |
| ------------ | ----- | ------- | ------------------- | --------------- | --- |
| Record type  | CHAR  | 3       | Record type of the  | I20 or I40      |     |
confirmation
| TERID  | CHAR  | 4   | Terminal ID  | Not used  |     |
| ------ | ----- | --- | ------------ | --------- | --- |
LDATE  DATS  8  Logical date/ actual date of Logoff date
the confirmation
LTIME  TIMS  6  Logical time/ actual time of Logoff time
the confirmation
ERDAT  DATS  8  Entry date of the  Date of the confirmation
confirmation
ERTIM  TIMS  6  Entry time of the  Time of the confirmation

MBL_SAP_Implementation_CC3_Up.docx Version: 1.0.1362  Page 1 of 2

|     |     |     |     | Upload von Rückmeldungen HYDRA --> SAP  |     |
| --- | --- | --- | --- | --------------------------------------- | --- |

| Field name  | Type  | Length  | Text  | Usage in HYDRA  |     |
| ----------- | ----- | ------- | ----- | --------------- | --- |
confirmation
| BUDAT  | DATS  | 8   |                      |                                      |     |
| ------ | ----- | --- | -------------------- | ------------------------------------ | --- |
|        |       |     | Posting date of the  | set according to shift date of the   |     |
|        |       |     | confirmation         | posting record                       |     |
| ARBPL  | CHAR  | 8   | Workplace            | HYDRA workplace                      |     |
| WERKS  | CHAR  | 4   | Plant                | Plant                                |     |
| ZAUSW  | NUMC  | 8   | Badge number         | Time ID number                       |     |
AUFNR  CHAR  12  Order number  according to specifications
VORNR  CHAR  4  Operation number   according to specifications
UVORN  CHAR  4  Sub-operation number  according to specifications
| SPLIT  | NUMC  | 3   | Split number            | Not used  |     |
| ------ | ----- | --- | ----------------------- | --------- | --- |
| KAPAR  | CHAR  | 3   | Capacity type           | Not used  |     |
| PEDD   | DATS  | 8   | Predicted end date      | Not used  |     |
| PEDZ   | TIMS  | 6   | Predicted duration end  | Not used  |     |
time
| LEKNW  | CHAR  | 1   | Indicator: no remaining  | Not used  |     |
| ------ | ----- | --- | ------------------------ | --------- | --- |
work
| LTXA1    | CHAR  | 40   | Upload text              | Not used        |     |
| -------- | ----- | ---- | ------------------------ | --------------- | --- |
| ISMNW *  | DEC   | 6.1  | Actual work              | P_DAUER         |     |
| ISMNE    | CHAR  | 3    | Unit of the actual work  | Hrs/ min/ sec*  |     |
LEARR  CHAR  6  Activity type  Activity type of the actual
workplace
| IDAUR *  | DEC  | 4.1  | Actual duration  |  RPA 11  |     |
| -------- | ---- | ---- | ---------------- | -------- | --- |
IDAUE  CHAR  3  Unit of the actual duration  Hrs/ min/ sec*
| ODAUR *  | DEC   | 4.1  | Remaining duration     | Not used  |     |
| -------- | ----- | ---- | ---------------------- | --------- | --- |
| ODAUE    | CHAR  | 3    | Unit of the remaining  | Not used  |     |
duration
| OFMNW *  | DEC   | 6.1  | Remaining work              | Not used     |     |
| -------- | ----- | ---- | --------------------------- | ------------ | --- |
| OFMNE    | CHAR  | 3    | Unit of the remaining work  | Not used     |     |
| ISDD     | DATS  | 8    | Start date for execution    | Login date   |     |
| ISDZ     | TIMS  | 6    | Start time for execution    | Login time   |     |
| IEDD     | DATS  | 8    | End time for execution      | Logoff date  |     |
| IEDZ     | TIMS  | 6    | End time for execution      | Logoff time  |     |

MBL_SAP_Implementation_CC3_Up.docx Version: 1.0.1362  Page 2 of 2