Manual

Management Functions for
Workforce Requirements
Planning
PEP-VWF 8.1

Version 1.0.4788

Last changed on: 19.06.2020

  Management Functions for Workforce Requirements Planning

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

PEP-VWF_81.docx

Version: 1.0.18468

Page 2 of 69

  Management Functions for Workforce Requirements Planning

Contents

1  Personnel Scheduling Administration Functions - Overview ....................... 4

2  Qualifications ................................................................................................ 5

3  Staff Qualifications ....................................................................................... 8

4  Staff Qualifications ..................................................................................... 12

5  Working Time Day Types ........................................................................... 16

6  Working Time Models ................................................................................ 21

7  Shift Rhythm Models .................................................................................. 27

8  Personal Models ........................................................................................ 33

9  Personal Day Types ................................................................................... 36

10  Personal Working Time .............................................................................. 39

11  Payment Day Types ................................................................................... 41

12  Public Holidays ........................................................................................... 43

13  Absence Control ......................................................................................... 45

14  Absence Planning ...................................................................................... 50

15  Personnel Scheduling ................................................................................ 55

16  Labor Time Schedule ................................................................................. 63

17  Workforce Requirements of Workplaces.................................................... 66

18  Personnel Schedule on the Terminal ......................................................... 68

PEP-VWF_81.docx

Version: 1.0.18468

Page 3 of 69

  Management Functions for Workforce Requirements Planning

1  Personnel Scheduling Administration Functions - Overview

Purpose

This  function  package  contains  functions  to  define  qualifications  and  to  assign  employees  and

workplaces.

Implementation Considerations

Use this function package to:

  use HYDRA personnel scheduling (PEP) to evaluate the personnel requirement or schedule the

employees at workplaces.

Integration

The  configurations  in  this  function  package  form  the  basis  for  further  personnel  scheduling  function

packages.

Features

  Qualifications

o  Qualifications master data to define the necessary qualifications

  Assignment of qualifications to a person

o  Assignment of qualifications to employees

  Workforce requirements of workplaces

o  Recording personnel requirement per workplace or machine

PEP-VWF_81.docx

Version: 1.0.18468

Page 4 of 69

  Management Functions for Workforce Requirements Planning

2  Qualifications

Summary

Menu

Master data  Staff  Qualifications

Transaction code

qual

Function authorization

qual

The definition of the individual qualifications is made using the related settings in the  master data for the

qualifications:

Field descriptions

Qualification

Unique  number  of  the  qualification.  This  number  can  be  freely  selected  when  creating  a

qualification.

Designation

Designation of the qualification.

PEP-VWF_81.docx

Version: 1.0.18468

Page 5 of 69

  Management Functions for Workforce Requirements Planning

Category

Category  which  this  qualification  belongs  to.  The  category  controls  the  authorizations  for  viewing

and editing qualifications within the application staff qualifications.

Color

Color with which the qualification is to be displayed in personnel assignment. This field can only be

accessed if the additional function Advanced selection and visualization is present.

The  field  color  is  only  available  if  the  license  enhanced  selection  and  visualization

(PEP-ESV) is enabled.

Relevant to workforce requirements planning

This field specifies  whether or not the qualification  is  to be  displayed and  processed in  workforce

requirements planning.

Assign automatically

This option determines if the qualification is considered in the automatic planning.

Order

The order in which several qualifications for a workplace are displayed in the workplace assignment

can be set.

Responsibility area

Responsibility area of the qualification.

Validity period

Indicates  how  long  the  qualification  will  be  valid  (in  days).  If  a  value  is  entered  in  this  field,  the

validity  period  will  be  assigned  automatically  starting  from  the  current  day  until  the  end  of  the

specified validity period, when an assignment is created for this qualification.

Max. validity period

Maximum  validity  of  the  qualification  in  days  that  is  checked,  when  an  assignment  is  created  or

edited. If the validity start date is not indicated it will automatically be set to “Today”. If the validity

end  date  is  not  entered,  it  will  automatically  be  set  to  the  validity  start  date  +  maximum  validity

period. If both fields are assigned values and the maximum validity period is exceeded, editing of a

qualification will be cancelled by issuing the error message “maximum validity period exceeded”.

The  fields  ”category”,  “relevant  to  workforce  requirements  planning”,  “validity  period  and  max.

validity period” are only available if the license  enhanced personnel information (SIS-EPI) is

enabled.

PEP-VWF_81.docx

Version: 1.0.18468

Page 6 of 69

  Management Functions for Workforce Requirements Planning

PEP-VWF_81.docx

Version: 1.0.18468

Page 7 of 69

  Management Functions for Workforce Requirements Planning

3  Staff Qualifications

Summary

Menu

Master data  Staff  Staff qualifications

Transaction code

pequal

Function authorization

pequal

The qualifications of the employees are stored in the staff qualifications dialog.

Employees  who  have  not  been  assigned  qualifications  cannot  be  planned  automatically  in

workplace assignment.

PEP-VWF_81.docx

Version: 1.0.18468

Page 8 of 69

  Management Functions for Workforce Requirements Planning

Selection criteria

The following selection criteria are available in the application:

Qualification

Selection of the assignments to be displayed based on a specific qualification.

Category

This field allows restricting the categories assigned to the qualifications.

Validity ends … by

Validity end date of a discontinued qualification. If data is restricted using this field, all assignments

will be shown with a validity end date coinciding with the entered period.

Advanced training planned

Date  on  which  an  advanced  training  is  planned.  This  option  allows  determining  all  employees  for

