Manual

PZW Maintenance Functions /
Evaluations
PZW-PAP 8.1

Version 1.0.54

Last changed on: 19.06.2020

PZW Maintenance Functions / Evaluations

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

PZW-PAP_81.docx

Version: 1.0.18468

Page 2 of 39

PZW Maintenance Functions / Evaluations

Contents

1  PZW Maintenance Functions / Evaluations - Overview ............................... 4

2  Labor Time Maintenance ............................................................................. 6

3  Mass Entry of Clocking Records ................................................................ 18

4  Time Sheet ................................................................................................. 20

5  Current Account Balances ......................................................................... 24

6  Account Journal ......................................................................................... 27

7  Remaining Leave of Previous Year............................................................ 29

8  Messages Listing ....................................................................................... 31

9  Configuration of Messages Listing ............................................................. 34

10  Monthly Results .......................................................................................... 37

PZW-PAP_81.docx

Version: 1.0.18468

Page 3 of 39

PZW Maintenance Functions / Evaluations

1  PZW Maintenance Functions / Evaluations - Overview

Purpose

This  function  package  contains  lists  and  evaluations  plus  maintenance  and  management  functions  for

HYDRA personnel time management

Implementation Considerations

Use this function package to:

  display and edit evaluated clockings and their resulting wage types;



create a list for employees as proof of their working time;

  display the current status or the history of account balances;

  display  irregularities  and  errors  in  the  personnel  time  management  and  monthly  evaluations  of

the messages listing.

Integration

This function package can only be used if HYDRA is used for time management (function package Time

and Labor Data Evaluation).

Features

  Labor time maintenance

o  Subsequent  entry  of  forgotten  clockings  and  the  capability  to  manually  override  the

rounded working times

o  Maintenance  of  automatically  created  wage  type  postings  and  capability  to  manually

collect wage type bookings

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

PZW-PAP_81.docx

Version: 1.0.18468

Page 4 of 39

PZW Maintenance Functions / Evaluations

  Account journal

o  Logging of compensated and manually applied account modifications

  Remaining leave from previous year

o  Listing of employees who still have remaining leave from previous year at a given date

  Messages listing

o  Configurable  message  lists  to  display  errors  and  irregularities  from  personnel  time

management or at month end closing

  Monthly results

o  Tabular  presentation  of  employees'  target,  actual  and  absence  times  based  on  the

settlement periods and showing the compensated wage type amounts

PZW-PAP_81.docx

Version: 1.0.18468

Page 5 of 39

PZW Maintenance Functions / Evaluations

2  Labor Time Maintenance

Summary

Menu

Human resource management  Maintenance  Labor time maintenance

Transaction code

ptma

Function authorization

ptma

clck
wtbo

(detail application cloking)
(detail application wage type posting)

Labor  time  maintenance  can  be  used  to  display,  modify,  supplement  and  delete  the  clockings  and  the

related  postings  for  selected  people  for  a  certain  period.  This  function  can  be  used  to  react  quickly  to

unplanned  or  individual  events  in  the  operation.  At  the  same  time,  it  provides  brief  information  quickly

because the clockings and the related wage type postings are visible at a glance along with messages,

labor time comparison and personnel postings.

PZW-PAP_81.docx

Version: 1.0.18468

Page 6 of 39

PZW Maintenance Functions / Evaluations

Selection criteria

The following selection criteria are available in the application:

Compress wage type postings

In  the  list  of  wage  type  postings,  all  posting  with  the  same  wage  type  and  cost  center  are

compressed into one row. The duration displays the total time of all postings of the day to the wage

type.  The  fields  From  and  To  display  the  beginning  of  the  first  posting  and  the  end  of  the  last

posting on this day. Use this button to remove the compression and make the individual wage type

postings  visible  with  the  corresponding  beginning  and  end  times.  If  the  display  is  compressed,

wage type postings cannot be modified.

Field descriptions for the clockings table

Duration

The Duration column contains the duration of the rounded clockings minus the breaks. The entry in

this column is only available if the clocking has been evaluated.

Status

Status  of  the  clocking.  Possible  entries  include  "Present",  Business  trip",  "Absence"  and

"Unplanned absent".

Authorization, modified by, modified on

