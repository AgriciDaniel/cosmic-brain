Manual

Split Operations and Merged
Operations
BDE-SSG 8.1

Version 1.2.6020

Last changed on: 19.06.2020

Split Operations and Merged Operations

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

BDE-SSG_81.docx

Version: 1.2.18468

Page 2 of 30

Split Operations and Merged Operations

Contents

1  Übersicht Splitt- und Sammelarbeitsgänge .................................................. 4

2  Splitting Operations ...................................................................................... 5

3  Advanced Split Function ............................................................................ 10

Splitting an operation ................................................................................................... 11

Cancel split operation .................................................................................................. 15

Displaying split operations ........................................................................................... 16

Posting to split operations ........................................................................................... 16

Uploading to the PPS/ ERP system ............................................................................. 17

4  Processing of Merged Operations.............................................................. 18

4.1  Creation of merged operations at the terminal ................................................... 18

4.1.1  Different types of posting merged operations......................................... 19

4.1.2  Posting of merged operations at the terminal......................................... 19

4.1.3  Posting of merged operations created at the terminal ............................ 20

4.1.4  Further notes on the generation of merged operations at the

terminal ................................................................................................. 23

4.2  Generation of merged operations in MOC ......................................................... 24

4.2.1  Creation of merged operations in MOC ................................................. 24

4.2.2  Processing of merged operations (created in MOC) .............................. 24

4.2.3  Additional information ............................................................................ 26

5  Generate and Dissolve Merged Operations ............................................... 28

BDE-SSG_81.docx

Version: 1.2.18468

Page 3 of 30

Split Operations and Merged Operations

1  Übersicht Splitt- und Sammelarbeitsgänge

Purpose

This function package provides functions that can be used to split operations or to consolidate operations

and also the posting functions based on the results.

Implementation considerations

You use the function package if:

  You  would  like  to  combine  different  short-running  operations  in  order  to  be  able  to  enter  them

"one-to-one".

or if

  You  want  to  shorten  operation  lead  times  or  better  utilize  workplaces  /  machines  available  for

production by processing operations in parallel.

Integration

The  functions  contained  in  this  package  are  integrated  into  different  function  groups  in  business  data

collection. Emphasis here is on data entry, i.e. posting at the terminal, and the posting resulting from it.

Features

  Split operations

o  User dialog for generating and managing split operations

o  Staging  of  split  operations  for  MES  planning  and  entry  in  order  to  plan  the  latter  in

parallel and to be able to post quantities and times to them.

o  Merging production activities to the original operation and uploading to the ERP

  Merged operations

o  Function in the MOC for combining operations with short processing duration into merged

operations

o  User  dialog  at  the  Windows  terminal  for  generating,  posting  and  managing  merged

operations

o  Staging of merged operations for MES planning and entry

o  Posting  times  and  quantities  proportionally  to  the  original  operations  based  on

configuration and confirmation

BDE-SSG_81.docx

Version: 1.2.18468

Page 4 of 30

Split Operations and Merged Operations

2  Splitting Operations



Purpose

You use this function if you want to shorten the lead time of  operations or improve utilization of several

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

BDE-SSG_81.docx

Version: 1.2.18468

Page 5 of 30

Split Operations and Merged Operations

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

number is shown in the field "split": The remainder of the number (order/ operation) matches the one of

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

BDE-SSG_81.docx

Version: 1.2.18468

Page 6 of 30

Split Operations and Merged Operations

All other data is transferred from the original operation.

After splitting, the order is flagged for lead time scheduling.

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

BDE-SSG_81.docx

Version: 1.2.18468

Page 7 of 30

Split Operations and Merged Operations

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

BDE-SSG_81.docx

Version: 1.2.18468

Page 8 of 30

Split Operations and Merged Operations

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

BDE-SSG_81.docx

Version: 1.2.18468

Page 9 of 30

Split Operations and Merged Operations

3  Advanced Split Function

Usage

You  use  the  split  function  if  you  would  like  to  shorten  the  lead  time  of  operations  or  you  would  like  to

improve the capacity utilization of several workplaces/ machines available for production.

In contrast to the simple split function, the enhanced split function provides the following features:

  An operation may be split into split operations having different target quantities and setup times.

  An operation that has already been split (split operation) may be split into further split operations with

different target quantities and setup times.



Individual splits may be deleted.

