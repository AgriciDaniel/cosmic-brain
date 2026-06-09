  Download of inspection specifications / master data

1  Download of inspection specifications / master data

The processing of all other segments in the integration scenario with PP-PDC and / or HYINFO interface

extension  are  described  in  their  respective  interface  documentations  (HKMPP-PDC.pdf  or  HKMPP-

INF.pdf). In this chapter the QM-IDI processing is described only.

Inspection batch / operations in “Z2QAIVC000X000” structure

Field name:

T  L  D

CHAR  3

Description
Record type for header record

Use in HYDRA

Not used

NUMC  12

Number of the inspection batch

Number of the inspection batch

CHAR  6

Operation sequence in task list

VORNR

CHAR  4

Operation number

In accordance with configuration
(*1)

In accordance with configuration
(*1)
Display in HYDRA client (*2)

CHAR  4

CHAR  8

CHAR  2

DATE  8

Plant of the inspection batch

Plant of the inspection batch

Inspection type

Inspection type

Origin of the inspection batch

Origin of the inspection batch

Creation date of the inspection batch   Creation date of the inspection

batch

CHAR  12

User who created the data record

User who created the data record

CHAR  12

User who changed the data record

User who changed the data record

DATE  8

CHAR  1

CHAR  1

CHAR  4

CHAR  8

CHAR  1

CHAR  4

CHAR  8

Change date of the data record

Change date of the data record

Ind.: make usage decision in
subsystem

“X”

“ “

Usage decision will be
made in HYDRA
Usage decision will be
made in SAP

Catalog type for usage decision

Catalog type for usage decision

Plant of selected set for usage dec.

Plant of selected set for usage
dec.

Selected set for usage decision

Selected set for usage decision

Catalog type for inspection point
valuation

Catalog type for inspection point
valuation

Plant of the selected set for the
inspection point valuation

Plant of the selected set for the
inspection point valuation

Selected set for the inspection point
valuation

Selected set for the inspection
point valuation

Code group proposal when inspection
point is accepted (acceptance of all
characteristics)

Code group proposal when
inspection point is accepted
(acceptance of all characteristics)

Code proposal when inspection point
is accepted

Code proposal when inspection
point is accepted

Code group proposal when inspection
point is rejected (rejection of one
characteristic at least)

Code group proposal when
inspection point is rejected
(rejection of one characteristic at
least)

Code proposal when inspection point
is rejected

Code proposal when inspection
point is rejected

Task list type

Task list type

Key of task list group

Key of task list group

Task list usage

Task list usage

PPVECODGRA

CHAR  4

PPVECODEA

CHAR  4

PPVECODGRR

CHAR  4

PPVECODER

PLNTY

PLNNR

PPLVERW

CHAR  4

CHAR  1

CHAR  8

CHAR  3

SATZART

PRUEFLOS

PLNFL

WERK

ART

HERKUNFT

ENTSTEHDAT

ERSTELLER

AENDERER

AENDERDAT

KZVESUBSYS

VKATART

VWERKS

VAUSWAHLMG

PPVEKATART

PPVEWERK

PPVEMENGE

MBL_SAP_Implementation_QM_Down.docxVersion: 1.0.1362

Page 1 of 11

  Download of inspection specifications / master data

Field name:

T  L  D

Description

Use in HYDRA

PLNAL

ZAEHL

PLANKTEXT

DATUV

PASTRTERM

PAENDTERM

KUNNR

NAME1KUN

LIFNR

NAME1LIF

CHAR  2

NUMC  8

Task list group counter

Task list group counter

Version counter for task list

Version counter for task list

CHAR  40

Short text of the task list

Short text of the task list

DATE  8

DATE  8

DATE  8

Start of validity for task list header

Start of validity for task list header

Start date of the inspection

Start date of the inspection

Finish date of the inspection

Finish date of the inspection

CHAR  10

Customer number

Customer number

CHAR  35

Name 1 of the customer

Name 1 of the customer

CHAR  10

Vendor number

Vendor number

CHAR  35

Name 1 of the vendor

Name 1 of the vendor

HERSTELLER

CHAR  10

Number of the manufacturer

