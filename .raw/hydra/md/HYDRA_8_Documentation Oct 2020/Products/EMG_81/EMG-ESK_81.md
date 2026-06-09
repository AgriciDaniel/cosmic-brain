Manual

Overview of EMG Escalation
Messages
EMG-ESK 8.1

Version 1.0.23049

Last changed on: 01.09.2020

Overview of EMG Escalation Messages

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

EMG-ESK_81.docx

Version: 1.0.23049

Page 2 of 7

Overview of EMG Escalation Messages

Contents

1  Overview Escalation Messages to EMG ...................................................... 4

2  Available Escalations ................................................................................... 5

2.1  Events from the performance profile .................................................................... 5

2.2  Reading interval exceeded (RESWART.LIMIT_EXCEEDED) .............................. 6

2.3  Absolute value limit exceeded (EMG.ABSOLUTE_VALUE_EXCEEDED) ........... 6

2.4  Please note with regard to configuration .............................................................. 6

2.4.1  Activating escalation messages for activity recording .............................. 6

EMG-ESK_81.docx

Version: 1.0.23049

Page 3 of 7

Overview of EMG Escalation Messages

1  Overview Escalation Messages to EMG

Purpose

HYDRA escalation management provides a framework of functions for real-time forwarding of recorded or

live  events to individual users or user groups. During the  process, escalation management takes active

steps to ensure users are notified.

After notification, escalation management monitors times until acknowledgment by the recipients and until

escalation is concluded. Escalations can be forwarded to other users or user groups during processing.

Implementation considerations

You use escalation management if you would like to have active, real-time notification of specific events

in the BDE production environment so that you can react early enough to prevent downtimes and so that

efficiency and productivity can be increased.

Integration

The  events/  escalations  already  triggered  in  the  EMG  field  are  forwarded  to  central  escalation

management. This forms the framework used to forward the events triggered and to be able to follow up

on them.

To  notify  people,  escalation management  accesses  both  User  Administration  as  well  as  the  HR  Master

Data stored in the system. Notifications can be sent out as e-mails by integrating the local mail server into

the system.

Features

Application  service  (AS)  to  generate  escalation  messages,  which,  depending  on  the  configuration,  are

forwarded to a defined group of users (e.g. the energy officer, the production manager, machine operator,

maintenance technician) by e-mail, text message, etc.:

  Configuration of events that should trigger an escalation:

  Forwarding of the detected events to the HYDRA escalation management framework.

  Typical escalation examples:

o  Absolute value limit of a resource has been exceeded

o  Planned read-out point is exceeded

o  Tolerance limit has been exceeded

EMG-ESK_81.docx

Version: 1.0.23049

Seite 4 von 7

Overview of EMG Escalation Messages

2  Available Escalations

2.1  Events from the performance profile

event_id

event_name

PPMM.ACTION_LIMIT_EXCEEDED

Action limits* exceeded

EMG 8.1

PPMM.TOLERANCE_LIMIT_EXCEEDED  Tolerance limit exceeded  EMG 8.1

* Understood as an "action limit" is the process action limit within the meaning of PDV

Event

Description

Identifiers  Description  Please note:

An  escalation  is  triggered  by
the terminal if a violation of the
process action limit is detected.

An  escalation  is  triggered  by
the terminal if a violation of the
tolerance limit is detected.

PPMM.ACTION_LIMIT_EXCEEDED

Process action limit
exceeded

MNR.MNR

Machine number

PPMM.MMNR  Characteristic

MM.BEZK

MM.BEZL

number

Characteristic
designation

Characteristic
designation

MM.EINH

Unit

PPMM.MW

Measured value

PPMM.SW

Target value

PPMM.OTG

PPMM.UTG

PPMM.OPEG

PPMM.UPEG

Upper
limit

Lower
limit

tolerance

tolerance

Upper
action limit

process

Lower
action limit

process

PPMM.TOLERANCE_LIMIT_EXCEEDED  Tolerance
exceeded

limit

MNR.MNR

Machine number

PPMM.MMNR  Characteristic

MM.BEZK

MM.BEZL

number

Characteristic
designation

Characteristic
designation

MM.EINH

Unit

PPMM.MW

Measured value

PPMM.SW

Target value

PPMM.OTG

PPMM.UTG

PPMM.OPEG

PPMM.UPEG

Upper
limit

Lower
limit

tolerance

tolerance

Upper
action limit

process

Lower
action limit

process

EMG-ESK_81.docx

Version: 1.0.23049

Seite 5 von 7

Overview of EMG Escalation Messages

2.2  Reading interval exceeded

(RESWART.LIMIT_EXCEEDED)

The cyclically active maintenance monitoring program triggers an escalation as soon as a maintenance

limit for a reading has been exceeded.

Event

Identifiers

Description

RESWART.LIMIT_EXCEEDED

RESWART.RESTYP

Resources types

RESWART.RES

RESWART.BEZ

Resources no.

Maintenance

RESWART.WARTKL

Class

RESWART.WART:N

Value next maintenance

RESWART.WART:I

Actual value

RESWART.WARTNR

Threshold reached 1, 2, 3

RESWART.ART

Maintenance type

2.3  Absolute value limit exceeded

(EMG.ABSOLUTE_VALUE_EXCEEDED)

The  cyclically  active  monitoring  program  triggers  an  escalation  as  soon  as  an  absolute  value  limit  for  a

counter resource has been exceeded.

Event

Identifiers

Description

EMG.ABSOLUTE_VALUE_EXCEED
ED

RES.ABSWGRENZE

Absolute value limit

RES.EGR:GUT

Current counter value

RES.RES

RES.RSTDAT

RES.RESRSTZEI

RES.TYP

Resource

Reset date

Reset time

Resource type

2.4  Please note with regard to configuration

2.4.1  Activating escalation messages for activity recording

Escalation messages are activated at the terminal or the PCC.

With regard to the details, please refer to the document on PDV escalations.

EMG-ESK_81.docx

Version: 1.0.23049

Seite 6 von 7

Overview of EMG Escalation Messages

EMG-ESK_81.docx

Version: 1.0.23049

Seite 7 von 7

