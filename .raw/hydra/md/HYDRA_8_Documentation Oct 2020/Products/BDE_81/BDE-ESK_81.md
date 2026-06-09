Manual

Escalation Messages for Shop
Floor Data Collection
BDE-ESK 8.1

Version 1.0.4716

Last changed on: 19.06.2020

  Escalation Messages for Shop Floor Data Collection

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

BDE-ESK_81.docx

Version: 1.0.18468

Page 2 of 23

  Escalation Messages for Shop Floor Data Collection

Contents

1  Übersicht Eskalationsmeldungen zur BDE .................................................. 4

2  Available Escalations ................................................................................... 5

2.1  Operation started (ANR.START) ......................................................................... 5

2.2  Manual partial upload (ANR.PARTIAL_CONFIRMATION) .................................. 5

2.3  Operation interrupted (ANR.INTERRUPT) .......................................................... 8

2.4  Operation finished (ANR.END) .......................................................................... 11

2.5  Operation planned (ANR.MANUAL_SCHEDULED)........................................... 13

2.6  Operation deallocated (ANR. MANUAL_DEALLOCATE)................................... 14

2.7  Operation status changed (ANR.STATUS_CHANGE) ....................................... 15

2.8  Operation has been reactivated (ANR.REACTIVATE) ....................................... 15

2.9

LOCK/UNLOCK of an OP (ANR.LOCK/UNLOCK)............................................. 16

2.10  Primary target quantity reached (ANR.TARGET_QUANTITY_REACHED) ....... 17

2.11  Comment entered (ANR.REGISTER_REMARK) ............................................... 17

2.12  Non-authorized posting (ANR.UNCERTIFIED_BOOKINGS) ............................. 18

2.13  Quantity posting (ANR.QUANTITY_POSTING) ................................................. 20

2.14  Order header finished (ANR.OPEN_OP_WHEN_LAST_OP_ENDED) .............. 22

BDE-ESK_81.docx

Version: 1.0.18468

Page 3 of 23

  Escalation Messages for Shop Floor Data Collection

1

 Übersicht Eskalationsmeldungen zur BDE

Purpose

HYDRA  escalation  management  provides  a  framework  of  functions  that  can  be  used  to  forward  events

that occur or were recorded in HYDRA to individual users or user groups in real time. During the process,

escalation management takes active steps to ensure users are notified.

After notification, escalation management monitors times until acknowledgment by the recipients and until

escalation is concluded. Escalations can be forwarded to other users or user groups during processing.

Implementation considerations

You  use  escalation  management  when  you  would  like  to  have  active,  real-time  notification  of  specific

events in the BDE production environment in order to be able to respond early to prevent downtimes and

increase efficiency and productivity.

Integration

The  events  /  escalations  already  triggered  in  the  BDE  environment  are  reported  to  central  escalation

management. This creates the framework for forwarding and following up on the events triggered.

To notify people, escalation management accesses both   User administration as well as the HR master

data stored in the system. Notifications can be sent out as e-mails by integrating the local mail server into

the system.

Features

  Provision  of  various  escalation  messages  in  the  order  environment  such  as,  for  example,

operation  was  started,  manual  partial  confirmation,  operation  was  interrupted,  operation  was

finished, operation status was modified, operation was reactivated, (primary) target quantity was

achieved, BDE comments were entered

  Event configuration: Configuration of order-related events

  Forwarding the events detected to the escalation framework.

BDE-ESK_81.docx

Version: 1.0.18468

Page 4 of 23

  Escalation Messages for Shop Floor Data Collection

2  Available Escalations

2.1  Operation started (ANR.START)

The event is triggered when an operation has been logged on.

The escalation is carried out even if the operation is logged on due to a shift change. An escalation is only

carried out in online mode.

Event

IDs

Description

ANR.START

ANR.ANR

ANR.AUNR

ANR.AGNR

ANR.AFOLG

