Manual

Collection / Visualization
Functions for Process Data
AIP-PDV 8.2

Version 1.0.23049

Last changed on: 01.09.2020

Collection / Visualization Functions for Process Data

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

AIP-PDV_82.docx

Version: 1.0.23049

Page 2 of 28

Collection / Visualization Functions for Process Data

Contents

1  Overview of Collection / Visualization Functions for Process Data.............. 4

2  AIP2 Operation ............................................................................................. 5

2.1  Special Control and Display Elements on the AIP2 ............................................. 5

2.2  General description of the posting process on the AIP2 ...................................... 8

3  PDV Functions - Process Visualization in AIP ........................................... 11

3.1  Display of measuring channels .......................................................................... 11

3.2  Change default value ........................................................................................ 14

4  AIP2 -Local Configuration .......................................................................... 17

4.1

Local Configuration ctaip.ini .............................................................................. 17

4.2  PNG – Files / Bitmaps ....................................................................................... 21

4.2.1  File pict.zip ............................................................................................ 21

4.2.2  File pict_cust.zip .................................................................................... 21

4.3  Multilingualism (*.mld files) ................................................................................ 22

5  AIP2 - Central Configuration File hytnrcfg.ini ............................................. 23

5.1

Layout configuration .......................................................................................... 26

AIP-PDV_82.docx

Version: 1.0.23049

Page 3 of 28

Collection / Visualization Functions for Process Data

1  Overview of Collection / Visualization Functions for Process

Data

Purpose

The AIP features contained in this function package make it possible to display process data directly  in

production using shop floor terminals or data entry PCs.

Implementation considerations

You use the function package if you:

  Want to monitor the values entered via process data collection online at the terminal.

  Would like to visualize the system values in pointer instruments or trend lines.

  Would like to display system layouts using online measured values.

Integration

AIP  offers the ability  to connect to the data server used for input  via the  PDV  visualization components

and to display the values entered there online.

Features

Displays the input process values as a pointer or bar chart



Illustrates the process trends using the latest input values

  Dialog controlled option to change target values manually

  Creates  individual  layouts  independently  or  as  a  part  of  the  HYDRA  customizing  process  using  the

process visualization editor (MDS-PVE).

  Displays separate system layouts using the integrated measured values display and graphic display

elements (additional license).

Additional licenses are needed in order to use the functions listed above.

AIP-PDV_82.docx

Version: 1.0.23049

Page 4 of 28

Collection / Visualization Functions for Process Data

2  AIP2 Operation

2.1  Special Control and Display Elements on the AIP2

Tables

Uniform selection lists are used in AIP 8.2 posting dialogs:

  If  information  is  available  for  more  than  one  page,  the  page  numbers  are

displayed  below  the  table.  The  current  page  is  highlighted  in  bold  letters.  If  the  user  clicks/touches  a

page, the display directly changes to this page.

If more pages are available than the page numbers displayed, the following buttons can be displayed on

the left or right hand side depending on the context (available as of SP10/2016):









 :  If  you  click  this  button,  the  system  jumps  to  the  first  page  of  the  next  page  navigation.

This  means:  If  Page  1  ...  Page  9  were  displayed  for  the  page  navigation,  the  system  jumps  to

Page 10.

 :  If  you  click  this  button,  the  system  jumps  to  the  first  page  of  the  next  page  navigation.

This means: If Page 10 ... Page 18 were displayed for the page navigation, the system jumps to

Page 9.

 : If you click this button, the system directly jumps to Page 1.

 : If you click this button, the system directly jumps to the last page.

You can select an operation using the mouse, touch screen, keyboard (arrow keys:'' or ''), scanner or

by entering it manually.

The content of tables or lists depends on the respective context. Example: When you log on an operation,

those  operations  are  available  that  are  included  in  the  sequencing  list  or  planned  for  the  respective

workplace or group. When you interrupt an operation, only running operations are available for selection.

AIP-PDV_82.docx

Version: 1.0.23049

Page 5 of 28

Collection / Visualization Functions for Process Data

 Scrolling page by page (up or down) in the table.

 Scrolling to the left or right. Only those buttons are activated that make sense for the current

situation (context sensitive). This figure shows that scrolling to the left has been deactivated.

Optionally you can display a “table filter” (customization). This is an automatic filter that, once it has been

entered,  directly  affects  the  table  without  having  to  update  it.  This  process  is  realized  through  full-text

