Manual

Processing of Alternative /
Parallel Sequences
BDE-APF 8.1

Version 1.0.4716

Last changed on: 19.06.2020

Processing of Alternative / Parallel Sequences

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

BDE-APF_81.docx

Version: 1.0.8692

Page 2 of 14

Processing of Alternative / Parallel Sequences

Contents

1  Overview Processing Alternative / Parallel Sequences ............................... 4

2  Edit Order Sequences .................................................................................. 6

BDE-APF_81.docx

Version: 1.0.8692

Page 3 of 14

Processing of Alternative / Parallel Sequences

1

 Overview Processing Alternative / Parallel Sequences

Purpose

Implementation considerations

You use the function package if:





Integration

Features

  Processing of alternative or parallel sequences

o  Supplementary function for processing alternative or parallel sequences in HYDRA

o  Configuration  option  used  to  activate  sequence-based  functions  in  HYDRA  as  part  of

customizing.

o  Administration of standard sequence and alternative or parallel sequences

o  Option of transferring alternative sequences (customer-specific interface)

o  Tabular  sequence  display  with  option  to  replace  sequences  from  alternative  sequences

in HYDRA to short-term production control (uploading the sequence replacement to SAP

requires that a customer-specific interface has been realized)

o  Maintenance or processing dialog used to display or create order sequences

o  Consideration of the smallest quantity of a parallel sequence during an active plausibility

check for send-ahead quantity.

o  Transfer of parallel sequences from SAP PP via the PP-PDC interface

o  Consideration  of  sequences  during  time  ticket-based  upload  via  PP-PDC  interface  to

SAP PP.

Please note: Adding and coordinating the specific requirements and implementing them are

considered a customized HYDRA service (a service subject to an added charge).

BDE-APF_81.docx

Version: 1.0.8692

Page 4 of 14

Processing of Alternative / Parallel Sequences

BDE-APF_81.docx

Version: 1.0.8692

Page 5 of 14

Processing of Alternative / Parallel Sequences

2  Edit Order Sequences

Summary

Menu

Order Management  Order Management  Edit order sequences

Transaction code

edseq

Function authorization

edseq

Usage

Operations within an order are grouped into sequences in order to create a summary of them. Production

uses  this  information  as  an  orientation  tool  to  process  each  operation.  Within  the  sequence,  the

operations  are  processed  in  sequence  one  at  a  time.  By  linking  several  sequences  within  the  order,

network-type structures can be illustrated.

You also have the option to use parallel or alternative order sequences. The following sequence types are

supported:

Standard sequence

The standard sequence is available by default and describes the first sequence of the order.

For  a  purely  sequential  order,  only  the  standard  sequence  is  required.  If  certain  operations  are  to  be

processed  in  parallel  or  alternatively  to  the  standard  sequence,  they  must  be  grouped  in  relevant

sequences. Thus, parallel and alternative sequences can branch off of a single standard sequence.

BDE-APF_81.docx

Version: 1.0.8692

Page 6 of 14

01000200030004000500

Processing of Alternative / Parallel Sequences

Parallel sequences

A parallel sequence runs parallel to a partial sequence of the standard sequence. It is used, for example,

when certain processes are to run at the same time (in parallel). This may be the case, for example, in

the processing industry.

This  partial  sequence  is  defined  by  the  branch  operation  and  the  return  operation  of  this  particular

reference  sequence.  As  such,  the  start  of  the  parallel  sequence  is  equal  to  the  start  of  the  branch

operation in the reference sequence and the end is equal to the end of the reference sequence's return

operation.

Alternative sequences

An  alternative sequence describes one or more operations,  which can be used  alternatively to a partial

sequence of the standard sequence. It is used, for example, if the production process varies for certain

batch sizes.

Alternative sequences each have one active sequence that is relevant for processing.

BDE-APF_81.docx

Version: 1.0.8692

Page 7 of 14

0100020003000400050002100220

Processing of Alternative / Parallel Sequences

Order with an inactive, alternative sequence

Order with an active, alternative sequence

Inactive  sequences  are  not  considered  either  in  scheduling  or  in  detailed  planning;  they  can  neither  be

posted.

It is possible to activate an alternative sequence at the HYDRA console if certain conditions are met. This

