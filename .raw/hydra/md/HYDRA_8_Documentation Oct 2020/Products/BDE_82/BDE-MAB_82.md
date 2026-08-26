Manual

Monitoring of Shop Floor Data
BDE-MAB 8.2

Version 1.0.23570

Last change on: 08.10.2020

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

BDE-MAB_82.docx

Version: 1.0.23570

Page 2 of 72

Monitoring of Shop Floor Data

Contents

1  Overview – Shop Floor Data / Order Data Monitoring ................................. 4

2  Order information ......................................................................................... 6

3  Order Overview .......................................................................................... 16

4  Order Shift Log ........................................................................................... 29

5  Pool of Orders ............................................................................................ 38

6  Operations Logged on ................................................................................ 46

7  Finished Operations ................................................................................... 55

8  Operations .................................................................................................. 63

BDE-MAB_82.docx

Version: 1.0.23570

Page 3 of 72

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

The shop floor data / order data monitoring function uses order data that  were either created directly  in

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

BDE-MAB_82.docx

Version: 1.0.23570

Page 4 of 72

Monitoring of Shop Floor Data

o  Tabular presentation of the currently logged on operations (status: running)

o  Tabular presentation of the operations already completed (status: completed)

o  Tabular  presentation  of  all  operations  with  predefined  filter  for  display  of  logged  on

operations, completed operation and pool of orders

  Order shift log

o  Shift-related presentation of the completed operations

o  Graphic representation of quantities and times by article

BDE-MAB_82.docx

Version: 1.0.23570

Page 5 of 72

Monitoring of Shop Floor Data

2  Order information

Overview

HYDRA menu

Production control  Production overview  Order information

FEDRA menu

Detailed Scheduling  Current  Order information

Transaction code

orin

Function authorization

orin

Available user fields

Where?

Table

Tab Order data  User
fields

Tab Operations  User
fields

Tab Operations 
Components

Object type/user field key

Source (type)

AGNR/SYSTEM

Operation (MF-D)

AUNR/depending on data record

order (MF-D)

AGNR/depending on data record

Operation (MF-D)

MATLIST/SYSTEM

Material component (MF-D)

How to configure user fields?

Which user field types are available?

Purpose

The  Order  information  is  the  most  important  instrument  for  anyone  in  a  position  of  responsibility  in  and

around the production process. You use the Order information to monitor, control and oversee production.

Integration

The  application  Order  information  provides  all  data  required  to  process  operations  in  a  clear  and  well-

structured  manner.  The  Order  information  therefore  is  one  of  the  most  important  tools  to  control  and

monitor production. This application is very useful to prepare the work in production.

Selection criteria

The application provides the following selection criteria:

Order

This  selection  criterion  refers  to  the  order  number.  The  selected  order  is  displayed  with  its

operations.

Show split OPs

The  checkbox  has  an  effect  on  the  operations  displayed.  If  the  checkbox  is  enabled,  the  list  of

operations includes split operations.

BDE-MAB_82.docx

Version: 1.0.23570

Page 6 of 72

Monitoring of Shop Floor Data

In addition, the following information is shown for the order selected in the selection panel (view only):

Order status

Shows the status of the selected order in text form (highlighted in color)

Archived

If  the  order  has  already  been  archived,  this  is  shown  in  text  form  behind  the  field  displaying  the

order status.

Toolbar

When you call a function or target application, the parameters of the table are generally transferred. For

this reason, you should always select an entry before calling an application.

Tab Main page

   Update order (function authorization or.actualize)

Use the function Update order to update the order.

   Schedule order (function authorization or.terminate)

Use the function Schedule order to schedule or reschedule the order.

   Order overview (function authorization: orov)

Use this button to call the application Order overview.

   Documents

Use

this

function

to

show

the

documents

stored

for

the

operation.

Assign the documents in the application Edit production resources and tools

  Serial numbers (function authorization: edser)

Opens the application Edit serial numbers for the order.

  Inspection requirement (function authorization: irp)

Calls the application Inspection requirement

  Inspection points (function authorization ipp)

Calls the application Inspection points

BDE-MAB_82.docx

Version: 1.0.23570

Page 7 of 72

Monitoring of Shop Floor Data

   Order network (function authorization ornet)

Calls the application Order network

You can only open the applications Inspection points, Inspection requirements and Order network, if the

extension orin82 is activated.

Tab Edit

Edit orders (function authorization: edor*)

Opens the application Edit orders for the order.

Edit order sequences (function authorization: edseq)

Opens the application Edit order sequences for the order.

Edit operations (function authorization: edop)

Opens the application Edit operations for the order.

Edit long texts of operations (function authorization: edoptx )

Opens the application Edit long texts of operations for the order.

Edit components (function authorization: edopcomp)

Opens the application Edit components for the order.

Edit production resources and tools (function authorization: edopres)

Opens the application Edit production resources and tools for the order.

Detail application Order data

The detail application Order data displays the order master data. Die different fields  of the order header

are described here.

The sequence of the tabs can deviate from the one used in this document.

Detail application Order data - Status

The detail application Order data - Status shows the current status of the order.

  The times displayed are calculated using the sum total of all operations.

  The scrap quantity displayed is calculated using the sum total of all operations.

BDE-MAB_82.docx

Version: 1.0.23570

Page 8 of 72

Monitoring of Shop Floor Data

  The yield quantity displayed is the yield of the last operation that could be recorded.

Fof further information, see here.

Detail application Commentaries

This detail application shows the BDE comments that have been added to the operations of the selected

order during data collection (only applies when using HYDRA). This supports efforts towards a paperless

production process.

The following data is available:

Recording time

Point in time (date, time) when the comment was recorded.

Collected at workplace

Workplace where the comment was recorded.

MES order number

The combined order and operation number of the operation the comment was recorded for.

Person

Personnel number of the person according to the HR master data who entered the comment.

Last name

Last name of the person according to the HR master data who entered the comment.

First name

First name of the person according to the HR master data who entered the comment.

Name

Entire  name  of  the  person  (last  name,  middle  name  and  first  name)  according  to  the  HR  master

data who entered the comment.

Detail application Operations

The sequence of the tabs can deviate from the one used in this document.

Detail application Operations - Operation

The detail application Operation shows the operation's master data.

The fields of the operation are described here.

Detail application Operations - Operation status

The detail application Status shows the current status of the relevant operation.

BDE-MAB_82.docx

Version: 1.0.23570

Page 9 of 72

Monitoring of Shop Floor Data

The operation's status information is described here.

Detail application Operations - Operation - RPA

The  detail  application  Operation  -  RPA  shows  the  times  recorded  (actual  values)  for  the  relevant

operation. The times are assigned to the different RPAs.

Detail application Operations - Logged on to workplace

The  detail  application  Logged  on  to  workplace  shows  the  workplaces  where  the  selected  operation  is

logged on. If an operation is logged on to several workplaces at the same time, all these workplaces are

shown here.

Workplace

Workplace

Workplace where the operation is logged on.

Login

Date

Time when the operation was logged on to the workplace.

Time

Time when the operation was logged on to the workplace.

Order

HYDRA order number

Combined order/operation number of the selected operation.

Detail application Operations - Staff logged on

This  detail  application  shows  the  persons  that  are  logged  on  to  the  operation  selected  above.  Because

several  employees  can  be  logged  on  to  one  operation,  more  than  one  person  can  be  shown  for  an

operation.

Person

Person

Personnel number of the person logged on to the operation (according to the HR master data). The

field Workplace shows the workplace where the person is logged on with the specified operation.

Staff badge number

Staff badge number of the person logged on to the operation (according to the HR master data).

BDE-MAB_82.docx

Version: 1.0.23570

Page 10 of 72

Monitoring of Shop Floor Data

Last name

Last name of the person logged on to the operation (according to the HR master data).

First name

First name of the person logged on to the operation (according to the HR master data).

Name

Complete name of the person (last name, middle name and first name) logged on to the operation

(according to the HR master data).

Login

Date

Time when the operation was logged on to the workplace.

Time

Time when the operation was logged on to the workplace.

Advance logon

If  the  logon  is  currently  still  an  advance  logon  recorded  before  the  start  of  a  shift,  the  flag  in  this

column illustrates this.

Workplace

Workplace

Workplace where the person is logged on with the currently selected operation.

Operator position/function

Operator function (identification) that the person uses to log on to the workplace (only relevant if a

person logs on at the Windows terminal with an operator position).

Order

HYDRA order number

Combined order/operation number of the selected operation.

Detail application Operations - Resources logged on

The  detail  application  Resources  logged  on  shows  a  table  of  tools  and  other  resources  needed  for

production that are directly or indirectly logged on to the operation.

Detail application Operations - Material in use

The detail application Material in use shows the input material logged on to the operation selected above.

BDE-MAB_82.docx

Version: 1.0.23570

Page 11 of 72

Monitoring of Shop Floor Data

Material

Batch number

Batch number of the material in use.

Material

Material number of the material in use according to the batch inventory.

Material designation/name

Material name of the material in use according to the batch inventory.

Material type

Material type of the material in use according to the batch inventory.

Quantities

Quantities

Original quantity of the material in use according to the batch inventory.

Remaining quantity

Remaining quantity of the material in use according to the batch inventory.

Unit

Quantity unit of the material in use according to the batch inventory.

Workplace

Workplace

Workplace where the input material/batch is logged on.

Login

Date

Time when the input material/batch was logged on to the workplace.

Time

Time when the input material/batch was logged on to the workplace.

Order

HYDRA order number

Combined order/operation number of the selected operation.

Detail application Operations - Article in production

This detail application shows the article (output batch) that is currently being produced with the operation.

BDE-MAB_82.docx

Version: 1.0.23570

Page 12 of 72

Monitoring of Shop Floor Data

Material

Batch number

HYDRA batch number of the article currently produced (output batch).

Material

Material number of the article currently produced (output batch) according to the batch inventory.

Material designation/name

Material name of the article currently produced (output batch) according to the batch inventory.

Material type

Material type of the article currently produced (output batch).

Quantities

Quantities

Quantity recorded so far and posted for the article (output batch).

Unit

Quantity unit of the article currently produced (output batch).

Workplace

Workplace

Workplace where the article (output batch) is logged on.

Login

Date

Time when the article (output batch) was logged on to the workplace.

Time

Time when the article (output batch) was logged on to the workplace.

Order

HYDRA order number

Combined order/operation number of the selected operation.

Detail application Operations - PRT (production resources and tools)

The  detail  application  PRT  shows  all  production  resources  and  tools  of  an  operation  that  have  been

transferred via interface. With operations that are not logged on, the detail application can also show the

resources and tools that are not logged on to the operation.

BDE-MAB_82.docx

Version: 1.0.23570

Page 13 of 72

Monitoring of Shop Floor Data

Resource

Resource type

Resource type of the resource, referred to as production resources and tools

Resource

Identification

Designation

Name of the production resource according to the list of production resources and tools.

Comment 1, comment 2

Comment fields for the production resource according to the list of production resources and tools.

