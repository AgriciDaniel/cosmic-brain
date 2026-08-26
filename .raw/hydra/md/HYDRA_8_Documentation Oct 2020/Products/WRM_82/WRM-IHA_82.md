Manual

Tool and Resource Monitoring
WRM-IHA 8.2

Version 1.0.23133

Last changed on: September 4, 2020

Tool and Resource Monitoring

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

WRM-IHA_82.docx

Version: 1.0.23133

Page 2 of 54

Tool and Resource Monitoring

Contents

1  Order Generation for Resources – Overview ............................................... 4

2  Resource Overview ...................................................................................... 5

3  Resource history ........................................................................................ 13

4  Machine history .......................................................................................... 19

5  Maintenance Calendar (Activity Calendar) ................................................ 29

6  Production Variants .................................................................................... 44

7  Automatic generation of orders - processing ............................................. 49

8  Generation of orders (configuration) .......................................................... 53

WRM-IHA_82.docx

Version: 1.0.23133

Page 3 of 54

Tool and Resource Monitoring

1  Order Generation for Resources – Overview

Purpose

The  function  package  Order  Generation  for  Resources  provides  functions  to  generate  maintenance

orders directly from the different applications of the resource management.

Integration

The function is integrated in different applications – see below. To use this function, a customer-specific

configuration and a briefing of the user is required or recommended.

Features

Application service (AS) to generate maintenance orders.  You can  plan these  orders using the HYDRA

planning functions and record actual data on shop floor terminals for the orders:

  You can create maintenance orders in the maintenance calendar and define a specific order type

to specifically control such orders.

  You can create general maintenance orders and edit measures in the resource history.

  You can create repair orders in the resource history.

  You can create retooling/setup orders in the HYDRA Shop Floor Scheduling if you use this tool

for the detailed planning.

  You can enter the resource status when you log on, interrupt and log off the maintenance orders.

  You can create overviews and reports for maintenance orders in the HYDRA-BDE functions.

  You  can  perform  uploads  to  ERP  systems  including  the  actual  data  recorded  for  maintenance

orders.

Note:  The  precise  requirements  and  the  solutions  found  are  implemented  as  part  of  the  HYDRA

configuration (chargeable service).

WRM-IHA_82.docx

Version: 1.0.23133

Page 4 of 54

Tool and Resource Monitoring

2  Resource Overview

Overview

Menu

Production facility management  Current information  Resource overview

Transaction code

resov

Function authorization

resov.*

The  resource  overview  is  the  central  application  that  provides  an  overview  of  the  current  resources

managed  in  the  system.  The  resource  overview  provides  functions  regarding  status  change,  stock

transfer and documentation of measures.

Purpose

You  can  use  the  Resource  overview  to  show  the  current  status  of  selected  resources.  The  application

shows all resources matching the conditions you specified in the selection parameters.

The  list  shows  the  specified  resource  master  data  and  the  current  resource  status.  If  the  tool  is  active

(logged on), the Resource overview shows the machine and the operation where the resource is logged

on to. If the resource is locked, the overview shows the following:

- the reason of the lock,

- the time when the resource has been locked, and - if entered -

- the time until the resource will be locked.

Integration

You can use the master data function Resource configuration to create, change or delete resources.

Selection criteria

The application provides the following selection criteria:

Resource from ... to ...

This selection criterion refers to the resource. You can also use wildcards (placeholders *).

Short name

Short name of the resource. Only relevant for resources of type MNR.

Resource type

Type of resource.

Designation

Name of the resource.

WRM-IHA_82.docx

Version: 1.0.23133

Page 5 of 54

Group

Workplace/machine group of the resource. Only relevant for resources of type MNR.

Tool and Resource Monitoring

Cost center

Cost center of the resource.

Short name

Short name of the resource.

Resource family

Family the resource is assigned to.

Responsibility area

Responsibility area the resource is assigned to.

Storage location

Regular storage location of the resource.

Current storage location

Current storage location of the resource. The functions Status change and Stock transfer are used

to book the resource to this storage location. If you log on a resource to a workplace, this workplace

automatically becomes the current storage location of the resource.

Show deleted resources (as of WRM 8.2)

Use this field to specify if logically deleted resources are shown.

MD user fields

MD  user  fields  1-  6  of  the  resource.  If  you  select  a  resource  family  in  the  selection  panel,  the

application shows the field names according to the assigned user field definition.

Field descriptions

Most field descriptions are included in the application Resource configuration. See the following tabs:

-  General resource configuration

-  User fields

-  Comment

-  Resource attributes

-  Resource list

The additional tabs of the resource overview are described here:

"Status" tab

Active

Specifies whether or not the resource is currently logged on to a workplace.

WRM-IHA_82.docx

Version: 1.0.23133

Page 6 of 54

Tool and Resource Monitoring

Deleted (as of WRM 8.2)

Specifies whether the resource displayed is logically deleted or not.

Current machine, current order

For active resources, this field specifies the workplace and the order where the resource is currently

logged on.

Current storage location

Current storage location of the resource. The functions Status change and Stock transfer are used

to book the resource to this storage location. If you log on a resource to a workplace, this workplace

automatically becomes the current storage location of the resource.

Resource status, status since

Specifies  the  current  status  of  the  resource.  Number  and  name  are  displayed  and  the  time  when

the status was set.

New status, from, until

You can specify a future status that is set when the status changes. The status is not immediately

set, but an expected future status is specified.

The  HYDRA  Shop  Floor  Scheduling  can  use  this  future  status  to  show  and  monitor  the  resource

assignment.

In the HYDRA Scheduler, a job "WRM resource control" is installed. This job regularly executes the

script  ./hyresctl.scr  /STATUS  (by  default  every  30  minutes).  The  program  called  by  the

script, performs the following processing:





If the time "New status from" is exceeded, the new status is set.

If the time "New status until" is exceeded, then the status is set that includes the value "F" in

field Collection in the status configuration.

Technical  note:  Both  status  changes  are  internally  performed  via  an  asynchronous  DDI  call

(DLG=RES_STATUS or DLG=RES_FREI).

"Use" tab

Target utilization

Cycles

The field Cycles provides additional information. The cycles value defines how long the resource is

to be used.

Runtime

The field Runtime provides additional information. It defines how long the resource is to be used.

WRM-IHA_82.docx

Version: 1.0.23133

Page 7 of 54

Tool and Resource Monitoring

Actual utilization

Cycles

The total number of cycles that have been recorded for the resource since initialization.

Runtime

The total run time that has been recorded for the resource since initialization.

Yield, scrap

Total of yield or scrap that has been recorded for the resource since initialization and posted to the

relevant account (base quantity, primary quantity).

Run times since implementation, allocated to RPA

Account name (e.g. SUT, MUT)

Total  number  of  hours  that  has  been  recorded  for  the  resource  and  booked  to  this  resource

performance account since initialization.

Toolbar

Resource tab

 File – Show file (function authorization: mdres.doc)

Opens  the  file  view  –  only  available  for  document  resources,  which  are  configured  as  file-based

resources without DNC processing in the Resource type. And only available if the relevant license

and function authorization are available.

  Go to – Resource configuration (function authorization: mdres)

Opens the application Resource configuration. The selected resource is passed as default value.

  Go to – Resource list (function authorization: mdrbom)

