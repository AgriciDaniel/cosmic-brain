Manual

PCC Module: Scale
Interfacing
PCC-WAK 8.1

Version 1.0.23049

Last changed on: 02.09.2020

PCC Module: Scale Interfacing

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

PCC-WAK_81.docx

Version: 1.0.23049

Page 2 of 41

PCC Module: Scale Interfacing

Contents

1  Overview of the PCC Module: Scale Interfacing .......................................... 5

2  PCC Module Connecting Scales .................................................................. 6

Scale Driver Bizerba ST ................................................................................................ 6

2.1.1  General ................................................................................................... 6

2.1.2

Interfaces ................................................................................................ 6

2.1.3  Description of telegram Bizerba ST ......................................................... 6

2.1.4  Settings bizerba_st.ini ............................................................................. 8

2.1.5  Configuration options for data collection .................................................. 9

2.2  Scale Driver Busch Minipond ............................................................................ 10

2.2.1  General ................................................................................................. 10

2.2.2  Example for driver INI ............................................................................ 10

2.2.3  Settings: minipond_25.ini....................................................................... 11

2.2.4

Log files ................................................................................................. 13

2.2.5  Attachment ............................................................................................ 14

2.4  Scale driver crane scale EHP UDP protocol NSG G.1 ....................................... 19

2.4.1  General ................................................................................................. 19

2.4.2  Example for driver INI ............................................................................ 20

2.4.3  Settings of EHP_Netscale_UDP.ini ....................................................... 20

2.4.4

Log files ................................................................................................. 22

2.5  Scale driver FILIZOLA ID-S ............................................................................... 22

2.5.1  General ................................................................................................. 22

2.5.2  Example for driver INI ............................................................................ 22

2.5.3  Settings of filizola_ids.ini ....................................................................... 23

2.5.4

Log files ................................................................................................. 24

2.6  Scale Driver Mettler Toledo SICS ...................................................................... 25

2.6.1  General ................................................................................................. 25

2.6.2

Interfaces .............................................................................................. 25

2.6.3  Settings of mettler_sics.ini ..................................................................... 26

2.6.4  Scale type Mettler Toledo SPIDER ........................................................ 26

2.7  Scale Driver Nobel Elektronik E1TAD ............................................................... 33

2.7.1  General ................................................................................................. 33

2.7.2

Interface ................................................................................................ 33

PCC-WAK_81.docx

Version: 1.0.23049

Page 3 of 41

PCC Module: Scale Interfacing

2.7.3  Settings nobel_e1tad.ini ........................................................................ 34

2.8  Scale Driver Sartorius Combics ......................................................................... 34

2.8.1  General ................................................................................................. 34

2.8.2  Example for driver INI ............................................................................ 35

2.8.3  Settings of Sartorius_Combics.ini .......................................................... 36

2.8.4  Connecting lines .................................................................................... 40

PCC-WAK_81.docx

Version: 1.0.23049

Page 4 of 41

PCC Module: Scale Interfacing

1  Overview of the PCC Module: Scale Interfacing

Purpose

Interface modules in order to communicate with scales (e.g. transferring weighing data)

Implementation notes

You use the function package if:



you want to connect a scale to the MES using interfaces.

  The modules required to implement the protocol must exist or be established specifically to the

machine. Specifications are defined during machine installation counseling.

Integration

The protocol module has been integrated in HYDRA-PCC. Please also see the  documents dealing  with

the products SCS-PCP and SCS-PCB.

Functions

Transfer of weighing data of different scale manufacturers

PCC-WAK_81.docx

Version: 1.0.23049

Page 5 of 41

PCC Module: Scale Interfacing

2  PCC Module Connecting Scales

Scale Driver Bizerba ST

2.1.1  General

Description of the scale driver Bizerba ST. The connection is established via a special RS232 cable.

Scale values are requested using special terminal dialogs.

The described PCC driver supports scales of the type Bizerba ST.

Required files:





•bizerba_st.dll

•bizerba_st.ini

2.1.2

Interfaces

Using the RS232 connection, the host computer is directly connected with the scale via a serial cable.

Contact:
2
3
5

Short description
RxD
TxD
GND

Meaning
Receive data
Transmit data
Signal ground

Default interface settings are:

  9600  Baud

  7 data bits

  1 start bit

  E parity bits

  1 stop bit

There is no handshake. It must be guaranteed that the connected host computer is always able to hold a

complete telegram in its receive buffer.

2.1.3  Description of telegram Bizerba ST

New

description

of

(including

calibratable/verifiable

PCC-WAK_81.docx

Version: 1.0.23049

Page 6 of 41

telegram: Bizerba scale

memory)

Start position

Name/Description

Length

Example/Explanation

PCC Module: Scale Interfacing

1

2

3

5

11

12

13

24

25

35

36

37

ID

Scale number

ID

Reference number

ID

Status

1

1

2

6

1

1

Gross weight

11

ID

Tare weight

ID

Status

Sign

1

10

1

1

1

]

1 (scale 1, fixed)

Z0

(please

note:

additional field)

000123

(right-aligned,

filled with 0 (zero))

+

(plus  sign.  Status

should

not

be

evaluated)

Status  (should  not  be

evaluated)

xxxxx23.4kg

(right-

aligned,  filled  up  with

blank characters)

.

