Manual

Complaint Management
Monitoring
REK-MRM 8.1

Version 1.0.1361

Last changed on: 19.06.2020

Complaint Management Monitoring

Copyright

©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

REK-MRM_81.docx

Version: 1.0.2413

Page 2 of 27

Complaint Management Monitoring

Contents

1  Overview of Complaint Management Monitoring ......................................... 4

2  Complaint Management ............................................................................... 5

3  Complaint Analysis ..................................................................................... 23

REK-MRM_81.docx

Version: 1.0.2413

Page 3 of 27

Complaint Management Monitoring

1  Overview of Complaint Management Monitoring

Fields of application

This  function  enables  the  graphic  analysis  of  complaints  (e.g.  trend  of  complaints  for  each  customer,

supplier)

in  addition

to

the  assignment  and  presentation  of  documents  (pictures  of  defects,

correspondence  with  customers/suppliers  etc.  of  any  formats,  telephone  notes  as  fee  text,  etc.)  in  the

complaint header or complaint detail.

Implementation notes

This component is recommendable if any documents are to be assigned and displayed for a complaint in

addition  to  failure  and  measure  recording.  Another  field  of  application  refers  to  the  requirement  of  a

detailed complaint analysis including its graphic presentation.

Integration

This component is primarily connected with the component for collection, processing and management of

complaints.

Features

These functions are available.

  Assignment  and  presentation  of  documents  (pictures  of  defects,  correspondence  with

customers/suppliers  etc.  of  any  format,  phone  notes  as  free  text)  in  the  functional  areas  of  the

complaint header and partial complaint.

  Graphic  analysis  of  complaints  including  extensive  filter  criteria  and  presentation  options  (e.g.

development of complaints: general, for each customer/supplier, subject to the result)

REK-MRM_81.docx

Version: 1.0.2413

Page 4 of 27

Complaint Management Monitoring

2  Complaint Management

Overview

Menu

Quality management  Complaint management  Complaint management

Transaction code

cm

Function authorization

cm

Utilization

This  function  allows  for  different  types  of  complaints  to  be  created.  The  types  “customer  complaint”,

“supplier  complaint”  and  “internal  complaint”  are  provided  by  default.  The  complaint  header  should  only

include data that are not directly related to the item complained about. Details relating to the article/item

are to be defined within the subordinate complaint details.

Integration

This application provides data for the following reports/evaluations:

  Failure analysis of complaints,

  Complaint analysis,

REK-MRM_81.docx

Version: 1.0.2413

Page 5 of 27

Complaint Management Monitoring

  Analysis of complaint costs and

  Measure tracking.

Different master data are used if a complaint is created, e.g.





customers for a customer complaint,

failures for the failure analysis

  measures for defining measures,





costs for costs recording and

inspection requirements for the assignment of a referenced inspection step.

Prerequisite

Relevant master data need to be edited/maintained to be able to create complaints. Which master data

have to be maintained depends on the respective field of application. Normally, the master data

  Articles/items,

  Defects,

  Measures,

  Costs,

  Companies

  Departments and

  Staff

have to be maintained first.

Selection criteria

The sections that follow describe the selection criteria that are not self-explanatory.

Complaint tab

Complaint

The complaint number assigned manually or automatically may be filtered here.

Ext. complaint number

If  the  customer/supplier  uses  another  complaint  number  than  the  number  that  is  created  for  this

complaint, it will be defined in the "ext. complaint number" field. This field may be filtered.

Complaining party tab

REK-MRM_81.docx

Version: 1.0.2413

Page 6 of 27

Complaint Management Monitoring

Complaining party type

The  types  "supplier",  "customer",  "department"  and  "person"  may  be  selected.  Subject  to  the

selected type, an entry may be selected in the "complaining party" field.

Complaining party

The  contents  of  the  party  in  charge  list  may  be  filtered.  Which  entry  is  transferred  to  the  list  of

responsible parties is defined within the master data.

Designation

The content of the field "name 1" of the list of responsible parties is filtered. This is the name of the

department  for  departments,  the  last  name  for  external  persons  and  the  company  name  for

companies.

Contact partners tab

Contact partner type

Different  types  may  be  selected.  An  entry  may  be  selected  in  the  "contact"  field,  subject  to  the

selected type.

Contact

