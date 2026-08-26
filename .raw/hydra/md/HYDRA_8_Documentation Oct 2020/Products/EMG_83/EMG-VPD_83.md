Manual

Visualization of Power Data
EMG-VPD 8.3

Version 1.0.23049

Last changed on: 01.09.2020

Visualization of Power Data

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

EMG-VPD_83.docx

Version: 1.0.23049

Page 2 of 6

Visualization of Power Data

Contents

1  Visualizing Performance Data ...................................................................... 4

2  Process Visualization ................................................................................... 5

EMG-VPD_83.docx

Version: 1.0.23049

Page 3 of 6

Visualization of Power Data

1

 Visualizing Performance Data

Overview

Purpose

The  product  EMG-VPD  includes  visualization  functions  for  the  MOC  client.  The  performance  data

distributed via MQTT broker is visualized here.

The logical channels and the collection requests that are actively performed at the machines specify the

data that can be displayed.

To  visualize  data,  predefined  display  instruments  and  trend  graphs  are  available.  You  can  use  special

layouts for the visualization.

Integration

This  product  requires  a  machine  interface  for  data  collection  in  the  Process  Communication  Controller

(PCC), the network infrastructure and the basic EMG-PDC package including collection rules.

Features

  This product provides a permanent display of process data of one or several machines or systems.

  This product provides an online display of measured values including predefined gauge charts for

a machine.

  This product provides an online display of measured values as trend line for a machine. The last

50  measured  values  of  a  characteristic  recorded  since  the  start  of  the  trend  are  visualized  as

continuous trend chart.

EMG-VPD_83.docx

Version: 1.0.23049

Page 4 of 6

Visualization of Power Data

2  Process Visualization

Overview

Menu

Quality management  Process analysis  Process visualization

Transaction code

vispd

Function authorization

visupd

Purpose

Using  the  data  that  is  collected  according  to  defined  collection  rules,  you  can  visualize  defined

characteristics  online.  In  the  network,  an  MQTT  Broker  is  used  to  provide  the  characteristics  that  are

selected for visualization.

To display the values, select one of the predefined templates as layout. You can also integrate individual

display layouts.

Integration

The process data provided by the MQTT Broker is visualized using the display functions. The visualization

is based on the specifications made for the data collection.

Requirements

If  the  option  Visualize  is  enabled  in  the  collection  rule  of  the  process  characteristic,  then  this  process

characteristic is provided by the visualization component.

An  MQTT  Broker  provides  the  process  data  that  must  be  visualized  and  transfers  them  to  the  MOC

visualization  component.  A  continuous  Ethernet  connection  between  MOC  and  MQTT  Broker  must  be

provided.

Selection criteria

The application provides the following selection criteria:

Workplace

Select the workplace using the selection field Workplace. The process parameters of this workplace

are then visualized. You can select a machine.

EMG-VPD_83.docx

Version: 1.0.23049

Page 5 of 6

Visualization of Power Data

Layout

The dropdown selection list of the layout includes the available display layouts. Select a layout from

the dropdown selection list.

You can select one of the HYDRA standard layouts or a custom layout, if required.

Detail applications

In  the  Visualization  panel,  the  process  parameters  of  the  selected  workplace  that  are  specified  for

visualization are displayed. The selected layout specifies the display of the elements.

The scaling  of the display  element depends on the recorded process  parameter value  and its specified

limits (target value, process action limit and tolerance limit).

Trend chart:

The measured values of a characteristic recorded since the start of the trend are visualized as continuous

trend chart. The last 50 measured values recorded can be displayed at most.

EMG-VPD_83.docx

Version: 1.0.23049

Page 6 of 6

