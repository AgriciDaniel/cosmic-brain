Manual

Monitoring of Shop Floor Data
BDE-MAB 8.1

Version 1.0.4716

Last changed on: 19.06.2020

Monitoring of Shop Floor Data

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

BDE-MAB_81.docx

Version: 1.0.18468

Page 2 of 65

Monitoring of Shop Floor Data

Contents

1  Overview – Shop Floor Data / Order Data Monitoring ................................. 4

2  Order Information ......................................................................................... 6

3  Order Overview .......................................................................................... 15

4  Order Shift Log ........................................................................................... 27

 ............ 31

5  Pool of Orders ............................................................................................ 34

6  Operations Logged On ............................................................................... 42

7  Finished Operations ................................................................................... 50

8  Operations .................................................................................................. 57

BDE-MAB_81.docx

Version: 1.0.18468

Page 3 of 65

SZYANRTLGANRBMKEGRANRGUTPEGRANR.*.*:.*0.1000:.*0.100AUSBGD1101

1

 Overview – Shop Floor Data / Order Data Monitoring

Monitoring of Shop Floor Data

Overview

Purpose

The  shop  floor  data  /  order  data  monitoring  function  provides  numerous  functions  and  overviews  to

monitor the orders / operations existing in the system. For this, the master data of the order / operation

are accessed and compared with recorded data to provide an overview of the progress.

Implementation Notes

The shop floor data / order data monitoring function is used when

  You wish to obtain an overview of the orders / operations existing in the system.

  You wish to monitor the order progress for these orders / operations on the basis of the uploads

recorded in the system.

  You  wish  to  obtain  an  overview  of  the  orders  /  operations  completed  in  the  previous  shifts,  the

times required for this and the quantities produced.

Integration

The shop floor data / order data monitoring function  uses order data that  were either created directly  in

the system or that were transferred from other systems via interfaces.

Times and quantities entered in the BDE or MDE are accessed to display order progress.

Features

  Order overview:

o  Order overview as central overview function for the display of orders and their operations

using a variety of selection criteria

o  Display of the order progress, i.e. all prepared, current, interrupted and completed OPs of

a multi-level production order in the order overview

  Order information

o  Order information for the display of important information on an order, including its OPs,

such as stock data, user fields, components, production resources and status information

(degree of completion, remaining run time, quantities and times posted)

o  Display of comments entered at the terminal

  Operation overviews

o  Tabular list of the scheduled operations (status: prepared, interrupted)

BDE-MAB_81.docx

Version: 1.0.18468

Page 4 of 65

Monitoring of Shop Floor Data

o  Tabular presentation of the currently logged on operations (status: running)

o  Tabular presentation of the operations already completed (status: completed)

o  Tabular  presentation  of  all  operations  with  predefined  filter  for  display  of  logged  on

operations, completed operation and pool of orders

  Order shift log

o  Shift-related presentation of the completed operations

o  Graphic representation of quantities and times by article

BDE-MAB_81.docx

Version: 1.0.18468

Page 5 of 65

Monitoring of Shop Floor Data

2  Order Information

Overview

Menu

Production control  Production overview  Order information

Transaction code

orin

Function authorization

orin

Usage

Order information is the most important instrument for anyone in a position of responsibility in and around

the production process, and it is used to monitor, control and oversee production.

Integration

Order  information  provides  data,  organized  in  a  clear  and  well-structured  manner,  which  are  necessary

when processing operations. This makes the order information one of the most important tools in the day-

to-day production control and monitoring tasks. This application is especially indispensable for preparing

work to be performed in the production department.

Selection criteria

The following selection criteria are available in the application:

Order

This  selection  criterion  refers  to  the  order  number.  The  selected  order  is  displayed  with  its

operations.

Show split OPs

This  selection  criterion  refers  to  the  displayed  operations.  If  this  checkbox  is  enabled,  the  list  of

operations also includes split operations.

In  addition,  the  below-mentioned  information  about  the  selected  order  is  shown  in  the  selection  panel

(view only):

Order status

Shows the status of the select order in text form (highlighted in color)

Archived

Provided  that  the  order  has  already  been  archived,  this  is  shown  in  text  form  behind  the  field

displaying the order status.

BDE-MAB_81.docx

Version: 1.0.18468

Page 6 of 65

Monitoring of Shop Floor Data

Toolbar

In general, the parameters for calling the function or target application are taken over from the table. For

this reason, an entry should always be selected before calling an application.

General index tab

 Update order

The order can be updated by the update order function.

 Schedule order

The order can be scheduled by the schedule order function.

 Order overview

This button opens the application order overview.

 Documents

The  documents  defined  at

the  operation  can  be  displayed  using

this

function.

Documents  are  assigned

in

the

"edit  production

resources  and

tools"

function.

 Serial numbers

Opens the application edit serial numbers..\..\functions\moc\MOC_OrderSerialNumber.pdf for the

order.

Edit index tab

  Edit orders

Function authorization: edor.*

Calls up the application edit orders for the order.

Edit order sequences

Function authorization: edseq.*

Calls up the application edit order sequences for the order.

BDE-MAB_81.docx

Version: 1.0.18468

Page 7 of 65

Monitoring of Shop Floor Data

   Edit operations

Function authorization: edop

Calls up the application edit operations for the order.

Edit operation long texts

Function authorization: edoptx.*

Calls

up

the

application

edit

operation

long

texts..\..\functions\moc\MOC_EditOperationLongTexts.pdf for the order.

Edit components

Function authorization: edopcomp.*

Calls up the application edit components for the order.

Edit production resources and tools

Function authorization: edopres.*

Calls up the application edit production resources and tools for the order.

Order data detail application

The master data associated with the orders is displayed in the order data detail application.

The separate fields in the order header are described here

The index tabs may deviate from the order used in the description.

Order data - status detail application

The order's current status is shown in the order data status detail application.

The times/ quantities represent the sum total of all operations.

Comments detail application

The  BDE  comments  that  were  appended  to  the  operations  of  the  selected  order  during  data  entry  are

shown in this detail application. This supports efforts towards a paperless production process.

The following data is available for display:

Recording time

Point in time (date, time) when the comment was recorded.

BDE-MAB_81.docx

Version: 1.0.18468

Page 8 of 65

Monitoring of Shop Floor Data

Collected at workplace

Workplace at which the comment was recorded.

MES order number

The operation's combined order/ operation number that the comment was recorded for.

Person

Personnel number of the person according to the HR master data who recorded the comment.

Last name

Last name of the person according to the HR master data who recorded the comment.

First name

First name of the person according to the HR master data who recorded the comment.

Name

Entire  name  of  the  person  (last  name,  middle  name  and  first  name)  according  to  the  HR  master

data who recorded the comment.

Operations detail application

The index tabs may deviate from the order used in this description.

Operations - operation detail application

The operation detail application provides a description of the operation's master data.

The fields for the operation are described here.

Operation status - operation detail application

The current status for each operation is shown in the Status detail application.

The operation's status information is described here.

Operation - RPA - operation detail application

The  recorded  times  (actual  values)  for  each  operation  broken  down  by  RPA  are  shown  in  the  detail

application Operation - RPA.

Operations - logged on to workplace detail application

The  detail  application  Logged  on  to  workplace  shows  the  workplaces  that  the  operation  selected  at  the

top  is  logged  onto.  If  an  operation  is  logged  on  at  several  workplaces  at  the  same  time,  the  multiple

workplaces are also shown here.

BDE-MAB_81.docx

Version: 1.0.18468

Page 9 of 65

Monitoring of Shop Floor Data

Workplace

Workplace

Workplace at which the operation is logged on.

Logon

Date

Time

Point in time when the operation was logged on to the workplace.

Point in time when the operation was logged on to the workplace.

Order

HYDRA order number

The selected operation's combined order/ operation number.

Operations - staff logged on detail application

Shown in this detail application are those employees that are logged on to the operation highlighted at the

top. Because several employees can be logged on to one operation, in this case more than one person is

shown for each operation here as well.

Person

Person

Personnel number of the person logged on at the operation according to the HR master data. The

workplace at which this person with this operation is logged on can be seen in the workplace field.

Staff badge number

Staff badge number of the person logged on at the operation according to the HR master data.

Last name

Last name of the person logged on at the operation according to the HR master data.

First name

First name of the person logged on at the operation according to the HR master data.

Name

Entire  name  of  the  person  (last  name,  middle  name  and  first  name)  logged  on  at  the  operation

according to the HR master data.

BDE-MAB_81.docx

Version: 1.0.18468

Page 10 of 65

Monitoring of Shop Floor Data

Logon

Date

Time

Point in time when the operation was logged on to the workplace.

Point in time when the operation was logged on to the workplace.

Advance logon

If  the  logon  is  currently  still  an  advance  logon  recorded  before  the  start  of  a  shift,  the  flag  in  this

column illustrates this.

Workplace

Workplace

Workplace at which the person with the currently selected operation is logged on to.

Operator position

Operator position (identification) that the person uses to log on to the workplace (only relevant if a

person logs on at the Windows terminal with an operator position).

Order

HYDRA order number

The selected operation's combined order/ operation number.

Operations - resources logged on detail application

Shown in the detail table Resources logged on are the tools and other resources needed for production

that are logged on either explicitly or implicitly at the operation.

Operations - material in use detail application

Shown in the Material in use detail application are the input material logged on at the operation selected

on top.

Material

Batch number

HYDRA batch number of the material in use.

Material

Material number for the material in use according to the HYDRA batch inventory.

Material designation

Material designation for the material in use according to the HYDRA batch inventory.

BDE-MAB_81.docx

Version: 1.0.18468

Page 11 of 65

Monitoring of Shop Floor Data

Material type

Material type for the material in use according to the HYDRA batch inventory.

Quantity

Quantity

Original quantity of the material in use according to the HYDRA batch inventory.

Remaining quantity

Remaining quantity of the material in use according to the HYDRA batch inventory.

Unit

Quantity unit of the material in use according to the HYDRA batch inventory.

