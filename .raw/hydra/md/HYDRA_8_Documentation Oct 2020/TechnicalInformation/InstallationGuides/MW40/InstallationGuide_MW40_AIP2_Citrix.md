HYDRA Documentation

HYDRA MW4.0pe
Installing AIP 8.2 on Citrix

Version 1.0.23049

Last changed on: 02.09.2020

Installing AIP 8.2 on Citrix

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of Oracle Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

InstallationGuide_MW40_AIP2_Citrix.docx Version: 1.0.23049

Page 2 of 27

Installing AIP 8.2 on Citrix

Contents

1  Purpose ........................................................................................................ 4

2  Requirements ............................................................................................... 5

3  Restrictions .................................................................................................. 7

4  Pre Installation Configuration ....................................................................... 8

4.1  AIP2 application directory .................................................................................... 8

4.2

Location for AIP2 configuration files .................................................................... 8

4.3  Windows Settings .............................................................................................. 10

4.4  Port Configuration ............................................................................................. 12

5

Installation .................................................................................................. 13

5.1  AIP2 application ................................................................................................ 13

5.2  AIP2 configuration files ...................................................................................... 14

5.3  PCC configuration files ...................................................................................... 16

5.4  HYDRA Fonts .................................................................................................... 17

5.5  Publish AIP2 Software ....................................................................................... 17

6  Post Installation Configuration ................................................................... 18

6.1  Terminal Configuration Set ................................................................................ 18

6.2  Automatic Clock Adjustment .............................................................................. 19

6.3  Automatic Restart of Terminal ........................................................................... 20

6.4  Gateway Communication AIP2 .......................................................................... 21

6.5  Gateway Communication PCC .......................................................................... 22

6.6  Barcode or ID-Code Readers ............................................................................ 23

6.7  Operating without Touch Screen Monitor .......................................................... 24

6.8  Restricting AIP2 Window Size ........................................................................... 25

7  Ready to Go ............................................................................................... 26

8  Updating AIP2 Software ............................................................................. 27

InstallationGuide_MW40_AIP2_Citrix.docx Version: 1.0.23049

Page 3 of 27

Installing AIP 8.2 on Citrix

1  Purpose

This manual describes the necessary tasks to install the HYDRA Terminal software AIP 8.2 (Acquisition &

Information Panel) on a Citrix XenApp Server.

AIP 8.2 (AIP2) is especially designed to run on industrial PCs with a touch screen monitor and without a

standard keyboard and mouse connected.

Running AIP 8.2 (AIP2) on a Citrix XenApp Server instead of dedicated standard PC hardware comes along

with certain restrictions, see chapter “3 Restrictions”.

InstallationGuide_MW40_AIP2_Citrix.docx Version: 1.0.23049

Page 4 of 27

Installing AIP 8.2 on Citrix

2  Requirements

  Citrix XenApp 6.5

Please note that MPDV Mikrolab GmbH does not provide any expertise regarding Citrix itself.

  Operating System: Windows Server 2008 R2 Standard or Enterprise Edition



It is necessary to reboot the Citrix (Windows) server hosting the AIP2 clients at least every 30-40

days! (see chapter 6.2 Automatic Restart of Terminal)

  One Windows user account for each running AIP2 instance.

  Unique HYDRA user ID for each running AIP2 instance (see chapter 5.2 AIP2 configuration files).

The available HYDRA user ID range is 1 to 999.

  A minimum of 500 MB capacity available on the disk drive.



Installed Internet Explorer version 6 or newer.

  TCP/IP (IPv4) network configuration for the LAN/WAN network.

  Unique network ports for all installed AIP2 instances.

  The local Windows Firewall should be turned off.



Installed .NET Framework 3.5 (includes .NET 2.0 and 3.0).



Installed Visual C++ 2010 x86 Redistributable Package.

Note: At least version 10.0.30319 of the Microsoft Visual C++ 2010 x86 Redistributable Package

must be installed.

  Barcode or ID-code readers approved by MPDV Mikrolab GmbH.

To provide the full functionality of such reader systems AIP2 expects them to be connected to a

local COM port.

Therefor the COM port of the Citrix client PC (e.g. Thin Client  hardware) must be routed to the

Citrix Server where the AIP2 software is actually running.

Those routed COM ports must be visible in the Device Manager of the Citrix server.

