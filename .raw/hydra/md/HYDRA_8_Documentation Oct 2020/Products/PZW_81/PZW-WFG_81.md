Manual

Workflow for Absence Time
Approval
PZW-WFG 8.1

Version 1.0.54

Last changed on: 19.06.2020

Workflow for Absence Time Approval

Copyright

©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notices.

PZW-WFG_81.docx

Version: 1.0.18468

Page 2 of 21

Workflow for Absence Time Approval

Contents

1  Workflow for Absence Time Approval - Overview ........................................ 4

2  Configuration for Absence Workflow ............................................................ 5

3  Request Absences at the Terminal ............................................................ 18

PZW-WFG_81.docx

Version: 1.0.18468

Page 3 of 21

1  Workflow for Absence Time Approval - Overview

Workflow for Absence Time Approval

Purpose

Application Service for mapping a user-friendly and transparent absence time approval workflow.

Implementation Considerations

You use the function package if:



you  wish  to  provide  employees  with  the  possibility  to  request  absence  times  on  PZE  or  BDE

terminals (only available at specific terminal types).



the  relevant  supervisors  are  to  be  notified  if  an  absence  time  was  requested  so  that  they  may

approve or reject the request.

  employees are to be informed, for example, when their request is approved or rejected by means

of a message on the labor time recording terminal.

Integration

Requested absence times are displayed in italics in personnel scheduling  and can thus be considered in

the planning of available employees.

Features

  Absence workflow.

o  Terminal  dialog  for  employees  to  request  absence  times  (e.g.  leave,  flextime  reduction

...) and display their requested and approved absence times at the PZE or BDE terminal.

o  Notification of the supervisor with regard to requested absence times (e.g. by e-mail).

o  Function for approving or rejecting requested absence times.

o  Withdrawal by the employee of absence requests not yet processed.

o  Notification of the requesting party, e.g. at the PZE terminal or by e-mail, as to whether

the absence time was approved or rejected.

PZW-WFG_81.docx

Version: 1.0.18468

Page 4 of 21

Workflow for Absence Time Approval

2  Configuration for Absence Workflow

Overview

The absence workflow enables employees to request absence times via the Internet and/or Intranet. After

filing a request, the supervisor will be informed and can then approve or reject the request. Subsequently,

the  employee  will  receive  a  notification  via  e-mail  or  on  the  terminal  as  to  whether  or  not  the  absence

request was approved.

The settings for the absence workflow are made at various locations in MOC:

Configuration – Basic Settings

Menu

System administration  System settings  Basic settings

Transaction code

setup

Function authorization

setup

In  the  ESK  tab  of  the  basic  settings  screen,  the  e-mail  server  must  be  entered  so  that  notifications

regarding absence times and their approval and/or rejection can be forwarded to the relevant employees

by e-mail:

Field Descriptions

In this regard, the IP address of the SMTP server and the sender entered in the e-mails to be sent are of

particular importance.

PZW-WFG_81.docx

Version: 1.0.18468

Page 5 of 21

Workflow for Absence Time Approval

SMTP server

The IP address or the name of the local  SMTP server for sending e-mails is to be entered  in the

SMTP server field.

SMTP sender

A central e-mail account can be entered here. E-mails sent via HYDRA escalation management will

then have this central account as sender.

Event Configuration in Escalation Management

Menu

Master data  Escalation management  Escalation configuration

Transaction code

esccfg

Function authorization

esccfg

In the event configuration, the events for requesting, approving and rejecting absence times are entered:

PZW-WFG_81.docx

Version: 1.0.18468

Page 6 of 21

Workflow for Absence Time Approval

Field Descriptions

Event

FZ.APPLICATION_FILED -> triggered when an absence time is requested.

FZ.APPLICATION_ALLOWED -> triggered after approval of an absence request.

FZ.APPLICATION_REJECTED -> triggered after rejection of an absence request.

FZ.APPLICATION_WITHDRAWN  ->  triggered  after  withdrawal  of  an  absence  request  by  an

employee.

Event tab for FZ.APPLICATION_FILED

PZW-WFG_81.docx

Version: 1.0.18468

Page 7 of 21

Event tab for FZ.APPLICATION_ALLOWED

Workflow for Absence Time Approval

Event tab for FZ.APPLICATION_REJECTED

PZW-WFG_81.docx

Version: 1.0.18468

Page 8 of 21

Workflow for Absence Time Approval

Event tab for FZ.APPLICATION_WITHDRAWN

