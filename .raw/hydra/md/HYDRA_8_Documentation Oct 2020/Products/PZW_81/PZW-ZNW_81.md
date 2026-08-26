Manual

Time Sheets and Archiving
PZE-ZNW 8.1

Version 1.0.404

Last changed on: 19.06.2020

Time Sheets and Archiving

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

PZW-ZNW_81.docx

Version: 1.0.18468

Page 2 of 21

Time Sheets and Archiving

Contents

1  Time Sheets and Archiving - Overview ........................................................ 4

2  Time Sheet ................................................................................................... 5

3  Time Sheet Archive ...................................................................................... 9

4  Time Sheet Configuration .......................................................................... 11

5  Time Sheet Columns .................................................................................. 13

6  Configuration of Time Sheet Layouts ......................................................... 15

PZW-ZNW_81.docx

Version: 1.0.18468

Page 3 of 21

Time Sheets and Archiving

1  Time Sheets and Archiving - Overview

Purpose

Daily  and  monthly  time  sheets  including  individual  layout  options  and  archiving  functions  for  long  term

data storage.

Implementation Considerations

Use this function package to:

  adapt the format and contents of time sheets to your requirements;

  use multiple different layouts for time sheets;

  archive time sheet data on the server to keep the time sheet available even when the data is no

longer available in the database.

Integration

This function package can only be used if HYDRA is used for time management (function package  Time

and Labor Data Evaluation).

Features

  Time sheet

o  Definition of multiple time sheets, graphical definition of their layout and recording of the

information to be displayed

o  Access to time sheets for a single day or any time period

  Time sheet archive

o  Long term archiving of time sheets and functions to access archived data

PZW-ZNW_81.docx

Version: 1.0.18468

Page 4 of 21

Time Sheets and Archiving

2  Time Sheet

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

PZW-ZNW_81.docx

Version: 1.0.18468

Page 5 of 21

Time Sheets and Archiving

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

PZW-ZNW_81.docx

Version: 1.0.18468

Page 6 of 21

Time Sheets and Archiving

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

time and the difference between them, the sum  of the daily flexible time changes and the sum of

the overtime in the evaluation period.

Balances

In  addition,  the  balances  of  the  accounts  at  the  end  of  the  month  are  displayed.  If  an  account  is

limited, then at the end of the list the carryforward to the following month for the respective account

is shown.

PZW-ZNW_81.docx

Version: 1.0.18468

Page 7 of 21

Time Sheets and Archiving

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

PZW-ZNW_81.docx

Version: 1.0.18468

Page 8 of 21

Time Sheets and Archiving

3  Time Sheet Archive

Summary

Menu

Human resource management  Month-end closing  Time sheet archive

Transaction code

ptsa

Function authorization

ptsa

The time sheet archive can be used to store the time sheets for people for long periods on the HYDRA

host computer. In this way, the working time of the people remains traceable and can be established even

after the required data have already been deleted. Because the data for the time sheets are archived in

files on the HYDRA server, the HYDRA database is not unnecessarily burdened with old data.

PZW-ZNW_81.docx

Version: 1.0.18468

Page 9 of 21

Time Sheets and Archiving

Usage

The  data  for  the  time  sheet  is  archived  during  the  monthly  evaluation.  For  this  reason,  it  can  only  be

displayed from the archive if the monthly evaluation has already been carried out for the desired person in

the respective period. During the monthly evaluation the archived data for the time sheet is also updated.

The administration of time sheets is described elsewhere.

Selection criteria

The following selection criteria are available in the application:

List

Optional  selection  of  a  time  sheet  in  which  the  formatting  is  to  be  done.  If  the  field  is  empty,  the

display is shown in the list used during archiving.

Company, personnel number

For  time  sheet  archives  that  come  from  an  older  HYDRA  system  and  were  archived  with  a  PZE

version earlier than PZE 7.2, the company is also a key for filing the time sheet archive in addition

to  the  personnel  number.  For  this  reason,  the  company  specified  must  be  the  one  in  which  the

person was assigned at the time the time sheet archive was created.

In  the  current  version  of  the  PZE,  the  archives  are  stored  exclusively  by  personnel  number;  the

company is not significant.

Year, period

Selection of the settlement period.

After the data are requested, the corresponding time sheet is displayed.

Multiple people or multiple settlement periods cannot be called.

PZW-ZNW_81.docx

Version: 1.0.18468

Page 10 of 21

Time Sheets and Archiving

4  Time Sheet Configuration

Summary

Menu

Master data  Labor time  Time sheet configuration

Transaction code

ptsc

Function authorization

ptsc

