Manual

Editing of Orders/Work Plans
(MOC)
BDE-BAA 8.2

Version 1.0.23524

Last changed on: 06.10.2020

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

BDE-BAA_82.docx

Version: 1.0.23524

Page 2 of 100

Editing of Orders/Work Plans (MOC)

Contents

1  Übersicht Bearbeiten Aufträge / Arbeitspläne .............................................. 5

2  Order Object ................................................................................................. 6

3  Operation Object .......................................................................................... 8

4  Edit Orders ................................................................................................. 10

5  Edit Long Texts of Orders .......................................................................... 13

6  Edit Order Sequences ................................................................................ 15

7  Edit Operations .......................................................................................... 25

8  Edit Long Texts of Operations.................................................................... 37

9  Edit Notes ................................................................................................... 39

10  Edit components ........................................................................................ 41

11  Edit Production Resources and Tools ........................................................ 43

12  Edit Order Network ..................................................................................... 46

13  Work Plan - Edit Orders ............................................................................. 48

14  Work Plan - Edit Order Long Texts ............................................................ 53

15  Work Plan - Edit Order Sequences ............................................................ 55

16  Work Plan - Edit Operations ....................................................................... 57

17  Work Plan - Edit Operation Long Texts ..................................................... 59

18  Work plan - edit components ..................................................................... 61

BDE-BAA_82.docx

Version: 1.0.23524

Page 3 of 100

Editing of Orders/Work Plans (MOC)

19  Work Plan - Edit Production Resources & Tools ....................................... 63

20  Data Structure of Orders ............................................................................ 65

21  Order Long Text Data Structure ................................................................. 71

22  Data Structure of Order Sequences ........................................................... 72

23  Data Structure of Operations ..................................................................... 75

24  Operation Long Text Data Structure .......................................................... 94

25  Data Structure of Components................................................................... 95

26  Production Resources & Tools Data Structure .......................................... 99

BDE-BAA_82.docx

Version: 1.0.23524

Page 4 of 100

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

BDE-BAA_82.docx

Version: 1.0.23524

Page 5 of 100

Editing of Orders/Work Plans (MOC)

2  Order Object

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

BDE-BAA_82.docx

Version: 1.0.23524

Page 6 of 100

Editing of Orders/Work Plans (MOC)

Structure

Every order is identified by a unique ID or order number. This is either provided and administered by an

upstream system (generally ERP systems) or by the MES system itself. The object Order is structured as

follows:

Integration

The order includes n operations that are to be carried out. The order thus produces a certain material or

final product with a certain type of material.

BDE-BAA_82.docx

Version: 1.0.23524

Page 7 of 100

Editing of Orders/Work Plans (MOC)

3  Operation Object

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

If  different  machines  or  groups  are  required  for  production,  this  is  what  we  refer  to  as  multilevel

production. Therefore, multilevel production includes several machine-related operations, which normally

run one after the next. The number of operations needed for an order is not limited.

Terms  used  synonymously  for  the  term  operation  are:  procedure  or  order  sequence/maintenance

sequence (AFO). Oftentimes, the term order itself is also used synonymously.

Usage

All activities that a person carries out on a machine/work station are order and/or operation related. The

posting of the order and operation answers the question what is being done and/or what activity is being

carried out.

BDE-BAA_82.docx

Version: 1.0.23524

Page 8 of 100

Editing of Orders/Work Plans (MOC)

Structure

Each  operation  can  be  identified  by  the  relevant  combination  of  the  unique  order  number  and  the

sequence  and  operation  number.  This  is  either  provided  and  administered  by  an  upstream  system

(generally ERP system) or by the MES system itself. The object "operation" is subordinate to the object

"order" and "sequence" and is structured as follows:

Please note: the object order sequence is only used if specifically requested.

Integration

The operation outputs a material with a specific material type. The operation also includes as additional

information the bill of materials or rather the component list showing the materials that are needed or that

are relevant in manufacturing the article. The same applies to the range of different production resources

(e.g. tools) itemized in the production resources and tools list.

BDE-BAA_82.docx

Version: 1.0.23524

Page 9 of 100

Editing of Orders/Work Plans (MOC)

4  Edit Orders

Overview

HYDRA menu

Order Management  Order management  Edit orders

FEDRA menu

Detailed Scheduling Order management  Edit orders

Transaction code

edor

Function authorization

edor

Available user fields

Where

Table

Object type/user field key

Source (type)

AUNR/SYSTEM

Order (MF-D)

How to configure user fields?

Which user field types are available?

Purpose

This document provides a description of how orders can be created and edited on the client.

Integration

Typical applications that require orders to be edited include:

  Creating overhead costs orders

  Creating orders if no ERP system is available

  Correcting order inventory data

This document also describes the order structure, i.e. the fields relating to the order header.

Requirements

The following configurations must exist

-  Order types

Selection criteria

The application provides the following selection criteria:

Order

This selection criterion refers to the order number. The application shows the selected order. You

can also enter wildcards.

BDE-BAA_82.docx

Version: 1.0.23524

Page 10 of 100

Editing of Orders/Work Plans (MOC)

Order type

This  selection  criterion  references  the  order  type.  All  orders  with  the  selected  order  type  are

displayed.

Article

This selection criterion references the article in the order header. The application shows all orders

that include the selected article. You can also use wildcards.

Sales order

This selection criterion relates to the sales order defined in the order header. The application shows

all orders assigned to the selected sales order. You can also use wildcards.

Project number

This  selection  criterion  refers  to  the  project  number  defined  in  the  order  header.  The  application

shows all orders of the selected project number. You can also use wildcards.

Planned order

This  selection  criterion  refers  to  the  planned  order  stored  in  the  order  header.  The  application

shows all orders of the selected planned order. You can also use wildcards.

Customer name

This selection criterion refers to the customer name (designation) defined in the order header. The

application shows all orders of the selected customer name. You can also use wildcards.

Checking the responsibility area

During the selection, the responsibility area defined for the order is checked.

Field descriptions

The separate fields in the order header are described  here. The sequence described there may deviate

from the sequence in the editing dialogs.

Toolbar

   Generate order

Function authorization: or.generate

Starting the "generate order" dialog

Note: If you generate an order using this function, the work plan determination function is used. To

generate an order from a specific work plan, please use the "generate order" function in the Work

plan - Edit orders application.

BDE-BAA_82.docx

Version: 1.0.23524

Page 11 of 100

Editing of Orders/Work Plans (MOC)

   Edit long texts of orders

Function authorization: edortx

Calling the application: Edit long texts of orders

  Edit order sequences

Function authorization: edseq

Calling the application Edit order sequences

  Edit operations

Function authorization: edop

Calling the application Edit operations

  Order information

Function authorization: orin

Calling the application Order information

  Order overview

Function authorization: orov

Calling the application Order overview

BDE-BAA_82.docx

Version: 1.0.23524

Page 12 of 100

Editing of Orders/Work Plans (MOC)

5  Edit Long Texts of Orders

Overview

HYDRA menu

FEDRA menu

Order management  Order management  Edit long texts of orders

Detailed Scheduling  Order management  Edit long texts of orders

Transaction code

edortx

Function authorization

edortx

Purpose

By  applying  the  function  “edit  long  texts  of  orders”,  order-related  additional  texts  can  be  displayed  or

edited. You use this function if:

  You  would  like  long  texts  belonging  to  the  order  header  to  be  visible  and  available  in  the

administrative client while processing the order.

  You are using the MES Development Suite Label Designer component and the data you entered

is to be printed on labels.

Keep in mind that for each order you use a maximum of one long text.

Integration

Long  texts  can  also  be  transferred  via  the  info  interface  (record  type  "AI").  Additional  information  about

the interface can be found in the respective interface document.

Only long texts relating to the operation are displayed at the terminal.

Requirements

The corresponding order must already be defined.

Long texts included in the online data area may generally be edited, i.e. irrespective of the order status

(added, modified or deleted).

Selection criteria

The application provides the following selection criteria:

Order

The long text for a specific order can be selected by entering the order number.

BDE-BAA_82.docx

Version: 1.0.23524

Page 13 of 100

Editing of Orders/Work Plans (MOC)

Field descriptions

The fields for long texts of orders are described here

Editing functions

To create a new operation or to edit one, you use the icons provided.

The  long  text  entry  function,  which  for  the  most  part  is  equivalent  to  the  functions  of  a  text  editor

(highlighting of text passages; deleting or inserting of lines of text, as well as the merging of lines of text;

copying  with  the  key  combination  Ctrl+C,  cutting  with  the  key  combination  Ctrl+X,  and  pasting  with  the

key combination  Ctrl+V).  Lines may  have more than  80 characters when entered. When a document is

saved, however, the system inserts a hard line break after the 80th character.

Toolbar

 Edit orders

Function authorization: edor

For the currently selected data record, this will call the application Edit orders.

BDE-BAA_82.docx

Version: 1.0.23524

Page 14 of 100

Editing of Orders/Work Plans (MOC)

6  Edit Order Sequences

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

BDE-BAA_82.docx

Version: 1.0.23524

Page 15 of 100

01000200030004000500

Editing of Orders/Work Plans (MOC)

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

BDE-BAA_82.docx

Version: 1.0.23524

Page 16 of 100

0100020003000400050002100220

Example 2:

Editing of Orders/Work Plans (MOC)

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

BDE-BAA_82.docx

Version: 1.0.23524

Page 17 of 100

01000200030004000500031003200100020003000400050003100320

You can activate an alternative sequence on the client if specific conditions are fulfilled:

Editing of Orders/Work Plans (MOC)

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

BDE-BAA_82.docx

Version: 1.0.23524

Page 18 of 100

010002000300040005000210021001000200030004000500031002100220

Editing of Orders/Work Plans (MOC)

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

BDE-BAA_82.docx

Version: 1.0.23524

Page 19 of 100

Editing of Orders/Work Plans (MOC)

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

BDE-BAA_82.docx

Version: 1.0.23524

Page 20 of 100

Editing of Orders/Work Plans (MOC)

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

BDE-BAA_82.docx

Version: 1.0.23524

Page 21 of 100

Editing of Orders/Work Plans (MOC)

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

BDE-BAA_82.docx

Version: 1.0.23524

Page 22 of 100

Editing of Orders/Work Plans (MOC)

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

BDE-BAA_82.docx

Version: 1.0.23524

Page 23 of 100

Editing of Orders/Work Plans (MOC)

Toolbar

 Activate

Activate an alternative sequence

 Deactivate

Deactivate an alternative sequence

 Edit orders

Calls the application Edit orders.

BDE-BAA_82.docx

Version: 1.0.23524

Page 24 of 100

Editing of Orders/Work Plans (MOC)

7  Edit Operations

Overview

HYDRA menu

FEDRA menu

Order management  Order management  Edit operations

Detailed Scheduling  Order management  Edit operations

Transaction code

edop

Function authorization

edop

Purpose

The  term  process,  work  step  or  operation  describes  a  workflow  that  is  designed  to  perform  a  task  in  a

work system. During this workflow one quantity unit of an order is produced.

You use this function to add new operations to an order or to edit data in existing operations.

Integration

Operations are planned in planning functions and optionally posted on shop floor terminals; their purpose

is to facilitate status tracking and to record quantities and activities, which are usually uploaded to higher-

level systems.

Requirements

The following requirements must be met when adding a new operation:

  The higher-level order must already have been created.



If  you  use  order  sequences  (project-specific;  depending  on  the  license),  the  sequence  of  the

operation must already exist.

  The workplace/machine or group where you want to plan the operation has already been created

in the system.

The authorization for the responsibility area is assigned to you and you are authorized to display the data.

Selection criteria

The application provides the following selection criteria:

BDE-BAA_82.docx

Version: 1.0.23524

Page 25 of 100

Order

Enter the order number of the order that includes the operations you want to display. You can also use

Editing of Orders/Work Plans (MOC)

wildcards.

Operation

You can optionally enter the operation number of the operation that you want to display or edit. You can

also use wildcards.

Sequence

If  your  system  is  set  up  to  use  sequences  (depending  on  the  license),  you  can  enter  the  sequence

number here. The system then selects the operations assigned to the sequence number entered. If your

system is not set up for sequences, leave this field empty.

Show split OPs

If you use the function to split operations (requires license), you can use this option to define whether you

want to display the split-master-operations only or also the included split operations.

