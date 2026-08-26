Manual

Shop Floor Control (MOC)
BDE-FST 8.1

Version 1.0.4716

Last changed on: 19.06.2020

Shop Floor Control (MOC)

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

BDE-FST_81.docx

Version: 1.0.18468

Page 2 of 19

Shop Floor Control (MOC)

Contents

1  Übersicht Fertigungssteuerung .................................................................... 4

2  Order Sequencing ........................................................................................ 5

3  Setup Change List ...................................................................................... 11

4  List of Material Requirements .................................................................... 15

BDE-FST_81.docx

Version: 1.0.18468

Page 3 of 19

Shop Floor Control (MOC)

1

 Übersicht Fertigungssteuerung

Purpose

This  component  combines  different  applications  that  support  planning  in  the  area  of  business  data

collection.

You use the function package if:

  You  want  to  run  simple  sequencing  for  your  machines  and  workplaces  without  reference  to

schedules or without considering capacities,

  You need a list specifying when which order must be set up and whether in the process a setup

change is made,

  You need an overview indicating on which day how much material is needed.

Integration

The sequencing, done in tabular form, determines the processing sequence reflected in the sequencing

list in the workplace.

The  data  displayed  in  the  setup  change  list  and  in  the  material  requirements  overview  are  based  on

detailed schedule planning performed either in the ERP system or in HYDRA shop floor planning.

Features

  Order sequencing

o  Tabular  order  sequencing  for  scheduling  (sequence  planning)  the  pool  of  orders  for

machine groups and workplace groups without accounting for any capacity restrictions

o  Simple drag and drop assignment of operations to machines and workplaces

  Setup change list

o  Setup  change  list  with  display  of  orders  /  operations  that  must  be  converted  during  the

period selected. Differentiation by tool change, color change and product change. Display

of  any  other  relevant  information  (setup  time,  tool  number,  workforce  requirements,

articles etc.)

  Material requirements list

o  Material requirements list with material requirements calculated for the selected machine,

cost  center  or  machine  group  and  the  time  period  selected  incl.  daily  totals.  Display  of

any other relevant information about operations, articles to be produced and materials

BDE-FST_81.docx

Version: 1.0.18468

Page 4 of 19

Shop Floor Control (MOC)

2  Order Sequencing

Summary

Menu

Production Control --> Planning Aid --> Order Sequencing

Transaction code

Function authorization

orseq

orseq

Utilization

Order sequencing is a function of production management. The application has been designed for simple

sequencing  of  workplaces  without  taking  into  account  restrictions.  A  drag  &  drop  function  enables

planning within the order sequencing function.

This application is an ideal tool for planners, shift foremen and supervisors. In this context, simple means

allow for operations to be planned on machines (sequencing).

Integration

HYDRA order sequencing (AVG) is an integrated planning module for the preparation of sequencing lists

for  an  organizational  unit  within  the  scope  of  shop  floor  control.  Functions  for  the  following  tasks  are

integrated:

  Display of operations that are saved in relation to a group within the pool.

  Display of operations, which have already been planned on workplaces.

  Planning of an operation onto a workplace/machine.

  Specification  of  a  processing  sequence  (“sequencing”)  as  basis  for  displaying  the  operations  to  be

produced in the sequencing list at the terminal

  Replanning of an operation onto another workplace or group

  Formation of merged operations

  Splitting of operations

  Locking/unlocking of operations

Consequently,  the  order  sequencing  function  is  an  economic  alternative  to  the  HYDRA  Shop  Floor

Scheduling  module  (HYDRA-HLS)  for  the  planning  and  sequencing  of  production  orders,  provided  that

additional features like schedule and capacity planning are not focused.

BDE-FST_81.docx

Version: 1.0.18468

Page 5 of 19

Shop Floor Control (MOC)

Restrictions

Workplaces can either only be planned using order sequencing or the graphic planning function

(shop  floor  scheduling).  We  recommend  planning  individual  workplace/machine  groups  either

only by using the order sequencing or the graphic planning function.

Selection criteria

In general, only operations are selected that are neither logged on nor finished at the moment (the system

selects the operations with an operation status assigned to the control indicators V, U, S).

Selection parameters allow for the pool of groups to be restricted. But selection criteria do not affect the

pool of workplaces/machines.

The following selection criteria are available in the application:

Group

Selects the operations relating to a machine group

