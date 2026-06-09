Manual
PEP Escalation Messages
PEP-ESK 8.2
Version 1.0.23049
Last changed on: 02.09.2020

PEP Escalation Messages
Copyright
©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.
Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.
PEP-ESK_82.docx Version: 1.0.23049 Page 2 of 9

PEP Escalation Messages
Contents
1 Overview: PEP Escalation Messages .......................................................... 4
2 Available Escalations for Personnel Scheduling .......................................... 5
2.1 End of validity of a qualification (PNR.END_OF_QUALIFICATION) .................... 5
2.2 Absence created (FZ.INSERTED) ....................................................................... 7
2.3 Absence modified (FZ.UPDATED) ...................................................................... 8
2.4 Absence deleted (FZ.DELETED) ......................................................................... 9
PEP-ESK_82.docx Version: 1.0.23049 Page 3 of 9

PEP Escalation Messages
1 Overview: PEP Escalation Messages
Purpose
Application service for generating events and/or dispatching messages within HYDRA Personnel
Scheduling.
Implementation notes
You use the function package if:
 You wish to be informed in good time about the validity end date of a qualification assigned to an
employee, for example, in order to be able to schedule further training to renew the qualification.
 You wish to be informed when absence times are created, modified or deleted.
Integration
The escalation messages regarding personnel scheduling require the function package SIS-ESK
(escalation management: basis/framework) in order to be able to configure and, if necessary, forward the
escalations.
Features
 Escalations regarding personnel scheduling
o Notification before the validity end date of assigned qualifications
o Information about planned absences
PEP-ESK_82.docx Version: 1.0.23049 Page 4 of 9

|     |     |     |     | PEP Escalation Messages  |     |
| --- | --- | --- | --- | ------------------------ | --- |

2  Available Escalations for Personnel Scheduling
The present description describes the available escalations in PEP. If an escalation is to be activated, a
configuration must be created for it.
| 2.1  | End of validity of a qualification  |     |     |     |     |
| ---- | ----------------------------------- | --- | --- | --- | --- |
(PNR.END_OF_QUALIFICATION)
As regards the assignment of qualifications to personnel, it is possible to enter a validity end date. This
escalation can be used to send a notification up to 100 days before the end of validity, for example in
order to be able to plan further training for extending the qualification. The variable QUALPNR.DAUER in
combination with a condition is used to set how many days before the end of validity the notification is to
be sent:

In this example, the notification regarding the end of validity of the assigned qualification of a person is
generated 60 days before the validity end date.
The following placeholders are available for generating the message or for defining conditions:
| Event  |     | Identifiers  |     | Description  |     |
| ------ | --- | ------------ | --- | ------------ | --- |

| PEP-ESK_82.docx  |     | Version: 1.0.23049  |     |     | Page 5 of 9  |
| ---------------- | --- | ------------------- | --- | --- | ------------ |

|     |     |     |     | PEP Escalation Messages  |     |
| --- | --- | --- | --- | ------------------------ | --- |

| PNR.END_OF_QUALIFICATION  |     | PNR.FIR                  |     | Company                            |     |
| ------------------------- | --- | ------------------------ | --- | ---------------------------------- | --- |
|                           |     | PNR.PNR                  |     | Personnel number                   |     |
|                           |     | PNR.NAME                 |     | Name                               |     |
|                           |     | PNR.PNAME                |     | Last name                          |     |
|                           |     | PNR.PVNAME               |     | First name                         |     |
|                           |     | PNR.BER                  |     | Area                               |     |
|                           |     | PNR.KST                  |     | Cost center                        |     |
|                           |     | PNR.ABT                  |     | Department                         |     |
|                           |     | PNR.PKREIS               |     | Employee subgroup                  |     |
|                           |     | PNR.TAETIGKEIT           |     | Activity of the person             |     |
|                           |     | PNR.BESCHVERH            |     | Employment relationship            |     |
|                           |     | PNR.TEL:FIR              |     | Company phone                      |     |
|                           |     | PNR.EMAIL:FIR            |     | Company e-mail                     |     |
|                           |     | PNR.VGS:PNR              |     | Supervisor personnel number        |     |
|                           |     | QUAL.QUAL                |     | Qualification number               |     |
|                           |     | QUAL.BEZ                 |     | Description of qualification       |     |
|                           |     | QUAL.KAT                 |     | Qualification category             |     |
|                           |     | QUALPNR.DATB             |     | Qualification validity start date  |     |
|                           |     | QUALPNR.DATE             |     | Qualification validity end date    |     |
|                           |     | QUALPNR.DAUER            |     | Number of days until validity end  |     |
|                           |     | QUALPNR.WEITERB.DAT      |     | Date of planned further training   |     |
|                           |     | QUALPNR.WEITERB.ZEI      |     | Time of planned further training   |     |
|                           |     | QUALPNR.WEITERB.ERFOLGT  |     | Further training completed (Y/N)   |     |
|                           |     | QUALPNR.BEM:1            |     | Comment 1                          |     |
|                           |     | QUALPNR.BEM:2            |     | Comment 2                          |     |
|                           |     | QUALPNR.BEM:3            |     | Comment 3                          |     |
|                           |     | QUALPNR.VERWEIS          |     | Unambiguous record number          |     |

