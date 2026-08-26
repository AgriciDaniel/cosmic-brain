Connection of HYDRA Time Management to SAP R/3 HR
1 Connection of HYDRA Time Management to SAP R/3 HR
1.1 Summary
This document describes the data exchange on the logical level between HYDRA Personnel Time
Management and SAP-HR.
The connection of the HYDRA Personnel Time Management module (PZW) to SAP-HR is considered an
“intelligent subsystem”. In this context, evaluated results are forwarded to SAP and integrated in SAP
payroll accounting.
Communication is performed using SAP-I-Docs. Consequently, “ALE customizing” is required for the
implementation of interfaces to establish the data connection between SAP and HYDRA.
1.2 Download of the HR master
HR master data can either be transferred using the SAP standard interface as a part of HR-PDC or by the
HYDRA standard interface.
The HR-PDC interface provides the advantage that it requires only little customizing and, as a result, is
immediately available. However, it does not include all HR master data that are required for a reasonable
operation of HYDRA. Consequently, manual rework is required in most cases.
The HYDRA interface provides access to all fields of the HR master. However, a customer-specific
function module is required in SAP, which is able to deal with the interface format that is specific to
HYDRA.
The HR master interface by HR-PDC is described in the document entitled “HYDRA Interfacing module to
SAP HR using HR-PDC” (SAP-HRPDC_30.pdf).
The standard HR master interface of HYDRA is described in the document entitled “Interface Wage and
Salary Programs“ (EIS-LUG_81.pdf).
1.3 Download of account balances
As time management is performed in HYDRA if SAP-HRZW is in use, HYDRA is also the guiding system
with respect to time and leave accounts. An interface is not planned for this reason.
MBL_Interface_PersonnelTimeManagement_SAP_HR.docx Version: 1.0.18468 Page 1 of 7

|     |     |   Connection of HYDRA Time Management to SAP R/3 HR  |     |
| --- | --- | ---------------------------------------------------- | --- |

1.4  Upload of results
1.4.1  Determination and customizing of the source system
SOURCE_SYS
The target SAP system is included as SOURCE_SYS in the transferred data of many upload interfaces.
The SAP source system of the person is transferred and stored in the 16th individually configurable
information field of the HYDRA HR master, once HR masters have been loaded in the SAP format using
HR-PDC in HYDRA. No further configuration will be necessary.
If the HR master is maintained in another manner the entry will not be available and the source system for
the upload can be determined using the HYDRA ALE configuration. For this purpose, the source system
of an active logical SAP system is read, which can be set by an INI configuration in HYDRA.
The source system is determined based on the following rule and priority. The other rules will not apply,
provided that a source system could be determined using the listed rules in the below-mentioned order.
1.    Entry in the information field 16 of the HR master
If an entry is included in this field it will be interpreted as source system for the upload.
2.    Using the logical system from the INI configuration for the personnel number
A logical SAP system is specified for the personnel number using the INI configuration:
|   Name of the INI file  | “HR-LOGSYS“                                 |     |     |
| ----------------------- | ------------------------------------------- | --- | --- |
|   Section               |   required logical system                   |     |     |
|   Key                   |   “PNR“                                     |     |     |
|   Value                 |   Personnel number of the requested person  |     |     |
The active source system of the logical system is determined.
3.    Using the logical system from the INI configuration for the company
A logical SAP system is indicated for the company from the HR master using the INI configuration:
|   Name of the INI file  | “HR-LOGSYS“                 |     |     |
| ----------------------- | --------------------------- | --- | --- |
|   Section               |   required logical system   |     |     |
|   Key                   |   “FIR“                     |     |     |
|   Value                 |   Company                   |     |     |
The active source system of the logical system is determined.

MBL_Interface_PersonnelTimeManagement_SAP_HR.docx Version: 1.0.18468  Page 2 of 7

    Connection of HYDRA Time Management to SAP R/3 HR

