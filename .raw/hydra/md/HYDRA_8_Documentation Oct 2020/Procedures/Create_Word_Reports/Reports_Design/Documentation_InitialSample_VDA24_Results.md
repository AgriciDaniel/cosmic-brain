  Documentation of Initial Sample Test Word Report

1  Documentation of Initial Sample Test Word Report

Usage

The  initial  sample  report  shows  initial  sampling  data  for  the  VDA  2.4  report  production  process  and

product release. In this context data from the XML files listed in the section dealing with data sources is

used.

Requirements

The  initial  sample  report  is  created  using  the  initialsample_vda24_results_de.dotm  template  and  the

macro library hydramacrolibrary.dotm.

Procedure

Reports  are  created  using  the  InspectionRequirementExport  application  that  is  started  by  the  button

“output form” of the initial sample application.

Data sources

XML  data  sources  are  structured  hierarchically  and  by  counters.  There  is  an  XML  file  with  detailed

information on this data record for each data record of the correspondingly higher-level XML file.

1.  root-<Zähler1>_ReqList.xml

Includes header data of the initial sample inspection request.

Zähler1 corresponds to the initial sample inspection requirement selected in MOC.

1.1.  root-<Zähler1>-<Zähler2>_CharList_Req.xml

Includes  the  characteristics  from  the  higher-level  initial  sample  inspection  requirement  and  the

characteristic specifications.

Zähler1  corresponds  to  the  higher-level  initial  sample  inspection  requirement  which  the

characteristics are assigned to.

Zähler2  corresponds  to  the  set  of  characteristics.  In  the  area  of  initial  sample  inspection

requirements this is only one set and, as a result, Zähler2 is always 1.

1.2.  root-<Zähler1>-<Zähler2>-<Zähler3>_QMSingleValue_Req.xml

Includes  the  inspection  results  for  the  corresponding  characteristic.  Subject  to  the  structure  of

XML files, Zähler2 is always 1.

Structure

The  initial  sample  inspection  report  consists  of  one  cover  sheet  and  x  enclosures  that  include  the

corresponding inspection results.

Documentation_InitialSample_VDA24_Results.docxVersion: 1.0.1362

Page 1 of 3

  Documentation of Initial Sample Test Word Report

The cover sheet shows data from root-<Zähler1>_ReqList.xml. There is also an auxiliary tool evaluating

data  from  root-<Zähler1>-<Zähler2>_CharList_Req.xml.  Further  details  are  described  in  the  section

dealing with “UserExits”.

Tables on the cover sheet only provide layout functions and are not linked with differing data sources.

An  enclosure  sheet  is  created  for  every  inspection  category  for  which  characteristics  exist  in  root-

<Zähler1>-<Zähler2>_CharList_Req.xml. There is only one page that is copied in the template.

This  enclosure  template  also  shows  data  from  root-<Zähler1>_ReqList.xml  and  root-<Zähler1>-

<Zähler2>_CharList_Req.xml.  The  Results  table  includes  characteristics  and  is  linked  with  root-

<Zähler1>-<Zähler2>_CharList_Req.xml as data source.

In the columns “actual values“ “specification met” and “comment” the cells are merged and include a sub-

table with inspection results.

Root-<Zähler1>-1-<Zähler2>_QMSingleValue_Req.xml is linked as data source for this table.

Changes to columns of existing tables, table names or adding of new tables have to be taken

into account in UserExits with respect to the position IDs that are used there.

Special features

The  document  is  write-protected  when  macro  processing  ends  so  that  only  content  controls  can  be

edited.

Only the enclosures, not the cover sheet are taken into account for page numbering.

The respective page number is reduced by 1 for the cover sheet which, as a result, has page number 0.

This has to be taken into account for printing specific page numbers.

UserExits in use

The following UserExits are used:

1.  UeLinkMasterCtrlToXmlBefore

Documentation_InitialSample_VDA24_Results.docxVersion: 1.0.1362

Page 2 of 3

  Documentation of Initial Sample Test Word Report

Global variables and functions are defined.

The  cover  sheet  has  an  auxiliary  control  element  including  the  special  formatting  FORMAT:

SPECIALEMU  that  is  queried  in  this  UE.  If  this  option  is  set  an  array  including  all  inspection

categories  from  root-<Zähler1>-<Zähler2>_CharList_Req.xml  is  created,  whereas  every  category

is only transferred once, regardless of its occurrence.

The checkboxes for the corresponding enclosures on the cover sheet are set accordingly.

2.  UeFillTableFromXmlAfter

In the Results table the first column Ref-Nr.: is sorted numerically.

3.  UeLinkTableCtrlToXmlNotFound

Using  a  link  to  non-existing  data  element  nodes  LIMITS_SPECIAL  absolute  tolerance  limits  from

root-<Zähler1>-<Zähler2>_CharList_Req.xml  are  converted  into  relative  tolerance  limits.  Special

cases  such  as  identical  distances  of  the  upper  and  lower  tolerance  to  the  target  value  are

differentiated  in  this  context.  If  invalid  values  are  indicated  ERROR  will  be  displayed  instead  of  the

limit value.

4.  UeFillRowFromXmlAfter

At  first  texts  are  defined  that  indicate  inspection  results  that  are  not  valid  in  root-<Zähler1>-

<Zähler2>_CharList_Req.xml. Default  values are “fail” and “pass”. If other texts are used it  has to

be adjusted accordingly. Lower-case letters are to be used.

The corresponding checkbox for “specification met“ is now set for the Values table.

5.  UeOutputReportBefore

For  performance  reasons,  the  template  is  once  filled  with  all  inspection  results  and  then  copied  for

every inspection category.

The corresponding checkbox of the inspection category is set and all inspection results that are not

assigned to the corresponding inspection category are deleted.

Furthermore,  all  auxiliary  tools  included  in  this  UserExit  are  either  deleted  or  the  included  text  is

deleted.

Finally, the focus is set on the first content control that has not been filled out automatically and the

document is write-protected. To do so, the password MPDV is set.

Documentation_InitialSample_VDA24_Results.docxVersion: 1.0.1362

Page 3 of 3