After this menu item is called, all existing time sheets are displayed:

Field descriptions

Period

This option can be used to specify whether or not the time sheet is a daily time sheet. In contrast to

a  time  sheet  for  a  settlement  period,  with  a  daily  list,  the  period  to  be  displayed  can  be  chosen

freely.  However,  account  balances  are  not  displayed  at  the  beginning  and  end  of  the  settlement

period.

PZW-ZNW_81.docx

Version: 1.0.18468

Page 11 of 21

Time Sheets and Archiving

Responsibility area

The responsibility area can be used to control which users can edit the time sheet. When the time

sheet  is  displayed,  a  check  is  also  made  regarding  whether  or  not  the  user  is  authorized  for  the

display of the responsibility area.

Wage type group

This field can store a wage group that contains all of the wage types that are to be displayed at the

end of the time sheet as monthly wage types. If the field is empty, all of the wage types present are

displayed as long as the presentation of the monthly wage types is activated in the time sheet.

Creating a new time sheet is not possible. Instead, existing lists can be copied and modified.

Toolbar

 Time sheet columns

Calls  the  time  sheet  columns.  The  20  fields  of  the  time sheet  may  be  assigned  to  wage  types  or

wage type groups. Consequently, this information will also be available when printing the daily data.

PZW-ZNW_81.docx

Version: 1.0.18468

Page 12 of 21

Time Sheets and Archiving

5  Time Sheet Columns

Overview

Menu

Master data  Labor time  Time sheet configuration

Transaction code

ptsc

Function authorization

ptsc

The  "Columns  of  time  sheets"  is  called  up  from  the  editing  function

  in  the  "Time  sheet

configuration".  Here,  you  can  fill  in  20  of  the  time  sheet's  information  fields  by  entering  separate  wage

types or wage type groups so that they are available on the printout of the daily data.

Field descriptions

Column

Number of the information field that should be filled in.

Type

You can choose to assign either a single wage type or a wage type group.

PZW-ZNW_81.docx

Version: 1.0.18468

Page 13 of 21

Time Sheets and Archiving

Parameters

The wage type or the wage type group is defined here.

A total of 20 information fields are available.

PZW-ZNW_81.docx

Version: 1.0.18468

Page 14 of 21

Time Sheets and Archiving

6  Configuration of Time Sheet Layouts

Summary

The configurable time sheet allows users to create their own time sheets. In HYDRA, you can configure

as many time sheets as you like, so time sheets can be created for various employee subgroups.

Prerequisite

The layout of the time sheets can only be modified if the license PZW-ZNW is available.

 Configuration of time sheets

If a new time sheet is to be created it first has to be created in the configuration of time sheets.

 Report Designer

An existing report can be changed by calling the Report Designer function.

PZW-ZNW_81.docx

Version: 1.0.18468

Page 15 of 21

Time Sheets and Archiving

Filing time sheets on the HYDRA server

Time sheets are saved within the report path of the HYDRA server. The "MOCREP"  path is required for

this purpose. The path always has to refer to <instance>/custom/reports. It is not allowed to change this.

The current scope of MOC is taken into account when saving on the server:







If the scope is "User“ or "Local“, the report file will be saved as "<reportname>_local.lul“.

If the scope is "Custom“, the report file will be saved as "<reportname>_custom.lul“.

If the scope is "Standard“, the report file will be saved as "<reportname>.lul“.

The current MOC scope is considered for the load order:

  Scope "User“ or "Local“

File

from

the

report  directory  of

the

server

“<reportname>_local.lul”  prior

to

“<reportname>_custom.lul“ prior to “<reportname>.lul“. If none of these three files is available, it

is searched on the client (user=>local=>custom=>standard).

  Scope "Custom“

File from the report directory of the server "<reportname>_custom.lul“ prior to “<reportname>.lul“.

If none of these two is available, it is searched on the client (custom=>standard).

  Scope "Standard“

File  from  the  report  directory  of  the  server  “<reportname>.lul“.  If  this  file  is  not  available,  it  is

searched on the client (standard).

Starting the Report Designer

The currently selected and displayed time sheet can be modified by using the "Report Designer" button.

To do so, the entry "PersonalTimeSheet_10" is selected and the "edit" button is clicked.

PZW-ZNW_81.docx

Version: 1.0.18468

Page 16 of 21

Time Sheets and Archiving

The report to be changed is shown in the "TemplateFile" field of the ReportConfiguration. The List&Label

Designer is started by clicking the "Report Designer" button.

These settings must not be changed.

PZW-ZNW_81.docx

Version: 1.0.18468

Page 17 of 21

Time Sheets and Archiving

