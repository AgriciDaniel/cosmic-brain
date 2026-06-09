Manual

SMA-SFP Shift and Absence
Planning
SMA-SFP 8.2

Version 1.0.23049

Last changed on: 02.09.2020

SMA-SFP Shift and Absence Planning

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

SMA-SFP_82.docx

Version: 1.0.23049

Page 2 of 27

SMA-SFP Shift and Absence Planning

Contents

1  SMA-SFP Shift and Absence Planning ........................................................ 4

2  Shift and Absence Planning ......................................................................... 5

2.1  General ............................................................................................................... 5

2.2  Overview ............................................................................................................. 5

3  Absence Planning and Approval .................................................................. 9

3.1  General ............................................................................................................... 9

3.2  Overview ............................................................................................................. 9

4  Configuration Absence Workflow ............................................................... 14

5  Replacements ............................................................................................ 25

SMA-SFP_82.docx

Version: 1.0.23049

Page 3 of 27

SMA-SFP Shift and Absence Planning

1  SMA-SFP Shift and Absence Planning

Purpose

The function package SMA-SFP Shift and Absence Planning includes the following components:

  Shift and absence planning

An employee can use shift and absence planning to display his/her requested, approved, planned

and accounted absences in the form of a list or a calendar. In addition, the employee can request

absences and withdraw such requests. For shift workers, the shift sequence can be displayed in

a calendar.

  Planning and approval of absences

The absence planning and approval shows supervisors the planned and requested absences of

their employees and allows them to process and approve and/or reject them.

SMA-SFP_82.docx

Version: 1.0.23049

Page 4 of 27

SMA-SFP Shift and Absence Planning

2  Shift and Absence Planning

2.1  General

An employee can  use Shift and Absence  Planning to  display  his/her requested,  approved, planned and

accounted absences in the form of a list or a calendar. In addition, the employee can request absences

and withdraw such requests. For shift workers, the shift sequence can be displayed in a calendar.

2.2  Overview

The list view shows the employee's requested, approved, and planned absences:

SMA-SFP_82.docx

Version: 1.0.23049

Page 5 of 27

The monthly view shows the calendar with a narrow width, so that it can be displayed, for example, on a

mobile phone:

SMA-SFP Shift and Absence Planning

The year view is appropriate for display on a tablet PC or in the web.

Requested absences are indicated in italics in the calendar:

If the Show shift planning option is enabled in the settings, the planned shift type of shift workers is also

indicated.

In addition, the employee  can see  the current  leave  account  balance and the  leave account  balance at

the end of the year.

SMA-SFP_82.docx

Version: 1.0.23049

Page 6 of 27

SMA-SFP Shift and Absence Planning

Function keys

 List view

Shows the list view

 Month view

Shows the month view

 Year view

Shows the year view

 Info display

Displays current account balances

 Request absence

Opens a dialog for requesting an absence:

When started from the month or year view, the date of the previously selected day is adopted.

You cannot request an absence, if the Date from of the absence is in the past.

SMA-SFP_82.docx

Version: 1.0.23049

Page 7 of 27

SMA-SFP Shift and Absence Planning

Edit and/or delete absences

When  clicking  on  an  absence  which  the  employee  is  allowed  to  plan  himself/herself,  a  dialog  opens  in

which the absence can be edited or deleted.

Withdraw request

When clicking on a requested absence, a dialog opens in which the absence can be canceled:

SMA-SFP_82.docx

Version: 1.0.23049

Page 8 of 27

SMA-SFP Shift and Absence Planning

3  Absence Planning and Approval

3.1  General

This application displays the planned and  requested absences of the employees. The user can edit the

absences and approve or reject the absences.

You can display the absences in a list or calendar.

In the calendar view, you can also show the planned shift type of shift workers.

To use the application, the user requires the function authorization sma.apaa.

3.2  Overview

For  the  list  view,  you  can  configure  if  only  the  requested  absences  or  the  requested,  approved  and

planned absences of the employees are displayed:

SMA-SFP_82.docx

Version: 1.0.23049

Page 9 of 27

SMA-SFP Shift and Absence Planning

The calendar view displays the planning of the separate employees one below the other. The days with a

planned  absence  are  displayed  in  the  background  color  specified  for  this  absence.  The  abbreviation  of

