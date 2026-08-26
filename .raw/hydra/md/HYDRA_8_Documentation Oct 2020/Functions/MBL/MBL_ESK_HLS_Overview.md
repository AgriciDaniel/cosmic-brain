|     |     |     |     |     |     | Available Escalations  |     |
| --- | --- | --- | --- | --- | --- | ---------------------- | --- |

1  Available Escalations
The following escalations are triggered when saving a schedule/plan.
| 1.1  | Operation has been planned (ANR.SCHEDULE)  |     |     |     |     |     |     |
| ---- | ------------------------------------------ | --- | --- | --- | --- | --- | --- |
The event is triggered for operations which have been planned for a workplace or replanned to another
workplace in the graphic planning board.
| Event         |     | Identifiers  |     | Description        |     |     |     |
| ------------- | --- | ------------ | --- | ------------------ | --- | --- | --- |
| ANR.SCHEDULE  |     | ANR.ANR      |     | Order + operation  |     |     |     |
|               |     |              |     | Order              |     |     |     |
ANR.AUNR
|     |     | ANR.AFOLG   |     | Sequence                               |     |     |     |
| --- | --- | ----------- | --- | -------------------------------------- | --- | --- | --- |
|     |     | ANR.AGNR    |     | Operation                              |     |     |     |
|     |     | ANR.SPLNR   |     | Split number                           |     |     |     |
|     |     | ANR.AART    |     | Order type                             |     |     |     |
|     |     | ANR.AUGRP   |     | Order group (order header)             |     |     |     |
|     |     | ANR.DISP    |     | MRP controller (order header)          |     |     |     |
|     |     | ANR.KDBEZ   |     | Customer name (order header)           |     |     |     |
|     |     | ANR.ATK     |     | Articles of the operation              |     |     |     |
|     |     | ANR.ATKBEZ  |     | Article designation/name (transferred  |     |     |     |
from the order header to the OP)
|     |     | ANR.DATFB  |     | Earliest start (date) of the OP  |                |              |     |
| --- | --- | ---------- | --- | -------------------------------- | -------------- | ------------ | --- |
|     |     | ANR.ZEIFB  |     | Earliest                         | start  (time)  | of  the  OP  | in  |
seconds since midnight
|     |     | ANR.DATSE  |     | Latest end (date) of the OP  |         |              |     |
| --- | --- | ---------- | --- | ---------------------------- | ------- | ------------ | --- |
|     |     | ANR.ZEISE  |     | Latest  end                  | (time)  | of  the  OP  | in  |
seconds since midnight
|     |     | ANR.SGR:GUTP  |     | Target  quantity  | of  | the  operation  |     |
| --- | --- | ------------- | --- | ----------------- | --- | --------------- | --- |
(primary quantity unit)
|     |     | ANR.RES:WNR  |     | Operation tool                         |     |     |     |
| --- | --- | ------------ | --- | -------------------------------------- | --- | --- | --- |
|     |     | ANR.RUEZ     |     | Static setup time of the operation in  |     |     |     |
seconds
|     |     | ANR.RUEZ:ZUSCHL  |     | Dyn. setup time of the operation in  |     |     |     |
| --- | --- | ---------------- | --- | ------------------------------------ | --- | --- | --- |
seconds
|     |     | ANR.ABRZ  |     | Retooling  | time  of  the  | operation  | in  |
| --- | --- | --------- | --- | ---------- | -------------- | ---------- | --- |
seconds
|     |     | ANR.VERARBCODE  |     | Processing code  |          |            |     |
| --- | --- | --------------- | --- | ---------------- | -------- | ---------- | --- |
|     |     | ANR.SZY         |     | Target  cycle    | of  the  | operation  | in  |
seconds/1000 cycles
|     |     | ANR.TLG  |     | Partitioning of the operation  |     |     |     |
| --- | --- | -------- | --- | ------------------------------ | --- | --- | --- |

| MBL_ESK_HLS_Overview.docx  |     |     | Version: 1.1.17599  |     |     |     | Page 1 of 5  |
| -------------------------- | --- | --- | ------------------- | --- | --- | --- | ------------ |

|     |     |     |     |     |     | Available Escalations  |     |
| --- | --- | --- | --- | --- | --- | ---------------------- | --- |

