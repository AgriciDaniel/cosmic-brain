Manual

Processing Alternative /
Parallel Sequences
BDE-APF 8.2

Version 1.1.23414

Last changed on: 25.09.2020

Processing Alternative / Parallel Sequences

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

BDE-APF_82.docx

Version: 1.1.23414

Page 2 of 14

Processing Alternative / Parallel Sequences

Contents

1  Overview: Processing Alternative / Parallel Sequences .............................. 4

2  Edit Order Sequences .................................................................................. 5

BDE-APF_82.docx

Version: 1.1.23414

Page 3 of 14

Processing Alternative / Parallel Sequences

1

 Overview: Processing Alternative / Parallel Sequences

Features

  Processing of alternative or parallel sequences

o  Supplementary function for processing alternative or parallel sequences in HYDRA

o  Configuration  option  used  to  activate  sequence-based  functions  in  HYDRA  as  part  of

customizing.

o  Management of standard sequence and alternative or parallel sequences

o  Option of transferring alternative sequences (customer-specific interface)

o  Tabular  sequence  display  with  option  to  replace  sequences  from  alternative  sequences

in HYDRA to short-term production control (uploading the sequence replacement to SAP

requires that a customer-specific interface has been realized)

o  Maintenance or processing dialog used to display or create order sequences

o  Consideration  of  the  smallest  quantity  of  a  parallel  sequence  if  validation  checking  for

send-ahead quantities is enabled.

o  Transfer of parallel sequences from SAP PP via the PP-PDC interface

o  Consideration of sequences for time ticket-based uploads via PP-PDC interface to SAP

PP.

Please note: Adding and coordinating the specific requirements and implementing them are

considered a customized HYDRA service (a service subject to an added charge).

BDE-APF_82.docx

Version: 1.1.23414

Page 4 of 14

Processing Alternative / Parallel Sequences

2  Edit Order Sequences

Overview

HYDRA menu

Order management  Order management  Edit order sequences

FEDRA menu

Detailed Scheduling  Order management  Edit order sequences

Transaction code

edseq

Function authorization

edseq

Purpose

If  you  want  to  group  operations  of  an  order,  you  can  create  sequences  of  operations  in  an  order.  In

production,  you  use  these  sequences  to  specify  the  processing  of  operations.  Within  a  sequence,  the

operations  are  processed  one  after  the  other  according  to  the  specified  order.  You  can  link  several

sequences. Using these links, you can integrate network-type structures.

You can also use parallel or alternative order sequences. The following sequence types are supported:

Standard sequence

The standard sequence is available by default and describes the first sequence of the order.

If  an  order  is  sequentially  processed,  you  only  require  the  standard  sequence.  If  you  want  to  process

specific operations in parallel or optionally  to  the standard sequence,  you must create a new sequence

including  the  respective  operations.  A  standard  sequence  can  then  have  parallel  and  alternative

sequences. In this case, the standard sequence always has sequence number 0.

BDE-APF_82.docx

Version: 1.1.23414

Page 5 of 14

01000200030004000500

Processing Alternative / Parallel Sequences

Parallel sequences

A parallel sequence runs in parallel to a partial sequence of the standard sequence.  You use a parallel

sequence,  if  specific  processes  must  run  at  the  same  time.  You  use  parallel  sequences  in  process

industry, for example.

In  the  example,  the  parallel  sequence  includes  the  operations  0210  and  0220.  To  position  this  parallel

sequence,  you  must  define  an  operation  that  identifies  the  start  of  the  sequence  (branch  OP)  and  an

operation  that  identifies  the  end  of  the  sequence  (return  OP).  You  specify  these  operations  in  the

application Order sequences.

Example 1:

(blue = standard sequence; green = parallel sequence)

In  the  example,  the  parallel  sequence  only  includes  operation  0030.  The  respective  branch  OP  for  this

parallel sequence is operation 0020, the return OP is also operation 0020.

BDE-APF_82.docx

Version: 1.1.23414

Page 6 of 14

0100020003000400050002100220

Example 2:

Processing Alternative / Parallel Sequences

In  the  example,  the  parallel  sequence  includes  the  operation  0021  and  the  operation  0022.  The

respective branch OP for this parallel sequence is operation 0020, the return OP is operation 0030.

Alternative sequences

An alternative sequence describes one or more operations, which can be processed as an alternative to a

partial  sequence  of  the  standard  sequence.  You  use  alternative  sequences,  if  you  have  different

production process for different batch sizes, for example.

If  alternative  sequences  are  available,  only  one  of  the  alternative  sequences  is  active  and  used  for

processing.

Order with an inactive alternative sequence

Order with an active alternative sequence

The system does not use  inactive sequences. The  inactive sequences are  not  used  in scheduling  or in

detailed planning and you cannot make postings for inactive sequences.

You can activate an alternative sequence on the client if specific conditions are fulfilled:

BDE-APF_82.docx