Order + operation

Order

Operation

Sequence

ANR.UAGNR

Sub operation number

ANR.AKT

Article

ANR.AGBEZ

OP designation

ANR.AART

Order type

ANR.SPLNR

Split No.

ANR.MNR

Workplace

ANR.MGRP

Group

ANR.PNR

ANR.KNR

Personnel  number  of  the  reporting
person

reporting

The
number

person's

badge

ANR.AST

OP status

ANR.PKENN

Production characteristic

DAT

ZEI

Date of escalation

Time of escalation

BEARB

Editor

2.2  Manual partial upload (ANR.PARTIAL_CONFIRMATION)

The event is triggered, provided that a manual partial upload has been made for an order. The escalation

is only carried out in online mode.

Event

IDs

Description

BDE-ESK_81.docx

Version: 1.0.18468

Page 5 of 23

  Escalation Messages for Shop Floor Data Collection

Event

IDs

Description

ANR.PARTIAL_CONFI
RMATION

ANR.ANR

ANR.AUNR

ANR.AGNR

ANR.AFOLG

ANR.UAGNR

ANR.AKT

ANR.AGBEZ

ANR.AART

ANR.SPLNR

ANR.MNR

ANR.MGRP

ANR.PNR

ANR.KNR

Order + operation

Order

Operation

Sequence

Sub operation number

Article

OP designation

Order type

Split No.

Workplace

Group

Personnel number of the
reporting person

The reporting person's badge
number

ANR.AST

OP status

ANR.PKENN

Production characteristic

DAT

ZEI

BEARB

BEM

Date of escalation

Time of escalation

Editor

Comment

Quantities from logon dialog:

ANR.EGR:GUT

Yield

ANR.EGR:AUS

Scrap quantity

ANR.EGR:NCH

Rework quantity

ANR.EGR:PRB

Problem quantity

ANR.EGE:GUT

Quantity unit

ANR.EGG:GUT

Reason for yield

ANR.EGG:AUS

Scrap reason

ANR.EGG:NCH

Rework reason

ANR.EGG:PRB

Problem reason

ANR.EGT:GUT

Reason for yield text no.

ANR.EGT:AUS

Scrap reason text no.

ANR.EGT:NCH

Rework reason text no.

ANR.EGT:PRB

Problem reason text no.

Order data:

AUNR.DATSE

Basic end dates of order

AUNR.DATTERME

Scheduled end of order

BDE-ESK_81.docx

Version: 1.0.18468

Page 6 of 23

  Escalation Messages for Shop Floor Data Collection

Event

IDs

Description

AUNR.DISP

MRP controller

AUNR.AUGRP

Order group

Operation data, stock data

ANR.SGR.GUTP

Primary target quantity of OP

ANR.DATE

ANR.DATSE

Planned end of OP

Latest end of OP

ANR.DATTERME

Scheduled end of OP

ANR.VAB

Responsibility area

ANR.BEARBZ

Target duration of OP

ANR.RUEZ

Target setup time of OP

Status information of operation data:

ANR.EGR:GUTP

Yield (primary)

ANR.EGR.AUSP

Scrap quantity (primary)

ANR.EGR.NCHP

Rework quantity (primary)

ANR.EGR.PRBP

Problem quantity (primary)

ANR.EGR:BMK01

Actual duration RPA 1

ANR.EGR:BMK02

Actual duration RPA 2

ANR.EGR:BMK03

Actual duration RPA 3

ANR.EGR:BMK04

Actual duration RPA 4

ANR.EGR:BMK05

Actual duration RPA 5

ANR.EGR:BMK06

Actual duration RPA 6

ANR.EGR:BMK07

Actual duration RPA 7

ANR.EGR:BMK08

Actual duration RPA 8

ANR.EGR:BMK09

Actual duration RPA 9

ANR.EGR:BMK10

Actual duration RPA 10

ANR.EGR:BMK11

