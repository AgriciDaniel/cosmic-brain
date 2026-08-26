Manual

PZW Maintenance Functions /
Reports
PZW-PAP 8.3

Version 1.0.23049

Last changed on: 02.09.2020

PZW Maintenance Functions / Reports

Copyright

©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notices.

PZW-PAP_83.docx

Version: 1.0.23049

Page 2 of 38

PZW Maintenance Functions / Reports

Contents

1  PZW Maintenance Functions / Reports - Overview ..................................... 4

2  Labor Time Maintenance ............................................................................. 6

3  Mass Entry of Clocking Records ................................................................ 19

4  Time Sheet ................................................................................................. 21

5  Current Account Balances ......................................................................... 25

6  Account Journal ......................................................................................... 27

7  Remaining Leave of Previous Year............................................................ 29

8  Message list  Overview .............................................................................. 31

9  Configuration of message listings .............................................................. 34

10  Monthly Results .......................................................................................... 36

PZW-PAP_83.docx

Version: 1.0.23049

Page 3 of 38

1  PZW Maintenance Functions / Reports - Overview

PZW Maintenance Functions / Reports

Purpose

This  function  package  contains  lists  and  evaluations/reports  plus  maintenance  and  management

functions for HYDRA Personnel Time Management.

Implementation Considerations

Use this function package to:

  display and edit evaluated clockings and their resulting wage types;



create a list for employees as proof of their working time;

  display the current status or the history of account balances;

  display irregularities and errors of labor time calculation and monthly evaluations in the messages

listing.

Integration

This  function  package  can  only  be  used  if  HYDRA  is  used  for  Personnel  Time  Management  (function

package Time and Labor Data Evaluation).

Features

  Labor time maintenance

o  Subsequent  entry  of  forgotten  clockings  and  the  capability  to  manually  override  the

rounded working times

o  Maintenance  of  automatically  created  wage  type  postings  and  capability  to  manually

collect wage type postings

o  Authorize or reject clockings and wage types subject to authorization (e.g. business trips

and overtime)

  Mass entry of clockings

o  Simple entry of clockings for multiple employees and employee groups (e.g. for company

meetings)

  Time sheet

o  Detailed month by month listing per employee of all attendance and absence times plus

assessing overtime and undertime and display of account balances at beginning and end

of month

  Current account balances

o  Presentation and totaling of current account balances for the employees

PZW-PAP_83.docx

Version: 1.0.23049

Page 4 of 38

PZW Maintenance Functions / Reports

  Account journal

o  Logging of compensated and manually applied account modifications

  Remaining leave from previous year

o  Listing of employees who still have remaining leave from previous year at a given date

  Messages listing

o  Configurable message lists to display errors and irregularities from labor time calculation

or at month end closing

  Monthly results

o  Tabular  presentation  of  employees'  target,  actual  and  absence  times  based  on  the

settlement periods and showing the compensated wage type amounts

PZW-PAP_83.docx

Version: 1.0.23049

Page 5 of 38

PZW Maintenance Functions / Reports

2  Labor Time Maintenance

Overview

Menu

Human resources management  Maintenance  Labor time maintenance

Transaction code

ptma

Function authorization

ptma
clck
wtbo
subsen (detail applications Labor time comparison and Personnel postings)

(detail application Clockings)
(detail application Wage type postings)

Using  the  Labor  time  maintenance  function,  you  can  display,  change,  complement  and  delete  the

clocking records and the respective postings of selected persons for a specified period. You can use this

function  to  react  in  the  short  term  to  unplanned  or  unique  events  during  operation.  The  function  also

provides  quick  information  because  it  displays  the  clockings  and  the  relevant  wage  type  postings  with

messages, labor time comparison and personnel postings.

In  the  Labor  time  maintenance,  the  columns  of  the  time  sheets  can  be  shown.  Each  column  shows  a

wage  type  and  the  relevant  wage  type  postings.  Using  the  columns,  you  can  compare  the  wage  type

postings for specific persons over a longer period of time.

PZW-PAP_83.docx

Version: 1.0.23049

Page 6 of 38

PZW Maintenance Functions / Reports

Field descriptions of the Clockings table

Clocking

Type

Clocking  type;  possible  entries  are  Present,  Clock-in,  Clock-out,  Business  trip,  Absence  and

Unplanned absent.

Date

Date of clocking

Beginning, End

Time of clocking recorded by the employee on the terminal.

CEST

Central  European  Summer  Time  (CEST):  This  option  specifies  whether  the  time  is  in  winter  time

(option not set) or summer time (option set).

Rounded times: Time, to

