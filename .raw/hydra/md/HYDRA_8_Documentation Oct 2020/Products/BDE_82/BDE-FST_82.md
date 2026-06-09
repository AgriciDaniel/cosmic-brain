Manual

Shop Floor Control
BDE-FST 8.2

Version 1.1.23555

Last changed on: 08.10.2020

Shop Floor Control

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

BDE-FST_82.docx

Version: 1.1.23555

Page 2 of 20

Shop Floor Control

Contents

1  Overview: Shop Floor Control ...................................................................... 4

2  Order sequencing ......................................................................................... 5

3  Setup Change List ...................................................................................... 11

4  List of Material Requirements .................................................................... 16

BDE-FST_82.docx

Version: 1.1.23555

Page 3 of 20

Shop Floor Control

1

 Overview: Shop Floor Control

Purpose

This  component  combines  different  applications  that  support  planning  in  the  area  of  shop  floor  data

collection.

You use the function package if:

  You  want  to  run  simple  sequencing  for  your  machines  and  workplaces  without  reference  to

schedules or without considering capacities,

  You need a list specifying when which order must be set up and  whether in the process a setup

change is made,

  You need an overview indicating on which day how much material is needed.

Integration

Sequencing,  done  in  tabular  form,  specifies  the  processing  sequence  that  is  also  integrated  in  the

sequencing list of the terminal.

The  data  displayed  in  the  setup  change  list  and  in  the  material  requirements  overview  are  based  on

detailed schedule planning performed either in the ERP system or in HYDRA Shop Floor Scheduling.

Features

  Order sequencing

o  Tabular  order  sequencing  for  planning  (sequence  planning)  the  pool  of  orders  for

machine groups and workplace groups without accounting for any capacity restrictions

o  Simple drag and drop assignment of operations to machines and workplaces

  Setup change list

o  Setup change list displaying orders / operations that must be converted during the period

selected. Differentiation by tool change, color change and product change. Display of any

other relevant information (setup time, tool number, workforce requirements, articles etc.)

  Material requirements list

o  Material requirements list with material requirements calculated for the selected machine,

cost center or machine group and the time period selected including daily totals. Display

of any other relevant information about operations, articles to be produced and materials

BDE-FST_82.docx

Version: 1.1.23555

Page 4 of 20

Shop Floor Control

2  Order sequencing

Overview

HYDRA menu

Production control -> Production support -> Order sequencing

FEDRA menu

Detailed scheduling  Planning  Order sequencing

Transaction code

orseq

Function authorization

orseq

Available user fields

Where

Object type/user field key

Source (type)

Table Pool of groups

AUNR/SYSTEM

Table Pool of groups

AGNR/SYSTEM

Table Pool of workplaces

AUNR/SYSTEM

Table Pool of workplaces

AGNR/SYSTEM

Order (MF-D)

Operation (MF-D)

Order (MF-D)

Operation (MF-D)

How can I configure user fields?

Which user field types are available?

Purpose

Order  sequencing  is  a  function  of  production  management.  Use  the  application  to  simply  sequence

workplaces without taking into account any restrictions. You can use  drag & drop to perform planning in

the order sequencing function.

This application is an ideal tool for planners, shift foremen and supervisors. You are provided with simple

means to plan the sequence of operations on machines.

Integration

The application provides funtions for the following tasks:

  Display operations that are stored in relation to a group within the pool.

  Display operations, which have already been planned on workplaces.

  Plan an operation onto a workplace/machine.

  Define  a processing sequence (“sequencing”) that specifies how the operations  to be produced are

displayed in the sequencing list on the terminal

  Re-plan an operation on another workplace or group

  Merge operations

  Split operations

  Lock/unlock operations

BDE-FST_82.docx

Version: 1.1.23555

Page 5 of 20

Shop Floor Control

Restrictions

You  can  plan  workplaces  either  only  via  the  order  sequencing  or  the  graphic  planning  (shop

floor  scheduling).  We  recommend  to  plan  individual  workplace/machine  groups  either  only  by

using the order sequencing or the graphic planning function.

Selection criteria

In general, the function only selects operations that are currently

- not logged on and

- not finished

(The system selects operations with an operation status assigned to the control indicators V, U, S).

Use  selection  parameters  to  restrict  the  pool  of  groups.  But  selection  criteria  do  not  affect  the  pool  of

