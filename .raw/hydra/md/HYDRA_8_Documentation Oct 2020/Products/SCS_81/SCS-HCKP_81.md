Manual

Connecting Kaba Termial for
Time&Attendance collection
SCS-HCKP 8.1

Version 1.0.23049

Last changed on: 02.09.2020

Connecting Kaba Terminals

Copyright

©Copyright 2020 All rights reserved.

SAP® and all associated logos are trademarks or registered trademarks of SAP SE in Germany and other countries.

Windows®  and  all  associated  logos  are  trademarks  or  registered  trademarks  of  Microsoft  Corp.,  Redmond/Washington,  USA  in
Germany and other countries.

ORACLE® is a registered trademark of Oracle Corporation, California, USA.

MPDV®, HYDRA®, SIS® and MES-Cockpit® are registered trademarks of MPDV Mikrolab GmbH.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

SCS-HCKP_81.docx

Version: 1.0.23049

Page 2 of 44

No liability is assumed for typographical errors. The information contained in this documentation is subject to change without prior
notice.

Contents

Connecting Kaba Terminals

1  Connecting the Kaba terminals to collect time & attendance ....................... 5

2  KABA-Connector Collecting Working Hours (Time & Attendance) .............. 6

2.1  Requirements ...................................................................................................... 6

2.2  Supported terminal types..................................................................................... 6

2.3  Administration ..................................................................................................... 7

2.4  Configurations in HYDRA .................................................................................... 7

2.4.1  Authorization to clock-in and out .............................................................. 7

2.4.2  Configuration of accounts ........................................................................ 7

2.4.3  Configuration of the account info ............................................................. 7

2.4.4  Terminal configuration ............................................................................. 8

2.5  Configuration of the B-COMM ........................................................................... 10

3  B-COMM Control ........................................................................................ 14

Installation BCOMM-Connector ....................................................................... 18

Installation ........................................................................................................ 19

3.1  Requirements .................................................................................................... 19

3.2

Install HYDRA update ....................................................................................... 19

3.3  HYDRA server: measures ................................................................................. 19

3.4

3.5

3.6

Import licenses .................................................................................................. 21

Installation Kaba B-COMM ................................................................................ 21

Installation of the BCOMM connector ................................................................ 23

4  Update ........................................................................................................ 28

4.1

Install update ..................................................................................................... 28

4.2  Update the connector ........................................................................................ 29

5

Implementation/configuration of terminals in B-COMM ............................. 30

5.1  Requirements for KABA terminals ..................................................................... 30

5.1.1  General ................................................................................................. 30

5.1.2  Configuration files of the terminal .......................................................... 30

SCS-HCKP_81.docx

Version: 1.0.23049

Page 3 of 44

Connecting Kaba Terminals

5.2  Configure terminal in Kaba B-COMM ................................................................ 37

5.2.1  Terminal to collect Time & Attendance (SCS HCKP) ............................. 37

5.3  Configure terminal in HYDRA ............................................................................ 37

5.3.1  Configuring the terminal for Time & Attendance in HYDRA ................... 37

6  Check result and troubleshooting............................................................... 38

6.1

Logging ............................................................................................................. 38

6.1.1  Status page of the BCOMM connector .................................................. 38

6.1.2  Application: B-COMM Control ................................................................ 40

6.1.3  HYDRA system logs .............................................................................. 40

6.1.4

Log files of the BCOMM connector ........................................................ 40

6.2  Mirror files ......................................................................................................... 41

6.3  Terminal classes ............................................................................................... 41

6.4  Upload a parameter file of the terminal .............................................................. 41

6.5  Possible issues ................................................................................................. 42

6.5.1

Invalid badges ....................................................................................... 42

6.5.2  New terminals do not receive data ......................................................... 42

6.5.3  Check communication user BCOMM connector .................................... 43

SCS-HCKP_81.docx

Version: 1.0.23049

Page 4 of 44

Connecting Kaba Terminals

1  Connecting the Kaba terminals to collect time & attendance

Purpose

You can connect hardware for personnel time recording (PZE) from Kaba with the product SCS-HCKP 3.0

to HYDRA.

Implementation notes

You use the product SCS-HCKP 3.0 if the following conditions apply:

  You want to connect the Kaba PZE hardware to HYDRA.

  You want to record personnel times (clock-in, clock-out, pause, and error reason clock-ins) on the

Kaba PZE hardware and transfer the data to HYDRA for Personnel Time Management.

  You want to display account statuses managed in HYDRA on the KABA PZE hardware.

Integration

You need the KABA communication software B-COMM to use the product SCS-HCKP 3.0.

Features



Interface for the transfer of clock-in, clock-out, break and error reason of the Kaba PZE hardware

to HYDRA



Interface for the transfer of account balances to the Kaba PZE hardware.

  Offline buffering of postings when HYDRA is not available.

SCS-HCKP_81.docx

Version: 1.0.23049

Page 5 of 44

Connecting Kaba Terminals

2  KABA-Connector Collecting Working Hours (Time &

Attendance)

The SCS-HCKP provides the license for the standard interface (KABA connector to collect working hours)

between  HYDRA  and  the  B-COMM  (communication  software  by  dormaKABA).    The  KABA  connector

connects the PZE hardware from KABA to HYDRA to collect working hours.  You can connect HYDRA with

the KABA communication software B-COMM.

2.1  Requirements

  You must have a license for the communication software B-COMM (KB-BCOM25/KB-BCOME) and

3.16 newly must be installed in order to use the whole function range of the SCS-HCKP.



If  the  B-COMM  was  installed  by  the  customer,  we  advise  to  perform  an  analysis  before  the

implementation.

  You  also  need  the  software  option  B-Comm  Parameter  editor  for  the  B-COMM  data

communication. We also recommend to use the software option B-COMM User management. This

option  offers  the  possibility  to  protect  the  user  interface  of  the  B-COMM  (B-COMM  GUI)  with  a

password.

  The software support the following badges:

o  MPDV Legic prime KGH with SSC 2C

