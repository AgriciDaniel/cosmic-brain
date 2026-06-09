Manual

REK Escalation Messages
REK-ESK 8.1

Version 1.0.1374

Last changed on: 19.06.2020

REK Escalation Messages

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

REK-ESK_81.docx

Version: 1.0.18468

Page 2 of 5

REK Escalation Messages

Contents

1  ESK Escalation Messages - Overview ......................................................... 4

2  Available Escalations ................................................................................... 5

2.1  Measure generated (CMASSN.INSERTED) ........................................................ 5

REK-ESK_81.docx

Version: 1.0.18468

Page 3 of 5

REK Escalation Messages

1

 ESK Escalation Messages - Overview

Fields of application

HYDRA escalation management provides a framework of functions for real-time forwarding of recorded or

live  events to individual users or user groups. During the  process, escalation management takes active

steps to ensure users are notified.

After notification, escalation management monitors times until acknowledgment by the recipients and until

escalation is concluded. Escalations can be forwarded to other users or user groups during processing.

Implementation notes

You use escalation management if you would like to have active, real-time notification of specific events

in  the  inspection  environment  so  that  you  can  react  early  enough  to  prevent  downtimes  and  so  that

efficiency and productivity can be increased.

Integration

The  events/  escalations  already  triggered  are  posted  to  central  escalation  management.  This forms  the

framework used to forward the events triggered and to be able to follow up on them.

To  notify  people,  escalation  management  accesses  both  User  administration  as  well  as  the  HR  master

data stored in the system. Notifications can be sent out as e-mails by integrating the local mail server into

the system.

Features

  Provision of different escalation messages in the environment of inspection data collection

  Event configuration: configuration of order-related events

  Forwarding of the detected events to the HYDRA escalation management framework

REK-ESK_81.docx

Version: 1.0.18468

Page 4 of 5

REK Escalation Messages

2  Available Escalations

2.1  Measure generated (CMASSN.INSERTED)

Once a measure has been generated, the escalation is triggered.

Event

Identifiers

Description

CMASSN.INSERTED

CMASSN.MASSER

Identifier for the measure

CMASSN.RECTYP

Data type

CMASSN.RECREF

Assignment

CMASSN.BER

CMASSN.KEY:1

CMASSN.KEY:2

CMASSN.KEY:3

CMASSN.KEY:4

CMASSN.KEY:5

Area

Key field 1

Key field 2

Key field 3

Key field 4

Key field 5

CMASSN.MASNR

Measures number

CMASSN.MASTEXT

Measures text

CMASSN.VERANT:TYP

Responsible - type

CMASSN.VERANT:NR

Responsible - number

CMASSN.STA

Status

CMASSN.ZIELDAT

Target date - date

CMASSN.ZIELZEI

Target time - time

CMASSN.BEM

Comment

PNR

Person  responsible  (only
the
person  responsible  is  from  the  HR
master data)

if

REK-ESK_81.docx

Version: 1.0.18468

Page 5 of 5

