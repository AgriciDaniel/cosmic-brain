Manual

Ranges of Coverage and
Material Availability (MOC)
MPL-RMV 8.1

Version 1.0.54

Last changed on: 19.06.2020

  Ranges of Coverage and Material Availability (MOC)

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

MPL-RMV_81.docx

Version: 1.0.18468

Page 2 of 26

  Ranges of Coverage and Material Availability (MOC)

Contents

1  Ranges of Coverage and Material AvailabilityError! Bookmark not defined.

2  Range of Coverage Analysis and Material Availability ................................. 6

3  MBL Range of Coverage Analysis ............................................................... 8

4  Production Levels ....................................................................................... 15

5  Assignment of Production Levels ............................................................... 18

6  Closed Loops / Supply Relationships ........................................................ 20

7  Range of Coverage Analysis and Material Availability ............................... 23

MPL-RMV_81.docx

Version: 1.0.18468

Page 3 of 26

  Ranges of Coverage and Material Availability (MOC)

1  Ranges of Coverage and Material Availability (MOC)

Overview

Possible fields of application

The function package "ranges of coverage and material availability" complements the function packages

"material  and  production  logistics"  as  well  as  "tracking  &  tracing"  by  functions  to  represent  the  material

flow and monitor ranges of coverage in production.

Machines/workplaces  defined  in  the  system  are  connected  with  material  buffers  defined  in  the  system

and grouped to production levels.

These  production  levels  are  used  to  define  delivery  relationships  and,  as  a  result,  to  represent  the

material flow in production as basis for estimations of the range of coverage.

Implementation notes

The function package "ranges of coverage and material availability" is used if you

  would like to monitor the material flow and range of coverage of material.

  would  like  to  make  statements  on  the  current  or  expected  material  availability,  in  particular,  for

WIP material.

Integration

The  function  package  "ranges  of  coverage  and  material  availability"  uses  the  machines/workplaces

defined in the system as well as the material buffers created in the system.

The  orders/operations  existing  in  the  system  are  referred  for  considerations  relating  to  the  range  of

coverage.

Functions

  Configuration of production levels

o  Configuration  of  production  levels  to  which  the  machines  and  material  buffers  are

assigned from which the machines of the corresponding level may withdraw material.

  Configuration of supply relationships

o  Representation of supply relationships between the production levels. In this context, one

production level may have several subsequent levels or preceding levels.

  Checking of material availability

o  Checking of material availability for an existing situation (e.g. production level)

  Estimation of range of coverage

MPL-RMV_81.docx

Version: 1.0.18468

Page 4 of 26

  Ranges of Coverage and Material Availability (MOC)

o  Estimation  of  the  range  of  coverage  for  materials  transferred  between  two  production

levels

MPL-RMV_81.docx

Version: 1.0.18468

Page 5 of 26

  Ranges of Coverage and Material Availability (MOC)

2  Range of Coverage Analysis and Material Availability

Usage

For the purpose  of analyzing material coverage ranges and/or material availability, so-called production

levels are defined. In this process, various machines as well as material buffers from where the machines

of a specific production level may retrieve material are assigned to a specific production level.

In  addition,  the  supply  relationship  between  production  levels  is  modeled.  A  production  level  may  have

several  subsequent  and/or  preceding  levels.  In  this  supply  relationship,  a  minimum  coverage  range  is

defined.

Prerequisites for Configuration

  Definition of production levels

  Assignment of machines/workplaces and consistently their material buffer for production levels.

  Assignment of additional material buffers for production levels.

  Definition  of  supply  relationships  between  production  levels;  in  this  regard,  a  preceding  level  is

considered as supplying, a subsequent level is considered as consuming.

  A preceding level may have several subsequent levels.

  A subsequent level may have several preceding levels.

Configuration of Production Levels

Define various production levels and create these production levels in the system.

Assign the related machines to the created production levels (production level assignment). By assigning

a  machine,  its  allocated  material  buffers  will  automatically  be  assigned,  too.  It  is  not  possible  to  delete

these material buffers explicitly, but they will be deleted automatically upon deletion of the assignment of

the related machine.

