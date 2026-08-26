Manual
Alternative Capturing
Methods
BDE-AEV 8.1
Version 1.0.4716
Last changed on: 19.06.2020

Alternative Capturing Methods
Copyright
©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.
Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.
BDE-AEV_81.docx Version: 1.0.8691 Page 2 of 15

|     |     |     | Alternative Capturing Methods  |     |
| --- | --- | --- | ------------------------------ | --- |

Contents
1  Overview of Alternative Entry Variants ........................................................ 4
2  Activity Codes .............................................................................................. 6

| BDE-AEV_81.docx  |     | Version: 1.0.8691  |     | Page 3 of 15  |
| ---------------- | --- | ------------------ | --- | ------------- |

Alternative Capturing Methods
1 Overview of Alternative Entry Variants
Purpose
The alternative entry variants component provides basic functions that allow you to execute posting rules
that deviate from the ones provided in the standard delivery or that make it possible to enter and post
other order-related performances other than quantities and times.
Examples of application scenarios
 The orders have very few units but a very long run time (e.g. 3 units, duration 4 weeks; estimated net
time approx. 40 hrs).
The customer would like to log the OP on and off in order to find out what its status is. However, there
are many active OPs in the workshop, yet that does not reveal which one is being actively processed.
For example, the time used is entered once a week by the foreman. In addition, it would also be a
nice option if, regardless of the time used, it were possible to enter the remaining working time (this
example can also be transferred very well to a maintenance solution).
 Furthermore, in many projects the task is to "simply" enter a specific value and upload it to the higher-
level system without this involving any other processing operations in HYDRA.
 Sometimes what is required is that the relevant number of employees involved must be posted, rather
than logging people on and off individually. Labor utilization is then the result of multiplying the
duration recorded by this number of persons. (This often also involves the works council, which
makes this requirement in these kinds of projects particularly important.)
 Often, what is required is that additional data is entered beyond the typical data entry variables such
as quantities and times. Example: Power consumption
Implementation considerations
You use the function package if:
 You have activities (operations) or workplaces, where time use cannot be determined by
calculating the difference between operation logon and logoff, but instead must be entered
discretely.
 For a specific order, you want to enter and post other order/operation-related activities other than
quantities produced and times used.
BDE-AEV_81.docx Version: 1.0.8691 Page 4 of 15

Alternative Capturing Methods
Integration
The basic functions included in this component are used to enter and post activities from the server. They
do not provide any visual functions. The modifications needed for this at the entry client (e.g. terminal)
must be considered separately.
If activities entered should also be uploaded to a leading system, then this must also be considered
separately at the server. Additionally entered activities are not available for evaluation in MOC at this
time.
Features
Basic functions for processing different entry variants in the BDE environment:
 Time event-related entry and based on it, the calculation of the time to be posted.
 Time-ticket-based entries
 Combination of the two entry types
 Automatic calculation from other variables, e.g. calculation of labor utilization from duration x
explicitly entered numbers of persons
 Order-related posting of consumption data entered (e.g. consumption of power, water, energy,
supplies ...)
Please note: Adding and coordinating the specific requirements and implementing them are
considered a customized HYDRA service (a service subject to an added charge).
BDE-AEV_81.docx Version: 1.0.8691 Page 5 of 15

Alternative Capturing Methods
2 Activity Codes
Summary
Menu Master data  Order  Activity codes
Transaction code actc
Function authorization mdactc
Usage
You use this application if you would like to configure activity codes.
Integration
The system manages different activities based on operations. In addition to special activities like "times"
and "quantities", other activities can also be entered.
The activity code describes the meaning as well as the processing of the separate activities. It is defined
at the operation.
Selection criteria
The application provides the following selection criteria:
Activity code
Designation of the activity code
Activity
Activity
Field descriptions
Activity code
A unique key that combines the configurations for several activities.
Activity
BMK01 ... BMK12 Time-based activities: resource performance accounts,
workplace-related
DAUER Time-based activities:
sum of the resource performance accounts, workplace-
related
PBMK01 ... PBMK12 Time-based activities: resource performance accounts,
personnel-related
BDE-AEV_81.docx Version: 1.0.8691 Page 6 of 15

|     |     |     |     | Alternative Capturing Methods  |     |
| --- | --- | --- | --- | ------------------------------ | --- |