Number of the manufacturer

NAME1HER

MATNR

KTEXTMAT

KTEXTLOS

CHARG

CHAR  35

Name 1 of the manufacturer

Name 1 of the manufacturer

CHAR  18

Material number

Material number

CHAR  40

Short text of the material

Short text of the material

CHAR  40

Short text of the inspection batch

Short text of the inspection batch

CHAR  10

Batch number

Batch number

LAGORTCHRG

CHAR  4

Storage location of the batch

Storage location of the batch

LICHN

IDNLF

KDMAT

POSTX

WERKVORG

LAGORTVORG

LOSMENGE

MENGENEINH

GESSTICHPR

EINHPROBE

EBELN

EBELP

MJAHR

MBLNR

ZEILE

BUDAT

AUFNR

KDAUF

KDPOS

VORKTXT

PRPLATZ

PRPLATZWRK

PRPLATZTXT

SUBSYS

QKZPRZEIT

CHAR  15

Batch number used by vendor

Batch number used by vendor

CHAR  35

Material number used by vendor

Material number used by vendor

CHAR  35

Material number used by customer

Material number used by customer

CHAR  40

Mat. short text used by customer

Mat. short text used by customer

CHAR  4

CHAR  4

Plant of the goods movement

Plant of the goods movement

Storage location for the goods
movement

Storage location for the goods
movement

CHAR  17

Inspection batch quantity

Inspection batch quantity

CHAR  3

Base unit of measure of the inspection
batch

Base unit of measure of the
inspection batch

CHAR  17

Sample size for inspection batch

Sample size for inspection batch

CHAR  3

Unit of measure for sample

Unit of measure for sample

CHAR  10

Purchasing document number

Purchasing document number

NUMC  5

NUMC  4

Item no. of purchasing document

Item no. of purchasing document

Year of the material document

Year of the material document

CHAR  10

Number of the material document

Number of the material document

NUMC  4

DATE  8

Item in material document

Item in material document

Posting date in document

Posting date in document

CHAR  12

Order number

Order number

CHAR  10

Customer order number

Customer order number

NUMC  6

Item number in sales order

Item number in sales order

CHAR  40

Short text for operation

Short text for operation

CHAR  8

CHAR  4

Work center

HYDRA Machine / Work center

Plant of the target work center

Plant of the target work center

CHAR  40

Short text of the work center

Short text of the work center

CHAR  6

CHAR  1

Ind.: work cycle = time

Identifier of the subsystem

Identifier of the subsystem

“X”

“X”

Inspection point based
on time intervals

Inspection point based
on quantity intervals

QKZPRMENG

CHAR  1

Ind.: work cycle = quantity

QKZPRFREI

CHAR  1

Ind.: any work cycle

“X”

Free inspection points

MBL_SAP_Implementation_QM_Down.docxVersion: 1.0.1362

Page 2 of 11

  Download of inspection specifications / master data

Field name:

T  L  D

Description

Use in HYDRA

QRASTZEHT

CHAR  3

Time unit of inspection grid

Supported units:
 seconds
„S“
„SEC“   seconds
„MIN“   minutes
 hours
„H“
„HUR“   hours
„STD“   hours

QRASTZFAK

QRASTMENG

QRASTEREH

NUMC  6

Time factor for inspection grid

Value for the time interval

CHAR  17

Quantity between two inspections

Value for the quantity interval

CHAR  3

Unit of measure of the insp. grid

PPKTTYP

CHAR  1

Inspection point type

KZEQUNR

CHAR  1

Indicator: user field EQUNR active

SWEQUNR

KZTPLNR

SWTPLNR

KZPHYNR

SWPHYNR

KZUSERC1

CHAR  20

Key word for user field EQUNR

CHAR  1

Indicator: user field TPLNR active

CHAR  20

Key word for user field TPLNR

CHAR  1

Indicator: user field PHYNR active

CHAR  20

Key word for user field PHYNR

CHAR  1

Indicator: user field USERC1 active

SWUSERC1

CHAR  20

Key word for user field USERC1

KZUSERC2

CHAR  1

Indicator: user field USERC2 active

SWUSERC2

