Manual

Graphic Process Analysis
(MOC)
PDV-GPA 8.1

Version 1.0.23049

Last changed on: 02.09.2020

Graphic Process Analysis (MOC)

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.
.

PDV-GPA_81.docx

Version: 1.0.23049

Page 2 of 11

Graphic Process Analysis (MOC)

Contents

1  Grafische Prozessanalyse - Übersicht ......................................................... 4

2  Graphic Process Analysis (based on machines) ......................................... 5

3  Graphic Process Analysis (based on orders) ............................................... 8

4  Graphic Process Analysis (based on batches) .......................................... 10

PDV-GPA_81.docx

Version: 1.0.23049

Page 3 of 11

Graphic Process Analysis (MOC)

1

 Grafische Prozessanalyse - Übersicht

Summary

Possible fields of application

This function package includes the graphic evaluations showing the measured values over time. The data

lines can be selected separately and combined individually to be compared in diagrams. Binary process

values  (events)  can  also  be  presented  in  the  diagrams.  In  addition,  it  is  also  possible  to  use  the

correlating MES data, such as order number, article number, and batch number as selection criteria and

to show the machine statuses that are available at the machines at the same time.

Integration

A machine interface for data collection in the HYDRA Process Communication Controller (PCC) as well

as  the  licenses  for  process  data  collection  and  processing  (PDV-PDM  and  PDV-VRP)  are  required  for

using this function package.

Functions

Efficient functions to analyze process values in detail in correlation with other process values as well as

logistical data from the production process

  Presentation (line chart) of the saved process values of a machine within a selectable period of

time

  Presentation of several diagrams in one report for correlative considerations of process values of

a machine

  Show/hide the machine status development in form of a time profile within the selected period

  Show/hide batch-related data in the selected period

  Show/hide selected process events within the selected period in form of a bit trace

PDV-GPA_81.docx

Version: 1.0.23049

Page 4 of 11

Graphic Process Analysis (MOC)

2  Graphic Process Analysis (based on machines)

Summary

Menu

Quality  Management    Process  Analysis    Graphic  Process  Analysis
(based on machines)

Transaction code

gpdam

Function authorization

gpda

The graphic process analysis is used for the process analysis in quality management.

Usage

The graphic process analysis provides a powerful graphic analysis tool for displaying process values read

out of the database based on time period and selection criteria and to compare them with each other. In

addition,  the  measured  values  can  be  displayed  together  with  the  machine  status  or  binary  process

events. The selected process value lines and events can also be saved together as a compilation under a

freely available name so that analyses that recur often can be called up easily.

Integration

The  function  displays  collected  measured  values  of  the  process  characteristics,  events  and  machine

statuses. These values must have been previously collected in the system.

Selection criteria

The following selection criteria are available in the application:

Machine

The  required  workplace  can  be  searched  specifically  in  the  "general"  index  tab  using  the  pool  of

workplaces application.

Time domain from – until

Specifies a specific period of time for the evaluation.

Process parameters

The process parameters drop down list includes a selection of process parameters.

Tag type + Tag ID

Selection of the tag type (in a user-friendly manner by a drop-down list) and the tag ID.

Consider long-term data

Long-term data may also be taken into account by clicking this checkbox.

PDV-GPA_81.docx

Version: 1.0.23049

Page 5 of 11

Graphic Process Analysis (MOC)

Please note that all data used for these evaluations/reports are kept in the server memory. Consequently,

it  is  not  recommendable  to  select  too  large  periods  and  data  sets.  In  addition,  data  might  no  longer  be

displayed clearly in graphics without additional functions, such as the zoom.

Technical background: every time data is requested  in client applications, this data  will  be stored  in the

server memory and  only  then it  will be transferred to  the client. If  you require more memory space, the

memory reserved for the Java application needs to be increased accordingly on the server. Please refer

to the technical documentation or contact MPDV Support.

Toolbar

 Show process values

Show or hides the analog trace.

 Show machine status

Shows or hides the machine status (machine time profile). This is shown in the lower section of the