PDAUER
|     |     | Time-based activities:   |     |     |     |
| --- | --- | ------------------------ | --- | --- | --- |
sum of the resource performance accounts, personnel-related
| LST01 ... LST10  |     | Miscellaneous activities  |     |     |     |
| ---------------- | --- | ------------------------- | --- | --- | --- |
Designation
Activity name.
Field type
Reference to a field type.
Formula for target activity
Formula for calculating the target activity (reserved, currently not processed)
Input type
ZE  Input based on time events (only for RPA time-based activities)
| DR  | Discrete input, relative                                   |     |     |     |     |
| --- | ---------------------------------------------------------- | --- | --- | --- | --- |
| DA  | Discrete input, absolute                                   |     |     |     |     |
| XU  | Calculated using formula for actual activity, per posting  |     |     |     |     |
XE  Calculated using formula for actual activity, when OP is logged off
Keep in mind that for input type <> ZE, BMK and PBMK time-based activities are no longer
compared to the shift calendar, but instead are variables that are directly entered or calculated
based on formulas.
Formula for actual activity
Actual activities can be calculated by using the defined formulas. Formulas are defined in formula
management.
The below-mentioned acronyms can be used in the formulas:
| Identifiers  |     | Designation/meaning  |     | Additional  |     |
| ------------ | --- | -------------------- | --- | ----------- | --- |
selection
Operation data
| ANR.FU:1-ANR.FU:66  |     | The OP's user fields  |     |     | The CHAR fields  |
| ------------------- | --- | --------------------- | --- | --- | ---------------- |
as well?
| ANR.SGR:GUTB  |     | Target quantity of the OP in  |     |     |     |
| ------------- | --- | ----------------------------- | --- | --- | --- |
base quantity unit
| ANR.SGR:GUTP  |     | The OP's target quantity in  |     |     |     |
| ------------- | --- | ---------------------------- | --- | --- | --- |
primary quantity unit
| ANR.SGR:GUT  |     | The OP's target quantity in  |                       |     |     |
| ------------ | --- | ---------------------------- | --------------------- | --- | --- |
|              |     | primary                      | quantity  unit  (old  |     |     |
format)
| ANR.SGR:GUTS  |     | The OP's target quantity in  |     |     |     |
| ------------- | --- | ---------------------------- | --- | --- | --- |
secondary quantity unit
| ANR.SGR:GUTT  |     | The OP's target quantity in  |     |     |     |
| ------------- | --- | ---------------------------- | --- | --- | --- |
tertiary quantity unit

| BDE-AEV_81.docx  |     | Version: 1.0.8691  |     |     | Page 7 of 15  |
| ---------------- | --- | ------------------ | --- | --- | ------------- |

|     |     |     |     |     | Alternative Capturing Methods  |     |
| --- | --- | --- | --- | --- | ------------------------------ | --- |

