Manual

Process Data Management
PDV-PDM 8.3

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

PDV-PDM_83.docx

Version: 1.0.23049

Page 2 of 34

Process Data Management

Contents

1  Overview: Process Data Management......................................................... 4

2  Logical channels .......................................................................................... 5

3  PDV Characteristics Master Data .............................................................. 10

4  Summary .................................................................................................... 20

4.1  General notes on the document ........................................................................ 20

5  Groups ....................................................................................................... 21

5.1  Starting the function .......................................................................................... 21

5.2  Default Application Layout ................................................................................. 22

5.3  Toolbar .............................................................................................................. 22

5.4  Selection parameters ........................................................................................ 24

5.5

"Groups" Detail Application ............................................................................... 24

6  Article ......................................................................................................... 25

6.1  Function call ...................................................................................................... 25

6.2  Default Application Layout ................................................................................. 26

6.3  Toolbar .............................................................................................................. 26

6.4  Selection parameters ........................................................................................ 28

6.5  Detail aplication “Article” .................................................................................... 28

7  PDV Specification List ................................................................................ 31

PDV-PDM_83.docx

Version: 1.0.23049

Page 3 of 34

Process Data Management

1

 Overview: Process Data Management

Overview

Purpose

This  product  includes  the  graphic  user  interface  to  define  master  data  for  the  Process  Data  Collection.

The service  to store the collected measured  values is also included.  You can  implement a collection of

TAG-based machine collection processes in the Process Data Collection.

To  control  the  processing  of  measured  values  in  the  applications,  you  require  the  product  PDV-VRP

"Processing rules for process data".

Integration

This  function  package  requires  a  machine  interface  for  data  collection  in  the  Process  Communication

Controller (PCC).

Features

This  product  provides  a  great  number  of  configuration  functions  to  create  and  edit  master  data  for

process values.

  Configuration of logical channels to collect process values

  Definition of input and output channels

  Extensive  functions  to  create  and  edit  machine  and  article-related  monitoring  parameters  for

process values (lower/upper action limits, lower/upper tolerance limits,...)

  List to manage specific monitoring parameters for specific machines, articles and tools

  Collection of TAGs to identify measured values. Optimized storage of related measured  values.

The  machine  is  used  to  specify  interrelationships  between  TAGs  irrespective  of  the  time  of

collection. The interrelationships are saved with the identification TAGs.

  Service to index the measured values according to the defined identification TAGs.

PDV-PDM_83.docx

Version: 1.0.23049

Page 4 of 34

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

restarted or after the cyclical start of the configuration monitor service (e.g. in certain situations such as

target value modifications).

Integration

The  logical  channels  are  used  to  assign  process  parameters  or  PDV  events  to  a  machine-shop  floor

server combination.

PDV-PDM_83.docx

Version: 1.0.23049

Page 5 of 34

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

PDV-PDM_83.docx

Version: 1.0.23049

Page 6 of 34

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

PDV-PDM_83.docx

Version: 1.0.23049

Page 7 of 34

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

PDV-PDM_83.docx

Version: 1.0.23049

Page 8 of 34

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

PDV-PDM_83.docx

Version: 1.0.23049

Page 9 of 34

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

PDV-PDM_83.docx

Version: 1.0.23049

Page 10 of 34

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

PDV-PDM_83.docx

Version: 1.0.23049

Page 11 of 34

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

PDV-PDM_83.docx

Version: 1.0.23049

Page 12 of 34

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

PDV-PDM_83.docx

Version: 1.0.23049

Page 13 of 34

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

PDV-PDM_83.docx

Version: 1.0.23049

Page 14 of 34

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

PDV-PDM_83.docx

Version: 1.0.23049

Page 15 of 34

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

PDV-PDM_83.docx

Version: 1.0.23049

Page 16 of 34

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

PDV-PDM_83.docx

Version: 1.0.23049

Page 17 of 34

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

If constant numeric values are used in  formulas, you must be careful not to use thousand separators. If

these  constants  are  floating  point  numbers,  be  careful  to  use  a  dot  as  decimal  separator  instead  of  a

