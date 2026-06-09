Manual

Maintenance Calendar for
Machines (MOC)
MDE-MWK 8.1

Version 1.0.4716

Last changed on: 19.06.2020

Maintenance Calendar for Machines (MOC)

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

MDE-MWK_81.docx

Version: 1.0.8858

Page 2 of 16

Maintenance Calendar for Machines (MOC)

Contents

1  Overview of Machine Maintenance Calendar .............................................. 4

2  Maintenance Calendar - Activities Calendar ................................................ 5

MDE-MWK_81.docx

Version: 1.0.8858

Page 3 of 16

Maintenance Calendar for Machines (MOC)

1

 Overview of Machine Maintenance Calendar

Purpose

The maintenance calendar is intended for planning and visualizing maintenance work. This overview is a

valuable  tool  for  foremen  and  maintenance  personnel,  because  only  regular  maintenance  will  allow

expensive resources (e.g. production machines) to continue to produce quality results and not cause any

unnecessary downtimes.

Implementation considerations

You use the function package if you want to monitor machine maintenance intervals:

  based on cycles recorded

  based on durations recorded

  based on the Gregorian calendar

in order to subsequently initiate the relevant maintenance activities.

Integration

Under the MDE MWK license only machine maintenance work is permitted. Functions that relate to other

resources,  however,  are  not  available  there,  or  only  to  a  limited  extent.  The  latter  requires  the  WRM

WWR license.

Features

  Function  for  setting  up  a  maintenance  calendar  allowing  maintenance  activities  to  be  defined

arbitrarily for each machine

  Definition of maintenance activities with a free choice of maintenance intervals with a color-coded

breakdown (3 levels)

  Monitoring of maintenance activities by cycles, hours of operation (with the ability to configure the

relevant resource performance accounts per resource type) and number of days

  Comparison of target and actual values for each maintenance

  Display in machine history of maintenance due dates and maintenance cycle violations.

  Display  of  a  total  maintenance  status  for  assigned  machines  at  Windows-based  shop  floor

terminals

  Function  at  the  HYDRA  client  to  manually  reset  the  actual  values  after  completion  of

maintenance. The maintenance messages go into the machine history.

MDE-MWK_81.docx

Version: 1.0.8858

Page 4 of 16

Maintenance Calendar for Machines (MOC)

2  Maintenance Calendar - Activities Calendar

Summary

Menu

Production  Facilities  Management    Current  Information    Maintenance
Calendar

Transaction code

rmcal

Function authorization

rmcal

Only  through  regular  maintenance  work  can  expensive  resources  (e.g.  production  machines  or  tools)

maintain  their  production  quality  and  unnecessary  downtimes  be  avoided;  this  overview,  therefore,

represents a valuable aid for the foreman and for maintenance personnel. In addition, the calendar also

represents  the  basis  for  maintenance  planning  and  at  the  same  time  has  been  designed  as  data

acquisition tool to record the performed activities.

MDE-MWK_81.docx

Version: 1.0.8858

Page 5 of 16

Maintenance Calendar for Machines (MOC)

Usage

The maintenance calendar or activity calendar is used for the planning and visualization of maintenance

work  or  similar,  recurring  activities.  This  includes,  e.g.  maintenance  activities,  gage  calibrations,  meter

readings  of  manual  energy  counters,  or  similar.  The  "activity  type"  field  is  provided  to  distinguish  the

different functions of activity types. In most cases, nothing is entered here, which suggests maintenance

or  an  activity  relating  to  a  similar  resource.  The  relevant  ID  is  entered  here  (e.g.  ID  "K"  for  gage

calibration)  for  special  requirements  such  as  gage  calibration.  Consequently,  activities  can  also  be

distinguished by their type.

This document describes the mode of operation of the calendar within the framework of the HYDRA Tool

and Resource Management, Energy Management and Gage Calibration.

Monitoring  of  maintenances  or  activities  is  responsible  for  monitoring  the  configured  activities  and

performing the below-mentioned actions:

Refreshing the current values

- "Previously recorded cycles" (cycle-oriented maintenance/activity) or

- "Previously recorded hours" (maintenance/activity of hours of operation).

