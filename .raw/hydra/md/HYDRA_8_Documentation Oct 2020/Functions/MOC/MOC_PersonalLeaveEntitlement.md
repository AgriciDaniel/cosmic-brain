Leave Entitlement

1  Leave Entitlement

Summary

Menu

Master Data --> Labor Time --> Leave Entitlement

Transaction code

plen

Function authorization

plen

The leave entitlement may be defined for different groups of employees, subject to their staff membership

or age. But the leave entitlement may also be defined for such groups without any dependencies.

Field descriptions

Company

Restricts  the  leave  entitlement  to  a  particular  company.  If  this  field  remains  without  an  entry,  the

leave entitlement applies for all companies.

MOC_PersonalLeaveEntitlement.docx

Version: 1.1.18468

Page 1 of 2

Leave Entitlement

Personnel selection, value

The  personnel  selection  field  specifies  whether  the  leave  entitlement  is  to  be  configured  for  a

person  or  a  group  of  employees.  The  available  employee  groups  include  area,  cost  center,

department,  personnel  number,  employee  subgroup,  activity  and  salaried/non-salaried  employee.

The value for the personnel selection field is defined within the "value" field. The leave entitlement

applies to all employees if no selection is made.

Reference, value

Leave entitlement may either be planned subject to the age or staff membership. The employee's

age and/or staff membership on January 1st is used in each case. If there are configurations for the

age  and  for  the  staff  membership,  the  first  applicable  configuration  takes  priority.  If  both

configurations are applicable, the leave entitlement specified for the age will be used.

Leave entitlement

The  values  of  the  fields  Annual  leave,  Special  leave  and  Additional  leave  will  be  entered  in  the

relevant fields of the HR master and credited to the employee's leave account (4th account when

defining accounts) on  1st January.  Any changes  made to the entitlement to  annual  leave, special

leave or additional leave are only reflected in the leave account when the labor time calculation for

the 1st January is started.

Leave entitlement may only be entered with a maximum of one decimal place, regardless

of whether the leave account is kept as day account or time account.

Valid from, to

These two fields restrict the validity of the leave entitlement to a specific period  of time. If only one

of these two fields is filled out, the entry is either valid from or until that date.

Priority

If  leave  entitlement  is  defined  for  different  employee  groups  and  more  than  one  of  these

configurations applies to a single employee, the priority determines which entry has precedence.

The corresponding entitlement is taken from the HR master, if one of the fields for entitlement to

annual  leave,  additional  leave  or  special  leave  is  left  empty.  This  allows,  for  example,  for  the

annual leave entitlement to be specified by configuration and the additional leave entitlement for

severe disability to be edited using the HR master.

MOC_PersonalLeaveEntitlement.docx

Version: 1.1.18468

Page 2 of 2

