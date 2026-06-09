Dynamic dialogs

1

  Dynamic Dialogs

Overview

Menu

System administration  Terminals  Dynamic dialogs

Transaction code

ddconf

Function authorization

ddconf

Purpose

You  can  use  the  configuration  of  the  dynamic  dialogs  to  change  the  AIP  input  dialogs  in  a  quick  and

efficient manner according to the user's requirements.

The  system  delivery  includes  a  basic  dialog  configuration.  You  can  edit  and  change  this  configuration

using the functions described in the following.

You can use the function "Dynamic dialogs" to configure and customize the dialogs on the AIP. With this

function, the general dialog parameters and specific AIP options are specified.

The  application  Dynamic  dialogs  also  includes  the  configuration  of  fields  and  function  keys.  You  can

therefore easily configure the input dialogs in this one application.

The complete functionality of the dialog configuration includes a lot of options, but it is also very

complex.  For  this  reason,  we  recommend  to  change  the  dialogs  only  after  consultation  with

MPDV and only by experts.

Integration

To  define  the  tab  order,  the  fields  and  the  buttons  of  dialogs,  you  need  not  only  use  the  application

Dynamic  dialogs,  but  also  the  applications  Dynamic  dialogs  -  Workflow,  Dynamic  dialogs  -  Fields  and

Dynamic dialogs - Function keys.

Requirements

Some  of  the  functions  require  the  development  license  MDS-AIS  to  be  fully  available.  The

restricted functions are marked in the document using "(*)".

Basics of the functions without development license:

-  Existing  data  can  be  changed.  Only  data  for  default  dialogs  with  user  0  must  not  be

changed without development license.

MOC_DialogConfiguration.docx

Version: 1.8.22353

Page 1 of 9

Dynamic dialogs

-  You  cannot  create  new  data  without  development  license,  except  fields  in  existing

dialogs.

-  You can copy the existing data to terminal groups or terminals and then change them.

Without development license, you cannot copy to default dialogs with user 0.

Selection criteria

The fields Dialog, Type and User are provided as selection criteria.

Toolbars

The application Dynamic dialogs provides several toolbars.

Toolbar Main page

This toolbar includes functions to edit dialogs. The different functions are described below.

Toolbar Dynamic dialogs - fields

The toolbar Dynamic dialogs - fields includes functions to edit fields.

Toolbar Dynamic dialogs - function keys

The toolbar Dynamic dialogs - function keys includes functions to edit function keys.

Functions of toolbar Main page

Insert (*)

Use the function Insert to create new dynamic dialogs in the system.

  Copy (*)

Use the function Copy to copy complete configurations, single dialogs or parts of a dialog.

(*)  Without  development  license,  you  can  only  copy  complete  dialogs  or  complete  dialog

configurations. Without development license, you cannot copy to default dialogs with user 0.

You require a development license for all other functions.

 Edit

Use the function Edit to edit existing dynamic dialogs in the system.

Delete (*)

The function Delete deletes the selected dialogs including fields and buttons.

An undo function does not exist.

If  you  delete  default  dialogs  (AIPDEF  and  DEF  with  user  0)  (*),  we  strongly  recommend  to

backup the dialogs before deletion.

MOC_DialogConfiguration.docx

Version: 1.8.22353

Page 2 of 9

(*) Without development license, you cannot delete default dialogs for user 0.

Dynamic dialogs

 Test dialog

Function authorization: ddconf.test

Use the function Test dialog to call the dialog. You can test its functions, fields and function buttons.

 Activate dialogs

Function authorization: ddconf.activate

The function Activate dialogs activates the dynamic dialogs. The dialogs are then available on the

terminals.

 Save dialog configuration

Function authorization: none

The function Save dialog configuration saves the current dialog configuration on the server.

 Enable simple dialogs

Function authorization: ddconf.actsdlg

Use  the  function  Enable  simple  dialogs  to  activate  the  simplified  dialogs  that  can  be  used  when

needed. These dialogs show all data that must be entered on one page.

 Workflow

Function authorization: ddconfw.*

The function Workflow calls the application  Workflow.

Field description

  Dialog

Dialog ID

Type

Dialog type:

  AIPDEF/DEF – standard dialog

  AIPTNR/TNR – terminal dialog

  AIPTGRP/TGRP – dialog for terminal group

MOC_DialogConfiguration.docx

Version: 1.8.22353

Page 3 of 9

Dynamic dialogs

User

According to type: terminal number or terminal group.

Note  for  the  fields  Type  and  User:  there  are  some  effects  that  are  described  in  section

Activating dynamic dialogs.

Key text

The field Key text is not used.

Resolution

You can use the field Resolution to scale the dialog and the controls (default = empty).

Short text

Use the field Short text to configure the tab title of the dialog. This text is shown when the dialog is

used as tab in a workflow.

Long text

Use the field Long text to configure the dialog title of the dialog. This text is only shown if the dialog

is a one-page dialog without workflow configuration.

Function 1

