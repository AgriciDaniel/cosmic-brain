Configuration QM/CAQ Status
1 Configuration QM/CAQ Status
Processing
Details to process or create status as well as the handling of system options can be taken from the man-
ual "MOC_status.pdf" and "QMStatus".
Configuration_QM_Status.docx Version: 1.1.14609 Page 1 of 29

Configuration QM/CAQ Status
Configuration_QM_Status.docx Version: 1.1.14609 Page 2 of 29

Configuration QM/CAQ Status
2 Description and Configuration of Statuses
Status type: BEWERTART Evaluation Type
Default entries:
Status System sta- Status Long description of Inacti- Addition
tus Short name status ve
DEP 0 Abt.bewert. Evaluation of depart- 0
ment
LFB 0 Lief.bewert. Supplier evaluation 0
Description:
Categorization can be done using the assignment of an evaluation type in the evaluation
management (supplier evaluation).
Editable/extensible:
Yes / Yes
Subject to area
No
Additional parameters:
None
Status type: BEWSTATUS – Evaluation type
Default entries:
Status System Status Long description of status Inactive Addition
status Short name
ABGESCHL (completed) 0 compl. Completed 0 [ABG],[AUSW]
BEARB 0 in proc. in process 0 [INIT:EINGABE_TEIL],[OFFEN]
BEWERTBAR 0 assessable assessable 0 [INIT:EINGABE_ALLE],[OFFEN]
BEWERTET 0 evaluated evaluated 0 [AUSW],[INIT:BEWERTET]
ERZEUGT 0 generated generated 0 [INIT],[INIT:EINGABE_KEINS],[OFFEN]
Description:
Possible status of the supplier evaluation.
Configuration_QM_Status.docx Version: 1.1.14609 Page 3 of 29

Configuration QM/CAQ Status
Editable/extensible:
Yes / Yes
Subject to area
No
Additional parameters:
The assigned additional parameter in the standard for this status is currently not considered
functionally.
[ABG]
Indicates evaluations which have been completed.
[INIT:BEWERTET]
Identifies the status that is assigned when an outstanding supplier evaluation has been eval-
uated.
Status type: CPLFREIGABE – List item of released control plans
Default entries:
Status System status Status Long description of status Inactive Addition
Short name
1 1 Manufacturer/ site Manufacturer/ site 0
2 1 customer customer 0
3 1 Customer development Customer development 0
4 1 Customer quality Customer quality 0
5 1 other other 0
Description:
These statuses make up the list of releases in the production control plan.
Editable/extensible:
Yes / Yes
Subject to area
No
Configuration_QM_Status.docx Version: 1.1.14609 Page 4 of 29

  Configuration QM/CAQ Status

Additional parameters:
none
Status type: EGWEINS – Action probability for unilateral distribution
Default entries:
Status  System status  Status   Long description of status  Inactive  Addition
Short name
| 1  1     | 84.1345% (1 Sigma)   | 84.1345% (1 Sigma)   | 0     |
| -------- | -------------------- | -------------------- | ----- |
| 1.28  1  | 90% (1.28 Sigma)     | 90% (1.28 Sigma)     | 0     |
| 1.64  1  | 95% (1.64 Sigma)     | 95% (1.64 Sigma)     | 0     |
| 1.96  1  | 97.5% (1.96 Sigma)   | 97.5% (1.96 Sigma)   | 0     |
| 2  1     | 97.725% (2 Sigma)    | 97.725% (2 Sigma)    | 0     |
| 2.33  1  | 99% (2.33 Sigma)     | 99% (2.33 Sigma)     | 0     |
| 2.58  1  | 99.5% (2.58 Sigma)   | 99.5% (2.58 Sigma)   | 0     |
| 3  1     | 99.865% (3 Sigma)    | 99.865% (3 Sigma)    | 0     |
| 3.09  1  | 99.9% (3.09 Sigma)   | 99.9% (3.09 Sigma)   | 0     |
| 3.72  1  | 99.99% (3.72 Sigma)  | 99.99% (3.72 Sigma)  | 0     |
| 4  1     | 99.9968% (4 Sigma)   | 99.9968% (4 Sigma)   | 0     |
Description:
Selection options and/or calculation values for Sigma to compute unilateral limit values (warn-
ing and action limits).
No status must be added.  It is only allowed to deactivate in order to reduce the selection list.

Editable/extensible:
No / No
Subject to area
No
Additional parameters:
none

Configuration_QM_Status.docx  Version: 1.1.14609  Page 5 of 29

  Configuration QM/CAQ Status

Status type: EGWZWEI – Action probability for bilateral distribution
Default entries:
Status  System status  Status   Long description of status  Inactive  Addition
Short name
| 1  1     | 68.27% (±1 Sigma)     | 68.27% (±1 Sigma)     | 0     |
| -------- | --------------------- | --------------------- | ----- |
| 1.28  1  | 80% (±1.28 Sigma)     | 80% (±1.28 Sigma)     | 0     |
| 1.64  1  | 90% (±1.64 Sigma)     | 90% (±1.64 Sigma)     | 0     |
| 1.96  1  | 95% (±1.96 Sigma)     | 95% (±1.96 Sigma)     | 0     |
| 2  1     | 95.45% (±2 Sigma)     | 95.45% (±2 Sigma)     | 0     |
| 2.28  1  | 97.5% (±2,28 Sigma)   | 97.5% (±2,28 Sigma)   | 0     |
| 2.33  1  | 98% (±2.33 Sigma)     | 98% (±2.33 Sigma)     | 0     |
| 2.58  1  | 99% (±2.58 Sigma)     | 99% (±2.58 Sigma)     | 0     |
| 3  1     | 99.73% (±3 Sigma)     | 99.73% (±3 Sigma)     | 0     |
| 3.09  1  | 99.8% (±3.09 Sigma)   | 99.8% (±3.09 Sigma)   | 0     |
| 3.45  1  | 99.95% (±3.45 Sigma)  | 99.95% (±3.45 Sigma)  | 0     |
| 3.72  1  | 99.98% (±3.72 Sigma)  | 99.98% (±3.72 Sigma)  | 0     |
| 3.9  1   | 99.99% (±3.9 Sigma)   | 99.99% (±3.9 Sigma)   | 0     |
| 4  1     | 99.9937% (±4 Sigma)   | 99.9937% (±4 Sigma)   | 0     |
Description:
Selection options and/or calculation values for Sigma to compute bilateral limit values (warn-
ing and action limits). It is not allowed to add further entries during customizing.
No status must be added.  It is only allowed to deactivate in order to reduce the selection list.

