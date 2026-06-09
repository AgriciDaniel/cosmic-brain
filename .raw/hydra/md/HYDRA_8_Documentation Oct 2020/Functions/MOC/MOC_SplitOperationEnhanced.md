Enhanced Split Function

1  Enhanced Split Function

Purpose

You  use  the  split  function  if  you  would  like  to  shorten  the  lead  time  of  operations  or  you  would  like  to

improve the capacity utilization of several workplaces/machines available for production.

In contrast to the simple split function, the enhanced split function provides the following features:

  You can split an operation into split operations with different target quantities and setup times.

  You can split an operation that has already been split (split operation) into further split operations with

different target quantities and setup times.

  You can delete individual splits.

Integration

This function splits an operation into two or more operations. An operation can be split using the following

functions:

  Order sequencing.

  Edit operations.

  Graphic Planning: can be called via the context menu of the operation.

Data is always uploaded to the PPS/ERP system according to the order/operation number of the original

operation.

Requirements

An operation can only be split if the following conditions are met:

  The length of the split number is set to 1 (maximum 9 splits) or 2 (maximum 99 splits) in the Basic

settings.



In the Basic settings, you must set the option "Enhanced split function" to "J - Yes".

  The option "May be split" is set for the operation and the field "Max. number of splits" includes a

value greater than 2.

  The operation to be split cannot be a merged operation.

You can also split operations that require batch management. This function is only available if

the extension splitmplop is enabled.

MOC_SplitOperationEnhanced.docx

Version: 1.7.18468

Page 1 of 8

Split operation

Function authorization

op.split

Enhanced Split Function

You can split an operation using the function "split operation"

.

To perform splits, select the respective operation and start the split function using the context menu or by

clicking  the  respective  button.  A  dialog  opens  where  the  planner  may  define  into  how  many  operations

the operation is to be split and what quantities are planned for each split operation.

Field description of "split operation"

The dialog shows different information depending on whether the operation is split for the first time or if

splitting is performed for an operation that has already been split.

In the field descriptions below, it is specified for each field if the field is available when the OP is

(1)  split for the first time or

(2)  when the OP is further split.

MES order number (1) (2)

Operation  that  you  want  to  split.  In  case  of  a  first  split,  it  is  the  operation  that  may  be  split  (split

master); for the following splits, it is the split master.

Target quantity (P) (1) (2)

Target  quantity  and  unit  of  the  split  master  according  to  the  specifications  made  in  the  pool  of

orders.  The  target  quantity  and  the  other  quantities  generally  refer  to  the  primary  quantity  of  the

operation.

Actual quantity (1) (2)

(Yield)  quantity  that  has  been  uploaded/confirmed  so  far.  This  quantity  is  entered  for  the  split

operations. The quantity is also used to update the split master status.

It  includes  the  actual  quantity  of  operations  that  have  already  been  finished  as  well  as  the  actual

quantity of running or interrupted operations.

Remaining quantity for split OPs (1) (2)

For all split OPs that have not yet been finished (split OPs with control indicator S, V, L or U) with

the  difference  resulting  from  "target  quantity  minus  actual  quantity"  being  >  0:  sum  total  of

remaining quantities.

MOC_SplitOperationEnhanced.docx

Version: 1.7.18468

Page 2 of 8

Operations with a difference between target quantity and actual quantity that is less than 0 are not

used. This difference results from overproduction. Such a surplus is no longer produced and, as a

Enhanced Split Function

result, no longer used for further splitting.

Difference (1) (2)

This quantity results from:

"Target quantity“ (P) minus "actual quantity“ minus "remaining quantity of split OPs“

If  this  quantity  is  unequal  0,  the  text  "DIFFERENCE"  is  shown  in  red.  You  can  therefore  easily

identify whether/when the target quantity of the split master is entirely distributed.

Max. number of splits (1) (2)

The maximum number of splits defined for the split master.

Previous number of splits (1) (2)

