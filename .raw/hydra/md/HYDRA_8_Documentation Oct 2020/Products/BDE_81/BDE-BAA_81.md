Manual

Editing of Orders/Work Plans
(MOC)
BDE-BAA 8.1

Version 1.0.8716

Last changed on: 19.06.2020

Editing of Orders/Work Plans (MOC)

Copyright

©Copyright 2012 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

BDE-BAA_81.docx

Version: 1.0.18468

Page 2 of 98

Editing of Orders/Work Plans (MOC)

Contents

1  Übersicht Bearbeiten Aufträge / Arbeitspläne .............................................. 5

2  Objekt Auftrag .............................................................................................. 6

3  Objekt Arbeitsgang ....................................................................................... 8

4  Edit Orders ................................................................................................. 10

5  Edit Long Texts of Orders .......................................................................... 13

6  Edit Order Sequences ................................................................................ 15

7  Edit Operations .......................................................................................... 24

8  Edit Long Texts of Operations.................................................................... 34

9  Edit Notes ................................................................................................... 36

10  Edit Components ........................................................................................ 38

11  Edit Production Resources and Tools ........................................................ 42

12  Edit Order Network ..................................................................................... 45

13  Work Plan - Edit Orders ............................................................................. 47

14  Work Plan - Edit Order Long Texts ............................................................ 51

15  Work Plan - Edit Order Sequences ............................................................ 53

16  Work Plan - Edit Operations ....................................................................... 55

17  Work Plan - Edit Operation Long Texts ..................................................... 57

18  Work Plan - Edit Components .................................................................... 59

BDE-BAA_81.docx

Version: 1.0.18468

Page 3 of 98

Editing of Orders/Work Plans (MOC)

19  Work Plan - Edit Production Resources & Tools ....................................... 61

20  Data Structure of Orders ............................................................................ 63

21  Order Long Text Data Structure ................................................................. 69

22  Data Structure of Order Sequences ........................................................... 70

23  Data Structure of Operations ..................................................................... 73

24  Datenstruktur Arbeitsganglangtexte ........................................................... 92

25  Data Structure of Components................................................................... 93

26  Production Resources & Tools Data Structure .......................................... 97

BDE-BAA_81.docx

Version: 1.0.18468

Page 4 of 98

Editing of Orders/Work Plans (MOC)

1

 Übersicht Bearbeiten Aufträge / Arbeitspläne

Purpose

The function package “editing orders/work plans” provides an extensive range of functions for







creating or modifying orders with operations in the system

creating and editing work plans in the system

creating orders based on work plans

Implementation considerations

You use the function package if

  You have no interface to an ERP system from where orders are retrieved.

  You have an interface to an ERP system from where orders are retrieved and you

o  would like to modify the transferred orders/operations in MES,

o  want to create and manage your own orders in addition to the orders transferred from the

ERP system.

  For activities that are performed over and over again, you want to use a work plan as a basis for

creating new orders.

Features

  Order management

o  Function for creating production, overhead cost or rework orders

o  Assigning 1-n operations to an order

o  Assigning material components, production resources and documents to operations

o  Assigning long texts to orders and operations

o  Option to modify and correct order backlog data supplied by ERP/PPS systems

  Work plan management

o  Creating  copy  masters  of  work  plans  used  to  generate  production,  overhead  cost  and

rework orders

o  Function used to generate production, overhead cost and rework orders from work plans

  Generating orders

o  Creating production, overhead cost or rework orders based on work plans

o  Creating production, overhead cost or rework orders by copying already existing orders

BDE-BAA_81.docx

Version: 1.0.18468

Page 5 of 98

Editing of Orders/Work Plans (MOC)

2  Objekt Auftrag

Definition

An order in MES is generally a request to production to carry out a certain action accounting for a variety

of  work  steps.  A  distinction  is  generally  made  between  a  production  order  and  so-called  overhead  cost

orders.

1. 1. The production order (production) defines:

  The material/ article to be produced

  The quantity to be produced (batch size)

  The earliest and latest start and finishing dates

2. 2. The overhead cost order (service) defines:

  A particular activity

  The calculation reference

The order in MES primarily consists of

  The order header information

  The operation data

Usage

In MES the order (header) information is used to complete the shop floor papers and to manage the data,

which is the same for any operation/process of a given order.

All activities that a person carries out on a machine/work station are order and/ or operation related. The

posting of the order and operation answers the question what is being done and/or what activity is being

carried out.

BDE-BAA_81.docx

Version: 1.0.18468

Page 6 of 98

Editing of Orders/Work Plans (MOC)

Structure

Every order is identified by a unique ID or order number. This is either provided and administered by an

upstream system (generally ERP systems) or by the MES system itself. The object Order is structured as

follows:

Integration

The order includes n operations that are to be carried out. The order thus produces a certain material or

final product with a certain type of material.

BDE-BAA_81.docx

Version: 1.0.18468

Page 7 of 98

Editing of Orders/Work Plans (MOC)

3  Objekt Arbeitsgang

Definition

The  operation  or  procedure  is  one  step  within  a  work  flow  during  which  a  manufactured  quantity  of  an

order's article is produced.

In addition to the operation number, the information listed below is needed to identify the operation:

  A written description of the work that needs to be performed

  The required workplace or the required group of identical workplaces



In some cases, any other resources needed (e.g. tools, drawings, NC programs)

  Time needed to carry out the work (e.g. setup time, processing time)

  Target quantity (batch size)

If different machines or groups are required for production, this is what we refer to as multilevel production.

Therefore, multilevel production includes several machine-related operations, which normally run one after

the next. The number of operations needed for an order is not limited.

Terms used synonymously for the term operation are: procedure or order sequence/maintenance sequence

(AFO). Oftentimes, the term order itself is also used synonymously.

Usage

All activities that a person carries out on a machine/work station are order and/or operation related. The

posting of the order and operation answers the question what is being done and/or what activity is being

carried out.

BDE-BAA_81.docx

Version: 1.0.18468

Page 8 of 98

Editing of Orders/Work Plans (MOC)

Structure

Each operation can be identified by the relevant combination of the unique order number and the sequence

and operation number. This is either provided and administered by an upstream system (generally ERP

system)  or  by  the  MES  system  itself.  The  object  "operation"  is  subordinate  to  the  object  "order"  and

"sequence" and is structured as follows:

Please note: the object order sequence is only used if specifically requested.

Integration

The operation outputs a material with a specific material type. The operation also includes as additional

information the bill of materials or rather the component list showing the materials that are needed or that

are relevant in manufacturing the article. The same applies to the range of different production resources

(e.g. tools) itemized in the production resources and tools list.

BDE-BAA_81.docx

Version: 1.0.18468

Page 9 of 98

Editing of Orders/Work Plans (MOC)

4  Edit Orders

Summary

Menu

Order Management  Order Management  Edit Orders

Transaction code

edor

Function authorization

edor

Usage

This document provides a description of how orders can be created and edited in MOC.

Integration

Typical applications that require orders to be edited include:

  Creating overhead costs orders

  Creating orders if no ERP system is available

  Correcting order stock data

Also described in this document is the order structure, i.e. the fields relating to the order header.

Prerequisite

The following configurations must exist

-  Order types

Selection criteria

The application provides the following selection criteria:

Order

This selection criterion references the order number. The selected order is displayed. There is an

option to enter wild cards.

Order type

This  selection  criterion  references  the  order  type.  All  orders  with  the  selected  order  type  are

displayed.

BDE-BAA_81.docx

Version: 1.0.18468

Page 10 of 98

Editing of Orders/Work Plans (MOC)

Article

This selection criterion references the article in the order header. All orders with the selected article

are displayed. There is an option to use wild cards.

Sales order

This selection criterion relates to the sales order defined in the order header. All orders are displayed

assigned to the sales order. There is an option to use wild cards.

Project number:

This selection criterion relates to the  project number defined in the order header. All orders of the

selected project number are displayed. There is an option to use wild cards.

Planned order

This  selection  criterion  relates  to  the  planned  order  defined  in  the  order  header.  All  orders  of  the

selected planned order are displayed. There is an option to use wild cards.

Customer designation

This selection criterion relates to the customer name defined in the order header. All orders of the

selected customer designation are displayed. There is an option to use wild cards.

Checking the responsibility area

During the selection, the responsibility area defined for the order is checked.

Field descriptions

The separate fields in the order header are described  here. The sequence described there may deviate

from the sequence in the editing dialogs.

Toolbar

Function authorization: or.generate

Starting the "generate order" dialog

Please note: If orders are generated by this function, the work plan determination function is used.

To generate an order from a specific work plan, please use the "generate order" function in the Work

plans - generate order application.

 Edit long texts of orders

Function authorization: edortx

Link to function: Edit long texts of orders

BDE-BAA_81.docx

Version: 1.0.18468

Page 11 of 98

Editing of Orders/Work Plans (MOC)

  Edit order sequences

Function authorization: edseq

Link to function: Edit order sequences

 Edit operations

Function authorization: edop

Link to function: Edit operations

 Order information

Function authorization: orin

Link to function: Order information

  Order overview

Function authorization: orov

Link to function: Order overview

BDE-BAA_81.docx

Version: 1.0.18468

Page 12 of 98

Editing of Orders/Work Plans (MOC)

5  Edit Long Texts of Orders

Summary

Menu

Order Management  Order Management  Edit Long Texts of Orders

Transaction code

edortx

Function authorization

edortx

Usage

By applying the function “edit long texts of orders”, order-related additional texts can be displayed or edited.

You use this function if:

  You  would  like  long  texts  belonging  to  the  order  header  to  be  visible  and  available  in  the

administrative client while processing the order.

  You are using the MES Development Suite Label Designer component and the data you entered

is to be printed on labels.

Keep in mind that for each order you use a maximum of one long text.

Integration

Long texts can also be transferred via the info interface (record type "AI"). Additional information about the

interface can be found in the respective interface document.

Only long texts relating to the operation are displayed at the terminal.

Prerequisite

The corresponding order must already be defined.

Long texts included in the online data area may generally be edited, i.e. irrespective of the order status

(added, modified or deleted).

Selection criteria

The application provides the following selection criteria:

Order

The long text for a specific order can be selected by entering the order number.

BDE-BAA_81.docx

Version: 1.0.18468

Page 13 of 98

Editing of Orders/Work Plans (MOC)

Field descriptions

The fields for long texts of orders are described here

Editing functions

To create a new operation or to edit one, you use the icons provided.

The long text entry function, which for the most part is equivalent to the functions of a text editor (highlighting

of text passages; deleting or inserting of lines of text, as well as the merging of lines of text; copying with

the key combination Ctrl+C, cutting with the key combination Ctrl+X, and pasting with the key combination

Ctrl+V). Lines may have more than 80 characters when entered. When a document is saved, however, the

system inserts a hard line break after the 80th character.

Toolbar

 Edit orders

Function authorization: edor

For the currently selected data record, this will call up the application Edit orders.

BDE-BAA_81.docx

Version: 1.0.18468

Page 14 of 98

Editing of Orders/Work Plans (MOC)

6  Edit Order Sequences

Summary

Menu

Order Management  Order Management  Edit order sequences

Transaction code

edseq

Function authorization

edseq

Usage

Operations within an order are grouped into sequences in order to create a summary of them. Production

uses this information as an orientation tool to process each operation. Within the sequence, the operations

are  processed  in  sequence  one  at  a  time.  By  linking  several  sequences  within  the  order,  network-type

structures can be illustrated.

You also have the option to use parallel or alternative order sequences. The following sequence types are

supported:

Standard sequence

The standard sequence is available by default and describes the first sequence of the order.

For  a  purely  sequential  order,  only  the  standard  sequence  is  required.  If  certain  operations  are  to  be

processed  in  parallel  or  alternatively  to  the  standard  sequence,  they  must  be  grouped  in  relevant

sequences. Thus, parallel and alternative sequences can branch off of a single standard sequence.

BDE-BAA_81.docx

Version: 1.0.18468

Page 15 of 98

01000200030004000500

Editing of Orders/Work Plans (MOC)

Parallel sequences

A parallel sequence runs parallel to a partial sequence of the standard sequence. It is used, for example,

when certain processes are to run at the same time (in parallel). This may be the case, for example, in the

processing industry.

This partial sequence is defined by the branch operation and the return operation of this particular reference

sequence. As such, the start of the parallel sequence is equal to the start of the branch operation in the

reference sequence and the end is equal to the end of the reference sequence's return operation.

Alternative sequences

An  alternative sequence describes one or more operations,  which can be used  alternatively to a partial

sequence of the standard sequence. It is used, for example, if the  production process varies for certain

batch sizes.

Alternative sequences each have one active sequence that is relevant for processing.

BDE-BAA_81.docx

Version: 1.0.18468

Page 16 of 98

0100020003000400050002100220

Order with an inactive, alternative sequence

Order with an active, alternative sequence

Editing of Orders/Work Plans (MOC)

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

BDE-BAA_81.docx

Version: 1.0.18468

Page 17 of 98

01000200030004000500031003200100020003000400050003100320

  Operation sequences of different sequences may not overlap.

Editing of Orders/Work Plans (MOC)

  With respect to a partial sequence of the standard sequence, which is restricted by a branch

OP  and  a  return  OP  of  a  parallel  or  alternative  sequence,  there  may  be  no  parallel  or

alternative sequence with a branch operation and/or return operation within it.

Deleting sequences

  A sequence may only be deleted if there is no operation that is assigned to this sequence.

  As a rule, a standard sequence cannot be deleted.

Creating and deleting operations

  When an operation is created or deleted, HYDRA automatically updates the order network

for this order. The order network documents the relationships between operations and this

information  is  used  for  planning  in  HYDRA  shop  floor  scheduling  (HLS)  as  well  as  for

processing/ posting.

BDE-BAA_81.docx

Version: 1.0.18468

Page 18 of 98

