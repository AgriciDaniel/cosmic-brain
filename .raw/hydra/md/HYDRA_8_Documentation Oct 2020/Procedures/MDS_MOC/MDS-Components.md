Components

1  Components

The  following  sections  describe  the  components  (application  plug-ins)  that  you  can  integrate  in  detail

applications to display data.

1.1  Table view (grid)

The grid is used to display data in a tabular form. It provides several columns, which are grouped in so-

called categories.

If you place a detail application of the "Table view" type on an application, all columns and categories are

created automatically using the specified data source and according to the Data Description. On basis of

this "default setting", you can then configure the grid.

Most configuration options are provided in the main context menu. Right-click a column header to open

this  context  menu.  If  the  Customizing  mode  is  not  enabled,  some  of  the  options  are  not  available.  The

sections in the following mainly concentrate on the functions of this main context menu.

Grid properties

You can use the dialog "grid properties" to make advanced configurations for the column properties. To

edit the properties of a column, select the column in the selection list (default is the column clicked on).

The most important properties are:

  LanguageKey: Language key used for the column header. Important: Changes of the column header

via the "Caption" property  are invalid because they are overwritten  with this configuration. Changes

only become visible after closing and re-opening the application.

  Tooltip: Text displayed when the mouse is moved over the column header.

  FieldName: Name of the field from DataDescription, whose values are displayed in this column.

  SummaryItem: Formatting of column totals (see 0)

  BackColorField: Field name of column that specifies the color code for the background color. There

are  columns  that  include  numerical  color  codes.  If  you  specify  their  field  names  for  a  column,  the

respective color code is used for the background color of the column. You can use the configurator to

hide the color column.

  ForeColorField: see BackColorField. Here, you specify the font color.

  HyperLinkField: Field  name of column used for the hyperlink of this column. Some columns include

URLs. If you enter their field name for a column, a double click on a field of the original column opens

a  URL.  If  the  URL  is  a  mail  address,  a  "mailto"  is  automatically  added.  You  can  hide  the  actual

hyperlink column during this process.

MDS-Components.docx

Version: 1.2.14445

Page 1 of 32

Components

Moving columns/categories

You can move all columns and categories in the grid using drag and drop. Use the column configurator to

hide  columns  or  categories  (main  context  menu,  Column  chooser). When  the  configurator  is  open,  you

can simply move the columns and categories that you want to hide. You can also use the configurator to

show hidden columns and categories.

Sorting

To  sort  the  grid  by  specific  columns,  simply  click  the  header  of  the  respective  column.  If  you  click  the

same column a second time, sorting is changed from ascending to descending. If you click a new column,

the previous sorting is discarded unless the shift button is pressed at the same time.

You can also use the menu for sorting. The options  Sort ascending,  Sort descending  and Clear sorting

have the same effect.

 Filter

In the grid, you can filter by specific values in the columns. Just click the pin next to the column header. A

selection list of all values in this column is shown. This is the same procedure as filtering in MS Excel.

If you have set a filter for a column, this filter is displayed at the bottom left of the grid. Click the checkbox

to remove the filter.

You  can  edit  and  refine  the  filter  subsequently.  For  this  purpose,  the  button  "Edit  filter"  is  shown  at  the

bottom right of the grid. Click the button to open the filter editor that you can use to combine several filter

criteria.

  Red text: Click the red text to open a list of possible linking methods for several filters.

  Blue  text:  Click  to  show  a  list  of  columns  included  in  the  grid.  You  can  define  a  filter  for  these

columns.

  Green text: Click to show the list of available comparators for a filter.

  Plus: A new filter is added.

  Cross: The respective filter is removed.

You can also open the filter editor via the menu.

MDS-Components.docx

Version: 1.2.14445

Page 2 of 32

Components

Grouping

You  can  group  the  grid  by  one  or  several  columns  using  drag  and  drop.  To  this  end,  drag  a  column

header to the field on top of the grid

Right-click the "group by" field to open  a dialog.  Maximize/Minimize expands/collapses all  groups. Click

"Clear  grouping"  to  delete  the  complete  grouping.  You  can  also  drag  and  drop  the  column  back  to  the

grid.

You can also use the menu for grouping. Select Group by this column. You can change the visibility of the

field by selecting Show/hide group by box.

Add/remove columns

You can manually add new columns to a grid. If you click Add column, a dialog opens. Enter the following

values to create new columns:

  Name: Clear name of column

  Field name: Name of the field from DataDescription, whose values are displayed in this column.

  Header: Language key used for the column header.

  Category: Column category to which the column is to be allocated. The category must already exist.

You can also move the column to another category subsequently.

Click Remove column to remove columns from the grid.

Add/remove categories

Use the menu function Add category to add new column categories. The name entered should be a valid

language key in order to ensure correct translation.

Use Remove category to remove a category from the grid. Note: This is only possible with categories that

do not include any columns.

Use Rename category to change the name of a category.

Fix categories

You  can  fix  column  categories  on  the  left  hand  side  of  the  grid  using  the  menu  function  “Fix  category”.

This means that the fixed category is no longer affected when scrolling through the grid. This is useful if

you want to permanently show one category, irrespective of the scrolling position.

The category might be moved to the left if it is fixed.

MDS-Components.docx

Version: 1.2.14445

Page 3 of 32

Components

Column totals

In the grid, you can show the sum total for groups (Show column totals for group) and for overall columns

(Show overall column totals).

You  can  define  the  calculation  of  the  sum  totals  via  grid  properties  in  SummaryType  of  the  required

column:

  DisplayFormat: Format string used to format the display. Possible formats are standard formats, e.g.

{0:n0}, or the custom format {0:mpdv_timespan}. You can use the latter to specify a time for a value in

seconds.

  FieldName: Name of the field from DataDescription, whose values are displayed in this column.

  SummaryType: there are different types of summaries. The most common ones are Sum, Count and