These  fields  include  the  clocking  times rounded  by  the  labor  time  calculation.  You  can  use  these

fields to correct the rounding manually. If these two fields are populated, the rounded times are not

recalculated by the labor time calculation. If a new rounding of the labor time calculation is required,

the two fields must be left empty.

If you create a clocking for a day that already has an existing clocking, the rounded times

of the existing clocking are deleted if it is an original clocking. Advantage: If a rounding of

the actual  working time or different rounding rules  within the  working time are defined, a

new rounding is performed for the existing clocking.

Duration

The Duration column includes the duration of the rounded clockings minus breaks. The entry in this

column is only available once the clockings have been evaluated.

Attendance time

The column Attendance time shows the sum total of the times of all attendance and business trip

clockings for the respective day. If several clockings are available for a day, the attendance time is

only entered in the first row of the day.

Settlement date

Date  on  which  this  clocking  record  is  settled.  Clocking  date  and  settlement  date  can  be  different.

The  employee  can  work  until  after  midnight  or  start  work  before  midnight  and  the  night  shift  is

allocated to the next day.

PZW-PAP_83.docx

Version: 1.0.23049

Page 7 of 38

PZW Maintenance Functions / Reports

Day types

Working time day type

Working time day type that is used on this day. All clockings of a day are evaluated using the same

working time day type. If you change the working time day type or the shift type in a clocking, this

change affects all clockings of the settlement date. If you delete the working time day type and the

shift  type  that  can  be  entered  for  shift  workers,  the  day  type,  which  was  planned  for  this  day,  is

used in the next evaluation.

Shift type

Shift  type  of  the  shift  day  type  or  flexible  shift  day  type.  For  employees  who  work  according  to  a

flextime day type, this field remains empty.

Payment day type

Specifies  the  payment  day  type  used  to  settle  this  clocking  record.  To  identify  the  payment  day

type,  the  labor  time  calculation  reads  the  payment  day  type  in  the  payment  model  or  in  another

planning (e.g. in the absence planning or personal models or day types) and enters it here. If you

enter  a  different  payment  day  type,  the  clocking  record  is  calculated  according  to  this  rule.  If  you

delete  the  payment  day  type  entered,  the  day  type  planned  for  this  day  is  used  in  the  next  labor

time calculation.

Cost center

Cost center the clocking record is assigned to. If this field is empty, the master cost center of the

employee  is  entered  for  the  work  day  evaluation.  If  an  employee  has  worked  for  a  different  cost

center, you can manually overwrite this field.

This field is only available if the cost center posting license is activated (PZW-KSB).

Recorded cost center

If a cost center has been recorded with the clocking in the terminal, this cost center is shown in this

field.

Comment

This field is only available if the cost center posting license is activated (PZW-KSB).

You  can  enter  a  comment  in  this  field.  For  example,  it  is  possible  to  document  why  a  clocking

record has been edited.

Abbreviation

Abbreviation from the  Control of absences that is also displayed in the calendar of the  Personnel

Scheduling for an absence. For unplanned absences, "UNG" is entered in this field.

PZW-PAP_83.docx

Version: 1.0.23049

Page 8 of 38

PZW Maintenance Functions / Reports

Status

The following types are available:

Original:  the  clocking  record  is  in  the  original  state,  as  it  was  created  by  the  employee.

Edited:

the clocking record was modified by user.

Automatically:

the  clocking  record  was  created  by  the  system,  because  the  employee  was

absent.

Authorization, Modified by, Modified on

In  case  of  original  clockings  of  the  employee,  these  fields  are  empty.  Clockings  that  require  an

approval are identified via Processing required. If the clocking record has been edited, rejected or

approved, the respective status is entered including person and time of modification. For approved

clockings,  the  authorization  is  displayed  in  green.  If  the  clocking  has  been  rejected,  the

authorization is displayed in red.

The  days  and  the  clockings  included  in  the  table  Clockings  are  sorted  by  personnel  number,

date and start date of the clocking. You cannot change the sorting of this table.

Editing functions

Insert, edit, copy and delete clockings

Double-click  a  clocking  to  open  an  editing  dialog.  If  you  double-click  a  day  without  clocking,  a  dialog

opens to create a clocking.

If you have changed the clockings of a day, you can manually start the labor time calculation to

recalculate  the  changed  clockings.  The  results  are  directly  displayed  when  the  labor  time

calculation  is  finished.  If  you  do  not  start  the  labor  time  calculation  manually,  the  changed

clockings are recalculated during the next run of the labor time calculation that is automatically

started at specified times.

