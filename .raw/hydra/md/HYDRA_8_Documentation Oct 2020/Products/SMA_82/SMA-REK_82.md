Manual

Complaint Management
SMA-REK 8.2

Version 1.0.23049

Last changed: 02.09.2020

Complaint Management

CopyrightCopyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

SMA-REK_82.docx

Version: 1.0.23049

Page 4 of 4

Complaint Management

Content

1  Complaint Management ............................................................................... 4

2  Complaint Overview ..................................................................................... 6

3  New Creation of Complaints ........................................................................ 8

4  Changing Complaints ................................................................................... 9

5  List of Measures containing Detailed Display ............................................ 10

6  Failure Type List containing Details ........................................................... 12

7  Create Measures for the Complaints Header ............................................ 13

8  New Creation of Measures for Complaint Details ...................................... 14

9  New Creation of Failure Types for Complaint Details ................................ 15

10  Document List ............................................................................................ 16

11  New Creation of Document for the Complaint Header ............................... 18

12  New Creation of Document for Complaint Details ..................................... 19

13  Processing Measures ................................................................................. 20

14  Processing Failure Types ........................................................................... 21

15  Processing Documents .............................................................................. 22

SMA-REK_82.docx

Version: 1.0.23049

Page 4 of 4

Complaint Management

1  Complaint Management

Possible fields of application

This  function  package  is  used  if  complaints  are  collected  or  processed  with  mobile  devices.    A  further

application  is  the  ability  to  request  complaint  status,  analysis  /  view  detailed  information  on  a  mobile

device.

Implementation notes

The function package is especially designed for the use off-site without a network connection.  That is the

case during  if  you are  away  on a job or  visiting customers and suppliers.  It  is also possible to  use the

function package in areas where there is no network connection available to collect complaint data.

It is required for this function package that master data had been collected in HYDRA previously. These

are:

  Article

  Customers

  Suppliers

  Staff

  Failure types

  Measures

Integration

Collecting and processing claims with this function package on a mobile device is directly related to the

function of the complaint module in the MOC.  Complaint data collected on a mobile device can be further

processed  and  evaluated  in  the  MOC.    Also,  master  data  collected  in  the  MOC  are  the  basis  to  use

complaint management for mobile devices.

Functions Scope

What does this function package offer, especially relating to the documented functions of the license?

This package offers the following performance features to collect, manage and analyze complaints.

  Opening and creating complaints for different complaint types (supplier, customer, internal).



Information for additional complaint details like articles, status, findings, responsibility, dates.

  Assignment  of measures  of  various  types  (short  term, medium  term  and  long  term)  inclusive  of

status, deadlines and responsibilities.

  Assignment of detected failures.

SMA-REK_82.docx

Version: 1.0.23049

Page 4 of 4

Complaint Management

  Taking photos of failures as part of the document list if available.

  This simplifies and speeds up the access to collected complaints in a complaint overview stating

the status, result etc.

  Request comprehensive detailed information of a selected complaint.

  Graphical visualization of current processing status in an assigned workflow process (HYDRA 8

license required for the creation of workflow).

  Request  contact  data  for  an  assigned,  responsible  person  with  the  option  to  send  mail  to  that

person. Function for mobile clients to collect, manage and analyze.

SMA-REK_82.docx

Version: 1.0.23049

Page 4 of 4

Complaint Management

2  Complaint Overview

In the complaint overview a list appears on the left stating all complaints.  The list can be restricted using

a  filter.    A  match  code  filter  is  available  for  the  user.    Content  to  be  filtered  in  a  text  is  replaced  by  the

symbol "*".  Using the symbol "?" an individual symbol can be replaced.  All content of the complaint list

can be filtered.  The following information is part of the complaint list:

  Complaint number - complaint detail number

both numbers are separated by a hyphen and are shown in the first line of a complaint.  Possible

display format "2324 - 1" (2324 is the complaint number, "1" is the complaint detail number).

  Article number - article description

the information is part of the second line and is also separated by a hyphen.

Also, the status of a complaint is highlighted by a colored LED symbol.  The following color assignments

for a complaint status are valid:





completed => green LED

collected => yellow LED

  open=> red LED

  other status => black LED

A special filter containing various filter criteria can be requested which is an additional option to directly

