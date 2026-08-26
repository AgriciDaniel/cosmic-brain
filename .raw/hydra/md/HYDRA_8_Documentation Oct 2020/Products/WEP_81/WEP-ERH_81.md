Manual

Enhanced Control Charts and
Histograms
WEP-ERH 8.1

Version 1.0.1361

Last changed on: 19.06.2020

Enhanced Control Charts and Histograms

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

WEP-ERH_81.docx

Version: 1.0.2358

Page 2 of 15

Enhanced Control Charts and Histograms

Contents

1  Enhanced Control Charts and Histograms - Overview ................................ 4

2  Control Chart Evaluation .............................................................................. 5

WEP-ERH_81.docx

Version: 1.0.2358

Page 3 of 15

Enhanced Control Charts and Histograms

1  Enhanced Control Charts and Histograms - Overview

Purpose

This  component  is  used  when  the  attributive  and  variable  characteristics  of  collected  goods  receipt

inspection data have to be displayed across orders in combined control chart and histogram format.

Implementation Considerations

Since  in  general  only  one  sample  exists  for  each  characteristic  during  goods  receipt  inspections,  no

graphical historical overview to detect developments can be displayed, if data can only be displayed for a

single goods receipt inspection. This component can be used if analysis across goods receipt inspections

is required. For example, analysis over a longer period can show the effect of improvements implemented

by the supplier.

This component requires the inspection data to have been captured in HYDRA.

Integration

The  component  "Inspection  Planning  for  Goods  Receipt  Inspections"  with  its  associated  inspection

requirements  and  inspection  results  forms  the  base  data,  where  the  inspection  data  must  have  been

previously entered through the AIP data entry client.

Features

Tested  characteristics  can  be  displayed  graphically  across  orders  in  various  control  chart  formats,  as  a

histogram  and  in  a  list  of  the  base  data.  The  base  data  can  be  restricted  through  a  wealth  of  available

filters.

WEP-ERH_81.docx

Version: 1.0.2358

Page 4 of 15

Enhanced Control Charts and Histograms

2  Control Chart Evaluation

Summary

Menu

Quality management  QM evaluation  Control chart

Transaction code

ccep

Function authorization

ccep

Utilization

Different control charts, the histogram and a data set list, which apply to several orders, are displayed for

checked characteristics in the "control chart" report. The data basis may be  restricted by using versatile

filters.

Integration

Control charts may be evaluated on the basis of inspection data collected in the areas

WEP-ERH_81.docx

Version: 1.0.2358

Page 5 of 15

Enhanced Control Charts and Histograms

  goods receipt,



initial sample inspection,

  production and

  goods issue

Consequently, the "control chart" report is a comprehensive analysis tool.

Prerequisite

The below filter fields have to be filled out to be able to display control charts.

  Type ("specifications" tab)

  Area ("specifications" tab)

  OP sequence or characteristic number ("characteristic" tab)

Inspection  order  characteristics  can  only  be  identified  uniquely  if  the  operation  sequence  number  is

indicated. As the same characteristic number may be used several times within one inspection step, the

inspection step characteristic cannot be identified uniquely even if the order number or yet the inspection

request  and  inspection  step  number  are  added  as  further  filter  criteria.  In  this  case,  the  computation  of

statistical key figures, e.g. cpk value calculation that is printed in a form, is normally suppressed, as the

available tolerance limits are not necessarily identical for the whole, filtered data set. The inspection step

characteristic  can  only  be  identified  uniquely  if  the  operation  sequence  number,  inspection  request

number and inspection step number are filtered.

Selection criteria

The paragraph that follows shows some of the available selection criteria. Self-explanatory filter options

are not listed.

"Specifications" tab

Type

Selection list of area types

    - in-production inspection

    - goods receipt inspection

    - goods issue inspection

    - initial sample inspection

The list of area types may be restricted subject to the respective licenses in use.

WEP-ERH_81.docx

Version: 1.0.2358

Page 6 of 15

Enhanced Control Charts and Histograms

Area

Selection list of the configured areas of the previously filtered area type. By default, the following

areas are available.

    - In-production inspection: production

    - Goods receipt inspection: goods receipt

    - Goods issue inspection: goods issue

    - Initial sample inspection: initial sample

Further areas can be generated through customizing.

"Inspection step" tab

Operation

Operation number

"Inspection point identification" tab

You require a new program version of this application if these fields are not available.

Workplace

Workplace number

Partial batch

Partial batch number

Batch

Batch number

Field 1…3

Additional fields for inspection points

"Additional fields for inspection points“ tab

Field 4…8

Additional fields for inspection points

 You require a new program version of this application if these fields are not available.

WEP-ERH_81.docx

Version: 1.0.2358

Page 7 of 15

Enhanced Control Charts and Histograms

All fields included in this application do not support matchcode filtering for technical reasons.

Toolbar

Control chart 1 settings

Opens a dialog to configure the settings of control chart 1. The corresponding details are described

in the respective detail application.

 Control chart 2 settings

Opens a dialog to configure the settings of control chart 2. The corresponding details are described

