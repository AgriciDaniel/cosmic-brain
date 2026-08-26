Update Accounts

1  Update Accounts

1.1  Summary

Menu

Master Data --> Labor Time --> Update Accounts

Transaction Code

pabo

Function authorization

pabo

The "update accounts" option is used to define which wage types are used for postings to and deductions

from particular accounts.

Utilization

For  time  accounts,  the  duration  of  the  daily  wage  type  total  is  posted  onto  the  corresponding  account,

whereas the duration is multiplied by the percentage which is defined in the wage type.

If a configured wage type is available for time accounts the account is added or reduced by one day. The

percentage  rate  of  the  wage  type  is  processed  this  time  as  well.  Consequently,  half  days  may  be

allocated if the wage type is assigned to 50%.

MOC_PersonalAccountsBooking.docx

Version: 1.0.1362

Page 1 of 2

Update Accounts

If  the  leave  account  (account  number  4)  is  kept  in  days,  the  leave  wage  type  should  not  be

entered here. The leave account is usually posted using the "allocate leave day" field in Control

of absences.

Only the fourth account can be used as leave account. This is due to the fact as the reduction of

leave on a daily basis in the control of absences function affects the account that is assigned to

number 4. Moreover, the specified leave entitlement is also set off against the fourth account.

Field Descriptions

Wage type

The wage type which triggers the posting to the account.

Account

The account to which the time is posted.

Include attendance time

Specifies whether the employee’s attendance times should be taken into account for this posting.

Include absence

Specifies  whether  the  employee’s  absence  times  should  be  taken  into  account  for  this  posting.

Normally both  options are checked, as a differentiation of attendance and absence is  usually not

required at this point.

Compensation

Determines whether the wage type should be added to or subtracted from the account.

Company

The company for which the configuration is valid. If the field is left empty, the configuration applies

to  all  companies.  This  field  should  only  be  filled  in,  if  a  restriction  to  a  particular  company  is

required.

Sequence of Reposting Due to Account Limits

This field controls the reposting peformance at the end of the month as a result of account limits. It

determines whether  reposting to another account is performed immediately, thereby affecting the

limiting of this account, or if the reposting should only be carried out after processing of the account

limits of all accounts.

MOC_PersonalAccountsBooking.docx

Version: 1.0.1362

Page 2 of 2

