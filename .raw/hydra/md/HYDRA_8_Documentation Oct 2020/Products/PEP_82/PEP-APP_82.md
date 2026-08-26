Manual

Personnel Scheduling
Reports
PEP-APP 8.2

Version 1.1.23503

Last changed on: 02.10.2020

Personnel Scheduling Reports

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

PEP-APP_82.docx

Version: 1.1.23503

Page 2 of 28

Personnel Scheduling Reports

Contents

1  Personnel Scheduling Reports: Overview ................................................... 4

2  Graphic planning - personnel requirements ................................................. 5

3  Workplace Assignment ................................................................................ 9

4

Individual shift/assignment times ............................................................... 21

5  Workplace Schedule .................................................................................. 25

6  Workforce Requirements Plan ................................................................... 27

PEP-APP_82.docx

Version: 1.1.23503

Page 3 of 28

Personnel Scheduling Reports

1  Personnel Scheduling Reports: Overview

Purpose

This function package contains personnel scheduling evaluation and planning functions.

Implementation notes

You use the function package if:



you  want  to  compare  personnel  requirements  to  available  personnel  capacities  in  graphic

planning;



you want to plan the assignment of employees to workplaces in HYDRA and display the resulting

personnel schedule.

Integration

This  function  package  requires  the  function  package  Management  Functions  for  Personnel  Scheduling

(PEP-VWF).

Features

  Overview of workforce requirements in graphic planning

o  Graphical  display  of  personnel  requirements  with  variable  time  horizon  and  comparison

of available employees with their qualifications

  Workplace assignment

o  Graphical  display  of  workplaces  with  personnel  requirements  and  available  personnel

capacities

o  Shift-related assignment of employees to workplaces

  Workplace schedule

o  Report showing the employees planned on workplaces

  Workforce requirements plan

o  Staff schedule in tabular format listing assigned workplaces

PEP-APP_82.docx

Version: 1.1.23503

Page 4 of 28

Personnel Scheduling Reports

2  Graphic planning - personnel requirements

Overview

HYDRA menu

Production control  Preparations for production  Graphic planning

FEDRA menu

Detailed scheduling  Planning  Graphic planning

Tab

Personnel requirements

Function authorization

perov

You  can  use  the  function  Personnel  requirement  of  the  graphic  planning  to  show  and  compare  the

required and available personnel in a histogram and a table.

PEP-APP_82.docx

Version: 1.1.23503

Page 5 of 28

Personnel Scheduling Reports

Requirements

If you want to show the planned personnel capacities, you have to make sure that the absence and shift

planning  are  maintained  properly  in  HYDRA.  Usually,  you  can  do  this  in  the  labor  time  maintenance

application.

In  addition,  you  have  to  define  personnel  requirements.  To  do  so,  you  can  choose  from  the  following

three  options.  Irrespective  of  how  the  personnel  requirements  are  defined,  the  system  only  generates

personnel requirements if operations are planned.

  Workforce requirements of workplaces

  Workforce  requirements  defined  by  the  machine/operator  relation  (M/O  relation  for  setup,  M/O

relation for production) of operations

  Workforce requirements defined by the  production resources and tools (resource types PRU for

setup and PER for production)

By default, the system only shows the personnel requirements if personnel is available. Use the following

INI entry to ignore the personnel availability. If you use this INI entry, the system will show the personnel

requirements even if no personnel is available. Note: If you enable this INI entry and personnel is

available, the system will not show the available personnel.

INI entry:

  Name: HLS

  Section: SCHEDULING

  Key: IGNORE_PERSONNEL_AVAILABILITY

  Value: 1

  Active: Enable/check the "active" checkbox

Toolbar

The toolbar tab Personnel requirement provides the following functions:

Histogram

Use this button to show or hide the histogram of the required and available personnel.

Table view

Use this button to show or hide the table view of the required and available personnel.

PEP-APP_82.docx

Version: 1.1.23503

Page 6 of 28

Personnel Scheduling Reports

Qualification

You can restrict the displayed personnel requirements to one or multiple qualifications. Displaying

all qualifications shows whether enough personnel is available. If you restrict the displayed data to

one qualification, you can check if enough employees with this qualification are available.

Legend