comma.

The following syntax [A:B:C]. applies for the variables that identify the single or default values of the

process parameters involved.The available values are listed below.

PDV-PDM_83.docx

Version: 1.0.23049

Page 18 of 34

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

PDV-PDM_83.docx

Version: 1.0.23049

Page 19 of 34

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

4  Summary

4.1  General notes on the document

This  document  describes  the  “Groups“,  e.g.  article  groups,  application  of  the  Manufacturing  Operation

Center (MOC). For general information on how to use MOC, please refer to the “moc_cc.pdf“ document.

PDV-PDM_83.docx

Version: 1.0.23049

Page 20 of 34

Process Data Management

5  Groups

The  group  catalogs  have  been  designed  to  create  and  edit  groups  for  the  different  applications.  The

created groups may be assigned to master data of the corresponding  application. Consequently, article

groups may be created, for example, and assigned to the articles. In this case, it is also possible to create

inspection plans on the basis of article groups.

Basically, the creation of groups is also reasonable for failure mode analyses.

5.1  Starting the function

Menu

Transaction code

Function authorization

Master data  Quality management  Article groups
Master data  Process data processing  Article groups
Master data  Quality management  Measure groups
Master data  Quality management  Failure type groups
Master data  Quality management  Failure location groups
Master data  Quality management  Failure cause groups
Master data  Quality management  Causer groups
Master data  Quality management  Cost type groups

atcgr  Article groups
measgr  Measure groups
ftypgr  Failure type groups
flocgr  Failure location groups
fcaus  Failure cause groups
origr  Causer groups
costgr  Cost type groups

atcgr - Article groups
measgr.*  Measure groups
ftypgr.*  Failure type groups
flocgr.*  Failure location groups
fcaugr.*  Failure cause groups
origr.*  Causer groups
costgr.*  Cost type groups

PDV-PDM_83.docx

Version: 1.0.23049

Page 21 of 34

5.2  Default Application Layout

Process Data Management

This figure of the article group catalog is exemplary for all groups.

5.3  Toolbar

The  toolbar  contains  the  function  calls  that  are  available  for  this  application  and  possibly  links  to  other

applications.  The  functions  placed  on  the  “general”  tab  of  the  toolbar  refer  to  all  detail  applications.  In

addition  to  the  standard  functions  such  as  “help”,  “request  data”,  “save  application  settings”  and  “print

preview”, the other tabs include specific functions that are tailored to the corresponding detail application.

The individual functions of the application are listed in the paragraphs that follow.

"Data" category

  Request data

The  information  to  be  displayed  within  the  application  is  requested  according  to  the  entered

selection  criteria.  This  process  might  take  some  time  depending  on  the  data  set  from  which  the

system filters data and on the selection result to be transferred and displayed.

PDV-PDM_83.docx

Version: 1.0.23049

Page 22 of 34

Process Data Management

  Cancel

This function cancels the query sent by clicking the “request data“ button.

 Print

preview

The  print  preview  is  opened  for  the  selected  detail  application.  The  print  preview  also  includes

further options to change the resulting printout and functions for exporting the displayed information

into other formats, such as PDF, Excel, image files.

  Save

The  application  design  configured  by  the  user,  e.g.  columns  and  categories  displayed  as  well  as

their respective size and display locations, etc. are only saved if the user requests it. In this case,

the user has to affirm the confirmation prompt by clicking “Yes”.

"Functions" category

There are no special functions for this detail application. Groups are created, changed and deleted using

the context menu of the right mouse button within the tree structure view.

"Help" category

   Help on operation

Clicking  this  button  opens  the  help  file  describing  how  to  operate  MOC.  The  basic  document  is

entitled “moc-cc.pdf”. It describes how to use MOC in general and applies for all applications.

    Help on application

This  function  opens  the  manual  that  describes  the  application  from  which  the  help  function  was

requested.  The  application  manual  integrates  the  application  function  into  the  MES  context  and

explains the information to be displayed. The documentation also includes all detailed applications.

   Help on detail application

