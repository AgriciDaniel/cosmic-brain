Manual

Enhanced Control Charts and
Histograms
WEP-ERH 8.2

Version 1.0.23049

Last changed on: 02.09.2020

Enhanced Control Charts and Histograms

Copyright

©Copyright 2015 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

WEP-ERH_82.docx

Version: 1.0.23049

Page 2 of 17

Enhanced Control Charts and Histograms

Contents

1  Enhanced Control Charts and Histograms - Overview ................................ 4

2  Control chart evaluation ............................................................................... 5

WEP-ERH_82.docx

Version: 1.0.23049

Page 3 of 17

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

WEP-ERH_82.docx

Version: 1.0.23049

Page 4 of 17

Enhanced Control Charts and Histograms

2  Control chart evaluation

Overview

Menu

Quality management  QM evaluation  Control chart

Transaction code

ccep

Function authorization

ccep

Purpose

The "Control chart" evaluation shows different control charts across all orders for the characteristics that

have  been  checked.  The  evaluation  also  includes  the  histogram  and  the  list  of  data  the  evaluation  is

based on. You can use multiple filters to narrow down the data basis.

Integration

Control chart evaluations are available in the following areas:

WEP-ERH_82.docx

Version: 1.0.23049

Page 5 of 17

Enhanced Control Charts and Histograms

  Goods receipt



Initial sample inspection

  Production

  Goods issue

The  evaluations  use  the  recorded  inspection  data.  Therefore,  the  "Control  chart"  evaluation  is  a  global

analysis tool.

Requirements

To display control charts, you must populate the following filter fields:

  Type ("specifications" tab)

  Area ("specifications" tab)

  OP sequence or characteristic number ("characteristic" tab)

You  can  only  identify  inspection  order  characteristics  uniquely,  if  you  enter  the  operation  sequence

number.  As  the  same  characteristic  number  may  be  used  several  times  within  one  inspection  step,  the

inspection  step  characteristic  cannot  be  identified  uniquely  even  if  the  order  number  or  the  inspection

requirement  and  inspection  step  number  are  added  as  further  filter  criteria.  As  the  specified  tolerance

limits  are  not  necessarily  identical  for  the  complete  data  set  that  has  been  filtered,  the  calculation  of

statistical  key  figures,  e.g.  cpk  value  that  is  printed  in  a  form,  is  normally  suppressed.  You  can  only

identify  the  inspection  step  characteristic  uniquely  if  you  filter  by  the  operation  sequence  number,  the

inspection requirement number and the inspection step number.

Selection criteria

The  following  list  shows  some  of  the  available  selection  criteria.  Self-explanatory  filter  options  are  not

listed.

You  can  use  some  of  the  fields  under  specific  conditions  only.  For  example,  if  you  filter  by  a  cavity

number, you require the license for a cavity-related collection. This is similar with inspection point fields.

These fields require an inspection point related collection of inspection data.

Tab "Specifications"

WEP-ERH_82.docx

Version: 1.0.23049

Page 6 of 17

Enhanced Control Charts and Histograms

Type

Selection list of area types

    - in-production inspection

    - goods receipt inspection

    - goods issue inspection

    - initial sample inspection

The list of area types depends on the respective licenses in use. The list can be restricted.

Area

Selection list of the configured areas of the previously filtered area type. By default, the following

areas are available:

    - In-production inspection: production

    - Goods receipt inspection: goods receipt

    - Goods issue inspection: goods issue

    - Initial sample inspection: initial sample

Further areas can be generated through customizing.

Tab "Inspection step"

Operation

Operation number

Tab "Inspection point identification"

If these fields are not available, you require a new program version of this application.

For  these  filter  fields,  the  data  collection  must  be  performed  with  reference  to  the  inspection

points. This is usually the case in production, but not in goods receipt.

Workplace

Workplace number

Partial batch

Number of partial batch

ERP batch

ERP batch number

WEP-ERH_82.docx

Version: 1.0.23049

Page 7 of 17

Enhanced Control Charts and Histograms

Field 1…3

Additional fields for inspection points.

For the area "Production", Field 1 specifies the "tool number" and Field 3 the sample number in the

default configuration.

Tab "Additional fields for inspection points“

If these fields are not available, you require a new program version of this application.

For  these  filter  fields,  the  data  collection  must  be  performed  with  reference  to  the  inspection

points. This is usually the case in production, but not in goods receipt.

All fields included in this application do not support matchcode filtering for technical reasons.

Field 4…8

Additional fields for inspection points.

For the area "Production", Field 4 specifies the batch in the default configuration.

Toolbar

 Control chart 1 settings

Opens a dialog to configure the settings of control chart 1. The corresponding details are described

in the respective detail application.

 Control chart 2 settings

Opens a dialog to configure the settings of control chart 2. The corresponding details are described

in the respective detail application.

 Histogram settings

Opens  a  dialog  to  configure  histogram  settings.  The  corresponding  details  are  described  in  the

respective detail application.

