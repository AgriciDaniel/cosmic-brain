Manual

Production Control Plan
FEP-PLP 8.1

Version 1.0.1374

Last changed on: 19.06.2020

Production Control Plan

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

FEP-PLP_81.docx

Version: 1.0.4586

Page 2 of 12

Production Control Plan

Contents

1  Control Plan Overview ................................................................................. 4

2  Control Plan ................................................................................................. 5

FEP-PLP_81.docx

Version: 1.0.4586

Page 3 of 12

Production Control Plan

1

 Control Plan Overview

Possible fields of application

The  HYDRA  control  plan  defines  the  basis  for  the  creation  of  printable  reports  in  compliance  with

QS9000. The inspection plans that have already been created in the other areas represent the basis for

this.

Implementation notes

You use the control plan function if a corresponding report needs to be created or you would like to use

control plans as a means of presenting inspection processes in a clear overview.

Integration

The  production  control  plan  requires  inspection  plans  to  have  been  created  in  the  respectively  relevant

HYDRA areas, e.g.

  goods receipt,

  production and

  goods issue

Functions

  Editing  function  to  enter  and  edit  relevant  master  data  (article,  companies,  parties  responsible,

etc.)

  Editing  function  for  the  creation  and  modification  of  control  plans  including,  as  far  as  possible,

automatic  creation  by  assigning  existing  inspection  plans  from  goods  receipt,  production  and

goods issue.

  Management of different control plan versions including history management

  Definition of different release notes

  MS  Word  control  plan  based  on  QS  9000  including  the  option  of  changing  terms  or  creating

individual Word forms, provided that the license for the creation and management of Word forms

(FEP-EVF) has been purchased.

FEP-PLP_81.docx

Version: 1.0.4586

Page 4 of 12

Production Control Plan

2  Control Plan

Summary

Menu

Quality management  Production control plan  Control plan

Transaction code

Function authorization

cp

cp

Usage

This function enables the creation of control plans and printing of the form based on QS9000.

Prerequisite

Relevant master data need to be edited/maintained to be able to create complaints. Which master data

have to be maintained depends on the respective field of application. Normally, the master data

  Articles

  Teams (=distribution list)

  Companies

  Parties responsible

FEP-PLP_81.docx

Version: 1.0.4586

Page 5 of 12

Production Control Plan



Inspection plans

have to be maintained first.

Field descriptions

"Production control plan" tab

Area, production control plan, index

The  "area",  "control  plan"  and  "index"  uniquely  identify  all  existing  production  control  plans.  The

area may be selected. The control plan and index may be entered using alphanumeric characters.

All three fields are mandatory fields.

The input of these three pieces of information must be unique, i.e. no other control plan may exist

that already includes this information. By assigning a structured control plan number, it is possible

to provide specific information. This information might be useful later during sorting.

Article, article designation, drawing issue number, drawing number

Input  of  the  article  number.  If  it  is  known  it  can  be  entered  directly.  Otherwise,  the  article  catalog

can  be  opened  and  the  provided  filter  and  sort  criteria may  be  used  to  identify  and  take  over  the

required article. Once an article has been chosen from the master data record, the drawing issue

number, article designation and drawing number are taken over and displayed in the relevant fields.

Active

Shows whether or not a control plan is active.

Valid from, valid to

If required, a validity period may be entered here, instead of the "unrestricted" activation (using the

toolbar). Yet activation for a certain period means that the user has no clear overview of currently

valid  control  plans,  and  it  is  therefore  recommended  to  use  the  "global/unrestricted"  activation

option using the toolbar. If activated by toolbar functions, the system carefully monitors whether an

active  control  plan  already  exists  for  the  specified  article  and  it  also  includes  the  same  drawing

issue  number.  If  this  is  indeed  the  case,  the  previously  active  control  plan  will  automatically  be

disabled.

Team, Team name

Entry  of  a  distribution  list/distributor.  If  it  is  known  it  can  be  entered  directly.  Otherwise,  the

distributor  catalog  can  be  opened  and  the  provided  filter  and  sort  criteria  may  be  used  to  identify

and take over the required distributor. By selecting a distribution list, the distributor and distributor

name are taken over from the master data record and displayed in the relevant fields.

