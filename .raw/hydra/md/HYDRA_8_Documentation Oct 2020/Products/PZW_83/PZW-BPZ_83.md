Manual

Labor Time Assessment
PZW-BPZ 8.3

Version 1.0.23503

Last changed on: 02.10.20209

Labor Time Assessment

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 2 of 89

Labor Time Assessment

Contents

1  Labor Time Assessment - Overview ............................................................ 5

2  Working Time Day Types ............................................................................. 7

3  Working Time Models ................................................................................ 12

4  Shift Rhythm Models .................................................................................. 18

5  Wage types ................................................................................................ 24

6  Configuration of Accounts .......................................................................... 29

7  Update Accounts ........................................................................................ 32

8  Payment Day Types ................................................................................... 34

9  Payment Models ........................................................................................ 36

10  Public holidays ........................................................................................... 42

11  Working Time Information .......................................................................... 44

12  Absence Planning ...................................................................................... 45

13  Control of Absences ................................................................................... 51

14  Year Overview ............................................................................................ 56

15  Labor Time Calculation .............................................................................. 58

16  Labor Time Calculation: Workflow ............................................................. 61

17  Control of Labor Time Calculation.............................................................. 66

18  1 Resetting Labor Time Calculation ........................................................... 74

PZW-BPZ_83.docx

Version: 1.0.23503

Page 3 of 89

Labor Time Assessment

19  Settlement Periods ..................................................................................... 79

20  Monthly Evaluation ..................................................................................... 81

21  Account Limits ............................................................................................ 84

22  Implementation PZW .................................................................................. 88

PZW-BPZ_83.docx

Version: 1.0.23503

Page 4 of 89

Labor Time Assessment

1  Labor Time Assessment - Overview

Purpose

This function package contains functions necessary to assess employees' presence and absence times.

Implementation notes

The function package is used if:



you  want  to  use  HYDRA  Personnel  Time  Management  to  assess  employee  presence  and

absence times and post these on wage types.





you plan employee absence in HYDRA.

you manage employee accounts in HYDRA.

Integration

The function package Labor Time Entry and Management is the basis for Assessing Labor Times.

Features

  Responsibility areas for configurations

o  Access and maintenance control for various master data (e.g. wage types, labor time and

payment  models)  for  individual  users.  This  can  be  used  for  example  to  control  which

users may plan which absence times.

  Working time day types

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

o  Week, period and year models to specify which payment rules to assign to which days

  Holiday management

o  Managing various holiday calendars

PZW-BPZ_83.docx

Version: 1.0.23503

Page 5 of 89

Labor Time Assessment

o  Defining  non-standard  working  times  and  payment  rules  for  holidays  and  absence  and

presence time compensations on holidays

o  Compensating allowances for night shifts that partly fall on holidays

  Working time information

o  Detailed display of planned working time and payment rules taking actual re-planning into

account

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

PZW-BPZ_83.docx

Version: 1.0.23503

Page 6 of 89

Labor Time Assessment

2  Working Time Day Types

Summary

HYDRA menu

Human resource management  Models  Working time day types

FEDRA menu

Advanced resource planning  Master data  Working time day types

Transaction code

wtdt

Function authorization  wtdt

All of the various employee working times are defined in the working time day types.

Usage

To  specify  the  working  time  for  a  shift  worker,  all  of  the  shifts  that  occur  in  a  day  are  entered  in  the

working  time  day  type.  Each  shift  of  the  day  is  represented  in  a  working  time  day  type,  each  of  which

contains an identifier referring to the corresponding shift, e.g. 'F' for early shift, 'S' for late shift, etc.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 7 of 89

Labor Time Assessment

Field descriptions for the Working time tab

Type

Selection regarding whether the type is flextime or shift day type.

Shift type

In  working  time  planning  in  the  shift  rhythm  model,  the  shift  type  field  is  used  to  plan  one  of  the

shifts defined in the day type for the employee. The designation can be freely selected although the

system  is  case  sensitive.  The  shift  types  within  one  day  type  must  be  different.  Self-explanatory

abbreviations, such as "F" for early shift and "N" for night shift, are useful.

A  night  shift  that  is  to  be  compensated  on  the  following  day  is  configured  using  a

negative  start  time  in  skeleton  and  normal  time.  For  example,  the  entry  "-2:00"  means

that  the  shift  starts  two  hours  before  0:00,  or  at  22:00  on  the  previous  day.  If  the  core

time  is  also  to  begin  on  the  previous  day,  a  negative  time must  also  be  entered  in  the

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

Rest period

The rest period specifies how long after the end of the working time employees have to rest before

they are allowed to resume work on the next day. Planning scenarios violating the rest period are

highlighted in pink in Personnel Scheduling. Provided that the rest period has not been respected,

Labor Time Calculation generates a respective message that is shown in Messages listing

Beginning, end of skeleton time

Specification of the period in which employee presence is allowed. Control of labor time calculation

can be used to define whether or not the working time before or after the beginning/ end of skeleton

time is to be compensated.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 8 of 89

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

In these three groups, a skeleton time, a minimum  duration and a normal time can be entered for

each break. In addition, a specification can be made regarding whether the break is unpaid or paid.

While unpaid breaks are subtracted from the working time, paid breaks count as working time and

are  considered  in  the  compensation  of  breaks  depending  on  working  time,  for  example.  For  day

types that include fewer than three breaks, the other break fields remain empty.

For paid breaks, the field Minimum duration is processed as maximum duration.

Note regarding the processing of flexible breaks

Flexible  breaks  are  unpaid  breaks  in  which  the  period  of  the  break  frame  is  longer  than  the

minimum duration of the break. The following rules apply for processing flexible breaks:

  1.  The employee is present, but does not create a clocking within the break frame. If the system does

not  find  a  clocking  within  the  break  frame,  the  employee  is  credited  with  the  normal  time  for  the

respective break.

  2.  If  the  employee  creates  a  clocking  within  a  break  frame  and  the  clocked  time  is  longer  than  the

minimum break, exactly that clocked time is subtracted for the employee.

  3.  If  the  employee  creates  a  clocking  within  a  break  frame  and  the  clocked  time  is  shorter  than  the

minimum break, the minimum break is subtracted for the employee.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 9 of 89

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

Only  one  paid  break may  be  clocked  per  break frame.  Multiple  paid  breaks  within  one  break

frame cannot be processed correctly.

Field descriptions for the On-call duty tab

Beginning, end of on-call duty

Up to two on-call duty intervals can be stored in the working time day type. Setting up on-call duty is

described in the On-call duty documentation.

The  fields  in  the  On-call  duty  tab  can  only  be  accessed  if  the  Personnel  Scheduling  license

(PZW-PZP) is active (only applicable if HYDRA is used).

PZW-BPZ_83.docx

Version: 1.0.23503

Page 10 of 89

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

This option can be used to select if the compensation of the target time is to occur  beginning with

the start of the working time, the frame, the normal time or the core time. For example, if the start of

the frame is set and the employee  worked overtime, the target time is filled  with the working time

after  the  start  of  the  frame  and  the  previous  time  (time  before  frame  start  or  parts  of  it)  are

compensated  as  overtime.  With  the  Working  time  start  setting,  any  possible  existing  overtime  is

always compensated at the end of the working time.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 11 of 89

Labor Time Assessment

3  Working Time Models

Summary

HYDRA menu

Human resource management  Models  Working time models

FEDRA menu

Advanced resource planning  Master data  Working time models

Transaction code

wtmo

Function authorization  wtmo

Week models, period models and year models can be used to assign working time day types to  working

time models.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 12 of 89

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

Important  public  holidays  and  Other  days  off  tabs  can  be  used  to  store  a  different  day  type  per

weekday. This day type is used if the day is defined as a public holiday with the respective public

holiday  type.  If  the  fields  in  these  tabs  are  empty,  on  public  holidays,  the  day  type  from  the

Weekdays tab is used.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 13 of 89

Labor Time Assessment

Insert period model

 Insert period model

The following dialog opens for inserting a period model:

Field description

Reference date

The  reference  date  specifies  the  date  on  and  after  which  the  periods  described  in  the  table  will

cycle through repeatedly.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 14 of 89

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

PZW-BPZ_83.docx

Version: 1.0.23503

Page 15 of 89

Labor Time Assessment

Insert year model

 Insert year model

The following dialog opens for inserting a year model:

Date from, to

Period for which an assignment is to be made.

Weekdays, weekends, Mo, Tu, ..., Su

