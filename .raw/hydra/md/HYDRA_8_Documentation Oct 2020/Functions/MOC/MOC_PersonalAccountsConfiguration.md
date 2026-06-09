Configuration of Accounts

1  Configuration of Accounts

Overview

Menu

Master Data  Labor time  Configuration of Accounts

Transaction code

paco

Function authorization

paco

The accounts of the HYDRA PZW (Personnel Time Management) are continuous balances that are kept

in hours or days (contrary to wage types always starting from 0 at the beginning of a month).

You can keep up to eight continuous accounts. Use this dialog to activate the accounts and specify their

processing and name.

Purpose

The  number  of  accounts  is  fixed  at  8.  For  this  reason,  the  buttons  Insert,  Copy  and  Delete  are  not

available.

MOC_PersonalAccountsConfiguration.docxVersion: 1.2.18468

Page 1 of 3

The leave entitlement defined in the HR master data is offset using account 4. Use account 4 as

leave account for this reason.

Configuration of Accounts

Field descriptions

Account, Designation

Number of the account ranging between 1 and 8 and its name.

Active

Status of account. Only an active account is used for bookings and can be evaluated.

Account type

Time account for keeping the account in hours and minutes.

Day account for keeping the account in days (e.g. leave).

Decimal places

With time accounts, the number of decimal places is zero.

With day accounts, you can define the number of decimal places. For example, if you have defined

one decimal place for the leave account, you can offset half a leave day.

If  you  make  changes  in  field  Decimal  places  or  if  you  change  the  Account  type  during

running operation, this can cause wrong account balances and a wrong display.

Sorting of account lists, terminal information, time sheets, account limits

Sorting  order  of  the  accounts  (position  1-8,  1  =  first  position)  in  the  account  lists,  the  terminal

information  and the  time sheet. If the  Sorting field remains empty,  the  account  is not displayed in

the respective application.

In field Account limitation, you can specify the order used to  limit the accounts. For example,  you

can use this setting if you repost from one account to another and you then want to limit the target

account.

Terminals  of  the  manufacturer  Kaba  Benzing  and  of  type  CTP-340  can  only  show  a

maximum of 4 accounts.

Green from, Green to, Yellow from, Yellow to

These fields of the group Account indicator specify the color used for the relevant account balance

in  the  reports  Current  account  balances,  the  Monthly  results  and  in  the  Personnel  scheduling.

Account balances outside of the yellow range are displayed in red. If these fields remain empty, no

color is used to highlight the fields.

These fields are only available if the extension ColoredAccountBalances is enabled.

MOC_PersonalAccountsConfiguration.docxVersion: 1.2.18468

Page 2 of 3

Configuration of Accounts

Upload positive/negative account balance, Wage type, Sign

Use  these  options  to  specify  whether  the  positive  or  negative  account  balance  of  an  account  is

posted  to  the  Wage  type  in  the  Monthly  results  so  that  the  account  balance  is  uploaded  to  the

payroll accounting with the other wage types. Only few interfaces support the upload of wage types

with negative duration. For this reason, it might be required to enter different wage types for positive

and  negative  account  balances  and  to  convert  the  algebraic  sign  to  a  "positive"  sign  for  negative

account balances.

In  addition  to  the  application  Configuration  of  accounts  where  you  can  define  the  accounts

displayed  on  the  terminal  for  the  entire  system,  there  is  the  application  Configuration  terminal

information where you can overwrite the accounts displayed on the terminal and their names for

entire  companies,  groups  of  persons  (department,  area,  cost  center,...)  and  for  separate

persons.

MOC_PersonalAccountsConfiguration.docxVersion: 1.2.18468

Page 3 of 3