Checking the responsibility area

During the selection, the responsibility area defined for the operation is checked.

Field descriptions

The fields of the operation are described here.

Only selected data is available in the table:

o  Order

o  Sequence

o  Operation

o  Split

o  Processing code

o  Locked

o  Fixed

o  Group

o  Workplace

BDE-BAA_82.docx

Version: 1.0.23524

Page 26 of 100

Editing of Orders/Work Plans (MOC)

o  Control

Editing functions

To create or edit operations, use the buttons provided.

If a responsibility area is stored for the order, the editing of data is only possible if the options to display,

insert, modify and delete are enabled in the configuration of the responsibility areas or profiles.

Toolbar

   Edit orders

Function authorization: edor.*

Calls the application Edit orders for the selected order.

  Edit order sequences

Function authorization: edseq.*

Calls the application Edit order sequences for the selected order.

  Edit long texts of operations

Function authorization: edoptx.*

Calls the application Edit long texts of operations.

  Edit components

Function authorization: edopcomp.*

Calls the application Edit components.

  Edit production resources and tools

Function authorization: edopres.*

Calls the application Edit production resources and tools.

  Order information

Function authorization: orin

Calls the application Order information for the selected order.

   Change operation status

Function authorization: op.statchg

BDE-BAA_82.docx

Version: 1.0.23524

Page 27 of 100

Editing of Orders/Work Plans (MOC)

Function to change the operation status.

     Lock

Function authorization: op.lock

Use the button Lock operation to lock one or several selected operations.

      Unlock

Function authorization: op.unlock

The button Unlock operation unlocks one or several selected operations.

   Split operation

Function authorization: op.split

Calls the function to split the operation. For further information, refer to the relevant documentation.

   Dissolve split OP

Function authorization: op.splitdissolve

Undoes the operation split. For further information, refer to the relevant documentation.

Adding an operation

Transferring order header data

The following data is transferred from the order header in the operation when a new operation is created:

  Order type

  Base quantity unit

  Article if the article number is not explicitly defined for the operation.

  Article designation if the article designation is not explicitly defined for the operation.

  Material type if it is not explicitly defined for the operation.

  Customer name

  Priority, if the priority control is set to order-related for the order type..

BDE-BAA_82.docx

Version: 1.0.23524

Page 28 of 100

Editing of Orders/Work Plans (MOC)

Any priority that may have been entered will be ignored!

Transferring default data

Default  data  is  taken  from a  template  or  from  the  processing  code,  if  one  exists,  and  transferred  to  the

operation when an operation is created. The data is transferred in the following order:

  Values are transferred from the template (if available).



If you add a new operation (manually or via interface), all values are transferred

that  can  be  edited  in  the  template  and  that  are  not  entered  manually  (explicitly)  or

transferred via interface .

  Values  are transferred from the  processing  code  (if  one exists);  doing  so  will  overwrite

any values set in the template. The following values are transferred from the processing

code to the operation:

  Underdelivery

  Reaction to underdelivery

  Overdelivery

  Reaction to overdelivery

  External processing

  Recordable

  Can be logged on several times

  Can be split

  Serial number obligation

  Batch management requirement

  Target quantity update*

  Sequencing list*  is no longer evaluated for display in the sequencing list; instead, the system

directly accesses the separate configuration tables.

Note:  Values  marked  with  *  are  not  displayed  for  the  operation  and  therefore  they  also  cannot  be

changed.

BDE-BAA_82.docx

Version: 1.0.23524

Page 29 of 100

Editing of Orders/Work Plans (MOC)

  Transfer  of  the  values  transmitted  explicitly  (either  entered manually  or  transmitted  via

PPS  interface);  any  values  that  were  previously  transferred  from  the  template  or  the

processing code will be ignored and overwritten.

Target quantity comparison

If the target quantity comparison is enabled for the preceding operation, then any target quantity  that  is

entered  is  ignored  and  instead  the  target  quantity  of  the  preceding  OP  is  used  when  you  add  an

operation.

Identifying the transport time

To identify the transport time between two operations, you can store a transport matrix  . This is part of a

HYDRA customization. This transport time is then integrated during lead time scheduling.

When  a  new  order  or  operation  is  created,  the  transport  time  is  calculated  using  this  matrix  and  then

transferred to the operation. If you change the transport matrix later on, this will have no effect on already

existing operations.

If  a  transport  time  is  configured  greater  than  zero  in  the  ERP  system  and  if  operations  are  then

transferred, these transport times are transferred to the database. Otherwise, the time is calculated using

the transport matrix.

You  need  not  use  master  data,  you  can  also  explicitly  change  the  values  for  the  operation.  Note:  any

values changed explicitly are overwritten when you re-plan an operation to another machine group.

Setting the planned start data (used in the sequencing list on the terminal)

When  a  new  data  record  is  added,  the  system  tries  to  identify  planned  start  dates  and  to  use  them  as

default values for the sorting of the sequencing list. This process is based on the following logic:



It is checked whether or not the planned start date and the planned start time are empty.

o

If yes:

  The earliest start date (date) is used as planned start date.

  The earliest start date (time) is used as planned start time.



It is checked whether or not the planned end date and the planned end time are empty:

o

If yes:

  The latest end date (date) is used as planned end date.

  The latest end date (time) is used as planned end time.

  For  the  sorting  of  the  sequencing  list,  the  planned  start  date  and  the  planned  start  time  are

entered in separate fields that cannot be changed.

The  used  date  fields,  the  corresponding  BAPI  acronyms  and  database  fields  can  be  found  in  the

document dealing with the technical background information on the sequencing list.

BDE-BAA_82.docx

Version: 1.0.23524

Page 30 of 100

Editing of Orders/Work Plans (MOC)

Editing an operation

If you edit an operation, the default data (if available) is taken from the template or from the processing

code and transferred to the operation in the following order.



If you change the planned group or if you change the workplace and the new workplace

is  included  in  a  different  group,  then  the  system  transfers  the  following  values  (if

available) from the template:

  Waiting time formula

  Setup time formula

  Processing time formula



Inspection time formula (only for information purposes).

  Teardown time formula

  Target cycle formula

  Formula for the remaining run time

  Formula for the second remaining run time

  Max. synchronization time

  Default value key



If  the  planned  group  was  changed,  the  system  will  also  update  the  value  plan_werk

(internally managed in the order backlog) in which the company for the modified Group

is identified and transferred.



If the processing code was changed for the operation, the values of the processing code

are transferred (see above).

  The  final  step  involves  the  transfer  of  the  values  transmitted  explicitly  (either  entered

manually  or  transmitted  via  ERP  interface);  this  will  ignore/overwrite  any  values  that

were previously transferred from the template or the processing code.

If the group of an operation is changed, the transport time is recalculated. The transport time stored in the

transport matrix is then used. Any transport time defined for the preceding OP will be ignored/discarded.

BDE-BAA_82.docx

Version: 1.0.23524

Page 31 of 100

Editing of Orders/Work Plans (MOC)

If  you  change  the  target  quantity  (P),  the  target  quantity  is  only  converted

automatically  to  the  other  quantity  units  if  the  fields  have  been  emptied  manually

beforehand.

Transferring order header data

If you change an operation, only the values below are transferred from the order header to the operations:

  Priority, if the priority control is set to order-related for the order type..

Any priority that may have been entered will be ignored!

  Customer name

The base quantity unit is not changed, because it is very  unlikely that a change of this kind  would ever

happen in reality. The material type is not modified, because in MPL it may vary from one OP to the next

OP.

General checks run when an operation is saved

Checking the existence of workplace or group

If  a  workplace  was  entered,  then  the  system  checks  whether  the  workplace  exists.  If  yes,  the

workplace  group  of  the  workplace  is  transferred  to  the  operation.  In  any  other  case,  the  saving

process is interrupted with an error message.

If  no  workplace  was  defined,  but  instead  only  a  group,  then  the  system  checks  the  validity  of  the

group that was entered. This means: it checks if the group exists in the system. If no, the change is

rejected and an error message is issued.

Checking priority management

If priority management was activated for the order type as part of the customizing process using the

identifier  with  the  same  name  ADE_AUFTRAGSARTEN.PRIO_STEUERUNG[2,2]    and  if  the

priority  control  was  configured  as  order-relatedPRIO_STEUERUNG[1,1]  =  'U'  ,  then  the  system

checks whether the defined priority is permitted when a new order is created manually or  an order

is changed. If the maximum number is violated, the action will be rejected.

If the order is transferred from the ERP interface and the maximum number is exceeded, the order

is  not  be  refused  as  a  result  of  this  validation  check.  In  this  case,  however,  the  priority  is

automatically set to 1.

Ability to modify an operation

By default, the following operations cannot be modified:

  OPs that are currently logged on (status with control indicator L) and

BDE-BAA_82.docx

Version: 1.0.23524

Page 32 of 100

Editing of Orders/Work Plans (MOC)

  OPs that are automatically interrupted (status with control indicator F).

Checking the formula values transferred

As of b_anr.dll version 8.1.1.359.

If  you  add  or  change  an  operation,  the  system  checks  the  values  passed  in  the  formula  fields  (if

specified).  The  system  checks  if  the  values  are  available  in  the  formula  management.  The

validation check is performed for the following formula fields:

-  Setup time formula (BAPI identification ANR.RUEZ:EXPR)

-  Processing time formula (BAPI identification ANR.BEARBZ:EXPR)

-

Inspection time formula (BAPI identification ANR.PZ:EXPR)

-  Teardown time formula (BAPI identification ANR.ABRZ:EXPR)

-  RRT1 formula (BAPI identification ANR.RLZ:EXPR)

-  RRT2 formula (BAPI identification ANR.RLZ2:EXPR)

-  Waiting time formula (BAPI identification ANR.WARTZ:EXPR)

-  Target cycle formula (BAPI identification ANR.SZY:EXPR)

In addition to the formula fields, the following BAPI identifications are also checked:

-  ANR.TE.EXPR

-  ANR.TR.EXPR

-  ANR.TEB.EXPR

-  ANR.TRB.EXPR

If  at  least  one  of  the  values  entered  is  not  available  in  the  formula  management,  the  request  is

rejected and an error message is issued (return code 901).

You can deactivate the validation check using the following entry in the INI configuration:

Parameter name

INI name

Section

Key

Value

Active

Comment

Value

BDE

ANR_BAPI

CHECK_FORMULAS

N  Nein / No (check is disabled)

Yes

(optional)

BDE-BAA_82.docx

Version: 1.0.23524

Page 33 of 100

Editing of Orders/Work Plans (MOC)

Setting the planned start data (used in the sequencing list on the terminal)

When an existing data record is changed, the system tries to identify planned start dates, to update them

and to use them as default values for the sorting of the sequencing list. The basic logic depends on the

planning function configuration in the master record of the operation’s workplace:

  Planning function “N“ – no planning

o

It is checked whether or not the planned start date and the planned start time are empty.



If yes:

  The earliest start date (date) is used as planned start date.

  The earliest start date (time) is used as planned start time.

o

It is checked whether or not the planned end date and the planned end time are empty:



If yes:

  The latest end date (date) is used as planned end date.

  The latest end date (time) is used as planned end time.

o  For the sorting of the sequencing list, the planned start date and the planned start time

are entered in separate fields that cannot be changed.

  Planning function “P“ / “H“ / “T“ / “A“:

o

If the planned start date was changed, the planned start date and the planned start time

are entered in separate fields that cannot be changed.

If  no  workplace  is  defined  for  the  operation,  an  identical  processing  is  performed  as  with

planning function "N".

The  used  date  fields,  the  corresponding  BAPI  acronyms  and  database  fields  can  be  found  in  the

document dealing with the technical background information on the sequencing list.

Deleting operations

When an operation is deleted, the following points must be considered:

  By default, you can only delete an operation if the operation is not logged on, i.e. the operation is not

in status "running" and not in status "automatically interrupted".

  You  cannot  delete  a  split  operation.    To  delete  a  split  operation,  you  must  dissolve  the  operation

using the relevant split functionality.



If a split master is deleted, the split OPs are also deleted.

  You cannot delete a merged operation. You must dissolve it.



If you manually delete the last operation of an order on the client, the order header is not deleted. It

must be deleted explicitly.

BDE-BAA_82.docx

Version: 1.0.23524

Page 34 of 100

Editing of Orders/Work Plans (MOC)

