Characteristic Master Data

1  Characteristic Master Data

Overview

Menu

Master data  Quality management  Characteristics

Transaction code

chrq

Function authorization

chrq

Available user fields

Where?

Object type/user field key

Source (type)

Table and detail view

CMM/SYSTEM

QM

How to configure user fields?

Which user field types are available?

Purpose

The catalog of characteristics has been designed to define characteristics and, as a result, to predefine

characteristic data of inspection plans. For this reason, it aims at people involved in inspection planning.

MOC_CharacteristicsQM.docx

Version: 1.13.18468

Page 1 of 27

Characteristic Master Data

The  catalog  of  characteristics  is  one  of  the  most  important  basic  catalogs.  You  cannot  set  up  any

inspection plan  without this catalog.  As this catalogue is used to predefine characteristics for inspection

plans, it includes extensive input options. Basically, the catalog of characteristics should only include such

data, which will not have to be modified when the characteristics are assigned to the inspection plan later

on. For example, the definition of limit values is usually not reasonable as these values are only known

when an inspection plan is set up. Only when you assign data to an inspection plan, a relation between

data and article is established. Note this and you will know what kind of information you should predefine.

For example, it must be carefully considered  whether  the characteristic "outer diameter" is only created

once  and  detailed  information  is  stored  in  the  inspection  planning  later  on  or  whether  several  "outer

diameter characteristics" are created, e. g. with specification of limit values. Usually, it is an advantage to

store a restricted number of general characteristics. The required evaluations/reports also play  a role in

this  context.  If  a  new  "outer  diameter  characteristic"  is  created  for  almost  every  tolerance  change,  this

characteristic is "valid" for one article only. In a subsequent failure analysis, a comprehensive evaluation

is not possible in this case!

It  is  important  that  each  detail  defined  here  can  be  modified  in  the  inspection  planing  later  on  or  that

details, which have not been stated, can still be added.

The configurations made in the characteristics' master data are not final. The characteristics' master data

is  used  as  a  template  for  later  inspection  planning.  You  can  complete  and  modify  all  settings  of  the

characteristics' master data during inspection planning.

Integration

The catalog of characteristics is a global catalog that is used in many QM applications. Please find below

some possible fields of application that refer to the catalog of characteristics.





Inspection planning for production, goods receipt, goods issue, initial samples and calibration

Inspection requirements for production, goods receipt, goods issue, initial samples and calibration

  Failure analysis in complaint management

  Several reports/evaluations

Requirements

There are no special requirements.

Selection criteria

The application provides the following selection criteria:

MOC_CharacteristicsQM.docx

Version: 1.13.18468

Page 2 of 27

Characteristic Master Data

  Characteristic no.:

Number of the characteristic

  Characteristic designation:

Designation of the characteristic –  Note: You may use wildcards "*"

  Characteristic type:

Inspection type: attributive, inspection chart, variable

Tab Details

  Gage

Select a gage

  Gage designation:

Select a gage designation

Tab User fields



If user fields are created, they may be selected

If several selection criteria are used, overlapping results are displayed in the characteristics' master data.

In addition, the column filter allows for the content of each individual column to be filtered.

Field descriptions

The available fields are self-explanatory and are not explained separately, except for the address fields.

Tab Characteristics

Characteristic no.

Unique number of the characteristic

Characteristic designation/name

Designation of the characteristic

Input type

Automatic or manual data collection. This field controls the release of HYDRA-PDV fields (in case

of  automatic  collection).  If  the  automatic  collection  function  is  selected,  the  characteristic  type  is

restricted to the "variable" option.

MOC_CharacteristicsQM.docx

Version: 1.13.18468

Page 3 of 27

Characteristic Master Data

Characteristic type

This option specifies whether the collection of measured values (variable) or the identification of the

number  of  detected  failures  (attributive)  is  used  for  the  inspection.  If  you  select  the  attributive

inspection,  use  the  input  type  to  define  whether  the  collection  should  be  based  on  a  catalog  or

whether the standard collection is performed. Further characteristic types are the inspection chart

and the information characteristic. If you select the inspection chart, you can enable the input type

visual  defects recording. The  information characteristic is only  used to display  a document during

the  inspection  process.  Subject  to  the  input  type,  the  lower  area  of  the  dialog  provides  the

respective sampling schemes.

Visual  recording:  The  characteristic  document  (not  the  inspection  requirement  document)  is

displayed with the position 1. This must be type FILE. The system supports these formats: JPEG,

JPG, PNG. To divide a graphic in different areas, you must define the grid for the x-axis and the y-

axis

(e.g.

A,B,C,D,E)

The  catalog-based  collection  and  the  visual  defects  recording  are  only  available,  if  the

extension QMCharacteristicExtendedTyp is enabled. Both collection types are only available, if

the collection is performed at a specified inspection point.

Inspection result base

This  setting  defines  whether  all  samples  or  only  the  sample  recorded  last  is  used  to  identify  the

inspection result (pass/fail).

Mandatory inspection

If this option is activated, you must enter at least one measured value for this characteristic, before

you can complete an inspection order including this characteristic.

Formula:

See chapter Calculation of formulas.

To  display  this  field  in  the  inspection  plan  characteristics,  you  require  the  authorization

"iriscp.formula".

Tab Details

Group Gage

Gage

Defines whether a gage or gage group is to be assigend to the characteristic:

Assignment of the gage (or gage group) to be used.

You  can  also  use  resources  of  resource

type  "PRM"  of

the  resource  management.

To  display  this  field  in  the  inspection  plan  characteristics,  you  require  the  authorization

"iriscp.gage".

