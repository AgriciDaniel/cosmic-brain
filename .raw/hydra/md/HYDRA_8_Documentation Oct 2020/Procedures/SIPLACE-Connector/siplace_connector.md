MPDV Mikrolab GmbH

Installation SIPLACE Connector

Subjects/Contents

1  Objectives ....................................................................................................................... 3

2

Installation UPD for the Siplace domaine ..................................................................... 3

3  Workplace/machine configuration HYDRA .................................................................. 3

3.1  Workplace/machine ................................................................................................. 3

3.1.1  Configuration ................................................................................................... 3

3.1.2  Machine status ................................................................................................ 4

3.2  Material buffer and type ........................................................................................... 7

4  Basic configuration for a Siplace connector ................................................................ 8

4.1  Connecting data "Connector" to HYDRA .................................................................. 8

4.2  Configuration of lines and machines ...................................................................... 10

4.3  Assignment of status.............................................................................................. 13

4.4  Transfer of batch data and update ......................................................................... 15

5  Siplace configuration ................................................................................................... 16

5.1  Traceability mode .................................................................................................. 17

5.2  MES order number ................................................................................................ 17

6  Available function tests ............................................................................................... 19

6.1  Transfer of batch data list to the SetupCenter of Siplace ....................................... 19

6.2  Machine status....................................................................................................... 20

6.3  Order logon / interruption ....................................................................................... 21

6.4  Create output batches ............................................................................................ 21

6.5  Traceability data .................................................................................................... 21

siplace_connector.docx

Version: 19.06.20

Page 1/22

MPDV Mikrolab GmbH

siplace_connector.docx

Version: 19.06.20

Page 2/22

MPDV Mikrolab GmbH

1  Objectives

This document describes which configurations are required to successfully connect HYDRA

to a Siplace machine using a Siplace connector.

2

Installation UPD for the Siplace domaine

The update package must be installed using the webservice of the Siplace domain for a

subsequent installation.  Please refer to the installation guide.

3  Workplace/machine configuration HYDRA

3.1  Workplace/machine

A separate workplace/machine must be created in HYDRA for each Siplace line to transfer

data to HYDRA.

3.1.1  Configuration

Request menu

Masterdata-> Workplace/machine-> Workplace

configuration

Transaction code

res

In general, customary regulations/instructions apply to configure workplaces/machines.

The following requirements are mandatory.

Main tab "Resource configuration"

siplace_connector.docx

Version: 19.06.20

Page 3/22

MPDV Mikrolab GmbH

"Workplace configuration" tab

Workplace type -> N (machine)

Workplace category ->E (individual workplace)

Mandatory sequence -> N (deactivated)

Several logged OPs -> N (only one OP can be logged)

Quantities tab

Manual entry of yield -> yes

Posting of yield as cylces -> yes

MDE configuration tab

Type of monitoring -> no monitoring

3.1.2  Machine status

Request menu

Master data -> workplace/machine -> assigning status

Transaction code

mst

In the status assigment the tab for the status change "Manually at the terminal" must be

activated for each status at the Siplace machine

siplace_connector.docx

Version: 19.06.20

Page 4/22

MPDV Mikrolab GmbH

The following statuses are supplied in the standard configuration by the Sidplace adapter.

These statuses must be assigned to HYDRA according to the Sidplace machine.

Status ID

Status text

Comment

1

2

3

4

5

6

7

Production

Sidplace usage "Active"

Waiting

Blocked

Interrupted

Malfunction

Setup

Maintenance

99

General disturbance

30000

Not assigned

Other status numbers/statuses can be defined if one or several status numbers are

assigned.  Please customize the configuration in the Sidplace connector accordingly.

-> File for Sidplace connector config.xml

Example:

<Parameter Name="[Laufend]" Value="1"/>

siplace_connector.docx

Version: 19.06.20

Page 5/22

MPDV Mikrolab GmbH

<Parameter Name="[Wartend]" Value="2"/>

 <Parameter Name="[Blockiert]" Value="3"/>

<Parameter Name="[Unterbrochen]" Value="4"/>

<Parameter Name="[Störung]" Value="5"/>

<Parameter Name="[Rüsten]" Value="6"/>

<Parameter Name="[Wartung]" Value="7"/>

<Parameter Name="[NichtZugeordnet]" Value="30000"/>

Also, you must select in the tab "Plausibitilies" the option "No check".