whom an advanced training for a specific qualification is planned at a specified date. The result is a

“list of participants”.

The selection criteria “category”, “validity ends … by” and “advanced training planned” are only

available,  provided  that  the  license  enhanced  personnel  information  (SIS-EPI)  has  been

enabled.

Field descriptions

Person

Personnel number of the person.

Qualification

Number of the qualification.

Ranking order

Ranking  order/order  of  priority  of  the  qualification.  For  the  automatic  planning  in  the  workforce

assignment, assigned qualifications with high ranking order are planned first. The ranking order can

be defined in range from 99 to 0.

Valid from/ to

Validity period for the assignment of the qualification.

No date specification

=> Unlimited validity

Valid from – to

=> Limitation to date range

Valid from

Valid to

=> Workforce requirement is valid starting on the specified date

=> Workforce requirement is valid until the specified date

PEP-VWF_81.docx

Version: 1.0.18468

Page 9 of 69

  Management Functions for Workforce Requirements Planning

Advanced training planned

Date on which an advanced training is planned for this qualification

Start time

Start time of advanced training

Advanced training done

This field documents whether or not the advanced training has been carried out.

Evaluation

The qualification can be assessed in this field. The field is only available if the user has the function

authorization pequal or pequal.rating.

If you do not want to have this field displayed for specific users, you need to delete the function

authorization  pequal

for  these  users  and  assign  the  required  function  authorizations

pequal.create, pequal.edit, pequal.delete and pequal.copy instead.

Comment 1-3

Up to three comments may be kept for each assignment.

The fields “evaluation”, “advanced training planned”, “start time”, “advanced training done” and

“comment 1-3” are only available, provided that the license enhanced personnel information

(SIS-EPI) has been enabled.

Toolbar

 Add file

Opens  a  dialog  to  select  a  file.  Once  selected,  the  file  is  stored  with  a  unique  name  within  the

HYDRA path ”MOCHRIMG“ on the server. The “file” field shows the file name.

 Show file

Shows  the  files  that  might  be  assigned.  Subject  to  the  file  extension,  the  file  is  opened  by  the

application connected in the operating system.

 Delete file

Deletes  the  assigned  file.  Once  this  function  has  been  used,  the  file  will  no  longer  exist  on  the

server.

The buttons “add file”, “show file” and “delete file” are only available, provided that the license

enhanced personnel information (SIS-EPI) has been enabled.

PEP-VWF_81.docx

Version: 1.0.18468

Page 10 of 69

  Management Functions for Workforce Requirements Planning

PEP-VWF_81.docx

Version: 1.0.18468

Page 11 of 69

  Management Functions for Workforce Requirements Planning

4  Staff Qualifications

Summary

Menu

Master data  Staff  Staff qualifications

Transaction code

pequal

Function authorization

pequal

The qualifications of the employees are stored in the staff qualifications dialog.

Employees  who  have  not  been  assigned  qualifications  cannot  be  planned  automatically  in

workplace assignment.

PEP-VWF_81.docx

Version: 1.0.18468

Page 12 of 69

  Management Functions for Workforce Requirements Planning

Selection criteria

The following selection criteria are available in the application:

Qualification

Selection of the assignments to be displayed based on a specific qualification.

Category

This field allows restricting the categories assigned to the qualifications.

Validity ends … by

Validity end date of a discontinued qualification. If data is restricted using this field, all assignments

will be shown with a validity end date coinciding with the entered period.

Advanced training planned

Date  on  which  an  advanced  training  is  planned.  This  option  allows  determining  all  employees  for

whom an advanced training for a specific qualification is planned at a specified date. The result is a

“list of participants”.

The selection criteria “category”, “validity ends … by” and “advanced training planned” are only

available,  provided  that  the  license  enhanced  personnel  information  (SIS-EPI)  has  been

enabled.

Field descriptions

Person

Personnel number of the person.

Qualification

Number of the qualification.

Ranking order

Ranking  order/order  of  priority  of  the  qualification.  For  the  automatic  planning  in  the  workforce

assignment, assigned qualifications with high ranking order are planned first. The ranking order can

be defined in range from 99 to 0.

Valid from/ to

Validity period for the assignment of the qualification.

No date specification

=> Unlimited validity

Valid from – to

=> Limitation to date range

Valid from

Valid to

=> Workforce requirement is valid starting on the specified date

=> Workforce requirement is valid until the specified date

PEP-VWF_81.docx

Version: 1.0.18468

Page 13 of 69

  Management Functions for Workforce Requirements Planning

Advanced training planned

Date on which an advanced training is planned for this qualification

Start time

Start time of advanced training

Advanced training done

This field documents whether or not the advanced training has been carried out.

Evaluation

The qualification can be assessed in this field. The field is only available if the user has the function

authorization pequal or pequal.rating.

If you do not want to have this field displayed for specific users, you need to delete the function

authorization  pequal

for  these  users  and  assign  the  required  function  authorizations

pequal.create, pequal.edit, pequal.delete and pequal.copy instead.

Comment 1-3

Up to three comments may be kept for each assignment.

The fields “evaluation”, “advanced training planned”, “start time”, “advanced training done” and

“comment 1-3” are only available, provided that the license enhanced personnel information

(SIS-EPI) has been enabled.

Toolbar

 Add file

Opens  a  dialog  to  select  a  file.  Once  selected,  the  file  is  stored  with  a  unique  name  within  the

HYDRA path ”MOCHRIMG“ on the server. The “file” field shows the file name.

 Show file

