MBL Range of Coverage Analysis
1 MBL Range of Coverage Analysis
Overview
The range of coverage analysis allows the user to recognize how much time is left until a specific material
for a production level is consumed and/or for how long there will be enough material available for
production.
This means that this function analyzes the range of coverage of a material transferred between two
consecutive production levels (preceding level and subsequent level).
The range of coverage computation is requested for a production level considered as consuming in this
context. With regard to the analysis, all supply levels/production levels assigned to this level as preceding
levels are then considered.
If these, in turn, are supply levels to other levels, the latter are also included for the purpose of a holistic
analysis.
In this process, the following materials from the batch stock are included:
 Material of the selected production level
o Material in the configured input buffer of the production level
o Material currently being used as component in the running operation (to be found through
BOM)
 Material from the preceding levels to the selected production level
o Material currently located in configured output buffers of preceding levels
o Material currently produced in the preceding levels of the running operation
For each material, the number of supplying as well as consuming machines is indicated.
The current stock of material buffers to be analyzed is considered as initial stock. In this regard, batches
currently logged on to consuming machines are also considered.
For calculating the range of coverage, the criteria listed below are therefore relevant:
 The consuming OPs and their target cycle result in a demand per unit of time (e.g. component A
= 100 pcs/h are consumed).
 The supplying OPs and their target cycle result in a stock per unit of time (e.g. component A =
100 pcs/h are produced).
MBL_RangeOfCoverage.docx Version: 1.0.1115 Page 1 of 7

MBL Range of Coverage Analysis
Connections
Preceding
level V1 Parallel production level P1
Preceding
level V2 Current production level
Preceding
Parallel production level P2
level V3
Configuration Data Model
maschinen
mde_fertstufen mde_fertstufe_zord
mat_puffer
mde_fertstufe_lbez
Selection
 Production level
The range of coverage computation is requested for a production level considered as consuming
in this context. With regard to the analysis, all production levels assigned to this level as
preceding levels are then considered. If these, in turn, are supply levels to other levels, these
other, retrieving production levels are also included for the purpose of a holistic analysis.
 Incl. materials which are (currently) only supplied/produced
This option allows for extending the analysis to also include materials which are currently only
supplied and/or only produced.
Display
The range of coverage is displayed in hours as well as a trend (arrows/signs/symbols). The display is
updated automatically and/or cyclically every 180 seconds.
MBL_RangeOfCoverage.docx Version: 1.0.1115 Page 2 of 7

|     |     |     |     | MBL Range of Coverage Analysis  |     |
| --- | --- | --- | --- | ------------------------------- | --- |

The range of coverage analysis grid shows the data listed below:
| Designation  |     | Description, source  |     |     |     |
| ------------ | --- | -------------------- | --- | --- | --- |
| Material     |     |                      |     |     |     |
Material    In producing operations, the material corresponds to the
materials in the component list
  In supplying operations, the material corresponds to the
article ID
Designation  Material designation from batch stock for selected material
numbers
| Stock  |     | Quantity:   |     |     |     |
| ------ | --- | ----------- | --- | --- | --- |
  Batches to be selected from batch stock with relevant
material number
  Selected batches are always in the free/running status (in
buffer/posted on operation). Processed or locked batches
are not used.
  If the remaining quantity is < 0, these batches are not
considered.
| Unit               |     | Unit from batch stock for selected quantity  |     |     |     |
| ------------------ | --- | -------------------------------------------- | --- | --- | --- |
| Range of coverage  |     |                                              |     |     |     |
Range of coverage  Range of coverage in hours (decimal); default: not visible
Previous range of coverage  Range of coverage in hours (decimal); default: not visible
Trend  In addition, the trend of the range of coverage (change in
comparison to previous state) is indicated in front of each bar
|                      |     | by an appropriate symbol.              |      |     |     |
| -------------------- | --- | -------------------------------------- | ---- | --- | --- |
|                      |     | - increasing                           |     |     |     |
|                      |     | - decreasing                           |     |     |     |
|                      |     | - unchanged                            |     |     |     |
| 1                    |     | Hour; bar chart                        |      |     |     |
|  :                   |     | Hour; bar chart                        |      |     |     |
| 16                   |     | Hour; bar chart                        |      |     |     |
| 17                   |     | Hour, bar chart; default: not visible  |      |     |     |
|  :                   |     | Hour, bar chart; default: not visible  |      |     |     |
| 24                   |     | Hour, bar chart; default: not visible  |      |     |     |
| Retrieving machines  |     |                                        |      |     |     |
Total  Machines within the supply relationships of the current
production level and with currently running operations using
this material.
In production  Machines within the supply relationships of the current
production level and with currently running operations using
this material and operating in the Production status.
| Supplying machines  |     |     |     |     |     |
| ------------------- | --- | --- | --- | --- | --- |
Total  Machines of other supply relationships with currently running
operations using this material.
In production  Machines within the supply relationships of the current
production level and with currently running operations
producing this material.

