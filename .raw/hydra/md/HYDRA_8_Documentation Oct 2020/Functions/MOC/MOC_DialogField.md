Dynamic dialog fields

1  Dynamic Dialogs - Fields

Overview

Menu

System administration  Terminals  Dynamic dialogs,

Tab Dynamic Dialogs - fields

Transaction code

ddconf

Function authorization

ddconf

Other option:

Menu

System administration  Terminals  Dynamic dialogs - fields

Transaction code

ddconff

Function authorization

ddconff

Purpose

You can use the configuration of the dynamic dialogs to change the AIP input dialogs in a quick and efficient

manner according to the user's requirements.

The system delivery includes a basic dialog configuration. You can edit and change this configuration using

the functions described in the following.

You can edit the dialog fields in two places: in the tab integrated in the application Dynamic dialogs and in

the application Dynamic dialogs - fields. You can change existing fields (e.g. positioning), create new fields

or delete fields.

The complete functionality of the dialog configuration includes a lot of options, but it is also very

complex. For this reason, we recommend to change the dialogs only after consultation with MPDV

and only by experts.

Integration

To define the tab order, the dialogs and the buttons, you need not only use the application Dynamic dialogs

-  fields,  but  also  the  applications  Dynamic  dialogs  -  Workflow,  Dynamic  dialogs  and  Dynamic  dialogs  -

Function keys.

Requirements

The dialog must exist in the Dynamic dialogs function.

MOC_DialogField.docx

Version: 2.4.22352

Page 1 of 17

Dynamic dialog fields

Some of the functions require the development license MDS-AIS to be fully available. Basics of

the functions without development license:

-  Existing  data  can  be  changed.  Only  data  for  default  dialogs  with  user  0  must  not  be

changed without development license.

-  You  cannot  create  new  data  without  development  license,  except  fields  in  existing

dialogs.

-  You can copy the existing data to terminal groups or terminals and then change them.

Without development license, you cannot copy to default dialogs with user 0.

With the fields of the dynamic dialogs, all functions are available without development license.

But without development license, you cannot create, edit or delete default dialogs for user 0.

Selection criteria

The application provides the following selection criteria. The selection criteria are read-only. The values

entered in the previous application are automatically preassigned.

  Dialog

Selection by dialog

Type

Selection by dialog types:

  AIPDEF/DEF – standard dialog

  AIPTNR/TNR – terminal dialog

  AIPTGRP/TGRP – dialog for terminal group

User

Selection by terminal number or terminal group

Editing functions

The application "Dynamic dialogs - fields" only provides the usual editing functions: insert, edit and delete.

If you use the application Dynamic dialogs, you can change to the toolbar tab Dynamic dialogs - fields. This

toolbar  provides  the  usual  editing  functions  and  additionally  the  detail  application  Edit  fields.  Using  this

editing application, you can easily manage and edit the fields of a dialog.

Detail application Edit fields

In the detail application Edit fields, you can right-click the table view to open a context menu. The

context menu provides the following functions:

MOC_DialogField.docx

Version: 2.4.22352

Page 2 of 17

Dynamic dialog fields

New row

Inserts a new row in the grid for the definition of a field.

Several new rows

Inserts the specified number of rows in the grid.

Copy row

Copies the currently select row and inserts it in the grid.

Delete row(s)

Deletes the currently selected row(s) from the grid.

Swap fields

The selected rows are swapped. You can select one of the two methods:

-  Swap positions

Swaps the X and Y positions of texts, fields and units of the two selected entries.

-  Swap field numbers

The field numbers and the tab order of the fields are swapped.

Align fields

Automatically aligns function keys in the X or Y direction.

Move fields

Moves one or several fields in the X or Y direction. Buttons are moved using the specified offset

("Move by").

Apply fields from other dialog

Takes over several fields from the selected dialog.

Field description

Tab General

Activated

This option is only available for reasons of downward compatibility. Always enable the option.

Field no.

Consecutive number of input field in dialog. Specifies the tab order in the dialog.

