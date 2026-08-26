Start Menu Inst32

1  Start Menu Inst32

The terminal software is installed on a local hard drive of the terminal or a shop floor PC. After booting the

terminal, the following selection menu appears:

The following selection options are available in the selection menu (start by key or clicking)

[ A ]  Hardware Test   >>

Submenu for different hardware tests

[ B ]

Load Application

After an update from the HYDRA server, the application programs can be easily updated.

[ C ]  Configuration

[ D ]  Delete Files   >>

Submenu for deleting different files (data directories, queues, logs, application)

[ E ]

Tools   >>

Submenu for opening or installing different tools

AIP2_Startmenu_Inst32.docx

Version: 1.5.5434

Page 1 of 19

Start Menu Inst32

[ F ]

Program – Start

Opening the application program. If nothing is entered, it will be started automatically after 20 seconds.

The <D> and <E> buttons are only used for service purposes.

If no button is pressed, the AIP2 application starts automatically after 20 seconds. Once the application

has started, a few  notes are displayed indicating the  version number, hardware  configuration  and other

service information. If everything (configuration and terminal) is in order, the display switches to the basic

dialogs  described  in  more  detail  in  the  sections  that  follow.  If  the  terminal  detects  hardware  or

configuration errors, it alerts the user by sending messages in plain text.

Submenu for opening or installing further [A] Hardware Tests    >>

[ 1 ]  MSS Test

(Hardware test for the machine interface / MSS)

[ 2 ]

Reader Test

(Hardware test for different reader connections / BAR, LEGIC, PLG, ...)

 [ 3 ]  LAN Test

(Hardware test of the network connection)

 [ 4 ]  Test Apps  >>

(Test applications of any kind)

[ ESC ]  Main Menu

Back to the main menu

AIP2_Startmenu_Inst32.docx

Version: 1.5.5434

Page 2 of 19

Starting the function “Test Apps“ by the menu item ”[ 4 ] Test Apps  >>"

Start Menu Inst32

When  starting  the  function  “test  apps“,  a  directory  list  of  the  HYDRA  server  directory

”./ctnet/win/testapps/“ is loaded.

The function creates an entry for each directory in the list that includes a file “testapp.ini”. If this file

already exists locally,  i.e.  it has already been loaded  earlier, the entry  will be highlighted in green

(e.g.

).

The selected “Testapp“ can be reloaded or updated by the function key ”Load“.

The selected “Testapp“ is started by the function key “Execute".

The list can be browsed by using the function keys “Page Up” and “Page Down”. The function is

exited by using the key “Close”.

The configuration file “testapp.ini“ is structured a follows.

  [APP]
  name=com32tst
  exe=com32tst.exe
  param=...
  [COMMENT]

; optional parameter to transfer call data

MSS Test Program

  [/COMMENT] [APP]

AIP2_Startmenu_Inst32.docx

Version: 1.5.5434

Page 3 of 19

Start Menu Inst32

Submenu deleting or restarting/closing files using [D] Delete files

[ 1 ]

Delete spool directory

(deleting the ./spool directory of the terminal)

[ 2 ]

Delete queues

(deleting the queue in the ./spool directory of the terminal)

[ 3 ]

Delete logs

(deleting the log files in the ./spool directory of the terminal)

[ 4 ]

Delete application

(deleting the configured application)

[ ESC ]  Main menu

back to the main menu

The application / Windows can  be  exited or restarted in the following selection  dialog after entering the

password "mos6950" and clicking the button

.

AIP2_Startmenu_Inst32.docx

Version: 1.5.5434

Page 4 of 19

Start Menu Inst32

Submenu for opening or installing further “[E] tools >>“

[ 1 ]  MSS-Loader install

[ 2 ]  MSS-Loader start

[ 3 ]

VNC install

[ 4 ]

HYDRA Fonts install

(loading and starting the installation package for Font Installation)

[ 5 ]   more Tools   >>

(Backup, Restore, Terminal Upload, Install 3rdParty)

[ ESC ]  Main Menu

Back to main menu

Submenu by starting "[ 5 ] more tools”

[ 1 ]

Backup

[ 2 ]

Restore

[ 3 ]

Installation 3rd Party

