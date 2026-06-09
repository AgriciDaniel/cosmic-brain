Manual

Supplier Assessment /
Assessment Management
WEP-LFB 8.2

Version 1.2.23049

Last changed on: 02.09.2020

Supplier Assessment / Assessment Management

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

WEP-LFB_82.docx

Version: 1.2.23049

Page 2 of 30

Supplier Assessment / Assessment Management

Contents

1  Supplier Assessment / Assessment Management ....................................... 4

2  Assessment Catalogs .................................................................................. 5

3  Assessment Management .......................................................................... 15

4  Development of an Assessed Party ........................................................... 26

WEP-LFB_82.docx

Version: 1.2.23049

Page 3 of 30

Supplier Assessment / Assessment Management

1  Supplier Assessment / Assessment Management

Purpose

This component is used if suppliers or departments are to be assessed for a specific period on the basis

of  previously  created  assessment  catalogs.  Assessment  can  be  performed  manually,  but  also

automatically  for  some  criteria. With  regard  to  automatic  assessment  criteria,  an  appropriate  data  basis

must previously have been entered in HYDRA, e.g. goods receipt inspections.

Implementation Considerations

If, for instance in the ERP system, supplier assessment is an integral part of the system, but there is no

rating  of  quality  criteria,  HYDRA  can  determine  these  by  using  this  application.  In  addition,  it  is  also

possible  to  perform  a  complete  supplier  assessment  in  HYDRA.  Use  is  also  recommended  if  a

department-related assessment is to be performed.

Integration

This component considers the data of goods receipt inspection requirements and complaint management.

These are the basis for automatic determination of quality-relevant statistical values.

Features

The following functions are available:

  Determination  of  limit  values  for  rating  in  freely  definable  assessment  classes  (e.g.  supplier

classes)

  Free definition of assessment systems

  Determination  of  statistical  values  regarding  to  time  and  quantity-related  deviations  from

specifications as well as from the supplied quality (WEP-PPW license required)

  Determination of statistical values regarding complaints (REK-EVA required)

  Creation of various assessment catalogs

  Free definition of assessment criteria with variable weighting

  Assessment of different organizations, e.g. suppliers, departments

  Comprehensive evaluations (e.g. supplier development, supplier comparison)

WEP-LFB_82.docx

Version: 1.2.23049

Page 4 of 30

Supplier Assessment / Assessment Management

2  Assessment Catalogs

Overview

Menu

Quality management  Master data  Assessment catalogs

Transaction code

assessm

Function authorization

assessm

Catalog for the creation of assessment catalogs  with  assignment of assessment criteria, classes, rating

lists, as well as release and activation functions.

Usage

Creation and maintenance of assessment catalogs. These contain groups and assessment criteria.

Creation and maintenance of groups. These can be used to group the assessment criteria contained in

the catalog. The groups can be classified with individual weightings. One group per catalog is mandatory.

Creation and maintenance of assessment criteria are assigned. These are assigned to one group each.

Creation and maintenance of ratings to assessment catalogs, groups and criteria.

WEP-LFB_82.docx

Version: 1.2.23049

Page 5 of 30

Supplier Assessment / Assessment Management

Creation and maintenance of assessment classes to assessment catalogs, groups and criteria.

Integration

The  assessment  catalogs  with  their  subordinate  elements  are  the  prerequisite  for  performing  precise

assessments.

Prerequisite

There  are  no  specific  prerequisites.  The  only  prerequisite  is  the  existence  of  the  required  quality

management master data (areas, party in charge, persons, etc.).

Selection Criteria

The following selection criteria are available in the application:

Catalog

Filtering for a specific catalog

Catalog idx.

Filtering for a specific catalog index

Catalog des.

Filtering for a specific catalog designation

Active

Filtering for active catalogs

Field Descriptions

Catalog

Catalog number (ID) of catalog

Catalog idx.

Catalog index (alphanumeric)

Catalog des.

Catalog designation

Comment

Comment on catalog

P.i.charge type

Type of party in charge (selection)

Party in charge

Party in charge

WEP-LFB_82.docx

Version: 1.2.23049

Page 6 of 30

Supplier Assessment / Assessment Management

Name p. in charge 1 - 3

Names 1 - 3 of party in charge from master data

Editing functions

The following window opens for editing a data record:

Toolbar

 Copy

The following dialog opens for copying a data record:

WEP-LFB_82.docx

Version: 1.2.23049

Page 7 of 30

Supplier Assessment / Assessment Management

 Activate

Function authorization: assessm.activate