File

File name

If the production resource is a file (image, document), the file name is shown here.

Path

Logical reference to the path configuration

Quantities

Required quantity

Required quantity of the production resource or tool.

QU required quantity

Quantity unit of the required quantity of the production resource or tool.

Order

MES order number

Combined order/operation number of the selected operation.

Detail application Operations - Components

The  detail  application  Components  shows  all  consumption  materials  of  an  operation  transferred  via

interface.

The fields of a component are described here

BDE-MAB_82.docx

Version: 1.0.23570

Page 14 of 72

Monitoring of Shop Floor Data

Detail application Operations - Texts

The detail application Texts shows additional texts for the operation selected.

Note:

The application only shows the text that fits the screen display (maximum).

No scroll function is provided for the text.

BDE-MAB_82.docx

Version: 1.0.23570

Page 15 of 72

Monitoring of Shop Floor Data

3  Order Overview

Overview

HYDRA menu

Production control  Production overview  Order overview

FEDRA menu

Detailed Scheduling  Current  Order overview

Transaction code

orov

Function authorization

orov

Available user fields

Where

Object type/user field key

Source (type)

Table Order overview

AUNR/SYSTEM

Table Order progress

AGNR/SYSTEM

Order (MF-D)

Operation (MF-D)

How to configure user fields?

Which user field types are available?

Purpose

You can use the Order overview function to get an overview of the production progress of an entire order

integrating also the progress details of the different operations.

Integration

The workplace overview provides a production overview and is relevant to the production management.

The  order  overview  is  the  central  dialog  showing  information  about  orders  in  the  system.  This  dialog

shows dates, quantities and times of production orders, overhead cost orders, maintenance orders and all

other order types. The orders are displayed in a table. If you select a table row, the application shows the

progress of the specified order.

Selection criteria

If you select more than one selection criteria, the order overview displays the data that matches all

selection criteria.

The application provides the following selection criteria:

Order

This selection criterion refers to the order number. The application shows the selected order. You

can also enter wildcards.

Order type

This  selection  criterion  refers  to  the  order  type  in  the  order  header.  The  application  only  shows

orders of the order type(s) selected.

BDE-MAB_82.docx

Version: 1.0.23570

Page 16 of 72

Monitoring of Shop Floor Data

Category

This selection criterion refers to the category of the order type in the order header. The application

only shows the orders of the selected category(ies).

Final article

This selection criterion references the article in the order header. The application shows all orders

that include the selected article. You can also use wildcards.

Article designation

This  selection  criterion  refers  to  the  article  name  (designation)  defined  in  the  order  header.  The

application shows all orders assigned to the selected article name (designation). You can also use

wildcards.

Order status

This selection criterion refers to the order statuses in the order header. The application only shows

the orders assigned to the selected order status(es).

Control

This  selection  criterion  refers  to  the  control  indicator  in  the  order  header.  The  application  only

shows the orders with the selected control indicator(s).

Sales order

This selection criterion relates to the sales order defined in the order header. The application shows

all orders assigned to the selected sales order. You can also use wildcards.

Customer name

This selection criterion refers to the customer name (designation) defined in the order header. The

application  shows  all  orders  with  the  selected  customer  name  (designation).  You  can  also  use

wildcards.

Project number

This  selection  criterion  refers  to  the  project  number  defined  in  the  order  header.  The  application

shows all orders of the selected project number. You can also use wildcards.

Planned order

This selection criterion refers to the planned  order  defined in the order header.  You can  also  use

wildcards.

Cost object

This selection criterion refers to the cost object defined in the order header. The application shows

all orders of the selected cost object. You can also use wildcards.

MRP controller

This  selection  criterion  refers  to  the  MRP  controller  defined  in  the  order  header.  The  application

shows all orders of the selected MRP controller.

BDE-MAB_82.docx

Version: 1.0.23570

Page 17 of 72

Monitoring of Shop Floor Data

Order group

This selection criterion refers to the order group defined in the order header. The application shows

all orders that are assigned to the selected order group.

Basic start date ... Basic start date

This  selection  criterion  refers  to  the  basic  start  date  defined  in  the  order  header.  The  application

only shows the orders, which are planned on or between the selected basic start dates.

Basic end date ... Basic end date

This  selection  criterion  refers  to  the  basic  end  date  defined  in  the  order  header.  The  application

only shows the orders, which are planned on or between the selected basic end dates.

Order end ... Order end

This selection criterion refers to the actual order end  defined  in the order header. The application

only shows orders, which are planned on or between the selected order end dates.

Priority ... Priority

This selection criterion refers to the priority defined in the order header. The application shows all

orders assigned to the selected priority.

Order index ... Order index

This selection criterion refers to the order index defined in the order header. The application shows

all orders assigned to the selected order index.

Check responsibility area

Using this option, the user can specify if the system checks the responsibility area of the workplace

or the responsibility area of the object operation/order to display data. To use this selection option,

you require the function authorization chkresp.

Order overview detail application

Status category

Order status

The status column shows the bitmap (“LED”) defined in the status configuration.

By default, the color of the status LED is the same as the color of the control LED.

Order status (text)

The current operation status specifies the status text.

Status since

Date/time since when the order is in this status.

Status since time

Date/time when the status was set.

BDE-MAB_82.docx

Version: 1.0.23570

Page 18 of 72

Monitoring of Shop Floor Data

Order start

Date/time of order start, i.e. date when the first operation of an order starts.

Order end

Date/time of order end, i.e. date when the last operation of an order was logged off.

Order category

Shows specific Orders data. Relevant fields are:

Order type

Displays the order type as text and symbol. The glossary describes standard order types. You can

define additional order types when customizing the system.

Order

Number of the corresponding order.

User fields of the order header

Shows the configured user fields for the order overview in the user fields category.

Progress category

Number of OPs

Shows the number of operations of the corresponding order.

Finished OPs

Shows the number of finished operations of the corresponding order.

Quantities category

Target quantity (B)

Quantity specification for the order in base quantity unit.

Target scrap

Target scrap of the order in base quantity unit.

Unit

Defined unit (base quantity unit).

Yield (B)

Recorded yield in base quantity unit of the last operation that can be posted.

This  is  the  last  operation  included  in  the  order  network.  This  operation  is

neither  locked  (internal  control  flag  "Y")  nor  deleted  logically  (internal  control

flag "D"). This operation "provides" the quantity for the entire order.

This means that the yield is 0 as long as the order has not been finished, i.e.

as long as you have not posted a quantity for the order's last operation.

BDE-MAB_82.docx

Version: 1.0.23570

Page 19 of 72

Monitoring of Shop Floor Data

If the last operation that allows quantity postings has a quantity > 0, and if the

order  overview  does  not  show  this  quantity,  then  you  must  check  the

procedure  described  in  the  document  Activating_OrderRelatedKeyfigures.pdf

or proceed as described there.

Scrap (B)

Total  of  the  scrap  quantities  entered  for  all  operations  of  the  order  in  base  quantity  unit.

Requirement: scrap is posted in base quantity unit for the operations.

Rework (B)

Total  of  the  rework  quantities  entered  for  all  operations  of  the  order  in  base  quantity  unit.

Requirement: rework is posted in base quantity unit for the operations.

Open quantity (B)

Total  of  the  open  quantities  entered  for  all  operations  of  the  order  in  base  quantity  unit.

Requirement: the open quantity is posted in base quantity unit for the operations.

Target times category

Planned lead time

The  planned  lead  time  includes  all  planned  execution  times,  like  setup  time,  processing  time,

inspection time and retooling time (teardown).

Target setup time

Target  setup  time  for  the  operation.  The  setup  time  is  transferred  by  the  ERP  system  or  can  be

calculated using a formula that is defined during system customization.

Target processing time

Target processing time of the operation. The processing time is transferred by the ERP system or

can be calculated using a formula defined during system customization.

Target execution time

Total of the target setup time + target processing time.

Target labor utilization

Total target labor utilization of all active OPs that can be posted.

Target wait time

Total wait time/idle time of all recordable, active OPs.

Transport time

Total transport time of all recordable, active OPs.

Waiting time

Total waiting time of all recordable, active OPs.

Delivery time

Total delivery time of all recordable, active OPs assigned to the "external processing" option.

BDE-MAB_82.docx

Version: 1.0.23570

Page 20 of 72

Monitoring of Shop Floor Data

Actual times category

Retention period of order

The retention period of the order is calculated using the time between the first transfer of the order

from the PPS system ("order release" = creation  date of the  order header in the system) and the

actual logoff (time) of the last active operation of the order.

Note:

-  The system cannot identify if the time of the order transfer is the time of the first transfer from

the  PPS  system  or  if  the  order  has  been  deleted  and  transferred  a  second  time  because  of

technical problems.

-

If an order is transferred several times and the previous order is deleted with each transfer, the

creation date of the order header shows the time of the last data transfer.

Lead Time

The lead time is the time between the first logon of an operation of the order and the logoff of the

last active operation (time).

Setup time

The setup time of the order is the  total  of all setup times (RPA 7)  of active operations  where this

data is collected.

Processing time

The  processing  time  of  the  order  is  the  total  of  the  main  production  times  (RPA  11)  of  all  active

operations where this data is collected.

Downtime

The order downtime is the total of the downtimes (RPA 1 to 6, RPA 8 to 10) of all active operations

where this data is collected.

Occupancy time

The  occupancy  time  is  the  total  of  the  setup  times  (RPA  7),  processing  times  (RPA  11)  and

downtimes (RPA 1...6, RPA 8...10) of all active operations where this data is collected.

Labor utilization

The labor utilization of the order is the total of personnel deployment times of all active operations

where this data is collected.

Actual dates category

Order start date

Date when the order was started, i.e. when the first operation of the order was logged on.

Order start time

Time when the order was started, i.e. when the first operation of the order was logged on.

BDE-MAB_82.docx

Version: 1.0.23570

Page 21 of 72

Monitoring of Shop Floor Data

Order end date

Date when the order was finished, i.e. when the last operation of the order was logged off.

Order end time

Time when the order was finished, i.e. when the last operation of the order was logged off.

Key figures category

Rate of capacity utilization (utilization efficiency)

The rate of capacity utilization is the ratio of the processing time (RPA 11) to the occupancy time

(RPA 1 ... 11) in percent.

Setup rate

The setup ratio is the ratio of the setup time (RPA 7) to the occupancy time (RPA 1...11) in percent.

Order progress detail application

The order progress detail application shows all operations of the above selected order.

If you select several orders in the order overview, this application shows all operations belonging to these

selected orders. In this case, we recommend showing the "order" column.

Status category

Status

Shows the corresponding bitmap (“LED”) defined in the status configuration.

By default, the color of the status LED is the same as the color of the control LED.

Status text

The current operation status specifies the status text.

Status since

Point in time since the status is available.

The field is empty with prepared operations.

Predecessor status

Status  of  the  preceding  operation.  This  status  specifies  whether  the  preceding  operation  has

