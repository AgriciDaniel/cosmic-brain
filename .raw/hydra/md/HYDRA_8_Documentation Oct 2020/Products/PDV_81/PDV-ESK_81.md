Manual

Escalation Messages for PDV
PDV-ESK 8.1

Version 1.0.23049

Last changed on: 02.09.2020

Escalation Messages for PDV

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

PDV-ESK_81.docx

Version: 1.0.23049

Page 2 of 8

Escalation Messages for PDV

Contents

1  Overview of PDV Escalation Messages ....................................................... 4

2  Available Escalations ................................................................................... 5

2.1  Overview of available events ............................................................................... 5

3  Configuration PDV-ESK ............................................................................... 7

3.1  Activate escalation messages ............................................................................. 7

3.2  Define limits and activate automatic generation of errors..................................... 7

3.3  Further conditions ............................................................................................... 8

3.4  Debug options ..................................................................................................... 8

PDV-ESK_81.docx

Version: 1.0.23049

Page 3 of 8

Escalation Messages for PDV

1  Overview of PDV Escalation Messages

Purpose

HYDRA escalation management provides a framework of functions that allow recorded or live events to

be forwarded to individual users or user groups in real time. During the process, escalation management

takes active steps to ensure users are notified.

After  notification,  escalation  management monitors  times  until  acknowledged  by  the  recipients  and  until

the  escalation  is  concluded.  Escalations  can  be  forwarded  to  other  users  or  user  groups  during

processing.

Implementation considerations

You use escalation management if you would like to have active, real-time notification of specific events

in the BDE production environment so that you can react early enough to prevent downtimes and so that

efficiency and productivity can be increased.

Integration

The  events/  escalations  already  triggered  in  the  PDV  environment  are  posted  to  central  escalation

management. This forms the framework used to forward the events triggered and to be able to follow up

on them.

To notify people, escalation management accesses both   User administration as well as the HR master

data stored in the system. Notifications can be sent out as e-mails by integrating the local mail server into

the system.

Features

  Provision  of  various  escalation  messages  in  the  area  of  process  data  collection  such  as  action

limits exceeded or tolerance limits exceeded.

  Event configuration: Configuration of order-related events

  The detected event is forwarded to the escalation framework.

PDV-ESK_81.docx

Version: 1.0.23049

Seite 4 von 8

Escalation Messages for PDV

2  Available Escalations

2.1  Overview of available events

event_id

event_name

PPMM.ACTION_LIMIT_EXCEEDED

Action limit* exceeded

PDV71 PDV72 PDV81

PPMM.TOLERANCE_LIMIT_EXCEEDED  Tolerance limit exceeded  PDV71 PDV72 PDV81

* In PDV, the "action limit" is the process action limit

Event

Description  Acronyms  Description

Notes

terminal

The
triggers  an
escalation  if  a  violation  of
the  process  action  limit  is
identified.

terminal

triggers  an
The
escalation  if  a  violation  of
the
is
identified.

tolerance

limit

PPMM.ACTION_LIMIT_EXCEEDED

Process
limit exceeded

action

MNR.MNR

Machine number

PPMM.MMNR  Characteristic number

MM.BEZK

MM.BEZL

Characteristic
designation/name

Characteristic
designation/name

MM.EINH

Unit

PPMM.MW

Measured value

PPMM.SW

Target value

PPMM.OTG

Upper tolerance limit

PPMM.UTG

Lower tolerance limit

PPMM.OPEG

PPMM.UPEG

Upper  process  action
limit

Lower  process  action
limit

PPMM.TOLERANCE_LIMIT_EXCEEDED  Tolerance
exceeded

limit

MNR.MNR

Machine number

PPMM.MMNR  Characteristic number

MM.BEZK

MM.BEZL

Characteristic
designation/name

Characteristic
designation/name

MM.EINH

Unit

PPMM.MW

Measured value

PPMM.SW

Target value

PPMM.OTG

Upper tolerance limit

