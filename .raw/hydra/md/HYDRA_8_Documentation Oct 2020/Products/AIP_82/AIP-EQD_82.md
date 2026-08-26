Manual

Expanded View of Quality
Data / Alternative Inspection
Start
AIP-EQD 8.2

Version 1.1.23049

Last changed on: 01.09.2020

                                             Expanded View of Quality Data / Alternative Inspection Start

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

AIP-EQD_82.docx

Version: 1.1.23049

Page 2 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

Contents

1  Expanded View of Quality Data / Alternative Inspection Start ..................... 4

2  Expanded View of Quality Data ................................................................... 5

3  Alternative Inspection Start - Inspection without Operation Logon .............. 9

4  Configuration for the Expanded View of Quality Data ................................ 15

AIP-EQD_82.docx

Version: 1.1.23049

Page 3 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

1  Expanded View of Quality Data / Alternative Inspection Start

Purpose

If  you  collect  inspection  data  on  the  AIP,  you  can  use  the  product  Expanded  View  of  Quality  Data  /

Alternative Inspection Start to display additional quality data in parallel. Via configuration, you can display

different quality data in the different input dialogs.

You can also activate the following special inspection modes:

  Goods Receipt

  Laboratory

  Calibration

Implementation notes

You  use the product  Expanded View  of Quality Data / Alternative  Inspection Start if  you  want to collect

inspection data of any kind.

Integration

The  product  Expanded  View  of  Quality  Data  /  Alternative  Inspection  Start  is  part  of  the  "data  collection

and  information  functions  for  quality  data"  and  extends  the  inspection  functions  of  the  AIP  shop  floor

terminal. Using this product, you can display additional quality data. You can also improve the inspection

process and activate special inspection modes.

Features

The following functions are available:

  You  can  configure  the  display  of  additional  quality  data.  This  quality  data  is  then  displayed  in

parallel  to  the  inspection  data  collection:  List  of  documents,  history  of  failures  and  measures,

drawing, inspection note, control charts and histogram.

  You can define position and size of the additionally displayed quality data.

  Depending  on  the  input  type  (variable,  attributive,  inspection  chart,  evaluation  of  codes,  visual

defects recording, etc.), you can display different objects.

  You  can  define  globally  valid  configurations  or  configurations  valid  only  for  a  terminal/terminal

group.

  You  can  activate  special  inspection  modes  for  the  goods  receipt,  the  laboratory  tests  and  the

calibration.

AIP-EQD_82.docx

Version: 1.1.23049

Page 4 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

2  Expanded View of Quality Data

Purpose

Use the function "expanded view of quality data", if you want to show further quality data in parallel to the

input  dialog.  This  is  for  example  necessary  if  you  want  to  permanently  display  a  stamped  drawing  in

addition  to  the  inspection  data.  You  can  show  assigned  documents  as  a  list  or  optionally  in  full  screen

mode.

Requirements

Meet the following requirements:

  Active license AIP-EQD with AIP 8.2.







ctaip.exe as of version:

8.2.0.24

caq_dc_t.dll as of version:  8.2.0.13

caq72.dll as of version:

8.2.0.3

The  planned  machine  or  machine  group  must  be  included  in  the  group  "Workplace"  in  the  MOC

application Inspection requirement, on the level of the inspection step, tab Inspection step. This requires

that  the option One  inspection step for  each inspection station  is set  in the inspection  planning. On the

level of the characteristics, no inspection stations need to be assigned.

Activation

To  activate  the  option,  make  the  following  entry  in  the  file  "caq_dc_t.ini".  This  file  is  stored  in  the  AIP

subfolder "functions".

[OPTIONS]
ACTIVATE_EQD=1

Features

Use  the  expanded  view  of  quality  data  to  show  additional  context-sensitive  information  in  the  CAQ

recording of measured values. Possible contexts are: measured value, inspection point or characteristic.

The application provides the following display elements to show the information:

-  Control chart

-  Histogram

-  Data list

E.g. failures of a specific characteristic

-  Document

view

AIP-EQD_82.docx

Version: 1.1.23049

Page 5 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

E.g. image of a part

-  Document list with document preview

Configure a list of documents with direct document view.

-  Document list without document preview

Show a list and double-click a document that will then open in a separate window.