Opens  the  Resource  list  application.  The  selected  resource  is  entered  as  default  value  for  the

higher-level resource.

  Go to – Resource history (function authorization: reshi)

Opens the application Resource history. The selected resource is passed as default value.

 Functions – Measure

Opens the Measures application.

WRM-IHA_82.docx

Version: 1.0.23133

Page 8 of 54

Tool and Resource Monitoring

 Functions – Status change

Opens the dialog to change a resource status. The following input fields are available:

Status: Status that is set according to configuration.

Material buffer: With the status change, the resource  can be relocated  and transferred to another

storage location.

Set immediately:

- The current date is preassigned to the field from and cannot be changed.

- The field till is empty; you can enter a date here.

Set for period:

- The current date is preassigned to the field from and can be changed.

- The field till is empty; you can enter a date here.

If no date is entered in field till, the system automatically sets the date to 31-DEC-9999.

The checkbox Including subordinate resources is not relevant and reserved for future extensions.

Comment: The comment entered can be displayed in the Resource history.

 Functions – Release of resource

Opens  the  dialog  to  release  a  resource.  The  checkbox  Including  subordinate  resources  is  not  relevant

and reserved for future extensions.

 Functions – Stock transfer

Opens the dialog to transfer/relocate a resource.

 Generate order (function authorization: resovgenorder)

Generates  a  maintenance  order  for  the  selected  data  row.  (The  function  is  only  available  with

function package WRM-IHA).

 Document management (function authorization: resovdoc)

Click this button to call the Document management.

DNC tab

The tab is only available, if you select a DNC resource. These are resources configured with  DNC

processing in the Resource type.

WRM-IHA_82.docx

Version: 1.0.23133

Page 9 of 54

Tool and Resource Monitoring

  File – Export (function authorization: mdres.export)

Exports the file specified for the resource. You use the file explorer to specify the target file.

  File - Import (function authorization: mdres.import)

Imports the file specified for the resource. You use the file explorer to specify the source file.

  File - Viewer (function authorization: mdres.vis)

Opens the file specified for the resource using the defined viewer program.

  File - Editor (function authorization: mdres.editor)

Opens the file specified for the resource for editing using the defined editing program.

  File – Comparison editor (function authorization: mdres.diff)

Opens  the  comparison  editor  for  the  selected  resource  or  resources.  See  below  for  further

information.

  Go to – Resource configuration (function authorization: mdres)

Opens the application Resource configuration. The selected resource is passed as default value.

  Go to – Resource list (function authorization: mdrbom)

Opens  the  Resource  list  application.  The  selected  resource  is  entered  as  default  value  for  the

higher-level resource.

 Functions – Status change

Opens the dialog to change a resource status.

 Functions – Release of resource

Opens the dialog to release a resource.

WRM-IHA_82.docx

Version: 1.0.23133

Page 10 of 54

How to use the comparison editor

Tool and Resource Monitoring

The  comparison  editor  compares  the  files  attached  to  the  DNC  resources.  Two  operation  modes  are

available:

Selection of one resource:

The  editor  shows  the  released  resource  and  the  optimized  version  of  the  resource  for

comparison.  You  can  change  the  file  displayed  on  the  right-hand  side  of  the  editor.  Once  you

have  made  the  changes,  the  comparison  editor  transfers  these  changes  to  the  system,  like  the

simple editor. You can only use this mode for DNC types with the file processing type "optimized".

Selection of two resources:

If you select two resources before you open the comparison editor, the editor compares the two

selected resources. You can select the file type. You can change the file displayed on the right-

hand side of the editor. Once you have made the changes, the comparison editor transfers these

changes to the system, like the simple editor.

Click  the  relevant  buttons  or  use  the  context  menu  (right-click)  to  start  the  functions  of  the  comparison

editor:

WRM-IHA_82.docx

Version: 1.0.23133

Page 11 of 54

Tool and Resource Monitoring

-  Reject: Rejects the difference identified (on the right). Accepts the value from the left file.  The editor

does no longer highlight the difference.

-  Keep:  Accepts  the  difference  identified  (on  the  right).  The  editor  does  no  longer  highlight  the

difference.

-  Next difference: Goes to the next difference.

-

Insert: Inserts a row at the current position.

-  You can always change the contents of a row. Click the row and enter a value. Press ESC to quit the

row without changes. The editor then highlights the row as "changed".

-  Swap windows: Click this button to swap the windows. This function is necessary if you compare two

resources.  The  place  where  a  resource  is  displayed  results  from  the  display  order  in  the  table;  the

system  does  not  know,  which  resource  must  be  changed.  In  mode  Selection  of  one  resource,  this

button is not available because here you can only change the optimized program version.

-  Save: Saves the changes made to the file on the left-hand side.

WRM-IHA_82.docx

Version: 1.0.23133

Page 12 of 54

Tool and Resource Monitoring

3  Resource history

Overview

Menu

Production facility management  Resource analysis  Resource history

Transaction code

reshi

Function authorization

reshi

The "resource history" provides an overview of what happened to a resource in the  past. Therefore, you

can  trace  activities  that  are  relevant  to  quality  ("log  book").  The  application  maps  the  resource's  "life

cycle".

Purpose

In  this  application  the  system  documents  all  actions/events  relating  to  the  object  "Resource".  The

resource history documents the actions/events resulting from the resource management and the use  of

resources  in  BDE  orders.  BDE  orders  can  be  production  orders  and  maintenance  orders.  The  system

documents the following:

-  Status changes (resource status changes)

-  Stock transfers

-  Measures/ comments

-  Exceeded maintenance cycles

-  Maintenance reset

-  With DNC: Upload and download

-  Order logons

-  Order logoffs

Whatever  has  been  done  to  and  with  the  resources  is  documented  and  available  at  any  time.  The

application also includes a print function in the electronic resource book.

Selection criteria

The application provides the following selection criteria:

Resource type

This selection criterion refers to the resource type. You can also use wildcards (placeholders *).

Date from / to

Use the date selection to restrict the period of time for the data you want to evaluate.

Both times respectively refer to the start or end of the period specified above.

WRM-IHA_82.docx

Version: 1.0.23133

Page 13 of 54

Tool and Resource Monitoring

Resource

This selection criterion refers to the resource number. You can also use wildcards (placeholders *).

Events

Use  this  selection  criterion  to  select  specific  events.  The  events  you  can  select  depend  on  the

product groups you have licensed and the events that are actually recorded.

Workplace

Enter  a  workplace  to  select  the  events  that  have  been  posted  in  relation  to  this  workplace.  This

mainly affects the following events:

  Machine status

  Beginning of status / end of status

  Production lock

  Operation postings

  Personnel postings

  Target value changes

  Resource postings

  BDE comments

  DNC upload/ download

Family

This selection criterion refers to the resource family the resource is assigned to.

Status

This  selection  criterion  refers  to  the  status  of  the  resource.  The  system  selects  the  events  of  the

following types for which this resource status was set in the period entered:

- Resource status

- Release of resources

- Maintenance cycle exceeded

- Maintenance reset

- DNC upload

- DNC download

Cost center (workplace)

This  selection  criterion  refers  to  the  cost  center  stored  in  the  machine  and/or  workplace  master

data. The application shows all machines and/or workplaces assigned to the selected cost center.

You can also use wildcards.