in the respective detail application.

 Histogram settings

Opens a dialog to configure the histogram settings. The corresponding details are described in the

respective detail application.

"Control chart 1" detail application

The contents of this application are defined by opening the dialog to configure "control chart 1". Changes

made  via  this  dialog  are  saved  in  relation  to  the  user.  Unless  otherwise  configured,  the  xq  chart

("variable"  characteristic  type)  or  the  p  chart  ("inspection  chart"  or  "attributive"  characteristic  type)  is

displayed  by  default.  Subject  to  the  characteristic  type,  the  user  may  choose  to  display  one  of  the

following control charts by default.

Variable characteristic

  Xq chart

WEP-ERH_81.docx

Version: 1.0.2358

Page 8 of 15

Enhanced Control Charts and Histograms



s chart

  R chart

  Single value chart

  Median chart

Attributive characteristic

  p chart

  np chart



c chart

  u chart

The paragraphs that follow explain the essential configuration options.

Number of the samples to be requested

Specifies how many samples or single measured values are to be displayed in the control chart.

WEP-ERH_81.docx

Version: 1.0.2358

Page 9 of 15

Enhanced Control Charts and Histograms

Display …

The  options  that  include  the  term  "display  ..."  enable  or  disable  the  presentation  of  the

corresponding data in the control chart.

Consider long-term data

This option has to be checked to integrate archived data from the medium-term data area.

Combine minimum and maximum values

It is recommendable to show the minimum and maximum values that are each connected by a line

to improve the presentation of the range of dispersion of single values within a sample.

Automatic scaling

The  "automatic  scaling"  function  allows  for  all  values  to  be  displayed,  irrespective  of  the  existing

limit values. This shows even extreme outliers in the control chart. The disadvantage is that there is

less  space  for  the  other  measured  values  and,  it  is  very  often  the  case  that  a  changing  value

pattern can hardly be recognized.

Show trend / run / middle third

The monitoring functions "trend", "run" and "MiddleThird" allow better surveillance of a process than

by  using  the  control  chart  alone.  However,  they  can  only  be  used  with  control  charts  for  xq  and

median.  The  trend  allows  visualization  of  an  upward  or  downward  tendency  in  the  process  over

several  samples.  By  default,  these  are  seven  subsequent  rising  or  falling  values.  The  run  shows

sections in which the process runs above or below the mean value (when displayed, otherwise the

target value) over several samples. By default a run is recognized if seven subsequent values are

above the mean value. The number of seven samples/values for recognizing a trend or run, which is

set  by  default,  may  be  changed  by  customizing  the  system.  "MiddleThird"  refers  to  an  unusually

high or low number of values, in the section of the control chart viewed, within the middle third of the

area bounded by the action limits.

Respective  analyses  are  performed  automatically  for  "trend",  "run"  and  "MiddleThird".  The  control

chart  shows  in  a  graphic  if  a  trend,  run  and  /  or  MiddleThird  is  available/detected.  The  following

events are altogether highlighted by icons or color codes in the control chart.

  Trend (can be recognized by a colored area)

  Run (can be recognized by a colored area))

  Middle Third (can be recognized by a colored area)

  Outlier (icon:

)

  Xq violates action limit (icon

)

WEP-ERH_81.docx

Version: 1.0.2358

Page 10 of 15

Enhanced Control Charts and Histograms

The  presentation  of  outliers  is  restricted  to  the  xq  chart  and  median  chart  and  connected  with  the

presentation  of  single  values.  There  are  different  functions  for  performing  and  presenting  outlier

tests. The different outlier tests for the different levels may be activated separately. Provided that the

presentation of outlier tests has been activated, the result of this test is displayed in text form above

the corresponding control chart.

The below outlier tests are available for the different inspection levels, whereas the inspection level

is indicated in parentheses.

  Grubbs max. (1 %)

  Grubbs max. (5 %)

  Grubbs min. (1 %)

  Grubbs min. (5 %)

  David-Hartley-Pearson (0.5 %)

  David-Hartley-Pearson (1 %)

  David-Hartley-Pearson (5 %)

Notes on outlier tests

  The  outlier  tests  do  not  refer  to  the  collectivity  of  all  samples,  i.e.  every  sample  is  considered

individually. Consequently, the following phenomena may appear:

-  Despite a large range between minimum and maximum value no outlier can be identified.

A reason for this may be the equal distribution of the single values within the sample.

-  Despite a low range between minimum and maximum value an outlier can be identified.

A  reason  for  this  may  be  an  accumulation  of  many  values  at  one  “point”  so  that  an

individual  value  having  a  certain  distance  to  this  agglomeration  is  identified  as  outlier

within the sample.

  At least three values have to be in the sample in order to be able to perform an outlier test. The

more  values  are  available  within  a  sample  the  more  uniform  the  general  view  of  the  outliers

becomes compared to all samples.

  The  Grubbs  outlier  test  is  performed  with  a  sample  size  of  2  <  n  <  148  (n  =  number  of  values

within  a  sample).  The  outlier  test  according  to  David,  Hartley  und  Pearson  is  performed  at  a

