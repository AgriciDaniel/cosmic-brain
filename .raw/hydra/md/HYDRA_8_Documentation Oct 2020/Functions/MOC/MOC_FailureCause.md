Failure Causes

1  Failure Causes

Summary

Menu

Master data  Quality management  Failure causes

Transaction code

fcau

Function authorization

fcau

The catalog of failure causes has been designed to describe the occurred defects/failures in more detail,

e.g. if limit values have been infringed.

Utilization

The  "failure  analysis  number"  field  is  the  key  field,  i.e.  when  saving  a  new  failure  cause,  the  system

checks whether there is already a failure cause with this key information.

The input of failure causes is easy to handle. A failure analysis number and a corresponding designation

only have to be assigned.

Failure cause groups may optionally be defined beforehand. Consequently, the corresponding group can

be assigned to the respective failure cause. This option should not be missed out as it provides improved

reports/evaluations. Groups can be assigned by opening the group tree using the magnifier function. The

requested group may be selected and taken over in the group tree by way of the hierarchical tree entries.

The  assigned  group  including  the  hierarchical  group  structure  then  appears  in  the  "groups"  field  of  the

editing dialog.

If failure causes are presented in list form the group hierarchy is represented by the columns "group 1" to

"group 5".

Groups  are  edited  in  the  "failure  causes  groups"  application,  which  is  described  in  the  manual  entitled

"MOC_Groups.pdf".

Under  certain  circumstances  it  might  be  reasonable  and  recommendable  to  use  a  self-explanatory

structure for the failure cause number as failure key.

By differentiating between active and inactive failure causes, it can be defined whether or not they are still

to be available in failure selection lists in the later data acquisition process. However, it is also possible to

evaluate inactive failure causes at any time. Moreover, inactive failure causes can be reactivated at any

time.

MOC_FailureCause.docx

Version: 1.0.1362

Page 1 of 2

Failure Causes

Integration

The  failure  cause  catalog  is  used,  among  other  things,  within  measurement  recording  and  in  complaint

management.  If  deviations  with  respect  to  tolerance  limits  are  detected  in  measurement  recording  the

failure cause catalog helps describe the actual failure cause in more detail and represents it in a way that

allows for analyses/reports to be made. Only in this way is it possible to determine failure mode analyses,

take appropriate action (measures) and prevent the deviation from reoccurring.

In addition this catalog is the basis for failure mode analyses relating to the failure cause.

The  failure  causes  of  this  catalog  can  also  be  integrated  in  analysis  selection  catalogs.  An  analysis

selection  catalog  includes  a  subset  of  all  failures  and  restricts  the  list  of  failure  (causes)  that  can  be

selected  during  the  collection  process  to  those  of  the  analysis  selection  catalog  assigned  to  the

characteristic.

Prerequisite

Functional requirements from other applications do not have to be met to be able to use this function.

Selection criteria

Selection criteria are self-explanatory and are not described separately. Failure causes of a group can be

filtered in the "groups" tab using the

 icon and selecting a failure cause group (in tree structure). The

group tree list provides a function to cancel and accept the entries made.

The "inactive" filter field allows for the data set to be restricted to active or inactive failure causes.

Field descriptions

The available fields are self-explanatory and are not explained separately.

The  "inactive"  check  box  identifies  failure  causes  that  are  no  longer  to  be  used  in  the  active  data

acquisition process.

In a tree structure the group field shows the assigned group or allows for groups to be assigned in form of

a tree structure.

Toolbar

There are no other special function buttons in addition to the standard functions.

MOC_FailureCause.docx

Version: 1.0.1362

Page 2 of 2

