Manual
Escalation Messages in Shop
Floor Scheduling
HLS-ESK 8.1
Version 1.1.23049
Last changed on: 01.09.2020

Escalation Messages in Shop Floor Scheduling
Copyright
©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.
Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.
HLS-ESK_81.docx Version: 1.1.23049 Page 2 of 9

Escalation Messages in Shop Floor Scheduling
Contents
1 Escalation Messages in Shop Floor Scheduling .......................................... 4
2 Available Escalations ................................................................................... 5
2.1 Operation has been planned (ANR.SCHEDULE) ................................................ 5
2.2 Operation has been rescheduled (ANR.RESCHEDULE) ..................................... 6
2.3 Operation has been deallocated (ANR.DEALLOCATE) ....................................... 8
HLS-ESK_81.docx Version: 1.1.23049 Page 3 of 9

Escalation Messages in Shop Floor Scheduling
1 Escalation Messages in Shop Floor Scheduling
Purpose
HYDRA escalation management provides a framework of functions for real-time forwarding of recorded or
live events in HYDRA to individual users or user groups. During the process, escalation management
takes active steps to ensure users are notified.
After notification, escalation management monitors times until acknowledgment by the recipients and until
the escalation is concluded. Escalations can be forwarded to other users or user groups during
processing.
Implementation Notes
You use escalation management when you would like to have active, real-time notification of specific
events from the scheduling in the HYDRA shop floor scheduling in order to prevent failures and to
increase efficiency and productivity through rapid response.
Integration
The events/escalations are posted to central escalation management. This forms the framework for
forwarding and following up on the events triggered.
For notification of people, escalation management accesses both User administration and the HR master
data stored in the system. Notifications can be sent out as e-mails by integrating the local mail server into
the system.
Features
 Provision of escalation postings from the scheduling, e.g. operation scheduled, operation
deallocated, operation rescheduled.
 Configuration of the events
 Forwarding of the detected events to the escalation framework.
HLS-ESK_81.docx Version: 1.1.23049 Page 4 of 9

    Escalation Messages in Shop Floor Scheduling

2  Available Escalations
The following escalations are triggered when saving a schedule/plan.
2.1  Operation has been planned (ANR.SCHEDULE)
The event is triggered for operations which have been planned for a workplace or replanned to another
workplace in the graphic planning board.
| Event  | Identifiers  |     | Description  |     |     |     |
| ------ | ------------ | --- | ------------ | --- | --- | --- |
ANR.ANR
| ANR.SCHEDULE  |            |     | Order + operation  |     |     |     |
| ------------- | ---------- | --- | ------------------ | --- | --- | --- |
|               | ANR.AUNR   |     | Order              |     |     |     |
|               | ANR.AFOLG  |     | Sequence           |     |     |     |
|               | ANR.AGNR   |     | Operation          |     |     |     |

|     | ANR.SPLNR   |     | Split number                           |     |     |     |
| --- | ----------- | --- | -------------------------------------- | --- | --- | --- |
|     | ANR.AART    |     | Order type                             |     |     |     |
|     | ANR.AUGRP   |     | Order group (order header)             |     |     |     |
|     | ANR.DISP    |     | MRP controller (order header)          |     |     |     |
|     | ANR.KDBEZ   |     | Customer name (order header)           |     |     |     |
|     | ANR.ATK     |     | Articles of the operation              |     |     |     |
|     | ANR.ATKBEZ  |     | Article designation/name (transferred  |     |     |     |
from the order header to the OP)
|     | ANR.DATFB  |     | Earliest start (date) of the OP  |     |     |     |
| --- | ---------- | --- | -------------------------------- | --- | --- | --- |

|     | ANR.ZEIFB  |     | Earliest  | start  (time)  | of  the  OP  | in  |
| --- | ---------- | --- | --------- | -------------- | ------------ | --- |
seconds since midnight
|     | ANR.DATSE  |     | Latest end (date) of the OP  |         |              |     |
| --- | ---------- | --- | ---------------------------- | ------- | ------------ | --- |
|     | ANR.ZEISE  |     | Latest  end                  | (time)  | of  the  OP  | in  |
seconds since midnight
|     | ANR.SGR:GUTP  |     | Target  quantity  | of  | the  operation  |     |
| --- | ------------- | --- | ----------------- | --- | --------------- | --- |
(primary quantity unit)
|     | ANR.RES:WNR  |     | Operation tool                         |     |     |     |
| --- | ------------ | --- | -------------------------------------- | --- | --- | --- |
|     | ANR.RUEZ     |     | Static setup time of the operation in  |     |     |     |
seconds
|     | ANR.RUEZ:ZUSCHL  |     | Dyn. setup time of the operation in  |     |     |     |
| --- | ---------------- | --- | ------------------------------------ | --- | --- | --- |
seconds
|     | ANR.ABRZ  |     | Retooling  | time  of  the  | operation  | in  |
| --- | --------- | --- | ---------- | -------------- | ---------- | --- |
seconds
|     | ANR.VERARBCODE  |     | Processing code  |     |     |     |
| --- | --------------- | --- | ---------------- | --- | --- | --- |