[ ESC ]  Main Menu

Back to the main menu

AIP2_Startmenu_Inst32.docx

Version: 1.5.5434

Page 5 of 19

Start Menu Inst32

Menu item "[1]  Backup“

The server uses the file <hydradir>\ctnet\win\aip2backup.txt

or a terminal-specific file <hydradir>\ctnet\win\aip2backup2xxx.txt

(xxx is terminal number) for the backup. At first the system attempts to load a terminal-specific file.

If no terminal-specific file exists, the system will then attempt to load the file aip2backup.txt. This file

contains all of the files or registry entries that need to be backed up.

\aip2\*.ini

\aip2\*.cfi

\aip2\*.cfg

HKEY_LOCAL_MACHINE\SOFTWARE\MPDV\

A Zip file is created in the terminal and it is stored in the server.

The file is located in the server at:

The backup Zip file is given the name:  aip2backup2xxx.zip

 ->xxx = terminal number

(terminal-

specific for Hydra user 2xxx)

This backup file is then stored in the server under

<hydradir>\custom\backup\aip2\aip2backup2xxx.zip .

Menu item "[ 2 ] Restore“

There  will  first  be  a  query  asking  whether  you  would  like  to  run  a  restore.  "Restore"  attempts  to  load  a

backup file located in the server and then automatically restores all of the backed up files and any backed

up registry entries.

As already described in the backup section, a backup file is filed in the server directory:

<hydradir>\custom\backup\aip2\aip2backup2xxx.zip

AIP2_Startmenu_Inst32.docx

Version: 1.5.5434

Page 6 of 19

Menu item “[ 3] Installation 3rd Party“

Start Menu Inst32

"Installation" button:

A list with all directories starting with the <hydradir>\ctnet\win\install directory is displayed. The

directories found will be offered for selection in a dialog. By confirming a directory, this directory is

downloaded and its contents are shown.

The <hydradir>\ctnet\win\install directory can therefore be expanded to include additional directories.

AIP2_Startmenu_Inst32.docx

Version: 1.5.5434

Page 7 of 19

Content of a directory selected beforehand

Start Menu Inst32

Having  clicked  one  of  the  buttons  "copy  file"  or  "copy  all  files",  a  selection  screen  opens  where  a

directory may be chosen. The selected file or all files displayed are copied into this directory. In order to

copy a single file, first it needs to be selected in the list.

AIP2_Startmenu_Inst32.docx

Version: 1.5.5434

Page 8 of 19

Start Menu Inst32

Execute  button:  A

file

from

the

list  may  be  executed  by  clicking

this  button.

The execution program defined in Windows is used to display or execute the selected file.

1.1  Using the functions in Windows 7

Availability  or  feasibility  of  individual  functions  of  the  “INST32”  installation  function  using  Windows  7

depends on the user type:

User Type

INST32 Function

Updating INST32 from the HYDRA
server

Installation of fonts

Loading the application (download)

Changing configuration settings

Installation MSS Loader

Installation VNC

Backup

Restore

Installation 3rd party components

Local User
Member of the
“administrators“
group

Local
administrator

Local User,
Member of the
“users“ group

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

No

Yes

Yes

No

No

Yes

Yes

No

AIP2_Startmenu_Inst32.docx

Version: 1.5.5434

Page 9 of 19

Start Menu Inst32

User Type

Local User
Member of the
“administrators“
group

Local
administrator

Local User,
Member of the
“users“ group

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

No

No

No

Yes

INST32 Function

Deleting files

Starting MSS Loader

Starting hardware test

Starting reader test

Starting LAN test

1.2

Installation of font types in Windows 7

If  the  "Windows  7"  operating  system  is  used  the  required  font  types  can  no  longer  be  installed  by  the

application itself.

The  required  fonts  have  to  be  installed  once  using  the  above-mentioned  installation  program  "INST32",

menu item "HYDRA Fonts install". This is required to make sure the information is properly displayed on

the terminal.

1.3  Date/time synchronization at the terminal

The HYDRA terminal software automatically synchronizes the time of the local terminal PC with the time

of the HYDRA server. Usually, different Windows versions require administrative rights to be able to set

the time locally.

