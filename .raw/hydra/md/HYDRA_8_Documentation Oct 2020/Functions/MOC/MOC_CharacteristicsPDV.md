PDV Characteristics Master Data

1  PDV Characteristics Master Data

Overview

Menu

Master data  Process data processing  PDV characteristics master data

Transaction code

chrp

Function authorization

chrq.*

You use the catalog of characteristics to predefine characteristics that are then used in collection rules. It

aims  at  persons  involved  in  data  collection  planning.  The  characteristics  catalog  is  one  of  the  most

important basic catalogs. You need the characteristics catalog to create collection rules. As this catalog is

used to predefine characteristics data for collection rules, it includes extensive input options.

MOC_CharacteristicsPDV.docx

Version: 1.5.21705

Page 1 of 11

PDV Characteristics Master Data

Purpose

The  characteristics  catalog  is  one  of  the  most  important  basic  catalogs.  You  need  the  characteristics

catalog  to  create  collection  rules.  As  this  catalog  is  used  to  predefine  characteristics  data  for  collection

rules, it includes extensive input options.  Only enter data in the characteristics catalog that need not be

changed when later assigned to a collection rule.  Do not define limit values, for example. This is normally

not  useful  because  the  limit  values  are  only  known  when  the  collection  rule  is  created.  Only  when  you

create  and  assign  a  collection  rule,  a  relation  to  a  concrete  article  or  machine  is  established.  Note  this

and  you  will  know  what  kind  of  information  you  should  predefine.  For  example,  it  must  be  carefully

considered  whether  the  characteristic  "outer  diameter"  is  only  created  once  and  detailed  information  is

stored in the collection rule later on or whether several "outer diameter characteristics" are created, e. g.

with  specification  of  limit  values.  Usually,  it  is  an  advantage  to  store  a  small  number  of  general

characteristics. The required evaluations/reports also play a role in this context. If a new "outer diameter

characteristic" is created for almost every tolerance change, this characteristic is "valid" for one article or

machine only. In a subsequent failure analysis, a comprehensive evaluation is not possible in this case!

It is important that you can still change any definition stored in the catalog or add missing definitions when

you later plan the collection rule.

Important

The configurations made in the characteristics' master data need not be definitive for the collection rule.

The  characteristics'  master  data  is  used  as  a  template  when  the  collection  rules  are  later  created.  You

can complete and change all configurations of the characteristics' master data in the collection rule.

Integration

The  characteristics'  master  data  is  used  as  a  template  when  the  collection  rules  are  later  created.  The

field  Process  parameter  provides  a  logical  connection  to  the  logical  channels.  The  connection  is  only

established when the characteristics are definitively defined in the collection rules.

Selection criteria

The application provides the following selection criteria:

  Characteristic no.:

Characteristic number

  Designation:

Name of the characteristic

  Process parameter:

Process parameter

MOC_CharacteristicsPDV.docx

Version: 1.5.21705

Page 2 of 11

PDV Characteristics Master Data

If  several  selection  criteria  are  used,  the  overlapping  results  are  displayed  below  in  the  Characteristics

master data.

Field descriptions

Find below a description of the columns and input options for characteristics:

Tab Characteristics

Characteristic no.

Unique number of the characteristic

Characteristic designation

Name of the characteristic

Process parameter

Predefinition of the process parameter

Formula

See section "Formula calculation" below.

Tab Specifications

Select the Specifications tab to enter the sampling scheme and the tolerance limits. Note: As mentioned

above,  it  is  only  reasonable  to  define  tolerance  limits  in  the  characteristics  master  data  under  certain

circumstances.

Sampling scheme (no longer relevant as of PDV 8.3)

The following sampling schemes are available:

  None

  Piece-related

With a piece-related sampling scheme, you can define the interval. All single values collected in this

interval are then combined and form one sample. If  you define a  piece-related sampling scheme,

you can make evaluations for samples, for example control charts.

Interval value (no longer relevant as of PDV 8.3)

Interval  used

to  combine

the  single  values  collected

in

this

interval

to  a  sample.

Display of failures in the Failure Mode Analysis (PDV 8.1 and PDV 8.2)

To display the created failures in the Failure Mode Analysis, you must specify an interval value.

Process parameters without specified interval value are not integrated in the Failure Mode

Analysis.