siplace_connector.docx

Version: 19.06.20

Page 6/22

MPDV Mikrolab GmbH

3.2  Material buffer and type

In order to transfer input batches to the Sidplace line, you must define a material buffer (or

several) in HYDRA.  All batches located in this material buffer with a defined material type

are transferred into the SiplaceSetup Center.

Configuration in the Sidplace connector

-<ComponentConfiguration Name="BatchListGetter">

<Parameter Name="MaterialType" Value="AIRBAG"/>

<Parameter Name="MaterialBuffer" Value="MP_V_50510,MP_N_50500"/>

</ComponentConfiguration>

siplace_connector.docx

Version: 19.06.20

Page 7/22

MPDV Mikrolab GmbH

4  Basic configuration for a Siplace connector

4.1  Connecting data "Connector" to HYDRA

In order for the machine data collector to exchange data to and from HYDRA and to receive

data from the OIB, you must maintain the connecting parameter in the file config.xml.

The file config.xml is stored in the directory of the Siplace connector.

You must store connecting data to the HYDRA server in the file config.xml of the following

section:

<ComponentConfiguration Name="WebServiceConnector"

Class="mpdv.MachineDataCollector.ConnectorPlugin.Hydra.WebServiceConnector">

    <Parameter Name="Host" Value="<IP-Adresse HYDRA Leitrechner>" />

    <Parameter Name="Port" Value="<Port>" />

    <Parameter Name="User" Value="<HYDRA User>" />

    <Parameter Name="Pwd" Value="<Passwort HYDRA User>" />

</ComponentConfiguration>

Example:

<ComponentConfiguration Name="WebServiceConnector"

Class="mpdv.MachineDataCollector.ConnectorPlugin.Hydra.WebServiceConnector">

    <Parameter Name="Host" Value="192.168.94.36" />o+ü+

siplace_connector.docx

Version: 19.06.20

Page 8/22

MPDV Mikrolab GmbH

<Parameter Name="Port" Value="8080" />

<Parameter Name="User" Value="12345" />

<Parameter Name="Pwd" Value="mpdv" />

</ComponentConfiguration>

You must store connecting data to the HYDRA server in this section of the file config.xml.

<ComponentConfiguration Name="SiplaceMonitoringConnector"

Class="mpdv.MachineDataCollector.ConnectorPlugin.Siplace.SiplaceMonitoringConnector">

    <Parameter Name="CallbackEndpoint" Value="http://<IP-Adresse

OIB>:4444/MachineDataCollector.MonitoringEndpoint" />

    <Parameter Name="SubscriptionManagerEndpoint" Value="http:// <IP-Adresse

OIB>:1405/Asm.As.Oib.WS.Eventing.Services/SubscriptionManager" />

</ComponentConfiguration>

<ComponentConfiguration Name="SetupCenterConnector"

Class="mpdv.MachineDataCollector.ConnectorPlugin.Siplace.SetupCenterConnector">

    <Parameter Name="SetupCenterEndpoint" Value="http:// <IP-Adresse

OIB>:1405/Asm.As.Oib.SetupCenter/SiplaceSetupCenter" />

  </ComponentConfiguration>

<ComponentConfiguration Name="SiplaceTracingConnector"

Class="mpdv.MachineDataCollector.ConnectorPlugin.Siplace.SiplaceTracingConnector">

    <Parameter Name="SubscriptionManagerEndpoint" Value="http:// <IP-Adresse

OIB>:1405/Asm.As.Oib.WS.Eventing.Services/SubscriptionManager" />

  </ComponentConfiguration>

Example:

siplace_connector.docx

Version: 19.06.20

Page 9/22

MPDV Mikrolab GmbH

  <ComponentConfiguration Name="SiplaceMonitoringConnector"

Class="mpdv.MachineDataCollector.ConnectorPlugin.Siplace.SiplaceMonitoringConnector">

    <Parameter Name="CallbackEndpoint"

Value="http://192.168.62.20:4444/MachineDataCollector.MonitoringEndpoint" />

    <Parameter Name="SubscriptionManagerEndpoint"

Value="http://192.168.62.20:1405/Asm.As.Oib.WS.Eventing.Services/SubscriptionManager" />

  </ComponentConfiguration>

  <ComponentConfiguration Name="SetupCenterConnector"

Class="mpdv.MachineDataCollector.ConnectorPlugin.Siplace.SetupCenterConnector">

    <Parameter Name="SetupCenterEndpoint"