Weekdays that are to be assigned. The  weekdays button selects the days from Monday to Friday

and the weekends button selects Saturday and Sunday.

Include public holidays, exclude public holidays, public holidays only

This option is used to specify whether or not public holidays are considered in the assignment or if

only public holidays are assigned. Public holidays are shown in brown in the year calendar.

Day type

Selection  of  the  working  time  day  type  that  is  to  be  entered  on  the  selected  days  in  the  year

calendar.

Field descriptions for the Weekdays tab

Assigns the selected day type on the selected days.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 16 of 89

Labor Time Assessment

Deletes the day types entered on the selected days in the year calendar.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 17 of 89

Labor Time Assessment

4  Shift Rhythm Models

Overview

HYDRA menu

Human resources management  Models  Shift rhythm models

FEDRA menu

Advanced resource planning  Master data  Shift rhythm models

Transaction code

srmo

Function authorization

srmo

To specify the working time of a shift worker, you require the working time model and the so-called shift

rhythm model. This model specifies the shift type of the different workdays.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 18 of 89

In tab Calendar view, the selected shift rhythm model is displayed in a current calendar view. With shift

rhythm  models  that  have  been  created  long  ago,  the  calendar  view  provides  an  overview  of  the  shift

rhythm of the current year. This way it is easier to assign the correct model to a person.

Labor Time Assessment

Purpose

In the shift rhythm model, you can enter a shift type for the selected days. This is also possible

if no day type has been stored for the respective day in the working time model. This way, it is

often easier to create a shift rhythm model.

Insert week model

 Insert week model

To insert a Week model, the following dialog opens:

PZW-BPZ_83.docx

Version: 1.0.23503

Page 19 of 89

Labor Time Assessment

Valid from

You can use the Valid from field to define week models with the same model number and different

validity start dates. If you must edit a week model, you can store this change retroactively using a

new week model with identical model number.

Monday, Tuesday, …., Sunday

You enter the shift type of the respective weekday in these fields. In tabs Public holiday, Important

public holidays and Other days off, you can store a different shift type for the weekday that is used

if the day is defined as a public holiday with the relevant holiday type. If these fields are left empty,

then the day type from the Weekday tab is used on public holidays.

Insert period model

Insert period model

To insert a Period model, the following dialog opens:

PZW-BPZ_83.docx

Version: 1.0.23503

Page 20 of 89

Labor Time Assessment

Field description

Reference date

The periods of time defined in the table are repeated from the day onwards specified as Reference

date.

Use the button Insert to define the different periods of the period model:

PZW-BPZ_83.docx

Version: 1.0.23503

Page 21 of 89

Labor Time Assessment

Field description

No of days

Duration of the period in days

Day type

Specifies the shift type.

Day type with Public holiday, Important public holiday, Other day off

In  these  3  fields,  you  can  enter  a  different  day  type  for  public  holidays,  important  public  holidays

and other days off. If the fields are left empty, then the value of the field  Day type is used on the

relevant public holidays.

Insert year model

Insert year model

To insert a Year model, the following dialog opens:

Date from, to

Period of assignment

Weekdays, Weekend, Mon, Tue, …, Sun

Weekdays that you want to assign. The button Weekdays includes the days from Monday to Friday

and the Weekend button includes Saturday and Sunday.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 22 of 89

Labor Time Assessment

Include public holidays, Exclude public holidays, Public holidays only

This  option  specifies  if  the  public  holidays  are  integrated  during  the  assignment  or  not  or  if  only

public holidays are assigned. Public holidays are displayed in brown in the year calendar.

Day type

Specifies the shift type that is entered in the year calendar on the selected days.

Function buttons in tab Weekdays

Assigns the shift type entered to the selected days.

Deletes the shift types entered on the selected days in the year calendar.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 23 of 89

Labor Time Assessment

5  Wage types

Overview

Menu

Master data  Labor time  Wage types

Transaction code

waty

Function authorization  waty

Wage  types  are  different  categories  to  group  times  with  different  information  (e.g.  night  shift,  overtime,

etc.). We distinguish between basic wage types that are used for the payment of special working time and

bonus wage. Usually, different types of absences are also specified as different wage types.

Field description tab "Wage type"

Wage type, name

Alpha numeric identification of the wage type and name.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 24 of 89

Labor Time Assessment

Authorization required

This option is used to define a wage type with required authorization. If the option is not active, the

system requires authorization somewhere else (e.g. in the payment day type).

Percentage

The  percentage  with  which  the  wage  type  is  compensated.  Specifying  a  percentage  only  has  an

effect if the wage type is to be posted to an account. Otherwise, this is a comment field.

Entries with 0% are not posted.

Responsibility area

A user is only authorized to edit this wage type if he or she has authorization for the assigned area

of responsibility.

Confirm wage type to payroll system

If  an  interface  to  Payroll  Accounting  exists,  you  can  use  this  option  to  specify  whether  or  not  this

wage type is transferred to the interface file.

Payroll wage type

You use the wage type to post information to the payroll department.  This field is not processed in

all interfaces.

Payroll control option

A field for customer specific processing.

Purpose

Specifies  whether  the  wage  type  should  be  used  to  calculate  planned  working  time,  overtime  or

undertime.  It  is  also  possible  not  to  specify  anything.  The  wage  types  marked  with  Overtime  are

listed  in  the  Overtime  column  of  the  time  sheet.  The  same  applies  to  the  use  of  Undertime,  but

these times are displayed as negative.

Type

Specifies whether the wage type is a basic or a bonus wage type.

Field description tab "Settings"

Processing

Note on how this wage type is used. This is a comment field and can be left empty.

Selection field

A field for customer specific processing.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 25 of 89

Labor Time Assessment

Average Type

The field "Average type" is processed with the aid of interfaces to transfer "Monthly wage types" to

the payroll systems LOGA and  Abacus.   You can find further information  in the  description of the

interfaces.

Rounding of wage type

The  fields  "Interval"  and  "Limit"  (both  in  the  format  hours:minutes)  can  be  used  for  rounding  the

daily duration of a wage type. The interval forms the points in time used to round up or down.  The

limit  specifies  up  to  what  point  in  time  the  system  rounds  down  during  the  interval  and  when  it

rounds up. If no rounding to wage types is required, you do not need to make an entry.

Wage  types  are  rounded  after  the  "Additional  allowances  rule"  and  the  "Wage  type

interaction" were processed.

Use wage type for comparison with BDE.

You  can  use  the  Comparison  function  to  compare  data  in  the  order  data  entry  for  rounding  in

personnel time recording. This is done with the wage types that are marked here.

Delete wage type after comparison with BDE.

If  this  wage  type  is  only  a  processing  wage  type  for  comparison  and  can  be  deleted  after  the

comparison.

Field description Tab "Incentive wage"

Time type

This field specifies the "Time wage, "Piecework" and "Overhead costs".

Labor time for incentive wage

This wage type  is used to deduce the PZE labor time from the PZE wage type  posting  when  you

calculate the performance efficiency rate for piecework from ADE and PZE.

If the wage type is activated with this option, then the PZE labor time is always deduced using the

PZE  wage  type  posting  no  matter  what  person.  If  the  wage  type  cannot  be  activated  with  this

option, then you use the attendance time from the PZE as the labor time.

Incentive wages option

You  only  use  this  option  if  you  calculate  a  formula-based  incentive  wage  with  a  customized

processing.

Labor time for group bonus

This field controls how PZE wage type postings are included in the calculation of the group bonus

using formula-based incentive wages. This field is not relevant if you have a standard group bonus

without formula-based incentive wage calculation.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 26 of 89

Labor Time Assessment

  Not included in the group bonus

PZE wage type postings for this wage type are not included as labor time in the group bonus.

Using cost center for posting

The cost center in the PZE wage type posting is interpreted as a premium group. In this case, the

cost center for the PZE and the premium groups of LLE must be identical.  Transfers to other

premium groups can be achieved by manually assigning:

cost centers in the PZE clockings and postings

temporary cost centers

HR master data versions

cost center entries at the PZE terminal

cost center changes.

Using premier groups from the HR master data

With this option  you assign the PZE wage type postings entered in the premium groups using the

premium group of the HR master data.  Persons can be transferred to other premium groups on a

daily basis by creating HR master data versions.

Using group assignments

You use the function "Change of group" to assign people to the premium groups down to the exact

minute.  The assignment from the group changes is transferred to the PZE wage type postings for

