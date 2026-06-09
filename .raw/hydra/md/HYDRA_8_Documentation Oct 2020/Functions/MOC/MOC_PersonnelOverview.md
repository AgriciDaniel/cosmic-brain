Staff Logged On / Personnel Overview

1  Staff Logged On / Personnel Overview

Overview

Menu

Production control  Production overview  Staff logged on

Transaction code

pnov

Function authorization

pnov

Available user fields

Where?

Table

Object type/user field key

Source (type)

AGNR/SYSTEM

Operation (MF-D)

How to configure user fields?

Which user field types are available?

Purpose

The  personnel  overview  provides  a  clear  overview  of

the  staff  situation

in  production.

The information required is displayed from the point of view of the relevant person.

Integration

The personnel overview is an important  tool for planners and persons responsible for staff. At a glance,

the  user  gets  the  necessary  information  and  can  take  spontaneous  personnel  decisions.  If  quick  and

helpful  decisions  are  required  in  production,  the  personnel  overview  is  very  helpful  for  the  responsible

persons in their daily routine.

The personnel overview shows all persons that are currently logged on to a workplace and that match the

criteria specified in the selection pane. If the "waiting period processing" is active, the system also shows

those persons who are currently logged on to a waiting period operation.

Irrespective of the selections made below, the user can only view persons that are included in the

responsibility area the user is authorized for. To check the responsibility area authorization, the system

checks the responsibility area of the workplace where the person is logged on. If the person is logged on

to a waiting period operation, the system checks the responsibility area of the person.

Selection criteria

The application provides the following selection criteria:

Person from … to …

This  selection  criterion  refers  to  the  personnel  number  in  the  HR  master  data.  All  persons  are

shown that are included in the specified range of personnel numbers.

MOC_PersonnelOverview.docx

Version: 1.6.18468

Page 1 of 5

Staff Logged On / Personnel Overview

Employee group from … to …

This selection criterion refers to the employee group in the HR master data. All persons are shown

that  are  included  in  the  specified  employee  group.  You  can  also  run  a  search  using  wildcards

(placeholders *) in the field.

Last name

This selection criterion refers to the last name in the HR master data. All persons are displayed with

the selected last name. You can also use wildcards.

Company

This selection criterion refers to the company stored in the HR master data. All persons are shown

that are assigned to the selected company. You can also use wildcards.

Area

This selection criterion specifies the area stored in the HR master data. All persons are shown that

are assigned to the selected area. You can also use wildcards.

Cost center

This  selection  criterion  refers  to  the  cost  center  stored  in  the  HR  master  data.  All  persons  are

shown that are assigned to the selected cost center. You can also use wildcards.

Workplace from … to …

This selection criterion refers to the workplace stored in the machine or workplace master data. The

application  displays  all  persons  that  are  currently  logged  on  to  a  workplace  that  matches  the

specified selection criteria. You can use wildcards in the field.

Group from … to …

This  selection  criterion  refers  to  the  group  stored  in  the  machine  or  workplace  master  data.  The

application displays all persons that are currently logged on to  a workplace that is included in the

group specified. You can use wildcards in the field.

Cost center

This  selection  criterion  refers  to  the  cost  center  stored  in  the  machine  and/or  workplace  master

data.  The  application  displays  all  persons  that  are  currently  logged  on  to  a  workplace  that  is

assigned to the cost center specified. You can also use wildcards.

Order

The application displays all persons that are currently logged on to an order/operation of the order

number specified You can also use wildcards.

Order type

All persons are displayed that  are currently  logged on to an order/operation of  the selected  order

type.

MOC_PersonnelOverview.docx

Version: 1.6.18468

Page 2 of 5

Person logged on longer than

The application only shows persons that are logged on for a longer time than the value specified in

Staff Logged On / Personnel Overview

hours.

Detail application Staff logged on

Person category

Person

Personnel number according to the HR master data

Last name

Last name according to the HR master data

First name

First name according to the HR master data

Name

Entire name (last name, middle name and first name) according to the HR master data.

Staff badge

Staff badge number according to the HR master data.

Note: this column is only available if the user has the function authorization pers.

Company

Company that the person is assigned to according to HR master data.

Note: this column is only available if the user has the function authorization pers.

Area

Area that the person is assigned to according to HR master data.

Note: this column is only available if the user has the function authorization pers.

Department

Department that the person is assigned to according to HR master data.

Note: this column is only available if the user has the function authorization pers.

Cost center

Cost center that the person is assigned to according to HR master data.

Note: this column is only available if the user has the function authorization pers.

Employee group

Employee group that the person is assigned to according to HR master data.

Note: this column is only available if the user has the function authorization pers.

Operator position/function

Function of the operator (abbreviation) that the person used to log on to the workplace.

MOC_PersonnelOverview.docx

Version: 1.6.18468

Page 3 of 5

Staff Logged On / Personnel Overview

Condition:  The  Operator  positions  must  be  configured  for  the  workplace  and  the  input  dialog

requires an entry in field Operator position (depending on configuration).

Premium indicator

Premium indicator (abbreviation) that the person used to log on to the workplace.

Condition: The Wage/Premium indicators must be configured for the workplace and the input dialog

requires an entry in field Premium indicator (depending on configuration).

Logon category

Date

Time

The person is logged on to the workplace since the point in time (date) specified here.

The person is logged on to the workplace since the point in time (time) specified here.

Duration

The  person  is  logged  on  to  the  workplace  for  the  duration  displayed.  The  duration  is  calculated

using the logon time and the current time when data is requested.

Workplace category

Workplace

Number of the workplace where the person is logged on.

If  the  person  is  logged  on  to  a  waiting  period  operation,  this  field  displays  the  workplace  that  is

assigned to the person in the HR master data.

Group

Group that the workplace is assigned to according to the master data.

Cost center

Cost center that the workplace is assigned to according to the master data.

Company

Company that the workplace is assigned to according to the master data.

Order category

Order type

Order type of the operation where the person is logged on.

Order

Order number of the operation where the person is logged on.

Sequence

Sequence  number  of

the  operation  where

the  person

is

logged  on

(depending  on

customization/configuration).

OP

Number of the operation where the person is logged on.

MOC_PersonnelOverview.docx

Version: 1.6.18468

Page 4 of 5

Staff Logged On / Personnel Overview

Split

SOP

Split  number  of  the  operation,  if  the  operation  where  the  person  is  logged  on  is  a  split  operation

(depending customization/configuration).

Sub operation number (reserved).

Operation designation

Name of the operation where the person is logged on.

Article

Article number of the operation where the person is logged on.

Article designation

Name of the article produced in the operation where the person is logged on.

Toolbar

When  you  call  a  function  or  target  application,  the  parameters  of  the  table  are  transferred.  For  this

reason, always select an entry to call an application.

    Log person off (function authorization: pn.logoff)

You can use the function Log person off to log off a person from the specified workplace (this is not

possible with group workplaces or with a combined logon of order and persons).

 Order information (function authorization: orin)

Use this button to call the application Order information.

 Order overview (function authorization: orov)

Use this button to call the application Order overview.

MOC_PersonnelOverview.docx

Version: 1.6.18468

Page 5 of 5