Assign the related material buffers to the created production levels (production level assignment).

Configuration of Supply Relationships

Define various supply relationships and create these supply relationships in the system by assigning one

preceding level and one subsequent level from the defined production levels in the system to each supply

relationship.

For  each  preceding  level  (predecessor  production  level),  several  entries  can  be  created  for  several

subsequent levels (consumer/successor).

MPL-RMV_81.docx

Version: 1.0.18468

Page 6 of 26

  Ranges of Coverage and Material Availability (MOC)

For  each  subsequent  level  (consumer/successor  production  level),  several  entries  can  be  created  for

several preceding levels (predecessor).

MPL-RMV_81.docx

Version: 1.0.18468

Page 7 of 26

  Ranges of Coverage and Material Availability (MOC)

3  MBL Range of Coverage Analysis

Overview

The range of coverage analysis allows the user to recognize how much time is left until a specific material

for  a  production  level  is  consumed  and/or  for  how  long  there  will  be  enough  material  available  for

production.

This  means  that  this  function  analyzes  the  range  of  coverage  of  a  material  transferred  between  two

consecutive production levels (preceding level and subsequent level).

The range of coverage computation is requested for a  production level considered as consuming in this

context. With regard to the analysis, all supply levels/production levels assigned to this level as preceding

levels are then considered.

If these, in turn, are supply levels to other levels, the latter are also included for the purpose of a holistic

analysis.

In this process, the following materials from the batch stock are included:

  Material of the selected production level

o  Material in the configured input buffer of the production level

o  Material currently being used as component in the running operation (to be found through

BOM)

  Material from the preceding levels to the selected production level

o  Material currently located in configured output buffers of preceding levels

o  Material currently produced in the preceding levels of the running operation

For each material, the number of supplying as well as consuming machines is indicated.

The current stock of material buffers to be analyzed is considered as initial stock. In this regard, batches

currently logged on to consuming machines are also considered.

For calculating the range of coverage, the criteria listed below are therefore relevant:

  The consuming OPs and their target cycle result in a demand per unit of time (e.g. component A

= 100 pcs/h are consumed).

  The supplying OPs and their target cycle result  in  a  stock per unit of time (e.g. component A =

100 pcs/h are produced).

MPL-RMV_81.docx

Version: 1.0.18468

Page 8 of 26

  Ranges of Coverage and Material Availability (MOC)

Connections

Preceding

level V1

Preceding

level V2

Preceding

level V3

Parallel production level P1

Current production level

Parallel production level P2

Configuration Data Model

mde_fertstufen

mde_fertstufe_zord

maschinen

mat_puffer

mde_fertstufe_lbez

Selection

  Production level

The range of coverage computation is requested for a production level considered as consuming

in this context. With regard to the analysis, all production levels assigned to this level as

preceding levels are then considered. If these, in turn, are supply levels to other levels, these

other, retrieving production levels are also included for the purpose of a holistic analysis.



Incl. materials which are (currently) only supplied/produced

This option allows for extending the analysis to also include materials which are currently only

supplied and/or only produced.

Display

The  range  of  coverage  is  displayed  in  hours  as  well  as  a  trend  (arrows/signs/symbols).  The  display  is

updated automatically and/or cyclically every 180 seconds.

MPL-RMV_81.docx

Version: 1.0.18468

Page 9 of 26

The range of coverage analysis grid shows the data listed below:

  Ranges of Coverage and Material Availability (MOC)

Designation
Material
Material

Designation

Stock

Description, source





In producing operations, the material corresponds to the
materials in the component list
In supplying operations, the material corresponds to the
article ID

Material designation from batch stock for selected material
numbers
Quantity:
  Batches to be selected from batch stock with relevant

material number

  Selected batches are always in the free/running status (in
buffer/posted on operation). Processed or locked batches
are not used.
If the remaining quantity is < 0, these batches are not
considered.



Unit from batch stock for selected quantity

Unit
Range of coverage
Range of coverage
Range of coverage in hours (decimal); default: not visible
Previous range of coverage  Range of coverage in hours (decimal); default: not visible
In addition, the trend of the range of coverage (change in
Trend
comparison to previous state) is indicated in front of each bar
by an appropriate symbol.

