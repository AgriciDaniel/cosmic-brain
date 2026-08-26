Formel Management

1  Formula Management

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

MOC_FormulaAdministration.docx

Version: 1.8.23255

Page 1 of 11

Integration

The formula management function is used by different components within the system. These components

Formel Management

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

MOC_FormulaAdministration.docx

Version: 1.8.23255

Page 2 of 11

Formel Management

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

MOC_FormulaAdministration.docx

Version: 1.8.23255

Page 3 of 11

Functions, operators and absolute terms to be used in formulas and

conditions

You can use the following operators and expressions to formulate conditions:

Formel Management

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

MOC_FormulaAdministration.docx

Version: 1.8.23255

Page 4 of 11

Formel Management

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

MOC_FormulaAdministration.docx

Version: 1.8.23255

Page 5 of 11

Formel Management

x & y

x ^ y

x | y

The  bitwise  AND  operator  compares  every  bit  of  the  first  operand  with  the
corresponding bit of the second operand. If both bits are 1 the bit is set to 1 in
the resulting value. Otherwise, the bit is set to 0 in the resulting value.

The bitwise Exclusive-OR operator compares each bit of the first operand with
the corresponding bit of the second operand. If one bit is 0 and the other bit is 1
the bit is set to 1 in the resulting value. Otherwise, the bit in the resulting value
is set to 0.

The bitwise Inclusive-OR operator compares each bit of the first operand with
the corresponding bit of the second operand. If one bit is 1 the bit is set to 1 in
the resulting value. Otherwise, the bit is set to 0 in the resulting value.

Constants

pi

e

3.141592654

2.718281828

MOC_FormulaAdministration.docx

Version: 1.8.23255

Page 6 of 11

Formel Management

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

MOC_FormulaAdministration.docx

Version: 1.8.23255

Page 7 of 11

Deployment in the BDE (only relevant if HYDRA is in use)

Formulas can be used to calculate the following values (provided that they are not collected explicitly):

Formel Management

- Waiting time
- Setup time
- Processing time
- Inspection time
-  Teardown/retooling
time
- Target cycle

The target cycle has been designed to monitor machines based on cycles in the
machine data collection (HYDRA-MDE).

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

Inspection time

ANR.BEARBZ

ANR.PZ

MOC_FormulaAdministration.docx

Version: 1.8.23255

Page 8 of 11

Formel Management

Target values at the operation

Teardown/retooling time

Delivery time

Transport time

Delivery time (external production)

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

Scrap: tertiary quantity unit

ANR.EGR:AUST

MOC_FormulaAdministration.docx

Version: 1.8.23255

Page 9 of 11

Formel Management

Actual values at the operation (OP status)

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

MOC_FormulaAdministration.docx

Version: 1.8.23255

Page 10 of 11

Formel Management

Deployment of MDE (only relevant if HYDRA is in use)

Different  KPIs  are  also  available  in  the  MDE  in  the  different  evaluations.  Refer  to  the  corresponding

documentation for the application to find out how the standard key figure is calculated and the name of the

formula. The acronyms listed below are available for the following KPIs:

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

The following acronyms are available to define specific calculations. In the formula, use the acronym before

"="; the acronym behind "=" is the service acronym used in the calculation (e.g. in the OEE report).

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

MOC_FormulaAdministration.docx

Version: 1.8.23255

Page 11 of 11

