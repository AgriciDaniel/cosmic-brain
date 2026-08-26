Complaint Management

1  Complaint Management

Overview

Menu

Quality management  Complaint management  Complaint management

Transaction code

cm

Function authorization

cm

Available user fields

Where?

Object type/user field key

Source (type)

Complaint header::
Table and detail view

Complaint detail:
Table and detail view

CREKAUFT/REK

CREKDET/REK

QM

QM

Inspection points

CPANUMP/

PPUNKT

How to configure user fields?

Which user field types are available?

MOC_ComplaintManagement.docx

Version: 1.6.18468

Page 1 of 21

Complaint Management

Purpose

You  can  use  this  function  to  create  complaints  of  different  types.  By  default,  the  types  “customer

complaint”, “supplier complaint” and “internal complaint” are provided. The complaint header should only

include  data  that  is  not  directly  related  to  the  item  complained  about.  Details  relating  to  the  article/item

must be defined in the lower-level complaint details.

Integration

This application provides data for the following reports/evaluations:

  Failure analysis of complaints

  Complaint analysis

  Analysis of complaint costs and

  Measure tracking

  Check for existing complaints when operations are logged on to the AIP (as of SP13)

When you log on operations on the AIP, the system can check if complaints are available for the article to

be  produced  specified  in  the  order  header.  To  activate  this  function,  manually  create  the  CAQ  option

1219. The option 1219 defines the complaint types, complaint results and complaint statuses, which are

MOC_ComplaintManagement.docx

Version: 1.6.18468

Page 2 of 21

Complaint Management

checked.  In  the  option,  you  also  define  the  period  of  time  that  is  checked.  For  details,  refer  to  the

procedure document of the option documentation "Configuration_QM_Options".

When creating this option with the value "Y", the system uses the configuration parameters in the Addition

field  during  OP  logon  to  check  for  existing  complaints  on  the  article  or  article  +  article  index  of  the

production order (order header). If complaints are found, then they are displayed in a message.

Different master data is used when a complaint is created, e.g.





customers in case of a customer complaint,

failures with the failure analysis,

  measures when defining measures,





costs when costs are recorded and

inspection requirements when a referenced inspection step is assigned.

Requirements

To  create  complaints,  the  relevant  master  data  must  be  available.  The  intended  use  specifies  which

master data you must edit. As a general rule, you have to maintain the following master data:

  Articles,

  Failures,

  Measures,

  Costs,

  Companies,

  Departments and

  Persons

Selection criteria

Below, find a description of the selection criteria that are not self-explanatory.

Complaint tab

Complaint

Here, you can filter by the complaint number assigned manually or automatically.

Ext. complaint number

If  the  customer/supplier  uses  another  complaint  number  than  the  number  that  is  created  for  this

complaint, it is specified in the "Ext. complaint number" field. This field may be filtered.

Complaining party tab

MOC_ComplaintManagement.docx

Version: 1.6.18468

Page 3 of 21

Complaint Management

Complaining party type

The types "supplier", "customer", "department" and "person" are available. Subject to the selected

type, an entry may be selected in the "complaining party" field.

Complaining party

You can filter by the contents of the party in charge list. In the master data, you specify the entries

that are included in the list of parties in charge.

Designation

You can filter by the content of the field Name 1 of the party in charge list. This is the department

name  with  departments,  the  last  name  with  external  persons  and  the  company  name  with

companies.

Contact person tab

Contact person type

Different  types  are  available.  Depending  on  the  selected  type,  you  can  select  an  entry  in  field

"Contact person".

Contact person

You can filter by the contents of the party in charge list. In the master data, you specify the entries

that are included in the list of parties in charge.

Designation

You can filter by the content of the field Name 1 of the party in charge list. This is the department

name  with  departments,  the  last  name  with  external  persons  and  the  company  name  with

companies.

Tab Party in charge

Party in charge type

Different types are available. Depending on the selected type, you can select an entry in field "Party

in charge type".

Party in charge type

You can filter by the contents of the party in charge list. In the master data, you specify the entries

that are included in the list of parties in charge.

Designation

You can filter by the content of the field Name 1 of the party in charge list. This is the department

name  with  departments,  the  last  name  with  external  persons  and  the  company  name  with

companies.

MOC_ComplaintManagement.docx

Version: 1.6.18468