This function opens the application manual at the section where the respective detailed application

is described.

PDV-PDM_83.docx

Version: 1.0.23049

Page 23 of 34

Process Data Management

5.4  Selection parameters

There are no selection parameters. A specific group can be found by using the “fast selection” function.

To use the “fast selection” function just open the group tree structure on the 1st level, select the first entry

and enter the first letter of the group in question. Consequently, the first group starting with this letter that

is found is selected. The "fast selection" function also integrates subordinate groups that are not opened.

If the requested term is included in a group that is not opened, it will be opened automatically.

5.5  "Groups" Detail Application

A  group  may  be  created,  changed  or  deleted  by  opening  the  context  menu  of  the  right  mouse  button

within the display area of the tree structure.

It is altogether possible to define groups up to the fifth hierarchy level. The “add root group” function has

to be selected  in the context menu of the group tree  to create a  new main group (1st level). The menu

entry "add group" generates a sub-group (level 2 to 5). A designation, which is directly entered in the list

view, has to be assigned for this new group. To be able to save the new group, click above or below this

new  entry  within  the  group  tree.  Then  a  confirmation  prompt  appears  asking  whether  or  not  the  new

group is to be saved. Provided that this question is affirmed ("yes"), the entry is saved. The same applies

for renaming of groups. Regardless of which hierarchy level is concerned, the entry has to be selected to

be able to edit the  group designation. Changes can  directly be  entered  in the corresponding line of the

tree  view.  Click  above  or  below  the  entry  to  be  changed  to  be  able  to  save  the  modification.  No

confirmation prompt appears when it comes to renaming.

An  entry  is  also  deleted  by  selecting  a  group  entry  and  executing  the  "delete  group"  function.  Only  the

group that is at the bottom of the group tree can be deleted.

The “expand all” context menu entry opens all groups up to the lowest hierarchy level. The “collapse all”

context menu option closes all entries up to the first level.

PDV-PDM_83.docx

Version: 1.0.23049

Page 24 of 34

The  "delete  selection"  function  cannot  be  used  in  the  maintenance  of  groups  dialog.  This  function  is

enabled,  for  example,  in  the  maintenance  of  articles  application  if  an  article  group  is  selected  and  this

selection is to be removed/deleted.

Process Data Management

6  Article

This document describes the “article” application of the Manufacturing Operation Center (MOC). General

information on how to use MOC can be found in the document entitled “moc_cc.pdf“.

The article catalog has been designed to edit/keep articles. Article data is a global catalog that is used in

many CAQ modules and in PDV (Process Data Collection). Provided that there is an interface to a higher-

level  system  (e.g.  ERP  system),  articles  may  be  created  automatically  via  this  interface.  As  soon  as  a

new article is created or changed, e.g. in the ERP system, the article data record is automatically created

or changed in the HYDRA-CAQ article catalog based on the defined information.

6.1  Function call

Menu

Master data  Quality management  Article

Master data  Process data processing  Article

Transaction code

atc

Function authorization

atc

Available user fields

Location

Object type/user field key

Source (type)

Table and detail view

ATK/SYSTEM

MF-D

How can I configure user fields?

Which user field types are available?

PDV-PDM_83.docx

Version: 1.0.23049

Page 25 of 34

6.2  Default Application Layout

Process Data Management

6.3  Toolbar

The  toolbar  provides  the  different  functions  available  for  this  application  and  possibly  links  to  other

applications.  The  functions  included  in  the  “general”  tab  of  the  toolbar  are  available  in  all  detail

applications. In addition to the standard functions, such as help, request data, save application settings,

and print preview, the other tabs also include specific functions that are specially tailored to the respective

detail application. The following sections describe the individual application functions.

Category Data

Request data

The  information  to  be  displayed  within  the  application  is  requested  on  the  basis  of  the  entered

selection  criteria.  This  process  might  take  some  time  depending  on  the  dataset  from  which  the

system filters data and on the selection result to be transferred and displayed.

  Cancel

The query sent by clicking the “request data” button can be canceled using this function.

