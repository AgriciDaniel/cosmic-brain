Manual

SMA-PRJ Project Time
Recording
SMA-PRJ 8.2

Version 1.0.23049

Last changed on: 02.09.2020

SMA-PRJ Project Time Recording

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

SMA-PRJ_82.docx

Version: 1.0.23049

Page 2 of 13

SMA-PRJ Project Time Recording

Contents

1  SMA-PRJ Project Time Recording ............................................................... 4

2  Project Time Recording ................................................................................ 6

SMA-PRJ_82.docx

Version: 1.0.23049

Page 3 of 13

SMA-PRJ Project Time Recording

1  SMA-PRJ Project Time Recording

Purpose

You can use this function package to record the hours worked on project orders via SMA.

Implementation notes

You use the function package for the following purposes:

  Employees can record the hours worked on project orders.

  The working times are not recorded on the terminal via login and logout; instead an absolute time is

entered as working time.

  You want to record the hours via SMA.

Integration

This  function  package  is  based  on  the  HYDRA  shop  floor  data  collection  (function  package  Shop

Floor/Order Data Management).

The released project orders can be passed from an ERP system via the HYDRA ERP interface** or from

SAP PS via the  SAP interface CA-PDC / CC4**. Another option  is to manually  create project orders on

the MES Operation Center (MOC).

You can upload the times recorded to an ERP system via the HYDRA ERP interface**. You can upload

the times to SAP PS via the SAP interface CA-PDC / CC4**.

** Requires additional licensing.

Features

  Display of the pool of orders including all project orders assigned to an employee for which  you

can record times.



Input  dialog  to  record  times  for  specified  projects  (orders).  Booking  of  the  recorded  data  in

HYDRA.

  Evaluation  and  display  of  the  recorded  data  (times)  including  cancellation  function  (the  log

records generated for the data recorded can be deleted).

  You can evaluate or edit the recorded data on the MES Operation Center (e.g. order information,

order overview, editing of postings), if the license for the function package Shop Floor/Order Data

Management is available.

SMA-PRJ_82.docx

Version: 1.0.23049

Page 4 of 13

SMA-PRJ Project Time Recording

SMA-PRJ_82.docx

Version: 1.0.23049

Page 5 of 13

SMA-PRJ Project Time Recording

2  Project Time Recording

App name

Project time recording

Function authorization

sma.prj

Purpose

Use  this  application  to  upload  times  for  project  orders.  Uploads  document  the  status  of  processing  and

provide  a  forecast  on  how  the  project  will  develop.  You  must  upload  exact  data  to  ensure  realistic  and

exact project planning and project tracking.

You may enter the following data for uploads:

  Date/Time

  Actual duration



Indicator of the upload status (partial upload, final upload)

Integration

The  recorded  uploads  are  integrated  in  BDE  (shop  floor  data  collection)  and  can  be  evaluated  in  most

BDE functions of the MOC. In addition, the recorded postings can be uploaded to a higher-level system.

Configuration

You must make the following configurations, if you want to record project times:

Workplace configuration

If  you  plan  to  upload  data  for  an  operation,  you  must  configure  the  workplace  where  this  operation  is

planned as follows:

Enable the option Posting on OPs that are not logged on.

Sequencing  list:  The  sequencing  list  should  be  set  to  "M"  (pool  of  machines/workplaces)  or  “H”  (group

control). Also take into account the notes on the planning process in the section Work plan.

Assign a responsibility area to the workplace.

For  these  workplaces,  ONLY  project  times  may  be  uploaded  via  SMA.  Postings  like  “log  OP

on’” or “log OP off” in the terminal or MOC are not supported.

SMA-PRJ_82.docx

Version: 1.0.23049

Page 6 of 13

SMA-PRJ Project Time Recording

HR master

Create a person in the HR master data.

Assign  the  person  in  the  tab  Shop  floor  data  to  the  ("master")  workplace  for  which  the  operations  are

planned. The person can then perform uploads for this workplace via the SMA application.

User administration

Create a user in the User administration.

Assign the person from the HR master data to this user.

Assign  the  responsibility  area  of  the  workplace  to  this  user.  The  data  of  this  workplace,  where  the

operation is planned on, is uploaded via SMA Project time recording.

Assign the function authorization sma.prj to the user.

Work plan

Create the orders with a special order type (e.g. order type "5 - project order").

If you want to upload detailed data, then the order and the included operations should correspond to the

individual activities that are carried out in the project or order.

You  must  plan  each  operation  for  a  corresponding  workplace,  if  you  want  to  upload  data  for  this

operation. Therefore, the operations should either be planned (in detail) by the ERP system or by one of