See the following layout examples:

Inspection points

Showing measured values:

AIP-EQD_82.docx

Version: 1.1.23049

Page 6 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

Recording of measured values

Configure the display elements (e.g. control chart, histogram and data list) using a configurable number of

rows and columns of the  recording of measured values. Configure  every display  element separately for

each input type. Example:

Show a list of failures for a characteristic and show a control chart for the measured values.

Use XML files for the configuration. Change specific properties of an element directly in the respective tag

of the XML configuration.

Sample configuration for a display element

The below example shows a document list with direct display of the contents of the selected data record.

For further information refer to the document Configuration_AIP-EQD.

AIP-EQD_82.docx

Version: 1.1.23049

Page 7 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

Integration of customer-specific components

In  addition  to  the  above-mentioned  display  elements  and  their  configuration  properties,  you  can  also

show  customer-specific  components  in  a  specific  display  area  of  the  AIP  screen.  To  do  so,  the  system

sends the current node data to the component when you change nodes in the inspection list.  Therefore,

you can always refer to current CAQ data.

AIP-EQD_82.docx

Version: 1.1.23049

Page 8 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

3  Alternative Inspection Start - Inspection without Operation

Logon

Purpose

The  following  three  fields  of  application  have  specific  requirements  regarding  the  inspection  process.

They are different to the usual in-production inspection on the production terminal.





Incoming goods inspection

In-production inspection at an exclusive inspection station (e.g. in the lab)

  Calibration

Use the Alternative Inspection Start for these three inspection processes. You do not need to log on an

operation.

Requirements

Meet the following requirements:

  Active license AIP-EQD with AIP 8.2.







ctaip.exe as of version:

8.2.0.33

caq_dc_t.dll as of version:  8.2.0.15

caq72.dll as of version:

8.2.0.7

Activation

The following fields of application have specific inspection modes:





Incoming goods inspection

In-production inspection at an exclusive inspection station (e.g. in the lab)

  Calibration

Only one of the modes can be active. Restart the terminal software if you change mode. For activation,

one of the following configurations is required in the file „hytnrcfg.ini“ in the section „[CAQ->Optionen 0]“:

Inspection mode "Goods receipt inspection"

[CAQ->Options 0]

TERM_MODE= GOODS_RECEIPT

Inspection mode "Production inspection at an exclusive inspection station (e.g. in the lab)".

[CAQ->Options 0]

TERM_MODE=LAB

AIP-EQD_82.docx

Version: 1.1.23049

Page 9 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

Inspection mode "Calibration"

[CAQ->Options 0]

TERM_MODE=CALIBRATION

The terminal uses the first entry found for "TERM_MODE".

If  the  parameter  "TERM_MODE"  in  section  "[CAQ->OPTIONS  0]"  includes  several  entries,

comment out the irrelevant ones.

Activate a specific main layout for the tile view of each of the inspection modes. The layout files can be

found in the AIP subfolder "gui". Activate the main layout as follows:

Inspection mode "Goods receipt inspection"

Rename the file "l_main#lgoods#.xml“ in "l_main.xml".

Inspection mode "Production inspection at an exclusive inspection station (e.g. in the lab)".

Rename the file "l_main#llab#.xml“ in "l_main.xml".

Inspection mode "Calibration"

Rename the file "l_main#lcal#.xml“ in "l_main.xml".

In addition, the CAQ option 1157 must be enabled and have the entry Y in the field Value. Also assign the

parameter

[GROUP:GEPLANT,MNR,MGRP,OPT_PLAN]

in

the

field  Addition.  The  parameter

[GROUP:GEPLANT,MNR,MGRP,OPT_PLAN]  groups  the  inspection  step  characteristics  by  assigning

them to the fields  "Planned", Machine group", "Machine" and "Inspection station". For each combination

an  inspection  step  is  generated.  The  inspection  steps  will  then  include  the  contents  of  the  grouping

criteria  in  the  respective  fields.  The  inspection  steps  must  include  these  grouping  criteria.  The  system

uses the grouping criteria to specify the respective inspection steps that are required for the three special

inspection modes.

The system creates an inspection step, if option  1157 is configured accordingly for each combination of

grouping  criteria  and  if  the  option  One  inspection  step  for  each  inspection  station  is  enabled  in  the

