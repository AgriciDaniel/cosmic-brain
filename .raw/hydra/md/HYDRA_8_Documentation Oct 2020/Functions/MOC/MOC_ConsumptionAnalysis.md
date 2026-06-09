Consumption analysis

1  Consumption analysis

Overview

Menu

Production Facility Management  Resource analysis

 Consumption analysis

Transaction code

cona

Function authorization

cona

This document describes the application "Consumption analysis" in the Manufacturing Operation Center

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

MOC_ConsumptionAnalysis.docx

Version: 1.1.8433

Page 1 of 2

Consumption analysis

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

MOC_ConsumptionAnalysis.docx

Version: 1.1.8433

Page 2 of 2

