Manual
WEP Escalation Messages
WEP-ESK 8.1
Version 1.0.1361
Last changed on: 19.06.2020

WEP Escalation Messages
Copyright
©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.
Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.
WEP-ESK_81.docx Version: 1.0.18468 Page 2 of 9

|     |     |     | WEP Escalation Messages  |     |
| --- | --- | --- | ------------------------ | --- |

Contents
1  WEP Escalation Messages - Overview ........................................................ 4
2  Available Escalations ................................................................................... 5
| 2.1  | Failure analysis criterion generated for an inspection order  |     |     |     |
| ---- | ------------------------------------------------------------- | --- | --- | --- |
(CPAUERR.INSERTED) ..................................................................................... 5
2.2  Measure generated (CMASSN.INSERTED) ........................................................ 7
2.3  Formula calculation: erroneous characteristics reference in the calculated
characteristics
(CPAUMW.CALCULATED_CRITERIAS_GET_VARIABLE_VALUE) .................. 7
| 2.4  | Error while setting the calculated variable value  |     |     |     |
| ---- | -------------------------------------------------- | --- | --- | --- |
(CPAUMW.CALCULATED_CRITERIAS_SET_VARIABLE) ................................ 8
2.5  Changed inspection severity (CDYHSTPR_DYPSCHARF_CHANGED) ............. 9

| WEP-ESK_81.docx  |     | Version: 1.0.18468  |     | Page 3 of 9  |
| ---------------- | --- | ------------------- | --- | ------------ |

WEP Escalation Messages
1 WEP Escalation Messages - Overview
Purpose
HYDRA escalation management provides a framework of functions that can be used to forward events
that occur or were recorded in HYDRA to individual users or user groups in real time. During the process,
escalation management takes active steps to ensure users are notified.
After notification, escalation management monitors times until acknowledgment by the recipients and until
escalation is concluded. Escalations can be forwarded to other users or user groups during processing.
Implementation considerations
Use escalation management for active, real-time notification of specific events around the goods receipt
inspections in order to prevent failures and to increase efficiency and productivity through rapid response.
Integration
The triggered events/escalations are posted to central escalation management. This forms the framework
for forwarding and following up on the triggered events.
To notify people, escalation management accesses both User Administration and HR Master Data stored
in the system. Notifications can be sent out as e-mails by integrating the local mail server into the system.
Features
 Staging different escalation messages around inspection data recording.
 Event configuration: configuration of order-related events.
 Forwarding the detected events to the escalation framework.
WEP-ESK_81.docx Version: 1.0.18468 Page 4 of 9

|     |     |     |     |     | WEP Escalation Messages  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

2  Available Escalations
2.1  Failure analysis criterion generated for an inspection order
(CPAUERR.INSERTED)
Escalation is triggered if a failure analysis criterion (failure type, location, cause, etc.) is generated for an
inspection order.
| Event             |     | Identifiers     |     | Description                   |     | QMS  |
| ----------------- | --- | --------------- | --- | ----------------------------- | --- | ---- |
| CPAUERR.INSERTED  |     | CPAUERR.RECTYP  |     | Data type                     |     | Yes  |
|                   |     | CPAUERR.BER     |     | Area                          |     | Yes  |
|                   |     | CPAUERR.PANNR   |     | Inspection requirement        |     | Yes  |
|                   |     | CPAUERR.PAUNR   |     | Inspection order              |     | Yes  |
|                   |     | CPAUERR.AFO     |     | AFO                           |     | Yes  |
|                   |     | CPAUERR.STPRNR  |     | Sample number                 |     | Yes  |
|                   |     | CPAUERR.WERTNR  |     | Measured value number         |     | Yes  |
|                   |     | CPAUERR.ERRTYP  |     | Type of error analysis entry  |     | Yes  |
FA (failure type)
FU (failure cause]
FO (failure location)
VU (causer)
Different entries for each type
could be defined in the quality
master data.
|     |     | CPAUERR.ERRNR  |     | Number of the failure analysis  |     | Yes  |
| --- | --- | -------------- | --- | ------------------------------- | --- | ---- |
entry
|     |     | CPAUERR.GEWICHTUNG  |     | Weighting            |     | Yes       |
| --- | --- | ------------------- | --- | -------------------- | --- | --------- |
|     |     | CPAUERR.BEM         |     | Comment              |     | is blank  |
|     |     | CPAN.FU:1           |     | Quick user field 1   |     | No        |
|     |     | CPAN.FU:2           |     | Quick user field 2   |     |           |
|     |     | CPAN.FU:3           |     | Quick user field 3   |     |           |
|     |     | CPAN.FU:4           |     | Quick user field 4   |     |           |
|     |     | CPAN.FU:5           |     | Quick user field 5   |     |           |
(of the inspection requirement)
  (Type: CHAR)