WRM-IHA_82.docx

Version: 1.0.23133

Page 14 of 54

Tool and Resource Monitoring

Designation (name)

This  selection  criterion  refers  to  the  resource  name  as  defined  in  the  workplace/resource

configuration.

Cost center (resource)

This  selection  criterion  refers

to

the  cost  center  of

the  resource  as  defined

in

the

workplace/resource configuration.

Article

This  selection  criterion  refers  to  the  article  number  of  the  operation  that  was  recorded  with  the

event.

The system logs the operation with the following events:

  Logging on/off, interrupting operations (for resources of the type MNR)

  Logging on/off staff (for resources of the type MNR)

  BDE comments (for resources of the type MNR)

  Changing the target cycle (for resources of the type MNR)

  Changing the partitioning (for resources of the type MNR)

  Logging on/off resources (for resources of the type <> MNR)

MES order number

This selection criterion refers to the MES order number of the operation that was recorded with the

event.

Order

This selection criterion refers to the order number of the operation that was recorded with the event.

Reporting person

This selection criterion refers to the personnel number of the employee who carried out the posting

that initiated the event.

The system logs the person for the following events, if the person was entered with the posting:

  Logging on/off, interrupting operations (for resources of the type MNR)

  Logging on/off staff (for resources of the type MNR)

  BDE comments (for resources of the type MNR)

  Changing the workplace/machine status (for resources of the type MNR)

  Changing the target cycle (for resources of the type MNR)

  Changing the partitioning (for resources of the type MNR)

  Logging on/off resources (for resources of the type <> MNR)

WRM-IHA_82.docx

Version: 1.0.23133

Page 15 of 54

Tool and Resource Monitoring

Field descriptions

Subject to the logged events, the system only populates specific fields.

The  "Duration"  field,  for  example,  is  populated  in  case  of  a machine  status  change.  But  if  the

resource status changes, the system enters the value zero.

The fields are classified into the areas:

Event

Includes information on the event.

Resource

Provides information on the currently selected resources. The event usually refers to the resource

mentioned in the subsection "Resource master data".

If an event only refers to a machine, the relevant machine data is entered in the "Resource

master data" section and in the "Workplace master data" section.

If a DNC resource is either uploaded or downloaded, the DNC resource is entered in the

"Resource master data" section. The "workplace master data" section shows the machine

from which data was uploaded or downloaded.

If a resource is changed (e.g. a resource is logged on/off via a terminal), the resource is

entered  in  the  "Resource  master  data"  section.  The  "Workplace  master  data"  section

includes the relevant machine.

Person

Information about the person or user performing the posting.

If you reset a maintenance activity via a terminal, the application also shows the terminal

user number in the "Modified by" field. If you reset a maintenance via the MOC, the field

includes the user (MOC user).

The other columns depend on the event.

Resource status

Information on the set resource status of the status event.

Order

Information  on  the  operation  that  was  currently  processed  at  the  time  of  the  event  (event

timestamp)

WRM-IHA_82.docx

Version: 1.0.23133

Page 16 of 54

Tool and Resource Monitoring

Maintenance

Information on the maintenance event.

Measure

Information on the measure event

Upload/ download

Information on the DNC event upload and/or download.

Note:  Two  events  are  documented  with  the  upload,  as  the  upload  is  processed  in  two  stages.

Dialog  ID  “N”:  upload  has  started.  “F”:  file  has  been  saved  in  the  target  folder.  The  system  only

makes one entry for downloads. Only the file transfer is documented as a relevant event.

Toolbar

Resource overview

You can directly open the application "resource overview" by clicking the icon.

 Generate order (reshigenorder)

Use  the  "generate  order"  function  to  create  orders  from  work  plans  based  on  the  specified

configuration.

 Document management (reshidoc)

This button is only enabled if you select a "Maintenance reset" event. The Document management

opens.

 Set the measure to "measure completed" (resmeasfin)

Use this function to identify an unfinished measure as being "completed". Once you have requested

the function, a prompt pops up where you have to confirm your input. Once you have confirmed the

dialog,  the  system  sets  the  measure  to  "done"  (column  "done"/"settled":

)  and  documents  the

user (column "done by").

 Resource book (reshi.book)

The resource book is a report providing the information of the resource history in a formatted form.

The aim of this function is to make data printable. This way, the data is also available as hard copy,

e.g.  for  QA  documentation  purposes.  You  may  choose  to  have  the  data  grouped  by  day  for  the

daily report or by week for the weekly report.

WRM-IHA_82.docx

Version: 1.0.23133

Page 17 of 54

The cover sheet shows master data information of the displayed and selected resources.

The presentation varies depending on the event.

Tool and Resource Monitoring

WRM-IHA_82.docx

Version: 1.0.23133

Page 18 of 54

Tool and Resource Monitoring

4  Machine history

Overview

Menu

Production facility/Resource management  Resource analysis  Machine
history

Transaction code

wphi

Function authorization  wphi

Purpose

The machine history is a report for the production management. The  application allows for tracking and

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

WRM-IHA_82.docx

Version: 1.0.23133

Page 19 of 54

Tool and Resource Monitoring

Cost center

This  selection  criterion  refers  to  the  cost  center  stored  in  the  machine  and/or  workplace  master

data. The application shows all machines and/or workplaces assigned to the selected cost center.

You can also use wildcards.

Company

This selection criterion refers to the company defined in the machine or workplace master data. The

application  shows  all  workplaces/machines  assigned  to  the  selected  company.  You  can  also  use

wildcards.

Report group

This selection criterion refers to the report groups. The application  shows all workplaces/machines

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

WRM-IHA_82.docx

Version: 1.0.23133

Page 20 of 54

Tool and Resource Monitoring

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

Please  note:  Posting  of  events  depends  on  the  customer's  system  and  its  use.  Consequently,  it

might be the case that not all events listed here are relevant.

Date from …to (shift/ time)

Use the date selection to restrict the period of time for the data you want to evaluate.

When selections are made using shift(s), the shift date is evaluated. If no shift is selected, all shifts

are used.

WRM-IHA_82.docx

Version: 1.0.23133

Page 21 of 54

Tool and Resource Monitoring

Note  that  selection  by  shift  is  not  supported  for  all  event  types.  You  can  find  detailed

information on the shift selection here.

If you select by time, the selection is based on the start  date. Both times refer to the beginning or

end of the date period specified above.

You can only evaluate Group workplaces if you select by Time. If you select by Shift, no

data will be displayed because group workplaces do not refer to shifts.

Order / Article / MES order number

You can use these criteria to search for BDE postings:

  Log on OP, interrupt OP, log off OP, enter part quantities

  Log on staff, log off staff

  Change partitioning, change target cycle

  BDE comment

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

WRM-IHA_82.docx

Version: 1.0.23133

Page 22 of 54

Tool and Resource Monitoring

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

Machine status

Machine  status  according
configuration
Coloring is set according to the
settings in the status text

to

Selection by
shift

Selection by
time

Yes

Yes

WRM-IHA_82.docx

Version: 1.0.23133

Page 23 of 54

Tool and Resource Monitoring

Event type

Event

Selection by
shift

Selection by
time

Production lock

Operation postings

Personnel postings

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

Comment

Comment on the machine as defined in the workplace configuration.

Group

