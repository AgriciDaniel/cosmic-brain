Download of Master Data

1  Download of Master Data

Download of the work centers

SAP allows to download workcenters to run plausibility checks in the subsystem. These work centers

can be transferred to HYDRA.

When these work centers will be transferred, the system will check for the respective SAP work center

in  the  HYDRA  configuration  order  standard  whether  an  entry  is  stored  for  this  SAP  work  center  by

which  this  entry  will  be  transferred  as  HYDRA  workplace.  In  the  beginning,  the  workplace  will  be

created with the responsibility area “SAP” by the user “SAP”. Due to this it is necessary to create the

user “SAP” and to assign it then to the responsibility area “SAP”. During the adoption workplaces will

be inserted or updated. Deletions are not possible.

Since work centers are only unique within a plant in SAP; it must be configured in HYDRA for which

plant you wish to adopt the work centers. This configuration is made in the HYDRA Ini-configuration.

Name:  PP-PDC

Section:

PPCC2RECWORKCENTER

Key:

Plant, for which the work centers are to be adopted, e.g. 1000

Value:

<BLANK> (no value must be entered here)

Field name

T  L  D

Description

Usage in HYDRA

SOURCE_SYS

WORK_CNTR

PLANT

CHAR  10  0

Logical system

CHAR  8  0

Work center

CHAR  4  0

Plant

SUBSYSTEM_GROUPING

CHAR  3  0

BDE group

Not used

HYDRA machine/ workplace

Plant

Transfer to HYDRA

WORK_CNTR_DESCR

CHAR  40  0

Short text on the work center

Comment

VALID_START

DATS  8  0

Start of validity of the current cost center link

VALID_END

DATS  8  0

End of validity of the current cost center link

The  data  record  will  only  be
adopted when the current date is
within this interval.

The  data  record  will  only  be
adopted when the current date is
within this interval.

CO_AREA

CHAR  4  0

Controlling  area  of  the  current  cost  center
link

Not used

CHAR  10  0

Cost center of the current cost center link

Cost center

COST_CNTR

ACTI1_TEXT

ACTI1_UNIT

CHAR  20  0

Activity 1: Activity text

UNIT  3  0

Activity 1: Activity unit

ACTI1_UNIT_ISO

CHAR  3  0

Activity 1: ISO code of the quantity unit

NOACTI1

CHAR  1  0

Activity 1: Indicator: Do not show activity text  Not used

RECORD_GRP1

NUMC  1  0

Activity 1: Record type group

ACTI2_TEXT

ACTI2_UNIT

CHAR  20  0

Activity 2: Activity text

UNIT  3  0

Activity 2: Activity unit

Not used

Not used

Not used

MBL_SAP_Implementation_PP_MD_Down.docxVersion: 1.1.1362

Page 1 of 5

Not used

Not used

Not used

Field name

T  L  D

Description

ACTI2_UNIT_ISO

CHAR  3  0

Activity 2: ISO-code of the quantity unit

Usage in HYDRA
Not used

Download of Master Data

NOACTI2

CHAR  1  0

Activity 2: Indicator: Do not show activity text  Not used

RECORD_GRP2

NUMC  1  0

Activity 2: Record type group

ACTI3_TEXT

ACTI3_UNIT

CHAR  20  0

Activity 3: Alternative activity text

UNIT  3  0

Activity 3: Activity unit

ACTI3_UNIT_ISO

CHAR  3  0

Activity 3: ISO code of the quantity unit

Not used

Not used

Not used

Not used

NOACTI3

CHAR  1  0

Activity 3: Indicator: Do not show activity text  Not used

RECORD_GRP3

NUMC  1  0

Activity 3: Record type group

ACTI4_TEXT

ACTI4_UNIT

CHAR  20  0

Activity 4: Activity text

UNIT  3  0

Activity 4: Activity unit

ACTI4_UNIT_ISO

CHAR  3  0

Activity 4: ISO code of the quantity unit

Not used

Not used

Not used

Not used

NOACTI4

CHAR  1  0

Activity 4: Indicator: Do not show activity text  Not used

RECORD_GRP4

NUMC  1  0

Activity 4: Record type group

ACTI5_TEXT

ACTI5_UNIT

CHAR  20  0

Activity 5: Alternative activity text

UNIT  3  0

Activity 5: Activity unit

ACTI5_UNIT_ISO

CHAR  3  0

Activity 5: ISO code of the quantity unit

Not used

Not used

Not used

Not used

NOACTI5

CHAR  1  0

Activity 5: Indicator: Do not show activity text  Not used

RECORD_GRP5

NUMC  1  0

Activity 5: Record type group

ACTI6_TEXT

ACTI6_UNIT

CHAR  20  0

Activity 6: Activity text