Shows  the  files  that  might  be  assigned.  Subject  to  the  file  extension,  the  file  is  opened  by  the

application connected in the operating system.

 Delete file

Deletes  the  assigned  file.  Once  this  function  has  been  used,  the  file  will  no  longer  exist  on  the

server.

The buttons “add file”, “show file” and “delete file” are only available, provided that the license

enhanced personnel information (SIS-EPI) has been enabled.

PEP-VWF_81.docx

Version: 1.0.18468

Page 14 of 69

  Management Functions for Workforce Requirements Planning

PEP-VWF_81.docx

Version: 1.0.18468

Page 15 of 69

  Management Functions for Workforce Requirements Planning

5  Working Time Day Types

Summary

Menu

Human resource management  Models  Working time day types

Transaction code

wtdt

Function authorization  wtdt

All of the various employee working times are defined in the working time day types.

Usage

To  specify  the  working  time  for  a  shift  worker,  all  of  the  shifts  that  occur  in  a  day  are  entered  in  the

working  time  day  type.  Each  shift  of  the  day  is  represented  in  a  working  time  day  type,  each  of  which

contains an identifier referring to the corresponding shift, e.g. 'F' for early shift, 'S' for late shift, etc.

PEP-VWF_81.docx

Version: 1.0.18468

Page 16 of 69

  Management Functions for Workforce Requirements Planning

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

PEP-VWF_81.docx

Version: 1.0.18468

Page 17 of 69

  Management Functions for Workforce Requirements Planning

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

PEP-VWF_81.docx

Version: 1.0.18468

Page 18 of 69

  Management Functions for Workforce Requirements Planning

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

  1.  If no clocking is created for the break, nothing is subtracted for the break. The  duration of the paid

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

(PZW-PZP) is active.

PEP-VWF_81.docx

Version: 1.0.18468

Page 19 of 69

  Management Functions for Workforce Requirements Planning

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

after  the  start  of  the  frame  and  the  previous  time  (time  before  frame  start  or  parts  of  it)  are

compensated  as  overtime.  With  the  Working  time  start  setting,  any  possible  existing  overtime  is

always compensated at the end of the working time.

PEP-VWF_81.docx

Version: 1.0.18468

Page 20 of 69

  Management Functions for Workforce Requirements Planning

6  Working Time Models

Summary

Menu

Human resource management  Models  Working time models

Transaction code

wtmo

Function authorization  wtmo

Week models, period models and year models can be used to assign working time day types to working

time models.

PEP-VWF_81.docx

Version: 1.0.18468

Page 21 of 69

  Management Functions for Workforce Requirements Planning

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

weekday. This day type is used if the  day is defined as a public holiday with the respective public

holiday  type.  If  the  fields  in  these  tabs  are  empty,  on  public  holidays,  the  day  type  from  the

Weekdays tab is used.

PEP-VWF_81.docx

Version: 1.0.18468

Page 22 of 69

  Management Functions for Workforce Requirements Planning

Insert period model

 Insert period model

The following dialog opens for inserting a period model:

Field description

Reference date

The  reference  date  specifies  the  date  on  and  after  which  the  periods  described  in  the  table  will

cycle through repeatedly.

PEP-VWF_81.docx

Version: 1.0.18468

Page 23 of 69

  Management Functions for Workforce Requirements Planning

The "Insert" option is used to define the individual periods of the period model:

Field description

No. of days

Duration of the period in days

Day type

Specification of the day type for working time models.

Day type for public holidays, important public holidays, other days off

A different day type can be stored in these three  fields for public holidays, important holidays and

other  days  off.  If  these  fields  are  empty,  on  the  respective  public  holidays  the  entry  from  the

previously described field will be used.

PEP-VWF_81.docx

Version: 1.0.18468

Page 24 of 69

  Management Functions for Workforce Requirements Planning

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

PEP-VWF_81.docx

Version: 1.0.18468

Page 25 of 69

  Management Functions for Workforce Requirements Planning

Deletes the day types entered on the selected days in the year calendar.

PEP-VWF_81.docx

Version: 1.0.18468

Page 26 of 69

  Management Functions for Workforce Requirements Planning

7  Shift Rhythm Models

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

PEP-VWF_81.docx

Version: 1.0.18468

Page 27 of 69

  Management Functions for Workforce Requirements Planning

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

PEP-VWF_81.docx

Version: 1.0.18468

Page 28 of 69

  Management Functions for Workforce Requirements Planning

Insert period model

 Insert period model

The following dialog box pops up to insert a period model:

Field description

Reference date

The  reference  date  specifies  from  which  day  on  the  period  described  in  the  table  should  be  run

through again.

PEP-VWF_81.docx

Version: 1.0.18468

Page 29 of 69

  Management Functions for Workforce Requirements Planning

The individual periods of time of the period model are defined using the "insert" button:

Field description

Number of days

Duration of the period in days

Day type

Specifies the shift type.

Day type for public holiday, important public holiday, other day off

In  these  3  fields,  a  deviating  day  type  can  be  defined  for  holidays,  important  holidays  and  other

days off. The entry from the previously described field is used for the corresponding public holidays

if these fields remain empty.

PEP-VWF_81.docx

Version: 1.0.18468

Page 30 of 69

  Management Functions for Workforce Requirements Planning

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

PEP-VWF_81.docx

Version: 1.0.18468

Page 31 of 69

  Management Functions for Workforce Requirements Planning

Function buttons on the Weekdays tab

Assigns the selected shift type to the selected days.

