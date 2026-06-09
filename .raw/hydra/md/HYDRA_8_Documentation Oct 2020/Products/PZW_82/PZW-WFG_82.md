Manual

Workflow for Absence
Approval
PZW-WFG 8.2

Version 1.0.15126

Last changed on: 19.06.2020

Workflow for Absence Approval

Copyright

©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notices.

PZW-WFG_82.docx

Version: 1.0.18468

Page 2 of 21

Workflow for Absence Approval

Contents

1  Workflow for Absence Approval - Overview ................................................. 4

2  Configuration Absence Time Workflow ........................................................ 5

3  Requesting Absences on the Terminal ...................................................... 16

4  Approval and Rejection of Absence Requests ........................................... 21

4.1  Approval and rejection in absence planning ...................................................... 21

4.2  Approval and rejection in personnel scheduling ................................................. 21

PZW-WFG_82.docx

Version: 1.0.18468

Page 3 of 21

1  Workflow for Absence Approval - Overview

Workflow for Absence Approval

Purpose

Application Service for mapping a user-friendly and transparent absence approval workflow.

Implementation Considerations

You use the function package if:



you  wish  to  provide  employees  with  the  possibility  to  request  absence  times  on  PZE  or  BDE

terminals (only available at specific terminal types).



the relevant supervisors are to be notified if an absence was requested so that they may approve

or reject the request.

  employees are to be informed, for example, when their request is approved or rejected by means

of a message on the labor time recording terminal.

Integration

Requested absences are displayed in italics in  personnel scheduling and can thus be considered in the

planning of available employees.

Features

  Absence workflow.

o  Terminal  dialog  for  employees  to  request  absence  times  (e.g.  leave,  flextime...)  and

display their requested and approved absences at the PZE or BDE terminal.

o  Notification of the supervisor with regard to requested absence times (e.g. by e-mail).

o  Function for approving or rejecting requested absences.

o  Withdrawal by the employee of absence requests not yet processed.

o  Notification of the requesting party, e.g. at the PZE terminal or by e-mail, as to whether

the absence was approved or rejected.

PZW-WFG_82.docx

Version: 1.0.18468

Page 4 of 21

Workflow for Absence Approval

2  Configuration Absence Time Workflow

Overview

The  absence  workflow  enables  employees  to  request  absences  via  the  Internet  and/or  Intranet.  After

filing a request, the supervisor will be informed and can then approve or reject the request. Subsequently,

the  employee  will  receive  a  notification  via  e-mail  or  on  the  terminal  as  to  whether  or  not  the  absence

request was approved.

The settings for the absence workflow are configured at various different places in MOC:

Configuration – Basic Settings

Menu

System administration  System settings  Basic settings

Transaction code

setup

Function authorization

setup

In  the  ESK  tab  of  the  Basic  settings  screen,  the  e-mail  server  must  be  entered  so  that  notifications  for

absence times and their approval and/or rejection can be forwarded to the employees by e-mail:

Field descriptions

The IP address of the SMTP server and the sender that is entered as the sender in the mails to be sent

are particularly important here.

PZW-WFG_82.docx

Version: 1.0.18468

Page 5 of 21

SMTP server

Enter the IP address or name of the local SMTP server in the SMTP server field in order to send e-

Workflow for Absence Approval

mails.

Sender

Enter a central e-mail account. E-mails sent via HYDRA Escalation Management will then have this

central account as sender.

Event Configuration in Escalation Management

Menu

Master data  Escalation management  Escalation configuration

Transaction code

esccfg

Function authorization

esccfg

Enter the events for requesting, approving and rejecting absences here Escalation configuration:

Field descriptions

Event

FZ.APPLICATION_FILED -> triggered when an absence is requested.

FZ.APPLICATION_ALLOWED -> triggered after approval of an absence request.

FZ.APPLICATION_REJECTED -> triggered after rejection of an absence request.

FZ.APPLICATION_WITHDRAWN  ->  triggered  after  withdrawal  of  an  absence  request  by  an

employee.

PZW-WFG_82.docx

Version: 1.0.18468

Page 6 of 21

Event tab for FZ.APPLICATION_FILED

Workflow for Absence Approval

Event tab for FZ.APPLICATION_ALLOWED

PZW-WFG_82.docx

Version: 1.0.18468

Page 7 of 21

Event tab for FZ.APPLICATION_REJECTED

Workflow for Absence Approval

Event tab for FZ.APPLICATION_WITHDRAWN

Entries  in  the  Message  and  Notification  tabs  are  made  at  the  same  time  as  the  approval  of  an

absence request.

Message tab

You may define the subject and text of the message in the Message tab

PZW-WFG_82.docx

