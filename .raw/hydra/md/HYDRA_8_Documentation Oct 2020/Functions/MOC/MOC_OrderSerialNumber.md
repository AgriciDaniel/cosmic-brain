Editing Serial Numbers

1  Editing Serial Numbers

Overview

Menu

Order management  Order management  Edit serial numbers

Transaction code

edser

Function authorization

edser

Usage

Serial numbers are assigned in order to be able to distinguish individual material items from each other.

The  combination  of  material  number  and  serial  number  clearly  identifies  an  individual  item.  Serial

numbers are usually assigned in the ERP system when a production order is created.

Integration

Serial numbers are created in the ERP system and transferred from the ERP system via the order data

interface.  In  the  system,  they  are  administered  as  details  for  the  order  header.  Each  serial  number  is

unique within a production order and is composed of a character string with a maximum of 20 characters.

Serial numbers are entered at the AIP when operations are interrupted or logged off. Serial numbers are

entered individually  with quantity 1 for a running OP and then uploaded to the ERP system as a partial

confirmation.

In  addition,  a  serial  number  may  be  administered  as  a  batch  in  the  MPL.  In  this  application  case,  the

serial number exists as a batch number with quantity 1 and may be used upon entry for tracking material

which is kept in batches.

Selection Criteria

The following selection criteria are available in the application:

Order

HYDRA order number or MES order number (combined order/OP number)

Order type

Operation and/or order header

Serial number

Available or entered serial number

MOC_OrderSerialNumber.docx

Version: 1.0.18468

Page 1 of 3

Editing Serial Numbers

Usage

F = Free/not entered yet

A = Serial number entered as scrap

G = Serial number entered as yield

P = Serial number entered as open quantity

N = Serial number entered as rework

X = Serial number locked

Field Descriptions

Order

HYDRA

order

number

for

"Order

header"

order

type

and/or

MES order number for "Operation" order type.

Order type

Order type AU or AG (AU = order header, AG = operation)

Usage

Stock = Free / not entered yet

Yield = Serial number, entered as yield

Scrap = Serial number, entered as scrap

Reason

If a serial number was entered as scrap, the scrap reason is indicated here.

Reason text

Display of text entered as the scrap reason

Serial number

Available or entered serial number

Editor

User who created or last edited the entry.

Toolbar

 Insert

This  function  can  be  used  to  create  a  new  serial  number  for  an  order  (order  header).  It  is  only

possible to create one serial number for an order and with "Stock" usage.

MOC_OrderSerialNumber.docx

Version: 1.0.18468

Page 2 of 3

Editing Serial Numbers

  Edit

This  function  can  be  used  to  modify  the  usage  and/or  the  scrap  reason  for  an  existing  serial

number.

If "Scrap" is used, the scrap reason is defined here. The scrap reason  must have been defined as

the SYSTEM reason in HYDRA.

 Delete

This  function  is  used  to  delete  an  existing  entry  for  a  serial  number.  By  selecting  them,  several

entries can be deleted at the same time.

 Order information

Calls up the order information application.

MOC_OrderSerialNumber.docx

Version: 1.0.18468

Page 3 of 3