By  default,  deleting  an  operation  means  that  an  item  is  physically  deleted  from  the  database.  The

following data is deleted:

  Backlog of orders

  Order status

  Assigned material components

  Assigned production resources and tools

  Assigned long texts

  Resource allocation for this operation in the shop floor scheduling (HLS)

The log data (Tabelle ade_protokoll) is not automatically deleted if an operation is deleted. The log data is

transferred  to  the  long-term  table  or  deleted  from  the  database  in  the  course  of  the  cyclic

archiving/deletion runs.

Deleting orders via delete action "D" if last OP is deleted

As of b_anr.dll version 8.1.1.358.

If  you  "delete"  the  order  header  via  MLE  interface  (PPS=J),  only  physically  deleted  operations  are

integrated.  For  operations  that  were  only  deleted  logically  (using  delete  action=D),  no  processing  is

available.

Use the following entry in the INI configuration to integrate also operations that were only logically deleted

(delete action=D):

Parameter name

INI name

Section

Key

Value

Active

Comment

HYDRA: as of service pack >13

FEDRA: as of version 1.1

Value

BDE

ANR_BAPI

ORDER_BAPI_DELETE_WITH_DELETE_ACTION_D

J  Ja / Yes:

Yes

Delete Order when OP in status D

This processing is activated by default for new systems. You can deactivate this processing, if required.

The processing is not automatically activated with subsequent updates.

BDE-BAA_82.docx

Version: 1.0.23524

Page 35 of 100

Editing of Orders/Work Plans (MOC)

BDE-BAA_82.docx

Version: 1.0.23524

Page 36 of 100

Editing of Orders/Work Plans (MOC)

8  Edit Long Texts of Operations

Overview

HYDRA menu

Order management  Order management  Edit long texts of operations

FEDRA menu

Detailed Scheduling  Order management  Edit long texts of operations

Transaction code

edtx

Function authorization

edoptx

Purpose

You can use the function Edit long texts of operations to display or edit operation-related additional. What

should be considered in this regard is that only a maximum of one long text can be recorded/ assigned to

an operation at any one time.

Operation-related long texts can be displayed on the terminal.

Long texts can also be transferred via the interface EIS-EZI (extension additional informations from ERP)

(record  type  "AI").  Additional  information  about  the  interface  can  be  found  in  the  respective  interface

document.

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

BDE-BAA_82.docx

Version: 1.0.23524

Page 37 of 100

Editing of Orders/Work Plans (MOC)

Short Text

20-digit short text that is displayed in the table view. This is a mandatory field.

Long Text

The order's long text.

The  long  text  entry  function,  which  for  the  most  part is  equivalent  to  the  functions  of  a  text  editor

(highlighting of text passages; deleting or inserting of lines of text, as well as the merging of lines of

text; copying with the key combination Ctrl+C, cutting with the key combination Ctrl+X, and pasting

with the key combination Ctrl+V). Lines may have more than 80 characters when entered. When a

document is saved, however, the system inserts a hard line break after the 80th character.

Toolbar

 Edit operations

Calling up the application: Edit operations

BDE-BAA_82.docx

Version: 1.0.23524

Page 38 of 100

Editing of Orders/Work Plans (MOC)

9  Edit Notes

Overview

HYDRA menu

Order management  Order management  Edit notes

FEDRA menu

Detailed Scheduling  Order management  Edit notes

Transaction code

ednotes

Function authorization

edopnote

Purpose

You can use the function Edit notes to edit operation notes.

Requirements

The corresponding operation must have been created in the system.

You  can  generally  edit  notes  included  in  the  online  data  area,  i.e.  irrespective  of  the  operation  status

(added, modified or deleted).

Selection criteria

The application provides the following selection criteria:

MES order number

Combined order/ operation number.

Please note that the components are assigned by specific operations. This is why the entire key must be

entered.  By  entering  the  order  number  followed  by  *,  the  system  will  list  all  components  for  an  entire

order.

Field descriptions

MES order number

Combined order/ operation number.

Short Text

Short text of the note

Long Text

Long text of the note

BDE-BAA_82.docx

Version: 1.0.23524

Page 39 of 100

Editing of Orders/Work Plans (MOC)

Display on terminal

Specifies whether or not this operation note is shown on the terminal.

Toolbar

 Edit operations

Calls the application Edit operations.

BDE-BAA_82.docx

Version: 1.0.23524

Page 40 of 100

Editing of Orders/Work Plans (MOC)

10  Edit components

Overview

HYDRA menu

Order management  Order management  Edit components

FEDRA menu

Detailed Scheduling  Order management  Edit components

Transaction code

edcomp

Function authorization

edopcomp

Available user fields

Where?

Object type/user field key

Source (type)

Tab User fields

MATLIST/depending on data record  Material component (MF-D)

Table

MATLIST/SYSTEM

Material component (MF-D)

How to configure user fields?

Which user field types are available?

Purpose

Materials,  which  are  required  to  produce  an  article,  are  assigned  to  an  operation  as  (material)

components. You can use the application Edit components to display or edit the material components of

an operation.

Normally, the components are transferred to the system from the higher-level ERP system via interface,

because the components are already defined in the ERP work plan.

Requirements

The relevant operation must have been created.

Selection criteria

The application provides the following selection criteria:

MES order number

Combined order/operation number.

Note: the components are assigned for a specific operation. For this reason, you must enter

the entire key. To list all components of an order, enter the order number followed by *.

Field descriptions

The fields provided for a component are described here.

BDE-BAA_82.docx

Version: 1.0.23524

Page 41 of 100

Editing of Orders/Work Plans (MOC)

Toolbar

To create or edit a component, use the buttons Insert or Edit.

Note: when using the MPL, the BOM item must be unique for an operation.

 Edit operations

Calls the application Edit operations.

 Edit orders

Calls the application Edit orders.

 Order information

Calls the application  Order information.

BDE-BAA_82.docx

Version: 1.0.23524

Page 42 of 100

Editing of Orders/Work Plans (MOC)

11  Edit Production Resources and Tools

Overview

HYDRA menu

FEDRA menu

Order management  Order management  Edit production resources and
tools

Detailed Scheduling  Order management  Edit production resources and
tools

Transaction code

edres

Function authorization

edres

Purpose

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

entered.  By  entering  the  order  number  followed  by  *,  the  system  will  list  all  components  for  an  entire

order.

Field descriptions

Order/ operation

Enter  the  order/  operation  number  for  the  operation  that  is  to  be  assigned  to  the  production

resource or tool here.

BDE-BAA_82.docx

Version: 1.0.23524

Page 43 of 100

Editing of Orders/Work Plans (MOC)

Resource type

Resource  type  of  the  production  resource  or  tool  that  is  to  be  assigned  to  the  operation.  The

resource type must be known in the system. Predefined resource types must be chosen from the

selection  menu.  Additional  resource  types  can  be  defined  when  customizing  HYDRA.  For

documents, the resource type to be entered here must be DOC.

Resource

Enter the resource number (material number) of the production resource or tool.

Designation

Here, you can enter a name for the production resource.

Comment 1/ C\comment 2

These are comment fields.

Required quantity/ unit

Resource  quantity  required  to  carry  out  the  operation.  When  planning  the  operation  in  the  shop

floor scheduling, this number of resources is entered in terms of capacities. The quantity unit is only

used as a comment.

Please note: In the shop floor scheduling, the quantity 0 is interpreted implicitly as quantity 1.

When  identifying  a  document  as  a  production  resource,  the  logical  reference  to  the  path  is  to  be

defined  in  the  path  configuration  (menu:  File  >  System  administration  >  Paths).  No  path  must  be

stored for DNC resources; it is determined based on the path stored for the resource type. The field

should be left empty for all other production resources (only applies when using HYDRA).

Path

File

When identifying a document as a production resource, the file name (including file extension) is to

be entered here.

No file name must be stored for DNC resources; it is determined based on the file name defined for

the  resource.  The  field  should  be  left  empty  for  all  other  production  resources(only  applies  when

using HYDRA).

Modified by/ date/ time

Editor as well as the date and time the last change was made.

BDE-BAA_82.docx

Version: 1.0.23524

Page 44 of 100

Editing of Orders/Work Plans (MOC)

Please note with regard to documents: If a new document is assigned to an operation a file is

only uploaded automatically, in case a file has been selected using the file selection dialog. The

file selection dialog can be opened by the button next to the “file name” field.

In this case, the path of the file that is loaded onto the server is displayed below the input field

for the file name. The upload is performed automatically while saving.

No file can be uploaded if the file name is entered manually.

The corresponding data record is created anyway even if an error occurs during the upload.

Toolbar

 Edit operations

Calls the application Edit operations.

 Edit orders

Calls the application Edit orders.

 Order information

Calls the application Order information.

BDE-BAA_82.docx

Version: 1.0.23524

Page 45 of 100

Editing of Orders/Work Plans (MOC)

12  Edit Order Network

Summary

HYDRA Menu

Order Management  Order management  Edit order network

FEDRA menu

Advanced Process Modeling  Edit  Edit order network

Transaction code

ednet

Function authorization

ednet

Usage

You  use  this  application  to  create  dependencies  for  orders  beyond  the  existing  operation  sequence.

These dependencies are referred to as relationships.

Keep  in mind that only the end-start relationships can be created. These  are relevant for both planning

and for data entry. Enter the MES order number (combined order/ OP number) during data entry.

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

BDE-BAA_82.docx

Version: 1.0.23524

Page 46 of 100

Editing of Orders/Work Plans (MOC)

Field descriptions

Predecessor

Order number of the preceding operation

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

BDE-BAA_82.docx

Version: 1.0.23524

Page 47 of 100

Editing of Orders/Work Plans (MOC)

13  Work Plan - Edit Orders

Overview

HYDRA menu

Order management  Routing management  Work plan - edit orders

FEDRA menu

Detailed Scheduling  Order management  Work plan - edit orders

Transaction code

edwor

Function authorization

edwor

Available user fields

Where

Table

Object type/user field key

Source (type)

AUNR/SYSTEM

Work plan - order (MF-D)

How to configure user fields?

Which user field types are available?

The "Work plan - edit orders" application provides the user with a comfortable option to create or change

work plans and to generate orders from work plans. A work plan is a kind of "empty envelope" for orders

and is used to generate real orders.

Selection criteria

The application provides the following selection criteria:

Work plan

You can select a specific work plan if you directly enter the work plan number.

Order type

Use the combo boxes to select work plans of specific order types. You can check several options.

Article

Use the article field to search for work plans for a specific article. You can also use wildcards.

Sales order, project number, planned order

Using  these  fields,  you  can  search  by  inventory  data  of  the  order  header.  You  can  also  use

wildcards.

Customer name

If  work  plans  have  been  created  for  separate  customers,  you  can  search  by  the  "customer

designation". You can also use wildcards.

Field descriptions

Order header fields are described here

BDE-BAA_82.docx

Version: 1.0.23524

Page 48 of 100

Editing of Orders/Work Plans (MOC)

Notes

  Only selected data is available in the table:

o  Work plan

o  Order type

o  Article

o  Article designation

o  Target quantity (B)

o  Target scrap (B)

o  Unit (B)

o  Customer name

o  Sales order

o  Planned order

o  Project number

  The below-mentioned values cannot be edited in the work plan order:

o  Basic start date

o  Basic end date

o  Scheduled start time

o  Scheduled end time

Editing functions

Please use the available buttons to create or edit work plan orders.

If a responsibility area is stored for the order, the editing of data is only possible if the options to display,

insert, modify and delete are enabled in the configuration of the responsibility areas or profiles.

BDE-BAA_82.docx

Version: 1.0.23524

Page 49 of 100

Editing of Orders/Work Plans (MOC)

Toolbar

 Generate order

Function authorization: or.generate

You can generate an order from the currently selected work plan by calling this function. For further

information on this, please refer to the section Generate order.

 Edit long texts of orders

Function authorization: edwortx

Calls the application Work plan - edit long texts of orders.

 Edit order sequences

Function authorization: edwseq

Calls the application Work plan - edit order sequences.

 Edit operations

Function authorization: edwop

Calls the application Work plan - Edit operations.

Generate order

Please proceed as follows to generate an order from the work plan:

  Select the work plan, from which you want to generate an order, from the table.

  Open the function using the button

. The "generate order" dialog opens.