Setting  the  status  of  an  activity,  when  a  set  threshold  value  (blue/yellow/red)  has  been  exceeded,  and

documentation  of  this  event  in  the  database  (for  purposes  of  evaluation  via  the  resource  history).

Checking for exceeded threshold values follows the order: red > yellow >blue. This means, that a check is

first  made  of  whether  the  threshold  "red"  has  been  exceeded.  If  that  is  so,  this  status  is  set  and

documented. Otherwise, the inspection is continued for the threshold values "yellow" and then "blue".

Monitoring is only run for activities that are marked active and whose validity period includes the current

time.

For  this  purpose,  the  monitoring  process  hywtkupd.out/.exe  is  embedded  in  the  HYDRA  Scheduler  and

run in cycles. .

Any number of activities can be defined for each resource. Several activities can thereby be defined for

each resource. The following types of intervals are available when defining the maintenance times:

Cycle-oriented activity

With cycle-oriented activity, target and actual cycle times are compared. The size of the difference

indicates when maintenance time has been reached. Actual cycle times are automatically recorded

in HYDRA.

Cyclical monitoring of the machine is a precondition of this process

MDE-MWK_81.docx

Version: 1.0.8858

Page 6 of 16

Maintenance Calendar for Machines (MOC)

Activity based on hours of operation

The times recorded in HYDRA are used for maintenance/activity based on hours of operation. For

this reason, it is determined in the resource type which resource performance accounts should be

used for the calculation of the hours of operation. Activity is then due when the interval defined in

the maintenance calendar has been reached.

Time-oriented activity (days)

With  this  type  of  activity,  the  next  maintenance  date  is  calculated  on  the  basis  of  the  number  of

days  which  is  set  as  part  of  the  definition  of  the  activity.  This  number  of  days  is  based  on  the

Gregorian calendar.

Non-recurring activity

Combined  with the above-mentioned types of intervals, it is even possible to define an activity  as

"non-recurring". In this case, the activity is deactivated automatically, once it has been reset.

Please observe the following additional instructions

When  data  is  selected,  users  can  only  view  the  activities  of  such  resources  for  which  they  are

authorized by the responsibility area.

The resource master data  which is required for the maintenance calendar must  be  defined  in  the

resource stock.

For  the  use  of  cycle-oriented  activities  and  maintenance  based  on  hours  of  operation,  resources

must be configured as available for assignment. This can be configured via the resource type.

For  resources  with  DNC  processing,  no  cycle-oriented  activities  and  no  activities  based  on  hours  of

operation can be defined, as these resources cannot be assigned/posted.

This is neither possible for energy counters, as energy counters do not use machine cycles as the data

basis.

Selection criteria

The application provides the following selection criteria:

Resource type

Selects the specified resource type. This field is pre-assigned to the value from the selected line, if

the function is started from the resource stock.

Resource

Selects the specified resource. This field is pre-assigned to the value from the selected line, if the

function is started from the resource stock.

MDE-MWK_81.docx

Version: 1.0.8858

Page 7 of 16

Maintenance Calendar for Machines (MOC)

Field description of the "activity" tab

Resource type

Resource type of the resource for which the activity is defined.

For  the  use  of  cycle-oriented  activities  and  maintenance  based  on  hours  of  operation,  resources

must be configured as available for assignment. This can be configured via the resource type.

For  resource  types  with  DNC  processing,  no  cycle-oriented  maintenance  and  no  maintenance

based on hours of operation can be defined, as these resources cannot be assigned (data cannot

be posted onto them).

Resource

Resource for which the activity is defined.

Activity

Designation  of  the  activity.  The  number  in  front  of  the  name  is  automatically  allocated  when  an

activity is created and gives it a unique identity.

Type

Selection of a type determines how monitoring is to be carried out:

T
B
Z
Depending  on  this  selection,  one  of  the  following  tabs  is  enabled:  Cycles,  Hours  of  operation  or

Cycle-oriented activity
Activity based on hours of operation
Time-oriented activity

Days.

Non-recurring activity

If  this  option  is  checked  the  activity  is  a  non-recurring  activity.  In  this  case,  the  "interval"  field  is