|     | ANR.SZY  |     | Target  cycle  | of  the  | operation  | in  |
| --- | -------- | --- | -------------- | -------- | ---------- | --- |
seconds/1000 cycles

|     | ANR.TLG  |     | Partitioning of the operation  |     |     |     |
| --- | -------- | --- | ------------------------------ | --- | --- | --- |

| HLS-ESK_81.docx  |     | Version: 1.1.23049  |     |     |     | Page 5 of 9  |
| ---------------- | --- | ------------------- | --- | --- | --- | ------------ |

    Escalation Messages in Shop Floor Scheduling

| Event  | Identifiers    |     | Description  |            |                   |     |
| ------ | -------------- | --- | ------------ | ---------- | ----------------- | --- |
|        | ANR.OPT:PKENN  |     | Control      | indicator  | of  the  current  |     |
operation status
S: not planned/otherwise
V: prepared/planned
L: logged on
U: interrupted
|     | ANR.DATB  |     | Planned start date                   |     |     |     |
| --- | --------- | --- | ------------------------------------ | --- | --- | --- |
|     | ANR.ZEIB  |     | Planned start time in seconds since  |     |     |     |
midnight
|     | ANR.DATE  |     | Planned end date  |                |          |        |
| --- | --------- | --- | ----------------- | -------------- | -------- | ------ |
|     | ANR.ZEIE  |     | Planned           | end  time  in  | seconds  | since  |
midnight
|     | ANR.OPT:PLAN  |     | "Planned" flag  |     |     |     |
| --- | ------------- | --- | --------------- | --- | --- | --- |
M = planned for workplace
|     |     |     | G  =  deallocated  | (in  | the  pool  | of  |
| --- | --- | --- | ------------------ | ---- | ---------- | --- |
groups)
|     | ANR.MGRP  |     | Group  of  | the  workplace  | where  | the  |
| --- | --------- | --- | ---------- | --------------- | ------ | ---- |
operation is planned
|     | ANR.MNR  |     | Workplace  | where  the  | operation  | is  |
| --- | -------- | --- | ---------- | ----------- | ---------- | --- |
planned
|     | ANR.MNR:PREV     |     | Workplace prior to replanning        |     |     |     |
| --- | ---------------- | --- | ------------------------------------ | --- | --- | --- |
|     | ANR.FIX          |     | Operation fixed                      |     |     |     |
|     | ANR.FIX:PREV     |     | Operation fixed prior to replanning  |     |     |     |
|     | ANR.VERWEIS:FERT |     | Production variant (reference)       |     |     |     |
VAR

2.2  Operation has been rescheduled (ANR.RESCHEDULE)
The event is triggered for operations that have been rescheduled in the graphic planning board. The
event is also triggered if the operation is fixed or unfixed without rescheduling.
Escalations are not triggered for operations that are logged on, even if the planned end date is
updated automatically.

| Event  | Identifiers  |     | Description  |     |     |     |
| ------ | ------------ | --- | ------------ | --- | --- | --- |
ANR.ANR
| ANR.RESCHEDULE  |            |     | Order + operation  |     |     |     |
| --------------- | ---------- | --- | ------------------ | --- | --- | --- |
|                 | ANR.AUNR   |     | Order              |     |     |     |
|                 | ANR.AFOLG  |     | Sequence           |     |     |     |
|                 | ANR.AGNR   |     | Operation          |     |     |     |
|                 | ANR.SPLNR  |     | Split number       |     |     |     |

| HLS-ESK_81.docx  |     | Version: 1.1.23049  |     |     |     | Page 6 of 9  |
| ---------------- | --- | ------------------- | --- | --- | --- | ------------ |

    Escalation Messages in Shop Floor Scheduling

