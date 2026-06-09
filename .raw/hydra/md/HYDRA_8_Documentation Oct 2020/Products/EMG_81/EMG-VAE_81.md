Manual

Analysis and Development of
Energy Consumption (MOC)
EMG-VAE 8.1

Version 1.1.23049

Last changed on: 01.09.2020

 Analysis and Development of Energy Consumption (MOC)

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

EMG-VAE_81.docx

Version: 1.1.23049

Page 2 of 6

 Analysis and Development of Energy Consumption (MOC)

Contents

1  Energy Management – Energy Consumption Analysis ................................ 4

2  Consumption analysis .................................................................................. 5

EMG-VAE_81.docx

Version: 1.1.23049

Page 3 of 6

 Analysis and Development of Energy Consumption (MOC)

1  Energy Management – Energy Consumption Analysis

Purpose

Evaluation  function  for  energy  data.  Efficient  evaluations  for  consideration  of  the  energy  consumption

development as a complement to the basic evaluation of the tabular consumption statistics.

You use the function package when:

  You wish to analyze consumptions over a period of time.

Integration

The evaluations require the function package EMG-MGM for data collection as the basis.

Features

  Graphic  consumption  statistics:  Representation  of  the  values  of  the  tabular  statistics  as  a  bar

chart.

  Tabular evaluations for consumption development, representation of the energy  consumption at

the  real  and  logical  (calculated)  meters  over  time.  Flexible  filter  settings  and  compression

functions.

  Expansion  of  the  hierarchical  energy  data  monitor  to  permit  evaluation  of  the  historical  data  at

defined intervals.

  Wide  variety  of  compression  possibilities  by  machines,  meters,  evaluation  groups  and  other

logistics objects

EMG-VAE_81.docx

Version: 1.1.23049

Page 4 of 6

 Analysis and Development of Energy Consumption (MOC)

2  Consumption analysis

Overview

Menu

Production Facility Management  Resource analysis

 Consumption analysis

Transaction code

cona

Function authorization

cona

This document describes the application "Consumption analysis" in the Manufacturing Operation  Center

(MOC).

Purpose

Using  the  consumption  analysis,  you  can  display  the  consumptions  of  selected  counter  resources  in

chronological  order.  The  consecutive  time  intervals  are  called  compressions.  The  compression  interval

can  be  set  to  hours,  days,  weeks  and  months.  The  listed  table  rows  show  the  resource's  consumption

values in the corresponding compression interval as well as the values of the comparison resources. In

the pivot table, you can correlate the compressed values in many ways.

When  selecting  values,  you  have  the  possibility  to  filter  the  resources  in  multiple  ways  in  tree-like  form

using the defined counter hierarchies.

Integration

This application is connected with the following applications:

-  Consumption monitor to display the current counter readings since the reset.

-  Consumption statement for an analysis of the totals and to reset the data.

Selection criteria

Reference

Selection of resources using the resource list

Resource type / Resource / Name / Resource family

Selection criteria relating to the resource.

Period from / until

Time period considered in an evaluation

EMG-VAE_81.docx

Version: 1.1.23049

Page 5 of 6

 Analysis and Development of Energy Consumption (MOC)

Compress preselection

Select time interval for the compression (every 15 minutes, hour, day, week, month, year):

- Select between 15 minutes and one week (EMG 8.2)

- Select between one hour and one week

- Select between one day and three months

- Select between one week and two years

Field descriptions

Resource

Resource master data

Date

Time  reference  for  the  consumption  values.  The  compression  depends  on  the  preselected

compression and the considered time period.

Consumption

Consumption value with unit.

The accuracy indicates the quality data.  The data quality is the sum total of all documents (degree

of overlapping in percent * duration in the interval) / sum total (durations in the interval)

.

A value 1.0 = Good and a value 0.0 = Poor.

Comparison values 1 / 2

Consumption values of the comparison resource. In addition, the deviation in absolute values and

as a percentage is shown.

Detail application pivot consumption analysis

In  the  pivot  table,  you  can  compress  even  more  the  data  by  time  period/counters.  The

corresponding bar chart illustrates the displayed values.

The bar chart of the pivot grid shows a maximum of 10 bars (for each value).

EMG-VAE_81.docx

Version: 1.1.23049

Page 6 of 6

