                                                 Customizing the Premium/Incentive Wage based on Formulas

1  Customizing the Premium/Incentive Wage based on

Formulas

1.1  Overview

You can use the  incentive  wage  based  on formulas to configure  premium and incentive  wage systems,

which  are  based  on  the  data  recorded  in  HYDRA  via  the  Order  Data  Collection  ADE,  the  Time  and

Attencance PZE and the Incentive Wage LLE.

The customization can be performed by MPDV or by the customers that attended the relevant training.

The customization is made via user exits in HYDRA script language and user field configurations.

You always make the difference between an individual wage calculation and group incentives.

1.2  Requirements

1.2.1  Customization training

To  customize  a  formula-based  premium/incentive  wage,  you  must  attend  the  individual  customizing

training CUTI-LLE.

1.2.2

The HYDRA script language

You use the HYDRA script language to make customer-specific calculations or to assign values in user

exits. You can also change data that has already been preprocessed in HYDRA.

A separate document describes the HYDRA script language in detail. In the sections below, knowledge of

the script language is a precondition.

1.3  General data in user exits

1.3.1  Wage type data

In  many  user  exits,  master  data  for  wage  types  is  provided.  They  have  the  same  name,  but  different

prefixes (displayed below with an asterisk). It is always the same data that is provided for the wage types.

The following sections therefore refer to this list:

Parameter

Type  Contents

Data for wage type

*LART

C  4

Wage type

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 1 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

*BEZK

*BEZL

*VAB

*OPT_LLE

*ZEIART

C  6

C  20

C  15

C  1

C  3

Short name

Detailed designation

Responsibility area of wage type

LLE indicator

New: Time type

The following fields are in the first place relevant to the Time and Attendance, but the fields can also
be evaluated in the Incentive Wage:

*CERTIFY

*RM_LOBU

*OPT_SZMA

*ART

*PROZ

*LART_LOBU

C  1

Subject to approval J/N

C  1

J/N: Confirm wage type to payroll system

C  1

Empty:  not specified
M:
S:
I:

overtime
target work
undertime

C  1  G:
Z:

basic wage
bonus

N

Percentage

C  4

LOBU wage type. Wage type for the upload to payroll
accounting

*MOD_LOBU

C10

LOBU indicator

*VERB

*LSS

*OPT_KST

*AVGART

*RINT

*RG

C  1

Processing

F

Hourly rate

C  1

Selection indicator

C  1

Average Type

N

N

Rounding interval in seconds

Rounding limit in seconds

*OPT_ADEABGL

C  1

J/N: Use wage type for ADE comparison

*OPT_ADEDEL

C  1

J/N: Delete PZE bookings to this wage type after ADE
comparison

1.3.2  HR master data

The prefix of the HR master data is usually PNR_. An asterisk replaces this prefix in the table below:

Parameter

Type

Contents

*PNR

*DATB

*DATE

long

date

date

Personnel number

Start of validity of the HR master data

End of validity of the HR master data

*PNAME

char(40)

Last name

*PVORNAME

char(20)

First name

*NAME

char(62)

Last name, first name

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 2 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

*EINTRITT

*AUSTRITT

*FIR

*BER

*KST

*PKREIS

*GEBDAT

*PRKZ

*ABT

date

date

char(4)

char(8)

Date of joining

Date of leaving

Company

Area

char(10)

Cost center.

char(8)

Employee subgroup

date

char(1)

char(8)

Date of birth

Premium indicator

Department

*GESCHLECHT

char(1)

Gender M/W (male/female)

*INFOTEXT_01

char(40)

Free text field 01

…

…

…

*INFOTEXT_20

char(10)

Free text field 20

*INFOWERT_1

long

Free number field 1

…

*INFOWERT_5

*INFODAT_1

…

*INFODAT_5

…

long

date

…

date

…

Free number field 5

Free date field 1

…

Free date field 5

*LEISTGRP

char(8)

Regular premium group of person

*ANTFAKTLBON

long

Proport. factor for incentive bonus

*BPOS

*LPKZ

*LART

*LGRP

char(10)

Regular operator function

char(10)

Regular wage/premium indicator

char(4)

char(4)

Regular wage type

Regular wage group

1.3.3  Operation data

The prefix for operations is usually ANR_. An asterisk replaces this prefix in the table below:

Parameter

Type

Contents

*ANR

*AART

*AARTKAT

*PRKZ

*LART

*TE

char(40)

Order number from posting

char(5)

char(2)

char(1)

char(4)

double

Order type

Category of order type

Piecework indicator

Wage type

Single piece specification te

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 3 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

*TEB

*TR

*TRB

*SZY

*IMPFAKT

double

double

double

double

double

Single piece specification (production resource) teb

Default setup time tr

Default setup time (production resources) trb

Target cycle

Pulse factor

*ATK

char(40)

Article

*MBVERH_NOR
M

double

M/O relation production (machine/operator relation)

*MBVERH_RUE

double

M/O relation setup (machine/operator rel.)

*KDAUNR

char(40)

Customer order number

*USERCODE

char(8)

User field key

*FU01

...

*FU06

*FU07

...

*FU22

*FU23

...

*FU28

*FU29

...

*FU44

*FU45

*FU46

*FU47

...

*FU50

*FU51

...

*FU53

*FU54

...

*FU57

*FU58

*FU59

*FU60

date

...

date

long

...

long

User field

...

User field

User field

...

User field

double

User field

...

...

double

User field

char(1)

User field

...

...

char(1)

User field

char(10)

User field

char(10)

User field (former *PARAM_K1)

char(10)

User field (former *PARAM_K2)

...

...

char(10)

User field

char(20)

User field

...

...

char(20)

User field (former *BEM_1)

char(20)

User field (former *BEM_2)

...

...

char(20)

User field (former *KDPARAM_1)

char(20)

User field (former *KDPARAM_2)

char(20)

User field (former *KDPARAM_3)

char(20)

User field (former *KDPARAM_4)

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 4 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

*FU61

...

*FU64

*FU65

*FU66

*SGR_GUTP

*SGR_GUTS

*SGR_GUTT

*SGR_GUTB

*SGR_AUSP

*SGR_AUSS

*SGR_AUST

*SGR_AUSB

char(20)

User field (former *KDPARAM_5)

...

...

char(20)

User field

char(40)

User field

char(40)

User field

double

double

double

double

double

double

double

double

Target quantity primary quantity unit

Target quantity secondary quantity unit

Target quantity tertiary quantity unit

Target quantity base quantity unit

Planned scrap primary unit

Planned scrap primary quantity unit

Planned scrap primary quantity unit

Planned scrap primary quantity unit

1.3.4  Machine/workplace data

The prefix for machines/workplaces is usually MNR_. An asterisk replaces this prefix in the table below:

Parameter

Type

Contents

*MNR

*PRKZ

*MGRP

*ART

*KST

*BEZK

*BEZL

char(20)

Machine number

char(1)

Premium indicator

char(20)

Machine group

char(1)

Type (single/group workplace)

char(10)

Regular cost center

char(8)

Short name

char(40)

Detailed designation

*BDEJMOD

*IMPFAKT

long

long

Year model number

Pulse factor

*FIR

char(4)

Company

*LEISTUNG

*MSTDSATZ

*PSTDSATZ

*TLG

*CAT

*VAB

double

double

double

long

Planned performance level

Standard rate, machine

Standard labor rate

Partitioning

char(10)

Category

char(15)

Responsibility area

*USERCODE

char(8)

User field key

*FU01

...

date

...

User field

...

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 5 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

*FU06

*FU07

...

*FU22

*FU23

...

*FU28

*FU29

...

*FU44

*FU45

...

*FU50

*FU51

...

*FU64

*FU65

*FU66

date

long

...

long

User field

User field

...

User field

double

User field

...

...

double

User field

char(1)

User field

...

...

char(1)

User field

char(10)

User field

...

...

char(10)

User field

char(20)

User field

...

...

char(20)

User field

char(40)

User field

char(40)

User field

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 6 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

1.3.5  Data of postings and bookings

This data is usually ADE log data. The prefix for this data is usually ADEPRO_. An asterisk replaces this

prefix in the table below:

Parameter

*VERWEIS

*PNR

*KST

*DAT

*DATB

*ZEIB

*DATE

*ZEIE

*LEISTGRP

*LART

*MNR

*ANR

*TE

*TEB

*TR

*TRB

Type

long

long

Contents

Database ID

Personnel number

char(10)

Cost center

date

date

long

date

long

Date

Logon date

Logon time

Logoff date

Logoff time

char(8)

char(4)

Premium group (cid:129)

Wage type

char(20)

Machine

char(40)

Order/operation

double

double

double

double

Single piece specification te

Single piece specification (production resource) teb

Default setup time tr

Default setup time (production resource) trb

*BEARB

char(10)

Modified by

*BEARBDAT

*BEARBZEI

date

long

Modified on

Processing time

*SART

*BPOS

*LPKZ

char(10)

Record type of posting

char(10)

Operator position/function

char(10)

Wage/premium indicator

*KARENZ

char(1)

Waiting period indicator (P=waiting period personnel, M=waiting
period machine)

*SKNR

long

Shift number

*SCHICHT_DAT

date

Shift date

*BMK01

double

Order-related resource performance account 1

...

*BMK12

*DAUER

*PBMK01

...

...

double

double

double

...

...

Order-related resource performance account 12

Order-related duration

Person-related resource performance account 1

...

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 7 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

*PBMK12

*PDAUER

double

double

Person-related resource performance account 12

Labor time

*RGR_BMK01

double

Order-related remaining resource performance account 1

...

...

...

*RGR_BMK12

double

Order-related remaining resource performance account 12

*RGR_DAUER

double

Order-related remaining duration

*RGR_PBMK01

double

Person-related remaining resource performance account 1

...

...

...

*RGR_PBMK12

double

Person-related remaining resource performance account 12

*RGR_PDAUER

double

Remaining labor time

*GUT

*GUTP

*GUTS

*GUTT

*GUTB

*AUS

*AUSP

*AUSS

*AUST

*AUSB

*NAC

*NACP

*NACS

*NACT

*NACB

*PRB

*PRBP

*PRBS

*PRBT

*PRBB

*EGG_GUT

*EGG_AUS

*EGG_NAC

*EGG_PRB

*EGR01

*RGR01

*EGE01

double

double

double

double

double

double

double

double

double

double

double

double

double

double

double

double

double

double

double

double

long

long

long

long

double

double

Yield primary

Yield primary

Yield secondary

Yield tertiary

Yield base

Scrap primary

Scrap primary

Scrap secondary

Scrap tertiary

Scrap base

Rework quantity primary (former *LEN)

Rework quantity primary (former *LEN)

Rework quantity secondary

Rework quantity tertiary

Rework quantity base

Problem quantity primary

Problem quantity primary

Problem quantity secondary

Problem quantity tertiary

Problem quantity base

Yield reason

Scrap reason

Rework reason

Problem quantity reason

Recorded activity 1 to 10

Recorded remaining activity 1 to 10

char(3)

