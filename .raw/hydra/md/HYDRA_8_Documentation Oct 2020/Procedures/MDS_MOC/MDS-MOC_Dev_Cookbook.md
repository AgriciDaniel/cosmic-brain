MOC Entwicklung – „Kochbuch“

1  MOC Development – "Cookbook"

1.1  Overview

You use the "Cookbook" for the development on the MOC. It explains many use cases step by step. Some

of the use cases occur frequently, others rarely. The requirements and all steps of the solution are listed in

short form. Frequent errors are mentioned so that you can easily avoid these errors. Also note the further

information specified in each case.

1.2  Enable the MES Development Suite

Enable the MES Development Suite to make changes on the MOC.

Requirements

  MDS license

  Function authorization "mds"

  Select the correct scope

Solution: Steps to follow

  Go to the main menu "Extras" - "MES Development Suite" and enable the MES Development Suite.

  Reopen the application you want to configure.

  Make changes and save the changes made.

Restrictions

The available MDS license specifies the scope of changes you can make.

1.3  Formatting of durations as axis values in the chart

In the chart, the axis labeling shows numeric values. Actually, the values are durations.

Requirements

  Application including configured chart.

Solution: Steps to follow

1.  Open the configuration file of the chart in a text editor.

2.  Edit the value for "CustomFunction" and change it to "Duration".

<Setting Key="CustomFunction" Description="" LastChanged="2015-07-15T12:51:32.8967665Z" ValueType="System.String"
Version="0.0.0.0">

MDS-MOC_Dev_Cookbook.docx

Version: 1.2.22379

Page 1 of 30

MOC Entwicklung – „Kochbuch“

    <Value>
      <string>Duration</string>
    </Value>
</Setting>

3.  Save the configuration file.

4.  Restart the MOC.

Restrictions

The described solution only works with values that you can format with the output format mpdv_timespan

e.g. in the grid.

Further information

The  respective  configuration  file  is  stored  in  the  application  directory  and  uses  the  naming  convention

[PluginId]Chart.config.

1.4  Configuration of selection fields

You can store search applications or selection lists for a field in order to simplify the selection of entries.

Depending on the use, three options are available for search applications and selection lists:

  Use  search  applications  to  select  a  data  record  from  a  large  quantity  of  data,  e.g.  all  orders.

Search applications include filter criteria that help to narrow down the data.

  For small quantities of data, e.g. all order statuses, define a dynamic selection list including the

request of a service. The static selection lists do not include filter criteria. These lists always show

all data for selection.

  Define a static selection list with a ReferenceData if you only want to offer few specified values.

Requirements