Deletes the shift types that are entered for the selected days within the year calendar.

PEP-VWF_81.docx

Version: 1.0.18468

Page 32 of 69

  Management Functions for Workforce Requirements Planning

8  Personal Models

Summary

Menu

Human Resources Management --> Planning --> Personal Models

Transaction Code

pmod

Function authorization

pmod

With  “Personal  models”,  an  employee,  a  cost  center,  an  area  or  an  entire  company  can  be  allocated  a

working  time  model,  a  shift  rhythm  model  or  a  remuneration  model  or  an  overtime  type  for  a  certain

period, which overrides any corresponding models allocated in the HR master data.

With this function, short term switches between individual models are possible without having to change

allocations in the HR master data.

Utilization

The display of planned personal models is sorted in descending order by date, i.e., the current and future

plans are at the top.

The following priorities apply to the definition of personal models:

1. Employee

2. Cost center

PEP-VWF_81.docx

Version: 1.0.18468

Page 33 of 69

  Management Functions for Workforce Requirements Planning

3. Section

4. Company

That means that personnel related plans override cost center related plans. Personal models for

an area override company related plans.

Selection Criteria

The application provides the following selection criteria:

Valid from, valid to

Restricts the personal models that may be selected to those applying in this period.

Field Descriptions

Company, Employee, Cost center, Section

Selection  criteria  for  the  employee  or  employee  group,  for  which  the  personal  model  is  to  be

planned. An additional company restriction is necessary if several companies are managed in the

system and the allocation by company is not clear and unambiguous.

Valid from, to

Start and end dates for the planning of the personal model. If the end date field is left empty, a plan

without time limit will be created.

Working time model

Working  time  model,  according  to  which  the  selected  employee  or  group  of  employees  is  to  be

evaluated.

Shift rhythm model

Shift rhythm model used for the determination of the shift type.

Payment model

Payment model to which working time is to be allocated.

Overtime type

Overtime  type  which  overrides  the  period  entered  in  the  HR  master  data  sheet.  For  periods  of

overtime calculation that are longer than one day, the planning of an overtime type for one or more

days during that period always affects the whole period.

It  is  not  necessary  to  fill  in  all  fields  when  planning  personal  models.  For  empty  fields,  the

models from the HR master data will be processed.

When it comes to plans that are to be rescheduled for longer periods, we recommend making

the changes using the HR master that may be kept in different versions.

PEP-VWF_81.docx

Version: 1.0.18468

Page 34 of 69

  Management Functions for Workforce Requirements Planning

Toolbar

 Reset labor time calculation

In the reset labor time calculation dialog the results of labor time calculation have to be reset for the

selected  range  of  people  and  dates  when  it  comes  to  plans  relating  to  the  past,  in  order  for  the

changes to become effective.

PEP-VWF_81.docx

Version: 1.0.18468

Page 35 of 69

  Management Functions for Workforce Requirements Planning

9  Personal Day Types

1.1  Summary

Menu

Human Resources Management --> Planning --> Personal Day Types

Transaction Code

pdat

Function authorization

pdat

With the “Personal day types” module, an employee, a cost center, an area or an entire company can be

assigned  a  working  time  day  type  or  a  payment  day  type  for  a  certain  period,  which  overrides  the

definition in the corresponding working time model or payment model.

In this way, short term individual working time and remuneration rules can be created without having to

change the relevant models.

Utilization

The display of planned personal models is sorted in descending order by date, i.e., the current and future

plans are at the top.

PEP-VWF_81.docx

Version: 1.0.18468

Page 36 of 69

  Management Functions for Workforce Requirements Planning

The following priorities apply to the definition of personal day types:

1. Employee

2. Cost center

3. Section

4. Company

That means that personnel related plans override cost center related plans. Personal day types

for an area override company related plans.

Selection Criteria

The application provides the following selection criteria:

Valid from, valid to

Restricts the personal day types that may be selected to those applying in this period

Field Descriptions

Company, Employee, Cost center, Section

Selection  criteria  for  the  employee  or  employee  group,  for  which  the  personal  day  type  is  to  be

planned. An additional company restriction is necessary if several companies are  managed in the

system and the allocation by company is not clear and unambiguous.

Valid from, to

Start and end dates for the planning of the personal day type. If the end date field is left empty, a

plan without time limit will be created.

Working time day type

Working time day type, according to which the selected employee or group of employees is to be

evaluated.

Shift type

Shift type from the shift or flexible shift day types.

Payment day type

The payment day type to which the working time is to be allocated.

With the “Personal day type” function it is possible to plan the working time, the remuneration or

both. Information missing from the plan is completed with values from the models of the person

concerned. Accordingly, the planning of another shift type does not require the input of the shift

day type.

If one wishes to define another working time day type for a longer period, using a personal day

type, then it is usually necessary to create a plan for each week, as otherwise target time will be

PEP-VWF_81.docx

Version: 1.0.18468

Page 37 of 69

  Management Functions for Workforce Requirements Planning

defined for the weekend.

Toolbar

 Reset labor time calculation

In the "reset labor time calculation" dialog the results of labor time calculation have to be be reset

for the selected range of people and dates when it comes to plannings relating to the past, in order

for the changes to become effective.

PEP-VWF_81.docx

Version: 1.0.18468

Page 38 of 69

  Management Functions for Workforce Requirements Planning

10  Personal Working Time

Summary

Menu

Human resource management  Planning  Personal working time

Transaction code

pwot

Function authorization

pwot

The function Personal working time enables the working time of an employee to be planned individually

