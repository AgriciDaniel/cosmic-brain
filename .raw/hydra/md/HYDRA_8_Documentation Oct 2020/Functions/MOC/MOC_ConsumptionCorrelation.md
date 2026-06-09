Verbrauchskorrelation

1  Consumption correlation

Overview

Menu

Resource management  Resource analysis

 Consumption correlation

Transaction code

concor

Function authorization

concor

This document describes the "consumption correlation" application in the Manufacturing Operation Center

(MOC).

Application

The  consumption  correlation  graphically  shows  energy  consumption  in  relation  to  the  recorded

operations.  You  can  present  energy  consumption  in  connection  with  the  accrued  information  on

operations.

Energy documents are assigned to the produced operations by time and selection.

Selection criteria

Reference

Selection of resources using the resource list

Date from / until

Selection of a period for consumption correlation

Workplace

Selection of workplace using the workplaces dialog

Group from / to

Selection based on a group. Selection by drop-down list

Finished article

Restriction to a finished article

Order

Restriction to an order

OP

Restriction to a single operation

MOC_ConsumptionCorrelation.docx

Version: 1.0.8416

Page 1 of 2

Verbrauchskorrelation

Automatic counter assignment (EMG 8.2)

Requirement:  In  the  application  "Assignment  of  counter  to  machine",  the  energy  meters  are

assigned  to  workplaces.  If  this  option  is  checked,  you  cannot  select  the  energy  meters manually.

Following  the  assignment  of  counter  to  machine,  the  energy  meters  are  identified  and  then

displayed as result.

Detail application consumption correlation

The  detail  application  includes  two  sections.  The  upper  part  shows  the  log  records  of  operations,  the

lower section displays the consumption.

The log records of operations matching the selection criteria entered above (period from/to, article, order

number/operation  number)  are  displayed  as  individual  bars  in  the  detail  application  (1  row  for  each

workplace/machine).

The  user  can  select  the  displayed  log  records  (multiple  selection  possible  by  using  the  Ctrl  key).  The

resulting time slice/s is/are used for presenting the consumption.

The lower section of the detail application shows two sections with different information for each selected

consumption meter.

Section 1:

This section shows the result of the correlation: The periods result from the selected order and multiple

selection of order bars.

Section 2:

The  consumption  documents  matching  the  selected  consumption  meter  and  period  entered  in  the

selection  panel  are  shown.  However,  they  are  not  displayed  as  complete  document  but  rather  as

averaged  point  (average  power  in  the  document).  This  refers  to  the  load  profile  of  the  consumption

resource.

MOC_ConsumptionCorrelation.docx

Version: 1.0.8416

Page 2 of 2

