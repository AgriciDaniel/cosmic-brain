Manual

Material Monitoring
MPL-MMO 8.1

Version 1.0.662

Last changed on: 19.06.2020

Material Monitoring

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

MPL-MMO_81.docx

Version: 1.0.18468

Page 2 of 32

Material Monitoring

Contents

1  Material Monitoring ....................................... Error! Bookmark not defined.

2  Configuration of Minimum Storage Times and Expiry Durations ................. 6

3  Activating Material Monitoring ...................................................................... 7

4  Monitoring Availability Dates ........................................................................ 9

5  Warning Report .......................................................................................... 10

6  Expiry Preview ........................................................................................... 14

7  Expiry Statistics .......................................................................................... 16

8  Batch Data Overview ................................................................................. 18

9  Requirements Overview ............................................................................. 24

10  Stock Overview .......................................................................................... 26

11  TPU Stock Overview .................................................................................. 29

12  Applications provided in MOC: ................................................................... 32

MPL-MMO_81.docx

Version: 1.0.18468

Page 3 of 32

Material Monitoring

1  Material Monitoring

Overview

Purpose

The  Material  Monitoring  function  package  extends  Material  and  Production  Logistics  and/or  Tracking  &

Tracing  by  functions  for  monitoring  minimum  storage  periods  and/or  minimum  shelf-lives  and

consequently contributes to increasing process security.

Implementation considerations

You  use  the  Material  Monitoring  function  package  if  you  apply  the  Material  and  Production  Logistics

and/or Tracking & Tracing function packages, and

  Need to secure compliance with the shelf lives of incoming raw materials;

  Need  to  secure  compliance  with  minimum  shelf  lives  for  semi-finished  products  and/or  WIP

material;

  Need  to  secure  minimum  storage  times  for  semi-finished  products  and/or  WIP  material  within

production.

Integration

This function package is integrated in the function packages Material and Production Logistics as well as

Tracking & Tracing, by:

  extending the Batch object by production and shelf life data;



verifying the minimum shelf life when incoming batches are registered.

Features

  Configuration of minimum storage period and expiration period

  Monitoring of expiration and warning times

o  Batch and lot-related monitoring of dates and periods

  Warning report

o  Warning  report  of  all  lots  and  batches  whose  warning  date  and/or  expiration  date  has

been exceeded or will be reached at the evaluation day.

  Expiration statistics

o  Expiration  statistics  including  evaluation  as  to  which  material  quantities  have  expired

and/or will regularly expire in a given period (table and graph).

  Expiry preview

MPL-MMO_81.docx

Version: 1.0.18468

Page 4 of 32

Material Monitoring

o  Expiry preview including indication as to when which material quantities will have expired,

including  a  forecast  of  material  expiring  on  basis  of  the  present  inventory  (table  and

graph).

MPL-MMO_81.docx

Version: 1.0.18468

Page 5 of 32

2  Configuration of Minimum Storage Times and Expiry

Material Monitoring

Durations

Usage

You  use  minimum  storage  time  to  ensure  processing-related  waiting  times  within  production  and  to

prevent input materials with a minimum storage time that has not expired from being logged on.

You use warning time to be notified in advance in the evaluations warning report and expiry preview that

material is due to expire.

You use expiry limit to define the maximum storage life of a material.

Requirements

You defined material types for the materials you use.

Procedure

Define on which level the times should be maintained.

  You can update the settings on the material type level in the material type configuration.

  When  assigning  material  to  material  type,  you  can  overwrite  the  material  type  settings  for

selected materials.

Update the times on the level you have selected.

Results

The times are defined.

MPL-MMO_81.docx

Version: 1.0.18468

Page 6 of 32

Material Monitoring

3  Activating Material Monitoring

Usage

You activate the material monitoring job if you would like the system to automatically implement the status

of known batches in the system based on durations defined in the system.

Requirements

