|     |     |     | InspectionRequirementExport  |     |
| --- | --- | --- | ---------------------------- | --- |

1  InspectionRequirementExport
| 1.1    | Restriction of Data Source  |     |     |     |
| ------ | --------------------------- | --- | --- | --- |
| 1.1.1  | Implementation              |     |     |     |
Purpose
The MOC cannot automatically identify which data sources are actually required for specific reports using
Word reporting templates.  The application can restrict the data source to export in order to reduce
processing times.
Requirements
The report must be created as a template.  „InspectionRequirementExport" is the assigned export
program.
Procedure/implementation
The configuration for  the form must contain the following setting  in the field additional  parameter:
ExportData:<Abbrev. of data source 1>,< Abbrev. of data source 2>,< Abbrev. of data source 3>,….]
Example.:

| DataSourcesReduction.docx  |     | Version: 1.0.19468  |     | Page 1 of 3  |
| -------------------------- | --- | ------------------- | --- | ------------ |

|     |     |     | InspectionRequirementExport  |     |     |
| --- | --- | --- | ---------------------------- | --- | --- |

| 1.1.2                    | Overview of all data sources  |                              |              |          |               |
| ------------------------ | ----------------------------- | ---------------------------- | ------------ | -------- | ------------- |
| Name of the data source  |                               | Description                  |              |          | Abbreviation  |
| ReqList                  |                               | Inspection requirement list  |              |          | REQ           |
|   ReqListDoc             |                               | Inspection                   | requirement  | related  | REQD          |
documents
  QMDefectAssignedInspectionRequirementList  Inspection  requirement  related  QDAREQ
failures
QMAREQ
  QMMeasureAssignedInspectionRequirementList  Inspection  requirement  related
measures
|   StepList  |                | Inspection step list  |     |     | STL  |
| ----------- | -------------- | --------------------- | --- | --- | ---- |
|             | CharList_Step  |                       |     |     | CLS  |
    Inspection step related characteristics
list
      OrderCharListDoc_Step  Inspection step related characteristics  OCLDS
documents
      ControlChart_InspectionStep  Inspection step related control chart  CCIS
      ControlChart2_InspectionStep  Inspection step related control chart 2  CC2IS
HGIS
      Histogramm_InspectionStep  Inspection step related histogram
      QMSingleValue_InspectionStep  Inspection step related single values  QMSVIS
      QMSample_InspectionStep  Inspection step related samples  QMSIS
      Statistics_Step  Inspection step related statistics  STS
|     | PointList  | Inspection Points List  |     |     | PTL  |
| --- | ---------- | ----------------------- | --- | --- | ---- |
      CharList_Point  Inspection related characteristics list  CLP
|     |     |     |     |     | OCLDP  |
| --- | --- | --- | --- | --- | ------ |
      OrderCharListDoc_Point  Inspection  related  characteristics
documents

| DataSourcesReduction.docx  |     | Version: 1.0.19468  |     |     | Page 2 of 3  |
| -------------------------- | --- | ------------------- | --- | --- | ------------ |

|     |     |     | InspectionRequirementExport  |     |
| --- | --- | --- | ---------------------------- | --- |

      ControlChart_InspectionPoint   Inspection point related control chart  CCIP

    ControlChart2_InspectionPoint  Inspection related control chart 2  CC2IP
      Histogramm_InspectionPoint  Inspection point related histogram   HGIP
      QMSingleValue_InspectionPoint  Inspection point related single values  QMSVIP
      QMSample_InspectionPoint  Inspection point related samples  QMSIP
      Statistics_Point  Inspection step related statistics  STP
  EMUAssignList_Req  Exception; not relevant for export.   EMUALR
  CharList_Req  Inspection step for all characteristics  CLR
for the inspection requirement
|     | QMSingleValue_Req  | Single values  |     | QMSVR  |
| --- | ------------------ | -------------- | --- | ------ |
STR
|     | Statistics_Req  | Statistic  |     |     |
| --- | --------------- | ---------- | --- | --- |

| DataSourcesReduction.docx  |     | Version: 1.0.19468  |     | Page 3 of 3  |
| -------------------------- | --- | ------------------- | --- | ------------ |