Order type

Selects the order type

Order

Selects an order

Article

Selects an article

Article designation

Selects an article designation

Control of predecessor OP

Selects operations subject to the status of the preceding OP

Order index from ... to

Selects the order index

Priority from ... to

Selects the priority

Scheduled start from ... to ...

Selects the scheduled start of operations

Scheduled end  ... to ...

Selects the scheduled end of operations

Earliest start ... to ...

Selects the earliest start of operations

BDE-FST_81.docx

Version: 1.0.18468

Page 6 of 19

Shop Floor Control (MOC)

Earliest end ... to ...

Selects the earliest end of operations

“Pool of groups” detail application

The "pool of groups" table shows detailed information on individual operations.

“Workplaces” detail application

This detail dialog shows the workplaces that are assigned to the currently selected group. If a workplace

is selected in this dialog the operations planned for this workplace are shown in the “pool of workplaces”

dialog.

The workplaces meeting the following criteria are displayed only:

  The planning function is set to the “planning in order sequencing” option

  The workplace is not blocked

  The planner is authorized for the responsibility area of this workplace

The following columns are available:

Workplace

Unique identification of the workplace/machine according to configuration

Short name

Short name of the workplace according to configuration

Designation

Workplace designation according to configuration

Group

Group assigned to the workplace according to configuration

Cost center

Cost center assigned to the workplace according to configuration

Company

Company assigned to the workplace according to configuration

Responsibility area

Responsibility area assigned to the workplace according to configuration

Workplace type

Type of the workplace according to configuration:   E = individual workplace; G = group workplace

BDE-FST_81.docx

Version: 1.0.18468

Page 7 of 19

Shop Floor Control (MOC)

“Pool of workplaces” detail application

This detail application shows the operations that are planned on the currently selected workplace. In this

detailed application the sort sequence is fixed and cannot be changed.

The  system  uses  a  separate,  internal  algorithm  to  create  the  sort  sequence  of  an  operation

within  the  pool  of  workplaces.  The  result  is  saved  in  special  database  fields.  The  pool  of

workplaces shows this in the "time of sorting" column.

The  time  of  sorting  does  not  change  if  an  operation  is  logged  on  and  interrupted  later.  The

operation lines up in the list of planned operations based on the time of sorting.

Editing functions

Please  note  that  HYDRA  does  not  perform  any  validation  checks  as  to  whether  the  operation

may be produced on the workplace on which it is planned.

Operations are planned (detailed scheduling) as described in the paragraphs that follow:

Select the operations within pool of groups that are to be planned on a workplace. Left click

the  corresponding  entry  to  select  an  operation.  To  select  several  operations  at  once,  click  on  the

first operation, press the shift button, hold it and click on the last operation. To choose operations

selectively, press the Ctrl button, hold it and click on the required operations.

Select the workplace within the pool of workplaces on which operations are to be planned.

To do so, click the workplace, onto which the selected operations are to be planned, in the left hand

section of the pool of workplaces dialog.

Transfer the selected operations to the pool of workplaces using “drag and drop"   Left click

an  operation  selected  in  the  pool  of  groups,  hold  the  mouse  button  down  and  move  the  mouse

pointer to the right hand area of the pool of workplaces dialog (“drag”) and then release it (“drop”).

Once  you  have  released  the  left  mouse  button,  the  selected  operations  disappear  in  the  pool  of

groups and are now visible in the pool of workplaces.

Change the sequence of operations planned on the workplace, if required

The  sequence  of  operations  planned  on  the  workplace  may  now  be  changed.  Thus,  the  selected

operation  is  placed  in  front  of  the  operation  before  which  it  is  to  be  planned  using  “drag  &  drop”.

The sorting function of the table is deactivated as this would contradict the principles of sequencing.

Operations are loaded from the server to the terminals as default values. The terminal provides the

user  with  operation  data  according  to  planning,  i.e.  operations  are  displayed  in  the  same  sort

sequence within the sequencing list of the terminal as they have been planned here.

BDE-FST_81.docx

Version: 1.0.18468

Page 8 of 19

Toolbar

General index tab

Shop Floor Control (MOC)

information

This button opens the application order information.

Order

 Order overview

This button opens the application order overview ..\..\functions\moc\MOC_OrderOverview.pdf.

Entry index tab

(op.logon)