Version: 1.1.23414

Page 7 of 14

01000200030004000500031003200100020003000400050003100320

Processing Alternative / Parallel Sequences

General

  Each operation is assigned to exactly one sequence.

  The  system  stores  the  resulting  relationships  between  the  operations  and  between  the

sequences in a table showing the internal relationships.

  Parallel sequences always run in parallel with the standard sequence.

  Alternative  sequences  are  always  an  alternative  to  the  standard  sequence  or  to  a  part  of

the standard sequence.

  An overlapping of different operation sequences is not permitted.



In case of a partial sequence of the standard sequence, which is specified using a branch

OP  and  a  return  OP  of  a  parallel  or  alternative  sequence,  another  parallel  or  alternative

sequence  is  not  permitted  that  has  a  branch  operation  and/or  return  operation  within  the

partial sequence.

BDE-APF_82.docx

Version: 1.1.23414

Page 8 of 14

010002000300040005000210021001000200030004000500031002100220

Processing Alternative / Parallel Sequences

Activating an alternative sequence

If you activate an alternative sequence,  the respective part of the standard sequence is replaced by the

alternative sequence. This partial sequence of the standard sequence is not run.

If the following conditions are fulfilled, you can NOT activate an alternative sequence:

  At least one operation of the partial sequence has already been started

  A  second  alternative  sequence  is  already  active  in  the  partial  sequence  where  this

alternative sequence is included.

If you activate an alternative sequence, all other alternative sequences with the same branch and return

OPs are deactivated.

If an alternative sequence is activated, the standard sequence is still identified as active.

Deactivating an alternative sequence

If  you  deactivate  an  alternative  sequence,  the  respective  part  of  the  standard  sequence  is  reactivated.

This  partial  sequence  is  then  run.  If  the  following  conditions  are  fulfilled,  you  can  NOT  deactivate  an

alternative sequence:

  At least one operation of the alternative sequence has already been started

  A  second  alternative  sequence  is  already  active  in  the  partial  sequence  where  this

alternative sequence is included.

Deleting sequences

You can only delete a sequence that does not include any operations.

As a rule, you cannot delete a standard sequence.

Creating and deleting operations

If you create or delete an operation, the system automatically updates the order network for this

order.  The  order  network  documents  the  relations  between  operations.  The  order  network  is

used for the planning in the shop floor scheduling and for the processing/posting.

BDE-APF_82.docx

Version: 1.1.23414

Page 9 of 14

Processing Alternative / Parallel Sequences

Copying an order

If an order is copied, the new order is available in its "initial state". This means that any existing

alternative  sequences  are  generally  inactive,  even  if  they  were  previously  active  in  the  order

that was copied.

Operation status

Using  the  operation  status,  you  cannot  identify  if  the  operation  is  part  of  an  active  alternative

sequence or part of an inactive alternative sequence or part of an inactive partial sequence of

the standard sequence (after activation of an alternative sequence). The operation status does

not change during activation or deactivation.

Operations  of  active  sequences  have  the  initial  status  prepared  when  they  are  created.

Operations  of  an  inactive  alternative  sequence  have  the  same  status  when  they  are  created

(prepared).

Sequencing list

The  sequencing  list  does  not  display  operations  of  an  inactive  alternative  sequence  or  an

inactive partial sequence of the standard sequence (after activation of an alternative sequence).

You cannot log on these operations.

Merged operation

You  cannot  include  operations  in  a  merged  operation  that  are  part  of  an  inactive  alternative

sequence or part of an inactive partial sequence of the standard sequence (after activation of an

alternative sequence).

Specific features of parallel sequences

The planning algorithms in the shop floor scheduling also integrate parallel sequence structures.

If  the  option  "Checking  status  of  predecessor"  is  active  and  if  you  have  combined  several  parallel

sequences,  you  can  only  log  on  a  succeeding  operation  when  all  sequences  or more  precisely  the  last

operations of these sequences have been interrupted or finished. Any overlapping is identified.

To identify the send-ahead quantity of several parallel sequences, the system uses the smallest yield of

the grouped sequences or of their last operations. The identified quantity is used as target quantity for the

succeeding  operations  if  the  processing  code  of  the  respective  operation  includes  a  target  quantity

update.

BDE-APF_82.docx

Version: 1.1.23414

Page 10 of 14

Processing Alternative / Parallel Sequences

Integration

To  display  operations  of  alternative  sequences  in  the  functions  and  evaluations  on  the  client,  note  the

following:

Operations / Operations logged on / Pool of orders

In the column Control, "Y" identifies an operation of an inactive sequence ("inactive operation").

If you do not want to display operations of inactive sequences in the order overview, then go to the

selection panel, field Control: enable all options, but disable the option "Y".

Order overview

In tab Progress, the system displays operations of active and inactive sequences.

Order information

In  the  order  information,  the  system  displays  operations  of  active  and  inactive  sequences.  If  you

