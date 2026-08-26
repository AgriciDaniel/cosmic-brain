Escalation Configuration

1  Escalation Configuration

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

MOC_EscalationConfiguration.docx

Version: 1.13.21025

Page 1 of 14

Escalation Configuration

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

MOC_EscalationConfiguration.docx

Version: 1.13.21025

Page 2 of 14

Escalation Configuration

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

MOC_EscalationConfiguration.docx

Version: 1.13.21025

Page 3 of 14

Escalation Configuration

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

MOC_EscalationConfiguration.docx

Version: 1.13.21025

Page 4 of 14

Escalation Configuration

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

MOC_EscalationConfiguration.docx

Version: 1.13.21025

Page 5 of 14

System variables

In addition, the placeholders DAT (system date) and ZEI (system time) are available. They include

date and time of message receipt in the server and can be formatted as follows:

Escalation Configuration

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

MOC_EscalationConfiguration.docx

Version: 1.13.21025

Page 6 of 14

Text

Terminal  %TNR.TNR%  at  location  %TNR.BEZK%  has  been  offline  at

least since %DAT date dd.mm.yyyy%, %ZEI time hh:mm:ss%.  Please

check network availability.

Escalation Configuration

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

MOC_EscalationConfiguration.docx

Version: 1.13.21025

Page 7 of 14

Escalation Configuration

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

MOC_EscalationConfiguration.docx

Version: 1.13.21025

Page 8 of 14

Escalation Configuration

The SAP Alert Management provides functionalities within the ECC to actively inform users of

events that have occurred. If you additionally use the SAP Enterprise Portal, you can view and

edit these alerts according to the requirements of the user.

If  the  escalation  management  is  integrated  into  the  SAP  Alert  Management  and  the  SAP

Enterprise Portal, you can transfer the generated escalations into the SAP Alert Management.

The  escalations  are  then  available  for  the  users  of  the  SAP  Enterprise  Portal.  This  option

requires the license  ESK-SAPALM. For further information, please refer to the  documentation

ESK-SAPALM.pdf.

Send e-mail in cc to

Here, you can store an e-mail address that receives a copy of the sent e-mail.

The  system  only  sends  this  copy,  if  you  have  configured  the  notification  via  e-mail.  If  you  have

exclusively configured other  types of notification, an  e-mail copy  is not sent. The stored cc e-mail

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

MOC_EscalationConfiguration.docx

Version: 1.13.21025

Page 9 of 14

Escalation Configuration

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

MOC_EscalationConfiguration.docx

Version: 1.13.21025

Page 10 of 14

"<", ">","<=" , ">="

You  can  use  the  operators  "<",  ">","<="  ,  ">="  to  compare  numbers  (and  characters).  Use  them  as

Escalation Configuration

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

MOC_EscalationConfiguration.docx

Version: 1.13.21025

Page 11 of 14

Escalation Configuration

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

MOC_EscalationConfiguration.docx

Version: 1.13.21025

Page 12 of 14

Escalation Configuration

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

If formula parsing is not possible, an error is displayed. If a formula stored in the system cannot be  read

when the condition editor is opened, an error is displayed.

Click the button Condition editor in the toolbar to call the condition editor. If a data record is selected, this

data record is displayed in detail in the condition editor.

MOC_EscalationConfiguration.docx

Version: 1.13.21025

Page 13 of 14

Escalation Configuration

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

MOC_EscalationConfiguration.docx

Version: 1.13.21025

Page 14 of 14

