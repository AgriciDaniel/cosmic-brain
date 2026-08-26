Manual
Escalation Messages in
Machine Data Collection
MDE-ESK 8.2
Version 1.1.23049
Last changed on: 01.09.2020

Escalation Messages in Machine Data Collection
Copyright
©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.
Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.
MDE-ESK_82.docx Version: 1.1.23049 Page 2 of 17

Escalation Messages in Machine Data Collection
Contents
1 Overview: Escalation Messages in Machine Data Collection ...................... 4
2 Available Escalations ................................................................................... 5
2.1 Machine status change (MST.MALFUNCTION_OCCURRED) ............................ 5
2.2 Cyclic request of the machine status (MST.MALFUNCTION_CONTINUE) ......... 6
2.3 Escalations of the PCC connection at the terminal .............................................. 6
2.4 Beginning of resource status/malfunction (RES.STATUS_START) ..................... 8
2.5 End of resource status/malfunction (RES.STATUS_END) ................................... 8
2.6 Escalations for cycle deviation (CYCLETIME.*) ................................................... 9
2.7 Escalation when partitioning changes (MST.PARTITIONING_CHANGED) ....... 12
2.8 Escalations to monitor synchronization of data collection .................................. 13
2.8.1 Escalations for asynchronous postings
(DLG.ASYNCHRONOUS_MESSAGE and
DLG.ASYNCHRONOUS_MESSAGE_END) .......................................... 14
2.8.2 Escalations for tolerance violations of MDE time stamps
(DLG.TS_TOLERANCE_VIOLATION)................................................... 15
MDE-ESK_82.docx Version: 1.1.23049 Page 3 of 17

Escalation Messages in Machine Data Collection
1 Overview: Escalation Messages in Machine Data Collection
Purpose
HYDRA Escalation Management provides a framework of functions that can be used to forward events
that occur or were recorded in HYDRA to individual users or user groups in real time. During the process,
Escalation Management takes active steps to ensure users are notified.
After notification, Escalation Management monitors times until acknowledgment by the recipients and until
escalation is concluded. Escalations can be forwarded to other users or user groups during processing.
Implementation notes
You use Escalation Management if you would like to have active, real-time notification of specific events
in the MDE production environment so that you can react early enough to prevent downtimes and so that
efficiency and productivity can be increased.
Integration
The events / escalations already triggered in the MDE environment are reported to central Escalation
Management. This forms the framework used to forward the events triggered and to be able to follow up
on them.
To notify people, Escalation Management accesses both User administration and the HR master data
stored in the system. Notifications can be sent out as e-mails by integrating the local mail server into the
system.
Features
 Provision of various escalation messages in the MDE environment, such as machine status
changes or machine malfunctions.
 Cyclic monitoring of machine states / statuses that have been forwarded to the escalation
framework.
 Event configuration: Configuration of order-related events
 Forwarding of detected events to the escalation framework.
MDE-ESK_82.docx Version: 1.1.23049 Seite 4 von 17

    Escalation Messages in Machine Data Collection

