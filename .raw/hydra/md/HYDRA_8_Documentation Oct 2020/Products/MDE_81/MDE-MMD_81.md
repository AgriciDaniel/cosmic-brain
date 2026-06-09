Manual

Monitoring of Machine Data
(MOC)
MDE-MMD 8.1

Version 1.0.8791

Last changed on: 19.06.2020

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

MDE-MMD_81.docx

Version: 1.0.18468

Page 2 of 41

Monitoring of Machine Data (MOC)

Contents

1  Overview of Machine Data Monitoring ......................................................... 4

2  Workplaces/Machines .................................................................................. 6

3  Machine History ......................................................................................... 21

4  Machine Time Profile ................................................................................. 31

5  Cycle Parameters ....................................................................................... 36

6  Cycle Progression ...................................................................................... 38

MDE-MMD_81.docx

Version: 1.0.18468

Page 3 of 41

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

MDE-MMD_81.docx

Version: 1.0.18468

Page 4 of 41

Monitoring of Machine Data (MOC)

o  Machine  history  for  the  tabular  presentation  of  machine-related  and  order-related

postings performed at a machine/workplace.

MDE-MMD_81.docx

Version: 1.0.18468

Page 5 of 41

Monitoring of Machine Data (MOC)

2  Workplaces/Machines

1.1  Summary

Menu

Production Facility Management  Current Information
 Workplaces/Machines

Transaction code

wpov

Function authorization  wpov

Utilization

The workplace overview function is a report for production management. It aims at users from production

scheduling  and  monitoring,  schedulers,  foremen,  operators  or  all  MOC  users  who  would  like  to  get  a

comprehensive  overview  of  the  production  situation  at  certain  workplaces/machines  or  a  complete

organizational unit.

Integration

At the push of a button, the workplace overview provides all pieces of information relevant for workplaces.

In addition to master data, the function also provides the data required to control the production process,

such as

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

Workplace from... to ...

This selection criterion refers to the workplace within the machine/workplace master. Wildcards (*) can be

used.

Group from ... to ...

This selection criterion refers to the group in the machine or workplace master. All workplaces/machines

assigned to the selected group are displayed. Wildcards may be used.

MDE-MMD_81.docx

Version: 1.0.18468

Page 6 of 41

Monitoring of Machine Data (MOC)

Evaluation/report group

This selection criterion refers to the evaluation groups. All workplaces/machines assigned to the selected

evaluation/report group are displayed.

Designation

This field refers to the designation of machines and workplaces within the machine master data. Only the

machines matching the specified character string are displayed. Wildcards (*) can be used in this field.

Short name

This  selection  criterion  refers  to  the  short  name  of  the  machines  within  master  data.  All  machines  or

workplaces matching the entered character string are displayed. It is possible to use wildcards.

Responsibility area

This  selection  criterion  refers  to  the  responsibility  area  within  the  workplace/machine  master.  Please

respect  that  only  machines  are  displayed,  for  which  the  user  is  authorized  by  the  corresponding

responsibility areas.

Company

This  selection  criterion  refers  to  the  company  defined  in  the  machine  or  workplace  master.  All

workplaces/machines assigned to the selected company are displayed. Wildcards may be used.

Cost center

This  selection  criterion  refers  to  the  cost  center  defined  in  the  machine  or  workplace  master.  All

workplaces/machines  assigned  to  the  selected  cost  center  are  displayed.  You  can  also  run  a  search

using wildcards.

Status

This  selection  criterion  refers  to  the  current  machine  or  workplace  status.  All  machines  or  workplaces,

which are currently assigned to the selected status, are displayed.

Status longer than

This selection criterion refers to the current status of machines or workplaces. All machines or workplaces

are  shown  that  are  currently  assigned  to  the  selected  status  and  that  are  assigned  to  this  status  for  a

longer period than the one specified.

If several selection criteria are used overlapping results are displayed in the workplace overview.

MDE-MMD_81.docx

Version: 1.0.18468

Page 7 of 41

Monitoring of Machine Data (MOC)

"Workplace overview" detail application

The  detail  application  “workplace  overview”  shows  all  workplaces  subject  to  the  selections  made  within

the selection panel. The display is refreshed cyclically every three minutes. The current status, workplace

information, shift quantities, cycles and cycle figures are presented. The following list describes the data

available in the table. If this data is not displayed by default it can be added using the column selection

function.

In  addition  operation  data  is  also  shown,  provided  that  an  operation  is  currently  logged  on.  In  case

several operations are logged on to a machine, only the first operation is shown in the detail application.

Status

The "status" column summarizes the different statuses and presents them as an "LED". Coloring is

as follows:

Light green

Status with RPA 11 (normally "Production")

Status with RPA 7 (normally "Setup")

Status 30000 (normally "Not assigned")

Status 20000 or status with RPA 12

