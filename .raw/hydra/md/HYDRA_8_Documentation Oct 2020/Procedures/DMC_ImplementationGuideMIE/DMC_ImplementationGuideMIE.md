 DMC Implementation Guide - Manufacturing Instruction Editor

1  DMC Implementation Guide - Manufacturing Instruction

Editor

Purpose

This document describes how to operate the Manufacturing Instruction Editor (MIE).

Requirements

License: DMC-MDL

MPDV-DMC is required.

Designing a production process in the DME-MIE

The  main  function  of  the  DME-MIE  is  the  graphic  modeling  of  a  production  process  for  an  existing

production model (FactoryModel).

For more information: refer to DMC_ImplementationGuide.pdf (section 4)

If you want to model a manufacturing instruction, a completed production model should already exist as a

DMC factory model.

First  step  creating  a  manufacturing  instruction:  Create  a  new  MIE  project  to  model  a  manufacturing

instruction using MIE. Assign a factory model. In general, you can also model a manufacturing instruction

without  assigning  a  factory  model.  But  you  should  absolutely  assign  a  factory  model  to  avoid

misconfigurations and runtime errors. If you assign a factory model, all components and their properties

are available for data modeling in the MIE.

To  create  a  new  MIE  project,  click  "File“    "New“  and  assign  a  unique  project  name.  Then  assign  an

existing factory model created with the FME to the new project. As an alternative, you can also assign a

stand-alone factory model (that is not yet part of an FME project). Click "Project“  "Assign factory model

project“ if you want to assign a factory model that is part of a DME-FME project. Click "Project“  "Assign

factory model“ if you want to assign a stand-alone factory model (one that is not yet part of an FME project).

Please note: If you make changes to the assigned factory model, you have to reload this factory

model in the MIE project. To do so, click "Project“  "Reload assignment“.

DMC_ImplementationGuideMIE.docx

Version: 1.0.18468

Page 1 of 3

 DMC Implementation Guide - Manufacturing Instruction Editor

You can start modelling production processes, once you have created a project and assigned a factory

model to the project. Assigning the first process step:

- Go to the "Workstep hierarchy"

- Open the context menu by right-clicking

- Select the option "Add work step" Assign a unique ID including description in the configuration dialog.

Then go to "Assignment" and assign the process step to a component of the factory model. The

"Workstep hierarchy" shows the new process step. Now you have to configure the process step.

Use  the  following  views  to  configure  the  process  step:  "Capability  requirements“,  "Channels“,  "Input

materials“, "Output materials“, "Preconditions“ and "Postconditions“. At first select the created process step.

Edit the parameters according to your processes in the above-mentioned views. Use the option "Add" to

add new parameters or the option "remove" to delete parameters. To edit existing parameters, double-click

the required parameter and change its data in the dialog.

Select the required process step in the "Workstep hierarchy" if you want to add a work step to this process

step. Then right-click this process step to open the context menu and select "Add subworkstep" (work step).

Create and configure the work step like a process step. If a process step includes several work steps, the

"workstep hierarchy" displays these work steps in groups. You can use the same context menu to add new

process steps. You can add a new process step above or below an existing process step. To do so, click

"Add  workstep  above"  or  "Add  workstep  below".  Open  the  context  menu  and  use  the  option  "Delete

workstep" to delete process steps or work steps.

DMC_ImplementationGuideMIE.docx

Version: 1.0.18468

Page 2 of 3

 DMC Implementation Guide - Manufacturing Instruction Editor

To complete data modeling, just add new process steps and work steps to your model as described above.

Configure the new process and work steps according to your process.

DMC_ImplementationGuideMIE.docx

Version: 1.0.18468

Page 3 of 3

