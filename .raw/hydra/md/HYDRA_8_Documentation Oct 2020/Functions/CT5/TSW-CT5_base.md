Software for CT-5xx Terminals

1  Software for CT-5xx Terminals

1.1  The Terminal CT-5xx

 Screen / Display

 Soft keys ( S1 ... S4 )

 Function menu

 Numeric key pad (0 .. 9 )

 Escape   and   enter key

1.2  Data input at the terminal

There  are  two  ways  of  entering  data.  If  a  barcode  reader  is  connected  to  the  terminal,  staff

badges,  machine  numbers,  etc.  can  be  scanned.  In  addition,  it  is  also  possible  to  enter

everything  using  the keyboard. This  is  necessary,  if the  barcode scanner  is  unable to read or

the data to be scanned is not available as barcode. If possible, a sequencing list is offered as an

alternative to manual input. From this list, the required input can be selected with ease.

TSW-CT5_base.docx

Version: 1.0.1362

Page 1 of 37

1.2.1  Overview of input options

Software for CT-5xx Terminals

badge

Input field

Input – Medium
1 2 3 maximum of 16 characters
  
4 

OP number
Status number
Staff
number
Yield /   total
quantity
Scrap quantity
Scrap reason
Partitioning
Target cycle
Please note:
As  of  "CTLD  V#  6.5.26  21.06.04"  staff  badge  numbers  may  also  be  input  using  a  connected
LEGIC reader.
As in this case only a "serial interface (Comport)" is available, all other input options using bar
code readers (OP number, status number) are no longer possible.
Special characters "-" or letters cannot be entered via the keyboard.


 





1 = Input by barcode reader

2 = Input by keyboard

3 = Selection by sequencing list

4 = Input by Legic reader

TSW-CT5_base.docx

Version: 1.0.1362

Page 2 of 37

Software for CT-5xx Terminals

2  Terminal display

BIOS identification: included as of the versions ctld.exe 7.2.18 and cfg.exe 2.03

When starting the programs a message

about the included device BIOS is output.

Message for old generations of the device:

 Unit BIOS INFO

 BIOS:ADNP1486

Message for new generations of the device:

Unit BIOS INFO

 BIOS:ADNP1520

The terminal only works as a machine terminal.

Characteristics of a machine terminal:

-  Only machine data collection (MDE) is possible for this machine.

-  The assignment of keys has been predefined for data collection close to machines.

2.1  Description of display functions

Network access:

Shows whether there is currently a network connection (LAN access):

.

#

=

%

Currently, there is no network connection (no network access)

Network connection is currently available (network is accessed)

A queue is currently being transferred

The terminal is OFFLINE

Data is shown in the individual menus (e.g. machine menu) top left.

Brief information on machines:

Informs about the status of machines.

  Machine status

