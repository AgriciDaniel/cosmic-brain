Manual

Quality Management Sub
System to SAP QM
QMS-SQM 8.1

Version 1.0.1374

Last changed on: 19.06.2020

Quality Management Sub System to SAP QM

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

QMS-SQM_81.docx

Version: 1.0.2393

Page 2 of 33

Quality Management Sub System to SAP QM

Contents

1  Quality Management Sub System to SAP QM ............................................ 5

2  Catalogs ....................................................................................................... 6

2.1  Summary ............................................................................................................. 6

2.2  Utilization ............................................................................................................ 6

2.3

Integration ........................................................................................................... 6

2.4  Selection Criteria ................................................................................................. 6

2.5  Field descriptions ................................................................................................ 7

2.6  Editing functions .................................................................................................. 7

2.7

“Catalog” Detail Application ................................................................................. 7

3  Machine Status Change ............................................................................... 8

3.1

1.1 Summary ....................................................................................................... 8

3.2  Utilization ............................................................................................................ 8

3.3  Selection criteria .................................................................................................. 8

3.4  Field descriptions ................................................................................................ 9

3.5  Toolbar ................................................................................................................ 9

4

"QM activity, machine status change" detail application ............................ 10

4.1  Field description ................................................................................................ 10

5  Variable Workplaces .................................................................................. 12

6  Overview .................................................................................................... 15

6.1  Notes to this Document ..................................................................................... 15

7

Inspection Requirements ........................................................................... 16

7.1  Function Calls ................................................................................................... 16

7.2  Application Layout ............................................................................................. 16

7.3  Tool bar ............................................................................................................. 16

7.4  Selection Parameters ........................................................................................ 18

7.5  Master-Detail Grid (MD Grid) ............................................................................. 21

7.6  Detail Application Inspection Requirement ........................................................ 21

7.7  Detail Application Usage Decision ..................................................................... 23

QMS-SQM_81.docx

Version: 1.0.2393

Page 3 of 33

Quality Management Sub System to SAP QM

7.8  Detail Application Inspection Step ..................................................................... 24

7.9  Detail Application Inspection Points ................................................................... 26

7.10  Detail Application Characteristics ...................................................................... 28

7.11  Detail Application Errors .................................................................................... 31

7.12  Detail Applications Control Chart 1 + 2, Histogram, Single Values 1 + 2,

Statistics and Inspection Data ........................................................................... 32

QMS-SQM_81.docx

Version: 1.0.2393

Page 4 of 33

Quality Management Sub System to SAP QM

1  Quality Management Sub System to SAP QM

Purpose

This component is used when inspection planning and possible  evaluation is performed in SAP-QM but

the inspection data are collected in HYDRA.

Implementation Considerations

Use of SAP-QM is required. This function package is useful when you combine the AIP data entry client

for BDE and MDE with the collection of inspection data or SAP inspection batches. This setup provides

for optimal control of appropriate inspections e.g. when reaching a time or piece interval.

Integration

The AIP data entry client is required to enter inspection data. In addition, the collected data can be used

in  the  component  "Evaluations  in  the  QM  Subsystem"  to  generate  graphical  presentations  of  the

measured values.

Features

The central function is the presentation of the inspection batches transferred by SAP through the interface

and the visualization of the inspection data and decisions that HYDRA has collected for these inspection

batches. The inspection requirements (corresponding to SAP inspection batches) and the corresponding

inspection steps can be related to the SAP default values and the quality decisions taken. This includes

the detailed observation of inspection points (if used) and the respective inspection characteristics.

QMS-SQM_81.docx

Version: 1.0.2393

Page 5 of 33

Quality Management Sub System to SAP QM

2  Catalogs

2.1  Summary

Menu

Master data  Quality management  Catalog

Transaction code

cat

Function authorization

cat

2.2  Utilization

The  contents  of  this  application  cannot  be  changed  as  it  includes  catalog  entries  that  are  exclusively

populated  by  SAP-QM  using  the  QM-IDI  interface.  In  addition,  the  usage  decisions  about  inspection

points,  which  are  also  used  for  in-production  insepction  (no  SAP-QM  or  QM  subsystem)  are kept  here.

The  inspection  point  decisions  that  do  not  derive  from  SAP-QM  can  be  changed  by  MPDV  consulting

while the system is customized. This includes the modification of field names as well as the deactivation

of individual entries or the creation of new inspection point decisions.

Examples for SAP-QM catalogs:

  Usage decisions on the inspection point and inspection requirement (inspection batch),

  Defect types,

  Defect locations

An  overview  of  the  selection  lists  that  can  theoretically  be  opened  during  the  inspection  process  is