If activated, the histogram shows different colors depending on whether:

- personnel requirements are met

- personnel requirements are not met

- too many employees are planned

Color

Meaning

Personnel requirements are not met.

Personnel requirements are exceeded.

Personnel requirements are met.

Detail application: Histogram

The histogram graphically displays the required and available personnel. The histogram uses the colors

illustrated in the legend to highlight if personnel requirements are exceeded or not met. The Y axis shows

the number of staff that is available or required over time.

Hold the left mouse button and increase the scale of the workforce requirements (Y axis) if you

want to increase the dialog that shows the personnel requirements histogram.

Detail application: Table view

The table view compares the required and available personnel in table format. The application shows the

totals of required and available personnel in hours for each day.

Example: a person has a planned working time of 8 hours a day. An OP that requires 1 person and takes

5 hours is planned during these 8 hours. Results for this day:

Available personnel: 8 hours

Required personnel: 5 hours

Difference: 3 hours.

PEP-APP_82.docx

Version: 1.1.23503

Page 7 of 28

Personnel Scheduling Reports

Personnel  requirements  are  added  up,  if  you  plan  multiple  operations  simultaneously  for  one

workplace.

PEP-APP_82.docx

Version: 1.1.23503

Page 8 of 28

Personnel Scheduling Reports

3  Workplace Assignment

Overview

HYDRA menu

Production  control    Workforce  requirements  planning    Workplace
assignment

Human  resources  management    Workforce  requirements  planning  
Workplace assignment

FEDRA menu

Advanced resource planning  Planning  Workplace assignment

Transaction code

wpas

Function authorization  wpas

Staff  can  be  planned  on  workplaces  using  the  workplace  Assignment  function.  Planning  can  be

performed manually as well as automatically.

Display

The  center  of  the  application  shows  the  workplaces  including  the  required  qualifications  grouped  by

workplace groups. The workforce requirements for the relevant qualification are shown in the bar for each

shift. The bar length depends on the planned year model or on the year model of the workplace. Only the

workplaces for required workforce are displayed.

PEP-APP_82.docx

Version: 1.1.23503

Page 9 of 28

Personnel Scheduling Reports

The "workplace assignment" does not allow for the breaks resulting from the employees' planned

working  time  and  that  of  workplaces.  Instead,  the  workplace  assignment  plans  entire  shifts  so

employees and workplaces have continuous bars.

The format of the date values displayed on the Gantt chart depends on the format specified by

the operating system. The client format is not relevant.

The  lower  section  of  the  workplace  assignment  shows  the  available  staff  grouped  by  areas  and  the

unavailable  staff  grouped  by  the  abbreviations  for  absence  reasons.  The  bar  length  depends  on  the

standard working times (beginning of normal time and end of normal time) from the planned working time

day type.

A  green  hatched  bar  shows  the  assignment  rate  in  percent  per  shift  at  a  workplace.  The  shift  tooltip

shows the percentage rate as figure. In addition, the planned staff is displayed:

The  tooltip  of  an  assigned  person  provides  information  about  the  person,  their  qualifications  and

assignment:

There are different ways of presenting for the assigned staff:

Presentation

Description

The employee provides the required qualification

The employee does not provide the required qualification

Assigning  the  employee  exceeds  the  workforce  requirements  for  the
workplace

Requirements

If you want to show the planned personnel capacities, you have to make sure that the absence and shift

planning are maintained properly in HYDRA. You can do this in the Personnel scheduling application.

PEP-APP_82.docx

Version: 1.1.23503

Page 10 of 28

Personnel Scheduling Reports

You also have to define personnel requirements. You can do this in three different ways:

  Workforce requirements for workplaces

  Workforce  requirements  defined  by  the  machine/operator  relation  (M/O  relation  for  setup,  M/O

relation for production) of operations

  Workforce requirements defined by the  production resources and tools (resource types PRU for

setup and PER for production)

You  must  plan  operations  in  detail  if  the  planned  operations  should  be  included  in  the  workplace

assignment. You can do this, for example, in "graphic planning". As an alternative, the ERP system might

already have planned the operations in detail to send them to HYDRA.

Please  note  that  "workplace  assignment"  and  "graphic  planning"  should  not  be  used