Workplace

Workplace

Workplace at which the input material/ batch is logged on.

Logon

Date

Time

Point in time when the input material/ batch was logged on to the workplace.

Point in time when the input material/ batch was logged on to the workplace.

Order

HYDRA order number

The selected operation's combined order/ operation number.

Operations - material produced detail application

Shown  in  this  detail  application  is  the  output  material  (output  batch)  that  is  currently  being  produced

during the operation.

Material

Batch number

HYDRA batch number of the material produced.

Material

Material number for the material produced according to the HYDRA batch inventory.

BDE-MAB_81.docx

Version: 1.0.18468

Page 12 of 65

Material designation

Material designation for the material produced according to the HYDRA batch inventory.

Monitoring of Shop Floor Data

Material type

Material type of the material produced.

Quantity

Quantity

Quantity recorded so far and posted to the material.

Unit

Quantity unit of the material produced.

Workplace

Workplace

Workplace at which the output material/ batch is logged on.

Logon

Date

Time

Point in time when the output material/ batch was logged on to the workplace.

Point in time when the output material/ batch was logged on to the workplace.

Order

HYDRA order number

The selected operation's combined order/ operation number.

Operations - production resources and tools detail application

Shown  in  the  production  resources  and  tools  detail  application  are  all  resources  for  an  operation  that

were transferred via an interface. For operations that are not logged on, displayed here can also be those

tools and resources not logged on to the operation.

Resource

Resource type

Resource type for the resource, referred to as production resources and tools

Resource

Identification

BDE-MAB_81.docx

Version: 1.0.18468

Page 13 of 65

Monitoring of Shop Floor Data

Designation

Designation of the production resource according to the list of production resources and tools.

Comment 1, comment 2

Comment fields for the production resource according to the list of production resources and tools.

File

File name

If the production resource is a file (image, document), the file name is shown here.

Path

Logical reference to the path configuration

Quantity

Required quantity

Required quantity of the production resource or tool.

QU required quantity

Quantity unit of the required quantity of the production resource or tool.

Order

MES order number

The selected operation's combined order/ operation number.

Operations - components detail application

Shown  in  the  components  detail  application  are  all  of  the  consumption  materials  for  an  operation  that

were transferred via an interface.

The fields for the components are described here.

BDE-MAB_81.docx

Version: 1.0.18468

Page 14 of 65

Monitoring of Shop Floor Data

3  Order Overview

Summary

Menu

Production control --> Production overview --> Order overview

Transaction code

orov

Function authorization

orov

Utilization

The order overview function is of interest to all users who would like to get an overview of the production

progress of an entire order, without having to do without progress details of individual operations.

Integration

The workplace overview is a function of production management that represents a production overview.

The  order  overview  is  the  central  dialog  to  have  information  about  HYDRA  orders  displayed.  It  shows

dates, quantities and times of production orders, overhead cost orders, maintenance orders and all other

order  types.  Orders  are  displayed  in  a  table.  The  progress  of  an  order  is  displayed  by  selecting  a

corresponding table row.

Selection criteria

If several selection criteria are used overlapping results are displayed in the order overview.

The application provides the following selection criteria:

Order

This selection criterion refers to the order number. The selected order is displayed. Wildcards may

be entered.

Order type

This  selection  criterion  refers  to  the  order  type  at  the  order  header.  Only  orders  assigned  to  the

selected order type(s) are displayed.

Category

This  selection  criterion  refers  to  the  category  of  the  order  type  at  the  order  header.  Only  orders

assigned to the selected category(ies) are displayed.

Finished article

This selection criterion refers to the article in the order header. All orders assigned to the selected

article are displayed. Wildcards may be used.

BDE-MAB_81.docx

Version: 1.0.18468

Page 15 of 65

Monitoring of Shop Floor Data

Article designation

This  selection  criterion  refers  to  the  article  designation  defined  in  the  order  header.  All  orders

assigned to the selected article designation are displayed. Wildcards may be used.

Order status

This selection criterion refers to the order statuses at the order header. Only orders assigned to the

selected order statuses are displayed.

Control

This selection criterion refers to the control indicator at the order header. Only orders assigned to

the selected control indicators are displayed.

Sales order

This selection criterion refers to the sales order defined at the order header. All orders assigned to

the selected sales order are displayed. Wildcards may be used.

Customer designation

This  selection  criterion  refers  to  the  customer  designation  defined  in  the  order  header.  All  orders

including the selected customer designation are displayed. Wildcards may be used.

Project number

This selection criterion refers to the project number defined in the order header. All orders that are

assigned to the selected project number are displayed. Wildcards may be used.

Planned order

This selection criterion refers to the planned order defined in the order header. Wildcards may be

used.

Cost object

This  selection  criterion  refers  to  the  cost  object  defined  in  the  order  header.  All  orders  of  the

selected cost object are displayed. Wildcards may be used.

MRP controller

This  selection  criterion  refers  to  the  MRP  controller  defined  in  the  order  header.  All  orders  of  the

selected MRP controller are displayed.

Order group

This  selection  criterion  refers  to  the  order  group  defined  in  the  order  header.  All  orders  that  are

assigned to the selected order group are displayed.

Basic start date ... Basic start date

This  selection  criterion  refers  to  the  basic  start  date  defined  in  the  order  header.  Only  are  orders

displayed, which are planned on or between the selected basic start dates.

BDE-MAB_81.docx

Version: 1.0.18468

Page 16 of 65

Monitoring of Shop Floor Data

Basic end date ... Basic end date

This  selection  criterion  refers  to  the  basic  end  date  defined  in  the  order  header.  Only  are  orders

displayed, which are planned on or between the selected basic end dates.

Job end ... Job end

This selection criterion refers to the actual job end of the order header. Orders, which are dated on

or between the selected order end dates, are displayed only.

Priority ... Priority

This  selection  criterion  refers  to  the  priority  defined  in  the  order  header.  All  orders  having  the

selected priority are displayed.

Order index ... Order index

This selection criterion refers to the order index defined in the order header. All orders having the

selected order index are displayed.

The responsibility area is not checked in this application.

"Order overview" detail application

"Status" category

Order status

The bitmap (“LED”) defined in the status configuration is displayed as status.

In the HYDRA standard the color of the status LED corresponds to the one of the control LED.

Order status (text)

The status text results from the current status of the operation.

Status since

Date/time since when the order is in this status.

Status since time

Date when the status was set

Order start

Date/time of starting the order, i.e. date when the first operation of an order starts.

Order end

Date/time when the order is finished, i.e. date when the last operation of an order is logged off.

"Order" category

Shows specific data for orders.

Relevant fields are:

BDE-MAB_81.docx

Version: 1.0.18468

Page 17 of 65

Monitoring of Shop Floor Data

Order type

Displays  the  order  type  as  text  and  symbol.  The  order  types  within  the  HYDRA  standard  are

described in the glossary. Further order types can be defined while HYDRA is customized.

Order

Number of the corresponding order

User fields of the order header

Shows the configured user fields for the order overview in the "user fields" category.

"Progress" category

Number of OPs

Number of operations of the corresponding order.

Finished OPs

Number of finished operations of the corresponding order.

"Quantities" category

Target quantity (B)

Quantity specification for the order in base quantity unit.

Target scrap

Target scrap of the order in base quantity unit.

Unit

Defined unit (base quantity unit)

Yield (B)

Recorded yield in base quantity unit of the last operation that can be recorded.

This  is  the  last  operation  included  in  the  order  network  that  is  neither  locked

(internal  control  flag  "Y")  nor  deleted  logically  (internal  control  flag  "D").  This

operation "provides" the quantity for the entire order.

This means that  yield is 0  as long as the order has not been finished, i.e. as

long  as  no  quantity  has  been  posted  onto  the  last  operation  that  can  be

recorded for the order.

Provided  that  the  last  operation  that  can  be  recorded  has  a  quantity  >  0,  but

this  quantity  is  not  shown  in  the  order  overview,  please  check  the  procedure

described  in  the  document  entitled  Activating_OrderRelatedKeyfigures.pdf  or

proceed as described there.

Scrap (B)

Sum total of the scrap quantities entered for all operations posted of the order in base quantity unit.

Prerequisite: scrap has been posted in base quantity unit to the operations.

BDE-MAB_81.docx

Version: 1.0.18468

Page 18 of 65

Monitoring of Shop Floor Data

Rework (B)

Sum  total  of  the  rework  quantities  entered  for  all  operations  posted  of  the  order  in  base  quantity

unit. Prerequisite: the rework quantity has been posted in base quantity unit to the operations.

Open quantity (B)

Sum total of the open quantities entered for all operations posted of the order in base quantity unit.

Prerequisite: the open quantity has been posted in base quantity unit to the operations.

"Target times" category

Planned lead time

The  planned  lead  time  includes  all  planned  execution  times,  like  setup  time,  processing  time,

inspection time and dismantling/teardown time

Target setup time

Target  setup  time  for  the  operation.  The  setup  time  is  transferred  by  the  ERP  system  or  can  be

calculated using a formula that is defined while HYDRA is customized.

Planned processing time

Target processing time for the operation. The processing time is transferred by the ERP system or

can be calculated using a formula defined while HYDRA is customized.

Planned execution time

Total of planned setup time + planned processing time

Labor utilization

Total of the planned labor utilization of all enterable, active OPs

"Actual times" category

Retention period of order

The  retention  period  of  the  order  results  from  the  period  of  time  between  the  first  transfer  of  the

order from the PPS system ("order release" = creation date of the order header in HYDRA) and the

actual logoff of the last active operation of the order (from a chronological view).

Please note:

-

It cannot be recognized or considered whether this point in time of the order transfer is the point

in time when the order is transferred for the first time from the PPS system or whether the order

has meanwhile been deleted and resent due to technical problems.

-

In  case  an  order  is  transferred  several  times  and  the  previous  order  is  deleted  with  each

transfer, the creation date of the order header is that of the last transfer (from a chronological

view).

Lead time