2  Available Escalations
2.1  Machine status change (MST.MALFUNCTION_OCCURRED)
The event is triggered when the status changes to "malfunction" (status with production indicator A =
general malfunction, S = malfunction, Z = short-term malfunction, N = malfunction without reason).
| Event                     | IDs       | Description     |     |     |
| ------------------------- | --------- | --------------- | --- | --- |
| MST.MALFUNCTION_OCCURRED  | MNR.MNR   | Machine         |     |     |
|                           | MST.MST   | Machine status  |     |     |
|                           | MNR.MGRP  | Machine group   |     |     |
MNR.KST
Cost center
|     | MST.BEZK       | Machine description  |           |      |
| --- | -------------- | -------------------- | --------- | ---- |
|     | MSTTXT.MSTTXT  | Machine status text  |           |      |
|     | MST.DAUER      | Malfunction          | duration  | (in  |
seconds)
|     |     | When  the  | status      | starts,  the  |
| --- | --- | ---------- | ----------- | ------------- |
|     |     | duration   | is  always  | 0,  except    |
when the old status was "NOT
ASSIGNED".
|     | MST.OPT:PKENN  | Production characteristic:  |     |     |
| --- | -------------- | --------------------------- | --- | --- |
S  Malfunction
A  General disturbance
Z  Short-term malfunction
N  Malfunction without reason
(in this case, the machine
status is 30000)
|     |     | Further          |          | production  |
| --- | --- | ---------------- | -------- | ----------- |
|     |     | characteristics  | might    | exist       |
|     |     | according        | to  the  | customer's  |
requirements. Please also see
the definitions in the machine
status configuration.
|     | MST.BEM              | Comment                        |     |              |
| --- | -------------------- | ------------------------------ | --- | ------------ |
|     | MST.PROGN_DAUER      | Expected                       |     | (predicted)  |
|     | MST.PROGN_BEGIN_DAT  | malfunction time (in seconds)  |     |              |
from the dialog as well as the
MST.PROGN_ZEIB_DAT
|     |     | point  in  | time  when  | the  |
| --- | --- | ---------- | ----------- | ---- |
|     |     | predicted  | downtime    | was  |
entered.
|     | MSGPRIO  | Priority  |     |     |
| --- | -------- | --------- | --- | --- |
1 = highest
2 = high
3 = normal
4 = low
5 =lowest

| MDE-ESK_82.docx  | Version: 1.1.23049  |     |     | Seite 5 von 17  |
| ---------------- | ------------------- | --- | --- | --------------- |

    Escalation Messages in Machine Data Collection

| Event  | IDs       | Description                   |     |     |
| ------ | --------- | ----------------------------- | --- | --- |
|        | MSGCLASS  | Information class/importance  |     |     |
I = information
W = Warning
E = Error
|     | MSGRCV  | Recipient/addressee,  |     | e.g.  |
| --- | ------- | --------------------- | --- | ----- |
group of plant managers

This escalation supports the additional placeholders MSGPRIO, MSGCLASS and MSGRCV.
They are separately described in the documentation entitled HYD-ESK.
2.2  Cyclic request of the machine status
(MST.MALFUNCTION_CONTINUE)
The event is triggered cyclically for all machines that are currently assigned to a malfunction status
according  to  the  production  indicator  (A  =  general  malfunction,  S  =  malfunction,  Z  =  short-term
malfunction, N = malfunction without reason)
By defining the condition in the escalation management module, a notification may occur, for example, if
a particular status exists for a longer time than specified.
| Event                     | IDs            | Description          |           |      |
| ------------------------- | -------------- | -------------------- | --------- | ---- |
| MST.MALFUNCTION_CONTINUE  | MNR.MNR        | Machine              |           |      |
|                           | MST.MST        | Machine status       |           |      |
|                           | MNR.MGRP       | Machine group        |           |      |
|                           | MNR.KST        | Cost center          |           |      |
|                           | MST.BEZK       | Machine description  |           |      |
|                           | MSTTXT.MSTTXT  | Machine status text  |           |      |
|                           | MST.DAUER      | Malfunction          | duration  | (in  |
seconds)
|     | MST.OPT:PKENN  | Production characteristic  |     |     |
| --- | -------------- | -------------------------- | --- | --- |
The MST.DAUER field shows the malfunction time in seconds. When the escalation is configured, this
value can be used to specify after which malfunction time the escalation is to be sent at all.
2.3  Escalations of the PCC connection at the terminal
Please note: Only MW 2.0 supports the PCC connection at the terminal.

| MDE-ESK_82.docx  | Version: 1.1.23049  |     | Seite 6 von 17  |     |
| ---------------- | ------------------- | --- | --------------- | --- |

