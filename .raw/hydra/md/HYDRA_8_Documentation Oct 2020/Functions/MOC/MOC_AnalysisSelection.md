Analysis Selection

1  Analysis Selection

Summary

Menu

Master data  Quality management  Analysis selection

Transaction code

asc

Function authorization

asc

Analysis selection catalogs allow for the set of failure types, failure locations, failure  causes, originators,

and measures that are available in measurement recording to be restricted specifically.

The overall application is divided into two hierarchical levels. A master-detail grid is used for presentation.

The  data  records  of  the  analysis  selection  are  created  on  the  first  level.  One  level  below,  the

corresponding  failure  types,  locations,  causes,  originators  and  measures  are  assigned  to  these  data

records of the analysis selection. There is a separate tab for each assignment type on this second level.

Separate function keys to  create,  edit or delete data  records are  available on each level of the master-

detail grid.

Utilization

The  analysis  selection  number  identifies  the  data  records  of  the  analysis  selection  uniquely  in  all  QM

applications in which they may be selected and assigned.

A data record of an analysis selection catalog only consists of a number and designation as well as of the

flag  to  disable  it  ("inactive"  field).  The  most  crucial  factor  here  is  the  possibility  to  assign  failure  types,

locations, causes, originators and measures to a data record of the analysis selection.

If a characteristic is assigned an analysis selection catalog only the failure types, failure locations, failure

causes,  originators  and  measures  listed  in  this  catalog  will  be  available  for  this  characteristic  when

measured values are recorded. Consequently, the failure list, for example, can be designed in relation to

characteristics.

Analysis selection catalogs are mainly used for the assignment to an inspection chart characteristic. An

assignment is almost mandatory for inspection chart characteristics, as in any other case, the user may

choose  from  the  whole  set  of  failure  types  of  the  entire  master  data  catalog  when  recording  measured

values for this characteristic. This would make inspections confusing and too complex.

MOC_AnalysisSelection.docx

Version: 1.0.1362

Page 1 of 2

Analysis Selection

Integration

Analysis selection catalogs are used in all applications dealing with characteristics. By assigning analysis

selection  catalogs  in  these  applications,  the  selection  list  for  failures,  originators  and  measures  is

restricted for measurement recording.

Prerequisite

The master data for failure types, failure locations, failure causes, originators and measures need to be

maintained before this function can be used in a useful manner.

Selection criteria

Selection criteria are self-explanatory and are not described separately.

Field descriptions

The available fields are self-explanatory and are not explained separately.

The check box "inactive" identifies data records of the analysis selection that are no longer to be used for

the definition of characteristics (of inspection plans/inspection orders).

MOC_AnalysisSelection.docx

Version: 1.0.1362

Page 2 of 2

