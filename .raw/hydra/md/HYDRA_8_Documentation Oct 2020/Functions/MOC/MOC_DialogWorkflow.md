Dynamische Dialoge - Workflow

1  Dynamic Dialogs - Workflow

Overview

Menu

System administration  Terminals  Workflow

Transaction code

ddconfw

Function authorization

ddconfw

Purpose

You  can  use  the  dialog  configuration  to  change  the  AIP  input  dialogs  in  a  quick  and  efficient  manner

according to the user's requirements.

The system delivery includes a basic dialog configuration. You can edit and change this configuration using

the functions described in the following.

The function "Dynamic Dialogs - Workflow" defines the order of tabs in a complex dynamic dialog.

The complete functionality of the dialog configuration includes a lot of options, but it is also

very complex. For this reason, we recommend to change the dialogs only after consultation

with MPDV and only by experts.

Integration

To define the tab order, the fields and the buttons of dialogs, you must not only use the application "Dynamic

dialogs - Workflow", but also the applications "Dynamic dialogs", "Dynamic dialogs - Fields" and "Dynamic

dialogs - Function keys".

Requirements

The dialog that you want to configure must already exist in the "Dynamic dialogs".

Some  of  the  functions  require  the  development  license  MDS-AIS  to  be  fully  available.  The

restricted functions are marked in the document using "(*)".

Basics of the functions without development license:

-  Existing  data  can  be  changed.  Only  data  for  default  dialogs  with  user  0  must  not  be

changed without development license.

-  You  cannot  create  new  data  without  development  license,  except  fields  in  existing

dialogs.

MOC_DialogWorkflow.docx

Version: 1.4.22361

Page 1 of 6

Dynamische Dialoge - Workflow

-  You can copy the existing  data to terminal  groups or  terminals.  Without development

license, you cannot copy to default dialogs with user 0.

Selection criteria

The application provides the following selection criteria:

 Workflow

Selection by workflow

Type

You can select from different dialog types:

  AIPDEF – default dialog

  AIPTNR – terminal dialog

  AIPTGRP – dialog for terminal group

Dlg user

Selection by terminal number or terminal group

Toolbar

Insert (*)

Creating a new workflow

Edit (*)

Editing a workflow

(*) Without development license, you cannot edit workflows.  Editing a workflow is the same as

creating a new workflow. You need a developer license to create new workflows.

Delete

Deleting a workflow

Copy

Copying a workflow

In addition to the standard function calls, the following function calls are available:

  Dynamic dialogs

Function authorization: ddconf.*

The function "Dynamic Dialogs" calls the application

Dynamic dialogs.

MOC_DialogWorkflow.docx

Version: 1.4.22361

Page 2 of 6

Dynamische Dialoge - Workflow

 Test dialog

Function authorization: ddconf.test

The function "Test dialog" opens the selected  Workflow to test all settings and the functionality.

 Save dialog configuration

Function authorization: none

The function "Save dialog configuration" saves the current dialog configuration.

Activate dialogs

Function authorization: ddconf.activate

The function Activate dialogs activates the dynamic dialogs. The dialogs are then available on the

terminals.

Field description

 General

 Workflow

Identifier of the workflow

The  identifier  can  be  assigned  to  a  button  on  the  AIP,  for  example.  This  button  then  opens  the

respective workflow dialog.

Type

User

AIPDEF:

default workflow

AIPTNR:

terminal workflow

AIPTGRP:

workflow for terminal group

User number restrictions

The default workflows have Dlg user "0" and type "AIPDEF".

  Dialog

If you perform the function in the workflow using the server, the dialog identifier (DLG) specified in

this field is transferred to the dialog data.

By specifying the dialog identifier via the "Dialog" field, you can define customer-specific workflows

that send default dialogs to the server.

MOC_DialogWorkflow.docx

Version: 1.4.22361

Page 3 of 6

Dynamische Dialoge - Workflow

Title

Title of the  workflow  dialog. Using  the  notation  <XXX>,  you can define placeholders for important

local information on the AIP. The title is then displayed as header in the workflow dialog.

Keep forced dialog sequence

If the field "Keep forced dialog sequence" is enabled, the order of the dialog steps is set and cannot

be changed, i.e. you can only go to the next dialog step (tab).

User defined 1

Additional configuration options:

