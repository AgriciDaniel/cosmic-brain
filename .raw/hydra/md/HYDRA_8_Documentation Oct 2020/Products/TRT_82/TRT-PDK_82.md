Manual

Product Documentation
TRT-PDK 8.2

Version 1.0.23049

Last changed on: 2 September 2020

Product Documentation

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

TRT-PDK_82.docx

Version: 1.0.23049

Page 2 of 11

Product Documentation

Contents

1  Product Documentation ................................................................................ 4

2  Batch Tracing ............................................................................................... 5

3  Batch History ................................................................................................ 8

1  Batch Logs ................................................................................................. 10

TRT-PDK_82.docx

Version: 1.0.23049

Page 3 of 11

Product Documentation

1

 Product Documentation

Purpose

The Product Documentation function package provides evaluation data  allowing  for tracking on the  one

hand, as well as for collecting information on the lifetime of a batch on the other hand.

Implementation Considerations

You use the function package if:

  You intend to track directly within the MES

  You intend to use the function for research purposes, even if tracking is done in another system.

Integration

The application uses data prepared by other applications in course of the data collection process.

Features

  Batch tracing

o  Tabular  presentation  of  batch  tracking  in  consideration  of  the  relevant  input  and  output

batches

o  Navigation function within batch tracing from raw material to finished product

o  Navigation function within batch tracing from finished product to raw material

  Batch history

o  Tabular presentation of batch history with consistent evidence of all used batches as well

as corrections and stock transfers

TRT-PDK_82.docx

Version: 1.0.23049

Page 4 of 11

Product Documentation

2  Batch Tracing

Summary

Menu

Material management  Batch tracing  Batch tracing

Transaction code

battr

Function authorization

battr

Usage

This evaluation is to be used to determine, with regard to the output batches, which input batches have

entered  and  with  regard  to  input  batches,  which  output  batches  they  have  entered  into.  The  direct

predecessors (batch origin) and the direct successors (batch consumption) are shown.

The batch quantity for which batch tracing is to be performed can be specified by the exclusive entry of

the  machine  number,  order  number,  material  number  or  batch  number.  Here  only  those  batches  are

considered that were generated in the specified period.

Selection Criteria

The application provides the following selection criteria.

General

Evaluation mode

The evaluation mode can be used to select which one of the below-mentioned selection criteria is

used:

  Batch number

  Material

  Workplace

  MES order number

Origin:

When the identifier "Origin" is selected, the overall batch origin/development is determined. The

batch origin displays all of the batches that entered and all of the output batches for the selected

selection criterion (e.g. batch number, material, etc.).

Consumption:

If the "consumption" identifier is selected, all output batches are determined that have been

consumed for the relevant selection criterion (e.g. batch number, material, etc.).

TRT-PDK_82.docx

Version: 1.0.23049

Page 5 of 11

Product Documentation

Direct input/ output batches:

When the identifier "Direct input/output batches" is selected, the input batches that entered directly

and/or the output batches that were produced directly from the input are displayed.

Initial/final batches

All  linked  input  or  output  batches  matching  the  entered  selection  criterion  (e.g.  batch  number,

material, etc.) up to the origin and/or end of the process are shown.

Date from ... to ...

All produced input and output batches in the selected period are displayed.

Consider long-term data

Data from the long-term archive are selected as well.

Attributes

Attributes 1 - 10

Selecting an attribute as a selection criterion displays all links/relationships of batches that currently

have this identifier.

Batch attributes

Batch attributes

Selecting a batch attribute as a selection criterion displays all links/relationships of batches for the

material type of which this batch attribute has been configured and that are currently assigned this

identifier.

Alternative batch numbers

Alternative batch number 1-20

Selecting  an  alternative  batch  number  as  a  selection  criterion  displays  all  relationships/links  of

batches that currently have this identifier.

If several selection criteria are used overlapping results are displayed in the workplace overview.

Please note:



If  the  batch  number  is  displayed  with  zeroes  (e.g.  0000000000),  there  is  no  input  batch  for  the

batch origin.

TRT-PDK_82.docx

