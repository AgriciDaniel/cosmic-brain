Manual

Resource Maintenance
Calendar
WRM-WWR 8.2

Version 1.0.23133

Last changed on: 04.09.2020

Resource Maintenance Calendar

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

WRM-WWR_82.docx

Version: 1.0.23133

Page 2 of 19

Resource Maintenance Calendar

Contents

1  Resource Maintenance Calendar - Overview .............................................. 4

2  Maintenance Calendar (Activity Calendar) .................................................. 5

WRM-WWR_82.docx

Version: 1.0.23133

Page 3 of 19

Resource Maintenance Calendar

1  Resource Maintenance Calendar - Overview

Purpose

The maintenance calendar is intended for planning and visualizing maintenance work. This overview is a

valuable  tool  for  foremen  and  maintenance  personnel,  because  only  regular  maintenance  will  allow

expensive  resources  (e.g.  production  machines  or  tools)  to  continue  to  produce  quality  results  and  not

cause any unnecessary downtimes.

Integration

The  use  of  the  functions  described  here  requires  a  license  for  the  WRM  WWR  and/or  MDE  MWK

functions and the relevant basic licenses for creating and managing resources.

The  MDE-MWK  license  only  allows  machine  maintenance  work.  However,  functions  that  affect  other

resources are not available there, or only to a limited extent.

Features

  Function  for  setting  up  a  maintenance  calendar  allowing  maintenance  activities  to  be  defined

arbitrarily for each resource (tool, machine, auxiliary supplies, etc.)

  Definition of maintenance activities with a free choice of maintenance intervals with a color-coded

breakdown (3 levels)

  Monitoring of maintenance activities by cycles, hours of operation (relevant resource performance

accounts per resource type are configurable) and number of days

  Comparison of target and actual values for each maintenance

  When  maintenance  limits  are  exceeded,  this  is  documented  in  the  resource  history  and  such

instances can be escalated using the ESK (Escalation Management).

  Display  of  maintenance  postings  entered  in  the  history  and  also  shows  if  any  maintenance

intervals have been exceeded.

  Display  of  maintenance  status  for  assigned  machines  and  resources  at  Windows-based  shop

floor data collection terminals

  Function  at  the  HYDRA  client  to  manually  reset  the  actual  values  after  maintenance  has  been

completed. The maintenance postings flow into the resource history. Processing of postings from

client or terminal.

  Assignment of documents for maintenance master data to a maintenance.

  Display of documents for maintenance master data in the MOC and terminal.

WRM-WWR_82.docx

Version: 1.0.23133

Seite 4 von 19

Resource Maintenance Calendar

2  Maintenance Calendar (Activity Calendar)

Overview

Menu

Resource Management  Current information  Maintenance calendar

Transaction code

rmcal

Function authorization

rmcal

This overview is a valuable aid for supervisors and maintenance personnel because only through regular

maintenance,  the  expensive  resources  (e.g.  production  machines  or  tools)  can  retain  their  production

quality  and  do  not  cause  unnecessary  breakdowns.  You  can  also  use  the  calendar  as  basis  for

maintenance planning and as data collection tool to record the activities performed.

WRM-WWR_82.docx

Version: 1.0.23133

Seite 5 von 19

Resource Maintenance Calendar

Purpose

The  maintenance  calendar  or  activity  calendar  has  been  designed  to  plan  and  show  maintenance

activities or other recurring activities. Activities can be maintenance, test equipment calibration, reading of

energy counters and so on.  Use the field Activity type to identify the relevant function and type of activity.

In most cases, this field remains empty which means that a maintenance or similar activity is scheduled

for a resource. For special requirements, e.g. calibration of test equipment, enter the relevant identifier in

this field ("K" to identify calibration of test equipment). That means, the user can differentiate between the

type of activity.

This  document  describes  how  to  use  the  calendar  in  the  HYDRA  Tool  and  Resource  Management,

Energy Management and Gage Calibration.

The  task  of  maintenance  and  activity  monitoring  is  to  track  the  configured  activities  and  perform  the

following actions:

Refreshing the current values

