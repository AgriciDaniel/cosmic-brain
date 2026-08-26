Application Generator

1  Application Generator

Applications may  be  generated  in  an  automated  way  by  the  application  generator.  Automation  refers  in

particular to standard features that are used in many applications (above all editing dialogs) and that may

easily be standardized for this reason.

The application generator receives all its information from the repository or the files exported from there.

Consequently,  it  is  reasonable  to  edit  all  affected  data  in  the  repository  before  a  new  application  is

generated.

Each  new  application  can  and  should  be  created  using  the  generator.  If  the  entries  available  in  the

repository  are  identified  as  being  incorrect  after  the  generation,  they  should  be  modified  first  before

generating a new application.

Each  application  may  still  be  changed  later.  Some  changes  can  be  made  at  runtime  using  editors  and

others can only  be performed by directly editing the configuration files. If possible,  modifications should

always be made via the repository, as in this case they can also be used for other applications.

A generated main application always includes:

  a (main) data source

  a selection panel (Plug-in = ParameterLayout, Configuration file = LayoutPanel.config)

  A grid application to show the data for the data source (Plug-in = Grid, Configuration file =

GridMainGrid.config)

  A detail application to show the data records selected in the grid (plug-in = Layout, configuration file =

LayoutMainDetail.config)

  0-n toolbar buttons to start editing functions (configuration file =

ApplicationCommandLinkCollection.config)

  0-n (sub-)applications to implement the editing functions

If  additional  editing  applications  are  generated,  they  also  include  data  sources  and,  if  necessary,  detail

applications. Moreover, they can also be edited and saved at runtime, just as it is the case for "normal"

main applications.

1.1  Instructions
The application generator is available if the MES Development Suite is enabled and can be started by the

shortcut  _cgenapp  in  the  quick  launch  bar  or  by  using  the  main  menu  (MES  Development  Suite  

Generate application).

MDS-ApplicationGenerator.docx

Version: 1.1.13930

Page 1 of 6

Application Generator

  Data logic has to be selected first from the list on the left-hand side.

-  This list includes all data logic exported from the repository into the files in

<MOC>\resources\data\services\xxx.DataLogic.xml. If a specific entry is missing in the list, it
should be checked whether or not the data have already been exported.

-  The selected data logic is then used as main data source within the main application (for the grid

as well as for the detail application).

-  Normally, main data logic has the extension "List" or "Overview“.

-  The selection process is simplified by "Incremental Search", i.e. if the first letters of the data logic

name are entered, the matching entry will be selected automatically.

  Once data logic has been selected, most fields on the right-hand side of the generator are

automatically assigned default values.

-  This pre-assignment refers to default values matching in many cases but certainly not in every
case. Therefore, the field assignment has to be checked thoroughly as to whether it meets the
requirements of the application to be generated (see the description of the fields).

-  At the moment, the basic functions Insert, Copy, Update and Delete are automatically assigned
as editing functions. If the relevant service is available, the corresponding field will be assigned
automatically in the generator.

  Besides the standard editing functions, up to five further editing functions can be defined on the tab

"additional functions" (e.g. Activate, Deactivate, etc.). No additional editing functions will be created if
nothing is edited here.

MDS-ApplicationGenerator.docx

Version: 1.1.13930

Page 2 of 6

  A dialog to configure the main dialog opens by clicking the "generate" button. This dialog is already

assigned  default  values  within  the  repository,  if  data  logic  has  been  configured  correctly.  However,

the relevant specifications may also be entered manually.

Application Generator

  Once this dialog has been closed, the main dialog and, if necessary, editing dialogs of the application

are generated and directly opened.

1.2  Description of the fields
The  individual  editing  functions  can  be  edited  on  the  right-hand  side  of  the  generator.  As  already

mentioned, the default functions are "insert", "copy", "edit" and "delete". Up to five further functions may

be defined on the second tab. An editing application is generated automatically for each editing function

for which data logic has been selected.

The following specifications can be made for each editing function:

Data logic

Data logic selects the service that is respectively started/used for the editing of data.

An  editing  application  is  generated  automatically,  once  data  logic  has  been  selected.  If  the  data  logic

name is empty, the created application will not include the editing application.

Data  logic  (New),  which  is  executed  before  the  actual  insert  process,  may  be  defined  additionally  for

"insert". Data logic for the new service is automatically assigned to default values when selecting list data

logic, provided the relevant service is available.

Additional data logic may be specified for "update". This data logic is executed before the actual "update"

process before (Lock) or after (Unlock). Data logic for Lock/Unlock is also assigned default values when

selecting list data logic, provided the relevant services are available.

MDS-ApplicationGenerator.docx

Version: 1.1.13930

Page 3 of 6

Application Generator

Most applications do not have a separate copy service. If, however, a copy function is still to be used, the

insert dialog will normally be used and its fields will be assigned to default values. If a copy service exists,

it will be assigned by default. Otherwise, the insert service is assigned automatically. Data logic has to be

deleted here if no copy function is required.

