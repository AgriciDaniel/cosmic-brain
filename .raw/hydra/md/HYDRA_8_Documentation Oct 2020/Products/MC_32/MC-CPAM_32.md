Manual

Client Performance Analysis
Machines / Workplaces
MC-CPAM 3.2

Version 1.1.23049

Last changed on: 01.09.2020

Client Performance Analysis Machines / Workplaces

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

MC-CPAM_32.docx

Version: 1.1.23049

Page 2 of 7

Client Performance Analysis Machines / Workplaces

Contents

1  Performance Analysis - General .................................................................. 4

1.1  General ............................................................................................................... 4

2  Performance Analysis .................................................................................. 5

2.1  Dashboard: Overview .......................................................................................... 5

2.2  Dashboard: Workplace Evaluation ...................................................................... 5

MC-CPAM_32.docx

Version: 1.1.23049

Page 3 of 7

  Client Performance Analysis Machines / Workplaces

1  Performance Analysis - General

1.1  General

It is the objective of the Performance Analysis to evaluate the data available from the connected systems.

Subject to the evaluation's objective, the following dashboards may be chosen.

Please note: MES Cockpit uses a separate data basis including the functions integrated there.

MC-CPAM_32.docx

Version: 1.1.23049

Page 4 of 7

  Client Performance Analysis Machines / Workplaces

2  Performance Analysis

2.1  Dashboard: Overview

Function authorization  MC-Overview

The overview's aim is to present information for the current shift.

The  three  defined  KPIs  such  as  the  rate  of  capacity  utilization,  OEE  and  setup  rate  are  shown  for  the

selected workplaces and all produced yield and scrap quantities are compared with each other. KPIs are

presented in a tachometer chart.

The user may select the relevant objects to restrict the objects included in the overview.

2.1.1.1

Selections

The following selection options are provided in this dashboard:

  Workplace

In  addition  to  the  workplace  number,  the  machine's  site  is  also  shown  (name  of  system  from

which  the  machine  is  imported).  Only  those  workplaces  are  shown  for  which  the  user  is

authorized by the responsibility area or for which no responsibility area is defined. Responsibility

areas  of  imported  machines  are  configured  and  edited  via  the  administration  client  of  MES

Cockpit.

  Cost center

Only the cost centers of displayed workplaces may be selected.

  Workplace group

Only the workplace groups of displayed workplaces may be selected.

2.2  Dashboard: Workplace Evaluation

Function authorization  MC-WPAnalysis

The objective of the dashboard is to present and evaluate machine-related KPIs using different groupings

and  dimensions. The individual reports allow switching between the different dimensions, such as  year,

calendar week, shift date and shift by zooming in and out (drill down).

In addition to calculated KPIs, defined target values are also shown if defined and, as a result, they can

be evaluated.

MC-CPAM_32.docx

Version: 1.1.23049

Page 5 of 7

  Client Performance Analysis Machines / Workplaces

2.2.1.1

KPI Report

Up to three selected KPIs of the selected workplaces including the relevant target values are shown over

time. In addition, the mean value of the selected data is calculated and displayed in the diagram.

2.2.1.2

Cost Center Report

Up to three selected KPIs of the selected workplaces are shown grouped by cost centers.

2.2.1.3

Workplace Group Report

Up to three selected KPIs of the selected workplaces are shown and grouped by workplace groups.

2.2.1.4

Workplace Overview Report

Tabular  presentation  of  the  workplace  overview  showing  master  data  and  the  produced  quantities

including  a  yield  rate.  All  selected  machines  and  the  total  quantity  are  shown  for  the  period  of  time

selected for the machines.

2.2.1.5

RPA Analysis Report

The totals of individual RP accounts are presented for the selected machines and the selected period of

time in a pie chart.

Please  note:  If  no  values  are  available  for  individual  RP  accounts,  they  will  neither  be  shown  in  the

diagram nor the legend.

2.2.1.6

Production Overview Report

The  production  overview  compares  the  entire  yield  and  scrap  quantities  (primary  quantity  unit)  of  the

selected machine and the entire time selected by machine group.

2.2.1.7

Selections

The following selection options are provided in this dashboard:

  KPI

Only those KPIs are shown for which the user is authorized by the responsibility area or for which

no  responsibility  area  is  defined.  KPIs  and  responsibility  areas  are  defined  using  the

administration client of MES Cockpit.

MC-CPAM_32.docx

Version: 1.1.23049

Page 6 of 7

  Client Performance Analysis Machines / Workplaces

  Workplace

In  addition  to  the  workplace  number,  the  machine's  site  is  also  shown  (name  of  system  from

which  the  machine  is  imported).  Only  those  workplaces  are  shown  for  which  the  user  is

authorized by the responsibility area or for which no responsibility area is defined. Responsibility

areas  of  imported  machines  are  configured  and  edited  via  the  administration  client  of  MES

Cockpit.

  Cost center

Only the cost centers of displayed workplaces may be selected.

  Workplace group

Only the workplace groups of displayed workplaces may be selected.

2.2.1.8

Time selections

The following times/periods may be selected in this dashboard:

  Shift

  Day

  Month

  Quarter

  Year

  Calendar week

Only the contents for which the system actually includes data are shown.

MC-CPAM_32.docx

Version: 1.1.23049

Page 7 of 7