inspection plan header.

For  the  inspection  mode  Calibration,  you  must  set  the  parameter  PAN_AU/AUNR_COPY  in  the  field

Action  of  the  application  Area-Order  type  configuration  (Menu  entry  System  administration    System

settings). This configuration automatically generates a calibration inspection requirement if the calibration

calendar includes a calibration order.

AIP-EQD_82.docx

Version: 1.1.23049

Page 10 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

Logging of data

If  logging  is  required,  you  must  set  the  following  parameter  in  the  hytnrcfg.ini  in  section

"[OPTIONS 0]".

TERM_MODE_DEBUG=ON

Using this parameter, the inspection data included in the spool directory is not deleted when the

inspection dialog is closed. This is required in case of an upload with this inspection mode, for

example.

It is best to set this parameter in the local file hytnrcfg.ini, to write-protect the file and to restart

the  AIP.  After  the  secured  logging  (e.g.  via  upload),  remove  the  write-protection,  delete  the

parameter and restart the terminal.

Functionality – Inspection mode "Goods receipt inspection"

The inspection mode "Goods receipt inspection" is displayed in a special layout.

All possible inspection steps of this workplace are displayed. The displayed inspection steps are identified

as follows:

1.  The machine group of the inspection station is identified.

2.  Using the specifications in the terminal configuration, the possible inspection steps are limited to the

area type and the area.

3.  The inspection steps of the machine group are identified, if the machine group matches the one of the

inspection station. In addition, the inspection steps planned for the machine are identified, if the

machine and the inspection station are identical.

As  soon  as  the  system  generates  a  goods  receipt  inspection  via  interface  in  HYDRA,  the  inspection  is

displayed after a cyclic update.

You can configure the update interval in the file "caq72.ini" in the subfolder "packets" using the parameter

"LOADCYCLE".

[DATACONTEXT_GOODS_RECEIPT]
LOADCYCLE=300
DATAPROVIDER_ID=PAUMNR
LIST=u_l_caq_inspstep_tnr

AIP-EQD_82.docx

Version: 1.1.23049

Page 11 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

The standard layout can display up to 18 inspection steps at the same time. You can integrate the filter

field  and  then  filter  by  all  displayed  inspection  step  contents.  By  default,  the  displayed  inspection  steps

are sorted in ascending order according to the date/time of inspection step generation. You can use the

"caliper" button to access the inspection process.

The  function  to  complete  the  inspection  requirement  is  a  special  feature.  This  function  automatically

identifies inspection steps and inspection requirement results. If required, you can change them.

When you complete an inspection step, the system automatically sets the QM operation to "completed".

Requirement: the QM operation must not be logged on and the processing code must define the OP as

inspection OP. If the finished QM operation is the last operation to be finished in the order, the order is

then set to the status "Completed".

If the inspection step is completed in the offline status, the operation is not automatically set to

"completed".  This  would  require  a  manual  posting  later  on  when  the  terminal  is  online  again

("posting  required").  If  the  required  posting  is  not  made,  the  inspection  step  is  not  completed.

There is no message that the inspection step has not been completed.

Functionality – Inspection mode "In-production inspection at an

exclusive inspection station"

This inspection mode does not require an operation logon either. Contrary to the in-production inspection

at an exclusive inspection station requiring a QM logon, this inspection mode instantly shows all possible

inspection points at this inspection station.

All  possible  inspection  points  of  this  workplace  are  displayed.  The  displayed  inspection  points  are

identified as follows:

1.  The machine group of the inspection station is identified.

2.  Using the specifications in the terminal configuration, the possible inspection steps are limited to the

area type and the area.

3.  The inspection steps of the machine group are identified, if the machine group matches the one of the

inspection station. In addition, the inspection steps planned for the machine are identified, if the

machine and the inspection station are identical.

4.  For each of the identified inspection steps, all possible inspection points are identified.

As soon as an inspection point is generated when an inspection is due, the terminal shows the inspection

point of the specific inspection station after the specified updating interval.

AIP-EQD_82.docx

Version: 1.1.23049

Page 12 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

You can configure the update interval in the file "caq72.ini" in the subfolder "packets" using the parameter

"LOADCYCLE".

