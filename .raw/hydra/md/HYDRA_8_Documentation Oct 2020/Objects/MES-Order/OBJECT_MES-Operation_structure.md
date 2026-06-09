Data Structure of Operations

1  Data Structure of Operations



This document describes each of the fields for an operation. In this case, the index tabs specify how the

fields are structured. The actual sequence may deviate from the one illustrated here.

In  order  to  simplify  matters,  the  term  order  will  generally  be  used,  regardless  of  whether  an  order  or  a

work  plan  is  being  discussed.  Only  in  examples  in  which  it  would  make  sense  for  the  overall

understanding to differentiate between the two will we use the term work plan.

General tab

Order / work plan

The order number or rather the work plan number is an upper-level number, under which each of

the operations is compiled.

Sequence

The sequence number is the number of operation sequences in use.

OP

Split

The operation number is the number listed below the order used to identify the operation.

The split number.

OP name

Name of the operation; generally simply a short description of the activities that will be performed.

Article/Item

Part/item number of the article or material that is produced with the operation.  If you do not enter

the article, the system takes the value from the corresponding field of the order header.

Drawing issue number

Drawing issue number of the article, also referred to as index (available as of BDE 8.2).

Material type

Material  type  of  the  article  that  is  to  be  produced  in  this  particular  production  step.  If  you  do  not

enter the material type, the system takes the value from the corresponding field of the order header.

Priority

You can use the "priority" as a control tool. The priority is a single digit, numeric value. The value

increases in ascending order ("0" = lowest priority, "9" = highest priority).

Depending on the Order type, you can configure the priority to refer either to the operation or to the

order. Choosing the latter will mean that the system will take the priority of the operation from the

order header.

OBJECT_MES-Operation_structure.docx  Version: 1.11.18468

Page 1 of 19

Data Structure of Operations

Planned on

This identifier indicates whether the operation is located in the group pool   or if it is planned on a

specific  workplace  /  machine  .  In  MES,  you  can  plan  operations  either  in  the  graphic  detailed

planning or via the order sequencing.

Entering or deleting the workplace later will NOT automatically change this identifier.

Planned workplace

If  you  set  the  identifier  planned  on  workplace,  this  means  that  the  operation  is  planned  for  the

workplace entered here. If the input field is empty, the operation is not planned for any workplace.

Please note:

When you log on an operation, this field automatically includes the workplace where you logged in

the operation. Doing so will overwrite any (in some cases a different) workplace for which the

operation was planned up until then. As a result, the OP is implicitly re-planned.

Group

(Planned)  station  /  machine  group   designated  for  producing  the  operation.  It  is  meant  as  a

planning criterion for group-oriented planning and in the graphic detailed planning.

If you log on an operation to a (different) workplace, its group will be updated, if necessary.

If,  due  to  logging  in  the  operation,  there  is  a  change  to  the  group  for  which  the  operation  was

planned  up  until  now,  NONE  of  the  values  is  taken  from  the  template  (this  only  happens  if

modifications are made manually via the editing function).

Fixed

This identifier specifies whether an operation is set as fixed during the planning process.

Before  running  automatic  planning,  the  capacities  (workplaces)  are  completely  released  with  the

exception  of  the  fixed  operations.  Fixed  operations  that  are  still  set  in  the  past  are  moved  to  the

right and set to "now" at the earliest plus a planning lead time. Any (fixed) operations planned for

the future remain dispatched without changes.

Material

This field includes the first resource of the type  "Material" (ID:  "MAT") available in the component

list. This is the "most important" input material.

You can use this field in planning, for example, when applying the Setup change list or

in  graphic  detailed  planning  when  planning  equipment  setup  changes.  It  is  of  no

significance to processing as part of the material and production logistics (MPL).

OBJECT_MES-Operation_structure.docx  Version: 1.11.18468

Page 2 of 19

Color

You can enter the color of the main input material or the article planned for production here. This

field  is  used  in  planning  for  example  in  the  Setup  change  list  or  when  planning  equipment  setup

Data Structure of Operations

changes.

Tool

If  you  use  the  Tool  and  Resource  Management  (WRM)  product  group,  this  field  includes  the  first

resource  available  in  the  production  resource  /  component  list  that  is  not  of  the  resource  type

"DNC" or "MAT".

To  this  end,  when  a  component  is  being  entered  that  does  not  have  a  resource  type  "DNC"  or

