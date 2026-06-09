Assessment Management

1  Assessment Management

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

MOC_EvaluationAssessment.docx

Version: 1.1.1362

Page 1 of 11

Assessment Management

can be determined among other things.

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

MOC_EvaluationAssessment.docx

Version: 1.1.1362

Page 2 of 11

Assessment Management

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

MOC_EvaluationAssessment.docx

Version: 1.1.1362

Page 3 of 11

Assessment Management

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

MOC_EvaluationAssessment.docx

Version: 1.1.1362

Page 4 of 11

Editing functions

The following window opens for editing a data record:

Assessment Management

MOC_EvaluationAssessment.docx

Version: 1.1.1362

Page 5 of 11

Assessment Management

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

MOC_EvaluationAssessment.docx

Version: 1.1.1362

Page 6 of 11

Assessment Management

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

MOC_EvaluationAssessment.docx

Version: 1.1.1362

Page 7 of 11

Assessment Management

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

MOC_EvaluationAssessment.docx

Version: 1.1.1362

Page 8 of 11

Assessment Management

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

This rating program determines the audit result of the company for which the assessment was created.

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

MOC_EvaluationAssessment.docx

Version: 1.1.1362

Page 9 of 11

The percentage rating value of the assessment criterion is calculated as follows:

Assessment Management

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

MOC_EvaluationAssessment.docx

Version: 1.1.1362

Page 10 of 11

Assessment Management

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

MOC_EvaluationAssessment.docx

Version: 1.1.1362

Page 11 of 11

