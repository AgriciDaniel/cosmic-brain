Graphic Process Analysis (based on machines)

1  Graphic Process Analysis (based on machines)

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

MOC_ControlChartProcessdataAnalysisMachine.docx

Version:1.2.1362

Page 1 of 3

Graphic Process Analysis (based on machines)

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

MOC_ControlChartProcessdataAnalysisMachine.docx

Version:1.2.1362

Page 2 of 3

Graphic Process Analysis (based on machines)

If the machine time profile is shown, the user also can carry out selections for the graphic of the machine

time  profile  there.  In  the  machine  time  profile,  the  machine  status  is  always  displayed.  If  resource

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

MOC_ControlChartProcessdataAnalysisMachine.docx

Version:1.2.1362

Page 3 of 3

