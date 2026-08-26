Machine History

1  Machine history

Overview

Menu

Production facility/Resource management  Resource analysis  Machine
history

Transaction code

wphi

Function authorization  wphi

Purpose

The machine history is a report for the production management. The application allows for tracking and

tracing  of  events  that  need  to  be  posted  at  workplaces  in  MES.  In  this  context,  posting  events  such  as

status changes, order, tool, and personnel postings, maintenance activities as well as measures recorded

at  a  workplace  are  listed  in  chronological  order  in  a  table.  You  can  use  various  selection  criteria  to

evaluate events.

Selection criteria

The application provides the following selection criteria:

Workplace from … to …

This selection criterion refers to the workplace stored in the machine or workplace master data. You

can also use wildcards (placeholders *).

Group from … to …

This  selection  criterion  refers  to  the  group  stored  in  the  machine  or  workplace  master  data.  The

application  shows  all  workplaces/machines  assigned  to  the  selected  group.  You  can  also  use

wildcards.

Short name

This  selection  criterion  refers  to  the  short  name  of  machines  in  the  master  data.  The  application

shows  all  machines  or  workplaces  matching  the  entered  character  string.  You  can  also  use

wildcards.

Designation

This field refers to the name of machines and workplaces defined in the machine master data. The

application  only  shows  the  machines  matching  the  specified  character  string.  You  can  also  use

wildcards (placeholders *).

MOC_WorkplaceHistory.docx

Version: 1.11.19895

Page 1 of 11

Machine History

Cost center

This  selection  criterion  refers  to  the  cost  center  stored  in  the  machine  and/or  workplace  master

data. The application shows all machines and/or workplaces assigned to the selected cost center.

You can also use wildcards.

Company

This selection criterion refers to the company defined in the machine or workplace master data. The

application  shows  all  workplaces/machines  assigned  to  the  selected  company.  You  can  also  use

wildcards.

Report group

This selection criterion refers to the report groups. The application shows all workplaces/machines

assigned to the selected evaluation/report group.

Responsibility area

This selection criterion refers to the responsibility area in the workplace/machine master. Note: The

user can only view those machines included in the responsibility areas assigned to the user.

Type

Type

Selects the category of the machine/workplace displayed in the evaluation/report. You can select E

(individual workplaces) and G (group workplaces).

Selects the workplace type. You can select the following workplace types:

- P Workplace

- N Machine

- J Machining center

- L Line

- A Aggregate

- C CAQ inspection station

- R Reel-based manufacturing

- S Cutting unit

Show comments

If you select the checkbox Show comments, the table also shows entered comments.

Comment

If the input field  Comment  includes a text, the table only shows  the data records that  include this

text as a comment. You can use * as a wild card. Please note case sensitivity.

You cannot use this selection field to search BDE comments.

MOC_WorkplaceHistory.docx

Version: 1.11.19895

Page 2 of 11

Machine History

Machine statuses > X minutes only

This  parameter  only  refers  to  events  of  the  type  "machine  status".  The  application  will  show  the

machine status if the posted time is greater than the entered value.

Event type

You  can  restrict  the  displayed  events.  The  application  shows  all  events,  in  case  you  have  not

restricted the selection.

Designation

Machine status

Production lock

Operation postings

Personnel postings

Acronym

M_MST

M_PSPERRE

A_ADE

P_ADE

Target value changes

M_VORGABE

Maßnahme

R_MASSNAHME

Resource posting

Release of resource

Resource status

R_MELDUNG

R_FREIGABE

R_STATUS

Maintenance reset

R_WART_RESET

Exceeding of maintenance

R_WART_EXCEEDED

DNC Upload

DNC Download

R_UPLOAD

R_DOWNLOAD

Transfer posting of resources

R_UMBUCHUNG

Beginning of status
end of status

BDE comment

RES_STB
RES_STE

HY_BEM:  Display  of  BDE
that  have  been
comments
entered
to  an
reference
operation.

in

You can only view BDE comments (event „Information“) if the upgrade wphi2 is activated.

Please  note:  Posting  of  events  depends  on  the  customer's  system  and  its  use.  Consequently,  it

might be the case that not all events listed here are relevant.

Date from …to (shift/ time)

Use the date selection to restrict the period of time for the data you want to evaluate.

When selections are made using shift(s), the shift date is evaluated. If no shift is selected, all shifts