this wage type and then you can include the wage type posting for the group calculation. In order to

do so, you separate the wage type postings if a group change takes place during the posting.

Quantity determination by

You  use  this  option  to  control  how  the  quantities  for  piecework  are  calculated  when  persons  are

posted in the ADE.    This is relevant for wage type with the time type "Piecework".

Basic settings

LLE  basic  settings  The  system  calculates  the  quantities  for  the  time  ticket,  which  includes  scrap

and yield from the primary quantities if the setting is made.

Wage type

You  can  use  the  matrix  to  set  which  quantity  fields  of  the  ADE  posting  are  used  to  calculate  the

quantity for the time ticket.

Toolbar

Update accounts

Update  accounts  With  "Update  accounts"  you  specify  which  wage  types  are  used  to  increase  or

decrease amounts for certain accounts.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 27 of 89

Labor Time Assessment

Additional allowances rule

You  use  the  option  "Add.  allowances  rule"  to  post  an  additional  bonuses  if  employees  work  on

special  days.  Additional  allowances  rule    Likewise,  fixed  special  payments  such  as  fare,  lunch

money or similar can be made.

Wage types relations

You can configure interactions between wage types Wage type interactions .

PZW-BPZ_83.docx

Version: 1.0.23503

Page 28 of 89

Labor Time Assessment

6  Configuration of Accounts

Overview

Menu

Master Data  Labor time  Configuration of Accounts

Transaction code

paco

Function authorization

paco

The accounts of the HYDRA PZW (Personnel Time Management) are continuous balances that are kept

in hours or days (contrary to wage types always starting from 0 at the beginning of a month).

You can keep up to eight continuous accounts. Use this dialog to activate the accounts and specify their

processing and name.

Purpose

The  number  of  accounts  is  fixed  at  8.  For  this  reason,  the  buttons  Insert,  Copy  and  Delete  are  not

available.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 29 of 89

The leave entitlement defined in the HR master data is offset using account 4. Use account 4 as

leave account for this reason.

Labor Time Assessment

Field descriptions

Account, Designation

Number of the account ranging between 1 and 8 and its name.

Active

Status of account. Only an active account is used for bookings and can be evaluated.

Account type

Time account for keeping the account in hours and minutes.

Day account for keeping the account in days (e.g. leave).

Decimal places

With time accounts, the number of decimal places is zero.

With day accounts, you can define the number of decimal places. For example, if you have defined

one decimal place for the leave account, you can offset half a leave day.

If  you  make  changes  in  field  Decimal  places  or  if  you  change  the  Account  type  during

running operation, this can cause wrong account balances and a wrong display.

Sorting of account lists, terminal information, time sheets, account limits

Sorting  order  of  the  accounts  (position  1-8,  1  =  first  position)  in  the  account  lists,  the  terminal

information  and the  time sheet. If the  Sorting field remains empty,  the  account  is not displayed in

the respective application.

In field Account limitation, you can specify the order used to  limit the accounts. For example,  you

can use this setting if you repost from one account to another and you then want to limit the target

account.

Terminals  of  the  manufacturer  Kaba  Benzing  and  of  type  CTP-340  can  only  show  a

maximum of 4 accounts.

Green from, Green to, Yellow from, Yellow to

These fields of the group Account indicator specify the color used for the relevant account balance

in  the  reports  Current  account  balances,  the  Monthly  results  and  in  the  Personnel  scheduling.

Account balances outside of the yellow range are displayed in red. If these fields remain empty, no

color is used to highlight the fields.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 30 of 89

Labor Time Assessment

Upload positive/negative account balance, Wage type, Sign

Use  these  options  to  specify  whether  the  positive  or  negative  account  balance  of  an  account  is

posted  to  the  Wage  type  in  the  Monthly  results  so  that  the  account  balance  is  uploaded  to  the

payroll accounting with the other wage types. Only few interfaces support the upload of wage types

with negative duration. For this reason, it might be required to enter different wage types for positive

and  negative  account  balances  and  to  convert  the  algebraic  sign  to  a  "positive"  sign  for  negative

account balances.

In  addition  to  the  application  Configuration  of  accounts  where  you  can  define  the  accounts

displayed  on  the  terminal  for  the  entire  system,  there  is  the  application  Configuration  terminal

information where you can overwrite the accounts displayed on the terminal and their names for

entire  companies,  groups  of  persons  (department,  area,  cost  center,...)  and  for  separate

persons.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 31 of 89

Labor Time Assessment

7  Update Accounts

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

PZW-BPZ_83.docx

Version: 1.0.23503

Page 32 of 89

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

The company for which the configuration is valid. If the field is left empty, the configuration applies

to  all  companies.  This  field  should  only  be  filled  in,  if  a  restriction  to  a  particular  company  is

required.

Sequence of Reposting Due to Account Limits

This field controls the reposting peformance at the end of the month as a result of account limits. It

determines whether  reposting to another account is performed immediately, thereby affecting the

limiting of this account, or if the reposting should only be carried out after processing of the account

limits of all accounts.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 33 of 89

Labor Time Assessment

8  Payment Day Types

Summary

Menu

Human Resource Management  Models  Payment Day Types

Transaction code

padt

Function authorization

padt

A payment day type defines how the working time rendered by employees is allocated on the individual

wage  types.  Each  line  represents  a  separate  payment  rule,  which  regulates  how  target  working  time,

overtime or fixed times are allocated.

Selection Criteria

The application provides the following selection criteria:

PZW-BPZ_83.docx

Version: 1.0.23503

Page 34 of 89

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

Toolbar

 Payment rules

This icon opens the application to display and edit the payment rules of the selected payment day

type.

 Control of absences

This icon opens the control of absences application.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 35 of 89

Labor Time Assessment

9  Payment Models

Summary

Menu

Human Resources Management  Models  Payment Models

Transaction code

pamo

Function authorization

pamo

Payment day types may be assigned to payment models using weekly models, period models and  year

models.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 36 of 89

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

PZW-BPZ_83.docx

Version: 1.0.23503

Page 37 of 89

Labor Time Assessment

Insert Period Model

 Insert Period Model

The below dialog opens to insert a period model:

Field Description

Reference date

The reference date defines as of which day the periods described in the table are repeated.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 38 of 89

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

PZW-BPZ_83.docx

Version: 1.0.23503

Page 39 of 89

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

PZW-BPZ_83.docx

Version: 1.0.23503

Page 40 of 89

Labor Time Assessment

Function Key Assignment for the “Weekdays” Tab

Assigns the chosen day type to the selected days.

Deletes the day types entered for the selected days within the year calendar.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 41 of 89

Labor Time Assessment

10  Public holidays

Overview

Menu

Human resources management  Models  Public holidays

Transaction code

ptph

Function authorization

ptph

The following application opens for planning public holidays:

Purpose

The  public  holidays  stored  in  the  system  are  considered  when  year  models  are  created.  Subsequent

modifications in the public holidays table do not affect already existing year models.

Public  holidays  for  which  you  have  defined  an  absence  payment  also  have  the  same  effect  as  if  an

absence was planned. In order for the system to generate an absence, you must have planned a target

time for the corresponding days in the working time models.

Field descriptions

Type

Here you can specify whether it is a Public holiday, a Religious holiday or an Other day off. In week

and period models, you can plan different day types for the particular types.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 42 of 89

Labor Time Assessment

Absence payment

Payment  day  type  which  should  be  used  to  create  an  absence.  If  this  field  is  left  empty,  then  no

absence is planned for this day.

Company

Use  this  option  to  restrict  the  public  holiday  to  a  particular  company.  Use  this  field  if  a  particular

holiday  is  not  valid  in  all  companies  or  if  different  absences  should  be  created  for  different

companies. Otherwise, you should leave this field empty.

Personnel selection

Use this field to plan public holidays for groups of persons or individual persons. This is mainly

required if employees also work on public holidays due to a continuous shift model. For a specific

group of persons, you can disable a public holiday that is planned for the entire company, if you

select the option No public holiday. The following priorities apply, if several public holidays with

different personnel selections are defined for an employee on one day:

  1) person

  2) employee subgroup

  3) cost center

  4) area

  5) department

  6) activity

  7) employment relationship

  8) person does not clock

PZW-BPZ_83.docx

Version: 1.0.23503

Page 43 of 89

Labor Time Assessment

11  Working Time Information

Summary

Menu

Human resources management Evaluations Working time information

Transaction code

wtin

Function authorization  wtin

