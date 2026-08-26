Manual

Management Functions for
Personnel Scheduling
HLS-PEP 8.2

Version 1.0.23503

Last changed on: 02.10.2020

  Management Functions for Personnel Scheduling

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

HLS-PEP_82.docx

Version: 1.0.23503

Page 2 of 72

  Management Functions for Personnel Scheduling

Contents

1  Overview: management functions for personnel scheduling ....................... 5

2  Categories .................................................................................................... 6

3  Qualifications ................................................................................................ 7

4  Staff qualifications ........................................................................................ 9

5  Qualification Matrix ..................................................................................... 13

6  Public holidays ........................................................................................... 16

7  Working Time Day Types ........................................................................... 18

8  Working Time Models ................................................................................ 23

9  Shift Rhythm Models .................................................................................. 29

10  Personal Models ........................................................................................ 35

11  Personal Day Types ................................................................................... 38

12  Personal Working Time .............................................................................. 42

13  Payment Day Types ................................................................................... 44

14  Control of Absences ................................................................................... 46

15  Absence Planning ...................................................................................... 51

16  Personnel Scheduling ................................................................................ 57

17  Labor Time Schedule ................................................................................. 66

18  Workforce Requirements of Workplaces.................................................... 69

19  Staff Schedule of the Terminal ................................................................... 71

HLS-PEP_82.docx

Version: 1.0.23503

Page 3 of 72

  Management Functions for Personnel Scheduling

HLS-PEP_82.docx

Version: 1.0.23503

Page 4 of 72

  Management Functions for Personnel Scheduling

1  Overview: management functions for personnel scheduling

Purpose

This function package provides functions to define qualifications and to assign these qualifications to staff

and workplaces.

Implementation notes

Use the function package if:



you  use  the  HYDRA  Shop  Floor  Scheduling  module  (HLS)  and  you  want  to  edit  personnel

requirements and personnel capacities.

Integration

The configurations you make in this function package are the basis for other HLS and Personnel Scheduling

(PEP) function packages.

Features

  Qualifications

o  Qualification master to define required qualifications.

  Assigning qualifications to staff

o  You can assign qualifications to employees.

  Qualification matrix

o  You can view and maintain the qualifications assigned to staff in a matrix.

  Workforce requirements of workplaces

o  You can specify personnel requirements per workstation or machine.

HLS-PEP_82.docx

Version: 1.0.23503

Page 5 of 72

  Management Functions for Personnel Scheduling

2  Categories

Summary

HYDRA menu

System administration  System settings  Categories

FEDRA menu

Advanced Resource Planning  Maser data  Categories

Transaction code

catg

Function authorization

catg

The  "categories"  application  has  been  designed  to  manage  categories  for  different  applications.  The

categories advanced training, instructions, driver's license, inspection, etc., for example, may be defined

for the qualifications. The categories are also used in the digital personnel file (e.g. application, appraisal,

etc.) and the work equipment management.

Field description

Category

Alphanumeric key for the category

Designation

Category name

Application

Transaction code for the application in which the category is to be used.

Responsibility area ("category" group)

The responsibility area which the category is assigned to. This responsibility area is checked when

the category is edited but it does not affect using the category in other applications.

Responsibility area ("Authorization check for using the category" group)

The responsibility area entered here is checked if you want to show, create, change or delete a data

record assigned to this category in another application. This authorization controls, for example, if a

user in the digital personnel file is allowed to view, create, change or delete entries assigned to the

"appraisal" category.

HLS-PEP_82.docx

Version: 1.0.23503

Page 6 of 72

  Management Functions for Personnel Scheduling

3  Qualifications

Overview

HYDRA menu

Master data  Staff  Qualifications

FEDRA menu

Advanced resource planning  Master data  Qualifications

Transaction code

qual

Function authorization

qual

Individual qualifications are defined using the related settings in the master data for qualifications:

Field descriptions

Qualification

Unique qualification number. This number can be freely selected when creating a qualification.

Name/designation

Description of the qualification

Category

Category  which this qualification belongs to. The category  controls authorizations for viewing  and

editing qualifications within the application Staff qualifications.

HLS-PEP_82.docx

Version: 1.0.23503

Page 7 of 72

  Management Functions for Personnel Scheduling

Color

Color highlighting the qualification in personnel assignment. This field is only available if the additional

function "enhanced selection and visualization" is available.

The field "color" is only available if the license "enhanced selection and visualization" (PEP-

ESV) is enabled (only applicable if HYDRA is used).

Relevant to workforce requirements planning

This  field  specifies  whether  the  qualification  is  to  be  displayed  and  processed  in  workforce

requirements planning.

Assign automatically

This  option  specifies  if  the  qualification  is  considered  in  the  automatic  planning  and  only  affects

workforce requirements defined via the machine/operator relation of the operation or the production

resources and tools.

Order

You  can  configure  the  order  in  which  multiple  qualifications  for  a  workplace  are  displayed  in  the

Workplace Assignment.

Responsibility area

Responsibility area of the qualification

Validity period

Indicates how long the qualification will be valid (in days). If a value is entered in this field, the validity

period will be assigned automatically starting from the current day until the end of the specified validity

period, when an assignment is created for this qualification.

Max. validity period

Maximum validity of the qualification in days that is checked, when an assignment is created or edited.

If the validity start date is not indicated it will automatically be set to “Today”. If the validity end date

is not entered, it will automatically be set to the validity start date + maximum validity period. If both

fields are assigned values and the maximum validity period is exceeded, editing of a qualification will

be canceled by issuing the error message “maximum validity period exceeded.

The fields ”category”, “relevant to workforce requirements planning”, “validity period" and "max.

validity period” are only available if the license "enhanced personnel information" (SIS-EPI) is

enabled or PEP 8.2 is in use (only applicable if HYDRA is used).

HLS-PEP_82.docx

Version: 1.0.23503

Page 8 of 72

  Management Functions for Personnel Scheduling

4  Staff qualifications

Overview

HYDRA menu

Master data  Staff  Staff qualifications

FEDRA menu

Advanced Resource Planning  Master data  Staff qualifications

Transaction code

pequal

Function authorization

pequal

You can define the employees' qualifications in the Staff qualifications application:

Employees without qualification cannot be planned automatically in the  Workplace assignment

application.

HLS-PEP_82.docx

Version: 1.0.23503

Page 9 of 72

  Management Functions for Personnel Scheduling

Selection criteria

The application provides the following selection criteria:

Qualification

Enter a specific qualification to restrict the displayed assignments.

Category

Use this field to restrict the category assigned to the qualifications.

Validity ends ... to

Specifies when the qualification expires. If you use this option to restrict data, the application shows

all assignments whose validity end date coincides with the selected period.

Advanced training planned

Specifies  the  date  when  a  training  is  planned.  Use  this  option,  to  identify  all  employees  who  are

