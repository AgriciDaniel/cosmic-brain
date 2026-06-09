HYDRA Documentation

Install MES Operation Center
for HYDRA MW4.0pe

Version 1.0.23049

Last changed on: 02.09.2020

Install MES Operation Center for HYDRA MW4.0pe

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of Oracle Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 2 of 44

Install MES Operation Center for HYDRA MW4.0pe

Contents

1  Purpose ........................................................................................................ 4

2  Requirements ............................................................................................... 5

3

Installation MES Operation Center............................................................... 6

3.1  Overview ............................................................................................................. 6

3.2  Notes................................................................................................................... 6

3.3  Download Installation Program MOC Updater ..................................................... 8

3.4

Installation ......................................................................................................... 10

3.4.1

Installation via the Maintenance Manager .............................................. 12

3.4.2

Installation from a Zip Archive ............................................................... 19

3.5  Silent install ....................................................................................................... 26

3.6  Deploy by Copy ................................................................................................. 29

4  Configuration after Installation ................................................................... 30

4.1  Update without administration rights .................................................................. 30

4.2  Subsequent configuration change ..................................................................... 35

4.3  Configuration tips when using different software releases for one client ............ 37

4.3.1  Storage location for the log file .............................................................. 37

4.3.2  Download path for updates .................................................................... 37

4.3.3  Preparing the user directory .................................................................. 38

4.4  Citrix XenApp or MS terminal server ................................................................. 39

4.5  HTTPS encryption ............................................................................................. 40

5  Uninstallation of the MES Operation Center .............................................. 41

5.1  Uninstallation by requesting uninstallation routine ............................................. 41

5.2  Uninstallation (manually) ................................................................................... 43

5.2.1  Remove MOC program files .................................................................. 43

5.2.2  Remove desktop links ........................................................................... 43

5.2.3  Uninstallation of the visualization component ........................................ 43

5.2.4  Remove files of the installation/update program .................................... 44

5.2.5  Remove user settings ............................................................................ 44

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 3 of 44

Install MES Operation Center for HYDRA MW4.0pe

1  Purpose

This installation manual describes all necessary steps to install the HYDRA MW4.0pe Client Software "MES

Operation Center" (MOC) on a workstation PC with a Windows operating system.

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 4 of 44

Install MES Operation Center for HYDRA MW4.0pe

2  Requirements

  Client PC according to MPDV's recommendation.

  Windows operating system according to MPDV's recommendation.

  1 GB available space

(for installation of the demo data additional 500 MB per installed language).

  Windows desktop with a screen resolution of at least 1920 x 1080

  Windows user with administration rights (e.g. Administrator).



Installed Microsoft .NET Framework 4.5.2

e.g. download from:

http://www.microsoft.com/en-us/download/details.aspx?id=42642

Please adhere to the installation instructions.



Installed Microsoft Visual C++ 2005 Runtime

e.g. download from:

http://www.microsoft.com/downloads/de-de/details.aspx?FamilyID=32bc1bee-a3f9-4c13-9c99-

220b62a191ee

Please adhere to the installation instructions.



Installed HYDRA server with running HYDRA 8 (MW4.0pe) server software.

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 5 of 44

Install MES Operation Center for HYDRA MW4.0pe

3

Installation MES Operation Center

3.1  Overview

The installation of a MES Operation Center is carried out as follows:

  Download the archive MOC_Updater.zip from your HYDRA server using the HYDRA

Maintenance Manager.

Note: Once downloaded you could distribute the archive to other client PC e.g. by using an USB

stick.

  Unpack the archive and run the file MOCUpdater.exe in order to start the program MOC

Updater.

  Start the installation process. Administration rights are required.

3.2  Notes

The program MOC Updater (referred to as installation program) can run in the "installation mode" or in the

"update mode". In this case, the initial installation is always carried out in the installation mode.

If installed successfully, the program is normally carried out in the update modus from the MOC directory.

Therefore,  you  can  then  remove  the  archive  MOC_Updater.zip  and  the  unpacked  files  from  the  current

Windows system.

You  can  configure  the  installation  program  via  the  file  UpdateConfiguration.txt  to  pre-assign  input  fields

