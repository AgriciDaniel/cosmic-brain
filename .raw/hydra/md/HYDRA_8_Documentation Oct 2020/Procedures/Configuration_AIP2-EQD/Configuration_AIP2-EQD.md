Expanded view of quality data

1

Configuration for the Expanded View of Quality Data

  

Purpose

Use this function, if you want to show further data in addition to the input dialog in the AIP inspection data

collection. For example, you can show the list of documents or directly show a drawing.

The expanded view of quality data is based on a customizable layout for the inspection data collection.

Requirements

The functions described below are available for HYDRA 8 with AIP 8.2 service pack 10 and higher. You

also need the license AIP-EQD.

For final activation, set the following parameter in the CAQ configuration file caq_dc_t.ini (folder: functions)

in the [OPTIONS] section:

ACTIVATE_EQD=1

Basic configuration

Without  the  expanded  view  of  quality  data,  the  AIP  inspection  data  collection  always  shows  both:  the

inspection list and the dialog  pertaining to the entry  selected in the  inspection  list. The  inspection list  is

always on the left-hand side. The relevant input dialog is always to the right of it. Use the expanded view

of quality data to arrange these two objects individually. In addition to this, you can also show further quality

data simultaneously. You can also arrange these additional objects according to your requirements.

Define the corresponding basic configuration in the file caq_global_gui_settings.xml. This file is stored in

the AIP sub-folder .\functions.

Definition of grids

In the <grid_settings> section of this file, first divide the screen area into the required number of columns

and rows.

Layout of inspection lists and dialogs

After the grids have been defined, specify the required columns and rows in the section <caqchecklist> to

define which cells are populated by the inspection list. Define the display area for the input dialog in the

<measure_value_content_control> section.

Configuration_AIP2-EQD.docx

Version: 1.6.18634

Page 1 of 25

Expanded view of quality data

Use the parameters col (columns) and row (rows) to define where the cells that are populated begin. The

colspan and rowspan parameters define the number of columns and rows that are populated. If the column

and row width equals 1, you do not have to specify the span parameter.

The following illustration shows a configuration example.

The example configuration above would result in the following layout for inspection list and input dialogs.

Context elements

Configuration_AIP2-EQD.docx

Version: 1.6.18634

Page 2 of 25

Expanded view of quality data

You  can  use  the  section  <context_elements>  to  define  context  elements  with  a  different  database.  For

example, you require the definition of context elements to specify which change of a node or element does

not trigger an update of the contents of the objects displayed additionally in the inspection list. For example,

the document list or other objects need usually not be updated when you change from measured values

container  1  to  the  next  measured  values  container  within  the  same  characteristic.  If  you  suppress  an

update, you can enter further data within a shorter time. Therefore, we recommend this data suppression.

To define a context element, make the following entry in the <context_elements> section.

<context_element id="context name">

The context name can be any name. Below the context element, define the parameters that clearly describe

this  context. With  regard  to  the  example  about  updating  above,  this  means  that  the  system  triggers  an

update anytime the content of these parameters changes. Define the context parameters as follows:

<fields>Parameter1|Parameter2|Parameter3</fields>

The following parameters are available, among others.

  RECTYP

e.g. WEP, FEP, WAP

  BER

e.g. Areas of the inspection requirement

  PANNR

Inspection requirement number

  PAUNR

Inspection step number

  AFO

Operation sequence number

  WERTNR

Measured value number

  STPRNR

Sample number

  EINTNR

Inspection point number

Use a "|" to separate multiple parameters.

Below is an example of a configuration for the contexts  NO_RELOAD*, characteristic, measured_value,

inspection_point and sample.

Configuration_AIP2-EQD.docx

Version: 1.6.18634

Page 3 of 25

Expanded view of quality data

The static = NO_RELOAD element is an exception. This element can be used to completely disable the

update of components.

Placeholders

Using the context_placeholder element,  you can define separate placeholders,  which are  then replaced

with the relevant values from the CAQ node data when setting up the list parameters.

For