Actual duration RPA 11

ANR.EGR:BMK12

Actual duration RPA 12

Workplace master data:

MNR.BEZK

MNR.BEZL

MNR.MGRP

MNR.KST

MNR.FIR

MNR.VAB

Short name

Designation

Group

Cost center

Company

Responsibility area

Personal master data:

PNR.PNR

Person

PNR.PVORNAME

First name

BDE-ESK_81.docx

Version: 1.0.18468

Page 7 of 23

  Escalation Messages for Shop Floor Data Collection

Event

IDs

Description

PNR.PNAME

Last name

Reporting data EBDF

MSGPRIO

MSGCLASS

MSGRCV

Priority
1 = highest
2 = high
3 = normal
4 = low
5 = lowest
MSGPRIO from dialog data

Information class/importance
I = information
W = Warning
E = Error
MSGCLASS from dialog data

Recipient/addressee, e.g.
group of plant managers
MSGRCV from dialog data

2.3  Operation interrupted (ANR.INTERRUPT)

The event is triggered when an operation has been interrupted.

The escalation  is carried out even if the operation is interrupted  due  to  a shift change.  An  escalation is

only carried out in online mode.

Event

IDs

Description

ANR.INTERRUPT

ANR.ANR

Order + operation

ANR.AUNR

ANR.AGNR

ANR.AFOLG

ANR.UAGNR

ANR.AKT

ANR.AGBEZ

ANR.AART

Order

Operation

Sequence

Sub operation number

Article

OP designation

Order type

ANR.SPLNR

Split No.

ANR.MNR

ANR.MGRP

Workplace

Group

BDE-ESK_81.docx

Version: 1.0.18468

Page 8 of 23

  Escalation Messages for Shop Floor Data Collection

Event

IDs

Description

ANR.PNR

ANR.KNR

Personnel number of the
reporting person

The reporting person's badge
number

ANR.AST

OP status

ANR.PKENN

Production characteristic

DAT

ZEI

BEARB

BEM

Date of escalation

Time of escalation

Editor

Comment

Quantities from logon dialog:

ANR.EGR:GUT

Yield

ANR.EGR:AUS

Scrap quantity

ANR.EGR:NCH

Rework quantity

ANR.EGR:PRB

Problem quantity

ANR.EGE:GUT

Quantity unit

ANR.EGG:GUT

Yield reason (deviation reason)

ANR.EGG:AUS

Scrap reason

ANR.EGG:NCH

Rework reason

ANR.EGG:PRB

Problem reason

ANR.EGT:GUT

Reason for yield text no.

ANR.EGT:AUS

Scrap reason text no.

ANR.EGT:NCH

Rework reason text no.

ANR.EGT:PRB

Problem reason text no.

Order data:

AUNR.DATSE

Basic end dates of order

AUNR.DATTERME   Scheduled end of order

AUNR.DISP

MRP controller

AUNR.AUGRP

Order group

Operation data, stock data

ANR.SGR.GUTP

Primary target quantity of OP

ANR.DATE

Planned end of OP

ANR.DATSE

Latest end of OP

ANR.DATTERME

Scheduled end of OP

ANR.VAB

Responsibility area

ANR.BEARBZ

Target duration of OP

ANR.RUEZ

Target setup time of OP

Status information of operation data:

BDE-ESK_81.docx

Version: 1.0.18468

Page 9 of 23

  Escalation Messages for Shop Floor Data Collection

Event

IDs

Description

ANR.EGR:GUTP

Yield (primary)

ANR.EGR.AUSP

Scrap quantity (primary)

ANR.EGR.NCHP

Rework quantity (primary)

ANR.EGR.PRBP

Problem quantity (primary)

ANR.EGR:BMK01

Actual duration RPA 1

ANR.EGR:BMK02

Actual duration RPA 2

ANR.EGR:BMK03

Actual duration RPA 3

