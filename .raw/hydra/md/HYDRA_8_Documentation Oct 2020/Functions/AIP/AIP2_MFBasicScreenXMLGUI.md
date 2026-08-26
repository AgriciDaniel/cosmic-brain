AIP2 Main View with Tiles

1  Main View with Tiles

With the AIP2, the user can switch between the tile design optimized for touchscreens and the list format.

By default, the tile layout is shown, which is described in the sections that follow.

To  ensure  proper  processing  and  posting,  terminals  with  "MDE"  operation  mode  must  not  be

switched off during times without shift.

1.1  Main view – header and footer

Header

The AIP logo is displayed on the top left of the screen, which may be replaced with a customer logo after

configuration.

Possible messages are displayed to the right of it (e.g. if a dialog is opened for more than five minutes).

A separate window opens to display error messages that occur during data collection (e.g. validity checks).

Main views

You can assign a maximum of 16 workplaces or machines to the AIP2 terminal. The different workplaces

are listed in the order that they were assigned to the terminal on the client. .

In the main view of the AIP2, you can use the button "< Overview“ to switch to the icon view of workplaces.

In  the  terminal  configuration  of  the  client  you  can  specify  whether  you  want  to  use  the  icon  view.  The

sections that follow describe the main view and the icon view.

Footer

The MPDV logo can be found at the bottom left of the AIP2 terminal. Double clicking the logo opens the

info  dialog  where  you  can  start  further  administration  functions.  This  dialog  closes  automatically  after

approx. 5 seconds.

In the middle, further information is displayed: the current terminal status, AIP2 version number, date of the

build, IP address of the server and the terminal number.

The current date and time are displayed to the right.

AIP2_MFBasicScreenXMLGUI.docx

Version: 1.6.22282

Page 1 of 9

AIP2 statuses

AIP2 Main View with Tiles

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

1.2  Main view with "tiles"

List of workplaces

Workplace tiles

Operation tiles

Staff tiles/
Resource tiles/
Material tiles

Please note: The actual display can be different to the above illustration.

Subject to the configurations made, the main view with tiles consists of two or three rows of tiles. While the

first two rows of tiles (workplace and operation tiles) are always displayed, it is up to the user whether or

not the third row of tiles is shown (optional display). In the configuration of workplaces you can configure

for each workplace separately if you want to show the third row of tiles.

AIP2_MFBasicScreenXMLGUI.docx

Version: 1.6.22282

Page 2 of 9

Additionally, there is the list of workplaces to the left. Here, you can select the workplaces for which details

AIP2 Main View with Tiles

are displayed on the right-hand side.

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

On  the  right-hand  side,  the  first figure  shows  the  produced  yield  in  green  and  the  red  figure  shows  the

produced scrap.

If you have enabled the Compensate manual quantities option (e.g. set off scrap against yield)

and the machine list also shows shift-related quantities, they will not be updated immediately. The

application only updates the quantities, once the lists have been reloaded.

Unit for yield and scrap

If no operation is logged on, the primary quantity unit from the workplace/machine configuration is displayed

as  unit  for  yield  and  scrap.  If  an  operation  is  logged  on,  the  primary  quantity  unit  of  the  operation  is

displayed.

Workplace tiles

The workplace tiles provide the following details:

Workplace/machine

No workplace or machine number is displayed.

Short name / group

The short name of the workplace or machine and the machine group are displayed.

AIP2_MFBasicScreenXMLGUI.docx

Version: 1.6.22282

Page 3 of 9

Status

The  status  is  displayed  in  color  and  as  status  text  on  the  left-hand  side.  Coloring  is  as  follows:

AIP2 Main View with Tiles

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

With BDE workplaces1, this point in time refers to the last manual status change. With MDE workplaces, it

refers to the time when the last status change was identified (for machine connections). It also refers to the

point in time when the status was last changed manually or to the time of the last shift change.

Target/actual cycle

Current target and actual cycle of the workplace.

The largest target cycle of all operations logged on to the workplace is shown. The largest target cycle is

transferred to the MDE for monitoring.

If the target cycle is smaller than the minimum cycle time, the target cycle is still shown.

