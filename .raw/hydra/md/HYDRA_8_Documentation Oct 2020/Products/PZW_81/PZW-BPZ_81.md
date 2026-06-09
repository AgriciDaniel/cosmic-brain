Manual

Labor Time Assessment
PZW-BPZ 8.1

Version 1.0.54

Last changed on: 19.06.2020

Labor Time Assessment

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 2 of 81

Labor Time Assessment

Contents

1  Labor Time Assessment - Overview ............ Error! Bookmark not defined.

2  Working Time Day Types ............................................................................. 7

3  Working Time Models ................................................................................ 12

4  Shift Rhythm Models .................................................................................. 18

5  Wage Types ............................................................................................... 24

6  Update Accounts ........................................................................................ 29

7  Payment Day Types ................................................................................... 31

8  Payment Models ........................................................................................ 33

9  1 Public Holidays ........................................................................................ 39

10  Working Time Information .......................................................................... 41

11  Absence Planning ...................................................................................... 42

12  Absence Control ......................................................................................... 46

13  Labor Time Calculation .............................................................................. 51

14  Labor Time Calculation Process ................................................................ 54

15  Control of Labor Time Calculation.............................................................. 59

16  1 Resetting Labor Time Calculation ........................................................... 68

17  Settlement Periods ..................................................................................... 73

18  Monthly Evaluation ..................................................................................... 75

PZW-BPZ_81.docx

Version: 1.0.18468

Page 3 of 81

19  Account Limits ............................................................................................ 78

Labor Time Assessment

PZW-BPZ_81.docx

Version: 1.0.18468

Page 4 of 81

Labor Time Assessment

1  Labor Time Assessment

Purpose

This function package contains functions necessary to assess employees' presence and absence times.

Implementation Considerations

Use this function package to:

  use HYDRA personnel time management to assess employee presence and absence times and

post these on wage types;

  plan employee absence in HYDRA;

  manage employee accounts in HYDRA.

Integration

The function package Labor Time Entry and Management is the basis for Assessing Labor Time.

Features

  Responsibility areas for configurations

o  Access and maintenance control for various master data (e.g. wage types, labor time and

payment  models)  for  individual  users.  This  can  be  used  for  example  to  control  which

users may plan which absence times

  Working time day type

o  Flextime day types to define flexible working time

o  Shift day types to define shift work with any number of shifts

  Working time model

o  Week,  period  and  year  models  to  define  working  time  for  employees  using  flextime  as

well as working time and shift sequence for shift workers

  Automatic shift identification

o  Automatic determination of the relevant shift based on an employee's clock-in

  Night shift assignment

o  Optionally assign the night shift to the starting or ending day of the night shift

  Payment day types

o  Payment day types to post actual working times to the corresponding wage types

  Payment models

o  Week, period and year models to record which wage types to assign to which days

  Holiday management

o  Managing various holiday calendars

PZW-BPZ_81.docx

Version: 1.0.18468

Page 5 of 81

Labor Time Assessment

o  Defining  non-standard  working  times  and  payment  rules  for  holidays  and  absence  and

presence time compensations on holidays

o  Compensating allowances for night shifts that partly fall on holidays

  Working time information

o  Detailed  display  of  planned  working  time  and  payment  rules  taking  the  actual

rescheduling into account

  Absence planning

o  Absence planning for employees and employee groups

  Control of absence times

o  Defining absence compensation and display

  Non clocking employees

o  Absence calendar management and compensation of accounts for employees who don't

report their working time at the time recording terminal

  Labor time calculation

o  Rounding  of  clock  times  and  determination  of  actual  hours  worked  taking  the  planned

working time model into account

o  Automatic labor time calculation repeated as often as is required by subsequent changes

o  Determination  and  compensation  of  planned  absence  times  and  posting  these  on  the

respective accounts (e.g. holiday account)

o  Posting  the  calculated  working  time  on  wage  types  and  accounts  on  the  basis  of  the

planned payment model

o  Compensation of account  modifications as a result of overtime and undertime, bonuses

and absence

o  Checking core time violations and working time overruns

  Control of labor time calculation

o  Flexible  recording  of  rounding  mode  rules  and  additional  settings  to  control  labor  time

calculations for employees and employee groups

  Reset labor time calculation

o  Resetting results of labor time calculation (e.g. because of later changes to the rounding

mode rules of planned working time or payment)

  Settlement periods

o  Configuration of settlement periods as either calendar months or periods chosen at will

  Monthly evaluation

o  Adding working and absence times and wage type postings based on settlement periods

o  Automatic rerun of month-end closings when changes are applied later

  Account limits

o  Limitation, payment or reposting of account balances at the end of a settlement period

PZW-BPZ_81.docx

Version: 1.0.18468

Page 6 of 81

Labor Time Assessment

2  Working Time Day Types

Summary

Menu

Human resource management  Models  Working time day types

Transaction code

wtdt

Function authorization  wtdt

All of the various employee working times at various times of day (skeleton times and core times) are

collected in the working time day types.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 7 of 81

Labor Time Assessment

Usage

To  specify  the  working  time  for  a  shift  worker,  all  of  the  shifts  that  occur  in  a  day  are  entered  in  the

working  time  day  type.  Each  shift  of  the  day  is  represented  in  a  working  time  day  type,  each  of  which

contains an identifier referring to the corresponding shift, e.g. 'F' for early shift, 'S' for late shift, etc.

Field descriptions for the Working time tab

Type

Selection regarding whether the type is flextime or shift day type.

Shift type

In  working  time  planning  in  the  shift  rhythm  model,  the  shift  type  field  is  used  to  plan  one  of  the

shifts defined in the day type for the employee. The designation can be freely selected although the

system is case sensitive. The shift types within one day type must be different. Abbreviations that

can be spoken, such as "F" for early shift and "N" for night shift, are useful.

A  night  shift  that  is  to  be  compensated  on  the  following  day  is  configured  using  a

negative  start  time  in  skeleton  and  normal  time.  For  example,  the  entry  "-2:00"  means

that  the  shift  starts  two  hours  before  0:00,  or  at  22:00  on  the  previous  day.  If  the  core

time is also to  begin on the previous day, a negative time must also be  entered in the

corresponding field.

Target time

Specification  of  the  daily  target  working  time  in  hours  and  minutes.  For  day  types  for  occasional

Saturday or Sunday work, the value 00:00 is entered in this field to specify that there is no target

working  time for  this  day.  For  employees  that  are  not  present,  this means  that  an  absence  is  not

generated  for  this  day.  For  employees  that  are  present,  the  attendance  time  is  evaluated  as

overtime.

Max. working time

The  entry  in  the  Max.  working  time  field  causes  a  message  to  appear  in  the  day  evaluation  if  an

employee  exceeds  the  maximum  working  time  on  the  day  evaluated.  Otherwise,  the  entry  in  this

field has no other effect, i.e. working time that exceeds the maximum working time is compensated.

If this field is empty (entry of 00:00), no message is generated.

Beginning, end of skeleton time

Specification of the period in which employee presence is allowed. Control of labor time calculation

can be used to define whether or not the working time before or after the beginning/ end of skeleton

time is to be compensated.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 8 of 81

Labor Time Assessment

Beginning, end of core time

Specification  of  the  period  in  which  the  employee  must  be  present.  If  the  employee  leaves  the

workplace early or the clock-in is late, a message is generated in the messages listing.

For day types  without core time, an entry  must be made  anyway  in the core  time field  within the

skeleton time (e.g. core time from 11:30 to 11:30).

Beginning, end of normal time

If an employee does not provide a clocking on the day to be evaluated even though the employee

was  assigned  target  working  time,  i.e.  the  employee  was  absent  the  entire  day,  normal  working

time is compensated. The absence record created for the employee starts at the normal start time,

contains the normal breaks and ends such that the target time or the set absence time is reached.

The rounding of clockings is also set based on the normal working time. The normal working time is

also needed for the assignment regarding whether the working time belongs to the current day or

the following day. For this reason, it is imperative that an entry be made in this field.

Field descriptions for the Breaks tab

Break 1 to Break 3

In these three groups, a skeleton time, a minimum duration and a normal time can be entered for

each break. In addition, a specification can be made regarding whether the break is unpaid or paid.

While unpaid breaks are subtracted from the working time, paid breaks count as working time  and

are  considered  in  the  compensation  of  breaks  depending  on  working  time,  for  example.  For  day

types that include fewer than three breaks, the other break fields remain empty.

For paid breaks, the field Minimum duration is processed as maximum duration.

Note regarding the processing of flexible breaks

Flexible  breaks  are  unpaid  breaks  in  which  the  period  of  the  break  frame  is  longer  than  the  minimum

duration of the break. The following rules apply for processing flexible breaks:

  1.  The employee is present, but does not create a clocking within the break frame. If the system does

not  find  a  clocking  within  the  break  frame,  the  employee  is  credited  with  the  normal  time  for  the

respective break.

  2.  If  the  employee  creates  a  clocking  within  a  break  frame  and  the  clocked  time  is  longer  than  the

minimum break, exactly that clocked time is subtracted for the employee.

  3.  If  the  employee  creates  a  clocking  within  a  break  frame  and  the  clocked  time  is  shorter  than  the

minimum break, the minimum break is subtracted for the employee.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 9 of 81

Labor Time Assessment

  4.  If  only  one  of  the  two  clockings  lies  within  the  break  frame,  only  the  time  within  the  frame  is

evaluated as a break. The time outside of the frame is subtracted as an interruption of the working