planned to participate in a training for a specific qualification and a specific date. As a result you get

a "list of participants".

The  selection  criteria  Category,  Validity  ends  ...to  and  Advanced  training  planned  are  only

available, if you enable the license  Extended personnel information (SIS-EPI) or version 8.2 of

the Personnel Scheduling (PEP) module.

Field descriptions

Person

The person's personnel number.

Qualification

Qualification number.

Ranking order

Ranking of the qualification. The system plans qualifications with higher ranking first during automatic

planning. You can use the numbers ranging between 99 and 1 to define the ranking.

Valid from, to

The validity period for the assigned qualification.

Without date specification => unlimited validity

Valid from - until

=> restricted to a date range

Valid from

Valid until

=> Workforce requirements apply as of the specified date

=> Workforce requirements apply until the specified date

HLS-PEP_82.docx

Version: 1.0.23503

Page 10 of 72

  Management Functions for Personnel Scheduling

Evaluation

In this field, you can enter an evaluation/rating of the qualification for information purposes. The field

is only available if the user has the function authorization pequal or pequal.rating.

If  this  field  should  not  be  displayed  for  specific  users,  you  have  to  delete  the  function

authorization  pequal  for  these  users.  Then  you  have  to  add  the  required  function

authorizations pequal.create, pequal.edit, pequal.delete and pequal.copy.

Comment 1-3

Use these fields to add up to three comments for each assignment.

Advanced training planned

Date when a training is planned for this qualification.

Start time

Start time of the training.

Advanced training done

Check this field to document that the training has been completed.

The  fields  Evaluation,  Comment  1-3,  Advanced  training  planned,  Start  time  and  Advanced

training done are only available, if you enable the license Extended personnel information (SIS-

EPI) or version 8.2 of the Personnel Scheduling (PEP) module.

Toolbar

 Add file

Opens a dialog to select a file. Once selected, the file is saved with a unique name in the HYDRA

path ”MOCHRIMG“ on the server. The File name field shows the file name.

 Show file

Shows any assigned file. Subject to the file extension, the application linked in the operating system

displays the file.

 Delete file

Deletes the assigned file.  Once  you have  used this function, the file  is no  longer available on the

server.

The  buttons  Add  file,  Show  file  and  Delete  file  are  only  available,  if  you  enable  the  license

Extended  personnel  information  (SIS-EPI)  or  version  8.2  of  the  Personnel  Scheduling  (PEP)

module (only applicable if HYDRA is used).

HLS-PEP_82.docx

Version: 1.0.23503

Page 11 of 72

  Management Functions for Personnel Scheduling

HLS-PEP_82.docx

Version: 1.0.23503

Page 12 of 72

  Management Functions for Personnel Scheduling

5  Qualification Matrix

Overview

HYDRA menu

Production  control    Workforce  requirements  planning    Qualification
matrix
Human  resources  management    Workforce  requirements  planning  
Qualification matrix

FEDRA menu

Advanced resource planning  Master data  Qualification matrix

Transaction code

quam

Function authorization

quam

The qualification matrix represents the qualifications assigned to personnel in form of a matrix and facilitates

changes to these assignments:

Selection criteria

The application provides the following selection criteria:

HLS-PEP_82.docx

Version: 1.0.23503

Page 13 of 72

  Management Functions for Personnel Scheduling

Qualification

You can select a specific qualification.

Category

You  can  assign  qualifications  to  a  category.  Use  this  field  to  only  view  the  qualifications  that  are

assigned to the indicated category.

Valid on

The application only shows the qualifications that are valid on the day entered here.

Field descriptions

Display

Use this field to define whether the application should show the "ranking order" or the "evaluation"

(rating) of the assigned qualifications.

Valid until

Qualifications with a validity end date ending prior to or on the date defined in the "valid on" field of

the selection panel are highlighted in yellow. Consequently, you can identify expiring qualifications.

Editing functions

If you double click an empty field, a dialog opens where you can assign a qualification to an employee. You

can  edit  an  existing  assignment,  if  you  double  click  the  corresponding  field.  Fields  are  described  in  the

document Staff qualifications.

You  can  copy  or  delete  an  existing  assignment  by  selecting  the  relevant  field  and  clicking  the  Copy  or

Delete button in the toolbar.

If you create, copy, edit and delete assignments, the system checks the function authorization

pequal. The same applies for the application Staff qualifications.

Toolbar

 Add file

Opens a dialog to select a file. Once selected, the file is saved with a unique name in the HYDRA

path ”MOCHRIMG“ on the server. The File name field shows the file name.

 Show file

Shows any assigned file. Subject to the file extension, the application linked in the operating system

displays the file.

HLS-PEP_82.docx

Version: 1.0.23503

Page 14 of 72

  Management Functions for Personnel Scheduling

 Delete file

Deletes the assigned file.  Once  you have  used this function, the file  is no  longer available on the

server.

HLS-PEP_82.docx

Version: 1.0.23503

Page 15 of 72

  Management Functions for Personnel Scheduling

6  Public holidays

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

Public holidays for which you have defined an absence payment also have the same effect as if an absence

was planned. In order for the system to generate an absence, you must have planned a target time for the

corresponding days in the working time models.

Field descriptions

Type

Here you can specify whether it is a Public holiday, a Religious holiday or an Other day off. In week

and period models, you can plan different day types for the particular types.

HLS-PEP_82.docx

Version: 1.0.23503

Page 16 of 72

  Management Functions for Personnel Scheduling

Absence payment

Payment  day  type  which  should  be  used  to  create  an  absence.  If  this  field  is  left  empty,  then  no

absence is planned for this day.

Company

Use  this  option  to  restrict  the  public  holiday  to  a  particular  company.  Use  this  field  if  a  particular

holiday is not valid in all companies or if different absences should be created for different companies.

Otherwise, you should leave this field empty.

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

HLS-PEP_82.docx

Version: 1.0.23503

Page 17 of 72

  Management Functions for Personnel Scheduling

7  Working Time Day Types

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

To specify the working time for a shift worker, all of the shifts that occur in a day are entered in the working

time day type. Each shift of the day is represented in a working time day type, each of which contains an

identifier referring to the corresponding shift, e.g. 'F' for early shift, 'S' for late shift, etc.

HLS-PEP_82.docx

Version: 1.0.23503

Page 18 of 72

  Management Functions for Personnel Scheduling

Field descriptions for the Working time tab

Type

Selection regarding whether the type is flextime or shift day type.

Shift type

In working time planning in the shift rhythm model, the shift type field is used to plan one of the shifts

defined in the day type for the employee. The designation can be freely selected although the system

is  case  sensitive.  The  shift  types  within  one  day  type  must  be  different.  Self-explanatory

abbreviations, such as "F" for early shift and "N" for night shift, are useful.

A night shift that is to be compensated on the following day is configured using a negative

start time in skeleton and normal time. For example, the entry "-2:00" means that the shift