Activity unit 1 to 10

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 8 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

*VERWEIS_DLG
_DATA

*CERTIFY

*SIGN

*BEM

long

Database ID for dialog data

char(1)

char(1)

char(50)

Approval required

Approved/rejected

Only with bonuses if data collection is activated (customization):
comment

*USERCODE

char(8)

User field key

*FU01

...

*FU06

*FU07

...

*FU22

*FU23

...

*FU28

*FU29

...

*FU44

*FU45

...

*FU50

*FU51

...

*FU65

*FU66

date

...

date

long

...

long

User field

...

User field

User field

...

User field

double

User field

...

...

double

User field

char(1)

User field

...

...

char(1)

User field

char(10)

User field

...

...

char(10)

User field

char(20)

User field

...

...

char(40)

User field

char(40)

User field

1.3.6  Premium group data

Master data of the premium group usually has the prefix LEISTGRP_.  An asterisk replaces this prefix in

the table below:

Parameter

*LEISTGRP

*BEZL

*PRKZ

*LART

*LART_*

Type

Contents

C  8

Premium group (cid:129)

C  20

Premium group: name

C  1

C  4

*

Premium group: premium indicator

Premium group: wage type (reserved)

Reserved: for master data of wage type, refer to the section

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 9 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

further ahead. (Available as of November/2005)

Premium group: number of premium scheme

Premium group: default value 1

...

Premium group: default value 30

Premium group: mode 1

...

Premium group: mode 5

Premium group: weekday-related default value 1 (for the
relevant weekday)

...

...

...

*PRNR

*WERT_01

...

*WERT_30

*PRMOD_01

...

*PRMOD_05

*VORGABE_01

...

*VORGABE_03

N

F

...

F

C10

...

C10

F

...

F

*VORGABE_04

C10

1.3.7

Time ticket data

The person day time tickets usually have the prefix L_. An asterisk replaces this prefix in the table below:

Parameter

*PNR

*ABREDAT

*ANR

*ZEIART

*LART

*TE

*TEB

*TR

*TRB

*DAUER

*VGZ

*GUT

*AUS

*NACHARB

*PROBLEM

*MENGE

*ZUSCHL

Typ
e

N

D

Contents

Personnel number of time ticket

Settlement date of time ticket

C  40  Operation number of time ticket

C  3

Time type of time ticket. Only change in exceptional cases.

C  4  Wage type of time ticket

F

F

F

F

F

F

F

F

F

F

F

F

Target te of time ticket

Target te of time ticket for production resource

Target tr of time ticket

Target tr of time ticket for production resource

Duration of time ticket

Standard time of time ticket

Yield of time ticket

Scrap of time ticket

Rework quantity of time ticket

Problem quantity of time ticket

Wage-relevant quantity of time ticket

Bonus time of time ticket in seconds

*ZUSCHLGR

N

Bonus reason

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 10 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

*KST

*LOHNGRP

*ZEITGRAD

*REFNR

C10

Cost center of time ticket

C  4  Wage group of time ticket

F

Performance efficiency rate of time ticket in percent from
standard processing. The performance efficiency rate does
not integrate bonuses and deductions. Performance efficiency
rates are only calculated for time tickets of the AKK time type
(piecework). Changes of the performance efficiency rate are
not transferred to the time ticket because this rate is always
calculated using the standard and the actual time.

C  20  Reference number of time ticket from standard processing.  Is
usually empty, can be shown for customer-specific information
in the time ticket log.

*LEISTGRP

C  8

Premium group (cid:129)

*PRKTO_01 … 30

F

Premium account of time ticket 1 to 30 that can be defined

*PRKZ_01 … 05

C  20  Premium account of time ticket 1 to 5 that can be defined

*CERTIFY

*SIGN

*SOLLMENGE

*SKNR

*MNR

*BMKNR

*BEM

*DATB

*ZEIB

*DATE

*ZEIE

C  1

Reserved: requires approval

C  1

Reserved: approved/rejected

F

N

Target quantity (yield / performance efficiency rate)

Shift number from ADE log record

C  20  Machine

N

Number of resource performance account for time wage from
production.

C  50  Comment

D

N

D

N

Start date (from original record)

Start time (from original record)

End date (from original record)

End time (from original record)

1.3.8  Data of person day performances

The person day performances usually have  the prefix PNRTAG_. An asterisk replaces this prefix in the

table below:

Parameter

*DAT

*PNR

*FIR

*ADE_DATB

*ADE_ZEIB

*ADE_DATE

*ADE_ZEIE

Typ
e

D

N

Contents

Date

Personnel number of time ticket

C  4

Company

D

N

D

N

Date of earliest ADE logon of person on this day

Time of earliest ADE logon of person on this day in seconds

Date of latest ADE logoff of person on this day

Time of latest ADE logoff of person on this day in seconds

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 11 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

*VGZ

*DAUER

*LEISTGRAD

*LEISTGRAD_MIN

*LEISTGRAD_MAX

*ADE_DAUER

*PZE_DAUER

*LLE_DAUER

F

F

F

F

F

F

F

F

Piecework standard time of person on this day

Piecework actual time of person on this day

Piecework efficiency performance rate of person of this day

Smallest efficiency performance rate of time ticket of this day

Greatest efficiency performance rate of time ticket of this day

Sum total of the ADE time posted for this person

PZE attendance time of person (if PZE is used)

Sum total of time ticket duration of the Incentive Wage

*PRKTO_01 to *PRKTO_30  F

Premium accounts of day performance

*PRKZ_01 to *PRKZ_05

F

Premium indicator of day performance

1.4

Individual allocation

1.4.1  Overview

The individual allocation uses all ADE and LLE data that is  not recorded for a premium group. If data is

recorded with reference to a premium group, the group calculation is performed.

In  general,  the  standard  processing  is  performed  before  an  individual  allocation.  With  specific

intermediate  steps  and  at  the  end  of  the  standard  calculations,  the  values  identified  can  be  changed

subsequently via user exit. The rules of the standard processing are described in the documents LLE-BP

und LLE-ZGG.

Each relevant data record is separately calculated. The workflow of the individual allocation of time tickets

is as follows:

1) Identifying the wage type

In  standard  processing,  the  wage  type  of  the  BDE  posting  is  normally  used.  This  wage  type  can  be

changed via user exit.

2) Identifying the time type

In the standard, the time type (AKK/ZL/...) is identified using the wage type, the order data, the HYDRA

basic settings and the master data of machines and persons. The time type identified can subsequently

be changed via user exit.

3) Standard processing

of BDE posting for time ticket. A direct intervention via user exit is not possible.

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 12 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

4) Recalculation of time tickets

The time tickets calculated by HYDRA in step 3 can be recalculated via user exit. For example, you can

specify monetary evaluations in the available premium accounts that can be defined.

5) Identifying person day performance

6) Applying person day performance on time tickets

1.4.2  Combining PZE records

If the PZE time is used for the wage calculation and is not transferred from the daily PZE performance,

then  the  PZE  time  is  the  result  of  several  single  records,  e.g.  PZE  wage  type  postings.  By  default,

HYDRA creates a PZE time ticket using each PZE original record. This can sometimes be inconvenient.

You can combine the PZE records via user exit that aggregates the data. The selected key information is

then included in one single aggregated time ticket.

The user exit is called when the premium group resulting from changes of group has been entered in the

PZE records.

The user exit always gets pairs of successive or parallel PZE records. The PZE records are processed for

each person and settlement day one after the other using the start time.

PZE records that do not follow each other in time, are not combined to be processed as one.

You use the control variables of the user exit to specify the aggregation:

PZE1_SAVE  PZE2_SAVE  Action

1

1

0

0

1

0

1

0

Both PZE records are kept and updated. This is the default if no changes
are made in the user exit.

PZE record 1 is updated, PZE record 2 is dropped

PZE record 2 is updated, PZE record 1 is dropped

Both PZE records are dropped and deleted.

User exit "hyl_pze_compr.hsc"

Import parameters:

Parameter

PZE1_POS

PZE2_POS

Type  Contents

N

N

Sequence number 1...n of first PZE record

Sequence number 1...n of second PZE record

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 13 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

Export parameters:

Parameter

Type  Contents

Data of first PZE record

PZE1_SAVE

PZE1_PNR

PZE1_ABREDAT

PZE1_LART

PZE1_KST

N

N

D

If set to 1, the first PZE record is saved.

Personnel number of PZE record

Settlement date of PZE record

C  4  Wage type or payment day type of PZE record

C10  Cost center of PZE record

PZE1_LEISTGRP

C  8

Premium group of PZE record

PZE1_DATB

PZE1_ZEIB

PZE1_DATE

PZE1_ZEIE

PZE1_DAUER

Data of second PZE record

PZE2_SAVE

PZE2_PNR

PZE2_ABREDAT

PZE2_LART

PZE2_KST

D

N

D

N

F

N

N

D

Start date (from original record)

Start time (from original record)

End date (from original record)

End time (from original record)

Duration of PZE record in hours or seconds (system setting
with LLE 7.2)

If set to 1, the second PZE record is saved.

Personnel number of PZE record

Settlement date of PZE record

C  4  Wage type or payment day type of PZE record

C10  Cost center of PZE record

PZE2_LEISTGRP

C  8

Premium group of PZE record

D

N

D

N

F

Start date (from original record)

Start time (from original record)

End date (from original record)

End time (from original record)

Duration of PZE record in hours or seconds (system setting
with LLE 7.2)

PZE2_DATB

PZE2_ZEIB

PZE2_DATE

PZE2_ZEIE

PZE2_DAUER

Example:

hydra basic;

/* ----------------------------------------------------------------------------
Script  : hyl_pze_compr.hsc
Descr.: Aggregation of PZE records

The user exit always gets pairs of successive
or parallel PZE records. The PZE records are processed for each person and
settlement day one after the other using the start time.

PZE records that do not follow each other in time, are not
combined to be processed as one.

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 14 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

You use the control variables to specify the aggregation:

  PZE1_SAVE PZE2_SAVE action
  -------------------------------------------------------------------------------
      1         1     Both PZE records are kept and updated.
      1         0     PZE record 1 is updated, PZE record 2 is dropped
      0         1     PZE record 2 is updated, PZE record 1 is dropped
      0         0     Both PZE records are dropped and deleted.

$Revision: 1.0 $
$Date: 2006/12/14 18:03:26 $
---------------------------------------------------------------------------- */

// control information
export PZE1_SAVE               long      ; // If set to 1, the first PZE record is saved.
import PZE1_POS                long      ; // Sequence number 1...n of first PZE record
export PZE2_SAVE               long      ; // If set to 1, the second PZE record is saved.
import PZE2_POS                long      ; // Sequence number 1...n of second PZE record