search for (defined) columns. The search is case-insensitive.

Virtual keyboard

Using  the  virtual  keyboard,  you  can  enter  data  manually  via  touch  screen  or  a  connected  mouse.  The

virtual keyboard is displayed automatically as soon as the focus is on an input field. The keyboard layout,

which  is  installed  and  activated  in  the  Windows  language  settings,  specifies  the  layout  of  the  virtual

keyboard.

 Moving the virtual keyboard

 Hiding the keyboard for 10 seconds

 Switching between the alphanumeric and numeric keyboard

 Selecting the keyboard layout (language)

AIP-PDV_82.docx

Version: 1.0.23049

Page 6 of 28

Collection / Visualization Functions for Process Data

 Changing the scaling/size of the keyboard

To move  the  keyboard,  you  must  configure  the  driver  accordingly  (configuration  in  the  control

panel of the terminal/PC)!

If you do not want to display the virtual keyboard in general, you must enter the parameter –t in the entry

parameters= of the configuration file ctaip.ini.

Date display

AIP supports a country-specific date format in dynamic dialogs. The option "short date" has to be selected

in the "regional settings" of the Windows "control panel" of the terminal/PC. Please note:

  Years are always four characters long.

  Months and days are always 2 characters long.

  Allowed separators are: '-‘ (minus), '/‘ (backslash) and '.‘ (dot).

  Blanks must not be included in the “short date” format, i.e. the <BLANK> separator is not allowed.

  The date separator “.” (dot) is only allowed in connection with the DD.MM.YYYY format.

  The date format, which might possibly be configured in dynamic dialogs, is ignored.

Examples

  English(USA)
  Danish
  Customer-specific 1
  Customer-specific 2
  Customer-specific 3

Note

MM/DD/YYYY
MM-DD-YYYY
YYYY-MM-DD
YYYY/MM/DD
MM/YYYY/DD

If the date format used is other than the permitted formats, a note appears when the program is started

and the date format is set to MM/DD/YYYY.

In the status bar, the year format is shortened and displayed only with two characters.

AIP-PDV_82.docx

Version: 1.0.23049

Page 7 of 28

Collection / Visualization Functions for Process Data

2.2  General description of the posting process on the AIP2

Many AIP posting dialogs are divided  into several  views (sub-dialogs). These views (sub-dialogs) cover

the entire screen so that only one dialog is visible at a time. In a “workflow concept” the user is navigated

through  the  posting  dialog  step  by  step.  In  the  following,  this  process  is  described  using  the  example

Interrupt operation. Other posting dialogs are operated in the same way.

The action Interrupt operation is performed. To start this action,  you click the button Interrupt  when  you

have selected an operation:

The dialog Interrupt operation opens and the first view (sub-dialog) is displayed. The header displays the

function that is currently being executed (here: Interrupt operation).

1st view (sub-dialog)
The views are run through one after the other

Posting that is currently being performed

Quantities already
recorded (yield,
scrap)

General OP data

Active input field

Virtual keyboard

In the first dialog Enter quantities, the user can enter the produced yield or scrap quantities. Subject to the

active input field, the virtual keyboard is shown or hidden automatically.

AIP-PDV_82.docx

Version: 1.0.23049

Page 8 of 28

Collection / Visualization Functions for Process Data

Quantities can be entered using the virtual or real keyboard. The user can go to the next field using the

tabulator key (which can also be found on the virtual keyboard). When the user has entered all values in

the first view, the next view (sub-dialog) can be opened by clicking Next.

The Cancel button is displayed in all sub-dialogs. Click this button to cancel/close the entire process at

any time.

To  open  the  next  view  (Select  status  in  the  example),  click  the  Next  button  or  another  tab  (in  our

example: Select status or Confirmation). Please note in this context, that no view can be skipped when

they  are  navigated  upwards  (view  1    view  2    view  3).  This  means:  When  you  are  in  the  first  view

(enter  quantities)  and  you  click  the  third  view  (confirmation),  the  second  view  (select  status)  will  be

displayed first.

Vice  versa,  when  navigating  downwards  (e.g.  from  the  confirm  view  to  the  enter  quantities  view),  each

view  can  directly  be  opened  by  clicking  the  required  tab.  In  this  case,  views  can  actually  be  skipped.

Using the Back button, views are opened one after the other (upwards).

As long as the dialog has not been confirmed, the data entered can be changed at any time by scrolling

