Manual

Entry and Maintenance of
Labor Times
PZE-EPP 8.2

Version 1.0.4788

Last changed on: 19.06.2020

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

PZE-EPP_82.docx

Version: 1.0.18468

Page 2 of 20

Entry and Maintenance of Labor Times

Contents

1  Entry and Maintenance of Labor Times - Overview ..................................... 4

2  Account Configuration .................................................................................. 6

3  Configuration of Terminal Information .......................................................... 9

4  Terminal Groups ........................................................................................ 11

5  Clocking Authorizations .............................................................................. 12

6  Clocking Records ....................................................................................... 14

7  Clocking Archive ........................................................................................ 16

8  Absence Reasons ...................................................................................... 18

PZE-EPP_82.docx

Version: 1.0.18468

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

PZE-EPP_82.docx

Version: 1.0.18468

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

PZE-EPP_82.docx

Version: 1.0.18468

Page 5 of 20

Entry and Maintenance of Labor Times

2  Account Configuration

Summary

Menu

Master Data --> Time and Labor Data --> Configuration of Accounts

Transaction code

paco

Function authorization

paco

HYDRA PZW (Personnel Time Management) defines accounts as continuous balances kept in hours or

days (contrary to wage types always starting from 0 at the beginning of a month)

It is possible to keep up to eight continuous accounts. This dialog allows for them to be activated and their

processing and designation to be defined.

Usage

The number of accounts is fixed at 8. For that reason, the buttons for creating, copying and deleting are

not active.

PZE-EPP_82.docx

Version: 1.0.18468

Page 6 of 20

Entry and Maintenance of Labor Times

Leave  entitlement  defined  in  HR  master  is  set-off  against  account  4.  For  this  reason,  this

account should be used for the leave account.

Field descriptions

Account, Designation

Number of the account ranging between 1 and 8 and its name.

Active

Status of account. Only an active account may be used for postings and be evaluated.

Account type

Time account for keeping the account in hours and minutes.

Day account for keeping the account in days (e.g. leave).

Decimal places

The number of decimal places for a time account is zero.

However,  the  number  of  decimal  places  may  be  defined  for  the  day  account.  Half  days  of  leave

may also be allocated if the leave account is defined to have one decimal place.

Modification of the "decimal places" field or changing of the account type during running

operation might lead to errors in the compensation and representation of the account.

Sorting of account lists, terminal information, time sheets, account limits

Sorting order of the accounts (position 1-8, 1  = the first position) in the  account lists, the terminal

information and the time sheet. If the sorting field is empty the account will not be displayed in the

corresponding application.

In the Account limitation field it can be defined, in which order the accounts are limited. This setting

may, for instance, be used, if the task is to repost items from one account to another and limit the

target account subsequently.

A  maximum  of  four  accounts  may  only  be  displayed  on  the  CTP-340  terminal  and

terminals by Kaba Benzing.

Green from, green to, yellow from, yellow to

These fields of the "account indicator" grouping specify which color is used for highlighting of data

records in the reports current account balances, the monthly results and the personnel scheduling.

Coloring depends on the respective account balance. Account balances outside of the yellow range

are displayed in red. If these fields remain empty, no highlighting in color will take place.

PZE-EPP_82.docx

Version: 1.0.18468

Page 7 of 20

Entry and Maintenance of Labor Times

Upload positive/negative account balance, wage type, sign

These  options  specify  whether  the  positive  or  negative  account  balance  of  an  account  is  to  be

posted onto the  indicated  wage type  with the  monthly  results in order to transfer it  along  with the

remaining  wage  types  to  payroll  accounting.  Only  a  few  interfaces  support  the  upload  of  wage

types with negative duration. For this reason, it might be required to enter different wage types for

positive  and  negative  account  balances  and  to  convert  the  algebraic  sign  to  a  "positive"  sign  for

negative account balances.

PZE-EPP_82.docx

Version: 1.0.18468

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

PZE-EPP_82.docx

Version: 1.0.18468

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

PZE-EPP_82.docx

Version: 1.0.18468

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

A terminal group is created when a terminal is assigned. If the last assignment is  deleted, the

terminal group will be deleted as a result.

Terminal groups from 900 on are reserved for the BDE (Shop Floor Data Collection) and may

not be used to issue clocking authorizations.

PZE-EPP_82.docx

Version: 1.0.18468

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

PZE-EPP_82.docx

Version: 1.0.18468

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

PZE-EPP_82.docx

Version: 1.0.18468

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

PZE-EPP_82.docx

Version: 1.0.18468

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

PZE-EPP_82.docx

Version: 1.0.18468

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

PZE-EPP_82.docx

Version: 1.0.18468

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

PZE-EPP_82.docx

Version: 1.0.18468

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

PZE-EPP_82.docx

Version: 1.0.18468

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

PZE-EPP_82.docx

Version: 1.0.18468

Page 19 of 20

Entry and Maintenance of Labor Times

The specifications made in the fields “start at” and “end at” only affect the first and last day of

the absence. Whole absence days that are between this first and last day are allocated with the

entered payment day type, just as it is the case for planned absences.

PZE-EPP_82.docx

Version: 1.0.18468

Page 20 of 20

