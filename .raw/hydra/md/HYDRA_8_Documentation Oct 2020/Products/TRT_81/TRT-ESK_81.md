Manual
TRT escalation messages
(AS)
TRT-ESK 8.1
Version 1.0.54
Last changed on: 19.06.2020

TRT escalation messages (AS)
Copyright
©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.
Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.
TRT-ESK_81.docx Version: 1.0.1362 Page 2 of 7

TRT escalation messages (AS)
Contents
1 Available Escalations ................................................................................... 4
1.1 Summary ............................................................................................................. 4
2 Available escalations .................................................................................... 5
The following sections describe all escalations including parameters that are
available in MPL and TRT. .................................................................................. 5
2.1 Batch was created through incoming goods (CNR.INCOMING) .......................... 5
2.2 Batch was consumed (CNR.CONSUMED) .......................................................... 5
2.3 Batch was deleted (CNR.DELETED) ................................................................... 6
2.4 Batch was transferred to another material buffer (CNR.TRANSFERRED) ........... 6
2.5 Batch was locked manually (CNR.LOCKED) ....................................................... 7
TRT-ESK_81.docx Version: 1.0.1362 Page 3 of 7

|     |     |     | TRT escalation messages (AS)  |     |
| --- | --- | --- | ----------------------------- | --- |

1  Available Escalations
| 1.1  | Summary  |     |     |     |
| ---- | -------- | --- | --- | --- |
HYDRA escalation management provides a framework of functions for forwarding events occurring or
entered  in  HYDRA  to  individual  users  or  user  groups  in  real  time.  In  this  context,  the  escalation
management actively undertakes notification steps.
After sending a notification, escalation management supervises the time taken by the notified person to
acknowledge the notification and the time up to the completion of the escalation. Escalations can be
forwarded to other users or user groups during processing.
The present documentation describes the existing escalations of MPL and TRT.

| TRT-ESK_81.docx  |     | Version: 1.0.1362  |     | Page 4 of 7  |
| ---------------- | --- | ------------------ | --- | ------------ |

|     |     |     | TRT escalation messages (AS)  |     |
| --- | --- | --- | ----------------------------- | --- |

2  Available escalations
The following sections describe all escalations including parameters that are available in MPL and TRT.
| 2.1  | Batch was created through incoming goods  |     |     |     |
| ---- | ----------------------------------------- | --- | --- | --- |
(CNR.INCOMING)
The event is triggered if a batch is generated.
| Event         |     | IDs            | Description                |     |
| ------------- | --- | -------------- | -------------------------- | --- |
| CNR.INCOMING  |     | CNR.CNR        | Batch number               |     |
|               |     | CNR.ANR        | Order + operation          |     |
|               |     | CNR.MNR        | Workplace                  |     |
|               |     | CNR.CKL        | Batch class                |     |
|               |     | CNR.ZLO        | Material buffer            |     |
|               |     | CNR.ATK        | Article                    |     |
|               |     | CNR.ATKBEZ     | Article designation        |     |
|               |     | CNR.STA        | Batch status               |     |
|               |     | CNR.BEM        | Comments                   |     |
|               |     | CNR.MATTYP     | Material type              |     |
|               |     | CNR.MATTYPART  | Material type              |     |
|               |     | CNR.SGR:GUT    | Target quantity, yield     |     |
|               |     | CNR.SGE:GUT    | Target quantity, unit      |     |
|               |     | CNR.RGR:GUT    | Remaining quantity, yield  |     |
|               |     | CNR.DAT        | Date                       |     |
|               |     | CNR.ZEI        | Time                       |     |

| 2.2  | Batch was consumed (CNR.CONSUMED)  |     |     |     |
| ---- | ---------------------------------- | --- | --- | --- |
The event is triggered if an incoming batch has been consumed. A batch is considered being consumed,
in case the remaining quantity of the batch is <=0, for example, when the input batch is logged off.
| Event         |     | IDs      | Description        |     |
| ------------- | --- | -------- | ------------------ | --- |
| CNR.CONSUMED  |     | CNR.CNR  | Batch number       |     |
|               |     | CNR.ANR  | Order + operation  |     |
|               |     | CNR.MNR  | Workplace          |     |
|               |     | CNR.CKL  | Batch class        |     |
|               |     | CNR.ZLO  | Material buffer    |     |
|               |     | CNR.ATK  | Article            |     |