simultaneously  in  production  preparation.  Inconsistencies  might  occur  if  personnel  and

capacities are planned at the same time, as the "workplace assignment" uses planning data of

"graphic planning".

Selection criteria

The user selects personalized data.  The application provides the following criteria for the user to select:

Qualification

The personnel requirements to be displayed and the available persons can be restricted to specific

qualifications. This field does not act as a selection criterion when you request data, but filters the

qualifications in the data displayed. This allows different  views  of the currently  displayed planning

without having to save the information and request the data again.

Planning profile

Using  the  planning  profile,  personnel  assignment  can  be  restricted  to  specific  workplace  groups

and employees.

This field is only available if the additional function "enhanced selection and visualization"

(PEP-ESV) is available (only applicable if HYDRA is used).

Toolbar

 Zoom in,

 Zoom out

These buttons reduce or increase the displayed workplaces and employees.

PEP-APP_82.docx

Version: 1.1.23503

Page 11 of 28

Personnel Scheduling Reports

 Hide complete assignments

Using  this  button,  you  can  hide  fully  occupied  workplaces  and  employees  in  order  to  get  an

overview  of  open  requirements  and  available  capacities.  Workplaces  and  employees  are

considered being fully assigned, if at least 95% of the requirements and/or capacity are occupied.

Copy assignments

Clicking this button opens a dialog where you can copy the assignment of one period (e.g. a day or

week) to another period:

You  can  restrict  the  copy  option  to  specific  workplace  groups.  If  the  field  "group"  remains  empty,

you copy the assignments of all displayed workplaces.

An error list shows the assignments that could not be copied:

PEP-APP_82.docx

Version: 1.1.23503

Page 12 of 28

After  closing  the  error  list,  the  following  dialog  appears  to  decide  if  you  want  to  copy  the

assignments

despite

the

occurred

errors:

Personnel Scheduling Reports

All  assignments  are  copied  coinciding  with  the  indicated  period.  The  start  period  and  the  target

period for copying must completely coincide with the period selected in the "workplace assignment".

If this is not the case, copying is canceled issuing the error message "invalid period".

 Lock all

When  you  attempt  to  plan  an  employee  on  a  workplace,  the  system  checks  if  another  user  is

currently planning the workplace. If this is the case, the following error message occurs:

"The person ... is locked by user ..."

  and/or

"The workplace ... is locked by user ..."

Using  the  button  "lock  all",  you  can  lock  all  displayed  employees  and  workplaces.  Therefore,  you

can verify at the beginning of planning if all employees and workplaces to be planned are available.

If  you  locked  employees  and  workplaces  (with  your  user  data),  they  are  highlighted  with  green

background  color.  A  red  background  color  indicates  that  employees  and  workplaces  locked  by

another

user.

Upon saving assignments, the following confirmation prompt appears:

"Do you want to release locked staff and workplaces?"

Here  you  can  decide  if  you  want  to  unlock  employees  and  workplaces  or  if  they  should  remain

locked in order to continue planning.

Upon  finishing  the  "workplace  assignment",  the  system  automatically  releases  the  locked

employees and workplaces.

The following entry in the INI configuration disables the option of locking employees and

workplaces  as  well  as  the  check  specifying  if  locks  are  available  in  the  whole  system:

Name:

Section:

Key:

Value:

PEP

WPAS

LOCKING

FALSE

PEP-APP_82.docx

Version: 1.1.23503

Page 13 of 28

Personnel Scheduling Reports

 Settings

Include detail planned operations

If workforce requirements are generated independent of the detail planned operations, only

the workforce requirements are included, which are stored at the workplace for each defined

validity periods. No matter whether operations are scheduled or not.

If  personnel  requirements  are  generated  independent  of  the  detail  planned  operations,  then

only periods are included for the workforce requirements that have scheduled operations (=>

scheduled operations are privotal). There are three options to store workforce requirements.

First name last name or last name, first name

This field defines whether the last name is shown in front of or behind the first name.

Sorting

This option specifies whether the staff grouped by areas is sorted by the personnel number or

by the name for this area.

PEP-APP_82.docx

Version: 1.1.23503

Page 14 of 28

Personnel Scheduling Reports

Use optimized algorithm

This option enables the Optimized, automatic assignment.