InstallationGuide_MW40_AIP2_Citrix.docx Version: 1.0.23049

Page 5 of 27



Installed HYDRA 8 (MW4.0pe) server which is up and running.

Installing AIP 8.2 on Citrix

This installation instruction assumes that the applications name server process

  up to and including MES Weaver 3.1: “HYDRA Nameserver”



from MES Weaver 4.0pe onwards: “MIP Nameserver”

is listening on network port 10000.

It is mandatory that you are checking the actual port of your HYDRA installation.

If the port of your HYDRA installation differs, you have to set a permanent environment variable

in the AIP host’s operating system:

HYPORT = ACTUAL_PORT_NUMBER

InstallationGuide_MW40_AIP2_Citrix.docx Version: 1.0.23049

Page 6 of 27

3  Restrictions

Installing AIP 8.2 on Citrix

  Only one running AIP2 instance for each Windows user account.

Users trying to start more than one AIP2 instance inside their Citrix client session will receive an

error message.

Multiple starts of AIP2 instances within the context of one user account (e.g. by parallel Citrix client

and Citrix desktop sessions) must be prohibited by the Citrix administrator.

  HYDRA MDE (machine data gathering):

No automatic machine data gathering by using OPC communication, CT-UMPS, MSS, etc.

  HYDRA PDV (process data gathering):

No automatic machine data gathering by using OPC communication, CT-UMPS, MSS, etc.

  HYDRA CAQ (quality management):

No automatic measurement reading via MDI-Server (Steinwald, Ibrit, Measurement lists, etc.).

  No remote access functionality by using VNC software provided by HYDRA.

InstallationGuide_MW40_AIP2_Citrix.docx Version: 1.0.23049

Page 7 of 27

4  Pre Installation Configuration

Login as Windows user (e.g.: Administrator) which must be member of the local group Administrators.

Installing AIP 8.2 on Citrix

4.1  AIP2 application directory

Decide where you want to put the AIP2 application files and create that directory.

e.g.: C:\Program Files (x86)\MPDV\aip2

4.2  Location for AIP2 configuration files

Each running AIP2 instance needs its own set of configuration files.

The location of those AIP2 configuration files is defined by the Windows variable HYUSEAPPDIR.

Make sure that those directories exist locally on the Citrix server.

It is mandatory to set this variable in one of the following ways:

  HYUSEAPPDIR=YES

either globally as "System Variable" (valid for all user accounts)

or individually for each user account as "User Variable":

AIP2 is expecting its configuration files in directory %APPDATA%\MPDV\AIP2 of each user

account (e.g.: "C:\Users\aip101\AppData\Roaming\MPDV\AIP2" for user aip101)

InstallationGuide_MW40_AIP2_Citrix.docx Version: 1.0.23049

Page 8 of 27

  HYUSEAPPDIR=<path>

(must be set individually for each user account as "User Variable"):

Installing AIP 8.2 on Citrix

AIP2 is expecting its configuration files in D:\data\MPDV\AIP2\aip101 if logged in with the

corresponding user account.

Please note that it is not recommended to use a network share path for HYUSEAPPDIR (e.g.:

\\server\share) or to use a mapped network drive.

If AIP2 cannot access its configuration files permanently its proper functionality cannot be

guaranteed.

InstallationGuide_MW40_AIP2_Citrix.docx Version: 1.0.23049

Page 9 of 27

Installing AIP 8.2 on Citrix

4.3  Windows Settings

  Make sure that there is one Windows user account for each running AIP2 instance available on

your Citrix server.



If you plan to use barcode or ID-code readers attached to a COM port of the Citrix client PC (e.g.

Thin Client hardware) that COM port must be routed to the Citrix Server where the AIP2 software

is actually running.

Those  routed  COM  ports  must  be  visible  in  the  Device  Manager  of  the  Citrix  server:

The FIFO buffer settings for all COM ports must be set to low:

InstallationGuide_MW40_AIP2_Citrix.docx Version: 1.0.23049

Page 10 of 27

Installing AIP 8.2 on Citrix

  The below-mentioned Windows configurations/components have to be installed and/or enabled to

be able to use the print function for labels (List & Label):

- .Net Framework 3.5

- Message-Queuing (including “MSMQ HTTP Support“)

  Region Settings – Current system locale