(normally break/no shift

Status < 10000 and RPA <> [7,11,12]   other statuses/downtimes

BLUE

RED

GRAY

Yellow

Master data

Workplace

Unique ID defined within the workplace configuration.

Short name

Machine designation as defined in the workplace configuration

Designation

Long text/comment on the machine as defined in the workplace configuration.

Groups

Group according to workplace configuration to which the machine has been assigned.

Cost centers

Cost center as defined in the workplace configuration

Company

Company as defined in the workplace configuration.

Responsibility area

Responsibility area required to view this workplace as it is defined in the workplace configuration

Model

Workplace model according to workplace configuration.

MDE-MMD_81.docx

Version: 1.0.18468

Page 8 of 41

Monitoring of Machine Data (MOC)

Type

Workplace type according to the workplace configuration.

Status

Status

Status  number  of  the  status  that  is  currently  active  at  the  workplace.  Color  of  the  currently  active

status according to configuration.

Status designation

Status designation of the status that is currently active at the workplace.

Status since

Date when the status was assigned.

Status since

Point in time when the status was assigned.

Duration so far

Present duration of the status that is currently available at this workplace.

Expected total duration

Expected  status  duration  recorded  by  the  employee  when  assigning  the  status  at  the  terminal  or

that is defined in the status configuration.

Expected end

“Status since” + expected duration; synchronized with the Gregorian calendar.

Expected remaining runtime

“Expected end“ minus “now“ Please note: if the remaining runtime is negative the expected end is

already overdue. In this case, the field is highlighted in red.

Shift quantities primary quantity unit/secondary quantity unit/tertiary

quantity unit/base quantity unit

Yield

Yield that has been posted so far at the selected workplace within the current shift.

Scrap

Scrap that has been posted so far at the selected workplace in the current shift.

Rework

Rework quantity that has been posted so far at the selected workplace in the current shift.

Open quantity

Open quantity that has been posted so far at the selected workplace within the current shift.

MDE-MMD_81.docx

Version: 1.0.18468

Page 9 of 41

Monitoring of Machine Data (MOC)

Unit

Unit of primary quantity

Cycle

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

There is no target cycle for machines to which no OP is currently logged on. For this reason, the

target stroke number is 0.

Actual cycle number

1 / actual cycle

Difference (%)

(target cycle number – actual cycle number) / target stroke number * 100%

Please note: For rounding reasons, the difference indicated here might deviate from the difference

shown in the "cycle" category.

MDE-MMD_81.docx

Version: 1.0.18468

Page 10 of 41

Monitoring of Machine Data (MOC)

Actual cycle number (OP)

The actual cycle number (OP) is a value relating to orders. The values used for the calculation all

refer  to  order  logons  and,  as  a  result,  they  are  independent  from  the  current  machine  status.

Formula: Actual cycle number OP = yield OP/ (partitioning OP * RPA11 OP)

Difference (OP) (%)

The difference OP column is computed by the following formula:

DifferenceOP = Abs((target cycle number – actual cycle number OP) / target cycle number * 100)

Coloring of the "difference" column

Coloring for the "difference" column in the "cycle" category may be defined by master data (menu: master

data  >  workplaces/machines  >  cycle  parameters)  per  machine  for  the  upper/lower  action  limits  or

upper/lower tolerance limits. The signed value of the difference column is used for coloring. The value in

the  difference  column  is  displayed  in  red  if  the  tolerance  limits  are  exceeded;  the  value  is  displayed  in

blue  if  the  action  limits  are  exceeded.  The  data  is  not  displayed  in  color  if  no  cycle  parameters  are

defined.

"Image" detail application

The  picture  in  the  “image”  detail  application  shows  the  picture  of  a  machine  from  the  machine

configuration. The image of the machine selected in the “workplaces” detail application is displayed.

The following image formats are supported: jpg, gif, png, tif, bmp, ico, emf, and wmf. The pictures have to

be filed in a directory that may be accessed via the path ID “MOCWPIMG” within the path configuration.

Further detailed information about the configuration can be found here.

"Operations logged on" detail application

The detail application “operations logged on” shows all currently registered operations that are currently

logged  on  to  workplaces/machines,  which  are  selected  in  the  detail  application  “workplaces”.  The

following  list  describes  the  data  available  in  the  table.  If  this  data  is  not  displayed  by  default  it  can  be

added using the column selection function.

Workplace

Workplace

Workplace to which the operation is logged on.

MDE-MMD_81.docx

Version: 1.0.18468

Page 11 of 41

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

Sub-operation umber (reserved)

OP designation

Designation of the operation

Article

Article number produced by the operation; taken over from operation data

Logon

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

MDE-MMD_81.docx

Version: 1.0.18468

Page 12 of 41

Monitoring of Machine Data (MOC)

Open quantity

Open quantity that has been posted so far to the operation

Yield/target quantity [%]

Proportion of yield to target quantity in %

Yield since logon

Yield since the operation is logged on

"Staff logged on" detail application

The detail application “staff logged on” shows all persons who are logged on to the workplace selected in

the detail application “workplace”. The following list describes the data available in the table. If this data is

not shown by default it may be added using the column selection function.

Workplace

Workplace

Workplace to which the operation is logged on.

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

Staff badge no.

Staff badge number assigned to this person in the HR master.

Operator position

Abbreviation of the operator position to which this person is logged on to at the machine.

Operator position

Unique key of the operator position at this machine to which this person is logged on to.

MDE-MMD_81.docx

Version: 1.0.18468

Page 13 of 41

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

Sub-operation umber (reserved)

OP designation

Designation of the operation

Article

Article number produced by the operation; taken over from operation data

Logon

Date

Time

Date when the operation was last logged on to this workplace

Time when the operation was last logged on to this workplace

Advance logon flag

Flag that the person is logged on automatically when shifts change the next time.

"Resources logged on" detail application

The  detail  application  “resources  logged  on”  shows  all  resources  that  are  logged  on  to  the  workplace

selected in the detail application “workplace”. The following list describes the data available in the table. If

this data is not displayed by default it can be added using the column selection function.

Workplace

Workplace

Workplace to which the operation is logged on.

MDE-MMD_81.docx

Version: 1.0.18468

Page 14 of 41

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

Logon

Date

Time

Date when the resource was last logged on to this workplace.

Time when the resource was last logged on to this workplace.

"Maintenances" detail application

The  detail  application  “maintenances”  shows  all  active  maintenances  for  the  workplace  that  is  currently

selected in the selection panel. The following list shows the data available in the table. If this data is not

displayed by default it can be added using the column selection function.

Maintenance

Active

Active

light green

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

Type

Maintenance type defined for the maintenance:

MDE-MMD_81.docx

Version: 1.0.18468

Page 15 of 41

Monitoring of Machine Data (MOC)

T (cycle-based),

B (operating hours),

Z (time-based)

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

Editor

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

MDE-MMD_81.docx

Version: 1.0.18468

Page 16 of 41

Monitoring of Machine Data (MOC)

Next maintenance on

Date when the next maintenance falls due.

Interval

Interval within which the maintenance is to be performed; from the maintenance configuration.

Info 1 - 6

Additional text 1-6 from the maintenance configuration

"Produced material" detail application

The detail application “produced material” shows output materials on the basis of batch numbers that are

logged on to the workplace selected in the detail application “workplace”. The following list describes the

data  available  in  the  table.  If  this  data  is  not  displayed  by  default  it  can  be  added  using  the  column

selection function.

Workplace

Workplace

Workplace to which the batch is logged on.

Material

Material

Material number of the currently produced material

Material designation

Material designation of the currently produced material; is adopted from the producing operation.

Material type

Material type of the currently producing material; is adopted from the producing OP.

Batch number

Current batch numbers from this material produced by the OP.

Quantity

Quantity

Original quantity of the batch

Remaining quantity

Remaining quantity of the batch

Quantity unit

Quantity unit in which the batch is managed.

MDE-MMD_81.docx

Version: 1.0.18468

Page 17 of 41

Monitoring of Machine Data (MOC)

Logon

Date

Time

Date when the batch was last logged on to this workplace.

Time when the batch was last logged on to this workplace.

Person

Person (personnel number) who changed output batches at last.

"Material in use" detail application

The detail application “material in use” shows input materials that are logged on to the workplace selected

in the detail application “workplace”. The following list describes the data available in the table. If this data

is not displayed by default it can be added using the column selection function.

Workplace

Workplace

Workplace to which the batch is logged on.

Material

Material

Material number of the currently produced material

Material designation

Material designation of the currently produced material; is adopted from the producing operation.

Material type

Material type of the currently producing material; is adopted from the producing OP.

Batch number

Current batch number produced from this material by the OP.

Quantity

Original quantity of the batch

Remaining quantity

Remaining quantity of the batch

Quantity unit

Quantity unit in which the batch is managed.

MDE-MMD_81.docx

Version: 1.0.18468

Page 18 of 41

Monitoring of Machine Data (MOC)

Logon

Date

Time

Date when the batch was last logged on to this workplace.

Time when the batch was last logged on to this workplace.

Person

Person (personnel number) who changed output batches at last.

"Shift durations" detail application

The  detail  application  “RPA  distribution”  shows  RPA  times  of  the  workplace  selected  in  the  detail

application  “workplace”  in  a  pie  chart  within  the  current  shift.  Moving  the  mouse  pointer  across  the  pie

chart shows additional information (RPA abbreviation, duration or percent).

"Shift quantities" detail application

The  detail  application  “shift  quantities”  shows  the  current  shift  quantities,  i.e.  yield,  scrap  in  primary

quantity unit, of the workplace selected in the detail application “workplace” in a bar chart.

"Cycle progression" detail application

The  detail  application  “cycle  progression”  shows  saved  cycle  values  in  a  line  chart  in  [sec/cycle].  The

cycle progression of the workplace selected in the detail application “workplace” is displayed. By clicking

a  radio  button  the  user  can  decide  whether  they  want  to  display  the  current  shift  or  the  last  x  hours.

However, x should be less than 8 hours for performance reasons.

The following limit values are displayed as lines: upper tolerance limit - UTL (red), lower tolerance limit -

LTL (red), upper action limit - UAL (yellow), lower action limit - LAL (yellow). The limits are computed and

displayed on the basis of the "process parameters" configuration.

Please note: The display depends essentially on the size of the detail application.

"Downtime hit list" detail application

The  downtime  hit  list  shows  the  top  x  of  current  downtimes  (status  is  not  production)  of  the  currently

selected  workplace  within  the  current  shift  or  the  last  hours.  They  are  represented  in  a  horizontal  bar

chart.

Using the radio buttons, it is possible to show the statuses, which have so far occurred in the current shift,

or the statuses of the last x hours. By another radio button, the user can configure the display according

to downtime durations or the number of respective downtimes.

MDE-MMD_81.docx

Version: 1.0.18468

Page 19 of 41

Monitoring of Machine Data (MOC)

The TOP X input field allows for the number of statuses to be defined (preassignment: 5).

The  color  of  status  bars  corresponds  to  the  color  defined  for  the  status  text  within  the  HYDRA

configuration. The status bar is displayed in gray, in case no color is defined for the status. The status text

as well as a value (duration in hours or quantity) are displayed for each bar.

Toolbar

Entry

   Log on

Operations can be logged on to the system using the "log on“ function

   Partial confirmation/upload

The "partial upload" function allows for partial uploads on operations to be recorded in the system.

   Interrupt

Operations can be interrupted in the system using the "interrupt“ function

Log off

Operations can be logged off from the system using the "log off“ function

   Terminate

Interrupted or prepared operations can be logged off from the system using the "terminate“ function

Staff

   Log person on

A person may be logged on to an operation/machine using the log person on function

    Log person off

A  person  may  be  logged  off  from  the  corresponding  operation/machine  using  the  log  person  off

function

MDE-MMD_81.docx

Version: 1.0.18468

Page 20 of 41

Monitoring of Machine Data (MOC)

3  Machine History

Summary

Menu

Production  facility  management  -->  Production  facility  analysis  -->  Machine
history

Transaction code

wphi

Function authorization  wphi

Utilization

The machine history is a report for the production management. The application allows for tracking and

tracing of events that need to be posted at workplaces within MES. In this context, posting events such as

status changes, order, tool, and personnel postings, maintenance activities as well as measures recorded

at  a  workplace  are  listed  in  chronological  order  within  a  table.  Different  selection  criteria  allow  for  the

events and periods to be evaluated.

Selection criteria

The application provides the following selection criteria:

Workplace from... to ...

This selection criterion refers to the workplace within the machine/workplace master. Wildcards (*)

can be used.

Group from ... to ...

This  selection  criterion  refers

to

the  group

in

the  machine  or  workplace  master.  All

workplaces/machines assigned to the selected group are displayed. It is possible to use wildcards.

Short name

This selection criterion refers to the short name of machines within the master data. All machines or

workplaces matching the specified character string are displayed. It is possible to use wildcards.

Designation

This  field  refers  to  the  designation  of  machines  and  workplaces  within  the  machine  master  data.

Only the machines matching the specified character string are displayed. Wildcards (*) can be used

in this field.

Cost center

This  selection  criterion  refers  to  the  cost  center  defined  in  the  machine  or  workplace  master.  All

workplaces/machines  assigned  to  the  selected  cost  center  are  displayed.  It  is  possible  to  use

wildcards.

MDE-MMD_81.docx

Version: 1.0.18468

Page 21 of 41

Monitoring of Machine Data (MOC)

Company

This  selection  criterion  refers  to  the  company  defined  in  the  machine  or  workplace  master.  All

workplaces/machines  assigned  to  the  selected  company  are  displayed.  It  is  possible  to  use

wildcards.

Report group

This  selection  criterion  refers  to  the  evaluation  groups.  All  workplaces/machines  assigned  to  the

selected evaluation group are displayed.

Responsibility area

This  selection  criterion  refers  to  the  responsibility  area  within  the  workplace/machine  master.

Please  respect  that  only  machines  are  displayed,  for  which  the  user  is  authorized  by  the

corresponding responsibility areas.

Type

Selects  the  type  of  machine/workplace  that  is  displayed  in  the  evaluation/report.  E  (individual

workplaces) and G (group workplaces) may be selected.

Model

Selects the workplace type. The following workplace models may be selected:

- P Workplace

- N Machine

- J Machining center

- L Line

- A Aggregate

- C CAQ inspection station

- R Reel-based manufacturing

- S Cutting unit

Show comments

If this checkbox is selected recorded comments are displayed additionally in the table.

Comment

When machine  statuses  are  changed,  the  recorded  comments may  be  restricted  in  this  field.  *  is

used as wildcard character. The restricted selection is not case sensitive.

Machine statuses > X minutes only

This parameter only refers to events of the "machine status" type. If the posted duration is greater

than the entered value the machine status is output.

Events

The view of the multiple events may also be restricted. All events are displayed, in case they have

not been restricted.

Designation

Acronym

MDE-MMD_81.docx

Version: 1.0.18468

Page 22 of 41

Monitoring of Machine Data (MOC)

Machine status

M_MST

Production lock

M_PSPERRE

Operation postings

Personnel postings

A_ADE

P_ADE

Default value changes

M_VORGABE

Measure

R_MASSNAHME

Resource posting

R_MELDUNG

Release of resource

R_FREIGABE

Resource status

R_STATUS

Resetting of maintenance

R_WART_RESET

Exceeding of maintenance

R_WART_EXCEEDED

DNC Upload

R_UPLOAD

DNC Download

R_DOWNLOAD

Transfer posting of resources

R_UMBUCHUNG

Please note: Posting of events depends on the customer's system as well on its use. Consequently,

it might be the case that not all events listed here are relevant.

Date from ... until (shift/time)

The period of time of the data to be evaluated can be restricted using the date selection option.

The shift date  is evaluated if shift(s) are selected.  In  case no shift is selected, all shifts are taken

into  consideration.  Please  note  that  a  selection  by  shifts  is  only  supported  for  order  and  machine

data .This is not the case for resource data.

When the “time” option is chosen, the start date is selected. The two times respectively refer to the

beginning or end of the above-mentioned period of dates.

Workplaces  configured  as  “group  workplaces”  may  only  be  evaluated  if  “time”  is  chosen  as

selection option. In case the “shift” option is chosen, nothing is displayed, as there is no relation

to shifts for group workplaces.

"Machine history" detail applications

The machine history  lists all  events, such as status changes, order  or personnel postings  of a machine

that occurred on the day to be evaluated or in a shift of this day. The following postings are shown in the

reports/evaluations:

MDE-MMD_81.docx

Version: 1.0.18468

Page 23 of 41

Monitoring of Machine Data (MOC)

Postings based on machines/workplaces

Machine statuses recorded automatically (with direct machine connection) or assigned manually at

the

terminal,  setting  of

the  production

lock  or  changing  of  default  values  relating

to

machines/workplaces  (target  cycle,  partitioning)  at  the  terminal  or  automatic  configuration  with

operation postings. Provided that a personal badge number is entered with the posting, the person

is  displayed  as  well.  When  it  comes  to  postings  relating  to  machines,  order-related  data  is  not

displayed.

Postings based on orders

Postings  performed  automatically  (when  shifts  change)  or  manually  (logon,  logoff,  interruption)  at

the terminal. The corresponding order is displayed additionally. If it is a manual posting, the person

who  did  the  posting  is  shown  as  well.  If  waiting  period  processing  is  active  the  displayed  time  of

logging the order on represents the time of entry and may deviate from the point in time indicated in

the order log record.

Postings based on persons

Automatic (when shifts change) or manual logon or logoff processes of persons at the terminal. In

addition,  the  corresponding  personnel  number  as  well  as  the  operation  for  which  the  person

produces are displayed.

 Postings based on resources

Postings made for the machine from the HYDRA tool and resource management module (HYDRA-

WRM), e.g. exceeded maintenance or measures/comments may also be displayed.

The total duration of the concerned status / event is also displayed. The duration is always zero when a

person  or  OP  is  logged  on.  On  interruption  /  logging  off  of  an  operation  or  logging  off  of  a  person,  the

interval between the logging on and logging off is output.

Field description

The following list describes the data available in the table. If this data is not displayed by default it can be

added using the column selection function.

Field description "workplace" category

Workplace

Workplace which the event refers to

Field description "event" category

Type

Image presentation on the type

MDE-MMD_81.docx

Version: 1.0.18468

Page 24 of 41

Monitoring of Machine Data (MOC)

Model

Assignment of recorded events. Possible values:

- Machine status

- Production lock

- Operation postings

- Personnel postings

- Default value changes

- Exceeding of maintenance

- Resetting of maintenance

Event

Classifies the event collected at the machine, which is listed in the table row.

Type

Event

Machine status

Production lock

Operation postings

Personnel postings

Machine status according to configuration
Coloring  corresponds  to  the  colors  defined
within status text configuration.

Production
production lock canceled manually

lock

set

manually

OP logged on
OP interrupted
OP logged off

Person logged on
Person logged off

Default value changes

Change of partitioning/change of target cycle

Exceeding
maintenance

Resetting
maintenance

of

Maintenance cycle exceeded

of

Maintenance reset

Date

Time

Entry date of the event

Entry time of the event

Duration

Period of time between the last event of this kind and the one currently displayed. The duration is

only shown for the events "OP INTERRUPTED", "OP LOGGED OFF", "PERSON LOGGED OFF"

as well as for machine statuses. In any other case, 0 is displayed. These durations are durations

synchronized with the shop floor shift calendar, i.e. shift breaks are not included. Consequently, this

value has not necessarily to correspond to the period of time between logon and logoff.

MDE-MMD_81.docx

Version: 1.0.18468

Page 25 of 41

Monitoring of Machine Data (MOC)

Field description "master data" category

Workplace

Unique ID defined within the workplace configuration

Designation

Machine designation as defined in the workplace configuration

Comment

Comment on the machine as defined in the workplace configuration

Group

Capacity group which the machine was assigned to

Cost center

Cost center as defined in the workplace configuration

Company

Company as defined in the workplace configuration.

Responsibility area

Responsibility area required to view this workplace as it is defined in the workplace configuration

Field description "order" category

Order type

Order type of the order, which the event was collected for

Order

Order number of the OP, which the event was recorded for

Sequence

Sequence number of the OP (provided that sequences are used).

OP

Split

SOP

Operation number

Split number of the operation (provided that the split function is used).

Sub-operation umber (reserved)

Article

Article number produced by the operation; adopted from the operation

Article designation

Article designation of the article

MDE-MMD_81.docx

Version: 1.0.18468

Page 26 of 41

Monitoring of Machine Data (MOC)

Field description "person" category

Person

The personnel number of the person who was logged on or off (for personnel postings only)

Last name

The person’s last name who was logged on or off (for personnel postings only)

First name

The person’s first name who was logged on or off (for personnel postings only)

Name

Entire name (last name, second name and first name) of the person who was logged on or off (for

personnel postings only)

Field description "status" category

The status number as well as the status text designation are displayed in this category, provided that the

event is a machine status. The resource status is displayed for events based on resources.

Status

Status number of the assigned status

Status text

Status text of the assigned status

Receiving storage location

Destination when entering a resource status change (RES_STATUS)

Field description "maintenance" category

Maintenance type

Type of the maintenance

T:

B:

Z:

based on cycles,

based on operating hours

Based on time

Maintenance

Short text of the maintenance

Target cycles

For maintenance type T only: number of cycles until the maintenance is due again

Actual cycles

For maintenance type T only: number of cycles accrued since the maintenance interval  has been

reset. Value from machine data collection

MDE-MMD_81.docx

Version: 1.0.18468

Page 27 of 41

Monitoring of Machine Data (MOC)

Target operating hours

For maintenance type B only: number of operating hours until maintenance falls due again.

Actual hours of operation

For maintenance type B only: number of operating hours accrued since resetting the maintenance

interval. Value from machine data collection.

Next date

For maintenance type Z only: time when the maintenance falls due the next time.

Processing mode

For maintenance events (RES_WART):

R = Reset

Z = threshold exceeded

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

when the maintenance activity was activated/deactivated

Editor

Editor who edited/set/reset the maintenance.

Date

Time

Date of editing/resetting

Time of editing/resetting

MDE-MMD_81.docx

Version: 1.0.18468

Page 28 of 41

Monitoring of Machine Data (MOC)

Field description "measure" category

Measure

Measure name

Designation

Designation (long text) of the measure

Reporting person

Person who created the measure

Party in charge

Person who has to do the measure

Date of solution

Date when the measure has to be completed

Priority

Priority of the measure

Done

Flag indicating that the measure has been settled/done

Done by

Person who marked the measure as being settled/done.

Field description "upload/download" category

DNC file

DNC file that has been processed

Dialog ID

Dialog ID that processed the file, e.g. DNC upload

Processing ID

DNC processing ID

DNC field 1

DNC user field 1

DNC field 2

DNC user field 2

DNC field 3

DNC user field 3

DNC field 4

DNC user field 4

MDE-MMD_81.docx

Version: 1.0.18468

Page 29 of 41

Monitoring of Machine Data (MOC)

Field description "comment" category

Comment

Comment on the event entered by the employee

Field description "changed partitioning" category

Partitioning

Partitioning

Cavity

Cavity number

Type of modification

Reduced partitioning or increased partitioning

Reason for changes

Number of the modification reason

Text for the modification reason

Text of the modification reason

Toolbar

 Generate order

Using  the  "generate  order"  function,  orders  may  be  created  from  work  plans  on  the  basis  of  the

specified configuration.

MDE-MMD_81.docx

Version: 1.0.18468

Page 30 of 41

Monitoring of Machine Data (MOC)

4  Machine Time Profile

1.1  Summary

Menu

Production  facility  management  -->  Production  facility  analysis  -->  Machine
time profile

Transaction code

mtpf

Function authorization  mtpf

Utilization

The machine time profile is the ideal tool for every planner, shift manager and production manager and is

a report/evaluation of the production facility management function.

Integration

The machine time profile has been designed  to represent the production  and downtime performance of

machines  of  the  foreman  area  over  a  specified  period  of  time.  A  clear,  graphic  bar  chart  shows  which

machine conditions were recorded at what point in time.

Selection criteria

The application provides the following selection criteria:

Workplace from... to ...

This selection criterion refers to the  workplace in the  machine  or  workplace master. Wildcards (*)

can be used.

Group from ... to ...

This  selection  criterion  refers

to

the  group

in

the  machine  or  workplace  master.  All

workplaces/machines assigned to the selected group are displayed. Wildcards can be used.

Evaluation group

This  selection  criterion  refers  to  the  evaluation  groups.  All  workplaces/machines  assigned  to  the

selected evaluation group are displayed.

Responsibility area

This  selection  criterion  refers  to  the  responsibility  area  within  the  workplace/machine  master.

Please  respect  that  only  machines  are  displayed,  for  which  the  user  is  authorized  by  the

corresponding responsibility areas.

MDE-MMD_81.docx

Version: 1.0.18468

Page 31 of 41

Monitoring of Machine Data (MOC)

Short name

This  selection  criterion  refers  to  the  short  name  of  machines  within  master  data.  All  machines  or

workplaces matching the specified character string are displayed. Wildcards can be used.

Company

This  selection  criterion  refers  to  the  company  defined  in  the  machine  or  workplace  master.  All

workplaces/machines assigned to the selected company are displayed. Wildcards can be used.

Status text

By  entering  a  status  text  or  a  part  of  a  status  text,  only  those  machines  and  workplaces  are

displayed that match the entered status text or the specified character string.

Status longer than x minutes

This selection criterion refers to the displayed statuses of the machines or workplaces. The graphic

view only shows the statuses that  were active at the  machine longer than the specified period (in

minutes).

Date from ... until (shift/time)

The period of time of the data to be selected can be restricted using the date selection option.

The shift date is evaluated if shift(s) are selected. In case no shift is selected all shifts are taken into

consideration. Please note that a selection by shifts is only supported for order and machine data

.This is not the case for resource data.

The start date is selected if the selection is made by the time. The two times respectively refer to

the beginning or end of the above-mentioned period of dates.

Workplaces configured as "group workplaces" may only be evaluated provided that a selection

is made via the "time". Nothing is displayed if selected by "shift" as there is not shift relation for

group workplaces.

Designation

This  field  refers  to  the  designation  of  machines  and  workplaces  within  the  machine  master  data.

Only the machines matching the specified character string are displayed. Wildcards (*) can be used

in this field.

Cost center

This  selection  criterion  refers  to  the  cost  center  defined  in  the  machine  or  workplace  master.  All

workplaces/machines assigned to the selected cost center are displayed. Wildcards can be used.

RPA number (Resource Performance Account)

If  one  or  several  resource  performance  accounts  are  selected  only  the  statuses,  which  were

assigned  to  the  corresponding  RP  accounts  or  the  status  time  that  was  recorded  on  the

corresponding RP accounts, are displayed in the graphic evaluation.

MDE-MMD_81.docx

Version: 1.0.18468

Page 32 of 41

Monitoring of Machine Data (MOC)

Display order

If  this  option  is  checked  the  operations  that  ran  per  machine  are  displayed  in  addition  to  the

individual statuses within the Gantt.

If  several  selection  criteria  are  used  overlapping  selection  criteria  are  displayed  in  the  workplace

overview.

View criteria

In addition  to selecting data  within  the selection criteria, the graphic representation may  be changed by

further view criteria:

General

In the "general" tab data may be grouped for the display. In addition to the option of defining that a

grouping  is  to  be  made,  a  grouping  option  may  also  be  indicated.  The  following  groupings  are

possible at the moment:

- Group

- Cost center

- Company

Time scale

A  drop-down  box  allows  for  the  displayed  scale  to  be  divided  into  the  dimensions  "seconds",

"minutes", "hours", "days", "weeks" and "months". The scale is displayed in the selected dimension.

The checkbox "fit time scale into visible area" reduces or increases the selected time range in order

for  it  to  fit  into  the  application  (without  scrolling).  The  "+"  and  "-"  buttons  allow  for  data  to  be

increased or reduced manually or step by step.

Workplace table

This  multi-select  box  allows  for  the  displayed  data  to  be  selected  in  the  left  table  view.  The

folllowing information is provided:

- Workplace

- Short name

- Rate of capacity utilization

- Reserve of rate of capacity utilization

- Cost center and

- Group

Color status

In this tab the displayed bar colors may be selected according to the RPA colors, status colors and

colors for production and downtime.

MDE-MMD_81.docx

Version: 1.0.18468

Page 33 of 41

Operation colors

If data is displayed according to the selection criteria, it may be shown in different colors according

Monitoring of Machine Data (MOC)

to the following criteria:

- Category

- Order type

- Order

- Article and

- Tool

"Machine time profile" detail applications

The  machine

time  profile

is  displayed  and  divided

into  a

tabular  view  of

the  selected

workplaces/machines and the graphic view of status development.

Tabular overview

The  table  view  shows  the  workplaces/machines  including  additional  information,  which  have  been

selected  for  the  graphic  view.  The  type  and  grouping  of  data  may  be  determined,  as  described  in  the

presentation criteria.

In  addition  to  displaying  master  data  for  the  selected  workplaces/machines,  such  as  short  name,  cost

center  and  group,  it  is  also  possible  to  display  the  rate  of  capacity  utilization  and  the  reserve  for  the

capacity utilization rate.

Rate of capacity utilization

The  rate  of  capacity  utilization  is  computed  from  the  relation  between  production  time  and  total

time.

Formula:

The rate of capacity utilization is always calculated on the basis of all downtimes (not only the ones

displayed) compared to the total time.

Reserve for the rate of capacity utilization

The  reserve  for  the  rate  of  capacity  utilization  is  computed  from  the  proportion  of  displayed

downtimes compared with the total time.

Gaps  that  are  less  than  the  typical  time  required  per  piece  at  a  machine  as  well  as  times  that

cannot  be  avoided  (e.g.  "works  meeting"  status)  cannot  build  a  reserve  for  the  rate  of  capacity

utilization. Consequently, they are not taken into account if they are hidden accordingly.

Formula:

MDE-MMD_81.docx

Version: 1.0.18468

Page 34 of 41

111101)tandet(nnBMKnZeitendsStillseausgeblenBMKn

Monitoring of Machine Data (MOC)

"Table view" context menu

Workplaces/machines

Opens the workplaces application using the tabular overview of the workplaces/machines.

Status report

Opens  the  status  report  (machine-related)  application  using  the  tabular  overview  of  the

workplaces/machines.

Graphic view

The  graphic  view  shows  which  machine  conditions  were  recorded  at  the  individual  machines  at  which

point  in  time.  The  machine  time  profile  has  been  designed  to  represent  the  production  and  downtime

performance of machines of the foreman area over a specified period of time.

"Graphic view" context menu

Order overview

Opens the order overview application using the operations displayed in the graphic view.

Operation overview

Opens the operation overview application using the operations displayed in the graphic view.

MDE-MMD_81.docx

Version: 1.0.18468

Page 35 of 41

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

MDE-MMD_81.docx

Version: 1.0.18468

Page 36 of 41

Monitoring of Machine Data (MOC)

Field descriptions

Machine

Machine for which the configuration applies.

Tolerance limit positive, negative

Values may not drop below or  exceed the percentage values defined here.  The cycle time of the

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

MDE-MMD_81.docx

Version: 1.0.18468

Page 37 of 41

Monitoring of Machine Data (MOC)

6  Cycle Progression

Overview

Menu

Production facility management  Key figures  Cycle progression

Transaction code

Cycl

Function authorization  Cycl

Usage

The purpose of this overview is to show a timely presentation of a machine's cycle development over an

arbitrarily selectable period of time.

Integration

The data displayed here  are collected and saved as  part of the machine data collection (MDE).  Please

also note the information about the database at the end of this section.

Requirement

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

MDE-MMD_81.docx

Version: 1.0.18468

Page 38 of 41

Monitoring of Machine Data (MOC)

If grid spacing is chosen (not equal to "point in time"), then the calculated actual cycle

is the arithmetic mean value of all random samples of actual cycles in the relevant grid

spacing period:

IZY = actual cycle

The  time  for  the  values  in  this  case  is  the  end  time  of  the  grid  interval.  Thus,  for

example, for hour girds, the values between 1.00 pm and 2.00 pm are calculated and

2.00 pm is displayed as the point in time.

Tabular report

Different presentation options can be chosen for the table view. The below-mentioned data is shown:

Date, time

Point  in  time  when  actual  cycle  data  was  saved.  Please  also  note  the  information  about  the  data

basis at the end of this section.

Sec/ cycle (depending on what table was selected)

Shows the actual cycle in [seconds/cycle].

Cycle/ sec (depending on what table was selected)

Shows the actual cycle in [cycles/seconds].

Min/ cycle (depending on what table was selected)

Shows the actual cycle in [minutes/cycle].

Cycle/ min (depending on what table was selected)

Shows the actual cycle in [cycles/minutes].

LTL

LAL

Calculated lower tolerance limit for the selected machine based on the target cycle available when

the actual cycle was saved and on the configuration cycle parameter.

Formula: LTL = Target cycle - (Target cycle * [Tolerance limit, negative] / 100)

Calculated lower action limit for the selected machine based on the target cycle available when the

actual cycle was saved and on the configuration cycle parameter.

Formula: LAL = Target cycle - (Target cycle * [action limit, negative] / 100)

MDE-MMD_81.docx

Version: 1.0.18468

Page 39 of 41

Monitoring of Machine Data (MOC)

UAL

UTL

Calculated upper action limit for the selected machine based on the target cycle available when the

actual cycle was saved and on the configuration cycle parameter.

Formula: UAL = Target cycle + (Target cycle * [action limit, positive] / 100)

Calculated upper tolerance limit for the selected machine based on the target cycle available when

the actual cycle was saved and on the configuration cycle parameter.

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

Notes on the database for displaying the cycle progression

The  current  actual  cycle  for  each  of  the  separate  machines  is  stored  together  with  the  current  point  in

time and the currently set target cycle in a special log table using a cyclic process.

Schematic process:

MDE-MMD_81.docx

Version: 1.0.18468

Page 40 of 41

Monitoring of Machine Data (MOC)

By default, the cycle for which the process stores the data in the log table for cycle progression is set to

every 30 minutes.  As needed and  accounting for the  total capacity of the customer's system, this cycle

can also be set to lower intervals (e.g. every 15 minutes).

The function cycle progression accesses values stored in the log table and displays these as a graph in

the time progression.

Changes to data in the "machine-related postings" application do not affect this application.

By default, the cycle data for a machine are available for 50 calendar days. As needed and accounting for

the total capacity of the customer's system (must be assured by the customer), the data for each machine

can also be stored for longer (e.g. 90 days).

For both cases (modifying the logging cycle or availability duration), the respective entry must be adjusted

in the Scheduler.

# Cycle analysis – start it every 30 minutes

L MDE-BP I   30 ./mz_zykl.out      50 > /dev/null 2> /dev/null

             ^ Logging cycle   ^ Availability period of

               (in minutes)      log data in days for

                                     cycle analyses

You must restart the MES after the values have been modified.

MDE-MMD_81.docx

Version: 1.0.18468

Page 41 of 41

