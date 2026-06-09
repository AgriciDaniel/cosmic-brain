|     |     |     |     | Available Escalations  |
| --- | --- | --- | --- | ---------------------- |

1  Available Escalations

| 1.1  | Operation started (ANR.START)  |     |     |     |
| ---- | ------------------------------ | --- | --- | --- |
The event is triggered when an operation has been logged on.
The escalation is carried out even if the operation is logged on due to a shift change. The escalation is
only carried out in online mode.
| Event      |     | Identifiers  | Description                        |     |
| ---------- | --- | ------------ | ---------------------------------- | --- |
| ANR.START  |     | ANR.ANR      | Order + operation                  |     |
|            |     | ANR.AUNR     | Order                              |     |
|            |     | ANR.AGNR     | Operation                          |     |
|            |     | ANR.AFOLG    | Sequence                           |     |
|            |     | ANR.UAGNR    | Suboperation number                |     |
|            |     | ANR.AKT      | Article                            |     |
|            |     | ANR.AGBEZ    | OP name                            |     |
|            |     | ANR.AART     | Order type                         |     |
|            |     | ANR.SPLNR    | Split number                       |     |
|            |     | ANR.MNR      | Workplace                          |     |
|            |     | ANR.MGRP     | Group                              |     |
|            |     | ANR.PNR      | Personnel number of the reporting  |     |
person
|     |     | ANR.KNR  | The reporting person's badge  |     |
| --- | --- | -------- | ----------------------------- | --- |
number
|      |                                  | ANR.AST    | OP status              |     |
| ---- | -------------------------------- | ---------- | ---------------------- | --- |
|      |                                  | ANR.PKENN  | Production identifier  |     |
|      |                                  | DAT        | Date of escalation     |     |
|      |                                  | ZEI        | Time of escalation     |     |
|      |                                  | BEARB      | Modified by            |     |
| 1.2  | Manual posting of part quantity  |            |                        |     |
(ANR.PARTIAL_CONFIRMATION)
The event is triggered if a manual posting of a part quantity has been made for an order. The escalation is
only carried out in online mode.

| MBL_ESK_BDE_Overview.docx  |     |     | Version: 1.2.22819  | Page 1 of 18  |
| -------------------------- | --- | --- | ------------------- | ------------- |

Available Escalations
Event Identifiers Description
ANR.PARTIAL_CONFI ANR.ANR Order + operation
RMATION
ANR.AUNR Order
ANR.AGNR Operation
ANR.AFOLG Sequence
ANR.UAGNR Suboperation number
ANR.AKT Article
ANR.AGBEZ OP name
ANR.AART Order type
ANR.SPLNR Split number
ANR.MNR Workplace
ANR.MGRP Group
ANR.PNR Personnel number of the
reporting person
ANR.KNR The reporting person's badge
number
ANR.AST OP status
ANR.PKENN Production identifier
DAT Date of escalation
ZEI Time of escalation
BEARB Modified by
BEM Comment
Quantities from logon dialog:
ANR.EGR:GUT Yield
ANR.EGR:AUS Scrap
ANR.EGR:NCH Rework quantity
ANR.EGR:PRB Problem quantity
ANR.EGE:GUT Quantity unit
ANR.EGG:GUT Reason for yield
ANR.EGG:AUS Scrap reason
ANR.EGG:NCH Rework reason
ANR.EGG:PRB Problem reason
ANR.EGT:GUT Reason for yield text no.
ANR.EGT:AUS Scrap reason text no.
ANR.EGT:NCH Rework reason text no.
ANR.EGT:PRB Problem reason text no.
Order data:
AUNR.DATSE Basic end dates of order (date)
AUNR.DATTERME Scheduled end of order (date)
MBL_ESK_BDE_Overview.docx Version: 1.2.22819 Page 2 of 18

Available Escalations
Event Identifiers Description
AUNR.DISP MRP controller
AUNR.AUGRP Order group
Operation data, stock data
ANR.SGR.GUTP Primary target quantity of OP
ANR.DATE Planned end of OP (date)
ANR.DATSE Latest end of OP (date)
ANR.DATTERME Scheduled end of OP (date)
ANR.VAB Responsibility area
ANR.BEARBZ Target duration of OP
ANR.RUEZ Target setup time of OP
Status information of operation data:
ANR.EGR:GUTP Yield (primary)
ANR.EGR.AUSP Scrap quantity (primary)
ANR.EGR.NCHP Rework quantity (primary)
ANR.EGR.PRBP Problem quantity (primary)
ANR.EGR:BMK01 Actual duration RPA 1
ANR.EGR:BMK02 Actual duration RPA 2
ANR.EGR:BMK03 Actual duration RPA 3
ANR.EGR:BMK04 Actual duration RPA 4
ANR.EGR:BMK05 Actual duration RPA 5
ANR.EGR:BMK06 Actual duration RPA 6
ANR.EGR:BMK07 Actual duration RPA 7
ANR.EGR:BMK08 Actual duration RPA 8
ANR.EGR:BMK09 Actual duration RPA 9
ANR.EGR:BMK10 Actual duration RPA 10
ANR.EGR:BMK11 Actual duration RPA 11
ANR.EGR:BMK12 Actual duration RPA 12
Workplace master data:
MNR.BEZK Short name
MNR.BEZL Designation
MNR.MGRP Group
MNR.KST Cost center
MNR.FIR Company
MNR.VAB Responsibility area
Personal master data:
PNR.PNR Person
PNR.PVORNAME First name
MBL_ESK_BDE_Overview.docx Version: 1.2.22819 Page 3 of 18