Activation of an inactive catalog

  Deactivate

Function authorization: assessm.release

Deactivation of an active catalog

Detail applications

Groups

Function authorization

ratcrit

A minimum of one group has to be created per catalog. The groups contain the assessment criteria and

can be used for grouping and differentiating criteria. Each group can be assigned an individual weighting

and a comparison identification.

A comparison identification serves to provide a common identification for criteria with the same meanings

but  different  designations  (e.g.  "audit"  and  "audit  result")  so  that  they  are  considered  correctly  in

subsequent assessments.

WEP-LFB_82.docx

Version: 1.2.23049

Page 8 of 30

Supplier Assessment / Assessment Management

Editing functions

The following window opens for editing a data record:

Field Descriptions

Group

Group number (ID) of group

Weighting

Individual weight of group

Source

Assessment origin: manual entry or automatic determination ( = by a rating program)

Comparison identification

Free entry of an identification (audit, quality, on-time delivery) used as a superordinate criterion in

assessments. This enables assessments across different assessment catalogs.

Criteria

Function authorization

ratcrit

In an assessment, individual criteria are assessed. These criteria belong to an assessment catalog and

are assigned to different groups. Criteria are numbered automatically when they are created, so that only

the criterion designation is entered/maintained manually upon creation and/or editing.

WEP-LFB_82.docx

Version: 1.2.23049

Page 9 of 30

Supplier Assessment / Assessment Management

Editing functions

The following window opens for editing a data record:

Field Descriptions

cf. Groups

 Classification

Function authorization

arat

A catalog, a group or a criterion may be classified with ratings. They contain the actual values  according

to which criteria are rated.

WEP-LFB_82.docx

Version: 1.2.23049

Page 10 of 30

Supplier Assessment / Assessment Management

Usage

Ratings  are  used  to  assess  criteria.  Ratings  may  be  assigned  on  catalog,  group  or  criterion  level.  The

individual ratings correspond to the discrete points of an individual rating scale.

Selection criteria

Selection  criteria  correspond  to  those  of  the  assessment  catalog.  Upon  starting  the  rating  dialog,  the

currently selected catalog is preset.

WEP-LFB_82.docx

Version: 1.2.23049

Page 11 of 30

Supplier Assessment / Assessment Management

Editing functions

The following window opens for editing a data record:

Field Descriptions

Rating

Rating no. (ID) for rating

Rating des.

Rating designation for rating

Value

Value of rating (decimal). This is the crucial value, the scale value contributing to the result in the

assessment.

Comment

A comment on the rating can be entered here.

 Classes

Function authorization

aclass

A catalog, a group or a criterion can be assigned classes. They are used to classify the totalized values of

subordinate ratings.

WEP-LFB_82.docx

Version: 1.2.23049

Page 12 of 30

Supplier Assessment / Assessment Management

Usage

Classes  are  used  to  classify  ratings  and/or  their  value.  Classes  can  be  assigned  on  catalog,  group  or

criterion  level.  The  individual  classes  represent  the  result  of  an  assessment  and  can  be  evaluated.

Classification may also be specified for the subordinate elements of a catalog and consequently enables

differentiated classification in relation to the group result or the individual criteria.

Selection criteria

The selection criteria correspond to those of the assessment catalog. Upon starting the rating dialog, the

currently selected catalog is preset.

Editing functions

The following window opens for editing a data record:

WEP-LFB_82.docx

Version: 1.2.23049

Page 13 of 30

Supplier Assessment / Assessment Management

Field Descriptions

Class

Class no. (ID) for class

Class des.

Designation of class

Value

Value  of  class  (decimal).  This  is  a  threshold  value,  from  which  this  class  is  assigned  to  an

assessment, a group or a criterion.

Comment

A comment on the class can be entered here.

WEP-LFB_82.docx

Version: 1.2.23049

Page 14 of 30

Supplier Assessment / Assessment Management

3  Assessment Management

Overview

Menu

Quality management  Assessment  Assessment management

Transaction code

suev

Function authorization

suev.*

Assessment management is used to plan and perform various assessments (suppliers, departments). For

this  purpose,  assessment  catalogs  are  used  in  which  the  respective  criteria  are  defined.  Assessment

results may be used for various reports.

Usage

In assessment management, precise assessments can be planned and performed. For this purpose,







the type of assessment,

the assessed party,

the assessment period,

  an article reference and



the underlying assessment catalog

can be determined among other things.

WEP-LFB_82.docx

Version: 1.2.23049

Page 15 of 30

Supplier Assessment / Assessment Management

