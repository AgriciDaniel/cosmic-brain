Customization of Applications

1  Customization of Applications

1.1  Overview

The MOC provides two types of applications:

-  Main applications to present data

-  Editing applications to edit data

There is a directory with the clear/unambiguous (English) application name for each main application. The

application directory includes all files required to customize an application. The specific files and the number

of files are different for each application. This largely depends on the number of detail applications (tables,

charts etc.) included in an application.

Editing  applications  are  always  assigned  to  a  main  application.  The  files  for  the  customization  of  detail

applications are therefore managed in sub folders of a main application. In addition to the customization

files of the main application, the application directory contains an additional directory including the files of

the detail application.

Example: The files of the application Absence reasons are stored in the folder of the applications with the

name of the relevant application ID, i.e. in this example "AbsenceReasons". The editing dialogs required to

edit absence reasons are stored in the sub folders "delete", "insert" and "update".

1.2  Customization of main applications

Applications  are  the  central  elements  in  order  to  access  the  variety  of  functions  of  the  MES  Operation

Center. All applications have the same structure, i.e. they contain



the main application, i.e. the frame of the application (also called "Application Container")

MDS-ApplicationConfiguration.docx

Version: 1.9.18723

Page 1 of 27

Customization of Applications

  a  toolbar  with  preset  buttons  to  activate  standard  functions  (Request  data,  Print  preview,  Save

configuration, Help, etc.) and a deliberate number of buttons added via customization.

  a selection panel to enter selection or filter criteria with a configurable number of input fields

  data sources (DataControllers) to supply detail applications with (web service) data,

  detail applications embedded in the application via customization, and

  a deliberate number of report configurations to activate the defined reports.

The different components of an application and their customization options are described in detail in the

sections below.

1.2.1  Creating an application

You  use the menu item  MES  Development Suite  – New application  to create a  new application. A new

application opens that can be edited. Save the application to persist the changes.

You cannot create applications that include editing dialogs using this procedure. You then require

a specific application generator, as described in section "1.3.1 Application generator".

1.2.2  Customization of applications

You can use the button Configure application in the toolbar to edit specific properties of an application. You

can edit the following values.

ID

Clear ID of the application that can be used to identify the relevant customization file, for example.

Caption

Text displayed in the title bar of the application. Specify a language key ("lkxxx") for this text so that the

caption is translated.

Help file and Help index

MDS-ApplicationConfiguration.docx

Version: 1.9.18723

Page 2 of 27

Name of file where help subjects for this detail application are listed and/or description of the entry point

Customization of Applications

within this file.

Update rate

Time in seconds after which this data source will automatically and regularly request data. This is the default

value for the entire application. This value is used for all detail applications containing the value 0 as update

rate.

If this value is 0, data is not automatically updated.

Version

Application version

1.2.3

Toolbar

The toolbar provides a quick access to context-related functions. The toolbar can consist of several tabs

which can include several categories each.

The categories "Data" and "Help" are given on each tab in each application. The "Data" category includes

the  buttons  Data  request,  Cancel,  Print  preview  and  Save.  The  categories  "Data"  and  "Help"  and  the

buttons contained cannot be changed.

If the MES Development Suite is activated, another non-adjustable category, Customizing, is shown. This

category includes all important functions to change the application (please also refer to 1.2.4 et sqq.).

MDS-ApplicationConfiguration.docx

Version: 1.9.18723

Page 3 of 27

Customization of Applications

The Configuration menu item in the context menu of the toolbar calls the dialog to edit the functions. Here,

you can create new buttons and edit existing buttons that can be changed.

The following customization options are available:

ID

Clear ID of the ApplicationCommandLink that is called

Command

Deliberate identification of the ApplicationCommandLink

Function

Function  that  you  want  to  execute.  Possible  values  are  e.g.

callScript, openApplicationContainerForEdit

Parameter

Parameters passed to the function

Authorization key

Is used to authorize this function via function authorizations.

Title

Category

Language key for display

ID of the category (is a language key). If the category does not exist,

it is created.

Ribbon page

ID of menu bar tab (is a language key). If the tab does not exist, it

Comment

is created.

Comment

Keyboard shortcut

Keyboard shortcut

Valid keyboard shortcuts

:

CTRL+A to  CTRL+Z

CTRL+F1 to CTRL+F12

SHIFT+F1 to SHIFT+F12

Image (small)

Image used to present the function in the toolbar

Image (large)

Image for presentation. If a large image is available, it will be used;

otherwise the small image is used.

There is no customization file for default categories that already exist. Additional functions are saved in the

file ApplicationCommandLinks.config. This file is only created if required (if functions are added and the

application is then saved).

MDS-ApplicationConfiguration.docx

Version: 1.9.18723

Page 4 of 27