PDV-PDM_83.docx

Version: 1.0.23049

Page 26 of 34

Process Data Management

 Print preview

The  print  preview  is  opened  for  the  selected  detail  application.  The  print  preview  also  includes

further options to change the resulting printout and functions for exporting the displayed information

into other formats, such as PDF, Excel, image files.

  Save

The  application  design  configured  by  the  user,  e.g.  columns  and  categories  displayed  as  well  as

their respective size and display locations, etc. are only saved if the user requests it. In this case,

the user has to affirm the confirmation prompt by clicking “Yes”.

Category Functions

   Add

Adds a new article.

  Copy

Copies the selected article.

   Edit

Edits an already existing article

   Delete

Deletes the selected or several selected articles.

Category Help

   Help on operation

Clicking  this  button  opens  the  help  file  describing  how  to  operate  MOC.  The  basic  document  is

entitled “moc_cc.pdf”. It describes how to use MOC in general and applies for all applications.

  Help on application

This  function  opens  the  manual  for  the  respective  application  from  which  the  help  file  was

requested.  The  application  manual  integrates  the  application  function  into  the  MES  context  and

explains the information to be displayed. The documentation also includes all detailed applications.

PDV-PDM_83.docx

Version: 1.0.23049

Page 27 of 34

Process Data Management

   Help on detail application

This function opens the application manual at the section where the relevant detailed application is

described.

6.4  Selection parameters

The application provides the following selection criteria:

Tab "General"

  Article no.:

Article number

  Drawing issue number:

Drawing issue number of the article, often also referred to as index

  Designation:

Article name



Inactive:

Inactive, active articles. The checkbox is not enabled by default.

  Customer article no.:

Customer article number

  Article model:

Article model

Tab “Groups“

  Group:

The  article  group  tree  can  be  opened  using  the
There is a function to accept and cancel the activity.

  button  if  an  article  group  is  to  be  filtered.

6.5  Detail aplication “Article”

The article number as well as the drawing issue number uniquely identify articles in all areas of HYDRA-

CAQ referring to the article catalog. The drawing issue number, also referred to as article index, may be

very important, in particular, for inspection planning and when inspection orders are generated. Thus, it is,

for example, possible to create an inspection plan for the article 12938 with the drawing issue numbers A

and  B.  Different  inspection  specifications  apply  for  each  drawing  issue  no.  Unless  the  drawing  issue

number is indicated and thus may be part of the inspection plan, the system that generates the inspection

requirements, must deliver this drawing issue number.

PDV-PDM_83.docx

Version: 1.0.23049

Page 28 of 34

Process Data Management

The fields “article no.” and “drawing issue number” fields are key fields, i.e. when a new article is saved, it

is first checked whether an article with this key information already exists.

By  distinguishing between  active and inactive articles, it may  be  defined  whether or not the  articles are

available  in  certain  selection  lists.  Thus,  no  inspection  plan  can  be  created  for  an  inactive  article.

However,  inactive  articles  may  be  evaluated  at  any  time.  Moreover,  inactive  articles  can  also  be

reactivated at any time.

Furthermore, an article can be defined as being subject to documentation. In addition the dialog provides

the fields customer article number, article model, article ABC, drawing number as well as the possibility to

assign units. To assign units (dimensions), the catalog of units is used.

If you want to make evaluations on article groups or if you use family inspection plans, it is mandatory to

assign  the  respective  group.  To  assign  groups,  open  the  group  tree  using  the  lens  icon.  Using  the

hierarchic  tree  entries  the  required  group  can  be  selected  in  the  group  tree  and  accepted  by  double

clicking.

PDV-PDM_83.docx

Version: 1.0.23049

Page 29 of 34

Process Data Management

The  assigned  group  including  the  hierarchical  group  structure  then  appears  in  the  “groups”  field  of  the

editing dialog of articles.

When articles are displayed in a list, the group hierarchy is represented by the columns “group 1 to group

5”.

Groups  are  maintained  in  the  “article  groups”  application  and  is  described  in  the  document  entitled

