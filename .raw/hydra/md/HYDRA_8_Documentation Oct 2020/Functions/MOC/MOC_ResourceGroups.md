Groups

1  Groups

Overview

HYDRA menu

Master data  Workplace / Maschines  Groups

FEDRA menu

Detailed scheduling  Master data   Groups

Transaction code

grp

Function authorization  mdgrp

Purpose

You use this application to specify groups:

For planning in the shop floor scheduling module, a dependency between workplaces/machines and

capacity groups is defined. The following data can be assigned to a capacity group, which can be

overwritten if defined with an individual capacity (workplaces/machine).

 Group data is used as long as requirements are only defined with respect to the group.

The transport time is a planned buffer for material that is transported between two operations. A transport

matrix  can  be  stored  in  the  system  to  determine  the  transport  time.  When  a  new  order  or  operation  is

created, the transport time is calculated using this matrix and then transferred to the operation. You use

location groups to identify the transport time between locations. You define a group for each location and

identify it as a location group.

You also define Report groups for evaluation purposes. They can be defined globally or for a specific user.

Selection criteria

The application provides the following selection criteria:

group

Group name

Company

Stored company

Capacity group

Restricts the capacity groups

Report group

Restricts evaluation/report groups

MOC_ResourceGroups.docx

Version: 1.7.23266

Page 1 of 5

Groups

Location group

Restricts location groups

Line group

Restricts line group (subject to the license)

Field descriptions

group

Identifies the group

Only  alphabetic  characters,  also  used  to  identify  workplaces/machines  (no  umlauts,  no

special characters), are allowed for capacity groups and location groups.

The identifier for the capacity groups can not exceed eight digits.

Location group can only have a maximum of four digits.

Groups must be unique.

Name

Name or description of the group

Sing. type

If this identifier is set, resources of the same type can only be assigned to a group.

Please note that once a group has been created, the identifier cannot be changed anymore.

Company

Company (comment)

Cost center

Cost center of the group. If the cost center of the group is defined, you can also select by cost center

in the order overview.

You  can  find  further  information  on  the  cost  centers  in  Notes  on  editing  groups  and  group

assignments.

Responsibility area

Responsibility area to change the group definition

Capacity group

A capacity group summarizes primary capacities, namely machines or workplaces. A requirement

can be specified in the operation for a capacity group. In capacity planning, orders or their operations

are scheduled on primary capacities.

MOC_ResourceGroups.docx

Version: 1.7.23266

Page 2 of 5

Groups

A capacity group must be of sing. type. That means only machines/workplaces can be assigned in

the  system,  which  have  been  created  as  a

resource  with

resource

type  MNR.

Master data  Workplace/machines  Workplace configuration. (Only applicable if HYDRA is used.)

Please  note  that  once  a  capacity  group  has  been  created,  the  identifier/flag  cannot  be  changed

anymore.

You can only plan operations for a machine group if the machine group is a capacity group.

You can find notes on how to edit capacity groups or group assignment in

Location group

You can specify transition times for location groups in the Transport matrix. These times are used as

transport time, when operations are created.

Please  note  that  once  a  location  group  has  been  created,  the  identifier/flag  cannot  be  changed

anymore.

You  can

find  notes  on  how

to  edit  capacity  groups  or  group  assignment  at:

Notes on editing groups and group assignments.

Year model

A year model of the group is used for scheduling.

Performance level

This  value  is  used  by  the  shop  floor  scheduling  module,  when  the  remaining  run  time  (remaining

processing  time)  is  calculated.    A  performance  level  <  100%  increases  the  remaining  runtime  (=

remaining processing time); a performance level > 100% reduces it.

Production variants

Production variants can be defined in the system for planning in the shop floor scheduling for specific

orders. In case production variants are not used in all areas, this configuration relating to groups can

overwrite the utilization of production variants. Consequently, the group configuration takes priority

over the order type configuration.

However, if the setting N - Not used was made for the order type, then no production variants are

used for this order type.  The group configuration does not have any effect in this case.

Refer  to  the  application  manual  for  further  information  on  configuring  the  query  for  production

variants.

Including shortage capacity

Individual capacities assigned to this capacity group  are shortage capacities. Attention  is given to

potential competition when performing detailed planning for such capacities.

Consideration during dispatching: Continuous capacity

Individual capacities assigned to this capacity group are relevant merely for scheduling. The planning

takes place here without consideration of clashes.

MOC_ResourceGroups.docx

Version: 1.7.23266

Page 3 of 5

Groups

During simulation: Shortage capacity

Reserved; currently not used.

During simulation: Continuous capacity

Reserved; currently not used.

Report group

You can define  Report  groups  for evaluation purposes.  Report groups are groups of machines or

workplaces  that  can  be  independent  of  the  capacity  groups,  e.g.  expensive  machines,  slow

machines.

Once an evaluation group has been created, the indicator cannot be changed.

For  further  information  on  editing  evaluation  groups  or  group  assignments,  refer  to  the  following

section:

 Notes on editing groups and group assignments.

User

A user can be entered in the User field if the evaluation group should only be displayed to this user..

You can only enter this field when  you prepare an  evaluation group.   You cannot edit this field in

editing dialog (read only!).

Notes on editing groups and group assignments

To automatically create capacity groups

When creating a workplace or a machine, a group is automatically created as a Capacity group if no group

exists yet.

For  this  new  group,  certain  settings  (for  example,  shift  model,  performance  level)  of  the  workplace  just

created are transferred. If the group exists, the group setting are not changed by creating a new workplace

or change the workplace data.

Then the created workplace is automatically assigned to this capacity group.

If the group is modified at a work center the group assignment to the capacity group will be modified as

well.

If a work center is deleted the assignment to previous groups will also be deleted automatically. Provided

that a group assignment does no longer exist, the group is not deleted automatically.

MOC_ResourceGroups.docx

Version: 1.7.23266

Page 4 of 5

Groups

The cost center of the workplace is not transferred to the group as it could be the case that workplaces with

different cost centers are assigned to a capacity group. If, on the other hand, a cost center is entered in the

group  configuration,  a  plausibility  check  is  performed  when  a  new  group  is  created  or  an  existing

machine/workplace configuration is changed. This ensures that the cost center of the workplace matches

the cost center of the group. If this is not the case, the user is notified with the error message: "The cost

center of the machine must be the same as the cost center of the group". This check is not performed,

when the group is changed.

Assignment of workplace to capacity groups

If you add a new workplace Workplace and resource configuration, this workplace is automatically assigned

to  a  capacity  group.  This  capacity  group  has  the  same  name  as  the  group  specified  in  the

workplace/resource configuration.

If the group is changed for a workplace/resource configuration, the assignment to the previous capacity

group is deleted and assigned to the new capacity group. If the capacity group does not exist, the system

automatically creates a capacity group and assigns the workplace.

Please  note

that  a  workplace  or  machine  can  only  be  assigned

to  one  capacity  group.

Workplaces/machines that are not assigned to a capacity group are not included in the planning.

Assignment of workplaces for location groups

Please note that a workplace or machine can only be assigned to one capacity group.

Assignment of workplaces for evaluation groups

It is allowed to assign a workplace or a machine to several evaluation groups.

MOC_ResourceGroups.docx

Version: 1.7.23266

Page 5 of 5

