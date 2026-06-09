Manual

Escalation Management
(Basis/Framework)
SIS-ESK 4.0pe

Version 1.3.23467

Last changed on: 12.06.2019

Escalation Management (Basis/Framework)

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

SIS-ESK_40.docx

Version: 1.3.23467

Page 2 of 32

Escalation Management (Basis/Framework)

Contents

1  Escalation Management - Overview ............................................................ 4

2  Escalation Configuration .............................................................................. 8

3  Function Groups ......................................................................................... 22

4  Current Escalations .................................................................................... 24

5  Escalation history ....................................................................................... 28

6  Escalation Management Archiving ............................................................. 30

7  Application-Relevant Settings in HYDRA ................................................... 32

SIS-ESK_40.docx

Version: 1.3.23467

Page 3 of 32

Escalation Management (Basis/Framework)

1  Escalation Management - Overview

Purpose

HYDRA  escalation  management  provides  a  framework  of  functions  that  can  be  used  to  forward  events

that  occur  or  were  recorded  in  HYDRA  to  individual  users  or  user  groups  in  real  time.  The  function  of

escalation management is to take active steps to ensure users are notified.

After notification, escalation management monitors times until acknowledgment by the recipients and until

escalation is concluded. Escalations can be forwarded to other users or user groups during processing.

Implementation considerations

You use escalation management function if you request an active and early notification of specific events

in the production environment in order to prevent downtimes and increase efficiency and productivity by

early response.

You use the escalation management function if you need to monitor the response times to escalation of

specific departments or persons.

The usage of multilingual database content (MDB) is not supported by escalation management.

Integration

Escalation management forms the framework for other HYDRA components in order to be able to transfer

and track events triggered there.

For  notifying  individuals,  the  escalation  management  accesses  both  the  user  administration  and  HR

master data registered in the system.

If  the  Recording  and  Maintenance  of  Labor  Times  component  (PZE-EPP)  is  used,  the  escalation

management function allows for identifying the addressee subject to the currently recorded attendance.

Notifications can be sent as e-mails by integrating the local mail server into the system.

Features

Escalation management features the following functions:

  Addressee definition:

o  Allocation of individual persons as addressees for messages

SIS-ESK_40.docx

Version: 1.3.23467

Page 4 of 32

o  Summary of several individuals into a function group as the recipient of a message

Escalation Management (Basis/Framework)

  Notification of user:

o  Notification of users of the MES Operation Cockpit in the MOC

o  Notification of recipients by e-mail



Integration with HR:

o  Verification  of  recipients'  attendance  by  comparison  with  In/Out  statuses  of  individuals  as

recorded by the HYDRA PZE.

o  Definition of substitutes if the employee to be contacted first is not available (information from

above-described comparison)

  Dispatch of messages on basis of flexible condition configuration

  Message management

o  Signing function for messages / forwarding on MOC

o  Possibility for repeated forwarding of messages to another user

o  Evaluation for traceability of escalation and monitoring response times

  Provision of escalation:

o  Triggering of escalation if not valid recipient could be identified

o  Triggering of escalation for unprocessed escalation

Component structure

The  core  of  escalation  management  is  the  escalation  manager.  This  is  a  continuously  active  process

(hyeskmgr.out/hyeskmgr.out)  which  receives  events  generated  by  individual  applications  and  verifies

whether  escalations  have  been  configured  for  these  events.  If  this  is  the  case,  the  escalation  manager

generates messages to users or groups of users for recorded communication technologies in accordance

with the configuration.

The events themselves are generated by the individual HYDRA applications. The causes of events may

be error or exceptional situations on the one hand (e.g. if a disk is full), or the result of "normal" recording

and processing of HYDRA on the other hand (e.g. if a new machine status is recorded on the terminal).

SIS-ESK_40.docx

Version: 1.3.23467

Page 5 of 32

Escalation Management (Basis/Framework)

In  such  cases,  the  applications  generate  an  event.  This  is  identified  by  an  unambiguous  designation  in

the  entire  system.  In  addition,  the  applications  provide  data  to  the  escalation  manager.  The  type  and

scope of the transferred data depend on the relevant event. In many cases, such data may be used as

conditions in the configuration and integrated into the messages to the sent.

Not all of the applications are capable of generating a message in each error case or exceptional situation

(e.g. a terminal is not able to report that it is offline). For this reason, the escalation manager has another

component - the escalation agent. The escalation agent periodically verifies the current status for values

allocated  to  periodical  monitoring.  If  violations  occur  during  verification,  the  controlling  agent  sends  the

relevant event to the escalation manager. Once an hour, the escalation manager updates its internal list

of configured events using the periodical events recorded in the data base.

To  perform  error  analysis,  you  can  use  the  "hyeskmgrpro"  file  containing  "TRUE;D+t"  to  activate  a  log

(./err/hyeskmgr.err.pro)  at  runtime  in  which,  among  other  things,  the  communication  is  recorded  while

sending the message (e.g., e-mail).Available escalations

Escalation  management  as  described  in  this  documentation  is  an  integral  part  of  the  MES  weaver.

Escalations are triggered by individual applications to be allocated to the individual application packages.

In  addition,  available  escalations  depend  on  a  release.  For  this  reasons,  please  find  a  schedule  of  the

