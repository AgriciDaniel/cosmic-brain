Manual
AIP Functions for the HR
Sector
AIP-HRF 8.1
Version 1.0.23049
Last changed on: 01.09.2020

AIP Functions for the HR Sector
Copyright
©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.
Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.
AIP-HRF_81.docx Version: 1.0.23049 Page 2 of 24

AIP Functions for the HR Sector
Contents
1 AIP Functions for the HR Sector - Overview ................................................ 4
2 AIP Functions for the HR Sector .................................................................. 5
2.1 PZE - Time & Attendance .................................................................................... 5
2.1.1 Terminal display ...................................................................................... 5
2.1.2 Operation of the PZE terminal ................................................................. 6
2.1.3 Error messages ..................................................................................... 13
2.2 ZKS – Access control ........................................................................................ 14
2.3 LLE – Terminal info on group incentives ............................................................ 14
2.4 PZE - shift plan .................................................................................................. 15
2.5 PEP - personnel schedule ................................................................................. 16
2.6 Terminal status display ...................................................................................... 17
2.7 PZE - Subsequent entry of clocking / request clocking ...................................... 18
2.8 List of absence reasons .................................................................................... 20
3 Administration of the AIP-HRF terminal ..................................................... 21
3.1 Implementation of the AIP-HRF terminal ........................................................... 21
3.2 Saving clocking records in offline mode ............................................................. 22
3.3 Configuration of CT-38x .................................................................................... 23
3.4 Integration of a customer logo ........................................................................... 24
AIP-HRF_81.docx Version: 1.0.23049 Page 3 of 24

AIP Functions for the HR Sector
1 AIP Functions for the HR Sector - Overview
Fields of application
The AIP functions included in this function package enable recording of clock-in, clock-out and break
times at the time & attendance terminals as well as the input of absence reasons for delayed clock-in,
early clock-out or other work time interruptions. Further functions include the provision of information on
account balances, the clocking records made, workforce requirements planning or information on group
incentives at the terminal.
Implementation notes
You use the function package if you would like:
 to record your employees’ clocking times
 to enter your employees’ absence reasons
 to provide your employees with information on the terminal
Integration
The data recorded via the AIP terminal can be displayed or evaluated in different MOC applications.
Functions
 Time & attendance
 Access control
 Terminal information on group bonus
 Workforce requirements planning
Further licenses have to be purchased to be able to use the above-mentioned functions.
AIP-HRF_81.docx Version: 1.0.23049 Page 4 of 24

|     |     |     | AIP Functions for the HR Sector  |     |
| --- | --- | --- | -------------------------------- | --- |

2  AIP Functions for the HR Sector
| 2.1  | PZE - Time & Attendance  |     |     |     |
| ---- | ------------------------ | --- | --- | --- |
The PZE terminal has been designed to record the employees' working times. In addition to recorded
clocking-in, clocking-out and break times, employees can also view information on current account
balances, the performed clocking records and general messages.
| 2.1.1  | Terminal display  |     |     |     |
| ------ | ----------------- | --- | --- | --- |
The PZE terminal screen is divided into different areas showing information and allowing for functions to
be selected:

| AIP-HRF_81.docx  |     | Version: 1.0.23049  |     | Page 5 of 24  |
| ---------------- | --- | ------------------- | --- | ------------- |