o  MPDV  "KGH"  Legic  Advant  ISO  14443A  with  SSC  2C  (for  combi  cards  (Legic

Prime/Advant)

o  MPDV "KGH" Legic Advant ISO 15693 with SSC 2C (for true Legic Advant badges)



If you have terminals in different time zones, you need a HYDRA system for each time zone. The

terminals, the KABA connector and the corresponding HYDRA system must operate in the same

time zone.

  A combination between PZE and ZKS is not released for the same terminal.

  HYDRA service pack 13 must be installed and activated.

  You must update  your terminals before the connection with the latest released program version

from dormaKABA.

2.2  Supported terminal types

The following terminal types are released for SCS-HCKP:

Terminal

B-net 9340 HR2

B-web 9300 HR10

B-web 9600 K5 HR20

B-web 9700 K5 HR30

SCS-HCKP_81.docx

Version: 1.0.23049

Page 6 of 44

Connecting Kaba Terminals

2.3  Administration

The KABA connector's installation is not included in the HYDRA installation. The connector is installed with

B-COMM if required. The KABA connector is installed parallel to the B-COMM.

The KABA connector runs on the HYDRA server in Windows as a service or in Linux as a daemon.  This

service/daemon starts automatically when the server starts.  The KABA connector operates independently,

if HYDRA is started or not. It also works offline. If HYDRA is shut down, the KABA connector continues to

accept  postings  (e.g.  access  logs)  and  stores  this  data  on  the  hard  drive.  Once  HYDRA  is  started,  the

connector transfers the postings to HYDRA.

2.4  Configurations in HYDRA

Most of the configuration collecting working hours (time & attendance) is executed in HYDRA.  Only the

language setting is configured in B-COMM.  The following chapters describe the configurations and settings

in HYDRA.

2.4.1 Authorization to clock-in and out

The  assignment  of  clock-in  and  out  authorizations  for  the  personnel  managed  in  HYDRA  is  performed

Clocking authorizations in HYDRA via the application. You specify in the application Clocking authorizations

the PZE terminal and where the person is permitted to clock-in.

2.4.2 Configuration of accounts

You make the general changes to the account names in the Configuration of accounts. In the application

Configuration of accounts you can define the names of the individual accounts and, as a result, the names

displayed on the KABA terminal.

2.4.3 Configuration of the account info

In  the  application  Configuration  of  the  account  information  you  can  specify  the  name  of  the  individual

accounts for a person, cost center, area, department, sub group, activity, employment status, or person

does  not  clock-in.  Therefore,  you  can  Configuration  of  the  account  information  specify  the  names  for  a

subgroup on the KABA terminal.  If there is no entry in the field, then the name is used.

SCS-HCKP_81.docx

Version: 1.0.23049

Page 7 of 44

Connecting Kaba Terminals

2.4.4 Terminal configuration

2.4.4.1

Terminals

KABA terminal to collect working hours must be set up in the Terminal configuration . The following fields

are relevant for these terminals:

Configurations in the tab General

Terminal

Terminal number to clearly identify

Active

Only active terminal are processed by the KABA connector.

Type

You store in this field the terminal type of the KABA terminal.  The KABA connector only processes

terminals that are assigned to the type KABA in the field Type.

        Type                   Description

            80                    KABA 9300

            85                    KABA 9600

            90                    KABA 9700

Terminal class

The terminal class specifies the terminal settings. Leave the terminal class in the standard empty so

that  the  terminal  class  is  filled  with  the  value  from  the  Type  field.  It  may  be  necessary  to  store  a

different terminal class for customer-specific processing.

Operated as HYDRA-PZE/ZKS terminal

Activate the option Operated as PZE/ZKS terminal.

Cycle duration of status messages

Specification of the time interval in hours and minutes when the KABA connector reports the terminal

status to HYDRA.

IP address

The terminal's IP address. For KABA terminals, enter the group ID and the DeviceID (GID and DID)

of the terminal after the IP address, separated by a semicolon (example: 192.168.10.213; 0105).

SCS-HCKP_81.docx

Version: 1.0.23049

Page 8 of 44

Company number/system number

The value entered in this field can override the system number defined in the HYDRA Basic settings

Connecting Kaba Terminals

for individual terminals.

Configurations in the tab HR functions

Operation mode

Set the operating mode Automatic status or Manual status changeover.

Cyclic loading

This is the time when change in the authorization to clock-in or out is transferred to the terminal.  If

you  check  the  option  Reload  authorizations  in  the  Terminal  administration  of  the  Terminal

configuration, you can define that modifications are transferred to the terminal at the latest after the

end of the Cycle duration of status messages (if the terminal is online).

The KABA connector promptly reads changes in the configuration for terminals. In case of a new

terminal, you must first define the terminal configuration and the access points. Then you must

check the option Reload program in the Terminal administration of the Terminal configuration to

transfer the configurations to the terminal.

Return time

You use this field to specify the time that the terminal waits before returning to default status (auto

status, for example) after a key is pressed.

Terminal administration in the toolbar

Terminal from, to

You can change the Terminal administration for one or several terminals.

Activate terminal

Use the option Activate terminal to enable or disable in one action the field Active for all pre-selected

terminals.

Reboot

If  you  check  the  option  Reboot,  all  pre-selected  terminals  are  rebooted.  After  the  next  status

message,  the  connector  informs  the  terminal  about  the  reboot.  The  reboot  is  therefore  executed

within the time period entered in the field Cycle duration of status messages (if the terminal is online).

Next reboot on

In the field Next reboot you can enter the point in time of the reboot. Once this point in time is reached,

the terminal is only rebooted after having sent the next terminal status.

SCS-HCKP_81.docx

Version: 1.0.23049

Page 9 of 44

Connecting Kaba Terminals

Reload program

If you check this option, the complete HYDRA configuration is loaded on to the terminal. All badges

on the terminal are first deleted and then reloaded. During the deletion process and the reboot the

badges  with  authorization  might  not  get  access  for  several  minutes.  The  access  terminal  is  also

rebooted which means the reader does not work for several minutes.

Reload authorizations

If you check the option Reload authorizations, all changes to accesses, access time models, opening

hours and public holidays are transferred to the terminal. This at the latest after the end of the time

entered in the field Cycle duration of status messages (see field Cyclic loading in the tab HR functions

of the application Terminal configuration).

Authorizations are not located on the terminal, but the B-COMM. The option Reload authorization updates

the clock-in and out authorizations in the B-COMM.

2.5  Configuration of the B-COMM

2.5.1.1

Language settings

The language setting of the KABA Terminal are performed in the B-COMM.

The standard setting is in German, English and French.  You can switch the language on the KABA terminal.

Proceed as following to set the language:

1.  Click in the B-COMM menu on "Configuration" and select "Parameter editor".

SCS-HCKP_81.docx

Version: 1.0.23049

Page 10 of 44

Connecting Kaba Terminals

2.  Select the KABA terminal that you want to configure and confirm with "Ok".

3.  The  parameter  editor  opens.    Select  in  the  parameter  editor  and  open  in  the  menu  the  option

"Character set and language".

SCS-HCKP_81.docx

Version: 1.0.23049

Page 11 of 44

Connecting Kaba Terminals

4.  Click on "Use" or "Not use" if you want to select or deselect a language.  You can scroll with the

button "Upward" or "Downwards" to set the sequence of the KABA hardware language.

5.  Press "Save"

6.  Reboot the B-COMM after setting the language.

SCS-HCKP_81.docx

Version: 1.0.23049

Page 12 of 44

Connecting Kaba Terminals

2.5.1.2  Customizing the KABA layout

Refer to the KABA user manual or contact KABA directly if you want to change the KABA hardware layout

(e.g. inserting your own company logo).

MPDV does not support customizations of this type.  Furthermore, MPDV does not take over any warranty

for the effect of a customization of this kind.

2.5.1.3  Configuration changes

Do not change the following configuration in the B-COMM to ensure the connection from the HYDRA to the

KABA hardware functions properly:

  The assignment of the key as the KABA hardware might not be compatible with HYDRA anymore.

SCS-HCKP_81.docx

Version: 1.0.23049

Page 13 of 44

Connecting Kaba Terminals

3  B-COMM Control

Menu

System administration  Terminals  B-COMM control

Transaction code

bcctrl

Function authorization

bcctrl

Purpose

The application "B-COMM control" is an application of the system administration. Using this application,

you can check how the B-COMM connector is triggered by the other functions of the server.

An important feature of the application "B-COMM control" is to identify the badges which were subject to a

modification in the MOC and which were - as a consequence - resynchronized with the KABA terminals via

the B-COMM connector.

The application monitors how the connector is triggered. Creating or modifying data records is

reserved to maintenance or service purposes and is only carried out by MPDV or upon MPDV's

instructions.

Requirements

You must install and license the functions required to connect KABA terminals to the B-COMM connector.

SCS-HCKP_81.docx

Version: 1.0.23049

Page 14 of 44

Connecting Kaba Terminals

Field descriptions

Number

Every time a HYDRA function triggers the B-COMM connector, the system automatically generates

a  unique  consecutive  number.  The  B-COMM  connector  processes  the  jobs  in  the  order  of  these

numbers.

Type

Constantly "B-COMM"

Name

Defines the triggered job. Up to now, there is only a single job to be triggered:

UPDATE_BADGE:

This job resynchronizes the badge number entered in the field "Data" with the KABA ZKS

terminals.

Data

With name „UPDATE_BADGE“:

This job resynchronizes the badge number entered in the field "Data" with the KABA ZKS

terminals.

Status

The following statuses can be entered:

"To do"

The connector is going to process the data record within little time.

"In process"

The B-COMM connector is processing the data record.

"Done"

The data record was processed successfully.

"Done error"

An error occurred during processing. In this case, you can find further information in the error log

of the B-COMM connector.

"Cancelled"

You can enter the status "Cancelled" manually for a specific data record. Exceptionally, you assign

the  status  "Cancelled"  manually,  if  the  B-COMM  connector  cannot  process  the  data  record  for

technical reasons.

"Reactivated"

SCS-HCKP_81.docx

Version: 1.0.23049

Page 15 of 44

Connecting Kaba Terminals

Reserved for future add-ons:

You can assign the status "Reactivated" to a completed data record, if you want to process it again.

Technically, this status is identical to the status "To do".

"New"

Reserved for future add-ons:

The data record exists, but cannot be processed yet.

"Unknown" and

"Done unknown"

Reserved for future add-ons.

Priority

A priority is provided for future add-ons. The current priority value is always 50.

Recipient

Specifies the recipient e.g. in case there are several active B-COMM connectors.

Origin

Optional technical ID of the HYDRA function that has triggered the job.

Created by/Created on

Specifies the connector and time of connection.

Modified by / Modified on

Specifies the last connector and the time of modification.

Description of the fields Name and Data

REFRESH_BADGES

This job updates all badges/master data and the corresponding access authorizations in all terminals.

The connector triggers this job on a  daily basis right  after midnight. As  you cannot assign validity

periods to the data in KABA terminals, you must update the authorizations in the terminals on a daily

basis in case the badges or other configurations expire or are generated in HYDRA.

REFRESH_TERMINAL_TIME_MODELS

The  connector  triggers  this  job  cyclically.  According  to  the  settings  in  the  terminal,  the  connector

reloads the authorizations cyclically. This way, modifications to access time models or opening hours

are communicated to the terminals.

The data field provides the terminal number.

SYNC_BADGE

The HYDRA server triggers this job when you modify badges or access profile assignments, which

are  relevant  to  the  connector.  Using  this  job,  you  promptly  communicate  the  new  badges  to  the

terminals. At the same time, you delete the expired badges in the terminals.

SCS-HCKP_81.docx

Version: 1.0.23049

Page 16 of 44

Connecting Kaba Terminals

The data field provides the badge number.

The following actions trigger this job:

-  You modify the validity status of badges.

-  You modify the HR master data and change the validity status of a badge.

-  You modify access profile assignments and change authorizations currently valid and relevant to

the connected terminals.

-  You modify the validity status or the access profile assignment of a badge via the interface HR-

PDC (mini HR master data).

REFRESH_TERMINAL_BADGES

This job updates all badges/master data and the corresponding access authorizations in a terminal.

The connector triggers this job if it identifies that the option "Reload authorizations" was checked in

HYDRA via the terminal administration function.

The data field provides the terminal number.

RELOAD_TERMINAL_BADGES

This job initializes the terminal and updates all badges/master data and  the corresponding access

authorizations  in  a  terminal.  The  connector  triggers  this  job  if  it  identifies  that  the  option  "Reload

program" was checked via the terminal administration function in HYDRA.

The terminal initialization is based on the commands in the terminal classes.

The data field provides the terminal number.

RESTART_TERMINAL

The connector triggers this job if it identifies that the option "Reboot" terminal was checked in HYDRA

via the terminal administration function.

NEW_BCOMM_TERMINAL

The HYDRA server triggers this job if you create a new terminal whose terminal type is relevant to

the connector. The job is also triggered if the terminal type is modified and hereafter becomes relevant

to the connector.

As a consequence, the connector identifies the new terminal and tries to load the data.

Data retention

You can configure the data retention of this application in the Data management  for the object BCOMM-

CONN  (product  HYD).  The  default  value  for  data  retention  is  70  days.  Once  the  configured  period  has

expired, the data are deleted.

SCS-HCKP_81.docx

Version: 1.0.23049

Page 17 of 44

Installation BCOMM-Connector

Connecting Kaba Terminals

SCS-HCKP_81.docx

Version: 1.0.23049

Page 18 of 44

Connecting Kaba Terminals

Installation

3.1  Requirements

  HYDRA system including Service Pack 12 for HYDRA 8
  Kaba B-COMM installation or installation media for B-COMM including licenses.

3.2

Install HYDRA update

First of all, you install an update of the software for the HYDRA systems where Service Pack 13 (October

2018) has not yet been installed.

The update includes a separate installation guide.

You can find the current system version including service pack information in the file "sp.txt" in the HYDRA

directory of the HYDRA server.

In this case, proceed as described in chapter "3.3 HYDRA server: measures"

3.3  HYDRA server: measures

The  requirements  for  the  HYDRA  server  have  already  been  met  and  no  further  installation  is

required if you have a HYDRA system with Service Pack 13 (October 2018) that was installed for

the first time.

If this is the case, proceed as described in chapter "0 Check and change the script file (data

management)