Text

Unit

Text label of field (on the left of the field).

Text for unit (on the right of the field).

MOC_DialogField.docx

Version: 2.4.22352

Page 3 of 17

Dynamic dialog fields

Information

Information text displayed in tooltip if focused with mouse (mouseover).

Identifier

Identification of the data field in the dialog data string, e.g. ANR  |ANR=123456780100|

ID index

Index of field identification for similar data fields, e.g. |EGR:GUT=12340|.

Tab Position

X pos. text

X position of field label

Y pos. text

Y position of field label

X pos. field

X position of data field

Y pos. field

Y position of data field

Unit X pos.

X position of text for unit

Unit Y pos.

Y position of text for unit

Tab Format

Alignment

Alignment of text in input field.

"L"

"R"

left

left-aligned

right

right-aligned

Category

INPUT  Field is an input field.

TEXT

GRID

Alphanumeric text

Table

OPTION

Option field

RADIO

Selection group

(as of CTAIP: see "field attribute 1-8"  "EXTENDED")

MOC_DialogField.docx

Version: 2.4.22352

Page 4 of 17

Dynamic dialog fields

Input type

Input type of data field.

ALPHA

alphanumeric

NUMERISCH

numeric without decimal places

FLIESS

DATUM

ZEIT

DAUER

numeric with decimal places

date

time (00:00:00 - 23:59:59)

time period (00:00:00 - 9...9:59:59)

Alternatively,  a  you  can  edit  a  preconfigured  field  type  for  user  fields  in  the  input  type  using  the

selection list, for example ANR. Only MPDV can change the field type for user fields.

Length

Total length of input field in characters.

Formatting

If  a  field  type  for  user  fields  is  entered  in  the  "Input  type"  field,  the  formatting  is  done  using  the

formatting rules defined for the field type.

If you use the simple input types (FLIESS,...), you can specify in field Formatting how the contents

are  displayed.  Exceptions:  types  NUMERISCH  and  ALPHA;  you  cannot  store  a  format  for  these

types.

Sample configurations of input fields of the different input types:

FLIESS

###,### or -###,### or #########

 with or without algebraic sign.

The decimal separator must be "‚" or ".".

DAUER

hhhhh:mm:ss  maximum 99999:59:59, h: hours with leading zeros

  -dddd:mm:ss  maximum 9999:59:59 + sign,

d:

hours without leading zeros,

-: sign allowed.

dd,iiii:

industrial format

DATE

TIME

dd.mm.yyyy

Default for date fields (need not be specified)

hh:mm:ss

Default for time indications

hh:mm

Time without seconds (with leading zeros)

(must be specified (mandatory))

Allowed characters

You can restrict the characters that can be used. The restriction only applies for the category "INPUT".

If no characters are entered, there is no restriction.

e.g. A-Za-z0-9

MOC_DialogField.docx

Version: 2.4.22352

Page 5 of 17

Dynamic dialog fields

Default

You can store a default value that is preassigned to the input field.

 e.g. 1.5.

From

Lower limit of default (only relevant for EINGABE category)

To

Upper limit of default (only relevant for EINGABE category)

Optional field 1

Only relevant for OPTION category

Optional field 1:  Value, if active

Optional field 2

Only relevant for OPTION category

Optional field 2:  Value, if inactive

Radio button

Labels and values for radio buttons (only relevant for RADIO category),

For example:

J:Yes:F7;N:No:F8;V:Maybe:F9

1st Value: Return value (identification = X), if selected

2nd Value: Text next to radio button

3rd Value: Function key (optional)

On the AIP, the function keys are automatically assigned to the dialog buttons using the sequence

displayed. If the function key of the radio button is additionally configured as function key of a dialog

button  that  triggers  actions  or  is  automatically  assigned  on  the  AIP,  then  the  dialog  button  takes

priority over the radio button.

Tab Functions

Field attribute 1 to 8

Field attributes for input fields

  You  can  use  "@AKRONYM/KENNUNG@"  to  configure  an  alternative  identification  to  initialize

