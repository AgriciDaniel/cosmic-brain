Manual

Integrated HR Master
SIS-IPS 3.0/3.1

Version 1.0.19512

Last changed on: 19 June 2020

Integrated HR Master

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

SIS-IPS_30.docx

Version: 1.0.19669

Page 2 of 22

Integrated HR Master

Contents

1

Integrated HR Master - Overview................................................................. 4

2  HR master data ............................................................................................ 5

3  HR Master Changes ................................................................................... 22

SIS-IPS_30.docx

Version: 1.0.19669

Page 3 of 22

Integrated HR Master

1

Integrated HR Master - Overview

Purpose

Integrated HR master for recording staff with settings for different applications (labor time management,

shop floor data collection, quality management, ...)

Implementation considerations

You use the function package if:

  You intend to use HYDRA products for whom employees have to be recorded.

Integration

Persons entered in the HR master are also required in many other function packages.

Features

  HR Master

o  Maintenance of persons with validity period (HR master with revision index option)

o  Allocation of a photograph to the employee

o  Print of labor lists with free selection of fields to be printed

o  Allocation  of  persons  to  responsibilities  to  control  which  users  have  access  to  and  may

maintain employees and their data.

o  Comfortable maintenance function for several persons and groups of persons

  HR master changes

o  Recording and listing of HR master changes

SIS-IPS_30.docx

Version: 1.0.19669

Page 4 of 22

Integrated HR Master

2  HR master data

Overview



Menu

Master data  Staff  HR master data

Transaction code

pers

Function authorization

pers

Available user fields

Where?

Object type/user field key

Source (type)

Table and detail view

PNR/SYSTEM

HR master data (HR)

How to configure user fields?

Which user field types are available?

The application HR master data manages the persons' master data. These persons are employees of the

company  or  involved  in  the  company's  processes  (e.g.  temporary  workers).  The  available  display  and

editing options depend on the products used and on the respective authorizations of the users.

SIS-IPS_30.docx

Version: 1.0.19669

Page 5 of 22

Integrated HR Master

Purpose

You must create the relevant employees in HYDRA e.g. for time & attendance functions, for staff postings

in BDE (shop floor data collection) and other activities for which a person needs to be assigned (e.g. entry

of the malfunction reason at a machine).

You can store a person several times with different validity periods. Use this option to make changes to

persons and to keep the previous version up to a specific date. For example, you can use this function if a

person changes the department or cost center. The product groups PZE and LLE consistently work with

the  HR  master  that  is  managed  in  versions.  These  product  groups  use  the  HR  master  version  that  is

effective  for  the  day  in  question  for  retrospective  calculations,  evaluations  and  planning.  Other  product

groups always access the person's currently valid version (i.e. today's valid version).

Other  applications  also  access  the  HR  master  data  to  select  the  appropriate  person  if  you  enter  a

personnel number in the application's search field personnel number. If a user does not have the function

authorizations  pers  and/or  pers.view,  all  HR  master  data  fields  are  hidden.  Except  for  the  following

fields: person, valid from, valid until, staff badge, title, first name, middle name, last name, company, area,

cost  center,  department,  supervisor,  name  (supervisor)  and  the  additional  information  fields.  The

application  does  not  automatically  hide  the  fields  in  the  additional  information  tab,  as  you  can  use  the

configuration of HR master data fields to specify which fields should be visible or not.

In the HR master, you can also use function authorizations to specify the tabs the user may view or edit.

Example:  production  supervisors  can  view  and/or  change  the  settings  of  the  shop  floor  data  tab.

However,  they  cannot  change  the  other  tabs.  Find  here  further  information  on  this  processing  and  the

required configuration.

To prevent the HR master data from being printed or exported to Excel, you can disable these functions

in the application Function authorization. The Function authorization pers_disexp disables the export and

copy function (CTRL+C) and pers_disprt disables the print function.

Integration

Synchronization of ZKS badges with HR master data

If you change data of ZKS badges, the system synchronizes specific data with the HR master:

  Company

  Last name and first name

  PIN code



Image

  Additional information (configured HR master fields and badge fields)

SIS-IPS_30.docx

Version: 1.0.19669

Page 6 of 22