You  defined  the  process  time  defaults  for  minimum  storage  time,  warning  time  and/or  expiry  time  in

material type or in assignment of material to material type.

Procedure

Make an entry in the Scheduler for the cyclic call of the monitoring job and define the call interval, if it is

different.

Parameter name

Value

For uploading material receipts:

Product key

License key

MPL-MMO

MPL-MMO

Command (Windows):

sh.exe ./mpl_lsta.scr

Command (Unix):

./mpl_lsta.scr

Comment:

Interval

MPL - Status monitoring

5

The job is run every five minutes in the system standard delivery. If this interval is sufficient for

you, no further adjustments are required.

Results

The system runs the job cyclically at the defined interval.

MPL-MMO_81.docx

Version: 1.0.18468

Page 7 of 32

Material Monitoring

MPL-MMO_81.docx

Version: 1.0.18468

Page 8 of 32

Material Monitoring

4  Monitoring Availability Dates

Requirement

You  defined  the  process  time  defaults  for  minimum  storage  time,  warning  time  and/or  expiry  time  in

Material type or in Assignment of material to material type.

You scheduled the job in the scheduler.

Procedure the system follows during cyclic monitoring

Batches,  which  because  of  the  minimum  storage  time  configuration,  were  set  to  status  "M"  (minimum

storage time) at the time the batch was created are set to status "F" (free) once the minimum storage time

has expired.

A batch is considered expired if the period of time between when the batch was created and the current

time is greater than the period of time defined in the Expiry limit configuration. If this is the case, the batch

is set to status "V" (expired).

The status modification as a result of the processing step is logged and is shown in the batch history.

Procedure the system follows during input batch logon

When  a  batch  is  logged  on  as  an  input  batch,  a  plausibility  check  is  run  to  verify  the  minimum  storage

time and the expiry time.

MPL-MMO_81.docx

Version: 1.0.18468

Page 9 of 32

Material Monitoring

5  Warning Report

Summary

Menu

Material management Inventory management Warning report

Transaction code

warnrp

Function authorization  Warnrp

Usage

All  batches  will  be  shown  in  the  warning  report,  for  which  the  warning  date  and/or  expiration  date  has

been exceeded or will be reached at the evaluation day. The data display corresponds mostly to the type

of display in batch data maintenance.

Selection criteria

The following selection criteria are available in the application:

Batch

Batch number (entry of wildcards possible)

Status

Batch status (selection of several statuses possible)

Material

Article/item (entry of wildcards possible)

Material type

Material type (entry of wildcards possible)

Material buffer

Material buffer (entry of wildcards possible)

Date, time, relating to

Key date and time related to an expiration date and/or warning time.

Field descriptions

Last modification

- date and time of a batch's last modification

- date of a batch's last modification

- time of a batch's last modification

MPL-MMO_81.docx

Version: 1.0.18468

Page 10 of 32

Material Monitoring

Modified by

Editor of the last batch's modification

Batch number

Batch number

Quantity

Original quantity

Remaining quantity

Remaining and/or current quantity of the batch

Unit

Quantity unit of the batch

Manufacturing date

Date of creation of a batch

Workplace

Producing workplace of a batch

Batch class

Batch class

Batch information

Information on the batch

Availability date

Date, from which on the batch will be available

Warning date

Warning date of the batch

Warning time

Warning time of the batch

Expiry date

Expiry date of the batch

Status change

Date of the last status change of the batch

MPL-MMO_81.docx

Version: 1.0.18468

Page 11 of 32

Remaining quantity indicator

This indicator shows whether a remaining quantity is assigned to the batch (Y/ N)

Material Monitoring

Input batch

Input batch number

User

Staff badge number

Batch status

Batch status (free, running, processed, etc.)

Transport status

Transport status of the batch

Workplace

Workplace at which the batch is currently running. Otherwise this is empty.

MES order number

Order number for which the batch is running. Otherwise this is empty.

Reason