BUTTONHEIGHT=50

In case of workflows with several tabs, this configuration specifies the initial height of the button bar

before scaling.

If you configure an alternative button height, the dialog field positions do not change

automatically.

User defined 2...3

The fields "User defined 2...3" are currently not used.

Comment

You can use the field "Comment" to configure a description of the workflow.

Steps

Step 1...10

Name of the dialog configuration for dialog step 1...10. The dialog steps are displayed and performed

in the specified order. You can use the different dialog steps in any workflow.

Script 1...10

W: The script of the workflow is run (and not the script of the dialog step).

S: The script of the dialog step is run (and not the script of the workflow).

Copying dynamic dialogs (workflow)

You can use the function "Copy" to copy complete workflow configurations of a dialog.

MOC_DialogWorkflow.docx

Version: 1.4.22361

Page 4 of 6

Dynamische Dialoge - Workflow

Function selection

Copy entire configuration

You can use the function "Copy entire configuration" to copy the complete workflow configuration,

e.g.  from  the  default  configuration  (AIPDEF  0)  to  a  terminal  (e.g.  TNR  nnn,  with  nnn=  terminal

number). If you copy the workflow configuration, the default configuration is still used for all terminals

that do not have an own configuration. And later on you can change the custom configuration without

affecting other users. If you use the mode "Copy entire configuration", the input fields "Workflow from"

and "Workflow to" are hidden.

Copy workflow

If you use the function "Copy workflow", only the workflow entries for a selected dialog (workflow) are

copied.

(*) Without a development license, you can only copy entire workflows or the entire configuration.

You cannot copy to default workflows for user 0 without a development license.

Deleting dynamic dialogs (workflow)

If  you  use  the  function  "Delete",  you  can  delete  the  entries  that  include  workflow  data.  The  dialogs

themselves are not deleted.

(*) Without a development license, you cannot delete default dialogs for user 0.

Testing dynamic dialogs

Use the function "Test dialog" to call the dialog. You can test its functionality or the separate steps.

Activate dialogs

If you use the function Activate dialog, the configured dynamic dialogs are available on the server and can

then be downloaded to the terminals. Without activation, the dialogs and the possible changes are saved

on the system, but the terminals still download the version activated last.

You can activate dialogs for single terminals or for terminal groups. When you activate a dialog, you specify

the activation type and the user number that can be a terminal or a terminal group.

Type

Value of field User

Description

AIPTNR, TNR

Terminal number

Activates all dialogs for the terminal.

MOC_DialogWorkflow.docx

Version: 1.4.22361

Page 5 of 6

Dynamische Dialoge - Workflow

If a dialog is  not explicitly  configured for the  terminal

number,  the  dialog  AIPDEF/DEF  with  user  0  is

activated.

The activation for user 0 provides the default dialogs.

AIPTGRP, TGRP

Terminal group

Activates all dialogs for the terminal group.

The system only activates the dialogs that are explicitly

configured for the terminal group.

In general, dialogs that are configured for a terminal have a higher priority than dialogs for terminal groups.

If dialogs are activated for a terminal, the dialogs of the respective terminal group are ignored.

If no dialogs are activated for the terminal group or for the terminal number, the terminal loads the dialogs

that are activated for user number 0.

Porting notes: from AIP to AIP2 / workflow with one workflow step

The difference in the terminal script processing in AIP and AIP2 in case of a workflow with only one workflow

step is as follows:

Example:

Workflow:

[ U_TST ]

with only one dialog step:

[ WF_U_TST ]

In the AIP, all "dynamic dialog user exits" have been performed as workflow script ("U_TST").

In  the  AIP2,  the  following  activities  are  performed  independent  of  the  dynamic  workflow/dialog

configuration:

- The user exit "DynDlgInit_" is always executed as workflow script ("U_TST").

- All other user exits are called in the dialog tab script ("WF_U_TST").

As  of  the  AIP2  version  8.2.1.10,  you  can  use  the  following  workflow  configuration  to  specify  the  same

processing in the workflow script ("U_TST") as in the AIP:

"Step 1"

"WF_U_TST"

(STEP:1= WF_U_TST)

"Script"

"W"

(WFSCR:1=W)

MOC_DialogWorkflow.docx

Version: 1.4.22361

Page 6 of 6