MOC_CharacteristicsQM.docx

Version: 1.13.18468

Page 4 of 27

Characteristic Master Data

Gage designation (name of test equipment)

Shows the name of the gage

Group Properties

Certificate printing

The  selected  option  defines  whether  this  characteristic  is  to  be  printed  (display  selection  or  print

always)  or  not  (print  never)  when  certificates  are  printed  at  a  later  stage  (e.g.  acceptance,

inspection  certificate).  If  you  select  the  option  "display  selection",  a  list  of  the  characteristics  with

this printing option set is displayed prior to printing. In the list, these characteristics are preselected

for  the  print  of  a  certificate.  However,  this  selection  may  be  removed.  Finally,  all  selected

characteristics  and  the  characteristics  with  the  "print  always"  option  are  included  in  the  certificate

print.  Characteristics  with  the  "print  always"  option  do  not  appear  in  a  selection  list,  as  they  are

printed in any case. Please note that this option only affects certificate forms.

Failure weighting

If the inspection result for the characteristic is "fail", you can classify the result here for information

purposes.

Group Inspect

Analyseauswahlkatalog

Here,  you  can  select  an  analysis  selection  catalog.  The  catalog  restricts  the  selection  of  possible

failures you can enter (failure types, failure location, etc.). (All available failures may still be entered,

if you directly enter their number).

Designation of analysis selection

Shows the designations of analysis selection catalogs

Tab Specifications

Once the "specifications" tab has been selected, the  sample scheme and constructional measures may

be entered. In this context, it has to be considered that (as already mentioned) the definition of tolerance

limits  in  the  master  data  of  characteristics  is  only  reasonable  if  certain  conditions  are  met.  The  same

applies to the definition or calculation of action and warning limits. This section explains the possibilities in

detail.

Group Sampling scheme

Sampling scheme

The following sampling schemes are available:

  100% inspection





k value inspection

lot inspection

MOC_CharacteristicsQM.docx

Version: 1.13.18468

Page 5 of 27

Characteristic Master Data

  n-c inspection

  SPC inspection

The  sampling  scheme  defines  the  inspection  procedure.  In  case  of  an  n-c  inspection  and

parameters 5-0, 5 pieces are checked and 0 failures may be detected.

Find a more detailed description in section Sampling schemes.

Sample size/expected sample size

Specification  of  the  sample  size  (number  of  samples)  or  the  expected  sample  size  depending  on

the sampling scheme, see section Sampling schemes.

Acceptance quantity

Acceptance quantity for the n-c inspection, please also see section Sampling schemes.

Interval type

Input for SPC or n-c inspections: time, pieces, once, none. See chapter Sampling schemes .

Interval value

Specifies the interval subject to the interval unit.

To  display  this  field  in  the  inspection  plan  characteristics,  you  require  the  authorization

"iriscp.interval".

Interval unit

For n-c or SPC inspections, e.g. minutes, hours.

With output batch change

If the output batch changes, an inspection becomes due.

To  display  this  field  in  the  inspection  plan  characteristics,  you  require  the  authorization

"iriscp.interval".

  Note:

  The  option  With  output  batch  change  only  triggers  the  generation  of  an  inspection  point,  if  the

respective  change  of  the  output  batch  is  included  in  the  dialog  "Change  of  batches"  (dialog  ID:

CA_WL). For example, reel cutting dialogs do not generate inspection points.

With machine status change

If the machine status changes, an inspection becomes due.

To display this field in the inspection plan characteristics, you require the authorization

"iriscp.interval".

MOC_CharacteristicsQM.docx

Version: 1.13.18468

Page 6 of 27

Characteristic Master Data

  Source status

Here, you can specify source statuses (specific non-productive machine statuses) – separated by

commas. If the machine then changes from a specified source status into a productive machine

status, an inspection becomes due.

To display this field in the inspection plan characteristics, you require the authorization

"iriscp.interval".

As of SP8, the following configurations are available in addition.

  The field is completely empty: For this characteristic, a machine status change always

generates an inspection point, if the machine changes from a non-productive into a

productive status.



"x-y", comma-separated: If the machine changes from source status x to target status y

(may be non-productive), an inspection point is generated for this characteristic.



"x-": If the machine changes from source status x to an arbitrary target status (may be non-

productive), an inspection point is generated.



"-y": If the machine changes from an arbitrary source status to target status "y" (may be

non-productive), an inspection point is generated.

With change of shifts

An inspection becomes due on changing shifts.

To display this field in the inspection plan characteristics, you require the authorization

"iriscp.interval".

Inspection due date of last off inspection

For details on the configuration of a last off inspection, refer to the section "Last off inspection".

Group Constructional measures

Unit

Pieces, meter, kg, etc. Unit of the characteristic. Allocate the units by using the unit catalog.

Decimal places

Number of decimal places. Leading zeros before the comma are not displayed in the specification

fields. By default, the number of decimal places defined in the system settings is pre-assigned.

Size (measure type)

Plausibility  and  tolerance  limits  can  be  entered  as  absolute,  relative  or  percentage  values.  Please

note  that  relative  or  percentage  lower  limits  (lower  tolerance  limit,  lower  process  limits)  must  be

specified with a negative algebraic sign.

MOC_CharacteristicsQM.docx

Version: 1.13.18468

Page 7 of 27

Characteristic Master Data

Standard

Calculation of tolerances based on specific standards (e.g. ISO metric fits). Subject to the selected

standard, further information is requested (e.g. engineering fit). The system automatically calculates

the tolerance limits on the basis of these specifications.

Fit

Calculation of tolerance limits on the basis of a specific standard and engineering fit. The selected

