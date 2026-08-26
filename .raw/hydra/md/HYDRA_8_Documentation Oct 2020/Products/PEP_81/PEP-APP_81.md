Manual

Personnel Scheduling
Reports
PEP-APP 8.1

Version 1.0.4788

Last changed on: 19.06.2020

Personnel Scheduling Reports

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

PEP-APP_81.docx

Version: 1.0.18468

Page 2 of 17

Personnel Scheduling Reports

Contents

1  Personnel Scheduling Reports - Overview .................................................. 4

2  Graphic Planning - Workforce Requirements .............................................. 5

3  Workplace Assignment ................................................................................ 8

4  Workforce Requirements Plan ................................................................... 16

PEP-APP_81.docx

Version: 1.0.18468

Page 3 of 17

Personnel Scheduling Reports

1  Personnel Scheduling Reports - Overview

Purpose

This function package contains personnel scheduling evaluation and planning functions.

Implementation Considerations

Use this function package to:





compare the personnel requirement with the available personnel capacity in graphic planning;

schedule  the  assignment  of  employees  to  workplaces  in  HYDRA  and  display  the  resulting

personnel schedule.

Integration

Use  of  this  function  package  requires  function  package  Personnel  Scheduling  Administration  Functions

(PEP-VWF).

Features

  Overview of workforce requirements in graphic detailed scheduling

o  Graphical  display  of  shift  related  personnel  requirement  with  variable  time  horizon  and

comparison of available people with their qualifications

  Staffing

o  Graphical  display  of  workplaces  with  personnel  requirement  and  available  personnel

capacity

o  Shift related assignment of employees to workplaces

  Personnel schedule

o  Personnel schedule in tabular format with a list of assigned workplaces

PEP-APP_81.docx

Version: 1.0.18468

Page 4 of 17

Personnel Scheduling Reports

2  Graphic Planning - Workforce Requirements

Overview

Menu

Index tab

Production Control  Production Preparation  Graphic Planning

Personnel Requirement

Function authorization

perov

The function "Personnel Requirement" can be used to display the personnel requirement as a histogram

within the graphic planning and to compare this to the planned available personnel.

PEP-APP_81.docx

Version: 1.0.18468

Page 5 of 17

Depending  on  whether  the  personnel  requirement  can  be  met  or  whether  too  many  people  have  been

scheduled, the resulting areas are displayed in different colors:

Personnel Scheduling Reports

Color

Meaning

The personnel requirement is not met

Too many people scheduled

The personnel requirement is met

The chart helps the user to schedule orders in periods with sufficient available personnel capacity.

Should  more  than  one  OP  be  scheduled  for  a  workplace  (HLS),  the  personnel  requirement  for

these OPs is summed.

Prerequisite

A prerequisite to display the planned personnel capacity is that the absence and shift planning data has

been maintained correctly in HYDRA. This is usually done through the Labor time maintenance.

Additionally,  the  personnel  requirement  must  be  defined.  This  can  be  performed  using  one  of  3

procedures:

  Workforce requirements of workplaces

  Personnel  requirement  in  the  Machine/operator  relation  (M/O  relation  setup,  M/O  relation

production) of the Operations

  Personnel  requirement  in  the  Production  resources  and  tools  (Resource  types)  PRU  for  setup

and PER for completion)

Tool bar

The index tab Personnel Requirement contains the following functions:

 Display Personnel Requirement

This button is used to switch the personnel requirement histogram on and off. The orders must be

reloaded after switching the histogram on to obtain the orders' personnel requirement.

PEP-APP_81.docx

Version: 1.0.18468

Page 6 of 17

Personnel Scheduling Reports

Qualification

The  personnel  requirement  display  can  be  restricted  to  one  or  more  qualifications.  Displaying  all

qualifications  shows  whether  enough  personnel  is  available.  Restricting  the  display  to  a

qualification shows whether enough personnel with this qualification is available.

PEP-APP_81.docx

Version: 1.0.18468

Page 7 of 17

Personnel Scheduling Reports

3  Workplace Assignment

Summary

Menu

Production  Control    Workforce  Requirements  Planning    Workplace
Assignment