|     |     | CPAN.FU:6   |     | Quick user field 6   |     | No  |
| --- | --- | ----------- | --- | -------------------- | --- | --- |
|     |     | CPAN.FU:7   |     | Quick user field 7   |     |     |
|     |     | CPAN.FU:8   |     | Quick user field 8   |     |     |
|     |     | CPAN.FU:9   |     | Quick user field 9   |     |     |
|     |     | CPAN.FU:10  |     | Quick user field 10  |     |     |
(of the inspection requirement)
  (Type: LONG)

| WEP-ESK_81.docx  |     |     | Version: 1.0.18468  |     |     | Page 5 of 9  |
| ---------------- | --- | --- | ------------------- | --- | --- | ------------ |

|     |     |     |     |     | WEP Escalation Messages  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

| Event  |     | Identifiers  |     | Description          |     | QMS  |
| ------ | --- | ------------ | --- | -------------------- | --- | ---- |
|        |     | CPAN.FU:11   |     | Quick user field 11  |     | No   |
|        |     | CPAN.FU:12   |     | Quick user field 12  |     |      |
(of the inspection requirement)
  (Type: Double)
|     |     | CPAN.FU:13  |     | Quick user field 13   |     | No  |
| --- | --- | ----------- | --- | --------------------- | --- | --- |
|     |     | CPAN.FU:14  |     | Quick user field 14   |     |     |
(of the inspection requirement)
  (Type: Date)
|     |     | CPAN.ATK  |     | Article number  |     | Yes  |
| --- | --- | --------- | --- | --------------- | --- | ---- |
(of the inspection requirement)
|     |     | CPAN.ATKIDX  |     | IDX article  |     | No  |
| --- | --- | ------------ | --- | ------------ | --- | --- |
(of the inspection requirement)
|     |     | CPAN.ANR  |     | Order number (CAQ)  |     | Yes  |
| --- | --- | --------- | --- | ------------------- | --- | ---- |
(of the inspection requirement)
|     |     | CPAN.MNR  |     | Machine number  |     | ???  |
| --- | --- | --------- | --- | --------------- | --- | ---- |
(of the inspection requirement)
(of the sample)
  (Feb.2011)
|     |     | MNR.BEZK        |     | Machine designation              |     | No   |
| --- | --- | --------------- | --- | -------------------------------- | --- | ---- |
|     |     | ARTIKEL.ATKBEZ  |     | Article designation              |     | No   |
|     |     | ARTIKEL.GRP     |     | Article group                    |     | No   |
|     |     | CMM.OTG         |     | Upper tolerance limit (absolute  |     | Yes  |
specification)
|     |     |     |     | (of  the  | inspection  | order  |
| --- | --- | --- | --- | --------- | ----------- | ------ |
criterion)
|     |     | CMM.UTG  |     | Lower tolerance limit (absolute  |     | Yes  |
| --- | --- | -------- | --- | -------------------------------- | --- | ---- |
specification)
|     |     |     |     | (of  the  | inspection  | order  |
| --- | --- | --- | --- | --------- | ----------- | ------ |
criterion)
|     |     | CPAUMW.MW      |     | Measured value   |     | Yes  |
| --- | --- | -------------- | --- | ---------------- | --- | ---- |
|     |     | CPAUMW.BEMERK  |     | Comment          |     | No   |
(of the measured value)
|     |     | CPAUMW.PNR  |     | Inspector ID  |     | No  |
| --- | --- | ----------- | --- | ------------- | --- | --- |
(of the measured value)
|     |     | CPAUMW.KNR  |     | Inspector badge number  |     | No  |
| --- | --- | ----------- | --- | ----------------------- | --- | --- |
(of the measured value)
|     |     | CPAUMW.NUM:EINTTYP  |     | Type  | of  number  | entry  No  |
| --- | --- | ------------------- | --- | ----- | ----------- | ---------- |
("NUMBER")
|     |     | CPAUMW.NUM:EINTNR  |     | Number of the number entry  |     | No  |
| --- | --- | ------------------ | --- | --------------------------- | --- | --- |

