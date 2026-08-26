Failure Locations

1  Failure Locations

Summary

Menu

Master data  Quality management  Failure locations

Transaction code

floc

Function authorization

floc

The catalog of failure locations has been designed to describe the deviations occurred in more detail, e.g.

deviations from specified limit values.

Utilization

The  "failure  analysis  number"  field  is  the  key  field,  i.e.  when  saving  a  new  failure  location,  the  system

checks whether there is already a failure location with this key information.

The  input  of  failure  locations  is  easy  to  handle.  A  failure  analysis  number  and  a  corresponding

designation only have to be assigned.

Failure  location  groups  may  optionally  be  defined  beforehand.  Consequently,  the  corresponding  group

can  be  assigned  to  the  respective  failure  location.  This  option  should  not  be  missed  out  as  it  provides

improved  reports/evaluations.  Groups  can  be  assigned  by  opening  the  group  tree  using  the  magnifier

function.  The  requested  group  may  be  selected  and  taken  over  in  the  group  tree  by  way  of  the

hierarchical  tree  entries.  The  assigned  group  including  the  hierarchical  group  structure  then  appears  in

the "groups" field of the editing dialog.

If failure locations are presented in list form the group hierarchy is represented by the columns "group 1"

to "group 5".

Groups  are  edited  in  the  "failure  location  groups"  application,  which  is  described  in  the  manual  entitled

"MOC_Groups.pdf".

Under  certain  circumstances,  it  might  be  reasonable  and  recommendable  to  use  a  self-explanatory

structure for the failure location number as failure key.

By differentiating between active and inactive failure locations, it can be defined whether or not they are

still  to  be  available  in  failure  selection  lists  in  the  later  data  acquisition  process.  However,  it  is  also

possible  to  evaluate  inactive  failure  locations  at  any  time.  Moreover,  inactive  failure  locations  can  be

reactivated at any time.

MOC_FailureLocation.docx

Version: 1.0.1362

Page 1 of 2

Failure Locations

Integration

The failure location catalog is used, among other things, within measurement recording and in complaint

management. If deviations are detected in measurement recording the failure catalogs help describe the

deviation in more detail and represent it in a way that allows for analyses/reports to be performed. Only in

this  way  is  it  possible  to  determine  failure  mode  analyses,  take  appropriate  action  (measures)  and

prevent the deviation from reoccurring.

In addition this catalog is the basis for failure mode analyses relating to the failure locations.

The  failure  locations  of  this  catalog  can  also  be  integrated  in  analysis  selection  catalogs.  An  analysis

selection  catalog  includes  a  subset  of  all  failures  and  restricts  the  list  of  failure  (locations)  that  can  be

selected during the collection process to those failures of the analysis selection catalog that is assigned to

the characteristic.

Prerequisite

Functional requirements from other applications do not have to be met to be able to use this function.

Selection criteria

Selection criteria are self-explanatory and are not described separately. Failure locations of a group can

be  filtered  in  the  "groups"  tab  clicking  the  icon

  and  selecting  a  failure  location  group  (in  tree

structure). The group tree list provides a function to cancel and accept the entries made.

The "inactive" filter field allows for the data set to be restricted to active or inactive failure locations.

Field descriptions

The available fields are self-explanatory and are not explained separately.

The  "inactive"  check  box  identifies  failure  locations  that  are  no  longer  to  be  used  in  the  active  data

acquisition process.

In a tree structure the group field shows the assigned group or allows for groups to be assigned in form of

a tree structure.

Toolbar

There are no other special function buttons in addition to the standard functions.

MOC_FailureLocation.docx

Version: 1.0.1362

Page 2 of 2

