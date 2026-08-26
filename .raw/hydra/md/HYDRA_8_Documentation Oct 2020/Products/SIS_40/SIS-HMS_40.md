Manual

HYDRA Messaging Services
SIS-HMS 4.0pe

Version 1.3.23281

Last changed on: 12.06.2019

HYDRA Messaging Service

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

SIS-HMS_40.docx

Version: 1.3.23281

Page 2 of 25

HYDRA Messaging Service

Contents

1  HYDRA Messaging Services (HMS) ............................................................ 4

2  Messages (MOC) ......................................................................................... 6

3  Messages (AIP) .......................................................................................... 16

4  Function Groups ......................................................................................... 24

SIS-HMS_40.docx

Version: 1.3.23281

Page 3 of 25

HYDRA Messaging Service

1  HYDRA Messaging Services (HMS)

Overview

Purpose

HYDRA Messaging Services is an application for creating, sending and editing messages. The messages

are exchanged between the MES clients.

With HYDRA Messaging  Services,  the users of the MES clients can communicate more efficiently. The

users  communicate  directly  with  each  other.  This  avoids  unnecessary  delays  in  the  organization  of

processes and workflow.

Implementation notes

HYDRA Messaging Services is of use, if you have the following objectives:

  You want to increase the efficiency of the internal communication.

  You want to improve the workflow.

Integration

The  application  is  based  on  the  HYDRA  escalation  management.  Creating,  answering,  forwarding  or

closing  messages  are  functions  that  follow  the  mechanisms  of  the  escalation  management.  Possible

restrictions that are valid for the escalation management also apply to the use of this application.

You need a separate license, if you want to use the HYDRA Messaging Services for SMA.

Features

  You can create and send messages via the MES clients MOC and AIP2.

You can send the messages to the following entities:

o  A person

o  A function group

o  A terminal

(the exchange of messages between two terminals is not intended)

  You can additionally send messages by e-mail.

  You can receive messages from the MES clients MOC, AIP2 and SMA.

  You can mark messages read.

  You can answer the messages at the MES clients MOC or AIP2.

  You can forward messages to another communication partner.

  You can mark the message history as closed via a specific function.

SIS-HMS_40.docx

Version: 1.3.23281

Page 4 of 25

  You can configure function groups.

HYDRA Messaging Service

SIS-HMS_40.docx

Version: 1.3.23281

Page 5 of 25

HYDRA Messaging Service

2  Messages (MOC)

Overview

Menu

Information management  Postings  Messages

Transaction code

hms

Function authorization

hms

Purpose

With the application "Messages" you can create and send messages. The application provides the following

functions:

-  Create new messages

-  Mark messages read

-  Answer messages

-  Forward messages

-  Close messages

Integration

The application "Messages" allows the communication with other persons. The following clients offer the

possibility to send and receive messages:

  AIP2

  MOC

  SMA (requires a separate license)

The  application  is  based  on  the  HYDRA  escalation  management.  Creating,  answering,  forwarding  or

closing  messages  are  functions  that  follow  the  mechanisms  of  the  escalation  management.  Possible

restrictions that are valid for the escalation management also apply to the use of this application.

Requirements

The  implementation  of  the  HYDRA  Messaging  Services  (HMS)  includes  the  necessary  programs  and

configurations.

You  have  linked  HYDRA  users  of  the  User  administration  to  persons  of  the  HR  master.  These

users/persons can exchange messages. If  you  want  to send messages to function groups,  you have to

generate the groups beforehand in the application Function groups.

If you want to send a message to a terminal, the MOC does not require specific configurations.

SIS-HMS_40.docx

Version: 1.3.23281

Page 6 of 25

HYDRA Messaging Service

In  general,  you  can  send  a  message  to  all  persons,  function  groups  or  terminals.  A  specific

workflow is not defined, i.e. it is not defined  who can  send a message to which  recipient. The

system does not guarantee that the recipient reads a message.

Selection criteria

In general, the function shows all active message histories i.e. that are not closed. In addition, the function

shows all messages (histories) that were closed within the last <number> days:

Showing messages closed within the last <number> days

In addition to the active message histories, the function shows the messages marked closed within