Operations can be logged on to the system using the "log on“ function

 Log operation on

 Partial confirmation/upload (op.splitrelease)

The "partial upload" function allows for partial uploads on operations to be recorded in the system

Interrupt operation (op.interrupt)

Operations can be interrupted in the system using the "interrupt“ function

 Log operation off (op.logoff)

Operations can be logged off from the system using the "log off“ function

 Terminate operation (op.finish)

Interrupted or prepared operations can be logged off from the system using the "terminate“ function

Further functions index tab

The "split" function allows for operations to be split in the system.

 Split operation (op.split)

BDE-FST_81.docx

Version: 1.0.18468

Page 9 of 19

Shop Floor Control (MOC)

 Cancel split operation (op.splitrelease)

The "cancel split" function allows for splits to be canceled.

 Generate merged operation (op.colopcreate)

The "generate merged OP" function allows for interrupted or prepared operations to be summarized

in merged operations.

 Cancel merged operation (op.coloprelease)

The "cancel merged OP" function allows for merged operations to be canceled in the system.

BDE-FST_81.docx

Version: 1.0.18468

Page 10 of 19

Shop Floor Control (MOC)

3  Setup Change List

Summary

Menu

Production control --> Planning aid --> Setup change list

Transaction code

setli

Function authorization

setli

Utilization

The  setup  change  list  provides  the  user  with  an  overview  of  the  machines  that  have  to  be  set  up  next.

The  operations,  which  are  planned  to  be  produced  next,  are  listed.  To  get  a  better  overview,  the  setup

changes that might result from changed tools, materials or colors are identified respectively.

In  addition,  the  setup  change  list  has  been  designed  as  preview  for  (subsequent)  shifts,  which  enables

the responsible persons in the relevant shift to know which machines have to be set up.

Prerequisite

Operations have to be planned exactly with respect to dates to be able to determine setup changes.

Selection criteria

The application provides the following selection criteria:

Date ... until

Shows all planned setup changes (planned operations) that coincide with the selected date range.

The "consider job  end" option (see  below) specifies  which operations are exactly to be taken into

account.

Cost center

Shows the setup changes that are planned on workplaces assigned to the selected cost center.

Workplace

Shows the setup changes that are planned on the selected workplaces.

Group

Shows the setup changes that are planned on the workplaces of the selected groups.

Order category

Shows the setup changes that are planned for orders of the selected order category.

BDE-FST_81.docx

Version: 1.0.18468

Page 11 of 19

Shop Floor Control (MOC)

Consider job end

Generally,  only  planned  operations  assigned  to  the  control  indicators  L,  S,  V  or  U  are  taken  into

account. Subject to the "consider job end" option, the result list and, as a result the table, shows the

following operations:

  The  "consider  job  end"  option  is  NOT  set.  The  list  only  shows  those  operations  the  planned

start  of  which  coincides  with  the  selected  period  of  time.  A  future  selection  period  includes

running  operations  (control  indicator  L),  provided  that  their  planned  start  coincides  with  this

selected period of time.

  The "consider job end" option is set: the below-mentioned operations are considered in addition

to operations the planned start of which coincides with the selection period:

- operations  the  start  of  which  is  prior  to  the  selection  period  and  the  planned  end  of  which

coincides with the selection period

- operations the start of which is prior to the selection period and with the planned end after the

selection  period.  This  applies  to  planned  operations  (control  indicators  S,  V,  U)  as  well  as

running operations (control indicator L).

It can be reasonable NOT to check the "consider job end" option, provided that setup change lists

are to be printed for each shift in advance.

Field Descriptions

In general, if selected by workplace, group and cost center, only operations are selected that are actually

planned  on  a  workplace.  Operations  that  are  within  the  pool  of  groups  are  not  taken  into  account.  In

addition, only operations are selected that are planned on workplaces for the responsibility area of which

the user is authorized.

Remarks on selected columns

Workplace

Shows the workplace on which the OP is currently planned for OPs that are not running (status U or

V). For running OPs, the workplace is displayed to which the OP is currently logged on.

Group

Group to which the workplace is assigned.

Cost center

Cost center to which the workplace is assigned.

BDE-FST_81.docx

Version: 1.0.18468

Page 12 of 19

Shop Floor Control (MOC)

Status

Current operation status. Shows the colored LED as well as the status text.

Article

The value is taken from the operation.

