Manual

Detailed Scheduling/ Shop
Floor Scheduling
HLS-FPL 8.1

Version 1.0.23049

Last changed on: 01.09.2020

Detailed Scheduling/ Shop Floor Scheduling

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

HLS-FPL_81.docx

Version: 1.0.23049

Page 2 of 41

Detailed Scheduling/ Shop Floor Scheduling

Contents

1  Übersicht Feinplanung / Leitstand ............................................................... 4

2  Planning Profiles .......................................................................................... 7

3  Planning Variants ....................................................................................... 10

4

Individual shift/assignment times ............................................................... 13

5  KPI ............................................................................................................. 17

6  Automatic Assignment ............................................................................... 24

6.1  Automatic assignment ....................................................................................... 24

6.1.1  Specification of the assignment order .................................................... 26

6.1.2  Controlling capacity selection ................................................................ 26

6.1.3  Complete assignment of planning board ................................................ 28

6.2  Planning strategies/priority rules ........................................................................ 28

6.2.1  Rule-based machine scheduling ............................................................ 29

6.2.2  Variable machine assignment ................................................................ 29

6.2.3  Target-oriented machine assignment .................................................... 30

6.3  Other notes ....................................................................................................... 30

7  Scheduling ................................................................................................. 32

8  Lead Time Scheduling ............................................................................... 33

8.1  Procedure ......................................................................................................... 33

8.2  Reduction measures ......................................................................................... 36

8.3  Executing lead time scheduling ......................................................................... 37

9  Reduction Strategies .................................................................................. 39

10  Transport Matrix ......................................................................................... 40

HLS-FPL_81.docx

Version: 1.0.23049

Page 3 of 41

Detailed Scheduling/ Shop Floor Scheduling

1

 Übersicht Feinplanung / Leitstand

Purpose

Production  companies  generally  use  an  ERP  system  to  manage  their  internal  resources.  This  kind  of

resource management is based on planning data and master data. In this case, current information from

the production process is only available in the form of order confirmations in the sense of partial or final

confirmations  including  quantities  produced  and  times  accumulated.  Specific  planning  information  like

availability of personnel, tool availability, machine downtimes or mechanical breakdowns is not available

here  and  can  also  not  be  used  for  daily  planning,  which  is  the  prerequisite  for  maximum  capacity

utilization and therefore, at the same time, a competitive factor.

The information required for daily planning is available in data entry systems (BDE) close to production.

Based on this proximity to production, we can conclude that detailed scheduling should be performed as

a  sub  function  of  production  planning  and  controlling  at  the  "shop  floor"  level,  that  is  in  the  data  entry

system that is close to production.

The  data  entry  system  HYDRA  shop  floor  scheduling  satisfies  this  requirement  and  combines  the  ERP

level  with  the  process  level.  The  basis  for  detailed  scheduling  in  HYDRA  shop  floor  scheduling  is  the

rough scheduling performed by the ERP system (MRP II run) and the current information from business

data entry (BDE).

The  following  illustration  shows  HYDRA  shop  floor  scheduling  in  the  system  environment  of  production

planning and controlling and also data entry:

HLS-FPL_81.docx

Version: 1.0.23049

Page 4 of 41

Detailed Scheduling/ Shop Floor Scheduling

In this environment the shop floor scheduling module assumes the following functions:

  Orders are transferred (production, repair and maintenance orders) to the planning board

  Planning is executed based on current process data (availabilities, disturbances, etc.)

  When the operation is scheduled it is given a start and end time (planned start and planned end)

  The schedule is released and automatically transferred to sequencing in the production process

  Planning data is uploaded to the ERP system

Current planning information from business data entry is displayed in HYDRA shop floor scheduling or it

impacts the planning situation.

Thus,  any  disturbances  posted  or  automatically  entered  in  production  are  indicated  as  color-coded

workplaces/machines in the HLS. In addition, the graphical presentations of order duration are shortened

or extended as a result of the input of the latest quantity information. The current order and machine data

are retrieved from the HYDRA database and made available in shop floor scheduling, thus depicting the

current production situation.

The  modifications  implemented  to  order  data  in  HYDRA  shop  floor  scheduling  are  not  transferred  to

sequencing at the respective workplace until the schedule is confirmed by saving it.

Implementation considerations

You use the function package if:

  You would like to run capacity planning for your workplaces and machines,

  You would like to perform a sequencing within your workplaces and machines.

Integration

The  ability  to  seamlessly  integrate  HYDRA  shop  floor  scheduling  into  order,  plant  and  machine  data

collection allows direct insight into current production results such as order progress, produced yield and

scrap  quantities  as  well  as  machine  downtimes  –  a  critical  aspect  that  assures  that  current  planning  is

always compared to the actual status.

Furthermore, HYDRA shop floor scheduling is linked with the following components, among others, tool

and resource management (WRM), for example.

Features

This component provides special basic functions that are accessed by the functions of other components.

It

  Calculates remaining runtime

HLS-FPL_81.docx

Version: 1.0.23049

Page 5 of 41

Detailed Scheduling/ Shop Floor Scheduling

o  Visualizes  order  progress

(bar

length)  by  dynamically  calculating  processing

time/remaining  run  time  using  predefined  formulas.  Accounts  for  the  performance  level

defined at the workplace.

  Accounts for current confirmations

o  Processes current BDE uploads (operation status, quantities entered).

o  Processes current uploads from the MDE (machine states).

  Takes predecessor/successor relationships into account

o  Considers  predecessor/successor  relationships  of  linked  operations  within  a  multi-level

production order (order network).

  Accounts for shift calendars

o  Accounts  for  the  availability  of  machines  and  workplaces  based  on  a  shift  calendar

assigned to them.

  Performs automatic assignment

o  Automatically  dispatches  the  operations  transferred  from  the  ERP  system  taking  into

account planning strategies and/or priority rules.

  Calculates key performance indicators

o  Calculates  key  performance  indicators  used  to  assess  scheduling  (e.g.  total  number  of

delays, setup times, machine utilization).



Is an order / operation pool

o  Stages an order / operation pool with reference to deadlines and durations



Is a planning profile

o  Takes various planning profiles into account.

HLS-FPL_81.docx

Version: 1.0.23049

Page 6 of 41

Detailed Scheduling/ Shop Floor Scheduling

2  Planning Profiles

Overview

Menu

Master data  Production control  Planning profiles

Transaction code

Plprof

Function authorization

Plprof

Purpose

You use this function to create or modify planning profiles in the system.

Integration

By  using  planning  profiles,  you  can  narrow  down  the  data  displayed  in  the  different  planning  functions

(e.g. workplaces, staff).

  Graphic planning (transaction grap)

  Graphic order sequencing (transaction graps)

  Workplace assignment (transaction wpas)

Requirements

You  have  structured  the  workplaces  to  be  planned  based  on  capacity  groups  and  set  them  up  in  the