hidden. When the option is reset, the activity is automatically deactivated.

Class

This input field allows for maintenance activities to be classified. For example, all cleaning activities

can be marked as "Cleaning".

Using the grouping function in the overview screen, all maintenance activities of the same class can

be logically gathered together and displayed. Otherwise, this entry field is used for comments.

Active

It  is  possible  to  deactivate  activities  temporarily,  and  reactivate  it  again  at  a  later  time.  The

activation state of an activity is indicated by this display:

Activity enabled
Activity disabled

Disabled activities are not taken into consideration during monitoring.

MDE-MWK_81.docx

Version: 1.0.8858

Page 8 of 16

Maintenance Calendar for Machines (MOC)

Status

A  graphic  display,  in  the  form  of  a  lamp,  is  placed  before  every  activity,  and  clearly  indicates  if  a

maintenance interval will soon expire or has already expired, and that a maintenance  activity must

therefore be carried out. This allows the user to recognize quickly which activity is to be carried out

or is already overdue.

For  this  purpose,  threshold  values,  which  cause  the  color  of  the  lamp  to  change,  are  set  (as  a

percentage  for  cycle-oriented  activities  and  maintenance  based  on  hours  of  operation  and  as  the

number  of  days  for  time-oriented  maintenance).  The  following  4  colors  can  be  defined  (each

corresponding to a status type):

 green

blue

yellow

red

Additional information on this topic is located in the descriptions of the individual interval types (see

below).

Please  note:  The  status  of  the  resource  itself  does  not  change  when  a  maintenance  status  is

reached.

Last activity

This shows the time at which the maintenance activity was last reset and the name of the user who

reset the maintenance.

Please  note  that  the  time  of  resetting  the  maintenance  may  deviate  from  the  time  that  the

maintenance is actually carried out.

Valid from, valid to

Maintenance activities can be assigned time limits by setting these values.

Maintenance  activities  whose  validity  period  does  not  include  the  current  time  are  not  taken  into

consideration during maintenance monitoring, i.e. their maintenance status will not be updated.

Editor

Name of the last user to edit the maintenance activity as well as the time of the last change.

The individual tabs are explained below.

Field description of the "cycles" sub-tab

Interval

The number of machine cycles after which maintenance is to be carried out is to be entered here.

This number, and the following two numbers, refer to the value in the Reference field (see below).

This field is hidden if it is a one-off/non-recurring maintenance.

MDE-MWK_81.docx

Version: 1.0.8858

Page 9 of 16

Maintenance Calendar for Machines (MOC)

Previously recorded cycles

The number of machine cycles recorded so far in HYDRA is displayed here. This value is updated

by  a  cyclical  process.  Additional  information  on  this  is  contained  in  the  section  Maintenance

monitoring.

Next activity after

When  a  new  activity  is  created,  this  value  is  calculated  by  default  from  the  current  actual  value

(actual cycles) + the specified interval.

When the maintenance activity is reset, this value is calculated and points out when the next activity

is due for this maintenance activity.

When  an  activity  is  reset,  the  "calculation  base"  option  can  be  used  to  determine  how  the  next

maintenance due date is to be calculated:

Target value  The value for the next activity is based on the current value:

Next activity after = current value (next activity after) + interval

Actual value  The value for the next activity is based on the number of previously recorded cycles:

Next activity after = previously recorded cycles + interval

Reference

This option must generally be taken into account for the previous values. The following values are

possible here:

G

A

Total
Activity monitoring is based on the total number of cycles previously recorded.

Relating to order/OP
If a resource is logged on by means of an operation logon, then a check is made to ensure

that  activities  with  reference  =  A  exist  for  this  resource.  These  activities  are  then

automatically reset.

On the basis of cycles posted for the currently logged on operation, "monitoring" now checks

whether the interval has been reached, and then sets the status accordingly.

Order related monitoring is not available for resources of the type "MNR“ (machines)!!

This type of maintenance monitoring only makes sense for resources that are logged on to

no more than one operation at any given time. This means that a maximum of one operation

may be logged on to the workstation/machine.

The posting of cycles to a resource does not take place in real time, but at longer intervals

(e.g. at logoff, at interruption of an  operation or during an automatic change of shifts). This

