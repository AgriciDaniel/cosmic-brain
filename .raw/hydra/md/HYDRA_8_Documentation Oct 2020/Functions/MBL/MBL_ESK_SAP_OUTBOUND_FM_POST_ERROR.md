SAP.OUTBOUND_FM_POST_ERROR

1  SAP.OUTBOUND_FM_POST_ERROR

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

MBL_ESK_SAP_OUTBOUND_FM_POST_ERROR.docxVersion:

1.0.1362

Page 1 of 3

SAP.OUTBOUND_FM_POST_ERROR

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

MBL_ESK_SAP_OUTBOUND_FM_POST_ERROR.docxVersion:

1.0.1362

Page 2 of 3

SAP.OUTBOUND_FM_POST_ERROR

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

MBL_ESK_SAP_OUTBOUND_FM_POST_ERROR.docxVersion:

1.0.1362

Page 3 of 3

