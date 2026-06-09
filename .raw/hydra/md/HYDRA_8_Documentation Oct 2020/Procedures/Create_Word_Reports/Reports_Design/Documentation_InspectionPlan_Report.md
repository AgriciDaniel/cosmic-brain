Documentation of Inspection Plan Word Reports

1  Documentation of Inspection Plan Word Reports

Usage

The  report  shows  header  data  of  an  inspection  plan  as  well  as  the  specifications  of  the  included

characteristics.

The data of XML files listed in the section dealing with data sources is used.

Requirements

The  inspection  plan  overview  is  created  using  the  inspectionplan_overview_en.dotm  template  and  the

macro library hydramacrolibrary.dotm.

Procedure

Reports  are  created  using  the  InspectionRequirementExport  application  that  is  started  by  the  button

“output form” of the initial sample application.

Data sources

XML  data  sources  are  structured  hierarchically  and  by  counters.  There  is  an  XML  file  with  detailed

information on this data record for each data record of the correspondingly higher-level XML file.

1.  root-<Zähler1>_InspectionPlanList.xml

Includes header data of the inspection plan

Zähler1 corresponds to the sampling scheme selected in MOC

1.1.  root-<Zähler1>-<Zähler2>_InspectionPlanCharacteristicList.xml

Includes the characteristics from the higher-level inspection plan and their specifications.

Zähler1 corresponds to the higher-level sampling scheme which the characteristics are assigned

to.

Zähler2 corresponds to the set of characteristics. In the sampling scheme area this is only one

set and, as a result, Zähler2 is always 1.

Structure

The report is divided into header area and detail area.

The header area only shows data from root-<Zähler1>_InspectionPlanList.xml.

The table that is stored there only provides layout functions.

The detail area shows the characteristics including corresponding specifications in a table.

Documentation_InspectionPlan_Report.docxVersion: 1.0.1362

Page 1 of 2

Documentation of Inspection Plan Word Reports

Root-<Zähler1>-<Zähler2>_InspectionPlanCharacteristicList.xml  is  linked  as  data  source  to  this

table.

UserExits in use

Only the UserExit UeFillTableFromXmlAfter is used. In this UserExit the first column OP seq No. of the

Characteristics table is sorted in ascending order.

Documentation_InspectionPlan_Report.docxVersion: 1.0.1362

Page 2 of 2