Number of splits that have been performed so far. This number specifies the total number of split

operations and the splits that must be performed (splits included in the list)

Remaining run time (1) (2)

Remaining run time of the split master according to the remaining run time formula.

Setup time (1) (2)

Target setup time of the split master according to the specifications made in the pool of orders. The

setup time is taken over into the list during splitting and can be adjusted there individually for each

split.

The information listed above generally refers to the operation to be split or to the split master, provided

that the operation has already been split.

If the operation has already been split, i.e. it is now the split master, the below-mentioned information is

shown for the split operation that is used for further splitting. If the operation is split for the first time, these

fields are not displayed:

Split OP (2)

Split operation that is to be split or that is to be used for further splitting.

Target quantity (P) (2)

Target quantity of the split operation.

Actual quantity (2)

(Yield) quantity uploaded/confirmed so far for this split operation

MOC_SplitOperationEnhanced.docx

Version: 1.7.18468

Page 3 of 8

Interactive input options of the planner

If you enter the "number of splits" and, if required, the quantity that you want to split, and if you then press

the "split" button, the splits are generated in the list. You can still change the target quantity and the setup

Enhanced Split Function

time.

Number of splits (1) (2)

Planners can now specify how many splits they want to create.

By  default,  the  field  is  assigned  the  number  of  splits  that  are  still  possible  (maximum  number  of

splits minus current number of splits).

Quantity to be split (1) (2)

In  addition,  the  planner  can  define  a  split  quantity.  In  this  case,  the  individual  splits  are  assigned

this quantity in the table.

If  the  quantity  to  be  split  is  0,  the  remaining  quantity  is  distributed  evenly  among  the  splits.

However, the quantity may still be changed for each split.

You can add splits until the maximum number of splits of the split master is reached.

Generate OP with difference quantity (1)

This  checkbox  is  only  visible  if  the  OP  has  not  yet  been  split.  The  option  is  therefore  not  set  by

default.

If the checkbox is enabled, another split operation is shown in the table in addition to the split OPs.

Condition: the total target quantity of the split OPs to be generated (included in the list) is less than

the remaining quantity of the operation to be split.

For  this  operation,  you  can  change  all  target  data,  except  the  target  quantity  itself.  The  target

quantity  cannot  be  changed,  because  it  is  automatically  calculated:  remaining  quantity  calculated

using  the  quantity  of  the  operation  and  the  total  of  all  target  quantities  of  the  split  OPs  to  be

generated.

Set off target qty. of the split OP (2)

This checkbox is only visible if the OP is a split operation. The option is therefore not set by default.

If this checkbox is set, the target quantity of the split OP is updated, i.e. the target quantity of the

split OP is reduced by the total target quantity of the split operations to be generated. However, this

is  only  the  case  if  this  sum  does  not  exceed  the  remaining  quantity  of  the  split  operation  (the

remaining  quantity  results  from  the  difference  between  target  quantity  and  actual  quantity).

Otherwise, you cannot enable the checkbox.

Table columns

Split (1) (2)

The system generates the future split number. You cannot change the number.

MOC_SplitOperationEnhanced.docx

Version: 1.7.18468

Page 4 of 8

Enhanced Split Function

The  next  free  number  is  used  as  split  number,  i.e.  it  is  checked  which  number  is  currently  the

highest split number.

Target quantity (P) (1) (2)

Target quantity of the split operation. The planner may change the target quantity, provided it is not

the split generated due to the option "Generate OP with difference quantity".

The target quantity of the new entries results from the "quantity to be split".

Setup time (1) (2)

Target setup time of the split operation. The planner may change the setup time.

For new entries, the setup time of the split master is preassigned.

Remaining run time (1) (2)

Remaining run time (remaining processing time) according to the remaining run time formula that is

defined  for  the  split  master  taking  into  account  the  target  quantity  of  the  split  operation.  HYDRA

calculates this remaining run time and it cannot be changed by the planner.