the last <number> days.

The system checks the time a message was closed. The time is displayed in the column

End of the detail application Overview.

You can specify how long closed messages (histories) are shown. Two settings define

this period: The entry of the <number> of days and the time the data is retained in the

online data area of the escalation management. The document MBL_ESK_Archiving.pdf

provides further information on archiving of messages in the escalation management.

Toolbar

The application offers the following functions. The chapter Editing functions includes further information on

the individual functions.

The buttons are context sensitive.

 New message

Function authorization: hms.new

Use this button to create a new message.

 Read

Function authorization: hms.read

Use this button to mark a message read. The button is only active, if a message addressed to the

user is selected in the detail application Messages and if the user has not yet marked the message

read.

SIS-HMS_40.docx

Version: 1.3.23281

Page 7 of 25

HYDRA Messaging Service

Clicking on this button does not open a dialog. The message is directly marked read.

Answer

Function authorization: hms.answer

Use this button to answer a message.

The button is  only  active, if a message addressed to  the  user is selected in the  detail application

Messages. The status column shows the symbol

 and the column Person (category Recipient)

shows the personnel number. It is the number that the user administration has assigned to the logged

in MOC user.

 Forward

Function authorization: hms.forward

Use this button to forward a message.

The button is  only  active, if a message addressed to  the  user is selected in the  detail application

Messages. The status column shows the symbol

 and the column Person (category Recipient)

shows the personnel number. It is the number that the user administration has assigned to the logged

in MOC user.

 Close

Function authorization: hms.close

Use this button to close a message history.

The button is only active, if the message history has not yet been closed.

Each person involved in the message history can close the message history. This is not

restricted to the person who has created a new message.

When you close a message, it is automatically marked read. When you close a message,

the time of the last message is updated. This message history is now shown on top (in

case of descending chronological order).

 Overview

Use this button to expand the message header in the detail application Overview. The expanded row

shows the text of the first message of the message history.

SIS-HMS_40.docx

Version: 1.3.23281

Page 8 of 25

HYDRA Messaging Service

 Messages

Use this button to expand the messages in the detail application Messages. The expanded row shows

the text of the message.

Detail application Overview

The detail application Overview shows all messages that were sent by or to the logged in MOC user.

If the logged in MOC user has not yet marked a message Read in the detail application Overview, the data

row is highlighted in bold. The detail application Messages indicates which message of the whole message

history has not yet been read. You can also see who has marked a message read. If the logged in user has

not read a message of the message history, you can see this in the detail application Overview. If one of

the other communication partners has not read a message of the message history, this message is only

marked unread in the detail application Messages.

The columns available in the table are described below. Use the column selection function to add columns

that are not displayed by default. The actual order of the fields described and the assignment to a category

need not comply with the description below.

No title

No title

The column No title shows the status of the message history. Possible entries in the column No

title:

Symbol  Meaning

The message history is closed.

The message history is active and still in process.

Unread messages

If the message history includes at least one unread message for the MOC user, the checkbox is

checked .

Status

The column Status shows the status of the message history. Possible entries in the column Status:

o  Completed

  The message history was closed.

o

In process

SIS-HMS_40.docx

Version: 1.3.23281

Page 9 of 25

HYDRA Messaging Service

  The message history is active and still in process.

Reference

The column Reference displays the internal identification of the message history in the database

table esk_event_msg.

Final comment

Once  the  message  history  is  closed,  the  column  Final  comment  shows  the  comment  of  the

message history.

Last message

Date/Time

The column Date/Time shows date/time of the most recent message of the message history.

Communication partner

The column Communication partner shows the last communication partner of the message history.

Subject

Subject

The  column  Subject  shows  the  subject  of  the  message  that  was  entered  on  creating  a  new

message.

The column Text shows the text of a message that was entered on creating a new message.

The column Start shows the Time/Date of the first message of the message history.

Text

Start

End

Once the message history is closed, the column End shows the point in time when the message

history was closed.

Detail application Messages

The detail application Messages shows all messages of a selected message history.

By default, the messages are in descending chronological order (most recent message on top). If you send

a message to a function group with several persons, the display order of the recipients is random.

