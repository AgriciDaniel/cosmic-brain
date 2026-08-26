Configuration Absence Workflow

1  Configuration Absence Workflow

Overview

Employees can use the absence workflow to request absences via Internet and/or Intranet. When a request

has  been  filed,  the  supervisor  is  informed  and  can  then  approve  or  reject  the  request.  The  employee

receives a notification via e-mail or on the terminal if the absence request was approved or not.

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

MOC_AbsenceTimeWorkflow.docx

Version: 1.8.21229

Page 1 of 14

Configuration Absence Workflow

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

MOC_AbsenceTimeWorkflow.docx

Version: 1.8.21229

Page 2 of 14

Event tab for FZ.APPLICATION_FILED

Configuration Absence Workflow

Event tab for FZ.APPLICATION_ALLOWED

MOC_AbsenceTimeWorkflow.docx

Version: 1.8.21229

Page 3 of 14

Event tab for FZ.APPLICATION_REJECTED

Configuration Absence Workflow

Event tab for FZ.APPLICATION_WITHDRAWN

The  entries  in  the  Message  and  Notification  tabs  have  the  same  settings  as  the  approval  of  an

absence request.

Message tab

You can define the subject and text of the message in the Message tab

MOC_AbsenceTimeWorkflow.docx

Version: 1.8.21229

Page 4 of 14

Configuration Absence Workflow

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

MOC_AbsenceTimeWorkflow.docx

Version: 1.8.21229

Page 5 of 14

Event

Acronyms

Description

FZ.APPLICATION_REJECTED

FZ.ESK:BEM

Reason of reject

Configuration Absence Workflow

This  variable  is  only  available  on  the

HYDRA systems with at least Service

Pack 9 (2016).

Notification tab

You can configure how the message is sent in the Notification tab. You can see in the example below,

that the notification is sent to the console (MOC) where the supervisor is logged on, and additionally

by e-mail.

If the e-mail notification type is active, an additional field is shown. You can enter one or more valid

e-mail addresses, separated by a comma, in the Send e-mail by CC to field. When the e-mail is sent

to the recipient of the escalation, a copy goes to the CC addressee(s):

MOC_AbsenceTimeWorkflow.docx

Version: 1.8.21229

Page 6 of 14

Configuration Absence Workflow

If a message cannot be sent to the recipient of the escalation by e-mail,  no copy is sent to the

CC  addressee,  either.  This  could  be  the  case  if  he/she  does  not  have  any  e-mail  address.

No  e-mail  notification  is  required  for  employees  for  whom  no  e-mail  address  is  entered  in  the

personnel master record.

This notification type is configured in a way that the message is displayed only once on the PZE

terminal and is removed after a maximum of 4 weeks. However, the message can be displayed

several times during the period of the cyclic loading of authorizations. The message is displayed

with the following actions on the PZE terminal: In, out, break, info, message and absence reason.

Messages can only be displayed on terminals of the type CT-36x, CT-37x and CT-38x.

Data retention of escalations

By default, escalations are stored for 30 days. With absence requests, you must usually extend this period

so that the request is still displayed when the absence only starts half a year later, for example.

Supervisor and E-mail Address Configuration

Menu

Master data  Staff  HR master data

Transaction code

Pers

Function authorization

Pers

MOC_AbsenceTimeWorkflow.docx

Version: 1.8.21229

Page 7 of 14

The person's supervisor is entered in the Person tab of the HR master data. Absence times requested in

the workflow are forwarded to this supervisor.

Configuration Absence Workflow

MOC_AbsenceTimeWorkflow.docx

Version: 1.8.21229

Page 8 of 14

Enter  the  e-mail  address  in  the  Company  e-mail  field  in  the  Personal  Data  tab  for  employees  and

supervisors that are notified by e-mail.

Configuration Absence Workflow

Allocation of Supervisor to HYDRA User

Menu

System administration  User administration  Users

Transaction code

user

Function authorization

user

When the supervisor logs on to the HYDRA MOC, the system displays the requests for absences in the

Current Escalations window. For this to work, it is necessary to link the personnel number of the supervisor

and the User number he/she uses to log on.

MOC_AbsenceTimeWorkflow.docx

Version: 1.8.21229

Page 9 of 14

Configuration Absence Workflow

Company, Person

Assignment of the user to a person in the HR master data.

Control of Absence Times that are displayed

Menu

Master data  Labor time  Control of absence times

Transaction code

abse

Function authorization

abse

MOC_AbsenceTimeWorkflow.docx

Version: 1.8.21229

Page 10 of 14

The  absence  times    you  can  select  in  the  Absence  workflow  are  specified  in  the  Control  of  absences

window.

Configuration Absence Workflow

Absence may be requested

The button specifies whether you can select the absence time using the Web interface.

Request needs to be approved

This  parameter  is  used  to  specify  whether  the  absence  time  requested  via  the  absence  workflow

must be approved by the supervisor or whether it is automatically approved.

MOC_AbsenceTimeWorkflow.docx

Version: 1.8.21229

Page 11 of 14

Configuration Absence Workflow

2  Replacements

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

MOC_AbsenceTimeWorkflow.docx

Version: 1.8.21229

Page 12 of 14

Configuration Absence Workflow

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

a supervisor is available or not. If also the first person replacing the supervisor is not available these 7 days,

then the absence request is sent to the second replacement.

Graphic presentation:

MOC_AbsenceTimeWorkflow.docx

Version: 1.8.21229

Page 13 of 14

Configuration Absence Workflow

If the supervisor, the replacement and the second replacement are not available in the specified period (7

days), then the absence request is only sent to the supervisor.

MOC_AbsenceTimeWorkflow.docx

Version: 1.8.21229

Page 14 of 14