Defining placeholders:

example:

Configuration_AIP2-EQD.docx

Version: 1.6.18634

Page 4 of 25

Expanded view of quality data

In a specified configuration, these placeholders replace the placeholder %RECTYP% with the RECTYP

value from the current CAQ node data, for example.

Options

Define global settings in the <options> section. These settings serve as the default values in the following

dialog  configuration.  If  you  defined  settings  in  the  "options"  section,  you  do  not  have  to  repeat  these

configurations in the dialog configurations.

Currently, you can globally define the scroll mode for lists and the zoom option for documents. The available

scroll modes are scrollbars and buttons.

 Mode: scrollbars

 Mode: buttons

Configuration_AIP2-EQD.docx

Version: 1.6.18634

Page 5 of 25

Expanded view of quality data

Use  the  true/false  parameter  to  enable/disable  the  zoom  function.  If  the  zoom  mode  is  activated,  the

 icon appears on the bottom right in the document/document text displayed.

To scale the measured  value input dialog, use the  default_scale_factor  option to change the calculated

scaling factor subsequently. 100 equals the calculated factor.

You

can

change

the  design  of

the

inspection

list

to  a

certain  extent.

If  you  want

to  change

the  design  of

the

inspection

list,  use

the  parameter

"[FONT_VIRTUALSTRINGTREE]    DefaultNodeHeight"  of  the  configuration  file  caq_dc_t.ini.

For further information, refer to the relevant configuration description.

To request control chart and histogram data, you can use different data bases. They are configured in the

following options:

- default_controlchart_context

- default_histogram_context

If you want to request a control chart for one characteristic, define the following fields:

RECTYP|BER|PANNR|PAUNR|AFO

If the control chart should be requested for an article for all orders, define the following fields:

RECTYP|BER|ATK|AFO

You can also define the data basis for each control chart or histogram in the chart_data_source

configuration.

The following illustration shows a possible configuration:

Dialogs

You assign layout configurations to the relevant input dialogs in the <dialogs> section.

Specify the dialog as follows:

Configuration_AIP2-EQD.docx

Version: 1.6.18634

Page 6 of 25

Expanded view of quality data

<dialog id="dialog specification">

The dialog used to collect measured values including a reference to the inspection point is, for example:

qee_mw_me_es_pp_si and requires the following configuration. Use lower case letters for the specification.

<dialog id="qee_mw_me_es_pp_si">

The dialog specifications are included in the MOC application of the dialog configuration. The relevant input

dialogs for inspection data generally start with QEE.

The  above-mentioned  configurations  are  always  created  for  the  first  dynamic  dialog  of  the

relevant workflow configuration.

In the example above, the relevant input workflow is MW_ME_ES_PP_SI. Its first dynamic dialog

has the name QEE_MW_ME_ES_PP_SI.

After the dialog has been specified, assign the layout XML file as follows:

<configuration_file>layout.xml</configuration_file>

You can define any XML file name.

Configuration_AIP2-EQD.docx

Version: 1.6.18634

Page 7 of 25

Expanded view of quality data

General element configurations

Configuration

Description

Valid values

context_change

workdir

Collection of acronyms
causing the element to be
refreshed.

The applicable values result from the
definition of all context change methods of
the global configuration.

Use this parameter to define
a working directory in the
corresponding CAQ order
folder.

Use a valid folder name. If this value is not
defined, the system assigns a name.

The "workdir" specifications must be
unambiguous within an XML file. This means
that each element must have a different
"workdir" specification.

Static elements must have a "workdir"
specification that is unambiguous with all
XML files.

To display an element, you must or you can set the following attributes in the configuration for the element:

Configuration

Description

class

Defines the element class. The system currently

supports the following element classes:

-  ControlChart1

-  ControlChart2

-  Histogram

-  DocumentControl

-  Grid

-  Custom class

Defines the column showing the element.

Defines the row showing the element.

(Optional)

Defines the number of columns that should be

displayed.

(Optional)

Defines the number of rows that should be displayed.

col

row

