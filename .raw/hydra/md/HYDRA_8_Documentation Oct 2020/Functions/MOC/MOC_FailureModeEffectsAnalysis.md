FMEA

1  FMEA (Failure Mode and Effects Analysis)

Menu

Quality management  FMEA  FMEA ->

Transaction code

fmea

Function authorization

fmea,  fmevnu,  fmevnue,  tmg,  fmeastru,  fmeadoc,  failnet,  doctype,  DOC-
LINK, docli, fmeaexport, fmeacpl

Available user fields

Where

Object type/user field key

Source (type)

Element type system

FMEASTRUCTURE/SYSTEMELEM

MF-D

Detail view

Element type process

FMEASTRUCTURE/PROCESS

MF-D

Detail view

Element type function

FMEASTRUCTURE/FUNCTION

MF-D

Detail view

Element type failure

FMEASTRUCTURE/FAILURE

MF-D

Detail view

Element type
characteristic

Detail view

Element type revision
state

Detail view

FMEASTRUCTURE/SYSTEMELEM

MF-D

FMEASTRUCTURE/MEASURELEVEL

MF-D

Element type measure

FMEASTRUCTURE/MEASURE

MF-D

Detail view

How to configure user fields?

Which user field types are available?

MOC_FailureModeEffectsAnalysis.docx  Version: 1.3.18483

Page 1 of 22

FMEA

Field descriptions

The following paragraphs list the available selection fields. To insert the fields into the tree, you can use

drag and drop. (Edit mode must be activated)

The symbol of the mouse pointer reveals if you can insert the element selected below the element where

the mouse pointer is placed.

Field description

Enter new process/system element using drag and drop. (Edit mode must be activated).  To insert

the selected element, release the mouse key. The Insert dialog opens automatically.

MOC_FailureModeEffectsAnalysis.docx  Version: 1.3.18483

Page 2 of 22

FMEA

Tab Identification

Element type

The element type is either "Process element" or "System element".

Designation (name)

You can enter any description into the field

Identification

Alphanumerical field for the element number, for example 1.4.1 for the first entry in level 3.  This field

is maintained manually and can remain empty.

Comment

You can add further information in here.

Tab Details

operation

Number  of  the  operation  including  selection  list.  Can  be  entered  manually.  Operation  can  be  non

existent.

Operation name

Name of the operation.  Can be entered manually.

Machine

The workplace catalog is available for selection.  By default, the list is filtered for resources of the

type  MNR  (machine  number).  You  can  change  the  filter.    When  confirming  the  selection,  the

workplace number is transferred.

Machine name

Display of the name of the assigned machine.

Machine group

The workplace catalog is available for selection.  By default, the list is filtered for resources of the

type MNR (machine number). You can change the filter.  When confirming the selection, the system

transfers the selected workplace group.  If you assign the machines directly, the system does not

automatically transfer the group of the selected machines.

MOC_FailureModeEffectsAnalysis.docx  Version: 1.3.18483

Page 3 of 22

FMEA

Revision state

You can manually enter a date which identifies the revision state of this process element.

Tab Article

Article number

The article list is available for selection.  After opening the list, the system filters only active articles.

After confirming the selection, the system transfers the fields "Article number", "Drawing issue no"

and "Article name".

Article name/designation

The system dynamically identifies and displays the article name for the article number and drawing

issue number displayed.

Drawing issue number

Drawing issue number of displayed article

Tab Party in charge

Party in charge, type

Selection list including the long status names of the active statuses of status type Party in charge. If

you create a new party in charge, the long name of the status "Person" is displayed by default.

Party in charge

Content of the field "Number" of the selected data record, e.g. number of the selected person.  Directly

after opening, the system only displays active data records from the selected type. After selecting,

the contents of the fields "Name 1", "Name 2" and "Name 3" are accepted and then transferred into

the respective name fields.

Party in charge, Name 1, Name 2, Name 3

The field contents of Name 1, Name 2 and Name 3 of the party in charge are shown. The customer

name and the content of the address fields 1 and 2 are displayed for customers. The last name, first

name and initials are displayed for external persons.

MOC_FailureModeEffectsAnalysis.docx  Version: 1.3.18483

Page 4 of 22

FMEA

Tab Identification

Element type

The element type is either "Process element" or "System element".

Failure

Selection of the failure type from the master data catalog.  Select a failure. The failure name is then

added in the field Failure designation. You can change or extend the name, if required. After the initial