If there is the (Beta) checkbox “Use Unicode UTF-8 for worldwide language support” available

make sure it is not activated:

InstallationGuide_MW40_AIP2_Citrix.docx Version: 1.0.23049

Page 11 of 27

Installing AIP 8.2 on Citrix

4.4  Port Configuration

For standard AIP2 installations there will be at least the following 4 ports needed on the terminal PC:

9002 - Gateway Port for event communication (EVCOM) from the HYDRA Server to the AIP2 client.

The default port 9002 can be changed in the terminal configuration set, see "Network port".

9003 - BUSPORT for communication from AIP2 to its Process Communication Controller (PCC).

The default port 9003 can be changed in the AIP2 configuration file, see chapter 5.2 AIP2 configuration

files.

9004 - BUSSERVERPORT for communication from the Process Communication Controller (PCC) to

AIP2. The default port 9004 can be changed in the AIP2 configuration file, see chapter 5.2 AIP2

configuration files.

9005 - Gateway Port for event communication (EVCOM) from the HYDRA Server to AIP2’s Process

Communication Controller (PCC). The default port 9005 can be changed in the PCC configuration file,

see chapter 5.3 PCC configuration files.

When installing multiple AIP2 terminals on a terminal server those ports need to be unique for

every terminal instance.

Identify possible ports to be used for all the AIP2 instances and its Process Communication Controllers

(PCC) which you want to install on your terminal server.

InstallationGuide_MW40_AIP2_Citrix.docx Version: 1.0.23049

Page 12 of 27

5

Installation

Login as Windows user (e.g.: Administrator) which must be member of the local group Administrators.

Installing AIP 8.2 on Citrix

5.1  AIP2 application

  All the necessary AIP2 files are stored on the HYDRA server:

Windows:

%HYDRADIR%\ctnet\win\aip2 (e.g.: d:\mip1\ctnet\win\aip2)

UNIX:

$HYDRADIR/ctnet/win/aip2 (e.g.: /u1/mip1/ctnet/win/aip2)

  Copy the following files from the above mentioned server directory to the designated AIP2

application directory on your Citrix server, e.g. to C:\Program Files (x86)\MPDV\aip2 (see

chapter 4.1 AIP2 application directory):

*.exe

*.dll

*.mld

*.ocx

*.bpl

pict.zip

  Copy the following directory (including its contents) from the above mentioned server directory to

the designated AIP2 application directory on your Citrix server, e.g. to C:\Program Files

(x86)\MPDV\aip2 (see chapter 4.1 AIP2 application directory):

skins

(contains file mpdv.asz)



If there is a customized translation file (ctaipkd.mld) available in the directory

%HYDRADIR%\ctnet\win\aip2\custom on the HYDRA server it needs to be copied into the

designated AIP2 application directory on your Citrix server, e.g. to C:\Program Files

(x86)\MPDV\aip2 (see chapter 4.1 AIP2 application directory)

  When using the print function for labels (List & Label), the ZIP file “llprinter2.zip“ has to be

extracted from the HYDRA server directory

Windows:

%HYDRADIR%\ctnet\win\shared (e.g.: d:\mip1\ctnet\win\shared)

UNIX:

$HYDRADIR/ctnet/win/shared (e.g.: /u1/mip1/ctnet/win/shared)

to the AIP2 application directory.

InstallationGuide_MW40_AIP2_Citrix.docx Version: 1.0.23049

Page 13 of 27

Installing AIP 8.2 on Citrix

5.2  AIP2 configuration files

  All the necessary AIP2 files are stored on the HYDRA server:

Windows:

%HYDRADIR%\ctnet\win\aip2 (e.g.: d:\mip1\ctnet\win\aip2)

UNIX:

$HYDRADIR/ctnet/win/aip2 (e.g.: /u1/mip1/ctnet/win/aip2)

  Copy  the  following  file  from  the  above  mentioned  server  directory  to  the  designated  AIP2

configuration  directories  on  your  Citrix  server,  e.g.  to  %APPDATA%\MPDV\AIP2  (e.g.:

"C:\Users\aip101\AppData\Roaming\MPDV\AIP2")

(see  chapter  4.2  Location

for  AIP2

configuration files):

ctaip.bsp

  Rename file ctaip.bsp to ctaip.ini

  Open file ctaip.ini