for  one  or  more  days.  In  contrast  to  Personal  day  types  with  which  only  the  existing  day  types  can  be

stored,  with  Personal  working  time  there  is  an  option  to  modify  the  planned  working  time  day  type  in  a

targeted  manner.  Application  examples  include  breaks  that  are  not  taken,  which  can  be  deleted  for  a

person by planning a personal working time.

PEP-VWF_81.docx

Version: 1.0.18468

Page 39 of 69

  Management Functions for Workforce Requirements Planning

Field descriptions

The field descriptions correspond with the descriptions of the working time day types

When  a  personal  working  time  is  created,  the  person's  respective  clockings  are  automatically

reset.  In  this  case,  the  rounded  times,  the  working  time  day  type  and  payment  day  type  from

these  clockings  are  deleted.  Manually  edited  and  authorized  clockings  are  not  automatically

reset so that the editor's desired modifications are not overwritten.

PEP-VWF_81.docx

Version: 1.0.18468

Page 40 of 69

  Management Functions for Workforce Requirements Planning

11  Payment Day Types

Summary

Menu

Human Resource Management  Models  Payment Day Types

Transaction code

padt

Function authorization

padt

A payment day type defines how the working time rendered by employees is allocated on the  individual

wage  types.  Each  line  represents  a  separate  payment  rule,  which  regulates  how  target  working  time,

overtime or fixed times are allocated.

Selection Criteria

The application provides the following selection criteria:

PEP-VWF_81.docx

Version: 1.0.18468

Page 41 of 69

  Management Functions for Workforce Requirements Planning

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

PEP-VWF_81.docx

Version: 1.0.18468

Page 42 of 69

  Management Functions for Workforce Requirements Planning

12  Public Holidays

Summary

Menu

Human resources management --> Models --> Public holidays

Transaction code

ptph

Function authorization

ptph

The following window opens for planning public holidays:

Usage

The  public  holidays  stored  in  the  system  are  considered  when  year  models  are  created.  Subsequent

modifications in the public holiday table do not affect year models that have already been created.

PEP-VWF_81.docx

Version: 1.0.18468

Page 43 of 69

  Management Functions for Workforce Requirements Planning

Public holidays for which absence payment is stored have the same effect as absence planning. In order

for an absence to be generated, target time must be planned for the corresponding days in the working

time models.

Field descriptions

Type

This option determines whether it is a Holiday, a Religious holiday or an Other day off. In week and

period models, different day types can be planned for the particular types.

Absence payment

Payment  day  type  which  should  be  used  to  create  an  absence.  If  this  field  is  left  empty,  then  no

absence is planned for this day.

Company

Restriction of the holiday to a particular company. This field can be used if a particular holiday is not

valid in all companies or if different absences should be created for different companies. Otherwise

it should be left empty.

Personnel selection

This  field  enables  planning  of  public  holidays  for  groups  of  persons  or  individual  persons.  This  is

mainly  required  if  employees  also  work  on  public  holidays  due  to  a  continuous  shift  model.

Consequently, a public holiday defined for the entire company can be disabled for a specific group

of persons by enabling the option "no public holiday".

PEP-VWF_81.docx

Version: 1.0.18468

Page 44 of 69

  Management Functions for Workforce Requirements Planning

13  Absence Control

Summary

Menu

Master data  Time and Labor Data Absence Control

Transaction code

abse

Function authorization

abse

The  "absence  control"  module  enables  you  to  make  default  settings  as  well  as  to  plan  the  employees‘

planned absences.

PEP-VWF_81.docx

Version: 1.0.18468

Page 45 of 69

  Management Functions for Workforce Requirements Planning

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

PEP-VWF_81.docx

Version: 1.0.18468

Page 46 of 69

  Management Functions for Workforce Requirements Planning

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

PEP-VWF_81.docx

Version: 1.0.18468

Page 47 of 69

  Management Functions for Workforce Requirements Planning

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

One leave day or half a leave day is deducted from the leave account for absences where  one of

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

PEP-VWF_81.docx

Version: 1.0.18468

Page 48 of 69

  Management Functions for Workforce Requirements Planning

Upload to payroll accounting

These  fields  are  only  processed  in  a  few  customer-specific  interfaces.  The  flag  “upload  to  payroll

accounting”  defines  whether  or  not  the  absence  time  is  transferred  to  the  absence  interface.  A

number  or  designation  that  differs  from  that  of  the  absence  payment  may  be  entered  in  the

“absence reason” field. Moreover, a “control indicator” may be transferred.

PEP-VWF_81.docx

Version: 1.0.18468

Page 49 of 69

  Management Functions for Workforce Requirements Planning

14  Absence Planning

Summary

Menu

Human Resources Management --> Planning --> Absence Planning

Transaction code

pabp

Function authorization

pabp

Using the absence  planning function absences can be planned and displayed for people and employee

groups.

Usage

Planned absences are listed in descending order and sorted by date within the list, i.e. current and future

absences are displayed on top. Absences applied for are shown in blue and italics and rejected absence

requests are displayed in red and italics.

PEP-VWF_81.docx

Version: 1.0.18468

Page 50 of 69

  Management Functions for Workforce Requirements Planning

In general, absences as well as attendance times are managed in clocking records. The “type” field within

the  clocking  records  allows  for  a  distinction  to  be  made  between  absences  and  attendance  times.  The

“absence” clocking type is used for absences.

Absence records are generated automatically for the computation of labor times if no clockings are found

for  people,  although  working  time  is  planned. When  it  comes  to  absences,  the  normal  breaks  from  the

