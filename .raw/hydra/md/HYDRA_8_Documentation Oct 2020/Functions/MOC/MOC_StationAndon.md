Station Andon Board

1  Station Andon Board

Overview

Menu

Production facility/Resource management  Current information  Station
Andon Board

Transaction code

stab

Function authorization

stab.view (application)

stab.editor for the button "edit layout"

Purpose

Use the Station Andon Board to visualize the status of the production line for management, supervisors

and/or staff working on the production line.

Integration

The Station Andon Board shows up-to-date status information on objects from various HYDRA products:

  DMC:  data  from  the  DMW  (Dynamic  MES  Weaver)  including  machines  (stations)  and  their

statuses.

Requirements

Set up the relevant objects you want to visualize on the Station Andon Board in the system master data.

Layouts specify the visualization of data. Use the layout editor to generate the layouts you want to use in

the Station Andon Board.

Configure the MQTT communication in order to use the Station Andon Board. Required configurations are

described here.

Selection criteria

The application provides the following selection criteria:

Layout

List of available layouts.

The list includes centrally stored data and local user data.

The system uses the path "DMCSTATA" created in the HYDRA path configuration to identify centrally

stored data.

MOC_StationAndon.docx

Version: 1.2.18468

Page 1 of 2

Station Andon Board

Store local user layouts in the directory %APPDATA%\MPDV\MOC\user\StationAndon on the local

PC.

The  list  of  available  layouts  is  created  on  opening  the  application.  Close  and  reopen  the

application if you want to update the list.

Visualization

The selected layout specifies the visualization of data. The layout specifies what data is shown and how.

Use the messaging protocol MQTT to transfer DMW data to the HYDRA-MW and to show this data in the

MOC.

Toolbar

 Editor

Starts the layout editor to change existing or create new layouts.

MOC_StationAndon.docx

Version: 1.2.18468

Page 2 of 2