Available Escalations
Event Identifiers Description
PNR.PNAME Last name
Reporting data EBDF:
MSGPRIO Priority
1 = highest
2 = high
3 = normal
4 = low
5 = lowest
MSGPRIO from dialog data
MSGCLASS Information class/importance
I = information
W = warning
E = error
MSGCLASS from dialog data
MSGRCV Recipient/addressee, e.g.
group of plant managers
MSGRCV from dialog data
1.3 Operation interrupted (ANR.INTERRUPT)
The event is triggered when an operation has been interrupted.
The escalation is also performed if the operation is interrupted due to a shift change. The escalation is
only carried out in online mode.
Event Identifiers Description
ANR.INTERRUPT ANR.ANR Order + operation
ANR.AUNR Order
ANR.AGNR Operation
ANR.AFOLG Sequence
ANR.UAGNR Suboperation number
ANR.AKT Article
ANR.AGBEZ OP name
ANR.AART Order type
ANR.SPLNR Split number
ANR.MNR Workplace
ANR.MGRP Group
MBL_ESK_BDE_Overview.docx Version: 1.2.22819 Page 4 of 18

Available Escalations
Event Identifiers Description
ANR.PNR Personnel number of the
reporting person
ANR.KNR The reporting person's badge
number
ANR.AST OP status
ANR.PKENN Production identifier
DAT Date of escalation
ZEI Time of escalation
BEARB Modified by
BEM Comment
Quantities from logon dialog:
ANR.EGR:GUT Yield
ANR.EGR:AUS Scrap
ANR.EGR:NCH Rework quantity
ANR.EGR:PRB Problem quantity
ANR.EGE:GUT Quantity unit
ANR.EGG:GUT Yield reason (deviation reason)
ANR.EGG:AUS Scrap reason
ANR.EGG:NCH Rework reason
ANR.EGG:PRB Problem reason
ANR.EGT:GUT Reason for yield text no.
ANR.EGT:AUS Scrap reason text no.
ANR.EGT:NCH Rework reason text no.
ANR.EGT:PRB Problem reason text no.
Order data:
AUNR.DATSE Basic end dates of order (date)
AUNR.DATTERME Scheduled end of order (date)
AUNR.DISP MRP controller
AUNR.AUGRP Order group
Operation data, stock data
ANR.SGR.GUTP Primary target quantity of OP
ANR.DATE Planned end of OP (date)
ANR.DATSE Latest end of OP (date)
ANR.DATTERME Scheduled end of OP (date)
ANR.VAB Responsibility area
ANR.BEARBZ Target duration of OP
ANR.RUEZ Target setup time of OP
Status information of operation data:
MBL_ESK_BDE_Overview.docx Version: 1.2.22819 Page 5 of 18

Available Escalations
Event Identifiers Description
ANR.EGR:GUTP Yield (primary)
ANR.EGR.AUSP Scrap quantity (primary)
ANR.EGR.NCHP Rework quantity (primary)
ANR.EGR.PRBP Problem quantity (primary)
ANR.EGR:BMK01 Actual duration RPA 1
ANR.EGR:BMK02 Actual duration RPA 2
ANR.EGR:BMK03 Actual duration RPA 3
ANR.EGR:BMK04 Actual duration RPA 4
ANR.EGR:BMK05 Actual duration RPA 5
ANR.EGR:BMK06 Actual duration RPA 6
ANR.EGR:BMK07 Actual duration RPA 7
ANR.EGR:BMK08 Actual duration RPA 8
ANR.EGR:BMK09 Actual duration RPA 9
ANR.EGR:BMK10 Actual duration RPA 10
ANR.EGR:BMK11 Actual duration RPA 11
ANR.EGR:BMK12 Actual duration RPA 12
Workplace master data:
MNR.BEZK Short name
MNR.BEZL Designation
MNR.MGRP Group
MNR.KST Cost center
MNR.FIR Company
MNR.VAB Responsibility area
Personal master data:
PNR.PNR Person
PNR.PVORNAME First name
PNR.PNAME Last name
Reporting data EBDF:
MSGPRIO Priority
1 = highest
2 = high
3 = normal
4 = low
5 = lowest
MSGPRIO from dialog data
MBL_ESK_BDE_Overview.docx Version: 1.2.22819 Page 6 of 18

