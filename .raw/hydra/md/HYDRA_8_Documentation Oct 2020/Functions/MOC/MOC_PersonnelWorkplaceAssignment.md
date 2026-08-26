Workplace Assignment

1  Workplace Assignment

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

Staff can be planned on workplaces using the workplace Assignment function. Planning can be performed

manually as well as automatically.

MOC_PersonnelWorkplaceAssignment.docxVersion: 1.5.23496

Page 1 of 13

Workplace Assignment

Display

The  center  of  the  application  shows  the  workplaces  including  the  required  qualifications  grouped  by

workplace groups. The workforce requirements for the relevant qualification are shown in the bar for each

shift. The bar length depends on the planned year model or on the year model of the workplace. Only the

workplaces for required workforce are displayed.

The "workplace assignment" does not allow for the breaks resulting from the employees' planned

working  time  and  that  of  workplaces.  Instead,  the  workplace  assignment  plans  entire  shifts  so

employees and workplaces have continuous bars.

The format of the date values displayed on the Gantt chart depends on the format specified by the

operating system. The client format is not relevant.

The  lower  section  of  the  workplace  assignment  shows  the  available  staff  grouped  by  areas  and  the

unavailable  staff  grouped  by  the  abbreviations  for  absence  reasons.  The  bar  length  depends  on  the

standard working times (beginning of normal time and end of normal time) from the planned working time

day type.

A green hatched bar shows the assignment rate in percent per shift at a workplace. The shift tooltip shows

the percentage rate as figure. In addition, the planned staff is displayed:

The  tooltip  of  an  assigned  person  provides  information  about  the  person,  their  qualifications  and

assignment:

There are different ways of presenting for the assigned staff:

Presentation

Description

The employee provides the required qualification

The employee does not provide the required qualification

MOC_PersonnelWorkplaceAssignment.docxVersion: 1.5.23496

Page 2 of 13

Workplace Assignment

Assigning  the  employee  exceeds  the  workforce  requirements  for  the
workplace

Requirements

If you want to show the planned personnel capacities, you have to make sure that the absence and shift

planning are maintained properly in HYDRA. You can do this in the Personnel scheduling application.

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

simultaneously in production preparation. Inconsistencies might occur if personnel and capacities

are  planned  at  the  same  time,  as  the  "workplace  assignment"  uses  planning  data  of  "graphic

planning".

Selection criteria

The user selects personalized data.  The application provides the following criteria for the user to select:

Qualification

The personnel requirements to be displayed and the available persons can be restricted to specific

qualifications. This field does not act as a selection criterion when you request data, but filters the

qualifications in the data displayed. This allows different  views  of the currently  displayed planning

without having to save the information and request the data again.

Planning profile

Using the planning profile, personnel assignment can be restricted to specific workplace groups and

employees.

This field is only available if the additional function "enhanced selection and visualization"

(PEP-ESV) is available (only applicable if HYDRA is used).

MOC_PersonnelWorkplaceAssignment.docxVersion: 1.5.23496

Page 3 of 13

Toolbar

Workplace Assignment

 Zoom in,

 Zoom out

These buttons reduce or increase the displayed workplaces and employees.

 Hide complete assignments

Using this button, you can hide fully occupied workplaces and employees in order to get an overview

of  open  requirements  and  available  capacities. Workplaces  and  employees  are  considered  being

fully assigned, if at least 95% of the requirements and/or capacity are occupied.

The  button  "hide  complete  assignments"

is  only  available

if

the  modification

wpasHideFullAssignments is enabled.

Copy assignments

Clicking this button opens a dialog where you can copy the assignment of one period (e.g. a day or

week) to another period:

MOC_PersonnelWorkplaceAssignment.docxVersion: 1.5.23496

Page 4 of 13

You can restrict the copy option to specific workplace groups. If the field "group" remains empty, you

copy the assignments of all displayed workplaces.

An error list shows the assignments that could not be copied:

Workplace Assignment

After closing the error list, the following dialog appears to decide if you want to copy the assignments

