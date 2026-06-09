Manual
Power Data Distribution
EMG-PDD 8.3
Version 1.0.23049
Last changed on: 01.09.2020

Power Data Distribution
Copyright
©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.
Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.
EMG-PDD_83.docx Version: 1.0.23049 Page 2 of 18

|     |     |     | Power Data Distribution  |
| --- | --- | --- | ------------------------ |

Contents
1  Overview: Real-Time Process Data Monitoring ........................................... 4
2  Configuration PDV Visualization .................................................................. 5

| EMG-PDD_83.docx  |     | Version: 1.0.23049  | Page 3 of 18  |
| ---------------- | --- | ------------------- | ------------- |

Power Data Distribution
1 Overview: Real-Time Process Data Monitoring
Overview
Purpose
The product "PDV-RPM 8.3" includes functions for the online visualization of data on the MOC client. You
can visualize the process data that is published via MQTT broker. The logical channels and the collection
requests that are actively performed at the machines specify the data that can be displayed.
To visualize data, predefined display instruments and a trend graph are available. You can integrate
special layouts into the system. Via the relevant editors, you use these layouts to visualize machines or
equipment.
Integration
For the product PDV-RPM 8.3, the following requirements must be fulfilled:
- machine interface for data collection in the Process Communication Controller (PCC),
- data must be published via the MQTT broker,
- the basic PDV-PDM package including collection rules must be available.
Features
This product provides the following functions:
 Permanent display of process data of one or more machines and systems. You can define your
own layouts or have them generated via customization.
 Display of real time measured values of a machine using predefined gauge charts. You can
select the displayed characteristics in an interactive manner.
 Display of real time measured values of a machine as trend line. The last 50 measured values of
a process characteristic are visualized online as continuous trend graph.
EMG-PDD_83.docx Version: 1.0.23049 Page 4 of 18

Power Data Distribution
2 Configuration PDV Visualization
Purpose
This document describes how to configure layouts for the PDV online visualization on the terminal (AIP
8.2) and the MES Operation Center (MOC).
Requirements
The online visualization via MQTT requires an active license PDV-RPM, AIP-PDV. For the terminal or the
MOC, the following requirements must be fulfilled:
MOC:
- Configure the storage path in the HYDRA paths with a key "pdvlay"
(Go to: System administration  System settings  Paths).
Terminal:
- The terminal version 8.2.1.1 is required.
Procedure
General files
MPDV provides 5 default layouts as of Hydra service pack 12. The layouts include the following
configurations:
- Mixed layout with all available controls
- Layout with line charts (Charts)
- Layout with digital displays (Digital)
- Layout with level indicator (Linear)
- Layout with gauge chart (Gauge)
The supply also includes a configuration file "MachineLayoutConfiguration.xml". This file lists the
available layouts for the different machines.
Configuration of the layout assignment ("MachineLayoutConfiguration.xml")
Sample configuration:
EMG-PDD_83.docx Version: 1.0.23049 Page 5 of 18

Power Data Distribution
<Allocations>
<LayoutsForAllMachines>
<Layout id="Global" filename="DefaultLayout.xml">Mix Standard Layout</Layout>
<Layout id="ALL_1" filename="default_4x4_gauge.xml">Gauge 4x4</Layout>
<Layout id="ALL_2" filename="default_4x4_digital.xml">Digital 4x4</Layout>
<Layout id="ALL_3" filename="default_4x4_bar.xml">Bar 4x4</Layout>
<Layout id="ALL_4" filename="default_4x4_chart.xml">Chart 4x4</Layout>
</LayoutsForAllMachines>
<MachineSpecificLayouts>
<MachineSpecificLayout mnr="xyz">
<Layouts>
</Layouts>
</MachineSpecificLayout>
</MachineSpecificLayouts>
</Allocations>
XML element Description
LayoutsForAllMachines Provides a list of layouts that are available with all
machines.
MachineSpecificLayouts Includes the configurations of the layouts for the
machines.
MachineSpecificLayout Provides a list of layouts that are only available
with the machines defined in "mnr".
Layout Describes an individual layout:
id:
Internal ID for the layout assignment. Must be
unambiguous.
Filename:
File name of the layout.
Value:
Display name of the layout. e.g. "Mix Standard
Layout"
Customization:
EMG-PDD_83.docx Version: 1.0.23049 Page 6 of 18