MOC_CharacteristicsPDV.docx

Version: 1.5.21705

Page 3 of 11

PDV Characteristics Master Data

Field visibility

The field is only visible and input is only possible if the user is assigned the function

authorization "InspectionInterval".

Unit

Pieces, meter, kg, etc. Units are assigned using the unit catalog.

Decimal places (no longer relevant as of PDV 8.1)

Enter  the  decimal  places.  Leading  zeros  before  the  comma  are  not  displayed  in  the  specification

fields. By default, the number of decimal places defined in the system settings is pre-assigned.

Size (measure type)

Validation and tolerance limits can be entered as absolute, relative or percentage values. Note: You

must enter relative or percentage limits as negative values.

Upper PL

Specifies the upper process limit. In PDV, this value  also defines the  displayed upper red area  in

process visualization.

Upper TL

Specifies the upper tolerance limit (upper specification limit)

Target value

Specifies the target value

Lower TL

Specifies the lower tolerance limit (lower specification limit)

Lower PL

Specifies  the  lower  process  limit.  In  PDV,  this  value  also  defines  the  displayed  lower  red  area  in

process visualization.

Upper TL – Generate failure / Lower TL

If the checkboxes Generate failure are enabled, a violation of the limit value automatically results (in

the background) in the generation of a failure with failure type "limit value violation" (AUTO:TG> or

AUTO:TG<)  when  measured  values  are  collected.  The  generated  failures  are  evaluated  in  the

Failure Mode Analysis, for example.

Specifications process

Upper PAL

Upper process action limit

MOC_CharacteristicsPDV.docx

Version: 1.5.21705

Page 4 of 11

PDV Characteristics Master Data

Lower PAL

Lower process action limit

Generate failure

If the checkboxes Generate failure are enabled, a violation of the limit value automatically results (in

the background) in the generation of a failure with failure type "limit value violation" (AUTO:PEG> or

AUTO:PEG<)  when  measured  values  are  collected.  The  generated  failures  are  evaluated  in  the

Failure Mode Analysis, for example.

Storage (no longer relevant as of PDV 8.3)

Using  the  filter  functions  for  storage,  you  define  the  frequency  used  to  store  single  values.  This  value

affects  the  further  processing  of  measured  values  on  the  HYDRA  server.  In  later  evaluations,  only  the

actually stored values can be displayed. The storage frequency is also the basis for further aggregations

by  the  PDV  Distributor  calculating  samples.  Here,  the  PDV  Distributor  only  accesses  data  of  the  online

data set.

Example: The defined filter specifies that only one of ten measured values is saved. At the same time, a

sample interval specifies that 5 measured values are combined to one sample. After filtering, the storage

frequency  is the  basis for the calculation of samples. 5 measured values  are then actually combined to

one  sample.  Result:  For  50  measured  values,  which  have  actually  been  collected,  one  sample  is

generated.

Filter function:

Define  a  filter  function  for  the  collection  of  PDV  values.  The  following  four  filter  functions  are

available:  None,  Cyclic,  Frequency  and  Percentage.  Depending  on  the  selection  made,

different  input  fields  are  shown  below  the  combo  box.  Use  these  fields  to  parameterize  the  filter

function.

o  None

No filter, the system saves each collected value.

o  Frequency

Enter  a  number  of  measured  values.  This  means  that  the  system  only  saves  every  n

measured value. The system evaluates the measured values collected  in the meantime

but they are not saved.

o  Cyclic

Enter  a  time  interval  in  seconds.  This  means  that  the  system  only  saves  a  measured

value  every  n  seconds.  The  system  evaluates  the  measured  values  collected  in  the

meantime but they are not saved.

o  Percentage

Enter a time interval and a percentage. In the PDV data collection, the system saves the

MOC_CharacteristicsPDV.docx

Version: 1.5.21705

Page 5 of 11

PDV Characteristics Master Data

measured value every n seconds or if the absolute deviation of the current measurement

compared to the previous measurement exceeds the percentage entered here. The time

interval is reset when the measured value is saved because of the percentage deviation.

The  system  evaluates  the  measured  values  collected  in  the  meantime  but  they  are  not

saved.

Visualization

Visualization

Check this option to enable the online visualization for the process parameter.

Position

Use  this  integer  field  to  specify  the  visualization  position  of  the  process  parameter.  Use  this  for