Page 4 of 21

Complaint Management

Field descriptions

Complaint tab

Area

Selection list of the configured areas

Complaint

If  you  do  not  manually  assign  a  complaint  number,  HYDRA  automatically  assigns  a  complaint

number after saving. The combination of area and complaint number is unambiguous.

Complaint type

Customer complaint, supplier complaint or internal complaint.

Ext. complaint number

If  the  customer/supplier  uses  another  complaint  number  than  the  number  that  is  created  for  this

complaint, it will be defined in the "ext. complaint number" field.

Received by

When the complaint is saved, the logged on user is entered here.

Date of receipt / time

The current system date/time is entered here when the complaint is saved.

Status

List of configured complaint statuses

Result

List of configured complaint results

Target date, time

Information field if you want to specify a date/time for the settlement of the complaint.

Actual date/time

If  required,  you  can  document  a  date/time  when  the  complaint  is  regarded  as  "settled".  No

validation check is performed that checks the status currently set.

MOC_ComplaintManagement.docx

Version: 1.6.18468

Page 5 of 21

Complaining party type

Different  types  are  available.  No  validation  check  is  performed  that  checks  the  complaint  type.  In

case  of  a  customer  complaint,  enter  the  type  "customer".  The  customer  can  then  be  entered  as

Complaint Management

complaining party.

Complaining party

You can filter by the contents of the party in charge list. In the master data, you specify the entries

that are included in the list of parties in charge. The selected entry is used as the complaining party.

Complaining party name 1, name 2, name 3

The contents of the fields name 1, name 2 and name 3 of the complaining party are shown. With

customers, the fields display the customer name and the contents of address fields 1 and 2.  With

external persons, the fields display the last name, first name and initials.

Contact person type

Different types are available.

Contact person

The  list  of  responsible  parties  is  displayed.  In  the  master  data,  you  specify  the  entries  that  are

included in the list of parties in charge. The selected entry is used as the contact person.

Contact name 1, name 2, name 3

The contents of the fields name 1, name 2 and name 3 of the contact are shown. With customers,

the  fields  display  the  customer  name  and  the  contents  of  address  fields  1  and  2.  With  external

persons, the fields display the last name, first name and initials.

Party in charge type

Different  types  are  available.  This  field  does  not  have  a  special  function,  i.e.  according  to  the

context you must decide who is entered as party in charge. Normally, the person selected here is

generally responsible for the entire complaint. However, this is not a monitored function.

Party in charge

The  list  of  responsible  parties  is  displayed.  In  the  master  data,  you  specify  the  entries  that  are

included in the list of parties in charge. The selected entry is used as the party in charge.

Party in charge name 1, name 2, name 3

Displays  the  contents  of  the  fields  Name  1,  Name  2  and  Name  3  of  the  party  in  charge.  With

customers, the fields display the customer name and the contents of address fields 1 and 2. With

external persons, the fields display the last name, first name and initials.

MOC_ComplaintManagement.docx

Version: 1.6.18468

Page 6 of 21

Complaint Management

Additional data tab

Cost center

Information field to specify a cost center

Delivery note

Information field to state a delivery note number. No validation check is performed that checks the

previously selected complaint type (e.g. supplier evaluation).

Delivery date

Information  field  to  state  a  delivery  date.  No  validation  check  is  performed  that  checks  the

previously selected complaint type (e.g. supplier evaluation).

Storage location

Information field to specify a storage location.

Toolbar

 Copy a complaint header

Function authorization: cm.copy

Use the copy function to open the selected complaint and to change the key fields. But only the

complaint header is copied upon saving. The complaint details (i.e. documents, measures, costs

and failure analyses) that might be included in the "copy template" are not copied.

 Referencing complaints

Function authorization: none

To refer to other complaints (e.g. did a supplier complaint result from a customer complaint), a

list/application is opened that shows complaints that have already been assigned or that can be

used to create a reference to a complaint.

 Calling the workflow history

Function authorization: none

MOC_ComplaintManagement.docx

Version: 1.6.18468

Page 7 of 21

Opens the graphic view of the workflow that is referenced in the complaint header. The graphic

shows the current processing status. In addition to the graphic, a list shows every action included in

Complaint Management

the workflow.

Detail application Assignment

Function authorization

distrib

Use this detail application to create relations between different complaints. Example: If you find out that a

