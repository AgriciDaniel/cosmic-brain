MES Development Suite

1  MES Development Suite

The MES Development Suite provides functions to customize the HYDRA Client MES Operation Center

according to your requirements. The sections in the following provide general background information that

you require for customizations and other extensions.

1.1  Activating the MES Development Suite

To  activate  or  deactivate  the  MES  Development  Suite,  use  the  main  menu,  menu  item  Extras    MES

Development Suite.

You  can  only  activate  the  MES  Development  Suite  (or  the  menu  item),  if  the  required  function

authorization and licenses are available. The licenses must be installed in the relevant system.

To activate the MES Development Suite, you must assign the function authorization "mds" to the user.

The following products must be purchased to activate the MES Development Suite.

For  historical  reasons,  the  products  of  the  MES  Development  Suite  are  different  to  the

licenses, which must actually be available in the system.

Product (price list)

License
system)

(in

the

MDS-BAS

MES Development Business Applications & Services

MDS-BAP

MDS-RPD

MES Development Suite Report Design

MDS-RPB

One  of  the  above  licenses  is  enough  to  activate  the  menu  item,  but  only  with  MDS-BAS,  all  available

functions are available. With the product MDS-RPB, only the functions are available after activation that

are required for the report design.

1.2  Applications on the MOC

The  MOC  provides  many  different  functions.  The  functions  are  made  available  via  applications.

Applications  can  offer  very  different  functions,  but  their  structure  is  always  the  same.  This  is  true  for

complex evaluation applications like the Workplace overview and for a simple editing dialogs like the one

to edit Units.

These are the basic elements of an application:

MDS-Basics.docx

Version: 1.0.22376

Page 1 of 4

MES Development Suite

  Toolbar with buttons to call functions

  Selection area or selection panel to parameterize data queries

  Area for detail applications where one or any number of detail application(s) may be presented.

  Data  sources  or  DataControllers  that  provide  data  for  the  detail  applications,  i.e.  that  call  (web)

services on the server supplying the relevant data.

From a technical point of view, editing dialogs for creating, editing and copying of data records are also

applications.  But  editing  dialogs  normally  do  not  provide  detail  applications.  They  only  have  a  single

(selection)  area  to  enter  parameters  that  are  used  to  call  the  relevant  editing  function  (i.e.  the  relevant

web service).

Note: Editing applications are normally generated using the application generator (included in the product

“MES Development Suite – Business Applications”).

1.3  Meaning of customization

You can use the MOC to create new  applications and change existing functions via customization.  You

do  not  control  the  available  functionality  via  programming,  in  particular  with  applications,  but  you  edit

customization files (.config), which are usually changed via specifically developed customization dialogs.

These dialogs are integrated into the software and are enabled when you activate the MES Development

Suite.

A  separate  section  below  provides  general  background  information  on  customization  settings  and  their

distribution  to  the  clients.  Some  special  features  of  customization  settings  are  described  here,  for

example of applications or menu items.

The available authorizations of the user or the available licenses specify the changes that can be made to

the  customization  settings.  But  in  general,  a  normal  user  can  also  change  these  files  and  save  a  table

layout that has been changed according to their own requirements, for example.

Customization files for applications

Some (main) applications are used to display data and other applications are used to edit data. For each

main  application,  the  directory  %scope%\conf\Moc\Apps  contains  a  directory  with  an  unambiguous

(English) name of the application. Editing applications are always assigned to a main application and are

stored in a sub folder of this main application.

Example: The application Absence reasons is filed as a customization file in the "application" folder in the

sub folder with the name of the related application ID, in this case AbsenceReasons. The editing dialogs

required to edit absence reasons are stored in the sub folders "delete", "insert" and "update".

MDS-Basics.docx

Version: 1.0.22376

Page 2 of 4

MES Development Suite

Main applications

The application directory contains all customization files that you require to customize an application. The

specific  files  and  the  number  of  files  are  different  for  each  application.  This  largely  depends  on  the

number of detail applications (tables, charts etc.) included in an application.

Contents of an application directory including editing applications.

The list below provides an overview of the most important files:

-  <Id of the application>.config  Customization data for the application (title, help file, …)

-

LayoutPanel.config  Customization of the selection panel

-  DockManagerCollection.config  Customization of the layout of detail applications

-  DataControllerCollection.config  Customization of the data sources of the application

-  ApplicationPluginCollection.config  Customization of the detail applications

-  EventLinkCollection.config    Customization  of  the  relations  between  data  sources  and  detail

applications

-  ApplicationCommandLinkCollection  Customization of the toolbar.

For  each  detail  application  of  a  main  application,  a  separate  customization  file  is  available.  You  can

usually identify this customization file via the file prefix. For example

-  Grid*. config -> detail application with table

-

*Chart*.config -> Detail application with chart

-  Pivot*.config -> Detail application with pivot

-

Layout*.config  detail application for detail views

The application directory can include further files that are not listed here if special developments or plug-

ins are available.

MDS-Basics.docx

Version: 1.0.22376

Page 3 of 4

MES Development Suite

Editing applications

Editing applications are a special type of applications (see above). Their customization files are managed

in sub folders of a main application. In addition to the files described above, the application directory of

the  main  application  contains  an  additional  directory  for  each  editing  application  including  the

customization  files.  Each  editing  application  includes  an  additional  file  ProcessConfiguration.config  that

includes information on the process of calling this editing application. And the main customization file also

includes additional and specific information.

Customization files for menus

On  the  MOC,  you  can  use  the  menu  item  Extras    Menu  editor  to  create  and  manage  any  number  of

menus.  Each  menu  includes  (main)  menu  items  including  sub  items  storing  the  actual  functions.  The

customization  files  of  the  different menus  are  stored  in  the  %scope%\conf\Moc\Menues  directory.  Each

main  menu  is  managed  in  a  separate  sub  folder.  The  sub  menus  are  mapped  by  a  separate  file

containing the functions.

Example of a menu structure: The folder of the menu “RoleMenu” includes sub folders, e.g. the

“OrderManagement” folder that manages the structure of the “order management” menu. The sub menu

“production reports” and its functions are managed in the file

“OrderManagementProductionReport.MenuGroup".

MDS-Basics.docx

Version: 1.0.22376

Page 4 of 4

