  Documentation of Inspection Results Word Reports

1  Documentation of Inspection Results Word Reports

Usage

The certificate shows header data of the inspection requirement as well as inspection results of included

characteristics. Data of XML files listed in the section dealing with data sources is used.

Requirements

The  certificate  is  created  using  the  inspectionrequirement_certificate_en.dotm  template  and  the  macro

library hydramacrolibrary.dotm.

Procedure

Reports  are  created  using  the  InspectionRequirementExport  application  that  is  started  by  the  button

“output form” of the initial sample application.

Data sources

1.  root-<Zähler1>_ReqList.xml

Includes header data of inspection requirements.

Zähler1 corresponds to the inspection requirement selected in MOC.

1.1.  root-<Zähler1>-<Zähler2>_CharList_Req.xml

Includes  characteristics  of

the  higher-level

inspection

requirement  and  characteristic

specifications.

Zähler1  corresponds  to  the  higher-level  inspection  requirement  to  which  characteristics  are

assigned

Zähler2 corresponds to the set of characteristics. In the inspection requirements area this is only

one set and, as a result, Zähler2 is always 1.

1.2.  root-<Zähler1>-1-<Zähler2>_Statistics_Req.xml

Includes the statistical values for the corresponding characteristic.

Subject to the structure of XML files, Zähler2 is always 1.

2.

InspectionRequirement_Certificate_de.xml

Includes  detail  data  for  print  control  such  as  the  user  name  by  which  the  report  was  requested  in

MOC.

Documentation_InspectionRequirement_Certificate.docxVersion:

1.0.1362

Page 1 of 2

  Documentation of Inspection Results Word Reports

Structure

The certificate is divided into header area and detail area.

The header area only shows data from root-<Zähler1>_ReqList.xml.

The table that is stored there only provides layout functions.

The detail area shows characteristics including corresponding specifications in a structured way within a

table.

Root-<Zähler1>-<Zähler2>_CharList_Req.xml is linked to this table as data source.

In the columns “result (xquer)”, “minimum” and “maximum” the cells are merged and include a sub-table

listing inspection results. Root-<Zähler1>-1-<Zähler2>_Statistics_Req.xml is linked as data sources to

this table.

The  content  of  InspectionRequirement_Certificate_en.xml  is  used  in  the  footer  only.  But  it  is  also

available beyond the footer to modify the certificate.

UserExits in use

Only  the  UserExit  UeFillRowFromXmlAfter  is  used.  In  this  UserExit  entries  of  the  CharacteristicList

table are removed from the column “attributive result” (fourth column) if the “variable” value is set in the

data element node /qmcharacteristic.inspection_type.designation_short.

Documentation_InspectionRequirement_Certificate.docxVersion:

1.0.1362

Page 2 of 2

