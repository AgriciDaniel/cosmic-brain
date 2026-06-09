Messages for Employees

1  Messages to Employees

Summary

Menu

Master Data --> People --> Messages to Employees

Transaction Code

pmes

Function authorization

pmes

 The "messages to employees" function makes it possible to display  any  texts,  when people  try  to  post

something at the terminal. In this way, people may be asked, for example, to contact the payroll office or

they may be reminded of closing doors and windows or shutting down machines on the last working day

of th week

MOC_PersonalMessages.docx

Version: 1.0.18468

Page 1 of 2

Messages for Employees

Utilization

Messages are sent in periodic intervals to the terminals so that a specific time passes until they

are  displayed  on  the  terminals.  The  configuration  is  made  within  the  PZE  properties  of  the

terminal configuration. The "display duration of info" field specifies how long the messages are

displayed at the terminal.

Not more than 20 characters may be entered per message line for terminals the display  is 20

characters long (e.g. CT-370).

The terminals of the type CTP-340 or terminals by Kaba Benzing do not support the display of

messages function.

Field Descriptions in the "message" tab

Company

Restricts the validity of the clocking authorization to a specific company.

Personnel selection

The  next  two  fields  allow  for  the  "clocking  authorization"  to  be  restricted  to  a  specific  person  or

group  of  people.  The  HR  master  fields  "cost  center",  "area",  "employee  subgroup",  "activity"  and

"staff membership" may be selected as employee groups.

Valid from, to

Validity period of the message

Number

Specifies  how  often  a  message  is  to  be  displayed  for  a  person  at  the  terminal.  If  the  field  is  left

empty the message is shown without any restriction. When a message is changed, it is impossible

to  change  the  number,  as  otherwise  it  cannot  be  traced  back  how  often  individual  people  have

already read the message.

Message

Message that is to be displayed at the terminal.

Clocking status

It may be defined for which clocking statuses messages are to be displayed for the person.

Field descriptions of the "validity" tab

Weekday

It may be selected at which weekdays the message is to be displayed.

MOC_PersonalMessages.docx

Version: 1.0.18468

Page 2 of 2