Customization of Applications

Important functions

Link to a main application

ID = application ID

Command = application ID

Function = openAppContainer

Parameter = id=<application ID>

The below parameters can be transferred additionally (added at the end, separated by blanks):

The parameters are case sensitive!

-  autorequest=true/false  if true, data is automatically requested after the application has been opened

-  windowOpenMode=MultiWindow/SingleWindow  if MultiWindow, a new instance of the application is

opened every time it is linked; if SingleWindow the same instance of the application is always opened.

MultiWindow is always set by default to link one application to another application. If SingleWindow is

set explicitly via parameter transfer, all other transferred values are also reset automatically. Data is only

requested automatically if autorequest=true is passed.

-  Modal=true/false  if true, the application is opened modally

-  selectedprofile=<Profile>  if a defined profile is transferred, it is automatically preassigned when the

application is opened.

If the name of the selected profile includes blank characters, the profile name has to be enclosed by

"inverted commas".

You can also transfer values from the application (also applies for opening of editing applications):

-  zielacronym=DC  (the  relevant  value  of  the  same  acronym  from  DatenController  is  transferred  to  the

target acronym)

-  zielacronym=DC:quellacronym  (the  relevant  value  of  the  source  acronym  from  DatenController  is

transferred to the target acronym)

-  zielacronym=SP  (the  relevant  value  of  the  same  acronym  from  SelectionPanel  is  transferred  to  the

target acronym)

-  zielacronym=SP:quellacronym  (the  relevant  value  of  the  source  acronym  from  the  SelectionPanel  is

transferred to the target acronym)

Opening an editing application

ID = ID of the editing application

Command = ID of the editing application

Function = openApplicationContainerForEdit

Parameter = id=<ID of the editing application>

Calling a script

MDS-ApplicationConfiguration.docx

Version: 1.9.18723

Page 5 of 27

Customization of Applications

ID = Script ID

Command = Script ID

Function = callScript

Parameter = id=<script ID>

1.2.4  Selection panel

The selection panel contains input fields (controls) to enter filter criteria. To use input fields as filter criteria,

the following steps are required.

  Adding of input fields to the selection dialog and

  assigning input fields as parameters for the data sources (this step is described in section 1.2.5 )

Activating the editing mode

If the MES Development Suite is activated, right-click the empty space of the selection panel or the label of

a control to open the context menu. Use the context menu to add new controls, delete existing controls or

to activate the mode to edit layouts and controls (Customize layout).

You  can  use  the  editing  mode  to  adjust  the  layout  and  to  specifically  edit  specific  controls  in  the

"Customization" dialog.

MDS-ApplicationConfiguration.docx

Version: 1.9.18723

Page 6 of 27

Customization of Applications

In addition, you can move specific control types to the dialog using drag and drop in editing mode. These

can be

  UserField-Control: a control to present user fields (see section "User fields").

  Shift Control: a control to enter shift times

  Person selection: a control to configure person selections in a very flexible manner.

Changing the layout

In the editing mode, you can change the layout of a selection panel. Click the controls and move them using

drag & drop. Please note that the layout function will attempt to arrange the controls in columns in order to

achieve a very uniform presentation.

In the editing mode, the context menu includes additional functions to edit controls.

MDS-ApplicationConfiguration.docx

Version: 1.9.18723

Page 7 of 27

Customization of Applications

To access this context menu, click Customize layout in the context menu of the control in the application,

and in the Customization window go to tab Layout Tree View and right-click an item.

Tips for the layout:

  Use Create EmptySpaceItem to create forced spaces between controls.

  You  can  use  the  values  in  Size  constraints  to  fix  height  and/or  width  of  controls.  After  editing,  we

recommend to fix the values.

  Use Text Position to place the label text and Hide Text to hide or show the label text.

  Use the item Group to combine several fields to an area or  Create Tab Group to distribute fields to

tabs. It is best to use the dialog Customization to this end. Here, you can select the controls that you

want to group in the tree view and group the controls using the entry of the context menu.

Editing input fields

Controls usually have the type "mpdvEdit". You can add the controls of this type to a layout using Add item

and  delete  the  controls  using  Remove  item.  If  the  editing  mode  is  activated,  click  a  control  to  show  its

properties on the right hand side of the dialog Customization.

The detailed properties of the controls are described in the "Input and Output Fields" section. Please find

some notes on particularly important properties in the context of the selection panel below:

MDS-ApplicationConfiguration.docx

Version: 1.9.18723

Page 8 of 27

Customization of Applications

  The "FieldName" is used to map the control value on a service parameter on the one hand, but on the

other  hand,  it  may  also  be  used  to  adopt  existing  customization  settings  from  other  controls

automatically, if the field name corresponds to a property and/or a service parameter. It is often enough