In the "order" field, enter the order number for the order that is generated. The field can  be  left

empty if numbers are assigned automatically for the order type (customization).



In  the  dialog,  the  input  fields  are  populated  with  the  work  plan  data.  If  required,  change  or  add

field values.

  Confirm the dialog by clicking

.

An  order  is  now  generated  from  the  work  plan.  By  default,  the  application  "Edit  orders"  opens  with  the

new order that you have just generated.

BDE-BAA_82.docx

Version: 1.0.23524

Page 50 of 100

Editing of Orders/Work Plans (MOC)

Note: The Edit orders application is opened in a separate window with each order that is generated. It is

therefore recommended to close the application before generating a new order.

If  you  want  to  suppress  that  the  application  Edit  orders  opens,  you  can  configure  this  via  INI

configuration/INI data configuration. When the order is successfully generated, a popup informs that the

"order xxxx has been successfully generated". Confirm by clicking OK.

Menu: System administration  System settings  INI configuration / INI data configuration

Name:

BDE

MOC user:

0

Comment:

Settings for  Shop Floor Data Collection

Section:

EDWOR

Key:

GENERATE_ORDER

Value:

SUPPRESS_EDOR

Active:

Comment:

Suppress automatic call of application "edit orders"

Notes

  The  order  cannot  be  generated  if  a  responsibility  area  is  specified  for  which  the  user  is  not

authorized.

  The article number is transferred to the operations of the order.

  The order quantity  and the unit are  transferred to the order header as (basic) target quantity or

target unit and to all operations as basic target quantity or target unit.

  The  entered  quantity  is  transferred  1:1  as  primary  quantity,  if  the  primary  quantity  unit  (primary

unit  of  input)  of  the  operations  is  identical  to  the  unit  that  is  specified  as  quantity  unit  above.  If

conversion factors are defined for the operation of the order or work plan to be copied, they are

used to calculate  the  primary quantity. In case, no conversion factors are  defined and the base

quantity unit and primary quantity unit are different, the system tries to convert the base quantity

into  the  primary  quantity  unit  using  an  internal  conversion  table  (system  customization).  This

procedure generally also applies for the secondary quantity and the tertiary quantity.

BDE-BAA_82.docx

Version: 1.0.23524

Page 51 of 100

Editing of Orders/Work Plans (MOC)

BDE-BAA_82.docx

Version: 1.0.23524

Page 52 of 100

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

BDE-BAA_82.docx

Version: 1.0.23524

Page 53 of 100

Editing of Orders/Work Plans (MOC)

BDE-BAA_82.docx

Version: 1.0.23524

Page 54 of 100

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

Operations  are  grouped  in  sequences  to  summarize  them  within  an  order.  Production  uses  this

information  as  an  orientation  tool  to  process  each  operation.  Within  the  sequence,  the  operations  are

processed  in  sequence  one  at  a  time.  By  linking  several  sequences  within  the  order,  network-type

structures can be illustrated

For further information on this, please refer to the document entitled "edit order sequences".

Selection criteria

The application provides the following selection criteria:

Work plan

The order sequences of a specific work plan may be selected by entering a work plan number.

Field descriptions

The fields of a sequence are described here.

Editing functions

Please  use  the  available  buttons  to  create  or  edit  work  plan  sequences.  A  copy  function  for  order

sequences is not planned.

If the "sequence" field is not shown in the editing dialog, the sequence number length is 0 in the

basic parameter settings. Please contact MPDV.

Toolbar

Edit orders

Function authorization: edwor

Opens the application work plan – edit orders for the currently selected data record.

BDE-BAA_82.docx

Version: 1.0.23524

Page 55 of 100

Editing of Orders/Work Plans (MOC)

BDE-BAA_82.docx

Version: 1.0.23524

Page 56 of 100

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

The  "work  plan  -  edit  operations"  application  provides  the  user  with  a  comfortable  option  to  create  or

change operations for work plans.

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

BDE-BAA_82.docx

Version: 1.0.23524

Page 57 of 100

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

BDE-BAA_82.docx

Version: 1.0.23524

Page 58 of 100

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

The  long  text  of  a  specific  operation  of  the  work  plan  can  be  selected  by  entering  the  MES  work

plan number. The MES work plan number is the combined work plan/operation number.

Field Descriptions

The fields of a long text pertaining to orders are described here.

Editing functions

Please use the available buttons to create or edit operation long texts of the work plan. A copy function

for operation long texts is not planned.

Toolbar

Edit operations

Function authorization: edwop

Opens the application Work plan - edit operations for the currently selected data record.

BDE-BAA_82.docx

Version: 1.0.23524

Page 59 of 100

Editing of Orders/Work Plans (MOC)

BDE-BAA_82.docx

Version: 1.0.23524

Page 60 of 100

Editing of Orders/Work Plans (MOC)

18  Work plan - edit components

Overview

HYDRA menu

FEDRA menu

Order management  Routing management
 Work plan - edit components

Detailed Scheduling  Order management
  Work plan - edit components

Transaction code

edwcomp

Function authorization

edwcomp

Available user fields

Where

Object type/user field key

Source (type)

Tab User fields

MATLIST/depending on data record  Workplace  -  material  component

Table

MATLIST/SYSTEM

(MF-D)

Workplace  -  material  component
(MF-D)

How to configure user fields?

Which user field types are available?

You  can  use  the  application  Work  plan  -  edit  components  to  display  and  edit  material  components  that

are required to produce the article in the current manufacturing level (current operation).

The  components  are  usually  transferred  via  interface  from  the  higher-level  ERP  system  to  the  system,

because the components are already defined in the ERP work plan.

Selection criteria

The application provides the following selection criteria:

MES work plan number

The  components  assigned  to  a  work  plan  operation  may  be  selected  by  entering  the  MES  work

plan number. The MES work plan number is the combined work plan/operation number.

Enter the whole MES work plan number if you want to show the components assigned to a specific

operation.

If  you  want  to  show  the  components  of  all  operations  of  a  work  plan,  only  enter  the  work  plan

number, followed by "*".

Field descriptions

The fields provided for a component are described here.

BDE-BAA_82.docx

Version: 1.0.23524

Page 61 of 100

Editing of Orders/Work Plans (MOC)

Editing functions

Please use the available buttons to create new or edit existing work plan components. A copy function for

components is not planned.

Note:  when  using  the  MPL  product  group,  the  BOM  item  must  be  unique  for  an

operation.

Toolbar

 Edit operations

Function authorization: edwop

Calls the application Work plan - Edit operations.

 Edit orders

Function authorization: edwor

Calls the application Work plan - edit orders.

BDE-BAA_82.docx

Version: 1.0.23524

Page 62 of 100

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

If  the  tool  and  resource  management  module  (HYDRA-WRM)  is  in  use,  the  first  production

resource and tool that is not of the resource type "DNC" or "MAT" is taken over into the "tool"

field of the operation. In addition, the "tool" field is checked whether it already includes a value,

when inserting a production resource and tool that is not of the "DNC" or "MAT" resource type.

If this is not the case, this component is taken over. For this reason, it is recommended to insert

BDE-BAA_82.docx

Version: 1.0.23524

Page 63 of 100

Editing of Orders/Work Plans (MOC)

the "main production resource & tool" at first in the list of production resources and tools.

Please note with regard to documents: If a new document is assigned to an operation a file is

only uploaded automatically, in case a file has been selected using the file selection dialog. The

file selection dialog can be opened by the button next to the “file name” field.

In this case, the path of the file that is loaded onto the server is displayed below the input field

for the file name. The upload is performed automatically while saving.

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

BDE-BAA_82.docx

Version: 1.0.23524

Page 64 of 100

Editing of Orders/Work Plans (MOC)

20  Data Structure of Orders

This  document  describes  each  of  the  fields  for  an  order  header.  The  actual  sequence  of  the  editing

dialogs and reports/overviews may deviate from the one illustrated here.

In  order  to  simplify  matters,  the  term  order  will  generally  be  used,  regardless  of  whether  an  order  or  a

work  plan  is  being  discussed.  Only  in  examples  in  which  it  would  make  sense  for  the  overall

understanding to differentiate between the two will we use the term work plan.

General tab

Order / work plan

The order number or rather the work plan number is an upper-level number, under which each of

the operations is compiled.

Order type

Order  types  are  issued  to  structure  the  orders  in  accordance  with  their  use.  Each  order  type

includes various control information that is decisive when managing orders.

The glossary describes the order types that are available by default in the system. You can define

additional order types when customizing the system.

Article/Item

Material number/ item number/ article numbers of the (final) article to be produced with this order. If

no  article  is  entered  for  the  operation,  the  system  transfers  the  article  included  in  this  field  to  the

operations.

Article name

Name of the article. Any changes to the article name are transferred to all operations of the order

(redundant information). You cannot edit the article name in relation to operations.

Drawing issue number

Drawing issue number of the article, also referred to as index (available as of BDE 8.2).

Customer name

Customer name

Sales order

Sales order number

Sales order item  In addition to the sales order number, you can also enter the line item number of the

sales order that this order refers to.

Priority

You can use the "priority" as a control tool for the order. The priority is a single digit, numeric value.

The value increases in ascending order ("0" = lowest priority, "9" = highest priority).

BDE-BAA_82.docx

Version: 1.0.23524

Page 65 of 100

Editing of Orders/Work Plans (MOC)

This  value  specifies  the  color  for  the  operation  bar  in  the  graphic  planning  board  (Shop  Floor

Scheduling). The colored bar graphically indicates the priority of the operation. You can assign the

colors to the priorities in the graphic planning board settings of the Shop Floor Scheduling product

group.

During the customization process, you can determine based on the order type

- whether the priority of the order header is transferred unchanged to each of the operations

- whether priority management should be enabled.

Order index

The order index can be seen as an alternative to the priority. You can integrate the order index, for

example, in sorting the graphic detailed planning (if configured accordingly).

The order index is numerical with a valid value range (-999.9 to +999.9).

Target quantity

Quantity  specification  for  the  production  order  in  base  quantity  unit.  The  indicated  target  quantity

may include a target scrap quantity that might have been entered.

Target scrap

Planned scrap quantity for the production order in base quantity unit. The indicated scrap quantity

can be considered as part of the transferred target quantity.

Unit

Quantity unit of the order for the (final) article to be produced. The unit allows you to compare, for

example, scrap from different operations. That is why, the unit is included as a base quantity unit in

each operation (redundant information).

Material type

Material type of the (final)  article to be produced. If the field  does not include a material type, the

MES inserts the value "SYSTEM" here.

Batch number

The batch number reserved for the order; is generally provided by the ERP system.

Dates tab

Basic start date

The basic start date of the order. In general, the ERP system specifies this date.

Basic end date

The basic end date of the order. In general, the ERP system specifies this date. This date is based

on  the  required  date/  delivery  date  set  in  the  ERP  system  and,  if  necessary,  also  includes  buffer

times.

BDE-BAA_82.docx

Version: 1.0.23524

Page 66 of 100

Editing of Orders/Work Plans (MOC)

Scheduled start time

Scheduled start date; result of the lead-time scheduling as compared to infinite capacities.

If the scheduling is run outside of the system, the scheduled dates in the order header should be

applied. If the scheduling is run in MES, these fields are overwritten.

Scheduled end time

Scheduled end date; result of the lead-time scheduling as compared to infinite capacities.

If the scheduling is run outside of MES, the scheduled dates in the order header should be applied.

If the scheduling is run in MES, these fields are overwritten.

Scheduling type

The scheduling type describes whether the order is scheduled forward (V) or backward (R) during

lead-time scheduling in MES. If scheduled forward, the order is scheduled based on the basic start

date  specified  in  the  ERP  system.  If  scheduled  backward,  the  order  is  scheduled  based  on  the

specified basic end date.

If no scheduling type is set in the order, the scheduling type defined in Basic Settings is used.

Reduction strategy

If it turns out during scheduling that the lead time for a given order is longer than the allotted time

available, then MES will attempt to take reduction measures to shorten the lead time accordingly.

Reducible times are the waiting times and the transport times.

The document hls-bk.doc describes in the chapter Reduction Strategies how to configure reduction

strategies. The configuration is performed as part of the customization process.

Assignment tab

Order group

If the field order group includes a value and the Priority control is enabled, the system checks the

following when you attempt to create a new order:

- how many orders do exist for this order group and the specified priority in the system