4.    Using the logical system from the INI configuration, default entry
An entry to generally specify a logical SAP system can be made using the INI configuration:
|   Name of the INI file  |     | “HR-LOGSYS“               |
| ----------------------- | --- | ------------------------- |
|   Section               |     | required logical system   |
|   Key                   |     | “ALL“                     |
|   Value                 |     | “Y“                       |
The active source system of the logical system is determined.
5.    Default determination
The active source system of the logical system “SAP” is determined.
The field remains empty if no source system could be determined by means of the listed rules.
| 1.4.2  | Data upload by ALE (customizing)  |     |
| ------ | --------------------------------- | --- |
SAP does not support upload requests for the message types of the interfacing module SAP-HRZW.
To transfer the data provided in HYDRA outbound transaction to an SAP system, it is the easiest way to
configure the upload in HYDRA and to run it cyclically.
The cyclic upload is configured in the HYDRA MLE distribution model and the HYDRA-Scheduler and is
normally carried out by MPDV staff:
A new entry is to be created in the Scheduler indicating the following details:
| Type:          |     | I - Interval        |
| -------------- | --- | ------------------- |
| Type:          |     | C – customer entry  |
| Product key:   |     | SAP-HRZW            |
| Active         |     |                     |
| License key:   |     |                     |
| HYDRA user:    |     |                     |
Command (Windows)  :  sh.exe ./hysapupl.scr /UPLSEGNAM=<Segment name>
          (Unix)  :  sh ./hysapupl.scr /UPLSEGNAM=<Segment name>
             e.g.  :  sh.exe ./hysapupl.scr /UPLSEGNAM=E2BP7012_2001
| Interval:  |     | 00:30   Hours:Minutes  |
| ---------- | --- | ---------------------- |
| From:      |     |   00:00 a.m./p.m.      |
| Until:     |     |   00:00 a.m./p.m.      |
This exemplary entry makes sure that the segments of the specified type provided in open outbound
transactions are physically transferred to the SAP system specified in the MLE distribution model every
30 minutes.

MBL_Interface_PersonnelTimeManagement_SAP_HR.docx Version: 1.0.18468  Page 3 of 7

    Connection of HYDRA Time Management to SAP R/3 HR

| 1.4.3  Upload of wage types  |     |     |     |     |
| ---------------------------- | --- | --- | --- | --- |
Wage types are transferred to SAP-HR using the info type 2010.
| 1.4.3.1  | Trigger the upload  |     |     |     |
| -------- | ------------------- | --- | --- | --- |
The HYDRA function interface to payroll accounting triggers the upload of the SAP-I-Doc. The wage
types accumulated for the settlement period are transferred to SAP-HR, once data have been requested
by clicking the button with the green arrow. The data are also displayed on the screen.
It is not planned to cancel data that have already been transferred beforehand by this interface.
If the upload is triggered once more data will again be transferred to SAP. The concerned data

have to be cancelled manually in SAP if data are required to be transferred once more.
| 1.4.3.2  | Data record structured of the wage type interface  |     |     |     |
| -------- | -------------------------------------------------- | --- | --- | --- |
The SAP Bapi “external wage types in info type 2010” is used.
| Message type:  |     | REM_SPEC_WITH_COST    |     |     |
| -------------- | --- | --------------------- | --- | --- |
| IDoc type:     |     | REM_SPEC_WITH_COST01  |     |     |
| Segments:      |     | E2BP7012_2001         |     |     |

| Field name  | Type  L  D   | Pos Description                 |      | Used in HYDRA  |
| ----------- | ------------ | ------------------------------- | ---- | -------------- |
| EXTSYSTEM   | CHAR 10   1  | Logical system of the original  | Yes  |                |
document
EXTAPPLICATION   CHAR  5    11  External application  “ZHYD“ please see the below notes
EXTDOCUMENTNO   CHAR 20   16  Document number   Unique ID of the posting, time stamp + data
record number
| REVERSED   | CHAR 1    36  | ID: Data record has been  | Empty  |     |
| ---------- | ------------- | ------------------------- | ------ | --- |
cancelled
| CUSTOMER_FIELD   | CHAR 40   37  | Individual customer field  | Empty  |     |
| ---------------- | ------------- | -------------------------- | ------ | --- |
EMPLOYEENUMBER  NUMC 8    77  Personnel number  Personnel number
VALIDITYDATE   DATS     85  Validity date  Posting date (last day of the month; restricted to
the date of leaving the company)
| LOCKINDICATOR   | CHAR 1    93  | Blocking flag for HR master  | Empty  |     |
| --------------- | ------------- | ---------------------------- | ------ | --- |
record
WAGETYPE   CHAR 4    94  Wage type  Wage type according to HYDRA
| NO_OF_HOURS   | DEC  7  2  98  | Number of hours for payment  | Empty  |     |
| ------------- | -------------- | ---------------------------- | ------ | --- |
documents
NUMBER   DEC  7  2  107  Number for each time unit for  Duration (monthly total)
payment documents
| TIME_UNIT   | CHAR 3    116  | Unit of time/measure  | 001 (hours)  |     |
| ----------- | -------------- | --------------------- | ------------ | --- |
010 (days) are transferred for wage types with
average type “T“.
| TIME_UNIT_ISO   | CHAR 3    119  | ISO code unit of measure   | Empty  |     |
| --------------- | -------------- | -------------------------- | ------ | --- |