type of monitoring is, therefore, only meaningful for operations that have longer runtimes.

MDE-MWK_81.docx

Version: 1.0.8858

Page 10 of 16

Maintenance Calendar for Machines (MOC)

Blue / Yellow / Red

The threshold values, which determine the status of a maintenance activity, can be entered here as

percentages.

"Previously recorded cycles" < Blue-% from "Next maintenance after"

"Previously  recorded  cycles"  >=  Blue-%  and  <  Yellow-%  from  "Next  maintenance
after"
"Previously recorded cycles" >= Yellow-% and < Red-% from "Next maintenance after"

"Previously recorded cycles" >= Red-% from "Next maintenance after"

The color of the graphic display, or "lamp", depends on the values entered.

green

blue

yellow

red

Please note

The threshold values can be greater than 100%.

No validation check is made with regard to the order of the threshold values.

Field description of the "operating hours" sub-tab

Interval

The period of time, after which the maintenance activity is to be run, should be entered here. This

value, and the two following values, refer to the value in the Reference field (see below).

This field is hidden if it is a one-off/non-recurring activity.

Previously recorded hours

The time previously posted in HYDRA for this resource is shown here. This value is updated by a

cyclical process.

It is to be observed  here  that, for the previously recorded hours, only those RPA times are used,

which have been marked as such in the resource type  (option: RPAs as hours of operation in the

Maintenance Calendar).

Next activity after

On the creation of a new maintenance activity, this value is calculated by default from the current

actual value (previously recorded hours) + the specified interval.

When the activity  is reset, this value is calculated and points out  when the next activity is due for

this maintenance activity.

When a maintenance activity is reset, the "calculation base" option can be used to determine how

the next activity is to be calculated:

Target value  The value for the next activity is based on the current value:

Next activity after = current value (next activity after) + interval

Actual value  The value for the next activity is based on the number of previously recorded hours:

Next activity after = previously recorded hours + interval

MDE-MWK_81.docx

Version: 1.0.8858

Page 11 of 16

Maintenance Calendar for Machines (MOC)

Reference

This option must generally be taken into account for the previous values. The following values are

possible here:

G

A

Total
Activity monitoring is based on the total time that has been posted so far.

Relating to order/OP
If a resource is logged on by means of an operation logon, then a check is made to ensure

that  activities  with  reference  =  A  exist  for  this  resource.  These  activities  are  then

automatically reset.

On  the  basis  of  the  duration  posted  for  the  currently  logged  on  operation,  monitoring  now

checks whether the interval has been reached, and then sets the status accordingly.

This type of maintenance monitoring only makes sense for resources that are logged on to

no more than one operation at any given time. This means that a maximum of one operation

may be logged on to the workstation/machine.

The posting of cycles to a resource does not take place in real time, but at longer intervals

(e.g.  at  logoff,  at  interruption  of  an  operation  or  during  an  automatic  change  of  shift).  This

type of monitoring is, therefore, only meaningful for operations that have longer runtimes.

Blue / Yellow / Red

The threshold values, which determine the status of a maintenance activity, can be entered here as

percentages.

"Previously recorded hours" < Blue-% from "Next activity after"

"Previously recorded hours" >= Blue-% and < Yellow-% from "Next activity after"

"Previously recorded hours" >= Yellow-% and < Red-% from "Next activity after"

"Previously recorded hours" >= Red-% from "Next activity after"

The color of the graphic display, or "lamp", depends on the values entered.

green

blue

yellow

red

Please note

The threshold values can be greater than 100%. No validation check is made with regard to the

order of the threshold values.

Field description of the "days" sub-tab

Interval

Interval in days after which an activity is to be run. This interval is based on the Gregorian calendar.

This field is hidden if it is a one-off/non-recurring activity.

MDE-MWK_81.docx

Version: 1.0.8858

Page 12 of 16

Maintenance Calendar for Machines (MOC)

Next activity after

Date when the next activity falls due.

When a new maintenance is created, this value is calculated by default from the current date + the

specified interval.

Blue / Yellow / Red

The number of days, which determines the status of a maintenance activity, can be entered here.