Capacity group which the machine was assigned to.

WRM-IHA_82.docx

Version: 1.0.23133

Page 24 of 54

Tool and Resource Monitoring

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

First name

The person’s first name who was logged on or off (for personnel postings only).

Name

Full  name  (last  name,  middle  name  and  first  name)  of  the  person  who  was  logged  on  or  off  (for

personnel postings only).

WRM-IHA_82.docx

Version: 1.0.23133

Page 25 of 54

Tool and Resource Monitoring

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

Next date

For maintenance type Z only: time when the maintenance falls due the next time.

Processing mode

For maintenance events (RES_WART):

R = Reset

Z = Threshold exceeded

WRM-IHA_82.docx

Version: 1.0.23133

Page 26 of 54

Tool and Resource Monitoring

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

Verantwortlicher

Person who has to carry out the measure.

Date of solution

Date when the measure has to be completed.

Priority

Priority of the measure.

WRM-IHA_82.docx

Version: 1.0.23133

Page 27 of 54

Tool and Resource Monitoring

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

 Order information (function authorization: orin)

Request  Order information.

WRM-IHA_82.docx

Version: 1.0.23133

Page 28 of 54

Tool and Resource Monitoring

5  Maintenance Calendar (Activity Calendar)

Overview

Menu

Resource Management  Current information  Maintenance calendar

Transaction code

rmcal

Function authorization

rmcal

This overview is a valuable aid for supervisors and maintenance personnel because only through regular

maintenance,  the  expensive  resources  (e.g.  production  machines  or  tools)  can  retain  their  production

quality  and  do  not  cause  unnecessary  breakdowns.  You  can  also  use  the  calendar  as  basis  for

maintenance planning and as data collection tool to record the activities performed.

WRM-IHA_82.docx

Version: 1.0.23133

Page 29 of 54

Tool and Resource Monitoring

Purpose

The  maintenance  calendar  or  activity  calendar  has  been  designed  to  plan  and  show  maintenance

activities or other recurring activities. Activities can be maintenance, test equipment calibration, reading of

energy counters and so on.  Use the field Activity type to identify the relevant function and type of activity.

In most cases, this field remains empty which means that a maintenance or similar activity is scheduled

for a resource. For special requirements, e.g. calibration of test equipment, enter the relevant identifier in

this field ("K" to identify calibration of test equipment). That means, the user can differentiate between the

type of activity.

This  document  describes  how  to  use  the  calendar  in  the  HYDRA  Tool  and  Resource  Management,

Energy Management and Gage Calibration.

The  task  of  maintenance  and  activity  monitoring  is  to  track  the  configured  activities  and  perform  the

following actions:

Refreshing the current values

- "Cycles recorded so far" (cycle-based maintenance/activity) or

- "Hours recorded so far" (maintenance/activity via hours of operation).

The status of an activity is set when a configured threshold value (blue/yellow/red) has been exceeded,

and  this  event  is  documented  in  the  database  (to  generate  evaluations  via  the  resource  history).  The

threshold values are checked in the following order: red > yellow > blue. This means, the system checks

first if the threshold value "red" has been exceeded. If so, this status is set and documented. Otherwise,

the inspection is continued for the threshold values "yellow" and then "blue".

Monitoring is only run for activities that are marked active and whose validity period includes the current

time.

For  this  purpose,  the  monitoring  process  hywtkupd.out/.exe  is  embedded  in  the  HYDRA  scheduler  and

cyclically called. .

You can define any number of activities for each resource. Several activities can thereby be defined for

each resource. The following types of intervals are available when defining the maintenance times:

Cycle-based activity

The system compares target and actual cycles with a cycle-based activity. The difference between

the two values indicates when maintenance is due. The actual cycles are automatically recorded in

HYDRA.

Requirement: a cycle monitoring must be performed for the machine.

WRM-IHA_82.docx

Version: 1.0.23133

Page 30 of 54

Tool and Resource Monitoring

Activity based on hours of operation

The times recorded in HYDRA are used for a maintenance/activity based on hours of operation. In

the Resource type,  you specify the resource performance accounts that are used to calculate the

hours of operation. The activity  is due  when the interval defined in the maintenance calendar has

been reached.

Time-based activity (days)

With this type of activity, the system calculates the next maintenance due date using the number of

days specified for this activity. This number of days is based on the Gregorian calendar.

Single activity

Combined  with  the  above-mentioned  types  of  intervals,  you  can  even  specify  an  activity  as  "non-

recurring". After the reset, the activity is deactivated automatically.

Additional notes:

When  data  is  selected,  the  user  can  only  view  the  activities  of  resources  that  are  included  in  the

responsibility area the user is authorized for.

You  must  have  defined  the  resource  master  data  in  the  resource  stock,  which  is  required  for  the

maintenance calendar.

To  use  resources  with  cycle-based  activities  and  maintenances  based  on  hours  of  operation,  it

must be configured in the system that you can post to these resources. This can be configured via

the resource type.

For  resources  with  DNC  processing,  no  cycle-based  activities  and  no  activities  based  on  hours  of

operation can be defined, as you cannot post data for these resources.

And also for energy counters this is not possible, as energy counters do not use machine cycles as data

basis.

Selection criteria

The application provides the following selection criteria:

Resource type

Selection of the specified resource type.

Resource

Selection of the specified resource.

Field description of the Activity tab

Resource type

Shows the resource type for the defined the activity.

WRM-IHA_82.docx

Version: 1.0.23133

Page 31 of 54

Tool and Resource Monitoring

To  use  resources  with  cycle-based  activities  and  maintenances  based  on  hours  of  operation,  it

must be configured in the system that you can post to these resources. This can be configured via

the resource type.

For resource types with DNC processing, no cycle-based maintenance and no maintenance based

on hours of operation can be defined, as you cannot post data for these resources.

Resource

Shows the resource the activity is defined for.

Activity

Description  of  the  activity.  When  you  create  an  activity,  the  system  automatically  allocates  a

number to the name and this number identifies the activity.

Type

Select a type to specify how monitoring is carried out:

T
B
Z
Depending on the above selection, one of the tabs Cycles, Hours or Days is released.

Cycle-based activity
Activity based on hours of operation
Time-based activity

Single activity

If this option  is set, the activity is only carried  out  once. In this case, the "interval" field  is hidden.

When reset, the activity is automatically deactivated.

Class

This input field is used to classify maintenance activities. For example, all cleaning activities can be

classified as "Cleaning".

Using the grouping function in the overview screen, you can combine and display all maintenance

activities that logically belong to the same class. Otherwise, this entry field is used for comments.

Active

It  is  possible  to  deactivate  activities  temporarily,  and  reactivate  them  again  at  a  later  time.  The

following display shows if an activity is currently active or not:

Activity activated
Activity deactivated

Deactivated activities are not integrated in the monitoring.

Authorization (as of service pack 16/2020)

You can use the authorization level to specify the maintenances in detail that a person is allowed to

reset on the Windows terminal AIP.

WRM-IHA_82.docx

Version: 1.0.23133

Page 32 of 54

Tool and Resource Monitoring

A person can reset a maintenance if the following conditions are fulfilled:

- The option (checkbox) Reset maintenances in the HR master data is activated;

- An authorization level is entered in the HR master data;

-  The  authorization  level  of  the  person  must  be  greater  than  or  equal  to  the  authorization  level