sample size of 2 < n < 1251 (n = number of values within a sample).

X-axis labeling

The below information is available to label the x-axis of control charts.

  Sample number

WEP-ERH_81.docx

Version: 1.0.2358

Page 11 of 15

Enhanced Control Charts and Histograms

  Order number

  PPS reference number

  Purchase order number

  Batch

  Article number

  Machine number

  Cavity number

  Date + time of the first measured value of a sample

  Date + time of the last measured value of the sample

  Date + time of sample completion

  Badge number of the first measured value of the sample

  Badge number of the last measured value of the sample

  Badge number of sample completion

  Partial batch

  Workplace

  Production workplace

  Field 1

  Field 2

  Field 3

  Field 4

  Field 5

  Field 6

  Field 7

  Field 8

The fields "field 1" to  "field 8" are enabled subject to  MPDV customizing and are assigned an

individual designation. As these field names are flexible, they are only entitled "field 1" to "field

8"

in

this

document.

Field 1 includes, for example, the tool if cavity-related data collection is enabled..

Tool tips within the control chart

When  a  value  is  labeled  being  an  outlier  (red  rhomb)  detailed  information  on  which  test(s)  was

(were)  the  crucial  factor  for  this  determination  is  displayed  when  going  with  the  mouse  over  this

labeling (rhomb).

For mean values the tool tip shows the value, date and time for the first and last measured value of

this sample as well as the corresponding inspection request number and inspection step number.

WEP-ERH_81.docx

Version: 1.0.2358

Page 12 of 15

Enhanced Control Charts and Histograms

The exact value is shown for single measured values.

A special note is also displayed for the colored areas when a trend, run or middlethird is recognized.

This note states the reason why this section has been colored.

Sorting of measured values

The type of control chart sorting is determined by the server and depends on how the control chart

filters are configured. If the filters operation sequence and inspection request number or operation

sequence and inspection step number are indicated the characteristic will be identified uniquely and

sorting is based on the sample number.

Sorting is based on date and time if either the filter field "operation sequence" is left empty or it is

filled  out  and  the  fields  "inspection  request  number"  and  "inspection  step  number"  are  left  empty

instead.

The  optical  presentation  of  trend  or  run  always  refers  to  how  the  measured  values  are  sorted.

However,  the  automatic  generation  of  the  failure  type  "trend"  is  always  based  on  the  measured

values being sorted by the sample number, as the numbers of the operation sequence, inspection

request and the inspection step are always known at the time when data is recorded.

Consequently, the following scenario might be possible.

  The  control  chart  is  sorted  by  date  and  time  and  a  trend  is  shown,  although  no  automatic

failure "trend" has been generated.

  The  control  chart  is  sorted  by  the  sample  number  and  no  trend  is  shown,  although  the

automatic failure "trend" has been generated.

"Control chart 2" detail applications

The features and configuration options of the "control chart 2" detail application are not explained here, as

they match those of the "control chart 1" detail application.

WEP-ERH_81.docx

Version: 1.0.2358

Page 13 of 15

"Histogram" detail applications

Enhanced Control Charts and Histograms

Unlike the control charts, which display a specified excerpt from the sample set, the histogram is always

based on the entire set of available samples matching the selection filter criteria. The appearance of the

histogram  is  determined  by  the  number  of  classes  and  by  any  elements  additionally  displayed.  The

contents of this application are defined by opening the dialog to configure the "histogram". Changes made

via this dialog are saved in relation to the user.

The paragraphs that follow explain the essential configuration options.

Number of classes

Determines  the  number  of  histogram  classes  according  to  which  the  measured  values  are  to  be

distributed.  If  represented  within  the  tolerance  limits  (option  "scale  by  tolerance  limits")  one

histogram class each is outside of the tolerance limits.

WEP-ERH_81.docx

Version: 1.0.2358

Page 14 of 15

Enhanced Control Charts and Histograms

Scale by tolerance limits

Enabled: The classes are in between the tolerance limits with each one "outlier class" to the left

and to the right.

Disabled: The classes include the range of all measured values (no separate classes for values

outside of the tolerance limits).

Consider long-term data

Includes the archived data from the medium-term data area.

Show histogram title

If a special title is to be displayed it may be entered by enabling this option.

X-axis labeling

The x-axis shows the corresponding values of the class limits if the "class limits" option is set. The

number of decimal places that are to be displayed may be set by the two configuration options for

decimal places.

Consider the number of decimal places

Takes into account the defined number of decimal places in the x-axis labeling.

"Control chart 1 list" and "control chart 2 list" detail applications.

The detail applications "control chart 1 list" and "control chart 2 list" show the data of control chart 1

and  2  in  list  form.  If  required,  further  analyses  based  on  this  data  can  be  made  using  the  Excel

export function. The Excel export requires a special license.

This list does not show the user fields of inspection points for technical reasons.

WEP-ERH_81.docx

Version: 1.0.2358

Page 15 of 15