to  select  a  service  parameter  to  get  a  completely  defined  control.  The  selection  list  of  the  service

parameters is specified via the contents of the "ServiceName" property - only those service parameters

are displayed that are known in the service context. If ServiceName is empty, all known properties are

shown.

  Use  the  "ControlDataSource"  to  specify  a  data  source  suggesting  selection  values.  This  can  be  a

selection list or a selection dialog that is opened to select a value.

  The "ControlType" specifies which type of control will be used (e.g. text, date or list control).



If "ShowSecondControl" is set to "true", the control is shown as a "From To" field.

  The "LanguageKey" is used to set the control label.

Numerous changes in controls are only shown, when you save, close and restart the application!

Once you have created an item, e.g. input field, you cannot completely delete this item using the

graphic configuration because the framework used does not support this function. To definitely

delete an item that you have accidentally created, refer to section "1.5.1 Deleting items from detail

applications".

1.2.5  Data sources

Data sources provide data for detail applications. This connection to a data source can be used to read

data or to create, change or delete data. The repository defines for each data source the type of access

provided to specified data.

Each application must include at least one data source, but can also include any number of data sources.

Adding/editing data sources

Use the button Configure data sources in the toolbar to create a new data source. Already existing data

sources are edited via the same button. The dialogs used and the procedure are almost identical for both

activities.  It  is  therefore  only  described  here  how  to  create  a  new  data  source.  You  can  easily  use  the

description to edit an existing data source, too.

The "Configure data sources" dialog shows the list of the already existing data sources. If no data source

was created, the list is empty.

MDS-ApplicationConfiguration.docx

Version: 1.9.18723

Page 9 of 27

Customization of Applications

By clicking on "Add", a new data source may now be created. Another dialog to specify the properties of

the new data source is now opened1. The following properties are available:

Data logic

The data logic specifies where the data source gets data. For this purpose, so-called data logics serving

as connection to web services exist. The list shows for each data logic the name and a short description.

For each data source, you must specify exactly one data logic. The application designer must know which

data logic provides the data required or performs the required functionality using the data (create, edit or

delete).

Events

This field specifies the event. The data source then responds to this event. If this event occurs, the data

source requests data from its data logic.

By default, only the event "Request data: DataRequested" can be selected. This means that the data source

requests data when the green arrow in the toolbar is clicked.

In addition, each data source can respond to the SelectionChanged event of all other data sources created

until then. This event occurs if one or more data records are selected in this data source (e.g. if you select

a row in the annexed grid). This way, you integrate a master detail connection between the separate data

sources.  You  often  use  this  method  to  show  detailed  information  for  a  row  selected  in  the  grid,  e.g.  all

operations assigned to an order.

The  list  of  available  events  is  extended  with  each  new  data  source.  If  a  data  source  for  the  data  logic

WorkplaceOverview was created before, the selection looks as follows:

1 By clicking on "Change", an already existing data source may be edited. A dialog is opened – the same

dialog is used to create a data source. The already defined properties of the data source are pre-allocated.

MDS-ApplicationConfiguration.docx

Version: 1.9.18723

Page 10 of 27

Customization of Applications

Parameters: Sources2

You can parameterize the connection to the database that is created via data source. Using parameters,

you can limit the requested data quantity or define the values of a new data record. The precise use of

parameters depends on the type of data source.

The  parameter  sources  specify  where  the  data  source  gets  the  parameters.  Each  data  source  can  get

parameters from any number of sources.

If an application only includes one data source, you can only select the selection panel "Parameter Layout"

as source. This means that the selection panel provides a parameter from the data source for each field

(input field, checkbox, combo box, ...) of the selection panel.

2 The parameter source is also called ParameterContainer.

MDS-ApplicationConfiguration.docx

Version: 1.9.18723

Page 11 of 27

Customization of Applications

If several data sources are available, each data source can also obtain its parameters from the selected

data  records  of  all  other  data  sources  created  until  then.  In  this  case,  a  parameter  is  created  for  each

column of the dataset. The list of available parameter sources is extended with each new data source.

Parameters: Mappings

The parameters that a data source gets from different sources are not transferred to the data logic as they

are. The user can define which parameters are assigned to parameters that are expected by the data logic.

The user can also define how the parameters are mapped. An example can best illustrate the procedure.

Example 1:

In the selection panel, there is a field for the selection criterion Workplace with acronym "resource.id". The

selection panel was selected as parameter source of the new data source.

In the left column you see where the parameters are from. In this case, it is the selection panel. The second

column shows how the parameters are identified within the selection panel. In the third column, a list of all

parameters expected from the web service is shown. Now the requested target parameter may be selected

for each parameter from the selection panel.

MDS-ApplicationConfiguration.docx

