Upload of SAP time tickets

1  Upload of SAP time tickets

Overview

Record types and activities supported by HYDRA

HYDRA-BDE uploads the following record types in relation to time tickets to SAP R/3 PP.

Record

Meaning in SAP

Triggering HYDRA action

type

L20

Partial  completion  of

time

Orders are interrupted automatically or manually via the

ticket

shop floor client or office client.

L40

End of time ticket

Completion of an order via the shop floor client or office

client.

If  HYDRA  MPL  is  active,  an  L20  partial  completion  is  generated  and  transferred  to  SAP  for

every  generated  output  batch  (output  batch  changed)  in  addition  to  the  SAP  time  tickets  for

interrupting or logging off the OP.

Confirmation/upload structure (E2BP_PP_TIMETICKET)

Field name

T

L  D  Meaning

Usage in HYDRA

From

To2

CONF_NO

NUMC  10  0  Confirmation/upload number of
the operation

Confirmation/upload number as
specified

ORDERID

CHAR  12  0  Order

SAP order according to
specifications

1

1

10

11

22

1 The indicated number of characters is calculated based on the export length of the GI transaction 31 in SAP and

can be used as reference for HYDRA developers.

2 See footnote of column "From“

MBL_SAP_Implementation_PP_Conf_Up.docxVersion: 1.9.18774

Page 1 of 8

Field name

T

L  D  Meaning

Usage in HYDRA

From

To2

Upload of SAP time tickets

1

23

28

29

32

33

36

37

39

40

42

43

43

44

44

45

52

SEQUENCE

CHAR  6  0  Sequence

OPERATION

CHAR  4  0  Operation

SUB_OPER

CHAR  4  0  Suboperation

CAPA_CATEGORY

CHAR  3  0  Capacity category

SAP sequence according to
specifications

SAP operation according to
specifications

SAP suboperation according to
specifications

SAP capacity category according to
specifications

SPLIT

INT1

3  0  Split number

000, as no specification possible

FIN_CONF

CHAR  1  0  Partial/final confirmation/upload
(not interpreted)

Not used

CLEAR_RES

CHAR  1  0  Clearing open reservations

POSTG_DATE

DATS  8  0  Posting date

DEV_REASON

CHAR  4  0  Reason for the deviation

Use the parameter /CLEAR_RES to
assign an "X" to this field for an L40
posting.

Shift date of the HYDRA posting
record

This field includes the scrap reason if
the options "report part quantities" or
"upload of scrap including reason"
are enabled for the order type .

53

56

CONF_TEXT

CHAR  40  0  Confirmation/upload text

Not used
Exception: batch numbers are
entered here if H records are
uploaded/confirmed

PLANT

CHAR  4  0  Plant

Specified plant

WORK_CNTR

CHAR  8  0  Workplace

According to configuration - see
below

RECORDTYPE

CHAR  3  0  Record type of the

L20 or L40

upload/confirmation

CONF_QUAN_UNIT

UNIT  3  0  Quantity unit of

confirmation/upload

OP target quantity unit (primary
quantity unit)

CONF_QUAN_UNIT_ISO  CHAR  3  0

ISO code of quantity unit of
confirmation/upload

Not used

YIELD

QUAN  13  3  Yield

Yield in primary quantity unit

SCRAP

QUAN  13  3  Scrap quantity

Scrap in primary quantity unit

57

96

97

100

101

108

109

111

112

114

115

117

118

132

133

147

MBL_SAP_Implementation_PP_Conf_Up.docxVersion: 1.9.18774

Page 2 of 8

Field name

T

L  D  Meaning

Usage in HYDRA

From

To2

1

Upload of SAP time tickets

REWORK

QUAN  13  3  Rework quantity

Rework quantity in primary quantity
unit

CONF_ACTI_UNIT1

UNIT  3  0  Activity 1: quantity unit of activity

According to configuration

quantity

CONF_ACTI_UNIT1_ISO  CHAR  3  0  Activity 1: ISO code of the

Not used

quantity unit