workplaces/machines.

The application provides the following selection criteria:

Group

Selects operations relating to a machine group

Order type

Selects the order type

Order

Selects an order

Article/item

Selects an article

Article name

Selects an article name/designation

Controlling preceding OP

Selects operations subject to the status of the preceding OP

Order index from ... to

Selects the order index

Priority from ... to

Selects the priority

Scheduled start from ... to ...

Selects the scheduled start of operations

Scheduled end from ... to ...

Selects the scheduled end of operations

BDE-FST_82.docx

Version: 1.1.23555

Page 6 of 20

Shop Floor Control

Earliest start from ... to ...

Selects the earliest start of operations

Earliest end from ... to ...

Selects the earliest end of operations

Check responsibility area

Use this selection option to specify if you want to check the responsibility area of

- the workplace or

- the operation/order

in order to display data. You need the function authorization chkresp to select this option.

Detail application Pool of groups

The "pool of groups" table shows detailed information on individual operations.

Please  note  that  the  responsibility  area  is  not  checked  for  operations  that  are  included  in  the

pool of groups.

Detail application Workplaces

This detail dialog shows the workplaces that are assigned to the currently selected group. If you select a

workplace  in  this  dialog,  the  “pool  of  workplaces”  dialog  shows  the  operations  that  are  planned  on  this

workplace.

The detail application only shows the workplaces meeting the following criteria:

  The planning function is set to the option “planning in order sequencing”

  The workplace is not locked

  The planner is authorized for the responsibility area of this workplace

The following columns are available:

Workplace

Unique identification of the workplace/machine according to configuration

Short name

Short name of the workplace according to configuration

Name (designation)

Workplace name according to configuration

BDE-FST_82.docx

Version: 1.1.23555

Page 7 of 20

Shop Floor Control

Group

Group assigned to the workplace according to configuration

Cost center

Cost center assigned to the workplace according to configuration

Company

Company assigned to the workplace according to configuration

Responsibility area

Responsibility area assigned to the workplace according to configuration

Workplace type

Type of workplace according to configuration:

E = individual workstation; G = group workstation

The  table  is  sorted  by  workplace.  For  technical  reasons,  rearrangement  and  grouping  are  not

supported.

Detail application Pool of workplaces

This detail application shows the operations that are planned for the currently selected workplace. In this

detail application the sort sequence is fixed and cannot be changed.

The system uses a separate, internal algorithm to generate the sort sequence of operations in

the pool of workplaces. The result is stored in special database fields. The  pool of workplaces

shows this result in the time of sorting column.

The  time  of  sorting  does  not  change  if  an  operation  is  logged  on  and  interrupted  later.  The

operation lines up in the list of planned operations according to the time of sorting.

Editing functions

Please  note  that  HYDRA  does  not  perform  any  validation  checks  as  to  whether  the  operation

may be produced on the planned workplace.

Proceed as described below to plan operations (detailed planning):

In  the  pool  of  groups  select  the  operations  you  want  to  plan  on  a  workplace.  Left  click  the

corresponding  entry  to  select  an  operation.  To  select  several  operations  at  once,  click  the  first

operation, press the shift button, hold it and click the last operation. To select specific operations,

press the Ctrl button, hold it and click the required operations.

BDE-FST_82.docx

Version: 1.1.23555

Page 8 of 20

Shop Floor Control

In the pool of workplaces select the workplace where you want to plan operations. On the left

hand side of the pool of workplaces dialog, click the workplace where you want to plan the selected

operations.

Transfer the selected operations to the  pool of workplaces using “drag and drop"  Left click

an  operation  selected  in  the  pool  of  groups,  hold  the  mouse  button  down  and  move  the  mouse

pointer to the right hand area of the pool of workplaces dialog (“drag”) and then release it (“drop”).

Once  you  have  released  the  left  mouse  button,  the  selected  operations  disappear  in  the  pool  of

groups and are now visible in the pool of workplaces.

If necessary, change the sequence of operations planned on the workplace

You can change the sequence of operations planned on the workplace. To do so, drag the selected

operation and drop it above the operation before which you want to plan this selected OP. The sort

function of the table is deactivated as this would contradict the principles of sequencing.

The  server  downloads  operations  to  the  terminals  (sequencing  list).  The  terminal  shows  the

