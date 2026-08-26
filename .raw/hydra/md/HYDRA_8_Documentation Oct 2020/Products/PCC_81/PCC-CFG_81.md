Manual

PCC Configuration Manager
PCC-CFG 8.1

Version 1.0.23049

Last changed on: 02.09.2020

PCC Configuration Manager

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

PCC-CFG_81.docx

Version: 1.0.23049

Page 2 of 34

PCC Configuration Manager

Contents

1  PCC Configuration Manager ........................................................................ 4

2  PCC Configuration Manager ........................................................................ 6

PCC-CFG_81.docx

Version: 1.0.23049

Page 3 of 34

PCC Configuration Manager

1  PCC Configuration Manager

Overview

Purpose

The PCC Configuration Manager connects the logical HYDRA configuration with physical communication

partners in the shop floor. The HYDRA data collection server PCC (Process Communication Controller)

links  both.  The  PCC  Configuration  Manager  (PCC-CFG)  creates,  manages  and  maintains  PCC

configurations files and provides the HYDRA data collection server (PCC) with these files.

Implementation notes

The PCC Configuration Manager should be used if you want to establish a connection between the MES

and  the machines/controls  using the Process Communication Controller (PCC).  The PCC  Configuration

Manager facilitates configuration and management of the connection.

Integration

The PCC Configuration Manager uses HYDRA master data relating to terminal and channel assignments.

Based on this data, you can create, manage and maintain required PCC configurations.

You can use PCC configurations with the following HYDRA modules as part of Manufacturing Control:

  MDE: machine data

  DNC: setting data and NC programs

  EMG: energy management

  PDV: process data

You can use PCC configurations for the following PCC operating modes:

  Stand-alone PCC

  PCC with AIP2 (combined operation)

  PCC with AIP (embedded operation)

You can use PCC configurations with the following PCC drivers:

  OPC-UA

  OPC-DA

  PCC-E63

  PCC-DIF

  DNC840D

PCC-CFG_81.docx

Version: 1.0.23049

Page 4 of 34

PCC Configuration Manager

  DNCFTP

  DNCFICPY

  DNCDR

Features

  Distinct  generation  and  management  of  different  PCC  INI  file  configurations  including  status

management (released, blocked) for each PCC configuration.

  Graphic channel mapping between HYDRA and PLC signals

  Specific distribution mechanisms transferring PCC INI file configurations for each terminal

  Syntax and validation check for all active key fields in INI file configurations

PCC-CFG_81.docx

Version: 1.0.23049

Page 5 of 34

PCC Configuration Manager

2  PCC Configuration Manager

Overview

Menu

System administration  Terminals  PCC Configuration Manager

Transaction code

pcccfg

Application

PCC Configuration Manager

Function authorization

pcccfg*

Purpose

PCC  configurations  connect  logical  HYDRA  configurations  with  physical  communication  partners  in  the

shop floor. The HYDRA data collection server PCC (Process Communication Controller) links both. The

PCC  Configuration  Manager  (PCC-CFG)  provides  the  HYDRA  data  collection  server  (PCC)  with  all

functions required to create, manage and maintain PCC configuration files.

Integration

The PCC Configuration Manager uses HYDRA master data relating to terminal and channel assignments.

Based on this data, you can create, manage and maintain required PCC configurations.

You can use PCC configurations with the following HYDRA modules as part of Manufacturing Control:

PCC-CFG_81.docx

Version: 1.0.23049

Page 6 of 34

PCC Configuration Manager

  MDE: machine data

  DNC: setting data and NC programs

  EMG: energy management

  PDV: process data

You can use PCC configurations for the following PCC operating modes:

  Stand-alone PCC

  PCC with AIP2 (combined operation)

  PCC with AIP (embedded operation)

You can use PCC configurations with the following PCC drivers:

  OPC-UA

  OPC-DA

  PCC-E63

  PCC-DIF

  DNC840D

  DNCFTP

  DNCFICPY

  DNCDR

Requirements

  Version: PCC.exe in version 7.2.0.0 or higher must be used.

  Runtime components: Microsoft Visual C++ libraries must be installed in the operating system. You

can obtain these libraries free of charge via Microsoft.

(Visual C++ Redistributable Packages Visual Studio 2013 for 32-bit Windows operating systems).

  HYDRA server paths: The following paths must be available for PCC configuration files and the

PCC data model: PCCCONF and PCCMODEL

Field description: toolbar

The application includes two toolbars:

"Home" and "Extras"

PCC-CFG_81.docx

Version: 1.0.23049

Page 7 of 34

PCC Configuration Manager

Depending on the context, the "home" bar shows all applications as buttons. The buttons are distributed

among three submenus:

"PCC configuration“, "Shop floor connectivity“ and "Distributor“

The "extras" bar includes a button starting the F1 application help.

