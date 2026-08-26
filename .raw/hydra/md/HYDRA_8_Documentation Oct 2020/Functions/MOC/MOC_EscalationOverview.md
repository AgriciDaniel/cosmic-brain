Current Escalations

1  Current Escalations

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

The additional criterion All messages shows the messages of all users that are currently open or in process.

You require the global permission for messages to view all messages for all users.

MOC_EscalationOverview.docx

Version: 1.6

Page 1 of 4

Current Escalations

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

If you enable this option, the overview does not only show your "own" escalations but that of all users.

You can select several escalations (multiple selection option) and use the functions Forward and Complete

messages for the selected escalations at the same time.

Field descriptions

Reference

Unique ID of the message

Status

Message status

Priority

Priority of the message

Point in time

Date and time of the generation

MOC_EscalationOverview.docx

Version: 1.6

Page 2 of 4

Current Escalations

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

Finished

Date / time and person who last edited the data record

MOC_EscalationOverview.docx

Version: 1.6

Page 3 of 4

Current Escalations

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

MOC_EscalationOverview.docx

Version: 1.6

Page 4 of 4

