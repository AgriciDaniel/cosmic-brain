Manual

Personnel Information
PZE-INF 8.3

Version 1.0.23049

Last changed on: 02.09.20209

Personnel Information

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

PZE-INF_83.docx

Version: 1.0.23049

Page 2 of 15

Personnel Information

Contents

1  Personnel Information - Overview ................................................................ 4

2  Attendance Overview ................................................................................... 5

3  Anniversary List ............................................................................................ 8

4  Configuration of HR Master Fields and Badge Fields ................................ 10

5  Advanced personnel selection ................................................................... 12

6  Messages to Employees ............................................................................ 14

PZE-INF_83.docx

Version: 1.0.23049

Page 3 of 15

Personnel Information

1  Personnel Information - Overview

Purpose

The  function  package  Personnel  Information  contains  functions  to  display,  edit  and  select  personnel

information.

Implementation Considerations

Use this function package to:

  use HR master data and enter additional personnel data;

  use  HYDRA  Time  and  Attendance  and  get  an  overview  of  which  employees  are  present  or

absent or to send messages to the Time & Attendance (PZE) terminal.

Integration

The  fields  for  additional  information  in  the  HR  master  data  are  available  in  other  function  packages  for

personnel time management and determination of incentive wages.

Features

  Attendance overview

o  Up  to  date  overview  of  employees  present  with  display  of  any  running  orders  or  of

employees absent with absence reason and date of next planned presence

  Anniversary list

o  Display of employees' birthdays and company anniversaries for any period

  Additional HR master data fields

o  Freely configurable HR master data fields to record additional personnel information (e.g.

car  license  plate,  clothing  size,  educational  qualifications)  as  the  basis  of  personnel

information systems

o  Use  of  the  additional  HR  master  data  fields  as  selection  criteria  for  lists,  reports  and

statistics

  Advanced personnel selection

o  The  “advanced  personnel  selection”  option  enables  to  select  employees  by  further  HR

master fields than by company, area and cost centers

  Messages

o  Message  display  at  terminal  (availability  depending  on  the  type  of  time  &  attendance

terminal)

PZE-INF_83.docx

Version: 1.0.23049

Page 4 of 15

Personnel Information

2  Attendance Overview

Overview

Menu

Human resources management  Reports  Attendance overview

Transaction code

paov

Function authorization

paov

A person's current status is shown in the attendance overview

Selection criteria

The application provides the following selection criteria:

Status

The  flags  can  be  used  to  select  whether  to  display  those  who  are  present,  persons  who  are

planned absent or who are unplanned absent or who have time off.

PZE-INF_83.docx

Version: 1.0.23049

Page 5 of 15

Personnel Information

Field descriptions

Status

Present since

The employee is present since the point in time displayed. The date is only shown if it deviates from

the current date.

Absent since

The status Absent since is displayed if the employee is absent, if he was present within the last six

hours and if no working time is planned at the current point in time.

Planned absent

The employee is absent and absence planning exists.

Unplanned absent since

The employee is absent and, based on the planned shift time or the core work time for flextime and

flexible shift employees, should be present.

Off

The employee is absent and no work time is planned for the current day.

Off until

The  employee  is  absent  and,  based  on  the  working  time  schedule,  should  be  present  at  the

specified point in time.

Off since

The  employee  was  unplanned  absent  and  the  planned  shift  or  rather  core  time  is  already  over.

Person does not clock

For  employees  for  whom  the  flag  Person  does  not  clock  is  set  in  the  HR  master  data,  the  flag

"Status person clocks" is not displayed in the skeleton time.

Location

For  employees  who  are  present,  the  location  of  the  terminal  at  which  the  employee  clocked  in  is

displayed in this column.

Present at

For  absent  employees,  displayed  in  this  column  is  on  which  day  the  employee  should  again  be

present according to current planning.

Absence

Designation of the planned absence reason.

The  display  showing  absences  may  be  hidden  depending  on  which  user  is  logged  in.  The

configuration that defines which absences should be hidden is made via the responsibility area in

the  absence  payment.  If  a  responsibility  area  is  entered  for  an  absence  payment,  then  these

absences  are  only  shown  for  the  users  that  have  the  Display  authorization  for  this  responsibility

area:

The absence time is hidden for users who do not have authorization for the relevant responsibility

area.

PZE-INF_83.docx

Version: 1.0.23049

Page 6 of 15

Personnel Information

Any  discrepancies  in  the  attendance  and  absence  overview  may  have  been  caused  because

persons have forgotten to clock out. These persons should be listed as absent on the next day

at the latest.

In the Date column for the Status category, a date may only be displayed if it deviates from the

current day.

Toolbar

 HR master data

Call up HR master data.

 Labor time maintenance

Calling up Labor time maintenance:

Personnel scheduling

Calling up Personnel scheduling.

 Send e-mail

If an e-mail address is defined for the person selected in the HR master data, then an e-mail can be

created via this flag with this person as the addressee.

Detail applications

Operations logged on

For the person selected, the Operations logged on are displayed in the list Attendance overview.

Image

If an image is stored in the HR master data, then it is displayed here.

PZE-INF_83.docx

Version: 1.0.23049

Page 7 of 15

Personnel Information

3  Anniversary List

Summary

Menu

Master Data --> People --> Anniversary List

Transaction Code

pejl

Function authorization

pejl

This menu item allows for an anniversary list to be displayed and printed.

Selection Criteria

