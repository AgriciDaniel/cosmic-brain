Cost Types

1  Cost Types

Overview

Menu

Master data  Quality management  Cost types

Transaction code

Function authorization

co

co

This master data catalog has been designed to define different cost types at a central place providing the

option of pre-assigning cost rates and durations as well as to define and assign cost groups.

Utilization

The "cost type" field is the key field, i.e. while saving a new cost type, the system checks whether there is

already a cost type with this key information.

MOC_CostType.docx

Version: 1.0.1362

Page 1 of 4

Cost Types

When a new cost type is created or an existing cost type is changed, the selection lists "areas" and "valid

for" define to which areas and modules the cost type applies. Selection lists allow for several entries to be

selected.  Consequently,  it  is  possible  to  assign  a  cost  type,  e.g.  to  the  areas  "goods  receipt"  and

"production" but not to the "goods issue". When costs are later assigned to a complaint, it is possible to

restrict the cost types accordingly by filtering specific areas and modules in the selection list of costs.

The  initialization  of  an  amount  may,  for  example,  be  enabled  when  selecting  a  cost  type  by  entering  a

value  in  the  "initialization  amount"  and  "init  duration"  fields.  This  simplifies  the  collection  of  complaint

costs considerably. This function should be applied,  in particular for, potential  lump sum costs, such as

"delivery/shipment", "processing fee" or "rework". Provided that fixed lump sum costs or lump sum hourly

rates (e.g. for rework) are to be defined, the field "initialization amount" is to be assigned to the cost rate

and the field "init duration" is to be assigned the value 1, for example. If a cost type that is configured in

such a way is assigned to a complaint, the "amount" field immediately shows the initial  amount and the

"duration"  field"  shows  the  initial  duration.  Before  saving  this  assignment,  the  duration  may  still  be

changed  e.g.  to  1:30  (1  hour  and  30  minutes).  Once  saved,  the  value  entered  in  the  "amount"  field  is

multiplied by the specified duration and saved as the new cost rate.

Cost  type  groups  may  optionally  be  defined  beforehand  and  the  relevant  group  can  be  assigned  to  the

cost type. This option should not be missed out as it provides improved reports/evaluations. Groups can

be assigned by opening the group tree using the magnifying glasses function. The requested group may

be  selected  and  taken  over  in  the  group  tree  by  way  of  hierarchical  tree  entries.  The  assigned  group

including the hierarchical group structure can then be found in the "groups" field of the editing dialog for

the cost types.

The columns "group 1" to "group 5" represent the group hierarchy if cost types are displayed in lists.

Groups  are  edited  in  the  "cost  type  groups"  application,  which  is  described  in  the  manual  entitled

MOC_Groups.pdf.

Under  certain  circumstances,  it  might  be  reasonable  and  recommendable  to  use  a  self-explanatory

structure for cost type numbers as cost key.

By distinguishing between active and inactive cost types, it can be defined whether or not they are still to

be available  in selection lists for the costs in the data acquisition process. However, inactive cost types

may still be evaluated at any time. Moreover, inactive cost types may also be reactivated at any time.

Integration

The  cost  type  catalog  is  used  in  the  complaint  module  to  record  complaint  costs.  In  addition  to  this,  it

represents the basis for the analysis of complaint costs.

MOC_CostType.docx

Version: 1.0.1362

Page 2 of 4

Cost Types

Prerequisite

Functional requirements from other applications do not have to be met to be able to use this function.

Selection criteria

Selection criteria are self-explanatory and not described separately. Cost types of a group can be filtered

in the "groups" tab using the icon

 and selecting a cost type group (in tree structure). The group tree

list provides a function to cancel and accept the entries made.

The "inactive" filter field allows for the data set to be restricted to active or inactive cost types.

Field descriptions

The sections that follow describe the selection criteria that are not self-explanatory.

Cost type

ID number of the cost type

Cost designation

Designation of the cost type

Inactive

The  "inactive"  check  box  identifies  cost  types  that  are  no  longer  to  be  used  in  the  active  data

acquisition process.

Valid for

Modules/applications for which the cost type applies. A selection list is available.

Areas

Areas  for  which  the  cost  type  applies.  A  selection  list  is  available,  e.g.  goods  receipt,  production,

goods issue, complaint management.

Initialization amount

Definition of the initial amount that is, for example, to be pre-assigned when assigning a cost type

to a complaint.

Init duration

Definition of the initial duration that is, for example, to be pre-assigned when assigning a cost type

to a complaint.

MOC_CostType.docx

Version: 1.0.1362

Page 3 of 4

Cost Types

Cost rate amount

Should  be  assigned  to  the  same  value  as  in  "initialization  amount",  as  this  amount  is  also  saved

when assigning a cost type to a complaint. The "cost rate amount" field shows the original amount if

the duration and, as a result, the cost rate (after saving) is changed when assigning costs or if the

cost rate is changed directly.

Groups

In a tree structure the group field shows the assigned group or allows for groups to be assigned in

form of the tree structure.

Toolbar

There are no other special function buttons in addition to the standard functions/features.

MOC_CostType.docx

Version: 1.0.1362

Page 4 of 4