entry of a failure number, the system checks if this failure exists in the master data catalog on saving

the entry. If not, an error message occurs.

Failure designation

The failure name is added to the master data entry of the previously selected failure number.

Identification

Alphanumerical field for the element number, for example 1.4.1 for the first entry in level 3.  This field

is maintained manually and can remain empty.

Comment

You can add further information in here.

Tab FMEA Rating numbers

Evaluation S

Requests list of the detail application FMEA rating numbers. The list is filtered by the entries of the

evaluation catalog assigned in the FMEA header and of the evaluation type "S". The rating number

is taken over.

Evaluation name

Display of the evaluation name relating to the rating number previously selected.

MOC_FailureModeEffectsAnalysis.docx  Version: 1.3.18483

Page 5 of 22

Description

Display of the description of the rating number previously selected.

FMEA

Tab Identification

Element type

The element type is either "Process element" or "System element".

Characteristic

Select a characteristic from the master data catalog.  After selecting, the failure name is integrated

into the characteristic name field and can be changed  or extended if required.  When you directly

enter a characteristic number, the system checks if the characteristic is available in the master data

catalog. If not, an error message occurs.

Characteristic designation

The characteristic name is added to the master data entry of the characteristic number previously

selected.

Identification

Alphanumerical field for the element number, for example 1.4.1 for the first entry in level 3.  This field

is maintained manually and can remain empty.

Comment

You can add further information in here.

MOC_FailureModeEffectsAnalysis.docx  Version: 1.3.18483

Page 6 of 22

Tab Details

FMEA

Classification

This function ranks a critical or crucial characteristic.  For information purposes only.

FMEA form

Specifies if the given characteristic is a part of the FMEA form.

Inspection plan

Specifies if the given characteristic is a part of the inspection plan.  Only for information purposes.

Characteristic type

This option specifies whether the collection of measured values (variable) or the identification of the

number of detected failures (attributive) is used for the inspection. In case of an attributive inspection,

the decision is often only based on the "pass" or "fail" results. Further characteristic types are the

inspection  chart  and  the  information  characteristic.  The  information  characteristic  is  only  used  to

display a document during the inspection process. Subject to the input type, the lower area of the

dialog provides the respective sampling schemes.

Inspection result base

This  setting  defines  whether  all  samples  or  only  the  sample  recorded  last  is  used  to  identify  the

inspection result (pass/fail).

Gage type

This defines if a test equipment or a test equipment group should be assigned to a characteristic.

Test equipment (gage)

This field is not visible if the Gage type "Test equipment group" is selected.  The resource catalog is

available for selection.  The system filters by resource type PRM (test equipment).  When confirming

the  selection,  the  resource  and  the  resource  name  is  accepted  in  the  fields  "Gage"  and  "Gage

designation".

Gage designation (name of test equipment)

After  selecting  the  test  equipment,  the  system  displays  the  name.    (This  field  is  invisible  if  the

inspection plan type "Test equipment group" is selected.)

MOC_FailureModeEffectsAnalysis.docx  Version: 1.3.18483

Page 7 of 22

FMEA

Test equipment (gage) group

This field is not visible if the test equipment type "Test equipment number" is selected.  The resource

family catalog is available for selection.  The system filters by resource type PRM (test equipment).

When confirming the selection, the resource family and the resource family name is accepted in the

field  "Group"  and  "Group  name".    If  you  select  and  insert  a  characteristic  from  the  characteristic

catalog, this field is populated with the respective contents of the selected characteristic.

Group name (designation)

After selecting the test equipment group, the system displays the name.  (This field is invisible if the

inspection plan type "Test equipment number" is selected.)

Tab Specification

Sampling scheme

The sampling scheme defines the inspection procedure. In case of an n-c inspection and parameters

5-0, 5 pieces are checked and 0 failures may be detected.

Sample size

If you select and insert a characteristic from the characteristic catalog, this field is populated with the

respective contents of the selected characteristic.

Acceptance quantity

Here you can define the number of authorized failed parts. This field is only visible if NC is selected

during a sampling scheme.  Initially assigned with "0".  If you select and insert a characteristic from

the  characteristic  catalog,  this  field  is  populated  with  the  respective  contents  of  the  selected

characteristic.

MOC_FailureModeEffectsAnalysis.docx  Version: 1.3.18483

Page 8 of 22

FMEA

Decimal places

The specified number of decimal places is later displayed in the tree structure. If you select and insert

