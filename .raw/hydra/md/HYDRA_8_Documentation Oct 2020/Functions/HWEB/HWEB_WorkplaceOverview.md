Workplaces/ machines

1  Workplaces/ Machines

Overview

The workplaces/ machines application, also referred to below as workplace overview, is geared towards

users  in  the  production  preparation  and  production  monitoring  department,  who  would  like  to  have  an

overview of the production situation at specific workplaces/ machines or an entire unit in an organization.

Integration

The workplace overview provides a glance at all information relevant to the  workplace. Not only does it

make master data available, but also a variety of data required to control production. Among these are:

  Current status of the workplace/ machine.

  Operation currently running (logged on) at the workplace/ the machine

  Target/ actual comparison of cycles and number of strokes.



Selection criteria

The application provides the following selection criteria:

Workplace from … to …

This selection criterion references the workplace in the workplace/ resource configuration. You can also

run a search using wildcards (placeholders *).

Short name

This  selection  criterion  references  the  short  name  of  the  workplace/  the  machine  as  defined  in  the

configuration. You can also run a search using wildcards.

Group from … to …

This selection criterion refers to the group defined in the workplace/ resource configuration. All machines

or  workplaces  are  displayed  that  are  assigned  to  the  selected  group.  You  can  also  run  a  search  using

wildcards.

Report group

This selection criterion references the report groups.  All machines or  workplaces are displayed that  are

assigned to the selected report group. You cannot run a search using wildcards.

HWEB_WorkplaceOverview.docx

Version: 1.0.1362

Page 1 of 4

Workplaces/ machines

Cost center

This selection criterion refers to the cost center defined in the workplace/ resource configuration. You can

also run a search using wildcards.

Workplace overview detail application

Shown  in  this  detail  application  are  all  workplaces  displayed  depending  on  the  selections  made  in  the

selection panel. Shown are the current status, workplace information, shift quantities, cycles and number

of cycles. Below find a description of the available data: By clicking on the underlined field captions, you

have the ability to sort the selected field in ascending or in descending order.

Status

The  different  states  are  combined  under  "status"  and  are  shown  in  the  form  of  an  "LED".  The

following color code applies:

LIGHT GREEN

Status with RPA 11 (typically "Production")

BLUE

RED

GRAY

Status with RPA 7 (typically "Set up")

Status 30000 (typically "Not assigned")

Status 20000 or status with RPA 12

(typically "Break/ no shift")

YELLOW

All other states

Workplace

Unique ID of the workplace as per configuration.

Short name

Name of the workplace as per configuration.

Group

Group as per configuration that the workplace is assigned to.

Status designation

Status designation of the status currently active at the workplace.

Status since

Point in time (date, time) when the status was assigned.

Duration so far

Duration so far of the status currently active at the workplace.

HWEB_WorkplaceOverview.docx

Version: 1.0.1362

Page 2 of 4

Workplaces/ machines

Yield (P)

Yield that has been posted so far at the workplace in the current shift.

Scrap (P)

Scrap that has been posted so far at the workplace in the current shift.

Target cycle

Current target cycle at the workplace in seconds per cycle.

If an operation is logged on at the workplace/ at the machine, the target cycle per cycle is displayed

at the operation in seconds. There is no target cycle for machines at which currently no operation is

logged on. In this case, the target cycle is shown as 0.

Actual cycle

Current actual cycle at the workplace in seconds per cycle.

The difference is calculated in % using the following formula: (Target cycle  - actual cycle) / target

Difference (%)

cycle * 100%

Target number of cycles

1 / Target cycle

There is no target cycle for machines at which currently no operation is logged on. Therefore, the

target number of strokes is shown as 0.

Actual number of cycles

1 / actual cycle

Difference (%)

(Target number of cycles - actual number of cycles) / target number of strokes * 100%

Article

Article number of the operation currently being produced at the workplace.

MES order number

The operation's combined order/ operation number.

HWEB_WorkplaceOverview.docx

Version: 1.0.1362

Page 3 of 4

0.1000.._unitsthstatusmaschineseActualcycl

Workplaces/ machines

OP designation

Designation of the operation

Tool

The tool defined at the operation

Color

The color defined at the operation

HWEB_WorkplaceOverview.docx

Version: 1.0.1362

Page 4 of 4

