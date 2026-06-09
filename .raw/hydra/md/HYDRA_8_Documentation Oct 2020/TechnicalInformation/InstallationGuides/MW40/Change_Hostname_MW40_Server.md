HYDRA Documentation

Change Hostname of a
HYDRA MW4.0pe Server

Version 1.0.23049

Last changed on: 02.09.2020

Change Hostname of a HYDRA MW4.0pe Server

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of Oracle Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

Change_Hostname_MW40_Server.docx  Version: 1.0.23049

Page 2 of 36

Change Hostname of a HYDRA MW4.0pe Server

Contents

1  Change Hostname and/or IP-Address ......................................................... 4

1.1  Shutdown HYDRA ............................................................................................... 5

1.2  HYDRA Database ............................................................................................... 7

1.2.1  ORACLE ................................................................................................. 7

1.2.2  SQL Server ........................................................................................... 10

1.3  HYDRA Server .................................................................................................. 14

1.3.1

Linux ..................................................................................................... 15

1.3.2  Windows ................................................................................................ 17

1.3.3  Common ................................................................................................ 19

1.4  HYDRA Clients .................................................................................................. 23

1.4.1  Terminal ................................................................................................ 23

1.4.2  MES Operation Center (MOC) ............................................................... 24

1.4.3  B-COMM ............................................................................................... 25

1.4.4

ILHYDRA ............................................................................................... 27

1.4.5  PDV ....................................................................................................... 28

1.4.6  CAQ MDI Interface ................................................................................ 29

1.4.7  WFM Workflow Management ................................................................ 30

1.4.8  SmartMES (SMA) .................................................................................. 35

Change_Hostname_MW40_Server.docx  Version: 1.0.23049

Page 3 of 36

Change Hostname of a HYDRA MW4.0pe Server

1  Change Hostname and/or IP-Address

This  manual  describes  the  necessary  configuration  procedures  for  HYDRA  MW4.0pe  if  the  hostname

and/or the IP-address of an already installed HYDRA server needs to be changed afterwards.

Attention:

To perform the following procedures detailed knowledge of HYDRA, the used database system and

the server operating system is required.

These procedures are performed on your own responsibility.

MPDV Mikrolab GmbH is not liable for any loss of data or for any destruction of data.

In case of doubt you might want to place an order with MPDV Mikrolab GmbH to perform these tasks

for you.

If the following procedures are used to duplicate a HYDRA system, e.g. to create a test system by copying

a productive system, you must be specially aware of the HYDRA database connection configurations and

any data interface configurations to other systems like SAP, PPS, ERP, MDI server, etc.

If  a  duplicated  system  will  be  activated  parallel  to  the  source  system  without  any  further  measures  this

might lead to the loss of data or to the destruction of data.

The  duplicated  system  should  be  operated  in  an  isolated  environment  until  all  necessary  configuration

changes are successfully completed and any mutual interactions with the source system can be excluded.

For the time being the communication between the HYDRA components is solely based on the network

protocol TCP/IP Version 4 (IPv4).

If there are servers or clients involved which are additionally supporting TCP/IP Version 6 (IPv6) then it

might  be  necessary  to  make  certain  arrangements  to  ensure  the  use  of  IPv4,  e.g.  by  using  IPv4  IP-

addresses instead of hostnames.

Change_Hostname_MW40_Server.docx  Version: 1.0.23049

Page 4 of 36

Change Hostname of a HYDRA MW4.0pe Server

1.1  Shutdown HYDRA

  Logon to the HYDRA server as user mipadm

  Shutdown HYDRA:

Linux:

hy_down.scr shutdown

Windows:

Shut down the “Base System” in the MIP Manager:

  Make sure that HYDRA won't start automatically after restarting the server:

Linux:

rename the HYDRA start script $HYDRADIR/hy_start.scr to hy_start.scrxxx, e.g.:

mv /u1/mip1/hy_start.scr /u1/mip1/hy_start.scrxxx

Windows:

Change the startup type of all MIP(x) services which are currently set to “Automatic” to "Manual".