The  order  duration  results  from  the  period  of  time  between  the  first  logon  of  an  operation  of  the

order and logoff of the last operation that is active (from a chronological view).

BDE-MAB_81.docx

Version: 1.0.18468

Page 19 of 65

Monitoring of Shop Floor Data

Actual setup time

The setup time of the order is the total of setup times (RPA 7) of all enterable, active operations.

Actual processing time

The  processing  time  of  the  order  is  the  total  of  main  utilization  times  (RPA  11)  of  all  enterable,

active operations.

Actual downtimes

The downtime of the order is the total of downtime times (RPA 1 to 6, RPA 8 to 10) of all enterable,

active operations.

Assignment time

The  assignment  time  is  the  total  of  the  setup  time  (RPA  7),  processing  time  (RPA  11)  and

downtimes (RPA 1...6, RPA 8...10) of all enterable, active operations.

Labor utilization

The  labor  utilization  of  the  order  is  the  total  of  labor  utilization  times  of  all  enterable,  active

operations.

"Actual dates" category

Order start date

Date when the order was started, i.e. when the first operation of the order was logged on.

Order start time

Time when the order was started, i.e. when the first operation of the order was logged on.

Order end date

Date when the order was finished, i.e. when the last operation of the order was logged off.

Order end time

Time when the order was finished, i.e. when the last operation of the order was logged off.

"Key figures" category

Rate of capacity utilization

The  capacity  utilization  rate  is  the  relation  between  the  processing  time  (RPA  11)  and  the

assignment time (RPA 1 ... 11) in percent.

Setup rate

The setup rate is the relation between the setup time/costs (RPA 7) and the assignment time (RPA

1...11) in percent.

BDE-MAB_81.docx

Version: 1.0.18468

Page 20 of 65

111:.BMK11:ANR.EGR*0.100nBMKnEGRANRNGRAD

Monitoring of Shop Floor Data

"Order progress" detail application

The "order progress" detail application shows all operations pertaining to the  above selected order at  a

glance.

Provided  that  several  orders  are  selected  in  the  order  overview,  all  operations  of  these  selected  orders

are displayed here. In this case, it is recommendable to show the "order" column.

"Status" category

Status

The bitmap (“LED”) defined in the status configuration is displayed as operation status.

In the HYDRA standard the color of the status LED corresponds to the one of the control LED.

Status text

The status text results from the current status of the operation.

Status since

Time since that the current status has been pending.

The field is empty for prepared operations.

Predecessor status

Status of the predecessor operation. Here, it can be recognized whether the predecessor operation

has already been started and thus material, which will be further processed in the current operation,

has already been processed or produced.

Secondary status

Displays the currently set secondary status.

Please note: Secondary statuses are optionally configured and used while HYDRA is customized.

"Order" category

Order

Number of the corresponding order

"Operation" category

Shows specific data for operations.

Note

Short text of the first note of an operation.

"Primary quantity/secondary quantity/tertiary quantity" category

Target quantity

Quantity specification for the operation.

BDE-MAB_81.docx

Version: 1.0.18468

Page 21 of 65

Monitoring of Shop Floor Data

Yield

The yield entered at the terminal or console/MOC is displayed in the yield column.

Scrap

The scrap entered at the terminal or console/MOC is displayed in the "scrap" column.

Rework

Quantity that has to be reworked.

Problem quantity

The problem quantity represents another quantity account.

Unit

Quantity unit of the displayed values.

The quantities listed here are displayed as base, primary, secondary and tertiary quantity. In the

majority  of  cases,  it  is  reasonable  to  have  only  one  of  these  quantity  types  displayed.  The

primary quantity is the quantity type in which values are entered at the terminal.

"Postings" category

First logon

Date/time when the operation is logged on first

Last interruption

Date/time when the operation was interrupted at last

Last logoff

Date/time when the operation was logged off at last

Last logon

Date/time when the operation is logged off at last

"Specifications for production" category

Tool, DNC, material

The component list shows the components that are assigned to the operation

Relevant fields are:

Planned workplace

Workplace on which the operation is planned.

Planned for

The "planned" column shows whether the operation is planned

G

M

on a group (pool of groups) or

on a workplace (pool of workplaces/machines).

BDE-MAB_81.docx

Version: 1.0.18468

Page 22 of 65

Monitoring of Shop Floor Data

Group

Group which the operation is planned for.

"Dates" category

Date specifications for the operation

"Miscellaneous" category

Upload number

Upload number of the operation

"Target times" category

Default target time specifications for the operation

Additionally calculated fields:

Total setup time

Total of target setup time, additional setup time and target dismantling/teardown time.

Planned execution time

Sum total of the target setup time (total) and target processing time.

"Actual times" category

Setup time

Posted setup time of the operation.

Execution time

Sum total of the total setup time and processing time.

Processing time

Posted processing time (RPA 11) of the operation.

Downtime

Posted downtime of the operation

Total of downtimes (RPA 1..6, RPA 8..10)

Assignment time

The  assignment  time  is  the  total  of  the  setup  time  (RPA  7),  processing  time  (RPA  11)  and

downtimes (RPA 1...6, RPA 8...10).

Lead time

Posted assignment time of the operation. The lead time results from the period of time between the

first logon of an operation and the last logoff of the operation.

BDE-MAB_81.docx

Version: 1.0.18468

Page 23 of 65

Monitoring of Shop Floor Data

Remaining run time

Still remaining production time. This is a calculatory value that is calculated by a formula based on

different parameters. The formula is defined in the operation. (RRT 1)

Remaining run time 2

Still remaining production time. This is a calculatory value that is calculated by a formula based on

different parameters. The formula is defined in the operation. (RRT 2)

Processing category

In addition to further target specifications for the operation, the actual cycle relating to operations is also

provided here.

Actual cycle

The actual cycle is calculated and displayed as follows:

1) OP prepared: By definition, the actual cycle is = 0

2) Provided that the OP is logged on, the actual cycle is the current actual cycle from machine data

collection  (depends  on  the  machine  connection).  This  one  is  also  displayed  in  the  application

workplaces/machines.

3) An average cycle time is calculated when an operation is interrupted or logged off/finished. This

average cycle time results from the division of the previously posted production time (RPA 11) by

the  previously  recorded  strokes  .  Only  these  order  postings  result  in  a  calculation  (this  is  not  the

case, for example, after changes have been made in the maintenance of postings).

User fields of the operation/order header

It is possible to display the user fields of operations and order headers in tables. It is necessary to use a

certain  user  field  configuration  for  the  structure  of  the  columns  as  orders  with  different  user  field

configurations can be displayed simultaneously in the order overview:

Operation: Object AGNR, user field key SYSTEM

Order header: Object AUNR, user field key SYSTEM

A  category  is  generated  for  user  fields  in  the  table.  All  defined  columns  are  initially  generated  in  the

relevant category. The position and whether or not these columns should be visible  can be edited using

the column configurator. The entries are configured while HYDRA is customized.

Toolbar

The function authorization required to execute the relevant function is entered in parentheses.

BDE-MAB_81.docx

Version: 1.0.18468

Page 24 of 65

Monitoring of Shop Floor Data

"Order" tab

 Order status (function authorization: or.statchg)

Function to change the order status

 Update order (function authorization: or.actualize)

The "update order" function allows for one or several selected orders to be updated.

 Schedule order (function authorization: or.terminate)

The "schedule order" function allows for one or several selected orders to be scheduled.

  Order information (function authorization: orin)

  Calling up the order information

"Operation" tab

 Order status (function authorization: op.statchg)

Function to change the operation status

  Secondary status (function authorization: op.secstatchg)

Function to change the secondary status of an operation

  Change resource status (function authorization: op.resstatchg)

Function to change the resource status of an operation

   Lock operation (function authorization: op.lock)

The lock operation button allows for one or several selected operations to be blocked

   Unlock operation (function authorization: op.unlock)

The unlock operation button allows for one or several selected operations to be unlocked

Please note

If the HYDRA module MPL (material  and production logistic)  is used batch-related  order postings

cannot be carried out at the HYDRA console/MOC due to their complexity.

   Log on (function authorization: op.logon)

Operations can be logged on to the system using the "log on“ function

BDE-MAB_81.docx

Version: 1.0.18468

Page 25 of 65

Monitoring of Shop Floor Data

   Partial confirmation/upload (function authorization: op.partconf)

The "partial upload" function allows for partial uploads on operations to be recorded in the system

   Interrupt (function authorization: op.interrupt)

Operations can be interrupted in the system using the "interrupt“ function

Log off (function authorization: op.logoff)

Operations can be logged off from the system using the "log off“ function

   Terminate (function authorization: op.finish)

Interrupted or prepared operations can be logged off from the system using the "terminate“ function

   Reactivate (function authorization: op.reactivate)

Terminated operations can be reactivated in the system using the "reactivate“ function

"Person" tab

Please note

The  functions  relating  to  operations  “log  on/interrupt/log  off“  are  to  be  used  for  posting  data  to  group

workplaces.

   Log person on (function authorization: pn.logon)

A person may be logged on to an operation/machine using the log person on function

    Log person off (function authorization: pn.logoff)

A  person  may  be  logged  off  from  the  corresponding  operation/machine  using  the  log  person  off

function

BDE-MAB_81.docx

Version: 1.0.18468

Page 26 of 65

Monitoring of Shop Floor Data

4  Order Shift Log

Summary

Menu

Order Management --> Production Reports --> Order Shift Log

Transaction code

ospr

Function authorization

ospr

Utilization

The  order  shift  log  is  a  must  for  every  shift  supervisor  and  foreman.  It  provides  information  that  people

who are in charge of production need for their daily reports.

The order shift log is a function for production management. The individually configurable user interface

presents shift-specific order data in a clear and comprehensive way.

The shift log analyses the collected order data (quantities and times) in relation to the entered shifts.

Integration

The  order  shift  log  shows  all  operations  that  meet  the  restrictions  made  in  the  selection  panel.  In  this

context, only BDE log records of the record type “U” and “E” are taken into account.

