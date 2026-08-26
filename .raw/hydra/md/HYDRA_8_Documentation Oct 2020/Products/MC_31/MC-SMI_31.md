Manual

MES-Cockpit Services
Manufacturing for 5 individual
KPIs
MC-SMI 3.1

Version 1.0.23281

Last changed on: 17.09.2020

MES-Cockpit Services Manufacturing for 5 individual KPIs

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

MC-SMI_31.docx

Version: 1.0.23281

Page 2 of 20

MES-Cockpit Services Manufacturing for 5 individual KPIs

Contents

1  MES-Cockpit Services Manufacturing for 5 individual KPIs ......................... 4

2  Formula Management .................................................................................. 5

3  Basic KPIs .................................................................................................. 17

3.1  Object "workplaces" .......................................................................................... 17

3.2  Object "order" .................................................................................................... 18

3.3  Object "operation" ............................................................................................. 19

MC-SMI_31.docx

Version: 1.0.23281

Page 3 of 20

MES-Cockpit Services Manufacturing for 5 individual KPIs

1  MES-Cockpit Services Manufacturing for 5 individual KPIs

Purpose

You  can  use  the  function  package  "MES-Cockpit  Services  Manufacturing  for  5  individual  KPIs"  of  the

MES-Cockpit to change existing KPIs or to create new KPIs that are displayed on the MES-Cockpit. You

define the KPIs in the formula management of the administration client. You can use any basic KPI that is

available (see below).

MC-SMI_31.docx

Version: 1.0.23281

Page 4 of 20

MES-Cockpit Services Manufacturing for 5 individual KPIs

2  Formula Management

Overview

HYDRA menu

System administration --> System administration --> Formula management

FEDRA menu

System administration --> System administration --> Formula management

Transaction code

foma

Function authorization  mdfoma

Purpose

Formulas  are  defined  for  different  purposes  within  the  formula  management  function,  e.g.  to  convert

quantities into alternative units or even to determine process times.

MC-SMI_31.docx

Version: 1.0.23281

Page 5 of 20

MES-Cockpit Services Manufacturing for 5 individual KPIs

Integration

The formula management function is used by different components within the system. These components

are, among others:



  MES Link & Enabling (MLE): to calculate default values and/or to determine conditions

  Material & Production Logistics (MPL): Conversion of quantities

into other quantity units

  Shop Floor Data Collection (BDE): To calculate

the processing time

  Shop Floor Data Collection (BDE): to convert quantities into other quantity units

  Selection criteria

The application provides the following selection criteria:

formula

Formula name

Type

Restricts the formula types

Field descriptions

formula

Formula

Unique within the context, e.g. 0001

Type

Type of formula to differentiate logically:

1

2

3

7

8

Quantity conversion

Determination of process time

Determination of remaining run time

Formulas to restrict composition

Formulas for the composition scrap rate

50

MLE (MES Link&Enabling) conditions

999

User-defined

60

61

Workplace formula (MES-Cockpit)

Order formula (MES-Cockpit)

key;

MC-SMI_31.docx

Version: 1.0.23281

Page 6 of 20

MES-Cockpit Services Manufacturing for 5 individual KPIs

62

63

Operation formula (MES-Cockpit)

General formulas (MES-Cockpit)

The selected type is decisive for the transfer of formulas and KPIs into MES-Cockpit. As formulas

are filtered based on the selected type.

Responsibility area

Assignment of a responsibility area

CommentDesignation or description of the formula

Editable

This value is set for the formulas delivered by MPDV; formulas that are configured with "editable =

N" can neither be changed nor deleted.

MC-SMI_31.docx

Version: 1.0.23281

Page 7 of 20

MES-Cockpit Services Manufacturing for 5 individual KPIs

Functions, operators and absolute terms to be used in formulas and

conditions

You can use the following operators and expressions to formulate conditions:

Functions

abs(x)

atan(x)

cosh(x)

float(x)

sqrt(x)

acos(x)

Calculates the absolute value

Calculates the arc tangent

Calculates the hyperbolic cosine

Converts the value into a floating point number

Calculates the square root

Calculates the arc cosine

atan2(y,x)

Calculates the arc tangent of y/x

exp(x)

log(x)

sin(x)

tan(x)

asin(x)

cos(x)

int(x)

log10(x)

round(x)

Calculates the exponential value

Calculates the logarithm

Calculates the sine

Calculates the tangent

Calculates the arc sine

Calculates the cosine

