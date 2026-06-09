Station Andon Board: Layout Editor

1  Station Andon Board: Layout Editor

Overview

Menu

Production facility/Resource management  Current information  Station
Andon Board

Transaction code

stab

Function authorization

stab.editor

The editor is only available in English.

Purpose

The layout editor of the Station Andon Board allows you to design individual layouts visualizing any unit of

the production line.

Integration

Use  the  messaging  protocol  MQTT  to  provide  the  MES-Weaver  and  MOC  with  data  from  the  Dynamic

MES-Weaver (DMW).

Requirements

You must configure MQTT communication in order to use the Station Andon Board. The required steps are

described here.

General information on the layout editor

The layout editor has the following basic structure:

MOC_StationAndonEditor.docx

Version: 1.2.18468

Page 1 of 7

Station Andon Board: Layout Editor

Pane (number)

Name

Purpose

1

2

3

4

Ribbon

The  ribbon  includes  functions  to  open  and  store  layouts.

Additionally, you can use the given formatting functions to

adjust the shapes (ready-made drawing objects) according

to your requirements.

Shapes Panel

The shapes panel provides diverse shapes. You can drag

and drop these shapes on the canvas.

Canvas

The  canvas  is  the  surface  where  you  design  the  layout

using shapes and connectors.

Properties Panel

The properties panel includes an object's properties. These

properties vary depending on the object.

The panel shows the properties of the selected object.

You can change the properties to some extent.

Find further information on the layout editor here (in English).

MOC_StationAndonEditor.docx

Version: 1.2.18468

Page 2 of 7

Station Andon Board: Layout Editor

MQTT connection

Use the MQTT messaging protocol to visualize DMW data in a timely manner. Use corresponding shapes

to assign layout elements as well as topics and values.

The MQTT connection is also enabled in the layout editor. The layout editor also shows changed MQTT

items, which facilitates layout design.

MPDV shapes: general

There are special shapes for the Station Andon Board. You can find these shapes in the "MPDV Shapes"

section of the shapes panel. Each shape has specific properties.

Cycle Shape

The cycle shape is a special shape to show the actual cycle of a machine including colored visualization.

Maintain the following properties to use the cycle shape:

Property

Meaning

Example

Appearance  Content

MQTT  communication

identifies  and

assigns  the  content,  name  and/or  field

contents.

MQTT

communication

overwrites any manually entered values.

Appearance  MinValue_Green

The color green indicates values greater

than this value.

Appearance  MinValue_Yellow

The color yellow indicates values greater

than

this

value  and

less

than

MinValue_Green.

The color red indicates values less than

MinValue_Yellow.

MQTT  Binding  Active

Enables  MQTT  communication  for  this

shape.

Must be set to "True" if the shape should

show data received via MQTT.

MQTT  Binding  Topic

Subscribed MQTT topic

MOC_StationAndonEditor.docx

Version: 1.2.18468

Page 3 of 7

Station Andon Board: Layout Editor

Property

Meaning

Example

MQTT  Binding  Value

Value to be visualized.

dmc.test.item

Dynamic Text Item Shape

The dynamic text item shape allows you to show any text from the data provided via MQTT. Maintain the

following properties to use the dynamic text item shape:

Property

Meaning

Example

Appearance  Content

MQTT  communication

identifies  and

assigns  the  content,  name  and/or  field

contents.

MQTT

communication

overwrites any manually entered values.

MQTT  Binding  Active

Enables  MQTT  communication  for  this

shape.

Must be set to "True" if the shape should

show data received via MQTT.

MQTT  Binding  Topic

Subscribed MQTT topic

MQTT  Binding  Value

Value to be visualized.

dmc.test.item

Element Container Shape

Use the element container shape to group single shapes. This facilitates positioning of related shapes on

the canvas.

If you integrate MQTT-compatible shapes in the element container shape, you must use MPDV's

element container shape. As this shape is compatible with MQTT communication.

FPY Item Shape

Like the cycle shape, the FPY item shape has been designed for the display and colored visualization of a

specific value, i.e. in this case the first pass yield KPI (FPY). Data is displayed in percent.

Maintain the following properties to use the FPY item shape:

MOC_StationAndonEditor.docx

Version: 1.2.18468

Page 4 of 7

Station Andon Board: Layout Editor

Property

Meaning

Example

Appearance  Content

MQTT  communication

identifies  and

assigns  the  content,  name  and/or  field

contents.

MQTT

communication

overwrites any manually entered values.

Appearance  MinValue_Green

The color green indicates values greater

than this value.

Appearance  MinValue_Yellow

The color yellow indicates values greater

than

this

value  and

less

than

MinValue_Green.

The color red indicates values less than

MinValue_Yellow.

MQTT  Binding  Active

Enables  MQTT  communication  for  this

shape.

Must be set to "True" if the shape should

show data received via MQTT.

MQTT  Binding  Topic

Subscribed MQTT topic

Machine Overview Shape

The machine overview shape highlights the machine status in color. Unlike the machine state shape, the

machine overview shape also includes the workplace name as a static value.

Maintain the following properties to use the machine overview shape:

Property

Meaning

Example

Appearance  Content

MQTT  communication

identifies  and

assigns  the  content,  name  and/or  field

contents.

MQTT  Binding  Active

Enables  MQTT  communication  for  this

shape.

MOC_StationAndonEditor.docx

Version: 1.2.18468

Page 5 of 7

Station Andon Board: Layout Editor

Property

Meaning

Example

Must be set to "True" if the shape should

show data received via MQTT.

MQTT  Binding  Topic

Subscribed MQTT topic

The  application  highlights  machine  statuses  in  the  colors  specified  in  the  application  Machines  /

Workplaces:

Light green

Status with RPA (resource performance account) 11 (usually “production")

Blue

Red

Gray

Status with RPA 7 (usually "setup")

Status = 30000 (usually "not assigned")

Status = 20000 or status with RPA 12 (usually "break“/“no shift“)

Yellow

Status < 10000 and RPA <> [11] and RPA <> 7

Machine State Shape

The machine state shape displays the machine status in color and as a text.

Property

Meaning

Example

Appearance  Content

MQTT  communication

identifies  and

assigns  the  content,  name  and/or  field

contents.

MQTT

communication

overwrites any manually entered values.

MQTT  Binding  Active

Enables  MQTT  communication  for  this

shape.

Must be set to "True" if the shape should

show data received via MQTT.

MQTT  Binding  Topic

Subscribed MQTT topic

Static Text Item Shape

The static text item shape allows you to show static text in the layout. Maintain the following properties to

use the static text item shape:

MOC_StationAndonEditor.docx

Version: 1.2.18468

Page 6 of 7

Station Andon Board: Layout Editor

Property

Meaning

Example

Appearance  Content

Text to be displayed.

Hello

Specify background image

You can define a background image for the layout.

Property

Meaning

Example

Other  BackgroundImagePath

Path to the background image.

\\win2008-

13\Hydra5\test_eke\

Hallenlayout.png

MOC_StationAndonEditor.docx

Version: 1.2.18468

Page 7 of 7