Plug-in type

The plug-in type specifies which application plug-in is used for editing data.

Any  application  plug-in  may  be  selected  for  each  editing  dialog.  The  only  condition:  the  plug-in  has  to

implement  IParameterContainer.  The  selection  list  only  includes  appropriate  plug-ins.  The  plug-in

ParameterLayout is always set by default.

It is also possible to NOT select a plug-in. Consequently, a dialog without plug-in is created automatically.

However, this dialog will not be opened by clicking the relevant toolbar button. Then the application folder

includes a configuration that may be edited. Example: "standard delete" without dialog.

Update (UpdateSourceMode)

Specifies  how  data  are  to  be  updated  in  the  main  application,  once  the  editing  function  has  been

executed. You may choose from the following options:

  All: all data of the main application are completely refreshed (taking the values entered in the

selection panel into account). This is required, for example, for separate deletion and copy dialogs.
As they do not allow for the affected data records to be determined specifically and requested only.

  OnReturnValues: the called service returns values that are used to request only the concerned data.
This may be the case, e.g. for "Insert". In this context, it is often the case that a new key field is
generated that is required to request the new data record.

Please note: However, this setting is not reasonable if the called service does not return any fields
that are suitable for a unique identification of the affected data record. This setting is set by default for
"inserting" and might be changed, if necessary.

  OnKeyValues: the key fields of the list service are used to request only the affected data. This is, for

example, the ideal procedure for the "update".

Please note: In this case, the service of the main application and the editing service should have the
same key fields; otherwise it does not work.

  OnScript: for future use

This configuration should be checked thoroughly. As subsequent changes can only be made manually in
the main configuration file of the editing dialog (e.g. EditOrders\Insert\Insert.config, section:
UpdateSource).

Update parameter

This  entry  specifies  whether  or  not  the  return  value  of  a  service  is  to  be  used  to  replace  the  original

parameters. These new parameters will then be used during the course of the process.

MDS-ApplicationGenerator.docx

Version: 1.1.13930

Page 4 of 6

Application Generator

Example:  Calling  the  new  service  before  the  "insert"  is  normally  used  to  request  data  that  will  then  be

assigned by default in editing dialogs. Therefore, the data provided by this service are required during the

course of the process. Consequently, it is reasonable to set the check box to "true". For this reason, this

is the default value assigned for "New".

Name

Name  of  the  editing  function.  This  value  has  already  been  assigned  as  the  default  value  for  the  basic

functions  and  can  only  be  assigned  individually  for  the  additional  functions.  This  name  is  used  for  the

following positions:

  The editing application will be named like that as a part of the main application. Consequently, the

folders included in the configuration also have this name. For this reason, the name has to be clear
and unique within the main application.



lk + Name = labeling of the created toolbar button

  The command link on which the toolbar button is based is named like that.

Small/large

Icons  for  the  application  may  be  selected  by  image  dialogs.  These  icons  are  used  for  the  following

positions.

  Small icon (16X16): presented top left of the editing application; possibly also in the toolbar.

  Large icon (32X32): might be displayed in the toolbar (both icons should be defined as the ribbon

defines whether the large or the small icon is shown)

Transfer of parameters (ParameterProcessingMode)

Please note! This configuration can neither be set by the generator nor by a wizard!

The  configuration  ParameterProcessingMode  specifies  if  and  how  parameters  from  the  calling  main

dialog are transferred to the editing dialog. You may choose from the following options:

-  NoParameter: no parameters will be transferred

-  SingleParameter: obligatory transfer of the selected grid row; an error message occurs if no row

is selected.

-  OptionalSingleParameter: optional transfer of the selected grid rows; no error message

-  MultiParameter: obligatory transfer of one or several grid rows; an error message occurs if no row

is selected.

-  OptionalMultiParameter: optional transfer of one or several grid rows; no error message.

-  SingleSelectionParameter: transfer of the selected grid row. If no row is selected the values from
the selection panel will be transferred. If no values are transferred from there --> error message.

-  OptionalSingleSelectionParameter: transfer of the selected grid row. If no row is selected the

values from the selection panel will be transferred. No error message.

-  SelectionOnlyParameter: the values from the selection panel are transferred. If no values are

transferred --> error message.

MDS-ApplicationGenerator.docx

Version: 1.1.13930

Page 5 of 6

-  OptionalSelectionOnlyParameter: the values from the selection panel are transferred. No error

message.

As  a  part  of  the  generation  process,  the  following  values  are  always  set  automatically  for  editing

Application Generator

applications:

-

Insert: NoParameter

-  Update: SingleParameter

-  Copy: SingleParameter

-  Delete (including message box, without editing dialog): MultiParameter

-  Delete (including editing dialog): SingleParameter

At  the  moment,  these  values  can  only  be  changed  manually  and  directly  in  the  configuration  (e.g.

EditOrders\Insert\Insert.config, section: ParameterProcessingMode).

MDS-ApplicationGenerator.docx

Version: 1.1.13930

Page 6 of 6

