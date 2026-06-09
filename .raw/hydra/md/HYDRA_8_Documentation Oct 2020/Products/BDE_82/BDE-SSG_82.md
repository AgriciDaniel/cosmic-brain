Manual

Split and Merged Operations
BDE-SSG 8.2

Version 1.3.23049

Last changed on: 01.09.2020

Split and Merged Operations

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

BDE-SSG_82.docx

Version: 1.3.23049

Page 2 of 31

Split and Merged Operations

Contents

1  Overview: Split and Merged Operations ...................................................... 4

2  Splitting Operations ...................................................................................... 5

3  Enhanced Split Function ............................................................................ 10

Split operation ............................................................................................................. 11

Cancel operation splits ................................................................................................ 15

Displaying operation splits ........................................................................................... 16

Posting for split operations .......................................................................................... 16

Uploading part quantities to the PPS/ERP system ...................................................... 17

4  Processing of Merged Operations.............................................................. 18

4.1  Creating merged operations on the terminal ...................................................... 18

4.1.1  Different posting types of merged operations......................................... 19

4.1.2  Posting of merged operations on the terminal........................................ 19

4.1.3  Booking of merged operations created on the terminal .......................... 20

4.1.4  Notes on the configuration and the processing ...................................... 23

4.2  Creating merged operations on the MOC .......................................................... 24

4.2.1  Creating merged operations on the MOC .............................................. 25

4.2.2  Booking of merged operations (created on the MOC) ............................ 25

4.2.3  Further notes ......................................................................................... 27

5  Generating and canceling a merged operation .......................................... 29

BDE-SSG_82.docx

Version: 1.3.23049

Page 3 of 31

Split and Merged Operations

1  Overview: Split and Merged Operations

Purpose

This function package provides functions that can be used to split or consolidate operations and also the

corresponding posting functions.

Implementation notes

You use the function package if:

  You  would  like  to  combine  different  short-running  operations  in  order  to  be  able  to  enter  them

"one-to-one".

or if

  You  want  to  shorten  operation  lead  times  or  better  utilize  workplaces  /  machines  available  for

production by processing operations in parallel.

Integration

The functions contained in this package are also integrated in different function groups of the Shop Floor

Data Collection module.  Emphasis here is on data entry,  i.e. posting at the terminal, and posting in the

system.

Features

  Split operations

o  User dialog for generating and managing split operations

o  Supply of split operations for MES planning and entry in order to plan split operations in

parallel and to be able to post quantities and times to them.

o  Merging production activities to the original operation and uploading to the ERP

  Merged operations

o  Function in the MOC for combining operations with short processing duration into merged

operations

o  User  dialog  at  the  Windows  terminal  for  generating,  posting  and  managing  merged

operations

o  Supply of merged operations for MES planning and entry

o  Posting times and quantities proportionally to original operations based on configuration

and confirmations/uploads

BDE-SSG_82.docx

Version: 1.3.23049

Page 4 of 31

Split and Merged Operations

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

BDE-SSG_82.docx

Version: 1.3.23049

Page 5 of 31

Split and Merged Operations

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

BDE-SSG_82.docx

Version: 1.3.23049

Page 6 of 31

All other data is transferred from the original operation.

After splitting, the order is flagged for lead time scheduling.

Split and Merged Operations

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

BDE-SSG_82.docx

Version: 1.3.23049

Page 7 of 31

Split and Merged Operations

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

BDE-SSG_82.docx

Version: 1.3.23049

Page 8 of 31

Split and Merged Operations

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

BDE-SSG_82.docx

Version: 1.3.23049

Page 9 of 31

Split and Merged Operations

3  Enhanced Split Function

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

BDE-SSG_82.docx

Version: 1.3.23049

Page 10 of 31

Split and Merged Operations

Split operation

Function authorization

op.split

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

BDE-SSG_82.docx

Version: 1.3.23049

Page 11 of 31

Operations with a difference between target quantity and actual quantity that is less than 0 are not