010002000300040005000210021001000200030004000500031002100220

Editing of Orders/Work Plans (MOC)

Copying an order



If  an  order  is  copied,  the  new  order  is  available  in  its  "initial  state".  This  means  that  any

existing alternative sequences are generally inactive, even if they were previously active in

the order that was copied.

Operation status



It cannot be determined based on the operation status whether the operation is a part of the

standard sequence's active alternative sequence or its inactive alternative sequence or rather

its inactive partial sequence (as a result of activating an alternative sequence), because the

operation status does not change during activation or deactivation.

  Operations of an inactive alternative sequence have the same initial status prepared when

they are newly created, just as is the case for operations of active sequences.

Sequencing list

  Operations  of the  standard sequence's  inactive  alternative sequence  or an  inactive partial

sequence (as a result of activating an alternative sequence) are not shown in the sequencing

list. They can neither be logged on.

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

BDE-BAA_81.docx

Version: 1.0.18468

Page 19 of 98

Editing of Orders/Work Plans (MOC)

  The smallest yield of the consolidated sequences, or rather of their last operations, is considered the

send-ahead quantity of several parallel sequences. This is carried forward as the target quantity to the

successors if the processing code provides for a target quantity update at the operation (customized

HYDRA feature).

Integration

Please  note  the  following  with  regard  to  displaying  operations  of  alternative  sequences  in  the  MOC

functions and evaluations/reports:

Operations/ operations logged on/ pool of orders

An  operation  of  an  inactive  sequence  ("inactive  operation")  can  be  recognized  by  the  "Y"  in  the

column Control.

If no operations of inactive sequences are to be displayed in the order overview, then all of the options

except for the option "Y" must be set in the selection range in the Control selection field.

Order overview

In the Progress index tab, operations of both active as well as inactive sequences are displayed.

Order information

In the order information, operations of both active as well as inactive sequences are displayed. In

order to be able to recognize inactive sequences as such, you use the column configurator in the

operation table to have the control column displayed. In this column, operations of inactive sequences

are listed with a "Y".

Requirement

In order to process sequences in HYDRA, the relevant license must have been issued. It is not possible to

use DOS based terminals.

The following activities are required for use:

1.  The sequence number length must have been set in the basic HYDRA settings

WARNING

You may only set the sequence number length during the initial HYDRA setup process and provided that

no  order  backlog  data  exists  in  HYDRA.  Any  subsequent  settings  or  changes  will  make  the  system  act

inconsistently.

2.  Reactivating dynamic dialogs

As a result, the input fields at the Windows terminal will expand by the defined sequence number

length.

BDE-BAA_81.docx

Version: 1.0.18468

Page 20 of 98

Editing of Orders/Work Plans (MOC)

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

If the "sequence" field is not shown in the editing dialog, the sequence number length

is 0 in the basic parameter settings. Please contact MPDV.

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

BDE-BAA_81.docx

Version: 1.0.18468

Page 21 of 98

Editing of Orders/Work Plans (MOC)

Orientation

If there are several parallel sequences, the lead times generally vary in length. This creates time

buffers in the sequences. The orientation function controls whether these buffers are at the

beginning or the end of the sequence. The following options are available:

F = Earliest due date

If the sequence is set for the earliest date, the buffer will be at the end of the sequence.

S = Latest due date

If the sequence is set for the latest date, the buffer will be at the beginning of the sequence.

N = Not relevant; this is the case for standard sequences and alternative sequences.

If there are several parallel sequences for a given standard sequence, the orientation of the standard

sequence is used for all segments of the standard sequence for which parallel sequences exist.

Version

Change number/ version; for information purposes only.

Branch operation

Operation number of a standard sequence operation,

- before which a parallel sequence should branch off, or

- from which an alternative sequence should be replaced.

This is a mandatory field for parallel and alternative sequences. For a standard sequence, this field

must remain empty.

If  manually  setting  up  an  alternative  or  parallel  sequence,  the  branch  operation  of  the  standard

sequence must already exist in the order backlog. When a sequence is handed over via an interface,

a valid operation number also must be handed off (there is no validation check).

Return operation

Operation number of a standard sequence operation,

- after which a parallel sequence should return, or

- up to which an alternative sequence should be replaced.

This is a mandatory field for parallel and alternative sequences. For a standard sequence, this field

must remain empty.

If manually setting up an alternative or parallel sequence, the branch-off operation of the standard

sequence must already exist in the orders backlog. When a sequence is handed over via an interface,

a valid operation number also must be handed off (there is no validation check).

Reference Sequence

The reference sequence determines the sequence in the order that the reference operations (branch

and return) refer to. This is always the standard sequence (sequence number 0).

BDE-BAA_81.docx

Version: 1.0.18468

Page 22 of 98

Editing of Orders/Work Plans (MOC)

This is a mandatory field for parallel and alternative sequences. The standard sequence must already

exist.

For a standard sequence, this field must remain empty.

Toolbar

 Activate

Activate an alternative sequence

 Deactivate

Deactivate an alternative sequence

 Edit orders

Calls up the application Edit orders.

BDE-BAA_81.docx

Version: 1.0.18468

Page 23 of 98

Editing of Orders/Work Plans (MOC)

7  Edit Operations

Summary



Menu

Order Management  Order Management  Edit Operations

Transaction code

edop

Function authorization

edop

Usage

The term work procedure or operation is used to refer to a work sequence within a work system geared

towards the completion of a work task, during which an order's quantity unit is created.1

You use this function to add new operations to an order or to modify data in existing operations.

Integration

Operations are planned in planning functions (e.g. HLS) and are logged on to shop floor terminals; their

purpose  is  to  facilitate  status  tracking  and  to  record  quantities  and  activities,  which  are  then  typically

uploaded to upper-level systems.

Requirement

The following requirements must be met when adding a new operation:

  The superior order must already have been created.

  When making use of order sequences (project-specific; depending on the license), the sequence

that the operation is to be associated with must already exist.

  The workplace/ machine or group on which the operation is to be planned has already been created

in the system.

You have been assigned to the responsibility area and are authorized to display the data.

1    REFA  Association  for  work  studies  and  business  organization  e.V.  (publisher):  Methodology  of  Organizing  a
Business: Encyclopedia of Business Organization. Munich: Carl-Hanser, 1993. - ISBN 3-446-17523-7. Page 195.

BDE-BAA_81.docx

Version: 1.0.18468

Page 24 of 98

Editing of Orders/Work Plans (MOC)

Selection criteria

The application provides the following selection criteria:

Order

Enter  the  order  number  for  the  order  with  the  operations  you  would  like  to  display.  You  can  also  run  a

search using wildcards.

Operation

You have the option to enter the operation number for the operation that you would like to display or edit.

You can also run a search using wildcards.

Sequence

If your system is set up to use sequences (depending on the license), you can enter the sequence number

here. In this case the operations are considered that are assigned to the sequence numbers you entered.

If your system is not set up for sequences, please leave this field empty.

Display split OPs

If you use the function provided for splitting operations (depending on the license), you can use this option

to define whether in addition to the split-master-operations, their splits should be displayed as well.

Checking the responsibility area

During the selection, the responsibility area defined for the operation is checked.

Field descriptions

The fields for the operation are described here

Only selected data is available in the table:

o  Order

o  Sequence

o  Operation

o  Split

o  Processing code

o  Locked

o  Fixed

BDE-BAA_81.docx

Version: 1.0.18468

Page 25 of 98

Editing of Orders/Work Plans (MOC)

o  Group

o  Workplace

o  Control

Editing functions

To create a new operation or to edit one, you use the icons provided.

If  a  responsibility  area  is  defined  at  the  order,  data  maintenance  (editing)  depends  on  how  the  options

display, insert, modify and delete are set up in the responsibility area configuration or in the responsibility

profile.

Toolbar

 Edit orders

Function authorization: edor.*

Calls up the application Edit orders for the selected order.

  Edit order sequences

Function authorization: edseq.*

Calls up the application Edit order sequences for the selected order.

  Edit operation long texts

Function authorization: edoptx.*

Calls up the application Edit long texts of operations.

  Edit components

Function authorization: edopcomp.*

Calls up the application Edit components.

  Edit production resources and tools

Function authorization: edopres.*

Calls up the application Edit production resources and tools.

  Order information

Function authorization: orin

Calls up the application Order information for the selected order.

BDE-BAA_81.docx

Version: 1.0.18468

Page 26 of 98

Editing of Orders/Work Plans (MOC)

 Modify operation status

Function authorization: op.statchg

Function to modify the operation status

   Lock

Function authorization: op.lock

The button block operation locks one or several selected operations.

    Unlock

Function authorization: op.unlock

The button unlock operation unlocks one or several selected operations.

   Splitting an operation

Function authorization: op.split

Calls  up  the  function  to  split  the  operation.  Additional  information  can  be  found  in  the  respective

document.

   Dissolve split OP

Function authorization: op.splitdissolve

Cancels the split operation. Additional information can be found in the respective document.

Adding an operation

Transferring order header data

The following data is transferred from the order header in the operation when a new operation is created:

  Order type

  Base quantity unit

  Article if the article number is not explicitly defined at the operation.

  Article designation if the article designation is not explicitly defined at the operation.

  Material type if it is not explicitly defined at the operation.

BDE-BAA_81.docx

Version: 1.0.18468

Page 27 of 98

Editing of Orders/Work Plans (MOC)

  Customer designation

  Priority, if the priority control is set to order-related at the order type..

Any priority that may have been entered will be ignored!

Transferring default data

Default data  is taken from a template or from the  processing code,  if one  exists, and transferred to the

operation when an operation is created. The data is transferred in the following order:

  Values are transferred from the template (if one exists)



When adding a new operation (manually or by interface), all values are taken over

that can be edited in the template but that are not entered manually (explicitly) or by the

interface.

  Values are transferred from the processing code (if one exists); doing so will overwrite any

values set in the template. The following values are transferred from the processing code

into the operation:

  Underdelivery

  Reaction to underdelivery

  Overdelivery

  Reaction to overdelivery

  External processing

  Recordable

  Can be logged on multiple times

  May be split

  Serial number obligation

  Batch management requirement

  Target quantity update*

BDE-BAA_81.docx

Version: 1.0.18468

Page 28 of 98

Editing of Orders/Work Plans (MOC)

  Sequencing list*  is no longer evaluated for display in the sequencing list; instead, the system

accesses the separate configuration tables directly.

Please note: Values marked with * are not displayed at the operation and therefore they also cannot

be changed.

  Transfer  of  the  values  transmitted  explicitly  (either  entered  manually  or  transmitted  via

PPS interface); doing so will ignore any values that were previously transferred from the

template or the processing code and are thus now overwritten.

Target quantity comparison

If the target quantity comparison at the preceding operation is active, when an operation is inserted, any

target quantity that was entered is ignored and is assumed from the preceding OP.

Determining transport time

When customizing HYDRA a transport matrix can be defined that is then used to determine the transport

time between two operations. This transport time is then considered during lead time scheduling.

When  a  new  order  or  operation  is  created,  the  transport  time  is  calculated  using  this  matrix  and  then

transferred to the operation. Any change to the transport matrix later will have no effect on already existing

operations.

If, at the time operations are transferred at the interface, a transport time is set greater than zero for the

ERP system, it is transferred into the database. Otherwise, the time is calculated from the transport matrix.

Irrespective of the master data, the values in the operation can be modified explicitly. What needs to be

considered here is that any values modified explicitly are then overwritten when an operation is re-planned

to another machine group.

 













Setting of planned start data (to be used for the sequencing list at the terminal)

When a new data record is added, the system tries to determine planned start dates and to use them as

default values for sorting the sequencing list. This process is based on the following logic:



It is checked whether or not the planned start date and the planned start time are empty.

o

If this is the case:

  The planned start date is taken from the earliest start date (date)

  The planned start time is taken from the earliest start date (time)



It is checked whether or not the planned end date and the planned end time are empty:

BDE-BAA_81.docx

Version: 1.0.18468

Page 29 of 98

Editing of Orders/Work Plans (MOC)

o

If this is the case:

  The planned end date is taken from the latest end date (date)

  The planned end time is taken from the latest end date (time)

  For sorting of the sequencing list the planned start date and the planned start time are entered in

separate fields that cannot be changed.

The used date fields, the corresponding BAPI acronyms and database fields can be found in the document

dealing with the technical background information on the sequencing list.

Editing an operation

Default data  is taken from a template or from the  processing code,  if one  exists, and transferred to the

operation in the following order when an operation is modified.



If a planned group was modified or the workplace resulting in a different group, then the

following values will be transferred from the template, if one exists:

  Wait time formula

  Setup time formula

  Processing time formula



Inspection time formula

  Dismantling/teardown time formula

  Target cycle formula

  Formula for the remaining run time formula

  Formula for the second remaining run time formula

  Max. synchronization time

  Default value key



If  the  planned  group  was  modified,  the  system  will  moreover  also  update  the  value

plan_werk (internally managed in the order backlog) in which the company for the modified

Group is calculated and transferred.



If the processing code was changed at the operation, these values will be transferred from

the processing code (see above).

BDE-BAA_81.docx

Version: 1.0.18468

Page 30 of 98

Editing of Orders/Work Plans (MOC)

  The  final  step  involves  the  transfer  of  the  values  transmitted  explicitly  (either  entered

manually or transmitted via ERP interface); doing so will ignore/ overwrite any values that

were previously transferred from the template or the processing code.

If  the  group  for  an  operation  is  modified,  the  transport  time  will  also  be  recalculated.  In  doing  so,  the

transport time stored in the transport matrix will be assumed. Any previously defined transport time in the

preceding OP will thus be ignored/ discarded.

Transferring order header data

When an operation is modified, only the following values from the order header will be transferred into the

operations:

  Priority, if the priority control is set to order-related at the order type.

Any priority that may have been entered will be ignored!

  Customer designation