Use the field Function 1 to select the function that is called when the dialog is opened.

If an entry starts with "FKT=", the function specified is called in the dialog script using the function

DynDlgFunctions_<DLG>().

Optionally,  a  preassignment  of

field  yield

is  possible  when  A_AB  or  A_UN

in function 1 (when dialog is opened) or 2 (when ANR is exited):

-  SET_RESTME

Remaining quantity = target quantity - yield – scrap (up to now) – scrap (in current dialog)

-  SET_RESTM2

Remaining quantity = target quantity – yield

Other entries are still available for reasons of downward compatibility (CTWIN), but are not used in

current software versions.

Function 2

Use the field Function 2 to select the function that is called just before the dialog is closed.

Entries starting with "FKT=" are possible here. MPDV recommendation: with script functions called

on closing a dialog, trigger these script functions via the script of the relevant function key because

the context is known then.

Comment

The field Comment is not used.

MOC_DialogConfiguration.docx

Version: 1.8.22353

Page 4 of 9

Dynamic dialogs

Height

Use the field Height to configure the height of the dialog window.

Only relevant with CTWIN dialogs and POPUP windows (see options 2).

Width

Use the field Width to configure the width of the dialog window.

Only relevant with CTWIN dialogs and POPUP windows (see options 2).

Key

If you configure a "+" in field  Key, the dialog ID is shown in the window title of a one-page dialog

(e.g. "Log on OP and person" > "Log on OP and person <A_P_AN>"). This information is useful for

non-German customers and for the support.

Key ID

The field Key ID is not used.

Activation

The field Active specifies if the dialog is active or not active. Cannot be modified.

AIP options

Licenses

Use the field Licenses to optionally define one or several licenses, separated by semicolon.

- If the field Licenses is empty, the dialog step is always active.

- If licenses are entered in field Licenses, then the dialog step is only displayed if at least one of the

licenses is available (OR conjunction).

Otherwise, the dialog step is not displayed.

Example:

DNC-BP;WRM-BP

Static condition

You  can  define  one  or  several  conditions  via  AND  conjunction  in  field  Static  condition.  The

condition refers to the values of acronyms. For each acronym,  you can enter one or several valid

values, separated by semicolon.

Static conditions do not change in the course of a dialog. Static conditions are only evaluated when

the workflow is opened.

If no condition is specified, the dialog step is always active.

If the condition is not fulfilled, the dialog step is not displayed.

Syntax for conditions:

Example of a value request:

  MNR.MGRP=100

MOC_DialogConfiguration.docx

Version: 1.8.22353

Page 5 of 9

Dynamic dialogs

The machine group must be 100.

Example of array access/comparison

  TNR.PARAM3[5]=5

The fifth character must be 5 (counting starts with 1).

  TNR.PARAM3[3..5]=345

The characters 3 to 5 must be 345.

Example of negated conditions, several values are allowed

  XXX<>12;34 & YYY=34;56

This  condition

is

true

if

the  content  of  <XXX>  does  not  equal  "12“  or  "34“

and the content of <YYY> is equal to "34“ or "56“.

Example of programmed functions

  PRG:EMPTY->ABC

The condition is true if the acronym ABC is empty or the acronym does not exist.

  PRG:[NOT]EMPTY->ABC

The condition is true if the ID ABC exists and is not empty.

Dynamic condition

You  can  define  one  or  several  conditions  via  AND  conjunction  in  field  Dynamic  condition.  The

condition refers to the values of acronyms. For each acronym,  you can enter one or several valid

values, separated by semicolon.

Dynamic  conditions  refer  to  acronyms  that  you  can  enter  or  change  in  the  dialog.  They  are

evaluated when the system changes to the next workflow tab.

If no condition is specified, the dialog step is always active.

If the condition is not fulfilled, the dialog step is deactivated.

The syntax of dynamic conditions is the same as the syntax of static conditions.

Forced fields

You can use the field Forced fields to configure fields that are required for the processing but that

are  not  configured  as  hidden  fields.  You  configure  several  field  acronyms  using  semicolon  (e.g.

KNR;PNR;..). The field acronyms are then available in the dialog buffer.

User defined 1

Additional configuration options:

BUTTONHEIGHT=50

MOC_DialogConfiguration.docx

Version: 1.8.22353

Page 6 of 9

Dynamic dialogs

In case of workflows or dialogs with one tab only, this configuration specifies the initial height of

the button bar before scaling (default 30).

The dialog field positions do not automatically change.

User defined 2

Additional configuration options:

Configuration of a pop-up window with the configured height and width before scaling.

Example: POPUP:150:50:clYellow

Syntax  pop-up window

POPUP

key

word

X position

Y position

color

150

50

X position top left corner (default 5)

Y position top left corner (default 5)

clYellow

color of dialog background (default $A0FFFF)

Copying dynamic dialogs

You  can  use  the  function  Copy  dynamic  dialogs  (button  Copy  in  the  toolbar)  to  copy  complete

configurations, single dialogs or parts of a dialog.

Function selection

