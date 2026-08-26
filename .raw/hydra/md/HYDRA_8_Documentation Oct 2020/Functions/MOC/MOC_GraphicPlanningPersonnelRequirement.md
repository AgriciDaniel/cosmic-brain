Graphic planning - personnel requirements

1  Graphic planning - personnel requirements

Overview

HYDRA menu

Production control  Preparations for production  Graphic planning

FEDRA menu

Detailed scheduling  Planning  Graphic planning

Tab

Personnel requirements

Function authorization

perov

You  can  use  the  function  Personnel  requirement  of  the  graphic  planning  to  show  and  compare  the

required and available personnel in a histogram and a table.

MOC_GraphicPlanningPersonnelRequirement.docx  Status: 28.09.2020

Page 1 of 4

Graphic planning - personnel requirements

Requirements

If you want to show the planned personnel capacities, you have to make sure that the absence and shift

planning  are  maintained  properly  in  HYDRA.  Usually,  you  can  do  this  in  the  labor  time  maintenance

application.

In  addition,  you  have  to  define  personnel  requirements.  To  do  so,  you  can  choose  from  the  following

three  options.  Irrespective  of  how  the  personnel  requirements  are  defined,  the  system  only  generates

personnel requirements if operations are planned.

  Workforce requirements of workplaces

  Workforce  requirements  defined  by  the  machine/operator  relation  (M/O  relation  for  setup,  M/O

relation for production) of operations

  Workforce requirements defined by the  production resources and tools (resource types PRU for

setup and PER for production)

By default, the system only shows the personnel requirements if personnel is available. Use the following

INI entry to ignore the personnel availability. If you use this INI entry, the system will show the personnel

requirements even if no personnel is available. Note: If you enable this INI entry and personnel is

available, the system will not show the available personnel.

INI entry:

  Name: HLS

  Section: SCHEDULING

  Key: IGNORE_PERSONNEL_AVAILABILITY

  Value: 1

  Active: Enable/check the "active" checkbox

Toolbar

The toolbar tab Personnel requirement provides the following functions:

Histogram

Use this button to show or hide the histogram of the required and available personnel.

Table view

Use this button to show or hide the table view of the required and available personnel.

MOC_GraphicPlanningPersonnelRequirement.docx  Status: 28.09.2020

Page 2 of 4

Graphic planning - personnel requirements

Qualification

You can restrict the displayed personnel requirements to one or multiple qualifications. Displaying

all qualifications shows whether enough personnel is available. If you restrict the displayed data to

one qualification, you can check if enough employees with this qualification are available.

Legend

If activated, the histogram shows different colors depending on whether:

- personnel requirements are met

- personnel requirements are not met

- too many employees are planned

Color

Meaning

Personnel requirements are not met.

Personnel requirements are exceeded.

Personnel requirements are met.

Detail application: Histogram

The histogram graphically displays the required and available personnel. The histogram uses the colors

illustrated in the legend to highlight if personnel requirements are exceeded or not met. The Y axis shows

the number of staff that is available or required over time.

Hold the left mouse button and increase the scale of the workforce requirements (Y axis) if you

want to increase the dialog that shows the personnel requirements histogram.

Detail application: Table view

The table view compares the required and available personnel in table format. The application shows the

totals of required and available personnel in hours for each day.

Example: a person has a planned working time of 8 hours a day. An OP that requires 1 person and takes

5 hours is planned during these 8 hours. Results for this day:

Available personnel: 8 hours

Required personnel: 5 hours

Difference: 3 hours.

MOC_GraphicPlanningPersonnelRequirement.docx  Status: 28.09.2020

Page 3 of 4

Graphic planning - personnel requirements

Personnel  requirements  are  added  up,  if  you  plan  multiple  operations  simultaneously  for  one

workplace.

MOC_GraphicPlanningPersonnelRequirement.docx  Status: 28.09.2020

Page 4 of 4