Integrated HR Master

The additional information must have the same:

- designation/name

- data type and

- field length

in the configuration of HR master data and badge fields in order to be synchronized.

Only changes to active employee identification badges are synchronized with the HR master data that will

apply from today or in the future. Synchronization affects all HR master data versions that are valid today

and  will  be  valid  in  the  future  if  the  validity  periods  of  badge  and  master  data  version  coincide.  The

synchronization process does not create new HR master data versions.

If you change HR master data, the system also synchronizes specific data fields with ZKS badge fields.

For further details on this, refer to the respective documentation dealing with badges.

Requirements

If a user wants to edit and change HR master data, the system checks if this MOC user is authorized to

do so. If the person the user wants to change is assigned to a responsibility area, the system checks if

the user is authorized for this responsibility area.

Selection criteria

The documentation Advanced personnel selection describes the selection criteria.

Field descriptions of the Person tab

This  tab  shows  general  data  relating  to  the  person/employee.  The  personnel  number  and/or  badge

number identify every person. Use the badge number to post data via the BDE or PZE terminal.

Person

Personnel number that uniquely identifies the person.

Valid from, until

Validity  period  of  the  person.  You  can  only  complete  the  field  Valid  from  if  you  create  or  copy  a

person.  If  other,  future  versions  of  the  person  are  available,  the  validity  end  date  is  automatically

completed, and otherwise the field remains empty.

If you create a new person, you should not change the entry "1 January 1900" in the valid

from field. The field date of joining includes the person's entry date. If the valid from date

is in the future, the person's clocking authorizations are only shown once the validity start

date has been reached.

SIS-IPS_30.docx

Version: 1.0.19669

Page 7 of 22

Integrated HR Master

Staff badge

Number  of  the  company  ID  card.  This  number  has  to  be  unique  for  all  persons.  Numerical  and

hexadecimal badge numbers (characters 0-9 and A-F) are supported. The staff badge no. field may

be empty.

You  can  reassign  badges  of  employees  who  have  left  the  company.  If  you  assign  such  a  badge

number to a new person, the  staff badge no. field of the person  who  left the company  is  emptied

automatically. A person has left the company if the date of leaving ("employed till" field) lies in the

past in all HR master versions.

If you want to read in the badge numbers as a barcode on an acquisition client (e.g. AIP), you can

find

the

respective

configurations

in

the

document.D:\live\svn\en\Procedures\Setup_Barcode_Badges\Setup_Barcode_Badges.pdf

Production employees

The  option  Production  employee  is  a  discrete  option  for  the  business  parameter  Number  of

administered production employees (BSC-NPE).

We highly recommend to use this option. You can use mass maintenance for editing. If you set this

option,  the  system  checks  if  the  licensed  number  of  production  employees  (number  of  licenses

"BSC-NPM") is adhered to.  If the number of licenses is not sufficient, contact your sales agent.

Salutation

Salutation of the person (e.g. Mr., Ms.)

Title, First name, Last name

Contains the person’s academic title, first name, middle name and last name.

Abbreviation

Initials of the person. Example: You can assign internal initials to a person.

Company

Use this field to assign the person to a company. It is a mandatory field.

Area

Use this field to assign the person to an area. You can use the area field to group persons. These

groups can span multiple cost centers and are used as a selection criterion in evaluations and lists

in HYDRA Time & Attendance (PZE). It is a mandatory field.

Cost center

The person's standard cost center is also a mandatory field.

Department, employee subgroup

These dropdown boxes provide further options for classifying the employee hierarchically. You can

show both of these fields in a variety of lists and evaluations/reports of the product group Time and

Attendance (PZE).

SIS-IPS_30.docx

Version: 1.0.19669

Page 8 of 22

Integrated HR Master

Activity

Brief description of the employee's function in the company.

Responsibility area

Enter  a  responsibility  area  to  restrict  the  MOC  users  who  are  granted  access  to  the  employee's

data.

You  can  also  leave  the  responsibility  area  field  empty.  If  the  responsibility  area  field  is

empty, no authorization check takes place and the respective employees are visible to all

users.

Date of joining, date of leaving

Contains  the  date  the  employee  joined  or  left  the  company.  Both  fields  are  included  in  data