The configurations are saved with respect to the user per workplace.

 Automatic workplace assignment

Click this button to call the Automatic workplace assignment.

Save planning

This function saves the current workplace assignment, which is then available to all users.

Personnel scheduling

You can call the application Personnel scheduling with this button.

PEP-APP_82.docx

Version: 1.1.23503

Page 15 of 28

Personnel Scheduling Reports

Manual assignment

Staff  can  be  planned  manually  by  way  of  "drag  &  drop".  To  do  so,  select  the  bar  of  a  person,  hold  the

mouse button down and drag it to the top of a shift for a workplace. The below dialog appears, once you

release the mouse button:

Workplace

Shows the workplace including the required qualification and the open requirements.

Person

Shows the person with the qualification and availability.

Assign person completely

The  person's  available  time  is  completely  assigned  to  the  workplace,  irrespective  of  whether  this

exceeds the workplace requirements or not.

PEP-APP_82.docx

Version: 1.1.23503

Page 16 of 28

Personnel Scheduling Reports

Assign person according to the specifications that follow

The missing assignment is compared to the person's availability and the result is shown in this field.

You can change the suggested value.

If the person does not have the required qualification, this message appears:

It is now up to the user to decide whether or not to perform this assignment.

To remove a person from planning, the personnel bar only has to be selected and dragged back

from the workplace to the pool of staff. As an alternative, you may also open the context menu

by right clicking and selecting the option "cancel assignment".

HYDRA: as of service pack 13

FEDRA: as of version 1.1

You can select a number of people and plan them for a requirement using drag and drop. The

dialog mentioned above is called for each planning action.

Automatic assignment

The below dialog appears when starting automatic workplace assignment:

PEP-APP_82.docx

Version: 1.1.23503

Page 17 of 28

Personnel Scheduling Reports

Do not change planned staff, replan all

These  options  specify  whether  already  existing  assignments  are  to  be  kept  by  automatic

assignment or whether they are to be removed from planning to be planned once more.

Shift times of staff and workplace must match

Staff  is  only  planned  on  workplaces  with  shift  times  matching  the  employee's  planned  standard

working time.

Assign staff with lower qualification to remaining workplaces

All  staff  qualifications  are  taken  into  account  as  part  of  the  assignment.  Assignment  is  performed

sorted  by  the  order  of  priority  of  the  employee's  qualifications.  If  this  option  is  not  enabled,  only

qualifications of the highest order of priority (99) are assigned.

Optimized, automatic assignment

The optimized, automatic assignment function can be enabled by the settings.

In contrast to the automatic assignment function described above that only considers the order of priority

for qualifications, the optimized, automatic assignment function also considers the employee's flexibility.

This is intended to achieve a higher assignment rate for automatic planning. The optimized assignment

function works as follows:

Plan staff with only one assignment option

At  first  the  system  checks  whether  there  is  staff  with  only  one  possible  assignment  option.  This

assignment is performed regardless of whether there are employees who have a higher priority for

the  required  qualification.  Consequently,  this  person  (with  only  one  assignment  option)  does  not

remain unassigned.

PEP-APP_82.docx

Version: 1.1.23503

Page 18 of 28

Personnel Scheduling Reports

Assignment of workplaces with only one possible operator

Then the system checks whether a  qualification required by a  workplace can only  be met by one

employee. This employee is assigned to the workplace, irrespective of whether this person still has

additional qualifications of a higher order of priority. Consequently, the qualification required by this

workplace does not remain unassigned.

Assignment due to the order of priority of qualifications

Just  as  it  is  the  case  with  the  standard,  automatic  assignment  function,  now  the  employees  are

assigned to the workplaces sorted by the order of priority of their qualifications. However, after each

assignment the two steps described above are carried out again. The reason for it  is that    since

the assignment of an employee can result in persons with only one remaining possible assignment

or workplaces with only one possible operator being available.

The  optimized  algorithm  is  only  used  if  the  option  "Assign  staff  with  lower  qualification  to

remaining workplaces" is enabled for automatic assignment.

Replan assignments

If  you  want  to  change  planning  for  an  employee  assigned  to  a  workplace  and  replan  this  employee  to

another workplace, you can do it by "drag & drop" as it is the  case with manual assignments. Once you