"MAT", the system checks whether this field already includes a value. If the field does not include a

value, this component is entered. For this reason, we recommend to first input the "main production

resource" in the production resource list.

The  graphic  detailed  planning  integrates  this  field  in  order  to  identify  production

methods. However, the production resources stored in the operation are relevant when

checking capacities.

By  default,  the  field  is  of  no  relevance  for  processing  in  the  Tool  and  Resource

Management (WRM) product group.

DNC

If  you  use  the  production  facility/resource  management,  this  field  includes  the  first  resource

available in the production resource / component list that is of the resource type "DNC" (ID: "DNC").

To  this  end,  when  a  component  with  the  resource  type  "DNC"  is  entered,  the  system  checks

whether this field already includes a value. If the field does not include a value, this component is

entered.

In  the  system,  this  field  is  mainly  used  as  a  comment.  By  default,  the  field  has  no

significance for DNC processing.

Upload number

The purpose of the confirmation/upload number is to identify an operation. This is a numeric value

used for postings as an alternative to the combined order/OP number.

Examples

  Most of the time, a bar code is hard to read if the order / OP number is long (for example

when using handheld barcode readers with a limited scanning range);



If the space available on the work document is not large enough.

Please  note:  The  length  of  the  input  field  depends  on  the  settings  made  for  "Length  of

upload/confirmation number" in the basic parameter settings. If you did not specify a length there,

the field is shown across the whole width of the application.

OBJECT_MES-Operation_structure.docx  Version: 1.11.18468

Page 3 of 19

Leave this field blank for work plan operations.

Data Structure of Operations

Authorization

An  authorization  identifier  that  indicates  whether  a  user  is  authorized  to  log  on/off  the  operation.

This involves crosschecking the identifier OP postings in the HR master.

Cost type

The  cost  type  to  be  posted  when  executing  this  operation,  for  example  in  an  overhead  cost

operation / order. At the moment, this field is only used as a comment.

Cost center

The  cost  center  to  be  debited  when  executing  this  operation,  for  example  in  an  overhead  cost

operation / order. At the moment, this field is only used as a comment.

Dates tab

The  following  dates  are  results  calculated  and  executed  during  lead  time  scheduling.  Lead  time

scheduling is triggered by certain events and runs asynchronously in the MES.

Scheduled start time

Scheduled  start  date  of  the  operation  as  a  result  of  the  lead  time  scheduling  compared  to  infinite

capacities.

As a rule, a fixed operation is never changed. If, based on the scheduling situation, a date cannot

be maintained, the operation is rescheduled, but it remains fixed.

Scheduled end time

Scheduled  end  date  of  the  operation  as  a  result  of  the  lead  time  scheduling  compared  to  infinite

capacities.

Earliest start

Earliest  start  date  (EST)  of  an  operation  as  a  result  of  forward  scheduling  during  lead  time

scheduling as compared to infinite capacities or specified by PPS.

Earliest end

Earliest  end  date  (EET)  of  an  operation  as  a  result  of  forward  scheduling  during  lead  time

scheduling as compared to infinite capacities or specified by PPS.

Latest start

Latest  start  date  (LST)  of  the  operation  as  a  result  of  backward  scheduling  during  lead  time

scheduling as compared to infinite capacities.

Latest end

Latest  end  date  (LET)  of  the  operation  as  a  result  of  backward  scheduling  during  lead  time

scheduling as compared to infinite capacities.

OBJECT_MES-Operation_structure.docx  Version: 1.11.18468

Page 4 of 19

Data Structure of Operations

Buffer time

The system determines the buffer time from the difference between the latest start date (LST) and

the earliest start date (EST) for an operation

The  sum  total  of  the  buffer  times  of  all  operations  is  stored  in  the  order  (header)  in  the  field  OP

buffer.

Reducible time

If it turns out during scheduling that the lead time for a given order is longer than the allotted time

available  (basic  end  date  exceeded),  then  the  MES  will  attempt  to  take  reduction  measures  to

shorten the lead time accordingly. Reducible times are the wait times and the transport times.

This value indicates how many (more) hours can be reduced from the lead time of an order. This

time results from the sum of the:

- difference from the current waiting time and the minimum waiting and the

- difference from the current transport time and the minimum transport time

Reducible time = (current waiting time - minimum waiting time) + (current transport time - minimum

transport time). These differences are displayed here as totals.