used. This difference results from overproduction. Such a surplus is no longer produced and, as a

Split and Merged Operations

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

BDE-SSG_82.docx

Version: 1.3.23049

Page 12 of 31

Split and Merged Operations

Interactive input options of the planner

If you enter the "number of splits" and, if required, the quantity that you want to split, and if you then press

the "split" button, the splits are generated in the list. You can still change the target quantity and the setup

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

BDE-SSG_82.docx

Version: 1.3.23049

Page 13 of 31

Split and Merged Operations

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

BDE-SSG_82.docx

Version: 1.3.23049

Page 14 of 31

Split and Merged Operations

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

BDE-SSG_82.docx

Version: 1.3.23049

Page 15 of 31

Split and Merged Operations

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

  The single operations split off are shown in the following applications, provided that  the relevant

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

BDE-SSG_82.docx

Version: 1.3.23049

Page 16 of 31

Split and Merged Operations

Uploading part quantities to the PPS/ERP system

The values recorded or posted for split operations are generally uploaded to the PPS/ERP system with

reference to the split master.

BDE-SSG_82.docx

Version: 1.3.23049

Page 17 of 31

Split and Merged Operations

4  Processing of Merged Operations

Purpose

Merged  operations  are  a  special  form  of  the  serial  production.  In  the  relevant  planning  level  (e.g.  in

HYDRA shop floor scheduling) or on the shop floor terminal, you combine different operations with a short

run time each to a logic group, which then has a manageable run time. This group of operations is called

"merged operation". The system creates a "substitute" operation representing the merged operation. You

then plan and log on only the "substitute" operation that contains all single operations. You use different

configurable perspectives to distribute the data recorded.

Integration

To create a merged operation, HYDRA provides two methods:

Creating merged operations on the terminal

The operator creates the merged operation on the terminal. When you log on a merged operation,

you enter the single operations one after the other and assign them to the relevant person. When

you log off or interrupt this merged operation, you must only enter the person.

Creating merged operations on the MOC

The  function  Generate  merged  operation  combines  separate  operations  and  builds  a  substitute

operation that stands in for all the other short operations. You log on the substitute operation on the

terminal.

If  you  have  created  a  merged  operation  on  the  MOC,  you  can  schedule  this  merged  operation

using  the  MOC  planning  functions.  This  is  not  possible  with  merged  operations  created  on  the

terminal.

Requirements

You cannot create merged operations on the terminal and on the MOC. This is incompatible.  You must

configure  in  the  HYDRA  basic  settings  which  one  of  the  two  methods  is  used.  Subject  to  this

configuration,  the  functions  for  merged  operations  are  available  either  on  the  terminal  or  on  the  MOC

only.

4.1  Creating merged operations on the terminal

Using the function Merged operation on the terminal, you can combine several operations and build one

merged operation (MOP) on the terminal.

Order processing using merged operations is useful if:

BDE-SSG_82.docx

Version: 1.3.23049

Page 18 of 31

Split and Merged Operations



several  operations  with  short  run  times  are  combined  to  build  one  operation  (lower  posting

efforts),



several operations are produced using one workplace at the same time. The system cannot make

timely  logon/logoff  postings  for  the  separate  operations  (for  example  during  hardening  in  the

metal industry or smoking in the food industry).

4.1.1  Different posting types of merged operations

The below-mentioned types of postings for merged operations are specified in the Terminal configuration.

"Generation per person"

When you log on a MOP, you log on the combination of person  and orders. The person who combines

several  operations  to  build  a  MOP  is  automatically  logged  on  to  all  separate  operations  included  in  the

MOP.

Only one MOP is possible per person. If a person performs another MOP logon at a later time, then these

separate operations are automatically assigned to the already existing MOP.

A  MOP  can  only  be  logged  on,  logged  off  or  interrupted.  You  cannot  log  on  additional  persons  to  a

person-related MOP.

"Generation per machine"

With  this  configuration,  you  can  use  the  function  Log  on  merged  operation  on  the  terminal  to  combine