Escalation Messages in Machine Data Collection
All required channels (MDE, PDV, DNC ...) are initialized when the terminal is being restarted. The
escalation ERRPRO.ERROR_PROTOCOL_WRITTEN (see the HYD-ESK documentation) is sent to the
server if the assignment for a channel is missing within the PCC connection. In addition, an escalation is
also sent if a channel notifies an error while operation is running. The PCC error codes (see the HYD-
RET document, error codes as of 4000) are entered in the ERRPRO.ERRCODE field. "PCC" is always
entered in the field ERRPRO.EREIG and "TNR" in the field ERRPRO.ERRCLASS. The ERRPRO.BEM
field shows the description of the error including the channel number. If available, the connected machine
number is entered in the ERRPRO.MNR field, the operation number is optionally entered in the
ERRPRO.ANR field.
The following additional steps are performed when the terminal triggers an escalation:
- The escalation is recorded locally in the prot_esc.txt file at the terminal
- The escalation is displayed in a popup dialog at the terminal
- The escalation is sent to the server
To limit the number of terminal escalations, a minimum period of time can be specified for every channel,
which has to pass before the next escalation is sent to the server. This minimum waiting time is specified,
in seconds, in the file ctwin.ini in the [DLL] section:
EscalationSendBlockInterval=180
If the option “EscalationViewBlock=OFF” is also set in the same section, the display of the popup window
is also suppressed for the specified interval at the terminal.
It is also possible to completely deactivate the popup dialog and messages to the server:
EscalationPopup=OFF
 Do not show notification at the terminal if an error occurs
EscalationSend=OFF
 Do not send messages to HYDRA that trigger an escalation
MDE-ESK_82.docx Version: 1.1.23049 Seite 7 von 17

    Escalation Messages in Machine Data Collection

2.4  Beginning of resource status/malfunction
(RES.STATUS_START)
The event is triggered if a parallel (resource) status is set (RES_STB dialog).
| Event  | IDs  | Description  |     |
| ------ | ---- | ------------ | --- |
Resource
| RES.STATUS_START  | RES.RES  |                |     |
| ----------------- | -------- | -------------- | --- |
|                   | RES.TYP  | Resource type  |     |
Status
STA.STA
|     | STA.TYP  | Status type of the status  |     |
| --- | -------- | -------------------------- | --- |
Fix 0
STA.DAUER
|     | STA.TXT  | Status text  |     |
| --- | -------- | ------------ | --- |
|     | MSGPRIO  | Priority     |     |
1 = highest
2 = high
3 = normal
4 = low
5 =lowest
Information class/importance
MSGCLASS
I = information
W = Warning
E = Error
|     | MSGRCV  | Recipient/addressee, e.g. group  |     |
| --- | ------- | -------------------------------- | --- |
of plant managers
Please note
This escalation supports the additional placeholders MSGPRIO, MSGCLASS and MSGRCV. These fields
are only sent to the escalation, provided that data is included within dialog data. They are separately
described in the documentation entitled HYD-ESK.
2.5  End of resource status/malfunction (RES.STATUS_END)
The event is triggered if a parallel (resource) status is completed (RES_STB / RES_STE dialog).
| Event  | IDs  | Description  |     |
| ------ | ---- | ------------ | --- |
Resource
| RES.STATUS_END  | RES.RES  |                |     |
| --------------- | -------- | -------------- | --- |
|                 | RES.TYP  | Resource type  |     |
Status
STA.STA
|     | STA.TYP  | Status type of the status  |        |
| --- | -------- | -------------------------- | ------ |
|     |          | Duration                   | with   |
STA.DAUER
RES.STATUS_END

| MDE-ESK_82.docx  | Version: 1.1.23049  |     | Seite 8 von 17  |
| ---------------- | ------------------- | --- | --------------- |

Escalation Messages in Machine Data Collection
Event IDs Description
STA.TXT Status text
MSGPRIO Priority
1 = highest
2 = high
3 = normal
4 = low
5 =lowest
MSGCLASS Information class/importance
I = information
W = Warning
E = Error
MSGRCV Recipient/addressee, e.g. group
of plant managers
Please note
This escalation supports the additional placeholders MSGPRIO, MSGCLASS and MSGRCV. These fields
are only sent to the escalation, provided that data is included within dialog data. They are separately
described in the documentation entitled HYD-ESK.
2.6 Escalations for cycle deviation (CYCLETIME.*)
If the recorded actual cycle deviates from the target cycle of the machine, an escalation management
event can be triggered and an employee or a defined group of people will be informed about the cycle
deviation.
The cycle parameters at the machine (MDE menu: master data à machines à cycle parameters) define
whether or not an escalation is to be generated. The action limits and tolerance limits are defined for
cycle recording. An escalation can be triggered respectively if these limits are exceeded.
The following events may be triggered:
Event (in escalation management) Action triggering the event
CYCLETIME.POS_TOLERANCE_LIMIT_EXCEEDED Positive tolerance limit has been exceeded
CYCLETIME.NEG_TOLERANCE_LIMIT_EXCEEDED Negative tolerance limit has been exceeded
CYCLETIME.POS_ACTION_LIMIT_EXCEEDED Positive action limit has been exceeded
CYCLETIME.NEG_ACTION_LIMIT_EXCEEDED Negative action limit has been exceeded
Details on the function
MDE-ESK_82.docx Version: 1.1.23049 Seite 9 von 17

