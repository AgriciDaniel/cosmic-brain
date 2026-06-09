Processing Codes

1  Processing Codes

Overview

HYDRA menu

Master data  Order  Processing codes

FEDRA menu

Detailed Scheduling  Master data  Processing codes

Transaction code

pc

Function authorization  mdpc

Purpose

Use this function to create or modify processing codes in the system.

Integration

A  processing  code  is  a  collection  of  options  that  are  used  to  control  operations.  Each  operation

references a processing code, which defines its behavior in relation to planning, collection or posting.

When  an  operation  is  created,  some  fields  of  the  processing  code  are  transferred  as

redundant information to the operation. Please refer to the documentation Edit operations

for further information about these fields.

If  you  generate  an  order  from  a  work  plan,  specific  fields  of  the  order  are  populated

automatically. These fields are defined by the order type and were transferred to the work

plan when the work plan was first created. As such, the order type is not read again when

the order is generated.

You have to change the processing code and then reset the changes  in order to transfer updated  data

from the processing code to the order or work plan.

Selection criteria

The application provides the following selection criteria:

Processing code

Unique processing code name

Field descriptions

Processing code

Processing code identification number

MOC_ProcessingCodes.docx

Version: 1.22.23311

Page 1 of 14

"SYSTEM" = default processing code that is assigned to the operation if no processing code was

Processing Codes

explicitly entered.

Comment

Designation/name or description of the processing code

Field descriptions - General tab

External processing OP

This option specifies whether the operation is an internal or external processing operation.

N

Y

The operation is processed in-house.

The operation is processed externally.

Please note: If this option is active, the Planning option should be set to either

"T" or "N".

Rework OP

Rework operation

Currently, this field is only used for comments and does not affect processing.

Release of rework OP

Release of the rework operation.

If  this  option  is  enabled,  the  initial  status  of  the  status  assignment  is  ignored  and  the  operation

status is set to the control indicator "V" when an operation is initially created or transferred from the

PPS system. Requirement: The preceding operation must be finished; i.e. it currently is assigned to

a status with control indicator "E" .

Change of secondary status

The secondary status may be set for OPs with this processing code.

Can be split

V

This operation may be split.

If the number of splits is transferred via the interface, then the split is performed

directly in the interface.

N

The operation may not be split.

Field descriptions - Entry tab

Recordable

This option specifies whether operations of orders with this order type can be recorded or not, i.e.

posted as defined in BDE (shop floor data collection).

MOC_ProcessingCodes.docx

Version: 1.22.23311

Page 2 of 14

Processing Codes

Y

Yes, operations can be recorded as defined in BDE.

Whether  an  operation  can  actually  be  recorded  also  depends  on  the  setting

with the same name in the Order type.

N

The  operation  is  for  information  purposes  only  ("info  operation")  and  may  not

be  posted  as  defined  in  BDE.  If  you  attempt  to  log  on  any  such  operation  is

rejected with a validation error.

Please note:

1)  To  ensure  that  an  operation  does  not  appear  in  the  sequencing  list  of  the

terminal, the option sequencing list (see below) should be disabled (set to "N").

2)  An  info  OP  is  finished  automatically  when  the  subsequent  OP  is  finished.

Requirement: the operation is planned for a machine that "may be posted".

Parallel logon possible/can be logged on at the same time





Sequencing list

You can log on this operation multiple times/at the same time.

You can log on this operation only once.

This  option  specifies  if  operations  are  displayed  in  the  sequencing  list  of  the  terminal.  You  can

choose from the following options:

Y

Yes, display in sequencing list.

Whether  an  operation  is  really  displayed  in  the  sequencing  list,  also  depends

on the setting of the same name in the order type and the operation status.

N

No;  orders  of  this  order  type  are  not  displayed  in  the  sequencing  list  of  the

terminal.

Batch management requirement

If this option is checked, batch management is required for this OP (only relevant for ADE-CHV or

MPL).

Note:  This  information  is  redundantly  stored  for  the  operation.  Only  the  information  stored  for  the

operation is relevant for processing.

Serial number obligation

If this option is checked, postings must be based on serial numbers as of this operation.

Y

N