back and forth.

Filter field for the list

Status list

In the second view Select status, you select the workplace status that is set, when the operation has been

interrupted. You can select the status from the status list displayed. This list can be restricted using the

Filter  field.  Once  the  required  values  have  been  entered,  the  next  view/sub-dialog  can  be  opened  by

clicking Next (in our example it is the last view).

AIP-PDV_82.docx

Version: 1.0.23049

Page 9 of 28

Collection / Visualization Functions for Process Data

Workplace data

Quantities posted for the OP

Input field for the badge number

The sub-dialog Confirmation shows a summary of all values entered in the dialog. If the user agrees with

the  entered  data,  the  Interrupt  operation  dialog  can  be  confirmed,  once  the  badge  number  has  been

entered. Then the dialog is sent to the server and posted.

If  an  input  field  of  the  dialog  is  not  completed  properly  (e.g.  a  mandatory  field  is  empty),  the  field  is

highlighted in red in the respective view and gets the focus. The user can then directly correct the value.

If a workflow dialog is opened, you can click the ESC key to directly exit the dialog. This exit is

also possible, if the virtual keyboard is displayed. As a consequence, you cannot use the ESC

key to close the virtual keyboard.

AIP-PDV_82.docx

Version: 1.0.23049

Page 10 of 28

Collection / Visualization Functions for Process Data

3  PDV Functions - Process Visualization in AIP

Purpose

As a part of the basic HYDRA-PDV functionality, the AIP terminal program transfers inspection plans to

the respective interface via MWP2 or a driver DLL. Vice versa, the AIP terminal then transfers incoming

measured values to the HYDRA server.

The  process  visualization  function  allows  to  monitor  the  status  of  measurement  channels  at  the  AIP

terminal.

3.1  Display of measuring channels

By  pressing  the  "PDV"  button  in  the  “workplaces”  section  of  the  AIP  terminal  it may  be  switched  to  the

respective display. The measuring channels of the machine selected in the basic  screen are shown. The

workplace may also be changed in the HYDRA-PDV view. An empty HYDRA-PDV dialog will be opened

if no measuring channels are configured for the selected machine.

The value range of all displays corresponds to the tolerance range of the respective measuring channel

configured within the inspection plan.

Different modes are available to display measuring channels. The mode may be chosen from the lower

button bar.

Pointer display

Measuring channels are displayed as pointers. All of the up to 16 configurable measuring channels

of a machine are also displayed at the same time.

AIP-PDV_82.docx

Version: 1.0.23049

Page 11 of 28

Collection / Visualization Functions for Process Data

Digital representation

Measuring channels are represented as digital values. All of the up to 16 configurable measuring

channels of a machine are also displayed at the same time.

AIP-PDV_82.docx

Version: 1.0.23049

Page 12 of 28

Collection / Visualization Functions for Process Data

Trend display

The progress including a corresponding legend is shown for each process parameter in a graphic.

The other process parameters can be reached by the arrow keys at the right margin of the screen.

Bar display

Measuring channels are displayed as bars. All of the up to 16 configurable measuring channels of a

machine are displayed at the same time:

AIP-PDV_82.docx

Version: 1.0.23049

Page 13 of 28

Collection / Visualization Functions for Process Data

3.2  Change default value

Default  values represent, among other things, a  decisive factor  when process data are displayed. They

may be changed by clicking the “change default value” button.

Posting procedure

The required workplace has to be selected, before changing default values.

Starting of the “change default value” function

The “change default value“ button is to be clicked. As soon as the function has been started, the user

is navigated through the dialog. The workplace has already been defined.

AIP-PDV_82.docx

Version: 1.0.23049

Page 14 of 28

Collection / Visualization Functions for Process Data

Select process parameter

The required process parameter, the default values of which have to be changed is to be chosen from the

available list.

Change default values

The individual values that are to be changed are entered in the dialog that opens. This dialog shows the

previous values as well as the new default values. The following values are concerned:

  Upper tolerance limit

AIP-PDV_82.docx

Version: 1.0.23049

Page 15 of 28

Collection / Visualization Functions for Process Data

  Upper process action limit

  Target value

  Lower process action limit

  Lower tolerance limit

Badge number

The badge number of the person changing the data is to be entered here.

Confirmation of “change default values”

The default values are updated in the system by confirming the dialog. They in turn affect HYDRA-