| Event  |     | Identifiers    |     | Description  |            |                   |     |
| ------ | --- | -------------- | --- | ------------ | ---------- | ----------------- | --- |
|        |     | ANR.OPT:PKENN  |     | Control      | indicator  | of  the  current  |     |
operation status
S: not planned/otherwise
V: prepared/planned
L: logged on
U: interrupted
|     |     | ANR.DATB  |     | Planned start date                   |     |     |     |
| --- | --- | --------- | --- | ------------------------------------ | --- | --- | --- |
|     |     | ANR.ZEIB  |     | Planned start time in seconds since  |     |     |     |
midnight
|     |     | ANR.DATE  |     | Planned end date  |                |          |        |
| --- | --- | --------- | --- | ----------------- | -------------- | -------- | ------ |
|     |     | ANR.ZEIE  |     | Planned           | end  time  in  | seconds  | since  |
midnight
|     |     | ANR.OPT:PLAN  |     | "Planned" flag  |     |     |     |
| --- | --- | ------------- | --- | --------------- | --- | --- | --- |
M = planned for workplace
|     |     |     |     | G  =  deallocated  | (in  | the  pool  | of  |
| --- | --- | --- | --- | ------------------ | ---- | ---------- | --- |
groups)
|     |     | ANR.MGRP  |     | Group  of  | the  workplace  | where  | the  |
| --- | --- | --------- | --- | ---------- | --------------- | ------ | ---- |
operation is planned
|     |     | ANR.MNR  |     | Workplace  | where  the  | operation  | is  |
| --- | --- | -------- | --- | ---------- | ----------- | ---------- | --- |
planned
|     |     | ANR.MNR:PREV     |     | Workplace prior to replanning        |     |     |     |
| --- | --- | ---------------- | --- | ------------------------------------ | --- | --- | --- |
|     |     | ANR.FIX          |     | Operation fixed                      |     |     |     |
|     |     | ANR.FIX:PREV     |     | Operation fixed prior to replanning  |     |     |     |
|     |     | ANR.VERWEIS:FERT |     | Production variant (reference)       |     |     |     |
VAR

| 1.2  | Operation has been rescheduled (ANR.RESCHEDULE)  |     |     |     |     |     |     |
| ---- | ------------------------------------------------ | --- | --- | --- | --- | --- | --- |
The event is triggered for operations that have been rescheduled in the graphic planning board. The
event is also triggered if the operation is fixed or unfixed without rescheduling.
Escalations are not triggered for operations that are logged on, even if the planned end date is
updated automatically.

| Event  |     | Identifiers  |     | Description  |     |     |     |
| ------ | --- | ------------ | --- | ------------ | --- | --- | --- |
ANR.ANR
| ANR.RESCHEDULE  |     |            |     | Order + operation  |     |     |     |
| --------------- | --- | ---------- | --- | ------------------ | --- | --- | --- |
|                 |     | ANR.AUNR   |     | Order              |     |     |     |
|                 |     | ANR.AFOLG  |     | Sequence           |     |     |     |
|                 |     | ANR.AGNR   |     | Operation          |     |     |     |
|                 |     | ANR.SPLNR  |     | Split number       |     |     |     |

| MBL_ESK_HLS_Overview.docx  |     |     | Version: 1.1.17599  |     |     |     | Page 2 of 5  |
| -------------------------- | --- | --- | ------------------- | --- | --- | --- | ------------ |

|     |     |     |     |     | Available Escalations  |     |
| --- | --- | --- | --- | --- | ---------------------- | --- |