No entry appears for original employee clockings. Clockings that require authorization are identified

with  "Modification  required".  If  this  clocking  record  has  been  modified,  refused  or  authorized,  the

corresponding status with editor and time of the modification is entered. For authorized clockings,

the  authorization  is  displayed  in  green.  If  the  clocking  was  refused,  the  authorization  is  shown  in

green.

Clocking

Type

Identifier that indicates if it is an attendance, an absence or a business trip.

Date

Date of the clocking.

Time from, to

Time clocked by employee at the terminal

CEST

Specification as to whether this time is a winter or summer time (active field).

PZW-PAP_81.docx

Version: 1.0.18468

Page 7 of 39

PZW Maintenance Functions / Evaluations

Rounded times

Time from, to

In these fields are the rounded clocking times from the day evaluation. Here the rounding can be

manually  corrected.  If  both  of  these  fields  contain  entries,  the  day  evaluation  will  no  longer

overwrite the values entered. If a new rounding is desired using the day evaluation, both fields must

be empty.

Settlement date

Date  on  which  this  clocking  record  is  settled.  Clocking  date  and  settlement  data  can  differ  from

each  other  if  the  employee  worked  past  midnight  or  started  before  midnight  and  the  night  shift  is

considered part of the next day.

Day types

Working time day type

Working time day type that is used on this day. All of the clockings for a day are evaluated based

on  the  same  working  time  day  type.  Modifying  the  working  time  day  type  or  the  shift  type  in  a

clocking affects all clockings for the settlement date. If the working time day type and the shift type

entered for employees that work shifts are deleted, in the next evaluation the planned day type for

this day is used.

Shift type

Shift type of the shift or flexible shift day type. For employees that work with the flextime day type,

this field remains empty.

Payment day type

Specification  regarding  the  payment  day  type  used  for  compensation  of  this  clocking  record.  The

payment  day  type  is  read  out  from  the  payment  model  or  from  another  planning  (e.g.  absence

planning or personal models or day types) and then entered here. If another payment day type is

input, compensation for this clocking record is made based on this specification. If the payment day

type entered is deleted, in the next labor time calculation the planned day type for this day is used.

Cost center

Cost center to which the clocking record is assigned. If this field is empty, the master cost center of

the employee is entered in the day evaluation. If an employee worked for another cost center, this

field can be manually overwritten.

This field is only available if the cost center posting license (PZW-KSB) is active.

Recorded cost center

If a cost center was entered in the clocking, it is displayed in this field.

PZW-PAP_81.docx

Version: 1.0.18468

Page 8 of 39

PZW Maintenance Functions / Evaluations

This field is only available if the cost center posting license (PZW-KSB) is active.

Comment

A  comment  can  be  entered  in  this  field.  For  example,  the  reason  that  the  clocking  record  was

modified can be documented.

Abbreviation

Abbreviation from Control of absence times that is also displayed in the calendar of the Personnel

scheduling for an absence. "UNG" is entered in this field for unplanned absences.

Status

The following types can appear:

Original:

the  clocking  record  is  in  its  original  status  as  generated  by  the  employee.

Edited:

the clocking record was modified by an editor.

Automatic:

the clocking record was generated by the system because the employee was

absent.

After all modifications have been carried out, the Labor time calculation can either be manually

started (then all modified clocking records are resettled) or the system can start it. The system

starts labor time calculations at certain times in order to recalculate modified clockings.

Modifications to the original clockings are logged in Clockings and can be traced there. This list

also contains deleted original clockings.

Editing functions

Authorizing and rejecting clockings and wage type postings

Authorizing  clockings  and  wage  type  postings  means  expressly  authorizing  certain  postings  to  wage

types. For example, these could be bonuses or overtime postings.

Messages regarding postings that require authorization are displayed in blue in the messages listing, and

by  double clicking the message in the  Labor time maintenance  window they can be edited  in the same

way as errors that occur. If all of the postings for a day that require authorization have been modified in

this way, the corresponding message disappears from the messages listing.

Rejected postings are not considered in the monthly results and in the transfer of wage types to payroll

accounting.

PZW-PAP_81.docx

Version: 1.0.18468

Page 9 of 39

PZW Maintenance Functions / Evaluations

