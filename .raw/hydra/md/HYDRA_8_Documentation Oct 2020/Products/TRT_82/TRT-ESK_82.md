Manual
TRT Escalation Messages
(AS)
TRT-ESK 8.2
Version 1.0.23049
Last changed on: 2 September 2020

TRT Escalation Messages (AS)
Copyright
©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.
Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.
TRT-ESK_82.docx Version: 1.0.23049 Page 2 of 17

TRT Escalation Messages (AS)
Contents
1 Available Escalations ................................................................................... 4
1.1 Batch was created by goods receipt (CNR.INCOMING) ...................................... 4
1.2 Batch has been consumed (CNR.CONSUMED) ................................................. 4
1.3 Batch has been deleted (CNR.DELETED) .......................................................... 5
1.4 Batch was transferred to another material buffer (CNR.TRANSFERRED) ........... 5
1.5 Batch was manually locked (CNR.LOCKED) ....................................................... 6
1.6 Transport work plan not found (TRANR.TAP_NOT_FOUND) .............................. 6
1.7 Transport order already active (TRANR.TO_ACTIV) ........................................... 7
1.8 Availability date reached (CNR.AVAILABLE) ....................................................... 7
1.9 Warning date exceeded (CNR.WARNING) ......................................................... 8
1.10 Expiry date exceeded (CNR.EXPIRED) .............................................................. 9
1.11 Batch status has changed (CNR.BATCHSTATUSCHANGED) .......................... 10
1.12 Input batch logged on (CNR.INPUTLOGGEDON) ............................................. 11
1.13 Input batch logged off (CNR.INPUTLOGGEDOFF) ........................................... 12
1.14 Output batch logged on (CNR.OUTPUTLOGGEDON) ...................................... 13
1.15 Output batch logged off (CNR.OUTPUTLOGGEDOFF) .................................... 13
1.16 Input batch logged on in advance (CNR.PREREGISTERED) ............................ 14
1.17 Split batch (CNR.SPLITTED) ............................................................................ 15
1.18 Collective batch (CNR.SUMMARIZED) ............................................................. 16
TRT-ESK_82.docx Version: 1.0.23049 Page 3 of 17

|     |     |     | TRT Escalation Messages (AS)  |     |
| --- | --- | --- | ----------------------------- | --- |

1  Available Escalations
The HYDRA Escalation Management provides a framework of functions to promptly forward collected or
live events to specific users or user groups. The escalation management actively notifies users.
For  the  notification  sent,  the  escalation  management  monitors  the  times  until  the  notification  is
acknowledged and until the escalation is completed. Escalations can be forwarded to other users or user
groups during processing.
The sections below describe all escalations of the MPL and TRT including their parameters.
If an identifier is replaced with the sign "@" in the message of an escalation, then this identifier
is not available in the event that triggers the escalation. Identifiers that are not available are not

identified subsequently.
1.1  Batch was created by goods receipt (CNR.INCOMING)
This event is triggered when a batch is generated.
| Event         |     | Identifiers    | Description               |     |
| ------------- | --- | -------------- | ------------------------- | --- |
| CNR.INCOMING  |     | CNR.CNR        | Batch number              |     |
|               |     | CNR.ANR        | Order + operation         |     |
|               |     | CNR.MNR        | Workplace                 |     |
|               |     | CNR.CKL        | Batch class               |     |
|               |     | CNR.ZLO        | Material buffer           |     |
|               |     | CNR.ATK        | Article                   |     |
|               |     | CNR.ATKBEZ     | Article designation       |     |
|               |     | CNR.STA        | Batch status              |     |
|               |     | CNR.BEM        | Comment                   |     |
|               |     | CNR.MATTYP     | Material type             |     |
|               |     | CNR.MATTYPART  | Kind of material          |     |
|               |     | CNR.SGR:GUT    | Target quantity yield     |     |
|               |     | CNR.SGE:GUT    | Target quantity unit      |     |
|               |     | CNR.RGR:GUT    | Remaining quantity yield  |     |
|               |     | CNR.DAT        | Date                      |     |
|               |     | CNR.ZEI        | Time                      |     |