fit depends on the selected standard.

Upper PL

Specfies the upper plausibility limit

Upper TL

Specifies the upper tolerance limit (upper specification limit)

Target value

Specifies the target value

Lower TL

Specifies the lower tolerance limit (lower specification limit)

Lower PL

Specifies the lower plausibility limit

Generate failure (UTL)/(LTL)

If measured values  are recorded  and the checkbox  Generate failure  is enabled,  a violation  of the

limit  value  automatically  results  (in  the  background)  in  the  failure  type  "limit  value  violation"

(AUTO:TG>  or  AUTO:TG<).  This  option  is  not  available  for  attributive  characteristics,  as  the

specification is only used for information purposes in this case.

User fields tab

If you have defined user fields for characteristics, they are displayed and may be edited here.

Tab Chart 1/Chart 2

In tab chart1/chart2, you can define the control charts to be used. These control charts are later available

in  the  integrated  measurement  recording  and  in  the  measurement  recording  for  terminals  (SPCM).  You

can  define  a  total  of  two  different  control  charts.  Here,  you  can  store  for  each  control  chart  the  action

limits, warning limits and the mean value of variable characteristics. There are two different possibilities to

define these limit values. You can enter the limit values manually or the limit values are calculated using

the  specified  default  values  included  in  tab  Default  values  chart1/2.  For  further  information  on  control

charts, refer to sections 1.2 Control charts for variable characteristics and 1.3Control charts for attributive

characteristics.

MOC_CharacteristicsQM.docx

Version: 1.13.18468

Page 8 of 27

Characteristic Master Data

Chart 1 / Chart 2

Specifies the control chart displayed in the measurement recording dialog on the terminal. You can

define action limits on the basis of the control chart type.

Upper AL

Specifies the upper action limit. The system can calculate the value using the default values, if the

checkbox Calculate is enabled. (See also Control charts for variable characteristics).

Upper WL

Specifies the upper warning limit. The system can calculate the value using the default values, if the

checkbox Calculate is enabled. (See also Control charts for variable characteristics).

MV (Mean value)

Specifies a mean value, e.g. as basis for the automatic calculation of limits by the system.

Lower WL

Specifies the lower warning limit. The system can calculate the value using the default values, if the

checkbox Calculate is enabled. (See also Control charts for variable characteristics).

Lower AL

Specifies the lower action limit. The system can calculate the value using the default values, if the

checkbox Calculate is enabled. (See also Control charts for variable characteristics).

Generate trend error

The option "generate trend error" has to be activated to be able to generate an automatic error if a

trend  exists  (e.g.  seven  values  in  a  row  are  descending  or  ascending,  the  number  of  values  is

defined  while  the  system  is  customized).  To  identify  a  trend,  the  samples  of  an  inspection  step

characteristic are checked, sorted by their sample number  – regardless of the machine where the

data has been recorded.

Generate error (UWL) / (LWL)

Enable  the  checkboxes  Generate  error  (UWL)  /  (LWL)  to  generate  automatically  (in  the

background) the failure type "Limit value violation" (AUTO:WG> or AUTO:WG<), if a limit value is

violated during the recording of measured values. Here, the violation of the limit value is identified

using the stored control chart. In case an xq chart is stored, the automatic error is only generated if

the respective xq value of the control chart, and not the single value, exceeds the warning limits.

Generate error (UAL) / (LAL)

Enable the checkboxes Generate error (UAL)) / (LAL) to generate automatically (in the background)

the failure type "Limit value violation" (AUTO:EG> or AUTO:EG<), if a limit value is violated during

the recording of measured values. Here, the violation of the limit value is identified using the stored

control chart. In case an xq chart is stored, the automatic error is only generated if the respective xq

value of the control chart, and not the single value, exceeds the action limits.

MOC_CharacteristicsQM.docx

Version: 1.13.18468

Page 9 of 27

Tab Default values chart 1 / Default values chart 2

For further information on control charts, refer to sections  Control charts for variable characteristics and

Characteristic Master Data

Control charts for attributive characteristics.

Group Default for calculating limit values

Calculation type

Default  values  to  calculate  limit  values:  Cpk,  Sigma,  sq/an,  Rq/dn,  relative  deviation  from  xq,

deviation from xq in percent

Cpk

Default value of cpk

Sigma

Default value or calculated sigma value

Rq/sq (RQuer/sQuer)

Default value for Rq/sq (RQuer/sQuer)

Group Non-action probability

Action limits (non-action probability)

Specifies the action probability (only visible with the calculation type: cpk, Sigma, rQuer/sQuer)

Warning limits (non-action probability)

Specifies the action probability (only visible with the calculation type: cpk, Sigma, rQuer/sQuer)

Group Deviation from xq specification

rel. AL

Direct entry of the action limits (only visible with calculation types relative/percentage deviation).

rel. WL

Direct entry of the warning limits (only visible with calculation types relative/percentage deviation).

Group Confidence interval

Confidence interval

One-sided or two-sided. You can select one-sided or two-sided for the control charts R and s.

Group xq

XQ

Target  value,  mid-tolerance,  mean  value  of  xq  chart,  input  (only  visible  and  can  only  be  selected

with an xq control chart)

MOC_CharacteristicsQM.docx

Version: 1.13.18468

Page 10 of 27

Characteristic Master Data

Editing functions

The  below  screenshot  shows  an  example  of  an  editing  dialog.  Design  and  alignment  of  fields  may

deviate.

MOC_CharacteristicsQM.docx

Version: 1.13.18468

Page 11 of 27

Characteristic Master Data

Toolbar

There are no other special function buttons in addition to the standard functions/features.