|     | Identifiers  | Designation/meaning  |     | Additional  |     |     |
| --- | ------------ | -------------------- | --- | ----------- | --- | --- |
selection
|     | ANR.SGR:AUSB  | The  OP's  | scrap  | in  base    |     |     |
| --- | ------------- | ---------- | ------ | ----------- | --- | --- |
quantity unit
|     | ANR.SGR:AUSP  | The  OP's  | scrap  in  | primary    |     |     |
| --- | ------------- | ---------- | ---------- | ---------- | --- | --- |
quantity unit
|     | ANR.SGR:AUS  | The  OP's  | scrap  in  | primary    |     |     |
| --- | ------------ | ---------- | ---------- | ---------- | --- | --- |
quantity unit (old format)
|     | ANR.SGR:AUSS  | The  | OP's  scrap  | in    |     |     |
| --- | ------------- | ---- | ------------ | ----- | --- | --- |
secondary quantity unit
|     | ANR.SGR:AUST  | The  OP's  | scrap  in  | tertiary    |     |     |
| --- | ------------- | ---------- | ---------- | ----------- | --- | --- |
quantity unit
|     | ANR.EINHMENGE  | ddi_param->ab.einh_menge  |     |     |     |                  |
| --- | -------------- | ------------------------- | --- | --- | --- | ---------------- |
|     | ANR.SZY        | The OP's target cycle     |     |     |     |                  |
|     | ANR.TLG        | The OP's partitioning     |     |     |     |                  |
|     | ANR.IMPFAKT    | The OP's pulse factor     |     |     |     |                  |
|     | ANR.VGW01      | Default value 01 of OP    |     | J   |     | auftrags_bestand |
.vgw_01
|     | ANR.VGW02  | Default value 02 of OP  |     | J   |     | auftrags_bestand |
| --- | ---------- | ----------------------- | --- | --- | --- | ---------------- |
.vgw_02
|     | ANR.VGW03  | Default value 03 of OP  |     | J   |     | auftrags_bestand |
| --- | ---------- | ----------------------- | --- | --- | --- | ---------------- |
.vgw_03
|     | ANR.VGW04  | Default value 04 of OP  |     | J   |     | auftrags_bestand |
| --- | ---------- | ----------------------- | --- | --- | --- | ---------------- |
.vgw_04
|     | ANR.VGW05  | Default value 05 of OP  |     | J   |     | auftrags_bestand |
| --- | ---------- | ----------------------- | --- | --- | --- | ---------------- |
.vgw_05
|     | ANR.VGW06  | Default value 06 of OP  |     | J   |     | auftrags_bestand |
| --- | ---------- | ----------------------- | --- | --- | --- | ---------------- |
.vgw_06
|     | ANR.VGW07  | Default value 07 of OP  |     | J   |     | auftrags_bestand |
| --- | ---------- | ----------------------- | --- | --- | --- | ---------------- |
.vgw_07
|     | ANR.VGW08  | Default value 08 of OP  |     | J   |     | auftrags_bestand |
| --- | ---------- | ----------------------- | --- | --- | --- | ---------------- |
.vgw_08
|     | ANR.VGW09  | Default value 09 of OP  |     | J   |     | auftrags_bestand |
| --- | ---------- | ----------------------- | --- | --- | --- | ---------------- |
.vgw_09
|     | ANR.VGW010  | Default value 10 of OP  |     | J   |     | auftrags_bestand |
| --- | ----------- | ----------------------- | --- | --- | --- | ---------------- |
.vgw_10
|     | ANR.RUEZ  | The OP's setup time  |     |     |     |     |
| --- | --------- | -------------------- | --- | --- | --- | --- |
ANR.RUEZ:ZUSCHL  The  OP's  additional  setup  J  ab.ruest_zeit_zu
|     |             | time                      |     |          |     | schl             |
| --- | ----------- | ------------------------- | --- | -------- | --- | ---------------- |
|     | ANR.BEARBZ  | The OP's processing time  |     |          |     |                  |
|     | ANR.ABRZ    | The                       |     | OP's  J  |     | ab.abruest_zeit  |
dismantling/retooling time
|     | ANR.LIEZ:MAX  | The  OP's                | maximum  | wait  J  |     | ab.liege_zeit_ma |
| --- | ------------- | ------------------------ | -------- | -------- | --- | ---------------- |
|     |               | time                     |          |          |     | x                |
|     | ANR.LIEZ      | The OP's wait time       |          | J        |     | ab.liege_zeit    |
|     | ANR.LIZ       | The OP's delivery time   |          | J        |     | ab.lieferzeit    |
|     | ANR.BMK01     | Target value for RPA 01  |          |          |     |                  |
|     | ANR.BMK02     | Target value for RPA 02  |          |          |     |                  |
|     | ANR.BMK03     | Target value for RPA 03  |          |          |     |                  |
|     | ANR.BMK04     | Target value for RPA 04  |          |          |     |                  |

| BDE-AEV_81.docx  |     | Version: 1.0.8691  |     |     |     | Page 8 of 15  |
| ---------------- | --- | ------------------ | --- | --- | --- | ------------- |

|     |     |     |     | Alternative Capturing Methods  |     |
| --- | --- | --- | --- | ------------------------------ | --- |