already  been  started.  This  is  important  if  you  want  to  know  if  material  needed  for  the  current

operation has already been processed or produced.

Secondary status

Displays the currently set secondary status.

BDE-MAB_82.docx

Version: 1.0.23570

Page 22 of 72

111:.BMK11:ANR.EGR*0.100nBMKnEGRANRNGRAD

Please note: Use the Configuration of the order status to configure and use secondary statuses.

Monitoring of Shop Floor Data

Order category

Order

Shows the order number.

Operation category

Shows specific Operations data.

Note

Short text of the first note of an operation.

Primary quantity/secondary quantity/tertiary quantity category

Target quantity

Quantity specifications for the Operation.

Yield

The yield column shows the yield entered via the terminal or MOC.

Scrap

The scrap column shows the scrap entered via the terminal or MOC.

Rework

Quantity to be reworked.

Open quantity

The open quantity is another quantity account.

Unit

Quantity unit of the values displayed.

The quantities listed here are displayed as base, primary, secondary and tertiary quantities. In

general,  you  should  only  show  one  of  these  quantity  types.  The  terminal  collects  quantities  in

the primary quantity.

Postings category

First logon

Date/time when the operation is logged on first.

Last interruption

Date/time when the operation was interrupted at last.

Last logoff

Date/time when the operation was logged off at last.

BDE-MAB_82.docx

Version: 1.0.23570

Page 23 of 72

Monitoring of Shop Floor Data

Last logon

Date/time when the operation was logged on at last

Specifications for production category

Planned for

The planned for column shows whether the operation is planned

- for a workplace or

- if the operation is in the pool for the group (planned for a group).

Planned workplace

Workplace  where  the  operation  is  planned.  If  the  operation  is  planned  for  a  group,  this  column

indicates the workplace the operation was planned for most recently.

Group

Group where the operation is planned.

Tool, DNC, material

Main components assigned to the operation.

Dates category

Date specifications for the Operation.

Miscellaneous category

Confirmation/upload number

Confirmation (upload) number of the Operation.

Target times category

Target time specifications for the Operation.

Additional, calculated fields:

Total setup time

Total of the target setup time, additional setup time and target retooling (teardown) time.

Target execution time

Total of the target setup time (total) and the target processing time.

Actual times category

Setup time

Posted setup time of the operation.

Actual execution time

Total of setup time plus processing time.

BDE-MAB_82.docx

Version: 1.0.23570

Page 24 of 72

Monitoring of Shop Floor Data

Processing time

Posted processing time (RPA 11) of the operation.

Downtime

Posted downtime of the operation

Total of downtimes (RPA 1..6, RPA 8..10)

Occupancy time

The  occupancy  time  is  the  total  of  the  setup  time  (RPA  7),  processing  time  (RPA  11)  and

downtimes (RPA 1...6, RPA 8...10).

Lead Time

Posted  occupancy  time  of  the  operation.  The  lead  time  is  calculated  using  the  time  between  the

first logon of the operation and the last logoff of the operation.

Remaining run time

Shows  the  remaining  production  time.  The  system  uses  a  formula  and  different  parameters  to

calculate this value. The formula is stored with the operation. (RRT 1)

Remaining run time 2

Shows  the  remaining  production  time.  The  system  uses  a  formula  and  different  parameters  to

calculate this value. The formula is stored with the operation. (RRT 2)

Processing category

In  addition  to  further  target  specifications  for  the  Operation,  this  category  also  provides  the  operation-

related actual cycle.

Actual cycle

Calculate and display the actual cycle as follows:

1) OP prepared: by definition the actual cycle = 0.

2) OP  logged  on:  the  actual  cycle  corresponds  to  the  current  actual  cycle  from  the  Machine  Data

Collection  (depending  on  the  machine  connection).  The  application  Workplaces/Machines  also

shows this actual cycle.

3)  OP interrupted or logged off/finished: the system calculates an average cycle time. This average

cycle time is calculated by dividing the production time posted so far (RPA 11) by the strokes which

have  been  recorded  so  far  .  The  system  only  calculates  the  average  cycle  time  for  these  order

postings (no recalculation, e.g. after changes in the maintenance of postings dialog).

BDE-MAB_82.docx

Version: 1.0.23570

Page 25 of 72

Monitoring of Shop Floor Data

User fields of the order/operation

You can show the user fields of orders and operations in the table. The order overview can show orders

or  operations  with  different  user  field  configurations.  You  must  therefore  use  a  defined  User  field

configuration to create the columns. Create a category for the user fields in the table. All columns defined

are  first  displayed  in  this  category.  You  can  change  the  place  and  visibility  of  these  columns  using  the

column configurator.

Toolbar

The function authorization required to execute the relevant function is entered in parentheses.

Order tab

   Order status (function authorization: or.statchg)

Function to change the order status.

   Update order (function authorization: or.actualize)

Use the function Update order to update one or several selected orders.

  Schedule order (function authorization: or.terminate)

Use the function Schedule order to schedule one or several selected orders.

  Order information (function authorization: orin)

Calls the application Order information for the selected order.

   Edit orders (function authorization: edor)

Calls the application Edit orders for the selected order.

  Inspection requirement (function authorization: irp)

Click this button to call the application  Inspection requirement

  Inspection points (function authorization ipp)

Click this button to call the application Inspection points

   Order network (function authorization ornet)

Click this button to call the application Order network

BDE-MAB_82.docx

Version: 1.0.23570

Page 26 of 72

You can only open the applications Inspection points, Inspection requirements and Order network, if the

Monitoring of Shop Floor Data

extension orov82 is activated.

Operation tab

   Operation status (function authorization: op.statchg)

Function to change the operation status.

   Secondary status (function authorization: op.secstatchg)

Function to change the secondary status of an operation.

   Modify resource status (function authorization: op.resstatchg)

Function to change the resource status of an operation

  Lock operation (function authorization: op.lock)

Use the button Lock operation to lock one or several selected operations.

  Unlock operation (function authorization: op.unlock)

Use the button Unlock operation to unlock one or several selected operations.

Note

If  you  use  the  MPL  module  (Material  and  Production  Logistics),  you  cannot  use  the  below-

mentioned functions to carry out batch-related order postings on the client because these postings

are too complex.

   Log on (function authorization: op.logon)

Use the Log on function to log on operations to the system.

   Partial confirmation (function authorization: op.partconf)

Use the function Post part quantities (partial confirmation) to report part quantities for operations.

Interrupt (function authorization: op.interrupt)

Use the function Interrupt to interrupt operations.

   Log off (function authorization: op.logoff)

Use the Log off function to log off operations.

BDE-MAB_82.docx

Version: 1.0.23570

Page 27 of 72

Monitoring of Shop Floor Data

   Terminate operation (function authorization: op.finish)

Use the Exit function to log off interrupted or prepared operations.

  Reactivate (function authorization: op.reactivate)

Use the function Reactivate to reactivate finished operations.

   Edit operations (function authorization: edop)

Calls the application Edit operations for the selected order.

The  functions  "Standard  quantity  for  batches"  and  "Reaction  to  output  batch  change  with

quantity 0" are not available as posting functions in the toolbar.

Person tab

Note

Use the operation-related functions log on/interrupt/log off for group workplaces.

   Log person on (function authorization: pn.logon)

Use the function Log person on to log on an employee to an operation/machine.

   Log person off (function authorization: pn.logoff)

Use the function Log person off to log off an employee from an operation/machine.

BDE-MAB_82.docx

Version: 1.0.23570

Page 28 of 72

Monitoring of Shop Floor Data

4  Order Shift Log

Overview

Menu

Order management  Production reports  Order shift log

Transaction code

ospr

Function authorization

ospr

Available user fields

Where?

Table

Table

Object type/user field key

Source (type)

AUNR/SYSTEM

AGNR/SYSTEM

Order (MF-D)

Operation (MF-D)

How to configure user fields?

Which user field types are available?

Purpose

The order shift log is a very useful tool for shift supervisors and foremen. It provides the information that

persons responsible in production need for their daily reports.

The  order  shift  log  is  a  function  of  the  production  management.  The  individually  configurable  user

interface presents shift-specific order data in a clear and comprehensive way.

The shift log evaluates the collected order data (quantities and times) in relation to the recorded shifts.

Integration

The order shift log shows all operations that meet the restrictions made in the selection panel. Only BDE

log records of record type “U” and “E” are used.

This  function  provides  the  information  about  the  operations  completed  during  a  shift.  In  addition  to  the

quantities  produced,  the  log  also  shows  the  times  needed.  The  log  provides  this  data  for  each

order/operation.

You can correct the recorded order data using the function Order-related postings.

Selection criteria

The  application  provides  the  following  selection  criteria.  If  you  request  data,  the  system  checks  the

responsibility area that includes the workplace of the relevant BDE log records.

BDE-MAB_82.docx

Version: 1.0.23570

Page 29 of 72

Monitoring of Shop Floor Data

Date from ... to ...

Enter a period of time to narrow down the log records displayed. The system selects the log records

with a start date (logon date) in the period defined.

Default  setting  from  "yesterday"  until  "today".  The  date  is  calculated  based  on  the  Gregorian

calendar.

Shift: all, 1, 2, 3, 4

Within the entered period, only those log records are selected that are assigned to the shift entered

according to the shift model.

At the time the data is selected, the system does not include operations that were

logged  on  during  the  currently  running  shift,  because  no  log  records  have  been

generated for them yet.

Workplace from … to …

Selects the log records that have been posted for the specified workplace. This workplace must be

included in the responsibility area the user is authorized for. You can use wildcards in the field.

Group from … to …

Selects  the  log  records  that  have  been  posted  for  the  workplaces  that  are  included  in  the  user's

responsibility area and that are assigned to the entered group. You can use wildcards in the field.

Cost center

Selects  the  log  records  that  have  been  posted  for  the  workplaces  that  are  included  in  the  user's

responsibility area and that are assigned to the specified cost center. You can also use wildcards.

Report group

The selection criterion Report group refers to the report groups. The application shows all machines

or workplaces that are assigned to the selected Report group.

Order

Selects the log records that have been posted for the specified order.

Operation

Selects the log records that have been posted for the specified operation.

Article

Selects the log records that have been posted for operations with the specified article.

Tool

Selects the log records that have been posted for operations with the specified tool.

Check responsibility area

Using this option, the user can specify if the system checks the responsibility area of the workplace

or the responsibility area of the object operation/order to display data. To use this selection option,

you require the function authorization chkresp.

BDE-MAB_82.docx

Version: 1.0.23570

Page 30 of 72

Monitoring of Shop Floor Data

Additional notes on the selection

Long-term data

If  the  selection  period  exceeds  the  period  of  time  of  the  online  data  area,  the  system  implicitly

selects the  data  of the medium-term data area.  You  need  not  explicitly activate the access to the

medium-term data area.

Order shift log detail application

The detail application provides the following fields:

Shift category

Shift date

Shift date of the shift that included the production of the operation (basis: BDE log record).

Shift