The  document  entitled  Reduction  Strategies  provides  information  on  how  to  configure  reduction

strategies.

Planned start

Planned start date for the operation.

Logging in an operation that has not yet been planned will not result in the

following:

- the time when this operation is started will not be interpreted as the planned

start date and

- this date will not be entered here.

Planned end

Planned end date for the operation.

The planned dates (planned start/planned end) are set:

  by HYDRA Shop Floor Scheduling (HLS) upon saving
  by the Graphic Order Sequencing (GAV) upon saving
  by manual data maintenance (client)
  by the interface

The  following  logic  applies  for  inserting  and/or  editing  an  operation  (manual  data  maintenance  or  by

interface):



Insert/copy operation

o

o

If the "planned start" field is empty, it will be assigned to the earliest start date by
default.
If the "planned end" field is empty, it will be assigned to the latest end date by default.

OBJECT_MES-Operation_structure.docx  Version: 1.11.18468

Page 5 of 19

Data Structure of Operations

o

In both cases, however, the operation is not planned (automatically), i.e. you can still
replan the operation.

  Change operation

o

In this case, processing depends on the "planning function" option of the workplace:

  N (no planning):





If the "planned start" field is empty, it will be assigned to the earliest
start date by default.
If the "planned end" field is empty, it will be assigned to the latest end
date by default.



In any other cases, the planned dates will not be set automatically through
processing.

Quantities tab

Generally,  you  can  enter  quantities  in  four  different  quantity  units  for  an  operation.  Enter  the  target

quantity and the unit (as abbreviation) for each quantity unit. You can also enter a calculated "estimated

scrap"

quantity.

These

quantities

can

be

specified

- by the PPS system or, if the target quantity update is activated,

- they may result from the quantity produced by the previous operation.

The letters in parentheses behind the field descriptions provide information about the particular quantity

type.

(P)

(S)

(T)

(B)

Primary quantity unit

Secondary quantity unit

Tertiary quantity unit

Base quantity unit

Target quantity (P) / unit / target scrap quantity (P)

Use the primary quantity to enter data via the terminal (primary input quantity).

The indicated target quantity may include a target scrap quantity that might have been entered.

Send-ahead quantity

In  order  to  illustrate  any  overlapping,  you  can  define  a  minimum  send-ahead  quantity  (in  the

primary  quantity  unit)  for  the  (preceding)  operation.  You  can  start  the  following  operation

(overlapping) if at least the send-ahead quantity has been finished and posted. The system verifies

the  send-ahead  quantity  during  data  collection  (when  logging  on  operations).  In  addition,

scheduling and detailed planning also integrate any overlapping.

You have to enable the relevant configuration in the order type  in order to verify

the  minimum  send-ahead  quantity  when  logging  on  OPs.  Configure  the

processing  code  accordingly  to  plan  overlapping  operations  based  on  the

minimum send-ahead quantity (or the lead time). You can enable this function in

the processing code while customizing the system.

OBJECT_MES-Operation_structure.docx  Version: 1.11.18468

Page 6 of 19

Data Structure of Operations

When  checking  the  minimum  send-ahead  quantity,  the  system  only  takes  into

account the recorded yield that has been entered up until now (primary quantity

unit).

No  quantity  conversion  takes  place.  For  this  reason,  make  sure  that  adjacent

operations have the same primary quantity unit.

Example:

Operation 0100

Target quantity 1000  Send-ahead quantity 50

Operation 0200

Target quantity 1000

If  you enabled the validation check for the send-ahead quantity,  you can

only  log  on  operation  0200,  once  operation  0100  has  produced  a  yield

quantity (in primary quantity unit) of at least 50.

The system does not check the operation status of the preceding operation. You

cannot log on the current operation, in case the preceding operation has already

been finished, but the send-ahead quantity has not yet been reached.

Target quantity (S and T) / unit / target scrap quantity (S and T)

The secondary and tertiary quantity are considered optional, variable units (for example within the

reel-based MES solution - RF).

The indicated target quantity may include a target scrap quantity that might have been entered.

Target quantity (B) / unit / target scrap quantity (B)

The  base  quantity  unit  is  an  objective  description  of  the  material  used  in  an  order.  The  base

quantity unit allows you to compare, for example, scrap from different operations. The base quantity