Escalation Messages in Machine Data Collection
The configured process parameters of the machine are the basis for specifying an escalation. These
parameters are the target cycle of the machine, which is normally specified by the logged on OP(s) as
well as the collected actual cycle, which is usually determined by the shop floor terminal.
The actual cycle is transferred cyclically from the terminal to the server (for further details on this please
refer to the documentation entitled “processing and configurations in HYDRA-MDE 7.2”, section
“determination of the actual cycle”). While posting the actual cycle, it is also checked whether or not an
escalation is to be triggered.
In general, an escalation is only triggered if
 cycle parameters are configured for the machine
 the (current) target cycle of the machine is > 0
 the machine is in the “production” status, i.e. a status that posts on RPA 11 (main/principal utilization
time) is available at the machine
The minimum cycle (configuration setting at the machine) does not affect triggering of escalations.
An escalation is only triggered if the limits are exceeded/not reached. Escalations are not triggered when
the limits are reached.
Escalations are only triggered if the limit is exceeded/not reached for the first time. In case an actual cycle
violating the same limit is recorded subsequently, this (same) escalation is not triggered anymore.
In case a collected actual cycle exceeds/does not reach both limits (action limit and tolerance limit) in one
collection process, only the escalation referring to the tolerance limit is triggered.
But both escalations are triggered if the recorded actual cycle successively exceeds/does not reach both
limits (the action limit at first and then the tolerance limit).
If the collected actual cycle exceeds/does not reach the tolerance limit and then drops/increases
successively until reaching the action limit, the escalation for the action limit will not be triggered.
MDE-ESK_82.docx Version: 1.1.23049 Seite 10 von 17

|     |     |     |   Escalation Messages in Machine Data Collection  |     |     |     |     |
| --- | --- | --- | ------------------------------------------------- | --- | --- | --- | --- |

Whether or not an OP is active, generally does not affect the triggering of an escalation. Provided that the
user wishes to trigger escalations only if an OP is active, the target cycle of the machine has to be set to
0 when the last OP of the machine is interrupted/logged off. If required, this function can be made
available during customizing of HYDRA.
 Furthermore, the event(s) has/have to be configured correctly within escalation management.