during  the  installation  process  (e.g.  field  containing  the  server  address  of  the  Maintenance  Manager).

The  Maintenance  Manager  automatically  looks  after  this  file  and  the  file  is  located  in  the  archive

MOC_Updater.zip.

You can edit the entries in the Maintenance Manager if required (see HYDRA documentation Maintenance

Manager).

If the installation program is started with command line argument, then the command line argument is the

preferred option.

The installation program knows if a new version is available.

If a new version is detected, then the installation program updates itself and then re-starts to continue the

installation or update process.

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 6 of 44

Install MES Operation Center for HYDRA MW4.0pe

Please  do  not  start  all  updates/setups  simultaneously  to  avoid  an  overload  of  the  server  where  the

Maintenance Manager is installed.

You can also start the MOCUpdater.exe without the user interface by using the prompt.

You need to issue the prompt with your administration rights.

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 7 of 44

Install MES Operation Center for HYDRA MW4.0pe

3.3  Download Installation Program MOC Updater

Open a web browser on your client PC, e.g. the Internet Explorer.

Enter the URL for the Maintenance Manager on your HYDRA Server.

e.g.: http://servername:18080

Click  on  the  button  „MOC_Updater.zip“  and  save  the  ZIP  file  to  a  directory  on  your  client  PC.

Unpack the contents of the file „MOC_Updater.zip“:

If you plan an installation „from a Zip Archive“, see chapter „3.4.2 Installation from a Zip Archive“, you need

to download the file „MOC.zip“ as well and save it to a directory on your client PC.

You do not need to unpack the contents of that ZIP file!

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 8 of 44

Install MES Operation Center for HYDRA MW4.0pe

Should it not be possible to click on the two buttons „MOC_Updater.zip“ and „MOC.zip“ because they are

inactive then the HYDRA Maintenance Manager is still busy with creating an up-to-date version of those

ZIP files.

Depending on your server environment that might take a few minutes.

In such cases just try it again a little bit later:

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 9 of 44

Install MES Operation Center for HYDRA MW4.0pe

3.4

Installation

Logon to your client PC with a user who has administration privileges.

Start the installation of the MES Operation Center by executing the file MOCUpdater.exe.

If  the  date  format  of  your  client  PC  is  set  to  German,  then  the  Updater  will  start  in  German  language.

Otherwise it will start in English.

Next

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 10 of 44

Install MES Operation Center for HYDRA MW4.0pe

Please read the license agreement.

Click on Next, if you agree to the conditions of the license agreement.

Next

There are two different options available regarding the installation source.

Option one is directly from the Maintenance Manager.

Option two is from a local Zip archive.

Please note

If the network broadband is weak, we recommend to install from the local Zip archive.

In this case a connection to the Maintenance Manager is not necessary.

Please note, that in this case, the installation program might update itself.

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 11 of 44

Install MES Operation Center for HYDRA MW4.0pe

3.4.1

Installation via the Maintenance Manager

In  order  to  start  the  installation  via  the  Maintenance  Manager,  please  select  the  option  "Maintenance

Manager" and click on "Next".

Next

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 12 of 44

Install MES Operation Center for HYDRA MW4.0pe

The  Installer  will  offer  the  host  address  for  the  Maintenance  Manager  on  your  HYDRA  server,  e.g.:

http://servername:18080.

Check that it is the correct address before proceeding with the installation.

Next

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 13 of 44

Select the installation directory for the MOC Client.

Install MES Operation Center for HYDRA MW4.0pe

Next

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 14 of 44

Install MES Operation Center for HYDRA MW4.0pe

During the installation links to MOC.exe are automatically created in the Windows start menu and on the

Windows desktop.

When installing on a 64-Bit operating system links for both MOC versions (32-Bit and 64-Bit) will be created

for all users on that computer by default.

If necessary, you can change the default settings now.

Next

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 15 of 44

Before proceeding with the installation check if the settings are correct.

Install MES Operation Center for HYDRA MW4.0pe

Install

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 16 of 44

Wait until the installation finished successfully.

Install MES Operation Center for HYDRA MW4.0pe

Next

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 17 of 44

