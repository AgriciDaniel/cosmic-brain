Manual
QM Sub System Escalation
Messages
QMS-ESK 8.1
Version 1.1
Last changed on: 19.06.2020

QM Sub System Escalation Messages
Copyright
©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.
Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.
QMS-ESK_81.docx Version: 1.1.18468 Page 2 of 6

|     |     |     | QM Sub System Escalation Messages  |     |
| --- | --- | --- | ---------------------------------- | --- |

Contents
1  QM Sub System Escalation Messages ........................................................ 4
2  Available Escalations ................................................................................... 5
| 2.1  | Failure analysis criterion generated for an inspection order  |     |     |     |
| ---- | ------------------------------------------------------------- | --- | --- | --- |
(CPAUERR.INSERTED) ...................................... Error! Bookmark not defined.
2.2  Completed inspection reference (CPANUMP.COMPLETED) .............................. 5

| QMS-ESK_81.docx  |     | Version: 1.1.18468  |     | Page 3 of 6  |
| ---------------- | --- | ------------------- | --- | ------------ |

QM Sub System Escalation Messages
1 QM Sub System Escalation Messages
Purpose
HYDRA escalation management provides a framework of functions to forward in real time the events that
occurred or were recorded in HYDRA to individual users or user groups. During the process, escalation
management takes active steps to ensure users are notified.
After notification, escalation management monitors the times until acknowledgment by the recipients and
until the escalation is concluded. Escalations can be forwarded to other users or user groups during
processing.
Implementation Considerations
Use escalation management for active, real-time notification of specific events related to the QM
subsystem in order to prevent downtime and increase efficiency and productivity through rapid response.
Integration
The events / escalations triggered in the QM Subsystem are logged to the central escalation
management. This forms the framework for forwarding and following up on the events triggered.
To notify people, escalation management accesses both User Administration and HR Master Data stored
in the system. Notifications can be sent out as e-mails through integration with the local mail server.
Features
 Staging different escalation messages related to inspection recording in the QM subsystem
 Event configuration: configuration of order-related events
 Forwarding the detected events to the escalation framework.
QMS-ESK_81.docx Version: 1.1.18468 Page 4 of 6

|     |     |     | QM Sub System Escalation Messages  |     |
| --- | --- | --- | ---------------------------------- | --- |

2  Available Escalations
| 2.1  | Completed inspection reference  |     |     |     |
| ---- | ------------------------------- | --- | --- | --- |
(CPANUMP.COMPLETED)
An escalation is generated as soon as an inspection reference (e.g. inspection point) is completed. The
configuration can be set so that a notification is only executed, for example, if the inspection result is "fail"
(CPANUMP.STA == "NIO").
| Event                 |     | Identifiers      | Description                  |                      |
| --------------------- | --- | ---------------- | ---------------------------- | -------------------- |
| CPANUMP.ABSCHLIESSEN  |     | CPANUMP.RECTYP   | Data type                    |                      |
|                       |     | CPANUMP.BER      | Area                         |                      |
|                       |     | CPANUMP.PANNR    | Inspection requirement       |                      |
|                       |     | CPANUMP.EINTTYP  | Type of inspection resource  |                      |
|                       |     | CPANUMP.EINTNR   | Number                       | of  the  inspection  |
reference
|     |     | CPANUMP.STA    | Status               |     |
| --- | --- | -------------- | -------------------- | --- |
|     |     | CPANUMP.FU:1   | Quick user field 1   |     |
|     |     | CPANUMP.FU:2   | Quick user field 2   |     |
|     |     | CPANUMP.FU:3   | Quick user field 3   |     |
|     |     | CPANUMP.FU:4   | Quick user field 4   |     |
|     |     | CPANUMP.FU:5   | Quick user field 5   |     |
|     |     | CPANUMP.FU:6   | Quick user field 6   |     |
|     |     | CPANUMP.FU:7   | Quick user field 7   |     |
|     |     | CPANUMP.FU:8   | Quick user field 8   |     |
|     |     | CPANUMP.FU:9   | Quick user field 9   |     |
|     |     | CPANUMP.FU:10  | Quick user field 10  |     |
|     |     | CPANUMP.FU:11  | Quick user field 11  |     |
|     |     | CPANUMP.FU:12  | Quick user field 12  |     |
|     |     | CPANUMP.FU:13  | Quick user field 13  |     |
|     |     | CPANUMP.FU:14  | Quick user field 14  |     |
|     |     | CPAN.ANR       | Order                |     |
|     |     | CPAN.AGNR      | Operation            |     |
|     |     | CPAN.FU:1      | Quick user field 1   |     |
|     |     | CPAN.FU:2      | Quick user field 2   |     |
|     |     | CPAN.FU:3      | Quick user field 3   |     |
|     |     | CPAN.FU:4      | Quick user field 4   |     |
|     |     | CPAN.FU:5      | Quick user field 5   |     |
|     |     | CPAN.FU:6      | Quick user field 6   |     |

| QMS-ESK_81.docx  |     | Version: 1.1.18468  |     | Page 5 of 6  |
| ---------------- | --- | ------------------- | --- | ------------ |

|     |     |     | QM Sub System Escalation Messages  |     |
| --- | --- | --- | ---------------------------------- | --- |

| Event  |     | Identifiers  | Description           |     |
| ------ | --- | ------------ | --------------------- | --- |
|        |     | CPAN.FU:7    | Quick user field 7    |     |
|        |     | CPAN.FU:8    | Quick user field 8    |     |
|        |     | CPAN.FU:9    | Quick user field 9    |     |
|        |     | CPAN.FU:10   | Quick user field 10   |     |
|        |     | CPAN.FU:11   | Quick user field 11   |     |
|        |     | CPAN.FU:12   | Quick user field 12   |     |
|        |     | CPAN.FU:13   | Quick user field 13   |     |
|        |     | CPAN.FU:14   | Quick user field 14   |     |
|        |     | CPAN.ATK     | Article number        |     |
|        |     | CPAN.ATKIDX  | Drawing issue number  |     |
|        |     | CPAN.ATKBEZ  | Article designation   |     |

| QMS-ESK_81.docx  |     | Version: 1.1.18468  |     | Page 6 of 6  |
| ---------------- | --- | ------------------- | --- | ------------ |