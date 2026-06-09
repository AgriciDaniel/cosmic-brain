Transitional Definitions

1  Transitional Definitions

Summary

Menu

Master data  Quality management  Transitional definitions

Transaction code

tdef

Function authorization

tdef

The transitional definitions define according to which rules inspection severities of an inspection severity

definition are switched within dynamic modification.

Utilization

The  “transitional  definition”  field  uniquely  identifies  a  transitional  definition  in  the  corresponding  QM

applications.  This field is the key field  at the same time, i.e.  while saving  it  is checked whether there  is

already a data record with this key information.

The  transitional  definition  "DIN_ISO  is  an  initially  existing  entry,  which  can  neither  be  changed  nor

deleted.

Different transitional definitions can be created. They are, in turn, assigned the transitional rules between

the individual inspection severities. Each transitional definition must be assigned a catalog of inspection

severities to make sure that a range of inspection severities is available for defining the rules.

Integration

The following applications use transitional definitions.

  Dynamic modification norm (master data – quality management)



Inspection planning (inspection plan header and inspection plan characteristics) for goods receipt

and goods issue

Prerequisite

Inspection  severities  need  to  be  created  before  transitional  definitions  can  be  defined.  The  "transitional

definition" application, if considered individually, is not functional. To make it a useful application, it has to

be used within inspection planning.

Selection criteria

Selection criteria are self-explanatory and are not described separately.

MOC_TransitionalDefinition.docx

Version: 1.1.1362

Page 1 of 2

Transitional Definitions

Field descriptions

The available fields are self-explanatory and, as a result, not explained separately.

There is a selection list including acceptance function to assign inspection severity definitions.

Toolbar

Transitional definition

Assignment of rules for switching within inspection severities

Function  to  assign  rules  for  changing  inspection  severities  to  a  previously  defined  and  selected

transitional definition.

Detail applications

"Transition" detail application

At a glance, the list of transitions shows all entries (the actual rules for the transitions between inspection

severities)  made  for  a  transitional  definition.  The  detail  application  for  a  defined  transition  makes  the

single information clearer.

When creating a transition, the inspection severity for which a transition to a reduced inspection severity

and to an increased inspection severity is to be created, is to be specified at first. A selection list including

the inspection severities is available for this purpose. This list is already filtered to the inspection severity

definition that has been defined for the transitional definition.

When switching to a reduced inspection severity, the number of inspections may be indicated that have to

be  completed  with  "pass"  in  a  row  to  go  to  the  new  inspection  severity.  The  selection  list  of  inspection

severities may be opened in this case as well.

When  switching  to  an  increased  inspection  severity,  the  number  of  inspections  may  be  indicated  that

have to be completed with "fail" in a row to go to the new inspection severity. To do so, the "number of fail

inspections  in  a  row"  field  has  to  be  checked.  Once  the  "number  of  fail  inspections  in  a  row"  field  has

been checked, it may be specified how many inspections out of x inspections have to be completed with

"fail" to go to the new inspection severity. In this context, the "fail" inspections do not have to be in a row.

The corresponding selection list may be opened here as well to enter the inspection severity.

Field descriptions

In  connection  with  the  descriptions  made  for  the  "transitions"  detail  application,  the  available  fields  and

selection lists are self-explanatory and, as a result, not explained separately.

MOC_TransitionalDefinition.docx

Version: 1.1.1362

Page 2 of 2