provided. Consequently, the leading planning system (SAP-QM) determines which catalogs are available

at what position.

2.3

Integration

The  catalog  contents  are  available  in  the  corresponding  inspection  processes  as  selection  lists,  e.g.  to

select an inspection point decision, inspection batch decision to be uploaded to SAP-QM.

2.4  Selection Criteria

The application provides the following selection criteria:

Catalog type

Number of the catalog type

Selected set

QMS-SQM_81.docx

Version: 1.0.2393

Page 6 of 33

Quality Management Sub System to SAP QM

Subgroup of the catalog type

Site

Shows to which site it refers

Code

ID number (alphanumeric)

Code group

Group ID of individual codes

Selection

Checkbox

A  match  code  search  is  available  for  all  fields,  except  for  the  filter  field  “selection”.  As  regards  the

selection,  it  can  be  defined  whether  all  data  records  are  to  be  displayed  or  only  those  with  enabled  or

disabled selection.

2.5  Field descriptions

As no data can be changed, the individual fields are not described in more detail. The single fields can be

found in the application.

2.6  Editing functions

This application does not provide editing, insert and deletion functions.

2.7

“Catalog” Detail Application

As already mentioned, catalog entries can neither be changed nor deleted. They can only be edited using

the interface (e.g. if QM-IDI is used as SAP-QM subsystem) or by MPDV customizing.

Detail data of a catalog entry is only provided in list form and divided among the tabs

  Catalog and

  Administration

The individual fields are not described in detail as data cannot be changed.

QMS-SQM_81.docx

Version: 1.0.2393

Page 7 of 33

Quality Management Sub System to SAP QM

3  Machine Status Change

3.1

1.1  Summary

Menu

Master data  Quality management  QM activity, machine status change

Transaction code

mastqm

Function authorization  mastqm

This application aims at inspection planners, although inspection planning is performed in a higher-level

system (e.g. SAP-QM).

As a prerequisite, the "machine status change" function has to be used at the shop floor terminal of the

subsystem.

3.2  Utilization

This application allows for a definition with respect to workstations to be made specifying which machine

status changes are to trigger inspections.

This  function  is  not  part  of  inspection  planning  of  the  higher-level  system  but  supplements  it  on

subsystem level by automatically generating due inspections when machine statuses change.

3.3  Selection criteria

The application provides the following selection criteria:

Workplace

Direct input (match code) or selection list of the workplace catalog including direct transfer

Source status

Direct input or selection list of the machine status

Target status

Direct input or selection list of the machine status

Active

Active, inactive or all statuses are filtered.

Generate inspection point

QMS-SQM_81.docx

Version: 1.0.2393

Page 8 of 33

Configurations with or without the generation of inspection points or both types are filtered.

Quality Management Sub System to SAP QM

3.4  Field descriptions

Workplace

The workplace for which a configuration has been created is filtered.

Source status

Starts the status assignment list

Target status

Starts the status assignment list

Active

Selects e.g. active entries.

Generate inspection point

Selects the activities, for example, that are supposed to trigger inspections.

3.5  Toolbar

There are no special function buttons.

QMS-SQM_81.docx

Version: 1.0.2393

Page 9 of 33

Quality Management Sub System to SAP QM

4

"QM activity, machine status change" detail application

This  application  is  only  relevant  if  HYDRA  is  used  as  QM  subsystem,  e.g.  in  connection  with  SAP-QM.

Data is only displayed in list view.

This  detail  application  allows  for  configurations  with  respect  to  the  workstation  to  be  made,  specifying

whether a status change of a machine to  which an inspection step is logged on, is to trigger an activity

(due  inspection)  as  regards  the  check  that  is  currently  being  performed,  e.g.  the  generation  of  an

inspection point.

Machine  status  changes  that  are  caused  by  logging  an  operation  on  (DLG=A_AN)  and  by  the  user

changing the status manually (DLG=M_MST) are only considered for the generation of inspection points.

The  corresponding  buttons  of  the  toolbar  allow  for  a  configuration  to  be  created,  changed  or  deleted.

When a new data record is created, the user is supported by the selection lists "workplace" and "status

assignment". Provided that a data record is changed, the flags "active" and "generate inspection point" as

well as the contents of user fields that might be defined can only be changed.

The "position" field uniquely identifies the data record and, therefore, must be unambiguous.

4.1  Field description

Position

Uniquely identifies the data record and, therefore, must be unambiguous.

Workplace

Defines the workplace for which a configuration is to be created.

Source status

Specifies the source status on the basis of which e.g. an inspection point is to be generated after