time. This takes effect if only a small part of the clocked break is within the frame because in this

case, the minimum break is allocated as the break and the time outside of the break frame is also

subtracted.

  5.  If the employee uses the final clock-out for the respective day before the end frame of a break, the

time for this break is not credited.

  6.  If the employee uses the first clock-in for the respective day after the start frame of a break, the time

for this break is not credited either.

  7.  Clockings within the break frame time can have their own rounding interval defined for them in the

evaluation parameters.

  8.  Normal breaks are always allocated for absence records.

Note regarding the processing of paid breaks

The following rules apply for processing paid breaks:

  1.  If no clocking is created for the break, nothing is subtracted for the break. The duration of the paid

break is still considered in the compensation of the breaks depending on working time.

  2.  If a break clocking is created within the frame of a paid break, it is filled with working time up to the

minimum  duration  of  the  break.  To  do  this,  an  additional  clocking  record  of  type  "Paid  break"  is

generated.  If  the  break  was  longer  than  the  minimum  duration,  the  remainder  is  subtracted  as  an

unpaid break.

  3.  To  determine  the  break  duration,  only  the  absence  within  the  break  frame  is  used.  Absence  time

outside of the break frame is allocated as a working time interruption and is not considered when the

interruption is filled with a paid break.

Only  one  paid  break  may  be  clocked  per  break frame.  Multiple  paid  breaks  within  one  break

frame cannot be processed correctly.

Field descriptions for the On-call duty tab

Beginning, end of on-call duty

Up to two on-call duty intervals can be stored in the working time day type. Setting up on-call duty is

described in the On-call duty documentation.

The  fields  in  the  On-call  duty  tab  can  only  be  accessed  if  the  personnel  scheduling  license

(PZW-PZP) is active.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 10 of 81

Labor Time Assessment

Field descriptions for the Payment tab

Day type

The entry in this field is the payment day type that is to be compensated together with this working

time day type.

As  an  alternative,  there  is  an  option  to  specify  the  payment  using  the  payment  model  assigned

using  the  HR  master  data  sheet.  If  a  payment  day  type  is  entered  in  this  payment  model,  it  has

precedence over the payment day type entered here in the working time day type.

Field descriptions for the Options tab

Free break

In  addition  to  the  three  breaks  in  the  Working  time  tab,  a  free  break  can  be  subtracted  from  the

working time of each employee. This break can be distributed over the day. This field is not used to

enter the total of all breaks. The free break is always subtracted at the end of the day regardless of

the amount of working time, i.e. it is even allocated if an employee was only present for a short

time.

Compensation of target time starting

This option can be used to select if the compensation of the target time is to occur beginning with

the start of the working time, the frame, the normal time or the core time. For example, if the start of

the frame is set and the employee  worked overtime, the target time is filled  with the working time

after the start of the frame and the previous time (or parts of it) are compensated as overtime. With

the Working time start setting, any possible existing overtime is always compensated at the end of

the working time.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 11 of 81

Labor Time Assessment

3  Working Time Models

Summary

Menu

Human resource management  Models  Working time models

Transaction code

wtmo

Function authorization  wtmo

Week models, period models and year models can be used to assign working time day types to working

time models.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 12 of 81

Labor Time Assessment

Insert week model

 Insert week model

The following dialog opens for inserting a week model:

Valid as of

The field valid from can be used to define week models with the same model number and different

validity starts. If modifications are required for a week model, they can be stored using a new week

model with the same number such that the calculations can be reset.

Monday, Tuesday, ..., Sunday

The  day  type  for  the  corresponding  weekday  is  entered  in  these  fields.  The  Public  holiday,

Important public holidays and Other days off tabs can be used to store one different day type per

weekday. This day type is used if the day is defined as a public holiday with the respective public

holiday  type.  If  the  fields  in  these  tabs  are  empty,  on  public  holidays,  the  day  type  from  the

Weekdays tab is used.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 13 of 81

Labor Time Assessment

Insert period model

 Insert period model

The following dialog opens for inserting a period model:

Field description

Reference date

The  reference  date  specifies  the  date  on  and  after  which  the  periods  described  in  the  table  will

cycle through repeatedly.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 14 of 81

The "Insert" option is used to define the individual periods of the period model:

Labor Time Assessment

Field description

No. of days

Duration of the period in days

Day type

Specification of the day type for working time models.

Day type for public holidays, important public holidays, other days off

A different day type can be stored in these three fields for public holidays, important holidays and

other  days  off.  If  these  fields  are  empty,  on  the  respective  public  holidays  the  entry  from  the

previously described field will be used.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 15 of 81

Labor Time Assessment

Insert year model

 Insert year model

The following dialog opens for inserting a year model:

Date from, to

Period for which an assignment is to be made.

Weekdays, weekends, Mo, Tu, ..., Su

Weekdays that are to be assigned. The weekdays button selects the days from Monday to Friday

and the weekends button selects Saturday and Sunday.

Include public holidays, exclude public holidays, public holidays only

This option is used to specify whether or not public holidays are considered in the assignment or if

only public holidays are assigned. Public holidays are shown in brown in the year calendar.

Day type

Selection  of  the  working  time  day  type  that  is  to  be  entered  on  the  selected  days  in  the  year

calendar.

Field descriptions for the Weekdays tab

Assigns the selected day type on the selected days.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 16 of 81

Labor Time Assessment

Deletes the day types entered on the selected days in the year calendar.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 17 of 81

Labor Time Assessment

4  Shift Rhythm Models

Summary

Menu

Human Resources Management --> Models --> Shift Rhythm Models

Transaction code

srmo

Function authorization

srmo

For  the  determination  of  the  working  time  frame  of  a  shift  worker,  a  “shift  rhythm  model”  is  required  in

addition to the working time model. Which shift type is planned on particular days is defined in this model.

Utilization

In the shift rhythm model, it is also possible to enter a shift type on days for which no day type is

defined  in  the  working  time  model.  In  many  cases,  this  simplifies  the  creation  of  shift  rhythm

PZW-BPZ_81.docx

Version: 1.0.18468

Page 18 of 81

Labor Time Assessment

models.

Insert week model

 Insert week model

The following dialog box pops up to insert a week model:

Valid from

The  Valid  from  field  enables  the  definition  of  week  models  with  the  same  model  number  and

different validity start dates. If modifications to a week model are required, this can be achieved by

the retroactive creation of a new week model with the same model number.

Monday, Tuesday, …., Sunday

The shift type for the relevant weekday is specified in these fields. One deviating shift type can be

defined  for  each  week  day  via  the  Holiday,  Important  holidays  and  Other  days  off  tabs;  this  shift

type is used when the day is defined as a holiday with the relevant holiday type. If these fields are

left empty, then the shift type from the Week day tab is used on holidays.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 19 of 81

Labor Time Assessment

Insert period model

 Insert period model

The following dialog box pops up to insert a period model:

Field description

Reference date

The  reference  date  specifies  from  which  day  on  the  period  described  in  the  table  should  be  run

through again.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 20 of 81

The individual periods of time of the period model are defined using the "insert" button:

Labor Time Assessment

Field description

Number of days

Duration of the period in days

Day type

Specifies the shift type.

Day type for public holiday, important public holiday, other day off

In  these  3  fields,  a  deviating  day  type  can  be  defined  for  holidays,  important  holidays  and  other

days off. The entry from the previously described field is used for the corresponding public holidays

if these fields remain empty.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 21 of 81

Labor Time Assessment

Insert year model

 Insert year model

The following dialog box pops up to insert a year model:

Date from, to

Period for which an assignment should be made.

Weekdays, weekend, Mo, Tu, …, Su

Weekdays  that  are  to  be  assigned.  The  "weekdays"  button  selects  the  days  from  Monday  until

Friday and the "weekend" button selects Saturday and Sunday.

Include holidays, Exclude holidays, Holidays only

This  option  determines  whether  any  holidays  should  be  taken  into  account,  holidays  should  be

ignored  in  the  assignment  or  only  holidays  should  be  assigned.  Holidays  are  represented  in  the

calendar in the color "brown".

Day type

Selects the shift type which should be entered for the selected days in the year calendar.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 22 of 81

Labor Time Assessment

Function buttons on the Weekdays tab

Assigns the selected shift type to the selected days.

Deletes the shift types that are entered for the selected days within the year calendar.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 23 of 81

Labor Time Assessment

5  Wage Types

Summary

Menu

Master data Labor time Wage types

Transaction code

waty

Function authorization  waty

Wage types are "pots", in which times of different meanings are collected. A distinction is made between

basic wage types, which are used for the payment of regular working times, and bonus wage types that

will  be  paid  in  addition  under  specific  circumstances.  Also  individual  absences  will  be  collected  under

different wage types.

Field descriptions - wage type tab

Wage type, designation

Alphanumeric identification of the wage type and designation.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 24 of 81

Labor Time Assessment

Authorization required

This button can be used to subject postings to this wage type to an authorization. If this button is

inactive,  further  positions  (e.g.  in  the  payment  day  type)  offer  the  possibility  to  activate  an

authorization obligation.

Percentage

Percentage,  by  which  the  wage  type  will  be  compensated.  The  specification  of  a  percentage  will

only have an impact if the wage type is to be posted to an account. Otherwise, this will serve as a

comment field.

Entries with 0 % will not be posted.

Responsibility area

A  user  will  only  be  authorized  to  maintain  this  wage  type  if  they  are  authorized  to  access  the

assigned responsibility area.