|     |     |     |     |     | Available Escalations  |     |
| --- | --- | --- | --- | --- | ---------------------- | --- |

| Event  |     | Identifiers  | Description   |     |     |     |
| ------ | --- | ------------ | ------------- | --- | --- | --- |
MSGCLASS  Information class/importance
I = information
W = warning
E = error
MSGCLASS from dialog data
MSGRCV  Recipient/addressee, e.g.
group of plant managers
MSGRCV from dialog data

| 1.4  | Operation finished (ANR.END)  |     |     |     |     |     |
| ---- | ----------------------------- | --- | --- | --- | --- | --- |
The event is triggered as soon as an operation has been finished. The escalation is only carried out in
online mode.
| Event          |     | Identifiers  | Description        |     |     |     |
| -------------- | --- | ------------ | ------------------ | --- | --- | --- |
| ANR.INTERRUPT  |     | ANR.ANR      | Order + operation  |     |     |     |
|                |     | ANR.AUNR     | Order              |     |     |     |

ANR.AGNR  Operation
ANR.AFOLG  Sequence
ANR.UAGNR  Suboperation number
ANR.AKT  Article
ANR.AGBEZ  OP name
ANR.AART  Order type
ANR.SPLNR  Split number
ANR.MNR  Workplace
ANR.MGRP  Group
ANR.AST  OP status
|     |     | ANR.PNR  | Personnel  | number  | of  the  |     |
| --- | --- | -------- | ---------- | ------- | -------- | --- |
reporting person
|     |     | ANR.KNR  | The  reporting  | person's  | badge  |     |
| --- | --- | -------- | --------------- | --------- | ------ | --- |
number
ANR.PKENN  Production identifier
DAT  Date of escalation
ZEI  Time of escalation
BEARB  Modified by
BEM  Comment
Quantities from logon dialog:

| MBL_ESK_BDE_Overview.docx  |     |     | Version: 1.2.22819  |     |     | Page 7 of 18  |
| -------------------------- | --- | --- | ------------------- | --- | --- | ------------- |

Available Escalations
Event Identifiers Description
ANR.EGR:GUT Yield
ANR.EGR:AUS Scrap
ANR.EGR:NCH Rework quantity
ANR.EGR:PRB Problem quantity
ANR.EGE:GUT Quantity unit
ANR.EGG:GUT Yield reason (deviation reason)
ANR.EGG:AUS Scrap reason
ANR.EGG:NCH Rework reason
ANR.EGG:PRB Problem reason
ANR.EGT:GUT Reason for yield text no.
ANR.EGT:AUS Scrap reason text no.
ANR.EGT:NCH Rework reason text no.
ANR.EGT:PRB Problem reason text no.
Order data:
AUNR.DATSE Basic end dates of order (date)
AUNR.DATTERME Scheduled end of order (date)
AUNR.DISP MRP controller
AUNR.AUGRP Order group
Operation data, stock data
ANR.SGR.GUTP Primary target quantity of OP
ANR.DATE Planned end of OP (date)
ANR.DATSE Latest end of OP (date)
ANR.DATTERME Scheduled end of OP (date)
ANR.VAB Responsibility area
ANR.BEARBZ Target duration of OP
ANR.RUEZ Target setup time of OP
Status information of operation data:
ANR.EGR:GUTP Yield (primary)
ANR.EGR.AUSP Scrap quantity (primary)
ANR.EGR.NCHP Rework quantity (primary)
ANR.EGR.PRBP Problem quantity (primary)
ANR.EGR:BMK01 Actual duration RPA 1
ANR.EGR:BMK02 Actual duration RPA 2
ANR.EGR:BMK03 Actual duration RPA 3
ANR.EGR:BMK04 Actual duration RPA 4
ANR.EGR:BMK05 Actual duration RPA 5
ANR.EGR:BMK06 Actual duration RPA 6
MBL_ESK_BDE_Overview.docx Version: 1.2.22819 Page 8 of 18