The working time information menu item shows the planning data of an employee for a selected day. The

planning data are comprised of the working time frame and of the payment rules of that day.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 44 of 89

Labor Time Assessment

12  Absence Planning

Overview

Menu

Human resource management  Planning  Absence planning

Transaction code

pabp

Function authorization

pabp

You use the absence planning function to plan and display absences for persons and groups of persons.

Purpose

The  application  shows  the  planned  absences  in  descending  order  and  sorted  by  date,  i.e.  current  and

future absences are displayed on top. The requested absences are displayed in blue and italic font and

the rejected absence requests are displayed in red and italic font.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 45 of 89

Labor Time Assessment

In general, absence times and attendance times are managed via clocking records. The Type field of the

clocking  records  is  used  to  identify  absence  and  attendance  times.  Absence  is  the  clocking  type  for

absence times.

The  system  automatically  generates  absence  records  during  the    Labor  time  calculation  if  no  clocking

records are available for employees, although working time is planned. When it comes to absences, the

system  subtracts  the  standard  breaks  defined  in  the  working  time  model.  You  can  create  absences

manually and you can edit absence records that are generated automatically.

The system differentiates  between  planned and unplanned absences. If an  employee is absent, though

working time is planned for that day and there is no absence planning, then it is an unplanned absence.

In  the  Control  of  labor  time  calculation,  you  can  configure  how  unplanned  absences  are  generated.

The system automatically deletes unplanned absences during  Labor time calculation, if attendance time

exists for the relevant day.

When you plan absences, the below priorities apply:

1st priority from Control of absences

and within the same priority:

1st person, 2nd cost center, 3rd area, 4th company

This means that within the same priority, personal planning overwrites planning on cost center

level. Absences for an area take priority over absences relating to companies.

Selection criteria

The application provides the following selection criteria:

Status

The selection is narrowed  down to the requested absences. Example:  You can  use this selection

criterion to display a processing list of all holiday requests that have not yet been approved.

Field descriptions in the Absence tab

Company, personnel selection

If you want to plan an absence, you use these fields to select a person or a group of persons. You

must  additionally  select  the  company  if  several  companies  are  managed  in  the  system  and  the

allocation by company is not clear and unambiguous.

Valid from, valid until

Start and end time of the planned absence.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 46 of 89

Labor Time Assessment

Payment

Enter the payment day type used to allocate the absence time. If specifications are defined for the

selected  payment  day  type  in  the  Control  of  absences,  the  system  automatically  enters  these

specifications  in  the  absence  planning  when  you  enter  this  payment  day  type.  If  the  Modification

enabled  option  is  not  checked  in  the  Control  of  absences,  the  relevant  fields  are  blocked  in  the

graphical user interface. Therefore, you cannot change these entries.

Comment

Comment on the absence that can be entered by the employee when requesting the absence. The

Attendance  overview  shows  this  comment  for  the  relevant  period.  The    Personnel  Scheduling

shows this comment in the tooltip of the relevant days.

Internal comment

The  internal  comment  is  only  visible  when  you  plan  and  edit  absences  in  the    Personnel

Scheduling.

Number of calendar days

The field Number of calendar days shows the absence time in calendar days for absences with a

subsequent  payment  (defined  in  the  Control  of  absences  application,  tab  Settings,  section

Continued pay).

Duration

Planned target time

If  you  select  this  field,  the  system  generates  an  absence  with  the  duration  of  the  planned  target

time.

Planned normal time

If  you  select  this  field,  the  system  generates  an  absence  with  the  duration  of  the  planned  normal

time. For employees with flextime or flexible shifts, this time can deviate from the target time.

Average working time

If you select this option, the system offsets the absence against the average working time specified

in the HR master data.

Absence

If you select this field, the system uses the duration entered below for the absence time.

Time from, time until

Time of the planned absence. The Workplace assignment integrates the period entered here if it is

at the beginning or end of the shift. If only one of the two fields is completed, the planned absence

starts  or  ends  automatically  at  the  beginning  or  end  of  the  shift.  The    Labor  time  calculation  also

integrates this period, if it is not a partial absence (see the field "partly absent") or a half day off.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 47 of 89

Labor Time Assessment

Authorization required

Use  this  option  to  specify  whether  the  absence  and  the  respective  wage  type  postings  must  be

approved.

Partly absent, Fill up target time to

Enter percentage values in this field. Values between 1 and 100 result in an absence record. The

absence

record

is  created

in  any  case,  even

if

the  employee  was  present.

Use this field, for example, if an employee gets ill during working hours and goes home earlier. The

application calculates the following if  you enter "100"  in this field and  you select  the "Target time"

option for the Duration field: The attendance time is allocated as specified in the payment day type.

The application uses absence time (e.g. illness) to fill up the time that is missing to reach the target

time (100% of target time).

Field descriptions in the Settings tab

Validity

Use  these  options  to  specify  if  the  absence  planning  is  valid  for  all  weekdays  or  for  separate

weekdays  only.  Use  this  option,  for  example,  for  trainees  who  are  always  absent  on  the  same

weekday(s) (vocational school).

Previous illness

The fields Period of continued pay, Duration and Start date are displayed in this section if you plan

absences where the monitoring of continued pay is activated in the Control of absences.

Absence request

Shows the date and time of the absence request.

Monitoring of continued pay - previous illness

The  fields  Period  of  continued  pay,  Duration  and  Start  date  are  displayed  in  this  section  if  you  plan

absences where the monitoring of continued pay is activated in the Control of absences:

PZW-BPZ_83.docx

Version: 1.0.23503

Page 48 of 89

If you use the selection list of the Duration field, a dialog opens where you can select the previous illness:

Labor Time Assessment

Once you have selected the illness, the system automatically enters the duration and the start date in the

relevant fields. Or you can manually enter the duration and the start date.

Toolbar

 Approve application

Function authorization: pabp.sign

Click this button to approve a requested absence. Further processing is the same as approving a

request in the Escalation Management module.

 Reject application

Function authorization: pabp.reject

Click  this  button  to  reject  a  requested  absence.  Further  processing  is  the  same  as  rejecting  a

request in the Escalation Management module.

 Personnel Scheduling

Click this button to call the  Personnel Scheduling.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 49 of 89

Labor Time Assessment

 Labor Time Maintenance

Click this button to call the Labor Time Maintenance.

 Reset labor time calculation

Click this button to call the function Reset labor time calculation

PZW-BPZ_83.docx

Version: 1.0.23503

Page 50 of 89

Labor Time Assessment

13  Control of Absences

Overview

HYDRA menu

Master data  Labor time  Control of absences

FEDRA menu

Advanced resource planning  Master data  Control of absences

Transaction code

abse

Function authorization

abse

You  use  the  Control  of  absences  application  to  configure  and  control  the  planned  absences  of

employees.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 51 of 89

Labor Time Assessment

Field descriptions

Field descriptions of the Absence tab

Abbreviation: Full-day absence

The  comment  entered  here  is  used  to  fill  the  field  Abbreviation  of  the  Absence  planning.  This

comment is therefore also entered in the graphic Absence Planning. With unplanned absences that

are  allocated  to  a  specific  payment  type  using  specified  evaluation  parameters,  you  can  use  this

field to define a different abbreviation for "unplanned" absences = "UNG". The new abbreviation is

then displayed in the absence year overview.

Abbreviation: Partly absent

If  a  part-time  absence  is  available  for  a  day,  this  comment  is  entered  instead  of  the  abbreviation

Full-day absence. You can then see in the graphic Absence planning, if the absence is a full-day or

a part-time absence.

Priority

Priority of the absence payment; possible values are 0 to 99; a higher value means higher priority. If

two  absences  are  planned  for  an  employee  on  the  same  day,  the  absence  with  higher  priority  is

used.

Percentage

Percentage used to multiply the planned time (e.g. 80% continued pay in case of sick leave or 50%

for half a leave day).

Category

Allocation of the absence to a particular group of absences. The different absence categories are

displayed in the work day statistics.

Color

Color  used  to display the  absence  in  the graphic absence planning,  in the  year overview and  the

personnel scheduling.

Context menu

If  you  make  an  entry  in  this  field,  the  absence  is  displayed  in  the  context  menu  of  the  graphic

absence planning and the personnel scheduling. You can then assign this absence without calling

the editing dialog. The absences in the context menu are sorted by the value specified here. The

system also checks if the user is authorized for the responsibility area of the absence payment. The

context menu only shows entries the user is authorized for. You can enter values between 1 and 9.

