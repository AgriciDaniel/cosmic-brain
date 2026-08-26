Manual

Graphic Order Sequencing
BDE-GAV 8.1

Version 1.0.4716

Last changed on: 19.06.2020

Graphic Order Sequencing

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

BDE-GAV_81.docx

Version: 1.0.8700

Page 2 of 4

Graphic Order Sequencing

Contents

1  Overview of Graphic Order Sequencing ...................................................... 4

BDE-GAV_81.docx

Version: 1.0.8700

Page 3 of 4

Graphic Order Sequencing

1

 Overview of Graphic Order Sequencing

Possible fields of application

The graphic order sequencing (GAV) is an integrated planning module for the preparation of sequencing

lists  for  an  organizational  unit  within  the  scope  of  shop  floor  control.  Interactive  planning  is  done  by

modifying the current planning situation manually.

Implementation notes

The function package can be used if you do not need to take restrictions into account for order/operation

sequencing  (e.g.  checking  the  capacities  of  primary  or  secondary  resources,  checking  of  relationships,

checking of basic dates) and you do not require planning automatisms (e.g. automatic assignment) for the

planning process.

Consequently, order sequencing represents a cost-effective alternative to HYDRA shop floor scheduling

(HLS) for the planning of production orders.

Integration

The result of planning orders/operations onto individual machines can be seen in the order sequencing at

shop floor terminals: the operations are shown in the planned order as per the sequence planning of the

graphic planning board.

Functions

Functions for the following tasks are integrated:

  Displaying operations that are stored in the pool of orders related to a group in HYDRA.

  Presentation of the planning situation in a Gantt diagram.

  Manual planning of an operation onto a workplace/machine.

  Manual replanning of an operation onto another workplace or group

  Specification  of  a  processing  sequence  (“sequencing”)  as  basis  for  displaying  the  operations  to

be produced in the sequencing list at the terminal

  Splitting of operations (requires the license BDE-SSG.)

BDE-GAV_81.docx

Version: 1.0.8700

Page 4 of 4