Available Escalations
Event Identifiers Description
ANR.EGR:BMK07 Actual duration RPA 7
ANR.EGR:BMK08 Actual duration RPA 8
ANR.EGR:BMK09 Actual duration RPA 9
ANR.EGR:BMK10 Actual duration RPA 10
ANR.EGR:BMK11 Actual duration RPA 11
ANR.EGR:BMK12 Actual duration RPA 12
Workplace master data:
MNR.BEZK Short name
MNR.BEZL Designation
MNR.MGRP Group
MNR.KST Cost center
MNR.FIR Company
MNR.VAB Responsibility area
Personal master data:
PNR.PNR Person
PNR.PVORNAME First name
PNR.PNAME Last name
Reporting data EBDF:
MSGPRIO Priority
1 = highest
2 = high
3 = normal
4 = low
5 = lowest
MSGPRIO from dialog data
MSGCLASS Information class/importance
I = information
W = warning
E = error
MSGCLASS from dialog data
MSGRCV Recipient/addressee, e.g.
group of plant managers
MSGRCV from dialog data
1.5 Operation scheduled (ANR.MANUAL_SCHEDULED)
The event is triggered when an operation is moved from the pool for the group to the pool for the
machine/workplace in the MOC application Order sequencing.
MBL_ESK_BDE_Overview.docx Version: 1.2.22819 Page 9 of 18

|     |     |     |     | Available Escalations  |
| --- | --- | --- | --- | ---------------------- |

| Event                 |     | Identifiers  | Description         |     |
| --------------------- | --- | ------------ | ------------------- | --- |
| ANR.MANUAL_SCHEDULED  |     | ANR.ANR      | Order + operation   |     |
|                       |     | ANR.AUNR     | Order               |     |
|                       |     | ANR.AGNR     | Operation           |     |
|                       |     | ANR.AFOLG    | Sequence            |     |
|                       |     | ANR.UAGNR    | Sub-operation No.   |     |
|                       |     | ANR.AKT      | Article             |     |
|                       |     | ANR.AGBEZ    | OP name             |     |
|                       |     | ANR.AART     | Order type          |     |
|                       |     | ANR.SPLNR    | Split number        |     |
|                       |     | ANR.MNR      | Workplace           |     |
|                       |     | ANR.MGRP     | Group               |     |
|                       |     | DAT          | Date of escalation  |     |
|                       |     | ZEI          | Time of escalation  |     |
|                       |     | BEARB        | Modified by         |     |

| 1.6  | Operation deallocated (ANR. MANUAL_DEALLOCATE)  |     |     |     |
| ---- | ----------------------------------------------- | --- | --- | --- |
The event is triggered when an operation is moved from the pool for the machine/workplace to the pool
for the group in the MOC application Order sequencing. The “planned” field is set to the entry “G”.
| Event                  |     | Identifiers  | Description         |     |
| ---------------------- | --- | ------------ | ------------------- | --- |
| ANR.MANUAL_DEALLOCATE  |     | ANR.ANR      | Order + operation   |     |
|                        |     | ANR.AUNR     | Order               |     |
|                        |     | ANR.AGNR     | Operation           |     |
|                        |     | ANR.AFOLG    | Sequence            |     |
|                        |     | ANR.UAGNR    | Sub-operation No.   |     |
|                        |     | ANR.AKT      | Article             |     |
|                        |     | ANR.AGBEZ    | OP name             |     |
|                        |     | ANR.AART     | Order type          |     |
|                        |     | ANR.SPLNR    | Split number        |     |
|                        |     | ANR.MNR      | Workplace           |     |
|                        |     | ANR.MGRP     | Group               |     |
|                        |     | DAT          | Date of escalation  |     |
|                        |     | ZEI          | Time of escalation  |     |
|                        |     | BEARB        | Modified by         |     |

MBL_ESK_BDE_Overview.docx  Version: 1.2.22819  Page 10 of 18

|     |     |     |     | Available Escalations  |
| --- | --- | --- | --- | ---------------------- |

| 1.7  | Operation status changed (ANR.STATUS_CHANGE)  |     |     |     |
| ---- | --------------------------------------------- | --- | --- | --- |
The event is triggered, provided that the status of the operation has been changed.
| Event               |     | Identifiers  | Description            |     |
| ------------------- | --- | ------------ | ---------------------- | --- |
| ANR.STATUS_CHANGE   |     | ANR.ANR      | Order + operation      |     |
|                     |     | ANR.AUNR     | Order                  |     |
|                     |     | ANR.AGNR     | Operation              |     |
|                     |     | ANR.AFOLG    | Sequence               |     |
|                     |     | ANR.UAGNR    | Sub-operation No.      |     |
|                     |     | ANR.AKT      | Article                |     |
|                     |     | ANR.AGBEZ    | OP name                |     |
|                     |     | ANR.AART     | Order type             |     |
|                     |     | ANR.SPLNR    | Split number           |     |
|                     |     | ANR.MNR      | Workplace              |     |
|                     |     | ANR.MGRP     | Group                  |     |
|                     |     | ANR.AST      | OP status              |     |
|                     |     | ANR.PKENN    | Production identifier  |     |
|                     |     | DAT          | Date of escalation     |     |
|                     |     | ZEI          | Time of escalation     |     |
|                     |     | BEARB        | Modified by            |     |