- "Cycles recorded so far" (cycle-based maintenance/activity) or

- "Hours recorded so far" (maintenance/activity via hours of operation).

The status of an activity is set when a configured threshold value (blue/yellow/red) has been exceeded,

and  this  event  is  documented  in  the  database  (to  generate  evaluations  via  the  resource  history).  The

threshold values are checked in the following order: red > yellow > blue. This means, the system checks

first if the threshold value "red" has been exceeded. If so, this status is set and documented. Otherwise,

the inspection is continued for the threshold values "yellow" and then "blue".

Monitoring is only run for activities that are marked active and whose validity period includes the current

time.

For  this  purpose,  the  monitoring  process  hywtkupd.out/.exe  is  embedded  in  the  HYDRA  scheduler  and

cyclically called. .

You can define any number of activities for each resource. Several activities can thereby be defined for

each resource. The following types of intervals are available when defining the maintenance times:

Cycle-based activity

The system compares target and actual cycles with a cycle-based activity. The difference between

the two values indicates when maintenance is due. The actual cycles are automatically recorded in

HYDRA.

Requirement: a cycle monitoring must be performed for the machine.

WRM-WWR_82.docx

Version: 1.0.23133

Seite 6 von 19

Resource Maintenance Calendar

Activity based on hours of operation

The times recorded in HYDRA are used for a maintenance/activity based on hours of operation. In

the Resource type,  you specify the resource performance accounts that are used to calculate the

hours of operation. The activity  is due  when the interval defined in the maintenance calendar has

been reached.

Time-based activity (days)

With this type of activity, the system calculates the next maintenance due date using the number of

days specified for this activity. This number of days is based on the Gregorian calendar.

Single activity

Combined  with  the  above-mentioned  types  of  intervals,  you  can  even  specify  an  activity  as  "non-

recurring". After the reset, the activity is deactivated automatically.

Additional notes:

When  data  is  selected,  the  user  can  only  view  the  activities  of  resources  that  are  included  in  the

responsibility area the user is authorized for.

You  must  have  defined  the  resource  master  data  in  the  resource  stock,  which  is  required  for  the

maintenance calendar.

To  use  resources  with  cycle-based  activities  and  maintenances  based  on  hours  of  operation,  it

must be configured in the system that you can post to these resources. This can be configured via

the resource type.

For  resources  with  DNC  processing,  no  cycle-based  activities  and  no  activities  based  on  hours  of

operation can be defined, as you cannot post data for these resources.

And also for energy counters this is not possible, as energy counters do not use machine cycles as data

basis.

Selection criteria

The application provides the following selection criteria:

Resource type

Selection of the specified resource type.

Resource

Selection of the specified resource.

Field description of the Activity tab

Resource type

Shows the resource type for the defined the activity.

WRM-WWR_82.docx

Version: 1.0.23133

Seite 7 von 19

Resource Maintenance Calendar

To  use  resources  with  cycle-based  activities  and  maintenances  based  on  hours  of  operation,  it

must be configured in the system that you can post to these resources. This can be configured via

the resource type.

For resource types with DNC processing, no cycle-based maintenance and no maintenance based

on hours of operation can be defined, as you cannot post data for these resources.

Resource

Shows the resource the activity is defined for.

Activity

Description  of  the  activity.  When  you  create  an  activity,  the  system  automatically  allocates  a

number to the name and this number identifies the activity.

Type

Select a type to specify how monitoring is carried out:

T
B
Z
Depending on the above selection, one of the tabs Cycles, Hours or Days is released.

Cycle-based activity
Activity based on hours of operation
Time-based activity

Single activity

If this option  is set, the activity is only carried  out  once. In this case, the "interval"  field  is hidden.

When reset, the activity is automatically deactivated.

Class

This input field is used to classify maintenance activities. For example, all cleaning activities can be

classified as "Cleaning".

Using the grouping function in the overview screen, you can combine and display all maintenance

activities that logically belong to the same class. Otherwise, this entry field is used for comments.

Active

It  is  possible  to  deactivate  activities  temporarily,  and  reactivate  them  again  at  a  later  time.  The