colspan

rowspan

Configuration_AIP2-EQD.docx

Version: 1.6.18634

Page 8 of 25

Expanded view of quality data

description

(Optional)

Use this attribute to give the element a name. Then

this name is displayed in the validation program if an

error occurs.

Sample configuration:

Element configurations to request data from the HYDRA server

Elements,  which  request  data  from  the  HYDRA  server,  require  additional  configurations.  Include  the
following parameters for this purpose:

Configuration

Description

Valid values

list_source

Configuration of the list
requested

See HYDRA lists

All elements of the global configuration for
the element <context_placeholder>.

list_dynamic_filter

list_static_parameter

Configuration example:

Dynamic filters to request
data from the HYDRA
server. The system then fills
the specified acronyms with
the values of the current
node.
e.g.:

RECTYP=%RECTYP%
becomes: RECTYP=FEP

Static parameters that are
directly attached to the
command for the HYDRA
server. If you want to enable
a combined filtering of a
field content, e.g. showing
failure types and failure
causes in one grid, then
separate them using a pipe
slash ("|").

Configuration_AIP2-EQD.docx

Version: 1.6.18634

Page 9 of 25

Expanded view of quality data

Control chart component

The class names are ControlChart1 and ControlChart2. The numbers 1 and 2 refer to the control charts 1

and 2 you can define in the MOC.

Configuration

Description

Default value*

Valid values

header_font_style

Header is shown in bold and/or
italic

show_y_axis_desc

Shows the Y-axis

            false

show_x_axis_desc

Shows the X-axis

            false

show_specified_value  Shows the target value

            false

show_tolerance_limits  Shows tolerance limits

            true

header_visible

Shows header

            false

show_chart_caption

Shows the control chart
description

            true

scale_by_y_axis

Scaling based on the Y-axis

            false

show_single_values

Shows each of the measured
values

            false

show_grid_lines

Shows the grid

            false

workdir

Restriction: The grid is only
shown if you enabled the
display of both axis labels.
Temporary working directory

italic
bold
italic, bold

            true
            false

            true
            false

            true
            false

            true
            false

            true
            false

            true
            false

            true
            false

            true
            false

            true
            false

show_action_limits

Shows action limits

            true

            true
            false

Configuration_AIP2-EQD.docx

Version: 1.6.18634

Page 10 of 25

Expanded view of quality data

header_title

Caption

show_warning_limits

Shows warning limits

            false

            true
            false

measure_value_count  Number of measured values to

10

be displayed

background_color

Background color

R=255,G=255,B=255

x_axis_field

X-axis label

Sample

All acronyms of
file "RGK.lst"

Special
acronyms see (1)
below the table

chart_data_source

RECTYP|BER|PANNR|
PAUNR|AFO

Use these fields to request the
relevant control chart data from
the HYDRA server. If no
definition is specified here, the
system uses the values of the
global option
<default_controlchart_context>.

Configuration_AIP2-EQD.docx

Version: 1.6.18634

Page 11 of 25

Expanded view of quality data

type

Use this parameter if, as
opposed to the control chart
definition, you want to show
another control chart in
inspection planning.

The feasible values are the
active status IDs of the status
type REGELKART. Refer to the
status application to view these
status IDs.

*The default value will be used if you did not explicitly define a configuration. Therefore, you do not have to

configure these properties with the default value.

(1) For the following acronyms, specially formatted outputs are available.

Acronym from RGK.lstt

Formatted acronym

Output format

WERT:DAT

DatumE

dd.mm.yyyy

WERT:ZEI

ZeitE

hh:mm

LWERT:DAT

DatumL

dd.mm.yyyy

LWERT:ZE

ZeitL

hh:mm

WERT:VONK

SPABS:ZEI

Datum Zeit E
Combined  using  DatumE  +
ZeitE
Datum Zeit L
Combined  using  DatumL  +
ZeitL
ZeitA

hh:mm

SPABS:DAT

DatumA

dd.mm.yyyy

Datum Zeit A
Combined value from DatumL
+ ZeitL