system.

Selection criteria

The application provides the following selection criteria:

User

User  name  for  whom  the  planning  profiles  that  were  configured  beforehand  are  to  be  displayed.

You can also run a search using wildcards.

Global planning profiles are not shown if you select a specific user.

Planning profile

Name of the planning profile to be searched. You can also run a search using wildcards.

Field descriptions

User

User  for  whom  the  subsequent  capacity  group  is  to  be  assigned  or  has  been  assigned  in  the

planning profile.

HLS-FPL_81.docx

Version: 1.0.23049

Page 7 of 41

Detailed Scheduling/ Shop Floor Scheduling

You can leave this field empty if the modification PLPROF-GLOBAL has been enabled.

This is a global planning profile that can be selected for every user.

Profile

Name of the planning profile.

You cannot use names in global and user-specific planning profiles.

Selection

You  can  assign  different  objects  to  a  planning  profile  subject  to  the  application  and  its  product

version:

Application

Modification

Graphic planning

Graphic planning

Group

PLPROF-MNR

Group, workplace

If you assign single workplaces to a
planning profile, the dialog still
shows the group the workplaces
belong to.

Graphic order sequencing

Group

Workplace assignment

Workplace assignment

PLPROF-MNR

For workplaces: group
For staff: area, cost center, department,
employee subgroup, employment
relationship, person

For workplaces: workplace, group
For staff: area, cost center, department,
employee subgroup, employment
relationship, person

Value

Subject to the selection made, you have to enter the relevant value in this field.

If you select "group", it might be a capacity group configured as bottleneck or throughput capacity.

In  general,  the  graphic  planning  board,  graphic  order  sequencing  or  workplace  assignment  only

shows the workplaces for which you are authorized via the responsibility.

Order

This field specifies the order of groups in the graphic planning board.

We  strongly  advise  to  input  data  in  this  field,  because  the  order  of  groups  might

otherwise be arbitrary. Ideally, you should use intervals of 10.

If  the  modification  PLPROF-MNR  is  enabled,  the  value  defined  for  the  workplaces

specifies the order of groups when you assign workplaces to a planning profile.

HLS-FPL_81.docx

Version: 1.0.23049

Page 8 of 41

Detailed Scheduling/ Shop Floor Scheduling

Within  a  group,  you  can  sort  workplaces  by  using  the  “position”  field  of  the  group

assignment.

The following options are only relevant for the graphic planning board:

Visible in shop floor planning

This field specifies if the current group is shown when selecting a planning profile.

Show workplaces without responsibility area authorization

This  option  shows  the  workplaces  of  the  selected  group  in  the  Shop  Floor  Scheduling  module

although the user does not have the required responsibility area authorization.

Allow planning without responsibility area authorization

When resolving conflicts occurred during manual planning, this option moves an operation for which

the  user  does  not  have  the  responsibility  area  authorization.  You  cannot  shift  the  operation

manually; rather shifting can only be done as a means of resolving conflicts.

HLS-FPL_81.docx

Version: 1.0.23049

Page 9 of 41

Detailed Scheduling/ Shop Floor Scheduling

3  Planning Variants

Overview

Menu

Master data  Production control  Planning variants

Transaction code

plvar

Function authorization  mdplvar

Purpose

Use this function to create or modify planning variants in the system.

Integration

A planning variant combines specific settings that are relevant for the planning. The settings included in a

planning variant are usually used by the function Automatic assignment.

Requirements

The Priority rule used is defined in the system.

Selection criteria

The application provides the following selection criteria:

Planning variant

Enter  the  required  search  criterion  to  search  for  a  planning  variant.  Please  note  case  sensitivity.

You can also use wildcards.

Personal

This checkbox is a "tri-state" checkbox that can have three different states:

 Only those planning variants are selected that are not identified as personal.

 Only those planning variants are selected that are identified as personal.

 All planning variants are selected.

Field descriptions

Planning variant

Name of the planning variant

Comment

Comment

HLS-FPL_81.docx

Version: 1.0.23049

Page 10 of 41

Detailed Scheduling/ Shop Floor Scheduling

Owner

User name of the owner of the variant.

Personal

If a planning variant is identified as personal,  only the person who created this variant can use or

edit it.

Planning lead time

Period of time that the planning function identifies as lead time; result: no assignment is made. The

period of time specified is the minimum time that is required to implement a planning.

Planning time fence

After  an  automatic  scheduling  run,  the  system  automatically  fixes  the  operations  that  start  in  the

specified planning time fence if the relevant option is enabled in the HLS settings. This means that

the planning time fence must not be larger than the planning horizon.

Priority rule

You  can  select  a  strategy  for  the  automatic  planning.  You  can  select  from  preconfigured  rules

(HLS-RBM) and self-configured rules (HLS-VMB; HLS-ZMB). The following preconfigured rules are

available:

-

Lowest setup costs: to calculate the setup costs, setup time + teardown time are totaled (dynamic

setup times are not integrated).

-  Shortest operation time: operation time = setup time + processing time + teardown time

-  Shortest  remaining  processing  time:  the  remaining  processing  time  is  calculated  using  the

remaining run time formula stored for the OP.

-

-

Longest operation time: operation time = setup time + processing time + teardown time

Longest  remaining  processing  time:  the  remaining  processing  time  is  calculated  using  the

remaining run time formula stored for the OP.

Displacement to the left

In case of an automatic planning of operations, this option can specify different start dates for the

scheduling. Condition: The start of the operation must be within the planning horizon.

If  this  option  is  disabled,  then  the  scheduled  start  date  will  be  the  earliest  possible  date  (forward

scheduling) or the latest possible start date (backward scheduling).

If the option is enabled, the "left shift" is activated and the scheduled start date is set to "now" plus

planning lead time. In other words, an attempt is made to plan the operation as early as possible.

This option ignores the scheduling result, i.e. you can plan the operation before the

earliest  start  date.  If  the  scheduling  is  performed  in  the  higher-level  system,  we

recommend to disable this option.

HLS-FPL_81.docx

Version: 1.0.23049

Page 11 of 41

Detailed Scheduling/ Shop Floor Scheduling

Capacity selection

The Capacity selection controls for which capacity, i.e. workplace, the operation is planned that is next in

the queue and must be planned next.

The first free capacity

The capacity that is available first in terms of time.

Capacity having the most "capacity"

Selects the capacity that provides the most available capacity with respect to the planning horizon.

Capacity having the least "capacity"

Selects the capacity that provides the least available capacity with respect to the planning horizon.

Shortest processing time

Selects  the  capacity  where  the  processing  time  is  the  shortest  (calculation  includes  the

performance level).

Note: This is important with production variants because the values to calculate the process times

can change. The capacity that is available first in terms of time.

Shortest total setup time (static + dynamic)

This  rule  for  capacity  selection  integrates  the  static  and  dynamic  setup  time  when  assigning