The base quantity unit will not be modified, because it is very unlikely that a change of this kind would ever

happen in reality. The material type is not modified, because in MPL it may vary from one OP to the next

OP.

General checks run when storing an operation

Checking for the existence of a workplace or group

If a workplace was entered, then the system also checks whether or not it exists. If so, then the group

will be transferred into the operation that is assigned to the workplace. In any other case, the storing

process will be interrupted with an error message.

If no workplace was defined, but instead only a group, then the system will check the validity of the

group that was entered. That is, it will check if the group exists in the system. If this is not the case,

the change will be rejected and an error message will be issued.

Checking priority management

If  priority  management  was  activated  for  the  order  type  during  the  customizing  process  using  the

identifier with the same name  and the priority control was set as order-related , then when an order

is newly created manually or modified, the system checks whether the defined priority is permitted

and, in the event of a violation of the maximum number, the action will be rejected.

If the order comes from the ERP interface and the maximum number is exceeded, the order will not

be refused as a result of this validation check. In this case, however, the priority will be automatically

set to 1.

BDE-BAA_81.docx

Version: 1.0.18468

Page 31 of 98

Editing of Orders/Work Plans (MOC)

Ability to modify an operation

In the standard version, the following OPs cannot be modified:

  OPs that are currently logged on (status with control indicator L) as well as

  OPs that are automatically interrupted (status with control indicator F).

Setting of planned start data (to be used in the sequencing list at the

terminal)

When an existing data record is changed, the system tries to determine planned start dates, to update them

and to use them as default values for sorting the sequencing list. The basic logic depends on the planning

function configuration in the master record of the operation’s workplace:

  Planning function “N“ – no planning

o

It is checked whether or not the planned start date and the planned start time are empty.



If this is the case:

  The planned start date is taken from the earliest start date (date).

  The planned start time is taken from the earliest start date (time).

o

It is checked whether or not the planned end date and the planned end time are empty:



If this is the case:

  The planned end date is taken from the latest end date (date).

  The planned end time is taken from the latest end date (time).

o  For sorting of the sequencing list, the planned start date and the planned start time are

entered in separate fields that cannot be changed.

  Planning function “P“ / “H“ / “T“ / “A“:

o

If the planned start date is changed the planned start date and the planned start time will

be entered in separate fields that cannot be changed.

If no workplace is defined for the operation, processing will be performed along the lines of the

planning function "N".

The used date fields, the corresponding BAPI acronyms and database fields can be found in the document

dealing with the technical background information on the sequencing list.

Deleting operations

When an operation is deleted, the following points must be considered:



In the standard version, an operation can only be deleted if the operation is not logged on (i.e. the OP

is neither in the status "running" nor in the status "automatically interrupted").

BDE-BAA_81.docx

Version: 1.0.18468

Page 32 of 98

Editing of Orders/Work Plans (MOC)

  A split operation cannot be deleted. In this case, it must be canceled using the relevant splitting function.



If a split master is deleted, this will also delete its split OPs.

  A merged operation cannot be deleted. In this case, you must cancel it.



If the last operation for an order is manually deleted from the console, the order header itself will not

be deleted. It must be deleted explicitly.

In the standard version, deleting an operation means that an item is physically deleted from the database.

In the process, the following data is deleted:

  Order backlog

  Order status

  Assigned material components

  Assigned production resources and tools

  Assigned long texts

  Resource allocation for this operation in shop floor scheduling (HLS).

The log data  is not automatically deleted if an operation is deleted. These are transferred into the long term

table or are deleted from the database during cyclical archiving/ deletion runs.

BDE-BAA_81.docx

Version: 1.0.18468

Page 33 of 98

Editing of Orders/Work Plans (MOC)

8  Edit Long Texts of Operations

Summary

Menu

Order management  Order management  Edit long texts of operations

Transaction code

edtx

Function authorization

edoptx

Usage

Applying the function edit long texts of operations, operation-related additional texts can be displayed or

edited. What should be considered in this regard is that only a maximum of one long text can be recorded/

assigned to an operation at any one time.

Operation-related long texts can be displayed at the terminal.

Long texts can also be transferred via the HYDRA info interface (record type "AI"). Additional information

about the interface can be found in the respective interface document.

Requirement

The corresponding operation must already be defined.

Long texts included in the online data area may generally be edited, irrespective of the operation status

(added, modified or deleted).

Selection criteria

The application provides the following selection criteria:

MES order number

Entry of the combined order/ operation number. There is an option to use wild cards, for example in order

to  be  able  to  display  all  an  order's  operation-related  long  texts.  In  this  case,  the  order  number must  be

entered, followed by *.

Field descriptions

MES order number

The operation's combined order/ operation number. This is a mandatory field.

Short Text

20-digit short text that is displayed in the table view. This is a mandatory field.

BDE-BAA_81.docx

Version: 1.0.18468

Page 34 of 98

Editing of Orders/Work Plans (MOC)

Long Text

The order's long text.

The long  text  entry function,  which for the  most part  is equivalent  to the functions of a text editor

(highlighting of text passages; deleting or inserting of lines of text, as well as the merging of lines of

text; copying with the key combination Ctrl+C, cutting with the key combination Ctrl+X, and pasting

with the key combination Ctrl+V). Lines may have more than 80 characters when entered. When a

document is saved, however, the system inserts a hard line break after the 80th character.

Toolbar

 Edit operations

Calling up the application: Edit operations

BDE-BAA_81.docx

Version: 1.0.18468

Page 35 of 98

Editing of Orders/Work Plans (MOC)

9  Edit Notes

Summary

Menu

Order Management  Order Management  Edit Notes

Transaction code

ednotes

Function authorization

edopnote

Usage

The function "edit notes" can be used to edit operation notes.

Requirement

The corresponding operation must already be defined.

Notes  included  in  the  online  data  area  may  generally  be  edited,  i.e.  irrespective  of  the  operation  status

(added, modified or deleted).

Selection criteria

The application provides the following selection criteria:

MES order number

Combined order/ operation number.

Please note that the components are assigned by specific operations. This is why the entire key must be

entered. By entering the order number followed by *, the system will list all components for an entire order.

Field descriptions

MES order number

Combined order/ operation number.

Short Text

Short text of the note

Long Text

Long text of the note

Display on terminal

Specifies whether or not this operation note is shown on the terminal.

BDE-BAA_81.docx

Version: 1.0.18468

Page 36 of 98

Editing of Orders/Work Plans (MOC)

Toolbar

 Edit operations

Calling up the application Edit operations.

BDE-BAA_81.docx

Version: 1.0.18468

Page 37 of 98

Editing of Orders/Work Plans (MOC)

10  Edit Components

Summary

Menu

Order management  Order management  Edit components

Transaction code

edcomp

Function authorization

edopcomp

Usage

The  materials  needed  to  produce  an  article  are  assigned  to  the  operation  as  so-called  (material)

components.  This  function  makes  it  possible  to  display  or  edit  material  components  belonging  to  the

operation.

Generally these components are transferred via an interface from an upper-level ERP system to HYDRA,

because these are already defined at the operation there.

Requirement

The corresponding operation must be defined.

Selection criteria

The application provides the  following selection criteria:

MES order number

Combined order/ operation number.

Please note that the components are assigned by specific operation. This is why the entire key

must be entered. By entering the order number followed by *, the system will list all components

for an entire order.

Field descriptions

MES order number

The  combined  order/  operation  number  for  the  operation  that  is  to  be  assigned  to  the  production

resource or tool is entered here.

Material

Enter the material number for the material component here.

BDE-BAA_81.docx

Version: 1.0.18468

Page 38 of 98

Editing of Orders/Work Plans (MOC)

Designation

Here you can specify the name of the material.

Comment 1/ Comment 2

These are comment fields.

BOM item

In a BOM, the separate components of a product are referred to as items. The order of the BOM item

is determined by the number that is entered here. As a result, the same material numbers can appear

in the component list and the unique entry can be assigned to the correct component item.

If the production is roll-based, this is then the position of the component in the layer structure.

Keep in mind that the BOM item is an integral part of the identification key.

BOM level

A component can also have several levels. If applicable and known, please enter the BOM level here.

Please note: Postings can only be carried out on materials on a BOM level 0. If the system indicates

a BOM level > 0, the component type (see next field) must as a rule be set to "I" (info component).

Component type

Component type Possible values:

M

Material component This component type must be defined in it. Other types can also be

relevant here as a part of MPL or its roll-based MPL-RF solution.

I

Info  component.  Info  components  provide  the  ability  to  be  shown  in  the  component  list

without having to post them.

T

Carrier material (MPL-RF).

A maximum of one input batch may be logged into the machine as carrier material (T) or

additional material (Z) at any one time.

Additional material as an alternative for carriers.

Scrap/ waste material

Z

A

Material type

Type of material of the material component. In HYDRA, material specific processing is controlled by

the material type.

Unless defined otherwise for a specific project, assign the material type SYSTEM here.

The material type must exist in HYDRA. If no material type has been entered, HYDRA will attempt to

determine  the  material  component  (requirement:  the  assignment  of  material  by  material  type  has

been entered). If no material type can be found, HYDRA will assign SYSTEM as the material type.

Please note: For info components (material type "I") you should define and assign a separate material

type (e.g. INFO).

BDE-BAA_81.docx

Version: 1.0.18468

Page 39 of 98

Editing of Orders/Work Plans (MOC)

Consumption type

The following options are available to enter material components. How the separate options and their

application are defined depends, among other things, on which of the HYDRA modules are used.

K = None

This option defines that no consumption is recorded for the material component. If this is the case,

the material component will merely be displayed.

It is imperative that the info components (see above: component type) are set to this option.

D = Discrete

For this component, the system calculates consumption in reverse at the Windows terminal, which

means  the  calculation  is  based  on  the  last  produced  quantity  and  suggested  in  a  posting  dialog.

Consumption is posted at the component level and the system generates a material flow (goods issue

from  production),  which  can  be  uploaded  to  the  upper-level  ERP  system  (requires  the  relevant

interface for uploading goods movements).

Recording  material  consumption  in  this  manner  requires  a  custom  configuration  that  can  be

performed by customizing HYDRA at the customer's location.

L = with batch reference (relevant when MPL/ TRT is used)

Choosing this option sets the system so the material component is logged in and out as a HYDRA

batch. The consumption calculation for these material components (retrograde, at input batch logout)

depends on the configuration of the material type that the material component is assigned to.

Requirements quantity/ unit

Planned total quantity for the component in the operation.

it is calculated automatically using the operation's target quantity (primary quantity unit) multiplied by

the component's input quantity .

The requirement quantity is only shown in the table and in the detail panel.

Input quantity

Planned input quantity of the component per unit of the primary quantity of the operation.

MPL, consumption type D: Planned input quantity of the component per unit of the primary quantity

of the operation.

Unit

Quantity unit for input quantity.

Input quantity in %/ upper tolerance limit/ lower tolerance limit

Reserved: Not edited. Should be set to 0.

BDE-BAA_81.docx

Version: 1.0.18468

Page 40 of 98

Editing of Orders/Work Plans (MOC)

Replaceable

If this identifier (=J) is set for this kind of component, you can choose to use a different material other

than what was planned. However, only material of the same material type may be used.

Requirement to change output batch

An input batch change for a batch of this material requires a change to an output batch. What must

be considered here:

, if type = T or Z

, if type = I or A

/, if type = M

Otherwise: N

Upper-level component: BOM item/ BOM level

Reserved: Not edited.

Toolbar

 Edit operations

Calling up the application Edit operations.

 Edit orders

Calling up the application Edit orders.

 Order information

Calling up the application Order information.

BDE-BAA_81.docx

Version: 1.0.18468

Page 41 of 98

Editing of Orders/Work Plans (MOC)

11  Edit Production Resources and Tools

Summary

Menu

Order management  Order management  Edit production resources and
tools

Transaction code

edres

Function authorization

edres

Usage

Resources can be defined for operations in the list of production resources and tools.

Further  information  on  how  to  define  workforce  requirements  via  production  resources  and

tools can be found in the document entitled Definition_of_Workforce_Requirement.pdf

Requirement

The corresponding operation must already be defined.

Selection criteria

The application provides the following selection criteria:

MES order number

Combined order/ operation number.

Please note that the components are assigned by specific operations. This is why the entire key must be

entered. By entering the order number followed by *, the system will list all components for an entire order.

Field descriptions

Order/ operation

Enter the order/ operation number for the operation that is to be assigned to the production resource

or tool here.

Resource type

Resource type of the production resource or tool that is to be assigned to the operation. The resource

type must be known in the system. Predefined resource types must be chosen from the selection

menu.  Additional  resource  types  can  be  defined  when  customizing  HYDRA.  For  documents,  the

resource type to be entered here must be DOC.

BDE-BAA_81.docx

Version: 1.0.18468

Page 42 of 98

Editing of Orders/Work Plans (MOC)

Resource

Enter the resource number (material number) of the production resource or tool.

Designation

Here, you can enter a name for the production resource.

Comment 1/ C\comment 2

These are comment fields.

Required quantity/ unit

Resource quantity required to carry out the operation. When planning the operation in HYDRA shop

floor scheduling (HLS), this number of resources is entered in terms of capacities. The quantity unit

is only used as a comment.

Please note: In HYDRA shop floor scheduling (HLS), the quantity 0 is interpreted implicitly as quantity

1.

Path

When  identifying  a  document  as  a  production  resource,  the  logical  reference  to  the  path  is  to  be

defined  in  the  path  configuration  (menu:  File  >  System  administration  >  Paths).  No  path  must  be

stored for DNC resources; it is determined based on the path stored for the resource type. The field

should be left empty for all other production resources.

File

When identifying a document as a production resource, the file name (including file extension) is to

be entered here.

No file name must be stored for DNC resources; it is determined based on the file name defined for

the resource. The field should be left empty for all other production resources.

Modified by/ date/ time