If a message is unread, one data row is highlighted in bold. A message is unread, if:



the logged in user has not yet marked the message read.

SIS-HMS_40.docx

Version: 1.3.23281

Page 10 of 25

HYDRA Messaging Service



the recipient of the message has not yet marked the message read.

The columns available in the table are described below. Use the column selection function to add columns

that are not displayed by default. The actual order of the fields described and the assignment to a category

need not comply with the description below.

Status

No title 1

The  column  No  title  1  displays  symbols  that  provide  information  on  the  history  of  the

communication. The symbols and their meaning are:

Symbol  Meaning

The logged in user has received the message.

The logged in user has sent the message.

The message is part of a message history that was created before being forwarded

to  the  logged  in  user  OR  the  sender  has  sent  the  message  to  a  function  group

including further persons than the logged in user.

No title 2

The column No title 2 displays symbols that provide information on the status of the message. The

symbols and their meaning are:

Symbol  Meaning

The message is read.

The message is unread.

Message

Date/Time

The column Date/Time shows the point in time when the corresponding message was created in

the message history.

Communication partner

The column Communication partner shows the communication partner of the message.

SIS-HMS_40.docx

Version: 1.3.23281

Page 11 of 25

HYDRA Messaging Service

If  a  message  has  been  forwarded,  the  recipient  of  the  forwarded  message  is  displayed  as

communication partner.

Type of communication partner

The column Type of communication partner shows the type of the communication partner.

Sender/recipient

The column Sender/recipient shows an abbreviation that identifies the communication partner of a

message as sender or recipient.

R – Recipient

S – Sender

Text

The column Text shows the text of a message.

Reference

Reference

The reference is the internal identification of a message (being part of a message history) in the

database table esk_event_msgdet.

ESK reference

The  ESK  reference  is  the  internal  identification  of  the  message  history  in  the  database  table

esk_event_msg.

Sender

Type of sender

The column Type of sender shows the type of the sender that has sent the message.

-  P – Person

-  T – Terminal

Person

If the sender of a message is a person, the column Person displays the personnel number of the

sender.

Terminal

If the sender of a message is a terminal, the column Terminal displays the terminal number of the

sender.

SIS-HMS_40.docx

Version: 1.3.23281

Page 12 of 25

HYDRA Messaging Service

Recipient

Type of recipient

The column Type of recipient shows the type of the recipient of a message. The following entries

are possible:

-  Terminal

-  Person

-  Function

Person

If the recipient of a message is a person, the column Person displays the personnel number of the

recipient.

If the recipient of a message is a function group, the message is "resolved" and sent to every person

of the function group. The column Person then displays the personnel number of each person.

Terminal

If the recipient of a message is a terminal, the column Terminal displays the terminal number of the

recipient.

Function

If the message is sent to a function group, the column Function shows the function group.

Person currently logged in

Person currently logged in

The column Person currently logged in shows the personnel number of the person currently logged

in.

Editing functions

The following field descriptions refer to the functions that  you can start via the toolbar. Depending on the

corresponding function, some fields can be edited, some can be read only.

Overview of the fields you can edit in each function

New message

Answer

Forward

Close

Type of recipient

Recipient
(Person/Function/Terminal)

Subject







read-only

read-only





not available

not available

read-only

not available

not available

SIS-HMS_40.docx

Version: 1.3.23281

Page 13 of 25

HYDRA Messaging Service

New message

Answer

Forward

Close







 /
read-only for
terminal







not available

Text/Comment/Final
comment

E-mail

Field descriptions

Type of recipient

In the field Type of recipient you can select the type of recipient. Depending on the selection made,

the field shows Person, Function or Terminal.

The  search  function  of  the  fields  Person/Function/Terminal  does  not  filter.  The

application shows all created persons, function groups and terminals.

The system does not verify, if the recipient can display the message. Persons without

sufficient authorizations or clients that do not support the messaging function might be

recipients of a message without being able to display the message.

Person

In the field Person you enter the unique personnel number of the recipient.

Function

In the field Function you enter the name of the function.

Terminal

In the field Terminal you enter the terminal number of the receiving terminal.

