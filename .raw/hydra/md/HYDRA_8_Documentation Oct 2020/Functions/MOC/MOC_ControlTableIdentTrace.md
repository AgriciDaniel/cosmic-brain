ID Tracing (Tabular)

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

MOC_ControlTableIdentTrace.docx

Version: 1.0.7272

Page 1 of 2

ID Tracing (Tabular)

Field descriptions

Apart  from  the  default  columns  "machine"  and  "point  in  time"  the  table  also  includes  the  data

columns defined by the respective data structure.  The table provides many columns including data

values. The IDs and their values are listed in one row.

MOC_ControlTableIdentTrace.docx

Version: 1.0.7272

Page 2 of 2

