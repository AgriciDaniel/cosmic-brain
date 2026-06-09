  Escalation SAP.OUTBOUND_FM_POST_ERROR

1  Escalation SAP.OUTBOUND_FM_POST_ERROR

Usage

If  an  error  occurs  while  uploading  data  for  serial  production,  the  application  will  provide  an  event

SAP.OUTBOUND_FM_POST_ERROR that can be evaluated and forwarded by Escalation Management.

As part of serial production, the escalation fields are assigned as follows:

Prerequisites:

hysapupl.exe/out V8.1.1.91

db_sql/dbp_esk_sap_outbound_fm_post_error.hsc

Data

field

of

the

Value(s)

Meaning

escalation

SAP.FB

BAPI_REPMANCONF1_CREATE_MTS  Name of the function module  in

SAP

TYPE

'E'  - for errors

Subject to the business error

'W' - for warnings

'A' - for interruptions

ID

Number

Message

Message ID

Subject to the business error

Message number

Subject to the business error

Message text

Subject to the business error

The  function  module  BAPI_REPMANCONF1_CREATE_MTS  has  a  return  structure  that  is  provided  as

export  parameter.  Consequently,  only  one  error  message  may  occur  every  time  the  function  module  is

called.

MBL_SAP_Implementation_REM_ESK.docxVersion: 1.0.1362

Page 1 of 1