If an operation is logged off or interrupted, the largest target cycle of the remaining operations is identified

and displayed. After logoff or interruption of the last operation at the workplace, the last target cycle set is

still displayed.

If no operation is logged on, the target cycle specified in the machine list is displayed. Thus, even after a

restart, the terminal can get the target cycle that last applied.

Yield / Scrap

Yield and scrap quantities of the current shift produced at the machine/workplace.

1  An MDE workplace is a workplace that is assigned to a terminal, which runs in the “MDE” operation mode. Otherwise,

it is a BDE workplace.

AIP2_MFBasicScreenXMLGUI.docx

Version: 1.6.22282

Page 4 of 9

AIP2 Main View with Tiles

KPIs: OEE, utilization efficiency, scrap ratio

This function is only available if you enable the extension aipkpi.

Shows the KPIs OEE, utilization efficiency and scrap ratio. The application calculates the KPIs at cyclic

intervals  (scheduler  job  "MDE  keyfigure  calculation“).  The  KPIs  always  refer  to  the  current  shift.  The

application calculates the  KPIs  based  on the formulas that are also used for the OEE report and/or the

efficiency report on the MOC. The application shows the KPIs with two decimal places. To the right of the

KPI, the AIP2 GUI highlights in color if limit values are exceeded or not reached. If you have not defined

limit values, the application shows the KPI in gray,  otherwise  in the color  you defined for exceeding/not

reaching

limit  values.  For

further

information  on

the  configuration,

refer

to

the  document

MDE_KPI_Configuration.pdf.

The AIP calculates and updates data at cyclic intervals. This may result in deviations between

the collected values and the displayed KPIs.

Linked functions

If you click the workplace status, the dialog for changing the status opens. If you click one of the other tiles,

the dialog opens where you can start the functions available for the selected workplace.

The buttons displayed depend on the selected workplace. The button Lock production status, for

example, is only available for MDE machines.

List of operations logged on

The  middle  area  on  the  right-hand  side  shows  the  logged  on  operations  as  tiles.  The  following  data  is

shown:

MES order number

Order number and operation number of the operation logged on. The combination of these two numbers is

the MES order number.

Article

Article defined for the operation.

Quantities (target / yield / scrap)

Shows the target quantity defined for the operation, the produced yield and the scrap. The yield and scrap

quantities integrate the counter readings of the available machine connections.

AIP2_MFBasicScreenXMLGUI.docx

Version: 1.6.22282

Page 5 of 9

AIP2 Main View with Tiles

This icon is displayed if at least one note has been recorded for this operation in the graphic planning board

of the client that must be shown on the terminal. To display the note(s), click the icon or click the operation

and select the Information button (

).

This icon is displayed if at least one long text is stored for this operation. Click this icon to display the long

texts or click the operation and select the button Information (

).

If you click an operation, a screen opens that shows the workplace/operation data. Via this screen, you can

also select the operation-related functions.

Operation tiles

In addition to the fields already described, the operation tiles also show the following data:

Comments

This  tile  shows  the  user  fields  53  and  54  (alphanumeric,  20  characters)  of  the  operation.  To  edit  these

fields, you must store a respective user field key for the operation, which includes these two fields.

Completion in %

The  bar  shows  the  proportion  of  “yield”,  which  has  been  produced  until  now,  compared  to  the  “target

quantity”.

Since logon (target / yield / deviation)

The production quantity to be expected since the OP has been logged on (depending on the cycle time,

partitioning and the time when no production lock has been set for the machine). If the terminal program

has been restarted after the OP logon, no value can be calculated.

Calculation:

Target Since Logon = Net Running Time[sec] * Partitioning/Target Cycle[sec/stroke]

Net Running Time: Time since logon while the production lock has not been set. This calculation does not

integrate the breaks specified in the shift model or the status times posted to RPA 12 (resource performance

account).

Deviation (in percent) between the calculated target quantity since logon and the quantity which has actually

been produced “since logon”.

Calculation: Deviation[%] = 100% * (Yield Since Logon - Target Quantity Since Logon) / Target Quantity

Since Logon.

AIP2_MFBasicScreenXMLGUI.docx

Version: 1.6.22282

Page 6 of 9

AIP2 Main View with Tiles

As of CTAIP 8.2.1.32:

Up to now, the target quantity since OP logon was only calculated if the workplace/machine was assigned

to a terminal with operation mode "MDE processing". As of CTAIP 8.2.1.32, the target quantity since OP

logon is also calculated if the terminal is configured with operation mode "BDE processing".

If the terminal has been restarted after an operation logon, the target quantity cannot be calculated correctly.

To improve transparency, an "*" (asterisk) is shown behind the target quantity (since OP logon) in this case.

The asterisk indicates that the target quantity now displayed no longer refers to the time of the operation

logon, but to the time of the terminal restart.

While the workplace/machine status 999 is displayed, the target quantity since OP logon is "---". If the status

999 is again changed within a "free shift", the target quantity since OP logon is calculated using the point

in time of the OP logon, of the shift start or of the terminal start.

To  disable  the  calculation  of  the  target  quantity  since  OP  logon  on  the  terminal,  you  can  use  the

configuration CalcTargetYieldSinceLogon=0 in the hytnrcfg.ini. The quantity is then displayed using "---".

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

In case the partitioning or pulse factor of a machine or an order is 0, calculation is based on the value 1.

Displaying the "3rd list"

The third list is optional. You can configure the third list in the configuration of workplaces.  The following

lists can be displayed:

  List of staff logged on to the currently selected workplace (BDE)

AIP2_MFBasicScreenXMLGUI.docx

Version: 1.6.22282

Page 7 of 9

AIP2 Main View with Tiles

  List of resources logged on to the currently selected workplace (WRM)

  List of materials/input batches (MPL/TRT) logged on to the currently selected workplace

  List of output batches produced in the currently selected operation (MPL/TRT)

In case you have enabled several lists, you can switch between these lists in the header line that is located

above the third list. Activated lists can be selected one after the other.

Maintenance status

If you have purchased the license for the maintenance calendar, the maintenance status is displayed using

a yellow or a red field showing a wrench. The color displayed depends on the required maintenance activity.

Calling functions

The functions available are assigned to the relevant objects. Example: The functions  Log person off and

Log all staff off are displayed if you click on a person logged on.

1.3

Icon view of workplaces

You can enable this view in the configuration of terminals via the client. Then open this view by clicking the

button "< Overview“ in the main view. This view shows workplaces in a clear structure and with an image.

It shows important information on the single workstations:

Please note: The actual display can be different to the above illustration.

AIP2_MFBasicScreenXMLGUI.docx

Version: 1.6.22282

Page 8 of 9

AIP2 Main View with Tiles

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

If you enable the extension aipkpi, the application also shows the KPIs OEE, utilization efficiency

and scrap ratio.

The application calculates the KPIs at cyclic intervals (scheduler job "MDE keyfigure calculation“). The KPIs

always refer to the current shift. The application calculates the KPIs based on the formulas that are also

used for the OEE report and/or the efficiency report on the MOC. The application shows the KPIs with two

decimal places. To the right of the KPI, the AIP2 GUI highlights in color if limit values are exceeded or not

reached.

The AIP calculates and updates data at cyclic intervals. This may result in deviations between

the collected values and the displayed KPIs.

If you click on a tile, the previously described main view is displayed and the workplace is automatically

selected. From there, you can perform the postings for the selected workplace.

Use the option "< Overview" to exit the main view and to return to the icon view.

As part of the advanced configuration options, you can customize the layout of display lists, the

displayed data fields and functions. For technical reasons, however, you cannot change the sort

sequence of display lists in the main view of the terminal.

As  of  AIP  8.2.2.28,  you  can  automatically  change  from  the  main  view  with  tiles  to  the  icon  view  of

workplaces  after  a  configured  time.  The  configuration  AUTOMATIC-CHANGE-TO-START-DISPLAY  is

described in the document AIP2_Configuration_hytnrcfg.pdf.

AIP2_MFBasicScreenXMLGUI.docx

Version: 1.6.22282

Page 9 of 9