The interface of the B-COMM software uses a new database table to manage actions controlled

by time or events. Integrate this table in the data management process to ensure the entries in

this database table will be deleted after a specified interval. To do so, manually add an entry to

the file hyarc.scr in the HYDRA directory of the server.

...
# Data management BCOMM control (only with licenses SCS-HCKP or SCS-HCKZ )
if [ `hyliz.exe -r SCS-HCKP` -gt 0 -o `hyliz.exe -r SCS-HCKZ` -gt 0 ]
         then
  echo "Datenmanagement BCOMM-Ansteuerung:" >> $ERRPATH/hyarc.pro
  hymwarc.exe -d -z "PROD=HYD|OBJ=BCOMM-CONN|REORG_VERW_TABLE=1|" > $ERRPATH/hymwarc_hyd_bcomm_conn.pro
  cat $ERRPATH/hymwarc_hyd_bcomm_conn.pro >> $ERRPATH/hyarc.pro

  # File names of system logs
  sleep 1
fi
...

HYDRA systems with an initial installation date after September 2017 include service pack 11

and the above mentioned entry.

1.  Open the file hyarc.scr with a text editor in the HYDRA directory of the server.

SCS-HCKP_81.docx

Version: 1.0.23049

Page 19 of 44

Connecting Kaba Terminals

2.  Use the search function of the text editor to check if the entry already exists. Search for the

text BCOMM-CONN. If you find the text, skip step 3.

3.  Add the entry if it does not exist. Open the file hyarc.bsp which includes the entry as a

template and copy the entry into hyarc.scr.

Import licenses"

If the initial installation of your HYDRA system does not include service pack 13, you need to update the

current installation on the HYDRA server. Even if you have installed the current service packs, the system

requires an update. This affects HYDRA systems first installed before October 2018.

Among others, this update prepares the HYDRA database for the Kaba B-COMM installation.

Execute database patch

Windows:

Open the folder HYDRA Administration on the HYDRA server desktop and click on the link to

start the MS-DOS prompt for the current instance.

Run the following command in the command line:

hydscr db_sql/dbp_bcomm_connector.hsc > dbp_bcomm_connector.pro

Linux: Connect to the HYDRA server via a telnet connection (for Unix) and start hysys.scr -1

(environment for instance 1).

Run the following command:

hydscr.out db_sql/dbp_bcomm_connector.hsc > dbp_bcomm_connector.pro

Windows and Linux:

Check if the patch is output in the file dbp_bcomm_connector.pro. No errors or warnings may

occur.

This database patch assigns the function authorization for the new application B-COMM control

(bcctrl) to all users having the function authorization for the application  system logs (syspro). If

necessary, you can still change the assignment of the function authorization bcctrl.

Check and change the script file (data management)

SCS-HCKP_81.docx

Version: 1.0.23049

Page 20 of 44