The message below is displayed once, every time the program is started if the respective Windows user

does not have the required rights.

AIP2_Startmenu_Inst32.docx

Version: 1.5.5434

Page 10 of 19

Start Menu Inst32

The following entry in the [system] section of the local configuration file CTAIP.INI prevents the time from

being synchronized with the HYDRA server and, as a result, the above-mentioned error message is also

suppressed.

[system]
NoLocalWatchUpdate=on
NoLocalWatchWarning=on

But if this configuration is enabled, the user has to make sure that the time of the HYDRA terminal PC is

synchronized with another reliable source and that the time of the HYDRA terminal PC and the time of the

HYDRA server are synchronous.

The user is responsible for disabling the time synchronization function. Wrong time stamps at the terminal

may  lead  to  unintentional  problems  when  processing  data,  e.g.  incomplete  or  wrong  reports  and

evaluations or errors in posting times and durations.

1.4  Control of special watchdog hardware

New watchdog types are connected by a driver DLL, which is configured in ctaip.ini.

[DLL]

WdDLL=<Driver DLL>

Watchdog

AEC6810

Configuration

Required files

WdDLL= aaeondrv.dll

aaeondrv.dll

aaeonWdt.dll

AIP2_Startmenu_Inst32.docx

Version: 1.5.5434

Page 11 of 19

Start Menu Inst32

Watchdog

Configuration

Required files

aaeonwrapper.dll

A watchdog may also be activated within the registry. The following entry has to be set:

HKEY_LOCAL_MACHINE\SOFTWARE\MPDV\CT\WdDLL=<Driver DLL>

In case both entries are set, the entry in the ctaip.ini file takes priority.

1.5

inst32.ini - Standard

Default settings for installing AIP2.

Entry

Comment

Section [install]

PrgIniFile=C:\MPDV\AIP2\ctaip.ini

Path of the ctaip.ini file

PrgExeFile= C:\MPDV\AIP2\ctaip

AIP2 program to be started.

DisplayName=AIP2

ConfigEditorFile=aip2.mkf

The option DisplayName may only be used
with an AIP2 terminal. The value AIP2 must
not be changed.

Configuration file for the configuration editor.
This file controls the GUI of the configuration
editor.

ConfigHelpFile=iniedit.ini

Help file for the configuration editor.

The default settings should be sufficient in the inst32.ini file.

AIP2_Startmenu_Inst32.docx

Version: 1.5.5434

Page 12 of 19

1.6

inst32.ini - application selection

The  following  optional  configuration  can  be  used  if  a  terminal  PC  must  support  different  installations

during a transitional period (e.g. version upgrade from CTAIP to AIP2).

Start Menu Inst32

This configuration should only be used in exceptional cases.

Entry

Comment

Section [install]

ApplicationChoiceAvailable=on

The application to be supported can be selected using
this optional configuration.

Single  "install*"  sections  for  different  applications  must  be  configured  with  the  above-mentioned

configuration option.

Section for AIP2

Section [installaip2]

Entry

Comment

PrgIniFile=C:\MPDV\AIP2\ctaip.ini

Path of the ctaip.ini file

PrgExeFile= C:\MPDV\AIP2\ctaip

AIP2 program to be started.

DisplayName=AIP2

ConfigEditorFile=aip2.mkf

The option DisplayName may only be used
with an AIP2 terminal. The value AIP2 must
not be changed.

Configuration file for the configuration editor.
This file controls the GUI of the configuration
editor.

ConfigHelpFile=iniedit.ini

Help file for the configuration editor.

Section for CTAIP

Section [installaip]

Entry

Comment

PrgIniFile=C:ctaip\ctaip.ini

Path of the ctaip.ini file

PrgExeFile=C:\ctaip\ctaip

CTAIP program to be started.

Section for CTWIN

AIP2_Startmenu_Inst32.docx

Version: 1.5.5434

Page 13 of 19

Start Menu Inst32

Entry

Comment

Section [installctwin]

PrgIniFile=C:\ctwin\ctaip.ini

Path of the ctwin.ini file

PrgExeFile= C:\ctwin\ctwin

CTWIN program to be started.

Default application

Entry

Comment

Section [system]