several OPs and build one MOP. Per machine, you can create one MOP.

Just as it is the case for single operations, several persons can log on to this MOP. If you interrupt or log

off  the  MOP,  all  persons  logged  on  are  automatically  logged  off.  The  posting  of  quantities  and  the

distribution of times is made in accordance with the specifications described in the sections that follow.

4.1.2  Posting of merged operations on the terminal

For  information  on  how  to  create  merged  operations  on  the  terminal,  refer  to  the  relevant  terminal

documentation (for Windows or DOS terminals).

Merged operations are created on the terminal as described in the relevant documentation. The terminal

generates a substitute order number for the merged operation. Depending on the posting type, the user's

badge number or the machine/workplace number is integrated in this order number:

Merged operation number for the "generation per person" option

Depending  on  the  length  of  the  order  number  and  staff  badge  number  configured  in  the  system,  the

number of the merged operation is created as follows:

BDE-SSG_82.docx

Version: 1.3.23049

Page 19 of 31

Split and Merged Operations

The length of the order no. is at least four characters longer than the staff badge no.:

SAM-XXXXX

xxxxx represents the staff badge no.

The length of the order no. is at least two characters longer than the staff badge no.:

S-XXXXX

xxxxx represents the staff badge no.

The order number length is not at least two characters longer than the staff badge number:

In this case, the standard function "merged operations on the terminal" cannot be used.

Merged operation number for the "generation per machine" option

Depending  on  the  length  of  the  order  number  and  the  machine  number  configured  in  the  system,  the

number of the merged operation is created as follows:

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

In this case, the standard function "merged operations on the terminal" cannot be used.

4.1.3  Booking of merged operations created on the terminal

The actual times recorded for the MOP can be distributed according to the following methods:

According to the standard times, i.e. in relation to the standard times of the separate OPs

According to the default quantities, i.e. in relation to the target quantities of the separate OPs

According to the individual OP, i.e. according to the number of the logged on single OPs

The posting method is defined in the Basic settings.

BDE-SSG_82.docx

Version: 1.3.23049

Page 20 of 31

Split and Merged Operations

The  options  "according  to  standard  time"  or  "according  to  default  quantity"  must  not  be  used

together with the option Proportionate RPA posting in personnel postings in the basic settings.

Please contact MPDV Support to configure the MOP posting method.

Example - Distribution according to standard time

Distribution of the actual times of the MOP according to the standard times of the separate OPs:

3 operations are combined and form one MOP:

OP

OP01
OP02
OP03

Standard time

8000 sec
600 sec
6000 sec

A log record for the MOP  with the run time of 12000 sec must now be distributed to the separate OPs.

The following formula is used to distribute the times

The following values result for the separate OPs:

OP

OP01
OP02
OP03

Run time booked

6575 sec
493 sec
4932 sec

  Sample calculation for OP 01:

Sum of standard times of all separate OPs = 8000 + 600 + 6000 = 14600

Run time booked = 12000 * 8000/14600 = 6575 sec

PLEASE NOTE:

The standard time of an operation is calculated using the target setup time + target duration.

Example - Distribution according to standard time

Distribution of the actual times of the MOP according to the target quantities of the separate OPs:

3 operations are combined to form one MOP:

BDE-SSG_82.docx

Version: 1.3.23049

Page 21 of 31

OPsalloftimesdardstheofTotalOPindividualoftimedardsrecordtheofdurationTotaltimesPostedtantan*log

Split and Merged Operations

OP

OP01
OP02
OP03

Target quantity

1000
500
2500

A log record for the merged OP with the run time 12000 sec must now be booked to the different OPs. To

distribute the times, the following formula applies

The following values result for the separate OPs:

OP

OP01
OP02
OP03

Run time booked

3000 sec
1500 sec
7500 sec

Sample calculation for OP01:

Sum of target quantities of all separate OPs = 1000 + 500 + 2500 = 4000

Run time booked = 12000 * 1000/4000 = 3000 sec

Example – Distribution according to the number of separate operations

