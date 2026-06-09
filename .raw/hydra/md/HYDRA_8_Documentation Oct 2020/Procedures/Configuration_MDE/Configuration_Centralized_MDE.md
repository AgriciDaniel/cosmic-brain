Configuration of Centralized MDE

1  Configuration of Centralized MDE

Purpose

You  can  use  the  configuration  of  the  centralized  MDE  to  collect  machine  data  using  a  Process

Communication Controller (PCC) installed stand-alone. The following collection types are supported:

  Machine monitoring based on cycles or operating signals

  Collection of cycles or machine statuses.

Requirements

The centralized MDE is part of a product and requires a license.

To use the centralized MDE, the following software requirements must be fulfilled:

  Maintenance Manager 2, as of version 2.0.2881, is installed on the HYDRA server.

  Messaging protocol MQTT (hymqtt.dll/.so), as of version 8.1.1.0 is installed (the installation steps

are described in section Installation MQTT Broker).

Additionally, the following programs are required:

  HYDRA 8 service pack 14 is installed.

We recommend to install the up-to-date software version.

  MES Weaver (hymw.exe/.out) as of version 8.1.1.619

  PCC (pcc.exe) as of version 7.2.3.3

  MDE blade 2 (mdeb2.dll) as of version 8.1.2.1

  AIP 8.2 (ctaip.exe) as of version 8.2.1.32.

  On the AIP/PCC, the "Visual C++ Redistributable Package for Visual Studio 2010 x86" must be

installed.

  On the AIP/PCC, the "Visual C++ Redistributable Package for Visual Studio 2013 x86" must be

installed.

You must have run the database patch dbp_persistent_productionlock.hsc on the HYDRA server.

Windows: hydscr.exe db_sql\dbp_persistent_productionlock.hsc

Linux:   hydscr.out db_sql\dbp_persistent_productionlock.hsc

For  the  stand-alone  installation  of  the  PCC,  a  computer  must  be  available  that  does  not  run

AIP 8.2.  For  this  computer,  the  same  hardware  and  software  recommendations  apply  as  for

the AIP 8.2.

Configuration_Centralized_MDE.docx

Version: 1.15.20966

Page 1 of 8

Configuration of Centralized MDE

Structure of a centralized MDE

The diagram below illustrates the structure. The arrows are the communication protocols used.

Note for the centralized machine data collection (stand-alone PCC)

If you configure the centralized MDE, different communication technologies are in use. As a result,

the processing logic of the machine data collection is completely different to the one in an AIP

(where the PCC runs in combined operation).

If  you use  the centralized  MDE, the so-called combined  operation (the  PCC runs in  the same

terminal number as the AIP) is not supported.

In addition, note the following:





If machines are monitored automatically, monitoring may only be performed by the PCC.

If quantities are recorded automatically, automatic quantities may only be recorded by the PCC.

  When assigning a workplace to (further) terminals (AIP 8.2), the number of terminals should be kept to

a minimum. The communication between terminals increases significantly and may have a negative

effect on the availability of terminals.

  Workplaces assigned to several terminals must not have a workplace/machine status configured with

the control indicator "no order".

  The list of batches logged on to the AIP 8.2 ("3rd list") is not part of the synchronization function.

  The function "Entry of disturbance reason required" is not supported.

Configuration_Centralized_MDE.docx

Version: 1.15.20966

Page 2 of 8

Configuration of Centralized MDE

  The  posting  volume  and  the  posting  frequency  in  the  terminals,  especially  during  a  shift  change,  is

important: in a worst-case scenario, there might be problems with synchronization and thus incorrect

postings.

  Customizations are not compatible by default. We recommend to test this in the run-up.



If workplaces are assigned to several terminals, you may only assign one shop floor terminal (AIP 8.2)

as MDE terminal.

  The function "Set production lock" is only available  on terminals with the configuration "operated as

MDE terminal" (up to CTAIP version 8.2.1.34).

Installation MQTT Broker

You need to install the MQTT Broker in one system only once.

The installation instruction of the MQTT Browser is included in the MES Weaver 4.0pe installation

instruction (only available in English).

Configuration of the "stand-alone PCC"

Configure as follows:

MOC: INI data configuration

Make the following INI data configurations on the MOC for each workplace that is assigned to a stand-alone

PCC. With this configuration, the HYDRA server notifies the PCC each time the server receives a posting

for the workplace.

Name
Section
Key
Value
Active
Comment (optional)

MDE
MQTT_NOTIFICATION
<workplace number according to configuration>
TRUE

MQTT notification to PCC for defined workplace

MOC: INI data configuration

If  the  PCC  performs  machine  monitoring  plus  counter  recording,  also  make  the  following  INI  data

configurations:

Name
Section
Key
Value
Active
Comment (optional)

MDE
GET_COUNTER_FROM_MDE_TERMINAL
ACTIVE
TRUE


Configuration_Centralized_MDE.docx

Version: 1.15.20966

Page 3 of 8

Configuration of Centralized MDE

Name
Section
Key
Value
Active
Comment (optional)

MDE
GET_COUNTER_FROM_MDE_TERMINAL
SHIFT_THRESHOLD
300


The processing logic of these options is described in the document MBL_Distributed_MDE_Counter.pdf.

MOC: Terminal configuration

Configure  the  PCC  in  the  Terminal  configuration  as  terminal  of  terminal  type  "PCC"  (141).  Enable  the

options "Operated as BDE terminal" and "Operated as MDE terminal".

MOC: Assignment of workplaces/machines to terminals

Workplaces for which the PCC records signals: Assign the workplaces to the PCC in the Workplace terminal

assignment.

You can assign a maximum of 16 workplaces/machines to a PCC.  Configure further PCCs as

