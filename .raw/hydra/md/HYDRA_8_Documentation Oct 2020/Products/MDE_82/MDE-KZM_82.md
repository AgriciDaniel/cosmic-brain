Manual

Complex Status Models
MDE-KZM 8.2

Version 1.0.23049

Last changed on: 01.09.2020

Complex Status Models

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

MDE-KZM_82.docx

Version: 1.0.23049

Page 2 of 59

Complex Status Models

Contents

1  Complex Status Models ............................................................................... 4

2  Configuration for the Use of Parallel Statuses ............................................. 6

3  Resource Status Types .............................................................................. 13

4  Resource Status Texts ............................................................................... 15

5  Parallel Resource Status ............................................................................ 17

6  Workplaces/Machines ................................................................................ 19

7  Machine history .......................................................................................... 36

8  Machine Time Profile ................................................................................. 46

9  ABC Analysis ............................................................................................. 52

10  Status Ranking List .................................................................................... 55

11  Minor/Major Stops ...................................................................................... 57

MDE-KZM_82.docx

Version: 1.0.23049

Page 3 of 59

Complex Status Models

1  Complex Status Models

Purpose

HYDRA-MDE  (Machine  Data  Collection)  can  record  machine  statuses  automatically.  The  machine

monitoring  is  the  easiest  way  to  record  statuses  (cycle  time  monitoring  or  operating  signal  monitoring).

Some  intelligent  machine  control  systems  control  their  machines  themselves  and  transfer  the  current

machine status to HYDRA.

Today, modern machines and equipment do not only transfer statuses, but also digital information on the

different machine components or aggregates. This information is important for maintenance, for example.

Using the information, you can detect irregularities or potential failures at an early stage.

The functionality "Complex Status Models" offers the possibility to record states and machine status at the

same time. They are also called "parallel statuses". Parallel statuses can document the following statuses

among others:

  Operation mode, e.g. "manual operation", "semi-automatic operation" or "automatic operation"

  Program mode, e.g. "cleaning program" or "production program"

  Status  of  individual  machine  components,  e.g.  "malfunction  compressed  air",  "malfunction

hydraulic", "door open"

Implementation notes

If the following conditions are true for you, the use of the complex status models is recommended:

  You want to transfer further statuses in addition to the actual machine status via the machine control

system to HYDRA.

  You want to make time evaluations for the parallel statuses recorded.

The processing of the parallel statuses is only supported with AIP 8.2.

Integration

The PCC supports the automatic collection of parallel statuses using the drivers PCC-DIF or OPC-UA.

The automatically recorded data can be evaluated in different MDE-applications in the MOC.

To  record  parallel  statuses,  the  installation  of  a  Process  Communication  Controller  (PCC)  in

stand-alone operation is required.

MDE-KZM_82.docx

Version: 1.0.23049

Page 4 of 59

Complex Status Models

You require the following software components at least:

  PCC (pcc.exe) version 7.2.2.87 or higher

  MDE Blade 2 (mdeb2.dll) version 8.1.1.2 or higher

Features

Functions for supervisors,  maintenance  engineers, production schedulers and other technically oriented

staff  members  who  monitor  the  statuses  ("parallel  statuses")  of  machines  and  equipment.  Version  8.2

includes the following features:

  Configuration possibilities to define the parallel statuses that should be recorded.

  Collection and storage of the recorded parallel statuses of machine or equipment.

  The OPC-UA or the PCC module "file interface" can  transfer the parallel statuses from the machine or

the equipment (separate licensing).

  Possibilities to evaluate the recorded parallel statuses in the MOC applications (separate licensing)

o  Machine history

o  Machine time profile

o  Minor/major report

o  ABC analysis

o  Status ranking list

MDE-KZM_82.docx

Version: 1.0.23049

Page 5 of 59

Complex Status Models

2  Configuration for the Use of Parallel Statuses

Purpose

This  chapter  describes  the  configurations  required  to  use  the  function  "Complex  Status  Models"  and  to

record parallel statuses.

Requirements

You can record parallel statuses only automatically. You must therefore ensure that the machine control

system can provide the parallel statuses in one of the supported communication protocols.

Before you configure the settings, you must create a list of parameters that you want to transfer as parallel

statuses from the machine control system. Example:

Status type
number

Status type

Status
number

Status designation

Input
(e.g. OPC item)

10000

10000

10000

Malfunction
in
conveyor system

Malfunction
in
conveyor system

Malfunction
in
conveyor system

10001

Feeding device

10001

Feeding device

10001

Feeding device

the

10

General malfunction

08-911.E0017

the

20

Malfunction
conveyor system

end

of

08-911.E0018

the

30

Malfunction welding unit

08-911.E0019

10

20

30

General malfunction

08-911.E0020

Malfunction no parts

08-911.E0021

Malfunction no parts

08-911.E0022

MOC Configuration

Resource status type

Menu

Master data  Resources  Resource status type

Transaction code

rstt

Function authorization

rstt

The Resource status type defines the type of status that is transferred by the machine control.

Examples of resource status types:

  Operation mode (e.g. automatic, semi-automatic, manual operation, etc.)

MDE-KZM_82.docx

Version: 1.0.23049

Page 6 of 59

Complex Status Models

  Malfunction press (e.g. general malfunction, emergency stop, malfunction compressed air, malfunction

hydraulic, etc.)

  Malfunction conveyor system (e.g. general malfunction, end of system, malfunction welding unit, etc.)

  Malfunction feeding devices (e.g. general malfunction, no parts, malfunction punching head, etc.)

  Malfunction additional devices (e.g. malfunction extraction system, malfunction cooling system, etc.)

You can set the following parameters in the definition of the resource status types:

  Resource type key; only MNR is possible

  Resource family as set in the Configuration (optional)

  Status type

Only use numeric status types.
The maximum value is 65000.

  Designation of the resource status type

  Status change

If the option "Status change" is checked, the current status is completed on setting a new status. The

Machine history displays the event "End of status" for the previous status.

If the option Status change is not checked, the machine control system must explicitly send the value

0 as status end signal for the previous status.

  Generation of documents (records)



If the option Generation of documents is checked, the period between the beginning and the end of the

status is evaluated and the system generates a resource record. You need the resource records for

the evaluation in the Machine time profile or the status-related evaluations.

If the option  Generation of documents is not checked, the duration  of a status is not evaluated  and

consequently a resource record is not generated. You can then evaluate the resource statuses in the

Machine history only.

  Status change when shift change

If the  option  Status change when shift change is checked, the system generates a resource record

during a shift change (which is initiated by the terminal or the Process Communication Controller PCC).

A shift-related evaluation can now be performed.

The  system  discards  a  delayed  posting  regarding  end  of  status.  The  time  stamp  of  the  status  end

posting  is  before  the  shift  change.  Example:  A  posting  "end  of  shift"  is  carried  out  just  before  shift

change and transferred to the server only after the shift change. This posting is discarded.

If the option Status change when shift change is not checked, the changing of shifts does not generate

a record. The duration in a resource record can thus extend to several shifts.

MDE-KZM_82.docx

Version: 1.0.23049

Page 7 of 59

  Responsibility area (optional)

Resource status texts

Complex Status Models

Menu

Master data  Resources  Resource status texts

Transaction code

rstat

Function authorization

rstat

First, you define the resource status texts in order to be able to assign the parallel statuses later on. These

texts are defined for each resource status type.

You can set the following parameters in the definition:

  Resource type key; only MNR is possible

  Resource family as set in the Configuration (optional)

  Status type as set in the Configuration

  Status text number. Use numeric status text numbers.

  Status text

  Color (is used in several MOC applications)

  Responsibility area (optional)

Parallel resource status

Menu

Master data  Resources  Parallel resource status

Transaction code

rsta

Function authorization

rsta

In the application Parallel resource status, you define the possible parallel statuses for each status type by

generating a status text.

You can set the following parameters in the definition:

  Resource type key; only MNR is possible

  Resource family as set in the Configuration (optional)

  Resource (optional); only machines are possible (resource type MNR)

  Status type as set in the Configuration

  Status. The status number must correspond to the configuration in the PCC.

  Status text number as set in the Configuration

MDE-KZM_82.docx

Version: 1.0.23049

Page 8 of 59

Complex Status Models

  External classification (optional, reserved)

  Responsibility area (optional)

PCC configuration

PCC configuration (pcc.ini)

You must integrate the MDE blade (mdeb2.dll) in the pcc.ini:

[BLADES]

BLADE_1=.\blades\mdeb2.dll

