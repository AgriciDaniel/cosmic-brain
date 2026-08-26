Manual

HYDRA Interfacing Module to
SAP PP via PP-PDC
SAP-PPPDC 3.0

Version 1.0.20365

Last changed on: 06.08.2020

  HYDRA Interfacing Module to SAP PP via PP-PDC

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying  and  distribution  of this  documentation  or  any  part  thereof,  for  any  purpose  or  in  any  form,  is  prohibited  without  prior
written permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 2 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Contents

1  HYDRA Interfacing Module to SAP PP via PP-PDC .................................... 4

2  PP-PDC integration in HYDRA .................................................................... 6

3  Behavior Depending on the Transfer Types ................................................ 9

4  Download of operation data ....................................................................... 11

5  Key Fields / Supported Characters ............................................................ 19

6  Download of Master Data ........................................................................... 22

7  Upload of SAP time tickets ......................................................................... 27

8  SAP Order Sequencing .............................................................................. 35

9  SAP Uploads .............................................................................................. 37

10  MYERPRCK - Program Parameters .......................................................... 39

11  Application-Relevant Settings in HYDRA ................................................... 51

12  Application-Relevant Settings in SAP ........................................................ 55

13  Configuration when using SAP PI / SAP PO ............................................. 63

14  Protecting fields of planned operations ...................................................... 66

15  Modification to the Order of Uploads.......................................................... 71

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 3 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

1  HYDRA Interfacing Module to SAP PP via PP-PDC

Purpose

The PP-PDC (Production Planning – Plant Data Collection) is an interface of the SAP ECC production

control.  It  replaces  the  former  interface  named  communication  channel  2  (KK2)  and  provides  an

extended functionality.

The interface has been implemented to connect to the MES. The MES applications record postings for

operations  that  can  then  be  uploaded.  To  check  the  plausibility  of  the  data  collection  in  the  sub-

system,  the  PP-PDC  downloads  operations  (initial  and  delta  download  and  delete  function)  and

workplaces, deviation reasons and quantity units.

The  implementation  is  performed  using  the  BAPI  technology.  The  SAP  transceiver  previously  used

has not been used. This procedure is the future standard for communication within an integrated SAP

system  architecture.    Using  the  BAPI  technology,  the  HYDRA  connection  is  now  performed  on  the

level of business data.

Implementation notes

You use the PP-PDV interface for the following purposes:

  You have implemented the module Production Planning  and Control in SAP ECC or R/3 and

you use it for production orders

  You want to perform the shop floor control in HYDRA

  You  want  to  perform  the  shop  floor  control  in  SAP,  but  you  want  to  perform  the  progress

postings on the production level



Independent  of  the  detailed  scheduling  that  is  performed,  you  want  to  perform an  automatic

connection of machines/systems and an automatic upload of the recorded quantities to SAP.

  You require actual times that are more precise to calculate the precise costs in SAP.

Integration

If  you  use  the  component  SAP-PPPDC,  the  orders/operations  transferred  with  this  component  are

used for a great number of further postings in HYDRA.

If the information provided via PP-PDC interface is not sufficient, you can use the component SAP-ISS

HYDRA information interface for SAP PP to increase the information and to transfer additional data

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 4 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Features

  Download  of  the  released  and  planned  order/operation  data  from  SAP  PP  (initial  and  delta

download and delete function)

  Recording  of  start/interruption/end  of  processing,  start/interruption/end  of  setup,  start/end  of

disturbance and validation checks

  Upload to SAP PP of the actual times and quantities recorded for a specific SAP time ticket

  Configurable assignment of the times recorded in HYDRA resource performance accounts to

the SAP activity types.

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 5 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

2  PP-PDC integration in HYDRA

Purpose

If the ERP system and HYDRA are connected via the PP-PDC interface, the subsystem must be able

to  receive  the  IDocs  generated  by  SAP  ECC  and  to  integrate  them  in  the  HYDRA  process.  HYDRA

also  generates  IDocs  from  the  recorded  downloads/confirmations  and  transfers  them  to  SAP  ECC.

SAP ECC triggers both workflows.

SAP  provides  several  standard  BAPIs  /  IDOcs  as  part  of  the  PP-PDC  interface  to  establish

communication with BDE subsystems. The following BAPIs / IDocs are used:

Download operations:

IDoc type:

PPCC2RECORDER01

Segment type:

E1BP_PP_PDC_OPERA2

BAPI segment:

BAPI_PP_PDC_OPERA2

Request uploads:

IDoc type:

PPCC2REQCONF

Segment type:

E1PPCC2REQCONF

BAPI segment:

BAPI_PP_PDC_PARAM

Upload time tickets:

IDoc type:

PPCC2PRETTICKET01

Segment type:

E1BP_PP_TIMETICKET

BAPI segment:

BAPI_PP_TIMETICKET

Unlike the previous interface, the communication channel 2, the new PP-PDC interface is completely

based  on  BAPI  and  RFC.  This  means  that  the  SAP  transceiver  is  no  longer  required  and  that  new

RFC servers and clients are implemented in HYDRA. In HYDRA these new components communicate

with SAP ECC and constitute the interface itself.

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 6 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

SAP ECC  HYDRA (download operation data)

HYDRA RFC server

The  HYDRA  RFC  server  logs  in  to  the  SAP  gateway.  The  RFC  server  receives  the  incoming

IDocs  and  stores  them  to  the  HYDRA  database.  Then  the  HYDRA  process  responsible  for

transferring data to the HYDRA data model is started.

BAPI / IDoc types

SAP ECC uses SAP workflow processes to trigger the download of data to HYDRA. Basically,

the  standard  PP-PDC  interface  provides  three  IDoc  structures.  The  HYDRA  RFC  server

receives these IDoc structures: OPERA2 (initial / delta download), OPERA1 (deletion requests)

and REQCONF (confirmation/upload requests).

Operation data (OPERA2)

An IDoc of the type PPCC2RECORDER01 transfers the operations. Depending on the entry in

the segment E2PPCC2RECORDER000, it is either an initial download or a delta download. The

segment E2BP_PP_PDC_OPERA2 includes operation data.

Deletion download (OPERA1)

An IDoc of the type PPCC2RECORDER01 transfers the  operations. When it comes to a  delta

download, the segment E2BP_PP_PDC_OPERA1 can transfer the keys of the  operations that

are to be deleted.

Upload request (REQCONF)

An IDoc of the type PPCC2REQCONF transfers the request to upload time tickets. If this IDoc

type is received, it is an upload request.

OPERA2

OPERA1

REQCONF

Initial download

Delta download

Deletion download

Upload request

PPCC2RECORDER01  PPCC2RECORDER01  PPCC2RECORDER01

PPCC2REQCONF01

E2PPCC2RECORDER  E2PPCC2RECORDE

R

INIT

INIT

X

E2PPCC2RECORDE
R

E2PPCC2REQCONF

INIT

REQTT

X

IDoc type

Segment
name

Field

Entry

HYDRA  SAP ECC (upload)

SAP ECC  asks for the upload of time tickets (L20 / L40). As an option, HYDRA can also start

the upload at regular intervals, irrespective of an upload request.

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 7 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

HYDRA RFC client

The  HYDRA  RFC  client  uploads  the  time  tickets.  The  client  is  started  as  part  of  a  HYDRA

workflow. At this time, the data is available ready for dispatch in the database.

Data  is  transferred  asynchronously  as  IDoc.  Once  transferred,  a  defined  SAP  ECC  workflow

processes and posts the data.

Time tickets

An IDoc of the type PPCC2PRETTICKET01 of the standard PP-PDC interface transfers the time

tickets. The segment E2BP_PP_TIMETICKET includes the time ticket data.

In general, the following SAP time ticket record types are uploaded:

  L20 – Partial confirmation (reporting part quantities/times)

  L40 – Final confirmation (reporting total quantities/times)

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 8 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

3  Behavior Depending on the Transfer Types

Initial download behavior

An initial download of the order and operation data will only  take place when the complete system is

commissioned and  a first database  is to  be created in HYDRA. In addition, also other scenarios are

possible by which the entire operations base will be replaced.

During  an  initial  download  all  operations  from  SAP  will  be  transferred  that  have  at  least  the  status

"released" or that are not technically completed yet. This means that also (end) confirmed operations

will be transferred but not imported in HYDRA.

When the initial download is received, the current operations data base in HYDRA will be deleted and

be replaced by the new operations data. The current data will immediately be available.

An  initial  download  will  not  only  delete  the  order  base  existing  in  HYDRA  but  also  all  current

times and quantities entered for orders and/or transactions.

In addition, all operations that are being executed will not be deleted. This means that they must

be interrupted and/or terminated manually in HYDRA.

Conclusion:  Any  initial  download  during  the  operation  of  HYDRA  must  be  used  with  greatest

care and it would be useful to contact the MPDV Support beforehand.

For  security  reasons,  the  initial  download  function  needs  to  be  enabled  explicitly  as  of  the  below-

mentioned program version. Activation is performed by an INI configuration.

.\lib\b_anr.dll

V8.1.1.326

Delta download behavior

A delta download creates new operations in HYDRA that will then be added to the database. Another

function  of  the  delta  download  is  the  modification  of  already  transferred  operations.  Modifications  of

operations  with  the  status  "Running",  "Finished"  or  "Deleted"  are  not  allowed  by  the  HYDRA  default

settings.

CUSTOMIZING  information:  Modifications  of  the  operations  depend  on  whether  the  flag

“alterable order data” is set for the corresponding status in the status configuration.

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 9 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

If  an  operation  cannot  be  modified  to  ensure  the  consistency  in  HYDRA  (in  general  for  running

operations), this will be logged in HYDRA and be saved for error tracking purposes.

The basis for the delta download in SAP is the database table ORDCOM.

Deletion download behavior

A deletion download deletes those operations that are no longer necessary in the production process

from the HYDRA database.

As with the modifications, the deletion result depends on the operation's status. Operations identified

as "Running", "Interrupted", "Finished" or "Deleted", will not be deleted.

Moreover,  the  confirmation  number  (CONF_NO)  will  be  checked  to  identify  the  orders  via  order,

sequence  and  transaction.  This  prevents  any  accidental  deletion  of  orders  that  are  seemingly  the

same but which have different confirmation numbers.

Behavior when re-importing master data in SAP

When master data for an existing and released order that has already been transferred to HYDRA are

re-imported in SAP this impacts also the interface to HYDRA.

When  master  data  are  re-imported,  SAP  will  assign  new  confirmation  numbers  for  the  individual

operations  even  though  the  order  and  operation  numbers  won't  change.  These  are  then  transferred

together  with  the  next  delta  download  to  HYDRA.  The  confirmation/upload  number  will  then  be

updated in HYDRA.

The  update  will  also  be  made  when  the  current  status  is  "Running".  In  this  case,  however,

ONLY  the  confirmation/upload  no.  will  be  changed  and  all  other  data  (order  quantity,

scheduling, etc.) will not be updated.

Behavior during the technical completion in SAP

If an order is technically completed in SAP this will lead to a deletion download at the interface.  This

means that the order data in HYDRA will be deleted.

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 10 of 72

4  Download of operation data

  HYDRA Interfacing Module to SAP PP via PP-PDC

Structure E2BP_PP_PDC_OPERA2

Field name

T

L  D  Description

Usage in HYDRA

SOURCE_SYS

CHAR  10  0

Logical system

Not used

CONF_NO

NUMC  10  0

Confirmation/upload  number  of  the
operation

Confirmation/upload number

ORDERID

CHAR  12  0

Order

According to configuration (*1)

SEQUENCE

CHAR  6  0

Sequence

According to configuration (*1)

OPERATION

CHAR  4  0

Operation

According to configuration (*1)

SUB_OPER

CHAR  4  0

Suboperation

According to configuration (*1)

SUBSYSTEM_GROUPING

CHAR  3  0

Grouping of subsystem connection  Not used

MATERIAL

CHAR  18  0

Material

MATL_DESC

CHAR  40  0

Material description

Order
header,
OP, item number

final

item

number,

Order  header,
OP item description