terminals, if you want to record data for more than 16 workplaces via the centralized MDE.

Installation of the PCC as stand-alone application

For information on the configuration of the PCC as service, refer to section 3 of the documentation SCS-

PCB_30.pdf.

Do not install the PCC in a hardware running an AIP 8.2. Use a separate hardware.

Using the compatibility mode

With  some  operating  systems,  it  is  possible  that  the  PCC  finishes  unexpectedly  when  using  MQTT

(centralized MDE). To avoid this behavior, run the stand-alone PCC in compatibility mode for Windows 7

with the following operating system versions:

  Windows 8
  Windows Server 2012
  Windows 8.1
  Windows Server 2012 R2
  Windows 10
  Windows Server 2016

To activate the compatibility mode for the PCC, go to the  Properties of the pcc.exe. In tab Compatibility,

enable the option Run this program in compatibility mode for and select Windows 7 in the drop-down menu.

Configuration of the stand-alone PCC (pcc.ini)

Communication from the PCC to the HYDRA server: Make the following settings in the local configuration

file pcc.ini in the PCC directory (the rows with leading semicolon are comments):

Configuration_Centralized_MDE.docx

Version: 1.15.20966

Page 4 of 8

Configuration of Centralized MDE

[GateWay-Communication]

; Deactivate the connection "AIP8.2 -> PCC"

Active=false

[HOST]

; Deactivate the connection "PCC -> AIP8.2"

Active=0

[WSK]

; Configuration of the PDM–connection to the HYDRA server

Host=<Host name or IP address of the HYDRA server >

User=<Terminal number of the PCC according to MOC configuration>

[Server-Communication]

; Configuration of the communication to the HYDRA server via EVCOM

Active=1

Important: Assign the terminal number in the hyusr.dat in the HYDRA server to the correct system.

For further information on the configuration of the PCC and the possibility to install the PCC as

service, refer to the document MBL_HYD-PCC.pdf.

Configuration of the AIP 8.2

If you use an AIP 8.2 for the data display and the manual input, make the following configurations or check

these configurations:

MOC: Terminal configuration

In the Terminal configuration, deactivate the option "Operated as MDE terminal" for the terminal.

MOC: Assignment of workplaces/machines to terminals

For all assigned workplaces, you must not set the option Processing to MDE processing.

Configuration ctaip.ini

Deactivate the direct AIP communication in the ctaip.ini of the AIP 8.2. To do so, comment out the following

configuration (precede the rows by a semicolon):

; [DLL]

; BusDLL=PCC.EXE

Activate the gateway communication:

[GateWay-Communication]

Active=true

Configuration_Centralized_MDE.docx

Version: 1.15.20966

Page 5 of 8

Configuration pcc.ini

Activate the MDE blade in section Blades. To do so, make the following configuration (delete semicolons

Configuration of Centralized MDE

preceding the rows):

[BLADES]

BLADE_1=.\blades\mdeb2.dll

Configuration_Centralized_MDE.docx

Version: 1.15.20966

Page 6 of 8

Configuration of Centralized MDE

Restrictions when using the centralized MDE

Matrix for the use of the centralized collection

Which product group is available and can be used with a centralized collection and what are the restrictions:

Product group

Available with

Restrictions

centralized

collection

BDE

Yes

Up to CTAIP version 8.2.1.35, the function "Production lock" is not

available on terminals that are only configured with "Operated as

BDE terminal".

MDE

Yes

The  function  "Entry  of  disturbance  reason  required"  is  not

PDV/EMG

DNC

Yes

 No

DNC is not supported with a centralized collection.

supported.

Scripting

Yes

From JAN 2019, also the access to the control (machine control)

is available with the relevant functions in the terminal scripts. (for

example,  GetVal,  SetVal  for  setting  outputs,  customer-specific

connection of weighing machines and transfer of setting data to a

machine when operation is logged on).

Product groups, which do not have an interface to the PCC, are not included in the matrix.

General restrictions



If different clients are used (e.g. SMA and AIP), overlapping messages are possible.

Configuration_Centralized_MDE.docx

Version: 1.15.20966

Page 7 of 8

Configuration of Centralized MDE

Troubleshooting

When starting AIP 8.2, also the PCC is started although installed stand-alone.

Symptom

When  you  restart  the  AIP  8.2,  the  PCC  is  automatically  started  (You  can  see  the  icon  in  the  taskbar)

although it is installed stand-alone.

Solution

Check in the ctaip.ini if there is a further entry BusDLL=PCC.EXE which is not commented out. Delete the

complete section [DLL].

Check in the Terminal configuration if the option "Operated as MDE terminal" is actually disabled.

Restart the terminal.

How do you know whether the centralized MDE is activated for a machine?

The centralized MDE is active, if the following requirements are fulfilled:



In the MOC terminal configuration, a (separate) terminal configuration is available for the PCC.

  The license AIP-EBM and/or SCS-PCB is available.

  The MOC INI configuration includes an entry for the machine:

Name
Section
Key
Value
Active
Comment (optional)

MDE
MQTT_NOTIFICATION
<workplace number according to configuration>
TRUE


How do I know during upload whether the PCC runs in stand-alone operation?

The stand-alone PCC writes the log file: log_pdm.txt.

How do I know that the stand-alone PCC has connected to the MQTT Broker?

The stand-alone PCC writes the log file: log.mqtt.pcc.txt. The log file does not include any errors.

How do I know that the AIP has connected to the MQTT Broker?

The AIP writes the log file: log.mqtt.aip.txt. The log file does not include any errors.

Configuration_Centralized_MDE.docx

Version: 1.15.20966

Page 8 of 8