Editor as well as the date and time the last change was made.

Please note with regard to documents: If a new document is assigned to an operation a file is

only uploaded automatically, in case a file has been selected using the file selection dialog. The

file selection dialog can be opened by the button next to the “file name” field.

In this case, the path of the file that is loaded onto the server is displayed below the input field for

the file name. The upload is performed automatically while saving.

BDE-BAA_81.docx

Version: 1.0.18468

Page 43 of 98

Editing of Orders/Work Plans (MOC)

No file can be uploaded if the file name is entered manually.

The corresponding data record is created anyway even if an error occurs during the upload.

Toolbar

 Edit operations

Calls up the application Edit operations.

 Edit orders

Calls up the application Edit orders.

 Order information

Calls up the application Order information.

BDE-BAA_81.docx

Version: 1.0.18468

Page 44 of 98

Editing of Orders/Work Plans (MOC)

12  Edit Order Network

Summary

Menu

Order Management  Order Management  Edit Order Network

Transaction code

ednet

Function authorization

ednet

Usage

With the support of this application, you can create dependencies for orders beyond the existing operation

sequence. These dependencies are referred to as relationships.

Keep in mind that only the end-start relationships can be created. These are relevant for both planning and

for data entry. Enter the MES order number (combined order/ OP number) during data entry.

Requirement

The linked orders, including all of their operations, must exist in the system.

Selection criteria

The application provides the following selection criteria:

Order

The relationships are displayed for the selected order number.

OP

The relationships are displayed for the selected operation.

Predecessor/ successor/ predecessor and successor

Only the relationships relating to the selection are displayed.

Toolbar

This application only allows relationships to be created or deleted.

Any relationships created by the system automatically (origin = "S") may not be deleted by the

user.

Field descriptions

Predecessor

Order number of the preceding operation

BDE-BAA_81.docx

Version: 1.0.18468

Page 45 of 98

Editing of Orders/Work Plans (MOC)

Preceding OP

Operation number of the preceding operation

Successor

Order number of the succeeding operation

Succeeding OP

Operation number of the succeeding operation

Relationship