starts two hours before 0:00, or at 22:00 on the previous day. If the core time is also to

begin  on  the  previous  day,  a  negative  time  must  also  be  entered  in  the  corresponding

field.

Target time

Specification  of  the  daily  target  working  time  in  hours  and  minutes.  For  day  types  for  occasional

Saturday or Sunday work, the value 00:00 is entered in this field to specify that there is no target

working time for this day.  For employees that are not present, this means that  an  absence  is not

generated for this day. For employees that are present, the attendance time is evaluated as overtime.

Max. working time

The  entry  in  the  Max.  working  time  field  causes  a  message  to  appear  in  the  day  evaluation  if  an

employee exceeds the maximum working time on the day evaluated. Otherwise, the entry in this field

has no other effect, i.e. working time that exceeds the maximum working time is compensated. If this

field is empty (entry of 00:00), no message is generated.

Rest period

The rest period specifies how long after the end of the working time employees have to rest before

they are allowed to resume work on the next day. Planning scenarios violating the rest period are

highlighted in pink in Personnel Scheduling. Provided that the rest period has not been respected,

Labor Time Calculation generates a respective message that is shown in Messages listing

Beginning, end of skeleton time

Specification of the period in which employee presence is allowed. Control of labor time calculation

can be used to define whether or not the working time before or after the beginning/ end of skeleton

time is to be compensated.

HLS-PEP_82.docx

Version: 1.0.23503

Page 19 of 72

  Management Functions for Personnel Scheduling

Beginning, end of core time

Specification  of  the  period  in  which  the  employee  must  be  present.  If  the  employee  leaves  the

workplace early or the clock-in is late, a message is generated in the messages listing.

For day types  without core time, an entry  must be made  anyway  in the core time field  within the

skeleton time (e.g. core time from 11:30 to 11:30).

Beginning, end of normal time

If an employee does not provide a clocking on the day to be evaluated even though the employee

was assigned target working time, i.e. the employee was absent the entire day, normal working time

is  compensated.  The  absence  record  created  for  the  employee  starts  at  the  normal  start  time,

contains the normal breaks and ends such that the target time or the set absence time is reached.

The rounding of clockings is also set based on the normal working time. The normal working time is

also needed for the assignment regarding whether the working time belongs to the current day or the

following day. For this reason, it is imperative that an entry be made in this field.

Field descriptions for the Breaks tab

Break 1 to Break 3

In these three groups, a skeleton time, a minimum duration and a normal time can be entered for

each break. In addition, a specification can be made regarding whether the break is unpaid or paid.

While unpaid breaks are subtracted from the working time, paid breaks count as working time and

are considered in the compensation of breaks depending on working time, for example. For day types

that include fewer than three breaks, the other break fields remain empty.

For paid breaks, the field Minimum duration is processed as maximum duration.

Note regarding the processing of flexible breaks

Flexible breaks are unpaid breaks in which the period of the break frame is longer than the minimum

duration of the break. The following rules apply for processing flexible breaks:

  1.  The employee is present, but does not create a clocking within the break frame. If the system does

not  find  a  clocking  within  the  break  frame,  the  employee  is  credited  with  the  normal  time  for  the

respective break.

  2.  If  the  employee  creates  a  clocking  within  a  break  frame  and  the  clocked  time  is  longer  than  the

minimum break, exactly that clocked time is subtracted for the employee.

  3.  If  the  employee  creates  a  clocking  within  a  break  frame  and  the  clocked  time  is  shorter  than  the

minimum break, the minimum break is subtracted for the employee.

HLS-PEP_82.docx

Version: 1.0.23503

Page 20 of 72

  Management Functions for Personnel Scheduling

  4.  If only one of the two clockings lies within the break frame, only the time within the frame is evaluated

as a break. The time outside of the frame is subtracted as an interruption of the working time. This

takes  effect  if  only  a  small  part  of  the  clocked  break  is  within  the  frame  because  in  this  case,  the

minimum break is allocated as the break and the time outside of the break frame is also subtracted.

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

HLS-PEP_82.docx

Version: 1.0.23503

Page 21 of 72

  Management Functions for Personnel Scheduling

Field descriptions for the Payment tab

Day type

The entry in this field is the payment day type that is to be compensated together with this working

time day type.

As an alternative, there is an option to specify the payment using the payment model assigned using

the HR master data sheet. If a payment day type is entered in this payment model, it has precedence

over the payment day type entered here in the working time day type.

Field descriptions for the Options tab

Free break

In  addition  to  the  three  breaks  in  the  Working  time  tab,  a  free  break  can  be  subtracted  from  the

working time of each employee. This break can be distributed over the day. This field is not used to

enter the total of all breaks. The free break is always subtracted at the end of the day regardless of

the amount of working time, i.e. it is even allocated if an employee was only present for a short

time.

Compensation of target time starting

This option can be used to select if the compensation of the target time is to occur beginning with the

start of the working time, the frame, the normal time or the core time. For example, if the start of the

frame is set and the employee worked overtime, the target time is filled with the working time after

the start of the frame and the previous time (time before frame start or parts of it) are compensated

as  overtime.  With  the  Working  time  start  setting,  any  possible  existing  overtime  is  always

compensated at the end of the working time.

HLS-PEP_82.docx

Version: 1.0.23503

Page 22 of 72

  Management Functions for Personnel Scheduling

8  Working Time Models

Summary

HYDRA menu

Human resource management  Models  Working time models

FEDRA menu

Advanced resource planning  Master data  Working time models

Transaction code

wtmo

Function authorization  wtmo

Week models, period models and year models can be used to assign working time day types to working

time models.

HLS-PEP_82.docx

Version: 1.0.23503

Page 23 of 72

  Management Functions for Personnel Scheduling

Insert week model

 Insert week model

The following dialog opens for inserting a week model:

Valid as of

The field valid from can be used to define week models with the same model number and different

validity starts. If modifications are required for a week model, they can be stored using a new week

model with the same number such that the calculations can be reset.

Monday, Tuesday, ..., Sunday

The day type for the corresponding weekday is entered in these fields. The Public holiday, Important

public holidays and Other days off tabs can be used to store a different day type per weekday. This

day type is used if the day is defined as a public holiday with the respective public holiday type. If the

fields in these tabs are empty, on public holidays, the day type from the Weekdays tab is used.

HLS-PEP_82.docx

Version: 1.0.23503

Page 24 of 72

  Management Functions for Personnel Scheduling

Insert period model

 Insert period model

The following dialog opens for inserting a period model:

Field description

Reference date

The reference date specifies the date on and after which the periods described in the table will cycle

through repeatedly.

HLS-PEP_82.docx

Version: 1.0.23503

Page 25 of 72

The "Insert" option is used to define the individual periods of the period model:

  Management Functions for Personnel Scheduling

Field description

No. of days

Duration of the period in days

Day type