Custom (see DisplayFormat and Tag). Tag: Only required if the custom format {0:mpdv_timespan} is

used. In this case, TimeSpanSum must be entered here.

Conditional display

You can change the presentation of a grid column depending on the value in the cells. Open the dialog

Configure conditional display that lists the conditions that are already configured. The name of a condition

is composed of the major properties of that condition. Click Add or Edit to open the following dialog where

you can edit a new or an existing condition:

MDS-Components.docx

Version: 1.2.14445

Page 4 of 32

Components

In  the  image,  all  cells  of  the  column  operation.plan.yield.primary  are  colored  in  red,  if  their  value  is

between 100 and 150.

  Appearance:  Appearance  summarizes  all  properties  that  affect  the  display  of  a  grid  column.  For

example, you can change the text type or the background color. If a cell of the selected column fulfills

the condition defined below, the specified appearance is used for this cell.

  Column: Column the condition is defined for.

  Condition: Condition to be met.

  Value1: First comparative value.

  Value2: Second comparative value (e.g. if Condition = Between)

  Expression: You can define an expression that specifies the condition for the formatting. In this case,

Expression  must  be  specified  for  the  Condition  (Condition  =  Expression).  You  use  the  “Condition

expression  editor”  to  define  an  expression  (to  open  the  editor,  click  the  three  dots  in  field

"Expression"):

MDS-Components.docx

Version: 1.2.14445

Page 5 of 32

Components

The following objects are available for the definition of the expression:

  Functions: selection of mathematical functions and standard functions to edit date values,

numeric values and character strings

  Operators: selection of logical operators

  Fields: available columns

  Constants: constant values

It  is  useful  to  create  the  required  expression  by  double-clicking  the  different  functions,  operators,

fields and constants, instead of editing them manually because this is less error-prone.

On  the  right  hand  side  of  the  editor,  the  individual  functions,  operators,  fields  and  constants  are

described.

An  error  message  is  displayed  when  the  dialog  is  left  if  the  expression  defined  does  not  meet  the

specified syntax.

MDS-Components.docx

Version: 1.2.14445

Page 6 of 32

Components

Column width

You can change the column width if you simply "drag" the column. Move the mouse pointer over the edge

of a column. The mouse pointer changes and the edge can be dragged to change the column width.

You  can  use  the  menu  to  set  the  optimum column  width  of  a  column  (Optimum  column  width)  or  of  all

columns  (Optimum  column  width  -  all  columns).  To  identify  the  optimum  width  of  a  column,  the  system

uses the contents of the relevant column.

Selection of Several Lines

If the menu item Allow for several lines to be selected is marked, the user can select several lines in the

grid at the same time.

Configuration file

If a new application of the grid type is created, a separate configuration file is generated  - as with most

other  detail  application  types,  too.  This  file  is  stored  in  the  application  directory  and  is  called

Grid<Name_of_application>.config.  All  customizing  possibilities  described  above  have  an  effect  on  the

contents of this file. Optionally, manual editing is also possible. The file includes the following sections:

  Layout:  Layout  of  grid  (columns,  categories,  grid-internal  properties):  This  xml  structure  is

automatically read by the DevExpress grid and must therefore have a specific structure.

  GroupPanelShown: specifies if the field ("group by") is displayed

  SummaryShown: specifies if the totals line is displayed

  GroupSummaryShown: specifies if totals lines for groups are displayed

  MultipleRowSelection: specifies if several lines can be selected at a time

  Styles: List of conditional formattings

1.2  Master Detail Grid
The Master Detail Grid is a hierarchical grid, i.e. the data is displayed on several hierarchical levels. The

grid can include any number of levels. At each level (except the top level), there might be several grids.

MDS-Components.docx

Version: 1.2.14445

Page 7 of 32

Components

The following example explains the structure of the Master Detail Grid and the steps that are required to

configure a detail application for this grid.

Basic data structure

The data source for a "normal" grid is a DataTable. Since a Master Detail Grid includes several levels, a

DataSet,  i.e.  a  collection  of  several  interlinked  DataTables  is  used  here.  The  levels  of  a  grid  have  a

specific relationship to each other. Therefore, also the relations between the different DataTables within a

DataSet must be specified.

The  data  for  the  grid  are  requested  "on  demand".  This  means  that  only  the  data  for  the  top  level  are

requested first. Clicking on the cross next to a data record will display another level. The data shown on

this level is only requested when the level is expanded, indeed only the data displayed.

Example

The  following  sections  follow  this  example:  the  first  level  shows  orders,  the  second  level  shows

operations. On a third level, production resources, tools and components are shown.

MDS-Components.docx

Version: 1.2.14445

Page 8 of 32

Components

The image shows the structure of the DataSet with 4 DataTables from the example above.

Clicking  on  the  green  arrow  will  consequently  request  all  orders  first.  This  data  is  inserted  into  the  first

DataTable (BOOrderOverview) within the Result DataSet. The order xyz is now expanded. All operations

for this order are identified and added to the DataTable BOOrderOverview. If you also expand the order

abc, the relevant operations are identified for this order, too, and the DataTable BOOperationOverview is

added.

Inserting a detail application of type Master Detail Grid

If  you  want  to  add  a  new  Master  Detail  Grid  to  an  application,  this  application  must  be  configured  as

follows:

Data sources

You must add data sources for each level of the grid.

MDS-Components.docx

Version: 1.2.14445

Page 9 of 32

Components

The configured data sources of the example.

Note the following when you configure the individual data sources:

  The data source for the top level will usually react to a click on the "green arrow". The selection panel

provides the required parameters. You must configure this accordingly.

  The inferior data sources must be configured as follows:

  Events: Select the MasterRowExpanded event of the superior data source

  Source: Select the superior data source

  Parameter: Map all parameters that define the relationship between the two data sources (as in

each master detail relationship)

Detail application
A new detail application must be added to the application. Configure as follows:

  Application category: Master Detail Table

  Data source: Select data source for top level

  Additional data sources: all other data sources whose data is to be shown in the grid