If you use a value multiple times, the number of the payment day type is used for sorting within the

value.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 52 of 89

Labor Time Assessment

Duration

  Target time

The absence time is calculated using the target time planned for this day in the  Working time day

types.

  Normal time

The absence time is calculated using the normal time planned for this day in the Working time day

types.

  Average working time

The absence time is calculated using the average working time entered in the HR master data.

  Absence

The absence time is generated using the specified time.

Set target time as absence time

If this option is activated, the target time is used to specify the absence time planned for the day.

This  is  useful  if  the  normal  time  or  the  average  working  time  defined  in  the  HR  master  data  are

used  to  calculate  the  absence  time.  If  you  use  the  target  time  as  absence  time,  you  avoid  that

overtime or undertime is generated for the respective day.

Minimum duration

Only  after  the  minimum  time  specified  in  this  field,  an  absence  time  is  generated.  Example: With

short time, you use this setting to generate an absence only after the specified minimum time.

Maximum duration

If the absence time exceeds the  value entered here, it is cut to  this maximum duration.  Example:

You can use this option to limit an appointment at the doctor's to two hours.

Field descriptions of the Settings tab

Authorization required

The absence planning must be approved.

Generate complete absence despite attendance

If  this  option  is  set,  the  complete  absence  is  allocated  even  though  the  employee  was  present.

Example: This option must be set for half a leave day.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 53 of 89

Labor Time Assessment

Partly absent, Fill up target time to

Enter percentage values in this field. Values between 1 and 100 result in an absence record. The

absence record is created in any case, even if the employee  was present. The system then uses

the

entered

percentage

to

fill

up

the

target

time  with

absence

time.

The  absence  time  is  calculated  using  the  attendance  time  and  the  specified  percentage  of  target

time.

Use this field, for example, if an employee gets ill during the workday or when it comes to short-time

work.

Modification enabled

If  this  option  is  not  activated,  the  input  fields  in  the  absence  planning  dialog,  which  refer  to  the

default values defined here, are disabled. In this case,  you cannot  change the values specified in

the relevant fields.

Display as planned absence

You  use  this  field  to  define  if  the  absence  is  used  to  display  the  employee  in  the  Overview  of

periods  of  the  Personnel  scheduling  as  available  or  not  available.  The  employees  are  then

integrated in the number of available employees in the Personnel scheduling although an absence

is  stored  for  the  respective  employees.  This  can  be  useful  with  part-time  absences  because  of

school or short time. If this option is deactivated, the graphic absence planning and the personnel

scheduling display the comment of part-time absences with planned absences.

Days  with  2  absence  times  planned  and  a  total  absence  time,  which  is  equal  to  the  target  or  the

normal time, are displayed as planned absence irrespective of the setting of this option. Example:

Half a leave day and half a day public holiday.

Compensation

Allocate actual time

Default setting. The absence time is added to the actual working time.

Allocate as undertime

The  absence  time  is  not  added  to  the  actual  working  time.  Using  the  overtime  type,  the  resulting

undertime is deducted from the account and there is no actual time displayed on the time sheet.

Allocate leave day, half a leave day

If one of the two fields is activated for absences, one day or half a day is deducted from the leave

account (account number 4). For half a leave day, the option "Partly absent" must not be set.

Absence may be requested

The button specifies whether you can request the absence time using the Web interface.

Request needs to be approved

This  parameter  is  used  to  specify  whether  the  absence  time  requested  via  the  absence  workflow

has to be approved by the supervisor or whether it is automatically approved.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 54 of 89

Labor Time Assessment

Color of requested absence

This parameter is used to specify the color used to display the absence requested via the absence

workflow  in  the  personnel  scheduling.  The  different  colors  help  to  distinguish  between  the

requested and the planned/approved absences.

Continued pay

If you have entered a period of time in the field Period of continued pay, the system automatically

changes to the absence payment (specified in the field Subseq. payment) after the time specified

here. The period is counted in calendar days and does therefore not count the number of actually

planned working days and weekends. In Germany, the period of continued pay is usually 6 weeks.

You therefore enter 42 in the field Period of continued pay in Germany.

Upload to payroll accounting

These fields are only processed in a few customer-specific interfaces. You use the option Upload to

payroll accounting to specify if the absence is passed to the absence interface. In the field Absence

reason,  you  can  enter  a  number  or  name  that  is  different  to  the  one  specified  in  the  Absence

payment. You can also pass a control indicator.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 55 of 89

Labor Time Assessment

14  Year Overview

Overview

Menu

Human resources management  Reports  Year overview

Transaction code

pyov

Function authorization

pyov

The Year overview provides an overview of the absence and attendance times of individual persons.

Purpose

The  year  overview  shows  the  attendance  time  for  each  day  and  any  absence  times  that  were  booked.

The application shows a totals column for target time, actual time, attendance time and leave for months

that have already been evaluated. The table in the lower part of the window shows a total value for the

different absence times.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 56 of 89

Labor Time Assessment

Selection criteria

The application provides the following selection criteria:

Data to be displayed

You  can  select  two  pieces  of  information  to  be  displayed  per  day.  You  can  select  from  absence,

absence 2, shift plan, attendance time and shift type.

The year overview does not show the requested absences in italics. The year overview

shows requested absences like approved absences.

The  printed  year  overview  shows  monthly  totals.  To  get  proper  results,  you  must  select

calendar months, if you want to make monthly evaluations.

The  leave  account  balance  at  the  beginning  of  the  year  is  only  displayed  once  the  monthly

evaluation has been performed for January.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 57 of 89

Labor Time Assessment

15  Labor Time Calculation

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

PZW-BPZ_83.docx

Version: 1.0.23503

Page 58 of 89

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

PZW-BPZ_83.docx

Version: 1.0.23503

Page 59 of 89

Labor Time Assessment

Toolbar

Messages listing

Opens the messages listing for the selected period.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 60 of 89

Labor Time Assessment

16  Labor Time Calculation: Workflow

Overview

The  Labor  time  calculation  uses  the  clockings  of  the  employees  and  compares  them  to  the  general

working times to calculate the resulting working time. For the calculation, also the settings of the  Control

of  labor  time  calculation  are  used  (e.g.  rounding  rules,  etc.).  The  result  of  the  Labor  time  calculation  is

used to book the times that an employee worked to different wage types.

Purpose

There are two options to start the labor time calculation:

  1.  Automatically every morning for the previous day and for all employees in the system. In addition, at

specific times, evaluations are made for employees requiring evaluations.

  2.  Manually via GUI interface for any day and employee.

Labor time calculation: workflow

  1.  If there are days, between the last evaluated day and the requested day, which have not yet been

evaluated,  these  days  are  evaluated  first  and,  if  there  were  no  errors,  the  requested  day  is  then

evaluated. This check is skipped when the labor time of a person is calculated for the first time.

  2.  A  person  is  not  evaluated  if  the  field  Lock  person  in  the  HR  master  data  is  activated  or  if  the

evaluation date is not included in the period of time between date of joining and date of leaving the

company. In addition to the date of joining, the date in field First allocation is checked.

  3.  If  the  fields  Working  time  day  type  and  Payment  day  type  are  not  yet  populated  in  the  clocking

records,  the  Labor  time  calculation  uses  the  day  types  of  the  models  in  the  HR  master  data  and

enters them in the clocking records.

If a person has a working time day type with an assigned target working time, but no clocking record

is available for this person, then the system creates absence times. An absence is a clocking record

of type "Absence" instead of "Attendance".

The times for start and end of absence are identified using the assigned working time day type. The

start of the absence is the beginning of shift or the beginning of normal time with flextime. The end

PZW-BPZ_83.docx

Version: 1.0.23503

Page 61 of 89

Labor Time Assessment

of the absence is: the end of shift time; the beginning of normal time plus target time; or the absence

and  the  breaks  specified  in  the  absence  planning.  If  the  option  Allocate  average  working  time  is

enabled in the HR master, then the end of absence is identified as follows: the entire absence time

(difference between start and end of absence minus breaks) is then equal to the average  working

time specified in the HR master. With this kind of absences, also the day types are entered in the

clocking records.

With planned absences, the values of the absence planning are transferred to the comment and the

payment field. With unplanned absences, you can configure that an absence record is created in the

Control  of  labor  time  calculation.  If  the  field  Generate  unplanned  absences  is  set  to  Yes  or

Authorization  required,  an  absence  record  with  comment  "UNG"  is  created.  If  you  subsequently