1.2  Batch has been consumed (CNR.CONSUMED)
This event is triggered when an input batch is consumed. The batch is consumed when the remaining
batch quantity = 0 when the input batch is logged off, for example.

| TRT-ESK_82.docx  |     | Version: 1.0.23049  |     | Page 4 of 17  |
| ---------------- | --- | ------------------- | --- | ------------- |

|     |     |     | TRT Escalation Messages (AS)  |     |
| --- | --- | --- | ----------------------------- | --- |

| Event         |     | Identifiers    | Description          |     |
| ------------- | --- | -------------- | -------------------- | --- |
| CNR.CONSUMED  |     | CNR.CNR        | Batch number         |     |
|               |     | CNR.ANR        | Order + operation    |     |
|               |     | CNR.MNR        | Workplace            |     |
|               |     | CNR.CKL        | Batch class          |     |
|               |     | CNR.ZLO        | Material buffer      |     |
|               |     | CNR.ATK        | Article              |     |
|               |     | CNR.ATKBEZ     | Article designation  |     |
|               |     | CNR.STA        | Batch status         |     |
|               |     | CNR.BEM        | Comment              |     |
|               |     | CNR.MATTYP     | Material type        |     |
|               |     | CNR.MATTYPART  | Kind of material     |     |
|               |     | CNR.OPT:VERBR  | Consumption type     |     |
|               |     | CNR.DAT        | Date                 |     |
|               |     | CNR.ZEI        | Time                 |     |

1.3  Batch has been deleted (CNR.DELETED)
This event is triggered when the batch status Deleted is followed by a status change.
| Event        |     | Identifiers    | Description          |     |
| ------------ | --- | -------------- | -------------------- | --- |
| CNR.DELETED  |     | CNR.CNR        | Batch number         |     |
|              |     | CNR.GR         | Reason               |     |
|              |     | CNR.ATK        | Article              |     |
|              |     | CNR.ATKBEZ     | Article designation  |     |
|              |     | CNR.GRTXT      | Reason text          |     |
|              |     | CNR.STA        | Batch status         |     |
|              |     | CNR.BEM        | Comment              |     |
|              |     | CNR.MATTYPART  | Kind of material     |     |

1.4  Batch was transferred to another material buffer
(CNR.TRANSFERRED)
This event is triggered when a batch changes the material buffer.
| Event            |     | Identifiers  | Description        |     |
| ---------------- | --- | ------------ | ------------------ | --- |
| CNR.TRANSFERRED  |     | CNR.CNR      | Batch number       |     |
|                  |     | CNR.ANR      | Order + operation  |     |

| TRT-ESK_82.docx  |     | Version: 1.0.23049  |     | Page 5 of 17  |
| ---------------- | --- | ------------------- | --- | ------------- |

|     |     |     | TRT Escalation Messages (AS)  |     |
| --- | --- | --- | ----------------------------- | --- |

| Event  |     | Identifiers    | Description          |     |
| ------ | --- | -------------- | -------------------- | --- |
|        |     | CNR.MNR        | Workplace            |     |
|        |     | CNR.CKL        | Batch class          |     |
|        |     | CNR.ZLO        | Material buffer      |     |
|        |     | CNR.ATK        | Article              |     |
|        |     | CNR.ATKBEZ     | Article designation  |     |
|        |     | CNR.STA        | Batch status         |     |
|        |     | CNR.BEM        | Comment              |     |
|        |     | CNR.MATTYP     | Material type        |     |
|        |     | CNR.MATTYPART  | Kind of material     |     |
|        |     | CNR.OPT:VERBR  | Consumption type:    |     |
M  manual
R  backflush (retrograde)
|     |     | CNR.DAT  | Date  |     |
| --- | --- | -------- | ----- | --- |
|     |     | CNR.ZEI  | Time  |     |

