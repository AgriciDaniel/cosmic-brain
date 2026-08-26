Configuration of Material Availability Check

1  Configuration of Material Availability Check

Overview

The application "Planned inventory levels" and the detail application "Planned inventory levels" integrated

in  the  HYDRA  Shop  Floor  Scheduling  module  are  used  for  the  presentation  of  the  predicted  inventory

development  over  a  selectable  period.  In  order  to  display  the  inventory  development  for  a  specific

article/material, several assignments have to be made in advance; they are described in this document.

The application is available for HYDRA 8 from service pack 6.

This document describes how to enable the function "Planned inventory levels" in the HYDRA Shop Floor

Scheduling module. The required settings can be made by a trained user or a consultant in the course of

implementing the system.

ATP inspection group configuration

Menu

Master data  Production control  ATP inspection groups

Transaction code

atpig

Function authorization

atpig

The ATP (Available To Promise) inspection group can be used to enter various models for calculating the

inventory development. You can find more information about the ATP inspection groups application here.

Configuration of ATP inspection group assignment

Menu

Master data  Production control  ATP inspection group assignment

Transaction code

atpiga

Function authorization

atpiga

By assigning an ATP inspection group to an article and/or material  you can define how the development

is to be calculated for the selected material and/or selected article.

Each material/article can be assigned to exactly one ATP inspection group.

You can find more information about the ATP inspection group assignment application here.

HLS-MVP_Configuration.docx

Version: 1.0.6455

Page 1 of 3

Configuration of Material Availability Check

Configurations of operation

An increase in stock of a material/article can be represented via producing operations. The  stock of the

article from the operation ("article" field) increases by the target quantity (P) entered in the operation.

A decrease in stock of a material/article can be  represented via consuming operations. In this case, the

materials/articles entered in the component list of the operation are consumed.

The  inventory  development  for  production  and/or  consumption  is  calculated  on  the  basis  of  the  ATP

inspection group assigned to the article.

Configuration of initial inventories

The  function  "planned  inventory  levels"  considers  initial  material  stocks.  These  initial  stocks  are  to  be

entered in  the system as batches. For this purpose,  the batches can be created either via the interface

EIS-MCL or manually in the system.

Only batches which are not reserved for an operation and which have a "free" status and batch

class  "yield"  are  included  in  the  initial  inventory.  For  the  purpose  of  calculating  the  initial

inventory, the existing remaining quantity is used.

Calling up the application

Menu

Production control  Production preparation  Planned inventory levels

Transaction code

invlev

Function authorization

invlev

HLS-MVP_Configuration.docx

Version: 1.0.6455

Page 2 of 3

Configuration of Material Availability Check

The  detail  application  of  the  HYDRA  Shop  Floor  Scheduling  module  can  be  activated  via  the  "planned

inventory  levels"  tab.  If  the  button  is  not  visible,  this  may  be  due  to  a  missing  HLS-MVP  license  or  the

missing function authorization grapv.invlev.

You can find more information about the "planned inventory levels" application here.

HLS-MVP_Configuration.docx

Version: 1.0.6455

Page 3 of 3