Install MES Operation Center for HYDRA MW4.0pe

Click "Finish" to complete the installation.

Unless  you  have  unchecked  the  box  “Start  MOC”  the  MOC  client  will  start  automatically  afterwards.

Finish

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 18 of 44

Install MES Operation Center for HYDRA MW4.0pe

3.4.2

Installation from a Zip Archive

In order to start the installation from a local Zip archive, please select the option "Zip" and click on "Next".

Next

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 19 of 44

Please enter the path to the locally stored Zip archive.

Install MES Operation Center for HYDRA MW4.0pe

Next

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 20 of 44

Select the installation directory for the MOC Client.

Install MES Operation Center for HYDRA MW4.0pe

Next

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 21 of 44

Install MES Operation Center for HYDRA MW4.0pe

During the installation links to MOC.exe are automatically created in the Windows start menu and on the

Windows desktop.

When installing on a 64-Bit operating system links for both MOC versions (32-Bit and 64-Bit) will be created

for all users on that computer by default.

If necessary, you can change the default settings now.

Next

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 22 of 44

Before proceeding with the installation check if the settings are correct.

Install MES Operation Center for HYDRA MW4.0pe

Install

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 23 of 44

Wait until the installation finished successfully.

Install MES Operation Center for HYDRA MW4.0pe

Next

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 24 of 44

Install MES Operation Center for HYDRA MW4.0pe

Click "Finish" to complete the installation.

Unless  you  have  unchecked  the  box  “Start  MOC”  the  MOC  client  will  start  automatically  afterwards.

Finish

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 25 of 44

Install MES Operation Center for HYDRA MW4.0pe

3.5  Silent install

You can also install without a user interface.

Please log on as a Windows user with permission to write (see 3.2) and open a command line.

Please note that the command line to request the MOC Updater is carried out with

administration rights or make sure that the required rights are available.

Request the program MOCUpdater.exe as follows:

MOCUpdater.exe --MMhost "Maintenance Manager Adresse" --rootDirectory "C:\Program

Files (x86)\MPDV\HYDRA 8\MOC" –silent

Please adjust the red parameter to the system where the MOC is going to be installed.

If you carry out the Silent Install from a Zip archive, then use the  --installFromZip

"C:\Path\to\MOC.zip" argument. You must not specify a Maintenance Manager.

If no additional arguments are requested, then you use the default values from the

UpdateConfiguration.txt for the installation.

If the installation is successful, please exit the program.

If the installation has not been successful, a GUI is displayed with an error message.

You can at any time display the user interface during the installation process with a clicks on the symbol

(tray icon) of the installation program.

If you want to start the MOC automatically after the installation, then add the following argument:

--startApplicationAfterUpdate

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 26 of 44

The MOC Updater supports the following parameters:

Install MES Operation Center for HYDRA MW4.0pe

Option

--MMhost

Description

Address  for  the  Maintenance  Manager  used  for  the

installation process.

e.g.: “http://MaintenanceManager:18080“

--installFromZip

Starts the installation with the Zip archive.

e.g.: “Path\to\MOC.zip“

--startApplicationAfterUpdate

Restart of the MOC after successfully updating using the

MOC  Updater.  For  compatibility  reasons  the  32-Bit

version will be started by default.

Optionally you can choose which MOC version (32-Bit or

64-Bit) should be started by adding x86 or x64.

e.g.: --startApplicationAfterUpdate x64

--rootDirectory

Target  path  for  the  MOC  directory  where  the  update

process is carried out.

e.g.: “c:\Program Files (x86)\MPDV\MOC\”

--UACmode

Off:

No  upgraded  rights  are  requested.  The  logged  user

requires write permissions for the target directory.

On:

Upgraded rights are always requested.

If no --UACmode is specified, the MOC Updater enquires

if  extended  rights  are  needed.  If  the  target  directory  is

located  in  the  program  directory,  then  extended  rights

are assumed.

--silent

--silent ensures that the user interface is not displayed

during the installation process.

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 27 of 44

Install MES Operation Center for HYDRA MW4.0pe

--shortcutsOnlyCU

Specifies  that  the  links  on  the  desktop  and  in  the

