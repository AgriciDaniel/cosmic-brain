1  Collection of Serial Numbers at AIP

Collection of Serial Numbers at AIP

Usage

You use the "enter serial number" dialog to enter and track serial numbers in the production process.

Prerequisite

Various configurations have to be made in the system to use the dialog. Further details can be found in

the document dealing with the Description of the configuration to use collection of serial numbers.

"Collection of serial numbers" dialog

The  "enter  serial  number"  dialog  (A_SNR_A)  consists  of  workflows  providing  extensive  possibilities  for

data collection. By default, the dialog includes the following workflow steps:

Workflow step/detailed dialog

Technical name

Usage

Collection of serial numbers

WF_A_SNR_A

This  workflow  step  shows  basic  data  of  the

serial number or the user can enter this data

here.

Merged batch attributes

WF_SNR_ATTR

Entry of batch attributes for the merged batch

Merged batch documents

WF_SNR_DOC

Entry of document links for the merged batch

Serial number data

SNR-DATA

Detailed  dialog

to  enter  additional  data

specific to serial numbers.

The detailed dialog can only be started for a

single serial number.

Depending on the active workflow step, different function keys are provided.

Basically, data is collected in two steps:

  Data collection for serial numbers

Data is collected for serial numbers until a new merged batch can be completed.

Data collection restarts, once a merged batch has been completed.

  Data collection for merged batches

AIP_SNR_Recording.docx

Version: 1.1.18468

Page 1 of 5

Collection of Serial Numbers at AIP

Basically, data is collected for the merged batch when the merged batch is completed; but it may

also be started at an earlier point in time.

The following diagram illustrates the two acquisition cycles:

Workflow step: "collection of serial numbers"

The  workflow  step  "collection  of  serial  numbers"  has  been  designed  to  enter  data  regarding  one  or

several serial numbers.

The dialog shows the following data that cannot be modified:

Workplace

Current workplace as selected in the basic screen of the terminal.

Operation

Currently running operation as selected in the basic screen of the terminal.

Material

Material produced by the operation as laid down in the operation's article/item.

Merged batch

Merged batch number as defined by the system for the next merged batch to be completed.

The user may enter the following data:

AIP_SNR_Recording.docx

Version: 1.1.18468

Page 2 of 5

Collection of Serial Numbers at AIP

Serial number

Subject to the type of serial number collection, the "serial number" field can be used to:

  enter serial numbers manually, instead of selecting them manually from the table of serial

numbers





scan serial numbers, instead of selecting them manually from the table of serial numbers

If serial numbers have to be entered manually, they can be entered or scanned manually.

Staff badge number

Entry of the staff badge number is mandatory.

Quality

The  user  may  define  the  quality.  A  reason  has  to  be  entered  for  the  ratings  "scrap",  "open"  and

"rework".

Material buffer (*1)

The material buffer defined for the machine is suggested as the target material buffer.

Comment (*1)

A comment may be entered for the merged batch.

Transport unit (*1)

Suggests the transport unit that is identified as the default unit in the assignment of material types

to transport units regarding the material type of the operation.

If nothing is assigned, "SYSTEM" is suggested.

Transfer (for each merged batch / all merged batches from now on)

For  the  fields  labeled  with  (*1)  it  may  be  specified  if  they  only  apply  for  the  merged  batch  that  is

currently being processed or for this and all future merged batches of this operation.

This definition applies until the operation is interrupted and/or logged off, even for different shifts.

The table of serial numbers shows the serial numbers of the registered input batch that have not yet been

classified for this operation. The quality status (Q status) of serial numbers may be filtered, provided this

status is set by quality data collection.

Single  serial  numbers  can  be  selected  by  double  clicking  the  table.  Selected  serial  numbers  are

highlighted  at  the  left-hand  side  of  the  table  by  an  "X"  with  green  background.  There  are  also  function

keys for mass selections.

There  is  a  number  of  function  keys  facilitating  dialog  handling,  to  input  data  for  serial  numbers  or  to

complete a posting:

Designation

Usage

AIP_SNR_Recording.docx

Version: 1.1.18468

Page 3 of 5

Collection of Serial Numbers at AIP

Designation

Usage

Close

Complete

Closes the dialog.

The  currently  generated  merged  batch

is  completed

for

the

entered/assessed  serial  numbers.  The  merged  batch  number  is

displayed on the terminal.

If  the  user  confirms  it,  the  dialog  can  be  continued  and  remains

opened to enter additional merged batches.

Select all

All serial numbers displayed in the list of serial numbers are selected.

Unselect all

All  serial  numbers  displayed  in  the  list  of  serial  numbers  are

deselected.

Invert selection

Subject to the current state of selection, the system changes it:

  Selected serial numbers are unselected

  Unselected serial numbers are selected

Serial number data

Detailed  dialog to enter  data specific to serial numbers. The detailed

dialog can only be started for a single serial number.

Next

Leads to the next workflow step

Detailed dialog "serial number data - batch attributes"

Batch  attributes may be entered for the serial  number in  the  "serial  number attributes"  workflow step of

the "serial number data" detailed dialog.

The  "attributes"  function  key  allows  entering  attributes  for  a  batch  or  for  all  serial  numbers.  The  input

dialog suggests all attributes that are assigned the "Capture attribute while generating batch" option in the

configuration of batch attributes regarding the operation's material type.

The "go on" function key allows entering document links for serial numbers.

The  list  only  shows  the  recorded  batch  attributes;  batch  attributes  that  might  already  be

available are not shown.

AIP_SNR_Recording.docx

Version: 1.1.18468

Page 4 of 5

Collection of Serial Numbers at AIP

Workflow step - merged batch attributes

Batch attributes may be entered for the serial number in the "merged batch attributes" workflow step.

The  "attributes"  function  key  allows  entering  attributes  for  the  merged  batch  that  is  currently  being

processed  or  for  this  and  all  future  merged  batches  of  this  operation.  The  input  dialog  suggests  all

attributes  that  are  assigned  the  "Capture  attribute  while  generating  batch"  option  in  the  configuration  of

batch attributes regarding the operation's material type.

The "go on" function key allows entering document links for the serial number.

The list only shows the recorded document links; document links that might already be available

are not shown.

AIP_SNR_Recording.docx

Version: 1.1.18468

Page 5 of 5