Editable/extensible:
No / No
Subject to area
No
Additional parameters:
none

Configuration_QM_Status.docx  Version: 1.1.14609  Page 6 of 29

  Configuration QM/CAQ Status

Status type: EGWZWEI_RS – Action probability for bilateral distribution (r
and s chart)
Default entries:
Status  System status  Status   Long description of status  Inactive  Addition
Short name
| 0.9  1    | 90%    | 90%    | 0   |     |
| --------- | ------ | ------ | --- | --- |
| 0.95  1   | 95%    | 95%    | 0   |     |
| 0.975  1  | 97.5%  | 97.5%  | 0   |     |
| 0.99  1   | 99%    | 99%    | 0   |     |
| 0.995  1  | 99.5%  | 99.5%  | 0   |     |
Description:
Selection options and/or calculation values for Sigma to compute bilateral limit values (warn-
ing and action limits) for the r and s chart. ). It is not allowed to add further entries during cus-
tomizing.
No status must be added.  It is only allowed to deactivate in order to reduce the selection list.

Editable/extensible:
No / No
Subject to area
No
Additional parameters:
none
Status type: EMUMMTYP_VDA24 – Initial sampling assignment of charac-
teristics VDA volume 2, 4th edition
Default entries:
| Status  | System  | Status      | Long description of  | In-  Addition  |
| ------- | ------- | ----------- | -------------------- | -------------- |
|         | status  | Short name  | status               | ac-            |
tive
| MASS      | 1   | Measure   | Size check     | 0     |
| --------- | --- | --------- | -------------- | ----- |
| FUNKTION  | 1   | Function  | Function test  | 0     |

Configuration_QM_Status.docx  Version: 1.1.14609  Page 7 of 29

  Configuration QM/CAQ Status

WERKSTOFF
|          | 1  Material   | Material testing  | 0     |
| -------- | ------------- | ----------------- | ----- |
| HAPTIK   | 1  Haptics    | Haptic test       | 0     |
| AKUSTIK  | 1  Acoustics  | Acoustics test    | 0     |
GERUCH
|              | 1  Odor     | Odor test     | 0     |
| ------------ | ----------- | ------------- | ----- |
| AUSSEHEN     | 1           | Visual test   | 0     |
| OBERFLAECHE  | 1  Surface  | Surface test  | 0     |
| EMV          |             | EMV test      |       |
(electromagnetic
|               | 1  EMV          | compatibility)    | 0     |
| ------------- | --------------- | ----------------- | ----- |
| ZUVERLAESSIG  | 1  Reliability  | Reliability test  | 0     |
Description:
Depending on the status of the EMUFORM status type, possible assignments are made in
the EMUMMTYP_VDA24 status type. The selection made can be printed on the form.
Editable/extensible:
No / No
Subject to area
No
Additional parameters:
None
Status type: ERFASSART – Input types
Default entries:
Status
| Status  | Short name  | Long description of status  | Addition              |
| ------- | ----------- | --------------------------- | --------------------- |
|         | Eva.        |                             | [DYNDLG:Q_MW_B_EST],  |
Single unit  Single unit evaluation  [BAPI:CPAUMW],[M_MAX:1]
BEWERT_ESTCK
Eva.
Single unit  Evaluation of a single unit   [DYNDLG:Q_MW_B_EST],
BEWERT_ESTCK_  Insp. pt.  of an inspection point  [BAPI:CPAUMW],[M_MAX_NUM:1]
Eva.
Single unit   Evaluation of single unit of a  [DYNDLG:Q_MW_B_EST],
| BEWERT_ESTCK_STICHPR  | sample   | sample                       | BAPI:CPAUMW]                   |
| --------------------- | -------- | ---------------------------- | ------------------------------ |
|                       | Eva.     | Evaluation of a characteris- | [DYNDLG:Q_MW_B_MER],           |
| BEWERT_MERK           | Charac.  | tic                          | [BAPI:CPAUSP],[M_MAX:1]        |
|                       | Eva.     |                              | [INIT_A],[DYNDLG:Q_MW_B_STP],  |
BEWERT_STICHPR  sample  Evaluation of a  sample  [BAPI:CPAUSP]
|                        | Eva.    | Evaluation of a sample  |       |
| ---------------------- | ------- | ----------------------- | ----- |
| BEWERT_STICHPR_SIMPLE  | sample  | (once).                 | [RK]  |
Eva. FSK (in-
spection chart)  Evaluation of a sample (in- [BAPI:CPAUMW],[BEURTBASIS:S
BEWERT_STICHPR_FSK  sample  spection chart)   P],[FEHLERERF:FU,FO]

Configuration_QM_Status.docx  Version: 1.1.14609  Page 8 of 29

  Configuration QM/CAQ Status