| MBL_RangeOfCoverage.docx  |     |     | Version: 1.0.1115  |     | Page 3 of 7  |
| ------------------------- | --- | --- | ------------------ | --- | ------------ |

|     |     |     | MBL Range of Coverage Analysis  |     |
| --- | --- | --- | ------------------------------- | --- |

Data Acquisition
Data are acquired for a production level considered as consuming in this context. With regard to the
analysis, all production levels assigned to this level as preceding levels are then considered. If these, in
turn, are supply levels to other levels, these (other levels) are also included for the purpose of a holistic
analysis.
Parameter Entry
| FSTUFE       | :  selected production level  |     |     |     |
| ------------ | ----------------------------- | --- | --- | --- |
PROD=J      :  incl. materials (currently) only supplied/produced
       no range of coverage is calculated for these (range of coverage = 0)
Value Return
| Column       |     | Comment/Layout                       |     |     |
| ------------ | --- | ------------------------------------ | --- | --- |
| ARTIKEL      |     | Material                             |     |     |
| BEZ          |     | Material designation                 |     |     |
| BESTAND      |     | Calculated material stock            |     |     |
| EINHEIT      |     | Quantity unit of material            |     |     |
| REICHW       |     | Range of coverage: calculated value  |     |     |
| ANZ_ENT_MNR  |     | Number of retrieving machines        |     |     |
ANZ_ENT_MNR_PROD  Number of retrieving machines in production
ANT_ENT_MNR_ANDERE  Number of retrieving machines from other production levels
| ANZ_PROD_MNR  |     | Number of producing machines  |     |     |
| ------------- | --- | ----------------------------- | --- | --- |
ANZ_PROD_MNR_PROD  Number of producing machines in production
MIN_REICHW  Minimum range of coverage of material; always 0!

The following criteria are relevant for the range of coverage:
  The consuming OPs (current production level and production levels running in parallel, if any)
and their cycle result in a demand per unit of time (e.g. component A = 100 pcs/h are consumed).
  The supplying OPs (preceding production levels) and their cycle result in a stock per unit of time
(e.g. component A = 100 pcs/h are produced).
The initial stock is the current material stock from assigned material buffers of preceding levels. In this
regard, batches currently logged on to consuming machines must also be considered.
Procedure
Identification of all machines to be considered
Recommendation: Enter the machines in a temporary table.
  Machines of the current production level

| MBL_RangeOfCoverage.docx  |     | Version: 1.0.1115  |     | Page 4 of 7  |
| ------------------------- | --- | ------------------ | --- | ------------ |