a characteristic from the characteristic catalog, this field is populated with the respective contents of

the selected characteristic.

Size

Tolerance limits can be stated in absolute, relative and proportional values.  Please note that relative

and proportional lower limits must be stated in negative numbers.

Standard

Calculation of tolerances based on specific standards (e.g. ISO metric fits). Subject to the selected

standard, further information is requested (e.g. engineering fit). The system automatically calculates

the tolerance  limits on the  basis of these specifications. Displays the  active status entries.  If  you

select  and  insert  a  characteristic  from  the  characteristic  catalog,  this  field  is  populated  with  the

respective contents of the selected characteristic.

Fit

Calculation of tolerance limits on the basis of a specific standard and engineering fit. The selected fit

depends on the selected standard. The system displays entries accordingly.  The content changes

due  to  the  selected  fit.  The  content  of  the  selected  characteristic  is  assigned  to  the  field  when

selecting and accepting a characteristic from a catalog.

Calculating tolerance limits with fits

If you activate this field, tolerance limits are automatically calculated according to the standard and

requirement for fits.

Upper TL/Lower TL

Enter/display the upper and lower tolerance limit.  If you select and insert a characteristic from the

characteristic  catalog,  this  field  is  populated  with  the  respective  contents  of  the  selected

characteristic. (Only visible if the field "Size" absolute was selected).

Upper TL rel. % and lower TL in %

Enter/display the upper and lower tolerance limit.  If you select and insert a characteristic from the

characteristic  catalog,  this  field  is  populated  with  the  respective  contents  of  the  selected

characteristic. (Only visible if the size 'relative' was chosen).

Target value

Entry/display  of  the  target  value.    If  you  select  and  insert  a  characteristic  from  the  characteristic

catalog, this field is populated with the respective contents of the selected characteristic.

Unit

The unit catalog is available for selection.  The system accepts the unit after confirming the selection.

If you select and insert a characteristic from the characteristic catalog, this field is populated with the

respective contents of the selected characteristic.

MOC_FailureModeEffectsAnalysis.docx  Version: 1.3.18483

Page 9 of 22

FMEA

Tab Identification

Element type

The element type is either "Process element" or "System element".

Function type

ID of the function type

Designation (name)

Any description of the function element can be entered.

Identification

Alphanumerical field for the element number, for example 1.4.1 for the first entry in level 3.  This field

is maintained manually and can remain empty.

Comment

You can add further information in here.

MOC_FailureModeEffectsAnalysis.docx  Version: 1.3.18483

Page 10 of 22

FMEA

Tab Identification

Element type

The element type is either "Process element" or "System element".

Identification

Alphanumerical field for the element number, for example 1.4.1 for the first entry in level 3.  This field

is maintained manually and can remain empty.

Comment

You can add further information in here.

Evaluation O (occurrence)

Selection of likelihood of occurrence as stated in the catalog of the FMEA overview.

Evaluation name

See catalog entry.

MOC_FailureModeEffectsAnalysis.docx  Version: 1.3.18483

Page 11 of 22

Description

See catalog entry.

Evaluation D (Detection)

Selection of likelihood of detection of a failure as stated in the catalog of the FMEA overview.

FMEA

Evaluation name

See catalog entry.

Description

See catalog entry.

Risk Priority Number (RPN)

Calculated by multiplying scores of likelihood of failure occurring or being detected.  S x O x D. The

value S is generated from the highest S-value of all possible failure modes.  Rejected measures are

not  used  in  the  RPN  calculation.    If  no  detection  or  avoidance  measure  is  available,  the  RPN

calculation is not conducted.

Tab Details

Measure status

The measure status  is generated from subordinate measures  which shows the lowest processing

status and displayed here. The measure status is displayed here.

Revision state

Date when measures were taken.

MOC_FailureModeEffectsAnalysis.docx  Version: 1.3.18483

Page 12 of 22

FMEA

Tab Identification

Element type

Identifier of the element type, in this case "Measure element"

Measure type

You can define if it is an avoidance or a detection measure.

Measure

Selection of a measure from the master data catalog.  Select a measure. The name is then used  for the

field Measure name. You can change or extend the field content, if required.

Identification

Description  of  the  hierarchical  element  assignment  within  the  overall  tree  structure  using  a

"Numbering".

Comment

You can add further information in here.

Tab Details

Measure text

You can add further information in here.

Measure status

The processing status is documented using the above status.

Show externally

