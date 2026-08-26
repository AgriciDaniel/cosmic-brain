Manual

Graphic Batch Tracing
TRT-GLV 8.2

Version 1.0.23049

Last changed on: 2 September 2020

Graphic Batch Tracing

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

TRT-GLV_82.docx

Version: 1.0.23049

Page 2 of 10

Graphic Batch Tracing

Contents

1  Graphic Batch Tracing ................................................................................. 4

2  Graphic Batch Tracing ................................................................................. 5

3  Graphic Batch Tracing ................................................................................. 7

TRT-GLV_82.docx

Version: 1.0.23049

Page 3 of 10

Graphic Batch Tracing

1  Graphic Batch Tracing

Purpose

The Graphic Batch Tracing function package provides a graphical presentation for tracking.

Implementation Considerations

You  use  the  Graphic  Batch  Tracing  function  package  if  you  intend  to  perform  tracking  in  the  MES

yourself.

Features

  Evaluation of graphic batch tracing

o  Graphical presentation (tree structure) for evidencing the creation of lots and batches

  Forward tracking

o  Optional  representation  of  direct  output  batches  developed  from  a  material  and/or

intermediate product, or illustration of overall batch history to the finished product.

  Backward tracking

o  Optional  representation  of  direct  input  batches  used  for  an  intermediate  and/or  finished

product, or illustration of overall batch history beginning from the input material.

  Consideration of batch archive

TRT-GLV_82.docx

Version: 1.0.23049

Page 4 of 10

Graphic Batch Tracing

2  Graphic Batch Tracing

Usage

Graphic  batch  tracing  is  used  to  represent  the  relations  between  the  input  batches  incorporated  in  a

process and the resulting output batches as tree diagram.

Procedure

When using the graphic batch tracing application, it is especially important to consider which batch links

and relations are of interest to the user.

The direction and depth of information are decisive factors.

Possible directions are:

  Going through the batch chain from the beginning to the end

The  "consumption"  option  must  be  selected  if  the  user  is  interested  in  the  successive

consumption of batches within their process chain.

  Going through the batch chain from the end of the batch chain to the beginning

The user is interested in the development process starting from the output batch and tracing back

to the input batches used in the very first process.

Possible levels of information are:

  Direct predecessor/successor level

Only one level or relationship/cross connection of batches may be considered.

  All predecessor/successor levels

All levels or relations of batches may be considered.

Consequently, the right direction and depth of information is important for the analysis and the selection

has to be chosen logically (last but not least because of the data volume that might accrue).

  No view or direction (development/consumption) selected

If the direction is not selected specifically, the default system values will be used. Here all input

batches are displayed in relation to the output batches they derived from.

  View or direction selected

o

"Origin" checkbox (direction of output batches --> input batches)

For  the  entered  batch  all  integrated  input  batches  from  the  preceding  level  (preceding

process) are shown.

TRT-GLV_82.docx

Version: 1.0.23049

Page 5 of 10

Graphic Batch Tracing

If  the  "initial/final  batches"  field  is  still  selected,  all  affected  input  batches  spanning  all

levels/processes up to the origin are shown.

o

"Consumption" check (direction: input batches --> output batches)

For  the  entered  batch,  all  output  batches  resulting  for  the  direct  subsequent  level  are

displayed.

If  the  "determination  of  initial  batches"  field  is  still  selected,  all  affected  output  batches

spanning several levels/processes up to the end or the last level are shown.

The "consumption" option and the "Direct input/output batches" checkbox are set by default in

the system.

TRT-GLV_82.docx

Version: 1.0.23049

Page 6 of 10

Graphic Batch Tracing

3  Graphic Batch Tracing

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

TRT-GLV_82.docx

Version: 1.0.23049

Page 7 of 10

Graphic Batch Tracing

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

TRT-GLV_82.docx

Version: 1.0.23049

Page 8 of 10

Graphic Batch Tracing

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

TRT-GLV_82.docx

Version: 1.0.23049

Page 9 of 10

Graphic Batch Tracing

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

TRT-GLV_82.docx

Version: 1.0.23049

Page 10 of 10