| TRT-ESK_81.docx  |     | Version: 1.0.1362  |     | Page 5 of 7  |
| ---------------- | --- | ------------------ | --- | ------------ |

|     |     |     | TRT escalation messages (AS)  |     |
| --- | --- | --- | ----------------------------- | --- |

| Event  |     | IDs            | Description          |     |
| ------ | --- | -------------- | -------------------- | --- |
|        |     | CNR.ATKBEZ     | Article designation  |     |
|        |     | CNR.STA        | Batch status         |     |
|        |     | CNR.BEM        | Comments             |     |
|        |     | CNR.MATTYP     | Material type        |     |
|        |     | CNR.MATTYPART  | Material type        |     |
|        |     | CNR.OPT:VERBR  | Consumption type     |     |
|        |     | CNR.DAT        | Date                 |     |
|        |     | CNR.ZEI        | Time                 |     |

| 2.3  | Batch was deleted (CNR.DELETED)  |     |     |     |
| ---- | -------------------------------- | --- | --- | --- |
The event is triggered if a status change is undertaken in a batch to the DELETED status.
| Event        |                                                   | IDs            | Description          |     |
| ------------ | ------------------------------------------------- | -------------- | -------------------- | --- |
| CNR.DELETED  |                                                   | CNR.CNR        | Batch number         |     |
|              |                                                   | CNR.GR         | Reason               |     |
|              |                                                   | CNR.ATK        | Article              |     |
|              |                                                   | CNR.ATKBEZ     | Article designation  |     |
|              |                                                   | CNR.GRTXT      | Reason text          |     |
|              |                                                   | CNR.STA        | Batch status         |     |
|              |                                                   | CNR.BEM        | Comments             |     |
|              |                                                   | CNR.MATTYPART  | Material type        |     |
| 2.4          | Batch was transferred to another material buffer  |                |                      |     |
(CNR.TRANSFERRED)
The event is triggered if a batch changes the material buffer.
| Event            |     | IDs         | Description          |     |
| ---------------- | --- | ----------- | -------------------- | --- |
| CNR.TRANSFERRED  |     | CNR.CNR     | Batch number         |     |
|                  |     | CNR.ANR     | Order + operation    |     |
|                  |     | CNR.MNR     | Workplace            |     |
|                  |     | CNR.CKL     | Batch class          |     |
|                  |     | CNR.ZLO     | Material buffer      |     |
|                  |     | CNR.ATK     | Article              |     |
|                  |     | CNR.ATKBEZ  | Article designation  |     |
|                  |     | CNR.STA     | Batch status         |     |
|                  |     | CNR.BEM     | Comments             |     |

| TRT-ESK_81.docx  |     | Version: 1.0.1362  |     | Page 6 of 7  |
| ---------------- | --- | ------------------ | --- | ------------ |

|     |     |     | TRT escalation messages (AS)  |     |
| --- | --- | --- | ----------------------------- | --- |

| Event  |     | IDs            | Description    |     |
| ------ | --- | -------------- | -------------- | --- |
|        |     | CNR.MATTYP     | Material type  |     |
|        |     | CNR.MATTYPART  | Material type  |     |
|        |     | CNR.OPT:VERBR  | Consumpt.type  |     |
M  manual
R  retrograde
|     |     | CNR.DAT  | Date  |     |
| --- | --- | -------- | ----- | --- |
|     |     | CNR.ZEI  | Time  |     |

| 2.5  | Batch was locked manually (CNR.LOCKED)  |     |     |     |
| ---- | --------------------------------------- | --- | --- | --- |
The event is triggered if a batch is locked manually.
| Event       |     | IDs            | Description            |     |
| ----------- | --- | -------------- | ---------------------- | --- |
| CNR.LOCKED  |     | CNR.CNR        | Batch number           |     |
|             |     | CNR.GR         | Reason                 |     |
|             |     | CNR.ATK        | Article                |     |
|             |     | CNR.ATKBEZ     | Article designation    |     |
|             |     | CNR.GRTXT      | Reason text            |     |
|             |     | CNR.STA        | Batch status           |     |
|             |     | CNR.QST        | Manual quality status  |     |
|             |     | CNR.BEM        | Comments               |     |
|             |     | CNR.MATTYPART  | Material type          |     |

| TRT-ESK_81.docx  |     | Version: 1.0.1362  |     | Page 7 of 7  |
| ---------------- | --- | ------------------ | --- | ------------ |