graphics in the online visualization with more than one display element on one page. Example: If 16

display  elements  are  shown  on  one  page,  you  can  use  this  option  to  define  the  position  of  the

different process parameters.

If  the  value  0  or  less  is  specified,  the  process  parameter  is  not  visualized.  You  can  only  edit  the

input field after you have checked the option Visualize.

Visualization Filter function

Here, the same filter functions are available as for the storage, but you can use this second setting

to  decouple  the  storage  from  the  online  visualization.  For  example,  you  can  configure  that  each

measured value is stored, but only every tenth measured value is visualized.

The following four filter functions are available:  None, Cyclic, Frequency and Percentage.

Depending on the selection made, different input fields are shown below the combo box. Use these

fields to parameterize the filter function.

o  None

No filter, the system visualizes each collected value.

o  Frequency

Enter a number of measured values. This means that the system only visualizes every n

measured value.

o  Cyclic

Enter a time interval in seconds. This means that the system only visualizes a measured

value every n seconds.

o  Percentage

Enter a time interval and a percentage. In the PDV data collection, the system visualizes

a  measured  value  every  n  seconds  or  if  the  absolute  deviation  of  the  current

measurement  compared  to  the  previous  measurement  exceeds  the  percentage  entered

here.  The  time  interval  is  reset  when  the  measured  value  is  visualized  because  of  the

percentage deviation.

MOC_CharacteristicsPDV.docx

Version: 1.5.21705

Page 6 of 11

PDV Characteristics Master Data

Inspection – computation

Check characteristic (no longer relevant as of PDV 8.3)

You  can  use  this  option  to  define  whether  the  process  parameter  is  checked  against  limit  value

violations in the PDV data collection or whether the collected measured values only pass the data

collection to be stored.

This  field  also  affects  the  online  visualization.  You  can  only  display  characteristics  that  are

processed by the logic of the PDV data collection and are not only stored.

Formula parameters only

Use this option to define that the created process parameter is only used as parameter to calculate

a further process parameter. If you set this option for a process parameter, this process parameter

will  never  assess  measured  values  with  respect  to  violated  limit  values  and  these  process

parameters will never be stored in the database.

Compute limit values

If  you  enable  this  option,  the  fields  for  the  calculation  of  target  values  or  limits  are  activated.

Formula calculation, see section "Formula calculation"

Upper TL formula

You can use the formula for the calculation of the UTL to calculate a new UTL in combination with

other  parameters.  If  you  recalculate  the  UTL,  this  will  also  lead  to  changed  target  values.  See

section 3.5 for further information on formulas.

Upper PAL formula

You can  use the formula for the calculation of the UPAL to calculate a new UPAL in combination

with  other  parameters.  If  you  recalculate  the  UPAL,  this  will  also  lead  to  a  changed  target  value.

See section 3.5 for further information on formulas.

Target value formula

You  can  use  the  formula  for  the  calculation  of  the  target  value  to  calculate  a  new  target  value  in

combination  with  other  parameters.  If  you  recalculate  the  target  value,  this  will  also  lead  to  a

changed target value. See section 3.5 for further information on formulas.

Lower PAL formula

You  can  use  the  formula  for  the  calculation  of  the  LPAL  to  calculate  a  new  LPAL  in  combination

with  other  parameters.  If  you  recalculate  the  LPAL,  this  will  also  lead  to  a  changed  target  value.

See section 3.5 for further information on formulas.

Lower TL formula

You can use the formula for the calculation of the LTL to calculate a new LTL in combination with

other  parameters.  If  you  recalculate  the  LTL,  this  will  also  lead  to  a  changed  target  value.  See

section 3.5 for further information on formulas.

MOC_CharacteristicsPDV.docx

Version: 1.5.21705

Page 7 of 11

PDV Characteristics Master Data

Formula calculation

Using  the  formula  calculation  function,  you  can  calculate  the  measured  values  collected  via  machine

connection  before  you  evaluate  them.  For  example,  you  can  add  an  offset  to  the  calculation  of  a

characteristic,  you can directly convert units in the collection process or  you can perform calculations in

combination with other characteristics.

To store and display a formula, the user must have the function authorization iriscp.formula. If

the user is not authorized, the field is not displayed.

You specify the calculation of measured values in the application Characteristics in tab General. You can