Detail application Documents

If  you  have  activated  the  tab  Documents,  you  can  assign  an  arbitrary  number  of  documents  to  each

characteristic.  If  this  tab  is  activated,  the  respective  buttons  in  the  toolbar  to  edit  the  documents  are

equally activated.

All  formats  registered  by  Windows  are  available  when  assigning  documents.  You  can  assign  simple

documents  (e.g.  written  in  Word),  drawings  of  any  format  and  videos.  You  only  have  to  make  sure  to

install  a  program  that  is  able  to  display  the  used  format.  The  appropriate  program  linked  in  Windows

opens the documents.

The  file  types  "File",  "URL",  and  "Text"  are  available.  If  you  select  the  type  "file",  you  can  enter  the  file

name including path manually. Select the file type “URL” to access the internet or intranet. Select the file

type "text" to directly enter a text.

Note:

The  different  types  of  file  format  "URL"  that  the  shop  floor  client  supports  are  listed  in  the  respective

manual of the shop floor client. It might happen that "https" URL entries are displayed on the MOC, but

not on the AIP shop floor client.

MOC_CharacteristicsQM.docx

Version: 1.13.18468

Page 12 of 27

Characteristic Master Data

You  can  assign  a  designation/name  to  each  document.  You  can  also  define  the  list  order  of  the

documents. Use the field "position" to define the order (numeric input). Position numbers must be unique

in  this  list.  Enable  the  checkbox  Display  to  define  that  the  document  is  displayed  during  inspection

process.

Speaking of documents, you also have to decide if a document assignment without precise reference to

an article is reasonable. Normally, the document assignment depends on the article.

Taskbar Document

In addition to the standard functions, the application also provides the button to show documents.

Show documents

If  a  document  link  is  stored,  click  this  button  to  open  and  show  the  linked  document.  However,  a

program, which can show the linked file type, must be installed on the PC.

1.1  Sampling schemes

The  user  can  select  from  five  sampling  schemes  in  a  specified  list.  Subject  to  the  selected  sampling

scheme, some additional information has to be defined. It is subject to the subsequent use in the different

inspection  plan  areas  (e.g.  production,  goods  receipt,  goods  issue),  if  all  or  only  a  smaller  selection  of

sampling schemes is available.

Sampling  scheme  n-c  inspection:  The  sample  size  is  entered  in  the  "sample  size"  field  (=  n)  and  the

maximum  number  of  admissible  non-conforming  units  is  entered  in  the  "acceptance  quantity"  (=c)  field.

The figure "c" is defined as acceptance number. This means: if n = 50 und c = 1, the characteristic and

thus the piece is only classified as "fail" if two non-confirming units are identified (with sample size = 50).

Sampling scheme 100% inspection: In general, the sampling scheme 100% inspection is only used in

goods receipt and goods issue. The sample size is calculated from the actual quantity of the inspection

requirement and corresponds to it.

Sampling scheme SPC inspection: The sampling scheme "SPC inspection" nearly corresponds to the

"n-c" inspection plan. The only difference is that the acceptance limit "c" is not used in this case.

Sampling  scheme  batch  inspection:  In  the  standard  configuration,  the  sampling  scheme  "batch

inspection" only applies to the areas "goods receipt" and "goods issue". The percentage specifying how

much percent of the batch is to  be checked is entered here. Later in the inspection order characteristic

the sample size is calculated from the actual quantity of the inspection requirement and multiplied by the

specified percentage.

MOC_CharacteristicsQM.docx

Version: 1.13.18468

Page 13 of 27

Characteristic Master Data

If you must calculate action limits, you must enter the expected sample size here.

Sampling  scheme  k-value  inspection:  With  the  k  value  inspection  the  entered  k  value  is  checked

against the calculated k value and if this value is violated the sample is rated "fail".

1.2  Control charts for variable characteristics

For variable characteristics, the charts xq, s and R are available.

In statistical quality assurance, production dispersion is used for many calculations. One example is the

calculation  of  capability  indices  and  action  limits  of  a  quality  control  chart.  Vice  versa,  if  you  have

specified a process capability index, you can estimate the production dispersion and calculate the action

limits on this basis.

The  specifications  for  the  calculation  of  limit  values  can  be  found  in  the  tab  "default  values  chart  1"  or

"default values chart 2", where values to estimate the production dispersion can be entered. The action

and warning limits can be calculated on the basis of these specifications. However, it is also possible to

enter the production dispersion directly. The system provides three calculation options.

You  first  describe  the  specifications  using  the  xq  and  s  chart.  The  differences  with  the  R  chart  are

explained in more detail in the sections that follow.

There is often a specification for the process capability index cpk. This specification is reasonable. If the

process  capability  index  cpk  is  respected,  you  can  then  produce  pieces  within  the  range  of  tolerance.

Based on the specified cpk value, the system calculates internally an estimated value for Sigma, which is

entered  to  the  right  of  the  option  "Sigma"  for  information  purposes.  The  estimated  basic  value  that  has

been calculated is used to calculate the limit values of the xq/s chart. The calculation is performed, once

further data has been entered using the Calculate button. The calculation method "cpk" is set by default.

In addition, there are also the calculation methods "sigma" and "sq/an".

The  cpk  value  of  1,33  ensures  that  99.725%  of  the  characteristic  values  are  within  the  tolerance.

However, it is often required that 99.994% of the characteristic values are within the tolerance limit, which

corresponds to a cpk value of 1.67.

MOC_CharacteristicsQM.docx

Version: 1.13.18468

Page 14 of 27

Characteristic Master Data

