Manual

Escalation Messages MLE
Interface / File Port
SAP-ESK 3.0

Version 1.2.19800

Last changed on: 06.08.2020

Escalation Messages MLE Interface / File Port

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

SAP-ESK_30.docx

Version: 1.2.22714

Page 2 of 13

Escalation Messages MLE Interface / File Port

Contents

1  1 Escalation Notifications MLE Interface/ Fileport ....................................... 4

2  MLE.INBOUND_BAPI_ERROR ................................................................... 5

3  MLE.OUTBOUND_CONF_ERROR ............................................................. 7

4  SAP.OUTBOUND_FM_POST_ERROR ...................................................... 9

5  Further MLE Escalations ............................................................................ 12

SAP-ESK_30.docx

Version: 1.2.22714

Page 3 of 13

1  1

Escalation Notifications MLE Interface/ Fileport

Escalation Messages MLE Interface / File Port

Summary

Use options

The  Escalation  management  provides  a  functions  framework  in  order  to  transfer  events  occurring  or

collected in HYDRA to individual users or user groups in good time. In doing so, escalation management

performs active notification steps.

Once  the  notification  has  been  made,  escalation  management  will  monitor  the  times  until  the  receiver

gets  to  know  the  notification  and  until  the  completion  of  the  escalation.  Escalations  may  also  be

transferred to other users or user groups during processing.

Implementation notes

Use the escalation notifications function package MLE interface/ file port if you:

  use the escalation management function package (basis/ framework) and



if you wish to be notified on irregularities/ error situations of the MLE interface and/or the file port.

Integration

The  events  triggered  by  the  MLE  interface  will  be  transferred  to  the  escalation  management.  Based  on

the configuration, the system will decide whether the event will be transformed into an escalation and who

will receive the escalation.

The escalation will also be processed in the escalation management.

Scope of functions

  Configuration of events

o  Configuration of events of the MLE interface/ file port

  Event transfer function

o  Transfer of detected events to the framework

SAP-ESK_30.docx

Version:1.2.22714  Page 4 of 13

Escalation Messages MLE Interface / File Port

2  MLE.INBOUND_BAPI_ERROR

Description

As  of  program  version  mle72imp.exe  V8.1.1.71  and  ONLY  in  combination  with  the  database

patch

dbp_esk_mle_inbound_bapi_error.hsc

V8.1.1.1.87250,

the

event

MLE.INBOUND_BAPI_ERROR provides the data described in the following.

If an error occurs in the BAPI based MLE inbound processing, the event MLE.INBOUND_BAPI_ERROR

is  always  provided.  You  can  identify  the  BAPI  based  MLE  inbound  processing  in  the  MLE  distribution

model via the command "mle72imp.scr" of the MLE inbound processing message type.

The event provides the following data:

  TAID (key 1)

Transaction number in the MLE inbound transactions the error refers to.

  VERWEIS (key 2)

Reference  of  the  data  record  in  the  data  segments  of  the  MLE  inbound  processing  the  error

refers to.

  MLE.DLG (key 3)

BAPI dialog (dialog command, e.g. "ANR.MODIFY") that could not be posted.

  MESTYP

Message type in the MLE inbound for which data should be imported.

  SEGNAM

Segment  name  of  the  data  record  in  the  MLE  inbound  transactions  for  which  the  posting  could

not be performed.

  RET

Return code (does not equal 0) that has been returned by the BAPI. The meaning of the return

codes is described in the document of error codes.

  KT

Short text of the error code

  LT

Long text of the error code

SAP-ESK_30.docx

Version:1.2.22714  Page 5 of 13

Escalation Messages MLE Interface / File Port

SAP-ESK_30.docx

Version:1.2.22714  Page 6 of 13

Escalation Messages MLE Interface / File Port

3  MLE.OUTBOUND_CONF_ERROR

Description

The MLE.OUTBOUND_CONF_ERROR event is provided as cyclical event. This means that a monitoring