Scrap reason

Material

Material number of the batch

Material designation

Designation/ description/ name of the material

Material type

Material type of the batch

Material buffer

Material buffer of the batch

Designation

Designation of the material buffer

MPL-MMO_81.docx

Version: 1.0.18468

Page 12 of 32

Material Monitoring

Transport unit

Transport unit of the batch

Person

Person, who processed the batch.

Field 1 - 10

Specific batch data (optional)

Production order

Production order, from which the batch was created.

MPL-MMO_81.docx

Version: 1.0.18468

Page 13 of 32

Material Monitoring

6  Expiry Preview

Summary

Menu

Material management  Inventory management  Expiry overview

Transaction code

eprev

Function authorization

eprev

Usage

The  expiry  preview  deals  with  this  question:  "When  does  how  much  material  expire?"  It  shows  a

prognosis of the expired material based on the current stock.

Requirement

All  batches  that  currently  have  status  "F"  (Free)  or  "M”  are  considered  (batch  must  first  be  stored  for  a

minimum  period  before  it  is  available  =  free).  Depending  on  the  selection,  consumption  is  compressed

into a specified time frame (daily or hourly).

Selection criteria

The following selection criteria are available in the application:

Material/ material type/ material buffer

Selection of the object to be selected

Material

All materials with the selected material number are selected.

Material type

All data records with the material type are selected.

Material buffer

All data records in the corresponding material buffer are selected.

Grid spacing day/ hour

The expiry preview outputs the selection of the grid spacing in days or hours.

MPL-MMO_81.docx

Version: 1.0.18468

Page 14 of 32

Material Monitoring

Field descriptions

Index

Consecutive number

Date

Date on which the material expires

Quantity

Available batch quantity

Expired quantity

Quantity that expires on the corresponding date

Expired quantity (accumulated)

Total quantity that has expired by this date

Material buffer

Material buffer that includes the expiring material.

MPL-MMO_81.docx

Version: 1.0.18468

Page 15 of 32

Material Monitoring

7  Expiry Statistics

Summary

Menu

Material management  Inventory management  Expiry statistics

Transaction code

estat

Function authorization

estat

Usage

The  expiry  statistics  displays  how  much  material  has  expired  within  a  specific  period  or  how  much

generally expires within a specific period.

Integration

The  display  of  the  expiry  statistics  refers  to  the  material  entered,  the  material  type  or  material  buffer

entered and the period indicated with a grid spacing in the specified cycle. Possible grid values are: 5, 15,

30 minutes, 1, 5, 12 hours, daily, weekly, total.

Selection criteria

The application provides the following selection criteria:

Material

Only the expiry statistics for the selected material number is displayed.

Material type

Only the expiry statistics for the selected material type is displayed.

Evaluation mode

The evaluation mode indicates the grid spacing of the expiry statistics.

Material buffer

Only the expiry statistics for the selected material buffer is displayed.

Date from ... to ...

Only the expiry statistics for the selected period is displayed

Field Descriptions

Index

Consecutive number

MPL-MMO_81.docx

Version: 1.0.18468

Page 16 of 32

Evaluation time

Point in time of the material expiration

Material Monitoring

Material

Material number

Material designation

Material designation

Material type

Material type

Quantity

Quantity

Unit

Quantity unit

Detail applications

Table display

In the table display, all of the fields returned by the data source are displayed. A sum is calculated

with regard to the quantity. Grouping and subtotals are possible.

Expired quantity per point in time on the grid

Quantity of material that has expired by the respective grid period. The quantity displayed depends

on the selection criteria made and can even contain quantities with differing quantity units.

Expired quantity per material in the evaluation period

Quantity of the respective material that has expired in the specified period.

MPL-MMO_81.docx

Version: 1.0.18468

Page 17 of 32

Material Monitoring

8  Batch Data Overview

Summary

Menu

Material management  Inventory management  Batch data overview

Transaction code

