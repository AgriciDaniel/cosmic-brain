Manual

Tool and Resource Monitoring
WRM-WMO 8.1

Version 1.0.23049

Last changed on: 02.09.2020

Tool and Resource Monitoring

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

WRM-WMO_81.docx

Version: 1.0.23049

Page 2 of 21

Tool and Resource Monitoring

Contents

1  Resource Monitoring - Overview .................................................................. 4

2  Resource Overview ...................................................................................... 5

3  Resource history ........................................................................................ 13

4  Use of resources ........................................................................................ 19

WRM-WMO_81.docx

Version: 1.0.23049

Page 3 of 21

Tool and Resource Monitoring

1  Resource Monitoring - Overview

Purpose

The tool and resource monitoring packet contains functions for displaying the current state of resources,

that  is  their  status,  their  current  storage  location  or  order  that  is  currently  logged  on.  Furthermore,  the

resource history  and use  of resources functions are  used for reporting purposes to  evaluate  work done

with  and  on  the  resources.  These  evaluations,  therefore,  illustrate  the  maintenance  history  of  the

resources.

Integration

The  entries  in  the  overviews  and  reports  are  not  only  generated  within  resource  management,  but  are

sometimes  created  from  other  MES  partial  functions.  The  order  postings,  for  example,  come  from  the

BDE.

Features

Resource overview with display of the current resource status, the current machine, the current operation

and the locking flag incl. period.

Resource  information  such  as  master  data,  accumulated  time  and  quantity  totals  and  current  status

information are consolidated in a central function. Display of status, location and structural assignments.

Resource history reports: tabular listing of all resource events and uses that have accumulated.

Resource  use  report  (downtimes).  Cumulative  display  of  the  cycles  and  quantities  entered  for  the

resources with the ability to restrict the period and profile pattern for a period of time.

WRM-WMO_81.docx

Version: 1.0.23049

Page 4 of 21

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

WRM-WMO_81.docx

Version: 1.0.23049

Page 5 of 21

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

WRM-WMO_81.docx

Version: 1.0.23049

Page 6 of 21

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

WRM-WMO_81.docx

Version: 1.0.23049

Page 7 of 21

Tool and Resource Monitoring

Actual utilization

Cycles

The total number of cycles that have been recorded for the resource since initialization.

Runtime

The total run time that has been recorded for the resource since initialization.

Yield, scrap

Total of yield or scrap that has been recorded for the resource since initialization  and posted to the

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

WRM-WMO_81.docx

Version: 1.0.23049

Page 8 of 21

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

WRM-WMO_81.docx

Version: 1.0.23049

Page 9 of 21

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

WRM-WMO_81.docx

Version: 1.0.23049

Page 10 of 21

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

WRM-WMO_81.docx

Version: 1.0.23049

Page 11 of 21

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

WRM-WMO_81.docx

Version: 1.0.23049

Page 12 of 21

Tool and Resource Monitoring

3  Resource history

Overview

Menu

Production facility management  Resource analysis  Resource history

Transaction code

reshi

Function authorization

reshi

The "resource history" provides an overview of what happened to a resource in the past. Therefore, you

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

WRM-WMO_81.docx

Version: 1.0.23049

Page 13 of 21

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

WRM-WMO_81.docx

Version: 1.0.23049

Page 14 of 21

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

WRM-WMO_81.docx

Version: 1.0.23049

Page 15 of 21

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

user number in the "Modified by" field. If you reset a maintenance  via the MOC, the field

includes the user (MOC user).

The other columns depend on the event.

Resource status

Information on the set resource status of the status event.

Order

Information  on  the  operation  that  was  currently  processed  at  the  time  of  the  event  (event

timestamp)

WRM-WMO_81.docx

Version: 1.0.23049

Page 16 of 21

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

WRM-WMO_81.docx

Version: 1.0.23049

Page 17 of 21

The cover sheet shows master data information of the displayed and selected resources.

The presentation varies depending on the event.

Tool and Resource Monitoring

WRM-WMO_81.docx

Version: 1.0.23049

Page 18 of 21

Tool and Resource Monitoring

4  Use of resources

Overview

Menu

Production facility management  Resource analysis  Use of resources

Transaction code

Resemp

Function authorization  Resemp

Purpose

Depending  on  the  selection  made,  this  evaluation  displays  the  actual  values  of  resources  to  which

postings  were  made  for  time,  quantities  and  cycles/strokes/shots.  You  can  select  the  time  period  you

want to consider. You may specify the resources you wish to view in the upper part of the selection pane.

The selection is based on the logon time of the posting. The time for data selection may vary depending

on the extent of the selection period.

In addition to resource-related master data, the application provides the following data:

  Cycles/strokes/shots  posted  since  implementation  or  within  a  certain  period  of  time  (depending

on selection)

  Quantity posted since implementation or within a certain period of time (depending on selection)

  Downtimes  times  posted  since  implementation  or  within  a  certain  period  of  time  (depending  on

selection), totaled and divided up according to resource performance accounts (RPAs)

The application also pulls information from postings already transferred into archive tables.

The  evaluation  only  integrates  those  resources  that  are  assigned  to  the  "consider  in

evaluations"  option  in  the  "configuration"  category  of  the  resource  stock.  The  option  "Post  to

resource"  needs  to  be  checked  in  order  for  quantities,  cycles  and  times  to  be  posted  to

resources. Posting takes place when the operation to which the resource is assigned is logged

on.

File-based resources and resources with DNC processing can be neither logged in nor posted.

After  changing  or  adding  data  records,  you  have  to  refresh  the  data  manually  to  view  the

changed/added data (click the "request data button).

Selection criteria

The application provides the following selection criteria:

WRM-WMO_81.docx

Version: 1.0.23049

Page 19 of 21

Tool and Resource Monitoring

Resource

Selected resource.

Resource type

You can filter data by the resource type.

Family

You can filter data by the resource family.

Workplace

Machine where the resource was logged on.

Order

You can filter data by the logged in order.

Article

You can filter data by the article of the logged in order.

Field descriptions

General, master data

Shows the resource master data.

Order, article machine/workplace

Shows order data.

Date

Date of the included postings; including  separate fields for year, month and day. You can use the

fields to group data:

-  Date/time specification

-  Year

-  Month

-  Day

Quantities

Quantity totals of the postings.

RPA

Account totals of the postings.

WRM-WMO_81.docx

Version: 1.0.23049

Page 20 of 21

Tool and Resource Monitoring

Toolbar

Main page tab

  Insert

Opens the dialog for adding data.

  Copy

Opens the dialog for copying data.

  Edit

Opens the dialog for editing data.

 Delete

Deletes the selected entry.

  Authorize

Not relevant at the moment. For later use.

WRM-WMO_81.docx

Version: 1.0.23049

Page 21 of 21