Eva.
sample Insp.  Evaluation of an inspection  [DYNDLG:Q_MW_B_MER],
BEWERT_STICHPR_PPUNKT  pt.  point in a sample  [BAPI:CPAUSP],[M_MAX_NUM:1]
Eva. FSK (in- Evaluation of sample be- [BAPI:CPAUMW],[M_MAX_NUM:1],
BEWERT_STICHPR_PPUNKT spection chart)  longing to an inspection  [BEURTBASIS:SP],[FEHLERERF:F
| _FSK  | insp.pt.   | point (inspection chart)  | U,FO]                       |
| ----- | ---------- | ------------------------- | --------------------------- |
|       | Eva.       | Evaluation of sample be-  | [DYNDLG:Q_MW_B_MER],[BAPI:C |
sample Insp.  longing to an inspection  PAUMW],[M_MAX_NUM:1],[BEURT
BEWERT_STICHPR_PPUNKT
|     | pt.  | point (once).   | BASIS:SP],[RK]  |
| --- | ---- | --------------- | --------------- |
_SIMPLE
[DYNDLG:Q_MW_C_EST],
Sing. unit code  Code for single unit  [BAPI:CPAUMW],[M_MAX:1]
CODE_ESTCK
Sing. unit code  Code of single units of an  [DYNDLG:Q_MW_C_EST],
CODE_ESTCK_PPUNKT  Insp. pt.  inspection point  [BAPI:CPAUMW],[M_MAX_NUM:1]
Sing. unit code  8.3.11  Code of single unit  [INIT_V],[DYNDLG:Q_MW_C_EST],
| CODE_ESTCK_STICHPR  | sample  | of a sample  | [BAPI:CPAUMW]  |
| ------------------- | ------- | ------------ | -------------- |
[DYNDLG:Q_MW_C_MER],
CODE_MERK  Code charac.  Code for characteristic  [BAPI:CPAUSP],[M_MAX:1]
|               | Code    |                  | [DYNDLG:Q_MW_C_STP],  |
| ------------- | ------- | ---------------- | --------------------- |
| CODE_STICHPR  | sampl.  | Code for sample  | [BAPI:CPAUSP]         |
Code
sampl. Insp.  Sample code of an inspec- [DYNDLG:Q_MW_C_MER],
CODE_STICHPR_PPUNKT  pt.  tion point  [BAPI:CPAUSP],[M_MAX_NUM:1]
[DYNDLG:Q_MW_M_EST],
Meas. val.   Measured value for single  [BAPI:CPAUMW],[M_MAX:1],
|     | Single unit  | unit  | [HIST]  |
| --- | ------------ | ----- | ------- |
MESSW_ESTCK
|     | Meas. val.   |     | [DYNDLG:Q_MW_M_EST],  |
| --- | ------------ | --- | --------------------- |
Single unit  Measured value of single  [BAPI:CPAUMW],[M_MAX_NUM:1],
 MESSW_ESTCK_PPUNKT  Insp. pt.  units of an inspection point  [HIST]
Meas. val.   Measured value of a single  [DYNDLG:Q_MW_M_EST],[BAPI:C
Single unit  unit belonging to an inspec- PAUMW],[M_MAX_NUM:1],[HIST],[
MESSW_ESTCK_PPUNKT_SI
| MPLE  | Insp. pt.  | tion point (once).   | RK]  |
| ----- | ---------- | -------------------- | ---- |
Measured value of single
|                      | Meas. val.    | units        |                       |
| -------------------- | ------------- | ------------ | --------------------- |
|                      | Single unit   | of a sample  | [DYNDLG:Q_MW_M_EST],  |
| MESSW_ESTCK_STICHPR  | sample        |              | [BAPI:CPAUMW],[HIST]  |
Meas. val.
|     | Single unit  | Measured value of a single  |     |
| --- | ------------ | --------------------------- | --- |
MESSW_ESTCK_STICHPR_S
|        | Insp. pt.  | unit of a sample (once).   |                            |
| ------ | ---------- | -------------------------- | -------------------------- |
| IMPLE  |            |                            | [BAPI:CPAUMW],[HIST],[RK]  |
Meas. val.   Measured value for a char- [DYNDLG:Q_MW_M_MER],
|     | Charac.  | acteristic  | [BAPI:CPAUSP],[M_MAX:1]  |
| --- | -------- | ----------- | ------------------------ |
MESSW_MERK
|     | Meas. val.   |                             | [DYNDLG:Q_MW_M_STP],  |
| --- | ------------ | --------------------------- | --------------------- |
|     | sample       | Measured value of a sample  | [BAPI:CPAUSP]         |
MESSW_STICHPR
|     | Meas. val.    |                             | [DYNDLG:Q_MW_M_MER],  |
| --- | ------------- | --------------------------- | --------------------- |
|     | sample Insp.  | Measured value of a sample  | [BAPI:CPAUSP],        |
|     | pt.           | of an inspection point      | [M_MAX_NUM:1]         |
MESSW_STICHPR_PPUNKT
Tak. samples  Taking samples within an  [BAPI:CPANUMP],[CONST_CAPTU
PROBENZUG_PPUNKT_SIM
|     | Insp. pt.  | inspection point (once).   | RE_STATE:NECESSARY]  |
| --- | ---------- | -------------------------- | -------------------- |
PLE
PROBENZUG_PPUNKT_ERW Ext. sampling  Taking samples with an  [BAPI:CPAUMW],[M_MAX_NUM:1],
EITERT  Insp. pt.  inspection point (extended)  [BEURTBASIS:SP],[PRBZUG]
Description:
Status to define and structure the dialogs in the terminal.

Configuration_QM_Status.docx  Version: 1.1.14609  Page 9 of 29

  Configuration QM/CAQ Status

Only a limited amount of statuses are available which is dependent on the CAQ version.