Converts the value into an integer

Calculates the logarithm

Rounds to integer value

round(x,y)

Rounds the value x to y decimal places

sinh(x)

tanh(x)

trunc(x)

trunc(x,y)

string(x)

Calculates the hyperbolic sine

Calculates the tangens hyperbolicus

Reduces the value x to an integer value

Reduces the value x to y decimal places

Converts the value into a character string

MC-SMI_31.docx

Version: 1.0.23281

Page 8 of 20

MES-Cockpit Services Manufacturing for 5 individual KPIs

The  AND  operator  returns  the  value  1  (true)  if  both  conditions  are  TRUE.
Otherwise, the value 0 (false) is returned.

The  OR  operator  returns  the  value  1  (true)  if  one  of  the  conditions  is  TRUE.
Otherwise, the value 0 (false) is returned.

The  comparison  operator  "like"  returns  the  value  1  (true)  if  the  first  operand
matches  the  pattern  of  the  second  operand.  Otherwise,  the  value  0  (false)  is
returned.The  pattern  may  include  the  following  placeholders:  "*"  -->  0  -n  any
characters
"?"--> exactly one (random) character





The logical negation operator "NOT" returns the value 0 (false) if the value is
unequal to 0 (true), and the value 1 (true) if the value is 0 (false).



Addition

Subtraction

Division

Multiplication

Calculates x to the power of y

The bitwise shift operators shift the first operand to the left (<<) or to the right
(>>) by the number of positions specified by the second operand.

























Returns 1 (true) if the value x is less than y, otherwise 0 (false)

Returns 1 (true) if the value x is less than or equal to y, otherwise 0 (false)

Returns 1 (true) if the value x is greater than y, otherwise 0 (false)

Returns 1 (true) if the value x is greater than or equal to y, otherwise 0 (false)

Returns 1 (true) if the value x is equal to y, otherwise 0 (false)

Returns 1 (true) if the value x is unequal to y, otherwise 0 (false)

Operators

x and y

x or y

x like y

!x

x + y

x – y

x / y

x * y

x ** y

x << y
x >> y

x < y

x <= y

x > y

x >= y

x == y

x != y

MC-SMI_31.docx

Version: 1.0.23281

Page 9 of 20

MES-Cockpit Services Manufacturing for 5 individual KPIs

x & y

x ^ y

x | y

The  bitwise  AND  operator  compares  every  bit  of  the  first  operand  with  the
corresponding bit of the second operand. If both bits are 1 the bit is set to 1 in
the resulting value. Otherwise, the bit is set to 0 in the resulting value.

The bitwise Exclusive-OR operator compares each bit of the first operand with
the corresponding bit of the second operand. If one bit is 0 and the other bit is
1  the  bit  is  set  to  1  in  the  resulting  value.  Otherwise,  the  bit  in  the  resulting
value is set to 0.

The bitwise Inclusive-OR operator compares each bit of the first operand with
the corresponding bit of the second operand. If one bit is 1 the bit is set to 1 in
the resulting value. Otherwise, the bit is set to 0 in the resulting value.

Constants

pi

e

3.141592654

2.718281828

MC-SMI_31.docx

Version: 1.0.23281

Page 10 of 20

MES-Cockpit Services Manufacturing for 5 individual KPIs

Distinctive features of the formula definition for the MES cockpit (applies

only when using HYDRA).

Formula definitions used for MES-Cockpit provide the following features:

  Linking formulas to each other

With the specification @(<Formula2>) a calculation can be based on an existing formula

definition

  Definition of conditions

Field contents can be checked by defining conditions. Example: if(w.cycle.target > 0, w.rpa11, 0)

  The  duration  posted  on  the  resource  performance  account  should  only  be  integrated  in  the

calculation if the target cycle is greater than 0.

MC-SMI_31.docx

Version: 1.0.23281

Page 11 of 20

MES-Cockpit Services Manufacturing for 5 individual KPIs

Deployment in the BDE (only relevant if HYDRA is in use)

Formulas can be used to calculate the following values (provided that they are not collected explicitly):

- Waiting time
- Setup time
- Processing time
- Inspection time
-  Teardown/retooling
time
- Target cycle

The  target  cycle  has  been  designed  to  monitor  machines  based  on  cycles  in
the machine data collection (HYDRA-MDE).

- Remaining run time  The remaining run time of an operation is calculated based on the formula that
is defined for the operation (tab durations > RRT formula).


The corresponding formula fields of the operation refer to the respective formulas defined in the formula