|     | ANR.AART   |     | Order type                     |                     |       |
| --- | ---------- | --- | ------------------------------ | ------------------- | ----- |
|     | ANR.AUGRP  |     | Order group (order header)     |                     |       |
|     | ANR.DISP   |     | MRP controller (order header)  |                     |       |
|     | ANR.KDBEZ  |     | Customer                       | name  (transferred  | from  |
the order header to the OP)
|     | ANR.ATK     |     | Articles of the operation   |                   |     |
| --- | ----------- | --- | --------------------------- | ----------------- | --- |
|     | ANR.ATKBEZ  |     | Article                     | designation/name  |     |
(transferred from the order header
to the OP)
|     | ANR.DATFB  |     | Earliest start (date) of the OP     |     |     |
| --- | ---------- | --- | ----------------------------------- | --- | --- |
|     | ANR.ZEIFB  |     | Earliest start (time) of the OP in  |     |     |
seconds since midnight
|     | ANR.DATSE  |     | Latest end (date) of the OP  |                  |         |
| --- | ---------- | --- | ---------------------------- | ---------------- | ------- |
|     | ANR.ZEISE  |     | Latest  end                  | (time)  of  the  | OP  in  |
seconds since midnight
|     | ANR.SGR:GUTP  |     | Target  quantity  | of  the  | operation  |
| --- | ------------- | --- | ----------------- | -------- | ---------- |
(primary quantity unit)
|     | ANR.RES:WNR  |     | Operation tool                      |     |     |
| --- | ------------ | --- | ----------------------------------- | --- | --- |
|     | ANR.RUEZ     |     | Static setup time of the operation  |     |     |
in seconds
|     | ANR.RUEZ:ZUSCHL  |     | Dyn. setup time of the operation in  |     |     |
| --- | ---------------- | --- | ------------------------------------ | --- | --- |
seconds
|     | ANR.ABRZ  |     | Retooling time of the operation in  |     |     |
| --- | --------- | --- | ----------------------------------- | --- | --- |
seconds
|     | ANR.VERARBCODE  |     | Processing code  |                     |     |
| --- | --------------- | --- | ---------------- | ------------------- | --- |
|     | ANR.SZY         |     | Target  cycle    | of  the  operation  | in  |
seconds/1000 cycles
|     | ANR.TLG        |     | Partitioning of the operation  |                     |          |
| --- | -------------- | --- | ------------------------------ | ------------------- | -------- |
|     | ANR.OPT:PKENN  |     | Control                        | indicator  of  the  | current  |
operation status
S: not planned/otherwise
V: prepared/planned
L: logged on
U: interrupted
|     | ANR.DATB  |     | Planned start date                   |     |     |
| --- | --------- | --- | ------------------------------------ | --- | --- |
|     | ANR.ZEIB  |     | Planned start time in seconds since  |     |     |
midnight
|     | ANR.DATE  |     | Planned end date                   |     |     |
| --- | --------- | --- | ---------------------------------- | --- | --- |
|     | ANR.ZEIE  |     | Planned end time in seconds since  |     |     |
midnight
|     | ANR.OPT:PLAN  |     | "Planned" flag  |     |     |
| --- | ------------- | --- | --------------- | --- | --- |
M = planned for workplace
|     |     |     | G  =  deallocated  | (in  the  | pool  of  |
| --- | --- | --- | ------------------ | --------- | --------- |
groups)

| HLS-ESK_81.docx  |     | Version: 1.1.23049  |     |     | Page 7 of 9  |
| ---------------- | --- | ------------------- | --- | --- | ------------ |

    Escalation Messages in Shop Floor Scheduling

|     | ANR.MGRP  |     | Group of the workplace where the  |     |     |     |
| --- | --------- | --- | --------------------------------- | --- | --- | --- |
operation is planned
|     | ANR.MNR  |     | Workplace where the operation is  |     |     |     |
| --- | -------- | --- | --------------------------------- | --- | --- | --- |
planned
|     | ANR.MNR:PREV  |     | Workplace prior to replanning  |     |     |     |
| --- | ------------- | --- | ------------------------------ | --- | --- | --- |
|     | ANR.FIX       |     | Operation fixed                |     |     |     |

|     | ANR.FIX:PREV         |     | Operation fixed prior to replanning  |     |     |     |
| --- | -------------------- | --- | ------------------------------------ | --- | --- | --- |
|     | ANR.VERWEIS:FERTVAR  |     | Production variant (reference)       |     |     |     |