| PEP-ESK_82.docx  |     | Version: 1.0.23049  |     |     | Page 6 of 9  |
| ---------------- | --- | ------------------- | --- | --- | ------------ |

|     |     |     |     |     | PEP Escalation Messages  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

In the Message tab, the text for the message can be entered:

The escalation  PNR.END_OF_QUALIFICATION is  only  initiated  if there  is no subsequent
assignment (valid as from the next day) with the same qualification for an assigned qualification

with a validity end date.
| 2.2  | Absence created (FZ.INSERTED)  |     |     |     |     |     |
| ---- | ------------------------------ | --- | --- | --- | --- | --- |
The escalation FZ.INSERTED is generated if an absence was created. This escalation can be used, for
example, to notify the supervisor by e-mail.
The following placeholders are available for generating the message or for defining conditions:
| Event        |     | Identifiers  |     | Description       |     |     |
| ------------ | --- | ------------ | --- | ----------------- | --- | --- |
| FZ.INSERTED  |     | FZ.FIR       |     | Company           |     |     |
|              |     | FZ.PNR       |     | Personnel number  |     |     |
|              |     | FZ.NAME:PNR  |     | Name              |     |     |
|              |     | FZ.PNAME     |     | Last name         |     |     |
|              |     | FZ.PVORNAME  |     | First name        |     |     |
|              |     | PNR.BER      |     | Area              |     |     |
|              |     | PNR.KST      |     | Cost center       |     |     |
|              |     | PNR.ABT      |     | Department        |     |     |

| PEP-ESK_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 7 of 9  |
| ---------------- | --- | --- | ------------------- | --- | --- | ------------ |

|     |     |     |     |     | PEP Escalation Messages  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

|     |     | PNR.PKREIS        |     | Employee subgroup          |     |     |
| --- | --- | ----------------- | --- | -------------------------- | --- | --- |
|     |     | PNR.TAETIGKEIT    |     | Activity of the person     |     |     |
|     |     | PNR.BESCHVERH     |     | Employment relationship    |     |     |
|     |     | PNR.TEL:FIR       |     | Company phone              |     |     |
|     |     | PNR.EMAIL:FIR     |     | Company e-mail             |     |     |
|     |     | FZ.ENTLTMOD       |     | Absence payment            |     |     |
|     |     | FZ.BEZK:ENTLTMOD  |     | Absence abbreviation       |     |     |
|     |     | FZ.BEZL:ENTLTMOD  |     | Absence description        |     |     |
|     |     | FZ.KAT            |     | Absence category           |     |     |
|     |     | FZ.DAT:APPLY      |     | Request date               |     |     |
|     |     | FZ.ZEI:APPLY      |     | Request time               |     |     |
|     |     | FZ.DATB           |     | Start date                 |     |     |
|     |     | FZ.DATE           |     | End date                   |     |     |
|     |     | FZ.BEZL           |     | Comment                    |     |     |
|     |     | FZ.VERWEIS        |     | Unambiguous record number  |     |     |

| 2.3  | Absence modified (FZ.UPDATED)  |     |     |     |     |     |
| ---- | ------------------------------ | --- | --- | --- | --- | --- |
The escalation FZ.UPDATED is generated if an absence was modified. This escalation can be used, for
example, to notify the supervisor by e-mail.
The escalation FZ.UPDATED is only initiated if the period or the absence payment has changed
upon the modification of the absence for a person.