the planning functions provided by HYDRA.

If  you  perform  planning  using  the  HYDRA  Shop  floor  scheduling  (HLS)  or  Graphic  order

sequencing (GAV),  you must specifically  define the formula for the remaining run time: Here,

the remaining run time must be calculated using  the  actual  duration (time posted to RPA 11)

and the result is therefore reduced.

Upload procedure using SMA

Proceed as follows to perform uploads.

1.  Open the menu item "Pool of orders".

2.  Select operation from the Pool of orders for which you want to perform uploads.

3.

Input of upload data.

These steps are described in more detail in the paragraphs that follow.

SMA-PRJ_82.docx

Version: 1.0.23049

Page 7 of 13

SMA-PRJ Project Time Recording

Using the menu item "Direct posting", you can enter data directly without selecting an operation

from the pool of orders. In this case, specific input fields  are not populated  and must be filled

manually. We recommend to enter data using the menu item "Pool of orders".

Select operation

The  system  identifies  the  workplace  assigned  to  the  person,  selects  all  planned  operations  for  this

workplace and shows the operations in a list.

If no workplace is defined for the person in the HR master data, no data will be shown.

The following data is shown in ascending order by MES order number.

Field

Meaning

MES order number

Combined order/OP number.
The combined order/sequence/OP number is shown here if the
system is configured for sequence processing.

Note  that  in  general  only  orders/operations  of  the

order  type  5  are  displayed  irrespective  of  the

entered selection criteria.

Project

Article/Item

Article name

Project number

Article number (as defined in the operation)

Article name

OP designation

Operation name/designation

Workplace

Group

Workplace for which the operation is planned.

Group of the workplace for which the operation is planned.

Select the operation for the upload and click the button "Enter posting".

Reduce list of pool of orders

The  filter  function

  offers  the  possibility  to  reduce  this  list  by  selecting  the  fields  described  below.  All

fields support wildcard characters. Please consider case sensitivity.

  Search by the MES order number

  Search by the project number

  Search by the operation's article

SMA-PRJ_82.docx

Version: 1.0.23049

Page 8 of 13

SMA-PRJ Project Time Recording

  Search by the operation's OP designation

Input of upload data

Enter your project times in the dialog "Enter upload".

If you have started the dialog via the list Pool of orders, the fields MES order number and Workplace are

automatically  populated  using the  data from the pool  of orders. In addition, the  date and time fields are

filled with the current values.

Now enter the data for the upload:

Field

Comment

MES order number

Workplace

Date

Time

Duration

Finish operation

Person

Combined order/OP number.
Enter the combined order/sequence/OP number here if the
system is configured for sequence processing.

If no workplace is entered, data is uploaded for the first
workplace of the group for which the operation is planned.

The current date is pre-allocated.

The current time is pre-allocated.

Duration to be uploaded. You may use the following
formats for the entry:

  Hour:Minute, e.g. 2:42
  Hour,decimal minute, e.g. 2,7
  Hour.decimal minute, e.g. 2.7

Specifies whether or not the operation is finished.
Set to "No" by default

By default, the personnel number used for login is pre-
allocated and cannot be changed.

Once  the  input  has  been  confirmed  by  clicking  the  relevant  button,  the  entered  data  are  posted  in  the

system and the dialog is closed.

Posting

The  entered  data  are  posted  once  confirmed  in  the  dialog.  It  is  an  interruption  posting  as  far  as  the

system  is  concerned  (DLG=A_UN|ANR=<MES  Order  Number>|MNR=<Workplace>|PNR=<Person-

ID>|DAT=<Date>|ZEI=<Time>|EGR:BMK11=<Duration>|).  Consequently,  a  BDE  log  record  of  record

type U is generated in the system. However, the interruption posting will only be carried out if a duration

greater than 0 is entered.

If  the  workplace  has  been  configured  as  a  "group  workplace  "  (type  =  G),  the  system  generates  a

personal BDE log record of record type B in addition to the order-related posting.

SMA-PRJ_82.docx

Version: 1.0.23049

Page 9 of 13

SMA-PRJ Project Time Recording

Der Service sendet den Parameter OPT:AGISTPNR=G in den Dialogdaten an den HYDRA-Leitrechner.

Dadurch wird bei einer AG-IST-Meldung an GAP ein "B"-Satz für die meldende Person angelegt. Der "B"-

Satz ist eine 1:1 Kopie des "U" oder "E"-Satz.

In general, only the order-related RPAs are posted. Labor utilization and staff-related resource

performance accounts are not posted.

If  the  option  "Finish  operation"  has  been  set  to  "'Yes",  a  logoff  posting  (DLG=A_BE)  is  sent,  once  the

