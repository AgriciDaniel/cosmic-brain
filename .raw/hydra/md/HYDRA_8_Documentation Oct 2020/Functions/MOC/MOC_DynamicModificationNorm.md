Dynamic Modification Norm

1  Dynamic Modification Norm

Summary

Menu

Master data  Quality Management  Dynamic modification norm

Transaction code

dynn

Function authorization

dynn

The  dynamic modification  norm  defines  how  much  items/parts  are  to  be  checked  with  which  inspection

severity  taking  the  batch  size  into  account  (“actual  quantity”  field  in  the  inspection  requirement  of  the

goods receipt and goods issue dialog).

Provided that a skip lot variant is to be used, this one is also defined/activated here.

Utilization

The  “norm”  field  uniquely  identifies  a  dynamic modification  norm  in  the  corresponding  QM  applications.

This field is the key field at the same time, i.e. when saving it is checked whether there is already a data

record with this key information.

The  norms  “ISO_2859“  and  “ISO_3951“  are  initial  entries,  which  can  neither  be  changed  nor  deleted.

Inspection levels, AQLs and sample tables are defined for the norms “ISO 2859“ and “ISO 3951“ and the

methods s and sigma are additionally defined for ISO 3951.

Different  dynamic  modification  norms  can  be  created.  An  inspection  severity  definition  is  assigned  to

these  dynamic  modification  norms.  A  selection  list  that  includes  the  previously  defined  inspection

severities is available for this assignment process.

In addition, a radio button in the "inspection type" field decides whether this norm applies for attributive or

variable  characteristics  only  or  for  attributive  and  variable  characteristics.  Consequently,  within  the

inspection plan characteristics of a variable characteristic it is later only possible to choose the dynamic

modification norms that have been defined for variable or for variable and attributive characteristics. If the

"variable" inspection type is selected the sampling plan type may be indicated additionally. When it comes

to the inspection types "attributive" and "attributive + variable", "n-c-d + skip lot" is taken automatically as

sampling plan type. The "variable" inspection type additionally provides the option "n-k + skip lot".

n = Sample size

c = Acceptance number (number of errors/defects which is still allowed to achieve a "pass" result)

d = rejection number (number of errors/defects as of which the inspection result is "failed", i.e. the batch is

to be rejected)

MOC_DynamicModificationNorm.docx

Version: 1.1.1362

Page 1 of 3

k = k factor as limit value for the acceptance or rejection / inspection result is classified as "pass" or "fail"

(please refer to the corresponding norms for further information on this k factor.)

Dynamic Modification Norm

Integration

The following applications use dynamic modification norms.



Inspection planning (inspection plan characteristics) for goods receipt and goods issue.

Prerequisite

Inspection  severities  and  transitional  definitions  need  to  be  created  beforehand  to  be  able  to  define

dynamic  modification  norms.  The  "dynamic  modification  norm"  application,  if  considered  individually,  is

not functional. Consequently, it has to be used and assigned in the inspection plan characteristics, which

in turn requires the dynamic modification to be activated in the inspection plan header.

Selection criteria

Selection criteria are self-explanatory and are not described separately.

Field descriptions

The available fields are self-explanatory and are not explained separately.

There is a selection list including acceptance functions to assign inspection severity definitions.

Toolbar

Sampling plan

Assignment of sampling plans to dynamic modification norms

Function to assign sampling plans to a previously defined and selected dynamic modification norm.

Detail applications

Detail application sampling plan

The  fields  "AQL  value",  "inspection  level"  and  "method"  are  only  available  in  the  initial  DIN  norms  that

cannot be changed. The same applies to the sampling plan type "n-k + skip lot". For this reason, the field

for the k factor only appears in these sampling plans.

This  detail  application  connects  increments  of  the  sample  size  with  a  defined  batch  size  for  every

inspection severity. A selection list is available for the inspection severity.

MOC_DynamicModificationNorm.docx

Version: 1.1.1362

Page 2 of 3

Dynamic Modification Norm

If an entry  is made without specifying the  batch size,  the specifications  of all batch sizes apply that  are

greater than the highest batch size that is defined.

The copy dialog allows for all sampling plans of the indicated norm and inspection severity to be copied to

the specified target norm and target inspection severity.

Field descriptions

Inspection severity

Inspection severity for which the below-mentioned inspection specifications are defined.

Batch size

Gradation for which batch size the below inspection specifications are defined. The indicated batch

size represents the upper limit that is included. The lower limit is the next smallest batch size that is

defined for the same inspection severity.

Sample size

Defines the number of measured values to be recorded for the combination of inspection severity

and batch size.

Acceptance quantity

Limit value for the number of allowed failures/defects with respect to the combination of inspection

severity and batch size,  which still results in the batch to be accepted or the characteristics to be

rated as "pass" for dynamic modification relating to characteristics.

Quantity rejected

Limit value for the number of allowed failures/defects with respect to the combination of inspection

severity and batch size, which results in the batch to be rejected or the characteristics to be rated

as  "fail"  for  dynamic  modification  relating  to  characteristics.  Ideally,  the  rejection  quantity  is

increased by 1 (compared to the acceptance quantity) to be able to make a unique decision.

Skip lot

Provided that a skip lot is to be defined for the specified inspection severity, a value greater than 1

is to be entered here. If the value 3 is entered, this means that only one batch out of three is to be

checked as soon as this inspection severity is reached. The sample size as well as the acceptance

and rejection numbers that are indicated here apply when checking the inspection severity.

MOC_DynamicModificationNorm.docx

Version: 1.1.1362

Page 3 of 3