1.5  Batch was manually locked (CNR.LOCKED)
This event is triggered when a batch is manually locked. If the status Manual Q status is set to Locked by
the function C_STA, then the event CNR.LOCKED is triggered. The function C_STA is triggered when the
CAQ option 1210 is applied. For details on use and configuration, refer to the document Configuration
QM/CAQ Options.
| Event       |     | Identifiers    | Description            |     |
| ----------- | --- | -------------- | ---------------------- | --- |
| CNR.LOCKED  |     | CNR.CNR        | Batch number           |     |
|             |     | CNR.GR         | Reason                 |     |
|             |     | CNR.ATK        | Article                |     |
|             |     | CNR.ATKBEZ     | Article designation    |     |
|             |     | CNR.GRTXT      | Reason text            |     |
|             |     | CNR.STA        | Batch status           |     |
|             |     | CNR.QST        | Manual quality status  |     |
|             |     | CNR.BEM        | Comment                |     |
|             |     | CNR.MATTYPART  | Kind of material       |     |
1.6  Transport work plan not found (TRANR.TAP_NOT_FOUND)
The following escalation is triggered if no active work plan can be found at the time when a transport
order is created:
| Event  |     | Identifiers  | Description   |     |
| ------ | --- | ------------ | ------------- | --- |

| TRT-ESK_82.docx  |     | Version: 1.0.23049  |     | Page 6 of 17  |
| ---------------- | --- | ------------------- | --- | ------------- |

|     |     |     | TRT Escalation Messages (AS)  |     |
| --- | --- | --- | ----------------------------- | --- |

| Event                |     | Identifiers  | Description     |     |
| -------------------- | --- | ------------ | --------------- | --- |
| TRANR.TAP_NOT_FOUND  |     | TRANR.ATK    | Article number  |     |
|                      |     | TRANR.AUART  | Order type      |     |
|                      |     | TRANR.SANR   | Triggering OP   |     |
|                      |     | TRANR.DAT    | Current date    |     |
|                      |     | TRANR.ZEI    | Current time    |     |

1.7  Transport order already active (TRANR.TO_ACTIV)
This escalation is triggered if a production operation is deallocated (cancelled/unplanned) that is already
assigned to an active transport order.
| Event           |     | Identifiers  | Description                |     |
| --------------- | --- | ------------ | -------------------------- | --- |
| TRANR.TO_ACTIV  |     | TRANR.AUNR   | Order number of transport  |     |
order
|     |     | TRANR.ANR      | OP number of transport order  |     |
| --- | --- | -------------- | ----------------------------- | --- |
|     |     | TRANR.ANR_STA  | OP status of transport order  |     |
|     |     | TRANR.SANR     | Deallocated OP                |     |
|     |     | TRANR.DAT      | Current date                  |     |
|     |     | TRANR.ZEI      | Current time                  |     |

1.8  Availability date reached (CNR.AVAILABLE)
This escalation is available as of Service Pack 16.

To use this escalation, you must explicitly activate the escalation. Activation instruction: See
here.

When the escalation has been activated, you must restart HYDRA.
After activation of the escalation, the data volume required to retain data in the escalation
management can increase considerably. This increase is subject to the specific data collection

method.
Observe the development of the data volume in the escalation management after activation and
change the archiving settings of the escalation management, if required.

| TRT-ESK_82.docx  |     | Version: 1.0.23049  |     | Page 7 of 17  |
| ---------------- | --- | ------------------- | --- | ------------- |

|     |     |     | TRT Escalation Messages (AS)  |     |
| --- | --- | --- | ----------------------------- | --- |

If a batch reaches the availability date, then this escalation is triggered. The availability date is cyclically
monitored via an entry in the HYDRA scheduler. For further information on the cyclic monitoring, refer to
the document Monitoring of availability dates.
The availability date is monitored by a cyclic job in the scheduler. To use the availability date
and to run the cyclic job in the scheduler, you require the license MPL-MMO.