unit  is  in  effect  the  quantity  unit  shown  in  the  order  header.  Generally,  conversions  (for  example

when target quantities are updated) are made using the base quantity unit.

The indicated target quantity may include a target scrap quantity that might have been entered.

If you use a quantity type, make sure to set the correct quantity unit.

The system only converts the quantities based on the conversion factors in the index

tab  "quantities"  if  the  relevant  values  you  want  to  recalculate  are  "empty"  (not  "0").

Quantity fields that contain values will not be recalculated.

Conversion factors

Use  the  conversion  factors  to  convert  the  primary,  secondary  and  tertiary  quantities  to  the  base

quantity. Use these conversion factors, for example, when updating target quantities.

Use a numerator and denominator if you want to use decimal values (meaning a figure with decimal

places) as the conversion factor.

OBJECT_MES-Operation_structure.docx  Version: 1.11.18468

Page 7 of 19

Data Structure of Operations

Example

- Base quantity unit: Square meter M2

- Primary quantity unit: Piece PCE

- 1 piece = 2 square meters.

In this case

- define the numerator as the primary quantity  2 and

- define the denominator as the primary quantity  1

If no (valid) conversion factor exists, the system will attempt to convert the values using conversion

formulas (this requires that formulas were defined during the customization process).

Overdelivery/ Underdelivery

The system checks all quantities you post for overdelivery. These quantities occur, when you report

part  quantities  for  an  operation,  when  you  interrupt  or  log  off  an  operation.  When  you  log  off  an

operation, the system also runs a check for underdelivery.

For

further

information  on  overdelivery/underdelivery  checking,  see

the

document entitled MBL_PC_UnderOverDeliveryOverview.pdf.

Underdelivery (%)

Value shown as a percentage by which the quantity reported  may deviate from the target quantity

(primary  quantity  unit).  The  value  is  only  assumed  from  the  processing  code  if  the  value  was  not

explicitly transmitted via the ERP interface.

Example:

Target quantity of the operation: 120 items

Underdelivery: 84%

The actual quantity must not fall below 101 items.

Overdelivery (%)

Value shown as a percentage by which the quantity  reported may deviate from the target quantity

(primary  quantity  unit).  The  value  is  only  assumed  from  the  processing  code  if  the  value  was  not

explicitly transmitted via the ERP interface.

Example:

Target quantity of the operation: 120 items

Overdelivery: 168%

The actual quantity must not exceed 201 items.

OBJECT_MES-Operation_structure.docx  Version: 1.11.18468

Page 8 of 19

Overdelivery reaction/ underdelivery reaction

If the limits specified in the fields overdelivery or underdelivery are exceeded, a warning or an error

message may be issued in response. Possible values:

Data Structure of Operations

"empty"  No reaction

W

X

Warning

 Error.

If error is set as the reaction, you will not be able to override the validation check.

If  warning  is  set  as  the  reaction,  you  can  override  the  validation  check  by  entering  a  deviation

reason.

Unit quantity

Only Windows terminals allow you to enter a deviation reason. DOS terminals interpret

the reaction "W" as an error.

Quantity  referring  to  operation  specifications.  You  can  customize  the  MES  to  use  the  ERP  base

quantity here. You can reference the ERP base quantity in formulas to calculate process times.

The  unit  of  the  unit  quantity  must  be  a  primary  quantity  unit.  The  system  does  not  perform  an

automatic conversion if the quantity units do not match.

As opposed to the base quantity in ERP, there is no other meaning or use in MES.

Durations / target times tabs

The illustration shown below provides an overview of the chronological structure of an operation in MES

(in-house production).

OBJECT_MES-Operation_structure.docx  Version: 1.11.18468

Page 9 of 19

Data Structure of Operations

Target setup time

The target setup time is the time required to prepare a workplace for the operation, for example the

time  needed  to  mount  the  necessary  tools  or  to  set  the  machine  in  compliance  with  the

specifications ("setup time"). During this time, the workplace's capacity is shown as in use.

The ERP system transfers the target setup time or you can calculate the target setup time using a

customized formula. The formula is based on default values. In this case, enter the formula in the

field "setup time formula".

Additional setup time

The  graphic  detailed  planning  sets  the  additional  setup  time  for  the  operation,  if  a  setup  change

matrix is available and an additional setup time results from planning.

The additional setup time can also show a negative value.

Target processing time

