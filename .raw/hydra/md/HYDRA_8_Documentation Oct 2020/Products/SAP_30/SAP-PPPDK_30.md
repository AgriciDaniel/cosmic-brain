Manual

Correction Functions for the
PP-PDC Interfacing Module
SAP-PPPDK 3.0

Version 1.2.19800

Last changed on: 06.08.2020

Module

Correction  Functions  for  the  PP-PDC  Interfacing

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

SAP-PPPDK_30.docx

Version: 1.2.22714

Page 2 of 19

Module

Contents

Correction  Functions  for  the  PP-PDC  Interfacing

1  Cancellation of PP Uploads ......................................................................... 4

2  SAP BAPI ..................................................................................................... 5

3  Cancellation Process ................................................................................... 7

4  Manual Maintenance .................................................................................. 12

5  Reaction to sRFC Errors ............................................................................ 14

SAP-PPPDK_30.docx

Version: 1.2.22714

Page 3 of 19

Correction  Functions  for  the  PP-PDC  Interfacing

Module

1  Cancellation of PP Uploads

Summary

Use options

The SAP-PPPDCC function package extends the HYDRA interfacing module to SAP PP via PP-PDC by

a cancellation option that is not provided for in the SAP PP-PDC interface.

Implementation notes

Use the function package to :

  use production orders in SAP PP and





to transfer uploads from MES to SAP and

to  pass  on  corrections  from  MES  to  SAP  to  minimize  maintenance  works  and  to  maintain  the

consistency of the confirmation data in both systems.

Integration

The function package uses the data entered into BDE.

The corrected data records are transferred via the PP_PDC interface.

Scope of functions

  Correction functions for PP-PDC link module

o  Functions to transfer corrections from HYDRA to SAP PP from Rel 4.6C.

o

Integration into the SAP business framework by synchronous RFC

o  Cancellation of the SAP uploads using SAP BAPI ProdOrdConfirmation.Cancel

o  Assurance of data consistency in the integration into the PP-PDC environment.

o  Notification in case that an upload cannot be canceled (condition: SAP-ESK license).

SAP-PPPDK_30.docx

Version: 1.2.22714

Page 4 of 19

Module

2  SAP BAPI

Correction  Functions  for  the  PP-PDC  Interfacing

The  notion  Business  Application  Programming  Interface  (BAPI)  SAP  provides  a  series  of  predefined

interfaces enabling partner systems (R/3, R/2 as  well as third-party systems) to access the functions of

the SAP R/3 and/or ECC system.

SAP defines BAPI as follows:

Standardized programming interface providing external access to processes and data of the SAP system.

Business Application Programming Interfaces (BAPIs) are defined as SAP business objects and/or SAP

interface types in the Business Object Repository (BOR).

BAPIs  provide  an  object-oriented  view  of  the  business  components  of  the  SAP  system.  They  are

implemented  and  stored  as  RFC-capable  function  modules  in  the  Function  Builder  of  the  ABAP

Workbench.“1

1 Source. http://help.sap.com

SAP-PPPDK_30.docx

Version: 1.2.22714

Page 5 of 19

Module

Correction  Functions  for  the  PP-PDC  Interfacing

Source:

http://help.sap.com/saphelp_nw70/helpdata/de/5a/ccb4c5808311d396b40004ac96334b/frameset.htm

SAP-PPPDK_30.docx

Version: 1.2.22714

Page 6 of 19

Kernel:Kernel that includes object data  and the structure,Integrity layer:Business logic of the business objectInterface layer:Provides for the communication with distributed systems Access layer: Defines the access technology, e.g. tRFC

Correction  Functions  for  the  PP-PDC  Interfacing

Module

3  Cancellation Process

Technical basics of cancellation

Technically, uploads/confirmations are cancelled in SAP in two basic steps:

  Selecting the original data record to identify the SAP confirmation counter.

  Cancelling the original record using the confirmation counter.

The order key (order / sequence / operation / suboperation) and a unique ID (EX_IDENT) are required to

select the confirmation counter. HYDRA generates this ID for each time ticket (original record) transferred

to  SAP.  HYDRA  sends  this  ID  along  with  the  time  ticket.  SAP  keeps  this  ID  with  the  operation

confirmation/upload.

You can use the identified confirmation counter to clearly identify  the time ticket (original record) and to

cancel it in SAP.

Transferring cancellation records to SAP

In case of production orders, the postings recorded in HYDRA are promptly transferred to SAP and also