| Event          |     | Identifiers    | Description            |     |
| -------------- | --- | -------------- | ---------------------- | --- |
| CNR.AVAILABLE  |     | CNR.DLL        | Batch number           |     |
|                |     | CNR.CNR        | Internal batch number  |     |
|                |     | CNR.VVDAT      | Availability date      |     |
|                |     | CNR.VVZEI      | Availability time      |     |
|                |     | CNR.WDAT       | Warning date           |     |
|                |     | CNR.WZEI       | Warning time           |     |
|                |     | CNR.VFDAT      | Expiry date            |     |
|                |     | CNR.VFZEI      | Expiry time            |     |
|                |     | CNR.ATK        | Article                |     |
|                |     | CNR.ATKBEZ     | Article designation    |     |
|                |     | CNR.RGR:GUT    | Remaining quantity     |     |
|                |     | CNR.SGE:GUT    | Unit                   |     |
|                |     | CNR.MATTYPART  | Kind of material       |     |
|                |     | CNR.ZLO        | Material buffer        |     |
|                |     | CNR.CKL        | Batch class            |     |
|                |     | CNR.STA        | Batch status           |     |

1.9  Warning date exceeded (CNR.WARNING)
This escalation is available as of Service Pack 16.

To use this escalation, you must explicitly activate the escalation. Activation instruction: See
here.

When the escalation has been activated, you must restart HYDRA.
After activation of the escalation, the data volume required to retain data in the escalation
management can increase considerably. This increase is subject to the specific data collection

method.

| TRT-ESK_82.docx  |     | Version: 1.0.23049  |     | Page 8 of 17  |
| ---------------- | --- | ------------------- | --- | ------------- |

|     |     |     | TRT Escalation Messages (AS)  |     |
| --- | --- | --- | ----------------------------- | --- |

Observe the development of the data volume in the escalation management after activation and
change the archiving settings of the escalation management, if required.
If a batch has exceeded the warning date, then this escalation is triggered. The warning date is cyclically
monitored via an entry in the HYDRA scheduler. For further information on the cyclic monitoring, refer to
the document Monitoring of availability dates.
The warning date is monitored by a cyclic job in the scheduler. To use the warning date and to
run the cyclic job in the scheduler, you require the license MPL-MMO.

| Event        |     | Identifiers    | Description            |     |
| ------------ | --- | -------------- | ---------------------- | --- |
| CNR.WARNING  |     | CNR.DLL        | Batch number           |     |
|              |     | CNR.CNR        | Internal batch number  |     |
|              |     | CNR.WDAT       | Warning date           |     |
|              |     | CNR.WZEI       | Warning time           |     |
|              |     | CNR.VFDAT      | Expiry date            |     |
|              |     | CNR.VFZEI      | Expiry time            |     |
|              |     | CNR.ATK        | Article                |     |
|              |     | CNR.ATKBEZ     | Article designation    |     |
|              |     | CNR.RGR:GUT    | Remaining quantity     |     |
|              |     | CNR.SGE:GUT    | Unit                   |     |
|              |     | CNR.MATTYPART  | Kind of material       |     |
|              |     | CNR.ZLO        | Material buffer        |     |
|              |     | CNR.CKL        | Batch class            |     |
|              |     | CNR.STA        | Batch status           |     |

| 1.10  | Expiry date exceeded (CNR.EXPIRED)  |     |     |     |
| ----- | ----------------------------------- | --- | --- | --- |
This escalation is available as of Service Pack 16.

To use this escalation, you must explicitly activate the escalation. Activation instruction: See
here.

When the escalation has been activated, you must restart HYDRA.
After activation of the escalation, the data volume required to retain data in the escalation
  management can increase considerably. This increase is subject to the specific data collection

| TRT-ESK_82.docx  |     | Version: 1.0.23049  |     | Page 9 of 17  |
| ---------------- | --- | ------------------- | --- | ------------- |

|     |     |     | TRT Escalation Messages (AS)  |     |
| --- | --- | --- | ----------------------------- | --- |

method.
Observe the development of the data volume in the escalation management after activation and
change the archiving settings of the escalation management, if required.
If a batch has exceeded the expiry date, then this escalation is triggered. The expiry date is cyclically
monitored via an entry in the HYDRA scheduler. For further information on the cyclic monitoring, refer to
the document Monitoring of availability dates.
The expiry date is monitored by a cyclic job in the scheduler. To use the expiry date and to run
|     | the cyclic job in the scheduler, you require the license MPL-MMO.  |     |     |     |
| --- | ------------------------------------------------------------------ | --- | --- | --- |