Windows start menu for MOC.exe is only created for the

currently logged user.

Links are by default created for all users.

--shortcutsOnlyMocVersion

Specifies  which  MOC  version  (32-Bit  or  64-Bit)  will  be

linked in the Windows startup menu and on the Windows

desktop.

When  installing  on  a  64-Bit  operating  system  both

versions will be linked by default.

Optionally you can choose which MOC version (32-Bit or

64-Bit) should be linked by adding x86 or x64.

e.g.: --shortcutsOnlyMocVersion x86

--uninstall

Uninstalls MOC application including registration entries

and

links.  You  also  have

to  specify

the  --

rootDirectory argument with the MOC directory.

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 28 of 44

Install MES Operation Center for HYDRA MW4.0pe

3.6  Deploy by Copy

The MES Operation Center can also be installed by copying the installation directory of an already

existing installation - either as initial installation on a new Window client or as a copy into a different

directory.

The last option is the preferred one if the MOC should connect to systems with different software releases

(e.g. productive, development and test system).

The copy transfers all settings and therefore, an adjustment of the configuration file is not required.

Please bear in mind when connecting to different systems the section.

Please note:

  When using the PDV Online Visualizing (e.g. the application "PDV Visualizing") you must perhaps

manually register a visualizing component.

You can do this by issuing the command (Do check the path for the ocx file beforehand!):

regsvr32 "C:\Program Files (x86)\MPDV\MOC\MpdvVisualisationClient.ocx"

If for some reason you need to unregister the file, then this can be done with the following command:

regsvr32 /u "C:\Program Files (x86)\MPDV\MOC\MpdvVisualisationClient.ocx"

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 29 of 44

Install MES Operation Center for HYDRA MW4.0pe

4  Configuration after Installation

4.1  Update without administration rights

Before a Windows user without administration rights can update its MOC client software you have to make

sure that the following settings are done.

Assign permission “Modify” to the Windows group “Users“ for the installation directory of the MOC (e.g.:

"C:\Program Files\MPDV\HYDRA 8\MOC" or "C:\Program Files (x86)\MPDV\HYDRA 8\MOC" for 64Bit

systems) including all its contents:

OK

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 30 of 44

Install MES Operation Center for HYDRA MW4.0pe

The following procedure is only necessary with older HYDRA installations prior to SP11:

Assign  permission  “Modify”  to  the  Windows  group  “Users“  for  the  update  directory  of  the  MOC  (e.g.:

"C:\ProgramData\mpdv\moc") including all its content:

OK

When using the new HYDRA Maintenance Manager 2.0 (since SP11) MOC update files are stored in the

%TEMP% directory of Windows, e.g.:

c:\Users\username\AppData\Local\Temp\MOCUpdater_Download_Dir_*

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 31 of 44

Install MES Operation Center for HYDRA MW4.0pe

Login to Windows with the dedicated Windows user and then start the MOC client.

Disable „UAC mode“ in the configuration settings of the MOC:

OK

Restart the MOC Client.

Note:

All configuration changes made in the "Configuration" menu are saved individually for the Windows user

who starts the MOC client (see "UserDataDirectory" in the configuration file).

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 32 of 44

Install MES Operation Center for HYDRA MW4.0pe

If  you  want  to  deactivate  the  “UAC  mode”  for  all  MOC  users  system  wide  you  can  create  a  “local”

configuration

file  named  “System.config”

in

the

following  directory  on  your  HYDRA  server:

HYDRADIR\jdir\MaintenanceManager\rt\client\MOC\local\conf\MOC\

e.g.:

d:\mip1\jdir\MaintenanceManager\rt\client\MOC\local\conf\MOC\

Some of the subdirectories like conf\MOC might not exist already.

Please create the missing directories if necessary.

The file “System.config” must contain the following lines:

<?xml version="1.0" encoding="utf-8"?>
<Settings Version="0.0.0.0">
  <Setting Key="UacModeForUpdate" Description="" LastChanged="2018-10-
26T09:53:33.4874813Z" ValueType="mpdv.MOC.UacUpdateMode" Version="0.0.0.0">
      <Value>
        <UacUpdateMode>DISABLE_UAC</UacUpdateMode>
      </Value>
  </Setting>
