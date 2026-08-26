1  Merging Serial Numbers on the AIP

Merging Serial Numbers on the AIP

Purpose

You use the dialog "Merge serial numbers" to group several  materials that are listed by serial numbers.

These  materials  are  then  listed  under  one  number  and  can  be  used  and  planned  more  easily  in  the

system. The system saves all serial numbers that are merged in one number.

Requirements

You  must make  different  configurations  in  the  system  to  use  the  dialog.  For  further  details,  refer  to  the

document Description of the configuration to use merged serial numbers.

Dialog Merge serial numbers

The "merge serial number" dialog (A_SNR_U) is a workflow dialog, which provides extensive possibilities

for data collection. By default, the dialog includes the following workflow steps:

Workflow step / dialog

Technical name

Purpose

Merge serial numbers

WF_A_SNR_A

This  workflow  step  shows  basic  data  of  the

serial number or the user can enter this data

here.

Merged batch attributes

WF_SNR_ATTR

Recording of batch attributes for the merged

batch

Merged batch documents

WF_SNR_DOC

Recording of document links for the merged

batch

Merge

A_SNR_MARRIED

Dialog  to  identify  and  assign  the  different

ingoing serial numbers

Serial number data

SNR_DATA_MARRIED  Dialog  to  enter  additional  data  specific  to

serial numbers.

The  dialog  can  only  be  started  for  a  single

serial number.

Depending on the active workflow step, different function keys are provided.

AIP_SNR_Union.docx

Version: 1.1.18468

Page 1 of 7

Merging Serial Numbers on the AIP

Basically, data is collected in two steps:

  Merge serial numbers

In  the  first  step  two  or  more  serial  numbers  are  merged.  This  process  is  completed  and  the

"merge serial number" workflow step is opened again showing the superordinate serial number in

the table.

Now either additional serial numbers can be added and merged or further data (batch attributes

and document links) is recorded for an already merged serial number.

  Collection for merged batches

Basically, data is collected for the merged batch when the merged batch is completed; but data

collection can also be started at an earlier point in time.

The following diagram illustrates the two cycles of data collection:

Workflow step: merge serial number

You use the workflow step "Collection of serial numbers" to enter data for one or several serial numbers.

The dialog shows the following data that cannot be modified:

Workplace

Current workplace that is selected in the main view on the terminal.

AIP_SNR_Union.docx

Version: 1.1.18468

Page 2 of 7

Merging Serial Numbers on the AIP

Operation

Currently running operation that is selected in the main view on the terminal.

Material

Material produced by the operation that is specified for the article of the operation.

Merged batch

Number that the system assigns to the next merged batch that is set up.

The user can enter the following data:

Staff badge number

The input of the staff badge number is mandatory.

Quality

The  user  can  specify  the  quality.  You  must  enter  a  reason  for  the  qualities  "scrap",  "open"  and

"rework".

Material buffer (*1)

The material buffer defined for the machine is suggested as the target material buffer.

Comment (*1)

You can enter a comment on the merged batch.

Transport unit (*1)

The system preassigns the transport unit that is identified as default unit for the material type of the

operation in the Assignment material type - transport unit.

If no assignment is available, "SYSTEM" is entered.

Transfer of data (for each merged batch / all merged batches from now on)

For the fields labeled with (*1), you can specify if the field specifications only apply for the merged

batch that is currently being processed or for this and all future merged batches of this operation.

This definition applies until the operation is interrupted and/or logged off, also if the shift changes.

The  serial  number  table  shows  the  superordinate  serial  numbers  that  have  already  been  merged  and,

therefore, are part of the currently running merged batch.

Single serial numbers can be selected in the table by clicking on the relevant row.

The  button  bar  provides  several  function  buttons.  Using  the  buttons,  you  can  record  data  for  a  serial

number or complete a posting:

Designation (name)

Purpose

AIP_SNR_Union.docx

Version: 1.1.18468

Page 3 of 7

Merging Serial Numbers on the AIP

Designation (name)

Purpose

Close

Closes the dialog.

Already merged serial numbers remain.

Complete

The  currently  generated  merged  batch

is  completed

for

the

entered/merged  serial  numbers.  The  merged  batch  number  is

displayed on the terminal.

If the user confirms it, the dialog remains open and the user can enter

additional data for merged batches.

Merge

Dialog to select and assign serial numbers that are to be merged.

Serial number data

Dialog  to  enter  data  for  a  specific  serial  number.  You  can  call  the

dialog for one specified serial  number only. The number can also be

the number of an already merged serial number from the grid of serial

numbers.

Next

Continues with the next workflow step

Dialog "Merge"

In  the  dialog  "Merge",  the  ingoing  serial  numbers  (of  the  available  merged  batches)  are  identified,

grouped  and  transferred  to  the  superordinate  serial  number.  You  must  call  the  dialog  for  each

superordinate serial number and enter the data in the dialog.

You must enter the following data:

