Manual

Statistical Process Analysis
(MOC)
PDV-SPA 8.1

Version 1.0.23049

Last changed on: 02.09.2020

Statistical Process Analysis (MOC)

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

PDV-SPA_81.docx

Version: 1.0.23049

Page 2 of 13

Statistical Process Analysis (MOC)

Contents

1  Statistische Prozessanalyse - Überblick ...................................................... 4

2  Graphic Process Analysis with Samples (based on machines) ................... 5

3  Graphic Process Analysis with Samples (based on orders) ........................ 8

4  Graphic Process Analysis with Samples (based on batches) .................... 11

PDV-SPA_81.docx

Version: 1.0.23049

Page 3 of 13

Statistical Process Analysis (MOC)

1

 Statistische Prozessanalyse - Überblick

Summary

Possible fields of application

This function package includes the statistical reports/evaluations. In this  context, samples are generated

from  the  raw  data  on  the  basis  of  the  sample  parameters  defined  within  the  collection  rules  or  their

characteristics. To present the mean values of samples as graphic curve over time ideally complements

the  measured  value  curves  of  the  graphic  process  analysis  to  represent  the  data  set  in  a  statistically

smoothed  way. Quality control charts enable statistical process monitoring and  analysis  on the  basis  of

process values.

Integration

A machine interface for data collection in the HYDRA Process Communication Controller (PCC) as well

as  the  licenses  for  process  data  collection  and  processing  (PDV-PDM  and  PDV-VRP)  are  required  for

using this function package.

Functions

Possible analyses/evaluations of the statistical process analysis:

  Enhanced  graphic  process  evaluation:  Evaluation  of  samples  in  correlative  process  analysis.

Mean values of samples and process limits are displayed for the samples in graphic form.

  Enhanced  graphic  process  evaluation:  Samples  are  evaluated  on  the  basis  of  control  charts

using extensive filter criteria. Different control charts are possible (e.g. xq, s and R).

PDV-SPA_81.docx

Version: 1.0.23049

Page 4 of 13

Statistical Process Analysis (MOC)

2  Graphic Process Analysis with Samples (based on machines)

Summary

Menu

Quality  management    Process  analysis    Graphic  process  analysis  with
samples (based on machines)

Transaction code

gpdasm

Function authorization

gpdasm

The graphic process analysis is used for the process analysis  in quality management. The collection of

samples enables the values to be compressed and allows for statistical preparation. The analysis function

based on samples represents average values and their progression; it is an Xq chart.

Usage

The graphic process analysis provides a powerful graphic analysis tool for displaying process values read

out of the database based on time period and selection criteria and to compare them with each other. The

selected process parameters can also be saved together as a compilation under a freely available  name

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

PDV-SPA_81.docx

Version: 1.0.23049

Page 5 of 13

Statistical Process Analysis (MOC)

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

PDV-SPA_81.docx

Version: 1.0.23049

Page 6 of 13

Statistical Process Analysis (MOC)

PDV-SPA_81.docx

Version: 1.0.23049

Page 7 of 13

Statistical Process Analysis (MOC)

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

PDV-SPA_81.docx

Version: 1.0.23049

Page 8 of 13

Statistical Process Analysis (MOC)

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

PDV-SPA_81.docx

Version: 1.0.23049

Page 9 of 13

Statistical Process Analysis (MOC)

PDV-SPA_81.docx

Version: 1.0.23049

Page 10 of 13

Statistical Process Analysis (MOC)

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

PDV-SPA_81.docx

Version: 1.0.23049

Page 11 of 13

Statistical Process Analysis (MOC)

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

PDV-SPA_81.docx

Version: 1.0.23049

Page 12 of 13

Statistical Process Analysis (MOC)

PDV-SPA_81.docx

Version: 1.0.23049

Page 13 of 13

