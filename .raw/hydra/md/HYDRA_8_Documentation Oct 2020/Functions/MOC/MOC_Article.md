Article

1  Article

This document describes the “article” application of the Manufacturing Operation Center (MOC). General

information on how to use MOC can be found in the document entitled “moc_cc.pdf“.

The article catalog has been designed to edit/keep articles. Article data is a global catalog that is used in

many CAQ modules and in PDV (Process Data Collection). Provided that there is an interface to a higher-

level  system  (e.g.  ERP  system),  articles  may  be  created  automatically  via  this  interface.  As  soon  as  a

new article is created or changed, e.g. in the ERP system, the article data record is automatically created

or changed in the HYDRA-CAQ article catalog based on the defined information.

1.1  Function call

Menu

Master data  Quality management  Article

Master data  Process data processing  Article

Transaction code

atc

Function authorization

atc

Available user fields

Location

Object type/user field key

Source (type)

Table and detail view

ATK/SYSTEM

MF-D

How can I configure user fields?

Which user field types are available?

MOC_Article.docx

Version: 1.3.18468

Page 1 of 6

1.2  Default Application Layout

Article

1.3  Toolbar

The  toolbar  provides  the  different  functions  available  for  this  application  and  possibly  links  to  other

applications.  The  functions  included  in  the  “general”  tab  of  the  toolbar  are  available  in  all  detail

applications. In addition to the standard functions, such as help, request data, save application settings,

and print preview, the other tabs also include specific functions that are specially tailored to the respective

detail application. The following sections describe the individual application functions.

Category Data

Request data

The  information  to  be  displayed  within  the  application  is  requested  on  the  basis  of  the  entered

selection  criteria.  This  process  might  take  some  time  depending  on  the  dataset  from  which  the

system filters data and on the selection result to be transferred and displayed.

  Cancel

The query sent by clicking the “request data” button can be canceled using this function.

MOC_Article.docx

Version: 1.3.18468

Page 2 of 6

Article

 Print preview

The  print  preview  is  opened  for  the  selected  detail  application.  The  print  preview  also  includes

further options to change the resulting printout and functions for exporting the displayed information

into other formats, such as PDF, Excel, image files.

  Save

The  application  design  configured  by  the  user,  e.g.  columns  and  categories  displayed  as  well  as

their respective size and display locations, etc. are only saved if the user requests it. In this case,

the user has to affirm the confirmation prompt by clicking “Yes”.

Category Functions

   Add

Adds a new article.

  Copy

Copies the selected article.

   Edit

Edits an already existing article

   Delete

Deletes the selected or several selected articles.

Category Help

   Help on operation

Clicking  this  button  opens  the  help  file  describing  how  to  operate  MOC.  The  basic  document  is

entitled “moc_cc.pdf”. It describes how to use MOC in general and applies for all applications.

  Help on application

This  function  opens  the  manual  for  the  respective  application  from  which  the  help  file  was

requested.  The  application  manual  integrates  the  application  function  into  the  MES  context  and

explains the information to be displayed. The documentation also includes all detailed applications.

MOC_Article.docx

Version: 1.3.18468

Page 3 of 6

   Help on detail application

This function opens the application manual at the section where the relevant detailed application is

described.

Article

1.4  Selection parameters

The application provides the following selection criteria:

Tab "General"

  Article no.:

Article number

  Drawing issue number:

Drawing issue number of the article, often also referred to as index

  Designation:

Article name



Inactive:

Inactive, active articles. The checkbox is not enabled by default.

  Customer article no.:

Customer article number

  Article model:

Article model

Tab “Groups“

  Group:

The  article  group  tree  can  be  opened  using  the
There is a function to accept and cancel the activity.

  button  if  an  article  group  is  to  be  filtered.

1.5  Detail aplication “Article”

The article number as well as the drawing issue number uniquely identify articles in all areas of HYDRA-

CAQ referring to the article catalog. The drawing issue number, also referred to as article index, may be

very important, in particular, for inspection planning and when inspection orders are generated. Thus, it is,

for example, possible to create an inspection plan for the article 12938 with the drawing issue numbers A

and  B.  Different  inspection  specifications  apply  for  each  drawing  issue  no.  Unless  the  drawing  issue

number is indicated and thus may be part of the inspection plan, the system that generates the inspection

requirements, must deliver this drawing issue number.

MOC_Article.docx

Version: 1.3.18468

Page 4 of 6

Article

The fields “article no.” and “drawing issue number” fields are key fields, i.e. when a new article is saved, it

is first checked whether an article with this key information already exists.

By  distinguishing between  active and inactive articles, it may  be  defined  whether or not the  articles are

available  in  certain  selection  lists.  Thus,  no  inspection  plan  can  be  created  for  an  inactive  article.

However,  inactive  articles  may  be  evaluated  at  any  time.  Moreover,  inactive  articles  can  also  be

reactivated at any time.

Furthermore, an article can be defined as being subject to documentation. In addition the dialog provides

the fields customer article number, article model, article ABC, drawing number as well as the possibility to

assign units. To assign units (dimensions), the catalog of units is used.

If you want to make evaluations on article groups or if you use family inspection plans, it is mandatory to

assign  the  respective  group.  To  assign  groups,  open  the  group  tree  using  the  lens  icon.  Using  the

hierarchic  tree  entries  the  required  group  can  be  selected  in  the  group  tree  and  accepted  by  double

clicking.

MOC_Article.docx

Version: 1.3.18468

Page 5 of 6

Article

The  assigned  group  including  the  hierarchical  group  structure  then  appears  in  the  “groups”  field  of  the

editing dialog of articles.

When articles are displayed in a list, the group hierarchy is represented by the columns “group 1 to group

5”.

Groups  are  maintained  in  the  “article  groups”  application  and  is  described  in  the  document  entitled

“MOC_Groups.pdf“.

MOC_Article.docx

Version: 1.3.18468

Page 6 of 6