Configuration of the "Additional data sources" for the example.

MDS-Components.docx

Version: 1.2.14445

Page 10 of 32

Components

Initializing the configuration file

If  you  create  a  new  detail  application  (see  step  above)  and  you  save  the  application,  the  system

automatically creates a configuration file that includes the layout definition of this detail application. The

name of this file is MasterDetailGrid<Name of detail application>.config.

The contents of a configuration file for a MasterDetailGrid are very similar to those of a "normal" grid. The

only  difference  is  that  the  settings  are  available  several  times  –  once  for  each  detail  grid.  To  uniquely

identify the settings, the name of the respective data source is added.

See also: 1.1.

Important notes:

a) There are other, MDG-specific (MasterDetailGrid) properties that are missing in the configuration file of

a  "normal"  grid.  So  far,  side  effects  for  the  missing  entry  AllowExpandEmptyDetails  are  known.  If  this

property  is  set  to  false  (which  unfortunately  is  the  default  setting),  the  MDG  nodes  are  always  only

expanded upon the second click and only if data is available. The entry is as follows:

<property name="OptionsDetail" isnull="true" iskey="true">

   <property name="SmartDetailExpandButtonMode">AlwaysEnabled</property>

   <property name="AllowExpandEmptyDetails">true</property>

</property>

b) In order to hide the title line on lower levels (e.g. for reasons of space), the following must be added in

the layout section of the superior level:

<property name="RowSeparatorHeight">0</property>

<property name="OptionsDetail" isnull="true" iskey="true">

   <property name="SmartDetailExpandButtonMode">AlwaysEnabled</property>

   <property name="AllowExpandEmptyDetails">true</property>

   <property name="ShowDetailTabs">false</property>

</property>

<property name="ColumnPanelRowHeight">-1</property>

The respective entry is ShowDetailTabs = false in OptionsDetail.

c) Tab label texts: by default, the label texts of tabs are made up of the translation of "lk" + name of the

respective data source. Or: If you want a different label text, you can manually add an additional setting in

the configuration file.

MDS-Components.docx

Version: 1.2.14445

Page 11 of 32

  <Setting

Key="TabTitle_xxx"

Description=""

LastChanged="2010-04-

13T17:42:58.0115088Z" ValueType="System.String" Version="0.0.0.0">

Components

    <Value>

      <string>lkTitle</string>

    </Value>

  </Setting>

d)  User  fields:  the  user  fields  for  each  individual  level  must  currently  be  added  manually  into  the

configuration file. Configure as follows:

  <Setting  Key="UserFieldObjectType_xxx"  Description=""  LastChanged="2011-07-

25T18:49:05.2387406Z" ValueType="System.String" Version="0.0.0.0">

    <Value>

      <string>CPAN</string>

    </Value>

  </Setting>

  <Setting

Key="UserFieldKey_xxx"

Description=""

LastChanged="2011-07-

25T18:49:05.2387406Z" ValueType="System.String" Version="0.0.0.0">

    <Value>

      <string>FEP</string>

    </Value>

  </Setting>

  <Setting  Key="UserFieldPraefix_xxx"  Description=""  LastChanged="2011-07-

25T18:49:05.2387406Z" ValueType="System.String" Version="0.0.0.0">

    <Value>

      <string>inspectionrequirement</string>

    </Value>

  </Setting>

Relations

In addition to the grid configuration for each level of the Master Detail Grid, you must define the relations

between the levels. To this end,  a further section  is added  at the end of the master detail configuration

file.  Here,  there  is  NO  editor  and  you  must  manually  configure  the  file.  For  the  manual  configuration,

proceed as follows (in the example):

<Setting Key="Relations" Description="" LastChanged="2009-07-
07T11:52:21.229117Z" ValueType="System.Xml.XmlDocument" Version="0.0.0.0">
   <Value>
     <Relations>

MDS-Components.docx

Version: 1.2.14445

Page 12 of 32

Components

       <Relation Name="Operations" MasterController="BOOrderOverview1"
DetailController="BOOperationOverview1">
         <ColumnRelations>
           <ColumnRelation>
             <ForeignKeyColumn DataSource="BOOrderOverview1"
Name="order.id"></ForeignKeyColumn>
             <KeyColumn DataSource="BOOperationOverview1"
Name="order.id"></KeyColumn>
           </ColumnRelation>
         </ColumnRelations>
       </Relation>
       <Relation Name="FHM" MasterController="BOOperationOverview1"
DetailController="BOProductionResourcesList1">
         <ColumnRelations>
           <ColumnRelation>
             <ForeignKeyColumn DataSource="BOOperationOverview1"
Name="operation.id"></ForeignKeyColumn>
             <KeyColumn DataSource="BOProductionResourcesList1"
Name="operation.id"></KeyColumn>
           </ColumnRelation>
         </ColumnRelations>
       </Relation>
       <Relation Name="Components" MasterController="BOOperationOverview1"
DetailController="BOPComponentsList1">
         <ColumnRelations>
           <ColumnRelation>
             <ForeignKeyColumn DataSource="BOOperationOverview1"
Name="operation.id"></ForeignKeyColumn>
             <KeyColumn DataSource="BOPComponentsList1"
Name="operation.id"></KeyColumn>
           </ColumnRelation>
         </ColumnRelations>
       </Relation>
     <Relations>
   </Value>
 </Setting>

Note:

  For each relation between two levels, you must insert one relation.

  You are free to select any name for the relation.

  MasterController is the name selected by the superior data source itself (the name must absolutely be

identical).

  DetailController is the name selected by the inferior data source itself (the name must absolutely be

identical).

MDS-Components.docx

Version: 1.2.14445

Page 13 of 32

Components

  You must create a ColumnRelation for each relation between columns. ForeignKeyColumn is always

