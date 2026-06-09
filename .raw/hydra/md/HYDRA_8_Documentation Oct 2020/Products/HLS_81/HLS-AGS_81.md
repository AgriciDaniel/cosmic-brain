Manual

Operation Splitting
HLS-AGS 8.1

Version 1.1.23049

Last changed on: 01.09.2020

Operation Splitting

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

HLS-AGS_81.docx

Stand: 01.09.2020

Page 2 of 9

Operation Splitting

Contents

1  Overview Operation Splitting ........................................................................ 4

2  Splitting Operations ...................................................................................... 5

HLS-AGS_81.docx

Stand: 01.09.2020

Page 3 of 9

Operation Splitting

1

 Overview Operation Splitting

Purpose

This function package provides functions used to split operations and to schedule split operations in the

graphical planning board of HYDRA shop floor scheduling.

Implementation considerations

You use the function package if:

  You  want  to  shorten  operation  lead  times  or  better  utilize  workplaces  /  machines  available  by

processing operations in parallel.

Integration

The  function  described  here  is  integrated  into  different  function  groups  in  shop  floor  data  collection.

Emphasis here is on data entry, i.e. posting at the terminal, and the posting resulting from it.

Features

  Function used to split operations on the graphical planning board in order to plan them in parallel

as well as to be able to post quantities and times to them.

  Splitting up of the total production quantity of an operation into several parallel operations and the

option to schedule them at several workplaces / machines .

  Separately determining the number of splits

  Automatic indexing for split operations.

  Uploading to the ERP system based on the original operation if an ERP interface is implemented.

HLS-AGS_81.docx

Stand: 01.09.2020

Page 4 of 9

Operation Splitting

2  Splitting Operations



Purpose

You use this function if you want to shorten the lead time of operations or improve utilization of several

workplaces/ machines available for production.

Integration

This function splits an operation into two or more operations. An operation can be split using the following

functions:

  Order sequencing.

  Edit operations.

  Graphic planning: can be called up via the context menu of the operation.

Data is always uploaded to the PPS/ ERP system according to the order/ operation number of the original

operation.

Requirements

An operation can only be split if the following conditions are met:

  The  length  of  the  split  number  is  set  to  1  (maximum:  9  splits)  or  2  (maximum:  99  splits)  in  the

HYDRA basic parameter settings.

  The identifier "May be split" is set at the operation.

  The operation to be split cannot be a merged operation.

  The operation is not a split operation. It is not allowed to split a split operation once more.

  The operation has not yet started, i.e. it must be marked with status (control indicator) "prepared".

Splitting an operation

Function authorization

op.split

The  function  "Split  operation"

  allows  you  to  split  the  total  production  quantity  of  an  operation  into

several  operations.  The  number  of  operations  subjected  to  splitting  is  predefined  as  per  the  number  of

splits configured in the order backlog. If the indicator "May be split" is not set for the operation, you cannot

split the operation.

HLS-AGS_81.docx

Stand: 01.09.2020

Page 5 of 9

Operation Splitting

The system runs through the following processing steps when splitting an operation:

Checks

  A check is run to verify whether the operation may be split. If the indicator "May be split" is set for

the operation, you can split the operation.

  The number of splits entered  must be greater than 1.

  The  entered  number  of  splits  must  be  less  than  the  maximum  number  of  splits  defined  at  the

operation.

  The operation to be split may not have already been split (split master).

  The operation to be split may itself not be an operation split.

  The operation to be split may not be a merged operation.

If these conditions are met, the operation may be split.

Processing

The  system  issues  the  numbers  for  the  splits  automatically  by  distributing  a  consecutive  number.  The

number is shown in the field "split": The remainder of the number (order/  operation) matches the one of

the original operation ("split master"). The number of splits depends on the length/number of characters

defined for splits in the HYDRA basic parameter settings.

Example:

Operation 47100100 0100 is divided up into to three splits; the number length for the split defined in the