For further details on this, please refer to the document dealing with the HYDRA Escalation Management.
The following parameters are available for all four events:
| Event                                   |     |     | IDs      | Description  |     |     |     |
| --------------------------------------- | --- | --- | -------- | ------------ | --- | --- | --- |
| CYCLETIME.POS_TOLERANCE_LIMIT_EXCEEDED  |     |     | MNR.MNR  | Machine      |     |     |     |
or
|     |     |     | MNR.MGRP  | Machine group  |     |     |     |
| --- | --- | --- | --------- | -------------- | --- | --- | --- |
CYCLETIME.NEG_TOLERANCE_LIMIT_EXCEEDED
Cost center of the machine
| or                                   |     |     | MNR.KST  |             |     |     |     |
| ------------------------------------ | --- | --- | -------- | ----------- | --- | --- | --- |
| CYCLETIME.POS_ACTION_LIMIT_EXCEEDED  |     |     |          | Short name  |     |     |     |
MST.BEZK
or
Designation (comment)
| CYCLETIME.NEG_ACTION_LIMIT_EXCEEDED  |     |     | MST.BEZL   |                                       |     |     |     |
| ------------------------------------ | --- | --- | ---------- | ------------------------------------- | --- | --- | --- |
|                                      |     |     | MNR.FIR    | Company                               |     |     |     |
|                                      |     |     | MNR.VAB    | Responsibility area                   |     |     |     |
|                                      |     |     | ZYP.LIMIT  | Cycle limit in percent that has been  |     |     |     |
exceeded
|     |     |     | ZYP.DEVIATION  | Current  | deviation  | between  | actual  |
| --- | --- | --- | -------------- | -------- | ---------- | -------- | ------- |
cycle and target cycle (in percent)
Target cycle in sec/1000 including
MNR.SZY
decimal places
|     |     |     |     | Target  | cycle  | in  sec/1  | including  |
| --- | --- | --- | --- | ------- | ------ | ---------- | ---------- |
MNR.SZY_ASTROKE
decimal places
|     |     |     | MNR.IZY  | Actual cycle in sec/1000 including  |     |     |     |
| --- | --- | --- | -------- | ----------------------------------- | --- | --- | --- |
decimal places
|     |     |     | MNR.IZY_ASTROKE  | Actual  | cycle  | in  sec/1  | including  |
| --- | --- | --- | ---------------- | ------- | ------ | ---------- | ---------- |
decimal places
Please note: The machine number is the key of the escalation
Examples for triggering escalations on the basis of the upper action and tolerance limit:
Computed limit values
|     | Cycle parameter  |     |     |     |     | Escalation  |     |
| --- | ---------------- | --- | --- | --- | --- | ----------- | --- |
relating to the target cycle
| Target  |                     |        |                     |                  | Actual  |         |            |
| ------- | ------------------- | ------ | ------------------- | ---------------- | ------- | ------- | ---------- |
| cycle   |                     |        |                     |                  | cycle   | Upper   | Upper      |
|         | Upper tolerance     |        |                     | Upper tolerance  |         |         |            |
|         | Upper action limit  |        | Upper action limit  |                  |         | action  | tolerance  |
|         |                     | limit  |                     | limit            |         |         |            |
|         |                     |        |                     |                  |         | limit   | limit      |
| 22560   | 5                   | 10     | 23688               | 24816            | 22500   |         |            |
| 22560   | 5                   | 10     | 23688               | 24816            | 22600   |         |            |
| 22560   | 5                   | 10     | 23688               | 24816            | 23688   |         |            |
| 20000   | 5                   | 10     | 21000               | 22000            | 22500   |         |           |
| 20000   | 5                   | 10     | 21000               | 22000            | 20400   |         |            |
|         |                     |        |                     |                  |         |         |            |
| 20000   | 5                   | 10     | 21000               | 22000            | 21005   |        |            |

| MDE-ESK_82.docx  |     |     | Version: 1.1.23049  |     |     | Seite 11 von 17  |     |
| ---------------- | --- | --- | ------------------- | --- | --- | ---------------- | --- |

|     |     |     |   Escalation Messages in Machine Data Collection  |     |     |     |     |
| --- | --- | --- | ------------------------------------------------- | --- | --- | --- | --- |

Computed limit values
|     | Cycle parameter  |     |     |     |     | Escalation  |     |
| --- | ---------------- | --- | --- | --- | --- | ----------- | --- |
relating to the target cycle
| Target  |     |     |     |     | Actual  |     |     |
| ------- | --- | --- | --- | --- | ------- | --- | --- |
Upper  Upper
| cycle  |                     | Upper tolerance  |                     | Upper tolerance  | cycle  |         |            |
| ------ | ------------------- | ---------------- | ------------------- | ---------------- | ------ | ------- | ---------- |
|        | Upper action limit  |                  | Upper action limit  |                  |        | action  | tolerance  |
|        |                     | limit            |                     | limit            |        |         |            |
|        |                     |                  |                     |                  |        | limit   | limit      |
| 20000  | 5                   | 10               | 21000               | 22000            | 22400  |         |           |

