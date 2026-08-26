Manual

Monitoring of Machine Data
(MOC)
MDE-MMD 8.2

Version 1.0.23049

Last change on: 01.09.2020

Monitoring of Machine Data (MOC)

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

MDE-MMD_82.docx

Version: 1.0.23049

Page 2 of 45

Monitoring of Machine Data (MOC)

Contents

1  Overview of Machine Data Monitoring ......................................................... 4

2  Workplaces/Machines .................................................................................. 6

3  Machine history .......................................................................................... 23

4  Machine Time Profile ................................................................................. 33

5  Cycle Parameters ....................................................................................... 39

6  Cycle progression ...................................................................................... 41

MDE-MMD_82.docx

Version: 1.0.23049

Page 3 of 45

Monitoring of Machine Data (MOC)

1

 Overview of Machine Data Monitoring

Possible fields of application

The  function  package  “Machine  Data  Monitoring”  allows  for  the  data  recorded  in  the  system  to  be

evaluated  with  respect  to  the  current  status  of  machines  and  workplaces  as  well  as  in  relation  to  the

posted status durations.

Implementation notes

You use the function package if you wish:







to monitor your machines and workplaces

to evaluate the recorded times and durations in relation to machines/workplaces

to evaluate the hours occurred in a special sector/department over a specific period of time in relation

to different statuses

Integration

The  machine  data  monitoring  evaluates  machines  and  workplaces.  The  times  recorded  in  the  machine

data collection module are generally used for this purpose.

Functions

  Workplace/machine overview

o  Tabular workplace/machine overview to represent the current machine status. Display of

a picture of the machine. Detailed views, e.g. list of registered staff, operations, tools or

resources (available if relevant functions from these HYDRA areas are used at the same

time  as  MDE  (machine  data  collection)).  Comparison  of  actual  and  target  quantities

relating to orders, target and actual cycles as well as target and actual stroke numbers.

  Cycle progression

o  Tabular  and  graphic  evaluation  on  the  actual  cycle  of  a  machine  over  configurable

periods; can be displayed in "seconds per piece" or "pieces per minute“.

  Machine time profile

o  Graphic  machine  time  profile  with  real-time  presentation  of  the  downtime/production

performance of several machines over configurable periods including zoom function.

  Downtime profile

o  Drill-down  function  within  the  machine  time  profile  for  detailed  presentation  of  the

downtime performance of a machine

  Machine history

MDE-MMD_82.docx

Version: 1.0.23049

Page 4 of 45

Monitoring of Machine Data (MOC)

o  Machine  history  for  the  tabular  presentation  of  machine-related  and  order-related

postings performed at a machine/workplace.

MDE-MMD_82.docx

Version: 1.0.23049

Page 5 of 45

Monitoring of Machine Data (MOC)

2  Workplaces/Machines

Overview

Menu

Production Facility Management  Current Information
 Workplaces/Machines

Transaction code

wpov

Function authorization  wpov

Purpose

The  application  Workplaces/machines  provides  an  evaluation  for  the  production  management.  It  is

intended  for  the  following  users:  users  from  production  scheduling  and  monitoring,  schedulers,

supervisors,  operators  or  all  MOC  users  who  would  like  to  get  a  comprehensive  overview  of  the

production situation at specific workplaces/machines or a complete organizational unit.

Integration

The application  Workplaces/machines provides all kind of information that is relevant for workplaces. In

addition to master data, the function also provides data required to control production processes.  These

are, for example:



current workplace/machine status

  operations currently running at the workplace/machine



currently used tools and resources



cycle progression of the shift (for machines with clocked production)

  output per shift: quantities, durations

Selection criteria

The application provides the following selection criteria:

Workplace from … to …

This selection criterion refers to the workplace stored in the machine or workplace master data. You can

also use wildcards (placeholders *).

Group from … to …

This  selection  criterion  refers  to  the  group  stored  in  the  machine  or  workplace  master  data.  The

application shows all workplaces/machines assigned to the selected group. You can also use wildcards.

MDE-MMD_82.docx

Version: 1.0.23049

Page 6 of 45

Monitoring of Machine Data (MOC)

Report group

This  selection  criterion  refers  to  the  report  groups.  The  application  shows  all  workplaces/machines

assigned to the selected report group.

Designation

This  field  refers  to  the  name  of  machines  and  workplaces  defined  in  the  machine  master  data.  The

application only shows the machines matching the specified character string. You can also use wildcards

(placeholders *).

Short name

This selection criterion refers to the short name of machines in the master data. The application shows all

machines or workplaces matching the entered character string. You can also use wildcards.

Responsibility area

This selection criterion refers to the responsibility area stored in the machine master data. Note: The user

can only view those machines that are included in the responsibility areas assigned to the user.

Company

This  selection  criterion  refers  to  the  company  defined  in  the  machine  or  workplace  master  data.  The

application  shows  all  workplaces/machines  assigned  to  the  selected  company.  You  can  also  use

wildcards.

Cost center

This selection criterion refers to the cost center stored in the machine and/or workplace master data. All

workplaces/machines assigned to the selected cost center are displayed. You can also use wildcards.

Status

This  selection  criterion  refers  to  the  current  status  of  machines  or  workplaces.  All  machines  or

workplaces, which are currently assigned to the selected status, are displayed.

Status longer than

This selection criterion refers to the current status of machines or workplaces. All machines or workplaces

are  shown  that  are  currently  assigned  to  the  selected  status  and  that  are  assigned  to  this  status  for  a

longer period than the one specified.

If several selection criteria are used, the application  Workplaces/machines shows the results that match

all selection criteria.

MDE-MMD_82.docx

Version: 1.0.23049

Page 7 of 45

Monitoring of Machine Data (MOC)

Detail application Workplaces

The detail application Workplaces displays all workplaces in accordance with the selections made in the

selection panel. The application displays the current status, workplace information, shift quantities, cycles

and number of strokes. The following paragraphs describe the data available in the table. This data might

not be displayed by default. Use the column selection function to add the required data.

In  addition  operation-related  data  is  shown,  if  an  operation  is  currently  logged  on.  In  case  several

operations are logged on, only the first operation is shown in the detail application.

Status

The Status column summarizes the different  statuses and presents them as an "LED". The colors

are as follows:

Light green

Status with RPA 11 (normally "Production")

Blue

Red

Gray

Status with RPA 7 (normally "Setup")

Status 30000 (normally "Not assigned")

Status 20000 or status with RPA 12