Version: 1.9.18723

Page 12 of 27

Customization of Applications

It  is  possible  to  map  up  to  two  parameters  on  the  same  target  parameter.  This  will  automatically  be

interpreted as from...to relation,  e.g. to limit time ranges.  At  present  you  are  not allowed to allocate  the

same target parameter to more than two parameters. In this case, the relevant parameters are not used in

a data request.

The parameters of the selection panel can be allocated freely when fields are created. Note: due to the

mapping,  names of source and target parameters need not  be  identical.  But the property  FieldName of

fields of the selection panel is used as key to identify specific properties like input screen, field width, label,

etc. Carefully select the FieldName for this reason.

Example 2:

A data source for the WorkplaceOverview data logic has already been created and selected as parameter

source for the new data source.

Here, too, the two first columns show where the parameters are from and how they are called. In this case,

one parameter, each, is offered for each field provided by the WorkplaceOverview data source. Since these

fields, however, should normally not be  included  in the requests of the new  data source as  parameters

completely, only those also allocated to a target parameter are considered.

Typical  case  in  practice:  WorkplaceOverview  is  used  as  data  source  for  a  grid.  The  new  data  source

requires  a  machine  number  as  parameter  to  identify  all  operations  logged  on  to  a  specific machine,  for

example. In this case it is not reasonable to transfer all available parameters. Only the machine number

(resource.id) is therefore mapped on the target parameter.

Note:  In many cases, the  acronyms of the source and target parameters are identical. This is  often the

case, but not always.

MDS-ApplicationConfiguration.docx

Version: 1.9.18723

Page 13 of 27

Customization of Applications

You  can  enter  the  operator  in  the  fourth  column  that  is  used  to  map  input  to  service  parameter.  In  the

example, the definition remains empty; this is the default operator "equals". Other options that are used

less often are "like", "in", "lessThan", "greaterThan", etc.

If a parameter defined in the layout is not displayed as data source "Parameterlayout" in the list

of  available  values,  you  must  check  if  the  relevant  control  has  been  properly  configured.  For

example, if the data type of the parameter does not support an array (e.g. datatype "boolean" or

.NET type "duration") and if the control has been defined using "ShowSecondControl=True", then

the parameter is not included in the selection list because this assignment is not valid.

Cache time

This is used to specify the time in seconds which is added to the data logic when data is requested. Within

this period, new requests with identical parameters are served from the cache. This value will overwrite a

default value for the entire MOC.

Update rate

Time in seconds after which this data source will automatically and regularly request data. If the value is 0,

the default value of the total application (see above) is used. If data is requested manually, the time is reset.

Column configurator

The column configurator is used to limit the data requested. Each data logic usually provides a very large

number of fields (sometimes up to 1,000) because it is of universal use. But not the total number of fields

needs to be displayed in a detail application. For reasons of performance, it is not reasonable to request

data for fields which are not required anyway, the column configurator is used to specify the columns where

data is actually requested.

The column configurator may be maintained via an additional dialog for each data source. All fields provided

by the selected data logic are listed.

When creating a new data source, all fields appropriately identified in the repository are selected by default.

If  the  data  source  is  saved  and  the  column  configurator  is  not  opened,  then  this  preset  selection  is

automatically used. To change the selection, select the required fields and close the dialog via OK.

Default values

A default value may be defined for each parameter expected from the selected data logic. This value is

automatically allocated to the relevant parameter if no value is supplied by any parameter source.

Default values are also maintained via an additional dialog. All parameters expected from the web service

are listed here.

MDS-ApplicationConfiguration.docx

Version: 1.9.18723

Page 14 of 27

The default value may be edited as free text. It is important, however, that the expected data type of the

parameter is observed. The following values are possible:

Customization of Applications

Data type

Possible values

string

Deliberate character strings

integer

Only numerical values

decimal

Numerical floating point values

boolean

0, 1, false, true

datetime

Valid date character strings, e.g. 2009-02-01 or 02-01-2009.

If the "Array allowed" column includes the value "true", then a list of values can also be transferred to the

parameter. You can enter a list of values; separate the values via semicolons (;).

If an invalid value is entered, this is notified to the user. The value will not be adopted in this case.

ResultSet

There  are  also  data  sources  which  may  return  several  ResultSets.  In  this  case,  there  are  the  following

possibilities for customization:

  The data source is used by a specialized detail application  plug-in capable of handling the supplied

data structure (e.g. machine time profile, PDV evaluations/reports).



In  a  detail  application  that  can  only  process  simple  ResultSets,  the  first  ResultSet  is  automatically

displayed (important: the selection of the first set can be a selection by chance!).

  To specify the ResultSet that the DataController provides to "simple" detail applications, you can specify