Current machine status of the machine (e.g. "STAFF SHORTAGE“ )

An active production lock is displayed, as follows.

( e.g. "Setup    [PSP]“ )

TSW-CT5_base.docx

Version: 1.0.1362

Page 3 of 37

Software for CT-5xx Terminals

  Machine quantities (for the current shift)

Yield and scrap quantity

Order information:

Shows the order logged on to the machine. If several orders are logged on to the machine,

the "ESC" key can be used to show the next order.

  Order number

Order/operation currently logged on to the machine

  Article number

Article number of the displayed operation

  Order quantities

Yield + scrap quantity of the displayed operation

Information line:

Shows processing messages or notes on the data memories' current fill level and, possibly

information on the index/number of operations logged on to the machine.

  Processing message or note.

(e.g. "invalid input“, .. )

  Shows the fill level of the data memory

(e.g. "0002 / 0.5 %“ )

Important note:

As long as the circular buffer includes data, all other postings are carried out

OFFLINE, i.e. validation checks are not performed.

  Possibly shows the index and number of registered operations

The operations view can be switched by clicking the "ESC" key.

( e.g. "02/03“)

Please note:

This dialog is not shown if only one operation is active.

TSW-CT5_base.docx

Version: 1.0.1362

Page 4 of 37

Software for CT-5xx Terminals

2.2  Function menu

Key

Machine

Operation

Person

Info

Display

Description

Soft

key

S1
S2
S3
S4
S1
S2
S3
S4
S1
S2
S3
S4
S1
S2
S3

S4

STAT
ZYKL
TLG
---
A.AN
A.UN
A.TR
A.AB
P.AN
P.AB
P.AG
---
MINF
AINF
AZNF

PINF

Change status
Change target cycle
Change partitioning
free
Log order/operation on
Interrupt order/operation
Partially upload order/operation
Log order/operation off
Log person on
Log person off
A person's orders/operations
free
Machine information
Information on orders/operations
Additional information on
orders/operations
Staff logged on

TSW-CT5_base.docx

Version: 1.0.1362

Page 5 of 37

Software for CT-5xx Terminals

3  Standard functions

3.1  The machine menu

The below figure shows the main screen if the "machine menu" is enabled.

.   03.01.08 16:48:20
Mst:Gener. malfunction
G:  0       A: 0
OP: 531000000 0020
Art.:Material 4711 /80 /
Y:  200     S: 30

 STAT CYCL PART_ ____

3.1.1  Change of the machine status

A  new  status  is  assigned  to  a  machine  by  clicking  the  key  <S1  =  STAT>  in  the  <Machine>

menu. This is required, when the machine is being set up or a malfunction has occurred. The

required data are:

Machine,

Status number,

Staff badge number (optional).

TSW-CT5_base.docx

Version: 1.0.1362

Page 6 of 37

When starting the function, the terminal outputs the following prompt:

Software for CT-5xx Terminals

[ Change mach. status ]
 MachNo: <531>
 MachStatus: 99__
MTxt: <Gener. malfunction
 BadgeNo: ____

 _<=_ _Up_ _<╝_ LIST

A machine status should be entered if the terminal automatically identifies the occurrence of a

malfunction (see also Operating signal and Cycle time monitoring).

In the machines status "NOT ASSIGNED" the relay "machine lock" is activated if an applicable

channel  configuration  is  given  in  the  machine  label.  By  entering  the  malfunction  reason  once

more,  it  is  possible  to  confirm  or  finish  the  current  malfunction  (e.g.  changing  from  setup  to

startup).

Please note:

-

  Machine statuses can also be entered by scanning a barcode from the machine status list,

without having to start the function "change status" beforehand. Then the terminal requests

inputting the staff badge number, provided this has been configured for the terminal.

-

It  is  possible to switch from  one  machine  status  to the  next,  unless  the  terminal  is  in the

"production" status.

-

The  number  keys  <1..9>  can  also  be  used  to  open  a  machine  status  dialog  in  the  main

screen.

-

If in the function “change status” of the input field "Mst:“ the key <S4=LIST> is pressed,

machine statuses can also be assigned from a list:

TSW-CT5_base.docx

Version: 1.0.1362

Page 7 of 37

Software for CT-5xx Terminals

CT-54x terminal :

selection of the machine status

STATUS LIST    01/03
  2 SETUP
  3 STAFF SHORTAGE
 99 GENER. MALFUNCTION

 ____ _Up_ _Dn_ ____

3.1.2  Modification of the target cycle

The machine's target cycle can be changed by clicking the key <S2 = ZYKL> in the <Machine>

menu.

[ Change CYCL ]
     MachNo: <531>
Act.cycle/1000: <5100>
Targ.cycle/1000: 5400____
     BadgeNo: ____

 _<=_ _Up_ _<╝_ ____

"Act.cycle/1000“ corresponds to the actual time in seconds for 1000 machine cycles.

"Targ.cycle/1000“ corresponds to the target time in seconds for 1000 machine cycles.

It  might  be  required  to  confirm  the  modification  by  inputting  the  staff  badge  number,  provided

this  has  been  configured  for  the  terminal.  The  staff  badge  number  may  either  be  entered  by

using the barcode or keyboard.

TSW-CT5_base.docx

Version: 1.0.1362

Page 8 of 37

Software for CT-5xx Terminals

3.1.3  Change of partitioning

The machine's partitioning can be changed by clicking the key <S2 = TLG> in the <Machine>

menu.

[ Change PART ]
MachNo: <531>
Part: 1_______
BadgeNo: ____

 _<=_ _Up_ _<╝_ ____

"Tlg“/"Part" stands for the tool partitioning of a machine cycle.

(i.e. the number of items produced by a machine stroke/production cycle)

It  might  be  required  to  confirm  the  modification  by  inputting  the  staff  badge  number,  provided

this  has  been  configured  for  the  terminal.  The  staff  badge  number  may  either  be  entered  by

using the barcode or keyboard.

Please note: if several OPs are logged in, the target cycle and partitioning of the OP that has

been logged on at last, will be taken over.

TSW-CT5_base.docx

Version: 1.0.1362

Page 9 of 37

Software for CT-5xx Terminals

3.2  The order menu

The below figure shows the main screen if the "order menu" is enabled“.

.   03.01.08 16:48:20
Mach.Stat:GENER. MALFUNCTION
Y:  0       S: 0
OP: 531000000 0020
Art:Material 4711 /80 /
Y:  200    S: 30
                01/02
 A.AN A.UN A.TR A.AB

Provided  that  more  than  one  OP  is  logged  on  to  the  machine,  the  information  line  shows  a

respective note about the current index and the number of OPs logged in. Clicking the <ESC>

key enables switching between OPs.

At  the  terminals  data  is  generally  posted  onto  operations  of  an  order.  The  order  number

assigned  by  the  PPS  system  and  the  operation number  together  form  the  BDE  order  number

(field "OP:_").

The order or operation types that are possible in HYDRA can be found in the glossary about the

BDE manual.

TSW-CT5_base.docx

Version: 1.0.1362

Page 10 of 37

Software for CT-5xx Terminals

3.2.1

Log an OP on

A new operation is logged in by using the key <S1 = A.AN> in the <order> menu. This starts

posting of the relevant run times and quantities to individual time accounts for the OP.

number

The required data are:

Order

Order type (optional)5,

Machine status (optional),

Staff badge number (optional).

 [ Log OP on ]
MachNo: <531>
 OP: ___________
BadgeNo: ____
Mach.Stat: 3___
MTxt: <STAFF SHORTAGE

 _<=_ _Up_ _<╝_ LIST

Information on the machine

When an operation is logged on, the machine which the OP is logged on to is entered in

the  “machine/workplace”  field  in  the  backlog  of  orders.  If  the  operation  was  previously

detailed  planned  for  a  (possibly  different)  machine,  this  previous  machine  is  now

overwritten. An implicit rescheduling of the OP thereby takes place.

3.2.1.1

Special case with OFFLINE logon

If an OP is logged on while there is no connection to the server, the necessary target data of the

operation  must  also  be  input.  In this  case,  the terminal  also  requests  input  of  partitioning  and

target cycle after the actual dialog steps have been filled out.

5 optional:  The  input  depends  on  the  terminal  configuration.  The  relevant  configurations  can  be  made  via  the
HYDRA console (ADE menu: Master data  Terminal configuration  Terminal configuration; tab Dialog
control in the editing dialog). Further information can be found in the BDE documentation entitled Cross-
system functions and configurations in HYDRA.

TSW-CT5_base.docx

Version: 1.0.1362

Page 11 of 37

The below-mentioned data are required additionally for an offline registration:

Software for CT-5xx Terminals

target cycle,

partitioning.

[ OFFLINE – A.AN ]
     MachNo: <531>
     Part: 1_______
Act.cycle/1000: <5100>
Targ.cycle/1000: 5400____

 _<=_ _Up_ _<╝_ LIST

3.2.2

Interrupt an OP

An operation is interrupted by using the key <S2 = A.UN> in the <order> menu. This function is

used  to  stop  the  order  related  recording  of  times  and  quantities.  The  reasons for  cancellation

include quantity uploads, shift changes or the production-related interruption of an operation.

The procedure for interrupting an OP is the same as for logging it off (see section "3.2.4 log OP

off"). However, an interrupted operation can be logged on again at any time.

[ Interrupt OP ]
Mach.No.: <531>
 OP: 51100000010
BadgeNo.: ____
Total: ________
Scrap: ________
 _<=_ _Up_ _<╝_ LIST

TSW-CT5_base.docx

Version: 1.0.1362

Page 12 of 37

Software for CT-5xx Terminals

3.2.3  Partial upload of an OP

A  partial  upload  can  be  performed  for  an  operation  by  using  the  key  <S3  =  A.TR>  in  the

<order> menu. This function enables a partial quantity of the order to be confirmed/uploaded,

without interrupting or ending the running OP. This is only possible, if it is not an overhead cost

OP.  The  quantities  are  assigned  to  the  relevant  OP  as  well  as  to  the  person  sending  the

confirmation/upload.

These data need to be entered:

Machine

Order number,

Staff badge number (optional),

Yield/total quantity (optional),

Scrap quantity (optional),

Scrap reason (optional).

 [ Partial upl. OP ]
Mach.No: <531>
 OP: 51100000010
BadgeNo: ____
Total: ________
Scrap: ________

 _<=_ _Up_ _<╝_ LIST

TSW-CT5_base.docx

Version: 1.0.1362

Page 13 of 37

Software for CT-5xx Terminals

3.2.4

Log OP off

An operation is logged off by using the key <S4 = A.AB> in the <order> menu6. Thus, posting

of run times and quantities is finished for the OP. Once being logged off, the OP can no longer

be logged on. These data need to be entered:

Machine,

Order number,

Staff badge number (optional),

Yield/total quantity (optional),

Scrap quantity (optional),

Scrap reason (optional),

Interruption reason/machine status (optional),

Input "Pmk“  "memorize persons“ (optional).

[ Log OP off ]
Mach.No: <531>
 OP: 51100000010
BadgeNo: ____
Total: ________
Scrap: ________

 _<=_ _Up_ _<╝_ LIST

6 Please note: This is only possible, if it is not an overhead cost OP.

TSW-CT5_base.docx

Version: 1.0.1362

Page 14 of 37

Software for CT-5xx Terminals

3.2.5  Working with sequencing lists

This  function  is  only  available,  provided  that  the  relevant  flag7  has  been  set  in  the  terminal

configuration.

This functional enhancement affects the functions "log order on“, "log order off", "interrupt

order" and "partial upload“.

With the sequencing list, the operator can chose from all prepared or interrupted orders when

they  log  an  operation  on,  or  from  all  running  BDE  orders  of  the  order  concerned  when  they

interrupt an operation or log it off. The advantage of sequencing lists is that no barcode scanner

is required to input an order.

With the function "log order on", all prepared orders are displayed for the current machine.

SEQUENCING LIST    01/04
OP: 531000000 0010
Art:Material 4711 /80 /
Targ.Qty:   20000 Y:     100
OP: 531000000 0030
Art:Thread 6890 18#09
Targ.Qty:   20000 Y:     100
____ _Up_ _Dn_ ____

7 ADE menu: Master data  Terminal configuration  Terminal configuration; tab Dialog control of the editing dialog

TSW-CT5_base.docx

Version: 1.0.1362

Page 15 of 37

Software for CT-5xx Terminals

The  functions  "interrupt  order",  "finish  order",  and  "partial  upload"  work  according  to  the

same principle. However, all running BDE orders are displayed there.

running OPs   01/02
OP: 531000000 0020
Art:Material 4711 /80 /
Targ.Qty:   20000 Y:     100
OP: 531000010 0020
Art:Thread 6890 18#09
Targ.Qty:   20000 Y:     100
____ _Up_ _Dn_ ____

The buttons <S2 = "Up“ = arrow > or <S3 = "Dn“ = arrow > move the highlighted bar from

one operation to the next. If there are more operations below the frame of the window, then the

display scrolls down automatically.

Clicking the </Enter/ > key, selects the current operation and closes the dialog.

By clicking the <ESC> key, the sequencing list for the manual logon of orders can be exited.

The sequencing list is closed automatically after 20 seconds.

Sequencing  lists  are  restricted  to  a  maximum  of  30  operations  to  keep access  times  at  a  low

level.  Sorting  is  based  on  the  date field "calculated  start  date"  in order for  operations that  are

time-critical  to  appear  on top.  In  case,  HYDRA shop floor  scheduling  (HYDRA-HLS)  is  in use,

this is the order of operations planned for the machine.

TSW-CT5_base.docx

Version: 1.0.1362

Page 16 of 37

Software for CT-5xx Terminals

3.3  The personal menu

The below figure shows the main screen if the "Staff menu" is enabled.

.   03.01.08 16:48:20
Mst:GENER. MALFUNCTION
Y:  0       S: 0
OP: 531000000 0020
Art:Material 4711 /80 /
Y:  200     S: 30

 P.AN P.AB P.AG ____

3.3.1

Log person on

By clicking the key <S1 = P.AN> in the <Person> menu, a person is logged on to a machine.

These data are required:

Machine

Staff badge number

When starting the function, the terminal outputs the following prompt:

[ Log person on ]
Mach.No: <531>
BadgeNo: ____

 _<=_ _Up_ _<╝_ ____

-

-

-

  The staff badge number can either be entered using the keyboard or the barcode.

  A person can only be logged on, if an operation is already logged on to the machine.

  An advance logon to the next shift is possible for a configured time before the shift begins.

This period of time is defined in the terminal configuration.

TSW-CT5_base.docx

Version: 1.0.1362

Page 17 of 37

Software for CT-5xx Terminals

3.3.2

Log person off

By clicking the key <S1 = P.AB> in the menu <Person>, a person is logged off from a machine.

The following entries are required:

Machine

Staff badge number,

Yield/total quantity (optional),

Scrap quantity (optional),

Scrap reason (optional),

When starting the function, the terminal outputs the following prompt:

number,

[ Log person off ]
Mach.No: <531>
BadgeNo: ____
Yield: ________
Scrap: ________
Reason: ___

 _<=_ _Up_ _<╝_ ____

TSW-CT5_base.docx

Version: 1.0.1362

Page 18 of 37

Software for CT-5xx Terminals

3.3.3  A person's operations

By  pressing  the  key  <S3  =  P.AG>  in  the  <Person>  menu,  a  person  can  check  onto  which

operations he/she is logged on.

[ A person’s OPs ]
BadgeNo: ____

 _<=_ _Up_ _<╝_ ____

When  the  staff  badge  number  is  entered,  all  operations  to  which  the  person  is  logged  on  is

shown in the form of a sequencing list, irrespective of the machine to which the person is logged

on.

Running OPs   01/02
OP: 531000000 0010
Art:Material 4711 /80 /
Targ.Qty:   20000 Y:     100
OP: 531000000 0030
Art:Thread 6890 18#09
Targ.Qty:   20000 Y:     100
____ _Up_ _Dn_ ____

TSW-CT5_base.docx

Version: 1.0.1362

Page 19 of 37

Software for CT-5xx Terminals

3.3.4  Special features in connection with "log OP on"

With regard to the logon of operations and personnel, the following two logon types/variants are

possible:

 MA

Orders and personnel must be logged on and off separately from each other. The input of

staff  badge  numbers  in  the  “Log  OP  on”  dialog  is  only  used  for  validity  checking.  The

person still has to be logged on separately by the “Log person on” dialog.

 MP

In this  case,  the  OP  and  employee  are  logged  on  in  a  single  process.  The  “Log  person

on” dialog is then only relevant, if additional employees should be logged on to this OP.

This configuration is performed in the terminal configuration of the HYDRA console.

TSW-CT5_base.docx

Version: 1.0.1362

Page 20 of 37

Software for CT-5xx Terminals

3.4  The information menu

The below figure shows the main screen if the "Info menu“ is enabled.

.   03.01.08 16:48:20
Mst:GENER. MALFUNCTION
Y:  0       S: 0
OP: 531000000 0020
Art:Material 4711 /80 /
Y:  200     S: 30

 MINF AINF AZNF PINF

3.4.1  Machine information

The key <S1 = MINF> in the <Info> menu shows essential information on the machine.

MACHINE INFO  01/03
Mach.No: 531
Des: MNR-531
-- Status -----------
Mst: STAFF SHORTAGE
Duration: 00:11:29 hrs

 ____ _Up_ _Dn_ ____

TSW-CT5_base.docx

Version: 1.0.1362

Page 21 of 37

Software for CT-5xx Terminals

MACHINE INFO  02/03
Mach.No: 531
Des: MNR-531
-- Shift ----------
Yield  :        0
Scrap :        0
Cycles    :        0
 ____ _Up_ _Dn_ ____

MACHINE INFO  03/03
Mach.No: 531
Des: MNR-531
-- Settings ----
Part      :    1
Act.cycle/stroke  :    5.100s
Targ.cycle/stroke  :    5.400s
____ _Up_ _Dn_ ____

3.4.2  Order/OP info

By clicking the key <S2 = AINF> in the <Info> menu, information on the production result of the

current operation can be shown. This dialog shows, among others, the scrap relating to orders,

the recorded actual quantity since the beginning of the shift or OP logon.

The window remains open for approx. 20 seconds. Then the terminal goes back to the previous

view. By clicking any key, the window can also be closed before this time has elapsed.

If  no  OP  is  logged  on,  the  message  "no  order"  appears  and  the  information  window  is  not

shown.

TSW-CT5_base.docx

Version: 1.0.1362

Page 22 of 37

Software for CT-5xx Terminals

ORDER INFO    01/03
OP: 531000000 0020
Art:Material 4711 /80 /
=====================
Com1: ISO-901/10
Com2: Form 2/87c
OPDes: Final assembly 4711
 ____ _Up_ _Dn_ ____

ORDER INFO    02/03
OP: 531000000 0020
Art:Material 4711 /80 /
=====================
Part      : 1
Targ.Cycle/stroke  : 5.400 s
P duration  : 15:00 hrs
 ____ _Up_ _Dn_ ____

ORDER INFO    03/03
OP: 531000000 0020
Art:Material 4711 /80 /
=====================
Unit   : PCS
Target quantity : 20000
Yield  : 200
 ____ _Up_ _Dn_ ____

3.5.1  Additional information on the operation

By clicking the key <S3 = AZNF> in the <Info> menu, additional text information on the selected

order/OP  can  be  requested.  This  data  might  be  transferred  to  HYDRA  via  the  so-called  info

interface.  It  is  therefore  possible  for  the  user  to  have  any  operation  specific  information

displayed on the terminal.

TSW-CT5_base.docx

Version: 1.0.1362

Page 23 of 37

Software for CT-5xx Terminals

Add. info on OP  01/50
OP: 531000020 0020
Art:Plug 4711 /80
=====================
Inspection  in  compliance  with
DIN 1020
-> Standard sheet 17-12-AB
Meas: 1024*124*2 cm
 ____ _Up_ _Dn_ ____

3.6.1  Display of the persons logged on

By clicking the key <S4= PINF> in the <Info> menu, all persons who are currently logged on to

the machine can be displayed.

PERSONS logged on   01/02
Person: 999998
 Schulz, Eduard
Person: 999999
 Meier, Hans

 MINF AINF AZNF PINF

TSW-CT5_base.docx

Version: 1.0.1362

Page 24 of 37

Software for CT-5xx Terminals

4  Processing notes at the "machine terminal“

Terminal processing may be affected by way of the machine configuration for machines that are

directly assigned to a terminal.

4.1  Downtime monitoring

The monitoring type is configured within the machine configuration of the HYDRA console. The

following values are possible here:

Z

B

K

Cycle monitoring

Operating signal monitoring

No automatic monitoring

TSW-CT5_base.docx

Version: 1.0.1362

Page 25 of 37

Software for CT-5xx Terminals

4.1.1  Monitoring of cycle time

-

-

-

  A malfunction can only be entered if the terminal requests it.

  When counter pulses occur, a switch to the “Production” status takes place.

  The  cycle time is  determined  based  on  the  OP's  target  cycle multiplied  by  the  "extended

cycle in %" that has been entered in the machine configuration at the HYDRA console.

TSW-CT5_base.docx

Version: 1.0.1362

Page 26 of 37

Counting pulsesProductionInterruption due to malfunctionMachine lockInterruption due to processGeneral malfunction“Assign malfunction“Cycle timet1t2t3t4t5t6t7t8Cycle time2134561

Software for CT-5xx Terminals

4.1.2  Operating signal monitoring

-

-

-

  A malfunction can only be entered if the terminal requests it.

  By setting the operating signal, status is changed to “Production”.

  A malfunction must last for a definite time, before it is recognized and reported. This time is

specified  by  the  "minimum  disturbance  time"  of  the  machine  configuration  at  the  HYDRA

console.

4.1.3  No automatic monitoring

-

-

  It is possible at all times to define a new machine status.

  The “Production” status must also be manually assigned.

4.2  Processing notes

4.2.1  Beginning of shift/ end of shift

A  shift  year  model  is  assigned  to  a  machine  within  the  machine  configuration  at  the  HYDRA

console.  Due  to  the  information  given  by  this  shift  calendar,  the  terminal  is  able  to  recognize

automatically beginning and end of shifts.

By this assignment, functions are enabled that ease data collection as well as operability::

TSW-CT5_base.docx

Version: 1.0.1362

Page 27 of 37

Minimum duration of malfunctiont1t2t3t410ProductionInterruption due to malfunction1“Assign malfunction“2131

Software for CT-5xx Terminals

-

-

-

  the OP that is logged on is automatically interrupted at the end of the shift.

  this OP is logged on again when the next shift starts.

  The  period  of  time  prior  to  the  beginning  of  the  shift  for  the  function  "log  person  on  in

advance" is configured within the terminal configuration at the HYDRA console. Within this

time  interval,  a  "person  logging  on"  is  saved  and  actually  logged  on  with  the  next  shift

change.

Since data collection at terminals must not be interrupted and it is impossible for all terminals to

send  all  postings  simultaneously  at  the  end  of  the  shift,  log  records  are  buffered.  In  short

intervals the buffer is now written into the server database. This process takes approximately 1

to  5  minutes  and  depends  on  the  number  of  machines  defined for  a  terminal.  Postings  made

during that time are buffered as well.

TSW-CT5_base.docx

Version: 1.0.1362

Page 28 of 37

The following diagram shows a time flow of logons and logoffs during a change of shifts.

Software for CT-5xx Terminals

Description of the process

1)    An  OP  was  logged  on  during  shift  1  and  its  production  is  also  to  be  continued  in  the

following shift 2.

2)    Person 1 logs on to the machine.

3)Person  2  arrives  shortly  before  the  shift  ends  and  logs  on  to  the  machine.  Since  the  logon

takes  place  within  the  30  minutes  of  advance  logon  time,  the  terminal  recognizes  an

advance logon.

4)    The registered OP is automatically interrupted when the shifts end and all persons logged

on are logged off.

5)    The  OP,  which  was  interrupted  beforehand,  is  logged  on  again  when  the  shift  starts.

Moreover, the persons who logged on in advance are logged on as well.

TSW-CT5_base.docx

Version: 1.0.1362

Page 29 of 37

Software for CT-5xx Terminals

4.2.2  Production lock

The  production  lock  is  set  automatically  for  machine  statuses that  are configured  so  as to the

production lock to be active, once this status has been assigned (compare MDE menu: master

data  -->  machine  configuration  -->  status  assignment).  This  is  shown  by  displaying  the

information “[PSP]".

If a production lock is set, this means that:

-

  The  production  lock  function  prevents  the  terminal  from  automatically  switching  to  the

production status, i.e. despite arriving machine pulses the current machine status remains.

-

  All items that are produced while the lock is enabled, are either recorded as yield or scrap.

This depends on how the machine is configured.

-

  The  production  lock  can  be  removed  by  clicking  the  </Enter/>  key.  Then  the  machine

status  switches  to  "production"  with  the  first  pulse  that  arrives.  The  production  lock  can

also be enabled by using this key.

4.2.3  Machine lock

It may be defined for each machine status whether or not a machine lock is to be set. Setting a

machine  lock  means  that  an  output  and  thereby  a  relay  are  set.  Which  output  or  relay  is

affected is defined in the machine configuration of the HYDRA console.

4.2.4  Relay – target quantity reached

If  the  terminal  recognizes  that  the  recorded  actual  quantity  has  reached the  target  quantity  of

the current operation, then a relay will be set. Which output or relay is affected is defined in the

machine configuration of the HYDRA console.

4.2.5

Typical lead time of the terminal

The  terminal  program  has  a  typical  lead  time  of  2-3  seconds.  This  means  that  the  recorded

machine status intervals at least have the duration of the minimum lead time.

TSW-CT5_base.docx

Version: 1.0.1362

Page 30 of 37

Software for CT-5xx Terminals

5  Administration

The below section includes all relevant pieces of information required for the administration of a

terminal.

This includes:

  implementation of the terminal,

  explanation of hardware test functions,

  local configurations and program parameters.

5.1

Implementation

CT-54x terminals are installed by the program "cfg.exe“. The CT-54x terminal is booted from

the installed read only memory medium.

The boot medium includes among others:

- The file "cfg.exe“ for the configuration of the terminal and hardware test programs.

-

The file "run.bat“.

The read only memory medium "Tiny Disk" includes among others:

-

-

the actual application program (in the directory: "c:\ctx\“).

the spool directory ("c:\ctx\spool\“) including all buffered log files

 or the saved database configuration of the terminal for OFFLINE restarts.

TSW-CT5_base.docx

Version: 1.0.1362

Page 31 of 37

Software for CT-5xx Terminals

5.2  The configuration tool "CFG.EXE“

The terminal now loads the terminal program from its local storage medium. Once booted, the

following is shown at first:

*** CFG V# 1.1 *****
 1 = Configuration
 2 = Download
 3 = Hardware test
********************
 x = Program start

************* < 5> **

TSW-CT5_base.docx

Version: 1.0.1362

Page 32 of 37

Software for CT-5xx Terminals

5.2.1

The "configuration“ menu

*** Configuration **
 1 = IP address
 2 = IP router
 3 = Host – IP
 4 = Terminal number
 5 = Set Intel
********************
 6 = Show
************* < 5> **'

Description:

IP address

unique network address for CT-541

IP router

If  CT-541  is  included  in  a  sub-network,  the  gateway  or  router  may  be

entered here.

Host IP

IP address of the HYDRA server

Terminal number

unique  terminal  number  of  CT-541  matching  the  number  of  the  terminal

label on the HYDRA server

INTEL

Intel-Host. Server including processor architecture compatible with Intel

Show

Shows the current settings

Please  note for  all  menus  that  the  current  value  is  displayed  as  default  value.  By  clicking  the
</Enter/ > key, it is switched to the next field and the complete input is confirmed at the end.
The process has to be repeated if wrong entries are made.

Once the configuration tool has been finished, the device is rebooted automatically, if required,

to load the new configuration.

TSW-CT5_base.docx

Version: 1.0.1362

Page 33 of 37

Software for CT-5xx Terminals

5.2.2

The "download“ menu

*** Download *******'
 1 = Application
 2 = Add-ons
********************
 3 = Upload

************* < 5> **'

Description:

Application

Downloading of applications and required files from the HYDRA server.

Add-ons

If  available,  updates

for  drivers  and  operating  systems  can  be

downloaded from the HYDRA server

Upload

Uploading of log files, configuration and service data from the terminal to

the HYDRA server (for service purposes only)

TSW-CT5_base.docx

Version: 1.0.1362

Page 34 of 37

Software for CT-5xx Terminals

5.2.3

The "hardware test“ menu

*** Hardware *******
 1 = Barcode
 2 = I/O test
********************
 3 = Clock test
 4 = Host ping

************* < 5> **'

Description:

Barcode

Test  of  the  barcode  interface  (if  available).  Barcodes  scanned  by  the

barcode reader are shown.

I/O test

The  meter  reading  of  both  inputs  is  shown.  The  two  relays  can  be

switched on and off.

Clock test

(not yet available  "for future use“)

The  HYDRA  server  time  is  read  in  in  regular  intervals.  An  application

needs to be downloaded first to carry out this test.

Host ping

The server address (HOST IP) that is currently set for the CT-541 terminal

is  pinged  (constant  ping)  and  the  result  is  shown  (x  pings  send,  y  pings

received).

TSW-CT5_base.docx

Version: 1.0.1362

Page 35 of 37

Software for CT-5xx Terminals

5.3  The file "RUN.BAT“

The basic entries of the file: "RUN.BAT“ are:

@echo off

SET HY_USR=51

SET HY_DIR=.\

SET HY_HOSTNAME=192.168.10.59

SET HY_INTEL=i

SET MINIMAL_WAIT=300

SET MAXIMAL_RCV_WAIT=120

SET TMOUT_C=10

SET TMOUT_S=10

SET TMOUT_R=120

SET TMOUT_F=10

echo. *********************

tcpshell ctld %HY_INTEL%

echo. *********************

All changes are made in the configuration tool "cfg.exe“.

5.4  Add-ons file "ctld.txt“

Has been designed for the downloading of files. This function should only be used for files that

are to be copied onto the terminal in addition to the standard files.

The files downloaded in this way have to be defined in the file "CTLD.TXT" within the directory

"\CTL" on the server.

\ctl\ctld.txt

(in the directory of the application)

If  files  are  to  be  copied  into  specific  directories,  e.g.  the  file  xy.bat  is  to  be  copied  into  the

terminal's  LAN  directory,  these  files  also  have  to  exist  in  "CTL\ADDONS\LAN\xy.bat".  The

relevant directory is always to be created in the directory "Addons\".

TSW-CT5_base.docx

Version: 1.0.1362

Page 36 of 37

Software for CT-5xx Terminals

Example:  The  file  "xy.bat"  is  to  be  copied  into  the  "lan"  directory  of  the  terminal  and  the  file

"nn.bat" into the Ctlight directory.

Entry in the file "CTLD.TXT"

Example for entries in the file ctld.txt:

lan\xy.bat

nn.bat

Please note:

Lan\xy.bat

nn.bat

(The  file  xy.bat  is  copied  into  the  LAN  directory  on  the  terminal)

(The file nn.bat is copied into the Ctlight directory on the terminal)

The directory/file: \ctl\addons\lan\xy.bat has to exist on the server

The directory/file: \ctl\addons\nn.bat has to exist on the server

TSW-CT5_base.docx

Version: 1.0.1362

Page 37 of 37