working  time  model  are  allocated.  Absences  may  be  created  manually  and  absence  records  that  are

generated automatically may be edited.

The system  differentiates  between  planned and unplanned absences. If an  employee is absent, though

working time is planned for that day and there is no absence planning, then it is an unplanned absence.

The  generation  of  unplanned  absences

is  defined

in

the  Control  of

labor

time  calculation.

Unplanned  absences  are  automatically  deleted  when  labor  time  is  calculated,  provided  that  attendance

time exists for the corresponding day.

The below priorities apply when absences are planned:

1st priority from Control of absences

and within the same priority:

1st person, 2nd cost center, 3rd area, 4th company

This means that within the same priority personal planning overwrites planning on cost center

level. Absences for an area take priority over absences relating to companies.

Field descriptions in the “Absence” tab

Company, personnel selection

Selection  criteria  for  the  employee  or  group  of  employees  for  whom  the  absence  is  planned.  An

additional company  restriction is only  necessary if several companies are managed in the system

and the allocation by company is not clear and unambiguous.

Valid from, valid to

Start and end time of the planned absence.

Payment

The  payment  day  type  with  which  the  absence  is  to  be  allocated.  If  specifications  are  defined  for

the  selected  payment  day  type  in  the  Control  of  absences  the  specifications  are  automatically

entered  within  the  absence  planning  when  entering  the  payment  day  type.  If  the  “modification

enabled” option is not checked in the “control of absences” the corresponding fields are blocked in

the graphical user interface, which prevents the entries from being changed.

PEP-VWF_81.docx

Version: 1.0.18468

Page 51 of 69

  Management Functions for Workforce Requirements Planning

Comment

Comment on the absence that can be entered by the employee when applying for the absence and

that  is  shown  in  the  Attendance  overview  during  the  relevant  period.  In  Personnel  scheduling  the

comment is displayed within the tooltip of the relevant days.

Internal comment

The  internal  comment  is  only  visible  when  planning  absences  and  editing  absences  in  Personnel

scheduling.

Number of calendar days

The “number of calendar days” column indicates the duration of absences in calendar days, when it

comes to absences of the categories “Continued pay  – illness with continued pay”, “w/o continued

pay  –  illness  without  continued  pay”,  “accident  –  work  accident”,  “maternity  leave”,  “cure  –  health

cure”, and “unpaid illness”.

Duration

Planned target time

If this field is selected, then an absence with the duration of the planned target time is created.

Planned normal time

If  this  field  is  selected,  then  an  absence  with  the  duration  of  the  planned  normal  time  is  created.

This can deviate from the target time for people with flextime or flexible shifts.

Average working time

If this option is set, then the absence is set off against the average working time as defined in the

HR master data.

Absence time

If this field is selected the entered duration is used for the absence time.

Time from, time until

Time period for the planned absence. The period entered here is taken into account when it comes

to the Workplace assignment, provided it is at the beginning or end of the shift. If only one of the

two fields is filled out, the planned absence starts or ends automatically at the beginning or end of

the  shift.  This  period  is  also  considered  when  labor  time  is  calculated,  provided  it  is  not  a  partial

absence (see the field "partly absent") or a half day off.

Authorization required

Determines  whether

the  absence  and

its  associated  wage

type  postings  must  be

authorized/signed.

PEP-VWF_81.docx

Version: 1.0.18468

Page 52 of 69

  Management Functions for Workforce Requirements Planning

Partially absent, Fill up target time to

A percentage figure is input in this field. Values between 1 and 100 cause an absence record to be

created even when the employee was present. The attendance time is filled up with absence time

up to the specified percentage of the previously selected duration.

This field is used, for example, if an employee gets ill during the workday or when reduced hours

are worked.

Field descriptions in the “Settings” tab

Validity

These options are used to specify on which weekdays the absence planning is valid. This is used,

for example, for trainees who are always in vocational school on the same week day.

Previous illness

The fields "period of continued pay", "duration" and "start date" appear in this dialog when planning

absences for which the monitoring of continued pay is enabled in the control of absences.

Absence request

Shows the date and time of the absence request.

Monitoring of continued pay - previous illness

The  fields  "period  of  continued  pay",  "duration"  and  "start  date"  appear  in  this  dialog  when  planning

absences for which the monitoring of continued pay is enabled in the control of absences:

A  dialog  where  the  previous  illness  can  be  selected  opens  if  the  selection  list  of  the  “duration”  field  is

used:

When the illness is selected, its duration and the start date are transferred automatically to the relevant

fields. Alternatively, it is possible to enter the duration and start date manually.

PEP-VWF_81.docx

Version: 1.0.18468

Page 53 of 69

  Management Functions for Workforce Requirements Planning

Toolbar

 Approve request

Function authorization: pabp.sign

This  icon  approves  a  requested  absence.  Processing  is  identical  to  approving  requests  in  the

Escalation Management module.

 Reject request

Function authorization: pabp.reject

This  icon  rejects  a  requested  absence.  Processing  is  identical  to  rejecting  requests  in  the

Escalation Management module.

 Personnel scheduling

Calls up the Personnel Scheduling

 Labor time maintenance

Calls up the Labor time maintenance

Reset labor time calculation

Calls up the Reset labor time calculation

PEP-VWF_81.docx

Version: 1.0.18468

Page 54 of 69

  Management Functions for Workforce Requirements Planning

15  Personnel Scheduling

Summary

Menu

Human resources management  Planning  Personnel scheduling

Transaction code