PCC-CFG_81.docx

Version: 1.0.23049

Page 8 of 34

PCC Configuration Manager

Field description: PCC configuration

The submenu "PCC configuration" consists of four buttons:

"PCC wizard", "Edit PCC configuration", "Delete PCC configuration" and "Configure HYDRA channels"

Field description: shop floor connectivity

The submenu "shop floor connectivity" consists of three buttons:

"Machine connection editor", "Channel mapping" and "Discard machine settings"

Field description: distributor

The submenu "distributor" consists of two buttons:

"Export configuration" and "Deploy configuration"

PCC-CFG_81.docx

Version: 1.0.23049

Page 9 of 34

PCC Configuration Manager

Field description: terminal assignment

The tabular view of "terminal assignments" provides an overview of already existing terminal assignments.

You can use these assignments to create, view and manage PCC configurations. You can only select one

terminal assignment at a time. The selected terminal assignment represents the distinct relation between

a terminal number and a machine ID. The data displayed in the grid can be sorted and matches the set

filters.  The  columns  "HYDRA  terminal  number",  "machine  ID",  "machine  name",  "resource  type"  and

"configured" can be filtered.

PCC-CFG_81.docx

Version: 1.0.23049

Page 10 of 34

PCC Configuration Manager

The right-hand side of the main screen shows different pieces of information deriving from HYDRA master

data for terminal configurations, channel assignments and PCC configurations. The display is divided into

the following tabs:

"Configuration details", "Drivers" and "Routing"

The "configuration details" tab includes three sections "terminal settings", "configured HYDRA operations"

and "configured channels".

The section "terminal settings" provides two drop-down menus:

"Identification" and "Technical"

The displayed information is based on the selected terminal configuration and managed as well as collected

in the MOC application "terminal configuration".

PCC-CFG_81.docx

Version: 1.0.23049

Page 11 of 34

The section "configured HYDRA operations" shows the HYDRA modules used with the PCC wizard for the

selected HYDRA terminal.

PCC Configuration Manager

The section "configured channels" shows the HYDRA channels assigned to a machine. This assignment

depends on the selected terminal assignment and relates to the machine.

The "driver" tab includes the "PCC driver instances" and shows all PCC driver instances and their elements

referring to the selected terminal assignment.

The "routing" tab includes the "routing for machine" section and indicates the connected elements between

machine and HYDRA. The function "channel mapping" establishes these connections.

PCC-CFG_81.docx

Version: 1.0.23049

Page 12 of 34

PCC Configuration Manager

Description of the function: PCC wizard

You  can  start  a  PCC  configuration  by  clicking  the  "PCC  wizard"  button.  Select  the  required  terminal

assignment from the list of "terminal assignments".

A new  window  opens, once  you  have selected the required terminal assignment and clicked the button

"PCC wizard". The window caption shows the selected HYDRA terminal number for which the PCC wizard

is supposed to prepare configurations. (Example: TNR126).

The  wizard  starts  and  goes  to  the  next  step  by  clicking  "Next".  You  can  cancel  the  wizard  if  you  click

"Cancel".

PCC-CFG_81.docx

Version: 1.0.23049

Page 13 of 34

In the next window you can select the required basic configuration for the relevant HYDRA module:

PCC Configuration Manager

"MDE“, "DNC“, "EMG“ or "PDV“

Choose the required radio button.

If you click "Next", you proceed to the next step. If you click "Back", you return to the previous window. You

cancel the wizard by clicking "Cancel".

This document does not deal with the single HYDRA modules and their fields of application.

PCC-CFG_81.docx

Version: 1.0.23049

Page 14 of 34

PCC Configuration Manager

In the next window you can select the required HYDRA-PCC operating mode:

"Stand-alone PCC", "PCC with AIP2 (combined operation)" or "PCC with AIP (embedded operation)"

Subject to the selected HYDRA module, different selection options are shown.

If you click "Next", you proceed to the next step. If you click "Back", you return to the previous window. You

cancel the wizard by clicking "Cancel".

The  product  documentation  MBL_HYD-PCC  deals  with  the  different  PCC  operating  modes  and  their

specific fields of operation. This document does not provide further information.

PCC-CFG_81.docx

Version: 1.0.23049

Page 15 of 34

The next window shows the supported PCC driver components. The driver catalog includes different PCC

driver types. The selection of supported PCC drivers is extended or restricted, depending on the previously

selected HYDRA module(s). Multiple selections are supported.

PCC Configuration Manager

If you click "Next", you proceed to the next step. If you click "Back", you return to the previous window. You

cancel the wizard by clicking "Cancel".

The  selection  of  drivers  depends  on  the  PCC  connection  options  defined  in  the  CID  (Customer

Implementation Document) and must be implemented for each specific project and machine.