The  contents  of  the  party  in  charge  list  may  be  filtered.  Which  entry  is  transferred  to  the  list  of

responsible parties is defined within the master data.

Designation

The  content  of  the  field  "name  1"  of  the  list  of  responsible  persons  may  be  filtered.  This  is  the

department name for departments, the last name for external persons and the company name for

companies.

Party in charge tab

Party in charge type

Different  types  may  be  selected.  An  entry  may  be  selected  in  the  "party  in  charge  type"  field,

subject to the selected type.

Party in charge type

The  contents  of  the  party  in  charge  list  may  be  filtered.  Which  entry  is  transferred  to  the  list  of

responsible parties is defined within the master data.

Designation

The  content  of  the  field  "name  1"  of  the  list  of  responsible  persons  may  be  filtered.  This  is  the

department name for departments, the last name for external persons and the company name for

companies.

REK-MRM_81.docx

Version: 1.0.2413

Page 7 of 27

Complaint Management Monitoring

Field descriptions

Complaint tab

Area

Selection list of the configured areas

Complaint

In  case  a  complaint  number  has  not  been  assigned  manually,  it  will  be  assigned  automatically,

once  HYDRA  has  been  saved.  In  combination  with  the  area  HYDRA  creates  a  unique  complaint

number.

Type of complaint

Customer complaint, supplier complaint or internal complaint.

Ext. complaint number

If  the  customer/supplier  uses  another  complaint  number  than  the  number  that  is  created  for  this

complaint, it will be defined in the "ext. complaint number" field.

Received by

Once saved, the registered user is entered in this field.

Date of receipt/time

The current system date/time will be entered upon saving.

Status

List of configured complaint statuses

Result

List of configured complaint results

Target date, time

Information field if a corresponding specification is to be entered for dealing with the complaint.

Actual date/time

A  date/time  when  the  complaint  is  to  be  considered  as  "done"  may  be  entered  here.  The  actual

status is not checked in this context.

Complaining party type

Different types may be selected. The complaint type is not checked. The type "customer" should be

entered here if it is a customer complaint to be able to enter a customer as the complaining party.

REK-MRM_81.docx

Version: 1.0.2413

Page 8 of 27

Complaint Management Monitoring

Complaining party

The  contents  of  the  party  in  charge  list  may  be  filtered.  Which  entry  is  transferred  to  the  list  of

responsible parties is defined within the master data. The selected entry is used as the complaining

party.

Complaining party name 1, name 2, name 3

The contents  of the fields  name 1, name 2  and name 3  of the complaining party  are shown. The

customer name and the content of the address fields 1 and 2 are displayed for customers. The last

name, first name and initials are displayed for external persons.

Contact partner type

Different types may be selected.

Contact

The  list  of  responsible  parties  is  displayed.  Which  entry  is  transferred  to  the  list  of  responsible

parties is defined within master data. The selected entry is used as the contact.

Contact name 1, name 2, name 3

The  contents  of  the  fields  name  1,  name  2  and  name  3  of  the  contact  are  shown.  The  customer

name  and  the  content  of  the  address  fields  1  and  2  are  displayed  for  customers.  The  last  name,

first name and initials are displayed for external persons.

Party in charge type

Different types may be selected. This field does not have a special function, i.e. it depends on the

corresponding  application  specifying  who  is  to  be  entered  as  the  responsible  party.  Normally,  the

person  selected  here  is  generally  responsible  for  the  entire  complaint.  However,  this  is  not

monitored by special functions.

Party in charge

The  list  of  responsible  parties  is  displayed.  Which  entry  is  transferred  to  the  list  of  responsible

parties is defined within master data. The selected entry is used as the responsible party.

Party in charge name 1, name 2, name 3

The  contents  of  the  fields  name  1,  name  2  and  name  3  of  the  responsible  party  are  shown.  The

customer name and the content of the address fields 1 and 2 are displayed for customers. The last

name, first name and initials are displayed for external persons.

Additional data tab

Cost center

Information field to specify a cost center

Delivery note

Information  field  to  state  a  delivery  note  number.  This  field  is  not  checked  against  the  previously

selected complaint type (e.g. supplier complaint).

REK-MRM_81.docx

Version: 1.0.2413

Page 9 of 27

Complaint Management Monitoring

