Graphic Process Analysis

1  Graphic Process Analysis

Overview

Menu

Quality management  Process analysis  Graphic process analysis

Transaction code

Function authorization

gpa

gpa

The "graphic process analysis" is used for the process analysis in quality management.

Usage

The  graphic  process  analysis  provides  a  powerful  graphic  analysis  tool  for  displaying  process  values.

These  are  read  out  from  the  database  based  on  time  period  and  selection  criteria.  The  tool  also

compares process values with each other.  It is also possible to show the measured values along with the

machine status or binary process events.

Additionally,  data  can  be  presented  in  a  compact  view.    Therefore,  large  amounts  of  data  can  be

analyzed with respect to their range and mean values.

The selected process value lines and events can also be saved as a compilation under a freely selectable

name so that analyses that recur often can be called up easily.

Integration

The  function  displays  collected  measured  values  of  the  process  characteristics,  events  and  machine

statuses. These values must have been previously collected in the system.

Selection criteria

The application provides the following selection criteria:

"Machine" tab

Workplace

The  required  workplace  can  be  selected  specifically  in  the  "machine"  field  using  the  pool  of

workplaces application.

Machine status

One or several possible machine statuses can be selected. The periods of time when the selected

statuses did not apply for the machine are highlighted in the graphic (gray, transparent).

"Order" tab

MOC_ControlChartProcessdataAnalysis.docxVersion: 1.0.5115

Page 1 of 4

MES order number

Selects a specific operation (MES order number). The required MES order number can be selected

Graphic Process Analysis

specifically in the field using the pool application.

ERP batch

Selects a specific operation (MES order number)

"ERP batch" tab

Internal batch number

Specifically selects a produced MES batch and/or produced ERP batch. The required internal batch

number can be selected specifically in the field using the pool application.

Alternative batch number 1

Selects the "alternative batch number 1" at the produced batch.

General selection area

Time domain from – until

Specifies a specific period of time for the evaluation.

Process parameters

The process parameters drop down list includes a selection of process parameters.

Tag type + tag ID

Selection of the tag type (in a user-friendly manner by a drop-down list) and the tag ID.

Automatic compression

The  system  specifies  an  automatic  compression  value  and  the  compression  dimension  based  on

the selection parameters if the checkbox is checked.

Compression value

Includes  the  compression  value.  The  compression  value  and  the  compression  dimension

summarize the individual measured values in the (compact) view.

Compression dimension

Includes the compression dimension. Seconds, minutes, hours or days can be chosen.

Consider long-term data

Long-term data may also be taken into account by clicking this checkbox.

Please note that all data used for these evaluations/reports are kept in the server memory. Consequently,

it is not recommended to select too large periods and data sets.

MOC_ControlChartProcessdataAnalysis.docxVersion: 1.0.5115

Page 2 of 4

Technical background:  Every time data  is requested  in client applications,  it  will  be stored  in  the server

memory and only then transferred to the client. If you require more memory space, the memory reserved

for  the  Java  application  needs  to  be  increased  accordingly  in  the  server.  Please  refer  to  the  technical

Graphic Process Analysis

documentation or contact MPDV Support.

Toolbar

 Show process values

Show or hides the analog trace.

 Single

The graphic shows individual process values. They are not compressed.

Please  note:  When  switching  from  "compressed"  to  "single",  the  graphic  will  only  be  refreshed,

once data has been requested.

 Compressed

The graphic shows compressed process values.

Please  note:  When  switching  from  "single"  to  "compressed",  the  graphic  will  only  be  refreshed,

once data has been requested.

 Show machine status

Shows  or  hides  the  machine  status  (machine  time  profile).  It  is  shown  in  the  lower  section  of  the

window.

 Show events

Shows or hides the bit trace (events). It is shown in the lower section of the window.

 Determine compression period

Generates  a  recommended  compression  value  and  the  compression  dimension  based  on  the

entered selection parameters and transfers the value to the selection field "compression value" and

"compression dimension".

These specifications are only used if the application was set to "compressed" beforehand.

MOC_ControlChartProcessdataAnalysis.docxVersion: 1.0.5115

Page 3 of 4

Graphic Process Analysis

Detail applications

The  graphics  of  the  selected  area  are  displayed  in  the  graphic  process  analysis  area.  The  buttons

 can be used to insert another area for the graphic process analysis in which a new process

parameter  can  be  selected.  They  can  also  be  used  if  an  area  inserted  for  graphic  process  analysis  is

removed.

A special feature of this graphic is the ability to zoom in and out using a keyboard and mouse. To zoom in

on the graphic, press the SHIFT key and hold it down and then use the left mouse button to highlight an

area of the graphic. After the key is released, this area is enlarged in the display.

To  zoom  out  again,  press and  hold  the  ALT key  down.  Now  the  mouse  pointer  appears  as  a magnifier

with a minus sign. By clicking in the graphic, the view zooms out again and the image appears smaller.

If the machine time profile is shown, the user also can carry out selections for the graphic of the machine

time profile there. In the machine time profile, the machine status is always displayed.

If the events are shown, individual events can be selected there.

Display configuration

The following configuration options can be set for each chart:

Checkbox “Legend”

A  legend  may  be  shown  for  the  data  displayed  in  the  diagram  by  checking  this  option.  In  case  a

legend is shown, axis labeling is automatically hidden to save space.

Checkbox “Show scale“

The scale of the diagram can be shown or hidden by selecting this checkbox.

Checkbox “Show characteristic name”

This  checkbox  specifies  that  the  long  characteristic  names  are  shown  for  the  legend  and  axis

labeling instead of the short ID. Please note: labeling is not updated until data has been refreshed!

MOC_ControlChartProcessdataAnalysis.docxVersion: 1.0.5115

Page 4 of 4