Yes, irrespective of whether serial numbers were transferred or not.

No, even if serial numbers were transferred.

You  can  use  Y/N  to  control  from  which  OP  onwards  serial  numbers  are

MOC_ProcessingCodes.docx

Version: 1.22.23311

Page 3 of 14

Processing Codes

required for an order.

Note:  This  information  is  redundantly  stored  for  the  operation.  Only  the  information  stored  for  the

operation is relevant for processing.

Inspection  characteristic  expected  This  option  defines  whether  inspection  characteristics  must  be

collected for this operation or not

X

N

Underdelivery

Yes

No, inspection not required; no inspection characteristic expected

Underdelivery is allowed for this operation. The value entered is a percentage of the target quantity.

The  options  Consider  additionally  in  case  of  inspections  specify  the  values  that  should  be

integrated in the calculation apart from the yield.

Example: Enter the value 80 if the target quantity is 100 pieces and underdelivery is allowed up to a

value of 80.

The system only checks the underdelivery value when the operation is logged off.

Reaction to underdelivery

Tolerance is not checked

X

An  error  is  generated  if  the  tolerance  quantity  defined  as  percentage  in  the

above-mentioned field Underdelivery is not reached. This validation check may

not be overridden by a mandatory posting.

W

Warning if tolerance quantity is exceeded or not reached. This validation check

may be overridden by a mandatory posting

Overdelivery

Overdelivery is allowed for this operation. The value entered is a percentage of the target quantity.

The  options  Consider  additionally  in  case  of  inspections  specify  the  values  that  should  be

integrated in the calculation apart from the yield.

Example: Enter the value 120 if the target quantity is 100 pieces and overdelivery is allowed up to a

maximum value of 120.

The system checks the overdelivery value when the operation is logged off, interrupted and when a

partial quantity is confirmed/uploaded.

Reaction to overdelivery

Tolerance is not checked

X

An  error  is  generated  if  the  tolerance  quantity  defined  as  percentage  in  the

MOC_ProcessingCodes.docx

Version: 1.22.23311

Page 4 of 14

Processing Codes

above-mentioned field Overdelivery is not reached or exceeded. This validation

check may not be overridden by a mandatory posting.

W

Warning if tolerance quantity is exceeded or not reached. This validation check

may be overridden by a mandatory posting

Notes  on  the  options  Overdelivery  and  Underdelivery  and  the  corresponding

Reactions

The options for underdelivery/overdelivery are only included in the processing code if they

are  not  entered  manually  in  the  operation  or  transferred  by  the  PPS  system,  and  then

only  if  a  new  operation  is  created.  Reason:  These  values  are  stored  redundantly  in  the

operation.  As  a  result,  changes  to  the  processing  code  have  no  effects  on  operations.

Instead, the values must be changed explicitly for the operation.

But  if  the  option  Quantity  check  (see  the  following  option)  is  enabled  in  the  processing

code,  this  option  directly  affects  all  operations  with  this  processing  code,  because  this

information  is  not  stored  redundantly  to  the  OP.  In  this  case,  all  over/underdelivery

settings that might be defined in the operation are also ignored.

Activate 100 % quantity check If this option is enabled, the entire target quantity of the operation must

be declared as yield or scrap, i.e. the total quantity must be at least equal to the target quantity. For

this  reason,  an  operation  may  only  be  logged  off  if  the  total  target  quantity  has  been

confirmed/uploaded, i.e. the total quantity has either been posted as yield or scrap.

The  options  Consider  additionally  in  case  of  inspections  specify  the  values  that  should  be

integrated in the calculation apart from the yield.

This check overrides any possibly activated validation check for under/overdelivery (see

above); it cannot be overridden by a mandatory posting.

Consider additionally in case of inspections: Scrap

Include the scrap when checking the underdelivery/overdelivery fields or the quantity.

Consider additionally in case of inspections: Rework quantity

Include the rework quantity when checking the underdelivery/overdelivery fields or the quantity.

Consider additionally in case of inspections: Open quantity

Include the open quantity when checking the underdelivery/overdelivery fields or the quantity.

MOC_ProcessingCodes.docx

Version: 1.22.23311

Page 5 of 14

Processing Codes