ANR.EGR:BMK04

Actual duration RPA 4

ANR.EGR:BMK05

Actual duration RPA 5

ANR.EGR:BMK06

Actual duration RPA 6

ANR.EGR:BMK07

Actual duration RPA 7

ANR.EGR:BMK08

Actual duration RPA 8

ANR.EGR:BMK09

Actual duration RPA 9

ANR.EGR:BMK10

Actual duration RPA 10

ANR.EGR:BMK11

Actual duration RPA 11

ANR.EGR:BMK12

Actual duration RPA 12

Workplace master data:

MNR.BEZK

MNR.BEZL

MNR.MGRP

MNR.KST

MNR.FIR

MNR.VAB

Short name

Designation

Group

Cost center

Company

Responsibility area

Personal master data:

PNR.PNR

Person

PNR.PVORNAME

First name

PNR.PNAME

Last name

Reporting data EBDF

MSGPRIO

Priority
1 = highest
2 = high
3 = normal
4 = low
5 = lowest
MSGPRIO from dialog data

BDE-ESK_81.docx

Version: 1.0.18468

Page 10 of 23

  Escalation Messages for Shop Floor Data Collection

Event

IDs

Description

MSGCLASS

MSGRCV

Information class/importance
I = information
W = Warning
E = Error
MSGCLASS from dialog data

Recipient/addressee, e.g.
group of plant managers
MSGRCV from dialog data

2.4  Operation finished (ANR.END)

The  event  is  triggered  as  soon  as  an  operation  has  been  finished.  The  escalation  is  only  carried  out  in

online mode.

Event

IDs

Description

ANR.INTERRUPT

ANR.ANR

Order + operation

ANR.AUNR

ANR.AGNR

ANR.AFOLG

ANR.UAGNR

ANR.AKT

ANR.AGBEZ

ANR.AART

ANR.SPLNR

ANR.MNR

ANR.MGRP

ANR.AST

ANR.PNR

ANR.KNR

Order

Operation

Sequence

Sub operation number

Article

OP designation

Order type

Split No.

Workplace

Group

OP status

Personnel  number  of
reporting person

the

The  reporting  person's  badge
number

ANR.PKENN

Production characteristic

DAT

ZEI

BEARB

BEM

Date of escalation

Time of escalation

Editor

Comment

Quantities from logon dialog:

BDE-ESK_81.docx

Version: 1.0.18468

Page 11 of 23

  Escalation Messages for Shop Floor Data Collection

Event

IDs

Description

ANR.EGR:GUT

Yield

ANR.EGR:AUS

Scrap quantity

ANR.EGR:NCH

Rework quantity

ANR.EGR:PRB

Problem quantity

ANR.EGE:GUT

Quantity unit

ANR.EGG:GUT

Yield reason (deviation reason)

ANR.EGG:AUS

Scrap reason

ANR.EGG:NCH

Rework reason

ANR.EGG:PRB

Problem reason

ANR.EGT:GUT

Reason for yield text no.

ANR.EGT:AUS

Scrap reason text no.

ANR.EGT:NCH

Rework reason text no.

ANR.EGT:PRB

Problem reason text no.

Order data:

AUNR.DATSE

Basic end date of order

AUNR.DATTERME

Scheduled end of order

AUNR.DISP

MRP controller

AUNR.AUGRP

Order group

Operation data, stock data

ANR.SGR.GUTP

Primary target quantity of OP

ANR.DATE

ANR.DATSE

Planned end of OP

Latest end of OP

ANR.DATTERME

Scheduled end of OP

ANR.VAB

Responsibility area

ANR.BEARBZ

Target duration of OP

ANR.RUEZ

Target setup time of OP

Status information of operation data:

ANR.EGR:GUTP

Yield (primary)

ANR.EGR.AUSP

Scrap quantity (primary)

ANR.EGR.NCHP

Rework quantity (primary)

ANR.EGR.PRBP