planned  operations  in  the  terminal's  sequencing  list.  The  MOC  application  "order  sequencing"

specifies the sequence of the operations included in this sequencing list.

Toolbar

General index tab

 Order information (function authorization: orin)

This button opens the application Order information.

 Order overview (function authorization: orov)

This button opens the application Order overview.

Entry index tab

  Log on operation (function authorization: op.logon)

Use the log on function to log on operations to the system.

 Partial confirmation (report part quantities; function authorization: op.partconf)

Use the function partial confirmation (report part quantities) to report part quantities for operations.

 Interrupt operation (function authorization: op.interrupt)

Use the function interrupt operation to interrupt operations.

 Log off operation (function authorization: op.logoff)

Use the log off function to log off operations.

BDE-FST_82.docx

Version: 1.1.23555

Page 9 of 20

Shop Floor Control

 Terminate operation (function authorization: op.finish)

Use the terminate function to log off interrupted or prepared operations.

Other functions index tab

 Split operation (function authorization: op.split)

Use the split function to split operations.

 Cancel split operation (function authorization: op.splitrelease)

Use the dissolve split function to cancel splits.

 Generate merged operation (function authorization: op.colopcreate)

Use  the  generate  merged  operation  function  to  summarize  interrupted  or  prepared  operations  in

merged operations.

 Cancel merged operation (function authorization: op.coloprelease)

Use the cancel merged operation function to cancel merged operations.

BDE-FST_82.docx

Version: 1.1.23555

Page 10 of 20

Shop Floor Control

3  Setup Change List

Overview

HYDRA menu

Production control --> Planning aid --> Setup change list

FEDRA menu

Detailed Scheduling  Planning  Setup change list

Transaction code

setli

Function authorization

setli

Available user fields

Where?

Object type/user field key

Source (type)

Setup change list table

AGNR/SYSTEM

Operation (MF-D)

How to configure user fields?

Which user field types are available?

Purpose

The  setup  change  list  provides  the  user  with  an  overview  of  the  machines  to  be  set  up  next.  The

operations listed which are planned in next. Setups, due to material, tool or color changes, are marked to

improve your overview.

In  addition,  the  setup  change  list  has  been  designed  as  preview  for  (subsequent)  shifts,  which  enables

the responsible persons in the shift to know which machines have to be set up next.

Requirements

Operations have to be planned exactly with respect to dates to be able to determine setup changes.

Selection criteria

The application provides the following selection criteria:

Date ... until

Shows all planned setup changes (planned operations) that coincide with the selected date range.

The option "consider job end" option (see below) specifies which operations are exactly to be taken

into account.

Cost center

Shows the setup changes that are planned on workplaces assigned to the selected cost center.

Workplace

Shows the setup changes that are planned on the selected workplaces.

BDE-FST_82.docx

Version: 1.1.23555

Page 11 of 20

Shop Floor Control

Group

Shows the setup changes that are planned on the workplaces of the selected groups.

Order category

Shows the setup changes that are planned for orders of the selected order category.

Consider job end

Generally,  only  planned  operations  assigned  to  the  control  indicators  L,  S,  V  or  U  are  taken  into

account. Subject to the "consider job end" option, the result list and, as a result the table, shows the

following operations:

  The "consider job end" option is set: operations the start of which is prior to the selection period

and the planned end of which coincides with the selection period are displayed. This applies to

planned as well as running operations.

  The "consider job end" option is set: the below-mentioned operations are considered in addition

to  operations  the  planned  start  of  which  coincides  with  the  selection  period:  - operations  the

start of which is prior to the  selection period and the planned end of which coincides with the

selection period

- operations the start of which is prior to the selection period and with the planned end after the

selection  period.  This  applies  to  planned  operations  (control  indicators  S,  V,  U)  as  well  as

running operations (control indicator L).

It can be reasonable NOT to check the "consider job end" option, provided that setup change lists

are to be printed for each shift in advance.

Field descriptions

In general, if selected by workplace, group and cost center, only operations are selected that are actually

planned  on  a  workplace.  Operations  that  are  in  the  pool  of  groups  are  not  selected.  In  addition,  only

operations  are  selected  that  are  planned  on  workplaces  for  the  responsibility  area  of  which  the  user  is

authorized.

Remarks on selected columns

