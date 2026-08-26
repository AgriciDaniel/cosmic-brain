Manual

Printing of Shop Floor Papers
(MOC)
BDE-DAP 8.1

Version 1.0.4716

Last changed on: 19.06.2020

Printing of Shop Floor Papers (MOC)

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

BDE-DAP_81.docx

Version: 1.0.8696

Page 2 of 7

Printing of Shop Floor Papers (MOC)

Contents

1  Übersicht Drucken Arbeitspapiere ............................................................... 4

2  Print Shop Floor Papers ............................................................................... 5

3  Print Time Tickets ........................................................................................ 6

BDE-DAP_81.docx

Version: 1.0.8696

Page 3 of 7

Printing of Shop Floor Papers (MOC)

1  Übersicht Drucken Arbeitspapiere

Purpose

This component provides two printed reports showing order or operation-related data.

You use the function package if

  You need an order-related document that you can give to production to be attached to material,

for example, as a waybill.

  You  need  an  operation-related  document  that  you  can  give  to  production  in  which  handwritten

operation-related information can be noted.

  You need a barcoded document that you can use to import an operation at the terminal using a

barcode scanner.

Integration

Data  contained  on  the  shop  floor  paper  or  time  ticket  are  drawn  from  the  HYDRA  order  backlog.  If

planning dates are shown, depending on the type of planning, they  have either been retrieved from the

ERP system or they are the result of detailed scheduling performed in HYDRA shop floor planning.

You can customize the system to adjust the layout or to add additional information.

Features

  Option to print time tickets with a barcode

  Option to print shop floor papers with a barcode

BDE-DAP_81.docx

Version: 1.0.8696

Page 4 of 7

Printing of Shop Floor Papers (MOC)

2  Print Shop Floor Papers

Summary

Menu

Production control  Production support Pool of orders

Transaction code

- (plop for pool of orders)

Function authorization

repsfpap

Usage

The purpose of these functions is to print out shop floor papers  with a  barcode  as an order/ production

paper (in part also referred to as job tickets).

Integration

The function is called up from the order backlog application. Depending on the order/ orders selected, a

separate  shop  floor  paper  is  displayed  in  the  preview  screen  for  each  order,  which  from  there  can  be

printed.

To print a shop floor paper, follow the steps listed below:

1.

In the list, highlight the orders/ operations you would like to print out on the shop floor paper. Click

on the top left-side corner of the table if you want to highlight all operations.

2.  Click on the "shop floor paper" icon to call up the print preview screen. In it, there will be one new

page for each order.

3.  Click on the icon "Print report"

 in the print preview to print out the shop floor papers on the

default printer set in MOC.

The information displayed is defined in the order header or at the operation. The layout can be adjusted

to customer specifications when HYDRA is customized.

BDE-DAP_81.docx

Version: 1.0.8696

Page 5 of 7

Printing of Shop Floor Papers (MOC)

3  Print Time Tickets

Summary

Menu

Production control  Production support  Pool of orders

Transaction code

- (plop for pool of orders)

Function authorization

reptimet

Usage

The purpose of these functions is to generate a time ticket. A separate time ticket (or goods issue/ goods

receipt document) can be created and printed for each order.

Integration

The function is called up from the order backlog application. Depending on the order/ orders selected, a

separate time ticket is displayed in the preview screen for each order, which can be printed from there.

To print the time ticket/ time tickets, follow the steps listed below:

4.

In the list, highlight the orders/ operations you would like to print out on the time ticket. Click on

the top left-side corner of the table if you want to highlight all operations.

5.  Click on the "time ticket" icon to call up the print preview screen. In it, there will be one new page

for each order.

6.  Click on the icon "Print report"

 in the print preview to print out the time tickets on the default

printer set in MOC.

Please note: Printing the time tickets will cause an indicator "printed" to be set at the relevant operation.

The indicator is made available for display in the order overview.

A  printout  contains  all  important  barcodes  needed  to  post  all  of  this  order's  operations.  The  information

displayed is defined in the relevant order header.

Notes about the selected fields

Start date

Planned start as specified in the operation (Dates index tab).

Finish date

Planned end as specified in the operation (Dates index tab).

BDE-DAP_81.docx

Version: 1.0.8696

Page 6 of 7

Printing of Shop Floor Papers (MOC)

Set up

Setup time as specified in the operation (Dates index tab).

Please note: Any existing setup time addition is not taken into account.

Processing

Processing time as specified in the operation (Durations index tab).

Please note: In the event of any change in the target cycle and/or the partitioning (e.g. planning in

HLS using production variants), this will not update the processing time at the operation.

Tr

Te

Target tr as specified in the operation (Durations index tab).

Target te as specified in the operation (Durations index tab).

The layout can be adjusted to customer specifications when HYDRA is customized.

BDE-DAP_81.docx

Version: 1.0.8696

Page 7 of 7

