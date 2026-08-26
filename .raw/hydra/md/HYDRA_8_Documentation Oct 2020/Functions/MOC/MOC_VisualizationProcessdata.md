Process Visualization

1  Process Visualization

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

configured for the presentation of the process data. A registration  service (yellow pages to visualize

process data online) must be set-up in the network. The display layouts must be locally available. If

they are not saved locally  they  will be transferred from the  directories of the corresponding HYDRA

server to MOC upon the user's request. To do so, the button "Load PDV layouts from server" must be

used.

MOC_VisualizationProcessdata.docx

Version: 1.0.20824

Page 1 of 3

Process Visualization

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

MOC_VisualizationProcessdata.docx

Version: 1.0.20824

Page 2 of 3

Process Visualization

MOC_VisualizationProcessdata.docx

Version: 1.0.20824

Page 3 of 3

