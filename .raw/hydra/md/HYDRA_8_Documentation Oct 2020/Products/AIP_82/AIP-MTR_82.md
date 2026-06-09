Manual

Collection / Information
Functions for Material, ERP
Batches, MES Batches
AIP-MTR 8.2

Version 1.0.23049

Last changed on: 01.09.2020

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

AIP-MTR_82.docx

Page 2 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

The information contained in this documentation is subject to change without prior notice.

AIP-MTR_82.docx

Page 3 of 76

01.09.20

ERP Batches, MES Batches

Contents

Collection  /  Information  Functions  for  Material,

1  Overview of Collection / Information Functions for Material and

Batches ............................................................................................ 6

2  AIP2 Operation ................................................................................. 8

2.1  Special Control and Display Elements on the AIP2 ............................... 8

2.2  General description of the posting process on the AIP2 ...................... 11

3  Main View with Tiles ....................................................................... 15

3.1  Main view – header and footer ............................................................ 15

3.2  Main view with "tiles" ........................................................................... 16

3.3

Icon view of workplaces ...................................................................... 23

4  Basic Screen as List View .............................................................. 25

4.1  Basic screens – header and footer ...................................................... 25

4.2  Basic screen “tabular view“ ................................................................. 27

4.3  Basic screen "machine overview" ........................................................ 30

4.4

“Machines as icons” basic display ....................................................... 33

5  Batch-related Entry Function .......................................................... 34

5.1  Basic screen........................................................................................ 34

5.2  Order postings for operations subject to batch management ............... 34

5.3  Batch-related postings ......................................................................... 37

5.4  Run-through batch mode ..................................................................... 45

5.5  Manual report batch quantity in the MPL environment ......................... 45

5.6  Display produced output batches ........................................................ 46

5.7  Batch information ................................................................................ 48

5.8  Display of consumption balance .......................................................... 48

5.9  Advance logon of input batches........................................................... 49

General / usage .................................................................................... 49

Configuration ........................................................................................ 50

Procedure ............................................................................................ 50

Usage at AIP ........................................................................................ 50

AIP-MTR_82.docx

Page 4 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

5.10  Collection of serial numbers ................................................................ 52

5.10.1  Entry of serial numbers for OPs that are not subject to

management in batches (dialog A_SNR/ "E") .......................... 52

5.10.2  Entry of serial numbers for OPs that are subject to management

in batches (dialog A_SNR) ...................................................... 55

6  Barcode Input with Prefix ............................................................... 59

6.1  Configuration of customized barcode prefixes ..................................... 63

7  AIP2 -Local Configuration .............................................................. 65

7.1

Local Configuration ctaip.ini ................................................................ 65

7.2  PNG – Files / Bitmaps ......................................................................... 69

7.2.1  File pict.zip .............................................................................. 69

7.2.2  File pict_cust.zip ...................................................................... 69

7.3  Multilingualism (*.mld files) .................................................................. 70

8  AIP2 - Central Configuration File hytnrcfg.ini ................................. 71

8.1

Layout configuration ............................................................................ 74

AIP-MTR_82.docx

Page 5 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

1  Overview of Collection / Information Functions for Material

and Batches

Purpose

The AIP features contained in this function package make it possible to enter batch related data directly

in production using shop floor terminals or data entry PCs.

Integration

Data entered using AIP can be displayed in various applications or evaluated in MOC. The entered data

can be uploaded via relevant interfaces.

Features

Order-related data entry and posting functions

  Batches can be entered in parallel to operation postings

  Entry and validation check of input and output batch change while the operation is running

  Entry of goods receipt batches and automatic generation of goods receipts/ goods issues

  Batch numbers can be entered at the same time that operations are logged on (configurable per

operation and workplace)

  A ticket/ label is automatically printed in HYDRA standard format using the assigned printer when a

new batch is generated

  A validation check as to whether documentation is required is run for batches when the operation is

logged on

  Entry of batch changes during order processing

  Entry of batch numbers via keyboard and/ or barcode.

  Batch-related quantity and time input

Functions for entering/ generating and displaying series and serial numbers:

  Predefined series or serial numbers are transferred via the HYDRA

  ERP interface in HYDRA standard format

  Serial numbers are entered or generated via a user-friendly posting function at the BDE terminal

  Possibility to assign components that can also be identified by serial numbers

  Classification into yield/ scrap quantities with reasons

  Automatically generate goods receipts/ goods issues

  Optional verification of serial numbers that were already defined to the order

AIP-MTR_82.docx

Page 6 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

  Entry of order-related series and serial numbers to identify the processed parts

  Validation check for already posted series or serial numbers

  Display  available  and  already  used  series  or  serial  numbers  at  workplace  PCs  (MES  Operation

Center)

  Upload of the posted series and serial numbers via the HYDRA ERP interface in HYDRA standard

format

Additional licenses may be needed in order to use the functions listed above. Adding and coordinating

the specific requirements and implementing them are considered a customized HYDRA service.

AIP-MTR_82.docx

Page 7 of 76

01.09.20

ERP Batches, MES Batches

2  AIP2 Operation

Collection  /  Information  Functions  for  Material,

2.1  Special Control and Display Elements on the AIP2

Tables

Uniform selection lists are used in AIP 8.2 posting dialogs:

  If  information  is  available  for  more  than  one  page,  the  page  numbers  are

displayed below the table. The current page is highlighted in bold letters. If the user clicks/touches a

page, the display directly changes to this page.

If more pages are available than the page numbers displayed, the following buttons can be displayed

on the left or right hand side depending on the context (available as of SP10/2016):









 : If you click this button, the system jumps to the first page of the next page navigation.

This means: If Page 1 ... Page 9 were displayed for the page navigation, the system jumps to

Page 10.

 : If you click this button, the system jumps  to the first page of the next page navigation.

This means: If Page 10 ... Page 18 were displayed for the page navigation, the system jumps

to Page 9.

 : If you click this button, the system directly jumps to Page 1.

 : If you click this button, the system directly jumps to the last page.

You can select an operation using the mouse, touch screen, keyboard (arrow keys:'' or ''), scanner

or by entering it manually.

AIP-MTR_82.docx

Page 8 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

The  content  of  tables  or  lists  depends  on  the  respective  context.  Example:  When  you  log  on  an

operation,  those  operations  are  available  that  are  included  in  the  sequencing  list  or  planned  for  the

respective workplace or group. When you interrupt an operation, only running operations are available

for selection.

 Scrolling page by page (up or down) in the table.

 Scrolling to the left or right. Only those buttons are activated that make sense for the current

situation (context sensitive). This figure shows that scrolling to the left has been deactivated.

Optionally  you can display a “table filter” (customization). This  is an  automatic filter that, once  it has

been entered, directly affects the table without having to update it. This process is realized through full-

text search for (defined) columns. The search is case-insensitive.

Virtual keyboard

Using the virtual keyboard, you can enter data manually via touch screen or a connected mouse. The

virtual keyboard is displayed automatically as soon as the focus is on an input field. The keyboard layout,

which  is  installed  and  activated  in  the Windows  language  settings,  specifies  the  layout  of  the  virtual

keyboard.

 Moving the virtual keyboard

AIP-MTR_82.docx

Page 9 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

 Hiding the keyboard for 10 seconds

 Switching between the alphanumeric and numeric keyboard

 Selecting the keyboard layout (language)

 Changing the scaling/size of the keyboard

To move  the  keyboard,  you  must  configure  the  driver  accordingly  (configuration  in  the  control

panel of the terminal/PC)!

If you do not want to display the virtual keyboard in general, you must enter the parameter –t in the entry

parameters= of the configuration file ctaip.ini.

Date display

AIP  supports  a  country-specific  date  format  in  dynamic  dialogs.  The  option  "short  date"  has  to  be

selected in the "regional settings" of the Windows "control panel" of the terminal/PC. Please note:

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

MM/DD/YYYY
MM-DD-YYYY
YYYY-MM-DD
YYYY/MM/DD

AIP-MTR_82.docx

Page 10 of 76

01.09.20

Collection  /  Information  Functions  for  Material,

ERP Batches, MES Batches

  Customer-specific 3

MM/YYYY/DD

Note

If the date format used is other than the permitted formats, a note appears when the program is started

and the date format is set to MM/DD/YYYY.

In the status bar, the year format is shortened and displayed only with two characters.

2.2  General description of the posting process on the AIP2

Many AIP posting dialogs are divided into several views (sub-dialogs). These views (sub-dialogs) cover

the entire screen so that only one dialog is visible at a time. In a “workflow concept” the user is navigated

through the posting dialog step by step. In the following, this process is described using the example

Interrupt operation. Other posting dialogs are operated in the same way.

The action Interrupt operation is performed. To start this action, you click the button Interrupt when you

have selected an operation:

The dialog Interrupt operation opens and the first view (sub-dialog) is displayed. The header displays

the function that is currently being executed (here: Interrupt operation).

1st view (sub-dialog)
The views are run through one after the other

Posting that is currently being performed

AIP-MTR_82.docx

Page 11 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

Quantities already
recorded (yield,
scrap)

General OP data

Active input field

Virtual keyboard

In the first dialog Enter quantities, the user can enter the produced yield or scrap quantities. Subject to

the active input field, the virtual keyboard is shown or hidden automatically.

Quantities can be entered using the virtual or real keyboard. The user can go to the next field using the

tabulator key (which can also be found on the virtual keyboard). When the user has entered all values

in the first view, the next view (sub-dialog) can be opened by clicking Next.

The Cancel button is displayed in all sub-dialogs. Click this button to cancel/close the entire process at

any time.

To  open  the  next  view  (Select  status  in  the  example),  click  the  Next  button  or  another  tab  (in  our

example:  Select  status  or  Confirmation).  Please  note  in  this  context,  that  no  view  can  be  skipped