despite

the

occurred

errors:

All assignments are copied coinciding with the indicated period. The start period and the target period

for copying must completely coincide with the period selected in the "workplace assignment". If this

is not the case, copying is canceled issuing the error message "invalid period".

The button "Copy assignments" is only available if the modification wpasCopyAssignments

is enabled.

MOC_PersonnelWorkplaceAssignment.docxVersion: 1.5.23496

Page 5 of 13

Workplace Assignment

 Lock all

When you attempt to plan an employee on a workplace, the system checks if another user is currently

planning the workplace. If this is the case, the following error message occurs:

"The person ... is locked by user ..."

  and/or

"The workplace ... is locked by user ..."

Using the button "lock all", you can lock all displayed employees and workplaces. Therefore, you can

verify  at  the  beginning  of  planning  if  all  employees  and  workplaces  to  be  planned  are  available.

If  you  locked  employees  and  workplaces  (with  your  user  data),  they  are  highlighted  with  green

background  color.  A  red  background  color  indicates  that  employees  and  workplaces  locked  by

another

user.

Upon saving assignments, the following confirmation prompt appears:

"Do you want to release locked staff and workplaces?"

Here you can decide if you want to unlock employees and workplaces or if they should remain locked

in order to continue planning.

Upon finishing the "workplace assignment", the system automatically releases the locked employees

and workplaces.

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

The button "Locks all" is only available if the modification wpasLocking is enabled.

MOC_PersonnelWorkplaceAssignment.docxVersion: 1.5.23496

Page 6 of 13

 Settings

Workplace Assignment

Include detail planned operations

If workforce requirements are generated independent of the detail planned operations, only

the workforce requirements are included, which are stored at the workplace for each defined

validity periods. No matter whether operations are scheduled or not.

If personnel requirements are generated independent of the detail planned operations, then only

periods  are  included  for  the  workforce  requirements  that  have  scheduled  operations  (=>

scheduled operations are privotal). There are three options to store workforce requirements.

First name last name or last name, first name

This field defines whether the last name is shown in front of or behind the first name.

Sorting

This option specifies whether the staff grouped by areas is sorted by the personnel number or

by the name for this area.

MOC_PersonnelWorkplaceAssignment.docxVersion: 1.5.23496

Page 7 of 13

Workplace Assignment

Use optimized algorithm

This option enables the Optimized, automatic assignment.

The configurations are saved with respect to the user per workplace.

 Automatic workplace assignment

Click this button to call the Automatic workplace assignment.

Save planning

This function saves the current workplace assignment, which is then available to all users.

Personnel scheduling

You can call the application Personnel scheduling with this button.

MOC_PersonnelWorkplaceAssignment.docxVersion: 1.5.23496

Page 8 of 13

Workplace Assignment

Manual assignment

Staff can be planned manually by way of "drag & drop". To do so, select the bar of a person, hold the mouse

button down and drag it to the top of a shift for a workplace. The below dialog appears, once you release

the mouse button:

Workplace

Shows the workplace including the required qualification and the open requirements.

Person

Shows the person with the qualification and availability.

Assign person completely

The  person's  available  time  is  completely  assigned  to  the  workplace,  irrespective  of  whether  this

exceeds the workplace requirements or not.

MOC_PersonnelWorkplaceAssignment.docxVersion: 1.5.23496

Page 9 of 13

Workplace Assignment

Assign person according to the specifications that follow

The missing assignment is compared to the person's availability and the result is shown in this field.

You can change the suggested value.

If the person does not have the required qualification, this message appears:

It is now up to the user to decide whether or not to perform this assignment.

To remove a person from planning, the personnel bar only has to be selected and dragged back

from the workplace to the pool of staff. As an alternative, you may also open the context menu by

right clicking and selecting the option "cancel assignment".

HYDRA: as of service pack 13

FEDRA: as of version 1.1

You can select a number of people and plan them for a requirement using drag and drop. The

dialog mentioned above is called for each planning action.