e.g.: “MIP Server Agent”, “MIP IPC-Server” , “MIP1 Server Agent”, “MIP1 Maintenance Manager”

In a HYDRA Multi system environment you have to  make sure that the automatic startup for  all

such services in all HYDRA systems is deactivated.

Change_Hostname_MW40_Server.docx  Version: 1.0.23049

Page 5 of 36

Change Hostname of a HYDRA MW4.0pe Server

  Check that the MIP Web Service Provider (WSP) is not running and shut it down if necessary.

Linux:

ps –ef | grep –i WSP

Windows:

Check and if necessary shutdown the Windows service:

„MIPx Web Service Provider (WSP)“ (x = system number), e.g.:

„MIP1 Web Service Provider (WSP)“

In a HYDRA Multi system environment you have to repeat those steps for every WSP server in all

HYDRA systems.

  Check that the HYDRA EMQTT broker is not running and shut it down if necessary.

Linux:

ps –ef | grep –i EMQTT

Windows:

Check and if necessary shutdown the Windows service:

”MIPx MQTT Broker” (x = system number), e.g.: ”MIP1 MQTT Broker”

In a HYDRA Multi system environment you have to repeat those steps for every EMQTT server in

all HYDRA systems.

Change_Hostname_MW40_Server.docx  Version: 1.0.23049

Page 6 of 36

Change Hostname of a HYDRA MW4.0pe Server

1.2  HYDRA Database

1.2.1  ORACLE

1.2.1.1

Linux

  Make sure HYDRA is shut down completely, see chapter “1.1 Shutdown HYDRA”.

  Logon to the HYDRA server as user oracle

  Shutdown the database and then make sure it starts again without error message.

In  HYDRA  multi  system

installations  make  sure

to  use

the  proper  Oracle

instance,

e.g.: export ORACLE_SID=MIPx (x = instance number)

export ORACLE_SID=MIP1

cd $ORACLE_HOME/bin (e.g.: cd /u1/oracle/ora19/bin)

sqlplus /nolog

SQL> connect sys as sysdba

SQL> shutdown immediate

SQL> startup

SQL> exit

Should the database do not start again without error message, make sure to fix the problem first.

Do not proceed until the database starts up without error!

  Shutdown the ORACLE database:

export ORACLE_SID=MIP1

cd $ORACLE_HOME/bin (e.g.: cd /u1/oracle/ora19/bin)

sqlplus /nolog

SQL> connect sys as sysdba

SQL> shutdown immediate

SQL> exit

  Shutdown the Oracle Listener:

cd $ORACLE_HOME/bin (e.g.: cd /u1/oracle/ora19/bin)

lsnrctl stop LISTENER_MIPx (x = instance number), e.g.:

lsnrctl stop LISTENER_MIP1

Change_Hostname_MW40_Server.docx  Version: 1.0.23049

Page 7 of 36

Change Hostname of a HYDRA MW4.0pe Server



In a HYDRA Multi system environment you have to repeat those steps for every database instance

and for every listener.

  Make sure that all database processes are switched off properly.

  Check the following ORACLE files and change them where necessary:

$ORACLE_HOME/network/admin/sqlnet.ora

$ORACLE_HOME/network/admin/listener.ora

$ORACLE_HOME/network/admin/tnsnames.ora

  Change hostname and/or IP-address of the server.

For detailed information about how to do that see the manual of your operating system.

  Restart the server.

  Logon to the HYDRA server as user oracle

  Make sure all database instances and listeners are running properly.

1.2.1.2  Windows

  Make sure HYDRA is shut down, see chapter “1.1 Shutdown HYDRA”.

  Logon to the HYDRA server as user mipadm

  Shutdown

the  database  and

then  make  sure

it  starts  again  without  error  message.

In HYDRA multi system installations make sure to use the proper Oracle instance.

Select  the  appropriate  shortcut  “sqlplus  MIPx”  (x  =  instance  number)  from  the  folder  “MIP

