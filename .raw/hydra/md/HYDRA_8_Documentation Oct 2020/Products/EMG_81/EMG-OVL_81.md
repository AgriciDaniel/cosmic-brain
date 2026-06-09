Manual

Online Visualization of Power
Values
EGM-OVL 8.1

Version 1.0.23049

Last changed on: 01.09.2020

Online Visualization of Power Values

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

EMG-OVL_81.docx

Version: 1.0.23049

Page 2 of 14

Online Visualization of Power Values

Contents

1  Online Visualization of Power Values .......................................................... 4

2  Graphic Process Analysis (based on machines) ......................................... 5

3  Process Trend .............................................................................................. 8

4  Process Data Monitor ................................................................................. 10

5  Process Visualization ................................................................................. 12

EMG-OVL_81.docx

Version: 1.0.23049

Page 3 of 14

Online Visualization of Power Values

1  Online Visualization of Power Values

Purpose

Graphic  online  visualization  of  performance  values  and  process  parameters  collected  using  the  power

meters.

You use the function package when:

  You wish to display the currently collected performance values from the power meters online at a

terminal or the interfaced HYDRA MPC clients.

Integration

The EMG-LEE basic function is a precondition for the evaluation.

Features

Display of performance values collected at one or more meters:

  Permanent display of the performance values for one or more collection points



Independent creation of individual system charts, process charts, etc. with the editor for process

visualization (MDS-PVE)

  Display of system charts, process charts, etc. created during the course of HYDRA customizing

  Online display of the performance values at the client with predefined pointer graphics

  Online display of the performance values as a trend line; display of the last measured values and

the progress as a continuous trend chart

EMG-OVL_81.docx

Version: 1.0.23049

Page 4 of 14

Online Visualization of Power Values

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

EMG-OVL_81.docx

Version: 1.0.23049

Page 5 of 14

Online Visualization of Power Values

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

EMG-OVL_81.docx

Version: 1.0.23049

Page 6 of 14

Online Visualization of Power Values

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

EMG-OVL_81.docx

Version: 1.0.23049

Page 7 of 14

Online Visualization of Power Values

3  Process Trend

Summary

Menu

Quality management  Process data collection Process trend

Transaction code

tvpd

Function authorization

tviewpd

The process trend is used to perform process monitoring in quality management.

Usage

The collection processes defined through the collection rules allow to visualize the defined characteristics

online.  The  characteristics  identified  for  visualization  are  provided  to  the  network  by  the  related  data

servers. The visualization components existing in this application connect to these servers and will show

the measured values online.

The presentation is made as trend line.

Integration

The  display  functions  will  visualize  the  data  of  the  involved  shop  floor  servers  in  accordance  with  the

collection specifications . In doing so, always a certain amount of historic measured values will be shown

and updated by a current value.

Requirements

It must be possible to reach the shop floor servers involved in the network and they must be configured

for  the  presentation  of  the  process  data.  A  registration  service  (yellow  pages  to  visualize  process  data

online) must be set-up in the network. The display layouts must be available locally or on the server.

Selection parameters

The following selection criteria are available in the application:

Workplace

The pool application workplace can be used to select the desired workplace.

Process parameter

The process parameter drop-down list offers a selection of process parameters.

Workplace

The pool application workplace can be used to select the desired workplace.

EMG-OVL_81.docx

Version: 1.0.23049

Page 8 of 14

Process parameter

The process parameter drop-down list offers a selection of process parameters.

Online Visualization of Power Values

Field descriptions

Detail applications

The  visualization  area  is  used  to  show  the  graph  of  the  selected  workplace  and  the  individual  selected

process parameters.

EMG-OVL_81.docx

Version: 1.0.23049

Page 9 of 14

Online Visualization of Power Values

4  Process Data Monitor

Summary

Menu

Quality management  Process monitoring  Process data monitor

Transaction code

mvpd

Function authorization  mviewpd

The process data monitor is used for the process monitoring in quality management.

Usage

The  collection  procedures  defined  by  the  collection  rules  also  allow  the  online  visualization  of  defined

characteristics. The characteristics identified for visualization are provided by the respectively related data

servers  in  the  network.  The  display  components  existing  in  this  application  are  connected  to  these

servers and display the measured values online.

The display takes the form of a vector diagram.

Integration

The  data  of  the  participating  shop  floor  servers  is  visualized  by  the  display  function  based  on  the

specifications of the collection requests. A certain number of measured values from the past are always

displayed as well and are part of a continuation including the current value.

Requirement

The participating shop floor servers in the  network must be accessible  and they must be configured for

the  presentation  of  process  data.  A  registration  service  (yellow  pages  for  process  data  online

visualization) must be set up in the network. The layouts for the display must be available locally or on the

server.

Selection criteria

The following selection criteria are available in the application:

Workplace

In the workplace pool application, the desired workplace can be selected.

Process parameters

The process parameters drop down list includes a selection of process parameters.

EMG-OVL_81.docx

Version: 1.0.23049

Page 10 of 14

Online Visualization of Power Values

Field descriptions

Detail applications

The selected process parameters pertaining to the selected workplace are displayed in the graphic of the

visualization area.

EMG-OVL_81.docx

Version: 1.0.23049

Page 11 of 14

Online Visualization of Power Values

5  Process Visualization

Summary

Menu

Quality management  Process analysis  Process visualization

Transaction code

vispd

Function authorization

visupd

Process visualization is used to monitor the process data in quality management.

Usage

The collection processes defined through the collection rules allow to visualize the defined characteristics

online. The related data server provides the characteristics identified for visualization to the network. The

visualization components existing in this application connect to these servers and will show the measured

values online.

It is also possible to select the display layout and to integrate customized display layouts.

Integration

The  display  functions  will  visualize  the  data  of  the  involved  shop  floor  servers  in  accordance  with  the

collection specifications.

Requirements

It  must  be  possible  to  reach  the  shop  floor  servers  involved  in  the  network  and  they  must  be

configured for the presentation of the process data. A registration service (yellow pages to visualize

process data online) must be set-up in the network. The display layouts must be locally available. If

they are not saved locally  they  will be transferred from the  directories of the corresponding HYDRA

server to MOC upon the user's request. To do so, the button "Load PDV layouts from server" must be

used.

EMG-OVL_81.docx

Version: 1.0.23049

Page 12 of 14

Online Visualization of Power Values

In order to load the data from the server, the HYDRA path "PDVLAY" must be configured. HYDRA paths

can be created using the MOC system under "System administration-> System settings -> Paths".

URL path = ./<system no.>/custom/

Selection criteria

The following selection criteria are available in the application:

Workplace

The pool application workplace can be used to select the desired workplace.

Process parameter

The process parameter drop-down list offers a selection of process parameters.

Field descriptions

Detail applications

The visualization area is used to show the graphs of the selected workplace and the individually selected

process parameters. The display offers different visualization options that can be selected from the drop-

down  layout  list.  Several  standard  layouts  are  stored  here  but  also  special  machine  layouts  created  for

the installations and machines.

Examples:

EMG-OVL_81.docx

Version: 1.0.23049

Page 13 of 14

Online Visualization of Power Values

EMG-OVL_81.docx

Version: 1.0.23049

Page 14 of 14

