Batch Tracing

1  Batch Tracing

Summary

Menu

Material management  Batch tracing  Batch tracing

Transaction code

battr

Function authorization

battr

Usage

The  application  is  only  available  in  the  structure  described  here  if  the  modification

battrextensionselection is enabled.

If you do not use the modification, please refer to this document.

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

MOC_BatchTracing.docx

Version: 1.1.18468

Page 1 of 3

Batch Tracing

Origin:

When the identifier "Origin" is selected, the overall batch origin/development is determined. The

batch origin displays all of the batches that entered and all of the output batches for the selected

selection criterion (e.g. batch number, material, etc.).

Consumption:

If the "consumption" identifier is selected, all output batches are determined that have been

consumed for the relevant selection criterion (e.g. batch number, material, etc.).

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

MOC_BatchTracing.docx

Version: 1.1.18468

Page 2 of 3

Batch Tracing

If several selection criteria are used overlapping results are displayed in the workplace overview.

Please note:



If  the  batch  number  is  displayed  with  zeroes  (e.g.  0000000000),  there  is  no  input  batch  for  the

batch origin.

Field Descriptions

In the input/output batch detail application, all batches are displayed according to the selections entered.

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

MOC_BatchTracing.docx

Version: 1.1.18468

Page 3 of 3

