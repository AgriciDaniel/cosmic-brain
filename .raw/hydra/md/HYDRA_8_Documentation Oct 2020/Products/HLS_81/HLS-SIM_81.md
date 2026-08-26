Manual

Simulation
HLS-SIM 8.1

Version 1.0.23049

Last changed on: 01.09.2020

Simulation

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

HLS-SIM_81.docx

Stand: 01.09.2020

Page 2 of 11

Simulation

Contents

1  Übersicht Simulation .................................................................................... 4

2  Simulation .................................................................................................... 5

HLS-SIM_81.docx

Stand: 01.09.2020

Page 3 of 11

Simulation

1

 Übersicht Simulation

Purpose

These  components  within  the  graphic  planning  board  of  the  HYDRA  shop  floor  scheduling  allows

planning to be carried out in a " planning world" without changing the existing planning ("real world").

You use the function package when, for example, you:

  Want to consider planning alternatives

  Want to carry out a longer term capacity evaluation

without changing the existing planning as a result.

Integration

The simulation is integrated into the graphic planning board of the HYDRA shop floor scheduling so that

practically all functions of the graphic planning board can also be used for simulation.

The  simulation  is  performed  on  the  basis  of  the  order  backlog  in  the  system.  Thanks  to  the  special

simulation  mode,  however,  the  saving  of  planning  simulations  has  no  impact  on  the  real  planning

situation.

Features

  Simulation  mode  for  elaboration  of  an  optimum  planning  situation  without  influencing  the  current

planning

  Simulative changes to the shift calendar to increase (overtime, special shifts) or decrease (personnel

absences, maintenance) the available capacity

  Visualization of the effects of a change in available capacity on the machine assignment

  Buffer storage of automatically or manually generated machine assignment variants

  Optional acceptance or rejection of the saved machine assignment variants

HLS-SIM_81.docx

Stand: 01.09.2020

Page 4 of 11

Simulation

2  Simulation

Summary

Menu

Index tab

Production control  Production preparation  Graphic planning

Simulation

Function authorization

sfs.sim

Usage

The  "simulation"  function  uses  initial  scenarios  to  facilitate  the  creation  and  storage  of  various  kinds  of

planning  in  the  graphic  planning  board.  An  initial  scenario  illustrates  a  planning  situation  in  shop  floor

scheduling at a defined point in time. The creation of planning situations (simulations) based on identical

initial  scenarios  is  crucial  to  being  able  to  compare  these  simulations  with  one  another  based  on  key

figures, and therefore to identifying the "optimal" planning situation for the current production situation.

Simulation mode makes it possible to adjust different basic planning conditions directly from the graphic

planning board, including modifying shift calendars to increase (overtime and special shifts) or decrease

available capacity (personnel absences, maintenance), or adjusting machine performance level.

In  simulation  mode,  the  planner  has  available  the  familiar  graphic  planning  board  functions  with  which

operations  can  be  manually  and  automatically  assigned  to  workplaces.  The  planned  year  model  and

machine  performance  level  can  also  be  modified  in  simulation  mode.  Any  changes  to  the  basic

conditions,  such  as  the  effect  that  modifying  available  capacity  has  on  machine  assignment,  are  made

visible immediately in the graphic planning board. Planning situations can be saved in simulation mode.

Planning  created  in  simulation  mode  are  not  transferred  to  the  "real  world",  but  instead  you  have  the

option of saving them so that they can be displayed and reactivated later. When a new initial scenario is

created, all the simulations created based on the "old" initial scenario are deleted.

Integration

The "simulation" capability of the graphic planning board provides the following enhanced functions:

  Saving and loading planning.

  Saving initial scenarios so that identical initial scenarios can be used to create different plans.

  Calculating and comparing selected key figures for different plans.

HLS-SIM_81.docx

Stand: 01.09.2020

Page 5 of 11

  Modifying basic conditions for planning (shift calendars, machine performance level).

The chart shown below illustrates the process flow of a simulation.

Simulation

Prerequisite

To  compare  planning,  you  should  have  given  thought  to  planning  evaluation  ahead  of  time  and

determined which key figure(s) should be used for the assessment.

To save planning, a directory must be defined in path configuration under the identifier MOCHLS.

Toolbar

Each of the simulation functions are available in the toolbar in a separate "Simulation" index tab.

 Start simulation

Function authorization: sfs.sim

Change to simulation mode.

HLS-SIM_81.docx

Stand: 01.09.2020

Page 6 of 11

The following icons become active after the simulation has started:

Simulation

 Load initial scenario

Load the initial scenario.

 Save simulation