Sample configuration:

Configuration_AIP2-EQD.docx

Version: 1.6.18634

Page 12 of 25

Expanded view of quality data

Histogram component

Class name: Histogram

Configuration

Description

Default value*

show_grid_lines

Shows the grid

            false

class_count

Restriction: The grid is only
shown if you enabled the
display of both axis labels.
Number of displayed classes.
If nothing is specified, the
HYDRA server calculates the
number.

header_font_style

Header is in bold and/or italic

header_title

Caption

show_y_axis_desc

Shows the Y-axis

            false

show_x_axis_desc

Shows the X-axis

            false

background_color

Background color

R=255,G=255,B=255

Valid

values

true

false

italic
bold
italic,
bold

true

false

true

false

Configuration_AIP2-EQD.docx

Version: 1.6.18634

Page 13 of 25

show_chart_caption  Shows the control chart

            true

description

header_visible

Shows header

            false

Expanded view of quality data

true

false

true

false

RECTYP|PANNR|PAUNR|AFO

chart_data_source

Use these fields to request
the relevant control chart data
from the HYDRA server. If
nothing is specified here, the
system uses the values from
the global option
<default_histogram_context>.

Sample configuration:

Document view showing documents directly

Class name: DocumentControl

Configuration

Description

Default value*

document_source

Type of document view

Valid

values

grid

Set  this  value  always  to  grid
for
presentation
this
component.

Generally
parameters:

possible

grid  =  List  of  documents
the
immediately
selected document

showing

Configuration_AIP2-EQD.docx

Version: 1.6.18634

Page 14 of 25

list_only  =  List  of  documents
without  showing  the  selected
document immediately

file  =  Directly  showing  the
document with a fixed position
number

header_title

Caption

can_zoom_document  Specifies if the zoom button is
shown. If this parameter is not
specified,  the  system  checks
the
option
global
<can_zoom_document>.

True

header_visible

Shows header

            false

header_font_style

Header is in bold and/or italic

entry_id

ID  of  the  document  to  be
shown. Refers to the DOKNR
field in the list of documents.

Expanded view of quality data

true

false

true

false

Italic

bold

italic, bold

list_static_parameter  The

static

parameters
mentioned  in  "List,56“  in  the
section  "list  components"  are
available.

With  this  element,  you  must  also  specify  the  configuration  parameters  to  request  lists  from  the  HYDRA

server.

Sample configuration:

List of documents without showing the document

Class name: DocumentControl

Configuration_AIP2-EQD.docx

Version: 1.6.18634

Page 15 of 25

Configuration

Description

Default value*

document_source

Type of document view

Expanded view of quality data

Valid

values

list_only

Set  this  value  always  to
list_only
this
presentation component.

for

Generally
parameters:

possible

grid  =  List  of  documents
immediately  showing
the
selected document

list_only = List of documents
without
the
selected
document
immediately

showing

file  =  Directly  showing  the
document  with  a
fixed
position number

columndef_section_name  Refers

to

the

column

definition from ctaiplay.ini

header_font_style

Header  is  in  bold  and/or
italic

header_title

Caption

scroll_mode

Scroll  mode  of
element

the  grid

buttons

list_grid_local_filter

Filter applied to the grid after
requesting  and  preparing
data.

header_visible

Shows header

            false

list_static_parameter

static

parameters
The
mentioned in "List,56“ in the
section  "list  components"
are available.

italic

bold

italic,  bold

buttons

scrollbars

true

false

With  this  element,  you  must  also  specify  the  configuration  parameters  to  request  lists  from  the  HYDRA

server.

Configuration_AIP2-EQD.docx

Version: 1.6.18634

Page 16 of 25

Expanded view of quality data

Lists with document view

Class name: DocumentControl

Configuration

Description

Default value*

document_source

Type of document view

Valid

values

file

Set  this  value  always  to  file
presentation
this
for
component.

Generally
parameters:

possible

grid  =  List  of  documents
immediately  showing
the
selected document

