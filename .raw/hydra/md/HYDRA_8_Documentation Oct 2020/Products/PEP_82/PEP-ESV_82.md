Manual

Advanced Selection and
Visualization
PEP-ESV 8.2

Version 1.0.23049

Last changed on: 02.09.2020

Advanced Selection and Visualization

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

PEP-ESV_82.docx

Version: 1.0.23049

Page 2 of 9

Advanced Selection and Visualization

Contents

1  Advanced Selection and Visualization: Overview ........................................ 4

2  Planning Profiles .......................................................................................... 5

3  Advanced filters ............................................................................................ 8

4  Colored Illustration ....................................................................................... 9

PEP-ESV_82.docx

Version: 1.0.23049

Page 3 of 9

Advanced Selection and Visualization

1  Advanced Selection and Visualization: Overview

Purpose

This function package contains functions to select employees and workplaces using additional selection

criteria and to highlight qualifications in color.

Implementation notes

You use the function package if:



you want to use HYDRA Personnel Scheduling (PEP) and you need to subdivide the employees

and workplaces into smaller groups that can be planned more easily;



you want to display qualifications in color in the workplace assignment application.

Integration

This  function  package  requires  the  function  package  Management  Functions  for  Personnel  Scheduling

(PEP-VWF).

Features

  Planning profiles

o  Definition  of  planning  profiles  to  subdivide  the  allocated  employees  and  workplaces  in

groups that can be scheduled more easily

  Advanced filters

o  Advanced  filter  functions  to  select  employees  using  various  HR  master  data  fields  (e.g.

department, employee subgroup, activity, fields containing additional information)

  Color representation

o  Displaying personnel requirements through colored bars to allow the scheduler to easily

identify  the  required  qualification  and  the  available  resources  with  their  respective

qualifications

PEP-ESV_82.docx

Version: 1.0.23049

Page 4 of 9

Advanced Selection and Visualization

2  Planning Profiles

Overview

Menu

Master data  Production control  Planning profiles

Transaction code

Plprof

Function authorization

Plprof

Purpose

You use this function to create or modify planning profiles in the system.

Integration

By  using  planning  profiles,  you  can  narrow  down  the  data  displayed  in  the  different  planning  functions

(e.g. workplaces, staff).

  Graphic planning (transaction grap)

  Graphic order sequencing (transaction graps)

  Workplace assignment (transaction wpas)

Requirements

You  have  structured  the  workplaces  to  be  planned  based  on  capacity  groups  and  set  them  up  in  the

system.

Selection criteria

The application provides the following selection criteria:

User

User  name  for  whom  the  planning  profiles  that  were  configured  beforehand  are  to  be  displayed.

You can also run a search using wildcards.

Global planning profiles are not shown if you select a specific user.

Planning profile

Name of the planning profile to be searched. You can also run a search using wildcards.

Field descriptions

User

User  for  whom  the  subsequent  capacity  group  is  to  be  assigned  or  has  been  assigned  in  the

planning profile.

PEP-ESV_82.docx

Version: 1.0.23049

Page 5 of 9

Advanced Selection and Visualization

You can leave this field empty if the modification PLPROF-GLOBAL has been enabled.

This is a global planning profile that can be selected for every user.

Profile

Name of the planning profile.

You cannot use names in global and user-specific planning profiles.

Selection

You  can  assign  different  objects  to  a  planning  profile  subject  to  the  application  and  its  product

version:

Application

Modification

Graphic planning

Graphic planning

Group

PLPROF-MNR

Group, workplace

If you assign single workplaces to a
planning profile, the dialog still
shows the group the workplaces
belong to.

Graphic order sequencing

Group

Workplace assignment

Workplace assignment

PLPROF-MNR

For workplaces: group
For staff: area, cost center, department,
employee subgroup, employment
relationship, person

For workplaces: workplace, group
For staff: area, cost center, department,
employee subgroup, employment
relationship, person

Value

Subject to the selection made, you have to enter the relevant value in this field.

If you select "group", it might be a capacity group configured as bottleneck or throughput capacity.

In  general,  the  graphic  planning  board,  graphic  order  sequencing  or  workplace  assignment  only

shows the workplaces for which you are authorized via the responsibility.

Order

This field specifies the order of groups in the graphic planning board.

We  strongly  advise  to  input  data  in  this  field,  because  the  order  of  groups  might

otherwise be arbitrary. Ideally, you should use intervals of 10.

If  the  modification  PLPROF-MNR  is  enabled,  the  value  defined  for  the  workplaces

specifies the order of groups when you assign workplaces to a planning profile.

PEP-ESV_82.docx

Version: 1.0.23049

Page 6 of 9

Advanced Selection and Visualization

Within  a  group,  you  can  sort  workplaces  by  using  the  “position”  field  of  the  group

assignment.

The following options are only relevant for the graphic planning board:

Visible in shop floor planning

This field specifies if the current group is shown when selecting a planning profile.

Show workplaces without responsibility area authorization

This  option  shows  the  workplaces  of  the  selected  group  in  the  Shop  Floor  Scheduling  module

although the user does not have the required responsibility area authorization.

Allow planning without responsibility area authorization

When resolving conflicts occurred during manual planning, this option moves an operation for which

the  user  does  not  have  the  responsibility  area  authorization.  You  cannot  shift  the  operation

manually; rather shifting can only be done as a means of resolving conflicts.

PEP-ESV_82.docx

Version: 1.0.23049

Page 7 of 9

Advanced Selection and Visualization

3  Advanced filters

Overview

This function allows to overwrite the fields “company”, “area” and “cost centers” by other HR master fields

in the workplace assignment  application:

PEP-ESV_82.docx

Version: 1.0.23049

Page 8 of 9

Advanced Selection and Visualization

4  Colored Illustration

Overview

When  configuring  qualifications,  this  function  allows  to  assign  a  color  to  each  qualification.  The

application workplace assignment shows the requirements and the employee’s highest qualification in this

color.

PEP-ESV_82.docx

Version: 1.0.23049

Page 9 of 9