PDV display at the AIP terminal.

AIP-PDV_82.docx

Version: 1.0.23049

Page 16 of 28

Collection / Visualization Functions for Process Data

4  AIP2 -Local Configuration

4.1  Local Configuration ctaip.ini

The most important hardware and system settings are defined for each terminal in the CTAIP.INI file of

the C:\MPDV\AIP2 directory.

Changes  to  the  configuration  file  ctaip.ini  are  only  enabled  after  rebooting  the  terminal

software.

Layout configuration

Entry

Section [system]

Comment

CompanyInfo=(c) by John Doe Inc.
1998-2015

Overwrites the copyright text in the “About" dialog

parameters= … -t | +t

DEMO_ALL=ON

parameters= … -
SkipDynDlgExtraction…

parameters= … -
SkipAipStartupUpdate…

The virtual keyboard can be disabled/enabled, irrespective of the
terminal type.

The  information  in  the  lower  bar  are  normally  hidden  in  demo
mode.  This  option,  however,  causes  all  pieces  of  information  to
be  displayed  even  in  demo  mode  (version  number  and  date,
server, terminal number, online lights).

Internal  option  preventing  the  extraction  of  dialog  fields/buttons
when  updating  dialog  data.  (Only  applies  if  WF  directory
".\spool\$wf.$$$\“ is available)

Internal option preventing the configuration files (*.ini,*.cfg,*.cfi) of
(packets\*.dll)  and  application  DLLs
the  module  DLLs
(functions\*.dll)
the
terminal.

from  being  synchronized  when  starting

VirtScreenSize=640

All windows are started with the indicated resolution

AIP-PDV_82.docx

Version: 1.0.23049

Page 17 of 28

Entry

VirtScreenRatio=16:9

Section [SKIN]

Saturation=0

Hue=0

Name=mpdv

Active=false

Collection / Visualization Functions for Process Data

Comment

The  display  ratio  remains  if  the  configuration  VirtScreenSize  is
used to reduce the window.
The  width-to-height  (aspect)  ratio  can  be  changed  using
VirtScreenRatio. Consequently, the width-to-height ratio 16:9 can
be tested with a 4:3 monitor and vice versa.
The value can be configured as  "16:9" or as floating  point  value
(e.g. 1,77777).

Note:

Information  screens  are  specifically  scaled  if  monitor  screens  in
portrait  format  (e.g.  9:16)  are  used.  This  special  scaling  can  be
disabled in hytnrcfg.ini:
[Tnr Konfiguration 0]->PortraitAlignment=off

Configurations for the terminal's skin
(see ctaiplay.ini)
The  online  configuration  of  the  terminal  can  be  reached  by  the
info  dialog  (click  MPDV  icon).  ALT+F1  opens  the  control
elements for the skin.
Please  note:  Only  in  the  design/GUI  of  AIP  8.1  and/or  the
dynamic dialogs

Skin configuration / Default = 0

Skin configuration / Default = 0

Skin to be used / Default = mpdv

Skins can only disabled in ctaip.ini!
Default = true

Entry

Comment

Section [system]

Usr=21

Distinct terminal number

Hostname=192.9.200.24

Internet address of the server

Offlinetimeout=600

Showcursor=on

The  interval  after  which  online  access  should  be  attempted  the
next time. The interval is specified in seconds

Show  or  hide  mouse  pointer
on: mouse pointer active
off: mouse pointer inactive

in

terminal  application:

Loadfile=
ctnet\win\aip2.txt

Configuration file to download the application from the server.
The paths is relative to the installation directory of the system.

Watchdog=on

ON: Watchdog is activated
OFF: Watchdog is not activated

AIP-PDV_82.docx

Version: 1.0.23049

Page 18 of 28

Collection / Visualization Functions for Process Data

Entry

Comment

Demo=off

parameters=-t

TMOUT_C=xxx

TMOUT_S=xxx

TMOUT_R=xxx

TMOUT_F=xxx

Section [barcode]

BarKenn90=MNR4
...
BarKenn99=ANR3

Section [comports]

com1=0
com2=MSS
com3=BAR
Com3=LEGIC
Com4=RFLESER

Section [MSS-INIT]

MSS_DIALOG=10

‘on’:  Offline  demo  mode;  always  off
environment!

in

the  production

The –t parameter switches off the virtual keyboard.

Timeout for CONNECT to the server
If not specified, default = 10 seconds  

 Increase to 20 seconds for routing

Timeout for SEND to the server
If not specified, default = 10 seconds  

 Increase to 20 seconds for routing

Timeout for RECEIVE of the server
If not specified, default = 120 seconds

Timeout for FILESERVER operations to the server
If not specified, default = 10 seconds

 Increase to 20 seconds for routing

Configuration of customized barcode prefixes.

BarKenn90 > defines the prefix (here: 90); The ID from the dialog

(= acronym) is assigned.

Assignment of serial interfaces to connected devices:
MSS – machine interface
BAR, LEGIC, RFLESER – various reading devices

If the terminal is switched off longer than 15 minutes, a dialog is

displayed on terminal restart. The user must then decide whether

the counter pulses,  which  were recorded  when the terminal  was

closed, are posted or discarded. The dialog closes automatically

with  "Yes"  after  an  entered  time  has  elapsed;  in  this  case  the

counting impulses are posted.

This value configures the time in seconds the dialog is open.

If the terminal is switched off for less than 15 minutes, no dialog

is  opened;  the  counting  pulses  recorded  in  the  switch-off  phase

are accepted and posted without confirmation.

Please  note:  The  value  can  also  be  configured  in  hytnrcfg.ini.

Entries in the hytnrcfg.ini file take priority.

AIP-PDV_82.docx

Version: 1.0.23049

Page 19 of 28

Collection / Visualization Functions for Process Data

Entry

Comment

MSS_FILEAGE_MIN=5
MSS_FILEAGE_OVERTIME=delete

Additional configuration for MSS_DIALOG

Section [ext. software]

Button=Editor
WindowName=Editor
SearchParts=On

If the backup file for counting pulses of the terminal is older than

5  minutes,  no  dialog  is  opened  and  the  back  up  file  deleted.

Quantities recorded at the time when the terminal was closed are

not used/posted.

Please  note:  The  value  can  also  be  configured  in  hytnrcfg.ini.

Entries in the hytnrcfg.ini file take priority.

Configuration  of  the  button  in  the  top  line:  A  previously  started
program  can  be  brought  to  the  foreground  at  the  push  of  a
button.
Button: button caption
WindowName: Name of the program (e.g. from the taskbar).
SearchParts=On:  Parts  of  WindowName  are
sufficient
SearchParts=Off:  WindowName  must  be  entered  completely.
The  option  "SearchParts=On"  is  recommended  for  programs
such  as  MSWord  that  change  the  title  bar  subject  to  the
document that is currently being loaded.

ProgFileName=c:\Programme\wi
ncmd\Wincmd32.exe

The  program  that  is  started  if  the  program  mentioned  above
cannot be called to the foreground.

AutoStart=on

Section [DLL]

BusDLL=PCC.EXE

This option starts the program (ProgFileName) when starting the
terminal program.

PCC.EXE must be entered here if the terminal is configured with

the option "operated as HYDRA-MDE terminal".

If  necessary,  the  AIP2  enters  this  value  independently  upon

starting the program.

Section [PDV]

PDVProtokoll=ON

Enables PDV logging (prot_pdv.txt)  (by default=OFF)

PDVIOPDir=c:\IOPSim\

Path for DNC

Section [CAQ]

;Supported barcodes
FieldWNRBarcodeOnly=Y

FieldNestBarcodeOnly=Y

FieldNummBarcodeOnly=Y

FieldKNRBarcodeOnly=Y

If  this  entry  is  set  the  tool  number  may  only  be  entered  using  a
scanner.
If this entry is set the cavity number may only be entered using a
scanner.
If  this  entry  is  set  the  number  may  only  be  entered  using  a
scanner.
If this entry is set the badge number may only be entered using a
scanner.

AIP-PDV_82.docx

Version: 1.0.23049

Page 20 of 28

Collection / Visualization Functions for Process Data

Entry

Comment

BarcodeWNR=

BarcodeNest=

BarcodeNumm=

This field specifies which acronym is entered into the tool number
field by the scanner.
This  field  specifies  which  acronym  is  entered  into  the  cavity
number field by the scanner.
This  field  specifies  which  acronym  is  entered  into  the  number
field by the scanner.

4.2  PNG – Files / Bitmaps

The use of PNC files is recommended by MPDV. By default PNG files have a size of 24 x 24 px.

4.2.1

File pict.zip

The file "pict.zip“ is updated by the installation tool "inst32.exe“ while downloading and includes all default

PNG files.

The  default  PNG  files  can  be  overwritten  in  the  file  pict_cust.zip.  Several  PNG  files  have  the  extension

".small.png" (e.g. aip.small.png). These PNG files are used with a screen resolution of 640x480.

4.2.2

File pict_cust.zip

The file "pict_cust.zip“ is loaded from the server directory (e.g. \<serverDir>\1\custom)  when starting the

program (as is the case for the hycust.mld).

Customized PNG files may be stored in this file and loaded by the AIP2 terminal. Default PNG files may

also be "overwritten".

Please note: file sizes are not adjusted.

Customize header

The  AIP  icon  displayed  in  the  header  can  be  replaced  by  storing  a  separate  AIP.png  file  in  the

pict_cust.zip file.

This AIP icon will also be replaced in the "About" dialog.

AIP-PDV_82.docx

Version: 1.0.23049

Page 21 of 28

Customize footer

Collection / Visualization Functions for Process Data

The  MPDV  icon  displayed  in  the  footer  can  be  replaced  by  storing  a  separate  company.png  file  in  the

pict_cust.zip file.

Customize PZE dialog

The MPDV icon displayed in the PZE dialog can be replaced by storing a separate pze_mpdv.png file in

the  pict_cust.zip  file.  In  case  the  PZE  terminal  is  operated  with  a  screen  resolution  of  640x480,  a

customized pze_mpdv.small.png file has to be integrated in the pict_cust.zip file.

4.3  Multilingualism (*.mld files)

The below-mentioned files are required for the translation of the application. The table shows the priorities

for the translation, ownership and the relevant storage locations.

Priority

File

Server directory

Owner

Description

1

2

3

ctaipkd.mld

./ctnet/win/aip2/custom  Customer  Customer-specific translations

hycust.mld

./1/custom/

MPDV

Customized translations by MPDV.
The file is used by the AIP2, CTAIP
and CTWIN terminal.

ctaip.mld

./ctnet/win/aip2

MPDV

Standard translation file

AIP-PDV_82.docx

Version: 1.0.23049

Page 22 of 28

Collection / Visualization Functions for Process Data

5  AIP2 - Central Configuration File hytnrcfg.ini

You can use this file as central place to store different configurations for all or for separate terminals.

For each section, a general version is available

[section 0].

The  entries  included  in  this  section  can  be  overwritten  by  entries  in  a  terminal-specific  section

[section <TNR-USER>]

 <TNR-USER> = UserNo = terminal number + 2000 e.g. 2010,2101,..) for exactly one terminal/UserNo