switching to the machine status "x".

Target status

On the basis of the source status "x", e.g. an inspection point is to be generated after switching to

the machine status that is defined here.

Active

The configuration is enabled.

Generate inspection point

QMS-SQM_81.docx

Version: 1.0.2393

Page 10 of 33

If this option is activated, an inspection point is generated, once the machine status changes.

Quality Management Sub System to SAP QM

QMS-SQM_81.docx

Version: 1.0.2393

Page 11 of 33

Quality Management Sub System to SAP QM

5  Variable Workplaces

Summary

Menu

Master data  Quality management  Variable workplaces

Transaction code

vawo

Function authorization

vawo

Although  inspection  planning  is  performed  in  a  higher-level  system  (e.g.  SAP-QM),  this  application

addresses  the  group  of  inspection  planners,  as  this  application  determines  which  inspections  (QM

operations/processes) are performed at which workplaces.

This  function  does  not  belong  to  inspection  planning  of  the  higher-level  system  but  complements  it  on

sub-system level by defining the actual inspection stations/workstations in detail.

Utilization

If linked QM operations/processes are used in SAP, for example, it cannot be planned in SAP to  which

workplace/machine the QM operations are to be logged on. For this reason, it has to be defined for the

workstation transferred by QM-IDI (or any other ERP interface) to which productive workplace (reference

workplace) it pertains and onto which QM workplace (target workplace) it is to be logged on.

QMS-SQM_81.docx

Version: 1.0.2393

Page 12 of 33

Quality Management Sub System to SAP QM

This  controls  where  the  QM  operations  0021  and  0025  are  to  be  logged  on  along  with  logging  the

productive  operation  0020  on.  The  QM  operation  0021  is  logged  on,  for  example,  on  the  terminal  onto

which the productive operation is logged on as well. The QM operation 0025, however, is logged on to the

"laboratory" workplace of another shop floor terminal.

If  linked  QM  operations/processes  are  used  an  assignment  has  to  be  established  while  the  system  is

customized.  Ideally,  a  "concept"  defining  the  connection  rules  should  defined  in  advance.  It  is

indispensable to customize the system according to the user's requirements to be able to implement the

connection rules that are to be defined.

It is not sufficient to only use this application.

The below example describes a possible connection rule.

  The operation number links the productive operations and QM operations.

  An operation template is created for the combination of workplace and order type including

the assigned processing code. In this context, it does not play a role which order is assigned.

SYSCAQ = is to be linked

CAQPUR = separate QM operation

  Creating the QM operation in HYDRA triggers the search for an OP template taking into

account the workplace and the order type (derives from the QM-IDI interface). The

processing code, which in turn determines whether or not the QM operation is to be linked, is

determined in the template that is found.

  A productive, preceding operation is searched in the corresponding production order for an

QM operation that is transferred via the interface. The operation number specifies the search

order. The productive operation with the next least operation number is searched. An

operation that is found in this way is entered as master operation for the QM operation.

  The application of variable workplaces defines which  QM operations are to be logged on to

which workplaces/machines.

If workplaces are defined as mere QM workstations in HYDRA they have to be assigned the type "CAQ

inspection station" as individual workplace.

Integration

This  application  is  only  required  if  linked  QM  operations/processes  are  in  use.  For  this  reason,  the

application is restricted to being used in connection with HYDRA used as QM subsystem, e.g. with SAP-

QM.

QMS-SQM_81.docx

Version: 1.0.2393

Page 13 of 33

Quality Management Sub System to SAP QM

In exceptional cases, which have to be checked in each individual case, this application may also be used

with HYDRA inspection planning in the HYDRA inspection planning/inspection requirements application,

provided that linked QM operations are in use.

Prerequisite

Linked QM operations/processes need to be used.

Selection criteria

The application provides the following selection criteria:

Reference workplace

Direct  input  (match  code)  or  selection  list  of  the  machine/workplace  catalog  including  acceptance

function.

Placeholder

Direct  input  (match  code)  or  selection  list  of  the  machine/workplace  catalog  including  acceptance

function.

Target workplace

Direct  input  (match  code)  or  selection  list  of  the  machine/workplace  catalog  including  acceptance

function.

Field descriptions

Reference workplace

Direct input or selection list of the machine/workplace catalog including acceptance function.

Placeholder

Direct input or selection list of the machine/workplace catalog including acceptance function.

Target workplace

Direct input or selection list of the machine/workplace catalog including acceptance function.

QMS-SQM_81.docx

Version: 1.0.2393

Page 14 of 33

Quality Management Sub System to SAP QM

Editing functions

The following dialog opens to edit a data record:

Toolbar

The toolbar does not provide any special functions/features.

6  Overview

6.1  Notes to this Document

This  document  describes  the  application  "Inspection  Requirements  QMS"  within  the  Manufacturing

Operation  Center  (MOC).  General  information  on  the  use  of  the  MOC  can  be  found  in  the  document

"moc_cc.pdf".

QMS-SQM_81.docx

Version: 1.0.2393

Page 15 of 33

Quality Management Sub System to SAP QM

7  Inspection Requirements

Target group:

HYDRA as a QMS subsystem requires inspection planning and generation of inspection batches in SAP,

where  collecting  the  inspection  results  and  taking  quality  decisions  (e.g.  inspection  batch  usage

decisions) are an integral part of the shop floor terminals or MOCs. Since collecting the inspection results

is an integral part of the shop floor terminal, the application is aimed at the employee subgroup with the

authority to take quality decisions.

Within MOC the SAP inspection batches are mapped onto inspection requirements.

Application Determination:

This document describes the SAP inspection batch as a QM subsystem within MOC. SAP is considered

the leading system when planning and generating inspection batches; the quality decisions are based on

data entered into the MOC and these are uploaded into SAP together with the individual results.

Within  MOC  the  inspection  requirements  and  the  corresponding  inspection  steps  can  be  related  to  the

SAP  default  values  and  the  quality  decisions  taken  in  MOC.  This  includes  the  detailed  observation  of

inspection points (if used) and the respective inspection plan characteristics.

Boundaries

This application examines the results and SAP specifications transmitted through the QM-IDI Recording

inspection results is not part of this application.

7.1  Function Calls

Menu

Inspection Requirements  Quality Assurance  QM Subsystem

Transaction code

irqms

Function authorization

irqm

7.2  Application Layout

7.3  Tool bar

The tool bar contains the function calls available to the application and the links to other applications. The

functions  on  the  General  page  of  the  tool  bar  are  applicable  to  all  detail  applications.  Additional  pages

contain  the  functions  specific  to  the  respective  detail  application,  in  addition  to  the  standard  functions

Help,  Request  Data,  Application  Settings,  Save  and  Print  Preview.  The  individual  application  functions

are described below.

QMS-SQM_81.docx

Version: 1.0.2393

Page 16 of 33

Quality Management Sub System to SAP QM

Data Category

  Request Data

The  information  to  be  displayed  in  the  application  is  requested  according  to  specified  selection

criteria. This processing can take considerable time to complete depending on the amount of data

to be processed and displayed.

  Cancel

This function is used to abort the query resulting from "Request Data".

 Print Preview

This  function  displays  the  print  preview  of  the  highlighted  detail  application.  The  print  preview

contains  additional  ways  to  control  the  print  result  as  well  as  functions  to  export  the  information

displayed to other formats like PDF, Excel or Image files.

Detail Application Function Category "Inspection Requirements"

  Complete Inspection Requirement

The  SAP  inspection  batch  results  in  a  usage  decision.  The  usage  decision  is  based  on  the

inspection results.

Detail Application Function Category "Inspection Steps"

  Complete Inspection Step

Based on the inspection results the inspection step is completed.

Detail Application Function Category "Inspection Points"

Insert

Calls a dialog to create a new inspection point.

   Edit

Calls a dialog to edit an inspection point.

QMS-SQM_81.docx

Version: 1.0.2393

Page 17 of 33

Quality Management Sub System to SAP QM

  Complete Inspection Point

Calls  a  dialog  to  complete  the  inspection  point.  The  suggested  values  for  the  quality  decisions

based  on  the  inspection  results  are  pre  assigned  in  the  corresponding  configuration  and  can  be

altered.

Category Settings

  Save

The user application settings, such as the columns, categories and their respective sizes as well as

the size and display location of the application are saved after confirmation by the user. The user

must confirm by entering "Yes" to the confirmation prompt.

Category Help

   Help on Operation

This function key is used to call help on operating MOC. The base document is called "moc_cc.pdf".

It contains the general instructions on using MOC and is valid across applications.

    Help on Application

This  function  is  used  to  call  the  application  manual  to  access  the  help  functions.  The  application

manual  contains  the  application  functionality  ordered  along  MES  functionality  and  contains

explanations on the expected information. The document also contains all detail applications of the

application.

   Help on Detail Application

This function calls the application manual at the bookmark where the detail application is described.

7.4  Selection Parameters

The application provides the following selection criteria.

Inspection Requirement Index Tab

  Area:

Selection menu containing all available areas, e.g. QM production



Inspection requirement number:

Unique inspection requirement number