Specification of the day type for working time models.

Day type for public holidays, important public holidays, other days off

A different day type can be stored in these three fields for public holidays, important holidays and

other days off. If these fields are empty, on the respective public holidays the entry from the previously

described field will be used.

HLS-PEP_82.docx

Version: 1.0.23503

Page 26 of 72

  Management Functions for Personnel Scheduling

Insert year model

 Insert year model

The following dialog opens for inserting a year model:

Date from, to

Period for which an assignment is to be made.

Weekdays, weekends, Mo, Tu, ..., Su

Weekdays that are to be assigned. The weekdays button selects the days from Monday to Friday

and the weekends button selects Saturday and Sunday.

Include public holidays, exclude public holidays, public holidays only

This option is used to specify whether or not public holidays are considered  in the assignment or if

only public holidays are assigned. Public holidays are shown in brown in the year calendar.

Day type

Selection of the working time day type that is to be entered on the selected days in the year calendar.

Field descriptions for the Weekdays tab

Assigns the selected day type on the selected days.

HLS-PEP_82.docx

Version: 1.0.23503

Page 27 of 72

  Management Functions for Personnel Scheduling

Deletes the day types entered on the selected days in the year calendar.

HLS-PEP_82.docx

Version: 1.0.23503

Page 28 of 72

  Management Functions for Personnel Scheduling

9  Shift Rhythm Models

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

HLS-PEP_82.docx

Version: 1.0.23503

Page 29 of 72

  Management Functions for Personnel Scheduling

In tab Calendar view, the selected shift rhythm model is displayed in a current calendar view. With shift

rhythm models that have been created long ago, the calendar view provides an overview of the shift rhythm

of the current year. This way it is easier to assign the correct model to a person.

Purpose

In the shift rhythm model, you can enter a shift type for the selected days. This is also possible if

no day type has been stored for the respective day in the working time model. This way, it is often

easier to create a shift rhythm model.

Insert week model

 Insert week model

To insert a Week model, the following dialog opens:

HLS-PEP_82.docx

Version: 1.0.23503

Page 30 of 72

  Management Functions for Personnel Scheduling

Valid from

You can use the Valid from field to define week models with the same model number and different

validity start dates. If you must edit a week model, you can store this change retroactively using a

new week model with identical model number.

Monday, Tuesday, …., Sunday

You enter the shift type of the respective weekday in these fields. In tabs Public holiday, Important

public holidays and Other days off, you can store a different shift type for the weekday that is used if

the day is defined as a public holiday with the relevant holiday type. If these fields are left empty, then

the day type from the Weekday tab is used on public holidays.

Insert period model

Insert period model

To insert a Period model, the following dialog opens:

HLS-PEP_82.docx

Version: 1.0.23503

Page 31 of 72

  Management Functions for Personnel Scheduling

Field description

Reference date

The periods of time defined in the table are repeated from the day onwards specified as Reference

date.

Use the button Insert to define the different periods of the period model:

HLS-PEP_82.docx

Version: 1.0.23503

Page 32 of 72

  Management Functions for Personnel Scheduling

Field description

No of days

Duration of the period in days

Day type

Specifies the shift type.

Day type with Public holiday, Important public holiday, Other day off

In these 3 fields, you can enter a different day type for public holidays, important public holidays and

other days off. If the fields are left empty, then the value of the field Day type is used on the relevant

public holidays.

Insert year model

Insert year model

To insert a Year model, the following dialog opens:

Date from, to

Period of assignment

Weekdays, Weekend, Mon, Tue, …, Sun

Weekdays that you want to assign. The button Weekdays includes the days from Monday to Friday

and the Weekend button includes Saturday and Sunday.

HLS-PEP_82.docx

Version: 1.0.23503

Page 33 of 72

  Management Functions for Personnel Scheduling

Include public holidays, Exclude public holidays, Public holidays only

This option specifies if the public holidays are integrated during the assignment or not or if only public

holidays are assigned. Public holidays are displayed in brown in the year calendar.

Day type

Specifies the shift type that is entered in the year calendar on the selected days.

Function buttons in tab Weekdays

Assigns the shift type entered to the selected days.

Deletes the shift types entered on the selected days in the year calendar.

HLS-PEP_82.docx

Version: 1.0.23503

Page 34 of 72

  Management Functions for Personnel Scheduling

10  Personal Models

Summary

HYDRA menu

Human resources management --> Planning --> Personal models

FEDRA menu

Advanced resource planning  Master data  Personal models

Transaction Code

pmod

Function authorization

pmod

Use the “Personal models” module to assign a working time model, shift rhythm model, payment model or

an  overtime  type  to  an  employee,  cost  center,  area  or  an  entire  company  for  a  certain  period.  This

assignment then overrides the models configured the HR master data.

This function allows short term switches between individual models without having to change allocations in

the HR master data.

Utilization

The display of planned personal models is sorted in descending order by date, i.e., the current and future

plans are at the top.

HLS-PEP_82.docx

Version: 1.0.23503

Page 35 of 72

  Management Functions for Personnel Scheduling

The following priorities apply to the definition of personal models:

1. Employee

2. Cost center

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

Selection criteria for the employee or employee group, for which the personal model is to be planned.

An additional company restriction is necessary if several companies are managed in the system and

the allocation by company is not clear and unambiguous.

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

It is not necessary to fill in all fields when planning personal models. For empty fields, the models

from the HR master data will be processed.

HLS-PEP_82.docx

Version: 1.0.23503

Page 36 of 72

  Management Functions for Personnel Scheduling

When it comes to plans that are to be rescheduled for longer periods, we recommend making the

changes using the HR master that may be kept in different versions.

Toolbar

 Reset labor time calculation

In the reset labor time calculation dialog the results of labor time calculation have to be reset for the

selected  range  of  people  and  dates  when  it  comes  to  plans  relating  to  the  past,  in  order  for  the

changes to become effective.

HLS-PEP_82.docx

Version: 1.0.23503

Page 37 of 72

  Management Functions for Personnel Scheduling

11  Personal Day Types

Overview

HYDRA menu

Human resources management  Planning  Personal day types

FEDRA menu

Advanced Resource Planning  Master data  Personal day types

Transaction code

pdat

Function authorization

pdat

You can use the application Personal day types to assign a working time day type or payment day type to

a person, a cost center, an area or an entire company for a specified period. This entry then overrides the

specification in the relevant working time or payment model.

Using  this  function,  you  can  make  short-term  and  individual  changes  of  the  working  time  and  payment

without having to change the relevant models.

HLS-PEP_82.docx

Version: 1.0.23503

Page 38 of 72

  Management Functions for Personnel Scheduling

Purpose

The display of planned personal models is sorted in descending order by date, i.e., the current and future

plans are on top.

When you define personal day types, the following priorities apply:

1. Person

2. Cost center

3. Area

4. Company