Automatic assignment

The below dialog appears when starting automatic workplace assignment:

MOC_PersonnelWorkplaceAssignment.docxVersion: 1.5.23496

Page 10 of 13

Workplace Assignment

Do not change planned staff, replan all

These options specify whether already existing assignments are to be kept by automatic assignment

or whether they are to be removed from planning to be planned once more.

Shift times of staff and workplace must match

Staff  is  only  planned  on  workplaces  with  shift  times  matching  the  employee's  planned  standard

working time.

Assign staff with lower qualification to remaining workplaces

All  staff  qualifications  are  taken  into  account  as  part  of  the  assignment.  Assignment  is  performed

sorted  by  the  order  of  priority  of  the  employee's  qualifications.  If  this  option  is  not  enabled,  only

qualifications of the highest order of priority (99) are assigned.

Before "automatic assignment" is performed, the system checks if the displayed workplaces and

employees are locked by another user. If this is the case, automatic assignment is canceled.

The check specifying if workplaces and employees are locked by another user is only performed

if the modification wpasLocking is enabled.

Optimized, automatic assignment

The optimized, automatic assignment function can be enabled by the settings.

In contrast to the automatic assignment function described above that only considers the order of priority

for qualifications, the optimized, automatic assignment function also considers the employee's flexibility.

This is intended to achieve a higher assignment rate for automatic planning. The optimized assignment

function works as follows:

MOC_PersonnelWorkplaceAssignment.docxVersion: 1.5.23496

Page 11 of 13

Workplace Assignment

Plan staff with only one assignment option

At  first  the  system  checks  whether  there  is  staff  with  only  one  possible  assignment  option.  This

assignment is performed regardless of whether there are employees who have a higher priority for

the  required  qualification.  Consequently,  this  person  (with  only  one  assignment  option)  does  not

remain unassigned.

Assignment of workplaces with only one possible operator

Then the system checks whether a  qualification required by a  workplace can only  be met by one

employee. This employee is assigned to the workplace, irrespective of whether this person still has

additional qualifications of a higher order of priority. Consequently, the qualification required by this

workplace does not remain unassigned.

Assignment due to the order of priority of qualifications

Just  as  it  is  the  case  with  the  standard,  automatic  assignment  function,  now  the  employees  are

assigned to the workplaces sorted by the order of priority of their qualifications. However, after each

assignment the two steps described above are carried out again. The reason for it is that    since the

assignment of an employee can result in persons with only one remaining possible assignment or

workplaces with only one possible operator being available.

The optimized algorithm is only used if the option "Assign staff with lower qualification to remaining

workplaces" is enabled for automatic assignment.

Replan assignments

If  you  want  to  change  planning  for  an  employee  assigned  to  a  workplace  and  replan  this  employee  to

another workplace, you can do it by "drag & drop" as it is the case with manual assignments. Once you

release the mouse button, the same dialog occurs as with manual assignments.

You can only replan assignments by "drag & drop" if the modification wpasChangeAssignment is

enabled.

Individual shift times

Using  Individual  shift  times,  you  can  define  additional  working  times  and  times  off  deviating  from  the

planned shift model for individual workplaces.

In order to change a complete or parts of the shift and to change it into "time off", just right-click the relevant

shift and select the entry "Insert individual shift time" from the context menu. The following dialog opens

where you can enter the period for the time off and a comment:

MOC_PersonnelWorkplaceAssignment.docxVersion: 1.5.23496

Page 12 of 13

Workplace Assignment

In order to add additional working time, just right-click a time off and select the entry "Insert individual shift

time" from the context menu. Then hold the left mouse button down and drag the period for which you want

to add the additional working time. Once you have released the mouse button, the above-mentioned dialog

opens where you can correct the time and enter a comment. Here, you must enable the option "working

time" in order to specify that it is planned working time and no time off.

Individual shift times can be changed and deleted in the application Individual shift times.

MOC_PersonnelWorkplaceAssignment.docxVersion: 1.5.23496

Page 13 of 13