management  function.  In  addition  to  the  basic  arithmetic  operations,  it  can  be  referred  to  the  operation

fields listed below. These are fields that are defined as target values for the operation and fields that are

available as status information (actual values).

Target values at the operation

Target quantity: base quantity unit

ANR.SGR:GUTB

Target quantity: primary quantity unit

ANR.SGR:GUTP / ANR.SGR:GUT

Target quantity: secondary quantity unit

ANR.SGR:GUTS

Target quantity: tertiary quantity unit

ANR.SGR:GUTT

Target scrap: base quantity unit

ANR.SGR:AUSB

Target scrap: primary quantity unit

ANR.SGR:AUSP / ANR.SGR:AUS

Target scrap: secondary quantity unit

ANR.SGR:AUSS

Target scrap: tertiary quantity unit

ANR.SGR:AUST

Unit quantity

Target cycle

Partitioning

Factor

Waiting time

Setup time

ANR.EINHMENGE

ANR.SZY

ANR.TLG

ANR.IMPFAKT

ANR.WARTZ

ANR.RUEZ

Additional setup time (due to setup change)

ANR.RUEZ:ZUSCHL

Processing time

ANR.BEARBZ

MC-SMI_31.docx

Version: 1.0.23281

Page 12 of 20

MES-Cockpit Services Manufacturing for 5 individual KPIs

Target values at the operation

Inspection time

Teardown/retooling time

Delivery time

Transport time

Delivery time (external production)

ANR.PZ

ANR.ABRZ

ANR.LIEZ

ANR.TPZ

ANR.LIZ

Number of splits

ANR.ANZSPLIT

Default values 1 ... 10

ANR.VGW01 … ANR.VGW10

Actual values at the operation (OP status)

Resource performance account 1 - SUT

ANR.EGR:BMK01

Resource performance account 2 - DCI

ANR.EGR:BMK02

Resource performance account 3 - LCI

ANR.EGR:BMK03

Resource performance account 4 - SCI

ANR.EGR:BMK04

Resource performance account 5 - IMN

ANR.EGR:BMK05

Resource performance account 6 - IMS

ANR.EGR:BMK06

Resource performance account 7 - SET

ANR.EGR:BMK07

Resource performance account 8 - STA

ANR.EGR:BMK08

Resource performance account 9 - U8

ANR.EGR:BMK09

Resource performance account 10 - U9

ANR.EGR:BMK10

Resource performance account 11 - MUT

ANR.EGR:BMK11

Resource performance account 12 - BKS

ANR.EGR:BMK12

Yield: base quantity unit

ANR.EGR:GUTB

Yield: primary quantity unit

ANR.EGR:GUTP / ANR.EGR:GUT

Yield: secondary quantity unit

ANR.EGR:GUTS

Yield: tertiary quantity unit

Scrap: base quantity unit

ANR.EGR:GUTT

ANR.EGR:AUSB

Scrap: primary quantity unit

ANR.EGR:AUSP / ANR.EGR:AUS

Scrap: secondary quantity unit

ANR.EGR:AUSS

MC-SMI_31.docx

Version: 1.0.23281

Page 13 of 20

MES-Cockpit Services Manufacturing for 5 individual KPIs

Actual values at the operation (OP status)

Scrap: tertiary quantity unit

ANR.EGR:AUST

Rework quantity: base quantity unit

ANR.EGR:NCHB

Rework quantity: primary quantity unit

ANR.EGR:NCHP / ANR.EGR:NCH

Rework quantity: secondary quantity unit

ANR.EGR:NCHS

Rework quantity: tertiary quantity unit

ANR.EGR:NCHT

Problem quantity. base quantity unit

ANR.EGR:PRBB

Problem quantity: primary quantity unit

ANR.EGR:PRBP / ANR.EGR:PRB

Problem quantity: secondary quantity unit

ANR.EGR:PRBS

Problem quantity: tertiary quantity unit

ANR.EGR:PRBT

  Actual cycle

ANR.IZY

We  recommend  defining  the  formulas  in  a  template  to  allow  for  them  to  be  assigned

automatically (e.g. formula for remaining run time).



MC-SMI_31.docx

Version: 1.0.23281

Page 14 of 20

MES-Cockpit Services Manufacturing for 5 individual KPIs

Deployment of MDE (only relevant if HYDRA is in use)

Different  KPIs  are  also  available  in  the  MDE  in  the  different  evaluations.  Refer  to  the  corresponding