Editing functions

The  report  can  be  edited  by  clicking  the  "Report  Designer"  button.  Data  should  have  been  requested

beforehand. The external Report Designer is used for designing.

The following special features are available:

mpdvTranslate("language key“)

"Language  key“  is  an  entry  from  the  translation  file  in  the  form  "lkXXX“.  Depending  on  the

configured language, translations are performed in MOC.

mpdvTimeFromSeconds(<SekundenSeitMitternacht>)

A numeric value in seconds since midnight is converted to a time and formatted. Format: hh:ss

mpdvDuration(<SekundenSeitMitternacht>)

A numeric value in seconds since midnight is converted to a duration and formatted. Format: h:ss

mpdvScript("PzeReportingScriptBalance",<Kontostand>)

The entered account balance is formatted based on the configuration of the account.

By clicking the F1 key the manual about the integrated Designer  opens.

PZW-ZNW_81.docx

Version: 1.0.18468

Page 18 of 21

Report structure:

Time Sheets and Archiving

The report container includes the PersonalData table including the data about the selected persons. For

every person there is the DailyData table including the daily data of the evaluation period as well as the

WageTypes table including the monthly results.

  The PersonalData table includes the page header that is displayed as header on every page of

the list and that includes personal data.

  Daily  data  including  weekly  and  monthly  totals  are  shown  in  the  sub-element  DailyData.

It also shows the  account  balances at the beginning  and end  of the month as well as the carry

forward of accounts for the subsequent month.

  The monthly wage types are shown in the WageTypes sub-report.

  The footer is displayed on each page of the list.

Field descriptions

List of variables/fields: Fields PersonalData

Data about the person is provided:

Data field

personaltimesheet.personaldata.accountingperiod.year
personaltimesheet.personaldata.errorcode
personaltimesheet.personaldata.evaluation_begin
personaltimesheet.personaldata.evaluation_end
personaltimesheet.personaldata.key_person
personaltimesheet.personaldata.period
personaltimesheet.personaldata.person.area
personaltimesheet.personaldata.person.card_id
personaltimesheet.personaldata.person.company
personaltimesheet.personaldata.person.costcenter
personaltimesheet.personaldata.person.department
personaltimesheet.personaldata.person.employee_subgroup
personaltimesheet.personaldata.person.firstname
personaltimesheet.personaldata.person.id
personaltimesheet.personaldata.person.lastname
personaltimesheet.personaldata.person.name
personaltimesheet.personaldata.personalaccounts.designation1
personaltimesheet.personaldata.personalaccounts.id1 - 8

Meaning

Year
Error code
Start of the settlement period.
End of the settlement period.
Key for linking the data sources
Settlement period
Area
Badge
Company
Cost center
Department
Employee subgroup
First name
Personnel number
Last name
Name
Designation, account 1-8
Account 1-8

PZW-ZNW_81.docx

Version: 1.0.18468

Page 19 of 21

Time Sheets and Archiving

personaltimesheet.personaldata.personalaccounts_carryforward.balance1-
8
personaltimesheet.personaldata.personalaccounts_carryforward.designatio
n1 - 8
personaltimesheet.personaldata.personalaccounts_carryforward.id1 - 8

personaltimesheet.personaldata.personalaccounts_endbalance1 - 8

personaltimesheet.personaldata.personalaccounts_startbalance1 - 8

personaltimesheet.personaldata.personalremainingleave
personaltimesheet.personaldata.personaltimesheetconfiguration.id
personaltimesheet.personaldata.shifttype
personaltimesheet.personaldata.timesheet_identification

Account carryforward, account 1-8
Des. account carry forward, account 1-
8
Number, account carry forward,
account 1-8
Account balance, end of month,
account 1-8
Account balance, beginning of month,
account 1-8
Remaining leave
Number of the time sheet
Shift type
Identification, time sheet

List of variables/fields: Fields  DailyData

The person's daily data is provided:

Data field

personaltimesheet.dailydata.absence.color
personaltimesheet.dailydata.absencetime
personaltimesheet.dailydata.absencetime.personalperformance
personaltimesheet.dailydata.balance.account1 - 8
personaltimesheet.dailydata.accountbalancechange1 - 8
personaltimesheet.dailydata.accountingperiod.begin_date
personaltimesheet.dailydata.accountingperiod.end_date
personaltimesheet.dailydata.accountingperiod.period
personaltimesheet.dailydata.accountingperiod.year
personaltimesheet.dailydata.actualattendancetime
personaltimesheet.dailydata.actualtargettime
personaltimesheet.dailydata.actualtime
personaltimesheet.dailydata.actualtime.personalperformance
personaltimesheet.dailydata.actualtime.without_paidbreak
personaltimesheet.dailydata.attendancetime
personaltimesheet.dailydata.attendancetime.personalperformance
personaltimesheet.dailydata.authorization.color
personaltimesheet.dailydata.authorized
personaltimesheet.dailydata.begin_date
personaltimesheet.dailydata.break
personaltimesheet.dailydata.certify
personaltimesheet.dailydata.clocking.status
personaltimesheet.dailydata.clocking.type
personaltimesheet.dailydata.clocking_begin
personaltimesheet.dailydata.clocking_end
personaltimesheet.dailydata.comment
personaltimesheet.dailydata.commentary
personaltimesheet.dailydata.costcenter.executing
personaltimesheet.dailydata.date
personaltimesheet.dailydata.duration
personaltimesheet.dailydata.edited
personaltimesheet.dailydata.evaluation_date
personaltimesheet.dailydata.evaluation_date_clocking
personaltimesheet.dailydata.indicator_summerwintertime_in
personaltimesheet.dailydata.indicator_summerwintertime_out
personaltimesheet.dailydata.infofield01 - 20
personaltimesheet.dailydata.key_person
personaltimesheet.dailydata.modified_by
personaltimesheet.dailydata.modified_ts
personaltimesheet.dailydata.oncallduty
personaltimesheet.dailydata.overtime
personaltimesheet.dailydata.overtimeperiod_begin

Meaning

Absence color
Absence time
Workday result: absence
Account balance 1-8
Account modifications 1-8
Start of the settlement period.
End of the settlement period
Settlement period
Year
Attendance time
Difference attendance/ target time
Actual time
Workday result: actual time
Actual time without paid breaks
Attendance time
Workday result: attendance time
Authorization color
Authorized
Start date
Break
Authorization comment
Clocking status
Status
Start of the clocking
End of the clocking
Comment from clocking
Abbreviation from clocking
Executing cost center
Date
Duration
Edited
Settlement date
Evaluation date
CEST
CEST
Information field 1-20
Key field
Editor
Processing time
On-call duty
Overtime
Start of the period for overtime

PZW-ZNW_81.docx

Version: 1.0.18468

Page 20 of 21

Time Sheets and Archiving

calculation
End of the period for overtime
calculation
Start of the evaluation date
End of the evaluation date
Paid break
Designation of  payment day type
Payment day type
Company
Cost center
Personnel number
Name
Designation of working time day type
Working time day type
Beginning of rounded times
End of rounded times
Shift type
Authorization
Authorized
Stand-by duty
Status
Target time
Number of the time sheet
Total break
Wage type
Week
Weekday
Weekend color

personaltimesheet.dailydata.overtimeperiod_end

personaltimesheet.dailydata.overtimeperiod_evaluation_begin
personaltimesheet.dailydata.overtimeperiod_evaluation_end
personaltimesheet.dailydata.paidbreak
personaltimesheet.dailydata.paymentdaytype.designation
personaltimesheet.dailydata.paymentdaytype.id
personaltimesheet.dailydata.person.company
personaltimesheet.dailydata.person.costcenter
personaltimesheet.dailydata.person.id
personaltimesheet.dailydata.person.name
personaltimesheet.dailydata.personalworkingtimedaytype.designation
personaltimesheet.dailydata.personalworkingtimedaytype.id
personaltimesheet.dailydata.roundedtime_begin
personaltimesheet.dailydata.roundedtime_end
personaltimesheet.dailydata.shifttype
personaltimesheet.dailydata.signcertify
personaltimesheet.dailydata.signed
personaltimesheet.dailydata.standbyduty
personaltimesheet.dailydata.status
personaltimesheet.dailydata.targettime
personaltimesheet.dailydata.timesheet_identification
personaltimesheet.dailydata.totalbreak
personaltimesheet.dailydata.wagetype.id
personaltimesheet.dailydata.week
personaltimesheet.dailydata.weekday
personaltimesheet.dailydata.weekend.color

List of variables/fields: Fields WageTypes

The person's monthly report data is provided here:

Data field

personaltimesheet.wagetypes.person.company
Personaltimesheet.wagetypes.person.id
personaltimesheet.wagetypes.timesheet_identification
personaltimesheet.wagetypes.wagetype.designation
personaltimesheet.wagetypes.wagetype.duration
personaltimesheet.wagetypes.wagetype.id

Meaning

Company
Personnel number
Number of the time sheet
Wage type designation
Wage type duration
Wage type

PZW-ZNW_81.docx

Version: 1.0.18468

Page 21 of 21