CONF_ACTIVITY1

QUAN  13  3  Activity 1: activity quantity

According to configuration

NO_REMN_ACTI1

CHAR  1  0  Activity 1: No remaining activity

Not used

expected

CONF_ACTI_UNIT2

UNIT  3  0  Activity 2: quantity unit of activity

According to configuration

quantity

CONF_ACTI_UNIT2_ISO  CHAR  3  0  Activity 2: ISO code of the

Not used

quantity unit

CONF_ACTIVITY2

QUAN  13  3  Activity 2: activity quantity

According to configuration

NO_REMN_ACTI2

CHAR  1  0  Activity 2: No remaining activity

Not used

expected

CONF_ACTI_UNIT3

UNIT  3  0  Activity 3: quantity unit of activity

According to configuration

quantity

CONF_ACTI_UNIT3_ISO  CHAR  3  0  Activity 3: ISO code of the

Not used

quantity unit

CONF_ACTIVITY3

QUAN  13  3  Activity 3: activity quantity

According to configuration

NO_REMN_ACTI3

CHAR  1  0  Activity 3: No remaining activity

Not used

expected

CONF_ACTI_UNIT4

UNIT  3  0  Activity 4: quantity unit of activity

According to configuration

quantity

CONF_ACTI_UNIT4_ISO  CHAR  3  0  Activity 4: ISO code of the

Not used

quantity unit

CONF_ACTIVITY4

QUAN  13  3  Activity 4: activity quantity

According to configuration

NO_REMN_ACTI4

CHAR  1  0  Activity 4: No remaining activity

Not used

expected

CONF_ACTI_UNIT5

UNIT  3  0  Activity 5: quantity unit of activity

According to configuration

quantity

148

162

163

165

166

168

169

183

184

184

185

187

188

190

191

205

206

206

207

209

210

212

213

227

228

228

229

231

232

234

235

249

250

250

251

253

MBL_SAP_Implementation_PP_Conf_Up.docxVersion: 1.9.18774

Page 3 of 8

Field name

T

L  D  Meaning

Usage in HYDRA

From

To2

1

Upload of SAP time tickets

CONF_ACTI_UNIT5_ISO  CHAR  3  0  Activity 5: ISO code of the

Not used

quantity unit

CONF_ACTIVITY5

QUAN  13  3  Activity 5: activity quantity

According to configuration

NO_REMN_ACTI5

CHAR  1  0  Activity 5: No remaining activity

Not used

expected

CONF_ACTI_UNIT6

UNIT  3  0  Activity 6: quantity unit of activity

According to configuration

quantity

CONF_ACTI_UNIT6_ISO  CHAR  3  0  Activity 6: ISO code of the

Not used

quantity unit

CONF_ACTIVITY6

QUAN  13  3  Activity 6: activity quantity

According to configuration

NO_REMN_ACTI6

CHAR  1  0  Activity 6: No remaining activity

Not used

expected

CONF_BUS_PROC_UNIT
1

UNIT  3  0  Business process: quantity unit

Not used

of business process quantity

CONF_BUS_PROC_UNIT
1_ISO

CHAR  3  0  Business process: ISO code of
the quantity unit

Not used

CONF_BUS_PROC1

QUAN  13  3  Business process: business

Not used

process quantity

NO_REMN_BUS_PROC1  CHAR  1  0  Business process: no remaining

Not used

quantity expected

EXEC_START_DATE

DATS  8  0  Date when "starting execution"  Start time of the confirmed/uploaded

posting record

EXEC_START_TIME

TIMS  6  0  Time when "starting execution"  Start time of the confirmed/uploaded

posting record

SETUP_FIN_DATE

DATS  8  0  Date when "finishing setup"

Not used

SETUP_FIN_TIME

TIMS  6  0  Time when "finishing setup"

Not used

PROC_START_DATE

DATS  8  0  Date when "starting processing"  Not used

PROC_START_TIME

TIMS  6  0  Time when "starting processing"  Not used

PROC_FIN_DATE