|     |     | ANR.AART   |     | Order type                     |                     |       |
| --- | --- | ---------- | --- | ------------------------------ | ------------------- | ----- |
|     |     | ANR.AUGRP  |     | Order group (order header)     |                     |       |
|     |     | ANR.DISP   |     | MRP controller (order header)  |                     |       |
|     |     | ANR.KDBEZ  |     | Customer                       | name  (transferred  | from  |
the order header to the OP)
|     |     | ANR.ATK     |     | Articles of the operation   |                   |     |
| --- | --- | ----------- | --- | --------------------------- | ----------------- | --- |
|     |     | ANR.ATKBEZ  |     | Article                     | designation/name  |     |
(transferred from the order header
to the OP)
|     |     | ANR.DATFB  |     | Earliest start (date) of the OP     |     |     |
| --- | --- | ---------- | --- | ----------------------------------- | --- | --- |
|     |     | ANR.ZEIFB  |     | Earliest start (time) of the OP in  |     |     |
seconds since midnight
|     |     | ANR.DATSE  |     | Latest end (date) of the OP  |                  |         |
| --- | --- | ---------- | --- | ---------------------------- | ---------------- | ------- |
|     |     | ANR.ZEISE  |     | Latest  end                  | (time)  of  the  | OP  in  |
seconds since midnight
|     |     | ANR.SGR:GUTP  |     | Target  quantity  | of  the  | operation  |
| --- | --- | ------------- | --- | ----------------- | -------- | ---------- |
(primary quantity unit)
|     |     | ANR.RES:WNR  |     | Operation tool                      |     |     |
| --- | --- | ------------ | --- | ----------------------------------- | --- | --- |
|     |     | ANR.RUEZ     |     | Static setup time of the operation  |     |     |
in seconds
|     |     | ANR.RUEZ:ZUSCHL  |     | Dyn. setup time of the operation in  |     |     |
| --- | --- | ---------------- | --- | ------------------------------------ | --- | --- |
seconds
|     |     | ANR.ABRZ  |     | Retooling time of the operation in  |     |     |
| --- | --- | --------- | --- | ----------------------------------- | --- | --- |
seconds
|     |     | ANR.VERARBCODE  |     | Processing code  |                     |     |
| --- | --- | --------------- | --- | ---------------- | ------------------- | --- |
|     |     | ANR.SZY         |     | Target  cycle    | of  the  operation  | in  |
seconds/1000 cycles
|     |     | ANR.TLG        |     | Partitioning of the operation  |                     |          |
| --- | --- | -------------- | --- | ------------------------------ | ------------------- | -------- |
|     |     | ANR.OPT:PKENN  |     | Control                        | indicator  of  the  | current  |
operation status
S: not planned/otherwise
V: prepared/planned
L: logged on
U: interrupted
|     |     | ANR.DATB  |     | Planned start date                   |     |     |
| --- | --- | --------- | --- | ------------------------------------ | --- | --- |
|     |     | ANR.ZEIB  |     | Planned start time in seconds since  |     |     |
midnight
|     |     | ANR.DATE  |     | Planned end date                   |     |     |
| --- | --- | --------- | --- | ---------------------------------- | --- | --- |
|     |     | ANR.ZEIE  |     | Planned end time in seconds since  |     |     |
midnight
|     |     | ANR.OPT:PLAN  |     | "Planned" flag  |     |     |
| --- | --- | ------------- | --- | --------------- | --- | --- |
M = planned for workplace
|     |     |     |     | G  =  deallocated  | (in  the  | pool  of  |
| --- | --- | --- | --- | ------------------ | --------- | --------- |
groups)

| MBL_ESK_HLS_Overview.docx  |     |     | Version: 1.1.17599  |     |     | Page 3 of 5  |
| -------------------------- | --- | --- | ------------------- | --- | --- | ------------ |

|     |     |     |     |     |     | Available Escalations  |     |
| --- | --- | --- | --- | --- | --- | ---------------------- | --- |

|     |     | ANR.MGRP  |     | Group of the workplace where the  |     |     |     |
| --- | --- | --------- | --- | --------------------------------- | --- | --- | --- |
operation is planned
|     |     | ANR.MNR  |     | Workplace where the operation is  |     |     |     |
| --- | --- | -------- | --- | --------------------------------- | --- | --- | --- |
planned
|     |     | ANR.MNR:PREV  |     | Workplace prior to replanning  |     |     |     |
| --- | --- | ------------- | --- | ------------------------------ | --- | --- | --- |
|     |     | ANR.FIX       |     | Operation fixed                |     |     |     |

|     |     | ANR.FIX:PREV         |     | Operation fixed prior to replanning  |     |     |     |
| --- | --- | -------------------- | --- | ------------------------------------ | --- | --- | --- |
|     |     | ANR.VERWEIS:FERTVAR  |     | Production variant (reference)       |     |     |     |

| 1.3  | Operation has been deallocated (ANR.DEALLOCATE)  |     |     |     |     |     |     |
| ---- | ------------------------------------------------ | --- | --- | --- | --- | --- | --- |
The event is triggered for operations which have been deallocated in the graphic planning board.
| Event           |     | Identifiers  |     | Description                          |     |     |     |
| --------------- | --- | ------------ | --- | ------------------------------------ | --- | --- | --- |
| ANR.DEALLOCATE  |     | ANR.ANR      |     | Order + operation                    |     |     |     |
|                 |     | ANR.AUNR     |     | Order                                |     |     |     |
|                 |     | ANR.AFOLG    |     | Sequence                             |     |     |     |
|                 |     | ANR.AGNR     |     | Operation                            |     |     |     |
|                 |     | ANR.SPLNR    |     | Split number                         |     |     |     |
|                 |     | ANR.AART     |     | Order type                           |     |     |     |
|                 |     | ANR.AUGRP    |     | Order group (order header)           |     |     |     |
|                 |     | ANR.DISP     |     | MRP controller (order header)        |     |     |     |
|                 |     | ANR.KDBEZ    |     | Customer name (transferred from the  |     |     |     |
order header to the OP)
|     |     | ANR.ATK     |     | Articles of the operation              |     |     |     |
| --- | --- | ----------- | --- | -------------------------------------- | --- | --- | --- |
|     |     | ANR.ATKBEZ  |     | Article designation/name (transferred  |     |     |     |
from the order header to the OP)
|     |     | ANR.DATFB  |     | Earliest start (date) of the OP  |                |              |     |
| --- | --- | ---------- | --- | -------------------------------- | -------------- | ------------ | --- |
|     |     | ANR.ZEIFB  |     | Earliest                         | start  (time)  | of  the  OP  | in  |
seconds since midnight
|     |     | ANR.DATSE  |     | Latest end (date) of the OP  |         |              |     |
| --- | --- | ---------- | --- | ---------------------------- | ------- | ------------ | --- |
|     |     | ANR.ZEISE  |     | Latest  end                  | (time)  | of  the  OP  | in  |
seconds since midnight
|     |     | ANR.SGR:GUTP  |     | Target  quantity  | of  | the  operation  |     |
| --- | --- | ------------- | --- | ----------------- | --- | --------------- | --- |
(primary quantity unit)
|     |     | ANR.RES:WNR  |     | Operation tool                         |     |     |     |
| --- | --- | ------------ | --- | -------------------------------------- | --- | --- | --- |
|     |     | ANR.RUEZ     |     | Static setup time of the operation in  |     |     |     |
seconds
|     |     | ANR.RUEZ:ZUSCHL  |     | Dyn. setup time of the operation in  |     |     |     |
| --- | --- | ---------------- | --- | ------------------------------------ | --- | --- | --- |
seconds