| Identifiers  |     | Designation/meaning  |     | Additional  |     |
| ------------ | --- | -------------------- | --- | ----------- | --- |
selection
| ANR.BMK05      |     | Target value for RPA 05   |             |     |                  |
| -------------- | --- | ------------------------- | ----------- | --- | ---------------- |
| ANR.BMK06      |     | Target value for RPA 06   |             |     |                  |
| ANR.BMK07      |     | Target value for RPA 07   |             |     |                  |
| ANR.BMK08      |     | Target value for RPA 08   |             |     |                  |
| ANR.BMK09      |     | Target value for RPA 09   |             |     |                  |
| ANR.BMK10      |     | Target value for RPA 10   |             |     |                  |
| ANR.BMK11      |     | Target value for RPA 11   |             |     |                  |
| ANR.BMK12      |     | Target value for RPA 12   |             |     |                  |
| ANR.ANZSPLIT   |     | Maximum number of splits  |             | J   | ab.ls_split_anz  |
| ANR.VLZ        |     | The OP's lead time        |             |     | ab.vorlaufzeit   |
| ANR.WEIGMENGE  |     | The  OP's                 | send-ahead  |     |                  |
quantity
| ANR.LST01     |     | Target activity 01 of OP  |                    |     |              |
| ------------- | --- | ------------------------- | ------------------ | --- | ------------ |
| ANR.LST02     |     | Target activity 02 of OP  |                    |     |              |
| ANR.LST03     |     | Target activity 03 of OP  |                    |     |              |
| ANR.LST04     |     | Target activity 04 of OP  |                    |     |              |
| ANR.LST05     |     | Target activity 05 of OP  |                    |     |              |
| ANR.LST06     |     | Target activity 06 of OP  |                    |     |              |
| ANR.LST07     |     | Target activity 07 of OP  |                    |     |              |
| ANR.LST08     |     | Target activity 08 of OP  |                    |     |              |
| ANR.LST09     |     | Target activity 09 of OP  |                    |     |              |
| ANR.LST10     |     | Target activity 10 of OP  |                    |     |              |
| ANR.EGR:GUTB  |     | Yield                     | that  has  been    | J   | ast.gut_bas  |
|               |     | recorded                  | so  far  in  base  |     |              |
quantity unit
| ANR.EGR:GUTP  |     | Yield     | that  has  been       | J   | ast.gut_pri  |
| ------------- | --- | --------- | --------------------- | --- | ------------ |
|               |     | recorded  | so  far  in  primary  |     |              |
quantity unit
| ANR.EGR:GUT  |     | Yield     | that  has  been       | J   | ast.gut_pri  |
| ------------ | --- | --------- | --------------------- | --- | ------------ |
|              |     | recorded  | so  far  in  primary  |     |              |
quantity unit (old format)
| ANR.EGR:GUTS  |     | Yield  | that  has  been  | J   | ast.gut_sek  |
| ------------- | --- | ------ | ---------------- | --- | ------------ |
recorded so far in secondary
quantity unit
| ANR.EGR:GUTT  |     | Yield     | that  has  been        | J   | ast.gut_ter  |
| ------------- | --- | --------- | ---------------------- | --- | ------------ |
|               |     | recorded  | so  far  in  tertiary  |     |              |
quantity unit
| ANR.EGR:AUSB  |     | Scrap     | that  has  been    | J   | ast.aus_bas  |
| ------------- | --- | --------- | ------------------ | --- | ------------ |
|               |     | recorded  | so  far  in  base  |     |              |
quantity unit

| BDE-AEV_81.docx  |     | Version: 1.0.8691  |     |     | Page 9 of 15  |
| ---------------- | --- | ------------------ | --- | --- | ------------- |

|     |     |     |     | Alternative Capturing Methods  |     |
| --- | --- | --- | --- | ------------------------------ | --- |

| Identifiers  |     | Designation/meaning  |     | Additional  |     |
| ------------ | --- | -------------------- | --- | ----------- | --- |
selection
| ANR.EGR:AUSP  |     | Scrap     | that  has  been       | J   | ast.aus_pri  |
| ------------- | --- | --------- | --------------------- | --- | ------------ |
|               |     | recorded  | so  far  in  primary  |     |              |
quantity unit
| ANR.EGR:AUS  |     | Scrap     | that  has  been       | J   | ast.aus_pri  |
| ------------ | --- | --------- | --------------------- | --- | ------------ |
|              |     | recorded  | so  far  in  primary  |     |              |
quantity unit (old format)
| ANR.EGR:AUSS  |     | Scrap  | that  has  been  | J   | ast.aus_sek  |
| ------------- | --- | ------ | ---------------- | --- | ------------ |
recorded so far in secondary
quantity unit
| ANR.EGR:AUST  |     | Scrap     | that  has  been        | J   | ast.aus_ter  |
| ------------- | --- | --------- | ---------------------- | --- | ------------ |
|               |     | recorded  | so  far  in  tertiary  |     |              |
quantity unit
ANR.EGR:NCHB  Rework  quantity  that  has  J  ast.nacharb_bas
been recorded so far in base
quantity unit
J
| ANR.EGR:NCHP  |     | Rework          | quantity  that  has  |     | ast.nacharb_pri  |
| ------------- | --- | --------------- | -------------------- | --- | ---------------- |
|               |     | been  recorded  | so  far              | in  |                  |
primary quantity unit
ANR.EGR:NCH  Rework  quantity  that  has  J  ast.nacharb_pri
|     |     | been  recorded  | so  far               | in  |     |
| --- | --- | --------------- | --------------------- | --- | --- |
|     |     | primary         | quantity  unit  (old  |     |     |
format)
ANR.EGR:NCHS  Rework  quantity  that  has  J  ast.nacharb_sek
|     |     | been  recorded  | so  far  | in  |     |
| --- | --- | --------------- | -------- | --- | --- |
secondary quantity unit
ANR.EGR:NCHT  Rework  quantity  that  has  J  ast.nacharb_ter
|     |     | been  recorded  | so  far  | in  |     |
| --- | --- | --------------- | -------- | --- | --- |
tertiary quantity unit
ANR.EGR:PRBB  Problem  quantity  that  has  J  ast.problem_bas
been recorded so far in base
quantity unit
ANR.EGR:PRBP  Problem  quantity  that  has  J  ast.problem_pri
|     |     | been  recorded  | so  far  | in  |     |
| --- | --- | --------------- | -------- | --- | --- |
primary quantity unit
ANR.EGR:PRB  Problem  quantity  that  has  J  ast.problem_pri
|     |     | been  recorded  | so  far               | in  |     |
| --- | --- | --------------- | --------------------- | --- | --- |
|     |     | primary         | quantity  unit  (old  |     |     |
format)
ANR.EGR:PRBS  Problem  quantity  that  has  J  ast.problem_sek
|     |     | been  recorded  | so  far  | in  |     |
| --- | --- | --------------- | -------- | --- | --- |
secondary quantity unit
ANR.EGR:PRBT  Problem  quantity  that  has  J  ast.problem_ter
|     |     | been  recorded  | so  far  | in  |     |
| --- | --- | --------------- | -------- | --- | --- |
tertiary quantity unit
ANR.EGR:BMK01  Duration  recorded  for  RPA  J  ast.calc_bmk_01
01
ANR.EGR:BMK02  Duration  recorded  for  RPA  J  ast.calc_bmk_02
02
ANR.EGR:BMK03  Duration  recorded  for  RPA  J  ast.calc_bmk_03
03
ANR.EGR:BMK04  Duration  recorded  for  RPA  J  ast.calc_bmk_04
04