Planned start/planned end

The  planned  dates  can  be  taken  from  the  "order  information"  dialog,  "detailed  planning"  tab,  in

"planned  dates"  – start or  end.  Please  note: the planned  dates  defined during planning are used.

The remaining run time is not considered.

Target duration

The  target  duration  is  determined  as  follows:  (target  quantity  *  target  cycle  /  partitioning  /  1000)  *

performance level of the machine / 100 

Tool

The value is taken from the operation.

Storage location

(Original) storage location that is assigned to the tool. Please note: This information is only provided

if the HYDRA tool and resource management (HYDRA-WRM) module is in use. This info is kept in

the master data of HYDRA-WRM.

Color

The value is taken from the operation.

Addition

The value is taken from the operation.

Planned start (setup date)

Planned setup date; corresponds to the planned start date of the operation.

Change

See below

"Symbol"

See below

BDE-FST_81.docx

Version: 1.0.18468

Page 13 of 19

Shop Floor Control (MOC)

Setup time

Total of the values "setup time" and "additional setup time" at the operation.

M/O rel. setup

Machine/operator relation for setup; the value is taken from the operation.

Setup change column/"symbol":

The  operations  that  are  adjacent  with  respect  to  time  (according  to  the  planned  date)  are

considered, when the value is set in the "change" column. If the value changes in the "tool" field the

"tool" value

 is entered (prio. 1). If the value changes in the "color" field, the "color" value

 is

entered  (prio.  2).  If  the  value  changes  in  the  "article"  field  the  "article"  value

  is  entered  in  the

"change" column (prio. 3).

These values remain even if the user chooses another table sorting that does not correspond to

the sequence of the planned dates.

Toolbar

In general, the parameters for calling the function or target application are taken over from the table. For

this reason, an entry should always be selected before calling an application.

 Order information (orin)

This button opens the application order information.

 Order overview (orov)

This button opens the application order overview.

BDE-FST_81.docx

Version: 1.0.18468

Page 14 of 19

Shop Floor Control (MOC)

4  List of Material Requirements

Summary

Menu

Production control  Planning aid  List of material requirements

Transaction code

mrqli

Function authorization  mrqli

Usage

The list of material requirements is a detail application of production management. It provides a preview

regarding  the  materials  required  at  the  machine.  For  this  reason,  this  application  is  for  employees  in

production that are responsible for timely material staging at the machine.

Depending  on  the  planning  organization,  this  application  can  also  be  used  by  material  dispatchers  who

are responsible for placing material requests at short notice from suppliers based on existing framework

agreements.

The emphasis of this application is clearly the short notice area.

Requirement

Operation  planning  that  adheres  exactly  to  deadlines  is  required  for  the  calculation  of  the  material

requirements.

Selection criteria

The OPs selected are those that are planned in the period (number of days between the start time and

the end) on the (selected) machine (planned start lies in the future) (status V or U) or that are currently

running  on  the  machine  (status  L).  Only  those  OPs  are  considered  for  which  at  least  one  material

component is included in the component list.

In contrast, prepared and interrupted OPs that have a start time that lies in the past are not considered.

The user must explicitly re-plan these OPs because the system does not know when they will run again.

The external processing identifier may not be set on the operation.

In  the  selection  of  workplace,  group  only  those  operations  are  selected  that  are  planned  for  a  certain,

specific  workplace.  Operations  located  in  the  pool  of  groups  are  not  considered.  In  general,  only  those

operations are selected that are planned for  workplaces for which the  user has an  authorization for the

responsibility area.

BDE-FST_81.docx

Version: 1.0.18468

Page 15 of 19

No.  of  days  can  be  used  to  specify  the  time  horizon  for  which  the  material  requirements  are  to  be

Shop Floor Control (MOC)

displayed (maximum 366 days).

The following selection criteria are available in the application:

Order type

The material requirements for the selected order type are displayed.

Order

The material requirements for the selected order are displayed.

Operation

The material requirements for the selected operation are displayed.

Workplace ... to ...

The material requirements for the selected workplace are displayed.

Cost center

The material requirements for the selected cost center are displayed.

Group ... to ...

The material requirements for the selected group are displayed.

Point in time

The material requirements for the period starting at this point in time are displayed.

No of days

Number of days considered.

Field descriptions

Planned start

The planned dates associated with the OP can be found in the order information on the Dates tab