The processing time is the time needed to process the material as part of an operation. During this

time,  the  workplace's  capacity  is  shown  as  in  use.  The  processing  time  depends  on  the  order

quantity; it does include neither the setup time nor the retooling time.

The graphic detailed planning does not use the  processing time. The graphic detailed

planning  calculates  the  processing  time  and/or  remaining  run  time  dynamically  using

the formula entered in the field "Formula RRT 1".

The  ERP  system  transfers  the  target  processing  time  or  you  can  calculate  the  target  processing

time  using  a  customized  formula.  The  formula  is  based  on  default  values.  In  this  case,  enter  the

formula  in  the  field  "processing  time  formula".  Make  sure  to  use  the  same  basis  to  calculate  the

processing time and the remaining run time (field "Formula RRT1").

Planned retooling time

The  planned  retooling  time  (teardown  time)  is  the  time  needed  to  reset  the  workplace  back  to  its

original  state  after  the  operation  has  been  completed.  This  may  require  some  tasks  such  as

dismantling  tools  or  performing  some  cleaning  work.  During  this  time,  the  workplace's  capacity  is

shown as in use.

The  ERP  system  transfers  the  planned  retooling  time  or  you  can  calculate  the  planned  retooling

time  using  a  customized  formula.  The  formula  is  based  on  default  values.  In  this  case,  enter  the

formula in the field "Teardown time formula".

Planned delivery time

There  is  only  one  time  component  for  external  operations,  i.e.  the  delivery  time.  The  system

synchronizes this time with the Gregorian calendar. The performance level has no relevance.

OBJECT_MES-Operation_structure.docx  Version: 1.11.18468

Page 10 of 19

Data Structure of Operations

External processing

If  this  option  is  set,  the  operation  is  one  that  is  performed  externally.  External  operations  are

generally  not  planned,  but  only  scheduled.  In  terms  of  lead  time  scheduling,  for  these  kinds  of

operations the lead time only results from the delivery time.

If  this  option  is  not  set,  it  will  be  considered  an  in-house  operation.  In  this  case,  the  following

process times specify the capacity requirements (planning in HYDRA Shop Floor Scheduling):

- Planned setup time

- Planned processing time

- Planned retooling time

The following process times are used for scheduling (lead time scheduling) in-house operations:

- Target waiting time

- Target setup time

- Target processing time

- Target retooling time

- Target wait/idle time

- Target transport time.

Formula RRT1 / Formula RRT2

The  value  entered  in  the  field  RRT  1  refers  to  a  formula  defined  in  the  Management  of formulas.

The formula describes how to calculate the remaining run time (RRT) for an operation. The graphic

detailed planning (HLS) uses this formula.

Unless  otherwise  specified  or  defined,  enter  the  "RRT"  value  (remaining  run  time)  in  this  field.  In

this case, calculate the remaining run time as follows (set by default):

(Target cycle / 1000) * (primary target quantity - the yield recorded up until now) /    partitioning

You can enter another formula in the field formula RRT 2. You can use this formula to calculate any

remaining  run  time  that  might  deviate  from  RRT  1.  The  detail  application  order  progress  of  the

Order overview, for example, shows this formula.

Planned lead time

You can specify an overlapping of operations either using a send ahead quantity or lead time. The

lead time describes the offset from the previous operation to its subsequent operation. A lead time

can  also  be  negative,  if,  for  example,  the  subsequent  operation  begins  with  a  setup  before  the

previous operation.

Max. sync. time

If  you  enabled  synchronization  with  the  subsequent  operation  using  the  Processing  code

(customization), then planning makes sure that the maximum time span between this operation and

the subsequent operation is the specified synchronization time.

The time is calculated in hours based on the shift calendar.

You can combine the synchronization function with an overlapping of operations.

OBJECT_MES-Operation_structure.docx  Version: 1.11.18468

Page 11 of 19

Data Structure of Operations

Planned waiting time / waiting time formula / minimum waiting time

The waiting time is one available option to absorb interferences and delays for each operation. The

waiting  time  describes  the  (calculated)  length  of  time that  needs  to  pass  before  an  operation  can

commence  (setup).  The  scheduling  process  also  integrates  the  waiting  time.  You  can  enter  the

waiting time directly or you can calculate it using a formula.

You can reduce the waiting time during the scheduling process. For this purpose, you have to enter