ptpl

Function authorization

ptpl

Personnel scheduling can be used to gain an overview of employee shift sequences and working times.

The annual overview shows an employee's shift and absence planning for the entire year.

PEP-VWF_81.docx

Version: 1.0.18468

Page 55 of 69

  Management Functions for Workforce Requirements Planning

As an alternative to the  year overview, in the overview of periods the corresponding information can be

displayed for a group of employees.

Usage

Below the selection criteria in the year overview, the current account balance and the account balance for

the  end  of  the  year  for  the  leave  account  (account  with  the  number  4  in  the  definition  of  accounts)  are

displayed.

The  absences  are  displayed  with  the  comment  from  controlling  absences  or  absence  planning  for  the

respective day. For days with multiple planned absences, the absence reason with the greatest priority is

shown in the upper part and the absence that is of lower priority is shown below it. Absences that have

been requested via the absence workflow but not yet approved are displayed in italics.

For the staff displayed, additional columns can be activated in the grid. This includes the person's current

account balances, the account balances at the start and end of the selected period and at the end of the

year.

PEP-VWF_81.docx

Version: 1.0.18468

Page 56 of 69

  Management Functions for Workforce Requirements Planning

By right-clicking it is possible to plan an absence, a personal shift type or a personal working time for the

selected  period.  The  absences  shown  in  the  context  menu  and  their  colors  can  be  defined  in  the

controlling absences application. The shift types of the working time day types are shown as shift types in

the "personal day type" sub-menu.

In  addition,  personal  models  and  comments  can  be  planned  using  the  context  menu.  If  a  comment  is

defined  for  a  day,  it  will  be  shown  as  tooltip  in  the  calendar  when  going  with  the  mouse  over  this  day.

Days for which a tooltip is available are highlighted by a small, red triangle in the top right margin of the

relevant day.

In the overview of periods, it is possible to plan absences and personal shift types for several employees

simultaneously,  by  selecting  in  each  case  the  relevant  period  for  these  employees.  The  planning  of

absences  and/or  personal  shift  types  for  several  employees  simultaneously  is  only  possible  with  the

absences and/or the shift type shown in the context menu.

In the table in the lower area of the window is a list of the persons planned to be present and absent per

shift type. Using this display, a check can be made to determine if enough employees are present for the

shift. A distinction is made between employees that are available, not available or off work.

If the planned working time does not respect the rest period, the affected days will be highlighted in pink:

Integration

The employees can view the resulting shift plan on the PZE terminal. The configuration is described in the

documentation dealing with shift plans on terminal.

Selection criteria

The application provides the following selection criteria:

Data to be displayed

Three information items can be displayed per day. The three selection fields can be used to specify

which data are visible for the day.

Shift plan

Displays  any  possible  planned  absences  and  the  planned  shift  type  on  work  days.  For  the

days evaluated, actual data is output and for days that are not evaluated, planning is output.

PEP-VWF_81.docx

Version: 1.0.18468

Page 57 of 69

  Management Functions for Workforce Requirements Planning

Absence

Displays any possibly planned absences.

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

Worked shift type for the previous days and planned shift type for the current and future days.

When the planned shift type is determined, both personal day types and personal working time

are considered. The shift type is only output for the planned work days.

Planned shift type

Displays the planned shift type from a personal shift rhythm model or a model stored in the HR

master data. The planned shift type is only output for the planned work days.

Different shift type

This field  always  contains  the  worked  shift  type  if  it  differs  from  the  planned  shift  type  of  the

shift rhythm model defined in the HR master and/or a personal model.

Payment day type

Displays the planned payment day type.

Working time model

Shows the planned working time model

Shift rhythm model

Displays the planned shift rhythm model

PEP-VWF_81.docx

Version: 1.0.18468

Page 58 of 69

  Management Functions for Workforce Requirements Planning

Payment model

Shows the planned payment model

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

If this option is disabled, all of the absence planning is displayed in “red” and the text “N/A” for "Not

present (Nicht Anwesend)" is shown.

If no abbreviation is displayed in the graphic absence planning on the corresponding days after

absence  planning  has  been  created,  it  might  be  that  there  is  no  target  time  stored  for  these

days. The planned working time for the corresponding days can be checked in the working time

information.

For absence planning for a period in the past, in some cases the absence can only be displayed

PEP-VWF_81.docx

Version: 1.0.18468

Page 59 of 69

  Management Functions for Workforce Requirements Planning

after the labor time computation has been carried out.

If  only  the  period  of  the  absence  planning  was modified  when  changing  an  absence,  only  the

respective period is reset and recalculated in the next labor time calculation.

Field descriptions in the Overview of periods tab

Attendance rate

The attendance rate is calculated from the sum of the target time and/or normal time of employees

planned to  be present divided by the sum of the target time and/or normal time of all employees.

Only the duration of the planned attendance time is taken into account when half days are off.

The  result  is  displayed  as  a  percentage  and  rounded  (without  decimal  places)  before  totaling  the

first shift.

Available

Staff who is planned to be present, i.e. the target and/or normal time for the day is greater than 0

hours.

Not available

Staff who is planned to be absent, i.e. an absence is planned for that day.

Off work

Staff for whom no target and/or normal time has been planned, i.e. the employee is not required to

be present on this day.

On-call duty

The number of staff with on-call duty is displayed in the lower section of the overview of periods per

shift and as a grand total.

The  specification  as  to  whether  the  target  time  or  normal  time  is  compensated  for  the  above-

described  fields  depends  on  the  setting  Identification  of  available  staff  on  the  basis  of  target