Distribution of actual times of the MOP according to single OPs

3 OPs are combined to form one MOP:

A log record for the MOP with the run time 12000 sec must now be distributed to the different OPs.  To

distribute the times, the following formula applies

The following values result for the separate OPs:

OP

OP01
OP02
OP03

Run time booked

4000 sec
4000 sec
4000 sec

The quantities and the times recorded are also posted for the person who processes the MOP.

BDE-SSG_82.docx

Version: 1.3.23049

Page 22 of 31

OPsindividualallofquantitiesettofTotalOPindividualofquantityettrecordofdurationTotaltimePostedargarg*logOPsindividualofnumberrecordtheofdurationTotaltimePostedlog

Split and Merged Operations

4.1.4  Notes on the configuration and the processing

Configuration and use

  By default, the “merged operation” function is not active and must be enabled for a specific terminal in

the terminal configuration.

  Only  the  ADE  terminal  provides  MOP  functions  on  DOS  terminalsCT56x  und  CT73x  .  On Windows

terminals, the MOP functions can also be used in "MDE" operation mode.

  To  produce  a  MOP,  the  option  Logon  of  several  OPs  must  be  set  in  the  workplace/machine

configuration, i.e. it is permitted to log on several operations at this workplace.

  When  you  create  merged  operations  on  the  terminal,  the  option  Max.  OPs  per  person  of  the  HR

master data is  used. If the option  Max. OPs  per  person  is set to  =1 for the person, the  person can

only log on one operation as merged operation.

  A person can use a maximum of 20 separate operations to build a merged operation.

  When  you  log  on  a  MOP  on  a  DOS  terminal  Typ  CT56x  und  CT73x  ,  a  sequencing  list  is  not

supported, i.e. you must enter the order numbers via barcode or manually.



If the number of pieces is not recorded for a merged operation, the actual quantity produced is set to

the target number of pieces of the separate OPs when the MOP is logged off.



If the quantity is recorded for a merged operation, the quantity entered for each operation is posted to

the different operations when the merged operation is interrupted or logged off.

  For  merged  operations  that  are  logged  on  to  workplaces/machines  with  automatic  recording  of

quantities,  the  proportionate  quantity  is  posted  to  each  separate  operation.  The  quantities  are

distributed according to the same key as it is the case for times. See the sections above.

  When  the  MOP  is  logged  off/interrupted,  you  must  only  enter  the  badge  number  (MOP  person).  All

operations included in a person's merged operation are logged off automatically.

Supported automatic functions/data collection options

  Terminate OP when reaching target quantity, only option "Y" (as of SP10/2016)

When the MOP is interrupted, the system checks if the single OP has reached its target quantity. If

yes,  the  relevant  OP  is  finished  instead  of  interrupted.  The  system  does  not  automatically  log  off  a

single OP from a merged operation, if the target quantity of a single OP is reached or exceeded with

an upload of a partial quantity or an automatic recording of quantities.

  Terminate OP instead of interrupting it

When you interrupt the MOP, the system checks if the single OP is finished and not interrupted.



Interrupt OP instead of terminating it

When you log off the MOP, the system checks if the single OP is interrupted and not finished.

  Automatic release of succeeding OP

BDE-SSG_82.docx

Version: 1.3.23049

Page 23 of 31

Split and Merged Operations

  Configurable posting behavior with change/end/beginning of shift

The order type specifies if the behavior is configured for the machine or the person. Special feature:

With  person-related  MOPs,  the  merged  operation  is  interrupted  when  the  person  is  logged  off,

regardless of the OP setting.

Not supported or restricted automatic functions/data collection options

  Terminate OP when reaching target quantity: options U, F and K

  Option Proportionate posting of machine time with parallel OPs in the machine configuration because

this option performs the proportionate posting that is configured for the MOP.

  Target quantity reached output (is only performed for the total quantity of the MOP)

  Collection of serial number

  Data collection with batch management requirement

  Posting of resources

  With the milestone processing, you must be aware that a single OP of a MOP cannot be unmerged

