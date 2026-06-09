MPDV Mikrolab GmbH

SIPLACE Connector – Station Switching -

Subjects/Contents

1  Objectives ....................................................................................................................... 2

2  Workplace/machine configuration in HYDRA (MOC) ................................................... 2

2.1  Workplace/machine ................................................................................................. 2

2.1.1  Configuration ................................................................................................... 2

2.1.2  Machine status ................................................................................................ 2

3  Configuration Siplace Connector ................................................................................. 3

3.1  Exchange of station ID ............................................................................................. 3

4  Restarting the SiplaceConnector .................................................................................. 5

procedure_siplace_change_station.docxVersion: 19.06.20

Page 1/5

MPDV Mikrolab GmbH

1  Objectives

This documents describes which modifications to the configuration are required if individual

stations are exchanged within a Siplace line.

Please  note:  This  document  only  deals  with  the  necessary  modifications  to  HYDRA  and  the

configuration within the HYDRA-SiplaceConnector. Configurations that might be required within

the SiplaceSoftware are not taken into account and not part of this document.

2  Workplace/machine configuration in HYDRA (MOC)

2.1  Workplace/machine

2.1.1  Configuration

Menu

Master data  Workplaces/ Machines  Workplace configuration

Transaction code

res

Changes to the machine/workplace configuration are not required.

2.1.2  Machine status

Menu

Master data  Workplaces/ machines  Status assignment

Transaction code

mst

Changes to the status assignments of machines/workplaces are not necessary.

procedure_siplace_change_station.docxVersion: 19.06.20

Page 2/5

MPDV Mikrolab GmbH

3  Configuration Siplace Connector

3.1  Exchange of station ID

The SiplaceConnector configuration has to be modified if one or several stations are

exchanged within a Siplace line.

The list of stations is to be updated in the configuration file config.xml (within the directory of

the SiplaceConnector) for every line (corresponds to a machine/workplace in HYDRA) in

which one or several stations have been switched/changed/removed.

Basis:

One line (Line_1) consisting of four stations (L1_ST1, L1_ST2, L1_ST3, L1_ST4).

Please  note:  The  names  refer  to  the  designations  of  the  line  and  stations  within  the  Siplace

software (SiplaceLineControl)

Excerpt from the configuration file config.xml:

<ComponentConfiguration Name="LineStateMerger1"

Class="mpdv.MachineDataCollector.Core.Components.LineStateMerger">

    <Parameter Name="StatePriority" Value="30000,5,4,6,7,3,2,1" />

    <Parameter Name="LineName" Value="Linie_1" />

    <Parameter Name="StationList" Value="L1_ST1,L1_ST2,L1_ST3,L1_ST4" />

    <Parameter Name="SuppressUnknownStations" Value="true" />

</ComponentConfiguration>

procedure_siplace_change_station.docxVersion: 19.06.20

Page 3/5

MPDV Mikrolab GmbH

Field descriptions

Element

Value

Comment

<ComponentConfiguration

LineStateMerger1  Configuration of the line

Name="LineStateMerger1"

recorded by the

Class="mpdv.MachineDataCollector.C

SiplaceConnector. The "name"

ore.Components.LineStateMerger">

entry must be unique and

numbered consecutively.

Moreover, the number of lines

must match the specification

"NumberofLines" within the

configuration file.

<Parameter Name="StatePriority"

30000,5,4,6,7,3,2

Weighting/mapping of

Value="30000,5,4,6,7,3,2,1" />

,1

machine statuses

<Parameter Name="LineName"

Linie_1

Name of the line within the

Value="Linie_1" />

Siplace LineControl

<Parameter Name="StationList"

L1_ST1,L1_ST2,

Names (from LineControl) of

Value="L1_ST1,L1_ST2,L1_ST3,L1_S

L1_ST3,L1_ST4

the single stations within the

T4" />

<Parameter

Name="SuppressUnknownStations"

Value="true" />

line.

Messages from stations that

are not included in the

"StationList" are ignored.

</ComponentConfiguration>

End of the line configuration

procedure_siplace_change_station.docxVersion: 19.06.20

Page 4/5

MPDV Mikrolab GmbH

If one or several stations are exchanged within the line, the parameter entry

<Parameter Name="StationList" Value="L1_ST1,L1_ST2,L1_ST3,L1_ST4" />

has to be changed accordingly.

Example: Station L1_ST3 is replaced by station L1_ST8. Then the entry is to be changed as

follows.

Old:

<Parameter Name="StationList" Value="L1_ST1,L1_ST2,L1_ST3,L1_ST4" />

New:

<Parameter Name="StationList" Value="L1_ST1,L1_ST2,L1_ST8,L1_ST4" />

4  Restarting the SiplaceConnector

The SiplaceConnector is to be restarted, once the configuration file has been changed and

saved.

procedure_siplace_change_station.docxVersion: 19.06.20

Page 5/5