This  function  provides  the  operations  that  are  produced  within  one  shift.  In  addition  to  the  produced

quantities,  the  times  that  have  accrued  accordingly  are  displayed  as  well.  This  applies  to  each  order  /

operation.

The postings relating to HYDRA-BDE function allows for the recorded order data to be corrected.

Selection criteria

The application provides the following selection criteria. When data is requested, the responsibility area of

the workplace which the BDE log records have been posted onto is checked.

Date from ... to ...

The entered period of time restricts the selection of log records. Log records the start date of which

(logon date) coincides with the specified period of time are selected.

Default setting from "yesterday" until "today". The calculation is based on the Gregorian calendar.

Shift: all, 1, 2, 3, 4

Within  the  entered  period  of  time  only  those  log  records  are  selected  that  are  assigned  to  the

entered shift according to the shift model.

BDE-MAB_81.docx

Version: 1.0.18468

Page 27 of 65

Monitoring of Shop Floor Data

Operations logged on to the current shift at the time of data selection are not taken

into consideration, as log records have not yet been generated for them.

Workplace from... to ...

Those log records are selected that are posted onto the entered workplace and which the user is

authorized  for  via  the  responsibility  area  of  the  workplace.  It  is  possible  to  use  wildcards  in  the

“from” field.

Group from ... to ...

Those log records are selected that are posted on workplaces which the user is authorized for via

the responsibility area of the workplace and that are assigned to the specified group. It is possible

to use wildcards in the “from” field.

Cost center

Those log records are selected that are posted onto workplaces that the user is authorized for via

the  responsibility  area  of  the  workplace  and  that  are  assigned  to  the  specified  cost  center.

Wildcards may be used.

Report group

Report group

Order

Those log records are selected that are posted onto the specified order.

Operation

Those log records are selected that are posted onto the specified operation.

Article

Those log records are selected that are posted onto operations with the specified article.

Tool

Those log records are selected that are posted onto operations with the specified tool.

"Order shift log" detail application

The table shows the following fields

"Shift" category

Shift date

Shift date of the shift in which the operation was produced. (Basis: BDE log record)

Shift

Shift in which the operation was produced. (Basis: BDE log record)

BDE-MAB_81.docx

Version: 1.0.18468

Page 28 of 65

Monitoring of Shop Floor Data

"Order" category

Category

Order  category  of  the  order/operation,  e.g.  production  order  (FA)  or  overhead  cost  order  (GK).

(Basis: pool of orders).

Order type

Order type of the order. (Basis: pool of orders)

Order

Order number of the order/operation. (Basis: pool of orders)

Sequence

Sequence number of the operation. (Basis: pool of orders, subject to customizing/configuration)

Operation

Operation number of the operation. (Basis: pool of orders)

Split

Split number of the operation, provided that it is a split operation. (Basis: pool of orders, subject to

customizing/configuration).

Operation designation

Designation of the operation. (Basis: pool of orders)

Article, article designation

Article number and article designation of the operation. (Basis: pool of orders)

"Workplace" category

Workplace, group, cost center

In addition to the order number and article number, the workplace (including group and cost center

of  the  workplace)  is  displayed  on  which  this  operation  was  produced  within  the  selected  shift.

(Basis: workplace: BDE log record; group, cost center: workplace/resource master data)

"Primary quantity" category

Target quantity

Total target quantity of the operation in the relevant quantity unit (primary quantity unit, secondary

quantity unit, tertiary quantity unit, base quantity unit; basis: pool of orders).

This  column  is  not  added  up.  Since  totals  formation  is  not  correct  if  one  and  the

same operation is produced during several shifts.

BDE-MAB_81.docx

Version: 1.0.18468

Page 29 of 65

Monitoring of Shop Floor Data

Target quantity per shift

This  field  includes  the  theoretical  target  quantity  for  the  posting.  The  duration  of  the  posting  may

even  be  shorter  than  the  shift  duration  if  the  operation,  for  example,  was  not  logged  on  over  the

entire shift. If the OP is logged on over the entire shift, the target quantity will be calculated for each

shift; otherwise the target quantity will only be calculated for the shorter posting period.

Yield

The yield posted onto this operation – relating to the selected shift. (Basis: BDE log record).

Scrap

The scrap posted onto this operation – relating to the selected shift. (Basis: BDE log record).

Rework

The  rework  quantity  posted  onto  this  operation  –  relating  to  the  selected  shift.  (Basis:  BDE  log

record)

Open quantity

Open quantity posted onto this operation – relating to the selected shift. (Basis: BDE log record)

Quantity unit

Corresponding quantity unit. (Basis: BDE log record)

"Duration" category

Target duration

The total target duration based on operations is determined as follows: (Basis: pool of orders)

((Target  cycle  of  the  operation  [per  1000])  /  1000  /  the  operation's  partitioning  *  target  quantity  of

the operation in primary quantity unit) + setup time of the operation

This  column  is  not  added  up.  Since  totals  formation  is  not  correct  if  one  and  the

same operation is produced during several shifts.

Production

The  production  time  recorded  on  this  operation  -  relating  to  the  selected  shift.  (Basis:  BDE  log

record)

Downtime

The downtime recorded on this operation - relating to the selected shift. (Basis: BDE log record)

Sum

Total of the accrued production time and downtime (total of the columns "production + downtime")

BDE-MAB_81.docx

Version: 1.0.18468

Page 30 of 65

TLGANRSZYANRBMKEGRANR.*0.1000.:.SSKGUT1101

Monitoring of Shop Floor Data

"RPA" category

RPA

Detailed  presentation  of  times  recorded  on  the  level  of  resource  performance  accounts  .  (Basis:

BDE log record) .

"Key figures" category

Rate of capacity utilization

Output rate

Scrap rate

Assignment utilization rate

Machine category

Target cycle

Time need that is planned for 1000 production cycles of the machine. This value is the default value

for HYDRA-MDE machine monitoring (cycle monitoring).

Actual cycle

Partitioning

Integer value that defines the number of parts which are produced with a clocked pulse.

Total cycles

Total cycles

BDE-MAB_81.docx

Version: 1.0.18468

Page 31 of 65

1101:.BMK11:ANR.EGR*0.100BMKEGRANRNGRADSZYANRTLGANRBMKEGRANRGUTPEGRANR.*.*:.*0.1000:.*0.100AUSBGD1101AUSPEGRANRGUTPEGRANRAUSPEGRANRAQUOTE:.:.:.*0.100HUBGEGRANR:.BMK11:ANR.EGR*0.1000IZYCLC11:.10:.09:.08:.05:.04:.03:.02:.01:.BMK11:ANR.EGR*0.100BMKEGRANRBMKEGRANRBMKEGRANRBMKEGRANRBMKEGRANRBMKEGRANRBMKEGRANRBMKEGRANRBMKEGRANRBNGRAD

Monitoring of Shop Floor Data

Please note

Display of actual quantities and actual durations (RPA)

No shift automatic takes place for workplaces that are either not assigned to a terminal or that are

assigned to a terminal configured as terminal of the shop floor data collection module (HYDRA-BDE

terminal). This means that when the shift ends, orders or staff are not posted automatically. As in

this  case,  quantities  and  times  cannot  exactly  be  assigned  to  a  shift,  they  are  assigned

proportionally in the shift log. This assignment is based on the shift calendar of the workplace.

Example:

Given is a shift model with shift 1: 6.00 am  – 2.00 pm and shift 2: 2.00 pm – 10.00 pm. This shift

model is assigned to a workplace matching the above-mentioned criteria. Moreover, an operation is

logged on at 1.00 pm and an operation is logged off at 4.00 pm. 90 is confirmed/uploaded as yield

when the operation is logged off.

Consequently, the shift log determines an order time of 60 minutes and yield “30” for the operation

of  shift  1.  Shift  2  has  an  order  time  of  120 minutes  and  yield  “60”.  The  times relating  to  RPA  are

also determined based on the shift model of the workplace.

Operations logged on to the current shift at the time of data selection are not taken

into consideration, as log records have not yet been generated for them.

"Durations by article" detail application

The detail application “bar chart – durations” shows the posted durations accumulated on the article level.

In  this  context,  the  operations  selected  in  the  detail  application  “order  shift  log”  are  taken  into

consideration.

The  bar  chart  shows  the  article  numbers  of  the  selected  operations  on  the  y-axis  and  absolute  values

(durations)  are  displayed  on  the  x-axis.  The  bar  color  is  based  on  the  respective  quantity  account

(production  /  RPA  11:  green,  downtimes  /  RPA  1-11:  red).  Sorting  is  effected  in  descending  order  by

production duration.

Using a multi combo box, it can be defined for which durations the bars are to be displayed:

- Production

- Downtimes

They are displayed in a “stacked” manner in order for the overall quantity to be  defined according to the

user’s requirements.

By checking the “show labels” option, the  values are  displayed on the  bars. In this context,  it has to be

taken into account that these labels are displayed for each selected duration.

BDE-MAB_81.docx

Version: 1.0.18468

Page 32 of 65

Monitoring of Shop Floor Data

"Quantities by article" detail application

The  detail  application  “quantities  by  article”  shows  the  posted  quantities  (accumulated  on  the  article

level).  In  this  context,  the  operations  selected  in  the  detail  application  “order  shift  log”  are  taken  into

consideration.

The  bar  chart  shows  the  article  numbers  of  the  selected  operations  on  the  y-axis  and  absolute  values

(quantities) are displayed on the x-axis. Sorting is effected in descending order by production duration.

Toolbar

In general, the parameters for calling the function or target application are taken over from the table. For

this reason, an entry should always be selected before calling an application.

 Order information

This button opens the application order information.

 Order overview

This button opens the application order overview.

BDE-MAB_81.docx

Version: 1.0.18468

Page 33 of 65

Monitoring of Shop Floor Data

5  Pool of Orders

Summary

Menu

Production control --> Planning aid --> Pool of orders

Transaction code

plop

Function authorization

plop

Utilization

