Protocol Module PCC-DIF

1  Protocol Module PCC-DIF

1.1  Architecture, Data Contents

The  file  interface  is  connected  with  a  HYDRA  CTWIN  terminal.  An  interface  directory  used  for  the

communication  is  defined  in  the  data  storage  (hard  disk)  of  the  CTWIN  terminal  or  in  another  directory

within a network which can be accessed by the terminal. The communication partners’ data is stored into

- or read out from this directory.

1.2  File Handling

Data  has  to  be  transferred  in  a  secured  process:  All  read  or  write  operations  have  to  be  executed  as

separate, single processes. For this reason, the copy command provided by the operating system is  not

appropriate. The rename/move commands have to be used instead, i.e. HYDRA and the partner program

each work on temporary copies and separately provide or collect the data using the “rename” function. In

case  of  file  conflicts,  which  might  rarely  occur  though,  the  error  needs  to  be  rectified  and  the  access

attempt is to be repeated after an appropriate wait time has elapsed.

HYDRA-PCC-DIF works as follows:

MBL_PCC-DIF.docx

Version: 1.0.1362

Page 1 of 10

  Directoryinfileoutfiletemp. filesHYDRA CTWIN-TeminalMachine with communication/serverLANData storage

Protocol Module PCC-DIF

Receive  data:  the  existence  of  the  defined  data  file  is  constantly  checked.  If  this  file  is  available,  it  is

automatically renamed as a temporary file. HYDRA then internally processes this file entirely. Afterwards

the file is deleted. In case the file is still available after restarting the system, it will be processed at first.

Send  data:  Data  is  attached  (appended)  inside  the  existing,  temporary  outbound  file  or  a  new  file  is

created. Once the write process has been finished, this file is renamed as the final outbound file, provided

that this outbound file does not exist at that moment. If the outbound file exits, it is waited for the partner

to pick up this file. During this wait time, data is continued being attached (appended) within the existing

temporary file.

The partner system has to comply with this procedure. This ensures that no conflicts occur and

no data gets lost.

Communication monitoring – error handling:

The following PCC-DIF procedure may be used to monitor communication: A timeout can be defined for

outbound  as  well  as  inbound  files,  which  specifies  when  an  outbound  file  has  to  be  collected  or  a  new

inbound file has to be available. If the timeout has been exceeded, the PCC-DIF driver interprets this as

an  error  in  the  communication  and  returns  it  to  the  terminal/shop  floor  PC.  Consequently,  the  interface

function can be represented as channel fault at the terminal. Operating system errors occurred during the

read/write process are also sent as error in the communication to the terminal. If timeouts are defined, at

least  empty  files  have  to  be  exchanged  between  the  two  communication  partners.  Vice  versa,  it  might

also  be  important  to  the  communication  partner  to  recognize  whether  or  not  HYDRA  is  ready  to

communicate. This is ensured by HYDRA providing at least an empty file, which can be picked up by the

partner, within a defined interval. The driver creates this file as substitute, unless a communication takes

place anyway during this interval.

1.3  File Structure

The files are text files including at least one data record per line. This allows for several data records to

be transferred in a sequential order within one file. The file is processed according to the FIFO principle.

The file is read out starting at the beginning; new data records are attached at the end.

Each line has the following dynamic structure:

<Identifier>=<Value>|…

Example:

COUNTER1=25655|COUNTER2=7625|INP01=1|ZYK1=12.5|P1=2345.31|P2=231.1|DAT=08/30/2006|ZEI=16:54:20
COUNTER1=25656|COUNTER2=7625|INP01=1|ZYK1=12.3|P1=2456.34|P2=231.8|DAT=08/30/2006|ZEI=16:54:32
COUNTER1=25657|COUNTER2=7627|INP01=0|ZYK1=12.2|P1=2645.65|P2=231.6|DAT=08/30/2006|ZEI=16:54:44
…

MBL_PCC-DIF.docx

Version: 1.0.1362

Page 2 of 10

Protocol Module PCC-DIF

Such  lines  are  listed  one  after  the  other;  each  line  may  have  different  contents.  The  respective

configuration determines whether or not this delivers reasonable results.

If several groups are defined at collection channels (see below), different files have to be used.

1.4  File Content

The  driver  imports  the  data  file  lines  one  after  the  other  and  saves  them  in  internal  line  storage  on  the