selection. If the date of joining refers to a date in the future or the date of leaving refers to a date in

the past, the employee is inactive.

Supervisor

Enter the supervisor's company and personnel number to assign  the  employee to a supervisor. If

the  supervisor  is  defined  as  a  recipient  in  the  escalation  management,  they  can  be  notified

according to the configuration.

Replacement 1

Specifies the first person replacing the supervisor. You can use this field to specify the person that

replaces  the  supervisor  in  case  of  absence.  If  a  Replacement  is  required,  the  absence  workflow

uses this field. The deputy of the supervisor is to be determined by the respective employee, not by

the supervisor. This makes it possible to define different deputies for different employees.

Replacement 2

Specifies the second person replacing the supervisor. You can use this field to specify the person

that  replaces  the  supervisor  and  the  first  replacement  in  case  of  absence.  If  a  Replacement  is

required, the absence workflow uses this field. The deputy of the supervisor is to be determined by

the respective employee, not by the supervisor. This makes it possible to define different deputies

for different employees.

Field descriptions of the Personal data tab

Use the fields of the personal data tab to store personal data. These entries (with few exceptions) are for

information purposes only.

Nationality

Shows the employee's country code, e.g. US, GB, F, HU, D, CH, A, NL, etc. You can assign any

values in the field nationality. The system does not validate these entries.

SIS-IPS_30.docx

Version: 1.0.19669

Page 9 of 22

Integrated HR Master

Date of birth

Shows the employee's date of birth.

Gender

Use the radio button to assign the employee's gender.

Place of birth

Shows the employee's place of birth.

School-leaving qualification

Shows the qualification or graduation when the employee left school.

Secondary school-leaving qualification

Shows the qualification or graduation of the secondary school.

Family status

Use the radio buttons to assign the employee’s marital status.

Standard console

Currently not processed.

PIN code, Confirmation

Shows the PIN code, which the employee uses as a password to log in to the Internet or Intranet,

for example to enter clocking in or out times or to submit applications for leave of absence. Since

the PIN code is not displayed legibly, you have to enter the code a second time for confirmation. If

you use  the ZKS product  group (access control)  and  you change the  PIN code in the HR master

data,  the  system  automatically  changes  the  employee's  badge,  provided  that  the  PIN  code  in  the

badge matches the previous PIN code in the HR master data.

Street, ZIP code, residence

Shows the employee's address.

Company phone, Private phone

Shows the employee’s business and private phone numbers.

Company mobile

Shows the employee’s business mobile number. If this employee is registered as a recipient in the

escalation management and if messages are sent by SMS, then these text messages will be sent

to the number entered in this field.

Private mobile

The employee's private mobile number.

Company e-mail

Shows the employee’s business e-mail address. If this employee is registered as a recipient in the

escalation  management  and  if  messages  are  sent  by  e-mail,  then  e-mails  will  be  sent  to  this

address.

SIS-IPS_30.docx

Version: 1.0.19669

Page 10 of 22

Integrated HR Master

Private e-mail

The employee's private e-mail address.

Field descriptions of the Shop floor data tab

Employee group

Enter group numbers to assign employees to specific groups. This is a comment field.

Year model

This entry is relevant if the option "Synchronize labor utilization with the person's BDE shift model"

is  enabled  in  the  HYDRA  basic  settings  or  waiting  period  processing  is  activated.  This  data  field

includes the year model that is used to identify times.

Example  for  waiting  period  posting:  If  the  person  clocks  in  at  6:00  a.m.  but  doesn't  log  on  to  the

machine  and  the  OP  until  7:00  a.m.,  then  the  time  between  6:00  a.m.  and  7:00  a.m.  will  be

compared  to  the  shift  model  and  posted  to  the  relevant  waiting  period  OP.  In  this  case,  a

comparison means that the time difference is posted to the corresponding Waiting period OP.

Workplace

Shows  the  employee's  regular  workplace.  This  is  a  machine-related  workplace  as  defined  in  the

configuration  of  machines/workplaces.  If  waiting  period  processing  is  active,  this  entry  is  also

entered in the waiting period posting generated by the system in the BDE product group (shop floor

data collection).