That means that person-related plans override cost center related plans. Personal day types for

an area override company-related plans.

Selection criteria

The application provides the following selection criteria:

Valid from, valid until

Only the personal day types included in this period are available for selection.

Field descriptions

Company, Person, Cost center, Area

Selection criteria for the person or group of persons for which you want to plan a personal day type.

You must additionally select the company if several companies are managed in the system and the

allocation by company is not clear and unambiguous.

Valid from, to

Start and end date of the planning of the personal day type. If you leave the end date field empty, a

plan without time limit is created.

Working time day type

Working time day type that is used to evaluate the selected person or group of persons.

Shift type

Shift type of the working time day type.

Payment day type

The Payment day type used to settle the working time.

HLS-PEP_82.docx

Version: 1.0.23503

Page 39 of 72

  Management Functions for Personnel Scheduling

Using  the  function  Personal  day  types,  you  can  plan  the  working  time,  the  payment  or  both.

Information  that  is  missing  during  planning  is  completed  with  values  from  the  models  of  the

relevant person. Example: To plan a different shift type, you do not need to enter the shift day

type.

If  you  want  to  use  a  personal  day  type  to  store  a  different  working  time  day  type  for  a  longer

period, then you usually have to create a separate planning for each week. Otherwise the target

time is also stored for the weekends.

Comment

You  can  enter  a  comment  in  this  field.  You  can  enter  the  reason  why  a  personal  day  type  is

created, for example.

Color

You can use this field to specify a color that identifies the days for which a personal day type is

stored. Using different colors you can identify the changes of different users. In this case, each

user highlights the personal day types with a different color.

Working time before beginning of skeleton time

If the field Working time before beginning of skeleton time is set to Rejected, then the working

time before start of skeleton time is rounded up  to the start of the skeleton time. These fields

therefore override the rounding settings specified in the Control of labor time calculation.

If the field Working time before beginning of skeleton time is set to Approved, then the working

time  before  start  of  skeleton  time  is  rounded  using  the  rounding  settings  Working  time  before

beginning  of  skeleton  time  specified  in  the  Control  of  labor  time  calculation.  If  these  rounding

settings are empty, the time is rounded using the normal rounding settings for flextime or shift.

Times that are blocked in the Control of labor time calculation are not processed if the working

time before start of skeleton time is approved (it does not matter if the blocked times are included

in  the  skeleton,  core  or  normal  time  because  in  all  3  cases  the  working  time  before  start  of

skeleton time can be subject to blocking).

If the field Working time before beginning of skeleton time is set to Approved and if a payment

rule is set for the Working time before beginning of skeleton time that requires authorization, then

this authorization requirement is reset.

Working time after end of skeleton time

If the field Working time after end of skeleton time is set to Rejected, then the working time after

end  of  skeleton  time  is  rounded  down  to  the  end  of  the  skeleton  time.  These  fields  therefore

override the rounding settings specified in the Control of labor time calculation.

HLS-PEP_82.docx

Version: 1.0.23503

Page 40 of 72

  Management Functions for Personnel Scheduling

If the field Working time after end of skeleton time is set to Approved, then the working time after

end of skeleton time is rounded using the rounding settings Working time after end of skeleton

time specified in the Control of labor time calculation. If these rounding settings are empty, the

time is rounded using the normal rounding settings for flextime or shift. Times that are blocked in

the Control of labor time calculation are not processed if the working time after end of skeleton

time  is  approved  (it  does  not  matter  if  the  blocked  times  are  included  in  the  skeleton,  core  or

normal time because in all 3 cases the working time after end of skeleton time can be subject to

blocking).

If the field Working time after end of skeleton time is set to Approved and if a payment rule is set

for the Working time after end of skeleton time that requires authorization, then this authorization

requirement is reset.

Breaks not taken

The options in the group Breaks not taken hide the respective breaks. The options also have an

effect when you plan a personal working time. The personal working time therefore takes priority

over the working time day types und the shift type in the personal day type. But the personal

working time has a lower priority than the options of group Breaks not taken. If a Break depending

on working time is stored, this break is processed and the setting of the options in group Breaks

not taken has no effect. This can have the effect that the break of the working time day type is

not processed, but the break depending on working time is processed.

Toolbar

Reset labor time calculation

In the dialog Reset labor time calculation, you must reset the results of the labor time calculation for

plannings  of  the  past  for  the  persons  and  dates  selected.  Only  then  the  changes  can  become

effective.

HLS-PEP_82.docx

Version: 1.0.23503

Page 41 of 72

  Management Functions for Personnel Scheduling

12  Personal Working Time

Summary

HYDRA menu

Human resource management  Planning  Personal working time

FEDRA menu

Advanced resource planning  Master data  Personal working time

Transaction code

pwot

Function authorization

pwot

The function Personal working time enables the working time of an employee to be planned individually for

one or more days. In contrast to Personal day types with which only the existing day types can be stored,

with Personal working time there is an option to modify the planned working time day type in a targeted

manner.  Application  examples  include  breaks  that  are  not  taken,  which  can  be  deleted  for  a  person  by

planning a personal working time.

HLS-PEP_82.docx

Version: 1.0.23503

Page 42 of 72

  Management Functions for Personnel Scheduling

Field descriptions

The field descriptions correspond with the descriptions of the working time day types

When  a  personal  working  time  is  created,  the  person's  respective  clockings  are  automatically

reset.  In  this  case,  the  rounded  times,  the  working  time  day  type  and  payment  day  type  from

these clockings are deleted. Manually edited and authorized clockings are not automatically reset

so that the editor's desired modifications are not overwritten.

HLS-PEP_82.docx

Version: 1.0.23503

Page 43 of 72

  Management Functions for Personnel Scheduling

13  Payment Day Types

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

HLS-PEP_82.docx

Version: 1.0.23503

Page 44 of 72

  Management Functions for Personnel Scheduling

Utilization

Defines how the payment type is used. The following utilization options are possible:

Payment day type

The payment day type is provided in the selection lists for remunerations of attendance times,

e.g. When payment models are created, for personal day types and when clockings are directly

entered.

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

HLS-PEP_82.docx

Version: 1.0.23503

Page 45 of 72

  Management Functions for Personnel Scheduling

14  Control of Absences

Overview

HYDRA menu

Master data  Labor time  Control of absences

FEDRA menu

Advanced resource planning  Master data  Control of absences

Transaction code

abse

Function authorization

abse

You use the Control of absences application to configure and control the planned absences of employees.

HLS-PEP_82.docx

Version: 1.0.23503

Page 46 of 72

  Management Functions for Personnel Scheduling

Field descriptions

Field descriptions of the Absence tab

Abbreviation: Full-day absence

The  comment  entered  here  is  used  to  fill  the  field  Abbreviation  of  the  Absence  planning.  This

comment is therefore also entered in the graphic Absence Planning. With unplanned absences that

