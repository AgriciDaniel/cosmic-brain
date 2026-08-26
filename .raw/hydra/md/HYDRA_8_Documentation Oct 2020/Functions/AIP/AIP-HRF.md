AIP Functions for the HR Sector

1  AIP Functions for the HR Sector

1.1  PZE - Time & Attendance

The  PZE  terminal  has  been  designed  to  record  the  employees'  working  times.  In  addition  to  recorded

clocking-in,  clocking-out  and  break  times,  employees  can  also  view  information  on  current  account

balances, the performed clocking records and general messages.

1.1.1

Terminal display

The PZE terminal screen is divided into different areas showing information and allowing for functions to

be selected:

AIP-HRF.docx

Version: 1.2.20693

Page 1 of 20

AIP Functions for the HR Sector

1.1.2  Operation of the PZE terminal

The  clocking  type  is  defined  by  pressing  one  of  the  different  function  keys  (In,  Out,  Break  or  Absence

reason) at the time & attendance (PZE) terminal. The currently active clocking type or function is displayed

associated  with a  text in the status  window.  An  employee  performs a clocking by checking the terminal

status first, pressing the relevant function key (In, Out, etc.) and putting the company badge in front of the

reader. In addition to  this,  the  information keys  (info,  message) show information specific to employees

(time accounts: e.g. flextime, flexible time, remaining  leave, etc.) and messages (e.g.  "Mr. Miller  please

contact payroll office", etc.).

Before  each  clocking  or  action,  the  user  has  to  check  whether  or  not  the  required  function  is  active.

Otherwise, the function has to be enabled by clicking the relevant key.

The selected function is now carried out by reading the badge.

The  performed  action  including  the  badge  number  and  a  green  check  are  displayed  if  posting  was

successful.

Function

Description

Clock-In

Beginning of working time

Clock-Out

End of working time

Break

Beginning or end of the break

Absence reasons

It is also possible to add reasons for delayed clocking-in, early clocking-out
or interrupted working time, e.g. business trips or visits to a doctor.

Cost centers

Moreover, cost center postings can be carried out in order to assign the
recorded working time to a cost center.

Break times do not necessarily have to be clocked in. As they are automatically set off against

the break times pre-defined in the system.

AIP-HRF.docx

Version: 1.2.20693

Page 2 of 20

AIP Functions for the HR Sector

1.1.2.1  Auto status

Provided that the terminal is configured for the operation mode “Auto status (AST)", the system  decides

automatically if it is a clocking-in or clocking-out. If auto status is enabled, the status window shows the text

"auto status".

If required, the employee can override the automatically specified status by explicitly pressing the "clock-

in" or "clock-out" button.

AIP-HRF.docx

Version: 1.2.20693

Page 3 of 20

AIP Functions for the HR Sector

1.1.2.2  Absence reasons

Absence reasons can be posted in the PZE terminal, i.e. as advance or subsequent postings. In this context

advance  posting  means  that  the  absence  reason  is  entered  prior  to  the  actual  absence.  A  subsequent

posting means the absence reason is entered after the actual absence.

The three function keys at the bottom or the absence reason keys of the PZE terminal are used for inputting

absence reasons. Absence reasons are represented by this icon:

How to enter an absence reason

  Press one of the absence reason keys.

  Swipe your staff badge.

If the terminal is in the operation mode "auto status", HYDRA decides automatically whether the absence

reason posting is an advance or subsequent posting. If the terminal is in the operation mode "clock-in" it is

a subsequent posting. If it is in the operation mode "clock-out" it is an advance posting.

AIP-HRF.docx

Version: 1.2.20693

Page 4 of 20

AIP Functions for the HR Sector

Working with the absence reason list

  Press the function key "absence reason list“

.

  Swipe your staff badge.

  Select the relevant absence reason and confirm by "OK“.

If the terminal is in the operation mode "auto status", HYDRA decides automatically whether the absence

reason posting is an advance or subsequent posting. If the terminal is in the operation mode "clock-in" it is

a subsequent posting. If it is in the operation mode "clock-out" it is an advance posting.

The HYDRA "absence reason authorization" specifies which absence reasons an employee may choose

from.

1.1.2.3  Cost center postings

Cost center postings can also be performed at PZE terminals. Cost centers are represented by the icon

.

AIP-HRF.docx

Version: 1.2.20693

Page 5 of 20

This  processing  is  identical  to  the  collection  process  for  absence  reasons.  However,  advance  and

subsequent postings are not distinguished in this case.

AIP Functions for the HR Sector

The screenshot shows a "clocking-in" to cost center "IT" by an employee with badge number "2014“.

Working with the cost center list:

  Press the function key "cost centers“

.

  Swipe your staff badge.

  Select the relevant cost center and confirm by "OK“.

The cost center list provides all cost centers created for the employee's company in the cost center master.

AIP-HRF.docx

Version: 1.2.20693

Page 6 of 20

AIP Functions for the HR Sector

1.1.2.4  Display of account balance information

After  pressing  the  info  key  and  swiping  the  staff  badge,  a  dialog  appears  showing  the  person's  current

account balances:

The HYDRA account master data specify which HYDRA time accounts are displayed on the terminal.

AIP-HRF.docx

Version: 1.2.20693

Page 7 of 20

The  employee  may  view  today's  clocking  records  and  the  ones  from  the  previous  day  by  clicking  the

function key "load clocking records". This key is only available if it is enabled in the terminal configuration.

AIP Functions for the HR Sector

AIP-HRF.docx

Version: 1.2.20693

Page 8 of 20

AIP Functions for the HR Sector

1.1.2.5  Display of messages

Messages automatically appear on the terminal when clocking-in or clocking-out. By clicking the "message"

key, employees can reopen their messages, such as "Please contact payroll office".

Whether or not the messages are to appear automatically when clocking-in or clocking-out, can be specified

upon entering the relevant message in the MOC.

1.1.3  Error messages

The  following  error  messages  (showing  a  red  prohibition  sign

)  may  appear  in  the

messages dialog:

Message

Description

"Double posting"

  The person attempted to post the same function within two
minutes. This check is only performed if no other employee
has clocked this function in the meantime.

"No access authorization"

  The person does not have access authorization for this

terminal.

AIP-HRF.docx

Version: 1.2.20693

Page 9 of 20

"No business trip authorization"

The person is not authorized to clock business trips (see
figure).

AIP Functions for the HR Sector

Fig. Example of an error message "No business trip authorization“.

All other messages are displayed in the "general message line" at the bottom of the screen.

Other error messages are:

Message

Description

"No message has occurred"

  There is no message for the specific employee.

"Wrong company number"

  No correct company badge.

"Wrong status order OUT after OUT"

  No clocking-out possible (only with enabled status

check)

"No memory space. No connection to the
server"

  Local memory capacity for clocking records
exhausted (in OFFLINE mode). If there is no
connection to the server, the terminal locally saves
approx. 10000 clocking records before this message
appears.

1.2  ZKS – Access control

The  terminal  does  not  provide  specific  dialogs  for  access  control.  A  green  LED  indicates  if  access  is

granted. A red LED shows that access has been rejected at the ZKS terminal.

The  Access log as well as the Access status are provided as lists in the MOC.

1.3  LLE – Terminal info on group incentives

If the license to calculate LLE group incentives is available, the PZE terminal displays not only the info on

the account balances, but additionally an information on the activities performed in the premium group.

:  00:00
Flextime
: 154:00
Flexible time
:  27.00
Leave account
05 B3P       102% :  12:30
04 350      118%  :
7:30
04 B3P      122%  : 112:30

AIP-HRF.docx

Version: 1.2.20693

Page 10 of 20

The rows in gray show the data of the MOC application "Personal group participation" for the current and

the previous month. The following columns are displayed:

AIP Functions for the HR Sector

Column

1  Month

Explanation

In the example: 05 and 04

2  Premium group

In the example: B3P, 350

3  Performance level

Performance level  of the premium group in the month.  In the example:
102%, 118%, 122%

4  Personal group
participation

Hours of the person in the premium group in the month.

You can change or disable the info display as part of the customization of the incentive wage module.

1.4  PZE - shift plan

Employees may have their shift plan for the next days displayed on the terminal by clicking an absence

reason  key  at  the  PZE  terminal.  Shift  plans  are  displayed  by  the  dynamic  dialog  P_PSP.  The  below

screenshot shows the shift plan of an AIP terminal:

AIP-HRF.docx

Version: 1.2.20693

Page 11 of 20

AIP Functions for the HR Sector

1.5  PEP - personnel schedule

Employees may have their staff schedule for the next days displayed on the terminal by clicking an absence

reason key at the PZE terminal. Staff schedules are displayed by the dynamic dialog P_PEP. The below

screenshot shows the staff schedule of an AIP terminal:

AIP-HRF.docx

Version: 1.2.20693

Page 12 of 20

1.6  Terminal status display

The terminal status is shown at the bottom of the screen.

AIP Functions for the HR Sector

Status

ICON

Description

Online

Offline

        Event -

communication

        Event -

communication

Update

Demo

The  terminal  is  ONLINE.  Server  communication  is

enabled. All saved data records have been transferred.

The  terminal  is  OFFLINE.  Server  communication  is

interrupted. Online functions, such as the info display are

not  possible.  However,  clockings  can  still  be  recorded.

These  clocking  records  are  transferred  to  the  server,

once data connection has been re-established.

The terminal is sending data to the server.

The terminal reads files from the server or writes data to

the server.

The terminal is sending stored data records to the server.

The

terminal

is

in  DEMO  mode,

i.e.  server

communication is disabled.

AIP-HRF.docx

Version: 1.2.20693

Page 13 of 20

AIP Functions for the HR Sector

1.7  PZE - Subsequent entry of clocking / request clocking

The  employee  can  use  an  absence  reason  key  (_STP)  on  the  PZE  terminal  to  subsequently  enter  a

clocking. You use the dynamic dialog P_STP to subsequently enter the clocking. The below screenshot

shows the dialog to enter a clocking on the AIP terminal as an example:

The clocking entered is then displayed in the Labor time maintenance as follows:

AIP-HRF.docx

Version: 1.2.20693

Page 14 of 20

AIP Functions for the HR Sector

The license AIP-HRF only activates the display of the dialog P_STP on the terminal. To

process  the  subsequently  entered  clocking  in  form  of  an  escalation  and  to  book  this

clocking, you require the license PZE-EPP in version 8.3.

When you subsequently enter a clocking, you can create an escalation. The details of the escalation and

its configuration are described here.

Staff badge number

This field is automatically populated on the PZE terminal when you have pressed the key and scanned the

badge. If the badge number is read on the BDE terminal, the field is empty when the dialog opens. It is

populated when the badge is read.

The Staff badge number is a mandatory field.

Name

This field displays the name of the person. On the PZE terminal, this field is directly populated when the

dialog opens. The badge number read is used to fill this field. On the BDE terminal, the name is displayed

after the badge number has been entered or read.

Date

The date of the current day is preset. The user can change the date.

AIP-HRF.docx

Version: 1.2.20693

Page 15 of 20

In

The field In  is empty and  has the format "HH:MM".  The user can  enter a time between  0:00 and  23:59

hours, but  the field can also remain empty.

AIP Functions for the HR Sector

Out

See In.

Comment

A field to enter an optional comment (40 characters).

1.8  List of absence reasons

If you want to enter more than 4 absence reasons on the terminal, you can use a list of absence reasons

to this end (only with CT-36x and CT-38x). Configure the list of absence reasons using the entry "FGL" in

one of the fields Absence reason 1 to Absence reason 4. The list of absence reasons shows all absence

reasons, which include the company of the person in the configuration of the absence reasons, or where

the field Company is empty. If you select the function key and scan your badge, the list is displayed on the

terminal. Select an absence reason from the list and confirm pressing OK. The absence reason is posted.

With terminals of type CTP-340, the configuration of absence reason key 1 is used for the

blue key with the suitcase and the configuration of absence reason key 2 is used for the

yellow hash key. The CTP-340 does not process the configuration of the absence reason

keys 3 and 4.

AIP-HRF.docx

Version: 1.2.20693

Page 16 of 20

AIP Functions for the HR Sector

2  Administration of the AIP-HRF terminal

The next section deals with the implementation and "local" configuration of the PZE terminal CT-380.

2.1

Implementation of the AIP-HRF terminal

The  booting  process  for  the  LAN  terminal  CT  362  after  implementation  or  an  external  failure  of  current

supply (e.g. power failure) is identical to booting a PC. The following selection menu appears, once the

network software had been loaded:

The described function can be executed after pressing the relevant buttons (white background).

An external keyboard is required for the function [ C = Configuration ]. These functions are  only required

for implementation or system administration purposes and should only be carried out or started by MPDV

staff or the person responsible for the system.

PLEASE NOTE:

When deleting log files (queues), all stored clocking records that have not yet been

transferred are deleted as well.

AIP-HRF.docx

Version: 1.2.20693

Page 17 of 20

AIP Functions for the HR Sector

If nothing is entered, this screen is closed after approx. 20 seconds and the terminal program is loaded.

The basic view appears.

2.2  Saving clocking records in offline mode

If there is no connection to the server, the terminal locally saves approx. 10000 clocking records.

AIP-HRF.docx

Version: 1.2.20693

Page 18 of 20

2.3  Configuration of CT-38x

The configuration of the PZE terminal is described in the document dealing with the PZE basic package.

AIP Functions for the HR Sector

This section deals with terminal-specific "local" configurations.

The excerpt from the file "ctaip.ini" includes all entries for:

- HYDRA user configuration and network configuration

- Interface configuration of the terminal

required for the configuration of the PZE terminal CT-380.

[system]

usr=203

{ HYDRA - User and network configuration }

{ HYDRA - user number (unique within the HYDRA system) }

host name=192.9.200.4

{ HYDRA - Host name = IP address of the server }

offline timeout=30

{ minimum OFFLINE time of the terminal }

loadfile=ctnet\win\ctaip.txt

{ DOWNLOAD - file for SW update }

showcursor=off

{ Mouse on / off }

[comports]

COM1=<COMTYP>

COM2=< COMTYP>

COMn=<COMTYP>

{ interface configuration of the terminal }

{ COMPORT - interface COM1}

{ COMPORT - interface COM2}

{ COMPORT - interface COMn}

Possible <COMTYP> are: BAR, LEGIC, RFLESER, PLG, MSS, MBB-S6, MBB-DP1.

AIP-HRF.docx

Version: 1.2.20693

Page 19 of 20

The excerpt from the file "ctaiplay.ini" includes all entries required for the configuration of the layout of the

PZE  terminal  CT-380.  By  default  this  file  is  downloaded  from  the  server  with  every  software  update.

Consequently, the PZE layout is unique for all PZE terminals in the entire company.

AIP Functions for the HR Sector

[layout pze]

StdSchrift=Arial

StdDateSize=30

StdStatusSize=26

StdSpdBttnSize=16

{ PZE - Layout configuration }

{ font type on buttons and in the message dialogs }

{ font size of the date/time dialog }

{ font size of the message dialogs }

{ font size on buttons }

InfoSchrift=Courier New

{ font type in the info dialog }

InfoSchriftSize=20

{ font size in the info dialog }

datetimelayout=dd.mm.yyy hh:nn

{ date/time layout }

...

2.4

Integration of a customer logo

A customer logo instead of the MPDV logo may also be displayed in the top right corner of the PZE terminal.

The  customer  logo  has  to  be  provided  in  the  png  format  (Portable  Network  Graphic).  The  file  name

pze_mpdv.png must be used for terminals with a resolution of 800x600 pixels or higher. For terminals with

a  resolution  of  640x480  pixels  the  file  name  should  be  pze_mpdv.small.png.  The  logo  size  should  not

exceed 220x90 or 175x75 (for smaller resolution).

Then, this file has to be packed as ZIP archive with the file name pict_cust.zip and stored in the directory

<x>\custom on the server. X stands for the system number. When starting the terminal program, the AIP

terminal downloads the ZIP archive and shows the customer logo.

AIP-HRF.docx

Version: 1.2.20693

Page 20 of 20