Human  Resources  Management    Workforce  Requirements  Planning  
Workplace Assignment

Transaction code

wpas

Function authorization  wpas

Staff can be planned on workplaces using the workplace assignment function. Planning can be performed

manually as well as automatically.

Display

The  center  of  the  application  shows  the  workplaces  including  the  required  qualifications  grouped  by

workplace  groups.  The  workforce  requirements  for  the  relevant  qualification  are  shown  for  each  shift

within the bar. The bar length depends on the planned year model or the year model of the  workplaces.

Only the workplaces requiring personnel are displayed.

PEP-APP_81.docx

Version: 1.0.18468

Page 8 of 17

Personnel Scheduling Reports

The breaks resulting from the employees' planned working time and that of workplaces are not

considered  in  "workplace  assignment".  Workplace  assignment  plans  whole  shifts  instead  to

prevent the bars for employees and workplaces from being interrupted.

The  lower  section  of  the  workplace  assignment  shows  the  available  staff  grouped  by  areas  and  the

unavailable staff grouped by the abbreviations for absence reasons. The bar length depends on normal

working times (beginning of normal time and end of normal time) from the planned working time day type.

A  green  bar  (hatched)  shows  the  assignment  rate  in  percent  per  shift  at  a  workplace.  The  shift  tooltip

shows the percentage rate as figure. In addition, the planned staff is displayed:

The  tooltip  of  an  assigned  person  provides  information  about  the  person,  their  qualifications  and

assignment:

There are different ways of presentation for the assigned staff:

Presentation

Description

The person provides the required qualification

The person does not provide the required qualification

The assignment exceeds the workforce requirements of the workplace

Prerequisites

Absence time planning and shift planning need to be maintained properly in HYDRA to be able to show

the planned personnel capacities. As a general rule, this is done in labor time maintenance.

In addition, the workforce requirements need to be defined. There are three possibilities:

  Workforce requirements of workplaces

PEP-APP_81.docx

Version: 1.0.18468

Page 9 of 17

Personnel Scheduling Reports

  Workforce requirements of the machine/operator relation (M/O relation for setup, M/O relation for

production) of operations

  Workforce  requirements  of  production  resources  and  tools  (resource  types  PRU  for  setup  and

PER for production)

Operations  have  to  be  planned  in  detail  if  the  planned  operations  are  to  be  taken  into  account  by

workplace  assignment.  This  can  be  performed,  for  example,  in  graphic  planning.  As  an  alternative,  the

ERP system might already have planned the operations in detail to send them to HYDRA.

Selection criteria

The application provides the following selection criteria:

Qualification

The workforce requirements to be displayed can be restricted to specific qualifications.

Planning profile

Using  the  planning  profile,  personnel  assignment  can  be  restricted  to  specific  workplace  groups

and employees.

This field is only available if the additional function "enhanced selection and visualization"

(PEP-ESV) is available.

Toolbar

 Zoom in,

 Zoom out

These buttons reduce or increase the displayed workplaces and persons.

PEP-APP_81.docx

Version: 1.0.18468

Page 10 of 17

Personnel Scheduling Reports

 Settings

Consider assignments of shop floor scheduling

If this option is enabled only those shifts for which an operation is planned are shown for the

workplaces.  If  it  is  not  the  entire  shift  that  is  assigned  to  operations,  the  workforce

requirements of the shift will be reduced proportionately.

First name last name or last name, first name

This field defines whether the last name is shown in front of or behind the first name.

Sorting

This option specifies whether the staff grouped by areas is sorted by the personnel number or

by the name within the relevant area.

PEP-APP_81.docx

Version: 1.0.18468

Page 11 of 17

Personnel Scheduling Reports

Use optimized algorithm

This option enables the optimized, automatic assignment.

The configurations are saved with respect to the user per workplace.

 Automatic workplace assignment

Calls up the automatic workplace assignment

 Save planning

This function saves the current workplace assignment, which is then available to all users.

PEP-APP_81.docx

Version: 1.0.18468

Page 12 of 17

Personnel Scheduling Reports

Manual assignment