posted there. If you change data subsequently in HYDRA, the same changes have to be repeated in SAP

in order to avoid an imbalance between the data of both systems.

These are the steps required to execute and monitor the cancellation process:

SAP-PPPDK_30.docx

Version: 1.2.22714

Page 7 of 19

Module

Correction  Functions  for  the  PP-PDC  Interfacing

Editing data in the HYDRA maintenance of postings

The following conditions must be met to transfer cancellations to SAP:

  The editing function "HYDRA maintenance of postings" is used.

  The order type is subject to confirmations/uploads.

  The order type allows for the posting to be changed once it has been uploaded.

The cancellation interface has not been released for use with the HYDRA event maintenance.

The system only generates cancellation records if the original data record has already been uploaded to

SAP. The Confirmed column of the maintenance of postings indicates if a data record has already been

uploaded to SAP.

If you change and save a data record in the maintenance of postings, only the current data record will be

shown. The system still includes the original data record but does not show it.

Provision of data for the transfer to SAP

Time tickets are provided by converting the HYDRA data format into a meta format and transferring the

data  records  to  the  HYDRA  interface  tables.  The  upload  program  generates  a  unique  ID  (EX_IDENT)

during the transfer. This ID identifies each single record during the cancellation process.

If you use several HYDRA servers that upload data to an SAP instance, the EX_IDENT must differ from

system  to  system  to  ensure  uniqueness.  To  do  so,  the  upload  program  (myerprck.exe/out)  provides  a

parameter that guarantees this uniqueness. Use the following parameter to start the upload program:

/IDENT_PRAEFIX=XXX

Note: The prefix must ONLY include hexadecimal characters, i.e. 0-9 and A-F.

Displaying the records in MLE outbound transactions

After  confirming  the  data  records,  they  can  be  transferred  to  SAP  in  a  meta  format.  The  Confirmed

column of the maintenance of postings indicates such data records using the icon

.

In  the  MLE  outbound  transactions  (menu:  File  -->  System  information  -->  MLE  communication  -->

Outbound  transactions),  you  can  identify  the  uploads  to  SAP  via  the  PP-PDC  interface  and  the

cancellation records as follows:

SAP-PPPDK_30.docx

Version: 1.2.22714

Page 8 of 19

Module

Correction  Functions  for  the  PP-PDC  Interfacing

Time ticket uploads

Cancellation records

Message type

PPCC2PRETTICKET

E2BP_PP_TIMETICKET_C

IDoc type

PPCC2PRETTICKET01

PPCC2PRETTICKET01

Segment type

E2BP_PP_TIMETICKET

E2BP_PP_TIMETICKET_C

Segment E2BP_PP_TIMETICKET_C

The segment of cancellation records E2BP_PP_TIMETICKET_C is structured as follows:

Field name

CONF_NO

ORDERID

SEQUENCE

OPERATION

SUB_OPER

PROC_START_TIME

T
NUMC

L  D  Description  Usage in HYDRA
Upload number of the operation
10

0

Upload number of the
operation

CHAR

12

CHAR

CHAR

CHAR

TIME

6

4

4

6

0

0

0

0

Order

Sequence

Operation

According to configuration (*1)

According to configuration (*1)

According to configuration (*1)

Suboperation

According to configuration (*1)

Time when "starting
processing"

Not used

EX_IDENT

CHAR

32

0

POSTG_DATE

DATS

8

0

Unique reference to data
record

Combined key: transfer parameter
+ ade_protokoll.verweis

External date of entering
the confirmation/upload

Depending on the program
parameter /SDAT_STORNO of the
program myerprck.exe/out :

Not set (by default) :
Change date of the log record
/SDAT_STORNO set :
Shift date of the log record

CONF_TEXT

CHAR

40

Confirmation/upload text
for the cancellation
record.

Reserved for future developments.

The documentation of the  standard interface describes the structure of the standard records  of the  PP-

PDC interface.

Process of transferring data to SAP

The SAP upload request controls the data transfer to SAP. The HYDRA MLE distribution model starts the

HYDRA upload client. This upload client either transfers the time tickets to SAP using IDoc and tRFC or

cancels the cancellation records via sRFC in SAP.

Initially, the upload client is called for the confirmation/upload of time tickets. The provision dates of the

individual data records result in a sorting, which must be adhered to for serialization purposes.

SAP-PPPDK_30.docx

Version: 1.2.22714

Page 9 of 19

Module

Correction  Functions  for  the  PP-PDC  Interfacing