from the MOP when a posting is made for the preceding or succeeding OP.

Example:

When you log off an OP, the preceding OP cannot be logged off automatically if the preceding OP is

included in a merged OP (person or machine).

The MOP must be logged off manually.

  Other  restrictions  exist  with  the  CAQ  integration  and  the  data  collection  for  MOPs,  for  example  the

automatic logon and logoff of inspection OPs.

Waiting period processing

If you must postdate a MOP logon because of the waiting period processing, the first single operation of

this merged operation is postdated. Further OPs that might be added to the MOP at a later time need not

be postdated.

If a clock-out is posted in the PZE for the person that processed the MOP, then all included operations

are automatically interrupted.

If the waiting period processing function is configured accordingly, it is also possible that the person who

processes the MOP is automatically logged on again as soon as they clock-in in HYDRA-PZE.

4.2  Creating merged operations on the MOC

You can use this function to combine separate operations to build merged operations on the MOC.

The  functions  to  create  and  cancel  merged  operations  are  available  in  the  Order  overview  and  in  the

Order sequencing dialog (to call the order sequencing, the BDE-FST must be licensed).

BDE-SSG_82.docx

Version: 1.3.23049

Page 24 of 31

Split and Merged Operations

If a merged operation is created on the MOC, then the “members” of a merged operation are no longer

displayed. Also in the sequencing list on the terminals, the member operations are no longer displayed.

The number of members in a merged operation is not limited. You can only add prepared orders/OPs to

merged operations that are not already contained in other merged operations.

You cannot integrate merged operations themselves into other merged operations.

All  postings  of  a  merged  operation  on  the  terminal  are  made  for  all  "members"  of  a  merged  operation.

You can log on, interrupt and log off merged operations on the terminal exactly like normal operations.

4.2.1  Creating merged operations on the MOC

The method to create merged operations is described here.

4.2.2  Booking of merged operations

(created on the MOC)

To  distribute  the  quantities  and  times  recorded  for  a  merged  operation  among  the  included  operations,

the  system  supports  the  "homogeneous"  and  the  "inhomogeneous"  method  for  the  merged  operations

that were not created on the MOC.

Homogeneous merged operations

With a homogeneous merged operation, quantities and times are distributed using the overrun principle:

all  separate  operations  are  “filled  up”  one  after  the  other  according  to  the  specified  target  number  of

pieces. If the production surpasses the quantity planned for the total merged operation, then this excess

and the respective times are added to the single operation having the largest order number.

Simplified example:
OP

Target quantity

Target run time

OP01

OP02

OP03

200

450

250

4.0 hours

9.0 hours

4.5 hours

A log record of the merged operation containing the  real quantity  500  and real  duration  5.0  hours must

now  be  redistributed  among  the  separate  operations.  The  number  of  pieces  is  posted  to  the  separate

OPs one after the other (up to the specified target quantity). Depending on the posted number of pieces,

the following formula is used to calculate the times:

BDE-SSG_82.docx

Version: 1.3.23049

Page 25 of 31

recordtheofquantityTotalquantitypostedtimerecordTotaltimePostedlog*log

Split and Merged Operations

The following values result for the separate OPs:

OP

Single OP01

Single OP02

Single OP03

Posted quantity

Run time booked

200

300

0

2.0 hours

3.0 hours

0.0 hours

Non-homogeneous merged operations

With an inhomogeneous merged operation, the quantities and times are posted proportionately to the

separate operations included. If excess production takes place, then the excess is distributed among the

different operations.

Simplified example:

OP

Single OP01

Single OP02

Single OP03

Target quantity

Standard time

400

20

30

8.0 hours

0.5 hours

1.0 hours

A log record for the merged operation including an actual quantity 200 and a run time 4 hours must now

be redistributed to the separate operations. The following formulas apply:

Distribution of times