the  name  of  the  ResultSet  to  be  used  in  the  customization  file.  Currently,  you  can  only  do  this  by

manually editing the file. You can find the name of the ResultSet in the repository column with the same

name.

<DataControllerDescriptor>

   <Id>RPProductionReportingStatusAnalysisByClassification</Id>

   <DataLogic>RPProductionReportingStatusAnalysisByClassification</DataLogic>

   <ParameterContainers>

   <Mappings>

   <DefaultValues>

   <ColumnConfigurator>

   <CacheTime>0</CacheTime>

MDS-ApplicationConfiguration.docx

Version: 1.9.18723

Page 15 of 27

Customization of Applications

   <RefreshRate>0</RefreshRate>

   <UpdateParametersByService>false</UpdateParametersByService>

   <ResultSet>profile</ResultSet>

</DataControllerDescriptor>

Important: If the result for the data source is specified, the same ResultSet is made available for all detail

applications using this data source. If a specific detail application requires a different ResultSet, you must

specify this via script.

Deleting data source

To delete a data source, the requested data source must be selected in the list of all data sources already

created.

Click Remove to remove this data source from the application. For security reasons, the user must confirm

the operation.

You can only delete a data source that is not used yet.

You can use a data source as

  Event "provider" for other data sources;

  Parameter source for other data sources;

  Data source for one or more detail applications.

In this example, all three conditions are true. The data source is actually used and you must check again if

you really want to delete the data source. If yes, you must first remove all connection to the data source.

With  the  data  source  "PersonListCurretlyLoggedOn2,  you  must  remove  the  data  source  from  the  list  of

parameter sources and events. The "Workplace overview" detail application must also be deleted because

no other data source can be selected for it subsequently.

1.2.6  Detail applications

Detail applications are used to present data in an application. There are different types of detail applications.

Some of them are very universal and are therefore used quite frequently, e.g. grid, chart, detail display or

pivot grid. Some of them refer to a special application case, e.g. cycle progression chart.

When you create a detail application, you specify its type, i.e. how data is presented. This specification is

fundamental and cannot be changed once a detail application has been created.

MDS-ApplicationConfiguration.docx

Version: 1.9.18723

Page 16 of 27

Customization of Applications

Creating / editing detail applications

To create a new detail application, click the toolbar button Configure detail applications. Already existing

detail applications are edited via the same button. The activities of creating and editing dialogs are very

similar  and  the  same  dialogs  are  used.  Below  it  is  therefore  only  described  how  to  create  a  new  detail

application. You can easily use the description to edit an existing data application, too.

The dialog Configure detail applications opens and a list of the already existing detail applications is shown.

If no detail application has been created before, the list is empty.

Click  Add  to  create  a  new  detail  application.  Another  dialog  to  specify  the  following  properties  is  now

opened.

ID

The ID must be clear within the application because the ID is used to clearly identify the detail application.

Caption

The  text  entered  specifies  the  title  of  the  detail  application.  The  detail  application  is  displayed  within  a

dockable panel. The text entered here is displayed in the title bar of the panel.

Note: enter a language key here to guarantee the correct translation when changing to another language.

Please note: When the detail application has been created, the translation of the language key will directly

be displayed in the list of existing detail applications. Requirement: the language key entered must already

exist.

Application category

The  application  category  specifies  the  form  used  to  display  the  data.  There  are  general  application

categories used for numerous different detail applications (chart, table view,...). There are also very special

application categories that are only used for very special detail applications. It is possible that an application

category is specified for one single detail application only. In this case it is possible that the data source,

which  provides  the  data,  is  specified  in  a  fixed  manner  for  the  detail  application.  Example:  the  cycle

progression.

If

the  cycle  progression

is  added

to  an  application,

the  assigned  data  source

ResourceCycleProgression with default values is automatically created, too. You can edit the data source

later on when the application has been created.

It is also possible that the data source has already been created. In this case, the data source is not created

again, but the already existing one is automatically assigned to the detail application.

MDS-ApplicationConfiguration.docx

Version: 1.9.18723

Page 17 of 27

Customization of Applications

In  case  of  already  existing  detail  applications,  the  application  category  cannot  be  changed

subsequently.

The  cycle  progression,  which  includes  its  own  data  source,  is  a  special  case.  This  application  category

does not only include a chart for the display of data, but also additional control elements to limit data (e.g.

radio  buttons to select shifts/hours). This detail application therefore does not only provide its own  data

source but also its own parameters and its own events. The user expects that the data displayed is adapted

to the selection upon a click on a radio button.

Events

Like data sources, some detail applications can respond to events. This always depends on the application

category. If you select a relevant application category, this is possible. The selection list is then activated

and the user can select all events where the detail applications of this type can respond.

Important difference to events with data sources: a data source always responds to an event in the same