// Variables of first PZE record
export PZE1_PNR                long      ; // Personnel number of PZE record
export PZE1_ABREDAT            date      ; // Settlement date of PZE record
export PZE1_LART               char(4)   ; // Wage type or payment day type of PZE record
export PZE1_KST                char(10)  ; // Cost center of PZE record
export PZE1_LEISTGRP           char(8)   ; // Premium group of PZE record
export PZE1_DATB               date      ; // Start date (from original record)
export PZE1_ZEIB               long      ; // Start time (from original record)
export PZE1_DATE               date      ; // End date (from original record)
export PZE1_ZEIE               long      ; // End time (from original record)
export PZE1_DAUER              double    ; // Duration of PZE record in hours or seconds
                                           // (System settings with LLE 7.2)

// Variables of second PZE record
export PZE2_PNR                long      ; // Personnel number of PZE record
export PZE2_ABREDAT            date      ; // Settlement date of PZE record
export PZE2_LART               char(4)   ; // Wage type or payment day type of PZE record
export PZE2_KST                char(10)  ; // Cost center of PZE record
export PZE2_LEISTGRP           char(8)   ; // Premium group of PZE record
export PZE2_DATB               date      ; // Start date (from original record)
export PZE2_ZEIB               long      ; // Start time (from original record)
export PZE2_DATE               date      ; // End date (from original record)
export PZE2_ZEIE               long      ; // End time (from original record)
export PZE2_DAUER              double    ; // Duration of PZE record in hours or seconds
                                           // (System settings with LLE 7.2)

//-----------------------------------------------------------------------------
long main()
{
  dprint( "comparison"||(PZE1_POS using "##&")||" "||PZE1_DATB||" "||(PZE1_ZEIB using "$TIME")||
          " - "||PZE1_DATE||" "||(PZE1_ZEIE using "$TIME")||", "||(PZE1_DAUER using "#&.&&")||" h" );
  dprint( "      with"||(PZE2_POS using "##&")||" "||PZE2_DATB||" "||(PZE2_ZEIB using "$TIME")||
          " - "||PZE2_DATE||" "||(PZE2_ZEIE using "$TIME")||", "||(PZE2_DAUER using "#&.&&")||" h" );

  if( ( PZE1_PNR      = PZE2_PNR      ) and
      ( PZE1_ABREDAT  = PZE2_ABREDAT  ) and
      ( PZE1_LART     = PZE2_LART     ) and
      ( PZE1_KST      = PZE2_KST      ) and
      ( PZE1_LEISTGRP = PZE2_LEISTGRP ) )
  {
    PZE1_SAVE  = 1;
    PZE2_SAVE  = 0;
    PZE1_DATE  = PZE2_DATE;
    PZE1_ZEIE  = PZE2_ZEIE;
    PZE1_DAUER = PZE1_DAUER + PZE2_DAUER;
    dprint( "      new"||(PZE1_POS using "##&")||" "||PZE1_DATB||" "||(PZE1_ZEIB using "$TIME")||
            " - "||PZE1_DATE||" "||(PZE1_ZEIE using "$TIME")||", "||(PZE1_DAUER using "#&.&&")||" h" );
  }

  return 0;
}
//-----------------------------------------------------------------------------

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 15 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

1.4.3

Identifying the wage type

In  standard  processing,  the  wage  type  of  a  time  ticket  is  transferred  from  the  original  BDE  personnel

posting (B record).

This  original  BDE  personnel  posting  is  identified  using  the  wage  type  stored  for  the  operation.  Use  the

following user exit to change the wage type that is identified via standard processing.

Note that the identified wage type specifies if piecework or time wage applies. Also refer to the LLE basic

settings and explanations in the document LLE-BP and the sections below.

The  user  exit  is  only  called  when  time  tickets  are  created  via  BDE  personnel  postings  and  when

bonuses/deductions  are  created. With  other  original  records,  you  can  only  change  the  wage  type  using

the user exit lsv00000.hsc.

User exit "lsl00000.hsc"

Import parameters:

Parameter

ART

PNR

PNR_*

ANR

ANR_*

ANR_LART_*

MNR

MNR_*

ADEPRO_*

ADEPRO_LART_*

LEISTGRP_*

Export parameters:

Type  Contents

C10

N

*

Source of time ticket
PB
PZ
ZUS

: time ticket from ADE personnel postings
: time ticket from PZE wage type posting
: time ticket from bonus

Person: personnel number

Data of person (see general description above)

C  40  Order number from personnel posting

*

*

Operation data (see general description above)

Master data of wage type included in operation (see general
description above)

C  20  Machine number from personnel posting

*

*

*

*

Master data of machine
(see general description above)

Data of posting
(see general description above)

Master data of wage type included in posting
(see general description above)

Master data of premium group (see general description
above)

Available as of hyl_compute.exe|out 8.1.1.93 (04/2018)

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 16 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

Parameter

Contents

Typ
e

LART

C  4  Wage type of time ticket, the wage type of the personnel

posting is prepopulated (standard processing)

1.4.4

Identifying the time type

The  user  exit  is  only  called  when  time  tickets  are  created  via  BDE  personnel  postings  and  when

bonuses/deductions are created. With other original records, you can only change the time type using the

user exit lsv00000.hsc.

The time type specifies how the time ticket is calculated. Only time tickets with time type AKK (piecework)

are calculated as piecework and are assigned a performance efficiency rate by HYDRA.

The following time types are available (see also documentation LLE-BP):

Time
type

Meaning

AKK

Piecework

Only piecework time tickets get a performance efficiency rate

ZUS

Bonuses and deductions

Time tickets of bonuses and deductions recorded

ZL

Time wage

Time tickets with time wage can be generated for production orders that are not calculated
using a piecework wage type or for production orders with piecework that had malfunction
times.

EA

On-the-job training

Rarely used time type. Is created if persons of the HR master data have the indicator "On-
the-job training".

GK

Overheads

This time type results from the editing of overhead orders.

KAR

Waiting period

Results from postings generated via the HYDRA waiting period processing.

GRP

Group bonus

Results from times posted for premium groups that are also stored for the individual
allocation.

PZE

Labor time from PZE

Results from times that were recorded and calculated via the HYDRA Time & Attendance
PZE.

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 17 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

User exit "lsz00000.hsc"

Import parameters:

Parameter

ART

PNR

PNR_*

ANR

ANR_*

ANR_LART_*

MNR

MNR_*

ADEPRO_*

ADEPRO_LART_*

Type  Contents

C10

N

*

Source of time ticket
PB
PZ
ZUS

: time ticket from ADE personnel postings
: time ticket from PZE wage type posting
: time ticket from bonus

Person: personnel number

Data of person (see general description above)

C  40  Order number from personnel posting

*

*

Operation data (see general description above)

Master data of wage type included in operation (see general
description above)

C  20  Machine number from personnel posting

*

*

*

Master data of machine
(see general description above)

Data of posting
(see general description above)

Master data of wage type included in posting
(see general description above)

LART

C  4  Wage type of time ticket, prepopulated using the wage type of

TLS_LART*

LEISTGRP_*

Export parameters:

Parameter

ZEIART

*

*

Typ
e

C  3

the time ticket

Master data of wage type included in time ticket
(see general description above)

Master data of premium group (see general description
above)

Available as of hyl_compute.exe|out 8.1.1.93 (04/2018)

Contents

Time type of time ticket, prepopulated using standard
processing.

1.4.5  Recalculation of time tickets

When  HYDRA  has  performed  all  steps  of  the  standard  processing  of  a  time  ticket,  you  can  use  the

following user exit to recalculate the time ticket.

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 18 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

User exit "lsv00000.hsc"

Import parameters:

Parameter

ART

PNR

PNR_*

ANR

ANR_*

MNR

MNR_*

ADEPRO_*

LART*

LEISTGRP_*

Export parameters:

Type  Contents

C10

N

*

Source of time ticket
PB
PZ
ZUS

: time ticket from ADE personnel postings
: time ticket from PZE wage type posting
: time ticket from bonus

Person: personnel number

Data of person (see general description above)

C  40  Order number from personnel posting

*

Operation data (see general description above)

C  20  Machine number from personnel posting

*

*

*

*

Master data of machine
(see general description above)

Data of posting
(see general description above)

Master data of wage type included in time ticket
(see general description above)

Master data of premium group (see general description
above)

Available as of hyl_compute.exe|out 8.1.1.93 (04/2018)

All  export  parameters  are  prepopulated  using  the  results  of  the  standard  processing.  In  particular  the

premium accounts and premium indicators can be used to make separate calculations. Only change the

other export parameters in exceptional cases via user exit.

Parameter

L_*

Typ
e

*

Contents

Data for time ticket, see section above.

1.4.6

Importing time tickets into person day performance

The time tickets calculated using the available data, are imported into the person day performance:

User exit "hyl_tls2pnrtag.hsc"

Import parameters:

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 19 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

Parameter

Type  Contents

N

*

Person: personnel number

Data of person, see section above.

C  40  Operation number of time ticket

*

Operation data, see section above.

C  20  Machine of time ticket

*

*

*

Machine data, see section above.

Data of time ticket, see section above.

Wage type data of time ticket, see section above

PNR

PNR_*

ANR

ANR_*

MNR

MNR_*

TLS_ *

TLS_LART_*

Export parameters:

Parameter

PNRTAG_*

Type  Contents

*

Data of person day performance

BUFFER_1 and BUFFER_2  C

32000

Free buffer variables. The content of these variables is kept
during the complete calculation of the person day
performance. Using these variables, you can save values in
BAPI format from the import of time tickets into the day
performance up to the distribution of the day performance on
time tickets.

When the calculation of a person day performance is started,
the buffer variables are emptied.

This user exit requests two functions:

Function

Task

main()

Distributes the data of a time ticket into the fields of the person day performance

final_calc()  Final calculation of the person day performance.

In this case, only the import/export variables of the person day performance are useful. The
time ticket data remain empty.

1.4.7  Using person day performance with time tickets

The person day performances can then be used for the time tickets to make calculations that require day

totals.

One example  is the calculation of a performance efficiency rate if specific proportions of the time  wage

must  be  deducted  from  the  total  labor  time  of  the  day  to  calculate  the  actual  duration.  The  day-related

performance efficiency rate can then be assigned to the separate piecework time tickets.

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 20 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

If required, you can also use this user exit to change the person day performance.

User exit "hyl_pnrtag2tls.hsc"

Import parameters:

Parameter

Type  Contents

PNR

PNR_*

ANR

ANR_*

MNR

MNR_*

TLS_LART_*

Export parameters:

Parameter

TLS_ *

PNRTAG_*

N

*

Person: personnel number

Data of person, see section above.

C  40  Operation number of time ticket

*

Operation data, see section above.

C  20  Machine of time ticket

*

*

Machine data, see section above.

Wage type data of time ticket, see section above

Type  Contents

*

*

Data of time ticket, see section above.

Data of person day performance

BUFFER_1 and BUFFER_2  C

32000

Free buffer variables. The content of these variables is kept
during the complete calculation of the person day
performance. Using these variables, you can save values in
BAPI format from the import of time tickets into the day
performance up to the distribution of the day performance on
time tickets.

When the calculation of a person day performance is started,
the buffer variables are emptied.

1.5  Group allocation

1.5.1  Overview