𝑃𝑜𝑠𝑡𝑒𝑑 𝑡𝑖𝑚𝑒 = (

𝑆𝑡𝑎𝑛𝑑𝑎𝑟𝑑 𝑡𝑖𝑚𝑒 𝑜𝑓 𝑖𝑛𝑑𝑖𝑣𝑖𝑑𝑢𝑎𝑙 𝑂𝑃 ∗
𝑆𝑢𝑚 𝑡𝑜𝑡𝑎𝑙 𝑜𝑓 𝑎𝑙𝑙 𝑖𝑛𝑑𝑖𝑣𝑖𝑑𝑢𝑎𝑙 𝑂𝑃𝑠

) ∗ 𝑇𝑜𝑡𝑎𝑙 𝑑𝑢𝑟𝑎𝑡𝑖𝑜𝑛 𝑜𝑓 𝑙𝑜𝑔 𝑟𝑒𝑐𝑜𝑟𝑑

Distribution of quantities

𝑃𝑜𝑠𝑡𝑒𝑑 𝑞𝑢𝑎𝑛𝑡𝑖𝑡𝑦 = (

𝑇𝑎𝑟𝑔𝑒𝑡 𝑞𝑢𝑎𝑛𝑡𝑖𝑡𝑦 𝑜𝑓 𝑖𝑛𝑑𝑖𝑣𝑖𝑑𝑢𝑎𝑙 𝑂𝑃
𝑆𝑢𝑚 𝑡𝑜𝑡𝑎𝑙 𝑜𝑓 𝑎𝑙𝑙 𝑖𝑛𝑑𝑖𝑣𝑖𝑑𝑢𝑎𝑙 𝑂𝑃𝑠

) ∗ 𝐴𝑐𝑡𝑢𝑎𝑙 𝑞𝑢𝑎𝑛𝑡𝑖𝑡𝑦 𝑜𝑓 𝑙𝑜𝑔 𝑟𝑒𝑐𝑜𝑟𝑑

BDE-SSG_82.docx

Version: 1.3.23049

Page 26 of 31

Split and Merged Operations

The following values result for the separate OPs:

OP

OP01

OP02

OP03

Posted quantity

Run time booked

178

  9

13

3.4 hours

0.2 hours

0.4 hours

Sample calculation (for single OP01)

Run time booked = 8/9.5 * 4 = 3.4

Quantity booked = 400/450 * 200 = 178 pieces.

The  standard  time  of  an  operation  is  calculated  using  the  target  setup  time  +  processing

time. All data required for this calculation is contained in the order backlog of the operation.

If uneven values like 2.666 result when the piece number is distributed, the calculated quantity

is  cut  off  and  2  pieces  are  booked  for  the  operation.  Exception:  With  the  last  operation,  the

difference between quantity posted and quantity already booked is used.

The  type  used  for  the  merged  operation  in  the  entire  system  is  specified  once  in  the  HYDRA  basic

settings using the BDE option Process merged operations.

The  upload  of  the  times  recorded  to  the  PPS  system  is  performed  according  to  the  definition  of  the

merged operation type – homogeneous or inhomogeneous.

If a member of a merged operation is finished e.g. via ERP interface, then this operation is skipped during

the calculations described above.

4.2.3

Further notes

Validation checks

Validation checks, which are performed during the booking process (e.g. target quantity validation

for upload of a part quantity), are only performed for the merged operation and not for the separate

operations assigned to the merged operation.

Changing OP data

Changing the MOP

If you make changes to the merged operation, the single OPs included are NOT changed.

Changing a member of a merged operation

If you make changes to one of the operations included in a merged operation, the master operation

ist not changed.

Whether  you  can  make  changes  or  not  depends  on  the  relevant  status  of  the  operation  (same

process as with a normal operation).

BDE-SSG_82.docx

Version: 1.3.23049

Page 27 of 31

Split and Merged Operations

BDE-SSG_82.docx

Version: 1.3.23049

Page 28 of 31

Split and Merged Operations

5  Generating and canceling a merged operation

Overview

Menu

Production control  Production overview  Operations
Production control  Production support  Pool of orders
Production control  Production support  Order sequencing