Changes of original clockings are logged in the Clockings and can be traced here. The list also

includes deleted original clockings.

Authorize and Reject clockings and wage type postings

The  authorization  of  clockings  and  wage  type  postings  is  the  explicit  approval  of  specific  postings  for

wage types. These could, for example, be bonus or overtime postings.

PZW-PAP_83.docx

Version: 1.0.23049

Page 9 of 38

PZW Maintenance Functions / Reports

Messages for postings that require authorization are  displayed in blue in the messages listing.  You can

edit  the  messages  similar  to  errors  occurred  if  you  double-click  the  message  in  the  window  Labor  time

maintenance.  If  all  postings  of  a  day  that  require  authorization  have  been  processed,  then  the  relevant

message disappears from the messages listing.

Rejected  postings  are  not  included  in  the  monthly  result  or  when  the  wage  types  are  transferred  to  the

payroll accounting system.

The following options are provided to configure that an authorization is

required:

In the definition of the Wage types

Result: All postings for the specified wage type require authorization and are identified as such.

In the different payment rules of the Payment day type

Result: Exactly this posting requires authorization. This is useful to control the posting of overtime

and bonuses.

When unplanned absence records are created

In the Control of labor time calculation, you can specify whether absences require authorization that

have not been defined in the absence planning.

In absence planning

In  the  Absence  planning,,  you  can  configure  that  the  resulting  absence  record  and  the  relevant

postings require authorization.

In the definition of absence reasons

You can specify here if the  Absence reasons require authorization that the employee has entered

