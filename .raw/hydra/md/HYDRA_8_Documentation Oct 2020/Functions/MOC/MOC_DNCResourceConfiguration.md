DNC resource configuration

1  DNC resource configuration

Overview

Menu

Master data  Resources  DNC resource configuration

Transaction code

dncres

Function authorization  mdres.*

You  use  the  DNC  resource  configuration  to  view  and  edit  DNC  resources.  The  functionality  is  basically

identical to the one of the resource configuration.

Purpose

You can use the DNC resource configuration to create and edit DNC resources. The application shows all

resources matching the conditions you specified in the selection parameters.

Integration

Use the master data function "Resource configuration" to create, edit or delete any resources.

Selection criteria

The application provides the following selection criteria:

Resource from ... to ...

This selection criterion refers to the resource. You can also use wildcards (placeholders *).

Resource status

Status of the resource

Resource type

Type of resource.

Designation

Name of the resource.

File name

File name assigned to the resource

Cost center

Cost center of the resource.

Resource family

The resource family to which the resource is assigned.

MOC_DNCResourceConfiguration.docx  Version: 1.4.134650

Page 1 of 3

DNC resource configuration

Responsibility area

Responsibility area to which the resource is assigned.

Storage location

Regular storage location of the resource.

MD user fields

MD  user  fields  1-  6  of  the  resource.  If  you  select  a  resource  family  in  the  selection  panel,  the

application shows the field names according to the assigned user field definition.

Field descriptions

You can find the field descriptions in the application "Resource configuration".

Toolbar

The individual functions of the toolbar are included in the application "Resource configuration".

Notes on processing

The  application  DNC  resource  configuration  automatically  restricts  the  number  of

displayed  data  records.  If  you  select  the  selection  criteria  and  the  number  of  resulting

data  records  is  higher  than  500,  the  system  issues  a  message  that  you  must  further

narrow  down  the  result  by  adding  further  selection  criteria.  You  can  configure  the

number of data records that triggers this automatic message.

The  application  DNC  resource  configuration  identifies  the  number  of  resulting  data  records  when  you

request data after having entered the selection criteria. If the number exceeds 500 data records, the data

request is interrupted. A message is issued that asks you to narrow down the selection. If the number of

data records is smaller than 500, the data records are displayed in the application.

You  can  configure  the  limit  value  individually  (i.e.  set  a  value  >500).  Enter  the  respective  value  in  the

application "INI data configuration" (transaction code: inidcfg).

Required INI data configuration

Field

Value

Comment

Name

DNC

Always: DNC

Section

RESOURCELIMIT

Always: RESOURCELIMIT

Key

COUNT

Always: COUNT

MOC_DNCResourceConfiguration.docx  Version: 1.4.134650

Page 2 of 3

DNC resource configuration

Value

Integer value

Limit  value  for  the  automatic  restriction  of  displayed

data  records

in

the  application  DNC  resource

e.g. 1000

Active

Yes

configuration.

Always: Yes

MOC_DNCResourceConfiguration.docx  Version: 1.4.134650

Page 3 of 3