Integration

This function provides the ability to split an operation into two or more split operations. An operation can

be split in the following functions:

  Order sequencing.

  Edit operations.

  Graphic planning (can be called up via the context menu at the operation).

Data is always uploaded to the PPS/ ERP system in relation to the order/ operation number of the original

operation.

Prerequisite

An operation can only be split if the following conditions are met:

  The length of the split number is set to 1 (maximum 9 splits) or 2 (maximum 99 splits) in the basic

parameter settings.

  The option "enhanced split function" has to be set to "yes" in the basic parameter settings.

  The  flag  "may  be  split"  is  set  for  the  operation  and  the  field  "max.  number  of  splits"  includes  a

value greater than 2.

  The operation to be split is not a merged operation.

Machines with MPL/TRT functions do not support split operations.

BDE-SSG_81.docx

Version: 1.2.18468

Page 10 of 30

Split Operations and Merged Operations

Splitting an operation

Function authorization

op.split

An operation may be split by using the function "split operation"

.

To perform splits, the relevant operation is to be selected and the split function is to be started using the

context menu or by clicking the relevant button.  A dialog opens where the planner may define into how

many operations the operation is to be split and what quantities are planned for each split operation.

Field description of "split operation"

The dialog shows different information depending on whether the operation is split for the first time or if

splitting is performed for an operation that has already been split.

A note is added to the below fields indicating whether they are available if the OP is

(1)  split for the first time or

(2)  if it has already been split

MES order number (1) (2)

Operation  that is to be split. This is the operation that may be split (the split master) if splitting  is

performed for the first time. This is the split master for further splitting.

Target quantity (P) (1) (2)

Target  quantity  and  unit  of  the  split  master  according  to  the  specifications  made  in  the  pool  of

orders.  The  target  quantity  and  the  below-mentioned  quantities  generally  refer  to  the  primary

quantity of the operation.

Actual quantity (1) (2)

(Yield)  quantity  that  has  been  uploaded/confirmed  so  far.  This  quantity  is  entered  by  the  split

operations and carried forward at the split master status.

It  includes  the  actual  quantity  of  operations  that  have  already  been  finished  as  well  as  the  actual

quantity of running or interrupted operations.

Remaining quantity for split OPs (1) (2)

Refers to all split OPs that have not yet been finished (split OPs with control indicator S, V, L or U)

with  the  difference  resulting  from  "target  quantity  minus  actual  quantity"  being  >  0:  total  of

remaining quantities

BDE-SSG_81.docx

Version: 1.2.18468

Page 11 of 30

Split Operations and Merged Operations

Operations with a difference between target quantity and actual quantity that is less than 0 are not

taken  into  account,  as  this  resulted  in  an  overproduction  and  this  surplus  is  no  longer  produced

and, as a result, no longer considered for further splitting.

Difference (1) (2)

This quantity results from:

"Target quantity“ (P) minus "actual quantity“ minus "remaining quantity of split OPs“

If this quantity is unequal to 0, the note "DIFFERENCE" is shown in red. This shows whether/when

the entire target quantity of the split master is completely distributed.

Max. number of splits (1) (2)

The maximum number of splits defined for the split master

Previous number of splits (1) (2)

Number of splits that have been performed so far. This number is the  total of the split operations

and the splits to be performed now (splits included in the list)

Remaining run time (1) (2)

Remaining run time of the split master according to the remaining run time formula.

Setup time (1) (2)

Target setup time of the split master according to the specifications made within the pool of orders.

The setup time is taken over into the list during splitting and can be adjusted there individually for

each split.

The information listed above generally refers to the operation to be split or to the split master, provided

that the operation has already been split.

In  case  the  operation  has  already  been  split,  i.e.  it  is  now  the  split  master,  the  below-mentioned

information is shown for the split operation that is to be used for further splitting. If the operation is split for

the first time, these fields will not be displayed:

Split OP (2)

Split operation that is to be split or that is to be used for further splitting.

Target quantity (P) (2)

Target quantity of the split operation

Actual quantity (2)

(Yield) quantity uploaded/confirmed so far for this split operation

BDE-SSG_81.docx

Version: 1.2.18468

Page 12 of 30

Split Operations and Merged Operations

The planner's interactive input options

The splits are generated in the list, once the "number of splits" and, if necessary, the "quantity to be split"