Upload wage type to payroll system

If there is  an  interface to  payroll  accounting, this button can be used to define  whether this  wage

type will be transferred to the interface file or not.

Payroll accounting wage type

Wage  type  to  be  used  for  the  upload  to  payroll  accounting.  This  field  will  not  be  processed  in  all

interfaces.

Payroll accounting control indicator

Field for customer-specific processing settings.

Usage

Definition of whether the wage type will be used to compensate the target working time, overtime or

undertime. It is also possible to make no definition here. The wage types marked by overtime will

be listed in the time sheet in the Overtime column. This applies analogously to the use of undertime

but where the times will be presented with a negative sign.

Type

Definition of whether a wage type is a basic wage type or a bonus wage type.

Field descriptions - settings tab

Processing

Note regarding the use of the wage type concerned. This field is a pure comment field and must not

be completed.

Selection indicator

Field for customer-specific processing.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 25 of 81

Labor Time Assessment

Average type

This field is currently not in use.

Rounding of wage type

Using the fields Subdivision and Gradation (both in the format: hours: minutes) can effect that the

daily  duration  of  wage  types  will  be  rounded.  In  doing  so,  the  subdivision  will  generate  those

periods in time, to which rounding is possible. Gradation defines from which point in time on a value

within  the  interval  will  be  rounded  down  and  when  rounded  up.  If  no  rounding  is  to  be  made  to

wage types, no entry must be made here.

Use wage type for comparing with BDE

Using  comparison  allows  to  compare  data  in  the  shop  floor  data  collection  by  means  of  the

rounding results from time and attendance. This is made through the wage types that are marked

here.

Delete wage type after comparing with BDE

If this wage type is only used as sheer processing wage type for comparison purposes, it may be

deleted after comparing.

Field descriptions - incentive wage tab

Time type

This field defines the time type for the time tickets of this wage type. Often used are piecework, time

wage and overhead costs.

Time and labor data for incentive wage

This wage type is used to determine the PZE time and labor data from PZE wage type postings to

calculate the piecework performance efficiency rate from ADE and PZE.

If  this  indicator  is  activated  for  any  wage  type,  the  PZE  time  for  any  person  will  always  be

determined using the PZE wage type postings. If there is  no wage type, for which this indicator is

activated, the total attendance time determined in the PZE  will always be used  as time and  labor

data.

Incentive wages indicator

This indicator is only used when the formula-based incentive wage is applied or in connection with

customer-specific processing methods.

Labor time for group bonus

This field is used to control the way in which PZE wage type postings will be accounted for in the

calculation  of  group  incentives  using  the  formula-based  incentive  wage.  They  will  not  have  any

effect in the standard group incentives without formula-based incentive wage.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 26 of 81

Labor Time Assessment

  Not included in group bonus

PZE wage type postings to this wage type will not be taken into account as labor time for the group

bonus.

  By cost center into posting

The cost center in the PZE wage type posting is interpreted as premium group. In this case the cost

centers in the PZE and the premium groups in the LLE must be identical. By means of the manual

assignment of cost centers to PZE clockings and postings using temporary cost centers, HR master

data versions or the entry of cost centers to the PZE terminal, it is possible to switch cost centers

and to effect movements to other premium groups.

  By premium group from HR master

This option is used to assign the PZE wage type posting via the premium group entered into the HR

master data. By the creation of HR master data versions it is possible to assign persons for specific

days to different premium groups.

  By group assignment

The  function  Change  of  groups  can  be  used  to  assign  persons  for  specific  minutes  to  premium

groups. The assignment from the change of groups is transferred to the PZE wage type postings of

this wage type so that the wage type posting can be accounted for in the calculations for a group.

To do so, the wage type postings will be split if there is a group change in a posting.

Quantity determination by

This  option  can  be  used  to  control  how  the  quantity  of  a  time  ticket  is  determined  from  the  ADE

personnel postings. This is relevant for wage types of the time type Piecework.

Basic settings

Depending on the settings in the LLE basic settings the quantity of time tickets is determined from

yield and scrap in the primary quantities.

Wage type

This  matrix  can  be  used  to  define  by  which  quantity  fields  of  the  ADE  posting  the  time  ticket

quantity will be determined.

Toolbar

 Update accounts

Use  Update  accounts  to  define  which  wage  types  will  be  used  to  extend  or  to  reduce  certain

accounts.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 27 of 81

Labor Time Assessment

 Add. allowances rule

The  Add.  allowances  rule  is  used  to  post  a  special  allowance  to  those  employees,  who  work  on

special days (such as an appearance fee). It is also possible to realize fixed special payments such

as traveling expenses, allowances or similar.

 Wage types relations

This module can be used to configure relations between wage types.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 28 of 81

Labor Time Assessment

6  Update Accounts

1.1  Summary

Menu

Master Data --> Labor Time --> Update Accounts

Transaction Code

pabo

Function authorization

pabo

The "update accounts" option is used to define which wage types are used for postings to and deductions

from particular accounts.

Utilization

For  time  accounts,  the  duration  of  the  daily  wage  type  total  is  posted  onto  the  corresponding  account,

whereas the duration is multiplied by the percentage which is defined in the wage type.

If a configured wage type is available for time accounts the account is added or reduced by one day. The

percentage  rate  of  the  wage  type  is  processed  this  time  as  well.  Consequently,  half  days  may  be

allocated if the wage type is assigned to 50%.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 29 of 81

Labor Time Assessment

If  the  leave  account  (account  number  4)  is  kept  in  days,  the  leave  wage  type  should  not  be

entered here. The leave account is usually posted using the "allocate leave day" field in Control

of absences.

Only the fourth account can be used as leave account. This is due to the fact as the reduction of

leave on a daily basis in the control of absences function affects the account that is assigned to

number 4. Moreover, the specified leave entitlement is also set off against the fourth account.

Field Descriptions

Wage type

The wage type which triggers the posting to the account.

Account

The account to which the time is posted.

Include attendance time

Specifies whether the employee’s attendance times should be taken into account for this posting.

Include absence

Specifies  whether  the  employee’s  absence  times  should  be  taken  into  account  for  this  posting.

Normally both  options are checked, as a differentiation of attendance and absence is usually not

required at this point.

Compensation

Determines whether the wage type should be added to or subtracted from the account.

Company

The company for which the configuration is valid. If the field is left empty, the  configuration applies

to  all  companies.  This  field  should  only  be  filled  in,  if  a  restriction  to  a  particular  company  is

required.

Sequence of Reposting Due to Account Limits

This field controls the reposting peformance at the end of the month as a result of account limits. It

determines whether  reposting to another account is performed immediately, thereby affecting the

limiting of this account, or if the reposting should only be carried out after processing of the account

limits of all accounts.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 30 of 81

Labor Time Assessment

7  Payment Day Types

Summary

Menu

Human Resource Management  Models  Payment Day Types

Transaction code

padt

Function authorization

padt

A payment day type defines how the working time rendered by employees is allocated on  the individual

wage  types.  Each  line  represents  a  separate  payment  rule,  which  regulates  how  target  working  time,

overtime or fixed times are allocated.

Selection Criteria

The application provides the following selection criteria:

PZW-BPZ_81.docx

Version: 1.0.18468

Page 31 of 81

Labor Time Assessment

Utilization

Defines how the payment type is used. The following utilization options are possible:

Payment day type

The payment day type is provided in the selection lists for remunerations of attendance times,

e.g.  When  payment  models  are  created,  for  personal  day  types  and  when  clockings  are

directly entered.

Absence payment

This payment day type is available in selection lists for remunerations of absence times, e.g.

when absences are planned or when absence clockings are directly entered.

Overtime type

This payment type has been designed as overtime type and may, for example, be selected in

the HR master or in personal models. Overtime types allow for the compensation of a person’s

overtime  and  reduced  hours  to  be  controlled,  whereas  the  analysis  period  for  overtime  is

controlled by the configuration of overtime periods in HYDRA.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 32 of 81

Labor Time Assessment

8  Payment Models

Summary

Menu

Human Resources Management  Models  Payment Models

Transaction code

pamo

Function authorization

pamo

Payment day types may be assigned to payment models using weekly models, period  models and year

models.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 33 of 81

Labor Time Assessment

Insert Week Model

 Insert week model

The below dialog opens to insert a week model:

Valid from

The “valid from” field allows for week models with the same model number but different validity start

to  be  defined.  If  changes  to  a  week model  are  required  a  new  week model  with  the  same model

number can be defined for recalculation purposes.

Monday, Tuesday, …, Sunday

The  day  type  for  the  corresponding  weekday  is  entered  in  these  fields.  Using  the  tabs  “public

holidays, important public holidays and other days off” it is possible to define a different day type for

each  weekday  that  is  used  if  the  day  is  defined  as  public  holiday  with  the  corresponding  holiday

type. If the fields of these tabs remain empty the day type from the weekdays tab is used on public

holidays.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 34 of 81

Labor Time Assessment

Insert Period Model

 Insert Period Model

The below dialog opens to insert a period model:

Field Description

Reference date

The reference date defines as of which day the periods described in the table are repeated.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 35 of 81

The “insert” option allows for the individual periods of the period model to be defined:

Labor Time Assessment

Field Description

Number of days

Duration of the period in days

Day type

Defines the day type for payment models.

Day type for public holidays, important public holidays and other days off

A  different  day  type  may  be  entered  in  these  three  fields  for  public  holidays,  important  public

holidays and other days off. If these fields are empty the entry from the previously defined fields is