[DATACONTEXT_LAB]
LOADCYCLE=300
DATAPROVIDER_ID=PPKTMNR
LIST=u_l_caq_insppoint_tnr
SECTION=DATACONTEXT_LAB_INSP_PT_MATURITY

In  the  list  of  the  inspection  point  tiles,  you  can  manually  generate  free  inspection  points  using  the  "+"

button.  Using  the  button,  the  relevant  inspection  steps  of  this  inspection  station  are  identified  and

displayed  in  a  list  you  can  filter.  Select  an  inspection  point  in  the  list  and  use  the  button  "Generate

inspection  point".  A  free  inspection  point  is  generated  for  this  inspection  step.  If  you  do  not  want  to

generate further inspection points, close the list of inspection steps manually.

Inspection  steps  can  be  completed  in  this  inspection  mode.  Focusing  on  detail  information  on

Workplace/Machine,  you  can  complete  an  inspection  step  using  the  button  "Complete".  The  relevant

inspection steps of this inspection station are identified and displayed in a list you can filter (see above:

generating an inspection point). Select an inspection step and use the button "Complete inspection step".

When you complete an inspection step, the system automatically sets the QM operation to "completed".

Requirement: the QM operation must not be logged on and the processing code must define the OP as

inspection OP. If the finished QM operation was the last operation to be finished in the order, the order is

then set to the status "Completed". If you do not want to generate further inspection points, close the list

of inspection steps manually.

If the inspection step is completed in the offline status, the operation is not automatically set to

"completed".  This  would  require  a  manual  posting  later  on  while  the  terminal  is  online  again

("posting  required").  If  the  required  posting  is  not  made,  the  inspection  step  is  not  completed.

There is no message that the inspection step has not been completed.

Functionality – Inspection mode "Calibration"

This  inspection  mode  automatically  produces  a  calibration  inspection  requirement  including  respective

inspection steps when a calibration order is generated in the calibration calendar. If you want to generate

a calibration inspection requirement via calibration order, the following conditions must be fulfilled:

  Configure the calibration inspection plan as follows:

o  Operation assignment: “One inspection plan for all operations"

o

IO + inspection station: "One inspection step (=IO) for each inspection station"

o  Generate new QM OPs: "None"

o

IO + generate characteristics: "When generating inspection requirements"

AIP-EQD_82.docx

Version: 1.1.23049

Page 13 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

  The  inspection  plan  characteristics  for  the  calibration  must  be  planned  for  a  machine/machine

group.

The inspection mode "Calibration" has a specific layout. The displayed inspection steps are identified as

follows:

1.  The machine group of the inspection station is identified.

2.  Using the specifications in the terminal configuration, the possible inspection steps are limited to the

area type and the area.

3.  The inspection steps of the machine group are identified, if the the machine group matches the one of

the inspection station. In addition, the inspection steps planned for a machine are identified if the

machine is the one of the current workplace.

4.  You  can  configure  the  update  interval  in  the  file  "caq72.ini"  in  the  subfolder  "packets"  using  the

parameter "LOADCYCLE".

These  inspection  steps  are  instantly  displayed  in  the  inspection  mode  "Calibration"  without  operation

logon.

[DATACONTEXT_CAL]
LOADCYCLE=300
DATAPROVIDER_ID=PAUMNR
LIST=u_l_caq_inspstep_tnr

A special feature of the inspection mode "Calibration" is that you can complete the calibration directly on

the  AIP  when  finishing  the  inspection  step  and  requirement.  In  the  process,  you  also  select  the  test

equipment status, the calibration result and the basis for calculating the next calibration.

If  you  complete  the  inspection  requirement,  the  calibration  order  is  automatically  completed,  too.  As  a

condition, the respective QM operation must not be logged on and the OP must be defined as inspection

OP via processing code.

The system resets the calibration in the calibration calendar in the same way as a maintenance activity.

If the inspection requirement is completed in the offline status, the operation is not automatically

set  to  "completed".  This  would  require  a  manual  posting  later  on  while  the  terminal  is  online

again ("posting required"). If the required posting is not made, the inspection requirement is not

completed. There is no message that the inspection requirement has not been completed.

AIP-EQD_82.docx

Version: 1.1.23049

Page 14 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

4