| BDE-AEV_81.docx  |     | Version: 1.0.8691  |     |     | Page 10 of 15  |
| ---------------- | --- | ------------------ | --- | --- | -------------- |

Alternative Capturing Methods
Identifiers Designation/meaning Additional
selection
ANR.EGR:BMK05 Duration recorded for RPA J ast.calc_bmk_05
05
ANR.EGR:BMK06 Duration recorded for RPA J ast.calc_bmk_06
06
ANR.EGR:BMK07 Duration recorded for RPA J ast.calc_bmk_07
07
ANR.EGR:BMK08 Duration recorded for RPA J ast.calc_bmk_08
08
ANR.EGR:BMK09 Duration recorded for RPA J ast.calc_bmk_09
09
ANR.EGR:BMK10 Duration recorded for RPA ADEPRO.EGR:N ast.calc_bmk_10
10
CHP
ANR.EGR:BMK11 Duration recorded for RPA J ast.calc_bmk_11
11
ANR.EGR:BMK12 Duration recorded for RPA J ast.calc_bmk_12
12
ANR.EGR:HUB Total cycles/strokes J ast.hub_gesamt
recorded
ANR.RGR:BMK01 Current remaining activity J ast.rest_bmk_01
for RPA 01
ANR.RGR:BMK02 Current remaining activity J ast.rest_bmk_02
for RPA 02
ANR.RGR:BMK03 Current remaining activity J ast.rest_bmk_03
for RPA 03
ANR.RGR:BMK04 Current remaining activity J ast.rest_bmk_04
for RPA 04
ANR.RGR:BMK05 Current remaining activity J ast.rest_bmk_05
for RPA 05
ANR.RGR:BMK06 Current remaining activity J ast.rest_bmk_06
for RPA 06
ANR.RGR:BMK07 Current remaining activity J ast.rest_bmk_07
for RPA 07
ANR.RGR:BMK08 Current remaining activity J ast.rest_bmk_08
for RPA 08
ANR.RGR:BMK09 Current remaining activity J ast.rest_bmk_09
for RPA 09
ANR.RGR:BMK10 Current remaining activity J ast.rest_bmk_10
for RPA 10
ANR.RGR:BMK11 Current remaining activity J ast.rest_bmk_11
for RPA 11
ANR.RGR:BMK12 Current remaining activity J ast.rest_bmk_12
for RPA 12
BDE-AEV_81.docx Version: 1.0.8691 Page 11 of 15

|     |     |     |     |     | Alternative Capturing Methods  |     |
| --- | --- | --- | --- | --- | ------------------------------ | --- |