CHAR  20

Key word for user field USERC2

KZUSERN1

CHAR  1

Indicator: user field USERN1 active

SWUSERN1

CHAR  20

Key word for user field USERN1

KZUSERN2

CHAR  1

Indicator: user field USERN2 active

SWUSERN2

CHAR  20

Key word for user field USERN2

KZUSERD1

CHAR  1

Indicator: user field USERD1 active

SWUSERD1

CHAR  20

Key word for user field USERD1

KZUSERT1

CHAR  1

Indicator: user field USERT1 active

SWUSERT1

CHAR  20

Key word for user field USERT1

Unit of measure for the quantity
interval

Type of inspection point
“ “
“1”
“2”
“3”

IP for IPC
IP for equipment
IP functional location
IP for physical sample

“X”
“ “

“X”
“ “

“X”
“ “

“ “
“X”
“1”

Field is active
Field is not active

Field is active
Field is not active

Field is active
Field is not active

Field is not active
Optional field
Obligatory field

Key word displayed when creating
/ closing inspection points

“ “
“X”
“1”...”6”  Obligatory field

Field is not active
Optional field

Key word displayed when creating
/ closing inspection points

“ “
“X”
“1”...”6”  Obligatory field

Field is not active
Optional field

Key word displayed when creating
/ closing inspection points

“ “
“X”
“1”...”6”  Obligatory field

Field is not active
Optional field

Key word displayed when creating
/ closing inspection points

“ “
“X”
“1”...”6”  Obligatory field

Field is not active
Optional field

Key word displayed when creating
/ closing inspection points

“ “
“X”
“1”...”6”  Obligatory field

Field is not active
Optional field

Key word displayed when creating
/ closing inspection points

MBL_SAP_Implementation_QM_Down.docxVersion: 1.0.1362

Page 3 of 11

  Download of inspection specifications / master data

Field name:

T  L  D

TEILLOSPFL

CHAR  1

Description
Indicator: assignment of partial batch
to an inspection point required

Use in HYDRA
Partial batch

“X”
confirmation
“ “

No partial batch
confirmation

CHARGPFL

CHAR  1

Indicator: batch management required   “X”
“ “

Batch managed
No batch management

QUANTITIES

CHAR  1

Confirmation of quantity required

EVALUATION

CHAR  1

Confirmation of a valuation required,
else confirmation by QM

“X”

“ “

“X”

“ “

Confirmation of quantity
required
Confirmation of quantity
not required

Confirmation of
evaluation required
Confirmation of
evaluation not required

KOSTL

KZKORRTRAN

PRUEFSTAT

CHAR  10

Cost center

Cost center

CHAR  1

CHAR  1

Ind.: Correction transmission

Ind.: Correction transmission

Status of the inspection

Entries correspond with status of
inspection requirements:
 FRE
“A”
 ABG
“B”
 STO
“C”
 UNT
“D”
 SKL
“E”
 GES
“F”
In case PRUEFSTAT = “E”,
additionally the skip lot flag is set
to “1”, else to “0”

EINHVORG

RUECKMPP

CHAR  3

CHAR  1

Unit of measure for operation

Indicator: confirmation of inspection
point required. This field is currently
not supported.

Not used

Characteristics in “Z2QAIMV000X000” structure

Field name:

T  L  D

Description

Use in HYDRA

SATZART

CHAR  3

Record type

Not used

RUECKMELNR

NUMC  8

Confirmation  number
characteristic

for

inspection

Confirmation number

MBL_SAP_Implementation_QM_Down.docxVersion: 1.0.1362

Page 4 of 11

  Download of inspection specifications / master data

Field name:

T  L  D

Description

Use in HYDRA

ERFASSART

CHAR  1

Recording type for insp. charact.

KZBEWSUBSY

CHAR  1

Ind.: valuation by subsystem

BEWART

CHAR  1

Valuation type for insp. charact.

“A”

“B”
“C”

“D”

“E”
“F”
“G”

“H”
“I”

“J”

“K”

“L”

“M”

“N”

“O”

“P”

“Q”

“R”

“X”
“ “

“A”

“B”

“C”

“D”

