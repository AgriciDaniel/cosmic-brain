Planning Profiles

1  Planning Profiles

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

MOC_PlanningProfiles.docx

Version: 1.5.18468

Page 1 of 3

You can leave this field empty if the modification PLPROF-GLOBAL has been enabled.

This is a global planning profile that can be selected for every user.

Planning Profiles

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

MOC_PlanningProfiles.docx

Version: 1.5.18468

Page 2 of 3

Planning Profiles

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

MOC_PlanningProfiles.docx

Version: 1.5.18468

Page 3 of 3