have been entered and the "split" button has been clicked. The target quantity as well as the setup time

can still be changed.

Number of splits (1) (2)

Planners can now specify how many splits they want to create

By  default,  the  field  is  assigned  the  number  of  splits  that  are  still  possible  (maximum  number  of

splits minus current number of splits).

Quantity to be split (1) (2)

In  addition,  the  planner  can  define  a  split  quantity.  In  this  case,  the  individual  splits  are  assigned

this quantity in the table

If  the  quantity  to  be  split  is  0,  the  remaining  quantity  will  be  spread  evenly  among  the  splits.

However, the quantity may still be changed for each split.

But splits are only added until the maximum number of splits of the split master has been reached.

Generate OP with difference quantity (1)

This checkbox is only visible, provided that the OP has not yet been split and is not set by default.

If the checkbox is enabled, another split operation is shown in the table in addition to the split OPs,

provided that the total target quantity of the split OPs to be generated (included in the list) is less

than the remaining quantity of the operation to be split.

All target  data, except for the target  quantity  itself, may  be changed for this operation. The target

quantity  cannot  be  changed,  as  it  is  calculated  automatically:  remaining  quantity  between  the

operation and the total target quantity of the split OPs to be generated.

Set off target qty. of the split OP (2)

This checkbox is only visible, provided that it is a split operation and it is not set by default.

If this checkbox is enabled, the target quantity of the split OP is updated, i.e. the target quantity of

the split OP is reduced by the total target quantity of the split operations to be generated. However,

this is only the case if this sum does not exceed the remaining quantity of the split operation (the

remaining  quantity  results  from  the  difference  between  target  quantity  and  actual  quantity).

Otherwise, the checkbox cannot be selected.

Table columns

Split (1) (2)

The system generates the future split number. It cannot be changed.

The next free number is used as the split number, i.e. the current maximum split number is verified.

BDE-SSG_81.docx

Version: 1.2.18468

Page 13 of 30

Split Operations and Merged Operations

Target quantity (P) (1) (2)

Target quantity of the split operation. The planner may change the target quantity, provided it is not

the split generated due to the option "Generate OP with difference quantity".

The target quantity of new entries results from the "quantity to be split".

Setup time (1) (2)

Target setup time of the split operation. The planner may change the setup time.

New entries are assigned the setup time of the split master.

Remaining run time (1) (2)

Remaining run time (remaining processing time) according to the remaining run time formula that is

defined  for  the  split  master  taking  into  account  the  target  quantity  of  the  split  operation.  HYDRA

calculates this remaining run time that cannot be changed by the planner.

The totals row shows:

  Column "Split“: number of entries,

  Column "Target quantity“: Total of the target quantity,

  Column "Setup time“: Total of setup times,

  Column "Remaining run time“: Total of remaining run times.

An error message is output if the entered number of splits (existing and new splits) exceeds the maximum

number of splits.

It is allowed to enter an (admissible) number of splits and a split quantity that is greater than the target

quantity of the operation. However, a respective note saying "difference" is displayed for the user.

Editing of split entries

Existing  entries  can  be  edited  or  deleted  using  the  "edit"  or  "delete"  button.  Multiple  selections  are

supported for deletion.

Once entries have been confirmed by clicking OK, they are updated in the relevant dialog.

The target quantity cannot be changed if the checkbox "Generate OP with difference quantity" is set.

Split result

The  entries  are  checked,  once  the  dialog  "split  operation"  has  been  confirmed  by  clicking  OK.  Error

messages are shown if necessary:

  Splits having a target quantity 0 are not allowed.



In general, the maximum number of splits is checked against the split master.

BDE-SSG_81.docx

Version: 1.2.18468

Page 14 of 30

Split Operations and Merged Operations

Then the system generates the split operation(s). They are directly generated in the database.

One or several new operations are generated by splitting. Their ID differs from the original split master by

the split number. There are the following operations, for example:

  123456789012 0100    = Split master

  123456789012 0100 1 = Split operation 1

  123456789012 0100 2 = Split operation 2

Please also note

After splitting, only the split operations that were created can be posted. The original operation

(split master) is identified as locked and can therefore not be posted. It is neither shown in the

pool of orders any longer.

The split master will neither be shown any longer in the HYDRA Shop Floor Scheduling module

and, as a result, it can no longer be planned, but only its split operations.