time/ normal time.

Toolbar

 Labor time maintenance

Starts the labor time maintenance dialog.

 Labor time calculation

Calls up the labor time calculation

PEP-VWF_81.docx

Version: 1.0.18468

Page 60 of 69

  Management Functions for Workforce Requirements Planning

 Reset labor time calculation

Calls up the resetting of labor time calculation

 Absence planning

Calls up absence planning.

 Year overview

Calls up the year overview. This icon is only available if the "year overview" tab is enabled.

 Current account balances

Calls up the application current account balances

 Labor time schedule

Calls up the labor time schedule.

Settings for personnel scheduling

Settings

Calls up the settings for personnel scheduling

PEP-VWF_81.docx

Version: 1.0.18468

Page 61 of 69

  Management Functions for Workforce Requirements Planning

Field description

Identification of available staff on the basis of target time/ normal time

If  additional  shifts  on  the  weekend  or  on  days  off  are  to  be  planned,  it  may  be  required  that  the

available  staff  be  identified  based  on  the  normal  time  because  on  such  days  there  is  usually  no

planned  target  time.  For  flextime  and  flexible  shift  day  types,  the  duration  of  the  normal  time  is

defined  using  the  normal  start  and  end  time.  Note  here  that  the  representation  of  the  planned

absences also depends on this setting. For example, leave is also displayed on weekends although

it is  not compensated  in the day  evaluation  based on missing target  time. The display  is  updated

only after data have been refreshed.

Selection for planning

This option can be used in the planning of a shift type to specify if only those shift types contained

in the current  planning are to  be  displayed using  the  context menu or  if a selection  can  be made

from  all  of  the  shift  types  present  in  the  working  time  day  types.  The  number  of  shift  types  to  be

displayed is limited to 10.

Shift type - case sensitive

In  totaling  the  employees,  depending  on  the  setting,  the  shift  types  are  not  case  sensitive.  For

example, the number of shifts identified by "F" and "f" is displayed as a common total.

Attendance rate

Here  a  setting  regarding  whether  or  not  the  attendance  rate  is  to  be  displayed  is  saved  for  the

logged on user. The specification regarding whether the target time or normal time is compensated

is based on the setting Identification of available staff on the basis of target time/ normal time.

The settings for the display in the personnel scheduling are stored per user.

PEP-VWF_81.docx

Version: 1.0.18468

Page 62 of 69

  Management Functions for Workforce Requirements Planning

16  Labor Time Schedule

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

PEP-VWF_81.docx

Version: 1.0.18468

Page 63 of 69

  Management Functions for Workforce Requirements Planning

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

PEP-VWF_81.docx

Version: 1.0.18468

Page 64 of 69

  Management Functions for Workforce Requirements Planning

Personal models category

The  category  Personal  models  includes  information  regarding  the  planned  personal  models  for

working time, shift rhythm, payment and overtime.

Additional info category

The category Additional info can be used to show additional information from HR master data.

The  settings  for  Shift  type  and  Finding  available  people  in  the  Personnel  scheduling  are  also

considered in the labor time schedule.

PEP-VWF_81.docx

Version: 1.0.18468

Page 65 of 69

  Management Functions for Workforce Requirements Planning

17  Workforce Requirements of Workplaces

Summary

Menu

Master  data    Workplaces/machines    Workforce  requirements  of
workplaces

Transaction code

Wpqual

Function authorization  Wpqual

Utilization

This application allows for the personnel requirements of workplaces to be defined. The requirements for

multiple qualifications may be defined for each workplace.

In  case  the  license  "determination  of  workforce  requirements  depending  on  the  order"  (PEP-

AEP) has been purchased, the personnel requirements can be defined subject to the scheduled

operations as an alternative to the workplaces.

Prerequisites

The corresponding workplace/machine and the corresponding qualification have to be created.

Field descriptions

Valid from, valid to

Validity period of workforce requirements.

without date specification => unlimited validity

Valid from - until

=> restricted to a date range

Valid from

Valid until

=> Workforce requirements apply as of the specified date

=> Workforce requirements apply until the specified date

Workforce requirements

Workforce requirements can be indicated with 2 decimal places.

Assign automatically

It can be controlled  whether or not the  workplace is  to be assigned automatically. Workplaces for

which this option is not enabled are not taken into account by the automatic assignment function.

In addition to the personnel requirements, a shift model also has to be defined at the workplace

in order for the plan to be displayed correctly.

PEP-VWF_81.docx

Version: 1.0.18468

Page 66 of 69

  Management Functions for Workforce Requirements Planning

PEP-VWF_81.docx

Version: 1.0.18468

Page 67 of 69

  Management Functions for Workforce Requirements Planning

18  Personnel Schedule on the Terminal

Overview

Menu

System administration  Terminals  Terminal Configuration

Transaction code

Function authorization

tc

tc

Employees can use  the key  Absence Reason at the  PZE terminal to  view their Personnel  Schedule for

the next couple of days. The Personnel Schedule is displayed at the terminal through the dynamic dialog

P_PEP.

PEP-VWF_81.docx

Version: 1.0.18468

Page 68 of 69

  Management Functions for Workforce Requirements Planning

The Absence Reason "_PEP" must be specified and additionally the legend to  be  displayed on the key

must be entered:

The  dialog  must  be  activated  through  the  Dynamic  Dialog  Configuration  before  it  can  be

displayed at the terminal.

PEP-VWF_81.docx

Version: 1.0.18468

Page 69 of 69