the absence is displayed in the day field. Requested absences are displayed in italic font:

If the button Show shift planning is enabled in the settings, the planned shift type is additionally displayed

for shift workers.

For each employee, the current leave account balance and the leave account at the end of the year are

displayed.

SMA-SFP_82.docx

Version: 1.0.23049

Page 10 of 27

SMA-SFP Shift and Absence Planning

Executives  are  usually  authorized  to  view  all  subordinate  employees.  But  when  it  comes  to  editing  the

absence requests, only the direct subordinates are displayed.

The user can use the  additional selection criterion  Supervisor and  enter their own personnel  number to

only show the direct subordinates.

Using  the  selection  criterion  Planning  profile,  the  user  can  flexibly  narrow  down  the  persons  displayed.

You can then display the employees of one or several departments, for example.

Selection criteria

Date from, to

The date range specified is only active for the calendar view. The list view always shows all current

and future requests or absences.

Only requested absences

This  option  specifies  if  only  absences  with  status  requested  or  also  approved  and  planned

absences are displayed in the list view.

Function keys

 List

Shows list view

SMA-SFP_82.docx

Version: 1.0.23049

Page 11 of 27

SMA-SFP Shift and Absence Planning

 Calendar

Shows calendar view

 Create absence

Click to open a dialog and to plan an absence for a person:

If you call the dialog from the calendar view, person and date of the selected day are passed to the

dialog.

Edit or delete absences

If you click a planned absence, a dialog opens and you can edit or delete the absence.

SMA-SFP_82.docx

Version: 1.0.23049

Page 12 of 27

SMA-SFP Shift and Absence Planning

Approve or reject absences

If you click a requested absence, a dialog opens and you can approve or reject the absence. If required,

you can enter a reason:

SMA-SFP_82.docx

Version: 1.0.23049

Page 13 of 27

SMA-SFP Shift and Absence Planning

4  Configuration Absence Workflow

Overview

Employees  can  use  the  absence  workflow  to  request  absences  via  Internet  and/or  Intranet.  When  a

request  has  been  filed,  the  supervisor  is  informed  and  can  then  approve  or  reject  the  request.  The

employee receives a notification via e-mail or on the terminal if the absence request was approved or not.

The settings for the absence workflow are configured in different applications on the MOC:

Configuration – Basic Settings

Menu

System administration  System settings  Basic settings

Transaction code

setup

Function authorization

setup

In the tab ESK of the application Basic settings, the e-mail server must be entered so that notifications for

absence times and their approval and/or rejection can be forwarded to the employees by e-mail:

Field descriptions

It is important to specify the IP address of the SMTP server and the sender of the mails that are sent.

SMTP server

To send e-mails, enter the IP address or name of the local SMTP server in the SMTP server field.

SMA-SFP_82.docx

Version: 1.0.23049

Page 14 of 27

SMA-SFP Shift and Absence Planning

Sender

You can enter a central e-mail account. E-mails sent via HYDRA Escalation Management will then

have this central account as sender.

Event configuration in the Escalation Management

Menu

Master data  Escalation management  Escalation configuration

Transaction code

esccfg

Function authorization

esccfg

You store the events for requesting, approving and rejecting absences in the Escalation configuration:

Field descriptions

Event

FZ.APPLICATION_FILED -> triggered when an absence is requested.

FZ.APPLICATION_ALLOWED -> triggered after approval of an absence request.

FZ.APPLICATION_REJECTED -> triggered after rejection of an absence request.

FZ.APPLICATION_WITHDRAWN  ->  triggered  after  withdrawal  of  an  absence  request  by  an

employee.

SMA-SFP_82.docx

Version: 1.0.23049

Page 15 of 27

Event tab for FZ.APPLICATION_FILED

SMA-SFP Shift and Absence Planning

Event tab for FZ.APPLICATION_ALLOWED

SMA-SFP_82.docx

Version: 1.0.23049

Page 16 of 27

Event tab for FZ.APPLICATION_REJECTED

SMA-SFP Shift and Absence Planning

Event tab for FZ.APPLICATION_WITHDRAWN

The  entries  in  the  Message  and  Notification  tabs  have  the  same  settings  as  the  approval  of  an

absence request.

Message tab

You can define the subject and text of the message in the Message tab