occurs interactively.

General

  Each operation is assigned to exactly one sequence.

  The  relationships  that  are  created  as  a  result  between  the  operations  and  between  the

sequences are stored by HYDRA in an internal relationship table.

  Parallel sequences always run parallel to the standard sequence.

  Alternative sequences always run alternately to the standard sequence.

BDE-APF_81.docx

Version: 1.0.8692

Page 8 of 14

01000200030004000500031003200100020003000400050003100320

  Operation sequences of different sequences may not overlap.

Processing of Alternative / Parallel Sequences

  With  respect  to  a  partial  sequence  of  the  standard  sequence,  which  is  restricted  by  a

branch OP and a return OP of a parallel or alternative sequence, there may be no parallel

or alternative sequence with a branch operation and/or return operation within it.

Deleting sequences

  A sequence may only be deleted if there is no operation that is assigned to this sequence.

  As a rule, a standard sequence cannot be deleted.

Creating and deleting operations

  When an operation is created or deleted, HYDRA automatically updates the order network

for this order. The order network documents the relationships between operations and this

information  is  used  for  planning  in  HYDRA  shop  floor  scheduling  (HLS)  as  well  as  for

processing/ posting.

BDE-APF_81.docx

Version: 1.0.8692

Page 9 of 14

010002000300040005000210021001000200030004000500031002100220

Processing of Alternative / Parallel Sequences

Copying an order



If  an  order  is  copied,  the  new  order  is  available  in  its  "initial  state".  This  means  that  any

existing alternative sequences are generally inactive, even if they were previously active in

the order that was copied.

Operation status



It cannot be determined based on the operation status whether the operation is a part of the

standard  sequence's  active  alternative  sequence  or  its  inactive  alternative  sequence  or

rather  its  inactive  partial  sequence  (as  a  result  of  activating  an  alternative  sequence),

because the operation status does not change during activation or deactivation.

  Operations of an inactive alternative sequence have the same initial status prepared when

they are newly created, just as is the case for operations of active sequences.

Sequencing list

  Operations of the standard sequence's inactive alternative sequence or an inactive partial

sequence  (as  a  result  of  activating  an  alternative  sequence)  are  not  shown  in  the

sequencing list. They can neither be logged on.

Merged operation

  Operations  of  the  standard  sequence's  inactive  alternative  sequence  or  inactive  partial

sequence (as a result of activating an alternative sequence) cannot be a part of a merged

operation.

Issues of note relating to parallel sequences

  Parallel  sequence  structures  are  accounted  for  in  the  planning  algorithms  in  HYDRA  shop  floor

scheduling (HLS)



If the option "Checking status of preceding OP"  is active (customized HYDRA feature), after merging

several parallel sequences, an operation may not be logged on until all sequences or rather their last

operations have been interrupted or have been finished (depending on the customized settings). Any

overlapping is considered in the process.

BDE-APF_81.docx

Version: 1.0.8692

Page 10 of 14

Processing of Alternative / Parallel Sequences

  The smallest yield of the consolidated sequences, or rather of their last operations, is considered the

send-ahead  quantity  of  several  parallel  sequences.  This  is  carried  forward  as  the  target  quantity  to

the  successors  if  the  processing  code  provides  for  a  target  quantity  update  at  the  operation

(customized HYDRA feature).

Integration

Please  note  the  following  with  regard  to  displaying  operations  of  alternative  sequences  in  the  MOC

functions and evaluations/reports:

Operations/ operations logged on/ pool of orders

An  operation  of  an  inactive  sequence  ("inactive  operation")  can  be  recognized  by  the  "Y"  in  the

column Control.

If  no  operations  of  inactive  sequences  are  to  be  displayed  in  the  order  overview,  then  all  of  the

options except for the option "Y" must be set in the selection range in the Control selection field.

Order overview

In the Progress index tab, operations of both active as well as inactive sequences are displayed.

Order information

In the order information, operations of both active as well as inactive sequences are displayed. In

order to be able to recognize inactive sequences as such, you use the column configurator in the

operation  table  to  have  the  control  column  displayed.  In  this  column,  operations  of  inactive

sequences are listed with a "Y".

Requirement