filter match codes in  the complaint  list.   Selection lists are available to facilitate  filtering for many fields.

Both fields must be filled (from / until) if a filter is used for date of receipt.

In the right display area detailed information is shown in the list for the selected complaints.  The parallel

display of the left and right display area is dependent on the selected display medium.  For example on

the  smartphone  only  one  complaint  list  is  displayed.    In  order  to  show  details  the  required  complaint

should be selected.

The detailed display enables using special function buttons for the following create/process function:

  New creation of a complaint (complaint header incl. -detail).

  Process complaint (complaint header incl. -detail)

  Request all measures relating to complaints (complaint header, detail and failure analysis)

  Creating measures relating to a complaint header

  Creating measure relating to a complaint detail

  Request an assigned failure type

  Collecting failure type

  Request documents relating to a complaint (complaint header, detail and failure analysis)

  Request graphical workflow display for the complaint header

SMA-REK_82.docx

Version: 1.0.23049

Page 4 of 4

Complaint Management

  Request graphical workflow display for the complaint detail

  Creating a document relating the complaint header

  Creating documents relating to a complaint detail

  Collecting an error pattern relating to the complaint (document type upload)

This function requires a Drag & Drop function in the MOC application for the complaints

management. This is available from REK 8.2.

  Collecting an error pattern relating to the complaint detail (document type upload)

This function requires a Drag & Drop function in the MOC application for the complaints

management. This is available from REK 8.2.

SMA-REK_82.docx

Version: 1.0.23049

Page 4 of 4

Complaint Management

3  New Creation of Complaints

In the collection dialog for a complaint, data relating to the complaint header and complaint detail can be

collected simultaneously.  After storage complaint header and complaint detail are automatically created.

The list of complaints is instantly updated after it has been saved.  In order to add further information to a

newly collected complaint (i.e. measures), the complaint must be selected manually as the first complaint

in  the  list  is  automatically  checked.    The  new  complaint  can  be  easily  identified  by  filtering  the  date  of

receipt or article information.

The fields "Complaint type" and "Area" are mandatory fields.  Entries can only be executed by requesting

a selection list.  No complaint can be created without completing details in these fields.

In case a complaint number has not been assigned, it will be assigned automatically upon saving.

The field "Date of receipt" is automatically pre allocated with a date from the system but can be changed.

Depending on the browser, a calendar opens to facilitate the completion of the date.  This function is not

supported by every browser. It is not supported by the Internet Explorer.  If the calendar does not open,

the  date  must  be  collected  in  the  format  "YYYY-MM-DD".    The  detailed  display  with  date  fields  are

presented in the format "DD.MM.YYYY".

If no information is added to the field "Received by" the currently logged person is automatically assigned

to  the  field  upon  saving.    After  saving  both  fields  cannot  be  changed,  just  like  the  fields  "Complaint

number", "Complaint type" and "Area".

A requirement is that the MOC has the article number with or without drawing in the article master data.

Other  fields  can  collect  information  for  the  complaint  header  or  complaint  detail  like  status,  results,

originator of the complaint, contacts and party  in charge.  You can populate the fields by requesting the

selection lists.  The collected data can always be added or changed in SMA-REK or via the MOC.

Using smartphones the fields for categories like "Contact", "Party in charge complaint header" and "Party

in  charge  complaint  details"  and  the  "Target  date"  are  not  available.    Please  observe  above  mentioned

restrictions for the field "Target date" relating to the entry of calendar details.

SMA-REK_82.docx

Version: 1.0.23049

Page 4 of 4

Complaint Management

4  Changing Complaints

In  this  dialog  the  fields  "Complaint  number  and  "Area"  are  not  displayed.  Additionally  the  field  "Actual

date" is shown.

Depending  on  the  browser,  a  calendar  opens  to  facilitate  the  completion  of  the  date  in  the  field.    This

function is not supported by  every browser. It is not supported by the Internet Explorer.  If the calendar

does not open, the date must be collected in the format "YYYY-MM-DD".  The detailed display with date

fields are displayed in the format "DD.MM.YYYY".

In  order  to  make  detailed  information  available  not  changeable  fields  like  "Ext.  detail  number",  "Receipt

date" and "Received by" are displayed.