the column in the superior data source, KeyColumn is the column in the inferior data source.

  As title of the inferior table in the MDG, "lk" + name of relation is always shown automatically. For this

purpose, a language key usually has to be created in the mpdvDictionary. To hide this title (e.g. for

reasons of space), change the following in the configuration file in the layout section of the relevant

level: Set ShowDetailTabs in OptionsDetail to false (see example):

<property name="RowSeparatorHeight">0</property>

<property name="OptionsDetail" isnull="true" iskey="true">

   <property name="SmartDetailExpandButtonMode">AlwaysEnabled</property>

   <property name="AllowExpandEmptyDetails">true</property>

   <property name="ShowDetailTabs">false</property>

</property>

<property name="ColumnPanelRowHeight">-1</property>

Important:  Make  sure  that ALL  connections  between  columns  are  specified  for each  relation,  which  are

required  for  an  unambiguous  assignment.  Otherwise  it  can  happen  that  too  little  data  records  are

displayed in the grid (ambiguous data records cause an exception and this exception has the effect that

the data record is not used for the display).

Before  saving  the  (manually  edited)  file,  you  must  shut  down  the  MOC  completely.  Otherwise  the

relations, if any, are removed again!

Further configuration

The further configuration of the Master Detail Grid is similar to the grid configuration. But here, for each

level the configuration is performed separately. All configuration options of the grid are available at each

level of the Master Detail Grid. See also: 1.1.

Tips for troubleshooting

If data records are missing in one of the MDG levels, this can have two reasons:

  For the respective level, not all key columns have been defined that are required to uniquely identify a

data record (in repository isKey = true).

  For  the  "Relations",  not  all  connections  between  columns  have  been  specified  that  are  required  to

uniquely define the connection.

1.3  Master Detail Grid (without reloading)

The  display  and  structure  of  the  Master  Detail  Grid  (without  reloading)  is  similar  to  the  "normal"  Master

Detail Grid.

MDS-Components.docx

Version: 1.2.14445

Page 14 of 32

It is a hierarchical grid, i.e. the data is displayed in several hierarchical levels. The grid can include any

number of levels. At each level (except the top level), there might be several grids.

Components

The section below explains the structure of this special form of Master Detail Grid (MDG) and the steps

required to configure a detail application that is based on this MDG.

Basic data structure

The data source for a "normal" grid is a DataTable. Since a Master Detail Grid includes several levels, a

DataSet,  i.e.  a  collection  of  several  DataTables  is  used  here.  The  levels  of  a  grid  have  a  specific

relationship  to  each  other.  Therefore,  also  the  relations  between  the  different  DataTables  within  a

DataSet must be specified.

The  data  is  -  and  this  is  the  difference  to  a  "normal"  MDG  -  NOT  requested  "on  demand".  The  data  is

requested simultaneously for all grid levels e.g. when clicking the green arrow.

Reason for this behavior: For this detail application of the Master Detail Grid type (without reloading), a

data  source  has  been  defined  or  selected,  that  provides  a  DataSet  as  result.  Important:  This  must  be

discussed with the system designer in advance.

Special case: in exceptional cases it is possible, e.g. by script, to compose such a DataSet manually from

the  results  of  several  data  sources.  An  example  for  this  is  the  PaymentDayTypes  application  with  its

related scripts (see also 0).

In the repository, the structure of the result DataSet of a data source is defined on the ServiceParameters

tab. The ResultSet column is used to note the level where each column is located. In the result DataSet,

there will later be a DataTable for all entries under ResultSet in the repository that can be used for one
level of the MDG.

MDS-Components.docx

Version: 1.2.14445

Page 15 of 32

Components

Inserting a detail application of type Master Detail Grid (without reloading)

If  you  want  to  add  a  new  Master  Detail  Grid  to  an  application,  this  application  must  be  configured  as

follows:

Data sources

You must define 1 data source (providing a DataSet as result).

Special  case:  If  such  a  data  source  is  not  available  but  if  data  from  several  different  data

sources (whose data source is DataTable) are presented in the grid, these data sources must

be combined into a DataSet via script and assigned to the application (see also 0).

Detail application

You muast add a new detail application of type "Master detail table (without reloading)" to the application.

Configure as follows:

  Application type: Master Detail Table (without reloading)

  Data  source:  Select  suitable  data  source  (in  case  of  more  than  one  data  source,  specify  the  data

source for the top level)

Creating/Initializing the configuration file

You can use a configuration file to define the layout of this detail application. For technical reasons, this is

NOT created automatically for the MDG (without reloading). How such a file may be created and edited is

explained below.

First  create  a  text  file  with  the  name  MasterDetailGridWithoutReload[name  of  detail  application].config.

Save this file in the application directory of the main application.

The  configuration  of  a  normal  grid  with  only  one  level  is  made  up  of  several  sections  (see  0).  The

configuration  of  an  MDG  is  made  up  of  the  configuration  of  such  a  normal  grid  for  each  level.

Consequently, each level must be configured separately1.

You need not edit these configurations manually. Proceed as follows:

  Create an empty test application.

  Add  the  data  source  to  the  test  application  that  is  also  used  for  the  MDG.  Important:  Select  all

columns in the column configurator that are required in the relevant MDG level.

1 If several grids are located in one level, one configuration each must be available for the different grids. In this case,

several configurations for one level might exist.

MDS-Components.docx

Version: 1.2.14445

Page 16 of 32

Components

  Add a normal grid to the test application as detail application. Configure the grid, if required.

  The  last  two  steps  are  repeated  for  all  levels  of  the  MDG.  Important:  The  selected  columns  of  the

data source must always have the same entry under ResultSet in the repository.

  Now  save  the  application.  For  each  grid,  a  configuration  file  with  the  name  Grid<Name  of  detail

application>.config is created.

  Copy  the  contents  (=  all  sections)  of  all  configuration  files  into  the  previously  created  MDG

configuration file (one below the other).

  Rename all sections as follows:

<Name of section>_<Associated ResultSet from repository>

Important notes:

a) The layout section in the configuration file of a "normal" grid usually DOES NOT contain any entry for

the property Name. This, however, results in errors when requesting data within an MDG. The name must

absolutely correspond to the name of the associated ResultSet (see Repository). For this reason, manual

modifications are required if such a layout section is copied to the configuration of an MDG.

b)  There  are  other,  MDG-specific  properties  also  missing  in  the  configuration  file  of  a  "normal"  grid.  So

far, side effects for the missing entry AllowExpandEmptyDetails are known. If this property is set to false

(which unfortunately is the default setting), the MDG nodes are always only expanded upon the second

click and only if data is available. The entry is as follows:

<property name="OptionsDetail" isnull="true" iskey="true">

   <property name="SmartDetailExpandButtonMode">AlwaysEnabled</property>

   <property name="AllowExpandEmptyDetails">true</property>

</property>

c) In order to hide the title line in lower levels (e.g. for reasons of space), the following must be added in

the layout section of the superior level:

<property name="RowSeparatorHeight">0</property>

<property name="OptionsDetail" isnull="true" iskey="true">

   <property name="SmartDetailExpandButtonMode">AlwaysEnabled</property>

   <property name="AllowExpandEmptyDetails">true</property>

   <property name="ShowDetailTabs">false</property>

</property>

<property name="ColumnPanelRowHeight">-1</property>

The respective entry is ShowDetailTabs = false in OptionsDetail.

MDS-Components.docx

Version: 1.2.14445

Page 17 of 32

Components

Relations

In addition to the grid configuration for each level of the Master Detail Grid, you must define the relations

between the levels. To this end,  a further section  is added  at the end of the master detail configuration

file.  Here,  there  is  NO  editor  and  you  must  manually  configure  the  file.  For  the  manual  configuration,

proceed as follows (in the example):

<Setting

Key="Relations"

Description=""

LastChanged="2009-07-07T11:52:21.229117Z"

ValueType="System.Xml.XmlDocument" Version="0.0.0.0">

  <Value>

    <Relations>

       <Relation Name="order_operation" MasterController="order" DetailController="operation">

          <ColumnRelations>

            <ColumnRelation>

              <ForeignKeyColumn DataSource="order" Name="order.id"></ForeignKeyColumn>

              <KeyColumn DataSource="operation" Name="order.id"></KeyColumn>

            </ColumnRelation>

          </ColumnRelations>

        </Relation>

      </Relations>

    </Value>

  </Setting>

Note:

  For each relation between two levels, you must insert one relation.

  You are free to select any name for the relation.

  MasterController is the name of the superior ResultSet (the name must absolutely be identical).

  DetailController is the name of the inferior ResultSet (the name must absolutely be identical).

  You must create a ColumnRelation for each relation between columns. ForeignKeyColumn is always

the column in the superior data source, KeyColumn is the column in the inferior data source.

  Before saving the file, you must shut down the MOC completely. Otherwise the relations, if any, are

removed again.

Tables

You  must  also  define  all  levels.  To  this  end,  a  further  section  is  added  at  the  end  of  the  master  detail

configuration  file.  Here,  there  is  NO  editor  and  you  must  manually  configure  the  file.  For  the  manual

configuration, proceed as follows (in the example):

MDS-Components.docx

Version: 1.2.14445

Page 18 of 32

Components

Note: For each level/each grid, you must add an entry. The specified name matches the name

of the associated ResultSet.

MasterTable

In addition, the name of the main level must be defined. To this end,  you attach a  further section at the

end of the Master Detail configuration file. Here, there is NO editor and you must manually configure the

file. For the manual configuration, proceed as follows (in the example):

Note: The name specified must match the associated ResultSet.

Further configuration

You  should  have  made  the  configuration  of  the  individual  grid  levels  directly  for  the  underlying  grids,

because for technical reasons it is not possible to save them. Subsequent changes must directly be made

in the configuration file.

Special case: Composing DataSet from results of several data sources

There  are  2  possibilities  if  no  data  source  with  several  results  (as  DataSet)  exists,  but  if  the  data  is

nevertheless to be presented in an MDG:

  Either you use a regular MDG with reload of data on demand (description in 1.2);

  Or  you  use  the  MDG  without  reload  of  data  and  compose  the  results  (as  DataTable)  manually  via

script.

Note the following for the second variant:

MDS-Components.docx

Version: 1.2.14445

Page 19 of 32

Components

  Currently,  the  only  possibility  to  create  the  new  ResultSet  is  via  script.  The  respective  script  entry

point is <Name of detail application> + AltSetDataSource.

  You must specify the inferior data sources as additional data sources for the detail application (as for

the normal MDG).

  The name of the sections in the configuration file is the name of the data source (as for the normal

MDG).

An example for this procedure is included in the configuration file of the MDG and/or in the script for the

PaymentDayTypes application.

1.4  Charts

The ChartControl (Chart) is a control tool to visualize data. The chart may handle different types of data

sources.  In  addition,  a  wizard  is  provided  allowing  for  all  major settings  being  made  by  the  user  and/or

application designer.

Available chart types

Chart: Standard chart, completely configured through ChartWizard.

Chart with series selection: See chart, but the user can show and/or hide individual series.

Individual  series  chart:  Special  chart  to  display  data  of  several  columns  of  one  data  source  in  a  pie

chart.  All  columns  configured  in  the  column  configurator  are  consecutively  written  into  a  series.  The

column header is used as an argument (label). The configuration is made using the ChartWizard.

RPA distribution:  See individual series chart. RPA colors are provided as palette. Using a radio button,

the user can decide if the tooltip displays times or quantities.

Cycle  progression:  Special  chart  to  display  a  cycle  progression.  Data  source  and  series  are  pre-

configured and cannot be edited.

Downtime hit list: Special chart to display a downtime hit list. Data source and series are pre-configured

and cannot be edited.