list_only = List of documents
without showing the selected
document immediately

file  =  Directly  showing  the
document  with  a
fixed
position number

columndef_section_name  Refers

to

the

column

definition from ctaiplay.ini

percentage_grid_usage

States  the  percentage  for
the
zooming
document grid

in/out

50

view_align

Aligns  the  elements  (above
or below each other)

Vertical

header_font_style

Header is in bold and/or italic

header_title

Caption

scroll_mode

Scroll  mode  of
element

the  grid

buttons

can_zoom_document

Specifies if the zoom button
is shown.

vertical

horizontal

italic

bold

italic,  bold

buttons

scrollbars

Configuration_AIP2-EQD.docx

Version: 1.6.18634

Page 17 of 25

header_visible

Shows header

            false

Expanded view of quality data

true

false

With  this  element,  you  must  also  specify  the  configuration  parameters  to  request  lists  from  the  HYDRA

server.

List components

Class name: Grid

Configuration

Description

Default value*

Valid
values

columndef_section_name  Refers

to

the

definition
"ctaiplay.ini"

from

column
file

the

list_static_parameter

header_font_style

Static  parameters  for  the
HYDRA server command to
be executed

Header  is  in  bold  and/or
italic

header_title

Caption

scroll_mode

Scroll  mode  of
element

the  grid

buttons

header_visible

Shows header

            false

italic

bold

italic, bold

buttons
scrollbars

true

false

With  this  element,  you  must  also  specify  the  configuration  parameters  to  request  lists  from  the  HYDRA

server.

Static elements

Static elements are configured exactly as all other available elements. The only difference is that they are

configured in the global configuration file in the element static_elements.

Configuration_AIP2-EQD.docx

Version: 1.6.18634

Page 18 of 25

Expanded view of quality data

In  the  <static_elements>  section  configure  elements  that  should  never  be  shown  with  changed  content

irrespective of the node. One example is the continuous display of a drawing. A drawing can be displayed

unchanged  irrespective  of  the  current  node.  The  advantage  of  static  elements  is  that  you  only  have  to

request  these  elements  once.  If  you  change  nodes  in  the  inspection  list,  the  system  does  not  have  to

request and refresh this element data once more. Below is an example for the definition of the static display

of a document with item number 99:

OCX extension component

An extension component can include all configurations from the General Element Configurations. Further

options are managed within the component.

Technical implementation for customer extensions:

The component must support the following functions:

  AIPDataChanged([in] BSTR value);

o  No return value
o  Data are transmitted as a string.
o  Object Pascal (Delphi) procedure AIPDataChanged(const Value: WideString);

The data string includes the individual fields (values) separated by a pipe. The function is called up

when the context changes.

Configure the context change in the corresponding element using the following XML configuration:

<context_change>characteristics_value</context_change>

  BeforeRemoveElement
o  No return value
o  No data transmission

The function is called before the element is destroyed.

Configuration_AIP2-EQD.docx

Version: 1.6.18634

Page 19 of 25

Expanded view of quality data

Creating an OCX component in Delphi XE7

Start by setting up a new ActiveX-Library type project.

Then, store the project with a relevant name. Do this in the menu File --> Save project as. You are prompted

to store three files.

In the next step, add an ActiveX form to the project. Go to the menu item File|New|Other.

Define the name of the CoClass. This name is equivalent to the COM object name in which the interface

can be implemented.

The  relevant  interface  is  created  after  clicking  Confirm.  The  system  implements  the  functions  in  the

generated form class.

Add  the  functions  listed  above.  In  addition,  use  the  tab  button  to  define  the  corresponding  function

parameters (see illustration).

Finally, update the implementation. The system adds the new functions to the form class.

An  ActiveX component  with the name Project_name.ocx is created after clicking on Save. Register this

component as administrator with regsvr32.

Configuration_AIP2-EQD.docx

Version: 1.6.18634

Page 20 of 25

Expanded view of quality data

Now integrate this component as an element in the configuration for the relevant measured value dialog.