| 20000  | 5   | 10  | 21000  | 22000  | 22280  |     |     |
| ------ | --- | --- | ------ | ------ | ------ | --- | --- |
| 20000  | 5   | 10  | 21000  | 22000  | 22210  |     |     |
| 20000  | 5   | 10  | 21000  | 22000  | 21550  |     |     |
| 20000  | 5   | 10  | 21000  | 22000  | 20120  |     |     |
| 20000  | 5   | 10  | 21000  | 22000  | 21550  |    |     |
| 20000  | 5   | 10  | 21000  | 22000  | 21550  |     |     |
| 20000  | 5   | 10  | 21000  | 22000  | 22400  |     |    |

Please note:
The values are indicated in seconds per 1000 cycles.
| green   Actual cycle within normal range  |     |     |     |     |     |     |     |
| ----------------------------------------- | --- | --- | --- | --- | --- | --- | --- |
yellow  Actual cycle outside of the action limit (but within the tolerance limit)
red   Actual cycle outside of the tolerance limit

| 2.7  | Escalation when partitioning changes  |     |     |     |     |     |     |
| ---- | ------------------------------------- | --- | --- | --- | --- | --- | --- |
(MST.PARTITIONING_CHANGED)
In general, an escalation is only triggered if
  portioning is changed manually (using the M_TLG dialog)
  partitioning of the machine has actually changed
The escalation is triggered every time partitioning is changed manually, even if there is still another open
escalation on this subject for this machine!
Furthermore, the event(s) has/have to be configured correctly within escalation management. For further
details on this, please refer to the document dealing with the HYDRA Escalation Management.

| MDE-ESK_82.docx  |     |     | Version: 1.1.23049  |     |     | Seite 12 von 17  |     |
| ---------------- | --- | --- | ------------------- | --- | --- | ---------------- | --- |

    Escalation Messages in Machine Data Collection

The below-mentioned escalation parameters are available:
| Event                     | IDs       | Description    |     |
| ------------------------- | --------- | -------------- | --- |
| MST.PARTITIONING_CHANGED  | MNR.MNR   | Machine        |     |
|                           | MNR.MGRP  | Machine group  |     |
Cost center of the machine
MNR.KST
Short name
MST.BEZK
|     | MST.CAT  | Category             |     |
| --- | -------- | -------------------- | --- |
|     | MNR.ART  | Type                 |     |
|     | MNR.VAB  | Responsibility area  |     |
Old machine partitioning
MNR.TLG:OLD
New machine partitioning
MNR.TLG:NEW
|     | ANR.ANR      | Order                   |     |
| --- | ------------ | ----------------------- | --- |
|     | ANR.RES:WNR  | Main tool of the order  |     |
Personnel number
ANR.PNR
Badge number
ANR.KNR
Old partitioning of the order
ANR.TLG:OLD
|     | ANR.TLG:NEW  | New partitioning of the order  |     |
| --- | ------------ | ------------------------------ | --- |

2.8  Escalations to monitor synchronization of data collection
Multichannel data acquisition (i.e. postings deriving from different channels for a machine), such as MDE
data deriving from a PCC and order postings deriving from an AIP or MOC, might lead to synchronization
problems if one of the two input components is no longer synchronous. Consequently, quantities and
statuses are posted incorrectly for orders.
The below-mentioned escalations indicate that such synchronization problems have occurred (and when).
Consequently, data can be corrected manually and specifically (e.g. in the order or machine-related
HYDRA postings).
These escalations require customizing:
  The function is available as of hymw.exe/out V8.1.1.484.
  The  below-mentioned  INI  configurations  are  created  initially  along  with  the  initial  data  for
escalations by the patch db_sql\dbp_mde_esk_synchronicity.hsc and are inactive. The DB patch
has to be called explicitly.
HYDRA needs to be restarted if the HYDRA INI configuration is changed, in order for these
changes to be taken over by the interface processes.

| MDE-ESK_82.docx  | Version: 1.1.23049  |     | Seite 13 von 17  |
| ---------------- | ------------------- | --- | ---------------- |

    Escalation Messages in Machine Data Collection