batov

Function authorization

batov

Usage

The  batch  data  overview  is  used  to  display  or  process  one  or  more  batches  depending  on  the  chosen

selection criteria entered.

Integration

The batch data overview shows all batches included in the data set that were  specified by the selection

criteria entered.

In  the  batch  data  overview,  the  selected  batches  can  be  displayed  in  their  current  status  together  with

detail information.

Selection criteria

The application provides the following selection criteria:

"Batch" category

Batch number

The batch number represents the batch ID used by the user. This can be:





for the input/output at terminal dialogs

for tracing or information search at the office client

When the configuration option "automatic generation of batch no. when creating batches"

is activated, a batch number will still only be assigned automatically as long as the batch

number field in the editing dialog box is left empty when a batch is added.

Material

Entering  the  material  number  as  a  selection  criterion  displays  all  batches  that  have  this  material

number.

Workplace

Entering the workplace as a selection criterion displays all batches that have been produced at this

workplace/machine.

MPL-MMO_81.docx

Version: 1.0.18468

Page 18 of 32

Material Monitoring

MES order number

MES order number (order/operation number) by which the batch has been produced.

Internal batch number

The batch number is a unique, system-wide batch identification number.

Material buffer

The individual batches are located in a specific material buffer. With this selection, all batches with

the selected material buffer are displayed.

Material type

The  individual  batches  or  materials  belong  to  a  material  type.  The  same  transport  and  handling

guidelines are used for these material types across the system. With this selection, all batches with

the selected material type are displayed.

Material category (type)

The  material  type  is  used  to  assign  batches  to  specific  classes/  groups.  W ith  this  selection,  all

batches with the selected material type are displayed.

Material designation

When the output batch is created on the shop floor stations, the material designation of the currently

registered order is used. Because no material master is managed, the material designation is saved

redundantly in the batch description.

Manufacturing date from / until

Date/period of the production of a batch

Consider long-term data

Archived data may be selected.

"Status" category

Batch class

The batch class describes the overall quality of the batch. With this selection, all batches matching

the selected batch class are displayed.

Batch status

The  batch  status  describes  the  technical  system  and  production  status  of  a  batch.  Selecting  the

batch status as a selection criterion displays all batches that have this status.

Quality status

The quality status "blocked" prevents a batch from being logged on. Selecting the quality status as

a selection criterion displays all batches that have this status.

Manual Q status

Selecting the manual Q status as a selection criterion displays all batches that have this status.

MPL-MMO_81.docx

Version: 1.0.18468

Page 19 of 32

Material Monitoring

Material status

The  material  status  indicates  a  logical  status  of  the  batch,  e.g.  packed,  tested.  Selecting  the

material status as a selection criterion displays all batches that have this status.

Transport status

The  transport  status  represents  the  technical  system  status  with  respect  to  transfer  postings  to

external  storage.  Selecting  the  transport  status  as  a  selection  criterion  displays  all  batches  that

have this status.

Advance logon flag

Restriction to batches logged on in advance.

"Attributes" category

Attribute (1 to 10)

The data displayed may be restricted to the batch attributes directly kept for the batch.

"Batch attributes" category

Batch attribute (designation)

The data displayed may be restricted to the batch attributes configured for the material type. There

are 40 text fields, 20 numeric fields and 20 decimal fields that may be configured altogether.

"Alternative batch numbers" category

Alternative batch number (1 to 20)

Selecting  an  alternative  batch  number  as  a  selection  criterion  displays  all  batches  that  currently

have this identifier.

"Reservation" category

Reserved for order

Entering or selecting the order number in the field displays all batches that were produced  for this

order/ OP.

Reserved for OP

Entering or selecting the order/OP number in the field displays all batches that were produced for

this order/ OP.

"Dates" category

Expiry date from / until

Date/period that indicates the shelf life of a batch

Availability date from / until

Date/period of the availability of a batch

Warning time

