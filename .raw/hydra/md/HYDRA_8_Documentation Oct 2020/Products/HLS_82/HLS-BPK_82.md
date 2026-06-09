Manual

Display of Personnel
Capacities
HLS-BPK 8.2

Version 1.0.23049

Last changed on: 01.09.2020

Display of Personnel Capacities

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

Display of Personnel Capacities

Stand: 01.09.2020

Page 2 of 8

Display of Personnel Capacities

Contents

1  Overview: Personnel Capacities .................................................................. 4

2  Graphic Planning: Display of Personnel Capacities ..................................... 5

2.1  Check if at least one person is planned ............................................................... 5

2.2  Check personnel availability ................................................................................ 6

2.3  Check personnel availability and qualification ...................................................... 6

2.4  Show planned personnel ..................................................................................... 7

Display of Personnel Capacities

Stand: 01.09.2020

Page 3 of 8

Display of Personnel Capacities

1  Overview: Personnel Capacities

Purpose

This  function  package  provides  functions  allowing  for  the  planned  and  available  staff  in  order  to  plan

operations in the HYDRA Shop Floor Scheduling module.

Implementation notes

You  use  the  function  package  if  you  want  to  make  sure  that  an  operation  can  only  be  planned  if  the

required personnel qualifications are available at the workplace.

Integration

Personnel is planned in the Personnel Scheduling module (PEP) in the Workplace assignment.

Features

  At least one employee must be planned for a specific workplace in order to plan an operation for

this workplace.

  The planned personnel's qualifications are checked when planning an operation.

  The planned personnel is displayed in the graphic planning. This enables the planner to decide if

an operation takes place or who should be assigned.

Display of Personnel Capacities

Stand: 01.09.2020

Page 4 of 8

Display of Personnel Capacities

2  Graphic Planning: Display of Personnel Capacities

Purpose

The following functions are available in the graphic planning to inform about personnel capacities:

  Check if at least one person is planned

  Check personnel availability

  Check personnel availability and qualification

  Show planned personnel

Integration

When Planning operations in the graphic planning, these functions take into account the staff assigned to

the workplaces in the Workplace assignment application of the Personnel Scheduling module.

Requirements

The functions can be used if the following requirements are met:

  Staff  must  be  assigned  to  the  workplaces  in  the  Workplace  assignment  application  of  the

Personnel Scheduling module.

  The  personnel  requirements  or  qualifications  must  be  defined.  You  may  choose  from  the

following options:

  Workforce requirements of workplaces

  Workforce  requirements  defined  by  the  machine/operator  relation  (M/O  relation  for  setup,

M/O relation for production) of  operations

  Workforce requirements defined by the production resources and tools (resource types PRU

for setup and PER for production)

  The following chapters describe the required configurations to activate the checks.

2.1  Check if at least one person is planned

When planning an operation for a workplace, this function checks if at least one employee is available to

process  the  operation.  Database  entries  are  decisive.  That  means,  the  current  planning/assignments

displayed  upon  saving  the  application  Workplace  assignment.  The  qualification  is  not  relevant  in  this

case.

If  in  the  Workplace  assignment  application  no  personnel  is  assigned  to  a  workplace  over  a  specific

period,  this  workplace  does  not  have  free  capacities  in  the  Shop  Floor  Scheduling  module  during  this

period of time.

Display of Personnel Capacities

Stand: 01.09.2020

Page 5 of 8

Display of Personnel Capacities

Periods  when  working  time  is  planned  according  to  the  shift  model  but  no  workplaces  are  planned

(assigning staff to workplaces), are highlighted in turquoise in Graphic Planning. With respect to planning,

these turquoise periods are like times without shift.

  When  it  comes  to  (re-)  planning,  the  system  postpones  all  operations  planned  for  this
workplaces until personnel capacities are again available. This is rather a planning feature: you

can still log on OPs to the workplace.

2.2  Check personnel availability

When  planning  an  operation  for  a  workplace,  this  function  checks  if  sufficient  personnel  is  available  to

process the operation.

If  no  person  is  assigned  to  the  workplace  in  the  Workplace  assignment  application,  the  entire  shift  is

deemed  "unscheduled".  No  operation  can  be  planned.  Times  when  no  employee  is  assigned  to  the

workplace

are

highlighted

in

turquoise

in

the

Gantt

chart:

If (at least) one employee is assigned, the workplace's shift model is applicable and planning is allowed.

When  planning  an  operation,  the  system  checks  if  sufficient  employees  are  assigned  in  the  Workplace

assignment application meeting required personnel capacities.

If this is not the case, a conflict message "Staff shortage: capacity" appears. The planner can either plan

the operation or cancel the planning process.

Configuration

Configure the following to check personnel availability:



In order to check personnel availability, one of the below-mentioned two checks must be set for

the  workplace.  This  can  be  configured  by  the  option  "check  personnel  availability"  in  the

"workplace configuration" tab (section HLS) of the configuration of workplaces and resources:

o  Check personnel availability

o  Check personnel availability and qualification

2.3  Check personnel availability and qualification

This function complements the option Check personnel availability. Not only does this function check if at

least  one  employee  is  assigned  to  the  workplace  but  also  if  sufficient  personnel  is  available  with  the

required qualification to process the operation.

Display of Personnel Capacities

Stand: 01.09.2020

Page 6 of 8

Display of Personnel Capacities

If an operation is planned for a workplace, the qualifications required by the operation are compared with

the qualifications of the staff assigned to this workplace.

A conflict message "Staff shortage: qualification" is shown if a required qualification cannot be met. The

planner can either plan the operation or cancel the planning process.

Configuration

Configure the following to check qualifications:

  Qualifications  are  checked  for  workplaces  configured  as  follows:  enable  "Check  qualifications

when  planning  operations"  in  the  option  "check  personnel  availability"  of  the  "workplace

configuration" tab (section HLS) in the configuration of workplaces and resources.

2.4  Show planned personnel

Function authorization

grapt.spe (show personnel)

This  function  has  been  designed  for  visualization  purposes.  This  function  cannot  be  used  to

replan personnel.

Planned  staff  is  shown  below  the  planned  operations.  You  can  open  the  view  below  the  workplace  by

clicking the

 icon. This will change the "+" icon to "-". You can close the view by clicking the "-" icon.

Staff planned simultaneously for the same workplace is shown one  below the other. The additional row

below the workplace is empty if no personnel is assigned to the workplace.

When  pointing  with  the  mouse  on  a  person,  a  tooltip  appears  showing  information  from  the  Workplace

assignment:

  The person's first and last name

  Qualification

  Percentage  the  employee  occupies  the  workplace  during  the  shift  (according  to  the  shift  model

defined in the Personnel Scheduling module).

Configuration

Configure the following to view the staff planned for a workplace:

  Check the option "show personnel assignments" in the "workplace" tab of the  HLS settings (the

function authorization grapt.spe is required).

  Set  one  of  the  two  below-mentioned  checks  in  the  option  "check  personnel  availability"  of  the

"workplace configuration" tab (section HLS) in the configuration of workplaces and resources:

o  Check personnel availability

Display of Personnel Capacities

Stand: 01.09.2020

Page 7 of 8

o  Check qualifications when planning the operation

Display of Personnel Capacities

Display of Personnel Capacities

Stand: 01.09.2020

Page 8 of 8

