Manual

Extended Terminal Functions
AIP-EBM 8.2

Version 1.2.23049

Last changed on: 01.09.2020

Extended Terminal Functions

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

AIP-EBM_82.docx

Version: 1.2.23049

Page 2 of 9

Extended Terminal Functions

Contents

1  Extended terminal functions ......................................................................... 4

2  Assigning a workplace to several terminals ................................................. 5

3  Assigning more than 16 workplaces to a terminal ....................................... 9

AIP-EBM_82.docx

Version: 1.2.23049

Page 3 of 9

Extended Terminal Functions

1  Extended terminal functions

Purpose

You use the function package if you require one of the following features for the collection of data:

  You want to perform postings for one workplace (e.g. a very large line) in two or three terminals.

  You want to assign more workplaces to one terminal than the maximum number allowed.

Integration

This function can be integrated in the products BDE, MDE, MPL and WRM to extend the possibilities of

data collection in the AIP terminal.

Features

  You can assign a HYDRA workplace/machine to more than one terminal (max 3).

  Manual postings are synchronized in all terminals assigned to one machine. The performed postings

are promptly displayed on all logically connected devices. Example: An operation has been logged on

to machine 24 (terminal 1). The operation at machine 24 should promptly be "visible" on terminal 2.

  You can assign more than 16 workplaces/machines to one terminal. In this context, the data quantity

and the performance of the devices is decisive.

Depending on the configuration, specific communication technologies are used  that can lead

to a different processing logic compared to the processing without this configuration.

We strongly  recommend  to  analyze  the  requirements  in  detail  and  to  test  the  collection  and

posting processes in a test environment.

AIP-EBM_82.docx

Version: 1.2.23049

Seite 4 von 9

Extended Terminal Functions

2  Assigning a workplace to several terminals

Purpose

You can use the configuration described in this section if you want to collect data as follows:

  A  shop  floor  client  (AIP)  runs  in  the  so-called  combined  operation,  i.e.  the  Process

Communication  Controller  (PCC)  runs  in  the  same  hardware  as  the  AIP  and  does  not  have  an

individual terminal number.

  You  want  to  assign  the  workplace  assigned  to  this  shop  floor  client  (AIP)  to  one  or  two  further

shop floor client(s).

Requirements

In addition to the license, you must make specific configurations. The required configurations depend on

the scenario in use.

You cannot combine this terminal configuration with the configuration of a centralized MDE. You

can use a shop floor client either for the "combined operation" or the "centralized MDE".

Also note the following:



If  machines  are  monitored  automatically,  monitoring  may  only  be  performed  by  exactly  one  of  the

terminals (MDE terminal).



If quantities are recorded automatically, automatic quantities may only be collected by exactly one of

the terminals (MDE terminal).

  You must not process data (BDE or MDE processing) in different ways in one terminal. The data of all

workplaces assigned to a terminal must be processed in the same way.

  When  assigning  a  workplace  to  several  terminals  (maximum  3),  the  number  of  terminals  should  be

kept  to  a  minimum.  The  communication  between  terminals  increases  significantly  and  may  have  a

negative effect on the availability of terminals.

  Workplaces assigned to several terminals must not have a workplace/machine status configured with

the control indicator "no order".

  The list of batches logged on to the AIP ("3rd list") is not part of the synchronization function.

  The  posting  volume  and  the  posting  frequency  in  the  terminals,  especially  during  a  shift  change,  is

important: in a  worst-case scenario, there may be problems with synchronization and thus incorrect

postings.

  Customizations are not compatible by default. We recommend to test this previously.

AIP-EBM_82.docx

Version: 1.2.23049

Seite 5 von 9

Extended Terminal Functions

Configuration: Terminal with MDE data collection

Configure as follows:

MOC: Terminal configuration

Configure the terminal in the Terminal configuration and set the terminal type to "AIP" (850). Enable the

options "Operated as BDE terminal" and "Operated as MDE terminal".

MOC: Workplace terminal assignment

Workplaces  for  which  the  terminal  records  signals:  Assign  the  workplaces  to  the  terminal  in  the

