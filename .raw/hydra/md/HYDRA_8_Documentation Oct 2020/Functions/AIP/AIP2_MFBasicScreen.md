Basic Screen as List View

1  Basic Screen as List View

The new tile design can be disabled for the AIP2 terminal. This chapter describes the basic screen with

disabled tiles.

In general,  the  AIP2  has  been  designed  for  entries  to  be  made  via  touch  screen.  The  corresponding

functions  can  be  started,  selected  or  executed  by  touching  the  buttons  or  using  the  displayed  virtual

keyboard.  Selection  lists  are  provided  in  many  cases,  as  an  alternative  to  manual  entries.  Required

entries can easily be selected from these lists.

Barcodes  can  be  imported/entered  in  the  current  dialog  using  barcode  readers,  handheld  scanners,  or

swipe  card  readers.  Subject  to  the  barcode  prefix,  certain  data  (e.g.  operation  data)  can  directly  be

assigned to the corresponding input field, without having to focus this input field explicitly.

It goes without saying that mouse and keyboard may also be used.

To  ensure  proper  processing  and  posting,  terminals  with  "MDE"  operation  mode  must  not  be

switched off during times without shift.

1.1  Basic screens – header and footer

Header

The  AIP  logo  is  displayed  top  left  of  the  screen,  which  may  be  replaced  with  a  customer  logo  after

corresponding configuration.

Possible messages are displayed to the right of it (e.g. if a dialog is opened for more than five minutes).

A  separate  window  opens  to  display  error  messages  that  occur  during  data  collection  (e.g.  validity

checks).

Basic screens

A maximum of 16 workplaces or machines can be assigned to the AIP2 terminal. The single workplaces

can be found within the list area in the order assigned to the terminal via the client. .

As  regards  the  basic  screen  of  the  AIP2  terminal,  the  user  can  choose  between  a  tabular  view,  field-

related view and an icon view. This can be configured via the configuration of terminals in the client. The

single basic screens are described in the sections that follow.

AIP2_MFBasicScreen.docx

Version: 1.7.13742

Page 1 of 9

Footer

Basic Screen as List View

The MPDV logo can be found at the bottom left of the AIP2 terminal. Double clicking the logo opens the

info  dialog  where  further  administration  functions  can  be  started.  This  dialog  closes  automatically  after

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

AIP2_MFBasicScreen.docx

Version: 1.7.13742

Page 2 of 9

1.2  Basic screen “tabular view“

Basic Screen as List View

1st list
Workplaces
assigned to the
terminal

2nd list
List of
registered
operations

3rd list
(optional)
e.g. list of
registered staff

Subject to the configurations made, the tabular basic screen consists of two or three tables. While the first

two tables are always displayed, it is up to the user whether or not the third table is shown (optional).

“Machines/workplaces" table

The upper table shows the workplaces assigned to the terminal. The following columns are displayed.

Machine/workplace

The machine or workplace number as well as a description are displayed.

Status

The  status

is  highlighted

in  color  and

the  status

text

is  shown.  Coloring

is  as

follows:

- green:

- yellow:

- red:

production

assigned status

not assigned

Status since

Point in time since the status is available.

AIP2_MFBasicScreen.docx

Version: 1.7.13742

Page 3 of 9

For  ADE  workplaces1  the  point  in  time  refers  to  the  last manual  status  change.  For  MDE  workplaces  it

refers to the time when the last status change was identified (for machine connections). It also refers to

the  point  in  time  when  the  status  was  changed  manually  most  recently  or  to  the  time  of  the  last  shift

Basic Screen as List View

change.

Please note:

It is indicated here if the “lock production status” function is enabled for the machine/workplace.

Below  the  first  list  there  is  a  row  including  the  function  buttons mainly  relating  to machines/workplaces.

These functions are described in more detail in the sections that follow.

By way of “customizing” services it is possible to adapt the layout of the display lists, displayed

data  fields,  sort  sequences,  etc.  according  to  the  customer’s  requirements.  For  technical

reasons, however, the sort sequence of display lists may not be changed in the basic screen of

terminals. The software does not allow it.

Provided  that  the  "compensate  manual  quantities"  option  (e.g.  set  off  scrap  against  yield)  is

enabled and the machine list also shows shift-related quantities (no default setting), they will not

be updated immediately. Quantities are only updated once the lists have been reloaded.

"Operations at workplace" table

The  second  table  shows  the  operations  currently  logged  on  to  the  selected  workplace.  The  following

columns are displayed:

Article

Article defined for the operation

Order and operation

Order  number  and  operation  number  of  the  registered  operation.  Together  they  build  the  MES  order

number.

Target quantity

Target quantity defined for the operation.

Yield

Yield already produced for this operation. The counters of possible machine connections are considered

as well.

1  We talk of an MDE workplace if this workplace is assigned to a terminal, which runs in the “MDE” operation mode.

In any other case, it is an BDE workplace.

AIP2_MFBasicScreen.docx

Version: 1.7.13742

Page 4 of 9

Scrap

Scrap  quantity  already  produced  for  this  operation.  The  counters  of  possible  machine  connections  are

Basic Screen as List View

taken into account as well.

N

It  is  indicated  here  if  a  note  visible  on  the  terminal  has  been  recorded  for  this  operation  in  the  graphic

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