Function authorization

op.colopcreate
op.coloprelease

Generate merged operation
Cancel merged operation

Purpose

You  use  the  function  Generate  merged  operation  to  combine  separate  operations  and  to  build  one

substitute OP. On the terminal, you then log on the substitute operation.

Integration

If you have created a merged operation on the MOC, you can schedule this merged operation using the

MOC planning functions. This is not possible with merged operations created on the terminal.

For information on the processing and booking of merged operations, see here.

Requirements

To  generate  merged  operations  on  the  MOC,  you  must  have  activated  the  relevant  configuration  in  the

HYDRA  basic  settings.  Subject  to  this  configuration,  the  functions  for  merged  operations  are  available

either on the terminal or on the MOC only.

Generate merged operation

To generate a merged operation, select all the operations that should be part of the merged operation. To

select  several  operations  (or  to  de-select  them),  hold  the  CTRL  key  down  and  click  on  the  separate

operations.

Click  the  button

  to  call  the  function  Generate  merged  operation.  The  dialog  Generate  merged

operation opens. The following input fields are available:

MOP order number

Enter  the  order  number  for  the  merged  operation.  If  you  leave  this  field  empty,  HYDRA

automatically assigns the number.

Operation

By default, the operation number 0000 is preassigned here.

BDE-SSG_82.docx

Version: 1.3.23049

Page 29 of 31

Split and Merged Operations

Target quantity (P)

For all selected operations, the system calculates for each operation:

Calculated quantity = target quantity (P) minus yield quantity (P).

The calculated quantities are totaled if the result is > 0.

The system uses the sum total to populate the field Target quantity (P).

Note: the units are not converted; all operations must have the same primary quantity unit.

Target scrap (P)

For all selected operations, the system calculates for each operation:

Calculated quantity = target scrap (P) minus (actual) scrap (P).

The calculated quantities are totaled if the result is > 0.

The system uses the sum total to populate the field Target scrap (P).

Note: the units are not converted; all operations must have the same primary quantity unit.

Setup time

By default, the maximum setup time of the selected operations is used.

Processing time

By default, the total of all processing times of the separate operations is used as processing time.

Reference OP

The  data  of  the  order/operation  stored  in  field  Reference  OP  is  used  for  the  merged  operation

("copy template"). The system uses the operation having the  lowest order/operation number of the

selected operations to populate this field.

Confirm the dialog to generate the new merged operation.

You can combine a maximum of 50 separate operations to build a merged operation.

If you change the data of the merged operation, the inventory data of the OPs used to build this

merged operation is NOT changed.

When  you  cancel  the  merged  operation,  the  data  of  the  included  operations  is  still  the  same

than at the time when the merged operation was created.

Cancel merged operation

As long as a merged operation has not been started (V status), you can cancel this merged operation and

restore  the  separate  operations  included  by  clicking  the  button

.  Once  a  merged  operation  has

been started, you cannot cancel the merge anymore.

BDE-SSG_82.docx

Version: 1.3.23049

Page 30 of 31

Split and Merged Operations

If you change the data of the merged operation, the inventory data of the OPs used to build this

merged operation is NOT changed.

When  you  cancel  the  merged  operation,  the  data  of  the  included  operations  is  still  the  same

than at the time when the merged operation was created.

Display merged operations

With  evaluations/overviews,  you  can  control  via  selection  if  the  evaluation/overview  integrates  merged

operations or the operations included in merged operations.

Indiv. OPs

Only "normal" operations are shown, no merged operations or operations included in merged operations.

Merged operations

Only merged operations (MOP master) are shown.

Indiv. OPs summarized in merged OPs

Only the operations included in MOPs are shown.

In the application Operations (transaction code op), you can show the column MOP. This column shows

the  MES  order  number  of  the  merged  operation  to  which  the  single  operation  is  assigned  or  the  MES

order number of the merged operation itself.

BDE-SSG_82.docx

Version: 1.3.23049

Page 31 of 31