Workplace terminal assignment.

MOC: INI configuration

If  the  MDE  terminal  performs  machine  monitoring  plus  counter  recording,  also  make  the  following  INI

configurations:

Name
Section
Key
Value
Active
Comment (optional)

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

MDE
GET_COUNTER_FROM_MDE_TERMINAL
SHIFT_THRESHOLD
300


The processing logic of these options is described in the document MBL_Distributed_MDE_Counter.pdf.

Configuration ctaip.ini

Activate the direct AIP communication in the ctaip.ini of the AIP 8.2.

[DLL]

BusDLL=PCC.EXE

Activate the gateway communication:

[GateWay-Communication]

Active=true

PCC configuration (pcc.ini)

Make the following settings in the local configuration file pcc.ini in the PCC directory.

AIP-EBM_82.docx

Version: 1.2.23049

Seite 6 von 9

Extended Terminal Functions

[GateWay-Communication]

; Activate the connection “AIP8.2 -> PCC”

Active=true

[HOST]

; Activate the connection “PCC -> AIP8.2”

Active=1

[WSK]

; Deactivate PDM-connection to HYDRA server

; Host=<Host name or IP address of the HYDRA server>

; User=<Terminal number of PCC according to MOC configuration>

[Server-Communication]

; Deactivate communication to the HYDRA server via EVCOM

Active=0

Terminal restart

Restart the terminal after having configured the AIP.

Configuration: Terminal used for data display and manual input

If you only use the AIP 8.2 for the data display and the manual input, make the following configurations or

check these configurations:

MOC: Terminal configuration

In the Terminal configuration, deactivate the option "Operated as MDE terminal" for the terminal.

MOC: Workplace terminal assignment

For  all  assigned  workplaces,  you  must  set  the  option  Processing  to  Processing  according  to  operation

mode of terminal.

Configuration ctaip.ini

Deactivate  the  direct  AIP  communication  in  the  ctaip.ini  of  the  AIP  8.2.  To  do  so,  comment  out  the

following configuration (precede the rows by a semicolon):

; [DLL]

; BusDLL=PCC.EXE

Activate the gateway communication:

[GateWay-Communication]

Active=true

AIP-EBM_82.docx

Version: 1.2.23049

Seite 7 von 9

Configuration hytnrcfg.ini

To enable the transfer/synchronization of the machine status, make the following entry in the hytnrcfg.ini

(%HYDRADIR%\<Hydra instance>\custom\aip, e.g. D:\hydra\1\custom\aip\hytnrcfg.ini):

Extended Terminal Functions

Activate in all terminals:

[Tnr Konfiguration 0]

FollowExternStatus=on

Activate only in specific terminals:

You must enter "2000 + terminal number" as number.

Example for terminal 221: 2000 + 221 = 2221:

[Tnr Konfiguration 2221]

FollowExternStatus=on

Terminal restart

Restart the terminal after having configured the AIP.

AIP-EBM_82.docx

Version: 1.2.23049

Seite 8 von 9

Extended Terminal Functions

3  Assigning more than 16 workplaces to a terminal

Purpose

You can assign more than 16 workplaces/machines to one terminal. In this context, the data quantity and

the performance of the devices is decisive.

Requirements

Note the following before assigning more than 16 workplaces:

  The  number  of  machines  that  you  can  assign  to  one  terminal  depends  on  the  posting  volume,  the

data volume and the performance of the terminal hardware.

A big number of postings can result in conflicts during operation. And in case of network failures, a

high posting volume results in longer waiting periods until the local queues are emptied.

  The maximum number of machines per terminal is limited to 32 (technical limit).

  The  posting  volume  and  the  posting  frequency  in  the  terminals,  especially  during  a  shift  change,  is

important: in a  worst-case scenario, there may be problems with synchronization and thus incorrect

postings.

We recommend to analyze the requirements in detail and to test the collection and posting

processes in a test environment.

AIP-EBM_82.docx

Version: 1.2.23049

Seite 9 von 9

