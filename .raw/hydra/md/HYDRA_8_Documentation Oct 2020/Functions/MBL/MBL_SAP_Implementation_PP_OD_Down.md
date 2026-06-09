1  Download of operation data

Download of operation data

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

MBL_SAP_Implementation_PP_OD_Down.docxVersion: 1.6.18770

Page 1 of 8

Field name

T

L  D  Description

Usage in HYDRA

Download of operation data

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
ORD_QUAN_UNIT
wrong
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

MBL_SAP_Implementation_PP_OD_Down.docxVersion: 1.6.18770

Page 2 of 8

Field name

T

L  D  Description

Usage in HYDRA

Download of operation data

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

Quantity
overdelivery
the
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

MBL_SAP_Implementation_PP_OD_Down.docxVersion: 1.6.18770

Page 3 of 8

Field name

T

L  D  Description

Usage in HYDRA

Download of operation data

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

MBL_SAP_Implementation_PP_OD_Down.docxVersion: 1.6.18770

Page 4 of 8

Download of operation data

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

MBL_SAP_Implementation_PP_OD_Down.docxVersion: 1.6.18770

Page 5 of 8

Field name

T

L  D  Description

Usage in HYDRA

Download of operation data

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

The structure described in the following, controls the deletion process for already transferred production

orders and/or their operations in the subsystem.

Field name

T

L  Description

Usage in HYDRA

SOURCE_SYS

CHAR

10

Logical system

Not used

MBL_SAP_Implementation_PP_OD_Down.docxVersion: 1.6.18770

Page 6 of 8

Download of operation data

Field name

T

L  Description

Usage in HYDRA

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

MBL_SAP_Implementation_PP_OD_Down.docxVersion: 1.6.18770

Page 7 of 8

Download of operation data

HYDRA partitioning

If the user field USERFIELD_QUAN has a value this value will be entered as the partitioning in the

operation.

If this is not the case, the system implicitly assumes a partitioning of 1 and enters this value in the

operation.

BDE cycle time

The system attempts to read the cycle time from user field 01 - places 1...10. If this is possible, the

system enters this value as the target cycle time in the HYDRA operation.

If the system cannot identify the target cycle time as described above, then the system calculates it

from  the  specified  processing  time  (PROCESS_TIME)  and  the  partitioning  (TEILIGKEIT)  values

that might be specified.

Calculation basis (formulas):

Processing  time  OP  =  Target  quantity  OP  *  (target  cycle  time  machine/  partitioning)

-

-

Target

cycle

time  machine

(=

BDE

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

In HYDRA the content of the field "processing time" (PROCESS_TIME) specifies the standard time

for machine assignment (target for RPA 11).

In HYDRA the content of the field "Setup time" (SETUP_TIME) specifies the standard time for the

machine setup (target for RPA 7).

Note on the workplace field WORK_CNTR:

As

of

version

6.5

HYDRA

supports

alphanumeric  machine/workplace

numbers.

In this case, you can only use the Windows terminals CT 76x and CT 8xx for data collection.

Notes on all other alphanumeric fields:

HYDRA  does  not  support  specific  special  characters  for  all  alphanumeric  fields.  These  characters  are:

"%",  "\",  "/",  "|"  as  you  cannot  enter  these  characters  using  shop  floor  terminals;  the  terminals  and  the

MOC do not support these characters. Do not use the characters ";", " “ ", and " ’ " since they are often

interpreted as comment characters or separators and will thus lead to unwanted effects.

MBL_SAP_Implementation_PP_OD_Down.docxVersion: 1.6.18770

Page 8 of 8