Changes to split operations, in particular changes in planning (e.g. changes to planned dates or

changes to the planned workplace) do not affect the split master.

Please  keep  in  mind  that  after  an  operation  has  been  split,  any  new  changes  from  the  ERP

system  to  this  original  operation  ("split  master")  will  have  no  effect  on  the  individual  split

operations.

If the target quantity update is enabled, the split operations will not be updated, but only the split

master.

Cancel split operation

Function authorization

op.splitrelease

A split operation can be canceled by clicking the button

, provided that it has not yet been started.

In  contrast  to  the  simple  split  function,  only  the  selected  split  operation  is  canceled,  i.e.  deleted  for  the

advanced split function. The split master and the other split operations remain unchanged.

BDE-SSG_81.docx

Version: 1.2.18468

Page 15 of 30

Split Operations and Merged Operations

Please note: If a split operation is deleted, its target quantity will not be transferred to other, still

existing split operations.

If the last split operation is deleted, the split master becomes a "normal" operation.

Displaying split operations

Whether or not split operations are displayed depends on the context of the relevant application.

Split master:

  The original operation (split master) is not shown in graphic planning.

  The split master is shown in the following applications, among others:

o  Edit operations

o  Order information

Split operations:

  The graphic planning  generally shows split  operations. In contrast  to this, the split master is no

longer shown after splitting.

  Split  operations  are  shown  in  the  following  applications,  provided  that  the  relevant  option  has

been selected:

o  Edit operations

o  Order information

Posting to split operations

Where  split  operations  are  concerned,  the  log  record  is  ONLY  generated  for  the  split  operation;  no  log

record is generated for the split master itself.

Only the split master's status is updated if the following events occur:





interrupt operation

log operation on

BDE-SSG_81.docx

Version: 1.2.18468

Page 16 of 30

Split Operations and Merged Operations

Uploading to the PPS/ ERP system

The values recorded or posted to the split operations are generally uploaded to the PPS/ ERP system in

relation to the split master.

BDE-SSG_81.docx

Version: 1.2.18468

Page 17 of 30

Split Operations and Merged Operations

4  Processing of Merged Operations

Utilization

Merged  operations  are  a  special  form  of  serial  production.  Different  short-duration  operations  are

combined  into  logical  blocks  with  manageable  runtimes  (so-called  "merged  operations")  within  the

planning  level  (e.g.  in  HYDRA  shop  floor  scheduling)  or  at  shop  floor  terminals.  The  system  creates  a

“representative”  operation  for  these  merged  operations,  which  is  logged  on  for  all  the  individual

operations  contained  in  the  group.  The  entered  data  is  divided  according  to  different  configurable

perspectives.

Integration

HYDRA supports two methods of creating merged operations:

Creation of merged operations at the terminal

The merged operation is created by the worker at the terminal. After logging the merged operation

on,  all  the  concerned  individual  operations  are  specified  one  after  the  other  and  assigned  to  the

concerned  person.  Only  the  person  needs  to  be  specified  while  logging  out  or  interrupting  the

merged operation.

Creation of merged operations in MOC

The

function

for  creating  merged  operations  combines

the

individual  operations

into  a

representative OP. The representative operation is then logged on to the terminal.

In contrast to merged operations at the terminal, merged operations that are created in MOC can

be planned using the scheduling functions provided in MOC.

Prerequisite

Creating  merged  operations  at  the  terminal  is  incompatible  with  creating  merged  operations  in  MOC.

Hence,  the  method  to  be  used  must  be  defined  in  the  HYDRA  basic  settings  through  appropriate

configuration. Subject to this configuration, the functions for merged operations are available either at the

terminal or in MOC only.

4.1  Creation of merged operations at the terminal

The  “merged  OP  at  terminal”  function  makes  it  possible  to  combine  several  operations  into  a  single

merged operation (MOP).

This is helpful if:



several short-duration operations can be combined into a single operation (less posting efforts),

BDE-SSG_81.docx

Version: 1.2.18468

Page 18 of 30

Split Operations and Merged Operations



several  operations  are  “at  the  workplace”  simultaneously,  so  that  the  logon/logoff  postings

concerning  the  individual  operations  cannot  otherwise  be  sent  in  the  correct  order  (for  example

during annealing or tempering in the metal industry or smoking in the F&B sector).