| 1.8  | Operation has been reactivated (ANR.REACTIVATE)  |     |     |     |
| ---- | ------------------------------------------------ | --- | --- | --- |
The event is triggered, provided that an operation has been reactivated.
| Event            |     | Identifiers  | Description        |     |
| ---------------- | --- | ------------ | ------------------ | --- |
| ANR.REACTIVATE   |     | ANR.ANR      | Order + operation  |     |
|                  |     | ANR.AUNR     | Order              |     |
|                  |     | ANR.AGNR     | Operation          |     |
|                  |     | ANR.AFOLG    | Sequence           |     |
|                  |     | ANR.UAGNR    | Sub-operation No.  |     |
|                  |     | ANR.AKT      | Article            |     |
|                  |     | ANR.AGBEZ    | OP name            |     |

MBL_ESK_BDE_Overview.docx  Version: 1.2.22819  Page 11 of 18

|     |     |     |     | Available Escalations  |
| --- | --- | --- | --- | ---------------------- |

| Event  |     | Identifiers  | Description            |     |
| ------ | --- | ------------ | ---------------------- | --- |
|        |     | ANR.AART     | Order type             |     |
|        |     | ANR.SPLNR    | Split number           |     |
|        |     | ANR.MNR      | Workplace              |     |
|        |     | ANR.MGRP     | Group                  |     |
|        |     | ANR.AST      | OP status              |     |
|        |     | ANR.PKENN    | Production identifier  |     |
|        |     | DAT          | Date of escalation     |     |
|        |     | ZEI          | Time of escalation     |     |
|        |     | BEARB        | Modified by            |     |

| 1.9  | LOCK/UNLOCK of an OP (ANR.LOCK/UNLOCK)  |     |     |     |
| ---- | --------------------------------------- | --- | --- | --- |
A “lock” is executed when data is being edited to ensure that several users do not modify the data record
simultaneously. The “lock” is removed (“unlocked”) once the modification has been completed.
| Event       |     | Identifiers  | Description            |     |
| ----------- | --- | ------------ | ---------------------- | --- |
| ANR.LOCK    |     | ANR.ANR      | Order + operation      |     |
| ANR.UNLOCK  |     | ANR.AUNR     | Order                  |     |
|             |     | ANR.AGNR     | Operation              |     |
|             |     | ANR.AFOLG    | Sequence               |     |
|             |     | ANR.UAGNR    | Sub-operation No.      |     |
|             |     | ANR.AKT      | Article                |     |
|             |     | ANR.AGBEZ    | OP name                |     |
|             |     | ANR.AART     | Order type             |     |
|             |     | ANR.SPLNR    | Split number           |     |
|             |     | ANR.MNR      | Workplace              |     |
|             |     | ANR.MGRP     | Group                  |     |
|             |     | ANR.AST      | OP status              |     |
|             |     | ANR.PKENN    | Production identifier  |     |
|             |     | DAT          | Date of escalation     |     |
|             |     | ZEI          | Time of escalation     |     |
|             |     | BEARB        | Modified by            |     |

MBL_ESK_BDE_Overview.docx  Version: 1.2.22819  Page 12 of 18

|     |     |     |     | Available Escalations  |
| --- | --- | --- | --- | ---------------------- |

| 1.10  | Primary target quantity reached  |     |     |     |
| ----- | -------------------------------- | --- | --- | --- |
(ANR.TARGET_QUANTITY_REACHED)
This escalation is triggered if an operation is automatically interrupted/logged off as its target quantity has
been reached.
Please note:
A configuration of the processing code specifies whether or not an operation is automatically
interrupted/finished, when the target quantity is reached. This escalation is never triggered, in case this
configuration is not active!
| Event                |     | Identifiers  | Description        |     |
| -------------------- | --- | ------------ | ------------------ | --- |
| ANR.TARGET_QUANTITY_ |     | ANR.ANR      | Order + operation  |     |
REACHED
|     |     | ANR.AUNR  | Order  |     |
| --- | --- | --------- | ------ | --- |

|       |                                        | ANR.AGNR      | Operation           |     |
| ----- | -------------------------------------- | ------------- | ------------------- | --- |
|       |                                        | ANR.AFOLG     | Sequence            |     |
|       |                                        | ANR.UAGNR     | Sub operation no.   |     |
|       |                                        | ANR.AKT       | Article             |     |
|       |                                        | ANR.AGBEZ     | OP name             |     |
|       |                                        | ANR.AART      | Order type          |     |
|       |                                        | ANR.SPLNR     | Split number        |     |
|       |                                        | ANR.MNR       | Workplace           |     |
|       |                                        | ANR.MGRP      | Group               |     |
|       |                                        | ANR.AST       | OP status           |     |
|       |                                        | ANR.SGR:GUTP  | Target quantity     |     |
|       |                                        | ANR:EGR:GUTP  | Actual quantity     |     |
|       |                                        | DAT           | Date of escalation  |     |
|       |                                        | ZEI           | Time of escalation  |     |
| 1.11  | Comment entered (ANR.REGISTER_REMARK)  |               |                     |     |
The comments recorded by the  "BDE comment"  function at the Windows terminal may trigger  an
escalation.
| Event                |     | Identifiers  | Description        |     |
| -------------------- | --- | ------------ | ------------------ | --- |
| ANR.REGISTER_REMARK  |     | ANR.ANR      | Order + operation  |     |