Editable/extensible:
Yes / No
Subject to area
No
Additional parameters:
| [DYNDLG:Q_MW_B_EST]   |     | Dialog to evaluate single unit  |
| --------------------- | --- | ------------------------------- |
[DYNDLG:Q_MW_B_MER]   Dialog to evaluate a single unit of an inspection point
[DYNDLG:Q_MW_B_STP]   Dialog to evaluate single unit of a sample
[DYNDLG:Q_MW_C_EST]   Dialog to enter the code of the single unit
[DYNDLG:Q_MW_C_MER] [DYNDLG:Q_MW_C_MER]  Dialog to enter the code of the
inspection point
[DYNDLG:Q_MW_C_STP]   Dialog to enter the code for the sample
[DYNDLG:Q_MW_M_EST]   Dialog to enter measured values for the single unit
[DYNDLG:Q_MW_M_MER]   Dialog to enter measured values for the inspection point
[DYNDLG:Q_MW_C_STP]   Dialog to enter measured values for random sample
| [BAPI:CPAUMW]  |     |   BAPI for single units                   |
| -------------- | --- | ----------------------------------------- |
| [BAPI:CPAUSP]  |     |   BAPI for samples and inspection points  |
| [M_MAX:1]      |     |                                           |
| [M_MAX_NUM:1]  |     |                                           |
| [INIT_A]       |     |                                           |
| [HIST]         |     |                                           |

Configuration_QM_Status.docx  Version: 1.1.14609  Page 10 of 29

  Configuration QM/CAQ Status

[RK]  from CAQ 8.2 deleting this parameter deactivates the
display of the control charts in the collection dialog for all
collection types.
-  BEWERT_STICHPR_SIMPLE
-  BEWERT_STICHPR_PPUNKT_SIMPLE
-  MESSW_ESTCK_PPUNKT_SIMPLE
-  MESSW_ESTCK_STICHPR_SIMPLE
Using CAQ 8.1 version activates/deactivates the behav-
ior customer specifically.

Status type: FEHLER_KLASSE – Defect classes
Default entries:
Status  System sta- Status   Long description of status  Inacti- Addition
| tus    | Short name  |                  | ve                   |
| ------ | ----------- | ---------------- | -------------------- |
|    0   |             |                  | 0  [INIT],[IFCRCK:]  |
| 01  0  | Critical    | Critical defect  | 0  [IFCRCK:01]       |
02  0  Major def. A  Major defect A  0  [IFCRCK:02],[INIT_V]
| 03  0  | Major def. B  | Major defect B            | 0  [IFCRCK:03]  |
| ------ | ------------- | ------------------------- | --------------- |
| 04  0  | Min. def. A   | Minor defect A            | 0  [IFCRCK:04]  |
| 05  0  | Min. def. B   | Minor defect B            | 0  [IFCRCK:05]  |
|        | QM def.       | Defined in the QM system  |                 |
| A1  0  | prov.         | proven                    | 0  [IFCRCK:A1]  |
|        | not def.      | not defined               |                 |
| A2  0  | proven        | proven                    | 0  [IFCRCK:A2]  |
|        | def. main.    | Defined, mainly           |                 |
| A3  0  | proven        | proven                    | 0  [IFCRCK:A3]  |
not defined, mainly
|        | not def., main.  | proven      |                 |
| ------ | ---------------- | ----------- | --------------- |
| A4  0  | proven           |             | 0  [IFCRCK:A4]  |
| A5  0  | not prov.        | not proven  | 0  [IFCRCK:A5]  |
Description:
The status defines the possible QMS defect class and can only be used for QMS.  By default,
all defect classes available in SAP are included.
Editable/extensible:
Yes / Yes
Subject to area
No

Configuration_QM_Status.docx  Version: 1.1.14609  Page 11 of 29

Configuration QM/CAQ Status
Additional parameters:
[IFCRCK:<Status>]
controls which data value is returned to SAP via the QM-IDI interface for the respective defect
class.
[INIT_V] Statuses with this parameter are suggested in certain QMS input dialogs when
defects occur in variable characteristics.
[INIT]
If the parameter is used for other applications, then it needs to be checked how it is used in
the system and its functionality.
Status type: FHLBEW_EINHEIT – Units of defect evaluation
Default entries:
Status System status Status Long description of status Inactive Addition
Short name
0 0 [INIT]
EUR 0 Euro Euro 0
MIN 0 Min. Minutes 0
Description:
This status enables a QMS environment to evaluate the defect.
This status is only available for QMS defect collection.
When using HYDRA QMS, these status entries must possibly be adapted to the units available
in SAP to evaluate defects.
The upload interface for QM IDI defects only provides space for three characters. Therefore,
only the first three characters of the corresponding status ID are used for reporting/confirmation
via QM IDI.
Editable/extensible:
Yes / Yes
Subject to area
No
Configuration_QM_Status.docx Version: 1.1.14609 Page 12 of 29

  Configuration QM/CAQ Status

Additional parameters:
The parameter assigned to this status in the standard is currently not considered functionally.

Status type: INTERVAL – Intervals
Default entries:
Status  System sta- Status   Long descripti- Inacti- Addition
| tus     | Short name  | on of status  | ve           |
| ------- | ----------- | ------------- | ------------ |
| JAH  1  | Year(s)     | Year(s)       | 0  31557600  |
| MIN  1  | Minute(s)   | Minute(s)     | 0  60        |
| MON  1  | Month(s)    | Month(s)      | 0  2629800   |
| SEK  1  | Second(s)   | Second(s)     | 0  1         |
| STD  1  | Hour(s)     | Hour(s)       | 0  3600      |
| TAG  1  | Day(s)      | Day(s)        | 0  86400     |
Description:
Defines the interval units based on which calculations are made in HYDRA. This status list is
available for characteristics to specify inspection intervals.
No status of this type must be added manually.