Warning date of a batch

MPL-MMO_81.docx

Version: 1.0.18468

Page 20 of 32

Material Monitoring

"Miscellaneous" category

Serial number

Selecting a serial number as a selection criterion displays all batches for which this serial number is

entered in the serial number field.

Batch (LOT) number

Selecting the batch/lot number as a selection criterion displays all batches that currently have this

identifier.

Person

Selecting the person as a selection criterion displays all batches that have been produced by this

person and, as a result, are currently assigned to this person (identifier).

Merged batch

Selecting  the  merged  batch  number  as  a  selection  criterion  displays  all  batches  for  which  the

merged batch number is entered in the merged batch field.

PPS batch

Selecting  the  PPS  batch  as  a  selection  criterion  displays  all  batches  for  which  the  PPS  batch

number is entered in the PPS batch field.

Editing functions

These functions are provided by the standard features for creating, editing, etc. to edit one or several data

records:

 Add batch

This function can be used to insert a new batch. Goods movements are not generated for the new

batch.

 Copy batch

This function can be used to copy a batch. However, the batch number for the new batch has to be

entered anew. Goods movements are not generated for the new batch.

  Edit batch

A  batch  can  be  edited  using  this  function.  But  neither  cancellations  nor  goods  movements  are

generated for the changed batch.

 Delete batch

This  function  can  be  used  to  delete  a  batch.  But  neither  cancellations  nor  goods movements  are

generated for the deleted batch.

MPL-MMO_81.docx

Version: 1.0.18468

Page 21 of 32

Material Monitoring

 Pool batches (new batch number)

Pooling/merging batches. A new batch number is generated for the new batch (merging batches).

When pooling merged batches, all individual batches are assigned to a new merged batch number.

 Pool batches (use existing batch numbers)

Pooling/merging batches. A batch number already included in the pool/merge is used for the new

batch (merging batches).

When  pooling  merged  batches,  all  individual  batches  are  assigned  to  the  selected  merged  batch

number that is part of the pool.

 Split batch

A new batch is created by splitting it off from an existing batch (splitting batches). In this case, the

following options exist for the remaining target quantity of the original batch:

  Repost remaining quantity of batch to new batch

  Reduce existing batch to the remaining quantity

If a merged batch is split, the selected individual batches/serial numbers are transferred to a split off

batch.  The  remaining  individual  batches/serial  numbers  remain  assigned  to  the  original  merged

batch.

 Repost

This function can be used to repost a batch to another material buffer (Reposting batches).

 Generate

The function "enter goods receipt batch" is used to create batches manually (Generating batches).

This is necessary if material is delivered via the goods receipt, for example.

 Edit batch attribute

The batch attributes of the batch selected in the grid are shown in the tab “batch attributes”. Only

those batch attributes will be shown that have been assigned the indicator “show attribute on client”

within the configuration of batch attributes.

Provided  that  batch  attributes  are  shown,  they  can  be  edited  by  clicking  the  button  “edit  batch

attribute”.  The  field  types/field  lengths  specified  for  the  configuration  of  batch  attributes  are  not

checked.

MPL-MMO_81.docx

Version: 1.0.18468

Page 22 of 32

Material Monitoring

 Go to

 Graphic batch tracing

Starts the application Graphic batch tracing.

 Document management

Starts the document management

"Batch data overview" detail application

In  the  batch  data  overview  detail  application,  all  batches  are  displayed  according  to  the  selections

entered.

The  information  or  field  descriptions  of  the  selected  batches  and,  thus,  of  the  detail  application  are

described in the documents entitled batch object and batch structure.

MPL-MMO_81.docx

Version: 1.0.18468

Page 23 of 32

Material Monitoring

9  Requirements Overview

Summary

Menu

Material management  Inventory management  Requirements overview

Transaction code

reqov

Function authorization

reqov

Usage

The  function  “material  requirements”  provides  an  overview  of  the  materials  required  at  machines.  It  is