following display shows if an activity is currently active or not:

Activity activated
Activity deactivated

Deactivated activities are not integrated in the monitoring.

Authorization (as of service pack 16/2020)

You can use the authorization level to specify the maintenances in detail that a person is allowed to

reset on the Windows terminal AIP.

WRM-WWR_82.docx

Version: 1.0.23133

Seite 8 von 19

Resource Maintenance Calendar

A person can reset a maintenance if the following conditions are fulfilled:

- The option (checkbox) Reset maintenances in the HR master data is activated;

- An authorization level is entered in the HR master data;

-  The  authorization  level  of  the  person  must  be  greater  than  or  equal  to  the  authorization  level

specified in field Authorization of the maintenance.

 The system performs an online validation check on the HYDRA server. The system only performs

the authorization check if a staff badge number has been entered in the AIP input dialog.

If  no  authorization  level  is  specified,  then  the  maintenance  can  always  be  reset  and  the

authorization level stored in the HR master data is not relevant (downward compatibility).

Status

A colored signal in front of each activity clearly shows if a maintenance interval will soon expire or

has already expired, and if a maintenance activity must be carried out. This way, the user can see

at one glance which activity must be carried out or is already overdue.

The user specifies threshold values, which change the color of the signal. For cycle-based activities

and maintenances based on hours of operation, the application shows percentages, for time-based

activities  days  are  shown.  The  following  4  colors  can  be  defined  (each  corresponding  to  a  status

type):

green

blue

 yellow

 red

For further information, please refer to the descriptions of the different interval types (see below).

Note:

The status of the resource itself does not change when a maintenance status is reached.

Last activity

This shows  the time  when  the maintenance activity  was last reset and  the name of the  user  who

reset the maintenance.

Please  note  that  the  time  of  resetting  the  maintenance  may  deviate  from  the  time  that  the

maintenance has actually been carried out.

Valid from, valid until

You specify these times to assign time limits to maintenance activities.

If the current point in time is not included in the validity period of a maintenance activity, then this

maintenance  is  not  integrated  in  the  maintenance  monitoring,  i.e.  the  maintenance  status  is  not

updated.

Modified by

Name of the last user who edited the maintenance activity and time of the last change.

WRM-WWR_82.docx

Version: 1.0.23133

Seite 9 von 19

Resource Maintenance Calendar

The different tabs are explained in the following:

Field descriptions of the Cycles sub-tab

Interval

After  the  number  of  machine  cycles  specified  in  this  field,  the  maintenance  must  be  carried  out.

This number and the two values below refer to the value in the Reference field (see below).

This field is hidden if it is a singular/non-recurring maintenance.

Cycles recorded so far

Here, the system displays the number of machine cycles recorded so far in HYDRA. This value is

updated by a cyclical process. For further information, refer to the section Maintenance monitoring.

Next activity

If  you create a new  activity, then this value is calculated by  default using the current actual value

(actual cycles) + the specified interval.

When  you  reset  the  maintenance  activity,  the  system  calculates  this  value  and  shows  when  the

next activity is due.

When  an  activity  is  reset,  you  can  use  the  Calculation  base  option  to  specify  how  the  next

maintenance due date is calculated:

Target value  The value for the next activity is based on the current value:

Next activity after = current value (next activity after) plus interval

Actual value  The value for the next activity is based on the number of previously recorded cycles:

Next activity after = cycles recorded so far + interval

Reference

For the above values, you must always consider this option. The following values are possible:

G

A

Total
Activity monitoring is based on the total number of cycles recorded so far.

Relating to order/OP
If  a  resource  is  logged  on  with  the  operation  logon,  then  it  is  checked  if  activities  with

reference = A exist for this resource. These activities are then automatically reset.

The monitoring now checks whether the interval  has  been reached  using cycles posted for

the operation currently logged on and sets the status accordingly.

Order-related monitoring is not available for resources of the type "MNR“ (machines)!!

This type of maintenance monitoring only makes sense for resources that are logged on to

one operation at a given time. This means that a maximum of one operation may be logged

WRM-WWR_82.docx

