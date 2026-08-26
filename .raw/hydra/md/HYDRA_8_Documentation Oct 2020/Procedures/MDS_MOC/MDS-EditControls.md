Input and Output Fields

1

Input and Output fields

Input and output fields (controls of type mpdvEdit) are used in "LayoutControls" i.e. in the selection panel,

in  detail  applications  and  in  editing  dialogs  to  present  data  (output)  and/or  for  the  entry  of  data  by  the

user. The controls support a number of features, such as

  Special  input  controls  for  the  entry  of  texts,  date  and/or  time  values,  color  selection,  true/false

values, etc.

  Selection from selection lists (data-based)

  Forwarding to selection dialogs

  Labeling and unit display



Input of FROM and TO values.

1.1  Customization

You can control all features of an input and output field via customization.

Adopting properties from the MDS Repository

The  property  Field  name  of  an  mpdvEdit  can  reference  a  property  or  a  service  parameter  of  the  MDS

repository and this way inherit all properties. In the simplest case, you must only enter a property/service

parameter to get a completely defined input and/or output field.

Advantage  of  this  procedure:  The  relevant  properties  can  be  controlled  centrally,  i.e.  all  input  fields  for

e.g.  machine  or  personnel  numbers  have  the  same  behavior  and  can  be  changed  via  central

customization settings, if required.

But  you  can  still  select  any  "Field  name"  for  an  mpdvEdit  and/or  you  can  locally  overwrite  properties.

Note: If you make a local change, you can no longer control the field centrally.

Manual customization

To manually customize an input and output field, you use the editing mode of a LayoutControl. Enable the

MES Development Suite and activate the editing mode using the context menu of the selection panel, for

example..  For  further  information,  refer  to  the  paragraph  "Selection  panel"  in  section  "Customization  of

applications".

Note the following:

  You can ass controls of the "mpdvEdit" type to a layout using "Add Control". When the editing mode

is activated, click a control to show its properties on the right hand side of the dialog "Customization".

MDS-EditControls.docx

Version: 1.3.18640

Page 1 of 8

  The selection list of the service parameters of the property "Fieldname" is specified via the contents

of  the  "ServiceName"  property  -  only  those  service  parameters  are  displayed  that  are  known  in  the

service context. If "ServiceName" is empty, all known properties are displayed.

Input and Output Fields

Numerous  changes  in  controls  are  only  shown,  when  you  save,  close  and  restart  the

application!  For  example,  if  you  create  a  new  control  and  assign  a  field  name  to  it,  you  must

save and restart the application so that the changes become active.

1.2  Properties of Input and Output Fields

You  can  control  the  following  properties  of  input  and  output  fields  via  a  property/service  parameter  or

manually via the editing mode:

  FieldName: Reference to the property or - if a ServiceName is given - to the service parameter. If a

ServiceName  is  entered,  only  the  parameters  of  this  service  are  shown,  otherwise  all  known

properties are displayed.

  ServiceName:  Provides  the  context  from  which  service  parameters  can  be  used.  The  selection  list

shows all known services.

  LanguageKey: Is used to specify the label taxt and should be a "LanguageKey" ("lkxxx"), so that the

text is displayed in the language that has been selected.

  UnitLabel: Text key for unit

  Length: (in number of characters) controls the field width. If value is 0, the control will use the entire

width available to it. Important: If a width is specified that exceeds the available space, the control is

cut.

  ScriptID: Is used to identify scripts provided by MPDV.

  ControlType: Controls the type of controls used. Possible values for ControlType:

  TextEdit:  Text  field  for  entry  /  display  of  (short)  texts.  Can  be  extended  by  indicating  a

"ControlDataSource"  with  a  button  that  opens  a  search  dialog.  If  you  enter  the  name  of  a

DataLogic  in  ControlParameter  and  if  a  mapping  is  included  in  ControlDataSourceResult,

data is requested when you leave the control and return values are mapped appropriately.

  CheckEdit:  Checkbox  for  the  entry  /  display  of  a  Boolean  value  (true/false)  or  selection  of

multiple values, if reference to data source is given.

  ColorEdit: Control for entry / display of a color value.

  ComboBoxEdit:  Combo  box  for  the  input/display  of  values  provided  by  the  data  source  in

"ControlDataSource".

MDS-EditControls.docx

Version: 1.3.18640

Page 2 of 8

Input and Output Fields

  DateTimeEdit: Control for entry / display of a date and/or a time.

  MemoEdit: Control for entry / display of a deliberate, multi-line text.

  RadioGroup:  Control  for  entry  /  display  of  one  or  more  Boolean  values  (true/false).  The

