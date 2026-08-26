Workflow Overview

1  Workflow Overview

Overview

Menu

System administration – Workflow management – Workflow overview

Transaction code

wfov

Function authorization  wfov

Usage

The  workflow  overview  provides  an  overview  of  currently  running,  finished  and  instantiated  workflows

including status information on individual workflow steps.

Please note:

In order for the user to utilize this application, special privileges have to be assigned in the Insign Server.

Users need one of the two privileges:

 InSpire:monitorServer

 InSpire:manageServer

Via  this  overview,  the  user  can  switch  to  individual  workflows  without  any  task  and  view  a  tabular  and

graphic  display  of  the  workflow  history  (i.e.  what  happened  in  the  individual  steps).  The  display  is

structured in 2 parts:

1.  Graphic presentation of the workflow with the individual steps

2.  Tabular  presentation  of  the  "events"  relating  to  a  workflow.  The  following  information  is  found

here:

a.  Which user processed which tasks and at what time?

b.  Which information was transferred to the WFM system (which variables were filled)?

c.  Time of workflow instantiation

Selection criteria

The following selection criteria are available in the application:

Status

This  selection  criterion  refers  to  the  status  of  the  workflow.  Multiple  selection  is  possible.  The

following statuses may be selected:

-  Active

-  Finished

MOC_WorkflowOverview.docx

Version: 1.0.1362

Page 1 of 3

Workflow Overview

-  Finishing

-

-

Invalid

Invalid threads

-  New

Please note: If no selection is made, selection is made according to the statuses Active and New

by default, and only these workflows will be displayed.

Last modification

Selection according to the date on which the last modification was made. Warning: correct filtering

is only possible if both the From and the To date are set.

Process name

Selection according to the process name. Please note: wildcard entry is not possible.

Workflow Overview Detail Application (Table)

In  the  tabular  Workflow  overview  detail  application,  all  workflows  are  displayed  in  accordance  with  the

selection made.

The  data  available  in  the  table  are  described  below.  These  data  might  not  be  shown  by  default.  In  this

case, they can be added using the column selection.

Process ID

Process ID

Process

Process

Version

Version

Status

Status of the workflow. Color display in accordance with the respective status.

Last modification

Last modification

Storage duration

Storage duration

MOC_WorkflowOverview.docx

Version: 1.0.1362

Page 2 of 3

Workflow Overview

Toolbar

  Workflow History

Function authorization: wfhist

Link to function: Workflow history

   Workflow Information

Function authorization: wfinfo

MOC_WorkflowOverview.docx

Version: 1.0.1362

Page 3 of 3

