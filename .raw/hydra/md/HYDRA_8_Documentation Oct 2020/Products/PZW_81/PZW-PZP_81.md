Manual

Personnel Scheduling
PZE-PZP 8.1

Version 1.0.54

Last changed on: 19.06.2020

Personnel Scheduling

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

PZW-PZP_81.docx

Version: 1.0.18468

Page 2 of 26

Personnel Scheduling

Contents

1  Personnel Scheduling - Overview ................................................................ 4

2  Personnel Scheduling .................................................................................. 6

3  Labor Time Schedule ................................................................................. 14

4  Account Planning ....................................................................................... 17

5  On-Call Duty ............................................................................................... 19

PZW-PZP_81.docx

Version: 1.0.18468

Page 3 of 26

Personnel Scheduling

1  Personnel Scheduling - Overview

Purpose

Graphical application to plan absence, shift sequence and on-call duty for single employees or employee

groups.

Implementation Considerations

Use this function package to:

  present and plan absence times and shifts in a graphical interface;





create an overview of the available manpower per shift or control the attendance rate;

schedule employees with on-call duty and compensate them within personnel time management.

Integration

This personnel scheduling function package requires  Time and Labor Data Evaluation to define working

time and payment models.

Personnel  scheduling  is  not  merely  used  for  labor  time  calculation,  but  often  also  to  plan  available

employees e.g. during work scheduling.

Features

  Personnel scheduling

o  Presentation  of  planned  and  compensated  absence,  working  time  models,  shift

sequences, target times etc. using a separate diary per employee

o  Display  of  planned  working  time  and  absence  for  multiple  employees  over  any  period

complete with per shift totals of employees who are available, not available or on leave

o  Graphical interface to plan absence and to reschedule working time, shifts and payment

rules

o  Optionally show current account balances plus account balances at end of period or end

of year

o  Optionally hide absence reasons for planned absence (e.g. to print planning results)

o  Calculate daily attendance rate as a percentage

  Labor time schedule

o  Tabular  display  of  planned  working  time  and  absence  (e.g.  to  display  scheduled

employees for single or multiple shifts)

o  Totals for available employees, for example by shift and/or by activity

PZW-PZP_81.docx

Version: 1.0.18468

Page 4 of 26

  Account planning