are used.

MOC_WorkplaceHistory.docx

Version: 1.11.19895

Page 3 of 11

Machine History

Note  that  selection  by  shift  is  not  supported  for  all  event  types.  You  can  find  detailed

information on the shift selection here.

If you select by time, the selection is based on the start date. Both times refer to the beginning or

end of the date period specified above.

You can only evaluate Group workplaces if you select by Time. If you select by Shift, no

data will be displayed because group workplaces do not refer to shifts.

Order / Article / MES order number

You can use these criteria to search for BDE postings:

  Log on OP, interrupt OP, log off OP, enter part quantities

  Log on staff, log off staff

  Change partitioning, change target cycle

  BDE comment

You can only select by order/article/operation if you enable the upgrade wphi2.

Machine history detail application

The machine history lists all events, such as status changes, order or personnel postings of a machine

that occurred on the day. These have to be evaluated or listed in a shift of this day. The

evaluations/reports show the following postings:

Postings based on machines/workplaces:

Postings for machine statuses recorded automatically (with direct machine connection)

Postings assigned manually at the terminal

Setting the production lock or changing default values relating to machines/workplaces (target cycle,

partitioning) at the terminal

Automatic assignment of default values with operation postings

 Postings based on orders:

Postings performed automatically (when shifts change)

Manual postings (logon, logoff, interruption) at the terminal.

The corresponding order is displayed additionally. If it is a manual posting, the person who did the posting

is shown  as  well.If  waiting  period processing is  active, the  displayed  logon time of the order represents

the time of entry and may deviate from the point in time indicated in the order log record.



MOC_WorkplaceHistory.docx

Version: 1.11.19895

Page 4 of 11

Machine History

 Postings based on staff:

Automatic (when shifts change)

Manual logon or logoff processes of staff at the terminal

In addition, the application shows the corresponding personnel number and the operation for which

the person produces.

 Postings based on resources:

Machine  postings  resulting  from  the  HYDRA  Tool  and  Resource  Management  module  (HYDRA-

WRM), e.g. the application also shows exceeded maintenance activities or measures/comments.

 Information

Shows BDE comments entered via the AIP terminal and stored with the operation.

The event "information" is only available if you enable the upgrade wphi2.

The  event  "information"  also  shows  the  total  duration  of  the  respective  status  /  event.  The  duration  is

always zero when a person or OP is logged on. The duration states the interval between the logging on

and logging off if you interrupt/log off an OP or person.

Field description

The following paragraphs describe the data available in the table. It might be the case that the application

does not show this data by default. Use the column selection function to add the required data.

Field description workplace category

Workplace

Workplace the event refers to.

Field description event category

Type

Image display of the type

Event type

Assign the recorded event. Possible values: see event

Event

Classifies  the  event  collected  at  the  machine  in  the  table  row.  In  the  columns  "Selection  by  shift"

and "Selection by time" you can see events available for a specific selection.

Event type

Event

Selection by
shift

Selection by
time

MOC_WorkplaceHistory.docx

Version: 1.11.19895

Page 5 of 11

Event type

Event

Machine status

Production lock

Operation postings

Personnel postings

to

Machine  status  according
configuration
Coloring is set according to the
settings in the status text
configuration..

Production lock set manually
Production lock canceled
manually

OP logged on
OP interrupted
OP logged off

Person logged on
Person logged off

Target value changes

Change partitioning/change
target cycle

Exceeding
maintenance

of

Maintenance cycle exceeded

Maintenance reset

Maintenance reset

Information

BDE comment entered

Beginning of status
end of status

Event  and  coloring  according  to
configuration

Machine History

Selection by
shift

Selection by
time

Yes

Yes

No

Yes

Yes

Yes

Yes

No

No

No

Yes

No

Yes

Yes

Yes

Yes

Yes

Yes

Datum

Entry date of the event

Time

Entry time of the event

Duration

Time  between  the  last  event  of  this  kind  and  the  one  currently  displayed.  The  duration  is  only

shown  for  the  events  "OP  INTERRUPTED",  "OP  LOGGED  OFF",  "PERSON  LOGGED  OFF"  as

well as for machine statuses. In any other case, 0 is shown. These durations are synchronized with

the  BDE  shift  calendar,  i.e.  shift  breaks  are  not  included.  Consequently,  this  value  does  not

