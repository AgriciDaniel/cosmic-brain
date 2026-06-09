Manual

Product Documentation
TRT-PDK 8.1

Version 1.0.637

Last changed on: 19.06.2020

Product Documentation

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

TRT-PDK_81.docx

Version: 1.0.18468

Page 2 of 9

Product Documentation

Contents

1  Product Documentation ................................................................................ 4

2  Batch Tracing ............................................................................................... 5

3  Batch History ................................................................................................ 8

TRT-PDK_81.docx

Version: 1.0.18468

Page 3 of 9

Product Documentation

1

 Product Documentation

Overview

Purpose

The Product Documentation function package provides evaluation data  allowing  for tracking on the  one

hand, as well as for collecting information on the lifetime of a batch on the other hand.

Implementation considerations

You use the function package if:

  You intend to track directly within the MES

  You intend to use the function for research purposes, even if tracking is done in another system.

Integration

The application uses data prepared by other applications in course of the data collection process.

Features

  Lot and batch tracking

o  Tabular  presentation  of  batch  tracking  in  consideration  of  the  relevant  incoming  and

outgoing batches

o  Navigation function within batch tracking from raw material to finished product

o  Navigation function within batch tracking from finished product to raw material

  Batch history

o  Tabular presentation of batch history with consistent evidence of all batch and lot usage

as well as corrections and stock transfer

TRT-PDK_81.docx

Version: 1.0.18468

Page 4 of 9

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

TRT-PDK_81.docx

Version: 1.0.18468

Page 5 of 9

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

TRT-PDK_81.docx

Version: 1.0.18468

Page 6 of 9

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

TRT-PDK_81.docx

Version: 1.0.18468

Page 7 of 9

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

TRT-PDK_81.docx

Version: 1.0.18468

Page 8 of 9

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

TRT-PDK_81.docx

Version: 1.0.18468

Page 9 of 9