on the terminal (e.g. doctor's appointment).

If  a  clocking  is  approved,  the  authorization  requirement  of  the  resulting  wage  type  posting  is

automatically  reset.  You  can  use  the  option  Sign  manually  created  and  changed  clockings

automatically  in  the  PZE  tab  of  the  Basic  settings  to  configure  if  wage  type  postings,  which

result from manually created or changed clockings, require authorization or not.

PZW-PAP_83.docx

Version: 1.0.23049

Page 10 of 38

PZW Maintenance Functions / Reports

Toolbar

 Authorize

Clocking  (function  authorization  clck.sign):  A  clocking  that  requires  authorization  is  approved.  If

you  authorize  a  clocking,  the  authorization  requirement  of  all  related  wage  type  postings  is

automatically removed.

Wage  type  posting  (function  authorization  wtbo.sign):  The  selected  posting  is  authorized.  If,  on

one  day,  one  or  more  authorized  or  rejected  postings  are  available,  then  none  of  the  wage  type

postings of this day is changed by the work day evaluation.

 Reject

Clocking (function authorization clck.reject): A clocking that requires authorization is rejected. If a

clocking  is  rejected,  all  related  wage  type  postings  that  are  neither  approved  nor  rejected,  are

deleted.

Wage type posting (function authorization wtbo.reject): The selected posting is rejected.

 Labor time calculation

Starts  the  labor  time  calculation  for  the  day  selected  in  the  list  of  clockings.  If  you  immediately

require the result of the correction, you can use this button to manually call the work day evaluation.

If this is not necessary, the system performs the evaluation at a later time.

You  can  control  the  authorization  to  call  the  Labor  time  calculation  in  the  Labor  time

maintenance via several function authorizations:

ptma.view:  The  user  can  start  the  Labor  time  maintenance,  but  is  not  authorized  to  call  the

Labor time calculation.

ptma  or  ptma.evaluate:  The  user  can  start  the  Labor  time  calculation  only  in  the  Labor  time

maintenance and therefore only for one person.

ptev: The user can call the Labor time calculation in the Labor time maintenance for one person

and also via the menu and therefore for several persons.

 Messages listing

Opens the Messages listing for the selected period of time.

 Working time information

Displays the Working time information for the selected employee and for the day selected in the list

of clockings.

 Time sheet

Displays the time sheet for the current month.

PZW-PAP_83.docx

Version: 1.0.23049

Page 11 of 38

PZW Maintenance Functions / Reports

 Personnel Scheduling

Calls the Personnel Scheduling for the selected person.

 Personal working time

Calls the Personal working time of the selected person.

 Personal day types

Calls the Personal day types of the selected person.

 Current account balances

Displays the current account balances current account balances of the selected person.

 Reset labor time calculation

Via the Reset labor time calculation, you can reset the results of the labor time calculation.

Detail applications

Wage type postings

Wage type postings are created during the labor time calculation. The wage type postings are based on

the employees' clockings and the payment rules of the assigned payment day type. Similar to clockings,

the wage type postings can be created or edited.

If the selection criterion Compress wage type postings is enabled, the wage type postings are totaled for

each Wage type, Cost center, Modified by and Authorization. This view provides a quick overview of the

time posted for each  wage type.  If  the selection criterion  Compress wage  type  postings  is not  enabled,

the  separate  wage  type  postings  for  Wage  type,  Cost  center,  Modified  by  and  Authorization  are

displayed. With this view, you can identify the separate periods where the wage type was posted and the

breaks used to calculate the labor time.

If the selection criterion Compress wage type postings is enabled, the function key to edit wage

type  postings  is  only  active  if  the  selected  entry  in  the  table  of  the  wage  type  postings  only

includes one wage type posting. If a combination of several wage type postings is selected, you

can  only  edit  the  different  wage  type  postings  if  the  selection  criterion  Compress  wage  type

postings is disabled.

PZW-PAP_83.docx

Version: 1.0.23049

Page 12 of 38

PZW Maintenance Functions / Reports

If  an  attendance  or  absence  time  is  changed,  authorized  or  rejected,  all  postings  of  this  evaluation  day

are not changed any more by the labor time calculation. Result: If you have made a change, this change

is not overwritten if you edit the relevant clocking record. If you want to undo the changes, you can delete

the wage type postings and start the labor time calculation.

Postings of type  Manual are times that are booked additionally to the wage types identified by the labor

time  calculation.  Manual  postings  are  not  changed  by  the  labor  time  calculation.  The  manual  postings

also  do  not  prevent  other  postings  of  the  day  from  being  recalculated  by  the  labor  time  calculation.

Manual postings are included in the monthly total and are therefore forwarded to the payroll accounting

system if an automatic interface is being used. If it is a wage type that is kept in an account, the account

is  offset.  It  is  therefore  recommended  to  make  manual  wage  type  postings  to  correct  individual  time

accounts.

PZW-PAP_83.docx

Version: 1.0.23049

Page 13 of 38

PZW Maintenance Functions / Reports

Only use the option to directly change postings of attendance or absence times if the required

result cannot be obtained via configuration.

Field descriptions

Settlement date

Date of posting

Time, To

Start and end time of posting

Wage type

Wage type of the posting

Duration

Posting duration

Cost center

Assigned cost center of this posting. The clocking specifies the cost center. If you manually create

wage type postings, this field is preset with the person's master cost center and can be changed if

necessary.

The  field  Cost  center  is  only  available  if  the  license  of  cost  center  posting  is  activated

(PZW-KSB).

Origin

The  posting  has  been  created  due  to  an  attendance  or  an  absence  or  has  been  created  as  a

manual posting.

Authorization, Modified by, Modified on

These  fields  show  the  postings  that  require  authorization  and  the  persons  that  authorized  or

rejected the posting. The column Authorization is displayed in different colors:

  Yellow: Postings that require authorization

  Green:  Edited or authorized posting

  Red:  Rejected posting

Messages

This  detail  application  displays  errors  and  special  incidents  that  occurred  during  labor  time  calculation.

You  can  configure  in  the  Configuration  of  messages  listings  using  the  messages  listing  999  which

messages  are  displayed.  For  information  on  the  meaning  of  the  different  messages,  refer  to  the

documentation Process of labor time calculation.

PZW-PAP_83.docx

Version: 1.0.23049

Page 14 of 38

PZW Maintenance Functions / Reports

Labor time comparison

The detail application is only displayed if the function Subsequent entry of PZE/BDE postings is available

and if the user has the function authorization.

Function authorization

subsen

The  Labor  time  comparison  compares  the  attendance  time  calculated  in  the  Personnel  Time

Management and the person-related times of the order data collection. The detail application  Labor time

comparison displays the personal day selected in the clockings' list. If no attendance time and no time of

the order data collection is available for this person on this day, then no data record is displayed.

You  use  this  detail  application  in  combination  with  the  detail  application  Personnel  postings  described

below as source of information to subsequently enter order-related personal postings.

Field descriptions (the most important fields)

Deviation

Difference  between  attendance  time  (HYDRA-PZW)  and  posted  time  and  labor  data  (HYDRA-

BDE).  A  possible  reason  for  the  difference  can  be  the  assignment  of  BDE  postings  to  PZW  days

described below.

Differences, which do not exceed one minute, are not highlighted in color.

Differences between one and five minutes are highlighted in yellow.

Differences exceeding five minutes are highlighted in red.

Logged in

All personal times that have been posted as BDE personal postings (B records) for operations on

the selected day.

%BDE incl. OC

Ratio of labor time posted (BDE) to attendance time (PZW) in percent.

Attendance time

Attendance  time  from  Personnel  Time  Management  (HYDRA-PZW).  This  time  has  already  been

rounded or cut according to the evaluation parameters that are applicable in HYDRA-PZW.

PZW-PAP_83.docx

Version: 1.0.23049

Page 15 of 38

For detailed information and a description of the possible options, refer to the documentation Labor time

PZW Maintenance Functions / Reports

comparison.

Personnel postings

The detail application is only displayed if the function Subsequent entry of PZE/BDE postings is available

and if the user has the function authorization.

Function authorization

subsen

The  detail  application  Personnel  postings  displays  the  BDE  personal  postings  and  the  bonuses  of

persons. The detail application  lists the expected results of the  wage calculation. This list is identical to

the  independent  application  Record  listing.  The  detail  application  Labor  time  comparison  displays  the

personal day selected in the clockings' list.

The columns are described in the documentation of the Record listing.

In the  detail application  Personnel  postings,  you can  use the  editing functions of the group  Subsequent

entry in the toolbar to edit, create and delete the BDE personal postings. The editing dialog that opens is

simplified.

PZW-PAP_83.docx

Version: 1.0.23049

Page 16 of 38

PZW Maintenance Functions / Reports

When  you  insert  a  BDE  personal  posting,  the  fields  including  the  personnel  number,  the  times,  the

resource  performance  account  11  "MUT",  the  login  and  logoff  times  and  the  shift  information  are

populated  using  the  information  from  the  detail  application  Labor  time  comparison.  Condition:  The

attendance time issued by  the Personnel Time Management (PZW) is greater than the sum total of the

BDE personal postings already recorded.

The editing function is a simplified version of the BDE personal postings. The fields are described in the

documentation  of  the  Record  listing  and  the  standard  editing  functions  are  described  here:  BDE

personnel postings.

The  simplified  editing  function  facilitates  the  manual  subsequent  entry  of  BDE  personnel  postings.  The

simplified  editing  function  also  permits  a  separate  customization  that  does  not  include  the  full  editing

functions. It is therefore easier to make changes according to the customer's requirements.

With  users  that  are  not  interested  in  the  Labor  time  comparison  and  the  Personnel  postings,

you can deactivate the function authorization  subsen to improve the performance of the Labor

PZW-PAP_83.docx

Version: 1.0.23049

Page 17 of 38

time maintenance.

PZW Maintenance Functions / Reports

PZW-PAP_83.docx

Version: 1.0.23049

Page 18 of 38

PZW Maintenance Functions / Reports

3  Mass Entry of Clocking Records

Summary

Menu

Human Resources Management  Maintenance  Mass Entry of Clockings

Transaction code

clme

Function authorization

clme

The mass entry function allows for a clocking to be created for a selection of several people at the same

time.

Selection Criteria

The application provides the following selection criteria:

Status

These checkboxes specify whether present people, people who are absent (planned or unplanned)

or who have a day off are to be displayed or not.

PZW-PAP_83.docx

Version: 1.0.23049

Page 19 of 38

PZW Maintenance Functions / Reports

Editing Functions

 Create clockings

A clocking record may now be entered for all people selected in the attendance overview list.

The  meaning  of  the  input  fields  corresponds  to  that  when  a  clocking  is  created  in  the  editing  the  labor

time dialog.

The entered clocking record is created for all selected persons. The shortcut <Ctrl>-<A> can be

used to select all persons, once the table has got the focus e.g. by clicking with the mouse on a

person.

PZW-PAP_83.docx

Version: 1.0.23049

Page 20 of 38

PZW Maintenance Functions / Reports

4  Time Sheet

Summary

Menu

Human resources management  Month-end closing  Time sheet

Transaction code

ptsh

Function authorization

ptsh

The time sheet contains the clock events and the related compensation for a settlement period.

Usage

If multiple  versions  of  a  person  exist  within  the  settlement  period,  the  status  at  the  end  of  the

settlement  period  is  decisive  for  the  selection  of  the  person  and  the  inspection  of  the

responsibility area. Users that are authorized for the respective person on this day may view the

time sheet for the entire period. The display of the HR master data in the list corresponds with

the date.

PZW-PAP_83.docx

Version: 1.0.23049

Page 21 of 38

PZW Maintenance Functions / Reports

Selection criteria

The following selection criteria are available in the application:

Time sheet

Selection  of  various  time  sheets.  Users  may  only  select  the  time  sheets  for  which  they  are

authorized.

Sorting

These two fields affect the field order for the time sheet printouts.

Field descriptions

Header

In  the  list  header  for  each  person  the  following  is  displayed:  the  name  of  the  employee,  the

employee's  personnel  number,  the  month  evaluated  and  the  balances  of  the  existing  accounts  at

the beginning of the month.

Date

Evaluation day with designation of the weekday

Mo

Tu

Monday

Tuesday

We

Wednesday

Th

Fr

Sa

Su

Thursday

Friday

Saturday

Sunday

All  of  the  days  of  the  evaluation  period  appear  without  a  gap  in  the  list,  even  if  there  were  no

clockings or compensation on a particular day.

Beginning

Clocked start time of the clocking;

in case of an absence record the planned start time is output here.

End

Clocked end time of the clocking;

in case of an absence record the planned end time is output here.

Break

The duration  of the  break is determined from the sum of the interruptions  within the break  frame,

breaks depending on working time and the free break based on the working-day type).