The totals row shows:

  Column "Split“: number of entries,

  Column "Target quantity“: Total of the target quantity,

  Column "Setup time“: Total of setup times,

  Column "Remaining run time“: Total of remaining run times.

An error message is output if the entered number of splits (existing and new splits) exceeds the maximum

number of splits.

It is allowed to enter an (admissible) number of splits and a split quantity that is greater than the target

quantity of the operation. However, a respective information saying "difference" is displayed for the user.

Editing of split entries

Existing  entries  can  be  edited  or  deleted  using  the  "edit"  or  "delete"  button.  Multiple  selections  are

supported for deletion.

Once entries have been confirmed by clicking OK, they are updated in the relevant dialog.

The target quantity cannot be changed if the checkbox "Generate OP with difference quantity" is set.

Split result

The  entries  are  checked,  once  the  dialog  "split  operation"  has  been  confirmed  by  clicking  OK.  Error

messages are shown if necessary:

  Splits having a target quantity 0 are not allowed.

MOC_SplitOperationEnhanced.docx

Version: 1.7.18468

Page 5 of 8

Enhanced Split Function



In general, the maximum number of splits is checked against the split master.

Then the system generates the split operation(s). They are directly generated in the database.

One or several new operations are generated by splitting. Their ID differs from the original split master by

the split number. There are the following operations, for example:

  123456789012 0100    = Split master

  123456789012 0100 1 = Split operation 1

  123456789012 0100 2 = Split operation 2

Additional information

After  splitting,  you  can  only  make  postings  for  the  generated  operation  splits.  The  original

operation (split master) is marked as locked and no postings can be made for this operation. It

is no longer shown in the backlog of orders.

The  HYDRA  Shop  Floor  Scheduling  module  no  longer  shows  the  split  master  and,  therefore,

the master cannot be planned any longer, but only its split operations.

Changes to operation splits, in particular changes in planning (e.g. changes to planned dates or

changes to the planned workplace) do not affect the split master.

Please  keep  in  mind  that  after  an  operation  has  been  split,  any  new  changes  from  the  ERP

system to this original operation ("split master") will have no effect on the individual operations

split off.

If the target quantity update is enabled, the operation splits will not be updated, but only the split

master.

Cancel operation splits

Function authorization

op.splitrelease

A  split  operation  can  be  canceled  by  clicking  the  button

,  if  the  split  operation  has  not  yet  been

started.

MOC_SplitOperationEnhanced.docx

Version: 1.7.18468

Page 6 of 8

Enhanced Split Function

In contrast to the simple split function, the enhanced split function only cancels, i.e. deletes the selected

split operation. The split master and the other split operations remain unchanged.

Please note: If a split operation is deleted, its target quantity will not be transferred to other, still

existing split operations.

If the last split operation is deleted, the split master becomes a "normal" operation.

Displaying operation splits

Whether or not split operations are displayed depends on the context of the relevant application.

Split master:

  The original operation (split master) is not shown in graphic planning.

  The split master is shown in the following applications:

o  Edit operations

o  Order information

Split operations:

  The Graphic planning generally shows operation splits. In contrast to this, the split master is no

longer shown after splitting.

  The single operations split off are shown in the following applications, provided that the relevant

option has been selected:

o  Edit operations

o  Order information

Posting for split operations

Where  split  operations  are  concerned,  the  log  record  is  ONLY  generated  for  the  split  operation;  no  log

record is generated for the split master itself.

Only the status of the split master is updated. The following events trigger an update:





interrupt operation

log off operation

MOC_SplitOperationEnhanced.docx

Version: 1.7.18468

Page 7 of 8

Enhanced Split Function

Uploading part quantities to the PPS/ERP system

The values recorded or posted for split operations are generally uploaded to the PPS/ERP system with

reference to the split master.

MOC_SplitOperationEnhanced.docx

Version: 1.7.18468

Page 8 of 8