specified in field Authorization of the maintenance.

 The system performs an online validation check on the HYDRA server. The system only performs

the authorization check if a staff badge number has been entered in the AIP input dialog.

If  no  authorization  level  is  specified,  then  the  maintenance  can  always  be  reset  and  the

authorization level stored in the HR master data is not relevant (downward compatibility).

Status

A colored signal in front of each activity clearly shows if a maintenance interval will soon expire or

has already expired, and if a maintenance activity must be carried out. This way, the user can see

at one glance which activity must be carried out or is already overdue.

The user specifies threshold values, which change the color of the signal. For cycle-based activities

and maintenances based on hours of operation, the application shows percentages, for time-based

activities  days  are  shown.  The  following  4  colors  can  be  defined  (each  corresponding  to  a  status

type):

green

blue

 yellow

 red

For further information, please refer to the descriptions of the different interval types (see below).

Note:

The status of the resource itself does not change when a maintenance status is reached.

Last activity

This shows  the time  when  the maintenance activity  was last reset and  the name of the  user  who

reset the maintenance.

Please  note  that  the  time  of  resetting  the  maintenance  may  deviate  from  the  time  that  the

maintenance has actually been carried out.

Valid from, valid until

You specify these times to assign time limits to maintenance activities.

If the current point in time is not included in the validity period of a maintenance activity, then this

maintenance  is  not  integrated  in  the  maintenance  monitoring,  i.e.  the  maintenance  status  is  not

updated.

Modified by

Name of the last user who edited the maintenance activity and time of the last change.

WRM-IHA_82.docx

Version: 1.0.23133

Page 33 of 54

Tool and Resource Monitoring

The different tabs are explained in the following:

Field descriptions of the Cycles sub-tab

Interval

After  the  number  of  machine  cycles  specified  in  this  field,  the  maintenance  must  be  carried  out.

This number and the two values below refer to the value in the Reference field (see below).

This field is hidden if it is a singular/non-recurring maintenance.

Cycles recorded so far

Here, the system displays the number of machine cycles recorded so far in HYDRA. This value is

updated by a cyclical process. For further information, refer to the section Maintenance monitoring.

Next activity

If  you create a new  activity, then this value is calculated by  default using the current actual value

(actual cycles) + the specified interval.

When  you  reset  the  maintenance  activity,  the  system  calculates  this  value  and  shows  when  the

next activity is due.

When  an  activity  is  reset,  you  can  use  the  Calculation  base  option  to  specify  how  the  next

maintenance due date is calculated:

Target value  The value for the next activity is based on the current value:

Next activity after = current value (next activity after) plus interval

Actual value  The value for the next activity is based on the number of previously recorded cycles:

Next activity after = cycles recorded so far + interval

Reference

For the above values, you must always consider this option. The following values are possible:

G

A

Total
Activity monitoring is based on the total number of cycles recorded so far.

Relating to order/OP
If  a  resource  is  logged  on  with  the  operation  logon,  then  it  is  checked  if  activities  with

reference = A exist for this resource. These activities are then automatically reset.

The monitoring now checks whether the interval  has  been reached  using cycles posted for

the operation currently logged on and sets the status accordingly.

Order-related monitoring is not available for resources of the type "MNR“ (machines)!!

This type of maintenance monitoring only makes sense for resources that are logged on to

one operation at a given time. This means that a maximum of one operation may be logged

WRM-IHA_82.docx

Version: 1.0.23133

Page 34 of 54

Tool and Resource Monitoring

on to the workstation/machine.

The posting of cycles to a resource does not take place in real time, but at longer intervals

(e.g.  at  logoff,  at  interruption  of  an  operation  or  during  an  automatic  change  of  shifts).

Therefore, this type of monitoring only makes sense for operations with a long runtime.

Blue / Yellow / Red

Enter the threshold values as percentages that identify the status of a maintenance activity.

"Cycles recorded so far" < Blue-% from "Next maintenance after"

"Cycles recorded so far" >= Blue-% and < Yellow-% from "Next maintenance after"

"Cycles recorded so far" >= Yellow-% and < Red-% from "Next maintenance after"

"Cycles recorded so far" =  Red-% from "Next maintenance after"

The relevant values specify the signal color.

green

blue

 yellow

 red

Notes

The threshold values can be greater than 100%.

No validation check is made with regard to the order of the threshold values.

Field descriptions of the Hours sub-tab

Interval

Enter the period of time after which the maintenance activity must be run. This value, and the two

following values, refer to the value in the Reference field (see below).

This field is hidden if this is a single activity.

Hours recorded so far

Here, HYDRA displays the time that has been posted for this resource so far. This value is updated

by a cyclical process.

Please note that for the hours recorded so far, the RPA times are used that are identified as such in

the Resource type (option RPAs as hours of operation in the Maintenance calendar).

Next activity after

This  value  is  calculated  by  default  from  the  current  actual  value  (hours  recorded  so  far)  plus  the

specified interval.

When the activity is reset, this value is calculated and shows when the next maintenance activity is

due.

When a maintenance activity is reset, you can specify how the next activity is to be calculated using

the "Calculation base" option:

Target value  The value for the next activity is based on the current value:

Next activity after = current value (next activity after) plus interval

WRM-IHA_82.docx

Version: 1.0.23133

Page 35 of 54

Tool and Resource Monitoring

Actual value  The value for the next activity is based on the number of hours recorded so far:

Next activity after = hours recorded so far + interval

Reference

For the above values, you must always consider this option. The following values are possible:

G

A

Total
Activity monitoring is based on the total time that has been posted so far.

Relating to order/OP
If  a  resource  is  logged  on  with  the  operation  logon,  then  it  is  checked  if  activities  with

reference = A exist for this resource. These activities are then automatically reset.

On  the  basis  of  the  duration  posted  for  the  currently  logged  on  operation,  monitoring  now

checks whether the interval has been reached, and then sets the status accordingly.

This type of maintenance monitoring only makes sense for resources that are  logged on to

one operation at a given time. This means that a maximum of one operation may be logged

on to the workstation/machine.

The posting of cycles to a resource does not take place in real time, but at longer intervals

(e.g.  at  logoff,  at  interruption  of  an  operation  or  during  an  automatic  change  of  shifts).

Therefore, this type of monitoring only makes sense for operations with a long runtime.

Blue / Yellow / Red

Enter the threshold values as percentages that identify the status of a maintenance activity.

"Hours recorded so far" < Blue-% from "Next activity after"

"Hours recorded so far" >= Blue-% and < Yellow-% from "Next activity after"

"Hours recorded so far" >= Yellow-% and < Red-% from "Next activity after"

"Hours recorded so far" >= Red-% from "Next activity after"

The relevant values specify the signal color.

green

blue

 yellow

 red

The threshold values can be greater than 100%.

No validation check is made with regard to the order of the threshold values.

Field descriptions of the sub-tab Days

Interval

Interval  in  days  after which an activity is to  be  performed. The interval is based on the Gregorian

calendar.

This field is hidden if this is a single activity.

Next activity on

Date when the next activity is due.

WRM-IHA_82.docx

Version: 1.0.23133

Page 36 of 54

Tool and Resource Monitoring

When a new maintenance is created, this value is calculated by default from the current date plus

the specified interval.