QMS-SQM_81.docx

Version: 1.0.2393

Page 18 of 33

Quality Management Sub System to SAP QM

  Status:

The statuses to be used in the filter can be selected from a selection menu

  Plant:

SAP plant details



Inspection batch

SAP inspection batch number

  Create PPS from:

Creation date from PPS, date can be selected

  Create PPS to:

Creation date from PPS, date can be selected

Order Index Tab

  Order number:

Associated SAP production order number

  Batch:

SAP batch number

  Origin:

from SAP



Inspection type:

Selection menu containing inspection types, e.g. in-production inspection

  Purchase document number:

from SAP

  Material document number:

from SAP

Article Index Tab

  Article number

Material number

  Article designation

Material designation

QMS-SQM_81.docx

Version: 1.0.2393

Page 19 of 33

Quality Management Sub System to SAP QM

  Customer material number

Customer's material number

  Customer material designation

Customer's material designation

Companies Index Tab

  Customer

Customer number

  Customer designation

  Supplier

Supplier number

  Supplier designation

  Manufacturer

Manufacturer number

  Manufacturer designation

User Fields Index Tab



If user fields are defined during customization, this index tab allows filtering by the contents of the

defined user fields.

Long Term Data Index Tab

  This filter allows the inclusion of long term data in the selection criteria.

All filter fields are ANDed together.

QMS-SQM_81.docx

Version: 1.0.2393

Page 20 of 33

Quality Management Sub System to SAP QM

7.5  Master-Detail Grid (MD Grid)

The data is presented hierarchically in a Master-Detail Grid. To access the next lower level, click on the

node  marked  by  a  "+"  sign.  As  long  as  the  data  record  contains  multiple  lower  levels,  these  are  each

displayed in their own index tab. Depending on the detail application one of these index tabs is activated

by  default.  The  corresponding  data  from  the  MD  Grid  are  displayed  as  a  list  in  the  active  index  tab.

Clicking an index tab will change the list correspondingly. As long as the displayed list data can contain

further lower levels, these contain a node marked with a "+" sign to access the next lower level.

Depending  on  the  level  and  the  active  index  tab  in  the  MD  Grid,  the  tool  bar  will  activate  the

corresponding index tab containing the functions of the respective detail application.

A Master-Detail Grid displays the inspection requirements and all related data records. The first level of

the MD Grid displays the inspection requirements (according to the inspection batch). The second level

displays the inspection steps of the inspection requirement (e.g. the process steps, operations). The third

level  contains  the  inspection  points  for  the  respective  inspection  step.  The  next  level  contains  the

characteristics of the inspection points.

When no inspection points are used, the characteristics can be found directly below the inspection steps.

In this case, the characteristics of the inspection steps are displayed.

MD Grid Structure



Inspection Requirements
Inspection Steps

o



Inspection Points

  Characteristics

  Characteristics

7.6  Detail Application Inspection Requirement

This application displays the inspection requirements (inspection batches). These are uniquely identified

by the inspection requirement number. Using the criteria from the selection panel will limit the amount of

data displayed. Further filtering is possible through standard filters within the list.

It  is  not  possible  to  edit  or  create  inspection  requirements  since  the  data  is  transferred  to  the  MOC

through the interface only. Usage decisions are an exception. The tool bar contains a function button to

start  a  new  detail  application  for  a  usage  decision  for  an  inspection  requirement  that  has  not  been

completed yet.

QMS-SQM_81.docx

Version: 1.0.2393

Page 21 of 33

The detail data of an inspection requirement are split up in the index tabs

Quality Management Sub System to SAP QM



Inspection Requirement

  Companies

  Status - Details

  Documents

  Administration and

  User Fields (if defined).

 Within  these  index  tabs  the  data  are  grouped  according  to  contents  and  functional  aspects.  Since  no

details  can  be  modified  (with  the  exception  of  usage  decisions),  a  detailed  description  of  the  individual

fields is not presented here. The groups in each index tab are described below.

Inspection Requirement Index Tab

This index tab is divided into the groups



Identification

  Details and

  Article.

The  group  "Identification"  contains  all  relevant  order  information.  This  includes  the  unique  inspection

requirement number, the  inspection batch, order and purchase order numbers, the batch and the  plant.

The  Details  index  tab  contains  the  information  on  quantities  and  storage  location.  The  Article  index  tab

contains the component.

Companies Index Tab

This index tab is divided into the groups

  Customer

  Supplier and

  Manufacturer

QMS-SQM_81.docx

Version: 1.0.2393

Page 22 of 33

and contains the supplier's batch and material number in addition to the relevant company number and