Not only can the shop floor terminals AIP2 receive and send messages.

Subject

In the field Subject the subject of a message is entered.

You can use a maximum number of 50 characters.

Text

In the field Text you enter the message content.

You can use a maximum number of 600 characters.

E-mail

If you select this function, an e-mail is sent in addition to the message.

SIS-HMS_40.docx

Version: 1.3.23281

Page 14 of 25

HYDRA Messaging Service

You can only use the option E-mail in connection with the types of recipient Person and

Function.  The  necessary  configurations  for  sending  e-mails  require  the  escalation

management license. The configurations are described in the documentation dealing with

the escalation management.

Comment (only Forward)

If you forward a message, you can use this field. You can enter a comment on the forwarded message

in this field. The original message content is not changed.

Comment (only Close)

If you close a message history, you can use this field. You can enter a final comment in this field that

is displayed in the column Final comment of the detail application Overview. The original message

content is not changed.

Further notes on processing

When  the  logged  in  MOC  user  receives  a  new  message,  a  pop-up  appears  on  the  bottom  right.

If the user clicks on the text in the pop-up, the user is led to the MOC application Current escalations. The

messages are listed in the escalation HMS.MESSAGE.

The  escalation  applications  do  not  support  the  function  of  sending  messages.  Only  use  the

application Messages to this end.

SIS-HMS_40.docx

Version: 1.3.23281

Page 15 of 25

HYDRA Messaging Service

3  Messages (AIP)

Overview

Purpose

You can create and send messages with the application "Messages" on the AIP2. The application provides

the following functions:

-  Create new messages

-  Mark messages read

-  Answer messages

-  Forward messages

-  Close messages

Integration

The  application  is  based  on  the  HYDRA  escalation  management.  Creating,  answering,  forwarding  or

closing  messages  are  functions  that  follow  the  mechanisms  of  the  escalation  management.  Possible

restrictions that are valid for the escalation management also apply to the use of this application.

Requirements

The  implementation  of  the  HYDRA  Messaging  Services  (HMS)  includes  the  necessary  programs  and

configurations.

You  have  linked  HYDRA  users  of  the  User  administration  to  persons  of  the  HR  master.  These

users/persons can exchange messages. If  you  want  to send messages to function groups,  you have to

generate the groups beforehand in the application Function groups.

In general, you can send a message to all persons or function groups. The exchange of messages

between terminals is not intended. A specific workflow is not defined, i.e. it is not defined who can

send a message to which recipient.

The system does not guarantee that the recipient reads a message.

The function of sending messages is only available in tile view.

Call

You can open the application in the basic display in tile view of the AIP2. Use the button Messages at the

bottom left to open the application.

SIS-HMS_40.docx

Version: 1.3.23281

Page 16 of 25

HYDRA Messaging Service

If there are unread messages, the button Messages is highlighted in a different color.

You can refresh the display. See paragraph Configuration.

Dialog Message overview

The dialog Message overview shows an overview of the messages the terminal is involved in. In general,

the function shows all active message histories i.e. that are not closed. In addition all messages (histories)

are shown that were closed within the last five days (default setting – see also paragraph Configuration).

Closed messages are grayed out in the Message overview.

The table is sorted as follows:

  First all active messages are shown. The active messages are sorted in descending chronological

order based on the time of the last update.

  Then  the  closed  messages  are  shown.  These  messages  are  also  sorted  in  descending

chronological order based on the time of the last update. Do not confuse the last update with the

time the message was closed.

The columns available in the overview are described below.

No title

The  column  No  title  shows  the  status  of  the  message  graphically.  The  table  below  describes  the

possible symbols in the column No title.

SIS-HMS_40.docx

Version: 1.3.23281

Page 17 of 25

HYDRA Messaging Service

Symbol  Meaning

If the first message of a message history addressed to the terminal is not marked

read, the symbol is highlighted in red.

If a message of the message history is not marked read by the terminal, the symbol

is highlighted in red.

The terminal has sent a new message to a recipient (person, function group).  The

new message is not yet marked read.

The first message of the message history is marked read.

This  symbol  is  even  shown,  if  the  dialog  Message  history  includes