There  is  also  the  option  to  change  or  add  information.  Like  in  the  collection  dialog,  changing  and

collection of some fields is carried out by requesting the selection list and uploading the selected data set.

Using  smartphones,  the  fields  for  categories  like  "Contact  person",  "Party  in  charge  complaint  header",

"Party in charge complaint details" as well as the "Target date" and "Actual date" are not available. Also

fields that cannot be changed are not displayed on smartphones and tablets.

SMA-REK_82.docx

Version: 1.0.23049

Page 4 of 4

Complaint Management

5  List of Measures containing Detailed Display

In the measure overview a list of all measures appears on the left hand side. This list contains measures

relating to complaint header, complaint detail as well as failure analysis.

If a complaint contains several complaint details, for each combination of complaint header and complaint

detail  a  separate  entry  appears  in  the  complaint  overview  list.    All  measures  are  displayed  in  order  to

obtain  an  overview.    It  is  irrelevant  if  the measures  are  assigned  to  a  complaint  detail  or  a  failure  type.

Therefore, all measures are displayed which refer to the same complaint number.

The content can be restricted using a filter.  A match code filter is available for the user.  Content to be

filtered in a text is replaced by the symbol "*".  Using the symbol "?" an individual symbol can be replaced.

The complete content of a measure list can be filtered.  The following information is part of the complaint

list:

  Measure number - measure description

The above information is separated with a hyphen and is displayed in the 1. line of a measure.

Possible display format: "2324 - oil parts" ("2324 is the measure number and "oil parts" is the

measure description).

  Measure text - target date

Article

number

-

article

description

Information is part of the 2. line and are also separated by a hyphen.

Also, the status of a complaint is highlighted by a colored LED symbol.  The following color assignments

for a measure status are valid:

  Completed => green LED

  open=> yellow LED





in process => red LED

sighted => blue LED

  other status => black LED

In the right display area detailed information is shown in the list for the selected measure.  The parallel

display of the left and right display area is dependent on the selected display medium.  Only the measure

list is displayed on the smartphone.  In order to show details the required measure should be selected.

Using a smartphone the fields "Fulfillment in %" and "Effectiveness in %" are not displayed.

In the detailed overview the selected measure can be processed via a button.

SMA-REK_82.docx

Version: 1.0.23049

Page 4 of 4

Complaint Management

The new creation of measures is carried out in the home screen of the detailed complaint display.  Here

you can decide if the measure should be collected in the complaint header or the complaint detail.

Collection of measure for a failure type can only be done via the MOC.

SMA-REK_82.docx

Version: 1.0.23049

Page 4 of 4

Complaint Management

6  Failure Type List containing Details

The dialog "Failure type overview" shows on the left hand side of the list all collected failure types which

are assigned to the same complaint number.  If a complaint contains several complaint details, all failure

types  of  the  complaint  are  always  displayed  even  though  specific  failure  types  are  assigned  to  one

complaint  detail.    If  a  complaint  shows  for  example  3  complaint  details  then  3  entries  appear  in  the

complaint overview list.  For each of the entry the same failure type list is displayed.

The content can be restricted using a filter.  A match code filter is available for the user.  Content to be

filtered in a text is replaced by the symbol "*".  Using the symbol "?" an individual symbol can be replaced.

The complete content of the list can be filtered.  The following information is part of the failure type list:

  Failure

type

number

The information is displayed in the 1. line.

  Failure type description - comment

Article

number

-

article

description

Information is part of the 2. line and is also separated by a hyphen.

In the right display area detailed information is shown in the list for the selected failure type.  The parallel

display of the left and right display area is dependent on the selected display medium.  The smartphone

only displays the failure type list.  In order to show details the required failure type should be selected.

In the detailed overview the selected failure type can be processed via a button.

The new creation of failure types is carried out in the home screen of the detailed display of a complaint.

Collection of measure for a failure location, cause of failure and originator of failure can only be done via

the MOC.

SMA-REK_82.docx

Version: 1.0.23049

Page 4 of 4

Complaint Management

7  Create Measures for the Complaints Header

The collecting dialog facilitates to create measures for the complaint header.

Independent from the device you use, all fields are available.

Assignment  of  the  measure  type,  the  findings  and  the  responsible  failure  type  is  carried  out  using  the