failure  is  caused  by  a  supplier  when  treating  a  customer  complaint  and  you  then  create  a  supplier

complaint, then you can assign the triggering customer complaint to this supplier complaint.

For  the  assignment,  select  the  area  of  the  complaint  and  then  open  the  complaint  list  to  assign  the

required complaint.

Field descriptions

The fields are not described because they are self-explanatory.

Detail appliction  Complaint detail

Function authorization

cmd

MOC_ComplaintManagement.docx

Version: 1.6.18468

Page 8 of 21

Complaint Management

Store all pieces of information that are directly connected to the article/material complained about in the

complaint details because the article you complain about is assigned here.

This  enables  you  to  record  "collective  complaints".  Consequently,  you  can  complain  about  different

items/articles using one complaint number. You can create and separately analyze a complaint detail for

each  article/item  complained  about.  You  can  also  create  several  complaint  details  for  one  article/item.

This  is  required,  for  example,  if  different  batches,  etc.  are  complained  about  and  need  to  be  analyzed

separately.

The  field  "complaint"  is  assigned  to  the  complaint  number  of  the  currently  selected  complaint,  when

editing  or  creating  new  complaint  details.  The  numeric  value  of  the  "detail"  field  is  generated

automatically, once this new data record has been saved and cannot be changed anymore.

Field descriptions

Tab Details

Complaint

Shows the complaint number of the higher-level complaint.

Detail no.

If  you  edit the complaint, this field shows the complaint detail number. This field is empty  when a

new data record is created. A complaint detail number is automatically assigned upon saving. This

number is unique for this complaint.

MOC_ComplaintManagement.docx

Version: 1.6.18468

Page 9 of 21

Complaint Management

Article number, article designation, drawing issue number

To enter the article complained about, you can open the selection list of the article master data and

select  the  relevant  article.  The  article  designation  is  displayed  in  the  complaint  details.  You  need

not  select  the  article  using  the  master  data,  you  can  also  enter  the  article  and  drawing  issue

number  directly.  In  this  case,  the  article  designation  is  identified  and  displayed  using  the  master

data catalog when the complaint detail is saved.

Supplier no.

Direct  input  of  the  supplier  number  or  selection  via  supplier  catalog.  The  supplier  name  is  then

displayed after saving.

Purchase order number

Information  field  to  enter  a  purchase  order  number.  This  field  input  does  not  depend  on  the

selected complaint type.

Serial number

Information field to enter a serial number.

ERP batch

Information field to enter an ERP batch.

Status

Selection/display of the complaint detail status

Result

Selection/display of the result of the complaint detail

Party in charge type

For the input, different types are available. This field does not have a special function, i.e. according

to the context you must decide who is entered as party in charge. Usually, the person selected here

is  responsible  for  the  detailed  processing  of  the  complaint,  i.e.  provide  information  on  the  article

complained about. However, this is not a monitored function.

Party in charge

Displays the list of parties in charge or the assigned party in charge. In the master data, you specify

the entries that are included in the list of parties in charge. The selected entry is used as the party

in charge.

MOC_ComplaintManagement.docx

Version: 1.6.18468

Page 10 of 21

Complaint Management

Party in charge name 1, name 2, name 3

Displays  the  contents  of  the  fields  Name  1,  Name  2  and  Name  3  of  the  party  in  charge.  With

customers, the fields display the customer name and the contents of address fields 1 and 2. With

external persons, the fields display the last name, first name and initials.

Team

Input or selection of a team. Teams are defined in the master data. After saving, the name and the

team number are displayed.

Additional data tab

Delivery value

Information field to enter/display a delivery value. This field is available for all complaint types.

Complaint value

Information field to enter/display the complaint value.

Delivery quantity

Information field to enter/display a delivery quantity. This field is available for all complaint types.

Complaint quantity

Information field to enter/display the quantity of the complaint.

Complaint share

Information  field  to  enter/display  the  proportion  complained  about.  The  content  of  this  field  is  not

calculated automatically.

Checked quantity

Information  field  to  enter/display  the  quantity  checked.  The  customer  must  decide  whether  this

refers to the quantity checked by the customer or by the complaining party.

Share of defects

Information field to enter/display the faulty quantity. The customer has to decide whether this refers

to the defective quantity identified by the customer or by the complaining party.

