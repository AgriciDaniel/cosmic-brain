Manual

Additional Selection and
Visualization
PEP-ESV 8.1

Version 1.0.4788

Last changed on: 19.06.2020

Additional Selection and Visualization

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

PEP-ESV_81.docx

Version: 1.0.18468

Page 2 of 8

Additional Selection and Visualization

Contents

1  Additional Selection and Visualization - Overview ....................................... 4

2  Planning Profiles .......................................................................................... 5

3  Additional Filter Functions ............................................................................ 7

4  Colored Illustration ....................................................................................... 8

PEP-ESV_81.docx

Version: 1.0.18468

Page 3 of 8

Additional Selection and Visualization

1  Additional Selection and Visualization - Overview

Purpose

This function package contains functions to select employees and  workplaces using additional selection

criteria and to display the qualifications in color coding.

Implementation Considerations

Use this function package to:

  use  HYDRA  personnel  scheduling  with  the  requirement  to  subdivide  the  employees  and

workplaces into smaller groups that can be scheduled more easily;

  display the qualifications for the workplace assignment in color coding.

Integration

Use  of  this  function  package  requires  function  package  Personnel  Scheduling  Administration  Functions

(PEP-VWF).

Features

  Planning profile

o  Definition  of  planning  profiles  to  subdivide  the  allocated  employees  and  workplaces  in

groups that can be scheduled more easily

  Additional filter function

o  Additional filter functions to select the persons using various HR master data fields (e.g.

Department, Employee subgroup, Activity, fields containing additional information)

  Color representation

o  Displaying  the  Personnel  requirement  through  colored  bars  to  allow  the  scheduler  to

easily identify the required qualification and the available resources with their respective

qualifications

PEP-ESV_81.docx

Version: 1.0.18468

Page 4 of 8

Additional Selection and Visualization

2  Planning Profiles

Summary

Menu

Master Data  Production Control  Planning Profiles

Transaction code

plprof

Function authorization

plprof

Usage

You use this function to create or modify planning profiles in the system.

Integration

By using planning profiles, you can narrow down what is displayed in the different planning functions:

  HYDRA shop floor scheduling

(only selected on a group level)

  Graphic order sequencing

(only selected on a group level)

  Personnel assignment (PEP)

(Here, you can select additional options, such as cost center, area, ...)

Prerequisite

You  have  structured  the  workplaces  to  be  planned  based  on  capacity  groups  and  set  them  up  in  the

system.

Selection criteria

The application provides the following selection criteria:

User

User  name  for  whom  the  planning  profiles  that  were  configured  beforehand  are  to  be  displayed.

You can also run a search using wildcards.

Planning profile

Name of the planning profile to be searched. You can also run a search using wildcards.

PEP-ESV_81.docx

Version: 1.0.18468

Page 5 of 8

Additional Selection and Visualization

Field descriptions

User

User  for  whom  the  subsequent  capacity  group  is  to  be  assigned  or  is  assigned  in  the  planning

profile.

Profile

Name of the planning profile.

Selection

Where  planning  profiles  for  the  graphic  planning  board  or  the  graphic  order  sequencing

are concerned, here you must definitely set "Machine group/ MGRP" as a fixed variable.

When using the planning profiles for personnel scheduling, other values are also allowed.

Value

You enter the capacity group here.

Sequence

This field specifies the order of the groups in the graphic planning board.

We  strongly  advise  to  input  data  in  this  field,  because  the  order  of  the  groups  might

otherwise be arbitrary. Ideally, you should use intervals of 10 here.

Within  a  group,  workplaces  may  be  sorted  by  using  the  “position”  field  of  the  group

assignment.

The following options are only relevant for the graphic planning board:

Visible in shop floor planning

By  modifying  this  field,  when  selecting  the  planning  profile,  you  determine  whether  the  current

group is displayed or not.

Show workplaces without responsibility area authorization

Shows the  workplaces of the selected group in shop floor scheduling for which the user does not

have the responsibility area authorization.

Allow predecessor/ successor OP to be moved

When  resolving  conflicts  that  occurred  during  manual  planning  interactions,  this  option  moves  an

operation  for  which  the  user  does  not  have  the  responsibility  area  authorization.  This  operation

cannot be moved by the planner manually. A move can only be effected by resolving conflicts.

PEP-ESV_81.docx

Version: 1.0.18468

Page 6 of 8

Additional Selection and Visualization

3  Additional Filter Functions

Summary

This function allows to overwrite the fields “company”, “area” and “cost centers” by other HR master fields

in the workplace assignment application:

PEP-ESV_81.docx

Version: 1.0.18468

Page 7 of 8

Additional Selection and Visualization

4  Colored Illustration

Summary

When  configuring  qualifications,  this  function  allows  to  assign  a  color  to  each  qualification.  The

application  workplace  assignment  shows  the  requirements  and  the  staff’s  highest  qualification  in  this

color.

PEP-ESV_81.docx

Version: 1.0.18468

Page 8 of 8