Connecting Kaba Terminals

The interface of the B-COMM software uses a new database table to manage actions controlled by time or

events. Integrate this table in the data management process to ensure the entries in this database table

will be deleted after a specified interval. To do so, manually add an entry to the file hyarc.scr in the HYDRA

directory of the server.

...
# Data management BCOMM control (only with licenses SCS-HCKP or SCS-HCKZ )
if [ `hyliz.exe -r SCS-HCKP` -gt 0 -o `hyliz.exe -r SCS-HCKZ` -gt 0 ]
         then
  echo "Datenmanagement BCOMM-Ansteuerung:" >> $ERRPATH/hyarc.pro
  hymwarc.exe -d -z "PROD=HYD|OBJ=BCOMM-CONN|REORG_VERW_TABLE=1|" > $ERRPATH/hymwarc_hyd_bcomm_conn.pro
  cat $ERRPATH/hymwarc_hyd_bcomm_conn.pro >> $ERRPATH/hyarc.pro

  # File names of system logs
  sleep 1
fi
...

HYDRA  systems  with  an  initial  installation  date  after  September  2017  include  service  pack  11  and  the

above mentioned entry.

4.  Open the file hyarc.scr with a text editor in the HYDRA directory of the server.

5.  Use the search function of the text editor to check if the entry already exists. Search for the text

BCOMM-CONN. If you find the text, skip step 3.

6.  Add the entry if it does not exist. Open the file hyarc.bsp which includes the entry as a template and

copy the entry into hyarc.scr.

3.4

Import licenses

Import licenses

Make sure that the licenses SCS-HCKZ and/or SCS-HCKP are available. If required, import the licenses

via the MOC. Start the application Licensing (System administration  System settings  Licensing) and

call the function Insert file. Select the file lizenz.dat.

Restart

After the import of licenses, you must restart HYDRA on the server. The restart must be performed  after

the update has been installed.

If you imported the licenses the day before or at an earlier time, you do not have to restart HYDRA. You do

not have to restart HYDRA if you want to proceed with the other steps the next day.

  Quit HYDRA on the server.

(Use the HYDRA manager for Windows systems, use hy_down.scr for UNIX systems).

  Then restart HYDRA.

(Use the HYDRA manager for Windows systems, use hy_start.scr for UNIX systems).

3.5

Installation Kaba B-COMM

Follow the B-COMM installation instructions to install the software. Meet  the following requirements and

recommendations to use the software with the HYDRA-BCOMM connector:

SCS-HCKP_81.docx

Version: 1.0.23049

Page 21 of 44

Connecting Kaba Terminals

-  Kaba recommends the following for the installation:

Use Common directory, but not the program directory. Use a separate directory that includes the

program and data. E.g. c:\B-COMM-hydra1.

-  Use bcommservicemanager.bat to install B-COMM server as a service.

o  The settings for the installation of the service are automatically made.

  Enter the Server IP address and the rmi control port as BCOMM rmi server host

und BCOMM rmi server port when installing the BCOMM connector.

  The other parameters are internal parameters of the B-COMM server. There are

no specifications for these parameters, i.e. the internal parameters are not relevant

for the connection of the connector.

-  Please check if the service is running. If necessary, start the service manually.

-

-

Import license file. Start the B-COMM GUI and select Import license file in the menu info/licensing.

If you have purchased the license for the software option B-COMM - Option User administration:

Log on to the B-COMM GUI as administrator/111111 for the implementation.

Kaba recommends:

If you are prompted to change the password, use the same value 111111 for the new password.

Customers and partners usually do not change this password.

You should inform MPDV if you change the password. If possible, document the password in the

CID.

-  Create a new instance, e.g. Hydra1. You also need the name of the instance when installing the

connector.

-  Select the function New channel in the instance to create a new channel with the following

properties:

o  Tab Network Parameter

  Network channel: activated

  Channel name: BCLAN01

  Host IP of the server

  UDP port: specification for the first channel: 30465 = 7701 [hex].

If  you  install  B-COMM  and  IL-HYDRA  in  parallel  or  if  you  install  several  B-COMM

instances on one server, make sure to assign unique UDP ports for the communication

with the terminals.

  With IL-HYDRA the port is 7700[hex] + GID, by default. The valid value range

is: 7700[hex] to 7729[hex] (30464 to 30505).

  For B-COMM the valid value range is: 7700[hex] to 77EF[hex] (30464 to

30703).

If you use IL-HYDRA and B-COMM in parallel, you should start with 7731[hex] (30513)

to assign ports in B-COMM. This avoids any overlapping with IL-HYDRA.

o  Tab Application interface

SCS-HCKP_81.docx

Version: 1.0.23049

Page 22 of 44

Connecting Kaba Terminals

  Do not specify the application interface for the channel first of all.  This is only
necessary, once the connector has been installed. If the connector is already
installed and running, activate the application interface and enter the IP address
of the HYDRA server.

o  Tab Time synchronization

  Activate time synchronization at an interval of 0.5 hours (also for DST/daylight

saving time).

o  All other tabs: Please do not change default settings.

3.6

Installation of the BCOMM connector

3.6.1.1

Information: HYDRA user BCOMM-CON

The  BCOMM  connector  needs  a  HYDRA  user  to  access  the  HYDRA  services.  The  system

automatically creates this user during the installation using a database patch.

User: BCOMM-CON

The HYDRA user is created with a default password. The encrypted password is stored in the

connector configuration. The installer encrypts the password during installation. If necessary, you

can change the password subsequently in the configuration file of the connector

(e.g. \\SERVER\Hydra\BCOMM_Connector\configuration\application_1.properties)

using the "DB Password Generator".

(If you enter the password with two prefixed hash signs "##" in the configuration files, the system

interprets this as an unencrypted password and uses it for the login.)

The user does not need authorizations for the responsibility area.

3.6.1.2

Installation of the BCOMM connector

Start the installation program

<hydradir>\fterm\BCOMM_Connector\setup\BCOMM_Connector\Installer.exe

or installer.sh

Then installation parameters are queried:

Please enter the HYDRA instance

This is the HYDRA system number the connector connects to.

SCS-HCKP_81.docx

Version: 1.0.23049

Page 23 of 44

Connecting Kaba Terminals

BCOMM connector device id

The first BCOMM connector in a HYDRA installation directory is assigned the number 1. If you want

to install several connectors in a HYDRA installation directory, you have to assign unique numbers

to the connectors.

BCOMM client name

From Kaba B-COMM: The instance including the channel to be managed (e.g. Hydra1).

BCOMM channel names

From  Kaba  B-COMM:  Name  of  the  channel  that  should  be  managed  using  the  connector  (e.g.

BCLAN01). The indication of several channel is reserved for future use.

Port of BCOMM connector

Unique port that is used to notify the BCOMM connector of changed configurations in HYDRA via

html protocol. The port number is e.g. 31101. The third number refers to the HYDRA system number

and the fifth/last number to the device ID of the connector.

The connector automatically stores this port number as INI configuration in the HYDRA database.

Consequently, the HYDRA root server can trigger the html notification via the web service provider

(WSP).

BCOMM rmi server host

Server hosting Kaba B-COMM (server name or IP). The value is assigned during installation of the

B-COMM server service or you can find the value in the group "B-COMM server" of the B-COMM

starter. Usually, B-COMM is running on the same server as HYDRA.

BCOMM rmi server port

RMI  control  port  of  the  Kaba  B-COMM  server  (the  value  is  assigned  during  installation  of  the  B-

COMM server service or you can find the value in the group B-COMM server of the B-COMM starter.

Usually, the value is 1099).

BCOMM connector application port

Enter this port as port of the  application interface in the B-COMM channel configuration. The port