- does this new order exceed the limit defined in the MOC application Order groups. If this new

order exceeds the specified limit, the system will reject the order. If the priority control function is

enabled, you must:

- consider the order group as a mandatory field in the order and

- define a preset value range in the MOC application order groups.

Note for SAP users

The term order group corresponds to the SAP production scheduler. To ensure a consistent data

exchange  between  SAP  and  HYDRA,  you  should  synchronize  the  possible  SAP  production

schedulers with the MES order groups.

BDE-BAA_82.docx

Version: 1.0.23524

Page 67 of 100

Editing of Orders/Work Plans (MOC)

MRP controller

The  MRP  controller  for  the  order.  You  can  transfer  the  MRP  controller  from  SAP  to  the  MES  for

informational  purposes.  You  can  display  the  MRP  controller  in  the  MES.  But  the  MES  does  not

provide a predefined value range.

Project number

Project order number

Planned order

Planned order number, e.g. in serial production.

Cost object

Cost object number

Work plan

Work plan number of the work plan that served as the template for generating the production order.

Work plan version

Version number of the work plan that served as the template for generating the production order.

BOM version

Version of the bill of material assigned to the production order.

Production version

Production  version  on  which  the  order  is  based.  This  field  is  currently  only  completed  if  planned

orders are transferred via the HKMPP-REM interface.

Closed loop

ID of the closed loop / supply relationship for which a Kanban order has been generated.

Inspection order

Inspection order/ inspection batch number for the order

Sample type

Type of sample for the order

Calculation tab

The  calculation  index  tab  includes  additional  data  fields  where  calculation-related  values  or  information

can be stored. These entries are for information purposes only.

Machine costs

Calculated value for the machine costs that are incurred in the production of this order.

Labor costs

Calculated value for the labor costs that are incurred in the production of this order.

BDE-BAA_82.docx

Version: 1.0.23524

Page 68 of 100

Editing of Orders/Work Plans (MOC)

Material costs

Calculated value for the material costs that are incurred in the production of this order.

Other costs

Calculated value for other costs that are incurred in the production of this order.

Material value

Calculated value of the produced final article for each base quantity unit.

Scrap value

Calculated scrap value for each base quantity unit.

User fields tab

User fields allow you to store further customer-specific information to the MES in addition to the fields that

are available by default. The order information shows the order-related user fields. The order information

dialog  provides  the  user  fields  index  tab  for  the  order  header.  This  tab  shows  the  user  field  key,  the

defined user fields including the names and units of measure. The user fields tab includes eight sub-index

tabs,  which  each  have  eight  additional  user  fields.  The  so-called  user  field  key  determines  which  user

fields are involved and which meaning they have.

User field key

Every user field key describes a combination of user fields. The management of the user field key

(and therefore the purpose of the fields) varies from one object to the next.

User fields

The  following  user  fields  are  available  for  the  order  header  (object  type  AUNR)  after  customizing

the system:

Field ID /
index
1 - 6
7 - 22

23 -28
29 - 44
45 - 50
51 - 64
65 - 66

Field data type

Date
Numeric,
time, duration
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

User field keys are defined in coordination with the customer during the customization process.

Administration tab

The administration index tab includes technical  information on the data record. The dialogs "Insert" and

"Copy" do not provide this index tab.

BDE-BAA_82.docx

Version: 1.0.23524

Page 69 of 100

Editing of Orders/Work Plans (MOC)

Created by

User who created the order.

Created on

Time and date when the order was created.

Modified by

User who most recently changed the order header.

Modified on

Time and date when this modification was made.

Transferred by

Here, you can enter the source from where the order was transferred.

Transferred on /Transfer time

If the ERP system transfers the order (PPS=J), the system automatically sets the transfer time and

date to the time and date when the order was stored in MES.

Modified HYDRA

Specifies that the order was modified in MES. This identifier is automatically set to "J", if the order

was changed in MES.

Modified PPS

Specifies that the production order was changed in the ERP system. This identifier is automatically

set  to  "J",  if  the  production  order  was  changed  in  the  ERP  system  (PPS=J).  The  identifier  is  not

reset.

Deletion flag

Used for internal processing purposes. Cannot be modified.

Responsibility area

If a responsibility area is entered here, the user must have been authorized to view and edit orders

and/or work plan orders.

BDE-BAA_82.docx

Version: 1.0.23524

Page 70 of 100

21  Order Long Text Data Structure

Editing of Orders/Work Plans (MOC)

Each of the fields for an order long text are described below. The actual sequence of the editing dialogs

may deviate from the one illustrated here.

In  order  to  simplify  matters,  the  term  order  will  generally  be  used,  regardless  of  whether  an  order  or  a

work  plan  is  being  discussed.  Only  in  examples  in  which  it  would  make  sense  for  the  overall

understanding to differentiate between the two will we use the term work plan.

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

BDE-BAA_82.docx

Version: 1.0.23524

Page 71 of 100

22  Data Structure of Order Sequences

Editing of Orders/Work Plans (MOC)

Each  of  the  fields  for  a  sequence  is  described  below.  The  actual  sequence  of  the  editing  dialogs  may

deviate  from  the  one  illustrated  here.  Information  about  sequences  can  be  found  in  the  document  edit

sequences.

In  order  to  simplify  matters,  the  term  order  will  generally  be  used,  regardless  of  whether  an  order  or  a

work  plan  is  being  discussed.  Only  in  examples  in  which  it  would  make  sense  for  the  overall

understanding to differentiate between the two will we use the term work plan.

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

BDE-BAA_82.docx

Version: 1.0.23524

Page 72 of 100

Editing of Orders/Work Plans (MOC)

If a new alternative sequence is set up, it is set as not active.

For standard sequences and alternative sequences, this qualification is always set to active.

Orientation

If  there  are  several  parallel  sequences,  the  lead  times  generally  vary  in  length.  This  creates  time

buffers  in  the  sequences.  The  orientation  function  controls  whether  these  buffers  are  at  the

beginning or the end of the sequences. The following options are available:

F = Earliest due date

If the sequence is set for the earliest date, the buffer will be at the end of the sequence.

S = Latest due date

If the sequence is set for the latest date, the buffer will be at the beginning of the sequence.

N = Not relevant; this is the case for standard sequences and alternative sequences.

If  there  are  several  parallel  sequences  for  a  given  standard  sequence,  the  orientation  of  the

standard sequence is used for all segments of the standard sequence for which parallel sequences

exist.

Version

Change number/version; for information purposes only.

Branch operation

Operation number of a standard sequence operation,

before which a parallel sequence should branch off, or

from which on an alternative sequence should be replaced.

This is a mandatory field for parallel and alternative sequences. For a standard sequence, this field

must remain empty.

If  manually  setting  up  an  alternative  or  parallel  sequence,  the  branch  operation  of  the  standard

sequence  must  already  exist  in  the  orders  on  hand.  When  a  sequence  is  handed  over  via  an

interface, a valid order number also must be handed off (there is no plausibility check).

Return operation

Operation number of a standard sequence operation,

after which a parallel sequence should branch off, or

up to which an alternative sequence should be replaced.

This is a mandatory field for parallel and alternative sequences. For a standard sequence, this field

must remain empty.

If manually setting up an alternative or parallel sequence, the branch-off operation of the standard

sequence  must  already  exist  in  the  orders  on  hand.  When  a  sequence  is  handed  over  via  an

interface, a valid operation number also must be handed off (there is no plausibility check).

BDE-BAA_82.docx

Version: 1.0.23524

Page 73 of 100

Editing of Orders/Work Plans (MOC)

Reference sequence

The  reference  sequence  determines  the  sequence  in  the  order  that  the  reference  operations

(branch and return) refer to. This is always the standard sequence (sequence number 0).

This  is  a  mandatory  field  for  parallel  and  alternative  sequences.  The  standard  sequence  must

already exist.

For a standard sequence, this field must remain empty.

BDE-BAA_82.docx

Version: 1.0.23524

Page 74 of 100

Editing of Orders/Work Plans (MOC)

23  Data Structure of Operations



This document describes each of the fields for an operation. In this case, the index tabs specify how the

fields are structured. The actual sequence may deviate from the one illustrated here.

In  order  to  simplify  matters,  the  term  order  will  generally  be  used,  regardless  of  whether  an  order  or  a

work  plan  is  being  discussed.  Only  in  examples  in  which  it  would  make  sense  for  the  overall

understanding to differentiate between the two will we use the term work plan.

General tab

Order / work plan

The order number or rather the work plan number is an upper-level number, under which each of

the operations is compiled.

Sequence

The sequence number is the number of operation sequences in use.

OP

Split

The operation number is the number listed below the order used to identify the operation.

The split number.

OP name

Name of the operation; generally simply a short description of the activities that will be performed.

Article/Item

Part/item number of the article or material that is produced with the operation.  If you do not enter

the article, the system takes the value from the corresponding field of the order header.

Drawing issue number

Drawing issue number of the article, also referred to as index (available as of BDE 8.2).

Material type

Material  type  of  the  article  that  is  to  be  produced  in  this  particular  production  step.  If  you  do  not

enter the material type, the system takes the value from the corresponding field of the order header.

Priority

You can use the "priority" as a control tool. The priority is a single digit, numeric value. The value

increases in ascending order ("0" = lowest priority, "9" = highest priority).

Depending on the Order type, you can configure the priority to refer either to the operation or to the

order. Choosing the latter will mean that the system will take the priority of the operation from the

order header.

BDE-BAA_82.docx

Version: 1.0.23524

Page 75 of 100

Editing of Orders/Work Plans (MOC)

Planned on

This identifier indicates whether the operation is located in the group pool   or if it is planned on a

specific  workplace  /  machine  .  In  MES,  you  can  plan  operations  either  in  the  graphic  detailed

planning or via the order sequencing.

Entering or deleting the workplace later will NOT automatically change this identifier.

Planned workplace

If  you  set  the  identifier  planned  on  workplace,  this  means  that  the  operation  is  planned  for  the

workplace entered here. If the input field is empty, the operation is not planned for any workplace.

Please note:

When you log on an operation, this field automatically includes the workplace where you logged in

the operation. Doing so will overwrite any (in some cases a different) workplace for which the

operation was planned up until then. As a result, the OP is implicitly re-planned.

Group

(Planned)  station  /  machine  group   designated  for  producing  the  operation.  It  is  meant  as  a

planning criterion for group-oriented planning and in the graphic detailed planning.

If you log on an operation to a (different) workplace, its group will be updated, if necessary.

If,  due  to  logging  in  the  operation,  there  is  a  change  to  the  group  for  which  the  operation  was

planned  up  until  now,  NONE  of  the  values  is  taken  from  the  template  (this  only  happens  if

modifications are made manually via the editing function).

Fixed

This identifier specifies whether an operation is set as fixed during the planning process.

Before  running  automatic  planning,  the  capacities  (workplaces)  are  completely  released  with  the

exception  of  the  fixed  operations.  Fixed  operations  that  are  still  set  in  the  past  are  moved  to  the

right and set to "now" at the earliest plus a planning lead time. Any (fixed) operations planned for

the future remain dispatched without changes.

Material

This field includes the first resource of the type  "Material" (ID:  "MAT") available in the component

list. This is the "most important" input material.

You can use this field in planning, for example, when applying the Setup change list or

in  graphic  detailed  planning  when  planning  equipment  setup  changes.  It  is  of  no

significance to processing as part of the material and production logistics (MPL).

BDE-BAA_82.docx

Version: 1.0.23524

Page 76 of 100

Editing of Orders/Work Plans (MOC)

Color

You can enter the color of the main input material or the article planned for production here. This

field  is  used  in  planning  for  example  in  the  Setup  change  list  or  when  planning  equipment  setup

changes.

Tool

If  you  use  the  Tool  and  Resource  Management  (WRM)  product  group,  this  field  includes  the  first

resource  available  in  the  production  resource  /  component  list  that  is  not  of  the  resource  type

"DNC" or "MAT".

To  this  end,  when  a  component  is  being  entered  that  does  not  have  a  resource  type  "DNC"  or

"MAT", the system checks whether this field already includes a value. If the field does not include a

value, this component is entered. For this reason, we recommend to first input the "main production

resource" in the production resource list.

The  graphic  detailed  planning  integrates  this  field  in  order  to  identify  production

methods. However, the production resources stored in the operation are relevant when