way, i.e. data is requested. With detail applications, the response is not clearly specified, but depends on

the category of the detail application. For information on the response of a detail application to an event,

refer to the documentation of the relevant detail application (see Error! Reference source not found.).

Data source

If the data source has not been specified automatically with the selection of an application category, you

can select a data source here. All data sources are available, which have been created as described in 0.

Select the relevant data sources. The new detail application will then get its data from the selected data

source.

In case of already existing detail applications, you cannot change the data source subsequently.

Ribbon page

The ribbon page entered here is activated as soon as the detail application is focused.

Additional data sources

Some detail applications support the use of several data sources. If you select such an application category,

this selection list automatically becomes active.

Authorization key

Authorization  keys  to  control  authorizations  that  are  required  to  display  this  detail  application.  If  no

authorization key is defined, the detail application will always be opened.

MDS-ApplicationConfiguration.docx

Version: 1.9.18723

Page 18 of 27

Help file and Help index

Name of file where help subjects for this detail application are listed and/or description of the entry point

Customization of Applications

within this file.

Icon

Selection  of  the  icon  displayed  in  the  title  bar  of  the  detail  application.  Select  the  icon  using  an  image

selection dialog. After having selected an icon, the icon is displayed on the button that opens the dialog.

 Show selected data records only

Usually, all data records of the selected data source are displayed in a detail application. In some cases

this is not reasonable. Example: the application category "Detail view" is normally used to display specific

values of a single data record in different fields.

Typical application case: several workplaces are shown in a table view. Next to the table and for reasons

of overview, you want to show the ID, status, group, cost center, etc. of a single workplace in a detail view.

The detail view must always provide details on the workplace selected in the table.

Here, both detail applications show data of the WorkplaceOverview data source, either all data or only one

data record.

The same data source is assigned to both detail applications. But in the detail view, you only want to show

the selected data record. You therefore enable the option Show selected data records only. All data records

highlighted  in  the  grid  are  selected.  If  several  data  records  are  highlighted,  the  data  of  the  data  record

highlighted last is displayed in the detail view.

Column configurator

Use the column configurator to narrow down the data available in the detail application. In an ideal case,

the relevant data source has already been configured accordingly and provides only the fields required. But

some applications are very special and cannot "handle" all fields of their data source (e.g. specific charts).

You can edit the column configurator via an additional dialog for each detail application. All fields provided

by the selected data source are listed (see screenshot 0).

When you create a new detail application, all fields are selected by default. If the detail application is saved

then without opening the column configurator dialog, this pre-setting is automatically adopted. To change

the selection, select the required fields and close the dialog via OK.

If no data source has been selected yet, this list is empty because the fields displayed are based

on the data source.

MDS-ApplicationConfiguration.docx

Version: 1.9.18723

Page 19 of 27

If an additional column is added to the column configurator, a field is not automatically added to

Customization of Applications

the detail application!

Deleting detail applications

To delete a detail application, select the required detail application in the list of all detail applications already

created.

Click Remove to completely  delete this detail  application from the application. For security reasons, the

user must confirm the operation.

You cannot use a detail application as a data source. In general, you can always delete a detail

application. But if a data source has been created automatically for a detail application, this data

source is not automatically deleted, too. If it is no longer required, you must delete the data source

manually (see 0).

Showing detail application

When you have created a detail application, it is automatically loaded into a dockable panel and displayed

in the application. You can place and resize the panel using drag and drop.

The detail application is automatically "initialized". For example, this can mean  that in a grid, all columns

are automatically added and shown that are available in the data source of the application.

Configuring contents of the detail applications

You are free to configure the contents of the different detail applications. With very simple detail applications

like  the  type  Layout,  the  fields  displayed  are  configured  like  the  selection  panel  (see  1.2.4).  The

configuration of more complex detail applications is described in the following sections.

1.3  Customization of editing applications

Editing  applications  are  very  similar  to  main  applications.  Their  structures  are  nearly  identical  and  they

provide almost the same configuration options.

This  section  describes  the  customization  options  provided  by  editing  applications.  Many  customization

options  are  identical  to  those  provided  by  main  applications.  This  section  therefore  focuses  on  the

differences or additional possibilities.

MDS-ApplicationConfiguration.docx

Version: 1.9.18723

Page 20 of 27

Customization of Applications

1.3.1  Application generator

Editing applications are usually created along with the relevant main application in an automated manner

using the application generator.

For a detailed description of the procedure, refer to the document MDS-ApplicationGenerator.pdf.

1.3.2  Additional customization options

In  general,  editing  applications  provide  the  same  configuration  options  that  are  described  above.  Some

further  settings  are  only  available  for  editing  applications  and  are  only  active  if  an  editing  application  is

called.