operations  to  a  workplace.  If  this  option  is  set,  the  system  always  assigns  the  operation  to  the

workplace  where  the  total  of  static  and  dynamic  setup  time  is  the  lowest.  If  two  machines  have

identical  setup  times,  the  system  selects  the  workplace  with  the  number  that  comes  first  in

alphanumeric order.

Shortest static setup time

Selects the capacity where the static setup time is the shortest.

Highest priority

If  this  option  is  set,  this  rule  for  capacity  selection  uses  the  priority  of  the  production  variant

(assigned to the relevant workplace) to assign an operation to a workplace.

If you do not use production variants, all workplaces have the same priority. The system selects the

workplace that provides available capacities first. If two workplaces (production variants) have the

same  priority,  the  system  selects  the  workplace  that  provides  available  capacities  first.  If  two

workplaces  provide  available  capacities  at  the  same  time,  the  system  selects  the  workplace  with

the  number  that  comes  first  in  alphanumeric  order.  If  there  are  two  production  variants  using

different tools, the system selects the production variant using the tool with the number that comes

first in alphanumeric order.

Note:  The  higher  the  priority  value  of  a  production  variant,  the  greater  the  probability  that  this

variant is used.

HLS-FPL_81.docx

Version: 1.0.23049

Page 12 of 41

Detailed Scheduling/ Shop Floor Scheduling

4

Individual shift/assignment times

Overview

Menu

Production control  Preparations for production  Individual shift/assignment times

Transaction code

mdistmf

Function authorization  mdistmf.*

Purpose

You  can  define  individual  shift/assignment  times  within  the  Graphic  planning  and  the  Workplace

assignment  and  specify  for  a  workplace  within  a  specific  period  of  time,  whether  this  time  is  to  be

considered as working time or idle time.

This  enables  short-term  modifications  with  respect  to  the  availability  of  workplaces,  without  having  to

change the planned shift model.

This  application  manages  times  without  shift  or  shift  times  that  have  been  assigned  to  one  or  several

workplaces within the functions Graphic planning or Workplace assignment.

Integration

Normally,  individual  shift/assignment  times  are  directly  defined  by  the  corresponding  functionality

provided in the Graphic planning or the Workplace assignment.

These  individual  shift/assignment  times  do  not  affect  collection  and  posting  within  the

scope of shop floor data collection.

Requirements

The product group Graphic planning or Workplace assignment is in use.

Selection criteria

The application provides the following selection criteria:

Group

You can restrict the entries to a specific group by using this combo box.

Workplace

Enter a workplace to view only entries for this workplace.

HLS-FPL_81.docx

Version: 1.0.23049

Page 13 of 41

Detailed Scheduling/ Shop Floor Scheduling

Period from

Optionally,  you can use this input field to enter the beginning of a period as of which you want to

display the entries in the application.

Working time

This option selects

times without shift only

working times only

both times

Please  note  that  3  states  are  available  with  this  checkbox.  If  you  require  data  that  is

missing, have a look at the checkbox setting. We recommend to set the checkbox to the

option

.

Active

You  can  enable/disable  individual  shift/assignment  times.  The  Graphic  planning  does  not  include

disabled entries.

Please  note  that  3  states  are  available  with  this  checkbox.  If  you  require  data  that  is

missing, have a look at the checkbox setting. We recommend to set the checkbox to the

option

.

Field descriptions

Workplace

Workplace for which the entry (individual shift/assignment time) has been created.

Group

Group of the workplace for which the entry (individual shift/assignment time) has been created.

Period from

Point in time when the individual shift/assignment time begins.

Period until

Point in time when the individual shift/assignment time ends.

Working time

This option describes, if it is

a time without shift

working time.

If it is not working time, but a time without shift, the workplace capacity is not available during this

period. Therefore, you cannot plan an operation.

HLS-FPL_81.docx

Version: 1.0.23049

Page 14 of 41

Detailed Scheduling/ Shop Floor Scheduling

Active

You  can  enable/disable  individual  shift/assignment  times.  The  Graphic  planning  does  not  include

disabled entries.

We recommend to set this option in general to

.

Comment

You can store a short comment for this individual shift time including further details.

In  the  Graphic  planning,  you  can  additionally  specify  a  color  for  the  time  without  shift  when

defining an individual shift/assignment time.

In  the  Graphic  planning,  you  can  display  the  comment  that  is  stored  for  an  individual  shift  in  the

tooltip of the corresponding individual shift (as of HLS 8.2). Enable (disable) the tooltip using an INI

data entry.

  Name: HLS

  Section: SCHEDULING

  Key: DISPLAY_TOOLTIP_FOR_ISTMF

  Value: J

  Active: [selected]

If  you  enable  the  tooltip  display,  the  presentation  color  of  times  without  shift  changes  in  the

Graphic  planning.  In  addition,  the  workplace  bars  are  displayed  one  level  before  the  times

without shift.

Editing functions

Use the available buttons to create or edit individual shift/assignment times.

Only one entry can exist at a workplace for each period. If you make an entry and the system detects that

an entry already exists for this period, you can either delete the previous entry or cancel this entry.

HLS-FPL_81.docx

Version: 1.0.23049

Page 15 of 41

Detailed Scheduling/ Shop Floor Scheduling

If multiple individual shift times exist, this dialog is opened for each existing shift time, and the user can

decide whether or not to delete the entries.

Please be careful not to define overlapping periods for one workplace.

These  additional  shift  times  are  only  used  in  Shop  Floor  Scheduling,  not  as  part  of  data

collection.

The  user  can  only  change,  view  and  delete  machines  that  belong  to  the  responsibility  area

he/she is authorized for.

HLS-FPL_81.docx

Version: 1.0.23049

Page 16 of 41

Detailed Scheduling/ Shop Floor Scheduling

5  KPI

Overview

Menu

Master data  Production control  Key figures

Transaction code

plkeyf

Function authorization  mdplkeyf

Purpose

You use the function Key figures if you want to define further key figures that are based on the basic key

figures available in the system.

Integration

You can use key figures to evaluate an existing planning.

HLS-FPL_81.docx

Version: 1.0.23049

Page 17 of 41

Detailed Scheduling/ Shop Floor Scheduling

The  individual  key  figures  are  available  in  the  Graphic  planning  if  the  option  Use  is  enabled  for  the

respective key figure. For a description on how the key figures are shown in the Shop Floor Scheduling

module, here.

When the different planning versions are saved, the key figures are also saved. You can later on compare

the saved planning versions with respect to the key figures.

Selection criteria

The application provides the following selection criterion:

KPI

Configured key figure. You can also use wildcards.

Field descriptions

KPI

Name of the key figure

Comment

Text field including further information on the key figure.

Use

If  the  option  Use  is  set,  the  key  figure  is  available  in  the  Graphic  planning. When  the  planning  is