Version: 1.0.18468

Page 8 of 21

Workflow for Absence Approval

Examples:

Person %FZ.PNR% %FZ.NAME:PNR% has requested %FZ.BEZL:ENTLTMOD% from %FZ.DATB

date dd.mm.yyyy% through %FZ.DATE date dd.mm.yyyy%.

Your absence request for the period from %FZ.DATB date dd.mm.yyyy% through %FZ.DATE date

dd.mm.yyyy% absence %FZ.ENTLTMOD%  %FZ.BEZL:ENTLTMOD% was approved.

Your absence request for the period from %FZ.DATB date dd.mm.yyyy% through %FZ.DATE date

dd.mm.yyyy% absence %FZ.ENTLTMOD%  %FZ.BEZL:ENTLTMOD% was rejected.

The following placeholders are available for creating the message:

Event

IDs

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

PZW-WFG_82.docx

Version: 1.0.18468

Page 9 of 21

Workflow for Absence Approval

Event

IDs

Description

FZ.APPLICATION_REJECTED

FZ.ESK:BEM

Reject the reason

This  variable  is  only  available  on  the

HYDRA  systems  with  Service  Pack  9

(2016).

Notification tab

You  can  configure  how  the  message  is  sent  in  the  Notification  tab.  You  can  see  in  the  example

below,  that  the  notification  is  sent  to  the  console  (MOC)  where  the  supervisor  is  logged  on,    and

also by e-mail.If the e-mail notification type is active, an additional field is shown. You can enter one

or more valid e-mail addresses, separated  by  a comma, in the  Send e-mail by  CC to field. When

the e-mail is sent to the recipient of the escalation, a copy goes to the CC addressee(s):

PZW-WFG_82.docx

Version: 1.0.18468

Page 10 of 21

Workflow for Absence Approval

If a message cannot be sent to the recipient of the escalation by e-mail,  no copy is sent to the

CC  addressee,  either.  This  could  be  the  case  if  he/she  does  not  have  any  e-mail  address

No  e-mail  notification  is  required  for  employees  for  whom  no  e-mail  address  is  entered  in  the

personnel master record.

This notification type is configured in a way that the message is displayed only once on the PZE

terminal and is removed after a maximum of 4 weeks. However, the message can be displayed

several times during the period of the cyclic loading of authorizations. The message is displayed

with the following actions on the PZE terminal: In, out, break, info, and message and absence

reason.

Messages can only be displayed on terminals of the type CT-36x, CT-37x and CT-38x.

Data retention of escalations

By  default,  escalations  are  stored  for  30  days.  Usually,  this  duration  is  to  be  extended  for  absence

requests, e.g. in cases where the absence only starts half a year later.

Supervisor and E-mail Address Configuration

Menu

Master data  Staff  HR master data

Transaction code

Pers

Function authorization

Pers

PZW-WFG_82.docx

Version: 1.0.18468

Page 11 of 21

The person's supervisor is entered in the Person tab of the HR master data. Absence times requested in

the workflow are forwarded to this supervisor.

Workflow for Absence Approval

PZW-WFG_82.docx

Version: 1.0.18468

Page 12 of 21

Enter  the  e-mail  address  in  the  E-mail  Company  field  in  the  Personal  Data  tab  for  employees  and

supervisors to be notified by e-mail.

Workflow for Absence Approval

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

PZW-WFG_82.docx

Version: 1.0.18468

Page 13 of 21

Workflow for Absence Approval

Company, Person

Assignment of the user to a person in the HR master data.

Control of Absence Times to be displayed

Menu

Master data  Labor time  Control of absence times

Transaction code

abse

Function authorization

abse

PZW-WFG_82.docx

Version: 1.0.18468

Page 14 of 21

The  absence  times  you  can  select  in  the  Absence  workflow  are  specified  in  the  Control  of  absences

window.

Workflow for Absence Approval

Absence may be requested.

The button specifies whether you can select the absence time using the Web interface.

Request needs to be approved

This  parameter  is  used  to  specify  whether  the  absence  time  requested  via  the  absence  workflow

has to be approved by the supervisor or whether it is automatically approved.

PZW-WFG_82.docx

Version: 1.0.18468

Page 15 of 21

Workflow for Absence Approval

3  Requesting Absences on the Terminal

Overview

Employees can use this function to request, change  and delete absences on the PZE or  BDE terminal.

The  terminal  also  provides  an  overview  for  the  employee  that  displays  the  former  requests  and  their

request status.

Operation on the terminal

To start the absence planning on the PZE terminal, select the respective button and scan the badge. The

following dialog opens and shows the requested, approved or planned absences.

On the  BDE terminal,  the  dialog opens directly  when  you have  pressed the respective  button. To show

