|     |     |     |     |     |     | Master Terminal using DS-100  |     |     |
| --- | --- | --- | --- | --- | --- | ----------------------------- | --- | --- |

1  Master Terminal using DS-100
This document is based on the manuals dealing with the HYDRA standard Windows terminals
(AIP).  Consequently,  this  document only  describes  the  special features  if  used  as  master
terminal as well as the operation of DS-100.
The HYDRA standard Windows terminal can be used as master terminal to trigger the devices
"DS-100" by MPDV as well as "MT3" by IBS. This results in a data acquisition system with the
following structure:
Diagram
Master Terminal and DS-100 Subbus

HYDRA server

|     |     |                 |     | LAN             |     |     |                 |     |
| --- | --- | --------------- | --- | --------------- | --- | --- | --------------- | --- |
|     |     | Master terminal |     | Master terminal |     |     | Master terminal |     |
|     |     |                 |     |                 |     |     |                 |     |
|     |     | RS 485-Subbus   |     | RS 485-Subbus   |     |     | RS 485-Subbus   |     |

However, it is not possible to use both device types at one master terminal.

| AIP-MTS_base.docx  |     |     | Version: 1.1.19468  |     |     |     |     | Page 1 of 11  |
| ------------------ | --- | --- | ------------------- | --- | --- | --- | --- | ------------- |

|     |     |     | Master Terminal using DS-100  |     |
| --- | --- | --- | ----------------------------- | --- |

2  Important information
A master terminal can trigger up to 16 devices of the type "DS-100" or "MT3".
| 2.1  | DS-100 - Overview  |     |     |     |
| ---- | ------------------ | --- | --- | --- |
  One DS-100 is specifically assigned to one machine.
  It provides the following interfaces for machine communication:
  - 2 counter inputs
  - 1 relay
  - 1 digital input
  DS-100 provides the following functions:
  - Import of machine signals (quantities/cycles, malfunction signals)
|   - Input of downtime reasons  |     |     |     |     |
| ------------------------------ | --- | --- | --- | --- |
  - Operation of the production lock
  Staff as well as operations cannot be logged on to DS-100 terminals. These functions need
to be performed at the master terminal.
  Due to its hardware properties, the DS-100 does not provide for an exact determination of
actual  cycles.  This  can  only  be  achieved  by  using  CT-MSS  (stored  program  control,
"machine interface"). Please contact MPDV Project Management for further information.
| 2.2  | MT3 - Overview  |     |     |     |
| ---- | --------------- | --- | --- | --- |
  An  MT3  is  exactly  assigned  one  machine. Quantities  are  recorded  using the  machine
interface (MSS).
  Please note: The "production" status must have a number > 20 for MT3 devices.

| AIP-MTS_base.docx  |     | Version: 1.1.19468  |     | Page 2 of 11  |
| ------------------ | --- | ------------------- | --- | ------------- |

|     |     |     | Master Terminal using DS-100  |     |
| --- | --- | --- | ----------------------------- | --- |

3  Operation
| 3.1  | Master terminal  |     |     |     |
| ---- | ---------------- | --- | --- | --- |
The functions of the HYDRA standard Windows terminal are complemented by the "service
display" (see below).
| 3.2  | Layout of DS-100  |     |     |     |
| ---- | ----------------- | --- | --- | --- |


Display
|     | A1 E1 E2 | E3  |     |     |
| --- | -------- | --- | --- | --- |
LED displays
|     | ONL      | USR |     |     |
| --- | -------- | --- | --- | --- |
|     | F1 7 8 9 |     |     |     |
|     | F2 4 5 6 |     |     |     |
Keypad
|     | F3 1 2 3 |     |     |     |
| --- | -------- | --- | --- | --- |
F4 0 ESC
DS-100