checking capacities.

By  default,  the  field  is  of  no  relevance  for  processing  in  the  Tool  and  Resource

Management (WRM) product group.

DNC

If  you  use  the  production  facility/resource  management,  this  field  includes  the  first  resource

available in the production resource / component list that is of the resource type "DNC" (ID: "DNC").

To  this  end,  when  a  component  with  the  resource  type  "DNC"  is  entered,  the  system  checks

whether this field already includes a value. If the  field does not include a value, this component is

entered.

In  the  system,  this  field  is  mainly  used  as  a  comment.  By  default,  the  field  has  no

significance for DNC processing.

Upload number

The purpose of the confirmation/upload number is to identify an operation. This is a numeric value

used for postings as an alternative to the combined order/OP number.

Examples

  Most of the time, a bar code is hard to read if the order / OP number is long (for example

when using handheld barcode readers with a limited scanning range);



If the space available on the work document is not large enough.

Please  note:  The  length  of  the  input  field  depends  on  the  settings  made  for  "Length  of

upload/confirmation number" in the basic parameter settings. If you did not specify a length there,

the field is shown across the whole width of the application.

BDE-BAA_82.docx

Version: 1.0.23524

Page 77 of 100

Editing of Orders/Work Plans (MOC)

Leave this field blank for work plan operations.

Authorization

An  authorization  identifier  that  indicates  whether  a  user  is  authorized  to  log  on/off  the  operation.

This involves crosschecking the identifier OP postings in the HR master.

Cost type

The  cost  type  to  be  posted  when  executing  this  operation,  for  example  in  an  overhead  cost

operation / order. At the moment, this field is only used as a comment.

Cost center

The  cost  center  to  be  debited  when  executing  this  operation,  for  example  in  an  overhead  cost

operation / order. At the moment, this field is only used as a comment.

Dates tab

The  following  dates  are  results  calculated  and  executed  during  lead  time  scheduling.  Lead  time

scheduling is triggered by certain events and runs asynchronously in the MES.

Scheduled start time

Scheduled  start  date  of  the  operation  as  a  result  of  the  lead  time  scheduling  compared  to  infinite

capacities.

As a rule, a fixed operation is never changed. If, based on the scheduling situation, a date cannot

be maintained, the operation is rescheduled, but it remains fixed.

Scheduled end time

Scheduled  end  date  of  the  operation  as  a  result  of  the  lead  time  scheduling  compared  to  infinite

capacities.

Earliest start

Earliest  start  date  (EST)  of  an  operation  as  a  result  of  forward  scheduling  during  lead  time

scheduling as compared to infinite capacities or specified by PPS.

Earliest end

Earliest  end  date  (EET)  of  an  operation  as  a  result  of  forward  scheduling  during  lead  time

scheduling as compared to infinite capacities or specified by PPS.

Latest start

Latest  start  date  (LST)  of  the  operation  as  a  result  of  backward  scheduling  during  lead  time

scheduling as compared to infinite capacities.

Latest end

Latest  end  date  (LET)  of  the  operation  as  a  result  of  backward  scheduling  during  lead  time

scheduling as compared to infinite capacities.

BDE-BAA_82.docx

Version: 1.0.23524

Page 78 of 100

Editing of Orders/Work Plans (MOC)

Buffer time

The system determines the buffer time from the difference between the latest start date (LST) and

the earliest start date (EST) for an operation

The  sum  total  of  the  buffer  times  of  all  operations  is  stored  in  the  order  (header)  in  the  field  OP

buffer.

Reducible time

If it turns out during scheduling that the lead time for a given order is  longer than the allotted time

available  (basic  end  date  exceeded),  then  the  MES  will  attempt  to  take  reduction  measures  to

shorten the lead time accordingly. Reducible times are the wait times and the transport times.

This value indicates how many (more) hours can be reduced from the lead time of an order. This

time results from the sum of the:

- difference from the current waiting time and the minimum waiting and the

- difference from the current transport time and the minimum transport time

Reducible time = (current waiting time - minimum waiting time) + (current transport time - minimum

transport time). These differences are displayed here as totals.

The  document  entitled  Reduction  Strategies  provides  information  on  how  to  configure  reduction

strategies.

Planned start

Planned start date for the operation.

Logging in an operation that has not yet been planned will not result in the

following:

- the time when this operation is started will not be interpreted as the planned

start date and

- this date will not be entered here.

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

If the "planned start" field is empty, it will be assigned to the earliest start date by default.
If the "planned end" field is empty, it will be assigned to the latest end date by default.
In both cases, however, the operation is not planned (automatically), i.e. you can still
replan the operation.

BDE-BAA_82.docx

Version: 1.0.23524

Page 79 of 100

Editing of Orders/Work Plans (MOC)

  Change operation

o

In this case, processing depends on the "planning function" option of the workplace:

  N (no planning):





If the "planned start" field is empty, it will be assigned to the earliest start
date by default.
If the "planned end" field is empty, it will be assigned to the latest end
date by default.



In any other cases, the planned dates will not be set automatically through
processing.

Quantities tab

Generally,  you  can  enter  quantities  in  four  different  quantity  units  for  an  operation.  Enter  the  target

quantity and the unit (as abbreviation) for each quantity unit. You can also enter a calculated  "estimated

scrap"

quantity.

These

quantities

can

be

specified

- by the PPS system or, if the target quantity update is activated,

- they may result from the quantity produced by the previous operation.

The letters in parentheses behind the field descriptions provide information about the particular quantity

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

Use the primary quantity to enter data via the terminal (primary input quantity).

The indicated target quantity may include a target scrap quantity that might have been entered.

Send-ahead quantity

In  order  to  illustrate  any  overlapping,  you  can  define  a  minimum  send-ahead  quantity  (in  the

primary  quantity  unit)  for  the  (preceding)  operation.  You  can  start  the  following  operation

(overlapping) if at least the send-ahead quantity has been finished and posted. The system verifies

the  send-ahead  quantity  during  data  collection  (when  logging  on  operations).  In  addition,

scheduling and detailed planning also integrate any overlapping.

You have to enable the relevant configuration in the order type  in order to verify

the  minimum  send-ahead  quantity  when  logging  on  OPs.  Configure  the

processing  code  accordingly  to  plan  overlapping  operations  based  on  the

minimum send-ahead quantity (or the lead time). You can enable this function in

the processing code while customizing the system.

When  checking  the  minimum  send-ahead  quantity,  the  system  only  takes  into

account the recorded yield that has been entered up until now (primary quantity

BDE-BAA_82.docx

Version: 1.0.23524

Page 80 of 100

Editing of Orders/Work Plans (MOC)

unit).

No  quantity  conversion  takes  place.  For  this  reason,  make  sure  that  adjacent

operations have the same primary quantity unit.

Example:

Operation 0100

Target quantity 1000  Send-ahead quantity 50

Operation 0200

Target quantity 1000

If  you enabled the validation check for the send-ahead quantity,  you can

only  log  on  operation  0200,  once  operation  0100  has  produced  a  yield

quantity (in primary quantity unit) of at least 50.

The system does not check the operation status of the preceding operation. You

cannot log on the current operation, in case the preceding operation has already

been finished, but the send-ahead quantity has not yet been reached.

Target quantity (S and T) / unit / target scrap quantity (S and T)

The secondary and tertiary quantity are considered optional, variable units (for example within the

reel-based MES solution - RF).

The indicated target quantity may include a target scrap quantity that might have been entered.

Target quantity (B) / unit / target scrap quantity (B)

The  base  quantity  unit  is  an  objective  description  of  the  material  used  in  an  order.  The  base

quantity unit allows you to compare, for example, scrap from different operations. The base quantity

unit  is  in  effect  the  quantity  unit  shown  in  the  order  header.  Generally,  conversions  (for  example

when target quantities are updated) are made using the base quantity unit.

The indicated target quantity may include a target scrap quantity that might have been entered.

If you use a quantity type, make sure to set the correct quantity unit.

The system only converts the quantities based on the conversion factors in the index

tab  "quantities"  if  the  relevant  values  you  want  to  recalculate  are  "empty"  (not  "0").

Quantity fields that contain values will not be recalculated.

Conversion factors

Use  the  conversion  factors  to  convert  the  primary,  secondary  and  tertiary  quantities  to  the  base

quantity. Use these conversion factors, for example, when updating target quantities.

Use a numerator and denominator if you want to use decimal values (meaning a figure with decimal

places) as the conversion factor.

BDE-BAA_82.docx

Version: 1.0.23524

Page 81 of 100

Editing of Orders/Work Plans (MOC)

Example

- Base quantity unit: Square meter M2

- Primary quantity unit: Piece PCE

- 1 piece = 2 square meters.

In this case

- define the numerator as the primary quantity  2 and

- define the denominator as the primary quantity  1

If no (valid) conversion factor exists, the system will attempt to convert the values using conversion

formulas (this requires that formulas were defined during the customization process).

Overdelivery/ Underdelivery

The system checks all quantities you post for overdelivery. These quantities occur, when you report

part  quantities  for  an  operation,  when  you  interrupt  or  log  off  an  operation.  When  you  log  off  an

operation, the system also runs a check for underdelivery.

For

further

information  on  overdelivery/underdelivery  checking,  see

the

document entitled MBL_PC_UnderOverDeliveryOverview.pdf.

Underdelivery (%)

Value shown as a percentage by which the quantity reported may deviate from the target quantity

(primary  quantity  unit).  The  value  is  only  assumed  from  the  processing  code  if  the  value  was  not

explicitly transmitted via the ERP interface.

Example:

Target quantity of the operation: 120 items

Underdelivery: 84%

The actual quantity must not fall below 101 items.

Overdelivery (%)

Value shown as a percentage by which the quantity reported may deviate from the target quantity

(primary  quantity  unit).  The  value  is  only  assumed  from  the  processing  code  if  the  value  was  not

explicitly transmitted via the ERP interface.

Example:

Target quantity of the operation: 120 items

Overdelivery: 168%

The actual quantity must not exceed 201 items.

BDE-BAA_82.docx

Version: 1.0.23524

Page 82 of 100

Editing of Orders/Work Plans (MOC)

Overdelivery reaction/ underdelivery reaction

If the limits specified in the fields overdelivery or underdelivery are exceeded, a warning or an error

message may be issued in response. Possible values:

"empty"  No reaction

W

X

Warning

 Error.

If error is set as the reaction, you will not be able to override the validation check.

If  warning  is  set  as  the  reaction,  you  can  override  the  validation  check  by  entering  a  deviation

reason.

Unit quantity

Only Windows terminals allow you to enter a deviation reason. DOS terminals interpret

the reaction "W" as an error.

Quantity  referring  to  operation  specifications.  You  can  customize  the  MES  to  use  the  ERP  base

quantity here. You can reference the ERP base quantity in formulas to calculate process times.

The  unit  of  the  unit  quantity  must  be  a  primary  quantity  unit.  The  system  does  not  perform  an

automatic conversion if the quantity units do not match.

As opposed to the base quantity in ERP, there is no other meaning or use in MES.

Durations / target times tabs

The illustration shown below provides an overview of the chronological structure of an operation in MES

(in-house production).

BDE-BAA_82.docx

Version: 1.0.23524

Page 83 of 100

Editing of Orders/Work Plans (MOC)

Target setup time

The target setup time is the time required to prepare a workplace for the operation, for example the

time  needed  to  mount  the  necessary  tools  or  to  set  the  machine  in  compliance  with  the

specifications ("setup time"). During this time, the workplace's capacity is shown as in use.

The ERP system transfers the target setup time or you can calculate the target setup time using a

customized formula. The formula is based on default values. In this case, enter the formula in the

field "setup time formula".

Additional setup time

The  graphic  detailed  planning  sets  the  additional  setup  time  for  the  operation,  if  a  setup  change

matrix is available and an additional setup time results from planning.

The additional setup time can also show a negative value.

Target processing time

The processing time is the time needed to process the material as part of an operation. During this

time,  the  workplace's  capacity  is  shown  as  in  use.  The  processing  time  depends  on  the  order

quantity; it does include neither the setup time nor the retooling time.

The graphic detailed planning does not use the  processing time. The graphic detailed

planning  calculates  the  processing  time  and/or  remaining  run  time  dynamically  using

the formula entered in the field "Formula RRT 1".

