Manual

Special Functions for Line
Production
MDE-SFL 8.1

Version 1.1.4716

Last changed on: 19.06.2020

Special Functions for Line Production

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

MDE-SFL_81.docx

Version: 1.1.8860

Page 2 of 15

Special Functions for Line Production

Contents

1  Overview – Special Functions for Line Production ...................................... 4

2  Line Assignment ........................................................................................... 5

3  Configuration and Function of the Specific Line Processing ........................ 7

4  Handling at the Terminal ............................................................................ 12

MDE-SFL_81.docx

Version: 1.1.8860

Page 3 of 15

Special Functions for Line Production

1

 Overview – Special Functions for Line Production

Purpose

This component provides functions at the shop floor terminal for connection of lines.

The  function  package  is  used  when  you  wish  to  connect  a  simple  production  line  whose  order-related

consideration covers only one operation.

Integration

The component offers the connection of lines and their aggregates via corresponding machine interfaces

for monitoring and for automatic recording of quantities.

Features

  Aggregate configuration

Configuration possibility for aggregates and their assignment to lines

  Line and aggregate monitoring

Monitoring of the line and its aggregates via machine interfaces and automatic posting of the

recorded statuses.

  Quantity recording

Order-related quantity recording and posting for the line



Icon view at Windows terminals

Special icon view at Windows-based line terminals

MDE-SFL_81.docx

Version: 1.1.8860

Page 4 of 15

Special Functions for Line Production

2  Line Assignment

Summary

Menu

Master data  Workplaces/ machines  Line assignment

Transaction code

mla

Function authorization  mdmla

The  term  flow  manufacturing  is  used  to  describe  a  time-bound  work  process  during  which  larger

quantities  of  the  same  type  of  products  are  manufactured.  The  machines  required  in  this  process  (also

referred  to  as  aggregates)  are  arranged  by  work  sequence;  the  workpieces  are  usually  transported

automatically on a conveyor belt to the next aggregate. The consolidation of the separate aggregates is

generally also referred to as a line.

Usage

Both aggregates as well as the line as the logical consolidation are defined as  HYDRA machines. They

are specifically identified and therefore set apart from "traditional" machines by the machine type identifier

defined in the Machine/ workplace configuration.

Machine type

Designation

A

L

Aggregate

Line

The  aggregates  are  assigned  to  a  line  using  the  aggregate  assignment  function  in  Machine/  workplace

configuration. A selection dialog Aggregate line assignment appears, in which the aggregates assigned to

the line are displayed.

Selection criteria

The application provides the following selection criteria:

Line

Used to select the line

Field descriptions

Line assignment

Line

Unique name for the line

Position

Position of the line at the terminal or on the display

MDE-SFL_81.docx

Version: 1.1.8860

Page 5 of 15

Special Functions for Line Production

Aggregate

The aggregate that the line is assigned to.

Workplace master data

Short designation

Short name for the aggregate (workplace/ machine)

Designation

Full name for the aggregate (workplace/ machine)

Group

Associated group for the aggregate (workplace/ machine)

Cost center

Associated cost center for the aggregate (workplace/ machine)

MDE-SFL_81.docx

Version: 1.1.8860

Page 6 of 15

Special Functions for Line Production

3  Configuration and Function of the Specific Line Processing

Overview

The  term  flow  manufacturing  is  used  to  describe  a  time-bound  work  process  during  which  larger

quantities  of  the  same  type  of  products  are  manufactured.  The  machines  required  in  this  process  (also

referred  to  as  aggregates)  are  arranged  by  work  sequence;  the  work  pieces  are  usually  transported

automatically on a conveyor belt to the next aggregate. The consolidation of the separate aggregates is

generally also referred to as a line.

The following chart illustrates and example of the production process:

Bottle
unscrambler

Filler

Capping
-
unit

Labeller

To
packer

Creation of Line and Aggregates

Both  the  aggregates  and  the  line  as  a  logical  consolidation  are  defined  in  the  system  as  MNR  Type

resources.  They  are  specifically  identified  and  therefore  set  apart  from  "traditional"  machines  by  the

identifier workplace type in the resource configuration:

Workplace type

Designation

A

L

Aggregate

Line

Aggregate Assignment

The aggregates are assigned to a line. The Line assignment configuration is provided for this.

Machine Connection of Aggregates and Line

After  selection  of  a  line  or  aggregate,  the  settings  for  the  machine  connection  are  made  per

line/aggregate under the tab  MDE configuration in the resource configuration. The following points must

be observed:

MDE-SFL_81.docx

Version: 1.1.8860

Page 7 of 15

Special Functions for Line Production

Connection of the Line

The  line  is  monitored  by  means  of  a  direct  machine  connection.  The  signal  there  (cycle  signal  or

operating signal) comes from an aggregate in the line which is regarded as being  representative for the

line (e.g. bottler). A separate contact has to be wired on the shop floor unit (e.g. CT-MSS, CT-UMPS) for

this.

For order-related quantity determination, the line must be wired via corresponding counter inputs. In the

