Workflow Events

1  Workflow Events

Overview

Menu

System administration – Workflow management – Workflow events

Transaction code

wfev

Function authorization  wfev

Usage

The workflow events application shows instantiated workflows.

Prerequisite

Advanced object configuration

The workflow alias name must be defined in the "Advanced object configuration" application.

Object type

The fixed value WFM_CONFIG is to be defined here.

Object ID 1

The real workflow name is to be indicated here.

MOC_WorkflowEvents.docx

Version: 1.0.1362

Page 1 of 4

Workflow Events

Object ID 2

The workflow version is to be indicated here.

Parameter

The workflow alias name is indicated here.

Selection criteria

The following selection criteria are available in the application:

Status

Status. The following statuses are available for selection:

-  DONE

-  DONE RESEND

-  ERROR

-  ERROR RESEND

Workflow Events Detail Application (Table)

The tabular workflow events detail application shows the workflows which were instantiated by HYDRA. If

a workflow could not be instantiated, it can be instantiated again through this application.

The  data  available  in  the  table  are  described  below.  These  data  might  not  be  shown  by  default.  In  this

case, they can be added using the column selection.

Workflow tab

Process ID

Process ID

Status

Possible statuses:

DONE

  Workflow was instantiated

DONE RESEND    Workflow was resent and then instantiated correctly

ERROR

  Workflow could not be instantiated

ERROR RESEND  Workflow could again not be instantiated in a repeated attempt

Status text

The error text of the workflow engine is shown here in the case of an error.

Module

Module which triggered the workflow.

MOC_WorkflowEvents.docx

Version: 1.0.1362

Page 2 of 4

Workflow Events

Designation

Detailed designation of module

Process alias name

Process alias name

Process name

Process name

Process version

Process version

Workflow tab

ID 1-5

ID 1-5 (references from HYDRA data base)

Key 1-5

Key 1-5 (text key from HYDRA data base)

Date key 1-5

Date key 1-5

Data

This shows the variables transferred, separated by pipe character.

Last editing tab

Editor

Initially,  this  shows  the  editor  who  initiated  the  workflow.  If  the  workflow  is  transferred  again,  the

user is updated.

Last modification

Last modification

Trigger tab

Editor

Editor who triggered the workflow.

Last modification

Time stamp of instantiation

MOC_WorkflowEvents.docx

Version: 1.0.1362

Page 3 of 4

Workflow Events

Toolbar

  Workflow History

Function authorization: wfhist

Link to function: Workflow history

   Resend

Workflows in ERROR or ERROR RESEND status can be transferred once again.

   Workflow Information

Function authorization: wfinfo

MOC_WorkflowEvents.docx

Version: 1.0.1362

Page 4 of 4