Value="http://192.168.62.20:1405/Asm.As.Oib.SetupCenter/SiplaceSetupCenter" />

  </ComponentConfiguration>

  <ComponentConfiguration Name="SiplaceTracingConnector"

Class="mpdv.MachineDataCollector.ConnectorPlugin.Siplace.SiplaceTracingConnector">

    <Parameter Name="SubscriptionManagerEndpoint"

Value="http://192.168.62.20:1405/Asm.As.Oib.WS.Eventing.Services/SubscriptionManager" />

  </ComponentConfiguration>

4.2  Configuration of lines and machines

HYDRA displays each assembly line as a machine of the resource type "MNR".  You must

store essential data in the file config.xml of the connector in order for it to display messages

from stations and lines on "HYDRA" machines.

To do so, you must carry out a component configuration for each assembly line.  The

configuration contains:

Name of the line (within the Siplace software)

    <Parameter Name="LineName" Value="Linie_1" />

Stations assigned to the line

    <Parameter Name="StationList" Value="L1_SX2,L1_X3,L1_SX4,L1_X4" />

siplace_connector.docx

Version: 19.06.20

Page 10/22

MPDV Mikrolab GmbH

  <ComponentConfiguration Name="LineStateMerger1"

Class="mpdv.MachineDataCollector.Core.Components.LineStateMerger">

    <Parameter Name="StatePriority" Value="30000,5,4,6,7,3,2,1" />

    <Parameter Name="LineName" Value="Linie_1" />

    <Parameter Name="StationList" Value="L1_SX2,L1_X3,L1_SX4,L1_X4" />

    <Parameter Name="SuppressUnknownStations" Value="true" />

  </ComponentConfiguration>

Please note:

The parameter "StatePriority" and "SuppressUnknownStations" are part of the configuration to process

statuses.

Please set SuppressUnknownStation with the value=true.  This ensures that unknown status messages

are suppressed and not processed.

The parameter "StatePriority" controls the weighting of statuses in order to generate a status for all

machines. This status derives from individual stations.  The procedure is as follows: Data is displayed in

ascending order by weighting.  The first status number stated has the lowest weighting and the last one

the highest.

The statuses for all machines is a weighting of the status messages from individual stations.  The status

of the station with the highest weighting becomes the status of all machines.

<Parameter Name="StatePriority" Value="30000,5,4,6,7,3,2,1" />

<Parameter Name="SuppressUnknownStations" Value="true" />

Example:

Example of configuration of two lines  (Linie_1 and Linie_2):

siplace_connector.docx

Version: 19.06.20

Page 11/22

MPDV Mikrolab GmbH

  <ComponentConfiguration Name="LineStateMerger1"

Class="mpdv.MachineDataCollector.Core.Components.LineStateMerger">

    <Parameter Name="StatePriority" Value="30000,5,4,6,7,3,2,1" />

    <Parameter Name="LineName" Value="Linie_1" />

    <Parameter Name="StationList" Value="L1_SX2,L1_X3,L1_SX4,L1_X4" />

    <Parameter Name="SuppressUnknownStations" Value="true" />

  </ComponentConfiguration>

  <ComponentConfiguration Name="LineStateMerger2"

Class="mpdv.MachineDataCollector.Core.Components.LineStateMerger">

    <Parameter Name="StatePriority" Value="30000,5,4,6,7,3,2,1" />

    <Parameter Name="LineName" Value="Linie_2" />

    <Parameter Name="StationList" Value="L2_S27_1,L2_S27_2,L2_SX2_3,L2_SX2_4" />

    <Parameter Name="SuppressUnknownStations" Value="true" />

  </ComponentConfiguration>

Assignment of lines for the machines created in HYDRA is done in the following section:

  <ComponentConfiguration Name="MachineNameTranslator"

Class="mpdv.MachineDataCollector.Core.Components.ParameterTranslator">

    <Parameter Name="<Linienname>" Value="<Maschine>" />

  </ComponentConfiguration>

Note: <Line name> refers to the names of the lines in the Siplace software

Example:

Assignment of Linie_1 to HYDRA machine SIPLA1

Assignment of Linie_2 to HYDRA maschine SIPLA2

  <ComponentConfiguration Name="MachineNameTranslator"