saved, the key figure is saved with the planning (Save planning as).

Responsibility area

You use the responsibility area to control the access to the key figure.

Note: This field is not available in the table.

Assessment

This option specifies if a calculated key figure is better if its value is smaller (e.g. setup costs) or if

its value is greater (e.g. utilization). This setting is used in the application Saved planning to specify

the respective color.

Note: This field is not available in the table.

HLS-FPL_81.docx

Version: 1.0.23049

Page 18 of 41

Detailed Scheduling/ Shop Floor Scheduling

Editing function

To create a new key figure, proceed as follows:

1.  Click the button Insert to call the dialog.

2.  Enter the required data in the dialog.

3.  Save the dialog.

4.  Select the new entry in the table and click the button Edit to call the editing dialog.

5.  Specify a weighting for each basic key figure, which is used to calculate the new key figure. Save the

dialog. The basic key figures and their calculation are described in the following paragraph.

Note: When you have created or edited a key figure, you must reload the planning board.

The weightings are without dimension, but internally they are scaled to 100%. Examples:

1.  Utilization, value = 50

Setup costs, value = 50. Both key figures are each weighted with 50%.

2.  Utilization, value = 1

Setup costs, value = 3

HLS-FPL_81.docx

Version: 1.0.23049

Page 19 of 41

The

utilization

is  weighted  with

25%

and

the

setup

costs  with

75%.

Detailed Scheduling/ Shop Floor Scheduling

Basic key figures

You  can  use  key  figures  to  evaluate  a  planning.  To  evaluate  a  planning,  the  system  only  uses  the

workplaces that are loaded in the current planning scenario.

By  default,  HYDRA  provides  the  following  key  figures  (basic  key  figures).  If  you  create  your  own  key

figures, you can use the majority of these basic key figures.

Planned start and planned end of an operation  are always recalculated in the planning board.

The times can be different to the entries "planned start/end" in the order information dialog.

Capacity key figures

HLS-FPL_81.docx

Version: 1.0.23049

Page 20 of 41

Detailed Scheduling/ Shop Floor Scheduling

Overall capacitiy

Total of the durations of all operations that can be planned for a machine/workplace in the specified

planning  horizon  (maximum  number).  The  parameters,  which  specify  the  number  of  possible

operations,  are  defined  in  the  workplace  configuration  (workplace  type,  year  model,  logon  of

several OPs, etc.).

Usage

Total  of  the  occupancy  times  of  all  operations  in  the  planning  horizon.  The  occupancy  time  of  an

operation is identified as follows: planned end - planned start

Utilization rate

Ratio  of  the  key  figures  "Utilization"  and  "Overall  capacity".  The  utilization  rate  specifies  the

percentage of time a machine/workplace is utilized.

Evaluated utilization

Total of the occupancy times of all workplaces multiplied by the standard rate of the machine. The

standard rate of the machine is defined in the machine/workplace configuration.

Idle times

Total  of  all  idle  times  of  all  workplaces.  The  idle  times  are  the  working  times  defined  in  the  shift

model when no operation is planned.

Evaluated idle times

Total  of  the  idle  times  of  all  workplaces  multiplied  by  the  standard  rate  of  the  machine.  The

standard rate of the machine is defined in the machine/workplace configuration.

Delays (capacity)

Total of all delay times of the operations in the planning horizon.

Calculation of the delay time of an operation:

If LET - planned end (resulting from planning)  <  0

then the delay time = planned end - LET, with

LET = Latest end date/time of the operation.

Setup costs

Total of the static setup times, teardown times and the dynamic setup times of all operations.

To integrate dynamic setup times, you require the respective license.

Setup rate

Ratio of the key figures "Setup costs"  and  "Utilization". The setup ratio specifies the proportion  of

the setup costs in the utilization of a machine.

HLS-FPL_81.docx

Version: 1.0.23049

Page 21 of 41

Detailed Scheduling/ Shop Floor Scheduling

Labor utilization

Product of the workforce requirement, which is stored in the machine operator relation "production",

multiplied  by  the  processing  time  of  the  operation,  summed  up  for  all  operations  loaded.  The

machine  operator  relation  (M/O  rel.)  is  stored  in  the  operation  (see  Order  information    tab

Processing  M/O rel. product.). The processing time is specified in the respective entry stored for

the operation.

Evaluated labor utilization

Product of the workforce requirement, which is stored in the machine operator relation "production",

multiplied  by  the processing time of the  operation and the standard  labor rate,  summed up for all

operations  loaded.  The  standard  labor  rate  of  an  operation  is  defined  in  the  machine/workplace

configuration.

Order key figures

Delays (order)

Total of all delayed orders (time) loaded in the planning horizon.

Calculation of the delay time of an order:

If basic end date of the order header - planned end of the last OP < 0

then delay time = planned end of the last OP - basic end date of the order header

Earliness (order)

Total of all orders finished too early (time) loaded in the planning horizon.

Calculation of the early finish time of an order:

planned end of the last OP - basic end date of the order header

Wait times (order)

Total of idle times between OPs of one order in the planning horizon.

Calculation of the wait times:

The  system  uses  the  total  of  durations  between  the  scheduled  OPs  of  an  order:  planned  start  of

subsequent OP - (planned end of OP + wait time of OP)

Lead times (order)

Lead times of all resources of an order within the planning horizon.

Planned end of last OP of an order - planned start of first OP of the order.

HLS-FPL_81.docx

Version: 1.0.23049

Page 22 of 41

Detailed Scheduling/ Shop Floor Scheduling

Total processing time

The total processing time is the time between the planned start of the first operation and the

planned finish of the last operation dispatched in the planning scenario.

For example, the key figure " Total processing time" can be used to compare the planning results of

automatic occupancy and cognitive planning. In each planning profile, the total processing duration

achieved with the automatic assignment function is greater than after cognitive planning.

KPI Total processing duration

HLS-FPL_81.docx

Version: 1.0.23049

Page 23 of 41

Detailed Scheduling/ Shop Floor Scheduling

6  Automatic Assignment

Purpose

You  can  use  the  function  Automatic  assignment  to  automatically  perform  a  planning  scenario,  which  is

defined via planning profile and planning horizon.

The  function  is  used  to  plan  orders  and  the  included  operations  to  capacities.  The  system  uses

assessment  criteria  –  the  so-called  Assignment  strategy  –  to  sort  the  operations  and  to  distribute  the

operations to the workplaces of the group.

Requirements

Before  you  start  the  detailed  planning,  you  must  define  and  create  the  relevant  Planning  profiles  that

integrate aspects of organization, planning procedure and competencies.

6.1  Automatic assignment

The  automatic  assignment,  also  called  capacity  planning,  is  used  to  plan  orders  or  their  operations  to

capacities.  To  meet  the  demand  of  each  operation,  the  system  selects  a  resource  or  a  combination  of

resources from the resources available. As a result of planning, the operation is assigned a start and end

