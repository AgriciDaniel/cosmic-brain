Manual

Energy Management:
Consumption Correlation
EMG-KLE 8.1

Version 1.0.23049

Last changed on: 01.09.2020

Energy Management: Consumption Correlation

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

EMG-KLE_81.docx

Version: 1.0.23049

Page 2 of 6

Energy Management: Consumption Correlation

Contents

1  Energy Management: Consumption Correlation .......................................... 4

2  Consumption correlation .............................................................................. 5

EMG-KLE_81.docx

Version: 1.0.23049

Page 3 of 6

Energy Management: Consumption Correlation

1  Energy Management: Consumption Correlation

Possible fields of application

Evaluation  function  for  energy  data.  Efficient,  graphic  reports  to  monitor  the  development  of  energy

consumption (load profile) in connection with the produced orders and articles/items.

The function package is used if you would like:





to analyze consumption over time, whereas time is divided into small intervals of 15 minutes.

to analyze consumption in relation to the produced articles/items or orders.

Integration

These reports require the function packages EMG-MGM and EMG-EVF as basis for data collection.

Functions

  Graphic  presentation  of  energy  consumption  over  time.  Grid  view  in  intervals  of  15  minutes  or

hours. The load profile is presented as trend line.

  Hierarchical selection of the energy meters to be displayed. Presentation of calculated or physical

counters.

  Graphic  GANNT  presentation  of  the  operations  posted  during  the  relevant  period,  selected  by

workplaces, order number or article.

  Projection  of  consumption  data  onto  corresponding  display  bars  by  multiple  selection  of

operations including totals function over the entire period.

EMG-KLE_81.docx

Version: 1.0.23049

Page 4 of 6

Energy Management: Consumption Correlation

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

EMG-KLE_81.docx

Version: 1.0.23049

Page 5 of 6

Energy Management: Consumption Correlation

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

EMG-KLE_81.docx

Version: 1.0.23049

Page 6 of 6