The pool of orders application is the most important dialog for the shift foreman, supervisor and foreman.

The pool of orders function is a tool that provides users with a selection of operations, categorized clearly,

each of which can be found in the pool for a machine or group.

Integration

All orders that match the selections entered are displayed in the pool of orders.

Generally,  only  unplanned  and  planned  operations  are  displayed  in  the  pool  of  orders.  From  system's

standpoint,  in  this  case  they  are  operations  that  are  marked  with  the  control  indicators  V,  U  or  S.

Typically, they are operations with an operation status "prepared", "interrupted" or "not free" (depending

on the project).

The following detail applications are an integral part of the pool of orders:

  Pool of orders

  Running operations

  Finished operations

Selection criteria

The following selection criteria are available in the application:

Workplace from... to ...

This  selection  criterion  refers  to  the  workplace  defined  in  the  operation.  All  operations  are

displayed  that  are  assigned  to  the  selected  workplaces.  You  can  also  run  a  search  using

wildcards.

BDE-MAB_81.docx

Version: 1.0.18468

Page 34 of 65

Monitoring of Shop Floor Data

Group from ... to ...

This selection criterion refers to the group defined in the operation. All operations are displayed

that  are  assigned  to  the  selected  group,  irrespective  of  whether  they  are  already  planned  in

detail for a workplace or not. You can also run a search using wildcards.

Planned for

You  can  use  this  option  to  restrict  whether  you  would  like  to  display  operations  that  have

already  been  planned  in  detail  for  a  workplace  or  only  operations  that  are  still  in  the  pool  of

groups.

The column "planned for" displays whether the operation is planned

  G for a group (pool of groups), or

  M for a workplace (workplace/ machine pool)

Order

Article

This  selection  criterion  refers  to  the  order  number.  Operations  are  displayed  that  contain  the

order number entered. You can also run a search using wildcards.

This  selection  criterion  refers  to  the  article  in  the  operation.  All  operations  are  displayed,  to

which the article entered has been assigned. You can also run a search using wildcards.

Article designation

This selection criterion refers to the article in the operation. All operations are displayed that match

the article designation entered. You can also run a search using wildcards

Operation status

Current operation status

Predecessor status

Status of the preceding operation.

Control

The current production indicator for the operation

Category

This selection criterion refers to the order type category of the operation. Only those operations

are displayed with an order type that matches the category entered.

Order type

This selection criterion refers to the order type of the operation. Only operations are displayed

that have the order type selected.

BDE-MAB_81.docx

Version: 1.0.18468

Page 35 of 65

Monitoring of Shop Floor Data

Processing code

This  selection  criterion  refers  to  the  processing  code  at  the  operation.  Only  operations  are

displayed that contain the processing code selected. You can also run a search using wildcards.

Priority

OP

Tool

This selection criterion refers to the priority of the operation. Only operations are displayed that

have the priority selected.

This selection criterion refers to the operation number. Operations are displayed that have the

operation number entered. You can also run a search using wildcards

This selection criterion refers to the tool used in the operation. All operations are displayed that

have been assigned with the tool entered. You can also run a search using wildcards.

Show split OPs

If this box is checked, split operations are also displayed.

Customer name

This  selection  criterion  refers  to  the  customer  designation  defined  in  the  operation.  All  orders

are displayed that contain the customer designation selected.

Cost center

This  selection  criterion  refers  to  the  cost  center  of  the  workplace  defined  in  the  operation.  All

operations  are  displayed  that  are  assigned  to  the  selected  cost  center.  You  can  also  run  a

search using wildcards.

Planned start between ... and

This selection criterion refers to the planned start date defined in the operation. Only operations

are displayed that are planned on or between the selected planned start date. Whether they are

planned in detail to a workplace or are still in the pool of groups is irrelevant.

Scheduled start between ... and

This selection criterion refers to the scheduled start date of the operation. Only operations are

displayed that are planned on or between the selected scheduled start date.

Earliest start between ... and

This  selection  criterion  refers  to  the  earliest  start  date  of  the  operation.  Only  operations  are

displayed that are planned on or between the selected earliest start date.

Latest end between ... and

This  selection  criterion  refers  to  the  latest  end  date  of  the  operation.  Only  operations  are

displayed that are planned on or between the selected latest end date.

BDE-MAB_81.docx

Version: 1.0.18468

Page 36 of 65

Monitoring of Shop Floor Data

Actual start between ... and

This selection criterion refers to the start date of the order. Only operations are displayed with

an order start that is on or between the selected date.

Actual end between ... and

This selection criterion refers to the finish date of the order. Only operations are displayed with

an order end that is on or between the selected date.

Basic start date between ... and

This selection criterion refers to the basic start date of the order. Only operations are displayed

with a basic start date for an order that is on or between the selected date.

Basic end date between ... and

This selection criterion refers to the basic end date of the order. Only operations are displayed

with a basic end date for an order that is on or between the selected date.

Sales order

This selection criterion refers to the sales order defined in the order header. All operations are

displayed that contain the selected sales order.

Order index from ... to

This selection criterion refers to the order index in the order header. All operations are displayed

that have an order index defined in the order header that matches the selected order index.

Planned order

This selection criterion refers to the planned order number from SAP that is defined in the order

header.

Project number

This selection criterion refers to the project number in the operation. All operations are displayed

that are assigned to the selected project number.

Order group

This  selection  criterion  refers  to  the  order  group  in  the  order  header.  All  operations  are

displayed with an order group in the order header that is assigned to the  selected order group.

You can also run a search using wildcards.

MRP controller

This selection criterion refers to the MRP controller defined in the order header. All operations

are  displayed  with  an  MRP  controller  in  the  order  header  that  matches  the  MRP  controller

entered. You can also run a search using wildcards.

MOP

Restricted to a merged operation.

You can also run a search using wildcards.

BDE-MAB_81.docx

Version: 1.0.18468

Page 37 of 65

Monitoring of Shop Floor Data

Show MOP

Definition of the merged operations to be displayed.

Initially,  merged  operations  and  individual  operations  are  displayed;  operations  combined  into

an MOP are not displayed.

In  this  application,  the  responsibility  area  of  the  planned  operations  is  checked  against  the

workplace, which they are planned for.

"Pool of orders" detail application

The following fields are displayed in the table

"Status" category

Status

The bitmap ("LED") defined in the status configuration is displayed under status.

In this column, the number of operations is displayed in the total line.

Status text

The status text is based on the current status of the operation.

Status since

Information shown as of when the corresponding status was set.

Predecessor status

Status  of  the  preceding  operation.  It  shows  whether  the  preceding  operation  was  already  started

and if as a result, material was already processed or produced that is now being further processed

in the current operation.

Secondary status

The currently set secondary status is displayed here.

The  ability  to  configure  and  use  the  secondary  status  is  offered  as  another  option  for

customized systems.

"Order" category

Specific data is displayed here for operations and orders.

Relevant fields are:

BDE-MAB_81.docx

Version: 1.0.18468

Page 38 of 65

Monitoring of Shop Floor Data

Order type

Order type displayed as text and icon.

The order types available in HYDRA standard are described in the glossary. Additional order types

can be defined during the HYDRA customizing process.

Order

The number for each order.

Sequence

Order sequence (only relevant when using sequences).

OP

Split

The number for each operation.

Split number, if the operation is split.

Current number of splits

Number of splits in an operation, if the operation was split.

Note

Short text of the first note of an operation.

Printed

This column shows if the corresponding time ticket has already been printed.

"Specifications for production" category

Fields relevant to this are:

Planned workplace

Workplace at which the operation is planned.

Planned for

Displayed in the column ”planned" is whether the operation is planned as

G

M

Group

at a group (pool of groups), or

at a workplace (pool of workplaces/ machines).

Group for which the operation is planned.

"OP dates" category

Date specifications for the operation

BDE-MAB_81.docx

Version: 1.0.18468

Page 39 of 65

Monitoring of Shop Floor Data

"Remaining run time" category

Remaining run time

Production  time  that  still  remains.  This  is  a  calculated  value  that  is  determined  using  a  formula

based on various parameters. The formula is defined at the operation.

"Target times" category

Default target time specifications for the operation

Additionally calculated fields:

Total setup time

The sum of setup time, additional setup time and dismantling time.

Target execution time

The sum total made up of total setup time and processing time.

"Primary quantity/secondary quantity/tertiary quantity" category

Target quantity

Quantity defined for the operation

Yield

Yield posted onto the operation.

Scrap

Scrap posted onto the operation.

Rework

The quantity that still has to be reworked and that is posted onto the operation.

Problem quantity

The problem quantity posted onto the operation.

Unit

Quantity unit for the values displayed.

The quantities listed here are displayed as basic, primary, secondary and tertiary quantities. In

most cases, you can only display one of these quantity types. The quantity type used to enter

quantities at the terminal is the primary quantity.

Toolbar

 Shop floor papers

Print shop floor papers function

BDE-MAB_81.docx

Version: 1.0.18468

Page 40 of 65

Monitoring of Shop Floor Data

 Time ticket

Print time tickets function

 Generate merged operation

Generate merged operation function

Selected operations are consolidated to a single merged operation. The consolidated operation is

representatively logged on and displayed at the terminal.

 Cancel merged operation

Cancel merged operation

The merged operation is broken up into separate operations.

 Order information

This button opens the application order information.

 Order overview

This button opens the application order overview.

 Schedule controlling: save baseline plan

Schedule controlling: save baseline plan function

BDE-MAB_81.docx

Version: 1.0.18468

Page 41 of 65

Monitoring of Shop Floor Data

6  Operations Logged On

Summary

Menu

Production  control
(operations logged on)

-->  Production  overview

-->  Running  operations

Transaction code

rop

Function authorization

rop

Utilization

The "running operations" function shows the currently running and automatically interrupted (by change of

shift) operations (with the control indicators L, F).

Please note in this context that registered operations (status "running") are only shown by their

workplace  to  which  they  are  logged  on  if  the  option  "Show  the  operations  logged  on  for  each