The postings for orders and persons recorded via ADE are the data basis of the premium wage based on

formulas.  These  postings  include  the  run  times,  separated  into  main  production  time  and  malfunction

times. And the quantities produced. These postings also include the wage specifications like wage  type,

te,  teb  and  tr.  Here,  they  are  checked  and  can  be  manually  corrected  and  changed  for  each  separate

posting, if required. Bonuses and deductions are also integrated in the calculation.

The data is recorded for machines, orders and persons.

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 21 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

The  illustration  below  helps  to  understand  the  interrelations.  The  illustration  shows  a  sample  premium

system.

Illustration: Schema to illustrate the premium wage calculation based on formulas in HYDRA.

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 22 of 52

  Step   Mach. . target- Occup. Presence time A B C D H G F E I Breakd. Std.- time Prod . Man. . time Mach. . runtime Σ Month Σ Month  Σ Month  Σ Month  Σ Month  Σ Month  Σ Month  Σ Month  Σ Month  Formulas as in step 2. The formulas for month results may very from the one for day results Machine/AP 1 Production order 1234: 8,0 h Time productive / malfunction period,  t e ,  t eb ,  t r , wage type, n Overhead cost order  XYZ: , 8,0 h Time productive / malfunction period,  t e ,  t eb ,  t r , Wage type, n Person   1 Time productive/ malfunction period 4,0h * ½  = 2,0 h Machine/AP 2 Production order 6789: 8,0 h Time productive / malfunction period,  t e ,  t eb ,  t r , Wage type, n Overhead cost order    XYZ: , 8,0 h Time productive / malfunction period,  t e ,  t eb ,  t r , Wage type, n Person   1 Time productive / malfunction period  4.0h * ½  + 4,0h = 6,0 h Person   2 Time productive / malfunction period 8,0 h Assign.  of post. to premium fact. per Pro day Step   Calculation of day group results by user-defined formulas Step   BDE-postings % 100 3 , 1     B A C D % 100   F G H % 30 % 70     H D I Calculation of  month group results by  user-defined  formulas  % 100 3 , 1     B A C D % 100   F G H % 30 % 70     H D I r e t t n   r eb t t n   A B C D H G F E I Incentive wage determination 06:00 10:00 14:00 18:00 22:00 Wage intensity Perform. per day Total result

                                                 Customizing the Premium/Incentive Wage based on Formulas

Explanatory notes:

HYDRA  provides  premium  accounts  that  you  are  free  to  define  for  the  calculation  of  premium  wages

based  on  formulas.  The  accounts  have  the  letters  A  to  I  in  the  illustration.  You  use  these  accounts  to

record  data  like  standard  times  or  actual  times.  And  you  can  calculate  these  premium  accounts  using

other premium accounts.

It is possible to store different schemes for different forms of premiums.

In general, you calculate premium wages in three steps.

1.  Sorting of the posted data into premium accounts on a daily basis

the account records the total personnel processing time that results from

this  account  records  for  each  premium  group  the  total  malfunction  time

In the first step, you control the sorting of the data from postings into the premium accounts via script
language. In the illustration, this is shown with the arrows. The arrows only represent one posting in
the illustration. But of course, all postings of the same type are sorted the same way:
- Premium account A:
the personnel postings.
- Premium account B:
that was included in the personnel processing time resulting from personnel postings.
- Premium account C:
this account records for each premium group the person-related standard
time for the personnel postings. The standard time is calculated using the data of the postings via the
formula n * te + tr .
- Premium account E:
the machines.
- Premium account F:
time at the machines (based on production orders, without malfunction times).
- Premium account G:
this  account  records  for  each  premium  group  the  order/machine-related
standard time using the order postings. The standard time is calculated using the data of the postings
via the formula n * teb + tr .

this  account  records  for  each  premium  group  the  productive  order  run

this  account  records  for  each  premium  group  the  total  order  run  time  at

2.  Calculation of daily group results

In this step, you can calculate daily interim results using the data recorded in the premium accounts
when  all  postings  of  a  premium  group  have  been  processed  for  the  day.  The  illustration  shows  the
formulas used in the example. The premium accounts  D, H and I are calculated using the formulas.
The user can define the formulas via script language.

3.  Calculation of monthly group results

In this step, you can make calculations based on the premium accounts that are totaled on a monthly
basis. To this end, the same formulas are used as in step 2. The results are then assigned again to
the  dependent  premium  accounts  D,  H  and  I.  Also  other  formulas  or  extended  calculations  can  be
implemented. The user can define the formulas via script language.

The flexibility of the script language allows not only simple calculations of a performance efficiency rate,

but  you  can  also  realize  monetary  evaluations.  As  part  of  an  implementation  support,  you  can  map

existing premium models.

In LLE version 7.2, another step is available. You can also assign the result calculated for the group on

the day time tickets of the persons belonging to the relevant group. This assignment is only made if the

relevant user exit is available.

1.5.2  Step 1: distribution of data to premium accounts

User exit "lpv00000.hsc"

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 23 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

1.5.2.1

Initialization

User exit " lpv1000.hsc", function init().

At  start  of  processing,  the  function  init()  is  called  in  user  exit  lpv1000.hsc.  In  this  function,  you  use  the

export variables USES_ART to control which data types are processed in the calculation. Only the data

required to calculate the wage data must be requested.

The import and export variables are described in the section below.

With  the  function  init()  it  is  important  to  make  sure  that  the  import  variables  are  not  filled.  The  import

variables are empty or 0.

...
export USES_ART char(50);
...

/*---------------------------------------------------------------------------*/
long init()
{
  // The export variable USES_ART controls which data is processed.
  // USES_ART = "AU AE PB ZUS TLS MDE";
  //  AU  : U records (ADE order interruption)
  //  AE  : E records (ADE order end)
  //  PB  : B records (ADE personnel postings)
  //  ZUS : Bonuses (from LLE)
  //  TLS : Time tickets (also include PZE times from wage types for group incentives)
  // [MDE : MDE log data, not available in the standard)]
  // You cannot explicitly control the group result that is used to calculate bonuses (type "GRP").
  USES_ART = "ZUS TLS"; // Only time tickets and bonuses are required.

  return 0;
}

1.5.2.2  Data distribution to premium accounts

User exit "lpv00000.hsc"

Import parameters:

Note: The column KAR specifies the data that results from BDE waiting period processing with order and

personnel postings. You can identify these postings via the order type ANR_AART.

Parameter

Type  Contents

KAR  ZUS

AU/
AE/
PB

ART

C  4

Posting type.
"AU"/"AE": order posting interruption/end

X

X

X

"PB": personnel posting (operator)
"ZUS": bonus

"GRP": group result to calculate
incentives. Here, no data of orders,
machines, persons, bonus reasons and
postings/bookings is available. The
variable PNR_LEISTGRP includes the ID

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 24 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

of the premium area. The variables of
premium group LEISTGRP* include the
master data of the premium group (not of
the premium area). The export parameters
are prepopulated using the results of the
premium groups. They can be changed in
the script. After execution of the script, the
export parameters are added to the area
result.

"TLS": time ticket with premium group.
With time ticket, special assignment of the
fields ADEPRO_*, see below

Order data

ANR

ANR_AART

C  40  Order number

C  5  Operation: order type:

X

X

X

X

X

X

0 = PPS order, production order
1 = overhead order
2 = rework order
3 = capacity OP
4 = overhead order type II
… other customer-specific
     order types

X

ANR_AARTKAT

C  2  Operation: category of order type

ANR_SZY

ANR_TLG

ANR_DATB

ANR_ZEIB

ANR_PRKZ

N

N

D

N

Operation: target cycle of machine in
seconds per 1000 cycles.

Operation: target partitioning of machine

Operation: date of first logon

Operation: time of first logon in seconds

C  1  Operation: premium indicator

ANR_PARAM_K1

C  8  Operation: free parameter, text 1

ANR_PARAM_K2

C  8  Operation: free parameter, text 2

ANR_KDPARAM_1

C
100

Operation: general information

ANR_KDPARAM_2

C  20  Operation: general information 2

...

...

...

ANR_KDPARAM_5

C  20  Operation: general information 5

ANR_LART

ANR_LART_*

ANR_TE

ANR_TR

ANR_TEB

C  4  Operation: planned wage type

*

F

F

F

Master data of wage type, refer to section
further ahead.

Operation: planned standard time te in
seconds per 1000 pieces

Operation: planned setup specification tr in
seconds

Operation: planned standard time teb in
seconds per 1000 pieces

ANR_ADATF

D

Operation: planned earliest start date

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 25 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

ANR_AZEIF

ANR_ADATB

ANR_AZEIB

ANR_ADATE

ANR_AZEIE

ANR_ADATS

ANR_AZEIS

N

D

N

D

N

D

N

Operation: planned earliest start time in
seconds

Operation: planned start date

Operation: planned start time in seconds

Operation: planned end date

Operation: planned end time in seconds

Operation: planned latest end date

Operation: planned latest end time in
seconds

ANR_ATK

C  25  Operation: article number

ANR_PARAM_1

ANR_PARAM_2

ANR_PARAM_3

ANR_BEM_1

ANR_BEM_2

ANR_KDBEZ

N

N

N

from 02/06: free parameter, value 1

from 02/06: free parameter, value 2

from 02/06: free parameter, value 3

C  15

from 02/06: comment 1

C  15

from 02/06: comment 2

C  16

from 02/06: customer name

ANR_MBVERH_NORM

ANR_MBVERH_RUE

F

F

from 02/06: number of employees
production

from 02/06: number of employees setup

ANR_OPTKRIT

C  20

from 02/06: optimization criteria

ANR_OPTKZ

ANR_COLOR

ANR_FU01

C  1  Operation: optimization identicator

C  20

from 02/06: color

D

from 02/06: user field in ADE 7.2

…

ANR_FU06

ANR_FU07

…

ANR_FU22

ANR_FU23

…

ANR_FU28

ANR_FU29

…

ANR_FU44

ANR_FU45

…

ANR_FU50

ANR_FU51

…

D

N

N

F

from 02/06: user field in ADE 7.2

from 02/06: user field in ADE 7.2

from 02/06: user field in ADE 7.2

from 02/06: user field in ADE 7.2

F

from 02/06: user field in ADE 7.2

C  1

from 02/06: user field in ADE 7.2

C  1

from 02/06: user field in ADE 7.2

C10

from 02/06: user field in ADE 7.2

C10

from 02/06: user field in ADE 7.2

C  20

from 02/06: user field in ADE 7.2

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 26 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

ANR_FU63

ANR_FU65

ANR_FU66

Data of person

PNR

PNR_PRKZ

PNR_ABT

PNR_BER

C  20

from 02/06: user field in ADE 7.2

C  40

from 02/06: user field in ADE 7.2

C  40

from 02/06: user field in ADE 7.2

N

Person: personnel number

C  1

Person: premium indicator

C  8

Person: department

C  8

Person: area

PNR_EINTRITT

D

Person: date of joining

PNR_FIR

PNR_KST

C  4

Person: company

C10

Person: cost center

X

