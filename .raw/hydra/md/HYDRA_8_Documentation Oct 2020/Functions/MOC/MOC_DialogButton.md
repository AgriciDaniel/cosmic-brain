Dynamic dialogs –function keys

1  Dynamic Dialogs - Function Keys

Overview

Menu

System administration  Terminals  Dynamic dialogs,

tab "Dynamic dialogs - function keys"

Transaction code

ddconf

Function authorization

ddconf

Other option:

Menu

System administration  Terminals  Dynamic dialogs - function keys

Transaction code

ddconfb

Function authorization

ddconfb

Purpose

You  can  use  the  dialog  configuration  to  change  the  AIP  input  dialogs  in  a  quick  and  efficient  manner

according to the user's requirements.

The  system  delivery  includes  a  basic  dialog  configuration.  You  can  edit  and  change  this  configuration

using the functions described in the following.

You can edit the function keys of dialogs in two places: in the tab integrated in the application "Dynamic

dialogs" and in the application "Dynamic dialogs - function keys". You can change existing function keys

(e.g. positioning), create new function keys or delete others.

The complete functionality of the dialog configuration includes a lot of options, but it is also very

complex.  For  this  reason,  we  recommend  to  change  the  dialogs  only  after  consultation  with

MPDV and only by experts.

Integration

To define dialogs; fields and the order of tabs, you must not only use the application "Dynamic dialogs  -

function keys", but also the applications "Dynamic dialogs  - workflow", "Dynamic dialogs" and "Dynamic

dialogs - fields".

Requirements

The dialog that you want to configure must already exist in the "Dynamic dialogs".

MOC_DialogButton.docx

Version: 1.6.22354

Page 1 of 7

Dynamic dialogs –function keys

Some  of  the  functions  require  the  development  license  MDS-AIS  to  be  fully  available.  The

restricted functions are marked in the document using "(*)".

Basics of the functions without development license:

-  Existing  data  can  be  changed.  Only  data  for  default  dialogs  with  user  0  must  not  be

changed without development license.

-  You  cannot  create  new  data  without  development  license,  except  fields  in  existing

dialogs.

-  You can copy the existing  data to terminal groups or terminals and then change them.

Without development license, you cannot copy to default dialogs with user 0.

Selection criteria

The application provides the following selection criteria:

  Dialog

Selection by dialog

Type

You can select from different dialog types:

  DEF – standard dialog

  TNR – terminal dialog

  TGRP – dialog for terminal group

User

Selection by terminal number or terminal group

Editing functions

The  application  "Dynamic  dialogs  -  function  keys"  only  provides  the  usual  editing  functions:  insert,  edit

and delete.

If  you  use  the  application  "Dynamic  dialogs",  you  can  change  into  the  toolbar  tab  "Dynamic  dialogs  -

function  keys".  This  toolbar  provides  the  usual  editing  functions  and  additionally  the  detail  application

"Edit function keys". Using this editing application, you can easily manage and edit the function keys of a

dialog.

Detailed application "Process function keys"

In  the  detail  application  "Edit  function  keys",  you  can  right-click  the  table  view  to  open  a  context

menu. The context menu provides the following functions:

New row (*)

MOC_DialogButton.docx

Version: 1.6.22354

Page 2 of 7

Dynamic dialogs –function keys

The function "New row (*)" adds a new empty row to the grid to define a function key.

Several new rows (*)

The function "Several new rows (*)" adds the specified number of new empty rows to the grid.

Copy row (*)

The function "Copy row (*)" copies the currently selected row and adds it to the grid.

Delete row(s) (*)

The function "Delete row(s) (*)" deletes the currently selected row(s) from the grid.

Swap function keys (*)

Using  the  function  "Swap  function  keys  (*)",  the  selected  rows  are  swapped.  The  following

types of swapping exist:

-  Swap position

With "Swap positions", the X and Y positions for function keys of the two selected entries

are swapped (relevant CTWIN + ACTIONBUTTON).

-  Swap button no.

With "Swap button no.", the button number and therefore also the tab order of the function

keys is swapped.

Align buttons (*)

Using  the  function  "Align  buttons  (*)",  an  automatic  alignment  of  the  buttons  in  the  x  or  y

direction is possible.

Move buttons (*)

Using the function "Move buttons (*)", you can move one or several function keys in the x or y

direction. Buttons are moved using the specified offset ("Move by").

Apply function keys from other dialog (*)

Using  the  function  "Apply  function  keys  from  other  dialog  (*)",  you  can  take  over  several

function keys from the dialog selected.

Field description

Button no.

The field  "Button  no.  (*)"  specifies  the  sequence  number  of  the  button  in  the  dialog.  This  number

specifies the tab order.

Return code

The field "Return code" defines the further processing after confirmation of the function key.

0: Dialog is closed and the dialog string is sent to the server.

MOC_DialogButton.docx

Version: 1.6.22354

Page 3 of 7

Dynamic dialogs –function keys

1: Dialog is canceled.

7: Dialog is closed, the dialog string is returned, but not sent.

8:  Dialog

is

not

closed;

the

virtual

keyboard  must

still

be

displayed.

          (relevant with CTWIN)

9: Dialog is not closed.

Identifier

The  field  "Acronym"  includes  the  value  of  the  acronym  for  the  return  value;  is  returned  as

BTN=<acronym>

ID index

The  field  "Acronym  index"  includes  the  index  for  the  return  value  in  case  of  several  similar  data

fields; is supplied with KENN, e.g. "..|BTN=BTN:UNDO|.."

Activated

This option is only available for reasons of downward compatibility. Select the option "Always" as of

MW 3.x.

Key

Only CTWIN: You can use the field "Key" to configure the function key for the activation (hotkey) F1