Default=installaip2

When starting inst32, AIP2 is supported by
default.

Sample configuration inst32.ini for AIP2/AIP:

The AIP2 has been designed to be configured by default. The AIP2 is selected by default when starting

inst32.exe. The application can be changed in inst32adm.

Using this configuration the GUI shows the supported application. By double clicking, the selection dialog

can be opened in inst32adm.

AIP2_Startmenu_Inst32.docx

Version: 1.5.5434

Page 14 of 19

Start Menu Inst32

The application can be changed in the selection dialog.

Inst32 now supports CTAIP.

Sample configuration inst32.ini for AIP2/CTWIN:

The AIP2 has been designed to be configured by default. The AIP2 is selected by default when  starting

inst32.exe. The application can be changed in inst32adm.

AIP2_Startmenu_Inst32.docx

Version: 1.5.5434

Page 15 of 19

Start Menu Inst32

Using this configuration the GUI shows the supported application. By double clicking, the selection dialog

can be opened in inst32adm.

The application can be changed in the selection dialog.

AIP2_Startmenu_Inst32.docx

Version: 1.5.5434

Page 16 of 19

Start Menu Inst32

Inst32 now supports CTWIN.

AIP2_Startmenu_Inst32.docx

Version: 1.5.5434

Page 17 of 19

Start Menu Inst32

1.7  Migration: CTWIN/AIP --> AIP 8.2

The  program  "iniconverter.exe“  is  available  in  order  to  migrate  a  CTWIN/AIP  installation  to  an  AIP  8.2

installation.  This  program  transfers  relevant  INI  files  or  INI  entries.  This  program  can  be  loaded  and

started via the menu item "[A]  Hardware test  >>“ of the sub-menu "[ 4 ]  Test Apps >>“

and by selecting "[ iniconverter ]“.

A detailed description on how to operate "test apps" can be found in the chapter  "Start menu Inst32" of

section "Starting the function "test apps" using menu item "[ 4 ] Test apps    >>“.

The following application dialog is shown after loading and starting the test app "[ iniconverter ]".

While  starting  the  application,  the  required  entries  in"Source  (INI)“  and  "Target  (Path)“  are  assigned  by

default.

The following order applies for "Source (INI)":



c:\aip\ctaip.ini

  d:\aip\ctaip.ini



c:\ctwin\ctwin.ini

  d:\ctwin\ctwin.ini

  Registry "HKEY_LOCAL_MACHINE\SOFTWARE\[Wow6432Node\]Mpdv\CT\PATH\AIP“

  Registry „HKEY_LOCAL_MACHINE\SOFTWARE\[Wow6432Node\]Mpdv\CT\PATH\CTWIN“

The "Target (Path)" is pre-assigned via the following registry entry:

  Registry "HKEY_LOCAL_MACHINE\SOFTWARE\[Wow6432Node\]Mpdv\CT\PATH\AIP2“

AIP2_Startmenu_Inst32.docx

Version: 1.5.5434

Page 18 of 19

Start Menu Inst32

If  the  values  assigned  by  default  are  incorrect,  they  can  be  revised  using  the  buttons

  behind

the input field.

The "Source (INI)" field can be changed using the standard dialog "open file".

The "Target (Path)" field can be changed using the standard dialog "search folder".

The button

 converts/transfers INI files from the "Source" directory to the "Target" directory.

This command can be executed several times. In case the "Target" directory already includes several INI

files, a dialog opens where updating/overwriting of these files must be confirmed. (Please note: all dialogs

can be confirmed provided that the AIP 8.2 terminal has not been implemented manually beforehand)

The transfer result is documented in a memo field and stored in the file "iniconverter.txt" of the  "Target"

directory.

Please note:

  The

configurations

of  PCC

drivers,

such

as

those

included

in

the

files

mssmpdv.ini, opcmdv.ini, etc.

must be checked and adjusted to the new installation, if necessary.

  The INI files used for the automatic transfer are filed together with the file "iniconverter.txt" in the

sub-directory ".\ini-srce\<yyyymmdd-hhmmss>\.“ of the "Target" directory.

AIP2_Startmenu_Inst32.docx

Version: 1.5.5434

Page 19 of 19

