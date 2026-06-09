Manual

Histogram of Personnel
Requirements
HLS-PBH 8.2

Version 1.1.23435

Last changed on: 28.09.2020

Histogram of Personnel Requirements

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

HLS-PBH_82.docx

Version: 1.1.23435

Page 2 of 8

Histogram of Personnel Requirements

Contents

1  Overview: personnel scheduling reports ...................................................... 4

2  Graphic planning - personnel requirements ................................................. 5

HLS-PBH_82.docx

Version: 1.1.23435

Page 3 of 8

Histogram of Personnel Requirements

1  Overview: personnel scheduling reports

Purpose

This  function  package  includes  evaluations/reports  for  personnel  scheduling  in  the  HYDRA  Shop  Floor

Scheduling module (HLS).

Implementation notes

Use the function package if:



you  want  to  compare  personnel  requirements  with  available  personnel  capacities  in  graphic

planning.

Integration

In  order  to  use  this  function  package,  you  require  the  function  package  Management  Functions  for

Personnel Scheduling and other HLS licenses.

Features

Overview of workforce requirements in graphic planning: Graphical display of personnel requirements with

variable time horizon and comparison with available employees and their qualifications.

HLS-PBH_82.docx

Version: 1.1.23435

Page 4 of 8

Histogram of Personnel Requirements

2  Graphic planning - personnel requirements

Overview

HYDRA menu

Production control  Preparations for production  Graphic planning

FEDRA menu

Detailed scheduling  Planning  Graphic planning

Tab

Personnel requirements

Function authorization

perov

You can use the function Personnel requirement of the graphic planning to show and compare the required

and available personnel in a histogram and a table.

HLS-PBH_82.docx

Version: 1.1.23435

Page 5 of 8

Histogram of Personnel Requirements

Requirements

If you want to show the planned personnel capacities, you have to make sure that the absence and shift

planning  are  maintained  properly  in  HYDRA.  Usually,  you  can  do  this  in  the  labor  time  maintenance

application.

In addition, you have to define personnel requirements. To do so, you can choose from the following three

options. Irrespective of how the personnel requirements are defined, the system only generates personnel

requirements if operations are planned.

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

HLS-PBH_82.docx

Version: 1.1.23435

Page 6 of 8

Histogram of Personnel Requirements

Qualification

You can restrict the displayed personnel requirements to one or multiple qualifications. Displaying all

qualifications shows whether enough personnel is available. If you restrict the displayed data to one

qualification, you can check if enough employees with this qualification are available.

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

HLS-PBH_82.docx

Version: 1.1.23435

Page 7 of 8

Histogram of Personnel Requirements

Personnel  requirements  are  added  up,  if  you  plan  multiple  operations  simultaneously  for  one

workplace.

HLS-PBH_82.docx

Version: 1.1.23435

Page 8 of 8

