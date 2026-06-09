  DMC Implementation Guide - Factory Model Editor

1  DMC Implementation Guide - Factory Model Editor

Purpose

This document describes how to operate the Factory Model Editor (FME).

Requirements

License: DMC-MDL

MPDV-DMC is required.

Designing a factory model in the DME-FME

The main function of the DME-FME is the graphic modelling of a factory model for the DMC. The following

sections illustrate how to design a factory model.

First create a new FME project including a factory line. To create a new project, click "File“  "New“. Assign

a unique project name. Then create a factory line by indicating a unique name and clicking "Ok". A new

project has been created. The factory line now appears as an empty tab on the FME workspace.

Now start modelling your factory line. Go to the "components" and select a component required for your

factory line. If required, use the search field at the top of the screen to search for the required component.

If  supported  by  the  component,  the  component  shows  additional  information  on  properties  and

requirements if you hold the mouse pointer over a component (mouseover). Once you have selected an

appropriate component, drag and drop this component in the workspace of the factory line.

You can now configure the component you have added to the workspace.

DMC_ImplementationGuideFME.docx

Version: 1.0.13795

Page 1 of 4

  DMC Implementation Guide - Factory Model Editor

Click and select the component you want to configure directly in the workspace.  The "details" view shows

the  available  parameters  with  a  description  and  a  value.  You  can  directly  edit  these  parameters  in  the

"details" view. To do so, select the required parameter and enter its value in the "value" column. You can

also add further parameters to a component. In the "details"  view, click the button "add parameter" and

enter  the  parameter's  name  and  value.  When  adding  parameters,  you  can  choose  to  create  custom

parameters or data items. Observe the naming convention for data items (names in square brackets). Click

the button "remove selected parameter" in the "details" view to delete a parameter. Please note that you

can only delete the parameters you created. After editing all parameters, you can add further components

to  your  model.  Connect  the  components  of  your  workspace  appropriately  in  order  to  complete  data

modeling. Connect components to shape their parent-child relationship. Open the context menu of the first

component  (by  right-clicking  the  component)  to  model  the  parent-child  relationship.  Select  the  option

"connect". Then click the component you want to connect (target).

Check the results of component validation in "validation results" to complete data modeling.

Every time you change a model, the system validates the components and checks their dependencies and

requirements. The "validation results" section highlights errors in red. Double click an entry to focus the

relevant component in the workspace. The column "description" shows a description of the error. Correct

the errors. Then data modeling is completed.

DMC_ImplementationGuideFME.docx

Version: 1.0.13795

Page 2 of 4

  DMC Implementation Guide - Factory Model Editor

Create and use templates

The FME also provides templates to model a factory line. We distinguish between central templates and

project templates. They differ in how they can be reused. You can use central templates for all projects.

But you can use project templates only in the current project.

Create central template

The following paragraphs describe how to create a central template in the FME.

Creating a central template:

Go to the detail application "templates".

Right-click to open the context menu for central templates.

 In the context menu click the option "create central template".

 Assign a unique template name.

 Confirm the name by clicking "Ok". An empty tab opens in the workspace to create the central template.

Now select the components to create the template like designing a factory model.

You can preconfigure the components and also assign placeholders for names and parameters. When you

use  the  template  for  the  first  time  (when  you  add  the  template  to  the  workspace),  you  can  adjust  the

placeholders via an editing dialog. To assign placeholders, enter the name of the required value in braces

(example: "{ParentName}“).

Create project templates

Use  a  central  template  to  create  a  project  template.  Proceed  as  follows  to  create  a  project  template:

DMC_ImplementationGuideFME.docx

Version: 1.0.13795

Page 3 of 4

  DMC Implementation Guide - Factory Model Editor

Create a central template (as described in section "create central template") or select an existing

template.

 Right-click this template.

 In the context menu click the option "copy central template into project".

 Then this template is available as a project template.

Use templates

If you use central templates, you have to make them available as project templates at first (see "create

project templates"). To use project templates, drag and drop them in the workspace. If the template includes

placeholders, a dialog opens where you can edit the placeholders.

The workspace highlights added template components in green. In general, you cannot edit templates

directly. But you can cancel the connection between templates and components. Then the components

become "standard" components. Then you can edit these components as usual. To edit an inserted

template, right-click the template (green) in the workspace. In the context menu, click the option "break

template instance".

The function "break template instance" cancels the connection between the components and the template

and you can edit the components as usual.

DMC_ImplementationGuideFME.docx

Version: 1.0.13795

Page 4 of 4