PZW-PAP_83.docx

Version: 1.0.23049

Page 22 of 38

PZW Maintenance Functions / Reports

Type

The status of a clocking record can be "K" for present or "F" for an absence record. If the clocking

has been manually edited or created, then an asterisk (*) is output before the status.

Payment

The  number  and  the  short  designation  of  the  payment  day  type  according  to  which  the  clocking

time was evaluated are displayed here.

Target time

The planned target working time for the evaluation day is indicated in hours and minutes.

Actual time

The  actual  time  achieved  on  the  evaluation  day  is  indicated  in  hours  and  minutes.  The  actual

working time is calculated from the rounded clocking times and consists of the attendance time and

absences.

+/-

In  this  column,  the  difference  between  the  actual  working  time  and  the  planned  target  time  is

displayed.  The  difference  is  displayed  in  hours  and  minutes.  If  the  value  displayed  here  has  a

negative sign, this means that the employee did not achieve the target working time for this day.

Flexible time

The modification of the flexible time account (third account in the configuration of the accounts) on

the evaluation day is displayed here.

Overtime

Displayed here is the time posted for an employee for the evaluation day to a wage type with the

identifier for overtime. Wage types entered as undertime are displayed as negative. The definition

of  such  wage  types  is  stored  in  the  configuration  of  wage  types.  For  this  reason,  users  can