Class="mpdv.MachineDataCollector.Core.Components.ParameterTranslator">

    <Parameter Name="[Linie_1]" Value="SIPLA1" />

    <Parameter Name="[Linie_2]" Value="SIPLA2" />

  </ComponentConfiguration>

siplace_connector.docx

Version: 19.06.20

Page 12/22

MPDV Mikrolab GmbH

4.3  Assignment of status

Siplace reports several statuses.  These statuses are assigned to a configured HYDRA

machine status.  Several Siplace statuses can be assigned to one HYDRA status.

Example:

    <Parameter Name="[Stop]" Value="interrupted" />

Explanation: [Stop] is the status of the Siplace line and „Interrupt“ is the assigned status from HYDRA.

Also, a status number is assigned to each HYDRA status.  Status names and numbers must

be identical to the machine status created in HYDRA.

Example:

    <Parameter Name="[Laufend]" Value="1" />

Explanation: [Laufend] is the configured status in HYDRA , and „1“ the status number from HYDRA

If no Siplace status is assigned to a HYDRA status, then "-" must be entered into the

corresponding field value.

Example:

    <Parameter Name="[Holiday]" Value="-" />

Explanation: [Holiday] is the status of the Siplace line and by entering„-“ you can ensure that the status is not

displayed on an existent HYDRA status.  Therefore this status is being ignored.

The assignment is file config.xml in the following section configured:

<ComponentConfiguration Name="MachineStatusTranslator"

Class="mpdv.MachineDataCollector.ConnectorPlugin.Siplace.MachineStatusTranslator">

siplace_connector.docx

Version: 19.06.20

Page 13/22

MPDV Mikrolab GmbH

    <Parameter Name="[Processing]" Value="Laufend" />

    <Parameter Name="[Invalid]" Value="NichtZugeordnet" />

    <Parameter Name="[PCBBegin]" Value="Laufend" />

    <Parameter Name="[PCBBegin2]" Value="Laufend" />

    <Parameter Name="[PCBEnd]" Value="Laufend" />

    <Parameter Name="[PCBEnd2]" Value="Laufend" />

    <Parameter Name="[BreakBegin]" Value="Unterbrochen" />

    <Parameter Name="[EmergencyStop]" Value="Unterbrochen" />

    <Parameter Name="[Air]" Value="Störung" />

    <Parameter Name="[Stop]" Value="Unterbrochen" />

    <Parameter Name="[WaitPCBIn]" Value="Wartend" />

    <Parameter Name="[WaitPCBInside]" Value="Laufend" />

    <Parameter Name="[WaitPCBOut]" Value="Blockiert" />

    <Parameter Name="[WaitData]" Value="Wartend" />

    <Parameter Name="[FiducialError]" Value="Störung" />

    <Parameter Name="[TrackError]" Value="Störung" />

    <Parameter Name="[MachineError]" Value="Störung" />

    <Parameter Name="[TransportError]" Value="Störung" />

    <Parameter Name="[BarcodeError]" Value="Störung" />

    <Parameter Name="[HeadStep]" Value="Unterbrochen" />

    <Parameter Name="[KeySlow]" Value="Unterbrochen" />

    <Parameter Name="[Vision]" Value="-" />

    <Parameter Name="[Function]" Value="-" />

    <Parameter Name="[Init]" Value="Rüsten" />

    <Parameter Name="[Holiday]" Value="-" />

    <Parameter Name="[Maintenance]" Value="Wartung" />

    <Parameter Name="[Setup]" Value="Rüsten" />

    <Parameter Name="[DownPlan]" Value="Wartung" />

    <Parameter Name="[DownIll]" Value="Störung" />

    <Parameter Name="[Prototype]" Value="Rüsten" />

    <Parameter Name="[StandAloneBegin]" Value="-" />

    <Parameter Name="[StandAloneEnd]" Value="-" />

    <Parameter Name="[Rx1]" Value="-" />

    <Parameter Name="[Rx2]" Value="-" />

    <Parameter Name="[Rx3]" Value="-" />

siplace_connector.docx

Version: 19.06.20

Page 14/22

