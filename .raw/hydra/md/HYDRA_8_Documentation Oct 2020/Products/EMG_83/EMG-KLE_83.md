Manual

Energy Management
Consumption Correlation
EMG-KLE 8.3

Version 1.0.23049

Last changed on: 01.09.2020

Energy Management Consumption Correlation

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

EMG-KLE_83.docx

Version: 1.0.23049

Page 2 of 8

Energy Management Consumption Correlation

Contents

1  Energy Management – Consumption Correlation ........................................ 4

2  Consumption correlation .............................................................................. 5

3  Status of Consumption Correlation .............................................................. 7

EMG-KLE_83.docx

Version: 1.0.23049

Page 3 of 8

Energy Management Consumption Correlation

1  Energy Management – Consumption Correlation

Purpose

Evaluation function for energy data. The function provides efficient graphic evaluations that you can use

to monitor the development of energy consumption (load profile) in correlation with produced orders and

articles or the machine status.

You use the function package for the following purposes:

  You want to analyze consumption over time. Here, the time is partitioned in small intervals of 15

minutes each.

  You want to analyze consumption in relation to the produced articles or orders.

  You want to analyze consumption in relation to the machine status.

Integration

The evaluations require collected data and are therefore based on the function packages EMG-MGM and

EMG-EVF.

Features

  Graphic presentation of energy consumption over time. Display using intervals of 15 minutes or

hour intervals. Display of load profile as trend line.

  Hierarchical  selection  of  the  displayed  energy  counters.  Display  of  calculated  or  physical

counters.

  Graphic  GANTT  chart  showing  the  operations  logged  on  during  the  relevant  period,  narrowed

down by workplace, order number or article.

  Graphic GANTT chart showing the machine statuses posted during the relevant period, narrowed

down by workplace or (report) group.

  Projection  of  consumption  data  to  correlated  bars  in  the  chart  using  a  multiple  selection  of

operations/machine statuses including a totals function for the total time.

EMG-KLE_83.docx

Version: 1.0.23049

Page 4 of 8

Energy Management Consumption Correlation

2  Consumption correlation

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

EMG-KLE_83.docx

Version: 1.0.23049

Page 5 of 8

Energy Management Consumption Correlation

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

EMG-KLE_83.docx

Version: 1.0.23049

Page 6 of 8

Energy Management Consumption Correlation

3  Status of Consumption Correlation

Overview

Menu

Resource management  Resource analysis

 Status of consumption correlation

Transaction code

concorsta

Function authorization

concorsta

This  document  describes  the  application  "Status  of  consumption  correlation"  in  the  Manufacturing

Operation Center (MOC).

Application

The  application  "Status  of  consumption  correlation"  is  new.    The  status  of  consumption  correlation

graphically shows the energy consumption in relation to the recorded statuses of workplaces/machines.

You can present energy consumption in connection with the accrued information on statuses. This way, it

is e.g. possible to identify the energy consumption during the setup or a disturbance.

Energy documents are assigned to the statuses by time and selection.

Please note:

The application only shows completed status documents.

Selection criteria

Reference

Selection of resources using the resource list

Date from / until

Selection of a period for consumption correlation

Workplace

Selection of workplace using the workplaces dialog

Group from / to

Selection based on a group. Selection by drop-down list

Report group

Selection based on a report group. Selection by drop-down list

EMG-KLE_83.docx

Version: 1.0.23049

Page 7 of 8

Energy Management Consumption Correlation

Automatic counter assignment

  If this option is checked, HYDRA identifies automatically the relevant energy counters following the

counter to machine assignment.

Detail application status of consumption correlation

The  detail  application  includes  two  sections.  The  upper  part  shows  the  status  of  machines/workplaces,

the lower section displays the consumption.

The  statuses  matching  the  above  mentioned  selection  criteria  (period  from/to,  workplace,  group/report

group) are displayed as individual bars in the detail application (1 row for each workplace/machine).

The user can select the displayed status log records (multiple selection is possible by using the Ctrl key).

The resulting time slice/s is/are used for presenting the consumption.

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

EMG-KLE_83.docx

Version: 1.0.23049

Page 8 of 8