The  calculation  method  sq/an  means  that  an  estimate  of  the  standard  deviation  is  calculated  from  the

quotient of the medium standard deviation and a correction factor an. This correction factor depends on

the sample size, which is identified by the index n. The values for an are defined in the system and are

requested  automatically.  This  estimate  of  the  standard  deviation  is  best  in  case  that  there  is  no

specification  of  the  process  capability  index  and  the  production  dispersion  is  unknown  and  thus  the

specification  of  the  sq-value  has  still  to  be  corrected  by  a  correction  factor.  It  is  also  the  most  efficient

method under the given conditions.  You must specify  the sq-value to calculate the limit values later on.

Enter the value in the field on the right hand side of the option sq/an. If you click the button Calculate later

on, the estimate sq/an is calculated using the specified sq value. The result  is entered on the right hand

side  of  the  option  Sigma for  information  purposes.  This  estimate  is  then  the  basis  for  the  calculation  of

action and warning limits of the xq/s chart

The third calculation method requires the specification of a sigma value. In  this case it  is assumed that

sigma is known and consequently the correction factor is not required. Enter the Sigma value to the right

of the “sigma” option. In comparison to the previous method, sq/an is replaced by sigma. In the majority of

cases sigma is not known. Therefore, it is best to use the calculation method using the specified sq value

to automatically calculate the estimate sq/an for variances in case of doubt.

If  you  select  the  “relative  deviation  from  xq”  or  the  “deviation  from  xq  in  percent”  as  “specification  to

calculate limit values”, the input option for “action probability in %” disappears. Instead, you can enter the

“deviation from target value”. These values and the specified value of xq are then used to calculate the

limit values (target value, middle of tolerance, mean value of xbar chart, input).

Further details have  to be  made in order to identify action and  warning  limits of the xq chart.  You must

specify  an  xq  value.  The  system  offers  the  possibility  of  setting  the  xq  value  equal  to  the  middle  of

tolerance or the target value or of specifying a value manually. If the process is supposed to be aligned to

the mean value, the middle of tolerance should be preferred as xq value.

The  action  probability  must  be  entered  in  percent  in  order  to  calculate  action  and  warning  limits  of  the

xq/s-chart. For this purpose, you must first dedice, if you want to use one-sided or two-sided limit values

for the calculation. Selct one of the two options.

Once you have specified the option 'one-sided' or 'two-sided', enter the action probability in percent. The

possible and reasonable action probabilities are defined in the system and only need to be selected from

the list. For the xq-chart, the calculation is based on the standard distribution. For example, if 99.725% of

the characteristic values must be within the action limits, select the value 99.725. As the specification of a

sigma  area  is  commonly  used  by  some  users,  the  corresponding  sigma  area  is  displayed  with  the

respective action probability for information purposes.

If  warning  limits  are  also  to  be  calculated,  an  action  probability  must  be  entered  here.  Note:  The

probability value of the warning limit must be lower than the action limit value.

MOC_CharacteristicsQM.docx

Version: 1.13.18468

Page 15 of 27

Characteristic Master Data

The sigma area is not displayed in the selection list, since the distribution of chi² is used to calculate the

limit values of the s-chart. Apart from that, the input is the same as for the xq chart.

If  you  save  the  specifications,  the  limits  are  calculated  –  if  the  Calculate  checkbox  has  been  enabled

before.

As already mentioned, the user can enter the limit values directly without any specified values.

If  the  R-chart  is  selected  instead  of  the  xq  or  s-chart,  the  option  sq/an  is  replaced  by  Rq/dn  in  the

specifications of the calculation. The estimate of sigma is now calculated using the specified mean range

R  divided  by  the  correction  factor  dn.  This  correction  factor  depends  on  the  sample  size  n.  The

corresponding values are defined in the system and are selected automatically. Apart from that, the rest

is the same as for the xq or s-chart. Note: In case of an R-chart, the calculation of the limit values is not

based on a chi² distribution, but on a table stored in the system, which is based on standardized ranges.

Notes:

  You can only use the calculation specifications "relative/percentage deviation from xq" if you use

an  xq  control  chart.  For  this  reason,  the  fields  of  the  group  "Xq"  are  only  visible,  if  you  have

previously selected the xq control chart.

  The user must select the confidence interval (one-sided/two-sided). Usually, you do not define a

lower limit for an s-chart. In this case, select "one-sided".



If only one of the two tolerance limits is available,  you cannot use the calculation method "cpk".

The calculation formula of the cpk method requires both tolerance limits.

1.3  Control charts for attributive characteristics

The p- and u-charts are available for attributive characteristics.

p identifies the proportion of defective units in the sample and u identifies the failures/defects per unit in

the sample. As to the p chart, it is important that each item is either defined as defect-free or defective. If

an item has several failures/defects it is only once referred to as defective.

In contrast to the variable characteristics, there are no lower limit values. Furthermore, it is normally not

necessary to state the values UTL, LTL and target value.

It is necessary to enter a pq or uq value in percent for the automated calculation of specifications. This

can be done in the default values tab.

If  you  save  the  specifications,  the  limits  are  calculated  –  if  the  Calculate  checkbox  has  been  enabled

before.

MOC_CharacteristicsQM.docx

Version: 1.13.18468

Page 16 of 27

Characteristic Master Data

Calculation  is  respectively  based  on  normal  distribution.  The  value  99,725  has  to  be  selected  if,  e.g.

99,725% of the characteristic values are supposed to lie below the upper action limit. As the specification

of  a  sigma  area  is  commonly  used  by  some  users,  the  corresponding  sigma  area  is  displayed  with  the

respective action probability for information purposes.