cycle  can  be  defined  in  the  configuration  of  the  escalation  management.  As  soon  as  there  will  be  a

throughput, the related event will be made available. The configuration of the escalation management can

then be used to store, from which duration on an escalation shall be triggered.

In doing so, the system will determine the duration since the last provision and/or transfer of confirmation

data referred to a posting/ segment type of the MLE output. In doing so, it is first controlled whether new

segments  are  available  for  this  posting  type  in  the  outbound  transactions.  If  yes,  the  system  will

determine the duration between their provision to the MLE outbound transactions and the current point in

time. An additional flag will be used to show that data records are available that are ready to be collected.

If no new data records are found in the MLE outbound transactions, the system will check when the last

transfer  was  effected  for  the  corresponding  posting/  segment  type  and  will  determine  the  duration

between  this  and  the  current  point  in  time.  To  this  end  both,  online  tables  and  archive  tables  are

supported. An additional flag will be used to show that no data records are available in this case.

If neither new data records nor such data records are found that were already transferred, this will also be

marked by an additional flag. In this case a zero will be transferred for the duration.

The event will provide the following data:

  MESTYP (key 1)

The outbound posting type that was checked

  PROVFLAG (key 2)

Flag indicating the availability:

"N"

"D"

There are new data records in the MLE outbound transactions

There  are  no  new  data  records  and  the  duration  was  calculated  based  on  the  last

transfer.

"Z"

There are neither new nor already transferred data records.

  SEGNAM

The SEGNAM identification includes the segment name, for which the upload was made.



IDOCTYP

The IDoc type of these data records.

SAP-ESK_30.docx

Version:1.2.22714  Page 7 of 13

Escalation Messages MLE Interface / File Port

  LOGSYS

Logical  system  from  the  HYDRA  MLE  configuration,  for  which  this  data  record  is  to  be

transferred.

  DSSTA

Status of the last found data record:

"000"  New data record (NEW)

"001"  Repeated transfer (TODO)

"079"  Transfer error (DONE ERROR)

"099"  Transfer successful (DONE)

If the "Z"  value  is transferred in the  acronym PROVFLAG it  was not  possible to determine data

records and the acronym will be transferred without value.

  DUR

Duration - calculated duration since the last provision of new data records and/or the last transfer

in  seconds.  If  the  "Z"  value  is  transferred  in  the  acronym  PROVFLAG  it  was  not  possible  to

determine data records and the acronym will be transferred with zero.

SAP-ESK_30.docx

Version:1.2.22714  Page 8 of 13

Escalation Messages MLE Interface / File Port

4  SAP.OUTBOUND_FM_POST_ERROR

Description

Prerequisites:

hysapupl.exe/out V8.1.1.91

db_sql/dbp_esk_sap_outbound_fm_post_error.hsc

The  event  SAP.OUTBOUND_FM_POST_ERROR  is  provided  as  event  if  the  required  conditions  are

given within the application. The following basic requirements have to be met in order for the event to be

provided:

  A  synchronous  or  transactional  communication  is  established  with  SAP,  whereas  MES  acts  as

RFC client (i.e. actively starts communication).

  The  function  module  (a  normal  function  module  or  BAPI)  started  in  this  context  optionally

provides:

o  An  error  structure  of  the  type  BAPI*  (i.e.  e.g.  BAPIRET1,  BAPIRET2,  BAPIRETURN  or

others) as export parameter.

o  An error structure of the BAPI* (i.e. e.g. BAPIRET1, BAPIRET1, BAPIRETURN or others)

as table parameter.

o  Explicit exceptions.

If these conditions are met, the event will be provided in the following cases:



If it is a business error

In  this  case  the  fields  of  the  BAPI  return  structures  include  the  error  message's  user  data,

provided that the module supports them.

Subject  to  the  module,  business  errors  can  also  be  provided  by  exceptions.  In  this  case,  RFC