FEP-PLP_81.docx

Version: 1.0.4586

Page 6 of 12

Production Control Plan

"Companies" tab

Customer, customer name, customer address 1-3

Entry of a customer. If it is known it can be entered directly. Otherwise, the customer catalog can be

opened and the provided filter and sort criteria may be used to identify and  take over the required

customer. By selecting a relevant customer, the customer, customer name and the address fields

1-3 are taken over from the master data record and displayed in the corresponding fields.

Manufacturer, manufacturer name, manufacturer address 1-3

Entry  of  a  manufacturer.  If  it  is  known  it  can  be  entered  directly.  Otherwise,  the  manufacturer

catalog  can  be  opened  and  the  provided  filter  and  sort  criteria  may  be  used  to  identify  and  take

over  the  required  manufacturer.  By  selecting  a  relevant  manufacturer,  the  manufacturer,

manufacturer  name  and  the  address  fields  1-3  are  taken  over  from  the  master  data  record  and

displayed in the corresponding fields.

Supplier, supplier name, supplier address 1-3

Entry of a supplier. If it is known it can be entered directly. Otherwise, the supplier catalog can be

opened and the provided filter and sort criteria may be used to identify and take over the required

supplier. By selecting a relevant supplier, the supplier, supplier name and the address fields 1-3 are

taken over from the master data record and displayed in the corresponding fields.

Toolbar

 Activate

Function authorization: cp.activate

The control plan is assigned the status "active“.

 Deactivate

Function authorization: cp.deactivate

The control plan is assigned the status "released“. Once a new control plan has been created, it

has the status "in process". If the control plan is enabled and disabled afterwards, it will be

assigned the status "released" to show that this control plan has been active before.

 Show documents

Function authorization: cp.print

This  function  opens  the  detail  application  "printing",  which  in  this  case  enables  printing  of  the

controlplan report.

FEP-PLP_81.docx

Version: 1.0.4586

Page 7 of 12

Production Control Plan

Detail application "team members"

This  dialog  shows  the  distribution  list  entries  of  the  distribution  list  assigned  to  the  control  plan  in  table

form.

Detail application "documents"

Function authorization  Cp.view

Provided that the "documents" tab has been activated, as many documents as required may be assigned

to  each  control  plan.  By  enabling  these  tabs,  the  toolbar  provides  corresponding  buttons  to  edit  the

documents. The documents that have already been assigned can be viewed in a list in the mentioned tab.

All  formats  registered  by  Windows  are  available,  when  documents  are  assigned.  Consequently,  simple

documents  (e.g.  written  in  Word),  drawings  of  any  format  and  videos  may  be  assigned.  However,  the

corresponding programs that are able to display the required formats have to be installed. In this context,

the documents are opened by the program that has been linked in Windows.

The  file  types  "FILE",  "URL"  and  "Text"  are  provided.  The  file  name  including  path  may  be  entered

manually  with  the  "file"  type.  The  "URL"  file  type  allows  access  to  the  Internet  or  Intranet.  The  third  file

type "Text" allows for text to be entered directly.

A designation may be assigned to each defined document.

Toolbar

In addition to the standard functions, there is also a button to show the documents.

FEP-PLP_81.docx

Version: 1.0.4586

Page 8 of 12

Production Control Plan

 Show documents

If  a  document  link  is  defined  this  button  opens  and  shows  this  document.  However,  a  program,

which can show the linked file type, has to be installed on the PC. To open the documents, paths

need to be configured in HYDRA.

Detail application "releases"

Control plans may be released.

Field descriptions

Party in charge type, released by, release name 1-3, phone, fax, e-mail, mobile

Input  of  the  party  responsible.  If  it  is  known  it  can  be  entered  directly  and  the  relevant  party  in

charge  type  can  be  chosen  using  the  selection  list.  Otherwise,  the  catalog  of  responsible  parties

can  be  opened  and  the  provided  filter  and  sort  criteria may  be  used  to  identify  and  take  over  the

required party responsible. By selecting a party responsible, the party responsible, release names

1-3,  phone  number,  fax  number,  e-mail  address  and  the  mobile  number  are  taken  over  from  the

master data record and displayed in the relevant fields.

Released on

Date of the release.

FEP-PLP_81.docx