| Identifiers  |     | Designation/meaning  |     | Additional  |     |     |
| ------------ | --- | -------------------- | --- | ----------- | --- | --- |
selection
ANR.RGR:LST01  Current  actual  activity  for  J  ast.rest_lst_01
RPA 01
ANR.RGR:LST02  Current  actual  activity  for  J  ast.rest_lst_02
RPA 02
ANR.RGR:LST03  Current  actual  activity  for  J  ast.rest_lst_03
RPA 03
ANR.RGR:LST04  Current  actual  activity  for  J  ast.rest_lst_04
RPA 04
ANR.RGR:LST05  Current  actual  activity  for  J  ast.rest_lst_05
RPA 05
ANR.RGR:LST06  Current  actual  activity  for  J  ast.rest_lst_06
RPA 06
ANR.RGR:LST07  Current  actual  activity  for  J  ast.rest_lst_07
RPA 07
ANR.RGR:LST08  Current  actual  activity  for  J  ast.rest_lst_08
RPA 08
ANR.RGR:LST09  Current  actual  activity  for  J  ast.rest_lst_09
RPA 09
ANR.RGR:LST10  Current  actual  activity  for  J  ast.rest_lst_10
RPA 10
| ANR.UMRFAKTLI:N  |     | Denominator  | of  the  | OP's    |     |     |
| ---------------- | --- | ------------ | -------- | ------- | --- | --- |
conversion factor
| ANR.UMRFAKTLI:Z  |     | Numerator  | of  the  | OP's    |     |     |
| ---------------- | --- | ---------- | -------- | ------- | --- | --- |
conversion factor
| ANR.UMRFAKTP:N  |     | Denominator  | of  the  | OP's    |     |     |
| --------------- | --- | ------------ | -------- | ------- | --- | --- |
conversion factor in primary
quantity unit
| ANR.UMRFAKTP:Z  |     | Numerator  | of  the  | OP's    |     |     |
| --------------- | --- | ---------- | -------- | ------- | --- | --- |
conversion factor in primary
quantity unit
| ANR.UMRFAKTS:N  |     | Denominator  | of  the  | OP's    |     |     |
| --------------- | --- | ------------ | -------- | ------- | --- | --- |
|                 |     | conversion   | factor   | in      |     |     |
secondary quantity unit
| ANR.UMRFAKTS:Z  |     | Numerator   | of  the  | OP's    |     |     |
| --------------- | --- | ----------- | -------- | ------- | --- | --- |
|                 |     | conversion  | factor   | in      |     |     |
secondary quantity unit
| ANR.UMRFAKTT:N  |     | Denominator  | of  the  | OP's    |     |     |
| --------------- | --- | ------------ | -------- | ------- | --- | --- |
conversion factor in tertiary
quantity unit
| ANR.UMRFAKTT:Z  |     | Numerator  | of  the  | OP's    |     |     |
| --------------- | --- | ---------- | -------- | ------- | --- | --- |
conversion factor in tertiary
quantity unit
Machine master data (table MASCHINEN)
| MNR.TLG  |     | Machine partitioning  |     |     |     |     |
| -------- | --- | --------------------- | --- | --- | --- | --- |
Posting records pertaining to the OP (table ADE_PROTOKOLL)
| ADEPRO.EGR:GUTB  |     | Recorded  | yield  | in  base    |     |     |
| ---------------- | --- | --------- | ------ | ----------- | --- | --- |
quantity unit

| BDE-AEV_81.docx  |     | Version: 1.0.8691  |     |     |     | Page 12 of 15  |
| ---------------- | --- | ------------------ | --- | --- | --- | -------------- |

|     |     |     |     |     |     | Alternative Capturing Methods  |     |
| --- | --- | --- | --- | --- | --- | ------------------------------ | --- |

