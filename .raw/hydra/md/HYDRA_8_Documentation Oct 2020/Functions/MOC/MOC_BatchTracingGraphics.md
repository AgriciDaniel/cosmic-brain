Graphic Batch Tracing

1  Graphic Batch Tracing

Summary

Menu

Material management  Batch tracing  Graphic batch tracing

Transaction code

battrg

Function authorization

battrg

Usage

The  application  is  only  available  in  the  structure  described  here  if  the  modification

battrgextensionselection is enabled.

If you do not use the modification, please refer to this document.

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

MOC_BatchTracingGraphics.docx

Version: 1.4.18468

Page 1 of 4

Graphic Batch Tracing

Direct I/O batches

Only  directly  connected  input  and/or  output  batches  are  shown  for  the  entered  batch.  This

configuration is set by default.

Initial/final batches

All linked input or output batches matching the entered batch are shown up to the origin and/or end

of the process.

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

MOC_BatchTracingGraphics.docx

Version: 1.4.18468

Page 2 of 4

Graphic Batch Tracing

Detail application "Batch tracing"

Order

Order number of the selected batch

Workplace

Workplace number of the selected batch

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

MOC_BatchTracingGraphics.docx

Version: 1.4.18468

Page 3 of 4

Graphic Batch Tracing

 Status change

Date of the most recent status change of the selected batch

Quantity

Original quantity of the selected batch

Manufacturing date

Manufacturing date of the selected batch

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

MOC_BatchTracingGraphics.docx

Version: 1.4.18468

Page 4 of 4