| Event        |     | Identifiers    | Description            |     |
| ------------ | --- | -------------- | ---------------------- | --- |
| CNR.EXPIRED  |     | CNR.DLL        | Batch number           |     |
|              |     | CNR.CNR        | Internal batch number  |     |
|              |     | CNR.VFDAT      | Expiry date            |     |
|              |     | CNR.VFZEI      | Expiry time            |     |
|              |     | CNR.ATK        | Article                |     |
|              |     | CNR.ATKBEZ     | Article designation    |     |
|              |     | CNR.RGR:GUT    | Remaining quantity     |     |
|              |     | CNR.SGE:GUT    | Unit                   |     |
|              |     | CNR.MATTYPART  | Kind of material       |     |
|              |     | CNR.ZLO        | Material buffer        |     |
|              |     | CNR.CKL        | Batch class            |     |
|              |     | CNR.STA        | Batch status           |     |

| 1.11  | Batch status has changed (CNR.BATCHSTATUSCHANGED)  |     |     |     |
| ----- | -------------------------------------------------- | --- | --- | --- |
This escalation is available as of Service Pack 16.

To use this escalation, you must explicitly activate the escalation. Activation instruction: See
here.

When the escalation has been activated, you must restart HYDRA.
After activation of the escalation, the data volume required to retain data in the escalation
  management can increase considerably. This increase is subject to the specific data collection

| TRT-ESK_82.docx  |     | Version: 1.0.23049  |     | Page 10 of 17  |
| ---------------- | --- | ------------------- | --- | -------------- |

|     |     |     | TRT Escalation Messages (AS)  |     |
| --- | --- | --- | ----------------------------- | --- |

method.
Observe the development of the data volume in the escalation management after activation and
change the archiving settings of the escalation management, if required.

| Event                   |     | Identifiers    | Description            |     |
| ----------------------- | --- | -------------- | ---------------------- | --- |
| CNR.BATCHSTATUSCHANGED  |     | CNR.DLL        | Batch number           |     |
|                         |     | CNR.CNR        | Internal batch number  |     |
|                         |     | CNR.ATK        | Article                |     |
|                         |     | CNR.ATKBEZ     | Article designation    |     |
|                         |     | CNR.RGR:GUT    | Remaining quantity     |     |
|                         |     | CNR.SGE:GUT    | Unit                   |     |
|                         |     | CNR.MATTYPART  | Kind of material       |     |
|                         |     | CNR.STA        | „Neuer“ Losstatus      |     |

| 1.12  | Input batch logged on (CNR.INPUTLOGGEDON)  |     |     |     |
| ----- | ------------------------------------------ | --- | --- | --- |
This escalation is available as of Service Pack 16.

To use this escalation, you must explicitly activate the escalation. Activation instruction: See
here.

When the escalation has been activated, you must restart HYDRA.
After activation of the escalation, the data volume required to retain data in the escalation
management can increase considerably. This increase is subject to the specific data collection

method.
Observe the development of the data volume in the escalation management after activation and
change the archiving settings of the escalation management, if required.
If a batch is logged on as input batch, then this escalation is triggered. The data of the escalation includes
the information collected when the input batch is logged on.
| Event              |     | Identifiers  | Description            |     |
| ------------------ | --- | ------------ | ---------------------- | --- |
| CNR.INPUTLOGGEDON  |     | CNR.DLL      | Batch number           |     |
|                    |     | CNR.CNR      | Internal batch number  |     |
|                    |     | CNR.ATK      | Article                |     |

| TRT-ESK_82.docx  |     | Version: 1.0.23049  |     | Page 11 of 17  |
| ---------------- | --- | ------------------- | --- | -------------- |

|     |     |     | TRT Escalation Messages (AS)  |     |     |
| --- | --- | --- | ----------------------------- | --- | --- |

