Manual

Statistical Process Analysis
PDV-SPA 8.2

Version 1.0.23049

Last changed on: 02.09.2020

Statistical Process Analysis

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

PDV-SPA_82.docx

Version: 1.0.23049

Page 2 of 18

Statistical Process Analysis

Contents

1  Overview: Statistical Process Analysis ........................................................ 4

2  Graphic Process Analysis with Samples (based on machines) ................... 5

3  Graphic Process Analysis with Samples (based on orders) ........................ 8

4  Graphic Process Analysis with Samples (based on batches) .................... 11

5  Process Data Protocol ............................................................................... 14

PDV-SPA_82.docx

Version: 1.0.23049

Page 3 of 18

Statistical Process Analysis

1

 Overview: Statistical Process Analysis

Overview

Purpose

This function package includes statistical reports/evaluations. Samples are generated from the raw data

based on the sample parameters defined within the collection rules or their characteristics. Presenting the

mean  values  of  samples  as  a  graphic  curve  over  time  complements  the  measured  value  curves  in  the

graphic  process  analysis  to  show  statistically  smoothed  data.  Quality  control  charts  enable  statistical

process monitoring and analyses based on process values.

Integration

This  function  package  requires  a  machine  interface  for  data  collection  in  the  HYDRA  Process

Communication Controller (PCC) and the licenses for process data collection and processing (PDV-PDM

and PDV-VRP).

Features

Analysis/evaluation options of the statistical process analysis:

  Advanced  graphic  process  evaluation:  evaluation  of  samples  in  a  correlative  process  analysis.

Mean values of samples and process limits for samples are displayed in graphic form.

  Advanced  graphic  process  evaluation:  Samples  are  evaluated  based  on  control  charts  using

extensive filter criteria. Different control charts are supported (e.g. xq, s and R).

PDV-SPA_82.docx

Version: 1.0.23049

Page 4 of 18

Statistical Process Analysis

2  Graphic Process Analysis with Samples (based on machines)

Summary

Menu

Quality  management    Process  analysis    Graphic  process  analysis  with
samples (based on machines)

Transaction code

gpdasm

Function authorization

gpdasm

The graphic process  analysis is used for the process analysis  in quality management. The collection of

samples enables the values to be compressed and allows for statistical preparation. The analysis function

based on samples represents average values and their progression; it is an Xq chart.

Usage

The graphic process analysis provides a powerful graphic analysis tool for displaying process values read

out of the database based on time period and selection criteria and to compare them with each other. The

selected process parameters can also be saved together as a compilation under a freely available name

so that analyses that recur often can be called up easily. In this evaluation, which refers to samples, only

the  averages  from  the  samples  are  displayed.  The  collection  of  samples  is  defined  in  the  collection

request (inspection planning).

Integration

The function  displays sample values from recorded  measuring values of process characteristics. These

values must have been previously collected in the system.

Requirement

The data compression (sampling) is active as a separate process.

Selection parameters

The following selection criteria are available in the application:

Workplace

The  required  workplace  can  be  selected  specifically  in  the  "general"  index  tab  using  the  pool  of

workplaces application.

Time domain from – until

Specifies a specific period of time for the evaluation.

Consider long-term data

Enabling this checkbox allows for long-term data to be considered.

PDV-SPA_82.docx

Version: 1.0.23049

Page 5 of 18

Statistical Process Analysis

Process parameters

The process parameters drop down list includes a selection of process parameters.

Please note that all data used for these evaluations/reports are kept in the server memory. Consequently,

it  is  not  recommendable  to  select  too  large  periods  and  data  sets.  In  addition,  data  might  no  longer  be

displayed clearly in graphics without additional functions, such as the zoom.

Technical background: every time data is requested  in client applications, this data  will  be stored  in the

server memory and  only  then it  will be transferred to  the client. If  you require more memory space, the

memory reserved for the Java application needs to be increased accordingly on the server. Please refer

to the technical documentation or contact MPDV Support.

Detail applications

The  graphics  of  the  selected  area  are  displayed  in  the  graphic  process  analysis  area.  The  buttons

 can be used to insert another area for the graphic process analysis in which a new process

parameter can be selected. Or an area inserted for graphic process analysis is removed.

A special feature of this graphic is the ability to zoom in and out using keyboard and mouse combinations.

To zoom in on the graphic, press the SHIFT key and hold it down and then use the left mouse button to

highlight an area of the graphic. After the key is released, this area is enlarged in the display.