Delivery date

Information field to state a  delivery  date. This field is  not checked against the previously selected

complaint type (e.g. supplier complaint).

Storage location

Information field to specify a storage location.

Toolbar

 Copy a complaint header

Function authorization: cm.insert

The copy function opens the selected complaint and also allows for the key fields to be changed.

But only the complaint header is copied upon saving. The complaint details, i.e. documents,

measures, costs and failure analyses that might pertain to the "copy template" are not copied.

 Referencing of complaints

Function authorization: none

A list/application is opened that references complaints (e.g. did a supplier complaint result from a

customer complaint) or shows complaints that have already been referenced.

 Calling the workflow history

Function authorization: cmwf.edit

Opens the graphic view of the referenced workflow for the complaint header. The graphic states the

current processing status. In addition to the graphic, the list also shows every action pertaining to

the workflow.

Detail application “complaint detail"

Function authorization

cmd

REK-MRM_81.docx

Version: 1.0.2413

Page 10 of 27

Complaint Management Monitoring

All  pieces  of  information  that  are  directly  connected  to  the  item/material  complained  about  should  be

defined within the complaint details, as the item complained about is only assigned at this point.

This  allows  for  "collective  complaints"  to  be  recorded.  Consequently,  a  customer  can  complain  about

different items/articles e.g. using one complaint number. A complaint detail may be created and analyzed

separately  for  the  complaint  header  of  each  article/item  complained  about.  It  is  also  possible  to  create

several  complaint  details  for  one  article/item. This  is required,  for  example,  if  different  batches,  etc.  are

complained about and need to be analyzed separately.

The  field  "complaint"  is  assigned  to  the  complaint  number  of  the  currently  selected  complaint,  when

editing  or  creating  new  complaint  details.  The  numeric  value  of  the  "detail"  field  is  generated

automatically, once this new data record has been saved and cannot be changed anymore.

Field descriptions

"Details" tab

Complaint

Shows the complaint number of the superordinate complaint.

Detail no.

The  complaint  detail  number  is  shown  here  when  editing.  This  field  is  empty  when  a  new  data

record  is  created  and  is  assigned  automatically  to  a  complaint  number  that  is  unique  within  this

complaint upon saving.

REK-MRM_81.docx

Version: 1.0.2413

Page 11 of 27

Complaint Management Monitoring

Article number, article designation, drawing issue number

The selection list of article master data may be opened from which an article/item can be selected

to specify the article/item complained about. The corresponding article designation is shown  within

the  complaint  details.  Instead  of  selecting  the  article,  the  article  number  as  well  as  drawing  issue

number  may  also  directly  be  entered.  In  this  case,  the  article  designation  is  determined  from  the

master data catalog and displayed upon saving.

Supplier no.

Direct input of the supplier number or selection by opening the supplier catalog. The supplier name

is also displayed after saving.

Purchase order number

Information  field  to  enter  a  purchase  order  number.  This  field  input  does  not  depend  on  the

selected complaint type.

Serial number

Information field to enter a serial number.

Batch

Information field to enter a batch.

Status

Selects/shows the complaint detail status

Result

Selects/shows the result of the complaint detail

Party in charge type

Different types may be selected when inputting data. This field does not have a special function, i.e.

it  depends  on  the  corresponding  application  specifying  who  is  to  be  entered  as  the  responsible

party. Normally, the person selected here is generally responsible for dealing with the complaint in

more detail,  i.e. provision  of information about  the article/item complained about. However, this  is

not monitored by special functions.

Party in charge

The  list  of  responsible  parties  or  the  assigned  parties  in  charge  are  displayed.  Which  entry  is

transferred to the list of responsible parties is defined within master data. The selected entry is used

as the responsible party.

Party in charge name 1, name 2, name 3

The  contents  of  the  fields  name  1,  name  2  and  name  3  of  the  responsible  party  are  shown.  The

customer name and the content of the address fields 1 and 2 are displayed for customers. The last

name, first name and initials are displayed for external persons.

REK-MRM_81.docx

Version: 1.0.2413

Page 12 of 27

Complaint Management Monitoring

Team

A  team  may  be  entered  or  selected.  Teams  are  defined  within  master  data.  After  saving,  the

designation is displayed in addition to the team number.

Additional data tab

Delivery value

