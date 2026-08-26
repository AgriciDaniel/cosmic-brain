Manual

E-Report Manager
Installation+Update
SIS-ERM 4.0pe

Version 1.3

Last changed on: 01.07.2019

E-Report Manager Installation+Update

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of Oracle Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

SIS-ERM_40_installation.docx

Version: 1.4.19468

Page 2 of 23

E-Report Manager Installation+Update

Contents

1  First installation ............................................................................................ 4

1.1  Requirements ...................................................................................................... 4

1.2  Definition of terms ............................................................................................... 4

1.3

Installing a HYDRA update .................................................................................. 4

1.4  Running database patch on the HYDRA server ................................................... 5

1.5  Configurations on the MOC ................................................................................. 5

1.6

Installation on the E-Report Server ...................................................................... 7

1.6.1  Overview ................................................................................................. 7

1.6.2

Installing program files ............................................................................. 7

1.6.3  Configuration of the Print Server service ................................................. 7

1.6.4  Customizations in MOC applications ....................................................... 9

1.6.5  Configuring List & Label for the Print Server service ................................ 9

1.6.6  Printer configuration for the Print Server service .................................... 10

1.6.7  HTTPS / Basic Authentication ............................................................... 10

1.6.8

Installation of the Print Server service ................................................... 19

1.6.9  Troubleshooting ..................................................................................... 20

1.7  Checking the application on the MOC and setting up test.................................. 21

2  Update ........................................................................................................ 22

2.1

Installing an update ........................................................................................... 22

2.2  Updating the Print Server service on the e-report server ................................... 22

SIS-ERM_40_installation.docx

Version: 1.4.19468

Page 3 of 23

E-Report Manager Installation+Update

1  First installation

This  section  describes  how  to  install  the  E-Report  Manager    (first  installation).  If  the  E-Report

Manager  has  already  been  installed  and  you  only  want  to  update  the  installation,  go  on  with

section "2 Update".

1.1  Requirements

  HYDRA system as of service pack 12 for HYDRA 8.

  For communication via HTTPS: service pack 15 (end 2019)

In case of a first installation: Installed ScriptAddOn for service pack 12 for HYDRA 8.

1.2  Definition of terms

E-Report Management

E-Report Manager

Global term for everything associated with e-reporting: e-report server, the Print Server service, the

MOC application Configuration E-Report Manager, ...

E-Report Server

Host where the Print Server service is installed.

Configuration E-Report Manager

Name of the MOC application to configure reports for the E-Report Management.

Print Server service

Windows service that receives the orders to create, print and send reports.

Mpdv Print Service

Name of the Print Server service in the Windows application "Services".

MpdvPrintServer.exe

Name of the program file of the Print Server service

1.3  Installing a HYDRA update

If  your  HYDRA  system  does  not  yet  include  service  pack  12,  you  must  first  install  service  pack  12.  To

identify the current system version including service pack information, go to the file "sp.txt" in the HYDRA

directory of the HYDRA server.

If  you  install  the  e-report  manager  for  the  first  time  and  the  ScriptAddOn  of  service  pack  version  12  is

missing,  you must first install the  ScriptAddOn of service pack 12. To identify  the current version  of the

ScriptAddOn in your system, go to the file "sp.addOn" in the HYDRA directory of the HYDRA server.

SIS-ERM_40_installation.docx

Version: 1.4.19468

Page 4 of 23

E-Report Manager Installation+Update

If you want to configure and use the communication via https, you require HYDRA version MW 3.x with

service pack 15 or HYDRA version MW 4.0pe. Service pack 15 is probably available by the end of 2019. If

you want to use the communication via HTTPS with MW3.x before service pack 15 is available, you require

a personalized update. Contact MPDV, if required.

1.4  Running database patch on the HYDRA server

In case of a first installation, you must extend the HYDRA database. Run a database patch to do so. This

patch additionally provides specific initial data for the configuration of the e-report management.

Windows:

Start the MS-DOS prompt on the HYDRA server from the "HYDRA Administration" directory for

the instance currently processed on the desktop.

Run the following command in the command line:

hydscr db_sql/dbp_ereportmanager.hsc > dbp_ereportmanager.pro

Linux: Connect to the HYDRA server via telnet connection and start hysys.scr -1 (environment

for instance 1).

Run the following command in the command line:

hydscr.out db_sql/dbp_ereportmanager.hsc > dbp_ereportmanager.pro

Windows and Linux:

Check the output of the patch in the file dbp_ereportmanager.pro. No errors or warnings may

occur.

1.5  Configurations on the MOC

Checking path configuration

The patch creates two paths that are derived from the path MOCREP. Check in the MOC application Paths,

if the paths have been created automatically and if the URL path is reasonable.

1.  PSLLXML

This  path  includes  the  parameter  configuration,  e.g.  the  files  including  the  parameter  values

(selection panel) of the reports.

The name PSLLXML is fixed.

Example:

d:\hydra\1\custom\eReporting

SIS-ERM_40_installation.docx

Version: 1.4.19468

Page 5 of 23

E-Report Manager Installation+Update

2.  PSREPORT

This path is required to save the report output files. The path is assigned in a field of each data

record in the e-report configuration. You are free to select any path name, but we recommend to

use PSREPORT.

Example:

d:\hydra\1\custom\eReporting

3.  MOCREP

This path includes the report files. Usually, the path is preconfigured in the HYDRA system.

Example:

d:\hydra\1\custom\reports

The server/computer including the installation of the Print Server service must be authorized

to  access  the  configured  file  path.  Also  the  user  using  the  Print  Server  service  must  be

authorized to access the paths.

Example:

If the patch could not create the two paths, you must create the paths on the MOC.

Configuration escalation management

The patch creates the event ESK.MESSAGE in the Escalation configuration, if not yet available. To send

reports per mail, you may configure the event only once.

Check in the escalation configuration if the event ESK.MESSAGE has been created properly.

The configuration of the recipient type/recipient has the role of a dummy in this escalation configuration.

The recipient is configured in the Configuration of the e-report manager.

The following values for the event ESK.MESSAGE must be entered in the Escalation configuration:

Field
Event
Active
Subject
Text

Tab
Event
Event
Message
Message
Notification  Condition 1 / Operator
Notification  Condition 1 / Type

Contents
ESK.MESSAGE
<Activated>
%ESK.MSGSUBJ%
%ESK.MSGTXT%
to
E-mail

SIS-ERM_40_installation.docx

Version: 1.4.19468

Page 6 of 23

E-Report Manager Installation+Update

You must properly activate the escalation management in the HYDRA basic settings. To do so,

define an e-mail server (SMTP server) and a sender for the e-mails.

INI configuration URL of the E-Report Server

Store the address of the e-report server on the MOC in an INI configuration. If required, you must first

create an INI configuration and then an INI data configuration:

Name:

PRINTSERVER

Section:

E-REPORTING

Key:

SERVERURL

Value:

The address where the e-report server is available,

incl. protocol and port, e.g. http://testserver:9017

You  can  also  select  a  deviating  port,  see  also  section  "1.6.3  Configuration  of  the  Print  Server  service",

property "ServiceUri".

1.6  Installation on the E-Report Server

1.6.1 Overview

On the e-report server, a service is installed that  gets the orders to create, print and send reports. The

service is called "Print Server service".

The e-report server can be identical to the HYDRA server if it is a Windows server.

1.6.2 Installing program files

Unpack the zip file MpdvPrintServer.zip (<HYDRA>\products\eReporting\MpdvPrintServer.zip) in a folder

with write permission, e.g. C:\ProgramData\mpdv\MpdvPrintServer

1.6.3 Configuration of the Print Server service

You  must  modify  the  paths  in  the  MpdvPrintServer\bin\Release\MpdvPrintServer.exe.config.  Set  the

following parameters in the node <appSettings> of the XML file:

KEY
PathConfig

VALUE (example)
C:\ProgramData\mpdv\MpdvPrintSer
ver

Description
Specifies where the Print Server service is
installed.

SIS-ERM_40_installation.docx

Version: 1.4.19468

Page 7 of 23

PathLog

HydraSys

C:\ProgramData\mpdv\MpdvPrintSer
ver\bin\Log
http://myServer.myDomain.local or
https://myServer.myDomain.local

HydraPort
HydraUsr

8080
eRepServer

HydraPsw

4711

HydraPswCryp

Rbsb43QpvCAcKnGc5TEFTg==

ServiceUri

http://127.0.0.1:9017/ or
https://127.0.0.1:9017/

LoginClient
Culture

LogLevel
LogCombit

SecondsBetweenUp
datingTaskList

1
de-DE

Off
false

1680

E-Report Manager Installation+Update

Specifies where the log files of the Print
Server service are stored.
Address of the WSP on the HYDRA
server
If the communication is made via HTTPS,
then the entry must start with "https".
Note: To use https, you require further
configurations.
Use the "fully qualified domain name"
because an HTTPS communication is not
possible without.
Port of the WSP on the HYDRA server
HYDRA user (create a separate HYDRA
user for the Print Server service)
Password of the HYDRA user (create a
separate user for the Print Server service)
Optional encrypted password of the
HYDRA user (create a separate user for
the Print Server service) (as of SP15). To
encrypt the password, you can use the
tool MpdvHyToolDbPassGen described
below. As of SP15, the Print Server
service encrypts the password on start
from the setting HydraPsw to the setting
HydraPswCryp.
Address where the service is locally
available.
The IP address 127.0.0.1 is for "localhost"
and should not be changed.

If the communication is made via HTTPS,
then the entry must start with "https".
Note: To use https, you require further
configurations.

The number after the colon specifies the
port used for the Print Server service. If
required, you can change the port, e.g. if
the port is used by another service. Note:
If you change the port, you must also
change the port in other places, e.g. in the
INI configuration on the MOC.

Standard language of the Print Server
service
Important to Support: "Trace"
Set to true to activate the logging of the
List&Label component.
1680 = 28 min
Specifies the update intervals of the Print
Server service's TaskList.
(Because the WSP is usually configured
with a timeout of 30 minutes, the
recommended interval for the KEY
SecondsBetweenUpdatingTaskList is
28 min. If the interval is larger, the Print
Server service might have to log in anew.
However, the new login is not a problem).

SIS-ERM_40_installation.docx

Version: 1.4.19468

Page 8 of 23

DefaultSettingScope  Local

Scope to process customizations
("standard" may only be used by MPDV)

E-Report Manager Installation+Update

1.6.4 Customizations in MOC applications

You must manually copy customizations of MOC applications from an existing MOC installation and store

the customizations in an installation folder of the Print Server service. (valid as of version 2.2.x.x of the

Print Server service)

Copying customizations of the custom scope:

Source on the MOC
c:\Program Files\MPDV\MOC\

custom\plugins\*.*
custom\conf\MOC\Apps\*.*
custom\resources\data\Properties\*.*
custom\resources\data\Services\*.*
custom\resources\languages\*.*

Storage location on the e-report server
(example)
c:\ProgramData\mpdv\MpdvPrintServer\
resources\custom\plugins
resources\custom\conf\Apps
resources\custom\data\properties
resources\custom\data\services
resources\custom\languages

Copying customizations of the local scope:

Source on the MOC
c:\Program Files\MPDV\MOC\
local\plugins\*.*
local\conf\MOC\Apps\*.*
local\resources\data\Properties\*.*
local\resources\data\Services\*.*
local\resources\languages\*.*

Storage location on the e-report server (example)
c:\ProgramData\mpdv\MpdvPrintServer\
resources\local\plugins
resources\local\conf\Apps
resources\local\data\properties
resources\local\data\services
resources\local\languages

1.6.5 Configuring List & Label for the Print Server service

If  you  want

to  use  List  &  Label

to  print

reports,  you  must  modify

the  configuration

(MpdvPrintServer.exe.config) with respect to the operating system.

  For x64 (default): x86 is commented out

<!-- Run x64: -->
<probing privatePath="vendor/LL20/x64;" />
<!-- Run x86: -->
<!-- <probing privatePath="vendor/LL20;" /> -->

  For x86 (default): x64 is commented out

SIS-ERM_40_installation.docx

Version: 1.4.19468

Page 9 of 23

E-Report Manager Installation+Update

<!-- Run x64: -->
<!-- <probing privatePath="vendor/LL20/x64;" /> -->
<!-- Run x86: -->
<probing privatePath="vendor/LL20;" />

1.6.6 Printer configuration for the Print Server service

To enable List & Label to print reports, you must install and activate at least one printer on the computer

where the Print Server service is installed.

The printer settings then apply for printing.

If no "real" printer is installed, the XPS printer can also be used as default printer.

1.6.7 HTTPS / Basic Authentication

Overview of the communication as of SP 15 (beforehand the MOC directly communicates with the Print

Server service):

MOC  <------>  WSP  <-------->  Print Server service

You can secure the communication between Print Server service and WSP:

-  The communication between WSP and Print Server service is protected via Basic Authentication.

-  The communication between WSP and Print Server service can optionally be made via HTTPS in

encrypted form.

Availability:

-  Basic Authentication

-  Communication via HTTPS

Both features are available as of HYDRA version MW 3.x with service pack 15 or HYDRA version

MW 4.0pe. Service pack 15 is probably available by the end of 2019. If  you want to use one of

the  two  features  with  MW 3.x  before  service  pack  15  is  available,  you  require  a  personalized

update. Contact MPDV, if required.

Also at a later point in time, you can still activate or deactivate the communication via HTTPS.

You can also change user and password for Basic Authentication at a later point in time. In both

cases,  you  must  restart  the  WSP  and  the  Print  Server  service  after  having  changed  the

configurations.

SIS-ERM_40_installation.docx

Version: 1.4.19468

Page 10 of 23

E-Report Manager Installation+Update

User and password for Basic Authentication

The  WebServcieProvider  WSP  uses  a  default  user  with  a  default  password  to  access  the  Print  Server

service.  If  no  specific  user  and  password  is  configured,  the  WSP  and  the  Print  Server  service  use  the

following default values:

Default user: MPDVPrintService

Default password: Mosbach74821

You can change user and password. Change the configuration for the WSP and the Print Server service:

1)  For the WSP in the global configuration file config.properties

(Example: \\MyServer\HYDRA\JHydraDir\MOC\config.properties)

Note:

Do not use the configuration file in the sub folder with the instance number!

printservice.user=MPDVPrintService

printservice.user.password=oYOudOFYxRGjbcCI5vWDhg==

2)  For the Print Server service in the configuration file

(Example MpdvPrintServer\bin\Release\MpdvPrintServer.exe.config)

    <add key="WspInterfaceUsr" value="MPDVPrintService"/>

    <add key="WspInterfacePwdCryp" value="oYOudOFYxRGjbcCI5vWDhg=="/>

The passwords are saved in encrypted form.

The following tool is available to encrypt user and password:

admtools/java_db_passwd/MpdvHyToolDbPassGen.jar

There  are  two  ways  to  start  the  program.  Under Windows  or  another  operating  system  that  provides  a

Windows Manager, double-click the tool to start the GUI of the tool. Enter the user name and the password

and  click  the  button  Encrypt  password.  The  encrypted  password  can  then  be  copied  from  the  text  field

Crypted password.

SIS-ERM_40_installation.docx

Version: 1.4.19468

Page 11 of 23

The  second  option  to  encrypt  a  password  is  to  use  the  command  line  mode.  Open  a  Shell  prompt  and

E-Report Manager Installation+Update

change to the following directory:

<HYDRA Dir>/admtools/java_db_passwd

Use the command below to create an encrypted password:

java –jar MpdvHyToolDbPassGen.jar –u USERNAME –p PASSWORD

Automatic encryption of passwords

You can also enter the passwords in the configuration file of the Print Server service without encryption.

On  start  of  the  Print  Server  service,  the  passwords  are  automatically  encrypted.  Also  with  existing

installations,  the  passwords  in  the  configuration  file  are  automatically  encrypted  on  start  of  the  current

version of the Print Server service.

The following passwords in the configuration file MpdvPrintServer.exe.config in section "appSettings" are

automatically encrypted. The setting with the non-encrypted password is set to empty:

  HydraPsw is encrypted and converted to HydraPswCryp (for the user in setting HydraUsr)

  WspInterfacePwd is encrypted and converted to WspInterfacePwdCryp (for the user in setting

WspInterfaceUsr)

On  saving  the  encrypted  passwords,  the  section  "appSettings"  in  the  configuration  file  is

automatically rewritten. The setting sequence and the comments are lost in this process.

You

can

still

view

the  original

sequence  and

the

comments

in

the

file

MpdvPrintServer.exe.config.initial.  The  file  MpdvPrintServer.exe.config.initial  is  the  sample  file

delivered with the software.

The Print Server service can only enter the automatically encrypted passwords in the configuration file,

if the user who is running the service, has write access to the file MpdvPrintServer.exe.config! If this is

not the case, the service stops after the start and shows an error message.

The log then includes the following message:

22708|2019-03-26 14:37:35.5627|WARN||String|HandlePwdEncryption.  EXCEPTION

:System.UnauthorizedAccessException The access to the path

"C:\ProgramData\mpdv\MpdvPrintServer\bin\Release\MpdvPrintServer.exe.Config"

has been denied. Void WinIOError(Int32, System.String)

SIS-ERM_40_installation.docx

Version: 1.4.19468

Page 12 of 23

E-Report Manager Installation+Update

HTTPS: General

You can only use the communication via the encrypted protocol HTTPS if this communication is

activated for the WSP and for the Print Server service.

If the Print Server service and the WSP are installed on the same server, it is not useful to use

the  encrypted  protocol  HTTPS  for  the  communication  between  Print  Server  and  WSP.  The

encryption via HTTPS has a slight negative effect on the performance.

HTTPS: Activation for the WSP

To  activate  the  communication  via  HTTPS  from  the  WSP  to  the  Print  Server  service,  you  use  the  INI

configuration  "PRINTSERVER / E-REPORTING / SERVERURL".  If  the  URL  starts  with  "https"  in  this

configuration, the communication is made via HTTPS.

If you want to use HTTPS, the public root certificate of the E-Report Server (RootCA) must be available in

the Java TrustStore.

If  the  Print  Server  service  is  installed  on  the  HYDRA  server,  you  can  use  the  certificate  of  the  HYDRA

server for this purpose. But you must also import this certificate to the TrustStore in any case.

How to do this is described in the installation instruction of the system for the WSP.

HTTPS: Activation for the Print Server service

Make the following settings in the configuration file MpdvPrintServer.exe.config:

1.  For the protocol of the ServiceUri, enter "https". Use the "fully qualified domain name" because an

HTTPS communication is not possible without:

<add key="HydraSys" value="https://myServer.myDomain.local"/>

2.  For the protocol of the ServiceUri, enter "https":

<add key="ServiceUri" value="https://127.0.0.1:9018/"/>

For the port of the ServiceUri, you must provide a certificate that is issued for the server of the Print Server

service.

If you double-click the certificate (for example: myServer.pfx), a wizard automatically opens for the import

of the certificate:

SIS-ERM_40_installation.docx

Version: 1.4.19468

Page 13 of 23

E-Report Manager Installation+Update

SIS-ERM_40_installation.docx

Version: 1.4.19468

Page 14 of 23

E-Report Manager Installation+Update

SIS-ERM_40_installation.docx

Version: 1.4.19468

Page 15 of 23

E-Report Manager Installation+Update

The

certificate

is

now

available

in

the  Microsoft  Management  Console

(MMC)

(https://docs.microsoft.com/en-us/dotnet/framework/wcf/feature-details/how-to-view-certificates-with-the-

mmc-snap-in ):

SIS-ERM_40_installation.docx

Version: 1.4.19468

Page 16 of 23

E-Report Manager Installation+Update

Double-click the certificate to identify the certificate's thumbprint:

SIS-ERM_40_installation.docx

Version: 1.4.19468

Page 17 of 23

E-Report Manager Installation+Update

Using this information, the port configuration of the Windows system can be changed. Open a Windows

command line as admin (!). Run the following command to release the port:

netsh http add urlacl url=https://+:9018/ user="NT AUTHORITY\NETWORKSERVICE"

Run the following command to bind the certificate to the port (all in one row):

netsh http add sslcert ipport=0.0.0.0:9018

certhash=748a03d1e078926932e53b3343076d43a9335381  appid={00112233-4455-6677-1111-

AABBCCDDEEFF}

Here, "certhash" is the thumbprint of the certificate.

"appid"  is  a  GUID  that  can  be  freely  assigned.  It  can  be  used  to  identify  the  possessing  application.

(https://docs.microsoft.com/en-us/dotnet/framework/wcf/feature-details/how-to-configure-a-port-with-an-

ssl-certificate )

SIS-ERM_40_installation.docx

Version: 1.4.19468

Page 18 of 23

The MPDV Print Service is now available via HTTPS:

E-Report Manager Installation+Update

Here, it is important to use the "fully qualified domain name" (for example: win2008-11.mpdv.local)

1.6.8 Installation of the Print Server service

You must install the Print Server service in the Windows services. You require the Microsoft Net Framework

4.5 for the operation of the Print Server service.

Sample installation:

In the command line, change to the directory where the file mpdvPrintServer.exe is:

C:
cd C:\ProgramData\mpdv\MpdvPrintServer\bin\Release

Install the service using the utility program of the .NET Framework:

C:\WINDOWS\Microsoft.NET\Framework\v4.0.30319\InstallUtil.exe  mpdvPrintServer.exe

The  service  requires  access  to  installed  printers.  The  service  must  also  have  write  access  to  its

configuration file to be able to automatically encrypt passwords. You must therefore assign a Windows user

with the relevant authorizations to the service. If the service is installed on the HYDRA server, this can be

the user hydadm, for example. Which user is suitable depends on the authorization concept used in your

server environment.

Assign a Windows user with the required authorizations to the service: (Services  right-click Mpdv Print

Service  Properties  tab Log on).

After the installation, you must start the service Mpdv Print Service manually.

MPDV recommends to set the start type of the Mpdv Print Service to "automatic" (go to: Services  right-

click Mpdv Print Service  Properties  tab General  Start type).

SIS-ERM_40_installation.docx

Version: 1.4.19468

Page 19 of 23

E-Report Manager Installation+Update

1.6.9 Troubleshooting

Checking service and printer availability

To use a printer, ensure that the Windows user configured for the service can access a printer and has the

required authorizations.

Example:

Using the web address of the e-report server, you can query the status of the Print Server service:

a.

Is the service running?

Example:

http://testserver:9017/HelloPrintServer

Answer:

b.  Which printers are available for the Print Server service?

Example:

http://testserver:9017/Printers

Answer:

If the configured web address of the e-report server does not work, you may have to activate the port.

Example:

netsh http add urlacl url=http://+:9017/ user="NT AUTHORITY\NETWORKSERVICE"

SIS-ERM_40_installation.docx

Version: 1.4.19468

Page 20 of 23

E-Report Manager Installation+Update

Log file of the Print Server service

If problems occur, you can check the log file in the directory of the Print Server service (a respective log

level is of advantage).

The log file path is included in the configuration file MpdvPrintServer.exe.config of the Print Server service.

It is set in setting "PathLog". (e.g. "C:\ProgramData\mpdv\MpdvPrintServer\bin\Log")

The Print Server service does not start

Check the log file. Possible reasons:

No write access to configuration file

The Print Server service can only enter the automatically encrypted passwords in the configuration file, if

the user who is running the service, has write access to the file MpdvPrintServer.exe.config! If this is not

the case, the service stops after the start and shows an error message.

The log then includes the following message:

22708|2019-03-26 14:37:35.5627|WARN||String|HandlePwdEncryption.  EXCEPTION

:System.UnauthorizedAccessException The access to the path

"C:\ProgramData\mpdv\MpdvPrintServer\bin\Release\MpdvPrintServer.exe.Config"

has been denied. Void WinIOError(Int32, System.String)

Assign a suitable Windows user to the Print Server service "Mpdv Print Service":  Services  right-click

Mpdv Print Service  Properties  tab Log on).

1.7  Checking the application on the MOC and setting up test

Call the application Configuration E-Report manager via the transaction code "rbbj" or the menu.

System administration / System settings / Configuration E-Report manager

The report is tested by the Print Server service on the server.

You can define a printer in the E-Report configuration. The Print Server service must be able to address

this printer as described above. The report test includes tests of printing and e-mail dispatch, if printing or

e-mail dispatch have been configured in the e-report configuration. During the test, the report files are

loaded from the server.

SIS-ERM_40_installation.docx

Version: 1.4.19468

Page 21 of 23

E-Report Manager Installation+Update

2  Update

2.1  Installing an update

Updates of the SIS-ERM installation are necessary, if you receive a service pack or a separate update for

the e-report manager of MPDV.

Before you perform the steps listed below, you must have installed the update or the service pack. If the

installation instructions or the separate update already include the steps to update the e-report manager,

you need not perform the steps that follow.

2.2  Updating the Print Server service on the e-report server

You require the Microsoft Net Framework 4.5 for the operation of the Print Server service.

Perform the following steps on the server where the Print Server service is running:

1.  Close the service "Mpdv Print Service".

Check the start type and the Windows user defined for the service in the Properties of the service

(right-click Mpdv Print Service  Properties  tab Start type and tab Log on). Remember or note

down the two settings because you must restore the settings after the reinstallation of the service.

2.  Uninstall the service "Mpdv Print Service".

Open a command line window.

In the command line, navigate to the directory mpdvPrintServer.exe.

(e.g.: cd C:\ProgramData\mpdv\MpdvPrintServer\bin\Release)

In the directory of the file mpdvPrintServer.exe, enter the following command in the command line

to uninstall the service:

C:\WINDOWS\Microsoft.NET\Framework\v4.0.30319\InstallUtil.exe /u
mpdvPrintServer.exe

SIS-ERM_40_installation.docx

Version: 1.4.19468

Page 22 of 23

E-Report Manager Installation+Update

(Leave the command line window open. You will need it later on.)

3.  Create a directory for a backup copy of the original directory.

e.g. MpdvPrintServer_save

Do not rename the original directory to keep the Windows authorizations untouched.

Copy the contents of the original directory into the backup directory.

4.  Empty the original directory MpdvPrintServer.

5.  Unpack the zip file: MpdvPrintServer.zip (<HYDRA>\products\eReporting\MpdvPrintServer.zip)

to the empty MpdvPrintServer directory.

6.  Restore your configuration by comparing the new

MpdvPrintServer\bin\Release\MpdvPrintServer.exe.config to your old
MpdvPrintServer_save\bin\Release\MpdvPrintServer.exe.config.

If you have customizations for CUSTOM or LOCAL, also restore these customizations.

7.  Reinstall the service "Mpdv Print Service".

If required, use the command line to navigate to the directory mpdvPrintServer.exe.

(e.g.: cd C:\ProgramData\mpdv\MpdvPrintServer\bin\Release)

In the directory of the file mpdvPrintServer.exe, enter the following command in the command line

to reinstall the service:

C:\WINDOWS\Microsoft.NET\Framework\v4.0.30319\InstallUtil.exe
mpdvPrintServer.exe

Restore the start type and the Windows user defined for the service in the Properties of the service

(right-click Mpdv Print Service  Properties  tab Start type and tab Log on).

8.  Restart the service "Mpdv Print Service".

SIS-ERM_40_installation.docx

Version: 1.4.19468

Page 23 of 23