To zoom out again, press and hold the ALT key down. Now the mouse pointer appears as a magnifying

glass  with  a  minus  sign.  By  clicking  in  the  graphic,  the  view  zooms  out  again  and  the  image  appears

smaller.

Display configuration

The following configuration options can be set for each chart:

Checkbox “Legend”

A  legend  may  be  shown  for  the  data  displayed  in  the  diagram  by  checking  this  option.  In  case  a

legend is shown, axis labeling is automatically hidden to save space.

Checkbox “Show scale“

The scale of the diagram can be shown or hidden by selecting this checkbox.

Checkbox “Show character designation”:

This  checkbox  specifies  that  the  long  characteristic  names  are  shown  for  the  legend  and  axis

labeling instead of the short ID. Please note: labeling is not updated until data has been refreshed!

PDV-SPA_82.docx

Version: 1.0.23049

Page 6 of 18

Statistical Process Analysis

PDV-SPA_82.docx

Version: 1.0.23049

Page 7 of 18

Statistical Process Analysis

3  Graphic Process Analysis with Samples (based on orders)

Summary

Menu

Quality Management  Process Analysis  Graphic Process Analysis with
Samples (based on orders)

Transaction code

gpdaso

Function authorization

gpdaso

The graphic process analysis is used for the process analysis  in quality management. The collection of

samples enables the values to be compressed and allows for statistical preparation. The analysis function

based on samples represents average values and their progression; it is an Xq chart.

Usage

The graphic process analysis provides a powerful graphic analysis tool for displaying process values read

out of the database based on time period and selection criteria and to compare them with each other. The

selected process parameters can also be saved together as a compilation under a freely available name

so that analyses that recur often can be called up easily. In this evaluation, which refers to samples, only

the  averages  from  the  samples  are  displayed.  The  collection  of  samples  is  defined  in  the  collection

request (inspection planning).

Integration

The  function  displays  sample  values  from  recorded  measured  values  of  process  characteristics.  These

values must have been previously collected in the system.

Requirement

The data compression (sampling) is active as a separate process.

Selection parameters

The following selection criteria are available in the application:

MES order number

Selects a specific operation (MES order number)

Batch

Selects a batch number

Time domain from – until

Selects a specific period of time

PDV-SPA_82.docx

Version: 1.0.23049

Page 8 of 18

Statistical Process Analysis

Consider long-term data

Enabling this check box allows for long-term data to be considered.

Process parameters

The process parameters drop down list includes a selection of process parameters.

Please note that all data used for these evaluations/reports are kept in the server memory. Consequently,

it  is  not  recommendable  to  select  too  large  periods  and  data  sets.  In  addition,  data  might  no  longer  be

displayed clearly in graphics without additional functions, such as the zoom.

Technical background: every time data is requested  in client applications, this data  will  be stored  in the

server memory and  only  then it  will be transferred to  the client. If  you require more memory space, the

memory reserved for the Java application needs to be increased accordingly on the server. Please refer

to the technical documentation or contact MPDV Support.

Detail applications

The  graphics  of  the  selected  area  are  displayed  in  the  graphic  process  analysis  area.  The  buttons

 can be used to insert another area for the graphic process analysis in which a new process

parameter can be selected. Or an area inserted for graphic process analysis is removed.

A special feature of this graphic is the ability to zoom in and out using keyboard and mouse combinations.

To zoom in on the graphic, press the SHIFT key and hold it down and then use the left mouse button to

highlight an area of the graphic. After the key is released, this area is enlarged in the display.

To zoom out again, press and hold the ALT key down. Now the mouse pointer appears as a magnifying

glass  with  a  minus  sign.  By  clicking  in  the  graphic,  the  view  zooms  out  again  and  the  image  appears

smaller.

Display configuration

The following configuration options can be set for each chart:

Checkbox “Legend”

A  legend  may  be  shown  for  the  data  displayed  in  the  diagram  by  checking  this  option.  In  case  a

legend is shown, axis labeling is automatically hidden to save space.

Checkbox “Show scale“

The scale of the diagram can be shown or hidden by selecting this checkbox.

Checkbox “Show character designation”:

This  checkbox  specifies  that  the  long  characteristic  names  are  shown  for  the  legend  and  axis

labeling instead of the short ID. Please note: labeling is not updated until data has been refreshed!

PDV-SPA_82.docx

Version: 1.0.23049

Page 9 of 18

Statistical Process Analysis