AIP Functions for the HR Sector
2.1.2 Operation of the PZE terminal
The clocking type is defined by pressing one of the different function keys (In, Out, Break or Absence
reason) at the time & attendance (PZE) terminal. The currently active clocking type or function is
displayed associated with a text in the status window. An employee performs a clocking by checking the
terminal status first, pressing the relevant function key (In, Out, etc.) and putting the company badge in
front of the reader. In addition to this, the information keys (info, message) show information specific to
employees (time accounts: e.g. flextime, flexible time, remaining leave, etc.) and messages (e.g. "Mr.
Miller please contact payroll office", etc.).
Before each clocking or action, the user has to check whether or not the required function is active.
Otherwise, the function has to be enabled by clicking the relevant key.
The selected function is now carried out by reading the badge.
The performed action including the badge number and a green check are displayed if posting was
successful.
Function Description
Clock-In Beginning of working time
Clock-Out End of working time
Break Beginning or end of the break
Absence reasons It is also possible to add reasons for delayed clocking-in, early clocking-out
or interrupted working time, e.g. business trips or visits to a doctor.
Cost centers Moreover, cost center postings can be carried out in order to assign the
recorded working time to a cost center.
Break times do not necessarily have to be clocked in. As they are automatically set off against
the break times pre-defined in the system.
AIP-HRF_81.docx Version: 1.0.23049 Page 6 of 24

|     |     |     | AIP Functions for the HR Sector  |     |
| --- | --- | --- | -------------------------------- | --- |

| 2.1.2.1  | Auto status  |     |     |     |
| -------- | ------------ | --- | --- | --- |
Provided that the terminal is configured for the operation mode “Auto status (AST)", the system decides
automatically if it is a clocking-in or clocking-out. If auto status is enabled, the status window shows the
text "auto status".

If required, the employee can override the automatically specified status by explicitly pressing the "clock-
in" or "clock-out" button.

| AIP-HRF_81.docx  |     | Version: 1.0.23049  |     | Page 7 of 24  |
| ---------------- | --- | ------------------- | --- | ------------- |

AIP Functions for the HR Sector
2.1.2.2 Absence reasons
Absence reasons can be posted in the PZE terminal, i.e. as advance or subsequent postings. In this
context advance posting means that the absence reason is entered prior to the actual absence. A
subsequent posting means the absence reason is entered after the actual absence.
The three function keys at the bottom or the absence reason keys of the PZE terminal are used for
inputting absence reasons. Absence reasons are represented by this icon:
How to enter an absence reason
 Press one of the absence reason keys.
 Swipe your staff badge.
If the terminal is in the operation mode "auto status", HYDRA decides automatically whether the absence
reason posting is an advance or subsequent posting. If the terminal is in the operation mode "clock-in" it
is a subsequent posting. If it is in the operation mode "clock-out" it is an advance posting.
AIP-HRF_81.docx Version: 1.0.23049 Page 8 of 24

AIP Functions for the HR Sector
Working with the absence reason list
 Press the function key "absence reason list“ .
 Swipe your staff badge.
 Select the relevant absence reason and confirm by "OK“.
If the terminal is in the operation mode "auto status", HYDRA decides automatically whether the absence
reason posting is an advance or subsequent posting. If the terminal is in the operation mode "clock-in" it
is a subsequent posting. If it is in the operation mode "clock-out" it is an advance posting.
The HYDRA "absence reason authorization" specifies which absence reasons an employee may choose
from.
2.1.2.3 Cost center postings
Cost center postings can also be performed at PZE terminals. Cost centers are represented by the icon
.
AIP-HRF_81.docx Version: 1.0.23049 Page 9 of 24

|     |     |     | AIP Functions for the HR Sector  |     |
| --- | --- | --- | -------------------------------- | --- |

This processing is identical to the collection process for absence reasons. However, advance and
subsequent postings are not distinguished in this case.

The screenshot shows a "clocking-in" to cost center "IT" by an employee with badge number "2014“.
Working with the cost center list:
|   Press the function key "cost centers“  |     | .   |     |     |
| ----------------------------------------- | --- | --- | --- | --- |
  Swipe your staff badge.
  Select the relevant cost center and confirm by "OK“.

The cost center list provides all cost centers created for the employee's company in the cost center
master.

| AIP-HRF_81.docx  |     | Version: 1.0.23049  |     | Page 10 of 24  |
| ---------------- | --- | ------------------- | --- | -------------- |

|     |     |     | AIP Functions for the HR Sector  |     |
| --- | --- | --- | -------------------------------- | --- |

| 2.1.2.4  | Display of account balance information  |     |     |     |
| -------- | --------------------------------------- | --- | --- | --- |
After pressing the info key and swiping the staff badge, a dialog appears showing the person's current
account balances:

The HYDRA account master data specify which HYDRA time accounts are displayed on the terminal.

| AIP-HRF_81.docx  |     | Version: 1.0.23049  |     | Page 11 of 24  |
| ---------------- | --- | ------------------- | --- | -------------- |

|     |     |     | AIP Functions for the HR Sector  |     |
| --- | --- | --- | -------------------------------- | --- |

The employee may view today's clocking records and the ones from the previous day by clicking the
function key "load clocking records". This key is only available if it is enabled in the terminal configuration.

| AIP-HRF_81.docx  |     | Version: 1.0.23049  |     | Page 12 of 24  |
| ---------------- | --- | ------------------- | --- | -------------- |

|     |     |     | AIP Functions for the HR Sector  |     |
| --- | --- | --- | -------------------------------- | --- |

| 2.1.2.5  | Display of messages  |     |     |     |
| -------- | -------------------- | --- | --- | --- |
Messages  automatically  appear  on  the  terminal  when  clocking-in  or  clocking-out.  By  clicking  the
"message" key, employees can reopen their messages, such as "Please contact payroll office".

Whether or not the messages are to appear automatically when clocking-in or clocking-out, can be
specified upon entering the relevant message in the MOC.
| 2.1.3  | Error messages  |     |     |     |
| ------ | --------------- | --- | --- | --- |
The following error messages (showing a red prohibition sign  ) may appear in the
messages dialog:
|     | Message    | Description  |     |     |
| --- | ---------- | ------------ | --- | --- |
"Double posting"    The person attempted to post the same function within two
minutes. This check is only performed if no other employee
has clocked this function in the meantime.
"No access authorization"    The person does not have access authorization for this
terminal.

| AIP-HRF_81.docx  |     | Version: 1.0.23049  |     | Page 13 of 24  |
| ---------------- | --- | ------------------- | --- | -------------- |

|     |     |     | AIP Functions for the HR Sector  |     |
| --- | --- | --- | -------------------------------- | --- |

"No business trip authorization"    The person is not authorized to clock business trips (see
figure).

Fig. Example of an error message "No business trip authorization“.
All other messages are displayed in the "general message line" at the bottom of the screen.
Other error messages are:
|     | Message  |   Description  |     |     |
| --- | -------- | -------------- | --- | --- |
"No message has occurred"     There is no message for the specific employee.
| "Wrong company number"  |     |   No correct company badge.  |     |     |
| ----------------------- | --- | ----------------------------- | --- | --- |
"Wrong status order OUT after OUT"    No clocking-out possible (only with enabled status
check)
"No memory space. No connection to the    Local memory capacity for clocking records
| server"  |     | exhausted (in OFFLINE mode). If there is no  |     |     |
| -------- | --- | -------------------------------------------- | --- | --- |
connection to the server, the terminal locally saves
approx. 10000 clocking records before this message
appears.
| 2.2  | ZKS – Access control  |     |     |     |
| ---- | --------------------- | --- | --- | --- |
The terminal does not provide specific dialogs for access control. A green LED indicates if access is
granted. A red LED shows that access has been rejected at the ZKS terminal.
The  Access log as well as the Access status are provided as lists in the MOC.
| 2.3  | LLE – Terminal info on group incentives  |     |     |     |
| ---- | ---------------------------------------- | --- | --- | --- |
If the license to calculate LLE group incentives is available, the PZE terminal displays not only the info on
the account balances, but additionally an information on the activities performed in the premium group.
Flextime  :  00:00
Flexible time  : 154:00
Leave account  :  27.00
05 B3P       102% :  12:30
| 04 350      118%  | :  7:30  |     |     |     |
| ----------------- | -------- | --- | --- | --- |
04 B3P      122%  : 112:30

| AIP-HRF_81.docx  |     | Version: 1.0.23049  |     | Page 14 of 24  |
| ---------------- | --- | ------------------- | --- | -------------- |

AIP Functions for the HR Sector
The rows in gray show the data of the MOC application "Personal group participation" for the current and
the previous month. The following columns are displayed:
Column Explanation
1 Month In the example: 05 and 04
2 Premium group In the example: B3P, 350
3 Performance level Performance level of the premium group in the month. In the example:
102%, 118%, 122%
4 Personal group Hours of the person in the premium group in the month.
participation
You can change or disable the info display as part of the customization of the incentive wage module.
2.4 PZE - shift plan
Employees may have their shift plan for the next days displayed on the terminal by clicking an absence
reason key at the PZE terminal. Shift plans are displayed by the dynamic dialog P_PSP. The below
screenshot shows the shift plan of an AIP terminal:
AIP-HRF_81.docx Version: 1.0.23049 Page 15 of 24

|     |     |     | AIP Functions for the HR Sector  |     |
| --- | --- | --- | -------------------------------- | --- |

| 2.5  | PEP - personnel schedule  |     |     |     |
| ---- | ------------------------- | --- | --- | --- |
Employees may have their staff schedule for the next days displayed on the terminal by clicking an
absence reason key at the PZE terminal. Staff schedules are displayed by the dynamic dialog P_PEP.
The below screenshot shows the staff schedule of an AIP terminal:

| AIP-HRF_81.docx  |     | Version: 1.0.23049  |     | Page 16 of 24  |
| ---------------- | --- | ------------------- | --- | -------------- |

|     |     |     |     |     |     |     | AIP Functions for the HR Sector  |     |     |
| --- | --- | --- | --- | --- | --- | --- | -------------------------------- | --- | --- |

| 2.6  | Terminal status display  |     |     |     |     |     |     |     |     |
| ---- | ------------------------ | --- | --- | --- | --- | --- | --- | --- | --- |
The terminal status is shown at the bottom of the screen.

|     | Status  |     | ICON  |      |           | Description  |                        |     |     |
| --- | ------- | --- | ----- | ---- | --------- | ------------ | ---------------------- | --- | --- |
|     |         |     |       | The  | terminal  | is  ONLINE.  | Server  communication  |     | is  |
Online  enabled. All saved data records have been transferred.

|     |     |     |     | The  | terminal  | is  OFFLINE.  | Server  communication  |     | is  |
| --- | --- | --- | --- | ---- | --------- | ------------- | ---------------------- | --- | --- |
Offline  interrupted. Online functions, such as the info display

|     |     |     |     | are  | not  possible.  | However,  | clockings  | can  still  | be  |
| --- | --- | --- | --- | ---- | --------------- | --------- | ---------- | ----------- | --- |

recorded. These clocking records are transferred to the
server, once data connection has been re-established.
The terminal is sending data to the server.

|         Event -   |     |     |     |     |     |     |     |     |     |
| ----------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|                   |     |     |     |     |     |     |     |     |     |
communication

  The terminal reads files from the server or writes data to
|         Event -   |     |     |     | the server.  |     |     |     |     |     |
| ----------------- | --- | --- | --- | ------------ | --- | --- | --- | --- | --- |
|                   |     |     |     |              |     |     |     |     |     |

communication

Update  The  terminal  is  sending  stored  data  records  to  the
server.

|     | Demo  |     |     | The  | terminal  | is  in  | DEMO  mode,  | i.e.  server  |     |
| --- | ----- | --- | --- | ---- | --------- | ------- | ------------ | ------------- | --- |
communication is disabled.

| AIP-HRF_81.docx  |     |     |     | Version: 1.0.23049  |     |     |     | Page 17 of 24  |     |
| ---------------- | --- | --- | --- | ------------------- | --- | --- | --- | -------------- | --- |

|     |     |     | AIP Functions for the HR Sector  |     |
| --- | --- | --- | -------------------------------- | --- |

| 2.7  | PZE - Subsequent entry of clocking / request clocking  |     |     |     |
| ---- | ------------------------------------------------------ | --- | --- | --- |
The employee can use an absence reason key (_STP) on the PZE terminal to subsequently enter a
clocking. You use the dynamic dialog P_STP to subsequently enter the clocking. The below screenshot
shows the dialog to enter a clocking on the AIP terminal as an example:

The clocking entered is then displayed in the Labor time maintenance as follows:

| AIP-HRF_81.docx  |     | Version: 1.0.23049  |     | Page 18 of 24  |
| ---------------- | --- | ------------------- | --- | -------------- |

AIP Functions for the HR Sector
The license AIP-HRF only activates the display of the dialog P_STP on the terminal. To
process the subsequently entered clocking in form of an escalation and to book this
clocking, you require the license PZE-EPP in version 8.3.
When you subsequently enter a clocking, you can create an escalation. The details of the escalation and
its configuration are described here.
Staff badge number
This field is automatically populated on the PZE terminal when you have pressed the key and scanned
the badge. If the badge number is read on the BDE terminal, the field is empty when the dialog opens. It
is populated when the badge is read.
The Staff badge number is a mandatory field.
Name
This field displays the name of the person. On the PZE terminal, this field is directly populated when the
dialog opens. The badge number read is used to fill this field. On the BDE terminal, the name is displayed
after the badge number has been entered or read.
Date
The date of the current day is preset. The user can change the date.
AIP-HRF_81.docx Version: 1.0.23049 Page 19 of 24

AIP Functions for the HR Sector
In
The field In is empty and has the format "HH:MM". The user can enter a time between 0:00 and 23:59
hours, but the field can also remain empty.
Out
See In.
Comment
A field to enter an optional comment (40 characters).
2.8 List of absence reasons
If you want to enter more than 4 absence reasons on the terminal, you can use a list of absence reasons
to this end (only with CT-36x and CT-38x). Configure the list of absence reasons using the entry "FGL" in
one of the fields Absence reason 1 to Absence reason 4. The list of absence reasons shows all absence
reasons, which include the company of the person in the configuration of the absence reasons, or where
the field Company is empty. If you select the function key and scan your badge, the list is displayed on
the terminal. Select an absence reason from the list and confirm pressing OK. The absence reason is
posted.
With terminals of type CTP-340, the configuration of absence reason key 1 is used for
the blue key with the suitcase and the configuration of absence reason key 2 is used for
the yellow hash key. The CTP-340 does not process the configuration of the absence
reason keys 3 and 4.
AIP-HRF_81.docx Version: 1.0.23049 Page 20 of 24

AIP Functions for the HR Sector
3 Administration of the AIP-HRF terminal
The next section deals with the implementation and "local" configuration of the PZE terminal CT-380.
3.1 Implementation of the AIP-HRF terminal
The booting process for the LAN terminal CT 362 after implementation or an external failure of current
supply (e.g. power failure) is identical to booting a PC. The following selection menu appears, once the
network software had been loaded:
The described function can be executed after pressing the relevant buttons (white background).
An external keyboard is required for the function [ C = Configuration ]. These functions are only required
for implementation or system administration purposes and should only be carried out or started by MPDV
staff or the person responsible for the system.
PLEASE NOTE:
When deleting log files (queues), all stored clocking records that have not yet been
transferred are deleted as well.
AIP-HRF_81.docx Version: 1.0.23049 Page 21 of 24

|     |     |     | AIP Functions for the HR Sector  |     |
| --- | --- | --- | -------------------------------- | --- |

If nothing is entered, this screen is closed after approx. 20 seconds and the terminal program is loaded.
The basic view appears.
| 3.2  | Saving clocking records in offline mode  |     |     |     |
| ---- | ---------------------------------------- | --- | --- | --- |
If there is no connection to the server, the terminal locally saves approx. 10000 clocking records.

| AIP-HRF_81.docx  |     | Version: 1.0.23049  |     | Page 22 of 24  |
| ---------------- | --- | ------------------- | --- | -------------- |

    AIP Functions for the HR Sector

| 3.3  | Configuration of CT-38x  |     |     |     |     |
| ---- | ------------------------ | --- | --- | --- | --- |
The configuration of the PZE terminal is described in the document dealing with the PZE basic package.
This section deals with terminal-specific "local" configurations.
| The excerpt from the file "ctaip.ini" includes all entries for:  |     |     |     |     |     |
| ---------------------------------------------------------------- | --- | --- | --- | --- | --- |
|   - HYDRA user configuration and network configuration           |     |     |     |     |     |
  - Interface configuration of the terminal
required for the configuration of the PZE terminal CT-380.
| [system]   |     |   { HYDRA - User and network configuration }  |     |     |     |
| ---------- | --- | --------------------------------------------- | --- | --- | --- |
usr=203        { HYDRA - user number (unique within the HYDRA system) }
host name=192.9.200.4    { HYDRA - Host name = IP address of the server }
| offline timeout=30            |     |   { minimum OFFLINE time of the terminal }     |     |     |     |
| ----------------------------- | --- | ---------------------------------------------- | --- | --- | --- |
| loadfile=ctnet\win\ctaip.txt  |     |   { DOWNLOAD - file for SW update }            |     |     |     |
| showcursor=off                |     |   { Mouse on / off }                           |     |     |     |
| [comports]                    |     |   { interface configuration of the terminal }  |     |     |     |
| COM1=<COMTYP>                 |     |   { COMPORT - interface COM1}                  |     |     |     |
| COM2=< COMTYP>                |     |   { COMPORT - interface COM2}                  |     |     |     |
| COMn=<COMTYP>                 |     |   { COMPORT - interface COMn}                  |     |     |     |
Possible <COMTYP> are: BAR, LEGIC, RFLESER, PLG, MSS, MBB-S6, MBB-DP1.

| AIP-HRF_81.docx  |     |     | Version: 1.0.23049  |     | Page 23 of 24  |
| ---------------- | --- | --- | ------------------- | --- | -------------- |

|     |     |     |     |     | AIP Functions for the HR Sector  |     |
| --- | --- | --- | --- | --- | -------------------------------- | --- |

The excerpt from the file "ctaiplay.ini" includes all entries required for the configuration of the layout of
the PZE terminal CT-380. By default this file is downloaded from the server with every software update.
Consequently, the PZE layout is unique for all PZE terminals in the entire company.
| [layout pze]  |     |   { PZE - Layout configuration }  |     |     |     |     |
| ------------- | --- | --------------------------------- | --- | --- | --- | --- |
StdSchrift=Arial      { font type on buttons and in the message dialogs }
| StdDateSize=30                  |     |   { font size of the date/time dialog }  |     |     |     |     |
| ------------------------------- | --- | ---------------------------------------- | --- | --- | --- | --- |
| StdStatusSize=26                |     |   { font size of the message dialogs }   |     |     |     |     |
| StdSpdBttnSize=16               |     |   { font size on buttons }               |     |     |     |     |
| InfoSchrift=Courier New         |     |   { font type in the info dialog }       |     |     |     |     |
| InfoSchriftSize=20              |     |   { font size in the info dialog }       |     |     |     |     |
| datetimelayout=dd.mm.yyy hh:nn  |     | { date/time layout }                     |     |     |     |     |
...
| 3.4  | Integration of a customer logo  |     |     |     |     |     |
| ---- | ------------------------------- | --- | --- | --- | --- | --- |
A customer logo instead of the MPDV logo may also be displayed in the top right corner of the PZE
terminal. The customer logo has to be provided in the png format (Portable Network Graphic). The file
name pze_mpdv.png must be used for terminals with a resolution of 800x600 pixels or higher. For
terminals with a resolution of 640x480 pixels the file name should be pze_mpdv.small.png. The logo size
should not exceed 220x90 or 175x75 (for smaller resolution).
Then, this file has to be packed as ZIP archive with the file name pict_cust.zip and stored in the directory
<x>\custom on the server. X stands for the system number. When starting the terminal program, the AIP
terminal downloads the ZIP archive and shows the customer logo.

| AIP-HRF_81.docx  |     |     | Version: 1.0.23049  |     |     | Page 24 of 24  |
| ---------------- | --- | --- | ------------------- | --- | --- | -------------- |