Version: 1.0.23049

Page 6 of 11

Field Descriptions

In the input/output batch detail application, all batches are displayed according to the selections entered.

Product Documentation

A selection of columns are described below:

Input batch

Input batch number

Output batch

Output batch number

Workplace

Workplace at which the batch was generated

Material type

Material type of the batch

Material

Material number of the batch

Designation

Plain text of the material

Production date/ Logon or logoff date

Production date and time for output batches

Logon or logoff date and time for input batches

Serial number

Assigned  serial  numbers  for  this  batch.  The  ADE-SNR  functionality  can  be  used  to  establish  a

connection between a batch and a serial number.

Toolbar

 Graphic batch tracing

Starts the application Graphic batch tracing.

TRT-PDK_82.docx

Version: 1.0.23049

Page 7 of 11

Product Documentation

3  Batch History

Summary

Menu

Material management  Batch tracing  Batch history

Transaction code

bathi

Function authorization

bathi

Usage

You use the "batch history" function to show all changes made to a batch.

Integration

Any  changes  made  to  batch  data  are  documented  in  HYDRA.  This  applies  both  to  changes  made

manually  in  the  system,  and  to  modifications  arising  from  the  production  flow  (e.g.  a  change  of  status

after  batch  processing  or  following  expiry  of  minimum  storage  time).  This  allows  modifications  to  batch

data to be traced.

Modifications  or  logging  may  be  selected  by  entering  the  compulsory  batch  number  and  an  evaluation

period. A chronological list is then displayed showing all changes made to the selected batch.

Selection criteria

The application provides the following selection criteria:

Batch number

Shows the batch history for the selected batch number

Material buffer

Shows the batch history for the selected material buffer

Operation

Shows the batch history for the selected operation

Created ... until ...

Shows data of the batch history coinciding with the selected date

Field Descriptions

In addition to standard batch data, the following information is displayed:

TRT-PDK_82.docx

Version: 1.0.23049

Page 8 of 11

Product Documentation

Event

Event posted at the point in time indicated; e.g.:

  Entry as GR batch entry



Input batch logon/logoff

  Output batch logon/logoff

  Material consumption

  Goods movements

  Create and change batches

  Create and change serial numbers

Date/time

Point in time of modification

Editor

Person who made the modification to the batch data.

Serial number

Serial number assigned to a batch that is managed as serial number.

Toolbar

 Graphic batch tracing

Starts the application Graphic batch tracing.

TRT-PDK_82.docx

Version: 1.0.23049

Page 9 of 11

Product Documentation

1  Batch Logs

Summary

Menu

Material management  Batch tracing  Batch logs

Transaction code

batlog

Function authorization

batlog

Usage

 This function is used to display the recorded log data with respect to a batch and evaluate it accordingly.

No provisions are made for modifying existing log data.

Selection criteria

The following selection criteria are available in the application:

Batch

Batch number

Order/ OP

Order number or combined order/ OP number in order for all logs within an order to be displayed.

Machine

Machine/ workplace in order for all logs for a specified machine to be displayed.

Reason

Number of the reason for the error according to configuration.

Recording time

Period in which the log data are to be selected.

Field descriptions

Batch

Batch for which the log record was recorded.

Internal batch number

Internal batch number for which the log record was recorded.

Order

Order during which the log record was recorded.

Machine

Machine at which the log record was recorded.

TRT-PDK_82.docx

Version: 1.0.23049

Page 10 of 11

Product Documentation

Reason, reason texts

Recorded reason as well as reason text according to configuration

Comment

Recorded comment.

Running meter from/to

Running meter position/ area for which the log record was recorded.

Personnel number, date

Personnel number of the person that recorded the log record as well as the date on which the log

record was recorded by the worker.

Originator, date

Most recent originator of the log record as well as the date of the most recent modification.

Scrap

Reserved.

Error message was generated

Reserved.

Reference

Reserved.

Daughter reels (optional)

Reserved.

Attribute 1-5, parameter 1,2

Reserved for customer-specific additions

TRT-PDK_82.docx

Version: 1.0.23049

Page 11 of 11

