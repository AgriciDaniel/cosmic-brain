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

This evaluation is to be used to determine, with regard to the output batches, which input batches have

entered  and  with  regard  to  input  batches,  which  output  batches  they  have  entered  into.  The  direct

predecessors (batch origin) and the direct successors (batch consumption) are shown.

The batch quantity for which batch tracing is to be performed can be specified by the exclusive entry of

the  machine  number,  order  number,  material  number  or  batch  number.  Here  only  those  batches  are

considered that were generated in the specified period.

Selection criteria

The following selection criteria are available in the application:

Batch

Direct input/ output batches:

When the identifier "Direct input/output batches" is selected, the input batches that entered directly

and/or the output batches that were produced directly from the input are displayed.

Origin:

When the identifier "Origin" is selected, the overall batch origin is determined. In this way, the batch

origin displays all of the batches that entered and all of the output batches for the selected batch.

Consumption:

When the identifier "Consumption" is selected, all of the output batches for the selected batch are

displayed for which this batch was consumed.

In addition, a limitation can be made reflecting a specific batch number.

Point in time

All produced input and output batches in the selected period are displayed.

MOC_BatchTracing_01.docx

Version: 1.1.18468

Page 1 of 3

Batch Tracing

Workplace

All produced input and output batches for the selected workplace are displayed.

Item

All produced input and output batches for the selected item are displayed.

If several selection criteria are used overlapping results are displayed in the workplace overview.

Notes:



If  the  batch  number  is  displayed  with  zeroes  (e.g.  0000000000),  there  is  no  input  batch  for  the

batch origin.

  When  the  selections  workplace  and  item  are  made,  only  batch  relationships  with  existing  input

batches are shown.

Field descriptions

In the input/output batch detail application, all batches are displayed according to the selections entered.

The selected columns are described in the following:

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

Name

Plain text of the material

Production date/ Logon or logoff date

Production date and time for output batches

Logon or logoff date and time for input batches

MOC_BatchTracing_01.docx

Version: 1.1.18468

Page 2 of 3

Serial number

Assigned  serial  numbers  for  this  batch.  The  ADE-SNR  functionality  can  be  used  to  establish  a

connection between a batch and a serial number.

Batch Tracing

Toolbar

 Graphic batch tracing

Starts the application graphic batch tracing.

MOC_BatchTracing_01.docx

Version: 1.1.18468

Page 3 of 3

