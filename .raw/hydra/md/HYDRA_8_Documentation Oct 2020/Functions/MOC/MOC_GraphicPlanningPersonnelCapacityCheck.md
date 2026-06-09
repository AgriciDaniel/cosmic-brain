Graphic Planning: Display of Personnel Capacities

1  Graphic Planning: Display of Personnel Capacities

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

1.1  Check if at least one person is planned

When planning an operation for a workplace, this function checks if at least one employee is available to

process  the  operation.  Database  entries  are  decisive.  That  means,  the  current  planning/assignments

displayed  upon  saving  the  application  Workplace  assignment.  The  qualification  is  not  relevant  in  this

case.

If  in  the  Workplace  assignment  application  no  personnel  is  assigned  to  a  workplace  over  a  specific

period,  this  workplace  does  not  have  free  capacities  in  the  Shop  Floor  Scheduling  module  during  this

period of time.

MOC_GraphicPlanningPersonnelCapacityCheck.docx Status: 19.06.2020

Page 1 of 4

Graphic Planning: Display of Personnel Capacities

Periods  when  working  time  is  planned  according  to  the  shift  model  but  no  workplaces  are  planned

(assigning staff to workplaces), are highlighted in turquoise in Graphic Planning. With respect to planning,

these turquoise periods are like times without shift.

  When  it  comes  to  (re-)  planning,  the  system  postpones  all  operations  planned  for  this
workplaces until personnel capacities are again available. This is rather a planning feature: you

can still log on OPs to the workplace.

1.2  Check personnel availability

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

1.3  Check personnel availability and qualification

This function complements the option Check personnel availability. Not only does this function check if at

least  one  employee  is  assigned  to  the  workplace  but  also  if  sufficient  personnel  is  available  with  the

required qualification to process the operation.

MOC_GraphicPlanningPersonnelCapacityCheck.docx Status: 19.06.2020

Page 2 of 4

Graphic Planning: Display of Personnel Capacities

If an operation is planned for a workplace, the qualifications required by the operation are compared with

the qualifications of the staff assigned to this workplace.

A conflict message "Staff shortage: qualification" is shown if a required qualification cannot be met. The

planner can either plan the operation or cancel the planning process.

Configuration

Configure the following to check qualifications:

  Qualifications  are  checked  for  workplaces  configured  as  follows:  enable  "Check  qualifications

when  planning  operations"  in  the  option  "check  personnel  availability"  of  the  "workplace

configuration" tab (section HLS) in the configuration of workplaces and resources.

1.4  Show planned personnel

Function authorization

grapt.spe (show personnel)

This  function  has  been  designed  for  visualization  purposes.  This  function  cannot  be  used  to

replan personnel.

Planned  staff  is  shown  below  the  planned  operations.  You  can  open  the  view  below  the  workplace  by

clicking the

 icon. This will change the "+" icon to "-". You can close the view by clicking the "-" icon.

Staff planned simultaneously for the  same workplace is shown one  below the other. The additional row

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

MOC_GraphicPlanningPersonnelCapacityCheck.docx Status: 19.06.2020

Page 3 of 4

Graphic Planning: Display of Personnel Capacities

o  Check qualifications when planning the operation

MOC_GraphicPlanningPersonnelCapacityCheck.docx Status: 19.06.2020

Page 4 of 4

