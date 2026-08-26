Production Control Plan

1  Production Control Plan

Overview

Menu

Quality management  Production control plan  Control plan

Transaction code

cpl

Function authorization

cp

Available user fields

Where

Object type/user field key

Source (type)

Inspection plan:
Table and detail view

Inspection plan
characteristics:
Table

Production: CPPL/FEP
Goods receipt: CPPL/WEP
Goods issue: CPPL/WAP
Initial sample: CPPL/EMU
Test equipment (gage) management:
CPPL/PMV

Production: CPPLMM/FEP
Goods receipt: CPPLMM/WEP
Goods issue: CPPLMM/WAP
Initial sample: CPPLMM/EMU
Test equipment (gage) management:

QM

QM

MOC_ControlPlan.docx

Version: 1.1.18468

Page 1 of 9

How to configure user fields?

Which user field types are available?

CPPLMM/PMV

Production Control Plan

Purpose

Use this function to create control plans and to print the form based on QS9000.

Requirements

You have to maintain specific master data in order to generate production control plans. The master data

you have to maintain depend on the intended use. As a general rule, you  have to maintain the following

master data:

  Article

  Teams (=distribution list/distributor)

  Companies

  Parties in charge



Inspection plans

Field descriptions

"Production control plan" tab

Area, production control plan, index

The area, production control plan  and  index uniquely identify all  existing production control  plans.

You can select the area. You can enter alphanumeric characters for the production control plan and

the index. All three fields are mandatory fields.

You  must  enter  unique  information  in  these  fields,  i.e.  no  other  production  control  plan  may  exist

that already includes this information. Assign a structured production control plan number in order

to provide specific information. This information might be useful for sorting.

Article, article designation, drawing issue number, drawing number

Enter  the  article  number.  If  you  know  the  article  number,  you  can  directly  enter  it.  If  not,  you  can

open  the  article  catalog  to  identify  and  enter  the  requested  article  using  the  given  filter  and  sort

criteria. Select an article to take over the drawing issue number, the article designation (name) and

the drawing number from the master data record. The system enters this data in the corresponding

fields.

MOC_ControlPlan.docx

Version: 1.1.18468

Page 2 of 9

Production Control Plan

Active

Shows whether or not a production control plan is active.

Valid from, valid to

If required,  you can enter a validity period, instead of the "global" activation using the toolbar. Yet

activation  for  a  certain  period  means  that  the  user  has  no  clear  overview  of  currently  valid

inspection  plans.  You  should  therefore  prefer  the  "global/unrestricted"  activation  option  using  the

toolbar. If activated by toolbar functions, the system carefully monitors whether an active production

control plan already exists for the specified article and the same drawing issue number. If this is the

case,  the  activation  of  a  production  control  plan  automatically  deactivates  the  previously  active

production control plan.

Team, Team designation

Enter a distribution list/distributor. If you know the  distribution list/distributor, you can directly enter

it.  Otherwise,  you  can  open  the  distributor  catalog  to  identify  and  enter  the  requested  distributor

using  the  given  filter  and  sort  criteria.  Select  a  distributor  to  take  over  the  distributor  and  the

distributor  name  from  the  master  data  record.  The  system  enters  this  data  in  the  corresponding

fields.

Companies tab

Customer, customer designation, customer address 1-3

Enter  a  customer.  If  you  know  the  customer,  you  can  directly  enter  it.  If  not,  you  can  open  the

customer catalog to identify and enter the requested customer using the given filter and sort criteria.

Select a customer to take over the customer, customer designation (name) and the address fields

1-3 from the master data record. The system enters this data in the corresponding fields.

Manufacturer, manufacturer designation, manufacturer address 1-3

Enter a manufacturer. If you know the manufacturer, you can directly enter it. Otherwise, you can

open  the  manufacturer  catalog  to  identify  and  enter  the  requested  manufacturer  using  the  given

filter  and  sort  criteria.  Select  a  manufacturer  to  take  over  the  manufacturer,  manufacturer

designation (name) and the address fields 1-3 from the master data record. The system enters this

data in the corresponding fields.

Supplier, supplier designation, supplier address 1-3

Enter a supplier. If you know the supplier, you can directly enter it. If not, you can open the supplier

catalog to identify and enter the requested supplier using the given filter and sort criteria. Select a

supplier to take over the supplier, supplier designation (name) and the address fields 1-3 from the

master data record. The system enters this data in the corresponding fields.

MOC_ControlPlan.docx

Version: 1.1.18468

Page 3 of 9

Production Control Plan

Toolbar

 Activate

Function authorization: none

The production control plan is assigned the status "active“.

 Deactivate

Function authorization: none

The production control plan is assigned the status "released“. Once you have created a new

production control plan, it has the status "in process". If you enable and then disable the production

control plan, the control plan receives the status "released" to indicate that this control plan had

been active before.

Team members detail application

This  detail  application  shows  the  distribution  list  entries  of  the  distributor  assigned  to  the  production

control plan (in a list).

Documents detail application

Function authorization

cp

If you activate the Documents tab, you can assign an arbitrary number of documents to each production

control  plan.  If  you  activate  this  tab,  the  toolbar  provides  the  corresponding  buttons  to  edit  documents.

The Documents tab shows already assigned documents in a list.

MOC_ControlPlan.docx

Version: 1.1.18468

Page 4 of 9

Production Control Plan

You can use  all formats registered  by Windows  when assigning the documents. You can assign simple

documents  (e.g.  written  in  Word),  drawings  of  any  format  and  videos.  You  only  have  to  make  sure  to