Integration

For  the  assessment,  assessment  management  uses  the  specifications  of  an  assessment  catalog.  For

rating  purposes,  pre-defined  automatic  assessment  programs  may  be  used.  Assessments  themselves

can be evaluated in different ways.

Prerequisite

For  performing  an  assessment,  a  minimum  of  one  assessment  catalog  (master  data  -  assessment

catalogs) must exist in addition to the usual master data such as supplier, etc.

Selection Criteria

The following selection criteria are available in the application:

Basis tab

Catalog

Catalog no. (ID) of assessment catalog used

Catalog idx.

Index (alphanumeric) of assessment catalog used

Catalog des.

Designation of assessment catalog used

Status

Assessment status (generated, finished, etc.)

Basis Tab

Assessment type

Type of assessment (supplier assessment, department assessment)

Evaluation Object

Object in terms of "What is the object, or subject of this assessment".

Evaluation type

Master data type of assessed party (customer, department, etc.)

Assessed party

Number (ID) of assessed party

Assessed party name 1

Name 1 of assessed party

WEP-LFB_82.docx

Version: 1.2.23049

Page 16 of 30

Supplier Assessment / Assessment Management

Article Tab

Article ID, drawing revision number (drawing issue number), article designation

Appropriate article fields from the article master data catalog

Data Tab

Start from, Start to

Limitation of assessment start date

End from, End to

Limitation of assessment end date

Evaluation Tab

Class

Filtering according to class of (performed) assessments Selection from master data

Rating from - to

Limitation of rating value of performed assessments

Rating date - to

Limitation according to the date of a performed rating

Field Descriptions

Assessment no.

Consecutive  number  Assessments  are  numbered  in  the  order  of  their  creation.  The  user  cannot

influence this.

Catalog, catalog des., catalog idx.

Fields relating to the catalog used. When an assessment is created, only the catalog number (ID) is

indicated.  The  index  and  the  designation  of  the  catalog  used  are  read  from  the  master  data  and

presented.

Status

Current status of assessment The status is sometimes indicated automatically, e.g. after completion

of an assessment.

Article ID, designation, drawing revision number (drawing issue number)

Optional indication of an article number. The designation and drawing revision number are retrieved

from the article master data.

WEP-LFB_82.docx

Version: 1.2.23049

Page 17 of 30

Supplier Assessment / Assessment Management

Weighting

The weighting field can be used to determine the weight of this article-related assessment for future

evaluation. The value is interpreted as a percentage.

Assessment type

Different

types  of  assessments  (department  assessment,  supplier  assessment)  may  be

distinguished. The possible assessment types are pre-configured.

Evaluation Object

Here, the assessed process, for instance, is entered in the case of process audits. Free text entry is

possible. The selection supplies the previously used contents (self-learning catalog).

Start from, End to

Start and end date of assessment

Assessment type

created  automatically  or  created  manually  Assessments  created  manually  in  assessment

management should always have the created manually assessment type.

Evaluation - Type

Type of assessed party Selection from master data

Assessed party

Number (ID) of assessed party Selection from master data in accordance with the assessed party

type

Assessed party name 1 - 3

Names 1 - 3 of assessed party from master data

WEP-LFB_82.docx

Version: 1.2.23049

Page 18 of 30

Supplier Assessment / Assessment Management

Editing functions

The following window opens for editing a data record:

WEP-LFB_82.docx

Version: 1.2.23049

Page 19 of 30

Supplier Assessment / Assessment Management

Toolbar

 Copy

The following dialog opens for copying a data record:

Here, only the header data of the copied assessment are replaced. When saving, all results of the

assessment  are  transferred  from  the  template  to  the  copy.  A  modification  in  accordance  with  the

new header data can be achieved by a new assessment of the assessment just copied.

  Assessment

Function authorization: suev.eval

The current assessment is precisely evaluated using the Assessment function. In the course of this,

it acquires the Assessed status. Prior to the assessment, a selection can be used to determine how

the criteria with automatic criteria determination shall be rated.

WEP-LFB_82.docx

Version: 1.2.23049

Page 20 of 30

Supplier Assessment / Assessment Management

This enables a new assessment after manual rating without having to re-determine all criteria with

automatic rating.

Warning!  Depending  on  the  determination  program  and  the  selected  period,  the  rating  of

automatic criteria may require an extended calculation time.

The  value  of  a  superior  group  is  derived  from  the  (weighted)  average  of  criteria  belonging  to  this

group as direct successors. The assessment itself results from the (weighted) average of its groups.