The  ERP  system  transfers  the  target  processing  time  or  you  can  calculate  the  target  processing

time  using  a  customized  formula.  The  formula  is  based  on  default  values.  In  this  case,  enter  the

formula  in  the  field  "processing  time  formula".  Make  sure  to  use  the  same  basis  to  calculate  the

processing time and the remaining run time (field "Formula RRT1").

Planned retooling time

The  planned  retooling  time  (teardown  time)  is  the  time  needed  to  reset  the  workplace  back  to  its

original  state  after  the  operation  has  been  completed.  This  may  require  some  tasks  such  as

dismantling  tools  or  performing  some  cleaning  work.  During  this  time,  the  workplace's  capacity  is

shown as in use.

The  ERP  system  transfers  the  planned  retooling  time  or  you  can  calculate  the  planned  retooling

time  using  a  customized  formula.  The  formula  is  based  on  default  values.  In  this  case,  enter  the

formula in the field "Teardown time formula".

Planned delivery time

There  is  only  one  time  component  for  external  operations,  i.e.  the  delivery  time.  The  system

synchronizes this time with the Gregorian calendar. The performance level has no relevance.

BDE-BAA_82.docx

Version: 1.0.23524

Page 84 of 100

Editing of Orders/Work Plans (MOC)

External processing

If  this  option  is  set,  the  operation  is  one  that  is  performed  externally.  External  operations  are

generally  not  planned,  but  only  scheduled.  In  terms  of  lead  time  scheduling,  for  these  kinds  of

operations the lead time only results from the delivery time.

If  this  option  is  not  set,  it  will  be  considered  an  in-house  operation.  In  this  case,  the  following

process times specify the capacity requirements (planning in HYDRA Shop Floor Scheduling):

- Planned setup time

- Planned processing time

- Planned retooling time

The following process times are used for scheduling (lead time scheduling) in-house operations:

- Target waiting time

- Target setup time

- Target processing time

- Target retooling time

- Target wait/idle time

- Target transport time.

Formula RRT1 / Formula RRT2

The  value  entered  in  the  field  RRT  1  refers  to  a  formula  defined  in  the  Management  of formulas.

The formula describes how to calculate the remaining run time (RRT) for an operation. The graphic

detailed planning (HLS) uses this formula.

Unless  otherwise  specified  or  defined,  enter  the  "RRT"  value  (remaining  run  time)  in  this  field.  In

this case, calculate the remaining run time as follows (set by default):

(Target cycle / 1000) * (primary target quantity - the yield recorded up until now) /    partitioning

You can enter another formula in the field formula RRT 2. You can use this formula to calculate any

remaining  run  time  that  might  deviate  from  RRT  1.  The  detail  application  order  progress  of  the

Order overview, for example, shows this formula.

Planned lead time

You can specify an overlapping of operations either using a send ahead quantity or lead time. The

lead time describes the offset from the previous operation to its subsequent operation. A lead time

can  also  be  negative,  if,  for  example,  the  subsequent  operation  begins  with  a  setup  before  the

previous operation.

Max. sync. time

If  you  enabled  synchronization  with  the  subsequent  operation  using  the  Processing  code

(customization), then planning makes sure that the maximum time span between this operation and

the subsequent operation is the specified synchronization time.

The time is calculated in hours based on the shift calendar.

You can combine the synchronization function with an overlapping of operations.

BDE-BAA_82.docx

Version: 1.0.23524

Page 85 of 100

Editing of Orders/Work Plans (MOC)

Planned waiting time / waiting time formula / minimum waiting time

The waiting time is one available option to absorb interferences and delays for each operation. The

waiting  time  describes  the  (calculated)  length  of  time that  needs  to  pass  before  an  operation  can

commence  (setup).  The  scheduling  process  also  integrates  the  waiting  time.  You  can  enter  the

waiting time directly or you can calculate it using a formula.

You can reduce the waiting time during the scheduling process. For this purpose, you have to enter

a reduction strategy for the order, which triggers a reduction in the wait time. You can reduce this

time to the minimum waiting time (at most).

Target wait time

The  target  wait/idle  time  describes  the  length  of  time  that  needs  to  pass  for  processing-related

reasons before a manufactured or processed material can undergo the next processing step. The

scheduling process integrates the wait/idle time. You cannot reduce the wait/idle time.

Target transport time

The target transport time is the time necessary to transport material from one workplace to the next.

The higher-level ERP system transfers the transport time or you can calculate the transport time in

MES using a transport matrix.

Lead time scheduling takes into account the transport time. You can also reduce the transport time

as part of lead time scheduling. You can define the transport matrix and reduction strategies when

customizing the system.

Minimum transport time

If you use reduction strategies, you can reduce the transport time to this minimum amount of time

during scheduling.

The following wage specifications are used to calculate an incentive wage.

Wage type

Wage type

Wage indicator

Piecework ID/premium  (E/G/S/M/Z/...)

Target te

Premium default: te (per 1000 pieces).

"te"  is  the  "time  per  unit"  for  each  person.  Use  "te"  to  calculate  the  "order  time",  which  is  the

specified  processing  time  for  each  person  used  to  calculate  the  incentive  wage.  By  default,  the

MES  shows  this  time  in  hours    per  1000  pieces.  The  interface  transfers  this  time  in  seconds  per

1000 pieces.

If no incentive wage is used in MES, you can enter "0" here.

BDE-BAA_82.docx

Version: 1.0.23524

Page 86 of 100

Editing of Orders/Work Plans (MOC)

Target tr

Target tr is the person’s default setup time (in hours).

If no incentive wage is used in MES, you can enter "0" here.

Target teb

The premium default "teb" is the available machine time per unit. You can use this time to calculate

the "occupancy time" for the workplace/machine so that the incentive wage can be calculated. By

default,  the  MES  shows  this  time  in  hours    per  1000  pieces.  The  interface  transfers  this  time  in

seconds per 1000 pieces.

If no incentive wage is used in MES, you can enter "0" here.

Target trb

Target

"trb"

is

the  default

setup

time

(in  hours)  of

the  workplace/machine.

If no incentive wage is used in MES, you can enter "0" here.

Processing tab

Processing code

A  processing  code  is  a  compilation  of  options  that  are  used  to  control  the  operations.  Each

operation  references  this  kind  of  processing  code,  and  as  a  result  its  performance  is  defined  in

relation to the issues listed below.

You can define processing codes at the time the system is customized.  Unless defined otherwise,

enter the Processing code SYSTEM.

Recordable

If you set this option, you can generally post the operation, provided other criteria are also met (e.g.

operation not locked or operation can be logged in due to the status of the previous operation).

Can be logged on at the same time/parallel logon possible

This option specifies whether an operation may be logged on several times, i.e. at the same time.

You should enable this option for overhead cost operations and for operations that are logged on to

group workplaces. However, you should not set this option for operations that are subject to batch

management.

The  planning  functions  graphic  detailed  planning,  order  sequencing,  graphic  order  sequencing  do

not  support  operations  that  can  be  logged  on  simultaneously.  These  planning  functions  assume

that  an  operation  is  planned  for  exactly  one  capacity.  If  you  log  on  one  operation  to  several

workplaces at the same time, contrary to capacity planning, this is then in opposition to planning. In

order to conduct parallel planning of operations on different capacities, MES provides the operation

splitting function.

BDE-BAA_82.docx

Version: 1.0.23524

Page 87 of 100

Editing of Orders/Work Plans (MOC)

Batch management requirement

Set  this  option  if  the  operation  is  subject  to  batch  management.  You  have  to  use  the  material

management in order to process operations that are subject to management in batches.

Serial number requirement

You should only set this option after consultation with MPDV.

Layout

The code entered here references a label that was created in MES Label Designer that needs to be

printed for the operation.

Target cycle

The  target  cycle  is  an  operation-related  specification  used  for  machine  clocking.  The  target  cycle

does  not  depend  on  the  number  of  produced  parts.  In  MES,  the  target  cycle  is  calculated  and

processed as a duration per 1000 machine cycles.

If  cycle  time  monitoring  is  active,  this  value  is  assumed  as  the  default  setting  for  finishing  the

operation.  This  value  is  the  default  value  for  the  MDE  machine  monitoring  function  (cycle

monitoring).

Partitioning

The partitioning (cavity) defines how many parts are produced during a machine cycle.

The  partitioning  is  determined  for  each  operation  separately  and  is  transferred  via  the  ERP

interface to MES. The partitioning is transmitted to the terminal at the time the operation is logged

on and applies to the machine to which the operation is logged on.

Pulse factor

Automatic quantity collection at the terminal includes the pulse factor that is stored for an operation.

Consequently, the pulse factor and the partitioning represent a conversion factor for the automatic

collection of quantities: primary quantity = cycle * partitioning/pulse factor.

Split authorization

This option defines whether an operation may be split.

Max. number of splits

If an operation can be split, the system checks whether or not the split number entered by the user

exceeds the value entered here. If this is the case, the split is rejected with an error.

M/O relation setup (machine/operator relation: setup)

Personnel requirements PEP (Personnel Scheduling) for setting up the operation.

Qualification (setup)

Unique qualification number from the qualification master data.

BDE-BAA_82.docx

Version: 1.0.23524

Page 88 of 100

Editing of Orders/Work Plans (MOC)

M/O relation production (machine/operator relation: production)

Number  of  employees  required  for  production.  By  configuring  the  system  during  the  customizing

stage,  you can define for each order type that only the number of persons specified here can log

on.  If  several  operations  are  logged  on  at  the  same  time  (in  parallel),  the  maximum  number  of

persons is equal to the total number of M/O relations for each separate operation.

In Personnel Scheduling (PEP), you can use this field to define the personnel requirements needed

to produce the operation.

Alternatively  to  defining  personnel  requirements  by  way  of  the  machine/operator  ratio  for  the

operation,  you  can  also  define  these  requirements  in  the  production  resources  and  tools.  As

opposed  to  the  production  resources  and  tools,  you  can  only  define  one  required  qualification

each for setup and production if the M/O relation is used.

The  machine/operator  relation  (for  setup  and  production)  is  only  relevant  for  personnel

scheduling if you have entered a qualification in the corresponding field.

Qualification (production)

Unique qualification number from the qualification master data.

Production method (variant)

Using  production  methods  allows  you  to  specify  on  which  machine  an  operation  can  be  planned,

when the ERP system transfers order specifications. If you use the graphic detailed planning, you

can apply the available production methods for detailed planning taking into account the specified

times (target cycle, setup and retooling time) for each production method.

Here you can enter the key of the currently assigned production method.

Data identifier

Here, enter the data identifier if you use an Arburg Control System (ALS). This ID must be unique

(key). If ALS is not used, leave this field empty.

CBM tab

This  index  tab  is  only  relevant  in  connection  with  the  reel-based  solution  using  in  the  material

management module.

General

Special indicators

Not used; this field must remain empty.

Number of reels

The planned total number of reels to be produced (parent roll and sub-rolls); no specific processing

in MES.

BDE-BAA_82.docx

Version: 1.0.23524

Page 89 of 100

Editing of Orders/Work Plans (MOC)

Material properties

Input width

Reel input width in MM

Output width

Reel output width in MM

If multiple rolls are manufactured at the same time in one operation, this field indicates the sum total

of the separate widths.

If branches are planned, the output width of the separate operations is set explicitly (no sum total is

generated) for each operation ("parent" and "sub-roll" operations).

Seam width

Total seam width in mm

If several reels are produced at the same time in one operation, this field will contain the sum total

of the separate seam widths.

If branches are planned, the seam width of the separate operations is set explicitly (no sum total is

generated) for each operation ("parent" and "sub-roll" operations).

Surface per piece

Surface for a piece in MM2/PCE

Mass per unit area

Mass per unit area in G/MM2

Casing weight

This is where the casing weight for the sub-rolls is defined while cutting operations.

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

Mother OP of a planned branch

Child (subordinate) OP of a planned branch

BDE-BAA_82.docx

Version: 1.0.23524

Page 90 of 100

Editing of Orders/Work Plans (MOC)

Mother OP

If  a  branch  is  planned,  these  fields  allocate  the  branched  off  material  to  the  relevant  mother

operation.

A mother operation must reference itself.

Please note: Enter the MES order ID (= MES order number = combined order / operation number).

Daughter rolls/cut

Number of planned daughter reels per cut.

If the cutting plan is not defined, 0 is entered here.

