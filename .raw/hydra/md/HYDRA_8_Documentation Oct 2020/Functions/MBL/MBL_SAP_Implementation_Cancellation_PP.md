Cancellation Process

1  Cancellation Process

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

MBL_SAP_Implementation_Cancellation_PP.docxVersion: 1.3.18804

Page 1 of 5

Cancellation Process

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

MBL_SAP_Implementation_Cancellation_PP.docxVersion: 1.3.18804

Page 2 of 5

Cancellation Process

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

MBL_SAP_Implementation_Cancellation_PP.docxVersion: 1.3.18804

Page 3 of 5

Cancellation Process

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

MBL_SAP_Implementation_Cancellation_PP.docxVersion: 1.3.18804

Page 4 of 5

After  correction  of  a  "Posting/  Partial  confirmation"  (L20)  in  HYDRA,  HYDRA  will  transfer  the  new

"Posting/  Partial  confirmation"  also  as  record  type  L20  to  SAP,  irrespective  of  the  operation  status  in

HYDRA.  If  a  final  confirmation  (L40)  has  been  corrected  in  HYDRA,  HYDRA  will  transfer  this  new  final

confirmation as record type L40 to SAP.

Cancellation Process

MBL_SAP_Implementation_Cancellation_PP.docxVersion: 1.3.18804

Page 5 of 5