|     |     | ANR.AUNR  | Order  |     |
| --- | --- | --------- | ------ | --- |

MBL_ESK_BDE_Overview.docx  Version: 1.2.22819  Page 13 of 18

|     |     |     |     | Available Escalations  |
| --- | --- | --- | --- | ---------------------- |

| Event  |     | Identifiers  | Description                |     |
| ------ | --- | ------------ | -------------------------- | --- |
|        |     | ANR.AGNR     | Operation                  |     |
|        |     | ANR.AFOLG    | Sequence                   |     |
|        |     | ANR.UAGNR    | Sub operation no.          |     |
|        |     | ANR.SPLNR    | Split number               |     |
|        |     | ANR.MNR      | Workplace                  |     |
|        |     | ANR.PNR      | Person                     |     |
|        |     | ANR.KNR      | Badge number               |     |
|        |     | BEM          | Comment                    |     |
|        |     | ANR.DAT      | Date of escalation         |     |
|        |     | ANR.ZEI      | Time of escalation         |     |
|        |     | ANR.ATK      | Article of the operation   |     |
Personal master data
|     |     | PNR.PVORNAME    | The person's first name   |     |
| --- | --- | --------------- | ------------------------- | --- |
|     |     | PNR:PNAME       | The person's surname      |     |
|     |     | PNR.FIR         | Company                   |     |
|     |     | PNR.KST         | Cost center               |     |
|     |     | PNR.BER         | Area                      |     |
|     |     | PNR.ABT         | Department                |     |
|     |     | PNR.KREIS       | Employee subgroup         |     |
|     |     | PNR.TAETIGKEIT  | Activity                  |     |
|     |     | PNR.VAB         | Responsibility area       |     |
Workplace master data
|     |     | MNR.FIR    | Company                |     |
| --- | --- | ---------- | ---------------------- | --- |
|     |     | MNR.KST    | Cost center            |     |
|     |     | MNR.MGRP   | Group                  |     |
|     |     | MNR.BEZK   | Workplace designation  |     |
|     |     | MNR.BEZL   | Comment                |     |
|     |     | MNR.VAB    | Responsibility area    |     |

| 1.12  | Non-authorized posting (ANR.UNCERTIFIED_BOOKINGS)  |     |     |     |
| ----- | -------------------------------------------------- | --- | --- | --- |
The event is triggered when a posting record is generated that must be approved/authorized. Only order
postings and personnel postings (U/E or B record) are integrated here.
An order posting must be authorized if the option Order postings need to be signed is enabled in tab
| Options for the relevant order type.   |     |     |     |     |
| -------------------------------------- | --- | --- | --- | --- |

MBL_ESK_BDE_Overview.docx  Version: 1.2.22819  Page 14 of 18

|     |     |     |     | Available Escalations  |
| --- | --- | --- | --- | ---------------------- |

A personnel posting must be authorized if the option Personnel postings need to be signed is enabled in
tab Options for the relevant order type.
| Event            |     | Identifiers  | Description        |     |
| ---------------- | --- | ------------ | ------------------ | --- |
| ANR.UNCERTIFIED_ |     | ANR.ANR      | Order + operation  |     |
BOOKINGS
|     |     | ANR.AUNR  | Order  |     |
| --- | --- | --------- | ------ | --- |