PPMM.UTG

Lower tolerance limit

PPMM.OPEG

PPMM.UPEG

Upper  process  action
limit

Lower  process  action
limit

PPMM.ALARM_CHANNEL_SET

Alert  channel  is
set

MNR.MNR

Machine number

PPMM.MMNR

Characteristic number

MM.BEZ

Characteristic
designation/name

MM.EINH

Unit

Characteristic number, name,

unit and measured value only

if the alert is triggered by a

PPMM.MW

Measured value

violation of the limit value.

EV.EVENT

Event

PDV-ESK_81.docx

Version: 1.0.23049

Seite 5 von 8

Escalation Messages for PDV

Event

Description  Acronyms  Description

Notes

EV.CAPTION

Event name

Event and event name only

with triggering event.

PDV-ESK_81.docx

Version: 1.0.23049

Seite 6 von 8

Escalation Messages for PDV

3  Configuration PDV-ESK

3.1  Activate escalation messages

Escalation messages are activated in the terminal. The configuration file pdv_dll is stored in the directory

"ctwin" or "ctaip"... In this file, you can modify the CallESK parameter. By default, the function is disabled

and set to "N". The function is enabled if the parameter is set to the value "Y".

Excerpt from the file pdv_dll.ini:

[Common]

; # @Eskappendix:      file ending of captured escalations

Eskappendix=pesk

[Blade]

; # @CallESK:

flag whether escalation messages should be sent when limits are exceeded

; #

supported values are Y (Yes, send messages) and N (do not send messages)

; # @ESKWaitTime:

time  interval  that  has  to  pass  before  escalation  messages  are  sent

successively

CallESK=Y

ESKWaitTime=600

3.2  Define limits and activate automatic generation of errors

MOC: Quality management - Process data collection - Collection rules. Go to: Recorded characteristics,

tab Specifications

Here,  you  can  define  the  limits  mentioned  below.  These  limits  specify  when  an  automatic  error  and  a

resulting  escalation  are  generated.  The  limit  value  must  be  a  valid  decimal  value  and  the  option  that

enables the automatic generation of errors must be checked.

You may include the following limits in an escalation:

LTL

lower tolerance limit

LPAL

lower process action limit

UPAL

upper process action limit

UTL

upper tolerance limit

PDV-ESK_81.docx

Version: 1.0.23049

Seite 7 von 8

Escalation Messages for PDV

3.3  Further conditions

MOC: Quality management - Process data collection - Collection rules. Go to: Recorded characteristics,

tab Inspection - Computation

Enable the option "Check characteristic".

In addition, the process parameter you want to evaluate must be of data type INTEGER or DECIMAL.

3.4  Debug options

You  can  easily  trace  back the  correct  configuration  using  the  file  pdvinitpp.2<terminal  no>.  The  section

including the process parameters is most important. The following must apply for the process parameters:

CHECKLIMITS

Y

(merkmal_pruef / [v] check characteristic)

DATATYPE

DECIMAL or INTEGER

ESKUPIL

Y

generate error for UPAL )

(opeg_aktiv  /  in  specification  dialog  :  [v]  auto.

ESKUTL

Y

(otg_aktiv  /  in  specification  dialog  :  [v]  auto.

generate error for UTL )

ESKLTL

Y

(utg_aktiv  /  in  specification  dialog  :  [v]  auto.

generate error for LTL )

ESKLPIL

Y

(upeg_aktiv  /  in  specification  dialog:  [v]  generate

auto error for LPAL)

UPIL

UTL

LTL

LPIL

integer

integer

integer

integer

(UPAL (must not be empty or (null) if ESKUPIL= Y))

(UTL

(must not be empty or (null) if ESKUTL=Y))

(LTL

(must not be empty or (null) if ESKLTL=Y))

(LPAL  (must not be empty or (null) if ESKLPIL=Y))

PDV-ESK_81.docx

Version: 1.0.23049

Seite 8 von 8