| WEP-ESK_81.docx  |     |     | Version: 1.0.18468  |     |     | Page 6 of 9  |
| ---------------- | --- | --- | ------------------- | --- | --- | ------------ |

|     |     |     | WEP Escalation Messages  |     |
| --- | --- | --- | ------------------------ | --- |

| 2.2  | Measure generated (CMASSN.INSERTED)  |     |     |     |
| ---- | ------------------------------------ | --- | --- | --- |
Escalation is triggered if a measure has been generated.
| Event            |     | Identifiers        | Description                     |                 |
| ---------------- | --- | ------------------ | ------------------------------- | --------------- |
| CMASSN.INSERTED  |     | CMASSN.MASSER      | Identifier for the measure      |                 |
|                  |     | CMASSN.RECTYP      | Data type                       |                 |
|                  |     | CMASSN.RECREF      | Assignment                      |                 |
|                  |     | CMASSN.BER         | Area                            |                 |
|                  |     | CMASSN.KEY:1       | Key field 1                     |                 |
|                  |     | CMASSN.KEY:2       | Key field 2                     |                 |
|                  |     | CMASSN.KEY:3       | Key field 3                     |                 |
|                  |     | CMASSN.KEY:4       | Key field 4                     |                 |
|                  |     | CMASSN.KEY:5       | Key field 5                     |                 |
|                  |     | CMASSN.MASNR       | Measures number                 |                 |
|                  |     | CMASSN.MASTEXT     | Measures text                   |                 |
|                  |     | CMASSN.VERANT:TYP  | Responsible - type              |                 |
|                  |     | CMASSN.VERANT:NR   | Responsible - number            |                 |
|                  |     | CMASSN.STA         | Status                          |                 |
|                  |     | CMASSN.ZIELDAT     | Target date - date              |                 |
|                  |     | CMASSN.ZIELZEI     | Target time - time              |                 |
|                  |     | CMASSN.ELEM        | corresponding workflow element  |                 |
|                  |     | CMASSN.BEM         | Comment                         |                 |
|                  |     | PNR                | Person  responsible             | (only  if  the  |
person responsible is from the HR
master data)

2.3  Formula calculation: erroneous characteristics reference in
the calculated characteristics
(CPAUMW.CALCULATED_CRITERIAS_GET_VARIABLE_VA
LUE)
An  escalation  is  triggered  if  the  reference  to  a  source  characteristic  could  not  be  resolved  while
calculating characteristics.
| Event                     |     | Identifiers    | Description  |     |
| ------------------------- | --- | -------------- | ------------ | --- |
| CPAUMW.CALCULATED_CRITERI |     | CPAUMW.RECTYP  | Data type    |     |

| WEP-ESK_81.docx  |     | Version: 1.0.18468  |     | Page 7 of 9  |
| ---------------- | --- | ------------------- | --- | ------------ |

|     |     |     |     | WEP Escalation Messages  |     |     |
| --- | --- | --- | --- | ------------------------ | --- | --- |

| Event  |     | Identifiers  |     | Description  |     |     |
| ------ | --- | ------------ | --- | ------------ | --- | --- |
AS_GET_VARIABLE_VALUE
|     |     | CPAUMW.BER         |     | Area                           |                      |     |
| --- | --- | ------------------ | --- | ------------------------------ | -------------------- | --- |
|     |     | CPAUMW.PANNR       |     | Inspection requirement number  |                      |     |
|     |     | CPAUMW.PAUNR       |     | Inspection order number        |                      |     |
|     |     | CPAUMW.AFO         |     | AFO                            |                      |     |
|     |     | CMERK.BFORMEL:TYP  |     | Level                          | of  characteristics  |     |
|     |     |                    |     | calculation                    | (see  document       | on  |
formula calculation)
V - Single values

  S - Samples
  C - Characteristics
