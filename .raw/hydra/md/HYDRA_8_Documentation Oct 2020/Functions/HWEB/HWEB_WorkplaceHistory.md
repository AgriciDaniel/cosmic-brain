Machine History

1  Machine History

Overview

The application makes it easier to follow up on and track MES events at a workplace that are relevant to a

posting. For this purpose, the posting events recorded at a workplace such as status changes, order and

personnel postings, are listed in table form and shown in chronological order.

Selection criteria

The application provides the following selection criteria:

Workplace from … to …

This selection criterion references the workplace in the machine or workplace master data. You can

also run a search using wildcards (placeholders *).

Group from … to …

This selection criterion references the group in the machine or workplace master data. All machines

or  workplaces  are  displayed  that  are  assigned  to  the  selected  group.  You  can  also  run  a  search

using wildcards.

Short designation

This  selection  criterion  references  the  short  name  of  the  machines  that  are  defined  in  the  master

data. All of the machines or workplaces are displayed that match the string that was entered. You

can also run a search using wildcards.

Report group

This selection criterion references the report groups. All machines or workplaces are displayed that

are assigned to the selected report group. You cannot run a search using wildcards.

Cost center

This selection criterion references the cost center defined in the machine or workplace master data.

All  machines  or  workplaces  are  displayed  that  are  assigned  to  the  selected  cost  center.  You  can

also run a search using wildcards.

Date from ... to (shift/ time)

The period for the data to be evaluated can be limited via the date selection option.

If a selection is made via a shift (shifts), the shift date is evaluated. If no shift has been selected, all

shifts are considered. Please keep in mind that a selection by shift is only supported for order and

machine data, not for resources data.

For the selection by time, you select the start date. The two times each refer to the start or to the

end of the date periods listed above.

HWEB_WorkplaceHistory.docx

Version: 1.0.1362

Page 1 of 4

It is only possible to evaluate workplaces configured as a "group work place" if the selection is

made by time; nothing is displayed if the selection is made by "shift", because there is no shift

reference for group workplaces.

Machine History

Machine history detail applications

The machine history lists all events, such as status changes, order or personnel postings, for a machine

that occurred on the day being evaluated or in a shift on this day. The following symbols are displayed in

the "Type" field in the reports:

 Machine/ workplace related postings

Automatically recorded (for a direct machine connection) machine status or one assigned manually

at  the  terminal,  production  block  settings,  modified  machine/  workplace-related  default  values

(target  cycle,  partitioning)  at  the  terminal  and/or  automatically  set  operation  postings.  If  a  staff

badge  number  was  recorded  for  a  posting,  the  person  is  displayed.  No  order-related  data  are

displayed for machine-related postings

 Order-related postings

Postings performed automatically (with change of shifts) or manually (logon, logoff, interruption) at

the terminal. In addition, the corresponding order is displayed. If the posting is one that was entered

manually, the person is shown who performed the posting.

When waiting period processing is applied, the order logon time displayed illustrates the recording

time and may deviate from the time in the order log record.





  Personal postings

Postings performed automatically (with change of shifts) or manual personnel logons or logoffs at

the terminal. In addition, the corresponding personnel number is displayed as well as the operation

at which the person is working.

Field description

Below find a description of the available data:

Date

Type

Date and time of the event as a recording time

Image presentation belonging to the type as described above.

HWEB_WorkplaceHistory.docx

Version: 1.0.1362

Page 2 of 4

Machine History

Type

Assignment of the recorded events. Possible values:

- Machine status

- Production lock

- Operation postings

- Personnel postings

- Default value changes

Event

Specifies the event recorded at the machine that is listed in the line of the table.

Type

Event

Machine status

Production lock

Operation postings

Machine
configuration

status

corresponding

to

the

P.LOCK SET MANUALLY
P.LOCK CANCELED MANUALLY

OP LOGGED ON
OP INTERRUPTED
OP LOGGED OFF

Personnel postings

PERSON LOGGED ON
PERSON LOGGED OFF

Default value changes

CHANGE  PARTITIONING/  CHANGE  TARGET
CYCLE

Order

Order number of the posted operation (only for operation postings)

Article

Article number of the posted operation (only for operation postings)

Person

Personnel number of the person that was logged on or off (only for personnel postings)

Last name

Name of the person that was logged on or off (only for personnel postings)

First name

First name of the person that was logged on or off (only for personnel postings)

Workplace

Workplace that the event relates to.

Short name

Short name of the workplace

HWEB_WorkplaceHistory.docx

Version: 1.0.1362

Page 3 of 4

Machine History

Group

Group that the machine is assigned to.

Cost center

Cost center of the workplace

Status

Status number of the assigned status (only for machine status).

Status designation

Status text of the assigned status (only for machine status).

HWEB_WorkplaceHistory.docx

Version: 1.0.1362

Page 4 of 4