The application provides the following selection criteria:

Staff membership

The staff membership of employees is listed if this option is checked.

PZE-INF_83.docx

Version: 1.0.23049

Page 8 of 15

Personnel Information

Birthdays

The birthdays are listed if this option is activated.

Significant anniversaries only

If this option is checked anniversaries that may be divided by five years are displayed only.

PZE-INF_83.docx

Version: 1.0.23049

Page 9 of 15

Personnel Information

4  Configuration of HR Master Fields and Badge Fields

1.1  Summary

Menu

Master Data --> People --> Configuration of HR Master Data Fields
Master Data --> Access Control --> Configuration of Badge Fields

Transaction Code

pefc

Function authorization

pefc

The personnel information license (PZE-INF) allows for additional information about individual people to

be defined in the HR master. For badges this function is activated using the visitor's badge management

license (ZKS-BAV). The configured fields are respectively displayed in the "additional info" tab.

30 possible fields are displayed in the configuration of HR master fields and badge fields. The position,

designation, length, default value and visibility of additional fields may be changed here.

Field Descriptions

Position

Position of the field  within  the HR master dialog. By  changing the number, a field may be moved

forward  or  backward.  All  fields  lying  in  between  are  moved  by  one  position.  This  allows,  for

example, for a date or figure field to be moved forward.

PZE-INF_83.docx

Version: 1.0.23049

Page 10 of 15

Personnel Information

Active

This checkbox is used to set the terminal to 'active' or 'inactive'. Inactive fields are not available in

the selection of HR master fields for lists and reports.

Designation

Designation that is to be displayed in front of the corresponding field within the HR master.

Length

The  field  length  can  be  configured  here.  The  length  has  to  range  between  1  and  the  maximum

length. The maximum field length cannot be changed.

Default value

The default value is automatically taken over when a person is created and may still be changed for

the person.

Responsibility area

The  responsibility  are  controls  which  user  is  allowed  to  use  which  additional  field  as  selection

criterion. The "use" function is checked in this context for the responsibility area. In addition to this,

the  "display"  function  of  the  responsibility  area  defines  whether  or  not  the  user  may  view  the

corresponding additional field in the HR master.

Type

The data type of a field is  predefined. If a field  with another data type is required it is possible to

move a field that is assigned to the corresponding data type to this position (see "position" field).

Only integer values may be entered in additional fields that are assigned to the "numeric" type.

PZE-INF_83.docx

Version: 1.0.23049

Page 11 of 15

Personnel Information

5  Advanced personnel selection

Overview

The "Advanced personnel selection" function offers the user the option to limit the selection of employees

in various applications.

Purpose

The fields Company, Area and Cost center are underlined and highlighted in blue font if you enabled the

Advanced personnel selection function. Click on one of these fields (company, area, cost center) to open

a selection list and to choose another HR master field.

For  example,  the  list  includes  the  HR  master  data  fields  Department,  Employee  subgroup,  Activity  and

the  additional  information  fields  of  the  HR  master.  You  can  make  a  selection  using  the  additional  info

fields of the HR master if you have the responsibility area authorization to display these fields.

Click  the  toolbar  function  Save  settings  to  save  the  set  selection  criteria  user-specifically.

Therefore, the criteria will be preset the next time you open the application.

PZE-INF_83.docx

Version: 1.0.23049

Page 12 of 15

Personnel Information

PZE-INF_83.docx

Version: 1.0.23049

Page 13 of 15

Personnel Information

6  Messages to Employees

Summary

Menu

Master Data --> People --> Messages to Employees

Transaction Code

pmes

Function authorization

pmes

 The "messages to employees" function makes it possible to display  any  texts,  when people  try  to  post

something at the terminal. In this way, people may be asked, for example, to contact the payroll office or

they may be reminded of closing doors and windows or shutting down machines on the last working day

of th week

PZE-INF_83.docx

Version: 1.0.23049

Page 14 of 15

Personnel Information

Utilization

Messages are sent in periodic intervals to the terminals so that a specific time passes until they

are  displayed  on  the  terminals.  The  configuration  is  made  within  the  PZE  properties  of  the

terminal configuration. The "display duration of info" field specifies how long the messages are

displayed at the terminal.

Not more than 20 characters may be entered per message line for terminals the display  is 20

characters long (e.g. CT-370).

The terminals of the type CTP-340 or terminals by Kaba Benzing do not support the display of

messages function.

Field Descriptions in the "message" tab

Company

Restricts the validity of the clocking authorization to a specific company.

Personnel selection

The  next  two  fields  allow  for  the  "clocking  authorization"  to  be  restricted  to  a  specific  person  or

group  of  people.  The  HR  master  fields  "cost  center",  "area",  "employee  subgroup",  "activity"  and

"staff membership" may be selected as employee groups.

Valid from, to

Validity period of the message

Number

Specifies  how  often  a  message  is  to  be  displayed  for  a  person  at  the  terminal.  If  the  field  is  left

empty the message is shown without any restriction. When a message is changed, it is impossible

to  change  the  number,  as  otherwise  it  cannot  be  traced  back  how  often  individual  people  have

already read the message.

Message

Message that is to be displayed at the terminal.

Clocking status

It may be defined for which clocking statuses messages are to be displayed for the person.

Field descriptions of the "validity" tab

Weekday

It may be selected at which weekdays the message is to be displayed.

PZE-INF_83.docx

Version: 1.0.23049

Page 15 of 15