X

X

X

X

X

X

X

X

X

PNR_LEISTGRP

C  8

Person: regular premium group of person  X

PNR_ANTFAKTLBON

PNR_GEBDAT

N

D

Person: date of birth

Person: proport. factor for incentive bonus  X

PNR_GESCHLECHT

C  1

Person: gender M/W (male/female)

PNR_INFODAT_1

...

PNR_INFODAT_5

D

...

D

Person: free date field 1

...

Person: free date field 5

PNR_INFOTXT_01

C  40  Person: free text field 1

...

...

...

PNR_INFOTXT_20

C  40  Person: free text field 20

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

X

PNR_INFOWERT_1

...

PNR_INFOWERT_5

N

...

N

Person: free number field 1

...

Person: free number field 5

X

X

X

Machine data

MNR

MNR_PRKZ

C  20  Machine number

C  1  Machine: premium indicator

MNR_LEISTGRP

C10  Machine: premium group populated by

default

MNR_*

*

Master data of machine
(see general description above)

X

X

X

X

X

X

X

X

X

Important: this general master data is available only as of
program versions 06/2010. In older versions, only the three
fields mentioned above are available as machine master data.

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 27 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

Data of premium group
Also with type = "GRP" (distribution of premium group results to the accounts of the premium areas)
the master data of the premium group is included here.

X

X

X

X

X

X

X

X

LEISTGRP

LEISTGRP_*

C10

Premium group (cid:129)

X

*

Data of premium group, see section above.  X

X

X

Data of bonuses and bonus reasons

CERTIFY

C  1

Requires approval J/N

If the bonus actually requires approval, but
the option Allocate if still subject to
authorization is activated, then the bonus
does not require approval here and the
parameter CERTIFY is set to "N".

SIGN

C  1

Approved J/N/A
A=rejected

ZUSCHLGR

N

Bonus reason

ZUSCHLGR_SZ

C  1

Bonus reason: is bonus for target or actual
time? (S/I)

Date from posting/booking
Note: special assignment with TYPE="TLS", see separate table below.

ADEPRO_DAT

ADEPRO_BMK01

...

ADEPRO_BMK11

ADEPRO_BMK12

ADEPRO_PDAUER

D

F

F

F

F

Date

X

Resource performance account 1 in hours  X

Resource performance account 11 in
hours. With bonuses, here bonus duration.

X

X

X

X

X

X

Resource performance account 12 in
hours

X

X

Labor time in hours. With bonuses, bonus
duration.

X

X

X

ADEPRO_KST

C10

Cost center

ADEPRO_TE

ADEPRO_TR

ADEPRO_TEB

F

F

F

te recorded in hours per 1000 pieces

tr recorded in hours

teb recorded in hours per 1000 pieces

ADEPRO_LART

C  4  Wage type

ADEPRO_LART_*

ADEPRO_GUT

ADEPRO_AUS

ADEPRO_NAC

ADEPRO_PRB

ADEPRO_DATB

*

F

F

F

F

D

Master data of wage type, refer to section
further ahead. (Available as of
November/2005)

Yield (primary quantity)

Scrap quantity (primary quantity)

Rework quantity (primary quantity)

Problem quantity (primary quantity)

Logon date

X

X

X

X

X

X

X

X

X

X

X

X

X

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 28 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

ADEPRO_ZEIB

ADEPRO_DATE

ADEPRO_ZEIE

ADEPRO_SKNR

F

D

F

N

Logon time in seconds

Logoff date

Logoff time in seconds

Shift number

ADEPRO_BPOS

C10  Operator position/function

ADEPRO_LPKZ

C10

Premium indicator (wage group)

X

X

X

X

X

X

X

X

X

X

ADEPRO_USER_01 to
ADEPRO_USER_05

C  40  Customer-specific log data. See notes

below.
Note: in the script, the function init()
controls the assignment of these variables;
for this reason, define these variables as
export variables.

Export parameters:

Parameter

DAUER

VORG

ZUSCHL

UPZ

AUSFZ

GKZ

GUTSCHR

WARTEN

PRKTO01

...

PRKTO30

PRKZ01

...

PRKZ05

Contents

Typ
e

Duration in hours

Standard time in hours

Bonuses in hours. Normally used for bonuses that refer to the
standard time.

Non-productive time in hours

Downtime in hours

Overhead cost times in hours

Bonus time in hours, normally used for bonuses that refer to the
actual time.

Waiting time in hours

Value that is allocated to premium account 1

...

Value that is allocated to premium account 30

Premium indicator 1. Prepopulated using the previously set
premium indicator

...

Premium indicator 5, see above

F

F

F

F

F

F

F

F

F

...

F

C
20

...

C
20

Special assignment of data from posting/booking in the processing of time tickets.

In the processing of group time tickets, the time tickets are passed to the user exit in the structure of the

ADE postings in order to limit the number of import/export variables. In this case, a special assignment of

the fields ADEPRO_* is used.

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 29 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

Data from posting/booking

ADEPRO_DAT

ADEPRO_BMK01

...

ADEPRO_BMK10

ADEPRO_BMK11

ADEPRO_BMK12

ADEPRO_PDAUER

D

F

F

F

F

F

Date

Value of premium account 1 of time ticket.
Because of conversion rules of the past,
this value must be multiplied by 0,0036 for
further use (3600 / 1000000    =  0,0036).

Value of premium account 10 of time
ticket. Because of conversion rules of the
past, this value must be multiplied by
0,0036 for further use.

Standard time of time ticket

Fixed 0.

Duration of time ticket

ADEPRO_KST

C10

Cost center

ADEPRO_TE

ADEPRO_TR

ADEPRO_TEB

F

F

F

te in hours per 1000 pieces

tr in hours

Always 0.

ADEPRO_LART

C  4  Wage type

ADEPRO_LART_*

ADEPRO_GUT

ADEPRO_AUS

ADEPRO_NAC

ADEPRO_PRB

ADEPRO_DATB

ADEPRO_ZEIB

ADEPRO_DATE

ADEPRO_ZEIE

ADEPRO_SKNR

*

F

F

F

F

D

F

D

F

N

Master data of wage type, refer to section
further ahead.

Yield

Scrap

Always 0

Always 0

Logon date

Logon time in seconds

Logoff date

Logoff time in seconds

Shift number

ADEPRO_BPOS

C10

Always empty.

ADEPRO_LPKZ

C10

Time type of time ticket

ADEPRO_USER_01 to
ADEPRO_USER_05

C  40  Always empty.

Further data

ZUSCHLGR

N

Bonus reason

x

x

x

x

x

-

x

x

x

x

-

x

x

x

x

-

-

x

x

x

x

x

-

x

-

x

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 30 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

1.5.2.3  User-specific log data

Using  the  export  variables  ADEPRO_USER_01  to  ADEPRO_USER_05,  you  can  additionally  select

customer-specific data from the database (ADE log data, order backlog data or  other master data). This

can be user fields of the log data or of the machines, for example. You require detailed knowledge of the

database structures and the internal processes of wage calculation to this end.

You  initialize the fields using the user exit described  above "lpv00000.hsc" by calling the function  init().

Assign SQL fragments (column names) to the variables of data that must be selected additionally. When

the function main() is called in the following requests, the variables then include the relevant data. In the

function init(), SQL fragments are assigned to the variables ADEPRO_USER_01 to ADEPRO_USER_05.

For this reason, they must be declared as export variables.

Available database tables:

Table

Alias  Contents

ade_protokoll

ap.

ADE log data

auftrag_status  ast.

Status information on the operation

maschinen

lle_leist_grp

m.

lg.

Maschine master data

Master data of premium groups

If  you  select  columns  that  do  not  have  data  type  "char(n)",  you  must  phrase  the  column  so  that  the

database  selects  this  column  as  char(n).  With  Oracle  and  SQL  server,  you  can  use  the  relevant  type

conversions according to the database used. See example below. If you do not respect this, a database

error is produced because of a UNION select.

Example:

...
export ADEPRO_USER_01         char(40);
export ADEPRO_USER_02         char(40);
export ADEPRO_USER_03         char(40);
export ADEPRO_USER_04         char(40);
export ADEPRO_USER_05         char(40);
...

/*---------------------------------------------------------------------------*/
/* Init                                                                      */
/*---------------------------------------------------------------------------*/
long init()
{
  ADEPRO_USER_01 = "ap.user_c_29"; // Transaktionscode
  ADEPRO_USER_02 = "ap.user_c_45"; // Buchungsschluessel
  // MS-SQL-Server:
  ADEPRO_USER_03 = "CAST( ap.user_n_17 AS varchar(40)), "; // bonus points
  // Oracle:
  // ADEPRO_USER_03 = "TO_CHAR( ap.user_n_17 )"; // bonus points
  dprint( "Init ADEPRO-Userfelder Transaktionscode und Buchungsschluessel" );

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 31 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

  return 0;
}

