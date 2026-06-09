DMC-PDV: Configuration in HYDRA

1  DMC-PDV: Configuration in HYDRA

Overview

You must make some configurations in the MOC applications so that the PDV data recorded in DMC can

be processed in the server.

These are:

  Definition of the import path

  Configuration of the PDV characteristics master data

  Creation of (machine-related) collection rules (Continuous monitoring PDV)

  Escalation configuration

Basic configuration of the PDV import path

The component HydraPdvWriter writes the limit values in a HYDRA compatible format for processing in the

server.  The  component  copies  this  file  via  FileTransporter  into  a  specified  directory.  A  storage  path  is

defined in HydraPdvTransporter via the parameter "OutputDirectory".

The Path configuration defines the directory that the server uses for import.

Parameter name

Path

Protocol

Host

Port

URL path

Value

PDVTRANS

File

localhost

0

Path to the spool directory of the system

Example for system 1:

./1/spool/

Description

PDV transport path

DMC_PDV_Configuration_HYDRA.docx  Version: 1.1.20980

Page 1 of 4

DMC-PDV: Configuration in HYDRA

If you use further PDV collection components, all components must store the files in the same

directory as you can only configure one PDVTRANS path.

Configuration of PDV characteristics

You  configure  the  characteristics  recorded  in  DMC  in  the  DMC  manufacturing  instructions.  For  correct

processing  of  the  characteristics  in  the  server,  you  must  create  the  characteristics  in  the  PDV

Characteristics master data catalog.

On creating the characteristics, the following condition must be true:

Characteristic no. is identical to the process parameter and is identical to the tag <Name>…..</Name> in

the manufacturing instruction.

Example:

MOC PDV Characteristics master data

Data modeling in the manufacturing instruction:

<ProcessDataLimit>

<Name>DosierZ</Name>

<CheckLimits>true</CheckLimits>

<UpperProcessLimit>575</UpperProcessLimit>

 <UpperToleranceLimit>565</UpperToleranceLimit>

<TargetValue>550</TargetValue>

<LowerToleranceLimit>535</LowerToleranceLimit>

<LowerProcessLimit>525</LowerProcessLimit>

</ProcessDataLimit>

DMC_PDV_Configuration_HYDRA.docx  Version: 1.1.20980

Page 2 of 4

DMC-PDV: Configuration in HYDRA

The limit values in the PDV characteristics master data (tab "Specifications") are not relevant, as

this information is taken from the manufacturing instruction.

Configuration of Continuous monitoring PDV

The automatic data collection of process characteristics is based on the collection rules specified in the

process data collection.

The creation of collection requests is based on the collection rules. The requests activate the defined rules

for  collection.  Characteristics  specify  the  collection  rules.  The  characteristics  are  taken  from  the

characteristics master data catalog.

The generation of a collection request activates the actual collection. Once the collection rule is approved,

the collection request is automatically generated.

DMC only supports Continuous monitoring PDV. Consequently, the following configuration must be set in

the collection rule:

  Area: Continuous monitoring PDV

  Collection number: Free input

  Collection index: Free input

  Machine: DMC machine suitable for PDV data collection

  Characteristics: Assign the characteristics you want to record to the collection rule.

After  entry  of  the  required  data,  the  collection  rule  must  be  released  and  activated  by  clicking  the

corresponding buttons in the menu.

DMC_PDV_Configuration_HYDRA.docx  Version: 1.1.20980

Page 3 of 4

DMC-PDV: Configuration in HYDRA

Escalation configuration

If you want to convert DMC events into escalations for the escalation management (recorded violations of

limit values), you must configure these events in the Escalation configuration.

In the configurations, you define the events that are converted into escalations, the conditions that trigger

an escalation, the recipient of a specified escalation and how the escalation is technically sent.

As a precondition, you must configure "<CheckLimits>true</CheckLimits>" in the manufacturing instruction

of the characteristic. Only then, a violation of a limit value can be logged as an event in the DMC.

DMC_PDV_Configuration_HYDRA.docx  Version: 1.1.20980

Page 4 of 4

