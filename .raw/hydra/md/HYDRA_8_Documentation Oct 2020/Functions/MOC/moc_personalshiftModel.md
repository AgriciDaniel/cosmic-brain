Individual shift/assignment times

1

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

MOC_PersonalShiftModel.docx

Status: 19.06.2020

Page 1 of 4

Period from

Optionally,  you can use this input field to enter the beginning of a period as of which you want to

Individual shift/assignment times

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

MOC_PersonalShiftModel.docx

Status: 19.06.2020

Page 2 of 4

Individual shift/assignment times

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

MOC_PersonalShiftModel.docx

Status: 19.06.2020

Page 3 of 4

Individual shift/assignment times

If multiple individual shift times exist, this dialog is opened for each existing shift time, and the user can

decide whether or not to delete the entries.

Please be careful not to define overlapping periods for one workplace.

These  additional  shift  times  are  only  used  in  Shop  Floor  Scheduling,  not  as  part  of  data

collection.

The  user  can  only  change,  view  and  delete  machines  that  belong  to  the  responsibility  area

he/she is authorized for.

MOC_PersonalShiftModel.docx

Status: 19.06.2020

Page 4 of 4