PCC-CFG_81.docx

Version: 1.0.23049

Page 16 of 34

Enter the connection data for the HYDRA server in the next window that opens. Enter the IP address and

the input port of the HYDRA server.

PCC Configuration Manager

If you click "Next", you proceed to the next step. If you click "Back", you return to the previous window. You

cancel the wizard by clicking "Cancel".

PCC-CFG_81.docx

Version: 1.0.23049

Page 17 of 34

The last window shows an overview of all configurations made.

PCC Configuration Manager

You can complete the wizard and the PCC basic configuration by clicking "Finish". If you click "Back", you

return to the previous window. You cancel the wizard by clicking "Cancel".

PCC-CFG_81.docx

Version: 1.0.23049

Page 18 of 34

PCC Configuration Manager

Description of the function: edit PCC configuration

You can view or edit an existing HYDRA PCC configuration by clicking the button "edit PCC configuration".

The column "configured" in the window "terminal assignment" indicates if a HYDRA PCC configuration is

available.

A  new  window  (PCC  terminal  configuration:  terminal  number)  opens,  if  you  click  the  button  "edit  PCC

configuration".

PCC-CFG_81.docx

Version: 1.0.23049

Page 19 of 34

The top left area shows the selected PCC mode. The bottom left area shows the enabled and released

PCC drivers. The right-hand side of the window is divided into two parts: The first part shows the PCCDLL

settings. The second part shows the PCC settings.

PCC Configuration Manager

You can still change the PCC mode subsequently. Modifications are saved if you click the "OK" button. If

you click "Cancel", you exit the window without saving the changes.

If you select a PCC driver and click the button "configure PCC driver", you can view or change the PCC

driver settings in a new window.

PCC-CFG_81.docx

Version: 1.0.23049

Page 20 of 34

PCC Configuration Manager

You can add new PCC driver settings (INI sections, keys and values). You can remove manually added

PCC  driver  settings.  Default  PCC  driver  settings  cannot  be  deleted  but  only  enabled  or  disabled.  The

applicable value range for default PCC driver settings is either specified or can be found in the "description"

for PCC driver settings. Modifications are saved if you click the "OK" button. If you click "Cancel", you exit

the window without saving the changes.

Refer to the corresponding PCC driver documentation for further information on PCC driver settings.

The tab "PCCDLL parameters" shows all default PCCDLL settings that can be changed within their valid

range of values.

PCC-CFG_81.docx

Version: 1.0.23049

Page 21 of 34

PCC Configuration Manager

You  can  add  new  PCCDLL  settings  (INI  sections,  keys  and  values).  You  can  remove  manually  added

PCCDLL settings. Default PCCDLL settings cannot be deleted but only enabled or disabled. The applicable

value range for default PCCDLL settings is either specified or can be found in the "description" for PCCDLL

settings. Modifications are  saved  if  you click the "OK" button. If  you click "Cancel",  you exit  the  window

without saving the changes.

The tab "PCC parameters" shows all default PCC settings that can be changed within their valid range of

values.

PCC-CFG_81.docx

Version: 1.0.23049

Page 22 of 34

PCC Configuration Manager

You can  add  new  PCC settings (INI sections, keys and values).  You can remove manually added  PCC

settings. Default PCC settings cannot be deleted but only enabled or disabled. The applicable value range

for  default  PCC  settings  is  either  specified  or  can  be  found  in  the  "description"  for  PCC  settings.

Modifications are saved if you click the "OK" button. If you click "Cancel", you exit the window without saving

the changes.

For  further  information  on  the  PCCDLL  and  PCC  settings  refer  to  the  PCC  product  documentation  and

related PCC driver documents.

Description of the function: delete PCC configuration

You can delete an existing HYDRA PCC configuration, if you use the function "delete PCC configuration".

The HYDRA master data and assignments remain.

PCC-CFG_81.docx

Version: 1.0.23049

Page 23 of 34

PCC Configuration Manager

You must confirm if you really want to delete the HYDRA PCC configuration by choosing "Yes" or "No".

PCC-CFG_81.docx

Version: 1.0.23049

Page 24 of 34

PCC Configuration Manager

Description of the function: configure HYDRA channels

A new window opens (channels), once you have selected a terminal assignment and clicked the button

"HYDRA channels". If the machine (resource) is assigned to "PDV logical channels" or "counters", they will

be shown (channel type: counter and measurement). If counter channels are available, cycle channels will

be  generated  automatically  (channel  type:  cycle  time).  The  channel  type  "machine  state"  is  set  up

automatically in HYDRA (MSTAT).

You may add and assign additional HYDRA channels. The following channel types are provided: digital

input (I), digital output (O), trigger (T) and value (V).

To add a channel, you must complete all fields and click the "add channel" button. You can delete a channel

by clicking "remove channel".