“E”
“F”

“G”

“H”

of

for

for

for

value

value

value

for  a

Measured
single unit
Code for single unit
Valuation  for  single  unit
(OK/not OK)
Measured
sample
Code for sample
Valuation of a sample
Measured  value
characteristic
Code for a characteristic
Valuation
a
characteristic
Measured
single unit in a sample
Code  for  single  unit  in  a
sample
Valuation  for  single  unit
in a sample
Measured
for
sample  of  an  inspection
point
Code  for  single  unit  of
an inspection point
Valuation  for  single  unit
of an inspection point
Measured
for
sample  of  an  inspection
point
Code  for  sample  of  an
inspection point
Valuation for sample of
an inspection point

value

value

Valuation in HYDRA
Valuation in SAP

Valuation by number of
non-conforming units (N-
C relation)
Valuation by number of
defects (N-C relation)
Valuation according to s
method (ISO3951)
Valuation according to
code
Manual valuation
Valuation based on the
mean value within
tolerance limits
Valuation at sample
level
Valuation according to
control chart

MBL_SAP_Implementation_QM_Down.docxVersion: 1.0.1362

Page 5 of 11

  Download of inspection specifications / master data

Field name:

T  L  D

Description

KZRZWANG

CHAR  1

Results recording required

STATUSV

STATUSR

KZPRUMF

CHAR  1

CHAR  1

CHAR  1

Ind.: inspection scope

KZDOKU

CHAR  1

Documentation required

KZSERNR

CHAR  1

Ind.: record serial number

KZTSTICHPR

CHAR  1

Ind.: partial samples for charact.

KZRAST

CHAR  1

Ind.: inspection with insp. grid

Use in HYDRA
Inspection for
characteristic is optional
Inspection required if
result for preceding
required characteristic
is OK
Inspection required if
result for preceding
required characteristic
is not OK
Inspection for
characteristic is required

" "

“+”

“-“

“X”

Not used

Not used

“=”

“<”

“>”

“ “

Specified scope of insp.
must be adhered to
Scope of insp. may be
below specification
Specified scope of
inspection may be
exceeded
Scope of insp. may fall
below or exceed
specification

Inspection description for

“ “
characteristic is optional
“.”

(dot) Inspection
description required in
case of rejection
Inspection description
required

Serial  number  optional
with single values
Serial  number  required
with single values

Inspect  single  sample
for characteristic
Inspect  multiple  sample
for characteristic

procedure

Sampling

“ “
without inspection grid
“X”
inspection grid

Sampling procedure with

“+”

“ “

“X”

“ “

“X”

RASTER

NUMC  3

Inspection  frequency  within  inspection
grid

Inspection frequency within
inspection grid

SOLLSTPANZ

CHAR  5

No. of partial samples planned

No. of partial samples planned

MBL_SAP_Implementation_QM_Down.docxVersion: 1.0.1362

Page 6 of 11

  Download of inspection specifications / master data

Field name:

T  L  D

BEWARTSP

CHAR  1

Description
Valuation type of partial sample

Use in HYDRA
Valuation by number of
non-conforming units (N-
C relation)
Valuation by number of
defects (N-C relation)
Valuation according to s
method (ISO3951)
Valuation according to
code
Manual valuation
Valuation based on the
mean value
within tolerance limits
Valuation at sample
level
Valuation according to
control chart

“A”

“B”

“C”

“D”

“E”
“F”

“G”

“H”

PRUEFLOS

PLNFL

NUMC  12

Number of the inspection batch

Number of the inspection batch

CHAR  6

Number of the task list sequence

VORNR

CHAR  4

Operation number

In accordance with configuration
(*1)

In accordance with configuration
(*1)

MERKNR

QPMK_WERKS

VERWMERKM

MKVERSION

QMTB_WERKS

PMETHODE

PMTVERSION

PMTKURZTXT

PRUEFQUALI

MERKGEW

GEWKURZTXT

KURZTEXT

FORMEL

DUMMY10

DUMMY20

DUMMY40

STELLEN

MASSEINHSW

SOLLWERT

TOLERANZOB

TOLERANZUN

PLAUSIOBEN