messages that are not marked read.

The message history is closed. The message is additionally grayed out.

Date

Time

The column Date shows the date of the most recent message of the message history.

The column Time shows the time of the most recent message of the message history.

Communication partner

The column Communication partner shows the communication partner of the most recent message

of the message history.

If a message has been forwarded, the recipient of the forwarded message is displayed as

communication partner.

Subject

The column Subject shows the subject of the message that was entered on creating a new message.

Text

The column Text shows an extract of the complete message text.

Once the message history is closed, the column Text shows the final comment.

Buttons in the dialog box Message overview

Use the button

 to refresh the message overview.

SIS-HMS_40.docx

Version: 1.3.23281

Page 18 of 25

HYDRA Messaging Service

 Show message history

Use the button Message history to show the message history of a selected message.

New message

Use the button New message to create a new message.

Dialog - Message history

The  upper  part  of  the  dialog  box  Message  history  shows  all  messages  of  the  message  history.  The

messages are displayed in a descending chronological order. The lower part of the dialog box shows the

complete message content of a message selected in the upper part. By default the message on top of the

message history is selected (most recent message).

By default, incoming messages are shown in black font color, outgoing messages are shown in gray font

color.

The columns available in the upper part of the dialog box are described below.

No title

The first column No title indicates, if it is an incoming or an outgoing message. The possible symbols

are described below.

Symbol  Meaning

It is an incoming message.

It is an outgoing message.

It is a message forwarded to another communication partner.

No title

The second column No title shows the status of the message graphically. The possible symbols are

described below.

Symbol  Meaning

The message is marked read.

The message is not marked read.

SIS-HMS_40.docx

Version: 1.3.23281

Page 19 of 25

HYDRA Messaging Service

Date

Time

The column Date shows the date of the message.

The column Time shows the time of the message.

Communication partner

The column Communication partner shows the communication partner.

Text

The column Text shows the text of a message.

Buttons in the dialog box Message history

 Read

You use the button Read to mark a message read.

The button is only active with a message addressed to the terminal not yet being marked read.

Clicking on this button does not open a dialog. The message is directly marked read.

Answer

Use the button Answer to answer a message.

The button is only active with a message addressed to the terminal being marked.

Forward

Use the button Forward to forward a message.

The button is only active with a message addressed to the terminal being marked.

 Close message history

Use the button Close message history to close a message history.

The button is only active, if the message history has not yet been closed.

Each person involved in the message history can close the message history. This is not

restricted to the person who has created a new message.

SIS-HMS_40.docx

Version: 1.3.23281

Page 20 of 25

HYDRA Messaging Service

If you close a message history containing unread messages

, these messages are

automatically marked read

. At the same time, the time stamp of the message history

is updated and the closed message history is displayed on top of the list.

If all messages of a message history are already marked read on closing the message

history, the message is only set to the status closed, but the time stamp of the message

history is not updated. The closed message therefore stays at its position in the list.

Reporting dialogs

Overview of the fields you can edit in each reporting dialog

New message

Answer

Forward

Close











read-only

read-only





not available

not available

read-only

read-only

not available











not available

Type of recipient

Recipient

Subject

Message/
Final comment

Mail delivery

Field descriptions

Type of recipient

In the field Type of recipient you can select the type of recipient. The following types of recipients are

available:

  Function group

  Person

A terminal cannot be a recipient.

Recipient (Type of recipient: Function group)

In the field Recipient you can enter the name of the function group.

The search function of the field  Recipient does not filter. The system shows all created

function  groups.  The  system  does  not  verify,  if  the  recipient  can  display  the  message.

Persons without sufficient authorizations might be recipients of a message without being

able to display the message.

SIS-HMS_40.docx

Version: 1.3.23281

Page 21 of 25

HYDRA Messaging Service

Recipient (Type of recipient: Person)

In the field Recipient you enter the unique personnel number of the recipient.

The search function of the field  Recipient does not filter. The system shows all created

persons. The system does not verify, if the recipient can display the message. Persons

without sufficient authorizations might be recipients of a message without being able to

display the message.

Subject