| MBL_ESK_HLS_Overview.docx  |     |     | Version: 1.1.17599  |     |     |     | Page 4 of 5  |
| -------------------------- | --- | --- | ------------------- | --- | --- | --- | ------------ |

|     |     |     |     |     |     | Available Escalations  |     |
| --- | --- | --- | --- | --- | --- | ---------------------- | --- |

| Event  |     | Identifiers  |     | Description  |           |                 |     |
| ------ | --- | ------------ | --- | ------------ | --------- | --------------- | --- |
|        |     | ANR.ABRZ     |     | Retooling    | time  of  | the  operation  | in  |
seconds
|     |     | ANR.VERARBCODE  |     | Processing code  |                 |            |     |
| --- | --- | --------------- | --- | ---------------- | --------------- | ---------- | --- |
|     |     | ANR.SZY         |     | Target           | cycle  of  the  | operation  | in  |
seconds/1000 cycles
|     |     | ANR.TLG        |     | Partitioning of the operation  |            |                   |     |
| --- | --- | -------------- | --- | ------------------------------ | ---------- | ----------------- | --- |
|     |     | ANR.OPT:PKENN  |     |                                |            |                   |     |
|     |     |                |     | Control                        | indicator  | of  the  current  |     |
operation status
S: not planned/otherwise
V: prepared/planned
L: logged on
U: interrupted
|     |     | ANR.DATB  |     | Planned start date                   |     |     |     |
| --- | --- | --------- | --- | ------------------------------------ | --- | --- | --- |
|     |     | ANR.ZEIB  |     | Planned start time in seconds since  |     |     |     |
midnight

|     |     | ANR.DATE  |     | Planned end date  |                |          |        |
| --- | --- | --------- | --- | ----------------- | -------------- | -------- | ------ |
|     |     | ANR.ZEIE  |     | Planned           | end  time  in  | seconds  | since  |
midnight
|     |     | ANR.OPT:PLAN  |     | "Planned" flag  |     |     |     |
| --- | --- | ------------- | --- | --------------- | --- | --- | --- |
M = planned for workplace
|     |     |     |     | G  =  deallocated  | (in  | the  pool  | of  |
| --- | --- | --- | --- | ------------------ | ---- | ---------- | --- |
groups)
|     |     | ANR.MGRP  |     | Group  of  | the  workplace  | where  | the  |
| --- | --- | --------- | --- | ---------- | --------------- | ------ | ---- |
operation is planned
|     |     | ANR.MNR  |     | Workplace  | where  the  | operation  | is  |
| --- | --- | -------- | --- | ---------- | ----------- | ---------- | --- |
planned
|     |     | ANR.MNR:PREV  |     | Workplace prior to replanning  |     |     |     |
| --- | --- | ------------- | --- | ------------------------------ | --- | --- | --- |
|     |     | ANR.FIX       |     | Operation fixed                |     |     |     |

|     |     | ANR.FIX:PREV     |     | Operation fixed prior to replanning  |     |     |     |
| --- | --- | ---------------- | --- | ------------------------------------ | --- | --- | --- |
|     |     | ANR.VERWEIS:FERT |     | Production variant (reference)       |     |     |     |
VAR

| MBL_ESK_HLS_Overview.docx  |     |     | Version: 1.1.17599  |     |     |     | Page 5 of 5  |
| -------------------------- | --- | --- | ------------------- | --- | --- | --- | ------------ |