Version: 1.0.23133

Seite 10 von 19

Resource Maintenance Calendar

on to the workstation/machine.

The posting of cycles to a resource does not take place in real time, but at longer intervals

(e.g.  at  logoff,  at  interruption  of  an  operation  or  during  an  automatic  change  of  shifts).

Therefore, this type of monitoring only makes sense for operations with a long runtime.

Blue / Yellow / Red

Enter the threshold values as percentages that identify the status of a maintenance activity.

"Cycles recorded so far" < Blue-% from "Next maintenance after"

"Cycles recorded so far" >= Blue-% and < Yellow-% from "Next maintenance after"

"Cycles recorded so far" >= Yellow-% and < Red-% from "Next maintenance after"

"Cycles recorded so far" =  Red-% from "Next maintenance after"

The relevant values specify the signal color.

green

blue

 yellow

 red

Notes

The threshold values can be greater than 100%.

No validation check is made with regard to the order of the threshold values.

Field descriptions of the Hours sub-tab

Interval

Enter the period of time after which the maintenance activity must be run. This value, and the two

following values, refer to the value in the Reference field (see below).

This field is hidden if this is a single activity.

Hours recorded so far

Here, HYDRA displays the time that has been posted for this resource so far. This value is updated

by a cyclical process.

Please note that for the hours recorded so far, the RPA times are used that are identified as such in

the Resource type (option RPAs as hours of operation in the Maintenance calendar).

Next activity after

This  value  is  calculated  by  default  from  the  current  actual  value  (hours  recorded  so  far)  plus  the

specified interval.

When the activity is reset, this value is calculated and shows when the next maintenance activity is

due.

When a maintenance activity is reset, you can specify how the next activity is to be calculated using

the "Calculation base" option:

Target value  The value for the next activity is based on the current value:

Next activity after = current value (next activity after) plus interval

WRM-WWR_82.docx

Version: 1.0.23133

Seite 11 von 19

Resource Maintenance Calendar

Actual value  The value for the next activity is based on the number of hours recorded so far:

Next activity after = hours recorded so far + interval

Reference

For the above values, you must always consider this option. The following values are possible:

G

A

Total
Activity monitoring is based on the total time that has been posted so far.

Relating to order/OP
If  a  resource  is  logged  on  with  the  operation  logon,  then  it  is  checked  if  activities  with

reference = A exist for this resource. These activities are then automatically reset.

On  the  basis  of  the  duration  posted  for  the  currently  logged  on  operation,  monitoring  now

checks whether the interval has been reached, and then sets the status accordingly.

This type of maintenance monitoring only makes sense for resources that are  logged on to

one operation at a given time. This means that a maximum of one operation may be logged

on to the workstation/machine.

The posting of cycles to a resource does not take place in real time, but at longer intervals

(e.g.  at  logoff,  at  interruption  of  an  operation  or  during  an  automatic  change  of  shifts).

Therefore, this type of monitoring only makes sense for operations with a long runtime.

Blue / Yellow / Red

Enter the threshold values as percentages that identify the status of a maintenance activity.

"Hours recorded so far" < Blue-% from "Next activity after"

"Hours recorded so far" >= Blue-% and < Yellow-% from "Next activity after"

"Hours recorded so far" >= Yellow-% and < Red-% from "Next activity after"

"Hours recorded so far" >= Red-% from "Next activity after"

The relevant values specify the signal color.

green

blue

 yellow

 red

The threshold values can be greater than 100%.

No validation check is made with regard to the order of the threshold values.

Field descriptions of the sub-tab Days

Interval

Interval  in  days  after which an activity is to  be  performed. The interval is based on the Gregorian

calendar.

This field is hidden if this is a single activity.

Next activity on

Date when the next activity is due.

WRM-WWR_82.docx

Version: 1.0.23133

Seite 12 von 19

Resource Maintenance Calendar

When a new maintenance is created, this value is calculated by default from the current date plus

the specified interval.

Blue / Yellow / Red

Enter the number of days that specifies the status of a maintenance activity. The color of the signal