MPDV Mikrolab GmbH

    <Parameter Name="[FunctionBegin]" Value="-" />

    <Parameter Name="[FunctionEnd]" Value="-" />

    <Parameter Name="[ErrorEnd]" Value="-" />

    <Parameter Name="[BreakEnd]" Value="-" />

    <Parameter Name="[Placing]" Value="-" />

    <Parameter Name="[Start]" Value="-" />

    <Parameter Name="[Laufend]" Value="1" />

    <Parameter Name="[Wartend]" Value="2" />

    <Parameter Name="[Blockiert]" Value="3" />

    <Parameter Name="[Unterbrochen]" Value="4" />

    <Parameter Name="[Störung]" Value="5" />

    <Parameter Name="[Rüsten]" Value="6" />

    <Parameter Name="[Wartung]" Value="7" />

    <Parameter Name="[NichtZugeordnet]" Value="30000" />

  </ComponentConfiguration>

4.4  Transfer of batch data and update

Please carry out a backup of the Siplace database before transferring the batch data

list. Also, back up data of the SetupCenter where batch data is managed.

Timing of batch data transfer and updating batch quantities in HYDRA

Batch data transfer to Siplace is set in default with a time interval of 10 seconds.  (Transfer of

HYDRA to Siplace / SetupCenter)

<Parameter Name="[GetBatchList]" Value="10"/>

Batch data is updated in a time interval of 20 seconds in HYDRA (transfer of current batch

quantities from Sidplace to HYDRA).

  <Parameter Name="[UpdateBatchConsumption]" Value="20"/>

siplace_connector.docx

Version: 19.06.20

Page 15/22

MPDV Mikrolab GmbH

You must adapt the periods depending on the requirement and data quantity.

You can configure the batch data transfer in the file conf.xml in the following section:

 <ComponentConfiguration Name="TimedTrigger"

Class="mpdv.MachineDataCollector.Core.Components.TimedTrigger">

    <Parameter Name="[GetBatchList]" Value="<in seconds>" " />

    <Parameter Name="[UpdateBatchConsumption]" Value="<in seconds>" />

</ComponentConfiguration>

Example:

-<ComponentConfiguration Name="TimedTrigger">

 <Parameter Name="[GetBatchList]" Value="10"/>

<Parameter Name="[UpdateBatchConsumption]" Value="20"/>

</ComponentConfiguration>

5  Siplace configuration

Requirements are:

  SiplacePro 10.x

  SiplaceSetupCenter 5.x

  OIB Version 3.x

siplace_connector.docx

Version: 19.06.20

Page 16/22

MPDV Mikrolab GmbH

5.1  Traceability mode

The base to collect traceability data is the mode LineBasedBoard. You must set the

traceability tool in the Siplace line accordingly.

5.2  MES order number

In order to automatically log on and interrupt operations in HYDRA you need to have MES

order numbers located in data supplied by Siplace.

You need to store the MES order number in the SiplaceLineControl before the data record is

transferred.

siplace_connector.docx

Version: 19.06.20

Page 17/22

MPDV Mikrolab GmbH

You can switch on the field "Order number" as follows:

Menu: ExtrasConfiguration

„Application“spiltcheck „Order number“ and activate „editable“.

siplace_connector.docx

Version: 19.06.20

Page 18/22

MPDV Mikrolab GmbH

6  Available function tests

6.1  Transfer of batch data list to the SetupCenter of Siplace

The transferred batches are visible in the SiplaceSetupCenter.

Open "Find material" in the SiplaceSetupCenter and enter "*" as the search criteria.  Then all

batches should be visible.

siplace_connector.docx

Version: 19.06.20

Page 19/22

MPDV Mikrolab GmbH

6.2  Machine status

You can see if the machine status has been transferred in the resource overview (transaction

resov) or in the resource history (transaction reshi).  If the status changes for the configured

machines appear, the status transfer from Siplace and HYDRA works.

siplace_connector.docx

Version: 19.06.20

Page 20/22

MPDV Mikrolab GmbH

6.3  Order logon / interruption

You can see if orders/operations are logged on or interrupted in the order overview

(transaction orov).  Select the relevant orders and see if the operation is logged on.

6.4  Create output batches

You can control if output batches (e.g. produced circuit boards) have been created by

opening the batch data overview (transaction batov).

Select "Miscellaneous" in the Siplace workstation/machine.  Then all produced output

batches should be listed.

6.5  Traceability data

You can see in the graphical batch tracing (transaction code battrg) if the assignment of input

batches to the output batches had worked.

Select "Origin" and the batch number (if necessary).

siplace_connector.docx

Version: 19.06.20

Page 21/22

MPDV Mikrolab GmbH

siplace_connector.docx

Version: 19.06.20

Page 22/22