Article profile: Special chart to display an article profile.

PDV measurement analysis: Special chart to display the PDV measurement analysis.

ChartWizard

You can use the ChartWizard to edit most settings of the chart application graphically. Note: Only if the

application has already requested data, a selection of data series in the wizard is possible.

MDS-Components.docx

Version: 1.2.14445

Page 20 of 32

Components

To activate the wizard, double-click a chart. The following setting options are available:

Chart type: Selection of chart type, e.g. bar chart, pie chart

Appearance: A color scheme may be selected and a color palette may be specified.

Series:  Creating  series.  The  data  types  of  the  axes  must  be  specified.  The  series  names  must  be

language keys.

Data: Binding series to the fields of the linked data source.

The figure shows a sample configuration in the ChartWizard.

1.5  Layout

A detail application with the category "Layout" is used to display the contents of individual data records in

fields (controls), which may be distributed among several tabs of the application. The configuration of the

application is similar to the one of the selection panel.

MDS-Components.docx

Version: 1.2.14445

Page 21 of 32

Components

Detailed information on maintenance is included in the sections "Configuration of applications  -

Selection panel" and "Input and output fields".

Special notes

  Select "Show selected data records only" in the detail application configuration.

  The  values  transferred  are  based  on  the  data  source.  The  key  here  is  the  FieldName  (provided  by

WebService, data source and must comply with the FieldName of the InputControl).

  Set the property "ShownInDetail" = "true" for fields that you want to display in application details.

  Use an entry in "Category 1" to show fields in a specific tab.

Many  changes  in  InputControls  will  only  be  visible  upon  saving,  closing  and  re-opening  the

application!

1.6  Pivot

Using the pivot module,  you can show summaries of data from a simple table in a pivot table using the

relevant columns. You can use different aggregate functions (sum total, mean value, etc.) to calculate the

contents of the created table. You can place the available columns in the four areas at runtime using drag

and drop in order to highlight different focuses or to identify trends.

MDS-Components.docx

Version: 1.2.14445

Page 22 of 32

Components

Areas of the pivot table

The header area (where the filter fields are placed) is divided into:

  Row Header Area, field "Group" in the example

  Column Header Area, field "Shift date" in the example

  Data Header Area, field "Duration" in the example. Calculations are made after this field.

  Filter area, fields "Shift number", "Company", etc. in the example. The fields in this area may
be used in order to make further restrictions, e.g. calculation of durations for a particular
status only (to be selected via "Status text" field).

In the actual Data Area, the aggregate data is presented, including the total results according to rows and

columns,  as  well  as  intermediate  results  if  several  fields  are  placed  in  the  row  or  column  area.  In  the

example, the duration is summed up according to group and shift date.

Field list

Using the column selection of the data source of the detail application, the application designer specifies

the fields that  are available in the pivot detail application (according to the columns of a flat table). The

field list provides these fields for the user. From there, you can transfer and/or remove the fields into or

from the four header areas. The remaining fields are not involved in the calculations, but are available to

the user for further compositions.

MDS-Components.docx

Version: 1.2.14445

Page 23 of 32

Components

Context menus

The following different context menus are provided for the pivot table:

Context menu in empty header field (main menu)

  Show/hide all fields: all fields in the field list are added to the pivot table as fields and/or all fields of

the pivot table are removed from all areas of the table.

  Hide filter area fields: all fields are removed from the pivot table filter area.

  Hide/show field list: hide/show selection list with available fields.

  Show FilterEditor: the FilterEditor may be used to implement additional filters for the pivot table.

  Show/hide  settings:  this  menu  item  may  be  used  to  open  an  additional  editing  dialog  (please  also

refer to "Settings" below).

Settings

  Top  N:  specifies  how  many  data  is  shown  in  the  table.  Note:  this  setting  only  works  if  "Top  N"  is

activated for data fields (see below) in the context menu.

  Show others: if the option "Top N" is activated, you can use this option to specify if the other data is

shown in the table as summarized form.

  Totals location: specifies where the totals columns are shown in the table. Far: right; Near: left

  Chart: Is the chart area of the pivot shown?

  Selection: Is only selected data shown in the chart?

  Columns: Are the values in the chart shown in different columns or in "cumulative" form?

  Totals: Are totals additionally shown in the chart?

  Legend: Is the legend shown in the chart?

Context menu in row and column fields

  Show/hide subtotals: is used to specify if only totals or also subtotals for individual groups are shown

in the table.

  Hide: This is used to remove the selected field from the relevant area.

  Sequence: This is used to specify the sequence of fields in the relevant area.

 Optimum column width / Optimum column width (all columns): see also 0. Important: in the pivot table,

all columns always have the same width.

Context menu in data fields.

MDS-Components.docx

Version: 1.2.14445

Page 24 of 32

Components

  Aggregate  functions:  is  used  to  specify  how  data  is  aggregated  in  the  pivot  table.  The  following

functions are available: Total, Number, Minimum, Maximum, Variance, Variance (Percent), Standard

deviation, Standard deviation (Percent). Important: It is possible that specific aggregate functions are

not useful depending on the data formatting.

  Additional  aggregate  function:  The  Ratio  aggregate  function  is  based  on  the  single  values  of  two

adjacent columns (dividend and divisor).

  Example  from  Time  and  Attendance  PZE:  Actual  time=99,  target  time=100.  Ratio=0,99,  displayed

(via OutputFormat) as %actualtime/targettime=99%.

  What is special about this function is that the column values are not based on their own single values

and cannot be computed from other, aggregate values.

  What is also special about the calculation: in case of a division by 0, the result is set to 0.

  Show aggregate function name: if this option is selected, the name of the selected aggregate function