It is only allowed to deactivate in order to reduce the selection list.  But it must be safeguarded
in this case that the deactivated status is not used anywhere else.

Editable/extensible:
No / No
Subject to area
No
Additional parameters:
This additional parameter defines the factor to multiply the interval in order to convert into
seconds.

Configuration_QM_Status.docx  Version: 1.1.14609  Page 13 of 29

Configuration QM/CAQ Status
Additional parameter to assign to the status must not be changed.
Status type: MASSNTYP – Measure types
Default entries:
Status System status Status Long description of status Inactive Addition
Short name
KEINE 0 no assignm. no assignment 0 [INIT],[RECTYPE:REK]
KURZF 0 Short-term Short-term 0 [RECTYPE:REK]
LANGF 0 Long-term Long-term 0 [RECTYPE:REK]
MITTELF 0 Medium-term Medium-term 0 [RECTYPE:REK]
Description:
This status defines possible measure types.
Editable/extensible:
Yes / Yes
Subject to area
No
Additional parameters:
The assigned additional parameter in the standard for this status is currently not considered
functionally.
Status type: MASSTATUS – Measure status
Default entries:
Status Sys- Status Long description of Inacti- Addition
tem Short status ve
status name
[BEARB],[BGC:65535],[FGC:0],
BEARB 0 in process in process 0 [NUMWERT:50],[OUTLSTAT:1,4,3]
ERLEDIGT 0 completed completed 0 [FERTIG],[INIT:FERTIG],[BGC:652
Configuration_QM_Status.docx Version: 1.1.14609 Page 14 of 29

Configuration QM/CAQ Status
(done) 80],
[FGC:0],[NUMWERT:100],[OUTLS
TAT:2]
[INIT],[OFFEN],[BGC:255],
[FGC:0],[NUMWERT:0],[OUTLSTA
To do 0 open open 0 T:0]
sighted/re [OFFEN],[BGC:255],[FGC:0],
SICHT (view) 0 ad sighted/read 0 [NUMWERT:0],[OUTLSTAT:0]
Description:
Status entries for the possible statuses of a measure.
Editable/extensible:
Yes / Yes
Subject to area
No
Additional parameters:
The following additional parameter are supported functionally from CAQ 8.1.
 [NUMWERT:50]
 [NUMWERT:0]
 [NUMWERT:100]
These parameter control the quantifier in the supplier evaluation.
All other assigned additional parameter in the standard are currently not supported functionally.
Status type: MT_NORM – Standards for measuring tolerances
Default entries:
Status System Status Long description of status Inactive Addition
Status Short name
DIN EN 12420
EN 12420 1 EN 12420 (drop forgings 1 [ID]
Configuration_QM_Status.docx Version: 1.1.14609 Page 15 of 29

Configuration QM/CAQ Status
of material group 1; cat. A and B)
ISO 2768 1 ISO 2768 General tolerances according to DIN ISO 2768 0
ISO 7168 0 ISO 7168 Shape and position tolerance ISO 7168 0
ISO_PASS 0 ISO fit ISO fit measures 0 [ID]
Description:
This status defines the standards available for the calculation of characteristic tolerances.
This status must only be edited or extended for configuration from CAQ 8.2.
Editable/extensible:
Yes / Yes
Subject to area
No
Additional parameters:
[ID] Identifier indicating that for an unambiguous selection of an entry from the caq_passung
table, the field passung_id is additionally required.
If this additional parameter is not set, it is sufficient to select the standard.
Some standards use texts to describe the fit ID (burr, misalignment, etc, e.g. with EN12420).
These are not translated in multi-lingual installations.
Status type : PANVERWENT -
Inspection requirement usage decision
Default entries:
Status System Status Long description of status In- Addition
status Short name active
BEDFREIGABE (conditional release) 0 cond. rel. conditional release 0 [DYN:NIO],[BEWPENT:80]
FREIGABE (release) 0 Release Release 0 [INIT:IO],[INIT:SKL],[DYN:IO],[BEWPENT:100]
NACHARBEIT (rework) 0 Rew. Rework 0 [DYN:NIO],[BEWPENT:40]
RUECKWEISEN (reject) 0 Rej. Reject 0 [INIT:NIO],[DYN:NIO],[BEWPENT:0]
SORTIEREN (sort) 0 Sort Sort 0 [DYN:NIO],[BEWPENT:40]
Configuration_QM_Status.docx Version: 1.1.14609 Page 16 of 29

Configuration QM/CAQ Status
Description:
These statuses define the usage decisions available when inspection requirements are com-
pleted.
Editable/extensible:
Yes / Yes
Subject to area
No
Additional parameters:
[DYN:IO] Inspection requirements with this status are considered as a "Pass".
[DYN:NIO] Inspection requirements with this status are considered as a "Fail".
[INIT:IO] If all inspection steps (PAUERG) = Pass
[INIT:SKL] If all inspection steps are (PAUSTATUS) = SKL
[INIT:NIO] If at least one inspection step (PAUERG) = Fail
[BEWPENT:xyz] Weighting of the usage decision in the supplier evaluation module
Status type: PRFERG_STPR – Inspection results of samples
Default entries:
Status
System sta- Short na- Long description of sta- Inacti-
Status tus me tus ve Addition
BEDINGT_IO 1 cond. pass conditionally pass 0 [IO],[DYN:NIO]
IO 1 pass pass 0 [IO],[DYN:IO]
NIO 1 fail fail 0 [NIO],[DYN:NIO]
UNGEPR (unche- [INIT],[IO],[DYN:I
cked) 1 unch. unchecked 0 O]
Configuration_QM_Status.docx Version: 1.1.14609 Page 17 of 29