In section [system] enter the HYDRA user ID (usr=) for your designated AIP2 instance and the

IP-address or the hostname of your HYDRA server (hostname=) and then save the file:

[system]

usr=101

hostname=192.168.10.101

loadfile=ctnet\win\aip2.txt

The available HYDRA user ID range is 1 to 999.

If a hostname is used make sure it can be resolved to its proper IP-address (IPv4).



In section [DLL] enter unique port numbers for each AIP2 instance, e.g. 8003 instead of 9003

and 8004 instead of 9004, see chapter 4.4 Port Configuration:

[Server-Communication]

...

BUSPORT=8003

...

BUSSERVERPORT=8004

InstallationGuide_MW40_AIP2_Citrix.docx Version: 1.0.23049

Page 14 of 27

Installing AIP 8.2 on Citrix

  Make  sure  there  is  a  corresponding  terminal  configuration  set  available  in  HYDRA  for  all  the

HYDRA  user  IDs  you  specified  in  the  several  ctaip.ini  files  in  all  the  configuration  directories

%APPDATA%\MPDV\AIP2 (see chapter 6.1 Terminal Configuration Set).

InstallationGuide_MW40_AIP2_Citrix.docx Version: 1.0.23049

Page 15 of 27

Installing AIP 8.2 on Citrix

5.3  PCC configuration files

  All the necessary AIP2 and PCC (Process Communication Controller) files are stored on the

HYDRA server:

Windows:

%HYDRADIR%\ctnet\win\aip2 (e.g.: d:\mip1\ctnet\win\aip2)

UNIX:

$HYDRADIR/ctnet/win/aip2 (e.g.: /u1/mip1/ctnet/win/aip2)

  Copy  the  following  file  from  the  above  mentioned  server  directory  to  the  designated  AIP2

configuration  directories  on  your  Citrix  server,  e.g.  to  %APPDATA%\MPDV\AIP2  (e.g.:

"C:\Users\aip101\AppData\Roaming\MPDV\AIP2")

(see  chapter  4.2  Location

for  AIP2

configuration files):

pcc.bsp

  Rename file pcc.bsp to pcc.ini

  Open file pcc.ini



In section [Server-Communication] enter a unique port number for each AIP2’s PCC instance,

e.g. 8005 instead of 9005, see chapter 4.4 Port Configuration:

[Server-Communication]

; Communication with HYDRA server via EVCOM

Active=1

Port=8005

InstallationGuide_MW40_AIP2_Citrix.docx Version: 1.0.23049

Page 16 of 27

Installing AIP 8.2 on Citrix

5.4  HYDRA Fonts

  Copy the installation file hydra-fonts.msi from the HYDRA server to a convenient directory on your

Citrix server:

Windows:

%HYDRADIR%\ctnet\win\install\fonts\hydra-fonts.msi

UNIX:

$HYDRADIR/ctnet/win/install/fonts/hydra-fonts.msi

  Run the installation file hydra-fonts.msi on your Citrix server:

Next

Install

Finish

5.5  Publish AIP2 Software

Using the proper Citrix tools publish the AIP2 software (e.g. C:\Program Files (x86)\MPDV\aip2\ctaip.exe)

for  each  specified  user  account  so  that  it  is  available  at  the  assigned  Citrix  client  PCs  (e.g.  Thin  Client

hardware).

InstallationGuide_MW40_AIP2_Citrix.docx Version: 1.0.23049

Page 17 of 27

Installing AIP 8.2 on Citrix

6  Post Installation Configuration

Login as Windows user (e.g.: Administrator) which must be member of the local group Administrators.

6.1  Terminal Configuration Set

Before you can use any AIP2 terminal software you have to create a terminal configuration set first by using

the HYDRA client software MOC (MES Operation Center).

The  terminal  IDs  of  the  configuration  sets  must  match  the  HYDRA  user  IDs  you  specified  in  the

corresponding ctaip.ini files (see chapter 5.2 AIP2 configuration files).

Regarding "Network port" see chapters 4.4 Port Configuration and 6.4 Gateway Communication.

InstallationGuide_MW40_AIP2_Citrix.docx Version: 1.0.23049

Page 18 of 27

Installing AIP 8.2 on Citrix

6.2  Automatic Clock Adjustment

This configuration is mandatory for every AIP2 instance running on a Citrix XenApp server.

Deactivate the automatic clock adjustment of the HYDRA terminal software:

Add he following settings to section [system] in the configuration file CTAIP.INI:

[system]

NoLocalWatchUpdate=on

NoLocalWatchWarning=ON

By default every AIP2 client is synchronizing the local clock of the terminal PC it is installed on with the

clock of the HYDRA server.

If  there  are  additional  methods  enabled  which  are  setting  the  clock  regularly  the  AIP2  client  will  show

warning messages which will prevent the use of the software as long as the message is shown.

When the automatic clock adjustment is deactivated the system administrator has to make sure that the

system time of the HYDRA terminal PC (here: the Citrix server) and the HYDRA server are synchronized

by other means.

InstallationGuide_MW40_AIP2_Citrix.docx Version: 1.0.23049

Page 19 of 27

Installing AIP 8.2 on Citrix

6.3  Automatic Restart of Terminal

This configuration is mandatory for every AIP2 instance running on a Citrix XenApp server.

Deactivate the automatic restart for the HYDRA terminal:

Add he following settings to section [system] in the configuration file CTAIP.INI:

[system]

BootTermin=Off

There is a build-in 32bit timer in Windows which increases every one msec.

Every 49,7 days that counter will create an overflow which could cause strange behavior of the AIP2 client

software like hang-ups.

Therefore  the  HYDRA  terminal  software  will  reboot  the  terminal  PC  automatically  on  the  first  coming

Sunday at 1:30am after a 30 day period.

ATTENTION:

The Citrix administrator has to make sure to reboot the Citrix (Windows) server hosting AIP2 clients

before that 49,7 days period elapses.

It is recommended to reboot the Citrix (Windows) server at least every 30–40 days!

InstallationGuide_MW40_AIP2_Citrix.docx Version: 1.0.23049

Page 20 of 27

Installing AIP 8.2 on Citrix

6.4  Gateway Communication AIP2

This configuration is mandatory for every AIP2 instance running on a Citrix XenApp server.

AIP2’s  gateway  communication  (EVCOM)  will  be  used  by  PDV  functionality  which  is  not  supported  on

terminal server installations.

Therefore you might want to deactivate the gateway communication option for all AIP2 instances.

Add he following settings to section [GateWay-Communication] in the configuration file CTAIP.INI (create

that section if it does not exist):

[GateWay-Communication]

Active=false

By default the gateway communication option for the HYDRA terminal is active and will use port 9002 as

default.

On a terminal server environment running more than one AIP2 client it is only possible for one of those

clients to acquire that port.

All others will show an error message during their start up when using the default configuration.

If the gateway communication (EVCOM) should be used for any reasons then it is mandatory to assign a

unique port to every AIP2 instance. Add the following settings to section [GateWay-Communication] in

the configuration file CTAIP.INI:

[GateWay-Communication]

Active=true

Make  sure  that  a  unique  port  is  defined  in  the  corresponding  terminal  configuration  set  of  every  AIP2

instance, e.g. 8002 instead of 9002 (see chapters 4.4 Port Configuration and 6.1 Terminal Configuration

Set):

InstallationGuide_MW40_AIP2_Citrix.docx Version: 1.0.23049

Page 21 of 27

Installing AIP 8.2 on Citrix

6.5  Gateway Communication PCC

This configuration is mandatory for every AIP2 instance running on a Citrix XenApp server.

The gateway communication (EVCOM) of AIP2’s Process Communication Controller (PCC) will be used

by PDV functionality which is not supported on terminal server installations.

Therefore you might want to deactivate the gateway communication option for all PCC instances.

Change the following settings in section [Server-Communication] in the PCC configuration file PCC.INI:

[Server-Communication]

; Communication with HYDRA server via EVCOM

Active=0

Port=9005

By default the gateway communication option for the PCC is active and will use port 9005 as default.

On a terminal server environment running more than one AIP2 client it is only possible for one of their

PCCs to acquire that port.

All others will show an error messages in their log files when using the default configuration.

If the gateway communication (EVCOM) should be used for any reasons then it is mandatory to assign a

unique  port  to  every  AIP2’s  PCC  instance.  Change  the  following  settings  in  section  [Server-

Communication] in the PCC configuration file PCC.INI:

[Server-Communication]

; Communication with HYDRA server via EVCOM

Active=1

Port=8005

See chapters 4.4 Port Configuration and 5.3 PCC configuration files.

InstallationGuide_MW40_AIP2_Citrix.docx Version: 1.0.23049

Page 22 of 27

Installing AIP 8.2 on Citrix

6.6  Barcode or ID-Code Readers

This configuration is mandatory for every AIP2 instance which is using barcode or ID-code readers

connected to a COM port.

Depending on which COM port the assigned reader hardware is connected add the appropriate settings to

section [comports] in the configuration file CTAIP.INI.

e.g.:

[comports]

com5=BAR

com6=LEGIC

By default AIP2 is scanning for up to 30 COM ports.

If there are more than 30 COM ports available at the Citrix server you have to add the COMCOUNT setting

to section [comports] in the configuration file CTAIP.INI.

The  value  for  COMCOUNT  depends  on  the  available  amount  of  COM  ports  at  the  server.

e.g.:

[comports]

COMCOUNT=60

com45=BAR

com46=LEGIC

InstallationGuide_MW40_AIP2_Citrix.docx Version: 1.0.23049

Page 23 of 27

Installing AIP 8.2 on Citrix

6.7  Operating without Touch Screen Monitor

AIP2 is especially designed to run on industrial PCs with a touch screen monitor and without a standard

keyboard and mouse connected.

Therefore AIP2 is hiding the Windows mouse cursor by default.

If the Citrix client PC (e.g. Thin Client hardware) does not provide a touch screen monitor you need to tell

AIP2 not to hide the Windows mouse cursor.

That will improve the usability on such an environment.

Add he following settings to section [system] in the configuration file CTAIP.INI:

[system]

showcursor=ON

InstallationGuide_MW40_AIP2_Citrix.docx Version: 1.0.23049

Page 24 of 27

Installing AIP 8.2 on Citrix

6.8  Restricting AIP2 Window Size

By default AIP2 is using the available screen resolution provided by the Windows operating system so its

window size will use up the whole screen.

If it should be necessary to restrict the AIP2 window size add he following settings to section [system] in

the configuration file CTAIP.INI:

e.g.:

[system]

VirtScreenSize=1280

InstallationGuide_MW40_AIP2_Citrix.docx Version: 1.0.23049

Page 25 of 27

Installing AIP 8.2 on Citrix

7  Ready to Go

The basic installation of the terminal software is finished now.

The terminal(s) can be started now.

InstallationGuide_MW40_AIP2_Citrix.docx Version: 1.0.23049

Page 26 of 27

Installing AIP 8.2 on Citrix

8  Updating AIP2 Software

Login as Windows user (e.g.: Administrator) which must be member of the local group Administrators.

Shutdown all running AIP2 instances!

All the necessary AIP2 files are stored on the HYDRA server:

Windows:

%HYDRADIR%\ctnet\win\aip2 (e.g.: d:\mip1\ctnet\win\aip2)

UNIX:

$HYDRADIR/ctnet/win/aip2 (e.g.: /u1/mip1/ctnet/win/aip2)

Copy the following files from the above mentioned server directory to the designated AIP2 application

directory on your Citrix server, e.g. to C:\Program Files (x86)\MPDV\aip2 (see chapter 4.1 AIP2

application directory):

*.exe

*.dll

*.mld

*.ocx

*.bpl

pict.zip

Replace all existing files.

Copy the following directory (including contents) from the above mentioned server directory to the

designated AIP2 application directory on your Citrix server, e.g. to C:\Program Files (x86)\MPDV\aip2

(see chapter 4.1 AIP2 application directory):

skins

(contains file mpdv.asz)

Replace all existing files.

When using the print function for labels (List & Label), the ZIP file “llprinter2.zip“ has to be extracted from

the HYDRA server directory

  Windows:

%HYDRADIR%\ctnet\win\shared (e.g.: d:\mip1\ctnet\win\shared)

  UNIX:

$HYDRADIR/ctnet/win/shared (e.g.: /u1/mip1/ctnet/win/shared)

to the AIP2 application directory where all existing files are replaced.

Start your AIP2 instances.

InstallationGuide_MW40_AIP2_Citrix.docx Version: 1.0.23049

Page 27 of 27