Save current planning as a simulation.

 Load simulation

Load a plan that has already been saved.

 Finish simulation

Exit simulation mode.

Start simulation

Start  simulation  mode  using  the  "Start  simulation"  icon  in  the  open  graphic  planning  board.  A  dialog

opens in which you must first define the initial scenario for the simulation session:

The following two options are available for selecting an initial scenario:

Save existing planned scenario as current initial scenario

This option saves the planning situation currently selected in graphic planning as the initial scenario.

HLS-SIM_81.docx

Stand: 01.09.2020

Page 7 of 11

Simulation

Because  only  one  initial  scenario  can  exist  in  HYDRA  at  any  one  time,  this  option  deletes  any

previously defined initial scenario. By selecting this option, the system deletes any simulations saved

previously that were created from other initial scenarios.

This is the default option when the dialog opens. After confirmation, the dialog described in the section

Save simulation opens for saving:

Use an initial scenario that has already been created

This option allows you to use and load an initial scenario that has already been created for simulation

mode. If no initial scenario has been saved yet, a message will be displayed notifying you accordingly.

After  confirmation,  the  planning  board  switches  to  simulation  mode.  The  note  "  -  simulation  mode"  is

displayed in the title bar of the graphic planning board.

When simulation mode starts, the start simulation icon is deactivated and the icons

  Load initial scenario

  Save simulation

  Load simulation

  Finish simulation

are activated.

At the same time, the icon in the graphic planning toolbar for defining planning is deactivated.

Load an initial scenario

This icon is only active if the planning board is in simulation mode.

This function deletes the planning situation currently in graphic planning and loads the initial scenario into

graphic planning. A new simulation can then be created based on the initial scenario.

HLS-SIM_81.docx

Stand: 01.09.2020

Page 8 of 11

If changes were made in graphic planning since the last time a simulation was saved, a prompt appears

to save the current planning situation before loading the initial scenario.

Simulation

Saving a simulation

The  planner  can  use  this  icon  to  save  current  planning.  In  this  case,  the  planning  is  not  saved  in  the

database, but instead in an XML file on the server.

When the function is called up, a pop-up window opens with the following fields:

  Planning run, preset with current time stamp (YYYYMMDDhhmmss)

The field must be four places shorter than the "File" field in the DB, since when saving, ".xml" is

added and saved in the "File" field. Special characters like /, \, blank, for example, are not supported.

  Comment, to describe the plan in more detail

The following information is saved:

  The parameters used for this planning:

o  Planning profile

o  Planning variant

o  Planning horizon

  Result/ evaluation criteria (key figures) of the plan

  The actual plan

HLS-SIM_81.docx

Stand: 01.09.2020

Page 9 of 11

Simulation

o  Operations

o  Relationships

o  Workplaces  with  planned  year  model/  performance  level,  if  they  were  changed  during

planning.

o

Individual shift times

  Planning run from input dialog

  Comment from input dialog

The name of the XML file, under which the planning is saved; equals the input in the planning run field.

The file is stored in the directory that was defined under MOCHLS in the path configuration.

When finished, the planner is given confirmation that data was saved successfully.

Load simulation

This  icon  can  be  used  to  load  saved  simulations  into  graphic  planning  so  further  steps  can  be  taken

based on them.

After  the  function  "Load  simulation"  is  activated,  the  application  Planning  is  opened.  In  this  application,

stored  simulations  are  displayed  along  with  their  key  figures.  After  you  have  chosen  and  confirmed  a

simulation, the simulation is loaded into the planning board

Saved planning can also be loaded  into the graphic planning board using the  "Load planning"

icon in the "General" index tab.

Finish simulation

You use this function to exit simulation mode. Graphic planning will then revert to normal planning mode.

In  the  process,  the  current  planning  situation  is  transferred  from  simulation  mode  to  normal  planning

mode.

If changes were made in graphic planning since the last time a simulation was saved, a prompt appears

to save the simulation before loading the initial scenario.

HLS-SIM_81.docx

Stand: 01.09.2020

Page 10 of 11

Simulation

Simulations created (and saved) in simulation mode remain available in normal planning mode. In normal

planning  mode  the  simulations  can  be  loaded  into  graphic  planning  using  the  "Load  planning"  function.

Created simulations are not deleted until a new initial scenario is defined (Start simulation function).

After  exiting  simulation  mode,  the  initial  scenario  remains  saved.  Additional  simulations  can  be  created

based on this initial scenario by restarting the simulation mode.

HLS-SIM_81.docx

Stand: 01.09.2020

Page 11 of 11