|     |     |     |     | MBL Range of Coverage Analysis  |     |
| --- | --- | --- | --- | ------------------------------- | --- |

  Machines of production levels preceding the current production level (preceding levels)

  Machines of other production levels following the preceding levels (quasi existing in parallel 'P' to
the current production level)
Identification of materials used on machines of the current level
(For these, the range of coverage has to be determined, i.e. how long will the current stock last.)
For  each  currently  running  operation  (AUFTRAG_STATUS.PROD_KENN  =  'L')  and  its  consuming
material components (MLST_HY.KENNZ 'M', T') in production on machines of the current production
level, the required quantity per hour is calculated.
The basis for this is the target cycle entered for the operation (= speed at which the article is produced;
AUFTRAGS_BESTAND.SOLL_DAUER/SOLL_TEIL) as well as the input quantity of the supplied material
components (MLST_HY.SOLL_MENGE).
|                                        |     | ab.soll_dauer | / ab.soll_teil |       |     |
| -------------------------------------- | --- | ------------- | -------------- | ----- | --- |
| Time required for producing 1 piece =  |     |               |                |  [s]  |     |
1000
|     |     |     | ab.soll_dauer | / ab.soll_teil |         |
| --- | --- | --- | -------------- | --------------- | ------- |
|     |     |     |               |                 |        |
|     |     |     |               | 1000            |   s  |
Time required for a material to be used = Timeperpcs =   
|     |     |     | mlst_hy.soll_menge |     | UOM |
| --- | --- | --- | ------------------ | --- | ----- |
3600[s]
| Required quantity per hour for a material to be used =  |     |     |     |     |     |
| ------------------------------------------------------- | --- | --- | --- | --- | --- |
 s 
TimePerItem
 
UOM
Since an article may be processed at different target cycle times in different orders/operations, the
individual values are determined as an added up total.
When calculating the range of coverage, the OPs logged on to machines of levels running in parallel (P1,
P2) must also be considered. For this reason, the "Required quantity per hour for a material to be used"
must be identified for each of them, too.
Identification of initial stocks
The initial stock is the current material stock (LOS_BESTAND.RESTMENGE) from assigned material
buffers of preceding levels. The batches with "L" and "F" status (LOS_BESTAND.STATUS) whose
residual quantity is > 0 are considered.

| MBL_RangeOfCoverage.docx  |     | Version: 1.0.1115  |     |     | Page 5 of 7  |
| ------------------------- | --- | ------------------ | --- | --- | ------------ |

|     |     |     |     |     | MBL Range of Coverage Analysis  |     |     |
| --- | --- | --- | --- | --- | ------------------------------- | --- | --- |

Identification of materials produced on machines of preceding levels
For  materials  produced  in  the  preceding  level,  the  speed  at  which  the  current  operations
(AUFTRAG_STATUS.PROD_KENN  =  'L')  produce  the  materials  on  machines  of  preceding  levels
(AUFTRAGS_BESTAND.ARTIKEL) is calculated.
|                                                     |     |     | ab.soll | _dauer | / ab.soll _teil |     |     |
| --------------------------------------------------- | --- | --- | ------- | ------ | --------------- | --- | --- |
| Time required for producing 1 piece = Timeperpcs =  |     |     |         |        |  [s]            |     |     |
1000
3600[s]
| Quantity produced per hour =  |     |     |     |     |     |     |     |
| ----------------------------- | --- | --- | --- | --- | --- | --- | --- |
s
|     |     |     |   |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- |
TimePerItem
|     |     |     |   |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- |
UOM
Calculation of range of coverage
The range of coverage of each material [in hours] is determined from the ratio of the values described
above:
| Range  |     | of  | coverage  |     | [h]  |     | =   |
| ------ | --- | --- | --------- | --- | ---- | --- | --- |
LOS _BESTAND.RESTMENGE
| 3600.0            |     | 3600.0           |                   | 3600.0 |        |     |     |
| ----------------- | --- | ---------------- | ----------------- | ------ | ------ | --- | --- |
|                   |     |                 |                  |        |  .... |     |     |
| TimePerItem(ANR1) |     | TimPerItem(ANR2) | TimePerItem(ANRn) |        |        |     |     |

| + producing OPs   (range of coverage increases)                 |     |     |     |     |     |     |     |
| --------------------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- |
| - consuming OPs of current level (range of coverage decreases)  |     |     |     |     |     |     |     |
- consuming OPs of level(s) running in parallel (range of coverage decreases even more)
If the option "Incl. materials which are (currently) only supplied/produced" is set, not only the machines
used in the current production level but also the materials only produced in the preceding level, are
identified. For these, however, only the stock, but not the range of coverage will be calculated.
Number of retrieving machines
Number of retrieving machines (i.e. of the production level to be considered) currently using this article
(based on component list of active order).
Number of retrieving machines (i.e. of the production level to be considered) currently in PRODUCTION
(STOER_TABELLE.PROD_KENN = 'P'') and using this article (based on component list of active order).
Number of retrieving machines from other production levels
Number of retrieving machines in production levels which, in relation to preceding levels, are downstream
and which currently use the articles (based on component list of active order) also used on machines of
the current production level.
Number of supplying machines
Number of supplying machines (i.e. of the preceding levels) currently producing these articles.

| MBL_RangeOfCoverage.docx  |     |     | Version: 1.0.1115  |     |     | Page 6 of 7  |     |
| ------------------------- | --- | --- | ------------------ | --- | --- | ------------ | --- |

|     |     |     | MBL Range of Coverage Analysis  |     |
| --- | --- | --- | ------------------------------- | --- |

Number of supplying machines (i.e. of the preceding levels) currently producing these articles and in
PRODUCTION.

| MBL_RangeOfCoverage.docx  |     | Version: 1.0.1115  |     | Page 7 of 7  |
| ------------------------- | --- | ------------------ | --- | ------------ |