| Event  |     | Identifiers  | Description          |     |     |
| ------ | --- | ------------ | -------------------- | --- | --- |
|        |     | CNR.ATKBEZ   | Article designation  |     |     |
|        |     | CNR.ANR      | MES order number     |     |     |
|        |     | CNR.MNR      | Workplace            |     |     |
|        |     | CNR.PNR      | Personnel number     |     |     |
|        |     | CNR.KNR      | Staff badge number   |     |     |
|        |     | CNR.SLP      | BOM item             |     |     |

| 1.13  | Input batch logged off (CNR.INPUTLOGGEDOFF)  |     |     |     |     |
| ----- | -------------------------------------------- | --- | --- | --- | --- |
This escalation is available as of Service Pack 16.

To use this escalation, you must explicitly activate the escalation. Activation instruction: See
here.

When the escalation has been activated, you must restart HYDRA.
After activation of the escalation, the data volume required to retain data in the escalation
management can increase considerably. This increase is subject to the specific data collection

method.
Observe the development of the data volume in the escalation management after activation and
change the archiving settings of the escalation management, if required.
If a batch is logged off as input batch, then this escalation is triggered. The data of the escalation includes
the information collected when the input batch is logged off.
| Event               |     | Identifiers  | Description            |           |          |
| ------------------- | --- | ------------ | ---------------------- | --------- | -------- |
| CNR.INPUTLOGGEDOFF  |     | CNR.DLL      | Batch number           |           |          |
|                     |     | CNR.CNR      | Internal batch number  |           |          |
|                     |     | CNR.BEM      | Info on batch          |           |          |
|                     |     | CNR.ANR      | MES order number       |           |          |
|                     |     | CNR.MNR      | Workplace              |           |          |
|                     |     | CNR.PNR      | Personnel number       |           |          |
|                     |     | CNR.KNR      | Staff badge number     |           |          |
|                     |     | CNR.SLP      | BOM item               |           |          |
|                     |     | CNR.RGR:GUT  | Remaining              | quantity  | of  the  |
batch
|     |     | CNR.SGE:GUT   | Unit                       |     |     |
| --- | --- | ------------- | -------------------------- | --- | --- |
|     |     | CNR.EGR:VERB  | Verbrauch des Eingangslos  |     |     |

| TRT-ESK_82.docx  |     | Version: 1.0.23049  |     | Page 12 of 17  |     |
| ---------------- | --- | ------------------- | --- | -------------- | --- |

|     |     |     | TRT Escalation Messages (AS)  |     |
| --- | --- | --- | ----------------------------- | --- |

| Event  |     | Identifiers  | Description               |     |
| ------ | --- | ------------ | ------------------------- | --- |
|        |     | CNR.STA      | Losstatus nach Abmeldung  |     |

| 1.14  | Output batch logged on (CNR.OUTPUTLOGGEDON)  |     |     |     |
| ----- | -------------------------------------------- | --- | --- | --- |
This escalation is available as of Service Pack 16.

To use this escalation, you must explicitly activate the escalation. Activation instruction: See
here.

When the escalation has been activated, you must restart HYDRA.
After activation of the escalation, the data volume required to retain data in the escalation
management can increase considerably. This increase is subject to the specific data collection

method.
Observe the development of the data volume in the escalation management after activation and
change the archiving settings of the escalation management, if required.
If a batch is logged on as output batch, then this escalation is triggered. The data of the escalation
includes the information collected when the output batch is logged on.
| Event                |     | Identifiers  | Description                      |     |
| -------------------- | --- | ------------ | -------------------------------- | --- |
| CNR. OUTPUTLOGGEDON  |     | CNR.DLL      | Batch number                     |     |
|                      |     | CNR.CNR      | Internal batch number            |     |
|                      |     | CNR.ANR      | MES order number                 |     |
|                      |     | CNR.MNR      | Workplace                        |     |
|                      |     | CNR.PNR      | Personnel number                 |     |
|                      |     | CNR.KNR      | Staff badge number               |     |
|                      |     | CNR.CALT1..  | Alternative batch number 1...20  |     |
CNR.CALT20