PLAUSIUNTE

GRENZEOB1

GRENZEUN1

GRENZEOB2

GRENZEUN2

NUMC  4

CHAR  4

CHAR  8

CHAR  6

CHAR  4

CHAR  8

CHAR  6

Characteristic number

Characteristic number

Plant of master inspection charact.

Plant of master inspection charact.

Master inspection characteristic

Master inspection characteristic

Version of master insp. charact.

Version of master insp. charact.

Plant of the inspection method

Plant of the inspection method

Inspection method

Inspection method

Version of the inspection method

Version of the inspection method

CHAR  40

Short text of the inspection method

Short text of the inspection method

CHAR  5

CHAR  2

CHAR  40

Inspector qualification

Inspector qualification

Weighting of insp. characteristic

Weighting of insp. characteristic

Short  text  for  weighting  of  inspection
characteristic

Short
inspection characteristic

text

for  weighting  of

CHAR  40

Short text of the characteristic

Short text of the characteristic

CHAR  12
0

Formula for inspection charact.

Formula for inspection charact.

CHAR  10

Additional information 1

Customer / project specific usage

CHAR  20

Additional information 2

Customer / project specific usage

CHAR  40

Additional information 3

Customer / project specific usage

NUMC  2

CHAR  3

No. of digits after decimal point

No. of digits after decimal point

Unit of measure for insp. charact.

Unit of measure for insp. charact.

CHAR  16

Target value/nominal value

Target value/nominal value

CHAR  16

Upper tolerance limit

CHAR  16

Lower tolerance limit

CHAR  16

Upper plausibility limit

CHAR  16

Lower plausibility limit

Upper tolerance limit

Lower tolerance limit

Upper plausibility limit

Lower plausibility limit

CHAR  16

First upper limit value

Customer / project specific usage

CHAR  16

First lower limit value

Customer / project specific usage

CHAR  16

Second upper limit value

Customer / project specific usage

CHAR  16

Second lower limit value

Customer / project specific usage

MBL_SAP_Implementation_QM_Down.docxVersion: 1.0.1362

Page 7 of 11

  Download of inspection specifications / master data

Field name:

T  L  D

Description

KATAB1

CHAR  1

Ind.: catalog entry 1 is selected set

“X”

“ “

Use in HYDRA
catalog entry 1 is
selected set
catalog entry 1 is not
selected set

KATALGART1

AUSWMGWRK1

AUSWMENGE1

KATAB2

KATALGART2

AUSWMGWRK2

AUSWMENGE2

KATAB3

KATALGART3

AUSWMGWRK3

AUSWMENGE3

KATAB4

KATALGART4

AUSWMGWRK4

AUSWMENGE4

KATAB5

KATALGART5

AUSWMGWRK5

AUSWMENGE5

SOLLSTPUMF

PROBEMGEH

PROBMGFAK

ANNAHME

RUECKWEZ

KFAKTOR

QRKNR

CHAR  1

CHAR  4

CHAR  8

CHAR  1

CHAR  1

CHAR  4

CHAR  8

CHAR  1

CHAR  1

CHAR  4

CHAR  8

CHAR  1

CHAR  1

CHAR  4

CHAR  8

CHAR  1

CHAR  1

CHAR  4

CHAR  8

NUMC  7

CHAR  3

NUMC  6

NUMC  5

NUMC  5

Catalog type 1

Catalog type 1

Plant of selected set 1

Plant of selected set 1

Selected set / code group 1

Selected set / code group 1

Ind.: catalog entry 2 is selected set

“X”

“ “

catalog entry 2 is
selected set
catalog entry 2 is not
selected set

Catalog type 2

Catalog type 2

Plant of selected set 2

Plant of selected set 2

Selected set / code group 2

Selected set / code group 2

Ind.: catalog entry 3 is selected set

“X”

“ “

catalog entry 3 is
selected set
catalog entry 3 is not
selected set

Catalog type 3

Catalog type 3

Plant of selected set 3

Plant of selected set 3

Selected set / code group 3

Selected set / code group 3

Ind.: catalog entry 4 is selected set

“X”

“ “