Configuration for the Expanded View of Quality Data

  

Purpose

Use this function, if you want to show further data in addition to the input dialog in the AIP inspection data

collection. For example, you can show the list of documents or directly show a drawing.

The expanded view of quality data is based on a customizable layout for the inspection data collection.

Requirements

The functions described below are available for HYDRA 8 with AIP 8.2 service pack 10 and higher. You

also need the license AIP-EQD.

For  final  activation,  set  the  following  parameter  in  the  CAQ  configuration  file  caq_dc_t.ini  (folder:

functions) in the [OPTIONS] section:

ACTIVATE_EQD=1

Basic configuration

Without  the  expanded  view  of  quality  data,  the  AIP  inspection  data  collection  always  shows  both:  the

inspection list and the dialog  pertaining to the entry  selected in the  inspection  list. The  inspection list  is

always on the left-hand side. The relevant input dialog is always to the right of it. Use the expanded view

of  quality  data  to  arrange  these  two  objects  individually.  In  addition  to  this,  you  can  also  show  further

quality  data  simultaneously.  You  can  also  arrange  these  additional  objects  according  to  your

requirements.

Define the corresponding basic configuration in the file caq_global_gui_settings.xml. This file is stored in

the AIP sub-folder .\functions.

Definition of grids

In the <grid_settings> section of this file, first divide the screen area into the required number of columns

and rows.

Layout of inspection lists and dialogs

AIP-EQD_82.docx

Version: 1.1.23049

Page 15 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

After the grids have been defined, specify the required columns and rows in the section <caqchecklist> to

define which cells are populated by the inspection list. Define the display area for the input dialog in the

<measure_value_content_control> section.

Use the parameters col (columns) and row (rows) to define where the cells that are populated begin. The

colspan  and  rowspan  parameters  define  the  number  of  columns  and  rows  that  are  populated.  If  the

column and row width equals 1, you do not have to specify the span parameter.

The following illustration shows a configuration example.

The example configuration above would result in the following layout for inspection list and input dialogs.

Context elements

AIP-EQD_82.docx

Version: 1.1.23049

Page 16 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

You  can  use  the  section  <context_elements>  to  define  context  elements  with  a  different  database.  For

example,  you  require  the  definition  of  context  elements  to  specify  which  change  of  a  node  or  element

does not trigger an update of the contents of the objects displayed additionally in the inspection list. For

example,  the  document  list  or  other  objects  need  usually  not  be  updated  when  you  change  from

measured values container 1 to the next measured values container within the same characteristic. If you

suppress an update, you can enter further data within a shorter time. Therefore, we recommend this data

suppression.

To define a context element, make the following entry in the <context_elements> section.

<context_element id="context name">

The  context  name  can  be  any  name.  Below  the  context  element,  define  the  parameters  that  clearly

describe  this  context.  With  regard  to  the  example  about  updating  above,  this  means  that  the  system

triggers an update anytime the content of these parameters changes. Define the context parameters as

follows:

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

AIP-EQD_82.docx

Version: 1.1.23049

Page 17 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

The static = NO_RELOAD element is an exception. This element can be used to completely disable the

update of components.

Placeholders

Using the context_placeholder element,  you can define separate placeholders,  which are  then replaced

with the relevant values from the CAQ node data when setting up the list parameters.

For

Defining placeholders:

example:

AIP-EQD_82.docx

Version: 1.1.23049

Page 18 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

In a specified configuration, these placeholders replace the placeholder %RECTYP% with the RECTYP

value from the current CAQ node data, for example.

Options

Define global settings in the <options> section. These settings serve as the default values in the following

dialog  configuration.  If  you  defined  settings  in  the  "options"  section,  you  do  not  have  to  repeat  these

configurations in the dialog configurations.

Currently,  you  can  globally  define  the  scroll  mode  for  lists  and  the  zoom  option  for  documents.  The

available scroll modes are scrollbars and buttons.

 Mode: scrollbars

 Mode: buttons

AIP-EQD_82.docx

Version: 1.1.23049

Page 19 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

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

AIP-EQD_82.docx

Version: 1.1.23049

Page 20 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

<dialog id="dialog specification">

The dialog used to collect measured values including a reference to the inspection point is, for example:

qee_mw_me_es_pp_si  and  requires  the  following  configuration.  Use  lower  case  letters  for  the

specification.

<dialog id="qee_mw_me_es_pp_si">

The  dialog  specifications  are  included  in  the  MOC  application  of  the  dialog  configuration.  The  relevant

input dialogs for inspection data generally start with QEE.

The  above-mentioned  configurations  are  always  created  for  the  first  dynamic  dialog  of  the

relevant workflow configuration.

In  the  example  above,  the  relevant  input  workflow  is  MW_ME_ES_PP_SI.  Its  first  dynamic

dialog has the name QEE_MW_ME_ES_PP_SI.

After the dialog has been specified, assign the layout XML file as follows:

<configuration_file>layout.xml</configuration_file>

You can define any XML file name.

AIP-EQD_82.docx

Version: 1.1.23049

Page 21 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

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

To  display  an  element,  you  must  or  you  can  set  the  following  attributes  in  the  configuration  for  the

element:

Configuration

Description

AIP-EQD_82.docx

Version: 1.1.23049

Page 22 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

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

AIP-EQD_82.docx

Version: 1.1.23049

Page 23 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

list_source

Configuration of the list
requested

See HYDRA lists

All elements of the global configuration for
the element <context_placeholder>.

list_dynamic_filter

list_static_parameter

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

Configuration example:

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

italic
bold
italic, bold

            true
            false

            true
            false

            true
            false

AIP-EQD_82.docx

Version: 1.1.23049

Page 24 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

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

show_action_limits

Shows action limits

            true

header_title

Caption

show_warning_limits

Shows warning limits

            false

measure_value_count  Number of measured values to

10

be displayed

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

background_color

Background color

R=255,G=255,B=255

AIP-EQD_82.docx

Version: 1.1.23049

Page 25 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

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

*The default value will be used if you did not explicitly define a configuration. Therefore, you do not have

to configure these properties with the default value.

(1) For the following acronyms, specially formatted outputs are available.

AIP-EQD_82.docx

Version: 1.1.23049

Page 26 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

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
Combined
DatumL + ZeitL

value

from

Sample configuration:

Histogram component

Class name: Histogram

AIP-EQD_82.docx

Version: 1.1.23049

Page 27 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

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

show_chart_caption  Shows the control chart

            true

description

header_visible

Shows header

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

true

false

true

false

AIP-EQD_82.docx

Version: 1.1.23049

Page 28 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

Document view showing documents directly

Class name: DocumentControl

Configuration

Description

Default value*

document_source

Type of document view

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

list_only  =  List  of  documents
without  showing  the  selected
document immediately

file  =  Directly  showing  the
document  with
fixed
position number

a

header_title

Caption

can_zoom_document  Specifies  if  the  zoom  button
is shown. If this  parameter is
not  specified,
the  system
checks
the  global  option
<can_zoom_document>.

True

header_visible

Shows header

            false

Valid

values

grid

true

false

true

false

AIP-EQD_82.docx

Version: 1.1.23049

Page 29 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

header_font_style

Header is in bold and/or italic

entry_id

ID  of  the  document  to  be
shown. Refers to the DOKNR
field in the list of documents.

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

Configuration

Description

Default value*

document_source

Type of document view

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

of
=
list_only
documents without showing
document
the

selected

List

AIP-EQD_82.docx

Version: 1.1.23049

Page 30 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

immediately

file  =  Directly  showing  the
fixed
document  with  a
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

Filter  applied  to  the  grid
after
and
requesting
preparing data.

header_visible

Shows header

            false

list_static_parameter

static

The
parameters
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
for
presentation
this
component.

Generally
parameters:

possible

grid  =  List  of  documents

AIP-EQD_82.docx

Version: 1.1.23049

Page 31 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

immediately  showing
selected document

the

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

Header  is  in  bold  and/or
italic

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

header_visible

Shows header

            false

vertical

horizontal

italic

bold

italic,  bold

buttons

scrollbars

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

from

column
file

the

AIP-EQD_82.docx

Version: 1.1.23049

Page 32 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

list_static_parameter

header_font_style

"ctaiplay.ini"

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

In  the  <static_elements>  section  configure  elements  that  should  never  be  shown  with  changed  content

irrespective of the node. One example is the continuous display of a drawing. A drawing can be displayed