Quality Management Sub System to SAP QM

designation.

Status - Details Index Tab

This index tab is divided into the groups

  Ratings



Inspection Plan

  Confirmation

  Code

  Catalog Type

  Selected Set and

  Plant.

 The important information in this index tab is the status (e.g. created, partial result, finished), inspection

plan type and version and the usage decision information.

Documents Index Tab

This  index  tab  contains  information  on  purchase  document  number  and  position,  material  document

number and position and document posting date along with other information.

Administration Index Tab

This index tab contains details on date, time and persons used for example to create, close and modify a

data record.

User Fields Index Tab

This index tab is only visible when user fields have been defined for this application.

7.7  Detail Application Usage Decision

When  an  inspection  requirement  has  not  been  completed  yet,  the  usage  decision  (if  configured

accordingly)  can  be  defined  and  the  inspection  requirement  can  be  completed  by  clicking  the  button

"Complete". The available usage decisions are stored in the PPS system and can be selected.

QMS-SQM_81.docx

Version: 1.0.2393

Page 23 of 33

Quality Management Sub System to SAP QM

The  usage  decision  cannot  be  modified  for  inspection  requirements  that  are  complete.  After  taking  a

usage  decision  of an  inspection requirement, all  associated data  are uploaded to the PPS system (e.g.

SAP).

7.8  Detail Application Inspection Step

This application  displays the inspection steps  of the selected  inspection requirement (inspection  batch).

The  inspection  steps  generally  match  the  operations  of  the  PPS  system  (e.g.  SAP).  Depending  on  the

MOC configuration or in the case of linked operations in SAP-QM, an inspection step can also match a

part of an operation. For example, the characteristics of an operation to be inspected can be split across

multiple inspection stations where each inspection station is presented as a separate inspection step. In

this  case,  the  inspection  step  only  contains  those  characteristics  that  can  be  inspected  at  the

corresponding inspection station.

It  is  not  possible  to  edit,  create  or  delete  inspection  steps  since  the  data  is  transferred  to  the  MOC

through the interface only.

Since in MOC every inspection step is associated with an operation, the completion of an inspection step

is performed by logging off from the corresponding operation. Re-releasing an inspection step (e.g. for a

subsequent  inspection)  can  be  accomplished  by  reactivating  the  finished  operation.  Such  re-release  is

possible only when the corresponding inspection requirement has not been completed yet.

The detail data of an inspection step are split up in the index tabs



Inspection Step

  General Inspection Point



Inspection Point Evaluation



Inspection Point Identification

  ADE Operation Order Data



Inspection Step Order Data

  Confirmation

  Administration

  User Fields (if defined).

QMS-SQM_81.docx

Version: 1.0.2393

Page 24 of 33

Quality Management Sub System to SAP QM

 Within  these  index  tabs  the  data  are  grouped  according  to  contents  and  functional  aspects.    Since  no

details can be modified, a detailed description of the individual fields is not presented here. The groups in

each index tab are described below.

Inspection Step Index Tab

This index tab is divided into the groups



Identification

  Rating

  Workplace and

  Details.

The  Identification  group  contains  the  unique  inspection  step  number  assigned  by  the  MOC,  the  Rating

group  contains  the  status  (e.g.  created,  partial  result,  finished)  and  the  result  (e.g.  correct,  fail).  The

Details group contains the plant, the cost center, the storage location and the subsystem ID.

General Inspection Point Index Tab

This index tab is divided into the groups

  Cycle and

  Properties.

 The Cycle group includes  whether the inspection  interval  is time or piece related. In  this case, the unit

and interval are also included.

Inspection Point Evaluation Index Tab

This index tab is divided into the groups

  Details

  Suggestion, Pass

  Suggestion, Fail and

  Property.

QMS-SQM_81.docx

Version: 1.0.2393

Page 25 of 33

 Properties  are  e.g.  whether  the  evaluation  of  an  inspection  point  is  required.  The  suggestion  groups

Quality Management Sub System to SAP QM

display which details pass or fail the evaluation.

Inspection Point Identification Index Tab

This index tab is divided into the groups

  Details and

  User Fields.

 The configuration of the PPS system determines which fields can later be used in the inspection points

and what the user fields actually stand for. This index tab also specifies which fields are required.

ADE Operation Order Data and Inspection Step Order Data Index Tabs

These index tabs are not subdivided into groups and contain identical field designations.

Confirmation Index Tab

This index tab is organized into three confirmation categories and contains details on date and time of the

respective confirmation.

Administration Index Tab

This index tab contains details on date, time and persons used for example to create, close and modify a

data record.