catalog entry 4 is
selected set
catalog entry 4 is not
selected set

Catalog type 4

Catalog type 4

Plant of selected set 4

Plant of selected set 4

Selected set / code group 4

Selected set / code group 4

Ind.: catalog entry 5 is selected set

“X”

“ “

catalog entry 5 is
selected set
catalog entry 5 is not
selected set

Catalog type 5

Catalog type 5

Plant of selected set 5

Plant of selected set 5

Selected set / code group 5

Selected set / code group 5

Sample  size
inspection characteristic

to  be  checked  per

If SOLLSTPANZ > 0, then the
sample size is calculated through
the formula SOLLSTPUMF /
SLLSTPANZ

Unit of measure for sample

Unit of measure for sample

Factor for sample unit of measure

Factor for sample unit of measure

Acceptance  number
inspection

for  attributive

Acceptance  number  for  attributive
inspection

Rejection
inspection

number

for

attributive

Rejection  number
inspection

for  attributive

CHAR  16

K factor for variable inspection

K factor for variable inspection

NUMC  12

Control chart number

Transformation of SAP control
chart number into HYDRA control
chart number

PHYSPROBE

KZKORRTRAN

NUMC  6

CHAR  1

Number of the physical sample

Number of the physical sample

Ind.: correction transmission

“ “
“X”

First transmission
Correction transmission

ZAEHL

NUMC  8

Version counter

Version counter

MBL_SAP_Implementation_QM_Down.docxVersion: 1.0.1362

Page 8 of 11

  Download of inspection specifications / master data

Field name:

T  L  D

ANTVERF

CHAR  1

Description
Share calculation procedure

Use in HYDRA
Binomial distribution
Poisson distribution
Normal distribution
Distribution not specified

“A”
“B”
“C”
“ “

Catalog master data in “Z2QAICA000X000” structure

Field name:

T  L  D

Description

Use in HYDRA

SATZART

KATAB

KATALGART

AUSWMGWRK

AUSWMENGE

CODEGRUPPE

CODE

KURZTEXT

BEWERTUNG

CHAR  3

Record type

Not used

CHAR  1

Ind.: entry is selected set

“X”
“X”

entry is selected set
entry is no selected set

CHAR  1

CHAR  4

CHAR  8

CHAR  8

CHAR  4

Catalog type

Catalog type

Plant of the selected set

Plant of the selected set

Selected set

Code group

Code

Selected set

Code group

Code

CHAR  40

Short text of the code

Short text of the code

CHAR  1

Valuation

FEHLKLASSE

CHAR  2

Defect class

MUSSTEXTKZ

CHAR  1

Ind.: text required for confirmation.

BB_VORSCH

CHAR  1

Ind.: carry out inventory posting

“A”
“R”
“ “

Acceptance (OK)
Rejection (not OK)
Valuation not carried out

Always the same values allowed.
Defined in Customizing
(transaction OQC7)

“ “
“X”

“ “
“X”

Text not obligatory
Text obligatory

No inventory posting
Inventory posting carried
out

QKENNZAHL

NUMC  3

Quality score

Quality score

Inspection Points in “Z2QAIPP000X000” structure

Field name:

T  L  D

Description

Use in HYDRA

SATZART

PRUEFLOS

PLNFL

VORNR

PROBENR

TEILLOS

MENGE

EINHPR

EQUNR

CHAR  3

Record type

“Q85”

Download of
inspection point

NUMC  12

Inspection batch number

CHAR  6

CHAR  4

NUMC  6

NUMC  6

Operation sequence in task list

Operation number

Sample number

Partial batch number

CHAR  17

Inspection point quantity

CHAR  3

Unit of measure for inspection point   Not used

CHAR  18

Equipment  number  Cannot  be  defined
freely  (value  range  determined  by
inspection  batch);  inspection  points  of
through  3  already  defined
type  1
(these
inspection  points  can  be
retrieved with function module

MBL_SAP_Implementation_QM_Down.docxVersion: 1.0.1362

Page 9 of 11

Field name:

T  L  D

CHAR  30

CHAR  12

  Download of inspection specifications / master data

Description
Number  of  functional  location  (see
EQUNR)

Number  of  physical  sample
EQUNR)

