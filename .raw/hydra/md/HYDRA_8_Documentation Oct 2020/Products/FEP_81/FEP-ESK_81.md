Manual
Escalation Messages for FEP
FEP-ESK 8.1
Version 1.0.1374
Last changed on: 19.06.2020

Escalation Messages for FEP
Copyright
©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.
Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.
FEP-ESK_81.docx Version: 1.0.18468 Page 2 of 11

|     |     |     | Escalation Messages for FEP   |     |
| --- | --- | --- | ----------------------------- | --- |

Contents
1  Overview – Escalation Messages for FEP ................................................... 4
2  Available Escalations ................................................................................... 5
| 2.1  | Error Analysis Criterion Generated for an Inspection Order  |     |     |     |
| ---- | ----------------------------------------------------------- | --- | --- | --- |
(CPAUERR.INSERTED) ..................................................................................... 5
2.2  Measure Generated (CMASSN.INSERTED) ....................................................... 8
2.3  Formula Calculation: Incorrect Characteristic Reference in Calculated
Characteristics
(CPAUMW.CALCULATED_CRITERIAS_GET_VARIABLE_VALUE) .................. 9
| 2.4  | Error when Setting the Calculated Variable Value  |     |     |     |
| ---- | ------------------------------------------------- | --- | --- | --- |
(CPAUMW.CALCULATED_CRITERIAS_SET_VARIABLE) .............................. 10
2.5  Revised Inspection Severity   (CDYHSTPR_DYPSCHARF_CHANGED) .......... 11

| FEP-ESK_81.docx  |     | Version: 1.0.18468  |     | Page 3 of 11  |
| ---------------- | --- | ------------------- | --- | ------------- |

Escalation Messages for FEP
1 Overview – Escalation Messages for FEP
Purpose
HYDRA escalation management provides a framework of functions that can be used to forward events
that occur or were recorded in HYDRA to individual users or user groups in real time. During the process,
escalation management takes active steps to ensure users are notified.
After notification, escalation management monitors times until acknowledgment by the recipients and until
escalation is concluded. Escalations can be forwarded to other users or user groups during processing.
Implementation Notes
You use escalation management when you would like to have active, real-time notification of specific
events in the area of in-process inspections in order to prevent failures and to increase efficiency and
productivity through rapid response.
Integration
The triggered events/escalations are posted to central escalation management. This forms the framework
for forwarding and following up on the events triggered.
For notification of people, escalation management accesses both User administration and the HR master
data stored in the system. Notifications can be sent out as e-mails by integrating the local mail server into
the system.
Features
 Provision of different escalation postings in the area of inspection data collection
 Event configuration: Configuration of order-related events
 Forwarding of the detected events to the escalation framework.
FEP-ESK_81.docx Version: 1.0.18468 Page 4 of 11

|     |     |     |     |     | Escalation Messages for FEP   |     |
| --- | --- | --- | --- | --- | ----------------------------- | --- |

2  Available Escalations

2.1  Error Analysis Criterion Generated for an Inspection Order
(CPAUERR.INSERTED)
If an error analysis criterion (failure type, failure location, failure cause, etc.) for an inspection order is
generated, the escalation is triggered.
| Event             |     | IDs             |     | Description                   |     |     |
| ----------------- | --- | --------------- | --- | ----------------------------- | --- | --- |
| CPAUERR.INSERTED  |     | CPAUERR.RECTYP  |     | Data type                     |     |     |
|                   |     | CPAUERR.BER     |     | Area                          |     |     |
|                   |     | CPAUERR.PANNR   |     | Inspection requirement        |     |     |
|                   |     | CPAUERR.PAUNR   |     | Inspection order              |     |     |
|                   |     | CPAUERR.AFO     |     | OP                            |     |     |
|                   |     | CPAUERR.STPRNR  |     | Sample number                 |     |     |
|                   |     | CPAUERR.WERTNR  |     | Measured value number         |     |     |
|                   |     | CPAUERR.ERRTYP  |     | Type of error analysis entry  |     |     |
FA (failure type)
FU (failure cause]
FO (failure location)
VU (causer)
Different entries for each type could be
defined in the quality master data.
|     |     | CPAUERR.ERRNR       |     | Number of error analysis entry  |     |     |
| --- | --- | ------------------- | --- | ------------------------------- | --- | --- |
|     |     | CPAUERR.GEWICHTUNG  |     | Weighting                       |     |     |
|     |     | CPAUERR.BEM         |     | Comment                         |     |     |
|     |     | CPAN.FU:1           |     | Fast user field 1               |     |     |
|     |     | CPAN.FU:2           |     | Fast user field 2               |     |     |
|     |     | CPAN.FU:3           |     | Fast user field 3               |     |     |
|     |     | CPAN.FU:4           |     | Fast user field 4               |     |     |
|     |     | CPAN.FU:5           |     | Fast user field 5               |     |     |
(of inspection requirement)           (Type:
CHAR)

