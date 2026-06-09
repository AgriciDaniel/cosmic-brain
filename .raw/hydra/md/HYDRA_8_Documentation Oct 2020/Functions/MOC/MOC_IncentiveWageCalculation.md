Wage Calculation

1  Wage Calculation

Overview

Menu

Human resources management  Incentive wage  Lohnberechnung

Transaction code

iwcalc

Function authorization

iwcalc.*

You  use  this  application  to  start  the  wage  calculation  of  the  the  incentive  wage.  The  wage  calculation

uses postings of the employees (e.g. of the BDE and PZW) to calculate the time tickets and the work day

results of persons and premium groups.

The Incentive Wage Calculation is described in a separate document.

The section below describes the manual start of the wage calculation.

In  the  course  of  the  wage  calculation,  interrelationships  can  occur  that  are  not  predictable  because

persons can  work for different  premium groups at the same time. Therefore,  you can hardly exclude or

lock specific persons or premium groups when you start the wage calculation. Instead, the system does

not allow to run different wage calculations at the same time. Only one user can start a wage calculation

at  a  time.  For  the  other  user  who  starts  a  wage  calculation,  a  relevant  message  is  displayed  in  the  list

Wage  calculation.  This  user  must  put  off  the  start  to  a  later  point  in  time.  This  lock  also  affects  the

generation of the LLE interface file because it is not guaranteed that the data is complete when a wage

calculation  is  run.  In  this  case,  the  system  does  not  output  the  usual  wage  calculation,  but  shows  a

warning message.

MOC_IncentiveWageCalculation.docx

Version: 1.1.16892

Page 1 of 4

Wage Calculation

Selection criteria

The application provides the following selection criteria:

Evaluate staff

If this option is checked, the time tickets of the persons are recalculated. If this option is not active,

only the time tickets of premium groups that have been recalculated are updated. You can limit the

persons that must be recalculated using the other fields. If the selected persons worked in premium

groups, it is possible that persons are recalculated who were not included in the original selection

because these persons also worked in the premium groups involved.

MOC_IncentiveWageCalculation.docx

Version: 1.1.16892

Page 2 of 4

Wage Calculation

Evaluate premium groups

If  this  option  is  enabled,  the  premium  group  results  are  recalculated.  The  user  can  use  the  other

fields  to  further  restrict  the  premium  groups  to  be  calculated.  The  system  might  also  recalculate

groups  that  were  not  included  in  the  original  selection  because  some  of  the  selected  persons

worked in several premium groups.

Recalculate Required days until

All persons and premium groups selected for recalculation are recalculated up to the specified date.

On  the  specified  date,  recalculation  is  also  performed  for  persons  and  premium  groups  without

existing  wage  calculation  for  the  day.  The  activities  that  trigger  an  automatic  recalculation  of  a

person or premium group are described in the documentation Incentive Wage Calculation.

Recalculate Fixed period

A  recalculation  of  all  persons  and  premium  groups  is  performed  for  the  specified  period.  It  is

recommended to restrict the data using the personnel numbers and premium groups. For reasons

of security, the system limits the period that can be recalculated to a maximum of 31 days in a row.

Field descriptions

Number of staff

Number of HR master data versions included in the original selection

Number of daily personal results

Number of recalculated personal work days

Number of time tickets

Number of recalculated personal time tickets

Number of premium group days

Number of recalculated days of premium groups

Note

Information on the completion of the wage calculation. The possible notes are described below.

Notes on the wage calculation

"Person 123456 day not computable. Reason: XYZ archiving."

With evaluation Required days until: For this person, the specified day must be evaluated, but the

data required of the product group specified is no longer available. The earliest possible date that

can  be  evaluated  results  from  the  last  retention  date  according  to  the  data  management

configurations of the specified product group. If the archiving program has not yet been performed

for  the  data,  the  earliest  possible  date  is  identified  using  the  earliest  data  records  in  the  product

group  including  a  safety  margin  of  one  day.  The  PZW  data  must  have  been  calculated  by  the

workday evaluation.

MOC_IncentiveWageCalculation.docx

Version: 1.1.16892

Page 3 of 4

Wage Calculation

"Locked by user XX, client XX, module XX."

"Locked. Please try again later."

Another user has already started a wage calculation or an automatic wage calculation is performed

in the background. Only one wage calculation at a time can be performed in the system. Try again

a short time later.

"Start date limited since data not available."

With evaluation Fixed period: The period specified starts before the earliest possible date that can

be evaluated. Date from has been set to the earliest possible date that can be evaluated. See also

note "Day not computable since data not available."

"ERR start date after end date."

With  evaluation  Fixed  period:  The  Date  to  is  before  the  Date  from.  This  message  can  also  be  a

subsequent failure of the message "Start date limited since data not available."

"ERR Maximum nbr of 31 days exceeded"

With evaluation Fixed period: You can select a period covering a maximum of 31 days. This limit is

used to protect the user from accidentally entering incorrect dates in the date fields.

MOC_IncentiveWageCalculation.docx

Version: 1.1.16892

Page 4 of 4