Problem quantity (primary)

ANR.EGR:BMK01

Actual duration RPA 1

ANR.EGR:BMK02

Actual duration RPA 2

ANR.EGR:BMK03

Actual duration RPA 3

ANR.EGR:BMK04

Actual duration RPA 4

ANR.EGR:BMK05

Actual duration RPA 5

ANR.EGR:BMK06

Actual duration RPA 6

BDE-ESK_81.docx

Version: 1.0.18468

Page 12 of 23

  Escalation Messages for Shop Floor Data Collection

Event

IDs

Description

ANR.EGR:BMK07

Actual duration RPA 7

ANR.EGR:BMK08

Actual duration RPA 8

ANR.EGR:BMK09

Actual duration RPA 9

ANR.EGR:BMK10

Actual duration RPA 10

ANR.EGR:BMK11

Actual duration RPA 11

ANR.EGR:BMK12

Actual duration RPA 12

Workplace master data:

MNR.BEZK

MNR.BEZL

MNR.MGRP

MNR.KST

MNR.FIR

MNR.VAB

Short name

Designation

Group

Cost center

Company

Responsibility area

Personal master data:

PNR.PNR

Person

PNR.PVORNAME

First name

PNR.PNAME

Last name

Reporting data EBDF:

MSGPRIO

MSGCLASS

MSGRCV

Priority
1 = highest
2 = high
3 = normal
4 = low
5 = lowest
MSGPRIO from dialog data

Information class/importance
I = information
W = Warning
E = Error
MSGCLASS from dialog data

Recipient/addressee,
group of plant managers
MSGRCV from dialog data

e.g.

2.5  Operation planned (ANR.MANUAL_SCHEDULED)

The  event  is  triggered  when  an  operation  is  moved  from  the  pool  of  groups  to  the  pool  of

machines/workplaces in the "order sequencing" application (AVG).

BDE-ESK_81.docx

Version: 1.0.18468

Page 13 of 23

  Escalation Messages for Shop Floor Data Collection

Event

IDs

Description

ANR.MANUAL_SCHEDULED  ANR.ANR

Order + operation

ANR.AUNR

ANR.AGNR

ANR.AFOLG

Order

Operation

Sequence

ANR.UAGNR

Sub-operation No.

ANR.AKT

Article

ANR.AGBEZ

OP designation

ANR.AART

Order type

ANR.SPLNR

Split No.

ANR.MNR

ANR.MGRP

Workplace

Group

DAT

ZEI

BEARB

Date of escalation

Time of escalation

Editor

2.6  Operation deallocated (ANR. MANUAL_DEALLOCATE)

The event is triggered when an operation is moved from the pool of machines/workplaces to the pool of

groups in the "order sequencing" application (AVG). The “planned” field is set to the entry “G”.

Event

IDs

Description

ANR.MANUAL_DEALLOCATE  ANR.ANR

Order + operation

ANR.AUNR

Order

ANR.AGNR

Operation

ANR.AFOLG

Sequence

ANR.UAGNR

Sub-operation No.

ANR.AKT

Article

ANR.AGBEZ

OP designation

ANR.AART

Order type

ANR.SPLNR

Split No.

ANR.MNR

Workplace

ANR.MGRP

Group

DAT

ZEI

Date of escalation

Time
ANR.PKENN

of

escalation

BDE-ESK_81.docx

Version: 1.0.18468

Page 14 of 23

  Escalation Messages for Shop Floor Data Collection

Event

IDs

Description

BEARB

Editor

2.7  Operation status changed (ANR.STATUS_CHANGE)

The event is triggered, provided that the status of the operation has been changed.

Event

IDs

Description

ANR.STATUS_CHANGE

ANR.ANR

Order + operation

ANR.AUNR

ANR.AGNR

ANR.AFOLG

Order

Operation

Sequence

ANR.UAGNR

Sub-operation No.