enter an absence  planning,  you can replace an  unplanned  absence  with  a planned. The period of

time of the subsequently planned absence is automatically evaluated.

The  working  time  day  type  is  valid  for  the  whole  day  if  several  clockings  exist  for  a  day.  The

payment day type is only valid for the relevant clocking record. This means that on one day, different

clockings  can  be  used  for  different  payment  day  types.  Example:  For  an  employee,  the  first  two

hours of a day are booked as doctor's appointment and only then the normal payment  is used for

the working time.

  4.  The  clockings  are  rounded  according  to  the  setting  in  the  Control  of  labor  time  calculation.  These

rounded times are entered in the relevant fields of the clocking record; but only if these fields are not

already filled with times from previous evaluations or manually filled.

  5.  It  is  checked  if  the  clockings  have  errors  and  if  the  clocking  order  is  correct  (e.g.  IN-OUT,  IN-

business trip, etc.). It is also checked if the assignment of day types in the clocking records of the

separate persons are complete.

A  Messages  listing  is  created.  The  Messages  listing  includes  messages  of  the  above  validation

checks  and  messages  about  absences  of  persons,  messages  if  more  than  one  clocking  record

exists  for  a  person,  if  the  working  time  is  inferior  to  the  target  working  time,  if  persons  are  late  or

leave  too  early  and  if  persons  are  present  although  an  absence  is  planned.  The  messages  that

inform  about  errors  are  highlighted  in  red  in  the  Messages  listing.  You  can  edit  these  fields  in  the

application Labor time maintenance.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 62 of 89

Labor Time Assessment

  6.  Absences are entered in the Personnel scheduling.

  7.  When the Labor time calculation is finished, you can see at the bottom of the application Labor time

calculation the number of persons that have been evaluated and the number of errors that occurred.

You can repeat the labor time calculations as often as you like. Make sure that the data of the relevant

day  is  still  available  in  the  system.  If  no  clocking  record  exists  for  a  person  (e.g.  because  the  clocking

records have been deleted in  window  Labor time maintenance), absences are created according to the

conditions specified in issue 3.

If  an  error  occurred  in  the  Labor  time  calculation,  the  days  that  follow  are  not  evaluated.  Instead,  the

Messages listing shows an error message for these days informing that an error occurred on the relevant

day before.

If  the  Labor  time  calculation  is  performed  for  a  day  that  has  already  been  used  to  perform  the  Monthly

evaluation,  this  Monthly  evaluation  is  automatically  repeated  when  the  labor  time  calculation  has  been

performed.  This  guarantees  that  the  monthly  results  are  then  up-to-date  (monthly  wage  types,  account

balances at end of month,...).

Messages issued by the Labor time calculation

Wrong status sequence

The employee’s clockings are in the wrong sequence. Either a clocking has been forgotten or the

employee has clocked in or out twice. This problem can be fixed by correcting the clocking.

The overtime period is missing for company … on …

For the relevant company, no Periods for the overtime compensation have been created.

No valid payment day type found

For  the  evaluated  day,  no  payment  is  planned  in  the  payment  model.  Example:  On  Saturdays,

there is usually no work, but a single employee has worked anyway. You can correct this problem if

you make a manual entry of a payment day type in the clocking record, if you subsequently plan a

personal day type or if you change the relevant payment model.

No valid shift or flextime day type

For  the  evaluated  day,  no  working  time  is  planned  in  the  working  time  model.  Example:  On

Saturdays,  there  is  usually  no  work,  but  a  single  employee  has  worked  anyway.  You  can  correct

this problem if  you make a manual  entry of a  working time day type  in the clocking record, if  you

subsequently plan a personal day type or if you change the relevant working  time model.

Shift type not in shift day type

For this day, the shift type stored in the shift rhythm model is not available in the assigned shift day

type.  Reason:  In  the  shift  rhythm  model,  a  shift  type  is  assigned  that  does  not  exist  or  no  shift

rhythm model is stored in the HR master.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 63 of 89

Labor Time Assessment

Previous evaluation of ... not ok

The evaluation is not carried out for the selected day because there was an error in the evaluation

of a previous day. When this error is corrected, the evaluation is possible.

Wage type posting subject to authorization exists

On the current day, one or more bookings require authorization. When these bookings have been

authorized the message disappears.

Absence payment: ... ...

This message is displayed if absences (e.g. holiday, illness etc.) have been allocated. Behind the

message, the number and name of the allocated absence payment are displayed.

Several clocking-ins exist

More than one clocking-in exists for one day.

Target time has not been reached

The working time of the employee is inferior to the target working time.

Clock-IN too late

The first clock-in was made after the start of shift or the start of the core time.

Clock-OUT too early

The last clock-out was made before the end of shift or before the end of the core time.

Core time violation

A core time violation occurred. This message is generated in addition to the messages Clock-IN too

late and Clock-OUT too early and is also displayed if the core time violation is not at the beginning

or the end, but in the middle of the core time.

Violation of rest period

The rest period stored for the previous day in the Working time day type has been violated.

Present although absence planned

The employee was present although an absence was planned for them on the evaluation day. This

message  is  not  created  with  planned  absences  "half  a  leave  day"  or  absences  configured  with

"partly absent".

Absent although working time planned

The employee was not present although working time was planned.

Maximum working time exceeded

This  message  informs  that  the  attendance  time  of  an  employee  is  greater  than  the  maximum

working time specified in the Working time day type.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 64 of 89

Labor Time Assessment

Negative account balances

This message informs that the labor time calculation has output negative account balances for an

account.

Labor time needs to be determined

For this person, clocking records, bookings or absence plannings have been changed; the required

labor time calculation has not yet been started.

Blocked by application... while calculating labor time

When  the  last  labor  time  calculation  was  performed,  the  person  was  locked.  The  application

specifies why the lock was made.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 65 of 89

Labor Time Assessment

17  Control of Labor Time Calculation

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

PZW-BPZ_83.docx

Version: 1.0.23503

Page 66 of 89

Labor Time Assessment

When personal settings are created, only such fields that are to be overwritten have to be

entered. The other fields remain empty and are taken over from the general settings or from

personal parameters of lower priority.

If  customers  have  several  sites  or  different  companies  it  is  reasonable  to  create  personal

settings for each company. The fields of  which have to be filled out completely to prevent the

changes made to the general settings of one site/company from affecting all sites or companies.

A  user  is  only  allowed  to  edit  the  parameters  for  a  group  of  people  (e.g.  a  cost  center)  if  the

user is at least authorized for the assigned responsibility area of one person in this group.

Field description of the “validity” tab

Type

Defines whether or not it is about general or personal settings.

Company

Restricts the  validity  of personal  evaluation parameters to a particular company.  If this field is  left

empty, the personal evaluation parameters apply for all companies.

Personnel selection, value

Defines whether the personal evaluation parameters are to be configured for an employee or for a

group  of  employees.  The  available  employee  groups  include  area,  cost  center,  department,

employee subgroup, activity and employment relationship.

Valid from, until

Restricts  the  validity  of  the  personal  evaluation  parameters  to  a  particular  period.  If  only  one  of

these two fields is filled out, the entry is either valid from or until that date.

Priority

If personal evaluation parameters are defined for different employee groups and more than one of

these configurations apply to a single employee, the priority determines which entry takes priority.

Comment

A comment may be entered in this field.

Field description for the "settings" tab

Generate unplanned absences

Determines whether or not, when unplanned absences occur, a clocking record should be created

automatically that fills up the planned working time.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 67 of 89

Authorization required:

An  absence  time  record  is  created  automatically  and  the  associated  wage  type  postings

Labor Time Assessment

require authorization.

Yes:

An absence record is created automatically.

No:

An absence record is not created automatically.

As attendance time:

Unplanned  absences  are  generated  as  attendance  time. This method  is mainly  applicable  to

employees  who  do  not  clock  to  post  their  target  time  as  attendance  time  for  Labor  time

statistics.

Absence payment

This  field  is  used  to  define  a  payment  day  type  which  controls  the  allocation  of  unplanned

absences.  If  unplanned  absences  are  to  be  deducted  from  an  account,  it  should  be  ensured  that

the  previous  option  “Generate  unplanned  absence”  is  set  to  "yes"  (J),  as  times  requiring

authorization cannot be set off against other accounts.

Automatic shift identification

Yes: If a shift worker works another shift than the one planned, the system searches automatically

for the correct shift type from the shift day type. This is done by comparing the start times of