documentation for the application to find out how the  standard key figure is calculated and the name of

the formula. The acronyms listed below are available for the following KPIs:

  Availability (avail)

  Quality (qual)

  NEE (nee)

  Planned production time (op_ti)

  Machine runtime (mch_rt)

  Yield utilization (yie_ut)

  Actual utilization (act_ut)

  Utilization efficiency (rcu)

  Allocation efficiency (ocu)

  Techn. Efficiency (tec_ef)

  Quote (yie_ra)

  Scrap ratio (scr_ra)

The  following  acronyms  are  available  to  define  specific  calculations.  In  the  formula,  use  the  acronym

before "="; the acronym behind "=" is the service acronym used in the calculation (e.g. in the OEE report).

rpa1=efficiencyreport.rpa1
rpa2=efficiencyreport.rpa2
rpa3=efficiencyreport.rpa3
rpa4=efficiencyreport.rpa4
rpa5=efficiencyreport.rpa5
rpa6=efficiencyreport.rpa6
rpa7=efficiencyreport.rpa7
rpa8=efficiencyreport.rpa8
rpa9=efficiencyreport.rpa9
rpa10=efficiencyreport.rpa10
rpa11=efficiencyreport.rpa11
rpa12=efficiencyreport.rpa12
yield.primary=efficiencyreport.yield.primary
scrap.primary=efficiencyreport.scrap.primary
rework.primary=efficiencyreport.rework.primary
problem.primary=efficiencyreport.problem.primary
cycle_target_weighted=efficiencyreport.cycle_target_weighted
cycle_actual_weighted=efficiencyreport.cycle_actual_weighted
perf_rate_cycle_target=efficiencyreport.cycle_target_to_use
perf_rate_strokes=efficiencyreport.strokes_to_use
quality=efficiencyreport.quality
strokes=efficiencyreport.strokes
strokes.calc=efficiencyreport.strokes.calc
calculate_duration=efficiencyreport.calculate_duration
performance_rate  Place holder to ensure that the defined efficiency is always used. Available for the

KPI NEE and OEE.

MC-SMI_31.docx

Version: 1.0.23281

Page 15 of 20

MES-Cockpit Services Manufacturing for 5 individual KPIs

MC-SMI_31.docx

Version: 1.0.23281

Page 16 of 20

MES-Cockpit Services Manufacturing for 5 individual KPIs

3  Basic KPIs

The  following  basic  KPIs  are  available  for  the  single  objects  to  calculate  key  performance  indicators  in

MES-Cockpit  and  can  be  used  in  formulas.  The  basic  KPIs  are  exported  from  the  connected  HYDRA

systems for the objects "workplace" and "operation" for each shift.

3.1  Object "workplaces"

Service: BOResource.list

Field name in XML

Description

w.target_yield

Calculated target quantity of individual machines

w.oeee_arith

Calculated effectiveness of individual machines

w.cycle.target

Target cycle of machines

w.strokes.total

Recorded strokes of machines

w.partitioning

Machine partitioning

wm.pulse_factor.target

Pulse factor of the machine

w.rpaX

w.rpaX_count

Time posted onto individual resource performance accounts (RPA)

The  number  of  times  a  resource  performance  account  has  been
posted

w.status_X

Time posted onto single statuses

w.status_X_count

The number of times a status has been posted

w.yield.base

Yield in the base quantity unit

w.yield.primary

Yield in the primary quantity unit

w.yield.secondary

Yield in the secondary quantity unit

w.yield.tertiary

Yield in the tertiary quantity unit

w.scrap.base

Scrap in the base quantity unit

w.scrap.primary

Scrap in the primary quantity unit

w.scrap.tertiary

Scrap in the secondary quantity unit

w.scrap.secondary

Scrap in the tertiary quantity unit

w.problem.base

Open quantity in the base quantity unit

w.problem.primary

Open quantity in the primary quantity unit

MC-SMI_31.docx

Version: 1.0.23281

Page 17 of 20

MES-Cockpit Services Manufacturing for 5 individual KPIs

w.problem.secondary

Open quantity in the secondary quantity unit

w.problem.tertiary

Open quantity in the tertiary quantity unit

w.rework.base

Rework in the base quantity unit

w.rework.primary

Rework in the primary quantity unit

w.rework.secondary

Rework in the secondary quantity unit

w.rework.tertiary

Rework in the tertiary quantity unit

3.2  Object "order"

Service: BOOrder.overview