values can be controlled using the ControlDataSource.

  ControlTypeMode:  Can  be  used  to  control  the  input  control.  The  permitted  values  depend  on  the

ControlType.

  CheckEdit: DualState (default), TriState, J;N;J (checked;unchecked;tristate)

  ColorEdit: none

  ComboBoxEdit: SingleEdit, Single, Multiple (multiple selection)

  DateTimeEdit:  Date  (date  display),  time  (time  display),  DateTime,  RelativeDate  (with  button  for

opening the relative date selection, further information: MpdvEdit_RelativeDate)

  MemoEdit: none  .

  RadioGroup: SingleColumn, SingleRow

  TextEdit:

  None; the search button is shown if a ControlDataSource is defined.





"SearchButton": Search button is shown.

"SearchButtonValidate":  Search  button  is  shown.  If  you  enter  an  invalid  value,  an  error  is

displayed.



"OpenFileDialog" will open a file selection dialog.

  ShowSecondControl: Specifies whether a second control for from/to inputs is shown.

  ControlDataSource: Data source for the selection of values. The data source can be:

  a Web service. Configuration: ControlType = ComboBoxEdit, ControlDataSourceType = Lookup,

ControlDataSource = Entry from tab ControlDataSources, Field Name

  a  RefDat.  Configuration:  ControlType  =  ComboBoxEdit

(can

be  RadioGroup),

ControlDataSourceType  =  Reference,  ControlDataSource  =  Entry  from  tab  ReferenceData,

column type

  a  pool  application.  Configuration:  ControlType  =  TextEdit,  ControlDataSourceType  =  Lookup,

ControlDataSource = Name of application

  a  script.  Configuration:  ControlType  =  ComboBoxEdit,  ControlDataSourceType  =  Script,

ControlDataSource = Name of script

  ControlDataSourceMode: mode of data source (Lookup, Reference or Script)

MDS-EditControls.docx

Version: 1.3.18640

Page 3 of 8

  ControlDataSourceParameter: Request parameter of the data source

  ControlDataSourceResult: Result columns are separated by semicolon. The values are interpreted as

Input and Output Fields

follows:

  First entry: Value

  Second entry: Labeling

  Third entry: UnitLabel

  As from the fourth entry, the fields will be mapped:

  Via acronym or semantic type.

  Mapping

of

fields:

in  ControlDataSourceResult

a  mapping

in

the

form

"FeldName=SpalteAusResult"  can  be  entered  as  of

the

fourth  entry.  Example:

tool.id=resource.id to fill the field  "tools.id"  with  the value  "resource.id" from the pool  dialog.

Several mappings are separated by ";" - spaces are not allowed.

  Asterisk  mapping:  Instead  of  mapping,  you  can  also  enter  *  .  Subsequently,  all  return

columns  of  the  pool  screen  are  mapped.  The  mapping  is  performed  as  usual  via  ID  or

semantic type.

  ClientDefaultValue: preset default value, see next section 0

  EditableCondition: This value decides whether a field is editable. There are three possibilities:

  Boolean value: In case of TRUE or FALSE, the field is always editable / non-editable.

  Binary expression:

  Field name must be the name of a field that is also located in the ControlPanel.

  Valid operators: =, <, >, <=, >=, <>, !=

  The value is written as a string and interpreted depending on the comparative field value.

  Field, operator and value must be separated by a space!

  Concatenation of binary expressions

  You can concatenate an arbitrary number of binary expressions.

  To link the expressions, you can use &&, AND, ||, OR.

  Here, too, all components of the conditions must be separated by a space.

  Evaluation takes place as AND and/or && before OR and/or II. Parentheses are not allowed.

  Example: resource.id = 12345 && resource.costcenter = 20 || resource.id = 60610

MDS-EditControls.docx

Version: 1.3.18640

Page 4 of 8

Input and Output Fields

The default value of the property "ClientDefaultValue" is assigned to the field, if the result of an

expression in the EditableCondition or the VisibleCondition changes from FALSE to TRUE. The

expressions in the EditableCondition and the VisibleCondition are dynamically evaluated, if the

fields of the application change.

  VisibleCondition: Visibility condition. For customization, see EditableCondition.

  LoadDataOnInit: This is used to specify whether the control data is loaded directly when this control is

initialized. Some control types within the mpdvEdit contain a list of data (Combobox, LookupCombo,

CheckedCombo,  RadioGroup)  which  is  filled  from  RefDat  or  Lookup  values.  For  reasons  of