Blue / Yellow / Red

Enter the number of days that specifies the status of a maintenance activity. The color of the signal

is  based  on  the  remaining  time,  i.e.  the  difference  between  the  date  of  the  next  activity  and  the

current date ("today").

Remaining time <= "Red" value

Remaining time <= "Yellow" value

Remaining time <= "Blue" value

Other

 red

 yellow

blue

green

The threshold values can be greater than 100%.

No validation check is made with regard to the order of the threshold values.

Field description of the Assignment tab

Order

This field is only relevant in connection with the additional feature Generate maintenance orders or

if you generate calibration (inspection) orders. Assign a maintenance order/calibration order using

the "Create order" function that you call with this button

.

If this field is filled, then the order number refers to a maintenance/calibration order. The activity will

automatically  be

reset

if

the  maintenance/calibration  order

is

finished.  When

the

maintenance/calibration  order  is  finished  for  this  activity,  the  order  number  is  also  removed  from

this input field.

Project number

This field is only relevant with activity type "K" (calibration). Depending on the system configuration,

two different variants exist.

Variant 1 (there is exactly one work plan for all calibration inspection plans):

=> Input of the calibration inspection plan number (without version number)

Variant 2 (there is a separate work plan for each calibration inspection plan)

=> should remain empty. If you fill the field, the work plan list called in the application Generation of

orders is pre-filtered by this project number.

Planned order

Control field that is currently not used. Remains empty.

Cost object

Control field that is currently not used. Remains empty.

WRM-IHA_82.docx

Version: 1.0.23133

Page 37 of 54

Tool and Resource Monitoring

Activity type

Identifies the activity type: For example, calibrations are identified by the type K.

Field descriptions of the Information tab

You can store a short description of the maintenance activity to ensure that the user or the maintenance

worker receive more details on running the activity (e.g. notes on regulations to be observed, materials to

be used).

Field descriptions of the Resource information tab

Inventory number

Shows  the  inventory  number  stored  in  the  resource  configuration.  Additional  information  in  form

of comments.

Engraving number

Shows  the  engraving  number  on  the  device  (machine,  radiator  etc.)  stored  in  the  resource

configuration. Additional information in form of comments.

Drawing number

Shows  the  drawing  number  stored  in  the  resource  configuration.  Additional  information  in  form

of comments.

Manufacturer

Shows  the  drawing  number  stored  in  the  resource  configuration.  Additional  information  in  form

of comments.

Owner

Shows  the  owner  name  stored  in  the  resource  configuration.  Additional  information  in  form

of comments.

Toolbar

  Activate

Function authorization: rmcal.active

Opens the editing dialog to activate an activity

WRM-IHA_82.docx

Version: 1.0.23133

Page 38 of 54

Tool and Resource Monitoring

  Deactivate

Function authorization: rmcal.deactive

Opens the editing dialog to deactivate an active activity

  Monitoring

Function authorization: rmcal.monitor

Updates the status of the activities

  Reset

Function authorization: rmcal.reset

Opens an editing dialog to reset an activity

  Capture reading (EMG 8.1 only)

Function authorization: rmcal.captvalues

Opens  the  editing  dialog  to  enter  a  counter  reading.  Any  number  of  difference  values  may  be

entered within a time interval. Therefore, it is a delta collection.  For this reason, it is also possible

to  subsequently  enter  data  relating  to  the  past.  If  you  do  not  enter  date  values  in  the  fields,  the

system generates the interval using the last data capture as start time and the current posting time

as the end of the interval.

  Enter absolute value (EMG 8.1 only)

Function authorization: rmcal.captvalues

Opens the editing dialog to enter a counter reading using an absolute value. The system calculates

the difference to the previous reading.  It is not possible to enter values for periods in the past. The

system sets the start time of the interval to the end  of the last entry. If an end is not entered, the

system uses the current posting time.

  Generate order

Function authorization: rmcal.generate

Creates  an  order  that  is  used  for  organizational  processing  of  the  activity.  Once  the  order  is

finished, you can set an option to have the activity automatically reset.

As  of  service  pack  13/2018,  you  can  generate  orders  automatically.  Please  find  further  details  in

section "Automatic generation of orders".

WRM-IHA_82.docx

Version: 1.0.23133

Page 39 of 54

Tool and Resource Monitoring

  Activity plan (EMG 8.1 only)

Function authorization: rmcal.timetable

Opens the report Maintenance plan.

 Document management (WRM-WWR 8.2 only)

Function authorization: rmcaldoc

Click this button to call the Document management.

Detail application Resources logged on

For  resources  of  type  "MNR",  the  detail  application  provides  additional  information  on  the  resources

currently logged on.

Resource type, resource

The currently selected resource and its resource type.

Resource, family, resource type

Resource that is logged on, the family and the resource type.

Login

Date and time of the resource login.

Advance logon

Identifier of the advance logon.

Automatic generation of orders

When a threshold value (blue, yellow or red) is reached for an entry in the activity calendar, an associated

order  can  be  generated  automatically.  In  the  INI  configuration,  you  define  the  resource  type  and  the

threshold value to generate the order automatically. If the threshold value is exceeded, then the system

does not generate an order for the exceeded threshold value. If no relevant INI configuration exists, then

the automatic order generation is omitted.

INI configuration

Create the INI configuration with the name „MAINTENANCECALENDAR“ and the MOC user "0".  Create

a new entry in the INI configuration:

Field name

Value

Name

MAINTENANCECALENDAR

Description

Configuration maintenance/activity calendar

WRM-IHA_82.docx

Version: 1.0.23133

Page 40 of 54

Tool and Resource Monitoring

Field name

MOC user

Value

0

Create the required configurations for this INI configuration. For this entry, create an entry including the

following values in the INI data configuration:

Field name

Value

Note

Section

Key

Value

Active

<Resource type>

<threshold value>

 Yes

e.g. PRM (for test equipment)

Threshold value blue: 1
Threshold value yellow: 2
Threshold value read: 3

Leave field empty

The below screenshot outlines a configuration to generate a calibration order for the resource type "PRM"

(test equipment) when the threshold value 2 "yellow" is reached.

Order generation

For automatic order generation it is assumed that for each resource type defined in the INI configuration

in  the  MOC  application  (transaction  code  "edworgen"  -  separate  licensing  required)  a  corresponding

configuration with matching object and assigned work plan is defined.

For automatic order generation it is assumed that for each resource type defined in the INI configuration

in  the  MOC  application  „

“(transaction  code  "edworgen"  -  separate  licensing  required)  a

corresponding configuration with matching object and assigned work plan is defined.

..\..\functions\MOC\MOC_OrderAutomaticGeneration.pdf

Scheduler job

Another  requirement  is  that  the  scheduler  job  hywtkupd.scr  is  active  that  is  responsible  for  the

maintenance status.

WRM-IHA_82.docx

Version: 1.0.23133

Page 41 of 54

Tool and Resource Monitoring

Create calibration order

To create a calibration order, the system also requires that the calibration inspection plan is stored in the

field Project number of the activity calendar.

The  program,  which  is  called  by  the  scheduler  job,  only  generates  an  order  if  a  configured

threshold is actually exceeded. If a threshold has already been exceeded and the scheduler job

is started again, then the program does not generate an order for this threshold.