PDV-SPA_82.docx

Version: 1.0.23049

Page 10 of 18

Statistical Process Analysis

4  Graphic Process Analysis with Samples (based on batches)

Summary

Menu

Quality  Management    Process  analysis    Graphic  process  analysis  with
samples (based on batches)

Transaction code

gpdasc

Function authorization

gpdasc

The graphic process analysis is used for the process analysis  in quality management. The collection of

samples enables the values to be compressed and allows for statistical preparation. The analysis function

based on samples represents average values and their progression; it is an Xq chart.

Usage

The graphic process analysis provides a powerful graphic analysis tool for displaying process values read

out of the database based on time period and selection criteria and to compare them with each other. The

selected process parameters can also be saved together as a compilation under a freely available name

so that analyses that recur often can be called up easily. In this evaluation, which refers to samples, only

the  averages  from  the  samples  are  displayed.  The  collection  of  samples  is  defined  in  the  collection

request (inspection planning).

Integration

The  function  displays  sample  values  from  recorded  measured  values  of  process  characteristics.  These

values must have been previously collected in the system.

Requirement

The data compression (sampling) is active as a separate process.

Selection parameters

The following selection criteria are available in the application:

Batch number

Specifically selects a produced batch.

Alternative batch number 1

Selects the alternative batch number 1 at the produced batch

Time domain from – until

Selects a period of time

PDV-SPA_82.docx

Version: 1.0.23049

Page 11 of 18

Statistical Process Analysis

Consider long-term data

Enabling this check box allows long-term data to be considered.

Process parameters

The process parameters drop down list includes a selection of process parameters.

Please note that all data used for these evaluations/reports are kept in the server memory. Consequently,

it  is  not  recommendable  to  select  too  large  periods  and  data  sets.  In  addition,  data  might  no  longer  be

displayed clearly in graphics without additional functions, such as the zoom.

Technical background: every time data is requested  in client applications, this data  will  be stored  in the

server memory and  only  then it  will be transferred to  the client. If  you require more memory space, the

memory reserved for the Java application needs to be increased accordingly on the server. Please refer

to the technical documentation or contact MPDV Support.

Detail applications

The  graphics  of  the  selected  area  are  displayed  in  the  graphic  process  analysis  area.  The  buttons

 can be used to insert another area for the graphic process analysis in which a new process

parameter can be selected. Or an area inserted for graphic process analysis is removed.

A special feature of this graphic is the ability to zoom in and out using keyboard and mouse combinations.

To zoom in on the graphic, press the SHIFT key and hold it down and then use the left mouse button to

highlight an area of the graphic. After the key is released, this area is enlarged in the display.

To zoom out again, press and hold the ALT key down. Now the mouse pointer appears as a magnifying

glass  with  a  minus  sign.  By  clicking  in  the  graphic,  the  view  zooms  out  again  and  the  image  appears

smaller.

Display configuration

The following configuration options can be set for each chart:

Checkbox “Legend”

A  legend  may  be  shown  for  the  data  displayed  in  the  diagram  by  checking  this  option.  In  case  a

legend is shown, axis labeling is automatically hidden to save space.

Checkbox “Show scale“

The scale of the diagram can be shown or hidden by selecting this checkbox.

Checkbox “Show character designation”:

This  checkbox  specifies  that  the  long  characteristic  names  are  shown  for  the  legend  and  axis

labeling instead of the short ID. Please note: labeling is not updated until data has been refreshed!

PDV-SPA_82.docx

Version: 1.0.23049

Page 12 of 18

Statistical Process Analysis

PDV-SPA_82.docx

Version: 1.0.23049

Page 13 of 18

Statistical Process Analysis

5  Process Data Protocol

Overview

Menu

Quality management  Process analysis  Process data protocol

Transaction code

pdpu

Function authorization

pdpu

The Process data protocol is used for the process analysis in the quality management and in the process

data processing.

Purpose

The process data protocol  is a summary of recorded  values to get a quick overview during the process

analysis.

The  table  view  of  the  detail  application  offers  an  overview  of  existing  entries.  The  system  sorts  the

displayed information using table functions and complying with specified selection parameters. Each user

can change the display of fields with the context menu.

Integration

The function displays recorded measured values of process characteristics in aggregated form based on

selection criteria. These values must have been previously recorded in the system.

Selection parameters

The application provides the following selection criteria:

Type of evaluation

The evaluation type defines the relating object for the summary or if the user requires a calculation