time (planned start and planned end).

To  calculate  the  planned  duration  of  the  operation,  the  system  uses  the  workplace/machine  that  meets

the main demand plus the dynamic setup time between the preceding operation and the operation itself.

The  workplace/machine  is  the  resource  that  meets  the  "main  demand".  The  alternatives  to  meet  the

demand are the workplaces/machines of the same group (the group the operation has been assigned to).

The assignment of a workplace to a group is configured in the master data.

Production resources and tools are used to meet the further demand. They are stored for the operation.

If Production variants are used, the combination of workplace and resource meets the relevant demand.

Here,  a  resource  is  specified  in  the  Tool  and  Resource  Management  (WRM)  and  assigned  to  a

production variant.

An automatic planning run is performed in the following steps:

1.  The order of assignment is specified via sorting of the operations that must be planned ("queue")

according to the defined planning strategy (priority rule).

The orders that must be planned are sorted according to their priority and placed in a queue. To

identify the priorities, different rules are available.

HLS-FPL_81.docx

Version: 1.0.23049

Page 24 of 41

Detailed Scheduling/ Shop Floor Scheduling

2.  The operations are distributed among the available workplaces according to the specified

procedure (control of capacity selection).

The following rule applies to specify the planned date of an operation that has been assigned to a

machine via capacity selection:

- If the planning variant includes the active option Displacem. to the left (left shift) for the planning horizon,

then the earliest possible date within the planning horizon is selected as planned start. With this planned

start, the capacity is available and the relationships between operations are respected and free of

conflicts. - If the option Displacem. to the left (left shift) is not active in the planning variant, the system

tries to schedule the operation at its scheduled start time. In case of a forward scheduling, the start time

is the earliest start, in case of a backward scheduling, it is the latest start of the operation. If no capacity

is available at that time, the next later point in time is identified when the required capacity is available.

With backward scheduling, the operation is then scheduled "too late". Optionally, the option

IGNORE_TIMING_DIRECTION can be set to "J" in the INI configuration. With this configuration and in

case of backward scheduling, the automatic planning searches for a start date beginning with the earliest

start. To identify the start date, the planned machine must provide the required capycity.

The result of the automatic assignment is a planning scenario that can actually be realized. This means

that the planning is free of capacity overloads or conflicts because of relationships. If these conditions

must be fulfilled, it might not be possible to schedule all operations in due time. It is therefore possible

that some operations must be planned with a delay. This depends on the planning situation, the available

resources and the selected planning strategy. If the capacity required for an operation is not available

until the end of the planning horizon and with respect of the situation and the respective configuration,

then this operation remains in the pool of groups also after an automatic assignment.

HLS-FPL_81.docx

Version: 1.0.23049

Page 25 of 41

Detailed Scheduling/ Shop Floor Scheduling

6.1.1  Specification of the assignment order

The automatic assignment is based  on a  queue concept. The  workplaces assigned to a capacity group

are regarded  as a  unit, in front of  which a  queue  is formed, i.e. the operations to be  planned  line up  in

front  of  this  unit.  Each  queue  is  given  a  priority  rule  to  identify  the  highest  priority  operation  (so-called

contender) in the queue.

The  user  can  specifically  set  queue  sorting  (assignment  strategy)  when  the  system  is  customized  and

therefore  adapt  it  to  the  respective  requirements.  Each  operation  is  weighted  with  the  corresponding

factors  based  on  the  assignment  strategy.  The  operations  are  then  sorted  accordingly  and  then

distributed to the workplaces.

Operation
9820 010

Operation
9217 020

Operation
0282 010

Operation
2963 010

Operation
4927 020

Operation
6238  020

?

Various  bottleneck  and  scheduling  resources  can  be  defined  for  scheduling  within  the  planning  horizon

(the  specification  is  made  in  the  group).  When  you  schedule  operations  within  the  planning  horizon,

resources are checked, i.e. the system checks availability of all resources not only of workplaces.

Apart from the required demand and the possible elements that meet the demand, capacity planning also

takes  into  account  further  restrictions,  such  as  maximum  time  intervals  between  two  operations  to  be

synchronized.

6.1.2  Controlling capacity selection

How  operations  are  distributed  to  the  individual  workplaces  can  be  controlled  using  the  adjustable

capacity selection in the planning variants.

HLS-FPL_81.docx

Version: 1.0.23049

Page 26 of 41

Detailed Scheduling/ Shop Floor Scheduling

Operation
9820 010

Operation
9217 020

Operation
2963 010

Operation
0282 010

Operation
6238 020

Operation
4927 020

Alternatives for the production of an operation

A

?

B

?

C

?

The following alternatives are available:

The first free capacity

The capacity that is available first in terms of time.

Capacity having the most "capacity"

Selects the capacity that provides the most available capacity with respect to the planning horizon.

Capacity having the least "capacity"

The capacity is selected which, with respect to the planning horizon, provides the least capacity.

Shortest processing time

When attempting to dispatch operations, the order in which capacities are selected is based on the

shortest processing time (while taking into account performance level).

Please  note:  This  is  of  particular  significance  in  conjunction  with  alternative  production  methods

(production variants), since these provide certain values used in calculating process times.

Shortest setup time

When attempting to dispatch operations, the order in which capacities are selected is based on the

shortest  setup  time.  Dynamic  setup  times  based  on  the  increases  or  reductions  in  setup  time

defined in the setup change matrix are taken into consideration.

HLS-FPL_81.docx

Version: 1.0.23049

Page 27 of 41

Detailed Scheduling/ Shop Floor Scheduling

Constraints  within  the  order  network  are  appropriately  taken  into  consideration  during  automatic

scheduling.  Operations  that  are  already  running  are  not  rescheduled.  If  an  assignment  is  not  possible

because there are overlaps with the predecessor or successor operations, for example, the operation is

not scheduled and appears in a list at the end of automatic planning.

During automatic assignment, fixed operations that are still set in the past are moved to the right and set

to "now" plus planning lead time at the earliest. Fixed operations in the future are not modified, but remain

scheduled as they are.

6.1.3  Complete assignment of planning board

Automatic assignment of the entire planning board is accessed using the icon

 in the toolbar. A

dialog opens from which the following options can be selected:

Schedule unplanned operations only (pre-assignment)

Using  this  option  operations  that  are  in  the  pool  of  groups  are  weighted  according  to  the  current

assignment strategy and distributed to/ scheduled for the workplaces of the group. Operations that have

already been scheduled remain scheduled in their position (workplace, date).

If  an  assignment  is  not  possible  because  there  are  overlaps  with  the  predecessor  or  successor

operations,  for  example,  the  operation  is  not  scheduled  and  appears  in  a  list  at  the  end  of  automatic

planning.

Reschedule entire planning scenario

If  all  operations  are  to  be  rescheduled,  select  option  "Reschedule  all".  In  this  case,  all  workplaces  for