Required authorization can be configured in the following positions:

In the definition of wage types

As a result, all postings to this wage type are identified as requiring authorization.

In individual payment rules of the payment day type

As  a  result,  exactly  this  posting  will  require  authorization.  This  allows  very  good  control  over  the

posting of overtime or bonuses.

For generating unplanned absence records

In Control of labor time calculation it can be specified whether absences that were not specified in

the absence planning require authorization.

In absence planning

In Absence planning a configuration can be made regarding whether the resulting absence record

and the corresponding bookings require authorization.

In the definition of absence reasons

Here  specifications  can  be  made  regarding  whether  absence  reasons  logged  in  by  employees  at

the terminals (e.g. doctor visit) should require authorization.

In  the  authorization  of  a  clocking,  the  authorization  requirement  of  the  resulting  wage  type

postings  is  automatically  reset.  The  option  Sign  manually  created  and  changed  clockings

automatically  in  the  PZE  tab  of  the  basic  settings  can  be  set  regarding  whether  wage  type

postings generated due to manually created or changed clockings can require authorization or

are to be automatically signed.

Toolbar

 Authorize

Clocking  (function  authorization  clck.sign):  A  clocking  that  requires  authorization  is  signed.  If  a

clocking  is  authorized,  the  authorization  requirement  is  also  automatically  removed  for  all  related

wage type postings.

Wage type posting (function authorization wtbo.sign): The selected posting is authorized. If one or

more signed or rejected postings exist for a day, all of the wage type postings for this day are no

longer changed by the day evaluation.

PZW-PAP_81.docx

Version: 1.0.18468

Page 10 of 39

PZW Maintenance Functions / Evaluations

 Reject

Clocking (function authorization clck.reject): A clocking that requires authorization is rejected. If a

clocking  is  rejected,  all  of  the  related  wage  type  postings  that  are  neither  signed  nor  rejected  are

deleted.

Wage type posting (function authorization wtbo.reject): The selected posting is rejected.

 Labor time calculation

Calls the labor time calculation for the day identified in the list of clockings. Using this button to call

the day manually  is only  necessary  if the result of the correction is to be available immediately. If

this is not required, the evaluation can be carried out automatically by the system at a later time.

  Several function authorizations control the authorization to call labor time calculation from the labor

time maintenance:

ptma.view:  the  user  may  start  labor  time  maintenance  but  is  not  allowed  to  call  labor  time

calculation.

ptma  or  ptma.evaluate:  the  user  can  only  start  labor  time  calculation  within  the  labor  time

maintenance dialog and, as a result, only for one person.

ptev: the user may call labor time calculation for one person using the labor time maintenance

function and for several persons via the menu.

 Messages listing

Calls the messages listing for the selected period.

 Working time information

Displays the working time information for the selected person and for the day selected in the list of

the clockings.

 Time sheet

Displays the time sheet for the current month.

 Personnel scheduling

Calls the personnel scheduling for the selected person.

 Personal working time

Starts the personal working time for the selected person.

PZW-PAP_81.docx

Version: 1.0.18468

Page 11 of 39

PZW Maintenance Functions / Evaluations

 Current account balances

Displays the current account balances for the corresponding person.

 Reset labor time calculation

Reset labor time calculation can be used to reset the results of the labor time calculation.

PZW-PAP_81.docx

Version: 1.0.18468

Page 12 of 39

PZW Maintenance Functions / Evaluations

Detail applications

Wage type postings

Wage type postings are generated in the labor time calculation. They result from the employee clockings

and the payment rules of the assigned payment day type. In the same way, the wage type postings can

be changed or regenerated as clockings.

If postings regarding attendance or absences are modified, authorized or rejected, all of the postings for

this  evaluation  day  are  no  longer  changed  by  the  labor  time  calculation.  As  a  result,  one-time

modifications are no longer overwritten if the related clocking record is changed. If the modifications are

to be undone, the wage type postings can be deleted and the labor time calculation can then be restarted.

PZW-PAP_81.docx

Version: 1.0.18468

Page 13 of 39

PZW Maintenance Functions / Evaluations

Postings  of  the  Manual  type  are  times  that  are  individually  posted  in  addition  to  the  wage  types