WEP-ERH_82.docx

Version: 1.0.23049

Page 8 of 17

"Control chart 1" detail applications

Enhanced Control Charts and Histograms

Call  the  dialog  to  configure  "Control  chart  1"  to  define  the  contents  of  this  application.  If  you  use  this

dialog  to  make  changes,  the  changes  are  saved  per  user.  If  no  specific setting  has  been  made,  the  xq

chart ("variable" characteristic type) or the p chart ("inspection chart" or "attributive" characteristic type) is

displayed by default. The available control charts depend on the characteristic type. By default, the user

can select one of the following control charts.

Variable characteristic

  Xq chart

  S chart

  R chart

  Single value chart

  Median chart

Attributive characteristic

  p chart

  np chart



c chart

  u chart

WEP-ERH_82.docx

Version: 1.0.23049

Page 9 of 17

Enhanced Control Charts and Histograms

The essential configuration options are described in the paragraphs that follow.

Number of samples/measured values to be requested

Specifies the number of samples or single measured values that are displayed in the control chart.

Show …

The options that include the term "Show ..." enable or disable the display of the corresponding data

in the control chart.

Consider long-term data

Check this option to integrate archived data of the medium-term data area.

Combine minimum and maximum values

It is recommended to show the minimum and maximum values that are each connected by a line to

improve the presentation of the range of variation of single values within a sample.

Automatic scaling

Using the "automatic scaling" function,  you can display all  values,  irrespective  of the existing limit

values. This shows even extreme outliers in the control chart. Disadvantage: The other measured

values are much smaller in the layout and it is more difficult to identify changing values or a trend.

WEP-ERH_82.docx

Version: 1.0.23049

Page 10 of 17

Enhanced Control Charts and Histograms

Show trend / run / middle third

Use  the  monitoring  functions  "trend",  "run"  and  "middle  third"  to  better  monitor  a  process.  These

functions are only  available with the control charts xq and median. If  you show the trend,  you can

visualize a process trend that may rise or fall. The system uses several samples to generate a trend.

By default, these are seven consecutive rising or falling values. The run shows sections where the

process runs above or below the mean value (when displayed, otherwise the target value). The run

covers several samples.  By  default, these  are seven  consecutive values that  are above  the mean

value.  The  default  number  of  seven  samples/values  that  is  set  to  identify  a  trend  or  run  can  be

changed via system customization. The system identifies a "middle third", if an unusually high or low

number of values lies within the middle third of the range between the action limits.

The  system  automatically  makes  the  respective  analyses  for  "trend",  "run"  and  "middle  third".  If  a

trend/run and/or middle third is identified, the control chart shows it in a graphic form. The following

events are shown in the control chart via symbols or colors:

  Trend (colored area)

  Run (colored area))

  Middle third (colored area)

  Outlier (symbol:

)

  Xq violates action limit (symbol

)

The presentation of outliers is only possible in the xq chart and median chart. Outliers can only be

displayed  when  single  values  are  shown.  The  function  to  perform  outlier  tests  and  the  function  to

display  outliers  are  separated.  You  can  activate  the  different  outlier  tests  for  the  different  levels

separately. If you have enabled the display of outlier tests, the test result is shown in text form on

top of the respective control chart.

The  below  outlier  tests  are  available  for  the  different  inspection  levels.  The  inspection  level  is

specified in parentheses.

  Grubbs max. (1 %)

  Grubbs max. (5 %)

  Grubbs min. (1 %)

  Grubbs min. (5 %)

  David-Hartley-Pearson (0.5 %)

  David-Hartley-Pearson (1 %)

  David-Hartley-Pearson (5 %)

Notes on outlier tests

WEP-ERH_82.docx

Version: 1.0.23049

Page 11 of 17

Enhanced Control Charts and Histograms

  The outlier tests do not refer to the total of all samples, i.e. each sample is considered individually.

Consequently, the following phenomena may appear:

-  Despite a large range between minimum and maximum value no outlier can be identified.

A reason for this may be the equal distribution of the single values within the sample.

-  Despite  a  low  range  between  minimum  and  maximum  value,  an  outlier  is  identified.

Possible reason: a lot of values concentrate in one “point” so that a single value having a

certain distance to this point is identified as outlier within the sample.

  To  perform  an  outlier  test,  there  must  be  at  least  three  values  in  the  sample.  The  larger  the

number of values in a sample, the more uniform is the overall picture of the outliers compared to

all samples.

  The  Grubbs  outlier  test  is  performed  with  a  sample  size  of  2  <  n  <  148  (n  =  number  of  values

within  a  sample).  The  outlier  test  according  to  David,  Hartley  und  Pearson  is  performed  with  a

sample size of 2 < n < 1251 (n = number of values within a sample).

X-axis labeling

The below information is available to label the x-axis of control charts.

  Sample number

  Order number

  PPS reference number

  Purchase order number

  ERP batch

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

WEP-ERH_82.docx

Version: 1.0.23049

Page 12 of 17

