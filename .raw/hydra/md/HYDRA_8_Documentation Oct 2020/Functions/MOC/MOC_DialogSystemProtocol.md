Dialog Error Log

1  Dialog Error Log

Overview

HYDRA menu

System Administration  Monitoring  Dialog error log

FEDRA menu

System Administration  Monitoring  Dialog error log

Transaction code

dlgpro

Function authorization

dlgpro.*

Purpose

The application shows data resulting from the logging of returned dialog data strings. Data included in the

“dialog error log” dialog complement the information determined within system logs.

Integration

The application is a central function used by many applications/functions.

If the escalation management module  is in use the escalation  ERRPRO.ERROR_PROTOCOL_WRITTEN is

generated, which enables active notifications.

Field Descriptions

Status

Status of the message as status lights:

- Info (blue)

- Warning (yellow)

- Error (red)

Error class

Module that caused the error (e.g. SYS, HYD, ADE, PZE)

Error code

Error number returned by the dialog

Error description

Description of the error code

Dialog

Dialog that caused the entry

Dialog data string

Entire dialog string that caused logging

MOC_DialogSystemProtocol.docx

Version: 1.0.23368

Page 1 of 2

Dialog Error Log

Event

Event in terms of the system

Description of the action

Comment on the triggered action

HYDRA User

HYDRA user (e.g. terminal)

Logging date

Date and time of logging

Entry date

Date and time of entry

DD user

Editor in terms of the system that is entered in the dialog string

Order

Order from dialog string

OP

Operation from dialog string

Batch number

Batch number from dialog string

Machine

Machine number from dialog string

Group

Group from dialog string

Resource

Resource number from dialog string

Person

The person’s personnel number in terms of the system

Name, Last name, First name, Badge

The person’s name (complete), last name, first name and badge number (badge)

Foreman’s area

Foreman’s area which this person belongs to

Editor, Editing date

Editor (date) for signing/approval

MOC_DialogSystemProtocol.docx

Version: 1.0.23368

Page 2 of 2