a reduction strategy for the order, which triggers a reduction in the wait time. You can reduce this

time to the minimum waiting time (at most).

Target wait time

The  target  wait/idle  time  describes  the  length  of  time  that  needs  to  pass  for  processing-related

reasons before a manufactured or processed material can undergo the next processing step. The

scheduling process integrates the wait/idle time. You cannot reduce the wait/idle time.

Target transport time

The target transport time is the time necessary to transport material from one workplace to the next.

The higher-level ERP system transfers the transport time or you can calculate the transport time in

MES using a transport matrix.

Lead time scheduling takes into account the transport time. You can also reduce the transport time

as part of lead time scheduling. You can define the transport matrix and reduction strategies when

customizing the system.

Minimum transport time

If you use reduction strategies, you can reduce the transport time to this minimum amount of time

during scheduling.

The following wage specifications are used to calculate an incentive wage.

Wage type

Wage type

Wage indicator

Piecework ID/premium  (E/G/S/M/Z/...)

Target te

Premium default: te (per 1000 pieces).

"te"  is  the  "time  per  unit"  for  each  person.  Use  "te"  to  calculate  the  "order  time",  which  is  the

specified  processing  time  for  each  person  used  to  calculate  the  incentive  wage.  By  default,  the

MES  shows  this  time  in  hours    per  1000  pieces.  The  interface  transfers  this  time  in  seconds  per

1000 pieces.

If no incentive wage is used in MES, you can enter "0" here.

OBJECT_MES-Operation_structure.docx  Version: 1.11.18468

Page 12 of 19

Data Structure of Operations

Target tr

Target tr is the person’s default setup time (in hours).

If no incentive wage is used in MES, you can enter "0" here.

Target teb

The premium default "teb" is the available machine time per unit. You can use this time to calculate

the "occupancy time" for the workplace/machine so that the incentive wage can be calculated. By

default,  the  MES  shows  this  time  in  hours    per  1000  pieces.  The  interface  transfers  this  time  in

seconds per 1000 pieces.

If no incentive wage is used in MES, you can enter "0" here.

Target trb

Target

"trb"

is

the  default

setup

time

(in  hours)  of

the  workplace/machine.

If no incentive wage is used in MES, you can enter "0" here.

Processing tab

Processing code

A  processing  code  is  a  compilation  of  options  that  are  used  to  control  the  operations.  Each

operation  references  this  kind  of  processing  code,  and  as  a  result  its  performance  is  defined  in

relation to the issues listed below.

You can define processing codes at the time the system is customized.  Unless defined otherwise,

enter the Processing code SYSTEM.

Recordable

If you set this option, you can generally post the operation, provided other criteria are also met (e.g.

operation not locked or operation can be logged in due to the status of the previous operation).

Can be logged on at the same time/parallel logon possible

This option specifies whether an operation may be logged on several times, i.e. at the same time.

You should enable this option for overhead cost operations and for operations that are logged on to

group workplaces. However, you should not set this option for operations that are subject to batch

management.

The  planning  functions  graphic  detailed  planning,  order  sequencing,  graphic  order  sequencing  do

not  support  operations  that  can  be  logged  on  simultaneously.  These  planning  functions  assume

that  an  operation  is  planned  for  exactly  one  capacity.  If  you  log  on  one  operation  to  several

workplaces at the same time, contrary to capacity planning, this is then in opposition to planning. In

order to conduct parallel planning of operations on different capacities, MES provides the operation

splitting function.

OBJECT_MES-Operation_structure.docx  Version: 1.11.18468

Page 13 of 19

Data Structure of Operations

Batch management requirement

Set  this  option  if  the  operation  is  subject  to  batch  management.  You  have  to  use  the  material

management in order to process operations that are subject to management in batches.

Serial number requirement

You should only set this option after consultation with MPDV.

Layout

The code entered here references a label that was created in MES Label Designer that needs to be

printed for the operation.

Target cycle

The  target  cycle  is  an  operation-related  specification  used  for  machine  clocking.  The  target  cycle

does  not  depend  on  the  number  of  produced  parts.  In  MES,  the  target  cycle  is  calculated  and

processed as a duration per 1000 machine cycles.

If  cycle  time  monitoring  is  active,  this  value  is  assumed  as  the  default  setting  for  finishing  the

operation.  This  value  is  the  default  value  for  the  MDE  machine  monitoring  function  (cycle

monitoring).