2.8.1 Escalations for asynchronous postings
(DLG.ASYNCHRONOUS_MESSAGE and
DLG.ASYNCHRONOUS_MESSAGE_END)
The  escalations  DLG.ASYNCHRONOUS_MESSAGE  and  DLG.ASYNCHRONOUS_MESSAGE_END
(“delayed MDE postings”, “MDE lags behind or is ahead of time”) are initiated, once the first posting is
asynchronous or if the next posting is again synchronous. A posting is considered being asynchronous if
its time stamp deviates from the current server time by more than a defined period of time “max. time
deviation”. Only posting dialogs are checked (even if they are recorded OFFLINE). Checking does not
take place when switching from/to daylight saving time (i.e. between 2.00 a.m. and 3.00 a.m. on the two
concerned days in autumn and spring).
The “max. time deviation” is defined in the INI configuration:
| INI      | MDE                    |     |     |     |
| -------- | ---------------------- | --- | --- | --- |
| SECTION  | ASYNCHRONOUS_MESSAGE   |     |     |     |
| IDENT    | TIME_INTERVAL          |     |     |     |
VALUE  <time in seconds; greater than  If values less than 180 seconds
|     |     | are  configured,  |     | the  180  |
| --- | --- | ----------------- | --- | --------- |
180>
|     |     | seconds  | deviation  | will  be  |
| --- | --- | -------- | ---------- | --------- |
checked
| AKTIV  | J   | J: enabled   |     |     |
| ------ | --- | ------------ | --- | --- |
N: disabled

Furthermore, the event(s) has/have to be configured correctly within Escalation Management.

| MDE-ESK_82.docx  | Version: 1.1.23049  |     |     | Seite 14 von 17  |
| ---------------- | ------------------- | --- | --- | ---------------- |

    Escalation Messages in Machine Data Collection

The following escalation parameters are available:
| Event                     | ID       | Description  |     |
| ------------------------- | -------- | ------------ | --- |
| DLG.ASYNCHRONOUS_MESSAGE  | DLG.DLG  | Dialog       |     |

|     | DLG.DAT  | Dialog date  |     |
| --- | -------- | ------------ | --- |
or
|     | DLG-ZEI  | Dialog time  |     |
| --- | -------- | ------------ | --- |
DLG.ASYNCHRONOUS_MESSAGE_END
|     | DLG.USR  | User              |     |
| --- | -------- | ----------------- | --- |
|     | MNR.MNR  | Machine           |     |
|     | ANR.ANR  | Operation (opt.)  |     |
Personnel number (opt.)
PNR.PNR
|     | PNR.KNR  | Badge number (opt.)  |     |
| --- | -------- | -------------------- | --- |
2.8.2  Escalations for tolerance violations of MDE time stamps
(DLG.TS_TOLERANCE_VIOLATION)
The escalation DLG.TS_TOLERANCE_VIOLATION is initiated if an order posting that has been checked
for validity is entered and exceeds the ”max. tolerance duration” (difference between MDE time stamp of
the machine and the time stamp of dialog data).
Only the below-mentioned posting dialogs are checked (even if they are recorded OFFLINE). PCCMD
postings are not checked.
  Log OP on (A_AN)
  Log OP and person on (A_P_AN)
  Partial upload (A_TR)
  Interrupt OP (A_UN)
  Log OP off (A_AB)
  Quantity upload (A_MR)
  Finish OP (A_BE)
  Log merged OP on (SA_AN)
  Partial upload of merged OP (SA_TR)
  Interrupt merged OP (SA_UN)

| MDE-ESK_82.docx  | Version: 1.1.23049  |     | Seite 15 von 17  |
| ---------------- | ------------------- | --- | ---------------- |

    Escalation Messages in Machine Data Collection

  Log merged OP off (SA_AB or S_ABME)
  Log person on (P_AN)
  Log person off (P_AB)
  Log all persons off (P_AAB)