4.1.1  Different types of posting merged operations

The  different  types  of  posting  merged  operations,  which  are  described  below,  are  configured  in  the

terminal configuration.

"Generation per person"

MOP logons are combined person-based  order logons, i.e. the  person  who combines several individual

operations into an MOP is logged on at all individual operations automatically.

Only one MOP is possible per person. If a person executes another MOP logon at a later time, then these

individual operations are automatically assigned to the already existing MOP logon.

An  MOP  can  only  be  logged  on,  logged  off  or  interrupted.  The  logging  on  of  additional  persons  to  a

personal MOP is impossible.

"Generation per machine"

Several OPs can be grouped in a single merged operation per machine/workplace on the terminal using

the “log merged OP on” function. With one MOP permitted per workplace.

Just  as  it  is  the  case  for  individual  operations,  several  people  may  log  on  to  this  MOP.  If  the  MOP  is

interrupted  or  logged  off  all  registered  people  will  be  logged  off  automatically.  Posting  of  quantities  and

splitting of times is made in accordance with the specifications described in the sections that follow.

4.1.2  Posting of merged operations at the terminal

The  method  of  creating  merged  operations  at  the  terminal  can  be  taken  from  the  concerned  terminal

documentation (for Windows terminals or DOS terminals).

Merged  operations  are  created  at  the  terminal  as  described  in  the  corresponding  documentation.  The

terminal generates a representative order number for the merged operation. Subject to the posting type,

the user's badge number or the machine/workplace number are integrated in this order number:

Merged operation number for the "generation per person" option

Depending on the length of the HYDRA order no. and the length of the staff badge no. configured in the

system, the number of the merged operation is created as follows:

The length of the order no. is at least four characters longer than the staff badge no.:

SAM-XXXXX

xxxxx represents the staff badge no.

BDE-SSG_81.docx

Version: 1.2.18468

Page 19 of 30

Split Operations and Merged Operations

The length of the order no. is at least two characters longer than the staff badge no.:

S-XXXXX

xxxxx represents the staff badge no.

The order number length is not at least two characters longer than the staff badge number:

In this case, the standard function "merged operations at the terminal" cannot be used.

Merged operation number for the "generation per machine" option

Depending on the length of the HYDRA order no. and the length of the machine number configured in the

system, the number of the merged operation is created as follows:

Length  of  the  order  number  is  at  least  two  characters  longer  than  the  length  of  the  machine/workplace

number:

S-XXXXX

xxxxx represents the machine/workplace number

Length  of  the  order  number  is  at  least  four  characters  longer  than  the  length  of  the  machine/workplace

number:

SAM-XXXXX

xxxxx represents the machine/workplace number

The  length  of  the  order  number  is  not  at  least  two  characters  longer  than  the  length  of  the

machine/workplace number:

In this case, the standard function "merged operations at the terminal" cannot be used.

4.1.3  Posting of merged operations created at the terminal

The entered actual times of the MOP can be divided according to the following methods

According to the standard times, i.e. in relation to the standard times of the individual OPs

According to the default quantities, i.e. in relation to the target quantities of the individual OPs

According to the individual OPs, i.e. according to the number of the logged on individual OPs

The posting method is defined in the basic parameter settings.

The  options  "according  to  standard  time"  or  "according  to  default  quantity"  must  not  be  used

together  with  the  option  "Proportionate  RPA  posting  in  personnel  postings"  in  the  basic

parameter settings.

BDE-SSG_81.docx

Version: 1.2.18468

Page 20 of 30

Split Operations and Merged Operations

Please contact MPDV Support to configure the MOP posting method.

Example - Distribution according to standard time

Example of dividing the real times of the MOP in relation to the individual  standard times of the

individual OPs:

3 operations are combined into one MOP:

OP

OP01
OP02
OP03

Standard time

8000 Sec.
600 Sec.
6000 Sec.

A log record for the MOP with the runtime of 12000 sec. must now be posted onto the individual OPs. The

times are to be divided according to the following formula

  The following values of the individual OPs can be derived from the formula:

OP

OP01
OP02
OP03

Posted runtime

6575 Sec.
493 Sec.
4932 Sec.

  Calculation example for OP01:

Sum of standard times of all individual OPs = 8000 + 600 + 6000 = 14600

Posted runtime = 12000 * 8000/14600 = 6575 Sec.