final

item  description,

ROUT_QUAN_UNIT

UNIT  3  0

Quantity unit of the plan

Not used

ROUT_QUAN_UNIT_ISO

CHAR  3  0

ISO code of quantity unit

Not used

ORD_QUAN_UNIT

UNIT  3  0

Quantity unit for in-house production  Not used

ORD_QUAN_UNIT_ISO

CHAR  3  0

ISO code of quantity unit

Not used

BASE_QUAN_UNIT

UNIT  3  0

Base quantity unit

Base quantity unit;

Entered  in  the  order  header  for  the  first
operation  of  an  order.  The  operations
"inherit" this base quantity unit from the order
header.

Please note: This unit must be the same for
all operations of an order!

BASE_QUAN_UNIT_ISO

CHAR  3  0

ISO code of quantity unit

Not used

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 11 of 72

Field name

T

L  D  Description

Usage in HYDRA

  HYDRA Interfacing Module to SAP PP via PP-PDC

HDR_NOMINATOR

DEC

5  0

Numerator
base quantity unit

for

the  conversion

to

Numerator for the conversion from primary to
HYDRA base quantity unit

Please note: conversion factors from
into
ORD_QUAN_UNIT
If
BASE_QUAN_UNIT.
<>
OPER_QUAN_UNIT
wrong
ORD_QUAN_UNIT
calculations might be the result!!!

HDR_DENOMINATOR

DEC

5  0

Denominator  for  the  conversion  to
the base quantity unit

Denominator for the conversion from primary
to HYDRA base quantity unit

LEADING_ORDERID

CHAR  12  0

Order network: Leading order

Not used

SUPERIOR_ORDERID

CHAR  12  0

Order  network:  Directly  superior
order

Not used

SUPERIOR_SEQUENCE

CHAR  6  0

Order  no.:  Sequence  of  the  directly
superior order

Not used

SUPERIOR_OPERATION

CHAR  4  0

Order  network:  Operation  of
directly superior order

the

Not used

REFERENCE_SEQUENCE

CHAR  6  0

Parallel
sequence of a sequence

sequence:

Reference

Reference sequence

BRANCH_OPERATION

CHAR  4  0

Parallel sequence: Branch operation  Branch operation of the parallel sequence

RETURN_OPERATION

CHAR  4  0

Parallel sequence: Return operation  Return operation of the parallel sequence

OPER_DESCRIPTION

CHAR  40  0

Short text of operation

OP, operation designation

OPER_QUAN_UNIT

UNIT  3  0

Operation quantity unit

OP, quantity unit

OPER_QUAN_UNIT_ISO

CHAR  3  0

ISO code of quantity unit

Not used

OPER_QUANTITY

QUAN  13  3

Operation quantity

OP, target quantity (primary quantity)

PLANNED_SCRAP

QUAN  13  3

Scrap quantity of operation

OP, target scrap (primary quantity)

NOMINATOR

DEC

5  0

Numerator  for  the  conversion  from
operation in planned quantity unit

Not used

DENOMINATOR

DEC

5  0

Denominator for the conversion from
operation in planned quantity unit

Not used

UNDERDELIVERY_QUANTITY  QUAN  13  3

Quantity
tolerance in operation quantity unit

underdelivery

the

of

Conversion in percent:

(UNDERDELIVERY_QUANTITY  *  100)
OPER_QUANTITY

/

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 12 of 72

Field name

T

L  D  Description

Usage in HYDRA

  HYDRA Interfacing Module to SAP PP via PP-PDC

CHECK_UNDERDELIVERY

CHAR  1  0

Check of the underdelivery tolerance
in the order

" "

"X"

No check

Error

"W"

Warning

Note:  You  can  only  enter  deviation  reasons
for  overdeliveries/  underdeliveries  via  the
CTWIN  software.  If  you  use  DOS  terminals,
the  reaction  "W"  is  interpreted  as  an  error
("X").

OVERDELIVERY_QUANTITY  QUAN  13  3

of

overdelivery
the
Quantity
tolerance  in  the  operation  quantity
unit

Conversion in percent:

(OVERDELIVERY_QUANTITY
OPER_QUANTITY

*  100)

/

CHECK_OVERDELIVERY

CHAR  1  0

Check  of  the  overdelivery  tolerance
in the order

" "

"X"

No check

Error

"W"

Warning

MESSAGE_TYPE

CHAR  1  0

Message
operation sequence

type

for  checking

Note:  You  can  only  enter  deviation  reasons
for  overdeliveries/  underdeliveries  via  the
CTWIN  software.  If  you  use  DOS  terminals,
the  reaction  "W"  is  interpreted  as  an  error
("X").

the

Not used

USERFIELD_CH20_1

CHAR  20  0

User
(SAP USR00)

field

for  20

characters

Usage
see below  *2)

USERFIELD_CH20_2

CHAR  20  0

User
(SAP USR01)

field

for  20

characters

Usage
see below  *2)

in

in

HYDRA

HYDRA

USERFIELD_UNIT

UNIT  3  0

User field: Unit of quantity field

Not used

(SAP USE04)

USERFIELD_UNIT_ISO

CHAR  3  0

ISO code of quantity unit

Not used

USERFIELD_QUAN

QUAN  13  3

User  field  for  the  quantity  (length
10,3) (SAP USR04)

Usage in HYDRA see below

ACTIVITY_UNIT_1

UNIT  3  0

Activity 1: Quantity unit of the activity
to be uploaded.

Not used

ACTIVITY_UNIT_1_ISO

CHAR  3  0

Activity  1:  ISO  code  of  the  quantity
unit

Not used

ACTIVITY_QUANTITY_1

QUAN  13  3

Activity 1: Total activity quantity to be
uploaded

Not used

ACTIVITY_UNIT_2

UNIT  3  0

Activity 2: Quantity unit of the activity
to be uploaded.

Not used

ACTIVITY_UNIT_2_ISO

CHAR  3  0

Activity  2:  ISO  code  of  the  quantity
unit

Not used

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 13 of 72

Field name

T

L  D  Description

Usage in HYDRA

  HYDRA Interfacing Module to SAP PP via PP-PDC

ACTIVITY_QUANTITY_2

QUAN  13  3

Activity 2: Total activity quantity to be
uploaded

Not used

ACTIVITY_UNIT_3

UNIT  3  0

Activity 3: Quantity unit of the activity
to be uploaded.

Not used

ACTIVITY_UNIT_3_ISO

CHAR  3  0

Activity  3:  ISO  code  of  the  quantity
unit

Not used

ACTIVITY_QUANTITY_3

QUAN  13  3

Activity 3: Total activity quantity to be
uploaded

Not used

ACTIVITY_UNIT_4

UNIT  3  0

Activity 4: Quantity unit of the activity
to be uploaded.

Not used

ACTIVITY_UNIT_4_ISO

CHAR  3  0

Activity  4:  ISO  code  of  the  quantity
unit

Not used

ACTIVITY_QUANTITY_4

QUAN  13  3

Activity 4: Total activity quantity to be
uploaded

Not used

ACTIVITY_UNIT_5

UNIT  3  0

Activity 5: Quantity unit of the activity
to be uploaded.

Not used

ACTIVITY_UNIT_5_ISO

CHAR  3  0

Activity  5:  ISO  code  of  the  quantity
unit

Not used

ACTIVITY_QUANTITY_5

QUAN  13  3

Activity 5: Total activity quantity to be
uploaded

Not used

ACTIVITY_UNIT_6

UNIT  3  0

Activity 6: Quantity unit of the activity
to be uploaded.

Not used

ACTIVITY_UNIT_6_ISO

CHAR  3  0

Activity  6:  ISO  code  of  the  quantity
unit

Not used

ACTIVITY_QUANTITY_6

QUAN  13  3

Activity 6: Total activity quantity to be
uploaded

Not used

CO_BUSPROC_1

CHAR  12  0

Business process: Identification

Not used

BUSPROC_UNIT_1

UNIT  3  0

Business  proc.:  quantity  unit  of  the
quantity to be uploaded.

Not used

BUSPROC_UNIT_1_ISO

CHAR  3  0

Business  process:  ISO  code  of  the
quantity unit

Not used

BUSPROC_QUANTITY_1

QUAN  13  3

Business  process:  quantity  to  be
uploaded

Not used

WORK_CNTR

CHAR  8  0  Workplace

OP, machine

(see note)

PLANT

CHAR  4  0

Plant

Used in confirmations/uploads

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 14 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Field name

T

L  D  Description

Usage in HYDRA

EARL_SCHED_START_DATE  DATS  8  0

Earliest
Execution (date)

scheduled

start

time:

OP Earliest start date
OP Planned start (date)

EARL_SCHED_START_TIME

TIMS  6  0

Earliest
Execution (time)

scheduled

start

time:

OP
OP Planned start (time)

Earliest

start

time

LATE_SCHED_FIN_DATE

DATS  8  0

Latest
Execution (date)

scheduled

end

date:

OP Latest end date
OP Planned end (date)

LATE_SCHED_FIN_TIME

TIMS  6  0

Latest
Execution (time)

scheduled

end

time:

OP Latest end time
OP Planned end (time)

SETUP_TIME_UNIT

UNIT  3  0

Unit of setup time

HYDRA converts into internal format

SETUP_TIME_UNIT_ISO

CHAR  3  0

ISO code of quantity unit

Not used

SETUP_TIME

QUAN  7  1

Setup duration

OP Setup time (target BMK_7) *2)

PROCESS_TIME_UNIT

UNIT  3  0

Unit of processing time

HYDRA  converts  into  internal  format.  The
following units are supported:

STD / H / HUR / HR

PROCESS_TIME_UNIT_ISO

CHAR  3  0

ISO code of quantity unit

Not used

PROCESS_TIME

QUAN  7  1

Duration of processing

OP Processing time (target BMK_11) *2)

TEARDOWN_TIME_UNIT

UNIT  3  0

Unit of tear down time/retooling time  Not used

TEARDOWN_TIME_UNIT_ISO  CHAR  3  0

ISO code of quantity unit

Not used

TEARDOWN_TIME

QUAN  7  1

Teardown duration/retooling duration  OP, target teardown time/retooling time

STATUS

CHAR  5  0

Individual status of an object

Not used

INDICATOR_TT_OR_TE

CHAR  1  0

Time ticket or time event

Not used

INDICATOR_FIN_OR_PART

CHAR  1  0

Partial finish or end status

OPs  with  end  status  ("E")  will  not  be
transferred

CONFIRMED_YIELD

QUAN  13  3

Total  yield  uploaded/confirmed
operation quantity unit

in

Not used

CONFIRMED_SCRAP

QUAN  13  3

Total  scrap  uploaded/confirmed  in
operation quantity unit

Not used

CONFIRMED_REWORK

QUAN  13  3

Total  rework  uploaded/confirmed  in
operation quantity unit

Not used

CONFIRMED_ACTIVITY_1

QUAN  13  3

Activity  1:  Activity  quantity  already
uploaded

Not used

NO_REMN_ACTIVITY_1

CHAR  1  0

Activity  1:  Indicator:  No  remaining
activity expected

Not used

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 15 of 72

Field name

T

L  D  Description

Usage in HYDRA

  HYDRA Interfacing Module to SAP PP via PP-PDC

CONFIRMED_ACTIVITY_2

QUAN  13  3

Activity  2:  Activity  quantity  already
uploaded

Not used

NO_REMN_ACTIVITY_2

CHAR  1  0

Activity  2:  Indicator:  No  remaining
activity expected

Not used

CONFIRMED_ACTIVITY_3

QUAN  13  3

Activity  3:  Activity  quantity  already
uploaded

Not used

NO_REMN_ACTIVITY_3

CHAR  1  0

Activity  3:  Indicator:  No  remaining
activity expected

Not used

CONFIRMED_ACTIVITY_4

QUAN  13  3

Activity  4:  Activity  quantity  already
uploaded

Not used

NO_REMN_ACTIVITY_4

CHAR  1  0

Activity  4:  Indicator:  No  remaining
activity expected

Not used

CONFIRMED_ACTIVITY_5