The file hytnrcfg.ini is loaded from the server on every terminal start.

Section / Entry

Comment



[Tnr Konfiguration 0]

FollowExternStatus=on

[Terminal->Installation 0]

InstallFonts=on

OnlyInstallFontsAfterDownload=fal
se

[Terminal->USR 0]

Transfer of machine statuses when reloading machine list.
Useful if status change is set by PDM or another terminal

If set to "off", fonts are not installed during restart.
ON=DEFAULT

If “InstallFonts=on”:
If  true,  then  fonts  are  only  installed  directly  after  a
download.  If  false,  then  fonts  are  installed  every  time  the
terminal is restarted.
(false = DEFAULT)

AIP-PDV_82.docx

Version: 1.0.23049

Page 23 of 28

Collection / Visualization Functions for Process Data

Section / Entry

Comment

AttachedApplication=First

Displaying  documents  of  OP  info: With  this  configuration,
the  system  first  checks  whether  or  not  an  application  is
linked  in  Windows  that  matches  the  file  extension  of  the
document.  This  application  is  then  used  to  display  the
document.
If no link is available, the viewers configured in ctaip.ini (
[ext.  software])  and  internal  viewers  are  used.  If  an
extension  is  completely  unknown,  the  system  tries  to
display the document as text .
Different settings are possible:

First  search for linked application first

AfterUserViewer    If  a  UserViewer  is  configured,  this
one  overrides  the  linked  application  (also  applies  to
ExcelViewer, WordViewer and PowerpointViewer)

Last  Only if no ctaip.ini assignment is found for the file
extension,
linked
application (default).

the  system  searches

for  a

then

HTTPBrowser=standard

Off    The  system  does  not  search
application.

for  a

linked

Display of documents (via OP info):
If documents are configured with a path of schema "http",
the  file  is  not  downloaded  to  the  terminal,  but  the  link  is
transferred to a browser.
The  default  browser  for  the  terminal  is  htmview3.exe,  as
this one can be operated by touchscreen.
If  this  entry  is  set,  the  default  browser  configured  in
Windows is used.

SupressErrorMessage=70012

Suppress message "material is not planned"

MSS_DIALOG=10

MSS_FILEAGE_MIN=5
MSS_FILEAGE_OVERTIME=delete

[SignatureRecording->User 0]

ManualBadgeInput=true

If  the  terminal  is  switched  off  longer  than  15  minutes,  a
dialog is displayed on terminal restart. The user must then
decide  whether  the  counter  pulses,  which  were  recorded
when  the  terminal  was  closed,  are  posted  or  discarded.
After  a  configurable  period  of  time,  the  dialog  closes
automatically with "Yes" (Yes, posting of pulses).
This  value  configures  the  time  in  seconds  the  dialog  is
open.