the shifts with the employee’s clock-in and selecting the shift where the time difference is the

smallest. If the "search shift type" option is activated by entering "yes", every shift worker must

still  be  assigned  a  shift  rhythm  model,  so  that  an  absence  record  can  be  created  if  the

employee is absent.

No:  The shift type specified in the shift rhythm model is always allocated. The normal time is used

as shift start time for flexible shift models.

Only with the same target time:

The  shift  type  is  determined  automatically  as  if  "yes"  was  selected.  But  only  shifts  are

considered having the same target time as the planned shift.

Limit between shifts

The  percentage  value  entered  in  this  field  divides  the  time  between  the  previous  and  the

subsequent  shift  starts.  This  field  is  only  applicable  if  the  "search  shift  type"  option  has  been

activated by "yes". Example: If the early shift starts at 6.00 am and the late shift starts at 2.00 pm,

then there is a period of 8 hours between the shifts. With a gradation of 75 %, a clock-in during the

first  6  hours  (up  to  12.00  noon)  belongs  to  the  early  shift  and  a  clock-in  during  the  remaining  2

hours (after 12.00 noon) belongs to the late shift.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 68 of 89

Labor Time Assessment

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

field only needs to be changed if night shifts are supposed to belong to the following day. Default

value: 11.00 pm

Hours after end of skeleton time

This  period  specifies  how  long  after  the  planned  end  time,  clocking-ins  are  still  assigned  to  the

current evaluation day. For flextime employees this time refers to the skeleton time end and for shift

employees it refers to the shift end. Default value: 4.00 hours

Field description of the “rounding” tab

Rounding type

With the rounding  type  ‘exact to the second’, clocked times are processed exactly  to the second.

With rounding type ‘exact to the minute’, the seconds included in clocking times are always rounded

down to avoid rounding errors in the minute range which could be caused by the seconds. Default

value: "exact to the minute"

Flextime day type

Interval

The  rounding  interval  determines  the  times  to  which  it  is  possible  to  round  up  or  down.  With  an

interval of e.g. 10 minutes and a working time start at 8.00 am (according to the working time day

type) , it is possible to round to 7.40 am, 7.50 am, 8.00 am 8.10 am, etc.

The following reference point applies for rounding: start of normal time

Waiting period, clocking-in

The  waiting  period  for  the  clocking-in  specifies  from  what  time  on  a  clocking-in,  within  the  period

given by the rounding interval, should be rounded up. Staying with the previous example, a waiting

period of 3 minutes would mean that the time is rounded down between 7:40 and 7:43 (to 7:40 am)

and that from 7:43 to 7:50 the time is rounded up (to 7:50 am). The rounding procedure is the same

in the other time intervals.

The value “0” is to be entered if a clocking-in is always to be rounded to the end of the period.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 69 of 89

Labor Time Assessment

Waiting period, clocking-out

The waiting periods for clocking-outs can be defined separately and have the reverse effect, i.e., a

waiting period of 3 minutes, in the above example, would mean that the time is rounded down in the

first 7 minutes of the 10 minutes interval and then rounded up in the remaining 3 minutes. Example:

a limit of three minutes would mean that the time is rounded down to 4.00 pm between 4.00 pm to

4.07 pm and rounded up to 4.10 pm between 4.07 to 4.10 pm.

The value “0” is to be entered if it is to be rounded to the beginning of the period for clocking-outs.

Shift day type

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

PZW-BPZ_83.docx

Version: 1.0.23503

Page 70 of 89

Labor Time Assessment

Actual working time

Rounds the calculated actual working time. In this case, the employee’s last clocking-out is rounded

in order for the actual working time to meet the rounding criteria.

Overtime

Defines special rounding rules for any overtime worked.

Active

The "active" field determines for which groups of employees these rules are to be applied:

Shift day type:

The rounding rule applies for shift workers and flexible shift workers.

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

Field description of the "blocking/waiting period" tab

Reference

This  field  determines  whether,  for  flextime  employees,  the  following  waiting  period  rules  and

blocking rules refer to the "normal working time" (‘N’), the "core working time" (‘K’) or the "skeleton

time"  (‘R’).  It  is  possible  to  choose  between  planned  working  time  (‘S’)  and  normal  time  (‘N’)  for

waiting periods and blocking which occur during target time.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 71 of 89

Labor Time Assessment

Start time - waiting time, blocking

The waiting period is  allocated in favor  of the  employee  if they arrive too late. The  waiting period

specifies  the  time  an  employee  is  allowed  to  arrive  late,  so  that  it  is  still  possible  to  round  to  the

start  of  the  working  time  according  to  the  working  time  frame.  The  "blocking"  option  defines  the

duration  prior  to  the  beginning  of  the  working  time  that  is  not  allocated  if  the  employee  clocks  in

during  this  period.  It  is  always  rounded  to  the  beginning  of  the  working  time  within  this  blocking

period.

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

PZW-BPZ_83.docx

Version: 1.0.23503

Page 72 of 89

Labor Time Assessment

PZW-BPZ_83.docx

Version: 1.0.23503

Page 73 of 89

Labor Time Assessment

18  1

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

PZW-BPZ_83.docx

Version: 1.0.23503

Page 74 of 89

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

PZW-BPZ_83.docx

Version: 1.0.23503

Page 75 of 89

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

PZW-BPZ_83.docx

Version: 1.0.23503

Page 76 of 89

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

PZW-BPZ_83.docx

Version: 1.0.23503

Page 77 of 89

Note

Note that refers to the number of people that were edited whose clockings were modified or whose

absences, advance/ subsequent clockings or wage type postings were deleted.

Labor Time Assessment

Toolbar

 Labor time calculation

Calls the Labor time calculation.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 78 of 89

Labor Time Assessment

19  Settlement Periods

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

PZW-BPZ_83.docx

Version: 1.0.23503

Page 79 of 89

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

PZW-BPZ_83.docx

Version: 1.0.23503

Page 80 of 89

Labor Time Assessment

20  Monthly Evaluation

Overview

Menu

Human resources management  Month-end closing  Monthly evaluation

Transaction code

ptme

Function authorization

ptme

In  the  Monthly  evaluation,  the  wage  type  postings  of  the  specified  settlement  period  are  combined  for

calculation and account limits are applied.

Purpose

Also for the current settlement period, you can start the Monthly evaluation. The results that are available

up to now are then combined to perform the labor time calculation. With current settlement periods, you

cannot limit accounts. This is only possible with settlement periods that are finished.

The  result  of  the  monthly  evaluation  displayed  on  the  MOC  informs  about  the  number  of  persons  that

were calculated and the number of persons where errors occurred. Also the number of persons with wage

types that require authorization is displayed. Possible reason for persons that are locked: the HR master

data or the account balances are edited on another client.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 81 of 89

Labor Time Assessment

The monthly evaluation for a person is only performed if the labor time calculation of at least one day of

the settlement period has been run without errors for the person.

If the labor time calculation is performed for a day of a past settlement period, the monthly evaluation for

the  settlement  period  is  equally  performed  if  a  monthly  result  exists  for  this  settlement  period.  Other

settlement periods that are between this past and the current settlement period are also re-calculated if a

monthly result exists for these settlement periods.

This  way,  it  is  guaranteed  that,  using  the  current  results,  the  account  limits  are  corrected  and  that  the

account balances at the beginning and end of the month are correctly displayed.

A separate document describes the Processing of the Monthly evaluation.

The monthly evaluation can be repeated as often as you like. But you must make sure that the

data of the relevant settlement period is still available in the system.

Selection criteria

The application provides the following selection criteria:

Calculate only if required

If the option Calculate only if required is enabled, only those persons are calculated that require a

new monthly evaluation. A new monthly evaluation can be required if you have corrected values in

past months. If the option is disabled, the monthly evaluation is run for all persons selected.

Field descriptions

Quantity

Number of affected persons

Description

The text added in this field refers to the number of persons evaluated, with errors, locked or that do

not require an evaluation.

Toolbar

 Account limits

Calls the Account limits

 Messages listing

Calls the Messages listing of the month

PZW-BPZ_83.docx

Version: 1.0.23503

Page 82 of 89

Labor Time Assessment

 Interface to payroll accounting

Calls the  Interface to payroll accounting.

 Time sheet

Shows the time sheet.

 Monthly results

Calls the Monthly results list.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 83 of 89

Labor Time Assessment

21  Account Limits

Overview

Menu