QUAN  13  3

Activity  5:  Activity  quantity  already
uploaded

Not used

NO_REMN_ACTIVITY_5

CHAR  1  0

Activity  5:  Indicator:  No  remaining
activity expected

Not used

CONFIRMED_ACTIVITY_6

QUAN  13  3

Activity  6:  Activity  quantity  already
uploaded

Not used

NO_REMN_ACTIVITY_6

CHAR  1  0

Activity  6:  Indicator:  No  remaining
activity expected

Not used

CONFIRMED_BUS_PROC_1  QUAN  13  3

Quantity  uploaded  for  the  business
process

Not used

NO_REMN_BUS_PROC_1

CHAR  1  0

remaining  quantity

No
business process expected

for

the

Not used

CONFIRMED_WORK_CNTR

CHAR  8  0

Actual workplace

CONFIRMED_PLANT

CHAR  4  0

Actual plant

AK.xxx  Field xxx in HYDRA order header

AG.xxx Field xxx in HYDRA operation

Structure E2BP_PP_PDC_OPERA1

Not used

Not used

The  structure  described  in  the  following,  controls  the  deletion  process  for  already  transferred

production orders and/or their operations in the subsystem.

Field name

T

L  Description

Usage in HYDRA

SOURCE_SYS

CHAR

10

Logical system

Not used

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 16 of 72

Field name

T

L  Description

Usage in HYDRA

  HYDRA Interfacing Module to SAP PP via PP-PDC

CONF_NO

NUMC

10  Confirmation/upload  number  of  the

Confirmation/upload number

operation

ORDERID

CHAR

12  Order

According to configuration (*1)

SEQUENCE

CHAR

6

Sequence

According to configuration (*1)

OPERATION

CHAR

4

Operation

According to configuration (*1)

SUB_OPER

CHAR

4

Suboperation

According to configuration (*1)

SUBSYSTEM_GROUPING

CHAR

3

Grouping of subsystem connection

Can be restricted to a subsystem group.

Notes on the operation structure

HYDRA order number (*1)

The  HYDRA  order  number  consists  of  a  configurable  part  of  the  SAP  key  fields  ORDERID,

SEQUENCE,  OPERATION,  SUB_OPER.  The  total  length  must  not  exceed  25  digits.  If  DOS

terminals

are

used,

the

total

length  must

not

exceed

16

digits.

When  the  CHAR  fields  are  transferred,  the  system  converts  blank  characters  to  "0",  since  the

barcode is also assigned "0" instead of blank characters.

Overview - usage of user fields

By  default,

the  user-specific

fields  USERFIELD_CH20_1,  USERFIELD_CH20_2  and

USERFIELD_QUAN are processed in HYDRA as follows:

User field 01 (USERFIELD_CH20_1):

Places 1…10:

--> BDE cycle time in seconds per 1000 machine strokes in the format NUMC 10

Places 11…20:

--> not used in HYDRA

User field 02 (USERFIELD_CH20_2):

Places 1…10:

--> Premium default target te in seconds per 1000 pieces in the format NUMC 10

Places 11…20:

--> Premium default target tr in seconds in the format NUMC 10

User field 04 (USERFIELD_QUAN):

 HYDRA partitioning (parts per cycle)

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 17 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

HYDRA partitioning

If the user field USERFIELD_QUAN has a value this value will be entered as the partitioning in

the operation.

If this is not the case, the system implicitly assumes a partitioning of 1 and enters this value in

the operation.

BDE cycle time

The system attempts to read the cycle time from user field 01 - places 1...10. If this is possible,

the system enters this value as the target cycle time in the HYDRA operation.

If  the  system  cannot  identify  the  target  cycle  time  as  described  above,  then  the  system

calculates  it  from  the  specified  processing  time  (PROCESS_TIME)  and  the  partitioning

(TEILIGKEIT) values that might be specified.

Calculation basis (formulas):

Processing  time  OP  =  Target  quantity  OP  *  (target  cycle  time  machine/  partitioning)

-

-

Target

cycle

time  machine

(=  BDE

cycle

time/  machine

stroke)

Target

cycle

time/

unit

=

target

cycle

time  machine/

partitioning

=> Target cycle time machine= (processing time OP * Partitioning)/ target quantity OP

Standard times

In HYDRA the content  of the field  "processing time" (PROCESS_TIME) specifies the standard

time for machine assignment (target for RPA 11).

In HYDRA the content of the field "Setup time" (SETUP_TIME) specifies the standard time for

the machine setup (target for RPA 7).

Note on the workplace field WORK_CNTR:

As

of

version

6.5  HYDRA

supports

alphanumeric  machine/workplace

numbers.

In this case, you can only use the Windows terminals CT 76x and CT 8xx for data collection.

Notes on all other alphanumeric fields:

HYDRA does not support specific special characters for all alphanumeric fields. These characters are:

"%", "\", "/", "|" as you cannot enter these characters using shop floor terminals; the terminals and the

MOC do not support these characters. Do not use the characters ";", " “ ", and " ’ " since they are often

interpreted as comment characters or separators and will thus lead to unwanted effects.

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 18 of 72

5  Key Fields / Supported Characters

  HYDRA Interfacing Module to SAP PP via PP-PDC

General notes

In  all  alphanumeric  fields,  HYDRA  does  not  support  specific  special  characters.  The  following

characters  are  not  supported:  "%",  "ß","*",  "\",  "/",  "|",  "_",  "?".  Reason:  You  cannot  enter  these

characters on the shop floor terminals or the clients do not support these characters.

You  must  not  use  the  characters  " ; "  (semicolon),  " , "  (comma)  and  " ' "  (apostrophe)  because  they

are often interpreted as comment characters or separators and can lead to unwanted results.

Workplace/machine numbers (resources of type "MNR")

Workplace/machine  numbers  and  numbers  of  capacity/machine  groups  are

interpreted  as

alphanumeric values. Alphanumeric field with a maximum length of 8, left-aligned.

When  you  create  or  copy  a  workplace,  the  system  checks  if  the  characters  used  are  allowed.  The

following characters are allowed:

  Numbers "0" to "9" (US-ASCII 30hex - 39hex)





Letters "A" - "Z" (upper case letters - US-ASCII 41hex - 5Ahex)

"-" (US-ASCII 2Dhex)

Lower case letters are automatically converted to upper case letters when a new workplace is created.

You must not use blanks. If required, you must prefix the numbers by leading zeros ("0").

The entry "SYSTEM" as workplace/machine number is reserved for HYDRA and may not be used.

It  is  possible  to  overwrite  the  valid  characters  for  the  workplace/machine  numbers  in  the  INI

configuration. To this end, you must specify the valid characters as a regular expression (in brackets).

Field

Name

Section

Key

Value

Active

Value

INPUT

PATTERN

MNR