MBL_Interface_PersonnelTimeManagement_SAP_HR.docx Version: 1.0.18468  Page 4 of 7

    Connection of HYDRA Time Management to SAP R/3 HR

| Field name        | Type  L  D      | Pos Description                 |        | Used in HYDRA  |
| ----------------- | --------------- | ------------------------------- | ------ | -------------- |
| AMOUNT            | DEC  23 4  122  | Amount                          | Empty  |                |
| OT_COMP_TYPE      | CHAR 1    147   | Compensation type of overtime   | Empty  |                |
| WORKTAXAREA       | CHAR 4    148   | Tax area: workplace             | Empty  |                |
| PAYSCALEGROUP     | CHAR 8    152   | Wage group                      | Empty  |                |
| PAYSCALELEVEL     | CHAR 2    160   | Pay level                       | Empty  |                |
| BONUSTYPE         | CHAR 2    162   | Bonus number                    | Empty  |                |
| BONUSVALUE        | NUMC 4    164   | Bonus ID                        | Empty  |                |
| POSITION          | NUMC 8    168   | Planned position                | Empty  |                |
| VALUATION_BASIS   | DEC  23 4  176  | Valuation basis                 | Empty  |                |
| CURRENCY          | CUKY     201    | Currency key                    | Empty  |                |
| CURRENCY_ISO      | CHAR 3    206   | ISO code currency               | Empty  |                |
| EXTRA_PAY_INDIC   | CHAR 1    209   | Extra pay indicator             | Empty  |                |
| COMP_CODE         | CHAR 4    210   | Company code                    | Empty  |                |
| BUS_AREA          | CHAR 4    214   | Business area                   | Empty  |                |
COSTCENTER   CHAR 10   218  Cost center  Cost center from wage type posting
| ACTTYPE       | CHAR 6    228  | Activity type               | Empty  |     |
| ------------- | -------------- | --------------------------- | ------ | --- |
| ORDERID       | CHAR 12   234  | Order number                | Empty  |     |
| COST_OBJ      | CHAR 12   246  | Cost carrier                | Empty  |     |
| WBS_ELEMENT   | CHAR 24   258  | Planned element of project  | Empty  |     |
structure (PSP element)
| NETWORK   | CHAR 12   282  | Network plan number for  | Empty  |     |
| --------- | -------------- | ------------------------ | ------ | --- |
accounting
| ACTIVITY                  | CHAR 4    294  | Operation number            | Empty  |     |
| ------------------------- | -------------- | --------------------------- | ------ | --- |
| SALES_ORD                 | CHAR 10   298  | Sales order number          | Empty  |     |
| S_ORD_ITEM                | NUMC 6    308  | Item number in sales order  | Empty  |     |
| CO_BUSPROC                | CHAR 12   314  | Business process            | Empty  |     |
| SERVICE_TYPE              | CHAR 2    326  | Service type (PSG)          | Empty  |     |
| SERVICE_CATEGORY C HAR 2  |   328          | Sub-service type (PSG)      | Empty  |     |

Please note for the field EXTAPPLICATION:
The external application “ZHYD“ has to be created in the SAP system:
Transaction SPRO  Personnel Time Management  Integrate Time Management with other
applications  Define external application for the integration with Personnel Time Management.

It is a transportable customizing that is created in the development system and has to be
transported.
The end of the month is transferred as the validity date (VALIDITYDATE) for the upload. The date of
leaving is used for employees who left the company during the month.
Data  are  compressed  by month,  wage  type  and  cost  center  for  each  person.  The  cost  center  is
transferred with every data record, even if does not differ from the master cost center.

MBL_Interface_PersonnelTimeManagement_SAP_HR.docx Version: 1.0.18468  Page 5 of 7