User Fields Index Tab

This index tab is only visible when user fields have been defined for this application.

7.9  Detail Application Inspection Points

This application displays the inspection point details of the selected inspection point. If an inspection does

not contain any inspection points, this detail application is absent.

When defining an inspection point, only some the fields of the index tabs Identification and Quantities can

be  entered.  The  leading  system  determines  which  fields  can  be  entered.  Changing  inspection  points

functions similarly. Key fields used to identify the data record and specifications predefined by the leading

system cannot be edited at all.

The  tool  bar  of  the  maintenance  dialog  in  the  Evaluation  index  tab  contains  a  button  Complete  to

complete  the  inspection  point.  Default  values  are  set  according  to  the  configuration  and  the  inspection

results.

QMS-SQM_81.docx

Version: 1.0.2393

Page 26 of 33

The detail data of an inspection step are split up in the index tabs

Quality Management Sub System to SAP QM



Inspection Point

  Details



Identification

  Quantities

  Evaluation

  Confirmation

  Administration

  User Fields (if defined).

 Within these index tabs the data are grouped according to contents and functional  aspects. Since only

few  details  can  be  modified,  a  detailed  description  of  the  individual  fields  is  not  presented  here.  The

groups in each index tab are described below.

Inspection Point Index Tab

This index tab is divided into the groups

  Area



Identification and

  Rating.

 The  Identification  area  contains  the  criteria  that  define  the  unique  key.  In  addition  to  the  inspection

requirement  and  inspection  step  number  and  the  inspection  batch,  these  include  the  unique  inspection

point number The Rating group contains the inspection point status (e.g. open, finished).

Details Index Tab

This index tab is not subdivided. It includes the indication whether the Inspection point is generated based

on a time or piece interval or freely.

Identification Index Tab

This index tab is divided into the groups

QMS-SQM_81.docx

Version: 1.0.2393

Page 27 of 33

Quality Management Sub System to SAP QM

  Details and

  User Fields.

 The  contents  of  these  fields  can  be  altered  depending  on  the  configuration  and  the  defaults  from  the

leading system. The field designations are also determined by the leading system and can vary.

Quantity Index Tab

The Quantity index tab is not subdivided and is used to enter the scrap and rework details.

Confirmation Index Tab

This index tab is organized into three confirmation categories and contains details on date and time of the

respective confirmation.

Evaluation Index Tab

This index tab contains details defined and set during the completion of the Inspection point.

Administration Index Tab

This index tab contains details on date, time and persons used for example to create, close and modify a

data record.

User Fields Index Tab

This index tab is only visible when user fields have been defined for this application.

7.10 Detail Application Characteristics

This detail application is located at the level immediately below the Inspection steps and Inspection points

if Inspection points are used.

Details  are  shown  about  the  Inspection  characteristics  highlighted  in  the  list  of  characteristics;  it  is  not

possible  to  make  modifications  to  the  characteristics.  Additionally,  it  is  not  possible  to  insert  new

characteristics  or  delete  existing  ones.  Many  of  the  data  displayed  here  determine  the  inspection  result

and some can be viewed during the inspection.

The detail data of a characteristic are split up in the index tabs

  Characteristic

QMS-SQM_81.docx

Version: 1.0.2393

Page 28 of 33

Quality Management Sub System to SAP QM



Inspection Method

  Details

  Specifications

  Chart 1

  Chart 2

  Evaluation

  Confirmation

  Administration

  User Fields (if defined).

 Within  these  index  tabs  the  data  are  grouped  according  to  contents  and  functional  aspects.  Since  no

details  can  be  modified  (with  the  exception  of  usage  decisions),  a  detailed  description  of  the  individual

fields is not given here. The groups in each index tab are described below.

Characteristic Index Tab

This index tab is divided into the groups



Identification

  Properties and

  Weighting.

 The  identification  area  uses  the  number,  the  designation  and  the  unique  OP  identification  (work  plan

number)  to  describe  the  characteristic.  The  inspections  are  ordered  by  OP.    Once  a  characteristic  has

been inspected, the next characteristic in sequence is shown and presented for inspection.

The  properties  contain  the  type  of  characteristic  (e.g.  measured  sample  value,  sample  evaluation),  the

type of evaluation (e.g. number of fields), the recording method of the result (e.g. must be tested) and a

test schedule including frequency.

QMS-SQM_81.docx

Version: 1.0.2393

Page 29 of 33

Quality Management Sub System to SAP QM

Testing Method Index Tab

This  index  tab  is  not  subdivided  and  describes  the  inspection  method  proper,  including  version

information.

Details Index Tab