"MDS Development Suite" is enabled to configure applications.

  You have selected the correct scope to configure applications.

  You have created the field you want to configure in the detail application (see tutorial: "Adding and

customizing fields in a detail application").

  The data you want to store (search application, data of selection list) must be available in the server

or client.

Solution: Steps to follow

Configuration of a search application

Store a button for the field to open an application and select an entry from an existing application, e.g. open

the order overview to transfer an order into the field.

1.  Open the application you want to modify.

MDS-MOC_Dev_Cookbook.docx

Version: 1.2.22379

Page 2 of 30

MOC Entwicklung – „Kochbuch“

2.  Right-click the layout of the detail application - "Customize layout"

3.  Select the field you want to configure.

4.  "ControlDataSource": Assign the application to be opened, e.g. OrderOverview.

5.  "ControlDataSourceMode": Set Lookup

6.  Select the parameters "ControlDataSourceParameter" that are transferred to the application to be

opened, e.g. a specified order number via order.id=12002500

7.  Set the "ControlDataSourceResult", e.g.

order.id;order.id;;order.articledesignation;order.act.status

o

o

o

o

the internal (unique) ID, here order.id

the value to be transferred into the field, here order.id

the text to be placed behind the field, usually units like e.g. n hours, here empty

further  parameters

that  can  be  displayed

in  other

fields  of

the  application,  here

order.articledesignation;order.act.status

8.

[Optional] "ControlParameter": Assign the DataLogic of the service that is to be called when the user directly

types

into

this

field  and

the

field  of

the  service  where

the  entries  are  made,  here

e.g. BOOrderList;order.id

9.

"ControlType": Assign TextEdit

10.  Save the application by clicking the button "Save".

Note: If you want to use the field including search application at different places on the MOC, it might be

useful to make the described configuration in the higher-level repository client, and not in the client.

Configuration of a dynamic selection list with data of a service

Store a selection list for a field to select a value from a limited number of database entries, e.g. all order

statuses. The entries in the list are requested dynamically from the service.

1.  Define the ControlDataSource in the repository.

1.  Create a new data record in the view "ControlDataSource".

2.  Select the domain and service (as DataLogic in the field Source), which provide the data,

e.g. MDOrderStatus and MDOrderStatsList

3.  Define the "name" of the ControlDataSource. Then this name will be used in the client, e.g.

orderStatusList

4.  Define the "columns" to request, e.g. orderstatus.status;orderstatus.text

5.  Define the "parameters" that limit the results, e.g. orderstatus.statustype=A

6.  Specify the "Result"









the internal (unique) ID, here order.id

the value to be transferred into the field, here order.id

the text to be placed behind the field, usually units like e.g. n hours, here empty

further

parameters

that

can

be

used

in

the

application,

here

order.articledesignation;order.act.status

MDS-MOC_Dev_Cookbook.docx

Version: 1.2.22379

Page 3 of 30

7.  Test deployment of the ControlDataSource (see tutorial "Deployment of customizations")

MOC Entwicklung – „Kochbuch“

2.  Open the application that you want to modify on the MOC.

3.  Right-click the layout of the detail application - "Customize layout"

4.  Select the field you want to configure.

1.  "ControlDataSource": Assign the name of the ControlDataSource defined in the repository.

2.  "ControlDataSourceMode": Set Lookup

3.  Set the "ControlDataSourceResult", if it is not identical to the data defined in the repository

(syntax as described above).

4.  "ControlType": Set ComboBoxEdit

5.  "ControlTypeMode": Set e.g. SingleEdit for single selection or Multiple for multiple

selection.

5.  Save the application by clicking the button "Save".

Configuration of a static selection list with predefined selection

Store  a  predefined  selection

list

in  a

field  as  ReferenceData,  e.g.  order

types.  Unlike

the

ControlDataSource, the ReferenceData is a predefined list of values that the user cannot change.

1.  Define the ReferenceData in the repository.

1.  Create a new data record for each required selection option in the view "ReferenceData".

2.  Select the domain providing the data, e.g. MDOrderType

3.  Define the "type" of the ReferenceData. This type will be used as ReferenceData name in

the client, e.g. checksendaheadtype.

4.  Define the "db_key" as the actual value of the concrete data record, e.g. N.

5.  Define  the  "ref_data_key"  as  the  combined  value  of  "type"  and  "db_key",  e.g.

checksendaheadtype:N

6.  Define  the  default  value  ("is_default"),  the  designation  ("designation")  and  the  sort

sequence ("sort_key")

7.  Test deployment of the ReferenceData (see tutorial "Deployment of customizations")

2.  Open the application that you want to modify on the MOC.

3.  Right-click the layout of the detail application - "Customize layout"

4.  Select the field you want to configure.

1.  "ControlDataSource": Assign the name of the ReferenceData defined in the repository.

2.  "ControlDataSourceMode": Set Reference

3.  Set the "ControlDataSourceResult", if it is not identical to the data defined in the repository

(syntax as described above).

4.  "ControlType": Set ComboBoxEdit or RadioGroup

5.  "ControlTypeMode":  Set  e.g.  Single  for  single  selection  or  Multiple  for  multiple

selection.

MDS-MOC_Dev_Cookbook.docx

Version: 1.2.22379

Page 4 of 30

MOC Entwicklung – „Kochbuch“

5.  Save the application by clicking the button "Save".

Affected files

The changes described here affect the following files:



In the relevant application directory <MOC>\local\conf\MOC\Apps\, the file Layout<ID of

the detail application>.config of the respective detail application.



In the MOC main directory, the file

<MOC>\custom\resources\data\controldatasources\<ID of the

application>.ControlDataSources.xml when defining ControlDataSources

  There is this file on the server

<InstallDir>\jdir\MOC\1\referenceData\local\<Service-Domain>.xml if you

configure ReferenceData

Possible problems



In case of configuration errors, you can usually find the reason in the log files, e.g. typing errors in

service names, etc.

Further information

  MDS-BAS_81: Customizing of main applications, section "Selection panel"

  MDS-BAS_81: Input and output fields (to assign field properties)

  MDS-BAS_81: Sections "ControlDataSource" and "ReferenceData"

  Tutorial: "Adding and customizing fields in a detail application"

  Tutorial: "Deployment of customizations"

  Tutorial: "Adding and customizing fields in a detail application"

1.5  Deployment of customizations

Further information

  CUT-MOC: Documentation of the training CUT-MOC: Deployment for artifacts of client and server.

  MDS-BAS_81: MOC Update Package Creator

  MDS-BAS_81: Update Packages for the Maintenance Manager

1.6  Generate a new application

Create a new application or create an application including editing applications (insert, update, delete, copy)

MDS-MOC_Dev_Cookbook.docx

Version: 1.2.22379

Page 5 of 30

MOC Entwicklung – „Kochbuch“

Requirements



"MDS Development Suite" is enabled to configure applications.

  You have selected the correct scope to configure applications.

Solution: Steps to follow

Create new main application

1.  Go to: MOC "MES Development Suite" - "New application"

2.  Save the new application by clicking the button "Save".

o  Define a unique ID for the application, e.g. U_myOrders

o  Define a caption including language key, e.g. lkU_myorders

o

(Optional) Specify a help file and index, define the update rate to reload data and application

icon.

3.  Customize  the  application  and  define  selection  panel,  data  sources,  detail  applications,  toolbar

(see the corresponding tutorials).

4.  Save the application by clicking the button "Save".

Creating an application with editing dialogs

1.  Go to: MOC "MES Development Suite" - "Generate application"

2.  Select the underlying DataLogic (usually of type list or overview)

3.  Check the predefined fields for the editing dialogs you want to create

4.

If necessary, define additional dialogs in the tab "Additional functions"

5.  Generate the application by clicking "Generate".

6.  Define the application properties.

o  Define a unique ID for the application, e.g. U_myOrders

o  Define a caption including language key, e.g. lkU_myorders

o

(Optional) Specify a help file and index, define the update rate to reload data and application

icon.

7.  Save the application by clicking the button "Save".

Affected files

If you generate an application, a new directory with the ID of the new application is created in the directory

<MOC>\local\conf\MOC\Apps\. All files an application requires are stored here.

If you generate an application including editing dialogs, the application directory will include an additional

directory for each editing dialog. All configuration files required for the respective editing application are

stored in these directories.

MDS-MOC_Dev_Cookbook.docx

Version: 1.2.22379

Page 6 of 30

MOC Entwicklung – „Kochbuch“

Possible problems

  New applications are not automatically integrated into the menu. By default, you can only call the

application using the transaction code  _capp  id=<ID  of  the  application>. The tutorial

"Create or edit the menu" describes how to integrate an application into the menu.

  You  cannot  add  editing  dialogs  subsequently  to  an  application.  This  is  only  possible  using  the

application generator. You can directly change the configuration files if you only want to make minor

changes  to  the  editing  applications,  .  After  having  changed  the  files,  you  must  reload  the

configuration data (MOC menu "MES Development Suite" - "Reload configuration data").

Further information

  MDS-BAS_81: Customizing of main applications, section "Detail applications"

  MDS-BAS_81: Customizing of editing applications

1.7  Defining a conditional formatting in the grid

Configure a conditional presentation in the grid to simplify the display of information.

Requirements



"MDS Development Suite" is enabled to configure applications.

  You have selected the correct scope.

  The detail application of type "grid" is configured.

Solution: Steps to follow

1.  Open the application.

2.  Right-click the grid column - "Configure conditional display".

3.  "Add" a new configuration.

o  Configure the required display via "Appearance", e.g. red as "BackColor".

o  Configure the condition via "AppearanceDescription":







"Column": The condition is valid for the selected columns.

"Condition": Defines the type of condition to be checked, e.g. Between

"Value1" or "Value2" define the limit values, e.g. 100 as lower, 300 as upper limit.

4.  Save the changed application by clicking the button "Save".

Refer to the documentation for detailed information on how to configure the conditions to be checked.

Affected files

The changes described here affect the following files in the respective application directory

<MOC>\local\conf\MOC\Apps\:

MDS-MOC_Dev_Cookbook.docx

Version: 1.2.22379

Page 7 of 30

  The file Grid<ID of the grid detail application>.config as layout file of the detail

MOC Entwicklung – „Kochbuch“

application of type "grid".

Further information

  MDS-BAS_81: Components for detail applications, section "Table view (grid)"

1.8  Configuration of column totals in the grid

Configure totals per grid column or per grid column and group to simplify the display of information.

Requirements



"MDS Development Suite" is enabled to configure applications.

  You have selected the correct scope.

  The detail application of type "grid" is configured.

Solution: Steps to follow

1.  Open the application.

2.  Right-click the grid column - "Grid properties"

3.  Configure the property "SummaryItem"

o  SummaryType: Sum (most common), max, min, etc.

o  Special case: Use the following configuration with durations: Display format:

{0:mpdv_timespan}; SummaryType: Custom; Tag: TimeSpanSum

4.  Right-click the grid column - "Show overall column totals" to obtain a total of all data.

5.  Or: Right-click the grid column - "Show column totals for group" to obtain a total per group.

6.  Save the changed application by clicking the button "Save".

7.  Reopen the application and request data.

Affected files

The  changes  described  here  affect

the

following

files

in

the  respective  application  directory

<MOC>\local\conf\MOC\Apps\:

  The file Grid<ID of the grid detail application>.config as layout file of the detail

application of type "grid".

Further information

  MDS-BAS_81: Components for detail applications, section "Table view (grid)"

MDS-MOC_Dev_Cookbook.docx

Version: 1.2.22379

Page 8 of 30

MOC Entwicklung – „Kochbuch“

1.9  Grouping fields within a detail application

Group individual fields to improve the presentation within a detail application of type "layout".

Requirements



"MDS Development Suite" is enabled to configure applications.

  You have selected the correct scope to configure applications.

  The fields you want to group are defined in the detail application of type "layout".

Solution: Steps to follow

Group fields in groups or tabs.

1.  Open the application you want to modify.

2.  Right-click the layout of the detail application - "Customize layout"

3.

In the dialog "Customization", change to "Layout tree view".

4.

In the tree view, select all fields that you want to group (e.g. via CTRL + click).

5.

In the context menu, select "Group" or "Create tabbed group".

6.  Define a language key for the newly created group in the field CustomizationFormText of the

respective control.

7.  Save the application by clicking the button "Save".

Remove grouping of fields

1.  Open the application you want to modify.

2.  Right-click the layout of the detail application - "Customize layout"

3.

In the dialog "Customization", change to "Layout tree view".

4.  Select the group or the tab you want to remove.

5.

In the context menu, select "Clear grouping" or "Clear tabbed group".

6.  Save the application by clicking the button "Save".

Affected files

The changes described here affect the following files in the respective application directory

<MOC>\local\conf\MOC\Apps\:

  The file Layout<ID of the detail application>.config if the detail application has been

customized.

Further information

  MDS-BAS_81: Customizing of main applications, section "Selection panel"

  Tutorial: "Adding and customizing fields in a detail application"

MDS-MOC_Dev_Cookbook.docx

Version: 1.2.22379

Page 9 of 30

1.10  Creating and modifying label texts

You can create or modify label texts for MOC applications to  integrate customer-specific terminology  or

MOC Entwicklung – „Kochbuch“

translations.

Requirements



"MES Development Suite" is enabled.

  The MPDV custom dictionary mpdvDictionaryCustomer.xlm is available.

Solution: Steps to follow

Customize an existing language key.

1.

Identify the language key you want to edit in the respective MOC application.

o  The key refers to the name of the application:

  Open the dialog "Configure application" by clicking the button in the toolbar.

  The field value of "caption" is e.g. lkOrderOverview

o  The key refers to the name or the tooltip of a button:

  Open  the  "Link  editor"  by  calling  the  context  menu  in  the  toolbar  and  clicking

"Configuration".

  The field value of "Title" or "Tooltip" is e.g. lkInterrupt

o  The  key  refers  to  a  field  label  in  the  selection  panel  or  in  the  detail  application  of  type

"layout":

  Open  the  dialog  "Customization"  by  right-clicking  the  field  label  and  selecting

"Customize layout".

  Click and select the field while "Customization" dialog is open.

  The field value of "LanguageKey" is e.g. lkOrder

2.  Enter the new text for the identified language key in the custom dictionary in form of a new entry.

3.  Create the language resource files by clicking "Create resource" in the Excel file and store the files

in <MOC directory>\local\resources\languages

4.  Restart the MOC.

Define a new language key

1.  Create a new entry in the custom dictionary and assign a unique key, e.g. lkU_inspection

2.  Check if a duplicate of the key exists by clicking "Check dup. keys" in the Excel file.

3.  Create the language resource files by clicking "Create resource" in the Excel file and store the files

in <MOC directory>\local\resources\languages. Refer to the documentation for further

details on the languages you can select.

4.  Enter the new language key in the MOC application.

5.  Restart the MOC.

MDS-MOC_Dev_Cookbook.docx

Version: 1.2.22379

Page 10 of 30

MOC Entwicklung – „Kochbuch“

Affected files

The changes described here affect the following files:

- Language files in <MOC directory>\local\resources\languages

Restrictions

  You cannot assign language keys to user fields in the individual applications. This is only possible

in the user field configuration.

  You must change the language keys of column headers of a grid in the grid configuration. Right-

click  the  grid  column  and  select  "Grid  properties".  Change  the  property  "LanguageKey"  of  the

respective field in the configuration. If you want to change the language key for all identical fields,

we recommend to make the configuration in the repository.

Possible problems

  Problem: The newly configured language key is not translated in the application, but lkU_xxx is

displayed.

o  Proceed as follows: Make sure that the language key is spelled properly (case sensitive)

and that the language files are exported to the correct directory. Then restart MOC.

  Problem: The language key is translated, but is displayed in the wrong language.

o  Proceed as follows: Make sure that the language selected in the MOC has been exported

and that the file is stored in the correct directory.

o  Note: We distinguish between several language localizations, e.g.  de-AT and de-DE. If

no translation is available for the localization selected in the MOC, the system does  not

select an alternative localization, but displays the standard language (generally English).

Further information

  MDS-BAS_81: Multilingual texts in the MOC using language keys

  MDS-BAS_81: Activating the MES Development Suite

  MDS-BAS_81: Configuration settings and configuration levels

1.11  Logging and debugging

Further information

  CUT-MOC: Documentation of the training CUT-MOC: Information on the troubleshooting  on the

client and server.

MDS-MOC_Dev_Cookbook.docx

Version: 1.2.22379

Page 11 of 30

MOC Entwicklung – „Kochbuch“

1.12  Adding and customizing fields in a detail application

You can change fields in a detail application to improve the presentation of contents.

Requirements



"MDS Development Suite" is enabled to configure applications.

  You have selected the correct scope to configure applications.

  The detail application that you want to change has been generated (by default, the selection panel

is included in an application).

  The field  you  want to  add  must be available in the service, i.e. the field  is an  existing field or a

customer-specific field that has been added to the service definition in the repository client.

Solution: Steps to follow

Add a field

1.  Open the application you want to modify.

2.  Right-click the layout of the detail application - "Add item".

3.  Right-click the layout of the detail application - "Customize layout"

4.  Select the newly created element (usually at the bottom of the detail application or the selection

panel).

5.

In the dialog "Customization", change to "Layout tree view".

6.  Move the new field by drag and drop to the required position in the dialog "Customization" or directly

in the application.

o  Change  the  width  or  height  of  a  field  by  right-clicking  the  field  in  the  list  of  the

"Customization" dialog. Select "Size constraints" and "Free sizing".

o  Once you have adjusted the fields, set the "Size constraints" of all fields to "Lock size".

o  You can create an element at the bottom ("Create empty space item") to avoid that you

unintentionally change the size of the last field.

7.  Assign a "FieldName" in the dialog "Customization".

o  Use the service acronym to complete the configuration options automatically.

o

If necessary, you can define a context in form of a "ServiceName".

o  Or you must manually fill in all properties (detailed description in the documentation).

8.  Save the application by clicking the button "Save".

9.

If  necessary,  close  and  reopen  the  application  to  load  the  field  configuration  via  service

documentation.

Request field data from service

Note: If you proceed as follows, the name of the new field must match the name of the service field.

1.  Entry in the data source

MDS-MOC_Dev_Cookbook.docx

Version: 1.2.22379

Page 12 of 30

MOC Entwicklung – „Kochbuch“

10.  Open the dialog "Configure data sources"

11.  Select the data source that should provide the requested data.

12.  Click "Configure".

13.  Click "Select columns".

14.  Select the column for which you have newly defined the field in the application.

2.  Entry in the detail application

10.  Open the dialog "Configure detail application".

11.  Select the detail application that includes the newly defined field.

12.  Click "Configure".

13.  Click "Select columns".

14.  Select the column for which you have newly defined the field in the application.

3.  Save the application by clicking the button "Save".

Edit an existing field

1.  Open the application you want to modify.

2.  Right-click the layout of the detail application - "Customize layout"

3.  Select the field you want to modify.

4.  Change field parameters in the dialog "Customization" (detailed description in the documentation).

5.  Reposition the field in the application by drag and drop.

6.

If required, edit the configuration of the data sources or the detail application (see above).

7.  Save the application by clicking the button "Save".

Delete an existing field

1.  Open the application you want to modify.

2.  Right-click the field you want to delete and select "Delete item".

3.  Save the application by clicking the button "Save".

Affected files

The changes described here affect the following files in the respective application directory

<MOC>\local\conf\MOC\Apps\:

  The file Layout<ID of the detail application>.config if the detail application has been

customized.

Restrictions

You can only configure fields of detail applications of type "layout" and of the selection panel. If you want

to change other types of detail applications like charts or table views, please refer to the respective tutorials.

MDS-MOC_Dev_Cookbook.docx

Version: 1.2.22379

Page 13 of 30

MOC Entwicklung – „Kochbuch“

Possible problems

Note: The mere configuration of a new field is usually not sufficient. In addition, you must edit linked data

sources or you must make available the new field in the detail application (see above).

Further information

  MDS-BAS_81: Customizing of main applications, section "Selection panel"

  MDS-BAS_81: Input and output fields (to assign field properties)

  Tutorial "Configuration of data sources"

  Tutorial "Configuration of selection fields"

1.13  Configuration of data sources

You can create or modify label texts for MOC applications to  integrate  customer-specific terminology  or

translations.

Requirements



"MDS Development Suite" is enabled to configure applications.

  You have selected the correct scope to configure applications.

Solution: Steps to follow

1.  Open the application you want to modify.

2.  Open the dialog "Configure data sources" by clicking the button.

3.  Click the required button, e.g. "Add".

1.  Enter "ID" of the data source as unique key.

2.  Select the "Data logic". It defines the requested web service.

3.  "Events"  specify  when  the  data  source  is  requested,  e.g.  line  break  in  the  grid

(SelectionChanged of another data source) or when clicking the button "Request data"

(DataRequested).

4.  The  "Source"  defines  possible  selection  parameters,  e.g.  "Parameter  layout"  to  transfer

data from the selection panel.

1.  For the input from the selection panel, "Parameter" specifies the field name in the

selection panel, i.e. which user input is used.

2.  "Target" specifies the service field to which the user input is forwarded.

3.  "Default  operator"  defines  the  type  of  operator;  if  nothing  is  entered,  the

EqualOperator is used.

5.  Click the button "Select columns" to define the columns requested from the server.

6.  Confirm by clicking "OK".

MDS-MOC_Dev_Cookbook.docx

Version: 1.2.22379

Page 14 of 30

MOC Entwicklung – „Kochbuch“

Affected files

The changes described here affect the following files in the respective application directory

<MOC>\local\conf\MOC\Apps\:

  The file EventLinkCollection.config to map events within the application.

  The file DataControllerCollection.config which includes the configuration of data sources

and the requested columns.

Possible problems

  Problem: You cannot delete the data source.

o  Proceed as follows: Before trying to delete the data source, make sure that the data source

is not in use.

o  Note: Data sources are not only used in detail applications, they can also be referenced by

other data sources to provide parameters or in an event.

Further information

  MDS-BAS_81: Customizing of main applications, section "Data sources"

1.14  Configuration of detail applications

Modify detail applications of an application to implement customer-specific layouts or other contents.

Requirements



"MDS Development Suite" is enabled to configure applications.

  You have selected the correct scope to configure applications.

  You have configured the data source for the detail application (see tutorial "Configuration of data

sources").

Solution: Steps to follow

Create a new detail application

1.  Open the application you want to modify.

2.  Add a new detail application.

3.  Open the dialog "Configure detail application" by clicking the button.

4.  Click "Add".

1.  Define a unique ID.

2.  Define a caption according to the schema lkU_xxx.

MDS-MOC_Dev_Cookbook.docx

Version: 1.2.22379

Page 15 of 30

MOC Entwicklung – „Kochbuch“

3.  Select  the  application  category.  The  category  specifies  the  design  of  the  detail

application.  The  most  common  designs  are:  layout,  grid,  chart  (refer  to  the

documentation for further information).

4.  Select the configured data source.

5.

In case of a layout application showing a detail view of a table: Enable the option

"Show selected data records only".

5.  Click "Select columns" to define the available fields of the data source for the application.

6.  Create the new detail application by clicking "OK".

3.  Position  the  new  detail  application  within  the  application  via  docking  (see  tutorial  "Customize

application layout via docking")

4.  Save the application by clicking the button "Save".

Edit existing detail applications

1.  Open the application you want to modify.

2.  Open the dialog "Configure detail application" by clicking the button.

3.  Select the respective detail application.

4.  Click "Configure" to edit the detail application.

1.  Edit the configuration (refer to the documentation for further information).

2.  Click "OK" to confirm your changes.

5.  Save the application by clicking the button "Save".

Delete an existing detail application

1.  Open the application you want to modify.

2.  Undock the detail application by drag and drop.

3.  Open the dialog "Configure detail application" by clicking the button.

4.  Select the respective detail application.

5.  Click "Remove" to delete the detail application.

6.  Save the application by clicking the button "Save".

Affected files

The changes described here affect the following files in the respective application directory

<MOC>\local\conf\MOC\Apps\:

  The  file  DataControllerCollection.config  which  includes  the  configuration  of  the

application's data sources.

  The  file  ApplicationPluginCollection.config  which  includes  the  configuration  of  the

application's detail application.

  The file Layout<ID of the detail application>.config as layout file of the respective

detail application.

MDS-MOC_Dev_Cookbook.docx

Version: 1.2.22379

Page 16 of 30



If required, the file DockManagerCollection.config which saves the docking of the new detail

MOC Entwicklung – „Kochbuch“

application.

Further information

  MDS-BAS_81: Customizing of main applications, section "Detail applications"

  Tutorial "Customize application layout via docking"

1.15  Adding and customizing fields in the selection panel

You can change fields in the selection panel to improve the presentation of contents.

Requirements



"MDS Development Suite" is enabled to configure applications.

  You have selected the correct scope to configure applications.

  The field  you  want to  add  must be available in the service, i.e. the field  is an  existing field or a

customer-specific field that has been added to the service definition in the repository client.

Solution: Steps to follow

Add a field

1.  Open the application you want to modify.

2.  Right-click the selection panel - "Add item".

3.  Right-click the selection panel - "Customize layout".

4.  Select the newly created element (usually at the bottom of the detail application or the selection

panel).

5.

In the dialog "Customization", change to "Layout tree view".

6.  Move  the  new  field  by  drag  and  drop  and  assign  the  properties  (for  details,  refer  to  the  tutorial

"Adding and customizing fields in a detail application").

7.  Save the application by clicking the button "Save".

8.

If  necessary,  close  and  reopen  the  application  to  load  the  field  configuration  via  service

documentation.

Use entered values as filter parameters

1.  Entry in the data source

1.  Open the dialog "Configure data sources"

2.  Select the data source you want to query when clicking "Request data".

3.  Click "Configure".

4.

In the group "Parameter", the source "Parameter layout" is selected.

5.

In the grid, select the row with the values "Source" = ParameterLayout and "Parameter"

= Name of the newly defined field.

MDS-MOC_Dev_Cookbook.docx

Version: 1.2.22379

Page 17 of 30

6.

In the column "Target" of this row:  Enter the service  parameter to  which this parameter

MOC Entwicklung – „Kochbuch“

value is to be transferred.

2.  Save the application by clicking the button "Save".

Edit an existing field

1.  Open the application you want to modify.

2.  Right-click the selection panel - "Customize layout".

3.  Select the field you want to modify.

4.  Change field parameters in the dialog "Customization" (detailed description in the documentation).

5.  Reposition the field by drag and drop.

6.

If required, edit the configuration of the data source (see above).

7.  Save the application by clicking the button "Save".

Delete an existing field

1.  Open the application you want to modify.

2.  Right-click the field you want to delete and select "Delete item".

3.  Save the application by clicking the button "Save".

Affected files

The changes described here affect the following files in the respective application directory

<MOC>\local\conf\MOC\Apps\:

  The file LayoutPanel.config which is the configuration file of the selection panel.

Possible problems

Note: The mere configuration of a new field is usually not sufficient. In addition, you must edit linked data

sources (see above).

You cannot use all parameters that are available in a service as filter parameters in the selection panel. In

the service definition of the repository, set the value isFilterParameter to true.

Further information

  MDS-BAS_81: Customizing of main applications, section "Selection panel"

  MDS-BAS_81: Input and output fields

  Tutorial "Configuration of data sources"

  Tutorial: "Adding and customizing fields in a detail application"

1.16  Configuration of a dependent data source

Configure a data source that refers to another data source to request data (master-detail relationship).

MDS-MOC_Dev_Cookbook.docx

Version: 1.2.22379

Page 18 of 30

MOC Entwicklung – „Kochbuch“

Requirements



"MDS Development Suite" is enabled to configure applications.

  You have selected the correct scope to configure applications.

  The master data source has already been created (see tutorial "Configuration of data sources").

Solution: Steps to follow

Example "Order overview": Selection of all operations (detail data source) of an order (master data source).

The order number (order.id) is used for mapping. All operations of the selected order are then displayed in

the detail table.

1.  Open the application you want to modify.

2.  Open the dialog "Configure data sources" by clicking the button.

3.  Click the required button, e.g. "Add".

1.  Enter "ID" of the data source as unique key.

2.  Select the "Data logic". It defines the requested web service.

3.  The "Events" specify when the data source is requested. Here, you must select <master

data source>: SelectionChanged.

4.  As "Source" it might be useful to select the master data source including the corresponding

parameter mapping.

5.  Click "OK" to confirm data input.

4.  Save the application by clicking the button "Save".

Affected files

The changes described here affect the following files in the respective application directory

<MOC>\local\conf\MOC\Apps\:

  The file EventLinkCollection.config to map events within the application.

  The file DataControllerCollection.config which includes the configuration of data sources

and the requested columns.

Further information

  MDS-BAS_81: Customizing of main applications, section "Data sources"

  Tutorial "Configuration of data sources"

1.17  Creating or editing the menu

You can create a custom menu to have quick access to important entries and integrate custom applications

into the menu.

MDS-MOC_Dev_Cookbook.docx

Version: 1.2.22379

Page 19 of 30

MOC Entwicklung – „Kochbuch“

Requirements

  You have selected the correct scope.

Solution: Steps to follow

Create a custom menu

1.

In the MOC, select "Extras" - "Menu editor".

2.  Select the menu you want to edit in the drop-down list. Open this menu by clicking "Load".

3.  We recommend not to overwrite the two standard menus, but to create a custom menu.

1.  Load the menu you want to edit.

2.  Define a name in the drop-down.

3.  Save

4.  Edit the loaded menu (refer to the documentation for further information):

o  via buttons (add menu, delete entry),

o  edit text directly in the tree structure or

o  add new applications from the function list on the left by drag and drop.

o  Define parameters by clicking "Advanced settings".

5.  Save the modified menu.

6.  Select the menu via "Extras" - "Configuration" - "Select menu". The selected menu is filed in the

user scope.

Add a custom application to the menu

1.  Create a custom application (see tutorial "Generate applications")

2.  Call  the  new  application  via  transaction  code  _capp  id=<application  name>  for  test

purposes.

3.  Enter an authorization key if you want to avoid that any user can open the application.

o  Create a new entry in the file <MOC

directory>\local\resources\data\authorizations\LocalApps.Authorization.xml.

o  AuthorizationId: Assign the ID of the application; AuthorizationKey: Assign an authorization key

of max. 15 characters.

o

If the file or folder structure is not available, use the menu template of the training documentation to

create it.

4.  Enter a function authorization for the authorization key in order to assign authorizations to users.

o  Create a new entry in the file <MOC

directory>\local\resources\data\authorizations\FunctionAuthorisationMappings\functionaut

horisation.txt.

o  The syntax is: <function authorization>;<authorization key>

o

If the file or folder structure is not available, use the menu template of the training documentation to

create it.

5.  Enter the application in the list of available applications.

MDS-MOC_Dev_Cookbook.docx

Version: 1.2.22379

Page 20 of 30

MOC Entwicklung – „Kochbuch“

o  Create a new entry in the file <MOC directory>\local\resources\data\functions\functions.xml.

o  Use  the  ID  of  the  application  as  LinkId  and  the  name  as  Label.  As  Parameter,  enter  the

id=<application ID>. Optionally, you can define a transaction code.

o

If the file or folder structure is not available, use the menu template of the training documentation to

create it.

6.  Optional:  Test  the  defined  transaction  code  (an  error  message  pops  up  because  of  missing

authorization).

7.  Optional: Assign the required authorization to the current user for test purposes.

1.  On the MOC: "System administration" - "User admininstration" - "Function authorizations"

2.  Add a new entry to the current user and assign the function authorization from

functionauthorisation.xml.

8.  Restart the MOC.

9.  Add the application to the menu, see "Creating a custom menu".

Affected files

Each menu is stored in a specific directory in <MOC directory>\local\conf\MOC\Menues. Each

menu includes a main file that references the files of the individual groups of the menu. Each group again

includes a subdirectory with one file per menu entry.

Possible problems

  Problem: You cannot select the new menu in "Extras" - "Configuration".

o  Proceed as follows: Make sure that you are in the correct scope (local or user).

  Problem: After having edited the XML files of the menu manually, the MOC does not start.

o  Proceed as follows: Make sure that the configuration files do not include inconsistencies,

e.g. ensure that the indicated number of elements matches the actual number of existing

entries.

o  Note: We generally recommend to use the menu editor to avoid corruption of the menu

configuration.

  Problem: The menu editor does not show your custom application.

o  Proceed as follows: Make sure that  you have added the correct entries to all three files

(authorization key, mapping to function authorization and you have made the application

available  for  the  menu).  It  is  of  special  importance  that  the  authorization  keys  of

LocalApps.Authorization.xm and functionauthorisation.xml are identical.

o  Tip: Assign a transaction code for test purposes and check, if you can call the application

using this code (see above).

o  Note: You must restart the MOC to enable the changes in these files.

MDS-MOC_Dev_Cookbook.docx

Version: 1.2.22379

Page 21 of 30

MOC Entwicklung – „Kochbuch“

Further information

  MDS-BAS_81: Customizing files for menus

  Tutorial "Generating applications"

1.18  Customizing application layout via docking

You can position the detail applications in an MOC application and thus create a customer- or user-specific

application layout.

Requirements



"MES Development Suite" is enabled.

  You have selected the correct scope to configure applications.

Solution: Steps to follow

1.  Move the detail application by drag and drop to the required position.

2.  Save the changed application layout by clicking the toolbar button "Save".

Affected files

The changes described here affect the following files:

- <MOC directory>\local\conf\MOC\Apps\<application name>\DockManagerCollection.config

Possible problems

  Problem: The application layout is misconfigured and you want to return to the original state. The

application is still open.

o  Proceed as follows: Close the application without clicking the "Save" button. All changes

since the last time the application was saved are discarded.

o  Note: We recommend to make a backup copy of the application directory before editing

the layout.

Further information

  MDS-BAS_81: Customization of application layout

  MDS-BAS_81: Activating the MES Development Suite

  MDS-BAS_81: Configuration settings and configuration levels

1.19  Customizing symbols and images

You can replace symbols and images with customer-specific icons, start screens and logos.

MDS-MOC_Dev_Cookbook.docx

Version: 1.2.22379

Page 22 of 30

MOC Entwicklung – „Kochbuch“

Requirements

  You have selected the correct scope.

Solution: Steps to follow

1.  Adjust size of the new graphic (refer to the documentation for details).

2.  Save  the  graphic  with  an  appropriate  name  (case  sensitive;  refer  to  the  documentation  for

specifications).

3.  File in the directory <MOC directory>\local\resources\images.

4.

(Re)start the MOC.

Affected files

When customizing symbols and images, the original files are not overwritten. Only the files in the

directory <MOC directory>\local\resources\images are modified or added.

Possible problems

  Problem: The graphic has been copied to the correct storage location but it is not loaded.

o  Proceed as follows: Make sure that the file name is properly spelled (case sensitive, file

type) and that the file is stored in the local or user scope.

Further information

  MDS-BAS_81: Customization of symbols

  MDS-BAS_81: Configuration settings and configuration levels

1.20  Adding and customizing buttons in the toolbar

You can add a new button to the toolbar or configure an existing button.

Requirements



"MES Development Suite" is enabled.

  You have selected the correct scope to configure applications.

Solution: Steps to follow

1.  Open the "Link editor" by calling the context menu in the toolbar and clicking "Configuration".

2.  Add a new ApplicationCommandLink by clicking "New".

1.  Assign any ID and command.

2.  Select function. Possible values: see documentation.

3.  Enter the parameters matching the function.

MDS-MOC_Dev_Cookbook.docx

Version: 1.2.22379

Page 23 of 30

MOC Entwicklung – „Kochbuch“

4.  Specify via the "Authorization key" if a button is enabled or grayed out.

5.  The authorization key entered in the field "Visibility" controls if a button is displayed or not.

6.  You must enter a language key in the field "Title". If the field "Tooltip" is empty, the value

of "Title" is taken over when saving the changes.

7.  "Category" and "Ribbon page" specify the position of the button within the toolbar.

8.  "Disabled".

9.  The  button

"Shortcut"  opens  a  dialog

to  define  a  shortcut

that

runs

the

ApplicationCommandLink when the application is active.

10.  If you check the option "Disabled", you can hide an existing button (of a higher scope). If

you want to reactivate the button, you must do this in the configuration file.

11.  You can configure an image from the MOC resources for the button layout. It depends on

the size  of the toolbar and the number of buttons to  be shown,  if the small or the large

image is displayed. You cannot influence or change this.

3.  Confirm the changes by clicking "OK".

4.  You must save the application configuration. Restart the application to enable the configuration.

Affected files

The button configuration is stored within the application configuration in the file

ApplicationCommandLinkCollection.config. Each button requires separate configuration.

Restrictions

You  cannot  customize  buttons  of  the  groups  "Data",  "Customizing",  "Settings"  and  "Help"  as  described

above.

Further information

  MDS-BAS_81: Toolbar

  MDS-BAS_81: Activating the MES Development Suite

  MDS-BAS_81: Configuration settings and configuration levels

  MDS-BAS_81: Authorization

1.21  Configuring a detail application of type "chart"

You can configure a detail application as chart to visualize data in a graphic manner.

Requirements



"MDS Development Suite" is enabled to configure applications.

  You have selected the correct scope.

  You have configured the data source providing data for the chart.

MDS-MOC_Dev_Cookbook.docx

Version: 1.2.22379

Page 24 of 30

MOC Entwicklung – „Kochbuch“

Solution: Steps to follow

1.  Open the application you want to modify.

2.  Open the dialog "Configure detail application" by clicking the button.

3.  Create a new detail application by clicking "Add".

o  Define an ID that is unique in the application.

o  Assign a caption as language key, e.g. lkU_myChart.

o  Select the application category Chart.

o  Select the data source that provides the necessary data to fill the chart.

4.  Select the columns you want to integrate in the application by clicking "Select columns".

5.  Position the chart in the application via docking.

6.  Save the changed application by clicking the button "Save".

7.  Before configuring the chart, request data once.

8.  Open the chart wizard by double-clicking the chart.

1.  Select the chart type and confirm by clicking "Next".

2.  Select the "appearance" and confirm by clicking "Next".

3.  Define the "series" to be displayed. Define one series for each data source field you want

to display. Confirm by clicking "Next".

4.  Configure "Data":

  Define the "Value" of the field to be shown for this series, e.g. yield of an order.

  Define the "Argument" for the grouping of values, e.g. grouping of yield per person.

5.

[Optional] Define further layout properties of the chart.

6.  Confirm by clicking "Finish".

9.  Save the application by clicking the button "Save".

Refer to the documentation for details on the configuration of special chart types.

Affected files

The  changes  described  here  affect

the

following

files

in

the  respective  application  directory

<MOC>\local\conf\MOC\Apps\:

  The  file  ApplicationPluginCollection.config  which  includes  the  configuration  of  the

application's detail application.

  The  file  DockManagerCollection.config  which  saves  the  docking  of  the  new  detail

application of type "chart".

  The file Chart<ID  of  the  detail  application>.config: the configuration of the detail

application.

  The  file  DataControllerCollection.config  which  includes  the  configuration  of  the

application's data sources if the service requests further columns.

MDS-MOC_Dev_Cookbook.docx

Version: 1.2.22379

Page 25 of 30

MOC Entwicklung – „Kochbuch“

Further information

  MDS-BAS_81: Components for detail applications, section "Charts"

  Tutorial "Configuration of data sources"

  Tutorial: "Configuration of detail applications"

1.22  Configuring a detail application of type "table"

You can configure a detail application as grid to visualize data in tabular form.

Requirements



"MDS Development Suite" is enabled to configure applications.

  You have selected the correct scope.

  You have configured the data source providing data for the grid.

Solution: Steps to follow

Adding a detail application of type "grid"

1.  Open the application you want to modify.

2.  Open the dialog "Configure detail application" by clicking the button.

3.  Create a new detail application by clicking "Add".

o  Define an ID that is unique in the application.

o  Assign a caption as language key, e.g. lkU_myGrid

o  Select the application category Tabellenansicht

o  Select the data source that provides the necessary data to fill the table.

4.  Select the columns you want to integrate in the application by clicking "Select columns".

5.  Position the grid in the application via docking.

6.  Save the changed application by clicking the button "Save".

Refer to the documentation for details on the configuration of the table grid.

Adding a column to the grid

If a new field is available in the service and you want to display this field in the detail application of type

"table", proceed as follows:

1.  Open the application you want to modify.

2.  Request the new field of the service.

1.  Open the dialog "Configure data sources", select the data source defined for the grid.

2.  Click "Configure" to edit the data source.

3.  Open the dialog "Select columns" by clicking the button.

4.  Select the new field and confirm the changes.

MDS-MOC_Dev_Cookbook.docx

Version: 1.2.22379

Page 26 of 30

MOC Entwicklung – „Kochbuch“

3.  Make the field available in the detail application.

1.  Open the dialog "Configure detail application", select the grid.

2.  Click "Configure" to edit the grid.

3.  Open the dialog "Select columns" by clicking the button.

4.  Selct the new field and confirm the changes.

4.  Add the column in the grid.

1.  Right-click the grid column, "Add column".

2.  Define the new column.

  Name: define unique name.

  Field name: Field name of the service, e.g. order.id

  Caption: The header in the grid (defined by a language key).

  Category: to group the columns.

5.  Save the application by clicking the button "Save".

Affected files

The changes described here affect the following files in the respective application directory

<MOC>\local\conf\MOC\Apps\:

  The  file  ApplicationPluginCollection.config  which  includes  the  configuration  of  the

application's detail application.

  The  file  DockManagerCollection.config  which  saves  the  docking  of  the  new  detail

application of type "table".

  The  file  Grid<ID  of  the  detail  application>.config:  the  configuration  of  the  detail

application which is created when you add a detail application of type "table".

  The  file  DataControllerCollection.config:  the  configuration  of  the  application's  data

sources if further columns are added or requested by the service.

Possible problems

  Problem: A wrong language key has been assigned to the added column. The language key must

be changed.

o  Proceed as follows: Right-click the grid column - "Grid properties". Select the proper field

in the drop-down list. Change the property "LanguageKey" to the required value. Save the

application.

o  Note: You must restart the application to enable the changes.

Further information

  MDS-BAS_81: Components for detail applications, section "Table view (grid)"

  Tutorial "Configuration of data sources"

MDS-MOC_Dev_Cookbook.docx

Version: 1.2.22379

Page 27 of 30

MOC Entwicklung – „Kochbuch“

  Tutorial: "Configuration of detail applications"

1.23  Configuring a detail application of type "pivot"

You can configure a detail application or type "pivot" to visualize data in a pivot table.

Requirements



"MDS Development Suite" is enabled to configure applications.

  You have selected the correct scope.

  You have configured the data source providing data for the pivot table.

Solution: Steps to follow

6.  Open the application you want to modify.

7.  Open the dialog "Configure detail application" by clicking the button.

8.  Create a new detail application by clicking "Add".

o  Define an ID that is unique in the application.

o  Assign a caption as language key, e.g. lkU_myChart.

o  Select the application category PivotTabelle

o  Select the data source that provides the necessary data to fill the pivot table.

9.  Click "Select columns" to select the columns you want to transfer into the application, i.e. for the

fields that are available in the pivot table.

10.  Position the pivot table in the application via docking.

11.  Save the changed application by clicking the button "Save".

12.  Configure the pivot table.

o  Right-click "Drag filter fields here" - "Show all fields" or "Show field list". Drag and drop the

fields required for the pivot table.

o  Assign the fields to column fields and row fields to group the data by these fields.

o  Assign the fields to data fields to display the data in the pivot table.

o  Configure  the  chart  added  below  by  double-clicking  the  chart  (see  tutorial  "Configure  a

detail application of type "chart").

13.  Save the changed application by clicking the button "Save".

Refer to the documentation for details on the configuration possibilities.

Affected files

The changes described here affect the following files in the respective application directory

<MOC>\local\conf\MOC\Apps\:

MDS-MOC_Dev_Cookbook.docx

Version: 1.2.22379

Page 28 of 30

MOC Entwicklung – „Kochbuch“

  The  file  ApplicationPluginCollection.config  which  includes  the  configuration  of  the

application's detail application.



If required, the file DockManagerCollection.config which saves the docking of the new detail

application of type "pivot".

  The file Pivot<ID  of  the  detail  application>.config: the configuration of the detail

application.

  The  file  DataControllerCollection.config  which  includes  the  configuration  of  the

application's data sources if the service requests further columns.

Further information

  MDS-BAS_81: Components for detail applications, section "Pivot"

  Tutorial "Configuration of data sources"

  Tutorial: "Configuration of detail applications"

  Tutorial: "Configuring a detail application of type 'chart'"

1.24  Protecting a field via authorization

You can protect a new field of an application and a service so that a missing server component cannot lead

to an error in the client.

Requirements

  The field a_acronym has been defined in the application A

  The field a_acronym is available in the requested service of the domain a_dom.

Solution: Steps to follow

1.  Use an authorization key to protect the field a_acronym.

1.  Create a new key in the repository client in the dialog "Authorization".

2.  Domain = a_dom

3.  Authorization Id = a_acronym (the field you want to protect)

4.  Authorization type = Acronym

5.  Authorization key: select an individual key a_authkey

6.  Export the data into the respective domain + runtime structure.

2.  Define the mapping: authorization key - FeatureSet.

1.

In

the

domain  MOC

authorization

(in

products),

edit

the

file  %MOC

authorization%bin\resources\data\authorizations\FeatureSetMappings\featureset.txt

2.  Add  the  entry  a_featureSet;a_authkey.  Here:  a_featureSet  specifies  the new  FeatureSet  that

you want to define.

3.  Create the FeatureSet.

MDS-MOC_Dev_Cookbook.docx

Version: 1.2.22379

Page 29 of 30

MOC Entwicklung – „Kochbuch“

1.  Check out the corresponding server domain.

2.  Create  a  new  FeatureSet  mapping  in  the  directory  %Service%\ConfigManager

a_featureSetMappingFile.xml

3.  Define  contents  according  to  the  documentation,  e.g.  check  in  the  FeatureSet

a_featureSet if a database patch is available. The field a_acronym that  you  want to

protect  is  only  activated,  if  the  patch  assigned  in  the  FeatrueSet  has  actually  been

executed.

4.  Edit the FeatureSet Excel file as list of all available FeatureSet mappings.

4.  Deployment

of

the

FeatureSet

configuration

on

the

server

to

%InstallDir%\JDIR\MOC\1\configManager\standard

5.  Restart the Tomcat.

The client field is protected by the defined authorization key and only visible, if this key is enabled. The

authorization key is enabled if the corresponding FeatureSet mapping is found and enabled. This is only

the case if the customization has been imported into the server and the feature set is thus available.

Further information

  Documentation MDS-BAS

MDS-MOC_Dev_Cookbook.docx

Version: 1.2.22379

Page 30 of 30