determined by the labor time calculation. Manual postings are not affected by the labor time calculation.

They  also  do  not  prevent  other  postings  of  the  day  from  being  calculated  again  by  the  labor  time

calculation. Manual postings are included in the monthly total and are also forward to payroll accounting

when an automatic interface is used. If the wage type is account managed, the account compensation is

performed.  For  this  reason  it  is  recommended  that  individual  time  account  corrections  are  made  using

manual wage type postings.

The option to directly modify postings from attendance or absences should only be used if the

desired result cannot be achieved by using the existing configuration options.

Field descriptions

Settlement date

Date to which this posting belongs.

Time from, to

Beginning and end time of the posting.

Wage type

Wage type to which the posting is made.

Duration

Duration of the posting.

Cost center

Cost center to which this posting is assigned. This cost center is taken from the clocking. If wage

type postings are created  manually, the default entry in this field is the master cost center for the

person and it can be changed if necessary.

The  Cost  center  field  is  only  available  if  the  cost  center  posting  license  (PZW-KSB)  is

active.

Origin

The posting was generated due to attendance or an absence or created as a manual posting.

Authorization, modified by, modified on

The postings that require authorizations and who authorized or rejected the posting are displayed

here. The Authorization column is displayed in various colors.

  Yellow: Posting requires authorization

  Green:  Edited or authorized posting

  Red:  Rejected posting

PZW-PAP_81.docx

Version: 1.0.18468

Page 14 of 39

PZW Maintenance Functions / Evaluations

Labor time comparison

This  detail  application  is  only  displayed  if  the  function  "Subsequent  entry  of  PZE/BDE  postings“  is

available and the user has the function authorization.

Function authorization

subsen

The labor time comparison provides a comparison of the attendance time calculated in the personnel time

management  module  and  the  personal  times  from  the  order  data  collection  module.  In  the  detail

application Labor time comparison, the selected personal day in the list of clockings is displayed. If there

are no attendance times and no times from the order data collection for the person on that day, no data

record is displayed.

In connection with the detail application Personnel postings described below, the labor time comparison is

used as a source of information for the subsequent entry of order-related personnel postings.

Field descriptions (excerpt)

Deviation

Deviation  between  attendance  time  (personnel  time  management/HYDRA-PZW)  and  logged  in

labor time (order data collection/HYDRA-ADE). For possible causes for the deviation, please also

note the assignment of ADE postings regarding days of the personnel time management described

below.

Deviations of up to one minute are not displayed in color.

Deviations between one and five minutes are displayed in yellow.

Deviations of more than five minutes are displayed in red.

Logged in

All  personnel  durations  that  were  logged  in  to  operations  as  ADE  personnel  postings  (B  records)

and that belong to the day under consideration.

%ADE incl. OC

Relationship  of  the  labor  time  (HYDRA-ADE)  logged  in  to  the  attendance  time  (HYDRA-PZW)  in

percent.

PZW-PAP_81.docx

Version: 1.0.18468

Page 15 of 39

PZW Maintenance Functions / Evaluations

Attendance time

Attendance  time  from  personnel  time  management  (HYDRA-PZW).  This  time  has  already  been

rounded  or  capped  based  on  the  evaluation  parameters  in  the  personnel  time  management

module.

Complete  information  and  options  can  be  found  in  the  documentation  regarding  the  independent

application Labor time comparison.

Personnel postings

The  detail  application  is  only  displayed  if  the  function  "Subsequent  entry  of  PZE/BDE  postings“  is

available and the user has the function authorization.

Function authorization

subsen

The  detail  application  Personnel  postings  displays  the  ADE  personnel  postings  and  the  bonuses  for

people.  It  provides  a  preview  of  the  results  of  the  wage  calculation  to  be  expected.  It  is  identical  to  the

independent application Record listing. In the detail application Labor time comparison, the personal day

selected in the list of clockings is displayed.

The description of the columns can be found in the documentation of the record listing.

From Personnel postings the editing functions in the Subsequent entry group in the toolbar can be used

to modify, create and delete the ADE personnel postings using a simplified editing dialog.

PZW-PAP_81.docx

Version: 1.0.18468

Page 16 of 39

PZW Maintenance Functions / Evaluations