PCC-CFG_81.docx

Version: 1.0.23049

Page 25 of 34

PCC Configuration Manager

Description of the function: machine connection editor

A  new  window  (machine  details)  opens,  if  you  click  the  button  "machine  connection  editor".  You  can

manage the PCC driver instances in this window. You can add, modify or delete PCC drivers. PCC drivers

are displayed if they were selected previously in the PCC wizard or added using the function "edit PCC

configuration".

PCC-CFG_81.docx

Version: 1.0.23049

Page 26 of 34

PCC Configuration Manager

Select the required PCC driver from the selection menu and click "add" in order to add a new PCC driver

instance.

You  must  enter  a  name  in  the  input  field  "new  instance  name".  The  entered  name  is  used  in  the  PCC

driver's  log  file  generated  by  this  driver  instance.  A  new  window  opens  by  clicking  "OK".  Structure  and

contents of the new window vary with each specific driver.

PCC-CFG_81.docx

Version: 1.0.23049

Page 27 of 34

PCC Configuration Manager

If the PCC-OPC-UA driver (screenshot above) is used, you must enter the OPC UA server connection data

including security settings. These connection settings are specific for each project. Provided that the OPC-

UA server can be reached and correct OPC-UA server connection settings have been entered, you can

browse the configured OPC-UA server and select node IDs for channel mapping. You can start browsing

by clicking "browse driver (online)". A new window opens. The new window "browse:" shows all node IDs

available  for  the  selected  OPC-UA  server.  If  required,  you  can  select  these  IDs.  Multiple  selections  are

supported.  By  clicking  "select",  you  can  define  the  selected  node  IDs  for  channel  mapping  (screenshot

below).

PCC-CFG_81.docx

Version: 1.0.23049

Page 28 of 34

PCC Configuration Manager

The "browse:" window is closed after clicking "OK". The right-hand side of the window "configure PCC driver

instance" shows the selected node IDs.

PCC-CFG_81.docx

Version: 1.0.23049

Page 29 of 34

PCC Configuration Manager

If the OPC-UA server cannot be reached from this application, you can also browse the OPC-UA server

offline. For this purpose, the HYDRA server provides a tool based on command lines. This tool must be

started from a PC that can reach the OPC-UA server. This tool specifically connects to defined node IDs

and stores data in an XML file after browsing. The XML file can be imported if you click the "browse file

(offline)" button. Then all node IDs included in the XML file are available for channel mapping. You can also

manually add or subsequently remove machine channels. To do so, the channel name must be known. By

clicking "OK", the window closes and the settings made are accepted. If you click "Cancel", you exit the

window without saving the changes.

The "machine details" window must be closed by clicking "OK".

PCC-CFG_81.docx

Version: 1.0.23049

Page 30 of 34

PCC Configuration Manager

Description of the function: channel mapping

You can connect the machine channels with the HYDRA channels, once the required machine channels

have been imported in the PCC Configuration Manager using the Machine Connection Editor. To do so,

choose the required terminal assignment and click the button "channel mapping". A new window "channel

routing" opens.

First you have to select the corresponding machine channels and HYDRA channels. Then you can connect

the two channels by clicking the "link" button. The top left window shows the machine channels. The top

right  window  shows  the  HYDRA  channels.  The  lower  section  of  the  screen  shows  established  channel

connections. The "auto-link channels" option allows you to connect all channels with matching names.

PCC-CFG_81.docx

Version: 1.0.23049

Page 31 of 34

PCC Configuration Manager

Rows highlighted in gray indicate channels that have already been routed. Rows highlighted in green show

most recently routed channels.

You can exit the window by clicking "OK", once you have generated all required routings. The connections

are saved. If you click "Cancel", routings will not be saved.

PCC-CFG_81.docx

Version: 1.0.23049

Page 32 of 34

PCC Configuration Manager

Description of the function: export configuration

Click the "export configuration" button in order to export a HYDRA PCC configuration. Consequently, you

can generate all configuration files relevant to PCC and store them in one folder.

Description of the function: deploy configuration

If you click the "deploy configuration" button, all configuration files relevant to PCC are specifically exported

and saved. In contrast to the "export" function, this option stores the PCC configuration files in a specified

HYDRA server path.

PCC-CFG_81.docx

Version: 1.0.23049

Page 33 of 34

PCC Configuration Manager

A subfolder is created in this path. The folder name starts with "tnr_" and ends with the terminal number for

which a PCC configuration has been performed.

A  separate  folder  is  available  for  each  HYDRA  PCC/AIP  terminal  with  a  PCC  configuration.  This  folder

includes  the  PCC  configurations  for  each  terminal  number  and  makes  configurations  available  to  the

HYDRA PCC.

PCC-CFG_81.docx

Version: 1.0.23049

Page 34 of 34