This index tab is divided into the groups

  Gage and

  Additional Information.

 The gage data displayed (number and designation) are not part of the QM-IDI because the QM-IDI does

not transfer any gage data. This information is required to connect to a gage and to collect data on line

and  must  be  transferred  by  customer  specific  additional  functions.  The  Additional  information  group

contains the three QM-IDI category user fields plus an information field.

Specifications Index Tab

This index tab is divided into the groups

  Sampling Scheme

  Constructional Measures and

  Other Limit Values.

 The  Sampling  Scheme  group  contains  the  inspection  scope  (e.g.  may  be  smaller,  must  be  followed

exactly),  the  sampling  unit  and  the  rejection  and  acceptance  quantity.  The  Constructional  Measures

group  contains  the  tolerances  and  plausibility  limits.  Further  limits  displayed  include  the  data  "first  /

second upper / lower limit".

Chart 1 and Chart 2 Index Tabs

The action or warning limits defined for the respective control chart (e.g. Xq) are shown.

It is important to note that none of the fields in these two index tabs are part of the standard functionality

of  the  QM-IDI  interface.  The  corresponding  data  must  be  provided  optionally  through  user  specific

additional functions.

QMS-SQM_81.docx

Version: 1.0.2393

Page 30 of 33

Quality Management Sub System to SAP QM

Confirmation Index Tab

This index tab is organized into three confirmation categories and contains details on date and time of the

respective confirmation.

Evaluation Index Tab

This index tab contains the details Site, Catalog Type and Selected Set for Evaluation 1 through 5.

Administration Index Tab

This index tab contains details on date, time and persons used for example to create and modify a data

record.

User Fields Index Tab

This index tab is only visible when user fields have been defined for this application.

7.11 Detail Application Errors

In a separate detail application the defects documented in the inspection process (error type and location)

are  displayed  both  as  a  list  and  graphically.  These  data  are  displayed  in  an  index  tab  integrated  in  the

detail  application Inspection Requirement. This ensures that the list contains  all defects recorded  in  the

inspection process of this order, the operation of the order, an associated inspection point, characteristic,

sample or measured value.

The list of errors visualize the key fields



Inspection Step Number

  Operation Sequence Number

  Sample and

  Value Number.

plus the details

  on defect type (defect type and location)

  on characteristic number and designation

  on operation number and designation of the inspection step or order

  on work plan number and designation

QMS-SQM_81.docx

Version: 1.0.2393

Page 31 of 33

Quality Management Sub System to SAP QM

  on weighting

  a comment

  on error date and time and



the administration duration.

The processing can be customized through the various possibilities for grouping and filtering in this list.

The data display on the top 10 defects can be switched from a list to a bar or pie chart. The list of defects

is the basis for these data. If the list of defects is filtered when displayed as a list, this same filtering will

be applied when displaying the data graphically. For the graphical display, the user can choose whether

to show absolute numbers or percentages.

7.12 Detail Applications Control Chart 1 + 2, Histogram, Single

Values 1 + 2, Statistics and Inspection Data

The detail applications

  Control Chart 1,

  Control Chart 2,

  Histogram and

  Statistics / Inspection Data



Inspection Data

are integrated into the detail application Characteristics as additional index tabs. The Control chart index

tabs display  the characteristics data in the  Control Chart 1 and  2 format by  default. If the characteristic

does not contain any control chart defaults, the data for a variable characteristic will be taken from Xq and

s charts and those for an attributive characteristic will be taken from p and u charts.

Both index tabs for individual values display the contents of the respective control chart as a list. Sample

control charts display all statistics values on the sample, including date, time and person responsible for

the completion of the sample.

The statistics index tab includes details on number of samples and their measured values, maximum and

minimum values and process parameters Cp and Cpk.

QMS-SQM_81.docx

Version: 1.0.2393

Page 32 of 33

Quality Management Sub System to SAP QM

The Inspection data index tabs lists the inspection data in the finest granularity (e.g. the measured values

level) independent of the selected control chart. This includes all associated key information (Inspection

requirement, inspection step etc.). The contents of the list can be tailored through the sort, group and filter

functions.

The  customization  settings  determine  the  base  data.  The  standard  configuration  displays  all  data  that

refer  to  the  selected  OP  number  and  the  associated  Inspection  requirement  and  Inspection  step.  If  this

configuration  has  been  modified  during  customization,  the  base  data  can  be  manually  and  temporarily

changed  to  refer  to  the  data  of  the  respective  inspection  step  or  of  the  selected  characteristic  (OP

number).

QMS-SQM_81.docx

Version: 1.0.2393

Page 33 of 33