2.3  Operation has been deallocated (ANR.DEALLOCATE)
The event is triggered for operations which have been deallocated in the graphic planning board.
| Event           | Identifiers  |     | Description                          |     |     |     |
| --------------- | ------------ | --- | ------------------------------------ | --- | --- | --- |
| ANR.DEALLOCATE  | ANR.ANR      |     | Order + operation                    |     |     |     |
|                 | ANR.AUNR     |     | Order                                |     |     |     |
|                 | ANR.AFOLG    |     | Sequence                             |     |     |     |
|                 | ANR.AGNR     |     | Operation                            |     |     |     |
|                 | ANR.SPLNR    |     | Split number                         |     |     |     |
|                 | ANR.AART     |     | Order type                           |     |     |     |
|                 | ANR.AUGRP    |     | Order group (order header)           |     |     |     |
|                 | ANR.DISP     |     | MRP controller (order header)        |     |     |     |
|                 | ANR.KDBEZ    |     | Customer name (transferred from the  |     |     |     |
order header to the OP)
|     | ANR.ATK     |     | Articles of the operation              |     |     |     |
| --- | ----------- | --- | -------------------------------------- | --- | --- | --- |
|     | ANR.ATKBEZ  |     | Article designation/name (transferred  |     |     |     |
from the order header to the OP)
|     | ANR.DATFB  |     | Earliest start (date) of the OP  |                |              |     |
| --- | ---------- | --- | -------------------------------- | -------------- | ------------ | --- |
|     | ANR.ZEIFB  |     | Earliest                         | start  (time)  | of  the  OP  | in  |
seconds since midnight
|     | ANR.DATSE  |     | Latest end (date) of the OP  |         |              |     |
| --- | ---------- | --- | ---------------------------- | ------- | ------------ | --- |
|     | ANR.ZEISE  |     | Latest  end                  | (time)  | of  the  OP  | in  |
seconds since midnight
|     | ANR.SGR:GUTP  |     | Target  quantity  | of  | the  operation  |     |
| --- | ------------- | --- | ----------------- | --- | --------------- | --- |
(primary quantity unit)
|     | ANR.RES:WNR  |     | Operation tool                         |     |     |     |
| --- | ------------ | --- | -------------------------------------- | --- | --- | --- |
|     | ANR.RUEZ     |     | Static setup time of the operation in  |     |     |     |
seconds
|     | ANR.RUEZ:ZUSCHL  |     | Dyn. setup time of the operation in  |     |     |     |
| --- | ---------------- | --- | ------------------------------------ | --- | --- | --- |
seconds

| HLS-ESK_81.docx  |     | Version: 1.1.23049  |     |     |     | Page 8 of 9  |
| ---------------- | --- | ------------------- | --- | --- | --- | ------------ |

    Escalation Messages in Shop Floor Scheduling

| Event  | Identifiers  |     | Description  |           |                 |     |
| ------ | ------------ | --- | ------------ | --------- | --------------- | --- |
|        | ANR.ABRZ     |     | Retooling    | time  of  | the  operation  | in  |
seconds
|     | ANR.VERARBCODE  |     | Processing code  |                 |            |     |
| --- | --------------- | --- | ---------------- | --------------- | ---------- | --- |
|     | ANR.SZY         |     | Target           | cycle  of  the  | operation  | in  |
seconds/1000 cycles
|     | ANR.TLG        |     | Partitioning of the operation  |            |                   |     |
| --- | -------------- | --- | ------------------------------ | ---------- | ----------------- | --- |
|     | ANR.OPT:PKENN  |     |                                |            |                   |     |
|     |                |     | Control                        | indicator  | of  the  current  |     |
operation status
S: not planned/otherwise
V: prepared/planned
L: logged on
U: interrupted
|     | ANR.DATB  |     | Planned start date                   |     |     |     |
| --- | --------- | --- | ------------------------------------ | --- | --- | --- |
|     | ANR.ZEIB  |     | Planned start time in seconds since  |     |     |     |
midnight

|     | ANR.DATE  |     | Planned end date  |                |          |        |
| --- | --------- | --- | ----------------- | -------------- | -------- | ------ |
|     | ANR.ZEIE  |     | Planned           | end  time  in  | seconds  | since  |
midnight
|     | ANR.OPT:PLAN  |     | "Planned" flag  |     |     |     |
| --- | ------------- | --- | --------------- | --- | --- | --- |
M = planned for workplace
|     |     |     | G  =  deallocated  | (in  | the  pool  | of  |
| --- | --- | --- | ------------------ | ---- | ---------- | --- |
groups)
|     | ANR.MGRP  |     | Group  of  | the  workplace  | where  | the  |
| --- | --------- | --- | ---------- | --------------- | ------ | ---- |
operation is planned
|     | ANR.MNR  |     | Workplace  | where  the  | operation  | is  |
| --- | -------- | --- | ---------- | ----------- | ---------- | --- |
planned
|     | ANR.MNR:PREV  |     | Workplace prior to replanning  |     |     |     |
| --- | ------------- | --- | ------------------------------ | --- | --- | --- |
|     | ANR.FIX       |     | Operation fixed                |     |     |     |

|     | ANR.FIX:PREV     |     | Operation fixed prior to replanning  |     |     |     |
| --- | ---------------- | --- | ------------------------------------ | --- | --- | --- |
|     | ANR.VERWEIS:FERT |     | Production variant (reference)       |     |     |     |
VAR

| HLS-ESK_81.docx  |     | Version: 1.1.23049  |     |     |     | Page 9 of 9  |
| ---------------- | --- | ------------------- | --- | --- | --- | ------------ |