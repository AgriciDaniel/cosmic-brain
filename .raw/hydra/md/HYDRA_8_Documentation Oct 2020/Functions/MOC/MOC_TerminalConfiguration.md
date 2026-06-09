Terminal Configuration

1  Terminal Configuration

Overview

Menu

System administration  Terminals  Terminal configuration

Transaction code

tc

Function authorization  mdtc

Purpose

In  the  terminal  configuration,  you  create  all  terminal  settings  that  specify  the  data  collection  on  the

respective terminal.

For information on the use of access terminals of the manufacturer Kaba, which are connected

via the communication software B-COMM, refer to the document Kaba-Connector_ZKS.pdf.

Integration

The terminal configuration is performed centrally for the different areas of data collection, e.g.

-  BDE/MDE terminal

-  PZE/ZKS terminal

-  CAQ terminal

Requirements

First create the terminal in the MOC, then install the terminal in production.

Selection criteria

The application provides the following selection criteria:

Terminal … to …

Only the selected terminals are displayed.

Active/inactive

Active or inactive terminals are displayed.

MOC_TerminalConfiguration.docx

Version: 2.8.20820

Page 1 of 26

Terminal Configuration

Toolbar

 Terminal administration

The  description  of  this  dialog  can  be  found  in  section  Field  description  for  dialog  "Terminal

administration".

 VNC Viewer

This link starts the VNC viewer with the IP address of the currently selected terminal. The terminal

can be operated by remote control if remote maintenance is enabled on the terminal. If the remote

maintenance  is  not  enabled  on  the  terminal,  it  might  take  several  minutes  until  the  VNC  Viewer

opens and shows an error message. This is a VNC Viewer behavior that we cannot control.

Field description for tab "General"

General

Terminal

Terminal number for unique identification. It is entered in decimal form.

Active

Using this field, you specify if the terminal is logically active or inactive in this application. You can

hide inactive terminals in the table. Deactivate the criterion "Inactive terminal" in the selection index

tab. If an inactive terminal is restarted, this terminal is automatically reactivated if a terminal status

is posted.

Designation

Comment  field  for  a  more  detailed  description.  The  entry  is  only  meant  for  documentation  or  for

customer-specific evaluations. For example, you can store the terminal manufacturer in this field.

Location

Comment field to specify where the terminal is located. The entry is only meant for documentation

or for customer-specific evaluations.

Foreman's area

Identification of the area where the terminal is located. The entry is meant for documentation or for

customer-specific evaluations.

MOC_TerminalConfiguration.docx

Version: 2.8.20820

Page 2 of 26

Terminal Configuration

Type

This entry specifies the terminal type using the terminal number and the terminal as hardware. This

setting  controls  the  assignment  of  the  correct  software,  the  correct  software  modes  and  the

keyboard layout. If the entry is not correct, the program cannot be operated from the keyboard or a

screen  is  shown  that  does  not  match  the  terminal.  You  can  identify  the  terminal  type  from  the

purchase order. It is also printed on the front panel of the machine (e.g. CT 830).

The terminal type PCC is a shop floor server for PDV mass data. If you select this input type, the

network port field is additionally displayed.

Terminal

type  Palm

is  used

for

the  PDA

for  comparison

to  ZKS  offline  components.

The  terminal  type  M6  or  VT4x  defines  MBB  subterminals  for  PZE  that  are  connected  to  a  type

CT385 master terminal. If you select this terminal type, the input in the fields  Master terminal and

Reader is possible.

The terminal type ST-300 defines subterminals for PZE that are connected to a type CT-385 master

terminal.  If  you  select  this  terminal  type,  the  fields  Master  terminal  and  Reader  are  additionally

displayed.

Language

You use this field to select the language that is used for the terminal texts. The field  Language is

only available for specific terminal types. For type M6 or VT4x sub-terminals, the language is set for

all sub-terminals in the terminal configuration of the master terminal.

Note:

The  terminal  installation  of  the  customer  specifies  the  languages  that  are  available  and  can  be

selected. For any questions, please contact MPDV Sales or MPDV Project Management.

Terminal class

You can enter the terminal class required for Kaba Benzing and Dorma terminals in this field.

Configuration

Operated as

This  option  specifies  the  terminal  functions.  Specific  options  can  only  be  configured  in

combinations.

BDE terminal

This is a shop floor terminal. A BDE terminal is only used for order data collection.

MDE terminal

This terminal is used for MDE processing (shift change, cyclic update, option of MDE recording of

data via machine interfaces). You can only activate this option in combination with the option "BDE

terminal".

MOC_TerminalConfiguration.docx

Version: 2.8.20820

Page 3 of 26

The area function is available for terminals of series CT 56x, CT 7xx and CT 8xx. You can disable