Shift in which the operation was produced (basis: BDE log record).

Order category

Category

Order  category  of  the  order/operation,  e.g.  production  order  (FA)  or  overhead  cost  order  (GK).

(basis: backlog of orders).

Order type

Order type of the order (basis: backlog of orders).

Order

Order number of the order/operation (basis: backlog of orders).

Sequence

Sequence

number

of

the

operation

(basis:

backlog

of

orders,

subject

to

customization/configuration).

Operation

Operation number of the operation (basis: backlog of orders).

Split

Split number of the operation, provided that it is a split operation (basis: backlog of orders, subject

to configuration).

Operation designation

Designation of the operation (basis: backlog of orders).

Article/article designation

Article number and article designation of the operation (basis: backlog of orders).

BDE-MAB_82.docx

Version: 1.0.23570

Page 31 of 72

Monitoring of Shop Floor Data

Workplace category

Workplace/group/cost center

In  addition  to  the  order  and  article  number,  the  workplace  is  displayed  (including  group  and  cost

center  of  the  workplace)  where  the  operation  has  been  produced  in  the  selected  shift.  (Basis:

workplace: BDE log record; group, cost center: workplace/resource master data).

Primary quantity category

Target quantity

Total target quantity of the operation in the relevant quantity unit (primary quantity unit, secondary

quantity unit, tertiary quantity unit, base quantity unit – basis: backlog of orders).

For this column, no total is calculated. In some cases, one operation is produced

during several shifts and here it is not correct to calculate totals.

Target quantity per shift

This  field  includes  the  theoretical  target  quantity  for  the  posting.  The  duration  of  the  posting  may

even  be  shorter  than  the  shift  duration  if  the  operation,  for  example,  was  not  logged  on  over  the

entire  shift.  If  the  posting  covers  the  entire  shift,  the  target  quantity  is  calculated  for  each  shift,

otherwise the target quantity is only calculated for the shorter posting period.

To  calculate  the  values  in  the  totals  row,  the  system  uses  the  totals  of  the  RPA  times  and  the

average (not evaluated) of the target cycle values or the partitioning values (see totals row).

Yield

The yield posted for this operation – relating to the selected shift (basis: BDE log record).

Scrap

The scrap posted for this operation – relating to the selected shift (basis: BDE log record).

Rework

The rework quantity posted for this operation – relating to the selected shift (basis: BDE log record).

Open quantity

Open quantity posted for this operation – relating to the selected shift (basis: BDE log record).

Quantity unit

The respective quantity unit (basis: BDE log record).

BDE-MAB_82.docx

Version: 1.0.23570

Page 32 of 72

TLGANRSZYANRBMKEGRANR.*0.1000.:.SSKGUT1101

Monitoring of Shop Floor Data

Duration category

Target duration

The total operation-related target duration is calculated using the following formula (basis: backlog

of orders):

𝑆𝑜𝑙𝑙𝑑𝑎𝑢𝑒𝑟 =

Sollzyklus [pro 1000]𝐴𝐺
1000

 ∗Sollmenge (P)𝐴𝐺

Teiligkeit 𝐴𝐺
Impulsfaktor 𝐴𝐺

+ 𝑠𝑡𝑎𝑡𝑖𝑠𝑐ℎ𝑒 𝑅ü𝑠𝑡𝑧𝑒𝑖𝑡𝐴𝐺

If a pulse factor > 0 is not stored for the operation, the value 1 is preset.

If a partitioning > 0 is not stored for the operation, then the target duration is not calculated.

For this column, no total is displayed. In some cases, one operation requires several

shifts for its production and a correct calculation of totals is then not possible.

Production

The  production  time  recorded  for  this  operation  -  relating  to  the  selected  shift  (basis:  BDE  log

record).

Downtime

The downtime recorded for this operation - relating to the selected shift (basis: BDE log record).

Total

Total of all production times and downtimes (sum of columns Production + Downtime).

RPA category

RPA

Detailed  presentation  of  times  recorded  on  the  level  of  resource  performance  accounts  .  (Basis:

BDE log record) .

Key figures category

Rate of capacity utilization

To calculate the  values in  the totals row, the system uses the totals  of the  RPA times (see totals

row).

Output rate

To calculate the values in the totals row, the system uses the totals of the RPA times and the yield

quantities  (P)  as  well  as  the  arithmetic  mean  (unweighted)  of  the  target  cycle  values  or  the

partitioning values (see totals row).

BDE-MAB_82.docx

Version: 1.0.23570

Page 33 of 72

1101:.BMK11:ANR.EGR*0.100BMKEGRANRNGRADSZYANRTLGANRBMKEGRANRGUTPEGRANR.*.*:.*0.1000:.*0.100AUSBGD1101

Scrap rate

Monitoring of Shop Floor Data

To calculate the values in the totals row, the system uses the totals of the yield quantities (P) and

the scrap quantities (P) (see totals row).

Assignment utilization rate

To calculate the  values in  the totals row, the system uses the totals  of the  RPA times (see totals

row).

The KPIs above can be changed according to the customer's requirements using

the  formula  management.  For  the  KPI  definition,  the  acronyms  below  are

available.

Acronyms
for
formula definition

the

Description

ANR.EGR:BMK01
ANR.EGR:BMK02
ANR.EGR:BMK03
ANR.EGR:BMK04
ANR.EGR:BMK05
ANR.EGR:BMK06
ANR.EGR:BMK07
ANR.EGR:BMK08
ANR.EGRBMK09
ANR.EGR:BMK10
ANR.EGR:BMK11
ANR.EGR:BMK12
ANR.EGR:AUSP
ANR.EGR:AUSB
ANR.EGR:AUST
ANR.EGR:AUSS
ANR.EGR:GUTP
ANR.EGR:GUTB
ANR.EGR:GUTT
ANR.EGR:GUTS
ANR.EGR:PRBP
ANR.EGR:PRBB
ANR.EGR:PRBT
ANR.EGR:PRBS
ANR.EGR:NCHP
ANR.EGR:NCHB
ANR.EGR:NCHT
ANR.EGR:NCHS

Times

recorded

for

the

resource  performance

accounts 1-12

Scrap  quantity

recorded

in

the  units  primary,

secondary, base and tertiary

Yield  quantity

recorded

in

the  units  primary,

secondary, base and tertiary

Open  quantity

recorded

in

the  units  primary,

secondary, base and tertiary

Rework  quantity  recorded  in  the  units  primary,

secondary, base and tertiary

BDE-MAB_82.docx

Version: 1.0.23570

Page 34 of 72

AUSPEGRANRGUTPEGRANRAUSPEGRANRAQUOTE:.:.:.*0.10011:.10:.09:.08:.05:.04:.03:.02:.01:.BMK11:ANR.EGR*0.100BMKEGRANRBMKEGRANRBMKEGRANRBMKEGRANRBMKEGRANRBMKEGRANRBMKEGRANRBMKEGRANRBMKEGRANRBNGRAD

Monitoring of Shop Floor Data

Cycles recorded and cycles recorded for yield.

Target  cycle,  partitioning  and  pulse  factor  of  the

operation.

ANR.EGR:HUBG
ANR.EGR:HUB

ANR.SZY
ANR.TLG
ANR.IMPFAKT

Machine category

Target cycle

Time planned for 1000 cycles of the machine. This value is the default value of the HYDRA-MDE

machine  monitoring  (cycle  monitoring).  The  value  specified  for  the  operation  is  used  to  populate

this  field.  If  the  target  cycle  is  changed  when  the  operation  is  logged  on,  the  change  is  not

integrated.

For this column, the totals row shows the arithmetic mean (unweighted) of all target cycle values.

This value is also used in the totals rows of the different key figures.

Actual cycle

For this column, the totals row shows the arithmetic mean (unweighted) of all actual cycle values.

Note: The duration in the field RPA 11 depends on the workplace setting  Posting

of  machine  time  with  operations  logged  on  simultaneously.  If  a  proportional

posting  is  configured  here,  also  the  duration  shown  in  this  field  is  a  proportional

duration.

Partitioning

Integer value that specifies the number of parts produced per clock pulse.  The value specified for

the  operation  is  used  to  populate  this  field.  If  the  partitioning  is  changed  when  the  operation  is

logged on, the change is not integrated.

For  this  column,  the  totals  row  shows  the  arithmetic  mean  (unweighted)  of  all  partitioning  values.

This value is also used in the totals rows of the different key figures.

Total cycles

Number  of  cycles  recorded  while  the  operation  was  logged  on.  For  this  column,  no  total  is

calculated.

Pulse factor

Integer value that specifies the number of parts produced per clock pulse. The value specified for

the operation is used to populate this field. For this column, no total is calculated.

BDE-MAB_82.docx

Version: 1.0.23570

Page 35 of 72

HUBGEGRANR:.BMK11:ANR.EGR*0.1000IZYCLC

Monitoring of Shop Floor Data

Note

Displaying the actual quantities and the actual durations (RPA)

The shift automatic option is not available for workplaces that are not assigned to any terminal or

that  are  assigned  to  a  terminal  configured  as  a  BDE  terminal  (shop  floor  data  collection).  This

means  that  there  are  no  automatic  order  or  person-related  postings  at  the  end  of  shifts.  In  this

case,  you  cannot  exactly  assign  the  recorded  quantities  and  durations  to  the  shifts.  The  system

therefore  assigns  quantities  and  durations  proportionally.  This  assignment  is  based  on  the

workplace's shift calendar.

Example:

In the example, the shift model is as follows: shift 1: 6:00 to 14:00 ; and shift 2: 14:00 to 22:00. This

shift  model  is  assigned  to  a  workplace  matching  the  above-mentioned  criteria.  An  OP  has  been

logged on at 13:00 and off at 16:00. For the OP logoff, 90 is uploaded as the yield.

In this case, the shift log for the operation in shift 1 will calculate an order duration of 60 minutes

and a yield of 30. For shift 2, an order duration of 120 minutes is calculated and a yield of 60. The

RPA-related durations are also calculated based on the shift model that the workplace is based on.

At the time the data is selected, the system does not include operations that were

logged  on  during  the  currently  running  shift,  because  no  log  records  have  been

generated for them yet.

Durations acc. to article detail application

The detail application Durations acc. to article shows the durations that have been posted for the article in

a bar chart. Only the operations selected in the detail application Order shift log are used to calculate the

values.

The  bar  chart  shows  the  article  numbers  of  the  selected  operations  on  the  y-axis  and  absolute  values

(durations)  are  displayed  on  the  x-axis.  The  respective  quantity  accounts  specify  the  color  of  the  bars

(production/RPA  11:  green;  downtimes/RPA  1-11:  red).  Bars  are  sorted  in  descending  order  by

production duration.

You can use a multi-combo box to define the durations that are shown as a bar:

- Production

- Downtimes

The bars are shown in a "stacked" form so that the total quantity can be defined differently for each user.

Activate the check box "Show labels", to show the values on the bars. Note: These labels are displayed

for the selected duration.

BDE-MAB_82.docx