is displayed behind the data field.

  Display type: specifies how the data is displayed. Options:

  Nominal: the value is displayed (default)

  Difference (absolute): the difference to the previous value is displayed.

  Difference (%): the percentage difference to the previous value is displayed.

  Hide: Removes field from data list

  Sequence: see above

  Optimum column width / Optimum column width (all columns): see also 0.

  Sort ascending/descending: specifies sorting of data

  Top N: specifies whether only the top n data records are shown. In addition, the settings dialog may

be used to specify n.

Associated chart

The  associated  chart  graphically  presents  the  current  data  of  the  pivot  table.  An  arbitrary  row/column

selection  may  also  be  displayed.  See  also  "Pivot  table  settings".  In  the  Customizing  mode,  you  can

configure the chart in more detail using the ChartWizard (double-click to open).

Pivot table settings

The panel for the table settings and the associated chart may be shown and hidden via context menu in

the empty header field.

The panel with settings will be migrated to the application menu in a future version.

MDS-Components.docx

Version: 1.2.14445

Page 25 of 32

Components

1.7  FileAttatchmentPlugin

Overview

You can use the FileAttatchmentPlugin to assign a file as attachment to an existing data record in a grid.

The FileAttatchmentPlugin can be used for the links in the toolbar. The file is uploaded to the server into a

configurable path. You can also use the plug-in to show the file, to delete the file and to remove it from

the data record.

Requirements

1)  You must configure a path in the path configuration where the files are stored. You can also use

an already configured path.

2)  The data records in the grid must have a column with a unique key. This key then becomes part

of the file name on the server. Example: internal ID (serial).

3)  The data records in the grid must include a column of data type string. The name of the file that is

uploaded to the server is then written into this column. If no attachment is assigned, this column

must be empty. When you assign an attachment, the plug-in automatically populates this column

using a generated file name. If you delete an attachment, the plug-in removes the file name from

the data record.

Assigning an attachment

Configuration in the link editor

Command

Fixed "UploadAttatchment"

Function

Fixed "callCommandObject"

Parameter

Example:

UploadAttatchment hydraPath="MOCHRIMG"

attatchmentFileName="pequal_[personnelqualificationsassignment.internal_id]"

listDataLogic="PersonnelQualificationsAssignmentList"

updateDataLogicId="PersonnelQualificationsAssignmentUpdate"

updateDataLogicParameter="personnelqualificationsassignment.person.id,personnelqualification

sassignment.qualification.id,personnelqualificationsassignment.internal_id,personnelqualifications

assignment.valid_from,personnelqualificationsassignment.valid_to"

updateDataLogicField="personnelqualificationsassignment.filename"

Parameter

Explanation

MDS-Components.docx

Version: 1.2.14445

Page 26 of 32

Components

UploadAttatchment

Fixed CommandLinkID

hydraPath

HYDRA path used to upload the files.

attatchmentFileName

Column that includes the name pattern for the file name on the

server, e.g.

"pequal_[personnelqualificationsassignment.internal_id]"

listDataLogic

Data source of list service

updateDataLogicId

Data source of update service

updateDataLogicParameter  List of columns that must be passed to the update service as

updateDataLogicField

Column of update service that includes the file name.

parameters.

Other fields

For the other fields, e.g. Language Keys and symbols, nothing special applies.

Process description

1.

If you click the icon to upload an attachment in the toolbar, a dialog opens where you can select a

file.

2.  The  plug-in  generates  a  unique  file  name  for  the  file  on  the  server  according  to  the  configured

pattern (parameter attatchmentFileName). The file extension of the original file is not changed.

3.  The plug-in then copies the file with the generated name into the configured path.

4.  As  a  next  step,  the  selected  data  record  is  automatically  locked  by  the  lock  service  (key  like

update service).

5.  The plug-in calls the update service to save the generated file name in the configured column of

the data object. The plug-in passes the configured parameters from the list service as key to the

update service and also the configured column with the file name.

6.  The plug-in then automatically performs the unlock service (key as update service).

Show attachment

Configuration in the link editor

Command

Fixed "ShowAttatchment"

Function

Fixed "callCommandObject"

Parameter

Example:

MDS-Components.docx

Version: 1.2.14445

Page 27 of 32

Components

ShowAttatchment hydraPath="MOCHRIMG"

listDataLogic="PersonnelQualificationsAssignmentList"

updateDataLogicField="personnelqualificationsassignment.filename"

Parameter

Explanation

ShowAttachment

Fixed CommandLinkID

hydraPath

HYDRA path used to upload the files.

listDataLogic

Data source of list service

updateDataLogicField  Column of service that includes the file name.

Other fields

For the other fields, e.g. Language Keys and symbols, nothing special applies.

Process description

1.

If you click the icon to show an attachment in the toolbar, the file is automatically downloaded to

the client. (The MOC stores the files in the directory of application data of the user; the files are

automatically deleted when the user logs off or when the MOC is shut down).

2.  The plug-in opens the file using the operating system. To show the file, the application is called

that is assigned to the respective file extension. If no application is assigned to the file extension,

Windows provides a selection of possible applications.

Delete attachment

Configuration in the link editor

Command

Fixed "DeleteAttatchment"

Function

Fixed "callCommandObject"

Parameter

Example:

DeleteAttatchment hydraPath="MOCHRIMG"

listDataLogic="PersonnelQualificationsAssignmentList"

updateDataLogicId="PersonnelQualificationsAssignmentUpdate"

updateDataLogicParameter="personnelqualificationsassignment.person.id,personnelqualification

sassignment.qualification.id,personnelqualificationsassignment.internal_id,personnelqualifications

assignment.valid_from,personnelqualificationsassignment.valid_to"

updateDataLogicField="personnelqualificationsassignment.filename"

Parameter

Explanation

DeleteAttatchment

Fixed CommandLinkID

MDS-Components.docx

Version: 1.2.14445

Page 28 of 32

Components

hydraPath

listDataLogic

HYDRA path used to upload the files.

Data source of list service

updateDataLogicId

Data source of update service

updateDataLogicParameter  List of columns that must be passed to the update service as

updateDataLogicField