must be unique in the HYDRA system (Kaba's default value: 3005 decimal).

Address of HYDRA8 WSP

This is the server of the HYDRA system the connector connects to (server name or IP).

Port of HYDRA8 WSP

This is the port of the HYDRA system the connector connects to.

Path to the JHYDRADIR

Path to JHYDRADIR in the HYDRA installation directory (<hydradir>\jhydradir). This path also

defines where the connector is installed. The connector is installed in the directory

<hydradir>\BCOMM_Connector.

SCS-HCKP_81.docx

Version: 1.0.23049

Page 24 of 44

Once you have entered the installation parameters, a confirmation prompt opens and you can review the

settings:

Connecting Kaba Terminals

Check the result:

1.  A service called HYDRA<n>_BCOMM_Connector_<d> is installed. <n> refers to the HYDRA

system number, <d> is the device ID of the connector.

2.  The service is started. If the service does not start automatically, start the service manually. The

initial automatic start can fail in Windows under certain circumstances.

3.  The folder BCOMM\<DeviceId> has been created in the directory <hydradir>\jhydradir.
4.  An INI configuration has been created in HYDRA:

BCOMMCONNECTOR/ADDRESS/<DeviceId>. The value consists of the HYDRA server and the
BCOMM connector port.

Copy terminal classes

Copy from the HYDRA server:

<hydradir>\javadeployment\sample-configs\JHYDRADIR\BCOMM_Connector\1\data

the subdirectory class including all other subdirectories into the folder:

<hydradir>\jhydradir\BCOMM_Connector\<DeviceId>\data

Replace <DeviceId> with the BCOMM connector device id assigned during installation (in general = "1").

Overwrite already existing files.

SCS-HCKP_81.docx

Version: 1.0.23049

Page 25 of 44

Connecting Kaba Terminals

3.6.1.3  Check and change installation parameters

subsequently

If required, you can check and change the parameters specified during installation in the configuration file

of the BCOMM connector after completing the installation routine. You can find this configuration file in

the subdirectory Configuration of the BCOMM connector installation directory (e.g.

\\SERVER\Hydra\BCOMM_Connector\configuration\application_1.properties).

3.6.1.4

Entry Application interface in Kaba B-COMM

Enter the application interface in the Kaba B-COMM channel configuration:

Enter the values as described above (previous process steps):

-  Configure channel in Kaba B-COMM

o  Tab Application interface

  Activate: Use an application interface

SCS-HCKP_81.docx

Version: 1.0.23049

Page 26 of 44

Connecting Kaba Terminals



IP or DNS of the server hosting the BCOMM connector (HYDRA WSP server
host).

  Port (BCOMM connector application port, by default 3005 decimal)

  Other: default settings

Stop the assigned BCOMM connector service to end a channel manually in the Kaba B-COMM.

If the channel is assigned to a BCOMM connector service and the service is running, the service

tries to restart its assigned channels at regular intervals.

SCS-HCKP_81.docx

Version: 1.0.23049

Page 27 of 44

Connecting Kaba Terminals

4  Update

4.1

Install update

Install the MPDV installation medium:

Preparation:   Downloading installation medium from the MPDV FTP server

1.  Log on to the MPDV FTP server using your access data and download the installation medium for this

service pack to your local PC.

2.  Save the installation medium downloaded via the FTP server (file extension .upd) and other affiliated

files in a local directory.

Note:

Microsoft  Windows  Internet  Explorer  automatically  suggests  the  file  extension  zip  when

downloading UPD files. For this reason, add the file extension “upd” manually when saving

the file. This is not required if you use other web browsers (e.g. Mozilla Firefox).

Perform the following steps for each instance if multiple systems are installed.

Installing the update

The delivery affects the following system components:

HYDRA

Server

X

HYDRA shop

HYDRA

floor client

MOC

X

MLE

interface

1.  Start the Maintenance Manager

Enter the URL http://<SERVER NAME>:8080/MaintenanceManager  in the web browser
Enter the IP address or the name of the server where the Tomcat services or processes run in
<SERVER NAME>. In general, this is the HYDRA server.
Note that the URL is case sensitive.

Use the following URLs to open the Maintenance Manager of the relevant instance if multiple systems
are installed:

Instance

1

2

...

Port

8080

8081

...

URL

http://<SERVERNAME>:8080/MaintenanceManager

http://<SERVERNAME>:8081/MaintenanceManager

...

2.  Log on with specified password, if required.

3.  Select the menu item Package deployment

4.  Click the Browse button to select the upd archive (file extension .upd) and go to the above-mentioned

directory or the data carrier delivered.

SCS-HCKP_81.docx

Version: 1.0.23049

Page 28 of 44

5.  The button Deploy package starts the installation process and shows the log, once the process has

been completed.

Connecting Kaba Terminals

Note:
The installation of the update can take several minutes.

Update the MOC client.

1.  Start the MOC client.

2.  Go to the menu item Help and select Search for updates.

3.  Click the button Search for updates.

4.  When the update is found, click Download updates.

5.  When the updates are downloaded, click Import updates.

6.  Notes on Microsoft Windows Vista and Windows 7:

If an MOC client has been installed in the Windows program directory, the Windows user account
control (UAC) creates a confirmation prompt. Click Yes to confirm.

7.  The MOC Updater then starts automatically.

8.  Click Start.

9.  When the files have been updated, click Start MOC to restart the updated MOC client.

You must update all MOC clients.

4.2  Update the connector

When installing an update with the Maintenance Manager, the BCOMM connector is automatically updated.

The update runs as follows:

  The BCOMM connector automatically identifies the new version. The connector then restarts to

activate the current version.

The new version is copied

<hydra>\fterm\BCOMM_Connector\setup\BCOMM_Connector\components

from the directory to the installation directory.

At the start, the standard class files from <hydradir>\javadeployment\sample-
configs\JHYDRADIR\BCOMM_Connector\1\data\standard are also copied to the BCOMM
connector directory <hydradir>\jhydradir\BCOMM_Connector\<DeviceId>\data.

(Currently there is no automatic transfer of the Scope directories: custom, var and local.)

SCS-HCKP_81.docx

Version: 1.0.23049

Page 29 of 44

Connecting Kaba Terminals

5

Implementation/configuration of terminals in B-COMM

5.1  Requirements for KABA terminals

5.1.1  General

The terminals must meet specific requirements for the use KABA terminals with the BCOMM connector.

Requirements for KABA terminals for using Time & Attendance (SCS-HCKP):

  The badges must be readable. This might also affect the files mediaact.ini and mediadef.ini. (B-

web 9300, B-web 9600 and B-web 9700).

  The file Interface.ini contains the standard interface of a MPDV dormakaba terminal for the

terminals of type B-web 9600 and B-web 9700.

  Approved domrmakaba terminals are:

Terminal

B-net 9340 HR2

B-web 9300 HR10

B-web 9600 K5 HR20

B-web 9700 K5 HR30

Programmversion

752-02-X-K02

754-00-X-K15

736-04-X-K03

735-04-X-K03

MPDV  provides  INI  files  to  implement  new  terminals  or  existing  terminals.  Copy  these  INI  files  to  the

terminal. If  you  want to keep the settings made on  an existing  terminal, then  you have to compare and

synchronize the below-mentioned settings manually.

The INI files provided by MPDV (later also called configuration files) are stored as follows:

HYDRA server 

HYDRA directory 

fterm\BCOMM_Connector\setup\BCOMM_Connector\kaba 

Sub  directory

(same  name  as

the

terminal

type  e.g.:

KABA_HR_97_00_K5)

5.1.2  Configuration files of the terminal

5.1.2.1

Standard configuration files

As a rule, the user copies the INI files provided by MPDV to the terminals. If this is not possible or intended,

configure  the  INI  files  manually  as  described  below.  You  cannot  use  all  functions  of  the  B-COMM

connection with HYDRA or there might be adverse effects on the terminal behavior if these settings are

changed.

SCS-HCKP_81.docx

Version: 1.0.23049

Page 30 of 44

Connecting Kaba Terminals

In addition to the fixed settings described in the sections that follow, the BCOMM connector sets specific

data and settings dynamically depending on how the HYDRA system is configured.

The badge definition must comply with the other reader settings (mediact.ini and mediadef.ini)

and does not necessarily correspond to the actual badge number length in HYDRA.

The BCOMM connector sends commands included in terminal classes to the terminal and specifies the

settings. The above-described settings refer to the standard terminal classes. Further settings might be set

if terminal classes are changed. Refer to the following chapter Terminal classes for further information.

5.1.2.2  Required fixed settings for the Time & Attendance

(SCS-HCKP)

The fixed settings for a PZE terminal are performed in the B-COMM GUI (e.g. 3.16, B-COMM Server) of

dormakaba.

Use the menu item Configuration => Call parameter editor... or the context menu of the terminal with Call

parameter editor for assigned parameter file to request the Parameter Editor Collection application where

you can fix the settings for a PZE terminal.

You can see the following menu tree in the application:

Parameterization

[-] Operating management

-

…

[-] System

-

-

-

-

-

-

…

Character set and language

Data management

Reader and badge

…

Defining badge

Execute the following settings in the menu item Character set and language:

-

[ X ]   use multi lingual text

(Default)

-  Character set   [ISO-8859-1]

(Default)

SCS-HCKP_81.docx

Version: 1.0.23049

Page 31 of 44

Connecting Kaba Terminals

-

Language

You need to configure the languages you want to use on the terminal.

The first language in the Can be used list is the initial language of the terminal after the start.

The languages German, French and English (with the country codes GB and US) are preset in
the BCOMM connector.
You need to extend the settings in the BCOMM connector if you want to use an additional
language on the terminal.

Store

the

file

here:

\\SERVER\Hydra\BCOMM_Connector\configuration\application_1.properties

Execute the following setting in the menu item Data management:

-  Master data definition

ID lenght [   n] should not be bigger or have the same length than the badge number in HYDRA.

Execute the following settings in the menu item Reader and badge / reader definition:

-  You  configure  the  badge  definition  for  the  cards  in  the  menu  item  Reader  and  Badge.

This  would  be  the  following  configuration  for  the  standard  LEGIC  badges  used  by  MPDV.

Preset

[user-defined]

From

Number of digits

ID

12

17

Other

00

05

06

00

Customer number

Badge number

Neutral

5.1.2.3

Settings defined by the BCOMM connector (SCS-HCKP)

There are no dynamic settings in the BCOMM connector.

5.1.2.4

Terminal classes

A terminal class is assigned to each Kaba terminal in the HYDRA terminal configuration. Terminal classes

define commands for the communication with the terminals.

SCS-HCKP_81.docx

Version: 1.0.23049

Page 32 of 44

Connecting Kaba Terminals

There is normally no need to change the class files.

You can find terminal classes in the following subdirectory on the server. This subdirectory is part of the

HYDRA installation directory.

jhydradir/BCOMM_Connector/1/data/class/standard

5.1.2.4.1  Structure of the terminal class file of Time & Attendance (SCS-

HCKP)

A terminal class file is structured like an INI file and consists of three sections:

1)