Information field to enter/display a delivery value. This field is available irrespective of the complaint

type.

Complaint value

Information field to enter/show the complaint value.

Delivery quantity

Information  field  to  enter/display  a  delivery  quantity.  This  field  is  available  irrespective  of  the

complaint type.

Complaint quantity

Information field to enter/show the quantity specified in the complaint.

Share of the complaint

Information  field  to  enter/show  the  proportion  of  the  complaint.  The  content  of  this  field  is  not

calculated automatically.

Checked quantity

Information  field  to  enter/show  the  checked  quantity.  The  customer  has  to  decide  whether  this

refers to the quantity checked by the customer or by the complaining party.

Defective quantity

Information field to enter/show the faulty quantity. The customer has to decide whether this refers to

the defective quantity identified by the customer or by the complaining party.

Share of defects

Information  field  to  enter/show  the  share  of  defects.  The  content  of  this  field  is  not  calculated

automatically.

Inspection requirement 1

Shows  the  assigned  inspection  requirement  or  provides  the  option  to  choose  an  inspection

requirement  from  the  list  of  inspection  requirements.  The  selection  list  provides  all  inspection

requirements from all sectors. The inspection requirement number is displayed in this field, once an

inspection requirement has been taken over. In addition to this, the corresponding sector is shown,

e.g. "E" for goods receipt or "F" for production.

REK-MRM_81.docx

Version: 1.0.2413

Page 13 of 27

Complaint Management Monitoring

Inspection requirement 2

Shows the second inspection requirement assigned or provides the option to choose an inspection

requirement  from  the  list  of  inspection  requirements.  The  selection  list  provides  all  inspection

requirements from all sectors. The inspection requirement number is displayed in this field, once an

inspection requirement has been taken over. In addition to this, the corresponding sector is shown,

e.g. "E" for goods receipt or "F" for production.

Toolbar

 Calling the workflow history

Function authorization: cmdwf.edit

Opens the graphic view of the workflow referenced for the complaint detail. The graphic states the

current processing status. In addition to the graphic, a list also shows every action pertaining to the

workflow.

Detail application "measures in the complaint header and complaint details

as well as in the failure analysis"

Function authorization

cmme for measures in the complaint header

cmdme for measures in the complaint detail

cmdfa for measures in the failure analysis

REK-MRM_81.docx

Version: 1.0.2413

Page 14 of 27

Complaint Management Monitoring

A list of assigned measures is available for each selected complaint or complaint detail. Further measures

may  be  added  or  existing  measures  may  be  changed,  complemented  or  deleted  at  any  time.  The

measures created here are also included in the "measures tracking" application where they may also be

edited.

When a new data record is created, a "measure" needs to be indicated to be able to save the data record.

In  addition  to  the  field  "measure",  it  is  also  possible  to  open  the  "measures"  master  data  catalog  from

which a measure may be chosen and assigned. As an alternative to selecting measures, measures may

also be entered directly.

The  statuses  "open",  "read",  "in  process"  and  "completed"  are  provided  by  default.  In  addition  to  the

measure  type  "no  assignment",  the  types  "short-term",  "medium-term"  and  "long-term"  may  also  be

selected. These statuses can be enhanced according to the customer's requirements by customizing the

system.

Subject  to  the  selected  "party  in  charge  type",  the  pre-filtered  list  of  responsible  parties  is  opened  by

clicking  the  magnifying  glasses  button.  Entries  that  have  been  assigned  the  flag  "responsible"  in  the

relevant master data are shown only. The list of the types that may be selected matches the types that

have already been defined for the complaint header.

It is important to specify a target date. Based on this information, corresponding filters can be set in the

measures tracking function.

The fields "fulfillment" and "effectiveness" have been designed to finally "assess" the defined measure.

REK-MRM_81.docx

Version: 1.0.2413

Page 15 of 27

Complaint Management Monitoring

Field descriptions

Measures tab

Measure type

The  available  measure  types  are  displayed  or  can  be  chosen.  The  types  "short-term",  "medium-

term", "long-term" and "no assignment" are provided by default.

Measure

The measure number is shown or can be selected or it may also be entered directly. The relevant

master data catalog can be opened for selection purposes.

Measure designation

The designation of the assigned measure number is shown. If the measure number is input directly,