to  F12.  By  default,  the  key  assignment  is  displayed  on  the  button.  The  display  is  blocked  if  you

place a "*" before the definition (e.g. KEY=*F1)

AIP:  The  function  keys  of  the  dialog  are  automatically  assigned  in  the  order  of  display  to  the

function keys F1 to F12 of the keyboard.

Text

The field "Text" includes the button text (label) displayed.

X pos.

The field "X pos." specifies the X position of the button (top left corner of the button). (Relevant with

CTWIN + ACTIONBUTTON).

Y pos.

The  field  "Y  pos."  specifies  the  Y  position  of  the  button  (top  left  corner  of  the  button).  (Relevant

CTWIN + ACTIONBUTTON).

Width

The field "Width" specifies the button width. (Relevant CTWIN + ACTIONBUTTON).

Height

The field "Height" specifies the button height. (Relevant CTWIN + ACTIONBUTTON).

Information

The field "Information" specifies the info text displayed as tooltip if the button is moused over.

MOC_DialogButton.docx

Version: 1.6.22354

Page 4 of 7

Dynamic dialogs –function keys

Symbol

The field "Symbol" specifies the name of the assigned button icon.

(*):  AIP:  The  available  icons  are  included  in  the  file  pict.zip  of  the  installation  directory  of  the

terminal.

Function

Function

For example:

Entry

DLG=…

called

via

in/out.

Description

Calling a dialog

DLG=…;BREAK-ON-CANCEL  The dialog is not closed upon cancellation of the script dialog

called, regardless of the "Return code" configured.

FKT=…

A_INFO

A_AB_MPL
A_UN_MPL
A_TR

A_AB_RF
A_UN_RF
A_TR_RF

C_VLOS

CE_MLD

(*)

Calling a script function

Calling the operation information (if an operation number is
available in the dialog context).

Calling the dialog "Log OP off", "Interrupt OP", "Partial
confirmation" from the dialog "Interr/logoff/part.conf. OP" at an
MPL machine.

Obsolete, not processed anymore.

Calling the dialog "Show preceding batches"
(C_VLOS_MPL,C_VLOS_RF)

If you perform the function "Post batch", the dialogs
- "Log off batch" (CE_AB,CE_AB_RF)" and
- "Log on batch" (CE_AN,CE_AN_RF)" are used to change
batches.

C_PAL_GEN

Generating a new batch number for a new pallet

CNR_ABF

CNR_ADD

CNR_CHG

CNR_DEL

CNR-UNDO

DLG_CHECK

ELW

ELW_AB
ELW_WL

Calling the dialog "Batch waste"

Execute function "PALTR.INSERT"

Calling the dialog "Modify batch length (C_CNR_LEN)" for
update with "PALTR.UPDATE"

Execute function "PALTR.DELETE"

UNDO function of a new batch number (only in dialog "Enter
GR batch (C_GEN)")

General function to check dialog input (only in dialog "Quantity
balancing (C_MG_BLZ)")

Calling the dialog "Change input batch
(CE_WL_MPL,CE_WL_RF)"

Only in dialog "Quantity balancing (C_MG_BLZ)"
Calling the dialog "Log off input batch (CE_AB,CE_AB_RF)"
Performing the functions
dialog "Log off input batch (CE_AB, CE_AB_RF)"   and

MOC_DialogButton.docx

Version: 1.6.22354

Page 5 of 7

Dynamic dialogs –function keys

dialog "Log on input batch (CE_AN, CE_AN_RF)"

General functions for navigating in tables (only CTWIN)
next row
previous row
column left
column right
next page
previous page

Calling  the  print  (only  CTWIN  and  in  the  dialogs  "Form  pallet
(C_PAL_ASW)" and "Pallet (C_PALETTE)")

General function to perform server posting (only in the dialogs
"Enter GR batch (C_GEN)" and "Repost batch (C_UMB)")

GRID_DOWN
GRID_UP
GRID_LEFT
GRID_RIGHT
GRID_PAGEDOWN
GRID_PAGEUP

PRINT

SEND

VERBRAUCH:RELOAD
(consumption:reload)

Function "Reset (refresh consumption)" only in dialog
"Component consumption posting (A_VERB)"

VERBRAUCH:START
(consumption:start)

Calling the dialog "Component consumption posting (A_VERB)"

VTST

Showing/hiding the virtual keyboard (only required with CTWIN)

License

Optional: The field "License" includes the license required to activate the function key. If the field is

empty, the key is always active.

User defined 1

The field "User def. 1" can include additional configuration options.

If you specify the value ACTIONBUTTON in field "User def. 2", you can configure the button layout

in field "User def. 1".

Example:

„clYellow,2,5,clBlack“

Syntax

color

clYellow

(default $0080FF)

layout

2=rectangle

(0=capsule (default), 1=ellipse, 2=rectangle)

corner radius  5

(default 10, only with layout 2=rectangle)

font color

clBlack

(default clBlack)

User defined 2

In field "User def. 2", you can configure the following configuration options:

FORM-VALIDATION

Before  executing  the  button  function,  the  system  checks  if  the  contents  of  the  input  fields  are

valid, as it does when the dialog is closed.

ACTIONBUTTON:

As with "FORM-VALIDATION", the system checks if the contents of the input fields are valid.

You are free to position the ACTIONBUTTONS in the dialog. You specify position and size using

the fields "X pos.", "Y pos.", "Width" and "Height". You specify the layout in field "User def. 1".

MOC_DialogButton.docx

Version: 1.6.22354

Page 6 of 7

Blocked

If  the  field  "Blocked"  is  selected,  the  button  is  not  displayed  and  not  processed.  If  dialogs  are

activated, the button is not passed to the terminal.

Dynamic dialogs –function keys

MOC_DialogButton.docx

Version: 1.6.22354

Page 7 of 7