is  based  on  the  remaining  time,  i.e.  the  difference  between  the  date  of  the  next  activity  and  the

current date ("today").

Remaining time <= "Red" value

Remaining time <= "Yellow" value

Remaining time <= "Blue" value

Other

 red

 yellow

blue

green

The threshold values can be greater than 100%.

No validation check is made with regard to the order of the threshold values.

Field description of the Assignment tab

Order

This field is only relevant in connection with the additional feature Generate maintenance orders or

if you generate calibration (inspection) orders. Assign a maintenance order/calibration order using

the "Create order" function that you call with this button

.

If this field is filled, then the order number refers to a maintenance/calibration order. The activity will

automatically  be

reset

if

the  maintenance/calibration  order

is

finished.  When

the

maintenance/calibration  order  is  finished  for  this  activity,  the  order  number  is  also  removed  from

this input field.

Project number

This field is only relevant with activity type "K" (calibration). Depending on the system configuration,

two different variants exist.

Variant 1 (there is exactly one work plan for all calibration inspection plans):

=> Input of the calibration inspection plan number (without version number)

Variant 2 (there is a separate work plan for each calibration inspection plan)

=> should remain empty. If you fill the field, the work plan list called in the application Generation of

orders is pre-filtered by this project number.

Planned order

Control field that is currently not used. Remains empty.

Cost object

Control field that is currently not used. Remains empty.

WRM-WWR_82.docx

Version: 1.0.23133

Seite 13 von 19

Resource Maintenance Calendar

Activity type

Identifies the activity type: For example, calibrations are identified by the type K.

Field descriptions of the Information tab

You can store a short description of the maintenance activity to ensure that the user or the maintenance

worker receive more details on running the activity (e.g. notes on regulations to be observed, materials to

be used).

Field descriptions of the Resource information tab

Inventory number

Shows  the  inventory  number  stored  in  the  resource  configuration.  Additional  information  in  form

of comments.

Engraving number

Shows  the  engraving  number  on  the  device  (machine,  radiator  etc.)  stored  in  the  resource

configuration. Additional information in form of comments.

Drawing number

Shows  the  drawing  number  stored  in  the  resource  configuration.  Additional  information  in  form

of comments.

Manufacturer

Shows  the  drawing  number  stored  in  the  resource  configuration.  Additional  information  in  form

of comments.

Owner

Shows  the  owner  name  stored  in  the  resource  configuration.  Additional  information  in  form

of comments.

Toolbar

  Activate

Function authorization: rmcal.active

Opens the editing dialog to activate an activity

WRM-WWR_82.docx

Version: 1.0.23133

Seite 14 von 19

Resource Maintenance Calendar

  Deactivate

Function authorization: rmcal.deactive

Opens the editing dialog to deactivate an active activity

  Monitoring

Function authorization: rmcal.monitor

Updates the status of the activities

  Reset

Function authorization: rmcal.reset

Opens an editing dialog to reset an activity

  Capture reading (EMG 8.1 only)

Function authorization: rmcal.captvalues

Opens  the  editing  dialog  to  enter  a  counter  reading.  Any  number  of  difference  values  may  be

entered within a time interval. Therefore, it is a delta collection.  For this reason, it is also possible

to  subsequently  enter  data  relating  to  the  past.  If  you  do  not  enter  date  values  in  the  fields,  the

system generates the interval using the last data capture as start time and the current posting time

as the end of the interval.

  Enter absolute value (EMG 8.1 only)

Function authorization: rmcal.captvalues

Opens the editing dialog to enter a counter reading using an absolute value. The system calculates

the difference to the previous reading.  It is not possible to enter values for periods in the past. The

system sets the start time of the interval to the end of the last entry. If an end is not entered, the

system uses the current posting time.

  Generate order

Function authorization: rmcal.generate

Creates  an  order  that  is  used  for  organizational  processing  of  the  activity.  Once  the  order  is

finished, you can set an option to have the activity automatically reset.

As  of  service  pack  13/2018,  you  can  generate  orders  automatically.  Please  find  further  details  in

section "Automatic generation of orders".

WRM-WWR_82.docx

Version: 1.0.23133

