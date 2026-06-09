Manual

Graphic Batch/Lot Tracking
TRT-GLV 8.1

Version 1.0.637

Last changed on: 19.06.2020

Graphic Batch/Lot Tracking

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

TRT-GLV_81.docx

Version: 1.0.18468

Page 2 of 8

Graphic Batch/Lot Tracking

Contents

1  Graphical Batch/Lot Tracking ....................................................................... 4

2  Graphic Batch Tracing ................................................................................. 5

TRT-GLV_81.docx

Version: 1.0.18468

Page 3 of 8

Graphic Batch/Lot Tracking

1  Graphical Batch/Lot Tracking

Overview

Purpose

The Graphical Batch/Lot Tracking function package provides a graphical presentation for tracking.

Implementation considerations

You use the Graphical Batch/Lot Tracking function package if you intent to perform tracking in the MES

yourself.

Features

  Evaluation of graphical batch tracking

o  Graphical presentation (tree structure) for evidencing the creation of lots and batches

  Forward tracking

o  Optional representation of direct outgoing lots and/or batches developed from a material

and/or intermediate product, or illustration of overall lot and batch history to the finished

product

  Backward tracking

o  Optional  representation  of  direct  incoming  lots  and/or  batches  user  for  an  intermediate

and/or finished product, or illustration of overall lot and batch history beginning from the

incoming material

  Consideration of batch archive

TRT-GLV_81.docx

Version: 1.0.18468

Seite 4 von 8

Graphic Batch/Lot Tracking

2  Graphic Batch Tracing

Summary

Menu

Material management  Batch tracing  Graphic batch tracing

Transaction code

battrg

Function authorization

battrg

Usage

The graphic evaluation is to be used to determine, with regard to the output batches, which input batches

have entered and with regard to input batches, which output batches they have entered into.

Depending  on  the  selection,  only  the  direct  predecessors  (batch  origin)  or  the  direct  successors  (batch

consumption) are shown or all predecessors or successors. Here only those batches are considered that

were generated in the specified period.

Selection Criteria

The application provides the following selection criteria:

General

Batch number

Displayed data can be restricted to a specific batch number.

Origin

Batch origin/development indicates all batches contributing to the selected batch.

Consumption

Batch  consumption  indicates  all  of  the  produced  output  batches  for  the  selected  batch.  This

configuration is set by default.

Direct I/O batches

Only  directly  connected  input  and/or  output  batches  are  shown  for  the  entered  batch.  This

configuration is set by default.

Initial/final batches

All linked input or output batches matching the entered batch are shown up to the origin and/or end

of the process.

TRT-GLV_81.docx

Version: 1.0.18468

Seite 5 von 8

Graphic Batch/Lot Tracking

Date from ... to ...

All produced input and output batches in the selected period are displayed.

Consider long-term data

Data from the long-term archive is selected as well.

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

Field Descriptions

Graphic batch tracing

Batch number

Display of the batch numbers, including batches that entered and output batches in a tree structure.

Material number

Shows the material number for the batch.

Material designation

Displays the material name for the batch.

Detail application "Batch tracing"

Order

Order number of the selected batch

Workplace

Workplace number of the selected batch

TRT-GLV_81.docx

Version: 1.0.18468

Seite 6 von 8

Graphic Batch/Lot Tracking

Short name

Short designation of the workplace of the selected batch

Designation

Workplace designation of the selected batch

Input batch

Input batch pertaining to the selected batch

Output batch

Output batch pertaining to the selected batch

Logon

Logon time of the selected batch

Logoff

Logoff time of the selected batch

Detail application "Batch information"

Batch number

Batch number of the selected batch. This number may exist several times in the system.

Internal batch number

System-wide unique batch number of the selected batch.

Material

Material number of the selected batch

Material designation

Material designation of the selected batch

Batch status

Batch status of the selected batch

Material type

Material type of the selected batch

Person

Person associated with the selected batch

 Status change

Date of the most recent status change of the selected batch

Quantity

Original quantity of the selected batch

Manufacturing date

Manufacturing date of the selected batch

TRT-GLV_81.docx

Version: 1.0.18468

Seite 7 von 8

Graphic Batch/Lot Tracking

Remaining quantity

Current remaining quantity of the selected batch

Availability date

Availability date of the selected batch

Unit

Quantity unit of the selected batch

Expiration date

Expiry date of the selected batch

Detail application "batch attributes"

Designation

Designation

Value

Value

Unit

Unit

"Batch history" detailed application

Past  events  recorded  for  the  batch  are  shown  in  this  detailed  application.  The  detailed  application  is

identical to the main application "batch history".

This detail application provides the possibility to trace back events about demounting/mounting

components  for  a  superordinate  batch  (serial  number).  But  the  main  application  does  not

provide this function.

TRT-GLV_81.docx

Version: 1.0.18468

Seite 8 von 8

