Manual

Process Data Management
PDV-PDM 8.2

Version 1.0.23049

Last changed on: 02.09.2020

Process Data Management

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

PDV-PDM_82.docx

Version: 1.0.23049

Page 2 of 25

Process Data Management

Contents

1  Overview: Process Data Management......................................................... 4

2  Logical channels .......................................................................................... 6

3  PDV Characteristics Master Data .............................................................. 11

4  PDV Events ................................................................................................ 22

5

ID Tracing (tabular) .................................................................................... 24

PDV-PDM_82.docx

Version: 1.0.23049

Page 3 of 25

Process Data Management

1

 Overview: Process Data Management

Overview

Purpose

This function package includes the user interface to define master data for Process Data Collection. The

function  package  also  contains  the  service  for  storing  collected  measured  values  and  for  generating

samples for statistical process data reports. Process Data Collection can be set up to collect TAG-based

entry  processes  for  specific  machines.  This,  among  other  things,  is  a  requirement  for  ID  tracing  (PDV-

PTR).

The  PDV-VRP  function  package  "Processing  rules  for  process  data"  is  required  to  control  measured

values processed by applications.

Integration

This  function  package  requires  a  machine  interface  for  data  collection  in  the  HYDRA  Process

Communication Controller (PCC).

Features

Extensive configuration functions to create and edit master data for process values

  Configuration of logical channels to collect process values

  Definition of input and output channels

  Extensive  functions  to  create  and  edit  machine  and  article-related  monitoring  parameters  for

process values (lower/ upper action limits, lower/ upper tolerance limits ...)

  Functions for setting parameters for statistical sampling functions and sample generation

  List to manage specific monitoring parameters depending on certain machines, articles and tools

  List defining binary process events

  Sample  generation  at  specified  sampling  intervals.  Intervals  are  specified  when  defining

collection rules for characteristics

  Based on these rules, the service generates sample data available for advanced sample reports

PDV-PDM_82.docx

Version: 1.0.23049

Page 4 of 25

Process Data Management

  Collection  of  text  tags  to  identify  measured  values.  Optimized  storage  of  related  measured

values. The machines specify their relation and save it in the identification tags irrespective of the

collection time.

  Service indexing measured values according to the defined identification tags

PDV-PDM_82.docx

Version: 1.0.23049

Page 5 of 25

Process Data Management

2  Logical channels

Overview

Menu

Master data  Process data processing  Logical channels

Transaction code

lgchcnf

Function authorization

lgchcnf.*

The logical channels form the central point where logical configurations, physical machines and shop floor

servers (terminal type PCC) come together.

Purpose

You must configure the logical channels in order to assign the process parameters/PDV events:

- to machines

- to shop floor servers (PCC)

- to physical channel numbers.

The logical channels define which technical channel is used on a terminal to record the characteristics.

Logical channels specify the "channel mapping".

You can also use this configuration to specify the physical channels in more detail, for example:

- you can specify how data is collected

- you can define outputs e.g. for alerts or

- you can define target values.

As of PDV 8.2, you can also configure the channels for the recording of TAGs (e.g. serial number, etc.).

This way, you can connect the measured values to an alphanumeric TAG and you can perform analyses

based on TAGs in defined evaluations.

Logical channels are versioned master data. For each data record, a validity period is therefore specified

(exact to the second). Only in the period specified, the data record is valid for the system.

Note:  A modification of the channel configuration is not passed on  to the terminal,  i.e. the new channel

configuration  is  made  available  to  the  terminal  only  after  the  terminal/  shop  floor  components  are

restarted or after the cyclical start of the  configuration monitor service (e.g. in certain situations such as

target value modifications).

Integration

The  logical  channels  are  used  to  assign  process  parameters  or  PDV  events  to  a  machine-shop  floor

server combination.

PDV-PDM_82.docx

Version: 1.0.23049

Page 6 of 25

Process Data Management

Selection criteria

The application provides the following selection criteria:

"General" tab

Channel

Selection of channel number

Designation

Selection of channel designation including wildcard function and search screen.

Channel type

Selection of channel type using selection box

Data class of the channel

Selection of data class using selection box

"Assignment" tab

Machine

Selection of machines including wildcard function and search screen

PCC terminal

A selection of terminal/shop floor server is possible. A search screen may also be used.

"Activation/alert" tab

Active

Selection of active channels only

Alert

Selection of logical channels with enabled option Alert

Valid from-to

Start and end time including date and time to specify the validity period

Alert channel

Selection of the logical channels where the respective alert channel is stored.

Field descriptions

Tab "General"

Channel

Channel number on the machine. This number must be unique for the PCC terminals. Only values

between 1 and 9999 are permitted.

Designation

Optional, logical designation of the logical channel

PDV-PDM_82.docx

Version: 1.0.23049

Page 7 of 25

Process Data Management

Channel type

Includes the reference to the data that is collected via the channel. This can either be a configured