Only the end-start relationships ("ES”) can be created in the setup process.

Origin

Relationships  created  manually  or  explicitly  via  the  interface  are  created  using  "E"  =  externally

created.

The relationships created by the system are marked with "S".

Active

In principle, relationships are always active. Relationships created due to alternative sequences are

the exception. Relationships of inactive alternative sequences are marked as inactive.

Relevance

The system differentiates between relationships for planning and relationships for data entry.

P

V

X

Relationship is only relevant for planning.

Relationship is only relevant for data entry.

Relationship is neither relevant for planning nor for data entry.

<empty>  Relationship is relevant for planning and for data entry.

Explicitly set relationships can only be created with relevance =<empty>.

BDE-BAA_81.docx

Version: 1.0.18468

Page 46 of 98

Editing of Orders/Work Plans (MOC)

13  Work Plan - Edit Orders

1.1  Summary

Menu

Order management  Routing management  Work plan - Edit orders

Transaction code

edwor

Function authorization

edwor

The "work plan - edit orders" application provides the user with a comfortable option to create and change

work plans as well as to generate orders from work plans. Consequently, real orders may be generated

from the work plans that are also often referred to as "empty envelope" for orders.

Selection criteria

The application provides the following selection criteria:

Work plan

A specific work plan may directly be selected by entering the work plan number.

Order type

The combo box allows for work plans for specific order types to be selected. Multiple selections are

possible.

Article

The article field allows for work plans for a specific article to be searched. Wildcards may be used.

Sales order, project number, planned order

These fields are stock fields of the order header that are available for selections. Wildcards may be

used.

Customer designation

The "customer designation" field may be used for searching, provided that work plans are created for

individual customers. Wildcards may be used.

Field descriptions

Order header fields are described here

Please note

  The table only provides selected data:

o  Work plan

BDE-BAA_81.docx

Version: 1.0.18468

Page 47 of 98

Editing of Orders/Work Plans (MOC)

o  Order type

o  Article

o  Article designation

o  Target quantity (B)

o  Target scrap (B)

o  Unit (B)

o  Customer designation

o  Sales order

o  Planned order

o  Project number

  The below-mentioned values cannot be kept in the work plan order

o  Start of basic date

o  End of basic date

o  Scheduled start

o  Scheduled end

Editing functions

Please use the available buttons to create or edit work plan orders.

Provided that a responsibility area has been defined for the order, maintenance (editing) of data depends

on  how  the  view,  insert,  change,  delete  options  are  set  in  the  configuration  of  responsibility  areas  or

responsibility profiles.

Toolbar

Generate order

Function authorization: or.generate

An order may be generated from the currently selected work plan by calling this function. For further

information on this, please refer to the section entitled generate order.

BDE-BAA_81.docx

Version: 1.0.18468

Page 48 of 98

Editing of Orders/Work Plans (MOC)

 Edit order long texts

Function authorization: edwortx

Starts the application Work plan - edit order long texts.

 Edit order sequences

Function authorization: edwseq

Opens the application Work plan - edit order sequences.

Edit operations

Function authorization: edwop

Opens the application Work plan - edit operations.

Generate order

Please proceed as follows to generate an order from the work plan:

  Choose the work plan, from which you would like to generate an order, from the table.

  Open the function using the button

. The "generate order" dialog opens.



In the "order" field enter the order number that is to be assigned to the order to be generated. The

field can be left empty if numbers are assigned automatically for the order type (customizing).



In the dialog the input fields are pre-assigned to work plan data. If required, change or amend the

field values.

  Confirm the dialog by clicking

.

An order is now generated from the work plan. Then the application "edit orders" including the new order

opens by default.

Please  note  that  the  “edit  orders”  application  is  opened  in  a  new  window  every  time  a  new  order  is

generated. For this reason, we recommend to close the application before generating a new order.

The below-mentioned configuration in INI configuration/INI data configuration can suppress opening of the

application “edit orders”. In this case and once the order has been generated successfully, a popup dialog

opens stating that “order xxx” has been created”. This message can be confirmed by clicking “OK”.

BDE-BAA_81.docx

Version: 1.0.18468

Page 49 of 98

Menu: System administration  System settings  INI configuration/INI data configuration

Editing of Orders/Work Plans (MOC)

Name:

BDE

MOC user:

0

Comment:

Settings for Shop Floor Data Collection

Section:

EDWOR

Key:

GENERATE_ORDER

Value:

SUPPRESS_EDOR

Active:

Comment:

Suppress automatic call of application "edit orders"

Please note

  The  order  cannot  be  generated  if  a  responsibility  area  is  indicated  for  which  the  user  is  not

authorized.

  The article number is taken over to the operations of the order.

  On the one hand the order quantity as well as the unit are taken over to the order header as (basic)

target quantity or target unit, and on the other hand, to all operations as basic target quantity or

target unit.

  The entered quantity is taken over 1:1 as primary quantity, if the primary quantity unit (primary unit

of entry) of the operations matches the unit that is specified as quantity unit above. If conversion

factors are defined for the operation of the order or work plan to be copied, they will also be used

for the calculation of the primary quantity. In case, no conversion factors are defined and the base

quantity unit and primary quantity unit are different, an attempt is made to convert the base quantity

into the primary quantity unit using an internal conversion table (HYDRA customizing). In general,

this procedure also applies for the secondary quantity and tertiary quantity.

BDE-BAA_81.docx

Version: 1.0.18468

Page 50 of 98

Editing of Orders/Work Plans (MOC)

14  Work Plan - Edit Order Long Texts

1.1  Summary

Menu

Order management --> Routing management --> Work plan - Edit long texts
of orders

Transaction code

edwortx

Function authorization

edwortx

The "work plan - edit long texts of orders" function allows for additional texts to be collected for the order.

There is only one long text at most for each order.

Please note

  Long texts can also be transferred using the HYDRA info interface (record  type "AI"). For further

information on the interface, please refer to the corresponding interface documentation.

  The terminal shows the long texts relating to operations only.

Selection criteria

The application provides the following selection criteria:

Work plan

The long text of a specific order of the work plan can be selected by entering the work plan number.

Field Descriptions

The fields of a long text pertaining to orders are described here.

Editing functions

Please use the available buttons to create or edit long texts of work plan orders. A copy function for order

long texts is not planned.

Toolbar

Edit orders

Function authorization: edwor

Opens the Work plan - edit orders application for the currently selected data record.

BDE-BAA_81.docx

Version: 1.0.18468

Page 51 of 98

Editing of Orders/Work Plans (MOC)

BDE-BAA_81.docx

Version: 1.0.18468

Page 52 of 98

Editing of Orders/Work Plans (MOC)

15  Work Plan - Edit Order Sequences

Summary

Menu

Order  management  -->  Routing  management  -->  Work  plan  -  Edit  order
sequences

Transaction code

edwseq

Function authorization

edwseq

Operations are grouped in sequences to summarize them within an order. Production uses this information

as an orientation tool to process each  operation. Within the sequence, the operations are processed  in

sequence  one  at  a  time.  By  linking  several  sequences  within  the  order,  network-type  structures  can  be

illustrated

For further information on this, please refer to the document entitled "edit order sequences".

Selection criteria

The application provides the following selection criteria:

Work plan

The order sequences of a specific work plan may be selected by entering a work plan number.

Field descriptions

The fields of a sequence are described here.

Editing functions

Please use the available buttons to create or edit work plan sequences. A copy function for order sequences

is not planned.

If the "sequence" field is not shown in the editing dialog, the sequence number length is 0 in the

basic parameter settings. Please contact MPDV.

Toolbar

Edit orders

Function authorization: edwor

Opens the application work plan – edit orders for the currently selected data record.

BDE-BAA_81.docx

Version: 1.0.18468

Page 53 of 98

Editing of Orders/Work Plans (MOC)

BDE-BAA_81.docx

Version: 1.0.18468

Page 54 of 98

Editing of Orders/Work Plans (MOC)

16  Work Plan - Edit Operations

1.1

Summary

Menu

Order management --> Routing management --> Work plan - Edit operations

Transaction code

edwop

Function authorization

edwop

The "work plan - edit operations" application provides the user with a comfortable option to create or change

operations for work plans.

Consequently, real orders may be generated from the work plans that are also often referred to as "empty

envelope" for order orders.

Selection criteria

The application provides the following selection criteria:

Work plan

Operations of a specific work plan may be selected by entering the work plan number.

OP

The view may be limited to an individual operation of a work plan.

Sequence

This  field  is  only  relevant  if  sequences  are  used  in  HYDRA.  In  this  case,  the  selection  may  be

restricted to a specific sequence.

Field Descriptions

Operation fields are described here

Editing functions

Please use the available buttons to create or edit work plan operations.

The order (header) of the work plan must already exist in order to be able to create an operation.

Operations may only be copied within the work plan.

BDE-BAA_81.docx

Version: 1.0.18468

Page 55 of 98

Editing of Orders/Work Plans (MOC)

This table is to be used to document warnings/alerts (template).

Toolbar

Edit orders

Function authorization: edwor

Opens the application Work plan - edit orders for the currently selected data record.

 Edit order sequences

Function authorization: edwseq

Opens the application Work plan - edit order sequences.

 Edit operation long texts

Function authorization: edwoptx

Opens the application Work plan - edit operation long texts.

Edit components

Function authorization: edwcomp

Opens the application Work plan - edit components.

Edit production resources and tools

Function authorization: edwres

Opens the application Work plan - edit production resources and tools.

BDE-BAA_81.docx

Version: 1.0.18468

Page 56 of 98

Editing of Orders/Work Plans (MOC)

17  Work Plan - Edit Operation Long Texts

1.1

Summary

Menu

Order management --> Routing management --> Work plan - Edit long texts
of OP

Transaction code

edwoptx

Function authorization

edwoptx

The  "work  plan  -  edit  long  texts  of  operation"  function  allows  for  additional  texts  to  be  collected  for  the

operation. There is only one long text at most for each operation.

Please note

  Long texts can also be transferred using the HYDRA info interface (record type "AI"). For further

information on the interface, please refer to the corresponding interface documentation.

  The terminal shows the long texts relating to operations.

Selection criteria

The application provides the following selection criteria:

MES work plan number

The long text of a specific operation of the work plan can be selected by entering the MES work plan

number. The MES work plan number is the combined work plan/operation number.

Field Descriptions

The fields of a long text pertaining to orders are described here.

Editing functions

Please use the available buttons to create or edit operation long texts of the work plan. A copy function for

operation long texts is not planned.

Toolbar

Edit operations

Function authorization: edwop

Opens the application Work plan - edit operations for the currently selected data record.

BDE-BAA_81.docx

Version: 1.0.18468

Page 57 of 98

Editing of Orders/Work Plans (MOC)

BDE-BAA_81.docx

Version: 1.0.18468

Page 58 of 98

Editing of Orders/Work Plans (MOC)

18  Work Plan - Edit Components

1.1

Summary

Menu

Order  management  -->  Routing  management  -->  Work  plan  -  Edit
components

Transaction code

edwcomp

Function authorization

edwcomp

The "work plan - edit components" application allows for the material components, which are required to

produce the article in the current manufacturing level (current operation), to be displayed and edited.

Normally, these components are transferred to HYDRA using an interface from the higher-tier ERP system,

as these components are already defined in the ERP work plan.

Selection criteria

The application provides the following selection criteria:

MES work plan number

The components assigned to a work plan operation may be selected by entering the MES work plan

number. The MES work plan number is the combined work plan/operation number.

Enter  the  whole  MES  work  plan  number  if  you  would  like  to  view  the  components  assigned  to  a

specific operation.

If you would like to view the components of all operations of a work plan only enter the work plan

number, followed by "*“.

Field Descriptions

The fields of a production tool and resource are described here.

Editing functions

Please use the available buttons to create or edit work plan components. A copy function for components

is not planned.

Please note that the BOM item must be unique within the operation if HYDRA-MPL is in

use!

BDE-BAA_81.docx

Version: 1.0.18468

Page 59 of 98

Editing of Orders/Work Plans (MOC)

Toolbar

Edit operations

Function authorization: edwop

Opens  the application Work plan - edit operations.

Edit orders

Function authorization: edwor

Opens  the application Work plan - edit orders.

BDE-BAA_81.docx

Version: 1.0.18468

Page 60 of 98

Editing of Orders/Work Plans (MOC)

19  Work Plan - Edit Production Resources & Tools

1.1

Summary

Menu

Order management --> Routing management --> Work plan - Edit production
resources & tools

Transaction code

edwres

Function authorization

edwres

The "production resources & tools" application allows for the resources, which are required to produce the

article in the current manufacturing level (current operation), to be displayed and edited.

Production resources and tools may be, for example, tools, documents, NC programs, etc.

Selection criteria

The application provides the following selection criteria:

MES work plan number

The production resources and tools assigned to a work plan operation may be selected by entering

the  MES  work  plan  number.  The  MES  work  plan  number  is  the  combined  work  plan/operation

number.

Enter the whole MES work plan number if you would like to view the production resources & tools

assigned to a specific operation.

If you would like to view the production resources & tools of all operations of a work plan only enter

the work plan number, followed by "*“.

Field Descriptions

The fields of a production tool and resource are described here.

Editing functions

Please  use  the  available  buttons  to  create  or  edit  production  resources  &  tools  of  work  plans.  A  copy

function for production resources & tools is not planned.

BDE-BAA_81.docx

Version: 1.0.18468

Page 61 of 98

Editing of Orders/Work Plans (MOC)

If  the  tool  and  resource  management  module  (HYDRA-WRM)  is  in  use,  the  first  production

resource and tool that is not of the resource type "DNC" or "MAT" is taken over into the "tool" field

of the operation. In addition, the "tool" field is checked whether it already includes a value, when

inserting a production resource and tool that is not of the "DNC" or "MAT" resource type. If this is

not the case, this component is taken over. For this reason, it is recommended to insert the "main

production resource & tool" at first in the list of production resources and tools.

Please note with regard to documents: If a new document is assigned to an operation a file is

only uploaded automatically, in case a file has been selected using the file selection dialog. The

file selection dialog can be opened by the button next to the “file name” field.

In this case, the path of the file that is loaded onto the server is displayed below the input field for

the file name. The upload is performed automatically while saving.

No file can be uploaded if the file name is entered manually.

The corresponding data record is created anyway even if an error occurs during the upload.

Toolbar

Edit operations

Function authorization: edwop

Opens  the application work plan - edit operations.

Edit orders

Function authorization: edwor

Opens  the application work plan - edit orders.

-  

BDE-BAA_81.docx

Version: 1.0.18468

Page 62 of 98

Editing of Orders/Work Plans (MOC)

20  Data Structure of Orders

Each of the fields for an order header are described below. The actual sequence of the editing dialogs and

analyses/ overview may deviate from the one illustrated here.

In order to simplify matters, the term order will generally be used, regardless of whether an order or a work

plan is being discussed. Only in examples in which it would make sense for the overall understanding to

differentiate between the two will we use the term work plan.

General index tab

Order and/or work plan

The order number or rather the work plan number is an upper-level number, under which each of the

operations is compiled.

Order type

Order types are issued to structure the orders in accordance with their use. Each order type includes

various control information that is decisive when managing orders.

The standardized order types available in the system are described in the glossary. Additional order

types can be defined when customizing the system.

Article

Material numbers/ reference numbers/ article numbers of the (final) article to be produced with this

order. If no article is entered for the operation, it is transferred to the operations.

Article designation

Name of the article. Any changes to the article designation are assumed redundantly in all operations

of the order. They cannot be entered by operation.

Customer designation

Customer name.

Sales order

Sales order number

Sales order item The line item number can be displayed after the sales order number on the sales order

that this order refers to.

Priority

The priority function can be used as a control tool for the order. The priority is a single digit, numeric

value. The value increases in ascending order ("0" = lowest priority, "9" = highest priority).

This is the value that is used to control a color code designation in the graphic planning board (shop

floor scheduling) via the operation bar and which for planners is a graphic means to show the priority

of the operations. The displayed colors are assigned to the priorities in the shop floor scheduling in

the settings for the graphic planning board.

BDE-BAA_81.docx

Version: 1.0.18468

Page 63 of 98

Editing of Orders/Work Plans (MOC)

During the customizing process, it can be determined based on the order type

- whether the priority of the order header is transferred unchanged to each of the operations

- whether priority management should be turned on.

Order index

The  order  index  can  be  seen  as  an  alternative  to  the  priority.  It  can,  for  example,  (if  configured

accordingly) be included when sorting the graphic detailed planning.

The order index tab is numerical with a valid value range (-999.9 to +999.9).

Target quantity

Quantity specification for the production order in base quantity unit. The indicated target quantity may

include a target scrap quantity that might have been entered.

Target scrap

Planned scrap for the production order in  base  quantity  unit. The  indicated scrap quantity can be

considered as part of the transferred target quantity.

Unit

Quantity  unit  of  the  order  for  the  (final)  article  to  be  produced.  It  establishes  the  degree  of

comparability with scrap from different operations, for example, and is therefore redundantly included

as a base quantity unit in each operation.

Material type

Material type of the (final) article to be produced. If no material type is entered, MES inserts the value

"SYSTEM" here.

Batch number

The batch number reserved for the order; is generally provided by the ERP system.

Dates index tab

Basic date start

The basic start date for the order. It is generally specified by the ERP system.

Basic date end

The basic  end  date  of  the  order.  It  is  generally  specified by  the  ERP  system  and,  in  some  cases

accounting for buffers, it is based on the date required/ delivery date set in the ERP system.

Scheduled start time

Scheduled start date; result of the lead time scheduling as compared to infinite capacities.

BDE-BAA_81.docx

Version: 1.0.18468

Page 64 of 98

Editing of Orders/Work Plans (MOC)

If the scheduling is run outside of the system, the scheduled lead times in the order header should

be applied. If the scheduling is run in MES, these fields are overwritten.

Scheduled end time

Scheduled end date; result of the lead time scheduling as compared to infinite capacities.

If  the  scheduling  is  run  outside  of  MES,  the  scheduled  lead  times  in  the  order  header  should  be

applied. If the scheduling is run in MES, these fields are overwritten.

Scheduling type

The scheduling type describes whether the order is scheduled forward (V) or backward (R) during

lead time scheduling in MES. If scheduled forward, the order is scheduled on the basis of the basic

start date specified in the ERP system. If it is scheduled backward, it is scheduled on the basis of the

basic end date specified in the system.

If no scheduling type is set in the order, the scheduling type defined in Basic Settings is used.

Reduction strategy

If it turns out during scheduling that the lead time for a given order is longer than the allotted time

available, then MES will attempt to take reduction measures to shorten the lead time accordingly.

Reducible times are the wait times and the transport time.

The steps to take to configure the reduction strategies are described in document hls-bk.doc in the

chapter Reduction Strategies and are performed as part of the customizing process.

Assignment index tab

Order group

Each  order  can  be  assigned  to  one  order  group.  Based  on  this  order  group,  the  priorities  are

managed, which means the proportion of valid priorities is each assigned based on this kind of order

group. This makes it necessary to consider the order group in the order as a mandatory field and to

check it against a preset value range. Otherwise, it could not be assured that the priority assignment

can be checked.

Note for SAP users

The term order group corresponds to the SAP production scheduler. For a consistent data exchange

between SAP and HYDRA, the possible production schedulers in SAP should be entered at the same

time that order groups are entered in MES.

MRP controller

The MRP controller for the order, which, for informational purposes, can be assumed in MES and

which is displayed in the console. No value pool is managed in MES in this regard.

Project number:

Project order number

BDE-BAA_81.docx

Version: 1.0.18468

Page 65 of 98

Editing of Orders/Work Plans (MOC)

Planned order

Planned order number, e.g. in serial production

Cost object

Cost object number

Work plan

Work plan number of the work plan that served as the template for generating the production order.

Work plan version

Version number of the work plan that served as the template for generating the production order.

BOM version

Version of the bill of materials assigned to the production order.

Production version

Production version on which the order is based. It is currently only populated when planned orders

are assumed via the HKMPP-REM interface.

Control cycle

ID of the control cycle / supply relationship for which a kanban order has been generated.

Inspection order

Inspection order/ inspection batch number for the order

Sample type

Type of sample for the order

Calculation index tab

The calculation index tab includes additional data fields in which calculation-related values or information

can be stored. These entries are for information purposes only.

Machine costs

Calculated value for the machine costs that are incurred in the production of this order.

Labor costs

Calculated value for the labor costs that are incurred in the production of this order.

Material costs

Calculated value for the material costs that are incurred in the production of this order.

Other costs

Calculated value for other costs that are incurred in the production of this order.

Material value

Calculated value of the produced final article for each base quantity unit.

BDE-BAA_81.docx

Version: 1.0.18468

Page 66 of 98

Editing of Orders/Work Plans (MOC)

Scrap value

Calculated scrap value for each base quantity unit.

User fields index tab

User fields offer the opportunity to enter additional customer-specific information in MES in addition to the

fields available in MES Standard. The order-related user fields are displayed in the order information. The

user field index tab is shown here for the order header, which, in addition to the user field key, also displays

the defined user fields and includes a designation and unit of measure. There are eight sub-index tabs in

the index tab, which each have eight additional user fields. The so-called user field key determines which

user fields they are and what their purpose is.

User field key

Every user field key describes a combination of user fields. The management of the user field key

(and therefore the purpose of the fields) varies from one object to the next.

User fields

The  following  maximum  user  fields  can  be  available  in  the  order  header  (AUNR  object  type)  if

customized accordingly:

Field ID/Index  Field data type

1 - 6
7 - 22
23 -28
29 - 44
45 - 50
51 - 64
65 - 66

Date
Numeric, time, duration
Decimal value
Text field, length 1
Text field, length 10
Text field, length 20
Text field, length 40

Number of
fields
6
16
6
16
6
14
2

User field keys are defined in coordination with the customer during the customizing process.

Administration index tab

The  administration  index  tab  includes  technical  information  on  the  data  record.  This  index  tab  is  not

available in the dialogs "Insert" and "Copy".

Created by

User who entered the order.

Created on:

Time and date the order was entered.

Editor

User who made the last modification in the order header.

BDE-BAA_81.docx

Version: 1.0.18468

Page 67 of 98

Editing of Orders/Work Plans (MOC)

Modification

Time and date when this modification was made.

Transfer from

Here, you can enter the source from where the order was transferred.

Transfer time

If the order was transferred from the ERP system (PPS=J), the transfer time and date is automatically

set to the time and date on which it was stored in MES.

Modified HYDRA

Information that states that the order was modified in MES. This identifier is automatically set at "J",

if a modification is made in MES.

Modified PPS

Information that states that the order was modified in the ERP system. This identifier is automatically

set at "J", if a modification is made via an ERP interface (PPS=J). The identifier is not reset.

Deletion flag

Used for internal processing purposes. Cannot be modified.

Responsibility area

If a responsibility area is entered here, the user must have been authorized to display and edit orders

and/or work plan orders.

BDE-BAA_81.docx

Version: 1.0.18468

Page 68 of 98

21  Order Long Text Data Structure

Editing of Orders/Work Plans (MOC)

Each of the fields for an order long text are described below. The actual sequence of the editing dialogs

may deviate from the one illustrated here.

In order to simplify matters, the term order will generally be used, regardless of whether an order or a work

plan is being discussed. Only in examples in which it would make sense for the overall understanding to

differentiate between the two will we use the term work plan.

Order/ work plan

Order or work plan for which a long text is defined.

Short text

Short version of the long text, which is shown in the application list.

Long text

Actual long text, which is not shown in the application list.

The  text  entry  function,  which  for  the  most  part  is  equivalent  to  the  functions  of  a  text  editor

(highlighting of text passages; deleting or inserting of lines of text, as well as the merging of lines of

text; copying with the key combination Ctrl+C, cutting with the key combination Ctrl+X, and pasting

with the key combination Ctrl+V). Lines may have more than 80 characters when entered. When a

document is saved, however, the system inserts a hard line break after the 80th character.

BDE-BAA_81.docx

Version: 1.0.18468

Page 69 of 98

22  Data Structure of Order Sequences

Editing of Orders/Work Plans (MOC)

Each  of  the  fields  for  a  sequence  is  described  below.  The  actual  sequence  of  the  editing  dialogs  may

deviate  from  the  one  illustrated  here.  Information  about  sequences  can  be  found  in  the  document  edit

sequences.

In order to simplify matters, the term order will generally be used, regardless of whether an order or a work

plan is being discussed. Only in examples in which it would make sense for the overall understanding to

differentiate between the two will we use the term work plan.

Order/ work plan

Order for which the sequence is defined. A sequence can only be set up for an order, if the order

header already exists in MES.

Sequence

Identification of the sequence within an order.

Please note: The standard sequence always has the sequence number 0.

If the "sequence" field is not shown, the sequence number length is 0 in the basic

parameter settings. Please contact MPDV.

Designation

Description of the sequence.

Sequence category

S = Standard sequence

There is only one standard sequence for every order; it cannot be deleted.

P = Parallel sequence to the standard sequence

There can be several parallel sequences for each order.

A = Alternative sequence to the standard sequence

There can be several alternative sequences for each order.

Please note:

The sequence category cannot be edited after a sequence has been set up!

Active

The qualification "Active" is only relevant for alternative sequences:

J = Active

N = Not active

BDE-BAA_81.docx

Version: 1.0.18468

Page 70 of 98

Editing of Orders/Work Plans (MOC)

If a new alternative sequence is set up, it is set as not active.

For standard sequences and alternative sequences, this qualification is always set to active.

Orientation

If  there  are  several  parallel  sequences,  the  lead  times  generally  vary  in  length.  This  creates  time

buffers in the sequences. The orientation function controls whether these buffers are at the beginning

or the end of the sequences. The following options are available:

F = Earliest due date

If the sequence is set for the earliest date, the buffer will be at the end of the sequence.

S = Latest due date

If the sequence is set for the latest date, the buffer will be at the beginning of the sequence.

N = Not relevant; this is the case for standard sequences and alternative sequences.

If there are several parallel sequences for a given standard sequence, the orientation of the standard

sequence is used for all segments of the standard sequence for which parallel sequences exist.

Version

Change number/version; for information purposes only.

Branch operation

Operation number of a standard sequence operation,

before which a parallel sequence should branch off, or

from which on an alternative sequence should be replaced.

This is a mandatory field for parallel and alternative sequences. For a standard sequence, this field

must remain empty.

If  manually  setting  up  an  alternative  or  parallel  sequence,  the  branch  operation  of  the  standard

sequence must already exist in the orders on hand. When a sequence is handed over via an interface,

a valid order number also must be handed off (there is no plausibility check).

Return operation

Operation number of a standard sequence operation,

after which a parallel sequence should branch off, or

up to which an alternative sequence should be replaced.

This is a mandatory field for parallel and alternative sequences. For a standard sequence, this field

must remain empty.

If manually setting up an alternative or parallel sequence, the branch-off operation of the standard

sequence must already exist in the orders on hand. When a sequence is handed over via an interface,

a valid operation number also must be handed off (there is no plausibility check).

BDE-BAA_81.docx

Version: 1.0.18468

Page 71 of 98

Editing of Orders/Work Plans (MOC)

Reference sequence

The reference sequence determines the sequence in the order that the reference operations (branch

and return) refer to. This is always the standard sequence (sequence number 0).

This is a mandatory field for parallel and alternative sequences. The standard sequence must already

exist.

For a standard sequence, this field must remain empty.

BDE-BAA_81.docx

Version: 1.0.18468

Page 72 of 98

Editing of Orders/Work Plans (MOC)

23  Data Structure of Operations



Each of the fields for an operation is described below. The fields are structured in this case using the index

tabs. The actual sequence may deviate from the one illustrated here.

In order to simplify matters, the term order will generally be used, regardless of whether an order or a work

plan is being discussed. Only in examples in which it would make sense for the overall understanding to

differentiate between the two will we use the term work plan.

General tab

Order / work plan

The order number or rather the work plan number is an upper-level number, under which each of the

operations is compiled.

Sequence

The sequence number is the number of operation sequences in use.

OP

Split

The operation number is the number listed below the order used to identify the operation.

The split number

OP designation

Name of the operation; generally simply a short description of the activities that will be performed.

Article

Reference/item number of the article or material that is produced with the operation.  If no article is

entered, the article from the field with the same name in the order header is assumed here.

Material type

Material type of the article that is to be produced in this particular production step. If no material type

is entered, the value from the field with the same name in the order header is assumed here.

Priority

The  priority  can  be  used  as  a  control  tool.  The  priority  is  a  single  digit,  numeric  value.  The  value

increases in ascending order ("0" = lowest priority, "9" = highest priority).

Depending  on  the  order  type,  the  priority  may  be  configured  so  that  they  either  reference  the

operation or the order. Choosing the latter will mean that the priority of the operation is assumed from

the order header.

BDE-BAA_81.docx

Version: 1.0.18468

Page 73 of 98

Editing of Orders/Work Plans (MOC)

Planned on

This identifier describes whether the operation is located in the group pool  or if it is planned on a

specific workplace / machine The operations are planned in MES either within the graphic detailed

planning or in the order sequencing stage.

Entering  or  deleting  the  workplace  at  a  later  time  will  NOT  automatically  change  this

identifier.

Planned workplace

If  the  identifier  planned  for  workplace  is  set,  this  means  that  the  operation  is  planned  for  the

workplace entered here. If the input field is empty, the operation is not planned for any workplace.

Please note: When an operation is logged in, this field is automatically set to the workplace at which

the operation was logged in. Doing so will overwrite any (in some cases a different) workplace for

which the operation was planned up until then. As a result, the OP is implicitly re-planned.

Group

(Planned) station / machine group  designated for producing the operation. It is meant as a planning

criterion for group-oriented planning and in the graphic detailed planning.

When an operation is logged into a (different) workplace, its group will be updated, if necessary.

If, due to logging in the operation, there is a change to the group for which the operation was planned

up until now, NONE of the values are assumed from the template (this only happens if modifications

are made manually in the editing function).

Fixed

This identifier specifies whether an operation is set as fixed during the planning process.

Before  running  automatic  planning,  the  capacities  (workplaces)  are  completely  released  with  the

exception of the fixed operations. Fixed operations that are still set in the past are moved to the right

and set to "now" at the earliest plus a planning lead time. Any operations planned for the future remain

dispatched without changes.

Material

The first resource of the type "Material" (ID: "MAT") available in the component list is assumed in this

field. This is the "most important" input material.

This  field  is  used  in  planning,  for  example,  when  applying  the  setup  change  list  or  in

graphic  detailed  planning  when  planning  equipment  setup  changes.  It  is  of  no

significance to processing as part of the material and production logistics (MPL):

Color

You can enter the color of the main input material or the article planned for production here. This field

is used in planning for example in the setup change list or when planning equipment setup changes.

BDE-BAA_81.docx

Version: 1.0.18468

Page 74 of 98

Editing of Orders/Work Plans (MOC)

Tool

When using the tools and resource management module, the first resource available in the production

resource / component list that is not designated with the resource type "DNC" or "MAT" is assumed

here.

To this end, when a component is being entered that does not have a resource type "DNC" or "MAT",

the system checks whether this field already includes a value. If no value is entered, this component

is  assumed.  For  this  reason,  we  recommend  to  first  input  the  "main  production  resource"  in  the

production resource list.

This field is considered in the graphic detailed planning to determine production variants.

However, the production resources stored in the operation are relevant when checking

capacities.

By  default,  the  field  is  of  no  relevance  for  processing  in  tools  and  resources

management.

DNC

When  applying  the  production  facility  management,  the  first  resource  available  in  the  production

resource / component list that has a resource type "DNC" (ID: "DNC") is assumed. To this end, when

a component with a resource type "DNC" is entered, the system checks whether there is already a

value in this field. If no value is entered, this component is assumed.

In the system, this field is mainly used as a comment. By default, it has no significance

for DNC processing.

Upload number

The purpose of the confirmation/upload number is to identify an operation. This is a numeric value

that is used for postings as an alternative to the combined order/OP number.

Examples of applications

  Most of the time, a bar code is hard to read if the order / OP number is long (for example

when using bar code guns with a limited scanning range);



if the space available on the work document is not large enough.

Please note: The length of the input field depends on the settings made for "Length of upload number"

in the basic parameter settings. If no length is specified there, the field is shown across the whole

width of the application.

This field must be left blank for work plan operations.

BDE-BAA_81.docx

Version: 1.0.18468

Page 75 of 98

Editing of Orders/Work Plans (MOC)

Authorization

An authorization identifier that indicates whether a user is authorized to log this operation on / off.

This involves cross-checking the identifier OP postings in the HR master data.

Cost type

The cost type to be posted when executing this operation, for example in an overhead cost operation

/ order. At the moment, this field is only used as a comment.

Cost center

The  cost  center  to  be  debited  when  executing  this  operation,  for  example  in  an  overhead  cost

operation / order. At the moment, this field is only used as a comment.

Dates tab

The following dates are results that were calculated and executed during lead time scheduling. Lead time

scheduling is triggered by certain events and runs asynchronously in the MES system.

Scheduled start time

Scheduled  start  time  of  the  operation  as  a  result  of  the  lead  time  scheduling  compared  to  infinite

capacities.

As a rule, a fixed operation is never changed. If, based on the scheduling situation, a date cannot be

maintained, the operation is rescheduled, but it remains fixed.

Scheduled end time

Scheduled  end  time  of  the  operation  as  a  result  of  the  lead  time  scheduling  compared  to  infinite

capacities.

Earliest start

Earliest start date (EST) of an operation as a result of forward scheduling during lead time scheduling

as compared to infinite capacities or specified by PPS.

Earliest end

Earliest end date (EET) of an operation as a result of forward scheduling during lead time scheduling

as compared to infinite capacities or specified by PPS.

Latest start

Latest  start  date  (LST)  of  the  operation  as  a  result  of  backward  scheduling  during  lead  time

scheduling as compared to infinite capacities.

Latest end

Latest end date (LET) of the operation as a result of backward scheduling during lead time scheduling

as compared to infinite capacities.

BDE-BAA_81.docx

Version: 1.0.18468

Page 76 of 98

Editing of Orders/Work Plans (MOC)

Buffer time

The buffer time is determined based on the difference between the latest start date (LST) and the

earliest start date (EST) for an operation

The sum total of the buffer times of all operations is stored in the order (header) in the field OP buffer.

Reducible time

If it turns out during scheduling that the lead time for a given order is longer than the allotted time

available (basic end date exceeded), then MES will attempt to take reduction measures to shorten

the lead time accordingly. Reducible times are the wait times and the transport time.

This value indicates how many (more) hours can be reduced from the lead time of an order. The time

for  an  operation  that  can  still  be  reduced  is  equal  to  the  difference  from  the  current  time  and  the

minimum time, each for the wait time and the transport time. These differences are displayed here

as totals.

Information on how reduction strategies are configured is provided in the document entitled reduction

strategies.

Planned start

Planned start date for the operation.

Logging in an operation that has not yet been planned will not result in the time

for  the  first  operation  start  to  be  interpreted  as  a  planned  start  and  therefore

storing it as such here.

Planned end

Planned end date for the operation.

The planned dates (planned start/planned end) are set:

  by HYDRA Shop Floor Scheduling (HLS) upon saving
  by the Graphic Order Sequencing (GAV) upon saving
  by manual data maintenance (client)
  by the interface

The  following  logic  applies  for  inserting  and/or  editing  an  operation  (manual  data  maintenance  or  by

interface):



Insert/copy operation

o
o
o

If the planned start is empty, it will be assigned to the earliest start date by default.
If the planned end is empty, it will be assigned to the latest end by default.
In both cases, however, the operation is not planned (automatically), i.e. the operation
can still be removed from planning.

  Change operation

o

In this case, processing depends on the "planning function" flag of the workplace:

  N (no planning):





If the planned start is empty, it will be assigned to the earliest start date
by default.
If the planned end is empty, it will be assigned to the latest end date by
default.

BDE-BAA_81.docx

Version: 1.0.18468

Page 77 of 98

Editing of Orders/Work Plans (MOC)



In any other cases, the planned dates will not be set automatically through
processing.

Quantities tab

Generally, quantities can be listed in four different units for an operation. Provided for each quantity unit is

the target quantity  and quantity  unit. There is  also the option to  provide a calculated  "estimated scrap".

These quantities can be specified by the PPS system or, if the target quantity update is activated, may be

the result of the produced quantity from the previous operation.

The letters in parentheses behind the field descriptions provide information  about the particular quantity

type.

(P)

(S)

(T)

(B)

Primary quantity unit

Secondary quantity unit

Tertiary quantity unit

Base quantity unit

Target quantity (P) / unit / target scrap quantity (P)

The primary quantity is a unit in which entries are made at the terminal (primary input quantity).

The indicated target quantity may include a target scrap quantity that might have been entered.

Send-ahead quantity

In order to illustrate any overlapping, a minimum send ahead quantity (in the primary quantity  unit)

can be defined for an operation. The following operation can be started as overlapping if at least the

send ahead quantity is reported as completed. In addition to the validation check relating to the send

ahead  quantity  that  is  performed  when  data  is  entered  (operation  log  in),  any  overlapping  is  also

accounted for during scheduling and during detailed planning.

The  relevant  configuration  needs  to  be  enabled  at  the  order  type  to  check  the

minimum  send  ahead  quantity,  when  logging  OPs  on.  The  system  supports

overlapping operations with respect to the minimum send ahead quantity (or the

lead time). This is enabled at the processing code while customizing the system.

When checking the minimum send ahead quantity, the system only accounts for

the recorded yield that was entered up until now (primary quantity unit).

Quantities are not converted. For this reason, please pay attention to the fact that

adjacent operations have the same primary quantity unit.

Example:

Operation 0100

Target quantity 1000  Send ahead quantity 50

Operation 0200

Target quantity 1000

BDE-BAA_81.docx

Version: 1.0.18468

Page 78 of 98

Editing of Orders/Work Plans (MOC)

If checking is enabled, operation 0200 can only be logged on as soon as a

yield (in primary quantity unit) of at least 50 has been uploaded/confirmed

for operation 0100.

Checking does not include the operation status of the preceding operation. The

current  operation  cannot  be  logged  on,  in  case  the  preceding  operation  has

already been finished, but the send-ahead quantity has not yet been reached.

Target quantity (S and T) / unit / target scrap quantity (S and T)

The secondary and tertiary quantity are considered optional, variable units (for example within the

reel-based MES solution - RF).

The indicated target quantity may include a target scrap quantity that might have been entered.

Target quantity (B) / unit / target scrap quantity (B)

The base quantity unit is an objective description of the material used in an order, which means it

represents a level of comparison of, for example, scrap from different operations. The base quantity

unit is in effect the quantity unit shown in the work order header. Generally, conversions (for example

when target quantities are updated) are made using the base quantity unit.

The indicated target quantity may include a target scrap quantity that might have been entered.

Please give special attention when using a quantity type that the relevant quantity unit

is set correctly.

The  quantities  are  only  converted  based  on  the  conversion  factors  in  the  index  tab

"quantities" if the relevant values that need to be recalculated have been set to "empty"

(not "0"). Quantity fields that contain values will not be recalculated.

Conversion factors

Conversion factors are used to convert primary, secondary and tertiary quantities to a base quantity.

These are used, for example, at the time the target quantities are updated.

In order for the conversion factor to also be able to use a decimal value (meaning a figure with decimal

places), they are each illustrated using their relevant numerator and denominator.

Example

- Base quantity unit: Square meter M2

- Primary quantity unit: Piece PCE

- 1 piece = 2 square meters.

In this case

- the numerator is defined as the primary quantity 2 and

- the denominator is defined as the primary quantity 1

BDE-BAA_81.docx

Version: 1.0.18468

Page 79 of 98

Editing of Orders/Work Plans (MOC)

If no (valid) conversion factor exists, the system will attempt to convert using conversion formulas (this

requires that formulas were defined accordingly during the customizing process).

Overdelivery/ Underdelivery

All quantity postings made at the time of partial confirmation/upload, interruptions or when logging off

the  separate  operations  are  subject  to  an  operation-related  verification  to  check  for  overdelivery.

When an operation is logged off, an additional verification is run to check for underdelivery.

Further information on overdelivery/underdelivery checking can be found in the

document entitled MBL_PC_UnderOverDeliveryOverview.pdf.

Underdelivery (%)

Value  shown  as  a  percentage  by  which  the  quantity  reported  back  may  deviate  from  the  target

quantity (primary quantity unit). The value is only assumed from the processing code if the value was

not explicitly transmitted via the ERP interface.

Example:

Target quantity of the operation: 120 items

Underdelivery: 84%

The actual quantity must not fall below 70 items.

Overdelivery (%)

Value  shown  as  a  percentage  by  which  the  quantity  reported  back  may  deviate  from  the  target

quantity (primary quantity unit). The value is only assumed from the processing code if the value was

not explicitly transmitted via the ERP interface.

Example:

Target quantity of the operation: 120 items

Overdelivery: 168%

The actual quantity must not exceed 140 items.

Overdelivery reaction/ underdelivery reaction

If the limits in the fields overdelivery or underdelivery are exceeded, a warning or an error message

may be issued in response. Possible values:

"empty"  No reaction

W

X

Warning

 Error.

When setting a warning as a reaction, you can override the validation check by entering a deviation

reason.

If Error is set as a response, you will not be able to override the validation check.

BDE-BAA_81.docx

Version: 1.0.18468

Page 80 of 98

Editing of Orders/Work Plans (MOC)

Please note: The messages can only be processed further at Windows terminals. When using DOS

terminals, the response "W" is interpreted as an error.

Unit quantity

Quantity that is referenced in the operation specifications. In MES (customized), here the ERP base

quantity can be assumed and be referenced in formulas used to calculate processing times.

The  unit  of  the  unit  quantity  must  be  a  primary  quantity  unit.  The  system  does  not  perform  an

automatic conversion if the quantity units do not match.

As opposed to the basic quantity in ERP, there is no other meaning or use in MES.

Durations / target times tabs

The illustration shown below provides an overview of the chronological structure of an operation in MES (in

house production).

Target setup time

The target setup time is the time required to prepare a workplace for the operation, for example the

time needed to mount the necessary tools or to set the machine using the relevant definitions ("setup

time"). During this time, the workplace's capacity is shown as in use

The  target  setup  time  is  transferred  from  the  PPS  system  or  custom  formulas  calculated  from

specified values can be defined; in this case, the formula must be entered in the field "Setup time

formula".

BDE-BAA_81.docx

Version: 1.0.18468

Page 81 of 98

...Arbeitsgang0010Arbeitsgang0020AGnWartenRüstenBearbeitenAbrüstenLiegenTransportÜbergangs-zeitÜbergangs-zeitDurchlaufzeit des ArbeitsgangsDurchführungszeit-> Länge des AG-Balken in der Plantafel

Editing of Orders/Work Plans (MOC)

Additional setup time

The additional setup time is set at the operation using graphic detailed planning if a setup change

matrix was entered and if any such results from planning.

The additional setup time can also show a negative value.

Target processing time

The processing time is the time needed to process the material during an operation. During this time,

the workplace's capacity is shown as in use. The processing time depends on the order quantity; it

does neither include the setup time nor the dismantling time.

The  processing  time  is  not  used  in  the  graphic  detailed  planning,  but  instead  the

processing or rather the remaining run time is calculated dynamically using the formula

entered in the field "Formula RRT 1".

The target processing time is transferred from the PPS system or it can be calculated using a custom

formula based on predefined values. In this case, the formula must be entered in the field "processing

time formula". What needs to be remembered here is that the processing time is calculated using the

same principle as the one used to calculate the remaining run time (field "Formula RRT1").

Planned dismantling time

The planned dismantling time  (teardown/retooling time) is the time needed to reset the workplace

back to its original state after the operation has been completed. This may require some tasks such

as dismantling tools or performing some cleaning work. During this time, the workplace's capacity is

shown as in use.

The  planned  dismantling  time  is  transferred  from  the  PPS  system  or  it  can  be  calculated  using  a

custom formula based on predefined values. In this case, the formula must be entered in the field

"Dismantling time formula".

Planned delivery time

There  is  only  one  time  component  for  external  operations,  the  delivery  time.  It  is  matched  to  the

Gregorian

calendar.

The

performance

level

has

no

relevance.

External processing

If  this  identifier  is  set,  the  operation  is  one  that  is  performed  externally.  External  operations  are

generally not planned, but only scheduled. In terms of scheduling, the lead time results only from the

delivery time for these kinds of operations.

If  this  identifier  has  not  been  set,  it  will  be  considered  an  in  house  operation.  The  capacity

requirements are calculated for these kinds of operations based on processing times:

- Target setup time

- Target processing time

- Target dismantling time.

BDE-BAA_81.docx

Version: 1.0.18468

Page 82 of 98

On the other hand, the following processing times are used for scheduling (lead time scheduling):

Editing of Orders/Work Plans (MOC)

- Planned waiting time

- Target setup time

- Target processing time

- Target dismantling time

- Planned idle time

- Planned transport time.

Formula RRT1 / Formula RRT2

Formula RRT1 is used to describe the calculation of the remaining run time (RRT) for an operation.

It is used in the graphic detailed planning.

Unless otherwise specified or defined, the formula to be entered here is the RRT value. In this case,

the remaining run time is calculated as follows:

(Target cycle / 1,000) * (primary target quantity - the yield recorded up until now) /    partitioning

The RRT 2 formula is an optional one that is used to calculate any remaining run time that might

deviate from RRT 1.

Planned lead time

An overlapping of operations can either be specified using a send ahead quantity or lead time. The

lead time describes the offset from the previous operation to its subsequent operation. A lead time

can  also  be  negative,  if,  for  example,  the  subsequent  operation  begins  with  a  setup  before  the

previous operation.

Max. sync. time

If synchronization is activated with the subsequent operation by the processing code (customized),

then it must be assured in the planning stage that the maximum time specified between this operation

and the subsequent operation is the defined synchronization time

The time is calculated in hours based on the shift calendar.

Synchronization can be combined with an overlapping.

Planned wait time / wait time formula / minimum wait time

The  wait  time  is  one  available  option  to  absorb  interferences  and  delays  for  each  operation.  It

describes  the  (calculated)  length  of  time  that  needs  to  pass  before  an  operation  can  commence

(setup) and it is accounted for during scheduling. The wait time can either be entered directly or it

can be calculated using a formula.

The wait time can be reduced during the scheduling process. This requires that a reduction strategy

has been entered for the order, which triggers a reduction in the wait time. The maximum amount of

time it can be reduced is the minimum wait time.

BDE-BAA_81.docx

Version: 1.0.18468

Page 83 of 98

Editing of Orders/Work Plans (MOC)

Planned idle time

The planned idle time describes the length of time that needs to pass for processing related reasons

before a manufactured or processed material can undergo the next processing step. The idle time is

accounted for during scheduling. It is not possible to reduce the idle time.

Target transport time

The planned transport time is the time necessary  to transport material from one  workplace to the

next. It is transferred from the upper-level ERP system or it can be calculated in MES using a transport

matrix.

The transport time is accounted for during lead time scheduling and can also be reduced during this

operation. The transport matrix and the reduction strategies are both defined when customizing the

system.

Minimum transport time

The transport time can be reduced to this minimum amount of time during scheduling by applying

reduction strategies.

The following wage specifications are used to calculate an incentive wage.

Wage type

Wage type

Wage indicator

Piecework ID/premium  (E/G/S/M/Z/...)

Target te

Premium default: te (per 1,000 pieces).

"te" is the "time per unit" for each person. It is used to calculate the "order time", which is the specified

processing time for each person used to calculate the incentive wage. The standard setting in MES

is to show it in hours per 1,000 pieces and to transfer it at the interface in seconds per 1,000 pieces.

If no incentive wage is to be calculated in MES, you can enter "0" here.

Target tr

Target tr is the specified setup time (in hours) per person.

If no incentive wage is to be calculated in MES, you can enter "0" here.

Target teb

The  premium  default  teb  is  the  available  machine  time  per  unit  and  it  is  used  to  calculate  the

"occupancy time" for the workplace / the machine so that the incentive wage can be calculated. The

standard setting in MES is to show it in hours  per 1,000 pieces and to transfer it at the interface in

seconds per 1,000 pieces.

If no incentive wage is to be calculated in MES, you can enter "0" here.

BDE-BAA_81.docx

Version: 1.0.18468

Page 84 of 98

Editing of Orders/Work Plans (MOC)

Target trb

Target trb is the specified setup time (in hours) per workplace / machine

If no incentive wage is to be calculated in MES, you can enter "0" here.

Processing tab

Processing code

A  processing  code  is  a  compilation  of  indicators  that  are  used  to  control  the  operations.  Each

operation  references  this  kind  of  processing  code,  and  as  a  result  its  performance  is  defined  in

relation to the issues listed below.

This processing code is defined at the time the system is customized. Unless defined otherwise, the

default setting to be entered here is the processing code SYSTEM.

Recordable

If this option is set, the operation can generally be logged in, provided other criteria is also met (e.g.

operation not locked or operation cannot be logged in because of the status of a previous operation).

Can be logged on at the same time

This option specifies whether an operation may be logged on several times, i.e. at the same time.

This option should be enabled for overhead cost operations as well as for operations that are logged

on to  group  workplaces. However,  this option should  not  be set for  operations that  are subject to

batch management requirement.

The ability to log on operations in parallel is not supported in the planning functions graphic detailed

planning,  order  sequencing,  graphic  order  sequencing.  These  planning  functions  assume  that  an

operation is planned for exactly one capacity. If one operation is now logged on to several workplaces

at  the  same  time,  contrary  to  capacity  planning,  this  is  then  in  opposition  to  planning.  In  order  to

conduct parallel planning of operations on different capacities, MES provides the operation splitting

function.

Batch management requirement

Set  this  option  if  the  operation  requires  batch  management.  This  special  processing  step  for

operations that require batch management requires that material management is applied.

Serial number obligation

This option should be modified only after consultation with MPDV.

Layout

The code entered here references a label that was created in MES Label Designer that needs to be

printed for the operation.

BDE-BAA_81.docx

Version: 1.0.18468

Page 85 of 98

Editing of Orders/Work Plans (MOC)

Target cycle

The target cycle is a work-operation related specification used for machine clocking. The target cycle

does  not  depend  on  the  number  of  produced  parts.  In  MES,  it  is  calculated  and  processed  as  a

duration per 1,000 machine cycles.

If  cycle  time  monitoring  is  active,  this  value  is  assumed  as  the  default  setting  for  finishing  the

operation. This value is the default value for the MDE machine monitoring function (cycle monitoring).

Partitioning

The partitioning (cavity) defines how many parts are produced during a machine cycle.

Partitioning is determined for each operation separately and is transferred via the ERP interface to

MES.  It  is  transmitted  to  the  terminal  at  the  time  the  operation  is  logged  on  and  applies  for  the

machine at which the operation is logged on.

Pulse factor

During  automatic  quantity  collection  at  the  terminal,  a  pulse  factor  stored  at  an  operation  is  also

considered. Consequently, the pulse factor and the partitioning represent a conversion factor for the

automatic collection of quantities: primary quantity = cycle * partitioning/pulse factor.

Split authorization

This option defines whether an operation may be split.

Max. no. of splits

If an operation can be split it is checked whether or not the split number entered by the user exceeds

the value entered here. If this is the case the split is rejected with an error.

M/O relation setup (machine/operator relation, setup)

Personnel requirements PEP (workforce requirements planning) for setting up the operation

Qualification (setup)

Unique qualification number from the qualification master data.

M/O relation production (machine/operator relation, production)

Number  of  employees  required  for  production.  By  configuring  the  system  accordingly  during  the

customizing stage, you can define for each order type that only the number of persons specified here

can log on. If several operations are logged on at the same time (in parallel), the maximum number

of persons is equal to the total number of M/O relations for each separate operation.

In  workforce  requirements  planning  (PEP)  this  field  is  used  to  define  the  personnel  requirements

needed to produce the operation.

BDE-BAA_81.docx

Version: 1.0.18468

Page 86 of 98

Editing of Orders/Work Plans (MOC)

Alternatively to defining the personnel requirement by way of the machine-operator ratio for the

operation,  it  can  also  be  defined  by  way  of  required  production  resources.  As  opposed  to  the

production resources, the personnel requirement for one qualification only can be defined for setup

and production if the M/O ratio is used.

The  machine/operator  ratio  (for  setup  and  production)  is  then  only  relevant  for  personnel

scheduling if a qualification has been entered in the field behind it.

Qualification (production)

Unique qualification number from the qualification master data.

Production variant

The use of the production variant when transferring order specifications from an external ERP system

provides the option to define at which machine an operation should be planned. Furthermore, when

making use of the graphic detailed planning based on existing production variants, one detailed plan

can  be  carried  out  that  accounts  for  the  separate  specification  times  (target  cycle,  setup  and

dismantling time) per production variant.

The key of the currently assigned production variant is filed here.

Data identifier

This is where the data identifier needs to be set if an Arburg Control System (ALS) is used. It must

be unique (key). If ALS is not used, leave this field empty.

CBM tab

This index tab is only relevant in connection with the reel-based solution using in the material management

module.

General

Special indicators

Not used; this field must remain empty.

Number of reels

The planned total number of reels to be produced (parent roll and sub-rolls); no specific processing

in MES.

Material properties

Input width

Reel input width in MM

Output width

Reel output width in MM

BDE-BAA_81.docx

Version: 1.0.18468

Page 87 of 98

Editing of Orders/Work Plans (MOC)

If multiple rolls are manufactured at the same time in one operation, this field indicates the sum total

of the separate widths.

If branches are planned, for each operation ("parent" and "sub-roll" operations), the output width of

the separate operations is set explicitly (no sum total is generated).

Seam width

Total seam width in mm

If several reels are produced at the same time in one operation, this field will contain the sum total of

the separate seam widths.

If branches are planned, for each operation ("parent" and "sub-roll" operations), the seam width of

the separate operations is set explicitly (no sum total is generated).

Surface per piece

Surface for a piece in MM2/pce

Mass per unit area

Mass per unit area in G/MM2

Casing weight

This is where the casing weight for the sub-rolls is defined during cutting operations.

 Unit: G

Cutting information

Cutting OP

Only relevant if the operation is a cutting operation

"  "

"T"

No roll cutting

Roll cutting active (sub-roll numbering)

"M"

Cutting active (parent rolls are being produced again)

Branch OP

Identifies parent and subordinate operations for a planned branch.

"M“

"K“

Mother OP

Mother OP of a planned branch

Child (subordinate) OP of a planned branch

If a branch is planned, the branched off material is allocated by these fields to the relevant mother

operation.

A mother operation must reference itself.

Please note: The MES order ID (= MES order number = combined order / operation number) must

be set here.

BDE-BAA_81.docx

Version: 1.0.18468

Page 88 of 98

Editing of Orders/Work Plans (MOC)

Daughter rolls/cut

Number of planned daughter reels per cut.

If the cutting plan is not planned, 0 is entered here.

Daughter rolls/cut - total

For  cutting  operations  (mother  OP):  number  of  planned  daughter  rolls  per  cut  (encompassing  all

branched off material).

If the cutting plan is not planned, 0 is entered here.

User fields tab

User fields offer the possibility to store further customer-specific information to MES besides the available

fields in MOC standard. The operation-related user fields are displayed in the order information. The user

field index tab is shown here for the operations, which, in addition to the user field key, also displays the

defined user fields and includes a name and unit of measure. There are eight sub-index tabs in the index

tab, which each have eight additional user fields. The so-called user field key determines which user fields

are involved and which meaning they have.

Object type

The object type for the operation related user fields is AGNR (cannot be modified).

User field key

Every user field key describes a combination of user fields. The management of the user field key

(and therefore the purpose of the fields) varies from one object to the next. User field keys are defined

in coordination with the customer during the customizing process.

User fields

The following user fields are available after customizing the system:

Field data type

Date
Numeric,
time, duration
Decimal value
Text field, length 1
length
field,
Text
10
Text
20
Text
40

length

length

field,

field,

Number of
fields
6
16

6
16
6

14

2

A maximum of 8 fields are shown for each page.

BDE-BAA_81.docx

Version: 1.0.18468

Page 89 of 98

Editing of Orders/Work Plans (MOC)

Default values tab

Up  to  ten  default  values  can  be  entered  for  each  operation.  The  default  values  are  used,  among  other

things,  to  calculate  certain  processing  times  using  specified  calculation  rules.  The  meaning  of  each

separate default value is defined by the default value key.

Please note

We recommend that you do not make any change to the default value key at the operation directly,

because this might distort the meaning of the separate default values.

Default value keys are configured in coordination with the customer during the customizing process.

Administration tab

Created by / Created on

User  who  entered  the  operation  as  well  as  the  time  that  the  operation  was  entered.  These  fields

cannot be modified.

Modified by / Modified on

User who most recently modified the operation, as well as the time that this modification was made.

These fields cannot be modified.

Transferred by / Transfer time

Here,  you  can  enter  the  source  from  where  the  operation  was  transferred.  If  the  operation  was

transferred from the PPS system (PPS=J), the transfer time and date is automatically set to the time

and date on which it was stored in MES. These fields cannot be modified.

Modified HYDRA

Information that states that the operation was changed in MES. This identifier is automatically set at

"J", if a change is made in MES. This field cannot be modified.

Modified PPS

Information that states that the production order was changed in the ERP system. This identifier is

automatically  set  at  "J",  if  a  change  is  made  via  an  ERP  interface  (PPS=J).  This  field  cannot  be

modified.

Deletion flag

This option is only displayed in the order information. It cannot be changed.

Responsibility area

If an area of responsibility is entered here, the user must have been authorized to display and edit

operations and/or work plan operations.

The fields listed below are only displayed in the order information. They cannot be modified by the user.

BDE-BAA_81.docx

Version: 1.0.18468

Page 90 of 98

Editing of Orders/Work Plans (MOC)

Locked / Locked by / Locked on

Locked operations cannot be logged in and are also not displayed on the terminal in the sequencing

list - irrespective of how the status is configured.

Furthermore, the user is shown who was the last to lock the operation and also the time and date on

which the last lock was made. These values remain even after the operation is unlocked. They are

updated each time the operation is locked again.

Unlocked by / unlocked on

The user who terminated the last lock is shown here as well as the time and date on which the last

unlocking occurred. These values remain even if the operation is locked again any time in the future.

They are not updated until the operation has again been unlocked.

Locked for editing / Locked for editing by / Locked for editing on

Reserved; currently not used.

Reactivated by / Reactivated on

If an operation that has already ended is reactivated, the user is displayed here, who performed the

last reactivation as well as the time and date on which the reactivation took place

BDE-BAA_81.docx

Version: 1.0.18468

Page 91 of 98

24  Datenstruktur Arbeitsganglangtexte

Editing of Orders/Work Plans (MOC)

Each of the fields for an operation long text are described below. The actual sequence of the editing dialogs

may deviate from the one illustrated here.

MES order number / MES work plan number

Combined order/ operation number and/ or work plan/ operation number of the operation for which a

long text is defined.

Short text

Short version of the long text, which is shown in the application list.

Long text

Actual long text, which is not shown in the application list.

The  text  entry  function,  which  for  the  most  part  is  equivalent  to  the  functions  of  a  text  editor

(highlighting of text passages; deleting or inserting of lines of text, as well as the merging of lines of

text; copying with the key combination Ctrl+C, cutting with the key combination Ctrl+X, and pasting

with the key combination Ctrl+V). Lines may have more than 80 characters when entered. When a

document is saved, however, the system inserts a hard line break after the 80th character.

BDE-BAA_81.docx

Version: 1.0.18468

Page 92 of 98

25  Data Structure of Components

Editing of Orders/Work Plans (MOC)

Below is a description of the separate fields used for a (material) component. The actual sequence of the

editing dialogs may deviate from the one illustrated here.

MES order number / MES work plan number

Combined  order  /  operation  number  or  work  plan  /  operation  number  for  the  operation  that  a

component has been assigned to.

Material

Enter the material number for the material component here.

Designation

Here you can specify the name of the material.

Comment 1 / Comment 2

These are comment fields.

BOM item

In a BOM, the separate components of a product are referred to as items. The order of the BOM item

is determined by the number that is entered here. As a result, the same material numbers can appear

in the component list and the entry can clearly be assigned to the correct component item.

Please note that when using the MPL, the BOM item must be unique within the operation.

For the reel-based solution "RF", this is the position of the component in the layer structure.

BOM level

A component can also have several levels. If applicable and known, please enter the BOM level here.

Postings can only be carried out on materials of a BOM level 0. If the system indicates a

BOM level > 0, the component type (see the field after the next) must as a rule be set to

"I" (info component).

Material type

Type of material of the material component. In MES, material specific processing is controlled by the

material type.

Unless defined otherwise for a specific project, assign the material type SYSTEM here.

BDE-BAA_81.docx

Version: 1.0.18468

Page 93 of 98

Editing of Orders/Work Plans (MOC)

The material type must exist in MES (see configuration material types). If no material type

has been entered, MES will attempt to determine the material component (requirement:

the assignment of material to material type has been entered. If no material type can be

found, MES will assign SYSTEM as the material type.

For  info  components  (material  type  "I")  we  recommend  that  you  define  and  assign  a

separate material type (e.g. INFO).

Component type

Possible values:

M

Material component (default)

Generally, "M" should be entered here. Other component types may also be relevant for

material management.

I

Info component

Info components make it possible to be shown in the component list without having to

post them.

T

Carrier material (RF)

A

Z

A maximum of one input batch may be logged into the machine as carrier material (T) or

additional material (Z) at any one time.

Scrap/waste material (RF)

Additional material as an alternative for carriers (RF).

A maximum of one input batch may be logged into the machine as carrier material (T) or

additional material (Z) at any one time.

Consumption type

The following options are available to enter material components. How the separate options and their

application are defined depends, among other things, on which of the MES components / areas are

used.

K = None

This option defines that no consumption is recorded for the material component. If this is the case,

the material component will merely be displayed.

It is imperative that the info components (see above: component type) are set to this option.

L = Retrograde/ with batch reference (MPL/TRT, MPL-RF)

BDE-BAA_81.docx

Version: 1.0.18468

Page 94 of 98

Editing of Orders/Work Plans (MOC)

Choosing this option sets the system so the material component is logged in and out as a batch. The

consumption calculation for these material components (retrograde, at input batch logout) depends

on the configuration of the material type that the material component is assigned to.

D = Discrete

This option is relevant for discrete consumption recording (AIP-DVE). This type of material

consumption recording needs to be configured especially while HYDRA is customized.

The option "L" needs to be used if Material and Production Logistic (MPL) or Tracking &

Tracing (TRT) is used.

For this component, the system calculates consumption in reverse, which means the calculation is

based on the last produced quantity and suggested in a posting dialog. Consumption is posted at the

component  level  and  the  system  generates  a  material  movement  (goods  issue  from  production),

which can be reported back to the upper-level ERP system.

Replaceable

If this identifier (=J) is set for this kind of component, you can choose to use a different material other

than what was planned. However, only material of the same material type may be used.

Alternating (subject to change)

This option causes an input batch for a batch of this material to change to an output batch. The setting

allowed for this option depends on the component type (see above):

Component type

Allowed setting options

M

T, Z

I, A

Input quantity

 or

 possible

Only

 allowed

Only

 allowed

Planned input quantity of the component per unit of the primary quantity of the operation.

Unit

Quantity unit for the input quantity

Input quantity in percent / upper tolerance limit / lower tolerance limit

Default: 0; should be modified only after consultation with MPDV.

Required quantity

The  system  computes  the  requirement  quantity  at  display  time.  The  calculation  is  based  on  the

following formula: 'Requirement quantity = input quantity * target quantity of the OP in primary quantity

unit.

Resource type

BDE-BAA_81.docx

Version: 1.0.18468

Page 95 of 98

Editing of Orders/Work Plans (MOC)

UOM Spec. mass per unit area

Spec. mass per unit area

Planned article

Backflush

Requirement quantity (PPS)

The  "requirements  quantity"  ´field  visualizes  the  total  requirements  quantity  transferred  from  the

ERP/PPS  system,  thus  the  required  quantity  of  the  component  needed  for  the  production  of  the

operation quantity.

Consumption (total)

The  "consumption  (total)"  column  shows  the  total  consumption  that  has  been  posted  onto  the

respective component. In this context, it does not matter whether the component is subject to batch

management or discrete.

Upper-level component: BOM item / BOM level

Reserved.

Modified by / Modified on

Editor as well as the date and time the last modification was made.

User fields

User fields can be defined and used for each specific project.

BDE-BAA_81.docx

Version: 1.0.18468

Page 96 of 98

26  Production Resources & Tools Data Structure

Editing of Orders/Work Plans (MOC)

Each of the fields for a production resource or tool are described below. The actual sequence of the editing

dialogs may deviate from the one illustrated here.

MES order number/ MES work plan number

Combined order/operation number and/or work plan/operation number of the operation for which a

production resource is defined.

Resource type

Resource type of the production resource or tool that is to be assigned to the operation. The resource

type must be known in MES. Predefined resource types must be chosen from the selection menu.

Additional resource types can be defined when customizing the system.

For documents, the resource type to be entered must be DOC.

Resource

Enter the resource number (material number) of the production resource.

Designation

Here, you can enter a name for the production resource or tool.

Comment 1/ Comment 2

These are comment fields.

Required quantity/ unit

Resource  quantity  required  to  carry  out  the  operation.  When  planning  the  operation  in  graphic

detailed scheduling, this number of resources is entered in terms of capacities.

The quantity unit is only used as a comment.

Path

File

When identifying a document as a production resource, the local reference to the path is to be defined

in the Path Configuration.

No path must be stored for DNC resources; it is determined based on the path stored for the resource

type.

The field should be left empty for all other production resources.

When identifying a document as a production resource, the local reference to the path is to be defined

in the Path Configuration.

BDE-BAA_81.docx

Version: 1.0.18468

Page 97 of 98

Editing of Orders/Work Plans (MOC)

No file name must be stored for DNC resources; it is determined based on the path stored for the

resource type.

The field should be left empty for all other production resources.

If a new document is assigned to an operation, it must be ensured that it exists at the stated

location. No file is uploaded when a document is assigned!

Modified by/ Modified on

Editor as well as the date and time the last modification was made.

BDE-BAA_81.docx

Version: 1.0.18468

Page 98 of 98