“MOC_Groups.pdf“.

PDV-PDM_83.docx

Version: 1.0.23049

Page 30 of 34

Process Data Management

7  PDV Specification List

Overview

Menu

Master data  Process data processing  PDV specification list

Transaction code

sclp

Function authorization

sclp

Purpose

The  specification  list  has  been  designed  to  create  specifications,  e.g.  within  the  framework  of  family

inspection planning.

Set  the  option  “from  list”  in  the  relevant  inspection  plan  characteristics  to  use  the  specifications  of  the

specification list when generating inspection steps with inspection  step characteristics. In this case, only

active entries of the specification list are used. The application uses the following key fields to search for

a specification list entry, when generating an inspection step.

  Area

  Machine no.

  Article number

  Resource number

  Characteristic no.

  Operation number and operation designation (name)

You can configure the order for searching the specification list while customizing the system.

The specification list does not replace inspection planning. It rather is a supplement to family inspection

plans.

Integration

This  function  is  a  fundamental  component  of  family/group  inspection  planning.  The  specification  list

defines  the  inspection  specifications  that  vary  with  each  item/article  in  the  article  group  of  a  group

inspection plan.

The function is largely identical to the CAQ specification list. With the exception that in  the PDV module

you can only select "article-related PDV inspection planning" as available area.

PDV-PDM_83.docx

Version: 1.0.23049

Page 31 of 34

Process Data Management

Requirements

An  inspection  plan  for  the  article  group  including  corresponding  characteristics  referring  to  the

specification  list  has  to  exist  in  order  to  use  the  specification  list  (configure  the  option  "from  list"  in  the

inspection plan characteristics).

Please note that sample-related reports/evaluations are not available for process characteristics

whose limit values are controlled via specification lists.

Selection criteria

The application provides the following selection criteria:

Area

Shows  the  available  CAQ  areas.  The  PDV  module  only  supports  the  "article-related  PDV

inspection planning".

Specification no.

Unique specification number.

Version no.

Unique version within the specification. Only active, provided that you have activated the version

control function in the system settings.

Active

You can filter by active or inactive entries.

Article number

Article number of the specification list entry.  You can  select the  article  number from the catalog

for article master data.

Article name/designation

Name of the article.

Operation

Operation number.

Workplace

PDV-PDM_83.docx

Version: 1.0.23049

Page 32 of 34

Process Data Management

Workstation, e.g. machine.

Characteristic no.

Characteristic number.

Characteristic designation/name

Characteristic designation/name

If you select multiple selection criteria, the specification list shows the matching results.

Field descriptions

Characteristic key tab

"Characteristic" group

Area

Specifies the area for which the specification list entry is to apply.

Specification no.

Number of the specification.

Version no.

Version number of the specification.

Active

Checkbox. Shows whether the entry is active or inactive.

Workplace

Indicates the workplace. If you enter a workstation (e.g. machine) you can check articles/items with

respect to this workplace. This might be useful if you use machines of different types.

Machine name

  Designation/name of the workplace/machine.

Resource

  You can enter a resource (e.g. tool).

Designation (name)

Name of the resource.

Characteristic no.

Unique number of the characteristic.

Characteristic designation/name

Name of the selected characteristic number.

PDV-PDM_83.docx

Version: 1.0.23049

Page 33 of 34

Process Data Management

Operation

Number of the operation.

Operation designation/name

Designation/name of the operation.

Article number

Article number for this specification list entry.

Article name/designation

Designation/name of the selected article number.

Drawing issue number

Drawing issue number of the selected article number.

Specifications tabs and other tabs

The remaining index tabs are described in the characteristics definition master data application.

Toolbar

The below-mentioned additional functions are available besides the standard functions.

  Activate

Function authorization: sclp.active

Click  this  button  to  activate  a  specification  list  entry.  This  function  automatically  disables  a

previously released version.

 Deactivate

Function authorization: sclp.release

Click this button to deactivate a specification list entry. The specification list entry is no longer used.

PDV-PDM_83.docx

Version: 1.0.23049

Page 34 of 34