when they are navigated upwards (view 1  view 2  view 3). This means: When you are in the first

view (enter quantities) and you click the third view (confirmation), the second view (select status) will be

displayed first.

Vice versa, when navigating downwards (e.g. from the confirm view to the enter quantities view), each

view can directly be opened by clicking the required tab. In this case, views can actually be skipped.

Using the Back button, views are opened one after the other (upwards).

AIP-MTR_82.docx

Page 12 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

As long as the dialog has not been confirmed, the data entered can be changed at any time by scrolling

back and forth.

Filter field for the list

Status list

In the second view Select status, you select the workplace status that is set, when the operation has

been interrupted. You can select the status from the status list displayed. This list can be restricted using

the Filter field. Once the required values have been entered, the next view/sub-dialog can be opened

by clicking Next (in our example it is the last view).

AIP-MTR_82.docx

Page 13 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

Workplace data

Quantities posted for the OP

Input field for the badge number

The sub-dialog Confirmation shows a summary of all values entered in the dialog. If the user agrees

with the entered data, the Interrupt operation dialog can be confirmed, once the badge number has

been entered. Then the dialog is sent to the server and posted.

If  an  input  field  of  the  dialog  is  not  completed  properly  (e.g.  a  mandatory  field  is  empty),  the  field  is

highlighted in red in the respective view and gets the focus. The user can then directly correct the value.

If a workflow dialog is opened, you can click the ESC key to directly exit the dialog. This exit is

also possible, if the virtual keyboard is displayed. As a consequence, you cannot use the ESC

key to close the virtual keyboard.

AIP-MTR_82.docx

Page 14 of 76

01.09.20

ERP Batches, MES Batches

3  Main View with Tiles

Collection  /  Information  Functions  for  Material,

With the AIP2, the user can switch between the tile design optimized for touchscreens and the list format.

By default, the tile layout is shown, which is described in the sections that follow.

To  ensure  proper  processing  and  posting,  terminals  with  "MDE"  operation  mode  must  not  be

switched off during times without shift.

3.1  Main view – header and footer

Header

The AIP logo is displayed on the top left of the screen, which may be replaced with a customer logo

after configuration.

Possible messages are displayed to the right of it (e.g. if a dialog is opened for more than five minutes).

A  separate  window  opens  to  display  error  messages  that  occur  during  data  collection  (e.g.  validity

checks).

Main views

You  can  assign  a  maximum  of  16  workplaces  or  machines  to  the  AIP2  terminal.  The  different

workplaces are listed in the order that they were assigned to the terminal on the client. .

In  the  main  view  of  the  AIP2,  you  can  use  the  button  "<  Overview“  to  switch  to  the  icon  view  of

workplaces. In the terminal configuration of the client you can specify whether you want to use the icon

view. The sections that follow describe the main view and the icon view.

Footer

The MPDV logo can be found at the bottom left of the AIP2 terminal. Double clicking the logo opens the

info dialog where you can start further administration functions. This dialog closes automatically after

approx. 5 seconds.

In the middle, further information is displayed: the current terminal status, AIP2 version number, date of

the build, IP address of the server and the terminal number.

AIP-MTR_82.docx

Page 15 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

The current date and time are displayed to the right.

AIP2 statuses

Network connection has been established.
The terminal is ONLINE. Server communication is
enabled. All saved data records have been transferred.

The terminal is sending data to the server.

No network connection or no connection to the server.
The terminal is OFFLINE. Server communication is
interrupted. Online functions, such as the display of
information, are disabled. But you can still record certain
postings. These postings are transferred to the server,
once data connection has been re-established.

Data is being received.
The terminal reads files from the server or writes data to
the server.

The terminal is sending saved data records to the server.

DEMO mode
The terminal is in DEMO mode, i.e. server communication
is disabled.

3.2  Main view with "tiles"

List of workplaces

Workplace tiles

Operation tiles

Staff tiles/
Resource tiles/
Material tiles

Please note: The actual display can be different to the above illustration.

AIP-MTR_82.docx

Page 16 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

Subject to the configurations made, the main view with tiles consists of two or three rows of tiles. While

the first two rows of tiles (workplace and operation tiles) are always displayed, it is up to the user whether

or  not  the  third  row  of  tiles  is  shown  (optional  display).  In  the  configuration  of  workplaces  you  can

configure for each workplace separately if you want to show the third row of tiles.

Additionally, there is the list of workplaces to the left. Here,  you can select the  workplaces for which

details are displayed on the right-hand side.

List of workplaces

The  workplace  list  shows  all  workplaces/machines  assigned  to  the  terminal.  If  many  workplaces  are

assigned, swipe to get to the workplaces displayed further down.

This information is shown for the workplaces:

Machine/workplace number

Shows the machine and/or workplace number.

Status

The status is displayed for each machine in color on the left-hand side and also the status text is colored.

Coloring is as follows:

- green:

- yellow:

- red:

production

assigned status

not assigned

If the production lock is enabled, an exclamation mark is displayed in the same color as the status.

Quantities

On the right-hand side, the first figure shows the produced yield in green and the red figure shows the

produced scrap.

If you have enabled the Compensate manual quantities option (e.g. set off scrap against yield)

and the machine list also shows shift-related quantities, they will not be updated immediately. The

application only updates the quantities, once the lists have been reloaded.

Unit for yield and scrap

If  no  operation  is  logged  on,  the  primary  quantity  unit  from  the  workplace/machine  configuration  is

displayed  as  unit  for  yield  and  scrap.  If  an  operation  is  logged  on,  the  primary  quantity  unit  of  the

operation is displayed.

AIP-MTR_82.docx

Page 17 of 76

01.09.20

Collection  /  Information  Functions  for  Material,

ERP Batches, MES Batches

Workplace tiles

The workplace tiles provide the following details:

Workplace/machine

No workplace or machine number is displayed.

Short name / group

The short name of the workplace or machine and the machine group are displayed.

Status

The  status  is  displayed  in  color  and  as  status  text  on  the  left-hand  side.  Coloring  is  as  follows:

- green:

- yellow:

- red:

production

assigned status

not assigned

If the production lock is enabled, an exclamation mark is displayed in the same color as the status.

Machine image

Shows the picture of the machine stored in the configuration of workplaces.

Clocks

Shows the recorded machine cycles of the current shift.

Start / Duration [hrs:min]

Point in time since the status has been available and the resulting duration at the current point in time.

With BDE workplaces1, this point in time refers to the last manual status change. With MDE workplaces,

it refers to the time when the last status change was identified (for machine connections). It also refers

to the point in time when the status was last changed manually or to the time of the last shift change.

Target/actual cycle

Current target and actual cycle of the workplace.

The largest target cycle of all operations logged on to the workplace is shown. The largest target cycle

is transferred to the MDE for monitoring.

If the target cycle is smaller than the minimum cycle time, the target cycle is still shown.

1    An  MDE  workplace  is  a  workplace  that  is  assigned  to  a  terminal,  which  runs  in  the  “MDE”  operation  mode.

Otherwise, it is a BDE workplace.

AIP-MTR_82.docx

Page 18 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

If  an  operation  is  logged  off  or  interrupted,  the  largest  target  cycle  of  the  remaining  operations  is

identified and displayed. After logoff or interruption of the last operation at the workplace, the last target

cycle set is still displayed.

If no operation is logged on, the target cycle specified in the machine list is displayed. Thus, even after

a restart, the terminal can get the target cycle that last applied.

Yield / Scrap

Yield and scrap quantities of the current shift produced at the machine/workplace.

KPIs: OEE, utilization efficiency, scrap ratio

This function is only available if you enable the extension aipkpi.

Shows the KPIs OEE, utilization efficiency and scrap ratio. The application calculates the KPIs at cyclic