Superordinate serial number

A selection list opens where the available, superordinate serial numbers may be chosen. You can

identify the superordinate serial number via the identifier Superordinate SNR = Superordinate in the

component list.

Assigned serial number

A selection list opens where you can select the available, ingoing serial numbers. All serial numbers

of  the  registered  merged  batches  are  offered  that  have  not  yet  been  assembled  and  that  do  not

pertain to the superordinate serial number.

1 – n serial numbers can be selected and taken over.

AIP_SNR_Union.docx

Version: 1.1.18468

Page 4 of 7

Merging Serial Numbers on the AIP

Overview grid

The  table  shows  the  selected  serial  numbers  that  are  to  be  merged.  For  each  serial  number  it  is

obvious if it is a superordinate serial number or an ingoing serial number.

The button bar provides several function buttons:

Designation

Purpose

(name)

Cancel

Exits the dialog without modifying, accepting or posting of data.

Accept

If the superordinate serial number or assigned serial number is entered manually

in the input field, this function key takes it over in the overview grid.

Delete

The  entire  assignment  is  deleted.  A  new  assignment  process  may  be  started

directly after deletion.

Complete

Directly posts the assignment made.

The  assignment  is  posted  on  the  terminal  and  server,  once  it  has

been  completed.  Corrections  can  only  be  made  via

the

Separating/Rebuilding Serial Numbers dialog.

Dialog "serial number data - batch attributes"

Batch  attributes may be entered for the serial  number in  the  "serial  number attributes"  workflow step of

the "serial number data" dialog.

The  "attributes"  function  key  allows  entering  attributes  for  a  batch  or  for  all  serial  numbers.  The  input

dialog  lists  all  attributes  where  the  option  "Capture  attribute  while  generating  batch"  is  enabled  for  the

material type in the Configuration of the batch attributes.

You can use the function key "Continue" to record document links for the serial number.

The list only shows recorded batch attributes. Other available batch attributes are not shown.

Dialog "serial number data – document links"

You can specify document links for a serial number using the dialog "serial number data", workflow step

"document links".

AIP_SNR_Union.docx

Version: 1.1.18468

Page 5 of 7

The user selects one of the following input options:

o  For each serial number

Merging Serial Numbers on the AIP

If this option is enabled, the entered document links are only saved for this serial number.

The  entered  document  links  are  stored  and  suggested  the  next  time  a  serial  number  is

recorded.

o  All serial numbers in this merged batch

If  this  option  is  enabled,  the  entered  document  links are  saved  for  all  serial  numbers  of

this merged batch. The entered document links are stored and suggested the  next time

when  the  serial  numbers  for  a  merged  batch  are  recorded.  It  is  helpful  to  enable  this

option  when  you  start  to  record  document  links.  This  way,  all  serial  numbers  in  the

merged  batch  include  the  document  links  and  you  need  not  specify  the  links  for  each

serial number.

The list only shows the document links recorded in this process. If document links of the serial

number are inherited from previous processes, these links are not shown.

You only use this dialog to record document links and not to show the links. You can display all

document  links  that  are  available  for  a  serial  number  or  a  batch/merged  batch  if  you  call  the

batch information (if configured accordingly in the document management).

You can only use this dialog to record document links (URL). Another function is currently not

available.

Workflow step - merged batch attributes

You can use the workflow step "merged batch attributes" to record batch attributes for merged batches.

You can use the "attributes" function key to enter attributes for the merged batch that is currently being

processed or for this and all future merged batches of this operation. The input dialog lists all attributes

where  the  option  "Capture  attribute  while  generating  batch"  is  enabled  for  the  material  type  in  the

Configuration of the batch attributes.

You can use the function key "Continue" to record document links for the merged batch.

The list only shows document links recorded, document links that might already be available are

not shown.

Workflow step - merged batch documents

You  can  record  document  links  for  a  merged  batch  in  the  workflow  step  "document  links"  of  the  dialog

main view.

AIP_SNR_Union.docx

Version: 1.1.18468

Page 6 of 7

Merging Serial Numbers on the AIP

The user selects one of the following input options:

o  For each merged batch

If this option is enabled, the entered document links are saved for this merged batch only.

The  entered  document  links  are  stored  and  suggested  the  next  time  a merged  batch  is

recorded.

o  All merged batches from now on

If  this  option  is  enabled,  the  entered  document  links  are  saved  for  the  current  merged

batch. And the values are saved for all further merged batches (that are generated from

now on)

The list only shows the document links recorded in this process. If document links are inherited

from previous processes, these links are not shown.

You only use this dialog to record document links and not to show the links. You can display all

document  links  that  are  available  for  a  serial  number  or  a  batch/merged  batch  if  you  call  the

batch information (if configured accordingly in the document management).

You can only use this dialog to record document links (URL). Another function is currently not

available.

AIP_SNR_Union.docx

Version: 1.1.18468

Page 7 of 7