If the PCC runs in stand-alone mode, the HYDRA server and the PCC terminal number are configured in

the section [WSK]:

[WSK]

Host=win2008-6

Host name or IP address of the server

Port=10600

User=600

Port number of the system

Terminal number as set in the Configuration

If the PCC runs in combined operation, i.e. in the same hardware as the shop floor client, this configuration

is not relevant.

Configuration of the MDE blade (mdeb2.ini)

You can optionally adjust the following processing logic of the MDE blade via the configuration file mdeb2.ini

section [INIT]:

Parameter

Meaning

PARALLELSTATUS

PS_TRANSPORTPATH

1  Processing enabled
0  Processing disabled
Path to store files locally.

Default
(if not specified)
1

value

ps\

Note:  The  structure  of  the  file  name  is

explained below.

PS_SERVERPATH

Path to copy files to the server.

<SYSTEM>\spool\ps\

TransportIntvlParallelStatus

Interval in seconds at which the file is copied

120

DeleteDaysDone

Each time a file is successfully transferred to

1

to the server.

the  server,  the  file  is  renamed  in  <file

name>.done. Files with the extension *.done

that  are  older  than  the  days  specified  in

DeleteDaysDone are deleted.

MDE-KZM_82.docx

Version: 1.0.23049

Page 9 of 59

Parameter

Meaning

DeleteDaysErr

In the stand-alone mode (i.e. the PCC does

Complex Status Models

Default
(if not specified)
3

value

not run in the same hardware as the terminal

software), a file that failed to be copied to the

server  5

times,

is

renamed

in  <file

name>.err. The system deletes files with the

extension  *.err  after  the  number  of  days

specified here.

DeleteDaysDat

Data  files  in  the  directory  are  deleted  after

5

the number of days specified here.

Example

[INIT]
PARALLELSTATUS=1
PS_TRANSPORTPATH=ps\
PS_SERVERPATH=.\spool\ps\
TransportIntvlParallerStatus=120
DeleteDaysDone=1
DeleteDaysErr=3
DeleteDaysDat=5

Structure of the file name

The file name is structured as follows: ps_YYYYmmddHHmmss_[index 4 digits].sdat

The index ranges from 0000 to 9999. You start with 0000. After 9999, you go back to 0001.

Example: ps_20170214124756_0001.sdat

Configuration of the OPC-UA (opcua_mpdv.ini)

You must define S channels in the OPC configuration.

S:S<Status type>#<Status number>@<Machine>=<OPC_Item>|

In the following example, machine "PS1" has 3 statuses for status type 10001 (100010, 1000011, 100012).

The statuses are defined via the OPC items OPCVar1, OPCVar2 or OPCVar3:

S:S10001#100010@PS1=UA.NODEID=ns=5;s=OPCVar1|

S:S10001#100011@PS1=UA.NODEID=ns=5;s=OPCVar2|

S:S10001#100012@PS1=UA.NODEID=ns=5;s=OPCVar3|

The machine control system must provide the value 1 (beginning of status) or 0 (end of status) in the OPC

item.

MDE-KZM_82.docx

Version: 1.0.23049

Page 10 of 59

Please  refer  to  the  documentation  "PCC  module  OPC-UA  communication"  for  information  on  further

configurations to transfer data via OPC-UA.

Complex Status Models

Configuration of the PCC-DIF (pccdif.ini)

The configuration in the pccdif.ini corresponds to the one for OPC-UA.

S:S<Status type>#<Status number>@<Machine>=<Item>

Example: S:S10001#100010@PS1=Var1

The machine control system must provide the value 1 (beginning of status) or 0 (end of status) in the item.

Please refer to the documentation "PCC module file interface" for information on further configurations to

transfer data via file interface (PCC-DIF).

Configuration in the HYDRA server

On the HYDRA server, you muist install a hymw process as service for file access. To this end, adjust the

configuration file hymap.cfg in the system directory. Proceed as follows:

1.  Call a prompt on the HYDRA server. Make sure that the HYDRA environment variables are set.

2.

In the HYDRA directory, change to the system subdirectory (e.g. 1 for system 1).

3.  Call the file hymap.cfg using a text editor.

4.  Extend the file as follows (for the assumed system 1 of a HYDRA multi system)

[HYDRA1 FILE-DD-Server 1]
HY_USR=string,8888
program=%HYDRADIR%\hymw.exe
Fehlerprotokoll=string,%HYDRADIR%\1\err\hymw.fi1.err
File=string,*.sdat
Path=string,%HYDRADIR%\1\spool\ps

5.  Save the file hymap.cfg.

6.  Perform the following command (also in the system directory):

Windows: ntinst.exe -if hymap.cfg

Linux: ntinst.out -if hymap.cfg

7.  Restart HYDRA.

MDE-KZM_82.docx

Version: 1.0.23049

Page 11 of 59

Complex Status Models

Parameters of the service:

Parameter

Description

["Service name"]

"HYDRAx FILE-DD-Server nr"

x = system
nr = process number starting with 1

HY_USR

HYDRA user performing the processing

Mandatory parameter

Program

Path to HYMW: %HYDRADIR%\hymw.exe

file

Mandatory parameter

Files to be processed

Mandatory parameter

Wildcards allowed

Path

Optional path to search the files

Mandatory parameter

This  path  must  correspond  to  the  path  defined  in  the  configuration  of  the  MDE
blade, option PS_SERVERPATH.

Sleeptime

Optional sleep time between search runs

Default value: 10 seconds

Files in a search run are loaded without sleep.

Protocol

Optional 0 or 1

Error log

RetFile

1 enables the logging of load processes in the System logs.

By default, logging is enabled.

Error log of the service

This parameter defines the name of the return file. All results of PDM queries from
<File> are returned collectively to the specified file.

Before the file is written, an existing file is deleted.

The file is stored in the directory <Path>.

MDE-KZM_82.docx

Version: 1.0.23049

Page 12 of 59

Complex Status Models

3  Resource Status Types

Overview

Menu

Master data  Resources  Resource status type

Transaction code

rstt

Function authorization  mdrstt.*

Purpose

The definition of the Resource status types defines the status types and their properties. The properties

specify e.g. the behavior during status change, shift change or when documents are generated.

Integration

The system only supports the collection of parallel statuses for resources of the resource type MNR.

Selection criteria

The application provides the following selection criteria:

Resource type, Resource family

These fields identify the resource type and the resource family.

The system only supports the collection of parallel statuses for resources of the resource type MNR.

Status type

Selection of the available status types

Designation

Status type designation

Field descriptions

Resource type, Resource family

These fields identify the resource type and the resource family.

Status change

This setting specifies if you allow multiple parallel status values for one status type each having own

beginning and end of status. If the option is checked, the previous status is automatically completed

at the beginning of a status.

Status update (online)

This setting specifies if the status is posted in the current resource or machine status set. The status

change is then immediately visible in the reports.

MDE-KZM_82.docx

Version: 1.0.23049

Page 13 of 59

Complex Status Models

Generation of documents

During processing, the system generates posting documents from the status postings to enable a

subsequent assessment of status durations.

Status change when shift change

A shift change automatically generates a status change. The postings are then evaluated per shift.

Responsibility area

Responsibility area of the user who can see and edit the status value.

Script

Script to be executed when a status posting is processed.

MDE-KZM_82.docx

Version: 1.0.23049

Page 14 of 59

Complex Status Models

4  Resource Status Texts

Overview

Menu

Master data  Resources  Resource status texts

Transaction code

rstat

Function authorization  mdrstat.*

The texts define the status values of parallel resource statuses.

Purpose

You  must  define  the  status  texts  for  the  status  values.  The  status  values  refer  to  the  available  parallel

resource status types. The status values can be specified for each resource type and optionally for resource

families

Integration

You can define parallel status types in addition to and independent of the default BDE machine status. The

application "Resource status types" defines the possible status types.

Requirements

The license for the use of parallel statuses is required.

Selection criteria

The application provides the following selection criteria:

Resource type, Resource family

These fields identify the resource type and the resource family.

Status type

Selection of the available status types

Status text number

You can filter the list by the status entered here.

Field descriptions

Resource type, Resource family

These fields identify the resource type and the resource family.

MDE-KZM_82.docx

Version: 1.0.23049

Page 15 of 59

Complex Status Models

Status type

Status type of the resource types and resource families

Status text number, Status text

Number of the status text and the text of this number

Color

Definition of the status color that is used to color a status in specific reports.

Responsibility area