^(?!SYSTEM)([A-Z0-9(){}~^#+!$._%-]+)$



Minimum requirement: b_mnr.dll version 8.1.1.102

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 19 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Resource numbers (resources of type <> "MNR")

Resource numbers are interpreted as alphanumeric values. Alphanumeric field with a maximum length

of 20; left-aligned.

When  you  create  or  copy  a  resource,  the  system  checks  if  the  characters  used  are  allowed.  The

following characters are allowed:

  Numbers "0" to "9" (US-ASCII 30hex - 39hex)



Letters "A" - "Z" (upper case letters - US-ASCII 41hex - 5Ahex)

  Umlauts "Ä", "Ö", "Ü" (Extended ASCII C4hex, D6hex, DChex)



"-" (US-ASCII 2Dhex)

You  may  not  use  umlauts  or  special  characters  (e.g.  "%",  "ß","*",  "\",  "/",  "|",  "_",  "?")  because  you

cannot enter these characters on the shop floor terminals or because the clients do not support these

characters.

You must not use blanks. If required, you must prefix the numbers by leading zeros ("0").

Lower case letters are automatically converted to upper case letters when a new resource is created.

It is possible to overwrite the valid characters for the resource numbers in the INI configuration. To this

end, you must specify the valid characters as a regular expression (in brackets).

Field

Name

Section

Key

Value

Active

Value

INPUT

PATTERN

RES

^([0-9A-ZÄÖÜ(){}~^#+!$._%-]+)$



Minimum requirement: b_res.dll version 8.1.1.117

HYDRA order number

There  are  some  differences  with  respect  to  the  order  number  in  the  HYDRA  data  model  and  the

interface.

Order number

The  order  number  (field  AUNR)  contains  the  actual  order  number  as  it  is  known  in  the  ERP

system and transferred to HYDRA. The order number is specified in the HYDRA basic settings;

by default, this number has a length of 8 characters.

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 20 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Operation number

The  operation  number  (field  AGNR)  clearly  identifies  a  defined  process  step  of  an  order.  The

operation number is specified in the HYDRA basic settings; by default, this number has a length

of 4 characters.

MES order number

The  MES  order  number  (field  ANR)  combines  the  order  and  the  operation  number  and

sometimes  also  the  sequence  number  from  the  ERP  system  (if  licensed).  Its  length  therefore

results from the total of the separate number lengths.

The total length must not exceed 25 digits. If DOS terminals are used, the total length must not

exceed 16 digits.

Note the following for the order or operation number:

  Preferably only use the numbers "0" to "9" (US-ASCII 30hex - 39hex).



If  you  use  letters,  only  the  characters  "A"  -  "Z"  (upper  case  -  US-ASCII  41hex  -  5Ahex)  and  "-"

(US-ASCII 2Dhex) are allowed. Do not use lower case letters.

  You  may  not  use  blanks  in  the  numbers.  The  order  or  operation  numbers  must  have  the

specified number of digits with the characters "0" to "9" or "A" to "Z". If required, you must prefix

the numbers by leading zeros ("0").

  HYDRA does not support any umlauts, blank or special characters (see section General notes)

for the order or operation number because you cannot enter these characters on the shop floor

terminals or because the clients do not support these characters.

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 21 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

6  Download of Master Data

Download of the work centers

SAP allows to download workcenters to run plausibility checks in the subsystem. These work centers

can be transferred to HYDRA.

When these work centers will be transferred, the system will check for the respective SAP work center

in  the  HYDRA  configuration  order  standard  whether  an  entry  is  stored  for  this  SAP  work  center  by

which  this  entry  will  be  transferred  as  HYDRA  workplace.  In  the  beginning,  the  workplace  will  be

created with the responsibility area “SAP” by the user “SAP”. Due to this it is necessary to create the

user “SAP” and to assign it then to the responsibility area “SAP”. During the adoption workplaces will

be inserted or updated. Deletions are not possible.

Since work centers are only unique within a plant in SAP; it must be configured in HYDRA for which

plant you wish to adopt the work centers. This configuration is made in the HYDRA Ini-configuration.

Name:  PP-PDC

Section:

PPCC2RECWORKCENTER

Key:

Plant, for which the work centers are to be adopted, e.g. 1000

Value:

<BLANK> (no value must be entered here)

Field name

T  L  D

Description

Usage in HYDRA

SOURCE_SYS

WORK_CNTR

PLANT

CHAR  10  0

Logical system

CHAR  8  0

Work center

CHAR  4  0

Plant

SUBSYSTEM_GROUPING

CHAR  3  0

BDE group

Not used

HYDRA machine/ workplace

Plant

Transfer to HYDRA

WORK_CNTR_DESCR

CHAR  40  0

Short text on the work center

Comment

VALID_START

DATS  8  0

Start of validity of the current cost center link

VALID_END

DATS  8  0

End of validity of the current cost center link

The  data  record  will  only  be
adopted when the current date is
within this interval.

The  data  record  will  only  be
adopted when the current date is
within this interval.

CO_AREA

CHAR  4  0

Controlling  area  of  the  current  cost  center
link

Not used

CHAR  10  0

Cost center of the current cost center link

Cost center

COST_CNTR

ACTI1_TEXT

ACTI1_UNIT

CHAR  20  0

Activity 1: Activity text

UNIT  3  0

Activity 1: Activity unit

ACTI1_UNIT_ISO

CHAR  3  0

Activity 1: ISO code of the quantity unit

NOACTI1

CHAR  1  0

Activity 1: Indicator: Do not show activity text  Not used

RECORD_GRP1

NUMC  1  0

Activity 1: Record type group

ACTI2_TEXT

CHAR  20  0

Activity 2: Activity text

Not used

Not used

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 22 of 72

Not used

Not used

Not used

  HYDRA Interfacing Module to SAP PP via PP-PDC

Field name

T  L  D

Description

ACTI2_UNIT

UNIT  3  0

Activity 2: Activity unit

Usage in HYDRA
Not used

ACTI2_UNIT_ISO

CHAR  3  0

Activity 2: ISO-code of the quantity unit

Not used

NOACTI2

CHAR  1  0

Activity 2: Indicator: Do not show activity text  Not used

RECORD_GRP2

NUMC  1  0

Activity 2: Record type group

ACTI3_TEXT

ACTI3_UNIT

CHAR  20  0

Activity 3: Alternative activity text

UNIT  3  0

Activity 3: Activity unit

ACTI3_UNIT_ISO

CHAR  3  0

Activity 3: ISO code of the quantity unit

Not used

Not used

Not used

Not used

NOACTI3

CHAR  1  0

Activity 3: Indicator: Do not show activity text  Not used

RECORD_GRP3

NUMC  1  0

Activity 3: Record type group

ACTI4_TEXT

ACTI4_UNIT

CHAR  20  0

Activity 4: Activity text

UNIT  3  0

Activity 4: Activity unit

ACTI4_UNIT_ISO

CHAR  3  0

Activity 4: ISO code of the quantity unit

Not used

Not used

Not used

Not used

NOACTI4

CHAR  1  0

Activity 4: Indicator: Do not show activity text  Not used

RECORD_GRP4

NUMC  1  0

Activity 4: Record type group

ACTI5_TEXT

ACTI5_UNIT

CHAR  20  0

Activity 5: Alternative activity text

UNIT  3  0

Activity 5: Activity unit

ACTI5_UNIT_ISO

CHAR  3  0

Activity 5: ISO code of the quantity unit

Not used

Not used

Not used

Not used

NOACTI5

CHAR  1  0

Activity 5: Indicator: Do not show activity text  Not used

RECORD_GRP5

NUMC  1  0

Activity 5: Record type group

ACTI6_TEXT

ACTI6_UNIT

CHAR  20  0

Activity 6: Activity text

UNIT  3  0

Activity 6: Activity unit

ACTI6_UNIT_ISO

CHAR  3  0

Activity 6: ISO code of the quantity unit

Not used

Not used

Not used

Not used

NOACTI6

RECORD_GRP6

CO_BUSPROC

CHAR  1  0

Activity 6: Indicator: Do not show activity text  Not used

NUMC  1  0

Activity 6: Record type group

CHAR  12  0

Business process

Not used

Not used

CO_BUSPROC_NAME

CHAR  20  0

General designation of the business process  Not used

COST_DRIVER

UNIT  3  0

COST_DRIVER_ISO

CHAR  3  0

Activity  unit  CO-ABC  on
process

the  business

Not used

Activity  unit  CO-ABC  according  to  ISO  on
the business process

Not used

Download of the deviation reasons

SAP allows to download deviation reasons to run plausibility checks in the subsystem. These deviation

reasons can be transferred to HYDRA.

When the deviation reasons are transferred, the system will first create a reason text with the number

transferred from SAP. Then a reason together with the number transferred from SAP and referring to

the created reason text will be created.

In the beginning, the reason texts and reasons are created by the "SAP" user. This user must exist in

the  system  as  HYDRA  user.  During  the  transfer  reasons/  reason  texts  will  be  inserted  or  updated.

Deletions are not possible.

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 23 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Since  deviation  reasons  are  only  unique  within  a  plant  in  SAP,  it  must  be  configured  in  HYDRA  for

which plant  you wish to transfer the deviation reasons. This configuration is made in the HYDRA Ini-

configuration.

Name:  PP-PDC

Section:

DIFFE2

Key:  Plant, for which the reasons are to be transferred, e.g. 1000

Value:

Reason type

A

N

P

G

L

Scrap

Rework

Problem quantity

Yield

Batch logs

Field name

WERKS

REASON

GRDTX

SOURCE_SYS

Type  L
CHAR

4

Plant

CHAR

4

Variation cause

Meaning

Usage in HYDRA

Plant

ID Reason Text
ID Reason

CHAR

25

Text stating the reasons of the deviation

Scrap reason

CHAR

10

Logical system

Not used

Download of generally applicable units

SAP allows to download generally applicable units to run plausibility  checks in the subsystem. These

generally applicable units can be transferred to HYDRA.

In  the  beginning,  the  units  are  created  by  the  "SAP"  user.  This  user  must  exist  in  the  system  as

HYDRA user. During the transfer the units will be inserted or updated. Deletions are not possible.

During  the  transfer  the  SI-units  will  not  be  identified  and  the  ISO  code  for  the  units  cannot  be

transferred.

Field name

MSEHI

MSEHE

NENNR

ZAEHL

MSSIE

MSEHL

Meaning

Usage in HYDRA

L  D

Typ
e
CHAR  3

Quantity unit (internal key)

CHAR  3

Quantity unit (external key)

Not used

Unit

CHAR  10

Denominator for the conversion into SI-unit

Not used

CHAR  10

Numerator for the conversion into SI-unit

Not used

CHAR  3

SI-unit (internal key)

Not used

CHAR  25

Text on the quantity unit

Text on the quantity unit

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 24 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Meaning

Usage in HYDRA

Number of decimal places

Not used

Not used

Field name

ANDEC

L  D

Typ
e
CHAR  3

SOURCE_SYS

CHAR  10

Logical system

Download of material-dependent units

SAP allows to download material-dependent units to run plausibility checks in the subsystem. These

units can be transferred to HYDRA.

In  the  beginning,  the  units  are  created  by  the  "SAP"  user.  This  user  must  exist  in  the  system  as

HYDRA user. During the transfer the units will be inserted or updated. Deletions are not possible.

MATNR

MEINH

MEINS

UMREZ

UMREN

Field name

Type  L D
CHAR

18    Material

Meaning

Usage in HYDRA

CHAR

3

CHAR

3

CHAR

7

CHAR

7

Material

Unit of

Alternative  quantity  unit  of  the  material
(internal key)

Base  quantity  unit  of  the material  (internal
key)

Unit by

for
Numerator
alternatives in stock keeping unit

the

conversion

of

Numerator

Denominator
for
alternatives in stock keeping unit

the

conversion  of

Denominator

SOURCE_SYS

CHAR

10

Logical system

Not used

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 25 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 26 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

7  Upload of SAP time tickets

Overview

Record types and activities supported by HYDRA

HYDRA-BDE uploads the following record types in relation to time tickets to SAP R/3 PP.

Record

Meaning in SAP

Triggering HYDRA action

type

L20

Partial  completion  of

time

Orders are interrupted automatically or manually via the

ticket

shop floor client or office client.

L40

End of time ticket

Completion of an order via the shop floor client or office

client.

If  HYDRA  MPL  is  active,  an  L20  partial  completion  is  generated  and  transferred  to  SAP  for

every  generated  output  batch  (output  batch  changed)  in  addition  to  the  SAP  time  tickets  for

interrupting or logging off the OP.

Confirmation/upload structure (E2BP_PP_TIMETICKET)

Field name

T

L  D  Meaning

Usage in HYDRA

From

To2

CONF_NO

NUMC  10  0  Confirmation/upload number of
the operation

Confirmation/upload number as
specified

ORDERID

CHAR  12  0  Order

SEQUENCE

CHAR  6  0  Sequence

SAP order according to
specifications

SAP sequence according to
specifications

1

1

10

11

22

23

28

1 The indicated number of characters is calculated based on the export length of the GI transaction 31 in SAP and

can be used as reference for HYDRA developers.

2 See footnote of column "From“

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 27 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Field name

T

L  D  Meaning

Usage in HYDRA

From

To2

1

29

32

33

36

37

39

40

42

43

43

44

44

45

52

OPERATION

CHAR  4  0  Operation

SUB_OPER

CHAR  4  0  Suboperation

CAPA_CATEGORY

CHAR  3  0  Capacity category

SAP operation according to
specifications

SAP suboperation according to
specifications

SAP capacity category according to
specifications

SPLIT

INT1

3  0  Split number

000, as no specification possible

FIN_CONF

CHAR  1  0  Partial/final confirmation/upload
(not interpreted)

Not used

CLEAR_RES

CHAR  1  0  Clearing open reservations

POSTG_DATE

DATS  8  0  Posting date

DEV_REASON

CHAR  4  0  Reason for the deviation

Use the parameter /CLEAR_RES to
assign an "X" to this field for an L40
posting.

Shift date of the HYDRA posting
record

This field includes the scrap reason if
the options "report part quantities" or
"upload of scrap including reason"
are enabled for the order type .

53

56

CONF_TEXT

CHAR  40  0  Confirmation/upload text

Not used
Exception: batch numbers are
entered here if H records are
uploaded/confirmed

PLANT

CHAR  4  0  Plant

Specified plant

WORK_CNTR

CHAR  8  0  Workplace

According to configuration - see
below

RECORDTYPE

CHAR  3  0  Record type of the

L20 or L40

upload/confirmation

CONF_QUAN_UNIT

UNIT  3  0  Quantity unit of

confirmation/upload

OP target quantity unit (primary
quantity unit)

CONF_QUAN_UNIT_ISO  CHAR  3  0

ISO code of quantity unit of
confirmation/upload

Not used

YIELD

QUAN  13  3  Yield

Yield in primary quantity unit

SCRAP

QUAN  13  3  Scrap quantity

Scrap in primary quantity unit

REWORK

QUAN  13  3  Rework quantity

Rework quantity in primary quantity
unit

57

96

97

100

101

108

109

111

112

114

115

117

118

132

133

147

148

162

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 28 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Field name

T

L  D  Meaning

Usage in HYDRA

From

To2

1

CONF_ACTI_UNIT1

UNIT  3  0  Activity 1: quantity unit of activity

According to configuration

quantity

CONF_ACTI_UNIT1_ISO  CHAR  3  0  Activity 1: ISO code of the

Not used

quantity unit

CONF_ACTIVITY1

QUAN  13  3  Activity 1: activity quantity

According to configuration

NO_REMN_ACTI1

CHAR  1  0  Activity 1: No remaining activity

Not used

expected

CONF_ACTI_UNIT2

UNIT  3  0  Activity 2: quantity unit of activity

According to configuration

quantity

CONF_ACTI_UNIT2_ISO  CHAR  3  0  Activity 2: ISO code of the

Not used

quantity unit

CONF_ACTIVITY2

QUAN  13  3  Activity 2: activity quantity

According to configuration

NO_REMN_ACTI2

CHAR  1  0  Activity 2: No remaining activity

Not used

expected

CONF_ACTI_UNIT3

UNIT  3  0  Activity 3: quantity unit of activity

According to configuration

quantity

CONF_ACTI_UNIT3_ISO  CHAR  3  0  Activity 3: ISO code of the

Not used

quantity unit

CONF_ACTIVITY3

QUAN  13  3  Activity 3: activity quantity

According to configuration

NO_REMN_ACTI3

CHAR  1  0  Activity 3: No remaining activity

Not used

expected

CONF_ACTI_UNIT4

UNIT  3  0  Activity 4: quantity unit of activity

According to configuration

quantity

CONF_ACTI_UNIT4_ISO  CHAR  3  0  Activity 4: ISO code of the

Not used

quantity unit

CONF_ACTIVITY4

QUAN  13  3  Activity 4: activity quantity

According to configuration

NO_REMN_ACTI4

CHAR  1  0  Activity 4: No remaining activity

Not used

expected

CONF_ACTI_UNIT5

UNIT  3  0  Activity 5: quantity unit of activity

According to configuration

quantity

CONF_ACTI_UNIT5_ISO  CHAR  3  0  Activity 5: ISO code of the

Not used

quantity unit

163

165

166

168

169

183

184

184

185

187

188

190

191

205

206

206

207

209

210

212

213

227

228

228

229

231

232

234

235

249

250

250

251

253

254

256

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 29 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Field name

T

L  D  Meaning

Usage in HYDRA

From

To2

1

CONF_ACTIVITY5

QUAN  13  3  Activity 5: activity quantity

According to configuration

NO_REMN_ACTI5

CHAR  1  0  Activity 5: No remaining activity

Not used

expected

CONF_ACTI_UNIT6

UNIT  3  0  Activity 6: quantity unit of activity

According to configuration

quantity

CONF_ACTI_UNIT6_ISO  CHAR  3  0  Activity 6: ISO code of the

Not used

quantity unit

CONF_ACTIVITY6

QUAN  13  3  Activity 6: activity quantity

According to configuration

NO_REMN_ACTI6

CHAR  1  0  Activity 6: No remaining activity

Not used

expected

CONF_BUS_PROC_UNIT
1

UNIT  3  0  Business process: quantity unit

Not used

of business process quantity

CONF_BUS_PROC_UNIT
1_ISO

CHAR  3  0  Business process: ISO code of
the quantity unit

Not used

CONF_BUS_PROC1

QUAN  13  3  Business process: business

Not used

process quantity

NO_REMN_BUS_PROC1  CHAR  1  0  Business process: no remaining

Not used

quantity expected

EXEC_START_DATE

DATS  8  0  Date when "starting execution"  Start time of the confirmed/uploaded

posting record

EXEC_START_TIME

TIMS  6  0  Time when "starting execution"  Start time of the confirmed/uploaded

posting record

SETUP_FIN_DATE

DATS  8  0  Date when "finishing setup"

Not used

SETUP_FIN_TIME

TIMS  6  0  Time when "finishing setup"

Not used

PROC_START_DATE

DATS  8  0  Date when "starting processing"  Not used

PROC_START_TIME

TIMS  6  0  Time when "starting processing"  Not used

PROC_FIN_DATE

DATS  8  0  Date when "finishing processing"  Not used

PROC_FIN_TIME

TIMS  6  0  Time when "finishing processing"  Not used

257

271

272

272

273

275

276

278

279

293

294

294

295

297

298

300

301

315

316

316

317

324

325

330

331

338

339

344

345

352

353

358

359

366

367

372

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 30 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Field name

T

L  D  Meaning

Usage in HYDRA

From

To2

1

TEARDOWN_START_DA
TE

DATS  8  0  Date when "starting
retooling/teardown"

TEARDOWN_START_TIM
E

TIMS  6  0  Time when "starting
retooling/teardown"

Not used

Not used

EXEC_FIN_DATE

DATS  8  0  Date when "finishing execution"  End time of the confirmed/uploaded

posting record

EXEC_FIN_TIME

TIMS  6  0  Time when "finishing execution"  End time of the confirmed/uploaded

posting record

FCST_FIN_DATE

DATS  8  0  Date of the forecast "end of
execution"

Not used

FCST_FIN_TIME

TIMS  6  0  Time of the forecast "end of
execution"

Not used

STD_UNIT1

UNIT  3  0  Default value 1: quantity unit

Not used

STD_UNIT1_ISO

CHAR  3  0  Default value 1: ISO code of
quantity unit

Not used

FORCAST_STD_VAL1

QUAN  9  3  Default value 1: forecast default

Not used

value

STD_UNIT2

UNIT  3  0  Default value 2: quantity unit

Not used

STD_UNIT2_ISO

CHAR  3  0  Default value 2: ISO code of
quantity unit

Not used

FORCAST_STD_VAL2

QUAN  9  3  Default value 2: forecast default

Not used

value

STD_UNIT3

UNIT  3  0  Default value 3: quantity unit

Not used

STD_UNIT3_ISO

CHAR  3  0  Default value 3: ISO code of
quantity unit

Not used

FORCAST_STD_VAL3

QUAN  9  3  Default value 3: forecast default

Not used

value

STD_UNIT4

UNIT  3  0  Default value 4: quantity unit

Not used

STD_UNIT4_ISO

CHAR  3  0  Default value 4: ISO code of
quantity unit

Not used

FORCAST_STD_VAL4

QUAN  9  3  Default value 4: forecast default

Not used

value

373

380

381

386

387

394

395

400

401

408

409

414

415

417

418

420

421

431

432

434

435

437

438

448

449

451

452

454

455

465

466

468

469

471

472

482

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 31 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Field name

T

L  D  Meaning

Usage in HYDRA

From

To2

1

STD_UNIT5

UNIT  3  0  Default value 5: quantity unit

Not used

STD_UNIT5_ISO

CHAR  3  0  Default value 5: ISO code of
quantity unit

Not used

FORCAST_STD_VAL5

QUAN  9  3  Default value 5: forecast default

Not used

value

STD_UNIT6

UNIT  3  0  Default value 6: quantity unit

Not used

STD_UNIT6_ISO

CHAR  3  0  Default value 6: ISO code of
quantity unit

Not used

FORCAST_STD_VAL6

QUAN  9  3  Default value 6: forecast default

Not used

value

FORCAST_BUS_PROC_
UNIT1

UNIT  3  0  Business process: quantity unit

Not used

of forecast Remaining quantity

FORC_BUS_PROC_UNIT
1_ISO

CHAR  3  0  Business process: ISO code of
the quantity unit

Not used

FORCAST_BUS_PROC_
VAL1

QUAN  13  3  Business process: forecast

Not used

remaining quantity

PERS_NO

NUMC  8  0  Personnel number

Not used

TIMEID_NO

NUMC  8  0  Time recording ID card number  According to configuration

WAGETYPE

CHAR  4  0  Wage type

Not used

SUITABILITY

CHAR  2  0  Suitability

Not used!

NO_OF_EMPLOYEE

DEC

5  2  Number of employees

Not used

WAGEGROUP

CHAR  3  0  Wage group

Not used

BREAK_UNIT

UNIT  3  0  Unit of break time

Not used

BREAK_UNIT_ISO

CHAR  3  0

ISO code of quantity unit

Not used

BREAK_TIME

QUAN  9  3  Uploaded/confirmed break time  Not used

483

485

486

488

489

499

500

502

503

505

506

516

517

519

520

522

523

537

538

545

546

553

554

557

558

559

560

566

567

569

570

572

573

575

576

586

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 32 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Field name

T

L  D  Meaning

Usage in HYDRA

From

To2

EX_CREATED_BY

CHAR  12  0  External person creating the

Not used

confirmation/upload

EX_CREATED_DATE

DATS  8  0  External date of entering the

Not used

confirmation/upload

EX_CREATED_TIME

TIMS  6  0  External time of entering the

Not used

confirmation/upload

TARGET_ACTI1

CHAR  1  0

Indicator: identify target activity 1  Is assigned to "X" when calculating

activities in SAP

TARGET_ACTI2

CHAR  1  0

Indicator: identify target activity 2  Is assigned to "X" when calculating

activities in SAP

TARGET_ACTI3

CHAR  1  0

Indicator: identify target activity 3  Is assigned to "X" when calculating

activities in SAP

TARGET_ACTI4

CHAR  1  0

Indicator: identify target activity 4  Is assigned to "X" when calculating

activities in SAP

TARGET_ACTI5

CHAR  1  0

Indicator: identify target activity 5  Is assigned to "X" when calculating

activities in SAP

TARGET_ACTI6

CHAR  1  0

Indicator: identify target activity 6  Is assigned to "X" when calculating

activities in SAP

TARGET_BUS_PROC1

CHAR  1  0

Indicator: identify target quantity
of business process

Not used

EX_IDENT

CHAR  32  0  External key of the

upload/confirmation (GUID)

Distinct key identifying the
upload/confirmation

Reference from HYDRA table
ADE_PROTOKOLL

See the notes at the end of the table.

LOGDATE

DATS  8  0  Logical date

Date of the upload/confirmation

LOGTIME

TIMS  6  0  Logical time

Time of the upload/confirmation

1

587

598

599

606

607

612

613

613

614

614

615

615

616

616

617

617

618

618

619

619

620

651

652

659

660

665

Remarks on selected fields

EX_IDENT

The field EX_IDENT is assigned the value from the verweis column of the ade_protokoll table. The

field displays a continuous database serial and thus guarantees uniqueness within a DB instance.

The field is populated with the value of the verweis column and leading zeros (left-aligned) to reach

full length. Example: the verweis 4711 leads to "0000000000000000000000000004711“.

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 33 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

You  can  use  the  program  parameter  of  the  upload  program  myerprck.exe/out  to  assign  a  prefix.

The prefix allows you to use multiple HYDRA systems with one SAP instance. To do so,  you can

use the program parameter "IDENT_PRAEFIX".

You  cannot  upload  part  quantities  (L20/L40)  and  record  data  at  the  same  time  via  the  total

quantity counter at MDE machines, as SAP cannot process negative quantities by default. This

type of collection can result in negative quantity postings for yield when OPs are finished.

This restriction does no longer apply, if it is possible to process such negative postings (e.g. by

using the SAP standard BAPI or customizations).

The

sign

is

located

at

the

end

of

fields

of

the

type

"QUAN".

Example: 0000012345.432+

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 34 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

8  SAP Order Sequencing

Summary

Menu

System administration  MES Link Enabling  SAP Order Sequencing

Transaction code

mleoss

Function authorization  mleoss.*

Utilization

The SAP order sequencing function allows for the transfer of the work centers specified by SAP into the

system to be controlled specifically. The below-mentioned options may be defined:

  The work center transferred from SAP is to be interpreted as HYDRA group and the operation is

planned in the pool of groups.

  The HYDRA group is to be selected for the work center transferred from SAP and the operation is

to be planned for the group.

  The HYDRA group is to be selected for the work center transferred from SAP and the operation is

directly to be planned for the workplace.

This decision is made on workplace level or it affects the entire system.

Integration

This configuration is taken into account by different interfaces for transferring order data from SAP.

Prerequisite

HYDRA Workplaces and HYDRA groups have to be created in the system.

Field Descriptions

Key

Defines  whether  the  entry  is  to  apply  in  relation  to  a  specific  order  type  or  a  specific  SAP  work

center.

In general, the configuration is created with respect to a SAP work center.

Value

Provided that an order type has been entered as key, the order type for which the configuration is

to apply has to be entered here.

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 35 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Provided that a machine has been selected as key:



Indicate a discrete workplace as value if the configuration is to apply for a specific workplace.

  Enter “SYSTEM” as value if the configuration is to apply for the entire system.

Configurations in relation to a discrete machine take priority over configurations relating to the

“system” value.

A  system  entry  can  be  made  for  the  majority  of  machines/workplaces/work  centers  and

exceptions may be configured specifically.

Detailed Scheduling

  G

Adoption of SAP work center as HYDRA group, planning for the group

  M

Adoption  of  SAP  work  center  as  HYDRA  workplace,  selection  of  the  HYDRA  group,

planning for the group.

  N

Adoption  of  SAP  work  center  as  HYDRA  workplace,  selection  of  the  HYDRA  group,

planning for the workplace.

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 36 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

9  SAP Uploads

Summary

Menu

System Administration  MES Link Enabling (MLE)  Uploads SAP

Transaction code

mlecos

Function authorization  mlecos.*

Utilization

This function helps you configure the transfer of resource performance accounts to the SAP activity types.

This configuration may be performed on the level of an individual workplace as well as on the level of a

system-wide entry.

Integration

This setting is used when time tickets are uploaded to SAP PP using the PP-PDC interface.

Prerequisite

Workplaces and groups have been created in the system.

Field Descriptions

Workplace

If  a machine  is  entered  the  configuration  applies  for  this  machine  (HYDRA  workplace).  The  entry

assigned to the value “SYSTEM” describes basic parameter settings and is used for all machines

that do not have an explicit entry.

Activity 1 – activity 6

These fields define which combination of time accounts kept in HYDRA is uploaded.

Possible values are:

BMK1 – BMK12

resource  performance  accounts  of  the  machine  from  U/E  record

PBMK1 – PBMK12

resource performance account of people from U/E record

P_DAUER

Labor utilization

To post the sum of several time accounts in one activity field, they are listed, separated by a

“+“ character.

Example: RPA1+ RPA 2+ RPA 3+ RPA 4+ RPA 5+ RPA 6+ RPA 7+ RPA 8+ RPA 9+ RPA 10+ RPA 11

Instead of time accounts, quantity accounts can also be uploaded. Possible values are:

GUT

(yield),

AUS

(scrap).

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 37 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

To post the sum of several quantity accounts in one activity field, they are listed, separated by a

“+“ character.

Example: GUT+AUS

Unit 1 – Unit 6

The corresponding upload unit is entered in these fields. Valid values:

Hours

Minutes

Seconds

H, HUR, HR, STD

MIN

SEC

One tenth of an hour (6 min)

ZE

Target activity 1 – Target activity 6

Checking this option activates the computation of activities on the basis of quantities in SAP for

each activity type. If the button is set activities are no longer transferred to SAP. This is undone by

unchecking this option. This configuration may apply for the entire system or only for a specific

machine. By configuring the fields the fields TARGET_ACTI1 – TARGET_ACTI6 are assigned to

“X” in the upload structure “TIMETICKET”.

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 38 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

10  MYERPRCK - Program Parameters

Purpose

Use  the  upload  program  myerprck.exe/out  to  create  confirmations/uploads  to  higher-level  systems.  In

addition  to  the  settings  you  make  directly  in  the  applications,  you  can  also  use  program  parameters  to

control confirmations/uploads.

Integration

The confirmation/upload is integrated with numerous components, for example:

  Shop floor data collection

  Tracking and tracing as well as material and production logistics

  Detailed scheduling

Available program parameters:

Parameters

Meaning/use

Program parameters to control processing:

Relevant

Productive

interfaces

release

/MESTYP=XXXX

The  parameter  MESTYP  defines

the

All

Yes

structure to be generated.

/GRP=XXXX

The  grouping  type  specifies  the  criterion

Requires

Requires

by  which  uploads  should  be  grouped.

customizations

customizations

Possible values:

PLANT --> Groups by plant

/V=sssss

Since  SAP  R/3  PP  does  not  support

EIS-ERP

Yes

correction  postings,  HYDRA  allows  to

retain

confirmations/uploads

for

correction  purposes  in  HYDRA  for  a

specific period of time.

Use  the  parameter  /V=sssss    (sssss  =

EIS-XPPS

SAP-PPPDC

SAP-PPREM

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 39 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Parameters

Meaning/use

Relevant

Productive

interfaces

release

delay  time  in  seconds)  to  activate  the

SAP-PPPI

above  described  delay  when  the  upload

program is called.

Examples:

myerprck.exe/out /V=3600

The  system  only  uploads  postings

that are older than one hour.

SAP-PMCC3

SAP-PSCC4

SAP-COILV

/BIS=DDMMYYHHMM

Use

the

parameter

/BIS=

EIS-ERP

Yes

/BIS=HHMM

/TILLDATE=MM/DD/YYYY

DDMMYYHHMM  (date  +

time)  when

calling  the  upload  program  to  enter  the

delay  as  a  point  in  time.  You  can  enter

this  point  in  time  with  date  and  time  or

EIS-XPPS

SAP-PPPDC

/TILLTIME=sec

after

you  can  just  enter  the  time  in  the  format

SAP-PPREM

midnight

"HHMM".  In  the  latter  case,  the  time

refers to the current day.

Myerprck.exe

/BIS=2505110600

SAP-PPPI

SAP-PMCC3

SAP-PSCC4

This  parameter  uploads  postings

that were recorded until 06:00 a.m.

SAP-COILV

on 25 May 2011.

Myerprck.exe

/BIS=0600

This  parameter  uploads  postings

that were recorded until 06:00 a.m.

of the current day.

/TZ=+/-sssss

Use the parameter /TZ=+/-sssss to adapt

SAP-PPPDC

Yes

uploads  to  different  time  zones.  The

parameter adjusts the time specifications

entered

in

the

fields

EXEC__START_TIME,

EXEC_FIN_TIME  and  LOGTIME  of  the

upload  structure  of

the  SAP-PPPDC

interface according to its specifications.

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 40 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Parameters

Meaning/use

Relevant

Productive

interfaces

release

/KST=XXX

Use this parameter to restrict the data to

EIS-ERP

Yes

be  uploaded.  In  this  case,  the  system

only  uploads  data  of  a  specified  cost

center.

Use  the  parameter  /KST=XXX  (XXX  =

cost center, a max. of 8 characters) when

ESI-XPPS

SAP-PPPDC

SAP-PPREM

calling

the

upload

program

SAP-PPPI

myerprck.exe/out  to  enable  the  above-

described  restriction.  Then  the  system

SAP-PMCC3

only  uploads  data  records  that  were

SAP-PSCC4

posted  to  machines  of  the  specified  cost

center.  The  system  checks  the  cost

SAP-COILV

center  of  the  machine/workplace  that  is

entered

as

the

posting

workplace/machine in the posting record.

The  system  only  checks  the  cost  center

of the workplace/machine.

You  can  specify  the  parameter  several

times per call.

Example:

Myerprck.exe  /KST=BDE100

/KST=BDE200

The  system  only  uploads  records

that were posted onto machines of

the cost center BDE100/BDE200.

/CLEAR_RES

Use  the  parameter  "/CLEAR_RES“  to

SAP-PPPDC

Yes

assign an "X" to the field CLEAR_RES of

the  upload  structure  when  it  comes  to  a

final  confirmation/upload  (record

type

L40).  Consequently,  SAP  will  clear  open

reservations for the respective order.

/NEG_MENGE

By  default,  quantities  (L20/L40)  cannot  SAP-PPPDC

Yes

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 41 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Parameters

Meaning/use

Relevant

Productive

interfaces

release

be  uploaded  to  SAP  PP  using  partial

confirmations/uploads  via

the  SAP-

PPPDC  interface  if  data  is  collected  at

the  same  time  via  the  total  quantity

counter  of  MDE  machines,  since  SAP  is

not  able  to  process  negative  quantities.

This  type  of  collection  can  result  in

negative quantity postings for yield when

OPs are finished.

This restriction does no longer apply, if it

is  possible  to  process  such  negative

postings (e.g. by using the SAP standard

BAPI  or  customizations).  In  this  case,

you  can  use  the  program  parameter

/NEG_MENGE  to  enable  the  upload  of

these quantities.

/LA_MNR

The  SAP_PMCC3  interface  requires  the

SAP-PMCC3

Yes

activity type to be uploaded to SAP PM.

The activity type can be identified via the

machine/workplace  where

the  posting

was  performed.  Use

this  program

parameter  to  enable  identification  of  the

activity type.

Then  the  system  uses  the  machine  to

identify  the  activity  type  from  the  activity

types kept in HYDRA.

/IDENT_PRAEFIX=

In  the  upload  structure  of  the  SAP-

SAP-PPPDC

Yes

PPPDC  interface,  the  field  EX_IDENT

uniquely

identifies

uploads

from

subsystems. HYDRA populates the field.

SAP-PPPDCC

You  can  add  a  prefix  to  the  EX_IDENT

field  to  differentiate  between  uploads

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 42 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Parameters

Meaning/use

Relevant

Productive

interfaces

release

from

various  HYDRA

subsystems

connected to one SAP instance.

Example:

Myerprck.exe

/IDENT_PRAEFIX=ABC

The  prefix  may  only

include

hexadecimal characters: A –H und

0 – 9.

/ABZEICH=XX

While  customizing  the  order  type,  you

EIS-ERP

Yes

can specify that only signed data records

are uploaded.

Use  the  parameter  /ABZEICH=XX  to

specify a period of time in days after that

you  can  upload  even  unsigned  data

records.

EIS-XPPS

SAP-PPPDC

SAP-PPREM

SAP-PPPI

SAP-PMCC3

SAP-PSCC4

SAP-COILV

/TRANSFER=

Use  the  parameter  "/TRANSFER="  to

EIS-ERP

Yes

only upload records whose specifications

were transferred from a specific system.

The

transfer

indicator

is  set  during

HYDRA  inbound  processing  and  may

vary from interface to interface.

ESI-XPPS

SAP-PPPDC

SAP-PPREM

SAP-PPPI

SAP-PMCC3

SAP-PSCC4

SAP-COILV

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 43 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Parameters

Meaning/use

Relevant

Productive

interfaces

release

/NOTRANSFER=XXX

Use the parameter "/NOTRANSFER=" to

EIS-ERP

Yes

only upload records whose specifications

were  NOT  transferred  from  a  specific

system.

The

transfer

indicator

is  set  during

HYDRA  inbound  processing  and  may

ESI-XPPS

SAP-PPPDC

SAP-PPREM

vary from interface to interface.

SAP-PPPI

SAP-PMCC3

SAP-PSCC4

SAP-COILV

/SEK

The EIS-ERP interface uploads the times

EIS-ERP

Yes

of  resource  performance  accounts  in

hours.

ESI-XPPS

In  particular  with  very  short  lead  times

this  may  effect  that  logon  times  are  cut

off by a conversion into hours.

Use  this  program  parameter  to  upload

times in seconds.

/RMTYP=

When  customizing  the  order  type,  you

EIS-ERP

Yes

can  assign  an  upload  type  to  the  order

type.

Use  this  program  parameter  to  only

upload data records of this upload type.

You  can  specify  the  parameter  several

times per call.

ESI-XPPS

SAP-PPPDC

SAP-PPREM

SAP-PPPI

SAP-PMCC3

SAP-PSCC4

SAP-COILV

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 44 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Parameters

Meaning/use

Relevant

Productive

interfaces

release

/KAT=

When  customizing  the  order  type,  you

EIS-ERP

Yes

can  connect

the  order

type  with  a

category.

Use  the  program  parameter  /KAT=  to

only upload data records of this category.

You  can  specify  the  parameter  several

times per call.

ESI-XPPS

SAP-PPPDC

SAP-PPREM

SAP-PPPI

SAP-PMCC3

SAP-PSCC4

SAP-COILV

/SART=

The  system  only  uploads  ADE

log

EIS-ERP

Yes

postings of the specified record type.

Therefore, you can use different program

parameters  per  call  and  record  type  for

uploading.

ESI-XPPS

SAP-PPPDC

SAP-PPREM

Requirement:  You  have  to  activate  the

SAP-PPPI

corresponding uploads when customizing

the order type.

SAP-PMCC3

You  can  specify  the  parameter  several

SAP-PSCC4

times per call.

Example:

SAP-COILV

Myerprck.exe

/SART=A

/SART=E

  The  system  only  uploads  A  and

E records.

/NOLOCK

When  starting  the  upload  program,  the

All

Requires

system  checks  if  there  are  any  lock

customizations

entries

for

the

database

table

ADE_PROTOKOLL.  If  this  is  the  case,

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 45 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Parameters

Meaning/use

Relevant

Productive

interfaces

release

the upload is not carried out.

You  can  use  this  program  parameter  to

prevent this check.

Set  this  parameter,  in  particular,  if  the

upload

is  not  based  on

the

table

ade_protokoll.

/EINH_CC34

The  interfaces  SAP-PMCC3  and  SAP-

SAP-PMCC3

Yes

PSCC4  transfer  the  uploaded  activity

quantity  in  seconds  (SEC)  to  SAP.  Use

the  parameter  "/EINH_CC34“  to  upload

the  data  in  other  units.  The  following

SAP-PSCC4

units are supported:

Hours:  H, HUR, STD

Minutes:

MIN

Seconds:

SEC

Example:

Myerprck.exe

/EINH_CC34=HUR

The  system  uploads  the  recorded

times in the unit "HUR“ (hours).

/SDAT_STORNO

The  SAP-PPPDCC  interface  transfers

SAP-PPPDCC  Yes

the change date along with the correction

records.

Use  this  program  parameter  to  upload

the initially collected shift date instead.

/NORFC_STORNO

The  SAP-PPPDCC  interface  transfers

SAP-PPPDCC  Yes

the cancellation records via sRFC.

Use  the  program  parameter  to  transfer

the data in the IDoc format to SAP. To do

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 46 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Parameters

Meaning/use

Relevant

Productive

interfaces

release

so,

inbound  processing  must  be

implemented in SAP.

The  system  uploads

the  cancellation

records  via

the  standard  PP-PDC

segment (with record type K20/K40) as if

the PP-PDCC license was not available.

/PI

If  you  use  the  SAP  Process  Integration

SAP-PPPDC

Yes

(previously:  Exchange  Infrastructure)  to

communicate  with  SAP,  the  version  of

the transferred segment is checked more

SAP-PMCC3

SAP-PSCC4

strictly.

Use  the  program  parameter  to  transfer

segment names with the version number

(i.e.  the  trailing  zeros  of  the  segment

name).

/INDEX_TMP_TABLE

Use this parameter to accelerate uploads

All

Requires

if  ORACLE  is  used  as  database  system

customizations

and large amounts of data are affected.

To  do  so,  use  an  index  for  a  temporary

table  where  all  data  to  be  uploaded  is

transferred in a first step.

/UE_PARAMS=

Program  parameter  for  the  stand-alone

Various

Yes

user exit processing (DD format).

/NOSTORNO

Use  this  program  parameter  to  prevent

All

Yes

cancellation

records

from

being

uploaded.

Therefore, you can use different program

parameters  per  call  and  record  type  for

uploading.

Requirement:  You  have  to  activate  the

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 47 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Parameters

Meaning/use

Relevant

Productive

interfaces

release

corresponding uploads when customizing

the order type.

/RECALC_NEG_YIELD

Use  this  parameter  to  offset  negative

SAP-PPPDCC  Requires

yield  with  already  posted  positive

customizations

uploads.

Program parameters to use the SIGUSR communication:

/LOGGING

Use  this  program  parameter  to  activate

INDIVIDUAL

Yes

communication  from  the  database  table

CASE

HYD_LOGGING.

To  do  so,  a  customization  might  be

required.

/WAIT_SIGUSR1=XX

The  program  parameter  specifies  the

INDIVIDUAL

Yes

time  in  seconds  that  has  to  pass  before

CASE

the upload  is performed  via the  SIGUSR

communication even without trigger.

/PEEK_SIGUSR1=XX

INDIVIDUAL

Yes

CASE

Use this parameter to delay execution of

an  action

triggered  by

the  SIGUSR

communication.

The delay time is entered  in seconds for

this parameter.

The  program

interprets

this

time  as

follows:

If  within  the  next  second  after  the  initial

trigger  there  is  another  trigger,  then  wait

for  not  more  than  <specified  value>

seconds.

If  in  a  specific  case,  triggers  would

indeed  arrive  every  second  then  the

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 48 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Parameters

Meaning/use

Relevant

Productive

interfaces

release

WAIT_SIGUSR  time  (e.g.  120  seconds)

would apply; i.e. the system would in fact

perform the upload after 2 minutes.

/SEND_SIGUSR1=

This  program  parameter  defines  which

INDIVIDUAL

Yes

other process/ program must be triggered

CASE

after  processing  by

the  SIGUSR

communication.

Specify  the  process/program  WITHOUT

file extension.

/COUNT_SIGUSR1=XX

Uploading  in  signal  mode  can  hardly  be

INDIVIDUAL

Yes

subjected  to  tracing.  This  is  due  to  the

CASE

fact  that  the  program  in  those  cases  is

started  once  via  the  scheduler  but  won't

shut  off.  Any  redirection  of  the  program

call  with  -d

to  a

log

file  will

then

necessarily  lead  to  very  large  log  files,

which  will

negatively

affect

the

performance.

Use

the  new  program  parameter

/COUNT_SIGUSR1=XX  to  specify  after

how  many  calls

the  program  will

automatically  shut  down.  A  call  in  these

instances  is  both,  a  call  via  SIGUSR

communication  and  the  cyclical  program

execution  which  is  controlled  via  the

parameter /WAIT_SIGUSR1.

Then the scheduler restarts the program.

But  this  will  lead  to  a  time  period  "t"

during  which  SIGUSR  calls  will  not  be

processed.  It  is,  however,  assumed  that

this will not lead to data losses since the

data to be uploaded are already saved to

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 49 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Parameters

Meaning/use

Relevant

Productive

interfaces

release

the DB.

Benefits:

If  the  program  is  started  via  a  script

(*.scr) from  the  scheduler,  you  can  store

there the routine to generate a date/ time

stamp  file  name  for  the  log  file  to  be

created. This allows to restrict the log file

size.

Program parameters for debugging/ tracing/ testing/ logging purposes:

/ONLYERR

This  program  parameter  specifies  that

All

Yes

system  log  entries  are  only  created  if  an

error occurred during uploading.

This  reduces  the  entries  in  the  system

log.

/SIM

The system does not upload/confirm data

All

No

during

simulations

(the

uploaded/confirmed  indicator  is  set  to

"'True").

/SIMULATION

The system does not upload/confirm data

All

No

to

SAP

during

simulation

(confirmed/uploaded  indicator  will  not  be

changed).

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 50 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

11  Application-Relevant Settings in HYDRA

Maintenance of the HYDRA distribution model - inbound processing

Use the HYDRA distribution model to maintain entries for HYDRA inbound processing:

Name of the parameter

Value

To process production orders

Message type

PPCC2RECORDER

Priority

Command

None

mle72imp.scr

Command parameter

/VARIANTE =<MLE variant to be used>

Description

PP-PDC – Download of production orders

Log. Target system

Created logical system

Storage duration

10

To process the upload request

Message type

PPCC2REQCONF

Priority

Command

High

hysapupl.scr

Command parameter

/UPLSEGNAM=E2BP_PP_TIMETICKET

Description

PP-PDC – Upload request

Log. Target system

Created logical system

Storage duration

10

To process variances

Message type

DIFFE2

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 51 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Name of the parameter

Priority

Command

Value

None

mle72imp.scr

Command parameter

/VARIANTE =<<MLE variant to be used>

Description

PP-PDC – Variances

Log. Target system

Created logical system

Storage duration

10

To process general quantity units

Message type

Priority

Command

UNIT2

None

mle72imp.scr

Command parameter

/VARIANTE =<MLE variant to be used>

Description

PP-PDC – Gen. qty. unit

Log. Target system

Created logical system

Storage duration

10

To process material-dependent quantity units

Message type

Priority

Command

UNIMA2

None

mle72imp.scr

Command parameter

/VARIANTE =<MLE variant to be used>

Description

PP-PDC – Gen. qty. unit

Log. Target system

Created logical system

Storage duration

10

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 52 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Maintenance of the HYDRA distribution model - outbound processing

Use the HYDRA distribution model to maintain entries for HYDRA outbound processing:

Name of the parameter

Value

To upload time tickets

Message type

PPCC2PRETTICKET

Description

IDoc type

PP-PDC – Upload of time tickets

PPCC2PRETTICKET01

Storage duration

10

Log. target system

Created logical system

Segment name 1

E2BP_PP_TIMETICKET

Activation of initial download

Since program version

.\lib\b_anr.dll

V8.1.1.326

the initial download function needs to be enabled explicitly for security reasons.

Create the following entry in the HYDRA INI configuration if you would like to enable the initial download

function for the system:

Parameter name

INI name

Section

Key

Value

SAP

INITIAL_DOWNLOAD_ACTIVATION

ACTIV_TILL

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 53 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Parameter name

Value

Value

Active

Comment

<date in the format MM/DD/YYYY>

Yes

Activation of the initial download

Behavior when deleting interrupted operations

Specific application functions of the production order or its operations result in a deletion download from

SAP to HYDRA. This includes, among other things:

  Setting of a deletion flag
  Technical completion in SAP

By default, data of an interrupted operation will be deleted if the deletion download arrives in HYDRA.

However,  special  customizing  settings  within  order  status  assignment  can  prevent  this  process.  The

following configurations have to be set e.g. for the “interrupted” operation status:

Field

Alterable order data

Action

Value

J or M

E or X

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 54 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

12  Application-Relevant Settings in SAP

Customizing the order type

In SAP the PP-PDC interface will only take those production orders into account, for which the order type

has  been  marked  as  “BDE  active”.  This  is  specified  in  Customizing  SPRO    Production    Production

control Master data Order Order type dependent parameters (OPL8).

For  each  relevant  combination  of  plant  and  order  type,  the  indicator  “BDE  active”  must  be  set  on  the

“realization” tab.

Definition of new subsystem groupings

To the extent that the subsystem groupings included in the SAP delivery do not suffice, it is possible to

define new one using SAP Customizing - SPRO  Labor time management  Shop floor data collection

 General settings  Groupings for subsystem connection.

Maintenance at the workplace

Once an order type is identified as "BDE active", the PP-PDC interface will only take those operations into

account, for which at least one subsystem grouping is stored to the workplace.

The  subsystem  grouping  at  the  workplace  is  maintained  using  the  workplace  maintenance  (CR02)  

Basic  data    Subsystems.  There,  the  relevant  subsystem  can  be  selected  from  several  stored

subsystems.

Setting of the posting time

Depending on the settings in SAP, the PP-PDC interface supports two confirmation/upload scenarios:



Immediate posting

If the "Immediate posting" indicator is active in Customizing (CI41), time ticket uploads transferred

from HYDRA to SAP will immediately be posted. If this posting cannot be made - if for example a

production  order  is  being  blocked  -  the  confirmations/uploads  will  stay  pre-posted  and  will  be

posted during the next posting run.

  Posting using job

If  the  "Immediate  posting”  indicator  is  not  set  in  Customizing  (CI41),  the  confirmations/uploads

will be pre-posted (AFRP0 table). They will then be posted later depending on the job, using Job

CORUPROC1.

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 55 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Definition of user fields

The PP-PDC interface can be used to transfer selected user fields of the work plan/ operation from SAP.

HYDRA offers default interpretations for these fields. In order to enable the values to be stored to the user

fields in SAP, a user field key must be defined and saved to the operation's work plan.

The  user  field  key  is  defined  in  Customizing  via  SPRO    Production    Production  control    Master

data Work plan data User field definition (OPEC).

A meaning must be saved for the following user fields:

SAP user field

SAP user field in the download

Meaning

structure

USR00

USR01

USR04

USERFIELD_CH20_1

Target cycle

USERFIELD_CH20_2

Te/ tr

USERFIELD_QUAN

Partitioning

The created user field key and the corresponding values must be stored to the operation's work plan.

Maintenance of the SAP partner agreement – outbound processing

Maintain the following settings for outbound processing in the partner agreement in SAP (WE20)

Parameter name

Value

To download the production orders

Partner number

Created logical system

Partner type

Message type

Receiver port

Package size

Output mode

Basis type

LS

PPCC2RECORDER

Created port

1

Transmit IDoc immediately

PPCC2RECORDER

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 56 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

To download the upload request

Partner number

Created logical system

Partner type

Message type

Receiver port

Package size

Output mode

Basis type

LS

PPCC2REQCONF

Created port

1

Transmit IDoc immediately

PPCC2REQCONF01

To download the workplaces

Partner number

Created logical system

Partner type

Message type

Receiver port

Package size

Output mode

Basis type

LS

PPCC2RECWORKCENTER

Created port

1

Transmit IDoc immediately

PPCC2RECWORKCENTER01

To download the variances

Partner number

Created logical system

Partner type

Message type

Receiver port

Package size

Output mode

LS

DIFFE2

Created port

1

Transmit IDoc immediately

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 57 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Parameter name

Basis type

Value

DIFFE2

To download generally applicable quantity units

Partner number

Created logical system

Partner type

Message type

Receiver port

Package size

Output mode

Basis type

LS

UNIT2

Created port

1

Transmit IDoc immediately

UNIT2

To download material-dependent quantity units

Partner number

Created logical system

Partner type

Message type

Receiver port

Package size

Output mode

Basis type

LS

UNIMA2

Created port

1

Transmit IDoc immediately

UNIMA2

Maintenance of the SAP partner agreement – inbound processing

Maintain the following settings for inbound processing in the partner agreement in SAP (WE20)

Parameter name

Value

Partner number

Created logical system

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 58 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Parameter name

Partner type

Message type

Value

LS

PPCC2PRETTICKET

Transaction code

BAPI

Maintenance of the SAP distribution model - outbound processing

Parameter name

Value

To download the production orders

Model view

Sender/ client

Created model view

Logical system of the client

Recipient/ server

Logical system for the recipient system

Object name/ interface

RCVPRORDCF

Method

Filter

To download the upload request

Model view

Sender/ client

ReceiveProdOrder

If  necessary,  maintain  the  BDE  grouping  as  filter

criterion

Created model view

Logical system of the client

Recipient/ server

Logical system for the recipient system

Object name/ interface

RCVPRORDCF

Method

RequestProdOrdConf

To download the workplaces

Model view

Created model view

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 59 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Parameter name

Value

Sender/ client

Logical system of the client

Recipient/ server

Logical system for the recipient system

Object name/ interface

RCVPRORDCF

Method

Filter

To download the variances

Model view

Sender/ client

ReceiveWorkCenter

If  necessary,  maintain  the  BDE  grouping  as  filter

criterion

Created model view

Logical system of the client

Recipient/ server

Logical system for the recipient system

Message type

DIFFE2

To download generally applicable quantity units

Model view

Sender/ client

Created model view

Logical system of the client

Recipient/ server

Logical system for the recipient system

Message type

UNIT2

To download material-dependent quantity units

Model view

Sender/ client

Created model view

Logical system of the client

Recipient/ server

Logical system for the recipient system

Message type

UNIMA2

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 60 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Maintenance of the SAP distribution model - inbound processing

Parameter name

Value

To upload time tickets

Model view

Sender/ client

Created model view

Logical system for the sender system

Recipient/ server

Logical system of the client

Object name/ interface

ProdOrdConfirmation

Method

Filter

CreatePredefTimeTicketMultiple

If  necessary,  maintain  the  BDE  grouping  as  filter

criterion

Planning of relevant jobs

The following programs/ reports must be planned as job to ensure that the PP-PDC interface will operate

automatically:

Program/ report

Meaning

Please note:

CIBDOP_DOWN_PP

Download  production  orders/

Planning  of  a  variant  WITHOUT

operations

indication of a target system

CIBDCONF_REQUEST

Download of the upload request

Planning  of  a  variant  and

indicator “Request upload of time

tickets”  set  and  as  option

indication of a target system.

Relevant transactions

Transaction

Meaning

Please note:

CI42N

Download  Production  orders/

-

operations

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 61 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

CI45N

CO16N

Download of the upload request

Reworking of incorrect postings

-

-

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 62 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

13  Configuration when using SAP PI / SAP PO

Configuration of upload requests in SAP

Assign  the  fields  as  described  below  to  configure  the  job  requesting  uploads  for  the  PP-PDC  interface

(SAP transaction CI45N):

Parameter name

Value

Logical system

Empty or logical system created for HYDRA

- Request time ticket upload/confirmation

Leave empty / do not check

Request time ticket events

Leave empty / do not check

Assign the fields as described above if you carry out the transaction manually.

Changing the program call for myerprck.exe/out

When using PI/PO, you have to change the program call for the upload program myerprck.exe/out in the

HYDRA Scheduler:

Situation

Value

Default program call (Windows) as delivered

sh.exe ./myerprck.scr

/MESTYP=PPCC2PRETTICKET /KAT=FA

Call including PI/PO (Windows)

sh.exe ./myerprck.scr

/MESTYP=PPCC2PRETTICKET /KAT=FA /PI

Default program call (Linux) as delivered

./myerprck.scr

/MESTYP=PPCC2PRETTICKET

/KAT=FA > /dev/null 2> /dev/null

Call including PI/PO (Linux)

./myerprck.scr

/MESTYP=PPCC2PRETTICKET

/KAT=FA /PI > /dev/null 2> /dev/null

Changing the segment name in the distribution model

Create  the  entry  in  the  HYDRA  distribution  model  in  order  to  transfer  time  tickets  as  outbound

configuration based on the following values:

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 63 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Parameter name

Value

Message type

PPCC2PRETTICKET

Description

IDoc type

PP-PDC – Upload of SAP time tickets

PPCC2PRETTICKET01

Retention period

10

Log. target system

Created logical system

Segment name 1

E2BP_PP_TIMETICKET000

Create  the  entry  in  the  HYDRA  distribution  model  in  order  to  request  the  upload  as  inbound  message

type based on the following values:

Parameter name

Value

Message type

PPCC2REQCONF

Priority

Command

High

hysapupl.scr

Command parameter

/UPLSEGNAM=E2BP_PP_TIMETICKET000

Description

PP-PDC – Upload request

Log. target system

Created logical system

Retention period

10

Requirements

Procedure

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 64 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Result

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 65 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

14  Protecting fields of planned operations

Purpose

Use the configuration described in this document to prevent specific data fields of a (planned) operation

from being overwritten when the operation is transferred once more via the ERP interface.

This function only affects ANR.MODIFY and/or ANR.UPDATE and operations.

Operations  are  only  updated  if  the  status  of  the  order/operation  generally  allows  it.  The

configuration described below does not apply if the status (see order status assignment) cannot

be changed in general.

Requirements

You require the relevant function authorization to access INI configuration and INI data configuration.

Procedure from service pack 12 onwards (b_anr.dll version 8.1.1.354)

Create a new entry in the INI configuration:

Field name

Value

Name

BAPINOUPDATE

Description

Enter a description.

For this entry, create an entry including the following values in INI data configuration:

Field name

Section

Key

Value

Active

Value

ANR

List the fields (HYDRA BAPI acronyms) that are not overwritten.

The  value  includes  a  condition.  Enter  the  condition,  for  example,  as  follows:
ANR.ATYP=AG

Yes

Use "@" to separate the single fields or conditions in the fields "key" or "value". The fields and conditions

are processed one after the other.

You can define the values for "key" and "value" separately. The entries are processed one after the other.

The conditions entered in the "value" field correspond to an AND operation.

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 66 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

As  of  service  pack  12  only  use  the  "@"  character  as  separator  if  you  create  new  entries  or

change existing ones. You do not have to change existing configurations (prior to service  pack

12). In this case, the "|" character is still supported.

You can enter multiple entries for the function BAPINOUPDATE in the INI data configuration, as

you define the values for "key" and "value" separately.

Procedure up to service pack 11

Create a new entry in the INI configuration:

Field name

Value

Name

BAPINOUPDATE

Description

Enter a description.

For this entry, create an entry including the following values in INI data configuration:

Field name

Section

Key

Value

Active

Value

ANR

List the fields (HYDRA BAPI acronyms) that are not overwritten.

Enter  the  condition  that  has  to  be  met  to  make  sure  fields  will  not  be
overwritten. Enter BAPI acronyms including value.

Yes

Use "|" to separate the single fields or conditions in the fields "key" or "value". The fields and conditions

are processed one after the other.

Up to service pack 11 only use the "|" character as separator.

You can define the values for "key" and "value" separately. The entries are processed one after the other.

The conditions entered in the "value" field correspond to an AND operation.

You can enter multiple entries for the function BAPINOUPDATE in the INI data configuration, as

you define the values for "key" and "value" separately.

If you cannot enter the pipe character ("|") using the GUI, you can still enter the values via the database:

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 67 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

  To do so, create a new entry as described above via the INI configuration. Now use the following

SQL  statement  to  determine  the  internal  DB  counter  for  the  header  entry  in  the  INI

configuration:

select * from hyd_ini

  Determine the value of the "VERWEIS" column for the new entry.

  Create the required entries. Use the following SQL statement to assign the database table fields

and application fields as described below:

insert into hyd_ini_data (ini_verweis, section, ident, value, bemerkung, aktiv)
values (<reference from previous SQL>, 'ANR', '<fields to be protected>', '<values>',
'<comment>', 'J')

Use the "|" (pipe) character to separate the acronyms of the fields you want to protect and the
acronyms of the values.

Use  a  pipe  character  "|"  to  complete  the  list  of  the  fields  you  want  to  protect

and the list of values.

Database field

INI_VERWEIS

SECTION

IDENT

VALUE

BEMERKUNG (comment)

AKTIV

Values/content

The value of the VERWEIS column identified
from the HYD_INI table via SQL.

Section

Key

Value

Comment

Active

List of frequently used acronyms

The following table lists the most frequently used acronyms and their meaning. Please contact MPDV

Support if the list does not include the acronym you require.

Acronym

ANR.MGRP

ANR.MNR

ANR.OPT:PLAN

ANR.DATB

ANR.ZEIB

Meaning

Machine group

Workplace/
machine

Planning indicator:
M
G

Planned for workplace/machine
Planned for machine group

Start date planned (via HLS)

Start time planned (via HLS)

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 68 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Acronym

ANR.DATE

ANR.ZEIE

Meaning

End date planned (via HLS)

End time planned (via HLS)

Example: protect the planned workplace

If the operation is planned on a workstation, you have to prevent the ERP interface from cancelling this

planning. To do so, enter the below-mentioned data:

Field name

Section

Key

Value

Active

SLQ statement:

Value

ANR

ANR.MGRP@ANR.MNR@ANR.OPT:PLAN@

ANR.ATYP=AG@ANR.OPT:PLAN=M@

Yes

insert into hyd_ini_data (ini_verweis, section, ident, value, bemerkung,

aktiv) values (<reference from previous SQL>, 'ANR',

'ANR.MGRP@ANR.MNR@ANR.OPT:PLAN@', 'ANR.ATYP=AG@ANR.OPT:PLAN=M@', '<comment>',

'J')

Example: protect the start/end dates of a planned OP

If the operation is planned on a workstation and, as a result, its start time is specified, you have to prevent

the ERP interface from cancelling this planning. To do so, enter the below-mentioned data:

Field name

Section

Key

Value

Active

SLQ statement:

Value

ANR

ANR.DATB@ANR.ZEIB@ANR.DATE@ANR.ZEIE@

ANR.ATYP=AG@ANR.OPT:PLAN=M@

Yes

insert into hyd_ini_data (ini_verweis, section, ident, value, bemerkung,

aktiv) values (<reference from previous SQL>, 'ANR',

'ANR.DATB@ANR.ZEIB@ANR.DATE@ANR.ZEIE@', ' ANR.ATYP=AG@ANR.OPT:PLAN=M@',

'<comment>', 'J')

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 69 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 70 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

15 Modification to the Order of Uploads

Usage

Subject to the ERP system's way of processing, problems might occur when uploading time tickets to the

ERP  system.  Issue  taken:  Operations  logged  on  after  a  shift  change  are  transferred  prior  to  operations

interrupted before the change of shifts.

Requirements

The upload program myerprck.exe/out as of version V8.1.1.99 or higher must be used.

Procedure

Add the following entry to the HYDRA INI configuration:

Parameter name

INI name

Section

Key

Value

Active

Comment

Result

Value

SAP

TIMETICKET_UPLOAD

ALTERNATIVE_ORDER_BY_CLAUSE

<must remain empty>

Yes

Changed sorting order

Once activated, uploads will be sorted and reported as follows:

Sort sequence

Comment

Internal number3

Logoff date

3

3 Internal number refers to numbering used in the SQL program logic. The number is not relevant to the end user.

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 71 of 72

  HYDRA Interfacing Module to SAP PP via PP-PDC

Sort sequence

Comment

Internal number3

Logoff time

4

Upload type (record type)

The  following  order  applies  for  uploading

1

record types:

1.  operation logons

2.  cancelled operation logoffs

3.  cancelled

partial

uploads,

interruptions to operations, batch

records (H records)

4.  Partial uploads

5.  Staff records (B records)

6.

interrupted operations, operation

logoffs, batch records (H records)

Reference

Order number

5

6

SAP-PPPDC_30.docx

Version: 1.0.22714

Page 72 of 72