the  function  via  the  setting  Area  function  active  (see  section  Field  description  for  tab  "MF

Terminal Configuration

functions").

Notes

The operation modes “BDE terminal“ and “MDE terminal“ have a different function key assignment

for all BDE terminals except CT 76x and CT8xx (different label texts).

 Ab  CTWIN-Version  6.2.2.24  You  can  also  operate  the  terminals  configured  with  operation  mode

"BDE  terminal"  with  machine/workplace  assignment.  It  does  not  matter  if  the  assignment  is  for

single or group workplaces.

In  this  case,  the  assigned  machines/workplaces  are  displayed  on  the  terminal,  but  the  MDE

processing  is  not  performed  (shift  change,  cyclic  update,  option  of  MDE  recording  of  data  via

machine interfaces).

The terminal only runs MDE processing if the "MDE terminal" configuration is active.

PZE/ ZKS terminal

The  terminal  is  used  to  record  labor  time  and/or  for  access  control.  Note:  the  combination

BDE/MDE terminal and ZKS terminal is not possible. But the combination BDE/MDE terminal and

PZE terminal is possible.

CAQ terminal

The  terminal  is  configured  for  a  combined  operation  of  CAQ  and  BDE  and/or  MDE  terminal.  The

function key Inspect is added to the terminal. Inspection orders are generated, logged on or logged

off via shop floor data collection.

If the  BDE/MDE  operation  modes are disabled, the terminal  is configured for CAQ operation  only

and  inspection  orders  are  directly  generated,  logged  on  or  logged  off  using  the  inspection

requirement.

Cyclic loading time

The  specified  time  interval  is  used  to  regularly  reload  terminal  settings  that  might  have  been

changed. This setting is only relevant for PZE terminals and so-called DOS terminals.

Cycle duration of status messages

This field specifies the time interval in hours and minutes. The terminal sends status messages to

the HYDRA server at the specified interval.

IP address

The  terminal's  IP  address.  For  CTP-340  type  and  Kaba Benzing  terminals,  the  terminal  GID  and

DID  must  be  entered  after

the

IP  address,  separated  by  a  semicolon

(Example:

192.168.10.213;0105).  For  all  other  terminals,  the  IP  address  set  at  the  terminal  is  automatically

passed to the server and displayed in this field.

MOC_TerminalConfiguration.docx

Version: 2.8.20820

Page 4 of 26

Terminal Configuration

Note:

For  installations  with  multiple  systems  where  multiple  ILHydras  are  set  up,  each  GID

may  only  be  used  in  one  system.  Consequently,  a  terminal's  GID  must  be  changed  if

the terminal is reassigned from one system to another.

DHCP

If active, the terminal is configured  with a DHCP. The DHCP server assigns an IP address to the

terminal.

Company number/system number

In this field, the system number that is defined in the HYDRA basic settings can be overridden for

individual terminals.

Network port (can only be entered for PCC)

Communication  port required for data transmission to the shop floor server  PCC.EXE  and for the

processing of PDV mass data.

Barcode connection (can only be entered in CT541)

Specification of the barcode wand or scanner connection.

COMx:  as per local configuration file (all CTxxx terminals, except for CT541)

COM0:  no barcode unit connected (CT 541)

COM1:  Barcode connected to COM1 (CT 541)

With  terminal  type  CT541,  the  specification  COMx  has  the  same  effect  than  COM0,  because  the

terminal has no local configuration file.

Configuration flag 2

You can use this input field to control a customer-specific processing. This field should be empty by

default.

Master terminal (only with terminal type ST-300, M6 or VT4x)

Select the master terminal where the MBB terminals of type ST-300, M6 or VT4x are connected as

inferior sub-terminals.

Reader (only with terminal type ST-300, M6 or VT4x)

Number of reader in the sub-bus of the master terminal.

Field description for tab "Status"

Note: You cannot edit specific fields. These fields can only be edited using the administration function.

Status

Status of the terminal:

MOC_TerminalConfiguration.docx

Version: 2.8.20820

Page 5 of 26

Terminal Configuration

Last status message

Date and time of the terminal's last status message.

Status color

Color coding of the different statuses:

Red

Missing status message for more than twice the status cycle duration + 1 minute

Yellow  Missing status message for more than the status cycle duration + 1 minute.

Green

 Last status message sent less than status cycle duration + 1 minute ago

Gray

So far no status message from the terminal (for new terminals)

White

The status cycle duration is not set.

Status duration is not monitored.

Purple

The  terminal  responded  with  a  different  IP  address.  This  warning  is  displayed

if  two  terminals  are  running  with  the  same  terminal  number  or  if  a  terminal  was  given

a  different  IP  address.  This  check  is  not  performed  if  the  terminal  was  configured  with

DHCP (dynamic IP address). Via the option “Reset terminal no. /IP address alert" in the

Terminal administration, you can reset this warning.

The status cycle duration is entered in tab "General"  in field Cycle duration of status messages.

Note:

When  you  change  from  standard  time  to  daylight  saving  time,  the  clocks  are  put  one

hour  forward.  As  a  result,  terminals  are  displayed  in  yellow  or  red  because  the  last

status message was more than one hour earlier due to the time change. The display will

be correct again after the next terminal status message.

Last restart

Date and time the terminal program was last restarted.

Reboot

You  can  use  this  option  to  trigger  a  reboot  of  the  terminal.  This  setting  is  passed  to  the  terminal

when  the  next  status  message  is  sent.  This  option  is  automatically  reset  after  a  reboot  of  the

terminal.

Next reboot on

Date and time when the terminal program will be rebooted next.

Delayed by ... minutes

If a restart is scheduled for several terminals, you can specify a time in field "Delayed by"  , which

must elapse between the restarts of the different terminals. This reduces the network load.

MOC_TerminalConfiguration.docx

Version: 2.8.20820

Page 6 of 26

Terminal Configuration

Last loading of program

Date and time the terminal program was last loaded/installed.

Reload program

You can use this field to trigger a reloading of the terminal program. This identifier is automatically

reset after a completed installation process.

Last offline mode on

Date and time when the terminal was offline.

Number of local data records

Number of local data records that have not yet been transferred from the terminal to the server. If

the  terminal  is  online,  this  value  is  0.  If  the  terminal  was  offline  and  returns  to  online  mode,  the

number of local data records remaining is passed with each transfer.

Authorization

Last loading of authorizations

Date and time access authorizations were last loaded.

Reload authorizations

You  can  use  this  option  to  trigger  the  loading  of  authorization  data  for  the  terminal(s).  After

successful loading, this option is automatically reset. You can only enable this option with PZE and

ZKS terminals.

People with access authorization

Number of persons that are authorized to access at the terminal.

Other

Number of subsystems

Number of active subsystems

INI file download

If this option is set, the terminal reloads the INI files from the server on the next restart. The terminal

acknowledges the operation by resetting the option

.

INI file upload

If this option is set, the terminal uploads the INI files to the server on the next restart. The terminal

acknowledges the operation by resetting the option.

MOC_TerminalConfiguration.docx

Version: 2.8.20820

Page 7 of 26

Request diagnosis files

This  function  can  be  used  to  request  current  status  information  from  the  terminal  for  diagnostic

purposes.  The  files  are  stored  on  the  server  in  subdirectories  .\spool\spl2xxx  (xxx  =  terminal

Terminal Configuration

number) of the HYDRA installation.

Logging of dialog data

Terminal

Program

Name of the terminal program.

Version

Version of the terminal program.

Remote maintenance

If remote maintenance is installed on Windows terminals, it is displayed in this field. Currently, only

"VNC" remote maintenance is supported.

Activate remote maintenance

You can use this option to activate remote maintenance if installed remote maintenance software is

detected on the terminal.  The remote maintenance software on the terminal should be started  no

later  than  after  the  configured  status  cycle  duration  (cycle  duration  of  status  messages  in  tab

"General").  The  status  cycle  duration  is  entered  in  tab  "General"    in  field  Cycle  duration  of  status

messages.

IMPORTANT:

Activating remote maintenance can affect the terminal performance. After using remote

maintenance, disable the option "Activate remote maintenance".

Status of remote maintenance

D(isabled)

The remote maintenance software is not started.

Otherwise

The remote maintenance software is started on the terminal. The terminal can now

be remotely controlled using the VNC software.

MOC_TerminalConfiguration.docx

Version: 2.8.20820

Page 8 of 26

Terminal Configuration

Field description for tab "MF functions"

Processing

Area functions active

  Postings  can  be  made

for  any  workplaces,

i.e.

there

is  no

fixed  assignment  of

machines/workplaces to terminals. In the posting dialogs, the terminal normally prompts the user to

enter

the  machine/workplace  number.  This  way,  you  can  also

log  operations  on

to

machines/workplaces they were not scheduled for.

  There  is  a  fixed  assignment  of  machines/workplaces  to  terminals,  i.e.  you  can  only  make

postings for the assigned machines/workplaces.

Checking required

The terminals in HYDRA make validation checks when they are online. This option only controls the

behavior of the terminals when they are offline, i.e. when the LAN is not active (e.g. in case of cable

failure).

The BDE and MDE terminals in HYDRA can also work without server connection, because they are

equipped with a storage unit.

  In offline mode, terminals buffer all postings and send them to the server when the connection is

restored.  If  the  data  stored  contains  any  validation  errors,  the  data  is  no  longer  displayed  on  the

terminal screen. This data is stored in a log file on the server.

  In  offline  mode,  you  cannot  make  any  postings  because  the  terminal  insists  on  validation

checks.

Merged operations

If you enable the option "Merged operations",  you can merge several operations into one merged

operation (MOP) on the terminal.

Order processing using merged operations is useful if:

-  several smaller OPs are merged to form one operation (lower costs)

-  several operations are produced using one machine at the same time. The system cannot make

timely postings for the different OPs (e.g. during hardening in the metal industry or smoking in the

food industry).

You can only enable this function if the license for creating merged operations is available and if the

option "Process merged operations" is enabled in the basic settings. For further details, refer to the

documentation HYDRA Basic settings. This function activates the merged operation function on the

terminal and the indented options below this function.

MOC_TerminalConfiguration.docx

Version: 2.8.20820

Page 9 of 26

Terminal Configuration

Notes

If  you  want  to  be  able  to  create  merged  operations  for  specific  machines/workplaces,  you  must

enable the option "Logon of several OPs" in the respective machine/workplace configuration.

MOP functions for the terminal are only available with terminal types CT56x, CT73x and CT83x.

Incl. entry of quantities

  When  logged  off  or  interrupted,  the  terminal  additionally  records  actual  quantities  for  the

individual operations of the merged operation.

  When the merged operation is logged off, HYDRA records the target values as actual values.

Generation

Per person

In  case  of  a  person-related  merged  operation,  the  person  and  the  merged  operation  are  firmly

combined. You cannot log on additional persons to an existing MOP.

For each workplace, a placeholder OP is displayed for the MOP on the terminal: "MOP-<personnel

number>".

Per machine

In  case  of  a  machine-related  merged  operation,  several  persons  can  be  logged  on  to  a  merged

operation. Using the function "Log merged operation on" on the terminal, you can combine several

OPs into one merged OP (exactly one MOP per workplace is permitted).

Several persons can log on to this MOP – as it is the case with individual operations. If you interrupt

or log off the MOP, all persons logged on are automatically logged off. Quantities are posted and

times are distributed according to the HYDRA basic settings.

For  each  workplace,  a  placeholder  OP  is  displayed  for  the  MOP  on  the  terminal:  "MOP-

<workplace/machine number>".

Notes

The processing "Per machine" is only available on the HYDRA Windows CTWIN terminal and only

for so-called single workplaces (type=E). You may not use the option "per machine" in combination

with the option "Proportionate RPA posting in personnel postings" in the HYDRA basic settings (tab

BDE).

Data  can  NOT  be  edited  in  event  maintenance.  The  data  can  only  be  corrected  in  posting

maintenance!

MOC_TerminalConfiguration.docx

Version: 2.8.20820

Page 10 of 26

Terminal Configuration

Waiting period for advance logon of staff

Any logons of staff within the period of time specified (in minutes) before end of shift are "saved" as

advance logon for the next shift. The same applies for the logon of operations to terminals using the

setting Log person on with order: If an operation is logged on within this period of time before the

end of a shift, the operation will be logged on immediately, but the person will be logged on for the

next shift in advance.

This parameter is only evaluated for machines that are assigned directly. The value range is

between 0 and 45 minutes. If the time for the advance logon is set to 0 minutes, no advance logon

is possible.

Note:

If  a  person  is  "memorized"  (i.e.  the  person  is  logged  on  with  the  next  operation  logon)  when  an

operation  is  logged  on,  then  the  option  "Memorize  person"  takes  priority  and  the  person  is

immediately logged on when the operation is logged on (no advance logon of staff).

Label printing

You  can  use  the  function  "print  part  quantity"  on  the  HYDRA Windows  CTWIN  terminal  to  print  a

docket during order processing at a machine including text and barcode. The following information

can be printed on the docket: order number, article name, article number, machine and the partial

quantity produced.

To  activate  the  option,  you  require  the  license  of  the  additional  function.  For  further  information,

refer to the documentation Partial quantity documentation.

Ticket printing when goods receipt batches are recorded

OBSOLETE

MOC_TerminalConfiguration.docx

Version: 2.8.20820

Page 11 of 26

Terminal Configuration

Machine control

Connection

You use this option to activate a connected machine control

MSS as external I/O unit

Is set if the series CT-53x, CT-7xx and CT-8xx terminals are equipped with an external machine

interface.

MSS file interface

Is set if a file interface is used to communicate with the machine interface. Note: This function

requires the additional function HYD-DIM (file interface machines).

Internal I/O unit (CT-511/541)

Is set if series 51x or 54x terminals are used. These terminals have a limited internal machine

interface.

None or HYDRA PCC

To be set for terminals

- without an external machine interface

- of the older 50x series with an internal machine interface.

- CT 51x terminals with barcode device

- with connection via PCC.

Interfacing

Master terminal

You use this option to activate the master terminal function for terminals of the series CT 76x or CT

8xx. In this mode, the terminal operates the DS 100 sub-terminals as remote input stations. For

more details, refer to the documentation "Master terminal".

Engel interfacing

Connects to the Engel Monitoring System (EMS) made by Engel Schwertberg. In this mode,

quantities are normally transferred via EMS. No other devices are needed.

Krauss-Maffei interfacing

Connects to the Krauss-Maffei system.

None

This terminal has no interfacing.

Other settings

Show machine/OP

For terminals of the series CT-76x and CT-8xx, you can select how the machines are displayed: as

list (in tabular form) or as symbol.

MOC_TerminalConfiguration.docx

Version: 2.8.20820

Page 12 of 26

Terminal Configuration

Note:

If you make use of the additional MDE-LIN function, you can integrate the display of a line and the

assigned  aggregates.  For  more  details:  see  the  documentation  for  the  CT-76x  and  CT-8xx

terminals or the MDE-LIN documentation.

Time display

Defines  whether  times  are  displayed  in  normal  minutes  (HH:MM)  or  in  industrial  minutes  (HH,II)

(only possible with the relevant license).

Note:

The  display  on  the  MOC  requires  respective  settings  in  the  HYDRA  basic  settings.  See  also  the

documentation HYDRA basic settings, section General tab.

This setting has no effect on the formatting of data transferred via interfaces. For more information,

please refer to the corresponding interface documentation.

Field description for tab "Dialog control"

You  can  use  the  settings  listed  below  to  configure  separate  dialogs  for  the  different  terminals.  Note:

Specific settings only apply for specific terminal types.

For the Windows-based CTWIN terminal, the following settings affect the dynamic dialog configuration of

the terminals. If you disable an option here, the respective field is hidden in the terminal dialog. Example:

In the dialog "Change machine status", the field "Badge number" is deleted so that no validation check is

made  for  the  person.  Now,  the  option  mentioned  above,  "Personnel  verification  for  HYDRA-MDE

functions", can no longer affect this dialog.

Please keep in mind that the AIP shop floor terminal does not support the processing that is required to

hide fields using this configuration. This is true for the options marked with *.

Machine *

At  shop  floor  terminals,  you  can  make  postings  for  any  workplace.  Unlike  machine  terminals,  no

machines are permanently assigned to the shop floor terminals. The disadvantage is, however, the

increased amount of effort required for posting,  because the machine number must be entered in

the posting dialogs.

  In  the  posting  dialogs,  the  terminal  prompts  the  user  to  enter  the  machine  number.  This  way,

operations can also be posted for machines they were not planned for. You can disable this input, if

you perform operation-related postings.

  The  input  of  a  machine  number  is  suppressed  to  optimize  the  dialog  steps.  The  operation  is

always  logged  on  to  the  planned  machine.  PPS  and  technical  planning  work  must  be  extremely

accurate; it is not possible to replan on the terminal. The following dialogs are affected:

  Log operation on (dialogs beginning with A_AN or A_P_AN)

MOC_TerminalConfiguration.docx

Version: 2.8.20820

Page 13 of 26

Terminal Configuration



Interrupt operation (dialogs beginning with A_UN)

  Log operation off (dialogs beginning with A_AB)

  Partial confirmation/upload (dialogs beginning with A_TR)

Machine status *

  When  operations  are  logged  on  in  the  standard  dialogs  (dialogs  beginning  with  A_AN  or

A_P_AN), the terminal prompts the user to enter a machine status so that HYDRA BDE can record

times for different statuses (and with this, resource performance accounts) similar to terminals with

MDE function.

  Entry of a machine status is not required. The reason for this is to optimize the dialog steps. The

function can be used for single workplaces if only one status is used (e.g. production). It is best to

use  this  option  for  data  collection  at  group  workplaces,  because  no  status  is  recorded  for  these

workplaces.

Order type *

In the standard dialogs

  Log operation on (dialogs beginning with A_AN or A_P_AN)



Interrupt operation (dialogs beginning with A_UN)

  Log operation off (dialogs beginning with A_AB)

  Partial confirmation/upload (dialogs beginning with A_TR)

the  terminals  prompt  the  user  to  enter  the  order  type  when  the  order/OP  number  is  entered

manually.  In  case  of  barcode  entries  or  posting  via  sequencing  list,  the  terminal  receives  the

information automatically.

  In  the  posting  dialogs  the  terminal  prompts  the  user  to  enter  the  order  type.  This  way,  the

terminal  requests  different  information  depending  on  the  order  type  (e.g.  no  quantity  input  for

overhead cost orders)

  There  is  no  need  to  enter  an  order  type.  The  terminal  then  subsequently  requests  the  dialog

steps for production orders.

Order sequencing list *

Only  relevant  for  terminals  of  the  CT  5xx  and  CT  73x  type  series.  In  case  of  Windows-based

terminals, the sequencing list is always available.

  A sequencing list is provided on the terminal when an OP is logged on.

  Sequencing list not available.

MOC_TerminalConfiguration.docx

Version: 2.8.20820

Page 14 of 26

Terminal Configuration

Log users on with order

  If  a  person

logs  an  operation  on,

this  person

is  automatically

logged  on

to

the

machine/workplace  with  the  operation.  If  the  person  cannot  be  logged  on  in  the  process,  the

operation is not logged on either.

  Operations and staff are logged on separately.

Entry of quantities based on orders*

You  use  this  option  to  specify  whether  yield  and  scrap  must  be  entered  when  an  operation  is

interrupted  or  logged  off  and,  as  a  result,  whether  operation  related  quantities  are  recorded.  In

addition, the options Yield (if the input of yield is enabled) and Scrap quantities (if the input of scrap

is enabled) must be set to .

Note:

With MDE terminals, the configuration for the recording of yield and scrap is made here, but it must

be defined in more detail in the workplace/resource configuration.

Entry of quantities based on staff *

You use this option to specify whether yield and scrap must be entered when a person is logged off

and, as a result, whether quantities based on staff are recorded. In addition, the options Yield (if the

input of yield is enabled) and Scrap quantities (if the input of scrap is enabled) must be enabled.

Note:

With MDE terminals, the configuration for the recording of yield and scrap is made here, but it must

be defined in more detail in the workplace/resource configuration.

Yield *

  Enables the manual input of yield on the BDE terminal.

  Yield is not entered manually.

Scrap quantities *

  Enables the manual input of scrap on the BDE terminal.

  Scrap is not entered manually. The respective field on the Windows CTWIN terminal is hidden

in the following dialogs:



Interrupt operation (dialogs beginning with A_UN)

  Log operation off (dialogs beginning with A_AB)

  Partial confirmation/upload (dialogs beginning with A_TR)

  Log person off (dialogs beginning with P_AB)

The field "Scrap reason" is also hidden.

MOC_TerminalConfiguration.docx

Version: 2.8.20820

Page 15 of 26

Terminal Configuration

Scrap reasons *

  The MDE/BDE terminal prompts the user to  enter a  scrap reason  if an operation  with a scrap

quantity greater than 0 is interrupted or finished.

In  addition,  a  validation  check  is  made  to  identify  if  the  scrap  reason  entered  is  defined  in  the

HYDRA database. If not, the posting is rejected with a validation error (unknown scrap reason).

  Scrap reasons are not recorded. The respective field on the Windows CTWIN terminal is hidden

in the following dialogs:



Interrupt operation (dialogs beginning with A_UN)

  Log operation off (dialogs beginning with A_AB)

  Partial confirmation/upload (dialogs beginning with A_TR)

  Log person off (dialogs beginning with P_AB)

Interruption reasons *

You  use  the  option  "Interruption  reason"  to  set  a  machine  status  when  the  order  is  interrupted  or

logged off.

  The  MDE/BDE  terminal  prompts  the  user  to  enter  an  interruption  reason  if  an  operation  is

interrupted or finished.

In  addition,  a  validation  check  is  made  to  identify  if  this  interruption  reason  (machine  status)  is

defined for the machine in the HYDRA database. If not, the terminal function is not performed. The

interruption reason is included in the interruption or completion record of the operation.

  The interruption reason for interrupted or finished orders is not recorded. In the dialogs



Interrupt operation (dialogs beginning with A_UN)

  Log operation off (dialogs beginning with A_AB)

  Partial confirmation/upload (dialogs beginning with A_TR)

on the Windows CTWIN terminal, the relevant field is hidden.

"Log person off" query *

  When  an  operation  is  interrupted  or  logged  off  on  the  terminal,  a  prompt  appears  on  DOS

terminals  asking  whether  all  logged  on  persons  should  equally  be  logged  off  or  not.  On  the

Windows CTWIN terminal, the input field "Memorize person" is enabled for input and preset with

"J" - Yes. If you confirm (enter "J"), the person is memorized until the next operation is logged on

to this workplace. The person does not need to log on each time the operation changes.

  When an operation is interrupted or logged off, all persons logged on are logged off, and they

are not automatically logged on again when a new order is logged on.

MOC_TerminalConfiguration.docx

Version: 2.8.20820

Page 16 of 26

Terminal Configuration

Notes

If a person logs on to a different workplace, then a check is run to identify if the person is

memorized. If so, the "memorize person" is deleted if one of the following combinations is enabled

for the person in the HR master data configuration, tab Shop floor data:

Log on to several workplaces

Automatic OP change

or

Log on to several workplaces

Automatic OP change

or

Log on to several workplaces

Automatic OP change

With change of shifts, the memorized persons are deleted.

Personnel verification for BDE functions *

This option affects the following dialogs:

  Log operation on (dialogs beginning with A_AN)



Interrupt operation (dialogs beginning with A_UN)

  Log operation off (dialogs beginning with A_AB)

  Partial confirmation/upload (dialogs beginning with A_TR)

  Output batch change (dialogs beginning with CA_WL)



Input batch postings (dialogs beginning with CE)

This  option  does  not  affect  functions  like  Log  person  on/off,  Log  on/off  merged  operations  or

Change target quantity, for example.

  In these dialogs, the terminal prompts the user to enter the staff badge number in order to check

the person's authorization or to log the person on immediately if the option Log users on with order

is enabled.

  Entry  of  staff  badge  number  is  not  required.  No  validation  check  is  performed.  It  is  no  longer

possible to use the function Log users on with order.

When  group  workplaces  are  used,  the  above-mentioned  dialogs  are  used  and  the  staff  badge

number is then a mandatory input field. For that reason, you must activate the input of staff badge

numbers for group workplaces.

Personnel verification for HYDRA-MDE functions *

This option affects the following machine-related terminal dialogs:

MOC_TerminalConfiguration.docx

Version: 2.8.20820

Page 17 of 26

Terminal Configuration

  Change status (dialog M_MST)

  Change target cycle (dialog M_SZY)

  Change partitioning (dialog M_TLG)

  In these dialogs, the terminal prompts the user to enter the staff badge number in order to check

the  person's  authorization.  This  field  also  activates  the  input  of  a  staff  badge  number  for  the

Change status function on BDE terminals (shop floor terminals).

  Entry of staff badge number is not required, no validation checks are run.

Operator position *

This function is only available on the Windows CTWIN terminal.

Enable this option, if you want to enter an operator position when you log on staff (dialog beginning

with  P_AN)  or  when  you  make  a  combined  logon  of  order/staff  (dialog  beginning  with  A_P_AN;

option Log users on with order).

Requirement: You have configured the operator positions that are available at the workplace.

The operator position entered is saved in the personal log record (record type B).

Wage/premium indicator *

This function is only available on Windows CTWIN or AIP terminals.

Enable  this  option  if  you  want  to  enter  a  wage/premium  indicator  when  you  log  on  staff  (dialog

beginning  with  P_AN)  or  if  you  make  a  combined  logon  of  order/staff  (dialog  beginning  with

A_P_AN; option Log users on with order).

Requirement: You have configured the premium indicators that are available at the workplace..

The wage/premium indicator entered is saved in the personal log record (record type B).

Field description for tab "HR functions"

You  use  the  PZE  terminal  to  record  the  labor  times  of  employees,  i.e.  the  times  of  clocking-in  and

clocking-out. In addition, employees can access information about their current account balances on the

terminal.

The Clocking authorizations specify which employees may clock at which terminals.

MOC_TerminalConfiguration.docx

Version: 2.8.20820

Page 18 of 26

Tab "Parameters"

Terminal Configuration

Operation mode

The operation mode specifies the terminal behavior. Three operation modes are available:

Automatic status

Automatic  status.  The  system  automatically  identifies  if  the  clocking  is  a  clocking-in  or  a

clocking-out  using  the  current  attendance  status.  It  is  not  necessary  to  press  the  IN  or  OUT

key  on  the  terminal.  The  automatic  can,  however,  be  overridden  by  pressing  the  IN  or  OUT

key. For example, this is useful if employees know that they forgot to clock. In case of postings

of  absence  reasons  (e.g.  business  trip),  the  system  automatically  identifies  whether  it  is  an

advance clocking (OUT with reason) or a subsequent clocking (IN with reason).

If Validation check for status sequence  is activated in this operation mode, then the status is

queried online on the server for each clocking and displayed on the terminal.

Manual status switching

You  manually  switch  between  IN  and  OUT  by  pressing  the  respective  key.  In  this  operation

mode,  you  can  use  the  function  keys  to  enter  absence  reasons  (e.g.  a  business  trip)  via

advance/subsequent  clockings.  If  you  have  used  a  key,  the  terminal  automatically  switches

back to IN or OUT. The terminal then uses the option pressed last.

MOC_TerminalConfiguration.docx

Version: 2.8.20820

Page 19 of 26

Terminal Configuration

Access terminal

Access  terminal  without  PZE  function.  Access  authorizations  are  checked  using  the

configurations in the access control system (ZKS).

Cyclic loading

This  option  specifies  the  time  for  the  cyclic  loading  of  the  terminal's  access  authorizations,

messages and PZE properties. Durations entered that are less than one hour are automatically set

to  one  hour  by  the  terminal.  On  terminals  manufactured  by  Kaba  Benzing  and  on  CTP-340

terminals, the value entered in this field is interpreted as the time of the day.

Relay time

This option specifies the time that the green or red access lights are displayed.

Return time

You use this field to specify the time that the terminal waits before returning to default status (auto

status, for example) after a key is pressed.

Display duration of info

Time in seconds specifying how long the account status information is displayed on the terminal.

Plausibility check

If  the  plausibility  check  is  defined  for  the  status  sequence,  then  the  system  checks  with  each

clocking  whether  the  clocking  sequence  is  respected  (IN  after  OUT,  OUT  after  IN).  In  operation

mode  "Automatic  status",  this  setting  has  a  different  meaning.  After  an  automatic  status  clocking,

the status is identified in the server and then displayed on the terminal. This check is only available

for type CT-38x terminals.

Default status

The "Default status" field can be used to define, to which status the terminal automatically returns.

For example, you can specify the default status "Break" for a break terminal (next to the cafeteria).

The default status is only processed in operation mode "Automatic status". The text to be displayed

on the terminal is entered in the field Text for default status.

In  operation  mode  Automatic  status  and  with  activated  plausibility  check  of  the  status  sequence

and default status "Break", the terminal identifies the current status of the person by means of an

online  query  on  the  server  and  outputs  "Beginning  of  break"  or  "End  of  break"  depending  on  the

respective status.

Show date of latest evaluation

If this option is enabled, the date of the person's latest evaluation is also displayed in the account

balances information on the terminal. This function is not available for all terminal types.

A  maximum  of  four  accounts  can  be  displayed  on  terminals  of  type  CTP-340  or  Kaba

Benzing  terminals.  If  you  want  to  display  the  date  of  latest  evaluation,  you  may  only

MOC_TerminalConfiguration.docx

Version: 2.8.20820

Page 20 of 26

Terminal Configuration

configure three accounts for the display on the terminal.

Show recent clocking records

An  employee's  clocking  records  can  be  displayed  for  the  current  day  and  the  previous  day.

The last clocking records (maximum 13 records) are displayed on the CT-36x and CT-56x terminals

if  the  BREAK  key  is  pressed  while  information  is  being  displayed.  On  terminals  of  type  CT-38x,

there is a separate button for the display of account balances.

Texts for key assignment

These fields specify the text that is displayed after the respective key has been pressed. If no text is

entered, the message "Key not occupied" is displayed. The meaning of the keys 1 to 5 is defined:

IN, OUT, Break, Information display and Message. These texts cannot be changed.

There is no break key on CTP-340 type or Kaba Benzing terminals. You can  configure

one of the two absence reason keys as Break key. Enter the absence reason "PAU" and

the text to be displayed for this key.

Text for default status

The text to be displayed for the selected default status may be defined here.

Texts for absence reasons

You can specify an Absence reason for the fields "absence reason 1" to "absence reason 4". Enter

the text to be displayed on the terminal behind the absence reasons. If you do not use the option

Advance/subsequent clockings for absence reasons, these fields remain empty.

If  you  want to enter more than 4 absence reasons on the terminal,  you can use  a list of absence

reasons to this end (only with CT-36x and CT-38x). Configure the list of absence reasons using the

entry  "FGL"  in  one  of  the  fields  Absence  reason  1  to  Absence  reason  4.  The  list  of  absence

reasons shows all absence reasons, which include the company of the person in the configuration

of  the  absence  reasons,  or  where  the  field  Company  is  empty.  If  you  select  the  function  key  and

scan  your  badge, the  list  is displayed on the terminal Select an  absence reason from the list and

confirm pressing OK. The absence reason is posted.

With terminals of type CTP-340, the configuration of absence reason key 1 is  used for

the blue key with the suitcase and the configuration of absence reason key 2 is used for

the  yellow  hash  key.  The  CTP-340  does  not  process  the  configuration  of  the  absence

reason keys 3 and 4.

Cost center

If you enter a cost center in this field, all clocking records performed on this terminal are posted to

the specified cost center. For this field, you require the license PZW-KSB (cost center posting).

MOC_TerminalConfiguration.docx

Version: 2.8.20820

Page 21 of 26

Terminal Configuration

Tab "Show info"

Info from, to

The  info  key  on  the  PZE  terminal  is  enabled  within  the  periods  of  time  specified.  Employees  can

then access their current time accounts on the terminal. Up to five periods can be entered.

Field description for tab "QM functions"

On the CAQ terminal, you can perform inspections and record measured values.

The inspection data collection is configured in tab "QM functions".

Area type

The selection field Area type assigns the higher-level data area to the terminal, which contains the

inspection  steps  to  be  logged  on  (for  example  in-production  inspection,  goods  receipt  inspection,

initial sample inspection, etc.). In the default configuration, this field is empty.

Area

This  field  specifies  the  area  (production,  goods  receipt,  goods  issue,  etc.),  which  contains  the

inspection steps to be logged on. In the default configuration, this field is empty.

Input for

Selects the failure analysis types from the catalog of failures:

Input only allowed if inspection station matches

This option enables the filtering of inspection steps that can be logged on to the inspection station

specified.

Inspection station

You can only log on inspection steps that match the inspection station specified here. Enable the

option Input only allowed if inspection station matches if the inspection station specified in this field

must be respected.

MOC_TerminalConfiguration.docx

Version: 2.8.20820

Page 22 of 26

Terminal Configuration

Attributive inspection as pass/fail inspection

For  attributive  characteristics,  the  terminal  displays  the  buttons  Pass  and  Fail.  The  failure  itself  is

not entered.

This configuration option is not relevant if AIP-QM terminals are in use.

Check all characteristics immediately when order is logged on

When  the  inspection  order  is  logged  on,  all  characteristics  are  set  to  status  Due  and  must  be

inspected in the period of time specified for the respective inspection (lead time).

This configuration option is not relevant if AIP-QM terminals are in use.

Show measured values of this machine/inspection station only

The terminal can only display measured values that are assigned to the same machine where the

inspection order is logged on.

This configuration option is not relevant if AIP-QM terminals are in use.

Identification of inspector before entering measured values (if not set)

If the inspector’s identification number is not set in the Inspector ID field, the inspecting person must

identify themselves with each measured value entered.

Only if inspector is unknown

No  inspector  identification  is  required  if  the  inspecting  person  was  registered  with  the  inspection

order.

This configuration option is not relevant if AIP-QM terminals are in use.

Inspector identification required before opening inspection dialog

The  inspecting  person  must  identify  themselves  before  opening  the  inspection  dialog.  The

inspecting person is then set for the complete inspection.

Only if inspector is unknown

No  inspector  identification  is  required  if  the  inspecting  person  was  registered  with  the  inspection

order.

MOC_TerminalConfiguration.docx

Version: 2.8.20820

Page 23 of 26

Terminal Configuration

This configuration option is not relevant if AIP-QM terminals are in use.

Input of quantities

You can use this option to manually confirm/upload quantities.

This configuration option is not relevant if AIP-QM terminals are in use.

Logging inspectors on and off

The inspecting persons must always log on and off with the inspection order.

This configuration option is not relevant if AIP-QM terminals are in use.

Automatic opening of defects recording

You use this option to specify the conditions that trigger an automatic recording of a failure.

This field is not relevant if AIP-QM terminals are in use.

Field description for dialog "Terminal administration"

You use the dialog Terminal administration (toolbar) to activate changed terminal settings.

Field description

Terminal from, to

Use these fields to specify the terminals where the settings are to be changed. The "from" and "to"

fields  are  preset  with  the  number  of  the  terminal  that  was  highlighted  in  the  list  when  calling  this

function. The fields in the dialog show the settings for this terminal.

Activate terminal

This field is used to set the terminal to active or inactive. If you define terminals as inactive in the

selection panel, the respective terminals are hidden in the table. The next time a terminal status is

sent, the terminal is automatically reactivated.

MOC_TerminalConfiguration.docx

Version: 2.8.20820

Page 24 of 26

Terminal Configuration

Reboot

Use this option to trigger a reboot of the terminal(s). This setting is transferred to the terminal when

the terminal sends the next terminal status. This option is automatically reset after a reboot of the

terminal.

Next reboot on

You can specify a date (date and time) for the restart.

The point in time for the next restart and the  option  below  "delayed by ... minutes" are

only used if the "reboot" option is set.

Delayed by ... minutes

If you plan a restart of several terminals, you can use this input field  to specify a time that delays

the restarts of the individual terminals. This reduces the network load.

Reload program

You can use this option to trigger the installation of a new version of the terminal program. This field

is  automatically  reset  after  the  load  process  is  complete.  Because  installation  of  a  new  version

requires a reboot, the times specified in the option "Reboot" can be used to control when the load

processes are scheduled.

Reload authorizations

You  use  this  option  to  schedule  the  loading  of  authorization  data  in  advance  for  the  selected

terminal(s). This option is only set with PZE and ZKS terminals and transferred to the terminal when

the  terminal  status  is  sent  the  next  time.  This  field  is  automatically  reset  after  the  authorizations

have been fully loaded.

Reset terminal no. /IP address alert

If you activate this option, the terminal number/IP address alert is reset for the terminal(s).

Request diagnosis files

This  function  can  be  used  to  request  current  status  information  from  the  terminal  for  diagnostic

purposes.  The  files  are  stored  on  the  server  in  subdirectories  .\spool\spl2xxx  (xxx  =  terminal

number) of the HYDRA installation.

Logging of dialog data

If  a  value  between  1  and  5  is  entered  in  the  Logging  field,  the  server  logs  the  dialogs  that  the

terminal sends. The entry 0 disables the logging.

Value

Server options

Meaning

0

1

2

D+

D+t

No trace output

Simple trace output

Simple trace output with time stamp

MOC_TerminalConfiguration.docx

Version: 2.8.20820

Page 25 of 26

Terminal Configuration

Value

Server options

Meaning

3

4

5

D+t -x

D+a

D+a -x

Trace output with time stamp and Explain is active

All trace options are active

All trace options are active and Explain is active

6 - 9

None

No trace outputs

The options are enabled/disabled with the next cyclic terminal status.

MOC_TerminalConfiguration.docx

Version: 2.8.20820

Page 26 of 26