Workplace

Shows the workplace where the OP is currently planned for OPs that are not running (status U or

V). For running OPs, the workplace is displayed where the OP is currently logged on.

BDE-FST_82.docx

Version: 1.1.23555

Page 12 of 20

Shop Floor Control

Group

Group to which the workplace is assigned.

Cost center

Cost center to which the workplace is assigned.

Status

Current operation status. Shows the colored LED as well as the status text.

Article

The value is taken from the operation.

Planned start/planned end

The planned dates can be taken from the order information, tab Detailed Planning, under Planned

Dates - Start or End. Note: the planned dates as per planning are used; the remaining run time is

not taken into account.

Target duration

The target duration is calculated as follows: (target quantity * target cycle / part / 1000) * machine

efficiency / 100 

Tool

The value is taken from the operation.

Storage location

(Original) storage location that is assigned to the tool. Please note: This information is only provided

if the HYDRA tool  and resource management (HYDRA-WRM) module is in  use  and edited in this

master data.

Current storage location

Storage location that the tool is assigned to on the basis of its logon as a resource of type WNR.

The material buffer that is assigned to the workplace in the workplace/resource configuration as the

upstream material buffer is used as the storage location.

Note: The assignment is only done in case of using the HYDRA Tool and Resource Management

(WRM).

Color

The value is taken from the operation.

BDE-FST_82.docx

Version: 1.1.23555

Page 13 of 20

Shop Floor Control

Addition

The value is taken from the operation.

Planned start (setup date)

Planned setup date; corresponds to the planned start date of the operation.

Change

See below.

"Symbol"

See below.

Setup time

Total of the values "setup time" and "additional setup time" at the operation.

M/O rel. setup

Machine/operator relation for setup; the value is taken from the operation.

Table setup change, symbol

When  setting  the  value  in  the  Setup  Change  column,  the  neighboring  operations  are  evaluated

(according to the planned start date).





If the value in the Tool field changes, the value "Tool" and the symbol are entered.

If  the  value  in  the  Tool  field  does  not  change,  but  the  value  in  the  Color  field  does,  then  the

"Color" value and the icon are entered.



If  the  value  in  the  Tool  and  Color  fields  does  not  change,  but  the  value  in  the  Material  field

does, then the value "Material" and the symbol are entered.

 .



If the value in the Tool, Color and Material fields  does not change, but the value in the Article

field does, then the value "Article" and the icon will be entered.

  The symbol for "Article" and

"Material" is the same.

These  values  remain  even  if  the  user  chooses  another  table  sorting  that  does  not

correspond to the sequence of the planned dates.

The fields described above are the fields that are directly adjacent to the operation.

BDE-FST_82.docx

Version: 1.1.23555

Page 14 of 20

Toolbar

When you call a function or target application, the parameters of the table are always transferred. For this

reason, always select an entry to call an application.

Shop Floor Control

 Order information (function authorization: orin)

Use this button to call the application Order information.

 Order overview (function authorization: orov)

Use this button to call the application Order overview.

BDE-FST_82.docx

Version: 1.1.23555

Page 15 of 20

Shop Floor Control

4  List of Material Requirements

Overview

HYDRA menu

Production control  Planning support  List of material requirements

FEDRA menu

Detailed scheduling  Planning  Material requirements list

Transaction code

mrqli

Function authorization  mrqli

Purpose

The  List  of  material  requirements  is  an  application  of  the  production  management.  The  application

provides  a  preview  of  the  materials  required  at  the  machines.  This  application  therefore  addresses

employees in production who are responsible for material staging at machines in due time.

Depending on how planning is organized, material dispatchers who are responsible for calling off material

from suppliers with framework contracts at short-term can also use this application.

This application therefore clearly focuses on short-term activities.

Requirements

Operations must be scheduled accurately in order to calculate material requirements.

Selection criteria

The system selects the operations if the following conditions are true:

  Operations with the status "prepared" or "interrupted" are planned for the (selected) machines. Their

planned start time is in the future and between the specified Point in time (in the future) and the end

time after the specified No. of days.

  Operations with status "running" are logged on to the (selected) machines.

Only those operations are selected whose component list includes at least one material component.

Prepared  and  interrupted  operations  are  not  selected  if  their  start  time  is  in  the  past.  In  this  case,  the