The supplier is then rated on the basis of this value.

Detail applications

Groups

In the Groups detail application, the groups of the currently selected catalog are displayed in the list and

in the  detail  view. The result is displayed in the  Classification tab, if a rating and/or an assessment has

already taken place.

WEP-LFB_82.docx

Version: 1.2.23049

Page 21 of 30

Supplier Assessment / Assessment Management

Editing functions

none

Criteria

In the Criteria detail application, the criteria of the currently selected group and the selected catalog are

displayed  in  the  list  and  in  the  detail  view.  The  result  is  displayed  in  the  Classification  tab,  if  a  rating

and/or an assessment has already taken place.

Editing functions

The following window opens for editing a data record:

Field Descriptions

Criteria des.

Designation of the criterion

Classification

ID number of rating may be selected from the catalog master data. This field is the only one which

may  be  selected  freely.  With  this  selection,  the  actual  rating  is  performed  in  addition  to  the

automatic rating programs.

Classification des., weighting, comment, value perc., value dec.

Designations  and  values  from  the  assessment  catalog  The  percentage  value  is  calculated  in

relation to the highest rating (100%).

This function is only available for criteria with manual entry (source: Entry).

WEP-LFB_82.docx

Version: 1.2.23049

Page 22 of 30

Supplier Assessment / Assessment Management

 Autom. rating

By using the Automatic rating button, a criterion is rated with the automatic rating evaluation source. The

process may require quite some time, depending on the type of rating program and scope of calculation

period.

The function is not available for criteria with manual rating.

Automatic Rating Programs

General

The  functionality  of  automatic  rating  programs  is  described  below.  Some  parameters  of  these  rating

programs  can  be  edited  and/or  adapted  in  the  course  of  a  consulting  meeting.  The  standard  settings,

only, are described below. After adaptation, the functionality may therefore deviate from the functionality

described here.

Auditing Result

This rating  program determines the audit result of the company for which the assessment was created.

This value is determined from the HYDRA company master data.

Complaint Proportion

At  first,  all  agreed  goods  receipt  inspection  requirements  in  the  relevant  areas  of  the  company  to  be

assessed  (entered  as  supplier)  are  searched.  In  order  to  filter  the  data  of  the  affected  period,  only  the

inspection  requirements  whose  date  (standard:    delivery  date)  is  within  the  limits  of  the  assessment

period are considered. The calculation basis (standard: piece number) for all data records found is added

up and saved in the variable nPAN.

In  the  next  step,  all  complaint  details  of  the  affected  areas  including  the  company  to  be  assessed  as

supplier  are  counted.  In  order  to  limit  the  data  to  the  assessment  period,  only  complaints  whose  date

(standard:  delivery  date)  is within the assessment period are considered. In order to exclude  unjustified

complaint  details,  data  with  findings  to  be  ignored  (standard:  unjustified)  are  not  considered.  Here,  too,

the  calculation  basis  (standard:  piece  number)  for  all  data  records  found  is  added  up  and  saved  in  the

variable nREK.

WEP-LFB_82.docx

Version: 1.2.23049

Page 23 of 30

The percentage rating value of the assessment criterion is calculated as follows:

Supplier Assessment / Assessment Management

The decimal rating value is given as 'parts per million (ppm)'.

Delivery date

At  first,  all  agreed  goods  receipt  inspection  requirements  in  the  relevant  areas  of  the  company  to  be

assessed  (entered  as  supplier)  are  counted.  In  order  to  filter  the  data  of  the  affected  period,  only  the

inspection requirements whose date (standard: delivery date) is within the limits of the assessment period

are considered. The inspection requirements number is saved in the variable nPAN.

For  each  inspection  requirement  found,  an  assessment  factor  fTERMIN  (date)  is  determined.  These

assessment factors are also added. The standard settings for the assessment factors are as follows:

Assessment

Assessment

factor

Negative

deviation

[days]

Positive

deviation

[days]

A

B

C

D

3

2

1

0

-3

-5

-8

+1

+2

+3

< -8

> +3

For further calculation, the largest assessment factor (standard: 3) is determined first. This is saved in the

variable fMAX .

Finally, the sum total of the assessment factors fTERMIN (date) is now divided by the number of identified

goods receipts, multiplied by the maximum assessment factor.

WEP-LFB_82.docx

Version: 1.2.23049

Page 24 of 30

Supplier Assessment / Assessment Management

Quantity delivered

At  first,  all  agreed  goods  receipt  inspection  requirements  in  the  relevant  areas  of  the  company  to  be

