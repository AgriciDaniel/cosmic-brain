Manual

Entry and Maintenance of
Labor Times
PZE-EPP 8.3

Version 1.0.23049

Last changed on: 02.09.20209

Entry and Maintenance of Labor Times

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

PZE-EPP_83.docx

Version: 1.0.23049

Page 2 of 20

Entry and Maintenance of Labor Times

Contents

1  Entry and Maintenance of Labor Times - Overview ..................................... 4

2  Configuration of Accounts ............................................................................ 6

3  Configuration of Terminal Information .......................................................... 9

4  Terminal Groups ........................................................................................ 11

5  Clocking Authorizations .............................................................................. 12

6  Clocking Records ....................................................................................... 14

7  Clocking Archive ........................................................................................ 16

8  Absence Reasons ...................................................................................... 18

PZE-EPP_83.docx

Version: 1.0.23049

Page 3 of 20

Entry and Maintenance of Labor Times

1  Entry and Maintenance of Labor Times - Overview

Purpose

This function package contains functions needed to enter, display and maintain clockings.

Implementation Considerations

Use this function package to:

  use  HYDRA  Time  &  Attendance  purely  as  a  data  entry  system  (subsystem)  to  another

manufacturer's personnel time management system;



collect and evaluate the employee clockings in HYDRA Personnel Time Management.

Integration

The  collected  clockings  are  the  basis  for  evaluating  attendance  time  in  HYDRA  Personnel  Time

Management.

Features

  Clocking authorizations

o  Assigning employees or employee groups to terminals where they are allowed to clock

  Terminal groups

o  Grouping terminals for a flexible and simple definition of clocking authorizations

  Entry of clockings

o  Transfer of in, out, absence and break clockings from the Time & Attendance terminal

  Automatic status

o  Automatic  clocking  status  determination  (in  /  out)  depending  on  the  current  employee

status (clocking mappings)

  Entry of absence reasons

o  Entry of cause of late arrival, early departure, unplanned absence and entire days absent

(e.g. business trip and leave)

  Clocking archive

o  List  of  individual  in,  out,  break  and  absence  clockings  by  time  or  Time  &  Attendance

terminal

  Clockings

o  Display of employee clockings with maintenance functions and documentation of deleted

original clockings

PZE-EPP_83.docx

Version: 1.0.23049

Page 4 of 20

Entry and Maintenance of Labor Times



Information display at the terminal

o  Provision  of  information  on  account  balances  (e.g.  leave,  flextime,  flexible  time)  or

clockings to display at the terminal

  Account configuration

o  Creating and maintaining up to eight freely definable time and day accounts

  Configuration of terminal information

o  Definition  per  person  and/or  group  of  persons  which  accounts  are  displayed  with  which

designation on the terminal

PZE-EPP_83.docx

Version: 1.0.23049

Page 5 of 20

Entry and Maintenance of Labor Times

2  Configuration of Accounts

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

PZE-EPP_83.docx

Version: 1.0.23049

Page 6 of 20

Entry and Maintenance of Labor Times

The leave entitlement defined in the HR master data is offset using account 4. Use account 4 as

leave account for this reason.

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

In field Account limitation, you can specify the order used to  limit the accounts. For  example,  you

can use this setting if you repost from one account to another and you then want to limit the target

account.

Terminals  of  the  manufacturer  Kaba  Benzing  and  of  type  CTP-340  can  only  show  a

maximum of 4 accounts.

Green from, Green to, Yellow from, Yellow to

These fields of the group Account indicator specify the color used for the relevant account balance

in  the  reports  Current  account  balances,  the  Monthly  results  and  in  the  Personnel  scheduling.

Account balances outside of the yellow range are displayed in red. If these fields remain empty, no

color is used to highlight the fields.

PZE-EPP_83.docx

Version: 1.0.23049

Page 7 of 20

Entry and Maintenance of Labor Times

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

PZE-EPP_83.docx

Version: 1.0.23049

Page 8 of 20

Entry and Maintenance of Labor Times

3  Configuration of Terminal Information

Summary

Menu

System administration  Terminals  Configuration of terminal information

Transaction code

ptic

Function authorization

ptic

By  using  the  "configuration  of  terminal  information"  function  employees  and  groups  of  employees  can

define which accounts are displayed with which designation on the Time & Attendance terminal.

Field Descriptions

Company

Restricts  the  validity  to  a  particular  company.  If  the  field  is  left  empty,  the  configuration  of  the

terminal information applies to all companies.

PZE-EPP_83.docx

Version: 1.0.23049

Page 9 of 20

Entry and Maintenance of Labor Times

Personnel selection, value

Defines  whether  the  configuration  applies  for  an  employee  or  for  a  group  of  employees.  The

available  employee  groups  include  area,  cost  center,  department,  employee  subgroup,  activity,

person does not clock and employment relationship.

