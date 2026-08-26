Manual

Material Monitoring
MPL-MMO 8.2

Version 1.0.23049

Last changed on: 02.09.2020

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

MPL-MMO_82.docx

Version: 1.0.23049

Page 2 of 18

Material Monitoring

Contents

1  Material Monitoring ....................................................................................... 4

2  Applications Available in MOC ..................................................................... 6

3  Configuration of Minimum Storage Times and Expiry Durations ................. 7

4  Activating Material Monitoring ...................................................................... 8

5  Monitoring Availability Dates ...................................................................... 10

6  Warning Report .......................................................................................... 11

7  Expiry Preview ........................................................................................... 15

8  Expiry Statistics .......................................................................................... 17

MPL-MMO_82.docx

Version: 1.0.23049

Page 3 of 18

Material Monitoring

1  Material Monitoring

Summary

Purpose

The  Material  Monitoring  function  package  extends  Material  and  Production  Logistics  and/or  Tracking  &

Tracing  by  functions  for  monitoring  minimum  storage  periods  and/or  minimum  shelf  lives  and

consequently contributes to increasing process security.

Implementation Considerations

You  use  the  Material  Monitoring  function  package  if  you  apply  the  Material  and  Production  Logistics

and/or Tracking & Tracing function packages, and

  need to secure compliance with the shelf lives of incoming raw materials;

  need  to  secure  compliance  with  minimum  shelf  lives  for  semi-finished  products  and/or  WIP

material;

  need  to  secure  minimum  storage  times  for  semi-finished  products  and/or  WIP  material  within

production.

Integration

This function package is integrated in the function packages Material and Production Logistics as well as

Tracking & Tracing, by:

  extending the "batch" object by production and shelf life data;



verifying the minimum shelf life when incoming batches are registered.

Features

  Monitoring of expiration and warning times

o  Batch and lot-related monitoring of dates and periods

  Warning report

o  Warning  report  of  all  lots  and  batches  whose  warning  date  and/or  expiration  date  has

been exceeded or will be reached at the evaluation day.

  Expiration statistics

o  Expiration  statistics  including  evaluation  as  to  which  material  quantities  have  expired

and/or will regularly expire in a given period (table and graph).

  Expiry preview

MPL-MMO_82.docx

Version: 1.0.23049

Seite 4 von 18

Material Monitoring

o  Expiry preview including indication as to when which material quantities will have expired,

including  a  forecast  of  material  expiring  on  basis  of  the  present  inventory  (table  and

graph)

MPL-MMO_82.docx

Version: 1.0.23049

Seite 5 von 18

Material Monitoring

2  Applications Available in MOC

Application

Documentation

Transaction
code

Function
authorization

Warning report

Expiry preview

Expiry statistics

MOC_WarningReport.pdf

warnrp

warnrp

MOC_ExpiryPreview.pdf

MOC_ExpiryStatistics.pdf

eprev

estat

eprev

estat

MPL-MMO_82.docx

Version: 1.0.23049

Seite 6 von 18

3  Configuration of Minimum Storage Times and Expiry

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

MPL-MMO_82.docx

Version: 1.0.23049

Seite 7 von 18

Material Monitoring

4  Activating Material Monitoring

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

MPL-MMO_82.docx

Version: 1.0.23049

Seite 8 von 18

Material Monitoring

MPL-MMO_82.docx

Version: 1.0.23049

Seite 9 von 18

Material Monitoring

5  Monitoring Availability Dates

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

MPL-MMO_82.docx

Version: 1.0.23049

Seite 10 von 18

Material Monitoring

6  Warning Report

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

MPL-MMO_82.docx

Version: 1.0.23049

Seite 11 von 18

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

MPL-MMO_82.docx

Version: 1.0.23049

Seite 12 von 18

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

MPL-MMO_82.docx

Version: 1.0.23049

Seite 13 von 18

Material Monitoring

Transport unit

Transport unit of the batch

Person

Person, who processed the batch.

Field 1 - 10

Specific batch data (optional)

Production order

Production order, from which the batch was created.

MPL-MMO_82.docx

Version: 1.0.23049

Seite 14 von 18

Material Monitoring

7  Expiry Preview

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

MPL-MMO_82.docx

Version: 1.0.23049

Seite 15 von 18

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

MPL-MMO_82.docx

Version: 1.0.23049

Seite 16 von 18

Material Monitoring

8  Expiry Statistics

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

MPL-MMO_82.docx

Version: 1.0.23049

Seite 17 von 18

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

MPL-MMO_82.docx

Version: 1.0.23049

Seite 18 von 18

