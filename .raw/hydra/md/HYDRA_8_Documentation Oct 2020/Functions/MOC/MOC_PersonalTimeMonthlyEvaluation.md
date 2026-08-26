Monthly Evaluation

1  Monthly Evaluation

Overview

Menu

Human resources management  Month-end closing  Monthly evaluation

Transaction code

ptme

Function authorization

ptme

In  the  Monthly  evaluation,  the  wage  type  postings  of  the  specified  settlement  period  are  combined  for

calculation and account limits are applied.

Purpose

Also for the current settlement period, you can start the Monthly evaluation. The results that are available

up to now are then combined to perform the labor time calculation. With current settlement periods, you

cannot limit accounts. This is only possible with settlement periods that are finished.

The  result  of  the  monthly  evaluation  displayed  on  the  MOC  informs  about  the  number  of  persons  that

were calculated and the number of persons where errors occurred. Also the number of persons with wage

types that require authorization is displayed. Possible reason for persons that are locked: the HR master

data or the account balances are edited on another client.

MOC_PersonalTimeMonthlyEvaluation.docxVersion: 1.1.18468

Page 1 of 3

Monthly Evaluation

The monthly evaluation for a person is only performed if the labor time calculation of at least one day of

the settlement period has been run without errors for the person.

If the labor time calculation is performed for a day of a past settlement period, the monthly evaluation for

the  settlement  period  is  equally  performed  if  a  monthly  result  exists  for  this  settlement  period.  Other

settlement periods that are between this past and the current settlement period are also re-calculated if a

monthly result exists for these settlement periods.

This  way,  it  is  guaranteed  that,  using  the  current  results,  the  account  limits  are  corrected  and  that  the

account balances at the beginning and end of the month are correctly displayed.

A separate document describes the Processing of the Monthly evaluation.

The monthly evaluation can be repeated as often as you like. But you must make sure that the

data of the relevant settlement period is still available in the system.

Selection criteria

The application provides the following selection criteria:

Calculate only if required

If the option Calculate only if required is enabled, only those persons are calculated that require a

new monthly evaluation. A new monthly evaluation can be required if you have corrected values in

past months. If the option is disabled, the monthly evaluation is run for all persons selected.

Field descriptions

Quantity

Number of affected persons

Description

The text added in this field refers to the number of persons evaluated, with errors, locked or that do

not require an evaluation.

Toolbar

 Account limits

Calls the Account limits

 Messages listing

Calls the Messages listing of the month

MOC_PersonalTimeMonthlyEvaluation.docxVersion: 1.1.18468

Page 2 of 3

Monthly Evaluation

 Interface to payroll accounting

Calls the  Interface to payroll accounting.

 Time sheet

Shows the time sheet.

 Monthly results

Calls the Monthly results list.

MOC_PersonalTimeMonthlyEvaluation.docxVersion: 1.1.18468

Page 3 of 3