Valid from, to

These two fields restrict the validity of the "configuration of terminal information" to a specific period

of time. If only one of these two fields is filled out, the entry is either valid from or until that date.

Priority

If the "configuration of terminal information" is defined for different employee groups and more than

one  of  these  configurations  applies  to  a  single  employee,  the  priority  determines  which

configuration has precedence.

Comment

A comment may be entered for each entry.

Account

Up to 8 accounts may be selected that are shown on the Time & Attendance (PZE) terminal.

Designation on the terminal

A name to be displayed on the PZE terminal can be defined for each account. If this field remains

empty, the account name from configuration of accounts will be shown.

Whether or not the "configuration of terminal information" can be used, depends on the terminal

type in use. Terminals with the terminal program AIP or CTWIN provide this function.

PZE-EPP_83.docx

Version: 1.0.23049

Page 10 of 20

Entry and Maintenance of Labor Times

4  Terminal Groups

Overview

Menu

System administration  Terminals  Terminal groups

Transaction code

tegr

Function authorization

tegr

Usage

Terminal groups are used when defining the Clocking authorizations for the Time and Attendance module

and when assigning dynamic dialogs to the terminals.

Integration

To make it easier to assign clocking authorizations, terminals can be consolidated into terminal groups. In

addition  to  the  ease  of  use  offered  by  assigning  a  single  terminal  group  instead  of  managing  multiple

terminals,  working  with  terminal  groups  also  allows  a  higher  degree  of  flexibility  with  the  option  of

activating  or  blocking  additional  terminals  later,  temporarily  or  permanently  without  having  to  edit

authorizations for each person. One terminal can be assigned to any number of terminal groups.

A terminal group is created when a terminal is assigned. If the last assignment is deleted, the

terminal group will be deleted as a result.

Terminal groups from 900 on are reserved for the BDE (Shop  Floor Data Collection) and may

not be used to issue clocking authorizations.

PZE-EPP_83.docx

Version: 1.0.23049

Page 11 of 20

Entry and Maintenance of Labor Times

5  Clocking Authorizations

Summary

Menu

Master Data  People  Clocking Authorizations

Transaction code

clau

Function authorization

clau

Terminal  groups  and  terminals  are  combined  within  the  “clocking  authorizations”  dialog  to  assign

corresponding clocking authorizations at HYDRA-PZE terminals.

Utilization

This  configuration  allows  for  “clocking  authorizations”,  which  enable  clockings  at  PZE  terminals,  to  be

defined  for  individual  people  as  well  as  for  groups  of  people.  “Clocking  authorizations”  for  employee

groups provide the benefit that they normally do not have to be entered every time when a new person is

created.

PZE-EPP_83.docx

Version: 1.0.23049

Page 12 of 20

Entry and Maintenance of Labor Times

The  list  of  “clocking  authorizations”  shows  all  authorizations  for  the  selected  people,  irrespective  of

whether authorizations have been defined for individual people for groups of people.

When a person is created, a “clocking authorization” for the terminal group 99 is automatically

assigned  to  this  person.  These  authorizations  are  only  displayed,  provided  that  the  terminal

group 99 is actually available.

Field Descriptions

Company

The validity of the “clocking authorization” may be restricted to a specific company.

Personnel selection

The next two fields allow for the “clocking authorization” to be restricted to a particular person or a

group  of  people.  The  HR  master  fields  “cost  center”,  “area”,  “department”,  “employee  subgroup”,

“activity” and “employment relationship” may be selected as employee groups.

Assignment terminal group, terminal

Assignment of the terminal group or terminal for which the clocking authorization is to be assigned.

More flexible planning is granted by using terminal groups instead of terminals. Once a

new  terminal  has  been  installed,  it  is  sufficient  to  assign  it  to  one  or  several  terminal

groups, without having to assign it to each individual person.

Valid from, until

Validity period of the clocking authorization.

PZE-EPP_83.docx

Version: 1.0.23049

Page 13 of 20

Entry and Maintenance of Labor Times

6  Clocking Records

Summary

Menu

Human Resources Management  Maintenance  Clockings

Transaction code

clck

Function authorization

clck

The clocking records of several people can be displayed and edited in the “clockings” list. Furthermore,

this list helps trace back the clocking changes that have been made by a user.

Utilization

The clockings are displayed in two table views that can be opened by the two tabs at the lower margin of

the  clockings  dialog. When  it  comes  to  the  detailed  view,  several  lines  are  displayed  for  each  clocking

record.

PZE-EPP_83.docx

Version: 1.0.23049

Page 14 of 20

Entry and Maintenance of Labor Times

Selection Criteria

The application provides the following selection criteria:

Editor

If an editor is entered in this field only clockings are displayed that were created, deleted, changed,

approved or rejected by this editor.

Status

By  selecting  a  specific  status,  the  view  may  be  restricted  to  “original”  terminal  clockings,