|     |     | ANR.AGNR   | Operation          |     |
| --- | --- | ---------- | ------------------ | --- |
|     |     | ANR.AFOLG  | Sequence           |     |
|     |     | ANR.UAGNR  | Sub-operation No.  |     |
|     |     | ANR.ATK    | Article            |     |
Article name
ANR.ATKBEZ
|     |     | ANR.AGBEZ    | OP name                               |     |
| --- | --- | ------------ | ------------------------------------- | --- |
|     |     | ANR.AART     | Order type                            |     |
|     |     | ANR.SPLNR    | Split number                          |     |
|     |     | ANR.MNR      | Workplace                             |     |
|     |     | ANR.MGRP     | Group                                 |     |
|     |     | ADEPRO.SART  | Record type of the log record (B, U,  |     |
E)
|     |     | DAT         | Date of escalation  |     |
| --- | --- | ----------- | ------------------- | --- |
|     |     | ZEI         | Time of escalation  |     |
|     |     | AUNR.DISP   | MRP controller      |     |
|     |     | AUNR.AUGRP  | Order group         |     |
|     |     | AGNR.DATE   | Logoff date         |     |
|     |     | AGNR.ZEIE   | Logoff time         |     |
Personal master data:
|     |     | PNR.PNR         | Person               |     |
| --- | --- | --------------- | -------------------- | --- |
|     |     | PNR.PVORNAME    | First name           |     |
|     |     | PNR.PNAME       | Last name            |     |
|     |     | PNR.FIR         | Company              |     |
|     |     | PNR.KST         | Cost center          |     |
|     |     | PNR.BER         | Area                 |     |
|     |     | PNR.ABT         | Department           |     |
|     |     | PNR.KREIS       | Employee subgroup    |     |
|     |     | PNR.TAETIGKEIT  | Activity             |     |
|     |     | PNR.VAB         | Responsibility area  |     |

MBL_ESK_BDE_Overview.docx  Version: 1.2.22819  Page 15 of 18

|     |     |     |     | Available Escalations  |
| --- | --- | --- | --- | ---------------------- |

| 1.13  | Quantity posting (ANR.QUANTITY_POSTING)  |     |     |     |
| ----- | ---------------------------------------- | --- | --- | --- |
The ANR.QUANTITY_POSTING escalation is triggered if a quantity is posted with one of the following
postings:
  Automatic quantity postings
  Manual quantity postings
  Postings of part quantities (partial confirmations)
  Operation logoffs
  Interruptions.
The escalation is only carried out in online mode.
At the time when this escalation is triggered, no log record is generated. If quantities are
posted according to a specific configuration, then these quantities are not used here.

Here, the action is only order-related:
| Event           |     | Identifiers  | Description        |     |
| --------------- | --- | ------------ | ------------------ | --- |
| ANR.QUANTITY_PO |     | ANR.ANR      | Order + operation  |     |

STING
|     |     | ANR.AUNR      | Order                                       |     |
| --- | --- | ------------- | ------------------------------------------- | --- |
|     |     | ANR.AGNR      | Operation                                   |     |
|     |     | ANR.AFOLG     | Sequence                                    |     |
|     |     | ANR.UAGNR     | Sub operation no.                           |     |
|     |     | ANR.ATK       | Article                                     |     |
|     |     | ANR.ATKBEZ    | Article designation                         |     |
|     |     | ANR.AGBEZ     | OP name                                     |     |
|     |     | ANR.AART      | Order type                                  |     |
|     |     | ANR.SPLNR     | Split number                                |     |
|     |     | ANR.AST       | OP status                                   |     |
|     |     | ANR.PKENN     | Control/production identifier               |     |
|     |     | ANR.SGR:GUTP  | Target quantity, primary quantity unit      |     |
|     |     | ANR.SGR:AUSP  | Target scrap, primary quantity unit         |     |
|     |     | ANR.SGE:P     | Primary quantity unit                       |     |
|     |     | EGR:GUT       | Yield to be posted, primary quantity unit   |     |
|     |     | EGR:AUS       | Scrap to be posted, primary quantity unit   |     |
|     |     | EGR:NCH       | Rework to be posted, primary quantity unit  |     |

MBL_ESK_BDE_Overview.docx  Version: 1.2.22819  Page 16 of 18

|     |     |     |     | Available Escalations  |
| --- | --- | --- | --- | ---------------------- |