Please note:

Do not configure the workplace as a group workplace because otherwise, the machine list (with all

logged on persons) shows this workplace for all terminals where staff was logged off and logged on

to the waiting period OP.

Waiting period OP

The waiting period is posted for the operation specified. If you do not enter a waiting period OP, the

system uses the default waiting period OP, as entered in the HYDRA basic settings.

Please note:

Define  waiting  period  OPs  as  personal  overheads  (order  type  GKP)  because  waiting  period

operations are not posted explicitly and do not always need to be uploaded to the ERP system. You

cannot assign other types of operations.

Log on to several workplaces

When a person logs on to a machine/workplace, the system checks whether this person is already

logged on to another machine/workplace.

If this checkbox is enabled, then the person is allowed to log on to multiple machines/workplaces

simultaneously.  Otherwise,  the  second  login  attempt  is  denied  and  the  terminal  shows  an  error

message.

SIS-IPS_30.docx

Version: 1.0.19669

Page 11 of 22

Integrated HR Master

Automatic OP change

If this checkbox is selected, the person is automatically logged off from the current OP if they log on

to another machine or workplace.

If persons are logged on to a group workplace, an overhead cost order, or a merged OP relating to

the person, the system also interrupts the operation, since the person is directly connected to the

operation.

Restriction

If  individual  workplaces  are  assigned  to  terminals  which  are  configured  to  send  combined

OP/user  postings  (Terminals  >  Dialog  control  >  Log  person  on  with  order)  and  you  log  on  an

additional operation to the same machine, the person will  not be logged off automatically from the

current operation.

Note

  Select  the  Log  on  to  several  workplaces  checkbox  to  enable  the  above-described

procedure.

  Operations are not changed automatically, if staff is logged on automatically, e.g. due to a

changed machine status, the change of shifts, etc.

Check whether person is logged on

If you select this option, the system checks whether the person who interrupts, logs off the order or

reports part quantities for the order is actually logged on to the operation.

Target quantity check

Use this option to specify if you want to check the target quantity when you post quantities manually

onto an operation.

1   No check.

2°° Log off order: If you log off an order, the system checks whether the current yield coincides with

the specified minimum and maximum target quantity (see below).

3    Order  interruption/logoff/partial  confirmation  (reporting  part  quantities):  the  system  checks  all

posted quantities for over delivery and, on logging off an operation, an under delivery check is also

carried out.

Please note:

In general only yield is checked.

The limit values for over delivery and under delivery defined in the operation data do not affect this

and are checked separately, if they are set. If this is true, the system first checks

- the above-mentioned personnel-related target quantities and then

- the operation-related target quantities including the over delivery quantities and under delivery

quantities defined for the operation.

SIS-IPS_30.docx

Version: 1.0.19669

Page 12 of 22

Integrated HR Master

For  further  information  on  over  delivery/under  delivery  checking,  see  the

document entitled MBL_PC_UnderOverDeliveryOverview.pdf.

Minimum target quantity in %

If  the  system  checks  the  target  quantity,  you  have  to  define  here  the  minimum  quantity,  as  a

percentage  of  the  target  quantity  (<=  100%)  that  must  be  reached  before  you  can  log  off  an

operation.

Maximum target quantity in %

Enter the maximum quantity to be produced, as percentage of the target quantity (>= 100%).

Max. OPs per person

Enter the maximum number of operations that a person can log on to.

Please note:

This setting is also relevant when it comes to the creation of merged operations on the terminal.

Automatic logoff of personnel when shift ends

This option only takes effect if the following conditions are met:

- the person is logged on to an operation where the option "log off person when shift ends" is set to

"X - use workplace settings"

and

- the person including OP is logged on to a workstation where the option "automatically log off

person at the end of shift" is set to "X - use the person's settings".

Use this option to fine-tune user-related data collection at machine data collection (MDE)

workstations. If you use the MDE (machine data collection) product group, the terminals can

generate fully automatic shift ends. You can configure here if

- the staff logged on to the workplace should be logged off automatically at the end of the shift or

- if they should remain logged on.

Lock person (BDE)

