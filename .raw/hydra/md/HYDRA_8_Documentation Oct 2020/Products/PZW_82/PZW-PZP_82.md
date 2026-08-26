Manual

Personnel Scheduling
PZE-PZP 8.2

Version 1.0.15248

Last changed on: 19.06.2020

Personnel Scheduling

Copyright

©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notices

.

PZW-PZP_82.docx

Version: 1.0.18468

Page 2 of 26

Personnel Scheduling

Contents

1  Personnel Scheduling - Overview ................................................................ 4

2  Personnel Scheduling .................................................................................. 6

3  Labor Time Schedule ................................................................................. 14

4  Account Planning ....................................................................................... 17

5  On-Call Duty ............................................................................................... 19

PZW-PZP_82.docx

Version: 1.0.18468

Page 3 of 26

Personnel Scheduling

1  Personnel Scheduling - Overview

Purpose

Graphical application to plan absence, shift sequence and on-call duty for single employees or employee

groups.

Implementation Considerations

Use this function package to:

  present and plan absences and shifts in a graphical interface;



create an overview of the available manpower per shift or control the attendance rate;

  display the employees’ future account balances

  plan employees with on-call duty and compensate them within personnel time management.

Integration

This personnel scheduling function package requires  Time and Labor Data Evaluation to define working

time and payment models.

Personnel  scheduling  is  not  merely  used  for  labor  time  calculation,  but  often  also  to  plan  available

employees e.g. during work scheduling.

Features

  Personnel scheduling

o  Presentation  of  planned  and  compensated  absence,  working  time  models,  shift

sequences, target times etc. using a separate annual calendar per employee

o  Display  of  planned  working  time  and  absence  for  multiple  employees  over  any  period

complete with per shift totals of employees who are available, not available or on leave

o  Graphical interface to plan absence and to re-plan working time, shifts and payment rules

o  Optionally show current account balances plus account balances at end of period or end

of year

o  Optionally hide absence reasons for planned absence (e.g. to print planning results)

o  Calculate daily attendance rate as a percentage

  Labor time schedule

o  Tabular display of planned working time and absence (e.g. to display planned employees

for single or multiple shifts)

o  Totals for available employees, for example by shift and/or by activity

PZW-PZP_82.docx

Version: 1.0.18468

Page 4 of 26

  Account planning