Partitioning

The partitioning (cavity) defines how many parts are produced during a machine cycle.

The  partitioning  is  determined  for  each  operation  separately  and  is  transferred  via  the  ERP

interface to MES. The partitioning is transmitted to the terminal at the time the operation is logged

on and applies to the machine to which the operation is logged on.

Pulse factor

Automatic quantity collection at the terminal includes the pulse factor that is stored for an operation.

Consequently, the pulse factor and the partitioning represent a conversion factor for the automatic

collection of quantities: primary quantity = cycle * partitioning/pulse factor.

Split authorization

This option defines whether an operation may be split.

Max. number of splits

If an operation can be split, the system checks whether or not the split number entered by the user

exceeds the value entered here. If this is the case, the split is rejected with an error.

M/O relation setup (machine/operator relation: setup)

Personnel requirements PEP (Personnel Scheduling) for setting up the operation.

Qualification (setup)

Unique qualification number from the qualification master data.

OBJECT_MES-Operation_structure.docx  Version: 1.11.18468

Page 14 of 19

Data Structure of Operations

M/O relation production (machine/operator relation: production)

Number  of  employees  required  for  production.  By  configuring  the  system  during  the  customizing

stage,  you can define for each order type that only the number of persons specified here can log

on.  If  several  operations  are  logged  on  at  the  same  time  (in  parallel),  the  maximum  number  of

persons is equal to the total number of M/O relations for each separate operation.

In Personnel Scheduling (PEP), you can use this field to define the personnel requirements needed

to produce the operation.

Alternatively  to  defining  personnel  requirements  by  way  of  the  machine/operator  ratio  for  the

operation,  you  can  also  define  these  requirements  in  the  production  resources  and  tools.  As

opposed  to  the  production  resources  and  tools,  you  can  only  define  one  required  qualification

each for setup and production if the M/O relation is used.

The  machine/operator  relation  (for  setup  and  production)  is  only  relevant  for  personnel

scheduling if you have entered a qualification in the corresponding field.

Qualification (production)

Unique qualification number from the qualification master data.

Production method (variant)

Using  production  methods  allows  you  to  specify  on  which  machine  an  operation  can  be  planned,

when the ERP system transfers order specifications. If you use the graphic detailed planning, you

can apply the available production methods for detailed planning taking into account the specified

times (target cycle, setup and retooling time) for each production method.

Here you can enter the key of the currently assigned production method.

Data identifier

Here, enter the data identifier if you use an Arburg Control System (ALS). This ID must be unique

(key). If ALS is not used, leave this field empty.

CBM tab

This  index  tab  is  only  relevant  in  connection  with  the  reel-based  solution  using  in  the  material

management module.

General

Special indicators

Not used; this field must remain empty.

Number of reels

The planned total number of reels to be produced (parent roll and sub-rolls); no specific processing

in MES.

OBJECT_MES-Operation_structure.docx  Version: 1.11.18468

Page 15 of 19

Data Structure of Operations

Material properties

Input width

Reel input width in MM

Output width

Reel output width in MM

If multiple rolls are manufactured at the same time in one operation, this field indicates the sum total

of the separate widths.

If branches are planned, the output width of the separate operations is set explicitly (no sum total is

generated) for each operation ("parent" and "sub-roll" operations).

Seam width

Total seam width in mm

If several reels are produced at the same time in one operation, this field will contain the sum total

of the separate seam widths.

If branches are planned, the seam width of the separate operations is set explicitly (no sum total is

generated) for each operation ("parent" and "sub-roll" operations).

Surface per piece

Surface for a piece in MM2/PCE

Mass per unit area

Mass per unit area in G/MM2

Casing weight

This is where the casing weight for the sub-rolls is defined while cutting operations.

Unit: G

Cutting information

Cutting OP

Only relevant if the operation is a cutting operation

"  "

"T"

No roll cutting

Roll cutting active (sub-roll numbering)

"M"

Cutting active (parent rolls are being produced again)

Branch OP

Identifies parent and subordinate operations for a planned branch.

"M“

"K“

Mother OP of a planned branch

Child (subordinate) OP of a planned branch

OBJECT_MES-Operation_structure.docx  Version: 1.11.18468

Page 16 of 19

Data Structure of Operations

Mother OP