Administration” on the Windows Desktop, e.g.:

“sqlplus MIP1”

connect sys as sysdba

SQL> shutdown immediate

SQL> startup

SQL> exit

Should the database do not start again without error message, make sure to fix the problem first.

Do not proceed until the database starts up without error!

Change_Hostname_MW40_Server.docx  Version: 1.0.23049

Page 8 of 36

Change Hostname of a HYDRA MW4.0pe Server

  Shutdown the ORACLE database:

execute e.g. “sqlplus MIP1”

connect sys as sysdba

SQL> shutdown immediate

SQL> exit

  Shutdown the Oracle Listener:

Shutdown the Windows service "OracleOraDB19Home1TNSListenerLISTENER_MIP1"



In  a  HYDRA  Multi  system environment  you  have  to  repeat  those  measures  for  every  database

instance and for every listener.

  Make sure that all database services are switched off properly.

  Check the following ORACLE files and change them where necessary:

%ORACLE_HOME%\network\admin\sqlnet.ora

%ORACLE_HOME%\network\admin\listener.ora

%ORACLE_HOME%\network\admin\tnsnames.ora

  Change hostname and/or IP-address of the server.

For detailed information about how to do that see the manual of your operating system.

  Restart the server.

  Logon to the HYDRA server as user mipadm

  Make sure all database instances and listeners are running properly.

Change_Hostname_MW40_Server.docx  Version: 1.0.23049

Page 9 of 36

Change Hostname of a HYDRA MW4.0pe Server

1.2.2  SQL Server

  Make sure HYDRA is shut down completely, see chapter “1.1 Shutdown HYDRA”.

  Logon to the HYDRA server as user mipadm

  Shutdown all Windows services for the SQL Server database, e.g.:

  Make sure that all database services are switched off properly.

  Change the hostname and/or the IP-address of the server now.

For detailed information about how to do that please see the manual of your operating system.

  Restart the server.

  Logon to the HYDRA server as user mipadm

  The SQL Server database should startup and work properly directly after the restart.



In the SQL Server Management Studio connect to newServerName\MIPMS1

Change_Hostname_MW40_Server.docx  Version: 1.0.23049

Page 10 of 36

Change Hostname of a HYDRA MW4.0pe Server

  After successfully connecting to the new server configuration (see above) open a “New Query” for

the system database “master”:

Check the current server name configuration by using one of the following commands which should

still show the old server name:

sp_helpserver

or

select @@SERVERNAME

Drop the old server name configuration:

sp_dropserver 'oldServerName\MIPMS1'

GO

If "sp_dropserver" shows errors like "... still remote logins ...", drop those remote logins as follows:

sp_dropremotelogin 'oldServerName\MIPMS1'

GO

Then try to drop the old server name configuration again.

Add the new server name configuration:

sp_addserver 'newServerName\MIPMS1', local

GO

Check the current server name configuration which should show the new server name now, e.g.:

sp_helpserver

or

select @@SERVERNAME

Change_Hostname_MW40_Server.docx  Version: 1.0.23049

Page 11 of 36

Change Hostname of a HYDRA MW4.0pe Server



In the SQL Server Management Studio check if there are Maintenance Plans available and change

their connection configurations:

Depending on the configuration it might be better to recreate the Maintenance Plans from scratch.



In the SQL Server Management Studio check the owner of the SQL Server Agent jobs and change

it if necessary, e.g. if a Windows operating system user is used instead of the local SQL Server

user „sa“, e.g. „oldServerName\mipadm":

In such cases change the owner, e.g. to „newServerName\mipadm":

Change_Hostname_MW40_Server.docx  Version: 1.0.23049

Page 12 of 36

Change Hostname of a HYDRA MW4.0pe Server

  Check the ODBC configuration

Check the System DSN name MIPSQL1 in ODBC Data Sources (64-bit) and make sure to use the

correct SQL Server configuration, e.g.:

newServerName\MIPMS1

  On  a  server  with  HYDRA  Multi  system  configuration  repeat  these  actions  for  every  database

