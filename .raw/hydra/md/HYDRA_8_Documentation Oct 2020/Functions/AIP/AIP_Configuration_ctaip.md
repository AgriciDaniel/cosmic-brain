|     |     |     |     | Local Configuration File ctaip.ini  |     |
| --- | --- | --- | --- | ----------------------------------- | --- |

1  Local Configuration File ctaip.ini
The most important hardware and system settings are defined for each terminal in the CTAIP.INI file of
the c:\ctaip directory.
Changes to the configuration file ctaip.ini are only enabled after rebooting the terminal
  software.
| 1.1               | Basic configuration  |     |     |          |     |
| ----------------- | -------------------- | --- | --- | -------- | --- |
|                   | Entry                |     |     | Comment  |     |
| Section [system]  |                      |     |     |          |     |

|                   | Entry  |                           |     | Comment  |     |
| ----------------- | ------ | ------------------------- | --- | -------- | --- |
| Section [system]  |        |                           |     |          |     |
| Usr=21            |        | Distinct terminal number  |     |          |     |

|                   |     | HYDRA server path:  |     |     |     |
| ----------------- | --- | ------------------- | --- | --- | --- |
| Hypath=d:\hydra\  |     |                     |     |     |     |

|     |     | Windows NT:  |     |     |     |
| --- | --- | ------------ | --- | --- | --- |
  -> DOS notation, the drive is the local drive of the server on
which HYDRA or xMES is installed
Hypath=/usr/hydra/
|     |     | Unix:    |     |     |     |
| --- | --- | -------- | --- | --- | --- |
->Unix notation
| Hostname=192.9.200.24  |     | Internet address of the server  |     |     |     |
| ---------------------- | --- | ------------------------------- | --- | --- | --- |
Offlinetimeout=600  In offline mode, the interval after which online access should be
attempted the next time. The interval is specified in seconds
Showcursor=on
|     |     | Show  or                     | hide  mouse  | pointer  | in  terminal  application:  |
| --- | --- | ---------------------------- | ------------ | -------- | --------------------------- |
|     |     | on: mouse pointer active     |              |          |                             |
|     |     | off: mouse pointer inactive  |              |          |                             |
Loadfile=  Configuration file for downloading the application from the server.
ctnet\win\ctaip.txt
The path is relative to the server directory (i.e. within “hypath”)
| Watchdog=on  |     | ON: Watchdog is activated  |     |     |     |
| ------------ | --- | -------------------------- | --- | --- | --- |
OFF: Watchdog is not activated
Demo=off  ‘on’: Offline demo mode; always off in the production environment
parameters=-t  The –t parameter switches off the virtual keyboard
| TMOUT_C=xxx  |     | Timeout for CONNECT to the server       |     |     |     |
| ------------ | --- | --------------------------------------- | --- | --- | --- |
|              |     | If not specified, default = 10 seconds  |     |     |    |
   Increase to 20 seconds for routing
TMOUT_S=xxx
Timeout for SEND to the server
|     |     | If not specified, default = 10 seconds  |     |     |     |
| --- | --- | --------------------------------------- | --- | --- | --- |
   Increase to 20 seconds for routing
TMOUT_R=xxx
|     |     | Timeout for RECEIVE of the server   |     |     |     |
| --- | --- | ----------------------------------- | --- | --- | --- |
If not specified, default = 120 seconds

AIP_Configuration_ctaip.docx  Version: 1.0.12661  Page 1 of 4

|     |     |     |     |     | Local Configuration File ctaip.ini  |     |     |
| --- | --- | --- | --- | --- | ----------------------------------- | --- | --- |

|     | Entry  |     |     | Comment  |     |     |     |
| --- | ------ | --- | --- | -------- | --- | --- | --- |
TMOUT_F=xxx
|     |     | Timeout for FILESERVER operations to the server  |     |     |     |     |     |
| --- | --- | ------------------------------------------------ | --- | --- | --- | --- | --- |
|     |     | If not specified, default = 10 seconds           |     |     |     |     |     |
  Increase to 20 seconds for routing
Section [barcode]  Configuration of customized barcode prefixes.
BarKenn90=MNR4
BarKenn90 > defines the prefix (here: 90); The ID from the dialog
...
BarKenn99=ANR3
(= acronym) is assigned.
| Section [comports]  |     |     |     |     |     |     |     |
| ------------------- | --- | --- | --- | --- | --- | --- | --- |
Com1=0    Assignment of serial interfaces to the connected devices
| com2=MSS  |     |     |     |     |     |     |     |
| --------- | --- | --- | --- | --- | --- | --- | --- |
MSS – machine interface
com3=BAR
BAR, LEGIC, RFLESER – various reading devices
Com3=LEGIC
Com4=RFLESER
| Section [MSS-INIT]  |     |     |     |     |     |     |     |
| ------------------- | --- | --- | --- | --- | --- | --- | --- |
ZAEHLER=|1|2|3|4|5|6|7|8|  Assignment of physical inputs of the MSS (machine interface) to
logical counters (ZAEHLER) according to configuration:
The first connector (labeled “0” on the MSS) corresponds to the
|     |     | logical counter no. 1                |              |                |                              |              |     |
| --- | --- | ------------------------------------ | ------------ | -------------- | ---------------------------- | ------------ | --- |
|     |     | Please note: MSS1 has only 8 inputs  |              |                |  If digital inputs are also  |              |     |
|     |     | to  be  used                         | with  MSS1,  | configuration  | should                       | be  changed  | as  |
follows:
|     |     |     | ZAEHLER=|1|2|3|4|  |     |     |     |     |
| --- | --- | --- | ------------------ | --- | --- | --- | --- |
  IN=|5|6|7|8|