| 3.2.1  | Functions of LED displays  |     |     |     |
| ------ | -------------------------- | --- | --- | --- |
A1  The display flashes if the internal relay "machine lock" is active.
The configuration is performed at the HYDRA client (ADE/MDE menu:
Master data  Machine configuration  Machines/workplaces; tab MDE
configuration  Inputs/outputs; Option
| E1  | The display flashes if "counter 1" counts a pulse.   |     |     |     |
| --- | ---------------------------------------------------- | --- | --- | --- |
"Master dataMachine/WPMDE configuration--> yield counter=1“   or

| AIP-MTS_base.docx  |     | Version: 1.1.19468  |     | Page 3 of 11  |
| ------------------ | --- | ------------------- | --- | ------------- |

|     |     |     | Master Terminal using DS-100  |     |
| --- | --- | --- | ----------------------------- | --- |

"Master dataMachine/WPMDE configuration --> scrap counter=1“
| E2  | The display flashes if "counter 2" counts a pulse.   |     |     |     |
| --- | ---------------------------------------------------- | --- | --- | --- |
Configuration: like 'E1‘, but set counter to "2“.
E3  The  display  flashes  if  the  digital  input  of  the  terminal  is  set.
This input has to be defined with "number 1" in the configuration of the
HYDRA client.
LED1 / ONL  The display flashes shortly if the master terminal operates this device while
polling.
LED2  The display flashes if the production lock is enabled for the machine.
| LED3  | Not assigned  |     |     |     |
| ----- | ------------- | --- | --- | --- |
LED4 / USR  The display flashes if the device waits for user input.
e.g.: a machine status needs to be assigned

| 3.2.2  | Keypad  |     |     |     |
| ------ | ------- | --- | --- | --- |
F1  Enables input of a new machine status. The input fields are emptied.
| F2  | Not assigned                   |     |     |     |
| --- | ------------------------------ | --- | --- | --- |
| F3  | Not assigned                   |     |     |     |
| F4  | Switches the production lock.  |     |     |     |
0..9  Downtime: Input of the status number for status assignment
Production: No input possible

Confirmation of the input  Status number is transferred to the master terminal
ESC  Function of a reset button (the figure entered last is deleted)

| AIP-MTS_base.docx  |     | Version: 1.1.19468  |     | Page 4 of 11  |
| ------------------ | --- | ------------------- | --- | ------------- |

|     |     |     |     | Master Terminal using DS-100  |     |
| --- | --- | --- | --- | ----------------------------- | --- |

| 3.2.3  | Display  |     |     |     |     |
| ------ | -------- | --- | --- | --- | --- |
The display includes four lines with 16 characters each.
Description:
| Status  |     | Line1  | Line2  | Line3  | Line4  |
| ------- | --- | ------ | ------ | ------ | ------ |
Production / OP logged on  Order no. + OP  Yield  Scrap  "Production“
no.
Production without OP  (free)  Yield  Scrap  "Production:__“
Downtime / OP logged on  Order no. + OP  "Downtime“  Current status  "Status:___“
no.
Downtime / no OP logged on  (free)  "Downtime“  Current status  "Status:___“
Downtime  /  production  lock  Order no. + OP  "Downtime“  Current status+  "Status:___“
| active  |     | no. / (free)  |     | "PSP“  |     |
| ------- | --- | ------------- | --- | ------ | --- |
Downtime / wrong status input  Order no. + OP  "Downtime“  Not available  "Status:___“
no. / (free)
| Shift break  |     | (free)  | "Downtime“  | "No shift"  | (free)  |
| ------------ | --- | ------- | ----------- | ----------- | ------- |

|     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- |

| AIP-MTS_base.docx  |     | Version: 1.1.19468  |     |     | Page 5 of 11  |
| ------------------ | --- | ------------------- | --- | --- | ------------- |

Master Terminal using DS-100
Examples:
╔════════════════╗
Production / no order logged on
║ ║
║Yield: 1234 ║
║Scrap: 33 ║
║Production ║
╚════════════════╝
╔════════════════╗
Production / Order logged on
║123456789012345 ║
║Yield: 1234 ║
║Scrap: 33 ║
║Production ║
╚════════════════╝
╔════════════════╗
Downtime / no status assigned
║ ║
║Downtime ║
║Not assigned ║
║Status:___ ║
╚════════════════╝
╔════════════════╗
Downtime / no status assigned / production
║ ║
lock active ║Downtime ║
║Not assigned PSP║
║Status:___ ║
╚════════════════╝
╔════════════════╗
Downtime / status assigned
║ ║
║Downtime ║
║Setup PSP ║
║Status:___ ║
╚════════════════╝
Please note: Display order/operation:
In case more than one operation is still logged on after an interruption/logoff, the "next"
operation displayed on the DS-100 is incidental.
3.2.4 Configuration of the DS-100 device address
 Pull out and plug in again the 9-pole bus connector.
AIP-MTS_base.docx Version: 1.1.19468 Page 6 of 11

Master Terminal using DS-100
 Click the F1 button within two seconds --> the current device address will be displayed in the
hex format top left.
 By clicking the buttons F1 and F2, the displayed address will be increased or reduced.
 The displayed address is taken over by clicking "¿ ".
 The bus connector must unplugged briefly to save the new device address.
Please note for the device address:
- The terminal is configured in hexadecimal notation
- The HYDRA client is configured in decimal notation
To explain this, the table below compares figures in decimal and hexadecimal notation:
Dec. : 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
Hex. : 00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F
Dec. : 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31
Hex. : 10 11 12 13 14 15 16 17 18 19 1A 1B 1C 1D 1E 1F
Dec. : 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47
Hex. : 20 21 22 23 24 25 26 27 28 29 2A 2B 2C 2D 2E 2F
Dec. : 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63
Hex. : 30 31 32 33 34 35 36 37 38 39 3A 3B 3C 3D 3E 3F
e.g. Dec. 15 ==> Hex. 0F; Dec. 16 ==> Hex. 10.
AIP-MTS_base.docx Version: 1.1.19468 Page 7 of 11

|     |     |     | Master Terminal using DS-100  |     |
| --- | --- | --- | ----------------------------- | --- |

4  Configuration
| 4.1    | Configuration on the HYDRA client  |     |     |     |
| ------ | ---------------------------------- | --- | --- | --- |
| 4.1.1  | Terminal Configuration             |     |     |     |
  ADE/MDE: Master data > Terminal configuration > Terminals
  Tab General
  The  terminals  "CT760"  as  well  as  "CT830"  can  be  used  as  master  terminals.
Consequently, the terminal type has to be set to "760" or "830".
  The operation mode of the terminal must be set to "MDE terminal".
  Tab MDE
  The Master terminal option must be set.
| 4.1.2  | MDE configuration of the machine  |     |     |     |
| ------ | --------------------------------- | --- | --- | --- |
  ADE/MDE:  Master data > Machine/workplace configuration >
|     |   Machines/workplaces  |     |     |     |
| --- | ---------------------- | --- | --- | --- |
  Tab MDE configuration > Inputs/outputs
  Provided that the option "master terminal" was set in the terminal configuration, "external
connection" shows the option DS-100 or MT3 as well as the device address. The device
address is entered as decimal number.
  DS-100 only: The relay for the machine lock is set at DS-100 if the value "1" is set in the
field "machine lock". As DS-100 has only one channel, 1 must always be entered there.
The relay is then set for all statuses assigned to “machine lock” as well as for the status
“not assigned”.
Please note: It is not possible to operate DS-100 and MT3 devices at one terminal.

| AIP-MTS_base.docx  |     | Version: 1.1.19468  |     | Page 8 of 11  |
| ------------------ | --- | ------------------- | --- | ------------- |

|     |     |     | Master Terminal using DS-100  |     |
| --- | --- | --- | ----------------------------- | --- |

4.2  Entries in the configuration file of the master terminal
The following entries are relevant for the master terminal function, in addition to the INI file
settings of the Windows shop floor terminal described in the documentation dealing with the
standard Windows terminal:
Entry  Comment
| Section [system]  |     |     |     |     |
| ----------------- | --- | --- | --- | --- |
UpdateTime=1  MDE is requested every 5 seconds by default. As polling of
the assigned devices is triggered by this request, the request
cycle should be reduced to one second by setting this value
for the operation mode to "master terminal". (by default: 5)
| Section [comports]  |     |     |     |     |
| ------------------- | --- | --- | --- | --- |
Com1=MASTER  The serial interfaces used for triggering the devices, must be
entered as MASTER.

| AIP-MTS_base.docx  |     | Version: 1.1.19468  |     | Page 9 of 11  |
| ------------------ | --- | ------------------- | --- | ------------- |

|     |     |     |     | Master Terminal using DS-100  |     |
| --- | --- | --- | --- | ----------------------------- | --- |

5  Service display at the master terminal
The service screen can be opened by entering the shortcut "Ctrl+Alt+L“ in the basic screen of
the master terminal:

Communication with the connected devices can be tracked in this view. Not all fields are filled
with MT3 devices.

| Field    | Description                                   |     |     |     |     |
| -------- | --------------------------------------------- | --- | --- | --- | --- |
| ID       | Device address                                |     |     |     |     |
| DS/MT    | Device type (DS-DS-100 / MT-MT3)              |     |     |     |     |
| Machine  | Machine number of the assigned machine        |     |     |     |     |
| V        | Monitoring of communication while polling:    |     |     |     |     |
The device currently being operated shows a backslash character "\“.
NET  Connection status ( J: device responds  /  T: timeout )  (not with MT3)
Reset  Start date and time are entered here if a device has been rebooted since the start
of the master terminal.  (Not with MT3)
| Status(h)  | Internal DS-100 device status  (not with MT3)  |     |     |     |     |
| ---------- | ---------------------------------------------- | --- | --- | --- | --- |
E1-Z1  Meter reading of counter 1 (counted down from 65535) (not with MT3)
| E2-Z2  | Meter reading of counter 1     (not with MT3)  |     |     |     |     |
| ------ | ---------------------------------------------- | --- | --- | --- | --- |

| AIP-MTS_base.docx  |     | Version: 1.1.19468  |     |     | Page 10 of 11  |
| ------------------ | --- | ------------------- | --- | --- | -------------- |

|     |     |     | Master Terminal using DS-100  |     |
| --- | --- | --- | ----------------------------- | --- |

| Field  | Description                                          |     |     |     |
| ------ | ---------------------------------------------------- | --- | --- | --- |
| E3     | Status of the digital input (1-set)  (not with MT3)  |     |     |     |
Pol  Number of devices started during the last run (the device is started several times if
it responds to a status input).  (Not with MT3)
| FKT  | Shows the pressed function keys  |     |     |     |
| ---- | -------------------------------- | --- | --- | --- |
Input  Shows the status value entered in the bottom line (not with MT3)

| AIP-MTS_base.docx  |     | Version: 1.1.19468  |     | Page 11 of 11  |
| ------------------ | --- | ------------------- | --- | -------------- |