Responsibility area of the user who can view and use the status value.

Modified on

Date and user of last modification.

MDE-KZM_82.docx

Version: 1.0.23049

Page 16 of 59

Complex Status Models

5  Parallel Resource Status

Overview

Menu

Master data  Resources  Parallel resource status

Transaction code

rsta

Function authorization  mdrsta.*

The available parallel resource statuses are assigned to resources, resource families or resource types.

Purpose

You assign the possible status values to the resource status types defined in the application "Resource

status  types".  You  can  specify  the  status  values  hierarchically  in  the  order  Resource  typeResource

familyResource. The level you cannot define, is left empty. Beforehand, you must define the texts for the

status values to be assigned. The texts are defined in the application "Resource status texts".

Integration

You can define parallel status types in addition to and independent of the default MDE machine status. The

application Resource status types defines the possible status types.

For each status type, the resource status texts of the status values are defined beforehand.

Requirements

The license for the use of parallel statuses is required.

Selection criteria

The application provides the following selection criteria:

Resource type, Resource family, Resource

These fields identify the resources.

Status type

Selection of the available status types

Status

You can filter the list by the status value entered here.

MDE-KZM_82.docx

Version: 1.0.23049

Page 17 of 59

Status text number

Number  of  the  status  text  the  status  is  assigned  to.  Status  text  number  and  status  usually  have

Complex Status Models

identical values.

Field descriptions

Resource type, Resource family, Resource

These fields identify the resources.

Status type, Status

Status type and value of the identified resources

Status text number, Status text

Number  of  the  status  text  the  status  is  assigned  to.  Status  text  number  and  status  usually  have

identical values. The Status text displays the text of the corresponding number.

External classification

Additional classification of status values within the status type.

Responsibility area

Responsibility area of the user who can view and use the status value.

Modified on

Date and user of last modification.

MDE-KZM_82.docx

Version: 1.0.23049

Page 18 of 59

Complex Status Models

6  Workplaces/Machines

Overview

Menu

Production Facility Management  Current Information
 Workplaces/Machines

Transaction code

wpov

Function authorization  wpov

Purpose

The application Workplaces/machines provides an evaluation for the production management. It is intended

for  the  following  users:  users  from  production  scheduling  and  monitoring,  schedulers,  supervisors,

operators or all MOC users who would like to get a comprehensive overview of the production situation at

specific workplaces/machines or a complete organizational unit.

Integration

The application  Workplaces/machines provides all kind of information that is relevant for workplaces. In

addition to master data, the function also provides data required to control production processes. These

are, for example:



current workplace/machine status

  operations currently running at the workplace/machine



currently used tools and resources



cycle progression of the shift (for machines with clocked production)

  output per shift: quantities, durations

Selection criteria

The application provides the following selection criteria:

Workplace from … to …

This selection criterion refers to the workplace stored in the machine or workplace master data. You can

also use wildcards (placeholders *).

Group from … to …

This selection criterion refers to the group stored in the machine or workplace master data. The application

shows all workplaces/machines assigned to the selected group. You can also use wildcards.

MDE-KZM_82.docx

Version: 1.0.23049

Page 19 of 59

Complex Status Models

Report group

This selection criterion refers to the report groups. The application shows all workplaces/machines assigned

to the selected report group.

Designation

This  field  refers  to  the  name  of  machines  and  workplaces  defined  in  the  machine  master  data.  The

application only shows the machines matching the specified character string. You can also use wildcards

(placeholders *).

Short name

This selection criterion refers to the short name of machines in the master data. The application shows all

machines or workplaces matching the entered character string. You can also use wildcards.

Responsibility area

This selection criterion refers to the responsibility area stored in the machine master data. Note: The user

can only view those machines that are included in the responsibility areas assigned to the user.

Company

This  selection  criterion  refers  to  the  company  defined  in  the  machine  or  workplace  master  data.  The

application shows all workplaces/machines assigned to the selected company. You can also use wildcards.

Cost center

This selection criterion refers to the cost center stored in the machine and/or workplace master data. All

workplaces/machines assigned to the selected cost center are displayed. You can also use wildcards.

Status

This selection criterion refers to the current status of machines or workplaces. All machines or workplaces,

which are currently assigned to the selected status, are displayed.

Status longer than

This selection criterion refers to the current status of machines or workplaces. All machines or workplaces

are shown that are currently assigned to the selected status and that are assigned to this status for a longer

period than the one specified.

If several selection criteria are used, the application Workplaces/machines shows the results that match all

selection criteria.

Detail application Workplaces

The detail application Workplaces displays all workplaces in accordance with the selections made in the

selection panel. The application displays the current status, workplace information, shift quantities, cycles

and number of strokes. The following paragraphs describe the data available in the table. This data might

not be displayed by default. Use the column selection function to add the required data.

MDE-KZM_82.docx

Version: 1.0.23049

Page 20 of 59

Complex Status Models

In addition operation-related data is shown, if an operation is currently logged on. In case several operations

are logged on, only the first operation is shown in the detail application.

Status

The Status column summarizes the different statuses and presents them as an "LED". The colors

are as follows:

Light green

Status with RPA 11 (normally "Production")

Blue

Red

Gray

Status with RPA 7 (normally "Setup")

Status 30000 (normally "Not assigned")

Status 20000 or status with RPA 12