Available placeholders for generating the message or for defining conditions:
| Event       |     | Identifiers       |     | Description              |     |     |
| ----------- | --- | ----------------- | --- | ------------------------ | --- | --- |
| FZ.UPDATED  |     | FZ.FIR            |     | Company                  |     |     |
|             |     | FZ.PNR            |     | Personnel number         |     |     |
|             |     | FZ.NAME:PNR       |     | Name                     |     |     |
|             |     | FZ.PNAME          |     | Last name                |     |     |
|             |     | FZ.PVORNAME       |     | First name               |     |     |
|             |     | PNR.BER           |     | Area                     |     |     |
|             |     | PNR.KST           |     | Cost center              |     |     |
|             |     | PNR.ABT           |     | Department               |     |     |
|             |     | PNR.PKREIS        |     | Employee subgroup        |     |     |
|             |     | PNR.TAETIGKEIT    |     | Activity of the person   |     |     |
|             |     | PNR.BESCHVERH     |     | Employment relationship  |     |     |
|             |     | PNR.TEL:FIR       |     | Company phone            |     |     |
|             |     | PNR.EMAIL:FIR     |     | Company e-mail           |     |     |
|             |     | FZ.ENTLTMOD       |     | Absence payment          |     |     |
|             |     | FZ.BEZK:ENTLTMOD  |     | Absence abbreviation     |     |     |
|             |     | FZ.BEZL:ENTLTMOD  |     | Absence description      |     |     |
|             |     | FZ.KAT            |     | Absence category         |     |     |
|             |     | FZ.DAT:APPLY      |     | Request date             |     |     |
|             |     | FZ.ZEI:APPLY      |     | Request time             |     |     |
|             |     | FZ.DATB           |     | Start date               |     |     |
|             |     | FZ.DATE           |     | End date                 |     |     |

| PEP-ESK_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 8 of 9  |
| ---------------- | --- | --- | ------------------- | --- | --- | ------------ |

|     |     |     |     |     | PEP Escalation Messages  |     |
| --- | --- | --- | --- | --- | ------------------------ | --- |

|     |     | FZ.BEZL            |     | Comment                      |     |     |
| --- | --- | ------------------ | --- | ---------------------------- | --- | --- |
|     |     | FZ.VERWEIS         |     | Unambiguous record number    |     |     |
|     |     | FZ.ENTLTMODV       |     | Absence payment before       |     |     |
|     |     | FZ.BEZK:ENTLTMODV  |     | Absence abbreviation before  |     |     |
|     |     | FZ.BEZL:ENTLTMODV  |     | Absence description before   |     |     |
|     |     | FZ.KATV            |     | Absence category before      |     |     |
|     |     | FZ.DATBV           |     | Start date before            |     |     |
|     |     | FZ.DATEV           |     | End date before              |     |     |

| 2.4  | Absence deleted (FZ.DELETED)  |     |     |     |     |     |
| ---- | ----------------------------- | --- | --- | --- | --- | --- |
The escalation FZ.DELETED is generated if an absence is deleted. This escalation can be used, for
example, to notify the supervisor by e-mail.
The following placeholders are available for generating the message or for defining conditions:
| Event       |     | Identifiers       |     | Description                |     |     |
| ----------- | --- | ----------------- | --- | -------------------------- | --- | --- |
| FZ.DELETED  |     | FZ.FIR            |     | Company                    |     |     |
|             |     | FZ.PNR            |     | Personnel number           |     |     |
|             |     | FZ.NAME:PNR       |     | Name                       |     |     |
|             |     | FZ.PNAME          |     | Last name                  |     |     |
|             |     | FZ.PVORNAME       |     | First name                 |     |     |
|             |     | PNR.BER           |     | Area                       |     |     |
|             |     | PNR.KST           |     | Cost center                |     |     |
|             |     | PNR.ABT           |     | Department                 |     |     |
|             |     | PNR.PKREIS        |     | Employee subgroup          |     |     |
|             |     | PNR.TAETIGKEIT    |     | Activity of the person     |     |     |
|             |     | PNR.BESCHVERH     |     | Employment relationship    |     |     |
|             |     | PNR.TEL:FIR       |     | Company phone              |     |     |
|             |     | PNR.EMAIL:FIR     |     | Company e-mail             |     |     |
|             |     | FZ.ENTLTMOD       |     | Absence payment            |     |     |
|             |     | FZ.BEZK:ENTLTMOD  |     | Absence abbreviation       |     |     |
|             |     | FZ.BEZL:ENTLTMOD  |     | Absence description        |     |     |
|             |     | FZ.KAT            |     | Absence category           |     |     |
|             |     | FZ.DAT:APPLY      |     | Request date               |     |     |
|             |     | FZ.ZEI:APPLY      |     | Request time               |     |     |
|             |     | FZ.DATB           |     | Start date                 |     |     |
|             |     | FZ.DATE           |     | End date                   |     |     |
|             |     | FZ.BEZL           |     | Comment                    |     |     |
|             |     | FZ.VERWEIS        |     | Unambiguous record number  |     |     |

| PEP-ESK_82.docx  |     |     | Version: 1.0.23049  |     |     | Page 9 of 9  |
| ---------------- | --- | --- | ------------------- | --- | --- | ------------ |