dialog variables.

Application example: (dialog "TRANRLIST“)

Dialog field/ID "MATPUF“. The column "MPUFF" of the MNR.LST file includes the value

initializing the field.

The  field  will  be  initialized  properly  when  opening  the  dialog,  if  the  field  "MATPUF"  is

configured with field attribute "@MNR.MPUFF@". An additional terminal script is not required.

MOC_DialogField.docx

Version: 2.4.22352

Page 6 of 17

Dynamic dialog fields



If the field attribute "DATA.LEN=xxx" is configured, the input length of a field can be changed. The

display length is not affected. Example: DATA.LEN=40 (input length 40).

  MANUELL – Input field is visible and editable

  STATUS – Input field is visible but not editable

  NULL - Input field may remain empty and is assigned with default value

  FOCUS - Input field is focused when the dialog is shown

  FOCUSNEXTFIELDONBARC – After editing the field using a serial barcode, the subsequent field

is focused.

  BARCODE - Data can only be entered via barcode (keyboard locked)

  READONLY - This field cannot be edited.

  SETVALUE - if configured, the value included in the "default" field is used as the default value, e.g.

for statuses (ID "MST") in the "log on OP" dialog. Without this identification, the default value is not

written into the field. Note the following on the processing:

If a field is configured several times with SETVALUE (i.e. the same field is included in more than

one tab of a workflow), the configuration with the lowest tab index "takes priority".

If a field is configured several times with SETVALUE on one workflow/tab page, the configuration

with the greatest field index (no.) takes priority.

  UPPERCASE – Data input is converted into capital letters.

  PASSWORD – Input without visible characters ('***') - transmission is not encrypted

  PWD - Input without visible characters ('***') - transmission is performed with Blowfish encryption

  PWDRSA - Input without visible characters ('***') - transmission is performed with RSA encryption

(only AIP2 as of V# 8.2.1.10 and hypdm32.dll V# 8.2.1.24)

  EMPTY – For NUMERIC fields only: if the field value is deleted, an empty input field is displayed

instead of value 0.

  UNSELECT – prevents the whole field content from being selected, if the field is focused.

  DIALOGLISTE - modal list dialog that can be called (button behind input field)

Dialog list function must be filled (see below)

  COMBOBOX – Field contains combobox;

Combobox function must be filled. (Is not used on

the terminal).

General field attributes:

  AUTO - Input field is not visible on the terminal, but field ID is assigned

  LABELFONT  –  Font  type  and  background  color  of  label  are  used  to  display  the  input  field.  In

combination with the NOBORDER parameter, an input field can be created that is displayed as a

label.

  NOBORDER - The input field is displayed without depth effect.

  FIELDLABELFONT – The input field font and background color do not depend on the label. Font

type  and  background  color  are  displayed  as  configured  in  the  file  "dialog.ini"  (section  "layout",

values of "FieldLabelFont") (as of CTAIP).

MOC_DialogField.docx

Version: 2.4.22352

Page 7 of 17

Dynamic dialog fields

  COLORLABELFONT – The input field font and background color do not depend on the label. Font

type  and  background  color  are  displayed  as  configured  in  the  file  "dialog.ini"  (section  "layout",

values  of  "ColorLabelFont")  (as  of  CTAIP).  For  further  information,  refer  to  the  section  "Further

descriptions", paragraph "Field attribute <COLORLABELFONT>".

  FIELD – shows variable "data" labels. Select the category "TEXT". The "identification" field must

be filled (only CTWIN).

  EXTENDED – If configured in the field attribute, you can configure further properties with category

<RADIO> in the following fields as of AIP:

- Number of columns in field "length"

- Width in field "X position of unit"

- Height in field "Y position of unit"

  AUTOTAB – If the field is completely filled with characters, the cursor goes to the next input field.

Example: If a barcode reader is connected via keyboard, the scan can take up several input fields

(only CTWIN).

Field attributes of category GRID:

  <XXX>_GRID – Definition/function of table (<XXX> = variable; setting only by MPDV)

Entry

AG_GRID

Description

Table with running operations at the machine selected (A_AUT_HU,
A_AUT_MPL, A_AUT_RF).

C_MG_BLZ_GRID

Table with quantity info on the input batches for the operation of the
machine selected (C_MG_BLZ).

CA_INFO_GRID

Table with batches preceding the operation selected
(C_VLOS_MPL, C_VLOS_RF, C_VLOS_S)

CE_ASW_GRID

Table with components of the operation selected (CE_ASW_RF).

CE_GRID

Table of components/input batches of the operation selected with
processing (A_AN_[MPL,RF,S], A_P_AN_[MPL,RF],
CE_WL[MPL,RF,S]).

CE_INFO_GRID

Table of components/input batches of the operation selected for
display (CA_WL_MPL).

FHM_GRID

Table of the resources used at the selected machine (RES_WL).

KOMP_VERB_GRID  Table with components of the selected operation to enter discrete

consumption (A_VERB).

PAL_GRID

Table to display the batches of a pallet (C_PALETTE).

SCRIPT_GRID

Table for the display of variable contents. The
configuration/processing is defined in the relevant dialog script.

WF_GRID

Table for the display of variable contents. Here, the
configuration/processing is performed via the configuration in the
section (field Dialog list function) in the layout file
(ctwinlay.ini/ctaiplay.ini).

MOC_DialogField.docx

Version: 2.4.22352

Page 8 of 17

Dynamic dialog fields

-  AUTOFILTERFIELD – Display of an auto filter field in a table. The column(s) affected by this filter

are  stored  in  the  file  "ctaiplay.ini"  in  the  relevant  list  as  value  of  AUTOFILTERCOL.  (Only  in

connection with field attributes: SCRIPT_GRID, WF_GRID / as of CTAIP)

  METER – Progression display. The value is displayed as a percentage. (CTAIP and CTWIN)

  TEXTVIEW – Display of a text file



IMAGE – shows pictures (as of CTAIP)

- STRETCH – shows pictures / adjusts pictures (as of CTAIP)

- STRETCH_PROP – shows pictures / adjusts and fits proportions (as of CTAIP)

- MOUSEDOWN – shows pictures / calls user exit <DynDlgFieldExit_..>(from CTAIP)

  SHAPE – shows a line defined in group "position" in the "general" tab:

field  X/Y    start

position

Unit X/Y  width and height(As of CTAIP)



INDICATOR – Display of a measured value indicator (As of CTAIP)

ONCHANGE – attribute triggering animation of the data displayed in the measured value indicator

when measured values are entered in the input field. To do so, the attribute ONCHANGE must be

set for the input field.

  CHART – Display of control charts and histograms. (As of CTAIP)

  FIELDPAGER  –  You  can  use  this  component  to  perform  the  following  entry  if  configured

accordingly:

o  Multiple input field (e.g. to enter multiple scrap values / dialog: A_TR)

o  Multiple function keys (e.g. for the status change / dialog: M_MST_Q)

For  further  information,  refer  to  section  "Further  descriptions",  paragraph  "Field  attribute

<FIELDPAGER>".

As mentioned above, field attributes must be written in capital letters.

MOC_DialogField.docx

Version: 2.4.22352

Page 9 of 17

Dynamic dialog fields

Dialog list function

Function for the dialog list, which can be called on the terminal for dynamic dialogs.

Available dialog lists (entry in the LISTE field; case sensitive):

MNR_LISTE:

List of operations running at the machine

VAG_LISTE:

Order sequencing list (only CTWIN)

VMST_LISTE:  Machine status list

VGGRD_LISTE:  List of deviation reasons

VAGRD_LISTE:  List of scrap quantity reasons

VNCH_LISTE:

List of rework reasons (as of ADE 7.2/ MW2.0)

VPRB_LISTE:

List of problem quantity reasons (as of ADE 7.2/ MW2.0)

VLPKZ_LISTE:

List of premium indicators

VBPOS_LISTE:  List of operator positions

ZLO_LISTE:

List of material buffers (MPL)

TPE_LISTE:

List of transport units (MPL)

HZTYP_LISTE:  List of material types (MPL)

REQRES_LIST : List of the allowed and assigned resources of a required resource (only AIP2)

Combobox function

Leave  this  field  empty  with  current  configurations.  This  option  is  only  available  for  backward

compatibility  reasons  and  was  used  for  selection  lists  on  the  clients  from  older  system  versions

(before MW 3).

Select file

File used to read the list (only relevant in combination with the Combobox function).

Function 1

Function started upon entering the field, called by parameter list in/out.

Function 2

Function started upon leaving the field, called by parameter list in/out

Options

Blocked

If the field is blocked, it won't be made available by the AIP when the dialog is activated.  Therefore,it

is unknown in the AIP.

Visible

Invisible fields are processed in the AIP but not displayed.  Invisible fields can be used to send fixed

acronyms from the AIP to the server.  A target value should be added to invisible fields and the field

attribute SETVALUE.

MOC_DialogField.docx

Version: 2.4.22352

Page 10 of 17

Dynamic dialog fields

Visible/invisible with dialog control

The meaning of this field/control changes whether the option Visible is set or not.

- 'Visible' set  > Not visible when dialog control is enabled

- 'Visible' not set  > Visible when dialog control is enabled

Depending on how the "Visible" option is set, you can use identifiers to specify when the field/control

is displayed or not.

For further information, refer to the section "Further descriptions", paragraph "Dialog control ".

DB table 1

DB tables, reserved for customization.

DB field 1

DB fields, reserved for customization.

DB table 2

DB tables, reserved for customization.

DB field 2

DB fields, reserved for customization.

User defined 1

Additional configuration options:

If your customer documentation includes no other specification, enter AUTO in this field.

User defined 3

Additional configuration options:

If you configure "FLD.LEN=xxx", you can configure a display length of a field that deviates from the

standard, e.g. FLD.LEN=17 (display/input length 17 digits).

Customers often need this configuration to enter longer, customer-specific batch numbers. The

input length of the default batch number is configured in the "length of batch no." field in the basic

parameter settings.

Further descriptions

Dialog control

Configurations

A field Dialog control is provided with the following configurations:

-  Machine/workplace configuration

-  Order type configuration

-  Terminal configuration (not yet available via GUI)

MOC_DialogField.docx

Version: 2.4.22352

Page 11 of 17

In field Dialog control, you enter an "identifier", which controls the further processing.

These identifiers are used in the application Dynamic dialogs - fields in tab Options in the fields  -Visible

Dynamic dialog fields

J/N

- Visible with dialog control/Not visible with dialog control

to integrate the required control of the input fields.

Functionality

An input field/control in a dynamic dialog is displayed, if it is

- visible = J

or

- visible = N, but the Visible with dialog control field includes a (sub) string transferred by the Dialog control

field  of  one  of  the  configurations.  Several  "dialog  control  identifiers"  can  be  specified,  separated  by

semicolon.

An input field/control is not displayed, if it is

-

or

visible

=

N

- visible = J, but the  Not visible with dialog control field includes a (sub) string transferred by the  Dialog

control  field  from  one  of  the  three  configurations.  Several  "dialog  control  identifiers"  can  be  specified,

separated by semicolon.

Example:

-  Machine 4711,

Field Dialog control = M1

-  Order type 0,

Field Dialog control = A1

In the application Dynamic dialogs - fields, the configuration is as follows:

-

[   ] Visible

-  Visible if

[A1;M

]

The input field or control is displayed if either M1 or A1 or both is true. This means: The posting is made for

a machine where the field Dialog control includes M1 and/or an order/OP is logged on where the order type

is configured with A1 in field Dialog control.

The fields that are hidden via dialog control are not sent to the server via dialog strings.

MOC_DialogField.docx

Version: 2.4.22352

Page 12 of 17

Dynamic dialog fields

Field attribute <FIELDPAGER>

With  a  FIELDPAGER,  the  AIP  generates  several  input  fields  for  a  configured  field  in  the  entry  dialog

depending on a list on the AIP. This can be  used to  collect scrap  with several scrap reasons for partial

confirmations and to delete and interrupt operations.  The  FIELDPAGER then generates automatically an

input field for a valid scrap reason on any machine.

The multiple entry is only suitable if you need not display more than 80 elements.

The following fields are used from the dialog configuration:

Identifier

The identification gets the prefix and no „$CT.“ and no index.   Example:

  Scrap:

„$CT.AUS:“

  Rework:

„$CT.NCH:“

  Open quantity:  „$CT.PRB:“

If the machine status is entered hierarchically, the identification is MST.

Positions

  Position Field

FPOSX and FPOSY

= Top left corner of the input object

  Position Unit

EPOSX and EPOSY

= Width and height of the input object

Alignment

"Left"

Category

„Grid“

Length

Input length of multiple fields, e.g. 8

Create an input format

The input format by default is integer. If inputs with decimal places are required, the input format can

be the same as for normal input fields with the input type "FLIESS" and the formatting "####.##" (7

digits with 2 decimal places) or via a configured input type. The input types are restricted to numeric

field types (with or without decimal places).

Field attribute 1

„FIELDPAGER“.

Dialog list function

Preconfigured  fieldpager  from  a  PAGER  -  section  in  the  file  ctaiplay.ini,  for  example  "PAGER-

AGRD.LST" (see below)

User defined 1

„AUTO“

MOC_DialogField.docx

Version: 2.4.22352

Page 13 of 17

Dynamic dialog fields

The fields are generated using the font/size configurations designed for workflow fields (see "Dialog.ini“)

 LabelFont… ( Name, Size, Style, Color )

( for multiple input field identifiers )

 FieldFont … ( Name, Size, Style, Color )

( for multiple input field )

You can configure the available FIELDPAGER in a  PAGER-section of the file ctaiplay.ini. The following

configuration are prepared in the file ctaiplay.ini in the standard.

Section

Purpose

PAGER-AGRD.LST

PAGER-AGRD-NCH.LST

PAGER-AGRD-PRB.LST

Collection of scrap with several scrap reasons in case of
partial confirmations, interruption and termination of
operations.

The FIELDPAGER generates a valid scrap reason for
the input field at the machine.

Collection of rework quantities with several reasons for
partial confirmations or interrupting and terminating
operations.

The FIELDPAGER generates a valid rework reason for
the input field at the machine.

Collection of open quantities with several scrap reasons
for partial confirmations or interruption and termination of
operations.

The FIELDPAGER generates a valid reason for open
quantities for the input field at the machine.

MST-BUTTON-PAGER

Hierarchically input of the machine status.

Example for "Multiple scrap input".

Entry

Comment

Section

[ PAGER-AGRD.LST ]

Configuration in workflows (dynamic dialogs)

 Field attribute:1 =
 List =

FIELDPAGER
PAGER-AGRD.LST

FILE=agrd.lst

Name of file used to generate multiple input fields

INI=

INI/configuration
file
(Default = ctaiplay.ini)

including  grid

layout  definition

SECTION=WF-PAGERPANEL-AGRD.LST  Section  that  includes  the  definition  of  the  grid  layout.
The section "WF-PAGERPANEL-AGRD.LST" is required
because the sorting does not work properly with ORDER
sorting  if  file  contents  are  unsorted.  (Numeric  sorting
alphanumeric
1,2,3,4,5,10,11,22,...
1,10,11,2.22.3.4.5....)

/

MOC_DialogField.docx

Version: 2.4.22352

Page 14 of 17

Dynamic dialog fields

Entry

Comment

FILTER=MNR=<MNR> & ART=A

Possible filter to generate multiple input fields from the file
<FILE>

ORDER=GRTXT

LabelColumn=GRTXT

Possible sorting to generate multiple input fields from the
file <FILE>

Configuration of the column from the file <FILE> that has
been  designed  as  identifier  for  multiple  input  fields.
(Default GRTXT)

LABELBEFOREFIELD=true

Optional: Identifier input field (Default=False)

LABELHEIGHTFAKTOR=1.25

Optional: Factor for calculating the height of a multi input
field for positioning (default = 1.25)

LABELCHARCOUNT=20

Optional:  Number  of  characters  displayed  for  the  label
text  of  a  multiple
field  (see  LabelColumn)
(default=20)

input

IDCOLUMN=GR

Optional: Configuration of the column from the file <FILE>
that includes the "KeyValue“ of the row. (Default GR)

MODE=…

SHOWIDCOLUMN=1|
SHOWKEYLABEL=1|
BUTTON-PAGER=1|
BUTTON-RESULT=1|
BUTTON-RESULT=0|

or

BUTTON-SKIN=BUTTON_BIG|

INCREMENT-BUTTON-COLOR=clSilver

MODE=..

INCREMENT-BUTTON=TRUE

Extended options
- shows (<IDCOLUMN>) in label (Default=0)
- shows hotkeys 'a' .. 'z'(default=0)
- item is shown as button (default=0)
- button closes the dialog (default=1/active)
..as  of  V#  2.0.3.45  -  the  dialog  remains  open.  The
  user  exit  „DynDlgFunctions_<dlg>“  with  the  function
  "ON(<KENN>)CLICK" is executed.
 - skin for button (default=BUTTON_BIG)

As of CTAIP V# 2.0.3.10
If  the  mode  "INCREMENT-BUTTON=TRUE"  is  set,  you  can
increment the  value  by  1 if  you click on the  label of the
input  field.  Use  the  configuration  „INCREMENT-BUTTON-
COLOR=clSilver“ to change the label background. Default is
"clSilver“.

Entry

Comment

Section

[ WF-PAGERPANEL-AGRD.LST ]

Configuration of a grid layout for the generation of multiple
input fields

GR=N10,100,R

Definition that enables numeric sorting.

GRTXT=C10,200,L

Standard configuration for alphanumeric sorting.

MOC_DialogField.docx

Version: 2.4.22352

Page 15 of 17

Dynamic dialog fields

If  you  use  user  exits  at  the  AIP  as  part  of  the  MES  Development  Suite,  bear  in mind  that  the

DynDlgFieldchange event is not normally triggered for the fieldpager  when a field is changed.

This is required to calculate a sum field that might exist.

If the field attribute "FIELDCHANGE" is added to the Fieldpager, the event is also triggered for

its input fields. You must insert the following line in DynDlgFieldchange_XYZ in your user exits to

ensure that totals are still calculated.

Example for Fieldpager with ID $CT.AUS::

Sub DynDlgFieldChange_A_TR
  Select Case VDlg("DLG.FLD")
    Case "$CT.AUS:"
      DLGVAR=Item("$CT.AUS:SUM",VDlg("$CT.AUS:SUM"))
  End Select
End Sub

Field attribute <COLORLABELFONT>

You can use the field attribute <COLORLABELFONT> to display texts with a special font. (see "Dialog.ini"

-> ColorLabelFont[Name,Size,..] )

The default field color is < blue > and can be used for the following dynamic dialog fields

- for Grid/Image/Shape/... Header

GRID

IMAGE
SHAPE
FIELDPAGER

TEXTVIEW

METER

TEXT
Input

- for text display
- for field label

Use {c~color} to switch the color.
For example:    “Log on {c~clblack} <ANR> {c~clblue} order“



“Log on AU0010001AG01 order“

The color configuration may also be used for the workflow caption. Here, the default font color is black.

MOC_DialogField.docx

Version: 2.4.22352

Page 16 of 17

Translation: If you want to translate the new texts/labels, you must add the texts to the relevant

translation file and translate them (standard: ctaip.mld, custom: ctaipkd.mld).

Dynamic dialog fields

MOC_DialogField.docx

Version: 2.4.22352

Page 17 of 17

