Manual
Master terminal with DS-100
interfacing
TSW-MTS 8.1
Version 1.0.23049
Last changed on: 02.09.2020

Master terminal with DS-100 interfacing
Copyright
©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.
Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.
TSW-MTS_81.docx Version: 1.0.23049 Page 2 of 15

Master terminal with DS-100 interfacing
Contents
1 Master Terminal with DS-100 Interfacing - Overview .................................. 4
2 Master Terminal with DS-100 ....................................................................... 5
3 Important information ................................................................................... 6
3.1 DS-100 - Overview .............................................................................................. 6
3.2 MT3 - Overview ................................................................................................... 6
4 Operation ..................................................................................................... 7
4.1 Master terminal ................................................................................................... 7
4.2 Layout of DS-100 ................................................................................................ 7
4.2.1 Functions of LED displays ....................................................................... 7
4.2.2 Keypad .................................................................................................... 8
4.2.3 Display .................................................................................................... 8
4.2.4 Configuration of the DS-100 device address.......................................... 10
5 Configuration .............................................................................................. 12
5.1 Configuration on the HYDRA client ................................................................... 12
5.1.1 Terminal configuration ........................................................................... 12
5.1.2 MDE configuration of the machine ......................................................... 12
5.2 Entries in the configuration file of the master terminal ....................................... 12
6 Service display at the master terminal ....................................................... 14
TSW-MTS_81.docx Version: 1.0.23049 Page 3 of 15

Master terminal with DS-100 interfacing
1 Master Terminal with DS-100 Interfacing - Overview
Possible fields of application
Along with DS-100 terminals and based on a shop floor PC, the master terminal function with DS-100
interfacing enables the decentralization of the automatic quantity input and the manual input of machine
statuses.
Implementation notes
The function package is used if you:
 wish to implement decentralized quantity input based on a master terminal
 wish to implement a user-friendly option to manually enter the machine status directly at the
machine
Integration
The function package requires an operative shop floor PC with installed data acquisition software (AIP or
CTWIN).
Functions
Configurable application and communication software to operate a maximum of 16 DS-100 at PCs or
shop floor terminals (Windows terminals or IPCs of other manufacturers) used as master terminal:
 Terminal dialogs to log on, interrupt and finish orders at a central place. Take-over of quantities
and machine statuses recorded in a decentralized manner using DS-100.
 Current overview on the order progress (quantities) and machine statuses.
TSW-MTS_81.docx Version: 1.0.23049 Page 4 of 15

|     |     |     |     |     |     |     | Master terminal with DS-100 interfacing  |     |     |
| --- | --- | --- | --- | --- | --- | --- | ---------------------------------------- | --- | --- |

2  Master Terminal with DS-100
This document is based on the manuals dealing with the HYDRA standard Windows terminals (AIP or
CTWIN). Consequently, this document only describes the special features if used as master terminal as
well as the operation of DS-100.
The HYDRA standard Windows terminal can be used as master terminal to trigger the devices "DS-100"
by MPDV as well as "MT3" by IBS. This results in a data acquisition system with the following structure:
Diagram
Master Terminal and DS-100 Subbus

HYDRA server
|     |     |                 |     |     | LAN           |                 |     |               |                 |
| --- | --- | --------------- | --- | --- | ------------- | --------------- | --- | ------------- | --------------- |
|     |     |                 |     |     |               |                 |     |               |                 |
|     |     | Master terminal |     |     |               | Master terminal |     |               | Master terminal |
|     |     |                 |     |     |               |                 |     |               |                 |
|     |     | RS 485-Subbus   |     |     | RS 485-Subbus |                 |     | RS 485-Subbus |                 |

However, it is not possible to use both device types at one master terminal.

| TSW-MTS_81.docx  |     |     |     | Version: 1.0.23049  |     |     |     |     | Page 5 of 15  |
| ---------------- | --- | --- | --- | ------------------- | --- | --- | --- | --- | ------------- |

|     |     |     | Master terminal with DS-100 interfacing  |     |
| --- | --- | --- | ---------------------------------------- | --- |

3  Important information
A master terminal can trigger up to 16 devices of the type "DS-100" or "MT3".
| 3.1  | DS-100 - Overview  |     |     |     |
| ---- | ------------------ | --- | --- | --- |
  One DS-100 is exactly assigned to one machine.