| FEP-ESK_81.docx  |     |     | Version: 1.0.18468  |     |     | Page 5 of 11  |
| ---------------- | --- | --- | ------------------- | --- | --- | ------------- |

|     |     |     |     |     | Escalation Messages for FEP   |     |
| --- | --- | --- | --- | --- | ----------------------------- | --- |

| Event  |     | IDs         |     | Description         |     |     |
| ------ | --- | ----------- | --- | ------------------- | --- | --- |
|        |     | CPAN.FU:6   |     | Fast user field 6   |     |     |
|        |     | CPAN.FU:7   |     | Fast user field 7   |     |     |
|        |     | CPAN.FU:8   |     | Fast user field 8   |     |     |
|        |     | CPAN.FU:9   |     | Fast user field 9   |     |     |
|        |     | CPAN.FU:10  |     | Fast user field 10  |     |     |
(of inspection requirement)           (Type:
LONG)
|     |     | CPAN.FU:11  |     | Fast user field 11  |     |     |
| --- | --- | ----------- | --- | ------------------- | --- | --- |
|     |     | CPAN.FU:12  |     | Fast user field 12  |     |     |
(of inspection requirement)           (Type:
Double)
|     |     | CPAN.FU:13  |     | Fast user field 13   |     |     |
| --- | --- | ----------- | --- | -------------------- | --- | --- |
|     |     | CPAN.FU:14  |     | Fast user field 14   |     |     |
(of inspection requirement)         (Type: Date)
|     |     | CPAN.ATK  |     | Article number  |     |     |
| --- | --- | --------- | --- | --------------- | --- | --- |
(of inspection requirement)
|     |     | CPAN.ATKIDX  |     | Article IDX  |     |     |
| --- | --- | ------------ | --- | ------------ | --- | --- |
(of inspection requirement)
|     |     | CPAN.ANR  |     | Order number (CAQ)  |     |     |
| --- | --- | --------- | --- | ------------------- | --- | --- |
(of inspection requirement)
|     |     | CPAN.MNR  |     | Machine number  |     |     |
| --- | --- | --------- | --- | --------------- | --- | --- |
(of inspection requirement)
(of sample)                        (Feb.2011)
|     |     | MNR.BEZK        |     | Machine designation                      |     |     |
| --- | --- | --------------- | --- | ---------------------------------------- | --- | --- |
|     |     | ARTIKEL.ATKBEZ  |     | Article designation                      |     |     |
|     |     | ARTIKEL.GRP     |     | Article group                            |     |     |
|     |     | CMM.OTG         |     | Upper tolerance limit (absolute figure)  |     |     |
(of the inspection order characteristic)
|     |     | CMM.UTG  |     | Lower tolerance limit (absolute figure)   |     |     |
| --- | --- | -------- | --- | ----------------------------------------- | --- | --- |
(of the inspection order characteristic)
|     |     | CPAUMW.MW      |     | Measured value   |     |     |
| --- | --- | -------------- | --- | ---------------- | --- | --- |
|     |     | CPAUMW.BEMERK  |     | Comment          |     |     |
(of the measured value)
|     |     | CPAUMW.PNR  |     | Inspector ID  |     |     |
| --- | --- | ----------- | --- | ------------- | --- | --- |
(of the measured value)
|     |     | CPAUMW.KNR  |     | Inspector badge number  |     |     |
| --- | --- | ----------- | --- | ----------------------- | --- | --- |
(of the measured value)
|     |     | CPAUMW.NUM:EINTTYP  |     | Type of number entry ("NUMBER")  |     |     |
| --- | --- | ------------------- | --- | -------------------------------- | --- | --- |
|     |     | CPAUMW.NUM:EINTNR   |     | Number of the number entry       |     |     |

