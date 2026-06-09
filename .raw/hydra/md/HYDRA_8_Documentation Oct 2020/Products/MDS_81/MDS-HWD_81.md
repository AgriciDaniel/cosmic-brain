Manual

HYDRA Workflow-Designer
MDS-HWD 8.1

Version 1.0.23049

Last changed on: 02.09.2020

HYDRA Workflow-Designer

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

MDS-HWD_81.docx

Version: 1.0.23049

Page 2 of 26

HYDRA Workflow-Designer

Contents

1  HYDRA Workflow-Designer ......................................................................... 4

2  Workflow Designer ....................................................................................... 5

2.1  Starting the Workflow Designer ........................................................................... 6

2.2  Workflows ........................................................................................................... 7

2.3  Elements of a Workflow Design ......................................................................... 11

2.4  Definition of the Working List of a Process Step ................................................ 12

2.5  Deploying Workflows ......................................................................................... 21

2.6

2.7

Import/Export of Workflows ............................................................................... 22

Language / Multilingual input ............................................................................. 23

2.8  Naming Conventions ......................................................................................... 24

2.9  Documentation of Created Workflows ............................................................... 25

MDS-HWD_81.docx

Version: 1.0.23049

Page 3 of 26

HYDRA Workflow-Designer

1  HYDRA Workflow-Designer

With  HYDRA  Workflow  designer  you  are  able  to  create  new  workflow  and  modify  existing  standard

workflows or customized individual workflows.

This  document  initially  supplies  background  information  of  the  HYDRA  Workflow-Designer  and  the

definition how to define a workflow.

MDS-HWD_81.docx

Version: 1.0.23049

Page 4 of 26

HYDRA Workflow-Designer

2  Workflow Designer

Overview

MES workflow management enables the mapping of processes by means of a workflow. The workflows

used for this are instantiated and thus started by HYDRA. In order for a workflow to be used, it must be

created in a previous step in the workflow designer and assigned with appropriate parameters.

Workflow designer screenshot:

The workflow designer is not integrated in MOC and is implemented on the basis of Eclipse. In addition to

the  administration  of  the  workflow  management  server,  it  also  provides  the  interface  for  creating  and

deploying workflows.

In the initially installed standard status, the components required for using the workflow management and

the workflow management database are found on the HYDRA server. This can be opened here via a link

in  the  HYDRA  administration  file  and/or  via  the  Start  menu  by  using  the  MES  workflow  management  -

designer link.

Prerequisite

JAVA 6 must be installed on the PC where the MES workflow designer is to be used.

The  server-side

installation  of  workflow  management  must  have  been  performed  by  MPDV

commissioning. The server address and the workflow management port must be known. The password of

the workflow administration user (e.g. admin) must be known.

MDS-HWD_81.docx

Version: 1.0.23049

Page 5 of 26

HYDRA Workflow-Designer

The user must be familiar with the general characteristics of the workflow designer:

  Process server monitoring

  Process design

  Process deployment

2.1  Starting the Workflow Designer

When opening the workflow designer and double-clicking the Tomcat menu item (or the assigned name),

the password assigned for the administration document must be entered and subsequently be confirmed

by pressing the OK button so that a link to the workflow management server can be established.

Upon  successful  entry  and  connection  to  the  workflow  management  server,  the  following  information  is

displayed:

Once  the  connection  has  been  made  successfully,  the  following  sub-items  are  found  under  the  server