performance, these controls (except for RadioGroup) are always only filled on demand, i.e. when the

control is "opened". In some cases, however, it may be reasonable and/or necessary that this takes

place  upon  loading  the  control  already.  For  this  case,  the  property  LoadDataOnInit  must  be  set  to

true. This, of course,  is only  reasonable  with regard to the controls mentioned.  The default  value is

false.

Not  all  modifications  in  the  customization  files  are  directly  adopted.  You  must  first  save  and

restart the application.

Use of default values in input fields

Input  fields  have  a  "ClientDefaultValue"  property.  The  value  entered  here  is  displayed  as  default  value

when the control is initialized. "From" and "to" values are separated by semicolons.

Set checkbox

If the value for ClientDefaultValue is set to 'true' in a CheckEdit, the checkbox will be set after initializing.

Pre-allocating text fields with "From" and "To" values

You  can  use  a  TextEdit  to  pre-allocate  the  From  and  To  fields  by  setting  the  ClientDefaultValue  to

'Value1;Value2'.

Pre-allocation of date fields

With date fields, you can pre-allocate the field with an offset. If you set default values for date fields, you

must absolutely specify the type of offset. The following offsets are possible:

  h (hours)

  d (days)

  w (weeks)

  m (months)

MDS-EditControls.docx

Version: 1.3.18640

Page 5 of 8

Input and Output Fields



y (years)

The 'to' value is always relative to the 'from' value. The default value is always a DateTime object. The

presentation depends on the configuration of the relevant field.

You can put "[" and "]" in front and at the end of the relevant value to specify the start and end of a period

of time. Consequently, e.g. "[0d;0d]" means that 00:00:00 is entered in the 'from' field today and 23:59:59

is entered in the 'to' field today. "[-1w;0w]" means from Monday last week up to Sunday last week.

Examples

  Current date: 0d

  From today to the day after tomorrow: 0d; 2d

  From today to one week from today: 0d;1w

  From yesterday to tomorrow: -1d;2d

  From one year ago today to one year from today: -1y;2y

Year selection lists

You  can  use  ControlDataSource  =  YearList  and  ControlDataSourceMode  =  Script  to  create  a  year

selection  list  or  a  normal  "Service-ControlDataSource".  In  this  case,  you  can  use  the  following  default

values:

  Current year: 0y and/or currentyear

  Last year: -1y

  Following year: 1y

  4 years ago: -4y

  Year that was current 10 months ago: y-10m --> this is usually the case when the relevant year field

occurs in combination with a month selection list.

If you want to preallocate two fields (ShowSecondControl), you must separate both values by semicolon,

e.g. -1y;1y

Month selecion lists

The following default values can be used for a month selection list:

  Current month: 0m

  Last month: -1m

  Following month: 1m

MDS-EditControls.docx

Version: 1.3.18640

Page 6 of 8

Input and Output Fields

  4 months ago: -4m

If you want to preallocate two fields (ShowSecondControl), you must separate both values by semicolon,

e.g. -1y;1y

1.3  Examples of customization settings

The following examples illustrate possible customization settings of input and output fields.

Example: From-To selection parameters with value selection

  ControlType: TextEdit

  ControlDataSource: Application with ID "PoolWorkplace" ("Workplaces" selection)

  ControlDataSourceMode: Lookup

  ControlDataSourceResult:  The  "resource.id"  is  selected  from  the  return  values  of  the  data  record

selected in the selection screen and interpreted as result value.

  ShowSecondControl: True => shows the "to" control.

Note: You can only select one value at a time, i.e. a possible "Multiple" ControlType is ignored.

MDS-EditControls.docx

Version: 1.3.18640

Page 7 of 8

Example: Customization of a selection list

Input and Output Fields

This example shows a complex customization setting for an mpdvEdit. It is an editable ComboBox filled

with  data  from  the  "resourceInternalId"  data  source.  As  filter  parameter,  the  selected  value  of  the

"maintenance.resource.type"  is  transferred  to  this  data  source  on  the  same  LayoutControl.  The  data

source returns several columns. The column "resource.internal_id" is used as value, "resource.id" is used

as display value and "resource.type" is used to fill the "maintenance.resource.type" field.

Example: Data is only requested when ComboBox is opened

Applications with many selection lists (combo boxes) can can take longer to open if all combo boxes are

filled when the application is requested.

Customization

  ControlDataSource: Name of an existing CDS

  ControlDataSourceMode: Lookup

  ControlType: ComboBoxEdit

  ControlTypeMode: SingleEdit

MDS-EditControls.docx

Version: 1.3.18640

Page 8 of 8