1.4  Calculation of formulas

If  you store  a formula,  you can automatically calculate measured values  by  way of measured values or

statistical values of other characteristics that have been inspected before.

If the extension QMSingleValue.FormulaArguments is enabled, you have the possibility to use extensive

arguments  to  calculate  the  single  value  you  want  to  collect.  In  addition,  you  have  more  possibilities  to

access  specification  values  and  values  of  inspection  results  of  other  characteristics.  For  more  details,

refer to the section "".

If this extension is not enabled, you can only calculate characteristics using the inspection results of other

characteristics  that  have  already  been  entered.  Find  details  in  the  section  "Calculation  via  reference  to

other inspection results".

1.4.1  Operators, functions and constants

The following operators, functions and constants for calculating measured values are supported:

MOC_CharacteristicsQM.docx

Version: 1.13.18468

Page 17 of 27

Characteristic Master Data

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

MOC_CharacteristicsQM.docx

Version: 1.13.18468

Page 18 of 27

Characteristic Master Data

1.4.2

Formulas referring to other inspection results

Formulas  including  a  reference  to  other  inspection  results  are  always  calculated  when  an  inspection

result referenced in the formula is created, changed or deleted.

For these characteristics,  you must first specify  the level of the formula calculation.  The following types

are available:

  V – Calculation on the level of single values (Value).

For  each  single  value  of  the  characteristics  involved,  one  single  value  is  generated  for  the

calculated characteristic.

  S - Calculation on the level of samples (Sample).

For each sample of the characteristics involved, exactly one single value is generated for the

calculated characteristic.

  C - Calculation on the level of characteristics (Criteria).

Exactly  one  single  value  is  generated  for  the  calculated  characteristic  (with  respect  to  the

overall statistic of all characteristics involved)

The actual formula follows this identifier (see previous chapter).

The following syntax applies for the variables identifying the single values or statistical values of the order

characteristics involved [x:y:z].

The x parameter identifies the statistical value to be used. The available values are listed below. Please

bear in mind that the calculation level might cause restrictions.

  X – Single value

(is only available for calculations on the level of single values)

  AVG – Mean value

(is only available for calculations on the level of samples or characteristics)

  MIN – Minimum

(is only available for calculations on the level of samples or characteristics)

  MAX – Maximum

(is only available for calculations on the level of samples or characteristics)

MOC_CharacteristicsQM.docx

Version: 1.13.18468

Page 19 of 27

Characteristic Master Data

  SUMX – Sum of single values

(is only available for calculations on the level of samples or characteristics)

  R – Range

(is only available for calculations on the level of samples or characteristics)

  S – Standard deviation

(is only available for calculations on the level of samples or characteristics)

  N – Sample size

(is only available for calculations on the level of samples or characteristics)

  M – Number of samples

(is only available for calculations on the level of characteristics)

The  y  parameter  describes  how  the  corresponding  characteristic  is  supposed  to  be  identified.  The

following possibilities are available:

  SENO – identification via the OP sequence of the characteristic (serial number)

  INCR – Identification via the characteristic number (inspection criteria)

If the characteristic number is not unique  within the  inspection requirement, it  is not predictable

which one of the applicable characteristics is used at the time of calculation.

The  parameter  z  identifies  the  characteristic  using  the  field  content  defined  by  parameter  y.  Either  the

OP  sequence  or  the  characteristic  number  of  the  calculation  source  is  entered  in  this  field.  If  the

characteristic  number  includes  a  space  character,  it  should  be  replaced  by  an  underscore  within  the

formula.

Example 1:

A  new  characteristic  is  calculated  from  the  single  values  of  the  characteristic  assigned  to  the

number "LENGTH”/”LAENGE" divided by 2.5. A corresponding single value is supposed to be

calculated  for  each  single  value  of  the  source  characteristic  (calculation  on  the  level  of  single

values).

 Formula: V: [X:INCR:LAENGE] / 2.5

MOC_CharacteristicsQM.docx

Version: 1.13.18468

Page 20 of 27

Characteristic Master Data

Example 2:

The  characteristic  "surface"  results  from  the  product  of  the  characteristics  with  the  characteristic

number  “LENGTH”/”LAENGE”  and  “WIDTH_TOTAL”/”BREITE_GES”.  A  single  value  of

the  characteristic  "surface"  is  supposed  to  be  calculated  for  each  single  value  of  both  source

characteristics (calculation on the level of single values).

 Formula: V: [X:INCR:LAENGE] * [X:INCR:BREITE_GES]

Example 3:

The  characteristic  "maximum  margin  width"  results  from  the  subtraction  of  the  minimum  of  the

characteristic "inside diameter" (OP sequence 10) from the maximum of the characteristic "outside

diameter"  (OP  sequence  20).  A  single  value  of  the  characteristic  "maximum  margin  width"  is

supposed to be calculated for each sample of both source characteristics (calculation on the level

of samples).

 Formula: S: [MAX:SENO:20] - [MIN:SENO:10]

For the calculation of formulas including references to other inspection results,  it is allowed to calculate

new  formula  characteristics  that  are  based  on  calculated  formula  characteristics.  However,  this  nesting

may  not  have  more  than  10  references  one  below  the  other.  Furthermore,  double  concatenations  must

not  be  created  (Example:  characteristic  A  is  calculated  from  characteristic  B  and  characteristic  C;

characteristic C is calculated from characteristic A).

1.4.3  Extended formulas

Extended  formulas  are  only  available,  if  the  extension  QMSingleValue.FormulaArguments  is

enabled.

The extended formulas provide the following advantages compared to the formulas including references