the designation will only be shown upon saving.

Text

Free text field to enter a complementary measure text

Comment

Free text field to enter a complementary comment for the measure.

Detail tab

Status

Available measure types can be displayed or selected. The types "in process", "read", "done" and

"open" are provided by default.

Fulfillment [%]

Fulfillment in % can be displayed or entered.

Effectiveness [%]

Effectiveness in % can be displayed or entered.

External

This field can be used to control the printout of forms in future. However, it does not have a special

function.

Party in charge type

Different  types  may  be  selected  when  inputting  data.  The  type  "external  person"  is  used,  as

normally people are responsible for dealing with measures.

Party in charge

The party in charge is shown or it may be chosen from the list of responsible parties. Which entry is

transferred to the list of responsible parties is defined within master data. The selected entry is used

as the responsible party.

REK-MRM_81.docx

Version: 1.0.2413

Page 16 of 27

Complaint Management Monitoring

Party in charge name 1, name 2, name 3

The  contents  of  the  fields  name  1,  name  2  and  name  3  of  the  responsible  party  are  shown.  The

customer name and the content of the address fields 1 and 2 are displayed for customers. The last

name, first name and initials are displayed for external persons.

Target date/time

A date and optionally a time by which the measure has to be finished may be displayed or entered.

It will not be monitored automatically, whether or not this time limit is kept. The content of this field

is  fundamental  to  the  "measures  tracking"  application,  as  it  may  be  determined  manually  for  all

measures (global) which of them have exceeded the target date, for example.

Actual date/time

A  date  and  optionally  a  time  specifying  when  the  measure  was  finished  may  be  displayed  or

entered.  However,  this  field  does  not  have  a  special  function.  In  the  "measures  tracking"

application,  this  field  can  be  used  to  determine  manually  which  measures  have  been  completed

with a delay.

Detail application "costs in the complaint header and complaint detail"

Function authorization

cmco for the costs in the complaint header

cmdco for the costs in the complaint detail

The list of assigned costs is available for each selected complaint or complaint detail. Further costs may

be  added  or  existing  costs  may  be  changed,  complemented  or  deleted  at  any  time.  The  costs  defined

here can be evaluated in the report "analysis of complaint costs".

When  a  new  data  record  is  created,  a  "cost  type"  needs  to  be  indicated  to  be  able  to  save  the  data

record.  In  addition  to  the  field  "cost  number",  it  is  also  possible  to  open  the  "cost  types"  master  data

catalog from which a cost type may be chosen and assigned. Costs may also be entered directly as an

alternative to them being selected.

REK-MRM_81.docx

Version: 1.0.2413

Page 17 of 27

Complaint Management Monitoring

Provided that an initial duration ("init. duration" field) and an amount record ("cost rate amount" field) have

been assigned in the cost types catalog of the cost type, the field "duration" is assigned to the value from

"init. duration" and the field "amount" is assigned to the product from "init duration" and "cost rate amount"

in the dialog for complaint costs. If the field "duration" is changed or taken over unchanged as a part of

creating a new data record, the "amount" field will be recalculated automatically, once the "duration" field

has been saved. The amount is only calculated once as a part of initial data creation. The fields "duration"

and "amount" have to be changed manually if they need to be changed after the initial data creation. As

they are not recalculated automatically.

Field descriptions

Costs tab

Cost no.

The  cost  number  is  shown  or  can  be  selected  or  it  may  also  be  entered  directly.  The  relevant

master data catalog can be opened for selection purposes.

Cost designation

The  designation  of  the  assigned  cost  number  is  shown.  If  the  cost  number  is  directly  input  the

designation will only be shown upon saving.

Duration

The duration is entered or displayed in the format "hh:mm:ss". When transferring a cost type from

master data, this field is initially assigned to the master data field "init. duration".

Amount

The (calculated) amount is entered or displayed. When taking over a cost type  from master data,

this field is initially assigned to the master data field "init. amount". As a part of initial data creation,

the value of this field is calculated by multiplying the "duration" field with the original value entered

in this field upon saving.

Detail application "documents in the complaint header and complaint

details as well as in the failure analysis"

Function authorization

cm for documents in the complaint header

cmd for documents in the complaint details

cmdfa for documents in the failure analysis

REK-MRM_81.docx