| 1.15  | Output batch logged off (CNR.OUTPUTLOGGEDOFF)  |     |     |     |
| ----- | ---------------------------------------------- | --- | --- | --- |
This escalation is available as of Service Pack 16.

| TRT-ESK_82.docx  |     | Version: 1.0.23049  |     | Page 13 of 17  |
| ---------------- | --- | ------------------- | --- | -------------- |

|     |     |     | TRT Escalation Messages (AS)  |     |     |
| --- | --- | --- | ----------------------------- | --- | --- |

To use this escalation, you must explicitly activate the escalation. Activation instruction: See
here.

When the escalation has been activated, you must restart HYDRA.
After activation of the escalation, the data volume required to retain data in the escalation
management can increase considerably. This increase is subject to the specific data collection

method.
Observe the development of the data volume in the escalation management after activation and
change the archiving settings of the escalation management, if required.
If a batch is logged off as output batch, then this escalation is triggered. The data of the escalation
includes the information collected when the output batch is logged off.
| Event                |     | Identifiers  | Description            |         |       |
| -------------------- | --- | ------------ | ---------------------- | ------- | ----- |
| CNR. OUTPUTLOGGEDON  |     | CNR.DLL      | Batch number           |         |       |
|                      |     | CNR.CNR      | Internal batch number  |         |       |
|                      |     | CNR.ANR      | MES order number       |         |       |
|                      |     | CNR.MNR      | Workplace              |         |       |
|                      |     | CNR.PNR      | Personnel number       |         |       |
|                      |     | CNR.KNR      | Staff badge number     |         |       |
|                      |     | CNR.EGR      | Recorded quantity      |         |       |
|                      |     | CNR.EGE      | Unit                   |         |       |
|                      |     | CNR.CKL      | Class  (yield,         | scrap,  | open  |
quantity, rework)
|     |     | CNR.STA      | Status           |              |     |
| --- | --- | ------------ | ---------------- | ------------ | --- |
|     |     | CNR.EGG      | Reason           |              |     |
|     |     | CNR.ZLO      | Material buffer  |              |     |
|     |     | CNR.TPE      | Transport unit   |              |     |
|     |     | CNR.BEM      | Info on batch    |              |     |
|     |     | CNR.FU:1 –   | User fields      |              |     |
|     |     | CNR.FU:66    | Date  values     | are  output  | in  |
format "mm/dd/yyyy".
|     |     | CNR.CALT1 –   | Alternative batch number 1...5  |     |     |
| --- | --- | ------------- | ------------------------------- | --- | --- |
CNR.CALT5

| 1.16  | Input batch logged on in advance (CNR.PREREGISTERED)  |     |     |     |     |
| ----- | ----------------------------------------------------- | --- | --- | --- | --- |
This escalation is available as of Service Pack 16.

| TRT-ESK_82.docx  |     | Version: 1.0.23049  |     | Page 14 of 17  |     |
| ---------------- | --- | ------------------- | --- | -------------- | --- |

|     |     |     | TRT Escalation Messages (AS)  |     |
| --- | --- | --- | ----------------------------- | --- |

To use this escalation, you must explicitly activate the escalation. Activation instruction: See
here.

When the escalation has been activated, you must restart HYDRA.
After activation of the escalation, the data volume required to retain data in the escalation
management can increase considerably. This increase is subject to the specific data collection

method.
Observe the development of the data volume in the escalation management after activation and
change the archiving settings of the escalation management, if required.
If a batch is logged on in advance as input batch, then this escalation is triggered. The data of the
escalation includes the information collected when the input batch is logged on in advance. For further
information on the advance logon of an input batch, refer to the documentation MBL_Advance logon of
input batches.
| Event              |     | Identifiers  | Description            |     |
| ------------------ | --- | ------------ | ---------------------- | --- |
| CNR.PREREGISTERED  |     | CNR.DLL      | Batch number           |     |
|                    |     | CNR.CNR      | Internal batch number  |     |
|                    |     | CNR.ATK      | Article                |     |
|                    |     | CNR.ATKBEZ   | Article designation    |     |
|                    |     | CNR.ANR      | MES order number       |     |
|                    |     | CNR.MNR      | Workplace              |     |
|                    |     | CNR.PNR      | Personnel number       |     |
|                    |     | CNR.KNR      | Staff badge number     |     |
|                    |     | CNR.SLP      | BOM item               |     |