This field is used for information only.  This is the basis to control which measures should be shown

when external people are present.  We recommend to activate that field.

Fulfillment level in %

Fulfillment level is documented here.  Numbers from 0 until 100 can be entered.

Effectiveness in %

Effectiveness is documented here.  Numbers from 0 until 100 can be entered.

MOC_FailureModeEffectsAnalysis.docx  Version: 1.3.18483

Page 13 of 22

Tab Party in charge

FMEA

Party in charge, type

Selection list including the long status names of the active statuses of status type Party in charge. If

you create a new party in charge, the long name of the status "Person" is displayed by default.

Party in charge

Content of the field "Number" of the selected data record, e.g. number of the selected person.  Directly

after opening, the system only displays active data records from the selected type. After selecting,

the contents of the fields "Name 1", "Name 2" and "Name 3" are accepted and then transferred into

the respective name fields.

Party in charge, Name 1, Name 2, Name 3

The field contents of Name 1, Name 2 and Name 3 of the party in charge are shown. The customer

name and the content of the address fields 1 and 2 are displayed for customers. The last name, first

name and initials are displayed for external persons.

Tab Date

Target date

Measures must be completed or rejected until the target date.

The actual date is entered manually. It documents when the measure was completed or rected.

MOC_FailureModeEffectsAnalysis.docx  Version: 1.3.18483

Page 14 of 22

FMEA

Toolbar

  Enable edit mode

To edit an FMEA, you must enable the edit mode.  This mode blocks an opened FMEA for all other users.

The FMEA is read-only.  When editing is completed, disable the edit mode.

   All / only main elements

When using this button, the system shows the tree view filtered for main elements.  Main elements are

system and process elements.  If you select this button again, you switch to view all elements ("all").

  Expand all

If you select this button, the tree view expands.  If you use a filter, only main elements are expanded.  If

you select all elements (default setting), all elements expand.

   Collapse all

  If you select this button, the tree view collapses.  The filter "all / only main elements" is not affected

by it.

   Print form

This button prints an FMEA form for a selected process or system element.

  Calling the production control plan

MOC_FailureModeEffectsAnalysis.docx  Version: 1.3.18483

Page 15 of 22

  Use this button to display and print a production control plan using the FMEA data. Requirement: You

must select a system or process element and the "FMEA-PLP" license must be available.

FMEA

  Export of characteristic data

  Use this button to display and print a production control plan using the FMEA data. Requirement: You

must select a system or process element and the "FMEA-PLP" license must be available.

Detail application "Production control plan"

License

FMEA-PLP

All characteristic elements are identified for the selected system/process element that are located below

the element and have an active checkbox "Production control plan" in the "Details" tab. Characteristics are

also included which belong to lower-level system and process elements.

In  the  printed  form,  characteristics  belonging  to  a  system  element  are  printed  in  the  "Product"  column.

Characteristics of a process element are displayed in the column "Process".

The part / process number and the process name are derived from the "Part number", "Operation" and

"Operation designation" fields of the associated system / process element.

The "Inspection system" column displays the test equipment or test equipment group name and in brackets

the  associated  identification  number.  The  contents  of  the  columns  "Frequency",  "Control  method"  and

"Action if fail" are defined in the  the following user fields of the FMEA characteristics:

  Frequency: userfield_c63 (20 alpha numerical characters)

  Control method: userfield_c65 (40 alpha numerical characters)

  Action with fail: userfield_c66 (40 alpha numerical characters)

The customer creates the user fields.

To define the header data of the production control plan, an input dialog is opened before the actual printout.

MOC_FailureModeEffectsAnalysis.docx  Version: 1.3.18483

Page 16 of 22

FMEA

Detail application "Export inspection plan"

License

FMEA-PPL

If  you  press  the  button  "Export  inspection  plan",  a  window  opens.  Enter  a  number  and  a  version.  The

number and version entered are used for the data file that is then created.

Confirm the entry. The system identifies all characteristic elements of the selected system/process element.

The system only uses the elements, if two conditions are fulfilled: the characteristic elements are one level

below the system/process element and for the respective characteristics, the option  "Inspection plan" is

enabled  in  tab  "Details".  The  characteristics  identified  are  exported  into  a  CSV  file.  The  CSV  data  file

includes a header and a data row for each characteristic.

The file name is structured as follows:

FMEA_<number>_<version>_<article  number>_<drawing

issue  number>_<YYYY-MM-DD>-

T<HH-MM-SS>.123csv