</Settings>

If there is already a file “System.config” available in that directory you need to insert the following lines into

the existing file:

  <Setting Key="UacModeForUpdate" Description="" LastChanged="2018-10-
26T09:53:33.4874813Z" ValueType="mpdv.MOC.UacUpdateMode" Version="0.0.0.0">
      <Value>
        <UacUpdateMode>DISABLE_UAC</UacUpdateMode>
      </Value>
  </Setting>

When finished you need to perform a “Rescan MOC runtime” in the Maintenance Manger on your HYDRA

server.

Afterwards all new MOC installations will have those new “local” settings included.

Already installed MOC clients need to be updated first.

For more detailed information about the MOC configuration levels (“user”, “local”, “custom” and “standard”)

please see chapter “MOC Configuration Settings” of the MOC manuals.

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 33 of 44

Install MES Operation Center for HYDRA MW4.0pe

Note:

For those new “local” settings to work properly you have to make sure that there are no individual “user”

settings  containing  the  configuration  key  "UacModeForUpdate"  in  the  “UserDataDirectory”  (e.g.:

c:\Users\user\AppData\Roaming\MPDV\MOC\user\) of your already installed MOC clients, e.g. in:

c:\Users\user\AppData\Roaming\MPDV\MOC\user\conf\Moc\System.config

“user”  settings  inside  the  “UserDataDirectory”  do  have  a  higher  priority  than  “local”  settings  from  the

application directory and therefore they will override the “local” settings.

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 34 of 44

Install MES Operation Center for HYDRA MW4.0pe

4.2  Subsequent configuration change

The  global  configuration  settings  of

the  MES  Operation  Center  are  contained

in

the

file

MOC.ApplicationSettings.config of the installation directory of the MOC, e.g.:

C:\Program Files\MPDV\HYDRA 8\MOC\MOC.ApplicationSettings.config

or

C:\Program Files (x86)\MPDV\HYDRA 8\MOC\MOC.ApplicationSettings.config

Note: For older MOC installations (Version < 2.60) the file settings must be done in the file MOC.exe.config

in the same directory.

Here you can subsequently carry out changes or corrections for the configuration, e.g. for:

MasterServer: Name or IP address of the master server providing a list of all available HYDRA systems

or instances for the MOC to connect.

The master server is normally installed on the HYDRA server.

<add key="MasterServer" value="HYDRA01"></add>

MasterServerPort: Network port to reach the master server (Default: „8080“ = Apache Tomcat of the first

HYDRA system or instances).

<add key="MasterServerPort" value="8080"></add>

ShowSplashScreen: Activates the splash screen during the start of the MOC (Default: True). Valid values:

"True" or "False".

<add key="ShowSplashScreen" value="True"></add>

UserDataDirectory: A user specific directory where all individual setting of the Windows user are stored

and which starts the MOC client. See also chapter „5.2 Configuration“.

<add key="UserDataDirectory" value="$ApplicationData\user\"></add>

„$ApplicationData“ is equivalent to the Windows path “%APPDATA%\MPDV\MOC“.

This results in a path: c:\Users\user\AppData\Roaming\MPDV\MOC\user\

This configuration may be helpful for the installation on a terminal server (e.g. Citrix or MS terminal

server) or to operate several MOCs on a single PC.

Then you could enter the path as follows:

<add key="UserDataDirectory"

value="c:\Users\user\AppData\Roaming\MPDV\MOC_Test\user\"></add>

DefaultSettingScope:  Determines  the  scope  of  the  MOC  settings  (Default:  "User").  Allowed  Values:

"Standard", "Custom", "Local", "User".

<add key="DefaultSettingScope" value="User"></add>

Do not change this setting without consulting MPDV Mikrolab GmbH.

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 35 of 44

Install MES Operation Center for HYDRA MW4.0pe

PdvReloadMode:  Specifies  reload  mode  for  PDV  web  services  (Default:  "Prompt").  Allowed  Values:

"Reload", "Abort", "Prompt", "PromptWithTime".

<add key="PdvReloadMode" value="Prompt"></add>

Do not change this setting without consulting MPDV Mikrolab GmbH.

