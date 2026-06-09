Graphic Batch Tracing

1  Graphic Batch Tracing

Usage

The  application

is  only  available

in

the  structure  described

if

the  modification

battrgextensionselection is enabled.

If you do not use the modification, please refer to this documentation.

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

Consequently, the right direction and depth of information is important for the analysis and  the selection

has to be chosen logically (last but not least because of the data volume that might accrue).

  No view or direction (development/consumption) selected

MBL_BatchTracingGraphics.docx

Version: 1.1.1362

Page 1 of 2

Graphic Batch Tracing

If the direction is not selected  specifically, the default system values will be used. Here all input

batches are displayed in relation to the output batches they derived from.

  View or direction selected

o

"Origin" checkbox (direction of output batches --> input batches)

For  the  entered  batch  all  integrated  input  batches  from  the  preceding  level  (preceding

process) are shown.

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

MBL_BatchTracingGraphics.docx

Version: 1.1.1362

Page 2 of 2