/*---------------------------------------------------------------------------*/
/* main function                                                             */
/*---------------------------------------------------------------------------*/
long main()
{
  ...
      if( ADEPRO_USER_01 = "S" ) // transaction code
      {
        if( ADEPRO_USER_02 = "JFLF" ) // transaction key
                {{
          PRKTO14 = LEISTGRP_WERT_01 / 60; // Ruesten DI [default in min]
          PRKTO15 = char2long( ADEPRO_USER_03 ); // bonus points
        }
  ...

1.5.3  Step 2+3: daily/monthly calculation of premium accounts

User exit "lpb00000.hsc"

Import parameters:

Note:  the  person-related  import  parameters  are  only  filled  for  the  person  (PNR_xxx),  if  the  user  exit  is

called for the list Personal group participation.

Parameter

ART

DAT

Type  Contents

C  1

D

T: script is run for daily calculation
M: script is run for monthly calculation
P: script is run to calculate the personal group participation.

Date.
With type P or M, the date is the last day of the period used
for the calculation (end of month).

MDEFEITG

C  1  With type T: Is the day stored as public holiday in the MDE

public holidays J/N

Otherwise: empty

PDAUER

N

With type P: working time of a person in the premium group in
seconds.

Otherwise: 0.

Data of premium group
When premium areas are calculated, the premium area master data is included.

LEISTGRP

LEISTGRP_*

C10

Premium group (cid:129)

*

Data of premium group, see section above.

Data of person
They are only filled if the user exit is called for the list Personal group participation.

PNR

PNR_PRKZ

PNR_ABT

N

Person: personnel number

C  1

Person: premium indicator

C  8

Person: department

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 32 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

PNR_BER

C  8

Person: area

PNR_EINTRITT

D

Person: date of joining

PNR_FIR

C  4

Person: company

PNR_GEBDAT

D

Person: date of birth

PNR_GESCHLECHT

C  1

Person: gender M/W (male/female)

PNR_INFODAT_1

...

PNR_INFODAT_5

D

...

D

Person: free date field 1

...

Person: free date field 5

PNR_INFOTXT_01

C  40  Person: free text field 1

...

...

...

PNR_INFOTXT_20

C  40  Person: free text field 20

PNR_INFOWERT_1

...

PNR_INFOWERT_5

N

...

N

Person: free number field 1

...

Person: free number field 5

PNR_KST

C10

Person: cost center

PNR_LEISTGRP

C  8

Person: regular premium group of person

PNR_ANTFAKTLBON

N

Person: proport. factor for incentive bonus

Export parameter:

Parameter

VORG

ZUSCHL

UPZ

DAUER

AUSFZ

GKZ

GUTSCHR

WARTEN

LEISTGRAD

PRKTO01

...

PRKTO20

PRKZ01

...

Contents

Typ
e

N

N

N

N

N

N

N

N

F

F

...

F

Standard time in seconds

Bonuses in seconds.  Is normally used for bonuses that refer
to the standard time.

Non-productive time in seconds

Duration in seconds

Downtime in seconds.

Overhead cost times in seconds

Time credit in seconds. Is normally used for bonuses that refer
to the actual time.

Waiting time in seconds

Performance level in percent

Premium account 1

Premium account 20

C  20  Premium indicator 1

...

...

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 33 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

PRKZ05

C  20  Premium indicator 5

1.5.4  Group time tickets

For  the  labor  time,  group  time  tickets  are  created.  You  can  change  these  time  tickets  via  the  user  exit

"lsv00000.hsc": "Recalculation of time tickets". This user exit is described in a paragraph above in section

"Individual allocation". This user exit used the time type "GRP" for group time tickets.

1.5.5  Assigning group results to time tickets

When the group results are calculated, you can use the user exit "hyl_leistgrp2tls.hsc" to assign the group

results  to  the  day  time  tickets  of  the  persons.  The  user  exit  is  called  for  each  time  ticket  with  premium

group. As import parameter, it includes the daily premium group result and as export parameter the time

ticket  data.  For  example,  you  can  assign  a  performance  efficiency  rate  to  the  time  ticket  that  has  been

calculated for the group and you can enter a calculated standard time in the time ticket.

Import parameters:

Parameter

PNR

PNR_*

ANR

ANR_*

MNR

MNR_*

L_LART_*

LEISTGRP_*

Data of premium group result

VORG

ZUSCHL

UPZ

DAUER

AUSFZ

GKZ

GUTSCHR

WARTEN

LEISTGRAD

Typ
e

N

*

Contents

Personnel number

Data of person, see section above.

C  40  Operation number of time ticket

*

Operation data, see section above.

C  20  Machine of time ticket

*

*

*

N

N

N

N

N

N

N

N

F

Data of time ticket machine, see section above

Wage type data of time ticket, see section above.

Master data of premium group, see section above.

Standard time in seconds

Bonuses in seconds.  Is normally used for bonuses that refer
to the standard time.

Non-productive time in seconds

Duration in seconds

Downtime in seconds.

Overhead cost times in seconds

Time credit in seconds. Is normally used for bonuses that refer
to the actual time.

Waiting time in seconds

Performance level in percent

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 34 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

PRKTO01

...

PRKTO20

PRKZ01

...

PRKZ05

F

...

F

Premium account 1

Premium account 20

C  20  Premium indicator 1

...

...

C  20  Premium indicator 5

Export parameters:

Parameter

L_

Typ
e

*

Contents

Data for time ticket, see section above.

1.5.6

Info function on the PZE terminal CT-WIN/CT-AIP

1.5.6.1  Overview

When the info is displayed on the PZE terminal, an information on the activities performed in the premium

group is shown in addition to the account balances.

:  00:00
Flextime
: 154:00
Flexitime
Leave account
:  27.00
05 B3P       102% :  12:30
04 350      118%  :
7:30
04 B3P      122%  : 112:30

For more information on this info function, refer to the document describing the HR functions of the data

collection software (status 2018: documents AIP-HRF and AIP-HRL).

You can change or disable the info display if you customize the incentive wage module using the user exit

described in the following.

1.5.6.2

Formatting via user exit

1.5.6.3

Data rows

Use  the  user  exit  "hyl_info.hsc"  to  format  the  terminal  info  on  your  own,  to  show  further  data  and  to

display total lines. This user exit is the equivalent to the user exit used to calculate the group results with

personal group participation ("lpb00000.hsc", ART=P). This user exit only includes four other parameters

that are used to format the info row.

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 35 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

Import parameters:

Parameter

LEN_DIS_BEZ

Typ
e

N

Contents

Obsolete: some PZE terminals (DOS) send an information on
the maximum length of the name. This information is provided
here.

LEN_DIS_WERT

N

Obsolete: maximum length of value (normally 7)

Import/export parameters:

Parameter

DIS_BEZ

DIS_WERT

1.5.6.4

Total line

Contents

Typ
e

max
C100

Formatted name that is displayed on the terminal. If the name
is empty, the row is not displayed on the terminal.

max
C7

Formatted time value that is displayed on the terminal

All premium accounts (fixed and flexible) are totaled for the premium groups once a month. This sum total

is then provided when the user exit "hyl_info.hsc" is called the next time. The user exit does not provide

any  information  on  the  premium  group  and  the  persons.  "SUM"  is  only  assigned  to  the  premium  group

LEISTGRP.

The name does not have a default formatting for the total line. Without formatting in the user exit, the total

line is not shown.

See also the example below.

1.5.6.5

Example 1 – Extension of display

In the example that follows, the info displays the performance efficiency rate and additionally the premium

account 1. And a total standard time is provided for the total line of premium account 10.

In  the  total  line,  the  duration  recorded  and  the  standard  time  recorded  is  used  to  calculate  a  total

performance efficiency rate that is shown in the total line on the terminal.

hydra basic;

// import data general
import ART                 char(1);     // request type of script.
                                        // P: script is executed for the calculation of the
                                        //    personal group participation.
import DAT                 date;        // date
import PDAUER              long;        // working time of a person in seconds.

import LEISTGRP            char(10);    // premium group

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 36 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

export LEISTGRAD           double;      // performance level in percent
export PRKTO01             double;      // premium account 1  (PKZ)
export PRKTO10             double;      // premium account 10 (standard time)

// Import maximum length of name and value
import LEN_DIS_BEZ         long;        // maximum length of name
import LEN_DIS_WERT        long;        // maximum length of value (normally 7)

// Import/Export name and value
export DIS_BEZ             char(80);    // name of info
export DIS_WERT            char(8);     // value of info

/*---------------------------------------------------------------------------*/
/* Main function                                                             */
/*---------------------------------------------------------------------------*/
long main()
{
  code long;

  if( ( month( DAT ) < month( today() ) ) and
      ( day( today() ) > 7 ) )
  {
    DIS_BEZ = "";
    dprint( "nach dem siebten den Vormonat nicht mehr anzeigen." );
  }
  else
  {
    if( LEISTGRP <> "SUM" )
    {
      DIS_BEZ = (month( DAT ) using "&&") || " " ||
                (LEISTGRP stripped) || ": " ||
                (LEISTGRAD using "##&") || "%(" ||
                (PRKTO01 using "##&") || ")" ;
      PRKTO10 = PDAUER * LEISTGRAD / 100.0;
    }
  else
    {
      if( PDAUER > 0 )
      {
        LEISTGRAD = PRKTO10 / PDAUER * 100;
        DIS_BEZ = (month( DAT ) using "&&") || " " ||
                  ("Summe") || ": " ||
                  (LEISTGRAD using "##&") || "%";
      }
    }
  }

  return code;
}

/*---------------------------------------------------------------------------*/

Output:

:  00:00
Flextime
: 154:00
Flexitime
Leave account
:  27.00
05 B3P:  57%( 55) :  12:30
:  12:30
05 total:  57%
7:30
04 350: 118%( 95) :
04 B3P: 122%(116) : 112:30
: 120:00
04 total: 122%

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 37 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

Other example of a terminal display on CTWIN:

1.5.6.6

Example 2 – Suppressing display

hydra basic;

// // import data general
// import ART                 char(1);     // request type of script.
//                                         // P: script is executed for the calculation of the
//                                         //    personal group participation.
// import DAT                 date;        // date
// import PDAUER              long;        // working time of a person in seconds.
//
// import LEISTGRP            char(10);    // premium group
//
// export LEISTGRAD           double;      // performance level in percent
// export PRKTO01             double;      // premium account 1  (PKZ)
// ...
// export PRKTO10             double;      // premium account 10 (standard time)
//
// // Import maximum length of name and value
// import LEN_DIS_BEZ         long;        // maximum length of name
// import LEN_DIS_WERT        long;        // maximum length of value (normally 7)

// Import/Export name and value
export DIS_BEZ             char(80);    // name of info
export DIS_WERT            char(8);     // value of info

/*---------------------------------------------------------------------------*/
/* Main function                                                             */
/*---------------------------------------------------------------------------*/
long main()
{

// set name to empty --> output of the row is suppressed.
  DIS_BEZ = "";

  return 0;
}

/*---------------------------------------------------------------------------*/

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 38 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

1.6  Calculating period results

This function is available as of MW 3.0, service pack 6 (end 2014). Older versions do not meet

the software requirements. The user exit described below is not called.

With HYDRA systems MW 3.0 and an initial installation before February 2015, you must check

if  the  HYDRA  database  fulfills  the  requirements  before  you  use  the  function.  If  required,  you

must first execute the patches for MW 3.0 of service pack 6 status.

You can persist the results of complete settlement periods in the database for a further customer-specific

processing  for  persons  and  premium  groups.  In  HYDRA,  the  settlement  periods  of  the  Incentive  Wage

are fixed to calendar months.

As  part  of  the  wage  calculation,  the  settlement  period  is  identified  that  must  be  recalculated  for  the

persons  or  premium  groups.  A  settlement  period  must  be  recalculated  if  at  least  one  day  result  of  the

settlement period has been recalculated.

A  user  exit  is  then  called  for  each  settlement  period  and  person  or  premium  group. With  each  call,  the

user  exit  can  calculate  one  period  result.  To  calculate  the  result,  the  user  exit  uses  SQL  database

accesses  that  usually  total  the  relevant  day  results.  Then,  the  totaled  result  is  calculated  for  the

settlement  period  and  assigned  to  the  export  variable.  The  wage  calculation  automatically  saves  the

result. The HYDRA system provides examples of user exits for persons or premium groups.

1.6.1  Settlement period results for persons

User exit:

Function:

hyl_pnrperiod_calc.hsc

long final_calc()

Parameter of function:   -none-

Return value:

is not processed. The function must return the value 0.

Import parameters:

Parameter

PNR

PERSON_*

Export parameter:

Typ
e

N

*

Contents

Personnel number

Data of person, see section above.

Parameter

Type  Contents

PERSONPERIOD_YEAR

N

Year of settlement period

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 39 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

PERSONPERIOD_PERIOD

PERSONPERIOD_ACC_DATB

PERSONPERIOD_ACC_DATE

PERSONPERIOD_ACTUALTIME

PERSONPERIOD_STANDARDTIME

PERSONPERIOD_PERFEFFRATE

PERSONPERIOD_MINPERFLEVEL

N

D

D

F

F

F

F

Settlement period (calendar month)

First day of settlement period (first day of calendar month)

Last day of settlement period (last day of calendar month)

(Actual) duration [h]

Standard time [h]

Performance level

Minimum day performance level of settlement period

PERSONPERIOD_MAXPERFLEVEL  F

Maximum day performance level of settlement period

PERSONPERIOD_DURATION_ADE

PERSONPERIOD_DURATION_PZE

PERSONPERIOD_DURATION_LLE

PERSONPERIOD_PRACC_01 to
PERSONPERIOD_PRACC_30

F

F

F

F

PERSONPERIOD_PRATTR_01 to
PERSONPERIOD_PRATTR_05

C
20

Duration ADE [h] (optional)

Duration PZE [h] (optional)

Duration LLE [h] (optional)

Premium accounts that the user can define

Premium indicators that the user can define

1.6.2  Settlement period results for premium groups

User exit:

Function:

hyl_prgrpperiod_calc.hsc

long final_calc()

Parameter of function:   -none-

Return value:

is not processed. The function must return the value 0.

Import parameters:

Parameter

PERSON_*

Export parameter:

Typ
e

*

Contents

Master data of premium group, see section above.

Parameter

Type  Contents

PRGRPPERIOD_PRGRP

C  8  Premium group (cid:129)

PRGRPPERIOD_YEAR

PRGRPPERIOD_PERIOD

N

N

Year of settlement period

Settlement period (calendar month)

PRGRPPERIOD_ACC_DATB

date  First day of settlement period (first day of calendar month)

PRGRPPERIOD_ACC_DATE

date  Last day of settlement period (last day of calendar month)

PRGRPPERIOD_ACTUALTIME

PRGRPPERIOD_STANDARDTIME

F

F

(Actual) duration [h]

Standard time [h]

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 40 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

PRGRPPERIOD_PERFEFFRATE

PRGRPPERIOD_MINPERFLEVEL

PRGRPPERIOD_MAXPERFLEVEL

PRGRPPERIOD_OFFTIME

F

F

F

F

Performance level

Minimum day performance level of settlement period

Maximum day performance level of settlement period

Downtime [h]

PRGRPPERIOD_PREMIUMAVERAGE  F

Time of premium average (overhead times) [h]

PRGRPPERIOD_CREDITNOTE

PRGRPPERIOD_UNPRODTIME

PRGRPPERIOD_WAITINGTIME

PRGRPPERIOD_BONUSES

PERSONPERIOD_PRACC_01 to
PERSONPERIOD_PRACC_30

F

F

F

F

F

Time credit [h]. Is normally used for bonuses that refer to
the actual time.

Non-productive time [h]

Waiting time [h]

Bonuses [h]. Is normally used for bonuses that refer to
the standard time.

Premium accounts that the user can define

PERSONPERIOD_PRATTR_01 to
PERSONPERIOD_PRATTR_05

C
20

Premium indicators that the user can define

1.7

Interface to payroll accounting

1.7.1  Overview

The interface to payroll accounting is an interface that can be used universally to transfer all relevant data

from  the  HYDRA  Incentive Wage  and  HYDRA  Time  and  Attendance  to  any  payroll  accounting  system.

The payroll accounting system only requires a defined possibility to read a sequential ASCII file.

The customer or the MPDV Consulting can specify the format of the output file via user exit. Via user exit,

the  customer  or  the  MPDV  Consulting  can  also  specify  the  contents  of  the  output  file  that  use  the

available data. For example, the degree of aggregation can be specified (per day or month, for each cost

center or none). It is also possible to make additional calculations, for example average values.

1.7.2  Data that can be processed

1.7.2.1

Incentive Wage - individual time tickets

This  data  is  equivalent  to  the  data  that  is  shown  on  the  HYDRA  console  in  the  LLE  menu,  item

Reports/time ticket log.

This data is the basis for the payment of persons with an individual allocation of piecework or time wage.

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 41 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

1.7.2.2

Incentive Wage - personal group participation

This data is shown on the HYDRA console in the LLE menu, item Reports/Group reports/Personal group

participation.

This data is the basis for the payment of persons with group-related allocation.

1.7.2.3

Incentive Wage - monthly group results

This data is shown on the HYDRA console in the LLE menu, item Reports/Group reports/Monthly group

results.

This data does not refer to a person and is only required in the interface if the payroll accounting system

uses  the  group  results  identified  in  HYDRA  to  calculate  other  values  or  if  the  results  are  used  for

calculation purposes.

1.7.2.4

Time & Attendance - wage types

This  data  is  shown  on  the  HYDRA  console  in  the  PZE  menu,  item  Reports/Monthly  wage  types.  If  this

HYDRA  Time  and  Attendance  data  is  used  for  calculation,  this  data  is  the  basis  for  the  payment  of

persons.

1.7.3  Procedure to create interface file

All relevant data is transferred one after the other to a user exit. In this user exit, the required data types

are  selected.  From  this  data,  the  key  values  (e.g.  personnel  number  and  wage  type)  and  data  (e.g.

duration or monetary value) are identified and written in a buffer. The write process is explicitly triggered

in the user exit and using one single input data record, any number of entries can be created in the buffer

(it might also be useful to create no entry at all).

In the next step, the data  of the buffer is aggregated to key  values and the data fields are totaled. This

aggregated data is transferred to a user exit. The user exit converts the data into a character string that is

written in the interface file and triggers this write process in the interface file.

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 42 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

1.7.4  User exits

1.7.4.1

Initialization

[Initialization available as of hyl_rck72.exe|out 7.2.1.10]

User exit "lrck1000.hsc", function init().

At  start  of  processing,  the  function  init()  is  called  in  user  exit  lpv1000.hsc.  In  this  function,  you  use  the

export  variables  USES_ART  to  control  which  data  types  are  processed  in  the  interface.  Only  the  data

required to create the interface file must be requested.

The import and export variables are described in the section below.

With the function  init()  you must make sure that only  the import variables DAT_VON and DAT_BIS are

filled with values. The other import variables are empty or 0.

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 43 of 52

 LLE individual time tickets LLE Personal group participation LLE Group results month PZE wage types month Intermediate buffer Ascii file

                                                 Customizing the Premium/Incentive Wage based on Formulas

// ---------------------------------------------------------------------------
// Function init (as of 08/2010)
//
// initial control of processing. The function is called once before
// start of data processing. At this time,
// only the import variables DAT_VON and DAT_BIS are filled with useful values.
//
// ---------------------------------------------------------------------------
long init()
{
  // The export variable USES_ART controls, which data is provided to the interface.
  USES_ART = "ELS GRP GRE PZE";

  return 0;
}

1.7.4.2

Step 1: Data collection

User exit "lrck1000.hsc", function main().

This user exit controls the data collection

1)

2)

3)