are allocated to a specific payment type using specified evaluation parameters, you can use this field

to define a different abbreviation for "unplanned" absences = "UNG". The new abbreviation is then

displayed in the absence year overview.

Abbreviation: Partly absent

If a part-time absence is available for a day, this comment is entered instead of the abbreviation Full-

day absence. You can then see in the graphic Absence planning, if the absence is a full-day or a

part-time absence.

Priority

Priority of the absence payment; possible values are 0 to 99; a higher value means higher priority. If

two absences are planned for an employee on the same day, the absence with higher priority is used.

Percentage

Percentage used to multiply the planned time (e.g. 80% continued pay in case of sick leave or 50%

for half a leave day).

Category

Allocation of the absence to a particular  group of absences. The different absence categories are

displayed in the work day statistics.

Color

Color  used  to display the  absence  in  the graphic absence planning,  in the  year overview and  the

personnel scheduling.

Context menu

If you make an entry in this field, the absence is displayed in the context menu of the graphic absence

planning and the personnel scheduling. You can then assign this absence without calling the editing

dialog. The absences in the context menu are sorted by the value specified here. The system also

checks if the user is authorized for the responsibility area of the absence payment. The context menu

only shows entries the user is authorized for. You can enter values between 1 and 9. If you use a

value multiple times, the number of the payment day type is used for sorting within the value.

Duration

  Target time

The absence time is calculated using the target time planned for this day in the  Working time day

types.

HLS-PEP_82.docx

Version: 1.0.23503

Page 47 of 72

  Management Functions for Personnel Scheduling

  Normal time

The absence time is calculated using the normal time planned for this day in the Working time day

types.

  Average working time

The absence time is calculated using the average working time entered in the HR master data.

  Absence

The absence time is generated using the specified time.

Set target time as absence time

If this option is activated, the target time is used to specify the absence time planned for the day. This

is useful if the normal time or the average working time defined in the HR master data are used to

calculate the absence time. If you use the target time as absence time, you avoid that overtime or

undertime is generated for the respective day.

Minimum duration

Only after the minimum time specified in this field, an absence time is generated. Example: With short

time, you use this setting to generate an absence only after the specified minimum time.

Maximum duration

If the absence time exceeds the value entered here, it is cut to this maximum duration. Example: You

can use this option to limit an appointment at the doctor's to two hours.

Field descriptions of the Settings tab

Authorization required

The absence planning must be approved.

Generate complete absence despite attendance

If  this  option  is  set,  the  complete  absence  is  allocated  even  though  the  employee  was  present.

Example: This option must be set for half a leave day.

Partly absent, Fill up target time to

Enter percentage values in this field. Values between 1 and 100 result in an absence record. The

absence record is created in any case, even if the employee was present. The system then uses the

entered

percentage

to

fill

up

the

target

time

with

absence

time.

The  absence  time  is  calculated  using  the  attendance  time  and  the  specified  percentage  of  target

time.

Use this field, for example, if an employee gets ill during the workday or when it comes to short-time

work.

HLS-PEP_82.docx

Version: 1.0.23503

Page 48 of 72

  Management Functions for Personnel Scheduling

Modification enabled

If this option is not activated, the input fields in the absence planning dialog, which refer to the default

values defined here, are disabled. In this case, you cannot change the values specified in the relevant

fields.

Display as planned absence

You use this field to define if the absence is used to display the employee in the Overview of periods

of the Personnel scheduling as available or not available. The employees are then integrated in the

number of available employees in the  Personnel scheduling although an absence is stored for the

respective employees. This can be useful with part-time absences because of school or short time.

If this option is deactivated, the graphic absence planning and the personnel scheduling display the

comment of part-time absences with planned absences.

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

This parameter is used to specify whether the absence time requested via the absence workflow has

to be approved by the supervisor or whether it is automatically approved.

Color of requested absence

This parameter is used to specify the color used to display the absence requested via the absence

workflow in the personnel scheduling. The different colors help to distinguish between the requested

and the planned/approved absences.

HLS-PEP_82.docx

Version: 1.0.23503

Page 49 of 72

  Management Functions for Personnel Scheduling

Continued pay

If you have entered a period of time in the field Period of continued pay, the system automatically

changes to the absence payment (specified in the field Subseq. payment) after the time specified

here. The period is counted in calendar days and does therefore not count the number of actually

planned working days and weekends. In Germany, the period of continued pay is usually 6 weeks.

You therefore enter 42 in the field Period of continued pay in Germany.

Upload to payroll accounting

These fields are only processed in a few customer-specific interfaces. You use the option Upload to

payroll accounting to specify if the absence is passed to the absence interface. In the field Absence

reason, you can enter a number or name that is different to the one specified in the Absence payment.

You can also pass a control indicator.

HLS-PEP_82.docx

Version: 1.0.23503

Page 50 of 72

  Management Functions for Personnel Scheduling

15  Absence Planning

Overview

Menu

Human resource management  Planning  Absence planning

Transaction code

pabp

Function authorization

pabp

You use the absence planning function to plan and display absences for persons and groups of persons.

Purpose

The application shows the planned absences in descending order and sorted by date, i.e. current and future

absences  are  displayed  on  top.  The  requested  absences  are  displayed  in  blue  and  italic  font  and  the

rejected absence requests are displayed in red and italic font.

HLS-PEP_82.docx

Version: 1.0.23503

Page 51 of 72

  Management Functions for Personnel Scheduling

In general, absence times and attendance times are managed via clocking records. The Type field of the

clocking records is used to identify absence and attendance times. Absence is the clocking type for absence

times.

The  system  automatically  generates  absence  records  during  the    Labor  time  calculation  if  no  clocking

records are available for employees, although working time is planned. When it comes to absences, the

system  subtracts  the  standard  breaks  defined  in  the  working  time  model.  You  can  create  absences

manually and you can edit absence records that are generated automatically.

The system differentiates  between  planned and unplanned absences. If an  employee is absent, though

working time is planned for that day and there is no absence planning, then it is an unplanned absence. In

the  Control  of  labor  time  calculation,  you  can  configure  how  unplanned  absences  are  generated.

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

The selection is  narrowed  down to the requested absences. Example:  You can  use this selection

criterion to display a processing list of all holiday requests that have not yet been approved.

Field descriptions in the Absence tab

Company, personnel selection

If you want to plan an absence, you use these fields to select a person or a group of persons. You

must  additionally  select  the  company  if  several  companies  are  managed  in  the  system  and  the

allocation by company is not clear and unambiguous.

Valid from, valid until

Start and end time of the planned absence.

HLS-PEP_82.docx

Version: 1.0.23503

Page 52 of 72

  Management Functions for Personnel Scheduling

Payment

Enter the payment day type used to allocate the absence time. If specifications are defined for the

selected  payment  day  type  in  the  Control  of  absences,  the  system  automatically  enters  these