When ADE personnel postings are inserted, the personnel no., the durations, the resource performance

account 11 "MUT", the  logon and logoff times and the shift information is specified  by  default  using the

information  from  the  detail  application  Labor  time  comparison  as  long  as  the  attendance  time  from  the

personnel  time  management  module  is  greater  than  the  sum  in  the  ADE  personnel  postings  that  are

already collected.

This  is  a  simplified  editing  function  for  ADE  personnel  postings.  The  fields  are  described  in  the

documentation  dealing  with  the  record  listing  and  the  standard  function  for  maintaining  the  ADE

personnel postings .

The  simplified  maintenance  function  makes  the  subsequent  manual  entry  of  ADE  personnel  postings

easier. In addition, the optional customizing for the simplified maintenance function is separate from that

for complete maintenance, making it easier to adapt to customer needs.

PZW-PAP_81.docx

Version: 1.0.18468

Page 17 of 39

PZW Maintenance Functions / Evaluations

3  Mass Entry of Clocking Records

Summary

Menu

Human Resources Management  Edit  Mass Entry of Clockings

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

PZW-PAP_81.docx

Version: 1.0.18468

Page 18 of 39

PZW Maintenance Functions / Evaluations

Editing Functions

 Create clockings

A clocking record may now be entered for all people selected in the attendance overview list.

The  meaning  of  the  input  fields  corresponds  to  that  when  a  clocking  is  created  in  the  editing  the  labor

time dialog.

PZW-PAP_81.docx

Version: 1.0.18468

Page 19 of 39

PZW Maintenance Functions / Evaluations

4  Time Sheet

Summary

Menu

Human resource management  Month-end closing  Time sheet

Transaction code

ptsh

Function authorization

ptsh

The time sheet contains the clock events and the related compensation for a settlement period.

Usage

The creation of time sheets is described elsewhere.

If multiple versions  of a person exist  within the settlement period, the status at  the end of the

settlement  period  is  decisive  for  the  selection  of  the  people  and  the  inspection  of  the

responsibility  area.  Users  that  are  authorized  for  the  respective  person  on  this  day  receive  a

PZW-PAP_81.docx

Version: 1.0.18468

Page 20 of 39

display  of  the  time  sheet  for  the  entire  period.  The  display  of  the  HR  master  data  in  the  list

PZW Maintenance Functions / Evaluations

corresponds with the date.

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

PZW-PAP_81.docx

Version: 1.0.18468

Page 21 of 39

PZW Maintenance Functions / Evaluations

Break

The duration of the break is determined from the sum of the OP interruptions within the context of

breaks, breaks depending on working time and the free break based on the working-day type).

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

PZW-PAP_81.docx

Version: 1.0.18468

Page 22 of 39

PZW Maintenance Functions / Evaluations

PZW-PAP_81.docx

Version: 1.0.18468

Page 23 of 39

PZW Maintenance Functions / Evaluations

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

PZW-PAP_81.docx

Version: 1.0.18468

Page 24 of 39

PZW Maintenance Functions / Evaluations

In PivotGrid a total or group total is displayed for each account balance

PZW-PAP_81.docx

Version: 1.0.18468

Page 25 of 39

PZW Maintenance Functions / Evaluations

Editing Functions

The below dialog opens to edit a data record:

All active accounts are displayed at the same time within the editing dialog and there is respectively one

field to enter the new account balance or account modification.

In this context, it may be selected whether the new account balance or, as an alternative, the difference to

the  current  account  balance  is  to  be  edited.  Both  values  cannot  be  entered  simultaneously  for  one

account balance and leads to an error message.

Account modifications always become effective on the current day.

Manual account modifications can be traced back in the manual account journal.

PZW-PAP_81.docx

Version: 1.0.18468

Page 26 of 39

PZW Maintenance Functions / Evaluations

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

PZW-PAP_81.docx

Version: 1.0.18468

Page 27 of 39

PZW Maintenance Functions / Evaluations

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

PZW-PAP_81.docx

Version: 1.0.18468

Page 28 of 39

PZW Maintenance Functions / Evaluations

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

PZW-PAP_81.docx

Version: 1.0.18468

Page 29 of 39