operations already scheduled, and that are not fixed or running, are scheduled first, that is moved to the

pool of groups before automatic assignment takes place.

After this has been confirmed, the separate workplaces are now assigned. In the process, all operations

in  the  pool  of  groups  are  weighted  according  to  the  current  assignment  strategy.  These  operations  are

then distributed/ dispatched to the workplaces in the group.

If  an  assignment  is  not  possible  because  there  are  overlaps  with  the  predecessor  or  successor

operations,  for  example,  the  operation  is  not  dispatched  and  appears  in  a  list  at  the  end  of  automatic

planning.

6.2  Planning strategies/priority rules

A planning strategy/ priority rule  specifies a priority code (PKZ) for each of the operations transferred to

the queue.

HLS-FPL_81.docx

Version: 1.0.23049

Page 28 of 41

Detailed Scheduling/ Shop Floor Scheduling

In  addition  to  the  predefined  strategies  in  the  system  -  rule-based  machine  assignment  -  user-defined

strategies  are  also  possible  (target-oriented  rules  and  sorting).  Whether  or  not  individual  planning

algorithms  can  be  used  for  this  purpose  depends  on  the  license.  Planning  algorithms  are  selected

through selecting a planning variant.

6.2.1  Rule-based machine scheduling

Lowest setup costs

The setup costs equal the sum of setup time + teardown time.

The  operation  in  the  queue  having  the  lowest  setup  costs  for  the  machine  in  question  gets  the

highest  priority  (dynamic  setup  times  are  not  included;  these  times  are  used  with  the  capacity

selection).

Shortest operation time

Operation time = setup time + processing time + machine teardown time

The operation in the queue having the shortest operation time gets the highest priority.

Shortest remaining processing time

The operation in the queue having the shortest remaining processing time gets the highest priority.

The  remaining  processing  time  is  calculated  using  the  remaining  run  time  formula  stored  for  the

operation.

Longest operation time

Operation time = setup time + processing time + machine teardown time

The operation in the queue having the longest operation time gets the highest priority.

Longest remaining processing time

The operation in the queue having the longest remaining processing time gets the highest priority.

The  remaining  processing  time  is  calculated  using  the  remaining  run  time  formula  stored  for  the

operation.

6.2.2  Variable machine assignment

Planning  strategy  for  controlling  automatic  machine  assignment  based  on  customer-specific  sorting

criteria (sorting rules).

The sorting rule calculates a priority number for each of the operations presented. It works more or less

like a sifter in which ultimately only the highest priority operation in the queue is trapped. If, for example,

only one operation is left over after the first sorting criterion is processed, this operation is scheduled as

the next one and the other sorting criteria are not further considered.

The  configuration  used  to  create  sorting  rules  is  described  here.  The  possible  sorting  criteria  are  also

described there.

HLS-FPL_81.docx

Version: 1.0.23049

Page 29 of 41

Detailed Scheduling/ Shop Floor Scheduling

By default, automatic assignment is carried out in the following sequence:

Sequence

1  Scheduled start (date) of operation
2  Priority of operation
3  Order buffer time (from scheduling)
4  Order index of the order
5  HYDRA order number (order/OP number)

Sorting
Ascending
Descending
Ascending
Descending
Ascending

6.2.3

Target-oriented machine assignment

Planning strategy for controlling automatic machine assignment based on weighted targets.

This planning strategy involves indexing the operations to be scheduled according to a variable weighting

and  then  sorting  the  queue  according  to  this  index.  In  contrast  to  priority  rules,  the  actual  target  is

weighted in this case, and assignment is then aligned with the target.

The  configuration  used  to  create  sorting  rules  is  described  here.  The  possible  sorting  criteria  are  also

described there.

6.3  Other notes

Please note the following:

Taking wait time into consideration

The wait time defined in the operation is NOT taken into consideration in planning (automatic assignment

or manual assignment). This wait time is considered being a wait time for planning purposes that is thus

only considered as buffer time when it comes to scheduling the lead time.

Planning variants and basic settings

You can make different settings for the time horizons and the automatic assignment in the  Basic settings

and  in  the  Planning  variants.  If  you  do  not  select  a  planning  variant  in  the  Graphic  planning,  the  basic

settings are used. The following graphic shows the logic applied for the use of the different settings.

HLS-FPL_81.docx

Version: 1.0.23049

Page 30 of 41

Detailed Scheduling/ Shop Floor Scheduling

The internal priority rule (sorting rule) of the planning component is as follows:

Sequence

1  Scheduled start (date) of operation
2  Priority of operation
3  Order buffer time (from scheduling)
4  Order index of the order
5  HYDRA order number (order/OP number)

Sorting
Ascending
Descending
Ascending
Descending
Ascending

HLS-FPL_81.docx

Version: 1.0.23049

Page 31 of 41

Has a planning variant been selected?yesnoUse the settings from the selectedplanning variantIs there the SYSTEM planning variant?yesnoUse the settings from the SYSTEM planning variantUse the settingsfrom HYDRA basic settingsGeneral capacity selection: first available capacityPlanning strategy: see arrowDoes the planning variant include a planning strategy?yesnoUse the planning strategyassignedDoes the default planningstrategy exist? (hls_prioregel.verweis =1)yesnoUse thisplanningstrategyThe internalprio rule of the planning component is used

Detailed Scheduling/ Shop Floor Scheduling

7  Scheduling

Summary

Menu

Production Control  Production Preparation  Scheduling

Transaction code

orterm

Function authorization

or.terminate

Usage

You use the lead time scheduling function if you are set up to use HYDRA shop floor scheduling and your

PPS/ ERP system does not allow for lead time scheduling to calculate basic operation-related dates.

Integration

Lead  time  scheduling  calculates  basic  operation-related  dates  based  on  basic  order-related  dates  –

earliest  start,  earliest  end,  latest  start,  latest  end.  Operations  are  scheduled  between  these  dates  in

HYDRA shop floor planning so as to assure that the basic order-related finish date is maintained.

Requirement

The requirements are described here.

Performing scheduling manually

Scheduling can also be initiated manually from the following functions.

  Scheduling can be initiated manually for an order using the

 icon in the order information.

  Scheduling can be initiated for all orders in the order backlog from the menu Production control >

Production preparation > Scheduling.

The option Schedule orders modified last schedules those orders that are pending for scheduling

in the table described above, whereas the option Schedule all orders will schedule all orders.

HLS-FPL_81.docx

Version: 1.0.23049

Page 32 of 41

Detailed Scheduling/ Shop Floor Scheduling

8  Lead Time Scheduling

Usage

You use the lead time scheduling function if you are set up to use HYDRA shop floor scheduling and your

PPS/ ERP system does not allow for lead time scheduling to calculate operation-related basic dates.

Integration

Lead  time  scheduling  calculates  operation-related  basic  dates  based  on  order-related  basic  dates  –