Planned end

To  determine  the  material  requirements,  the  planned  end  is  calculated  using  the  planned  start  +

RRT (taking the shift calendar into consideration). The calculated planned end is not displayed. For

active OPs the first logon time is displayed in the Planned start field.

Remaining run time

Time of production still remaining. This is an arithmetical value that is calculated using a formula,

based on various parameters. The formula is stored with the operation.

Remaining run time*

The  remaining  time  of  production  starting  at  the  start  time  of  the  determination  of  the  material

requirements. In the graph, this time is identified as RRT*.

BDE-FST_81.docx

Version: 1.0.18468

Page 16 of 19

Shop Floor Control (MOC)

Material requirements

The  required  quantity  of  single  components  for  the  respective  shift  day.  A  preview  of  up  to  a

maximum of 366 calendar days is possible.

Detail applications

The  detail  application  material  requirements  provides  a  preview  regarding  the  materials  required  at  the

machines.  The  special  feature  here  is  that  the  material  requirements  for  each  material  are  determined

precisely  per  day  and  in  consideration  of  the  shift  calendar.  In  this  way,  the  material  requirements  are

distributed over the runtime of the OP(s).

"Precisely per day" means: Precisely per shift day, i.e. the day starts at the beginning of shift 1 and ends

with the end of the final shift (e.g. shift 3).

The material requirements are calculated as follows:

Determination of the material requirements

The material requirements for each determined operation are determined as follows:

In the determination of how much material must be available at the workplace  and  when, it  is assumed

that the material must already be available on the planned start date in order to have material for set up

with which the machine settings can be checked, for example.

The  previously  produced  yield  is  subtracted  from  the  target  quantity  of  the  operation.  This  provides  the

remaining quantity.

Now the material requirements per shift day are determined for the remaining quantity.

First,  the  daily  shift  time  for  the  workplace  is  determined  for  which  the  OP  is  planned  or  is  currently

running. If a planning shift model is stored at the workplace (workplace/ machine configuration > HLS tab)

it is used to determine the shift time. Otherwise a "normal" collection shift model is used (General tab).

Then the duration is determined in which the operation runs during this shift time, i.e. this shift day ("target

duration"); the arithmetical time per piece is determined as well. This is calculated from the quotient of the

remaining quantity and the remaining run time (determined based on the RRT formula 1 stored with the

operation and the performance level stored at the workplace).

 Arithmetical time per piece

=

--------------------------

Remaining quantity

RRT

BDE-FST_81.docx

Version: 1.0.18468

Page 17 of 19

Shop Floor Control (MOC)

In the calculation of the remaining run time, the performance level of the workplace/ the machine at which

the operation is planned is taken into consideration. For an assumed remaining run time of 300 minutes,

calculated using the RRT formula, the "gross" remaining run time relevant to the further calculation of the

arithmetical time per piece is at a performance level of 100%: 300 / 100 * 100 = 300 minutes

- at a performance level of 80%: 300 / 80 * 100 = 375 minutes

- at a performance level of 120%: 300 / 120 * 100 = 250 minutes.

A performance level of 0 is evaluated internally as 100%.

Now the target quantity for the OP for this target duration is determined:

Target quantity (per shift day)   =

-------------------------------------

Arithmetical time per piece

Target duration

Based on this target quantity, the material requirements for the individual material components assigned

to the operation are calculated:

Material requirements (per shift day) = Input quantity of the material x target quantity

This  second  point  will  run  for  every  shift  day  over  the  determined  target  duration  of  the  operation.  For

each following shift day, the remaining quantity will be reduced by the target quantity of the previous day.

External processing operations are not considered in this evaluation.

Due to different shift models, the shift times (shift start/ end) per workstation can certainly differ.

However, this is not considered in the representation of the individual days.

This evaluation does not consider operations that are logged on simultaneously, i.e. there is no

proportional distribution of target duration here. In this case, it is recommended that operations

be split.

Toolbar

In general, the parameters for calling the function or target application are taken over from the table. For

this reason, an entry should always be selected before calling an application.

 Order information

This button opens the application order information.

BDE-FST_81.docx

Version: 1.0.18468

Page 18 of 19

Shop Floor Control (MOC)

 Order overview

This button opens the application order overview.

BDE-FST_81.docx

Version: 1.0.18468

Page 19 of 19