(normally break/no shift

Yellow

Status < 10000 and RPA <> [7,11,12]   other statuses/downtimes

Master data:

Workplace

Unique ID defined in the workplace configuration.

Short name

Machine name as defined in the workplace configuration.

Designation

Long text/comment on the machine as defined in the workplace configuration.

Gruppen

Group the machine is assigned to in the workplace configuration.

Cost center

Cost center as defined in the workplace configuration.

Company

Company as defined in the workplace configuration.

Responsibility area

Responsibility area required to view this workplace as defined in the workplace configuration.

Type

Workplace model according to workplace configuration.

MDE-MMD_82.docx

Version: 1.0.23049

Page 8 of 45

Monitoring of Machine Data (MOC)

Type

Workplace type according to the workplace configuration.

Status

Status

Status  number  of  the  status  that  is  currently  active  at  the  workplace.  Color  of  the  currently  active

status according to configuration.

Status name

Status name of the status that is currently active at the workplace.

Status since

Date when the status was assigned.

Status since

Point in time when the status was assigned.

Duration so far

Present duration of the status that is currently active at this workplace.

Predicted duration

Expected  duration  of  the  malfunction  entered  by  the  employee  when  assigning  the  status  in  the

terminal or the duration that is stored in the status configuration.

Expected end

Calculated  point  in  time  when  the  malfunction  ends.  The  calculation  is  based  on  the  predicted

duration.  The  end  time  is  calculated  using  the  values  of  Date  +  Predicted  duration,  synchronized

with the Gregorian calendar.

Expected remaining runtime

Expected end minus current time, i.e. "now". If the remaining runtime is negative the expected end

is already overdue. In this case, the field is highlighted in red.

Do  not  confuse  the  expected  remaining  runtime  of  the  malfunction  with  the  remaining

runtime of the operation.

Shift quantities, primary quantity unit/secondary quantity unit/tertiary

quantity unit/base quantity unit

Yield

Yield that has been posted so far at the selected workplace within the current shift.

Scrap

Scrap that has been posted so far at the selected workplace in the current shift.

MDE-MMD_82.docx

Version: 1.0.23049

Page 9 of 45

Monitoring of Machine Data (MOC)

Rework

Rework quantity that has been posted so far at the selected workplace in the current shift.

Open quantity

Open quantity that has been posted so far at the selected workplace within the current shift.

Unit

Unit of primary quantity

Zyklus

Target cycle

Current target cycle at the workplace.

If an operation is logged on to the machine the target cycle defined for the operation is displayed in

seconds per cycle. There is no target cycle for machines to which no OP is currently logged on. In

this case, “0” is entered in the “target cycle” field.

Actual cycle

Current actual cycle of the workplace

Colored display of the actual cycle relating to the configured cycle parameters.

Difference (%)

The  difference  in%  is  calculated  according  to  the  following  formula:  (target  cycle  -  actual  cycle)  /

target cycle * 100%. If the actual cycle is slower than the target cycle, the difference is indicated in

negative values, otherwise positive values are shown. See below for coloring.

Actual cycle (OP)

The actual cycle (OP) is a value referring to the order. The values used for the calculation all refer

to order logons and, as a result, they are independent from the current machine status.

Formula: Actual cycle OP = RPA11 OP/ (Yield OP / Partitioning OP)

Difference (OP) (%)

The  difference  OP

[%]  column

is  computed  according

to

the

following

formula:

DifferenceOP = Abs((target cycle number – actual cycle number OP) * 100) / target cycle number

Cycle number [1/min]

Target cycle number

1 / Target cycle

There is no target cycle for machines to  which no OP is currently  logged  on. For this reason, the

target stroke number is 0.

Actual cycle number

1 / actual cycle

MDE-MMD_82.docx

Version: 1.0.23049

Page 10 of 45

Monitoring of Machine Data (MOC)

Difference (%)

(target cycle number – actual cycle number) / target stroke number * 100%

Please note: For rounding reasons, the difference indicated here might deviate from the difference

shown in the "cycle" category.

Actual cycle number (OP)

The actual cycle number (OP) is a value relating to orders. The values used for the calculation all

refer  to  order  logons  and,  as  a  result,  they  are  independent  from  the  current  machine

status.Formula: Actual cycle number OP = yield OP/ (partitioning OP * RPA11 OP)

Difference (OP) (%)

The difference OP column is computed by the following formula:

DifferenceOP = Abs((target cycle number – actual cycle number OP) / target cycle number * 100)

Coloring of the column Difference

In  the  master  data,  you  can  define  the  coloring  of  the  Difference  column  in  the  Cycle  category  per

machine  for  the  upper/lower  action  limits  or  upper/lower  tolerance  limits  (menu:  master  data  >

workplaces/machines  >  cycle  parameters).  The  value  with  a  sign  showing  the  difference  is  used  for

coloring. The value in the difference column is displayed in red if the tolerance limits are exceeded; the

value is displayed in blue if the action limits are exceeded. The data is not displayed in color if no cycle

parameters are defined.

Order quantities

This  category  displays  data  relating  to  quantities  of  the  operation  currently  logged  on.  In  case  several

operations are logged on, only the first operation is shown in the detail application.

Target quantity (P)

Target quantity (primary quantity unit) of the operation currently logged on.

Target scrap (P)

Target scrap (primary quantity unit) of the operation currently logged on.

Yield (P)

Posted yield (primary quantity unit) of the operation currently logged on.

Scrap (P)

Posted scrap (primary quantity unit) of the operation currently logged on.

Rework (P)

Posted rework (primary quantity unit) of the operation currently logged on.

Open quantity (P)

Posted open quantity (primary quantity unit) of the operation currently logged on.

MDE-MMD_82.docx

Version: 1.0.23049

Page 11 of 45

Monitoring of Machine Data (MOC)

Total quantity (P)

Total of yield + scrap + rework + outstanding quantity (open quantity)

Unit (P)

Unit of the primary quantity unit of the operation currently logged on.

Difference [%]

This difference identifies the percentage that is still to  be produced to reach the  target quantity  of

the operation. To this end, the already posted yield (P) is set in ratio to the target quantity (P):

Difference = 100 – (100 / target quantity (P) * yield (P))

The result is displayed with 2 decimal places.

Times relating to operations

This category displays the durations which are posted to the individual resource performance accounts of

the logged on operation.

Detail application Image

The  picture  in  the  Image  detail  application  shows  the  picture  of  the  machine  as  stored  in  the  machine

configuration. The image of the machine selected in the detail application “workplace” is displayed.

The following image formats are supported: jpg, gif, png, tif, bmp, ico, emf, and wmf. The pictures have to

be filed in a directory that may be accessed via the path ID “MOCWPIMG” within the path configuration.

Further information on the configuration can be found here.

Detail application Operations logged on

The  detail  application  Operations  logged  on  shows  all  operations  that  are  currently  logged  on  to

workplaces/machines  which  are  selected  in  the  detail  application  “Workplaces”.    The  following

paragraphs describe the data available in the table. This data might not be displayed by default. Use the

column selection function to add the required data.

Workplace

Workplace

Workplace where the operation is logged on.

MDE-MMD_82.docx

Version: 1.0.23049

Page 12 of 45

Monitoring of Machine Data (MOC)

Order

Order

Order number of the operation.

Sequence

Sequence number of the OP (if sequences are used).

OP

Split

SOP

Operation number

Split number of the operation (if the split function is used).

Sub operation number (reserved).

OP name/designation

Designation of the operation

Article

Article number produced by the operation; taken over from operation data.

Login

Date

Date when the operation was last logged on to this workplace

Time

Time when the operation was last logged on to this workplace

Primary quantity/secondary quantity/tertiary quantity/base quantity

Target quantity

Target quantity of the operation

Unit

Yield

Unit of primary quantity

Yield that has been posted so far to the operation

Scrap

Scrap that has been posted so far to the operation

Rework

Rework quantity that has been posted so far to the operation

MDE-MMD_82.docx

Version: 1.0.23049

Page 13 of 45

Monitoring of Machine Data (MOC)

Open quantity

Open quantity that has been posted so far to the operation

Yield/target quantity [%]

Proportion of yield to target quantity in %

Yield since logon

Yield since the operation is logged on

Detail application Staff logged on

The detail application Staff logged on shows all persons who are logged on to the workplace selected in

the detail application “Workplace”.  The following paragraphs describe the data available in the table. This

data might not be displayed by default. Use the column selection function to add the required data.

Workplace

Workplace

Workplace where the operation is logged on.

Person

Name

The person’s name as defined in the HR master.

First name

The person’s first name as defined in the HR master.

Name

The person's complete name as defined in the HR master (last name, middle name and first name)

Company

Company the person is assigned to in the HR master.

Personnel number

Unique key to identify the person. (Key)

Staff badge number

Staff badge number assigned to this person in the HR master.

Operator position/function

Abbreviation of the operator's function ("operator position") that has been selected when the person

logged on to the machine.

Operator position/function

Unique  key  of  the  operator  position  that  has  been  selected  when  the  person  logged  on  to  this

machine.

MDE-MMD_82.docx

Version: 1.0.23049

Page 14 of 45

Monitoring of Machine Data (MOC)

Order

Order

Order number of the operation.

Sequence

Sequence number of the OP (provided that sequences are used).

Operation number

Split number of the operation (provided that the split function is used).

OP

Split

SOP

Sub operation number (reserved).

OP name/designation

Designation of the operation

Article

Article number produced by the operation; taken over from operation data.

Login

Date

Date when the operation was last logged on to this workplace

Time

Time when the operation was last logged on to this workplace

"Advance logon" option

If this option is set, the person is logged on automatically when shifts change the next time.

Detail application Resources logged on

The  detail  application  Resources  logged  on  shows  all  resources  which  are  logged  on  to  the  workplace

selected in the detail application Workplace. The following paragraphs describe the data available in the

table. This data might not be displayed by default. Use the column selection function to add the required

data.

Workplace

Workplace

Workplace where the operation is logged on.

MDE-MMD_82.docx

Version: 1.0.23049

Page 15 of 45

Monitoring of Machine Data (MOC)

Resource

Resource type

Resource type to which the resource is assigned.

Resource

Resource ID that is entered in the resource master data.

Designation

Resource designation recorded within master data.

Resource family

Resource family (internal ID) to which the resource is assigned.

Login

Date

Date when the resource was last logged on to this workplace.

Time

Time when the resource was last logged on to this workplace.

Detail application Maintenance

The  detail  application  Maintenance  shows  all  active  maintenances  for  the  workplace  that  is  currently

selected  in  the  selection  panel.  The  following  paragraphs  describe  the  data  available  in  the  table.  This

data might not be displayed by default. Use the column selection function to add the required data.

Maintenance

Active

Light green:

Active

Status

Status of maintenance activity

Green

Blue

"blue" threshold has been exceeded

Yellow

"yellow" threshold has been exceeded

Red

"red" threshold has been exceeded

Maintenance

Maintenance name

MDE-MMD_82.docx

Version: 1.0.23049

Page 16 of 45

Monitoring of Machine Data (MOC)

Type

Maintenance type defined for the maintenance:

T

B

Z

(cycle-based)

(operating hours)

(time-based)

Class

Maintenance class

Non-recurring maintenance

Flag indicating that this maintenance is only performed once.

Valid from

Start of maintenance validity. A maintenance can only fall due within the validity period.

Valid until

End of maintenance validity.

Maintenance order

Maintenance order assigned to this maintenance.

Date

Time

Date when this maintenance was last carried out at the selected machine.

Time when this maintenance was last carried out at the selected machine.

Modified by

Person (user) who reset the last maintenance.

Actual cycles

Number of cycles accrued so far.

Next maintenance after

Counter reading of cycles when the next maintenance is to be performed.

Interval

Interval within which the maintenance is to be performed; from the maintenance configuration.

Actual duration

Operating  hours,  which  have  been  posted  so  far  onto  the  resource  –  according  to  resource  type

settings.

Next maintenance after

Meter reading of the operating hours counter triggering the next maintenance to become due.

Interval

Interval  in  hours  within  which  the  maintenance  is  to  be  performed;  from  the  maintenance

configuration.

MDE-MMD_82.docx

Version: 1.0.23049

Page 17 of 45

Monitoring of Machine Data (MOC)

Next maintenance on

Date when the next maintenance falls due.

Interval

Interval within which the maintenance is to be performed; from the maintenance configuration.

Info 1 - 6

Additional text 1-6 from the maintenance configuration

Detail applicationArticle in production

The  detail  application  Article  in  production  shows  all  output  materials  with  the  relevant  batch  number

which  are  logged  on  to  the  workplace  selected  in  the  detail  application  Workplace.  The  following

paragraphs describe the data available in the table. This data might not be displayed by default. Use the

column selection function to add the required data.

Workplace

Workplace

Workplace to which the batch is logged on.

Material

Material

Material number of the currently produced article

Material designation/name

Material name of the currently produced article, which is taken over from the producing operation.

Material type

Material type of the currently produced article, which is taken over from the producing operation.

Batch number

Current batch numbers produced by the OP using this article.

Quantities

Quantities

Original quantity of the batch

Remaining quantity

Remaining quantity of the batch

Quantity unit

Quantity unit in which the batch is managed.

MDE-MMD_82.docx

Version: 1.0.23049

Page 18 of 45

Monitoring of Machine Data (MOC)

Login

Date

Date when the batch was last logged on to this workplace.

Time

Time when the batch was last logged on to this workplace.

Person

Person (personnel number) who performed the last output batch change.

Detail application Material in use

The  detail  application  Material  in  use  shows  all  input  materials  which  are  logged  on  to  the  workplace

selected in the detail application Workplace. The following paragraphs describe the data available in the

table. This data might not be displayed by default. Use the column selection function  to add the required

data.

Workplace

Workplace

Workplace where the input batch is logged on.

Material

Material

Material number of the currently logged on input batch.

Material designation/name

Material  name  of  the  currently  logged  on  material,  which  is  taken  over  from  the  producing

operation.

Material type

Material type of the currently logged on material, which is taken over from the producing OP.

Batch number

Current batch number of the currently logged on input batch.

Quantities

Original quantity of the batch

Remaining quantity

Remaining quantity of the batch

Quantity unit

Quantity unit in which the batch is managed.

MDE-MMD_82.docx

Version: 1.0.23049

Page 19 of 45

Monitoring of Machine Data (MOC)

Login

Date

Date when the batch was last logged on to this workplace.

Time

Time when the batch was last logged on to this workplace.

Person

Person (personnel number) who has performed the last input batch logon.

Detail application Status

The  detail  application  Status  shows  the  current  machine  status  and  in  parallel  all  current  resource

statuses.

Parallel resource statuses refer to a workplace or a machine. The statuses do not depend

on the WRM resource statuses.

The  entry  of  other  statuses  than  the  machine  status  requires  additional  licenses  and

configurations.

The following paragraphs describe the data available in the table. Some data might not be displayed by

default. Use the column selection function to add the required data.

Status

Status

Number of the parallel Resource status.

Status text

Designation of the parallel resource status

Status type

Number of the Status type the resource status is assigned to.

Login

Beginning of status

Point in time when the status was set.

Duration

Duration since beginning of status. The duration is calculated based on the Gregorian calendar.

The displayed duration of the status type "MST" (machine status) can therefore differ from the value

Duration so far in the detail application Workplaces.

MDE-MMD_82.docx

Version: 1.0.23049

Page 20 of 45

Monitoring of Machine Data (MOC)

Resource

Resource type key

Resource type of the workplace/the machine - always "MNR"

Resource

Number of the workplace/machine

Detail application Shift times

The detail application  Shift times shows RPA times of the current shift at the  workplace selected  in the

detail application Workplace in a pie chart.

Detail application Shift quantities

The detail application Shift quantities shows the current shift quantities in a bar chart, i.e. yield,  scrap in

primary quantity unit. The quantities refer to the workplace selected in the detail application Workplace.

Detail application Cycle progression

The detail application Cycle progression shows the stored cycle values in a line chart in [sec/cycle]. The

chart  displays  the  cycle  progression  of  the  workplace  selected  in  the  detail  application  Workplace.  By

clicking  a  radio  button  the  user  can  decide  whether  they  want  to  display  the  current  shift  or  the  last  x

hours. However, x should be less than 8 hours for performance reasons.

The following limit values are displayed as lines: upper tolerance limit  - UTL (red), lower tolerance limit -

LTL (red), upper action limit - UAL (yellow), lower action limit - LAL (yellow). The limits are computed and

displayed on the basis of the Process parameters configuration.

Please note: The display depends essentially on the size of the detail application.

Detail application Downtime ranking list

The Downtime ranking list shows the top x of current downtimes (status is not production) of the currently

selected  workplace  during  the  current  shift  or  the  last  hours.  They  are  represented  in  a  horizontal  bar

chart.

Using the radio buttons, it is possible to show the statuses, which have so far occurred in the current shift,

or the statuses of the last x hours. By another radio button, the user can configure the display according

to downtime durations or the number of respective downtimes.

The TOP X input field allows for the number of statuses to be defined (preassignment: 5).

MDE-MMD_82.docx

Version: 1.0.23049

Page 21 of 45

Monitoring of Machine Data (MOC)

The  color  of  status  bars  corresponds  to  the  color  defined  for  the  status  text  within  the  HYDRA

configuration. The status bar is displayed in gray, in case no color is defined for the status. The status text

and the value (duration in hours or number) are displayed for each bar.

Toolbar

Data collection

   Log on

Use the Log on function to log on operations to the system.

   Partial confirmation

Use the function "Partial confirmation" to enter part quantities for operations that are then recorded

in the system.

   Interrupt

Use the function "Interrupt" to interrupt operations.

Log off

Use the Log off function to log off operations.

   Terminate

Interrupted or prepared operations can be logged off from the system using the Terminate function

Persons

   Log person on

You can log on a person to an operation/machine using the Log person on function

    Log person off

You can log off a person from the relevant operation/machine using the Log person off function

MDE-MMD_82.docx

Version: 1.0.23049

Page 22 of 45

Monitoring of Machine Data (MOC)

3  Machine history

Overview

Menu

Production facility/Resource management  Resource analysis  Machine
history

Transaction code

wphi

Function authorization  wphi

Purpose

The machine history is a report for the production management. The application allows for tracking and

tracing  of  events  that  need  to  be  posted  at  workplaces  in  MES.  In  this  context,  posting  events  such  as

status changes, order, tool, and personnel postings, maintenance activities as well as measures recorded

at  a  workplace  are  listed  in  chronological  order  in  a  table.  You  can  use  various  selection  criteria  to

evaluate events.

Selection criteria

The application provides the following selection criteria:

Workplace from … to …

This selection criterion refers to the workplace stored in the machine or workplace master data. You

can also use wildcards (placeholders *).

Group from … to …

This  selection  criterion  refers  to  the  group  stored  in  the  machine  or  workplace  master  data.  The

application  shows  all  workplaces/machines  assigned  to  the  selected  group.  You  can  also  use

wildcards.

Short name

This  selection  criterion  refers  to  the  short  name  of  machines  in  the  master  data.  The  application

shows  all  machines  or  workplaces  matching  the  entered  character  string.  You  can  also  use

wildcards.

Designation

This field refers to the name of machines and workplaces defined in the machine master data. The

application  only  shows  the  machines  matching  the  specified  character  string.  You  can  also  use

wildcards (placeholders *).

MDE-MMD_82.docx

Version: 1.0.23049

Page 23 of 45

Monitoring of Machine Data (MOC)

Cost center

This  selection  criterion  refers  to  the  cost  center  stored  in  the  machine  and/or  workplace  master

data. The application shows all machines and/or workplaces assigned to the selected cost center.

You can also use wildcards.

Company

This selection criterion refers to the company defined in the machine or workplace master data. The

application  shows  all  workplaces/machines  assigned  to  the  selected  company.  You  can  also  use

wildcards.

Report group

This selection criterion refers to the report groups. The application shows all workplaces/machines

assigned to the selected evaluation/report group.

Responsibility area

This selection criterion refers to the responsibility area in the workplace/machine master. Note: The

user can only view those machines included in the responsibility areas assigned to the user.

Type

Type

Selects the category of the machine/workplace displayed in the evaluation/report. You can select E

(individual workplaces) and G (group workplaces).

Selects the workplace type. You can select the following workplace types:

- P Workplace

- N Machine

- J Machining center

- L Line

- A Aggregate

- C CAQ inspection station

- R Reel-based manufacturing

- S Cutting unit

Show comments

If you select the checkbox Show comments, the table also shows entered comments.

Comment

If the input field  Comment  includes a text, the table only shows  the data records that  include this

text as a comment. You can use * as a wild card. Please note case sensitivity.

You cannot use this selection field to search BDE comments.

MDE-MMD_82.docx

Version: 1.0.23049

Page 24 of 45

Monitoring of Machine Data (MOC)

Machine statuses > X minutes only

This  parameter  only  refers  to  events  of  the  type  "machine  status".  The  application  will  show  the

machine status if the posted time is greater than the entered value.

Event type

You  can  restrict  the  displayed  events.  The  application  shows  all  events,  in  case  you  have  not

restricted the selection.

Designation

Machine status

Production lock

Operation postings

Personnel postings

Acronym

M_MST

M_PSPERRE

A_ADE

P_ADE

Target value changes

M_VORGABE

Maßnahme

R_MASSNAHME

Resource posting

Release of resource

Resource status

R_MELDUNG

R_FREIGABE

R_STATUS

Maintenance reset

R_WART_RESET

Exceeding of maintenance

R_WART_EXCEEDED

DNC Upload

DNC Download

R_UPLOAD

R_DOWNLOAD

Transfer posting of resources

R_UMBUCHUNG

Beginning of status
end of status

BDE comment

RES_STB
RES_STE

HY_BEM:  Display  of  BDE
that  have  been
comments
entered
to  an
reference
operation.

in

Please  note:  Posting  of  events  depends  on  the  customer's  system  and  its  use.  Consequently,  it

might be the case that not all events listed here are relevant.

Date from …to (shift/ time)

Use the date selection to restrict the period of time for the data you want to evaluate.

When selections are made using shift(s), the shift date is evaluated. If no shift is selected, all shifts

are used.

MDE-MMD_82.docx

Version: 1.0.23049

Page 25 of 45

Monitoring of Machine Data (MOC)

Note  that  selection  by  shift  is  not  supported  for  all  event  types.  You  can  find  detailed

information on the shift selection here.

If you select by time, the selection is based on the start date. Both times refer to the beginning or

end of the date period specified above.

You can only evaluate Group workplaces if you select by Time. If you select by Shift, no

data will be displayed because group workplaces do not refer to shifts.

Order / Article / MES order number

You can use these criteria to search for BDE postings:

  Log on OP, interrupt OP, log off OP, enter part quantities

  Log on staff, log off staff

  Change partitioning, change target cycle

  BDE comment

Machine history detail application

The machine history lists all events, such as status changes, order or personnel postings of a machine

that occurred on the day. These have to be evaluated or listed in a shift of this day. The

evaluations/reports show the following postings:

Postings based on machines/workplaces:

Postings for machine statuses recorded automatically (with direct machine connection)

Postings assigned manually at the terminal

Setting the production lock or changing default values relating to machines/workplaces (target cycle,

partitioning) at the terminal

Automatic assignment of default values with operation postings

 Postings based on orders:

Postings performed automatically (when shifts change)

Manual postings (logon, logoff, interruption) at the terminal.

The corresponding order is displayed additionally. If it is a manual posting, the person who did the posting

is shown  as  well.If  waiting  period processing is  active, the  displayed  logon time of the order represents

the time of entry and may deviate from the point in time indicated in the order log record.



MDE-MMD_82.docx

Version: 1.0.23049

Page 26 of 45

Monitoring of Machine Data (MOC)

 Postings based on staff:

Automatic (when shifts change)

Manual logon or logoff processes of staff at the terminal

In addition, the application shows the corresponding personnel number and the operation for which

the person produces.

 Postings based on resources:

Machine  postings  resulting  from  the  HYDRA  Tool  and  Resource  Management  module  (HYDRA-

WRM), e.g. the application also shows exceeded maintenance activities or measures/comments.

 Information

Shows BDE comments entered via the AIP terminal and stored with the operation.

The  event  "information"  also  shows  the  total  duration  of  the  respective  status  /  event.  The  duration  is

always zero when a person or OP is logged on. The duration states the interval between the logging on

and logging off if you interrupt/log off an OP or person.

Field description

The following paragraphs describe the data available in the table. It might be the case that the application

does not show this data by default. Use the column selection function to add the required data.

Field description workplace category

Workplace

Workplace the event refers to.

Field description event category

Type

Image display of the type

Event type

Assign the recorded event. Possible values: see event

Event

Classifies  the  event  collected  at  the  machine  in  the  table  row.  In  the  columns  "Selection  by  shift"

and "Selection by time" you can see events available for a specific selection.

Event type

Event

Machine status

Machine  status  according
configuration
Coloring is set according to the
settings in the status text

to

Selection by
shift

Selection by
time

Yes

Yes

MDE-MMD_82.docx

Version: 1.0.23049

Page 27 of 45

Monitoring of Machine Data (MOC)

Event type

Event

Selection by
shift

Selection by
time

Production lock

Operation postings

Personnel postings

configuration..

Production lock set manually
Production lock canceled
manually

OP logged on
OP interrupted
OP logged off

Person logged on
Person logged off

Target value changes

Change partitioning/change
target cycle

Exceeding
maintenance

of

Maintenance cycle exceeded

Maintenance reset

Maintenance reset

Information

BDE comment entered

Beginning of status
end of status

Event  and  coloring  according  to
configuration

No

Yes

Yes

Yes

Yes

No

No

No

Yes

No

Yes

Yes

Yes

Yes

Yes

Yes

Datum

Entry date of the event

Time

Entry time of the event

Duration

Time  between  the  last  event  of  this  kind  and  the  one  currently  displayed.  The  duration  is  only

shown  for  the  events  "OP  INTERRUPTED",  "OP  LOGGED  OFF",  "PERSON  LOGGED  OFF"  as

well as for machine statuses. In any other case, 0 is shown. These durations are synchronized with

the  BDE  shift  calendar,  i.e.  shift  breaks  are  not  included.  Consequently,  this  value  does  not

necessarily correspond to the period of time between logon and logoff.

Field description master data category

Workplace

Unique ID defined in the workplace configuration.

Designation

Machine name as defined in the workplace configuration.

Comment

Comment on the machine as defined in the workplace configuration.

Group

Capacity group which the machine was assigned to.

MDE-MMD_82.docx

Version: 1.0.23049

Page 28 of 45

Monitoring of Machine Data (MOC)

Cost center

Cost center as defined in the workplace configuration.

Company

Company as defined in the workplace configuration.

Responsibility area

Responsibility area required to view this workplace as defined in the workplace configuration.

Field description order category

Order type

Order type of the order for which the event was collected.

order

Order number of the OP for which the event was recorded.

Sequence

Sequence number of the OP (provided that sequences are used).

OP

Split

SOP

Operation number

Split number of the operation (if split OPs are used)

Sub operation number (reserved).

Article

Article number produced by the operation; taken over from operation data.

Article designation/name

Article name of the article.

Field description person category

Person

Personnel number of the person that has been logged on or off (only for Pers. postings)

Last name

The person’s last name who was logged on or off (for personnel postings only).

First name

The person’s first name who was logged on or off (for personnel postings only).

Name

Full  name  (last  name,  middle  name  and  first  name)  of  the  person  who  was  logged  on  or  off  (for

personnel postings only).

MDE-MMD_82.docx

Version: 1.0.23049

Page 29 of 45

Monitoring of Machine Data (MOC)

Field description status category

If the event is a machine status, then this category shows the status number and status text name. This

category shows the resource status for events based on resources.

Status

Status number of the assigned status

Status text

Status text of the assigned status

Receiving storage location

Destination when entering a resource status change (RES_STATUS).

Field description maintenance category

Maintenance type

Type of the maintenance

T:

B:

Z:

based on cycles,

based on operating hours

based on time

Maintenance

  Maintenance short text

Target cycles

For maintenance type T only: number of cycles until the maintenance is due again.

Actual cycles

For maintenance type T only: number of cycles accrued since resetting the maintenance interval.

Value results from the machine data collection (MDE).

Planned hours of operation

For maintenance type B only: number of operating hours until maintenance falls due again.

Actual hours of operation

For maintenance type B only: number of operating hours accrued since resetting the maintenance

interval. Value results from the machine data collection (MDE).

Next date

For maintenance type Z only: time when the maintenance falls due the next time.

Processing mode

For maintenance events (RES_WART):

R = Reset

Z = Threshold exceeded

MDE-MMD_82.docx

Version: 1.0.23049

Page 30 of 45

Monitoring of Machine Data (MOC)

A = Enabled/disabled

For changed resource statuses (RES_STATUS):

S = Change over status

Threshold 1 (in %)

Threshold until reaching due date

Threshold 2 (in %)

Threshold until reaching due date

Threshold 3 (in %)

Threshold until reaching due date

Active

“Active” flag of the maintenance activity at the time of the event.

Active (so far)

Only relevant for processing mode A: previous “active” status of the maintenance activity at the time

when the maintenance activity was activated/deactivated.

Modified by

Editor who edited/set/reset the maintenance.

Datum

Date of editing/resetting

Time

Time of editing/resetting

Field description measure category

Maßnahme

Measure name

Designation

Name/description (long text) of the measure.

Reporting person

Person who created the measure.

Verantwortlicher

Person who has to carry out the measure.

Date of solution

Date when the measure has to be completed.

Priority

Priority of the measure.

MDE-MMD_82.docx

Version: 1.0.23049

Page 31 of 45

Monitoring of Machine Data (MOC)

Done

Flag indicating that the measure has been completed.

Done by

Person who marked the measure as being completed.

Field description upload/download category

(Not supported)

Field description comment category

Comment

Comment on the event entered by the employee.

Field description changed partitioning category

Partitioning

Partitioning

Cavity

Cavity number.

Type of modification

Reduced partitioning or increased partitioning.

Reason for change

Number of the reason for change.

Text of reason for change

Text of reason for change

Toolbar

 Generate order (function authorization wphigenorder)

Use the "Generate order" function to create orders from work plans based on Configuration.

 Order information (function authorization: orin)

Request  Order information.

MDE-MMD_82.docx

Version: 1.0.23049

Page 32 of 45

Monitoring of Machine Data (MOC)

4  Machine Time Profile

Overview

Menu

Production facility/Resource management  Resource analysis  Machine
time profile

Transaction code

mtpf

Function authorization  mtpf

Purpose

The machine time profile is the ideal tool for every planner, shift manager and production manager and is

a report/evaluation of the production facility management function.

Integration

The machine time profile is used to  visualize the production and downtime behavior of the machines  in

the  foreman's  area  over  a  specified  period.  A  clear,  graphic  bar  chart  shows  which  machine  conditions

were recorded at what time.

Selection criteria

The application provides the following selection criteria:

Workplace from … to …

This selection criterion refers to the workplace in the machine or workplace master data. You can

also use wildcards (placeholders *).

Group from … to …

This selection criterion refers to the group in the machine or workplace master data. The application

shows all workplaces/machines assigned to the selected group. You can also use wildcards.

Report group

This selection criterion refers to the report groups. The application shows all workplaces/machines

assigned to the selected evaluation/report group.

Responsibility area

This selection criterion refers to the responsibility area within the workplace/machine master. Note:

The user can only view those machines that are included in the responsibility areas assigned to the

user.

MDE-MMD_82.docx

Version: 1.0.23049

Page 33 of 45

Monitoring of Machine Data (MOC)

Short name

This  selection  criterion  refers  to  the  short  name  of  machines  in  the  master  data.  The  application

shows  all  machines  or  workplaces  matching  the  entered  character  string.  You  can  also  use

wildcards.

Company

This selection criterion refers to the company defined in the machine or workplace master data. The

application  shows  all  workplaces/machines  assigned  to  the  selected  company.  You  can  also  use

wildcards.

Status text

By  entering  a  status  text  or  a  part  of  a  status  text,  only  those  machines  and  workplaces  are

displayed that match the entered status text or the specified character string.

Status longer than x minutes

This selection criterion refers to the displayed statuses of the machines or workplaces. The graphic

view only shows the statuses that  were active at the  machine longer than the specified period (in

minutes).

Date from …to (shift/ time)

Use the date selection to restrict the period of time for the data you want to evaluate.

When selections are made using shift(s), the shift date is evaluated. If no shift is selected, all shifts

are used. You can only select machine and order data by shift.

If you select by time, the selection is based on the start date. Both times refer to the beginning or

end of the date period specified above.

You can only evaluate Group workplaces if you select by Time. If you select by  Shift, no data

will be displayed because group workplaces do not refer to shifts.

The  display  shows  the  evaluation  of  the  selected  period  of  time  whether  the  data  is  already

archived or not.

Designation (name)

This field refers to the name of machines and workplaces defined in the machine master data. The

application  only  shows  the  machines  matching  the  specified  character  string.  You  can  also  use

wildcards (placeholders *).

Cost center

This  selection  criterion  refers  to  the  cost  center  stored  in  the  machine  and/or  workplace  master

data. The application shows all machines and/or workplaces assigned to the selected cost center.

You can also use wildcards.

MDE-MMD_82.docx

Version: 1.0.23049

Page 34 of 45

Monitoring of Machine Data (MOC)

RPA number (Resource Performance Account)

By  selecting  one  or  more  RPA  accounts,  the  system  only  displays  the  statuses  assigned  to  the

RPA accounts or the status time entered for the RPA accounts in the graphical evaluation.

Display order

By  activating  this  option,  the  current  operations  per  machine  and  the  individual  statuses  are

displayed in the Gantt chart.

Show all machines

By default, the Machine time profile only displays machines for which the system recorded data in

the selected period (and according to the further selection parameter).

If you check this option, you can display all machines, regardless of whether the system recorded

data for the machines or not. If the system didn't record any data, the machine row is empty.

Show blocked machines

You can configure machines in the Workplace and resource configuration as Blocked. The display

of the blocked machines in the Machine time profile depends on how the checkbox is set.

 Blocked and not blocked machines are displayed (default).

 Only machines are displayed that are not blocked.

 Only machines are displayed that are blocked.

If several selection criteria are used, overlapping results are displayed in the workplace overview.

View criteria

In addition to selecting data in the selection criteria, the graphic display may be changed by further view

criteria:

General

In the General tab, you can group data for the display. Here you can specify a grouping option next

to  the  option  that  a  grouping  should  take  place.  The  following  groupings  are  possible  at  the

moment:

- Group

- Cost center

- Company

Time scale

A  drop-down  box  allows  for  the  displayed  scale  to  be  divided  into  the  dimensions  Seconds,

Minutes, Hours, Days, Weeks and Months. The scale is displayed in the selected dimension. The

checkbox Fit time scale into visible area reduces or increases the selected time range in order for it

to fit into the application (without scrolling). The + and - buttons allow for the data to be increased or

reduced manually or step by step.

MDE-MMD_82.docx

Version: 1.0.23049

Page 35 of 45

Workplace table

This multi-select box allows for the displayed data to be selected in the left table view. The following

Monitoring of Machine Data (MOC)

information is provided:

- Workplace

- Short name

- Rate of capacity utilization

- Reserve of rate of capacity utilization

- Cost center

- Group

Color status

In this tab, the displayed bar colors may be selected according to the RPA colors, status colors and

colors for production and downtime.

A display according to the RPA colors is as follows:

RPA  Abbreviation  Designation (name)

Color

1

2

3

4

5

6

7

8

9

10

11

12

SUT

Secondary utilization time

 Dark green

DCI

LCI

Disturbance-caused interruption (=
technical interruption)

Logistics-caused interruption (=
organizational interruption)

SCI

Staff-caused interruption

IMN

Idle mode, not scheduled

Red

Fuchsia

Purple

Black

IMS

Idle mode, scheduled

Dark gray

SET

Setup

STA

Startup

Light turquoise

Light blue

U8

U9

Free (e.g. pilot production, or similar)

Dark blue

Free (off work)

Brown

MUT

Main utilization time; "Production"

Light green

BKS

Neutral times, e.g.  off, breaks etc., i.e.
times that are not recorded

Olive

MDE-MMD_82.docx

Version: 1.0.23049

Page 36 of 45

Operation colors

If data is displayed according to the selection criteria, it may be shown in different colors according

Monitoring of Machine Data (MOC)

to the following criteria:

- Category

- Order type

- Order

- Article

- Tool

Detail application Machine time profile

The Machine time profile is displayed and divided into a tabular view of the selected

workplaces/machines and the graphic view of status development.

Tabular overview

The  table  overview  shows  the  workplaces/machines  including  additional  information,  which  have  been

selected  for  the  graphic  view.  The  type  and  grouping  of  data  may  be  determined  as  described  in  the

display criteria.

In  addition  to  displaying  master  data  for  the  selected  workplaces/machines,  such  as  short  name,  cost

center  and  group,  it  is  also  possible  to  display  the  rate  of  capacity  utilization  and  the  reserve  for  the

capacity utilization rate.

Rate of capacity utilization

The rate of capacity utilization is calculated from the ratio production time and total time.

Formula:

The rate of capacity utilization is always calculated on the basis of all downtimes (not only the ones

displayed) compared to the total time.

Reserve for the rate of capacity utilization

The  reserve  for  the  rate  of  capacity  utilization  is  calculated  from  the  ratio  of  the  displayed

downtimes to the total time

Gaps  which  are  smaller  than  the  typical  part  running  time  on  a  machine  and  the  required  times

(status  Assembly),  do  not  constitute  a  utilization  reserve.  These  times  are  often  not  included  and

are therefore hidden.

Formula:

MDE-MMD_82.docx

Version: 1.0.23049

Page 37 of 45

Monitoring of Machine Data (MOC)

Table view context menu

Workplaces/machines

Opens the Workplaces application using the tabular overview of the workplaces/machines.

Status report

Opens  the  Status  report  (machine-related)  application  using  the  tabular  overview  of  the

workplaces/machines.

Graphic view

The  graphic  view  shows  which  machine  conditions  were  recorded  at  the  individual  machines  at  which

point  in  time.  The  machine  time  profile  has  been  designed  to  represent  the  production  and  downtime

performance of machines of the foreman area over a specified period of time.

In  case  of  very  short  status  durations,  it  might  happen  -  depending  on  the  Gantt  or  screen

resolution - that one pixel represents several seconds. For this reason, individual statuses might

be displayed or hidden. For the display of very short statuses, you must increase the resolution.

"Graphic view" context menu

Order overview

Opens the Order overview application using the operations displayed in the graphic view.

Operation overview

Opens the Operation overview application using the operations displayed in the graphic view.

Machine-related postings

Change  to  Machine-related  postings  with  the  transfer  of  the  following  parameter  in  the  selection

area:

  Machine number
  Date from - to
  Shift number

Note  on  the  display  of  shifts:  If  a  machine  status  is  applied  over  several  shifts,  a  machine

posting is created in the system for each shift. In this case only one status is displayed for the

machine time profile.

MDE-MMD_82.docx

Version: 1.0.23049

Page 38 of 45

Monitoring of Machine Data (MOC)

5  Cycle Parameters

Summary

Menu

Master data  Workplaces/ machines  Cycle parameters

Transaction code

cycpa

Function authorization  mdcycl

Usage

HYDRA  provides  the  ability  to  monitor  cycle  times  within  the  machine  data  recording  function  without

requiring HYDRA process data processing to be used.

The purpose of this function is to configure the action and tolerance limits.

Integration

Values  are  marked  in  different  colors  in  the  Workplace  overview  depending  on  whether  the  action  or

tolerance limit was exceeded:

Standard

Black

If the value drops below or exceeds the action limit

Blue

If  the  value  drops  below  or  exceeds  the  tolerance

Red

limit

If a limit is exceeded, no further processing steps are taken in HYRDRA.

Requirement

Before defining any configurations, you must first set up the machine.

Selection criteria

The application provides the following selection criteria:

Machine

Selection by machine/ workplace

MDE-MMD_82.docx

Version: 1.0.23049

Page 39 of 45

Monitoring of Machine Data (MOC)

Field descriptions

Machine

Machine for which the configuration applies.

Tolerance limit positive, negative

Values may not drop below or exceed the percentage values  defined here.  The cycle time of the

logged  on  operation  is  always  used  as  the  target  value  for  cycle  time  monitoring.  This  can  be

corrected at the terminal. The limit value is entered as a percentage of the target value.

Example: Target value:

20 sec/ cycle

tolerance positive:

10 %

tolerance negative:

5 %

Thus, this results in the following limit values:

Upper limit value:

22 sec/ cycle

lower limit value:

19 sec/ cycle

Action limit positive, negative

Percentage values can be entered here, triggering a warning once they have been reached. This is

why the action  limits should be defined more narrowly  than the tolerance limits. The limit value is

entered as a percentage of the target value.

MDE-MMD_82.docx

Version: 1.0.23049

Page 40 of 45

Monitoring of Machine Data (MOC)

6  Cycle progression

Overview

Menu

Resource management  Key figures  Cycle progression

Transaction code

Cycl

Function authorization  Cycl

Purpose

The purpose of this overview is to show a timely presentation of a machine's cycle development over a

period of time that you can select.

Integration

The data displayed here  are collected and saved as  part of the machine data collection (MDE).  Please

also note the information about the database at the end of this section.

Requirements

Please also note the information about the database at the end of this section.

Selection criteria

The application provides the following selection criteria:

Workplace

Enter  the  number  of  the  workplace/  machine,  for  which  you  would  like  to  display  a  cycle

progression.

Point in time ... to ...

When the application is pulled up, the point in time is predefined as follows:

From:

Date = "yesterday"/ time = "now"

To:

Date = "today"/ time = "now"

Choose the point in time for which the cycle progression should be displayed. Please keep in mind

that the length of the point in time will affect data calculation and therefore the response time for the

evaluation.

Grid

When the application is pulled up, the grid "point in time" is predefined. Choose the desired grid in

which you would like the evaluation to run.

MDE-MMD_82.docx

Version: 1.0.23049

Page 41 of 45

Monitoring of Machine Data (MOC)

If grid spacing is chosen (not equal to "point in time"), then the calculated actual cycle

is the arithmetic mean value of all random samples of actual cycles in the relevant grid

spacing period:

The  time  for  the  values  in  this  case  is  the  end  time  of  the  grid  interval.  Thus,  for

example, for hour grids, the values between 13.00 and 14.00 are averaged and 14.00

is displayed as the point in time.

Tabular report

Different presentation options can be chosen for the table view. The below-mentioned data is shown:

Date, time

Point  in  time  when  actual  cycle  data  was  saved.  Please  also  note  the  information  about  the  data

basis at the end of this section.

Sec/ cycle (depending on the selected table)

Shows the actual cycle in [seconds/cycle].

Cycle/ sec (depending on the selected table)

Shows the actual cycle in [cycles/seconds].

Min/ cycle (depending on the selected table)

Shows the actual cycle in [minutes/cycle].

Cycle/ min (depending on the selected table)

Shows the actual cycle in [cycles/minutes].

LTL (lower tolerance limit)

Calculated lower tolerance limit for the selected machine based on the target cycle available when

the actual cycle was saved and on the configuration Cycle parameter.

Formula: LTL = Target cycle - (Target cycle * [Tolerance limit, negative] / 100)

LAL

Calculated lower action limit for the selected machine based on the target cycle available when the

actual cycle was saved and on the configuration Cycle parameter.

Formula: LAL = Target cycle - (Target cycle * [action limit, negative] / 100)

MDE-MMD_82.docx

Version: 1.0.23049

Page 42 of 45

Monitoring of Machine Data (MOC)

UAL

Calculated upper action limit for the selected machine based on the target cycle available when the

actual cycle was saved and on the configuration Cycle parameter.

Formula: UAL = Target cycle + (Target cycle * [action limit, positive] / 100)

UTL (upper tolerance limit)

Calculated upper tolerance limit for the selected machine based on the target cycle available when

the actual cycle was saved and on the configuration Cycle parameter.

Formula: UTL = Target cycle + (Target cycle * [Tolerance limit, positive] / 100)

The application does not show the target cycle that is active when saving an actual cycle.

Changes to data in the "machine-related postings" application do not affect this application.

Graphic detail applications

Similar to the tabular detail applications, there are four different detail applications available to show the

values as a graphic display, each of which present the data in a different unit:

  Seconds/ cycle

  Cycles/ second

  Minutes/ cycle

  Cycles/ minute

The tolerance limits (red) and action limits (yellow) are shown in graphics.

Notes on the data basis for the display of cycle progression

The  current  actual  cycle  for  each  of  the  separate  machines  is  stored  together  with  the  current  point  in

time and the currently set target cycle in a special log table using a cyclic process.

MDE-MMD_82.docx

Version: 1.0.23049

Page 43 of 45

Schematic process:

Monitoring of Machine Data (MOC)

By default, the cycle for which the process stores the data in the log table for cycle progression is set to

every 30 minutes. If necessary, this cycle can also be set to lower intervals (e.g. every 15 minutes) while

taking into account the total capacity of the customer's system.

If the value  of an actual cycle stays for a longer time at e.g. 0, the scheduler continues to

create  cyclic  entries.  All  entries  include  the  same  actual  cycle  and  the  same  time  stamp

(time stamp when the value was set).

Subsequent changes to data in the "machine-related postings" application do not affect the

cyclic process.

The application Cycle progression accesses values stored in the log table and displays these as a graph

in the time progression.

By  default,  the  cycle  data  for  a  machine  are  available  for  50  calendar  days.  If  necessary,  the  data  for

each  machine  can  also  be  stored  for  a  longer  time  (e.g.  90  days)  while  taking  into  account  the  total

capacity of the customer's system (must be assured by the customer).

For both cases (modifying logging interval or availability duration of the data), the respective entry must

be adjusted in the Scheduler:

Field

Type

Category

Alterable

Visible

Product key

Value

S (Standard)

I (interval)

Yes

Visible

MDE-BP

MDE-MMD_82.docx

Version: 1.0.23049

Page 44 of 45

Monitoring of Machine Data (MOC)

Field

License key

Value

MDE-BP

HYDRA users

0

Command

Comment

Interval

Active

./mz_zykl.exe  50

MDE cycle progression

00:30:00



You must restart the MES after having modified the values.

The  value  behind  the  command  is  the  availability  period  of  log  data  in  days  for  cycle

analyses.

MDE-MMD_82.docx

Version: 1.0.23049

Page 45 of 45