system does not know when these operations will be active again.

The system neither selects operations where the option External processing OP is enabled.

BDE-FST_82.docx

Version: 1.1.23555

Page 16 of 20

Shop Floor Control

If  you select by  Workplace or Group,  the system only selects operations that  are planned for a specific

workplace.  Operations  that  are  integrated  in  the  pool  of  groups  (backlog  for  machine  group)  are  not

selected.  In  general,  the  system  identifies  the  responsibility  area  the  user  is  authorized  for  and  only

selects the operations that are planned for workplaces of this responsibility area.

The application provides the following selection criteria:

Order type

The application displays the material requirements of the selected order type.

Order

The application displays the material requirements of the selected order.

Operation

The application displays the material requirements of the selected operation.

Workplace ... to ...

The application displays the material requirements of the selected workplace.

Cost center

The application displays the material requirements of the selected cost center.

Group ... to ...

The application displays the material requirements of the selected group.

Date and time

The application displays the material requirements from the specified point in time.

Number of days

Use  the  No.  of  days  option  to  specify  the  time  horizon  (in  calendar  days).  The  material

requirements for the specified time are then displayed (maximum 365 days).

Field descriptions

Planned start

The planned dates of the operation are defined in the Order information, tab Dates.

Planned end

The  planned  end  is  calculated  using  the  planned  start  +  remaining  run  time  (using  the  shift

calendar) to calculate the material requirements. The calculated planned end is not displayed.

 For running OPs, the field Planned start shows the first logon time.

Remaining run time

Shows  the  remaining  production  time.  The  remaining  run  time  is  a  calculated  value.  The  system

uses  different  parameters  and  a  formula  to  calculate  the  value.  The  formula  is  stored  for  the

operation in field Formula RRT1.

BDE-FST_82.docx

Version: 1.1.23555

Page 17 of 20

Shop Floor Control

Remaining run time*

The remaining production time from start time of the material requirements calculation. In the graph,

this time is identified as RRT*.

Material requirements

The quantity of the single component that is required on the relevant shift day. A preview of up to a

maximum of 365 calendar days is possible.

Detail application

The  detail  application  Material  requirements  provides  an  overview  of  the  materials  required  at  the

machines. The material requirements of each material are exactly calculated for each day using the shift

calendar.  The  detail  application  therefore  shows  the  distribution  of  the material  requirements  during  the

runtime of the OP(s).

"For each day" means: the calculation is made for each shift day, i.e. the day starts at the beginning of

shift 1 and ends with the end of the last shift (e.g. shift 3).

The  calculation  of  the  material  requirements  per  shift  day  is  described  in  section  "Calculation  of  the

material requirements".

The application only shows the material components if the following is true:

𝑁𝑢𝑚𝑏𝑒𝑟 𝑜𝑓 𝑑𝑎𝑦𝑠

( ∑ Material requirements (per shift day)

) > 0

1

This evaluation does not integrate External processing OPs.

Because  of  different  shift  models,  the  shift  times  (shift  start/end)  can  be  different  for  each

workplace.  The  application  does  not  integrate  these  different  shift  times  when  displaying  the

separate shift days.

The  evaluation  does  not  integrate  operations  that  are  logged  on  at  the  same  time.

Consequently,  the  target  duration  is  not  calculated  proportionately.  Recommendation:  do  not

log on an operation in parallel to different workplaces, but split the operation instead.

Toolbar

When  you  call  a  function  or  target  application,  the  parameters  included  in  the  table  are  used.  For  this

reason, always select an entry to call an application.

BDE-FST_82.docx

Version: 1.1.23555

Page 18 of 20

Shop Floor Control

Order information

Use this button to call the application Order information.

Order overview

Use this button to call the application Order overview.

  Modify resource status (function authorization: op.resstatchg)

Function to change the resource status of an operation

Calculation of material requirements

When the system calculates when and how much material must be available at the workplace, the system

uses  the  planned  start  date.  The  material  must  be  available  at  this  start  date.  The  material  must  be

available during setup to check machine settings, for example.

Using the selection criteria specified, the system calculates the material requirements for each operation

as follows:

1.  Calculation of the remaining quantity of the operation:

𝑟𝑒𝑚𝑎𝑖𝑛𝑖𝑛𝑔 𝑞𝑢𝑎𝑛𝑡𝑖𝑡𝑦 =   𝑡𝑎𝑟𝑔𝑒𝑡 𝑞𝑢𝑎𝑛𝑡𝑖𝑡𝑦 (𝑃)𝑂𝑃 − 𝑦𝑖𝑒𝑙𝑑 (𝑃)𝑂𝑃

2.  Calculation  of  the  remaining  run  time  of  the  operation  using  the  Formula  RRT1  stored  for  the

operation. The performance level of the workplace where the operation is planned is used to calculate

the remaining run time.

Example: If the remaining run time is 300 minutes (calculated using the remaining run time formula),

the remaining run time relevant for further calculation is

- with a performance level of 100%: 300 / 100 * 100 = 300 minutes

- with a performance level of 80%: 300 / 80 * 100 = 375 minutes

- with a performance level of 120%: 300 / 120 * 100 = 250 minutes.

A performance level of 0 is internally regarded as 100%.

3.

Identification of the calculated time per piece:

𝑐𝑎𝑙𝑐𝑢𝑙𝑎𝑡𝑒𝑑 𝑡𝑖𝑚𝑒 𝑝𝑒𝑟 𝑝𝑖𝑒𝑐𝑒 =

𝑟𝑒𝑚𝑎𝑖𝑛𝑖𝑛𝑔 𝑟𝑢𝑛 𝑡𝑖𝑚𝑒 𝑜𝑓 𝑜𝑝𝑒𝑟𝑎𝑡𝑖𝑜𝑛
𝑟𝑒𝑚𝑎𝑖𝑛𝑖𝑛𝑔 𝑞𝑢𝑎𝑛𝑡𝑖𝑡𝑦 𝑜𝑓 𝑜𝑝𝑒𝑟𝑎𝑡𝑖𝑜𝑛

BDE-FST_82.docx

Version: 1.1.23555

Page 19 of 20

Shop Floor Control

4.  Calculation of the time per shift day for the workplace where the operation is planned or currently

logged on. This calculated time is also referred to as target time.

If  a  planned  year  model  is  stored  for  the  workplace  (go  to:  Workplace/resource  configuration  >  tab

Workplace configuration > field Planned year model), this planned year model is used to identify the

shift  days.  Otherwise  the  shift  model  used  for  data  collection  is  used  (go  to:  Workplace/resource

configuration < tab Workplace configuration > field Year model).

5.  Calculation of the quantity to be produced on each shift day. This calculated quantity is also referred

to as target quantity.

𝑡𝑎𝑟𝑔𝑒𝑡 𝑞𝑢𝑎𝑛𝑡𝑖𝑡𝑦 (𝑝𝑒𝑟 𝑠ℎ𝑖𝑓𝑡 𝑑𝑎𝑦) =

𝑡𝑎𝑟𝑔𝑒𝑡 𝑡𝑖𝑚𝑒
𝑐𝑎𝑙𝑐𝑢𝑙𝑎𝑡𝑒𝑑 𝑡𝑖𝑚𝑒 𝑝𝑒𝑟 𝑝𝑖𝑒𝑐𝑒

6.  Calculation of material requirements for each shift day and for each material component assigned

to the operation:

𝑚𝑎𝑡𝑒𝑟𝑖𝑎𝑙 𝑟𝑒𝑞𝑢𝑖𝑟𝑒𝑚𝑒𝑛𝑡𝑠 (𝑝𝑒𝑟 𝑠ℎ𝑖𝑓𝑡 𝑑𝑎𝑦) =  𝑖𝑛𝑝𝑢𝑡 𝑞𝑢𝑎𝑛𝑡𝑖𝑡𝑦 𝑜𝑓 𝑚𝑎𝑡𝑒𝑟𝑖𝑎𝑙  ∗ 𝑡𝑎𝑟𝑔𝑒𝑡 𝑞𝑢𝑎𝑛𝑡𝑖𝑡𝑦 (𝑝𝑒𝑟 𝑠ℎ𝑖𝑓𝑡 𝑑𝑎𝑦)

Step  4  to  6  are  carried  out  for  each  shift  day  where  the  operation  is  planned.  For  each  shift  day  that

follows, the system reduces the remaining quantity by the target quantity of the previous day.

BDE-FST_82.docx

Version: 1.1.23555

Page 20 of 20