basic settings is 2.

Results of splitting:

Split master:

47100100 0100 (can no longer be logged on)

Individual splits: 47100100  0100  01

47100100  0100  02

47100100  0100  03

When an operation is split, the following values of the original operation are distributed to the splits based

on the number of splits:

  Target quantity (primary, secondary, tertiary, base quantity unit)

  Target scrap (primary, secondary, tertiary, base quantity unit)

  Processing time

The quantities are generally divided up in full numbers. If they cannot be distributed evenly, the remainder

is allocated to the last operation split.

HLS-AGS_81.docx

Stand: 01.09.2020

Page 6 of 9

All other data is transferred from the original operation.

After splitting, the order is flagged for lead time scheduling.

Operation Splitting

After  splitting,  only  the  generated  operation  splits  can  be  posted.  The  original  operation  (split

master)  is  marked  as  locked  and  cannot  be  posted.  It  is  no  longer  shown  in  the  backlog  of

orders.

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

When an operation split

 is canceled, all of the operations split off are deleted and only the original

operation, which up until now was the split master, continues to exist. The split master is now treated as a

normal operation.

Operation splits can only be canceled if all splits of the operation still show a status "prepared".

Displaying operation splits

Whether split operations are displayed depends on the application:

  The original operation (split master) is not shown in graphic planning.

  The split master is shown in the following applications:

o  Edit operations

o  Order information

HLS-AGS_81.docx

Stand: 01.09.2020

Page 7 of 9

Operation Splitting

Whether the single operation splits are displayed also depends on the application:

  The graphic planning  generally shows operation splits. In contrast  to this, the split master is no

longer shown after splitting.

  The single operations split off are shown in the following applications, provided that the relevant

option has been selected:

o  Edit operations

o  Order information

Posting to operation splits

Where  split  operations  are  concerned,  the  log  record  is  ONLY  generated  for  the  operation  split;  no  log

record is generated for the split master itself.

Only the split master's status is updated if the following events occur:





interrupt operation

log off operation

Uploading to the PPS/ ERP system

The  values  recorded  or  posted  to  operation  splits  are  generally  uploaded  to  the  PPS/  ERP  system

according to the split master.

Splitting of operations subject to batch management

General

The  "split  operation"  function  may  also  be  run  for  operations  subject  to  management  in  batches.  The

function is identical to the split function of conventional operations.

Procedure

The user applies the "split OP" function and splits off an OP from the "split master" in the given operation

quantity (primary quantity).

The operation is split. Data relating to material is transferred from the split master to the operations split

off.

The required quantity is calculated subject to the input quantity and the quantity split off.

Results after splitting the operation:

HLS-AGS_81.docx

Stand: 01.09.2020

Page 8 of 9

Operation Splitting

With regard to the material, the following data/ values are accepted or used by the operations split off:

  Order header data

o  Finished article (number of the finished article) --> taken over from split master

o  Article name --> taken over from split master

o  Batch  number  -->  taken  over  from  split  master (for  the  batch  being  generated  in  this  order,

e.g. transferred from the ERP; identical for all operation splits)

o  Material type of the finished article --> taken over from split master

  OP data

o  Material number of output material/article --> taken over from split master

o  Material type of output material/article --> taken over from split master

o  Name of output material/article --> taken over from split master

o

o

Indicator "batch management requirement" --> taken over from split master

Indicator "serial numbers required" --> taken over from split master

  Component list

o  All data included in the component list is copied or transferred from the split master.

o  The required quantity is recalculated from the OP split off based on the quantity split off.

  Output batch change:

o  When  output  batches  are  changed,  the  number  of  the  split  master  is  added  to  the  output

batch.

  Uploads to the ERP system:

o  Uploads to the ERP system are always performed in relation to the split master.

HLS-AGS_81.docx

Stand: 01.09.2020

Page 9 of 9