- increasing

- decreasing

- unchanged
Hour; bar chart
Hour; bar chart
Hour; bar chart
Hour, bar chart; default: not visible
Hour, bar chart; default: not visible
Hour, bar chart; default: not visible

1
 :
16
17
 :
24
Retrieving machines
Total

In production

Supplying machines
Total

In production

Machines within the supply relationships of the current
production level and with currently running operations using
this material.
Machines within the supply relationships of the current
production level and with currently running operations using
this material and operating in the Production status.

Machines of other supply relationships with currently running
operations using this material.
Machines within the supply relationships of the current
production level and with currently running operations
producing this material.

MPL-RMV_81.docx

Version: 1.0.18468

Page 10 of 26

  Ranges of Coverage and Material Availability (MOC)

Data Acquisition

Data  are  acquired  for  a  production  level  considered  as  consuming  in  this  context.  With  regard  to  the

analysis, all production levels assigned to this level as preceding levels are then considered. If these, in

turn, are supply levels to other levels, these (other levels) are also included for the purpose of a holistic

analysis.

Parameter Entry

FSTUFE

PROD=J

:

:

selected production level

incl. materials (currently) only supplied/produced

 no range of coverage is calculated for these (range of coverage = 0)

Value Return

Column
ARTIKEL
BEZ
BESTAND
EINHEIT
REICHW
ANZ_ENT_MNR
ANZ_ENT_MNR_PROD
ANT_ENT_MNR_ANDERE
ANZ_PROD_MNR
ANZ_PROD_MNR_PROD
MIN_REICHW

Comment/Layout
Material
Material designation
Calculated material stock
Quantity unit of material
Range of coverage: calculated value
Number of retrieving machines
Number of retrieving machines in production
Number of retrieving machines from other production levels
Number of producing machines
Number of producing machines in production
Minimum range of coverage of material; always 0!

The following criteria are relevant for the range of coverage:

  The  consuming  OPs  (current  production  level  and  production  levels  running  in  parallel,  if  any)

and their cycle result in a demand per unit of time (e.g. component A = 100 pcs/h are consumed).

  The supplying OPs (preceding production levels) and their cycle result in a stock per unit of time

(e.g. component A = 100 pcs/h are produced).

The  initial  stock  is  the  current  material  stock  from  assigned  material  buffers  of  preceding  levels.  In  this

regard, batches currently logged on to consuming machines must also be considered.

Procedure

Identification of all machines to be considered

Recommendation: Enter the machines in a temporary table.

  Machines of the current production level

MPL-RMV_81.docx

Version: 1.0.18468

Page 11 of 26

  Ranges of Coverage and Material Availability (MOC)

  Machines of production levels preceding the current production level (preceding levels)

  Machines of other production levels following the preceding levels (quasi existing in parallel 'P' to

the current production level)

Identification of materials used on machines of the current level

(For these, the range of coverage has to be determined, i.e. how long will the current stock last.)

For  each  currently  running  operation  (AUFTRAG_STATUS.PROD_KENN  =  'L')  and  its  consuming

