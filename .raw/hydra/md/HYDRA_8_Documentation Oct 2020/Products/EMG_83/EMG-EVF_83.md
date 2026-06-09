Manual

Energy Management:
Consumption Recording PO
EMG-EVF 8.3

Version 1.0.23049

Last changed on: 01.09.2020

  Energy Management: Consumption Recording PO

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

EMG-EVF_83.docx

Version: 1.0.23049

Page 2 of 4

  Energy Management: Consumption Recording PO

Contents

1  Energy Management: Consumption Recording PO ..................................... 4

EMG-EVF_83.docx

Version: 1.0.23049

Page 3 of 4

  Energy Management: Consumption Recording PO

1  Energy Management: Consumption Recording PO

Purpose

Application service (AS) including functions for the assignment of recorded consumption values to objects

of the shop floor data collection and of the materials management.

You use the function package for the following purposes:

  You want to post consumption as material in relation to the produced articles or orders.

  You want to perform evaluations/reports based on the materials management.

  You want to analyze consumption with reference to the orders produced.

Integration

The application services shop floor data/order data management (BDE-BDM) are licensed. Consequently,

the posting and evaluation logics of the relevant services are available. You can add the MOC evaluation

functions  of  the  modules  shop  floor  data  collection,  materials  management  and  energy  management.

With  respect  to  energy  management,  this  is,  for  example,  the  function  of  the  correlative  consumption

analysis EMG-KLE.

If  you  require  an  inventory  management  including  goods  movements,  which  are  identified  using  the

automatically  collected  consumption,  then  you  additionally  require  the  license  for  the  materials  and

inventory management (MPL-MBV).

Features

  Definition of "material types" for energy consumption

  Assignment of the "material" energy as consumption material in the order data

  Order-related  recording  and  posting  of  the  consumption  using  the  energy  counters  assigned  to

the workplaces

  List of the order-related energy consumption based on the consumption that has been recorded

and posted as material

  Note:  You  require  separate  licenses  for  MOC  functions  providing  evaluations/reports  in  the

different modules.

EMG-EVF_83.docx

Version: 1.0.23049

Page 4 of 4