ANR.AKT

Article

ANR.AGBEZ

OP designation

ANR.AART

Order type

ANR.SPLNR

Split No.

ANR.MNR

Workplace

ANR.MGRP

Group

ANR.AST

OP status

ANR.PKENN

Production characteristic

DAT

ZEI

Date of escalation

Time of escalation

BEARB

Editor

2.8  Operation has been reactivated (ANR.REACTIVATE)

The event is triggered, provided that an operation has been reactivated.

Event

IDs

Description

ANR.REACTIVATE

ANR.ANR

ANR.AUNR

ANR.AGNR

ANR.AFOLG

Order + operation

Order

Operation

Sequence

BDE-ESK_81.docx

Version: 1.0.18468

Page 15 of 23

  Escalation Messages for Shop Floor Data Collection

Event

IDs

Description

ANR.UAGNR

Sub-operation No.

ANR.AKT

Article

ANR.AGBEZ

OP designation

ANR.AART

Order type

ANR.SPLNR

Split No.

ANR.MNR

Workplace

ANR.MGRP

Group

ANR.AST

OP status

ANR.PKENN

Production characteristic

DAT

ZEI

BEARB

Date of escalation

Time of escalation

Editor

2.9  LOCK/UNLOCK of an OP (ANR.LOCK/UNLOCK)

A “lock” is executed when data is being edited to ensure that several users do not modify the data record

simultaneously. The “lock” is removed (“unlocked”) once the modification has been completed.

Event

IDs

Description

ANR.LOCK
ANR.UNLOCK

ANR.ANR

ANR.AUNR

ANR.AGNR

ANR.AFOLG

Order + operation

Order

Operation

Sequence

ANR.UAGNR

Sub-operation No.

ANR.AKT

Article

ANR.AGBEZ

OP designation

ANR.AART

Order type

ANR.SPLNR

Split No.

ANR.MNR

ANR.MGRP

ANR.AST

Workplace

Group

OP status

ANR.PKENN

Production characteristic

DAT

ZEI

BEARB

Date of escalation

Time of escalation

Editor

BDE-ESK_81.docx

Version: 1.0.18468

Page 16 of 23

  Escalation Messages for Shop Floor Data Collection

2.10  Primary target quantity reached

(ANR.TARGET_QUANTITY_REACHED)

This escalation is triggered if an operation is automatically interrupted/logged off as its target quantity has

been reached.

Please note:

A configuration of the processing code specifies whether or not an operation is automatically

interrupted/finished, when the target quantity is reached. This escalation is never triggered, in case this

configuration is not active!

Event

IDs

Description

ANR.TARGET_QUANTITY_
REACHED

ANR.ANR

ANR.AUNR

ANR.AGNR

ANR.AFOLG

Order + operation

Order

Operation

Sequence

ANR.UAGNR

Sub operation no.

ANR.AKT

Article

ANR.AGBEZ

OP designation

ANR.AART

Order type

ANR.SPLNR

Split No.

ANR.MNR

ANR.MGRP

ANR.AST

Workplace

Group

OP status

ANR.SGR:GUTP

Target quantity

ANR:EGR:GUTP

Actual quantity

DAT

ZEI

Date of escalation

Time of escalation

2.11  Comment entered (ANR.REGISTER_REMARK)

The  comments  recorded  by  the  "BDE  comment"  function  at  the  Windows  terminal  may  trigger  an

escalation.

Event

IDs

Description

BDE-ESK_81.docx

Version: 1.0.18468

Page 17 of 23

  Escalation Messages for Shop Floor Data Collection

Event

IDs

Description

ANR.REGISTER_REMARK

ANR.ANR

Order + operation

ANR.AUNR

ANR.AGNR

ANR.AFOLG

Order

Operation

Sequence

ANR.UAGNR

Sub operation no.

ANR.SPLNR

ANR.MNR

ANR.PNR

ANR.KNR