|     | Identifiers  | Designation/meaning  |     |     |     | Additional  |     |
| --- | ------------ | -------------------- | --- | --- | --- | ----------- | --- |
selection
|     | ADEPRO.EGR:GUTP  | Recorded  | yield  | in  | primary  |     |     |
| --- | ---------------- | --------- | ------ | --- | -------- | --- | --- |
quantity unit
|     | ADEPRO.EGR:GUT  | Recorded  | yield  | in  | primary  |     |     |
| --- | --------------- | --------- | ------ | --- | -------- | --- | --- |
quantity unit (old format)
|     | ADEPRO.EGR:GUTS  | Recorded yield in secondary  |     |     |     |     |     |
| --- | ---------------- | ---------------------------- | --- | --- | --- | --- | --- |
quantity unit
|     | ADEPRO.EGR:GUTT  | Recorded  | yield  | in  | tertiary  |     |     |
| --- | ---------------- | --------- | ------ | --- | --------- | --- | --- |
quantity unit
|     | ADEPRO.EGR:AUSB  | Recorded  | scrap  |     | in  base  |     |     |
| --- | ---------------- | --------- | ------ | --- | --------- | --- | --- |
quantity unit
|     | ADEPRO.EGR:AUSP  | Recorded  | scrap  | in  | primary  |     |     |
| --- | ---------------- | --------- | ------ | --- | -------- | --- | --- |
quantity unit
|     | ADEPRO.EGR:AUS  | Recorded  | scrap  | in  | primary  |     |     |
| --- | --------------- | --------- | ------ | --- | -------- | --- | --- |
quantity unit (old format)
|     | ADEPRO.EGR:AUSS  | Recorded  |     | scrap  |     | in    |     |
| --- | ---------------- | --------- | --- | ------ | --- | ----- | --- |
secondary quantity unit
|     | ADEPRO.EGR:AUST  | Recorded  | scrap  | in  | tertiary  |     |     |
| --- | ---------------- | --------- | ------ | --- | --------- | --- | --- |
quantity unit
|     | ADEPRO.EGR:NCHB  | Recorded rework quantity in  |     |     |     |     |     |
| --- | ---------------- | ---------------------------- | --- | --- | --- | --- | --- |
base quantity unit
|     | ADEPRO.EGR:NCHP  | Recorded rework quantity in  |     |     |     |     |     |
| --- | ---------------- | ---------------------------- | --- | --- | --- | --- | --- |
primary quantity unit
|     | ADEPRO.EGR:NCH  | Recorded rework quantity in  |           |     |             |     |     |
| --- | --------------- | ---------------------------- | --------- | --- | ----------- | --- | --- |
|     |                 | primary                      | quantity  |     | unit  (old  |     |     |
format)
|     | ADEPRO.EGR:NCHS  | Recorded rework quantity in  |     |     |     |     |     |
| --- | ---------------- | ---------------------------- | --- | --- | --- | --- | --- |
secondary quantity unit
|     | ADEPRO.EGR:NCHT  | Recorded rework quantity in  |     |     |     |     |     |
| --- | ---------------- | ---------------------------- | --- | --- | --- | --- | --- |
tertiary quantity unit
|     | ADEPRO.EGR:PRBB  | Recorded  | problem  |     | quantity  |     |     |
| --- | ---------------- | --------- | -------- | --- | --------- | --- | --- |
in base quantity unit
|     | ADEPRO.EGR:PRBP  | Recorded  | problem  |     | quantity  |     |     |
| --- | ---------------- | --------- | -------- | --- | --------- | --- | --- |
in primary quantity unit
|     | ADEPRO.EGR:PRB  | Recorded  | problem  |     | quantity  |     |     |
| --- | --------------- | --------- | -------- | --- | --------- | --- | --- |
in primary quantity unit (old
format)
|     | ADEPRO.EGR:PRBS  | Recorded  | problem  |     | quantity  |     |     |
| --- | ---------------- | --------- | -------- | --- | --------- | --- | --- |
in secondary quantity unit
|     | ADEPRO.EGR:PRBT  | Recorded  | problem  |     | quantity  |     |     |
| --- | ---------------- | --------- | -------- | --- | --------- | --- | --- |
in tertiary quantity unit
|     | ADEPRO.EGR:BMK01  | Duration  | recorded  |     | for  RPA  |     |     |
| --- | ----------------- | --------- | --------- | --- | --------- | --- | --- |
01
|     | ADEPRO.EGR:BMK02  | Duration  | recorded  |     | for  RPA  |     |     |
| --- | ----------------- | --------- | --------- | --- | --------- | --- | --- |
02
|     | ADEPRO.EGR:BMK03  | Duration  | recorded  |     | for  RPA  |     |     |
| --- | ----------------- | --------- | --------- | --- | --------- | --- | --- |
03
|     | ADEPRO.EGR:BMK04  | Duration  | recorded  |     | for  RPA  |     |     |
| --- | ----------------- | --------- | --------- | --- | --------- | --- | --- |
04

| BDE-AEV_81.docx  |     | Version: 1.0.8691  |     |     |     |     | Page 13 of 15  |
| ---------------- | --- | ------------------ | --- | --- | --- | --- | -------------- |

|     |     |     |     | Alternative Capturing Methods  |     |
| --- | --- | --- | --- | ------------------------------ | --- |