specifications  in  the  absence  planning  when  you  enter  this  payment  day  type.  If  the  Modification

enabled  option  is  not  checked  in  the  Control  of  absences,  the  relevant  fields  are  blocked  in  the

graphical user interface. Therefore, you cannot change these entries.

Comment

Comment on the absence that can be entered by the employee when requesting the absence. The

Attendance overview shows this comment for the relevant period. The  Personnel Scheduling shows

this comment in the tooltip of the relevant days.

Internal comment

The internal comment is only visible when you plan and edit absences in the  Personnel Scheduling.

Number of calendar days

The field Number of calendar days shows the absence time in calendar days for absences with a

subsequent payment (defined in the Control of absences application, tab Settings, section Continued

pay).

Duration

Planned target time

If you select this field, the system generates an absence with the duration of the planned target time.

Planned normal time

If you select this field, the system generates an absence with the duration of the planned normal time.

For employees with flextime or flexible shifts, this time can deviate from the target time.

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

Authorization required

Use  this  option  to  specify  whether  the  absence  and  the  respective  wage  type  postings  must  be

approved.

HLS-PEP_82.docx

Version: 1.0.23503

Page 53 of 72

  Management Functions for Personnel Scheduling

Partly absent, Fill up target time to

Enter percentage values in this field. Values between 1 and 100 result in an absence record. The

absence

record

is  created

in  any  case,  even

if

the  employee  was  present.

Use this field, for example, if an employee gets ill during working hours and goes home earlier. The

application calculates the following if  you enter "100" in this field and you select the "Target time"

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

The fields Period of continued pay, Duration and Start date are displayed in this section if you plan absences

where the monitoring of continued pay is activated in the Control of absences:

HLS-PEP_82.docx

Version: 1.0.23503

Page 54 of 72

If you use the selection list of the Duration field, a dialog opens where you can select the previous illness:

  Management Functions for Personnel Scheduling

Once you have selected the illness, the system automatically enters the duration and the start date in the

relevant fields. Or you can manually enter the duration and the start date.

Toolbar

 Approve application

Function authorization: pabp.sign

Click this button to approve a requested absence. Further processing is the same as approving a

request in the Escalation Management module.

 Reject application

Function authorization: pabp.reject

Click this button to reject a requested absence. Further processing is the same as rejecting a request

in the Escalation Management module.

 Personnel Scheduling

Click this button to call the  Personnel Scheduling.

HLS-PEP_82.docx

Version: 1.0.23503

Page 55 of 72

  Management Functions for Personnel Scheduling

 Labor Time Maintenance

Click this button to call the Labor Time Maintenance.

 Reset labor time calculation

Click this button to call the function Reset labor time calculation

HLS-PEP_82.docx

Version: 1.0.23503

Page 56 of 72

  Management Functions for Personnel Scheduling

16  Personnel Scheduling

Overview

HYDRA menu

Human resources management  Planning  Personnel scheduling

FEDRA menu

Advanced resource planning  Master data  Personnel scheduling

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

HLS-PEP_82.docx

Version: 1.0.23503

Page 57 of 72

  Management Functions for Personnel Scheduling

As an  alternative to the annual overview,  you can  view  the information for a  group of employees  in the

Overview of periods.

Purpose

Below the selection criteria, the year overview shows the current account balance and the account balance

for the end of the year for the leave account (account with the number 4 when configuring accounts).

The  application  shows  absences  with  the  comment  from  the  Control  of  absences  or  from  the  absence

planning  for  the  respective  day.  For  days  with  multiple  planned  absences,  the  application  shows  the

absence reason with the greatest priority in the upper part and the absence that is of lower priority is shown

below. Absences that have been requested via the absence workflow but not yet approved are displayed

in italics.

For the staff displayed,  you can show additional columns in the grid. This  includes the person's current

account balances, the account balances at the start and end of the selected period and at the end of the

year.

By right-clicking, you can plan an absence, a personal shift type or a personal working time for the selected

period. In the Control of absences application, you can define the absences displayed in the context menu

and their colors. The submenu Personal day type shows the shift types of the working time day types.

HLS-PEP_82.docx

Version: 1.0.23503

Page 58 of 72

  Management Functions for Personnel Scheduling

In addition, you can plan Personal models and comments using the context menu. If a comment is defined

for a day and you go with the mouse over this day, the comment will be shown as tooltip in the calendar. A

small, red triangle in the top right edge of the relevant day shows if a tooltip is available.

In  the  Overview  of  periods,  you  can  plan  absences  and  personal  shift  types  for  several  employees

simultaneously. To do so, select the relevant period for these employees. You can only plan an absence

and/or personal shift type for several employees simultaneously if you use the absence entry and/or the

shift type in the context menu.

The table in the lower area of the window shows a list of the persons planned to be present and absent per

shift type. Use this list to check if enough employees are present for the shift. A distinction is made between

employees that are available, not available or off work (free).

In the Overview of periods, you can delete absences. To delete absences, two options are available. If you

select Delete complete absence, the complete absence is deleted as it has been planned before. If you

only want to delete a single day of a planned absence, select Delete selected period.

HLS-PEP_82.docx

Version: 1.0.23503

Page 59 of 72

If the planned working time does not respect the rest period, the affected days will be highlighted in pink:

  Management Functions for Personnel Scheduling

In the Overview of periods of the Personnel scheduling, the calendar weeks are displayed.

Integration

Employees  can  view  their  shift  plan  via  the  PZE  terminal.  The  configuration  is  described  in  the

documentation dealing with the terminal shift plan (only applicable if HYDRA is used).

Selection criteria

The application provides the following selection criteria:

Data to be displayed

Three information  items can be  displayed per  day. Use the three selection fields to specify  which

data should be displayed for a day.

Shift plan

Displays any possibly planned absence and the planned shift type on work days. For the days

evaluated, the application outputs actual data and for days that are not evaluated, the application

outputs the planning.

Absence

Displays any possibly planned absence.

Absence 2

Displays any possibly planned second absence for the day.

Attendance time

Displays the completed working time.

Target time

Displays the planned target time.

HLS-PEP_82.docx

Version: 1.0.23503

Page 60 of 72

  Management Functions for Personnel Scheduling

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

future days. To identify the planned shift type, the system uses both the personal day types and

the personal working time. The application only shows the shift type for planned working days.

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

Payment model

Shows the planned payment model.

Overtime type

Displays the planned overtime type.

Personal working time

Displays any possibly planned personal working time. The personal working time is represented

by an X.

Personal working time day type

Displays any possibly planned personal working time day type.

HLS-PEP_82.docx

Version: 1.0.23503

Page 61 of 72

  Management Functions for Personnel Scheduling

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

after the labor time calculation has been carried out.

If you only change the period for a planned absence, the system only resets the respective period

and recalculates it with the next labor time calculation.

Field descriptions in the Overview of periods tab

Attendance rate