DATS  8  0  Date when "finishing processing"  Not used

254

256

257

271

272

272

273

275

276

278

279

293

294

294

295

297

298

300

301

315

316

316

317

324

325

330

331

338

339

344

345

352

353

358

359

366

MBL_SAP_Implementation_PP_Conf_Up.docxVersion: 1.9.18774

Page 4 of 8

Field name

T

L  D  Meaning

Usage in HYDRA

From

To2

1

Upload of SAP time tickets

PROC_FIN_TIME

TIMS  6  0  Time when "finishing processing"  Not used

TEARDOWN_START_DA
TE

DATS  8  0  Date when "starting
retooling/teardown"

TEARDOWN_START_TIM
E

TIMS  6  0  Time when "starting
retooling/teardown"

Not used

Not used

EXEC_FIN_DATE

DATS  8  0  Date when "finishing execution"  End time of the confirmed/uploaded

posting record

EXEC_FIN_TIME

TIMS  6  0  Time when "finishing execution"  End time of the confirmed/uploaded

posting record

FCST_FIN_DATE

DATS  8  0  Date of the forecast "end of
execution"

Not used

FCST_FIN_TIME

TIMS  6  0  Time of the forecast "end of
execution"

Not used

STD_UNIT1

UNIT  3  0  Default value 1: quantity unit

Not used

STD_UNIT1_ISO

CHAR  3  0  Default value 1: ISO code of
quantity unit

Not used

FORCAST_STD_VAL1

QUAN  9  3  Default value 1: forecast default

Not used

value

STD_UNIT2

UNIT  3  0  Default value 2: quantity unit

Not used

STD_UNIT2_ISO

CHAR  3  0  Default value 2: ISO code of
quantity unit

Not used

FORCAST_STD_VAL2

QUAN  9  3  Default value 2: forecast default

Not used

value

STD_UNIT3

UNIT  3  0  Default value 3: quantity unit

Not used

STD_UNIT3_ISO

CHAR  3  0  Default value 3: ISO code of
quantity unit

Not used

FORCAST_STD_VAL3

QUAN  9  3  Default value 3: forecast default

Not used

value

STD_UNIT4

UNIT  3  0  Default value 4: quantity unit

Not used

STD_UNIT4_ISO

CHAR  3  0  Default value 4: ISO code of
quantity unit

Not used

367

372

373

380

381

386

387

394

395

400

401

408

409

414

415

417

418

420

421

431

432

434

435

437

438

448

449

451

452

454

455

465

466

468

469

471

MBL_SAP_Implementation_PP_Conf_Up.docxVersion: 1.9.18774

Page 5 of 8

Field name

T

L  D  Meaning

Usage in HYDRA

From

To2

1

Upload of SAP time tickets

FORCAST_STD_VAL4

QUAN  9  3  Default value 4: forecast default

Not used

value

STD_UNIT5

UNIT  3  0  Default value 5: quantity unit

Not used

STD_UNIT5_ISO

CHAR  3  0  Default value 5: ISO code of
quantity unit

Not used

FORCAST_STD_VAL5

QUAN  9  3  Default value 5: forecast default

Not used

value

STD_UNIT6

UNIT  3  0  Default value 6: quantity unit

Not used

STD_UNIT6_ISO

CHAR  3  0  Default value 6: ISO code of
quantity unit

Not used

FORCAST_STD_VAL6

QUAN  9  3  Default value 6: forecast default

Not used

value

FORCAST_BUS_PROC_
UNIT1

UNIT  3  0  Business process: quantity unit

Not used

of forecast Remaining quantity

FORC_BUS_PROC_UNIT
1_ISO

CHAR  3  0  Business process: ISO code of
the quantity unit

Not used

FORCAST_BUS_PROC_
VAL1

QUAN  13  3  Business process: forecast

Not used

remaining quantity

PERS_NO

NUMC  8  0  Personnel number

Not used

TIMEID_NO

NUMC  8  0  Time recording ID card number  According to configuration

WAGETYPE

CHAR  4  0  Wage type