install  a  program  that  is  able  to  display  the  used  format.  The  appropriate  program  linked  in  Windows

opens the documents.

The  file  types  "File",  "URL",  and  "Text"  are  available.  If  you  select  the  type  "file",  you  can  enter  the  file

name including path manually. Select the file type “URL” to access the internet or intranet. Select the file

type "text" to directly enter a text.

You can assign a designation/name to each document.

Toolbar

In addition to the standard functions, the application also provides the button to show documents.

Show documents

If  a  document  link  is  stored,  click  this  button  to  open  and  show  the  linked  document.  However,  a

program, which can show the linked file type, must be installed on the PC. You have to configure

the paths in HYDRA to open the documents.

Releases detail application

Control plans may be released.

MOC_ControlPlan.docx

Version: 1.1.18468

Page 5 of 9

Production Control Plan

Field descriptions

Party in charge type, released by, release name 1-3, phone, fax, e-mail, mobile

Enter a party in charge. If you know the responsible party, you can directly enter it. You can use the

selection list to choose the relevant type. If not, you can open the catalog of responsible parties to

identify and enter the requested party in charge using the given filter and sort criteria. Select a party

in  charge  to  take  over  the  party  in  charge,  the  release  names  1-3,  the  phone  number,  the  fax

number, the e-mail address and the mobile number from the master data record. The system enters

this data in the corresponding fields.

Released on

Date of the release.

List position

Category of the different releases.

Inspection plan detail application

Function authorization

cppl

If you select the detail application Inspection plans, the application shows all inspection plans pertaining

to the production control plan.

You can choose from all inspection plans for all areas to assign inspection plans.

The  entry  in  the  Position  field  specifies  where  in  the  production  control  plan  the  inspection  plan  is

indicated.

Field descriptions

Inspection plan tab

Inspection plan, inspection plan index

Enter  the  inspection  plan.  You  have  to  use  the  search  function  (magnifying  glasses)  to  enter  the

inspection plan, as  in this  case the system also takes over  the area. Select an  inspection plan  to

take  over  the  inspection  plan,  inspection  plan  index,  article  number,  article  designation  (name),

drawing issue number and the drawing number from the inspection plan data record. The system

enters this data in the corresponding fields.

MOC_ControlPlan.docx

Version: 1.1.18468

Page 6 of 9

Production Control Plan

Article, article designation, drawing issue number, drawing number

Enter  the  article  number.  If  you  know  the  article  number,  you  can  directly  enter  it.  If  not,  you  can

open  the  article  catalog  to  identify  and  enter  the  requested  article  using  the  given  filter  and  sort

criteria. Select an article to take over the drawing issue number, the article designation (name) and

the drawing number from the master data record. The system enters this data in the corresponding

fields.

Position

The entry  in the  Position field specifies  where  in  the  production control plan the inspection plan is

indicated.

Operation, operation designation

Enter the operation and operation name.

Machine, machine designation

Enter the machine number and display the machine name.

Companies tab

Customer, customer designation, customer address 1-3

Enter  a  customer.  If  you  know  the  customer,  you  can  directly  enter  it.  If  not,  you  can  open  the

customer catalog to identify and enter the requested customer using the given filter and sort criteria.

Select a customer to take over the customer, customer designation (name) and the address fields

1-3 from the master data record. The system enters this data in the corresponding fields.

Manufacturer, manufacturer designation, manufacturer address 1-3

Enter a manufacturer. If you know the manufacturer, you can directly enter it. Otherwise, you can

open  the  manufacturer  catalog  to  identify  and  enter  the  requested  manufacturer  using  the  given

filter  and  sort  criteria.  Select  a  manufacturer  to  take  over  the  manufacturer,  manufacturer

designation (name) and the address fields 1-3 from the master data record. The system enters this

data in the corresponding fields.

Supplier, supplier designation, supplier address 1-3

Enter a supplier. If you know the supplier, you can directly enter it. If not, you can open the supplier

catalog to identify and enter the requested supplier using the given filter and sort criteria. Select a

supplier to take over the supplier, supplier designation (name) and the address fields 1-3 from the

master data record. The system enters this data in the corresponding fields.

MOC_ControlPlan.docx

Version: 1.1.18468

Page 7 of 9

Toolbar

Production Control Plan

Open inspection plan

The application "inspection planning" opens and the selected inspection plan is displayed.

 Restore active references

Function authorization: cppl.reference

Click  this  button  to  restore  the  references  to  active  inspection  plans.  The  production  control  plan

now  indicates  if  another  version  of  the  inspection  plan/inspection  plans  has  been  enabled  in  the

meantime.

However, this requires that exactly one version of the inspection plan is active at a time.

Inspection plan characteristics detail application

This application shows the inspection plan characteristics of the selected inspection plan in table form.

Field descriptions

The  document  dealing  with  the  application  "inspection  planning"  describes  the  fields  pertaining  to

the inspection plan characteristics.

Print detail application

Function authorization

cp.print

Use  the  print  dialog  of  the  production  control  plan  to  open  a  list  of  available  reports.  These  are  Word

forms. The web services that are available in the respective context specify the potential content of these

forms. In the master data of quality management, you can define the form entries, i.e. the contents of the

MOC_ControlPlan.docx

Version: 1.1.18468

Page 8 of 9

Production Control Plan

form list of the print dialog. Here, you can also specify the basics for new forms and the form properties.

You require a license in order to change the forms with respect to content and design.

Print toolbar

There are no other special function buttons in addition to the standard functions/features.

MOC_ControlPlan.docx

Version: 1.1.18468

Page 9 of 9

