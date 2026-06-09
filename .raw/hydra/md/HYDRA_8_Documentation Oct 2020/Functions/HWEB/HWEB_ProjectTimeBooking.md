Project Time Recording using HYDRA@WEB

1  Project Time Recording using HYDRA@WEB

Usage

Completion  confirmations/uploads  document  the  status  of  operation  processing  and  allow  for  forecasts

being  made  on  how  the  project  will  develop.  Exact  completion  confirmations/uploads  are  required  to

ensure realistic and exact project planning and project tracking.

The following data may be entered for uploads:

  Point in time

  Actual duration



Indicator on the upload status (partial upload, final upload)

Integration

The  recorded  uploads  are  integrated  in  BDE  (shop  floor  data  collection)  and  can  be  evaluated  in  most

BDE functions of MOC.

Prerequisite

These configurations have to be made or the following requirements need to be met to be able to capture

project times:

HWEB_ProjectTimeBooking.docx

Version: 1.2.1362

Page 1 of 8

Project Time Recording using HYDRA@WEB

User Administration

Create the user WEB and block this user within the user administration.

Then  assign  the  responsibility  areas  of  the  workplaces  recorded  by  project  time  recording  using

HYDRA@WEB to this user.

This user does not require any function authorizations.

Workplace configuration

The following has to be configured for workplaces onto which project times are to be posted/uploaded:

  The “posting onto OPs that are not logged on” option has to be set.

  Sequencing list: The sequencing list setting should be set to "M" (pool of machines/workplaces) or “H”

(group control). Please also consider the notes on the planning process in the “work plan” section.

For these workplaces project time may ONLY be uploaded/posted by HYDRA@WEB. Postings

like “log OP on’” or “log OP off” using the terminal or MOC are not supported.

HR master

Two issues have to be taken into account when persons/users are configured:

  A pin code needs to be assigned, in order for a person to be able to log on to the system. The user

may authenticate to the system either by using the badge number and the pin code or the company

with personnel number and pin code.

  A (master) workplace must be assigned to the person who is supposed to log on to the system in the

BDE  tab  of  the  HR master.  The  operations  for  which  the  person  is  to  perform  the  uploads/postings

have to be planned for this workplace.

Work plan

  To  provide  for  differentiated  uploads,  the  order  including  its  operations  should  correspond  to  the

individual  activities  that  are  to  be  carried  out  within  the  project  /  order  or  to  the  activities  which  are

possible within the scope of the project / order.

  The orders are to be created with order type “5 – project order”. Only operations of the order type 5

may be collected using this application.

  Each operation which is to be uploaded has to be planned for a corresponding workplace. Thus, the

operations either should already be planned (in detail) by the ERP/PPS system or by using one of the

planning functions provided by HYDRA.

HWEB_ProjectTimeBooking.docx

Version: 1.2.1362

Page 2 of 8

Project Time Recording using HYDRA@WEB

Provided that planning is performed using HYDRA shop floor scheduling (HLS) or graphic

order sequencing (GAV), the remaining run time formula needs to be defined so as for it to

be reduced based on the actual duration (time posted onto RPA 11).

Procedure for uploads using HYDRA@WEB

Proceed as follows to capture uploads/confirmations:

1.  Open the menu item "order list"

2.  Select the operation for which uploads are to be made from the order list

3.  Enter the data to be uploaded.

These steps are described in more detail in the paragraphs that follow.

The menu item "direct posting" allows for data to be entered directly. In this case, specific input

fields are not pre-assigned and have to  be  entered manually. It is recommended, however,  to

enter data using the menu item "order list".

Select the operation

There are the following options to find the requested operation:

  Search by the order number (including wildcard characters).

  Search by the project order (including wildcard characters).

  Search by the operation's article (including wildcard characters)

  Search by the operation's OP designation (including wildcard characters).

In  general,  only  operations  of  the  (master)  workplace  defined  for  the  person  are  selected.  If  any  other

workplace is entered, no operations will be shown.