PLEASE NOTE:

The standard time of an operation is calculated from the target setup time + target duration.

Example - Distribution according to standard time

Example  of  dividing  the actual  times  of  the  MOP in  relation  to  the  individual  target  quantities  of

the individual OPs:

3 operations are combined into one MOP:

BDE-SSG_81.docx

Version: 1.2.18468

Page 21 of 30

OPsalloftimesdardstheofTotalOPindividualoftimedardsrecordtheofdurationTotaltimesPostedtantan*log

Split Operations and Merged Operations

OP

OP01
OP02
OP03

Target quantity

1000
500
2500

A log record for the merged OP with  the runtime of 12000 sec. must now be posted onto the individual

OPs. The times are to be divided according to the following formula

  The following values of the individual OPs can be derived from the formula:

OP

OP01
OP02
OP03

Posted runtime

3000 Sec.
1500 Sec.
7500 Sec.

  Calculation example for OP01:

Sum of target quantities of all individual OPs = 1000 + 500 + 2500 = 4000

Posted runtime = 12000 * 1000/4000 = 3000 Sec.

Example – Distribution according to the number of individual operations

Example of dividing actual times of the MOP according to individual OPs

3 OPs are combined in one MOP:

A log record for the MOP with the runtime of 12000 sec. must now be posted onto the individual OPs. The

times are to be divided according to the following formula

  The following values of the individual OPs can be derived from the formula:

OP

OP01
OP02
OP03

Posted runtime

4000 Sec.
4000 Sec.
4000 Sec.

The quantities as well as the entered times are also posted for the person who edits the MOP.

BDE-SSG_81.docx

Version: 1.2.18468

Page 22 of 30

OPsindividualallofquantitiesettofTotalOPindividualofquantityettrecordofdurationTotaltimePostedargarg*logOPsindividualofnumberrecordtheofdurationTotaltimePostedlog

Split Operations and Merged Operations

4.1.4

Further notes on the generation of merged operations at

the terminal

The following particularities apply while processing merged operations at the terminal

  By  default,  the  “merged  operations”  function  is  not  active  and  must  be  enabled  with  respect  to  a

specific terminal in the terminal configuration .

  Only the ADE terminal provides MOP functions at DOS terminals . However, Windows terminals also

provide MOP functions if the "MDE" operation mode is used.

  To  complete  an  MOP,  the  "logon  of  several  OPs"  option  must  be  set  in  the  workplace  /  machine

configuration, i.e. the logging on of several operations at this workplace is permitted.

  The "max. OPs per person" option of the HR master is also taken into account when it comes to the

creation of merged operations on the terminal. Consequently, a person may only log one operation on

as merged operation if the "max. OPs per person" option is se to 1.

  A person can combine a maximum of 20 individual operations into a merged operation.



In MOP log on, no sequencing list is supported at DOS terminals  , i.e., the order numbers are to be

entered with the help of barcodes or through manual entry.

  For merged operations that are logged on without recording of number of pieces, the produced actual

quantity of the individual OPs is set to the respective target quantity of pieces at the time of logoff.

  With  merged  operations  that  are  logged  on  with  the  entry  of  quantities,  each  operation  receives  its

specified quantity, when the merged operation is interrupted or logged off.

  For  merged  operations  that  are  logged  on  to  workplaces/machines  with  automatic  quantity  entry,

each  individual operation gets its  own proportional quantity. The quantities are divided according to

the same key as it is the case for times. This division is described in the sections that follow.



It is sufficient to enter the badge number, when merged operations are logged off/interrupted (MOP

person). Thus, all operations of a person's merged operation are logged off automatically.

Waiting period processing

In  case  an  MOP  logon  has  to  be  dated  forward  due  to  waiting  period  processing,  the  first  individual

operation of this merged operation  is dated forward.  Further OPs that might be  added to the MOP at a

later time are not affected.

An  MOP  or  all  individual  operations  pertaining  to  it  are  automatically  interrupted  when  the  person  who

processes it/them clocks out.

Provided that the waiting period processing function is configured accordingly, it is also possible that the

person who processes the MOP is automatically logged in again as soon as they clock-in in HYDRA-PZE.

BDE-SSG_81.docx

Version: 1.2.18468

Page 23 of 30

Split Operations and Merged Operations

4.2  Generation of merged operations in MOC