escalations available for the relevant release and module in the relevant documents.

Event

Description

Identifiers

Description

Please note:

The  event
is
triggered  if  no
active
person
be
could
identified  within
function
a
when
group
checked
for
attendance  on
the
console
and/or the PZE.

The  event
is
triggered  if  an
escalation  has
occurred
but
remains
unprocessed.

ESK.NO_PERSON_AVAILABLE

No
available

person

ESK.ESKID

Event  for  which  no  person
could be identified

ESK.ESKBEZ

Event designation

ESK.RCV:FKT

Recipient function group

ESK.UNPROCESSED_ESCALATION  Unprocessed

ESK.ESKVERWEIS  Event ID

escalation

Unambiguous  event
ID
displayed in the escalation
management;
is
composed  of
the  event
and the clear reference.

it

Reference
Clear referent to event

ESK.VERWEIS

ESK.ESKID

Event

ESK.ESKBEZ

Event description

ESK.MSGSUBJ

Message subject

ESK.MSGTXT

Message text

ESK.DATB

ESK.ZEIB

Date of the triggering

Time of the triggering

ESK.DAUER

Duration (in seconds)

ESK.RCV:ART

Type of recipient

ESK.RCV:BEARB

Recipient user name

SIS-ESK_40.docx

Version: 1.3.23467

Page 6 of 32

Event

Description

Identifiers

Description

Please note:

Escalation Management (Basis/Framework)

ESK.RCV:PNR

Recipient staff number

ESK.RCV:FKT

Recipient function group
(if available)

PNR.PVORNAME

Recipient first name

PNR.PNAME

Recipient (last) name

ESK.RCV:BEZ

Recipient

HYD.LOCKED_RECORD

Locked
record

data

LOCK.APPLICATIO
N

Locked application!

LOCK.USR

User  who

triggered

the

locking

LOCK.BEARB

Employee  who

triggered

the locking

LOCK.MODUL

HYDRA  module  which

triggered the locking

LOCK.KEY:1

Locked values

....

LOCK.KEY:5

LOCK.DAT

Date of locking

LOCK.ZEI

Time of locking

LOCK.DURATION

Duration of locking

is
if  a
record

The  event
triggered
locking
blocks
in
processing
the
table
hyd_lock.  (e.g.
if
is
feedback
stopped)

SIS-ESK_40.docx

Version: 1.3.23467

Page 7 of 32

Escalation Management (Basis/Framework)

2  Escalation Configuration

Overview

Menu

Master data  Escalation management  Escalation configuration

Transaction code

esccfg

Function authorization

esccfg

Purpose

Use  this  function  to  specify  rules  for  the  conversion  of  events  into  escalations  (events  provided  by  the

applications). In the escalation configuration, you define the events that are converted to escalations, the

recipients of specified escalations and how the escalation is technically sent.

Integration

To  convert  events  into  escalations,  the  escalation  management  uses  the  data  stored  in  the  escalation

configuration.

Requirements

You have defined Function groups in the system if you:

  want to send an escalation to several recipients at the same time.

  want  to  send  an  escalation  to  specific  persons  of  a  group  subject  to  defined  factors,  e.g.

attendance.

You have linked HYDRA users of the User administration to persons of the HR master data to be able to

send messages to these users/persons.

Field descriptions

Tab Event

The  Event  tab  includes  general  information  on  an  escalation.  You  can  maintain  the  following

information:

Event

This event triggers an escalation. Applications generate the event if specific situations occur.

Using  the  search  function,  you  can  select  an  event  from  the  list  of  available  events.  You  cannot

enter events that are not available/included in the list.

SIS-ESK_40.docx

Version: 1.3.23467

Page 8 of 32

Escalation Management (Basis/Framework)

Designation

You  can  enter  a  description  of  the  event  in  this  field.  The  system  automatically  suggests  the

description stored with the event when you select an event. You can overwrite this suggestion.

The name entered in this field is later used in the overview dialogs of current escalations. To easily

identify the event, it is best to store a description that refers to the event and to the formula.

Recipient type

You can define the type of the recipient of a message in this field. The following types of recipients

are available:

Function

You can select a function group that is notified.

Person

You can enter a personnel number for this recipient type.

Supervisor

The notification is sent to the supervisor of the person included in the escalation

data.

The acronym "PNR" identifies the person.

Automatic

The notification is sent to the person included in the escalation data.

The acronym "PNR" identifies the person.

Workflow

The escalation triggers a specified workflow.

management

Recipient

Depending on the selected type of recipient, you can enter the recipient here.

If  you  have  selected  "Person"  as  recipient  type,  you  can  use  the  search  function  to  select  the

person from the HR master data.

If  you  have  selected  "Function"  as  recipient  type,  you  can  use  the  search  function  to  select  the

recipient from the stored function groups.

Priority

You can use the priority in the message overview to sort the messages. The priority does not have

any other function.

Farbe

Currently not used.

Active

This option specifies if the event configuration is enabled or not.

Cyclic monitoring

If the selected event is cyclically monitored, you must maintain the monitoring cycle here. The cycle

is defined in days, hours and minutes. The default values are preallocated when you generate the

monitoring. You can overwrite these values.

SIS-ESK_40.docx