for single values for all process parameters. The following relating objects can be selected:

  Order

  OP (operation)

  Machine + shift date

  Machine + shift date + shift number

Machine

The system offers a detailed search for the machine using the pool application.

Evaluation period from - to

Specifies the time interval to be selected.

PDV-SPA_82.docx

Version: 1.0.23049

Page 14 of 18

Statistical Process Analysis

Order

The system offers a detailed search for the order using the pool application. This field is mandatory

if the user selects the evaluation type "Order" or "Operation".

Operation

The  system  offers  a  detailed  search  for  the  operation  using  the  pool  application.  This  field  is

mandatory if the user selects the evaluation type "OP".

Include long-term data

Long-term data is included.

Please  note  that  the  system  keeps  all  data  used  for  these  evaluations/reports  in  the  server  memory.

Consequently, we do not recommend to select long periods of time and large data sets.

Technical background info:

Every  time  the  system  requests  data  in  the  client  applications,  it  stores  this  data  in  the  server  memory

and only then transfers the data to the client. If you require more memory space, you need to increase the

server memory reserved for the Java application accordingly. Please refer to the MPDV support.

Detail application "Process data protocol"

The tabular report process data protocol displays the process data recorded and saved in the database

including the following information: Please note that not all columns are filled with information depending

on the selected evaluation type.

Category Statistic parameter

Process parameter

Technical name of the recorded process parameter

Mean value (AVG - order sequencing list)

Mean value of the recorded process parameter values.  If the value exceeds the specification limit,

the system highlights the field accordingly.

Maximum value

Maximum  value  of  the  recorded  process  parameter  values.  If  the  value  exceeds  the  specification

limit, the system highlights the field accordingly.

Minimum value

Minimum  value  of  the  recorded  parameter  values.  If  the  value  exceeds  the  specification  limit,  the

system highlights the field accordingly.

Number of measured values

Number of recorded measured values meeting the selection criteria for the process parameter.

PDV-SPA_82.docx

Version: 1.0.23049

Page 15 of 18

Statistical Process Analysis

Category Order

Order

Order number for which the process parameter was entered.

Article number of order

Stored article number of the order.

Article name of order

Stored article name of the order.

Category "Operation"

Operation

MES order number for which the process parameter was recorded.

OP

OP number for which the process parameter was recorded.

OP name/designation

Stored OP designation of the operation

Article number of OP

Stored article name of the operation.

Article name of OP

Stored article name of the operation.

Category "Production parameter"

Machine

Workplace/machine number indicating where the process parameter values were recorded.

Shift date

Shift date indicating when the process parameter values were recorded.

Shift number

Shift number of the recorded process parameter values.

Category "Primary quantities"

Yield (P)

Recorded yield (primary) of the OP/machine

Scrap (P)

Recorded scrap quantity (primary) of the OP/machine

PDV-SPA_82.docx

Version: 1.0.23049

Page 16 of 18

Statistical Process Analysis

Quantity unit (P)

Quantity unit of the recorded quantity (primary)

Actual times category

Runtime

Runtime of the OP/machine

Time of production

Production time of the OP/machine

Downtime

Downtimes of the OP/machine

Category "Specification"

Target value (TV)

The target value for the collected process parameter.

Upper TL

The upper tolerance limit defined for this recorded process parameter.

UPAL (upper process action limit)

The upper process action limit defined for this recorded process parameter.

Lower TL

The lower tolerance limit defined for this recorded process parameter.

LPAL (lower process action limit)

The lower process action limit defined for this recorded process parameter.

Distribution

Graphical display of the distribution of measured values

Cp

CpK

The  process  capability  index  Cp  is  shown  in  the  column  Cp.  The  calculation  of  the  process

capability  index  Cp  is  based  on  the  upper  and  lower  specification  limit  and  the  corresponding

standard deviation.

The  process  capability  index  CpK  is  shown  in  the  column  CpK.  The  calculation  of  the  process

capability  index  CpK  is  based  on  the  mean  value,  the  corresponding  standard  deviation  and  the

upper  or  lower  specification  limit.  A  high  value  shows  that  the  production  lies  solidly  within  the

specification limits.

Process location

Graphic display of information on mean value, minimum and maximum value and UTL and LTL.

PDV-SPA_82.docx

Version: 1.0.23049

Page 17 of 18

Statistical Process Analysis

PDV-SPA_82.docx

Version: 1.0.23049

Page 18 of 18

