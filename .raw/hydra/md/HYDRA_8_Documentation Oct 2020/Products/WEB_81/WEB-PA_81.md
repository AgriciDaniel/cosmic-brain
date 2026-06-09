Manual

HYDRA@Web Attendance
overview
WEB-PA 8.1

Version 1.0.23049

Last changed on: 02.09.2020

HYDRA@Web Attendance overview

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

WEB-PA_81.docx

Version: 1.0.23049

Page 2 of 7

HYDRA@Web Attendance overview

Contents

1  HYDRA@Web Attendance Overview - Overview ........................................ 4

2  Attendance Overview ................................................................................... 5

WEB-PA_81.docx

Version: 1.0.23049

Page 3 of 7

HYDRA@Web Attendance overview

1  HYDRA@Web Attendance Overview - Overview

Purpose

This function package makes it possible to display an attendance overview in the Intranet or Internet.

Implementation Considerations

You use the function package if:



you  require  an  overview  of  present  and  absent  employees  on  workplaces  where  MOC  is  not

installed.

Integration

This function package can only be used if labor time is recorded in HYDRA (function package Recording

and maintenance of labor time).

Features

  HYDRA@Web attendance overview

o  Display of employees present with indication of location where the clock-in took place

o  Presentation of planned absent employees with date of next planned attendance

o  List of employees who are unplanned absent or on leave according to labor time planning

o  Display of employee photograph stored in the HR master data

o  Opening of an e-mail with the employee's e-mail address entered in the HR master data

WEB-PA_81.docx

Version: 1.0.23049

Page 4 of 7

HYDRA@Web Attendance overview

2  Attendance Overview

Overview

The current status of the employees is shown in the attendance overview:

Field descriptions

Status

Present

The  employee  has  been  present  since  the  point  in  time  displayed.  The  date  is  only  shown  if  it

deviates from the current date.

Absent

The  Absent  since  status  is  displayed  if  the  employee  is  absent  and  was  present  within  the  last  6

hours, and if no working time is scheduled at the current point in time.

Planned absent

The employee is absent and this absence was planned.

Unplanned absent

The  employee  is  absent  but  should  be  present  according  to  the  scheduled  shift  time  and/or  core

working time for flextime and flexible shift employees.

WEB-PA_81.docx

Version: 1.0.23049

Page 5 of 7

HYDRA@Web Attendance overview

Off

No working time has been planned for the employee at present. If the cursor is positioned on the

status, more detailed information on the planned working time will be shown in the tooltip:

  Off: The employee is absent and no working time is planned for the current day.

  Off until: The employee is absent and should be present at the specified point in time according

to the working time schedule.

  Off since: The employee was unplanned absent and the planned shift and/or core time is already

over.

Person does not clock

With employees for whom the Person does not clock flag is set in the HR master data, the "Person

clocks status" flag is not displayed in the skeleton time.

Location

For  employees  who  are  present,  the  location  of  the  terminal  at  which  the  employee  clocked  in  is

displayed in this column.

Present at

For absent employees, this column shows the date on which the employee should be present again

according to current planning.

Any discrepancies in the attendance and absence overview may be due to the fact that persons

forgot to clock out. These persons will be listed as absent on the next day at the latest.

The Date column for the Status category only shows a date if it deviates from the current day.

WEB-PA_81.docx

Version: 1.0.23049

Page 6 of 7

HYDRA@Web Attendance overview

Function description

 Detail view

The magnifying glasses at the beginning of each row open a detail view  showing a picture for the

relevant person:

WEB-PA_81.docx

Version: 1.0.23049

Page 7 of 7