used at the corresponding public holidays.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 36 of 81

Labor Time Assessment

Insert Year Model

 Insert year model

The below dialog opens to insert a year model:

Date from, to

Period for which an assignment is to be made.

Weekdays, Weekends, Mon, Tue, ..., Sun

Weekdays that are to be assigned. The “weekday” button selects the days from Monday until Friday

and the “weekend” button selects Saturday and Sunday.

Include public holidays, exclude public holidays, public holidays only

This option specifies  whether or not public holidays  are taken into  account or  whether only public

holidays are to be assigned. Public holidays are displayed in brown within the calendar.

Day type

Selects the payment day type that is to be entered for the selected days within the year calendar.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 37 of 81

Labor Time Assessment

Function Key Assignment for the “Weekdays” Tab

Assigns the chosen day type to the selected days.

Deletes the day types entered for the selected days within the year calendar.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 38 of 81

Labor Time Assessment

9  1

Public Holidays

Summary

Menu

Human resource management  Models  Public holidays

Transaction code

ptph

Function authorization

ptph

The following window opens for planning public holidays.

Usage

The  public  holidays  stored  in  the  system  are  considered  when  year  models  are  created.  Subsequent

modifications in the public holiday table do not affect year models that have already been created.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 39 of 81

Public holidays for which absence payment is stored have the same effect as absence planning. In order

for an absence to be generated, target time must be planned for the corresponding days in the working

Labor Time Assessment

time models.

Field descriptions

Absence payment

Absence  payment  day  type  to  be  used  to  generate  an  absence.  If  this  field  remains  empty,  no

absence is planned for this day.

Company

Limitation  of  the  public  holiday  to  a  specific  company.  This  field  can  be  used  if  certain  public

holidays  do  not  apply  for  all  companies  or  if  different  absences  are  to  be  generated  for  different

companies. Otherwise this field remains empty.

Type

Here a specification is made as to whether this is a public holiday, a major public holiday or another

day  off.  In  week  models  and  period  models,  various  day  types  for  the  individual  types  can  be

planned.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 40 of 81

Labor Time Assessment

10  Working Time Information

Summary

Menu

Human resources management Evaluations Working time information

Transaction code

wtin

Function authorization  wtin

The working time information menu item shows the planning data of an employee for a selected day. The

planning data are comprised of the working time frame and of the payment rules of that day.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 41 of 81

Labor Time Assessment

11  Absence Planning

Summary

Menu

Human Resources Management  Planning  Absence Planning

Transaction code

pabp

Function authorization

pabp

Using the absence planning function absences can be planned and displayed for people and employee

groups.

Utilization

Planned absences are listed in descending order and sorted by date within the list, i.e. current and future

absences are displayed on top.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 42 of 81

Labor Time Assessment

In general, absences as well as attendance times are managed in clocking records. The “type” field within

the  clocking  records  allows  for  a  distinction  to  be  made  between  absences  and  attendance  times.  The

“absence” clocking type is used for absences.

Absence records are generated automatically for the calculation of labor time if no clockings are found for

people,  although  working  time  is  planned.  When  it  comes  to  absences,  the  normal  breaks  from  the

working  time  model  are  allocated.  Absences  may  be  created  manually  and  absence  records  that  are

generated automatically may be edited.

Planned  and  unplanned  absence  times  are  distinguished.  We  speak  of  unplanned  absences  if  an

employee is absent, although working time has been planned for the corresponding day and no absence

planning exists. The generation of unplanned absences is defined in the control of labor time calculation.

Unplanned  absences  are  automatically  deleted  when  labor  time  is  calculated,  provided  that  attendance

time exists for the corresponding day.

The below priorities apply when absences are planned:

1st priority from control of absence times

and within the same priority:

1st person, 2nd cost center, 3rd area, 4th company

This means that  within the same priority personal  planning overwrites planning  on cost center

level. Absences for an area take priority over absences relating to companies.

Field Descriptions in the “Absence” Tab

Number of calendar days

The “number of calendar days” column indicates the duration of absences in calendar days, when it

comes to absences of the categories “Continued pay  – illness with continued pay”, “w/o continued

pay  –  illness  without  continued  pay”,  “accident  –  work  accident”,  “maternity  leave”,  “cure  –  health

cure”, and “unpaid illness”.

Company, personnel selection

Selection  criteria  for  the  person  or  group  of  people,  for  that  an  absence  is  to  be  planned.  The

company only needs to be restricted additionally if several companies are managed in the system

and the assignment to the company is not unique.

Valid from, until

Start and end date of the planned absence.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 43 of 81

Labor Time Assessment

Payment

The  payment  day  type  with  which  the  absence  is  to  be  allocated.  If  specifications  are  defined  for

the  selected  payment  day  type  in  the  control  of  absences  the  specifications  are  automatically

entered  within  the  absence  planning  when  entering  the  payment  day  type.  If  the  “modification

enabled” option is not checked in the “control of absences” the corresponding fields are blocked in

the graphical user interface, which prevents the entries from being changed.

Comment

Comment on the absence.

Duration

Planned target time

If this field is selected an absence is generated including the duration of the planned target time.

Planned normal time

If  this  field  is  selected  an  absence  is  generated  with  the  planned  normal  time.  This  time  might

deviate from the target time for people who have flextime or work flexible shifts.

Average working time

If this field is selected the absence time is allocated with the average  working time entered in the

HR master.

Absence

If this field is selected the entered duration is used for the absence time.

Authorization required

Defines whether the absence and corresponding wage type postings have to be signed.

Partly absent, fill up target time to

The  entries  in  this  field  are  percentages.  Values  ranging  between  1  and  100  causes  that  an

absence  record  is  even  generated  if  the  employee  was  present.  The  attendance  time  is  filled  up

with absence time up to the specified percentage of the previously selected duration.

This field is used, for example, if an employee gets ill during the workday or when reduced hours

are worked.

Field Descriptions in the “Settings” Tab

Validity

Defines whether absence planning is to apply for all or only some weekdays. This option is used,

for example, for trainees who always have vocational school on the same weekday.

Previous illness

Shows the fields “period of continued pay”, “duration” and “start date”, when absences are planned

for which continued pay is monitored in the control of absences.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 44 of 81

Labor Time Assessment

Absence request

Shows the date and time of the absence request.

Monitoring of Continued Pay

Shows  the  fields  “period  of  continued  pay”,  “duration”  and  “start  date”  when  absences  are  planned  for

which the continued pay is to be monitored in the control of absences:

A  dialog  where  the  previous  illness  can  be  selected  opens  if  the  selection  list  of  the  “duration”  field  is

used:

If  selected  the  duration  and  the  beginning  of  the  previous  illness  are  automatically  entered  in  the

corresponding fields. As an alternative, the duration and start date can also be entered manually.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 45 of 81

Labor Time Assessment

12  Absence Control

Summary

Menu

Master data  Time and Labor Data Absence Control

Transaction code

abse

Function authorization

abse

The  "absence  control"  module  enables  you  to  make  default  settings  as  well  as  to  plan  the  employees‘

planned absences.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 46 of 81

Labor Time Assessment

Field Descriptions

Field descriptions for the “absence“ tab

Abbreviation: Full-day absence

The comment entered here is taken over to the “abbreviation” field of the absence planning and, as

a result, it is displayed in the graphic absence planning. When it comes to unplanned absences that

are allocated with a specific payment type using evaluation parameters, this field allows for another

abbreviation instead of the “UNG” abbreviation to be defined for the annual absence overview.

Abbreviation: Partly absent

This comment is entered instead of the “full-day absence” comment for days when people are only

partly  absent.  This  makes  it  possible  to  distinguish  between  full-day  absences  and  part-time

absences within the graphic absence planning.

Priority

Priority  of  absence  payment;  potential  values  range  between  0  and  99,  whereas  a  higher  value

stands  for  a  higher  priority.  If  two  absences  are  planned  for  one  person  at  the  same  day,  the

planning assigned to the higher priority will be used.

Percentage

Percentage  by  which  the  planned  duration  is  to  be  multiplied  (e.g.  80%  continued  pay  in  case  of

illness or 50% for half a public holiday).

Category

Assignment  of  the  absence  to  a  specific  group  of  absences.  This  allows  for  different  absence

categories to be displayed in the work day statistics.

Color

Color  to  indicate  the  absence  time  in  the  dialogs  for  graphic  absence  planning,  annual  overview

and personnel scheduling.

Context menu

Absences  that  are  entered  in  this  field  are  displayed  within  the  context  menu  of  the  graphic

absence planning and the personnel scheduling module and, as a result, may be assigned without

starting the graphical user  interface. The value  entered here allows for sorting of absences in the

context  menu.  The  authorization  for  the  responsibility  area  of  the  absence  payment  is  taken  into

account in this context. Within the context menu the user may only view those entries for which they

are authorized. Values ranging between 1 and 9 may be entered. If a value is used several times

the value is displayed according to the number of the payment day type.

Duration

  Target time

The absence is made up of the target working time planned for this day in the working time frame.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 47 of 81

Labor Time Assessment

  Normal time

The absence is made up of the normal working time planned for this day in the working time frame.

  Average working time

The absence is made up of the average working time entered in the HR master.

  Absence

The absence is made up of the specified duration.

Set target time to absence time

If this field is activated the target time is set to the specified absence duration for the day when the

absence is planned. This is especially interesting if absence time is made up of e.g. the normal time

or average working time from the HR master. Overtime or undertime is avoided by setting the target