This function enables the combination of individual operations into merged operations in MOC.

The functions for creating or canceling merged operations are available in the "order overview" as well as

in the "order sequencing" dialog (the BDE-FST license is a precondition here).

If a merged operation is created in  MOC, then the “members” of a merged operation cannot be  viewed

here anymore. The same is true of the sequencing list at the terminals.

The  number  of members  in  a merged  operation  is  not  limited.  However,  only  prepared  orders/OPs  that

are not already contained in other merged operations can be added to merged operations.

Merged operations themselves cannot flow into other merged operations.

The logging on of a merged operation at the terminal takes place as representative for all the members of

a  merged  operation.  Merged  operations  can  be  logged  on,  interrupted  or  logged  off  at  the  terminal  the

same way as normal operations.

4.2.1  Creation of merged operations in MOC

The method of creating merged operations is described here.

4.2.2  Processing of merged operations (created in MOC)

While  dividing  the  entered  quantities  and  times  of  a  merged  operation  among  the  associated  individual

operations, the system supports the "homogeneous" (not for merged operations created at the terminal)

and the "non-homogeneous" method.

Homogeneous merged operations

In  a  homogeneous  merged  operation,  quantities  and  times  are  divided  on  the  basis  of  the  overrun

principle,  i.e.  all  the  individual  operations  are  “filled  up”  one  after  the  other  according  to  the  specified

target number of pieces. If the production surpasses the quantity planned for the total merged operation,

then  this  excess  and  the  corresponding  times  are  added  to  the  individual  operations  having  the  largest

order number.

Simplified example:
OP

OP01

OP02

OP03

Target quantity

Target run time

200

450

250

4.0 hours

9.0 hours

4.5 hours

BDE-SSG_81.docx

Version: 1.2.18468

Page 24 of 30

Split Operations and Merged Operations

A log record of the merged operation containing the  real quantity  500  and real  duration  5.0  hours must

now  be  “re-distributed”  over  the  individual  operations.  The  number  of  pieces  is  posted  to  the  individual

OPs one after the other (up to the specified target quantity). Depending on the posted number of pieces,

the time specifications are then calculated on the basis of the following formula:

The following values of the individual OPs can be derived from the formula:

OP

Posted quantity

Posted runtime

Individual OP01

Individual OP02

Individual OP03

200

300

0

2.0 hours

3.0 hours.

0.0 hours

Non-homogeneous merged operations

The  quantities  and  times  are  posted  proportionally  among  all  the  individual  operations  in  a  non-

homogeneous merged operation. If excess production takes place, then the excess is divided among

all the individual operations.

Simplified example:

OP

Target quantity

Standard time

Individual OP01

Individual OP02

Individual OP03

400

20

30

8.0 hours

0.5 hours

1.0 hours

A log record for the merged operation with data real quantity 200 and runtime 4  hours must now be "re-

distributed" among the individual operations. The following formula should be used in this context:

Division of times

Division of quantities

BDE-SSG_81.docx

Version: 1.2.18468

Page 25 of 30

recordtheofquantityTotalquantitypostedtimerecordTotaltimePostedlog*logrecordtheofdurationTotalOPsindividualalloftimesdardsoftotalOPindividualoftimeardStimePostedlogtan*tanrecordtheofquantityactualOPsindividualallofquantitiesetttotalOPindividualofquantityetTquantityPostedlogarg*arg

Split Operations and Merged Operations

The following values for the individual OPs can be derived from the formula:

OP

OP01

OP02

OP03

Posted quantity

Posted runtime

178

  9

13

3.4 hours

0.2 hours

0.4 hours

Calculation example (for individual OP01)

Posted runtime = 8/9.5 * 4 = 3.4

Posted quantity = 400/450 * 200 = 178 pieces.

PLEASE NOTE

The standard time of an operation is calculated from the target setup time + processing time. All

data for this calculation is located in the order backlog of the operation.

The  definition  of  the merged  operation  type  is  undertaken  homogeneously  on  a  one-time  basis  through

HYDRA  basic  settings  for  the  entire  HYDRA  system  with  the  help  of  the  "processing  of  merged

operations" option.

The upload of the entered times to the PPS system takes place according to the definition of the merged

operation type – homogeneous or non-homogeneous.