workplace" is set.

Selection criteria

The application provides the following selection criteria:

Workplace from... to ...

This  selection  criterion  refers  to  the  workplace  planned  for  the  operation.  All  operations

assigned to the selected workplaces are displayed. It is possible to use wildcards.

For  operations  that  are  logged  on,  this  is  not  the  workplace  which  the  operation  is

currently logged on to but the workplaces which the operation is planned for.

Group from ... to ...

This  selection  criterion  refers  to  the  group  that  is  planned  for  the  operation.  All  operations

assigned to the selected group are displayed. It is possible to use wildcards.

For  operations  that  are  logged  on,  this  is  not  the  group  of  the  workplace  which  the

operation is currently logged on to but the group which the operation is planned for.

Planned for

This  option  allows  for  the displayed  operations  to  be  restricted  to  operations  that  have  initially

been planned for a workplace or a group.

BDE-MAB_81.docx

Version: 1.0.18468

Page 42 of 65

Monitoring of Shop Floor Data

Order

Article

This  selection  criterion  refers  to  the  order  number.  Operations  assigned  to  the  specified  order

number are displayed. It is possible to use wildcards.

This  selection  criterion  refers  to  the  article  in  the  operation.  All  operations  assigned  to  the

specified article are displayed. It is possible to use wildcards.

Article designation

This selection criterion refers to the article in the operation. All operations assigned to the specified

article designation are displayed. Wildcards can be used.

Operation status

Current operation status

Predecessor status

Status of the predecessor operation.

Control

Current production flag of the operation

Category

This selection criterion refers to the category of the operation's order type. Only operations are

displayed the order types of which match the specified category.

Order type

This selection criterion refers to the order type of the operation. Only operations assigned to the

selected order type are displayed.

Processing code

This selection criterion refers to the processing code of the operation. Only operations assigned

to the selected processing code are displayed. It is possible to use wildcards.

Priority

OP

Tool

This  selection  criterion  refers  to  the  priority  of  the  operation.  Only  operations  assigned  to  the

selected priority are displayed.

This  selection  criterion  refers  to  the  operation  number.  Operations  assigned  to  the  entered

operation number are displayed. It is possible to use wildcards.

This selection criterion refers to the tool in the operation. All operations assigned to the specified

tool are displayed. It is possible to use wildcards.

Show split OPs

If this checkbox is checked split operations are displayed additionally.

BDE-MAB_81.docx

Version: 1.0.18468

Page 43 of 65

Monitoring of Shop Floor Data

Customer designation

This  selection  criterion  refers  to  the  customer  designation  defined  in  the  operation.  All  orders

including the selected customer designation are displayed.

Cost center

This  selection  criterion  refers  to  the  cost  center  of  the  workplace  defined  in  the  operation.  All

operations assigned to the selected cost center are displayed. It is possible to use wildcards.

Planned start between ... and

This selection criterion refers to the planned start date defined in the operation. Only operations

which are planned on or between the selected planned start dates are displayed.

Scheduled start between ... and

This  selection  criterion  refers  to  the  scheduled  start  date  of  the  operation.  Only  operations

planned on or between the selected scheduled start dates are displayed.

Earliest start between ... and

This  selection  criterion  refers  to  the  earliest  start  date  of  the  operation.  Only  are  operations

displayed, which are planned on or between the selected earliest start dates.

Latest end between ... and

This selection criterion refers to the latest end date of the operation. Only operations planned on

or between the selected, latest end dates are displayed.

Actual start between ... and

This  selection  criterion  refers  to  the  start  date  of  the  order.  Only  operations  are  displayed  the

order start of which is planned on or between the selected dates.

Actual end between ... and

This  selection  criterion  refers  to  the  end  date  of  the  order.  Only  operations  are  displayed  the

order end of which is planned on or between the selected dates.

Basic start date between ... and

This selection criterion refers to the basic start date of the order. Only operations are displayed

whose basic start time of the order is planned on or between the selected dates.

Basic end date between ... and

This selection criterion refers to the basic end date of the order. Only operations are displayed

whose basic end time of the order is planned on or between the selected dates.

Sales order

This  selection  criterion  refers  to  the  sales  order  defined  at  the  order  header.  All  operations

assigned to the selected sales order are displayed.

Order index from ... to

This selection criterion refers to the order index defined at the order header. All operations are

displayed whose order index at the order header matches the selected order index.

BDE-MAB_81.docx

Version: 1.0.18468

Page 44 of 65

Monitoring of Shop Floor Data

Planned order

This selection criterion refers to the planned order number from SAP that is defined in the order

header.

Project number

This selection criterion refers to the project number in the operation. All orders that are assigned

to the selected project number are displayed.

Order group

This  selection  criterion  refers  to  the  order  group  at  the  order  header.  All  operations  are

displayed whose order group at the order header is assigned to the selected order group. It is

possible to use wildcards.

MRP controller

This selection criterion refers to the MRP controller defined for the order header. All operations

are  displayed  whose  MRP  controller  of  the  order  header  corresponds  to  the  entered  MRP

controller. It is possible to use wildcards.

MOP

Restricts the merged operations that are displayed. Wildcards can be used.

MOP display

Defines  the  merged  operations  to  be  displayed.  At  first,  merged  operations  and  individual

operations are displayed. Operations summarized in an MOP are not displayed.

Show the operations logged on for each workplace

If this option is checked, an operation that is currently being logged on to multiple workplaces will

be shown as many times as it is logged on.

The category "logged on to workplace" (hidden by  default) shows information about the workplace

which the operation is logged on to.

In  this  application,  the  responsibility  area  of  the  planned  operations  is  checked  against  the

workplace which they are planned for.

"Running operations" detail application

The  table  shows  the  below-mentioned  fields,  amongst  other  things.  Information  on  further  fields  can  be

found in the documents dealing with

  data about the backlog of orders



current data and key figures on the operation

BDE-MAB_81.docx

Version: 1.0.18468

Page 45 of 65

Monitoring of Shop Floor Data

"Status" category

Status

The bitmap (“LED”) defined in the status configuration is displayed as status.

The number of operations is displayed in this column within the totals line.

Status text

The status text results from the current status of the operation.

Status since

Informs about the time since when the corresponding status is set

Predecessor status

Status of the predecessor operation. Here, it can be recognized whether the predecessor operation

has already been started and thus material, which will be further processed in the current operation,

has already been processed or produced.

Secondary status

Displays the currently set secondary status.

Secondary statuses are configured and used optionally while customizing HYDRA.

.

"Order" category

Displays specific data for operations and orders.

Relevant fields are:

Order type

Displays the order type as text and symbol. The order types of the HYDRA standard are described

in the glossary. Further order types can be defined while customizing HYDRA.

Category

The category summarizes similar order types. The following categories are available in HYDRA:

FA = production order

PJ = project order

PM = maintenance order

KP = capacity order

GK = overhead cost order

Order

Number of the corresponding order

BDE-MAB_81.docx

Version: 1.0.18468

Page 46 of 65

Monitoring of Shop Floor Data

Sequence

Order sequence (only relevant if sequences are used)

OP

Split

Number of the respective operation

Split number provided that it is a split operation.

Current number of splits

Number of splits of an operation, provided that this one has been split.

Note

Short text of the first note of an operation.

Printed

This column shows whether the corresponding time ticket has already been printed.

"Specifications for production" category

Relevant fields are:

Planned workplace

Workplace on which the operation is planned.

Planned for

The "planned" column shows whether the operation is planned

G

M

Group

on a group (pool of groups) or

on a workplace (pool of workplaces/ machines).

Group which the operation is planned for.

"OP dates" category

Date specifications for the operation

"Remaining run time" category

Remaining run time

Still  remaining  production  time.  This  is  a  calculatory  value  that  is  calculated  by  a  formula  on  the

basis of different parameters. The formula is defined in the operation.

"Target times" category

Default target time specifications for the operation

BDE-MAB_81.docx

Version: 1.0.18468

Page 47 of 65

Monitoring of Shop Floor Data

Additionally calculated fields:

Total setup time

Total of setup time, additional setup time and dismantling/teardown time.

Planned execution time

Sum total of the total setup time and processing time.

"Primary quantity/secondary quantity/tertiary quantity" category

Target quantity

Quantity specification for the operation.

Yield

The yield entered at the terminal or console/MOC is displayed in the yield column.

Scrap

The scrap entered at the terminal or console/MOC is displayed in the "scrap" column.

Rework

Quantity that has to be reworked.

Problem quantity

The problem quantity is another quantity account.

Unit

Quantity unit of the displayed values.

The quantities listed here are displayed as base, primary, secondary and tertiary quantity. In the

majority  of  cases,  it  is  reasonable  to  have  only  one  of  these  quantity  types  displayed.  The

primary quantity is the quantity type in which values are entered at the terminal.

"Postings" category

First logon

Date and time when the operation was logged on for the first time.

Last logoff

Date  and  time  when  the  operation  was  logged  off  the  last  time.  This  kind  of  information  can  be

interesting if an operation was reactivated.

Date of last posting

Date of the last posting made for this operation.

Time of last posting

Time of the last posting made for this operation.

BDE-MAB_81.docx

Version: 1.0.18468

Page 48 of 65

Monitoring of Shop Floor Data

"Logged on to workplace" category

The  below-mentioned  fields  pertaining  to  this  category  are  only  filled  out,  provided  that  the

option "Show the operations logged on for each workplace" has been set.

Workplace

Workplace to which the operation is currently being logged on.

Short name

Short name of the workplace

Designation

Designation of the workplace

Group

Group of the workplace

Cost center

Cost center of the workplace

Toolbar

In general, the parameters for calling the function or target application are taken over from the table. For

this reason, an entry should always be selected before calling an application.

 Order information

This button opens the application order information.

 Order overview

This button opens the application order overview.

BDE-MAB_81.docx

Version: 1.0.18468

Page 49 of 65

Monitoring of Shop Floor Data

7  Finished Operations

Summary

Menu