window.

 Show events

Shows or hides the bit trace (events). This is shown in the lower section of the window.

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

PDV-GPA_81.docx

Version: 1.0.23049

Page 6 of 11

If the machine time profile is shown, the user also can carry out selections for the graphic of the machine

time  profile  there.  In  the  machine  time  profile,  the  machine  status  is  always  displayed.  If  resource

Graphic Process Analysis (MOC)

statuses are used at the same time, they can also be shown.

If the events are shown, individual events can be selected there.

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

PDV-GPA_81.docx

Version: 1.0.23049

Page 7 of 11

Graphic Process Analysis (MOC)

3  Graphic Process Analysis (based on orders)

Summary

Menu

Quality  management    Process  analysis    Graphic  process  analysis
(based on orders)

Transaction code

gpdao

Function authorization

gpdao

The graphic process analysis is used for the process analysis in quality management.

Usage

The graphic process analysis provides a powerful graphic analysis tool for displaying process values read

out of the database based on time period and selection criteria and to compare them with each other.

Integration

The function displays the selected and collected measured values of the process characteristics. These

values must have been previously collected in the system.

Selection parameters

The following selection criteria are available in the application:

MES order number

Selects a specific operation (MES order number)

Batch

Selects a batch number

Time domain from – until

Selects a specific period of time

Tag type + Tag ID

Selection of the tag type (in a user-friendly manner by a drop-down list) and the tag ID.

Consider long-term data

Long-term data may also be taken into account by clicking this checkbox.

Process parameters

The process parameters drop down list includes a selection of process parameters.

PDV-GPA_81.docx

Version: 1.0.23049

Page 8 of 11

Graphic Process Analysis (MOC)

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

glass  with  a  minus  sign.  Now  the  mouse  pointer  appears  as  a  magnifying  glass  with  a  minus  sign.  By

clicking in the graphic, the view zooms out again and the image appears smaller.

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

PDV-GPA_81.docx

Version: 1.0.23049

Page 9 of 11

Graphic Process Analysis (MOC)

4  Graphic Process Analysis (based on batches)

Summary

Menu

Quality  Management    Process  Analysis    Graphic  Process  Analysis
(based on batches)

Transaction code

gpdac

Function authorization

gpdac

The graphic process analysis is used for the process analysis in quality management.

Usage

The graphic process analysis provides a powerful graphic analysis tool for displaying process values read

out of the database based on time periods and selection criteria and to compare them with each other.

Integration

The function displays the selected and recorded measured values of the process characteristics. These

values must have been previously collected in the system.

Selection parameters

The following selection criteria are available in the application:

Batch number

Specifically selects a produced batch.

Alternative batch number 1

Selects the alternative batch number 1 at the produced batch

Period from – until

Selects a period of time

Tag type + Tag ID

Selects the tag type (in a user-friendly manner using a drop-down list) and the tag ID.

Consider long-term data

Long-term data may also be taken into account by clicking this checkbox.

Process parameters

The process parameters drop down list includes a selection of process parameters.

Please note that all data used for these evaluations/reports are kept in the server memory. Consequently,

it  is  not  recommendable  to  select  too  large  periods  and  data  sets.  In  addition,  data  might  no  longer  be

displayed clearly in graphics without additional functions, such as the zoom.

PDV-GPA_81.docx

Version: 1.0.23049

Page 10 of 11

Graphic Process Analysis (MOC)

Technical background: every time data is requested  in client applications, this data  will  be stored  in the

server memory and  only  then it  will be transferred to  the client. If  you require more memory space, the

memory reserved for the Java application needs to be increased accordingly on the server. Please refer

to the technical documentation or contact MPDV Support

Detail applications

The  graphics  of  the  selected  area  are  displayed  in  the  graphic  process  analysis  area.  The  buttons

 can be used to insert another area for the graphic process analysis in which a new process

parameter can be selected. Or an area inserted for the graphic process analysis is removed.

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

PDV-GPA_81.docx

Version: 1.0.23049

Page 11 of 11