counter configuration, the corresponding counter inputs then have to be defined via which the cycles are

to  be  transmitted  from  an  aggregate  to  the  terminal.  If  these  cycles  are  also  to  be  posted  machine-

specifically to the aggregate, a separate contact has to be wired on the shop floor unit (e.g. CT-MSS, CT-

UMPS) for this aggregate.

Connection of the Aggregates

By  analogy  with  the  line,  an  individual  aggregate  is  also  monitored  by  means  of  a  direct  machine

connection.  The  signal  there  (cycle  signal  or  operating  signal)  comes  from  the  respective  physical

aggregate. Here again, separate contacts have to be wired on the shop floor unit for each aggregate.

Note on field Cycle extension (tab MDE configuration  Monitoring):

The  ERP  system  defines  a  cycle  specification  (target  duration  for  1000  machine  cycles)  for  each

operation.  This  value

is  multiplied  by  a

tolerance  value  (in  percent,  defined

for  each

machine/aggregate) and results in the target cycle for the cycle monitoring at the terminal.

MDE-SFL_81.docx

Version: 1.1.8860

Page 8 of 15

Special Functions for Line Production

As  only  one  cycle  specification  can  be  defined  for  the  operation,  this  specification  influences  the

cycle monitoring for all the aggregates assigned to the line (cf. Aggregate assignment). It is therefore

important  that  a  tolerance  value  is  entered  for  the  aggregates  which,  based  on  the  cycle

specification, results in a realistic target cycle for the cycle monitoring.

Assignment Machine Status  Aggregate or Line

The  settings  for  the  machine  connection  are  made  per  line/aggregate  via  the  Status  assignment.  A

precondition for the status assignment is the creation of the status texts.

Machine Status of the Line

At least the following statuses have to be defined for the line:

-

Status

Production

Status number

freely variable, e.g. 1

Status text

RPA

freely variable, e.g. PRODUCTION

MUT

Production identifier

Production

Transmission to aggregates

Manual assignment

No

No

Automatic assignment

Yes, if monitoring is performed via operating signal

Assignment number

Input at which the operating signal Production is received

Further settings are optional.

-

Status

Disturbance

Status number

freely variable, e.g. 99

Status text

RPA

freely variable, e.g. GEN. DISTURBANCE

freely variable, generally: DCI

Production identifier

Gen. disturbance

Transmission to aggregates

Manual assignment

Automatic assignment

Assignment number

Further settings are optional.

No

No

No

0

If  further  order-relevant  statuses  are  to  be  recorded,  these  are  also  defined  for  the  line.  The  following

example shows the configuration taking the example of the status Setup.

MDE-SFL_81.docx

Version: 1.1.8860

Page 9 of 15

Special Functions for Line Production

-

Status

Setup

Status number

freely variable, e.g. 2

Status text

RPA

freely variable, e.g. SETUP

freely variable, SET

Production identifier

Disturbance

Transmission to aggregates

Optional, e.g. for setup: Yes

Manual assignment

Automatic assignment

Assignment number

Yes

No

0

Further settings are optional.

Note for Option Transmission to Aggregates:

The option Transmission to aggregates offers the possibility of setting a global status on the line which is

then set automatically for all aggregates assigned to that line. This eliminates the need for explicit setting

of this status on each individual aggregate, e.g. during setup.

Note here that this status is also defined for all aggregates, and that the status number has to be identical

with the status number of the line.

Example:

Line S:

Status Setup

Status number: 2

Aggregate S-A1:

Status Setup

Status number: 2

:

:

:

Aggregate S-A5:

Status Setup

Status number: 2

Machine Status of the Aggregates

By  analogy  with  the  line,  at  least  the  statuses  for  Production  and  for  Gen.  disturbance  also  have  to  be

defined for the aggregates. As an option, further aggregate-related status can be defined (e.g. Electrical

fault).

If  the  statuses  were  defined  on  the  line  as  Transmission  to  aggregates,  these  have  to  be  additionally

defined for each aggregate. Note here that no production lock may be activated with these statuses, as

this lock would continue to be activated at the terminal even when the status is changed and would have

to be deactivated manually.

Settings at the Terminal

In order that the status of the line and its aggregates can be optimally monitored at the terminal, a display

in icon  view is recommended. For this the  Terminal configuration  has to be called up. After selection of

the corresponding terminals and selecting  the tab  MF functions, select the  option  Symbols under Other

settings.

All other terminal settings are independent of the line settings.

MDE-SFL_81.docx

Version: 1.1.8860

Page 10 of 15

Special Functions for Line Production

Assignment of the Line to the Terminal

Both  the  line  and  its  aggregates  are  assigned  to  the  terminal.  During  the  assignment  of  a  line  to  the

terminal, the associated aggregates are automatically also assigned and are displayed at the end of the

list with position 99.

It is possible to assign several lines to one terminal (Windows terminals only): With CT83x max. 2 lines,