Field descriptions - Posting tab

Target quantity update

Use  this  option  to  activate  a  comparison  of  the  target  quantity  when  an  operation  is  logged  off

(="FinishOP" posting).

Y

The Target quantity update is enabled for this operation, i.e. when an operation

is  logged  off,  the  posted  yield  is  transferred  to  the  subsequent  operations  as

target quantity.

The  target  quantity  is  updated  even  for  partial  confirmations/interruptions  of

OPs, if the target quantity of the current operation is exceeded as a result. (is

only performed online, not during recalculation!).

The below-mentioned configuration "Consider additionally when terminating" is

used to identify when the target quantity of the current operation is exceeded.

This  configuration  is  stored  redundantly  in  the  backlog  of  orders  when  the

operation  is  created.  The  target  quantity  itself,  however,  is  only  compared

based on the recorded yield.

N

The  target  quantity  update  is  disabled  for  this  operation.  If  an  operation  is

finished, the target quantity of other operations will not be changed.

Notes

Internal  business  data  is  distributed  by  this  function,  i.e.  operators  of  subsequent  cost  centers  do

not need to find any remaining quantities that have already accrued as scrap.

When creating an operation, this option is integrated in the operation. But  you can neither display

nor change it.

Quantities changed via the editing functions do not result in target quantity updates.

The function "target quantity update" does not update split operations but only the split master.

Interrupt OP instead of terminating it

This option controls how operations are logged off. Values:



U = When the OP is manually logged off, it is not terminated, but instead it is

simply interrupted.



When the OP is manually logged off, it is terminated.

You should not use this option together with the option "Terminate preceding OPs".

If  this  option  is  used  in  combination  with  the  option  "Terminate  OP  when  reaching

target quantity", the option "Interrupt OP instead of terminating it" will take priority,  i.e.

MOC_ProcessingCodes.docx

Version: 1.22.23311

Page 6 of 14

Processing Codes

the OP/OPs is/are not terminated but are simply interrupted.

If  you  change  this  option  subsequently  in  the  processing  code,  this  change  has  no

effect on already existing operations.

Beginning of milestone

This option is relevant in connection with the option mentioned below, "Terminate preceding OPs".

The processing logic is described below with the option "Terminate preceding OPs".

Please  note:  If  you  change  this  option  subsequently  in  the  processing  code,  this  change  has  no

effect on already existing operations.

Terminate OP when reaching target quantity

An OP is automatically logged off from the workplace when the produced quantity is greater than or

equal to the target quantity.

In  case  of  operations  that  are  logged  on  to  several  workplaces  at  the  same  time,  the

operation cannot be logged off automatically when the target quantity is reached. This

means that the operation is only logged off from the workplace where the target quantity

is reached. The operation is not logged off from other workplaces (that are logged on in

parallel).

When calculating the quantity produced, the options "Consider additionally when terminating" (see

below) are integrated. If none of the options is set, the quantity produced is derived from the yield

only (primary quantity unit).

Possible values:

N

Y

U

F

Do not log off automatically when reaching the target quantity (default)

Log off automatically when reaching the target quantity

Interrupt automatically when reaching the target quantity

Log off automatically and log on subsequent OP with identical article number

The operation that should  be logged on is the operation that is planned next

for this workplace (the selection criterion is the planned start of the operation ).

If  the  article  number  is  identical  to  the  article  number  of  the  logged  off

operation,  this  operation  will  be  logged  on  to  the  workplace.  If  the  article

number of the operation planned next is not identical to the article number of

the logged off operation, the operation will not be logged on.

K

Campaign control:

Log off automatically and log on subsequent OP of the same campaign (only

relevant  in  connection  with  the  grouping  function  of  HYDRA  Shop  Floor

Scheduling, license HLS-KPG).

MOC_ProcessingCodes.docx

Version: 1.22.23311

Page 7 of 14

Processing Codes

If the option Terminate OP when reaching target quantity ("Y") is enabled, an OP is interrupted

when  the  target  quantity  is  reached  if  the  preceding  OP*)  has  not  yet  been  finished  and  the

target  quantity  update  is  active  there.  As  in  this  case,  the  target  quantity  could  still  increase.