The program also does not generate an order if the threshold 2 is configured, for example, and it

is now changed from threshold 1 directly to threshold 3 because of the actual data.

Report Maintenance plan (EMG 8.1 only)

The report Maintenance plan shows all maintenance activities that are displayed in the calling application

Activity calendar.

The maintenance activities are displayed in the following sequence:

  descending, sorted by state

  ascending, sorted by priority

The following data is displayed for each maintenance activity in the maintenance plan:

Left-hand column

  State (0: green, 1 blue, 2 yellow, 3 red)

  Maintenance type

WRM-IHA_82.docx

Version: 1.0.23133

Page 42 of 54

Tool and Resource Monitoring

  Description

  Resource type

  Resource

Central column

  Next maintenance after (cycles)

  Cycles recorded so far

  Next maintenance after (hours)

  Hours recorded so far

  Next maintenance on

Right-hand column



Information

WRM-IHA_82.docx

Version: 1.0.23133

Page 43 of 54

Tool and Resource Monitoring

6  Production Variants

Overview

Menu

Master data  Production control  Production variants

Transaction code

prodvar

Function authorization

prodvar

Purpose

You can use the function to create or modify production variants in the system.

Integration

You  can  use  production  variants  to  define  different  options  for  specific  articles.  The  system  integrates

these  options  during  planning  in  HYDRA  Shop  Floor  Scheduling  (HLS).  You  can  define  different

production  variants for one article/item. An alternative production variant must exist for the article, if the

order  type  specifies  that  production  variants  are  used  for  planning.  Otherwise,  you  cannot  plan  the

operation for the machine.

If  you  do  not  want  to  use  production  variants  for  all  areas,  they  can  be  "skipped"  for  single  groups.

Consequently, the Group configuration takes priority over the order type configuration.

An exceptional case occurs if "N" - no utilization" is configured for the order type. In this case, production

variants  are  generally  not  used for this order type. The  group configuration  does not  have any  effect in

this case.

Selection criteria

The application provides the following selection criteria:

Article

The system searches for production variants available for the entered article/item.

Workplace

Number of the workplace / machine where you can manufacture the article with the resource.

Workplace group

Number of the capacity group where you can manufacture the article.

Resource

Resource (number) you can use to manufacture an article as part of a production variant.

WRM-IHA_82.docx

Version: 1.0.23133

Page 44 of 54

Tool and Resource Monitoring

If you want to include a resource (e.g. tool) in checking for valid production variants and in planning,

you  should  specify  the  resource  here,  otherwise  leave  the  field  empty.  You  cannot  define  a

production variant at the same time for both a resource and a resource family.

Resource family

The system does not support this field when identifying production variants. You can merely use it

for comments.

Status (blocked/released)

Possible values describing the current status of a production variant.

Only  one version  at a time may have  a status  value  of  Released per  production variant.  You can

use this field to filter by released or blocked production variants.

Detail application "production variants"

The table view of the detail application offers an overview of existing entries.

Field description

Article

Article number of the article to be manufactured.

The article number length is restricted to 15 characters if HYDRA ALS (interfacing to the ARBURG

host computer system) is used.

Article designation/name

Name of the article.

Group

Number of the workplace group where the article can be manufactured with the tool.

Complete  this  field  in  any  case,  even  if  the  production  variant  should  only  be  based  on  the

combination of Article and Workplace.

Workplace

Number of the workplace / machine where you can manufacture the article with the resource.

Leave this field empty, if the production variant should only be based on the combination of  Article

and Group.

Resource type

Type  of  the  resource  you  can  use  to  manufacture  an  article  as  part  of  a  production  variant.  The

system only supports the resource type "WNR".

WRM-IHA_82.docx

Version: 1.0.23133

Page 45 of 54

Tool and Resource Monitoring

Resource

Resource (number) you can use to manufacture an article as part of a production variant.

If you want to include a resource (e.g. tool) in checking for valid production variants and in planning,

you  should  specify  the  resource  here,  otherwise  leave  the  field  empty.  You  cannot  define  a

production variant at the same time for both a resource and a resource family.

This  is  a  key  field  if  the  interfacing  to  the  ARBURG  host  computer  system  (ALS)  is  used.  The

resource number length (tool number) is restricted to 15 characters in this case.

Resource family

The system does not support this field when identifying production variants. You can merely use it

for comments.

Please observe the following restrictions:



If  you  create  a  new  production  variant  and  assign  a  resource,  the  resource  family  is  not

automatically taken from the pool of resources.

  The system does not check whether the resource family is valid. In case of doubt, you can

select the resource family via the search dialog.



If  you  change  a  resource  family  for  a  resource  in  the  pool  of  resources,  the  system  does

not synchronize this with the production variant.

Number of resources

The number of resources required for the production variant.

Machine/operator relation for setup/production including qualifications

Define  the  personnel  requirements  that  are  needed  for  setting  up  or  producing  the  operation

including the relevant qualification.

You  cannot  use  a  production  variant  to  reset  (set  to  zero)  the  workforce  requirements  previously

defined for the OP.

You can define the machine/operator relation for production variants as of SP13 and

HLS-FFV  8.2.  Existing  customers  who  want  to  use  the  fields  must  execute  the

database patch provided by SP13.

Priority

Priority for identifying the production variant. A higher value stands for a higher priority.

Version

You can use this field (as part of the key) to assign version numbers to production variants. Enter

"1" at the very left of the field if versioning is not used.

Only one version of a production variant at a time may have the "released" status (cf.  Status field

description).

WRM-IHA_82.docx

Version: 1.0.23133

Page 46 of 54

Tool and Resource Monitoring

Target cycle

Target cycle for machine monitoring in MDE. This value is defined per 1000 machine cycles.

The system keeps the target cycle defined for the operation, if you enter 0 in the "target cycle" field.

Admissible deviation

Reserved.

Partitioning

Number of the quantity  produced during one machine cycle. For  each machine  cycle,  the system

enters/posts a quantity produced that corresponds to the partitioning value.

The system keeps the partitioning defined for the operation, if you enter 0 in the "partitioning" field.

Setup time

When planning in HYDRA Shop Floor Scheduling, the system uses this value instead of the default

setup time value defined for the operation.

Please  note:  If  setup  time  is  stored  as  a  formula  for  the  operation,  the  setup  time  value  is

recalculated  each  time  you  change  the  group  manually  or  you  update  the  order.  In  this  way,  the

setup time value entered here can be overwritten again.

Teardown/retooling time

When planning in HYDRA Shop Floor Scheduling, the system uses this value instead of the default

teardown/retooling time value defined for the operation.

Please  note:

If  retooling/teardown

time

is  stored  as  a

formula

for

the  operation,

the

retooling/teardown  time  value  is  recalculated  each  time  you  change  the  group  manually  or  you

update  the  order.  In  this  way,  the  retooling/teardown  time  value  entered  here  can  be  overwritten

again.

Valid from

Date from which the production variant is valid.

Valid until

Date  up  to  which  the  production  variant  is  valid.  Enter  31.12.9999  here  if  the  production  variant

should be valid until further notice. The system does not update the "valid until" date if the status is

changed.

Status

Possible values describing the current status of a production variant:

F

S

Released

Blocked

WRM-IHA_82.docx

Version: 1.0.23133

Page 47 of 54

Tool and Resource Monitoring