SMA-SFP_82.docx

Version: 1.0.23049

Page 17 of 27

SMA-SFP Shift and Absence Planning

Examples:

Person %FZ.PNR% %FZ.NAME:PNR% has requested %FZ.BEZL:ENTLTMOD% from %FZ.DATB

date dd.mm.yyyy% to %FZ.DATE date dd.mm.yyyy%.

Your  absence  request  for  the  period  from  %FZ.DATB  date  dd.mm.yyyy%  to  %FZ.DATE  date

dd.mm.yyyy% absence %FZ.ENTLTMOD%  %FZ.BEZL:ENTLTMOD% has been approved.

Your  absence  request  for  the  period  from  %FZ.DATB  date  dd.mm.yyyy%  to  %FZ.DATE  date

dd.mm.yyyy% absence %FZ.ENTLTMOD%  %FZ.BEZL:ENTLTMOD% has been rejected.

The following placeholders are available for creating the message:

Event

Acronyms

Description

FZ.APPLICATION_FILED
FZ.APPLICATION_ALLOWED
FZ.APPLICATION_REJECTED
FZ.APPLICATION_WITHDRAWN

FZ.APPLICATION_ALLOWED
FZ.APPLICATION_REJECTED

Start date
Comment

Unique record number
End date
Absence payment
Company from the absence planning

FZ.DATB
FZ.BEZL
FZ.BEZL:ENTLTMOD  Absence designation
FZ.VERWEIS
FZ.DATE
FZ.ENTLTMOD
FZ.FIR
FZ.BEZK:ENTLTMOD  Absence abbreviation
FZ.PNR
FZ.NAME:PNR
FZ.PNAME
FZ.PVORNAME
PNR.BESCHVERH
PNR.TEL:FIR
PNR.EMAIL:FIR
PNR.BER
PNR.KST
PNR.ABT
PNR.PKREIS
PNR.TAETIGKEIT
PNR.PNR:VGS
FZ.KAT
FZ.DAT:APPLY
FZ.ZEI:APPLY
FZ.BEARB
FZ.NAME:BEARB

Personnel number
Person's name
Last name
First name
Employment relationship
Company phone
E-mail (business)
Area
Cost center
Department
Employee subgroup
The person's activity
The supervisor's personnel number
Absence category
Date of request
Period of request
Modified by
Editor name

SMA-SFP_82.docx

Version: 1.0.23049

Page 18 of 27

SMA-SFP Shift and Absence Planning

Event

Acronyms

Description

FZ.APPLICATION_REJECTED

FZ.ESK:BEM

Reason of reject

This  variable  is  only  available  on  the

HYDRA  systems  with  at  least  Service

Pack 9 (2016).

Notification tab

You  can  configure  how  the  message  is  sent  in  the  Notification  tab.  You  can  see  in  the  example

below,  that  the  notification  is  sent  to  the  console  (MOC)  where  the  supervisor  is  logged  on,  and

additionally by e-mail.

If the e-mail notification type is active, an additional field is shown. You can enter one or more valid

e-mail  addresses,  separated  by  a  comma,  in  the  Send  e-mail  by  CC  to  field.  When  the  e-mail  is

sent to the recipient of the escalation, a copy goes to the CC addressee(s):

SMA-SFP_82.docx

Version: 1.0.23049

Page 19 of 27

SMA-SFP Shift and Absence Planning

If a message cannot be sent to the recipient of the escalation by e-mail,  no copy is sent to the

CC  addressee,  either.  This  could  be  the  case  if  he/she  does  not  have  any  e-mail  address.

No  e-mail  notification  is  required  for  employees  for  whom  no  e-mail  address  is  entered  in  the

personnel master record.

This notification type is configured in a way that the message is displayed only once on the PZE

terminal and is removed after a maximum of 4 weeks. However, the message can be displayed

several times during the period of the cyclic loading of authorizations. The message is displayed

with  the  following  actions  on  the  PZE  terminal:  In,  out,  break,  info,  message  and  absence

reason.

Messages can only be displayed on terminals of the type CT-36x, CT-37x and CT-38x.

Data retention of escalations

By  default,  escalations  are  stored  for  30  days.  With  absence  requests,  you  must  usually  extend  this

period so that the request is still displayed when the absence only starts half a year later, for example.