determine the display in this last column themselves.

Totals

At the end of the list, for each person the following totals are included: the target and actual working

time and the difference between them, the sum of the daily flexible time changes and the sum of

the overtime in the evaluation period.

Balances

In  addition,  the  balances  of  the  accounts  at  the  end  of  the  month  are  displayed.  If  an  account  is

limited, then at the end of the list the carryforward to the following month for the respective account

is shown.

PZW-PAP_83.docx

Version: 1.0.23049

Page 23 of 38

PZW Maintenance Functions / Reports

Toolbar

 Time sheet configuration

Function authorization: ptsc

Calls up the Time sheet configuration.

 Report designer

Function authorization: ptsc

How to design time sheets is described separately.

 Send e-mail

Function authorization: ptsh or ptsh.sendemail

Sending time sheets by e-mail to employees as PDF files.

This  option  can  be  disabled  by  deleting  the  function  authorization  ptsh  and  adding  the

function authorization ptsh.view.

The functions Time sheet configuration, Report designer and Send e-mails-are only available if

the license PZW-ZNW is enabled.

PZW-PAP_83.docx

Version: 1.0.23049

Page 24 of 38

PZW Maintenance Functions / Reports

5  Current Account Balances

Summary

Menu

Human Resources Management  Reports  Current Account Balances

Transaction code

paba

Function authorization

paba

The “current account balances” list provides an overview of the current balances of the existing counts,

such as leave, flextime, overtime.

Utilization

The  displayed  account  balances  correspond  to  the  status  when  labor  time  was  calculated  at  last.

Consequently, the account balance of the previous day is normally displayed.

PZW-PAP_83.docx

Version: 1.0.23049

Page 25 of 38

PZW Maintenance Functions / Reports

Editing Functions

The below dialog opens to edit a data record:

All active accounts are displayed at the same time within the editing dialog and there is respectively one

field to enter the new account balance or account modification.

In this context, it may be selected whether the new account balance or, as an alternative, the difference to

the  current  account  balance  is  to  be  edited.  Both  values  cannot  be  entered  simultaneously  for  one

account balance and leads to an error message.

Account modifications always become effective on the current day.

Manual account modifications can be traced back in the manual account journal.

PZW-PAP_83.docx

Version: 1.0.23049

Page 26 of 38

PZW Maintenance Functions / Reports

6  Account Journal

Summary

Menu

Human Resource Management  Reports  Account Journal

Transaction code