If the backup file for counter pulses on the terminal is older
than 5 minutes, then no dialog is opened and the backup
file  deleted.  Quantities  recorded  at  the  time  when  the
terminal was closed are not used/posted.

This  configuration  specifies  whether  or  not  the  field  User
can be edited on the terminal (by default: no editing)
true    activates  keyboard  input  for  field  User  on  the
terminal

AIP-PDV_82.docx

Version: 1.0.23049

Page 24 of 28

Collection / Visualization Functions for Process Data

Section / Entry

Comment

Transparency=255

ShowPosition=TR

USE_SERVICE_ACCOUNT=1

SIGNATURE_1_USER_TYPE=REPORTING_U
SER_READONLY

the  signature  dialog  can  also  be

The  display  of
transparent.
255    Signature  dialog  is  0  %  transparent  (not
transparent)
1    Signature  dialog  is  99%  transparent  (maximum
transparency)
(Default = 155)

Top – Left
Top – Middle
Top – Right
Middle – Left

You can change the place of the signature dialog:
TL
TM
TR
ML
MM  Middle – Middle (Default)
MR
BL
BM
BR

Middle – Right
Bottom – Left
Bottom – Middle
Bottom – Right

0  (default)  SSO:  ServiceAccount
is  not  used
(requirement: the terminal must be started with the domain
"user" (SSO)).
Note: ServiceAccount=1 can only be used if all users are
in the "root" domain. SubDomain users are not supported.

REPORTING_USER_READONLY

identification  using

the  Windows  user

The  user
is
activated.  The  Windows  user  is  then  preassigned  in  field
User. The User field is read-only.
Requirement:  The  "SSO"  option  must  be  enabled  for  all
reporting  users.  Otherwise,  successful  authentication  is
not possible.

REPORTING_USER_CHANGEABLE

identification  using

the  Windows  user

The  user
is
activated.  The  Windows  user  is  then  preassigned  in  field
User. The User field can be edited.
Requirement:  The  "SSO"  option  must  be  enabled  for  all
reporting  users.  Otherwise,  successful  authentication  is
not possible.

AIP-PDV_82.docx

Version: 1.0.23049

Page 25 of 28

Collection / Visualization Functions for Process Data

Section / Entry

Comment

SIGNATURE_1_LOGON_TYPE=HYDRA

“” / Not set / “EMPTY”

There is also an alternative login procedure.

HYDRA

The user identification using the Windows user is locked.
You must enter a user for identification.
Requirement: All reporting persons must have been
created as users and the option "SSO" must not be
enabled for the users. Otherwise, successful
authentication is not possible.

ACTIVEDIRECTORY

The TAB for the user identification via User is locked. The
Windows user must be used for identification purposes.
Requirement: The "SSO" option must be enabled for all
reporting users. Otherwise, successful authentication is
not possible.

MIXED_BUT_UNIQUE
The  setting  of  option  "SSO"  specifies  whether  the  user
login or the Windows login is used.

"SSO" enabled  Windows only
"SSO" disabled  user only

Identical  to  SIGNATURE_1_LOGON_TYPE  (see
above)

Used  for  signatures  on  the  terminal  with  quality  data
collection.

Configuration of the files that are provided from the AIP to
the  MDEB2  blade  in  ANSI  format  when  a  combined
operation is available.

The following lists are transferred by default if the entry is
not available.
counters.lst|schicht.lst|mnr.lst|mstat.lst|
anr.lst|pnr.lst