Otherwise, the OP is automatically logged off.

*)  The  option  also

integrates  preceding  OPs  of  other  orders

in  case  of  order

networks/relationships among different orders.

If this option is used in combination with the option  "Interrupt OP instead of terminating it", the

latter takes priority, i.e. the OP/OPs is/are not logged off, but simply interrupted.

If  you  change  this  option  subsequently  in  the  processing  code,  this  change  has  no  effect  on

already existing operations.

If  quantities  are  recorded  automatically  (e.g.  via  CT-UMPS),  the  recorded  quantities  are

cumulated and sent at regular intervals to the server for posting. Therefore, in case of machines

with rapid cycles, the operation may be logged off or interrupted with a quantity that is greater

than the target quantity.

The  subsequent  operation  is  interrupted,  logged  off  and/or  logged  on  asynchronously/in  the

background.  If  a  plausibility  error  occurs,  the  user  is  not  informed  about  it.  We  therefore

recommend  to  disable  plausibility  checks  that  could  stop  processing.  An  example  is  the

plausibility check "Check running operation" in the Status assignment.

Group  workplaces  (workplace/machine  configuration,  type  =  G)  are  supported  as  of  hymw

version 7.2.1.454.

Terminate preceding OP ("milestone processing")

If  an  operation  is  logged  off  (posting  A_AB)  or  terminated  (posting  A_BE)  where  the  option

"Terminate  preceding  OP"  is  enabled  in  the  processing  code,  all  directly  preceding  operations

within the order network of the operation will be terminated.

If the preceding operations are logged off depends on their status:

  Logged on operations are logged off (posting A_AB)



Interrupted operations are terminated (posting A_BE)

The postings result in BDE log records of record type "E".

You can control the posting using the following options:

Y

All  preceding  OPs  are  automatically  terminated  when  the  OP  is  logged  off

without quantity posting (logged on OPs only if the option"External processing"

is set).

M

All  preceding  OPs  are  automatically  terminated  when  the  OP  is  logged  off

while the remaining quantity is automatically posted.

MOC_ProcessingCodes.docx

Version: 1.22.23311

Page 8 of 14

Processing Codes

The  options  "Consider  additionally  when

terminating"  (see  below)  are

integrated to calculate the remaining quantity. If none of the options is set, then

the  remaining  quantity  is  derived  from  the  difference  of  target  quantity  minus

yield (primary quantity unit in each case).

N

j_

No automatic termination

All  preceding  OPs  are  terminated  automatically  when  the  OP  is  logged  off

without quantity posting (including OPs logged on).

m_

All  preceding  OPs  are  finished  automatically  when  the  OP  is  logged  off  while

the  remaining  quantity  is  automatically  posted  (including  OPs  logged  on).

All  preceding  operations  are  logged  off  or  terminated  up  to  the  operation  where  the  option

"Beginning of milestone" is enabled in the processing code. If the option is not checked, processing

continues up to the first operation of the order. The processing is performed asynchronously.

If  the  options  "J"  and  "M"  are  enabled,  only  those  preceding  OPs  are  finished  whose

current statuses are assigned to the control indicators "V" (prepared), "U" (interrupted)

or "N“ (not planned) (exceptions see above).

Preceding  operations  that  are  logged  on  are  not  finished,  if  they  are  logged  on  to

several workplaces simultaneously.

If  a  preceding  OP  is  already  planned  for  a  workplace,  then  it  is  logged  off  with  the

planned  workplace.  If  the  preceding  OP  has  only  been  planned  for  a  group,  the  first

workplace of the planned group that is not locked is identified (the workplace with the

lowest number), and the OP is logged off with this workplace. If no workplace is found,

the operation is finished with the workplace where the "milestone OP" was logged off.

You should not use these  options together  with order networks/relationships affecting

several  orders,  as  in  this  case  not  only  operations  of  the  same  order  are  terminated,

but also operations of other orders.

You should not use this option should together with the option "Interrupt OP instead of

terminating it".

Operations configured with the option recordable = "N" are also terminated. In case of

the options "M" and "m", operations are terminated without remaining quantity.

If  you  change  this  option  subsequently  in  the  processing  code,  this  change  has  no