the absences, you must first scan the badge. You cannot enter the staff badge number via keyboard. For

security reasons, you must scan the badge via badge or bar code reader.

Note:

You  can  only  use  the  function,  if  the  terminal  is  online.  If  the  terminal  is  offline,  the

request is canceled and an error message is output.

PZW-WFG_82.docx

Version: 1.0.18468

Page 16 of 21

The list only shows planned absences of the future and the absence reasons that you can also request or

plan on the terminal. The following statuses are shown:

Workflow for Absence Approval

Status

Description

requested

The absence has been requested, but has not yet been approved or refused.

approved

The absence has been requested and has been approved by the superior.

planned

The  absence  does  not  require  approval  and  has  been  planned  on  the
terminal or on the HYDRA client.

The list does not show the rejected requests. This way, the employee is not reminded again and

again  that  they  actually  wanted  to  be  off  at  a  different  time  and  that  this  request  has  been

refused.  The  information  that  an  absence  request  has  been  refused  is  shown  when  the

employee clocks in or out on the PZE terminal (AIP or ctwin).

Function key assignment

Cancel

Use this button the close the dialog.

Request

To request an absence, the following dialog opens (P_FZP_INS):

Select an absence reason and enter a period. Click the button OK to request or plan the absence.

You can also enter a comment.

PZW-WFG_82.docx

Version: 1.0.18468

Page 17 of 21

Workflow for Absence Approval

Edit

The employee can use the dialog Edit absence (P_FZP_UPD) to change a planned absence. This

function is only available for absences that need not be approved:

Delete

The employee can use the dialog Delete absence (P_FZP_DEL) to delete a planned or requested

absence.  If  an  absence  has  been  requested,  the  superior  is  informed  that  the  request  has  been

canceled:

PZW-WFG_82.docx

Version: 1.0.18468

Page 18 of 21

Workflow for Absence Approval

The button Delete is only available for the following absences:

- requested and not yet approved absences;

- absences that do not require approval;

- absences that have been entered on the terminal.

Info

The  employee  can  use  this  button  to  display  the  current  account  balances.  The  same  display  is

shown if you press the Info button on the PZE terminal:

Terminal configuration

On the PZE terminal, the functionality described can be enabled using an Absence reason button. In the

terminal configuration, tab HR functions, assign the entry "_FZP" to one of the fields Absence reason 1 to

Absence reason 4. You can define the label text of the respective button on the PZE terminal in one of

the fields Absence reason text 1 to Absence reason text 4.

On  the  BDE  terminal,  you  can  enable  the  functionality  using  the  dynamic  dialog  P_FZP.  The  following

entry is made in any section of the INI file ctaipbut.ini:

X=P_FZP,R,button label

  (X =  button index)

Activating dynamic dialogs

To  call  the  dialog  on  the  terminal,  the  dynamic  dialog  P_FZP  must  be  enabled.  The  dialog  is  usually

enabled  during  installation  of  the  system.  If  this  is  not  the  case,  you  can  enable  the  dialog  in  the

application Dynamic dialogs using the button Activate dialog.

PZW-WFG_82.docx

Version: 1.0.18468

Page 19 of 21

Workflow for Absence Approval

You can define dynamic dialogs for terminals or terminal groups. This option is mainly used on

BDE  terminals.  If  you  want  to  use  the  absence  workflow  on  a  terminal  where  dialogs  for  the

terminal or the terminal group exist, you must copy and enable the dialogs P_FZP, P_FZP_INS,

P_FZP_UPD and P_FZP_DEL for the terminal or the terminal group.

PZW-WFG_82.docx

Version: 1.0.18468

Page 20 of 21

Workflow for Absence Approval

4  Approval and Rejection of Absence Requests

Overview

Absence  requests  are  approved  and  rejected  in  the  MOC  via  absence  planning  and  personnel

scheduling.

4.1  Approval and rejection in absence planning

For  approving  and/or  rejecting  an  absence  request  in  absence  planning,  select  the  relevant  absence;

then click one of the following buttons in the toolbar:

 Approve request

Function authorization: pabp.sign

This button is used to approve  a requested absence.  Further processing is executed  in the same

way as for approving a request in escalation management.

 Reject request

Function authorization: pabp.reject

This button is used to reject a requested absence. Further processing is executed in the same way

as for rejecting a request in escalation management.

4.2  Approval and rejection in personnel scheduling

For approving and/or rejecting an absence request in  personnel scheduling, select a day of the relevant

absence, open the context menu by right clicking and choose the function Approve request and/or Reject

request in the submenu Absence of the context menu:

PZW-WFG_82.docx

Version: 1.0.18468

Page 21 of 21

