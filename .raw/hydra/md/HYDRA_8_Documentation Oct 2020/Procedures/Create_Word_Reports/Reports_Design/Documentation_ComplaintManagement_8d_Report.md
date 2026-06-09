  Documentation Complaint Management 8d Report

1  Documentation Complaint Management 8d Report

Usage

The report shows header data for the complaints for one of the failures selected for the 8d report as well

as details about this failure and the measures taken.

It makes use of the data from the XML files listed under the item data sources.

Requirements

The  8d  report  is  prepared  using  the  complaintdetail_8d_report_de.dotm  template  and  using  the  macro-

library in hydramacrolibrary.dotm.

Procedure

The report is created by going to the application ComplaintManagementExport that can be called up by

clicking on the Output form button in complaint management - while the failures are selected.

Data sources

The XML data sources are structured hierarchically using counters. There is one XML file for each data

record of the upper-level XML file with detailed information about this data record.

1.  root-<Counter1>_AnalysisAssignedComplaintFailureType.xml

Contains data about the failure.

Counter1 equals the failures selected in MOC.

1.1.  root-<Counter1>-<Counter2>_ComplaintList.xml

Contains the header data from the upper-level complaint.

Counter1 equals the failure that the complaint is assigned to.

Counter2  equals  the  set  of  complaints.  Because  the  failure  was  selected  in  the  context  of  a

specific complaint, this is only one set and Counter2 is therefore always 1.

1.2.  root-<Counter1>-<Counter2>_ComplaintDetailList.xml

Contains the header data from the upper-level complaint details.

Counter1 equals the failure that the complaint details are assigned to.

Documentation_ComplaintManagement_8d_Report.docxVersion:

1.0.1362

Page 1 of 3

  Documentation Complaint Management 8d Report

Counter2  equals  the  set  of  complaints.  Because  the  failure  was  selected  in  the  context  of  a

specific complaint and its complaint details  were selected, this is only  one set  and Counter2  is

therefore always 1.

1.3.  root-<Counter1>-<Counter2_ComplaintDocuments.xml

Contains data belonging to the documents of the upper-level complaints.

Counter1 equals the failure that is assigned to the complaint with its documents.

Counter2 equals the set of documents.

1.4.  root-<Counter1>-<Counter2>_FailureCauses.xml

Contains the causes of the selected failures.

Counter1 equals the failure that the failure causes are assigned to.

Counter2 equals the set of causes.

1.5.  root-<Counter1>-<Counter2>-<Counter3>_CompanyAddress.xml

Contains the address data from the upper-level complaint.

Counter1 equals the failure that the complaint with the address data is assigned to.

Counter2  is  the  result  of  the  structure  of  the  data  sources  and  does  not  have  any  specific

reference.

Counter3  equals  the  set  of  address  data.  Because  the  failure  was  selected  in  the  context  of  a

specific complaint and its complaint details  were selected, this is only  one set  and Counter3  is

therefore always 1.

1.6.  root-<Counter1>-<Counter2>-<Counter3>_ComplaintDetailMeasure.xml

Contains the measures corresponding to the selected failures.

Counter1 equals the failure that the measures are assigned to.

Counter2  is  the  result  of  the  structure  of  the  data  sources  and  does  not  have  any  specific

reference.

Counter3 equals the set of measures.

Structure

The report is made up of a header area and a detail area.

Documentation_ComplaintManagement_8d_Report.docxVersion:

1.0.1362

Page 2 of 3

  Documentation Complaint Management 8d Report

Shown in the header are the data belonging to the upper-level complaints including all of the complaint

details root-<Counter1>-<Counter2>_ComplaintList.xml, root-<Counter1>-

<Counter2>_ComplaintDetailList.xml und root-<Counter1>-<Counter2>-

<Counter3>_CompanyAddress.xml . The only function of the table there is for layout purposes.

Shown in the detail area are the data for the failure, the corresponding measures, causes and documents

listed in a table. Linked to this table are root-

<Counter1>_AnalysisAssignedComplaintFailureType.xml, root-<Counter1>-

<Counter2>_FailureCauses.xml, root-<Counter1>-<Counter2>-

<Counter3>_ComplaintDetailMeasure.xml and root-<Counter1>-

<Counter2_ComplaintDocuments.xml as data sources.

UserExits used (in the Word macro)

Only the UserExit UeFillRowFromXmlAfter is used. Several filtering actions are made in it.



In the Causes table, failures are filtered out that are not of the failure cause type.

  Filtered in the ShortTermMeasures table are all measures that are of the short-term type.

  Filtered in the MediumTermMeasures table are all measures that are of the medium-term type.

  Filtered in the LongTermMeasures table are all measures that are of the long-term type.

  Filtered in the SuccessMonitoring table are all assignments that are of the success monitoring

type.

  Filtered in the Prediction table are all assignments that are of the prediction type.

Documentation_ComplaintManagement_8d_Report.docxVersion:

1.0.1362

Page 3 of 3