| FEP-ESK_81.docx  |     |     | Version: 1.0.18468  |     |     | Page 6 of 11  |
| ---------------- | --- | --- | ------------------- | --- | --- | ------------- |

|     |     |     | Escalation Messages for FEP   |     |
| --- | --- | --- | ----------------------------- | --- |

| FEP-ESK_81.docx  |     | Version: 1.0.18468  |     | Page 7 of 11  |
| ---------------- | --- | ------------------- | --- | ------------- |

|     |     |     | Escalation Messages for FEP   |     |
| --- | --- | --- | ----------------------------- | --- |

| 2.2  | Measure Generated (CMASSN.INSERTED)  |     |     |     |
| ---- | ------------------------------------ | --- | --- | --- |
When a measure is generated, the escalation is triggered.
| Event            |     | IDs                | Description                     |     |
| ---------------- | --- | ------------------ | ------------------------------- | --- |
| CMASSN.INSERTED  |     | CMASSN.MASSER      | Measure ID                      |     |
|                  |     | CMASSN.RECTYP      | Data type                       |     |
|                  |     | CMASSN.RECREF      | Assignment                      |     |
|                  |     | CMASSN.BER         | Area                            |     |
|                  |     | CMASSN.KEY:1       | Key field 1                     |     |
|                  |     | CMASSN.KEY:2       | Key field 2                     |     |
|                  |     | CMASSN.KEY:3       | Key field 3                     |     |
|                  |     | CMASSN.KEY:4       | Key field 4                     |     |
|                  |     | CMASSN.KEY:5       | Key field 5                     |     |
|                  |     | CMASSN.MASNR       | Measure number                  |     |
|                  |     | CMASSN.MASTEXT     | Measure text                    |     |
|                  |     | CMASSN.VERANT:TYP  | Responsible - Type              |     |
|                  |     | CMASSN.VERANT:NR   | Responsible - Number            |     |
|                  |     | CMASSN.STA         | Status                          |     |
|                  |     | CMASSN.ZIELDAT     | Target deadline - Date          |     |
|                  |     | CMASSN.ZIELZEI     | Target deadline - Time          |     |
|                  |     | CMASSN.ELEM        | Corresponding workflow element  |     |
|                  |     | CMASSN.BEM         | Comment                         |     |
|                  |     | PNR                | Responsible (only when the      |     |
responsible person comes from the
personnel catalog)

| FEP-ESK_81.docx  |     | Version: 1.0.18468  |     | Page 8 of 11  |
| ---------------- | --- | ------------------- | --- | ------------- |

|     |     |     | Escalation Messages for FEP   |     |
| --- | --- | --- | ----------------------------- | --- |

2.3  Formula Calculation: Incorrect Characteristic Reference in
Calculated Characteristics
(CPAUMW.CALCULATED_CRITERIAS_GET_VARIABLE_VA
LUE)
If the reference could not be resolved to a source characteristic during calculation of characteristics, an
escalation is triggered.
| Event                     |     | IDs            | Description  |     |
| ------------------------- | --- | -------------- | ------------ | --- |
| CPAUMW.CALCULATED_CRITERI |     | CPAUMW.RECTYP  | Data type    |     |
AS_GET_VARIABLE_VALUE
|     |     | CPAUMW.BER         | Area                           |     |
| --- | --- | ------------------ | ------------------------------ | --- |
|     |     | CPAUMW.PANNR       | Inspection requirement number  |     |
|     |     | CPAUMW.PAUNR       | Inspection order number        |     |
|     |     | CPAUMW.AFO         | OP                             |     |
|     |     | CMERK.BFORMEL:TYP  | Level of characteristic        |     |
calculation (see document
Formula Calculation)
  V - Single values
S - Samples

  C - Characteristics
|     |     | CMERK.BFORMEL  | Calculation formula for the  |     |
| --- | --- | -------------- | ---------------------------- | --- |
characteristic
|     |     | ERR:TEXT  | Error description   |     |
| --- | --- | --------- | ------------------- | --- |
|     |     | VAR:NAME  | Incorrect variable  |     |