The class name matches the name of the ActiveX Library and the coClass name.

In our example, it is ExampleOCX.ExampleDisplayClass.

<element class="ExampleOCX.ExampleDisplayClass" col="5" colspan="2" row="1" rowspan="2">

<settings>

<context_change>characteristics_value</context_change>

</settings>

        </element>

Creating in Visual Studio 2015

Create a project Windows Forms Control Library.

Add the following attributes:

  ComVisible(true)
  Guid  should be re-generated
  ProgId  name with which the COM class is accessed
  ClassInterface(ClassInterfaceType.AutoDual)

In addition, add the functions mentioned in the section "Technical implementation for customizations".

Configuration_AIP2-EQD.docx

Version: 1.6.18634

Page 21 of 25

Expanded view of quality data

In the next step, make the assembly COM visible in the project properties.

Finally, register the DLL with regasm.exe. Use the command:

regasm.exe /codebase mylib.dll

Configuration_AIP2-EQD.docx

Version: 1.6.18634

Page 22 of 25

Expanded view of quality data

When configuring static elements, make sure that they are only used in one scope! Otherwise

there  may  be  side  effects  when  positioning  and  displaying  individual  elements  as  a  result  of

merging the global XML file.

HYDRA lists

Designation

Inspection order header data

Characteristic data

Call parameters

List;54

Pruefschritt.lst

List;55

Merkmal.lst

Further applicable documents/texts

List;56

data.lst (in the folder according to the specification

in the relevant XML configuration file)

following

The
available:

"list_static_parameters"

are

  MOD:KONTEXT=PAN

Only  shows
inspection requirement.
  MOD:KONTEXT=PAUMM

the  documents  of

the

Only  shows
characteristic.

the  documents  of

the

Filter dynamically by the "OP sequence" and do not

use  the  above-mentioned  static  parameters  in

order to show the documents of the characteristic

and the inspection requirement.

Failure type catalog

Measures catalog

Measured values

Sample status

Assessment catalogs

List;57

List;58

List;60

Einzelwerte.lst

List;65

List;70

Configuration_AIP2-EQD.docx

Version: 1.6.18634

Page 23 of 25

Expanded view of quality data

Control chart data

List;71

RGK.lst

List with results of the inspection order search

List;72

Histogram data

List;79

data.lst (in the folder according to the specification

in the relevant XML configuration file)

INI entries from DB

List of logged on inspection orders

Statistics calculation

List;95

List;96

List;99

“AFO”_char_var_stat.lst,

e.g. 100_char_var_stat.lst

Analysis selection catalogs

List;100

MerkmalAnAusKat.lst

CAQ options

Number pool

Tools

Cavities

Samples

 Inspection points

List;101

List;111

List;112

List;122

List;123

Stichproben.lst

List;124

PPunkt.lst

Failures and measures relating to a machine

List;127

Validation of the configuration

You can use a program to validate the configuration changes that you have made.

The program configurationvalidator.exe is stored on the HYDRA server in the subfolder .\ctnet\win\shared\.

Before using the program, make a local copy of the program on your host.

Configuration_AIP2-EQD.docx

Version: 1.6.18634

Page 24 of 25

Expanded view of quality data

After  program  start,  use  the  field  Select  AIP  root  directory  to  select  the  AIP  directory  that  contains  the

changed configurations. Use the AIP main directory and not the subdirectory .\functions.

Select in field "Group" the entry "CAQ" and in field "Category" the entry "EQD".

Use the button Validate configuration to validate all included EQD configurations. The list at the bottom of

the window shows the validation results.

Defective entries are identified via a red symbol. Messages have a blue symbol. Validated configuration

files that do not include any messages or errors are identified via a green check.

You  can  ignore  error  messages  with  the  additional  information  "->  The  defined  class

<???_inactive> could not be found“.

The error message refers to inactive areas that you can easily integrate into you configuration.

Just remove the „_inactive“ in the class name "class=".

Configuration_AIP2-EQD.docx

Version: 1.6.18634

Page 25 of 25