If no workplace is defined for the person and no workplace is entered, no data will be shown.

If  no  workplace  is  defined  for  the  person  and  a  workplace  is  entered,  the  operations  planned  for  this

workplace will be shown.

HWEB_ProjectTimeBooking.docx

Version: 1.2.1362

Page 3 of 8

Project Time Recording using HYDRA@WEB

For these workplaces project time may ONLY be uploaded/posted by HYDRA@WEB. Postings

like “log OP on’” or “log OP off” using the terminal or MOC are not supported. The system does

not check this!

If  necessary,  enter  the  required  selection  criteria.  Please  consider  case  sensitivity.  All  fields  support

wildcard characters (except for the “workplace” field). As soon as data are requested

, the operations

matching the entered selection criteria are searched.

If  operations  are  found,  they  will  be  shown  in  a  list  (150  operations  per  page).  The  following  data  are

displayed:

Field

MES order number

Meaning

Combined order/ OP number.
The combined order/sequence/OP number will be shown here if
the system is configured for sequence processing.

Please note that only orders/operations of the order

type  5  are  displayed  in  general.  Irrespective  of

whether  or  which  further  selection  criteria  have

been entered.

Project

Article

Project number

Article number (from the operation)

Article designation

Article designation

OP designation

Operation designation

Workplace

Group

Workplace for which the operation is planned.

Workplace group for which the operation is planned.

Now choose the operation onto which you would like to post/upload data by clicking the button

 in the

left column of the relevant data row.

Input of upload data

Enter your project times in the dialog "enter upload".

Provided that the order search function was used beforehand, the "MES order number" and  “workplace”

fields are automatically assigned the data from the overview. In addition to this, the date and time fields

are assigned with current values (current point in time).

Now enter the data for the upload:

Field

Comment

HWEB_ProjectTimeBooking.docx

Version: 1.2.1362

Page 4 of 8

Project Time Recording using HYDRA@WEB

Field

Comment

MES order number

Workplace

Date

Time

Duration

Finish operation

Person

Combined order/ OP number.
The combined order/sequence/OP number is to be entered
here if the system is configured for sequence processing.

If no workplace is entered, data will be posted onto the first
workplace of the group for which the operation is planned.

Assigned to the current date.

Assigned to the current time .

Duration to be uploaded in hrs:min.

Specifies whether or not the operation is finished.
Set to "No" by default

Pre-assigned to the personnel number used for logging in,
cannot be changed.

The entered data are posted in HYDRA and the dialog is  closed, once the input has been confirmed by

clicking the relevant button.

Posting

The entered data are posted,  once  they  have been confirmed in the  dialog. It  is an interruption posting

from

the

system's

point

of

view

(DLG=A_UN|ANR=<MES

Order

Number>|MNR=<Workplace>|DATB=<Date>|ZEIB=<Time>|EGR:BMK11=<Duration>|).  Consequently,  a

BDE log record of the record type U is generated in HYDRA.

However, the interruption posting will only be sent if a duration greater than 0 is entered.

Provided that the workplace has been configured as a "group workplace " (type = G), a personal BDE log

record of the record type B is generated in addition to the order-related posting.

Provided  that  the  option  "finish  operation"  has  been  set  to  "yes",  a  logoff/finish  posting  (DLG=A_BE)  is

sent,  once  the  duration  has  been  uploaded/posted  onto  the  operation.  This  logoff  posting  results  in  the

generation of a BDE log record of the record type E and the operation is finished (status "finished"). This

logoff posting is sent even if no upload is performed as the duration "0" is entered.

Once the operation has been finished, nobody can post data onto the operation anymore.

The logoff/finish posting (DLG=A_BE) is assigned the current point in time (of the server), in contrast to

the interruption posting (DLG=A_UN) for which the point in time (date, time) may be entered or changed

manually. Consequently the times for interruption postings and logoff postings always vary.

HWEB_ProjectTimeBooking.docx

Version: 1.2.1362