| Event  |     | Identifiers  | Description                             |     |
| ------ | --- | ------------ | --------------------------------------- | --- |
|        |     | EGR:PRB      | Problem quantity to be posted, primary  |     |
quantity unit
|     |     | EGG:GUT      | Yield reason                                    |     |
| --- | --- | ------------ | ----------------------------------------------- | --- |
|     |     | EGG:AUS      | Scrap reason                                    |     |
|     |     | EGG:NCH      | Rework reason                                   |     |
|     |     | EGG:PRB      | Problem reason                                  |     |
|     |     | ANR.EGR:GUT  | Current (previous) yield primary quantity unit  |     |
*)
|     |     | ANR.EGR:AUS  | Current (previous) scrap primary quantity unit  |     |
| --- | --- | ------------ | ----------------------------------------------- | --- |
*)
|     |     | ANR.EGR:NCH  | Current (previous) rework primary quantity  |     |
| --- | --- | ------------ | ------------------------------------------- | --- |
unit *)
|     |     | ANR.EGR:PRB  | Current (previous) problem quantity primary  |     |
| --- | --- | ------------ | -------------------------------------------- | --- |
quantity unit *)
|     |     | MNR       | Workplace where data collection takes place  |     |
| --- | --- | --------- | -------------------------------------------- | --- |
|     |     | MNR.MGRP  | Workplace group according to the             |     |
configuration
|     |     | MNR.KST  | Cost center of the workplace according to  |     |
| --- | --- | -------- | ------------------------------------------ | --- |
configuration
|     |     | MNR.FIR  | Company of the workplace according to  |     |
| --- | --- | -------- | -------------------------------------- | --- |
configuration
|     |     | MNR.VAB  | Responsibility area of the workplace  |     |
| --- | --- | -------- | ------------------------------------- | --- |
according to configuration
|     |     | MNR.FU:7   | Machine user field 7   |     |
| --- | --- | ---------- | ---------------------- | --- |
|     |     | MNR.FU:8   | Machine user field 8   |     |
|     |     | MNR.FU:9   | Machine user field 9   |     |
|     |     | MNR.FU:10  | Machine user field 10  |     |
|     |     | MNR.FU:11  | Machine user field 11  |     |
|     |     | MNR.FU:12  | Machine user field 12  |     |
|     |     | MNR.FU:13  | Machine user field 13  |     |
|     |     | MNR.FU:14  | Machine user field 14  |     |
|     |     | MNR.FU:15  | Machine user field 15  |     |
|     |     | MNR.FU:16  | Machine user field 16  |     |
|     |     | MNR.FU:17  | Machine user field 17  |     |
|     |     | MNR.FU:18  | Machine user field 18  |     |
|     |     | MNR.FU:19  | Machine user field 19  |     |
|     |     | MNR.FU:20  | Machine user field 20  |     |
|     |     | MNR.FU:21  | Machine user field 21  |     |
|     |     | MNR.FU:22  | Machine user field 22  |     |

MBL_ESK_BDE_Overview.docx  Version: 1.2.22819  Page 17 of 18

|     |     |     |     |     | Available Escalations  |
| --- | --- | --- | --- | --- | ---------------------- |

| 1.14  | Order header finished  |     |     |     |     |
| ----- | ---------------------- | --- | --- | --- | --- |
(ANR.OPEN_OP_WHEN_LAST_OP_ENDED)
This escalation monitors finished orders if the included operations are not all finished. This escalation is
triggered if the last operation of an order is finished but the order cannot be set to the "finished" status as
there are still open OPs. The number of operations, which have not yet been finished, is indicated in the
escalation message.
| Event            |     | Identifiers  | Description   |     |     |
| ---------------- | --- | ------------ | ------------- | --- | --- |
| ANR.OPEN_OP_WHEN |     | AUNR.AUNR    | Order         |     |     |
_LAST_OP_ENDED
|     |     | AUNR.AKT       | Article                          |                 |      |
| --- | --- | -------------- | -------------------------------- | --------------- | ---- |
|     |     | AUNR.ATKBEZ    | Article designation              |                 |      |
|     |     | AUNR.AART      | Order type                       |                 |      |
|     |     | AUNR.AST       | Order status                     |                 |      |
|     |     | AUNR.SGR:GUTB  | Target quantity (basis)          |                 |      |
|     |     | AUNR.SGE:B     | Target quantity unit (basis)     |                 |      |
|     |     | AUNR.SGR:AUSB  | Target scrap (basis)             |                 |      |
|     |     | AUNR.EGE:B     | Actual quantity unit (basis)     |                 |      |
|     |     | AUNR:EGR:GUTB  | Actual yield (basis)             |                 |      |
|     |     | AUNR.EGR:AUSB  | Actual scrap (basis)             |                 |      |
|     |     | AUNR:EGR:NCHB  | Actual rework quantity (basis)   |                 |      |
|     |     | AUNR.EGR:PRBB  | Actual problem quantity (basis)  |                 |      |
|     |     | AUNR.DISP      | MRP controller                   |                 |      |
|     |     | AUNR.AUGRP     | Order group                      |                 |      |
|     |     | AUNR.DATSE     | Basic end dates of order         |                 |      |
|     |     | AUNR.ZEISE     | Basic end dates of order         |                 |      |
|     |     | AUNR.DATTERME  | Scheduled end of order           |                 |      |
|     |     | AUNR.ZEITERME  | Scheduled end of order           |                 |      |
|     |     | AUNR.OPENOP    | Number of OPs that have not      |                 |      |
|     |     |                | yet  been                        | finished  when  | the  |
order is finished, i.e. assigned
to prod_kenn <> {Y,D,E}

| Note for actual quantities:  |     |     |     |     |     |
| ---------------------------- | --- | --- | --- | --- | --- |
Collected actual quantities are entered in the base quantity unit of the last OP where quantities were
posted. Requirement: the conversion factors must be stored.

MBL_ESK_BDE_Overview.docx  Version: 1.2.22819  Page 18 of 18