Checking does not take place when switching from/to daylight saving time (i.e. between 2.00 a.m. and
3.00 a.m. on the two concerned days in autumn and spring).
The machine’s MDE time stamp is checked, which is only recorded on the PCC (terminal type PCCMD).
The “max. tolerance duration” is defined in the INI configuration. The time stamp is not checked and no
escalation is sent if an active INI configuration does not exist for the TOLERANCE_PERIOD.
| INI      | MDE                     |     |     |     |
| -------- | ----------------------- | --- | --- | --- |
| SECTION  | TS_TOLERANCE_VIOLATION  |     |     |     |
| IDENT    | TOLERANCE_PERIOD        |     |     |     |
VALUE  <Time in seconds; greater than  If values less than 180 seconds
|     | 180>  | are  configured,  |            | the  180  |
| --- | ----- | ----------------- | ---------- | --------- |
|     |       | seconds           | deviation  | will  be  |
checked
| AKTIV  | J   | J: enabled   |     |     |
| ------ | --- | ------------ | --- | --- |
N: disabled

The  ”reaction“  is  defined  in  the  INI  configuration.  If  the  INI  configuration  is  not  active  for
TOLERANCE_REACTION, “W” will be assumed to be the default value. The TOLERANCE_REACTION
will only be evaluated if the TOLERANCE_PERIOD is configured.
| INI      | MDE                     |                               |     |     |
| -------- | ----------------------- | ----------------------------- | --- | --- |
| SECTION  | TS_TOLERANCE_VIOLATION  |                               |     |     |
| IDENT    | TOLERANCE_REACTION      |                               |     |     |
| VALUE    | E/W/N                   | E: posting is to be rejected  |     |     |
W: only a warning is sent
N: no reaction
| AKTIV  | J   | J: enabled   |     |     |
| ------ | --- | ------------ | --- | --- |
N: disabled
If one of the options “E“ or “W“ is to be used when tolerances are not respected, the terminal has to be
configured in such way as for it to no longer perform offline postings. This can be realized by the option
“checking required” in the terminal label (BAPI ID TNR.PLAUS:OFF=J).

| MDE-ESK_82.docx  | Version: 1.1.23049  |     |     | Seite 16 von 17  |
| ---------------- | ------------------- | --- | --- | ---------------- |

    Escalation Messages in Machine Data Collection

If “W” is configured as “reaction”, the terminal shows the message “The point in time of the posting differs
too much from the machine's posting status!”. The user has to confirm this message manually. MOC does
not show a message.
If “E” is configured as “reaction”, the posting is rejected by the error code 95 (short text: “Posting beyond
sync.!; long text: “Posting beyond synchronization!”).
The period of time for displaying the warning message (for reaction = “W”) is set to 0 by default, i.e. in this
case the user has to confirm the posting manually. As an alternative, a time may be indicated after that
the message will be closed automatically.
| INI      | MDE                     |     |                                 |     |
| -------- | ----------------------- | --- | ------------------------------- | --- |
| SECTION  | TS_TOLERANCE_VIOLATION  |     |                                 |     |
| IDENT    | DISPLAY_TIME_WARNING    |     |                                 |     |
| VALUE    | {time in seconds}       |     | 0: The user has to confirm the  |     |
message
> 0: The message is shown for
|     |     |     | the  maximum  | duration  in  |
| --- | --- | --- | ------------- | ------------- |
seconds.
| AKTIV  | J   |     | J: enabled   |     |
| ------ | --- | --- | ------------ | --- |
N: disabled

Furthermore, the event(s) has/have to be configured correctly within Escalation Management.
The following escalation parameters are available:
| Event                       |     | ID       | Description  |     |
| --------------------------- | --- | -------- | ------------ | --- |
| DLG.TS_TOLERANCE_VIOLATION  |     | DLG.DLG  | Dialog       |     |
|                             |     | DLG.DAT  | Dialog date  |     |
Dialog time
DLG.ZEI
|     |     | MNR.DAT  | Status date              |     |
| --- | --- | -------- | ------------------------ | --- |
|     |     | MNR.ZEI  | Status time              |     |
|     |     | DLG.USR  | User                     |     |
|     |     | MNR.MNR  | Machine                  |     |
|     |     | ANR.ANR  | Operation (opt.)         |     |
|     |     | PNR.PNR  | Personnel number (opt.)  |     |
|     |     | PNR.KNR  | Badge number (opt.)      |     |

| MDE-ESK_82.docx  |     | Version: 1.1.23049  |     | Seite 17 von 17  |
| ---------------- | --- | ------------------- | --- | ---------------- |