Only  one  version  at  a  time  may  have  a  status  value  of  Released  per  production  variant.  If  you

create a new production variant with the released status or if you change the status of an existing

variant to released, HYDRA checks whether an existing production variant has already the released

status. If so, the existing version is automatically set to the blocked status.

Blocking reason

You can enter a numeric blocking reason here if a production variant is set to the "blocked" status.

Comment

Comment field for this production variant.

Toolbar

 Generate order

Use  the  "generate  order"  function  to  create  orders  from  work  plans  based  on  the  specified

configuration.

Activation of production variants

You  can  configure  in  the  order  type  if  you  want  to  use  production  variants.  Select  the  order  type  and

modify the entry for "consideration of production variants in planning".

Consideration of production variants in planning:



Identification (E): you can select from existing production variants.

  Checking only (P): the system only checks whether a valid production variant exists.

  No use (N): the system does not check the production variants.

WRM-IHA_82.docx

Version: 1.0.23133

Page 48 of 54

Tool and Resource Monitoring

7  Automatic generation of orders - processing

Overview



Menu

Production
Maintenance calendar  button "Generate order"

facility  (resource)  management    Current

information  

Function authorization

rmcalgenorder

Menu

Production facility (resource) management  Current information
 Resource overview  button "Generate order“

Function authorization

-

Menu

Production facility (resource) management  Resource analysis
 Resource history  button "Generate order“

Function authorization

reshigenorder

Menu

Production facility (resource) management  Resource analysis
 Machine history  button "Generate order“

Function authorization  wphigenorder

Purpose

You can call the function "Generate order" from different MOC applications. Use this function to generate

an order from a work plan.

Integration

You can use one of the following applications to create an order:

  Maintenance calendar

  Resource overview

  Resource history

  Machine history

  Production variants

For this purpose, the toolbar of these applications provides the button

 "Generate order".

WRM-IHA_82.docx

Version: 1.0.23133

Page 49 of 54

Tool and Resource Monitoring

Requirements

You need a license to call the function "generate order".

You also have to configure the following in the MOC:

-  Correct configuration of Number ranges:

o  Object: order number

o  Key: order type

o  Value: 6

o  Type: automatic number assignment

o  Prefix: IH *)

o  Ranging from: 100000 *)

o  Ranging to: 999999 *)

*) Assumption: 8-digit order number length.

-  The work plans used according to the configuration must exist

(By default: work plan IH100000)

Generating orders

Proceed as described below to execute the function "generate order":

  Select a resource / data record.

  Click the function "generate order".

  Enter the data requested in the respective dialog.

Once you have entered and confirmed the data, the system transfers the data entered in the input fields

(including invisible fields) to the service. The order is generated based on the transferred work plan.

Result of order generation

The system generates the order.

If order generation was successful, the application Edit orders opens automatically. The input field Order

includes the new order number and data is requested automatically.

Note:

If the Additional data tab does not include the order number (or the dialog has been customized and the

field is no longer available), you have to configure the automatic number assignment since no target order

number is indicated.

The system issues an error message (e.g. order number is missing) if the order could not be generated.

WRM-IHA_82.docx

Version: 1.0.23133

Page 50 of 54

Tool and Resource Monitoring

Configuration

By default, work plan number "IH100000" (the number of zeros matches the order number length defined

in the basic settings) is predefined for all maintenance orders. The work plan number is configured in the

MOC  application  Order  generation.  If  necessary,  you  can  change  this  number  according  to  your

requirements. To do so, you need the corresponding license.

You can change the work plans, if you have purchased the corresponding license.

Default dialogs

Maintenance calendar

Field

Default assignment

Resource type

Resource type

Resource

Resource

OP name/designation

Description of the activity

Basic start date

Current date

Basic end date

(none)

Order

Work plan number
The  system  takes  the  number  of  the  work  plan  that  should  be
used  to  generate  an  order  from  the  configuration  "Order
generation".
You  have  to  select  a  work  plan  if  the  configuration  does  not
include a work plan.

Final article

Resource

Transfer as production
resources and tools

Resource type = MNR
No default assignment
Resource type <> MNR
Checked  by  default  "“.  In  this  case,  the  resource  is  also
created as production resource and tool.

Resource overview

Like the maintenance calendar, except for the OP name. Here, the OP name is "maintenance order".

Resource history, machine history

Like the maintenance calendar, except for the OP name. Here, the OP name is "maintenance order".

WRM-IHA_82.docx

Version: 1.0.23133

Page 51 of 54

Tool and Resource Monitoring

You  can  use  the  MES  Development  Suite  to  configure  the  default  assignments  in  the  MOC

application  dialogs  where  you  started  the  Generate  order  function.  You  need  a  license  and

training in order to use the MES Development Suite.

WRM-IHA_82.docx

Version: 1.0.23133

Page 52 of 54

Tool and Resource Monitoring

8  Generation of orders (configuration)

Menu

Function authorization

edworgen

Purpose

You  can  call  the  function  "Generate  order"  from  different  applications.  Using  this  function  you  can

generate an order from a work plan.

You use this application to make the required configuration for the workplace assignment.

Integration

In specific applications, you can generate a maintenance order. For these orders, the function "Generate

order" uses the configurations defined here.

Configuration

You must configure the following values to generate the order:

Module

Key/name  of  the  application,  which  calls  the  function.  You  can  call  the  function  "Generate  order"

from the following applications:

- MaintenanceCalendar   Maintenance/Activity calendar

- WorkplaceHistory

 Machine history

- ResourceHistory

 Resource history

- OverviewResources   Resource overview

- ProductionVariants

 Production variants.

Category

Definition  of  the  type  (see  configuration  of  the  field  "type")  that  the  calling  dialog  uses  to  call  the

function  "Generate  order".  The  parameters  of  the  selected  row  in  the  calling  function  specify  the

category.

Examples:

Module (application)

Category

Type

MaintenanceCalendar  maintenance.resource.type

MNRMNR

MaintenanceCalendar  maintenance.resource.type

WNR

MaintenanceCalendar  maintenance.resource.type

DEFAULT

OverviewResources

resource.type

ResourceHistory

resource.type

DEFAULT

DEFAULT

WRM-IHA_82.docx

Version: 1.0.23133

Page 53 of 54

Tool and Resource Monitoring

Module (application)

Category

ProductionVariants

resource.type

Type

DEFAULT

Type

Value for the configured category.

This is the resource type for which you want to provide a work plan. DEFAULT is used, if there is no

specific entry for a resource type.

Work plan

Number of the work plan: The order is generated from the work plan specified here.

Object

Object that  you  want to  call. The name is the internal application  name of the function "Generate

order".

Requirement for the configuration / to call the application

Activate the HYDRA Professional Mode to be able to make configurations.

Configuration procedure / assignment of the work plans

Use the column "Module" to specify the source application that is used to generate the order. The column

"Type" defines the resource type for which the entry is valid. The field "Work plan" specifies the work plan

that should be used.

Example 1:

Module = MaintenanceCalendar

Type = WNR

Work plan = IH100001

 If a maintenance for a resource of resource type WNR is selected in the maintenance calendar and if

you want to generate an order automatically, then the work plan IH100001 is used to generate the order.

WRM-IHA_82.docx

Version: 1.0.23133

Page 54 of 54