PDV event (E) or a process parameter (PP, corresponds to the decimal value or the alphanumeric

tag) of a characteristic.

Data class of the channel

For channels of type PP, the data class of the channel defines which value of a process parameter

is collected using the channel. The values supported are:

  MV: Measured value/ alphanumeric tag

  TV: Target value

  UTL: Upper tolerance limit

  UPAL: Upper process action limit

  LPAL: Lower process action limit

  LTL: Lower tolerance limit

If a target value or a tolerance or process action limit is passed via a channel, it must be

guaranteed  that  a  time  span  of  at  least  30  minutes  is  respected  between  two  value

changes of a channel.

Data type (available as of PDV 8.2)

Data type that is recorded via the channel. The following three options are available:

  Decimal

  Alphanumeric

  Tag (alphanumeric)

The  data  types  decimal  and  alphanumeric  are  used  for  the  typical  process  parameters.  The  tag

values  recorded  are  available  as  selection  criteria  in  the  selection  criteria  based  on  tags.  These

values can be selected.

The permitted characters for the data types are defined as follows:

  Decimal: Numeric decimal values

  Tag (alphanumeric): 0-9 a-z A-Z äöüÄÖÜ _-+#;.,

Note:

The recording of tags is limited to 50 characters. If the data source transfers a tag with more than

50 characters (alphanumeric), the shop floor client cuts off the values after 50 characters.

PDV-PDM_82.docx

Version: 1.0.23049

Page 8 of 25

Process Data Management

Tab "Assignment"

Machine

Assignment of the machine

PCC terminal

Assignment of the PCC terminal

Process parameter

Assignment  of  a  process  parameter  if  the  channel  type  is  defined  for  the  collection  of  a  process

parameter.

Event

Assignment of a defined event if the channel type is defined for the collection of an event.

Tab "Properties"

Input type

The input type of the channel is used to define how the shop floor server is to access the machine

data.  The  control  parameters  are  used  for  the  collection  of  process  values  and  of  events  (see

parameter type). The values supported are:

  A: Automatic (if supported by driver)

  T: Trigger controlled

  C: Cyclic

Cycle time

If the channel is controlled using a cycle time, this field contains the number of seconds after which

the values are queried.

Trigger

If  the  channel  is  controlled  via  trigger  channel,  the  channel  number  of  the  trigger  is  stored  in  this

field. Only values between 1 and 9999 are permitted.

Direction

Direction  of  data  flow  for  the  channel.  Values  can  be  transmitted  from  the  machine  to  the  data

collection  (input,  column  value  I).  This  is  the  direction  normally  used  to  record  machine  data.  In

addition,  the  data  direction  can  be  configured  from  the  data  collection  to  the  machine  (output,

column  value  O)  to  overwrite  a  value  depending  on  the  selected  data  class  of  the  channel.  For

example, setting a new target value for the connected machine.

Tab "Activation/alert"

Active

The  logical  channel  is  switched  to  the  active  status  here.  In  data  collection,  only  active  and  valid

channels are used. The activation or deactivation of a channel is only valid after the restart of the

respective shop floor components.

PDV-PDM_82.docx

Version: 1.0.23049

Page 9 of 25

Process Data Management

Valid from-to

Validity period during which the channel is used for data collection.

Alert

This option specifies  if a configured alert channel  is  activated (output signal for setting a  physical

signal).  The  activation  or  deactivation  of  a  channel  is  only  valid  after  the  restart  of  the  respective

shop floor components.

Alert channel

This  option  specifies  the  physical  channel  number  where  an  output  signal  is  set  when  an  alert

condition is fulfilled. Depending on the channel type, the alert can be triggered by a PDV event or a

limit violation of a process parameter. Only values between 1 and 999 are permitted.

Configuration of an alert channel

In order to activate an output signal in case of a limit value violation  of a process parameter, an output

channel of the type "Process parameter" must be created.

The following settings are made in the dialog "Insert logical channel".

  For the channel number, you configure a ''virtual channel' with any value (between 1 and 9999).

However, this number must be unique. This channel number is used to manage the combination

"Alert channel – data class of the channel".

  You use the "Data class of the channel" to define the limit value violation that triggers the alert.

  You must also specify the process parameter that is monitored.

  Activate "Output" as direction.

  Enable the options "Channel active" and "Alert active".

  The  alert  channel  must match  the  physical  channel  where  an  output  signal  is  set  in  case  of  an

alert condition.

For a detailed description of individual input fields, refer to section "Field description".

Checking Business Parameter Containers (BSCs)

See here for further information on checking the system with respect to business parameters.

PDV-PDM_82.docx

Version: 1.0.23049

Page 10 of 25

Process Data Management

3  PDV Characteristics Master Data

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

PDV-PDM_82.docx

Version: 1.0.23049

Page 11 of 25

Process Data Management

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

PDV-PDM_82.docx

Version: 1.0.23049

Page 12 of 25

Process Data Management

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

PDV-PDM_82.docx

Version: 1.0.23049