Version: 1.3.23467

Page 9 of 32

Escalation Management (Basis/Framework)

The  system  provides  the  event  within  the  time  specified  as  cycle.  The  conditions  that  might  be

stored for the escalation specify, if an event triggers an escalation. Example:

You have specified a cycle of 15 minutes for the cyclic escalation ABC.XYZ. The system therefore

identifies the required data in the system every 15 minutes and provides an event. If the conditions

stored in the escalation are fulfilled, the system converts the event into an escalation.

The escalation agent updates the internal list of configured events with the cyclic events stored

in the database once an hour.

Automatic: after reading the message

Currently not used.

Automatic: after closing the event

Currently not used.

Automatic: after sending the message

If  the  event  includes  an  automatic  mode,  you  can  view,  enable  and  if  required  reconfigure  the

automatic  here  –  depending  on  the  definition  of  the  event.  You  can  define  an  automatic  function

that is performed when the message is sent (in case of an escalation).

The following automatic functions are available (depending on the event):

Function Close:

This function closes the event.  You can configure that for example the escalation is automatically

closed once the message has been sent.

If the function "Close after sending the message" is enabled, the message is sent and the event is

closed with the comment "-".

Find below an example for the generation of a template:

You want to configure an escalation for the event TNR.OFFLINE for the terminals 11-14 that often

cause  problems.  You  want  to  forward  this  event  to  the  system  administration  for  a  quick

troubleshooting. Make the following entries in the General tab:

Field

Event

Entry

TNR.OFFLINE

Description

Terminal 11 - 14 OFFLINE

Recipient type

Function group

Recipient

Maintenance

Cyclic monitoring

0  hours,  00:30  minutes  (the  terminal  status  is  checked  every  30

SIS-ESK_40.docx

Version: 1.3.23467

Page 10 of 32

Escalation Management (Basis/Framework)

minutes).

Workflow management

 Workflow

Select the workflow that is triggered in case of this event.

User

HYDRA user that is transferred with the triggered workflow as user. Depending on the workflow, the

defined user is also used in the workflow.

Group

Workflow  group  that  is  transferred  with  the  triggered  workflow  as  group.  Depending  on  the

workflow, the defined group is also used in the workflow.

Function

Workflow functions that  are transferred  with  the  triggered  workflow as function.  Depending  on the

workflow, the defined function is also used in the workflow.

Tab Options

Cyclic monitoring

This option defines if the event is generated via cyclic monitoring.

ESK mode

Type of escalation processing (currently only "F").

Automatic: after reading the message

Currently not used.

Automatic: after closing the event

Currently not used.

Automatic: after sending the message

See tab Event.

Tab Message

In  the  Message  tab,  you  can  maintain  templates  for  the  messages  to  be  sent.  Here,  you  enter  the

required message text and, if the selected type of notification is e-mail, also the subject.

Each  event  provides  additional  detail  data.  The  detail  data  that  an  event  provides  is  defined  in  the

system. When you generate the template for a message, you can use placeholders for the provided detail

data.  If  an  event  triggers  an  escalation,  the  placeholders  in  the  template  are  replaced  by  the  current

values of the event and the complete current message text is generated.

You can maintain the following fields:

SIS-ESK_40.docx

Version: 1.3.23467

Page 11 of 32

Escalation Management (Basis/Framework)

Subject

The text entered here is  used as subject  if the notification type e-mail has been selected.  Also in

the subject line, you can use placeholders that are replaced by the current values later on (see also

message).

The system automatically uses the event name stored in the system as subject when the event is

created. You can overwrite it.

Text

In the field Text, you edit the template for the actual message. You can store up to 320 characters

for the message text. Note:

The maximum length depends on the message type. The following lengths are currently available:

E-mail:   320 characters

Text message (SMS):

320 characters (2 x 160 characters)

Pager:

only the subject is transferred

The defined template might increase in size when the placeholders are replaced. When generating

the message text, it might happen that the resulting text exceeds 320 characters. In this case, the

placeholders cannot be replaced. With e-mail as communication type, the complete message text

can be transferred.

In the template, you can store placeholders that are replaced by current values later on. The list of

available placeholders shows the available placeholders.

Available placeholders

You can include placeholders in the message text, if you enter the identifier listed in the  Available

placeholders. Put a "%" before and after the identifier. Double-click the list of available placeholders

to insert the selected placeholder at the end of the text template.

The  message  "Terminal  11  is  offline"  is  generated  from  the  template  "Terminal  %TNR.TNR%  is

offline" if this event occurs on terminal 11.

In the following, the example of the previous section is refined. In the General tab, you have already

edited  data  for  the  event  TNR.OFFLINE  for  the  terminals  11-14.  You  want  to  notify  the  system

administrators  via  e-mail  and  via  text  message  (SMS).  You  can  use  a  maximum  of  2x160

characters  (max.  message  length).  The  list  of  available  placeholders  displays  the  following  detail

data that is available for the event TNR.OFFLINE:

TNR.BEZK  Terminal location

TNR.BEZL  Terminal designation/name

TNR.TNR  Terminal number

TNR.ZYKL:I  Actual cycle of status messages

TNR.ZYKL:S  Target cycle of status messages

SIS-ESK_40.docx