The following parameter is not contained as default but can be added in order to stop an automatic

search for updates:

DisableAutoUpdate: This global setting deactivates the automatic search for updates. It overrules user

specific settings stored in the configuration files inside „UserDataDirectory“.

<add key="DisableAutoUpdate" value="True" />

This is a mandatory setting for an installation with Citrix XenApp (previously Presentation Server,

before MetaFrame) or Microsoft terminal server (see below)!

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 36 of 44

Install MES Operation Center for HYDRA MW4.0pe

4.3  Configuration tips when using different software releases

for one client

You can install on a Window client any number of MOC instances in parallel to keep different MOC software

releases for development, test and productive systems.

All MOC instances use per default the same settings to manage user configuration (user scope), downloads

for updates and log files. For this reason the application is checked how far the following settings should

be adjusted:

Note: The following information relates to standard path of a MOC installation and must be checked for

each available installation.

4.3.1  Storage location for the log file

We recommend to separate different MOC instances in order to facilitate the failure analysis. Prepare a

new file named „NLog.user.config“ or “NLog.local.config” with the following content in the main directory

of the concerned MOC installation (e.g.: "C:\Program Files (x86)\MPDV\MOC“):

<?xml version="1.0" encoding="utf-8" ?>
<nlog xmlns="http://www.nlog-project.org/schemas/NLog.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-ins
tance" autoReload="true">
  <variable name="logpath" value="${specialfolder:folder=ApplicationData}\MPDV\MOC\log" />
</nlog>

Change

the

red

colored  path

to

show

your

intended  new

storage

location

(e.g.

${specialfolder:folder=ApplicationData}\MPDV\MOCTEST\log).

Ensure that the local user has write permission for that directory.

The  file  NLog.user.config  should  be  used  for  changes  which  are  only  valid  on  this  specific  client  PC,

whereas the file NLog.local.config is intended to be used in an update package for distribution to all client

PCs.

4.3.2  Download path for updates

The MOC Updater downloads per default from the central server into the central update folder. If different

instances are managed in a Window client, which connect with different systems, then you should either

deactivate automated updates or you should configure different target paths for the downloaded updates.

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 37 of 44

Install MES Operation Center for HYDRA MW4.0pe

The required changes are executed in the file:

"C:\Program Files (x86)\MPDV\MOC\MOC.ApplicationSettings.config"

by adjusting the entries:

<add key="UpdatePath" value="C:\ProgramData\mpdv\moc\updates\files" />

and

<add key="UpdatePath" value="C:\ProgramData\mpdv\moc\updates\files" />
<add key="TempUpdatePath" value="C:\ProgramData\mpdv\moc\updates" />

Example:

<add key="TempUpdatePath" value="C:\ProgramData\mpdv\MOCTEST\updates" />

<add key="UpdatePath" value="C:\ProgramData\mpdv\MOCTEST\updates\files" />

4.3.3  Preparing the user directory

The  local  user  directory  stores  settings  of  current  MOC  users.  If  the  different  MOC  instances  are  not

separated, then the relevant path must be configured.

The required changes are carried out in the file:

"C:\Program Files (x86)\MPDV\MOC\MOC.ApplicationSettings.config"

by adjusting the entry:

<add key="UserDataDirectory" value="$ApplicationData\user\" />

Please note: $ApplicationData refers to the data directory for the MOC application. In Windows 7 this is the

folder C:\Users\<user>\AppData\Roaming\MPDV\MOC\.

Allowed placeholders are:

  %HYDRAUSER%: the name of the registered HYDRA user

  %WINDOWSUSER%: the name of the registered Windows user

  %HYDRASYSTEM%: the name of the system the user is logged on to.

Example:

<add key="UserDataDirectory" value=”C:\Users\<user>\AppData\Roaming\MPDV\MOCTEST\%hydrauser%\" />

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 38 of 44

Install MES Operation Center for HYDRA MW4.0pe

4.4  Citrix XenApp or MS terminal server

The  automated  search  for  software  updates  must  be  stopped  for  the  installation  of  the  MES

Operation Center in Citrix XenApp (previously Presentation Server, before MetaFrame) or Microsoft

terminal server.

The

parameter

„DisableAutoUpdate“  must

be

added

to

the

configuration

file

(MOC.ApplicationSettings.config or. MOC.exe.config):

<add key="DisableAutoUpdate" value="True" />

The  global  setting  overrules  user  specific  settings  stored

in

the  configuration

files

inside

„UserDataDirectory“.

An  administrator  must  carry  out  the  updates  for  the  MOC  software  for  all  terminal  server

environments.

Ensure before the update that no MOC client is started before the terminal server.

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 39 of 44

Install MES Operation Center for HYDRA MW4.0pe

4.5  HTTPS encryption

Starting with SP10 it is possible to encrypt the communication between MOC client and HYDRA server via

HTTPS

Prerequisite is the correct configuration on the HYDRA server.

The following parameter must be changed in the MOC.ApplicationSettings.config file:

<add key="MasterServer" value="https://"[Name of the HYDRA Server]"></add>

<add key="MasterServerPort" value="[SSL Port of the HYDRA Server]"></add>

The  configuration  of  HTTPS  communication  on  the  HYDRA  server  will  be  executed  from  a  staff

member of MPDV Mikrolab GmbH.

For more information please contact your responsible MPDV sales representative.

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 40 of 44

Install MES Operation Center for HYDRA MW4.0pe

5  Uninstallation of the MES Operation Center

You can remove the MES Operation Center by requesting the uninstallation routine of the PC.

Another option is to uninstall manually.

5.1  Uninstallation by requesting uninstallation routine

You can start the uninstallation routine with a right-hand click on the relevant entry in the list of the installed

programs.

If you confirm the process in the following dialog, the uninstallation is started.

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 41 of 44

Install MES Operation Center for HYDRA MW4.0pe

No information is shown on user interface during the uninstallation.

The following note appears after closing the process:

As you cannot rule out that there are further installations on the client PC that were installed with deploy by

copy, no data is deleted in the working directories during the uninstallation routine.

If you wish to delete data, you must carry out the process manually.

See  “Remove  files  of  the  installation/update  program”  and  “Remove  user  settings”  in  chapter  “5.2

Uninstallation (manually)”.

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 42 of 44

Install MES Operation Center for HYDRA MW4.0pe

5.2  Uninstallation (manually)

You  can  generally  install  the  MES  Operation  Center  by  copying  the  installation  directory  of  an  existing

installation.

For this reason, you can uninstall manually.

The required steps are described further along.

5.2.1  Remove MOC program files

The path for the program files are specified during the installation.

The folder is per default:

C:\Program Files (x86)\MPDV\HYDRA 8\MOC

Delete the target folder of the installation in order to remove the program files completely.

Note: If several  MOC  instances  were installed in the  current Windows system, then repeat this step for

each instance.

5.2.2  Remove desktop links

During the installation of the MES Operation Center with the aid of the program MOC Updater, all links to

the desktop and start menu of the current user are prepared.

Remove the links by deleting the reference in the folders:

C:\Users\<USERNAME>\Desktop

and

C:\Users\<USERNAME>\AppData\Roaming\Microsoft\Windows\Start Menu

5.2.3  Uninstallation of the visualization component

When  using  the  PDV  Online  Visualizing  (e.g.  the  application  "PDV  Visualizing")  you  must  perhaps

manually register a visualizing component.

See chapter “3.6 Deploy by Copy”.

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 43 of 44

Install MES Operation Center for HYDRA MW4.0pe

5.2.4  Remove files of the installation/update program

The update program creates backups for MOC program files where applicable.

These are located in the folder:

C:\Users\<USERNAME>\AppData\Local\MPDV\MOCUpdater\Backup

Delete the folder to remove all backup files.

5.2.5  Remove user settings

The MES Operation Center saves per default all settings of the current user in the folder:

C:\Users\<USERNAME>\AppData\Roaming\MPDV\MOC

Note: This folder can be changed by a special setting in the folder MOC.ApplicationSettings.config.

Remove all user settings, log files etc. by removing the folder.

InstallationGuide_MW40_MOC.docx

Version: 1.0.23049

Page 44 of 44