Column of update service that includes the file name.

parameters.

Other fields

For the other fields, e.g. Language Keys and symbols, nothing special applies.

Process description

1.

If you click the icon to delete an attachment in the toolbar, a confirmation prompt opens.

2.

If you click OK to confirm, the plug-in deletes the file with the name from the configured column of

the list service in the configured path.

3.  As  a  next  step,  the  selected  data  record  is  automatically  locked  by  the  lock  service  (key  like

update service).

4.  The plug-in calls the update service to set to empty the file name in the configured column of the

data  object.  The  plug-in  passes  the  configured  parameters  from  the  list  service  and  the

configured column with the empty file name to the update service.

5.  The plug-in then automatically performs the unlock service (key as update service).

1.8  Special table views

The following sections describe other table views used in very special application cases.

The  special  table  views  are  intended  for  internal  use  by  MPDV  itself.  The  special  table  views

have  been  developed  for  very  specific  use  cases  and  it  is  normally  not  useful  to  use  them  in

other situations. They require extensive knowledge of the configuration files on the MOC. A full

use  might  only  be  possible  if  an  additional  programming  (scripting)  is  performed.  This  is  not

possible with the tools that are available for customers.

Year model

The year model is a special grid to display and edit data in a calendar form. This type of detail application

was especially developed for the year model application and is used to maintain data. Apart from the grid

itself, it contains additional controls and input fields. Of these, year, model and designation/name as well

as the grid contents are actually used for data maintenance. The fields below the grid are only used for

editing the grid at runtime.

MDS-Components.docx

Version: 1.2.14445

Page 29 of 32

Components

The year model is used for data maintenance and is therefore only placed on maintenance applications.

As  the  data  source,  MDMFYearModelInsert  or  MDMFYearModelUpdate  may  be  used  optionally.  The

column configurator is empty. Further configuration is not required.

PDV ID Tracing

The grid for PDV ID tracing is a grid especially used for the ID tracing application. The only difference to

the  "normal"  grid  is  that  the  columns  are  generated  dynamically  at  runtime.  The  columns  stored  in  the

configuration are NOT integrated.

The columns resource.id and pdvtagbasedsinglevalue.capture_ts  are permanently added

at runtime. Depending on the data provided by the web service, more columns are added.

For  this  plug-in,  only  the  data  source  PdvTagBasedSingleValueList  can  be  used.  In  the  column

configurator, all columns should be selected.

The configuration is identical to the one of the grid, see 1.1.

PDV process analysis

The  grid  for  a  PDV  process  analysis  is  a  grid  especially  used  for  the  process  analysis  applications

(machine-related,  order-related,  batch-related).  The  only  difference  to  a  "normal"  grid  is  that  the

measured value that is displayed is taken from one of 4 different columns. The data type specifies which

of the four columns is used.

For  this  plug-in,  only  the  data  source  PdvSingleValueListWithAdditionalInfo  can  be  used.  In

the column configurator, all columns should be selected.

The configuration is identical to the one of the grid, see 1.1.

1.9  Special charts

The following sections describe other chart types used in very special use cases.

The  special  charts  are  intended  for  internal  use  by  MPDV.  The  special  charts  have  been

developed  for  very  specific  use  cases  and  it  is  normally  not  useful  to  use  them  in  other

situations. They require extensive knowledge of the configuration files on the MOC. A full  use

might only be possible if an additional programming (scripting) is performed. This is not possible

with the tools that are available for customers.

MDS-Components.docx

Version: 1.2.14445

Page 30 of 32

Components

PDV measurement analysis

The  chart  for  the  PDV  measurement  analysis  is  a  special  chart  that  can  only  be  used  for  special

applications: Applications for the measurement analysis of measured values and samples, as well as for

machine-related, order-related and batch-related measurement analyses.

This  plug-in  can  include  up  to  3  charts  that  are  added/removed  using

  .  For  each  chart,  several

process  parameters  can  be  selected  from  the  associated  selection  list.  Machine/order/batch  and  time

range specify the selection available in the list. Initially, the list is empty.

When configuring an application using this plug-in, note the following:

  For single  values, limit values and events,  you must define  3 data sources each; this means that 9

data sources must be defined in total.

  Permitted data sources are:

  Single values: PdvSingleValueList, PdvSampleValueList

  Limit values: PdvSingleValueSpecification, PdvSampleValueSpecification

  Events: PdvEventList

  For each data source, all columns in the column configurator should be selected.

  For the detail application, all data sources must be set. The first data source of single values is the

main data source, the remaining ones are additional data sources.

1.10  Grouping application

The grouping application is intended for internal use by MPDV. It requires extensive knowledge

of  the  configuration  files  on  the  MOC.  A  full  use  might  only  be  possible  if  an  additional

programming  (scripting)  is  performed.  This  is  not  possible  with  the  tools  that  are  available  for

customers.

The grouping application does not have any data source but  - as is suggested by  its name  - is used to

group  other  detail  applications.  For  this  reason,  it  is  not  necessary  to  create  a  data  source  before  a

grouping  application  is  placed  on  an  application.  After  selecting  the  application  type,  an  appropriate

information window is therefore shown.

To  add  other  applications  to  the  group,  double-click  the  application.  This  is  only  possible  if  the

MESDevelopmentSuite  is  activated.  The  grouped  applications  must  be  docked  within  the  application.  A

dialog opens. The left hand side shows all  existing detail applications  of the main application. The right

hand  side  shows  the  list  of  all  detail  applications  already  included  in  this  grouping.  Applications  can  be

moved by clicking the arrow buttons.

MDS-Components.docx

Version: 1.2.14445

Page 31 of 32

If detail applications are moved to the group, you can dock them again within the group. After docking, the

application  must  be  restarted.  You  can  also  use  this  procedure  in  the  inverse  direction,  to  move

applications back from the group to the main application.

Components

MDS-Components.docx

Version: 1.2.14445

Page 32 of 32