assessed  (entered  as  supplier)  are  counted.  In  order  to  filter  the  data  of  the  affected  period,  only  the

inspection requirements whose date (standard: delivery date) is within the limits of the assessment period

are considered. Goods receipts whose target supply quantity is zero or for which no target and/or actual

supply quantity was entered will not be considered in the determination of the rating result. The number of

inspection requirements is saved in the variable nPAN.

For  each  inspection  requirement  found,  an  assessment  factor  fMENGE  (quantity)  is  derived  from  the

percentage deviation between actual and target quantity. These assessment factors are also added. The

standard settings for the assessment factors are as follows:

Assessment

Assessment

factor

Negative

deviation

Positive deviation

[%]

0

+10

[%]

0

-10

< -10

> +10

A

B

C

2

1

0

For further calculation, the largest assessment factor (standard: 2) is determined first. This is saved in the

variable fMAX.

Finally,  the  sum  total  of  the  assessment  factors  fMENGE  (quantity)  is  divided  by  the  number  of  identified

goods receipts, multiplied by the maximum assessment factor.

WEP-LFB_82.docx

Version: 1.2.23049

Page 25 of 30

Supplier Assessment / Assessment Management

4  Development of an Assessed Party

Overview

Menu

Quality  management    QM  evaluation    Development  of  an  assessed
party

Quality management  Evaluation  Development of an assessed party

Transaction code

suevad

Function authorization

suevad

This  document  describes  the  "Development  of  an  assessed  party"  application  in  the  Manufacturing

Operation Center (MOC).

Usage

This evaluation can be used to visualize the development of an assessed party, in this case a department

(Production)  over  a  period  of  time.  To  this  end,  the  assessed  party  whose  development  you  wish  to

observe needs to be selected in the filter.

WEP-LFB_82.docx

Version: 1.2.23049

Page 26 of 30

Supplier Assessment / Assessment Management

Integration

This evaluation only uses assessments from Assessment Management.

Prerequisite

There are no specific prerequisites. The only prerequisite is the collection of assessments in Assessment

Management.

Selection Criteria

Since the selection criteria are self-explanatory, they are not explained separately.

Toolbar

No other special function buttons are available in addition to the standard functions.

"Development of an assessed party" Detail Applications

The  data  is  displayed  in  a  pivot  table  in  combination  with  a  graphic  format  with  bar  charts.  Various

application  functions  are  available  for  the  display.  The  complaint  data  previously  filtered  by  selection

criteria are used as the data basis.

The general pivot functions are not described in detail at this point. The remarks below are limited to the

elementary functions of this evaluation.

Pivot evaluations offer the following advantages:

  Large data volumes can be summarized and presented quickly.

  Rows and columns can be rotated in order to have different summaries of source data displayed.

  Simple filtering by "drag & drop" with additional detail filter.

  The interactive presentation enables the data to be summarized and analyzed in various formats

and with different calculation methods.

The following context menu can be opened by clicking the right mouse button:

WEP-LFB_82.docx

Version: 1.2.23049

Page 27 of 30

Supplier Assessment / Assessment Management

The "Show field list" function enables selection of the fields to be used for the pivot analysis. The figure

below shows a possible field list.

The requested fields can be dragged and dropped into the evaluation area.

WEP-LFB_82.docx

Version: 1.2.23049

Page 28 of 30

The "Show filter editor" function enables a further, flexible restriction of the data basis in addition to the

Supplier Assessment / Assessment Management

selection

criteria.

By showing the settings, the following window is opened:

WEP-LFB_82.docx

Version: 1.2.23049

Page 29 of 30

Supplier Assessment / Assessment Management

Activating the selection option allows content areas of the tabular presentation to be marked. In this case,

the graphic format is based on the marked cells. An activated label display enables the sum total of the

numbers from each bar to be shown.

The following figure illustrates these functions.

The  sum  function  enables  the  Overall  Result  row  in  the  bar  graph  to  be  shown  also.  If  the  selection

function is activated, the overall result of the respective column is added to the respective bar when the

Total Result row cells are marked accordingly.

By activating/deactivating the "Columns" option, the presentation switches between the graphic format of

the respective number of columns and/or rows.

"Assessment Basis" Detail Applications

The  assessment  basis  shows  the  assessments  filtered  on  the  basis  of  the  selection  criteria  applied,

including  the  referenced  data.  The  referenced  data  usually  correspond  to  the  field  list  for  the  pivot

analysis.

WEP-LFB_82.docx

Version: 1.2.23049

Page 30 of 30