When you create the application, some reasonable values are preassigned to these additional settings.

Currently, you can only perform a subsequent customization if you edit the main customization file of the

application (<NameOfEditingApplication>.config in the application folder of the editing application).

ParentController

Name of the relevant data source of the higher level main application.

The application generator initially sets this setting automatically. To make subsequent changes, you must

manually change the above-mentioned customization file.

Subject to the ParameterProcessingMode, the values from the currently selected row of this data source

are transferred to the editing application and assigned to its fields.

Subject to UpdateMode/UpdateSourceMode, the data of this data source is updated after performing the

editing function.

ParameterProcessingMode

Specifies if and how parameters from the calling main dialog are transferred to the editing dialog.

The application generator initially sets this setting automatically. To make subsequent changes, you must

manually change the above-mentioned customization file.

The following options are available:

-  NoParameter: no parameters are transferred.

-  SingleParameter: transfers the selected grid row (mandatory); an error message is displayed if no

row is selected.

-  OptionalSingleParameter: transfers the selected grid row (optional); no error message.

-  MultiParameter: transfers one or several grid rows (mandatory); an error message is displayed if

no row is selected.

-  OptionalMultiParameter: transfers one or several grid rows (optional); no error message.

MDS-ApplicationConfiguration.docx

Version: 1.9.18723

Page 21 of 27

Customization of Applications

-  SingleSelectionParameter: transfers the selected grid row. If no row is selected, the values of the
selection panel are passed. If the selection panel neither transfers values --> an error message is
displayed.

-  OptionalSingleSelectionParameter: transfers the selected grid row. If no row is selected, the

values of the selection panel are passed. No error message.

-  SelectionOnlyParameter: transfers the values from the selection panel. If no values are

transferred  error message.

-  OptionalSelectionOnlyParameter: transfers the values from the selection panel. No error

message.

UpdateMode

Specifies how data is changed via editing function.

The application generator initially sets this setting automatically. To make subsequent changes, you must

manually change the above-mentioned customization file.

The following options are available:

-

Insert: new data records are added

-  Update: existing data is changed / edited

-  Delete: existing data is deleted

UpdateSourceMode

Specifies how data is updated in the main application, once the editing function has been executed.

You can make this setting initially via the application generator. To make subsequent changes, you must

manually change the above-mentioned customization file.

The following options are available:

-  All: all data of the main application is completely refreshed (using the values entered in the

selection panel). This is required, for example, for separate delete and copy dialogs. Because
here, you cannot identify the relevant data records and only request these data records.

-  OnReturnValues: the service called returns values that are used to request only the relevant

data. This may be the case, e.g. for "Insert". In this context, it is often the case that a new key
field is generated that is required to request the new data record.

Important: if the service called does not return any fields that can be used to clearly identify a
relevant data record, then this setting does not make sense. This setting is set by default for
Insert and must be changed, if necessary.

-  OnKeyValues: the key fields of the list service are used to request only the relevant data. This is

the ideal procedure for the Update.

Important: the service of the main application and the editing service must have the same key
fields; otherwise it does not work.

-  OnScript: for future use

1.3.3  Process configuration

To configure the processes for editing functions as precisely as possible, a process configuration exists for

each editing application in the file ProcessConfiguration.config.

MDS-ApplicationConfiguration.docx

Version: 1.9.18723

Page 22 of 27

Customization of Applications

The  application  generator  automatically  generates  this  file  when  the  application  is  created.  The  file  is

directly stored in the application directory of the application.

Another section of this document describes the process configuration in detail.

1.4  Calling external programs

You can call external programs from the MOC via the menu or from an entry in the toolbar of an application.

1.4.1  Menu

To call an external program from the menu, you make an entry in the menu editor:

The following values are relevant:

-  Enter "StartExternalProcess" as command and ID

-  Enter the program to be run in "Parameter"

For further details, refer to section "Parameters"

1.4.2

Toolbar

To start an external program from an application, you can call the program via toolbar

You use the link editor for customization.

-  Function:

callCommandObject

-  Parameter

Program to be executed including parameters

For further details, refer to section "Parameters“

MDS-ApplicationConfiguration.docx

Version: 1.9.18723

Page 23 of 27

Customization of Applications

1.4.3  Quick launch bar

Directly enter CommandLink to call the program

Example:

StartExternalProcess path="notepad" example.txt

1.4.4  Parameter

To call external programs, the following parameters are supported

Path

This parameter defines the program that is called

-> The "path“ parameter must be specified.

-> The transferred value has to be enclosed by double inverted commas.

The  specified  program  must  be  executable  and/or  if  the  program  cannot  be  called  automatically,  the

program including the entire program path must be entered

All other parameters are optional and transferred to the executing program as parameters.

Parameter