PZW Maintenance Functions / Evaluations

The leave entitlement from the HR master may be displayed using columns in the "remaining leave from

previous year" table. The total of the leave entitlement can also be displayed as column.

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

PZW-PAP_81.docx

Version: 1.0.18468

Page 30 of 39

PZW Maintenance Functions / Evaluations

8  Messages Listing

Summary

Menu

Human resource management  Maintenance  Messages listing

Transaction code

ptml

Function authorization

ptml

In  the  messages  listing,  messages  regarding  labor  time  calculation,  monthly  evaluation  and  incentive

wage calculation are displayed.

Usage

Selection criteria

The following selection criteria are available in the application:

PZW-PAP_81.docx

Version: 1.0.18468

Page 31 of 39

PZW Maintenance Functions / Evaluations

Messages listing

Using  the  number  of  the  messages  listing,  defined  lists  can  be  accessed  in  Configuration  of

messages listings.

Field descriptions

Message

The messages are determined from the following processing and are described there.

  Sequence of labor time calculation

  Sequence of monthly evaluation



Incentive wage calculation

Posting details

In  the  posting  details  fields  more  specific  information  regarding  the  message  is  displayed.  In  this

way, the posting details provide information in the example "Erroneous clocking sequence" such as

the clock-in occurred at 08:00 and the clock-out is missing.

Toolbar

 Labor time maintenance

Calls  the  labor  time  maintenance  for  the  selected  person.  Labor  time  maintenance  can  also  be

called by double clicking on the posting in the message listing table.

 Personnel scheduling

Calls the personnel scheduling for the selected person.

PZW-PAP_81.docx

Version: 1.0.18468

Page 32 of 39

PZW Maintenance Functions / Evaluations

 Order related postings

Calls Order-related postings

 Send e-mail

If  an  e-mail  address  is  stored  in  the  HR  master  data  for  the  selected  person,  this  switch  can  be

used to generate an e-mail message addressed to this person.

 Send e-mail to supervisor

If a supervisor with an e-mail address is stored in the HR master data for the selected person, this

switch can be used to generate an e-mail message addressed to that supervisor.

PZW-PAP_81.docx

Version: 1.0.18468

Page 33 of 39

PZW Maintenance Functions / Evaluations

9  Configuration of Messages Listing

Summary

Menu

Master data  Labor time  Configuration of messages listings

Transaction code

ptmc

Function authorization

ptmc

Because  some  individual  messages  of  the  daily  and  monthly  evaluations  are  classified  with  differing

importance for different customers and some messages are not to be displayed at all, there is an option

to define the content of the message listings.

The configuration of the messages listings is used to summarize messages into freely definable lists.

Usage

There are two ways to configure a new messages listing:

1.  Create a new list and insert the messages individually

2.  Copy an existing list and delete the unnecessary messages.

PZW-PAP_81.docx

Version: 1.0.18468

Page 34 of 39

PZW Maintenance Functions / Evaluations

Field descriptions

Message

Number of the message that is to be displayed in the list.

These  messages  are  messages  generated  by  the  daily  or  monthly  evaluation.  None  of  the

user's own messages can be added.

PZW-PAP_81.docx

Version: 1.0.18468

Page 35 of 39

PZW Maintenance Functions / Evaluations

PZW-PAP_81.docx

Version: 1.0.18468

Page 36 of 39

PZW Maintenance Functions / Evaluations

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

PZW-PAP_81.docx

Version: 1.0.18468

Page 37 of 39

PZW Maintenance Functions / Evaluations

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

PZW-PAP_81.docx

Version: 1.0.18468

Page 38 of 39

PZW Maintenance Functions / Evaluations

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

this reason they can only be displayed if the monthly evaluation was performed without errors.

The account modifications are determined based on the difference from the previous month and

for this reason they can only be displayed starting with the second month.

Toolbar

 Delete selected lines

One or more records can be selected in the list of displayed people and deleted from the display.

After  the  data  are  requested  again,  all  records  are  displayed.  If  a  grouping  is  selected,  the  entire

grouping is deleted.

Detail applications

The monthly wage types are displayed for the person selected in the list of the monthly results.

PZW-PAP_81.docx

Version: 1.0.18468

Page 39 of 39

