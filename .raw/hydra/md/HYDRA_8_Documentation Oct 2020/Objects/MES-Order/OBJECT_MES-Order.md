Order Object

1  Order Object

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

OBJECT_MES-Order.docx

Version: 1.0.1362

Page 1 of 2

Structure

Every order is identified by a unique ID or order number. This is either provided and administered by an

upstream system (generally ERP systems) or by the MES system itself. The object Order is structured as

follows:

Order Object

Integration

The order includes n operations that are to be carried out. The order thus produces a certain material or

final product with a certain type of material.

OBJECT_MES-Order.docx

Version: 1.0.1362

Page 2 of 2

