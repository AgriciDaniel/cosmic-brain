Uploads

1  Uploads

Usage

Quantities recorded in HYDRA can be uploaded automatically to SAP series production where they can

be  posted.  These  are  mere  quantity  postings.  SAP  does  not  provide  for  the  transfer  of  actual  SAP

activities.

Uploads  are  performed  by  synchronous  RFC  (sRFC).  SAP  posts  the  uploads  by  calling  the  BAPI

RepManConfirmation1  using  the  CreateMTS  method.  If  posting  cannot  take  place  in  SAP,  it  will  be

recorded  in  an  error  log.  The  event  is  generated  (SAP.OUTBOUND_FM_POST_ERROR)  if  HYDRA

Escalation Management is used for HYDRA MES Link Enabling (license SIS-ESK and SAP-ESK).

Record types supported by HYDRA

HYDRA-BDE  uploads  recorded  quantities  (yield  and  scrap)  to  SAP  R/3  PP.  The  customizing  settings

configured  for  the  HYDRA  order  type  determine  which  record  types  represent  the  basis  for  HYDRA

uploads.

If  the  upload  of  partial  quantity  uploads  is  enabled  the  quantities  will  be  taken  from  the  generated  T

records. The field SCRAPREASON of the upload structure is assigned the recorded scrap reason. The U

records  are  not  uploaded  in  this  case.  The  generated  E  record  is  transferred  with  the  quantities  of  the

generated  T  record,  provided  that  quantities  have  been  recorded  at  all.  Yield  and  scrap  are  each

uploaded in individual records to SAP R/3.

If  partial  quantity  uploads  are  not  configured  for  being  uploaded,  the  quantities  will  be  taken  from  the

interrupted operations (U record) or logged off operations (E record) recorded in HYDRA. Scrap reasons

are not transferred. Yield and scrap are each uploaded in individual records to SAP R/3.

Records  having  the  quantity  "0"  are  not  uploaded  to  SAP,  irrespective  of  whether  the  upload  of  partial

uploads has been enabled or not. However, this can also result in the final upload of an operation not to

be transferred to SAP, as this posting does not include a quantity.

Upload structures of the BAPI RepManConfirmation1

Upload structure BflushFlags

This structure specifies the type of upload.

Field

T  L  D

Description

Usage in
HYDRA

MBL_SAP_Implementation_REM_Up.docx Version: 1.1.1362

Page 1 of 3

Uploads

BCKFLTYPE

CHAR  2

RP_SCRAPTYPE

CHAR  1

Backflushing type of a BAPI
backflush (upload)

"02" - has to be
discussed in detail with
the customer!

Scrap type for reporting point
scrap backflush (upload)

Fixed "1“ scrap at the
specified-

reporting point

ACTIVITIES_TYPE

CHAR  1

COMPONENTS_TYPE

CHAR  1

Scope of the separated activity
backflush (upload)

Scope of the separated goods
issue posting

Not used.

Not used.

Upload structure BFlushDataMTS

The  structure  includes  the  reporting  point  for  which  the  data  included  in  the  structure  BflushdataGen

apply.

Field

T  L  D

Description

REPPOINT

CHAR  4

Reporting point

Usage in HYDRA
Operation number

Upload structure BFlushDataGen

The structure BflushdataGen transfers actual user data to SAP.

Field

T  L  D

PDC_NUMBER

CHAR  12

Description
PDC number (unique ID for all
PDC systems)

Usage in HYDRA
"HY“+reference from
ADE_PROTOKOLL

MATERIALNR
ANR.ATK

PRODPLANT
ANR.WERK:S

PLANPLANT
ANR.WERK:S

STORAGELOC
ANR.LGORT

PRODVERSION
ANR.FERTVER

PRODLINE

PLANNINGID

BATCH

POSTDATE
ADEPRO.SKDAT

DOCDATE

CHAR  18

Material number

Material number from planned
order
Ak.Artikelnummer

CHAR  4

Plant

Specified plant

CHAR  4

Planning plant

Specified plant

CHAR  4

Receiving storage location for
repetitive manufacturing

Specified storage location

CHAR  4

Production version

Production version from
planned order

CHAR  8

Production line for repetitive
manufacturing

CHAR  8

Planning ID 2

CHAR  10

Receiving batch for repetitive
manufacturing

Not used.

Not used.

Not used.

DATS  8

Posting date in the document

Shift date of the posting

DATS  8

Document date in document

Upload date

DOCHEADERTXT

CHAR  25

Document header text

Not used.

BACKFLQUANT
ADEPRO.EGR:GUTP

SCRAPQUANT
ADEPRO.EGR:AUSP

QUAN  13  3

Quantity in unit of entry

Yield in primary quantity unit

QUAN  13  3

Scrap quantity

Scrap quantity in primary
quantity unit

MBL_SAP_Implementation_REM_Up.docx Version: 1.1.1362

Page 2 of 3

Uploads

Field
UNITOFMEASURE
ADEPRO.EGE:GUTP

UNITOFMEASURE_ISO

SCRAPREASON

T  L  D

UNIT  3

CHAR  3

CHAR  4

Description
Unit of measure for backflush
quantity and for actual scrap

Usage in HYDRA
OP target quantity unit of the
primary quantity

ISO code for unit of measurement  Not used.

Reason for scrap

Scrap reason (when
transferring partial uploads)

REVLEVEL

PLANORDER

CHAR  2

Revision level

Not used.

CHAR  10

Planned order number

SAP planned order according
to specifications

ORDERCOSTS

CHAR  1

INCLCOMPSCRAP

CHAR  1

MATERIALNR_EXTERNAL

CHAR  40

MATERIALNR_GUID

CHAR  32

MATERIALNR_VERSION

CHAR  10

Please note:

Indicator: Post with order costs
(lot-size independent)

Indicator: Post with component
scrap

Not used.

Not used.

Long material number (future
development) for the field MATER

Not used.

External GUID (future
development) for the field
MATERIALNR

Version number (future
development) for the field
MATERIALNR

Not used.

Not used.

It  is  not  possible  to  upload  quantities  using  partial  uploads  and  to  record  them  by  the  total  quantity

counter at  MDE machines at the same time. This input type can result in negative quantity postings for

the yield if OPs are finished.

This restriction does no longer apply, if it is possible to process such negative postings (e.g. by using the

SAP standard BAPI or customized processing).

MBL_SAP_Implementation_REM_Up.docx Version: 1.1.1362

Page 3 of 3