Supervisor and E-mail Address Configuration

Menu

Master data  Staff  HR master data

Transaction code

Pers

Function authorization

Pers

SMA-SFP_82.docx

Version: 1.0.23049

Page 20 of 27

The person's supervisor is entered in the Person tab of the HR master data. Absence times requested in

the workflow are forwarded to this supervisor.

SMA-SFP Shift and Absence Planning

SMA-SFP_82.docx

Version: 1.0.23049

Page 21 of 27

Enter  the  e-mail  address  in  the  Company  e-mail  field  in  the  Personal  Data  tab  for  employees  and

supervisors that are notified by e-mail.

SMA-SFP Shift and Absence Planning

Allocation of Supervisor to HYDRA User

Menu

System administration  User administration  Users

Transaction code

user

Function authorization

user

When the supervisor logs on to the HYDRA MOC, the system displays the requests for absences in the

Current  Escalations  window.  For  this  to  work,  it  is  necessary  to  link  the  personnel  number  of  the

supervisor and the User number he/she uses to log on.

SMA-SFP_82.docx

Version: 1.0.23049

Page 22 of 27

SMA-SFP Shift and Absence Planning

Company, Person

Assignment of the user to a person in the HR master data.

Control of Absence Times that are displayed

Menu

Master data  Labor time  Control of absence times

Transaction code

abse

Function authorization

abse

SMA-SFP_82.docx

Version: 1.0.23049

Page 23 of 27

The  absence  times    you  can  select  in  the  Absence  workflow  are  specified  in  the  Control  of  absences

window.

SMA-SFP Shift and Absence Planning

Absence may be requested

The button specifies whether you can select the absence time using the Web interface.

Request needs to be approved

This  parameter  is  used  to  specify  whether  the  absence  time  requested  via  the  absence  workflow

must be approved by the supervisor or whether it is automatically approved.

SMA-SFP_82.docx

Version: 1.0.23049

Page 24 of 27

SMA-SFP Shift and Absence Planning

5  Replacements

Overview

If the supervisor is absent and an absence request is made via absence workflow, then you can forward

this absence request to the person replacing the supervisor (replacement).

The settings for the replacement configuration are made in different applications in HYDRA MOC:

Configuration – HR master data

Menu

Master data  Staff  HR master data

Transaction code

pers

Function authorization

pers.*

You specify the replacement of the supervisor in the application HR master data.

Field descriptions

It  is  important  to  specify  Replacement  1  and  Replacement  2  in  the  HR  master  data  of  the  relevant

supervisor.

Replacement 1

Specifies the first person replacing the supervisor. You can use this field to specify the person that

replaces  the  supervisor  in  case  of  absence.  The  absence  workflow  uses  this  field  when  a  user

replacing the supervisor is required.

Replacement 2

Specifies the second person replacing the supervisor. You can use this field to specify the person

that replaces the supervisor and the first replacement in case  of absence. The  absence  workflow

uses this field when a user replacing the supervisor is required.

Configuration – INI configuration

Menu

System administration  System settings  INI configuration

Transaction code

inicfg

Function authorization

inicfg.*

SMA-SFP_82.docx

Version: 1.0.23049

Page 25 of 27

SMA-SFP Shift and Absence Planning

INI configuration:

  Name:
  Section:
  Key:
  Value:

FORWARDING
WORKFLOW
DEPUTY
7

By default, the value must be set to 7.

The  INI  configuration  specifies  that  the  supervisor  must  be  available  at  least  7  days  before  start  of  the

holiday leave of the person. Only then can the supervisor authorize or reject the request. If the supervisor

cannot guarantee this because of an absence (e.g. holiday leave or sick leave), the absence request is

sent to the first replacement. HYDRA uses the absence planning or the personnel scheduling to identify if

a  supervisor  is  available  or  not.  If  also  the  first  person  replacing  the  supervisor  is  not  available  these  7

days, then the absence request is sent to the second replacement.

Graphic presentation:

SMA-SFP_82.docx

Version: 1.0.23049

Page 26 of 27

SMA-SFP Shift and Absence Planning

If the supervisor, the replacement and the second replacement are not available in the specified period (7

days), then the absence request is only sent to the supervisor.

SMA-SFP_82.docx

Version: 1.0.23049

Page 27 of 27