If  you  enable  this  option,  the  person  is  no  longer  allowed  to  post  data  (e.g.  order  postings,

personnel  postings).  Requirement:  The  person  who  performs  the  posting  needs  to  enter  their

personal badge number in the posting dialog.

BDE (shop floor data collection) postings

Authorization level required to log on orders.

The  employee's  authorization  level  must  be  higher  than  or  equal  to  the  operation’s  authorization

level in order to log on, log off or interrupt an operation. To ensure this, the HYDRA server performs

a validation check.

HYDRA  waiting  period  processing  only  integrates  users  whose  authorization  level  for

OP  postings  is  greater  than  0.  This  is  particularly  important  if  shop  floor  data  collection

(BDE) and time & attendance (PZE) are used simultaneously as both modules refer to the

SIS-IPS_30.docx

Version: 1.0.19669

Page 13 of 22

Integrated HR Master

same  HR  master  data.  Therefore,  enter  the  value  "0"  in  this  field  for  employees  who  do

not perform BDE postings (e.g. administrative staff).

Log OP on

Uncheck this option and the person will no longer be allowed to log on operations. This setting is

independent from the authorization level.

Log OP off

Uncheck this option and the person will  no longer be allowed to log off operations. This setting is

independent from the authorization level.

If  you  disable  both  options  log  on  OP  and  log  off  OP,  the  person  is  only  able  to  report  part

quantities for operations and to interrupt operations.

Log off everyone

Use  this  option  to  specify  whether  the  user  is  allowed  to  use  the  terminal  function  “Log  off  all

employees” on Windows CTWIN/AIP terminals.

Change target quantity

If  this  option  is  selected,  the  user  is  allowed  to  change  an  operation's  target  quantity  on  the

terminal. To ensure this, the HYDRA server performs a validation check.

MDE authorization

Use this setting to specify the authorization level required for changing statuses via the terminal.

The  value  entered  here  must  be  higher  than  or  equal  to  the  value  entered  in  the  "Authorization

level" field of the status you want to assign. To ensure this, the HYDRA server performs a validation

check.

Change only if person is logged on

Use this option to specify that the employee is only allowed to change a status if the employee is

logged on to the relevant workplace/machine.

Change cycle/partitioning

If this option is selected, the employee is authorized to modify the Cycle and Partitioning (parts per

cycle) for an order at the terminal. To ensure this, the HYDRA server performs a validation check.

Change production lock

This option is only important if the dynamic dialog "production lock" (M_PSPERRE) is activated in

the Windows CTWIN/AIP terminal and this dialog includes the staff badge no. field. In this case, the

employee  is  only  allowed  to  activate  or  deactivate  the  production  lock  manually  if  they  are

authorized respectively, i.e. if this option is set.

SIS-IPS_30.docx

Version: 1.0.19669

Page 14 of 22

Integrated HR Master

This option is not effective if the production lock is set automatically along  with setting a

status.

Enable  the  dynamic  dialog  "production  lock"  (M_PSPERRE)  in  the  dynamic  dialog

configuration.

Status change of resources

Use this setting to specify the authorization level required for changing resource statuses.

This  authorization  can  only  be  used

in  conjunction  with

the

"Tool  and  Resource

Management“(WRM) module.

Reset maintenance (as of WRM 7.2)

If  this  option  is  set,  the  employee  can  use  the  HYDRA-WRM  function  "maintenances"  to  reset  a

maintenance at the Windows CTWIN/AIP terminal.

Enter measures (as of WRM 7.2)

If  this  option  is  set,  the  employee  can  use  the  function  "resource  comments"  to  enter  a

comment/measure at the Windows CTWIN/AIP terminal.

Installing/removing resources (WRM maintenance messages)

This option is only important if you use WRM maintenance messages. Enable this option to allow

the employee to install and/or remove the resource via the Windows terminal.

DNC download authorization

This  option  grants  authorization  for  the  employee  to  download  a  DNC  program  via  the  HYDRA

terminal.

This option can only be used in conjunction with the DNC module.

DNC upload authorization

This  option  grants  authorization  for  the  employee  to  upload  a  DNC  program  via  the  HYDRA

terminal.

This option can only be used in conjunction with the DNC module.

DNC release authorization