“automatically”  created  clockings  (planned  absences),  “edited”  clockings,  “deleted”  clockings  or

“paid breaks”.

Toolbar

 Authorize

Function authorization: clck.sign

A clocking that is subject to authorization is signed. Once a clocking has been approved, all wage

type postings pertaining to it are no longer subject to authorization.

 Reject

Function authorization: clck.reject

A clocking that is subject to authorization is refused. Once a clocking has been rejected, all wage

type postings pertaining to it, which are neither approved nor rejected, are deleted.

 Labor time maintenance

Starts the labor time maintenance dialog.

 Messages listing

Opens the messages listing for the selected period of time.

 Personnel Scheduling

Starts the personnel scheduling function.

PZE-EPP_83.docx

Version: 1.0.23049

Page 15 of 20

Entry and Maintenance of Labor Times

7  Clocking Archive

Summary

Menu

Human Resources Management  Reports  Clocking Archive

Transaction code

clar

Function authorization

clar

The clocking archive shows original clockings of selectable terminals in chronological order. By entering a

period of time, a time frame and the meaning of clocking records, for example, it is possible to show all

clocking-ins between 6.00 am and 9.00 am of a specific calendar week.

Selection Criteria

The application provides the following selection criteria:

PZE-EPP_83.docx

Version: 1.0.23049

Page 16 of 20

Entry and Maintenance of Labor Times

Time from, to

Time frame within the date range that is to be displayed.

Recorded cost center

When it comes to cost center postings, clockings may also be recorded on other cost centers than

the master cost center.

In, out

Clock-ins or clock-outs are shown if these fields are checked.

Advance/subsequent clockings

Advance and subsequent clockings are displayed if this field is checked.

Field Descriptions

Recorded cost center

The cost center entered at the terminal.

Clocking status

The input type of the clocking at the terminal, such as “auto status”, “advance posting”, “clock-in”.

Status

Designation of the absence reason that was recorded at the terminal.

Clockings that are deleted or edited at the console can be recognized by the “deleted” entry in

the “status” column.

PZE-EPP_83.docx

Version: 1.0.23049

Page 17 of 20

Entry and Maintenance of Labor Times

8  Absence Reasons

Summary

Menu

Master data  Time and Labor Data  Absence reasons

Transaction code

abre

Function authorization

abre

Absence  reasons  explain  why  employees  have  left  too  early  or  arrived  too  late.  Employees  may  enter

these  reasons  at  PZE  terminals.  The  clockings  that  are  generated  in  this  way  are  called  advance

clockings or subsequent clockings.

Field Descriptions

Absence reason

Number  of  the  absence  reason.  This  number  is  assigned  to  the  individual  buttons  of  the  PZE

terminal within the terminal label or within the absence reason authorization.

PZE-EPP_83.docx

Version: 1.0.23049

Page 18 of 20

Entry and Maintenance of Labor Times

Company

Company for which the absence reason configuration is to apply. If this field is empty the absence

reason applies for all companies.

Day type

Number of the payment day type  which this absence reason is to be allocated  with. If this field is

empty the payment day type planned for this day is used.

Authorization required

If this field is checked the postings resulting from this absence reason are subject to authorization.

Processing as absence time planning

If  this  option  is  checked  the  absence  reason  is  processed  as  if  it  was  a  planned  absence.  This

allows for the absence reason to be used for filling the target working time, for example, or to enter

half days of leave as absence reason at the terminal.

Meaning

It may be chosen  whether  the clocking record resulting from the absence reason is generated  as

attendance time, absence or business trip/errand.

Start at

Subsequent  clockings  start  with  the  beginning  of  the  skeleton  time,  normal  working  time  or  core

time if the employee was not present before the absence reason applied.

End at

Advance  clockings  end  with  the  end  of  the  skeleton  time,  normal  working  time or  core  time  if  the

employee does not return after the absence reason does no longer apply.

Post on

For the current day only

The absence reason only applies for the current day. Possible absences at the days that follow

are not allocated with this absence reason.

Post on

The  absence  reason  is  used  for  the  current  day  and  for  full-day  absences  on  the  days  that

follow.  However,  if  an  absence  is  planned  within  this  absence  period,  this  planning  takes

priority. This absence reason is used again as soon as the planned absence ends.

Post full days on only

The absence reason is not used on the current day but only for full-day absences on the days

that follow. This setting is used, for example, if employees enter that they want to take leave

within the next days at the terminal.

PZE-EPP_83.docx

Version: 1.0.23049

Page 19 of 20

Entry and Maintenance of Labor Times

The specifications made in the fields “start at” and “end at” only affect the first and last day of

the absence. Whole absence days that are between this first and last day are allocated with the

entered payment day type, just as it is the case for planned absences.

PZE-EPP_83.docx

Version: 1.0.23049

Page 20 of 20