Percentage of defects

Information  field  to  enter/display  the  share  of  defects.  The  content  of  this  field  is  not  calculated

automatically.

Insp. requirem. 1

Displays  the  assigned  inspection  requirement  or  provides  the  option  to  select  an  inspection

requirement  from  the  list  of  inspection  requirements.  The  selection  list  provides  all  inspection

MOC_ComplaintManagement.docx

Version: 1.6.18468

Page 11 of 21

requirements from all sectors. When the inspection requirement is selected, this field displays the

inspection requirement number. The relevant sector is also displayed, e.g. "E" for goods receipt or

Complaint Management

"F" for production.

Insp. requirem. 2

Displays the second inspection requirement assigned or provides the option to select an inspection

requirement  from  the  list  of  inspection  requirements.  The  selection  list  provides  all  inspection

requirements from all sectors. When the inspection requirement is selected, this field displays the

inspection requirement number. The relevant sector is also displayed, e.g. "E" for goods receipt or

"F" for production.

Toolbar

  Copy

If  you  click  this  button,  the  selected  complaint  detail  is  copied  and  saved  with  a  new  complaint  detail

number. The copied complaint detail includes the assigned failure types, all assigned failure information

(failure  location,  failure  cause,  documents,  characteristics,  etc.).  You  can  use  the  standard  editing

functions to make the required changes in the copy.

Measures, costs and documents assigned to the source complaint detail are not copied.

The

function

to

copy

complaint  details

is  only  available,

if

the  extension

CopyComplaintMangament is activated.

 Calling the workflow history

Function authorization: none

Opens the graphic view of the referenced workflow for the complaint detail. The graphic shows the

current  processing  status.  In  addition  to  the  graphic,  a  list  shows  every  action  included  in  the

workflow.

Detail application Measures in the complaint header and complaint details

and in the failure analysis

Function authorization

cmme for measures in the complaint header

MOC_ComplaintManagement.docx

Version: 1.6.18468

Page 12 of 21

cmdme for measures in the complaint detail

cmdfa for measures in the failure analysis

Complaint Management

A  list  of  assigned  measures  is  available  for  each  selected  complaint  or  complaint  detail.  You  can  add

further measures or change, complement or delete existing measures at any time. The measures created

here are also displayed in the application Measure tracking where the measures can be centrally edited.

When you create a new data record, you must enter a "measure". Only then, the data is saved. Next to

the field Measure, you can open the "Measures" master data catalog, select a measure and assign it. You

need not select an entry, direct input is also possible.

The statuses "pending", "read", "in process" and "finished" are available by default. For the measure type,

you can select  "no  assignment" or "short-term", "medium-term" and  "long-term". These statuses can  be

extended via system customization according to the customer's requirements.

MOC_ComplaintManagement.docx

Version: 1.6.18468

Page 13 of 21

Complaint Management

Subject to the Party in charge type selected, you can use the selection function to open the pre-filtered list

of parties in charge. The list only shows entries that are assigned to the option "responsible" in the master

data.  The  types  that  you  can  select  in  the  list  are  the  same  than  the  types  described  for  the  complaint

header.

It is important to specify a target date. The target date can be used in the  Measure tracking to filter the

data.

Use the fields Fulfillment and Effectiveness to finally assess the defined measure.

Field descriptions

Measures tab

Measure type

Display  or  selection  of  the  available  measure  types.  The  following  types  are  available  by  default:

"short-term", "medium-term", "long-term" and "no assignment".

Measure

Display of the measure number or selection or direct input of a measure number. Open the relevant

master data catalog to select an entry.

Measure name

The name of the assigned measure number is displayed. If the measure number is directly entered,

the name is only shown upon saving.

Text

Free text field to enter an additional measure text.

Comment

Free text field to enter an additional comment for the measure.

Detail tab

Status

Display  or  selection  of  the  available  measure  types.  The  types  "in  process",  "read",  "done"  and

"pending" are provided by default.

Fulfillment [%]

Fulfillment in % can be displayed or entered.

Effectiveness [%]

Effectiveness in % can be displayed or entered.

MOC_ComplaintManagement.docx

Version: 1.6.18468

Page 14 of 21

External

This  field  can  be  used  in  the  future  to  control  the  printout  of  forms.  However,  this  field  does  not

Complaint Management

have a special function.

