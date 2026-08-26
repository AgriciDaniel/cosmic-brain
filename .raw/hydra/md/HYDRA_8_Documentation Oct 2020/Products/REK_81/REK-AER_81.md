Manual

Automatic Generation of
Complaints
REK-AER 8.1

Version 1.0.1374

Last changed on: 19.06.2020

Automatic Generation of Complaints

Copyright

©Copyright 2020All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

REK-AER_81.docx

Version: 1.0.2399

Page 2 of 7

Automatic Generation of Complaints

Contents

1  Automatic Generation of Complaints - Overview ......................................... 4

2  Failure Types ............................................................................................... 5

REK-AER_81.docx

Version: 1.0.2399

Page 3 of 7

Automatic Generation of Complaints

1  Automatic Generation of Complaints - Overview

Fields of application

This function provides for the automatic generation of complaints including complaint details by assigning

especially characterized failure types during the inspection process.

Implementation notes

Utilization of this component is recommended, provided that detailed analyses in the form of complaints

are required  during the production process if specific failures occur. Due to the  automatic  generation  of

complaints, all essential pieces of information are already linked or part of the complaint without requiring

any  additional  input  efforts.  A  negative  goods  receipt  inspection,  for  example,  can  directly  result  in  a

supplier complaint.

Integration

This component is connected with the failure type recording function of inspection processes from goods

receipt, production and goods issue.

Features

These functions are provided.

  Automatic generation of complaints by assigning a failure type that includes the character “#” in

its designation.

  An  internal  complaint  is  generated  if  failures  are  assigned  in  production  or  goods  issue.  A

supplier complaint is generated if failures are assigned in the goods receipt area.

  A complaint detail is created automatically for each complaint. These fields are pre-assigned:

o  Article number

o  Drawing issue number

o  Production order number (user fields FU:1 in complaint details)

  The triggering failure type is created for the generated complaint detail.

REK-AER_81.docx

Version: 1.0.2399

Page 4 of 7

Automatic Generation of Complaints

2  Failure Types

Summary

Menu

Master data  Quality management  Failure types

Transaction code

ftyp

Function authorization

ftyp

The  catalog  of  failure  types  has  been  designed  to  describe  the  occurred  deviations  in  more  detail,  e.g.

deviations  from  specified  limit  values.  In  addition  to  the  other  failure  catalogs  (failure  location,  failure

cause,  causer),  the  failure  type  catalog  is  very  important  as  it  also  includes  inactive  failure  types  by

default. These inactive failure types are required for the generation of automatic failure types, e.g. in case

a limit value has not been respected. For this reason, these inactive failure types must not be deleted. All

inactive failure types that are important for the automatic generation of failures start with the ID number

"AUTO:". There are, for example, automatic failure types for

  Non-observance of the upper tolerance limit

  Non-observance of the lower tolerance limit

  Non-observance of action and warning limits

Failures the designation of  which includes the number sign (#)  automatically trigger the generation  of a

complaint if they  are assigned to  a measured value  of one of the areas in-production  inspection, goods

receipt inspection or goods issue inspection.

Utilization

The "failure analysis number" field is the key field, i.e. when saving a new failure type, the system checks

whether there is already a failure type with this key information.

The  input  of  failure  types  is  easy  to  handle.  Only  a  failure  analysis  number  and  a  corresponding

designation have to be assigned.

Failure  type  groups  may  optionally  be  defined  beforehand.  Consequently,  the  corresponding  group  can

be assigned to the respective failure type. This option should not be missed out as it provides improved

reports/evaluations. Groups can be assigned by opening the group tree using the magnifier function. The

hierarchical  tree  entries  of  the  group  tree  allow  for  the  requested  group  to  be  selected  and  taken  over.

Then  the  "groups"  field  of  the  editing  dialog  for  failure  types  shows  the  assigned  group  including  the

hierarchical group structure.

REK-AER_81.docx

Version: 1.0.2399

Page 5 of 7

Automatic Generation of Complaints

If failure types are presented in list form the group hierarchy is represented by the  columns "group 1" to

"group 5".

Groups  are  edited  in  the  "failure  type  groups"  application,  which  is  described  in  the  manual  entitled

"MOC_Groups.pdf".

Under  certain  circumstances,  it  might  be  reasonable  and  recommendable  to  use  a  self-explanatory

structure for the failure type number as failure key.

By differentiating between active and inactive failure types, it can be defined whether or not they are still

to be available in failure selection lists in the later data acquisition process. However, it is also possible to

evaluate inactive failure types at any time. Moreover, inactive failure types can be reactivated at any time.

Integration

The  failure  types  catalog  is  used,  among  other  things,  within  measurement  recording  and  in  complaint

management. If deviations are detected in measurement recording the failure catalogs help describe the

deviations in more detail and represent it in a way that allows for analyses/reports to be performed. Only

in  this  way  is  it  possible  to  determine  failure  mode  analyses,  take  appropriate  action  (measures)  and

prevent the deviation from reoccurring.

In addition, this catalog is the basis for failure mode analyses relating to the failure types.

This catalog is also required for the creation of analysis selection catalogs as well as for using inspection

chart characteristics within inspection planning and measurement recording. An analysis selection catalog

includes  a  subset  of  all  failures  and  restricts  the  list  of  failure  (types)  that  can  be  selected  during  the

collection  process  to  those  failures  of  the  analysis  selection  catalog  assigned  to  the  characteristic.

Consequently, the analysis selection catalog also determines the list of failure types for inspection chart

characteristics.

Prerequisite

Functional requirements from other applications do not have to be met to be able to use this function.

Selection criteria

Selection criteria are self-explanatory and are not described separately. Failure types of a group can be

filtered in the "groups" tab using the icon

 and selecting a failure type group (in tree structure). The

group tree list provides a function to cancel and accept the entries made.

The "inactive" filter field allows for the data set to be restricted to active or inactive failure types.

REK-AER_81.docx

Version: 1.0.2399

Page 6 of 7

Automatic Generation of Complaints

Field descriptions

The available fields are self-explanatory and are not explained separately.

The "inactive" check box identifies failure types that are no longer to be used in the active data acquisition

process.

In a tree structure the group field shows the assigned group or allows for groups to be assigned in form of

the tree structure.

Toolbar

There are no other special function buttons in addition to the standard functions.

REK-AER_81.docx

Version: 1.0.2399

Page 7 of 7