BEM

ANR.DAT

ANR.ZEI

ANR.ATK

Split No.

Workplace

Person

Badge number

Comment

Date of escalation

Time of escalation

Articles of the operation

Personal master data

PNR.PVORNAME   The person's first name

PNR:PNAME

The person's surname

PNR.FIR

PNR.KST

PNR.BER

PNR.ABT

Company

Cost center

Area

Department

PNR.KREIS

Employee subgroup

PNR.TAETIGKEIT  Task

PNR.VAB

Responsibility area

Workplace master data

MNR.FIR

MNR.KST

Company

Cost center

MNR.MGRP

Group

MNR.BEZK

MNR.BEZL

MNR.VAB

Workplace designation

Comment

Responsibility area

2.12  Non-authorized posting (ANR.UNCERTIFIED_BOOKINGS)

The event is triggered as soon as a posting record, which needs to be signed, has been generated. In this

case, order postings and personnel postings (U/E or B record) are considered only.

BDE-ESK_81.docx

Version: 1.0.18468

Page 18 of 23

  Escalation Messages for Shop Floor Data Collection

An  order  posting  is  considered  being  subject  to  confirmation/upload  if  the  "order  postings  need  to  be

signed" flag is configured at the corresponding order type within the "options" tab.

A personal posting is considered being subject to uploads/confirmation if the "personnel postings need to

be signed" flag is configured at the corresponding order type within the "options" tab.

Event

IDs

Description

ANR.UNCERTIFIED_
BOOKINGS

ANR.ANR

ANR.AUNR

ANR.AGNR

ANR.AFOLG

ANR.UAGNR

ANR.ATK

Order + operation

Order

Operation

Sequence

Sub-operation No.

Article

ANR.ATKBEZ

Article designation

ANR.AGBEZ

ANR.AART

ANR.SPLNR

ANR.MNR

ANR.MGRP

ADEPRO.SART

OP designation

Order type

Split No.

Workplace

Group

Record  type  of  the  log  record  (B,  U,
E)

DAT

ZEI

Date of escalation

Time of escalation

AUNR.DISP

MRP controller

AUNR.AUGRP

Order group

AGNR.DATE

AGNR.ZEIE

Logoff date

Logoff time

Personal master data:

PNR.PNR

Person

PNR.PVORNAME

First name

PNR.PNAME

PNR.FIR

PNR.KST

PNR.BER

PNR.ABT

Last name

Company

Cost center

Area

Department

PNR.KREIS

Employee subgroup

PNR.TAETIGKEIT

Task

PNR.VAB

Responsibility area

BDE-ESK_81.docx

Version: 1.0.18468

Page 19 of 23

  Escalation Messages for Shop Floor Data Collection

2.13  Quantity posting (ANR.QUANTITY_POSTING)

The  ANR.QUANTITY_POSTING  escalation  is  triggered  as  soon  as  a  quantity  has  been  posted  or

booked. It is triggered by

- automatic quantity postings,

- manual quantity postings,

- partial uploads,

- operation logoffs,

- interruptions

At this point, however, the reference only relates to orders

Event

IDs

Description

ANR.QUANTITY_PO
STING

ANR.ANR

ANR.AUNR

ANR.AGNR

ANR.AFOLG

ANR.UAGNR

ANR.ATK

Order + operation

Order

Operation

Sequence

Sub operation no.

Article

ANR.ATKBEZ

Article designation

ANR.AGBEZ

ANR.AART

ANR.SPLNR

ANR.AST

OP designation

Order type

Split No.

OP status

ANR.PKENN

Control/production characteristic

ANR.SGR:GUTP

Target quantity, primary quantity unit

ANR.SGR:AUSP

Target scrap, primary quantity unit

ANR.SGE:P

Primary quantity unit

EGR:GUT

EGR:AUS

EGR:NCH

EGR:PRB

EGG:GUT

EGG:AUS

