Account Limits

1  Account Limits

Overview

Menu

Human resources management  Month-end closing  Account limits

Transaction code

pali

Function authorization

pali

The specification of  Account limits provides the option to define maximum and minimum limit values for

PZE  accounts.  You  can  define  Account  limits  for  single  persons  and  groups  of  persons.  The  account

limits are processed during the monthly evaluation of accounts.

You  can  not  only  specify  account  limits  with  processing  Account  limit,  but  you  can  also  specify  fixed

amounts that are offset against the different accounts to disburse a specific number of hours or to book

leave entitlements to an account, for example.

MOC_PersonalAccountLimits.docx

Version: 1.1.18578

Page 1 of 4

Account Limits

Purpose

If you create, change or delete an account limit that is valid for a year, a specified time or a specific day

(valid from/until), the monthly evaluation of the relevant person becomes mandatory. The changes made

are processed at the latest with the next cyclic evaluation.

Checking the responsibility area authorization

The system checks if the person modifying the  data record has the relevant responsibility area

authorization in the period of time selected. This check is positive if at least one of the persons

selected belongs to the responsibility area the person is authorized for.

To identify the period of time selected, the following rule applies:

- If a value is entered in field Year: the calendar year

- If a value is entered in the fields Valid from and Valid until: the time specified

- If a value is only entered in Valid until: from an unlimited time to Valid until

- If a value is only entered in Valid from: from Valid from until an unlimited time

- Otherwise: current day

Selection criteria

The application provides the following selection criteria:

Person from, to, Company, Area, Cost center

The  account  limits  are  displayed  for  the  persons  selected.  If  only  one  person  is  selected,  the

application displays all account limits that are valid for this person. It does not matter if the account

limits have been specified for this person only or for a group of persons.

Account

You can restrict the display to the selected account.

Date from, to

The account limits are displayed that are valid in the period of time selected. If the end of a monthly

period is entered, only the account limits are displayed that are valid in this settlement month.

The  account  limits  specified  for  a  year  or  a  period  of  time  are  only  displayed  correctly  if  the

relevant settlement periods have already been created.

Field descriptions

Company

Use this field to restrict the validity of an account limit to the company specified.

MOC_PersonalAccountLimits.docx

Version: 1.1.18578

Page 2 of 4

Account Limits

Selection of a person or a group of persons

Use the next two fields to restrict the account limit to a specified person or a group of persons. The

following  HR  master  data  fields  are  available  to  select  a  group  of  persons:  Area,  Cost  center,

Department, Employee subgroup, Activity, Employment relationship and Person does not clock.

Account

The account limit is valid for the account specified.

Processing

Use this field to specify if an account limit is set or if a fixed amount is offset against the account or

if an account balance is set. You can use the option Fixed amount to book leave entitlements to the

leave account or to disburse a specified period of time of an account.

If  you  want  to  deduct  a  fixed  amount  from  an  account,  you  must  enter  a  negative

value (e.g. "-20:00"). Positive values are added to the account.

If you define an account limit for an account with the processing Fixed amount and an

additional  account  limit  with  the  processing  Account  limit  within  the  same  sorting,  the

Fixed amount is booked first and then the account limit with processing Account limit.

Upper limit, Wage type

Specify the upper limit value for the account. When the account balance exceeds this limit value by

the  end  of  the  month,  the  difference  is  booked  to  the  wage  type  specified.  The  limit  is  only

processed, if the upper limit is set to Active.

Lower limit, Wage type

Specify the lower limit value for the account. If the account balance is below this limit value by the

end of the month, the difference is booked to the wage type specified. The limit is only processed, if

the lower limit is set to Active.

Note:  If  an  account  is  limited  using  a  negative  limit  value,  the  time  is  booked  with  a

positive sign to the wage type specified. The payroll accounting must then interpret this

wage type as deduction from the pay.

Validity

Year, Settlement period

Possible restriction of the account limit to a specific year and/or a specific settlement period. If an

account limit is valid for a Settlement period and/or a Year, the existing account limits without Year

and  Settlement  period  are  not  processed.  This  way,  you  can  specify  deviating  account  limits  for

single months or years.

Valid from, until

MOC_PersonalAccountLimits.docx

Version: 1.1.18578

Page 3 of 4

Validity period of the account limit. In the monthly evaluation, only the account limits are processed

that  are  valid  on  the  last  day  of  the  month.  If  you  want  to  process  several  account  limits  in  one

sorting, the validity period of all account limits must be identical.

Account Limits

Processing

Priority

If account limits are stored for different groups of persons, you can use the Priority to control which

account limit takes priority if a person is assigned to these groups of persons (the higher the value

entered, the higher the priority).

Sorting

If you want to process several account limits for an account one after the other, you can specify the

sorting in this field. Within a Sorting, the account limits are only processed for the group of persons

with the highest Priority. You can specify the processing order of the accounts of one Sorting in the

Configuration of Accounts using the field Sorting Account limits.

If  two  or  more  account  limits  exist  with  identical  entries  in  the  fields  Company,  Personnel

selection,  Value,  Year,  Settlement  period,  Valid  from,  until,  Priority  and  Limit  value,  then  the

limited  time  is  booked  to  all  wage  types  that  are  specified  in  these  account  limits.  It  is  then

possible to book the time, which is disbursed, to 2 different wage types (a basic wage type and

a bonus wage type).

If  several  account  limits  exist  for  one  person,  you  can  specify  the  order  used  to  apply  the

account limits via Sorting. The account limit with Sorting "1" is processed first, the account limit

with Sorting "999" is processed last.

MOC_PersonalAccountLimits.docx

Version: 1.1.18578

Page 4 of 4

