Breaks Depending on Working Time

1  Breaks Depending on Working Time

Summary

Menu

Human  resources  management  Models  Breaks  depending  on  working
time

Transaction code

wtdb

Function authorization  wtdb

Depending  on  the  executed  working  time,  this  configuration  allows  to  offset  unpaid  breaks  from  the

working time:

Usage

The following rules apply for processing breaks depending on working time:

-  The entries from the list are applied in ascending working time order. Only the difference between

the entered break and the already offset break will be deducted for an entry.

-  The compensation of a break depending on working time is made after that point in time, at which

the specified working time has been achieved.

MOC_WorkingTimeDependingBreaks.docx

Version:

Page 1 of 3

Breaks Depending on Working Time

-  Those breaks will be accounted for, for which a clocking was made and/or that were automatically

compensated  at the corresponding  working day. Also those paid breaks will be  accounted for that

are stored to the working time day type .

Only the breaks depending on working time with the same combination of company, area and

working  time  day  type  will  be  active  for  one  person.  If  for  example  a  break  depending  on

working  time  is  defined  for  a  company  and  for  an  area,  entries  applying  to  the  complete

company will not be processed. Configurations applying to a working time day type will have the

strongest priority here.

Field descriptions

Company

Specification of that company to which the configuration shall apply.

Area

Criterion  to  restrict  the  area.  This  can  be  used  to  restrict  to  certain  areas  the  compensation  of

breaks depending on working time.

Working time day type

Working time day type, to which the break depending on working time shall apply.

Valid from, to

Validity period for the break depending on working time.

Working time

Time that must be achieved in order to compensate the break depending on working time.

Break

Time that  will be deducted as break from the executed  working time. The break will no  longer be

shown once the specified working time has been achieved.

Allocate only if no break is planned

If  this  option  is  enabled,  the  break  depending  on  working  time  will  only  be  applied  in  those

instances, in which no break is stored to the working time scheduling of a day. A modification of the

setting will apply to all breaks depending on working time for the selected combination of company

and area.

Consider interruptions of work outside of break frame

If this option is inactive, only the existing breaks within the break frame and no interruptions of work

outside of the break frame will be accounted for in the compensation of the breaks depending on

working time.

MOC_WorkingTimeDependingBreaks.docx

Version:

Page 2 of 3

Breaks Depending on Working Time

Allocate break completely when working time is exceeded

This  option  causes  the  break  depending  on  working  time  to  be  deducted  completely,  once  the

specified working time has been achieved (e.g.: working time: 6 hours, break: 30 minutes; 6.05  -->

5.35).  If  this  option  is  not  enabled  the  break  depending  on  working  time  will  be  hidden  after  the

specified working time has been achieved (e.g.: working time: 6 hours, break: 30 minutes, 6.05  -->

6.00).

This field is only available if the modification AllocateBreakCompletely is enabled.

MOC_WorkingTimeDependingBreaks.docx

Version:

Page 3 of 3