In  a  first  step,  the  upload  client  attempts  to  transfer  time  tickets  to  SAP.  If  this  is  possible,  the  upload

client  selects  all  time  ticket  records  up  to  the  first  cancellation  record  and  transfers  the  selected  time

tickets to SAP via IDoc. If it is not possible to select time tickets, the upload client checks whether there

are cancellation records that have to be transferred to SAP.

If the upload client finds a cancellation record it will try to cancel it in SAP. Since cancellations are made

using synchronous RFCs, you can state immediately whether a cancellation was successful.

If  the  cancellation  process  was  successful  the  upload  client  determines  the  next  records  ready  to  be

transferred (time tickets or cancellation records) based on the chronological order of their provision and

transfers them to SAP.

If  the  cancellation  was  not  successful,  the  cancellation  record  will  be  set  to  "TODO"  in  the  interface.

Consequently,  the  record  is  registered  for  the  next  transfer.  In  this  confirmation/upload  cycle,  no

additional data records will be transferred to SAP that were provided after this record.

The  number  of  posting  attempts

is  managed

for

the  data  record

in  order

to  prevent

the

confirmation/upload  interface  from  being  completely  blocked  for  this  message  type.  The  upload  client

provides  a  parameter  that  allows  to  define  after  how  many  attempts  a  data  record  will  be  qualified  as

incorrect and when to proceed with the "normal" uploads.

The  parameter  "/REDO_CANCEL="  of  the  program  hysapupl.exe  is  included  in  the  HYDRA  MLE

distribution model and can be changed at any time.

The SAP upload request triggers the next transfer cycle, therefore this request  should be transferred to

HYDRA at intervals of 5 minutes.

By default, the upload client cancels one posting record in SAP per posting record in HYDRA. There

might be specific, customer-related situations where the system generates several SAP posting records

per HYDRA posting record.

In order to handle this situation, you can set the parameter "/MULTIPLE_CANCEL“ of the hysapupl.exe

program in the HYDRA MLE distribution model. This will cancel all SAP posting records existing for a

HYDRA posting record.

SAP operation status

HYDRA shows the same behavior when canceling data via the interface as SAP when collecting data via

SAP-GUI.  If  a  partial  confirmation/upload  is  canceled  for  already  completed  operations  and  if  this  is

entered again, SAP will set the operation status from finally confirmed to partially confirmed.

SAP-PPPDK_30.docx

Version: 1.2.22714

Page 10 of 19

Module

Correction  Functions  for  the  PP-PDC  Interfacing

After  correction  of  a  "Posting/  Partial  confirmation"  (L20)  in  HYDRA,  HYDRA  will  transfer  the  new

"Posting/  Partial  confirmation"  also  as  record  type  L20  to  SAP,  irrespective  of  the  operation  status  in

HYDRA.  If  a  final  confirmation  (L40)  has  been  corrected  in  HYDRA,  HYDRA  will  transfer  this  new  final

confirmation as record type L40 to SAP.

SAP-PPPDK_30.docx

Version: 1.2.22714

Page 11 of 19

Correction  Functions  for  the  PP-PDC  Interfacing

Module

4  Manual Maintenance

Usage

If  the  automatic  cancellation  via  the  correction  functions  for  the  PP-PDC  interfacing  module  was  not

successful, you will have to maintain manually.

Requirements:

Use the HYDRA interfacing module to SAP PP via PP-PDC and the correction functions for the PP-PDC

interfacing module.

Approach

If a specific data record cannot automatically be canceled in SAP, it will be presented as incorrect in the

MLE Outbound transactions (status "DONE  ERROR"  + red light). In this case,  the data record must be

canceled manually in SAP. To do so:

cancel  the  data  records  via  the  field  "EX_IDENT"  of  the  PP-PDC  interface.  Also  the  segment

E2BP_PP_TIMETICKET  contains  this  field  for  the  data  record  to  be  canceled.  The  content  of  this  data

record will be displayed in the MLE Outbound transactions via the function "Show data segments for the

transaction".

SAP  will generate an  internal  number  - the confirmation counter  - for each confirmed time ticket. In the

production order, the confirmation counter of the original record can be determined as follows:

SAP  production  order  (CO02/  CO03)    transaction  overview    transaction  details    Transaction

confirmations (Menu)  Transaction confirmations: Detail

In  the  "Administration"  tab  the  field  "Ext.  Key"  presenting  the  contents  of  the  field  EX_IDENT  from  the