Version: 1.0.2413

Page 18 of 27

Complaint Management Monitoring

Provided that the "documents" tab has been enabled, as many documents as required may be assigned

to each complaint header, complaint detail and failure analysis. By enabling these tabs, the toolbar offers

corresponding  buttons  to  edit  the  documents.  The  documents  that  have  already  been  assigned  can  be

viewed in a list in the mentioned tab.

When  documents  are  assigned,  all  formats  registered  by  Windows  are  provided.  Consequently,  it  is

possible to assign simple documents (e.g. written in Word), drawings of any format and videos. However,

the  corresponding  programs  that  are  able  to  display  the  required  formats  have  to  be  installed.  In  this

context, the documents are opened by the program that has been linked in Windows.

The  file  types  "FILE",  "URL"  and  "Text"  are  provided.  The  file  name  including  path  may  be  entered

manually  with  the  "file"  type.  The  "URL"  file  type  allows  access  to  the  Internet  or  Intranet.  The  third  file

type "Text" allows for text to be entered directly.

A  designation  may  be  assigned  to  each  defined  document.  Once  saved,  a  consecutive  item  number

(numeric) is automatically assigned to each entered document. In addition to this, the "external" checkbox

specifies for the failure analysis whether or not the document is to be part of an 8D report. Finally, the 8D

report determines whether or not this field is to be filtered at all.

REK-MRM_81.docx

Version: 1.0.2413

Page 19 of 27

Complaint Management Monitoring

Toolbar

In addition to the standard functions, there is also a button to show the documents.

 Show documents

If  a  document  link  is  defined,  this  button  opens  and  shows  this  document.  However,  a  program,

which  can  show  the  linked  file  type,  has  to  be  installed  on  the  PC.  HYDRA  paths  are  to  be

configured accordingly to open the documents.

Detail application "failure type" (failure analysis)

Function authorization

cmdfa for failure types in the failure analysis

As many failure types as required may be assigned to each complaint detail. A failure type needs to be

assigned to print out 8D reports. The list of failure types has to be opened to assign a failure type. The

required failure type can directly be entered or chosen from a master data catalog. If the failure number is

entered directly, the corresponding designation will only be shown after saving.

In addition to this, a comment may also be assigned.

The specified weighting affects failure analysis of complaint management. If the error occurs 10 times, i.e.

10 items are defective in this respect; the relevant value should be entered here.

Toolbar

In addition to the standard functions, the function for the printing of forms (8D report) is also available.

REK-MRM_81.docx

Version: 1.0.2413

Page 20 of 27

Complaint Management Monitoring

 Show documents

Function authorization: cmdfa.print

This  function  opens  the  detail  application  "printing",  which  in  this  case  enables  printing  of  the  8D

report.  The  8D  report  only  includes  contents  referring  to  the  selected  failure  type  and  that  are

assigned to the "external" flag.

"Print" detail application

Function authorization

cmdfa.print for printing the failure analysis (8D report)

The print dialog of the failure type opens a list of available reports. By default, printing is restricted to the

8D report. These are Word forms. The potential content of these forms is determined by the Web services

that are available in the respective context. The form entries, i.e. the contents of the list of forms of the

corresponding print dialog, are defined within the master data of quality management. The basis for new

forms is established and the corresponding form properties are defined there. A corresponding license is

required to be able to change the forms with respect to content and design.

Print - toolbar

There are no other special function buttons in addition to the standard functions/features.

Detail applications "failure location", "failure cause", "causer" of the failure

type

Function authorization

cmdfa for failure locations, failure causes, causers in the failure analysis

As many failure locations, failure causes and causers as required may be assigned to every failure type.

Several tabs are displayed.

A  failure  type  has  to  be  selected  beforehand  to  be  able  to  perform  the  assignment.  Subject  to  the

selected tab, the relevant entry may be created using the toolbar.

The creation process corresponds to the functions described in the detail application "failure type" (failure

analysis).

Only data assigned to the flag "external" are printed in the 8D report.

Detail applications "measure" for the failure type

REK-MRM_81.docx

Version: 1.0.2413

Page 21 of 27

Complaint Management Monitoring

Function authorization

cmdfa for measures in the failure analysis

As many measures as required may be assigned to each failure type.

A failure type has to be selected beforehand to enable assignment.