instance.

  Restart the server.

Change_Hostname_MW40_Server.docx  Version: 1.0.23049

Page 13 of 36

Change Hostname of a HYDRA MW4.0pe Server

1.3  HYDRA Server

If this manual is used to create a copy of an already running HYDRA system, e.g. creating a test system

by copying a productive system, you have to make sure that the following HYDRA services/processes are

reliably deactivated on the duplicated system before you start HYDRA for the first time:

  HYDRA Scheduler (e.g. “MIP1 Scheduler”)

  HYDRA ECS interface (e.g. “MIP1 ECS Inbound Dispatcher 0”, “MIP1 ECS Server FP 1”, “MIP1

ECS Server SAP 1”, etc.)

  All HYDRA PDV services/processes (e.g. “MIP1 HYDRA-PDV-Communication Server” and “MIP1

HYDRA-PDV-Configuration Monitor”).

To deactivate those processes on a Linux server  you need to edit the file  /u1/mip1/x/hymap.dat (e.g.:

/u1/mip1/1/hymap.dat) and deactivate the proper entries by adding a semicolon “;” to the beginning of the

line, e.g.:

;### MIP Scheduler (with table hyd_scheduler)

;hysched.out -E./1/err/hysched.err -m6 -t:9999:0:0:0:MIP1 Scheduler

On a Windows server you need to change the startup type of all those services to “Disabled”:, e.g.:

In a HYDRA Multi system environment you have to deactivate those services/processes for every HYDRA

system.

Only  after all the below mentioned configurations are checked and set correctly it is  allowed to activate

these services/processes again.

Change_Hostname_MW40_Server.docx  Version: 1.0.23049

Page 14 of 36

Change Hostname of a HYDRA MW4.0pe Server

1.3.1

Linux

  Make sure HYDRA is shut down completely, see chapter “1.1 Shutdown HYDRA”.

  Logon to the HYDRA server as user mipadm

  Shutdown the HYDRA Maintenance Manager 2.0 (if available)

sudo /etc/init.d/MIPx_Maintenance_Manager stop

(x = system number), e.g.:

sudo /etc/init.d/MIP1_Maintenance_Manager stop

In  a  HYDRA  Multi  system  environment  you  have  to  repeat  those  steps  for  every  Maintenance

Manager belonging to a HYDRA system.

  Check the contents of the file hysys.dat (e.g. /u1/mip1/hysys.dat) and change them if necessary.

On a server with a HYDRA Multi system configuration check and change the file hysys.dat in all

application directories of all HYDRA systems (e.g.: /u1/mip2/hysys.dat, /u1/mip3/hysys.dat,.etc.).



In the folder "MIP Administration" on the Windows Desktop of your Administration Console PC all

shortcuts for "Maintenance Manager MIPx" must be changed, e.g.:

System 1:

http://newServerName:18080

System 2:

http://newServerName:18081

System 3:

http://newServerName:18082, etc.

Change_Hostname_MW40_Server.docx  Version: 1.0.23049

Page 15 of 36

Change Hostname of a HYDRA MW4.0pe Server



In the folder "MIP Administration" on the Windows Desktop of your Administration Console PC

the connection profile of the SQuirreL SQL Client must be changed if necessary, e.g.:

Oracle:

jdbc:oracle:thin:@newServerName:1521:MIP1

e.g.:

  On your Administration Console PC check all connect configurations of tools like PuTTY,

WinSCP, etc. and change them if necessary.

  The  configuration  file  connect.properties  for  the  System  Text  Configurator must  be  checked

and changed if necessary, e.g.: /u1/mip1/admtools/systemtextconfigurator/conf/connect.properties

Oracle:

jdbc:oracle:thin:@newServerName:1521:mip1

Change_Hostname_MW40_Server.docx  Version: 1.0.23049

Page 16 of 36

Change Hostname of a HYDRA MW4.0pe Server