necessarily correspond to the period of time between logon and logoff.

Field description master data category

Workplace

Unique ID defined in the workplace configuration.

Designation

Machine name as defined in the workplace configuration.

MOC_WorkplaceHistory.docx

Version: 1.11.19895

Page 6 of 11

Machine History

Comment

Comment on the machine as defined in the workplace configuration.

Group

Capacity group which the machine was assigned to.

Cost center

Cost center as defined in the workplace configuration.

Company

Company as defined in the workplace configuration.

Responsibility area

Responsibility area required to view this workplace as defined in the workplace configuration.

Field description order category

Order type

Order type of the order for which the event was collected.

order

Order number of the OP for which the event was recorded.

Sequence

Sequence number of the OP (provided that sequences are used).

OP

Split

SOP

Operation number

Split number of the operation (if split OPs are used)

Sub operation number (reserved).

Article

Article number produced by the operation; taken over from operation data.

Article designation/name

Article name of the article.

Field description person category

Person

Personnel number of the person that has been logged on or off (only for Pers. postings)

Last name

The person’s last name who was logged on or off (for personnel postings only).

MOC_WorkplaceHistory.docx

Version: 1.11.19895

Page 7 of 11

Machine History

First name

The person’s first name who was logged on or off (for personnel postings only).

Name

Full  name  (last  name,  middle  name  and  first  name)  of  the  person  who  was  logged  on  or  off  (for

personnel postings only).

Field description status category

If the event is a machine status, then this category shows the status number and status text name. This

category shows the resource status for events based on resources.

Status

Status number of the assigned status

Status text

Status text of the assigned status

Receiving storage location

Destination when entering a resource status change (RES_STATUS).

Field description maintenance category

Maintenance type

Type of the maintenance

T:

B:

Z:

based on cycles,

based on operating hours

based on time

Maintenance

  Maintenance short text

Target cycles

For maintenance type T only: number of cycles until the maintenance is due again.

Actual cycles

For maintenance type T only: number of cycles accrued since resetting the maintenance interval.

Value results from the machine data collection (MDE).

Planned hours of operation

For maintenance type B only: number of operating hours until maintenance falls due again.

Actual hours of operation

For maintenance type B only: number of operating hours accrued since resetting the maintenance

interval. Value results from the machine data collection (MDE).

MOC_WorkplaceHistory.docx

Version: 1.11.19895

Page 8 of 11

Next date

For maintenance type Z only: time when the maintenance falls due the next time.

Machine History

Processing mode

For maintenance events (RES_WART):

R = Reset

Z = Threshold exceeded

A = Enabled/disabled

For changed resource statuses (RES_STATUS):

S = Change over status

Threshold 1 (in %)

Threshold until reaching due date

Threshold 2 (in %)

Threshold until reaching due date

Threshold 3 (in %)

Threshold until reaching due date

Active

“Active” flag of the maintenance activity at the time of the event.

Active (so far)

Only relevant for processing mode A: previous “active” status of the maintenance activity at the time

when the maintenance activity was activated/deactivated.

Modified by

Editor who edited/set/reset the maintenance.

Datum

Date of editing/resetting

Time

Time of editing/resetting

Field description measure category

Maßnahme

Measure name

Designation

Name/description (long text) of the measure.

Reporting person

Person who created the measure.

MOC_WorkplaceHistory.docx

Version: 1.11.19895

Page 9 of 11

Machine History

Verantwortlicher

Person who has to carry out the measure.

Date of solution

Date when the measure has to be completed.

Priority

Priority of the measure.

Done

Flag indicating that the measure has been completed.

Done by

Person who marked the measure as being completed.

Field description upload/download category

(Not supported)

Field description comment category

Comment

Comment on the event entered by the employee.

Field description changed partitioning category

Partitioning

Partitioning

Cavity

Cavity number.

Type of modification

Reduced partitioning or increased partitioning.

Reason for change

Number of the reason for change.

Text of reason for change

Text of reason for change

Toolbar

 Generate order (function authorization wphigenorder)

Use the "Generate order" function to create orders from work plans based on Configuration.

MOC_WorkplaceHistory.docx

Version: 1.11.19895

Page 10 of 11

Machine History

 Order information (function authorization: orin)

Request  Order information.

MOC_WorkplaceHistory.docx

Version: 1.11.19895

Page 11 of 11

