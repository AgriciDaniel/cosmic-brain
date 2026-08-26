Wage types

1  Wage types

Overview

Menu

Master data  Labor time  Wage types

Transaction code

waty

Function authorization  waty

Wage  types  are  different  categories  to  group  times  with  different  information  (e.g.  night  shift,  overtime,

etc.). We distinguish between basic wage types that are used for the payment of special working time and

bonus wage. Usually, different types of absences are also specified as different wage types.

Field description tab "Wage type"

Wage type, name

Alpha numeric identification of the wage type and name.

MOC_WageTypes.docx

Version: 1.2.18760

Page 1 of 5

Wage types

Authorization required

This option is used to define a wage type with required authorization. If the option is not active, the

system requires authorization somewhere else (e.g. in the payment day type).

Percentage

The  percentage  with  which  the  wage  type  is  compensated.  Specifying  a  percentage  only  has  an

effect if the wage type is to be posted to an account. Otherwise, this is a comment field.

Entries with 0% are not posted.

Responsibility area

A user is only authorized to edit this wage type if he or she has authorization for the assigned area

of responsibility.

Confirm wage type to payroll system

If  an  interface  to  Payroll  Accounting  exists,  you  can  use  this  option  to  specify  whether  or  not  this

wage type is transferred to the interface file.

Payroll wage type

You use the wage type to post information to the payroll department.  This field is not processed in

all interfaces.

Payroll control option

A field for customer specific processing.

Purpose

Specifies  whether  the  wage  type  should  be  used  to  calculate  planned  working  time,  overtime  or

undertime.  It  is  also  possible  not  to  specify  anything.  The  wage  types  marked  with  Overtime  are

listed  in  the  Overtime  column  of  the  time  sheet.  The  same  applies  to  the  use  of  Undertime,  but

these times are displayed as negative.

Type

Specifies whether the wage type is a basic or a bonus wage type.

Field description tab "Settings"

Processing

Note on how this wage type is used. This is a comment field and can be left empty.

Selection field

A field for customer specific processing.

MOC_WageTypes.docx

Version: 1.2.18760

Page 2 of 5

Wage types

Average Type

The field "Average type" is processed with the aid of interfaces to transfer "Monthly wage types" to

the payroll systems LOGA and  Abacus.   You can find further information  in the  description of the

interfaces.

Rounding of wage type

The  fields  "Interval"  and  "Limit"  (both  in  the  format  hours:minutes)  can  be  used  for  rounding  the

daily duration of a wage type. The interval forms the points in time used to round up or down.  The

limit  specifies  up  to  what  point  in  time  the  system  rounds  down  during  the  interval  and  when  it

rounds up. If no rounding to wage types is required, you do not need to make an entry.

Wage  types  are  rounded  after  the  "Additional  allowances  rule"  and  the  "Wage  type

interaction" were processed.

Use wage type for comparison with BDE.

You  can  use  the  Comparison  function  to  compare  data  in  the  order  data  entry  for  rounding  in

personnel time recording. This is done with the wage types that are marked here.

Delete wage type after comparison with BDE.

If  this  wage  type  is  only  a  processing  wage  type  for  comparison  and  can  be  deleted  after  the

comparison.

Field description Tab "Incentive wage"

Time type

This field specifies the "Time wage, "Piecework" and "Overhead costs".

Labor time for incentive wage

This wage type  is used to deduce the PZE labor time from the PZE wage type  posting  when  you

calculate the performance efficiency rate for piecework from ADE and PZE.

If the wage type is activated with this option, then the PZE labor time is always deduced using the

PZE  wage  type  posting  no  matter  what  person.  If  the  wage  type  cannot  be  activated  with  this

option, then you use the attendance time from the PZE as the labor time.

Incentive wages option

You  only  use  this  option  if  you  calculate  a  formula-based  incentive  wage  with  a  customized

processing.

Labor time for group bonus

This field controls how PZE wage type postings are included in the calculation of the group bonus

using formula-based incentive wages. This field is not relevant if you have a standard group bonus

without formula-based incentive wage calculation.

MOC_WageTypes.docx

Version: 1.2.18760

Page 3 of 5

Wage types

  Not included in the group bonus

PZE wage type postings for this wage type are not included as labor time in the group bonus.

Using cost center for posting

The cost center in the PZE wage type posting is interpreted as a premium group. In this case, the

cost center for the PZE and the premium groups of LLE must be identical.  Transfers to other

premium groups can be achieved by manually assigning:

cost centers in the PZE clockings and postings

temporary cost centers

HR master data versions

cost center entries at the PZE terminal

cost center changes.

Using premier groups from the HR master data

With this option  you assign the PZE wage type postings entered in the premium groups using the

premium group of the HR master data.  Persons can be transferred to other premium groups on a

daily basis by creating HR master data versions.

Using group assignments

You use the function "Change of group" to assign people to the premium groups down to the exact

minute.  The assignment from the group changes is transferred to the PZE wage type postings for

this wage type and then you can include the wage type posting for the group calculation. In order to

do so, you separate the wage type postings if a group change takes place during the posting.

Quantity determination by

You  use  this  option  to  control  how  the  quantities  for  piecework  are  calculated  when  persons  are

posted in the ADE.    This is relevant for wage type with the time type "Piecework".

Basic settings

LLE  basic  settings  The  system  calculates  the  quantities  for  the  time  ticket,  which  includes  scrap

and yield from the primary quantities if the setting is made.

Wage type

You  can  use  the  matrix  to  set  which  quantity  fields  of  the  ADE  posting  are  used  to  calculate  the

quantity for the time ticket.

Toolbar

Update accounts

Update  accounts  With  "Update  accounts"  you  specify  which  wage  types  are  used  to  increase  or

decrease amounts for certain accounts.

MOC_WageTypes.docx

Version: 1.2.18760

Page 4 of 5

Wage types

Additional allowances rule

You  use  the  option  "Add.  allowances  rule"  to  post  an  additional  bonuses  if  employees  work  on

special  days.  Additional  allowances  rule    Likewise,  fixed  special  payments  such  as  fare,  lunch

money or similar can be made.

Wage types relations

You can configure interactions between wage types Wage type interactions .

MOC_WageTypes.docx

Version: 1.2.18760

Page 5 of 5