[INIT]

The  section  [INIT]  includes  commands  to  initialize  a  terminal  as  part  of  the  function  Reload

program. The terminal is restarted, once this command has been transferred.

2)

[DESIGN]

(only for SCS-HCKP)

There  are  commandos  in  the  section[DESIGN],  which  are  sent  to  the  terminal  when  the

maintenance function Reload program is selected in HYDRA. The standard Icons for the configured

absence reasons for the terminal B-web 9700 are set here.

3)

[REBOOT]

The section [REBOOT] includes commands that are sent to the terminal if you select the HYDRA

maintenance function Reboot.

4)

[AFTER_INIT]

The  section  [AFTER_INIT]  includes  optional  commands  that  are  sent  to  the  terminal  after

initialization. The section [AFTER_INIT] only  allows commands that  do not require  a restart.  By

default, this section is empty.

The individual commands are structured as key pairs.

Example

setOperatingMode = "@T T1"

Key:   setOperatingMode

Command:

"@T T1"

Enclose the command in double quotes.

The first two characters of a command stand for the GID/DID. This GID/DID is replaced with the terminal's

GID/DID when transferring the command to a terminal.

Comments start with a semicolon.

SCS-HCKP_81.docx

Version: 1.0.23049

Page 33 of 44

Connecting Kaba Terminals

5.1.2.4.2  Replacement of values in class file commands

The commands included in the class file are transferred to the terminal in order to initialize the terminal.

Some  commands  contain  specific  values/fields  that  are  replaced  with  contents  from  the  HYDRA

configuration.

5.1.2.4.3  General replacements

The GID/DID of all commands is replaced with the GID/DID of the target terminal.

5.1.2.4.4  Constraints

You can control the replacement of values in commands. To this end, you can define constraints for each

command. Constraints are mainly required to customize class files (see following chapter).

Insert a space character to add constraints to the command that is enclosed by double quotes, e.g.

initSpecialDay2 = "@T >3L02000000000000000000000000000000000000000000000000" NoDataReplacement

NoDataReplacement

The constraint NoDataReplacement only replaces the GID/DID and no other data fields, even if they

are described above.

RAW

The constraint RAW does not replace data, not even the GID/DID. The command is only sent to the

terminal matching the entered GID/DID.

GIDDIDSubtermXX

Use the constraint GIDDIDSubtermXX to replace the GID/DID with the GID/DID of the sub-terminal.

XX stands for the consecutive reader number. Thereby, you can send commands directly to a sub-

terminal. (At the moment there is no reasonable application for this option in the standard).

5.1.2.4.5  Customization of a class file

Usually, you do not have to customize terminal classes. If you customize the files, you have to observe the

scope concept.

The terminal class directory includes several subdirectories. The class files delivered by MPDV are stored

in the standard directory. You can file customizations to these standard class files in the other directories.

The system first reads the standard file and saves the commands per section and key in the specified order.

Then the system reads the class files of the other scopes in a defined order and executes the specified

commands.

SCS-HCKP_81.docx

Version: 1.0.23049

Page 34 of 44

-

If the section already includes a command for the key, the command is overwritten. If you assign

an empty command, the command is deleted.

-

If the section does not yet include the key, the key is added to the existing commands in this section.

Connecting Kaba Terminals

Priority  Directory  Contents
1
(lowest)
2

custom

standard  Class files delivered by MPDV. You must not customize the files in this scope.

MPDV updates can overwrite these class files at any time.
Optional customizations carried out by MPDV. MPDV updates can also overwrite
these files at any time.
Optional customizations carried out by a partner or value added reseller (VAR).
These  files  are  not  overwritten  by  MPDV,  but  can  be  modified  by  the
partner/reseller.
Optional  customizations  carried  out  by  the  end  customer.  These  files  are  not
overwritten by MPDV and should not be modified by a partner or reseller. Only
end customers should modify these files.

3

var

4
(highest)

local

5.1.2.5

The terminal class file of Time & Attendance (SCS-

HCKP)

The following settings/configurations are transferred from the BCOMM connector to the dormakaba terminal

during initialization by the Reload program. The data from the terminal-specific class file (e.g. class90.ini

for B-web 9700) is used.  Whereby parts of the configured command are replaced with data from HYDRA.

The  languages  German,  French  and  enEnglish  (GB)  and  enUS(English  US)  are  preset  in  the  BCOMM

connector.

The configurations described in this chapter can only be changed after consultation with the MPDV.

5.1.2.5.1  General text >T01-28 and >t01-28 (multi)