|     |     | CMERK.BFORMEL  |     | Characteristics  |     | calculation  |
| --- | --- | -------------- | --- | ---------------- | --- | ------------ |
formula
|      |                                                    | ERR:TEXT  |     | Error description   |     |     |
| ---- | -------------------------------------------------- | --------- | --- | ------------------- | --- | --- |
|      |                                                    | VAR:NAME  |     | erroneous variable  |     |     |
| 2.4  | Error while setting the calculated variable value  |           |     |                     |     |     |
(CPAUMW.CALCULATED_CRITERIAS_SET_VARIABLE)
A reference to the source characteristic could be resolved while calculating characteristics. An escalation
is triggered if an error occurred while inserting the calculated numeric value into the formula.
| Event                     |     | Identifiers    |     | Description  |     |     |
| ------------------------- | --- | -------------- | --- | ------------ | --- | --- |
| CPAUMW.CALCULATED_CRITERI |     | CPAUMW.RECTYP  |     | Data type    |     |     |
AS_SET_VARIABLE
|     |     | CPAUMW.BER     |     | Area                           |     |         |
| --- | --- | -------------- | --- | ------------------------------ | --- | ------- |
|     |     | CPAUMW.PANNR   |     | Inspection requirement number  |     |         |
|     |     | CPAUMW.PAUNR   |     | Inspection order number        |     |         |
|     |     | CPAUMW.AFO     |     | AFO                            |     |         |
|     |     | CPAUMW.STPRNR  |     | Sample                         |     | number  |
(of the calculated value)
|     |     | CPAUMW.WERTNR  |     | Single  | value  | number  |
| --- | --- | -------------- | --- | ------- | ------ | ------- |
(of the calculated value)
|     |     | CMERK.BFORMEL:TYP  |     | Level        | of  characteristics  |     |
| --- | --- | ------------------ | --- | ------------ | -------------------- | --- |
|     |     |                    |     | calculation  | (see  document       | on  |
formula calculation)
  V - Single values
S - Samples

  C - Characteristics
|     |     | CMERK.BFORMEL  |     | Characteristics  |     | calculation  |
| --- | --- | -------------- | --- | ---------------- | --- | ------------ |
formula
|     |     | ERR:TEXT  |     | Error description  |     |     |
| --- | --- | --------- | --- | ------------------ | --- | --- |

| WEP-ESK_81.docx  |     | Version: 1.0.18468  |     |     |     | Page 8 of 9  |
| ---------------- | --- | ------------------- | --- | --- | --- | ------------ |

|     |     |     |     | WEP Escalation Messages  |     |
| --- | --- | --- | --- | ------------------------ | --- |

| Event  |     | Identifiers  |     | Description  |                 |
| ------ | --- | ------------ | --- | ------------ | --------------- |
|        |     | VAR:NAME     |     | Name  of     | the  variables  |
concerned
|     |     | VAR:VALUE  |     | Value  calculated  | for  the  |
| --- | --- | ---------- | --- | ------------------ | --------- |
variable

| 2.5  | Changed inspection severity  |     |     |     |     |
| ---- | ---------------------------- | --- | --- | --- | --- |
(CDYHSTPR_DYPSCHARF_CHANGED)
Escalation is triggered if the inspection severity is changed.
| Event                       |     | Identifiers           |     | Description                 |     |
| --------------------------- | --- | --------------------- | --- | --------------------------- | --- |
| CDYHSTPR_DYPSCHARF_CHANGED  |     | CPAUSP.RECTYP         |     | Sample data type            |     |
|                             |     | CPAUSP.BER            |     | Sample area                 |     |
|                             |     | CPAUSP.PANNR          |     | Inspection requirement      |     |
|                             |     | CPAUSP.PAUNR          |     | Inspection order            |     |
|                             |     | CPAN.ANR              |     | Order                       |     |
|                             |     | CPAU.AGNR             |     | Operation                   |     |
|                             |     | CPAUSP.AFO            |     | AFO                         |     |
|                             |     | CMERK.CMMNR           |     | Characteristic number       |     |
|                             |     | CMERK.MMBEZ           |     | Characteristic designation  |     |
|                             |     | CPAUSP.STPRNR         |     | Sample                      |     |
|                             |     | CPAUSP.DEVICE:TYP     |     | Device type                 |     |
|                             |     | CPAUSP.DEVICE:ID      |     | Device                      |     |
|                             |     | CPAUSP.DEVICE:STPRNR  |     | Device sample               |     |
|                             |     | DYPSCHARF:ALT         |     | Old inspection severity     |     |
|                             |     | DYPSCHARF:NEU         |     | New inspection severity     |     |
|                             |     | CHANGE:DAT            |     | Change date                 |     |
|                             |     | CHANGE:ZEI            |     | Change time                 |     |

| WEP-ESK_81.docx  |     | Version: 1.0.18468  |     |     | Page 9 of 9  |
| ---------------- | --- | ------------------- | --- | --- | ------------ |