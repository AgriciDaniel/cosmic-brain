Manual

Graphic Process Analysis
PDV-GPA 8.3

Version 1.0.23049

Last changed on: 02.09.2020

Graphic Process Analysis

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

PDV-GPA_83.docx

Version: 1.0.23049

Page 2 of 10

Graphic Process Analysis

Contents

1  Overview: Graphic Process Analysis ........................................................... 4

2  Graphic Process Analysis ............................................................................ 5

3  Histogram ..................................................................................................... 8

PDV-GPA_83.docx

Version: 1.0.23049

Page 3 of 10

Graphic Process Analysis

1

 Overview: Graphic Process Analysis

Overview

Purpose

This product contains the graphic evaluations that show measured values over a period of time. You can

separately  select  the  data  lines  and  combine  them  in  diagrams  for  comparison.  You  can  also  use  the

correlating  MES  data,  such  as  order  number,  article  number,  and  batch  number,  as  selection  criteria

(TAGs) and visualize the machine statuses that are available at the same time.

To analyze the distribution of measured values, a histogram of the measured values is provided.

Integration

This  product  requires  a  machine  interface  for  data  collection  in  the  Process  Communication  Controller

(PCC) and the licenses for process data collection and processing (PDV-PDM and PDV-VRP).

Features

This  product  provides  efficient  functions  to  analyze  process  values  in  detail  in  combination  with  other

process values and logistical data from the production process.

  You can present the saved process values of a machine in a selectable period (line chart).

  You can display several diagrams in one report comparing the process values of a machine.

  You  can  show/hide  the  machine  status  development  in  form  of  a  time  profile  over  the  selected

period in the graphic process analysis.

  You can display the saved process values of a process parameter in a histogram.

PDV-GPA_83.docx

Version: 1.0.23049

Page 4 of 10

Graphic Process Analysis

2  Graphic Process Analysis

Overview

Menu

Quality management  Process analysis  Graphic process analysis

Transaction code

pdc

Function authorization

pdc

The Graphic process analysis visually supports the data analysis.

Purpose

You can use this application to systematically survey processes using the measured values recorded for

the different process characteristics. The objective of the process analysis is to identify interrelationships

and properties of process characteristics and to get a better understanding of the process.

Integration

The application shows the measured values of process characteristics recorded via PCC.

Requirements

The measured values recorded are saved in the HYDRA database.

Selection criteria

The application provides the following selection criteria:

Tab Machine

Workplace

This selection criterion refers to the workplace where the measured values have been recorded.

Time domain

This selection criterion defines the evaluation period for which the measured values are displayed.

Compression value

This selection field is only available if the selection parameter  Automatic compression is disabled.

You  configure  the  available  compression  values  and  their  properties  in  the  Advanced  object

configuration.

Automatic compression

If this option is enabled, the compression is automatically performed using the values of the other

selection parameters. The selection field Compression value is disabled in this case.

PDV-GPA_83.docx

Version: 1.0.23049

Page 5 of 10

Graphic Process Analysis

Tab Tag

Tag type

This selection criterion refers to the tag type for which the measured values have been recorded. If

a tag type is specified, then you must additionally specify the tag content as selection criterion.

Tag content

This  selection  criterion  defines  the  value  of  the  specified  tag  type  for  which  the  measured  values

are selected. You can also use a wildcard (*) as content.

If  a  value  is  specified  for  the  tag  content,  then  you  must  additionally  specify  the  tag  type  as

selection criterion.

Workplace

This selection criterion refers to the workplace where the measured values have been recorded.

Time domain

This selection criterion defines the evaluation period for which the measured values are displayed.

Compression value

This selection field is only available if the selection parameter Automatic compression is disabled.

You configure the available compression values and their properties in the Advanced object

configuration.

Automatic compression

If this option is enabled, the compression is automatically performed using the values of the other

selection parameters. The selection field Compression value is disabled in this case.

Chart

Process parameter

This selection criterion specifies the process parameters. The measured values are then displayed

for these process parameters. You can select up to 12 process parameters.

Legend

If  this  option  is  enabled,  the  legend  (process  parameter  name  and  machine)  is  displayed  in  the

chart.

Scale

You  use  this  drop-down  list  to  control  the  y-axis  scaling  of  the  graphic  display.  The  following

selection options are available:

PDV-GPA_83.docx

Version: 1.0.23049

Page 6 of 10

Graphic Process Analysis

  None

If this option is selected, no y-axis scale is shown for any process data curve in the detail

application.

  Consistent

If this option is selected, one single y-axis scale is shown for all process data curves in the

detail application.



Individual

If this option is selected, a different y-axis scale is shown for each process data curve.

Toolbar

  Add chart

You  use  this  button  to  add  an  additional  data  area  of  the  detail  application  to  separately  show

further process data curves.

Remove chart

You use this button to remove the data area added last from the detail application.

Zoom in

Use this button to increase the time domain of the selection and to automatically request the data

displayed.

Zoom out

Use this button to decrease the time domain of the selection and to automatically request the data

displayed.

PDV-GPA_83.docx

Version: 1.0.23049

Page 7 of 10

Graphic Process Analysis

3  Histogram

Overview

Menu

Quality management  Process analysis  Histogram

Transaction code

pdh

Function authorization

pdh

Purpose

The Histogram report shows the distribution of measured values for a process parameter.

Integration

The histogram display is based on the data recorded for articles and machines.

Selection criteria

The application provides the following selection criteria:

Workplace

This selection criterion refers to the workplace where the measured values have been recorded.

Process parameter

This selection criterion specifies the process parameter. The measured values are then displayed

for this process parameter.

Time from,to

This selection criterion defines the evaluation period for which the measured values are displayed.

Toolbar

 Histogram settings

Use this button to call the settings of the histogram display.

PDV-GPA_83.docx

Version: 1.0.23049

Page 8 of 10

Graphic Process Analysis

Detail application Histogram

The histogram is always based on the total of available measured values matching the selection criteria.

The number of classes and the additionally displayed information influence the display of the histogram.

Call the settings dialog of the "histograms" to define the contents of this application. If you use this dialog

to make changes, the changes are saved per user.

Detail application Histogram settings

Field descriptions

Number of classes

Specifies  the  number  of  histogram  classes.  The  measured  values  are  classified  and  displayed  in

these classes.

Show histogram title

If this option is enabled, the histogram title is shown on top of the histogram display.

Histogram title

This  entry  specifies  the  histogram  title  displayed.  This  entry  is  only  relevant  if  the  option  Show

histogram title is enabled.

Consider number of decimal places

If  this  option  is  enabled,  the  specified  number  of  decimal  places  is  used  to  identify  the  histogram

classes. If this option is disabled, integer values are used to identify and display the classes.

Number of decimal places

Specifies  the  number  of  decimal  places  that  are  used.  This  entry  is  only  relevant  if  the  option

Consider number of decimal places is enabled.

Show bars

This option controls if the histogram shows the values of the classes in a bar chart.

Show envelope

If this option is enabled, an envelope is plotted over the values of the classes.

Show grid

Use this option to show or hide a grid in the background of the histogram.

Y-axis labeling

Controls the Y-axis values of the histogram. The following values can be set:

  None

  Relative frequency

PDV-GPA_83.docx

Version: 1.0.23049

Page 9 of 10

Graphic Process Analysis

  Frequency in %

X-axis labeling

Controls the X-axis values of the histogram. The following values can be set:

  None

  Class limits

PDV-GPA_83.docx

Version: 1.0.23049

Page 10 of 10

