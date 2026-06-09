Edit Orders

1  Edit Orders

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

MOC_EditOrders.docx

Version: 1.5

Page 1 of 3

Edit Orders

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

This selection criterion refers to the planned order stored in the order header. The application shows

all orders of the selected planned order. You can also use wildcards.

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

MOC_EditOrders.docx

Version: 1.5

Page 2 of 3

Edit Orders

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

MOC_EditOrders.docx

Version: 1.5

Page 3 of 3

