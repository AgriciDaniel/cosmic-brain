Resetting Labor Time Calculation

1  Resetting Labor Time Calculation

Overview

Menu

Human  resource  management    Maintenance    Reset
calculation

labor

time

Transaction code

ptrs

Function authorization

ptrs

In the Reset labor time calculation individual results of the labor time calculation can be reset for a group

of  persons  and  a  data  period  that  can  be  selected.  In  this  way,  subsequently  modified  working  time

models,  payment  models  and  evaluation  parameters  can  be  considered  in  the  subsequent  labor  time

calculation, for example. The next time it is started, the labor time calculation evaluates all of the previous

days for the people to be evaluated.

MOC_PersonalTimeResetResults.docx  Version: 1.0.18468

Page 1 of 5

Resetting Labor Time Calculation

Usage

When the working time day types and the shift type are reset, the settlement date is reset in the clockings

as  well.  Because  the  clockings  are  then  no  longer  uniquely  assigned  to  a  settlement  date,  other  reset

operations can only be performed for the corresponding people and the selected period after a labor time

calculation. For this reason, all of the required reset options should be selected and executed at once.

If no option was activated in "Reset in clockings", "Delete" and "Manual modifications", the day results are

set such that evaluation is required and the wage types and account postings are regenerated in the next

labor time calculation.

If not all of the days of a settlement period  are present due to data storage time limits, the days of this

settlement period cannot be reset and reevaluated.

When  many  people  are  reset  over  a  long  period,  expect  the  subsequent  evaluation  to  take

longer accordingly.

If  the  options  "Reset  manually  edited  clockings  as  well"  and  "Reset  and  delete  authorized

clockings  and  postings  as  well"  are  activated,  note  that  desired  modifications  (e.g.  manually

corrected rounding, manually modified cost centers or manually creating postings) may also be

reset.

The following notes and warning messages are included to prevent inadvertent improper use.

MOC_PersonalTimeResetResults.docx  Version: 1.0.18468

Page 2 of 5

Resetting Labor Time Calculation

Selection criteria

The following selection criteria are available in the application:

Rounded times

If this field is selected, the rounded evaluation times are reset in the clocking records. This option is

only  used  if  working  time  models  are  changed,  for  example.  In  this  way,  a  new  rounding  of  the

times after the rounding rules have been changed takes effect in the evaluation parameters.

Working time day type and shift type

If  this  field  is  selected,  the  working  time  day  type,  the  shift  type  and  the  settlement  date  in  the

clockings  are  reset. This  option  is  used  in  case  of  subsequently  modified  working  time models  or

personal models or day types, for example.

Payment day type

If this field is selected, the payment day types in the clockings are reset. This option is used in case

of subsequently modified payment models or personal models or day types, for example.

Cost center

If  this  field  is  selected,  the  cost  center  in  the  clockings  is  reset.  This  selection  can  be  used  with

subsequently  modified  master  or  temporary  cost  centers  in  the  HR  master  data.  Then,  in  the

following new evaluation, the  wage type postings  will also be regenerated and  posted to the new

cost center.

MOC_PersonalTimeResetResults.docx  Version: 1.0.18468

Page 3 of 5

Resetting Labor Time Calculation

Automatic absences

If  this  field  is  selected,  automatically  generated  absences  from  absence  planning  as  well  as

advance  and  subsequent  clocking  are  deleted.  This  option  can  be  used  with  modified  absence

planning, for example.

Caution:  If  this  option  is  active  at  the  same  time  as  "Reset  and  delete  authorized  clockings  and

postings as  well",  absences that have been manually edited  will  be  deleted as  well. If there is no

absence planning for these absences, they are irrevocably lost!

Advance/ subsequent clockings

If this field is selected, then the advance/ subsequent clockings are deleted,  regardless of whether

they were compensated as absences, attendance times or business trips. This can be used with a

modified configuration of the absence reasons or modified working time models, for example.

Wage type postings

If this field is selected, the wage type postings on the selected days are reset. The subsequent day

evaluation regenerates the postings.

Reset manually edited clockings as well

The rounded times, working time day types, payment day types and cost centers are also reset in

manually created or edited clockings. If this option is inactive, only unauthorized original clockings

are edited.

Reset and delete authorized clockings and postings as well

If this field is selected, then the previously authorized and refused clockings, automatic absences,

advance/  subsequent  clockings  and  wage  types  are  reset  or  deleted.  In  this  case,  a  manually

created wage type posting counts as an approved posting.

If  the  option  "Reset  and  delete  authorized  clockings  and  postings  as  well"  is  inactive,  only

unauthorized original records that can be regenerated by a subsequent day evaluation are edited.

If this option is active at the same time as the option "Automatic absences", manually

edited absence clockings are also deleted, regardless of whether they were  manually

created,  resulted  from  absence  planning  or  were  generated  due  to  an  advance/

subsequent clocking. Manually created absences and manually edited absences from

advance/ subsequent clockings are not regenerated in case of a new day evaluation!

An absence clocking that was just authorized is not considered to be manually edited

and will be regenerated in subsequent day evaluations.

Field descriptions

Number

Number of respective people

MOC_PersonalTimeResetResults.docx  Version: 1.0.18468

Page 4 of 5

Resetting Labor Time Calculation

Note

Note that refers to the number of people that were edited whose clockings were modified or whose

absences, advance/ subsequent clockings or wage type postings were deleted.

Toolbar

 Labor time calculation

Calls the Labor time calculation.

MOC_PersonalTimeResetResults.docx  Version: 1.0.18468

Page 5 of 5