Page 5 of 8

Project Time Recording using HYDRA@WEB

Posting to RPA

The captured actual duration is posted onto RPA 11 of the operation.

Start date/finish date

Start  date  and  finish  date  are  only  used  for  informational  purposes.  They  do  not  affect  the  actual

duration. The period of time between the start date and the finish date is not double-checked with

respect to the actual duration.

Start  date  and  finish  date  are  always  identical  (the  end  date  is  not  computed  based  on  the  start

date and the duration).

Shift date/shift

The shift date as well as the shift number defined for the posting are derived from the entered start

date.

The  data  captured  by  using  project  time  recording  cannot  be  recalculated  in  the  event

maintenance. Consequently, postings need to be edited in the maintenance of postings.

Displaying and canceling of uploads

You can view your uploads by the menu item "order-related postings". To do so, enter the period of time

for which you want to view the uploads/postings (date from / to, pre-assigned by default to <today> minus

7 days until <today>. Then the system determines the data records from the start date as of 0.00 midnight

until the end date 11.59 pm.

Whether or not all uploads/postings can be shown for the specified period of time depends on

their retention period configured in HYDRA. Uploads/postings of the last 35 days are available

by default.

The  uploads/postings  you  have  entered  are  shown  (150  uploads  per  page),  once  data  have  been

requested:

Field

MES order number

Meaning

Combined order/ OP number.
The combined order/sequence/OP number will be shown here if
the system is configured for sequence processing.

Article

Article number (from the operation)

Article designation

Article designation

OP designation

Operation designation

Workplace

Duration

Workplace for which the upload/posting has been made

The  duration  from  the  recorded  posting/upload  posted  onto  RPA

HWEB_ProjectTimeBooking.docx

Version: 1.2.1362

Page 6 of 8

Project Time Recording using HYDRA@WEB

Field

Start

Meaning

11

Posting time of the upload

Record type

"Interruption of order" if the option "finish operation" is set to "No"

for the upload.

"Finishing of order“ if the option "finish operation" is set to "yes" for

the upload.

The  list  of  order-related  postings  includes  the  interrupted  orders  (DLG=A_UN)  as  well  as  the

finished orders (DLG=A_BE). Normally, the postings  for finishing orders can be  distinguished

from them for interrupting orders by the duration 00:00.

A posting/upload can be canceled, i.e. deleted by choosing the respective upload from the list of uploads

by clicking the button

 at the beginning of the row and deleting this one by using the relevant function.

Consequently, the selected posting is deleted. If there is a corresponding posting of the record type B, it

will also be deleted.

If the posting of a finished operation is deleted, the operation status will again be set to "U = interrupted".

An upload/posting can only be deleted, provided it has not yet been uploaded to the ERP/PPS

system.

The option "change after upload" set for the order type is not evaluated, i.e. once a posting has

been  uploaded,  it  can  no  longer  be  deleted  even  if  the  option  is  set  differently  for  the  order

type. In this case, deletion has to be performed in MOC.

Evaluations in MOC

The times recorded and posted onto the operation are shown at following positions in MOC:

Order information

Shows the actual durations posted onto RPA 11 of an operation.

Order overview > Progress

Shows the posted actual durations in the column of RPA 11, just as it is the case for the "status" tab of

the order information dialog.

Order-related postings

The actual durations posted onto the resource performance account 11 can be displayed and changed in

the maintenance of postings dialog.

HWEB_ProjectTimeBooking.docx

Version: 1.2.1362

Page 7 of 8

Project Time Recording using HYDRA@WEB

Personnel report

Provided  that  the  workplace,  for  which  you  posted  data,  has  been  configured  as  group  workplace,  this

report shows the actual durations posted onto resource performance accounts.

Upload to the ERP system

The recorded data are uploaded to the ERP/PPS system. For further information on the upload structure,

please refer to the respective documentation dealing with the interface.

HWEB_ProjectTimeBooking.docx

Version: 1.2.1362

Page 8 of 8