unchanged  irrespective  of  the  current  node.  The  advantage  of  static  elements  is  that  you  only  have  to

request  these  elements  once.  If  you  change  nodes  in  the  inspection  list,  the  system  does  not  have  to

request  and  refresh  this  element  data  once  more.  Below  is  an  example  for  the  definition  of  the  static

display of a document with item number 99:

AIP-EQD_82.docx

Version: 1.1.23049

Page 33 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

OCX extension component

An extension component can include all configurations from the General Element Configurations. Further

options are managed within the component.

Technical implementation for customer extensions:

The component must support the following functions:

  AIPDataChanged([in] BSTR value);

o  No return value
o  Data are transmitted as a string.
o  Object Pascal (Delphi) procedure AIPDataChanged(const Value: WideString);

The data string includes the individual fields (values) separated by a pipe. The function is called

up when the context changes.

Configure  the  context  change

in  the  corresponding  element  using  the  following  XML

configuration:

<context_change>characteristics_value</context_change>

  BeforeRemoveElement
o  No return value
o  No data transmission

The function is called before the element is destroyed.

Creating an OCX component in Delphi XE7

Start by setting up a new ActiveX-Library type project.

Then,  store  the  project  with  a  relevant  name.  Do  this  in  the  menu  File  -->  Save  project  as.  You  are

prompted to store three files.

AIP-EQD_82.docx

Version: 1.1.23049

Page 34 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

In the next step, add an ActiveX form to the project. Go to the menu item File|New|Other.

Define the name of the CoClass. This name is equivalent to the COM object name in which the interface

can be implemented.

The  relevant  interface  is  created  after  clicking  Confirm.  The  system  implements  the  functions  in  the

generated form class.

Add  the  functions  listed  above.  In  addition,  use  the  tab  button  to  define  the  corresponding  function

parameters (see illustration).

Finally, update the implementation. The system adds the new functions to the form class.

An  ActiveX component  with the name  Project_name.ocx is created after clicking on Save. Register this

component as administrator with regsvr32.

Now integrate this component as an element in the configuration for the relevant measured value dialog.

The class name matches the name of the ActiveX Library and the coClass name.

In our example, it is ExampleOCX.ExampleDisplayClass.

AIP-EQD_82.docx

Version: 1.1.23049

Page 35 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

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

AIP-EQD_82.docx

Version: 1.1.23049

Page 36 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

In the next step, make the assembly COM visible in the project properties.

Finally, register the DLL with regasm.exe. Use the command:

regasm.exe /codebase mylib.dll

AIP-EQD_82.docx

Version: 1.1.23049

Page 37 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

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

Filter  dynamically  by  the  "OP  sequence"  and  do

not use the above-mentioned static parameters in

order to show the documents of the characteristic

and the inspection requirement.

Failure type catalog

Measures catalog

Measured values

Sample status

Assessment catalogs

Control chart data

List;57

List;58

List;60

Einzelwerte.lst

List;65

List;70

List;71

AIP-EQD_82.docx

Version: 1.1.23049

Page 38 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

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

The  program  configurationvalidator.exe

is  stored  on

the  HYDRA  server

in

the  subfolder

.\ctnet\win\shared\. Before using the program, make a local copy of the program on your host.

After  program  start,  use  the  field  Select  AIP  root  directory  to  select  the  AIP  directory  that  contains  the

changed configurations. Use the AIP main directory and not the subdirectory .\functions.

Select in field "Group" the entry "CAQ" and in field "Category" the entry "EQD".

AIP-EQD_82.docx

Version: 1.1.23049

Page 39 of 40

                                             Expanded View of Quality Data / Alternative Inspection Start

Use the button Validate configuration to validate all included EQD configurations. The list at the bottom of

the window shows the validation results.

Defective entries are identified via a red symbol. Messages have a blue symbol. Validated configuration

files that do not include any messages or errors are identified via a green check.

You  can  ignore  error  messages  with  the  additional  information  "->  The  defined  class

<???_inactive> could not be found“.

The error message refers to inactive areas that you can easily integrate into you configuration.

Just remove the „_inactive“ in the class name "class=".

AIP-EQD_82.docx

Version: 1.1.23049

Page 40 of 40