time to the absence time.

Minimum Duration

This field specifies as of which minimum duration absences are to be generated. Consequently, it is

possible to create an absence for reduced working hours as of a specific (minimum) duration.

Maximum duration

If the absence duration exceeds the value that is entered here  it  will be reduced to the maximum

duration. This option allows for a doctor’s visit to be reduced to two hours, for example.

Field description for the “settings” tab

Authorization required

Absence planning is subject to authorization.

Generate complete absence despite attendance

If this field is active the entire absence time is allocated even if the employee is present. This button

has to be set e.g. for half public holidays.

Partly absent, fill up target time to

The  entries  made  in  this  field  are  percentage  rates.  Values  ranging  between  1  and  100  result  in

absence records to be generated even if the employee is present. In this case, attendance time is

filled with absence time up to the specified percentage rate of the previously selected duration.

This field is used, for example, if an employee gets ill while being at work or if reduced hours are

worked.

Modification enabled

If this option is not checked the input fields referring to the values specified here are blocked in the

absence planning dialog.  Consequently, default values entered  in the corresponding fields cannot

be changed.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 48 of 81

Labor Time Assessment

Display as planned absent

This  field  determines  whether  or  not  the  absence  leads  to  the  overview  dialog  of  the  personnel

scheduling  module  to  display  the  employee  as  being  available  or  not.  Consequently,  employees

who are defined as being absent in the personnel scheduling module may anyway be  included in

the number of available employees. This might be reasonable for absences, like part-time school or

reduced  working  hours.  Provided  that  this  button  is  disabled,  the  graphic  absence  planning  and

personnel scheduling functions show the comment for part-time absences if absences are planned.

Days on  which two  absence times that altogether result  in the target time or normal working time

are  planned  at  one  day  are  displayed  as  “planned  absent”,  irrespective  of  this  option.  As  it  is  the

case, e.g. for half a leave day or half a public holiday.

Compensation

Allocate actual time

Default setting. The absence duration is added to the actual working time.

Allocate as undertime

The  absence  duration  is  not  added  to  the  actual  working  time.  The  undertime  resulting  from  it  is

deduced  from  the  account  using  the  overtime  type  and  the  time  sheet  does  not  show  any  actual

time.

Allocate leave day, allocate half a leave day

One leave day or half a leave day is deducted from the leave account for absences where one of

these  two  options  is  checked  (the  leave  account  is  assigned  to  number  4  when  accounts  are

defined).

Absence time may be requested

This option defines whether or not this absence may be chosen from the Web user interface when

requesting an absence.

Request needs to be approved

This parameter specifies whether or not the absence time requested via the absence workflow has

to be approved by the superior or whether it is automatically considered as being approved.

Continued pay

The  period  after  which  it  is  automatically  switched  to  the  absence  payment  entered  in  the

“subsequent  payment”  field  may  be  entered  in  the  “period  of  continued  pay”  field.  The  period  of

time refers to calendar days and does not depend on the number of actually planned working days

and  weekends.  In  Germany  the  period  of  continued  pay  normally  takes  six  weeks.  This

corresponds to the value 42 that is entered in the “period of continued pay” field.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 49 of 81

Labor Time Assessment

Upload to payroll accounting

These  fields  are  only  processed  in  a  few  customer-specific  interfaces.  The  flag  “upload  to  payroll

accounting”  defines  whether  or  not  the  absence  time  is  transferred  to  the  absence  interface.  A

number  or  designation  that  differs  from  that  of  the  absence  payment  may  be  entered  in  the

“absence reason” field. Moreover, a “control indicator” may be transferred.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 50 of 81

Labor Time Assessment

13  Labor Time Calculation

Summary

Menu

Human Resources Management --> Maintenance --> Labor Time Calculation

Transaction code

ptev

Function authorization

ptev

The "labor time computation" function is the core of the PZE system (time & attendance system). During

the evaluation, the employees’ clockings are synchronized with the working time frame and the resulting

working time is calculated, taking into account the evaluation parameters (rounding rules, etc.). The labor

time calculation function results in the times worked being posted onto wage types.

The  following  description  refers  to  the  manual  starting  of  the  labor  time  calculation  function.  The

automatic starting of the computation function is set up when the system is first installed.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 51 of 81

Labor Time Assessment

Utilization

During the labor time calculation function, the employees' clocking times are compared with the working

time frames defined for those employees and posted accordingly. Errors and other issues are shown in

the  message  list.  The  work  day  evaluation  function  can  be  started  any  number  of  times for  days  in  the

past.  The  evaluation  of  the  current  day  or  of  future  days  will  produce  false  results  in  certain

circumstances, as the clockings are either incomplete or do not yet exist and only planning data is posted.

How the computation of labor time works is described in a separate section.

Selection Criteria

The application provides the following selection criteria:

Evaluate only if required

If this option is set, only those employees are evaluated who require evaluation. Reasons why an

evaluation  is  necessary  might  include:  an  already  evaluated  clocking  record  has  been  edited,  the

subsequent planning of an absence or the resetting of the work day result. If the option is not set,

then the evaluation is run for all selected employees.

Field Descriptions

Quantity

Number of affected people

Note (description)

Note referring to the number of people who have been edited, that are erroneous, blocked or who

do not need to be evaluated.

The  displayed  result  of  the  work  day  evaluation  function  contains  the  number  of  evaluated

employees  and  the  people  with  errors.  The  number  of  blocked  employees  is  also  shown.

Employees can be excluded from being evaluated, if the HR master data sheet is being edited

at the time of the evaluation or if this employee’s clocking records are being edited at another

console. Another reason would be that an evaluation is already running for the employee at this

point  in  time.  In  case  the  attempt  of  evaluating  a  person  results  in  a  message  indicating  that

nobody has been evaluated, this might be due to the fact that the employee has not yet joined

the  company  by  the  specified  date  or  that  not  all  days  are  available  for  the  corresponding

evaluation period due to data retention terms..

PZW-BPZ_81.docx

Version: 1.0.18468

Page 52 of 81

Labor Time Assessment

Toolbar

Messages listing

Opens the messages listing for the selected period.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 53 of 81

Labor Time Assessment

14  Labor Time Calculation Process

Summary

The labor time calculation is the core element of the PZE system. In this evaluation the clockings of the

employees  will be compared to the  working time frame, and the working time resulting from that will be

determined while the control of labor time calculation (rounding rules, etc.) will be taken into account. The

result of the labor time calculation will represent the postings of the worked times to wage types.

Usage

There are two ways to start the labor time calculation:

  1.  Every morning automatically for the day before for all persons in the system. In addition, evaluations

at specific times will be started for persons, for whom evaluations must be made.

  2.  Manually via the screen for any day and any person.

Labor time calculation works as follows:

  1.  If  there  are  still  unevaluated  days  between  the  entered  and  the  last  evaluated  day,  these  will  be

evaluated first and then - and if there was no error - the evaluation for the entered day will be made.

For the first day evaluation of a person in the PZE system this control will not be made.

  2.  Persons, for whom the lock indicator is set in the HR master or for whom the evaluation date is not

within the period between the date of entry and the date of exit, will not be evaluated. In addition to

the date of entry, the first allocation date will be checked.

  3.  If  the  fields  of  the  day  types  are  not  occupied  in  the  clocking  records  yet,  the  day  evaluation  will

determine  the  day  types  from  the  models  in  the  HR  master  and  the  evaluation  day  and  will  enter

them into the clocking records.

For persons, for whom there are no clocking records but to whom a day type with a target working

time  is  assigned,  absence  records  will  be  created.  Absence  records  are  clocking  records  that

include the type "absence" instead of the type "In"/"Out".

The times for the absence start and end will be determined from the assigned day types. Absence

PZW-BPZ_81.docx

Version: 1.0.18468

Page 54 of 81

Labor Time Assessment

start will here always be the start of  the shift or the normal start time in case of flextime. The shift

end time and/or the normal start plus the target time and/or the absence and/or breaks entered into

the absence planning will be assigned to the absence end. If the indicator "Compensate Ø working

time"  is  set  in  the  HR  master,  the  absence  end  will  be  determined  in  such  fashion  that  the  entire

absence  (difference  between  absences  start  and  absence  end  minus  breaks)  will  determine  the

average  working  time  entered  to  the  HR  master.  For  absences  generated  like  that  also  the  day

types will be entered into the clocking record.

If an absence is planned, the values from absence planning will be entered into the comment and

payment  field.  If  absences  are  unplanned,  the  generation  of  an  absence  record  can  be  specified

using the Control of labor time calculation. If the field "Generate unplanned absences" is set to "Yes"

or to "Authorization required", an absence record with the comment "UNG" will be generated. A later

entry of an absence planning allows to substitute unplanned absences by planned ones. In this case

the period of the retroactively planned absence will automatically be evaluated.

In case of several clockings on one day, the fields for the working time frame will apply for the whole

day. The payment  day type  will only  apply for the corresponding clocking record. This means that

different payment day types included in different clockings can be used on one day. An example for

such a situation would be that an employee has for the first two hours of a day a posting for visiting

a doctor and that the normal payment scheme starts only afterwards.

  4.  The clocking records  will be rounded according to the settings  in  Control of labor time calculation.

These rounded times will be entered into the corresponding fields in the clocking record; but only in

those cases in which these are not already populated with times from a previous evaluation or from

manual modifications.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 55 of 81