Field name in XML

Description

o.act.retension_period

Retention period of order

o.plan.yield.base

Planned yield in the base quantity unit

o.plan.yield.primary

Planned yield in the primary quantity unit

o.plan.yield.secondary

Planned yield in the secondary quantity unit

o.plan.yield.tertiary

Planned yield in the tertiary quantity unit

o.act.processing_time

Processing time of the order

o.no_recordable_op

Number of operations

o.no_finished_op

Number of operations not finished

o.act.occupancy_time

Occupancy time

o.plan.lead_time

Planned lead time

o.act.lead_time

Lead time

o.plan.total_setup_time

Planned setup time of the order

o.plan.processing_time

Planned processing time of the order

o.plan.execution_time

Planned lead time

o.act.standstill_period

Downtimes of the complete order

o.act.setup_time

Setup time of the complete order

o.act.wait_time

Wait time of the complete order

MC-SMI_31.docx

Version: 1.0.23281

Page 18 of 20

MES-Cockpit Services Manufacturing for 5 individual KPIs

o.act.yield.base

Yield in the base quantity unit

o.act.yield.primary

Yield in the primary quantity unit

o.act.yield.secondary

Yield in the secondary quantity unit

o.act.yield.tertiary

Yield in the tertiary quantity unit

o.plan.labor_utilization

Target personnel deployment of all active OPs that can be collected

o.act.labor_utilization

Personnel time incurred in production

o.act.problem.base

Open quantity in the base quantity unit

o.act.problem.primary

Open quantity in the primary quantity unit

o.act.problem.secondary

Open quantity in the secondary quantity unit

o.act.problem.tertiary

Open quantity in the tertiary quantity unit

o.act.rework.base

Rework in the base quantity unit

o.act.rework.primary

Rework in the primary quantity unit

o.act.rework.secondary

Rework in the secondary quantity unit

o.act.rework.tertiary

Rework in the tertiary quantity unit

o.act.scrap.base

Scrap in the base quantity unit

o.act.scrap.primary

Scrap in the primary quantity unit

o.act.scrap.secondary

Scrap in the secondary quantity unit

o.act.scrap.tertiary

Scrap in the tertiary quantity unit

o.act.rpaX

Sum  of  all  single  resource  performance  accounts  (RPA)  of  all  active
OPs that can be collected

3.3  Object "operation"

Service: BOOperation.list

Field name in XML

Description

opm.plan.yield.base

Planned yield in base quantity unit

opm.plan.yield.primary

Planned yield in primary quantity unit

opm.plan.yield.secondary

Planned yield in secondary quantity unit

opm.plan.yield.tertiary

Planned yield in tertiary quantity unit

MC-SMI_31.docx

Version: 1.0.23281

Page 19 of 20

MES-Cockpit Services Manufacturing for 5 individual KPIs

opm.processing_time

Planned processing time of the operation

op.rpaX

Shift-related  times  posted  on  the  single  resource  performance
accounts 1-12

op.yield.base

Shift-related yield recorded in base quantity unit

op.yield.primary

Shift-related yield recorded in primary quantity unit

op.yield.secondary

Shift-related yield recorded in secondary quantity unit

op.yield.tertiary

Shift-related yield recorded in tertiary quantity unit

op.scrap.base

Shift-related scrap recorded in base quantity unit

op.scrap.primary

Shift-related scrap recorded in primary quantity unit

op.scrap.secondary

Shift-related scrap recorded in secondary quantity unit

op.scrap.tertiary

Shift-related scrap recorded in tertiary quantity unit

op.rework.base

Shift-related rework quantity recorded in base quantity unit

op.rework.primary

Shift-related rework quantity recorded in primary quantity unit

op.rework.secondary

Shift-related rework quantity recorded in secondary quantity unit

op.rework.tertiary

Shift-related rework quantity recorded in tertiary quantity unit

op.problem.base

Shift-related open quantity recorded in base quantity unit

op.problem.primary

Shift-related open quantity recorded in primary quantity unit

op.problem.secondary

Shift-related open quantity recorded in secondary quantity unit

op.problem.tertiary

Shift-related open quantity recorded in tertiary quantity unit

op.labor_utilization

Shift-related personnel times

op.scrap.reason_$X$

Shift-related scrap quantity for each scrap reason

op.scrap.reason_$X$_count

Shift-related number of scrap reasons occurred

MC-SMI_31.docx

Version: 1.0.23281

Page 20 of 20