The general texts are transferred to all PZE terminals.  The texts are displayed on the dormakaba terminal

after an action as employee information (e.g. Please wait, Read error).

5.1.2.5.2  Dialog texte >D00-15 and >d00-15 (multi)

The dialog text are transferred to all PZE terminals.  The dialog text are shown if you click on a certain field

(e.g. Badge please)

5.1.2.5.3

Funktion keys texte >M00-05,31-40 and >m00-05,31-40 (multi)

All function key text are transferred to the PZE terminals.  These are copied from the terminal label => tab

HR functions of HYDRA.

SCS-HCKP_81.docx

Version: 1.0.23049

Page 35 of 44

Connecting Kaba Terminals

5.1.2.5.4

Funktion keys texte >F00-05,31-40 and >m00 (multi)

The  initialization  of  the  data  takes  place  after  the  configuration  in  the  terminal  label  Tab  HYDRA  HR

functions

5.1.2.5.5  Parameter sets ">3z00"

With  the  entry:  "@T  >3z00init/interface.ini[SurfaceDesign]DisplayInfoVisibleNumber=10"  the  number  of

lines  to  be  displayed  in  the  info  is  set  to  10.  (This  setting  is  only  required  in  the  file  class85.ini  for  a

dormakaba terminal B-web 9600)

5.1.2.5.6  Other configurationen >3E01, >3X02 , >3X01

With  the  entry:  @T  >3E01----03----  the  operating  language  and  the  seconds  in  the  data  records  are

activated in the dormakaba terminals.

With the entry: @T >3X02------------XXXXXXXXXX------------ the system company number to be checked

is transferred to the dormakaba terminals. The placeholder XXXXXXXXXX is replaced by the data from

the terminal label (or HYDRA setup).

A "-" digit is not checked.

With the entry: "@T >3X010500050005000300120000" the times for the terminal control are transferred to

the

dormakaba

terminals.

Data derives from the following fields in the terminal label  Tab HYDRA HR functions.

dormakaba terminal time

HYDRA data field

Display time Authorized

Return time

Display time Not authorized

Return time

Pickup time relays

Operating timeout

Relay time

Return time

Display time disply info

Display duration of info

SCS-HCKP_81.docx

Version: 1.0.23049

Page 36 of 44

Connecting Kaba Terminals

5.2  Configure terminal in Kaba B-COMM

Kaba supports the following values for GID/DID: GID: 00 to 29, DID: 00 to 59.

If you use the communication software B-COMM, you have to consider the following when you assign the

device ID DID:

5.2.1 Terminal to collect Time & Attendance (SCS HCKP)

You cannot use sub terminals in combination with PZE terminals.

Procedure:

-  Configure new network adapter

o  Enter the terminal's IP address

o  Enter GID/DID

-

Log on terminal

o  Set operating status online

o  Other time zones are currently not supported

5.3  Configure terminal in HYDRA

You configure the terminals in HYDRA with the following path:

System administration  Terminals  Terminal configuration

The  terminal  must  be  configured  in  HYDRA.  Choose  a  short  Cycle  duration  of  status  messages  at  the

beginning. Therefore, terminals are quickly initialized and provided with authorizations.

Then, trigger the function Reload program via the terminal administration.

You can check completion of the Reload program process in the MOC application B-COMM control.

5.3.1 Configuring the terminal for Time & Attendance in HYDRA

For information on how to configure the terminal for Personnel Time Management, See here.

SCS-HCKP_81.docx

Version: 1.0.23049

Page 37 of 44

Connecting Kaba Terminals

6  Check result and troubleshooting

6.1  Logging

6.1.1  Status page of the BCOMM connector

Use a web browser to start a status page of the BCOMM connector:

To do so, enter the address of the BCOMM connector in the address line. You can find the address in the

INI data configuration of the MOC:

BCOMMCONNECTOR

Name
Section  ADDRESS
Key
Value

Instance number, e.g. 1
Address of the BCOMM connector, e. g. servername:31101

 Tabelle 1.1

Prefix http:// to the value from the INI data configuration, attach /status and enter this as address in your

browser, e.g.:

http://servername:31101/status

A status page is shown:

{

"version": "1.0.3469",
"startupDate": "2018-06-01T12:29:08.877+02:00",
"uptime": "D:2 H:20 M:35 S:6",
"totalMemory": 262668288,
"freeMemory": 141175448,
"workingDir": "file:/G:/hydra4/BCOMM_Connector/BCOMMConnector-1.0.3469.jar!/BOOT-INF/classes!/",
"osArch": "amd64",
"osName": "Windows Server 2008 R2",
"osVersion": "6.1",
"cpuLoad": 8.3,
"registeredBcommchannels": 1,
"notifiedFromHydra": true,
"dataTransferWithHydra": true,
"initializedSuccessful": true,
"queueSize": 0,
"clockingQueueSize": 0,
"terminalInfo": [

{

"terminalId": 704,
"terminalType": "PZE",
"terminalClass": 85,
"ipAddress": "10.10.11.46",
"gid": 1,
"did": 2,
"authorizationInfos": {

"mirror": {

"size": 36,
"time": "2018-06-04 09:03:07"

}

}
}, ..
]

}

SCS-HCKP_81.docx

Version: 1.0.23049

Page 38 of 44

You can install a plug-in for your browser to display JSON if your browser output is not as easy

to read as shown above. You can find such plug-ins for common browsers on the internet.

Connecting Kaba Terminals

Meaning of data

Apart from the general, self-explanatory values like version, uptime or workingDir, there are also special

values for the BCOMM connector status:

registeredBcommchannels

Number of Kaba B-COMM channels logged at the connector. As soon as channels are logged on to

the BCOMM connector (i.e. a connection from BCOMM to the connector is possible), here the number

of channels connected to is counted up. If the number of logged channels is greater than 0, you can

exchange data between the BCOMM connector and the Kaba-B-COMM.

The Kaba B-COMM logs the channel with the BCOMM connector if the channel is restarted.

The  BCOMM  connector  restarts  the  channels  assigned  to  the  Kaba  B-COMM  if  the  BCOMM

connector is restarted. The system also checks every minute if the registered channels are still active.

Inactive channels are also restarted.

Stop the assigned BCOMM connector service to end a channel manually in the Kaba B-COMM.

If the service is running, the service tries to restart its assigned channels at regular intervals.

Proceed as follows in case of problems:

Check if the correct application interface is defined in the Kaba B-COMM.

Check  the  settings  of  the  Kaba  B-COMM  and  the  channel  according  to  the  BCOMM  connector's

installation guide.

The  server  IP  address  and  the  rmi  control  port  of  the  Kaba  B-COMM  must  match  the  BCOMM

connector's BCOMM rmi server host and BCOMM rmi server port.

notifiedFromHydra

For specific events, the HYDRA server notifies the BCOMM connector. Consequently, the BCOMM

connector can immediately execute B-Comm control activities. This is the case, if a new badge is

created or a terminal assigned to the BCOMM connector is changed. The variable switches to true,

once the HYDRA server has informed the BCOMM connector.

Proceed as follows in case of problems:

A firewall might prevent the HYDRA server from reaching the  BCOMM connector via the address

defined in the INI data configuration.

SCS-HCKP_81.docx

Version: 1.0.23049

Page 39 of 44

Connecting Kaba Terminals

The address stored in the INI data configuration might not be correct (see table 1.1). This address is

normally  entered  by  the  BCOMM  connector  at  the  startup  if  the  HYDRA  server  can  be  reached

successfully by the BCOMM connector.

dataTransferWithHydra

true: Communication of the BCOMM connector with HYDRA via services has taken place at least

once. HYDRA can read and send the data.

Proceed as follows in case of problems:

Check  the  HYDRA  server  settings  and  compare  these  settings  with  the  one's  in  the  BCOMM