Version: 1.3.23467

Page 12 of 32

Escalation Management (Basis/Framework)

System variables

In addition, the placeholders DAT (system date) and ZEI (system time) are available. They include

date and time of message receipt in the server and can be formatted as follows:

%ZEI time hh:mm:ss% or

%ZEI time hh:mm%

or

%DAT date dd.mm.yyyy% or

%DAT date mm/dd/yyyy% or

%DAT date yyyy-mm-dd%

The  placeholder  WTG  (weekday)  includes  the  weekday  of  the  system  date.  The  placeholder  is

replaced by 3 characters describing the English weekdays: MON, TUE, WED, THU, FRI, SAT and

SUN.

The  placeholder  BEM  (comment  on  the  escalation)  is  available  for  specific  escalations.  The

escalation descriptions specify whether and how this parameter is assigned

The  system  provides  the  placeholders  MSGPRIO,  MSGCLASS  and  MSGRCV  for  specific

escalations.  The  system  collects

the  values  priority/urgency

(MSGPRIO),

information

class/importance  (MSGCLASS)  and  recipient/addressee  (MSGRCV)  for  a  posting  (e.g.  reset

maintenance  in  the  terminal).  These  values  are  then  transferred  in  the  escalation  (e.g.  escalation

RES.MAINTENANCE_RESET). You can refer to these values in the condition and in the message.

  The  placeholder  MSGPRIO  includes  the  priority/urgency  of  a  posting  and  can  have  the

following values: empty (not specified), 1 (highest priority), 2 (high priority), 3 (normal priority), 4

(low priority) and 5 (lowest priority). If the message is sent via e-mail, the priority is taken over

as mail priority.

  The  placeholder  MSGCLASS  can  include  the  following  values:  empty  (not  specified),  I

(information), W (warning) or E (error).

  The placeholder  MSGRCV includes  the group  of addressees (not function  group!), e.g.  "plant

manager".

Make the following entries in the Message tab:

Field

Subject

Entry

Terminal %TNR.TNR% OFFLINE

SIS-ESK_40.docx

Version: 1.3.23467

Page 13 of 32

Escalation Management (Basis/Framework)

Text

Terminal  %TNR.TNR%  at  location  %TNR.BEZK%  has  been  offline  at

least since %DAT date dd.mm.yyyy%, %ZEI time hh:mm:ss%.  Please

check network availability.

Tab Notification

The Notification tab defines how the person or function group stored in the Event tab is notified. You can

configure different notification combinations using logic combinations.

The notification types defined in this tab apply to all persons of a function group. Here, the system does

not check if the required communication data is maintained in the HR master data for individual persons

or for the member of a function group and if the data is maintained in the basic settings.

Currently  the  following  notification  types  are  available:  Notification  to  the  client  (always  possible)  and

notification  via  e-mail,  SMS/text  message  and  pager  (if  licensed).  You  can  always  configure  these

notification types  – independent of licensing. The notification itself is only  performed with the respective

license.

You edit the notification type as follows:

Operator

The operator specifies how the notification types are combined  with each  other.  You can  use the

following operators:

"TO"

The message is sent using the message type stored below.

"AND"

The message is additionally sent using this communication type.

"OR"

For  the  notification  type  of  the  higher  level,  the  system  checks  if  the  notification  can  be  realized

successfully (it is checked if all data required for the notification is available). If this is not the case,

the notification is sent using the notification type of this level.

You can therefore use different individual communication types within a function group.

The notification type is maintained top down with descending priority. For technical reasons, the system

uses different methods to check the success of the individual notification types:

SIS-ESK_40.docx

Version: 1.3.23467

Page 14 of 32

Escalation Management (Basis/Framework)

  Notification on the client

You  can  immediately  check  if  the  notification  has  been  successful.  If  the  person  is  currently

logged  on,  the  person  is  notified  and  the  message  is  immediately  displayed  in  the  current

message window.

  Notification via e-mail

Promplty after generation, the e-mail is transferred to the local SMTP server (mail server). If the

transfer could be performed, the notification is identified as successfully transmitted.

If  the  e-mail  delivery  fails  (e.g.  due  to  a  wrong  e-mail  address  or  because  the  server  is  not

available), the escalation management does not correct the delivery success (e.g. by sending

another message via a different communication channel).

  Notification via SMS/text message

Promptly  after  generation,  the  SMS/text  message  is  sent  using  the  licensed  transmission

process.  The  message  is  identified  as  successfully  transferred  if  all  data  required  for  the

transmission (phone number, directories, etc.) is maintained.

If  the  text  message  delivery  fails  (e.g.  due  to  a  wrong  phone  number  or  because  the

server/gateway  is  not  available),  the  escalation  management  does  not  correct  the  delivery

success (e.g. by sending another message via a different communication channel).

  Notification via (PZE) terminal

With this notification type it is configured that the message is displayed only once on the PZE

terminal  and  it  is  removed  after  a  maximum  of  4  weeks.  However,  the  message  can  be

displayed several times during the period of the cyclic loading of authorizations. The message

is displayed  with  the following actions on the  PZE  terminal: In, out, break, info,  message and

absence reason.

Messages  can  only  be  displayed  on  PZE  terminals  of  type  CT-36x,  CT-37x  and  CT-38x.  For