selection  list.    Measures  can  also  be  selected  using  the  selection  list  but  also  by  directly  entering  the

number  of  the  measure.      When  assigning  measures  using  the  selection  list  the  measure  number  is

loaded.    Collection  of  the  responsible  personnel  is  carried  out  by  directly  entering  their  "number".    The

person must be set up before in the MOC.  In a measure list which can be requested separately measure

description and detailed information of the responsible party is also displayed.

Depending on the browser, a calendar opens to facilitate the completion of the date.  This function is not

supported by every browser. It is not supported by the Internet Explorer.  If the calendar does not open,

the  date  must  be  collected  in  the  format  "YYYY-MM-DD".    The  detailed  display  with  date  fields  are

displayed in the format "DD.MM.YYYY".

Using the fields "Text" and "Comment" the measure can be explained in detail.

In  a  separate  processing  dialog  the  effectiveness  and  the  fulfillment  as  well  as  the  actual  date  can  be

added.

SMA-REK_82.docx

Version: 1.0.23049

Page 4 of 4

Complaint Management

8  New Creation of Measures for Complaint Details

The collecting dialog facilitates to create measures for complaint details.

Independent from the device you use, all fields are available.

Assignment  of  the  measure  type,  the  findings  and  the  responsible  failure  type  is  carried  out  using  the

selection  list.    Measures  can  also  be  selected  using  the  selection  list  but  also  by  directly  entering  the

number  of  the  measure.    When  assigning  measures  using  the  selection  list  the  measure  number  is

loaded.    Collection  of  the  responsible  personnel  is  carried  out  by  directly  entering  their  "number".    The

person must be set up before in the MOC.  In a measure list which can be requested separately measure

description and detailed information of the responsible party is also displayed.

Using the fields "Text" and "Comment" the measure can be explained in detail.

In  a  separate  processing  dialog  the  effectiveness  and  the  fulfillment  as  well  as  the  actual  date  can  be

added.

SMA-REK_82.docx

Version: 1.0.23049

Page 4 of 4

Complaint Management

9  New Creation of Failure Types for Complaint Details

The collecting dialog facilitates to create failure types for complaint details.

Independent from the device you use, all fields are available.

The field "Weighting" is mandatory.  It is possible, using the information stated in that field, to document

how often a failure occurs

Collecting  a  measure  can  be  carried  out  using  a  selection  list  or  by  directly  inserting  the  failure  type

number.    When  assigning  measures  using  the  selection  list  the  failure  type  number  is  loaded.    A

description  is  added  in  a  failure  type  list  which  must  be  requested  separately.    The  failure  type  to  be

collected must be set up before in the MOC.

Using the fields "Comment" the failure type can be explained in detail.

If the checkbox is activated externally then there is a possibility in the MOC to print an 8D report for this

failure type.

SMA-REK_82.docx

Version: 1.0.23049

Page 4 of 4

Complaint Management

10  Document List

In the document overview a list of documents appears on the left hand side.  This list contains documents

relating to complaint header, complaint detail as well as failure analysis.

If a complaint contains several complaint details, for each combination of complaint header and complaint

detail a separate entry appears in the complaint overview list.  All document entries for all documents are

displayed  in  order  to  obtain  an  overview.    It  is  irrelevant  if  the  documents  are  assigned  to  a  complaint

detail or a failure type.  Therefore all document entries are displayed which refer to the same complaint

number.

The content can be restricted using a filter.  A match code filter is available for the user.  Content to be

filtered in a text is replaced by the symbol "*".  Using the symbol "?" an individual symbol can be replaced.

The  complete  content  of  the  document  list  can  be  filtered.    The  following  information  is  part  of  the

document list:

  Document type

Failure type number

The information is displayed in the 1. line of the document entry.

  Description

The information is displayed in the 2. line of the document entry.

In  the  right  display  area  detailed  information  is  shown  in  the  list  for  the  selected  document  entry.    The

parallel display of the left and right display area is dependent on the selected display medium.  Only the

document  list  is  displayed  on  the  smartphone.    In  order  to  show  details  the  required  document  entry

should be selected.

The fields "Externally" and "Position" are not available on the smartphone.

In the detailed overview the selected document entry can be processed via a button.