Daughter rolls/cut - total

For  cutting  operations  (mother  OP):  number  of  planned  daughter  rolls  per  cut  (encompassing  all

branched off material).

If the cutting plan is not defined, 0 is entered here.

User fields tab

User fields allow you to store further customer-specific information to the MES in addition to the fields that

are available by default. The order information shows operation-related user fields. The order information

dialog includes the user fields index tab for the operations. This tab shows  the user field key, the defined

user fields including name and unit of measure. The user fields tab includes eight sub-index tabs, which

each  have  eight  additional  user  fields.  The  so-called  user  field  key  determines  which  user  fields  are

involved and which meaning they have.

Object type

The object type for operation-related user fields is AGNR (cannot be modified).

User field key

Every user field key describes a combination of user fields. The management of the user field key

(and  therefore  the  purpose  of  the  fields)  varies  from  one  object  to  the  next.  User  field  keys  are

defined in coordination with the customer during the customizing process.

User fields

The following user fields are available for the operation after customizing the system:

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

Number of
fields
6
16

6
16
6

BDE-BAA_82.docx

Version: 1.0.23524

Page 91 of 100

Editing of Orders/Work Plans (MOC)

Field data type

Number of
fields
14

field,

length

Text
20
Text
40
Each page shows a maximum of 8 fields.

length

field,

2

Default values tab

You can define up to ten default values for each operation. You can use the default values, among other

things,  to  calculate  certain  processing  times  using  specified  calculation  rules.  The  default  value  key

specifies the meaning of each separate default value .

Please note

We recommend  not  to  change  the  default  value  key  at  the  operation  directly,  because  this might

distort the meaning of the separate default values.

Default value keys are configured in coordination with the customer during the customizing process.

Administration tab

Created by/Created on

User who entered the operation and the time that the operation  was entered.  You cannot change

these fields.

Modified by/Modified on

User who most recently modified the operation, and the time that this modification was made. You

cannot change these fields.

Transferred by/Transfer time

Here,  you  can  enter  the  source  from  where  the  operation  was  transferred.  If  the  PPS  system

transfers  the  operation  (PPS=J),  the  system  automatically  sets  the  transfer  time  and  date  to  the

time and date when the order was stored in MES. You cannot change these fields.

Modified HYDRA

Specifies that the operation was changed in MES. This identifier is automatically set at "J", if the OP

was changed in MES. You cannot change the field.

Modified PPS

Specifies that the production order was changed in the ERP system. This identifier is automatically

set at "J", if the production order was changed in the ERP system (PPS=J). You cannot change the

field.

Deletion flag

This option is only displayed in the order information. You cannot change the option.

BDE-BAA_82.docx

Version: 1.0.23524

Page 92 of 100

Editing of Orders/Work Plans (MOC)

Responsibility area

If  an  area  of  responsibility  is  entered  here,  the  user  must  have  been  authorized  to  view  and  edit

operations and/or work plan operations.

The fields listed below are only displayed in the Order information. You cannot change these fields.

Locked / locked by / locked on

You  cannot  log  in  locked  operations.  The  terminal  does  not  show  locked  operations  in  the

sequencing list, irrespective of how the status is configured.

Additionally, the user is shown  who  was the last to lock the operation and also the time and date

when  the  operation  was  locked.  These  values  remain  even  after  the  operation  is  unlocked.  They

are updated each time the operation is locked again.

Unlocked by/unlocked on

Shows the user who was the last to unlock the operation and the time and date when the operation

was  unlocked.  These  values  remain  even  if  the  operation  is  locked  again  any  time  in  the  future.

They are not updated until the operation has again been unlocked.

Locked for editing / locked for editing by / locked for editing on

Reserved; currently not used.

Reactivated by / Reactivated on

If an operation that has already ended is reactivated, the user is displayed here, who was the last to

perform the reactivation and the time and date on which the reactivation took place.

BDE-BAA_82.docx

Version: 1.0.23524

Page 93 of 100

24  Operation Long Text Data Structure

Editing of Orders/Work Plans (MOC)

Each  of  the  fields  for  an  operation  long  text  are  described  below.  The  actual  sequence  of  the  editing

dialogs may deviate from the one illustrated here.

MES order number / MES work plan number

Combined order/ operation number and/ or work plan/ operation number of the operation for which

a long text is defined.

Short text

Short version of the long text, which is shown in the application list.

Long text

Actual long text, which is not shown in the application list.

The  text  entry  function,  which  for  the  most  part  is  equivalent  to  the  functions  of  a  text  editor

(highlighting of text passages; deleting or inserting of lines of text, as well as the merging of lines of

text; copying with the key combination Ctrl+C, cutting with the key combination Ctrl+X, and pasting

with the key combination Ctrl+V). Lines may have more than 80 characters when entered. When a

document is saved, however, the system inserts a hard line break after the 80th character.

BDE-BAA_82.docx

Version: 1.0.23524

Page 94 of 100

25  Data Structure of Components

Editing of Orders/Work Plans (MOC)

Production resources and tools are stored in the table mlst_hy with resource type "MAT". In the sections

below, the different fields of a (material) component are described. The actual order of fields in the editing

dialogs can deviate from the order used here. Not all fields that are listed here are displayed on the client

or can be edited.

MES order number / MES work plan number

The  component  is  assigned  to  the  operation  identified  in  this  field.  The  field  shows  the  combined

order and operation number or work plan and operation number of the operation.

Material

Enter the material number of the material component.

Designation

You can enter the name of the material.

Comment 1 / Comment 2

These are comment fields.

BOM item

The BOM lists the different components of a product. The components are referred to as items. The

number  entered  here  specifies  the  position  where  the  item  is  listed  in  the  BOM.  It  is  therefore

possible  that  the  BOM  includes  one  material  number  several  times.  Using  the  correct  BOM  item,

the data collection can still be uniquely assigned.

Note:  when  using  the  MPL,  the  BOM  item  must  be  unique  for  an  operation.  Each

component  must  have  a  unique  BOM  item  if  several  components  are  used  in  one

operation. Two components must not have the same BOM item.

For the coil-based solution "RF", the BOM item specifies the position of the component in the layer

structure.

BOM level

A component can also have several levels. If applicable and known, enter the BOM level here.

If  you  log  on  input  batches  via  material  management  (MPL/TRT),  you  can  only  log  on

components of BOM level 0.

If  you  enter  a  BOM  level  >  1,  the  system  automatically  sets  the  component  type  (see

second next field) to "I" (info component).

BDE-BAA_82.docx

Version: 1.0.23524

Page 95 of 100

Editing of Orders/Work Plans (MOC)

Material type

Material type of the material component. The material type controls the material-specific processing

in the system.

Unless defined otherwise for a specific project, assign the material type SYSTEM here.

The material type must be available in the system (see configuration of Material types). If

no material type  has been  entered, the system tries to identify the material component

(requirement: the assignment of material to material type has been made). If the system

cannot identify the material type, the system uses the material type "SYSTEM".

For info components (material type "I"), we recommend to define and assign a separate

material type (e.g. INFO).

Component type

Possible values:

M

Material component (default)

You  usually  enter  "M"  here.  Other  component  types  can  be  relevant  for  material

management ("MPL").

I

Info component

You can display info components in the bill of materials (BOM), but you need not log

them on or off.

T

Carrier material (coil-based production)

You can log on a maximum of one input batch as carrier material (T) or added material

A

Z

(Z) to the machine.

Scrap/waste material (coil-based production)

Added material as alternative for the carrier (coil-based production)

You can log on a maximum of one input batch as carrier material (T) or added material

(Z) to the machine.

Consumption type

The following collection options are available for material components. The definition of the different

options and their use depend on the functions used.

N = None

This  option  defines  that  no  consumption  is  collected  for  the  material  component.  The  material

component is only displayed here.

The so-called info components (see above: component type) must be set to this option.

BDE-BAA_82.docx

Version: 1.0.23524

Page 96 of 100

Editing of Orders/Work Plans (MOC)

L = Retrograde/with batch reference (MPL/TRT, MPL-RF)

If  this  option  is  used,  the  material  component  is  logged  on  and  off  as  batch.  The  consumption

calculation  for  this  material  component  (retrograde,  at  input  batch  logoff)  depends  on  the

configuration of the material type the material component is assigned to.

D = Discrete

This  option  is  relevant  for  discrete  consumption  recording  (AIP-DVE).  This  type  of

material  consumption  recording  requires  a  configuration  that  can  be  part  of  a

customization at the customer's.

Use the option "L" if Material and Production Logistic (MPL) or Tracking & Tracing (TRT)

is used.

For  this  component,  the  system  calculates  consumption  using  the  quantity  produced  last  and

suggests this calculated quantity in a posting dialog. The consumption is posted for the component

and a material movement is generated (goods issue from production). This material movement can

be uploaded to the higher-level ERP system.

Replaceable

If  this  identifier  (=J)  is  set,  you  can  use  a  different  material  than  the  material  planned  for  this

component. You can only use a material of the same material type.

For the user on the shop floor client (MPL/TRT) a message is displayed. The user selects and logs

on the relevant component.

Change necessary / Requirement to change output batch

With this option, an input batch change for a batch of this material forces an output batch change.

The setting that is allowed for this option depends on the relevant component type (see above):

Component type

Allowed settings

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

Input quantity of the component per unit in primary quantity that is planned for the operation.

Unit

Quantity unit of input quantity

Input quantity in percent / Upper tolerance limit / Lower tolerance limit

Default: 0; should only be modified after consultation with MPDV.

BDE-BAA_82.docx

Version: 1.0.23524

Page 97 of 100

Editing of Orders/Work Plans (MOC)

Required quantity

Total quantity of the component that is planned for the operation.

The  system  calculates  the  required  quantity  when  the  display  is  called.  The  following  formula  is

used for calculation :

Required quantity = input quantity of component x target quantity of OP in primary quantity unit

The required quantity is only displayed in the table and in the detail panel.

Resource type

Reserved. Not used.

UOM Spec. mass per unit area

Reserved. Not used.

Spec. mass per unit area

Reserved. Not used.

Planned article

Reserved. Not used.

Backflush

Reserved. Not used.

Required quantity (PPS)

The field Required quantity shows the total quantity required that is transferred from the ERP/PPS

system. That is the quantity of the component that is required to produce the target quantity of the

operation.

Consumption (total)

The column Consumption (total) shows the total consumption that has been posted for the relevant

component.  In  this  context,  it  does  not  matter  whether  the  component  is  subject  to  batch

management or discrete.

Upper-level component: BOM item / BOM level

Reserved. Not used.

Modified by / Modified on

Editor and date and time of the last change

User fields

You can define and use user fields for specific projects.

BDE-BAA_82.docx

Version: 1.0.23524

Page 98 of 100

26  Production Resources & Tools Data Structure

Editing of Orders/Work Plans (MOC)

Each  of  the  fields  for  a  production  resource  or  tool  are  described  below.  The  actual  sequence  of  the

editing dialogs may deviate from the one illustrated here.

MES order number/ MES work plan number

Combined order/operation number and/or work plan/operation number of the operation for which a

production resource is defined.

Resource type

Resource  type  of  the  production  resource  or  tool  that  is  to  be  assigned  to  the  operation.  The

resource  type  must  be  known  in  MES.  Predefined  resource  types  must  be  chosen  from  the

selection menu. Additional resource types can be defined when customizing the system.

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

When  identifying  a  document  as  a  production  resource,  the  local  reference  to  the  path  is  to  be

defined in the Path Configuration.

No  path  must  be  stored  for  DNC  resources;  it  is  determined  based  on  the  path  stored  for  the

resource type.

The field should be left empty for all other production resources.

When  identifying  a  document  as  a  production  resource,  the  local  reference  to  the  path  is  to  be

defined in the Path Configuration.

BDE-BAA_82.docx

Version: 1.0.23524

Page 99 of 100

Editing of Orders/Work Plans (MOC)

No file name must be stored for DNC resources; it is determined based on the path stored for the

resource type.

The field should be left empty for all other production resources.

If  a  new  document  is  assigned  to  an  operation,  it  must  be  ensured  that  it  exists  at  the

stated location. No file is uploaded when a document is assigned!

Modified by/ Modified on

Editor as well as the date and time the last modification was made.

BDE-BAA_82.docx

Version: 1.0.23524

Page 100 of 100