1.3.2  Windows

  Make sure HYDRA is shut down completely, see chapter “1.1 Shutdown HYDRA”.

  Logon to the HYDRA server as user mipadm

  Check that the HYDRA Maintenance Manager is not running and shut it down if necessary.

“MIPx Maintenance Manager” (x = system number), e.g.:

“MIP1 Maintenance Manager”

In  a  HYDRA  Multi  system  environment  you  have  to  repeat  those  steps  for  every  Maintenance

Manager in all HYDRA systems.

  Check the contents of the file hysys.dat (e.g. d:\mip1\hysys.dat) and change them if necessary.

On a server with a HYDRA Multi system configuration check and change the file hysys.dat in all

application directories of all HYDRA systems (e.g.: d:\mip2\hysys.dat, d:\mip3\hysys.dat,.etc.).



If  there  is  a  local  installation  of  a  HYDRA  Terminal  on  the  server  check  the  "Hostname"  in  its

configuration file (e.g. in CTAIP.INI) and change it if necessary as described in chapter 1.4.1.



If there is a local installation of a MOC client on the server, check it's configuration and change it if

necessary as described in chapter 1.4.2.



If there is a local installation of  B-COMM on the server, check it's configuration and change it if

necessary as described in chapter 1.4.3.



If there is a local installation of  ILHYDRA on the server, check it's configuration and change it if

necessary as described in chapter 1.4.4.

Change_Hostname_MW40_Server.docx  Version: 1.0.23049

Page 17 of 36

Change Hostname of a HYDRA MW4.0pe Server



In the folder "MIP Administration" on the Windows Desktop all shortcuts for "Maintenance

Manager MIPx" must be changed, e.g.:

System 1:

http://newServerName:18080

System 2:

http://newServerName:18081

System 3:

http://newServerName:18082, etc.



In the folder "MIP Administration" on the Windows Desktop the connection profile of the SQuirreL

SQL Client must be changed if necessary, e.g.:

Oracle:

jdbc:oracle:thin:@newServerName:1521:MIP1

SQL Server:

jdbc:sqlserver://newServerName;instanceName=MIPMS1;databaseName=mip1

e.g.:

  The  configuration  file  connect.properties  for  the  System  Text  Configurator must  be  checked

and changed if necessary (e.g.: d:\mip1\admtools\systemtextconfigurator\conf\connect.properties):

Oracle:

jdbc:oracle:thin:@newServerName:1521:mip1

SQL Server:

jdbc:sqlserver://newServerName;instanceName=mipms1;databaseName=mip1

Change_Hostname_MW40_Server.docx  Version: 1.0.23049

Page 18 of 36

Change Hostname of a HYDRA MW4.0pe Server

1.3.3  Common

  Logon to the HYDRA server as user mipadm

  Check the configuration file of the HYDRA Maintenance Manager and change it if necessary:

Windows:

d:\mip1\MaintenanceManager1\config\application.properties

Linux:

/u1/mip1/MaintenanceManager1/config/application.properties

mpdv.mm.host.name=newServerName

(this configuration is optional and might not be used at all)



Inside JHYDRADIR of every HYDRA system check the configuration file of the Maintenance

Manager and change it if necessary, e.g.:

Windows:

d:\mip1\jdir\MaintenanceManager\config.json

Linux:

/u1/mip1/jdir/MaintenanceManager/config.json

"host" : "newServerName",

"masterServerHost" : "newServerName",



Inside JHYDRADIR of every HYDRA system check the following files belonging to the HYDRA

Maintenance Manager and change them if necessary, e.g.:

Windows:

d:\mip1\jdir\MaintenanceManager\rt\client\MOC\messystems.xml

Linux:

/u1/mip1/jdir/MaintenanceManager/rt/client/MOC/messystems.xml

<url>http://newServerName:8080/MocServices/MesBusinessService</url>

<instanceurl>newServerName:8080</instanceurl>

<registrationServer>newServerName</registrationServer>

Windows:

d:\mip1\jdir\MaintenanceManager\rt\client\MOC\update\UpdateConfiguration.txt

Linux:

/u1/mip1/jdir/MaintenanceManager/rt/client/MOC/update/UpdateConfiguration.txt

"MaintenanceManagerHost" : "http://newServerName:18080",

Windows:

d:\mip1\jdir\MaintenanceManager\rt\client\ignored\MOC.ApplicationSettings.config

Linux:

/u1/mip1/jdir/MaintenanceManager/rt/client/ignored/MOC.ApplicationSettings.config

<add key="MasterServer" value="newServerName"></add>

Change_Hostname_MW40_Server.docx  Version: 1.0.23049

Page 19 of 36

Change Hostname of a HYDRA MW4.0pe Server



Inside JHYDRADIR of every HYDRA system check the Java configuration file and change it if

necessary, e.g.:

Windows:

d:\mip1\jdir\MOC\1\config.properties

Linux:

/u1/mip1/jdir/MOC/1/config.properties

db.connectionstring=jdbc:oracle:thin:@newServerName:1521:hyd1

db.connectionstring=jdbc:sqlserver://newServerName;instanceName=mipms1;databaseName=mip1

wsc.bridge.hydraserver=newServerName

(Default: 127.0.0.1)

wfm.server.url=http://newServerName:8180/

(Default: localhost)

mqtt.host=newServerName

(Do not edit this entry! It is auto generated and updated by the MM2.)



Inside JHYDRADIR of every HYDRA system check the configuration file of the MQTT Broker and

change it if necessary, e.g.:

Windows:

d:\mip1\jdir\MQTT\broker_config.json

Linux:

/u1/mip1/jdir/MQTT/broker_config.json

"host" : "newServerName",

  On a server with HYDRA Multi system configuration repeat these actions for every HYDRA

system.

  Check the configuration file for the Master Server and change it if necessary, e.g.:

Windows:

d:\mip1\HyInstMgrDir\Instancerepo.properties

Linux:

/u1/mip1/hyinstmgrdir/Instancerepo.properties

###### INSTANCE 1 ######

HYDRA1.host.1=newServerName

On a server with HYDRA Multi system configuration there might be more system configurations

available, e.g.:

###### INSTANCE 2 ######

HYDRA2.host.1=newServerName

###### INSTANCE 3 ######

HYDRA3.host.1=newServerName

etc.

Change_Hostname_MW40_Server.docx  Version: 1.0.23049

Page 20 of 36

Change Hostname of a HYDRA MW4.0pe Server

  Except  for  the  HYDRA  services/processes  which  were  specifically  deactivated  in  chapter  “1.3

HYDRA  Server”

(HYDRA  Scheduler,  HYDRA  ECS

interface  and  all  HYDRA  PDV

services/processes) you can now reactivate the automatic start of HYDRA:

Linux:

rename the file $HYDRADIR/hy_start.scrxxx to hy_start.scr, e.g.:

mv /u1/mip1/hy_start.scrxxx /u1/mip1/hy_start.scr

Windows:

Change the startup type of all MIP(x) services back to “Automatic” which  you have changed to

"Manual"  before,  e.g.:  “MIP  Server  Agent”,  “MIP  IPC-Server”  ,  “MIP1  Server  Agent”,  “MIP1

Maintenance Manager”

  Restart the server.

  Logon to the HYDRA server as user mipadm

  Start the MOC Client (if necessary you might need to check it's configuration first and change it as

described in chapter 1.4.2).

  Check the HYDRA Path configurations and change entries in column "Host" if necessary:

  Check the configuration of the HYDRA Scheduler.

If  the  hostname  or  the  IP-address  of  the  HYDRA  server  is  used  anywhere  (e.g.  for  interface

configurations) change it if necessary.

Change_Hostname_MW40_Server.docx  Version: 1.0.23049

Page 21 of 36

Change Hostname of a HYDRA MW4.0pe Server

  Check the MLE configuration.

If the hostname or the IP-address of the HYDRA server is used anywhere change it if necessary.

  On a server with HYDRA Multi system configuration repeat these actions for every HYDRA system.

  All specifically deactivated HYDRA services/processes can now be reactivated and started again,

e.g.:

HYDRA Scheduler (e.g. “MIP1 Scheduler”)

HYDRA ECS interface (e.g. “MIP1 ECS Inbound Dispatcher 0”, “MIP1 ECS Server FP 1”, “MIP1

ECS Server SAP 1”)

All HYDRA PDV services/processes (e.g. “MIP1 HYDRA-PDV-Communication Server” and “MIP1

HYDRA-PDV-Configuration Monitor”).

  Make sure that your HYDRA system runs properly.



If you created a copy of an existing HYDRA system please make absolutely sure that any mutual

interactions with the source system can be excluded.

Only then the duplicated system can be released from its isolated environment.

Change_Hostname_MW40_Server.docx  Version: 1.0.23049

Page 22 of 36

Change Hostname of a HYDRA MW4.0pe Server

1.4  HYDRA Clients

The configurations of all HYDRA Clients must be checked and changed if necessary.

Please check the proper functionality of the client as soon as you have changed its configuration.

1.4.1

Terminal

Depending  on  the  Terminal  version  check  the  configuration  for  the  HYDRA  server  and  change  it  if

necessary.

  Windows Terminal AIP2: file CTAIP.INI (e.g. c:\mpdv\aip2\ctaip.ini):

hostname=newServerName or newIPaddress

  CT-541: In the configuration menu enter newIPaddress for "HOST – IP":

  CTP-340: In the configuration menu enter newIPaddress for "Server IP Address"

:

Change_Hostname_MW40_Server.docx  Version: 1.0.23049

Page 23 of 36

Change Hostname of a HYDRA MW4.0pe Server

1.4.2  MES Operation Center (MOC)

The configuration file MOC.ApplicationSettings.config of all MOC clients must be checked and changed

if necessary (e.g. C:\Program Files (x86)\MPDV\HYDRA 8\MOC\MOC.ApplicationSettings.config):

<add key="MasterServer" value="newServerName"></add>

Check  if  one  or  more  of  your  MOC  clients  are  using  the  configuration  file  messystems.xml  (e.g.

C:\Program Files (x86)\MPDV\HYDRA 8\MOC\messystems.xml).

By  using  the  local  configuration  file  messystems.xml  the  global  connect  information  provided  by  the

Master Server (directory: HyInstMgrDir) on the HYDRA server can be overridden.

For  every  MOC  client  using  the  local  file  messystems.xml  the  file  must  be  checked  and  changed  if

necessary:

<mesSystems>

   <name>HYDRA 1</name>

   <url>http://newServerName:8080/MocServices/MesBusinessService</url>

   <clientid>1</clientid>

   <instanceurl>newServerName:8080</instanceurl>

</mesSystems>

Change_Hostname_MW40_Server.docx  Version: 1.0.23049

Page 24 of 36

Change Hostname of a HYDRA MW4.0pe Server

1.4.3  B-COMM

Start the B-COMM service manager as administrator:

Remove the installed B-COMM service:

Change_Hostname_MW40_Server.docx  Version: 1.0.23049

Page 25 of 36

Enter the new hostname or the IP-address and install the B-COMM service again:

Change Hostname of a HYDRA MW4.0pe Server

Change_Hostname_MW40_Server.docx  Version: 1.0.23049

Page 26 of 36

Change Hostname of a HYDRA MW4.0pe Server

1.4.4

ILHYDRA

Before changing the configuration all ILHYDRA processes/services must be stopped.

Inside the installation directory of ILHYDRA (e.g. d:\mip1\ilhydra) check the following files and change them

if necessary:



ilhydra.ini

…

[DDCOM]

Host = "newIPaddress"

…

  clientkbudp1\kbudp1.it1

…

IPADDR = newIPaddress;

…

If  the  file  kbudp1.it1  was  changed,  it  is  necessary  to  do  a  new  compilation  using  the  InterLink  Client

(ilcbenz.exe).

This procedure is password protected and can only be done when you are assisted by personnel

of MPDV Mikrolab GmbH.

Change_Hostname_MW40_Server.docx  Version: 1.0.23049

Page 27 of 36

Change Hostname of a HYDRA MW4.0pe Server

1.4.5  PDV

1.4.5.1  HYDRA Client MOC

Using MES Operation Center (MOC):

In  Menu  System  administration  –  System  settings  –  INI  data  configuration  for  configuration

WEBSERVICE check if the key SERVICEURL might have been explicitly set to “Active”.

Change it if necessary:

http://newServerName:8080/MpdvServices/MesPdvService

1.4.5.2  HYDRA Terminal

  Check the local file PCC.INI (e.g. C:\MPDV\AIP2\pcc.ini) and change it if necessary:

…

[WSK]

Host=newIPaddress

…

  Check the local file PDV_DLL.INI (e.g. C:\MPDV\AIP2\pdv_dll.ini) and change it if necessary:

…

[Transport]

IP=newIPaddress

…

  Restart the HYDRA Terminal.

Change_Hostname_MW40_Server.docx  Version: 1.0.23049

Page 28 of 36

Change Hostname of a HYDRA MW4.0pe Server

1.4.6  CAQ MDI Interface

Check if there is a connection to an MDI server activated in the HYDRA Scheduler (e.g. with license HYD-

MDI):

If this manual is used to create a working copy of an already running HYDRA system, e.g. creating a test

system as copy of a productive system, you have to deactivate the access to the MDI server.

If not, you will experience loss of data and inconsistent data sets.

Change_Hostname_MW40_Server.docx  Version: 1.0.23049

Page 29 of 36

Change Hostname of a HYDRA MW4.0pe Server

1.4.7  WFM Workflow Management

At the Workflow Management the Server entry needs to be changed by using the Installation Wizard.

This creates a second directory tree in which all entries of the old server name must be changed.

The old tree has to be deleted at the end.

In the example, the server name "w2012r2sql12en" changed to "192.168.70.142".

Start Wizard.

Change Server name.

Change_Hostname_MW40_Server.docx  Version: 1.0.23049

Page 30 of 36

Change Hostname of a HYDRA MW4.0pe Server

Change „Admin Server“ Entry.

Change License-Server Entry.

Change_Hostname_MW40_Server.docx  Version: 1.0.23049

Page 31 of 36

Change Hostname of a HYDRA MW4.0pe Server

Change Admin Database-Server Entry.

Change License Entry.

Change Processes Database-Server Entry.

Change_Hostname_MW40_Server.docx  Version: 1.0.23049

Page 32 of 36

Change Hostname of a HYDRA MW4.0pe Server

Change Processes External Connections Entry.

Change the Insign and Inspire Server Addresses.

Change_Hostname_MW40_Server.docx  Version: 1.0.23049

Page 33 of 36

Change Hostname of a HYDRA MW4.0pe Server

Change the Name Mail-Sender.

Delete all old Entry’s from the Directory Tree.

Change_Hostname_MW40_Server.docx  Version: 1.0.23049

Page 34 of 36

Change Hostname of a HYDRA MW4.0pe Server

1.4.8  SmartMES (SMA)

The SMA configuration file (Default: c:\inetpub\wwwroot\SMA\Web.config) on the SMA server (usually

identically with the HYDRA Windows server) must be checked and the following line must be changed:

Hostname or IP address for the HYDRA MasterServer:

<add key="MasterServer" value="newServerName" />

On the SMA server (usually identically with the HYDRA Windows server) the name of the connection to the

HYDRA server must be changed inside the Internet Information Services (IIS) Manager:

Check for any URL shortcuts for SmartMES (SMA), e.g.:

 inside the folder “MIP

Administration” on the Windows Desktop, and change the hostname or the IP address if necessary:

Change_Hostname_MW40_Server.docx  Version: 1.0.23049

Page 35 of 36

Change Hostname of a HYDRA MW4.0pe Server

Change_Hostname_MW40_Server.docx  Version: 1.0.23049

Page 36 of 36