| FEP-ESK_81.docx  |     | Version: 1.0.18468  |     | Page 9 of 11  |
| ---------------- | --- | ------------------- | --- | ------------- |

|     |     |     | Escalation Messages for FEP   |     |
| --- | --- | --- | ----------------------------- | --- |

| 2.4  | Error when Setting the Calculated Variable Value  |     |     |     |
| ---- | ------------------------------------------------- | --- | --- | --- |
(CPAUMW.CALCULATED_CRITERIAS_SET_VARIABLE)
During calculation of characteristics, it was possible to resolve a reference to a source characteristic. If an
error occurred when inserting the calculated numerical value into the formula, an escalation is triggered.
| Event                     |     | IDs            | Description  |     |
| ------------------------- | --- | -------------- | ------------ | --- |
| CPAUMW.CALCULATED_CRITERI |     | CPAUMW.RECTYP  | Data type    |     |
AS_SET_VARIABLE
|     |     | CPAUMW.BER     | Area                           |     |
| --- | --- | -------------- | ------------------------------ | --- |
|     |     | CPAUMW.PANNR   | Inspection requirement number  |     |
|     |     | CPAUMW.PAUNR   | Inspection order number        |     |
|     |     | CPAUMW.AFO     | OP                             |     |
|     |     | CPAUMW.STPRNR  | Sample number                  |     |
(of the calculated value)
|     |     | CPAUMW.WERTNR  | Single value number  |     |
| --- | --- | -------------- | -------------------- | --- |
(of the calculated value)
|     |     | CMERK.BFORMEL:TYP  | Level of characteristic  |     |
| --- | --- | ------------------ | ------------------------ | --- |
calculation (see document
Formula Calculation)
  V - Single values
S - Samples

  C - Characteristics
|     |     | CMERK.BFORMEL  | Calculation formula for the  |     |
| --- | --- | -------------- | ---------------------------- | --- |
characteristic
|     |     | ERR:TEXT   | Error description               |     |
| --- | --- | ---------- | ------------------------------- | --- |
|     |     | VAR:NAME   | Name of the variable concerned  |     |
|     |     | VAR:VALUE  | Calculated value for the        |     |
variable

| FEP-ESK_81.docx  |     | Version: 1.0.18468  |     | Page 10 of 11  |
| ---------------- | --- | ------------------- | --- | -------------- |

|     |     |     |     | Escalation Messages for FEP   |     |
| --- | --- | --- | --- | ----------------------------- | --- |

2.5  Revised Inspection Severity
  (CDYHSTPR_DYPSCHARF_CHANGED)
If the inspection severity is revised, the escalation is triggered.
| Event                       |     | IDs                   |     | Description                 |     |
| --------------------------- | --- | --------------------- | --- | --------------------------- | --- |
| CDYHSTPR_DYPSCHARF_CHANGED  |     | CPAUSP.RECTYP         |     | Data type sample            |     |
|                             |     | CPAUSP.BER            |     | Sample range                |     |
|                             |     | CPAUSP.PANNR          |     | Inspection requirement      |     |
|                             |     | CPAUSP.PAUNR          |     | Inspection order            |     |
|                             |     | CPAN.ANR              |     | Order                       |     |
|                             |     | CPAU.AGNR             |     | Operation                   |     |
|                             |     | CPAUSP.AFO            |     | OP                          |     |
|                             |     | CMERK.CMMNR           |     | Characteristic number       |     |
|                             |     | CMERK.MMBEZ           |     | Characteristic designation  |     |
|                             |     | CPAUSP.STPRNR         |     | Sample                      |     |
|                             |     | CPAUSP.DEVICE:TYP     |     | Device type                 |     |
|                             |     | CPAUSP.DEVICE:ID      |     | Device                      |     |
|                             |     | CPAUSP.DEVICE:STPRNR  |     | Device sample               |     |
|                             |     | DYPSCHARF:ALT         |     | Old inspection severity     |     |
|                             |     | DYPSCHARF:NEU         |     | New inspection severity     |     |
|                             |     | CHANGE:DAT            |     | Date of change              |     |
|                             |     | CHANGE:ZEI            |     | Time of change              |     |

| FEP-ESK_81.docx  |     | Version: 1.0.18468  |     |     | Page 11 of 11  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |