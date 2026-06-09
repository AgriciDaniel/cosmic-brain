HYDRA Documentation

HYDRA MW4.0pe
Installing AIP 8.2 on a
Terminal PC

Version 1.0.23049

Last changed on: 02.09.2020

Installing AIP 8.2 on a Terminal PC

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of Oracle Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 2 of 42

Installing AIP 8.2 on a Terminal PC

Contents

1  Purpose ........................................................................................................ 4

2  Requirements ............................................................................................... 5

3  Pre Installation Configuration ....................................................................... 7

3.1  Windows 10......................................................................................................... 7

4  Auto Logon for Windows ............................................................................ 18

4.1  Windows 10....................................................................................................... 19

5

Installation of AIP 8.2 ................................................................................. 21

5.1  Windows 10....................................................................................................... 21

6  Post Installation Configuration ................................................................... 26

6.1  Terminal Configuration Set ................................................................................ 26

6.2  AIP 8.2 Configuration ........................................................................................ 27

6.3  Automatic Clock Adjustment .............................................................................. 30

6.3.1  Windows 10 ........................................................................................... 31

6.3.2  Deactivating Automatic Clock Adjustment ............................................. 32

6.4  Auto Start AIP 8.2 ............................................................................................. 33

6.5  Automatic Restart .............................................................................................. 34

6.6  Gateway Communication .................................................................................. 35

6.7  Barcode or ID-Code Readers ............................................................................ 36

6.8  Operating without Touch Screen Monitor .......................................................... 37

6.9  Restricting AIP2 Window Size ........................................................................... 38

7  Operating the Terminal without local administrator permission ................. 39

7.1

Information on PDV ........................................................................................... 39

8  Activation of Label Printing ......................................................................... 40

9  Machine pictures ........................................................................................ 41

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 3 of 42

Installing AIP 8.2 on a Terminal PC

1  Purpose

This manual describes the necessary tasks to install the HYDRA Terminal software AIP 8.2 (Acquisition &

Information Panel) on a standard PC hardware.

AIP 8.2 (AIP2) is especially designed to run on industrial PCs with a touch screen monitor and without a

standard keyboard connected.

If the standard PC hardware and it's configuration does not meet the specifications described in this manual,

certain functionalities of the HYDRA Terminal software might not work as advertised.

This manual covers the initial installation of the AIP 8.2 software on a standard PC hardware.

HYDRA MW4.0pe does not support older HYDRA terminal software than AIP 8.2.

If you have still older versions running in your environment, e.g. CTWIN or AIP 8.1, you need upgrade them

first.

The manual AIP2_Rollout_EN.pdf describes the procedures to change the software on a PC still using

CTWIN or AIP 8.1 (AIP) to AIP 8.2 (AIP2).

Please use the installation manual InstallationGuide_MW40_AIP2_Citrix.pdf if you plan to install the AIP

8.2 software on a Windows terminal server like Citrix XenAppServer.

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 4 of 42

Installing AIP 8.2 on a Terminal PC

2  Requirements

  For consistent datasets the HYDRA terminal software needs to run in 24/7 mode (24 hours per

day, 7 days per week).

  The PC hardware and software must meet the recent recommendations of MPDV Mikrolab

GmbH (see MPDV manual "HW_SW_GUIDE").

  Preinstalled Windows operating system approved by MPDV Mikrolab GmbH:

Windows 10 (32Bit or 64Bit).

(see MPDV manual “HW_SW_GUIDE”).

  Latest Windows service pack approved by MPDV Mikrolab GmbH installed.

  A minimum of 500 MB capacity available on the disk drive (usual: C:\).



Installed Internet Explorer version 6 or newer.



Installed and functioning Windows Scripting (WSH – Windows Script Host).

  TCP/IP network configuration for the local network.

Network adapter must be up and running.

  The local Windows Firewall should be turned off.



Installed .NET Framework 3.5 (includes .NET 2.0 and 3.0).



Installed Visual C++ 2010 x86 Redistributable Package.

Note: At least version 10.0.30319 of the Microsoft Visual C++ 2010 x86 Redistributable Package

must be installed.

  Local Windows user (e.g.: “hydadm”) with a secure password.

The password should be disclosed to MPDV.

The user must be a member of the local group Administrators.

Auto logon must be active for this user, see chapter "4 Auto Logon for Windows".

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 5 of 42

Installing AIP 8.2 on a Terminal PC

  Operating  the  Terminal  without  local  administrator  permissions  will  need  some  special

configurations, see chapter “7 Operating the Terminal without local administration permission”.

  The Windows user who is supposed to run the AIP 8.2 Terminal software later will always need

write permission for the chosen installation directories for INST32 and AIP 8.2.

Note:

After  a  successful  installation  as  described  in  this  manual  those  directories  are  stored  in  the

Windows Registry:

[HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\MPDV\CT\PATH]

This installation instruction assumes that

  up to and including MES Weaver 3.1: HYDRA Nameserver



from MES Weaver 4.0pe onwards: MIP Nameserver

is  listening  on  network  port  10000.  You  are  tasked  to  check  the  actual  port  of  your  HYDRA

installation.  If  the  port  of  your  HYDRA  installation  differs,  you  have  to  set  a  permanent

environment variable in the AIP host’s operating system:

HYPORT = ACTUAL_PORT_NUMBER

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 6 of 42

Installing AIP 8.2 on a Terminal PC

3  Pre Installation Configuration

3.1  Windows 10

  Create a local Windows user (e.g.: “hydadm”) with a secure password.

The password should be disclosed to MPDV.

The user must be a member of the local group Administrators.

Auto logon must be activated for this user, see chapter "4 Auto Logon for Windows".

  Activate the following Windows Features:

Start-Button – Windows System – Control Panel – Programs – Programs and Features –

Turn Windows features on or off

".NET Framework 3.5 (includes .NET 2.0 and 3.0)"

"Microsoft Message Queue (MSMQ) Server Core"

OK

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 7 of 42

Installing AIP 8.2 on a Terminal PC



Install the Microsoft Visual C++ 2010 x86 Redistributable Package.

e.g. download from:

https://www.microsoft.com/en-us/download/details.aspx?id=5555

The installation package can also be found on the HYDRA server, e.g. in:

d:\mip1\inbetr\windows\msvc100\vcredist_x86.exe

Note: At least version 10.0.30319 of the Microsoft Visual C++ 2010 x86 Redistributable Package must

be installed.

  Start-Button – Windows System – Control Panel – Clock and Region – Region –

Administrative – Change system locale…

If there is the (Beta) checkbox “Use Unicode UTF-8 for worldwide language support” available make

sure it is not activated:

  Start-Button – Settings – Themes – Desktop icon settings:

Activate all Desktop icons:

OK

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 8 of 42

Installing AIP 8.2 on a Terminal PC

  User Account Control Settings (UAC) must be deactivated:

Start-Button – Windows System – Control Panel – User Accounts – User Accounts – Change

User Account Control settings

Never notify



In “Local Security Policy” the following policy must be disabled:
Start-Button  – Windows System  – Windows  Administrative Tools  – Local Security  Policy  –

Local  Policies  –  Security  Options  –  User  Account  Control:  Run  all  administrators  in  Admin

Approval Mode

Disabled

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 9 of 42

Installing AIP 8.2 on a Terminal PC

  Check and adjust settings for all available COM ports and printer ports.

Start-Button – Windows System – Windows Administrative Tools – Computer Management –

Device Manager

e.g.:

Communication Port (COM):

COM1

I/O-Address: 03F8

COM2

I/O-Address: 02F8

COM3

I/O-Address: 03E8

COM4

I/O-Address: 02E8

IRQ: 4

IRQ: 3

IRQ: 10

IRQ: 11

The FIFO buffers for all COM ports should be set to low:

Should there be problems with serial connections the buffers might be set to higher levels again.

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 10 of 42

  Right click on Windows Taskbar and select "Taskbar settings":

Installing AIP 8.2 on a Terminal PC

Activate settings for "Automatically hide the taskbar in desktop mode" and "Automatically hide

the taskbar in tablet mode":

  Make sure there is no screen saver active.

Start-Button – Settings – Personalization – Lock Screen – Screen saver settings

Screen saver: (None)

OK

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 11 of 42

Installing AIP 8.2 on a Terminal PC

  The local Windows Firewall should be turned off:

Start-Button – Windows System – Control Panel – System and Security – Windows Defender

Firewall – Turn Windows Defender Firewall on or off

If the local firewall stays active you might need to manually allow communication access for several

programs like pcc.exe and ctaip.exe when starting the AIP terminal software for the first time.

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 12 of 42

Installing AIP 8.2 on a Terminal PC

  Change date and time settings:

Start-Button – Settings – Time & Language

Deactivate all automatic time settings, like “Set time automatically”, “Set time zone automatically”

and "Adjust for daylight saving time automatically":

In  “Add  clocks  for  different  time  zones”  make  sure  that  synchronization  with  a  time  server  is

deactivated:

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 13 of 42

  Activate power plan “High performance”:

Start-Button – Windows System – Control Panel – System an Security – Power Options

Installing AIP 8.2 on a Terminal PC

In "Change plan settings":

Set Never for "Turn off the display" and "Put the computer to sleep":

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 14 of 42

  For support purposes it is recommended to activate the network sharing for the disk drive where the

HYDRA Terminal software is installed (usual: C:\).

Installing AIP 8.2 on a Terminal PC

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 15 of 42



In

the  Windows

registry

the  value

for

"ForegroundLockTimeout"  within

the  key

"HKEY_CURRENT_USER\Control Panel\Desktop" must be set to "0":

Installing AIP 8.2 on a Terminal PC

This value specifies the time (in milliseconds) during which the system keeps applications from moving

to the foreground.

With that setting all terminal dialogues waiting for user input are moved to the foreground immediately.

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 16 of 42

  The size of text, apps and other items must be set to the recommended default value 100%:

Start-Button – Settings – System – Display

Installing AIP 8.2 on a Terminal PC

In “Advanced scaling settings” make sure that no custom scaling is active:

When using other scaling sizes than 100% you will encounter overlapping text in the terminal dialogues.

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 17 of 42

Installing AIP 8.2 on a Terminal PC

4  Auto Logon for Windows

For certain functionality of the HYDRA terminal software, e.g. like the automatic restart (see chapter “6.5

Automatic Restart”) or remotely controlled restarts from a MOC client, it is necessary to have the auto logon

functionality for Windows enabled.

Alternatively to the methods described below the tool "Autologon for Windows v3.10" from Microsoft can

be used to activate the auto logon mechanism of Windows:

http://technet.microsoft.com/en-us/sysinternals/bb963905

At least version v3.01 must be used.

The tool runs on:

Client: Windows XP and higher

Server: Windows Server 2003 and higher

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 18 of 42

Installing AIP 8.2 on a Terminal PC

4.1  Windows 10

  Start-Button – Windows System

Run Windows Command Prompt as Administrator:

  Execute “control userpasswords2”

Deactivate checkbox "Users must enter a user name and password to use the computer"

OK

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 19 of 42

  Set "User name" and "Password" for automatic sign in (e.g. user hydadm and his secure password).

Installing AIP 8.2 on a Terminal PC

OK

  Restart your computer now.

Check that Windows is starting without asking for a user name and password.

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 20 of 42

Installing AIP 8.2 on a Terminal PC

5

Installation of AIP 8.2

5.1  Windows 10



If Auto Logon for Windows might not be enabled yet (see chapter “4 Auto Logon for Windows”), login

as local Windows user (e.g.: hydadm) which must be a member of the local group Administrators.

  Copy the directory “inst_terminal_mw4” with all its contents from the HYDRA server to a temporary

directory on your Terminal PC.

“inst_terminal_mw4” can be found on the HYDRA server in the directory %HYDRADIR%\admtools

(e.g. d:\mip1\admtools\inst_terminal_mw4).



In the local copy of directory "inst_terminal_mw4" start the file setup.exe using the option "Run as

administrator" and then proceed with the installation as described below:

Yes

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 21 of 42

Select components for the Inst32 Installer (select all as default):

Installing AIP 8.2 on a Terminal PC

Deselect components only if you are absolutely aware of the consequences.

Next

Choose destination folder for the Inst32 installer (Default: C:\MPDV\Inst32):

Install

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 22 of 42

Select components for the AIP2 Installer (select all as default):

Installing AIP 8.2 on a Terminal PC

Deselect components only if you are absolutely aware of the consequences.

Next

Choose destination folder for the AIP2 installer (Default: C:\MPDV\AIP2):

Install

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 23 of 42

Close the AIP2 Installer

Installing AIP 8.2 on a Terminal PC

Close

Close the Inst32 Installer

Close

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 24 of 42

  Now you should find the following shortcuts on the Windows Desktop:

Installing AIP 8.2 on a Terminal PC

  When you start and close Inst32adm.exe or Inst32usr.exe for the first time you might see a message

like this:

Select "This program installed correctly"

  Before the application AIP 8.2 can be started you need to proceed with chapter “6 Post Installation

Configuration” first.

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 25 of 42

Installing AIP 8.2 on a Terminal PC

6  Post Installation Configuration

6.1  Terminal Configuration Set

Before you can start your terminal client you have to create a terminal configuration set first by using the

HYDRA MOC client.

System administration  Terminals  Terminal configuration

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 26 of 42

Installing AIP 8.2 on a Terminal PC

6.2  AIP 8.2 Configuration

  Open the file ctaip.ini by double clicking on the Icon on the Windows Desktop:



In section [system] enter the IP-address or the hostname of your HYDRA server and then save the

file:

  Start Inst32adm.exe by double clicking on the Icon on the Windows Desktop:

Yes

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 27 of 42

  Choose the menu [ B ] Load Application

Installing AIP 8.2 on a Terminal PC

  After successfully downloading all the program files close the program Inst32adm.exe:

Do not start the AIP2 terminal software yet!

  Delete the file ctaip.ini in the installation directory of the terminal (e.g.: C:\MPDV\aip2).



Inside  the  installation  directory  of  the  terminal  (e.g.:  C:\MPDV\aip2)  rename  the  file  ctaip.bsp  to

ctaip.ini.

  Open the (new) file ctaip.ini by double clicking on the Icon on the Windows Desktop and enter correct

values in section [system], e.g.:

usr=10

(Terminal ID, see chapter “6.1 Terminal Configuration Set”)

hostname=192.168.20.167

(IP-address or host name of the HYDRA Server)

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 28 of 42

Installing AIP 8.2 on a Terminal PC

  Start Inst32adm.exe by double clicking on the Icon on the Desktop and choose the menu [ C ]

Configuration:

For use on a standard PC the option "Mouse Cursor active" must be activated:

Data saving

Exit

  The basic installation of the terminal software is finished now.

The terminal can be started by using menu [ F ] Program – Start

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 29 of 42

Installing AIP 8.2 on a Terminal PC

6.3  Automatic Clock Adjustment

The HYDRA terminal software AIP 8.2 is synchronizing the local clock of the terminal PC with the time of

the HYDRA server.

The Windows user running the terminal software must be able to set the local system time.

Should  the  local  Windows  user  account  who  is  running  the  AIP  8.2  software  do  not  have  the  required

permissions  you  have  to  make  sure  that  the  system  time  of  the  HYDRA  terminal  PCs  and  the  HYDRA

server are synchronized by other means.

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 30 of 42

Installing AIP 8.2 on a Terminal PC

6.3.1  Windows 10

The permission to set the system time can be assigned to Windows users:
Start-Button – Windows System – Windows Administrative Tools – Local Security Policy – Local

Policies – User Rights Assignment – Change the system time

Use "Add User or Group…" to add the user account

OK

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 31 of 42

Installing AIP 8.2 on a Terminal PC

6.3.2  Deactivating Automatic Clock Adjustment

Should  the  local  Windows  user  account  who  is  running  the  AIP  8.2  software  do  not  have  the  required

permissions to set the system time for any reasons or should the local clock be synchronized and set by

other means, the automatic clock adjustment of the HYDRA terminal software must be deactivated.

Therefor you have to add he following settings to section [system] in the configuration file CTAIP.INI:

[system]

NoLocalWatchUpdate=on

NoLocalWatchWarning=ON

When  this  configuration  is  used  the  system  administrator  has  to  make  sure  that  the  system  time  of  the

HYDRA terminal PCs and the HYDRA server are synchronized by other means.

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 32 of 42

Installing AIP 8.2 on a Terminal PC

6.4  Auto Start AIP 8.2

To  ensure  an  automatic  startup  of  the  AIP  terminal  software  the  installer  added  inst32usr.exe  to  the

Windows Task Manager:

Start-Button – Task Manager

Whenever a user is logging into Windows, inst32usr.exe will start automatically:

Subsequently AIP 8.2 will then be started by inst32usr.exe.

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 33 of 42

Installing AIP 8.2 on a Terminal PC

6.5  Automatic Restart

There is a build-in 32bit timer in Windows which increases every one msec.

Every 49,7 days that counter will create an overflow which could cause strange behavior of the AIP  8.2

terminal software like hang-ups.

Therefore  the  HYDRA  terminal  software  will  reboot  the  terminal  PC  automatically  on  the  first  coming

Sunday at 1:30am after a 30 day period.

If it might be necessary to deactivate the automatic restart of the HYDRA terminal add he following settings

to section [system] in the configuration file CTAIP.INI:

[system]

BootTermin=Off

When  this  configuration  is  used  the  system  administrator  has  to  make  sure  that  the  terminal  PC  gets

restarted on a regular basis before that 49,7 days elapses.

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 34 of 42

Installing AIP 8.2 on a Terminal PC

6.6  Gateway Communication

By default the gateway communication option for the HYDRA terminal is active and requires access to port

9002.

If the gateway communication should use a different port (e.g. 9003) it is necessary to assign a unique port

to the terminal by adding the following settings to section [GateWay-Communication] in the configuration

file CTAIP.INI:

[GateWay-Communication]

Active=true

Port=9003

Make sure that the specified port is defined in the corresponding terminal configuration set of  your AIP2

terminal (see chapter 6.1 Terminal Configuration Set):

To  deactivate  the  gateway  communication  option  for  the  HYDRA  terminal  add  he  following  settings  to

section [GateWay-Communication] in the configuration file CTAIP.INI (create that section if it does not

exist):

[GateWay-Communication]

Active=false

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 35 of 42

Installing AIP 8.2 on a Terminal PC

6.7  Barcode or ID-Code Readers

Depending on which COM port the assigned reader hardware is connected add the appropriate settings to

section [comports] in the configuration file CTAIP.INI.

e.g.:

[comports]

com5=BAR

com6=LEGIC

By default AIP2 is scanning for up to 30 COM ports.

If there might be more than 30 COM ports available on your terminal PC you have to add the COMCOUNT

setting to section [comports] in the configuration file CTAIP.INI.

The value for COMCOUNT depends on the available amount of COM ports at the terminal PC.

e.g.:

[comports]

COMCOUNT=60

com45=BAR

com46=LEGIC

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 36 of 42

Installing AIP 8.2 on a Terminal PC

6.8  Operating without Touch Screen Monitor

AIP2 is especially designed to run on industrial PCs with a touch screen monitor and without a standard

keyboard and mouse connected.

Therefore AIP2 is hiding the Windows mouse cursor by default.

If the terminal PC does not provide a touch screen monitor you need to tell AIP2 not to hide the Windows

mouse cursor.

That will improve the usability on such an environment.

Add he following settings to section [system] in the configuration file CTAIP.INI:

[system]

showcursor=ON

For use on a standard PC that option must be activated.

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 37 of 42

Installing AIP 8.2 on a Terminal PC

6.9  Restricting AIP2 Window Size

By default AIP2 is using the available screen resolution provided by the Windows operating system so its

window size will use up the whole screen.

If it should be necessary to restrict the AIP2 window size add he following settings to section [system] in

the configuration file CTAIP.INI:

e.g.:

[system]

VirtScreenSize=1280

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 38 of 42

Installing AIP 8.2 on a Terminal PC

7  Operating the Terminal without local administrator

permission

Basically it is possible to run the AIP Terminals without local administrator permissions.

Depending on the used HYDRA modules and drivers, special actions might be necessary.

Additionally the measures about automatic clock adjustment described in chapter 6.3 must be followed.

Grant  permission  “Modify”  to  the Windows  group  "Users"  for  the  AIP  and  Inst32  installation  directories

(e.g.: "C:\MPDV\AIP2" and "C:\MPDV\Inst32") and for all their contents:

7.1

Information on PDV

Operating the PDV is possible without local administrator permission, just the component for the Online-

Visualization has to be registered with local administrator permission.

Please open a command prompt (as local administrator) and run the following command:

32 bit Windows

regsvr32 c:\MPDV\AIP2\mpdvvisualisationclient.ocx

64 bit Windows

%systemroot%\SysWoW64\regsvr32 c:\MPDV\AIP2\mpdvvisualisationclient.ocx

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 39 of 42

Installing AIP 8.2 on a Terminal PC

8  Activation of Label Printing

A valid license for label printing needs to be installed on the HYDRA server.

Please  note:  The  inst32  program  loads  the  program  package  llprinter2.zip  from  the  following  HYDRA

server directory: .\ctnet\win\shared\llprinter2.zip (e.g.: d:\mip1\ctnet\win\shared\llprinter2.zip).

The AIP 8.2 client unpacks the file llprinter2.zip during the next startup.

MOC - Path

For label maintenance, the HYDRA path MOCREP is required.

It is mandatory that the path always refers to <MDT>/custom/reports (e.g.: d:\mip1\1\custom\reports).

It is not allowed to change this.

Example configuration:

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 40 of 42

Installing AIP 8.2 on a Terminal PC

9  Machine pictures

To display machine or workplace pictures in the AIP 8.2 terminal software the HYDRA path configuration

for a path named “HYDRA” is required, e.g.:

Make sure you have entered the correct host name or the IP address of your HYDRA server.

According to this example all the picture files for your machines or workplaces (e.g. maschine.jpg) need to

be stored inside the directory “./1/grafik/bde” on your HYDRA server, e.g.: d:\mip1\1\grafik\bde.

In the workplace configuration you need to enter the appropriate file name of the intended picture file, e.g.

maschine.jpg:

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 41 of 42

Your machine or workplace picture will then be displayed in the AIP terminal software, e.g.:

Installing AIP 8.2 on a Terminal PC

InstallationGuide_MW40_AIP2.docx

Version: 1.0.23049

Page 42 of 42