on…”. Selecting a person in the third list does  not affect the selection of the operation in the list of OPs

running  at  the  workplace.  Therefore,  it  neither  affects  pre-assignment  of  the  operation  in  the

corresponding posting dialogs.

Toolbar in the basic screen

A toolbar, which may be customized, is assigned to each list included the basic screen. This makes the

purpose of a function clear to the user. The “partial upload/confirmation” function can be found below the

list of registered operations.

AIP2_MFBasicScreen.docx

Version: 1.7.13742

Page 5 of 9

In fact, the toolbar may include several “tabs”,  which can be made visible by scrolling to the right/left at

the right/left end of the toolbar. A posting dialog (e.g. change partitioning) can be opened by clicking the

Basic Screen as List View

corresponding button.

Please note

The displayed buttons depend on the context defined by the respectively selected workplace. Thus, the

displayed buttons may vary when selecting another workplace/machine.

1.3  Basic screen "machine overview"

If the “change view” button is clicked in the basic screen, the view changes to the following presentation:

Toolbar of the assigned machines

Machine information

Order information

This presentation gives detailed information on a single machine, whereas the above toolbar still provides

an overview of all assigned machines and workplaces.

The presentation consists of three sections:

AIP2_MFBasicScreen.docx

Version: 1.7.13742

Page 6 of 9

Toolbar of the assigned machines

The  color

indicates

the  current  status  of  all  assigned  workplaces.  Coloring

is  as

follows:

Basic Screen as List View

- green:

- yellow:

- red:

production

assigned status

not assigned

It is  possible to switch  between machines by  pressing a machine icon (requires a touch screen). Using

the  keyboard,  the  active  machine  can  be  selected  by  the  arrow  keys.  To  do  this,  the  toolbar  must  be

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

configuration is displayed as unit for yield and scrap. If an operation is logged on the primary quantity unit

of the operation is displayed.

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
The resulting partitioning is displayed without decimal places, provided it is an integer value. Otherwise, 3

Partitioning of the machine (TLG in mnr.lst)
Pulse factor of the machine (IMPFAKT in mnr.lst)
Partitioning of the individual operation (TLG in anr.lst)

decimal places are shown.

In case partitioning or pulse factor of a machine or an order is 0, calculation is based on the value 1.

Having logged off all OPs, the machine continues working with the partitioning of the machine.

AIP2_MFBasicScreen.docx

Version: 1.7.13742

Page 7 of 9

Basic Screen as List View

Target cycle

The  largest  target  cycle  of  all  operations  running  at  the  machine  is  always  displayed  in  the  machine

overview  of  the  terminal.  If  this  OP  is  logged  off  the  largest  target  cycle  of  the  remaining  OPs  will  be

displayed.

In case no OP is logged on, the target cycle from the machine list is displayed. Thus, even after a restart,

the terminal can get the target cycle that applied at last.

The largest target cycle is also transferred to MDE for monitoring.

Comment 1, comment 2

These two fields show the user fields 53 and 54 (alphanumeric with 20 characters) of the operation. To be

able to edit these fields, a corresponding user field key containing these two fields must be defined for the

operation.

Target since logon

The production quantity to be expected since the OP has been logged on (depending on the cycle time,

partitioning  and  the  time  while  the  production  status  was  not  locked  for  the  machine).  No  value  can  be

calculated, in case the terminal program has been restarted since the OP was logged on.

Calculation:

TargetSinceLogon = NetRunningTime[sec] * Partitioning/TargetCycle[sec/stroke]

NetRunningTime: Time since logon while the production lock has not been set. This calculation does not

take  into  account  any  breaks  defined  in  the  shift  model  or  status  times  posted  on  RPA  12  (resource

performance account).

Deviation [%]

Deviation  (in  percent)  between  the  expected  target  quantity  since  logon  and  the  quantity  which  has

actually been produced “since logon”.

Calculation: Deviation[%] = 100% * (YieldSinceLogon - TargetSinceLogon) / TargetSinceLogon

Completion

The bar represents the proportion of “yield”, which has been produced until now, compared to the “target

quantity”.

Machine icon:

Provided  that  the  WRM-WTK  license  has  been  purchased,  the  machine  icon  may  be  replaced  with  a

picture  showing  a  yellow  or  red  oilcan.  It  all  depends  on  the  required  maintenance  activity:

AIP2_MFBasicScreen.docx

Version: 1.7.13742

Page 8 of 9

Basic Screen as List View

1.4

“Machines as icons” basic display

This view can be configured as the default display in the configuration of terminals at the client  It has the

advantage  that  the  user  can  tell  from  a  distance  whether  or  not  all  machines  are  in  the  “Production”

status.

All MDE machines have their own buttons colored according to the corresponding status:

- green:

- yellow:

- red:

Production

Assigned status

Not assigned

The  button  includes  details  on  the  workplace/machine  number,  the  registered  operation,  the  yield  and

scrap quantities as well as the status (text) of the workplace/machine.

If  a  button  is  touched  ,  the  “machine  overview”  basic  display  is  shown  for  this  workplace.  From  there,

postings for the selected workplace can be performed using the standard buttons.

By clicking the “symbol” button (if configured) the view changes from the “machine overview” to the “icon

view of machines”.

AIP2_MFBasicScreen.docx

Version: 1.7.13742

Page 9 of 9

