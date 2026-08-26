Graphic Process Analysis with Samples (based on machines)

1  Graphic Process Analysis with Samples (based on machines)

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

selected process parameters can also be saved together as a compilation under a  freely available name

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

MOC_ControlChartProcessdataAnalysisSampleMachine.docx  Version:

Page 1 of 3

Graphic Process Analysis with Samples (based on machines)

Consider long-term data

Enabling this checkbox allows for long-term data to be considered.

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

MOC_ControlChartProcessdataAnalysisSampleMachine.docx  Version:

Page 2 of 3

Graphic Process Analysis with Samples (based on machines)

MOC_ControlChartProcessdataAnalysisSampleMachine.docx  Version:

Page 3 of 3

