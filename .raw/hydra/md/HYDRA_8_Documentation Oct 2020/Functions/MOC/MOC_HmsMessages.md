Nachrichten (MOC)

1  Messages (MOC)

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

MOC_HmsMessages.docx

Version: 1.1.18468

Page 1 of 10

Nachrichten (MOC)

If you want to send a message to a terminal, the MOC does not require specific configurations.

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

MOC_HmsMessages.docx

Version: 1.1.18468

Page 2 of 10

Clicking on this button does not open a dialog. The message is directly marked read.

Nachrichten (MOC)

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

MOC_HmsMessages.docx

Version: 1.1.18468

Page 3 of 10

Nachrichten (MOC)

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

The column No title shows the status of the message history. Possible entries in the column  No

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

MOC_HmsMessages.docx

Version: 1.1.18468

Page 4 of 10

Nachrichten (MOC)

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

MOC_HmsMessages.docx

Version: 1.1.18468

Page 5 of 10

Nachrichten (MOC)

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

MOC_HmsMessages.docx

Version: 1.1.18468

Page 6 of 10

If  a  message  has  been  forwarded,  the  recipient  of  the  forwarded  message  is  displayed  as

Nachrichten (MOC)

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

MOC_HmsMessages.docx

Version: 1.1.18468

Page 7 of 10

Recipient

Type of recipient

The column Type of recipient shows the type of the recipient of a message. The following entries

Nachrichten (MOC)

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

The following field descriptions refer to the functions that you can start via the toolbar. Depending on the

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

MOC_HmsMessages.docx

Version: 1.1.18468

Page 8 of 10

Nachrichten (MOC)

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

MOC_HmsMessages.docx

Version: 1.1.18468

Page 9 of 10

Nachrichten (MOC)

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

MOC_HmsMessages.docx

Version: 1.1.18468

Page 10 of 10