o  Simulation  of  future  account  balances  (e.g.  at  year's  end)  on  the  basis  of  planned

Personnel Scheduling

working time and absence

  On-call duty

o  Cyclical or individual on-call duty planning

o  Display of on-call duty in personnel plans with totals

o  Payment rules for on-call duty and stand-by duty

o  Evaluation of stand-by duty in labor time statistics

o  Presentation of stand-by duty in time sheets

PZW-PZP_82.docx

Version: 1.0.18468

Page 5 of 26

Personnel Scheduling

2  Personnel Scheduling

Overview

Menu

Human Resources Management  Planning  Personnel Scheduling

Transaction code

ptpl

Function authorization

ptpl

Available user fields

Where

Table

Object type/user field key

Source (type)

PNR/SYSTEM

HR master data (HR)

How to configure user fields?

Which user field types are available?

Personnel scheduling can be used to gain an overview of employee shift sequences and working times.

The annual overview shows an employee's shift and absence planning for the entire year.

PZW-PZP_82.docx

Version: 1.0.18468

Page 6 of 26

As an  alternative to the annual overview,  you can  view  the information for a  group of employees  in the

overview of periods.

Personnel Scheduling

Purpose

Below  the  selection  criteria,  the  year  overview  shows  the  current  account  balance  and  the  account

balance  for  the  end  of  the  year  for  the  leave  account  (account  with  the  number  4  when  configuring

accounts).

The  application  shows  absences  with  the  comment  from  Control  of  absences  or  from  the  absence

planning  for  the  respective  day.  For  days  with  multiple  planned  absences,  the  application  shows  the

absence  reason  with  the  greatest  priority  in  the  upper  part  and  the  absence  that  is  of  lower  priority  is

shown  below.  Absences  that  have  been  requested  via  the  absence  workflow  but  not  yet  approved  are

displayed in italics.

For the staff displayed,  you can show additional columns in the grid. This  includes the person's current

account balances, the account balances at the start and end of the selected period and at the end of the

year.

PZW-PZP_82.docx

Version: 1.0.18468

Page 7 of 26

Personnel Scheduling

By  right-clicking,  you  can  plan  an  absence,  a  personal  shift  type  or  a  personal  working  time  for  the

selected  period.  In  the  Control  of  absences  application,  you  can  define  the  absences  displayed  in  the

context menu and their colors. The submenu Personal day type shows the shift types of the working time

day types.

In  addition,  you  can  plan  Personal  models  and  comments  using  the  context  menu.  If  a  comment  is

defined for a day and you go with the mouse over this day, the comment will be shown as tooltip in the

calendar. A small, red triangle in the top right edge of the relevant day shows if a tooltip is available.

In  the  overview  of  periods,  you  can  plan  absences  and  personal  shift  types  for  several  employees

simultaneously. To do so, select the relevant period for these employees. You can only plan an absence

and/or personal shift type for several employees simultaneously if you use the absence entry and/or the

shift type in the context menu.

The table in the lower area of the window shows a list of the persons planned to be present and absent

per shift type. Use this list to check if enough employees are present for the shift. A distinction is made

between employees that are available, not available or off work (free).

If the planned working time does not respect the rest period, the affected days will be highlighted in pink:

Integration

Employees  can  view  their  shift  plan  via  the  PZE  terminal.  The  configuration  is  described  in  the

documentation dealing with the terminal shift plan.

Selection criteria

The application provides the following selection criteria:

Data to be displayed

Three information  items can be  displayed per  day. Use the three selection fields to specify  which

data should be displayed for a day.

Shift plan

Displays any possibly planned absence and the planned shift type on work days. For the days

evaluated,  the  application  outputs  actual  data  and  for  days  that  are  not  evaluated,  the

application outputs the planning.

PZW-PZP_82.docx

Version: 1.0.18468

Page 8 of 26

Personnel Scheduling

Absence

Displays any possibly planned absence.

Absence 2

Displays any possibly planned second absence for the day.

Attendance time

Displays the working time completed.

Target time

Displays the planned target time.

Normal time

Displays the planned normal time.

Planned start time

Displays the planned start time.

Planned end time

Displays the planned end time.

Working time day type

Displays the planned working time day type.

Shift type

Shows the shift type used for the previous days and the planned shift type for the current and

future  days.  When  the  planned  shift  type  is  determined,  the  system  integrates  both  the

personal  day  types  and  the  personal  working  time. The  application  only  shows  the  shift  type

for planned working days.

Planned shift type

Displays the planned shift type from a personal shift rhythm model or a model stored in the HR

master data. The application only shows the planned shift type for planned working days.

Different shift type

This field always contains the actually used shift type if this shift type differs from the planned

shift type of the shift rhythm model defined in the HR master and/or a personal model.

Payment day type

Displays the planned payment day type.

Working time model

Shows the planned working time model.

Shift rhythm model

Displays the planned shift rhythm model.

PZW-PZP_82.docx

Version: 1.0.18468

Page 9 of 26

Personnel Scheduling

Payment model

Shows the planned payment model.

Overtime type

Displays the planned overtime type.

Personal working time

Displays  any  possibly  planned  personal  working  time.  The  personal  working  time  is

represented by an X.

Personal working time day type

Displays any possibly planned personal working time day type.

Personal shift type

Displays any possibly planned personal shift type.

Personal payment day type

Displays any possibly planned personal payment day type.

Personal working time model

Displays any possibly planned personal working time year model.

Personal shift rhythm

Displays any possibly planned personal shift rhythm model.

Personal payment model

Displays any possibly planned personal payment year model.

Personal overtime type

Displays any possibly planned personal overtime type.

On-call duty 1

Start time of the first interval of on-call duty.

On-call duty 2

Start time of the second on-call duty interval.

Show absence reason

If this option is disabled, the application shows all planned absences in “red” and with the text “N/A”

for "Not present (Nicht Anwesend)".

If  the  application  does  not  show  an  abbreviation  for  the  corresponding  days  in  the  graphic

absence  planning  after  you  have  planned  an  absence,  it  might  be  that  there  is  no  target  time

defined for these days. You can check the planned working time for the corresponding days in

the Working time information.

If you plan absences for a period in the past, in some cases the absence can only be displayed

PZW-PZP_82.docx

Version: 1.0.18468

Page 10 of 26

Personnel Scheduling

after the labor time calculation has been carried out.

If  you  only  change  the  period  for  a  planned  absence,  the  system  only  resets  the  respective

period and recalculates it with the next labor time calculation.

Field descriptions in the Overview of periods tab

Attendance rate

The  attendance  rate  is  calculated  from  the  sum  of  the  target  time  and/or  normal  time  of  the

employees  planned  to  be  present  divided  by  the  sum  of  the  target  time  and/or  normal  time  of  all

employees.  When  half  days  are  off,  the  system  only  allows  for  the  duration  of  the  planned

attendance time.

The  result  is  displayed  as  a  percentage  and  rounded  (without  decimal  places)  before  totaling  the

first shift.

Available

Staff who is planned to be present, i.e. the target and/or normal time for the day is greater than 0

hours.

Not available

Staff who is planned to be absent, i.e. an absence is planned for that day.

Free (off work)

Staff for whom no target and/or normal time has been planned, i.e. the employee is not required to

be present on this day.

On-call duty

The number of staff with on-call duty is displayed in the lower section of the overview of periods per

shift and as a grand total.

The specification as to whether the target time or normal time is used for the above-described

fields depends on the setting Identification of available staff on the basis of target time/ normal

time.

Toolbar

 Labor time maintenance

Click this button to call the Labor time maintenance.

 Labor time calculation

Click this button to call the labor time calculation.

PZW-PZP_82.docx

Version: 1.0.18468

Page 11 of 26

Personnel Scheduling

 Reset labor time calculation

Click this button to call the function Reset labor time calculation

 Absence planning

Click this button to call the absence planning.

 Year overview

Click this button to call the  Year overview. This button is only available if the  Year overview tab is

enabled.

 Current account balances

Click this button to call the application Current account balances

 Labor time schedule

Click this button to call the labor time schedule.

Settings for personnel scheduling

 Settings

Click this button to call up the settings for personnel scheduling.

PZW-PZP_82.docx

Version: 1.0.18468

Page 12 of 26

Personnel Scheduling

Field description

Identification of available staff on the basis of target time/ normal time

If  you  have  to  plan  additional  shifts  on  the  weekend  or  on  days  off,  it  may  be  required  that  the

available  staff  be  identified  based  on  the  normal  time  because  on  such  days  there  is  usually  no

planned target time. For flextime and flexible shift day types, the normal start and end time specify

the duration of the normal time. Note that this setting also specifies how the planned absences are

displayed.  For  example,  leave  is  also  displayed  on  weekends  although  it  is  not  set  off  in  the  day

evaluation due to the missing target time. The display is updated only after you have refreshed the

data.

Selection for planning

Use  this  option  in  the  planning  of  a  shift  type  to  specify  if  only  those  shift  types  contained  in  the

current planning are to be displayed via the context menu or if a selection can be made from all of

the shift types available in the working time day types. The number of shift types to be displayed is

limited to 10.

Shift type - case sensitive

In  totaling  the  employees,  depending  on  the  setting,  the  shift  types  are  not  case  sensitive.  For

example, the number of shifts identified by "F" and "f" is displayed as a common total.

Attendance rate

Use  this  option  to  specify  for  the  logged  in  user  if  the  attendance  rate  should  be  displayed.  The

setting Identification of available staff on the basis of target time/ normal time specifies if the normal

time or the target time will be set off.

The settings for the display in personnel scheduling are stored per user.

PZW-PZP_82.docx

Version: 1.0.18468

Page 13 of 26

Personnel Scheduling

3  Labor Time Schedule

Overview

Menu

Human resources management  Planning  Labor time schedule

Transaction code

ptpn

Function authorization

ptpn

Available user fields

Where

Table

Object type/user field key

Source (type)

PNR/SYSTEM

HR master data (HR)

How to configure user fields?

Which user field types are available?

The Labor time schedule shows the employees’ availability and shift plans in a table. The list shows one

row for each person and date. Use the grouping options to generate totals for shifts, days or activities.

PZW-PZP_82.docx

Version: 1.0.18468

Page 14 of 26

Integration

Employees  can  view  their  shift  plan  via  the  PZE  terminal.  The  configuration  is  described  in  the

Personnel Scheduling

documentation dealing with the terminal shift plan.

Selection criteria

The application provides the following selection criteria:

Shift type

Enter  "*"  in  the  selection  field  Shift  type  to  view  all  employees.  If  you  leave  this  field  empty,  the

application only shows employees where neither a shift model nor a flexible shift model is planned.

On-call duty only

If you select the option "On-call duty only", the application only shows employees with on-call duty.

Show absence reason

If you disable this option, the application shows all planned absences in “red” and the text “N/A” for

"Not present".

Field descriptions

Shift plan

Displays the planned absence and/or the planned shift type on work days.

Availability category

If  you  group  the  Labor  time  schedule  by  a  column,  the  columns  Available,  Not  available,  Day  off

show how many employees are available or not.

Absence category

Select the Absence category in the column selection to show the columns for absence times.

Absence 2 category

Select  the  Absence  2  category  in  the  column  selection  to  show  the  columns  for  the  second

absence that is planned.

On-call duty category

Select the On-call duty category in the column selection to show the columns for on-call duty times

in the labor time schedule. If you group the Labor time schedule by a column, the column On-call

duty shows the number of employees with planned on-call duty.

Working time category

Select  the  Working  time  category  in  the  column  selection  to  show  information  on  the  target  time,

normal time, breaks, beginning and end of working time.

PZW-PZP_82.docx

Version: 1.0.18468

Page 15 of 26

Personnel Scheduling

Day types category

Select the Day types category in the column selection to show the columns for the planned working

time type, payment day type and the overtime type.

Personal day types category

Select the Personal day types category in the column selection to show information on the planned

personal day types for working time, shift type and payment.

Personal models category

Select  the  Personal  models  category  in  the  column  selection  to  show  information  on  the  planned

personal models for working time, the shift rhythm, payment and overtime.

Additional info category

Select  the  Additional  information  category  in  the  column  selection  to  show  additional  information

from the HR master.

The  labor  time  schedule  also  integrates  the  settings  for  the  shift  type  and  the  identification  of

available staff from personnel scheduling.

The columns that include personal data from the HR master (e.g. department, activity) always

show the data valid for each person on the first day of the selected period.

PZW-PZP_82.docx

Version: 1.0.18468

Page 16 of 26

Personnel Scheduling

4  Account Planning

Overview

Menu

Human resources management Evaluations Account planning

Transaction code

papl

Function authorization

papl

The  Account  Planning  function  allows  to  compute  an  account  balance  for  a  day  in  the  future  in

consideration of planned absence. This function may, for instance, be used to prepare a remaining leave

chart including the leave days not yet scheduled at the end of the year.

Selection criteria

The application provides the following selection criteria:

Date

Date for which account planning is to take place. This date may be in the future.

Account

Selection of the account for which the planning is to be made.

PZW-PZP_82.docx

Version: 1.0.18468

Page 17 of 26

Compression

This button may be used to set whether only the account balances at the date entered or in addition

all days for which an account change has been registered are to be displayed at the date entered.

Personnel Scheduling

The  account  balance  for  the  current  date  as  displayed  in  the  chart  may  deviate  from  that

indicated in the schedule of Current account balances, if not all labor time has been calculated

for past days. Account planning considers such days by setting off planned account changes.

PZW-PZP_82.docx

Version: 1.0.18468

Page 18 of 26

Personnel Scheduling

5  On-Call Duty

Summary

The additional module “on-call duty” allows for on-call duties to be planned in the working time model and

remuneration rules for on-call duty and stand-by duties to be defined in the remuneration model.

The  personnel  scheduling  function  and  the  labor  time  plan  show  the  on-call  duty  times  as  well  as  the

number of employees who are planned to be on duty.

Standby times can be evaluated using the labor time statistics and wage type statistics function. It is also

possible show the standby time when editing labor time and within the time sheet.

Configuration of On-Call Duty Times

Up to two standby intervals may be defined within the “on-call duty” tab of the working time day type.

Planning of On-Call Duty

There are different possibilities to plan on-call duties, as the on-call duty is defined within the working time

day type:

-  Cyclically recurring on-call duties can be configured in the working time model.

PZW-PZP_82.docx

Version: 1.0.18468

Page 19 of 26

-  Personal models and personal day types allow for the on-call duty to be defined individually.

-  The personal working time allows for on-call duties to be planned for single days without having to

create an additional working time day type.

Personnel Scheduling

On-Call Duty Displayed in the Personnel Scheduling Function

The personnel scheduling function provides an overview of the planned on-call duties. The beginning of

the standby time may be displayed by selecting the “data to be displayed” option.

Moreover, personal day types allow for the on-call duty to be planned individually.

PZW-PZP_82.docx

Version: 1.0.18468

Page 20 of 26

Personnel Scheduling

Selection Criteria

On-call duty 1, On-call duty 2

The  start  times  of  the  two  on-call  duty  intervals  can  be  shown  by  selecting  the  “data  to  be

displayed” selection parameter.

Field Descriptions

Totaling: On-call duty

The number of people who are on duty is displayed in the lower section of the period overview per

shift and as total number.

PZW-PZP_82.docx

Version: 1.0.18468

Page 21 of 26

Personnel Scheduling

Presentation of On-Call Duty in Labor Time Schedule

Within  the  labor  time  schedule  standby  times  can  be  activated  using  the  “on-call  duty”  category.  If  the

personnel schedule is grouped by a column, the “on-call duty” column shows the number of employees

who are on duty:

Selection Criteria

On-call duty only

If the selection parameter “on-call duty only” is checked only employees are displayed who are on

duty.

Settlement of On-Call Duty and Stand-By Duty

Payment rules for on-call duty and stand-by duty may be defined in the payment day type.

PZW-PZP_82.docx

Version: 1.0.18468

Page 22 of 26

Personnel Scheduling

On-call  duty  and  stand-by  duty  are  only  offset  as  such  if  an  on-call  duty  is  defined  within  the

working time day type and the remuneration day type includes the corresponding remuneration

rule.  This  allows  for  the  on-call  duty  to  be  planned  and  controlled  using  the  working  time  day

type and remuneration day type: If the on-call duty is generally defined within the working time

day  type  it  may  be  enabled  or  disabled  by  rescheduling  the  remuneration  day  type.  Provided

that  the  remuneration  rule  for  on-call  duties  or  stand-by  times  is  generally  defined  in  the

remuneration day type, stand-by times control within the working time day type whether or not

an on-call duty is planned.

Field Description

On-call duty

The  remuneration  rule  “on-call  duty”  is  allocated  for  the  entire  duration  of  the  stand-by  time.  The

“maximum  duration”  field,  for  example,  restricts  the  posting  to  one  hour  per  day.  The  maximum

duration affects both on-call duty intervals. If the “hide” option is checked the remuneration rule is

only processed if the no stand-by duty exists on that day. Since on-call duty may also be planned

on days  without clockings or when absence is  planned, the remuneration rule “on-call duty  of the

planned remuneration day type is allocated. This also applies if another remuneration day type is

entered in a clocking that might exist for this day.

PZW-PZP_82.docx

Version: 1.0.18468

Page 23 of 26

Personnel Scheduling

Stand-by duty

This  remuneration  rule  allows  for  a  stand-by  duty  to  be  allocated.  Working  time  is  processed  as

stand-by  time  if  it  completely  lies  outside  of  the  working  time  frame  and,  at  least  to  some  extent

within the stand-by  duty frame. The “minimum duration” field allows for a minimum duration to be

posted when it comes to short stand-by times. If the “hide” button is checked the stand-by time is

not  included  in  the  working  time  of  the  current  day  and,  as  a  result,  it  does  not  affect  this  day’s

overtimes or reduced working hours. The remuneration rule “stand-by duty” must not be used along

with the remuneration rules “working time before start of skeleton time” and “working time after end

of skeleton time”.

When  on-call  duty  times  are  allocated,  it  has  to  be  taken  into  account  that  the  corresponding

working time is not rounded off within evaluation parameters due to the rounding rules “before

target start” or “after target end”.

Editing of Stand-By Times

The “labor time maintenance” dialog allows for stand-by times to be edited. The columns for the on-call

duty and stand-by times can be displayed in the “clockings” table:

PZW-PZP_82.docx

Version: 1.0.18468

Page 24 of 26

Personnel Scheduling

As  on-call  duty  is  allocated  on  the  basis  of  the  remuneration  day  type  planned  for  the

corresponding  day,  the  assignment  of  another  remuneration  day  type  within  a  clocking  of  the

day  does  not  affect  on-call  duty.  Another  remuneration  day  type  has  to  be  planned  instead

using the “personal day types” option.

Evaluation of Stand-By Times

If  on-call  duty  or  stand-by  times  are  posted  onto  a  wage  type  using  corresponding  remuneration  rules

they can be evaluated using the wage type statistics function.

Additional  columns  that  show  the  duration  of  on-call  duty  and  stand-by  times  may  be  activated  in  the

labor time statistics dialog:

On-call duties can also be displayed in grahpics :

PZW-PZP_82.docx

Version: 1.0.18468

Page 25 of 26

Personnel Scheduling

The duration for on-call duty and the duration for stand-by times may be listed each in a separate column

within

the

time

sheet.

In

the  data

source

this  data

is

included

in

the

fields

personaltimesheet.dailydata.oncallduty

(on-call  duty)  and  personaltimesheet.dailydata.standbyduty

(stand-by duty).

The maximum  duration  of  the  remuneration  rule  for  on-call  duty  and  the  minimum  duration  of

the  remuneration  rule  for  stand-by  time  are  not  taken  into  account  in  the  labor  time  statistics

and  with the two  described fields of the  time sheet. The  wage type statistics function  displays

the  availability  times  taking  the  maximum  or  minimum  duration  into  account.  These  durations

can be shown in the time sheet by displaying the corresponding wage types.

PZW-PZP_82.docx

Version: 1.0.18468

Page 26 of 26

