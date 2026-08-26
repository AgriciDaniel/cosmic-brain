Manual

Online Visualization Process
Data Management Collection
Rules
PDV-OVP 8.1

Version 1.0.23049

Last changed on: 02.09.2020

  Online Visualization Process Data Management Collection Rules

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

PDV-OVP_81.docx

Version: 1.0.23049

Page 2 of 11

  Online Visualization Process Data Management Collection Rules

Contents

1  Online Visualization of Process Data ........................................................... 4

2  Process Trend .............................................................................................. 5

3  Process Data Monitor ................................................................................... 7

4  Process Visualization ................................................................................... 9

PDV-OVP_81.docx

Version: 1.0.23049

Page 3 of 11

  Online Visualization Process Data Management Collection Rules

1

 Online Visualization of Process Data

Overview

Purpose

The PDV-OVR function packet contains functions for online visualization in the MOC client. Connections

can  be  established  to  all  PDV  data  servers  available  in  the  HYDRA  network  and  that  can  be  accessed

from the infrastructure. The data from these servers is visualized online. A definition of which data can be

displayed is made by the logical channels and the collection requests currently running on the machines.

Existing  display  instruments  and  a  trend  graphic  are  available  for  visualizing.  Special  layouts  for

visualizing systems or system components can be integrated into the system using the suitable editors,

thus creating what is effectively a machine cockpit with which to view system process data.

Integration

This  function  packet  requires  a  machine  interface  for  data  collection  in  the  HYDRA  process

communication  controller  (PCC),  the  data  server  integrated  into  it,  the  network  infrastructure  and  the

basic PDV-PDM package including the collection rules.

Features

  Permanent  display  of  process  data  for  one  or  more  machines  and  systems.  With  the  proper

license  (development  license  is  required),  system  images  can  be  generated  automatically  or

created by HYDRA customizing. incl. runtime license for process visualization.

  Online measured value display with predefined pointer graphic for a machine. The characteristics

to be displayed can be selected interactively.

  Measured value displayed online as trend line for a machine. The characteristic to be displayed

can  be  selected  interactively.  Progress  and  the  last  measured  values  for  this  characteristic  are

visualized online as a continuous trend graphic.

PDV-OVP_81.docx

Version: 1.0.23049

Page 4 of 11

  Online Visualization Process Data Management Collection Rules

2  Process Trend

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

PDV-OVP_81.docx

Version: 1.0.23049

Page 5 of 11

  Online Visualization Process Data Management Collection Rules

Process parameter

The process parameter drop-down list offers a selection of process parameters.

Field descriptions

Detail applications

The  visualization  area  is  used  to  show  the  graph  of  the  selected  workplace  and  the  individual  selected

process parameters.

PDV-OVP_81.docx

Version: 1.0.23049

Page 6 of 11

  Online Visualization Process Data Management Collection Rules

3  Process Data Monitor

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

PDV-OVP_81.docx

Version: 1.0.23049

Page 7 of 11

  Online Visualization Process Data Management Collection Rules

Field descriptions

Detail applications

The selected process parameters pertaining to the selected workplace are displayed in the graphic of the

visualization area.

PDV-OVP_81.docx

Version: 1.0.23049

Page 8 of 11

  Online Visualization Process Data Management Collection Rules

4  Process Visualization

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

PDV-OVP_81.docx

Version: 1.0.23049

Page 9 of 11

  Online Visualization Process Data Management Collection Rules

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

PDV-OVP_81.docx

Version: 1.0.23049

Page 10 of 11

  Online Visualization Process Data Management Collection Rules

PDV-OVP_81.docx

Version: 1.0.23049

Page 11 of 11