with  CT84x  max.  3  lines.  An  assignment  of  both  lines  and  individual  machines  (e.g.  packing  unit)  to  a

common terminal is also possible. An assignment of lines, aggregates or machines to several terminals,

however, is not possible.

Please observe the limit of 16 HYDRA machines (lines + aggregates) per terminal.

MDE-SFL_81.docx

Version: 1.1.8860

Page 11 of 15

Special Functions for Line Production

4  Handling at the Terminal

For the display and handling of requirements  which  occur during flow manufacturing (lines), the dialogs

and functions described below are modified at the terminal.

Layout

If Machines/workplaces Symbols was selected as display during the terminal configuration, the lines and

its aggregates are displayed as follows:

Each  line  is  displayed  as  a  box  across  the  whole  screen  width.  Its  assigned  aggregates  are  displayed

below this box. The sequence in the display thereby  corresponds to the sequence of the assignment of

the aggregates to the line.

If further lines or machines are assigned to the terminal, these are displayed underneath.

The  color  in  which  the  line,  its  aggregates  and/or  further  machines  is  displayed  corresponds  to  the

momentary status:







Production

Disturbance

Not assigned

green

yellow

red

If further machines are assigned, these are displayed below the lines. The width of the display depends

on the number of machines to be displayed.

MDE-SFL_81.docx

Version: 1.1.8860

Page 12 of 15

Touching the corresponding icon (touchscreen) or pressing the assigned key (is displayed in the bottom

right corner of each icon) switches the display from the icon view to the machine overview.

Special Functions for Line Production

Touching the button ESC returns you to the icon view again.

If no further inputs are made, the view changes automatically after 30 seconds to the icon view again.

Postings at the Terminal

Depending on the posting to be carried out, the line, the corresponding aggregate or the desired machine

first has to be selected. The current selection is indicated by the box around the designation and by the

display in the upper part of the Machine overview.

Order-related or personalized postings can only be made for a line or a machine.

Status changes, on the other hand, can be made on a line, a machine or an aggregate.

Status Change on the Line

If machine statuses are defined for a line for which the switch Transmission to aggregates has been set, a

manual status change on the line (e.g. Setup) results in a status change of all the aggregates assigned to

the  line  (in  this  case  also  to  the  status  Setup).  It  makes  no  difference  here  whether  the  status  was

changed  with  the  function  "Change  status"  or  by  entering  the  status  in  the  operation  postings  (e.g.

operation  interruption,  operation  logoff).  A  precondition,  however,  is  that  the  status  number  at  the

respective aggregates is identical with that on the line.

The procedure at the terminal is as follows:

MDE-SFL_81.docx

Version: 1.1.8860

Page 13 of 15

When the status for the line has been set, it is automatically assigned to the aggregates assigned to the

line  (a  small  window  appears  in  which  the  progress  of  the  status  transmission  to  the  aggregates  is

Special Functions for Line Production

displayed).

Production Lock

Touching the button "Lock production status" allows the production lock to be activated and deactivated.

It  is  thus  possible  to  prevent  switching  to  the  status  Production  despite  incoming  machine  pulses  (e.g.

during Setup).

If this function is set for a line, it automatically applies to all the aggregates in the line. In reverse, when

the production lock is deactivated on the line, it is also deactivated on the assigned aggregates.

Please note

If the production lock was set for the line, it can nevertheless be deactivated individually, i.e. for an

individual aggregate

During  the  transmission  of  the  production  lock  from  the  line  to  the  aggregates,  the  event

P_SPERRE (production lock) is not logged for the aggregates. The setting of the production lock is

consequently documented in the machine history only for the line.

Partitioning

As  no  operations  are  logged  on  at  the  aggregates,  only  the  machine-specific  partitioning  and  the

machine-specific  pulse  factor  are  taken  into  consideration  for  the  aggregates  when  determining  the

quantities. Order-specific partitioning or pulse factor play no role at aggregates.

A  change  of  partitioning  which  is  only  permitted  on  the  line  leads  to  a  change  in  the  order-related

partitioning. The machine-related partitioning can only ever be changed in the machine configuration.

Target Cycle

The ERP system defines a cycle specification (target cycle) for each operation. This value is multiplied by

a tolerance value (in percent, defined for each machine/aggregate) and results in the target cycle for the

cycle  monitoring  at  the  terminal.  As  only  one  cycle  specification  can  be  defined  for  the  operation,  this

specification applies to all the aggregates of a line on which the operation is logged on.

With  the  corresponding  authorization  it  is  possible  at  the  terminal  to  change  the  target  cycle  for  the

operation (e.g. if it is discovered that the cycle specification set by the ERP system for the operation is too

small). Changing of this target cycle influences the cycle monitoring at all the aggregates. It is therefore

important that a tolerance value is entered for the aggregates which, based on the target cycle, results in

a realistic target cycle for the cycle monitoring.

MDE-SFL_81.docx

Version: 1.1.8860

Page 14 of 15

Special Functions for Line Production

MDE-SFL_81.docx

Version: 1.1.8860

Page 15 of 15

