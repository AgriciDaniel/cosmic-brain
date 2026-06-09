Manual

Visualization of Energy
Demand
HLS-EBV 8.2

Version 1.0.23232

Last changed on: 15.09.2020

Visualization of Energy Demand

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

HLS-EBV_82.docx

Version: 1.0.23232

Page 2 of 9

Visualization of Energy Demand

Contents

1  Planning Strategy: Energy Demand ............................................................. 4

2  ECF groups .................................................................................................. 5

3  ECF Group Assignment ............................................................................... 8

HLS-EBV_82.docx

Version: 1.0.23232

Page 3 of 9

Visualization of Energy Demand

1  Planning Strategy: Energy Demand

Purpose

Application package extending the graphical planning in the HYDRA Shop Floor Scheduling module with

planning strategies for energy requirements. These strategies enable you to plan production orders in view

of  an  optimal  energy  demand.  The  chart  of  the  HYDRA  Shop  Floor  Scheduling  module  totals  the

consumptions of the planned operations for the materials of the ECF groups and a specific point in time.

You can also show an upper limit.

Use the function package if:



you want to view information on energy consumption in the HYDRA Shop Floor Scheduling module.

Integration

In order to use this function package, you also have to use the Energy Management and the HYDRA Shop

Floor Scheduling module.

Features

Functions to edit ECF  groups, to assign material types to defined  ECF groups and to  visualize material

types (e.g. energy sources) in the HYDRA Shop Floor Scheduling module.

  Use this function to create or modify ECF groups in the system.

  Use this function to assign material types to your configured ECF groups.

  Use  this  function  to  visualize  material  types  (e.g.  energy  sources)  in  the  HYDRA  Shop  Floor

Scheduling module.

HLS-EBV_82.docx

Version: 1.0.23232

Page 4 of 9

Visualization of Energy Demand

2  ECF groups

Overview

HYDRA menu

Master data  Production control  ECF groups

FEDRA menu

Advanced Resource Planning  Master data  ECF groups

Transaction code

ecfgrp

Function authorization

ecfgrp

This document describes the application "ECF groups" of the client.

Purpose

You use this function to create and modify ECF groups in the system.

Integration

ECF groups are used to show energy requirements of operations in the Shop Floor Scheduling.

Selection criteria

The application provides the following selection criteria:

ECF group

Uses the group name to select the ECF group.

Upper limit value

Uses the upper limit value to select the ECF group.

Modified by

Uses the person who last modified the data record to select the ECF group.

Consumption during setup time

Uses the setting Consumption during setup time to select the ECF group. In tri-state mode, all groups

are selected.

Consumption during processing time

Uses the setting Consumption during processing time to select the ECF group. In tri-state mode, all

groups are selected.

HLS-EBV_82.docx

Version: 1.0.23232

Page 5 of 9

Visualization of Energy Demand

Field descriptions

ECF group

Name of the ECF group

Consumption during setup time

This field specifies if material types assigned to this ECF group are consumed during setup.

Consumption during processing time

This field specifies if material types assigned to this ECF group are consumed during processing.

Note: When  you  create  or  change  the  ECF  groups,  at  least  one  of  the  options  "Consumption

during  setup  time"  or  "Consumption  during  processing  time"  must  be  active.  Otherwise  you

cannot create or change a data record.

Description

Use this field to enter a detailed description of the ECF group.

Upper limit value

This field specifies the upper limit value that is displayed for this ECF group in the graphic planning.

The  graphic  planning  integrates  seconds  to  display  the  planned  energy  consumption.  We

recommend to take this into account when you define the upper limit value.

Example (we used large numbers for demonstration purposes)

-  An OP has a target quantity of 1,000 pieces, a processing time of 1:00 hour and an input

quantity of 100 kWh that is stored as a component. In this example, the resulting required

quantity  of  the  OP  is  100,000  kWh  (target  quantity  x  input  quantity).  In  the  graphic

planning, an energy consumption of 27,78 kW is displayed for the OP (required quantity

/ processing time [sec]).

-

In this example, the upper limit value is understood as load limit. If the supplier provides

27,000  kWh  within  a  time  frame  of  15  minutes,  an  average  of  30  kW  is  available  per

second in this time frame (provided quantity / time frame [sec]). Here, you should use 30

kW as upper limit value.

Unit

Unit of the upper limit value

Lower limit value

This field specifies the lower limit value that is displayed for this ECF group in the graphic planning.

Currently, this value is set to 0 and cannot be changed.

Unit

Unit of the lower limit value. The unit cannot be changed.

HLS-EBV_82.docx

Version: 1.0.23232

Page 6 of 9

Visualization of Energy Demand

Modified by

Person who last modified the ECF group

Modified on

Point in time of the last change of this ECF group

Toolbar - tab Main page

  Insert

Opens the dialog to add an ECF group

  Copy

Opens the dialog to copy an ECF group

  Edit

Opens the dialog to edit an ECF group

  Delete

Deletes an ECF group

HLS-EBV_82.docx

Version: 1.0.23232

Page 7 of 9

Visualization of Energy Demand

3  ECF Group Assignment

Overview

HYDRA menu

Master data  Production control  ECF group assignment

FEDRA menu

Advanced Resource Planning  Master data  ECF group assignment

Transaction code

ecfgrpas

Function authorization

ecfgrpas

This document describes the application "ECF group assignment" on the client.

Purpose

You use the function to assign material types to your configured ECF groups.

Integration

In order to visualize the expected energy consumption in the graphic planning, you must assign the relevant

material types of the components entered for the operations to ECF groups.

Prerequisite

You have configured the relevant material types and ECF groups in the master data.

Selection criteria

The following selection criteria are available in the application:

ECF group

Selection according to the selected ECF group

Material type

Selection according to the selected material type

Field descriptions

ECF group

Name of the ECF group

Several material types can be assigned to one ECF group.

HLS-EBV_82.docx

Version: 1.0.23232

Page 8 of 9

Visualization of Energy Demand

Description

More detailed description of the ECF group assigned to this group in the application "ECF groups".

Material type

Material type to be assigned to the ECF group.

Each material type may be assigned to a maximum of one ECF group.

For creating and editing a data record, only material types configured in the application "Material

types" are available.

Editor

Last editor of the ECF group assignment.

Last modification

Time of last modification of the ECF group assignment.

Toolbar

General tab

 Insert

Opens the dialog to insert an ECF group assignment.

 Copy

Opens the dialog to copy an ECF group assignment.

 Edit

Opens the dialog to edit an ECF group assignment.

 Delete

Deletes an ECF group assignment.

HLS-EBV_82.docx

Version: 1.0.23232

Page 9 of 9