|   It provides the following interfaces for machine communication:  |     |     |     |     |
| ------------------------------------------------------------------- | --- | --- | --- | --- |
  - 2 counter inputs
  - 1 relay
  - 1 digital input
|   DS-100 provides the following functions:  |     |     |     |     |
| -------------------------------------------- | --- | --- | --- | --- |
  - Import of machine signals (quantities/cycles, malfunction signals)
|   - Input of downtime reasons  |     |     |     |     |
| ------------------------------ | --- | --- | --- | --- |
  - Operation of the production lock
  Staff as well as operations cannot be logged on to DS-100 terminals. These functions need to be
performed at the master terminal.
  Due to its hardware properties, the DS-100 does not provide for an exact determination of actual
cycles. This can only be achieved by using CT-MSS (stored program control, "machine interface").
Please contact MPDV Project Management for further information.
| 3.2  | MT3 - Overview  |     |     |     |
| ---- | --------------- | --- | --- | --- |
  An MT3 is exactly assigned to one machine. Quantities are recorded using the machine interface
(MSS).
  Please note: The "production" status must have a number > 20 for MT3 devices.

| TSW-MTS_81.docx  |     | Version: 1.0.23049  |     | Page 6 of 15  |
| ---------------- | --- | ------------------- | --- | ------------- |

|     |     |     |     | Master terminal with DS-100 interfacing  |     |
| --- | --- | --- | --- | ---------------------------------------- | --- |

4  Operation
| 4.1  | Master terminal  |     |     |     |     |
| ---- | ---------------- | --- | --- | --- | --- |
The functions of the HYDRA standard Windows terminal are complemented by the "service display" (see
below).
| 4.2  | Layout of DS-100  |     |     |     |     |
| ---- | ----------------- | --- | --- | --- | --- |


Display
|     | A1 E1 | E2  | E3 LED displays  |     |     |
| --- | ----- | --- | ---------------- | --- | --- |
|     | ONL   | USR |                  |     |     |
|     | F1 7  | 8 9 |                  |     |     |
Keypad
|     | F2 4 | 5 6 |     |     |     |
| --- | ---- | --- | --- | --- | --- |
|     | F3 1 | 2 3 |     |     |     |
F4 0
ESC
DS-100