(normally  dot  or

/

(forward slash)

xxxx23.4kg

(right-

aligned,  filled  up  with

blank characters)

, (comma)

Status  (should  not  be

evaluated)

Blank  character  with

positive weight, minus (-

)  sign  with  negative

weight

PCC-WAK_81.docx

Version: 1.0.23049

Page 7 of 41

38

Net weight

10

PCC Module: Scale Interfacing

xxxx99.5kg

(right-

aligned,  filled  up  with

blank characters)

LENGTH OF TELEGRAM:

47

Sample string:

char(#2) +']1Z0001209+!    230.0kg    005.0kg+!    225.0kg' + char(#3)

Gross = 230 kg

Tare = 5 kg

Net = 225 kg

2.1.4  Settings bizerba_st.ini

 [WAAGE_001]

COM=1,9600,7,E,1





ID for the driver section

Settings for the COM port
e.g. COM=1,9600,7,E,1

COM port = 1
Baud = 9600
Data bit = 7
Parity = E
Stop bit = 1

V:EGR:GUTS=BRUTTO  

ID for the scale values of the dialogs.
Possible settings:

BRUTTO (GROSS)
NETTO (NET)
TARA (TARE)
EINHEIT (UNIT)

The following IDs are sent as of version 7.2.1.8 /25 April 2014

These parameters are set along with the new processing

PCC-WAK_81.docx

Version: 1.0.23049

Page 8 of 41

PCC Module: Scale Interfacing

SCALE_MODE=1

  Reference number of the scale



ID number of the scale

The following IDs are always sent automatically:

V:WAAGE:REFNR

 Reference number

V:WAAGE:NR

  ID number

Data record sent by the scale:

]1{53291{5654321+)    003,8kg    000,0kg+)    003,8kg'#3

Example:

ID number of scale

= 291

Reference number of scale

= 654321

2.1.5  Configuration options for data collection

The positions and lengths for reading out data from the scale string can still be changed.

Notes on the configuration structure

Value that is read out = position within the string, number of characters to be read

IDs for which the position and number of characters can be changed:

1st value corresponds to the string position; 2nd value represents the length of characters to be read out

  POS_BRUTTO

  POS_NETTO

  POS_TARA

  POS_EINH

  POS_REFNR

  POS_IDENT

By default, the following positions are defined:

  POS_BRUTTO=19,9

  POS_NETTO=43,9

PCC-WAK_81.docx

Version: 1.0.23049

Page 9 of 41

PCC Module: Scale Interfacing

  POS_TARA=31,9

  POS_EINH=28,2

  POS_REFNR=11,6

  POS_IDENT=8,3

Additional configurations:

REFERENZ_NR=OFF

(no reference number is sent in order to be collected)

IDENT_NR=OFF

(no scale ID number is sent in order to be collected)

2.2  Scale Driver Busch Minipond

2.2.1  General

The  scale  unit  Busch  Minipond  consists  of  an  indicator  and  evaluation  module  to  connect  different

weighing  cells.  The  indicator  unit  including  display  and  function  keys  allows  for  the  scale  unit  to  be

configured and operated.

There is a serial RS-232 interface to communicate with the HYDRA system. It is possible request weight

values and to transfer setting parameters to the scale controller.

Required files:

  minipond_25.dll

  minipond_25.ini

2.2.2  Example for driver INI

Example:

[SERVICE]

info=minipond_25.dll

tracing=0

TraceLevel=5

LogLevel=2

TIMEOUT=180

[WAAGE_000]

COM=1,19200,7,E,1

PCC-WAK_81.docx

Version: 1.0.23049

Page 10 of 41

PCC Module: Scale Interfacing

RTS-CONTROL=ON

RESET_SCALE_AT_BEGIN=OFF

SET_DISPLAY_ZERO_AFTER_READ=ON

V:WAAGE:BRUTTO=BRUTTO

V:WAAGE:NETTO=NETTO

;V:WAAGE:NETTO=DISPLAY

;V:WAAGE:DISPLAY=DISPLAY

V:WAAGE:TARA=TARA

POLL=0

POLL_I=500

2.2.3  Settings: minipond_25.ini

The  serial  transmission  properties  need  to  be  defined  in  order  to  communicate  with  the  Busch  scale

controller. Speed and control characters are defined via an INI entry:

COM=1,19200,7,E,1

COM=<Nr>,<Bd>,<Dat>,<Parity>,<Stop>

<Nr>  Number of the serial interface

<Bd>  Baud rate

<Dat>  Number of data bits

<Parity>

Parity (Even, Odd, None, Mark)

<Stop> Number of stop bits

In the above example HYDRA communicates via the interface COM1 at a transmission rate of 19200 Bd

and a character length of 7 bits. Parity is set to "even" and the data word is completed with 1 stop bit.

Subject to the laying of the serial connection cable, handshake processing must be activated via the RTS

signal. The following entry is required:

RTS-CONTROL=ON

The  following  diagram  shows  how  an  industrial  PC  can  be  connected  to  the  scale  using  serial

communication (RS-232).

RS232 PC connection cable with 9-pole D-Sub socket (article No. 10KAB202 / ST.2300.0019)

PCC-WAK_81.docx

Version: 1.0.23049

Page 11 of 41

Terminal

TxD

5

RTS

6

RxD

7

CTS

8

GnD

1

Green

Yellow

Brown

White

Gray

PCC Module: Scale Interfacing

PC

2

RxD

8

CTS

3

TxD

7

RTS

GnD

5

1

4

6

Request weight

To request the weight, it can be differentiated between:

  Gross weight

V:WAAGE:BRUTTO=BRUTTO

  Net weight

V:WAAGE:NETTO=NETTO

  Tare weight

V:WAAGE:TARA=TARA

  Display V:WAAGE:NETTO=DISPLAY

PCC-WAK_81.docx

Version: 1.0.23049

Page 12 of 41

PCC Module: Scale Interfacing

The parameter "Display" can be used to take over the currently  displayed value. This value depends on

taring of the scale. If, apart from taking over the display value, the parameter

SET_DISPLAY_ZERO_AFTER_READ=ON

is  also  set,  taring  restarts  automatically  after  taking  over  the  value  and  the  displayed  value  is  reset  to

"0.0". The next time an item is weighed, the value is transferred to HYDRA and added up there.

The scale only transfers weight values if they are stable. This means, unstable loads first have to become

steady.

Please retry if no value is taken over after requesting the weight.

Communication disturbances

TIMEOUT=180

The value configured in "TIMEOUT" defines a period of time for the scale to send a response. The value

180  corresponds  to  a  period  of  approx.  10  seconds.  The  scale  driver  sends  an  error  message

(transmission error) including the following contents to HYDRA if the response to requesting the weight is

not available within this period of time:

Example: the scale driver's response when requesting the net weight and communication fails:

DLG=EVENT|DRV= minipond_25.dll|DRVINST=WAAGE_000|V:NETTO=TIMEOUT|

Initialization of the display unit

The scale can be re-initialized along with starting the terminal application in CT-WIN. If the parameter

RESET_SCALE_AT_BEGIN=ON

is used, CT-WIN sends once the initialization commands to the scale controller.

This restores the initial state defined by the scale manufacturer.

2.2.4

Log files

The driver program of the scale connection records communication with the scale in a corresponding log

file within the "spool" sub-directory of the terminal application.

PCC-WAK_81.docx

Version: 1.0.23049

Page 13 of 41

PCC Module: Scale Interfacing

The item "LogLevel=" configures the number of recorded events. If this value is increased (max. 5), the

number of recorded messages will also increase.

The file is prevented from increasing excessively by self-regulating checking and overwriting of data.

2.2.5  Attachment

The attachment includes the communication profiles of the Minipond 25 scale unit.

Initialization of the interface and communication

Meaning

Command

Return value

Meaning

Initialize Device

STX i D ETX

Initialize

STX i C ETX  STX<Err>ETX

Err=EC_OK (communication enabled)

Communication

Err=EC_COM

(communication

disabled/blocked)

Synchronization

STX ETX

STX<Err>ETX

Err=EC_OK (slave has been synchronized)

Command requesting weight values

Meaning

Command

Return value

Meaning

Zeros

STX z ETX

STX<Err>ETX

Tare

STX t ETX

STX<Err>ETX

Err=EC_OK

(zeroing/resetting

to

zero successful)

Err=EC_COM

(zeroing/resetting

to

zero failed)

Err=EC_OK

(taring

successful)

Err=EC_COM  (taring

failed)

Reset to gross

STX g ETX

STX<Err>ETX

Err=EC_OK (untaring

PCC-WAK_81.docx

Version: 1.0.23049

Page 14 of 41

PCC Module: Scale Interfacing

successful)

Err=EC_PAR

(untaring failed)

Read

weight

STX L D ETX

STX<Err><E_Code><Stat><WB><Gew>ETX

Err=EC_OK

(weight

value (displayed

value)

<E_Code>: error of weighing system (see section 4

of manual)

<Stat>:  weight  status  (see  section  4  of  manual,

information available)

Err=EC_PAR  (weight

not available)

weight status)

<WB>: weighing range (1-3)

<Gew>: weight/kg 8 characters (example:__120,60)

Read

gross

STX L G ETX

STX<Err><E_Code><Stat><WB><Gew>ETX

Err=EC_OK

(gross

value (displayed

value)

<E_Code>: error of weighing system (see section 4

of manual)

<Stat>:  weight  status  (see  section  4  of  manual,

value available)

Err=EC_PAR  (gross

value not available)

weight status)

<WB>: weighing range (1-3)

<Gew>:

gross

value/kg

8

characters

(example:__120,60)

Read  net  value

STX L N ETX

STX<Err><E_Code><Stat><WB><Gew>ETX

Err=EC_OK

(net

(displayed

value)

<E_Code>: error of weighing system (see section 4

of manual)

<Stat>:  weight  status  (see  section  4  of  manual,

value available)

Err=EC_PAR

(net

value not available)

weight status)

<WB>: weighing range (1-3)

<Gew>:

net

value/kg

8

characters

(example:__120,60)

Read tare value  STX L T ETX

STX<Err><E_Code><Stat><WB><Gew>ETX

Err=EC_OK

(tare

<E_Code>: error of weighing system (see section 4

of manual)

<Stat>:  weight  status  (see  section  4  of  manual,

value available)

Err=EC_PAR

(tare

value not available)

PCC-WAK_81.docx

Version: 1.0.23049

Page 15 of 41

PCC Module: Scale Interfacing

weight status)

<WB>: weighing range (1-3)

<Gew>:

tare

value/kg

8

characters

(example:__120,60)

Read

scale

STX W r ETX

STX<Err><Scaling>ETX

parameters

Scaling: scale parameters (see comment)

Err=EC_OK

(valid

scale parameters)

Err=EC_PAR  (invalid

scale parameters)

Information included in the E_CODE of the scale reply

E_Code

Description

‘0‘

‘9‘

‘1‘

‘2‘

‘6‘

No error in weighing system

Measured value out of range

Reference value out of range

Zero value out of range

Check number out of range

The status byte <STAT>

Status byte

Value = 0

Value = 1

Bit 0

Bit 1

Bit 2

Bit 3

Bit 4

Weight valid

Weight invalid

Gross

Unit kg

Net

Unit Lb

Weight within weighing range

Weight out of weighing range

No stability

Stability

PCC-WAK_81.docx

Version: 1.0.23049

Page 16 of 41

PCC Module: Scale Interfacing

Bit 5

Bit 6

Bit 7

Weight above minimum load

Weight below minimum load

Always "1" --> status is printable character

Always "0“  matches 7 Bit ASCII encoding

Error code <Err> included in the scale's response message

Code <err>

Name/Description

Meaning

Note

‘0‘

‘1‘

EC_OK

Command

executed

correctly

EC_IC

Command  interface  not

This

return

value

initialized

enables  the  master  to

detect  any  reset  and  to

trigger

initialization.

After

restarting

the

slave, the master has to

open the interface using

the  command  "Initialize

Communication".

‘2‘

EC_NY

Command  processing

Sent  as  reply  for  the

not yet completed

DIN  measurement  bus

protocol if the requested

data

are

not

yet

available.  Does

not

occur with point-to-point

connection.

‘3‘

‘4‘

‘7‘

EC_COM

Command  cannot  be

Command  detected  but

executed.

cannot yet be executed.

EC_PAR

Invalid

or

wrong

command parameters

EC_FKT

Unknown command

PCC-WAK_81.docx

Version: 1.0.23049

Page 17 of 41

PCC Module: Scale Interfacing

PCC-WAK_81.docx

Version: 1.0.23049

Page 18 of 41

PCC Module: Scale Interfacing

2.4  Scale driver crane scale EHP UDP protocol NSG G.1

2.4.1  General

The crane scale communicates via radio with a net scale central unit. The data of individual crane scales

can  be  read  out  by  UDP  protocol.    The  shop  floor  terminal  selects  the  corresponding  crane  scale  by

configuration.

Scale 1

Scale 2

Scale 3          network-compatible up to 20 devices

Required files:

  EHP_Netscale_UDP.dll

  EHP_Netscale_UDP.ini

PCC-WAK_81.docx

Version: 1.0.23049

Page 19 of 41

2.4.2  Example for driver INI

PCC Module: Scale Interfacing

[SERVICE]

info=EHP_Netscale_UDP.dll

intervall=0

testmode=0

tracing=0

TIMEOUT=180

TraceLevel=5

ExecuteQueue=1

ThreadBaseId=100

ShowErrorWindow=OFF

[WAAGE_001]

Waage_IP=192.168.100.71

Waage_Port=187

Waage_ID=1

MaxRepeatIfError=20

TryAgainTimeAfterError=500

Weight_Read_Modus=DOUBLE

V:Waage1:BRUTTO=BRUTTO

2.4.3  Settings of EHP_Netscale_UDP.ini

UDP interface

The network address and port have to be defined in order to establish communication with the Netscale

scale controller. They are defined via INI entries:

Waage_IP=192.168.100.71

Waage_Port=187

Since  several  scales  can  be  connected  to  this  scale  controller,  this  configuration  applies  for  all  scales

within the instance [Waage_001]. Therefore, individual crane scales are differentiated as follows:

V:Waage1: …

V:Waage2: …

Request weight mode

PCC-WAK_81.docx

Version: 1.0.23049

Page 20 of 41

The log file of the EHP scale controller Netscale differentiates between two different ways of requesting

PCC Module: Scale Interfacing

the weight.

Single weight request

The single request for weight is defined in the INI file by the entry:

 Weight_Read_Modus=SINGLE

If  this  mode  is  selected,  the  scale  only  returns  one  weight  value.  It  has  to  be  defined  in  the

configuration of scales if this value refers to the gross or net weight. HYDRA cannot differentiate

this.

This  means  that  the  same  result  is  delivered  although  the  tare  weight  is  defined  if  weight  is

requested using the entries: Waage1:BRUTTO=BRUTTO and V:Waage1:NETTO=NETTO

Extended weight request

If  the  extended  request  for  weight  is  selected,  the  scale  controller  transmits  two  weight  values.

Consequently,  it  is  possible  to  request  the  net,  gross  and/or  tare  weight  from  HYDRA.  The

following settings are possible:

V:Waage1:BRUTTO=BRUTTO

V:Waage1:NETTO=NETTO

V:Waage1:TARA=TARA

The INI file can be configured accordingly by choosing the request mode: DOUBLE

Weight_Read_Modus=DOUBLE

Communication disturbances

If  a  coil  is  transported  using  a  crane  scale,  its  weight  is  not  stable  as  it  sways.  To  avoid  faulty

measurements, no  weight  values  are transferred if the  weight is  instable. Consequently, it might be the

case  that  there  will  be  no  result  when  HYDRA  asks  for  the  weight  and  the  request  dialog  needs  to  be

restarted. Additionally, communication with the scale controller might be disturbed if the crane is moved

outside of the reception range. Three IDs have been added facilitating the procedure:

MaxRepeatIfError=20

TryAgainTimeAfterError=500

ShowErrorWindow=OFF

PCC-WAK_81.docx

Version: 1.0.23049

Page 21 of 41

PCC Module: Scale Interfacing

MaxRepeatIfError=20 defines the number of retries and TryAgainTimeAfterError=500 specifies the time in

ms after which a retry is triggered. If both values are multiplied, it results in the period of time the program

attempts to get the weight (in this example: 20x500mS = 10 seconds).

If any attempt of getting the weight value within this period of time fails, it is possible to display a message

window by using the ID ShowErrorWindow=ON.

 This  window

remains  open  until

it

is  closed  by  clicking  OK.  No  message  appears

if

ShowErrorWindow=OFF is set.

2.4.4

Log files

The driver program of the scale connection records communication with the scale in two different files in

the local terminal directory.

The  file  "EHP_Netscale_UDP_WAAGE_00x.log“  records  the  load  and  unload  activities,  communication

with the scale controller and with the higher-level HYDRA system.

Actual  weight  values  sent  and  transferred  by  the  scale  controller  can  be  displayed  in  the  file

"EHP_Netscale_UDP_WAAGE_00xWaage_Send.log".

The files are prevented from increasing excessively by self-regulating checking and overwriting of data.

2.5  Scale driver FILIZOLA ID-S

2.5.1  General

The  scale  unit  FILIZOLA  ID-S  consists  of  an  indicator  and  evaluation  module  to  connect  different

weighing  cells.  All  connections  and  interfaces  are  connected  internally  via  cable  connections  thus

allowing to be used even in the humidity range.

There is a serial RS-232 interface to communicate with the HYDRA system.

Required files:





filizola_ids.dll

filizola_ids.ini

2.5.2  Example for driver INI

[SERVICE]

info=filizola_ids.dll

tracing=0

PCC-WAK_81.docx

Version: 1.0.23049

Page 22 of 41

PCC Module: Scale Interfacing

TraceLevel=5

LogLevel=2

TIMEOUT=180

[WAAGE_000]

COM=1,9600,7,E,2

V:NETTO=NETTO

V:BRUTTO=BRUTTO

V:TARA=TARA

V:EINHEIT=EINHEIT

POLL=0

POLL_I=500

2.5.3  Settings of filizola_ids.ini

Serial interface

The serial transmission properties need to be defined in order to communicate with the FILIZOLA scale

controller. Speed and control characters are defined via an INI entry:

COM=1,9600,7,E,2

In the above example HYDRA communicates via the interface COM1 at a transmission rate of 9600 Bd

and a character length of 7 bits. Parity is set to "even" and the data word is completed with 2 stop bits.

Request weight

To request the weight, it can be differentiated between:

  Gross weight

V:BRUTTO=BRUTTO

  Net weight

V:NETTO=NETTO

  Tare weight

V:TARA=TARA

The following entry provides the unit of the weight:

V:EINHEIT=EINHEIT

The  scale  should  be  configured  in  such  a  way  that  it  only  sends  weight  values  on  request  by  the

connected system (transmission on demand).

PCC-WAK_81.docx

Version: 1.0.23049

Page 23 of 41

PCC Module: Scale Interfacing

For this purpose, the weighing system expects a command "ENQ" (05 Dec) and then transfers the data in

the format:

"(STX)(SP)(SP)(X)(X)(X)(X)(X)(X)(X)(k)(g)(^)(T)(SP)(SP)(SP)(SP)(EXP)(N)

(N)

(N)

(N)

(N)

(N)

(N)(NEXP)(k)(g)(^)(L)(SP)(LF)(CR)(ETX)“

This means:





























(STX)  Start of Text

(SP)  Space

(X)

tare (numbers + comma)

(k)

(g)

(^)

(T)

letter k of kg

letter g of kg

character circumflex

letter T

(EXP)  expansion character

(N)

net weight (numbers + comma)

(NEXP) expansion cancel character

(L)

letter L

(LF)

"Line feed“

(CR)

“Carriage return”

(ETX)  End of Text

Communication disturbances

TIMEOUT=180

The value configured in "TIMEOUT" defines a period of time for the scale to send a response. The value

180  corresponds  to  a  period  of  approx.  10  seconds.  The  scale  driver  sends  an  error  message

(transmission error) including the following contents to HYDRA if the response to requesting the weight is

not available within this period of time:

Example: the scale driver's response when requesting the net weight and communication fails:

DLG=EVENT|DRV=filizola_ids.DLL|DRVINST=WAAGE_000|V:NETTO=TIMEOUT|

2.5.4

Log files

The driver program of the scale connection records communication with the scale in a corresponding log

file within the "spool" sub-directory of the terminal application.

The item "LogLevel=" configures the number of recorded events. If this value is increased (max. 5), the

number of recorded messages will also increase.

PCC-WAK_81.docx

Version: 1.0.23049

Page 24 of 41

The file is prevented from increasing excessively by self-regulating checking and overwriting of data.

PCC Module: Scale Interfacing

2.6  Scale Driver Mettler Toledo SICS

2.6.1  General

Description of the scale driver Mettler Toledo SICS. Connection is established via a special RS232 cable.

Scale values are requested using special terminal dialogs (ctwin).

The described PCC driver supports scales by the manufacturer Mettler Toledo working with the SICS log

file (e.g. 8142, Lynx, Panther).

2.6.2

Interfaces

Using the RS232 connection, the host computer is directly connected with the scale via a serial cable.

Contact:
2
3
5

Short description
RxD
TxD
GND

Meaning
Receive data
Transmit data
Signal ground

Shop floor PC

scale E-1-TAD

Default interface settings are:

9600  Baud

7 data bits

1 start bit

E parity bits

1 stop bit

PCC-WAK_81.docx

Version: 1.0.23049

Page 25 of 41

There is no handshake. It must be guaranteed that the connected host computer is always able to hold a

PCC Module: Scale Interfacing

complete telegram in its receive buffer.

2.6.3  Settings of mettler_sics.ini

[WAAGE_000]

COM=2,9600,7,E,1

 Settings for the serial interface

// The scale's communication address

Scale-Type=Spider

 scale type:

-

-

Lynx

8142

-  Spider

-

// Request parameters specific to scale.

Brutto_Scale=SI

Netto_Scale=SI

 gross value requested from scale

 net value requested from scale

V:EGR:GUTS=BRUTTO

  Dialog  ID  including  value  requested  from  PCC.  The

following queries are possible:

-

-

BRUTTO (GROSS)

NETTO (NET)

2.6.4  Scale type Mettler Toledo SPIDER

PCC-WAK_81.docx

Version: 1.0.23049

Page 26 of 41

PCC Module: Scale Interfacing

Scale configurations for server communication:

The operation mode of the interface must be set to DIALOG.

Display

Notes

Configuration of scale interfaces: only accessible for supervisors!

Standard interface

Optional interface

Optional interface

Analog option

Settings:

Operation mode of interface

Communication parameters

Settings for printing the protocol

Line feeds for protocol

Resetting interfaces

 section 4.7.1

 section 4.7.2

 section 4.7.3

 section 4.7.4

 section 4.7.

PCC-WAK_81.docx

Version: 1.0.23049

Page 27 of 41

PCC Module: Scale Interfacing

Alibi  memory,  only  appears
is  enabled
(“APPLIC““Alibi.M““Transfer““ON“).  Fixed  setting  (other  operation  modes  only
accessible if transfer function is disabled).

the  alibi  memory

if  data

transfer

to

Manual data output at printer (key <<

>>. Factory setting

Automatic output of stable results at printer (for serial weighing mode)

Continuous output of all weight values via the interface. Not available for COM2, provided
that analog option is enabled!

Bidirectional  communication  via  MT-SICS  commands  (controlling  the  scale  via  PC)  Not
available for COM2, provided that analog option is enabled.

Like  "continuous"  (see  above)  but  with  2  fixed  blank  characters  in  front  of  the  unit
(compatible with Spider 1/23)

Like  "dialog"  (see  above).  But  scale  sends  2  fixed  blank  characters  in  front  of  the  unit
(compatible with Spider 1/2/3)

Format  compatible  with  DigiTOL  Weight  values  to  be  transferred  can  be  selected:  tare,
net, gross (gross weight is identified by "B").

Like“dt-b“ – mode (see above), But gross weight is identified by "G".

“TOLEDO Continuous Weight“ mode.

“TOLEDO Continuous Count“ mode.

Connecting a barcode reader.

Connecting  a  second  display.  Not  available  for  COM2,  provided  that  analog  option  is
enabled!

Second scale used as reference scale.

Second scale used as bulk scale.

Only for analog mode: disabling the analog option. If the "analog" option is not deactivated,
the  settings  "Ref"  and  "Bulk"  are  not  available  for  COM1  and  COM3  (if  available).  The
operation modes "Print" and "A.Print" are only available for COM2.

PCC-WAK_81.docx

Version: 1.0.23049

Page 28 of 41

Display

Notes

PCC Module: Scale Interfacing

Not  available  for  analog  option.  The  values  set  here  must
correspond  with  those  of  the  connected  peripheral  devices
(printers, PC).

Data transmission rate of the interface:

300  Baud  –  115200  Baud.  Factory  settings  depending  on
operation  mode  of  the  interface.  Please  note:  The  baud  rates
57600 and 115200 are only available for COM3.

Number of data bits and parity:

7 data bits, even parity

8 data bits, odd parity

8 data bits, even parity

7 data bits, no parity

8 data bits, no parity

7 data bits, odd parity

Factory settings depending on operation mode of the interface.

Transmission log:

Xon/Xoff protocol (factory setting).

Network  operation  according  to  RS422  standard  via  optional
RS422/485 interface (COM1). Not available for COM2/COM3.

Network  operation  according  to  RS485  standard  via  optional
RS422/485 interface (COM1). Not available for COM2/COM3.

No communication protocol.

Network address  (only available  for “Net 422“ and “Net  485“.  For
further details on network operation see section 5.1.5).

Network addresses 0-31 are available.

PCC-WAK_81.docx

Version: 1.0.23049

Page 29 of 41

PCC Module: Scale Interfacing

Interface type:

 Voltage
V24/V.28)

interface  according

to  EIA  RS-232C/DIN  66020  (CCITT

Max. cable length:

15m

Signal level data lines:

Level “0“ (with RL > 3 kΩ): +3V to +25V (high)

Level “1“ (with RL > 3 kΩ): -3V to -25V (low)

Connections:

Spider: Sub-D, 9-pole, (female) connector, Spider S: round plug, 8-pole

Operation mode:

full duplex

Transmission type:

bit-serial, asynchronous

Transmission code:

ASCII

Protocol/flow control:

without, XON, XOFF

Baud rates:

300, 600, 1200, 2400, 4800, 9600

Data bits:

Stop bits:

7 or 8

Interface 1: receive at least 1 stop bit, send 2 stop bits

Interface 2: always 1 stop bit for sending and receiving

Parity:

without, even, odd

Pin assignment RS232C Spider (view on connector)

Pin 1: digital output +5V/50mA, only interface 1

Pin 2: TxD (transmission line of the scale)

Pin 3:RxD (receiving line of the scale)

Pin 4:DSR (receiving line for hardware handshake), only interface 2

Pin 5:GND (signal ground)

Pin 6:DTR (transmission line for hardware handshake), only interface 2

Pin 8: V-ACCU (power supply from external storage battery, 6.3… 12VDC/200mA), only interface 1

Pin 9: Digital input for external contact (between Pins 5 and 9), only interface 1

PCC-WAK_81.docx

Version: 1.0.23049

Page 30 of 41

PCC Module: Scale Interfacing

Pin assignment RS232C Spider S (view on connector)

Pin 1: shielding

Pin 2: TxD (transmission line of the scale)

Pin 3:RxD (receiving line of the scale)

Pin 4:PONOFF (Power On/Off) for interface 1, DTR for interface 2

Pin 5: Digital input for external contact (between Pins 5 and 6), only interface 1

Pin 6:GND (signal ground)

Pin 7: V-ACCU (power supply from external storage battery, 6.3… 12VDC/200mA), only interface 1

Pin 8: BATLOW (external storage battery low) for interface 1, DSR for interface 2

PCC-WAK_81.docx

Version: 1.0.23049

Page 31 of 41

PCC Module: Scale Interfacing

Pin assignment RS232C Spider S (view on connector)

1 ────────────── 1

2 ────────────── 2

3 ────────────── 3

4 ────────────── 4

5 ────────────── 5

6 ────────────── 6

7 ────────────── 7

8 ────────────── 8

9 ────────────── 9

Data cable 9-pole M/F, 1.8 m long, No. 00410024

This cable, for example, connects the Spider terminal with a PC or printer GA42. All pins are connected 1:1. This cable is equipped
with a 9-pole Sub D plug (M) and a 9-pole Sub D socket (F).

Data cable 9-pole M/M, 1.8 m long, No. 21250066

This cable connects the Spider terminal with an optional second display. All pins are connected 1:1. This cable is equipped with two
9-pole Sub D plugs (M).

PCC-WAK_81.docx

Version: 1.0.23049

Page 32 of 41

PCC Module: Scale Interfacing

2.7  Scale Driver Nobel Elektronik E1TAD

2.7.1  General

Description  of  the  scale  driver  Nobel  Elektronik  E1TAD.  Connection  is  established  via  a  special  RS232

cable. Scale values are requested by the terminal.

2.7.2

Interface

Using the RS232 connection, the host computer is directly connected with the scale via a serial cable.

Contact:
2
3
5

Short description
RxD
TxD
GND

Meaning
Receive data
Transmit data
Signal ground

Shop floor PC

scale E-1-TAD

Default interface settings are:

9600  Baud

7 data bits

1 start bit

E parity bits

1 stop bit

There is no handshake. It must be guaranteed that the connected host computer is always able to hold a

complete telegram in its receive buffer.

PCC-WAK_81.docx

Version: 1.0.23049

Page 33 of 41

PCC Module: Scale Interfacing

2.7.3  Settings nobel_e1tad.ini

 [WAAGE_000]

COM=2,9600,7,E,1

// The scale's communication address

 Settings for the serial interface

Adr-Scale=02

 Communication address of the scale. If this address is

not  configured  properly,  the  scale  receives  the  request

with a wrong address and recognizes that this request is

not  intended  for  it.  Consequently,  the  scale  sends  the

request to the next participant.

// Request parameters specific to scale.

Brutto_Scale=GV

Netto_Scale=NV

 gross value requested from scale

 net value requested from scale

V:EGR:GUTS=BRUTTO

 Dialog ID including value requested from PCC.

Additional features

From version 7.2.1.1 on:

  The shop floor terminal can request a value (gross or net) via the PCC.

2.8  Scale Driver Sartorius Combics

2.8.1  General

The weighing unit consists of a display unit, scale pan and printers or computers that can be connected

optionally. The driver supports the display units Sartorius Combics 1, Combics 1 plus and Combics 2 of

the series CISL 1 / CISL 1 N / CISL 2 / CIS 1 / CIS 1 N / CIS 2 . The evaluation PC is connected to the

display device via a serial RS-232 interface.

Required files:

  Sartorius_Combics.dll

  Sartorius_Combics.ini

PCC-WAK_81.docx

Version: 1.0.23049

Page 34 of 41

PCC Module: Scale Interfacing

2.8.2  Example for driver INI

[SERVICE]

info=sartorius_combics.dll

intervall=0

testmode=0

tracing=0

TraceLevel=5

ExecuteQueue=1

ThreadBaseId=100

[WAAGE_000]

COM=1,9600,8,O,1

; scale outputs acoustic signals

BEEP=ON

;BEEP=OFF

V:ERR=ERR

V:GEWICHT=NETTO

PCC-WAK_81.docx

Version: 1.0.23049

Page 35 of 41

PCC Module: Scale Interfacing

;V:GEWICHT=BRUTTO

V:EINHEIT=EINHEIT

POLL=0

POLL_I=500

2.8.3  Settings of Sartorius_Combics.ini

Serial interface

Interface  parameters  have  been  defined  with  9600  Bd,  8  bits  per  character,  one  stop  character  and

uneven parity. The free COM interface must be defined as the first parameter (COM=1,9600,8,O,1).

Acoustic signal

The  scale  may  output  an  acoustic  signal.  If  the  parameter  "BEEP"  is  set  to  "ON",  a  brief  signal  tone

sounds,  once  weight  has  been  transferred  successfully  to  HYDRA.  If  an  error  occurred,  the  scale  unit

emits three short sounds. No signal will be sent if BEEP=OFF is set.

Weight parameter

A computer connected to the output unit can only request one weight value from the scale unit. This may

be  either  a  gross  value  or  a  net  value  depending  on  the  value  currently  displayed.  The  driver  module

comparing  the  weight  value  with  the  Getval  requested  by  PCC  is  informed  about  the  value  type.  This

driver module returns an error value in the ERR field if different weight types (gross and net) are used.

Example:

PCC  asks  for  the  gross  weight  by  V:GEWICHT=BRUTTO.  But  the  scale  sends  the  net  weight

value. The driver returns the weight "V:Gewicht=0" and an error value with "V:ERR=BRU->NET".

At the same time three short signal tones sound if BEEP=ON is set.

Possible error messages the driver may send are mentioned in one of the chapters that follow.

Weight unit

In the  EINHEIT (UNIT) ID the scale driver sends the  unit symbol of the scale. The following values are

possible depending on the settings configured in the scale setup:

  EINHEIT=mg

  EINHEIT=g

  EINHEIT=kg

PCC-WAK_81.docx

Version: 1.0.23049

Page 36 of 41

PCC Module: Scale Interfacing

  EINHEIT=t

or other units

All possibilities can be taken from a list in the manual about the scale.

Error messages

If the scale driver identifies an error in  processing the PCC request, it returns the weight value "0" (e.g.

BRUTTO=0) and classifies the error in the ERR field. The following error messages are possible:

  ERR=TIMEOUT

the scale does not answer

  ERR=BRU->NET

PCC requests the gross value, but the scale sends the net value or vice

versa

  ERR=WAA-OFF

scale is on standby mode

  ERR=ÜBERLAST

scale pan is overloaded

  ERR=UNTER-L

load on scale pan insufficient

  ERR=JUSTAGE

scale pan is being calibrated

  ERR=NEGATIV

negative weight value displayed

  ERR=54

if a numeric value is returned

the  corresponding  error  can  be  found  in  the  manual  dealing  with  the

Sartorius scale.

If  the  weight  value  is  still  fluctuating  during  the  weighing  process,  which  is  signaled  by  the  missing  unit

symbol, the scale driver waits until the weight value is stable. If the value does not become steady within

the TimeOut period, the driver sends: ERR=TIMEOUT

Scale setup

The following diagram shows the sections in the scale setup that must comply with the definitions in order

to make sure the driver program works properly.

PCC-WAK_81.docx

Version: 1.0.23049

Page 37 of 41

Setting the weight unit

PCC Module: Scale Interfacing

Device parameters
Codes are requested if the code word is active.

Weighing platform 1
(display of this menu level)

OFF
ON

Adaptation to the installation site (adapt filters)
Very stable conditions
Stable conditions
Unstable conditions
Very unstable conditions

Filtering in use
weighing/balancing
dosing
Low degree of filtering
Without filtering

Stability range/fluctuation range
¼ increment (scale interval)
½ increment
1 increment
2 increments
4 increments
8 increments

Stability delay
Without delay
Short delay
Average delay
Long delay

Taring
Without stability
After stability

Autozero
On
Off
Weight unit 1
Gram / g
Kilogram / kg
Carat / ct
Pound / lb
Ounce / oz
Troy ounce / ozt
Tael Hong Kong / tlh
Tael Singapore / t
Tael Taiwan / tlt
Grain / GN
Pennyweight / dwt
Milligram / mg
Parts per Pound //lb
Tael China /tlc
Momme /mom
Carat /K
Tola /tol
Baht /bat
Mesgahl /MS
Ton /t

Display accuracy 1
All digits
Reduced by 1 digit when loads change
Reduce resolution by 1 scale interval (e.g. from 1g to 2g/5g to 10g)
Reduce resolution by 2 scale intervals (e.g. from 1g to 5g)
Reduced by 1 digit

PCC-WAK_81.docx

Version: 1.0.23049

Page 38 of 41

Transfer parameters for the serial interface (arrows identify the parameters to be selected)

Arrows identify the parameters to be selected

PCC Module: Scale Interfacing

Interface 1
(display of this menu level: 2)

OFF
Weighing platform 2
RS-232

SB1 standard version

SB1 calibration version

XBP1.232

Setup menu as with weighing platform 1

Calibration, adjustment
External calibration/adjustment; standard weight
External calibration/adjustment; weight can be selected (menu item 1.18.1)
Internal calibration/adjustment
Press key                        to block scale

Setup menu as with weighing platform 1

ADC-232 ¹)

Setup menu as with weighing platform 1

Data logs

SB1 standard version

Baud rate
150
300
600
1200
2400
4800
9600
19200

Baud
Baud
Baud
Baud
Baud
Baud
Baud
Baud

Parity
Space (space character)
Odd
Even
None

Number of stop bits

1 stop bit
2 stop bits

Handshake operation mode
Software handshake

Hardware handshake, after CTS still 1 character

Number of data bits
7 data bits
8 data bits

Manual/automatic data output
Manual without stability
Manual after stability
Automatic without stability
Automatic with stability
Printing logs/protocols at computer (PC)

Time-dependent, automatic data output
1 display update/cycle
2 display updates
10 display updates
100 display updates

Data output: time format
For raw data: 16 characters
For other applications: 22 characters

Factory settings for the setup menu for COM1: SB1
Yes
No

¹) = menu depends on the connected scale/weighing platform

PCC-WAK_81.docx

Version: 1.0.23049

Page 39 of 41

PCC Module: Scale Interfacing

2.8.4  Connecting lines

Measurement system

PC

Cable layout

Pin assignment for the cable from the measuring device to an RS-232-PC interface

25-pole D-Sub connector

D-Sub socket

(Model CISLI1 / CISL2)

      9-pole

or    25-pole

Measurement device

Free cable end

(Model CIS1 / CIS2)

PC

D-Sub socket

      9-pole

or    25-pole

Measurement device

PC

PCC-WAK_81.docx

Version: 1.0.23049

Page 40 of 41

PCC Module: Scale Interfacing

PCC-WAK_81.docx

Version: 1.0.23049

Page 41 of 41