want to identify the operations of inactive sequences, you must show the column  Control. Use the

column  configurator  of  the  operation  table  to  show  this  column.  In  this  column,  the  operations  of

inactive sequences have the identifier "Y".

Requirements

If you want to process sequences in the system, you require the respective license. You cannot use DOS

based terminals (only applies when using HYDRA).

The following steps are required before use:

1.  Configuration of the sequence number length in the system basic settings

WARNING

The sequence number length can only be configured during the initial system implementation process as

long  as  no  order  backlog  data  is  available  in  the  system.  A  subsequent  setting  or  change  leads  to

inconsistent behavior.

2.  Reactivation of the dynamic dialogs

As  a  result,  the  input  fields  on  the  Windows  terminal  will  expand  by  the  defined  sequence  number

length (only applies when using HYDRA).

Selection criteria

The application provides the following selection criteria:

Order

Enter the number of the order to display the sequences of this order.

BDE-APF_82.docx

Version: 1.1.23414

Page 11 of 14

Processing Alternative / Parallel Sequences

Field descriptions

Order number

Order  that  includes  the  specified  sequence.  You  can  only  create  a  sequence  for  an  order  if  the

order header is already available in the system.

Sequence

Identification of the sequence within an order.

Note: The standard sequence always has the sequence number 0.

If  the  "sequence"  field  is  not  shown  in  the  editing  dialog,  the  sequence  number

length in the basic settings is 0. Please contact MPDV.

Name

Description of the sequence.

Sequence category

S = Standard sequence

For each order, there is exactly one standard sequence; you cannot delete the standard sequence.

P = Parallel sequence of the standard sequence

For each order, several parallel sequences can be available

A = Alternative sequence of the standard sequence

For each order, several alternative sequences can be available

Note:

After having created a sequence, you cannot change the category of the sequence.

Active

The identifier "Active" is only relevant for alternative sequences:

J = Active

N = Not active

If you create a new alternative sequence, this sequence is set to not active.

In case of standard sequences and alternative sequences, this identifier is always set to Active.

Alignment

If several parallel sequences are available, the sequences usually have a different lead time. If you

select  a  specific  sequence,  you  can  have  a  resulting  time  buffer.  The  alignment  function  controls

whether these buffers are at the beginning or the end of the sequence. The following variants are

possible:

F = Earliest due date

If you use the earliest date to align the sequence, the buffer will be at the end of the sequence.

BDE-APF_82.docx

Version: 1.1.23414

Page 12 of 14

Processing Alternative / Parallel Sequences

S = Latest due date

If you use the latest date to align the sequence, the buffer will be at the beginning of the sequence.

N = Irrelevant; this is the case for standard sequences and alternative sequences.

If  several  parallel  sequences  are  available  for  a  standard  sequence,  the  system  checks  the

alignment for all parts of the standard sequence that have a parallel sequence.

Version

Revision number/version, for information purposes only.

Branch operation

Number of an operation included in the standard sequence:

- parallel sequence: the parallel sequence starts before the specified operation

-  alternative  sequence:  the  operation  of  the  alternative  sequence  starts  instead  of  the  specified

operation.

In  case  of  parallel  and  alternative  sequences,  this  is  a  mandatory  field.  In  case  of  a  standard

sequence, this field must be empty.

If  you  manually  create  an  alternative  or  parallel  sequence,  the  branch  operation  of  the  standard

sequence must already be available in the pool of orders. If you transfer a sequence via interface,

you must transfer a valid operation number for this field (no validation check is performed).

Return operation

Number of an operation included in the standard sequence:

- parallel sequence: the parallel sequence returns to the standard sequence after this OP.

- alternative sequence: the alternative sequence replaces the standard sequence up to this OP.

In  case  of  parallel  and  alternative  sequences,  this  is  a  mandatory  field.  In  case  of  a  standard

sequence, this field must be empty.

If  you  manually  create  an  alternative  or  parallel  sequence,  the  return  operation  of  the  standard

sequence must already be available in the pool of orders. If you transfer a sequence  via interface,

you must transfer a valid operation number for this field (no validation check is performed).

Reference sequence

The  reference  sequence  specifies  the  sequence  of  the  order  that  is  identified  via  the  two

operations,  branch  OP  and  return  OP.  The  reference sequence  is  always  the  standard  sequence

(sequence number 0).

In  case  of  parallel  and  alternative  sequences,  this  is  a  mandatory  field.  The  standard  sequence

must already exist.

In case of a standard sequence, this field must be empty.

BDE-APF_82.docx

Version: 1.1.23414

Page 13 of 14

Processing Alternative / Parallel Sequences

Toolbar

 Activate

Activate an alternative sequence

 Deactivate

Deactivate an alternative sequence

 Edit orders

Calls the application Edit orders.

BDE-APF_82.docx

Version: 1.1.23414

Page 14 of 14