interface  will  be  displayed.  This  field  can  be  used  to  identify  the  data  record  and  to  determine  the

confirmation counter.

As  soon  as  the  confirmation  counter  has  been  determined  like  that,  the  original  data  record  can  be

canceled  using  the  SAP  transaction  "CO13".  EX_IDENT  can  again  be  controlled  in  the  presentation  of

this transaction.

Result

You  will  have  proceeded  manually

to  a  cancellation

that  could  not  be  made  automatically.

SAP-PPPDK_30.docx

Version: 1.2.22714

Page 12 of 19

Module

Correction  Functions  for  the  PP-PDC  Interfacing

SAP-PPPDK_30.docx

Version: 1.2.22714

Page 13 of 19

Correction  Functions  for  the  PP-PDC  Interfacing

Module

5  Reaction to sRFC Errors

Usage

With  sRFC-communication  the  calling  system  will  receive  next  to  a  technical  return  code  also  business

information regarding the success of an intended action.

The evaluation of the return parameters from the SAP function module can be optimized here as regards

the  question  whether  to  reject  specific  data  immediately  (in  this  case  the  next  data  record  would  be

edited) or whether to wait "online" for a couple of seconds before trying again to post the data to SAP.

Requirements

You use the synchronous RFC for the communication with SAP.

You execute the upload client hysapupl.exe/out by the command parameter /SINGLE_IDOC

Mapping

A general error handling function is integrated into the confirmation program to SAP hysapupl.exe/out that

provides for a uniform error handling of sRFC-calls. This function assumes the error handling:



if there is an error such as a RFC-exception and/or an exception of the function module,



if the posting success is returned to a BAPIRET-structure,



If the posting success is returned to a BAPIRET-table,



if in case of the QM-IDI the posting success is returned to a QIERR-table.

  This uniform return code handling is made synchronously for all called RFC-modules, and in doing so

existing island solutions were customized to this uniform processing method.

Processing  is  activated  using  the  new  program  parameter/  RET_CODE_EVALUATION.  This  is  used  to

evaluate  the  existing  parameter/  REDO_CANCEL=  for  all  synchronous  calls.  If  this  is  not  set,  HKMPP-

PDCC  will  be  used  as  default.  In  addition,  it  will  be  checked  in  the  sap_fb_return_cfg  table  whether  it

contains entries for the respective synchronous module.

In  error  handling  the  existing  table  sap_fb_return_cfg  will  be  evaluated  and  any  returned  error  will  be

handled correspondingly. To do so, the following logics is used:

SAP-PPPDK_30.docx

Version: 1.2.22714

Page 14 of 19

Module

PRIO 1 :

Correction  Functions  for  the  PP-PDC  Interfacing

Error handling when the function module returns an exception.

This will be checked  against the table sap_fb_return_cfg and be handled according to the configuration

applying to that combination of function module name and exception.

If there is no entry, the data record will "normally" be handled as REDO-cancel and will automatically be

set to "ToDo" and/or "DONE_ERROR".

PRIO 2 :

Error handling when the functional module does NOT return an exception but return the result in a return

structure (Prio 2).

This will be checked against the table sap_fb_return_cfg and be handled according to the configuration

applying to that combination of function module name and ret_type / ret_id / ret_number.

Once the processing will be completed, the data record status of the des ret_type in the return structure

will be implemented according to the following pattern:



"S"

DONE



"W"

DONE



"I"

DONE



"E"

DONE ERROR



"A"

DONE ERROR

PRIO3 :

Error handling when the functional module does NOT return an exception but return the result in a return

table.

This return table may include more entries of different ret_type. This is the reason why this table will be

used to  iterate  and in  line  with the following priority the table sap_fb_return_cfg  will be searched for an

entry:



ret_type = A

  2. ret_type = E

  3. ret_type = W

SAP-PPPDK_30.docx

Version: 1.2.22714

Page 15 of 19

Module

Correction  Functions  for  the  PP-PDC  Interfacing

If an entry will be found, the configuration in the table sap_fb_return_cfg will be used for further handling.

Once the processing will be completed, the data record status of the des ret_type in the return structure

will be implemented according to the following pattern:



"S"

DONE



"W"

DONE



"I"

DONE



"E"

(at least one entry – Prio 2) DONE ERROR



"A"

(at least one entry – Prio 1) DONE ERROR

PRIO4 :

Error  handling  when  the  functional  module  does  NOT  return  an  exception  but  return  the  result  in  a