Version: 1.0.23570

Page 36 of 72

Monitoring of Shop Floor Data

Quantities acc. to article detail application

The detail application Quantities acc to article shows the quantities that have been posted for the article in

a bar chart. Only the operations selected in the detail application Order shift log are used to calculate the

values.

The  bar  chart  shows  the  article  numbers  of  the  selected  operations  on  the  y-axis  and  absolute  values

(quantities) are displayed on the x-axis. Bars are sorted in descending order by production duration.

Toolbar

When you call a function or target application, the parameters of the table are generally transferred. For

this reason, always select an entry before calling an application.

 Order information (function authorization: orin)

Use this button to call the application Order information.

 Order overview (function authorization: orov)

Use this button to call the application Order overview.

BDE-MAB_82.docx

Version: 1.0.23570

Page 37 of 72

Monitoring of Shop Floor Data

5  Pool of Orders

Overview

HYDRA menu

Production control  Production support  Pool of orders

FEDRA menu

Detailed Scheduling  Current  Pool of orders

Transaction code

plop

Function authorization

plop

Available user fields

Where

Table

Table

Purpose

Object type/user field key

Source (type)

AUNR/SYSTEM

AGNR/SYSTEM

Order (MF-D)

Operation (MF-D)

The Pool of orders application is the most important dialog for foremen and supervisors.

The  Pool  of  orders  provides  a  selection  of  operations  that  is  clearly  sorted  by  categories.  These

operations are included in the pool of a machine or group.

Integration

The pool of orders shows all operations that match the specified selections.

Generally,  only  unplanned  and  planned  operations  are  displayed  in  the  pool  of  orders.  The  system

identifies these operations via the control indicators V, U or S. The operations usually have the operation

status "prepared", "interrupted" or "not free" (depending on the project).

Selection criteria

The application provides the following selection criteria:

Workplace from … to …

This selection criterion specifies the workplace stored for the operation. All operations assigned

to the selected workplaces are displayed. You can also use wildcards.

Group from … to …

This selection criterion refers to the group that is defined for the operation. The system displays

all operations  that are assigned to the selected group. It  does  not matter if the  operations are

already scheduled for a workplace or not. You can also use wildcards.

BDE-MAB_82.docx

Version: 1.0.23570

Page 38 of 72

Monitoring of Shop Floor Data

Planned for

You can use this option to specify if only operations are selected that have been scheduled for a

workplace or operations that are still in the pool of groups.

The column "planned for" shows whether the operation is planned





for a group (pool of groups) or

for a workplace (pool of workplaces).

Order

Article

This  selection  criterion  refers  to  the  order  number.  Only  operations  with  the  specified  order

number are displayed. You can also use wildcards.

This  selection  criterion  refers  to  the  article  of  the  operation.  The  application  displays  all

operations having assigned the specified article. You can also use wildcards.

Article name/designation

This  selection  criterion  refers  to  the  article  of  the  operation.  The  application  displays  all

operations that match the specified article designation. You can also use wildcards.

Operation status

Operation status.

Notes:

-  The  selection  list  shows  ALL  configured  workplace  statuses.  Also  statuses  that  are  not

relevant for this application are displayed.

-  The  system  can  only  display  the  operations  with  the  selected  operation  status  that  are  also

included in the selection of the control.

Predecessor status

Status of the preceding operation.

Control

Control indicator of the current operation status.

Notes:

- The selection list shows ALL configured control indicators. Also control indicators that are not

relevant for this application are displayed.

- By default, the values Prepared, Interrupted and None (short V, U, S) are preassigned in the

selection panel.

Category

This selection criterion refers to the category of the operation's order type. The application only

displays operations that match the specified category of order types.

BDE-MAB_82.docx

Version: 1.0.23570

Page 39 of 72

Monitoring of Shop Floor Data

Order type

This selection criterion refers to the order type of the operation. Only operations assigned to the

selected  order  type  are  displayed.  The  selection  list  displays  ALL  configured  order  types  with

the respective order type name.

Processing code

This selection criterion refers to the processing code of the operation. Only operations with the

selected processing code are displayed. You can also use wildcards.

Priority

OP

Tool

This selection criterion refers to the priority of the operation. Only operations with the selected

priority are displayed.

This  selection  criterion  refers  to  the  operation  number.  Only  operations  with  the  specified

operation number are displayed. You can also use wildcards.

This selection criterion refers to the tool used for the operation. All operations with the specified

tool are displayed. You can also use wildcards.

Show split OPs

If this option is enabled, split operations are additionally displayed.

Customer name

This  selection  criterion  refers  to  the  customer  designation  stored  for  the  operation.  The

application shows all orders with the selected customer name (designation).

Cost center

This selection criterion refers to the cost center of the workplace defined for the operation. The

system displays all operations assigned to workplaces of the selected cost center. You can also

use wildcards.

Planned start ... to ...

This  selection  criterion  refers  to  the  planned  start  date  defined  for  the  operation.  The  system

only displays operations with a planned start on or between the specified date(s).

Scheduled start time ... to ...

This  selection  criterion  refers  to  the  scheduled  start  date  of  the  operation.  The  system  only

displays operations with a scheduled start date on or between the specified date(s).

Earliest start ... to ...

This selection criterion refers to the earliest start date of the operation. The system only displays

operations with an earliest start on or between the specified date (s).

BDE-MAB_82.docx

Version: 1.0.23570

Page 40 of 72

Monitoring of Shop Floor Data

Latest end ... to ...

This selection criterion refers to the latest  end date of the operation. The system only displays

operations with a latest end on or between the specified date(s).

Actual start ... to ...

This  selection  criterion  refers  to  the  start  date  of  the  operation.  The  system  only  displays

operations with a start date on or between the specified date(s).

Actual end ... to ...

This  selection  criterion  refers  to  the  end  date  of  the  operation.  The  system  only  displays

operations with an end date on or between the specified date(s).

Use  the  MOC  application  "Order  overview"  to  select  the  operations  using  the  actual

dates of the order – order start or order end.

Basic date start ... to ...

This  selection  criterion  refers  to  the  basic  start  date  of  the  order.  The  system  only  displays

operations with a basic start date on or between the specified date(s).

Basic date end ... to ...

This  selection  criterion  refers  to  the  basic  end  date  of  the  order.  The  system  only  displays

operations with a basic end date on or between the specified date(s).

Sales order

This  selection  criterion  refers  to  the  sales  order  defined  in  the  order  header.  All  operations

assigned to the selected sales order are displayed.

Order index ... to ...

This  selection  criterion  refers  to  the  order  index  defined  in  the  order  header.  The  system

displays all operations with the specified order index in the order header.

Planned order

This selection criterion refers to the planned order number from SAP that is defined in the order

header.

Project number

This  selection  criterion  refers  to  the  project  number  of  the  operation.  The  system  displays  all

orders with the specified project number.

Order group

This  selection  criterion  refers  to  the  order  group  of  the  order  header.  The  system  displays  all

operations with the specified order index in the order header. You can also use wildcards.

BDE-MAB_82.docx

Version: 1.0.23570

Page 41 of 72

Monitoring of Shop Floor Data

MRP controller

This  selection  criterion  refers  to  the  MRP  controller  defined  in  the  order  header.  The  system

displays all operations with the specified MRP controller in the order header. You can also use

wildcards.

MOP

Restriction to a merged operation.

You can also use wildcards.

Show MOP

Defines the Merged operations to be displayed.

By  default,  the  system  displays  merged  operations  and  individual  operations;  operations  that

are summarized in a MOP are not displayed.

Check responsibility area

The user can only use this option if the respective license and function authorization "filterProdInd"

is  available  and  if  the  function  authorization  "chkresp"  is  enabled.  With  this  selection  option,  the

user can specify if data is displayed using the responsibility area of the workplace or of the object

operation/order.

"Pool of orders" detail application

The detail application provides the following fields:

Status category

Status

Shows the respective bitmap (“LED”) defined in the status configuration.

The totals line displays the number of operations in this column.

Status text

The current operation status specifies the status text.

Status since

Specifies date and time when the respective status has been set.

Predecessor status

Status  of  the  preceding  operation.  This  status  specifies  whether  the  preceding  operation  has

already been started. This is important if you want to know if material has already been processed

or produced that you need for the current operation.

Secondary status

Displays the currently set secondary status.

BDE-MAB_82.docx

Version: 1.0.23570

Page 42 of 72

Monitoring of Shop Floor Data

The use of the secondary status requires a respective Configuration.

"Order" category

This category displays specific data for operations and orders. Relevant fields are:

Order type

Displays the order type as text and symbol.

The  order  types of the HYDRA standard  are  described  in the glossary.  You can  configure further

order types.

Order

Specifies the number of the respective order.

Sequence

Order sequence (only relevant if sequences are used)

OP

Split

Specifies the number of the respective operation

Specifies the split number if the operation is a split operation.

Current number of splits

Number of splits of an operation if the operation has been split.

Note

Short text of the first note of an operation.

Printed

This column shows whether the respective time ticket has already been printed.

Specifications for production category

The relevant fields of this category are as follows:

Planned workplace

Workplace where the operation is planned.

Planned for

The "planned" column shows whether the operation is planned

G

M

Group

for a group (pool of groups) or

for a workplace (pool of workplaces).

Group for which the operation is planned.

BDE-MAB_82.docx

Version: 1.0.23570

Page 43 of 72

Monitoring of Shop Floor Data

"OP dates" category

This category provides date specifications for the operation.

"Remaining run time" category

Remaining run time

This  column  specifies  the  remaining  production  time.  The  system  calculates  this  value  using  a

formula based on different parameters. The formula used is stored for the operation.

"Target times" category

This category displays the target time specifications for the operation

Additional calculated fields:

Total setup time

Sum total of setup time, additional setup time and retooling/teardown time.

Target execution time

Sum total of setup time (total) plus processing time.

Primary quantity/secondary quantity/tertiary quantity category

Target quantity

Quantity specifications for the operation.

Yield

Yield posted for the operation.

Scrap

Scrap posted for the operation.

Rework

Quantity posted for the operation that must be reworked.

Problem quantity

Problem quantity posted for the operation.

Unit

Quantity unit of the values displayed.

The quantities listed here are displayed as base, primary, secondary and tertiary quantities. It is

usually best to show only one of the quantity types.  The terminal collects quantities in  primary

quantity.

BDE-MAB_82.docx

Version: 1.0.23570

Page 44 of 72

Toolbar

Monitoring of Shop Floor Data

 Generate merged operation (function authorization: op.colopcreate)

Function Generate merged operation

Selected operations are combined to form a merged operation. Instead of the different single

operations, the merged operation is logged on to the terminal and displayed on the terminal.

 Cancel merged operation (function authorization: op.coloprelease)

Function Cancel merged operation

The merged operation is undone and the separate operations are generated.

 Order information (function authorization: orin)

This button calls the application Order information.

 Order overview (function authorization: orov)

This button calls the application Order overview.

 Schedule controlling: save baseline plan (function authorization: esvb)