pajo

Function authorization

pajo

The “account journal” allows for the changes to a specific account to be traced back.

Utilization

The  account  journal  documents  the  modifications  to  a  specific  account  for  the  selected  people.  The

changed  amount  and  the  changed  account  balance  are  listed  on  a  daily  basis.  The  entries  of  the

“balance” field are only displayed if the month has already been evaluated for the affected person, i.e. a

consecutive  balance  is  only  displayed  for  new  employees,  once  the  monthly  evaluation  has  been

performed for the first time.

PZW-PAP_83.docx

Version: 1.0.23049

Page 27 of 38

PZW Maintenance Functions / Reports

Manual changes may be determined through grouping or by a filter in the “account journal” table.

Account  changes  for  the  selection  made  is  added  up.  This  allows  for  the  account  balances  to  be

displayed for a period of time and the modifications do not have to be added up manually.

Three Types of Account Modifications Are Distinguished:

Labor time calculation

The account modification results from allocations of the labor time calculation function.

Monthly evaluation

The account modification is due to the processing of an account limit when months are calculated.

Manual account changes

Manual  account  modification.  In  addition  to  the  editor  the  “processing  status”  column  shows  the

account  balance  which  has  been  changed  manually.  This  balance  might  deviated  from  the

displayed balance if subsequent changes were made that are prior to the editing date.

PZW-PAP_83.docx

Version: 1.0.23049

Page 28 of 38

PZW Maintenance Functions / Reports

7  Remaining Leave of Previous Year

Summary

Menu

Human  Resources  Management  -->  Reports  -->Remaining  Leave  from
Previous Year

Transaction Code

parm

Function authorization

parm

The  "remaining  leave  from  previous  year"  list  shows  the  current  remaining  leave,  any  remaining  leave

from the previous year and the remaining leave for the current year.

Utilization

The leave entitlement that is defined within the HR master is used to determine the remaining leave from

the previous year. Consequently, modifications to the leave entitlement affect the calculated values in this

list. The list assumes that the leave entitlement is booked on the 1st January.

PZW-PAP_83.docx

Version: 1.0.23049

Page 29 of 38

The leave entitlement from the HR master may be displayed using columns in the "remaining leave from

previous year" table. The total of the leave entitlement can also be displayed as column.

PZW Maintenance Functions / Reports

Selection Criteria

The application provides the following selection criteria:

Date

Date for which the account balance should be calculated. If this date is in the future, then already

planned  future  leave  days  will  be  taken  into  account  in  the  remaining  leave  list.  In  this  case,  the

evaluation  starts  with  the  last  day  that  has  been  evaluated  and  adds  up  the  planned  leave  days

from  this  date  forward.  It  is  thereby  possible,  for  example,  to  calculate  the  remaining  leave  for

March  31st,  taking  into  account  planned  leave  days  which  have  not  yet  been  allocated  but  have

been defined in the absence plan.

Display only if remaining leave is left over from previous year

If  this  option  is  checked,  only  those  employees  are  displayed  who  are  still  entitled  to  remaining

leave from the previous year.

The  remaining  leave  is  also  computed  using  account  number  4  from  the  Configuration  of

accounts.

PZW-PAP_83.docx

Version: 1.0.23049

Page 30 of 38

PZW Maintenance Functions / Reports

8  Message list

Overview

Menu

Human Resources Management  Maintenance  Messages listing

Transaction code

ptml

Function authorization

ptml

The  message  list  displays  messages  for  personnel  time  calculation,  monthly  calculation,  and  incentive

wage calculation..

The messages generated by the "Messages list" can be differentiated by the three colors.

1.  The messages highlighted in red reading  "Erroneous clocking sequence", shows errors that

must be corrected so that the labor time calculation for the day in question can be processed

without errors.

PZW-PAP_83.docx

Version: 1.0.23049

Page 31 of 38

PZW Maintenance Functions / Reports

2.

If there is a message highlighted in blue, e.g. "Wage type posting subject to authorization" are

warnings that have an effect on the posting. These messages can be processed, but are not

mandatory.

3.  The  black  colored  messages  e.g.  "Comes  too  early"  are  only  an  information  message  and

have to be read.

Purpose

Selection criteria

The application provides the following selection criteria:

Message listing

You  can  use  the  number  of  the message  list  to  access  various  Configuration  of message  listings

lists that have been defined.

Field descriptions

Posting

The messages are identified by the following processing steps and are described in the following:

  Process of labor time calculation

  Processing monthly calculations



Incentive pay calculation

Posting details

The fields "Posting details" shows further posting details.  For example, the message details in the