material  components  (MLST_HY.KENNZ  'M',  T')  in  production  on  machines  of  the  current  production

level, the required quantity per hour is calculated.

The basis for this is the target cycle entered for the operation (= speed at which the article is produced;

AUFTRAGS_BESTAND.SOLL_DAUER/SOLL_TEIL) as well as the input quantity of the supplied material

components (MLST_HY.SOLL_MENGE).

Time required for producing 1 piece =

 [s]

Time required for a material to be used = Timeperpcs =

Required quantity per hour for a material to be used =

Since  an  article  may  be  processed  at  different  target  cycle  times  in  different  orders/operations,  the

individual values are determined as an added up total.

When calculating the range of coverage, the OPs logged on to machines of levels running in parallel (P1,

P2) must also be considered. For this reason, the "Required quantity per hour for a material to be used"

must be identified for each of them, too.

Identification of initial stocks

The  initial  stock  is  the  current  material  stock  (LOS_BESTAND.RESTMENGE)  from  assigned  material

buffers  of  preceding  levels.  The  batches  with  "L"  and  "F"  status  (LOS_BESTAND.STATUS)  whose

residual quantity is > 0 are considered.

MPL-RMV_81.docx

Version: 1.0.18468

Page 12 of 26

1000_./_.teilsollabdauersollabUOMsmengesollhymlstteilsollabdauersollab_._1000_./_.UOMsmTimePerItes][3600

  Ranges of Coverage and Material Availability (MOC)

Identification of materials produced on machines of preceding levels

For  materials  produced

in

the  preceding

level,

the  speed  at  which

the  current  operations

(AUFTRAG_STATUS.PROD_KENN  =  'L')  produce  the  materials  on  machines  of  preceding  levels

(AUFTRAGS_BESTAND.ARTIKEL) is calculated.

Time required for producing 1 piece = Timeperpcs =

 [s]

Quantity produced per hour =

Calculation of range of coverage

The  range  of  coverage  of  each  material  [in  hours]  is  determined  from  the  ratio  of  the  values  described

above:

Range

of

coverage

[h]

=

+ producing OPs   (range of coverage increases)

- consuming OPs of current level (range of coverage decreases)

- consuming OPs of level(s) running in parallel (range of coverage decreases even more)

If  the  option  "Incl.  materials  which  are  (currently)  only  supplied/produced"  is  set,  not  only  the  machines

used  in  the  current  production  level  but  also  the  materials  only  produced  in  the  preceding  level,  are

identified. For these, however, only the stock, but not the range of coverage will be calculated.

Number of retrieving machines

Number  of  retrieving  machines  (i.e.  of  the  production  level  to  be  considered)  currently  using  this  article

(based on component list of active order).

Number of retrieving machines (i.e. of the production level to be considered) currently in PRODUCTION

(STOER_TABELLE.PROD_KENN = 'P'') and using this article (based on component list of active order).

Number of retrieving machines from other production levels

Number of retrieving machines in production levels which, in relation to preceding levels, are downstream

and which currently use the articles (based on component list of active order) also used on machines of

the current production level.

Number of supplying machines

Number of supplying machines (i.e. of the preceding levels) currently producing these articles.

MPL-RMV_81.docx

Version: 1.0.18468

Page 13 of 26

1000_./_.teilsollabdauersollabUOMsmTimePerItes][3600....)(0.3600)2(0.3600)1(0.3600._ANRnmTimePerIteANRTimPerItemANRmTimePerIteRESTMENGEBESTANDLOS

  Ranges of Coverage and Material Availability (MOC)

Number  of  supplying  machines  (i.e.  of  the  preceding  levels)  currently  producing  these  articles  and  in

PRODUCTION.

MPL-RMV_81.docx

Version: 1.0.18468

Page 14 of 26

  Ranges of Coverage and Material Availability (MOC)

4  Production Levels

1.1  Summary

Menu

Master data  Material  Production Levels

Transaction code

plev

Function authorization

plev

Utilization

The function is used to create or modify  production  levels within the system and to assign machines or

material buffers for each production level.

Integration

The creation of production levels allows for machines and material buffers, which may be used in different

evaluations/reports e.g. in the estimation of the range of coverage, to be summarized individually.

The application "production levels" is divided into two areas:

  Production levels and their editing functions

A production level may be selected, added or edited in this dialog.

  Assignment functions and their relevant editing functions

This screen shows the machines and material buffers assigned to the selected production level.

Further machines and material buffers are also added or edited.

Selection criteria

The application provides the following selection criteria:

Production level

The production level may be selected or entered.

Material buffer

The material buffer can be selected or entered.

Machine

The machine may be selected or entered.

Field descriptions "production levels"

Production level

The production level may be selected or entered.

MPL-RMV_81.docx

Version: 1.0.18468

Page 15 of 26

  Ranges of Coverage and Material Availability (MOC)

Description

Designation of the production level

Editing functions

The following dialog opens to edit a data record:

 Add

Inserts a new production level

 Edit

Edits an existing production level

  Delete

Deletes the selected or several selected production levels

"Production levels assignment" detail application

The "assignment" detail application shows the below-mentioned data for each production level:

Category, type

These assignments are possible:

  Machine

  Material buffer

Name

Subject to the assignment, this field shows the machine number or the material buffer.

Description

Comment field / text field

Company

Abbreviated company name

Cost center

Affected cost center

Site / company

Affected site

Editor

Last editor of the data record

MPL-RMV_81.docx

Version: 1.0.18468

Page 16 of 26

  Ranges of Coverage and Material Availability (MOC)

Last modification

Last modification to the data record.

The documentation dealing with the assignment of production levels describes the editing details for the

selected production levels and, as a result, the detail application "assignment".

MPL-RMV_81.docx

Version: 1.0.18468

Page 17 of 26

  Ranges of Coverage and Material Availability (MOC)

5  Assignment of Production Levels

Overview

Menu

Master data  Material  Production levels  Assignment

Transaction code

asplev

Function authorization

asplev

Usage

This function is used to create or modify the assignment of production levels in the system.

Integration

Forming production levels  enables an individual summary of machines and  material  buffers that can be

used in various evaluations, e.g. in the analysis of the range of coverage.

Requirement

The production levels must be defined in the system.

Selection criteria

The following selection criteria are available in the application:

Production level

Selection or input of the production level

Material buffer

Selection or input of the material buffer

Machine

Selection or input of the machine

Editing functions

The following dialog opens to edit a data record:

Add

Adds a new assignment.

Delete

Deletes the selected or several selected assignments.

MPL-RMV_81.docx

Version: 1.0.18468

Page 18 of 26

  Ranges of Coverage and Material Availability (MOC)

Field descriptions "production levels - assignment"

Once the editing dialog is opened, the below-mentioned fields are available:

Production level

If a production level is selected, only this one will be displayed. Wildcard characters may be used in

this selection option.

Type

Machine: A machine is assigned to the production level.

Material buffer: A material buffer is assigned to the production level.

Machine

Machine which is to be assigned to the production level.

If one or several machines with similar name (input of wildcard characters) is/are selected, the

display of production levels that might be selected is restricted to the production levels that this

machine is assigned to.

Material buffer

Material buffer that is to be assigned to the production level.

If  one  or  several  material  buffers  with  similar  name  (input  of  wildcard  characters)  is/are  selected,

the display of production levels that might be selected is restricted to the production levels that this

material buffer is assigned to.

MPL-RMV_81.docx

Version: 1.0.18468

Page 19 of 26

  Ranges of Coverage and Material Availability (MOC)

6  Closed Loops / Supply Relationships

Summary

Menu

Master data Material Supply relationships

Transaction code

Function authorization

intsc

intsc

Usage

By forming closed loops/supply relationships, the successor and predecessor levels of defined production

levels can be defined. One production level can have several successor and predecessor levels.

Integration

The  closed  loops/supply  relationships  are  used  in  the  evaluation  of  ranges  as  well  as  in  the  e-kanban

process as base data.

Requirement

The production levels must already be created in the system.

Selection criteria

The following selection criteria are available in the application:

Preceding level/supply - production level

Displays all supply relationships with the selected production level

Preceding level/supply - description

Displays all supply relationships with the selected description

Subsequent level/consumption  - production level

Displays all supply relationships with the selected production level

Subsequent level/consumption - description

Displays all supply relationships with the selected description

The user authorization "kov" is required for displaying the below-mentioned fields.

Material number

Shows all closed loops/supply relationships matching the entered material number.

MPL-RMV_81.docx

Version: 1.0.18468

Page 20 of 26

  Ranges of Coverage and Material Availability (MOC)

Closed loop/supply relationship ID

Shows the closed loop/supply relationship matching the entered ID that is unique within the system.

Field descriptions

"General" index tab:

Preceding level/supply

Selected preceding level/supply of a closed loop

If e-kanban is in use the preceding level/supply (place of production) represents the starting point of

the closed loop for a kanban object. The supply is chosen from the production levels created in the

system.

In  case  the  supply  is  a  supermarket,  warehouse  or  intermediate  production  buffer,  it  has  to  be

created as material buffer within MES and is chosen from the production levels (the material buffers

are assigned to).

If e-kanban is in use, it is not possible to directly assign a machine group as the supply

or a relevant material buffer for an entire machine group. But in fact the same material

buffer is entered as common material buffer of the entire machine group for all affected

machines pertaining to a machine group. This common material buffer is then selected

as the supply.

Subsequent level/consumption of the closed loop

Selected subsequent level/consumption of a closed loop.

If e-kanban is in use the consumption represents the end point (place of consumption) of the closed

loop for a kanban object. The consumption is chosen from a production level created in the system.

In case the consumption is a supermarket or intermediate production buffer, it has to be created

as material buffer within MES and is chosen from the production levels (the material buffers are

assigned to).

If  e-kanban  is  in  use,  it  is  not  possible  to  directly  assign  a  machine  group  as  the

consumption  or  a  relevant  material  buffer  for  an  entire  machine  group.  But  in  fact  a

common material buffer (supplying the whole machine group) is entered or selected as

preceding machine buffer for all affected machines pertaining to a machine group.

The user authorization "kov" is required for displaying the below-mentioned fields.

Material number

Material  number  of  the  kanban  article  for  which  the  closed  loop  applies.  Several  closed  loops  (n

entries) can be defined for a material.

MPL-RMV_81.docx

Version: 1.0.18468

Page 21 of 26

  Ranges of Coverage and Material Availability (MOC)

Closed loop/supply relationship ID

Uniquely  identifies  the  closed  loop/supply  relationship.  A  supply  relationship  can  only  be  created

once within the system.

"Kanban" index tab:

Number of KBN in circulation

Total number of all kanban objects circulating within this closed loop.

Minimum stock level of empty kanbans (start "yellow" zone)

The  minimum  stock  level  of  empty  kanbans  represents  the  upper  stock  limit  of  empty  kanban

containers  that  may  reached  before,  for  example,  production  (replenishment)  is  triggered

automatically  and  a  changeable,  planned  kanban  order  is  generated  initially.  Hence,  the  minimum

stock  level  of  empty  kanbans  represents  the  limit  between  the  "green"  and  "yellow"  zone  (status

lights at the terminal). The minimum stock level needs to be configured for the display in:

  Graphic Machinery (MOC)

  Shop Floor Scheduling (MOC)

  Electronic Kanban Board (AIP)

Maximum stock level of empty kanbans (start "red“ zone)

The  maximum  stock  level  of  empty  kanbans  represents  the  lower  stock  limit  of  empty  kanban

containers  that  may  be  reached.  If  this  limit  is  exceeded,  the  planned  kanban  order,  for  example,

automatically  becomes  an  unchangeable,  fixed  kanban  order.  Hence,  the  maximum  stock  level  of

empty  kanbans  represents  the  limit  between  the  "yellow"  and  "red"  zone  (status  lights  at  the

terminal). The maximum stock level needs to be configured for the display in:

  Graphic Machinery (MOC)

  Shop Floor Scheduling (MOC)

  Electronic Kanban Board (AIP)

Planned KBN quantity

Planned, defined quantity of kanban objects (contents).

MPL-RMV_81.docx

Version: 1.0.18468

Page 22 of 26

  Ranges of Coverage and Material Availability (MOC)

7  Range of Coverage Analysis and Material Availability

Overview

Menu

Material  management    Inventory  management    Estimation  of  range  of
coverage

Transaction code

roc

Function authorization

roc

Usage

This  function  analyzes  the  range  of  coverage  of  the  material  transferred  between  two  consecutive

production levels (preceding level and subsequent level).

For generating the list, materials are considered which are



currently produced in the preceding level

  used as components in the subsequent level

For each material, the number of supplying as well as retrieving machines is now indicated. By means of

option buttons, only the supplying or only the consuming machines can be considered.

The following criteria are relevant for the range of coverage:

  The consuming OPs and their target cycle result in a demand per unit of time.

  The supplying OPs and their target cycle result in a demand increase per unit of time.

The current stock of material buffers to be analyzed is considered as initial stock. In this regard, batches

currently logged on to consuming machines are also considered.

Integration

For the purpose  of  analyzing material coverage ranges and/or material availability, so-called production

levels are defined. In this process, various machines as well as material buffers from where the machines

of a specific production level may retrieve material are allocated to a specific production level.

In  addition,  the  supply  relationship  between  production  levels  is  shaped.  A  production  level  may  have

several  subsequent  and/or  preceding  levels.  In  this  supply  relationship,  a  minimum  coverage  range  is

defined.

MPL-RMV_81.docx

Version: 1.0.18468

Page 23 of 26

  Ranges of Coverage and Material Availability (MOC)

The range of coverage computation is requested for a production level considered as consuming in this

context. With regard to the analysis, all supply levels/production levels assigned to this level as preceding

levels are then considered. If these, in turn, are supply levels to other levels, the latter are also included

for the purpose of a holistic analysis.

Prerequisite

The production levels and supply relationships must exist in the system.

Selection criteria

Production levels

The range of coverage computation is requested for a production level considered as retrieving in

this context. With regard to the analysis, all supply levels/production levels assigned to this level as

preceding levels are then considered. If these, in turn, are supply levels to other levels, these other,

retrieving production levels are also included for the purpose of a holistic analysis.

Incl. materials (currently) only supplied/produced

This  option  allows  for  extending  the  analysis  to  also  include  materials  which  are  currently  only

supplied and/or only produced.

Display

The range of coverage is shown in hours in the screen. For a cyclical display, the data are updated every

180 seconds. The following data are displayed:

Material

The material corresponds to the materials in the component list in producing operations and to the

article ID in supplying operations, respectively.

Material designation

Material designation

Number of retrieving machines (total)

Machines within the supply relationships of the current production  level and with currently running

operations using this material.

In production

Machines within the supply relationships of the current production level and with currently running

operations using this material and operating in the Production status.

Number of supplying machines (total)

Machines within the supply relationships of the current production level and with currently running

operations producing this material.

MPL-RMV_81.docx

Version: 1.0.18468

Page 24 of 26

  Ranges of Coverage and Material Availability (MOC)

In production

Machines within the supply relationships of the current production level and with currently running

operations producing this material and operating in the Production status.

Range of coverage

The range of coverage in [HH:MM:SS] is computed as follows:

In the first step for each operation and material component, the quantity per hour is computed. The

basis for this is the target cycle entered for the operation (= speed at which the article is produced),

as well as the input quantity of the included material components.

Since an article may be processed at different target cycle times in different orders/operations, the

individual values are added up.

The basis for computing the range of coverage of a material is the remaining quantity entered in the

batch stock (with material number). The batches considered are those in the material buffers of the

immediately  preceding  level  (acc.  to  configuration).  Only  batches  in  the  F  (free)  and  L  (running)

status are considered.

The range of coverage [in hours] is determined from the ratio of the values described above:

- Remaining quantity acc. to batch stock

- Required quantity per hour.

For  materials  which  are  indicated  in  the  list  (because  they  are  currently  produced  on  a  supplying

machine), but which are not retrieved (because no retrieving order/operation is active), the range of

coverage is not computed.

For  materials  which  are  more  rapidly  produced  than  consumed,  the  range  of  coverage  is  also

infinite.

In these cases, the "infinite" symbol is displayed in the "Trend" column.

Trend

In addition, the trend of the range of coverage (change in comparison to previous state) is indicated

in front of each bar by an appropriate symbol.

- increasing

- decreasing

- unchanged

- infinite

∞







On the first data request, the "unchanged" symbol is displayed.

In  the  range  of  coverage  analysis,  the

  function  can  be  used  to  switch  to  the  "Stock  overview"  in

order to display the stock overview of the previously selected material there.

MPL-RMV_81.docx

Version: 1.0.18468

Page 25 of 26

  Ranges of Coverage and Material Availability (MOC)

Each of the materials (batches) and material components must be defined in the same quantity

unit; there is no internal quantity conversion.

MPL-RMV_81.docx

Version: 1.0.18468

Page 26 of 26