QUIERR table.

This return table may include more entries of different ret_type. This is the reason why this table will be

used to  iterate  and in  line  with the following priority the table sap_fb_return_cfg  will be searched for an

entry:



ret_type = A

  2. ret_type = E

  3. ret_type = W

If an entry will be found, the configuration in the table sap_fb_return_cfg will be used for further handling.

Once the processing will be completed, the data record status of the des ret_type in the return structure

will be implemented according to the following pattern:



"S"

DONE



"W"

DONE



"I"

DONE



"E"

(at least one entry – Prio 2) DONE ERROR



"A"

(at least one entry – Prio 1) DONE ERROR

SAP-PPPDK_30.docx

Version: 1.2.22714

Page 16 of 19

Module

Correction  Functions  for  the  PP-PDC  Interfacing

If an entry is found in the table sap_fb_return_cfg for a return code, the system will interpret this entry as

follows:

  ACTION = "A“ (only for SAP-PPPDCC)

The data record will be marked immediately as DONE_ERROR without taking the program parameter

"/REDO_CANCEL" into account.

  ACTION = "R"

The system will wait for the time period specified in DELAY (in seconds) online (with live connection

to SAP) and once this time period has elapsed will attempt to post the data once again.

If this is possible (=successful), the data record will be marked as DONE.

If this can again not be posted (e.g. because the data record is still being blocked in SAP), it will be

marked  in  HYDRA  as  TODO  (try  again)  or  DONE_ERROR  (impossible  to  post)  while  the  value

defined  via

the  program  parameter

"/REDO_CANCEL"  will  be

taken

into  account.

If  REDO_CANCEL  is  not  explicitly  specified  during  the  program  call,  the  DEFAULT  value  will  be

used.

Entries or changes to this table need to be agreed with MPDV since erroneous configurations

may lead to unwanted side effects.

Table: sap_fb_return_cfg

Field
FB_NAME

KEY  Type  L  D  Meaning

X

CHAR

30     Name of the functional

module

EXCEPTION

X

CHAR

30     Exception

RET_TYPE

X

CHAR

1  0  Message type: S

Notes/ Usage in HYDRA
Used to determine
whether there are entries in
this table to this FB
Exception that is triggered by
the module
FUTURE USE
Possible entries:

Success, E Error, W
Warning, I Info, A Abort

"E" --> Error
"A" --> Abort
"W" --> Warning

RET_ID

RET_NUMBER

RET_MESSAGE
RET_LOG_NO

X

X

CHAR

20  0  Messages, message

Message type, e.g. "RU"

class

NUMC

3  0  Messages, message

Message number, e.g. "486"

CHAR
CHAR

number

220  0  Message text

20  0  Application log: Protocol

number

FUTURE USE
FUTURE USE

RET_LOG_MSG_NO

NUMC

6  0  Application log : internal

FUTURE USE

serial number of the
message

SAP-PPPDK_30.docx

Version: 1.2.22714

Page 17 of 19

Module

Correction  Functions  for  the  PP-PDC  Interfacing

Field
RET_MESSAGE_V1

KEY  Type  L  D  Meaning

CHAR

50  0  Messages, message

Notes/ Usage in HYDRA
FUTURE USE

RET_MESSAGE_V2

CHAR

50  0  Messages, message

FUTURE USE

variable

RET_MESSAGE_V3

CHAR

50  0  Messages, message

FUTURE USE

variable

RET_MESSAGE_V4

CHAR

50  0  Messages, message

FUTURE USE

variable

RET_PARAMETER
RET_ROW
RET_FIELD
RET_SYSTEM

variable

CHAR
INT4
CHAR
CHAR

32  0  Name of the parameter
10  0  Line in parameter
30  0  Field in parameter
10  0  System (logical system)
that issued the message

FUTURE USE
FUTURE USE
FUTURE USE
FUTURE USE

ACTION

CHAR

2     Action to be executed

DELAY

NUMC

8     Delay in seconds

This defines which action will
be executed by
hysapupl.exe/out:
"A" --> Cancel (immediate
setting apart)
"R" --> Online repetition
If "R"epeat is stored to the
ACTION field, than this
defines the time interval in
seconds after which the
repetition is to be made.

SAP-PPPDK_30.docx

Version: 1.2.22714

Page 18 of 19

  Correction Functions for the PP-PDC Interfacing Module

SAP-PPPDK_30.docx

Version: 1.2.22714

Page 19 of 19