Enhanced Control Charts and Histograms

  Field 4

  Field 5

  Field 6

  Field 7

  Field 8

The fields "field 1" to "field 8" are enabled as part of an MPDV customization. The field labels

are assigned individually. As these field names are flexible, they are only entitled "field 1" to

"field 8" in this document.

Field 1 includes, for example, the tool if cavity-related data collection is enabled.

Tooltips within the control chart

If  the  system  has  identified  a  value  as  outlier,  the  detailed  information  is  shown  when  you  mouse

over the symbol (red rhomb). The tooltip includes the test(s) that issued this outlier result.

For mean values, the tool tip shows the value and date and time of the first and last measured value

of this sample and the respective inspection requirement number and inspection step number.

For single measured values, the tooltip shows the exact value.

For the colored areas that identify a trend, run or middle third, a respective note including the reason

is shown .

Sorting of measured values

The  server  decides  on  the  sorting  of  a  control  chart.  The  sorting  type  depends  on  the  settings  of

control  chart  filters.  If  the  filters  "operation  sequence"  and  "inspection  requirement  number"  or

"operation  sequence"  and  "inspection  step  number"  are  entered,  the  characteristic  is  identified

uniquely and sorting is based on the sample number.

Sorting is based on date and time if either the filter field "operation sequence" is left empty or if it is

filled and the fields "inspection requirement number" and "inspection step number" are left empty.

The  displayed  sorting  of  measured  values  influences  the  visual  presentation  of  a  trend  or  run.

However,  the  automatic  generation  of  the  failure  type  "trend"  is  always  based  on  the  measured

values  being  sorted  by  the  sample  number,  as  the  numbers  of  the  operation  sequence,  the

inspection requirement and the inspection step are always known at the time data is recorded.

Consequently, the following scenario might be possible.

  The  control  chart  is  sorted  by  date  and  time  and  a  trend  is  shown,  although  the  automatic

failure "trend" has not been generated.

WEP-ERH_82.docx

Version: 1.0.23049

Page 13 of 17

Enhanced Control Charts and Histograms

  The  control  chart  is  sorted  by  the  sample  number  and  no  trend  is  shown,  although  the

automatic failure "trend" has been generated.

Detail applications "Control chart 2"

The features and configuration options of the "control chart 2" detail application are not explained here, as

they match those of the "control chart 1" detail application.

Detail applications "Histogram"

You can restrict the number of samples displayed in a control chart. This is not possible with a histogram.

The histogram is always based on the total of available samples matching the selection filter criteria. The

number  of  classes  and  the  additionally  displayed  information  influence  the  histogram  presentation.  Call

the dialog to configure the "histograms" to define the contents of this application. If you use this dialog to

make changes, the changes are saved per user.

WEP-ERH_82.docx

Version: 1.0.23049

Page 14 of 17

Enhanced Control Charts and Histograms

The essential configuration options are described in the paragraphs that follow.

Number of classes

Specifies the number of histogram classes. The measured values are classified into these classes

to  be  displayed.  If  the  histogram  shows  the  values  within  the  tolerance  limits  (option  "Scale  by

tolerance  limits"),  two  histogram  classes  include  the  values  exceeding  the  tolerance  limit  (upper

and lower).

Scale by tolerance limits

Enabled: The classes are between the tolerance limits - two "outlier classes" being displayed, one

to the left and one to the right.

Disabled: The classes include the total range of all measured values (no separate classes for

values exceeding the tolerance limits).

Consider long-term data

Includes the archived data from the medium-term data area.

Show histogram title

If a special title is to be displayed it may be entered by enabling this option.

X-axis labeling

If the option "Class limits" is set, the x-axis shows the respective values of the class limit. You can

use the two configuration options for decimal places to specify the detail, i.e. the number of decimal

places.

Consider the number of decimal places

With this option, the defined number of decimal places is used for the x-axis labeling.

WEP-ERH_82.docx

Version: 1.0.23049

Page 15 of 17

Detail applications "Control chart 1 list" and "Control chart 2 list"

Enhanced Control Charts and Histograms

The detail applications "control chart 1 list" and "control chart 2 list" show the data of control chart 1

and  2  in  list  form.  If  required,  further  analyses  based  on  this  data  can  be  made  using  the  Excel

export function. The Excel export requires a specific license.

This list does not show the user fields of inspection points for technical reasons.

Detail application "Statistics"

The detail application "Statistics" shows the usual statistical key figures for the  selected characteristic on

the level of inspection step characteristics.

For variable characteristics these are

  Number of samples

  Number of measured values

  Xqq

  Minimum

  Maximum

  R

  S

WEP-ERH_82.docx

Version: 1.0.23049

Page 16 of 17

Enhanced Control Charts and Histograms

  S relative

  Sigma

  Cp and

  Cpk

For attributive characteristics these are

  Number of non-conforming units

  Number of defects

  p and

  u.

WEP-ERH_82.docx

Version: 1.0.23049

Page 17 of 17