IN=|9|10|11|12|13|14|15|  Assignment  of  physical  MSS  inputs  to  logical  inputs  as  per
configuration:
The ninth connector (labeled “8” on the MSS) corresponds to the
logical input no. 1
| CHARGE=|5|6|  |     | For batch recording:                |                         |     |                 |              |           |
| ------------- | --- | ----------------------------------- | ----------------------- | --- | --------------- | ------------ | --------- |
|               |     | Inputs for automatic batch changes  |                         |     |                 |              |           |
|               |     | In  this                            | case,  the  connectors  |     | 5  and  6  are  | the  inputs  | for  the  |
automatic batch change.
MSSZyklusBerechnung=ON  Activates reading out of  cycle time values from the machine
MSSZyklusReferenz=0
interface (MSS).
Reference for cycle calculation (smallest time unit of the MSS).
|     |     | The  default               | value  | is  0,  if  | the  parameter  | is  not  | specified.   |
| --- | --- | -------------------------- | ------ | ----------- | --------------- | -------- | ------------ |
|     |     | 0 corresponds to 100 ms.   |        |             |                 |          |              |
2 corresponds to 20 ms.
CalculateCycle=ON  The terminal itself calculates the actual cycle.
If the connected control does not provide a determined actual
cycle, then a calculated actual cycle can be displayed:
This calculated value is also available for DS100 terminals.
Please note: The calculation cannot provide exact values.
WochenEnde_ProdCheck=ON  This function prevents the weekend automatic from affecting the
“production“ status and the workplace from being set to status

999.
ON is set by default
|     |     | In  case  | WochenEnde_ProdCheck=OFF,  |     |     | the  | automatism  |
| --- | --- | --------- | -------------------------- | --- | --- | ---- | ----------- |
switches to status 999.

AIP_Configuration_ctaip.docx  Version: 1.0.12661  Page 2 of 4

Local Configuration File ctaip.ini
Entry Comment
sFrom999ToNotAttributed=OFF Only affects HYDRA-MDE machines with operation mode = "no
monitoring".
If the weekend automatic function is enabled this option prevents
the machine from switching to the "not assigned" status when the
weekend automatic ends.
Reasons: The "not assigned" status may not be set manually for
machines that are configured with the “no monitoring” option. The
"not assigned" status is normally only set for machines with
operation mode = "cyclic monitoring" or "monitoring by operating
signal".
Section [ext. software]
Button=Editor Configuration of the button in the top line: A previously started
WindowName=Editor
program can be called to the foreground at the push of a button.
SearchParts=On
Button: button caption
WindowName: Name of the program (e.g. from the taskbar).
SearchParts=On: parts of WindowName are sufficient
SearchParts=Off: WindowName must be entered completely.
The option "SearchParts=On" is recommended for programs
such as MSWord that change the title bar subject to the
document that is currently being loaded.
ProgFileName=c:\Programme\wi The program that is started if the program mentioned above
ncmd\Wincmd32.exe
cannot be called to the foreground.
AutoStart=on This option starts the program (ProgFileName) when starting the
terminal program.
Section [PDV]
Modus=PDV Operation as interface IOPDOS terminal (standard)
Modus=PDV,BDE Operation as shop floor terminal with PDV
Terminals=121,122,123 CTDOS terminals “connected” by LAN.
Only required with Mode=PDV
PDVTerminalDir=c:\hsrv\spool Directory for communication with CTDOS terminals
\
Directory for communication with the IOP
PDVIOPDir=c:\IOPSim\
For debug purposes only:
InfoFenster=100 Number of lines of the “current” window (presentation of last PDV
actions)
SlowDown=600 Slow down, to make events “visible”
;Supported barcodes
FieldWNRBarcodeOnly=Y If this entry is set the tool number may only be entered using a
scanner.
FieldNestBarcodeOnly=Y If this entry is set the cavity number may only be entered using a
scanner.
FieldNummBarcodeOnly=Y If this entry is set the number may only be entered using a
scanner.
FieldKNRBarcodeOnly=Y If this entry is set the badge number may only be entered using a
scanner.
BarcodeWNR= This field specifies which acronym is entered into the tool number
field by the scanner.
AIP_Configuration_ctaip.docx Version: 1.0.12661 Page 3 of 4

|     |     | Local Configuration File ctaip.ini  |
| --- | --- | ----------------------------------- |

| Entry  | Comment  |     |
| ------ | -------- | --- |
BarcodeNest=  This  field  specifies  which  acronym  is  entered  into  the  cavity
number field by the scanner.
BarcodeNumm=  This field specifies which acronym is entered into the number
field by the scanner.

AIP_Configuration_ctaip.docx  Version: 1.0.12661  Page 4 of 4