Labor Time Calculation

1  Labor Time Calculation

Summary

Menu

Human Resources Management --> Maintenance --> Labor Time Calculation

Transaction code

ptev

Function authorization

ptev

The "labor time computation" function is the core of the PZE system (time & attendance system). During

the evaluation, the employees’ clockings are synchronized with the working time frame and the resulting

working time is calculated, taking into account the evaluation parameters (rounding rules, etc.). The labor

time calculation function results in the times worked being posted onto wage types.

The  following  description  refers  to  the  manual  starting  of  the  labor  time  calculation  function.  The

automatic starting of the computation function is set up when the system is first installed.

MOC_PersonalTimeEvaluation.docx

Version: 1.0.18468

Page 1 of 3

Labor Time Calculation

Utilization

During the labor time calculation function, the employees' clocking times are compared with the working

time frames defined for those employees and posted  accordingly. Errors and other issues are shown in

the  message  list.  The  work  day  evaluation  function  can  be  started  any  number  of  times for  days  in  the

past.  The  evaluation  of  the  current  day  or  of  future  days  will  produce  false  results  in  certain

circumstances, as the clockings are either incomplete or do not yet exist and only planning data is posted.

How the computation of labor time works is described in a separate section.

Selection Criteria

The application provides the following selection criteria:

Evaluate only if required

If this option is set, only those employees are evaluated who require evaluation. Reasons why an

evaluation  is  necessary  might  include:  an  already  evaluated  clocking  record  has  been  edited,  the

subsequent planning of an absence or the resetting of the work day result. If the option is not set,

then the evaluation is run for all selected employees.

Field Descriptions

Quantity

Number of affected people

Note (description)

Note referring to the number of people who have been edited, that are erroneous, blocked or who

do not need to be evaluated.

The  displayed  result  of  the  work  day  evaluation  function  contains  the  number  of  evaluated

employees  and  the  people  with  errors.  The  number  of  blocked  employees  is  also  shown.

Employees can be excluded from being evaluated, if the HR master data sheet is being edited

at the time of the evaluation or if this employee’s clocking records are being edited at another

console. Another reason would be that an evaluation is already running for the employee at this

point  in  time.  In  case  the  attempt  of  evaluating  a  person  results  in  a  message  indicating  that

nobody has been evaluated, this might be due to the fact that the employee has not yet joined

the  company  by  the  specified  date  or  that  not  all  days  are  available  for  the  corresponding

evaluation period due to data retention terms..

MOC_PersonalTimeEvaluation.docx

Version: 1.0.18468

Page 2 of 3

Labor Time Calculation

Toolbar

Messages listing

Opens the messages listing for the selected period.

MOC_PersonalTimeEvaluation.docx

Version: 1.0.18468

Page 3 of 3