Labor Time Assessment

  5.  The clocking records will be checked for errors and for the correct status sequence (e.g. in/out, in-

business  trip,  etc.)  and  also  for  the  completeness  of  the  assignment  of  day  types  in  the  clocking

records of the persons concerned.

A  messages  listing  has  been  created.  In  addition  to  the  messages  resulting  from  the  checks

mentioned above, this list will also inform on the presence of people, on whether there is more than

one  clocking  record  for  a  person,  on  whether  the  working  time  is  shorter  than  the  target  working

time, on whether persons are late or leave too early or whether persons are present even though an

absence is planned for them. Messages resulting from errors will be marked in red in the messages

listing.  These  errors  can  then  be  specifically  processed  under  the  menu  item  Labor  time

maintenance.

  6.  Absences will be entered into Personnel scheduling.

  7.  Once  the  evaluation  has  terminated,  you  will  see  at  the  bottom  of  the  screen  how  many  persons

were evaluated and how many errors occurred.

Labor  time  calculations  can  be  repeated  as  often  as  necessary.  It  must,  however,  be  ensured  that  the

data  of  the  day  concerned  will  still  be  available  in  the  system.  For  persons,  who  do  not  have  clocking

records  (e.g.  because  their  clocking  records  were  deleted  in  the  Labor  time  maintenance  window),

absences will be created according to the conditions specified in point 3.

If  an  error  occurred  in  a  day  evaluation  the  following  days  will  not  be  evaluated.  Instead,  an  error

message will appear on the messages listing stating that an error occurred on that specific day.

Messages issued by the labor time calculation

Wrong status sequence

The  clockings  of  the  person  are  not  presented  in  the  correct  sequence.  Either  a  clocking  has  not

been not made or 'in' or 'out' has been clocked twice. This can be corrected in the clocking.

For company ... there is no overtime period for the ...

No Periods for overtime calculation are created for that company.

No valid payment day type found

No payment is planned in the payment model for that specific day. This might happen for example

when Saturdays are always work-free but if one individual employee worked despite that. This can

be  corrected  by  a  manual  entry  of  a  payment  day  type  into  the  clocking  record,  by  a  subsequent

planning of a personal day type or by adapting the relevant payment model.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 56 of 81

Labor Time Assessment

No valid shift or flextime type

No working time is planned in the working time model for that evaluation day. This might happen for

example when Saturdays are always work-free but if one individual employee worked despite that.

This can be corrected by a manual entry of a working time day type into the clocking record, by a

subsequent planning of a personal day type or by adapting the working time model.

Shift type not in the shift day type

The shift type stored to the shift rhythm model for that day does not  exist in the assigned shift day

type.  Either  no  or an inexistent shift type  is assigned to the shift rhythm model  or no shift rhythm

model is stored to the HR master.

Previous evaluation from ... not ok.

The evaluation for the selected was not performed  since an error occurred on that day. Once this

error has been corrected the evaluation will be possible.

A wage type posting subject to authorization is available

For that day at least one posting is or more postings are subject to authorization. Once the postings

have been authorized, this message will no longer be shown.

Absent payment: ... ...

This message will be shown if absences (e.g. leave, illness, etc.) have been compensated. Behind

the message the number and the designation of the compensated absence payment will be shown.

Several clocking-ins available

For one day there are several clocking-ins available.

Target time not achieved

The working time performed by an employee is shorter than the target working time.

Clock-in too late

The clock-in time comes after the start of the shift or of the core time.

Clock-out too early

The last clock-out comes before the end of the shift and/or of the core time.

Present although absence planned

The  person  was  present  even  though  an  absence  was  planned  for  the  evaluation  day.  This

message  will  not  be  created  for  planned  absences  in  case  of  "half  a  leave  day"  and  for  such

absences specified as "partly absent".

Absent in spite of planned working time

The person was absent in spite of planned working time.

Maximum working time exceeded

This message details that an employee exceeded the max. working time entered into the working

time day type.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 57 of 81

Labor Time Assessment

Negative account balances

If there are negative account balances after the labor time calculation this will be shown here.

Labor time calculation necessary

A  clocking  record,  posting  or  absence  planning  has  been  changed  for  the  person  concerned  and

the required labor time calculation has not been started yet.

Locked by application ... for the labor time calculation

At the time of the execution of the last labor time calculation the person was locked. The application

will show why the lock was set.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 58 of 81

Labor Time Assessment

15  Control of Labor Time Calculation

Summary

Menu

Master Data --> Time and Labor Data --> Control of Labor Time Calculation

Transaction code

ptec

Function authorization

ptec

Rounding  rules  and  further  basic  parameter  settings  of  the  HYDRA-PZE  module  are  defined  within  the

control of labor time calculation function.

Utilization

In  addition  to  the  general  settings,  personal  parameters  are  available  for  the  control  of  labor  time

evaluation  to  be  able  to  define  exceptions  for  individual  people,  companies,  departments  or  employee

groups. The following priorities apply in this context:

1)  The general settings are read first.

2)  Entries  for  the  relevant  company,  department,  cost  center,  employee  and  other  employee

groups are then checked.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 59 of 81

Labor Time Assessment

When personal settings are created, only such fields that are to be overwritten have to be

entered. The other fields remain empty and are taken over from the general settings or from

personal parameters of lower priority.

If  customers  have  several  sites  or  different  companies  it  is  reasonable  to  create  personal

settings for each company. The fields of  which have to be filled out completely to prevent  the

changes made to the general settings of one site/company from affecting all sites or companies.

A  user  is  only  allowed  to  edit  the  parameters  for  a  group  of  people  (e.g.  a  cost  center)  if  the

user is at least authorized for the assigned responsibility area of one person in this group

Field description of the validity tab

Type

Defines whether or not it is about general or personal settings.

Company

Restricts the  validity  of personal  evaluation parameters to a particular company.  If this field is left

empty, the personal evaluation parameters apply for all companies.

Personnel selection, value

Defines whether the personal evaluation parameters are to be configured for an employee or for a

group  of  employees.  The  available  employee  groups  include  area,  cost  center,  department,

employee subgroup, activity and employment relationship.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 60 of 81

Labor Time Assessment

Valid from, until

Restricts  the  validity  of  the  personal  evaluation  parameters  to  a  particular  period.  If  only  one  of

these two fields is filled out, the entry is either valid from or until that date.

Priority

If personal evaluation parameters are defined for different employee groups and more than one of

these configurations apply to a single employee, the priority determines which entry takes priority.

Field description for the "settings" tab

Generate unplanned absences

Determines whether or not, when unplanned absences occur, a clocking record should be created

automatically that fills up the planned working time.

Authorization required:

An  absence  time  record  is  created  automatically  and  the  associated  wage  type  postings

require authorization.

Yes:

An absence time record is created automatically.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 61 of 81

Labor Time Assessment

No:

An absence time record is not created automatically.

Absence payment

This  field  is  used  to  define  a  payment  day  type  which  controls  the  allocation  of  unplanned

absences.  If  unplanned  absences  are  to  be  deducted  from  an  account,  it  should  be  ensured  that

the  previous  option  “Generate  unplanned  absence”  is  set  to  "yes"  (J),  as  times  requiring

authorization cannot be charged against other accounts.

Automatic shift identification

Yes: If  a  shift  worker  works  another  shift  than  the  one  scheduled,  the  system  searches

automatically for the correct shift type from the shift day type. This is done by comparing the

start  times  of  the  shifts  with  the  employee’s  clock-in  and  selecting  the  shift  where  the  time

difference is the smallest. If the "search shift type" option is activated by entering "yes", every

shift worker must still be assigned a shift rhythm model, so that an absence time record can be

created if the employee is absent.

No:  The shift type specified in the shift rhythm model is always allocated.

The normal time is used as shift start time for flexible shift models.

Limit between shifts

The  percentage  value  entered  in  this  field  divides  the  time  between  the  previous  and  the

subsequent  shift  starts.  This  field  is  only  applicable  if  the  "search  shift  type"  option  has  been

activated by "yes". Example: If the early shift starts at 6.00 am and the late shift starts at 2.00 pm,

then there is a period of 8 hours between the shifts. With a gradation of 75 %, a clock-in during the

first  6  hours  (up  to  12.00  noon)  belongs  to  the  early  shift  and  a  clock-in  during  the  remaining  2

hours (after 12.00 noon) belongs to the late shift.

Adopt shift type of previous day

If this field is set to ‘J’ (yes), then absences are created with the same shift type that was allocated

on the previous day. This processing only  applies, provided that target  working time was planned

on the previous day.

Minimum duration of a break

If  a  clocking-out  and  the  subsequent  clocking-in  are  within  the  specified  period,  times  which  are

rounded will be set to the same time. Consequently, it can be specified here how long a break or

absence must take at least in order for it to be allocated.

Assign clocking record to current day until

Specifies until what time a clocking record should still belong to the current evaluation day, even if

no working time has been planned for this day. This refers to the clocking-in time. The value of this

field only needs to be changed if night shifts are to supposed to belong to the following day. Default

value: 11.00 pm

PZW-BPZ_81.docx

Version: 1.0.18468

Page 62 of 81

Labor Time Assessment

Hours after end of skeleton time

This  period  specifies  how  long  after  the  planned  end  time,  clocking-ins  are  still  assigned  to  the

current evaluation day. For flextime employees this time refers to the skeleton time end and for shift

employees it refers to the shift end. Default value: 4.00 hours

Field description of the Rounding tab

Rounding type

With the rounding  type  ‘exact to the second’, clocked times are processed exactly  to the second.