duration  has  been  uploaded  for  the  operation  (DLG=A_UN).  The  "Finish  OP"  posting  results  in  the

generation of a BDE log record of record type E and finishes the operation (status "finished"). The "Finish

OP" posting is also carried out, if the entry for the duration is 0 and no upload was performed.

Once the operation has been logged off, nobody can upload data for the operation anymore.

In  case  of  an  interruption  posting,  you  can  enter  or  change  the  point  in  time  (date,  time)  manually

(DLG=A_UN).  But  in  case  of  a  finish  posting  (DLG=A_BE),  the  system  assigns  and  posts  the  current

point  in  time  (of  the  server).  The  times  of  interruption  posting  and  finish  posting  are  therefore  always

different.

Posting to RPA

The recorded actual duration is posted to RPA 11 of the operation.

Start date/finish date

Start date and finish date are only used for informational purposes. These dates do not affect the

actual duration. There is no plausibility check of the actual duration against the period between start

date and finish date.

Start  and  finish  date  remain  unchanged  (there  is  no  calculation  of  the  finish  date  based  on  start

date and duration).

Shift date/shift

Shift date and shift number, which are stored  in the posting, are based on the  entered start date.

You must assign a valid shift model to the workplace in order to post data and thus to get the shift

date and the shift number from the entered start date.

The  data  collected  via  the  project  time  recording  cannot  be  recalculated  in  the  event

maintenance. Consequently, you must maintain postings in the maintenance of postings.

Display and cancel uploads

You can view your recorded uploads using the menu item "Posting list". Enter the period of time for which

you want to view the uploads (date from/to, by default <today> minus 7 days until <today>). The system

identifies all data records from the start day as of 0:00 midnight until the end day 23:59.

SMA-PRJ_82.docx

Version: 1.0.23049

Page 10 of 13

SMA-PRJ Project Time Recording

Whether or not all uploads/postings can be shown for the specified period of time depends on

their  retention  period  configured  in  HYDRA.  By  default,  uploads  of  the  last  35  days  are

available.

After having requested the data, the uploads are shown that have been recorded for the workplace, which

is part of the responsibility area you are authorized for.

The following data are shown in descending order by posting time (column Start).

Field

Meaning

MES order number

Article/Item

Article name

Combined order/OP number.
The combined order/sequence/OP number will be shown here if
the system is configured for sequence processing.

Article number (as defined in the operation)

Article name

OP designation

Operation name/designation

Workplace

Duration

Start

Record type

Workplace for which the upload has been made

The duration posted onto RPA 11 from the recorded upload

Posting time of upload

"Interruption of order" if the option "Finish operation" is set to "No"

for the upload.

"Finish  order  posting“  if  the  option  "Finish  operation"  is  set  to

"Yes" for the upload.

The list of order-related postings includes the interruption postings (DLG=A_UN) as well as the

finish  postings  (DLG=A_BE).  The  duration  00:00  is  the  easiest  way  to  distinguish  between

finish postings and interruption postings.

You can cancel or delete an upload, if you select the respective upload in the list and click the button

.

The action "delete" deletes the selected posting. If there is a corresponding posting of record type B, it will

also be deleted.

If the "Finish" posting of an operation is deleted, the operation status is reset to "U = interrupted".

A posting can only be deleted, if it has not yet been uploaded to the ERP system.

The option "Change after upload" for the order type is not evaluated. That means, if a posting

has been uploaded, it cannot be deleted, even if the option is set differently to the order type.

In this case, you must delete the posting in the MOC application Order-related postings.

SMA-PRJ_82.docx

Version: 1.0.23049

Page 11 of 13

Evaluations in MOC

The times recorded and posted to the operation are shown in the following MOC applications. You need

SMA-PRJ Project Time Recording

further authorizations to start the applications.

Order information

Shows the actual durations posted to RPA 11 of an operation.

Order overview  Progress

Shows the posted actual durations of the column RPA 11, just as it is the case for the "Status" tab of the

order information dialog.

Order-related postings

The actual durations posted onto the resource performance account 11 can be displayed and changed in

the maintenance of postings dialog.

Personnel report

If the workplace, for which you uploaded data, has been configured as group workplace, this report shows

the actual durations posted to the RPAs.

Upload to the ERP system

The  recorded  data  are  uploaded  to  the  ERP  system.  For  further  information  on  the  upload  structure,

please refer to the respective interface documentation.

SMA-PRJ_82.docx

Version: 1.0.23049

Page 12 of 13

SMA-PRJ Project Time Recording

SMA-PRJ_82.docx

Version: 1.0.23049

Page 13 of 13