release the mouse button, the same dialog occurs as with manual assignments.

Individual shift times

Using  Individual  shift  times,  you  can  define  additional  working  times  and  times  off  deviating  from  the

planned shift model for individual workplaces.

In  order  to  change  a  complete  or  parts  of  the  shift  and  to  change  it  into  "time  off",  just  right-click  the

relevant shift and select the entry "Insert individual shift time" from the context menu. The following dialog

opens where you can enter the period for the time off and a comment:

PEP-APP_82.docx

Version: 1.1.23503

Page 19 of 28

Personnel Scheduling Reports

In order to add additional working time, just right-click a time off and select the entry "Insert individual shift

time"  from  the  context menu.  Then  hold  the  left mouse  button  down  and  drag  the  period  for  which  you

want to add the additional working time. Once you have released the mouse button, the above-mentioned

dialog  opens  where  you  can  correct  the  time  and  enter  a  comment.  Here,  you  must  enable  the  option

"working time" in order to specify that it is planned working time and no time off.

Individual shift times can be changed and deleted in the application Individual shift times.

PEP-APP_82.docx

Version: 1.1.23503

Page 20 of 28

Personnel Scheduling Reports

4

Individual shift/assignment times

Overview

Menu

Production control  Preparations for production  Individual shift/assignment times

Transaction code

mdistmf

Function authorization  mdistmf.*

Purpose

You  can  define  individual  shift/assignment  times  within  the  Graphic  planning  and  the  Workplace

assignment  and  specify  for  a  workplace  within  a  specific  period  of  time,  whether  this  time  is  to  be

considered as working time or idle time.

This  enables  short-term  modifications  with  respect  to  the  availability  of  workplaces,  without  having  to

change the planned shift model.

This  application  manages  times  without  shift  or  shift  times  that  have  been  assigned  to  one  or  several

workplaces within the functions Graphic planning or Workplace assignment.

Integration

Normally,  individual  shift/assignment  times  are  directly  defined  by  the  corresponding  functionality

provided in the Graphic planning or the Workplace assignment.

These  individual  shift/assignment  times  do  not  affect  collection  and  posting  within  the

scope of shop floor data collection.

Requirements

The product group Graphic planning or Workplace assignment is in use.

Selection criteria

The application provides the following selection criteria:

Group

You can restrict the entries to a specific group by using this combo box.

Workplace

Enter a workplace to view only entries for this workplace.

PEP-APP_82.docx

Version: 1.1.23503

Page 21 of 28

Period from

Optionally,  you can use this input field to enter the beginning of a period as of which you want to

Personnel Scheduling Reports

display the entries in the application.

Working time

This option selects

times without shift only

working times only

both times

Please  note  that  3  states  are  available  with  this  checkbox.  If  you  require  data  that  is

missing, have a look at the checkbox setting. We recommend to set the checkbox to the

option

.

Active

You  can  enable/disable  individual  shift/assignment  times.  The  Graphic  planning  does  not  include

disabled entries.

Please  note  that  3  states  are  available  with  this  checkbox.  If  you  require  data  that  is

missing, have a look at the checkbox setting. We recommend to set the checkbox to the

option

.

Field descriptions

Workplace

Workplace for which the entry (individual shift/assignment time) has been created.

Group

Group of the workplace for which the entry (individual shift/assignment time) has been created.

Period from

Point in time when the individual shift/assignment time begins.

Period until

Point in time when the individual shift/assignment time ends.

Working time

This option describes, if it is

a time without shift

working time.

If it is not working time, but a time without shift, the workplace capacity is not available during this

period. Therefore, you cannot plan an operation.

PEP-APP_82.docx

Version: 1.1.23503

Page 22 of 28

Personnel Scheduling Reports

Active

You  can  enable/disable  individual  shift/assignment  times.  The  Graphic  planning  does  not  include

disabled entries.

We recommend to set this option in general to

.

Comment

You can store a short comment for this individual shift time including further details.

In  the  Graphic  planning,  you  can  additionally  specify  a  color  for  the  time  without  shift  when

defining an individual shift/assignment time.

In  the  Graphic  planning,  you  can  display  the  comment  that  is  stored  for  an  individual  shift  in  the