Variables can be transferred in square brackets.

List of parameters

These parameters are possible:

MDS-ApplicationConfiguration.docx

Version: 1.9.18723

Page 24 of 27

Customization of Applications

UserName:

logged on user

MesInstanceName:

registered system

MesInstanceUrl:

Url of the registered system

Language:

Language selected by the user (format: en-US)

All Application Settings

If you put [CONF:] in front, you can transfer any ApplicationSettings in the call parameters,

e.g.:

CONF:LookAndFeelSkin

the skin selected by the user

The complete list of possible application settings can be shown if you enter the transaction code

"syssettings" on the MOC

Examples:

Starting the MaintenanceManager for the system logged on:

StartExternalProcess path=" iexplore.exe" "http://[MesInstanceUrl]/MaintenanceManager/“

Starting any program and transfer of skin

StartExternalProcess path="irgendeine.exe" Skin=[CONF: LookAndFeelSkin]

1.5  Tips & Tricks

1.5.1  Deleting items from detail applications

Background

You  can  use  the  context  menu  of  the  graphic  configuration  to  delete  items,  e.g.  input  fields.  But  the

framework used does not definitely delete the items. It only hides the items and they still exist as "hidden

item". The framework does not provide a technical option to definitely delete an item created for a detail

application.

MDS-ApplicationConfiguration.docx

Version: 1.9.18723

Page 25 of 27

Customization of Applications

Solution

If it is not enough to hide the items and if the items created must be deleted definitely, you must manually

change the configuration files. To do so, you must delete XML  entries in the layout configurations of the

detail applications using a text editor or an XML editor.

Layout files are files with the extension "*.config" that include the text "layout" in the name. These files are

stored in the directory of the application configuration of the MOC in the relevant scope. Example:

  d:\Moc\local\conf\Moc\Apps\Units\LayoutPanel.config

  d:\Moc\local\conf\Moc\Apps\Units\LayoutMainDetail.config

  d:\Moc\local\conf\Moc\Apps\Units\MDUnitsInsert\ParameterLayoutMDUnitsInsert.config

In the relevant XML file, search for the "FieldName" of the item that  you want to delete (in our example

"example.item.to.delete") and delete an XML node at two places.

When you edit XML files, the MOC must not be started. The changes are enabled with the next

start of the MOC.

Deleting the item

            <property name="Text"></property>
            <property name="CustomizationFormText">SI-Einheit</property>
            <property name="StartNewLine">false</property>
            <property name="Visibility">Always</property>
            <property name="TextLocation">Left</property>
          </property>
          <property name="Item7" isnull="true" iskey="true">
            <property name="TypeName">LayoutControlItem</property>
            <property name="ControlName">example.item.to.delete</property>
            <property name="AllowHtmlStringInCaption">false</property>
            <property name="TextAlignMode">UseParentOptions</property>
            <property name="SizeConstraintsType">Custom</property>
            <property name="Image" isnull="true" />
            <property name="ImageIndex">-1</property>
            <property name="ImageAlignment">MiddleLeft</property>
            <property name="ImageToTextDistance">5</property>
            <property name="OptionsPrint" isnull="true" iskey="true">
              <property name="TextToControlDistance">-1</property>
              <property name="AllowPrint">true</property>
…
            <property name="TextLocation">Default</property>
          </property>
…
Delete the complete item property (in the example Item7) from the opening to the closing tag (underlined).

The items contain numbers (e.g. "Item7") The numbers need not be consecutive numbers. It is

therefore not necessary to assign new numbers to the succeeding items when an item has been

deleted.

MDS-ApplicationConfiguration.docx

Version: 1.9.18723

Page 26 of 27

Customization of Applications

Deleting the settings of an item

  <Setting Key="mpdvEdit_example.item.to.delete" Description="" LastChanged="2017-07-

27T08:16:55.8650007Z" ValueType="System.Xml.XmlDocument" Version="0.0.0.0">

    <Value>
      <ConfigurationItem xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"

xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns="http://www.mpdv.de">

        <Acronym>example.item.to.delete</Acronym>
        <ServiceName />
        <Label>lkTest</Label>
        <Length>0</Length>
        <FillChar xsi:nil="true" />
        <ShowInGrid xsi:nil="true" />
…
        <CanNotEqualOrNull xsi:nil="true" />
        <TransferEmptyValuesToHydra xsi:nil="true" />
        <IsResult xsi:nil="true" />
        <ShowSecondControlInSearch xsi:nil="true" />
        <LoadDataOnInit xsi:nil="true" />
      </ConfigurationItem>
    </Value>
  </Setting>
…
Delete the complete setting from the opening to the closing tag (underlined).

MDS-ApplicationConfiguration.docx

Version: 1.9.18723

Page 27 of 27