entry (in this example under the entry: http://win2008-7:9080):

MDS-HWD_81.docx

Version: 1.0.23049

Page 6 of 26

HYDRA Workflow-Designer

  WFM – Admin Server

The sub-items in the WFM – Admin Server include the master data and/or settings required for

the process of the workflows. The master data such as the user, however, are retrieved from

HYDRA and synchronized with the workflow management system.

  WFM – Processes Server: inspire

The processes server includes all deployed workflows and the associated required parameters.

2.2  Workflows

Creation of a New Workflow

By double-clicking the Processes item (see screenshot) and/or a folder created in it, the entry screen for

the name of the new  process opens. The naming convention  is to  be  observed (please refer to section

2.8).

After entering the name, the new process is shown in the list of processes and, once closed, can also be

re-opened by double-clicking the process name.

Design Guidelines for HYDRA Workflows

The following general conditions must be observed when designing a HYDRA workflow:

MDS-HWD_81.docx

Version: 1.0.23049

Page 7 of 26

HYDRA Workflow-Designer

  The workflow must have precisely one starting point.

  The workflow must have at least  one ending point.  As an option, several  ending  points may  be

used.

  The workflow should, if possible, not call any sub-processes since these cannot be displayed in

the workflow overview in MOC.

In  the  following  sections,  it  is  noted  for  several  description  fields  that  these  serve  'technical

documentation'.

The  contents  of  these  fields  will  not  be  visible  for  the  editor  of  workflow  tasks.  For  the  designer  of  a

workflow, however, these descriptions provide a quick overview as to what is hidden behind the variables,

the e-mail templates and the work steps.

For  this  reason,  this  information  should  always  be  provided,  since  it  significantly  facilitates  support  and

further development.

Workflow design

In addition to other options, the drawing surface for the workflow can be opened at any time by double-

clicking on the workflow created. The following options for designing a workflow are available here:

Symbol  Designation

Selection

Shift view

Zoom

Text

Positioning a pool

Positioning the starting point of a process

Positioning an ending point of a process

Positioning a process step

Creation of a sub-process call

Creation of a multiple decision

Positioning a decision element

Positioning a 'Go to' / 'Merge' element

MDS-HWD_81.docx

Version: 1.0.23049

Page 8 of 26

Linking two elements

HYDRA Workflow-Designer

By drag & drop, the individual elements may be transferred to the drawing area for creating a workflow.

Properties for a Workflow

The following information can be maintained and functions called up for a workflow:

  Properties

The properties of the currently highlighted workflow are displayed here

  Consistency check

A current display of potential warnings, errors and information on the complete workflow is shown

here

  Working list

This includes the defined activities to be performed for the currently highlighted workflow step.

  Define variables

In order for variables to be used in the individual actions of the workflow steps, they must first be

defined and entered in the workflow. Please note: The naming conventions for variables are to be

observed.

  E-mail template

If an e-mail is to be sent using a defined e-mail template in an action, this template must first be

defined on the workflow.

  Rules

The  defined  rules  relating  to  decisions  in  the  workflow  are  maintained  here.  Only  the  rules

defined in the current workflow step are displayed.

If one of the views specified is not available in the workflow designer, the required views can be displayed

via the menu item Window  Show view (see screenshot).

MDS-HWD_81.docx

Version: 1.0.23049

Page 9 of 26

HYDRA Workflow-Designer

Entering Variables

For using variables in the entire workflow, regardless of whether they are used in e-mail templates or for

generic tasks, they have to be entered in the "Define variables" view on the workflow.

Here,  variable  names,  the  associated  data  type,  a  default  value  and  a  language-dependent  description

may be entered. For allocating variable names, the naming conventions are to be observed (see section

2.8).

In addition, a description may be entered. This is used for technical documentation and can be entered in

several languages.

If  a  task  screen  in  MOC  is  to  be  defined  by  means  of  the  Java  Inline  Code,  the  fixed  variable

taskData must first be defined in the variables on a workflow ("Long string" data type).

Should  parallel  processes  occur  in  a  workflow,  the  related  process  step-specific  variables

<Name_des_Prozessschritts>_taskData must be defined.

Entering E-Mail Templates

To be able to use e-mail templates in various actions, they must have been entered on the workflow in a

first step. They can then be used and/or allocated in the individual actions via the template name.

When the e-mail is sent, the information in the header line is shown as the Subject and the information in

the Mail Text cell is used as the e-mail text.

In  addition  to  fixed  texts,  variables  and  line  breaks  can  be  used  with  the  customary  HTML  formats  for

structuring, e.g. <br> for a line break.

MDS-HWD_81.docx

Version: 1.0.23049

Page 10 of 26

Variables can be used in the entire e-mail template by means of the syntax ${var_VariablenName}.

HYDRA Workflow-Designer

When defining e-mail templates, the naming conventions are to be observed (see section 2.8).

The header and the e-mail text of the template can be entered in several languages.

In addition, a description may be entered. This is used for technical documentation and can be entered in

several languages.

2.3  Elements of a Workflow Design

Starting Point

In the starting point properties, the Description parameter can be multilingual.

Ending Points

In the ending points properties, the Description parameter can be multilingual.

Process Steps

For some added process steps and/or decisions, the required parameters may be entered using the

displayed views.

If a required view is missing, it can be displayed as described above.

In the process steps properties, the Description parameter can be multilingual.

Decision Elements

In the decision elements properties, the Description parameter can be multilingual.

Multiple Decisions

In the multiple decision properties, the Description parameter can be multilingual.

MDS-HWD_81.docx

Version: 1.0.23049

Page 11 of 26

HYDRA Workflow-Designer

Links

In the links properties, the Description, Labeling 1 and Labeling 2 parameters can be multilingual.

2.4  Definition of the Working List of a Process Step

Using the working list context menu and/or the relevant buttons (see red marking), individual actions may

be assigned to the process steps. Actions may be assigned several times or only once, depending on the

action type.

The following actions may be chosen:

  Set variable value

  Send e-mail

  Set xml variant

  Assign XML structure



Inline Java Code

  Rule only

  Variable -> XML

  Create generic task

  Re-start workflow

  Start workflow

  Terminate workflow

  Call web service

  Execute simple EAI adaptor

  Execute script

For detailed information,  please refer to the designer's Help function, which  you can, for example, open

directly via the Start menu under the Documentations item.

MDS-HWD_81.docx

Version: 1.0.23049

Page 12 of 26

HYDRA Workflow-Designer

Set variable value

This action may be used to assign values to the variables entered in the workflow. The variable to be set

may be explicitly set with a value entered in the Value field using the drop-down box. All variables which

were  entered  on  the  current  workflow  in  the  "Define  variables"  view  are  available  (see  section  2.2  -

Entering variables).

In addition, a description may be entered in the same tab. This is used for technical documentation and

can be entered in several languages.

Send e-mail

Through the "Send e-mail" action, an e-mail can be sent to a user and/or a group or function by entering

an e-mail template.

All e-mail templates available are defined in the "E-mail templates" view on the workflow and can be sent

by assigning the name in a process step.

In  the  "Assign  to"  field,  fixed  values  such  as  User  abcd,  but  also  variables  may  be  used,  which  may

include various addressees according to the setting of the variable in the process.

In addition, a description may be entered in the same tab. This is used for technical documentation and

can be entered in several languages.

MDS-HWD_81.docx

Version: 1.0.23049

Page 13 of 26

HYDRA Workflow-Designer

Please note: The technical prerequisites for sending e-mails are already met upon system startup.

Set xml variant

Currently not used for MPDV workflows. For information on this action type, please refer to the designer's

Help function.

In addition, a description may be entered in the same tab. This is used for technical documentation and

can be entered in several languages.

Assign XML structure

Currently not used for MPDV workflows. For information on this action type, please refer to the designer's

Help function.

In addition, a description may be entered in the same tab. This is used for technical documentation and

can be entered in several languages.

Inline Java Code

The "Inline Java Code" action may be used to program functions by means of JAVA.

In addition, a description may be entered in the same tab. This is used for technical documentation and

can be entered in several languages.

By  means  of  JAVA  programming,  for  example,  a  description  of  the  "Edit  task"  screen  in  MOC  can  be

defined  e.g.  by  supplying  the  variable  taskData.  This  determines  the  appearance  of  the  task  screen

here in the designer. The technical details of this solution are described below:

Prerequisite: The taskData variable must be added to the process with the "Long string" data type (see

section 2.2 - Entering Variables).

Any field to be displayed in the task processing later is assigned in a separate line in this example for the

taskData  variable.  The  individual  parameters  which  configure  the  field  are  to  be  separated  by  a  pipe.

The parameter set of a field is ended with \n.

Example for an Inline Java Code line:

MDS-HWD_81.docx

Version: 1.0.23049

Page 14 of 26

HYDRA Workflow-Designer

taskData="Fertig?|boolean|" + taskDone + "|input|taskDone||\n";

The  individual  configuration  parameters  of  a  field  defined  by  the  taskData  variable  have  the  following

meaning. The position here describes where the parameter is located in the pipe-separated list.

Pos.  Parameter

Description

1

Field label

This  parameter  determines  the  label  in  the  MOC  editing

screen.

If  MOC  task  editing  is  to  be  available  in  one  target  language

only, the label can be directly indicated here. Example:
 taskData="Fertig?|boolean| " + done + "|input|done||\n"

If task editing, however, is to be used in several languages, an

entry

in

the  MOC  dictionary  can  be  referenced  by  a

corresponding language key at this point. Example:
 taskData="lkWfmDone|boolean| " + done + "|input|done||\n"

2

Field data type

The field data type also determines the presentation in MOC. It

must  comply  with  the  type  of  the  associated  variable  (see

parameter 5 and 3, where applicable). Example:
 taskData="Palette|string|" + palId + "|input|palId||\n"

The following data types are available here:

  boolean

This  data  type  represents  a  logic  value  which  may

assume

the

values

true

or

false.

In MOC, the field is displayed as a checkbox.

  string

This data type represents a character string.

In MOC, the field is displayed as an input field.

  datetime

This  data  type  represents  a  point  in  time  (comprising

date and time).

In  MOC,  the  field  is  displayed  as  an  input  field  for

times.

MDS-HWD_81.docx

Version: 1.0.23049

Page 15 of 26

3

Value to be

Value  to  be  displayed  in  the  field  upon  opening  the  editing

displayed

dialog in MOC.

HYDRA Workflow-Designer

At this point, a constant parameter may be entered. Example:

 taskData="Palette|string|P345|input|palId||\n"

If  this  parameter  is  omitted  completely,  this  can  achieve  the

effect that the field is empty when opened.

Alternatively,  the  contents  of  a  defined  variable  may  be

displayed. Example:

 taskData="Palette|string|" + palId + "|input|palId||\n"

4

Editing/Display

If the MOC user should be able to edit the field, input is used

status

here. Example:
 taskData="Palette|string||input|palId||\n"

Optionally,

readonly

is

displayed.

Example:

 taskData="Palette|string||readonly|palId||\n"

5

Input target

In  the  variable  defined  here,  the  contents  of  the  associated

field  are  saved  when  the  task  is  saved  in  MOC.  Example:

 taskData="Palette|string|" + palId + "|input|palId||\n"

6

Syntactic type

Syntactic type  which  defines how the  value is to be  displayed

in MOC. Example:

 taskData="Karte|string|" + kNr + "|input|kNr|user_id|\n"

By  using  the  syntactic  type  wfmmemo  you  can  achieve  the

effect  that  text  information  (string  data  type)  is  shown  on

several lines. Example:

 taskData="|string|" + iTxt + "|readonly||wfmmemo|\n"

For entries of the syntactic type wfmmemo, an entry in the MOC

dictionary  can  also  be  referenced  via  a  corresponding

language  key  instead  of  'fixed  contents'.  This  allows  for

optionally  designing  the  contents  of  this  multi-line  field  in

several languages (e.g. in order to provide the user with notes

on task handling). Example:

  taskData="|string|lkWfmTaskDone|readonly||wfmmemo|\n"

MDS-HWD_81.docx

Version: 1.0.23049

Page 16 of 26

-

Line end

At  the  end  of  the  parameters  of  a  field,  the  line  end  \n  is

always required.

HYDRA Workflow-Designer

The first field to be indicated in the MOC editing screen of the task is assigned to the taskData variable

as follows in this example:

taskData=<Parameter of first field>

If  further  fields  are  to  be  added,  the  relevant  definitions  may  be  added  to  the  taskData  variable  as

described below:

taskData+=<Parameter of second field>

taskData+=<Parameter of third field>

:

Using  the  infoData  variable,  a  workflow  detail  dialog  can  be  started,  which  will  display  fields  for  the

entire workflow regardless of the current task. The field contents may also be edited in MOC as an option.

When  configuring  the  fields  of  this  dialog,  the  same  functions  as  described  above  are  applicable:

However,  for  this  dialog,  the  infoData  variable  instead  of  taskData  is  supplied  with  the  field

configurations.

When using tasks in parallel, the definition of fields for maintaining tasks by means of one variable

would cause problems.

In order to avoid this, the definition of field configurations is not assigned to the taskData variable in this

case. Instead, the name for this variable is formed as follows:

<Name_of_related_process step>_taskData

The name of the related process step can be taken from the properties of the process step.

Rule only

The  "Rule  only"  action  may  be  used  to  define  an  end  condition  for  a  process  step  behind  one  and/or

several process steps.

The "Rule only" action can only be entered once at a process step. If an end condition has already been

defined for a process step in another action, the "Rule only" action cannot be added any more.

In addition, a description may be entered in the same tab. This is used for technical documentation and

can be entered in several languages.

MDS-HWD_81.docx

Version: 1.0.23049

Page 17 of 26

HYDRA Workflow-Designer

Variable -> XML

Currently not used for MPDV workflows. For information on this action type, please refer to the designer's

Help function.

In addition, a description may be entered in the same tab. This is used for technical documentation and

can be entered in several languages.

Create Generic Task

The  "Create  Generic  Task"  action  can  be  used  to  enter  tasks  on  the  workflow  steps,  which  must  be

performed before the workflow can be continued. Example: A responsible person shall decide whether or

not a complaint will be processed.

For this purpose, the action for a generic task and the Java Inline Code action for the task screen in MOC

must be entered.

In the Action tab, the following specifications may be defined for a generic task:

  Assign to:

This field will assign the task, e.g. which user is assigned with the task. In addition to fixed values,

variables may also be assigned, which are for instance determined in a previous action and/or in

an upstream process step.

Depending on whether a task is assigned to a USER, a GROUP or a FUNCTION, the type and

the related name have to be defined e.g. by a variable.

  Task description

A brief description of the task may be entered here in several languages. If an e-mail is to be sent

(see next item), the task description is used as the name for the e-mail template.

  E-mail when creating the task

Definition of whether an e-mail is to be sent when the task is created. If so, an e-mail template

using the name of the task description is sought.

  E-mail if due date is exceeded

  E-mail if due date might be exceeded



Job Name

  Description

Multilingual field for task description

  Classification: <Future use>

This field can be multilingual.

  User data 1-4: User-specific data may be entered in these fields.

  Priority

The priority is shown in the task list on MOC and sorting/grouping is possible.

  Reserve task: <Future use>

MDS-HWD_81.docx

Version: 1.0.23049

Page 18 of 26

HYDRA Workflow-Designer

  Done by

  Estimated duration

  Estimated total duration

  Apply absence management

Shall defined absence management be applied?

  Terminate task if due date is exceeded?

  Terminate task if due date might be exceeded?

In addition, a description may be entered in the same tab. This is used for technical documentation and

can be entered in several languages.

A terminate condition for this process step may be defined under the "End condition" tab. In this example

(see  Screenshot),  the  End  condition  is  reached  if  the  ${var_ok}  variable  is  assigned  with  true.  To

prevent that this is the case from the start already, the value may explicitly be set to false by means of

the "Set variable value".

Re-start workflow

Currently not used for MPDV workflows. For information on this action type, please refer to the designer's

Help function.

MDS-HWD_81.docx

Version: 1.0.23049

Page 19 of 26

HYDRA Workflow-Designer

In addition, a description may be entered in the same tab. This is used for technical documentation and

can be entered in several languages.

Start workflow

Currently not used for MPDV workflows. For information on this action type, please refer to the designer's

Help function.

In addition, a description may be entered in the same tab. This is used for technical documentation and

can be entered in several languages.

Terminate workflow

Currently not used for MPDV workflows. For information on this action type, please refer to the designer's

Help function.

In addition, a description may be entered in the same tab. This is used for technical documentation and

can be entered in several languages.

Call web service

Currently not used for MPDV workflows. For information on this action type, please refer to the designer's

Help function.

The description in the tab with the same name can be multilingual.

Execute simple EAI adaptor

Currently not used for MPDV workflows. For information on this action type, please refer to the designer's

Help function.

In addition, a description may be entered in the same tab. This is used for technical documentation and

can be entered in several languages.

Execute script

In the current process, HYDRA data saved in the database may be accessed from the workflow. For this

purpose, the "Execute script" action type must be used. The HYDRA database is accessed via JDBC.

A database link must be added first. The Add button opens a list with the configured databases. In the

following example, the database link "HYDRA" was selected.

MDS-HWD_81.docx

Version: 1.0.23049

Page 20 of 26

HYDRA Workflow-Designer

In this example, other machine master data (designation and cost center) are read. The SQL statement is

assigned to the sel string. At this point, the SQL keyword "select" is not indicated!

  string sel = "bez_lang, kostenstelle from maschinen where masch_nr = '" + var_mnr + "'" ;
  // Mit set_first kann nach einem erfolgreichen Select geprüft werden,
  // ob Daten gefunden wurden.
  if (select("mnr", sel, "HYDRA") && set_first("mnr"))
  {
     // Schleife über die Zeilen.
     //do {
       var_bezl = get_value("mnr",0);
       var_kst = get_value("mnr",1);
     //} while (set_next("mnr"));
   }
   // Datenobjekt freigeben
   end_select("mnr");
   return true;

The do - while loop was omitted since only one data record is expected in the result data quantity. The

machine designation and the cost center are assigned to the relevant process variables.

The "Apply modified variables" option must be selected.

In addition, a description may be entered in the same tab. This is used for technical documentation and

can be entered in several languages.

2.5  Deploying Workflows

After completion of a workflow, it must be deployed via the workflow designer so that it is distributed on

the server and can thus be executed. The relevant buttons are found in the toolbar:





Quick Deploy of modified ME workflow management resources – deployment is triggered for all

modified workflows without any selection or confirmation

Quick Deploy of selected MES workflow management resources – after selecting the workflows

to be deployed, deployment is triggered for the selected workflow.

MDS-HWD_81.docx

Version: 1.0.23049

Page 21 of 26

HYDRA Workflow-Designer



Deployment of MES workflow management resources – after selecting the project and the

workflows to be deployed, deployment is triggered for the selected workflows.

If the workflow to be deployed contains errors, deployment is not executed and the errors are listed.

Whether deployment is executed with existing warnings can be selected when deploying.

After deployment, the workflows are available on the server and in the workflow designer under the item

WFM Process Designer: inspire  Process Definitions, and processes may be started and/or current

processes may be viewed for the different versions.

2.6  Import/Export of Workflows

Import of Workflows

In order for existing workflows to be edited in the workflow designer, these have to be imported first.

Under the File  Import to menu item, existing and exported workflows can be imported.

Screenshot:

MDS-HWD_81.docx

Version: 1.0.23049

Page 22 of 26

HYDRA Workflow-Designer

The default workflows which can be used as default for system startup can be found under the following

directory on the HYDRA server:

\\<HYDRA-Server>\<HYDRA-Verzeichnis>\products\wfm\

Export of Workflows

In order to save and/or distribute existing workflows, these may be exported from the workflow designer

and filed on the target system by means of the File  Export to menu item.

2.7  Language / Multilingual input

The  Language  view  can  be  used  to  enter  designations  in  several  languages  in  individual  fields,  e.g.  a

workflow step designation.

For  this  purpose,  the  field  where  the  individual  languages  are  required  has  to  be  maintained

appropriately.  If  a  language  is  not  maintained,  the  default  language  will  be  displayed  in  the  workflow

designer.

MDS-HWD_81.docx

Version: 1.0.23049

Page 23 of 26

HYDRA Workflow-Designer

Please note: The defined default language for the created workflows is German.

2.8  Naming Conventions

Naming Conventions for Workflows

The names of process steps and links must be English and follow the conventions described below:

  Start:

Start:

  End:

End or
End_<Description in PascalCase>
Example: End_Success

  Process steps:

Step_<Description in PascalCase>
Example: Step_InvestigateTask

  Decisions / Multiple decisions:

Decision_<Description in PascalCase>
Example: Decision_Justified

  Links:

Link_<Description in CamelCase>
Example: Link_DoReworkCustomer
Link_ReworkCustomerDone
Link_ArrivalConfirmed

  Splitting:

Split_<Description in CamelCase>
Example: Split_UrgentCause

  Merger:

Merge_<Description in CamelCase>
Example: Merge_8dClose

Character string variables whose contents will affect workflow control (e.g. simple multiple decision using

precisely one variable) should have English contents, if possible.

The  labels  used  for  the  associated  elements  in  the  taskData  variable  must  be  English  and  follow  the

conventions below:



lkWfm_<Description in PascalCase>

Example: lkWfmComplaintDataCollected

If  the  name  of  the  variable  was  selected  appropriately,  there  is  nothing  wrong  with  setting  the  variable

name behind the prefix lkWfm. If a generic task was assigned to a  process step, the  description  of this

task  can  usually  correspond  to  the  text  of  the  process  step  in  the  sequence  chart.  The  description  of  a

generic task usually matches the description of the associated process step.

MDS-HWD_81.docx

Version: 1.0.23049

Page 24 of 26

HYDRA Workflow-Designer

Naming conventions for e-mail templates

The header of the e-mail template of a generic task usually includes the description of the generic task.

As  a  prefix,  the  respective  context  should  also  be  included.  The  label  for  entering  a  variable  (in  the

context of a task) in HYDRA should usually match the description of the relevant task.

The names of the e-mail templates must be English and follow the conventions described below:

  Template_<Description in PascalCase>

Example: Template_CollectData

Naming Conventions for Variables

The names of the variables must be English and follow the conventions described below:

  General variables

<Description in CamelCase> Example: complaintDataCollected

  Variables whose contents are provided by HYDRA upon instantiation of a workflow

var_HYDRA_<Name of field in HYDRA in lower case>  or

var_HYDRA_<Name of parameter in HYDRA in PascalCase>

Example.: var_HYDRA_reknr

var_HYDRA_InspectionStep

2.9  Documentation of Created Workflows

For the documentation of edited and/or created workflows, 2 documentation types are distinguished:

  User-related documentation on workflow

  Technical workflow documentation

User-related Documentation on Workflow

User-related documentation should primarily contain the defined workflows with individual workflow steps

from the end user's perspective. It must be ensured that a graphic representation of the entire process on

the one hand, but also a definition of the individual process steps with the underlying actions and/or tasks

on the other hand, are provided for the end user.

Technical Workflow Documentation

Via  the  Process    Generate  document  menu  item,  technical  documentation  can  and/or  must  be

prepared  for  the  created  workflows.  The  contents  to  be  used  for  documentation  may  be  selected  in

individual steps. The following contents are available here:

  Variables

MDS-HWD_81.docx

Version: 1.0.23049

Page 25 of 26

HYDRA Workflow-Designer

  E-mail templates

  Merger

  Decision

  Sub-process

  Selection

  Step

o  Step

o  Working list

o  Action

o  Exception

Documentation  should  be  prepared  as  rtf,  since  in  addition  to  the  text  components  a  screenshot  of  the

designed workflow will subsequently have to be integrated in the documentation

MDS-HWD_81.docx

Version: 1.0.23049

Page 26 of 26

