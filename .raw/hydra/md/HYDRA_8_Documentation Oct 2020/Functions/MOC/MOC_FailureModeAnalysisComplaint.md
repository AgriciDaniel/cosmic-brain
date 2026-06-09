Failure Analysis of Complaints

1  Failure Analysis of Complaints

Overview

Menu

Quality management  QM evaluation  Complaint failure

Transaction code

faepcm

Function authorization

feapcm

Utilization

The failure mode analysis allows for failures of the following types recorded in complaint management to

be evaluated:

  Failure type (FT)

  Failure location (FL)

  Failure cause (FC) and

MOC_FailureModeAnalysisComplaint.docx Version: 1.1.1362

Page 1 of 4

Failure Analysis of Complaints

  Causer (VU).

In this context evaluations/reports are based on pivot functions. They allow for the distribution of failure

types (frequency) to be presented for each article/item or by the complaining party referring to a period of

time that has been filtered beforehand. These analyses help determine the core areas that might require

action to be taken.

Integration

The failure analysis of complaints only evaluates failures from complaint management.

Prerequisite

There are no special requirements to be met. The only prerequisite is that failures have to be recorded,

which, in turn, need to be defined within the master data of quality management before.

Selection criteria

Selection criteria are self-explanatory and not described separately.

Toolbar

There are no other special function buttons in addition to the standard functions/features.

Detail applications "Graphic failure analysis of complaints“

Data  is  displayed  in  a  pivot  table  in  combination  with  bar  charts.  Different  application  functions  are

provided  for  the  presentation.  The  failures/defects  that  have  been  restricted  beforehand  by  entering

selection criteria represent the data basis.

The general pivot functions are not described in more detail in this document. The paragraphs that follow

only describe the elementary functions of this evaluation/report.

Pivot evaluations/reports provide the following benefits.

  Large amounts of data may quickly be summarized and presented.

  Rows and columns can be exchanged to have the source data summarized differently.

  Simple filters by "drag and drop" with additional detail filters.

  Due to this interactive way of representation, data can be summarized and analyzed in different

formats and using different calculation methods.

MOC_FailureModeAnalysisComplaint.docx Version: 1.1.1362

Page 2 of 4

The below context menu can be opened by clicking the right mouse button.

Failure Analysis of Complaints

The function "show field list" allows for the fields that are to be used in the pivot analysis to be selected.

The below figure shows a possible list of fields.

The requested fields may be put into the evaluation area by drag & drop.

In addition to the selection criteria, the "show filter editor" function enables further flexible restrictions of

the data basis.

MOC_FailureModeAnalysisComplaint.docx Version: 1.1.1362

Page 3 of 4

The below dialog is opened to show the settings made.

Failure Analysis of Complaints

If  the  "selection"  option  is  checked  entire  areas  may  be  selected  in  the  table  view.  In  this  case,  the

graphic representation is based on the selected rows. If the "label" option is checked it is possible to show

the total number of each bar.

The below figure explains these functions.

The  row  showing  the  total  result  may  be  displayed  additionally  in  the  bar  chart  if  the  "totals"  option  is

checked. Provided that the "selection" function is checked and the corresponding cells of the "total result"

row are selected, the total result is added to the corresponding column of the relevant bar.

It  is  switched  between  the  graphic  presentation  of  the  corresponding  number  of  columns  or  rows  by

checking/unchecking the "columns" option.

Detail applications "failure list of complaints"

The  failure  list  shows  the  failures  including  referenced  data  that  are  filtered  on  the  basis  of  the  used

selection criteria. Normally, the referenced data correspond to the field list for the pivot analysis.

MOC_FailureModeAnalysisComplaint.docx Version: 1.1.1362

Page 4 of 4