Party in charge type

For  the  input,  different  types  are  available.  The  type  External  person  is  usually  entered  here

because persons are normally responsible for the processing of measures.

Party in charge

Displays the party in charge or you can select the party in charge from the list. In the master data,

you specify the entries that are included in the list of parties in charge. The selected entry is used

as the party in charge.

Party in charge name 1, name 2, name 3

Displays  the  contents  of  the  fields  Name  1,  Name  2  and  Name  3  of  the  party  in  charge.  With

customers, the fields display the customer name and the contents of address fields 1 and 2. With

external persons, the fields display the last name, first name and initials.

Target date/time

Display or entry of a date and optionally a time specifying when the measure must be completed. It

is not automatically monitored whether or not this time limit is respected. In the application Measure

tracking,  the  content  of  this  field  is  used  for  an  important  function  because  you  can  manually

identify for all measures which measures have exceeded the target date, for example.

Actual date/time

You can display or enter a date and optionally a time by which the measure was finished. However,

this  field  does  not  have  a  special  function.  In  the  application  Measure  tracking,  you  can  use  the

content of this field to manually identify measures that have been completed with delay.

Detail application Costs in the complaint header and complaint detail

Function authorization

cmco for the costs in the complaint header

cmdco for the costs in the complaint detail

MOC_ComplaintManagement.docx

Version: 1.6.18468

Page 15 of 21

Complaint Management

The  list  of  assigned  costs  is  available  for  each  selected  complaint  or  complaint  detail.  You  can  add

additional costs or change/delete existing costs at any time. You can evaluate the costs specified here in

the report Analysis of complaint costs.

If you create a new data record, you must enter a Cost type. Only then, you can save the costs. Next to

the field Cost number, you can open the master data catalog Cost types where you can select and assign

a cost type. You need not select an entry, direct input is also possible.

If you assign an initial duration ("init duration" field) and an amount ("cost rate amount" field) to the cost

type in the cost types catalog, then in the Complaint costs dialog the field Duration is assigned the value

from  "init  duration"  and  the  field  Amount  is  assigned  the  product  from  "init  duration"  and  "cost  rate

amount".  If  you  create  new  costs  and  the  field  Duration  is  changed  or  taken  over  unchanged,  then  the

field Amount is automatically recalculated after saving. The Amount is only calculated once when a new

data record is created. If the data record is changed after the initial creation, then the fields Duration and

Amount must be changed manually, because they are not automatically recalculated.

Field descriptions

Costs tab

Cost no.

Display  of  the  cost  number  or  selection  or  direct  input  of  a  cost  type  number.  Open  the  relevant

master data catalog to select an entry.

Cost des.

The  name  of  the  assigned  cost  number  is  shown.  If  the  cost  number  is  directly  entered  the

designation is only displayed after saving.

Duration

The duration is entered or displayed in format "hh:mm:ss". When you transfer a cost type from the

master data, this field is initially populated using the content of the field "init. duration" of the master

data.

MOC_ComplaintManagement.docx

Version: 1.6.18468

Page 16 of 21

Complaint Management

Amount

The  (calculated)  amount  is  entered  or  displayed.  When  you  transfer  a  cost  type  from  the  master

data, this field is initially populated using the content of the field "init. amount". When you create a

new  data  record,  the  value  of  this  field  is  calculated  after  saving  by  multiplying  the  field  content

Duration and the original content of this field.

Detail application Documents in the complaint header and complaint

details and in the failure analysis

Function authorization

cm for documents in the complaint header

cmd for documents in the complaint details

cmdfa for documents in the failure analysis

If the tab Documents is activated,  you can assign any  number of documents to each complaint header,

complaint detail and failure analysis. If you activate this tab, the toolbar provides the relevant buttons to

edit documents. The Documents tab shows a list of already assigned documents.

You  can  use  all  formats  registered  by  Windows  when  you  assign  documents.  You  can  assign  simple

documents  (e.g.  written  in  Word),  drawings  of  any  format  and  videos.  To  display  the  format  used,  the

MOC_ComplaintManagement.docx

Version: 1.6.18468

Page 17 of 21

Complaint Management

relevant program must be installed. To open the documents, the program linked in Windows to the format

is used.

The  file  types  "File",  "URL",  and  "Text"  are  available.  If  you  select  the  type  "file",  you  can  enter  the  file

