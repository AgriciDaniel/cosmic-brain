PP-PI Confirmations HYDRA --> SAP
1 PP-PI Confirmations HYDRA --> SAP
Record types and activities supported by HYDRA
HYDRA BDE sends time ticket related confirmation of the following record types to SAP R/3 PP:
Record SAP meaning Triggering HYDRA action
type
00004 Time ticket partial confirmation Start of an process order / operation
(transferred for each start)
00004 Time ticket partial completion Automatic or manual order interruption at the
BDE terminal or console
00002 Time ticket completion Message of a completed order at the BDE
terminal or BDE console
Please note
If HYDRA MPL is active, whenever an output batch is created (output batch change message), in addition
to the time tickets for OP interruption or logging off, an “0004” partial finish is created and transferred to
SAP.
Data structure PI_PHCON
Message type )*: PI_PHCON
IDoc type )*: PI_PHCON
Message functions: -
Segments PI_PHCON
/ categories:
)* The information is used in HYDRA only for HYDRA-internal reasons
Characteristic Data type Description Mand.
PPPI_ACTIVITY_1 Num (13) with 3 decimals Activity to be confirmed 1
PPPI_ACTIVITY_1_FINISHED Char (1) Remaining work for act. 1
PPPI_ACTIVITY_1_UNIT Char (6) Unit for activity 1
PPPI_ACTIVITY_2 Num (13) with 3 decimals Activity to be confirmed 2
PPPI_ACTIVITY_2_FINISHED Char (1) Remaining work for act. 2
MBL_SAP_Implementation_PPPI_Up.docx Version: 1.0.1362 Page 1 of 2

|     |     |     |     | PP-PI Confirmations HYDRA --> SAP  |     |
| --- | --- | --- | --- | ---------------------------------- | --- |

| Characteristic        |     | Data type  | Description          |     | Mand.  |
| --------------------- | --- | ---------- | -------------------- | --- | ------ |
| PPPI_ACTIVITY_2_UNIT  |     | Char (6)   | Unit for activity 2  |     |        |
PPPI_ACTIVITY_3  Num (13) with 3 decimals  Activity to be confirmed 3
PPPI_ACTIVITY_3_FINISHED  Char (1)  Remaining work for act. 3
| PPPI_ACTIVITY_3_UNIT  |     | Char (6)  | Unit for activity 3  |     |     |
| --------------------- | --- | --------- | -------------------- | --- | --- |
PPPI_ACTIVITY_4  Num (13) with 3 decimals  Activity to be confirmed 4
PPPI_ACTIVITY_4_FINISHED  Char (1)  Remaining work for act. 4
| PPPI_ACTIVITY_4_UNIT  |     | Char (6)  | Unit for activity 4  |     |     |
| --------------------- | --- | --------- | -------------------- | --- | --- |
PPPI_ACTIVITY_5  Num (13) with 3 decimals  Activity to be confirmed 5
PPPI_ACTIVITY_5_FINISHED  Char (1)  Remaining work for act. 5
| PPPI_ACTIVITY_5_UNIT  |     | Char (6)  | Unit for activity 5  |     |     |
| --------------------- | --- | --------- | -------------------- | --- | --- |
PPPI_ACTIVITY_6  Num (13) with 3 decimals  Activity to be confirmed 6
PPPI_ACTIVITY_6_FINISHED  Char (1)  Remaining work for act. 6
| PPPI_ACTIVITY_6_UNIT     |     | Char (6)  | Unit for activity 6  |     |     |
| ------------------------ | --- | --------- | -------------------- | --- | --- |
| PPPI_CLEAR_RESERVATIONS  |     | Char (1)  | Clear reservations   |     |     |
PPPI_CONFIRMATION_SHORT_TEXT  Char (30)  Confirmation text
| PPPI_EVENT_DATE  |     | Date : DDMMYYYY  | Date of event       |     | X   |
| ---------------- | --- | ---------------- | ------------------- | --- | --- |
| PPPI_EVENT_TIME  |     | Time : HHMMSS    | Date/time of event  |     | X   |
| PPPI_OPERATION   |     | Char (4)         | Operation number    |     |     |
| PPPI_PHASE       |     | Char (4)         | Phase number        |     | X   |
PPPI_PHASE_RESOURCE  Char (8)  Primary resource of a phase
| PPPI_PLANT_OF_RESOURCE  |     | Char (4)         | Plant of the resource  |     |     |
| ----------------------- | --- | ---------------- | ---------------------- | --- | --- |
| PPPI_POSTING_DATE       |     | Date : DDMMYYYY  | Posting date           |     |     |
| PPPI_PROCESS_ORDER      |     | Char (12)        | Process order          |     | X   |
PPPI_SCRAP_TO_CONFIRM  Num (13) with 3 decimals  Scrap to be confirmed
PPPI_STATUS_CONFIRMED  Char (5)  Status f. activity confirmat.
| PPPI_UNIT_OF_MEASURE  |     | Char (6)  | Unit of measure  |     |     |
| --------------------- | --- | --------- | ---------------- | --- | --- |
PPPI_YIELD_TO_CONFIRM  Num (13) with 3 decimals  Yield to be confirmed

PLEASE NOTE:
The confirmation of quantities (“00002” / “00004” ) via partial confirmations during simultaneous recording
using total quantity counters on MDE machines is not possible, as the SAP system does not process
negative quantities. This type of recording can lead to negative yield quantity bookings at the end of the
operation.
This restriction does not apply, if such negative bookings can be processed (e.g. through additional use of
the SAP standard BAPIs or customer specific processes).

MBL_SAP_Implementation_PPPI_Up.docx Version: 1.0.1362  Page 2 of 2