earliest  start,  earliest  end,  latest  start,  latest  end.  Operations  are  scheduled  between  these  dates  in

HYDRA shop floor planning so as to assure that the order-related basic finish date is maintained.

Requirement

The following requirements must be met in order for orders to be scheduled by lead time scheduling:

  The order type can either be relevant for scheduling or relevant for detailed planning (customized

setting).

  The  order  status  can  either  be  relevant  for  scheduling  or  relevant  for  detailed  planning

(customized setting).

  The  operation  status  can  either  be  relevant  for  scheduling  or  relevant  for  detailed  planning

(customized setting).

  The  operation  is  flagged  based  on  its  processing  code  as  either  relevant  for  scheduling  or

relevant for detailed planning (customized setting).

This document will provide a description of which order types and status, or which

processing  code,  are  flagged  as  relevant  for  scheduling  or  relevant  for  detailed

planning at the time of delivery.

  Scheduling is activated as a cyclic job in the scheduler (Script hls_term.scr).

8.1  Procedure

Lead  time  scheduling  determines  the  start  times  and/or  end  times  for  all  operations  of  an  order  and

consequently  also  for  the  order  itself.  Lead  time  scheduling  includes  both  forward  and  backward

scheduling. In the operation, forward scheduling determines the earliest start (earliest start time/EST) and

the  earliest  end  (earliest  end  time/EET)  while  backwards  scheduling  determines  the  latest  start  (latest

start time/LST) and the latest end (latest end time/LET).

HLS-FPL_81.docx

Version: 1.0.23049

Page 33 of 41

Detailed Scheduling/ Shop Floor Scheduling

Defining the EST/EET

In order to define EST/EET, you have the option to specify the production order start date; otherwise the

current  time  will  be  set.  However,  the  planning  lead  time  defined  in  the  HYDRA  basic  settings  is  also

included in the calculation of the current time so that the earliest start date is "now" + the planning lead

time. When calculating the dates, the system takes the so called factory calendar (i.e. the shift calendar

that is designated as "factory calendar") into account.

Example

The  following  shifts  are  defined  in  the  factory  calendar:  5:45  a.m.  -  8:00  a.m.,  8:15  a.m.  -  11:30  a.m.,

12:00 noon - 1:45 pm, …; in the HYDRA basic settings 5 hours of planning lead time are set.

Start of scheduling: 10:20 a.m.

Calculation: 10:20 a.m. + 5 hours + 0:30 hours for shift break (11:30 a.m.-12:00 noon)

Results: The earliest start time for scheduling is therefore 3:50 pm

Defining the LST/LET

Either the production order finish date (customer deadline,  delivery date) or the  earliest end time of the

production order is used to define the LST/LET.

Processing times

The total processing time is calculated for the individual operations for scheduling purposes. This total

processing time is derived from the sum of the process times (durations) defined for the operations

- wait time

- setup time

- processing time/ remaining run time (see below)

- dismantling time/retooling (teardown) time

- idle time

- transport time

These  process  times  are  either  set  explicitly  (manually  or  via  interface)  or  calculated  using  defined

formulas.

Processing time/ Remaining run time

The processing time/ remaining run time is calculated based on the remaining run time formula defined in

the  operation.  In  this  context,  the  performance  level  defined  for  the  workplace/  at  the  machine  is  taken

into consideration. If the operation has not yet been planned in detail, then the performance level is used

that is defined for the planned group.

HLS-FPL_81.docx

Version: 1.0.23049

Page 34 of 41

Detailed Scheduling/ Shop Floor Scheduling

During scheduling, the available capacity is considered, calculated based on the results of the shift model

-  year  model  field  or  otherwise  the  year  model  defined  as  deviating  planning  model  at  the  planned

workplace.  If  the  operation  is  not  yet  assigned  to  any  individual  workplace,  the  group  shift  calendar  is

used. Exceptions to this are transition times that - depending on the transition time - are matched to the

Gregorian calendar or even to a specific shift calendar (transport time).

Please  pay  attention  to  the  fact  that  the  default  values  that  are  used  for  calculating  the

remaining  run  time  formula  are  edited/maintained  completely/correctly  at  the  operation,  for

new operations that are included in the pool of groups and that have not yet been planned.

Production variants are not taken into account for lead time scheduling.

Affected orders

Orders that match the following criteria are scheduled with lead time:

  The order is of the order type 0, 2, 3, 5 or 6.

  The order status is prepared or started.

If these order-related criteria are met, then in continuation the following operations are considered.

Affected operations

  The operation status is prepared, running, interrupted or automatically interrupted.

  The  operation  is  flagged  based  on  its  processing  code  as  either  relevant  for  scheduling  or

relevant for detailed planning (customized setting).

In the standard delivery, all operations receive the processing code SYSTEM. This is flagged as

either relevant for scheduling or relevant for detailed planning.

General processing

The individual operations of the order are considered and started with scheduling, beginning with the first

operation relevant for scheduling that is not yet finished. For operations already planned for workplaces,

the planning dates are interpreted as scheduled dates (regardless of their scheduled dates), because it is

assumed that the operation is processed by this date. If, on the other hand, the planning dates are set in

the past, then they are ignored, i.e. the operation is rescheduled.

If the EET of an operation is later than the basic finish date of the production order, or the LST is earlier

than the basic start date of the production order, then the basic finish date of the production order cannot

be met. If a reduction strategy was assigned to the production order, then based on this strategy, a step-

by-step attempt is now made to shorten the total duration of the order so that the basic finish date is not

exceeded.

HLS-FPL_81.docx

Version: 1.0.23049

Page 35 of 41

Detailed Scheduling/ Shop Floor Scheduling

Each  order  is  scheduled  independently  of  the  other  orders.  The  scheduling  result  valid  for  the  order

(scheduled start time, scheduled end time) is defined based on the scheduling type in the order header. If

no scheduling type is defined, then the scheduling type defined in the HYDRA basic settings is used.

If the order's basic start date is set in the future, then backwards scheduling sets the basic start date to

"now + planning lead time". As a result, the basic start date of the order is ignored.

For  operations  that  have  the  planning  indicator  at  the  processing  code  set  to  "N",  processing  time  is

treated as zero regardless of the processing times defined. In doing so, the start date of such operations

is set to equal the scheduled finish date of the preceding operation and the finish date set to equal to the

start date of the subsequent operation.

Planned operations are scheduled "as usual" (the planning dates are not taken into consideration). EST

and  LST  are  calculated.  After  scheduling  is  completed,  the  planning  dates  will  overwrite  the  scheduled

dates.

For running operations, the planned finish date is calculated and scheduling  is continued from that time

on.

Continued scheduling after OP end

If  a  finished  operation  is  set  in  the  past,  the  earliest  start  (in  forward  scheduling)  of  the  successor