example " Erroneous clocking sequence" inform you that the clock-in has taken place at 08:00 and

that the clock-out is missing.

PZW-PAP_83.docx

Version: 1.0.23049

Page 32 of 38

PZW Maintenance Functions / Reports

Toolbar

Labor time maintenance

Calls  the  Labor  time  maintenance  for  the  selected  person.  Labor  time  maintenance  can  also  be

called by double clicking on the posting in the message listing table.

Personnel scheduling

Calls the Personnel scheduling for the selected person.

Order-related postings

Click this button to call the Order-related postings.

 Send e-mail

Provided that an e-mail address is defined for the selected person in the HR master, an e-mail may

be generated by clicking this button, which is addressed to this person.

 Send e-mail to supervisor

If  a  supervisor  with  an  e-mail  address  is  stored  for  the  selected  person  in  the  HR  master  record,

you can use this button to generate an e-mail whose addressee is the superior.

PZW-PAP_83.docx

Version: 1.0.23049

Page 33 of 38

PZW Maintenance Functions / Reports

9  Configuration of message listings

Overview

Menu

Master data  Labor time  Configuration of message listings

Transaction code

ptmc

Function authorization

ptmc

As  individual  messages  from  the  day  and  month  evaluations  are  rated  with  varying  importance  by

different  customers  and  some messages  should  not  be  shown  at  all,  you  can  configure  the  contents  of

the message lists individually.

Use the Configuration of message listings to combine the messages in user-defined lists.

Purpose

You can choose from the following two options to configure a new message list:

1.  Create a new list and add the single messages.

2.  Copy an existing list and delete the messages that are not required.

PZW-PAP_83.docx

Version: 1.0.23049

Page 34 of 38

PZW Maintenance Functions / Reports

Field descriptions

Message listing

Number of the message list.

Use  the  message  listing  999  to  configure  the  messages  that  are  displayed  in  the  labor

time  maintenance.  Use  the  message  listing  998  to  specify  the  messages  that  are

displayed when you open the message listing in the monthly evaluation.

Message

Message to be displayed in the list.

The  messages  are  generated  by  the  labor  time  calculation  and/or  monthly  evaluation.  You

cannot add custom messages.

PZW-PAP_83.docx

Version: 1.0.23049

Page 35 of 38

PZW Maintenance Functions / Reports

10  Monthly Results

Summary

Menu

Human resource management  Month-end closing  Monthly results

Transaction code

ptmr

Function authorization

ptmr

The Monthly results  list  displays the results  of the monthly  evaluation, such as the account balances of

selected  people  at  the  end  of  the  month  and  the  change  in  their  account  balances  with  respect  to  the

previous month.

Usage

Switching between the table and chart views is possible:

PZW-PAP_83.docx

Version: 1.0.23049

Page 36 of 38

PZW Maintenance Functions / Reports

Selection criteria

The following selection criteria are available in the application:

Year, settlement period

Several settlement periods can be displayed. If one of the two selections is empty, only one period

is displayed.

Field descriptions

Monthly results

Sum  of  the  times  and  days for  target  time,  attendance  time  and  absence  for  a  settlement  period.

The  number  of  days  absent  includes  only  entire  days.  Days  on  which  the  employee  was  present

are also counted as days present in case of an absence.

Evaluation

Description of the settlement period with year, period, start and end date.

Date of last evaluation

When the most recent monthly evaluation was started.

Confirmed

Indicates if the settlement period for the person was already confirmed.

Account balance at end of month

Account balances at the end of the settlement period

PZW-PAP_83.docx

Version: 1.0.23049

Page 37 of 38

PZW Maintenance Functions / Reports

Carryforward to following month

Account balances are carried forward into the next settlement period after account limitation.

Account modifications

Account modifications of account balances in the settlement period before account limitation.

Account limitation

Sum by which the account was limited.

Limited account modification

Account modifications of account balances in the settlement period after account limitation.

Manual account change

Sum of the manual account changes

The account balances at the end of the month are determined by the monthly evaluation and for

this reason they can only be displayed if the monthly evaluation was  performed without errors.

The account modifications are determined based on the difference from the previous month and

for this reason they can only be displayed starting with the second month.

Toolbar

 Delete selected lines

One or more records can be selected in the list of displayed people and deleted from the display.

After  the  data  are  requested  again,  all  records  are  displayed.  If  a  grouping  is  selected,  the  entire

grouping is deleted.

Detail applications

The monthly wage types are displayed for the person selected in the list of the monthly results.

PZW-PAP_83.docx

Version: 1.0.23049

Page 38 of 38