|     |     |     | Power Data Distribution  |
| --- | --- | --- | ------------------------ |

-  In the MOC:
You can store an individual layout assignment in the HYDRA server when using the MOC. It must
be named "MachineLayoutConfiguration_custom.xml".

-  In the terminal:
In the terminal, you can create specific layouts for a terminal or a terminal group. The storage of
layout configurations is performed according to the default storage of configurations in the
terminal. You can find the layouts in the terminal directory in .\etc\PDV\Layouts.
The file contents are NOT merged.

Configuration of a layout
Sample configuration:
<LayoutGroup>
  <GroupName></GroupName>
  <ItemOrientation>Horizontal</ItemOrientation>
  <Items>
|     | <LayoutItem>                                   |     |     |
| --- | ---------------------------------------------- | --- | --- |
|     |   <Type>Gauge</Type>                           |     |     |
|     |   <MaxValueCount>5</MaxValueCount>             |     |     |
|     |   <Topic>mv/pp/%WORKPLACE%/%PPARAM%</Topic>    |     |     |
|     |   <GuiRefreshTime>2000</GuiRefreshTime>        |     |     |
|     |   <SmoothValueChange>true</SmoothValueChange>  |     |     |
|     |   <MinorTickCount>10</MinorTickCount>          |     |     |
|     |   <MajorTickCount>5</MajorTickCount>           |     |     |
|     |   <Layout>CleanWhite</Layout>                  |     |     |
|     | </LayoutItem>                                  |     |     |
</LayoutGroup>

General, valid for all types of display.
XML element  Description
Type  Specifies the type of display
Linear: display of level indicator
Digital: digital display
Gauge: display of gauge chart
Chart: display of trend line
If you do not select a display type or the selected
type is not found, a gauge chart is automatically

| EMG-PDD_83.docx  |     | Version: 1.0.23049  | Page 7 of 18  |
| ---------------- | --- | ------------------- | ------------- |

|     |     |     |     |     |     |     | Power Data Distribution  |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | ------------------------ | --- | --- | --- |

displayed.
Topic  Specifies  the  MQTT  topic.  This  specification  is
|     |     |     | mandatory                      |     | and  | is           | currently  |      | always      |      |
| --- | --- | --- | ------------------------------ | --- | ---- | ------------ | ---------- | ---- | ----------- | ---- |
|     |     |     | "mv/pp/%WORKPLACE%/%PPARAM%".  |     |      |              |            |      |             | The  |
|     |     |     | placeholders                   |     |      | %WORKPLACE%  |            |      |             | and  |
|     |     |     | %PPARAM%                       |     | are  | replaced     | with       | the  | respective  |      |
PDV configuration during run time.
GuiRefreshTime  This property modifies the update interval [ms] of
the control. Depending on the number of controls
(i.e. the process parameters) and the frequence of
incoming values, you can increase or decrease
the update rate.
Example:
Many values + many process parameters = higher
update interval
Many values + few process parameters = medium
update interval
|     |     |     | Few  | values  | +   | many  | process  | parameters  |     | =   |
| --- | --- | --- | ---- | ------- | --- | ----- | -------- | ----------- | --- | --- |
medium update interval
|     |     |     | Few  | values  | +   | few  process  |     | parameters  |     | =  low  |
| --- | --- | --- | ---- | ------- | --- | ------------- | --- | ----------- | --- | ------- |
update interval
Important:

|     |     |     |     | -  The    | intervals  |            | also  | depend  | on        | the  |
| --- | --- | --- | --- | --------- | ---------- | ---------- | ----- | ------- | --------- | ---- |
|     |     |     |     | hardware  |            | equipment  | of    | the     | terminal  | or   |
computer.
-  The controls store only the last value that
was received. Exception: the chart display
(trend line). If further values are received
|     |     |     |     | between  |     | the  updates,  |     | the  | values  | are  |
| --- | --- | --- | --- | -------- | --- | -------------- | --- | ---- | ------- | ---- |
discarded and only the most recent value
is adopted. The chart saves all incoming
values.

| EMG-PDD_83.docx  |     | Version: 1.0.23049  |     |     |     |     |     |     | Page 8 of 18  |     |
| ---------------- | --- | ------------------- | --- | --- | --- | --- | --- | --- | ------------- | --- |

Power Data Distribution
Layout Type of layout. See available layouts.
GroupName Name of the layout group This name is also
displayed in the view.
ItemOrientation Horizontal: The controls are displayed in a row.
Vertical: The controls are displayed in a column.
For charts:
XML element Description
MaxValueCount Identifies the maximum number of values to be
displayed within the chart.
For all display types except chart:
XML element Description
SmoothValueChange Enables a smooth transition of the pointer from
one value to the next.
Important:
In case of high update rates, you should not use
this feature as the smooth transition takes time.
MajorTickCount (not available with Digital)* It is possible to overwrite the MajorTickCounts
calculated during run time with a fixed value.
MinorTickCount (not available with Digital)* This property enables a configuration of the
number of ticks.
* A tick corresponds to a line in the scale. Therefore, a MajorTick corresponds to a line with a value. The
MinorTicks are displayed between the MajorTicks.
Available layouts:
Layout Display on AIP
EMG-PDD_83.docx Version: 1.0.23049 Page 9 of 18

|     |     |     | Power Data Distribution  |
| --- | --- | --- | ------------------------ |

CleanWhite

Classic

Clever

| EMG-PDD_83.docx  |     | Version: 1.0.23049  | Page 10 of 18  |
| ---------------- | --- | ------------------- | -------------- |

|     |     |     | Power Data Distribution  |
| --- | --- | --- | ------------------------ |

DarkNight

iStyle

Retro

| EMG-PDD_83.docx  |     | Version: 1.0.23049  | Page 11 of 18  |
| ---------------- | --- | ------------------- | -------------- |

Power Data Distribution
ShiningDark
Smart
White
Layout Display on AIP and MOC
EMG-PDD_83.docx Version: 1.0.23049 Page 12 of 18

|     |     |     | Power Data Distribution  |
| --- | --- | --- | ------------------------ |

CleanWhite

Classic

Clever

| EMG-PDD_83.docx  |     | Version: 1.0.23049  | Page 13 of 18  |
| ---------------- | --- | ------------------- | -------------- |

|     |     |     | Power Data Distribution  |
| --- | --- | --- | ------------------------ |

DarkNight

iStyle

Retro

| EMG-PDD_83.docx  |     | Version: 1.0.23049  | Page 14 of 18  |
| ---------------- | --- | ------------------- | -------------- |

Power Data Distribution
ShiningDark
Smart
White
Layout Display on AIP and MOC
EMG-PDD_83.docx Version: 1.0.23049 Page 15 of 18

|     |     |     | Power Data Distribution  |
| --- | --- | --- | ------------------------ |

CleanWhite

Classic

Clever

| EMG-PDD_83.docx  |     | Version: 1.0.23049  | Page 16 of 18  |
| ---------------- | --- | ------------------- | -------------- |

|     |     |     | Power Data Distribution  |
| --- | --- | --- | ------------------------ |

DarkNight

iStyle

Retro

| EMG-PDD_83.docx  |     | Version: 1.0.23049  | Page 17 of 18  |
| ---------------- | --- | ------------------- | -------------- |

Power Data Distribution
ShiningDark
Smart
White
EMG-PDD_83.docx Version: 1.0.23049 Page 18 of 18