which data records are relevant for the interface

which fields of the data are relevant key fields for the interface

which fields of the data are relevant data fields that are totaled for the interface.

The parameter ART specifies the data type for which the user exit is called to process the data.

Note: the import parameters of the user exit are filled with reference to the parameter ART. For example,

in the processing of Time and Attendance data, no data of a premium group is available.

Parameter

VERARBKZ

ART

DAT_VON

DAT_BIS

SATZNR

Export parameter

Parameter

USES_ART

Type  Contents

C10

C  3

D

D

N

Field Processing of the selection criteria when you create the
interface file.

Individual time tickets (from individual allocation, AKK,

ELS:
ZL, GK, ...)
GRP:   Personal group participation (with relevant

group results)

GRE:   Group results (without reference to a person)
PZE:   Wage type postings of the Time and Attendance
PZM:  PZE monthly results. Available as of 09/2010.
PNR:  HR master data. Available as of 04/2012 (8.1.1.23).

Only import variables of the
HR master data are populated.

Start date of evaluation period

End date of evaluation period

Unique sequence number of data record, starting with 1

Type  Contents

C  50  Only relevant if the interface is initialized via function init().

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 44 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

You can enter the abbreviations described for parameter ART
in this variable. Separate by space character. This variable
then controls which data is selected by the interface program.
For example:

USES_ART = "ELS GRP";

Further import parameters

Data of the person at the end of the evaluation period (only with ART = ELS, GRP, PZE and PNR)

PNR

N

Person: personnel number

PNR_NACHNAME

C  40  Person: last name. (as of version 8.1.1.23 04/2012)

PNR_VORNAME

C  20  Person: first name. (as of version 8.1.1.23 04/2012)

PNR_NAME

C  62  Person: last name, first name. (as of version 8.1.1.23

PNR_PRKZ

PNR_ABT

PNR_BER

04/2012)

C  1

Person: premium indicator

C  8

Person: department

C  8

Person: area

PNR_EINTRITT

D

Person: date of joining

PNR_FIR

C  4

Person: company

PNR_GEBDAT

D

Person: date of birth

PNR_GESCHLECHT

C  1

Person: gender M/W (male/female)

PNR_INFODAT_1

...

PNR_INFODAT_5

D

...

D

Person: free date field 1

...

Person: free date field 5

PNR_INFOTXT_01

C  40  Person: free text field 1

...

...

...

PNR_INFOTXT_20

C  40  Person: free text field 20

PNR_INFOWERT_1

...

PNR_INFOWERT_5

N

...

N

Person: free number field 1

...

Person: free number field 5

PNR_KST

C10

Person: cost center

PNR_LEISTGRP

C  8

Person: regular premium group of person

PNR_ANTFAKTLBON

N

Person: proport. factor for incentive bonus

Time ticket of person
(only with type ELS, GRP and PZE, special assignment with type PZM, see below)

L_DAT

L_ANR

D

Date

C  40  Order number. (not populated with ART PZE and GRP).

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 45 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

L_SKNR

L_MNR

L_BMKNR

L_ZEIART

L_LART

L_TE

L_TR

L_GUT

L_AUS

L_DAUER

L_VGZ

L_ZUSCHL

L_ZUSCHLGR

L_KST

L_LOHNGRP

L_ZEITGRAD

N

Shift number (not populated with ART PZE and GRP).

C  20  Machine number

N

Number of resource performance account (only populated
with ART ELS)

C  3

Time type of time ticket. (not populated with ART PZE).

C  4  Wage type of time ticket (not populated with ART GRP).

F

F

F

F

N

N

N

N

Target te of the time ticket in seconds for 1000 pieces (not
populated with ART PZE and GRP).

Target tr of the time ticket in seconds for 1000 pieces (not
populated with ART PZE and GRP).

Yield of time ticket (not populated with ART PZE and GRE).

Scrap of time ticket (not populated with ART PZE and GRE).

Type ELS: duration of time ticket in seconds [s]

Type GRP: personal group participation with person-related
time proportions [s]

Type PZE: Total of attendance time and absence time [s]

Standard time of time ticket in seconds (not populated with
ART PZE and GRE).

Bonus time of time ticket in seconds (not populated with ART
PZE and GRE).

Bonus reason of time ticket (not populated with ART GRP).

C10

Cost center of time ticket (not populated with ART GRP).