If  a  branch  is  planned,  these  fields  allocate  the  branched  off  material  to  the  relevant  mother

operation.

A mother operation must reference itself.

Please note: Enter the MES order ID (= MES order number = combined order / operation number).

Daughter rolls/cut

Number of planned daughter reels per cut.

If the cutting plan is not defined, 0 is entered here.

Daughter rolls/cut - total

For  cutting  operations  (mother  OP):  number  of  planned  daughter  rolls  per  cut  (encompassing  all

branched off material).

If the cutting plan is not defined, 0 is entered here.

User fields tab

User fields allow you to store further customer-specific information to the MES in addition to the fields that

are available by default. The order information shows operation-related user fields. The order information

dialog includes the user fields index tab for the operations. This tab shows the user field key, the defined

user fields including name and unit of measure. The user fields tab includes eight sub-index tabs, which

each  have  eight  additional  user  fields.  The  so-called  user  field  key  determines  which  user  fields  are

involved and which meaning they have.

Object type

The object type for operation-related user fields is AGNR (cannot be modified).

User field key

Every user field key describes a combination of user fields. The management of the user field key

(and  therefore  the  purpose  of  the  fields)  varies  from  one  object  to  the  next.  User  field  keys  are

defined in coordination with the customer during the customizing process.

User fields

The following user fields are available for the operation after customizing the system:

Field data type

Date
Numeric,
time, duration
Decimal value
Text field, length 1
length
field,
Text
10

Number of
fields
6
16

6
16
6

OBJECT_MES-Operation_structure.docx  Version: 1.11.18468

Page 17 of 19

Data Structure of Operations

Field data type

Number of
fields
14

field,

length

Text
20
Text
40
Each page shows a maximum of 8 fields.

length

field,

2

Default values tab

You can define up to ten default values for each operation. You can use the default values, among other

things,  to  calculate  certain  processing  times  using  specified  calculation  rules.  The  default  value  key

specifies the meaning of each separate default value .

Please note

We recommend  not  to  change  the  default  value  key  at  the  operation  directly,  because  this might

distort the meaning of the separate default values.

Default value keys are configured in coordination with the customer during the customizing process.

Administration tab

Created by/Created on

User who entered the operation and the time that the operation  was entered.  You cannot change

these fields.

Modified by/Modified on

User who most recently modified the operation, and the time that this modification was made. You

cannot change these fields.

Transferred by/Transfer time

Here,  you  can  enter  the  source  from  where  the  operation  was  transferred.  If  the  PPS  system

transfers  the  operation  (PPS=J),  the  system  automatically  sets  the  transfer  time  and  date  to  the

time and date when the order was stored in MES. You cannot change these fields.

Modified HYDRA

Specifies that the operation was changed in MES. This identifier is automatically set at "J", if the OP

was changed in MES. You cannot change the field.

Modified PPS

Specifies that the production order was changed in the ERP system. This identifier is automatically

set at "J", if the production order was changed in the ERP system (PPS=J). You cannot change the

field.

Deletion flag

This option is only displayed in the order information. You cannot change the option.

OBJECT_MES-Operation_structure.docx  Version: 1.11.18468

Page 18 of 19

Responsibility area

If  an  area  of  responsibility  is  entered  here,  the  user  must  have  been  authorized  to  view  and  edit

operations and/or work plan operations.

Data Structure of Operations

The fields listed below are only displayed in the Order information. You cannot change these fields.

Locked / locked by / locked on

You  cannot  log  in  locked  operations.  The  terminal  does  not  show  locked  operations  in  the

sequencing list, irrespective of how the status is configured.

Additionally, the user is shown  who  was the last to lock the operation and also the time and date

when  the  operation  was  locked.  These  values  remain  even  after  the  operation  is  unlocked.  They

are updated each time the operation is locked again.

Unlocked by/unlocked on

Shows the user who was the last to unlock the operation and the time and date when the operation

was  unlocked.  These  values  remain  even  if  the  operation  is  locked  again  any  time  in  the  future.

They are not updated until the operation has again been unlocked.

Locked for editing / locked for editing by / locked for editing on

Reserved; currently not used.

Reactivated by / Reactivated on

If an operation that has already ended is reactivated, the user is displayed here, who was the last to

perform the reactivation and the time and date on which the reactivation took place.

OBJECT_MES-Operation_structure.docx  Version: 1.11.18468

Page 19 of 19