group channels.

This data is transferred to the HYDRA applications on the basis of the specified read-out rules, i.e. data

included in one line is interpreted together:

1.4.1 Machine Data

Operating statuses of machines and quantity information rank among the shop floor data provided by the

HYDRA-MDE  area.  Digital  information  on  malfunctions  as  well  as  meter  readings  of  counter  registers

may be transferred. Downtime reasons may also be forwarded as value (MSTAT) in a table.

Examples:

……..|BETRIEBSIGNAL=0|E_STOERUNG=1|…………..   Machine down, electrical interference.

……..| BETRIEBSIGNAL=1|E_STOERUNG=0|…………..

 Machine is producing

……..|ZAEHLER_IO=1234|…………..   current meter reading
……..|ZAEHLER_IO=1235|…………..   meter reading has been incremented by 1, the number of

pieces
    in HYDRA will also be increased by 1.

…|Maschinenstatus|…
……..|MSTAT@M100=1|

…...|MSTAT@M100=25|

 the machine is in machine status:  1  (this could be production)
  new  machine  status:  25    (this  could  be  a  malfunction
according
     to the configuration)

Contents  of  counter  registers  are  transferred  as  counter  information.  HYDRA  only  evaluates  counter

differences as increase in the quantities.

The below definition applies:

-  The counter register increases up to a meter reading  OVERFLOW that is defined in the

driver’s INI file and restarts at an initial value (e.g. OVERFLOW = 30000). Only a global

value may be defined. All counter registers within a file work with the same OVERFLOW

MBL_PCC-DIF.docx

Version: 1.0.1362

Page 3 of 10

Protocol Module PCC-DIF

value. If a lower figure is suddenly imported, it is grossed up to the overflow and counted

from the initial value

-  The counter register starts at a meter reading OVERFLOW_MODE defined in the driver’s

INI file. Three statuses can be distinguished:

1. OVERFLOW_MODE=0   after an overflow it is restarted at ‘0’.

2. OVERFLOW_MODE=1   after an overflow it is restarted at ‘1’.

3. OVERFLOW_MODE=RESET   if a lower value is recognized

the last imported figure is considered being the overflow and

the meter readings until this overflow has been reached are ignored.

Once the terminal application “ctwin” has been restarted, the counter value of a counter register that is

first identified is used as new reference value for determining the differences. Only when this counter

register has been identified once more, the counter difference can be forwarded to HYDRA.

1.4.2 Transfer of Values

If  values,  such  as  weights  or  article  numbers  (no  process  data)  are  to  be  transferred  from  a  file  to

HYDRA, they may be included as values in data records. The values are transferred in configuration “V”:

the separator “|” must not appear in the transfer values.

1.4.3 Process Data (for the HYDRA-PDV module)

Process  data  is  read  out  from  the  line  as  tuple  of  measured  values  and  saved  in  an  internal  buffer

belonging to the module. Depending on how the read-out is configured (by trigger or cyclically), HYDRA

accepts the saved process values. When data is to be collected by trigger, the trigger should be provided

in the same line where the PDV values are defined. As in any other case, the PDV values of the previous

line  that  has  been  imported  will  be  transferred  to  HYDRA.  If  cyclic  data  collection  is  used,  the  PDV

values, which are stored within the buffer at the time of the request, will only be transferred to HYDRA.

A  buffered  transfer  of  the  rows  may  be  used  for  transferring  mass  data  (high  volume  data).  In  the

configuration file of the driver, the item “PDV_MODE=AUTO” is set (“automatic”). Now any process data

is  included  in  the  automatic  signal  processing  of  HYDRA.  If  “PDV_MODE=MAN”  is  set  (manual),  the

above-described procedure will be reset and HYDRA will control the data transfer manually.

Time monitoring:

MBL_PCC-DIF.docx

Version: 1.0.1362

Page 4 of 10

Protocol Module PCC-DIF

The data lines may be provided with a time stamp by indicating DATE (notation yyyy/mm/dd) and TIME

(hh:mm:ss). As far as it is possible, this time stamp is taken into account for postings. In particular in the

automatic  mode,  each  line  including  its  time  stamp  is  transferred  to  HYDRA-PDV  data  collection.

However, please note in this context that the HYDRA clock never goes backwards, i.e. the times must be

ascending. Moreover, current events may affect the posting of old values in a way which prevents them