Page 13 of 25

Process Data Management

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

PDV-PDM_82.docx

Version: 1.0.23049

Page 14 of 25

Process Data Management

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

PDV-PDM_82.docx

Version: 1.0.23049

Page 15 of 25

Process Data Management

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

PDV-PDM_82.docx

Version: 1.0.23049

Page 16 of 25

Process Data Management

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

PDV-PDM_82.docx

Version: 1.0.23049

Page 17 of 25

Process Data Management

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

PDV-PDM_82.docx

Version: 1.0.23049

Page 18 of 25

Process Data Management

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

PDV-PDM_82.docx

Version: 1.0.23049

Page 19 of 25

Process Data Management

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

PDV-PDM_82.docx

Version: 1.0.23049

Page 20 of 25

Process Data Management

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

PDV-PDM_82.docx

Version: 1.0.23049

Page 21 of 25

Process Data Management

4  PDV Events

Summary

Menu

Master Data  Process Data Processing  Events

Transaction code

peve

Function authorization

peve

Utilization

With  PDV  events,  various  events  that  can  occur  on  the  machine  can  be  configured  and  collected.  In

addition,  the  configured  PDV  events  can  be  identified  as  an  alarm,  which  can  create  an  appropriate

output signal if it occurs on the machine.

The assignment of the PDV events to a physical channel on a machine is performed by configuring the

logical  channels.  A  log,  or  the  time-related  documentation  of  the  events  that  occur,  can  be  carried  out

using the protocol dialog described in the "Process events" application.

PLEASE NOTE!

To do this, in the configuration of the logical channels both the type (E) and the related control must be

correctly parameterized.

Selection parameters

The following selection criteria are available in the respective application:

Event ID

Option to search for an event identification with a wildcard function.

Designation

Option to search for an event designation with a wildcard function.

Field description

The PDV event configuration contains the following information:

Event ID

Unique identification of the configured event

Designation

Optional parameter with which a designation can be assigned to an event configuration

Alert

Identifier as to whether or not the event is to trigger an alarm (physical signal) when it occurs

PDV-PDM_82.docx

Version: 1.0.23049

Page 22 of 25

Process Data Management

Alert duration

Delay  time  specifying  how  long  after  the  event  has  occurred,  the  alert  is  to  remain  at  the  alarm

channel. The unit is entered in seconds.

Event type

Declaration of the event type: entered as event (F) or as hint (H). If no type is defined, the default

type (P) will be entered.

Event category

Category  to  classify  events  (also  referred  to  as  malfunctions)  and  notes  e.g.  in  the  evaluation  of

process events.

PDV-PDM_82.docx

Version: 1.0.23049

Page 23 of 25

Process Data Management

5

ID Tracing (tabular)

Overview

Menu

Quality management  Process analysis  ID tracing

Transaction code

cidt

Function authorization

cidt

This  document  describes  the  application  "ID  Tracing  (tabular)”  in  the  Manufacturing  Operation  Center

(MOC).

Usage

ID Tracing enables the tabular presentation and analysis of process values that can be selected referring

to  search  keys  (IDs).  Search  keys  are  identification  tags  provided  by  the  machine.  They  are  used  to

identify measurement tuples instead of or in addition to the machine and time stamps of data collected in

the database.

Integration

Measured  values  must  be  collected  and  saved  based  on  IDs  in  order  to  use  this  function.  For  this

purpose, at least one channel with the data type "tag" must be defined in the application "PDV  - logical

channels" and data collection must be configured accordingly.

Selection parameters

IDs can be selected in the selection panel. The following selection criteria are available in the application:

Tag type:

Identifies the key field. The name of the ID tag.

Tag ID

Search value of the selected ID tag.

Workplace

Number of the workplace as an additional search field. Is required, if the same tags are available at

different machines/workplaces.

Time range from - to:

The data selected by the tag value is restricted temporally.

Consider the last time range of the tag value only

If this function is enabled the data selected is restricted to last time range recorded for the selected

tag value.

PDV-PDM_82.docx

Version: 1.0.23049

Page 24 of 25

Process Data Management

Field descriptions

This tabular report shows the process characteristics recorded and saved  in the database including the

following information:

Characteristic

Technical name of the characteristic or the entered process parameter

Designation

Defined characteristic name

Machine

Defined machine

Process parameters

Defined process parameter

Target value

The target value defined for this recorded process parameter at that specific point in time

UTL

The upper tolerance limit defined for this recorded process parameter at that specific point in time

UPAL

The upper process action limit defined for this recorded process parameter at that specific point in

time

LTL

The lower tolerance limit defined for this recorded process parameter at that specific point in time

LPAL

The lower process action limit defined for this recorded process parameter at that specific point in

time

Unit

Unit of the recorded characteristic

Measured value

Measured value recorded for the characteristic at the time of measurement

Time of measurement

Time of measurement of the characteristic

PDV-PDM_82.docx

Version: 1.0.23049

Page 25 of 25