Authorization to release a blocked DNC program on the HYDRA terminal.

This option can only be used in conjunction with the DNC module.

Field descriptions of the Incentive wage tab

This  tab  includes  fields  for  the  calculation  of  incentive  wages  (HYDRA-LLE).  If  you  do  not  use  the

incentive wage module, you can leave all fields at their respective default values.

Premium indicator

Leave this field empty, if you do not use the incentive wage module.

SIS-IPS_30.docx

Version: 1.0.19669

Page 15 of 22

Integrated HR Master

This field defines the type of calculation used for incentive wages. You can specify the meaning of

this  option  according  to  your  requirements  while  implementing  the  incentive  wage  module  and

customizing the system.

Refer  to  your  customer  documentation  for  further  information  on  the  options  applicable  to  your

system.

To  customize  the  LLE  module,  use  the  "incentive  wage  indicator"  as  a  selection  criterion  for  the

wage type determination to calculate incentive wages. In this case, you can specify if an employee

works for a piece rate or group incentives.

Premium group (cid:129)

The premium group used for group calculation in the HYDRA incentive wage module. This setting is

currently not used but reserved for future use.

Premium factor

Reserved for future use.

Operator position/function

If  this  field  includes  a  value,  the  employee  is  logged  on  with  the  operator  function  defined  in  this

field,  provided that  no operator function is transferred in the  login  dialog. Once  the  employee  has

been logged off, the operator function is stored in the log record, record type "B".

Wage/premium indicator

If  this  field  includes  a  value,  the  employee  is  logged  in  with  the  wage/premium  indicator  that  is

defined in this field, provided that no wage/premium indicator is transferred in the login dialog. The

wage/premium  indicator  is  stored  in  the  BDE  log  record  (record  type  B),  once  the  employee  has

been logged off.

Wage type

You can assign this wage type to the time tickets using the wage type determination.

Wage group

Reserved for future use.

BDE/PZE comparison

Reserved for future use.

Field descriptions of the Time and labor data tab

Models

Assign a working time model and a payment model to each employee. Shift workers also require a shift

rhythm  model.  This  model  specifies  which  of  the  possible  shifts  of  the  shift  day  type  apply  to  that

employee. The payment model defines the pay which applies to that employee.

SIS-IPS_30.docx

Version: 1.0.19669

Page 16 of 22

Integrated HR Master

Working time model

The  working  time  model  which  applies  to  the  employee.  The  working  time  model  can  include

flextime and shift day types.

Shift rhythm model

The  shift  rhythm  model  that  specifies  the  sequence  of  shift  types  for  a  shift  worker  (or  employee

with flexible shift time).

Payment model

The payment model defines which payment day type applies on which day. The payment day type

defined in this model takes precedence over the payment day type defined in the working time day

type.

Overtime type

Number of the payment day type that specifies how to set overtime off against undertime.

Employment relationship

Here you can specify whether the employee in question is a salaried employee or not. This setting

does not affect data processing in any way. However, you can use the field to select employees.

  Average working time

The average working time per day entered here, rather than the planned working time, is set off in

the event of absence (holiday, sickness, etc.), provided that

- the Allocate average working time checkbox (see below) is selected, or

- the corresponding setting has been selected for the leave of absence planning.

Part-time rate

Use the percentage entered here as the multiplication factor for the target time in the working time

model.  The  calculated  target  time  is  rounded  to  the  nearest  full  minute.  You  can  use  this

percentage  to  manage  part-time  employees  without  having  to  create  a  separate  model  for  each

target time.

First allocation

Shows  the  date  that  this  employee  was  (or  will  be)  first  evaluated.  If  nothing  is  entered  here,  the

employee will be evaluated from the date they join the company.

Date of latest evaluation

This field shows the date on which the employee was last evaluated.

time sheet

Number of the time sheet for HYDRA@Web.

SIS-IPS_30.docx

Version: 1.0.19669

Page 17 of 22

Integrated HR Master

Leave entitlement

Use the HR master fields or configure the  leave entitlement to define the leave entitlement. If you

define the leave entitlement in the separate configuration dialog, the system automatically assigns

the  leave  entitlement  applicable  for  the  relevant  year  to  the  HR  master  fields  when  posting  the