The attendance rate is calculated from the sum of the target time and/or normal time of the employees

planned to  be  present divided by the sum of the target time and/or normal time of all employees.

When half days are off, the system only allows for the duration of the planned attendance time.

HLS-PEP_82.docx

Version: 1.0.23503

Page 62 of 72

  Management Functions for Personnel Scheduling

The result is displayed as a percentage and rounded (without decimal places) before totaling the first

shift.

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

 Reset labor time calculation

Click this button to call the function Reset labor time calculation

 Absence planning

Click this button to call the absence planning.

 Year overview

Click this button to call the  Year overview. This button is only available if the  Year overview tab is

activated.

HLS-PEP_82.docx

Version: 1.0.23503

Page 63 of 72

  Management Functions for Personnel Scheduling

 Current account balances

Click this button to call the application Current account balances

 Labor time schedule

Click this button to call the labor time schedule.

Settings for personnel scheduling

 Settings

Click this button to call up the settings for personnel scheduling.

Field description

Identification of available staff on the basis of target time/ normal time

If you have to plan additional shifts on the weekend or on days off, it may be required that the available

staff be identified based on the normal time because on such days there is usually no planned target

time. For flextime and flexible shift day types, the normal start and end time specify the duration of

the normal time. Note that this setting also specifies how the planned absences are displayed. For

example, leave is also displayed on weekends although it is not set off in the day evaluation due to

the missing target time. The display is updated only after you have refreshed the data.

HLS-PEP_82.docx

Version: 1.0.23503

Page 64 of 72

  Management Functions for Personnel Scheduling

Selection for planning

Use this option in the planning of a shift type to specify if only those shift types contained in the current

planning are to be displayed via the context menu or if a selection can be made from all of the shift

types available in the working time day types. The number of shift types to be displayed is limited to

10.

Shift type - case sensitive

In  totaling  the  employees,  depending  on  the  setting,  the  shift  types  are  not  case  sensitive.  For

example, the number of shifts identified by "F" and "f" is displayed as a common total.

Attendance rate

Use this option to specify for the logged in user if the attendance rate should be displayed. The setting

Identification of available staff on the basis of target time/ normal time specifies if the normal time or

the target time will be set off.

The settings for the display in personnel scheduling are stored per user.

HLS-PEP_82.docx

Version: 1.0.23503

Page 65 of 72

  Management Functions for Personnel Scheduling

17  Labor Time Schedule

Overview

HYDRA menu

Human resources management  Planning  Labor time schedule

FEDRA menu

Advanced resource planning  Master data  Labor time schedule

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

HLS-PEP_82.docx

Version: 1.0.23503

Page 66 of 72

  Management Functions for Personnel Scheduling

Integration

Employees  can  view  their  shift  plan  via  the  PZE  terminal.  The  configuration  is  described  in  the

documentation dealing with the terminal shift plan (only applicable if HYDRA is used).

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

If you group the Labor time schedule by a column, the columns Available, Not available, Day off show

how many employees are available or not.

Absence category

Select the Absence category to show the columns for absence times.

Absence 2 category

Select the Absence 2 category to show the columns for the second absence that is planned.

On-call duty category

Select the On-call duty category to show the columns for on-call duty times in the labor time schedule.

If  you  group the  Labor time schedule by  a column, the column On-call duty shows the number of

employees with planned on-call duty.

Working time category

Select  the  Working  time  category  to  show  information  on  the  target  time,  standard  time,  breaks,

beginning and end of working time.

HLS-PEP_82.docx

Version: 1.0.23503

Page 67 of 72

  Management Functions for Personnel Scheduling

Day types category

Select the Day types category to show the columns for the planned working time type, payment day

type and the overtime type.

Personal day types category

Select the Personal day types category to show information on the planned personal day types for

working time, shift type and payment.

Personal models category

Select the Personal models category to show information on the planned personal models for working

time, the shift rhythm, payment and overtime.

Additional info category

Select the Additional information category to show additional information from the HR master.

The  labor  time  schedule  also  integrates  the  settings  for  the  shift  type  and  the  identification  of

available staff from personnel scheduling.

The columns that include personal data from the HR master (e.g. department, activity) always

show the data valid for each person on the first day of the selected period.

HLS-PEP_82.docx

Version: 1.0.23503

Page 68 of 72

  Management Functions for Personnel Scheduling

18  Workforce Requirements of Workplaces

Overview

HYDRA menu

FEDRA menu

Master data  Workplaces/machines  Workforce requirements of
workplaces

Advanced Resource Planning  Master data  Workforce requirements of
workplaces

Transaction code

wpqual

Function authorization  wpqual

Purpose

Use  this  application  to  define  the  personnel  requirements  of  workplaces.  For  each  workplace,  you  can

define the requirements for multiple qualifications.

In case you have purchased the license Identification of workforce requirements depending on

the order (PEP-AEP), you can define personnel requirements subject to the planned operations

instead of the workplaces.

Requirements

You have created the workplace/machine and the qualification.

Field descriptions

Valid from, valid until

Validity period of the personnel requirement.

Without date specification => unlimited validity

Valid from - until

=> restricted to a date range

Valid from

Valid until

=> Workforce requirements apply as of the specified date

=> Workforce requirements apply until the specified date

Workforce requirements

You can enter the workforce requirements for producing an operation with 2 decimal places.

Assign automatically

You can specify  here  if the workplace is to  be assigned automatically. The automatic assignment

function does not integrate workplaces where this option is not enabled. This configuration overrides

the setting of the same name in the qualifications.

HLS-PEP_82.docx

Version: 1.0.23503

Page 69 of 72

  Management Functions for Personnel Scheduling

You have to define the personnel requirements and a shift model for the workplace in order to

ensure proper planning.

HLS-PEP_82.docx

Version: 1.0.23503

Page 70 of 72

  Management Functions for Personnel Scheduling

19  Staff Schedule of the Terminal

Overview

Menu

System administration  Terminals  Terminal configuration

Transaction code

Function authorization

tc

tc

Use the absence reason keys of the PZE terminal to view your personnel schedule for the next days. The

terminal uses the dynamic dialog P_PEP to show the staff schedules.

HLS-PEP_82.docx

Version: 1.0.23503

Page 71 of 72

  Management Functions for Personnel Scheduling

For this purpose, you have to enter "_PEP" in the "absence reason" field and the corresponding description

of the key in the "absence reason text" field. The below screenshot exemplifies this for the fields "Absence

reason 4" and "Absence reason text 4":

But before the terminal can display the personnel schedule, you have to configure the dynamic

dialogs to activate the dialog (personnel schedule).

Use the dynamic dialogs to configure the following settings for displaying the staff schedule via the terminal:

-  Display duration of the dialog.

-  Displayed period.

-  Option to display the staff schedule via the BDE terminal.

HLS-PEP_82.docx

Version: 1.0.23503

Page 72 of 72

