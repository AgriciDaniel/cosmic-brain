Failure

1  Failure

Summary

Menu

Master data   Quality management   Failure

Master data   Quality management  Failure location

Master data   Quality management  Failure cause

Master data  Quality management  Originator

Transaction code

ftyp for failure type

floc for failure location

fcau for failure cause

ori for originator

Function authorization

ftyp

There is a standardized catalog for failure types, cause and originator.  The system differentiates entries

using the failure types. There is an entry for each failure type in the menu.  When requesting the application

via the menu, the system opens the application and filters it to the individual failure type.  The application

can also be opened using a pre filter via the relevant transaction code.

Generally, the system uses the catalogs to clearly outline the failure.

Purpose

The "failure analysis number" field is the key field, i.e. when saving a new failure type, the system checks

if a failure type with this key information exists.

The input of failure types is quite simple and only requires the assignment of a failure analysis number and

name.

The system defines a failure type group beforehand and assigns the failure to the relevant group.  This

option should not be missed out as it provides improved reports/evaluations. The system assigns groups

by opening the group tree using the magnifying button. The requested group may be selected and taken

over in the group tree by way of the hierarchical tree entries. In the field "Groups" of the maintenance dialog

of the failure cause the assigned group with hierarchical group structure appears.

The displayed list presents the group hierarchy with the columns “group 1 to group 5”.

The system executes the maintenance of groups in the relevant failure group maintenance as is outlined in

the manual „MOC_Groups.pdf“.

Under certain circumstances, we recommend the use of a self-explanatory structure of the failure number

as a failure key.

MOC_Failure.docx

Version: 1.1.5943

Page 1 of 2

Failure

By  differentiating  between  active  and  inactive  failure  types,  the  system  defines  if  the  failure  type  is  still

available in failure selection lists in the later data acquisition process. Evaluations using inactive failure are

still available.  The system can also activate inactive failures.

Integration

Defect  catalogs  are  used  sometimes  in  measurement  recording  and  complaint  management.  The

evaluation  of  measured  values  can  identify  and  later  on  evaluate  the  individual  failure  during  quality

deviations.  Only in doing so, it is possible to identify the main failures, take appropriate action (measures)

and prevent the defects from recurring.

In addition, this is the basis for failure mode analysis.

The  system  can  also  integrate  failures  in  the  analysis  selection  catalogs.  An  analysis  selection  catalog

includes a subset of all failures and restricts the list of failures to be selected during the collection process

to those of the analysis selection catalog assigned to the characteristic.

Requirements

Functional requirements from other applications must not be met in order to use this function.

Selection criteria

Selection criteria are self-explanatory and not described separately. The tab "Group" using the symbol

and the selection of a group (in the tree structure) can filter the failure groups.  The group tree list provides

a function to cancel and accept the entries made.

The "inactive" filter field allows the data set to be restricted to active or inactive failures.

Field descriptions

The available fields are self-explanatory and not explained separately.

The "inactive" check box identifies failures that are no longer used in the active data acquisition process.

In a tree structure, the group field shows the assigned group or allows groups to be assigned in form of the

tree structure.

Toolbar

There are no other special function buttons in addition to the standard functions/features.

MOC_Failure.docx

Version: 1.1.5943

Page 2 of 2