In  the  field  Subject  you  enter  the  subject  of  a  message.  You  can  use  a  maximum  number  of  50

characters.

Message (only New message)

In  the  field  Message  you  enter  the  message  content.  You  can  use  a  maximum  number  of  600

characters.

Mail delivery

If you select this function, an e-mail is sent in addition to the message.

You can only use the option Mail delivery in connection with the types of recipient Person

and  Function  group.  The  necessary  configurations  for  sending  e-mails  require  the

escalation  management  license.  The  documentation  of  the  escalation  management

provides further information on the configurations.

Message (in the dialog box Forward)

If you forward a message, you can use the field Message. You can enter a comment on the forwarded

message in the field Message. The original message content is not changed.

Final comment

If you close a message history, you can use the field Final comment. You can enter a final comment

in this field.

Configuration

Show closed message histories

In the configuration file hytnrcfg.ini you can set the following configuration:

[ HMS->OPTIONS 0 ]

; Show finished message histories of the last 5 days.

NUMBER-OF-DAYS-OVERVIEW=5

SIS-HMS_40.docx

Version: 1.3.23281

Page 22 of 25

HYDRA Messaging Service

Display of new messages

On updating the terminal status, the server checks if there is a new message for the terminal. In this case,

the  button  is  highlighted  in  color.  Define  the  update  cycle  of  the  terminal  status  in  the  MOC  application

Terminal configuration in the field Cycle duration of status messages.

"Notification" is done by cyclic polling. On configuring the cycle duration of status messages, you

should therefore take into consideration the entire system and the shop floor clients. We do not

recommend a configuration less than two minutes.

Closing the dialog box Message overview does not automatically update the button. The button can still be

displayed in color (red), although all messages have been read. Only with the following status update, the

color is set back.

Configuration file hms.ini

In the configuration file hms.ini you can define the display of the entries in the Message overview

and in the message history. Changes to the configuration file hms.ini can lead to unpredictable

and unwanted behavior.

SIS-HMS_40.docx

Version: 1.3.23281

Page 23 of 25

HYDRA Messaging Service

4  Function Groups

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

identify specific recipients within a group (e.g. a group of maintenance engineers) that meet special

requirements, e.g. the recipient is present.

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

The priority defines the notification order within a function group. You can assign the same priority to

several persons within a function group.

The highest  priority  is  "1",  the  lowest priority  is  "999". The priority helps the system  to deliver the

messages.

SIS-HMS_40.docx

Version: 1.3.23281

Page 24 of 25

HYDRA Messaging Service

Personnel number

The personnel number identifies the person that should be notified.

Check console

If you have checked the option, the system will verify if the person is logged on to the client.  If the

person  is  not  logged  on,  the  system  verifies  the  person  with  the  next  priority  level.  You  use  this

setting,  if  you  do  not  use  the  "time  and  attendance"  system.  In  case  of  a  negative  result,  i.e.  the

person is not logged on to the client/console, the message is not delivered in an alternative form (text

message, e-mail...).

Example:

Three maintenance engineers work in three different shifts. If you assign within a group the same

priority to all three of them, only the engineer actually logged in to the console receives the message.

If you want to use the function "Check console", you must have entered the personnel number in the

User administration.

Check attendance

If you have checked the option "Check attendance", the system will verify, if the respective employee

is logged on to the PZE system "time and attendance" (only in connection with PZE-BP).

The  escalation  management  will  suppose  that  the  person  is  present,  if  the  following  PZE  events

occur: In, break, entrance before clocking in (with access control system ZKS).

There  is  an  AND-link  between  the  settings  "Check  console"  and  "Check  attendance".  If  both

options are checked, the person only receives messages when he or she is present AND logged

in to the console.

That is the reason why we recommend to check the option "console" OR the option "attendance".

The system cannot send a message to a function group, if no one of this group is logged in to the

console or is logged in to the PZE system "time and attendance".

In  this  case  the  escalation management  will  generate  the  event  "NO_PERSON_AVAILABLE".

You should assign a dispatcher group to this event or you should search for this event on a daily

basis in order to find cases left aside.

SIS-HMS_40.docx

Version: 1.3.23281

Page 25 of 25