more information, refer to the document "Configuration Absence Workflow".

  Notification via ERP system

SIS-ESK_40.docx

Version: 1.3.23467

Page 15 of 32

Escalation Management (Basis/Framework)

The SAP Alert Management provides functionalities within the ECC to actively inform users of

events that have occurred. If you additionally use the SAP Enterprise Portal, you can view and

edit these alerts according to the requirements of the user.

If  the  escalation  management  is  integrated  into  the  SAP  Alert  Management  and  the  SAP

Enterprise Portal, you can transfer the generated escalations into the SAP Alert Management.

The  escalations  are  then  available  for  the  users  of  the  SAP  Enterprise  Portal.  This  option

requires the license  ESK-SAPALM. For further information, please refer to the documentation

ESK-SAPALM.pdf.

Send e-mail in cc to

Here, you can store an e-mail address that receives a copy of the sent e-mail.

The  system  only  sends  this  copy,  if  you  have  configured  the  notification  via  e-mail.  If  you  have

exclusively configured other types of notification, an  e-mail copy  is not sent. The stored cc e-mail

address is not used.

We  use  the  example  of  the  previous  sections  and  configure  below  how  the  system  administration  is

notified.  The  system  administration  does  not  work  all  the  time,  but  the  console  agent  is  installed  in  the

workplace PCs. But as the employees are not always present at their workplace, a second notification is

sent via SMS/text message.

Make the following entries in the Notification tab:

Field

Entry

Operator

Notification type

Level 1

Level 2

TO

AND

Console

SMS/text message

Tab Condition

In the Condition tab, you define the conditions that trigger an escalation for an event. With each event, the

escalation manager checks the conditions that are stored here. Only if the conditions are fulfilled and the

result of the check is true, the escalation is generated or triggered.

You  define  the  conditions  using  formulas  and  logical  expressions.  You  link  the  expressions  using

comparison operators. You can combine and nest expressions using parenthesis .

SIS-ESK_40.docx

Version: 1.3.23467

Page 16 of 32

Escalation Management (Basis/Framework)

In the formulas, you can include identifiers that can be used for conditions in the system. Find below the

available identifiers for the conditions that the application transfers with the event.

You can use the following operators and expressions to formulate conditions:

"and"

Use  the  expression  "and"  to  formulate  AND  constructions.  An  AND  construction  has  the  following

structure:

< condition 1> and <condition 2 >

This condition is only true, if BOTH conditions are fulfilled.

This means: The condition "it rains and storms" is only true if it rains and storms at the same time. If it

only rains and does not storm (or vice versa), the condition is not fulfilled.

"or"

Use the expression "or" to formulate OR constructions. An OR construction has the following structure:

< condition 1> or <condition 2 >

This condition is only true, if at least one of the two conditions is fulfilled.

The expression "it rains OR storms" is true if it only rains or only storms. If both expressions are true  – it

rains AND storms – the condition is also true.

"like"

Use the operator "like" to compare characters. You can use the operator as follows:

< value 1> like < example value 1 >.

For the example value, you can replace leading or trailing characters by additional placeholders:

"*"

"?"

0 –n any characters

exactly 1 character (any)

The comparison "name like SCHMID*" is true for SCHMID and for SCHMIDT and also for SCHMIDLER.

But it is not true for SCHMITT. If the comparison were "name like SCHMI*", it would be true for all names

beginning with SCHMI, i.e. SCHMID, SCHMIDT, SCHMIDLER and SCHMITT.

"=="

If you use the operator "==" the condition must be fulfilled 100 %. You can use the operator to compare

characters and to compare numbers. Use it as follows:

< value 1 > == <example value 1>

For the example mentioned above, the condition "name == "SCHMIDT"" is only true for SCHMIDT.

"!="

If  you  use the operator "!=" (not equal), the condition must not be fulfilled.  You  can use the  operator to

compare characters and to compare numbers. Use it as follows:

< value 1 > != <example value 1>

For the example mentioned above, the condition "name != "SCHMIDT"" is not true for SCHMIDT, but for

all other names.

SIS-ESK_40.docx

Version: 1.3.23467

Page 17 of 32

Escalation Management (Basis/Framework)

"<", ">","<=" , ">="

You  can  use  the  operators  "<",  ">","<="  ,  ">="  to  compare  numbers  (and  characters).  Use  them  as

follows:

< value > ">" <value 2>

The operators have the following meaning:

"<"

">"

less than...

greater than...

"<="

less than or equal to....

">="

greater than or equal to...

Make the following settings to store a condition:

Condition

Maintain  the  logical  condition  in  the  text  field  of  the  condition.  You  can  use  the  above  mentioned

expressions, operators and combine them using parenthesis. You may only use identifiers that are

provided  by  the  event.  The  section  "Variables"  displays  the  available  identifiers.  If  you  use  the

identifiers  in  the  condition,  you  must  EXACTLY  take  over  the  syntax  presented  in  the  variables

section.

A link at the end of this section includes an overview of functions, operators and constants that can

be used in formulas and conditions.

If you use decimal numbers in formulas, use the dot "." as decimal separator.

Variables

This field shows the identifiers that are available for the respective event. In this field, you can also