The creation of a measure corresponds to the functions described in the detail application "measures in

the complaint header and complaint detail as well as the failure analysis".

Only data assigned to the flag "external" are printed in the 8D report.

Detail application "documents of the failure type"

Function authorization

cmdfa for measures in the failure analysis

As many documents as required may be assigned to each failure type.

A failure type has to be selected beforehand to enable assignment.

The creation of a document corresponds to the functions described in the detail application "documents in

the  complaint  header  and  complaint  detail  as  well  as  the  failure  analysis".  In  addition  to  this,  an

assignment category may also be indicated. This is important to the 8D report. By default, the categories

"comment", "forecast", "control of success" and "no assignment" are available.

Only data assigned to the flag "external" are printed in the 8D report.

REK-MRM_81.docx

Version: 1.0.2413

Page 22 of 27

Complaint Management Monitoring

3  Complaint Analysis

Overview

Menu

Quality management  QM evaluation  Complaint analysis

Quality management  Complaint management  Complaint analysis

Transaction code

cmep

Function authorization

cmep

Utilization

The  complaint  analysis  allows  for  complaints  to  be  evaluated  in  different  ways.  In  this  context

evaluations/reports are based on pivot functions. These functions provide different presentation options,

e.g. the number of complaint details is presented for each complaining party separated by the result and

relating to a previously filtered period of time. These analyses help determine the core areas that might

require action to be taken.

REK-MRM_81.docx

Version: 1.0.2413

Page 23 of 27

Complaint Management Monitoring

Integration

The  complaint  analysis  function  only  evaluates  data  from  complaint  management.  In  this  context,

complaint header data and complaint detail data are distinguished.

Prerequisite

There are no special requirements to be met. Only complaints including the relevant detail data need to

be recorded.

Selection criteria

Selection criteria are self-explanatory and not described separately.

Toolbar

There are no other special function buttons in addition to the standard functions/features.

Detail applications "Graphic complaint analysis“

Data  is  displayed  in  a  pivot  table  in  combination  with  bar  charts.  Different  application  functions  are

provided  for  the  presentation.  The  complaint  data  that  have  been  restricted  beforehand  by  entering

selection criteria represent the data basis.

The general pivot functions are not described in more detail in this document. The paragraphs that follow

only describe the elementary functions of this evaluation/report.

Pivot evaluations/reports provide the following benefits.

  Large amounts of data may quickly be summarized and presented.

  Rows and columns can be exchanged to have the source data summarized differently.

  Simple filters by "drag and drop" with additional detail filters.

  Due to this interactive way of representation, data can be summarized and analyzed in different

formats and using different calculation methods.

The below context menu can be opened by clicking the right mouse button.

REK-MRM_81.docx

Version: 1.0.2413

Page 24 of 27

The function "show field list" allows for the fields that are to be used in the pivot analysis to be selected.

The below figure shows a possible list of fields.

Complaint Management Monitoring

The requested fields may be put into the evaluation area by drag & drop.

In addition to the selection criteria, the "show filter editor" function enables further flexible restrictions of

the data basis.

REK-MRM_81.docx

Version: 1.0.2413

Page 25 of 27

Complaint Management Monitoring

The below dialog is opened to show the settings made.

If  the  "selection"  option  is  checked  entire  areas  may  be  selected  in  the  table  view.  In  this  case,  the

graphic representation is based on the selected rows. If the "label" option is checked it is possible to show

the total number of each bar.

The below figure explains these functions.

The  row  showing  the  total  result  may  be  displayed  additionally  in  the  bar  chart  if  the  "totals"  option  is

checked. Provided that the "selection" function is checked and the corresponding cells of the "total result"

row are selected, the total result is added to the corresponding column of the relevant bar.

It  is  switched  between  the  graphic  presentation  of  the  corresponding  number  of  columns  or  rows  by

checking/unchecking the "columns" option.

Detail applications "list of complaint analysis“

The list of complaint analysis shows the complaints including referenced data that have been filtered on

the basis of the used selection criteria. Normally, the referenced data correspond to the field list for the

pivot analysis.

REK-MRM_81.docx

Version: 1.0.2413

Page 26 of 27

Complaint Management Monitoring

REK-MRM_81.docx

Version: 1.0.2413

Page 27 of 27