from being taken into  account, e.g. collision of manual postings of the machine  status  with still  pending

automatic postings. Furthermore, cycle time monitoring can only be used online! Process data may have

an old time stamp but online warnings are no longer possible.

Thus, it is reasonable to keep the connection up-to-date to avoid errors in data collection and posting due

to time delays.

Measured  values  are  reworked  statistically  in  HYDRA-PDV  7.2.  But  this  is  only  possible  for  a  limited

period  of  time  (reaching  into  the  past)  when  it  comes  to  data  collection.  Older  measured  values  are  no

longer recalculated statistically. By default, this is one hour, i.e. the time stamps included in the data rows

must not be older than one hour. The data transmitter, machine or interface, has to guarantee this.

If no time stamp is defined, the system always refers to the current time of the data import.

1.5  Channel Concept

The transfer of machine data using the file is based on the channel principle:

HYDRA knows channels; each channel is configured in such a way as to assign an identifier from the file

including its value to this channel. The channels are unique for each terminal. But the identifiers may also

be assigned to several channels. Building groups in the configuration may define which channel belongs

to e.g. which machine or unit. Each group requires different communication files!

HYDRA  provides  the  below-mentioned  channel  types  –  please  also  refer  to  the  document  entitled

“Prerequisites_HYDRA_Machine_Connection.pdf“ for further information:

C:

Z:

I:

O:

Counter channels (ascending, persistent machine counters with specified overflow)

Cycle channels to collect cycle times of the machine

Digital input channels

Digital output channels

MSTAT:

Numeric machine status, as an alternative to the digital input channels

P:

T:

Process data channels

Trigger channels triggering process data collection

MBL_PCC-DIF.docx

Version: 1.0.1362

Page 5 of 10

Protocol Module PCC-DIF

V:

Value  channels  for  specific  read  and  write  operations,  e.g.  scale  requests  or  PCC-ADP

information

These  channels  are  numbered,  pooled  to  groups  by  an  INI  file  and  named  accordingly.  The  PCC-DIF

module may be used  in  addition to other  PCC protocol modules for each terminal. The modules  in  use

are  defined  in  the  pccdll.ini  file.  All  of  these  modules  communicate  with  each  other  using  this  channel

interface. Therefore, channels must be unique for each terminal. The respective configuration file of the

modules specifies which channel belongs to which module.

2

 Configuration of the File Interface

2.1  Conditions / Quantities

The details mentioned below have to be taken into account when PCC-DIF is configured or used:

Number of

Number

of

Fastest recording

characteristics/process

machines

cycle

parameters for each machine

PCC-DIF  Automatic

Up to 300 pieces

Up to 20 pieces

-

Cyclic

Up to 300 pieces

Up to 20 pieces

5 seconds

When it comes to cyclic recording, the quantity of characteristics is restricted in

proportion to the input rate.

2.2  PCC Configuration (pccdll.ini)

The module is registered in the PCCDLL.INI file:

driver=OPCMPDV.DLL

Example:

[SERVICE]
tracing=1
ShowErrorWindow=0

[DRIVER_1]
driver=OPCMPDV.DLL

[DRIVER_2]
driver=PCCDIF.DLL

MBL_PCC-DIF.docx

Version: 1.0.1362

Page 6 of 10

Protocol Module PCC-DIF

2.3  Module Configuration (pccdif.ini)

The  configuration  is  divided  into  the  sections  [SERVICE]  as  well  as  in  up  to  several  channel  groups

[GRP_001,  …].  The  service  section  includes  general  configurations  for  the  module.  The  single  groups

include the access paths and channels of these groups.

A group includes:

INFILE

Name of the input file with full path

OUTFILE

Name  of  the  output  file  with  full  path  (the  output  is  completely  deactivated  if

nothing is indicated).

OUTFILE_DELETETIME

Wait time in minutes after which the OUTFILE file is deleted. This

prevents  the  file  from  increasing  exceedingly  when  it  comes  to  interferences  in

the communication. It goes without saying that in this case, the postings included

in the file get lost.

INFILE_TIMEOUT

Wait time in seconds after which a new INFILE file has to be provided by

the communication partner. If this is not the case, an error message will be sent

to the HYDRA terminal. If required, the terminal may trigger a response (posting,

or  similar).  But  the  communication  partner  may  also  just  send  an  empty  file  to