o  Simulation  of  future  account  balances  (e.g.  at  year's  end)  on  the  basis  of  planned

Personnel Scheduling

working time and absence

  On-call duty

o  Cyclical or individual on-call duty scheduling

o  Display of on-call duty in personnel plans with totals

o  Payment rules for on-call duty and stand-by duty

o  Evaluation of stand-by duty in labor time statistics

o  Presentation of stand-by duty in time sheets

PZW-PZP_81.docx

Version: 1.0.18468

Page 5 of 26

Personnel Scheduling

2  Personnel Scheduling

Summary

Menu

Human resources management  Planning  Personnel scheduling

Transaction code

ptpl

Function authorization

ptpl

Personnel scheduling can be used to gain an overview of employee shift sequences and working times.

In addition to the year overview for an employee, the overview of periods for a group of employees can be

displayed.

PZW-PZP_81.docx

Version: 1.0.18468

Page 6 of 26

As an alternative to the  year overview, in the overview of periods the corresponding information can be

displayed for a group of employees.

Personnel Scheduling

Usage

Below the selection criteria in the year overview, the current account balance and the account balance for

the  end  of  the  year  for  the  leave  account  (account  with  the  number  4  in  the  definition  of  accounts)  are

displayed.

The absences are displayed with the comment from Control of absence times or absence planning for the

respective day. For days with multiple planned absences, the absence reason is visible with the greatest

time  duration  in  the  upper  third  of  the  day  and  the  absence  with  the  second  greatest  duration  in  the

second  third.  Absences  that  have  been  requested  via  the  absence  workflow  but  not  yet  authorized  are

displayed in italics.

For the people displayed, additional columns can be activated in the grid. The  current account balances

can  also  be  displayed  as  columns for  users  that  have  the  respective  function  authorization.  In  addition,

the account balances at the start and end of the selected period and at the end of the year can also be

shown.

PZW-PZP_81.docx

Version: 1.0.18468

Page 7 of 26

Personnel Scheduling

The right mouse button can be used to plan an absence, a personal shift type or a personal working time

for  the  selected  period.  The  absences  displayed  in  the  context  menu  and  the  colors  of  the  individual

absences are specified in the Control of absence times window. The defined shift types from the working

time day types are displayed as shift types.

In  the  overview  of  periods,  absences  and  personal  shift  types  for  several  people  can  be  planned

simultaneously  by  selecting  the  respective,  corresponding  period  for  these  people.  The  planning  of  an

absence  or  personal  shift  type  for  several  people  can  only  be  carried  out  directly  in  the  context  menu

using the absence entry or shift type.

In the table in the lower area of the window is a list of the people planning to be present and absent per

shift type. Using this display, a check can be made to determine if enough employees are present for the

shift. Differences are noted among people that are available, not available or off.

Integration

The employees can view the resulting shift plan on the PZE terminal. The configuration is described in the

Shift plan on the terminal documentation.

Selection criteria

The following selection criteria are available in the application:

Data to be displayed

Three information items can be displayed per day. The three selection fields can be used to specify

which data are visible for the day.

Shift plan

Displays  any  possible  planned  absences  and  the  planned  shift  type  on  work  days.  For  the

days evaluated, actual data is output and for days that are not evaluated, planning is output.

Absence

Displays any possibly planned absences.

Absence 2

Displays any possibly planned second absences for the day.

Attendance time

Displays the working time completed.

Target time

Displays the planned target time.

Normal time

Displays the planned normal time.

PZW-PZP_81.docx

Version: 1.0.18468

Page 8 of 26

Personnel Scheduling

Planned start time

Displays the planned start time.

Planned end time

Displays the planned end time.

Working time day type

Displays the planned working time day type.

Shift type

Worked shift type for the previous days and planned shift type for the current and future days.

When the planned shift type is determined, both personal day types and personal working time

are considered. The shift type is only output for the planned work days.

Planned shift type

Displays the planned shift type from a personal shift rhythm model or a model stored in the HR

master data. The planned shift type is only output for the planned work days.

Different shift type

This field always contains the worked shift type if it differs from the planned shift type.

Payment day type

Displays the planned payment day type.

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

PZW-PZP_81.docx

Version: 1.0.18468

Page 9 of 26

Personnel Scheduling

Personal payment model

Displays any possibly planned personal payment year model.

Personal overtime type

Displays any possibly planned personal overtime type.

On-call duty 1

Start time of the first on-call duty interval.

On-call duty 2

Start time of the second on-call duty interval.

Show absence reason

If this option is deactivated, all of the absence planning is displayed in “red” and the text “N/A” for

"Not present (Nicht Anwesend)" is shown.

If no abbreviation is displayed in the graphic absence planning on the corresponding days after

absence  planning  has  been  created,  it  might  be  that  there  is  no  target  time  stored  for  these

days. The planned working time for the corresponding days can be checked in the Working time

information.

For absence planning for a period in the past, in some cases the absence can only be displayed

after the labor time calculation has been carried out.

If  only  the  period  of  the  absence  planning  was modified  when  changing  an  absence,  only  the

respective period is reset and recalculated in the next labor time calculation.

Field descriptions in the Overview of periods tab

Attendance rate

The  attendance  rate  is  calculated  by  multiplying  the  number  of  the  employees  planning  to  be

present by their target time/ normal time then dividing that result by the entire number of employees

multiplied  by  their  target  time/  normal  time  (in  percent  without  decimal  places).  The  display

represents the result before the first shift is totaled.

Available

People who are planned to be present, i.e. the target time for the day is greater than 0 hours.

Not available

People who are planned to be absent, i.e. an absence is planned for the person.

Off

People for whom No target time has been planned, i.e. the employee is not required to be present

on this day.

PZW-PZP_81.docx

Version: 1.0.18468

Page 10 of 26

On-call duty

The number of people with on-call duty is displayed in the lower section of the overview of periods

Personnel Scheduling

per shift and as a grand total.

Toolbar

 Labor time maintenance

Calls Labor time maintenance.

 Absence planning

Calls Absence planning.

 Labor time schedule

Calls the Labor time schedule.

Settings for personnel scheduling

 Settings

Calls the settings for personnel scheduling

PZW-PZP_81.docx

Version: 1.0.18468

Page 11 of 26

Personnel Scheduling

Field description

Identification of available people on the basis of target time/ normal time

If  additional  shifts  on  the  weekend  or  on  days  off  are  to  be  planned,  it  may  be  required  that  the

available people be identified based on the normal time because on such days there is usually no

planned  target  time.  For  flextime  and  flexible  shift  day  types,  the  duration  of  the  normal  time  is

defined  using  the  normal  start  and  end  time.  Note  here  that  the  representation  of  the  planned

absences also depends on this setting. For example, leave is also displayed on weekends although

it is  not compensated  in the day  evaluation  based on missing target  time. The display  is updated

only after a new request has been made for the data.

Selection for planning

This option can be used in the planning of a shift type to specify if only those shift types contained

in the current  planning are to  be  displayed using  the  context menu or  if a selection can  be made

from  all  of  the  shift  types  present  in  the  working  time  day  types.  The  number  of  shift  types  to  be

displayed is limited to 10.

Shift type - case sensitive

In  totaling  the  employees,  depending  on  the  setting,  the  shift  types  are  not  case  sensitive.  For

example, the number of shifts identified by "F" and "f" is displayed as a common total.

PZW-PZP_81.docx

Version: 1.0.18468

Page 12 of 26

Personnel Scheduling

Attendance rate

Here  a  setting  regarding  whether  or  not  the  attendance  rate  is  to  be  displayed  is  saved  for  the

logged on user. The specification regarding whether the target time or normal time is compensated

is based on the setting Identification of available people on the basis of target time/ normal time.

The settings for the display in the personnel scheduling are stored per user.

PZW-PZP_81.docx

Version: 1.0.18468

Page 13 of 26

Personnel Scheduling

3  Labor Time Schedule

Summary

Menu

Human Resources Management  Planning  Labor Time Schedule

Transaction code

ptpn

Function authorization

ptpn

The personnel plan shows the availability and the employee shift plan in table form. One row is displayed

in the list per person and date. The grouping options allow sums to be calculated, e.g. for shifts, days or

activities.

Integration

The employees can view the resulting shift plan on the PZE terminal. The configuration is described in the

Shift plan on the terminal documentation.

Selection criteria

The following selection criteria are available in the application:

PZW-PZP_81.docx

Version: 1.0.18468

Page 14 of 26

Personnel Scheduling

Shift type

By  entering  ’*’  in  the  selection  criterion  shift  type  all  employees  can  be  displayed.  If  this  field  is

empty, only those employees are displayed for whom no shift model and no flexible shift model are

planned.

On-call duty only

If  the  selection  parameter  "On-call  duty  only"  is  activated,  only  employees  with  on-call  duty  are

displayed.

Show absence reason

If this option is deactivated, all of the absence planning is displayed in "red“ and the text "N/A“ for

Not present (Nicht Anwesend) is shown.

Field descriptions

Shift plan

Displays any possible planned absences or the planned shift type on work days.

Availability category

If  the  Labor  time  schedule  is  grouped  based  on  one  column,  the  number  of  employees  and  the

planned availability is shown in the columns Available, Not available, Day off.

Absence category

The columns for the absence can be shown using the Absence category.

Absence category 2

The columns for the second planned absence can be shown using the Absence 2 category.

On-call duty category

In  the  Labor  time  schedule  the  columns  for  on-call  duty  times  can  be  activated  using  the  On-call

duty  category.  If  the  Labor  time  schedule  is  grouped  based  on  one  column,  in  the  On-call  duty

column, the number of employees with planned on-call duty is shown.

Working time category

The  category  Working  time  contains  information  regarding  target  time,  normal  time,  breaks  and

start and end of the working time.

Day types category

The category Day types can be used to show the columns for the planned working time day type,

payment day type and overtime type.

Personal day types category

The category Personal day types includes information regarding the planned personal day types for

working time, shift type and payment.

PZW-PZP_81.docx

Version: 1.0.18468

Page 15 of 26

Personnel Scheduling

Personal models category

The  category  Personal  models  includes  information  regarding  the  planned  personal  models  for

working time, shift rhythm, payment and overtime.

Additional info category

The category Additional info can be used to show additional information from HR master data.

The  settings  for  Shift  type  and  Finding  available  people  in  the  Personnel  scheduling  are  also

considered in the labor time schedule.

PZW-PZP_81.docx

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

PZW-PZP_81.docx

Version: 1.0.18468

Page 17 of 26

Compression

This button may be used to set whether only the account balances at the date entered or in addition

all days for which an account change has been registered are to be displayed at the date entered.

Personnel Scheduling

The  account  balance  for  the  current  date  as  displayed  in  the  chart  may  deviate  from  that

indicated in the schedule of Current account balances, if not all labor time has been calculated

for past days. Account planning considers such days by setting off planned account changes.

PZW-PZP_81.docx

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

PZW-PZP_81.docx

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

PZW-PZP_81.docx

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

PZW-PZP_81.docx

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

PZW-PZP_81.docx

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

PZW-PZP_81.docx

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

PZW-PZP_81.docx

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

PZW-PZP_81.docx

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

PZW-PZP_81.docx

Version: 1.0.18468

Page 26 of 26