Function Schedule controlling: save baseline plan

 Shop floor paper (function authorization: repsfpap)

Function Print shop floor papers

 Time ticket (function authorization: reptimet)

Function Print time tickets

BDE-MAB_82.docx

Version: 1.0.23570

Page 45 of 72

Monitoring of Shop Floor Data

6  Operations Logged on

Overview

HYDRA menu

Production control  Production overview  Running operations (operations
logged on)

FEDRA menu

Detailed Scheduling  Current  Operations logged on

Transaction code

rop

Function authorization

rop

Available user fields

Where

Table

Table

Purpose

Object type/user field key

Source (type)

AUNR/SYSTEM

AGNR/SYSTEM

Order (MF-D)

Operation (MF-D)

The function Operations logged on shows the currently running and automatically interrupted (by change

of shifts) operations (with the control indicators L, F).

Please note that you have to set the option "Show the operations logged on for each workplace"

if  you  want  the  application  to  show  the  logged  on  operations  (status  "running)  for  each

workplace.

Selection criteria

The application provides the following selection criteria:

Workplace from … to …

This selection criterion refers to the workplace stored in the operation. The application shows all

operations assigned to the selected workplaces. You can also use wildcards.

For  operations  that  are  logged  on,  this  does  not  refer  to  the  workplace  where  the

operation  is  currently  logged  on.  The  application  shows  the  workplace  where  the

operation is planned.

Group from … to …

This  selection  criterion  refers  to  the  group  that  is  defined  for  the  operation.  The  application

shows all operations assigned to the selected group. You can also use wildcards.

BDE-MAB_82.docx

Version: 1.0.23570

Page 46 of 72

Monitoring of Shop Floor Data

For  operations  that  are  logged  on,  this  does  not  refer  to  the  group  of  the  workplace

where the operation is currently logged on. The application shows the group where the

operation is planned.

Planned for

Use  this  option  to  only  show  operations  that  have  initially  been  planned  for  a  workplace  or  a

group.

Order

Article

This selection criterion refers to the order number. The application only shows operations  with

the specified order number. You can also use wildcards.

This  selection  criterion  refers  to  the  article  of  the  operation.  The  application  displays  all

operations that are assigned to the specified article. You can also use wildcards.

Article designation

This  selection  criterion  refers  to  the  article  name  (designation)  defined  in  the  operation.  The

application displays all operations that match the specified article name. You can also use wildcard

characters.

Operation status

Current operation status.

Note:

The  selection  list  shows  ALL  configured  operation  statuses;  even  those  statuses  that  are  not

relevant for this application.

Predecessor status

Status of the preceding operation.

Control

Current control indicator of the operation.

Note:

The  selection  list  shows  ALL  configured  control  indicators;  even  those  indicators  that  are  not

relevant for this application.

Category

This selection criterion refers to the category of the operation's order type. The application only

displays operations with an order type of the specified category.

Order type

This  selection  criterion  refers  to  the  order  type  of  the  operation.  The  application  only  shows

operations with the selected order type.

BDE-MAB_82.docx

Version: 1.0.23570

Page 47 of 72

Monitoring of Shop Floor Data

Processing code

This  selection  criterion  refers  to  the  processing  code  of  the  operation.  The  application  only

shows operations with the selected processing code. You can also use wildcards.

Priority

OP

Tool

This  selection  criterion  refers  to  the  priority  of  the  operation.  The  application  only  shows

operations with the selected priority.

This  selection  criterion  refers  to  the  operation  number.  The  application  only  shows  the

operations with the specified operation number. You can also use wildcards.

This  selection  criterion  refers  to  the  tool  defined  for  the  operation.  The  application  shows  all

operations that are assigned to the specified tool. You can also use wildcards.

Show split OPs

If you enable this checkbox, the application also shows split operations.

Customer name

This selection criterion refers to the customer name (designation) defined in the operation. The

application shows all orders with the selected customer name (designation).

Cost center

This selection criterion refers to the cost center of the workplace defined for the operation. The

application  shows  all  operations  assigned  to  the  selected  cost  center.  You  can  also  use

wildcards.

Planned start ... to ...

This selection criterion refers to the planned start date defined for the operation. The application

only shows the operations whose planned start date is included in the selected period.

Scheduled start time ... to ...

This selection criterion refers to the scheduled start date of the operation. The application only

shows the operations whose scheduled start date is included in the selected period.

Earliest start ... to ...

This  selection  criterion  refers  to  the  earliest  start  date  of  the  operation.  The  application  only

shows the operations whose earliest start date is included in the selected period.

Latest end ... to ...

This selection criterion refers to the latest end date of the operation. The system only displays

the operations whose latest end date is included in the selected period.

Actual start ... to ...

This  selection  criterion  refers  to  the  start  date  of  the  operation.  The  system  only  displays  the

operations whose start date is included in the selected period.

BDE-MAB_82.docx

Version: 1.0.23570

Page 48 of 72

Monitoring of Shop Floor Data

Actual end ... to ...

This  selection  criterion  refers  to  the  end  date  of  the  operation.  The  system  only  displays  the

operations whose end date is included in the selected period.

Use the MOC application "Order overview" to select operations using the actual dates

of the order, i.e. the order start or order end.

Basic date start ... to ...

This selection criterion refers to the basic start date of the order. The application only displays

the operations whose basic start date of the order is included in the selected period.

Basic date end ... to ...

This selection criterion refers to the basic end  date of the order. The application only  displays

the operations whose basic end date of the order is included in the selected period.

Sales order

This  selection  criterion  refers  to  the  sales  order  defined  in  the  order  header.  The  application

shows all operations that are assigned to the selected sales order.

Order index ... to ...

This  selection  criterion  refers  to  the  order  index  defined  in  the  order  header.  The  application

displays all operations whose order index of the order header matches the selected order index.

Planned order

This  selection  criterion  refers  to  the  planned  SAP  order  number  that  is  defined  in  the  order

header.

Project number

This selection criterion refers to the project number of the operation. The application displays all

orders that are assigned to the selected project number.

Order group

This selection criterion refers to the order group of the order header. The application displays all

operations whose order group of the order header matches the selected order group. You can

also use wildcards.

MRP controller

This selection criterion refers to the MRP controller defined in the order header. The application

shows  all  operations  whose  MRP  controller  of  the  order  header  matches  the  entered  MRP

controller. You can also use wildcards.

MOP

Use this option to only show merged operations.

You can also use wildcards.

BDE-MAB_82.docx

Version: 1.0.23570

Page 49 of 72

Monitoring of Shop Floor Data

Show MOP

Use this option to specify the merged operations to be displayed.

By default, the application shows merged operations and individual operations.  The application

does not show the operations that are summarized in an MOP.

Show the operations logged on for each workplace

If  you  check  this  option,  the  application  shows  an  operation  multiple  times  if  this  OP  is

simultaneously logged on to multiple workplaces.

The category "logged on to workplace" (hidden by default) shows information about the workplace

where the operation is logged on.

Check responsibility area

Using this option, the user can specify if the system checks the responsibility area of the workplace

or the responsibility area of the object operation/order to display data. To use this selection option,

you require the function authorization chkresp.

Operations logged on detail application

The  table  shows  the  below-mentioned  fields,  among  other  things.  For  further  information  refer  to  the

following documents

  Existing order data

  Current data and KPIs of the operation

Status category

Status

The status column shows the bitmap (“LED”) defined in the status configuration.

The totals line of this column displays the number of operations.

Status text

The current operation status specifies the status text.

Status since

Specifies the date and time since when the status has been set.

Predecessor status

Status  of  the  preceding  operation.  This  status  specifies  whether  the  preceding  operation  has

already  been  started.  This  is  important  if  you  want  to  know  if  material  needed  for  the  current

operation has already been processed or produced.

Secondary status

Displays the currently set secondary status.

BDE-MAB_82.docx

Version: 1.0.23570

Page 50 of 72

Optionally, you can configure and use secondary statuses while customizing HYDRA.

Monitoring of Shop Floor Data

.

Order category

Displays specific data for the Operations and Orders.

Relevant fields are:

Order type

Displays the order type as text and symbol.

The glossary describes the standard  order types. Further order types can  be defined as part of a

system customization.

Category

The category summarizes similar order types. The following categories are available in the system:

FA = production order

PJ = project order

PM = maintenance order

KP = capacity order

GK = overhead order

Order

Shows the order number.

Sequence

Order sequence (only relevant if sequences are used).

OP

Split

Shows the operation number.

Shows the split number if the operation is a split operation.

Current number of splits

Shows the number of splits of an operation if the operation has been split.

Note

Shows the short text of the first note of an operation.

Printed

This column shows whether the time ticket has already been printed.

BDE-MAB_82.docx

Version: 1.0.23570

Page 51 of 72

Monitoring of Shop Floor Data

Specifications for production category

The relevant fields are:

Planned workplace

Workplace where the operation is planned.

Planned for

The "planned for" column shows whether the operation is planned

G

M

Group

for a group (pool of groups) or

for a workplace (pool of workplaces).

Group where the operation is planned.

OP dates category

This category provides date specifications for the Operation.

Remaining run time category

remaining run time

Shows  the  remaining  production  time.  The  system  uses  a  formula  and  different  parameters  to

calculate this value. The formula is stored with the operation.

Target times category

This category displays the target time specifications for the Operation.

Additional, calculated fields:

Total setup time

Sum total of setup time, additional setup time and retooling/teardown time.

Target execution time

Total of setup time plus processing time.

Primary quantity/secondary quantity/tertiary quantity category

Target quantity

Quantity specifications for the Operation.

Yield

The yield column shows the yield entered via the terminal or MOC.

Scrap

The scrap column shows the scrap entered via the terminal or MOC.

Rework

Quantity to be reworked.

BDE-MAB_82.docx

Version: 1.0.23570

Page 52 of 72

Monitoring of Shop Floor Data

Problem quantity

The problem quantity is another quantity account.

Unit

Quantity unit of the values displayed.

The quantities listed here are displayed as base, primary, secondary and tertiary quantities. In

general,  you  should  only  show  one  of  these  quantity  types.  The  terminal  collects  quantities  in

the primary quantity.

Postings category

First logon

Shows the date and time when the operation was logged on for the first time.

Last logoff

Shows the date and time when the operation was logged off the last time. This kind of information

is useful if an operation was reactivated.

Date of last posting

Date of the last posting made for this operation.

Time of last posting

Time of the last posting made for this operation.

Logged on to workplace category

The below-mentioned fields pertaining to this category are only completed, if you set the option

"Show the operations logged on for each workplace".

Workplace

Workplace where the operation is currently logged on.

Short name

Short name of the workplace.

Name

Name/description of the workplace.

Group

Group of the workplace.

Cost center

Cost center of the workplace.

BDE-MAB_82.docx

Version: 1.0.23570

Page 53 of 72

Monitoring of Shop Floor Data

Toolbar

When you call a function or target application, the parameters of the table are always transferred. For this

reason, always select an entry to call an application.

 Order information (function authorization: orin)

Use this button to call the application Order information.

 Order overview (function authorization: orov)

Use this button to call the application Order overview.

BDE-MAB_82.docx

Version: 1.0.23570

Page 54 of 72

Monitoring of Shop Floor Data

7  Finished Operations

Overview

HYDRA menu

Order Management  Production reports  Finished operations

FEDRA menu

Detailed Scheduling  Evaluations  Finished operations

Transaction code

fop

Function authorization

fop

Available user fields

Where?

Table

Table

Purpose

Object type/user field key

Source (type)

AUNR/SYSTEM

AGNR/SYSTEM

Order (MF-D)

Operation (MF-D)

The application Finished operations provides a clearly categorized selection of finished operations to the

shift manager, supervisor or foreman.

Integration

The application shows the operations that have been selected in the selection panel.

All  operations  are  displayed  that  have  the  control  indicators  "E"  (finished"),  "A"  (archived)  and  "D"

(logically deleted).

Selection criteria

The application provides the following selection criteria:

Workplace from … to …

This selection criterion refers to the workplace stored in the operation. The application shows all

operations assigned to the selected workplaces. You can also use wildcards.

Group from … to …

This  selection  criterion  refers  to  the  group  that  is  defined  for  the  operation.  The  application

shows all operations assigned to the selected group. You can also use wildcards.

Planned for

Use  this  option  to  only  show  operations  that  have  initially  been  planned  for  a  workplace  or  a

group.

BDE-MAB_82.docx

Version: 1.0.23570

Page 55 of 72

Monitoring of Shop Floor Data

Order

Article

This selection criterion refers to the order number. The application only shows operations  with

the specified order number. You can also use wildcards.

This  selection  criterion  refers  to  the  article  of  the  operation.  The  application  displays  all

operations that are assigned to the specified article. You can also use wildcards.

Article designation

This selection criterion refers to the article of the operation. The application displays all operations

that match the specified article name. You can also use wildcard characters.

Operation status

Current operation status.

Note:

The  selection  list  shows  ALL  configured  operation  statuses;  even  those  statuses  that  are  not

relevant for this application.

Predecessor status

Status of the preceding operation.

Control

Current control indicator of the operation.

Note:

The  selection  list  shows  ALL  configured  control  indicators;  even  those  indicators  that  are  not

relevant for this application.

Category

This selection criterion refers to the category of the operation's order type. The application only

displays operations with an order type of the specified category.

Order type

This  selection  criterion  refers  to  the  order  type  of  the  operation.  The  application  only  shows

operations with the selected order type.

Processing code

This  selection  criterion  refers  to  the  processing  code  of  the  operation.  The  application  only

shows operations with the selected processing code. You can also use wildcards.

Priority

This  selection  criterion  refers  to  the  priority  of  the  operation.  The  application  only  shows

operations with the selected priority.

BDE-MAB_82.docx

Version: 1.0.23570

Page 56 of 72

Monitoring of Shop Floor Data

OP

Tool

This  selection  criterion  refers  to  the  operation  number.  The  application  only  shows  the

operations with the specified operation number. You can also use wildcards.

This  selection  criterion  refers  to  the  tool  defined  for  the  operation.  The  application  shows  all

operations that are assigned to the specified tool. You can also use wildcards.

Show split OPs

If you enable this checkbox, the application also shows split operations.

Customer name/designation

This  selection  criterion  refers  to  the  customer  name  stored  in  the  operation.  The  application

shows all orders with the selected customer name (designation).

Cost center

This  selection  criterion  refers  to  the  cost  center  of  the  workplace  stored  in  the  operation.  All

operations assigned to the selected cost center are displayed. You can also use wildcards.

Planned start ... to ...

This selection criterion refers to the planned start date defined for the operation. The application

only shows the operations whose planned start date is included in the selected period.

Scheduled start time ... to ...

This selection criterion refers to the scheduled start date of the operation. The application only

shows the operations whose scheduled start date is included in the selected period.

Earliest start ... to ...

This  selection  criterion  refers  to  the  earliest  start  date  of  the  operation.  The  application  only

shows the operations whose earliest start date is included in the selected period.

Latest end ... to ...

This selection criterion refers to the latest end date of the operation. The system only displays

the operations whose latest end date is included in the selected period.

Actual start ... to ...

This  selection  criterion  refers  to  the  start  date  of  the  operation.  The  system  only  displays  the

operations whose start date is included in the selected period.

Actual end ... to ...

This  selection  criterion  refers  to  the  end  date  of  the  operation.  The  system  only  displays  the

operations whose end date is included in the selected period.

Use the MOC application "Order overview" to select operations using the actual dates

of the order, i.e. the order start or order end.

BDE-MAB_82.docx

Version: 1.0.23570

Page 57 of 72

Monitoring of Shop Floor Data

Basic date start ... to ...

This selection criterion refers to the basic start date of the order. The application only displays

the operations whose basic start date of the order is included in the selected period.

Basic date end ... to ...

This selection criterion refers to the basic end  date of the order. The application only  displays

the operations whose basic end date of the order is included in the selected period.

Sales order

This  selection  criterion  refers  to  the  sales  order  defined  in  the  order  header.  The  application

shows all operations that are assigned to the selected sales order.

Order index ... to ...

This  selection  criterion  refers  to  the  order  index  defined  in  the  order  header.  The  application

displays all operations whose order index of the order header matches the selected order index.

Planned order

This  selection  criterion  refers  to  the  planned  SAP  order  number  that  is  defined  in  the  order

header.

Project number

This selection criterion refers to the project number of the operation. The application displays all

orders that are assigned to the selected project number.

Order group

This selection criterion refers to the order group of the order header. The application displays all

operations whose order group of the order header matches the selected order group. You can

also use wildcards.

MRP controller

This selection criterion refers to the MRP controller defined in the order header. The application

shows  all  operations  whose  MRP  controller  of  the  order  header  matches  the  entered  MRP

controller. You can also use wildcards.

MOP

Use this option to only show merged operations.You can also use wildcards.

Show MOP

Use this option to specify the merged operations to be displayed.

By default, the application shows merged operations and individual operations. The application

does not show the operations that are summarized in an MOP.

BDE-MAB_82.docx

Version: 1.0.23570

Page 58 of 72

Monitoring of Shop Floor Data

Check responsibility area

The user can only use this option if the respective license and function authorization "filterProdInd"

is  available  and  if  the  function  authorization  "chkresp"  is  enabled.  Using  this  option,  the  user  can

specify if the system checks the responsibility area of the workplace or the responsibility area of the

object operation/order to display data.

Detail application: Finished Operations

The detail application provides the following fields:

Status category

Status

The status column shows the bitmap (“LED”) defined in the status configuration.

The totals line of this column displays the number of operations.

Status text

The current operation status specifies the status text.

Status since

Specifies the date and time since when the status has been set.

Predecessor status

Status  of  the  preceding  operation.  This  status  specifies  whether  the  preceding  operation  has

already  been  started.  This  is  important  if  you  want  to  know  if  material  needed  for  the  current

operation has already been processed or produced.

Secondary status

Displays the currently set secondary status.

Optionally, you can configure and use secondary statuses while customizing the system.

If  an  X  is  displayed  here  it  is  an  operation  of  an  order  that  has  been  completed  technically  in

SAP.

Order category

Displays specific data for the operations and orders.

Relevant fields are:

Order type

Displays the order type as text and symbol.

The  glossary  describes  the  standard  order  types.  You  can  define  further  order  types  as  part  of  a

customization.

BDE-MAB_82.docx

Version: 1.0.23570

Page 59 of 72

Monitoring of Shop Floor Data

Order

Shows the order number.

Sequence

Order sequence (only relevant if sequences are used).

OP

Split

Shows the operation number.

Shows the split number if the operation is a split operation.

Current number of splits

Shows the number of splits of an operation if the operation has been split.

Note

Shows the short text of the first note of an operation.

Printed

This column shows whether the time ticket has already been printed.

Specifications for production category

Specifications for production with respect to the machine, tool, DNC, material for the Operation.

Target times category

This category displays the target time specifications for the Operation.

Additional, calculated fields:

Total setup time

Sum total of setup time, additional setup time and retooling/teardown time.

Target execution time

Total of setup time plus processing time.

Processing category

Default target specifications for the production of the Operation

Primary quantity/secondary quantity/tertiary quantity category

Target quantity

Quantity specifications for the Operation.

Yield

The yield column shows the yield entered via the terminal or client.

Scrap

The scrap column shows the scrap entered via the terminal or client.

BDE-MAB_82.docx

Version: 1.0.23570

Page 60 of 72

Monitoring of Shop Floor Data

Rework

Quantity to be reworked.

Problem quantity

The problem quantity is another quantity account.

Unit

Quantity unit of the values displayed.

The quantities listed here are displayed as base, primary, secondary and tertiary quantities. In

general,  you  should  only  show  one  of  these  quantity  types.  The  terminal  collects  quantities  in

the primary quantity.

OP dates category

This category provides date specifications for the Operation.

Actual times category

Actual times currently collected for the operation.

Key performance indicators category

The formulas used to calculate the values are described here.

Lock category

Lock

This option specifies if the operation is locked.

If an operation is locked, you cannot log this operation on and it is not displayed in the sequencing

list on the terminal.

Locked by and on

Specifies the time and the user who last locked the operation.

Unlocked by and on

Specifies the time and the user who last unlocked the operation.

Toolbar

When you call a function or target application, the parameters of the table are always transferred. For this

reason, always select an entry to call an application.

 Order information (function authorization: orin)

Use this button to call the application Order information.

BDE-MAB_82.docx

Version: 1.0.23570

Page 61 of 72

Monitoring of Shop Floor Data

 Order overview (function authorization: orov)

Use this button to call the application Order overview.

BDE-MAB_82.docx

Version: 1.0.23570

Page 62 of 72

Monitoring of Shop Floor Data

8  Operations

Overview

HYDRA menu

Production control  Production overview  Operations

FEDRA menu

Detailed Scheduling  Current  Operations

Transaction code

op

Function authorization

aop

Available user fields

Where

Object type/user field key

Source (type)

Table

Table

AUNR/SYSTEM

AGNR/SYSTEM

Order (MF-D)

Operation (MF-D)

How to configure user fields?

Which user field types are available?

Purpose

The Operations application is an important dialog for shift supervisors, assistant foremen or foremen. This

application shows operations grouped by their processing status in a clearly structured manner.

Please note that you have to set the option "Show the operations logged on for each workplace"

if  you  want  the  application  to  show  the  logged  on  operations  (status  "running)  for  each

workplace.

Integration

This  application  provides  the  user  with  a  clearly  categorized  selection  of  operations.  The  configurable

client user interface enables the user to view the information at large, in detail or clearly structured at a

glance.

Note: You can use the application Order overview to identify the progress of an order, i.e. all operations

pertaining to an order are displayed.

BDE-MAB_82.docx

Version: 1.0.23570

Page 63 of 72

Monitoring of Shop Floor Data

Selection criteria

The application provides the following selection criteria:

Workplace from … to …

This selection criterion refers to the workplace planned for the operation. The application shows

all operations that are assigned to the selected workplace.

You can also use wildcards.

For  operations  that  are  logged  on,  this  does  not  refer  to  the  workplace  where  the

operation  is  currently  logged  on.  The  application  shows  the  workplace  where  the

operation is planned.

Group from … to …

This  selection  criterion  refers  to  the  group  that  is  planned  for  the  operation.  The  application

shows all operations that are assigned to the selected group.

You can also use wildcards.

For  operations  that  are  logged  on,  this  does  not  refer  to  the  group  of  the  workplace

where the operation is currently logged on. The application shows the group where the

operation is planned.

Planned for

Use  this  option  to  only  show  operations  that  have  initially  been  planned  for  a  workplace  or  a

group.

Order

This selection criterion refers to the order number. The application only shows operations  with

the specified order number.

You can also use wildcards.

Article

This  selection  criterion  refers  to  the  article  of  the  operation.  The  application  displays  all

operations that are assigned to the specified article.

You can also use wildcards.

Article designation

This  selection  criterion  refers  to  the  article  name  (designation)  defined  in  the  operation.  The

application displays all operations that match the specified article name. You can also use wildcard

characters.

Operation status

Current operation status.

BDE-MAB_82.docx

Version: 1.0.23570

Page 64 of 72

Monitoring of Shop Floor Data

Predecessor status

Status of the preceding operation.

Control

Current control indicator of the operation

Category

This selection criterion refers to the category of the operation's order type. The application only

displays operations with an order type of the specified category.

Order type

This  selection  criterion  refers  to  the  order  type  of  the  operation.  The  application  only  shows

operations with the selected order type.

Processing code

This  selection  criterion  refers  to  the  processing  code  of  the  operation.  The  application  only

shows operations with the selected processing code.

You can also use wildcards.

Priority

OP

Tool

This  selection  criterion  refers  to  the  priority  of  the  operation.  The  application  only  shows

operations with the selected priority.

This  selection  criterion  refers  to  the  operation  number.  The  application  only  shows  the

operations with the specified operation number.

You can also use wildcards.

This  selection  criterion  refers  to  the  tool  defined  for  the  operation.  The  application  shows  all

operations that are assigned to the specified tool.

You can also use wildcards.

Show split OPs

If you enable this checkbox, the application also shows split operations.

Customer name

This selection criterion refers to the customer name (designation) defined in the operation. The

application shows all orders with the selected customer name (designation).

Cost center

This selection criterion refers to the cost center of the workplace defined for the operation. The

application shows all operations that are assigned to workplaces of the selected cost center.

You can also use wildcards.

BDE-MAB_82.docx

Version: 1.0.23570

Page 65 of 72

Monitoring of Shop Floor Data

Planned start ... to ...

This selection criterion refers to the planned start date defined for the operation. The application

only shows the operations whose planned start date is included in the selected period.

Scheduled start time ... to ...

This selection criterion refers to the scheduled start date of the operation. The  application only

shows the operations whose scheduled start date is included in the selected period.

Earliest start ... to ...

This  selection  criterion  refers  to  the  earliest  start  date  of  the  operation.  The  application  only

shows the operations whose earliest start date is included in the selected period.

Latest end ... to ...

This selection criterion refers to the latest end date of the operation. The system only displays

the operations whose latest end date is included in the selected period.

Actual start ... to ...

This  selection  criterion  refers  to  the  start  date  of  the  operation.  The  system  only  displays  the

operations whose start date is included in the selected period.

Actual end ... to ...

This  selection  criterion  refers  to  the  end  date  of  the  operation.  The  system  only  displays  the

operations whose end date is included in the selected period.

Use the MOC application "Order overview" to select operations using the actual dates

of the order, i.e. the order start or order end.

Basic date start ... to ...

This selection criterion refers to the basic start date of the order. The application only displays

the operations whose basic start date of the order is included in the selected period.

Basic date end ... to ...

This selection criterion refers to the basic end  date of the order. The application only  displays

the operations whose basic end date of the order is included in the selected period.

Sales order

This  selection  criterion  refers  to  the  sales  order  defined  in  the  order  header.  The  application

shows all operations that are assigned to the selected sales order.

Order index ... to ...

This  selection  criterion  refers  to  the  order  index  defined  in  the  order  header.  The  application

displays all operations whose order index of the order header matches the selected order index.

Planned order

This  selection  criterion  refers  to  the  planned  SAP  order  number  that  is  defined  in  the  order

header.

BDE-MAB_82.docx

Version: 1.0.23570

Page 66 of 72

Monitoring of Shop Floor Data

Project number

This selection criterion refers to the project number of the operation. The application displays all

orders that are assigned to the selected project number.

Order group

This selection criterion refers to the order group of the order header. The application displays all

operations whose order group of the order header matches the selected order group.

You can also use wildcards.

MRP controller

This selection criterion refers to the MRP controller defined in the order header. The application

shows  all  operations  whose  MRP  controller  of  the  order  header  matches  the  entered  MRP

controller.

You can also use wildcards.

MOP

Use this option to only show merged operations.

You can also use wildcards.

Show MOP

Use this option to specify the merged operations to be displayed.

By default, the application shows merged operations and individual operations. The application

does not show the operations that are summarized in an MOP.

Show the operations logged on for each workplace

If  you  check  this  option,  the  application  shows  an  operation  multiple  times  if  this  OP  is

simultaneously logged on to multiple workplaces.

The category "logged on to workplace" (hidden by default) shows information about the workplace

where the operation is logged on.

Check responsibility area

Using this option, the user can specify if the system checks the responsibility area of the workplace

or  the  responsibility  area  of  the  object  operation/order  to  display  data.  You  need  the  following

function authorizations to use this selection option: filterProdInd + chkresp

Detail application Operations

The  table  shows  the  below-mentioned  fields,  among  other  things.  For  further  information  refer  to  the

following documents

  Existing order data

  Current data and KPIs of the operation

BDE-MAB_82.docx

Version: 1.0.23570

Page 67 of 72

Monitoring of Shop Floor Data

Status category

Status

The status column shows the bitmap (“LED”) defined in the status configuration.

The totals line of this column displays the number of operations.

Status text

The current operation status specifies the status text.

Status since

Specifies the date and time since when the status has been set.

Predecessor status

Status  of  the  preceding  operation.  This  status  specifies  whether  the  preceding  operation  has

already  been  started.  This  is  important  if  you  want  to  know  if  material  needed  for  the  current

operation has already been processed or produced.

Secondary status

Displays the currently set secondary status.

Optionally, you can configure and use secondary statuses while customizing HYDRA.

Order category

Displays specific data for the Operations and Orders.

Relevant fields are:

Order type

Displays the order type as text and symbol.

The glossary describes the standard order types. You can define additional order types as part of

the system customization.

Category

The category summarizes similar order types. The following categories are available in the system:

FA = production order

PJ = project order

PM = maintenance order

KP = capacity order

GK = overhead order

Order

Shows the order number.

BDE-MAB_82.docx

Version: 1.0.23570

Page 68 of 72

Monitoring of Shop Floor Data

Sequence

Order sequence (only relevant if sequences are used).

OP

Split

Shows the operation number.

Shows the split number if the operation is a split operation.

Current number of splits

Shows the number of splits of an operation if the operation has been split.

Note

Shows the short text of the first note of an operation.

Printed

This column shows whether the time ticket has already been printed.

Specifications for production category

The relevant fields are:

Planned workplace

Workplace where the operation is planned.

Planned for

The "planned for" column shows whether the operation is planned

G

M

Group

for a group (pool of groups) or

for a workplace (pool of workplaces).

Group where the operation is planned.

OP dates category

Date specifications for the Operation.

Remaining run time category

remaining run time

Shows  the  remaining  production  time.  The  system  uses  a  formula  and  different  parameters  to

calculate this value. The formula is stored with the operation.

remaining run time

Shows  the  remaining  production  time.  The  system  uses  a  formula  and  different  parameters  to

calculate this value. The formula is stored with the operation.

BDE-MAB_82.docx

Version: 1.0.23570

Page 69 of 72

Monitoring of Shop Floor Data

Target times category

Target time specifications for the Operation.

Additional, calculated fields:

Total setup time

Sum total of setup time, additional setup time and retooling/teardown time.

Target execution time

Total  of  setup  time  plus  processing  time.Primary  quantity/secondary  quantity/tertiary  quantity

category

Target quantity

Quantity specifications for the Operation.

Yield

Yield posted to the operation.

Scrap

Scrap posted to the operation.

Rework

Quantity to be reworked posted to the operation.

Problem quantity

Problem quantity posted to the operation.

Unit

Quantity unit of the values displayed.

The quantities listed here are displayed as base, primary, secondary and tertiary quantities. In

general,  you  should  only  show  one  of  these  quantity  types.  The  terminal  collects  quantities  in

the primary quantity.

Postings category

First logon

Shows the date and time when the operation was logged on for the first time.

Last logoff

Shows the date and time when the operation was logged off the last time. This kind of information

is useful if an operation was reactivated.

Date of last posting

Date of the last posting made for this operation.

BDE-MAB_82.docx

Version: 1.0.23570

Page 70 of 72

Monitoring of Shop Floor Data

Time of last posting

Time of the last posting made for this operation.

Logged on to workplace category

The below-mentioned fields pertaining to this category are only completed, if you set the option

"Show the operations logged on for each workplace".

Workplace

Shows the workplace where the operation is currently logged on.

Short name

Short name of the workplace.

Name

Name of the workplace.

Group

Group of the workplace.

Cost center

Cost center of the workplace.

Toolbar

In  general,  the  application  takes  over  the  parameters  to  call  the  function  or  target  application  from  the

table of the Operations detail application. For this reason, you should always select an operation before

calling an application.

 Operation status (function authorization op.statchg)

Function  Change operation status

 Change secondary status (function authorization op.secstatchg)

FunctionChange the secondary status of an operation

 Modify resource status (function authorization: op.resstatchg)

FunctionChange the resource status of an operation

BDE-MAB_82.docx

Version: 1.0.23570

Page 71 of 72

Monitoring of Shop Floor Data

 Generate merged operation (function authorization: op.colopcreate)

Function Generate merged operation

Use this function to combine the selected operations to form a merged operation. The merged

operation is logged on to the terminal and the terminal shows this merged operation instead of the

different single operations.

 Cancel merged operation (function authorization: op.coloprelease)

Function Cancel merged operation

Use this function to cancel the merged operation. The application shows the different single

operations.

 Order information (function authorization: orin)

Use this button to call the application Order information.

 Order overview (function authorization: orov)

Use this button to call the application Order overview.

 Schedule controlling: save baseline plan (function authorization: esvb)

Function Schedule controlling: save baseline plan

BDE-MAB_82.docx

Version: 1.0.23570

Page 72 of 72

