Manual

ID Tracking
PDV-PTR 8.1

Version 1.0.23049

Last changed on: 02.09.2020

ID Tracking

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

PDV-PTR_81.docx

Version: 1.0.23049

Page 2 of 5

Contents

1

ID Tracing (tabular) ...................................................................................... 4

ID Tracking

PDV-PTR_81.docx

Version: 1.0.23049

Page 3 of 5

ID Tracking

1

ID Tracing (tabular)

Overview

Menu

Quality management -> Process analysis -> ID tracing (tabular)

Transaction code

ptnt

Function authorization

ptnt

This  document  describes  the  application  ID  Tracing  (Tabular)  of  the  Manufacturing  Operation  Center

(MOC).

Purpose

ID Tracing (tabular) enables the tabular presentation and analysis of process values that can be selected

referring  to  search  keys  (IDs).  Search  keys  are  identification  tags  provided  by  the  machine.  They  are

used  to  identify  measurement  tuples  instead  of  or  in  addition  to  the  machine  and  time  stamps  of  data

collected in the database.

Integration

You  have  to  collect  and  save  measured  values  based  on  IDs  in  order  to  use  this  function.  TNT

configuration  is  a  machine-specific  customization  of  data  collection.  If  you  order  this  type  of  data

collection,  the  MPDV  Customizing  Team  will  implement  the  new  structure.  After  analyzing  and  defining

the new structure of data collection, MPDV customizes the system accordingly.

Selection parameters

IDs can be selected in the selection panel. The following selection criteria are available in the application:

Tag type:

Identifies the key field. The name of the ID tag.

Tag value

Search value of the selected ID tag.

Machine

Number of the machine as an additional search field. It is required, if the same tags are available at

different machines/workplaces.

Time range from - to:

The data selected by the tag value is restricted temporally.

PDV-PTR_81.docx

Version: 1.0.23049

Page 4 of 5

ID Tracking

Field descriptions

Apart  from  the  default  columns  "machine"  and  "point  in  time"  the  table  also  includes  the  data

columns defined by the respective data structure.  The table provides many columns including data

values. The IDs and their values are listed in one row.

PDV-PTR_81.docx

Version: 1.0.23049

Page 5 of 5

