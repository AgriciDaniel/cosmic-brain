Application-relevant customizing in SAP

1  Application-relevant customizing in SAP

Defining QM subsystem

In QM-IDI interface operations are only transferred if a subsystem is assigned to them. The assignment is

done at  the  work centre in SAP.  Each  work centre can be assigned to one subsystem only,  whereas  a

subsystem can be assigned to multiple work centers.

QM subsystems can be created in SAP using by IMG Quality Management  QM in Logistics  QM in

Procurement  Define QM Systems.

Defining origin of results data

In  SAP  QM  it  is  possible  to  indicate  the  origin  at  the  inspection  result.  For  that,  several  origins  can  be

defined  in  the  IMG.  To  enable  HYDRA  to  support  this  field/information  it  is  necessary  to  maintain  the

value created in SAP in HYDRA as well.

Origin  of  results  data  can  be  created  in  SAP  using  IMG  Quality  Management    Quality  Inspection  

Results Recording  Define Origins of Results Data

Defining detail level for error messages

When defining QM subsystems, the trace level can be defined. In the IDI interface, all error messages as

well as changes to the worklist are written to an application log.

The  exceptions,  messages  of  the  QIERRTAB  error  log,  and  the  beginning  and  end  of  a  function  are

recorded.  In  Customizing,  you  can  define  the  level  of  detail  for  the  application  log.  Use  the  RQEIFML1

report to display the application log. Use the RQEIFML2 report to delete the log.

Defining selected set / plant for usage decision

At the level of the inspection type it can be defined in SAP if a selected set shall be used and if only plant

specific catalogs can be used for the final usage decision.

The download of catalogs for the usage decision together with the inspection lot depends depends on the

selection options for the selected set and the plant.

In  HYDRA

these

settings  will

be

used

to

pre-select

the

available

catalogs.

SAP_QMIDI_Customizing_SAP.docx

Version: 1.0.1362

Page 1 of 1