also calculate the target values of an automatically collected characteristic and the upper/lower tolerance

or action limits.

Important: HYDRA versions below MES Weaver 2.0 with server systems AIX, HP-UNIX, SCO-UNIX or

DEC ALPHA do not provide this kind of formula calculation.

The first part of the formula specifies the level where the formula calculation is made. The following types

are available:

  V - Calculation on the level of single values without self-reference.

For  each  measured  value  of  the  characteristics  involved,  exactly  one  single  value  is

generated for the calculated characteristic.

  O - Calculation on the level of samples with self-reference.

Use this type of formula to refer to the value itself and to integrate limit or target value.

After the above identifier, the actual formula is specified. The following operators, functions and constants

are supported:

MOC_CharacteristicsPDV.docx

Version: 1.5.21705

Page 8 of 11

PDV Characteristics Master Data

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

Calculates the natural logarithm

Calculates the sine

Calculates the tangent

Calculates the arc sine

Calculates the cosine

Converts the value into an integer

Calculates the common logarithm

Rounds to integer value

round(x,y)

Rounds the value x to y decimal places

sinh(x)

tanh(x)

trunc(x)

trunc(x,y)

Operators

x + y

x – y

x / y

x * y

x ** y

Constants

pi

e

Calculates the hyperbolic sine

Calculates the hyperbolic tangent

Reduces the value x to an integer value

Reduces the value x to y decimal places

Addition

Subtraction

Division

Multiplication

Calculates x to the power of y

3.141592654

2.718281828

If constant numeric values are used in formulas, you must be careful not to use thousand separators. If

these  constants  are  floating  point  numbers,  be  careful  to  use  a  dot  as  decimal  separator  instead  of  a

comma.

The following syntax [A:B:C]. applies for the variables that identify the single or default values of the

process parameters involved.The available values are listed below.

MOC_CharacteristicsPDV.docx

Version: 1.5.21705

Page 9 of 11

PDV Characteristics Master Data

You can specify the following values for section A:

  X – single value/measured value

  UTL – Upper Tolerance Limit

  UPL – Upper Process Action Limit

  TV – Target Value

  LPL– Lower Process Action Limit

  LTL – Lower Tolerance Limit

Note: The value X defined for section A (single value/measured value) is only used for the calculation of

measured  values;  this  means,  the  value  is  not  used  in  the  target  value  formulas  or  formulas  of  the

upper/lower tolerance or action limits.

Note: Aggregate functions like MAX, MIN or AVG, which are used in HYDRA CAQ, are not supported with

automatically collected characteristics.

Section B describes how the relevant characteristic is identified. The following possibilities are available:

  SELF – self-reference

(This requires formula type O)

  PPARAM  –  Reference  to  further  process  parameters  of  the  same

machine

With  this  formula,  only  process  parameters  of  the  same  machine

can be calculated.

Section C identifies the characteristic using the field content specified in section B. This means: If a self-

reference is specified in section B, a section C may not exist. If instead a reference to a further process

parameter is stored for PPARAM, the process parameter must be specified in section C.

Example 1:

The process parameter always collects ten times the rounded value from the machine connection.

 Formula: O: round([X:SELF]) * 10

MOC_CharacteristicsPDV.docx

Version: 1.5.21705

Page 10 of 11

PDV Characteristics Master Data

Example 2:

The characteristic "area" results from the product of the process parameters LENGTH (LAENGE)

and WIDTH (BREITE). For each single value of the two source characteristics, a single value is

calculated for the characteristic "area".

 Formula: V: [X:PPARAM:LAENGE] * [X:PPARAM:BREITE]

Example 3:

The following formula is not stored for the measured value, but for the target value of the process

parameter "speed". The target value is calculated using the own target value plus the target value

of  process  parameter  DURCHMESSER  (diameter).  The  target  value  for  "speed"  is  therefore

recalculated, if the target value for "diameter" changes.

 Formula: O: [TV:SELF] + [TV:PPARAM:DURCHMESSER]

Note:

The formula calculation is performed directly after reception of the measured values from the PDV data

collection.  Changes  to  any  of  the  process  parameters  included  in  the  formula  are  then  used  as  events

that trigger recalculation.

MOC_CharacteristicsPDV.docx

Version: 1.5.21705

Page 11 of 11