enter  values  for  each  identifier.  You  can  store  values  that  are  expected  in  the  application.  Using

these values, you can then immediately check if the formula is correct.

To check the result of the formula, the collected value for each identifier is entered in the formula

and the formula is calculated. The formula returns the value "TRUE" or "FALSE" as a result. If the

return  value  is  "FALSE",  you  must  either  check  the  formula  or  the  values.  You  must  use  >"<  to

begin and end strings, e.g. descriptions or words.

If you double-click a possible variable, this variable is inserted at the end of the formula.

System variables

System variables are provided in the same way as the variables.

In  the  previous  chapters,  it  was  discussed  how  to  configure  the  notification  of  the  system

administration, if terminal 11-14 are offline. To complete this example, the formula is now stored.

The system administration  should be notified,  if at  least one of the terminals 11  to 14 is  affected.

The event TNR.OFFLINE  provides the identifier TNR.TNR (terminal number). The basic condition

must be:

TNR.TNR >= 11

SIS-ESK_40.docx

Version: 1.3.23467

Page 18 of 32

Escalation Management (Basis/Framework)

Here,  the  system  would  always  trigger  escalations  if  the  terminal  number  were  greater  than  or

equal  to  11.  But  you  only  want  to  generate  messages,  if  the  terminals  11-14  are  affected.  The

condition is therefore extended.

TNR.TNR >= 11 and TNR.TNR <= 14

The condition is only true, if the terminal number is greater than or equal to 11 on the one side and

on the other side it is less than or equal to 14.

Find a complete list of the supported operators here.

Tab Condition – Examples for conditions

If you define conditions, you must make a difference between the data types CHAR (for characters) and

INTEGER for numeric values or periods (of time).

If  you compare CHAR data  types,  you must always  enclose these CHAR data  types by double quotes.

You can compare numeric values without double quotes.

To find out if an acronym/field is numeric or if it is a string, you can check how the field is maintained in

the system. If you can enter letters into the respective field, you must enclose the value by double quotes.

Example:

Condition

Machine

status

change

to

status

10

MNR.MNR == "WP1" and MST.MST == 10

(MST.MALFUNCTION_OCCURRED)  at  a  specific

machine

(alphanumeric)

should

trigger  an

escalation.

Machine

status

change

to

status

10

MNR.MNR == "123" and MST.MST == 10

(MST.MALFUNCTION_OCCURRED)  at  a  specific

machine (numeric) should trigger an escalation.

A  machine  status  6  that  exists  longer  than  10

MST.MST == 6 and MST.DAUER >= 600

minutes

(MST.MALFUNCTION_CONTINUE)

should trigger an escalation.

A  machine  status  6  that  exists  longer  than  10

MST.MST  ==  6  and  MST.DAUER  >=  600  and

minutes

at

a

specific

machine

MNR.MNR = "1234"

(MST.MALFUNCTION_CONTINUE)  should  trigger

an  escalation,  but  only  at  a  specific  machine

SIS-ESK_40.docx

Version: 1.3.23467

Page 19 of 32

Escalation Management (Basis/Framework)

(numeric).

A  machine  status  6  that  exists  longer  than  10

MST.MST  ==  6  and  MST.DAUER  >=  600  and

minutes

at

a

specific

machine

MNR.MNR = "WP1"

(MST.MALFUNCTION_CONTINUE)  should  trigger

an  escalation,  but  only  at  a  specific  machine

(alphanumeric).

You  want  to  check  if  less  than  90  %  of  the  target

ANR.EGR:GUT < (0.9*ANR.SGR:GUTP)

quantity  (ANR.SGR:GUTP)  of  an  operation  is

posted (ANR.EGR:GUT is the actual quantity)

Condition editor

The  conditions  in  the  data  records  of  the  escalation  configuration  can  become  very  complex.  The

Condition editor helps to edit the conditions and supports the user in the configuration of valid conditions.

The condition editor loads the condition of the data record currently selected. When the condition is edited

and the condition editor is closed, then the condition is updated in the current data record.

If formula parsing is not possible, an error is displayed. If a formula stored in the system cannot be read

when the condition editor is opened, an error is displayed.

Click the button Condition editor in the toolbar to call the condition editor. If a data record is selected, this

data record is displayed in detail in the condition editor.

SIS-ESK_40.docx

Version: 1.3.23467

Page 20 of 32

Escalation Management (Basis/Framework)

You can use the checkbox in the Condition editor to specify whether the escalation configuration is active

or not.

Click the button Save to write the data to the current data record.

The  condition  editor  does  not  know  the  data  type  of  the  variable  and  assumes  that  it  is  data

type  "string".  If  you  use  numeric  variables  with  comparison  operators  with  "greater"  or  "less",

you must edit the created condition manually after using the editor. Delete the quotation marks.

The comparisons will then work properly.

Tab Last change

Modified by

Last person who edited the escalation

Modified on

Date and time of the most recent modification

SIS-ESK_40.docx

Version: 1.3.23467

Page 21 of 32

Escalation Management (Basis/Framework)

3  Function Groups

Overview

HYDRA menu

FEDRA menu

Master data  Escalation management  Function groups

Detailed scheduling  Master data   Escalation history

Transaction code

escfg

Function authorization

escfg

