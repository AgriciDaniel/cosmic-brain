Manual

Real-time Process Data
Monitoring
PDV-RPM 8.3

Version 1.0.23049

Last changed on: 02.09.2020

Real-time Process Data Monitoring

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

PDV-RPM_83.docx

Version: 1.0.23049

Page 2 of 21

Real-time Process Data Monitoring

Contents

1  Overview: Real-Time Process Data Monitoring ........................................... 4

2  Configuration PDV Visualization .................................................................. 5

3  PDV Online Visualization: MQTT ............................................................... 19

PDV-RPM_83.docx

Version: 1.0.23049

Page 3 of 21

Real-time Process Data Monitoring

1

 Overview: Real-Time Process Data Monitoring

Overview

Purpose

The product "PDV-RPM 8.3" includes functions for the online visualization of data on the MOC client. You

can visualize the process data that is published via MQTT broker. The logical channels and the collection

requests that are actively performed at the machines specify the data that can be displayed.

To  visualize  data,  predefined  display  instruments  and  a  trend  graph  are  available.  You  can  integrate

special layouts into the system. Via the relevant editors, you use these layouts to visualize machines or

equipment.

Integration

For

the

product

PDV-RPM

8.3,

the

following

requirements  must

be

fulfilled:

- machine interface for data collection in the Process Communication Controller (PCC),

- data must be published via the MQTT broker,

- the basic PDV-PDM package including collection rules must be available.

Features

This product provides the following functions:

  Permanent display of process data of one or more machines and systems. You can define your

own layouts or have them generated via customization.

  Display  of  real  time  measured  values  of  a  machine  using  predefined  gauge  charts.  You  can

select the displayed characteristics in an interactive manner.

  Display of real time measured values of a machine as trend line. The last 50 measured values of

a process characteristic are visualized online as continuous trend graph.

PDV-RPM_83.docx

Version: 1.0.23049

Page 4 of 21

Real-time Process Data Monitoring

2  Configuration PDV Visualization

Purpose

This document describes  how to configure  layouts for the PDV online visualization on the terminal (AIP

8.2) and the MES Operation Center (MOC).

Requirements

The online visualization via MQTT requires an active license PDV-RPM, AIP-PDV. For the terminal or the

MOC, the following requirements must be fulfilled:

MOC:

-  Configure

the

storage

path

in

the  HYDRA

paths  with

a

key

"pdvlay"

(Go to: System administration  System settings  Paths).

Terminal:

-  The terminal version 8.2.1.1 is required.

Procedure

General files

MPDV  provides  5  default  layouts  as  of  Hydra  service  pack  12.    The  layouts  include  the  following

configurations:

-  Mixed layout with all available controls

-

-

-

-

Layout with line charts (Charts)

Layout with digital displays (Digital)

Layout with level indicator (Linear)

Layout with gauge chart (Gauge)

The  supply  also  includes  a  configuration  file  "MachineLayoutConfiguration.xml".  This  file  lists  the

available layouts for the different machines.

Configuration of the layout assignment ("MachineLayoutConfiguration.xml")

Sample configuration:

PDV-RPM_83.docx

Version: 1.0.23049

Page 5 of 21

Real-time Process Data Monitoring

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

XML element

Description

LayoutsForAllMachines

Provides a list of layouts that are available with all

machines.

MachineSpecificLayouts

Includes  the  configurations  of  the  layouts  for  the

machines.

MachineSpecificLayout

Provides  a  list  of  layouts  that  are  only  available

with the machines defined in "mnr".

Layout

Describes an individual layout:

id:

Internal  ID  for  the  layout  assignment.  Must  be

unambiguous.

Filename:

File name of the layout.

Value:

Display  name  of  the  layout.  e.g.  "Mix  Standard

Layout"

Customization:

PDV-RPM_83.docx

Version: 1.0.23049

Page 6 of 21

Real-time Process Data Monitoring

-

In the MOC:

You can store an individual layout assignment in the HYDRA server when using the MOC. It must

be named "MachineLayoutConfiguration_custom.xml".

-

In the terminal:

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

<LayoutItem>

<Type>Gauge</Type>
<MaxValueCount>5</MaxValueCount>
<Topic>mv/pp/%WORKPLACE%/%PPARAM%</Topic>
<GuiRefreshTime>2000</GuiRefreshTime>
<SmoothValueChange>true</SmoothValueChange>
<MinorTickCount>10</MinorTickCount>
<MajorTickCount>5</MajorTickCount>
<Layout>CleanWhite</Layout>