The  color  of  the  lamp  is  based  on  the  remaining  time,  i.e.  the  difference  between  the  date  of  the

next activity and the current date ("today").

Remaining time <= "Red" value

Remaining time <= "Yellow" value

Remaining time <= "Blue" value

Other

Please note

red

yellow

blue

green

The threshold values can be greater than 100%.

No validation check is made with regard to the order of the threshold values.

Field description of the "assignment" tab

Order

This field is only relevant in connection with the additional feature "generate maintenance orders" or

the "generation of calibration (inspection) orders. A maintenance order/calibration order is assigned

by using the "create order" function that can be started using the button

.

If  this  field  is  filled  out  the  included  order  number  refers  to  a  maintenance/calibration  order.  The

activity  will  automatically  be  reset  if  the  maintenance/calibration  order  is  finished.  As  the

maintenance/calibration  order  is  finished  for  this  activity,  the  order  number  is  also  removed  from

this input field.

Project number

This  field  is  only  relevant  to  the  activity  type  "K"  (calibration),  whereas  there  are  two  different

variants subject to system configuration.

Variant 1 (there is exactly one work plan for all calibration inspection plans):

  =>  Input  of  the  calibration  inspection  plan  number  (without  taking  the  version  number  into

account)

 Variant 2 (there is a separate work plan for each calibration inspection plan)

  => Should be left empty. If it is filled out, this project number will be assigned by default for the

work plan list to be opened within the "order generation" application.

MDE-MWK_81.docx

Version: 1.0.8858

Page 13 of 16

Maintenance Calendar for Machines (MOC)

Planned order

Control field that is currently not used. Consequently it remains empty.

Cost object

Control field that is currently not used. Consequently it remains empty.

Activity type

Identifies the activity type, calibrations, for example, are identified by the type K.

Description of the "information" tab

To ensure that the user or the maintenance worker receives more detailed information about running the

activity (e.g. notes on regulations to be observed, materials to be used), a short description can be stored

for each maintenance activity.

Toolbar

  Activate

Function authorization: rmcal.active

Opens the editing dialog to enable a disabled activity

  Deactivate

Function authorization: rmcal.deactive

Opens the editing dialog disable an enabled activity

  Monitoring

Function authorization: rmcal.monitor

Updates the activity statuses

  Reset

Function authorization: rmcal.reset

Opens the editing dialog to reset an activity

MDE-MWK_81.docx

Version: 1.0.8858

Page 14 of 16

Maintenance Calendar for Machines (MOC)

  Capture reading (EMG 8.1 only)

Function authorization: rmcal.captvalues

Opens the editing dialog to enter the meter reading. Any required number of difference values may

be entered within a time interval. Consequently, it is about delta collection. For this reason, it is also

possible  to  subsequently  enter  data  relating  to  the  past.  If  the  date  fields  are  not  entered,  the

system independently generates the interval from the end of the last data capture as the start time

and the current posting time as the end of the interval.

  Enter absolute values (EMG 8.1 only)

Function authorization: rmcal.captvalues

Opens  the  editing  dialog  to  enter  absolute  meter  values.  The  system  calculates  the  difference  to

the previous meter reading. It is not possible to enter values for past periods. The system sets the

start  time  of  the  interval  to  the  end  of  the  last  data  capture.  The  system  uses  the  current  posting

time if no end is entered.

  Generate order

Function authorization: rmcal.generate

Generates  an  order  by  which the  activity  is to be processed from an organizational point of view.

Once the order is finished, the activity can be reset automatically.

  Activity plan (EMG 8.1 only)

Function authorization: rmcal.timetable

Opens the report activity plan

"Resources logged on" detail application

The  detail  application  provides  additional  information  about  the  resources  logged  on  to  the  machine  for

resources of the type "machine".

Resource type, resource

The currently selected resource and its resource type.

Resource, family, resource type

Resource that is logged on and the family as well as the resource type.

Logon

Date and time of the resource login

MDE-MWK_81.docx

Version: 1.0.8858

Page 15 of 16

Maintenance Calendar for Machines (MOC)

Advance logon

Advance logon flag

MDE-MWK_81.docx

Version: 1.0.8858

Page 16 of 16

