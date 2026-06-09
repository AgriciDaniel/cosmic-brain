Bradford-Faktor

1  Bradford Factor

Overview

Menu

Role menu: HR -> Evaluations -> Bradford Factor

Product  menu:  PZW    Personnel  Time  Management    Evaluations  
Bradford Factor

Transaction code

brad

Function authorization

brad

The Bradford Factor is a KPI deriving from the Health Management.  It provides information on the type of

absenteeism of an employee and can be used as a "warning factor". Employees with frequent (often short)

absenteeism achieve a higher score. However, a high Bradford factor does not necessarily imply a mental

overload and should only serve as a point of contact with the affected employee.

Purpose

This report provides the user with an overview of all persons and their respective Bradford factor within the

selected time period. A high Bradford factor provides the user with an indication of an accumulation of short-

term, illness-related absenteeism.

Calculation

Calculation  basis  for  the  determination  of  the  Bradford  factor  are  the  absences  from  the  person  in  the

selected period as stated  in the  absence planning. The calculation  includes all  absenteeism associated

with  the  absence  control,  namely  illness  category  with  pay  continuation,  sick  without  pay  continuation,

unpaid illness, work injury and rehab.

The values of the Bradford factor column are colored according to the following classification:

1 to 200

 green

201 to  449    yellow

>= 450

 red

In case of absences, which continue over the weekend, the weekend is also included in the missing days.

Thus, the calendar days are always considered, not the working days.

In the case of absence planning, which only takes place partially in the selected period, simply the missing

days are evaluated that are within the selected period. The number is given as 1.

If there is no missing time for the calculation in the selected period, the value is not 0, but no value is issued.

MOC_BradfordFactor.docx

Version: 1.0.18468

Page 1 of 3

Configuration

By means of an INI configuration, it is possible to specify which of the above-mentioned categories from

the Control of absence are included in the calculation.

Bradford-Faktor

INI name: BRADFORD

Section: ABSENCES

Key: CATEGORIES

Value: Abbreviation of the category, separated by comma (example: URL,URH,SUR)

Abbreviation  Category
URL
URH
URU
SUR
LFZ
OLF
UBK
UNF
KUR
MUT
FST
WBD
GLZ
FZA
FLX
FTG
BZS
UBS

Holiday leave
Half-day leave
Unpaid leave
Special leave
Illness with continued pay
Illness without continued pay
Unpaid sickness
Accident at work
Rehab
Maternity leave
Leave of absence
Further training
Flextime reduction
Overtime reduction
Time account reduction
Public holiday
Other paid leave
Other unpaid leave

Selection criteria

Personnel selection

You  can  find  the  description  of  the  selection  criteria  in  the  documentation  Extended  personnel

selection.

Period from / until

Period of time considered for the evaluation.  The field period from is pre-assigned for one year by

today's  date,  the  field  period  up  to  is  pre-assigned  with  the  current  date.  That  means,  if  the  user

requests data, then all the data records of the last year are shown.

MOC_BradfordFactor.docx

Version: 1.0.18468

Page 2 of 3

Field description for the category Absence

Bradford-Faktor

Quantity

Number of absences

Days of absence

Total of absence days

Bradford Factor

Bradford Factor The calculation is performed using [Number of absences]² x [Absence calendar days]

Toolbar

Absence planning

Calls up the Absence planning.

MOC_BradfordFactor.docx

Version: 1.0.18468

Page 3 of 3