With rounding type ‘exact to the minute’, the seconds included in clocking times are always rounded

down to avoid rounding errors in the minute range which could be caused by the seconds. Default

value: "exact to the minute"

Flextime day-type

Interval

The  rounding  interval  determines  the  times  to  which  it  is  possible  to  round  up  or  down.  With  an

interval of e.g. 10 minutes and a working time start at 8.00 am, it is possible to round to 7.40 am,

7.50 am, 8.00 am 8.10 am, etc.

The following reference point applies for rounding: start of normal time

PZW-BPZ_81.docx

Version: 1.0.18468

Page 63 of 81

Labor Time Assessment

Waiting period, clocking-in

The  waiting  period  for  the  clocking-in  specifies  from  what  time  on  a  clocking-in,  within  the  period

given by the rounding interval, should be rounded up. Staying with the previous example, a waiting

period of 3 minutes would mean that the time is rounded down between 7:40 and 7:43 (to 7:40 am)

and that from 7:43 to 7:50 the time is rounded up (to 7:50 am). The rounding procedure is the same

in the other time intervals.

The value “0” is to be entered if a clocking-in is always to be rounded to the end of the period.

Waiting period, clocking-out

The waiting periods for clocking-outs can be defined separately and have the reverse effect, i.e., a

waiting period of 3 minutes, in the above example, would mean that the time is rounded down in the

first 7 minutes of the 10 minutes interval and then rounded up in the remaining 3 minutes. Example:

a limit of three minutes would mean that the time is rounded down to 4.00 pm between 4.00 pm to

4.07 pm and rounded up to 4.10 pm between 4.07 to 4.10 pm.

The value “0” is to be entered if it is to be rounded to the beginning of the period for clocking-outs.

Shift day-type

Interval

The  rounding  interval  determines  the  times  to  which  it  is  possible  to  round  up  or  down.  With  an

interval of e.g. 10 minutes and a beginning of the working time at 8.00 am according to the working

time day type, it is possible to round to 7.40 am, 7.50 am, 8.00 am, 8.10 am. The configurations for

flexible shift workers are made in the shift fields.

The following reference point applies for rounding:

Beginning of the shift and end of the shift or beginning and end of the break.

Waiting period, clocking-in

The waiting period for clocking-in specifies from what time on a clocking-in, within the period given

by the rounding interval, should be rounded up. (see flextime day type).

Waiting period, clocking-out

The  waiting  periods  for  clocking-outs  can  be  defined  separately  and  have  the  reverse  effect  (see

flextime day type).

Working time before skeleton time start

The time prior to the beginning of the working time can be rounded. For shift workers, the working

time refers to the start of the shift and for flextime employees it refers to the start of the skeleton

time. Rounding is performed using the parameters "interval" and "waiting time".

PZW-BPZ_81.docx

Version: 1.0.18468

Page 64 of 81

Labor Time Assessment

Working time after end of skeleton time

The time after the working time end can be rounded. For shift workers, the working time refers to

the end of the shift and for flextime employees it refers to the end of the skeleton time. Rounding is

performed using  the  parameters "interval" and  "waiting period".  If both  parameters are left empty,

the settings for interval and waiting period, which apply for the target time, are used.

Within working time

Rounds within the  working time. This allows for another interval to  be defined for rounding  during

the working time. For example: an interval of five minutes is defined for rounding within the working

time, in contrast to the ten minutes interval for the first clocking-in and last clocking-out.

Within the break frame

Defines rounding rules that are applicable during the break period.

Actual working time

Rounds the calculated actual working time. In this case, the employee’s last clocking-out is rounded

in order for the actual working time to meet the rounding criteria.

Overtime

Defines special rounding rules for any overtime worked.

Active

The "active" field determines for which groups of employees these rules are to be applied:

Shift day type:

The rounding rule applies for shift workers and flexible shift workers..

Flextime day type:

This rounding rule is used for employees working flextime.

'Yes':

The working time is rounded for shift workers and people working flextime.

'No': ´

The rounding rule  is not active. Consequently,  the  working time is neither taken into account

nor allocated in the lines "working time before beginning of skeleton  time" and  "working time

after end of skeleton time".

Interval

The rounding interval determines the times to which it is possible to round up or down.

Waiting period

The waiting period specifies from what time on a clocking, within the period given by the rounding

interval, should be rounded up or down.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 65 of 81

Labor Time Assessment

Field description of the "blocking/waiting period" tab

Reference

This  field  determines  whether,  for  flextime  employees,  the  following  waiting  period  rules  and

blocking rules refer to the "normal working time" (‘N’), the "core working time" (‘K’) or the "skeleton

time"  (‘R’).  It  is  possible  to  choose  between  planned  working  time  (‘S’)  and  normal  time  (‘N’)  for

waiting periods and blocking which occur during target time.

Start time - waiting time, blocking

The waiting period is  allocated in favor  of the  employee  if they arrive too late. The  waiting period

specifies  the  time  an  employee  is  allowed  to  arrive  late,  so  that  it  is  still  possible  to  round  to  the

start  of  the  working  time  according  to  the  working  time  frame.  The  "blocking"  option  defines  the

duration  prior  to  the  beginning  of  the  working  time  that  is  not  allocated  if  the  employee  clocks  in

during  this  period.  It  is  always  rounded  to  the  beginning  of  the  working  time  within  this  blocking

period.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 66 of 81

Labor Time Assessment

End time - waiting time, blocking

The waiting period is allocated in favor of the employee if they leave too early. The waiting period

specifies the time an employee is allowed to leave too early, so that it is still possible to round to the

end of the working time. The "blocking" option specifies the duration prior to the end of the working

time that is not allocated if the employee clocks out during this period of time. It is always rounded

to the end of the working time within this blocking period.

Target time - waiting period, blocking

A  waiting  period  and  blocking  period  for  the  target  time  may  be  entered  here.  The  target  time  is

allocated completely, provided that the target time has not been reach entirely but the time missing

is  still  within  the  entered  waiting  period.  In  contrast  to  this,  the  blocking  time  controls  that  no

overtime will be allocated if the employee leaves after reaching the target time but this time is still

within the blocking time period. Within the blocking time it is always rounded to the end of the target

time.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 67 of 81

Labor Time Assessment

16  1

Resetting Labor Time Calculation

Overview

Menu

Human  resource  management    Maintenance    Reset
calculation

labor

time

Transaction code

ptrs

Function authorization

ptrs

In the Reset labor time calculation individual results of the labor time calculation can be reset for a group

of  persons  and  a  data  period  that  can  be  selected.  In  this  way,  subsequently  modified  working  time

models,  payment  models  and  evaluation  parameters  can  be  considered  in  the  subsequent  labor  time

calculation, for example. The next time it is started, the labor time calculation evaluates all of the previous

days for the people to be evaluated.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 68 of 81

Labor Time Assessment

Usage

When the working time day types and the shift type are reset, the settlement date is reset in the clockings

as  well.  Because  the  clockings  are  then  no  longer  uniquely  assigned  to  a  settlement  date,  other  reset

operations can only be performed for the corresponding people and the selected period after a labor time

calculation. For this reason, all of the required reset options should be selected and executed at once.

If no option was activated in "Reset in clockings", "Delete" and "Manual modifications", the day results are

set such that evaluation is required and the wage types and account postings are regenerated in the next

labor time calculation.

If not all of the days of a settlement period  are present due to data storage time limits, the days of this

settlement period cannot be reset and reevaluated.

When  many  people  are  reset  over  a  long  period,  expect  the  subsequent  evaluation  to  take

longer accordingly.

If  the  options  "Reset  manually  edited  clockings  as  well"  and  "Reset  and  delete  authorized

clockings  and  postings  as  well"  are  activated,  note  that  desired  modifications  (e.g.  manually

corrected rounding, manually modified cost centers or manually creating postings) may also be

reset.

The following notes and warning messages are included to prevent inadvertent improper use.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 69 of 81

Labor Time Assessment

Selection criteria

The following selection criteria are available in the application:

Rounded times

If this field is selected, the rounded evaluation times are reset in the clocking records. This option is

only  used  if  working  time  models  are  changed,  for  example.  In  this  way,  a  new  rounding  of  the

times after the rounding rules have been changed takes effect in the evaluation parameters.

Working time day type and shift type

If  this  field  is  selected,  the  working  time  day  type,  the  shift  type  and  the  settlement  date  in  the

clockings  are  reset. This  option  is  used  in  case  of  subsequently  modified  working  time models  or

personal models or day types, for example.

Payment day type

If this field is selected, the payment day types in the clockings are reset. This option is used in case

of subsequently modified payment models or personal models or day types, for example.

Cost center

If  this  field  is  selected,  the  cost  center  in  the  clockings  is  reset.  This  selection  can  be  used  with

subsequently  modified  master  or  temporary  cost  centers  in  the  HR  master  data.  Then,  in  the

following new evaluation, the  wage type postings  will also be regenerated and  posted to the new

cost center.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 70 of 81

Labor Time Assessment

Automatic absences

If  this  field  is  selected,  automatically  generated  absences  from  absence  planning  as  well  as

advance  and  subsequent  clocking  are  deleted.  This  option  can  be  used  with  modified  absence

planning, for example.

Caution:  If  this  option  is  active  at  the  same  time  as  "Reset  and  delete  authorized  clockings  and

postings as  well",  absences that have been manually edited  will  be  deleted as  well. If there is no

absence planning for these absences, they are irrevocably lost!

Advance/ subsequent clockings