leave entitlement on January 1st.

The sum of the field’s Annual leave, Special leave and Additional leave will be credited to the leave

account  (4th  account  in  the  Configuration  of  Accounts)  on  1st  January.  If  an  employee  joins  the

company during the course of the  year, enter the leave entitlement valid from the next  year on  in

these fields. You can store the leave entitlement for the remainder of the current year when you edit

accounts.

Any changes made to the  annual  leave  entitlement that is entered in  Annual leave, Special  leave

and Additional leave only take effect if the work day evaluation is performed on January 1st.

Enter the leave entitlement with a maximum of one decimal place, regardless of whether

the leave account is kept as day account or time account.

Business trip authorization

For  terminals  of  the  type  CT-38x  (and  for  combined  shop  floor  data  collection  and  time  &

attendance  terminals  with  the  AIP  or  CT-WIN  program),  the  authorization  for  business  trips

specifies whether the employee is allowed to use the 1st key for absence reasons on the terminal.

Lock person

If this checkbox is selected, then  this  employee  will  no longer    Labor time calculation and can  no

longer  Authorization  to  clock-in  and  out  time  &  attendance  terminals  (clocking  authorization).  In

addition,  locked  employees  are  neither  evaluated  in  the  personnel  time  management  module

(PZW) nor in personnel scheduling (PEP).

Person does not clock

If this option  is set, the message "absent  despite planned  working time" is not  generated and not

displayed  in  the  messages  listing  either.  During  the  frame  working  time,  the  attendance  overview

shows such employees with the status "Person does not clock" if they are absent and no absence

is planned for them.

Allocate average working time

If this checkbox is selected, all periods of absence are set off against the time entered in  average

working time.

Field descriptions of the Additional information tab

The Additional info tab can include up to 30 customer-specific fields. You can configure the label and data

type for each of the fields individually. For further information please refer to the document dealing  with

the configuration of HR master data and badge fields.

SIS-IPS_30.docx

Version: 1.0.19669

Page 18 of 22

Integrated HR Master

Editing functions

 Copy all selected staff

Use this function to create a new version for several employees at once and to change up to 10 HR

master fields in this new version:

You need the function authorization pemm to copy multiple employees at once.

The system always copies the person's version that is valid at the valid from date you entered.

In  this  case,  the  person's  version  you've  selected  in  the  HR  master  data  is  not  relevant.  The

system only takes the personnel number from this selected data record.

This function is only available if you enable the extension PersonsMassCopy.

SIS-IPS_30.docx

Version: 1.0.19669

Page 19 of 22

Integrated HR Master

 Edit all selected staff

Use  this  function  to  change  HR  master  data  for  several  employees  at  the  same  time.  You  can

select up to 10 HR master data fields and assign a value:

You need the function authorization pemm to edit multiple employees at once.

 Modify image

You can assign an image to the employee in the HR master data.

Toolbar

 Clocking authorizations

Calls the   Clocking authorizations.

 Access authorizations

Calls the   Access authorizations.

SIS-IPS_30.docx

Version: 1.0.19669

Page 20 of 22

Integrated HR Master

Current account balances

Calls the application Current account balances.

 Print staff badges

You need the function authorization pepb to print (pepb.print) and design (pepb.layout) staff

badges.

 Print staff badges

A window opens to print staff badges for the employees selected in the HR master data.

 Report designer

A separate document describes how to design staff badges.

Checking Business Parameter Containers (BSCs)

See here for further details on how to check the system against business parameters.

SIS-IPS_30.docx

Version: 1.0.19669

Page 21 of 22

Integrated HR Master

3  HR Master Changes

Overview

Menu

Master data  Individuals  HR master  changes

Transaction code

pecl

Function authorization

pecl

This  list  is  used  to  document  all  changes  regarding  individuals.  This  allows  the  staff  in  charge  to  trace

employee data processing for an extended period.

The list indicates a line with changes in personal data and the date of processing for each change.

 Display of changed data

By clicking on the '+' and/ '-' button at the beginning of each line, a table showing the changed HR

master fields will be opened and/or closed.

SIS-IPS_30.docx

Version: 1.0.19669

Page 22 of 22