UNIT  3  0

Activity 6: Activity unit

ACTI6_UNIT_ISO

CHAR  3  0

Activity 6: ISO code of the quantity unit

Not used

Not used

Not used

Not used

NOACTI6

RECORD_GRP6

CO_BUSPROC

CHAR  1  0

Activity 6: Indicator: Do not show activity text  Not used

NUMC  1  0

Activity 6: Record type group

CHAR  12  0

Business process

Not used

Not used

CO_BUSPROC_NAME

CHAR  20  0

General designation of the business process  Not used

COST_DRIVER

UNIT  3  0

COST_DRIVER_ISO

CHAR  3  0

Activity  unit  CO-ABC  on
process

the  business

Not used

Activity  unit  CO-ABC  according  to  ISO  on
the business process

Not used

Download of the deviation reasons

SAP allows to download deviation reasons to run plausibility checks in the subsystem. These deviation

reasons can be transferred to HYDRA.

When the deviation reasons are transferred, the system will first create a reason text with the number

transferred from SAP. Then a reason together with the number transferred from SAP and referring to

the created reason text will be created.

In the beginning, the reason texts and reasons are created by the "SAP" user. This user must exist in

the  system  as  HYDRA  user.  During  the  transfer  reasons/  reason  texts  will  be  inserted  or  updated.

Deletions are not possible.

MBL_SAP_Implementation_PP_MD_Down.docxVersion: 1.1.1362

Page 2 of 5

Since  deviation  reasons  are  only  unique  within  a  plant  in  SAP,  it  must  be  configured  in  HYDRA  for

which plant you wish to transfer the deviation reasons. This configuration is made in the HYDRA Ini-

Download of Master Data

configuration.

Name:  PP-PDC

Section:

DIFFE2

Key:  Plant, for which the reasons are to be transferred, e.g. 1000

Value:

Reason type
A
N
P
G
L

Scrap
Rework
Problem quantity
Yield
Batch logs

Field name

WERKS

REASON

GRDTX

SOURCE_SYS

Type  L
CHAR

4

Plant

CHAR

4

Variation cause

Meaning

Usage in HYDRA

Plant

ID Reason Text
ID Reason

CHAR

25

Text stating the reasons of the deviation

Scrap reason

CHAR

10

Logical system

Not used

Download of generally applicable units

SAP allows to download generally applicable units to run plausibility checks in the subsystem. These

generally applicable units can be transferred to HYDRA.

In  the  beginning,  the  units  are  created  by  the  "SAP"  user.  This  user  must  exist  in  the  system  as

HYDRA user. During the transfer the units will be inserted or updated. Deletions are not possible.

During  the  transfer  the  SI-units  will  not  be  identified  and  the  ISO  code  for  the  units  cannot  be

transferred.

Field name

MSEHI

MSEHE

NENNR

ZAEHL

MSSIE

MSEHL

ANDEC

Meaning

Usage in HYDRA

L  D

Typ
e
CHAR  3

Quantity unit (internal key)

CHAR  3

Quantity unit (external key)

Not used

Unit

CHAR  10

Denominator for the conversion into SI-unit

Not used

CHAR  10

Numerator for the conversion into SI-unit

Not used

CHAR  3

SI-unit (internal key)

Not used

CHAR  25

Text on the quantity unit

Text on the quantity unit

SOURCE_SYS

CHAR  10

Logical system

CHAR  3

Number of decimal places

Not used

Not used

MBL_SAP_Implementation_PP_MD_Down.docxVersion: 1.1.1362

Page 3 of 5

Download of Master Data

Download of material-dependent units

SAP allows to download material-dependent units to run plausibility checks in the subsystem. These

units can be transferred to HYDRA.

In  the  beginning,  the  units  are  created  by  the  "SAP"  user.  This  user  must  exist  in  the  system  as

HYDRA user. During the transfer the units will be inserted or updated. Deletions are not possible.

MATNR

MEINH

MEINS

UMREZ

UMREN

Field name

Type  L D
CHAR

18    Material

Meaning

Usage in HYDRA

CHAR

3

CHAR

3

CHAR

7

CHAR

7

Material

Unit of

Alternative  quantity  unit  of  the  material
(internal key)

Base  quantity  unit  of  the material  (internal
key)

Unit by

for
Numerator
alternatives in stock keeping unit

the

conversion

of

Numerator

Denominator
for
alternatives in stock keeping unit

the

conversion  of

Denominator

SOURCE_SYS

CHAR

10

Logical system

Not used

MBL_SAP_Implementation_PP_MD_Down.docxVersion: 1.1.1362

Page 4 of 5

Download of Master Data

MBL_SAP_Implementation_PP_MD_Down.docxVersion: 1.1.1362

Page 5 of 5