In order to process sequences in HYDRA, the relevant license must have been issued. It is not possible

to use DOS based terminals.

The following activities are required for use:

1.  The sequence number length must have been set in the basic HYDRA settings

WARNING

You may only set the sequence number length during the initial HYDRA setup process and provided that

no  order  backlog  data  exists  in  HYDRA.  Any  subsequent  settings  or  changes  will  make  the  system  act

inconsistently.

2.  Reactivating dynamic dialogs

As a result, the input fields at the Windows terminal will expand by the defined sequence number

length.

BDE-APF_81.docx

Version: 1.0.8692

Page 11 of 14

Processing of Alternative / Parallel Sequences

Selection criteria

The application provides the following selection criteria:

Order

Enter the order number for the order with the sequences you would like to display.

Field descriptions

Order number

Order for which the sequence is defined. A sequence can only be set up for an order, if the order

header already exists in HYDRA.

Sequence

Identification of the sequence within an order.

Please note: The standard sequence always has the sequence number 0.

If  the  "sequence"  field  is  not  shown  in  the  editing  dialog,  the  sequence  number

length is 0 in the basic parameter settings. Please contact MPDV.

Designation

Description of the sequence.

Sequence category

S = Standard sequence

There is only one standard sequence for every order; the standard sequence cannot be deleted.

P = Parallel sequence to the standard sequence

There can be several parallel sequences for each order

A = Alternative sequence to the standard sequence

There can be several alternative sequences for each order

Please note:

The sequence category cannot be edited after a sequence has been set up!

Active

The qualification "Active" is only relevant for alternative sequences:

J = Active

N = Not active

If a new alternative sequence is set up, it is set as not active.

For standard sequences and alternative sequences, this qualification is always set to active.

BDE-APF_81.docx

Version: 1.0.8692

Page 12 of 14

Processing of Alternative / Parallel Sequences

Orientation

If there are several parallel sequences, the lead times generally vary in length. This creates time

buffers in the sequences. The orientation function controls whether these buffers are at the

beginning or the end of the sequence. The following options are available:

F = Earliest due date

If the sequence is set for the earliest date, the buffer will be at the end of the sequence.

S = Latest due date

If the sequence is set for the latest date, the buffer will be at the beginning of the sequence.

N = Not relevant; this is the case for standard sequences and alternative sequences.

If  there  are  several  parallel  sequences  for  a  given  standard  sequence,  the  orientation  of  the

standard sequence is used for all segments of the standard sequence for which parallel sequences

exist.

Version

Change number/ version; for information purposes only.

Branch operation

Operation number of a standard sequence operation,

- before which a parallel sequence should branch off, or

- from which an alternative sequence should be replaced.

This is a mandatory field for parallel and alternative sequences. For a standard sequence, this field

must remain empty.

If  manually  setting  up  an  alternative  or  parallel  sequence,  the  branch  operation  of  the  standard

sequence  must  already  exist  in  the  order  backlog.  When  a  sequence  is  handed  over  via  an

interface, a valid operation number also must be handed off (there is no validation check).

Return operation

Operation number of a standard sequence operation,

- after which a parallel sequence should return, or

- up to which an alternative sequence should be replaced.

This is a mandatory field for parallel and alternative sequences. For a standard sequence, this field

must remain empty.

If manually setting up an alternative or parallel sequence, the branch-off operation of the standard

sequence  must  already  exist  in  the  orders  backlog.  When  a  sequence  is  handed  over  via  an

interface, a valid operation number also must be handed off (there is no validation check).

Reference Sequence

The  reference  sequence  determines  the  sequence  in  the  order  that  the  reference  operations

(branch and return) refer to. This is always the standard sequence (sequence number 0).

BDE-APF_81.docx

Version: 1.0.8692

Page 13 of 14

Processing of Alternative / Parallel Sequences

This  is  a  mandatory  field  for  parallel  and  alternative  sequences.  The  standard  sequence  must

already exist.

For a standard sequence, this field must remain empty.

Toolbar

 Activate

Activate an alternative sequence

 Deactivate

Deactivate an alternative sequence

 Edit orders

Calls up the application Edit orders.

BDE-APF_81.docx

Version: 1.0.8692

Page 14 of 14