C  4  Wage group of time ticket (not populated with ART GRP).

F

Performance efficiency rate of time ticket in percent.
Performance efficiency rates are only calculated for time
tickets of the AKK time type (piecework). (not populated with
ART PZE).

L_REFNR

C  20  Reference number of time ticket.  Is usually empty, can be

L_PRKTO_01

L_PRKTO_02

L_PRKTO_03

L_PRKTO_04

F

F

F

F

shown for customer-specific information in the time ticket log.
(not populated with ART PZE and GRP).

Premium account of time ticket 1 that can be defined by user.
With type PZE, this parameter contains the attendance time of
the month recorded for the wage type of an employee. (not
populated with ART GRP).

Premium account of time ticket 2 that can be defined by user.
With type PZE, this parameter contains the absence time of
the month recorded for the wage type of an employee. (not
populated with ART GRP).

Premium account of time ticket 3 that can be defined by user.
With type PZE, this parameter contains the number of full
absence days of the month recorded for the payment day type
with the wage type number of an employee. (not populated
with ART GRP).

Premium account of time ticket 4 that can be defined by user.
With type PZE, this parameter contains the number of partial
absence days of the month recorded for the payment day type

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 46 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

L_PRKTO_05

L_PRKTO_06

L_PRKTO_07

...

L_PRKTO_10

with the wage type number of an employee. (not populated
with ART GRP).

Premium account of time ticket 5 that can be defined by user.
With type PZE, this parameter contains the number of leave
days taken (multiplied by factor 10) in the month. (not
populated with ART GRP).

Premium account of time ticket 6 that can be defined by user.
With type PZE, this parameter contains the full attendance
days of an employee in the month (independent of wage
type). (not populated with ART GRP).

Premium account of time ticket 7 that can be defined by user.
With type PZE, this parameter contains the full attendance
hours of an employee in the month (independent of wage
type). (not populated with ART GRP).

...

Premium account of time ticket 10 that can be defined by user
(not populated with ART PZE and GRP)

F

F

F

...

F

L_PRKZ_01

C  20  Premium account of time ticket 1 that can be defined by user

(not populated with ART PZE and GRP)

...

...

...

L_PRKZ_05

C  20  Premium account of time ticket 5 that can be defined by user

(not populated with ART PZE and GRP)

Time ticket of person with type PZM

(Only the parameters populated are listed. Other parameters are not populated and are empry
or 0).

L_DAT

L_LART

L_KST

L_DAUER

L_VGZ

L_PRKTO_01

L_PRKTO_02

L_PRKTO_03

L_PRKTO_04

L_PRKTO_05

L_PRKTO_06

Wage type data

L_LART_*

D

End of PZE settlement period

C  4  Wage type

C10

Cost center

N

N

F

F

F

F

F

F

*

Total time of person in month

Target time in hours in the month

Attendance time of person in month

Absence

Days present

Number of days with absences

Target time in hours in the month

Number of days with target time

Master data of wage type, refer to section further ahead. The
master data of the wage types is available for all data records
that contain a wage type.

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 47 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

LEISTGRP_LART_

*

Data of the wage type of a premium group (reserved)

Data of the premium group (only with ART = GRE and GRP, also ART = ELS with group time tickets.
With ART = PNR populated with premium group of HR master data.)

LEISTGRP

LEISTGRP_*

C10

Premium group (cid:129)

*

Data of premium group, see section above.

Results of the premium groups (only with ART = GRE and GRP, also ART = ELS with group time
tickets. Also populated with ART = PNR with the group results in the evaluation period recorded for
the premium group of the HR master data at the end of evaluation period).

F

F

F

F

F

F

F

F

F

F

...

F

Standard time in seconds

Bonuses in seconds.  Is normally used for bonuses that refer
to the standard time.

Non-productive time in seconds

Duration in seconds

Downtime in seconds.

Overhead cost times in seconds

Time credit in seconds. Is normally used for bonuses that refer
to the actual time.

Waiting time in seconds

Performance level in percent

Premium account 1

Premium account 30

C  20  Premium indicator 1

...

...

C  20  Premium indicator 5

VORG

ZUSCHL

UPZ

DAUER

AUSFZ

GKZ

GUTSCHR

WARTEN

LEISTGRAD

PRKTO01

...

PRKTO30

PRKZ01

...

PRKZ05

Callback function:

This  user  exit  includes  a  callback  function  INSERT_DATA.  This  callback  function  expects  a  so-called

BAPI string as second parameter that contains the contents of the buffer. The following example shows

the use of the callback function and shows the possible fields for the buffer.

    data = add_bapi_val( "",   "DAT", DAT_VON );
    data = add_bapi_val( data, "JAHR", jahr );
    data = add_bapi_val( data, "PER", periode );
    data = add_bapi_val( data, "FIR", PNR_FIR );
    data = add_bapi_val( data, "PNR", PNR );
    data = add_bapi_val( data, "LART", L_LART );
    data = add_bapi_val( data, "KST", PNR_KST );
    data = add_bapi_val( data, "KEYTEXT:1", ART );
    ...
    data = add_bapi_val( data, "KEYTEXT:10", LEISTGRP );
    data = add_bapi_val( data, "KEYWERT:1", xxx );

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 48 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

    ...
    data = add_bapi_val( data, "KEYWERT:5", xxx );
    data = add_bapi_val( data, "DATAWERT:1", DAUER );
    ...
    data = add_bapi_val( data, "DATAWERT:30", 0.0 );
    data = add_bapi_val( data, "MINWERT:1", dat_long ); // as of 11/2005
    ...
    data = add_bapi_val( data, "MINWERT:10", 0.0 );     // as of 11/2005
    data = add_bapi_val( data, "MAXWERT:1", dat_long ); // as of 11/2005
    ...
    data = add_bapi_val( data, "MAXWERT:10", 0.0 );     // as of 11/2005
    code = CallBack("INSERT_DATA", data );

For information on the data types and the maximum field lengths, refer to the user exit description and the

output of aggregated data below.

Key values are all fields except the fields "DATAWERT:xx", "MINWERT:xx" and "MAXWERT:xx".

The  fields  "DATAWERT:xx"  are  totaled  in  a  second  step  after  the  key  values,  and  of  the  fields

"MINWERT:xx" and "MAXWERT:xx" the smallest or the greatest value is identified.

1.7.4.3

Step 2: Output of aggregated data

User exit "lrck2000.hsc".

This  user  exit  is  used  to  write  the  aggregated  data  of  the  buffer  in  the  interface  file  in  step  2  of  the

interface generation. To this end, further calculations can be made in the user exit.

The data is aggregated to key values and processed. The following sorting applies: company, personnel

number, date, year, period, KEYTEXT_1 to 5, wage type, cost center, KEYTEXT_6 to 10, KEYWERT_1

to 5.

The import parameters are the fields of the buffer that have been populated by user exit lrck1000.hsc in

step 1.

Parameter

VERARBKZ

DAT_VON

DAT_BIS

SATZNR

PNR

FIRMA

Type  Contents

C10

Field Processing of the selection criteria when you create the
interface file.

D

D

N

N

Start date of evaluation period

End date of evaluation period

Unique sequence number of data record

Intended for personnel number

C  4

Intended for company

NACHNAME

C  40  Contains the last name, if PNR contains a valid personnel

number.

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 49 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

VORNAME

C  20  Contains the first name, if PNR contains a valid personnel

number.

NAME

C  62  Contains the first and last name separated by comma, if PNR

DATUM

JAHR

PERIODE

LART

LART_*

KST

contains a valid personnel number.

Intended for a date.

Intended for the settlement year

Intended for the settlement period (month)

D

N

N

C  4

Intended for wage type

*

Master data of wage type, refer to section further ahead.

C10

Intended for cost center

KEYTEXT_1 to 10

C  20  Character string for further keys that can be used by the user

KEYWERT_1 to 5

DATAWERT_1 to 30

MINWERT_1 to 10

MAXWERT_1 to 10

F

F

F

F

Numeric values for further keys that can be used by the user

Free data values that can be used. These values are totaled
using the single values of all key fields mentioned above.

Free data values that can be used. The smallest values of
these values are identified using the single values of all key
fields mentioned above.
Available from 11/2005.

Free data values that can be used. The largest values of
these values are identified using the single values of all key
fields mentioned above.
Available from 11/2005.

The user exit does not contain any export parameters.

Callback function:

This  user  exit  includes  several  callback  functions.  All  callback  functions  expect  a  character  string  as

second parameter.

OUTPUT

Outputs  the  character  string  in  the  interface  file  and  shows  it  on  the  HYDRA

console in the dialog to create the interface file.

OUTPUT.DATA

Outputs the character string only  in the interface file. An output on the HYDRA

console is not performed.

OUTPUT.DISPLAY

Outputs the character string only on the HYDRA console in the dialog to create

the interface file. An output in the interface file is not performed.

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 50 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

1.8  User field configuration with premium accounts

1.8.1  User field key

The  incentive  wage  based  on  formulas  requires  the  following  user  field  keys.  The  user  field  keys  are

fixed, other user field keys are not processed.

Object

LEISTGRP

LEISTGRPTG

LLEPNRTAG

TLS

User field key

SYSTEM

SYSTEM

SYSTEM

SYSTEM

1.8.2

Type definitions

Default  type  definitions  are  specified.  They  must  not  be  changed.  If  you  want  to  use  deviating  type

definitions, you must create customer-specific type definitions.

The following other type definitions are provided for the LLE:

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 51 of 52

                                                 Customizing the Premium/Incentive Wage based on Formulas

Older  systems  might  use  deviating

type  definitions:  LEISTGRPFAKT??,  LEISTGRPMOD?,

LEISTGRPTGPRKTO??,  LEISTGRPTGPRKZ??,  TLSPRKTO??  and  TLSPRKZ?.  These  type  definitions

should not be used anymore.

1.8.3  User fields

In the user fields in field Designation, you can select the label text of the user fields on the MOC.

Object type  User field key

Field ID  Default field

Purpose

type

LEISTGRP

SYSTEM

1 to 30

LLE_DEC_10_3  Numeric default values of premium

groups

LEISTGRP

SYSTEM

LEISTGRPTG  SYSTEM

101 to
105

1 to 30

LLE_PRKZ_10  Alphanumeric default values of premium

groups

LLE_DEC_10_3  Premium accounts in the result of
premium groups

LEISTGRPTG  SYSTEM

101 to
105

LLE_PRKZ_10  Premium indicator in the result of
premium groups

LLEPNRTAG  SYSTEM

1 to 30

LLE_DEC_10_3  Premium accounts in the person day

performance

LLEPNRTAG  SYSTEM

101 to
105

LLE_PRKZ_10  Premium indicator in the person day

performance

TLS

TLS

SYSTEM

1 to 30

LLE_DEC_10_3  Premium accounts in the time tickets of

the person

SYSTEM

101 to
105

LLE_PRKZ_10  Premium indicators in the time tickets of

the person.

MBL_FormulaBasedIncentiveWage.docx  Version: 1.5.16348

Page 52 of 52