effect  on  already  existing  operations.  In  the  Order  type  ,  use  the  option  "Milestone

processing  only  for  the  last  OP"  to  control  whether  all  preceding  OPs  are  only

MOC_ProcessingCodes.docx

Version: 1.22.23311

Page 9 of 14

Processing Codes

terminated automatically when the last OP is logged off.

Group  workplaces  (workplace/machine  configuration,  type  =  G)  are  supported  as  of

hymw version 7.2.1.454.

Consider additionally when terminating: scrap

Scrap is also integrated when an operation is finished.

This  option  is  integrated  in  both  options  "Terminate  OP  when  reaching  target  quantity"  and

"Terminate preceding OP".

If you change this option subsequently in the processing code, this change has no effect on already

existing operations.

Consider additionally when terminating: Rework quantity

The rework quantity is also integrated when an operation is finished.

This  option  is  integrated  in  both  options  "Terminate  OP  when  reaching  target  quantity"  and

"Terminate preceding OP".

If you change this option subsequently in the processing code, this change has no effect on already

existing operations.

Consider additionally when terminating: Open quantity

The open quantity is also integrated when an operation is finished

This  option  is  integrated  in  both  options  "Terminate  OP  when  reaching  target  quantity"  and

"Terminate preceding OP".

If you change this option subsequently in the processing code, this change has no effect on already

existing operations.

Automatically interrupt preceding OP

Automatically interrupts preceding OPs until the next milestone starts.

If you change this option subsequently in the processing code, this change has no effect on already

existing operations.

Automatic logon by preceding OP

When  an  OP  is  logged  on,  the  system  automatically  logs  on  all  directly  succeeding  OPs  to  the

planned workplace if this option is set for the OPs.

If  the  operation  has  not  yet  been  planned  for  a  workplace,  the  operation  is  logged  on  to  the  first

workplace of the group (workplace with the lowest number).

Please  note:  If  you  change  this  option  subsequently  in  the  processing  code,  this  change  has  no

effect on already existing operations.

Check status of preceding OP

MOC_ProcessingCodes.docx

Version: 1.22.23311

Page 10 of 14

Processing Codes

This option activates a check that specifies whether or when the current operation may be logged

on.

S

Check status of preceding operation.

In  this  case,  the  status  of  the  preceding  operation  must  include  the  option

"Successor can be logged on".

N

No check.

This  option  only  takes  effect,  if  the  option  of  the  same  name  in  the  "Order  types"  is

checked.

The  parameter  "Check  status  of  preceding  OP"  is  only  available  if  the  extension

PCOptionsStatusPrecedingOP is activated.

Field descriptions - Planning tab

Synchronization with successor OP



The start date of the successor OP is synchronized with the finish date of the

operation. The period between these two times may not exceed the maximum

synchronization  time  stored  in  the  operation.  When  planning  changes  are

made, the relationship between the two operations remains the same or must

remain the same, which might restrict the planning options.

This function can  also be  used to define sequences  of multiple operations for

synchronization.

Application scenarios:

> First part inspection at measuring machine

> NC presetting

> Painting and drying furnace

Please  note:  If  this  option  is  checked,  a  max.  synchronization  time  greater

than zero (0) must be entered so that adjacent operations will be synchronized.



Synchronization is not planned, i.e. an operation can be planned an entire shift

or only one hour after the end of the preceding operation. In this case as well,

you cannot plan a subsequent OP before the current operation.

Planning

This setting specifies whether and how operations are relevant for detailed planning.  The following

settings are available:

N

No planning

MOC_ProcessingCodes.docx

Version: 1.22.23311

Page 11 of 14

Processing Codes

T

Scheduling only

The  operation  is  scheduled,  i.e.  the  lead  time  is  calculated  based  on  the

process times and the dates are set accordingly.  (Lead time) scheduling does

not integrate competitive situations.

F

Scheduling and detailed planning

The operation is relevant for detailed planning. Therefore, this operation is not

only  included  in  the  scheduling  but  also  in  the  automatic  and/or  interactive

planning.

Whether  or  which  operations  are  actually  included  in  scheduling  or  detailed  planning

