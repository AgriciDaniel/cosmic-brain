Manual

Electronic Tool and Resource
Log
WRM-EWB 8.2

Version 1.0.23049

Last changed on: 02.09.2020

Electronic Tool and Resource Log

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

WRM-EWB_82.docx

Version: 1.0.23049

Page 2 of 10

Electronic Tool and Resource Log

Contents

1  Electronic Tool Log - Overview .................................................................... 4

2  Resource history .......................................................................................... 5

WRM-EWB_82.docx

Version: 1.0.23049

Page 3 of 10

Electronic Tool and Resource Log

1  Electronic Tool Log - Overview

Purpose

In addition to the resource history function, it can also be printed it out using the electronic tool log. The

report generated illustrates the maintenance history of the resources. At the same time, the formatting is

designed so that this printout can be continually expanded.

Integration

The  WRM  WMO  "Tool  and  resource  monitoring"  packet  is  required  as  a  basis  because  the  report  is

integrated into it and the data from this area are necessary.

Features

A reporting function is added to the resource history:

  A reporting function for chronological reports of the events collected for a resource incl. formatting

the data for printing so the information can be filed in the tool/ resource log in hard copy form.

  The evaluation is based on data in the resource history. At the same time, the report supplements

the tabular display function of the resource history in the form of printable reports.

  Printout of resource master data as a coversheet for the tool/ resource log.

  Adjustable filtering criteria (period, type of event) incl. the option to store them

  Scalable reports (by HYDRA customizing)

WRM-EWB_82.docx

Version: 1.0.23049

Seite 4 von 10

Electronic Tool and Resource Log

2  Resource history

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

WRM-EWB_82.docx

Version: 1.0.23049

Seite 5 von 10

Electronic Tool and Resource Log

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

WRM-EWB_82.docx

Version: 1.0.23049

Seite 6 von 10

Electronic Tool and Resource Log

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

WRM-EWB_82.docx

Version: 1.0.23049

Seite 7 von 10

Electronic Tool and Resource Log

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

WRM-EWB_82.docx

Version: 1.0.23049

Seite 8 von 10

Electronic Tool and Resource Log

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

WRM-EWB_82.docx

Version: 1.0.23049

Seite 9 von 10

Electronic Tool and Resource Log

The cover sheet shows master data information of the displayed and selected resources.

The presentation varies depending on the event.

WRM-EWB_82.docx

Version: 1.0.23049

Seite 10 von 10

