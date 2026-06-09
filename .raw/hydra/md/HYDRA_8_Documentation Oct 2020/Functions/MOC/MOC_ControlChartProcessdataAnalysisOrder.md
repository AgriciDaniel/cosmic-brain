Graphic Process Analysis (based on orders)

1  Graphic Process Analysis (based on orders)

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

MOC_ControlChartProcessdataAnalysisOrder.docxVersion:

Page 1 of 2

Graphic Process Analysis (based on orders)

Please note that all data used for these evaluations/reports are kept in the server memory. Consequently,

it  is  not  recommendable  to  select  too  large  periods  and  data  sets.  In  addition,  data  might  no  longer  be

displayed clearly in graphics without additional functions, such as the zoom.

Technical background: every time data is requested  in client applications, this data  will  be stored  in the

server memory and  only  then it  will be transferred to  the client. If  you require more memory space, the

memory reserved for the Java application needs to be increased accordingly on the server. Please refer

to the technical documentation or contact MPDV Support.

Detail applications

The  graphics  of  the  selected  area  are  displayed  in  the  graphic  process  analysis  area.  The  buttons

 can be used to insert another area for the graphic process analysis in  which a new process

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

MOC_ControlChartProcessdataAnalysisOrder.docxVersion:

Page 2 of 2