fields include more detailed information on the error type.



If it is an RFC communication error

In this case, RFC fields include more detailed information on the error type.

Further details about the exact data and how they are provided can be found in the relevant descriptions

about interfaces, as they each start individual modules. Irrespective of the individual characteristics, the

event provides the following data:

SAP-ESK_30.docx

Version: 1.2.22714

Page 9 of 13

Escalation Messages MLE Interface / File Port

  TID (Key1)

Unique number generated during communication with the external system.

  SAP.FB - technical name of the function module / BAPI (Key 2)

Provides  the  name  of  the  SAP  function  module  –  it  matches  exactly  the  technical  name  of  the

module from the Function Builder (SE37) in SAP.

  TYPE - from the RETURN structure of the BAPI (Key 3)

The parameter may have the following values:

'S' for success messages

'E' for errors

'W' for alerts

'I' for information messages

'A' for interruptions



ID - from the RETURN structure of the function module / BAPI (Key 4)

ID of an SAP message from table T100. This ID summarizes messages pertaining to a specific

component.

  NUMBER - from the RETURN structure of the function module / BAPI (Key 5)

Number of an R/3 message from table T100

  MESSAGE= from the RETURN structure of the function module / BAPI

Text of the message

  LOG_NO - from the RETURN structure of the function module / BAPI

Uniquely identifies a protocol/log

  LOG_MSG_NO - from the RETURN structure of the function module / BAPI

The

internal,

consecutive

number

of

the  message

within

a

protocol.

This number does not necessarily represent the chronological order.

  MESSAGE_V1 - from the RETURN structure of the function module / BAPI

One of up to four values that can be used in variables of a T100 message. Variables are replaced

in the order in which they appear in the message text.

  MESSAGE_V2 - from the RETURN structure of the function module / BAPI

One of up to four values that can be used in variables of a T100 message. Variables are replaced

in the order in which they appear in the message text.

SAP-ESK_30.docx

Version: 1.2.22714

Page 10 of 13

Escalation Messages MLE Interface / File Port

  MESSAGE_V3 - from the RETURN structure of the function module / BAPI

One of up to four values that can be used in variables of a T100 message. Variables are replaced

in the order in which they appear in the message text.

  MESSAGE_V4 - from the RETURN structure of the function module / BAPI

One of up to four values that can be used in variables of a T100 message. Variables are replaced

in the order in which they appear in the message text.

  RFCERRGRP - from RFC communication

RFC error group

  RFCERRKEY - from RFC communication

RFC error key

  RFCERRMSG - from RFC communication

RFC error message

  RFCEXC= from RFC communication

SAP-ESK_30.docx

Version: 1.2.22714

Page 11 of 13

5  Further MLE Escalations

Escalation Messages MLE Interface / File Port

Event

Description

Identifications

Description

Notes

SAP.INBOUND_NOC
ONNECT

No  connection
SAP
(HYDRA inbound)

to
possible

LOGSYS

ROLE

HOST

Log.  System,
connection can be established.

for  which  no

Active role for the log. system

SAP system (name or IP)

GATEWAY

Gateway on the SAP server

RFCERRGRP)*1

RFC failure group 1

RFCERRKEY)*1

RFC error key

RFCERRMSG)*1

RFC error message

SAP.INBOUND_FILE
_MOVE_ERR

Error
copying/
moving  the  files  at
the file port

MESTYP

MESFCT

SAP.INBOUND_NO_
DIST_MODEL

SAP.INBOUND_DISP
_DS_ERROR

No distribution model
for  a  message  type
HYDRA
at
mySAP
inbound
processing

the

the

Incorrect data record
in
HYDRA
mySAP
inboundprocessing

SAP.INBOUND_DISP
_DS_UNKNOWN

Unknown
data
record in the HYDRA
inbound
mySAP
processing

SAP.INBOUND_DISP
_IDOC_ERROR