Human resources management  Month-end closing  Account limits

Transaction code

pali

Function authorization

pali

The specification of  Account limits provides the option to define maximum and minimum limit values for

PZE  accounts.  You  can  define  Account  limits  for  single  persons  and  groups  of  persons.  The  account

limits are processed during the monthly evaluation of accounts.

You  can  not  only  specify  account  limits  with  processing  Account  limit,  but  you  can  also  specify  fixed

amounts that are offset against the different accounts to disburse a specific number of hours or to book

leave entitlements to an account, for example.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 84 of 89

Labor Time Assessment

Purpose

If you create, change or delete an account limit that is valid for a year, a specified time or a specific day

(valid from/until), the monthly evaluation of the relevant person becomes mandatory. The changes made

are processed at the latest with the next cyclic evaluation.

Checking the responsibility area authorization

The system checks if the person modifying the  data record has the relevant responsibility area

authorization in the period of time selected. This check is positive if at least one of the persons

selected belongs to the responsibility area the person is authorized for.

To identify the period of time selected, the following rule applies:

- If a value is entered in field Year: the calendar year

- If a value is entered in the fields Valid from and Valid until: the time specified

- If a value is only entered in Valid until: from an unlimited time to Valid until

- If a value is only entered in Valid from: from Valid from until an unlimited time

- Otherwise: current day

Selection criteria

The application provides the following selection criteria:

Person from, to, Company, Area, Cost center

The  account  limits  are  displayed  for  the  persons  selected.  If  only  one  person  is  selected,  the

application displays all account limits that are valid for this person. It does not matter if the account

limits have been specified for this person only or for a group of persons.

Account

You can restrict the display to the selected account.

Date from, to

The account limits are displayed that are valid in the period of time selected. If the end of a monthly

period is entered, only the account limits are displayed that are valid in this settlement month.

The  account  limits  specified  for  a  year  or  a  period  of  time  are  only  displayed  correctly  if  the

relevant settlement periods have already been created.

Field descriptions

Company

Use this field to restrict the validity of an account limit to the company specified.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 85 of 89

Labor Time Assessment

Selection of a person or a group of persons

Use the next two fields to restrict the account limit to a specified person or a group of persons. The

following  HR  master  data  fields  are  available  to  select  a  group  of  persons:  Area,  Cost  center,

Department, Employee subgroup, Activity, Employment relationship and Person does not clock.

Account

The account limit is valid for the account specified.

Processing

Use this field to specify if an account limit is set or if a fixed amount is offset against the account or

if an account balance is set. You can use the option Fixed amount to book leave entitlements to the

leave account or to disburse a specified period of time of an account.

If  you  want  to  deduct  a  fixed  amount  from  an  account,  you  must  enter  a  negative

value (e.g. "-20:00"). Positive values are added to the account.

If you define an account limit for an account with the processing Fixed amount and an

additional  account  limit  with  the  processing  Account  limit  within  the  same  sorting,  the

Fixed amount is booked first and then the account limit with processing Account limit.

Upper limit, Wage type

Specify the upper limit value for the account. When the account balance exceeds this limit value by

the  end  of  the  month,  the  difference  is  booked  to  the  wage  type  specified.  The  limit  is  only

processed, if the upper limit is set to Active.

Lower limit, Wage type

Specify the lower limit value for the account. If the account balance is below this limit value by the

end of the month, the difference is booked to the wage type specified. The limit is only processed, if

the lower limit is set to Active.

Note:  If  an  account  is  limited  using  a  negative  limit  value,  the  time  is  booked  with  a

positive sign to the wage type specified. The payroll accounting must then interpret this

wage type as deduction from the pay.

Validity

Year, Settlement period

Possible restriction of the account limit to a specific year and/or a specific settlement period. If an

account limit is valid for a Settlement period and/or a Year, the existing account limits without Year

and  Settlement  period  are  not  processed.  This  way,  you  can  specify  deviating  account  limits  for

single months or years.

Valid from, until

PZW-BPZ_83.docx

Version: 1.0.23503

Page 86 of 89

Validity period of the account limit. In the monthly evaluation, only the account limits are processed

that  are  valid  on  the  last  day  of  the  month.  If  you  want  to  process  several  account  limits  in  one

sorting, the validity period of all account limits must be identical.

Labor Time Assessment

Processing

Priority

If account limits are stored for different groups of persons, you can use the Priority to control which

account limit takes priority if a person is assigned to these groups of persons (the higher the value

entered, the higher the priority).

Sorting

If you want to process several account limits for an account one after the other, you can specify the

sorting in this field. Within a Sorting, the account limits are only processed for the group of persons

with the highest Priority. You can specify the processing order of the accounts of one Sorting in the

Configuration of Accounts using the field Sorting Account limits.

If  two  or  more  account  limits  exist  with  identical  entries  in  the  fields  Company,  Personnel

selection,  Value,  Year,  Settlement  period,  Valid  from,  until,  Priority  and  Limit  value,  then  the

limited  time  is  booked  to  all  wage  types  that  are  specified  in  these  account  limits.  It  is  then

possible to book the time, which is disbursed, to 2 different wage types (a basic wage type and

a bonus wage type).

If  several  account  limits  exist  for  one  person,  you  can  specify  the  order  used  to  apply  the

account limits via Sorting. The account limit with Sorting "1" is processed first, the account limit

with Sorting "999" is processed last.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 87 of 89

22  Implementation PZW

This  list  contains  all  steps,  which  must  be  carried  out  in  order  to  start  the  module  Personnel  Time

Labor Time Assessment

Management:

1.Definition of holidays

2.Creation of the working time day types

3. Creating working times and shift rhythm models

4. Input of wage types

5. Creation of remuneration day types, absence remunerations and overtime types

6. Creating payment models

7. Maintenance of absence remuneration for the holidays

8. Setting control of labor time calculation

9. Definition of user names and passwords

10.Assignment of function authorizations and responsibility areas

11.Creation of employees

12.Assignment of clocking authorization

13.Creating periods overtime calculation (per company if deviating from daily)

14.Creating settlement periods (per company)

15.Prepare the employee identification (staff badges)

16.Configuration of the PZE terminal and introduction of employees to the terminal

17.Transfer account balances from the old system (see section)

PZW-BPZ_83.docx

Version: 1.0.23503

Page 88 of 89

Labor Time Assessment

Transfer account balances from the old system

Can  holiday  and  time  accounts  from  a  previous  system  be  integrated  into  HYDRA  if  HYDRA  PZW  is

introduced into a company? Usually,  at the time of the transfer from one system to the other, the exact

values  of  the  accounts  are  not  yet  known.  For  example,  applications  for  leave  and  sick  notes  are  still

missing or incorrect clockings are in the system.

Example:

Up to now, working time has been recorded in your company using a conventional time clock. The

clocking cards were evaluated manually; a  leave  account and a flextime account were kept using

file cards. HYDRA PZE has been successfully used for one month. A trial run was carried out using

a  few  "sample"  employees  (tip:  do  no  use  real  personnel  numbers  in  the  trial  run,  as  it  is  more

convenient if employees start without a previous history in HYDRA). From the 1st August, time and

attendance should be carried out in HYDRA exclusively.

Procedure:

1.  Enter personnel into HR master data before the 1st of August. Set the entry date to the date

when the person had entered the company. Enter the date in the field "First allocation" in the

tab  "Personnel  time"  to  the  1st  of  August  in  order  to  avoid  premature  allocation.    Assign

working time and payment models to the staff. Enter holiday entitlements for the whole  year.

The entry has not effect on the current holiday account.  Leave all accounts of the staff on 0.

2.  During August, calculate the account balances for the end of July from the leave and flextime

accounts of the old time and attendance system.

3.

Then during  August, enter  the account balances from the old time and attendance system in

the  current  account  balances  in  HYDRA  (Account  balance  dialog).  The  account  balances,

which have already been accumulated in HYDRA, must be merged with the balances from the

old system. Example: After the transfer, 17.0 days of leave from the old system and a HYDRA

leave  account  balance  of  -2.0  days,  give  a  new  account  balance  of  15.0  days.  After  the

transfer,  a  flexitime  account  balance  of  10.45  hours  from  the  old  system  and  a  HYDRA

flexitime account balance of 0:47 hours result in a flextime account balance of 11:32 hours.

It is important that this transfer take place during the first month, so that the month evaluation

can book the changes in the first month.

PZW-BPZ_83.docx

Version: 1.0.23503

Page 89 of 89