(normally break/no shift

Yellow

Status < 10000 and RPA <> [7,11,12]   other statuses/downtimes

Master data:

Workplace

Unique ID defined in the workplace configuration.

Short name

Machine name as defined in the workplace configuration.

Designation

Long text/comment on the machine as defined in the workplace configuration.

Gruppen

Group the machine is assigned to in the workplace configuration.

Cost center

Cost center as defined in the workplace configuration.

Company

Company as defined in the workplace configuration.

Responsibility area

Responsibility area required to view this workplace as defined in the workplace configuration.

Type

Type

Workplace model according to workplace configuration.

Workplace type according to the workplace configuration.

Status

Status

Status number of the status that is currently  active at the  workplace. Color of the currently  active

status according to configuration.

MDE-KZM_82.docx

Version: 1.0.23049

Page 21 of 59

Complex Status Models

Status name

Status name of the status that is currently active at the workplace.

Status since

Date when the status was assigned.

Status since

Point in time when the status was assigned.

Duration so far

Present duration of the status that is currently active at this workplace.

Predicted duration

Expected  duration  of  the  malfunction  entered  by  the  employee  when  assigning  the  status  in  the

terminal or the duration that is stored in the status configuration.

Expected end

Calculated  point  in  time  when  the  malfunction  ends.  The  calculation  is  based  on  the  predicted

duration. The end time is calculated using the values of Date + Predicted duration, synchronized with

the Gregorian calendar.

Expected remaining runtime

Expected end minus current time, i.e. "now". If the remaining runtime is negative the expected end is

already overdue. In this case, the field is highlighted in red.

Do  not  confuse  the  expected  remaining  runtime  of  the  malfunction  with  the  remaining

runtime of the operation.

Shift quantities, primary quantity unit/secondary quantity unit/tertiary

quantity unit/base quantity unit

Yield

Yield that has been posted so far at the selected workplace within the current shift.

Scrap

Scrap that has been posted so far at the selected workplace in the current shift.

Rework

Rework quantity that has been posted so far at the selected workplace in the current shift.

Open quantity

Open quantity that has been posted so far at the selected workplace within the current shift.

Unit

Unit of primary quantity

MDE-KZM_82.docx

Version: 1.0.23049

Page 22 of 59

Complex Status Models

Zyklus

Target cycle

Current target cycle at the workplace.

If an operation is logged on to the machine the target cycle defined for the operation is displayed in

seconds per cycle. There is no target cycle for machines to which no OP is currently logged on. In

this case, “0” is entered in the “target cycle” field.

Actual cycle

Current actual cycle of the workplace

Colored display of the actual cycle relating to the configured cycle parameters.

Difference (%)

The  difference  in%  is  calculated  according  to  the  following  formula:  (target  cycle  -  actual  cycle)  /

target cycle * 100%. If the actual cycle is slower than the target cycle, the difference is indicated in

negative values, otherwise positive values are shown. See below for coloring.

Actual cycle (OP)

The actual cycle (OP) is a value referring to the order. The values used for the calculation all refer to

order logons and, as a result, they are independent from the current machine status.

Formula: Actual cycle OP = RPA11 OP/ (Yield OP / Partitioning OP)

Difference (OP) (%)

The  difference  OP

[%]  column

is  computed  according

to

the

following

formula:

DifferenceOP = Abs((target cycle number – actual cycle number OP) * 100) / target cycle number

Cycle number [1/min]

Target cycle number

1 / Target cycle

There is no target cycle for machines to  which no OP is currently  logged  on. For this reason, the

target stroke number is 0.

Actual cycle number

1 / actual cycle

Difference (%)

(target cycle number – actual cycle number) / target stroke number * 100%

Please note: For rounding reasons, the difference indicated here might deviate from the difference

shown in the "cycle" category.

MDE-KZM_82.docx

Version: 1.0.23049

Page 23 of 59

Complex Status Models

Actual cycle number (OP)

The actual cycle number (OP) is a value relating to orders. The values used for the calculation all

refer to order logons and, as a result, they are independent from the current machine status.Formula:

Actual cycle number OP = yield OP/ (partitioning OP * RPA11 OP)

Difference (OP) (%)

The difference OP column is computed by the following formula:

DifferenceOP = Abs((target cycle number – actual cycle number OP) / target cycle number * 100)

Coloring of the column Difference

In the master data, you can define the coloring of the Difference column in the Cycle category per machine

for the upper/lower action limits or upper/lower tolerance limits (menu: master data > workplaces/machines

> cycle parameters). The value with a sign showing the difference is used for coloring. The value in the

difference column is displayed in red if the tolerance limits are exceeded; the value is displayed in blue if

the action limits are exceeded. The data is not displayed in color if no cycle parameters are defined.

Order quantities

This  category  displays  data  relating  to  quantities  of  the  operation  currently  logged  on.  In  case  several

operations are logged on, only the first operation is shown in the detail application.

Target quantity (P)

Target quantity (primary quantity unit) of the operation currently logged on.

Target scrap (P)

Target scrap (primary quantity unit) of the operation currently logged on.

Yield (P)

Posted yield (primary quantity unit) of the operation currently logged on.

Scrap (P)

Posted scrap (primary quantity unit) of the operation currently logged on.

Rework (P)

Posted rework (primary quantity unit) of the operation currently logged on.

Open quantity (P)

Posted open quantity (primary quantity unit) of the operation currently logged on.

Total quantity (P)

Total of yield + scrap + rework + outstanding quantity (open quantity)

Unit (P)

Unit of the primary quantity unit of the operation currently logged on.

MDE-KZM_82.docx

Version: 1.0.23049

Page 24 of 59

Difference [%]

This difference identifies the percentage that is still to be produced to reach the target quantity of the

operation. To this end, the already posted yield (P) is set in ratio to the target quantity (P):

Complex Status Models

Difference = 100 – (100 / target quantity (P) * yield (P))

The result is displayed with 2 decimal places.

Times relating to operations

This category displays the durations which are posted to the individual resource performance accounts of

the logged on operation.

Detail application Image

The  picture  in  the  Image  detail  application  shows  the  picture  of  the  machine  as  stored  in  the  machine

configuration. The image of the machine selected in the detail application “workplace” is displayed.

The following image formats are supported: jpg, gif, png, tif, bmp, ico, emf, and wmf. The pictures have to

be filed in a directory that may be accessed via the path ID “MOCWPIMG” within the path configuration.

Further information on the configuration can be found here.

Detail application Operations logged on

The  detail  application  Operations  logged  on  shows  all  operations  that  are  currently  logged  on  to

workplaces/machines which are selected in the detail application “Workplaces”.  The following paragraphs

describe  the  data  available  in  the  table.  This  data  might  not  be  displayed  by  default.  Use  the  column

selection function to add the required data.

Workplace

Workplace

Workplace where the operation is logged on.

Order

Order

Order number of the operation.

Sequence

Sequence number of the OP (if sequences are used).

MDE-KZM_82.docx

Version: 1.0.23049

Page 25 of 59

Complex Status Models

OP

Split

SOP

Operation number

Split number of the operation (if the split function is used).

Sub operation number (reserved).

OP name/designation

Designation of the operation

Article

Article number produced by the operation; taken over from operation data.

Login

Date

Date when the operation was last logged on to this workplace

Time

Time when the operation was last logged on to this workplace

Primary quantity/secondary quantity/tertiary quantity/base quantity

Target quantity

Target quantity of the operation

Unit

Yield

Unit of primary quantity

Yield that has been posted so far to the operation

Scrap

Scrap that has been posted so far to the operation

Rework

Rework quantity that has been posted so far to the operation

Open quantity

Open quantity that has been posted so far to the operation

Yield/target quantity [%]

Proportion of yield to target quantity in %

Yield since logon

Yield since the operation is logged on

MDE-KZM_82.docx

Version: 1.0.23049

Page 26 of 59

Complex Status Models

Detail application Staff logged on

The detail application Staff logged on shows all persons who are logged on to the workplace selected in

the detail application “Workplace”.  The following paragraphs describe the data available in the table. This

data might not be displayed by default. Use the column selection function to add the required data.

Workplace

Workplace

Workplace where the operation is logged on.

Person

Name

The person’s name as defined in the HR master.

First name

The person’s first name as defined in the HR master.

Name

The person's complete name as defined in the HR master (last name, middle name and first name)

Company

Company the person is assigned to in the HR master.

Personnel number

Unique key to identify the person. (Key)

Staff badge number

Staff badge number assigned to this person in the HR master.

Operator position/function

Abbreviation of the operator's function ("operator position") that has been selected when the person

logged on to the machine.

Operator position/function

Unique  key  of  the  operator  position  that  has  been  selected  when  the  person  logged  on  to  this

machine.

Order

Order

Order number of the operation.

Sequence

Sequence number of the OP (provided that sequences are used).

MDE-KZM_82.docx

Version: 1.0.23049

Page 27 of 59

Complex Status Models

OP

Split

SOP

Operation number

Split number of the operation (provided that the split function is used).

Sub operation number (reserved).

OP name/designation

Designation of the operation

Article

Article number produced by the operation; taken over from operation data.

Login

Date

Date when the operation was last logged on to this workplace

Time

Time when the operation was last logged on to this workplace

"Advance logon" option

If this option is set, the person is logged on automatically when shifts change the next time.

Detail application Resources logged on

The  detail  application  Resources  logged  on  shows  all  resources  which  are  logged  on  to  the  workplace

selected in the detail application Workplace. The following paragraphs describe the data available in the

table. This data might not be displayed by default. Use the column selection function to add the required

data.

Workplace

Workplace

Workplace where the operation is logged on.

Resource

Resource type

Resource type to which the resource is assigned.

Resource

Resource ID that is entered in the resource master data.

MDE-KZM_82.docx

Version: 1.0.23049

Page 28 of 59

Complex Status Models

Designation

Resource designation recorded within master data.

Resource family

Resource family (internal ID) to which the resource is assigned.

Login

Date

Date when the resource was last logged on to this workplace.

Time

Time when the resource was last logged on to this workplace.

Detail application Maintenance

The  detail  application  Maintenance  shows  all  active  maintenances  for  the  workplace  that  is  currently

selected in the selection panel. The following paragraphs describe the data available in the table. This data

might not be displayed by default. Use the column selection function to add the required data.

Maintenance

Active

Light green:

Active

Status

Status of maintenance activity

Green

Blue

"blue" threshold has been exceeded

Yellow

"yellow" threshold has been exceeded

Red

"red" threshold has been exceeded

Maintenance

Maintenance name

Type

Maintenance type defined for the maintenance:

T

B

Z

(cycle-based)

(operating hours)

(time-based)

Class

Maintenance class

MDE-KZM_82.docx

Version: 1.0.23049

Page 29 of 59

Complex Status Models

Non-recurring maintenance

Flag indicating that this maintenance is only performed once.

Valid from

Start of maintenance validity. A maintenance can only fall due within the validity period.

Valid until

End of maintenance validity.

Maintenance order

Maintenance order assigned to this maintenance.

Date

Time

Date when this maintenance was last carried out at the selected machine.

Time when this maintenance was last carried out at the selected machine.

Modified by

Person (user) who reset the last maintenance.

Actual cycles

Number of cycles accrued so far.

Next maintenance after

Counter reading of cycles when the next maintenance is to be performed.

Interval

Interval within which the maintenance is to be performed; from the maintenance configuration.

Actual duration

Operating  hours,  which  have  been  posted  so  far  onto  the  resource  –  according  to  resource  type

settings.

Next maintenance after

Meter reading of the operating hours counter triggering the next maintenance to become due.

Interval

Interval  in  hours  within  which  the  maintenance  is  to  be  performed;  from  the  maintenance

configuration.

Next maintenance on

Date when the next maintenance falls due.

Interval

Interval within which the maintenance is to be performed; from the maintenance configuration.

Info 1 - 6

Additional text 1-6 from the maintenance configuration

MDE-KZM_82.docx

Version: 1.0.23049

Page 30 of 59

Complex Status Models

Detail applicationArticle in production

The detail application Article in production shows all output materials with the relevant batch number which

are  logged  on  to  the  workplace  selected  in  the  detail  application  Workplace.  The  following  paragraphs

describe  the  data  available  in  the  table.  This  data  might  not  be  displayed  by  default.  Use  the  column

selection function to add the required data.

Workplace

Workplace

Workplace to which the batch is logged on.

Material

Material

Material number of the currently produced article

Material designation/name

Material name of the currently produced article, which is taken over from the producing operation.

Material type

Material type of the currently produced article, which is taken over from the producing operation.

Batch number

Current batch numbers produced by the OP using this article.

Quantities

Quantities

Original quantity of the batch

Remaining quantity

Remaining quantity of the batch

Quantity unit

Quantity unit in which the batch is managed.

Login

Date

Date when the batch was last logged on to this workplace.

Time

Time when the batch was last logged on to this workplace.

Person

Person (personnel number) who performed the last output batch change.

MDE-KZM_82.docx

Version: 1.0.23049

Page 31 of 59

Complex Status Models

Detail application Material in use

The  detail  application  Material  in  use  shows  all  input  materials  which  are  logged  on  to  the  workplace

selected in the detail application Workplace. The following paragraphs describe the data available in the

table. This data might not be displayed by default. Use the column selection function to add the required

data.

Workplace

Workplace

Workplace where the input batch is logged on.

Material

Material

Material number of the currently logged on input batch.

Material designation/name

Material name of the currently logged on material, which is taken over from the producing operation.

Material type

Material type of the currently logged on material, which is taken over from the producing OP.

Batch number

Current batch number of the currently logged on input batch.

Quantities

Original quantity of the batch

Remaining quantity

Remaining quantity of the batch

Quantity unit

Quantity unit in which the batch is managed.

Login

Date

Date when the batch was last logged on to this workplace.

Time

Time when the batch was last logged on to this workplace.

Person

Person (personnel number) who has performed the last input batch logon.

MDE-KZM_82.docx

Version: 1.0.23049

Page 32 of 59

Complex Status Models

Detail application Status

The detail application Status shows the current machine status and in parallel all current resource statuses.

Parallel resource statuses refer to a workplace or a machine. The statuses do not depend

on the WRM resource statuses.

The  entry  of  other  statuses  than  the  machine  status  requires  additional  licenses  and

configurations.

The following paragraphs describe the data available  in the table. Some data might not be displayed by

default. Use the column selection function to add the required data.

Status

Status

Number of the parallel Resource status.

Status text

Designation of the parallel resource status

Status type

Number of the Status type the resource status is assigned to.

Login

Beginning of status

Point in time when the status was set.

Duration

Duration since beginning of status. The duration is calculated based on the Gregorian calendar.

The displayed duration of the status type "MST" (machine status) can therefore differ from the value

Duration so far in the detail application Workplaces.

Resource

Resource type key

Resource type of the workplace/the machine - always "MNR"

Resource

Number of the workplace/machine

Detail application Shift times

The detail application  Shift times shows RPA times of the current shift at the  workplace selected  in the

detail application Workplace in a pie chart.

MDE-KZM_82.docx

Version: 1.0.23049

Page 33 of 59

Complex Status Models

Detail application Shift quantities

The detail application Shift quantities shows the current shift quantities in a bar chart, i.e. yield, scrap in

primary quantity unit. The quantities refer to the workplace selected in the detail application Workplace.

Detail application Cycle progression

The detail application Cycle progression shows the stored cycle values in a line chart in [sec/cycle]. The

chart  displays  the  cycle  progression  of  the  workplace  selected  in  the  detail  application  Workplace.  By

clicking a radio button the user can decide whether they want to display the current shift or the last x hours.

However, x should be less than 8 hours for performance reasons.

The following limit values are displayed as lines: upper tolerance limit  - UTL (red), lower tolerance limit -

LTL (red), upper action limit - UAL (yellow), lower action limit - LAL (yellow). The limits are computed and

displayed on the basis of the Process parameters configuration.

Please note: The display depends essentially on the size of the detail application.

Detail application Downtime ranking list

The Downtime ranking list shows the top x of current downtimes (status is not production) of the currently

selected workplace during the current shift or the last hours. They are represented in a horizontal bar chart.

Using the radio buttons, it is possible to show the statuses, which have so far occurred in the current shift,

or the statuses of the last x hours. By another radio button, the user can configure the display according to

downtime durations or the number of respective downtimes.

The TOP X input field allows for the number of statuses to be defined (preassignment: 5).

The color of status bars corresponds to the color defined for the status text within the HYDRA configuration.

The status bar is displayed in gray, in case no color is defined for the status. The status text and the value

(duration in hours or number) are displayed for each bar.

Toolbar

Data collection

   Log on

Use the Log on function to log on operations to the system.

   Partial confirmation

Use the function "Partial confirmation" to enter part quantities for operations that are then recorded

in the system.

MDE-KZM_82.docx

Version: 1.0.23049

Page 34 of 59

Complex Status Models

   Interrupt

Use the function "Interrupt" to interrupt operations.

Log off

Use the Log off function to log off operations.

   Terminate

Interrupted or prepared operations can be logged off from the system using the Terminate function

Persons

   Log person on

You can log on a person to an operation/machine using the Log person on function

    Log person off

You can log off a person from the relevant operation/machine using the Log person off function

MDE-KZM_82.docx

Version: 1.0.23049

Page 35 of 59

Complex Status Models

7  Machine history

Overview

Menu

Production facility/Resource management  Resource analysis  Machine
history

Transaction code

wphi

Function authorization  wphi

Purpose

The machine history is a report for the production management. The application allows for tracking and

tracing  of  events  that  need  to  be  posted  at  workplaces  in  MES.  In  this  context,  posting  events  such  as

status changes, order, tool, and personnel postings, maintenance activities as well as measures recorded

at a workplace are listed in chronological order in a table. You can use various selection criteria to evaluate

events.

Selection criteria

The application provides the following selection criteria:

Workplace from … to …

This selection criterion refers to the workplace stored in the machine or workplace master data. You

can also use wildcards (placeholders *).

Group from … to …

This  selection  criterion  refers  to  the  group  stored  in  the  machine  or  workplace  master  data.  The

application  shows  all  workplaces/machines  assigned  to  the  selected  group.  You  can  also  use

wildcards.

Short name

This  selection  criterion  refers  to  the  short  name  of  machines  in  the  master  data.  The  application

shows all machines or workplaces matching the entered character string. You can also use wildcards.

Designation

This field refers to the name of machines and workplaces defined in the machine master data. The

application  only  shows  the  machines  matching  the  specified  character  string.  You  can  also  use

wildcards (placeholders *).

Cost center

This selection criterion refers to the cost center stored in the machine and/or workplace master data.

The application shows all machines and/or workplaces assigned to the selected cost center. You can

also use wildcards.

MDE-KZM_82.docx

Version: 1.0.23049

Page 36 of 59

Complex Status Models

Company

This selection criterion refers to the company defined in the machine or workplace master data. The

application  shows  all  workplaces/machines  assigned  to  the  selected  company.  You  can  also  use

wildcards.

Report group

This selection criterion refers to the report groups. The application shows all workplaces/machines

assigned to the selected evaluation/report group.

Responsibility area

This selection criterion refers to the responsibility area in the workplace/machine master. Note: The

user can only view those machines included in the responsibility areas assigned to the user.

Type

Type

Selects the category of the machine/workplace displayed in the evaluation/report. You can select E

(individual workplaces) and G (group workplaces).

Selects the workplace type. You can select the following workplace types:

- P Workplace

- N Machine

- J Machining center

- L Line

- A Aggregate

- C CAQ inspection station

- R Reel-based manufacturing

- S Cutting unit

Show comments

If you select the checkbox Show comments, the table also shows entered comments.

Comment

If the input field Comment includes a text, the table only shows the data records that include this text

as a comment. You can use * as a wild card. Please note case sensitivity.

You cannot use this selection field to search BDE comments.

Machine statuses > X minutes only

This  parameter  only  refers  to  events  of  the  type  "machine  status".  The  application  will  show  the

machine status if the posted time is greater than the entered value.

Event type

You  can  restrict  the  displayed  events.  The  application  shows  all  events,  in  case  you  have  not

restricted the selection.

MDE-KZM_82.docx

Version: 1.0.23049

Page 37 of 59

Complex Status Models

Designation

Machine status

Production lock

Operation postings

Personnel postings

Acronym

M_MST

M_PSPERRE

A_ADE

P_ADE

Target value changes

M_VORGABE

Maßnahme

R_MASSNAHME

Resource posting

Release of resource

Resource status

R_MELDUNG

R_FREIGABE

R_STATUS

Maintenance reset

R_WART_RESET

Exceeding of maintenance

R_WART_EXCEEDED

DNC Upload

DNC Download

R_UPLOAD

R_DOWNLOAD

Transfer posting of resources

R_UMBUCHUNG

Beginning of status
end of status

BDE comment

RES_STB
RES_STE

HY_BEM:  Display  of  BDE
that  have  been
comments
entered
to  an
reference
operation.

in

Please note: Posting of events depends on the customer's system and its use. Consequently, it might

be the case that not all events listed here are relevant.

Date from …to (shift/ time)

Use the date selection to restrict the period of time for the data you want to evaluate.

When selections are made using shift(s), the shift date is evaluated. If no shift is selected, all shifts

are used.

Note  that  selection  by  shift  is  not  supported  for  all  event  types.  You  can  find  detailed

information on the shift selection here.

If you select by time, the selection is based on the start date. Both times refer to the beginning or end

of the date period specified above.

You can only evaluate Group workplaces if you select by Time. If you select by Shift, no

data will be displayed because group workplaces do not refer to shifts.

MDE-KZM_82.docx

Version: 1.0.23049

Page 38 of 59

Complex Status Models

Order / Article / MES order number

You can use these criteria to search for BDE postings:

  Log on OP, interrupt OP, log off OP, enter part quantities

  Log on staff, log off staff

  Change partitioning, change target cycle

  BDE comment

Machine history detail application

The machine history lists all events, such as status changes, order or personnel postings of a machine

that occurred on the day. These have to be evaluated or listed in a shift of this day. The

evaluations/reports show the following postings:

Postings based on machines/workplaces:

Postings for machine statuses recorded automatically (with direct machine connection)

Postings assigned manually at the terminal

Setting the production lock or changing default values relating to machines/workplaces (target cycle,

partitioning) at the terminal

Automatic assignment of default values with operation postings

 Postings based on orders:

Postings performed automatically (when shifts change)

Manual postings (logon, logoff, interruption) at the terminal.

The corresponding order is displayed additionally. If it is a manual posting, the person who did the posting

is shown as well.If waiting period processing is active, the displayed logon time of the order represents the

time of entry and may deviate from the point in time indicated in the order log record.  

 Postings based on staff:

Automatic (when shifts change)

Manual logon or logoff processes of staff at the terminal

In addition, the application shows the corresponding personnel number and the operation for which

the person produces.

 Postings based on resources:

Machine  postings  resulting  from  the  HYDRA  Tool  and  Resource  Management  module  (HYDRA-

WRM), e.g. the application also shows exceeded maintenance activities or measures/comments.

 Information

Shows BDE comments entered via the AIP terminal and stored with the operation.

MDE-KZM_82.docx

Version: 1.0.23049

Page 39 of 59

Complex Status Models

The event "information" also shows the total duration of the respective status / event. The duration is always

zero when a person or OP is logged on. The duration states the interval between the logging on and logging

off if you interrupt/log off an OP or person.

Field description

The following paragraphs describe the data available in the table. It might be the case that the application

does not show this data by default. Use the column selection function to add the required data.

Field description workplace category

Workplace

Workplace the event refers to.

Field description event category

Type

Image display of the type

Event type

Assign the recorded event. Possible values: see event

Event

Classifies the event collected at the machine in the table row. In the columns "Selection by shift" and

"Selection by time" you can see events available for a specific selection.

Event type

Event

Machine status

Production lock

Operation postings

Personnel postings

to

Machine  status  according
configuration
Coloring is set according to the
settings in the status text
configuration..

Production lock set manually
Production lock canceled
manually

OP logged on
OP interrupted
OP logged off

Person logged on
Person logged off

Target value changes

Change partitioning/change
target cycle

Exceeding
maintenance

of

Maintenance cycle exceeded

Maintenance reset

Maintenance reset

Information

BDE comment entered

Selection by
shift

Selection by
time

Yes

Yes

No

Yes

Yes

Yes

Yes

No

No

No

Yes

Yes

Yes

Yes

Yes

Yes

MDE-KZM_82.docx

Version: 1.0.23049

Page 40 of 59

Complex Status Models

Event type

Event

Beginning of status
end of status

Event  and  coloring  according  to
configuration

Selection by
shift

Selection by
time

No

Yes

Datum

Entry date of the event

Time

Entry time of the event

Duration

Time between the last event of this kind and the one currently displayed. The duration is only shown

for the events "OP INTERRUPTED", "OP LOGGED OFF", "PERSON LOGGED OFF" as well as for

machine statuses. In any other case, 0 is shown. These durations are synchronized with the BDE

shift  calendar,  i.e.  shift  breaks  are  not  included.  Consequently,  this  value  does  not  necessarily

correspond to the period of time between logon and logoff.

Field description master data category

Workplace

Unique ID defined in the workplace configuration.

Designation

Machine name as defined in the workplace configuration.

Comment

Comment on the machine as defined in the workplace configuration.

Group

Capacity group which the machine was assigned to.

Cost center

Cost center as defined in the workplace configuration.

Company

Company as defined in the workplace configuration.

Responsibility area

Responsibility area required to view this workplace as defined in the workplace configuration.

Field description order category

Order type

Order type of the order for which the event was collected.

MDE-KZM_82.docx

Version: 1.0.23049

Page 41 of 59

Complex Status Models

order

Order number of the OP for which the event was recorded.

Sequence

Sequence number of the OP (provided that sequences are used).

OP

Split

SOP

Operation number

Split number of the operation (if split OPs are used)

Sub operation number (reserved).

Article

Article number produced by the operation; taken over from operation data.

Article designation/name

Article name of the article.

Field description person category

Person

Personnel number of the person that has been logged on or off (only for Pers. postings)

Last name

The person’s last name who was logged on or off (for personnel postings only).

First name

The person’s first name who was logged on or off (for personnel postings only).

Name

Full  name  (last  name,  middle  name  and  first  name)  of  the  person  who  was  logged  on  or  off  (for

personnel postings only).

Field description status category

If the event is a machine status, then this category shows the status number and status text name. This

category shows the resource status for events based on resources.

Status

Status number of the assigned status

Status text

Status text of the assigned status

MDE-KZM_82.docx

Version: 1.0.23049

Page 42 of 59

Complex Status Models

Receiving storage location

Destination when entering a resource status change (RES_STATUS).

Field description maintenance category

Maintenance type

Type of the maintenance

T:

B:

Z:

based on cycles,

based on operating hours

based on time

Maintenance

  Maintenance short text

Target cycles

For maintenance type T only: number of cycles until the maintenance is due again.

Actual cycles

For maintenance type T only: number of cycles accrued since resetting the maintenance interval.

Value results from the machine data collection (MDE).

Planned hours of operation

For maintenance type B only: number of operating hours until maintenance falls due again.

Actual hours of operation

For maintenance type B only: number of operating hours accrued since resetting the maintenance

interval. Value results from the machine data collection (MDE).

Next date

For maintenance type Z only: time when the maintenance falls due the next time.

Processing mode

For maintenance events (RES_WART):

R = Reset

Z = Threshold exceeded

A = Enabled/disabled

For changed resource statuses (RES_STATUS):

S = Change over status

Threshold 1 (in %)

Threshold until reaching due date

Threshold 2 (in %)

Threshold until reaching due date

MDE-KZM_82.docx

Version: 1.0.23049

Page 43 of 59

Complex Status Models

Threshold 3 (in %)

Threshold until reaching due date

Active

“Active” flag of the maintenance activity at the time of the event.

Active (so far)

Only relevant for processing mode A: previous “active” status of the maintenance activity at the time

when the maintenance activity was activated/deactivated.

Modified by

Editor who edited/set/reset the maintenance.

Datum

Date of editing/resetting

Time

Time of editing/resetting

Field description measure category

Maßnahme

Measure name

Designation

Name/description (long text) of the measure.

Reporting person

Person who created the measure.

Verantwortlicher

Person who has to carry out the measure.

Date of solution

Date when the measure has to be completed.

Priority

Priority of the measure.

Done

Flag indicating that the measure has been completed.

Done by

Person who marked the measure as being completed.

Field description upload/download category

(Not supported)

MDE-KZM_82.docx

Version: 1.0.23049

Page 44 of 59

Complex Status Models

Field description comment category

Comment

Comment on the event entered by the employee.

Field description changed partitioning category

Partitioning

Partitioning

Cavity

Cavity number.

Type of modification

Reduced partitioning or increased partitioning.

Reason for change

Number of the reason for change.

Text of reason for change

Text of reason for change

Toolbar

 Generate order (function authorization wphigenorder)

Use the "Generate order" function to create orders from work plans based on Configuration.

 Order information (function authorization: orin)

Request  Order information.

MDE-KZM_82.docx

Version: 1.0.23049

Page 45 of 59

Complex Status Models

8  Machine Time Profile

Overview

Menu

Production facility/Resource management  Resource analysis  Machine
time profile

Transaction code

mtpf

Function authorization  mtpf

Purpose

The machine time profile is the ideal tool for every planner, shift manager and production manager and is

a report/evaluation of the production facility management function.

Integration

The machine time profile is used to visualize the production and downtime behavior of the machines in the

foreman's area over a specified period. A clear, graphic bar chart shows which machine conditions were

recorded at what time.

Selection criteria

The application provides the following selection criteria:

Workplace from … to …

This selection criterion refers to the workplace in the machine or workplace master data. You can

also use wildcards (placeholders *).

Group from … to …

This selection criterion refers to the group in the machine or workplace master data. The application

shows all workplaces/machines assigned to the selected group. You can also use wildcards.

Report group

This selection criterion refers to the report groups. The application shows all workplaces/machines

assigned to the selected evaluation/report group.

Responsibility area

This selection criterion refers to the responsibility area within the workplace/machine master. Note:

The user can only view those machines that are included in the responsibility areas assigned to the

user.

Short name

This  selection  criterion  refers  to  the  short  name  of  machines  in  the  master  data.  The  application

shows all machines or workplaces matching the entered character string. You can also use wildcards.

MDE-KZM_82.docx

Version: 1.0.23049

Page 46 of 59

Complex Status Models

Company

This selection criterion refers to the company defined in the machine or workplace master data. The

application  shows  all  workplaces/machines  assigned  to  the  selected  company.  You  can  also  use

wildcards.

Status text

By entering a status text or a part of a status text, only those machines and workplaces are displayed

that match the entered status text or the specified character string.

Status longer than x minutes

This selection criterion refers to the displayed statuses of the machines or workplaces. The graphic

view only shows the statuses that  were active at the  machine longer than the specified period (in

minutes).

Date from …to (shift/ time)

Use the date selection to restrict the period of time for the data you want to evaluate.

When selections are made using shift(s), the shift date is evaluated. If no shift is selected, all shifts

are used. You can only select machine and order data by shift.

If you select by time, the selection is based on the start date. Both times refer to the beginning or end

of the date period specified above.

You can only evaluate Group workplaces if you select by Time. If you select by Shift, no data will

be displayed because group workplaces do not refer to shifts.

The  display  shows  the  evaluation  of  the  selected  period  of  time  whether  the  data  is  already

archived or not.

Designation (name)

This field refers to the name of machines and workplaces defined in the machine master data. The

application  only  shows  the  machines  matching  the  specified  character  string.  You  can  also  use

wildcards (placeholders *).

Cost center

This selection criterion refers to the cost center stored in the machine and/or workplace master data.

The application shows all machines and/or workplaces assigned to the selected cost center. You can

also use wildcards.

RPA number (Resource Performance Account)

By selecting one or more RPA accounts, the system only displays the statuses assigned to the RPA

accounts or the status time entered for the RPA accounts in the graphical evaluation.

Display order

By activating this option, the current operations per machine and the individual statuses are displayed

in the Gantt chart.

MDE-KZM_82.docx

Version: 1.0.23049

Page 47 of 59

Complex Status Models

Show all machines

By default, the Machine time profile only displays machines for which the system recorded data in

the selected period (and according to the further selection parameter).

If you check this option, you can display all machines, regardless of whether the system recorded

data for the machines or not. If the system didn't record any data, the machine row is empty.

Show blocked machines

You can configure machines in the Workplace and resource configuration as Blocked. The display of

the blocked machines in the Machine time profile depends on how the checkbox is set.

 Blocked and not blocked machines are displayed (default).

 Only machines are displayed that are not blocked.

 Only machines are displayed that are blocked.

If several selection criteria are used, overlapping results are displayed in the workplace overview.

View criteria

In addition to selecting data in the selection criteria, the graphic display may be changed by further view

criteria:

General

In the General tab, you can group data for the display. Here you can specify a grouping option next

to the option that a grouping should take place. The following groupings are possible at the moment:

- Group

- Cost center

- Company

Time scale

A drop-down box allows for the displayed scale to be divided into the dimensions Seconds, Minutes,

Hours, Days, Weeks and Months. The scale is displayed in the selected dimension. The checkbox

Fit time scale into visible area reduces or increases the selected time range in order for it to fit into

the application (without scrolling). The + and - buttons allow for the data to be increased or reduced

manually or step by step.

MDE-KZM_82.docx

Version: 1.0.23049

Page 48 of 59

Workplace table

This multi-select box allows for the displayed data to be selected in the left table view. The following

Complex Status Models

information is provided:

- Workplace

- Short name

- Rate of capacity utilization

- Reserve of rate of capacity utilization

- Cost center

- Group

Color status

In this tab, the displayed bar colors may be selected according to the RPA colors, status colors and

colors for production and downtime.

A display according to the RPA colors is as follows:

RPA  Abbreviation  Designation (name)

Color

1

2

3

4

5

6

7

8

9

10

11

12

SUT

Secondary utilization time

 Dark green

DCI

LCI

Disturbance-caused interruption (=
technical interruption)

Logistics-caused interruption (=
organizational interruption)

SCI

Staff-caused interruption

IMN

Idle mode, not scheduled

Red

Fuchsia

Purple

Black

IMS

Idle mode, scheduled

Dark gray

SET

Setup

STA

Startup

Light turquoise

Light blue

U8

U9

Free (e.g. pilot production, or similar)

Dark blue

Free (off work)

Brown

MUT

Main utilization time; "Production"

Light green

BKS

Neutral times, e.g.  off, breaks etc., i.e.
times that are not recorded

Olive

MDE-KZM_82.docx

Version: 1.0.23049

Page 49 of 59

Operation colors

If data is displayed according to the selection criteria, it may be shown in different colors according

Complex Status Models

to the following criteria:

- Category

- Order type

- Order

- Article

- Tool

Detail application Machine time profile

The Machine time profile is displayed and divided into a tabular view of the selected

workplaces/machines and the graphic view of status development.

Tabular overview

The  table  overview  shows  the  workplaces/machines  including  additional  information,  which  have  been

selected for the graphic view. The type and grouping of data may be determined as described in the display

criteria.

In addition to displaying master data for the selected workplaces/machines, such as short name, cost center

and  group,  it  is  also  possible  to  display  the  rate  of  capacity  utilization  and  the  reserve  for  the  capacity

utilization rate.

Rate of capacity utilization

The rate of capacity utilization is calculated from the ratio production time and total time.

Formula:

The rate of capacity utilization is always calculated on the basis of all downtimes (not only the ones

displayed) compared to the total time.

Reserve for the rate of capacity utilization

The reserve for the rate of capacity utilization is calculated from the ratio of the displayed downtimes

to the total time

Gaps which are smaller than the typical part running time on a machine and the required times (status

Assembly),  do  not  constitute  a  utilization  reserve.  These  times  are  often  not  included  and  are

therefore hidden.

Formula:

MDE-KZM_82.docx

Version: 1.0.23049

Page 50 of 59

Complex Status Models

Table view context menu

Workplaces/machines

Opens the Workplaces application using the tabular overview of the workplaces/machines.

Status report

Opens  the  Status  report  (machine-related)  application  using  the  tabular  overview  of  the

workplaces/machines.

Graphic view

The graphic view shows which machine conditions were recorded at the individual machines at which point

in time. The machine time profile has been designed to represent the production and downtime performance

of machines of the foreman area over a specified period of time.

In  case  of  very  short  status  durations,  it  might  happen  -  depending  on  the  Gantt  or  screen

resolution - that one pixel represents several seconds. For this reason, individual statuses might

be displayed or hidden. For the display of very short statuses, you must increase the resolution.

"Graphic view" context menu

Order overview

Opens the Order overview application using the operations displayed in the graphic view.

Operation overview

Opens the Operation overview application using the operations displayed in the graphic view.

Machine-related postings

Change to Machine-related postings with the transfer of the following parameter in the selection area:

  Machine number
  Date from - to
  Shift number

Note on the display of shifts: If a machine status is applied over several shifts, a machine posting

is created in the system for each shift. In this case only one status is displayed for the machine

time profile.

MDE-KZM_82.docx

Version: 1.0.23049

Page 51 of 59

Complex Status Models

9  ABC Analysis

Overview

Menu

Production Facility Management  Status analyses  ABC analysis

Transaction code

stabc

Function authorization

stabc

Purpose

This report lists all malfunctions that occurred while the selected machine was running. The ABC analysis

is intended to be a pure report on "Failures" = "Malfunctions". For this reason, the status "Production" is not

evaluated.

The statuses are sorted according to the "Pareto Principle" - i.e sorted according to their size, summed up

and classified - and classified as A, B and C depending on how long the status lasted. The threshold values

are configurable.

Selection criteria

The application provides the following selection criteria:

Workplace

Defines the workplace for which the ABC analysis is to be displayed.

Status type

Restricts the displayed error messages to one status type (depending on license or project).

Threshold value 1

Parameter  used  to  set  the  ABC  threshold  values.  For  threshold  value  1,  the  threshold  is  defined

between the limits A and B. The predefined value is 50 %.

Threshold value 2

Parameter  used  to  set  the  ABC  threshold  values.  For  threshold  value  2,  the  threshold  is  defined

between the limits B and C. The predefined value is 30 %.

Date from …to (Shift / Time)

The error messages of the selected period of time are used.

Field descriptions

Status

Status number. The coloring is based on the status text configuration.

MDE-KZM_82.docx

Version: 1.0.23049

Page 52 of 59

Complex Status Models

Status text

Status name

Status type

The selection criteria restrict the displayed status type (depending on license or project). For example,

the selection criteria provide the following status types:

  Machine status

  Malfunction

  Operation mode

  Operation state

  Program

  …

Status type designation

Designation of the active status type

Duration, %

Total status duration indicating how long the status was active at the machine and percentage of the

total duration.

Quantity, %

Number  indicating  how  often  this  status  was  active  at  the  machine  and  percentage  of  the  total

number.

Shift

Shift number indicating the shift when the status was active.

Shift start / End of shift

Beginning and end of shift during which the status was active.

Detail application ABC analysis

The detail application ABC analyses provides a sum total of all accrued durations and displays the number

of individual postings included. The data is classified in the three classes A, B and C. The classification is

based on the percentages referring to the total duration. The values are totaled according to the "Pareto

principle", i.e. the individual rows are sorted by their size in descending order into the classes A to C and

added to the class until the total sum  exceeds the threshold  value (to be more precise: threshold value

specified 100 %). Then the next class is filled.

MDE-KZM_82.docx

Version: 1.0.23049

Page 53 of 59

Complex Status Models

Detail application Individual listing

If  you  select  a  row  in  the  ABC  analysis,  the  Individual  listing  shows  the  individual  rows  included  in  the

selected row.

MDE-KZM_82.docx

Version: 1.0.23049

Page 54 of 59

Complex Status Models

10  Status Ranking List

Overview

Menu

Production Facility Management  Status analyses  Status ranking list

Transaction code

sthitl

Function authorization

sthitl

Purpose

The  Status  ranking  list  provides  an  overview  of  the  most  frequent  or  longest  lasting  statuses.  The  list

indicates the duration and number of machine events collected as status. Also included in this overview are

production statuses (statuses assigned to RPA 11) and break statuses.

There are two sorts of statuses: The machine/workplace status which is often referred to as "Downtime

reason" or "Malfunction", and the further parallel statuses, e.g. program, operation type, operation mode or

disturbances and production interruptions (depending on the license/project).

Selection criteria

The application provides the following selection criteria:

Workplace

Workplaces/machines matching the criteria entered.

Group

Search by workplaces/ machines that are assigned to the group that was entered.

Date

Data should be selected from the entered period of time.

When selecting by shift(s), the shift date is evaluated, when selecting by time the selection is based

on the start date. Please keep in mind that a selection by shift is only supported with BDE and MDE

data, not with WRM data.

The  display  shows  the  evaluation  of  the  selected  period  of  time  whether  the  data  is  already

archived or not.

Shift/ time

Selection according to shifts (HYDRA-BDE and HYDRA-MDE events only) or according to periods.

If no shift is selected, all shifts are integrated.

Both times refer respectively to the start or end of the date period specified above.

MDE-KZM_82.docx

Version: 1.0.23049

Page 55 of 59

Complex Status Models

Report group

This selection criterion refers to the report groups. The application shows all workplaces/machines

assigned to the selected report group.

Responsibility area

This selection criterion refers to the responsibility area in the machine master data. Please note that

you may only view those machines you are authorized for by the responsibility area.

Top

Limits the number of statuses displayed for each selected machine to those with the longest duration.

Pre-assignment: 5

Status type

Selection  of  status  types  that  are  included  in  the  evaluation.  By  default,  the  machine  status  is

available here; further status types are available depending on the license.

Field descriptions

Resource

Workplace/machine number

Resource type

For workplaces/machines always "MNR"

Designation

  Designation of the workplace/machine

Status, Status text

Status number and status text of the status that was available. The status text is displayed in the

status text color that was configured.

Duration

Duration indicating how long the current status was available.

Total number

Number of times a status was available.

Status type

Description of the status type a status belongs to. By default, the machine status is available here;

further status types are available depending on the license or the project.

MDE-KZM_82.docx

Version: 1.0.23049

Page 56 of 59

Complex Status Models

11  Minor/Major Stops

Overview

Menu

Production Facility Management  Status analyses  Minor/major stops

Transaction code

minmaj

Function authorization  minmaj

Purpose

This report shows production interruptions for a selected machine. Subject to their duration, interruptions

are classified as minor and major stops. Minor stops are shorter interruptions. They do not affect production

processes,  as  they  are  compensated  by  buffer  times.  But  if  a  "minor  stop"  exceeds  a  threshold  value

previously specified, it becomes a "major stop".

In the lists of the minor and major stops, all stops with the same cause or the same text are summarized in

one position. The single causes are listed by expanding one cause. The last stop that occurred is shown at

the top of the list.

Selection criteria

The application provides the following selection criteria:

Workplace

Defines the workplace for which the stops are to be displayed.

Date from …to (Shift / Time)

The stops of the selected period of time are used.

Status type

Restricts the displayed stops to one defined status type.

If you did not select a status type, the status type Machine status (MST) is selected by default.

Minor/major thresholds

This threshold specifies, if a stop is a minor or a major stop. The predefined value is 5 minutes.

Detail application General

MDE-KZM_82.docx

Version: 1.0.23049

Page 57 of 59

Complex Status Models

Graphic presentation of the total time and how the time is distributed in percent to minor and major stops.

Detail application Minor report

The Minor report shows the selected stops of the selected machine. The duration of the displayed stops is

shorter than the minor/major threshold entered.

Detail application Major report

The Major report shows the selected stops of the selected machine. The duration of the displayed stops is

longer than the minor/major threshold entered.

Field descriptions

Status

Status number and also cause of the accrued stop.

Status text

Status text of the status.

Status type

The selection criteria restrict the displayed status type. For example, the selection criteria can provide

the following status types (depending on license or project):

  Machine status

MDE-KZM_82.docx

Version: 1.0.23049

Page 58 of 59

Complex Status Models

  Malfunction

  Operation mode

  Operation state

  Program

  Sequencer A - module

  Sequencer A - programs

  Sequencer A - steps

  Sequencer B - module

  Sequencer B - programs

  Sequencer B - steps

  Sequencer gen. - status

Status type designation

Designation of the active status type

Start / End

Beginning and end of stop

Duration, %

Total stop duration indicating how long the stop was active at the machine and percentage of total

duration.

Quantity, %

Total status number indicating how often this status was active and percentage of the total number.

Shift

Shift number indicating the shift when the stop occurred.

Shift start / End of shift

Beginning and end of shift during which the stop occurred.

MDE-KZM_82.docx

Version: 1.0.23049

Page 59 of 59

