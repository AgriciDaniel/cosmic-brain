Assessment Catalogs

1  Assessment Catalogs

Overview

Menu

Quality management  Master data  Assessment catalogs

Transaction code

assessm

Function authorization

assessm

Catalog for the creation of assessment catalogs with assignment of assessment criteria, classes, rating
lists, as well as release and activation functions.

Usage

Creation and maintenance of assessment catalogs. These contain groups and assessment criteria.

Creation and maintenance of groups. These can be used to group the assessment criteria contained in

the catalog. The groups can be classified with individual weightings. One group per catalog is mandatory.

Creation and maintenance of assessment criteria are assigned. These are assigned to one group each.

Creation and maintenance of ratings to assessment catalogs, groups and criteria.

MOC_AssessmentManagement.docx

Version: 1.0.1362

Page 1 of 10

Assessment Catalogs

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

MOC_AssessmentManagement.docx

Version: 1.0.1362

Page 2 of 10

Assessment Catalogs

Name p. in charge 1 - 3

Names 1 - 3 of party in charge from master data

Editing functions

The following window opens for editing a data record:

Toolbar

 Copy

The following dialog opens for copying a data record:

MOC_AssessmentManagement.docx

Version: 1.0.1362

Page 3 of 10

Assessment Catalogs

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

MOC_AssessmentManagement.docx

Version: 1.0.1362

Page 4 of 10

Editing functions

The following window opens for editing a data record:

Assessment Catalogs

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

In an assessment, individual criteria are  assessed. These criteria belong to an assessment catalog and

are assigned to different groups. Criteria are numbered automatically when they are created, so that only

the criterion designation is entered/maintained manually upon creation and/or editing.

MOC_AssessmentManagement.docx

Version: 1.0.1362

Page 5 of 10

Editing functions

The following window opens for editing a data record:

Assessment Catalogs

Field Descriptions

cf. Groups

 Classification

Function authorization

arat

A catalog, a group or a criterion may be classified with ratings. They contain the actual values according

to which criteria are rated.

MOC_AssessmentManagement.docx

Version: 1.0.1362

Page 6 of 10

Assessment Catalogs

Usage

Ratings  are  used  to  assess  criteria.  Ratings  may  be  assigned  on  catalog,  group  or  criterion  level.  The

individual ratings correspond to the discrete points of an individual rating scale.

Selection criteria

Selection  criteria  correspond  to  those  of  the  assessment  catalog.  Upon  starting  the  rating  dialog,  the

currently selected catalog is preset.

MOC_AssessmentManagement.docx

Version: 1.0.1362

Page 7 of 10

Editing functions

The following window opens for editing a data record:

Assessment Catalogs

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

MOC_AssessmentManagement.docx

Version: 1.0.1362

Page 8 of 10

Assessment Catalogs

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

MOC_AssessmentManagement.docx

Version: 1.0.1362

Page 9 of 10

Assessment Catalogs

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

MOC_AssessmentManagement.docx

Version: 1.0.1362

Page 10 of 10