If  you  want  to  transfer  further  lists,  you  must  specify  the
standard lists and the additional lists.

SIGNATURE_2_LOGON_TYPE=HYDRA

ExtendedSignatureRecording=true

[MDE/Blade Configuration 0]

CONVERT-TO-ANSI-
FILE=<list1|list2>

5.1  Layout configuration

Entry

Comment

Section
and/or

[terminal configuration 0]
[terminal configuration 2XXX];

( general configuration )
( 2XXX terminal-specific configuration )

AUTO-CONFIRM-UHR-ERROR-
MESSAGE=TRUE

This setting specifies that in case of an error that occurred
reading  the  clock  (e.g.  when  activated  after  standby

AIP-PDV_82.docx

Version: 1.0.23049

Page 26 of 28

Collection / Visualization Functions for Process Data

Entry

Comment

mode), the time is transferred  without confirmation  dialog
and the terminal time is later synchronized with the server
time via PDM command.

SUPPRESS-MAXIMUM-NUMBER-OF-
MACHINES-WARNING=ON

CalcTargetYieldSinceLogon=2

Suppresses  the  warning  after  restart  of  terminal  if  more
than  32  machines  are  assigned
terminal
(static/dynamic). (Default=OFF)
CalcTargetYieldSinceLogon=1
The  duration  is  calculated  from  the  total  runtime  since
login (all statuses) minus the configured shift breaks.

the

to

CalcTargetYieldSinceLogon=2
The duration is calculated from the total runtime since
login (all statuses). Defined breaks are not used and are
not deducted. (default value)

Section
[ QRD-PRINTER->TICKET 0 ]
[ QRD-PRINTER->TICKET 2xxx ]

;( general configuration )

;( 2XXX configuration for a specific terminal )

COMPLETE-ABSENCE-OF-LOCAL-MNR-
DATA-FOR-EVENT=< Events >

COMPLETE-ABSENCE-OF-LOCAL-ANR-
DATA-FOR-EVENT=< Events >

COMPLETE-..-EVENT=< Events >
COMPLETE-..-EVENT=#ALL#

COMPLETE-..-EVENT=A_AN|A_P_AN

Reloads the machine row for the configured <Events>, if
it is not available locally
  This  configuration  might  be  required  for  a  group
workplace without machine assignment.

Reloads the order row for the configured <Events>, if it
is not available locally
  This  option  has  been  implemented  to  access  order
data in the master data, e.g. when logging on orders.

Explanation on the configuration of <Events>
  Using  <#ALL#>  the  row  (ANR/MNR)  that  is  not
available is reloaded for any event.
   <A_AN|A_P_AN>  restricts  reloading  of  information  to
specified events. The ID <DLGFAM> is preferred to the ID
<DLG> in order to identify the <Event>.

Section
[AIP2 Initialization 0]

XML-GUI=OFF

CTWIN-STYLE=ON

CTWIN-BUTTON-LAYOUT=ON

AUTOMATIC-CHANGE-TO-START-
DISPLAY=30

Disables  the  new  AIP2  design  and  uses  the  AIP  8.1
design.

Activates  the  GUI  that  is  similar  to  CTWIN  on  the  AIP2.
The two button bars are shown below the two lists just like
on the AIP 8.1.

If  the  option  CTWIN-STYLE=ON  is  additionally  set,  the
two button bars are displayed at the bottom of the screen.

to

the  main  view  after

As  of  AIP  8.2.2.28:  If  this  option  is  set,  the  display
automatically  changes
the
configured  time  if  no  other  interaction  was  performed  in
the meantime.
The  changing  display  is  configured  via  the  option  Show
machine/OP
tab  MF
functions.

the  Terminal  configuration,

in

  List:

o  Change  from  the  detail  views  or  function  menus

(operation, person, resource, etc.)

AIP-PDV_82.docx

Version: 1.0.23049

Page 27 of 28

Collection / Visualization Functions for Process Data

Entry

Comment



o  Change to the main view with "tiles"
Icons:
o  Change from the detail views or function menus or

from the main view with tiles

o  Change to the icon view of workplaces

The  configuration  is  specified  in  seconds.  Do  not  specify
less than 10 seconds.
An automatic change to the start screen is not made if an
input dialog is open.

AIP-PDV_82.docx

Version: 1.0.23049

Page 28 of 28

