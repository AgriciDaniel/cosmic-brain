ID Tracing (tabular)

1

ID Tracing (tabular)

Overview

Menu

Quality management  Process analysis  ID tracing

Transaction code

cidt

Function authorization

cidt

This  document  describes  the  application  "ID  Tracing  (tabular)”  in  the  Manufacturing  Operation  Center

(MOC).

Usage

ID Tracing enables the tabular presentation and analysis of process values that can be selected referring

to  search  keys  (IDs).  Search  keys  are  identification  tags  provided  by  the  machine.  They  are  used  to

identify measurement tuples instead of or in addition to the machine and time stamps of data collected in

the database.

Integration

Measured  values  must  be  collected  and  saved  based  on  IDs  in  order  to  use  this  function.  For  this

purpose, at least one channel with the data type "tag" must be defined in the application "PDV  - logical

channels" and data collection must be configured accordingly.

Selection parameters

IDs can be selected in the selection panel. The following selection criteria are available in the application:

Tag type:

Identifies the key field. The name of the ID tag.

Tag ID

Search value of the selected ID tag.

Workplace

Number of the workplace as an additional search field. Is required, if the same tags are available at

different machines/workplaces.

Time range from - to:

The data selected by the tag value is restricted temporally.

MOC_ControlTableAdvancedIndentTrace.docxVersion: 1.0.5116

Page 1 of 3

Consider the last time range of the tag value only

If this function is enabled the data selected is restricted to last time range recorded for the selected

ID Tracing (tabular)

tag value.

Field descriptions

This tabular report shows the process characteristics recorded and saved  in the database including the

following information:

Characteristic

Technical name of the characteristic or the entered process parameter

Designation

Defined characteristic name

Machine

Defined machine

Process parameters

Defined process parameter

Target value

The target value defined for this recorded process parameter at that specific point in time

UTL

The upper tolerance limit defined for this recorded process parameter at that specific point in time

UPAL

The upper process action limit defined for this recorded process parameter at that specific point in

time

LTL

The lower tolerance limit defined for this recorded process parameter at that specific point in time

LPAL

The lower process action limit defined for this recorded process parameter at that specific point in

time

Unit

Unit of the recorded characteristic

Measured value

Measured value recorded for the characteristic at the time of measurement

Time of measurement

Time of measurement of the characteristic

MOC_ControlTableAdvancedIndentTrace.docxVersion: 1.0.5116

Page 2 of 3

ID Tracing (tabular)

MOC_ControlTableAdvancedIndentTrace.docxVersion: 1.0.5116

Page 3 of 3