MOC_FailureModeEffectsAnalysis.docx  Version: 1.3.18483

Page 17 of 22

FMEA

FMEA:

<number>

<version>

always FMEA

number of input dialog

version of input dialog

<article number>

article number of the selected process/system element

<drawing issue number>  drawing issue number of the article of the selected process/system element

<YYYY-MM-DD>

system date at the point in time of export

T

always T to make clear that the time is specified in the following.

<HH-MM-SS>

time of export

.123 number of milliseconds at the point in time of export

The data file generated is stored in the directory of the HYDRA path "QMIMP". When you import the

characteristic data for an inspection plan later on, the data file for the import is selected in this path. If the

HYDRA path "QMIMP" does not exist, you must create this path in the HYDRA path configuration.

The below screenshot shows a possible path configuration for the import of HYDRA-FMEA characteristic

data.

You must not only specify the HYDRA path, but you must also ensure that the specified URL path is

available on the HYDRA server. If the specified path is not available, you must manually create the path

on the HYDRA server.

For the final import, you require the functions of the inspection planning based on CAD. For this reason,

the above path configuration must be identical to the path configuration for the import of the CAD data

file.

After the data export, the result is displayed in a dialog. You can also show the exported data file in the

dialog.

MOC_FailureModeEffectsAnalysis.docx  Version: 1.3.18483

Page 18 of 22

FMEA

Attaching documents

To attach documents to an FMEA, the following configuration is required:

  Define own document types for the FMEA that can be stored in a separate location on the server.
  And: Create a new document type in the application Editing document types, e.g. FMEAFILE.

MOC_FailureModeEffectsAnalysis.docx  Version: 1.3.18483

Page 19 of 22

Changing the label texts

Labels are dynamically created. You can specify the label layout. Create an INI configuration to this end.

Creating INI configuration:

FMEA

Creating INI data configuration:

  Name: FMEA
  Create different labels for the structure element and for the network/network tooltip/tree, i.e. for

the tree 7 different types, for network (label and tooltip) 3 different types each (failure, function,
characteristic).

  You need not store definitions for all types, only for the types that overwrite the standard.
  Available sections:

o  FMEASTRUCTURETREE
o  FMEASTRUCTURENET
o  FMEASTRUCTURENETTOOLTIP

  Available keys
o  PROCESS
o  SYSTEM
o  FUNCTION
o  CHARACTERISTIC

MOC_FailureModeEffectsAnalysis.docx  Version: 1.3.18483

Page 20 of 22

FMEA

o  FAILURE
o  MEASURELEVEL
o  MEASURE



For each INI configuration, you can configure 128 characters as value. To define longer labels, you
can add an "_n" to the keys with n being the number of the relevant entry.

  Up to 9 different entries are supported, from "_1" to "_9", i.e. a total of over 1100 characters.

Example process element:



Specify the properties in angle brackets <acronym>.

  Note: If you use several INI data configurations for an element type, only save complete words,

because a space character is added at the end of an INI data entry. It is NOT permitted:

o  PROCESS_1 ending with "<acro"
o  PROCESS_2 beginning with "nym>"

  The following fields are available for the label configuration:

o  All fields of list service if useful and WITHOUT fields with time



without field gauge_type

Special features:
o  The fields

lower_tolerance_limit_rel,

lower_tolerance_limit,
  upper_tolerance_limit_rel,
  upper_tolerance_limit,


target_value

are formatted using the specified number of decimal places in the element
(decimal_places).

o  The fields

  actual_date
  target_date
  measure_date

are formatted using a date format that is reproduced in the field. Use the following syntax in
these fields: <acronym;DATEFORMAT> with DATEFORMAT providing the following options:



yyyy for a year with four digits

MOC_FailureModeEffectsAnalysis.docx  Version: 1.3.18483

Page 21 of 22

FMEA

  MM for a month with two digits
  dd for a day with two day

Examples:

  The configuration <measure_date;dd.MM.yyyy> is used to display the revision state in

format 27.02.2013.

  The configuration <measure_date;MM-dd-yyyy> is used to display the revision state in

format 02-27-2013.



Special feature of labels and tooltips in the network: Additionally to the fields of the actual
element, you can use parent node fields of the system or process element. A "SYSPROCELEM" is
added to these acronyms, e.g. <SYSPROCELEM.designation>.

MOC_FailureModeEffectsAnalysis.docx  Version: 1.3.18483

Page 22 of 22