(see

Use in HYDRA

TPLNR

PHYNR

USERC1

USERC2

USERN1

USERN2

USERD1

USERT1

VKATART

VWERKS

VAUSWAHLMG

VCODEGRP

VCODE

VTEXT

MATNR

CHARG

PRUEFDATUM

PRUEFZEIT

PRUEFER

KZRMART

URSACHEAS

MENGEAS

MENGENA

CHAR  18

User field for 18 characters

CHAR  10

User field for 10 characters

NUMC  10

User field for 10 digits

NUMC  3

DATE  8

TIME  6

CHAR  1

CHAR  4

CHAR  8

CHAR  8

CHAR  4

User field for 3 digits

User field for date

User field for time

Catalog type

Plant

Selected  set  of  the  usage  decision  for
the inspection point

Not used (only for upload)

Not used (only for upload)

Not used (only for upload)

Code group of the usage decision

Not used (only for upload)

Code of the usage decision

Not used (only for upload)

CHAR  40

Short text for partial batch

CHAR  18

Material number

Not used

CHAR  10

Batch number

DATE  8

TIME  6

Start date of the inspection

Start time of the inspection

CHAR  12

Name of the inspector

Not used

Not used

Not used

CHAR  1

CHAR  4

Confirmation type, currently not used   Not used

Reason for scrap, currently not used   Not used

CHAR  17

Scrap quantity

CHAR  17

Rework quantity

Error messages in “Z2QIERR000X000” structure

Field name:

T  L  D

Description

Use in HYDRA

LFDNR

NUMC  4

Consecutive number

Usage in HYDRA Escalation
Management (Acronym complies
with field name)

MSGID

MSGNR

MSGTYPE

MSGTEXT

LOG_NO

CHAR  20

Message class

NUMC  3

CHAR  1

Message number

Message type (E, I, W,...)

CHAR  73

Message text

Vide field LFDNR

Vide field LFDNR

Vide field LFDNR

Vide field LFDNR

CHAR  20

Application log: protocol number

Vide field LFDNR

LOG_MSG_NO

NUMC  6

Application
message

log:  number  of  current

Vide field LFDNR

PARAM_NAME

PARAM_ROW

PARAM_FIELD

PRUEFLOS

PLNFL

CHAR  32

Parameter name

NUMC  10

Line in parameter

CHAR  30

Field in parameter

NUMC  12

Inspection batch number

CHAR  6

Sequence  of  operations  within  a  task
list

Vide field LFDNR

Vide field LFDNR

Vide field LFDNR

Vide field LFDNR

Vide field LFDNR

VORNR

CHAR  4

Operation number

Vide field LFDNR

MBL_SAP_Implementation_QM_Down.docxVersion: 1.0.1362

Page 10 of 11

  Download of inspection specifications / master data

Field name:

T  L  D

VORGLFNR

MERKNR

KATAB

KATALGART

AUSWMGWRK

AUSWMENGE

CODEGRUPPE

CODE

RUECKMELNR

PROBENR

STUECKNR

NUMC  8

NUMC  4

CHAR  1

CHAR  1

CHAR  4

CHAR  8

CHAR  8

CHAR  4

NUMC  8

NUMC  6

NUMC  4

Description
Consecutive  node  number  from  order
counter APLZL

Use in HYDRA

Vide field LFDNR

Inspection characteristic number

Vide field LFDNR

Indicator:  catalog  entry  is  a  selected
set

Vide field LFDNR

Catalog  type  of  the  assigned  code
group or selected set

Vide field LFDNR

Plant of the assigned selected set

Vide field LFDNR

Assigned code group or selected set   Vide field LFDNR

Code group

Code

Confirmation number for the inspection
point

Number of the sample

Consecutive  number  for  unit  to  be
inspected

Vide field LFDNR

Vide field LFDNR

Vide field LFDNR

Vide field LFDNR

Vide field LFDNR

SATZART

CHAR  3

Record types

Vide field LFDNR

MBL_SAP_Implementation_QM_Down.docxVersion: 1.0.1362

Page 11 of 11