| 1.17  | Split batch (CNR.SPLITTED)  |     |     |     |
| ----- | --------------------------- | --- | --- | --- |
This escalation is available as of Service Pack 16.

To use this escalation, you must explicitly activate the escalation. Activation instruction: See
here.

When the escalation has been activated, you must restart HYDRA.
After activation of the escalation, the data volume required to retain data in the escalation
  management can increase considerably. This increase is subject to the specific data collection

| TRT-ESK_82.docx  |     | Version: 1.0.23049  |     | Page 15 of 17  |
| ---------------- | --- | ------------------- | --- | -------------- |

|     |     |     | TRT Escalation Messages (AS)  |     |
| --- | --- | --- | ----------------------------- | --- |

method.
Observe the development of the data volume in the escalation management after activation and
change the archiving settings of the escalation management, if required.
If a batch is split, then this escalation is triggered.
The identifier "CNR.SPLITTED" includes information about the batches that are created when a batch is
split. The following information is displayed for the split batches in the identifier "CNR.SPLITTED":
  Internal batch number (CNR)
  Quantity
  Class
  Reason
| Event          |     | Identifiers  | Description                     |     |
| -------------- | --- | ------------ | ------------------------------- | --- |
| CNR. SPLITTED  |     | CNR.CNR      | Internal batch number that was  |     |
split
|     |     | CNR.SPLITTED  | Array of the split batches. The  |              |
| --- | --- | ------------- | -------------------------------- | ------------ |
|     |     |               | array  includes                  | the  values  |
|     |     |               | "batch  number",                 | "quantity",  |
"class" and "reason" per batch
that is split off.

| 1.18  | Collective batch (CNR.SUMMARIZED)  |     |     |     |
| ----- | ---------------------------------- | --- | --- | --- |
This escalation is available as of Service Pack 16.

To use this escalation, you must explicitly activate the escalation. Activation instruction: See
here.

When the escalation has been activated, you must restart HYDRA.
After activation of the escalation, the data volume required to retain data in the escalation
management can increase considerably. This increase is subject to the specific data collection

method.
Observe the development of the data volume in the escalation management after activation and
change the archiving settings of the escalation management, if required.
If a collective batch is generated, then this escalation is triggered.

| TRT-ESK_82.docx  |     | Version: 1.0.23049  |     | Page 16 of 17  |
| ---------------- | --- | ------------------- | --- | -------------- |

|     |     |     | TRT Escalation Messages (AS)  |     |     |
| --- | --- | --- | ----------------------------- | --- | --- |

The identifier "CNR.SUMMARIZED" includes the information about the batches that were used to create
the  collective  batch.  For  the  batches  used  to  create  the  collective  batch,  the  identifier  "CNR.
SUMMARIZED" shows the batch number (CNR).
| Event           |     | Identifiers  | Description                      |     |     |
| --------------- | --- | ------------ | -------------------------------- | --- | --- |
| CNR.SUMMARIZED  |     | CNR.CNR      | Internal batch number of batch,  |     |     |
which is generated by merging
|     |     |     | the  other  | batches.  | This  |
| --- | --- | --- | ----------- | --------- | ----- |
identifier is always filled.
|     |     | CNR.SUMMARIZED  | Array of the batches used to  |     |     |
| --- | --- | --------------- | ----------------------------- | --- | --- |
create the collective batch.
|     |     | CNR.CNR:NEW  | If  mode    | "N  –  generate   | new  |
| --- | --- | ------------ | ----------- | ----------------- | ---- |
|     |     |              | batch"  is  | used  to  create  | the  |
collective batch, then this field
is filled.

| TRT-ESK_82.docx  |     | Version: 1.0.23049  |     |     | Page 17 of 17  |
| ---------------- | --- | ------------------- | --- | --- | -------------- |