name including path manually. Select the file type “URL” to access the internet or intranet. Select the file

type "text" to directly enter a text.

You  can  assign  a  designation/name  to  each  document.  Once  saved,  a  consecutive  item  number

(numeric)  is  automatically  assigned  to  each  document  entry.  Additional  feature:  If  you  enable  the

checkbox  External,  the  document  can  also  be  used  in  an  8D  report  of  the  Failure  analysis.  You  then

specify in the 8D report whether or not this field is used as filter.

Toolbar

In addition to the standard functions, the application also provides the button to show documents.

 Show documents

If a document link is stored, click this button to open and show the linked document. Condition: a

program, which can show the linked file type, must be installed on the PC. To call the documents,

you must make a relevant HYDRA path configuration.

Detail applicaiton Failure type (failure analysis)

Function authorization

cmdfa for failure types in the failure analysis

You  can  assign  any  number  of  failure  types  to  each  complaint  detail.  To  print  out  an  8D  report,  it  is

mandatory  to  have  a  failure  type  assigned.  To  assign  a  failure  type,  you  must  open  the  list  of  failure

types. When you create a new data record, you can directly enter the required failure type or select the

MOC_ComplaintManagement.docx

Version: 1.6.18468

Page 18 of 21

failure  type  from  the master  data  catalog.  If  the  failure  number  is  entered  directly,  the  relevant  name  is

Complaint Management

shown after saving.

You can also add a comment.

The specified weighting affects the failure analysis of the complaint management. If the error occurs 10

times, i.e. 10 items are defective, the relevant value should be entered here.

Toolbar

In addition to the standard functions, the function to print forms (8D report) is available.

 Print form

Function authorization: cmdfa.print

This  function  opens  the  detail  application  Print  form.  Here,  the  print  of  the  8D  report  is  triggered.

The  8D  report  only  includes  contents  that  reference  the  selected  failure  type;  the  External  option

must be enabled for the contents.

Print detail application

Function authorization

cmdfa.print for printing the failure analysis (8D report)

The print dialog of the failure type opens a list of available reports. By default, printing is restricted to the

8D report. These are Word forms. The web services that are available in the respective context specify

the  potential  content  of  these  forms.  In  the master  data  of  the  quality  management,  you  can  define  the

form entries, i.e. the contents of the form list of the print dialog. Here, you can also specify the basics for

new  forms  and  the  form  properties.  You  require  a  license  in  order  to  change  the  forms  with  respect  to

content and design.

Print toolbar

There are no other special function buttons in addition to the standard functions/features.

Detail applications Failure location, Failure cause, Originator for the failure

type

Function authorization

cmdfa for failure locations, failure causes, origins in the failure analysis

MOC_ComplaintManagement.docx

Version: 1.6.18468

Page 19 of 21

You can  assign any  number of failure  locations, failure causes and origins to  each failure type.  Several

tabs are displayed.

Complaint Management

Select a failure type, then assign the contents. Subject to the tab selected, the toolbar provides the option

to create a relevant entry.

To create an entry, follow the steps described in the detail application Failure type (Failure analysis).

Note: only if the option External is checked, the respective data is included in the 8D report.

Detail application Measures for the Failure type

Function authorization

cmdfa for measures in the failure analysis

You can assign any number of measures to each failure type.

Select a failure type, then assign the contents.

To  create  a  measure,  follow  the  steps  described  in  the  detail  application  Measures  in  the  complaint

header and complaint details and in the failure analysis.

Note: only if the option External is checked, the respective data is included in the 8D report.

Detail application Documents for the Failure type

Function authorization

cmdfa for measures in the failure analysis

You can assign any number of documents to each failure type.

Select a failure type, then assign the contents.

To  create  a  document,  follow  the  steps  described  in  the  detail  application  Measures  in  the  complaint

header and complaint details and in the failure analysis. You can additionally add an assignment category

MOC_ComplaintManagement.docx

Version: 1.6.18468

Page 20 of 21

here.  This  is  important  to  the  8D  report.  By  default,  the  categories  "comment",  "forecast",  "control  of

success" and "no assignment" are available.

Note: only if the option External is checked, the respective data is included in the 8D report.

Complaint Management

MOC_ComplaintManagement.docx

Version: 1.6.18468

Page 21 of 21