intervals (scheduler job "MDE keyfigure calculation“). The KPIs always refer to the current shift. The

application calculates the KPIs based on the formulas that are also used for the OEE report and/or the

efficiency report on the MOC. The application shows the KPIs with two decimal places. To the right of

the KPI, the AIP2 GUI highlights in color if limit values are exceeded or not reached. If you have not

defined  limit  values,  the  application  shows  the  KPI  in  gray,  otherwise  in  the  color  you  defined  for

exceeding/not reaching limit values. For further information on the configuration, refer to the document

MDE_KPI_Configuration.pdf.

The AIP calculates and updates data at cyclic intervals. This may result in deviations between

the collected values and the displayed KPIs.

Linked functions

If you click the workplace status, the dialog for changing the status opens. If you click one of the other

tiles, the dialog opens where you can start the functions available for the selected workplace.

The buttons displayed depend on the selected workplace. The button Lock production status, for

example, is only available for MDE machines.

AIP-MTR_82.docx

Page 19 of 76

01.09.20

ERP Batches, MES Batches

List of operations logged on

Collection  /  Information  Functions  for  Material,

The middle area on the right-hand side shows the logged on operations as tiles. The following data is

shown:

MES order number

Order number and operation number of the operation logged on. The combination of these two numbers

is the MES order number.

Article

Article defined for the operation.

Quantities (target / yield / scrap)

Shows the target quantity defined for the operation,  the produced  yield and the scrap. The yield and

scrap quantities integrate the counter readings of the available machine connections.

This icon is displayed if at least one note has been recorded for this operation in the graphic planning

board of the client that must be shown on the terminal. To display the note(s), click the icon or click the

operation and select the Information button (

).

This icon is displayed if at least one long text is stored for this operation. Click this icon to display the

long texts or click the operation and select the button Information (

).

If you click an operation, a screen opens that shows the workplace/operation data. Via this screen, you

can also select the operation-related functions.

Operation tiles

In addition to the fields already described, the operation tiles also show the following data:

Comments

This tile shows the user fields 53 and 54 (alphanumeric, 20 characters) of the operation. To edit these

fields, you must store a respective user field key for the operation, which includes these two fields.

AIP-MTR_82.docx

Page 20 of 76

01.09.20

ERP Batches, MES Batches

Completion in %

Collection  /  Information  Functions  for  Material,

The bar shows the proportion of “yield”, which has been produced until now, compared to the “target

quantity”.

Since logon (target / yield / deviation)

The production quantity to be expected since the OP has been logged on (depending on the cycle time,

partitioning and the time when no production lock has been set for the machine). If the terminal program

has been restarted after the OP logon, no value can be calculated.

Calculation:

Target Since Logon = Net Running Time[sec] * Partitioning/Target Cycle[sec/stroke]

Net Running Time: Time since logon while the production lock has not been set. This calculation does

not  integrate  the breaks specified  in the shift model  or the status times posted to RPA 12 (resource

performance account).

Deviation (in percent) between the calculated target  quantity since logon  and the quantity  which has

actually been produced “since logon”.

Calculation: Deviation[%] = 100% * (Yield Since Logon - Target Quantity Since Logon) / Target Quantity

Since Logon.

As of CTAIP 8.2.1.32:

Up  to  now,  the  target  quantity  since  OP  logon  was  only  calculated  if  the  workplace/machine  was

assigned to a terminal with operation mode "MDE processing". As of CTAIP 8.2.1.32, the target quantity

since OP logon is also calculated if the terminal is configured with operation mode "BDE processing".

If  the  terminal  has  been  restarted  after  an  operation  logon,  the  target  quantity  cannot  be  calculated

correctly. To improve transparency, an "*" (asterisk) is shown behind the target quantity (since OP logon)

in this case. The asterisk indicates that the target quantity now displayed no longer refers to the time of

the operation logon, but to the time of the terminal restart.

While the workplace/machine status 999 is displayed, the target quantity since OP logon is "---". If the

status 999 is again changed within a "free shift", the target quantity since OP logon is calculated using

the point in time of the OP logon, of the shift start or of the terminal start.

To  disable  the  calculation  of  the  target  quantity  since  OP  logon  on  the  terminal,  you  can  use  the

configuration CalcTargetYieldSinceLogon=0 in the hytnrcfg.ini. The quantity is then displayed using "---

".

AIP-MTR_82.docx

Page 21 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

With  workplaces/machines  that  are  configured  as  "Machining  centers",  the  calculation  of  the

target  quantity  since  OP  logon  is  generally  disabled  because  this  calculation  contradicts  the

principles of the machining center.

Planned duration

The field Planned duration displays the target processing time of the operation in format [h:mm].

Partitioning

Calculate the displayed partitioning as follows:

TLGM
DIVM
TLGAG

Partitioning of the workplace/machine (TLG in mnr.lst)
Pulse factor of workplace/machine (IMPFAKT in mnr.lst)
Partitioning of the operation (TLG in anr.lst)

The application shows the calculated partitioning without decimal places, provided it is an integer value.

In case the partitioning or pulse factor of a machine or an order is 0, calculation is based on the value

1.

Displaying the "3rd list"

The third list is optional. You can configure the third list in the configuration of workplaces. The following

lists can be displayed:

  List of staff logged on to the currently selected workplace (BDE)

  List of resources logged on to the currently selected workplace (WRM)

  List of materials/input batches (MPL/TRT) logged on to the currently selected workplace

  List of output batches produced in the currently selected operation (MPL/TRT)

In case  you have enabled  several lists,  you can switch between these  lists in the header line that  is

located above the third list. Activated lists can be selected one after the other.

Maintenance status

If you have purchased the license for the maintenance calendar, the maintenance status is displayed

using  a  yellow  or  a  red  field  showing  a  wrench.  The  color  displayed  depends  on  the  required

maintenance activity.

AIP-MTR_82.docx

Page 22 of 76

01.09.20

ERP Batches, MES Batches

Calling functions

Collection  /  Information  Functions  for  Material,

The functions available are assigned to the relevant objects. Example: The functions Log person off and

Log all staff off are displayed if you click on a person logged on.

3.3

Icon view of workplaces

You can enable this view in the configuration of terminals via the client. Then open this view by clicking

the button "< Overview“ in the main view. This view shows workplaces in a clear structure and with an

image. It shows important information on the single workstations:

Please note: The actual display can be different to the above illustration.

A colored bar to the left of the image indicates the current status of workplaces/machines:

- green:

production

- yellow:

assigned status

- red:

not assigned

Each tile includes the workplace/machine number, the status (text) of the workplace, the yield and scrap

quantity and the image of the workplace.

A colored background with a caliper and/or wrench to the right of the image indicates if an inspection or

maintenance is due for the workstation.

AIP-MTR_82.docx

Page 23 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

If you enable the extension aipkpi, the application also shows the KPIs OEE, utilization efficiency

and scrap ratio.

The application calculates the KPIs at cyclic intervals (scheduler job "MDE keyfigure calculation“). The

KPIs always refer to the current shift. The application calculates the KPIs based on the formulas that

are also used for the OEE report and/or the efficiency report on the MOC. The application shows the

KPIs with two decimal places. To the right of the KPI, the AIP2 GUI highlights in color if limit values are

exceeded or not reached.

The AIP calculates and updates data at cyclic intervals. This may result in deviations between

the collected values and the displayed KPIs.

If you click on a tile, the previously described main view is displayed and the workplace is automatically

selected. From there, you can perform the postings for the selected workplace.

Use the option "< Overview" to exit the main view and to return to the icon view.

As part of the advanced configuration options, you can customize the layout of display lists, the

displayed data fields and functions. For technical reasons, however, you cannot change the sort

sequence of display lists in the main view of the terminal.

As  of  AIP  8.2.2.28,  you  can  automatically  change  from  the  main  view  with  tiles  to  the  icon  view  of

workplaces after a configured time. The configuration  AUTOMATIC-CHANGE-TO-START-DISPLAY is

described in the document AIP2_Configuration_hytnrcfg.pdf.

AIP-MTR_82.docx

Page 24 of 76

01.09.20

ERP Batches, MES Batches

4  Basic Screen as List View

Collection  /  Information  Functions  for  Material,

The new tile design can be disabled for the AIP2 terminal. This chapter describes the basic screen with

disabled tiles.

In general, the AIP2 has been designed for entries to be made via touch screen. The corresponding

functions can be started, selected or executed by  touching the buttons or using  the displayed virtual

keyboard.  Selection  lists  are  provided  in  many  cases,  as  an  alternative  to  manual  entries.  Required

entries can easily be selected from these lists.

Barcodes can be imported/entered in the current dialog using barcode readers, handheld scanners, or

swipe  card  readers.  Subject  to  the  barcode  prefix,  certain  data  (e.g.  operation  data)  can  directly  be

assigned to the corresponding input field, without having to focus this input field explicitly.

It goes without saying that mouse and keyboard may also be used.

To  ensure  proper  processing  and  posting,  terminals  with  "MDE"  operation  mode  must  not  be

switched off during times without shift.

4.1  Basic screens – header and footer

Header

The  AIP  logo  is  displayed  top  left  of  the  screen,  which  may  be  replaced  with  a  customer  logo  after

corresponding configuration.

Possible messages are displayed to the right of it (e.g. if a dialog is opened for more than five minutes).

A  separate  window  opens  to  display  error  messages  that  occur  during  data  collection  (e.g.  validity

checks).

Basic screens

A maximum of 16 workplaces or machines can be assigned to the AIP2 terminal. The single workplaces

can be found within the list area in the order assigned to the terminal via the client. .

As regards the basic screen of the AIP2 terminal, the user can choose between a tabular view, field-

related view and an icon view. This can be configured via the configuration of terminals in the client. The

single basic screens are described in the sections that follow.

AIP-MTR_82.docx

Page 25 of 76

01.09.20

ERP Batches, MES Batches

Footer

Collection  /  Information  Functions  for  Material,

The MPDV logo can be found at the bottom left of the AIP2 terminal. Double clicking the logo opens the

info dialog where further administration functions can be started. This dialog closes automatically after

approx. 5 seconds.

Further information is displayed in the center : the current terminal status, AIP2 version number, date of

the build, IP address of the server as well as the terminal number.

The current date and time are displayed to the right.

Terminal status

Network connection has been established
The terminal is ONLINE. Server communication is
enabled. All saved data records have been transferred.

The terminal is sending data to the server.

No network connection or no connection to the server.
The terminal is OFFLINE. Server communication is
interrupted. Online functions, such as the display of
information, are disabled. But certain postings can be
recorded anyway. These postings are transferred to the
server, once data connection has been established.

Data are being received.
The terminal reads files from the server or writes data to
the server.

The terminal is sending stored data records to the server.

DEMO mode
The terminal is in the DEMO mode, i.e. server
communication is disabled.

AIP-MTR_82.docx

Page 26 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

4.2  Basic screen “tabular view“

1st list
Workplaces
assigned to
the terminal

2nd list
List of
registered
operations

3rd list
(optional)
e.g. list of
registered
staff

Subject to the configurations made, the tabular basic screen consists of two or three tables. While the

first two tables are always displayed, it is up to the user whether or not the third table is shown (optional).

“Machines/workplaces" table

The upper table shows the workplaces assigned to the terminal. The following columns are displayed.

Machine/workplace

The machine or workplace number as well as a description are displayed.

Status

The  status  is  highlighted  in  color  and  the  status  text  is  shown.  Coloring  is  as  follows:

- green:

- yellow:

- red:

production

assigned status

not assigned

Status since

Point in time since the status is available.

AIP-MTR_82.docx

Page 27 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

For ADE workplaces2 the point in time refers to the last manual status change. For MDE workplaces it

refers to the time when the last status change was identified (for machine connections). It also refers to

the point in time when the status was changed manually most recently or to the time of the last shift

change.

Please note:

It is indicated here if the “lock production status” function is enabled for the machine/workplace.

Below the first list there is a row including the function buttons mainly relating to machines/workplaces.

These functions are described in more detail in the sections that follow.

By way of “customizing” services it is possible to adapt the layout of the display lists, displayed

data fields, sort sequences, etc. according to the customer’s requirements. For technical reasons,

however, the sort sequence of display lists may not be changed in the basic screen of terminals.

The software does not allow it.

Provided  that  the  "compensate  manual  quantities"  option  (e.g.  set  off  scrap  against  yield)  is

enabled and the machine list also shows shift-related quantities (no default setting), they will not

be updated immediately. Quantities are only updated once the lists have been reloaded.

"Operations at workplace" table

The second table shows the operations currently logged on to the selected workplace. The following

columns are displayed:

Article

Article defined for the operation

Order and operation

Order number and operation number of the registered operation. Together they build the  MES order

number.

Target quantity

Target quantity defined for the operation.

2  We talk of an MDE workplace if this workplace is assigned to a terminal, which runs in the “MDE” operation mode.

In any other case, it is an BDE workplace.

AIP-MTR_82.docx

Page 28 of 76

01.09.20

ERP Batches, MES Batches

Yield

Collection  /  Information  Functions  for  Material,

Yield already produced for this operation. The counters of possible machine connections are considered

as well.

Scrap

Scrap quantity already produced for this operation. The counters of possible machine connections are

taken into account as well.

N

It is indicated here if a note visible on the terminal has been recorded for this operation in the graphic

planning board of the client. The note(s) is/are displayed by clicking the OP info button (

).

T

If a long text is defined for this operation it is indicated here. The long text is displayed using the OP info

dialog (button

).

Below the second list there is a row that mainly includes function buttons relating to operations.

"3rd list" table

The  third  list  is  optional  and  may  be  configured.  Information  displayed  in  this  list  depends  on  the

workplace configuration.

The following lists can be displayed:

  List of staff logged on to the currently selected workplace (BDE)

  List of resources logged on to the currently selected workplace (WRM)

  Materials/input batches logged on to the currently selected workplace (MPL/TRT)

  List of output batches produced in the currently selected operation (MPL/TRT)

The buttons below the third list (to the left) allow switching between these lists.

Please note

The staff logged on displayed in the third list is identical to the list displayed in the dialog “F5 staff logged

on…”. Selecting a person in the third list does not affect the selection of the operation in the list of OPs

running  at  the  workplace.  Therefore,  it  neither  affects  pre-assignment  of  the  operation  in  the

corresponding posting dialogs.

AIP-MTR_82.docx

Page 29 of 76

01.09.20

ERP Batches, MES Batches

Toolbar in the basic screen

Collection  /  Information  Functions  for  Material,

A toolbar, which may be customized, is assigned to each list included the basic screen. This makes the

purpose of a function clear to the user. The “partial upload/confirmation” function can be found below

the list of registered operations.

In fact, the toolbar may include several “tabs”, which can be made visible by scrolling to the right/left at

the right/left end of the toolbar. A posting dialog (e.g. change partitioning) can be opened by clicking the

corresponding button.

Please note

The displayed buttons depend on the context defined by the respectively selected workplace. Thus, the

displayed buttons may vary when selecting another workplace/machine.

4.3  Basic screen "machine overview"

If the “change view” button is clicked in the basic screen, the view changes to the following presentation:

Toolbar of the assigned machines

Machine information

Order information

AIP-MTR_82.docx

Page 30 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

This  presentation  gives  detailed  information  on  a  single  machine,  whereas  the  above  toolbar  still

provides an overview of all assigned machines and workplaces.

The presentation consists of three sections:

Toolbar of the assigned machines

The  color  indicates  the  current  status  of  all  assigned  workplaces.  Coloring  is  as  follows:

- green:

- yellow:

- red:

production

assigned status

not assigned

It is possible to switch between machines by pressing a machine icon (requires a touch screen). Using

the keyboard, the active machine can be selected by the arrow keys. To do this, the toolbar must be

active.

Workplace/machine information

This  display  area  shows  information  relating  to  workplaces/machines  and  shifts  about  the  currently

selected workplace.

Order information

This display area shows information on the registered order/OP. If several orders/OPs are logged on to

the  workplace,  then  extra  arrow  buttons  are  displayed.  It  is  possible  to  switch  between  individual

orders/OPs using these arrow buttons.

Notes on selected fields of the machine overview

Unit for yield and scrap

Provided  that  no  operation  is  logged  on,  the  primary  quantity  unit  from  the  workplace/machine

configuration is displayed as unit for yield and scrap. If an operation is logged on the primary  quantity

unit of the operation is displayed.

Partitioning

The displayed partitioning is calculated as follows:

Partitioning =

𝑇𝐿𝐺𝑀
𝐷𝐼𝑉𝑀

∗   [

𝑇𝐿𝐺𝑂𝑃1
𝐷𝐼𝑉𝑂𝑃1

  +

𝑇𝐿𝐺𝑂𝑃2
𝐷𝐼𝑉𝑂𝑃2

  + ⋯ ]

TLGM
DIVM
TLGOPi

Partitioning of the machine (TLG in mnr.lst)
Pulse factor of the machine (IMPFAKT in mnr.lst)
Partitioning of the individual operation (TLG in anr.lst)

AIP-MTR_82.docx

Page 31 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

The resulting partitioning is displayed without decimal places, provided it is an integer value. Otherwise,

3 decimal places are shown.

In case partitioning or pulse factor of a machine or an order is 0, calculation is based on the value 1.

Having logged off all OPs, the machine continues working with the partitioning of the machine.

Target cycle

The largest target cycle of all operations running  at the machine is  always  displayed in the machine

overview of the terminal. If this OP is logged off the largest target cycle of the remaining OPs will be

displayed.

In case no OP is logged on, the target cycle from the machine list is displayed. Thus, even after a restart,

the terminal can get the target cycle that applied at last.

The largest target cycle is also transferred to MDE for monitoring.

Comment 1, comment 2

These two fields show the user fields 53 and 54 (alphanumeric with 20 characters) of the operation. To

be able to edit these fields, a corresponding user field key containing these two fields must be defined

for the operation.

Target since logon

The production quantity to be expected since the OP has been logged on (depending on the cycle time,

partitioning and the time while the production status was not locked for the machine). No value can be

calculated, in case the terminal program has been restarted since the OP was logged on.

Calculation:

TargetSinceLogon = NetRunningTime[sec] * Partitioning/TargetCycle[sec/stroke]

NetRunningTime: Time since logon while the production lock has not been set. This calculation does

not take into account any breaks defined in the shift model or status times posted on RPA 12 (resource

performance account).

Deviation [%]

Deviation  (in  percent)  between  the  expected  target  quantity  since  logon  and  the  quantity  which  has

actually been produced “since logon”.

Calculation: Deviation[%] = 100% * (YieldSinceLogon - TargetSinceLogon) / TargetSinceLogon

Completion

The bar represents the proportion of “yield”, which has been produced until now, compared to the “target

quantity”.

AIP-MTR_82.docx

Page 32 of 76

01.09.20

ERP Batches, MES Batches

Machine icon:

Collection  /  Information  Functions  for  Material,

Provided that the WRM-WTK license has been purchased, the machine icon may be  replaced with a

picture  showing  a  yellow  or  red  oilcan.  It  all  depends  on  the  required  maintenance  activity:

4.4

“Machines as icons” basic display

This view can be configured as the default display in the configuration of terminals at the client   It has

the advantage that the user can tell from a distance whether or not all machines are in the “Production”

status.

All MDE machines have their own buttons colored according to the corresponding status:

- green:

- yellow:

- red:

Production

Assigned status

Not assigned

The button includes details on the workplace/machine number, the registered operation, the yield and

scrap quantities as well as the status (text) of the workplace/machine.

If a button is touched , the “machine overview” basic display is shown for this workplace. From there,

postings for the selected workplace can be performed using the standard buttons.

By clicking the “symbol” button (if configured) the view changes from the “machine overview” to the “icon

view of machines”.

AIP-MTR_82.docx

Page 33 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

5  Batch-related Entry Function

5.1  Basic screen

Basic terminal screen when a machine is assigned in batch mode:

The basic display shows the third list "Input materials" for machines for which the “batch management”

option is configured. All active input batches of the selected machine are displayed in this list.

5.2  Order postings for operations subject to batch

management

OP logon with input batches

By clicking the "log OP on" button a workflow including two tabs is opened. The first tab "Select OP" the

OP to be logged is used.

AIP-MTR_82.docx

Page 34 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

The “Log on operation” tab is reached by clicking “Next” where in addition to the selected OP, the defined

material components are displayed in a list.

AIP-MTR_82.docx

Page 35 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

By entering a batch number in the "Input batch" field and clicking the "Report batch" function, a batch

may  be  logged  on  as  input material  for  a  component.  During  the  entry  process,  the  terminal  checks

whether the batch number is known to the system and may be logged on. A detailed description can be

found in the chapter "Change input batch".

"Batch" field

When an OP is logged on, a batch number is created simultaneously for the next output batch to be

produced.  The  batch  number  can  automatically  or  manually  set  (refer  to  "Settings"  in  workplace-

/resource configuration -> Tab MPL).  The batch generated in this way is created with the batch number

in the system and set to "running".

If all required input materials are logged on, the OP may be started via the "OK" button in the "OP logon"

dialog. Whether input material must be logged on or not, can be defined in the assigned material type

of the component.

Once the OP has been logged on successfully, all active input batches of the  selected machine  are

displayed in the material list.

Logoff/interruption of OPs

A running OP may be interrupted or logged off by clicking the "logoff/interrupt OP" button. Then a dialog

opens, where the following selection can be made:

AIP-MTR_82.docx

Page 36 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

Using the button "Log OP off" the system opens a screen to do so which includes the same input field

as the "Output batch change" (see next chapter).

Thus, the output batch currently active is completed, when OPs are interrupted or logged off.

5.3  Batch-related postings

AIP-MTR_82.docx

Page 37 of 76

01.09.20

ERP Batches, MES Batches

Input batch change

Collection  /  Information  Functions  for  Material,

Using the button "Change input batch" a change of input material can be changed during a running OP.

Log off input batch

Input batches may be changed by entering a currently active batch number or by entering a new batch

number. When logging batches off, it is also possible to enter the status and consumption of the batch

to be logged off.

AIP-MTR_82.docx

Page 38 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

Options when logging input batches off:

F1 - PROCESSED

The batch is set to status "Processed" and the remaining quantity is set to 0.  A consumption posting as

goods issued is generated for the remaining quantity.

F2 - BLOCKED

The batch is set to the "blocked" status. A consumption entered additionally is deducted from the current,

remaining quantity as goods issue.

F3 - with remaining quantity

The batch is set to the "free" status. A consumption entered additionally is deducted from the current,

remaining  quantity  as goods issue. If the remaining  quantity that  is still  available becomes <= 0, the

batch status automatically switches to "processed".

Consumption

AIP-MTR_82.docx

Page 39 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

The entered consumption (unit of the input material) is deducted from the remainder of the batch and a

goods movement is generated.

Comment on batch

The comment entered is saved as information for the batch.

Log input batch on

Provided that the batch is known, batch data is displayed in an intermediate dialog where the logon may

be confirmed.

If the batch could be logged on, it is taken over to the material list in "customer batch number" and thus

the change is completed.

However,  in  case  the  logon  is  inadmissible  as  the  input  material  does  not  correspond  to  that  of  the

component, the logon is rejected by the following an error message.

Logon of unplanned input material

In addition to planned materials, it is also possible to log on “unplanned” material for an OP, using an

additional  feature  for  the  OP.  If  the  "replaceable"  option  is  set  to  "J",  the  user  is  able  to  assign  the

respective component manually, when batches are logged on. However, the logon is only allowed if the

material type of the input batch matches that of the component.

AIP-MTR_82.docx

Page 40 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

In  the  selection  list  the  components  are  filtered  by  the  material  number  and  displayed  in  green  for

selection.

Logon of unknown batches

Using the option "Create unknown charges" in the HYDRA basic settings (Tab BDE-> Settings 2) it is

possible to register an input batch still unknown to HYDRA to an OP.

In this case, when input batches are logged on, the system searches for a valid assignment of input

material to the material type of the selected component. If a matching assignment is found and the "allow

entry of unknown input batches" option is configured for the material type in the "input batch processing"

tab, the batch is generated by logging it on to the system. Then it is set to the "running" status. The

batch is initially created in a quantity of 1.000.000.000.

Output batch change

Output material may be changed for a running OP using the "output batch change" option.

The input batches that are logged on are displayed with their available remaining quantity in a list within

the output batch change dialog. The following data may be entered:

Target buffer

Material buffer for which the current batch is to be produced. The output material buffer of the machine

is pre-assigned as default value.

AIP-MTR_82.docx

Page 41 of 76

01.09.20

ERP Batches, MES Batches

Transport unit

Collection  /  Information  Functions  for  Material,

A transport unit defined within the system may be assigned here. The selection refers to transport units

that were assigned to the material type of the OP.

Comment on batch

In this field, a comment may be saved for the produced batch.

Quantity

The batch to be produced is posted with the quantity entered here. The quantity is taken over as primary

quantity of entry to the order and machine and a goods movement is generated as goods receipt.

Quality

A  batch  may  be  classified  as  yield  or  scrap  quantity.  The  system  posts  yield  batches  with  the  "free"

status.  Scrap  batches  automatically  get  the  "blocked"  status.  When  scrap  is  selected,  a  valid  scrap

reason has to be assigned.

"Preceding batches" function key:

This button opens a list with output batches which have already been produced for this OP.

"Change inp. batch" function key:

Using this button the user can switch to the "input batch change" function.

New batch

When a current output batch is completed, a new batch number is simultaneously created for the next

batch. The batch number may be assigned automatically or manually. The batch generated in this way

is created with the batch number in the system and set to "running".

Entry of additional batch attributes

Several additional batch attributes may be recorded for a material type by configuring MPL --> Master

data --> Attributes.

In case attributes are defined to be recorded at the terminal for the material type of the running OP,

another input dialog is opened when the output batch is changed. The screen opens additionally after

clicking OK in the output batch change, interrupt OP and finish OP function.

AIP-MTR_82.docx

Page 42 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

Numeric and alphanumeric values, which are then saved for the produced batch in an additional table,

may be recorded via batch attributes.

Recording Goods Receipt Batch

A new goods receipt batch may be created in the system via the "enter GR batch" button.

Having clicked the "OK" button, the batch is created and the dialog remains open for further entries.

Batch numbers may be generated automatically or manually depending on the configuration. In addition,

the following data is saved at the batch.

Workplace

Machine where the batch was recorded

Operation

Order where the batch was recorded

Material

Material number of the batch

Quantity and unit

AIP-MTR_82.docx

Page 43 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

The batch is created with the quantity and unit entered here. A goods receipt is posted with the quantity.

Quality

A batch may be classified as yield or scrap quantity. The system creates yield batches with the "free"

status. Scrap batches automatically get the "blocked" status and the batch class "scrap". When scrap is

selected,  a  valid  scrap  reason  has  to  be  assigned  additionally  with  respect  to  the  corresponding

workplace.

Target buffer

Material buffer for which the current batch is to be produced. The output material buffer of the machine

is pre-assigned as default value.

Transport unit

A transport unit defined within the system may be assigned here.

Comment on batch

In this field a comment may be saved for the goods receipt batch.

Repost Batch

Using the "repost batch" button, an existing batch may be reposted to another material buffer.

AIP-MTR_82.docx

Page 44 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

Having clicked the "OK" button, the batch is reposted to a new material buffer and the dialog remains

open for further entries.

As an alternative, the batch can also be reposted from yield to scrap.

5.4  Run-through batch mode

A HYDRA machine may also be configured in "run-through batch mode". In run-through batch mode

input material is continued being processed with unchanged number (run-through batch number) via an

OP.

The entry functions for throughput batch processing at the terminal are identical to those for active batch

tracing at the machine.

Please note: At machines with  “throughput  batch mode”, it  is impossible to log  operations on at the

same time.

5.5  Manual report batch quantity in the MPL environment

Using the manual partial upload function of HYDA-ADE (A_TR dialog), it is possible to record a partial

quantity for the current operation and thus to the active output batch.

The  following  performance  as  regards  the  entry  of  quantities  results  from  a  manual  partial

upload/confirmation:

  Scrap is only transferred to the active operation and not to the output batch.

  Yield is booked cumulated onto the current output batch.



In  this  case,  log  records  of  the  record  type  “H“  are  also  generated  when  the  shift  changes,

provided that yield has been recorded before



In case yield has already been recorded as partial quantity for an output batch, it is no longer

possible to log the batch off as scrap when the output batch is changed the next time. In this

case,  the  batch  assigned  to  the  “yield”  class  has  first  to  be  completed,  before  scrap  can  be

posted again.

Effects on available retrograde material components are as follows:

  When a total quantity is recorded, scrap is not deducted in a retrograde manner

AIP-MTR_82.docx

Page 45 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

  When yield/scrap is recorded, it is also withdrawn when it comes to scrap

  Negative values, which might result from offsetting quantities, are not considered

The following notes and restrictions are to be taken into account:

  Personal partial uploads (with P_AB) are not taken into account

  Scrap quantities are only uploaded to a PPS system, provided that the interface is set to “upload

of partial confirmations”

  Now only quantities of the accounts yield and scrap are supported.

  The partial upload  itself does not trigger a goods movement. This is only the case when the

output batch has been completed.

  The checks made with respect to the input quantity and display within the consumption balance

cannot  be  used  together  with  the  "collect  input  quantity  in  relation  to  batches"  configuration

within the material type, as the current output batch is not completed for partial quantities. This

affects also the collection of serial numbers together with batches (MPL-SNR).

5.6  Display produced output batches

It  is  possible  to  display  the  output  batches  produced  for  a  running  operation  that  is  subject  to  batch

management using the 3rd list of the machine master.

A default number of 20 output batches is displayed for each machine in the list. Output batches (yield

and scrap batches) are shown, which have been produced at this terminal since output batches were

changed.

As the terminal only keeps this list locally, it is not synchronized with the server, when AIP is started.

The list includes, among other things, the article, article designation, batch number, date, time, quantity

and  batch  class,  user  fields  as  well  as  alternative  batch  numbers.  Some  of  the  fields  might  not  be

completed depending on the data collection scenario when generating output batches.

List contents can be configured via the [ MNR_AMAT.LST ] section in the ctaiplay.ini file.

Configuration:

AIP-MTR_82.docx

Page 46 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

List contents can be configured via the [ MNR_AMAT.LST ] section in the ctaiplay.ini file.

Example:

CTAIPLAY.INI

[ MNR_AMAT.LST ]
GRID_FONT=Arial
GRID_FONTSIZE=9
GRID_COLOR=clBlack
GRID_BACKGROUND=clWhite
GRID_ORDER=ROW.IDX=-
GRID_CAPTION=Output batches produced

EXAMINE_SCANEXPR1=KLASSE=G
EXAMINE_SCANCOLOR1=clGreen
EXAMINE_SCANEXPR2=KLASSE=A
EXAMINE_SCANCOLOR2=clRed

; ROW.IDX=N10,50,R,Row
CNR=C20,150,L,Losnummer
;CNR=*CNR,Batch
ATK=C25,125,L,Artikel
; ATK=*ATK
; KLASSE=C3,40,Z,*
MENGE=N12.0,70,R,Menge
EINH=C3,30,Z,ME
DAT=dd.mm.yyyy,70,L,Date
ZEI=hh:mm:ss,60,L,Time
ATKBEZ=C30,200,L,Artikelbezeichnung

Display as third list:

Figure: Display of the output batches produced

Using the  caption of the 3. list, the user can switch to the display of the produced output batches.

Server based comparison of produced output batches

From AIP program version V#2.0.54 the system can synchronize the list of the produced output batches

of a machine with the server using a cyclic comparison.

AIP-MTR_82.docx

Page 47 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

The  server-based  comparison  is  activated  [Technical:  PDM  list  13  with  MOD=P]  by  an  entry

Configuration

in

the

customer-specific

configuration

file

„ctlisten.ini“.

The system only carries out comparisons done for output batches collected over the last 3 days in this

terminal.

5.7  Batch information

Information on a batch may be displayed in a dialog via the "batch info" button.

5.8  Display of consumption balance

When logging an OP off, the “consumption balance” (V_BLZ dialog) can be displayed, which can be

configured via the machine and the material type of the operation.

The consumption balance is shown if this option is active at the machine and material type.

The consumption balance shows the material consumption based on batches and the user is able to

log still running batches off.

Configuration:

A special configuration (function = “DLG=V_BLZ;BREAK-ON-CANCEL“) has to be defined for the OK

button of the logoff dialog (e.g. A_AB_MPL) to make sure that the consumption balance is started when

the OP is logged off.

AIP-MTR_82.docx

Page 48 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

Sample configuration of the OK button for starting the consumption balance:

Display of consumption postings

The “show details” function allows for consumption quantities, which have been collected so far, to be

displayed.

Logging input batches off

By way of the “log batch off” function, the user can choose a currently running batch from the list and

log it off by entering a consumption.

5.9  Advance logon of input batches

The AIP supplies the following dialogs of functions to issue an advanced logon:  The function for logging

input batches on in advance is used to set up and log on the next input batch while an OP and input

batch are still running. This next input batch is not yet running but assigns the "logged on in advance"

flag.

An input batch may be logged on in advance for a currently running OP or a prepared OP.

General / usage

The  process  might  require  an  input  batch  to  be  logged  on  in  advance  and  set  up  accordingly  on  a

machine, while the preceding input batch is still being used for a material.

This situation frequently occurs at very large machines processing, for example, roles or belts that are

uncoiled as input batch at the beginning of the machine and coiled up as output batch at the end of the

machine.

As the users are mostly busy with activities at the end of the machine at the time when the input batch

actually needs to be changed, they cannot perform the input batch change and, as a result, they are

provided with the opportunity to log the next input batch on already in advance for an order/OP.

Then the input batch can actually be changed by logging a new OP on or a project-specific call can be

established.

AIP-MTR_82.docx

Page 49 of 76

01.09.20

ERP Batches, MES Batches

Configuration

Collection  /  Information  Functions  for  Material,

The settings required for using the function “advance logon of input batches” is described here.

Procedure

The procedure for using the function “advance logon of input batches“or the logical process is described

here.

Usage at AIP

Basic AIP view

The basic AIP screen shows the function key “Advance logon of input batch” (advanced logon of input

batch). The dialog for logging input batches on in advance may be used by clicking this function key.

Advance logon of input batches (CE_VWL_MPL)

The user highlights in the display the workplace where input batch is logged on in advance and pushes

in the 3. list the function button with three points.   The dialog (CE_VWL_MPL) opens by clicking the

function key “Advance logon of input batches”.

If an operation is currently running/logged on the workplace, this one will be selected by default. The

input batch (that is to be logged on in advance) is entered/scanned for the selected BOM item. Advance

logon of input batches is started by clicking the button “post batch".

At first, the input batch is checked for validity (dialog CE_VAN). The material number of the input batch

is checked against the material number of the component list or the BOM item. The input batch is logged

on in advance, once the button “log input batch on in advance” has been clicked:

AIP-MTR_82.docx

Page 50 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

Finally, the input batch that has been logged on in advance is displayed in purple in the BOM of the

component.

The dialog is exited by the “cancel” key.

Display of the third list

The system displays as the result the input batch logged on in advance additionally to the logged on/

running input batches in the third list of the basic display with the icon

.

A BOM  item can then simultaneously use a  logged/  running  input batch and a  input  batch  logged  in

advance.

Log off an input batch logged in advance

It is still possible to log off or reset an input batch logged in advance in the dialog "Advance logon of

input batches".

The user highlight again the input batch logged in advance and clicks on "Report batch".

The input batch is logged off using the dialog CE_VAB.

To log on an "Advance logon input batch" to an OP

The  system  displays  in  a  BOM  item  an  input  batch  logged  in  advance  during  the  logon  of  OP  in

production.   During OP logon, the input batch logged in advance is automatically logged.

AIP-MTR_82.docx

Page 51 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

But if another input batch is logged to that BOM item, then the input batch logged in advance remains

applicable to the running OP.

During logoff / interruption of an OP, all input batches logged in advance are automatically logged

off / reset.

5.10  Collection of serial numbers

Serial  numbers  are  assigned  to  be  able  to  differentiate  between  individual  items  of  material.  The

combination material and serial number identifies a single part.

MES provides several variants with different features to record serial numbers:

  Variant 1: Entry of serial numbers for OPs that are not subject to management in batches (dialog

A_SNR/ "E" only)

  Variant 2: Entry of serial numbers for OPs that are subject to management in batches (dialog

A_SNR)

o  Manual input of the serial number. The serial number is assigned to a HYDRA batch

number.

o  Automatic assignment of the serial number = HYDRA batch number

o  Automatic assignment of the serial number. The serial number is assigned to a HYDRA

batch number.

5.10.1  Entry of serial numbers for OPs that are not subject to

management in batches (dialog A_SNR/ "E")

General / usage

Serial numbers are assigned in ERP when creating the production order. At the interface to HYDRA,

assigned serial numbers are transferred as details for the order header and managed there.

The OP that is not subject to management in batches of the order is logged on and respective serial

numbers are recorded in the relevant quality (yield/scrap) at AIP.

The serial number is entered manually (e.g. also by  barcode on the single part) by the AIP user. To

facilitate data collection, the serial numbers available for the order can also be displayed in a list. Only

serial  numbers  may  be  logged  on  that  have  been  assigned  for  this  order.  Please  note  that  a  serial

number may exist as scrap only once.

AIP-MTR_82.docx

Page 52 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

The quantity recorded for the order/OP is always 1 for each single part and, depending on the quality,

posted to the order's/OP's yield or scrap account.

Uploads to the ERP system in relation to the serial number (goods movements) can be performed for

recorded serial numbers/single parts.

Configuration

The  settings  required  to  use  the  function  for  collecting  serial  numbers  (with  orders  subject  to

management in batches) are described here.

Procedure

The  procedure  required  to  use  the  function  for  collecting  serial  numbers  (without  orders  subject  to

management in batches) or the logic process are described here.

Usage at AIP

Basic AIP view

The user applies the "serial numbers" dialog (A_SNR). The function key is configured for output batches

in  the  layout.    The  layout  opens  when  pushing  the  function  key  with  three  points  in  the  3rd  list  of

"produced output batches".

AIP-MTR_82.docx

Page 53 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

Display: Layout to request function key "serial number" (A_SNR)

Collection of serial numbers (A_SNR )

Figure: Collection of serial numbers at the terminal (A_SNR/ "E“)

Serial number

The user enters the serial number. The serial number must be part of the order. A validation check is

performed. If the serial number is not part of the order or if it is already recorded with a result, it cannot

be used.

Clicking  the  function

  opens  a  selection  list  showing  the  "free"  serial  numbers  of  the

order.Requesting the selection list simultaneously updates the list of already recorded serial numbers.

Grid

The displayed list shows all serial numbers in their relevant quality (yield/scrap) that have already been

entered.

  Scrap is displayed in red.

  Yield is displayed in green.

Quality

AIP-MTR_82.docx

Page 54 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

When a serial number is entered, it has to be assigned a quality. You may choose from the following

options:

  Yield

The serial number is entered with "yield" quality. The operation quantity is increased by yield =

1.  The default value is "yield".

  Scrap

The serial number is entered with "scrap" quality. The operation quantity is increased by scrap

= 1.

  Scrap reason

If the "scrap" quality is entered, the user also has to enter or select a scrap reason.

Entry function

By clicking this function, the entered serial number is recorded with the selected quality.

List function

By clicking this function, the entire list of already entered serial numbers may be updated by the selected

quality (e.g. when the dialog is reopened).

Interrupt/terminate OP for orders with serial numbers (A_UN/A_AB)

Quantities are not entered when operations requiring serial numbers are logged off.  The quantity fields

must be disabled in these dialogs.

5.10.2  Entry of serial numbers for OPs that are subject to

management in batches (dialog A_SNR)

General / usage

The following alternatives arise for entering and/or assigning serial numbers if an order/operation subject

to batch management is used to enter serial numbers:

o  Manual input of the serial number. The serial number is assigned to a HYDRA batch

number.

o  Automatic assignment of the serial number = HYDRA batch number

AIP-MTR_82.docx

Page 55 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

o  Automatic assignment of the serial number. The serial number is assigned to a HYDRA

batch number.

Configuration

The settings required for the function to collect serial numbers (with orders subject to management in

batches) are described here.

Procedure

The procedure required in order to use the function for collecting serial numbers (without orders subject

to management in batches) or the logic process are described here.

Usage at AIP

Collection of serial numbers (A_SNR ) including manual assignment of

serial numbers - type "E"

An additional batch is created for each registered serial number in the area of material and production

logistics if batch management requirement is enabled for the operation.

The connection between the current output batch and the registered serial number is saved additionally

in  the  database  for  traceability  purposes..  In  this  case,  the  output  batch  is  considered  as  ID  without

inventory and, therefore, does not receive a quantity.

For  OPs  handled  in  batches,  batch  attributes  that  might  have  to  be  recorded  are  entered  using  the

general standard dialog prior to sending them.

 The serial number can be entered. Batches are assigned in the background.

Collection of serial numbers (A_SNR ) including automatic assignment of

serial numbers - type "G"

If the option "serial number requirement = G" is set for the operation, output batches will be recorded as

serial numbers. In this case, the serial number is the output batch number.

For OPs subject to batch management, the dialog and relevant entries are as follows:

AIP-MTR_82.docx

Page 56 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

The "serial number" field is disabled and includes the current output batch. Once the badge number has

been entered, posting can be performed by clicking "capture". If the entered quality is not "yield", a valid

scrap reason has to be entered.

Exactly one batch with quantity 1 is created for each serial number and the serial number is the batch

number.

The "list" function updates the list of already recorded serial numbers.

For  OPs  handled  in  batches,  batch  attributes  that  might  have  to  be  recorded  are  entered  using  the

general standard dialog prior to sending them.

AIP-MTR_82.docx

Page 57 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

Collection of serial numbers (A_SNR ) including automatic assignment of

serial numbers using the number range - type "S"

Serial numbers are recorded in relation to the batch if the option "serial number requirement = S" is set

for  the  operation.  In  this  case,  the  operation  must  be  subject  to  management  in  batches.  Every

registered serial number causes an output batch to be changed (CA_WL) creating a batch with quantity

1 regarding the serial number in the MPL module.

The server determines a new serial number and displays it in the "serial number" field by clicking the

function

.  The  new  serial  number  is  assigned  uniquely  for  the  whole  system  using  the  "SNR"

number range.

For  OPs  handled  in  batches,  batch  attributes  that  might  have  to  be  recorded  are  entered  using  the

general standard dialog prior to sending them.

Interrupt/terminate OP for orders with serial number tracking

Quantities are not entered when operations requiring serial numbers are logged off.  The quantity fields

must be disabled in these dialogs.

AIP-MTR_82.docx

Page 58 of 76

01.09.20

ERP Batches, MES Batches

6  Barcode Input with Prefix

Collection  /  Information  Functions  for  Material,

A  barcode  is  interpreted  as  prefix  barcode  if  the  third  character  is  a  dot.  In  this  case  the  first  two

characters identify the barcode type. The actual barcode starts with the fourth character.

ID+
Prefix
--------
00.

Example

--------------------
00.ABC123

01.

01.OK
01.ESC

Comment
--> processing
---- General ---
Data not defined,
 00. will be deleted and “ABC123” will be passed on to standard
processing
Action barcode
 Dialog cancelled or ended with OK button or Esc button.

--------------------

16.EXTRUDER-7
16,200
17.1
17.1001
18.1
18.1001
19.1
19.1001
20.1
20.MF

--------------------
40,100
40.MONTAGE
41.KARTON
41.KISTE

--------
10.
11.
12.
13.
14.
22.
15.

16.

17.

18.

19.

20.

21.

--------
40.

41.

42.
43.
44.
45.
46.
47.
48.
49.

---- HYDRA-ADE + HYDRA-LLE + HYDRA-MDE ---
(combined) Order/sequence/OP number  acronym <ANR>
Order (header)  acronym <AUNR>
Sequence  acronym <AFOLG>
OP  acronym <AGNR>
Sub-order number -> Acronym <UAGNR>
Split no.  acronym <SPLNR>
Upload/confirmation number  Acronym <RMNR>

Machine  Acronym <MNR>
 Passed on to dialog with MNR=EXTRUDER-7 or MNR=200
Machine status  Acronym <MST>
 Passed on to dialog with MST=1 or MST=1001
Scrap reason  Acronym <EGG:AUS>
 Passed on to dialog with EGG:AUS =1 or EGG:AUS=1001
Deviation reason  Acronym < EGG:GUT >
 Passed on to dialog with EGG:GUT =1 or EGG:GUT=1001
Operator position  Acronym <BPOS>
 Passed on to dialog with BPOS =1 or BPOS = MF
Wage and premium indicators  Acronym <LPKZ>

----HYDRA-WRM + HYDRA-DNC + HYDRA-PDV + HYDRA-MPL  ---
Destination  Acronym <ZLO>
 Passed on to dialog with ZLO=100 or ZLO= MONTAGE
Transport unit  Acronym <TPE>
 Passed on to dialog with TPE = KARTON or TPE = KISTE
Batch number  Acronym <CNR>
Throughput batch number  Acronym <DLL>
Alternative batch number  Acronym <CNR:ALT1>
Alternative batch number  Acronym <CNR:ALT2>
Alternative batch number  Acronym <CNR:ALT3>
Alternative batch number  Acronym <CNR:ALT4>
Alternative batch number  Acronym <CNR:ALT5>
Alternative batch number  Acronym <CNR:ALT6>

--------

--------------------

---- Mainly for the HYDRA-PZE module ---

AIP-MTR_82.docx

Page 59 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

Example

52.EDV
52.VERTRIEB
53.1
53.1001

Comment
--> processing
Badge number  Acronym <KNR>
Personnel number  Acronym <PNR>
Cost center  Acronym <KST>
 Passed on to dialog with KST=EDV or KST=VERTRIEB
Absence reason  Acronym <FGR>
 Passed on to dialog with FGR=1 or FGR=1001

--------------------

---- Customer-specific barcodes ---

ID+
Prefix
50.
51.
52.

53.

--------
90.
…

In case barcodes are required, which actually have a dot at the third place (e.g. if the machine/workplace

number has a dot as third character), it is possible to define an alternative indicator for barcode prefixes

in the HyTnrCfg.ini terminal configuration, e.g.

[Terminal->USR 0]

BarcodePrefixChar=$

If another prefix is actually required, the respective barcode font in use must be able to represent

this prefix.

Examples for barcodes

Barcode printing: Font “Codedreineun” and prefix “.“

Prefix

10.

Barcode

*10.123456780100*

*10._ABCD12340100*

Raw data

ANR = 123456780100

ANR=_ABCD12340100

AIP-MTR_82.docx

Page 60 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

Prefix

11.

12.

13.

14.

15.

22.

Barcode

*11.12345678*

Raw data

AUNR = 12345678

*12.01*

*13.0100*

AFOLG = 01

AGNR = 0100

*14.0000*

UAGNR = 0000

*15.123456789012345*

RMNR = 123465789012345

*22.02*

SPLNR = 02

AIP-MTR_82.docx

Page 61 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

Prefix

16.

Barcode

*16.123456*

Raw data

MNR = 123456

MST = 1122

17.

18.

19.

20.

21.

*17.1122*

*18.1234*

EGG:AUS = 1234

*19.123456789*

EGG:GUT = 132456789

*20.13*

*21.1221*

BPOS = 13

LPKZ = 1221

AIP-MTR_82.docx

Page 62 of 76

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

Prefix

50.

Barcode

*50.1337*

Raw data

KNR = 1337

6.1  Configuration of customized barcode prefixes

Section [barcode]
BarKenn90=SAPCNR
BarKenn91=EGR:GUT

The barcode prefixes 90...99 can be assigned here according to
the customer's requirements. This means, if a barcode with the
relevant prefix is used, it will be transferred to the dialog along
with  the  assigned  ID.  Then  the  barcode  has  the  following
structure:
<Prefix>.<Net barcode>
e.g.: "90.12345“  SAPCNR=12345

Firmly assigned barcode prefixes:
53:FGR
10:ANR
11:AUNR
12:AFOLG
13:AGNR
14:UAGNR
15:RMNR
16:MNR

17:MST
18:AUSGRD
19:AGGGRD
20:BPOS
21:LPKZ
22:SPLNR
40:ZLO
41:TPE
42:CNR
43:DLL
44:CNR:ALT1
45:CNR:ALT2
46:CNR:ALT3
47:CNR:ALT4
48:CNR:ALT5
49:CNR:ALT6
50:KNR
51:PNR
52:KST

AIP-MTR_82.docx

Page 63 of 76

01.09.20

Collection / Information Functions for Material, ERP Batches, MES Batches

AIP-MTR_82.docx

Version: 1.0.23049

Page 64 of 76

Collection / Information Functions for Material, ERP Batches, MES Batches

7  AIP2 -Local Configuration

7.1  Local Configuration ctaip.ini

The most important hardware and system settings are defined for each terminal in the CTAIP.INI file of the

C:\MPDV\AIP2 directory.

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
mode. This option, however, causes all pieces of information to be
displayed even in demo mode (version number and date, server,
terminal number, online lights).

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

AIP-MTR_82.docx

Version: 1.0.23049

Page 65 of 76

Entry

VirtScreenRatio=16:9

Section [SKIN]

Saturation=0

Hue=0

Name=mpdv

Active=false

Collection / Information Functions for Material, ERP Batches, MES Batches

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
The online configuration of the terminal can be reached by the info
dialog (click MPDV icon). ALT+F1 opens the control elements for
the skin.
Please note: Only in the design/GUI of AIP 8.1 and/or the dynamic
dialogs

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

AIP-MTR_82.docx

Version: 1.0.23049

Page 66 of 76

Collection / Information Functions for Material, ERP Batches, MES Batches

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

‘on’: Offline demo mode; always off in the production environment!

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

If the terminal is switched off for less than 15 minutes, no dialog is

opened; the counting pulses recorded in the switch-off phase are

accepted and posted without confirmation.

Please  note:  The  value  can  also  be  configured  in  hytnrcfg.ini.

Entries in the hytnrcfg.ini file take priority.

AIP-MTR_82.docx

Version: 1.0.23049

Page 67 of 76

Collection / Information Functions for Material, ERP Batches, MES Batches

Entry

Comment

MSS_FILEAGE_MIN=5
MSS_FILEAGE_OVERTIME=delete

Additional configuration for MSS_DIALOG

Section [ext. software]

Button=Editor
WindowName=Editor
SearchParts=On

If the backup file for counting pulses of the terminal is older than 5

minutes,  no  dialog  is  opened  and  the  back  up  file  deleted.

Quantities recorded at the time when the terminal was closed are

not used/posted.

Please  note:  The  value  can  also  be  configured  in  hytnrcfg.ini.

Entries in the hytnrcfg.ini file take priority.

Configuration  of  the  button  in  the  top  line:  A  previously  started
program can be brought to the foreground at the push of a button.

Button: button caption
WindowName: Name of the program (e.g. from the taskbar).
SearchParts=On:  Parts  of  WindowName  are
sufficient
SearchParts=Off:  WindowName  must  be  entered  completely.
The option "SearchParts=On" is recommended for programs such
as MSWord that change the title bar subject to the document that
is currently being loaded.

ProgFileName=c:\Programme\wi
ncmd\Wincmd32.exe

The program that is started if the program mentioned above cannot
be called to the foreground.

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
If this entry is set the number may only be entered using a scanner.
If this entry is set the badge number may only be entered using a
scanner.

AIP-MTR_82.docx

Version: 1.0.23049

Page 68 of 76

Collection / Information Functions for Material, ERP Batches, MES Batches

Entry

Comment

BarcodeWNR=

BarcodeNest=

BarcodeNumm=

This field specifies which acronym is entered into the tool number
field by the scanner.
This  field  specifies  which  acronym  is  entered  into  the  cavity
number field by the scanner.
This field specifies which acronym is entered into the number field
by the scanner.

7.2  PNG – Files / Bitmaps

The use of PNC files is recommended by MPDV. By default PNG files have a size of 24 x 24 px.

7.2.1

File pict.zip

The file "pict.zip“ is updated by the installation tool "inst32.exe“ while downloading and includes all default

PNG files.

The  default  PNG  files  can  be  overwritten  in  the  file  pict_cust.zip.  Several  PNG  files  have  the  extension

".small.png" (e.g. aip.small.png). These PNG files are used with a screen resolution of 640x480.

7.2.2

File pict_cust.zip

The file "pict_cust.zip“ is loaded from the server directory (e.g. \<serverDir>\1\custom)  when starting the

program (as is the case for the hycust.mld).

Customized PNG files may be stored in this file and loaded by the AIP2 terminal. Default PNG files may

also be "overwritten".

Please note: file sizes are not adjusted.

Customize header

The AIP icon displayed in the header can be replaced by storing a separate AIP.png file in the pict_cust.zip

file.

This AIP icon will also be replaced in the "About" dialog.

AIP-MTR_82.docx

Version: 1.0.23049

Page 69 of 76

Collection / Information Functions for Material, ERP Batches, MES Batches

Customize footer

The  MPDV  icon  displayed  in  the  footer  can  be  replaced  by  storing  a  separate  company.png  file  in  the

pict_cust.zip file.

Customize PZE dialog

The MPDV icon displayed in the PZE dialog can be replaced by storing a separate pze_mpdv.png file in

the pict_cust.zip file. In case the PZE terminal is operated with a screen resolution of 640x480, a customized

pze_mpdv.small.png file has to be integrated in the pict_cust.zip file.

7.3  Multilingualism (*.mld files)

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

AIP-MTR_82.docx

Version: 1.0.23049

Page 70 of 76

Collection / Information Functions for Material, ERP Batches, MES Batches

8  AIP2 - Central Configuration File hytnrcfg.ini

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

OnlyInstallFontsAfterDownload=fa
lse

[Terminal->USR 0]

Transfer of machine statuses when reloading machine list.
Useful if status change is set by PDM or another terminal

If set to "off", fonts are not installed during restart.
ON=DEFAULT

If “InstallFonts=on”:
If  true,  then  fonts  are  only  installed  directly  after  a
download. If false, then fonts are installed every time the
terminal is restarted.
(false = DEFAULT)

AIP-MTR_82.docx

Version: 1.0.23049

Page 71 of 76

Collection / Information Functions for Material, ERP Batches, MES Batches

Section / Entry

Comment

AttachedApplication=First

Displaying documents of OP info: With this configuration,
the  system  first  checks  whether  or  not  an  application  is
linked  in Windows  that  matches  the  file  extension  of  the
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

Off  The system does not search for a linked application.

Display of documents (via OP info):
If documents are configured with a path of schema "http",
the  file  is  not  downloaded  to  the  terminal,  but  the  link  is
transferred to a browser.
The default browser for the terminal is htmview3.exe, as
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
decide whether the counter pulses, which  were recorded
when  the  terminal  was  closed,  are  posted  or  discarded.
After  a  configurable  period  of  time,  the  dialog  closes
automatically with "Yes" (Yes, posting of pulses).
This  value  configures  the  time  in  seconds  the  dialog  is
open.

If the backup file for counter pulses on the terminal is older
than 5 minutes, then no dialog is opened and the backup
file  deleted.  Quantities  recorded  at  the  time  when  the
terminal was closed are not used/posted.

This configuration specifies whether or not the field  User
can be edited on the terminal (by default: no editing)
true    activates  keyboard  input  for  field  User  on  the
terminal

AIP-MTR_82.docx

Version: 1.0.23049

Page 72 of 76

Collection / Information Functions for Material, ERP Batches, MES Batches

Section / Entry

Comment

Transparency=255

ShowPosition=TR

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

USE_SERVICE_ACCOUNT=1

SIGNATURE_1_USER_TYPE=REPORTING_
USER_READONLY

0  (default)  SSO:  ServiceAccount
is  not  used
(requirement: the terminal must be started with the domain
"user" (SSO)).
Note: ServiceAccount=1 can only be used if all users are
in the "root" domain. SubDomain users are not supported.

REPORTING_USER_READONLY

The  user  identification  using  the  Windows  user  is
activated. The Windows user is then preassigned in field
User. The User field is read-only.
Requirement:  The  "SSO"  option  must  be  enabled  for  all
reporting  users.  Otherwise,  successful  authentication  is
not possible.

REPORTING_USER_CHANGEABLE

The  user  identification  using  the  Windows  user  is
activated. The Windows user is then preassigned in field
User. The User field can be edited.
Requirement:  The  "SSO"  option  must  be  enabled  for  all
reporting  users.  Otherwise,  successful  authentication  is
not possible.

AIP-MTR_82.docx

Version: 1.0.23049

Page 73 of 76

Collection / Information Functions for Material, ERP Batches, MES Batches

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

SIGNATURE_2_LOGON_TYPE=HYDRA

Identical  to  SIGNATURE_1_LOGON_TYPE  (see
above)

ExtendedSignatureRecording=true  Used  for  signatures  on  the  terminal  with  quality  data
collection.

[MDE/Blade Configuration 0]

CONVERT-TO-ANSI-
FILE=<list1|list2>

Configuration of the files that are provided from the AIP to
the  MDEB2  blade  in  ANSI  format  when  a  combined
operation is available.

The following lists are transferred by default if the entry is
not available.
counters.lst|schicht.lst|mnr.lst|mstat.lst
|anr.lst|pnr.lst

If  you  want  to  transfer  further  lists,  you  must  specify  the
standard lists and the additional lists.

8.1  Layout configuration

Entry

Comment

Section
and/or

[terminal configuration 0]
[terminal configuration 2XXX];

( general configuration )
( 2XXX terminal-specific configuration )

AIP-MTR_82.docx

Version: 1.0.23049

Page 74 of 76

Collection / Information Functions for Material, ERP Batches, MES Batches

Entry

AUTO-CONFIRM-UHR-ERROR-
MESSAGE=TRUE

SUPPRESS-MAXIMUM-NUMBER-OF-
MACHINES-WARNING=ON

CalcTargetYieldSinceLogon=2

Comment

This setting specifies that in case of an error that occurred
reading the clock (e.g. when activated after standby mode),
the time is transferred without confirmation dialog and the
terminal time is later synchronized with the server time via
PDM command.

Suppresses  the  warning  after  restart  of  terminal  if  more
than  32  machines  are  assigned
terminal
(static/dynamic). (Default=OFF)
CalcTargetYieldSinceLogon=1
The duration is calculated from the total runtime since login
(all statuses) minus the configured shift breaks.

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

Reloads the order row for the configured <Events>, if it is
not available locally
 This option has been implemented to access order data
in the master data, e.g. when logging on orders.

Explanation on the configuration of <Events>
 Using <#ALL#> the row (ANR/MNR) that is not available
is reloaded for any event.
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

Disables the new AIP2 design and uses the AIP 8.1 design.

Activates the GUI that is similar to CTWIN on the AIP2. The
two button bars are shown below the two lists just like on
the AIP 8.1.

If the option CTWIN-STYLE=ON is additionally set, the two
button bars are displayed at the bottom of the screen.

As  of  AIP  8.2.2.28:  If  this  option  is  set,  the  display
automatically changes to the main view after the configured
time if no other interaction was performed in the meantime.
The  changing  display  is  configured  via  the  option  Show
machine/OP
tab  MF
functions.

the  Terminal  configuration,

in

  List:

AIP-MTR_82.docx

Version: 1.0.23049

Page 75 of 76

Collection / Information Functions for Material, ERP Batches, MES Batches

Entry

Comment

o  Change  from  the  detail  views  or  function  menus

(operation, person, resource, etc.)
o  Change to the main view with "tiles"
Icons:
o  Change from the detail views or function menus or



from the main view with tiles

o  Change to the icon view of workplaces

The  configuration  is  specified  in  seconds.  Do  not  specify
less than 10 seconds.
An automatic change to the start screen is not made if an
input dialog is open.

AIP-MTR_82.docx

Version: 1.0.23049

Page 76 of 76