If this field is selected, then the advance/ subsequent clockings are deleted,  regardless of whether

they were compensated as absences, attendance times or business trips. This can be used with a

modified configuration of the absence reasons or modified working time models, for example.

Wage type postings

If this field is selected, the wage type postings on the selected days are reset. The subsequent day

evaluation regenerates the postings.

Reset manually edited clockings as well

The rounded times, working time day types, payment day types and cost centers are also reset in

manually created or edited clockings. If this option is inactive, only unauthorized original clockings

are edited.

Reset and delete authorized clockings and postings as well

If this field is selected, then the previously authorized and refused clockings, automatic absences,

advance/  subsequent  clockings  and  wage  types  are  reset  or  deleted.  In  this  case,  a  manually

created wage type posting counts as an approved posting.

If  the  option  "Reset  and  delete  authorized  clockings  and  postings  as  well"  is  inactive,  only

unauthorized original records that can be regenerated by a subsequent day evaluation are edited.

If this option is active at the same time as the option "Automatic absences", manually

edited absence clockings are also deleted, regardless of whether they were  manually

created,  resulted  from  absence  planning  or  were  generated  due  to  an  advance/

subsequent clocking. Manually created absences and manually edited absences from

advance/ subsequent clockings are not regenerated in case of a new day evaluation!

An absence clocking that was just authorized is not considered to be manually edited

and will be regenerated in subsequent day evaluations.

Field descriptions

Number

Number of respective people

PZW-BPZ_81.docx

Version: 1.0.18468

Page 71 of 81

Note

Note that refers to the number of people that were edited whose clockings were modified or whose

absences, advance/ subsequent clockings or wage type postings were deleted.

Labor Time Assessment

Toolbar

 Labor time calculation

Calls the Labor time calculation.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 72 of 81

Labor Time Assessment

17  Settlement Periods

Summary

Menu

Master Data  Labor Time  Settlement Periods

Transaction code

ptap

Function authorization

ptap

The settlement periods are defined for each year and company.

Utilization

The  year  may  also  be  divided  into  other  settlement  periods  than  calendar  months.  Another  common

alternative is to define settlement periods ranging from the 15th of the previous month until the 14th of the

current month.

Settlement periods for the current year cannot be deleted.

Compensation  errors  might  occur  if  settlement  periods  are  changed  for  the  current  or  past

years.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 73 of 81

Labor Time Assessment

Settlement periods have to be redefined every year.

Field Descriptions

Type

This option enables the user to choose between calendar months and individual periods as monthly

periods. The below-mentioned fields are only enabled if free periods are selected.

Start of first settlement period

Date when the first period starts.

Free period 1 ... 30

This  option  allows  for  the  year  to  be  divided  in  up  to  30  different  periods.  These  periods  are

settlement  periods.  The  duration  of  individual  periods  is  to  be  entered  in  the  fields.  For  example,

settlement periods taking exactly four weeks may be defined here.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 74 of 81

Labor Time Assessment

18  Monthly Evaluation

Summary

Menu

Human Resource Management  Month-End Closing  Monthly Evaluation

Transaction code

ptme

Function authorization

ptme

In  the  Monthly  evaluation  the  wage  type  postings  for  the  settlement  period  are  summarized  and  the

account limitations are carried out.

Usage

The  monthly  evaluation  can  also  be  started  for  the  current,  ongoing  month.  In  this  case,  only  the

previously existing results are summarized. In contrast, accounts are limited only for past months.

The result of monthly  evaluation  displayed  provides information regarding  how  many people  have  been

calculated and for how many people errors occurred. The number of people for whom wage type postings

subject  to  authorization  are  still  available  is  also  displayed.  Possible  reasons  that  people  are  blocked

include the editing of HR master data or account balances at another console.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 75 of 81

Labor Time Assessment

If  the  daily  results  from  previous  months  are  corrected  and  reevaluated,  the  monthly  evaluation  for  this

month  runs  with  the  labor  time  calculation.  Other  months  that  lie  between  this  month  and  the  current

month are also evaluated.

This ensures that after the corrections, account limitation based on current data is performed again and

the account balances at the beginning and end of each month are also corrected.

The processing of the monthly evaluation is described elsewhere.

Monthly evaluations can be repeated as often as desired. However, it must be ensured that the

data of the corresponding month is still available.

Selection criteria

The following selection criteria are available in the application:

Only evaluate if required

If there is a check in the "Only evaluate if required" field only those people for whom a calculation is

required  are  evaluated.  One  reason  that  a  monthly  evaluation  is  required  is  the  corrections  in

previous  months.  If  this  field  is  not  checked,  the  monthly  evaluation  is  performed  for  all  of  the

selected people.

Field descriptions

Number

Number of respective people

Note

Note that refers to the number of people that have been edited, that include errors, that are blocked

or for whom the evaluation is not required.

Toolbar

 Account limits

Calls Account limits

 Messages listing

Calls the monthly Messages listing.

 Interface to payroll accounting

Calls the Interface to payroll accounting.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 76 of 81

Labor Time Assessment

 Time sheet

Displays the Time sheet.

 Monthly results

Calls the Monthly results list.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 77 of 81

Labor Time Assessment

19  Account Limits

Summary

Menu

Human Resource Management  Month-End Closing  Account Limits

Transaction code

pali

Function authorization

pali

If “account limits” are entered it is possible to define maximum and minimum limit values for HYDRA-PZE

accounts. “Account limits” can be specified for individual  people and for groups of people. The accounts

are restricted when months are evaluated.

In  addition  to  restrictions  that  are  subject  to  the  account  balance,  it  is  also  possible  to  set  off  fixed

amounts against individual accounts, for example, to pay out a particular amount of hours or to post leave

entitlement onto an account.

Utilization

If an account limit that is valid for a year and a period or for a period of time (date from, until) is created,

changed or deleted makes the monthly results for the affected people subject to authorization so that the

modification is processed when the next cyclic evaluation takes place at the latest.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 78 of 81

Labor Time Assessment

Selection Criteria

The application provides the following selection criteria:

Person from, to, company, area, cost center

Selects the  people for whom account limits are to  be  displayed. If only one person is selected  all

account  limits  are  displayed  that  apply  to  this  person,  irrespective  of  the  fact  whether  they  have

been defined specifically for this person or for a group of people.

Account

Restricts the validity period of the account limit to a specific company.

Date from, until

Period  of  time  for  which  valid  account  limits  are  to  be  displayed.  If,  for  example,  the  end  of  a

monthly period is entered only account limits are displayed that apply to this settlement month.

Account  limits  that  are  defined  for  one  year  or  a  period  are  only  properly  displayed,  provided

that corresponding settlement periods have already been created.

Field Descriptions

Company

The validity period of the account limit may be restricted to a specific company.

Selection of a person or group of people

The  next  two  fields  restrict  the  account  limit  to  a  specific  person  or  a  group  of  people.  The  HR

master fields “area”, “cost center”, “department”, “group of employees”, “activity” and “employment

relationship” may be selected as employee group.

Account

Account for which the account limit is to apply.

Processing

Defines  whether  the  rule  is  an  account  limit,  whether  a  fixed  amount  is  to  be  set  off  against  the

account or whether an account balance is to be set. The “as fixed amount” option may be used, for

example, to post leave entitlement onto a  leave  account or to pay out a specific duration from an

account.

If a fixed amount is to be deducted from an account it has to be entered as negative

value (e.g. “-20:00”). Positive values are added to the account.

If an account limit and the “fixed amount” processing as well as an account limit that is

subject to the account balance is defined in the same order, the “fixed amount” option

PZW-BPZ_81.docx

Version: 1.0.18468

Page 79 of 81

Labor Time Assessment

will be posted first and then the account limit that depends on the account balance.

Upper limit, wage type

Specifies the upper limit value for the account. If the account balance exceeds this limit value at the

end  of  the  month  the  difference  will  be  posted  on  the  specified  wage  type.  The  account  is  only

restricted if the upper limit is activated.

Lower limit, wage type

Specifies the lower limit value for the account. If the account balance falls short of this limit value at

the end of the month the difference will be posted on the specified wage type. The account is only

restricted if the lower limit is activated.

If an account is restricted due to a negative limit value the duration will be posted with

positive  algebraic  sign  onto  the  corresponding  wage  type.  This  wage  type  is  to  be

interpreted as deduction from wages within the scope of payroll accounting.

Validity

Year, settlement period

Allows for the account limit to be restricted to a specific year and/or settlement period. If an account

limit applies for a “settlement period” and/or “year” any account limits that might exist without “year”

and “settlement period” will not be processed. This allows for different account limit to be defined for

single months or years.

Valid from, until

Validity period of the account limit. When it comes to the evaluation of months only those account

limits are processed that apply for the last day of the monthly period. Provided that several account

limits are to be processed within the same order, the validity period must be identical for all of them.

Processing

Priority

If  account  limits  are  defined  for  different  groups  of  people  the  “priority”  function  controls  which

account  limit  takes  priority  over  the  other,  provided  that  a  person  is  assigned  to  these  groups  of

people.

Sorting

The  sort  sequence  may  be  defined  in  this  field  if  several  account  limits  are  to  be  processed  one

after the other for an account. Only the account limits for a group assigned to the highest “priority”

are processed within one “sorting” process.

PZW-BPZ_81.docx

Version: 1.0.18468

Page 80 of 81

Labor Time Assessment

PZW-BPZ_81.docx

Version: 1.0.18468

Page 81 of 81