Order Management --> Production Reports --> Finished Operations

Transaction code

fop

Function authorization

fop

Utilization

The  "finished  operations"  application  provides  the  shift  leader,  supervisor  or  foreman  with  a  clearly

categorized selection of finished operations.

Integration

The application shows the operations, which were selected in the selection panel.

All  operations  assigned  to  the  production  flags  "E"  (finished"),  "A"  (archived)  and  "D"  (logically  deleted)

are displayed.

Selection criteria

The application provides the following selection criteria:

Workplace from... to ...

This  selection  criterion  refers  to  the  workplace  planned  for  the  operation.  All  operations

assigned to the selected workplaces are displayed. Wildcards can be used.

Group from ... to ...

This  selection  criterion  refers  to  the  group  that  is  planned  for  the  operation.  All  operations

assigned to the selected group are displayed. Wildcards can be used.

Planned for

This  option  allows  for  the displayed  operations  to  be  restricted  to  operations  that  have  initially

only been planned for a workplace or a group.

Order

Article

This  selection  criterion  refers  to  the  order  number.  Operations  assigned  to  the  specified  order

number are displayed. Wildcards can be used.

This  selection  criterion  refers  to  the  article  in  the  operation.  All  operations  assigned  to  the

specified article are displayed. Wildcards can be used.

BDE-MAB_81.docx

Version: 1.0.18468

Page 50 of 65

Monitoring of Shop Floor Data

Article designation

This selection criterion refers to the article in the operation. All operations assigned to the specified

article designation are displayed. Wildcards can be used.

Operation status

Current operation status

Predecessor status

Status of the predecessor operation.

Control

Current production flag of the operation

Category

This selection criterion refers to the category of the operation's order type. Only operations the

order types of which correspond to the specified category are displayed.

Order type

This selection criterion refers to the order type of the operation. Only operations assigned to the

selected order type are displayed.

Processing code

This selection criterion refers to the processing code of the operation. Only operations assigned

to the selected processing code are displayed. Wildcards can be used.

Priority

OP

Tool

This  selection  criterion  refers  to  the  priority  of  the  operation.  Only  operations  assigned  to  the

selected priority are displayed.

This  selection  criterion  refers  to  the  operation  number.  Operations  assigned  to  the  entered

operation number are displayed. Wildcards can be used.

This selection criterion refers to the tool in the operation. All operations assigned to the specified

tool are displayed. Wildcards can be used.

Show split OPs

If this checkbox is checked split operations are displayed additionally.

Customer designation

This  selection  criterion  refers  to  the  customer  designation  defined  in  the  operation.  All  orders

including the selected customer designation are displayed.

BDE-MAB_81.docx

Version: 1.0.18468

Page 51 of 65

Monitoring of Shop Floor Data

Cost center

This  selection  criterion  refers  to  the  cost  center  of  the  workplace  defined  in  the  operation.  All

operations assigned to the selected cost center are displayed. Wildcards can be used.

Planned start between ... and

This selection criterion refers to the planned start date defined in the operation. Only operations

planned on or between the selected planned start dates are displayed.

Scheduled start between ... and

This  selection  criterion  refers  to  the  scheduled  start  date  of  the  operation.  Only  operations

planned on or between the selected scheduled start dates are displayed.

Earliest start between ... and

This  selection  criterion  refers  to  the  earliest  start  date  of  the  operation.  Only  are  operations

displayed, which are planned on or between the selected earliest start dates.

Latest end between ... and

This  selection  criterion  refers  to  the  latest  end  date  of  the  operation.  Only  are  operations

displayed, which are planned on or between the selected latest end dates.

Actual start between ... and

This  selection  criterion  refers  to  the  start  date  of  the  order.  Only  are  operations  displayed  the

order start of which is planned on or between the selected dates.

Actual end between ... and

This  selection  criterion  refers  to  the  end  date  of  the  order.  Only  are  operations  displayed  the

order end of which is planned on or between the selected dates.

Basic start date between ... and

This selection criterion refers to the basic start date of the order. Only are operations displayed

whose basic start time of the order is planned on or between the selected dates.

Basic end date between ... and

This selection criterion refers to the basic end date of the order. Only are operations displayed

whose basic end time of the order is planned on or between the selected dates.

Sales order

This  selection  criterion  refers  to  the  sales  order  defined  at  the  order  header.  All  operations

assigned to the selected sales order are displayed.

Order index from ... to

This  selection  criterion  refers  to  the  order  index  defined  at  the  order  header.  All  operations

whose order index at the order header matches the selected order index are displayed

Planned order

This selection criterion refers to the planned order number from SAP that is defined in the order

header.

BDE-MAB_81.docx

Version: 1.0.18468

Page 52 of 65

Monitoring of Shop Floor Data

Project number

This selection criterion refers to the project number in the operation. All orders that are assigned

to the selected project number are displayed.

Order group

This selection criterion refers to the order group at the order header. All operations are shown

whose order group at the order header is assigned to the selected order group. Wildcards can

be used.

MRP controller

This selection criterion refers to the MRP controller defined at the order header. All operations

whose  MRP  controller  at  the  order  header  corresponds  to  the  specified  MRP  controller  are

displayed. Wildcards can be used.

MOP

Restricts the merged operations that are displayed. Wildcards can be used.

MOP display

Defines the merged operations to be used. At first merged operations and individual operations

are displayed. Operations summarized in an MOP are not displayed.

In  this  application,  the  responsibility  area  of  the  planned  operations  is  checked  against  the

workplace which they are planned for.

Detail application: Finished Operations

The table shows the following fields

"Status" category

Status

The bitmap (“LED”) defined in the status configuration is displayed as status.

The number of operations is displayed in this column within the totals line.

Status text

The status text results from the current status of the operation.

Status since

Informs about the time since when the corresponding status is set

Predecessor status

Status of the predecessor operation. Here, it can be recognized whether the predecessor operation

has already been started and thus material, which will be further processed in the current operation,

has already been processed or produced.

BDE-MAB_81.docx

Version: 1.0.18468

Page 53 of 65

Monitoring of Shop Floor Data

Secondary status

Displays the currently set secondary status.

Secondary statuses are configured and used optionally while customizing HYDRA.

If  an  X  is  displayed  here  it  is  an  operation  of  an  order  that  has  been  completed  technically  in

SAP.

"Order" category

Displays specific data for operations and orders.

Relevant fields are:

Order type

Displays  the  order  type  as  text  and  symbol.  The  order  types  within  the  HYDRA  standard  are

described in the glossary. Further order types can be defined while customizing HYDRA.

Order

Number of the respective order

Sequence

Order sequence (only relevant if sequences are used)

OP

Split

Number of the respective operation

Split number provided that it is a split operation.

Current number of splits

Number of splits of an operation provided that this one has been split.

Note

Short text of the first note of an operation .

Printed

This column shows whether the corresponding time ticket has already been printed.

"Specifications for production" category

Specifications for production with respect to the machine, tool, DNC, material for the operation.

"Target times" category

Default target time specifications for the operation

BDE-MAB_81.docx

Version: 1.0.18468

Page 54 of 65

Monitoring of Shop Floor Data

Additionally calculated fields:

Total setup time

Sum total of setup time, additional setup time and dismantling/teardown time.

Target execution time

Sum total of the total setup time and processing time.

"Processing" category

Default target specifications for the production of the operation

"Primary quantity/secondary quantity/tertiary quantity" category

Target quantity

Quantity specification for the operation.

Yield

The yield entered at the terminal or console/MOC is displayed in the yield column.

Scrap

The scrap entered at the terminal or console/MOC is displayed in the "scrap" column.

Rework

Quantity that has to be reworked.

Problem quantity

The problem quantity is another quantity account.

Unit

Quantity unit of the displayed values.

The quantities listed here are displayed as base, primary, secondary and tertiary quantity. In the

majority  of  cases  it  is  reasonable  to  have  only  one  of  these  quantity  types  displayed.  The

primary quantity is the quantity type in which the entry is made at the terminal.

"OP dates" category

Date specifications for the operation

"Key figures" category

The formulas used for calculating the values are described here.

BDE-MAB_81.docx

Version: 1.0.18468

Page 55 of 65

Monitoring of Shop Floor Data

"Lock" category

Lock

Flag  indicating  whether  the  operation  has  been  locked.  A  locked  operation  cannot  be  posted

anymore and neither appears in the sequencing list at the terminal.

Locked by and on

Indicates when and by whom the operation was locked the last time.

Unlocked by and on

Indicates when and by whom the operation was unlocked the last time.

Toolbar

In general, the parameters for calling the function or target application are taken over from the table. For

this reason, an entry should always be selected before calling an application.

 Order information

This button opens the application order information.

 Order overview

This button opens the application order overview.

BDE-MAB_81.docx

Version: 1.0.18468

Page 56 of 65

Monitoring of Shop Floor Data

8  Operations

Summary

Menu

Production control --> Production overview --> Operations

Transaction code

op

Function authorization

aop

Utilization

The  “operations”  application  is  an  important  dialog  for  shift  supervisors,  assistant  foremen  or  foremen.

This application shows operations grouped by their processing status in a clearly structured manner.

Please note in this context that registered operations (status "running") are only shown by their

workplace to which they are logged on, provided that the option "Show the operations logged on

for each workplace" has been set.

Integration

This  application  provides  the  user  with  a  clearly  categorized  selection  of  operations.  The  configurable

MOC user interface enables the user to view the information at large, in detail or clearly structured at a

glance.

Please note: The progress of an order, i.e. the total of all operations of an order, can be determined using

the order overview application.

Selection criteria

The following selection criteria are available in the application:

Workplace from... to ...

This  selection  criterion  refers  to  the  workplace  planned  for  the  operation.  All  operations

assigned to the selected workplaces are displayed. It is possible to use wildcards.

For  operations  that  are  logged  on,  this  is  not  the  workplace  which  the  operation  is

currently logged on to but the workplace which the operation is planned for.

Group from ... to ...

This  selection  criterion  refers  to  the  group  that  is  planned  for  the  operation.  All  operations

assigned to the selected group are displayed. It is possible to use wildcards.

BDE-MAB_81.docx

Version: 1.0.18468

Page 57 of 65

Monitoring of Shop Floor Data

For  operations  that  are  logged  on,  this  is  not  the  group  of  the  workplace  which  the

operation is currently logged on to but the group which the operation is planned for.

Planned for

This  option  allows  for  the displayed  operations  to  be  restricted  to  operations  that  have  initially

been planned for a workplace or a group.

Order

Article

This  selection  criterion  refers  to  the  order  number.  Operations  assigned  to  the  specified  order

number are displayed. It is possible to use wildcards.

This  selection  criterion  refers  to  the  article  in  the  operation.  All  operations  assigned  to  the

specified article are displayed. It is possible to use wildcards.

Article designation

This selection criterion refers to the article in the operation. All operations assigned to the specified

article designation are displayed. Wildcards can be used.

Operation status

Current operation status

Predecessor status

Status of the predecessor operation.

Control

Current production flag of the operation

Category

This selection criterion refers to the category of the operation's order type. Only operations the

order types of which correspond to the specified category are displayed.

Order type

This selection criterion refers to the order type of the operation. Only operations assigned to the

selected order type are displayed.

Processing code

This selection criterion refers to the processing code of the operation. Only operations assigned

to the selected processing code are displayed. It is possible to use wildcards.

Priority

OP

This  selection  criterion  refers  to  the  priority  of  the  operation.  Only  operations  assigned  to  the

selected priority are displayed.

This  selection  criterion  refers  to  the  operation  number.  Operations  assigned  to  the  entered

operation number are displayed. It is possible to use wildcards.

BDE-MAB_81.docx

Version: 1.0.18468

Page 58 of 65

Monitoring of Shop Floor Data

Tool

This selection criterion refers to the tool in the operation. All operations assigned to the specified

tool are displayed. It is possible to use wildcards.

Show split OPs

If this checkbox is checked split operations are displayed additionally.

Customer name

This  selection  criterion  refers  to  the  customer  designation  defined  in  the  operation.  All  orders

including the selected customer designation are displayed.

Cost center

This  selection  criterion  refers  to  the  cost  center  of  the  workplace  defined  in  the  operation.  All

operations assigned to the selected cost center are displayed. It is possible to use wildcards.

Planned start between ... and

This selection criterion refers to the planned start date defined in the operation. Only operations

which are planned on or between the selected planned start dates are displayed.

Scheduled start between ... and

This  selection  criterion  refers  to  the  scheduled  start  date  of  the  operation.  Only  operations

planned on or between the selected scheduled start dates are displayed.

Earliest start between ... and

This  selection  criterion  refers  to  the  earliest  start  date  of  the  operation.  Only  are  operations

displayed, which are planned on or between the selected earliest start dates.

Latest end between ... and

This  selection  criterion  refers  to  the  latest  end  date  of  the  operation.  Only  are  operations

displayed, which are planned on or between the selected, latest end dates.

Actual start between ... and

This  selection  criterion  refers  to  the  start  date  of  the  order.  Only  are  operations  displayed  the

order start of which is planned on or between the selected dates.

Actual end between ... and

This  selection  criterion  refers  to  the  end  date  of  the  order.  Only  are  operations  displayed  the

order end of which is planned on or between the selected dates.

Basic start date between ... and

This selection criterion refers to the basic start date of the order. Only are operations displayed

whose basic start time of the order is planned on or between the selected dates.

Basic end date between ... and

This selection criterion refers to the basic end date of the order. Only are operations displayed

whose basic end time of the order is planned on or between the selected dates.

BDE-MAB_81.docx

Version: 1.0.18468

Page 59 of 65

Monitoring of Shop Floor Data

Sales order

This  selection  criterion  refers  to  the  sales  order  defined  at  the  order  header.  All  operations

assigned to the selected sales order are displayed.

Order index from ... to

This selection criterion refers to the order index defined at the order header. All  operations are

displayed whose order index at the order header matches the selected order index.

Planned order

This selection criterion refers to the planned order number from SAP that is defined in the order

header.

Project number

This selection criterion refers to the project number in the operation. All orders that are assigned

to the selected project number are displayed.

Order group

This  selection  criterion  refers  to  the  order  group  at  the  order  header.  All  operations  are

displayed whose order group at the order header is assigned to the selected order group. It is

possible to use wildcards.

MRP controller

This selection criterion refers to the MRP controller defined for the order header. All operations

are  displayed  whose  MRP  controller  of  the  order  header  corresponds  to  the  entered  MRP

controller. It is possible to use wildcards.

MOP

Restricts the merged operations that are displayed. Wildcards can be used.

Show MOP

Defines  the  merged  operations  to  be  displayed.  Initially,  merged  operations  and  individual

operations are displayed; operations combined into an MOP are not displayed.

Show the operations logged on for each workplace

If this option is checked, an operation that is currently being logged on to multiple workplaces will

be shown as many times as it is actually logged on.

The category "logged on to workplace" (hidden by default) shows information about the workplace

which the operation is logged on to.

In  this  application,  the  responsibility  area  of  the  planned  operations  is  checked  against  the

workplace which they are planned for.

BDE-MAB_81.docx

Version: 1.0.18468

Page 60 of 65

"Operations" detail application

The  table  shows  the  below-mentioned  fields,  among  other  things.  Information  on  further  fields  can  be

Monitoring of Shop Floor Data

found in the documents dealing with

  data about the backlog of orders



current data and key figures on the operation

"Status" category

Status

The bitmap (“LED”) defined in the status configuration is displayed as status.

This column shows the number of operations within the totals line.

Status text

The status text results from the current status of the operation.

Status since

Informs about the time since when the corresponding status has been set

Predecessor status

Status of the predecessor operation. Here, it can be recognized whether the predecessor operation

has already been started and thus material, which will be further processed in the current operation,

has already been processed or produced.

Secondary status

Displays the currently set secondary status.

Secondary statuses can be configured and used optionally as a part of HYDRA customizing.

"Order" category

Displays specific data for operations and orders.

Relevant fields are:

Order type

Displays the order type as text and symbol.

The standard order types are described in the glossary. Further order types can be defined  while

customizing HYDRA.

Category

The category summarizes similar order types. The following categories are available in HYDRA:

BDE-MAB_81.docx

Version: 1.0.18468

Page 61 of 65

Monitoring of Shop Floor Data

FA = production order

PJ = project order

PM = maintenance order

KP = capacity order

GK = overhead cost order

Order

Number of the corresponding order

Sequence

Order sequence (only relevant if sequences are used)

OP

Split

Number of the respective operation

Split number provided that it is a split operation.

Current number of splits

Number of splits of an operation, provided that this one has been split.

Note

Short text of the first note of an operation.

Printed

This column shows whether the corresponding time ticket has already been printed.

"Specifications for production" category

Relevant fields are:

Planned workplace

Workplace on which the operation is planned.

Planned for

The "planned" column shows whether the operation is planned

G

M

Group

at a group (pool of groups) or

at a workplace (pool of workplaces, machines).

Group for which the operation is planned.

"OP dates" category

Date specifications for the operation

BDE-MAB_81.docx

Version: 1.0.18468

Page 62 of 65

Monitoring of Shop Floor Data

"Remaining run time" category

Remaining run time

Still remaining production time. This is a calculatory value that is calculated by a formula based on

different parameters. The formula is defined in the operation.

Remaining run time

Still remaining production time. This is a calculatory value that is calculated by a formula based on

different parameters. The formula is defined in the operation.

"Target times" category

Default target time specifications for the operation

Additionally calculated fields:

Total setup time

Sum total of setup time, additional setup time and dismantling/teardown time.

Target execution time

Sum

total  of

the

total  setup

time  and  processing

time."Primary  quantity/secondary

quantity/tertiary quantity" category

Target quantity

Quantity specifications for the operation.

Yield

Yield posted onto the operation.

Scrap

Scrap posted onto the operation.

Rework

Quantity that has to be reworked and that is posted onto the operation.

Problem quantity

Problem quantity posted onto the operation.

Unit

Quantity unit of the displayed values.

The quantities listed here are displayed as base, primary, secondary and tertiary quantity. In the

majority  of  cases,  it  is  reasonable  to  have  only  one  of  these  quantity  types  displayed.  The

primary quantity is the quantity type in which values are entered at the terminal.

BDE-MAB_81.docx

Version: 1.0.18468

Page 63 of 65

Monitoring of Shop Floor Data

"Postings" category

First logon

Date and time when the operation was logged on for the first time.

Last logoff

Date  and  time  when  the  operation  was  logged  off  the  last  time.  This  kind  of  information  can  be

interesting if an operation was reactivated.

Date of last posting

Date of the last posting made for this operation.

Time of last posting

Time of the last posting made for this operation.

"Logged on to workplace" category

The  below-mentioned  fields  pertaining  to  this  category  are  only  filled  out,  provided  that  the

option "Show the operations logged on for each workplace" has been set.

Workplace

Workplace to which the operation is currently being logged on.

Short name

Short name of the workplace

Designation

Designation of the workplace

Group

Group of the workplace

Cost center

Cost center of the workplace

Toolbar

In general, the parameters for calling the function or target application are taken over from the table of the

“operations” detail application. For this reason, an operation should always be selected before  calling an

application.

 Generate merged operation

Generate merged operation function Selected operations are consolidated to a single merged

operation. The consolidated operation is representatively logged on and displayed at the terminal

BDE-MAB_81.docx

Version: 1.0.18468

Page 64 of 65

Monitoring of Shop Floor Data

 Cancel merged operation

Cancel merged operation function

The merged operation is broken up into separate operations.

 Order information

This button opens the application order information.

 Order overview

This button opens the application order overview.

 Schedule controlling: save baseline plan

Function Schedule controlling: save baseline plan

BDE-MAB_81.docx

Version: 1.0.18468

Page 65 of 65