Entries  in  the  Message  and  Notification  tabs  are  made  in  analogy  to  the  approval  of  an  absence

request.

Message tab

You may define the subject and text of the message in the Message tab

Examples:

Person %FZ.PNR% %FZ.NAME:PNR% has requested %FZ.BEZL:ENTLTMOD% from %FZ.DATB

date dd.mm.yyyy% through %FZ.DATE date dd.mm.yyyy%.

Your absence request for the period from %FZ.DATB date dd.mm.yyyy% through %FZ.DATE date

dd.mm.yyyy% absence %FZ.ENTLTMOD%  %FZ.BEZL:ENTLTMOD% was approved.

Your absence request for the period from %FZ.DATB date dd.mm.yyyy% through %FZ.DATE date

dd.mm.yyyy% absence %FZ.ENTLTMOD%  %FZ.BEZL:ENTLTMOD% was rejected.

The following placeholders are available for creating the message:

PZW-WFG_81.docx

Version: 1.0.18468

Page 9 of 21

Event

Identifiers

Description

Workflow for Absence Time Approval

FZ.APPLICATION_FILED
FZ.APPLICATION_ALLOWED
FZ.APPLICATION_REJECTED
FZ.APPLICATION_WITHDRAWN

FZ.APPLICATION_ALLOWED
FZ.APPLICATION_REJECTED

Notification tab

FZ.DATB
FZ.BEZL
FZ.BEZL:ENTLTMOD
FZ.VERWEIS
FZ.DATE
FZ.ENTLTMOD
FZ.FIR

Start date
Comment
Absence designation
Unique record number
End date
Absence payment
Company for personnel
number

FZ.BEZK:ENTLTMOD  Absence abbreviation
FZ.PNAME
FZ.NAME:PNR
FZ.PNR
FZ.PVORNAME
PNR.BESCHVERH
PNR.TEL:FIR
PNR.EMAIL:FIR
PNR.KST
PNR.ABT
PNR.PKREIS
FZ.KAT
FZ.DAT:APPLY
FZ.ZEI:APPLY
PNR.TAETIGKEIT
PNR.BER
FZ.BEARB
FZ.NAME:BEARB

Person's last name
Person's name
Personnel number
First name
Employment relationship
Company phone
Company e-mail
Cost center
Department
Employee subgroup
Absence category
Date of request
Period of request
Person's subgroup
Area
Editor
Editor name

How  the  message  is  sent  can  be  configured  in  the  Notification  tab.  In  the  example  below,  the

notification is sent to the console (MOC) where the supervisor might be logged on, and in addition

by e-mail.

PZW-WFG_81.docx

Version: 1.0.18468

Page 10 of 21

Workflow for Absence Time Approval

If the e-mail notification type is active, an additional field is shown. One or more valid e-mail

addresses, separated by a comma, can be entered here. When the e-mail is sent to the recipient of

the escalation, a copy is sent to the CC addressee

If a message cannot be sent to the recipient of the escalation by e-mail, for instance if he/she

does not have any e-mail address, no copy is sent to the CC addressee, either.

Messages can only be displayed on terminals of types CT-360, CT-370 and CT-380.

Employees  without  any  e-mail  address  entered  in  the  HR  master  data  will  not  receive  any

notification by e-mail.

Supervisor and E-mail Address Configuration

Menu

Master data  Staff  HR master data

Transaction code

pers

Function authorization

pers

PZW-WFG_81.docx

Version: 1.0.18468

Page 11 of 21

The person's supervisor is entered in the Person tab of the HR master data. Absence times requested in

the workflow are forwarded to this supervisor.

Workflow for Absence Time Approval

PZW-WFG_81.docx

Version: 1.0.18468

Page 12 of 21

For  employees  and  supervisors  to  be  notified  by  e-mail,  the  e-mail  address  must  be  entered  in  the

Company e-mail field in the Personal data tab.

Workflow for Absence Time Approval

Allocation of Supervisor to HYDRA User

Menu

System administration  User administration  User

Transaction code

user

Function authorization

user

When logging on to MOC,  the absence requests are shown to the supervisor in the  Messages window.

To this end, it is necessary that a link is established between the personnel number of the supervisor and

his/her user, under which he/she logs on to the system.

PZW-WFG_81.docx

Version: 1.0.18468

Page 13 of 21

Workflow for Absence Time Approval

Company, Person

Assignment of the user to a person in the HR master data.

Control of Absence Times to be Displayed

Menu

Master data  Labor time  Control of absence times

Transaction code

abse