to other inspection results:

  You can enter arguments for these characteristics that are used to calculate the measured value.

In most cases, you do not need to use other "source characteristics".

  On  saving  the  inspection  result,  the  measured  value  is  calculated  and  is  immediately  available.

You do not need to refresh the measured values in the AIP to see the measured values.

  For the calculation,  you can optionally use single values or  sample or characteristic statistics of

other characteristics. You may combine these in any way.

  You can use variables for the target value, the upper and the lower tolerance limit of the current

characteristic or of other characteristics in the formula.

For this reason, you should primarily use the extended formulas.

MOC_CharacteristicsQM.docx

Version: 1.13.18468

Page 21 of 27

Characteristic Master Data

The  following  syntax  applies  for  the  variables  identifying  the  single  values,  statistical  or  specification

values of the order characteristics involved [x:y:z].

The  x  parameter  identifies  the  statistical  value  to  be  used.  The  available  values  are  listed  below.  Note:

Depending  on  the  respective  shop  floor  client  used,  it  is  possible  that  not  all  10  argument  fields  are

available.

  VAR1 – Argument 1 of the inspection result of the own inspection step characteristic

  VAR2 – Argument 2 of the inspection result of the own inspection step characteristic

  VAR3 – Argument 3 of the inspection result of the own inspection step characteristic

  VAR4 – Argument 4 of the inspection result of the own inspection step characteristic

  VAR5 – Argument 5 of the inspection result of the own inspection step characteristic

  VAR6 – Argument 6 of the inspection result of the own inspection step characteristic

  VAR7 – Argument 7 of the inspection result of the own inspection step characteristic

  VAR8 – Argument 8 of the inspection result of the own inspection step characteristic

  VAR9 – Argument 9 of the inspection result of the own inspection step characteristic

  VAR10 – Argument 10 of the inspection result of the own inspection step characteristic

  X – Single value of another characteristic

  AVG – Mean value of the sample of another characteristic

  MIN – Minimum of the sample of another characteristic

  MIN – Maximum of the sample of another characteristic

  SUMX – Sum of the single values of the sample of another characteristic

  R – Range of the sample of another characteristic

MOC_CharacteristicsQM.docx

Version: 1.13.18468

Page 22 of 27

Characteristic Master Data

  S – Standard deviation of the sample of another characteristic

  SREL – Relative standard deviation of the sample of another characteristic

  N – Sample size of another characteristic

  AVG_ALL – Mean value of all samples of another inspection step characteristic

  MIN_ALL – Minimum of all samples of another inspection step characteristic

  MAX_ALL – Maximum of all samples of another inspection step characteristic

  SUMX_ALL – Sum of the single values of all samples of another inspection step characteristic

  R_ALL – Range of all samples of another inspection step characteristic

  S_ALL – Standard deviation of all samples of another inspection step characteristic

  N_ALL – Total sample size of all samples of another inspection step characteristic

  M_ALL – Number of samples of another inspection step characteristic

  TV – Target value of an inspection step characteristic

  UTL – Upper tolerance limit of an inspection step characteristic

  LTL – Lower tolerance limit of an inspection step characteristic

The  y  parameter  describes  how  the  corresponding  characteristic  is  supposed  to  be  identified.  The

following possibilities are available:

  SENO – identification via the OP sequence of the characteristic (serial number)

  INCR – Identification via the characteristic number (inspection criteria)

If the characteristic number is not unique  within the  inspection requirement, it  is not predictable

which one of the applicable characteristics is used at the time of calculation.

MOC_CharacteristicsQM.docx

Version: 1.13.18468

Page 23 of 27

Characteristic Master Data

The characteristic number must not include any special characters. A minus sign "-" is

not permitted, for example.

  SELF – Identification of the own calculated characteristic

The characteristic that is to be calculated identifies itself. Only in this case, the parameter z is not

required.

Note: You may only use the identification of the own characteristic for the argument fields and for

the target value and the tolerance limits.

The  parameter  z  identifies  the  characteristic  using  the  field  content  defined  by  parameter  y.  Either  the

OP  sequence  or  the  characteristic  number  of  the  calculation  source  is  entered  in  this  field.  If  the

characteristic  number  includes  a  space  character,  it  should  be  replaced  by  an  underscore  within  the

formula.

Example 1:

The measured value of the current characteristic is calculated from the sum of the argument fields

1 to 4.

 Formula: [VAR1:SELF] + [VAR2:SELF] + [VAR3:SELF] + [VAR4:SELF]

Example 2:

The characteristic is the result of the product of the maximum measurements of the inspection step

characteristics  with  the  characteristic  numbers  'LAENGE’  and  'BREITE_GES’  ('LENGTH'

and 'WIDTH_TOTAL').

 Formula: [MAX_ALL:INCR:LAENGE] * [MAX_ALL:INCR:BREITE_GES]

Example 3:

The measured value is calculated from the sum of the following three summands:

  Content of argument field 1

  Middle of the tolerance of the current characteristic

  Sample mean value of the characteristic with OP sequence 10

 Formula: [VAR1:SELF] + (([UTL:SELF] + [LTL:SELF]) / 2) + [AVG:SENO:10]

Note the following when using extended formulas:

MOC_CharacteristicsQM.docx

Version: 1.13.18468

Page 24 of 27

Characteristic Master Data

  Contrary  to  the  formulas  including  references  to  other  inspection  results,  the  measured  values

are not calculated when the "source characteristics" are changed. The measured values are only

calculated, if the inspection result of the respective calculated characteristic is explicitly collected

or changed (e.g. via the argument fields).

  When  the  inspection  result  is  saved,  the  system  must  be  able  to  identify  valid  values  for  all