Not used

SUITABILITY

CHAR  2  0  Suitability

Not used!

NO_OF_EMPLOYEE

DEC

5  2  Number of employees

Not used

WAGEGROUP

CHAR  3  0  Wage group

Not used

BREAK_UNIT

UNIT  3  0  Unit of break time

Not used

BREAK_UNIT_ISO

CHAR  3  0

ISO code of quantity unit

Not used

472

482

483

485

486

488

489

499

500

502

503

505

506

516

517

519

520

522

523

537

538

545

546

553

554

557

558

559

560

566

567

569

570

572

573

575

MBL_SAP_Implementation_PP_Conf_Up.docxVersion: 1.9.18774

Page 6 of 8

Field name

T

L  D  Meaning

Usage in HYDRA

From

To2

Upload of SAP time tickets

BREAK_TIME

QUAN  9  3  Uploaded/confirmed break time  Not used

EX_CREATED_BY

CHAR  12  0  External person creating the

Not used

confirmation/upload

EX_CREATED_DATE

DATS  8  0  External date of entering the

Not used

confirmation/upload

EX_CREATED_TIME

TIMS  6  0  External time of entering the

Not used

confirmation/upload

TARGET_ACTI1

CHAR  1  0

Indicator: identify target activity 1  Is assigned to "X" when calculating

activities in SAP

TARGET_ACTI2

CHAR  1  0

Indicator: identify target activity 2  Is assigned to "X" when calculating

activities in SAP

TARGET_ACTI3

CHAR  1  0

Indicator: identify target activity 3  Is assigned to "X" when calculating

activities in SAP

TARGET_ACTI4

CHAR  1  0

Indicator: identify target activity 4  Is assigned to "X" when calculating

activities in SAP

TARGET_ACTI5

CHAR  1  0

Indicator: identify target activity 5  Is assigned to "X" when calculating

activities in SAP

TARGET_ACTI6

CHAR  1  0

Indicator: identify target activity 6  Is assigned to "X" when calculating

activities in SAP

TARGET_BUS_PROC1

CHAR  1  0

Indicator: identify target quantity
of business process

Not used

EX_IDENT

CHAR  32  0  External key of the

upload/confirmation (GUID)

Distinct key identifying the
upload/confirmation

Reference from HYDRA table
ADE_PROTOKOLL

See the notes at the end of the table.

LOGDATE

DATS  8  0  Logical date

Date of the upload/confirmation

LOGTIME

TIMS  6  0  Logical time

Time of the upload/confirmation

1

576

586

587

598

599

606

607

612

613

613

614

614

615

615

616

616

617

617

618

618

619

619

620

651

652

659

660

665

Remarks on selected fields

EX_IDENT

The field EX_IDENT is assigned the value from the verweis column of the ade_protokoll table. The

field displays a continuous database serial and thus guarantees uniqueness within a DB instance.

MBL_SAP_Implementation_PP_Conf_Up.docxVersion: 1.9.18774

Page 7 of 8

Upload of SAP time tickets

The field is populated with the value of the verweis column and leading zeros (left-aligned) to reach

full length. Example: the verweis 4711 leads to "0000000000000000000000000004711“.

You  can  use  the  program  parameter  of  the  upload  program  myerprck.exe/out  to  assign  a  prefix.

The prefix allows you to use multiple HYDRA systems with one SAP instance. To do so,  you can

use the program parameter "IDENT_PRAEFIX".

You  cannot  upload  part  quantities  (L20/L40)  and  record  data  at  the  same  time  via  the  total

quantity counter at MDE machines, as SAP cannot process negative quantities by default. This

type of collection can result in negative quantity postings for yield when OPs are finished.

This restriction does no longer apply, if it is possible to process such negative postings (e.g. by

using the SAP standard BAPI or customizations).

The

sign

is

located

at

the

end

of

fields

of

the

type

"QUAN".

Example: 0000012345.432+

MBL_SAP_Implementation_PP_Conf_Up.docxVersion: 1.9.18774

Page 8 of 8