Function authorization

abse

The absence times to be available for selection in the absence workflow are determined in the control of

absence times window.

PZW-WFG_81.docx

Version: 1.0.18468

Page 14 of 21

Workflow for Absence Time Approval

Absence time may be requested.

This  button  determines  whether  this  absence  time  is  available  for  selection  when  requesting  an

absence time via the web interface.

Request needs to be approved

This parameter is used to determine whether the absence time requested via the absence workflow

has to be approved by the supervisor or whether it is automatically considered as approved.

Processing of Absence Times

Menu

Information management  Postings  Current escalations

Transaction code

escov

Function authorization

escov

PZW-WFG_81.docx

Version: 1.0.18468

Page 15 of 21

The absence times requested by the employee are shown in the current escalations window, where they

can be processed by the supervisor.

Workflow for Absence Time Approval

PZW-WFG_81.docx

Version: 1.0.18468

Page 16 of 21

The supervisor can read the message and subsequently approve or reject the request.

Workflow for Absence Time Approval

The approval and/or rejection of an absence request is selected in the "Solution reason" field. The clear

text  is  automatically  transferred  to  the  input  field  at  the  top.  Here  it  is  possible  to  enter  reasons  for  the

decision made.

PZW-WFG_81.docx

Version: 1.0.18468

Page 17 of 21

Workflow for Absence Time Approval

3  Request Absences at the Terminal

Overview

Employees can  use  this function on  PZE  or  BDE terminals to request, modify  or delete applications for

absences. At the same time, the employee receives an overview of requests already submitted and their

status.

Terminal operation

Absence planning is initiated on the PZE terminal by selecting the relevant buttons and by reading in the

staff badge number. The following dialog opens and future requested, approved or planned absences are

displayed.

On  the  BDE  terminal,  the  dialog  opens  immediately  after  pressing  the  proper  button.  Absences  are  not

displayed, however, until after the staff badge number has been read in. The staff badge number cannot

be  entered  from  the  keyboard,  but  for  security  reasons,  it  must  be  read  in  by  a  staff  badge  or  barcode

reader.

Please note:

This function can only be used when the terminal is online. If offline, the command is

aborted and an error message is displayed accordingly.

PZW-WFG_81.docx

Version: 1.0.18468

Page 18 of 21

The  list  only  shows  future  planned  absences  and  only  the  reasons  for  absences  that  can  also  be

requested or scheduled on the terminal. The following status options are displayed:

Workflow for Absence Time Approval

Status

Description

Requested

The absence was requested, but has not yet been authorized or refused.

Authorized

The absence was requested and authorized by the supervisor

Planned

No  request  is  required  for  the  absence  and  was  planned  either  on  the
terminal or on the HYDRA client.

Function key assignment

Cancellation

This key closes the dialog.

Request

The following dialog (P_FZP_INS) opens to request an absence:

After selecting a reason for absence and entering the time period, the absence can be requested or

planned using the OK key. You have the option to enter a comment.

PZW-WFG_81.docx

Version: 1.0.18468

Page 19 of 21

Workflow for Absence Time Approval

Edit

The  employee  can  modify  a  planned  absence  in  the  Edit  absence  dialog  (P_FZP_UPD).  The

function is only available for absences for which no request is required:

Delete

The  employee  can  delete  an  absence  that  was  requested  or  planned  with  the  Delete  absence

dialog (P_FZP_DEL). If this is a requested absence, the supervisor is informed that the request was

withdrawn:

PZW-WFG_81.docx

Version: 1.0.18468

Page 20 of 21

Workflow for Absence Time Approval

Info

The employee can display his/her current account balances by pressing this key. The display is the

same as the one generated by pressing the info key on the PZE terminal.

Terminal configuration

On  PZE  terminals,  the  functions  described  can  be  activated  with  an  absence  reason  key.  In  addition,

"_FZP"  must  be  entered  in  one  of  the  fields  Absence  reason  1  through  Absence  reason  4  in  the  HR

Functions  tab  in  the  terminal  configuration.  The  labeling  of  the  corresponding  key  on  the  PZE  terminal

can be defined in one of the fields Absence reason text 1 through Absence reason text 4.

On  the  BDE  terminal,  the  functions  can  be  activated  via  the  dynamic  dialog  P_FZP.  The  INI-file

ctaipbut.ini is used to accomplish this by entering the following in any random section:

X=P_FZP,R,key labeling

(X=  button index)

PZW-WFG_81.docx

Version: 1.0.18468

Page 21 of 21