Connection of HYDRA Time Management to SAP R/3 HR
1.4.4 Upload of absences
The transfer of absences to SAP-HR is not enabled automatically, but has to be set while customizing the
interface.
Which absences are to be uploaded can be configured in Master data  Labor time  Control of
absences (transaction code ABSE) by the button “Upload to payroll accounting”. The absence reason can
be defined for SAP in the below field “absence reason”, provided that this reason deviates from the
number of the corresponding absence payment.
1.4.4.1 Trigger the upload
The HYDRA function interface to payroll accounting triggers the upload of the SAP-I-Doc along with the
upload of wage types. Absence times are written into the HYDRA outbound transactions, once data have
been requested using the button with the green arrow.
It is not planned to cancel data that have already been transferred beforehand by this interface.
If the upload is triggered once more data will again be transferred to SAP. The concerned data
have to be cancelled manually beforehand in SAP if this repeated transfer of data is required.
Data can be displayed within the open data segments of MLE outbound transactions as long as they have
not yet been transferred to SAP. Then they can directly be displayed within the outbound transactions.
1.4.4.2 Data record structure of absence interface
Absences are transferred to SAP-HR using the info type 2001.
Message type: ATT_ABS
IDoc type: ATT_ABS01
Segments: E2BP7011_1000
Field name Type L D Pos Description Used in HYDRA
EXTSYSTEM CHAR 10 1 Logical system of the original document Yes
EXTAPPLICATION CHAR 5 11 External application Fixed "ZHYD" Please see the below
note
EXTDOCUMENTNO CHAR 20 16 Document number Internal key
REVERSED CHAR 1 36 Flag: data record has been cancelled This interface does not provide for
cancellation records
CUSTOMER_FIELD CHAR 40 37 Individual customer field Empty
EMPLOYEENUMBER NUMC 8 77 Personnel number Personnel number
FROM_DATE DATS 8 85 Beginning of validity Start date of the absence, restricted
to the beginning of the month
TO_DATE DATS 8 93 End of validity End date of the absence, restricted
to the date of leaving the company
or the end of the month
LOCKINDICATOR CHAR 1 1 Blocking flag Remains empty
MBL_Interface_PersonnelTimeManagement_SAP_HR.docx Version: 1.0.18468 Page 6 of 7

Connection of HYDRA Time Management to SAP R/3 HR
Field name Type L D Pos Description Used in HYDRA
ABS_ATT_TYPE CHAR 4 102 Start of presence or absence Number of the absence payment in
HYDRA or the absence reason
configured in “absence processing”
START_TIME CHAR 6 106 Start time Empty
END_TIME CHAR 6 112 End time Empty
ABS_ATT_HOURS DEC 7 2 118 Hours of attendance/absences For half days of absence: net hours
according to absence clocking
(breaks are deducted)
otherwise: 0,0
ALL_DAY_FLAG CHAR 1 127 Data record applies for the whole day Remains empty
PREVIOUS_DAY CHAR 1 128 Previous day flag Remains empty
OT_COMP_TYPE CHAR 1 129 Compensation type of overtime Remains empty
WORKTAXAREA CHAR 4 130 Tax area: workplace Remains empty
PAYSCALEGROUP CHAR 8 134 Wage group Remains empty
PAYSCALELEVEL CHAR 2 142 Pay level Remains empty
BONUSTYPE CHAR 2 144 Bonus number Remains empty
BONUSVALUE NUMC 4 146 Bonus ID 0
POSITION NUMC 8 150 Planned position 0
VALUATION_BASIS DEC 23 4 158 Valuation basis 0,0 (without algebraic sign)
CURRENCY CUKY 5 183 Currency key Remains empty
CURRENCY_ISO CHAR 3 188 ISO code currency Remains empty
EXTRA_PAY_INDIC CHAR 1 191 Extra pay indicator Remains empty
Please note for the field EXTAPPLICATION:
The external application “ZHYD“ has to be created in the SAP system:
Transaction SPRO  Personnel Time Management  Integrate Time Management with other
applications  Define external application for the integration with Personnel Time Management.
It is a transportable customizing that is created in the development system and has to be
transported.
The interface includes the compensated (past) and not the planned (future) absences. When it comes to
full-time absences, the periods are transferred coherently as one data record including weekends and
other days off and not as individual, subsequent absences. Absences are uploaded for each settlement
period. Two separated absences are transferred if an absence period extends over two months (or
several absences if several months are affected).
The dates for the beginning and end of the validity are identical for part-time absences. The actual
absence determined in HYDRA is entered in the field ABS_ATT_HOURS (hours of presence/absence).
The fields START_TIME (start time) und END_TIME (end time) remain empty. Up to two part-time
absences are processed by the interface per day.
MBL_Interface_PersonnelTimeManagement_SAP_HR.docx Version: 1.0.18468 Page 7 of 7