Staff  can  be  planned  manually  by  way  of  "drag  &  drop".  To  do  so,  select  the  bar  of  a  person,  hold  the

mouse button down and drag it to the top to a shift of a workplace. The below dialog appears, once the

mouse button has been released:

Workplace

Shows the workplace including the required qualification and the open requirements.

Person

Shows the person with the qualification and availability.

Assign person completely

The  person's  available  time  is  completely  assigned  to  the  workplace,  irrespective  of  whether  this

exceeds the workplace requirements or not.

Assign person according to the specifications that follow

The missing  assignment  is  compared  with  the  person's  availability  and  the  result  is  shown  in  this

field. The suggested value may be changed.

PEP-APP_81.docx

Version: 1.0.18468

Page 13 of 17

If the person does not have the required qualification, this message appears:

Personnel Scheduling Reports

It is now up to the user to decide whether or not to perform this assignment.

To remove a person from planning, the personnel bar only has to be selected and dragged back

from the workplace to the pool of staff.

Automatic assignment

The below dialog appears when starting automatic workplace assignment:

Do not change planned staff, replan all

These  options  specify  whether  already  existing  assignments  are  to  be  kept  by  automatic

assignment or whether they are to be removed from planning to be planned once more.

Shift times of staff and workplace must match

Staff  is  only  planned  on  workplaces  with  shift  times  matching  the  employee's  planned  normal

working time.

Assign staff with lower qualification to remaining workplaces

All  staff  qualifications  are  taken  into  account  as  part  of  the  assignment.  Assignment  is  performed

sorted  by  the  order  of  priority  of  the  employee's  qualifications.  If  this  option  is  not  enabled,  only

qualifications of the highest order of priority (99) are assigned.

PEP-APP_81.docx

Version: 1.0.18468

Page 14 of 17

Personnel Scheduling Reports

Optimized, automatic assignment

The optimized, automatic assignment function can be enabled by the #settings.

In contrast to the automatic assignment function described above that only considers the order of priority

for qualifications, the optimized, automatic assignment function also considers the person's flexibility. This

is to achieve a higher assignment rate for automatic planning. The optimized assignment function works

as follows:

Plan staff with only one assignment option

At  first  it  is  checked  whether  there  is  staff  with  only  one  possible  assignment  option.  This

assignment  is  performed,  irrespective  of  whether  there  are  employees  having  a  higher  order  of

priority for the required qualification. Consequently, this person (with only  one  assignment option)

does not remain unassigned.

Assignment of workplaces with only one possible operator

Then  it  is  checked  whether  a  qualification  required  by  a  workplace  can  only  be  met  by  one

employee. This employee is assigned to the workplace, irrespective of whether this person still has

additional qualifications of a higher order of priority. Consequently, the qualification required by this

workplace does not remain unassigned.

Assignment due to the order of priority of qualifications

Just  as  it  is  the  case  with  the  "normal"  automatic  assignment  function,  now  the  employees  are

assigned  to  the  workplaces  sorted  by  the  order  of  priority  of  their  qualifications.  However,  every

time  an  assignment  is  made,  the  two  previous  steps  are  taken  again.  For  by  assigning  an

employee,  there  might  again  be  persons  with  only  one  possible  assignment  option  or  workplaces

with only one possible operator.

The  optimized  algorithm  is  only  used  if  the  option  "Assign  staff  with  lower  qualification  to

remaining workplaces" is enabled for automatic assignment.

PEP-APP_81.docx

Version: 1.0.18468

Page 15 of 17

Personnel Scheduling Reports

4  Workforce Requirements Plan

Summary

Menu

Human  Resource  Management    Personnel  Scheduling    Personnel
Schedule

Transaction code

pesch

Function authorization

pesch

The personnel schedule display shows which person is assigned to which workplace and if there are still

any unassigned, free times among the employees.

Selection criteria

The following selection criteria are available in the application:

Person from/ to, company, area, cost center

Selection of the people to be displayed

PEP-APP_81.docx

Version: 1.0.18468

Page 16 of 17

Personnel Scheduling Reports

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

PEP-APP_81.docx

Version: 1.0.18468

Page 17 of 17