particular  to  this  function  that  material  requirements  are  exactly  determined  by  day  taking  the  shift

calendar  into  account.  Consequently,  material  requirements  are  distributed  according  to  the  run  time  of

OP(s). “By day” means here “by shift”, i.e. the day starts with the beginning of shift 1 and ends with the

end of the last shift (e.g. shift 3).

Requirements

The PPS system transfers the materials required for the production of an operation and, as a result, they

are available in the component list of the OP within the system.

Please note:

The  determination  of  material  requirements  depends,  among  others,  on  the  planned  start  date  of  an

operation. For this reason, the planned start date of an operation needs to be transferred correctly by the

PPS system or planned in shop floor scheduling. If, however, the order sequencing function is used this

planned date is used to define the order of processing (internal algorithm). In this case, the planned start

date can no longer be derived.

Selection criteria

The result of overlapping selection criteria is displayed if several selection criteria are in use.

The application provides the following selection criteria:

Material

Shows all materials assigned to the selected material.

Workplace

Shows all materials assigned to the selected workplace.

MES order number

Shows all materials assigned to the selected MES order number.

MPL-MMO_81.docx

Version: 1.0.18468

Page 24 of 32

Material Monitoring

Material type

This  selection  criterion  refers  to  the  material  type  of  the  material.  All  materials  assigned  to  the

selected material type are shown.

Planned start

Shows all materials assigned to the selected planned start.

Consider pool of groups

Defines whether or not the pool of groups is to be taken into account for selection.

MPL-MMO_81.docx

Version: 1.0.18468

Page 25 of 32

Material Monitoring

10  Stock Overview

Summary

Menu

Material management Inventory management Stock overview

Transaction code

stov

Function authorization

stov

Usage

The stock overview is an evaluation of the material management. Here, the employees of the warehouse,

dispatch and production supply or logistics departments can inspect the current buffer stock and/or stock

in production.

Integration

This evaluation shows the batch and material stock within a  material buffer cumulated for each material

and each batch status within the material, i.e. the material number. Such batches with a quantity of 0 and

batches that are not assigned to a material buffer will not be taken into account.

Selection criteria

The result of overlapping selection criteria is displayed if several selection criteria are in use.

The following selection criteria are available in the application:

General

Batch number

(Externally used) batch number that is to be selected.

Material

All materials with the selected material number will be shown.

Internal batch number

Internal batch number that is unique within the system and that is to be selected.

Material buffer

This  selection  criterion  refers  to  the  material  buffer  of  the  batch.  All  batches  with  the  selected

material buffer will be used for the evaluation.

MPL-MMO_81.docx

Version: 1.0.18468

Page 26 of 32

Material Monitoring

Material type

This  selection  criterion  refers  to  the  material  type  of  the  material.  All  materials  with  the  selected

material type will be shown.

Batch status

This  selection  criterion  refers  to  the  batch  status  of  the  material.  All  materials  with  the  selected

batch status will be shown.

Attributes

Attributes 1 - 10

Selecting an attribute as a selection criterion displays all inventories of batches that currently have

this identifier.

Batch attributes

Batch attributes

Selecting a batch attribute as a selection criterion displays all inventories of batches for the material

type of which this batch attribute has been configured and that are currently assigned this identifier.

Alternative batch numbers

Alternative batch number 1-20

Selecting  an  alternative  batch  number  as  a  selection  criterion  displays  all  inventories  of  batches

that currently have this identifier.

Field description

Primarily, the evaluation shows the current information on a batch as well as information on the material

buffer concerned.

Information on batch

The information per batch is the same as the one presented in the batch data overview.

Information on material buffer

In the stock overview the information on the material buffer will be shown per batch. This is primarily:

Material buffer

Material buffer of the batch

Designation

Designation of the material buffer

MPL-MMO_81.docx

Version: 1.0.18468

Page 27 of 32