Purpose

You use this function to create or modify function groups in the system.

Integration

Use function groups in the escalation management to

  notify several recipients at a time;



identify  specific  recipients  within  a  group  (e.g.  a  group  of  maintenance  engineers)  that  meet

special requirements, e.g. the recipient is present.

Requirements

You have defined the recipients as person in the HR master data and:





if you want a notification via e-mail, you have created the e-mail address of the person;

If  you  want  a  notification  in  the  MOC,  you  have  linked  the  user  in  the  User  administration  to  a

person of the HR master.

Field descriptions

Function

The function is the name of the function group. If function groups already exist, you can select the

group via the detail selection.

Priority

The priority defines the notification order within a function group. You can assign the same priority

to several persons within a function group.

The highest  priority  is "1",  the  lowest priority  is  "999". The priority helps the system to deliver the

messages.

SIS-ESK_40.docx

Version: 1.3.23467

Page 22 of 32

Escalation Management (Basis/Framework)

Personnel number

The personnel number identifies the person that should be notified.

Check console

If you have checked the option, the system will verify if the person is logged on to the client.  If the

person  is  not  logged  on,  the  system  verifies  the  person  with  the  next  priority  level.  You  use  this

setting,  if  you  do  not  use  the  "time  and  attendance"  system.  In  case  of  a  negative  result,  i.e.  the

person  is  not  logged  on  to  the  client/console,  the  message  is  not  delivered  in  an  alternative  form

(text message, e-mail...).

Example:

Three maintenance engineers work in three different shifts. If you assign within a group the same

priority  to  all  three  of  them,  only  the  engineer  actually  logged  in  to  the  console  receives  the

message.

If  you  want to  use the function  "Check console",  you must have entered the personnel number in

the User administration.

Check attendance

If  you  have  checked  the  option  "Check  attendance",  the  system  will  verify,  if  the  respective

employee is logged on to the PZE system "time and attendance" (only in connection with PZE-BP).

The  escalation  management  will  suppose  that  the  person  is  present,  if  the  following  PZE  events

occur: In, break, entrance before clocking in (with access control system ZKS).

There  is  an  AND-link  between  the  settings  "Check  console"  and  "Check  attendance".  If  both

options  are  checked,  the  person  only  receives  messages  when  he  or  she  is  present  AND

logged in to the console.

That  is  the  reason  why  we  recommend  to  check  the  option  "console"  OR  the  option

"attendance".

The system cannot send a message to a function group, if no one of this group is logged in to

the console or is logged in to the PZE system "time and attendance".

In  this  case  the  escalation management  will  generate  the  event  "NO_PERSON_AVAILABLE".

You  should  assign  a  dispatcher  group  to  this  event  or  you  should  search  for  this  event  on  a

daily basis in order to find cases left aside.

SIS-ESK_40.docx

Version: 1.3.23467

Page 23 of 32

Escalation Management (Basis/Framework)

4  Current Escalations

Overview

HYDRA menu

Information management  Messages  Current escalations

FEDRA menu

Detailed Scheduling  Current  Current escalations

Transaction code

escov

Function authorization

escov

escov.forward – Forward escalations

escov.close – Close escalation

escov.disp – Show messages of all users (Dispatcher rights)

Purpose

Use this function if you want to:

  get an overview of your escalations/messages (or the ones of others).



to confirm receipt of a message, forward or close a message.



to get an overview of completed messages.

Integration

The evaluations/reports show escalations of all components of the system.

Requirements

  You have activated the Escalation Management module.

  You have configured events and assigned these configurations to recipients.

Selection criteria

In general, the overview only shows escalations that:

  are intended for the logged in user.

  have the status "open" or "in process".

The  additional  criterion  All  messages  shows  the  messages  of  all  users  that  are  currently  open  or  in

process. You require the global permission for messages to view all messages for all users.

SIS-ESK_40.docx

Version: 1.3.23467

Page 24 of 32

Escalation Management (Basis/Framework)

The application provides the following selection criteria:

Current

Event

You can select the event that caused messages.

History

Point in time ... to ...

You can select a period to restrict the data displayed.

Status

You can select a status. You can choose from the following options:

- in process

- open

- finished

Message status

You can select the message status. You can choose from the following options:

- read

- not read

- not processed

- forwarded

Event

You can select the event that caused messages.

Show messages of all users

If  you  enable  this  option,  the  overview  does  not  only  show  your  "own"  escalations  but  that  of  all

users.

You  can  select  several  escalations  (multiple  selection  option)  and  use  the  functions  Forward  and

Complete messages for the selected escalations at the same time.

Field descriptions

Reference

Unique ID of the message

Status

Message status

Priority

Priority of the message

SIS-ESK_40.docx

Version: 1.3.23467

Page 25 of 32

Escalation Management (Basis/Framework)

Point in time

Date and time of the generation

Description

Stored description

Subject

Stored subject

Text

Stored text

Event

Triggered event

Message status

Message status

Comment

Stored comment

Status (recipient)

Displays the overall status of all notification functions. This status is "ERR" if a notification failed.

The following statuses exist:

NEW:

new, not yet processed

ERR:

error, not sent

OK:

successfully sent

IP:

in process

NON:

no notification required

IMP:

"impossible". The message cannot be sent (e.g. if the message is supposed to be sent by e-mail,

but the person does not have an e-mail address).

Name

The recipient's first and last name.

Function

The recipient's function.

Person

The recipient's personnel number.

Triggered

Date / time and person who last edited the data record

Modified on

Date / time and person who last edited the data record

SIS-ESK_40.docx

Version: 1.3.23467

Page 26 of 32

Escalation Management (Basis/Framework)

Finished

Date / time and person who last edited the data record

Forwarded

Date / time and person who last edited the data record

Toolbar

Read event

View/read  a  new  message/escalation.  Once  you  have  viewed  a  message,  the  reaction  time  is

stopped and the processing time starts. The system saves the date and time.

Forward event

Forward a message/escalation to a new recipient.

Finish event

Complete a message/escalation.

SIS-ESK_40.docx

Version: 1.3.23467

Page 27 of 32

Escalation Management (Basis/Framework)

5  Escalation history

Overview

HYDRA menu

Information management  Messages  Escalation history

FEDRA menu

Detailed scheduling  Master data   Escalation history

Transaction code

escev

Function authorization

escev

In  the  application  Escalation  history,  the  logged  on  user  is  not  filtered  in  the  displayed

escalation. This means that all escalations meeting the selection criteria are displayed, even if

they were originally intended for other recipients / users.

Depending  on  the  escalations  used,  it  may  be  necessary  not  to  assign  the  function

authorization for the escalation history.

Purpose

You use the escalation history if you want to get an overview of already completed escalations.

Field descriptions

Status

Escalation status

Event

This event triggers an escalation. Applications generate the event if specific situations occur.

Name

You can enter a description of the event in this field.

Subject

Title of the escalation message.

Text

Text of the escalation message.

Edited (date/ time / user)

Date and time stamp of the last editing.

Start (date/ time / user)

Date and time stamp when the escalation was started.

Last editing (date / time / user)

Date and time stamp of the last editing.

SIS-ESK_40.docx

Version: 1.3.23467

Page 28 of 32

Escalation Management (Basis/Framework)

First editing (date / time / user)

Date and time stamp when the escalation was confirmed for the first time.

SIS-ESK_40.docx

Version: 1.3.23467

Page 29 of 32

Escalation Management (Basis/Framework)

6  Escalation Management Archiving

Archiving

Escalation management events are archived after defined periods. The central archiving script hyarc.scr

triggers the archiving process. This program is planned to be run on a daily basis within the Scheduler by

default.

Subject

to

the  given  characteristics,  archiving

is  performed  either  by

the  archiving  program

hyeskarc.exe/out or by HYDRA Data Management.

How can I find out which archiving type is in use?

Check (you or your system administrator) whether or not the script hyarc.scr within the HYDRA directory

on the HYDRA server includes the below entry:

# from hyeskarc.scr

# ESK deletion script (only if HYD-ESK)

if [ `hyliz.exe -r HYD-ESK` -gt 0 ]

then

  echo "HYD-ESK:" >> $ERRPATH/hyarc.pro

  hyeskarc.scr "ESK:D=7|ESK:A=M|A_ESK:D=30|A_ESK:A=X"

  cat $ERRPATH/hyeskarc.pro >> $ERRPATH/hyarc.pro

fi

If this is the case, archiving is still performed by the separate archiving program hyeskarc.exe/out.

If the entry does not exist or is commented out by inputting "#" in front of each line, archiving is performed

based on HYDRA Data Management.

Archiving by hyeskarc.exe/out

This program is started from the central archiving script hyarc.scr. This program is planned to be run on a

daily basis within the Scheduler by default.

By default, archiving of the escalation management module is configured as follows:

Option

Value

Activity  for  data  included  in  the  online  area

Archiving

(ESK:A=)

SIS-ESK_40.docx

Version: 1.3.23467

Page 30 of 32

Escalation Management (Basis/Framework)

Option

Value

Retention period within the online area (ESK:D=)

7 days

Activity  for  data  included  in  the  archive  area

Export to file

(A_ESK:A)

Retention  period  within

the  archive  area

30 days

(A_ESK:D)

Archiving using Data Management

In

this

case,

configuration

is

made

using

the

HYDRA

Data

Management..\..\functions\moc\MOC_DataManagement.pdf.  Archiving  is  still  started  by  the  hyarc.scr

script.

When  transferring  data  into  archive  tables,  such  data  is  taken  over  the  “retention  period”  of  which

(number in days/months/years; see values in brackets in the below table) has been exceeded.

Product
HYD-ESK

Object
ESK

Object designation
Escalations

HYD-ESK

A_ESK

Long-term archiving:
Escalations

Transfer
Online stock
 medium-term archive
Medium-term  archive
 Long-term archive

Default interval
7 days

30 days

SIS-ESK_40.docx

Version: 1.3.23467

Page 31 of 32

Escalation Management (Basis/Framework)

7  Application-Relevant Settings in HYDRA

Maintenance of basic settings

You maintain the basic settings  for Escalation Management in order to configure the following:

  SMTP Server

  SMTP Port

  SMTP Timeout

  SMTP Sender

  Other settings

SIS-ESK_40.docx

Version: 1.3.23467

Page 32 of 32