</LayoutGroup>

</LayoutItem>

General, valid for all types of display.

XML element

Type

Description

Specifies the type of display

Linear: display of level indicator

Digital: digital display

Gauge: display of gauge chart

Chart: display of trend line

If you do not select a display type or the selected

type is not found, a gauge chart is automatically

PDV-RPM_83.docx

Version: 1.0.23049

Page 7 of 21

Topic

Real-time Process Data Monitoring

displayed.

Specifies  the  MQTT  topic.  This  specification  is

mandatory

and

is

currently

always

"mv/pp/%WORKPLACE%/%PPARAM%".

placeholders

%WORKPLACE%

The

and

%PPARAM%  are  replaced  with  the  respective

PDV configuration during run time.

GuiRefreshTime

This property modifies the  update interval [ms] of

the control. Depending on the number of controls

(i.e. the process parameters) and the frequence of

incoming  values,  you  can  increase  or  decrease

the update rate.

Example:

Many values + many process parameters = higher

update interval

Many values + few process parameters = medium

update interval

Few  values  +  many  process  parameters  =

medium update interval

Few  values  +  few  process  parameters  =  low

update interval

Important:

-  The

intervals  also  depend  on

the

hardware  equipment  of  the  terminal  or

computer.

-  The controls store only the last value that

was received. Exception: the chart display

(trend  line).  If  further  values  are  received

between  the  updates,  the  values  are

discarded and only the most recent value

is  adopted.  The  chart  saves  all  incoming

values.

PDV-RPM_83.docx

Version: 1.0.23049

Page 8 of 21

Layout

GroupName

Real-time Process Data Monitoring

Type of layout. See available layouts.

Name  of  the  layout  group  This  name  is  also

displayed in the view.

ItemOrientation

Horizontal:  The  controls  are  displayed  in  a  row.

Vertical: The controls are displayed in a column.

For charts:

XML element

Description

MaxValueCount

Identifies the maximum number of values to be

displayed within the chart.

For all display types except chart:

XML element

Description

SmoothValueChange

Enables a smooth transition of the pointer from

one value to the next.

Important:

In case of high update rates, you should not use

this feature as the smooth transition takes time.

MajorTickCount (not available with Digital)*

It is possible to overwrite the MajorTickCounts

calculated during run time with a fixed value.

MinorTickCount (not available with Digital)*

This property enables a configuration of the

number of ticks.

* A tick corresponds to a line in the scale. Therefore, a MajorTick corresponds to a line with a value. The

MinorTicks are displayed between the MajorTicks.

Available layouts:

Layout

Display on AIP

PDV-RPM_83.docx

Version: 1.0.23049

Page 9 of 21

Real-time Process Data Monitoring

CleanWhite

Classic

Clever

PDV-RPM_83.docx

Version: 1.0.23049

Page 10 of 21

Real-time Process Data Monitoring

DarkNight

iStyle

Retro

PDV-RPM_83.docx

Version: 1.0.23049

Page 11 of 21

Real-time Process Data Monitoring

ShiningDark

Smart

White

Layout

Display on AIP and MOC

PDV-RPM_83.docx

Version: 1.0.23049

Page 12 of 21

Real-time Process Data Monitoring

CleanWhite

Classic

Clever

PDV-RPM_83.docx

Version: 1.0.23049

Page 13 of 21

Real-time Process Data Monitoring

DarkNight

iStyle

Retro

PDV-RPM_83.docx

Version: 1.0.23049

Page 14 of 21

Real-time Process Data Monitoring

ShiningDark

Smart

White

Layout

Display on AIP and MOC

PDV-RPM_83.docx

Version: 1.0.23049

Page 15 of 21

Real-time Process Data Monitoring

CleanWhite

Classic

Clever

PDV-RPM_83.docx

Version: 1.0.23049

Page 16 of 21

Real-time Process Data Monitoring

DarkNight

iStyle

Retro

PDV-RPM_83.docx

Version: 1.0.23049

Page 17 of 21

Real-time Process Data Monitoring

ShiningDark

Smart

White

PDV-RPM_83.docx

Version: 1.0.23049

Page 18 of 21

Real-time Process Data Monitoring

3  PDV Online Visualization: MQTT

Overview

The  PDV  online  visualization  is  based  on  data  provided  by  the  visualization  client  using  the  MQTT.