tooltip of the corresponding individual shift (as of HLS 8.2). Enable (disable) the tooltip using an INI

data entry.

  Name: HLS

  Section: SCHEDULING

  Key: DISPLAY_TOOLTIP_FOR_ISTMF

  Value: J

  Active: [selected]

If  you  enable  the  tooltip  display,  the  presentation  color  of  times  without  shift  changes  in  the

Graphic  planning.  In  addition,  the  workplace  bars  are  displayed  one  level  before  the  times

without shift.

Editing functions

Use the available buttons to create or edit individual shift/assignment times.

Only one entry can exist at a workplace for each period. If you make an entry and the system detects that

an entry already exists for this period, you can either delete the previous entry or cancel this entry.

PEP-APP_82.docx

Version: 1.1.23503

Page 23 of 28

Personnel Scheduling Reports

If multiple individual shift times exist, this dialog is opened for each existing shift time, and the user can

decide whether or not to delete the entries.

Please be careful not to define overlapping periods for one workplace.

These  additional  shift  times  are  only  used  in  Shop  Floor  Scheduling,  not  as  part  of  data

collection.

The  user  can  only  change,  view  and  delete  machines  that  belong  to  the  responsibility  area

he/she is authorized for.

PEP-APP_82.docx

Version: 1.1.23503

Page 24 of 28

Personnel Scheduling Reports

5  Workplace Schedule

Overview

Menu

Production control -> Workforce requirements planning -> Workplace schedule

Human  resources  management  ->  Workforce  requirements  planning  ->
Workplace schedule

Transaction code

wpsch

Function authorization  wpsch

The application "Workplace schedule" shows equivalent to the Workforce requirements plan the result of

the workplace assignment. The system displays the "Workplace schedule" as a graphic in form of a report

whereas  the  "Workforce  requirements  plan"  is  displayed  as  a  table.  Another  difference  is  that  the

"Workforce requirement plan" shows the assignment from the point of view of the employee (when do I

work and where / when am I off work) and the "Workplace schedule" relates to the workplace (who works

in which shift and the relevant qualifications).

PEP-APP_82.docx

Version: 1.1.23503

Page 25 of 28

The  display  of  the  workplace  assignment  is  grouped  by  workplace  group  and  date.  When  the  system

displays workplaces and the assigned qualifications it is within such a constellation. On the right, you can

Personnel Scheduling Reports

find the shift times and the personnel planned per shift.

Selection criteria

The application provides the following selection criteria:

Planning profile

You can select a planning profile to restrict the workplace schedule displayed.

Date from, to

You can select a period to display the workplace schedule.

PEP-APP_82.docx

Version: 1.1.23503

Page 26 of 28

Personnel Scheduling Reports

6  Workforce Requirements Plan

Summary

Menu

Production  Control    Personnel  Scheduling    Workforce  Requirements
Plan

Human  Resource  Management    Personnel  Scheduling    Workforce
Requirements Plan

Transaction code

pesch

Function authorization

pesch

The  Workforce  Requirements  Plan  display  shows  which  person  is  assigned  to  which  workplace  and  if

there are still any unassigned, free times among the employees.

Selection criteria

The following selection criteria are available in the application:

PEP-APP_82.docx

Version: 1.1.23503

Page 27 of 28

Personnel Scheduling Reports

Person from/ to, company, area, cost center

Selection of the people to be displayed

Date from/ to

Period for which the personnel schedule is to be displayed.

Workplace

Machine/ workplace

Planning profile

The display of the personnel schedule can be limited using a planning profile. This field can only be

accessed if the additional function Advanced selection and visualization is present.

Summarize absences

Contiguous days with absences for a person are output in a row with the start and end date.

Display days without normal time

The list also includes days off on which a normal time is not stored in the working time day type of

HYDRA-PZE. In this way, in a longer evaluation period one calendar view per person is possible.

If the personnel schedule was limited using a planning profile, only those days are displayed on

which the employees have an assignment for a workplace of the corresponding planning profile.

The  value  in  the  Free  time  column  contains  only  the  assignments  within  this  planning  profile

and for this reason it is only correct if the employee was not assigned outside of the planning

profile.

PEP-APP_82.docx

Version: 1.1.23503

Page 28 of 28