Incorrect  IDoc  in  the
mySAP
HYDRA
inbound processing

SAP.OUTBOUND_L
OGON_FAILURE

Logon  error  in  the
confirmation  of  data
to SAP

WORKPATH

IFPATH

MESTYP

TAID

VERWEIS

IDOCNUM

MESTYP

TAID

VERWEIS

IDOCNUM

MESTYP

TAID

VERWEIS

IDOCNUM

MESTYP

TAID

VERWEIS

IDOCNUM

LOGSYS

ROLE

HOST

USR

Message type

Message function

Work directory

Interface path

Message type

Transaction number

Reference of the IDoc

IDoc number of the IDoc

Message type

Transaction number

Reference of the IDoc

IDoc number of the IDoc

Message type

Transaction number

Reference of the IDoc

IDoc number of the IDoc

Message type

Transaction number

Reference of the IDoc

IDoc number of the IDoc

Logical system

Active role of the logical system

SAP destination computer of the
confirmation

CPIC  user  for  confirmations  to
SAP

This  event  will  be
triggered  if  the  RFC
server cannot connect
to SAP and/or cancels
an
existing
connection.

This  event  will  be
triggered  if  it  is  not
possible  to  write  new
files in the HYDRA file
port
inbound
processing.

This  event  will  be
triggered if there is no
distribution  model  for
type
a  message
in
mySAP
HYDRA
inbound processing.

if  at

This  event  will  be
least
triggered
is
one  data  record
in  HYDRA
missing
mySAP
inbound
processing.

if  at

This  event  will  be
triggered
least
is
one  data  record
unknown  in  HYDRA
mySAP
inbound
processing.

if

This  event  will  be
the
triggered
complete  IDoc  could
not  be  processed  in
HYDRA
mySAP
inbound processing.

if

This  event  will  be
is
triggered
it
detected  during
the
confirmation of data to
a
SAP
is  not
confirmation
possible  since
the
CPIC user is blocked.

that

SAP.OUTBOUND_N
OCONNECT

No  connection
SAP
(HYDRA outbound)

to
possible

RFCERRGRP)*1

RFC failure group 1

RFCERRKEY)*1

RFC error key

RFCERRMSG)*1

RFC error message

LOGSYS

Logical system

ROLE

HOST

USR

Active role of the logical system

SAP destination computer of the
confirmation

CPIC  user  for  confirmations  to
SAP

This  event  will  be
triggered  if  the  RFC
client cannot establish
a connection to SAP.

SAP-ESK_30.docx

Version: 1.2.22714

Page 12 of 13

Escalation Messages MLE Interface / File Port

Event

Description

Identifications

Description

Notes

SAP.HYINFO_EXCE
PTION

Exception  (error)  in
the HYINFO function
module in SAP

RFCERRGRP)*1

RFC failure group 1

RFCERRKEY)*1

RFC error key

RFCERRMSG)*1

RFC error message

LOCLTID

Transaction  number  of
connection concerned

the

MESTYP

Message type

RFCERRGRP)*1

RFC failure group 1

RFCERRKEY)*1

RFC error key

RFCERRMSG)*1

RFC error message

SAP.OUTBOUND_FI
LE_STILL_THERE

in

Error
copying/
moving  the  files  at
the file port

MESTYP

MESFCT

WORKPATH

IFPATH

Message type

Message function

Work directory

Interface path

MLE.INBOUND_BAPI
_ERROR

if

This  event  will  be
an
triggered
(error)
exception
occurs in the HYINFO
function  module
in
SAP
that  prevents
further processing.

This  event  will  be
triggered
if  no  new
files  can  be  written  in
the  HYDRA  file  port
outbound  processing
since  already  existing
files  are  not  called  by
the partner system.

Escalation  extended
by the complete result
string of the BAPI call.

SAP-ESK_30.docx

Version: 1.2.22714

Page 13 of 13