MQTT  is  a  client  server  protocol.    Clients  send  messages  to  the  server  ("MQTT  broker")  with  a  topic,

which  classifies  the  message  hierarchically.  The  clients  can  subscribe  to  these  topics  and  the  MQTT

broker then forwards messages with the topic to the corresponding clients (subscribers).

A message always consists of a topic and the message content (payload).

The  PDV  online  visualization  clients  available  in  the  HYDRA  standard  automatically  subscribe  to  the

relevant topics and display the process values provided by the MQTT broker.

Implementation notes

  You use the function package if the following applies to you:

You want to receive and display process data in other tools.

Integration and requirements

This function can only be used if the MQTT broker is set up.

The  PCC  (PDV  Blade)  of  the  collection  client  provides  the  data  for  the  online  visualization.    All  data  of

those  process  parameters  are  transmitted  to  the  MQTT  broker  for  online  visualization.  This  setting  is

made for each characteristic in the PDV data collection rule.

Process  data  collected  with  the  aid  of  a  web  service  (REST  interface)  are  not  automatically

provided to the online visualization via MQTT.

If there is a requirement to provide this data also via MQTT, the collection client  must send the

data to the MQTT broker at the same time as to the web service.

Topic

In  this  context  a  topic  stands  for  a  process  parameter  which  is  transmitted  to  the  MQTT  broker  by  the

collection component.

Topic characters

  Only ASCII characters (avoid non-printable characters)

  Reserved, not allowed characters:

o  Space bar

PDV-RPM_83.docx

Version: 1.0.23049

Page 19 of 21

Real-time Process Data Monitoring

o  Wildcards: + #

o  Hierarchy separators: /

o  System information: $SYS

Topic:

mv/pp/<workplace>/<process parameter>

Topic

Mv

Pp

Value

mv

Description/processing

Fixed value

Abbreviation for measured value

pp

Fixed value

Abbreviation for process parameter

<workplace>

MNR-100

Machine number (URL – encoded)

<process parameter>  Temperature

Process parameter (URL encoded)

Note: max. 50 characters

Example MPDV:

Process parameter „Test10“that was collected on machine MDE-100:

Topic

URL – encoded

mv/pp/MDE-100/temperature

mv/pp/MDE-100/temperature

/Payload

The payload (message content) is in form of a JSON document.

Example payload:

{
  "type": "mv",
  "ts": "2016-08-16T02:00:00.000Z",
  "id": 101,
  "source": "PCC-10",
  "data":
  {
    "wpl": "MDE-100",
    "id": 1,
    "unit": "°C",
    "name": "Temperature 1",
    "abbr": "Temp",
    "tvalue": 40.0,
    "value": 25.5,
    "max": 120.0,
    "min": 5.0,
    "ul1": 90.0,
    "ul2": 70.0,
    "ll2": 30.5,
    "ll1": 13.0,
    "ts": "2016-08-16T02:00:00.000Z"
  }
}

Structure of the JSON document

PDV-RPM_83.docx

Version: 1.0.23049

Page 20 of 21

Real-time Process Data Monitoring

Attribute

Value

type

Mv

Type

string

Description

Fixed value „mv“ 
measured value

ts

id

2016-08-
16T02:00:00.000Z

timestamp

Time  stamp  for  messages
(UTC)

1

int

Message ID

Mandatory
fields

X

X

source

PCC-10

data

string

object

Data object

Continuous message ID
starting with 1

Sender of the message

Message object

X

The data object "data" contains the data of the collected process parameter to be visualized.

Mandatory
fields

X

X

X

Attribute

Example

Type

Description

wpl

id

unit

MDE-100

1

°C

name

Temperature S1

abbr

temp.

tvalue

40.0

max

min

ul1

ul2

120.0

5.0

90.0

70.0

string

int

string

string

string

Machine number

Channel ID or visualization
position

Unit

Process parameter ID

Characteristic name

decimal

Target value

decimal

Upper PL

decimal

Lower PL

decimal

Upper PAL

decimal

Upper TL

value

23.45

decimal

Current measured value

X

ll1

ll2

ts

13.0

30.0

decimal

Lower PAL

decimal

Lower TL

2016-08-
16T02:00:00.000Z

timestamp

PDV 8.3: time stamp of the
measured value in ISO8601
format (UTC)
PDV 8.2: time stamp in local
time of the collection client

X

PDV-RPM_83.docx

Version: 1.0.23049

Page 21 of 21