| Identifiers  |     | Designation/meaning  |     | Additional  |     |
| ------------ | --- | -------------------- | --- | ----------- | --- |
selection
| ADEPRO.EGR:BMK05  |     | Duration  | recorded  for  RPA  |     |     |
| ----------------- | --- | --------- | ------------------- | --- | --- |
05
| ADEPRO.EGR:BMK06  |     | Duration  | recorded  for  RPA  |     |     |
| ----------------- | --- | --------- | ------------------- | --- | --- |
06
| ADEPRO.EGR:BMK07  |     | Duration  | recorded  for  RPA  |     |     |
| ----------------- | --- | --------- | ------------------- | --- | --- |
07
| ADEPRO.EGR:BMK08  |     | Duration  | recorded  for  RPA  |     |     |
| ----------------- | --- | --------- | ------------------- | --- | --- |
08
| ADEPRO.EGR:BMK09  |     | Duration  | recorded  for  RPA  |     |     |
| ----------------- | --- | --------- | ------------------- | --- | --- |
09
| ADEPRO.EGR:BMK10  |     | Duration  | recorded  for  RPA  |     |     |
| ----------------- | --- | --------- | ------------------- | --- | --- |
10
| ADEPRO.EGR:BMK11  |     | Duration  | recorded  for  RPA  |     |     |
| ----------------- | --- | --------- | ------------------- | --- | --- |
11
| ADEPRO.EGR:BMK12  |     | Duration  | recorded  for  RPA  |     |     |
| ----------------- | --- | --------- | ------------------- | --- | --- |
12
| ADEPRO.EGR:HUB    |     | Recorded cycles/strokes    |     |     |     |
| ----------------- | --- | -------------------------- | --- | --- | --- |
| ADEPRO.RGR:BMK01  |     | Residual recorded for RPA  |     |     |     |
01
| ADEPRO.RGR:BMK02  |     | Residual recorded for RPA  |     |     |     |
| ----------------- | --- | -------------------------- | --- | --- | --- |
02
| ADEPRO.RGR:BMK03  |     | Residual recorded for RPA  |     |     |     |
| ----------------- | --- | -------------------------- | --- | --- | --- |
03
| ADEPRO.RGR:BMK04  |     | Residual recorded for RPA  |     |     |     |
| ----------------- | --- | -------------------------- | --- | --- | --- |
04
| ADEPRO.RGR:BMK05  |     | Residual recorded for RPA  |     |     |     |
| ----------------- | --- | -------------------------- | --- | --- | --- |
05
| ADEPRO.RGR:BMK06  |     | Residual recorded for RPA  |     |     |     |
| ----------------- | --- | -------------------------- | --- | --- | --- |
06
| ADEPRO.RGR:BMK07  |     | Residual recorded for RPA  |     |     |     |
| ----------------- | --- | -------------------------- | --- | --- | --- |
07
| ADEPRO.RGR:BMK08  |     | Residual recorded for RPA  |     |     |     |
| ----------------- | --- | -------------------------- | --- | --- | --- |
08
| ADEPRO.RGR:BMK09  |     | Residual recorded for RPA  |     |     |     |
| ----------------- | --- | -------------------------- | --- | --- | --- |
09
| ADEPRO.RGR:BMK10  |     | Residual recorded for RPA  |     |     |     |
| ----------------- | --- | -------------------------- | --- | --- | --- |
10
| ADEPRO.RGR:BMK11  |     | Residual recorded for RPA  |     |     |     |
| ----------------- | --- | -------------------------- | --- | --- | --- |
11
| ADEPRO.RGR:BMK12  |     | Residual recorded for RPA  |     |     |     |
| ----------------- | --- | -------------------------- | --- | --- | --- |
12
| ADEPRO.RGR:LST01  |     | Recorded activity 01  |     |     |     |
| ----------------- | --- | --------------------- | --- | --- | --- |
| ADEPRO.RGR:LST02  |     | Recorded activity 02  |     |     |     |
| ADEPRO.RGR:LST03  |     | Recorded activity 03  |     |     |     |
| ADEPRO.RGR:LST04  |     | Recorded activity 04  |     |     |     |
| ADEPRO.RGR:LST05  |     | Recorded activity 05  |     |     |     |
| ADEPRO.RGR:LST06  |     | Recorded activity 06  |     |     |     |
| ADEPRO.RGR:LST07  |     | Recorded activity 07  |     |     |     |
| ADEPRO.RGR:LST08  |     | Recorded activity 08  |     |     |     |
| ADEPRO.RGR:LST09  |     | Recorded activity 09  |     |     |     |
| ADEPRO.RGR:LST10  |     | Recorded activity 10  |     |     |     |

| BDE-AEV_81.docx  |     | Version: 1.0.8691  |     |     | Page 14 of 15  |
| ---------------- | --- | ------------------ | --- | --- | -------------- |

|     |     |     | Alternative Capturing Methods  |     |
| --- | --- | --- | ------------------------------ | --- |

Underdelivery
Permissible underdelivery (for this activity) in percent
Reaction in the event of underdelivery
| empty  | No test                                      |     |     |     |
| ------ | -------------------------------------------- | --- | --- | --- |
| W      | Warning (reserved; currently not processed)  |     |     |     |
| X      | Error                                        |     |     |     |
Overdelivery
Permissible overdelivery (for this activity) in percent
Reaction in the event of overdelivery
| empty     | No test                                      |     |     |     |
| --------- | -------------------------------------------- | --- | --- | --- |
| W         | Warning (reserved; currently not processed)  |     |     |     |
| X         | Error                                        |     |     |     |
Overriding in the event of under/ overdelivery: Currently, no reasons are planned for activities.

| BDE-AEV_81.docx  |     | Version: 1.0.8691  |     | Page 15 of 15  |
| ---------------- | --- | ------------------ | --- | -------------- |