If  a  member  of  a  merged  operation  e.g.,  is  closed  through  the  ERP  interface,  then  it  is  left  out  of  the

above mentioned settlements.

4.2.3  Additional information

Validation checks

As a rule, validation checks performed as part of the posting process (e.g. target quantity checking

for  partial  uploads)  are  only  made  for  the  merged  operation,  not  for  the  individual  operations

assigned to the merged operation.

Modifications in OP data

Modifications of MOPs

Modifications in MOP do NOT lead to changes in the individual OPs.

Changes to a member of a merged operation

Modifications to a member of a merged operation do not affect the master operation.

Here too, whether or not modifications are permitted generally depends on its status, as in the case

of a normal operation.

BDE-SSG_81.docx

Version: 1.2.18468

Page 26 of 30

Split Operations and Merged Operations

BDE-SSG_81.docx

Version: 1.2.18468

Page 27 of 30

Split Operations and Merged Operations

5  Generate and Dissolve Merged Operations

Summary

Menu

Production control  Production overview  Operations
Production control  Production support  Pool of orders
Production control  Production support  Order sequencing

Function authorization

op.colopcreate
op.coloprelease

Generate merged operation
Dissolve merged operation

Usage

The function used to generate merged operations consolidates the individual OPs to one representative

OP. The representative OP is then logged on at the terminal.

Integration

 As opposed to merged operations generated at the terminal, merged operations that were generated at

the console can be planned using the planning functions in MOC.

Information relating to processing and posting merged operations can be found here.

Requirement

The ability to generate merged operations in MOC requires that the relevant configuration is active in the

HYDRA basic settings. Depending on this configuration, the merged operation functions can either only

be used at the terminal or in MOC.

Generating a merged operation

To generate a merged operation, you must select all of the operations that you would like to include in the

merged operation. To select several operations (or also to deselect them), hold down the Ctrl key while

clicking on the separate operations.

BDE-SSG_81.docx

Version: 1.2.18468

Page 28 of 30

Split Operations and Merged Operations

By  pressing  the  button

,  the  function  "Generate  merged  operations"  is  called  up.  A  dialog  opens

that has the following input fields:

MOP  order  number:  Enter  the  order  number  here  under  which  you  would  like  to  create  the  merged

operation. If you would prefer that HYDRA issues the number automatically, leave this field empty.

Operation: By default, the system suggests operation number 0000 here.

Target  quantity:  By  default,  the  sum  total  of  all  target  quantities  (primary  quantity  unit)  of  each  of  the

separate  operations is suggested  as the  target quantity.  Please keep in mind that no  unit conversion  is

performed here and as such the operations should all have the same primary quantity unit.

Setup  duration:  By  default,  the  maximum  among  the  highlighted  operations  is  suggested  as  the  setup

duration.

Processing  time:  By  default,  the  sum  total  of  all  processing  times  of  each  of  the  separate  operations  is

suggested as the processing time.

Reference OP: The data from the order/ operation defined in the field Reference OP ("master copy") are

pulled for the merged operation.  The selected operation with the lowest order/ operation number is used

for the pre-assignment.

After confirming the dialog, the new merged operation is generated.

Changes to the merged operation DO NOT affect the stock data that are to be incorporated into

this merged operation.

When the merged operation is dissolved into its "members", these still contain the data that they

had at the time the merged operation was generated.

Dissolving a merged operation

As long as it has not  yet been started (status "V"), you can still break down a merged operation into its

"Members" again by highlighting it and by then pressing the

 button. You will no longer be able to

dissolve a merged operation after it has started.

Changes to the merged operation DO NOT affect the stock data that are to be incorporated into

this merged operation.

BDE-SSG_81.docx

Version: 1.2.18468

Page 29 of 30

Split Operations and Merged Operations

When the merged operation is dissolved into its "members", these still contain the data that they

had at the time the merged operation was generated.

Displaying merged operations

You  can  use  the  selection  feature  in  the  evaluations/  overviews  to  control  in  how  far  the  members  of

merged operations or a single merged operation are displayed.

Indiv. OPs

Only  "normal"  operations  are  displayed,  no  merged  operations  and  also  no  members  of  merged

operations

Merged operations

Only merged operations are displayed (merged operation masters)

Indiv. OPs summarized in merged OP

Only MOP members are displayed

BDE-SSG_81.docx

Version: 1.2.18468

Page 30 of 30