Seite 15 von 19

Resource Maintenance Calendar

  Activity plan (EMG 8.1 only)

Function authorization: rmcal.timetable

Opens the report Maintenance plan.

 Document management (WRM-WWR 8.2 only)

Function authorization: rmcaldoc

Click this button to call the Document management.

Detail application Resources logged on

For  resources  of  type  "MNR",  the  detail  application  provides  additional  information  on  the  resources

currently logged on.

Resource type, resource

The currently selected resource and its resource type.

Resource, family, resource type

Resource that is logged on, the family and the resource type.

Login

Date and time of the resource login.

Advance logon

Identifier of the advance logon.

Automatic generation of orders

When a threshold value (blue, yellow or red) is reached for an entry in the activity calendar, an associated

order  can  be  generated  automatically.  In  the  INI  configuration,  you  define  the  resource  type  and  the

threshold value to generate the order automatically. If the threshold value is exceeded, then the system

does not generate an order for the exceeded threshold value. If no relevant INI configuration exists, then

the automatic order generation is omitted.

INI configuration

Create the INI configuration with the name „MAINTENANCECALENDAR“ and the MOC user "0".  Create

a new entry in the INI configuration:

Field name

Value

Name

MAINTENANCECALENDAR

Description

Configuration maintenance/activity calendar

WRM-WWR_82.docx

Version: 1.0.23133

Seite 16 von 19

Resource Maintenance Calendar

Field name

MOC user

Value

0

Create the required configurations for this INI configuration. For this entry, create an entry including the

following values in the INI data configuration:

Field name

Value

Note

Section

Key

Value

Active

<Resource type>

<threshold value>

 Yes

e.g. PRM (for test equipment)

Threshold value blue: 1
Threshold value yellow: 2
Threshold value read: 3

Leave field empty

The below screenshot outlines a configuration to generate a calibration order for the resource type "PRM"

(test equipment) when the threshold value 2 "yellow" is reached.

Order generation

For automatic order generation it is assumed that for each resource type defined in the INI configuration

in  the  MOC  application  (transaction  code  "edworgen"  -  separate  licensing  required)  a  corresponding

configuration with matching object and assigned work plan is defined.

For automatic order generation it is assumed that for each resource type defined in the INI configuration

in  the  MOC  application  „

“(transaction  code  "edworgen"  -  separate  licensing  required)  a

corresponding configuration with matching object and assigned work plan is defined.

..\..\functions\MOC\MOC_OrderAutomaticGeneration.pdf

Scheduler job

Another  requirement  is  that  the  scheduler  job  hywtkupd.scr  is  active  that  is  responsible  for  the

maintenance status.

WRM-WWR_82.docx

Version: 1.0.23133

Seite 17 von 19

Resource Maintenance Calendar

Create calibration order

To create a calibration order, the system also requires that the calibration inspection plan is stored in the

field Project number of the activity calendar.

The  program,  which  is  called  by  the  scheduler  job,  only  generates  an  order  if  a  configured

threshold is actually exceeded. If a threshold has already been exceeded and the scheduler job

is started again, then the program does not generate an order for this threshold.

The program also does not generate an order if the threshold 2 is configured, for example, and it

is now changed from threshold 1 directly to threshold 3 because of the actual data.

Report Maintenance plan (EMG 8.1 only)

The report Maintenance plan shows all maintenance activities that are displayed in the calling application

Activity calendar.

The maintenance activities are displayed in the following sequence:

  descending, sorted by state

  ascending, sorted by priority

The following data is displayed for each maintenance activity in the maintenance plan:

Left-hand column

  State (0: green, 1 blue, 2 yellow, 3 red)

  Maintenance type

WRM-WWR_82.docx

Version: 1.0.23133

Seite 18 von 19

Resource Maintenance Calendar

  Description

  Resource type

  Resource

Central column

  Next maintenance after (cycles)

  Cycles recorded so far

  Next maintenance after (hours)

  Hours recorded so far

  Next maintenance on

Right-hand column



Information

WRM-WWR_82.docx

Version: 1.0.23133

Seite 19 von 19