Copy entire configuration

You can use the function Copy entire configuration to copy a complete configuration, e.g. from the

default configuration (AIPDEF 0) to a terminal (e.g. AIPTNR nnn, with nnn= terminal number) or to

a  terminal  group  (AIPTGRP  nnn,  with  nnn  =  terminal  group).  If  you  copy  the  configuration,  the

default  configuration  is  still  used  with  all  terminals  that  do  not  have  their  own  configuration.  And

later on  you can change  the custom configuration  without affecting  other users. In  this mode, the

input fields Dialog from and Dialog to are hidden.

Copy complete dialog

Use the function Copy complete dialog to call the following three copy operations in one operation.

Copy dialog without buttons and fields (*)

Use the function  Copy dialog without buttons and fields to copy  the  basic or dialog  information of

the dialog. Fields and function keys are not copied.

Copy buttons  of a dialog (*)

Use the function Copy buttons of a dialog to copy only function keys. The target dialog must exist

before the copy operation.

Copy fields of a dialog (*)

Use the function Copy fields of a dialog to copy only fields. The target dialog must exist before the

copy operation.

MOC_DialogConfiguration.docx

Version: 1.8.22353

Page 7 of 9

Dynamic dialogs

When  you  copy  dialogs,  you  can  specify  type  and  user  for  the  source  (From)  and  the  target

(To).  If  the  complete  configuration  is  copied,  the  input  fields  of  Dialog  from  and  Dialog  to  are

hidden.

(*) Without development license, you can only copy in mode Copy entire configuration or Copy

complete dialog. Without development license, you cannot copy to default dialogs with user 0.

Activate dynamic dialogs

If  you  use  the  function  Activate  dialog,  the  configured  dynamic  dialogs  are  available  on  the  server  and

can  then  be  downloaded  to  the  terminals. Without  activation,  the  dialogs  and  the  possible  changes  are

saved on the system, but the terminals still download the version activated last.

You  can  activate  dialogs  for  single  terminals  or  for  terminal  groups.  When  you  activate  a  dialog,  you

specify the activation type and the user number that can be a terminal or a terminal group.

Type

AIPTNR,
TNR

Value of
User

Terminal
number

Description

Activates all dialogs for the terminal.
If  a  dialog  is  not  explicitly  configured  for  the  terminal  number,  the  dialog  is
activated with type AIPDEF/DEF and user 0.

The activation for user 0 provides the default dialogs.

The activated dialogs are stored as files on the server:
Schema: \\<Server>\<InstDir>\<SystemNr>\spool\aip<User>.*
Example: \\MyServer\mip3\3\spool\aip10.*
or:
Schema: \\<Server>\<InstDir>\<SystemNr>\spool\<User>.*
Example: \\MyServer\mip3\3\spool\10.*

AIPTGRP,
TGRP

Terminal
group

Activates all dialogs for the terminal group.
The  system  only  activates  the  dialogs  that  are  explicitly  configured  for  the
terminal group. The activated data does not include default dialogs.

The activated dialogs are stored as files on the server:
Schema: \\<Server>\<InstDir>\<SystemNr>\spool\aiptgrp<User>.*
Example: \\MyServer\mip3\3\spool\aiptgrp900.*
or:
Schema: \\<Server>\<InstDir>\<SystemNr>\spool\tgrp<User>.*
Example: \\MyServer\mip3\3\spool\tgrp10.*

MOC_DialogConfiguration.docx

Version: 1.8.22353

Page 8 of 9

Dynamic dialogs

When you load the dialogs from the terminal, only the activated configurations are used. The following

priority applies:

1.

If dialogs are activated for the terminal, only the dialogs activated for the terminal are loaded. No

other dialogs are loaded.

2.

If dialogs are activated for the terminal group, only the dialogs activated for the terminal group are

loaded. No other dialogs are loaded.

3.

If  no  dialogs  are  activated  for  the  terminal  or  the  terminal  group,  then  the  default  dialogs  are

loaded. The default dialogs are the dialogs activated for terminal/AIP terminal 0.

Enable simple dialogs

In the system, simplified dialogs are available that may be used if required. On one page, these dialogs

show all data that must be entered. The dialogs are activated for the default terminal user AIPDEF using

the function Enable simple dialogs.

This setting affects the following input dialogs:

  Log on order

 A_AN

  Log on order + person    A_P_AN



Interrupt order

 A_UN

  Finish order

 A_AB

  Post part quantities (partial confirmation)

 A_TR

The activation of the simplified dialogs can only be performed once.

You can only undo the activation if you manually change the workflow.

With older installations: It is possible that with the simple dialogs "Log on order (A_AN)" or "Log

on order + person (A_P_AN)" the data transfer to the dialog fields does not work after selection

of an operation. Here, the configuration in the ctaiplay.ini must be corrected.

In section [WF@ANR], you must enter the current standard file ctaiplay.ini in line DATAFIELDS.

MOC_DialogConfiguration.docx

Version: 1.8.22353

Page 9 of 9