| 4.2.1  | Functions of LED displays  |     |     |     |     |
| ------ | -------------------------- | --- | --- | --- | --- |
A1  The display flashes if the internal relay "machine lock" is active.
The configuration is performed at the HYDRA client (ADE/MDE menu: Master data
 Machine configuration  Machines/workplaces; tab MDE configuration 
Inputs/outputs; Option machine lock
| E1  | The display flashes if "counter 1" counts a pulse.   |     |     |     |     |
| --- | ---------------------------------------------------- | --- | --- | --- | --- |
"Master dataMachine/WPMDE configuration--> yield counter=1“   or
"Master dataMachine/WPMDE configuration --> scrap counter=1“

| TSW-MTS_81.docx  |     |     | Version: 1.0.23049  |     | Page 7 of 15  |
| ---------------- | --- | --- | ------------------- | --- | ------------- |

|     |     |     | Master terminal with DS-100 interfacing  |     |
| --- | --- | --- | ---------------------------------------- | --- |

| E2  | The display flashes if "counter 2" counts a pulse.   |     |     |     |
| --- | ---------------------------------------------------- | --- | --- | --- |
Configuration: like 'E1‘, but set counter to "2“.
E3  The  display  flashes  if  the  digital  input  of  the  terminal  is  set.
This input has to be defined with "number 1" in the configuration of the HYDRA
client.
LED1 / ONL  The display flashes shortly if the master terminal operates this device while polling.
LED2  The display flashes if the production lock is enabled for the machine.
| LED3  | Not assigned  |     |     |     |
| ----- | ------------- | --- | --- | --- |
LED4 / USR  The display flashes if the device waits for user input.
e.g.: a machine status needs to be assigned

| 4.2.2  | Keypad  |     |     |     |
| ------ | ------- | --- | --- | --- |
F1  Enables input of a new machine status. The input fields are emptied.
| F2  | Not assigned                   |     |     |     |
| --- | ------------------------------ | --- | --- | --- |
| F3  | Not assigned                   |     |     |     |
| F4  | Switches the production lock.  |     |     |     |
0..9  Downtime: Input of the status number for status assignment
Production: No input possible
Confirmation of the input  Status number is transferred to the master terminal

ESC  Function of a reset button (the figure entered at last is deleted)
| 4.2.3  | Display  |     |     |     |
| ------ | -------- | --- | --- | --- |
The display includes four lines with 16 characters each.
Description:

| TSW-MTS_81.docx  |     | Version: 1.0.23049  |     | Page 8 of 15  |
| ---------------- | --- | ------------------- | --- | ------------- |

|     |     |     |     | Master terminal with DS-100 interfacing  |     |
| --- | --- | --- | --- | ---------------------------------------- | --- |

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

| TSW-MTS_81.docx  |     | Version: 1.0.23049  |     |     | Page 9 of 15  |
| ---------------- | --- | ------------------- | --- | --- | ------------- |

Master terminal with DS-100 interfacing
Examples:
Production / no order logged on ╔════════════════╗
║ ║
║Yield: 1234 ║
║Scrap: 33 ║
║Production ║
╚════════════════╝
Production / Order logged on ╔════════════════╗
║123456789012345 ║
║Yield: 1234 ║
║Scrap: 33 ║
║Production ║
╚════════════════╝
Downtime / no status assigned ╔════════════════╗
║ ║
║Downtime ║
║Not assigned ║
║Status:___ ║
╚════════════════╝
Downtime / no status assigned / production lock ╔════════════════╗
║ ║
active
║Downtime ║
║Not assigned PSP║
║Status:___ ║
╚════════════════╝
Downtime / status assigned ╔════════════════╗
║ ║
║Downtime ║
║Setup PSP ║
║Status:___ ║
╚════════════════╝
Please note for displaying the order/operation:
In case more than one operation is still logged on after an interruption/logoff, the "next" operation that is
displayed on the DS-100 is incidental.
4.2.4 Configuration of the DS-100 device address
 Pull out and plug in again the 9-pole bus connector.
 Click the F1 button within two seconds --> the current device address will be displayed in the hex
format top left.
TSW-MTS_81.docx Version: 1.0.23049 Page 10 of 15

Master terminal with DS-100 interfacing
 By clicking the buttons F1 and F2, the displayed address will be increased or reduced.
 The displayed address is taken over by clicking "¿ ".
 The bus connector has to be pulled out again briefly to save the new device address.
Please note for the device address:
- The terminal is configured in hexadecimal notation
- The HYDRA client is configured in decimal notation The
below table compares figures in decimal and hexadecimal notation to make this clear:
Dec. : 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
Hex. : 00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F
Dec. : 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31
Hex. : 10 11 12 13 14 15 16 17 18 19 1A 1B 1C 1D 1E 1F
Dec. : 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47
Hex. : 20 21 22 23 24 25 26 27 28 29 2A 2B 2C 2D 2E 2F
Dec. : 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63
Hex. : 30 31 32 33 34 35 36 37 38 39 3A 3B 3C 3D 3E 3F
e.g. Dec. 15 ==> Hex. 0F; Dec. 16 ==> Hex. 10.
TSW-MTS_81.docx Version: 1.0.23049 Page 11 of 15

|     |     |     | Master terminal with DS-100 interfacing  |     |
| --- | --- | --- | ---------------------------------------- | --- |

5  Configuration
| 5.1    | Configuration on the HYDRA client  |     |     |     |
| ------ | ---------------------------------- | --- | --- | --- |
| 5.1.1  | Terminal configuration             |     |     |     |
  ADE/MDE: Master data > Terminal configuration > Terminals
  Tab General
  The terminals "CT760" as well as "CT830" can be used as master terminals. Consequently, the
terminal type has to be set to "760" or "830".
  The operation mode of the terminal has to be set to "MDE terminal".
  Tab MDE
  The Master terminal option has to be set.
| 5.1.2  | MDE configuration of the machine  |     |     |     |
| ------ | --------------------------------- | --- | --- | --- |
  ADE/MDE:  Master data > Machine/workplace configuration >
|     |   Machines/workplaces  |     |     |     |
| --- | ---------------------- | --- | --- | --- |
  Tab MDE configuration > Inputs/outputs
  Provided  that  the  option  "master  terminal"  was  set  in  the  terminal  configuration,  "external
connection" shows the option DS-100 or MT3 as well as the device address. The device address
is to be entered as decimal number.
  DS-100 only: The relay for the machine lock is set at DS-100 if the value "1" is set in the field
"machine lock". As DS-100 has only one channel, 1 must always be entered there. The relay is
then set for all statuses assigned to “machine lock” as well as for the “not assigned” status.
Please note: It is not possible to operate DS-100 and MT3 devices at one terminal.
5.2  Entries in the configuration file of the master terminal
The following entries are relevant for the master terminal function, in addition to the INI file settings of the
Windows shop floor terminal described in the documentation dealing with the standard Windows terminal:

| TSW-MTS_81.docx  |     | Version: 1.0.23049  |     | Page 12 of 15  |
| ---------------- | --- | ------------------- | --- | -------------- |

|     |     |     | Master terminal with DS-100 interfacing  |     |
| --- | --- | --- | ---------------------------------------- | --- |

|                   | Entry  |     | Comment  |     |
| ----------------- | ------ | --- | -------- | --- |
| Section [system]  |        |     |          |     |
UpdateTime=1  MDE is requested every 5 seconds by default. As polling of the
assigned devices is triggered by this request, the request cycle
|     | should be reduced to one second  |     | by setting this value for the  |     |
| --- | -------------------------------- | --- | ------------------------------ | --- |
operation mode "master terminal". (by default: 5)
| Section [comports]  |     |     |     |     |
| ------------------- | --- | --- | --- | --- |
Com1=MASTER  The serial interfaces used for triggering the devices, have to be
entered as MASTER.

| TSW-MTS_81.docx  |     | Version: 1.0.23049  |     | Page 13 of 15  |
| ---------------- | --- | ------------------- | --- | -------------- |

|     |     |     | Master terminal with DS-100 interfacing  |     |
| --- | --- | --- | ---------------------------------------- | --- |

6  Service display at the master terminal
The service screen can be opened by entering the shortcut "Ctrl+Alt+L“ in the basic screen of the master
| terminal:  |     |     |     |     |
| ---------- | --- | --- | --- | --- |

Communication with the connected devices can be tracked in this view. Not all fields are filled out with
MT3 devices.

| Field  | Description  |     |     |     |
| ------ | ------------ | --- | --- | --- |
ID
Device name
| DS/MT    | Device type (DS-DS-100 / MT-MT3)                  |     |     |     |
| -------- | ------------------------------------------------- | --- | --- | --- |
| Machine  | Machine number of the assigned machine            |     |     |     |
| V        | Monitoring of the communication while polling:    |     |     |     |
The device that is currently being operated shows a backslash character "\“.
NET  Connection status ( J: device responds  /  T: timeout )  (not with MT3)
Reset  Start date and time are entered here if a device has been restarted since starting of the
master terminal.     (not with MT3)
| Status(h)  | Internal DS-100 device status  (not with MT3)  |     |     |     |
| ---------- | ---------------------------------------------- | --- | --- | --- |
E1-Z1  Meter reading of counter 1 (counted down from 65535) (not with MT3)
| E2-Z2  | Meter reading of counter 1     (not with MT3)        |     |     |     |
| ------ | ---------------------------------------------------- | --- | --- | --- |
| E3     | Status of the digital input (1-set)  (not with MT3)  |     |     |     |

| TSW-MTS_81.docx  |     | Version: 1.0.23049  |     | Page 14 of 15  |
| ---------------- | --- | ------------------- | --- | -------------- |

|     |     |     | Master terminal with DS-100 interfacing  |     |
| --- | --- | --- | ---------------------------------------- | --- |

| Field  | Description  |     |     |     |
| ------ | ------------ | --- | --- | --- |
Pol  Number of devices started during the last run (the device is started several times if it
responds to a status input).  (Not with MT3)
| FKT  | Shows the pressed function keys  |     |     |     |
| ---- | -------------------------------- | --- | --- | --- |
Input  Shows the status value entered in the bottom line (not with MT3)

| TSW-MTS_81.docx  |     | Version: 1.0.23049  |     | Page 15 of 15  |
| ---------------- | --- | ------------------- | --- | -------------- |