indicate that it is still “alive”.

OUTFILE_TIMEOUT  Wait time in seconds after which the OUTFILE file has to be picked up by

the communication partner. If this is not the case, an error message will be sent

to the HYDRA terminal. If required, the terminal may trigger a response (posting

or similar).

OUTFILE_MINIMUMINTERVAL

Interval time (seconds) after which a file has to be sent at

the latest. HYDRA sends an empty file if there is no communication.

TMPINFILE

Temporary input file

TMPOUTFILE  Temporary output file

POLLTIME

Interval for file polling in milliseconds.

PDV_MODE=AUTO

Identified  HYDRA-PDV  values  are  immediately  forwarded  to  data

collection.  The  “MAN”  (manual)  mode  enables  cyclic  or  triggered

transfers. Please also see section 2.4

MBL_PCC-DIF.docx

Version: 1.0.1362

Page 7 of 10

Protocol Module PCC-DIF

SAVE_COUNTER=ON  Current  counter  readings  are  saved  when  the  application  is  finished.

When the application is restarted, the user decides through selection at

the terminal, whether or not the saved values are taken into account for

the calculation of quantities.

SAVE_INTERVAL=60  Period  of  time  for  the  cyclic  backup  of  current  meter  readings  (in

seconds), provided that the application is not finished properly.

OVERFLOW=30000

The counter register increases up to a meter reading OVERFLOW
specified in the INI file of the driver and then restarts from an initial
value.

OVERFLOW_MODE=0  „0“   after an overflow, it is restarted at “0”.

„1“   after an overflow, it is restarted at “1”.

„RESET“   If a lower figure is suddenly recognized

       the last imported figure is considered being the overflow
       and the meter readings until reaching this overflow are

ignored.

The channels

C:Cxxx

Counter  channel  with  the  ordinal  number  xxx.  Up  to  999  channels  may  be

configured

Z:Zxxx

Cycle time of the counter channel xxx

I:Ixxx / O:Oxxx  Digital channels

P:Pxxxx

Process data channel with ordinary number xxxx

T:Txxxx

Trigger channel for process values of the current group. A counter value or any

other data value may be used here. Changes are responded to.

V:Vxxxx

Value channel for specific read and write processes

Further channel configurations are possible on request.

Please  note:  Channel  numbering  including  all  protocol  modules  configured  at  the  terminal  must  be

unique.

Sample configuration (corresponds to the above-mentioned sample row):

[SERVICE]

info=PCCDIF.DLL

LogLevel=2

MBL_PCC-DIF.docx

Version: 1.0.1362

Page 8 of 10

Protocol Module PCC-DIF

STARTUPTIME=1000

[GRP_001]

INFILE= C:\CTWIN\ DATA\M100_MDE.DAT
TMPINFILEEXTENSION =TMP

OUTFILE=C:\CTWIN\ DATA\OUTFILE_M100.DAT
TMPOUTFILEEXTENSION =TMP

SENDALLRECEIVEDVALUES=OFF
SEND_RECORDINDEX=OFF

OUTFILE_DELETETIME =60
INFILE_TIMEOUT=120
OUTFILE_TIMEOUT=120
OUTFILE_MINIMUMINTERVAL =60

PDV_MODE=MAN
SAVE_COUNTER=ON
SAVE_INTERVAL=60

POLLTIME=10000

BAS.DAT=DATE
BAS.ZEI=TIME

OVERFLOW=30000
OVERFLOW_MODE=0

;// Parameter

C:C001=COUNTER1
Z:Z001=ZYK1
C:C002=COUNTER2
I:I001=INP01

P:P0001=P1
P:P0002=P2
T:T0001=COUNTER1

V:V0001=WERT01
V:V0002=AUNR

2.4  Notes on the IDs BAS.DAT and BAS.ZEI:

DAT and ZEI should be used as ID in input data..

The  IDs  provided  by  the  data  record  have  to  be  used  in  order  for  the  input  data  to  be  sent  to  the

application.

.

BAS.DAT=DAT

BAS.ZEI=ZEI

MBL_PCC-DIF.docx

Version: 1.0.1362

Page 9 of 10

Configuration of the format in the file as of version 7.2.1.7

DATE_FORMAT=mm/dd/yyyy

Protocol Module PCC-DIF

MBL_PCC-DIF.docx

Version: 1.0.1362

Page 10 of 10