Configuration QM/CAQ Status
Description:
Defines the statuses of samples
Editable/extensible:
No / No
Subject to area
No
Additional parameters:
[IO]
Samplings with this status are considered a "Pass".
[NIO][IO]
Samplings with this status are considered a "Fail".
[INIT] Initial default assignment when generating a sample
[DYN:IO]
Within the dynamic modification the sampling is considered a "Pass"
[DYN:NIO]
[DYN:IO]
Within the dynamic modification the sampling is considered a "Fail" .
Within the available configuration options only the assignments of parameter „[DYN:IO]“ and
„[DYN:NIO]“ can be changed.
Status type: QMS_ART – QMS - Type of inspection requirements
Default entries:
Sta- System Status Inac- Addi-
tus status Short name Long description of status tive tion
01 0 Receiving insp. Goods receipt inspection for order process 0
Configuration_QM_Status.docx Version: 1.1.14609 Page 18 of 29

  Configuration QM/CAQ Status

Best.
Goods receipt
|          | samp. inspec. f.   | Goods receipt sample inspection for order pro- |       |
| -------- | ------------------ | ---------------------------------------------- | ----- |
| 0101  0  | ord. Best (order)  | cess                                           | 0     |
Receiving insp.
|          | Fremdb. (external  | Goods received inspection from external pro- |            |
| -------- | ------------------ | -------------------------------------------- | ---------- |
| 0130  0  | contracting)       | cessing                                      | 0          |
| 02  0    | Goods issue        | Goods issue WAP                              | 0          |
| 03  0    | Done!              | Production order FEP                         | 0  [INIT]  |
04  0  Goods receipt FA  Goods receipt from production order  0
Gen. goods re-
| 05  0    | ceipt              | General goods receipt                           | 0     |
| -------- | ------------------ | ----------------------------------------------- | ----- |
| 06  0    | Return             | Returns from customer                           | 0     |
| 07  0    | Audit              | Audit                                           | 0     |
| 08  0    | Stock transfer     | Stock transfer                                  | 0     |
|          | Insp. batch if QM  | Inspection batch with Q-stocks when activating  |       |
| 0800  0  | active             | QM.                                             | 0     |
Del. with cust.
| 10  0  | ord.                | Delivery to customer with customer order      | 0     |
| ------ | ------------------- | --------------------------------------------- | ----- |
|        | Del. without cust.  | Delivery to the customer without customer or- |       |
| 11  0  | ord.                | der                                           | 0     |
| 12  0  | Gen. del.           | General delivery                              | 0     |
| 89  0  | All                 | All                                           | 0     |

Description:
The status is only used with HYDRA QMS (subsystem SAP QM).

Editable/extensible:
Yes / Yes
Subject to area
No
Additional parameters:
The assigned additional parameter in the standard for this status is currently not considered
functionally.

Configuration_QM_Status.docx  Version: 1.1.14609  Page 19 of 29

  Configuration QM/CAQ Status

Status type: QMS_HERKUNFT – QMS - origin of the inspection requirement
Default entries:
| System sta- | Status   |     | Inacti- |
| ----------- | -------- | --- | ------- |
Status  tus  Short name  Long description of status  ve  Addition
| 01  0  | Receiving insp.  | Goods receipt inspection  | 0          |
| ------ | ---------------- | ------------------------- | ---------- |
| 02  0  | Goods issue      | Goods issue WAP           | 0          |
| 03  0  | Done!            | Production order FEP      | 0  [INIT]  |
04  0  Goods receipt FA  Goods receipt from production order  0
Gen. goods re-
| 05  0  | ceipt          | General goods receipt  | 0     |
| ------ | -------------- | ---------------------- | ----- |
| 06  0  | Return         | Returns from customer  | 0     |
| 07  0  | Audit          | Audit                  | 0     |
| 08  0  | Stock transf.  | Stock transfer         | 0     |
Del. with cust.
| 10  0  | ord.                | Delivery to customer with customer order   | 0     |
| ------ | ------------------- | ------------------------------------------ | ----- |
|        | Del. without cust.  | Delivery to the customer without customer  |       |
| 11  0  | ord.                | order                                      | 0     |
| 12  0  | Gen. del.           | General delivery                           | 0     |
| 89  0  | All                 | All                                        | 0     |
Description:
The status is only used with HYDRA QMS (subsystem SAP QM).

Editable/extensible:
Yes / Yes
Subject to area
No
Additional parameters:
The assigned additional parameter in the standard for this status is currently not considered
functionally.

Configuration_QM_Status.docx  Version: 1.1.14609  Page 20 of 29

  Configuration QM/CAQ Status

