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

AIP_Startmenu_Inst32.docx

Version: 1.3.5436

Page 1 of 12

Start Menu Inst32

[ F ]

Program – Start

Opening the application program. If nothing is entered, it will be started automatically after 20 seconds.

The <D> and <E> buttons are only used for service purposes.

If  no  button  is  pressed,  the  AIP  application  starts  automatically  after  20  seconds.  Once  the  application

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

AIP_Startmenu_Inst32.docx

Version: 1.3.5436

Page 2 of 12

Start Menu Inst32

Starting the function “Test Apps“ by the menu item ”[ 4 ] Test Apps  >>"

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

AIP_Startmenu_Inst32.docx

Version: 1.3.5436

Page 3 of 12

Start Menu Inst32

The configuration file “testapp.ini“ is structured as follows.

  [APP]
  name=com32tst
  exe=com32tst.exe
  param=...
  [COMMENT]

; optional parameter to transfer call data

MSS Test Program

  [/COMMENT] [APP]

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

AIP_Startmenu_Inst32.docx

Version: 1.3.5436

Page 4 of 12

Start Menu Inst32

The application / Windows can  be  exited or restarted in the following selection  dialog after entering the

password "mos6950" and clicking the button

.

AIP_Startmenu_Inst32.docx

Version: 1.3.5436

Page 5 of 12

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

Please

note

for

installation

tool

as

of

version

6.5.2.01:

The  "installation  3rd  party"  function  is  only  possible  in  connection  with  hyfserv  file  server  from

version 7.2.1.29 onwards

[ ESC ]  Main Menu

Back to the main menu

Menu item "[1] Backup“

The file <hydradir>\ctnet\win\ctaipbackup.txt

or a terminal-specific file <hydradir>\ctnet\win\ctaipbackup2xxx.txt

(xxx is the terminal number) is used by the server for the backup.

At first the system attempts to load a terminal-specific file.

If no terminal-specific file exists, the system will then attempt to load the file ctaipbackup.txt.

This file contains all of the files or registry entries that need to be backed up.

\ctaip\*.INI

\ctaip\*.cfg

\ctaip\cfg\*.*

HKEY_LOCAL_MACHINE\SOFTWARE\MPDV\

AIP_Startmenu_Inst32.docx

Version: 1.3.5436

Page 6 of 12

A Zip file is created in the terminal and it is stored in the server.

The file is located in the server at:

The backup Zip file is given the name:  ctaipbackup2xxx.zip

 ->xxx = terminal number

(terminal-

Start Menu Inst32

specific for Hydra user 2xxx)

This backup file is then stored in the server under

<hydradir>\custom\backup\ctaip\ctaipbackup2xxx.zip .

Menu item "[ 2 ] Restore“

There will first be a query asking whether you would like to run a restore.

"Restore"  attempts  to  load  a  backup  file  located  in  the  server  and  then  automatically  restores  all  of  the

backed up files and any backed up registry entries.

As already described in the backup section, a backup file is filed in the server directory:

<hydradir>\custom\backup\ctaip\ctaipbackup2xxx.zip

Menu item “[ 3] Installation 3rd Party“

Please note: Possible with file server hyfserv 7.2.1.29 only

AIP_Startmenu_Inst32.docx

Version: 1.3.5436

Page 7 of 12

Start Menu Inst32

"Installation" button:

A list with all directories starting with the <hydradir>\ctnet\win\install directory is displayed. The

directories found will be offered for selection in a dialog. By confirming a directory, this directory is

downloaded and its contents are shown.

The <hydradir>\ctnet\win\install directory can therefore be expanded to include additional directories.

Content of a directory selected beforehand

Having  clicked  one  of  the  buttons  "copy  file"  or  "copy  all  files",  a  selection  screen  opens  where  a

directory may be chosen. The selected file or all files displayed are copied into this directory. In order to

copy a single file, first it needs to be selected in the list.

AIP_Startmenu_Inst32.docx

Version: 1.3.5436

Page 8 of 12

Start Menu Inst32

Execute button: A file from the list may be executed by clicking this button. The execution program

defined in Windows is used to display or execute the selected file.

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

AIP_Startmenu_Inst32.docx

Version: 1.3.5436

Page 9 of 12

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

The following minimum versions are required if AIP is used with Windows 7.

Program

inst32.exe

ctaip.exe

hydra-fonts.msi

Version/date

7.0.0.7

2.0.2.10

2010-05-31

1.3  Date/time synchronization at the terminal

The HYDRA terminal software automatically synchronizes the time of the local terminal PC with the time

of the HYDRA server. Usually, different Windows versions require administrative rights to be able to set

the time locally.

The message below is displayed once, every time the program is started (as of version V# 2.0.2.10) if the

respective Windows user does not have the required rights.

AIP_Startmenu_Inst32.docx

Version: 1.3.5436

Page 10 of 12

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

AIP_Startmenu_Inst32.docx

Version: 1.3.5436

Page 11 of 12

Start Menu Inst32

Watchdog

Configuration

Required files

aaeonwrapper.dll

A watchdog may also be activated within the registry. The following entry has to be set:

HKEY_LOCAL_MACHINE\SOFTWARE\MPDV\CT\WdDLL=<Driver DLL>

In case both entries are set, the entry in the ctaip.ini file takes priority.

AIP_Startmenu_Inst32.docx

Version: 1.3.5436

Page 12 of 12