operation  is  calculated  based  on  the  idle  time,  transport  time  and  wait  time.  If  the  earliest  start  is  >

planning lead time, the earliest start of the successor is set to earliest start = now + planning lead time +

wait time.

Results of scheduling

Results of lead time scheduling are updated dates for each operation.

The  difference  between  LST  and  EST  yields  the  buffer  time  for  an  operation.  Operations  with  negative

buffer times are deemed critical, because every delay to such an operation would result in a delay in the

production order.

Calculating the order buffer or the delay when the buffer is negative:

This  value  is  derived  from  the  difference  between  the  latest  finish  date  (=requirement  date)  and  the

order's  scheduled  end  time.  Thus,  the  only  way  to  make  this  buffer  positive  is  by  using  forward

scheduling. If the buffer is negative, then the order is late.

8.2  Reduction measures

It is possible to apply reduction measures as part of lead time scheduling:

If  it  turns  out  during  scheduling  that  the  lead  time  for  a  given  order  is  longer  than  the  allotted  time

available, then the system will attempt to take reduction measures to shorten the lead time accordingly.

HLS-FPL_81.docx

Version: 1.0.23049

Page 36 of 41

Detailed Scheduling/ Shop Floor Scheduling

Lead times are reduced in increments. To this end, the operation is repeated until either the deadline is

met  or  the  maximum  reduction  has  been  reached  and  it  becomes  inevitable  that  the  deadline  will  be

exceeded. In which steps each reduction takes place in the operation is defined by the reduction strategy

that is referenced accordingly in the order header (Index tab Dates).

The reduction strategy can be applied to reduce the times listed below:

  Wait time, down to which, based on the steps of the reduction strategy, reductions can be made

(at most: minimum value).

  Transport time, down to  which, based on the steps of the reduction strategy, reductions can be

made (at most: minimum value).

By  scheduling  using  the  reduction  strategy  described  above  you  can  reduce  the  lead  time  in  order  to

meet the requirement date. Each result (reduction level) is recorded in the order header.

Please note:

The reduction strategies are defined during HYDRA customizing.

8.3  Executing lead time scheduling

The  actions  listed  below  cause  an  order  to  be  scheduled.  Keep  in  mind  that  only  those  orders  are

scheduled that meet the criteria described in operation flow:

  When an order or a separate operation is created this order will run through lead time scheduling.

This applies equally to orders that are transferred via interface from the ERP/ PPS system as well

as to those that were created manually.

  Planning,  re-planning  and  deallocating  (removing)  operations  in  HYDRA  shop  floor  scheduling.

Keep in mind here that scheduling does not run until after the planning has been saved.

  Modifications  made  to  the  operation  manually  using  the  operation  editing  functions  at  the  client

will cause the operation to be rescheduled or will initiate scheduling:

o  Modification of the workplace

o  Modification of the "external processing" flag

o  Modification of a target quantity

o  Modification of a target cycle

HLS-FPL_81.docx

Version: 1.0.23049

Page 37 of 41

Detailed Scheduling/ Shop Floor Scheduling

o  Modification  of  process  times  (also  by  changes  to  parameters  contained  in  formulas):

Lead time, wait time, setup time, additional setup time, processing time, inspection time,

dismantling/teardown time, idle time, synchronization time, transport time, delivery time

In  all  cases,  the  order  number  of  the  order  to  which  a  modification  was  made  is  stored  in  a  table

(ade_auto_verarb).

A  process  runs  through  each  of  the  orders  listed  in  the  table  cyclically.  The  periodicity  in  which  this

operation is started is set in the schedulerand it should be defined based on the system.

Scheduling can also be initiated manually. The relevant functions are described here.

HLS-FPL_81.docx

Version: 1.0.23049

Page 38 of 41

Detailed Scheduling/ Shop Floor Scheduling

9  Reduction Strategies

Overview

Menu

Master data  Production control  Reduction strategies

Transaction code

red

Function authorization  mdred

You  can  apply  reduction  strategies  during  lead  time  scheduling.  The  strategy  you  should  use  in  each

case is specified by the ERP system and managed in the order header.

Purpose

You  can  apply  reduction  strategies  during  lead  time  scheduling.  The  strategy  you  should  use  in  each

case is specified by the ERP system and managed in the order header.

This function is only useful, and thus relevant if you schedule orders in HYDRA.

Field descriptions

Reduction strategy

Reduction strategy: strategy key (referenced in the order header).

Reduction level

Reduction level. Levels are processed in ascending order.

Reduction of waiting time

The amount of time, expressed in percent, by which waiting time is reduced at this level.

Reduction of transport time

The amount of time, expressed in percent, by which transport time is reduced at this level.

Comment

Comment or description

HLS-FPL_81.docx

Version: 1.0.23049

Page 39 of 41

Detailed Scheduling/ Shop Floor Scheduling

10  Transport Matrix

Summary

Menu

Master Data  Production Control  Transport Matrix

Transaction code

ttx

Function authorization  mdttx

A transport matrix can be defined to determine the transport time between two operations.

Usage

When a new operation is created or when an explicit workplace or group change is made manually using

the  operation  update  function,  the  transport  time  is  determined  using  this  matrix  and  the  results  are

transferred  into  the  operation.  Any  change  to  the  transport  matrix  or  any  rescheduling  in  the  graphic

planning board later will have no effect on already existing operations.

This function is only meaningful and therefore relevant if order scheduling is run in HYDRA.

In  order  to  reduce  the  amount  of  data  when  determining  the  transport  time  from  one  workplace  to

another, the workplaces should be assigned to so-called location groups first. To do this, create a group

in  the  configuration  application  Groups  with  the  identifier  "Location  group"  and  use  the  configuration

application Group assignment to assign the location group to a workplace.

Field descriptions

From location group

Location group of the original workplace

To location group

Location group of the target workplace

Transport time - normal

Normal transport time in hours.

Transport time - minimum

Minimum  transport  time  in  hours,  down  to  which,  based  on  the  steps  of  the  reduction  strategy,

reductions can be made.

Calendar

With regard to the calendar that scheduling is based on, the following options are available:

HLS-FPL_81.docx

Version: 1.0.23049

Page 40 of 41

Detailed Scheduling/ Shop Floor Scheduling

  G = Gregorian calendar

Transport times are scheduled using the Gregorian calendar.

  S = Shift calendar

When this option is set, the shift calendar or the original workplace is used for scheduling.

  T = Shift model from transport matrix

The shift model entered in the field Shift model is used for scheduling.

Shift model

Shift model that should be used when the option "T" is set in the calendar field.

Please  note:  The  number  of  different  shift  models  that  are  defined  here  should  be  kept  to  a

minimum,  because  an  increased  number  of  different  shift  models  may  adversely  impact

performance in HYDRA shop floor scheduling.

Comment

Comment about this entry

HLS-FPL_81.docx

Version: 1.0.23049

Page 41 of 41