connector's installation guide. Also check the communication user BCOMM-CON. Refer to chapter

4.5.3 for further information on the check.

6.1.2  Application: B-COMM Control

Menu

System administration  Terminals  B-COMM control

Transaction code

bcctrl

Function authorization

bcctrl

Use  the  B-COMM  control  application  to  trace  specific  interface  activities.  The  columns  status  and

information  provide  information  on  the  status  of  each  activity.  You  can  find  application  details  in  the

associated documentation and online help.

6.1.3  HYDRA system logs

The HYDRA system logs include an entry for the application BCOMMCON called B-COMM Connector 1

error log. This log records any critical issues of the connector.

6.1.4

Log files of the BCOMM connector

The  connector  is  generally  logged  in  <hydradir>/BCOMM_Connector/log.  By  default,  this  directory

logs the levels error and warnings/alerts.

If required, you can increase the log level. To do so, open the file application_X.properties (X

stands for the device number of the connector) in the directory

<hydradir>/BCOMM_Connector/configuration/ and change the entry

logging.level.de.mpdv=WARN.

Possible log levels:

  ERROR
  WARN  unexpected situations occur
general information


INFO

error

SCS-HCKP_81.docx

Version: 1.0.23049

Page 40 of 44

  DEBUG
  TRACE detailed debugging messages

debug messages

Connecting Kaba Terminals

Please note that the lower log levels (trace) also include the higher log levels (ERROR, WARN, ...).

Restart the connector after changing the log level.

The entry logging.level.de.mpdv affects all MPDV log messages. You can also change the log level

for individual classes. In this case, you should know the package/class name. If you only want to increase

the log level for translating BCOMM messages, create another entry for the translation package babelfish:

logging.level.de.mpdv.bcomm.babelfish=INFO

6.2  Mirror files

The BCOMM connector stores the current status of terminal data in mirror files. Mirror files are stored in

the sub-directory mirrors of the directory

<hydradir>/jhydradir/BCOMM_Connector/<DeviceNr>/data .

There is one JSON file for each terminal. The connector keeps the files and  uses the files as cache  of

terminal data and authorizations.

Start reload program in the terminal configuration to restructure the mirror file.

If you delete the file manually, you must perform the option reload program in the terminal configuration in

order to ensure the mirror files will be restructured. Otherwise, the next data synchronization might result

in wrong time authorizations and missing or excess badges.

6.3  Terminal classes

Changes to terminal classes could lead to malfunctions. If you suspect this, check the terminal classes and

compare these classes with the factory settings. (See chapter 3.1.2.4)

6.4  Upload a parameter file of the terminal

For diagnostic purposes, you might require a parameter file upload from the Kaba terminal. You can upload

the file via the Kaba B-COMM GUI.

Always request the current version of the parameter file from the terminal!

1.

In the Kaba B-COMM GUI open the context menu with a right click on the required terminal and

choose the option Upload/assign parameter file. If necessary, confirm any message that appears

about overwriting an existing file.

SCS-HCKP_81.docx

Version: 1.0.23049

Page 41 of 44

Connecting Kaba Terminals

2.  Check  if  the  upload  was  successful:  the  channel  should  include  ParameterUpload  with  status

FinishedOK as the last job.

3.  Check data: use the parameter editor to view the parameter file.

4.  Storage location of the parameter file: if you need the parameter file for analysis/backup purposes,

you  can  identify  the  storage  location  of  the  files  via  the  Parameter  file  assignment  in  the  menu

Configuration.

6.5  Possible issues

6.5.1

Invalid badges

You have created a new badge in HYDRA but this badge is not yet valid for the terminal.

Possible reasons and solutions:

1.  B-COMM control does not work:

a.  Check if the synchronization job SYNC_BADGE of the application B-COMM control has

been processed.

b.  Are there any other jobs scheduled before?
c.
d.

Is there a job that got stuck?
If there is no other job, you can still use the options Reload authorizations or Reload
program from the terminal configuration. These options synchronize the data. The option
Reload authorizations only transfers the changed data. The option Reload program
reinitializes all terminal data.

e.  Check the status page of the B-COMM connecter to identify the cause of the problem.

2.  An access attempt is rejected with the message Unauthorized badge in the access log.

a.  The access authorizations in HYDRA show that the badge has no authorizations at this

time.

b.  The badge has not yet been synchronized (see issue a)).
c.  Check the status page of the B-COMM connecter to identify the cause of the problem.

6.5.2  New terminals do not receive data

A new terminal was created in HYDRA, but no data is transferred to this terminal.

Perhaps, the connector has not yet received any information on this terminal from HYDRA or the BCOMM.

Restart the B-COMM connector to solve the problem.

Check installation of the Kaba terminal. The used INI files might not comply with the requirements for the

B-COMM  connector.  A  cold  start  of  the  terminal  can  solve  the  problem.  If  necessary,  copy  the  INI  files

provided  by  MPDV  onto  the  terminal.  See  chapter  "5  Implementation/configuration  of  terminals  in  B-

COMM“.

SCS-HCKP_81.docx

Version: 1.0.23049

Page 42 of 44

Connecting Kaba Terminals

6.5.3  Check communication user BCOMM connector

Error pattern

It looks like the BCOMM connector cannot read any data from HYDRA.  Entries of the B-COMM control are

not processed and newly created  badges, accesses or terminals are not identified.  Nothing works after

having rebooted the BCOMM connectors.

There  are  entries

in

the

log

file  of

the  BCOMM  connector

(normally

in

the  directory

<hydradir>/BCOMM_Connector/log) that indicate errors during user logon.

Info

The BCOMM connector needs a HYDRA user to access the HYDRA services. The system automatically

creates this user during the installation using a database patch.

User: BCOMM-CON

Create the HYDRA user with a default password.  The encrypted password is stored in the HYDRA

database and in the connector configuration. The installer encrypts the password during installation.

If necessary, the password can subsequently be changed in the HYDRA user administration and in the

configuration file of the connector (e.g.

\\SERVER\Hydra\BCOMM_Connector\configuration\application_1.properties) with the DB password

generator.

(If you enter the password with two prefixed hash signs "##" in the configuration files, the system interprets

this as an unencrypted password and uses it for the login.)

The user does not need authorizations for the responsibility area.

Solution

The configuration of the communication user may be faulty:

  Perhaps the user was deleted by mistake or not created during the installation.
  The passwords of the user in HYDRA (unencrypted input at the MOC) and in the configuration file

(encrypted input) may not match.

There are several solutions:

1)  Restore default password for existing user

a.  The column pwd must have the content '324b8eff4d96b147c761acec08537d06'. In the

database table user_tab for the record with usr = 'BCOMM-CON'  Check the value of the
column pwd and, if necessary, restore it using SQL.

SCS-HCKP_81.docx

Version: 1.0.23049

Page 43 of 44

Connecting Kaba Terminals

b.  Check the following entry in the connector's configuration file and restore it if necessary:

mpdv.mw.password=324b8eff4d96b147c761acec08537d06

2)  Create the HYDRA user with a default password again:

a.  Delete the user BCOMM-CON on the MOC if there.
b.  Execute the above described patch dbp_bcomm_connector.hsc again.  Create the patch

with default values.

c.  Check the following entry in the connector's configuration file and restore it if necessary:

mpdv.mw.password=324b8eff4d96b147c761acec08537d06

3)  Check and correct the user with a separate password.

a.  Create the user BCOMM-CON on the MOC if not there.  Remember the assigned

b.

password.
If the user exists and the password is unknown, assign a new password and remember
the password.

c.  Encrypt the new password with the DB password generator.
d.  Enter the encrypted password in the configuration file of the connector in the key

mpdv.mw.password=.

SCS-HCKP_81.docx

Version: 1.0.23049

Page 44 of 44