A further button enables to display document content.  The content of the field "Text" is shown with the

document type "Text".   For the type "URL" or "File" the "linked" document is opened with the respective

program  and  displayed.    In  order  to  display  the  URL  entry  a  "Link"  in  form  of  a  http://www.mpdv.de  is

required.  An entry in the form of www.mpdv.de

 cannot be displayed.

The field "Assignment" can only show the content if the document is assigned to a failure type.

The  new  creation  of  document  entries  is  carried  out  in  the  home  screen  of  the  detailed  display  of  a

complaint.  Here you can decide if the document entry be should collected in the complaint header or the

complaint detail.

Collection of document entries for a failure type can only be done via the MOC.

SMA-REK_82.docx

Version: 1.0.23049

Page 4 of 4

Complaint Management

SMA-REK_82.docx

Version: 1.0.23049

Page 4 of 4

Complaint Management

11  New Creation of Document for the Complaint Header

The  collecting  dialog  facilitates  creating  a  document  with  type  "Text"  for  the  complaint  header.

Documents type "File" and "URL" cannot be assigned.  To assign pictures of defects a special function is

available.  This is a button in the dialog of the complaints overview.

Independent from the device you use, all fields are available.

The field "Position" is a mandatory field and a position number must be attached. The number should be

same as the complaints number but has not been assigned yet.

Using the field "Description" a "Title" is assigned to the document. This title also appears in the document

list.

The document text itself is collected in the field "Text".

The  field  checkbox  "External"  has  currently  no  function.    It  is  though  possible  to  use  this  in  reports  for

complaints as a filter when printing information.  This field is not displayed on smartphones.

SMA-REK_82.docx

Version: 1.0.23049

Page 4 of 4

Complaint Management

12  New Creation of Document for Complaint Details

The collecting dialog facilitates to create a document with type "Text" for the complaint detail.  Documents

type "File" and "URL" cannot be assigned.  To assign pictures of defects a special function is available.

This is a button in the dialog of the complaints overview.

Independent from the device you use, all fields are available.

The field "Position" is a mandatory field and a position number must be attached. The number should be

same as the complaints detail but has not been assigned yet.

Using the field "Description" a "Title" is assigned to the document. This title also appears in the document

list.

The document text itself is collected in the field "Text".

The  field  checkbox  "External"  has  currently  no  function.    It  though  possible  to  use  this  in  reports  for

complaints as a filter when printing information.   This field is not displayed on smartphones.

SMA-REK_82.docx

Version: 1.0.23049

Page 4 of 4

Complaint Management

13  Processing Measures

In the dialog for measure processing all information can be changed.  Additional to the fields in the dialog

for the measure collection, information to the degree of fulfillment and effectiveness in % can be carried

out here.

Identical  to  the  collection  dialog  selection  lists  for  several  fields  are  available  or  changes  can  only  be

carried out in the selection list.

Depending on the browser, a calendar opens to facilitate the completion of the date.  This function is not

supported by every browser. It is not supported by the Internet Explorer.  If the calendar does not open,

the  date  must  be  collected  in  the  format  "YYYY-MM-DD".    The  detailed  display  with  date  fields  are

displayed in the format "DD.MM.YYYY".

SMA-REK_82.docx

Version: 1.0.23049

Page 4 of 4

Complaint Management

14  Processing Failure Types

All information can be changed in the dialog for failure type processing apart from the failure type.

SMA-REK_82.docx

Version: 1.0.23049

Page 4 of 4

Complaint Management

15  Processing Documents

All  information  can  be  changed  in  the  dialog  to  process  document  entries  apart  from  the  the  collected

position.

The  field  "Assignment"  containing  a  selection  list  is  also  available  for  documents  which  have  been

collected  for  the  complaint  header  or  complaint  detail.    This  field  should  only  be  used  for  document

entries relating to a failure type.

Independent of the type assignment, the fields "Text" and "File name/address" are available.  The field of

the document type "Text" must be maintained. If this is not the case the field "File name/address" must be

maintained.

The  entry  of  a  web  link  must  be  carried  out  in  form  of  an  http://www.mpdv.de.  Entries  in  the  form  of

www.mpdv.de

 cannot be displayed. .

SMA-REK_82.docx

Version: 1.0.23049

Page 4 of 4

