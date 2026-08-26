Manual

Complex Order Networks
HLS-KAN 8.2

Version 1.1.23232

Last changed on: 15.09.2020

Complex Order Networks

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

Complex Order Networks

Version: 1.1.23232

Page 2 of 10

Complex Order Networks

Contents

1  Overview: Complex Order Networks ............................................................ 4

2  Order Network .............................................................................................. 5

3  Edit Order Network ....................................................................................... 9

Complex Order Networks

Version: 1.1.23232

Page 3 of 10

Complex Order Networks

1

 Overview: Complex Order Networks

Purpose

This functions package provides functions used in association with relationships (dependencies) covering

all  orders.  You  use  this  function  package  when  you  work  with  linked  orders,  which  may  be  required  in

assembly production.

Integration

The relationships (dependencies) between the orders are typically transferred via the  interface from the

ERP system.

Features

  The function accounts for the linked relationships (dependencies) between the production orders that

play a role in manufacturing an assembly.

  Transfers  linked  relationships  (dependencies)  via  the  HYDRA  ERP/  PPS  interface  (requires:  SIS-

ERP)

  Graphic presentation showing the linked relationships (dependencies)

  Accounts for linked relationships (dependencies) in the event of postponed dates, rescheduled dates

or any other planning activities

  Provides the ability to manually define linked relationships (dependencies)

Complex Order Networks

Version: 1.1.23232

Page 4 of 10

Complex Order Networks

2  Order Network

Overview

HYDRA menu

Production control  Production preparation  Order network

FEDRA menu

Advanced Process Modeling  Current  Order network

Transaction code

ornet

Function authorization

ornet

Purpose

You use this application if you  would like to have an  overview of an order network,  i.e. a view of linked

orders.

Integration

The order network displays order planning results in a Gantt chart.

Requirements

For  order  networks  across  orders,  you  must  have  defined  relationships  between  operations.  The

relationships  between  orders,  or  more  accurately,  between  operations  of  related  orders,  must  be

transmitted from the ERP system via an interface or

Selection criteria

The application provides the following selection criteria:

Order

The order network for this order can be determined using this field. You can also use wildcards.

When an order number is entered, adjacent orders are selected as well. If the adjacent succeeding

orders  have  predecessors,  only  their  last  operation  is  displayed.  If  the  adjacent  preceding  orders

have successors, only their first operation is displayed.

Project number

If a selection is made by project number, all orders are determined that are assigned to the project

number  entered.  This  requires  that  the  project  number  is  defined  in  the  order.  You  can  also  use

wildcards.

Sales order

If a selection is made by customer sales order, all orders are determined that are  assigned to the

sales order entered. This requires that the sales order number is defined in the order. You can also

use wildcards.

Complex Order Networks

Version: 1.1.23232

Page 5 of 10

Complex Order Networks

Customer name

If  you enter a customer name, all orders are determined that are  assigned to the customer name

you  entered.  This  requires  that  the  customer  name  is  defined  in  the  order.  You  can  also  use

wildcards.

Note:  Only  operations  are  selected  and  shown  that  are  at  least  connected  to  one  other

operation and have a planned start or planned end. The application does not display operations

of orders including only one stage (i.e. orders with one operation only) that are not connected to

an operation of another order. Also operations with an identical planned start and end are not

displayed.

Generally, only such orders are integrated that have planning identifiers configured for the order

type with either F (detailed planning) or T (scheduling).

Toolbar

 Zoom out

Reduces the display.

Zoom in

Enlarges the display.

 (Grouped by) sales order

Groups the orders and operations by

sales order  order  operation

 (Grouped by) project number

Groups the orders and operations by

project number  order  operation

 (Grouped by) order

Groups the orders and operations by

Order  Operation

Complex Order Networks

Version: 1.1.23232

Page 6 of 10

Complex Order Networks

Detail application

Orders are listed on the left in table form. Data can be shown or hidden with groupings

. Orders are

displayed in groups:

  Project number or customer sales order number (depending on how they are grouped)

o  Order

  Operation

Displayed at the lowest level are operations with the following information:

  Operation number

  Workplace at which the operation is planned (if planned)

  Group in which the operation is planned

Operations are shown in the form of a bar on the right. For every entry (each line) on the left, there is a

corresponding illustration on the right:

The project order or customer sales order is always displayed in the form of a bar, which is limited at each

end  with  triangles.  The  length  of  the  bar  depends  on  when  each  of  the  orders  listed  under  the  project

order or sales order, or rather their operations, are scheduled.

If  you  expand  the  project  order  or  the  sales  order,  you  will  see  each  separate  order.  Likewise  for  each

order, you will see a bar that is also limited with triangles. The length of the bar depends on when each of

the individual operations is scheduled.

When you now expand an order, each of the order's operations is displayed in the form of a bar.

What can now be seen relatively clearly here: the length of the order bar depends on the time domain in

which the operations are planned.

Complex Order Networks

Version: 1.1.23232

Page 7 of 10

Complex Order Networks

All orders are expanded when data is requested and when groups are modified.

The format of the date values displayed on the Gantt chart depends on the format specified by

the operating system. The client format is not relevant.

No  shift-free  times  are  displayed  in  the  application.  The  length  of  the  bars  in  each  of  the  operations  is

based on the Gregorian calendar. It always equals the length of time between the planned start and the

planned end. The coloring of the OP bars is based on the order status configuration.

When you move your mouse cursor over an operation bar, a tool tip is shown that includes the following

information:

  MES order number

  Article

  Article designation

  OP designation: operation designation

  Target quantity (P): target quantity in primary quantity unit

  Start: planned start according to planning; if the operation is still in the pool of groups, this is the

scheduled start

  End: planned end according to planning; if the operation is still in the pool of groups, this is the

scheduled end.

The following applications can be called up from the operation's context menu:

  Order information (function authorization: orin)

  Order progress / order overview (function authorization: orov)

  Edit order network (function authorization: ednet)

Request from graphic planning board

If the order network is called from the graphic planning board, the operations displayed in the Gantt chart

are updated  with the planned dates scheduled in  the  graphic planning  board, because these may differ

from those in the database.

Complex Order Networks

Version: 1.1.23232

Page 8 of 10

Complex Order Networks

3  Edit Order Network

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

Complex Order Networks

Version: 1.1.23232

Page 9 of 10

Complex Order Networks

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

Complex Order Networks

Version: 1.1.23232

Page 10 of 10