variables  used  in  the  formula  (single  values,  sample  or  characteristic  statistics,  specification

values of other characteristics, all used arguments).

Otherwise, an error message occurs and the inspection result is not saved.

  You cannot directly edit the calculated measured value. The measured value is always the result

of a calculation.



If  you  use  the  parameter  [X:…],  the  respective  single  values  of  other  characteristics  are

searched for using the absolute single value and sample number. For the current characteristic,

the parameter [X:…] is not available.



If  you  use  the  statistical  parameters  [MAX:…],  [MIN:…],  [AVG:…],  [SUMX:…],  [R:…],

[S:…] , [SREL:…] or [N:…], the respective statistical values are searched for using the

absolute sample number. Here, you cannot use statistical parameters of the own characteristic.



If you want to use the statistical parameters of the complete characteristic using the parameters

[MAX_ALL:…],

[MIN_ALL:…],

[AVG_ALL:…],

[SUMX_ALL:…],

[R_ALL:…],

[S_ALL:…], [M_ALL:…] or [N_ALL:…], only the data of other characteristics is available

(not the data of the own characteristic).

  Via  customization,  extensions  can  be  made  available

to  obtain  any  variables

in

the

syntax[VAR:<Object>:<Identifier>].

  You cannot use characteristics that include extended formulas as sources to calculate formulas

including  references  to  other  inspection  results.  But  you  can  use  these  characteristics  for  other

characteristics with extended formulas.

1.4.4  General notes on calculated characteristics

If  unknown  variables  are  used  within  a  formula  (faulty  parameters  x  and/or  y),  the  escalation

CPAUMW.CALCULATED_CRITERIAS_GET_VARIABLE_VALUE is triggered.

If  problems  occur  on  assigning  an  identified  value  to  a  variable  of  the  formula,  the  escalation

CPAUMW.CALCULATED_CRITERIAS_SET_VARIABLE is triggered.

Both actions described require the escalation management license.

Tool numbers, machine numbers, cavity numbers or similar information are not stored for the calculated

single values.

MOC_CharacteristicsQM.docx

Version: 1.13.18468

Page 25 of 27

Characteristic Master Data

To  transfer  a  corresponding  number  (batch  number,  sample  number,  serial  number,  etc.),  all  source

samples of the calculation must be assigned the same number. If there is no number that is assigned to

all source samples, you cannot assign a number to the calculated sample. If several numbers are found

that have been assigned to all source samples, only the first number found is assigned to  the calculated

sample.

This function only applies to numbers, which have been assigned on sample level.

1.5  Last off inspection

As part of the function extension for the in-production inspection, the function of the last off inspection is

available.  For  this  function,  you  must  have  created  the  CAQ  system  option  1222  manually  as  a

precondition.  For  details,  refer  to  the  procedure  document  "Configuration_QM_Options.pdf".  The

documentation  of  the  CAQ  system  option  specifies  which  characteristic  user  fields  must  be  created

(master data characteristic, inspection plan characteristic and inspection step characteristic), so that you

can specify a characteristic for a last off inspection.

To  specify  a  characteristic  for  a  last  off  inspection,  the  user  field  of  the  last  off  inspection  must  have  a

content.

The  function  "Last  off  inspection"  is  not  offline  capable.  And  you  cannot  use  the  last  off

inspection with operations that are specified as Inspection OP via processing code.

If the operation is  logged off or interrupted in  offline  mode, the  buffered activities/postings are

processed  one  after  the  other  when  the  online  mode  is  restored.  This  has  the  effect  that  the

operation is logged off or interrupted although the last off inspection is missing.

The processing code generally defines if any check for a defined last off inspection is performed

at all during logoff/interruption. If the processing code in tab Quality is set to Inspection OP, no

check and no last off inspection is performed.

If an inspection step has been "logged on" with the logon of an operation on the AIP, the system

proceeds as follows for the last off inspection when the operation is logged off or interrupted.

1.  The system checks if an inspection point with cause for creation Last off inspection exists for this

inspection step at the workplace in question. It does not matter if the inspection point is

completed or not. If the check is also performed with an interruption, the system checks if an

inspection point with cause of creation Last off inspection has been created since the last logon.

If an inspection point is found, the operation is interrupted or logged off.

2.

If no inspection point is found in item 1, the system checks if the relevant inspection step logged

on includes characteristics with the inspection due date Last off inspection. If this is not the case,

the operation is logged off or interrupted.

MOC_CharacteristicsQM.docx

Version: 1.13.18468

Page 26 of 27

Characteristic Master Data

3.

If the processes described in item 1 and 2 have the result that an inspection point must be

created with the cause of creation Last off inspection, the following message is shown:

Last off inspection is missing!

Enforce posting using the option "posting required"?

Using the option Posting required, you can perform the logoff/interruption without having made a

last off inspection. Use the CAQ system option 1154 to activate the logoff/interruption using the

option Posting required.

4.

If the operation is not logged off or interrupted because of the missing inspection point with the

cause of creation Last off inspection, you must go to the inspection to create an inspection point

with the cause of creation "Last off inspection". You can use the option Last off inspection in the

inspection list on the level Inspection step to create an inspection point with cause of creation

Last off inspection.

If you try to log off or interrupt the operation that includes an inpsection point with cause of creation  Last

off inspection that has not been completed, the standard processes apply. This means that the operation

can  optionally  be

logged  off  or

interrupted  although

the

last  off

inspection  has  not  been

performed/completed using the option "Posting required".

MOC_CharacteristicsQM.docx

Version: 1.13.18468

Page 27 of 27

