Manual
PMV Escalation Messages
PMV-ESK 8.1
Version 1.0.23049
Last changed on: 02.09.2020

PMV Escalation Messages
Copyright
©Copyright 2016 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.
Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.
PMV-ESK_81.docx Version: 1.0.23049 Page 2 of 6

|     |     |     | PMV Escalation Messages  |     |
| --- | --- | --- | ------------------------ | --- |

Contents
1  Overview of Escalation Messages for Gage Management .......................... 4
2  Available Escalations ................................................................................... 5
2.1  Maintenance limit exceeded (RESWART.LIMIT_EXCEEDED) ............................ 5
2.2  Resource has been created automatically. (RES.INSERT_AUTO) ...................... 5
2.3  Resource status has changed (RES.STATUS_CHANGED) ................................ 5
2.4  Maintenance has been reset for resource (RES.MAINTENANCE_RESET) ........ 6
| 2.5  | Measure/comment has been entered for resource  |     |     |     |
| ---- | ---------------------------------------------- | --- | --- | --- |
(RES.REGISTER_MEASURE) ............................................................................ 6

| PMV-ESK_81.docx  |     | Version: 1.0.23049  |     | Page 3 of 6  |
| ---------------- | --- | ------------------- | --- | ------------ |

PMV Escalation Messages
1 Overview of Escalation Messages for Gage Management
Purpose
HYDRA escalation management provides a framework of functions that can be used to forward events
that occur or were recorded in HYDRA to individual users or user groups in real time. The function of
escalation management is to take active steps to ensure users are notified.
After notification, escalation management monitors times until acknowledgment by the recipients and until
escalation is concluded. Escalations can be forwarded to other users or user groups during processing.
Implementation considerations
You use escalation management if you would like to have active, real-time notification of specific events
in the gage management / resource environment so that you can react early enough to start the
calibration of gages / maintenance of ressources.
Integration
The events/ escalations already triggered in the PMV environment are posted to central escalation
management. This forms the framework used to forward the events triggered and to be able to follow up
on them.
To notify people, escalation management accesses both User administration as well as the HR master
data stored in the system. Notifications can be sent out as e-mails by integrating the local mail server into
the system.
Features
 Provision of various escalation messages in the gage management / resource environment such
as, for example, calibration / maintenance limits exceeded, calibration / maintenance reset or
gage resource status changed.
 Forwarding of the detected event to the escalation framework.
PMV-ESK_81.docx Version: 1.0.23049 Page 4 of 6

|     |     |     |     | PMV Escalation Messages  |     |
| --- | --- | --- | --- | ------------------------ | --- |

2  Available Escalations
| 2.1  | Maintenance limit exceeded (RESWART.LIMIT_EXCEEDED)  |     |     |     |     |
| ---- | ---------------------------------------------------- | --- | --- | --- | --- |
The cyclic program for maintenance monitoring triggers an escalation as soon as a maintenance limit has
been exceeded.
| Event                   |     | IDs             |     | Description                  |     |
| ----------------------- | --- | --------------- | --- | ---------------------------- | --- |
| RESWART.LIMIT_EXCEEDED  |     | RESWART.RESTYP  |     | Resource type                |     |
|                         |     | RESWART.RES     |     | Resource no.                 |     |
|                         |     | RESWART.BEZ     |     | Maintenance                  |     |
|                         |     | RESWART.WARTKL  |     | Class                        |     |
|                         |     | RESWART.WART:N  |     | Value of next maintenance    |     |
|                         |     | RESWART.WART:I  |     | Actual value                 |     |
|                         |     | RESWART.WARTNR  |     | Achieved threshold: 1, 2, 3  |     |
|                         |     | RESWART.ART     |     | Maintenance type             |     |

| 2.2  | Resource has been created automatically.  |     |     |     |     |
| ---- | ----------------------------------------- | --- | --- | --- | --- |
(RES.INSERT_AUTO)
This event is triggered if a component is assigned as production resource and tool to an operation, this
component does not yet exist in HYDRA-WRM and the "automatic creation" option is enabled for the
resource type in HYDRA-WRM.
| Event            |     | IDs      |     | Description    |     |
| ---------------- | --- | -------- | --- | -------------- | --- |
| RES.INSERT_AUTO  |     | RES.TYP  |     | Resource type  |     |
|                  |     | RES.RES  |     | Resource no.   |     |

| 2.3  | Resource status has changed (RES.STATUS_CHANGED)  |     |     |     |     |
| ---- | ------------------------------------------------- | --- | --- | --- | --- |
This event is triggered every time the status of a resource changes.
| Event               |     | IDs         |     | Description      |     |
| ------------------- | --- | ----------- | --- | ---------------- | --- |
| RES.STATUS_CHANGED  |     | RES.RESTYP  |     | Resource type    |     |
|                     |     | RES.RES     |     | Resource no.     |     |
|                     |     | RES.RESSTA  |     | Resource status  |     |

| PMV-ESK_81.docx  |     | Version: 1.0.23049  |     |     | Page 5 of 6  |
| ---------------- | --- | ------------------- | --- | --- | ------------ |

|     |     |     |     | PMV Escalation Messages  |     |
| --- | --- | --- | --- | ------------------------ | --- |

| 2.4  | Maintenance has been reset for resource  |     |     |     |     |
| ---- | ---------------------------------------- | --- | --- | --- | --- |
(RES.MAINTENANCE_RESET)
This event is triggered every time a resource maintenance is reset.
| Event                  |     | IDs              |     | Description         |     |
| ---------------------- | --- | ---------------- | --- | ------------------- | --- |
| RES.MAINTENANCE_RESET  |     | RES.TYP          |     | Resource type       |     |
|                        |     | RES.RES          |     | Resource no.        |     |
|                        |     | RES.BEM          |     | Comment             |     |
|                        |     | RESWART.VERWEIS  |     | Maintenance number  |     |

Please note
This escalation supports the additional placeholders MSGPRIO, MSGCLASS and MSGRCV. These
placeholders are described in the basic documentation dealing with escalations.
| 2.5  | Measure/comment has been entered for resource  |     |     |     |     |
| ---- | ---------------------------------------------- | --- | --- | --- | --- |
(RES.REGISTER_MEASURE)
This event is triggered every time a measure/comment is entered for a resource.
| Event                 |     | IDs         |     | Description            |     |
| --------------------- | --- | ----------- | --- | ---------------------- | --- |
| RES.REGISTER_MEASURE  |     | RES.TYP     |     | Resource type          |     |
|                       |     | RES.RES     |     | Resource no.           |     |
|                       |     | RES.BEM     |     | Comment                |     |
|                       |     | RES.MASSNR  |     | Number of the measure  |     |

Please note
This escalation supports the additional placeholders MSGPRIO, MSGCLASS and MSGRCV. These
placeholders are described in the basic documentation dealing with escalations.

| PMV-ESK_81.docx  |     | Version: 1.0.23049  |     |     | Page 6 of 6  |
| ---------------- | --- | ------------------- | --- | --- | ------------ |