also depends on the configuration of the same name made in the  order type or in the

operation status configuration.

Overlapping

HYDRA supports the following types of overlapping:

N

K

No, no overlapping

Optional overlapping

Here,  overlapping  can  be  used  during  the  reduction  process.  Overlapping  is

not used if there are enough buffers and/or no scheduling bottleneck.

S

Target overlapping

scheduling  and  planning  expect  overlapping.  This  does  not  mean,  however,

that this possibility must be used.

You can use a send ahead quantity or lead time to specify overlapping. Both parameters describe

the  offset  between  the  preceding  and  the  subsequent  operation.  In  case  of  overlapping,  adjacent

operations  are  shown  internally  in  a  start-start  relationship.  Times  that  can  usually  be  reduced,

cannot be used for reduction in this case.

Overlapping  between  two  operations  occurs  if  this  option  is  enabled  in  the  processing

code of the preceding operation and neither the lead time nor the send ahead quantity of

the operation is zero (0).

Otherwise,  adjacent  operations  are  shown  in  an  end-start  relationship,  where  transition

times (if configured accordingly) can be reduced.

This document illustrates how to configure overlapping.

Cannot be interrupted

If this option is checked, the detailed planning must plan the operation so that it is not interrupted by

a time without shift (e.g. shift breaks).

MOC_ProcessingCodes.docx

Version: 1.22.23311

Page 12 of 14

Processing Codes

N

W

Not relevant, i.e. an operation can be planned to be interrupted by times when

no shift is planned.

An  operation  can  be  planned  to  be  interrupted  by  times  when  no  shift  is

planned. A warning is issued, however.

Field descriptions – Quality tab

Inspection OP

This  field  identifies  a  QM  operation.  This  kind  of  operation  is  not  uploaded  to  a  leading  system  once

finished.  If  configured  accordingly,  the  system  automatically  finishes  such  operations,  once  a  related

inspection step is finished.

One of the following licenses must be available to  enable this field: FEP-PPF, FEP-PPE,

PMV-PPK, WEP-PPW, QMS-SQM, PDV-PDM.



Operations assigned to this processing code are inspection operations.

These  operations  only  have  quality  control  purposes  and  do  not  generate

semi-finished or finished products.



Operations  assigned  to  this  processing  code  are  no  inspection  operations.

These operations generate semi-finished or finished products.

Logon by main OP

This parameter is only relevant for operations that are linked to a main operation.



The  system  automatically  tries  to  log  on  all  linked  operations,  once  the  main

operation is logged on.

The  system  integrates  the  configurations  of  the  variable  workplaces  when

identifying the workplaces where the linked operations should be logged on.



The system does not automatically log on all linked operations when the main

operation is logged on.

Logoff by main OP

This parameter is only relevant for operations that are linked to a main operation.



The system automatically tries to log off or interrupt all linked operations when

the main operation is logged off.

MOC_ProcessingCodes.docx

Version: 1.22.23311

Page 13 of 14

Processing Codes



The  system  does  not  try  to  log  off  or  interrupt  all  linked  operations  when  the

main operation is logged off or interrupted.

Log OP off with still unsettled inspections





If the operation is logged off or interrupted, no plausibility check is performed to

find out if inspections are still pending.

The system checks if there are still pending inspections when the  operation is

logged  off  or  interrupted.  If  this  is  the  case,  the  logoff  or  interruption  of  the

operation is refused and a corresponding note is sent.

Interrupt main OP with still unsettled inspections

This parameter is only relevant to main operations that include linked operations.





If the main operation is interrupted, the system does not check whether there

are pending inspections for the linked operations.

If the main operation is interrupted, the system checks for all linked operations

whether or not inspections are still pending. If this is the case, the interruption

of the main operation is refused and a corresponding note is sent.

Log main OP off with still unsettled inspections

This parameter is only relevant to main operations that include linked operations.





If the main operation is logged off, the system does not check if there are still

pending inspections for the linked operations.

If the main operation is logged off, the system checks for all linked operations if

inspections are still pending. If this is the case, the logoff of the main operation

is refused and a corresponding note is sent.

MOC_ProcessingCodes.docx

Version: 1.22.23311

Page 14 of 14