EGG:NCH

EGG:PRB

Yield to be posted, primary quantity unit

Scrap to be posted, primary quantity unit

Rework to be posted, primary quantity unit

Problem quantity to be posted, primary
quantity unit

Yield reason

Scrap reason

Rework reason

Problem reason

BDE-ESK_81.docx

Version: 1.0.18468

Page 20 of 23

  Escalation Messages for Shop Floor Data Collection

Event

IDs

Description

ANR.EGR:GUT

ANR.EGR:AUS

ANR.EGR:NCH

ANR.EGR:PRB

MNR

MNR.MGRP

MNR.KST

MNR.FIR

MNR.VAB

MNR.FU:7

MNR.FU:8

MNR.FU:9

MNR.FU:10

MNR.FU:11

MNR.FU:12

MNR.FU:13

MNR.FU:14

MNR.FU:15

MNR.FU:16

MNR.FU:17

MNR.FU:18

MNR.FU:19

MNR.FU:20

MNR.FU:21

MNR.FU:22

Current (previous) yield primary quantity unit
*)

Current (previous) scrap primary quantity unit
*)

Current (previous) rework primary quantity
unit *)

Current (previous) problem quantity primary
quantity unit *)

Workplace where data collection takes place

Workplace group according to the
configuration

Cost center of the workplace according to
configuration

Company of the workplace according to
configuration

Responsibility area of the workplace
according to configuration

Machine user field 7

Machine user field 8

Machine user field 9

Machine user field 10

Machine user field 11

Machine user field 12

Machine user field 13

Machine user field 14

Machine user field 15

Machine user field 16

Machine user field 17

Machine user field 18

Machine user field 19

Machine user field 20

Machine user field 21

Machine user field 22

BDE-ESK_81.docx

Version: 1.0.18468

Page 21 of 23

  Escalation Messages for Shop Floor Data Collection

2.14  Order header finished

(ANR.OPEN_OP_WHEN_LAST_OP_ENDED)

This  escalation  has  been  configured  to  monitor  finished  orders  the  operations  of  which  are  not  all

finished. This escalation is triggered if the last operation of an order is finished but the order cannot be set

to the "finished" status as there are still open OPs. The number of operations, which have not yet been

finished, is indicated in the escalation message.

Event

IDs

Description

ANR.OPEN_OP_WHEN
_LAST_OP_ENDED

AUNR.AUNR

AUNR.AKT

Order

Article

AUNR.ATKBEZ

Article designation

AUNR.AART

AUNR.AST

Order type

Order status

AUNR.SGR:GUTB

Target quantity (basis)

AUNR.SGE:B

Target quantity unit (basis)

AUNR.SGR:AUSB

Target scrap (basis)

AUNR.EGE:B

Actual quantity unit (basis)

AUNR:EGR:GUTB

Actual yield (basis)

AUNR.EGR:AUSB

Actual scrap (basis)

AUNR:EGR:NCHB

Actual rework quantity (basis)

AUNR.EGR:PRBB

Actual problem quantity (basis)

AUNR.DISP

MRP controller

AUNR.AUGRP

Order group

AUNR.DATSE

Basic end dates of order

AUNR.ZEISE

Basic end dates of order

AUNR.DATTERME

Scheduled end of order

AUNR.ZEITERME

Scheduled end of order

AUNR.OPENOP

Number  of  OPs  that  have  not
yet  been
the
order  is  finished,  i.e.  assigned
to prod_kenn <> {Y,D,E}

finished  when

Please note for actual quantities:

Collected actual quantities are entered in the base quantity unit of the last OP to which quantities/times,

etc. have been posted. Prerequisite: conversion factors have to be defined.

BDE-ESK_81.docx

Version: 1.0.18468

Page 22 of 23

  Escalation Messages for Shop Floor Data Collection

BDE-ESK_81.docx

Version: 1.0.18468

Page 23 of 23