Status type: REKART – Complaint types
Default entries:
In-
|         | System  Status      |     | Long description of  | acti-         |     |
| ------- | ------------------- | --- | -------------------- | ------------- | --- |
| Status  | status  Short name  |     | status               | ve  Addition  |     |
[AW:('ABTEILUNG','PERSO
| INTERN  | 0  internal  |     | Internal complaint  | 0  N')]  |     |
| ------- | ------------ | --- | ------------------- | -------- | --- |
CUSTOMER  0  Cutomer compl.  Customer complaint  0  [AW:KUNDE],[INIT]
LIEFERANT
(supplier)  0  Supplier compl.  Supplier complaint  0  [AW:LIEFERANT]
Description:
Defines the type of complaint. Complaint types as well as additional parameters can be ex-
tended and/or modified as part of customizing the system.
Editable/extensible:
Yes / Yes
Subject to area
Yes
Additional parameters:
The assigned additional parameter in the standard for this status is currently not considered
functionally.

Status type: REKBEFUND – Complaint results
Default entries:
Status  System sta- Status   Long description of sta- Inacti- Additi-
|                       |     | tus  | Short name  | tus        | ve  on  |
| --------------------- | --- | ---- | ----------- | ---------- | ------- |
| GERECHTF (justified)  |     | 0    | justif.     | justified  | 0       |
TEILWGER (partly justified)  0  Partly justif.  Partly justified  0
| UNBESTIMMT (undeter- |     | 0   | indeter-   | indetermined  | 0  [INIT]  |
| -------------------- | --- | --- | ---------- | ------------- | ---------- |
| mined)               |     |     | mined      |               |            |
| UNGERECHTF           |     | 0   | unjustif.  | unjustified   | 0  [IGN]   |

Configuration_QM_Status.docx  Version: 1.1.14609  Page 21 of 29

Configuration QM/CAQ Status
Description:
Defines possible results in the complaint header.
Editable/extensible:
Yes / Yes
Subject to area
Yes
Additional parameters:
[INIT] Initial default assignment when creating a complaint
[IGN]
Complaints containing this status are not considered in the supplier evaluation.
The additional parameter „[INIT]" assigned to this status in the standard is currently not consid-
ered functionally.
Status type: REKDETBEFUND – Results of complaint details
Default entries:
Status System Status Long description of Inacti- Additi-
status Short name status ve on
GARANTIE 0 Warranty Warranty 0
GERECHTF (justified) 0 justif. justified 0
KULANZ 0 Fair deal- Fair dealing/goodwill 0
ing/goodwill
TEILWGER (partly justified) 0 Partly justif. Partly justified 0
UNBESTIMMT (undeter- 0 indetermined indetermined 0 [INIT]
mined)
UNGERECHTF 0 unjustif. unjustified 0 [IGN]
Description:
Defines the possible results of complaint details
Configuration_QM_Status.docx Version: 1.1.14609 Page 22 of 29

|     |     |     |     |     | Configuration QM/CAQ Status  |
| --- | --- | --- | --- | --- | ---------------------------- |

Editable/extensible:
Yes / Yes
Subject to area
Yes
Additional parameters:
[INIT]
Initial default assignment when creating a complaint details
[IGN]
Complaints containing this status are not considered in the supplier evaluation.
The additional parameter „[INIT]" assigned to this status in the standard is currently not consid-
ered functionally.

Status type: REKDETSTATUS – Status of complaint details
Default entries:
Status  Sys- Status   Long description of status  In-  Addition
|     | tem  Short  |     |     |     | ac-   |
| --- | ----------- | --- | --- | --- | ----- |
|     | sta- name   |     |     |     | tive  |
tus
| ABGESCHL     | 0  compl.  |   Completed  |     |     | 0  [ABG],[BGC:65280],[ |
| ------------ | ---------- | ------------ | --- | --- | ---------------------- |
| (completed)  |            |              |     |     | FGC:0],                |
[NUMWERT:100]
| BEARBEIT  | 0  in pro- | in process  |     |     | 0  [OFFEN],[BGC:65535 |
| --------- | ---------- | ----------- | --- | --- | --------------------- |
|           | cess       |             |     |     | ],[FGC:0],            |
[NUMWERT:50]
| ERFASST  | 0  collec- | collected  |     |     | 0  [INIT],[OFFEN],[BGC: |
| -------- | ---------- | ---------- | --- | --- | ----------------------- |
|          | ted        |            |     |     | 255],[FGC:0],           |
[NUMWERT:0]
Description:
Defines the possible statuses of a complaint detail
Editable/extensible:
Yes / Yes

Configuration_QM_Status.docx  Version: 1.1.14609  Page 23 of 29

  Configuration QM/CAQ Status

Subject to area
Yes
Additional parameters:
|     | [INIT]  |     |     |     |     |     |
| --- | ------- | --- | --- | --- | --- | --- |
Initial default assignment when creating a complaint detail

|     | [ABG]  |     |     |     |     |     |
| --- | ------ | --- | --- | --- | --- | --- |
Identifies the statuses for which the complaint detail is considered being "completed".
|     | [ABG]  |     |     |     |     |     |
| --- | ------ | --- | --- | --- | --- | --- |
Identifies the statuses where the complaint detail is considered being "completed".
|     | [BGC:xyz]  |     |     |     |     |     |
| --- | ---------- | --- | --- | --- | --- | --- |
Background color
[FGC:xyz]
Forground color
[NUMWERT:xyz]
Evaluation number for the supplier evaluation.
Only the additional parameter „[NUMWERT:xyz]“is functionally considered in the standard.

Status type: REKDOKZUORD – Assignment of documents for complaints
Default entries:
Status  System  Status   Long description of  Inacti- Additi-
|     |     |     | status  | Short  | status  | ve  on  |
| --- | --- | --- | ------- | ------ | ------- | ------- |
name
| BEMERKUNG (comment)  |     |     | 0   | Comm.  | Comment  | 0     |
| -------------------- | --- | --- | --- | ------ | -------- | ----- |
ERFOLGSKONTR (performance
| review)                  |     |     | 0   | Perf. rev.  | Performance review  | 0     |
| ------------------------ | --- | --- | --- | ----------- | ------------------- | ----- |
| KEINE                    |     |     | 0   | none        | no assignment       | 0     |
| VORHERSAGE (prediction)  |     |     | 0   | Predict.    | Prediction          | 0     |

Configuration_QM_Status.docx  Version: 1.1.14609  Page 24 of 29

|     |     |     |     | Configuration QM/CAQ Status  |     |
| --- | --- | --- | --- | ---------------------------- | --- |

Description:
Defines the possible assignments of documents when assigning documents in the failure tree
analysis. They are also printed with the relevant reports.
Editable/extensible:
Yes / Yes
Subject to area
No
Additional parameters:
none
Status type: REKSTATUS – Complaint status
Default entries:
Status  Sys- Status   Long description of status  Inac- Addition
|     | tem  Short  |     |     | tive  |     |
| --- | ----------- | --- | --- | ----- | --- |
Sta- name
tus
[ABG],[BGC:65280],[F
| ABGESCHL     |            | completed  |     |     | GC:0],         |
| ------------ | ---------- | ---------- | --- | --- | -------------- |
| (completed)  | 0  compl.  |            |     | 0   | [NUMWERT:100]  |
[OFFEN],[BGC:65535]
|           | in pro-  |             |     |     | ,[FGC:0],     |
| --------- | -------- | ----------- | --- | --- | ------------- |
| BEARBEIT  | 0  cess  | in process  |     | 0   | [NUMWERT:50]  |
[INIT],[OFFEN],[BGC:
255],[FGC:0],
collec-
| ERFASST  | 0  ted  | collected  |     | 0   | [NUMWERT:0]  |
| -------- | ------- | ---------- | --- | --- | ------------ |
Description:
Defines the possible statuses of a complaint
Editable/extensible:
Yes / Yes
Subject to area
No

Configuration_QM_Status.docx  Version: 1.1.14609  Page 25 of 29

  Configuration QM/CAQ Status

Additional parameters:
|     | [INIT]  |     |     |     |     |
| --- | ------- | --- | --- | --- | --- |
Initial default assignment when creating a complaint detail

|     | [ABG]  |     |     |     |     |
| --- | ------ | --- | --- | --- | --- |
Identifies the statuses for which the complaint detail is considered being "completed".
|     | [ABG]  |     |     |     |     |
| --- | ------ | --- | --- | --- | --- |
Identifies the statuses where the complaint detail is considered being "completed".
|     | [BGC:xyz]  |     |     |     |     |
| --- | ---------- | --- | --- | --- | --- |
Background color
[FGC:xyz]
Forground color
[NUMWERT:xyz]
Evaluation number for the supplier evaluation.
Only the additional parameter „[NUMWERT:xyz]“is functionally considered in the standard.

Status type: VERANTWTYP – Types of responsibilities
Default entries:
Status  System sta- Status   Long description of sta- Inacti- Additi-
|                         |     | tus  | Short name   | tus          | ve  on  |
| ----------------------- | --- | ---- | ------------ | ------------ | ------- |
| ABTEILUNG (department)  |     | 1    | Department   | Department   | 0       |
HERSTELLER (manufactu-
| rer)                  |     | 1   | Manufacturer  | Manufacturer      | 0     |
| --------------------- | --- | --- | ------------- | ----------------- | ----- |
| INTERN                |     | 1   | int. company  | internal company  | 0     |
| CUSTOMER              |     | 1   | customer      | customer          | 0     |
| LIEFERANT (supplier)  |     | 1   | supplier      | supplier          | 0     |
| PERSON                |     | 1   | ext. pers.    | external person   | 0     |
| PZE_PERSON            |     | 1   | Person        | Person            | 0     |
Distribution
| VERTEILER (distributor)  |     | 1   | list  | Distribution list  | 0     |
| ------------------------ | --- | --- | ----- | ------------------ | ----- |
Description:
Defines the possible types of responsible parties.

Configuration_QM_Status.docx  Version: 1.1.14609  Page 26 of 29

  Configuration QM/CAQ Status

The status „PZE_PERSON“ is synonymous to the HYDRA HR masterdata.  This status is only
effective when HR masterdata has been set up for a previous version.  In order to transfer peo-

ple from the HYDRA HR masterdata into the CAQ responsible list, the relevant person must be
set up in the HR masterdata.  It is sufficient to process and save without having to change data.
It is not permitted to create a new status of this type.

Editable/extensible:
No / No
Subject to area
No
Additional parameters:
none
Subject to area
No
Status type: VERTEILVTYP – Types of responsibilities for distribution lists
Default entries:
Status  System sta- Status   Long description of sta- Inacti- Additi-
|                         | tus  | Short name    | tus               | ve  on  |
| ----------------------- | ---- | ------------- | ----------------- | ------- |
| ABTEILUNG (department)  | 1    | Department    | Department        | 0       |
| HERSTELLER (manufactu-  | 1    | Manufactu-    | Manufacturer      | 0       |
| rer)                    |      | rer           |                   |         |
| INTERN                  | 1    | int. company  | internal company  | 0       |
| CUSTOMER                | 1    | customer      | customer          | 0       |
| LIEFERANT (supplier)    | 1    | supplier      | supplier          | 0       |
| PERSON                  | 1    | ext. pers.    | external person   | 0       |
| PZE_PERSON              | 1    | Person        | Person            | 0       |
Description:
Defines the responsible person in the distribution.
The status „PZE_PERSON“ is synonymous to the HYDRA HR masterdata.  This status is only
effective when HR masterdata has been set up for a previous version.  In order to transfer peo-

ple from the HYDRA HR masterdata into the CAQ responsible list, the relevant person must be

Configuration_QM_Status.docx  Version: 1.1.14609  Page 27 of 29

Configuration QM/CAQ Status
set up in the HR masterdata. It is sufficient to process and save without having to change data.
It is not permitted to create a new status of this type.
Editable/extensible:
No / No
Subject to area
No
Additional parameters:
none
Status type: ZERTIFDRU – Print options for certificates
Default entries:
Status System status Status Long description of status Inactive Addition
Short name
AUSW (selection) 1 Selection Show selection 0
IMMER 1 always print always 0
NIE 1 never never print 0
Description:
Defines the options for printing certificates in the configuration of characteristics:
The status selection of the characteristics configuration can be used in Reporting to se-
lect/group of inspection characteristics to be printed.
Editable/extensible:
No / No
Subject to area
No
Configuration_QM_Status.docx Version: 1.1.14609 Page 28 of 29

Configuration QM/CAQ Status
Additional parameters:
none
Configuration_QM_Status.docx Version: 1.1.14609 Page 29 of 29