Version: 1.0.4586

Page 9 of 12

Production Control Plan

List position

Category of the different releases.

Detail application "inspection plan"

Function authorization

cppl

If the detail application "inspection plans" is selected, all inspection plans pertaining to the control plan will

be displayed.

An inspection plan can be selected using the search function (button showing the magnifying glasses). All

areas are available.

The entry in the "position" field specifies where in the control plan the inspection plan is indicated.

Field descriptions

"Inspection plan" tab

Inspection plan, inspection plan index

Entry of the inspection plan. The inspection plan needs to be entered by using the search function

(magnifying glasses), as in this case the area is also taken over. By selecting an inspection plan,

the inspection plan, inspection plan index, article number, article name, drawing issue number, and

the drawing number are taken over from the master data record of inspection plans and displayed

in the relevant fields.

Article, article designation, drawing issue number, drawing number

Input  of  the  article  number.  If  it  is  known  it  can  be  entered  directly.  Otherwise,  the  article  catalog

can  be  opened  and  the  provided  filter  and  sort  criteria may  be  used  to  identify  and  take  over  the

required  article.  Once  an  article  has  been  chosen,  the  drawing  issue  number,  article  designation

and  drawing  number  are  taken  over  from  the  master  data  record  and  displayed  in  the  relevant

fields.

Position

The entry in the "position" field specifies where in the control plan the inspection plan is indicated.

FEP-PLP_81.docx

Version: 1.0.4586

Page 10 of 12

Production Control Plan

Operation, operation designation

Entry of the operation and operation designation.

Machine, machine name

Entry of the machine number and display of the machine designation.

"Companies" tab

Customer, customer name, customer address 1-3

Entry of a customer. If it is known it can be entered directly. Otherwise, the customer catalog can be

opened and the provided filter and sort criteria may be used to identify and take over the required

customer. By selecting a relevant customer, the customer, customer name and address fields 1-3

are taken over from the master data record and displayed in the corresponding fields.

Manufacturer, manufacturer name, manufacturer address 1-3

Entry  of  a  manufacturer.  If  it  is  known  it  can  be  entered  directly.  Otherwise,  the  manufacturer

catalog  can  be  opened  and  the  provided  filter  and  sort  criteria  may  be  used  to  identify  and  take

over  the  required  manufacturer.  By  selecting  a  relevant  manufacturer,  the  manufacturer,

manufacturer  name  and  the  address  fields  1-3  are  taken  over  from  the  master  data  record  of

manufacturers and displayed in the corresponding fields.

Supplier, supplier name, supplier address 1-3

Entry of a supplier. If it is known it can be entered directly. Otherwise, the supplier catalog can be

opened and the provided filter and sort criteria may be used to identify and take over the required

supplier. By selecting a relevant supplier, the supplier, supplier name and the address fields 1-3 are

taken over from the master data record and displayed in the corresponding fields.

Toolbar

 Open inspection plan

The application "inspection planning" is opened and the selected inspection plan is displayed.

 Restore active references

Function authorization: cppl.reference

References  to  active  inspection  plans  are  restored,  i.e.  in  case  another  version  of  the  inspection

plan or inspection plans has been enabled in the meantime, this modification is now visible in the

control plan.

FEP-PLP_81.docx

Version: 1.0.4586

Page 11 of 12

However, this requires that exactly one version of the inspection is only enabled.

Production Control Plan

"Inspection plan characteristics" detail application

This application shows the inspection plan characteristics of the selected inspection plan in table form.

Field descriptions

The fields pertaining to inspection plan characteristics are described in the document dealing with

the application "inspection planning".

"Print" detail application

Function authorization

cp.print

The print dialog of the control plan opens a list of available reports. These are Word forms. The potential

content of these forms is determined by the Web services that are available in the respective context. The

form entries, i.e. the contents of the list of forms of the corresponding print dialog, are defined within the

master data of quality management. The basis for new forms and the corresponding form properties are

defined  there  as  well.  A  corresponding  license  is  required  to  be  able  to  change  the  forms  as  regards

content and design.

Print - toolbar

There are no other special function buttons in addition to the standard functions/features.

FEP-PLP_81.docx

Version: 1.0.4586

Page 12 of 12