Material Monitoring

Storage location

Assigned storage location of the material buffer

Type

Type of the material buffer

MPL-MMO_81.docx

Version: 1.0.18468

Page 28 of 32

11  TPU Stock Overview

Summary

Material Monitoring

Menu

Material management Inventory management TPU stock overview

Transaction code

stovhu

Function authorization

stovhu

Usage

The transport units stock overview is used to show the quantities of materials in the individual transport

units. This can be used to determine which quantities of which material and which batches are included in

which transport unit and how the transport units are currently assigned.

Integration

A pre-selection of material, transport unit and of other criteria will be shown as cumulative display of the

batch/ material stock per transport unit. The display will be  accumulated for each material, transport unit

and batch status. Batches with a remaining quantity of 0 will not be accounted for.

Only  those  materials  will  be  accounted  for  that  are  assigned  to  those  material  types,  for  which  the

"inventory management" indicator is not set to No.

Moreover,  only  those  transport  units  will  be  accounted  for,  for  which  the  "inventory  management"

indicator is set to "Y".

Selection parameters

The result of overlapping selection criteria is displayed if several selection criteria are in use.

The following selection criteria are available in the application:

General

Batch number

All materials with the selected batch number will be shown.

Material

All materials with the selected material will be shown.

MPL-MMO_81.docx

Version: 1.0.18468

Page 29 of 32

Material Monitoring

Material type

This  selection  criterion  refers  to  the  material  type  of  the  material.  All  materials  with  the  selected

material type will be shown.

Batch status

This  selection  criterion  refers  to  the  batch  status  of  the  material.  All  materials  with  the  selected

batch status will be shown.

Transport unit

All materials with the selected transport unit will be shown.

Attributes

Attributes 1 - 10

Selecting an attribute as a selection criterion displays all inventories of batches that currently have

this identifier.

Batch attributes

Batch attributes

Selecting a batch attribute as a selection criterion displays all inventories of batches for the material

type of which this batch attribute has been configured and that are currently assigned this identifier.

Alternative batch numbers

Alternative batch number 1-20

Selecting  an  alternative  batch  number  as  a  selection  criterion  displays  all  inventories  of  batches

that currently have this identifier.

Field description

Calculation of the values in the "inventory" category:

Number of batches

Quantity of batches (in line with the stock indicator set to the material type)

Quantity

Sum of yield + scrap

Unit

Yield

Unit from the configuration table TPU – material type

Quantity identified as yield that is in fact included in the "number of batches"

MPL-MMO_81.docx

Version: 1.0.18468

Page 30 of 32

Material Monitoring

Scrap

Quantity identified as scrap that is in fact included in the "Number of batches"

Calc. Quantity

Quantity of material that would fit into the currently assigned transport units:

  Quantity from the configuration TPU material type for this TPU x number of batches

Calc. Quantity of TPU

Quantity of TPU that would be necessary for the total quantity:

Quantity/ (quantity from the configuration TPU material type for this TPU)

The result will be rounded up to the next integer.

Batches that are not assigned to a transport unit will not be accounted for in this evaluation.

MPL-MMO_81.docx

Version: 1.0.18468

Page 31 of 32

12  Applications provided in MOC:

Application

Documentation

Transaction
code

Function
authorization

Material Monitoring

MOC_WarningReport.pdf

warnrp

warnrp

Warning report

Expiry preview

Scrap statistic

MOC_ExpiryPreview.pdf

MOC_ExpiryStatistics.pdf

Batch data overview

MOC_BatchOverview.pdf

Requirements overview

MOC_RequirementsOverview.pdf

Stock overview

MOC_StockOverview.pdf

Stock overview HU

MOC_StockOverviewHU.pdf

stovhu

eprev

estat

batov

reqov

stov

eprev

estat

batov

reqov

stov

stov

MPL-MMO_81.docx

Version: 1.0.18468

Page 32 of 32

