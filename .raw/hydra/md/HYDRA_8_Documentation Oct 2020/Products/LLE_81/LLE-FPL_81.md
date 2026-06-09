Manual
Bonus Wages/Incentive
Wages Based on Formulas
LLE-FPL 8.1
Version 1.0.23049
Last changed on: 01.09.2020

Bonus Wages/Incentive Wages Based on Formulas
Copyright
©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.
Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.
LLE-FPL_81.docx Version: 1.0.23049 Page 2 of 62

Bonus Wages/Incentive Wages Based on Formulas
Contents
1 Formula-Based Premium/ Incentive Wage - Overview ................................ 5
2 Customizing the Premium/Incentive Wage based on Formulas .................. 7
2.1 Overview ............................................................................................................. 7
2.2 Requirements ...................................................................................................... 7
2.2.1 Customization training ............................................................................. 7
2.2.2 The HYDRA script language .................................................................... 7
2.3 General data in user exits.................................................................................... 7
2.3.1 Wage type data ....................................................................................... 7
2.3.2 HR master data ....................................................................................... 8
2.3.3 Operation data ......................................................................................... 9
2.3.4 Machine/workplace data ........................................................................ 11
2.3.5 Data of postings and bookings .............................................................. 13
2.3.6 Premium group data .............................................................................. 15
2.3.7 Time ticket data ..................................................................................... 16
2.3.8 Data of person day performances .......................................................... 17
2.4 Individual allocation ........................................................................................... 18
2.4.1 Overview ............................................................................................... 18
2.4.2 Combining PZE records ........................................................................ 19
2.4.3 Identifying the wage type ....................................................................... 22
2.4.4 Identifying the time type ......................................................................... 23
2.4.5 Recalculation of time tickets .................................................................. 24
2.4.6 Importing time tickets into person day performance ............................... 25
2.4.7 Using person day performance with time tickets .................................... 26
2.5 Group allocation ................................................................................................ 27
2.5.1 Overview ............................................................................................... 27
2.5.2 Step 1: distribution of data to premium accounts ................................... 29
2.5.3 Step 2+3: daily/monthly calculation of premium accounts ...................... 38
2.5.4 Group time tickets ................................................................................. 40
2.5.5 Assigning group results to time tickets ................................................... 40
2.5.6 Info function on the PZE terminal CT-WIN/CT-AIP ................................ 41
2.6 Calculating period results .................................................................................. 45
2.6.1 Settlement period results for persons .................................................... 45
LLE-FPL_81.docx Version: 1.0.23049 Page 3 of 62

Bonus Wages/Incentive Wages Based on Formulas
2.6.2 Settlement period results for premium groups ....................................... 46
2.7 Interface to payroll accounting ........................................................................... 47
2.7.1 Overview ............................................................................................... 47
2.7.2 Data that can be processed ................................................................... 47
2.7.3 Procedure to create interface file ........................................................... 48
2.7.4 User exits .............................................................................................. 49
2.8 User field configuration with premium accounts ................................................. 57
2.8.1 User field key ......................................................................................... 57
2.8.2 Type definitions ..................................................................................... 57
2.8.3 User fields ............................................................................................. 58
3 Changing Groups ....................................................................................... 59
LLE-FPL_81.docx Version: 1.0.23049 Page 4 of 62

Bonus Wages/Incentive Wages Based on Formulas
1 Formula-Based Premium/ Incentive Wage - Overview
Purpose
The formula-based premium/ incentive wage module provides the ability to illustrate requirements that
extend beyond the standard premium types. It can also calculate independent, customer-specific
premium types.
It provides so-called user exits to intervene in the standard calculations, from the ability to process
individual ADE postings and calculating premiums to the interface for payroll accounting.
The module also provides the greatest possible ability to intervene in wage calculation with the help of the
MPDV consultants and customer-support staff with the appropriate training.
Implementation considerations
This function package is used if the requirements for the calculation of premium/ incentive wages cannot
be fully illustrated using the configuration options for the standard calculation forms. This function
package is required in order to fully adjust the incentive wage calculation to customer needs during the
customizing process.
Integration
The function packet is a supplement to the modules Calculation of premium / incentive wages,
Calculation of group bonuses and/or Premium areas for group bonuses.
Features
An Application Service (AS) that provides the ability to individually calculate premium or incentive wages
from raw BDE posting data and preprocessed values such as wage types, durations, time types and
performance efficiency rates:
 Premium accounts for storing special calculation data are defined for personnel and premium
group-related incentive wage calculation
 Enhanced and modified incentive wage calculation for people, premium groups and premium
areas
 Additional configurable fields in premium group master data for the ability to individually control
the group incentives calculation
LLE-FPL_81.docx Version: 1.0.23049 Page 5 of 62

Bonus Wages/Incentive Wages Based on Formulas
 Powerful and easy-to-learn script language to illustrate specific formulas and conditions as well
as to adjust and expand standard calculations and to assign premium groups
 The ability to edit additional configurable fields and other relevant HR master data fields to
individually control the calculation
 The ability to edit user fields in machine/ workplace master data to control the incentive wage
calculation
 The ability to edit operation fields (including user fields) to control the incentive wage calculation
 The ability to enter premium group changes to integrate labor times from time and data
management into group incentives
 The ability for employees to enter premium group changes at the BDE terminal
 Expandable info function on the PZE terminal (depending on terminal type)
 The ability to configure the interface to the payroll system
LLE-FPL_81.docx Version: 1.0.23049 Page 6 of 62

Bonus Wages/Incentive Wages Based on Formulas
2 Customizing the Premium/Incentive Wage based on
Formulas
2.1 Overview
You can use the incentive wage based on formulas to configure premium and incentive wage systems,
which are based on the data recorded in HYDRA via the Order Data Collection ADE, the Time and
Attencance PZE and the Incentive Wage LLE.
The customization can be performed by MPDV or by the customers that attended the relevant training.
The customization is made via user exits in HYDRA script language and user field configurations.
You always make the difference between an individual wage calculation and group incentives.
2.2 Requirements
2.2.1 Customization training
To customize a formula-based premium/incentive wage, you must attend the individual customizing
training CUTI-LLE.
2.2.2 The HYDRA script language
You use the HYDRA script language to make customer-specific calculations or to assign values in user
exits. You can also change data that has already been preprocessed in HYDRA.
A separate document describes the HYDRA script language in detail. In the sections below, knowledge of
the script language is a precondition.
2.3 General data in user exits
2.3.1 Wage type data
In many user exits, master data for wage types is provided. They have the same name, but different
prefixes (displayed below with an asterisk). It is always the same data that is provided for the wage types.
The following sections therefore refer to this list:
Parameter Type Contents
Data for wage type
*LART C 4 Wage type
LLE-FPL_81.docx Version: 1.0.23049 Page 7 of 62

|     |     |     |   Bonus Wages/Incentive Wages Based on Formulas  |     |     |
| --- | --- | --- | ------------------------------------------------ | --- | --- |

| *BEZK     |     | C  6  Short name                         |     |     |     |
| --------- | --- | ---------------------------------------- | --- | --- | --- |
| *BEZL     |     | C  20  Detailed designation              |     |     |     |
| *VAB      |     | C  15  Responsibility area of wage type  |     |     |     |
| *OPT_LLE  |     | C  1  LLE indicator                      |     |     |     |
| *ZEIART   |     | C  3  New: Time type                     |     |     |     |
The following fields are in the first place relevant to the Time and Attendance, but the fields can also
be evaluated in the Incentive Wage:
| *CERTIFY   |     | C  1  Subject to approval J/N                   |              |     |     |
| ---------- | --- | ----------------------------------------------- | ------------ | --- | --- |
| *RM_LOBU   |     | C  1  J/N: Confirm wage type to payroll system  |              |     |     |
| *OPT_SZMA  |     | C  1  Empty:  not specified                     |              |     |     |
|            |     | M:                                              | overtime     |     |     |
|            |     | S:                                              | target work  |     |     |
|            |     | I:                                              | undertime    |     |     |
| *ART       |     | C  1  G:                                        | basic wage   |     |     |
|            |     | Z:                                              | bonus        |     |     |
| *PROZ      |     | N  Percentage                                   |              |     |     |
*LART_LOBU  C  4  LOBU wage type. Wage type for the upload to payroll
accounting
| *MOD_LOBU     |     | C10  LOBU indicator                          |     |     |     |
| ------------- | --- | -------------------------------------------- | --- | --- | --- |
| *VERB         |     | C  1  Processing                             |     |     |     |
| *LSS          |     | F  Hourly rate                               |     |     |     |
| *OPT_KST      |     | C  1  Selection indicator                    |     |     |     |
| *AVGART       |     | C  1  Average Type                           |     |     |     |
| *RINT         |     | N  Rounding interval in seconds              |     |     |     |
| *RG           |     | N  Rounding limit in seconds                 |     |     |     |
| *OPT_ADEABGL  |     | C  1  J/N: Use wage type for ADE comparison  |     |     |     |
*OPT_ADEDEL  C  1  J/N: Delete PZE bookings to this wage type after ADE
comparison

| 2.3.2  HR master data  |     |     |     |     |     |
| ---------------------- | --- | --- | --- | --- | --- |
The prefix of the HR master data is usually PNR_. An asterisk replaces this prefix in the table below:
| Parameter  | Type      | Contents                                 |     |     |     |
| ---------- | --------- | ---------------------------------------- | --- | --- | --- |
| *PNR       | long      | Personnel number                         |     |     |     |
| *DATB      | date      | Start of validity of the HR master data  |     |     |     |
| *DATE      | date      | End of validity of the HR master data    |     |     |     |
| *PNAME     | char(40)  | Last name                                |     |     |     |
| *PVORNAME  | char(20)  | First name                               |     |     |     |
| *NAME      | char(62)  | Last name, first name                    |     |     |     |

| LLE-FPL_81.docx  |     | Version: 1.0.23049  |     |     | Page 8 of 62  |
| ---------------- | --- | ------------------- | --- | --- | ------------- |

|     |     |   Bonus Wages/Incentive Wages Based on Formulas  |     |     |
| --- | --- | ------------------------------------------------ | --- | --- |

| *EINTRITT     | date      | Date of joining                      |     |     |
| ------------- | --------- | ------------------------------------ | --- | --- |
| *AUSTRITT     | date      | Date of leaving                      |     |     |
| *FIR          | char(4)   | Company                              |     |     |
| *BER          | char(8)   | Area                                 |     |     |
| *KST          | char(10)  | Cost center.                         |     |     |
| *PKREIS       | char(8)   | Employee subgroup                    |     |     |
| *GEBDAT       | date      | Date of birth                        |     |     |
| *PRKZ         | char(1)   | Premium indicator                    |     |     |
| *ABT          | char(8)   | Department                           |     |     |
| *GESCHLECHT   | char(1)   | Gender M/W (male/female)             |     |     |
| *INFOTEXT_01  | char(40)  | Free text field 01                   |     |     |
| …             | …         | …                                    |     |     |
| *INFOTEXT_20  | char(10)  | Free text field 20                   |     |     |
| *INFOWERT_1   | long      | Free number field 1                  |     |     |
| …             | …         | …                                    |     |     |
| *INFOWERT_5   | long      | Free number field 5                  |     |     |
| *INFODAT_1    | date      | Free date field 1                    |     |     |
| …             | …         | …                                    |     |     |
| *INFODAT_5    | date      | Free date field 5                    |     |     |
| *LEISTGRP     | char(8)   | Regular premium group of person      |     |     |
| *ANTFAKTLBON  | long      | Proport. factor for incentive bonus  |     |     |
| *BPOS         | char(10)  | Regular operator function            |     |     |
| *LPKZ         | char(10)  | Regular wage/premium indicator       |     |     |
| *LART         | char(4)   | Regular wage type                    |     |     |
| *LGRP         | char(4)   | Regular wage group                   |     |     |

| 2.3.3  Operation data  |     |     |     |     |
| ---------------------- | --- | --- | --- | --- |
The prefix for operations is usually ANR_. An asterisk replaces this prefix in the table below:
| Parameter  | Type      | Contents                     |     |     |
| ---------- | --------- | ---------------------------- | --- | --- |
| *ANR       | char(40)  | Order number from posting    |     |     |
| *AART      | char(5)   | Order type                   |     |     |
| *AARTKAT   | char(2)   | Category of order type       |     |     |
| *PRKZ      | char(1)   | Piecework indicator          |     |     |
| *LART      | char(4)   | Wage type                    |     |     |
| *TE        | double    | Single piece specification t | e   |     |

| LLE-FPL_81.docx  |     | Version: 1.0.23049  |     | Page 9 of 62  |
| ---------------- | --- | ------------------- | --- | ------------- |

    Bonus Wages/Incentive Wages Based on Formulas

*TEB  double  Single piece specification (production resource) t
eb
| *TR  | double  | Default setup time t  |     |
| ---- | ------- | --------------------- | --- |
r
*TRB  double  Default setup time (production resources) t rb
| *SZY      | double    | Target cycle  |     |
| --------- | --------- | ------------- | --- |
| *IMPFAKT  | double    | Pulse factor  |     |
| *ATK      | char(40)  | Article       |     |
*MBVERH_NOR double  M/O relation production (machine/operator relation)
M
*MBVERH_RUE  double  M/O relation setup (machine/operator rel.)
| *KDAUNR    | char(40)  | Customer order number           |     |
| ---------- | --------- | ------------------------------- | --- |
| *USERCODE  | char(8)   | User field key                  |     |
| *FU01      | date      | User field                      |     |
| ...        | ...       | ...                             |     |
| *FU06      | date      | User field                      |     |
| *FU07      | long      | User field                      |     |
| ...        | ...       | ...                             |     |
| *FU22      | long      | User field                      |     |
| *FU23      | double    | User field                      |     |
| ...        | ...       | ...                             |     |
| *FU28      | double    | User field                      |     |
| *FU29      | char(1)   | User field                      |     |
| ...        | ...       | ...                             |     |
| *FU44      | char(1)   | User field                      |     |
| *FU45      | char(10)  | User field                      |     |
| *FU46      | char(10)  | User field (former *PARAM_K1)   |     |
| *FU47      | char(10)  | User field (former *PARAM_K2)   |     |
| ...        | ...       | ...                             |     |
| *FU50      | char(10)  | User field                      |     |
| *FU51      | char(20)  | User field                      |     |
| ...        | ...       | ...                             |     |
| *FU53      | char(20)  | User field (former *BEM_1)      |     |
| *FU54      | char(20)  | User field (former *BEM_2)      |     |
| ...        | ...       | ...                             |     |
| *FU57      | char(20)  | User field (former *KDPARAM_1)  |     |
| *FU58      | char(20)  | User field (former *KDPARAM_2)  |     |
| *FU59      | char(20)  | User field (former *KDPARAM_3)  |     |
| *FU60      | char(20)  | User field (former *KDPARAM_4)  |     |

| LLE-FPL_81.docx  |     | Version: 1.0.23049  | Page 10 of 62  |
| ---------------- | --- | ------------------- | -------------- |

    Bonus Wages/Incentive Wages Based on Formulas

| *FU61                          | char(20)  | User field (former *KDPARAM_5)           |     |
| ------------------------------ | --------- | ---------------------------------------- | --- |
| ...                            | ...       | ...                                      |     |
| *FU64                          | char(20)  | User field                               |     |
| *FU65                          | char(40)  | User field                               |     |
| *FU66                          | char(40)  | User field                               |     |
| *SGR_GUTP                      | double    | Target quantity primary quantity unit    |     |
| *SGR_GUTS                      | double    | Target quantity secondary quantity unit  |     |
| *SGR_GUTT                      | double    | Target quantity tertiary quantity unit   |     |
| *SGR_GUTB                      | double    | Target quantity base quantity unit       |     |
| *SGR_AUSP                      | double    | Planned scrap primary unit               |     |
| *SGR_AUSS                      | double    | Planned scrap primary quantity unit      |     |
| *SGR_AUST                      | double    | Planned scrap primary quantity unit      |     |
| *SGR_AUSB                      | double    | Planned scrap primary quantity unit      |     |
| 2.3.4  Machine/workplace data  |           |                                          |     |
The prefix for machines/workplaces is usually MNR_. An asterisk replaces this prefix in the table below:
| Parameter  | Type      | Contents                       |     |
| ---------- | --------- | ------------------------------ | --- |
| *MNR       | char(20)  | Machine number                 |     |
| *PRKZ      | char(1)   | Premium indicator              |     |
| *MGRP      | char(20)  | Machine group                  |     |
| *ART       | char(1)   | Type (single/group workplace)  |     |
| *KST       | char(10)  | Regular cost center            |     |
| *BEZK      | char(8)   | Short name                     |     |
| *BEZL      | char(40)  | Detailed designation           |     |
| *BDEJMOD   | long      | Year model number              |     |
| *IMPFAKT   | long      | Pulse factor                   |     |
| *FIR       | char(4)   | Company                        |     |
| *LEISTUNG  | double    | Planned performance level      |     |
| *MSTDSATZ  | double    | Standard rate, machine         |     |
| *PSTDSATZ  | double    | Standard labor rate            |     |
| *TLG       | long      | Partitioning                   |     |
| *CAT       | char(10)  | Category                       |     |
| *VAB       | char(15)  | Responsibility area            |     |
| *USERCODE  | char(8)   | User field key                 |     |
| *FU01      | date      | User field                     |     |
| ...        | ...       | ...                            |     |

| LLE-FPL_81.docx  |     | Version: 1.0.23049  | Page 11 of 62  |
| ---------------- | --- | ------------------- | -------------- |

    Bonus Wages/Incentive Wages Based on Formulas

| *FU06  | date      | User field  |     |
| ------ | --------- | ----------- | --- |
| *FU07  | long      | User field  |     |
| ...    | ...       | ...         |     |
| *FU22  | long      | User field  |     |
| *FU23  | double    | User field  |     |
| ...    | ...       | ...         |     |
| *FU28  | double    | User field  |     |
| *FU29  | char(1)   | User field  |     |
| ...    | ...       | ...         |     |
| *FU44  | char(1)   | User field  |     |
| *FU45  | char(10)  | User field  |     |
| ...    | ...       | ...         |     |
| *FU50  | char(10)  | User field  |     |
| *FU51  | char(20)  | User field  |     |
| ...    | ...       | ...         |     |
| *FU64  | char(20)  | User field  |     |
| *FU65  | char(40)  | User field  |     |
| *FU66  | char(40)  | User field  |     |

| LLE-FPL_81.docx  |     | Version: 1.0.23049  | Page 12 of 62  |
| ---------------- | --- | ------------------- | -------------- |

|     |     |     |   Bonus Wages/Incentive Wages Based on Formulas  |     |
| --- | --- | --- | ------------------------------------------------ | --- |

| 2.3.5  Data of postings and bookings  |     |     |     |     |
| ------------------------------------- | --- | --- | --- | --- |
This data is usually ADE log data. The prefix for this data is usually ADEPRO_. An asterisk replaces this
prefix in the table below:
| Parameter  | Type      | Contents                       |     |     |
| ---------- | --------- | ------------------------------ | --- | --- |
| *VERWEIS   | long      | Database ID                    |     |     |
| *PNR       | long      | Personnel number               |     |     |
| *KST       | char(10)  | Cost center                    |     |     |
| *DAT       | date      | Date                           |     |     |
| *DATB      | date      | Logon date                     |     |     |
| *ZEIB      | long      | Logon time                     |     |     |
| *DATE      | date      | Logoff date                    |     |     |
| *ZEIE      | long      | Logoff time                    |     |     |
| *LEISTGRP  | char(8)   | Premium group (cid:129)        |     |     |
| *LART      | char(4)   | Wage type                      |     |     |
| *MNR       | char(20)  | Machine                        |     |     |
| *ANR       | char(40)  | Order/operation                |     |     |
| *TE        | double    | Single piece specification te  |     |     |
*TEB  double  Single piece specification (production resource) teb
| *TR        | double    | Default setup time tr                         |     |     |
| ---------- | --------- | --------------------------------------------- | --- | --- |
| *TRB       | double    | Default setup time (production resource) trb  |     |     |
| *BEARB     | char(10)  | Modified by                                   |     |     |
| *BEARBDAT  | date      | Modified on                                   |     |     |
| *BEARBZEI  | long      | Processing time                               |     |     |
| *SART      | char(10)  | Record type of posting                        |     |     |
| *BPOS      | char(10)  | Operator position/function                    |     |     |
| *LPKZ      | char(10)  | Wage/premium indicator                        |     |     |
*KARENZ  char(1)  Waiting period indicator (P=waiting period personnel, M=waiting
period machine)
| *SKNR         | long  | Shift number  |     |     |
| ------------- | ----- | ------------- | --- | --- |
| *SCHICHT_DAT  | date  | Shift date    |     |     |
*BMK01  double  Order-related resource performance account 1
| ...  | ...  | ...  |     |     |
| ---- | ---- | ---- | --- | --- |
*BMK12  double  Order-related resource performance account 12
| *DAUER  | double  | Order-related duration  |     |     |
| ------- | ------- | ----------------------- | --- | --- |
*PBMK01  double  Person-related resource performance account 1
| ...  | ...  | ...  |     |     |
| ---- | ---- | ---- | --- | --- |

| LLE-FPL_81.docx  |     | Version: 1.0.23049  |     | Page 13 of 62  |
| ---------------- | --- | ------------------- | --- | -------------- |

    Bonus Wages/Incentive Wages Based on Formulas

*PBMK12  double  Person-related resource performance account 12
| *PDAUER  | double  | Labor time  |     |
| -------- | ------- | ----------- | --- |
*RGR_BMK01  double  Order-related remaining resource performance account 1
| ...  | ...  | ...  |     |
| ---- | ---- | ---- | --- |
*RGR_BMK12  double  Order-related remaining resource performance account 12
| *RGR_DAUER  | double  | Order-related remaining duration  |     |
| ----------- | ------- | --------------------------------- | --- |
*RGR_PBMK01  double  Person-related remaining resource performance account 1
| ...  | ...  | ...  |     |
| ---- | ---- | ---- | --- |
*RGR_PBMK12  double  Person-related remaining resource performance account 12
| *RGR_PDAUER  | double   | Remaining labor time                   |     |
| ------------ | -------- | -------------------------------------- | --- |
| *GUT         | double   | Yield primary                          |     |
| *GUTP        | double   | Yield primary                          |     |
| *GUTS        | double   | Yield secondary                        |     |
| *GUTT        | double   | Yield tertiary                         |     |
| *GUTB        | double   | Yield base                             |     |
| *AUS         | double   | Scrap primary                          |     |
| *AUSP        | double   | Scrap primary                          |     |
| *AUSS        | double   | Scrap secondary                        |     |
| *AUST        | double   | Scrap tertiary                         |     |
| *AUSB        | double   | Scrap base                             |     |
| *NAC         | double   | Rework quantity primary (former *LEN)  |     |
| *NACP        | double   | Rework quantity primary (former *LEN)  |     |
| *NACS        | double   | Rework quantity secondary              |     |
| *NACT        | double   | Rework quantity tertiary               |     |
| *NACB        | double   | Rework quantity base                   |     |
| *PRB         | double   | Problem quantity primary               |     |
| *PRBP        | double   | Problem quantity primary               |     |
| *PRBS        | double   | Problem quantity secondary             |     |
| *PRBT        | double   | Problem quantity tertiary              |     |
| *PRBB        | double   | Problem quantity base                  |     |
| *EGG_GUT     | long     | Yield reason                           |     |
| *EGG_AUS     | long     | Scrap reason                           |     |
| *EGG_NAC     | long     | Rework reason                          |     |
| *EGG_PRB     | long     | Problem quantity reason                |     |
| *EGR01       | double   | Recorded activity 1 to 10              |     |
| *RGR01       | double   | Recorded remaining activity 1 to 10    |     |
| *EGE01       | char(3)  | Activity unit 1 to 10                  |     |

| LLE-FPL_81.docx  |     | Version: 1.0.23049  | Page 14 of 62  |
| ---------------- | --- | ------------------- | -------------- |

|     |     |   Bonus Wages/Incentive Wages Based on Formulas  |     |     |
| --- | --- | ------------------------------------------------ | --- | --- |

| *VERWEIS_DLG | long  | Database ID for dialog data  |     |     |
| ------------ | ----- | ---------------------------- | --- | --- |
_DATA
| *CERTIFY  | char(1)  | Approval required  |     |     |
| --------- | -------- | ------------------ | --- | --- |
| *SIGN     | char(1)  | Approved/rejected  |     |     |
*BEM  char(50)  Only with bonuses if data collection is activated (customization):
comment
| *USERCODE  | char(8)   | User field key  |     |     |
| ---------- | --------- | --------------- | --- | --- |
| *FU01      | date      | User field      |     |     |
| ...        | ...       | ...             |     |     |
| *FU06      | date      | User field      |     |     |
| *FU07      | long      | User field      |     |     |
| ...        | ...       | ...             |     |     |
| *FU22      | long      | User field      |     |     |
| *FU23      | double    | User field      |     |     |
| ...        | ...       | ...             |     |     |
| *FU28      | double    | User field      |     |     |
| *FU29      | char(1)   | User field      |     |     |
| ...        | ...       | ...             |     |     |
| *FU44      | char(1)   | User field      |     |     |
| *FU45      | char(10)  | User field      |     |     |
| ...        | ...       | ...             |     |     |
| *FU50      | char(10)  | User field      |     |     |
| *FU51      | char(20)  | User field      |     |     |
| ...        | ...       | ...             |     |     |
| *FU65      | char(40)  | User field      |     |     |
| *FU66      | char(40)  | User field      |     |     |

| 2.3.6  Premium group data  |     |     |     |     |
| -------------------------- | --- | --- | --- | --- |
Master data of the premium group usually has the prefix LEISTGRP_. An asterisk replaces this prefix in
the table below:
| Parameter  | Type   | Contents                             |     |     |
| ---------- | ------ | ------------------------------------ | --- | --- |
| *LEISTGRP  | C  8   | Premium group (cid:129)              |     |     |
| *BEZL      | C  20  | Premium group: name                  |     |     |
| *PRKZ      | C  1   | Premium group: premium indicator     |     |     |
| *LART      | C  4   | Premium group: wage type (reserved)  |     |     |
*LART_*  *  Reserved: for master data of wage type, refer to the section

| LLE-FPL_81.docx  |     | Version: 1.0.23049  |     | Page 15 of 62  |
| ---------------- | --- | ------------------- | --- | -------------- |

    Bonus Wages/Incentive Wages Based on Formulas

further ahead. (Available as of November/2005)
| *PRNR      | N    | Premium group: number of premium scheme  |     |
| ---------- | ---- | ---------------------------------------- | --- |
| *WERT_01   | F    | Premium group: default value 1           |     |
| ...        | ...  | ...                                      |     |
| *WERT_30   | F    | Premium group: default value 30          |     |
| *PRMOD_01  | C10  | Premium group: mode 1                    |     |
| ...        | ...  | ...                                      |     |
| *PRMOD_05  | C10  | Premium group: mode 5                    |     |
*VORGABE_01  F  Premium group: weekday-related default value 1 (for the
relevant weekday)
| ...          | ...  | ...  |     |
| ------------ | ---- | ---- | --- |
| *VORGABE_03  | F    | ...  |     |
| *VORGABE_04  | C10  | ...  |     |

2.3.7  Time ticket data
The person day time tickets usually have the prefix L_. An asterisk replaces this prefix in the table below:
| Parameter  | Typ Contents  |     |     |
| ---------- | ------------- | --- | --- |
e
| *PNR      | N      | Personnel number of time ticket  |     |
| --------- | ------ | -------------------------------- | --- |
| *ABREDAT  | D      | Settlement date of time ticket   |     |
| *ANR      | C  40  | Operation number of time ticket  |     |
*ZEIART  C  3  Time type of time ticket. Only change in exceptional cases.
| *LART  | C  4  | Wage type of time ticket   |     |
| ------ | ----- | -------------------------- | --- |
| *TE    | F     | Target t  of time ticket   |     |
e
| *TEB  | F   | Target t e  of time ticket for production resource  |     |
| ----- | --- | --------------------------------------------------- | --- |
| *TR   | F   | Target t of time ticket                             |     |
r
| *TRB  | F   | Target t of time ticket for production resource  |     |
| ----- | --- | ------------------------------------------------ | --- |
r
| *DAUER     | F   | Duration of time ticket                |     |
| ---------- | --- | -------------------------------------- | --- |
| *VGZ       | F   | Standard time of time ticket           |     |
| *GUT       | F   | Yield of time ticket                   |     |
| *AUS       | F   | Scrap of time ticket                   |     |
| *NACHARB   | F   | Rework quantity of time ticket         |     |
| *PROBLEM   | F   | Problem quantity of time ticket        |     |
| *MENGE     | F   | Wage-relevant quantity of time ticket  |     |
| *ZUSCHL    | F   | Bonus time of time ticket in seconds   |     |
| *ZUSCHLGR  | N   | Bonus reason                           |     |

| LLE-FPL_81.docx  |     | Version: 1.0.23049  | Page 16 of 62  |
| ---------------- | --- | ------------------- | -------------- |

    Bonus Wages/Incentive Wages Based on Formulas

| *KST      | C10   | Cost center of time ticket  |     |     |
| --------- | ----- | --------------------------- | --- | --- |
| *LOHNGRP  | C  4  | Wage group of time ticket   |     |     |
*ZEITGRAD  F  Performance efficiency rate of time ticket in percent from
standard processing. The performance efficiency rate does
not integrate bonuses and deductions. Performance efficiency
rates are only calculated for time tickets of the AKK time type
(piecework). Changes of the performance efficiency rate are
not transferred to the time ticket because this rate is always
calculated using the standard and the actual time.
*REFNR  C  20  Reference number of time ticket from standard processing.  Is
usually empty, can be shown for customer-specific information
in the time ticket log.
| *LEISTGRP  | C  8  | Premium group (cid:129) |     |     |
| ---------- | ----- | ----------------------- | --- | --- |
*PRKTO_01 … 30  F  Premium account of time ticket 1 to 30 that can be defined
*PRKZ_01 … 05  C  20  Premium account of time ticket 1 to 5 that can be defined
| *CERTIFY  | C  1  | Reserved: requires approval  |     |     |
| --------- | ----- | ---------------------------- | --- | --- |
| *SIGN     | C  1  | Reserved: approved/rejected  |     |     |
*SOLLMENGE  F  Target quantity (yield / performance efficiency rate)
| *SKNR  | N      | Shift number from ADE log record  |     |     |
| ------ | ------ | --------------------------------- | --- | --- |
| *MNR   | C  20  | Machine                           |     |     |
*BMKNR  N  Number of resource performance account for time wage from
production.
| *BEM   | C  50  | Comment                            |     |     |
| ------ | ------ | ---------------------------------- | --- | --- |
| *DATB  | D      | Start date (from original record)  |     |     |
| *ZEIB  | N      | Start time (from original record)  |     |     |
| *DATE  | D      | End date (from original record)    |     |     |
| *ZEIE  | N      | End time (from original record)    |     |     |
2.3.8  Data of person day performances
The person day performances usually have the prefix PNRTAG_. An asterisk replaces this prefix in the
table below:
| Parameter  | Typ Contents  |     |     |     |
| ---------- | ------------- | --- | --- | --- |
e
| *DAT  | D     | Date                             |     |     |
| ----- | ----- | -------------------------------- | --- | --- |
| *PNR  | N     | Personnel number of time ticket  |     |     |
| *FIR  | C  4  | Company                          |     |     |
*ADE_DATB  D  Date of earliest ADE logon of person on this day
*ADE_ZEIB  N  Time of earliest ADE logon of person on this day in seconds
*ADE_DATE  D  Date of latest ADE logoff of person on this day
*ADE_ZEIE  N  Time of latest ADE logoff of person on this day in seconds

| LLE-FPL_81.docx  |     | Version: 1.0.23049  |     | Page 17 of 62  |
| ---------------- | --- | ------------------- | --- | -------------- |

Bonus Wages/Incentive Wages Based on Formulas
*VGZ F Piecework standard time of person on this day
*DAUER F Piecework actual time of person on this day
*LEISTGRAD F Piecework efficiency performance rate of person of this day
*LEISTGRAD_MIN F Smallest efficiency performance rate of time ticket of this day
*LEISTGRAD_MAX F Greatest efficiency performance rate of time ticket of this day
*ADE_DAUER F Sum total of the ADE time posted for this person
*PZE_DAUER F PZE attendance time of person (if PZE is used)
*LLE_DAUER F Sum total of time ticket duration of the Incentive Wage
*PRKTO_01 to *PRKTO_30 F Premium accounts of day performance
*PRKZ_01 to *PRKZ_05 F Premium indicator of day performance
2.4 Individual allocation
2.4.1 Overview
The individual allocation uses all ADE and LLE data that is not recorded for a premium group. If data is
recorded with reference to a premium group, the group calculation is performed.
In general, the standard processing is performed before an individual allocation. With specific
intermediate steps and at the end of the standard calculations, the values identified can be changed
subsequently via user exit. The rules of the standard processing are described in the documents LLE-BP
und LLE-ZGG.
Each relevant data record is separately calculated. The workflow of the individual allocation of time tickets
is as follows:
1) Identifying the wage type
In standard processing, the wage type of the BDE posting is normally used. This wage type can be
changed via user exit.
2) Identifying the time type
In the standard, the time type (AKK/ZL/...) is identified using the wage type, the order data, the HYDRA
basic settings and the master data of machines and persons. The time type identified can subsequently
be changed via user exit.
3) Standard processing
of BDE posting for time ticket. A direct intervention via user exit is not possible.
LLE-FPL_81.docx Version: 1.0.23049 Page 18 of 62

    Bonus Wages/Incentive Wages Based on Formulas

| 4) Recalculation of time tickets   |     |     |     |     |
| ---------------------------------- | --- | --- | --- | --- |
The time tickets calculated by HYDRA in step 3 can be recalculated via user exit. For example, you can
specify monetary evaluations in the available premium accounts that can be defined.
5) Identifying person day performance
6) Applying person day performance on time tickets
| 2.4.2  | Combining PZE records  |     |     |     |
| ------ | ---------------------- | --- | --- | --- |
If the PZE time is used for the wage calculation and is not transferred from the daily PZE performance,
then the PZE time is the result of several single records, e.g. PZE wage type postings. By default,
HYDRA creates a PZE time ticket using each PZE original record. This can sometimes be inconvenient.
You can combine the PZE records via user exit that aggregates the data. The selected key information is
then included in one single aggregated time ticket.
The user exit is called when the premium group resulting from changes of group has been entered in the
PZE records.
The user exit always gets pairs of successive or parallel PZE records. The PZE records are processed for
each person and settlement day one after the other using the start time.
PZE records that do not follow each other in time, are not combined to be processed as one.
You use the control variables of the user exit to specify the aggregation:
| PZE1_SAVE  | PZE2_SAVE  | Action  |     |     |
| ---------- | ---------- | ------- | --- | --- |
1  1  Both PZE records are kept and updated. This is the default if no changes
are made in the user exit.
| 1   | 0   | PZE record 1 is updated, PZE record 2 is dropped  |     |     |
| --- | --- | ------------------------------------------------- | --- | --- |
| 0   | 1   | PZE record 2 is updated, PZE record 1 is dropped  |     |     |
| 0   | 0   | Both PZE records are dropped and deleted.         |     |     |

User exit "hyl_pze_compr.hsc"
Import parameters:
| Parameter  |     | Type  | Contents                                    |     |
| ---------- | --- | ----- | ------------------------------------------- | --- |
| PZE1_POS   |     | N     | Sequence number 1...n of first PZE record   |     |
| PZE2_POS   |     | N     | Sequence number 1...n of second PZE record  |     |

| LLE-FPL_81.docx  |     |     | Version: 1.0.23049  | Page 19 of 62  |
| ---------------- | --- | --- | ------------------- | -------------- |

    Bonus Wages/Incentive Wages Based on Formulas

Export parameters:
| Parameter  Type  | Contents  |     |
| ---------------- | --------- | --- |
Data of first PZE record
| PZE1_SAVE  N     | If set to 1, the first PZE record is saved.  |     |
| ---------------- | -------------------------------------------- | --- |
| PZE1_PNR  N      | Personnel number of PZE record               |     |
| PZE1_ABREDAT  D  | Settlement date of PZE record                |     |
PZE1_LART  C  4  Wage type or payment day type of PZE record
| PZE1_KST  C10        | Cost center of PZE record          |     |
| -------------------- | ---------------------------------- | --- |
| PZE1_LEISTGRP  C  8  | Premium group of PZE record        |     |
| PZE1_DATB  D         | Start date (from original record)  |     |
| PZE1_ZEIB  N         | Start time (from original record)  |     |
| PZE1_DATE  D         | End date (from original record)    |     |
| PZE1_ZEIE  N         | End time (from original record)    |     |
PZE1_DAUER  F  Duration of PZE record in hours or seconds (system setting
with LLE 7.2)
Data of second PZE record
| PZE2_SAVE  N     | If set to 1, the second PZE record is saved.  |     |
| ---------------- | --------------------------------------------- | --- |
| PZE2_PNR  N      | Personnel number of PZE record                |     |
| PZE2_ABREDAT  D  | Settlement date of PZE record                 |     |
PZE2_LART  C  4  Wage type or payment day type of PZE record
| PZE2_KST  C10        | Cost center of PZE record          |     |
| -------------------- | ---------------------------------- | --- |
| PZE2_LEISTGRP  C  8  | Premium group of PZE record        |     |
| PZE2_DATB  D         | Start date (from original record)  |     |
| PZE2_ZEIB  N         | Start time (from original record)  |     |
| PZE2_DATE  D         | End date (from original record)    |     |
| PZE2_ZEIE  N         | End time (from original record)    |     |
PZE2_DAUER  F  Duration of PZE record in hours or seconds (system setting
with LLE 7.2)

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

| LLE-FPL_81.docx  | Version: 1.0.23049  | Page 20 of 62  |
| ---------------- | ------------------- | -------------- |

Bonus Wages/Incentive Wages Based on Formulas
You use the control variables to specify the aggregation:
PZE1_SAVE PZE2_SAVE action
-------------------------------------------------------------------------------
1 1 Both PZE records are kept and updated.
1 0 PZE record 1 is updated, PZE record 2 is dropped
0 1 PZE record 2 is updated, PZE record 1 is dropped
0 0 Both PZE records are dropped and deleted.
$Revision: 1.0 $
$Date: 2006/12/14 18:03:26 $
---------------------------------------------------------------------------- */
// control information
export PZE1_SAVE long ; // If set to 1, the first PZE record is saved.
import PZE1_POS long ; // Sequence number 1...n of first PZE record
export PZE2_SAVE long ; // If set to 1, the second PZE record is saved.
import PZE2_POS long ; // Sequence number 1...n of second PZE record
// Variables of first PZE record
export PZE1_PNR long ; // Personnel number of PZE record
export PZE1_ABREDAT date ; // Settlement date of PZE record
export PZE1_LART char(4) ; // Wage type or payment day type of PZE record
export PZE1_KST char(10) ; // Cost center of PZE record
export PZE1_LEISTGRP char(8) ; // Premium group of PZE record
export PZE1_DATB date ; // Start date (from original record)
export PZE1_ZEIB long ; // Start time (from original record)
export PZE1_DATE date ; // End date (from original record)
export PZE1_ZEIE long ; // End time (from original record)
export PZE1_DAUER double ; // Duration of PZE record in hours or seconds
// (System settings with LLE 7.2)
// Variables of second PZE record
export PZE2_PNR long ; // Personnel number of PZE record
export PZE2_ABREDAT date ; // Settlement date of PZE record
export PZE2_LART char(4) ; // Wage type or payment day type of PZE record
export PZE2_KST char(10) ; // Cost center of PZE record
export PZE2_LEISTGRP char(8) ; // Premium group of PZE record
export PZE2_DATB date ; // Start date (from original record)
export PZE2_ZEIB long ; // Start time (from original record)
export PZE2_DATE date ; // End date (from original record)
export PZE2_ZEIE long ; // End time (from original record)
export PZE2_DAUER double ; // Duration of PZE record in hours or seconds
// (System settings with LLE 7.2)
//-----------------------------------------------------------------------------
long main()
{
dprint( "comparison"||(PZE1_POS using "##&")||" "||PZE1_DATB||" "||(PZE1_ZEIB using "$TIME")||
" - "||PZE1_DATE||" "||(PZE1_ZEIE using "$TIME")||", "||(PZE1_DAUER using "#&.&&")||" h" );
dprint( " with"||(PZE2_POS using "##&")||" "||PZE2_DATB||" "||(PZE2_ZEIB using "$TIME")||
" - "||PZE2_DATE||" "||(PZE2_ZEIE using "$TIME")||", "||(PZE2_DAUER using "#&.&&")||" h" );
if( ( PZE1_PNR = PZE2_PNR ) and
( PZE1_ABREDAT = PZE2_ABREDAT ) and
( PZE1_LART = PZE2_LART ) and
( PZE1_KST = PZE2_KST ) and
( PZE1_LEISTGRP = PZE2_LEISTGRP ) )
{
PZE1_SAVE = 1;
PZE2_SAVE = 0;
PZE1_DATE = PZE2_DATE;
PZE1_ZEIE = PZE2_ZEIE;
PZE1_DAUER = PZE1_DAUER + PZE2_DAUER;
dprint( " new"||(PZE1_POS using "##&")||" "||PZE1_DATB||" "||(PZE1_ZEIB using "$TIME")||
" - "||PZE1_DATE||" "||(PZE1_ZEIE using "$TIME")||", "||(PZE1_DAUER using "#&.&&")||" h" );
}
return 0;
}
//-----------------------------------------------------------------------------
LLE-FPL_81.docx Version: 1.0.23049 Page 21 of 62

    Bonus Wages/Incentive Wages Based on Formulas

2.4.3  Identifying the wage type
In standard processing, the wage type of a time ticket is transferred from the original BDE personnel
posting (B record).
This original BDE personnel posting is identified using the wage type stored for the operation. Use the
following user exit to change the wage type that is identified via standard processing.
Note that the identified wage type specifies if piecework or time wage applies. Also refer to the LLE basic
settings and explanations in the document LLE-BP and the sections below.
The user exit is only called when time tickets are created via BDE personnel postings and when
bonuses/deductions are created. With other original records, you can only change the wage type using
the user exit lsv00000.hsc.
User exit "lsl00000.hsc"
Import parameters:
| Parameter  | Type   | Contents                                        |     |     |
| ---------- | ------ | ----------------------------------------------- | --- | --- |
| ART        | C10    | Source of time ticket                           |     |     |
|            |        | PB   : time ticket from ADE personnel postings  |     |     |
|            |        | PZ  : time ticket from PZE wage type posting    |     |     |
|            |        | ZUS  : time ticket from bonus                   |     |     |
| PNR        | N      | Person: personnel number                        |     |     |
| PNR_*      | *      | Data of person (see general description above)  |     |     |
| ANR        | C  40  | Order number from personnel posting             |     |     |
| ANR_*      | *      | Operation data (see general description above)  |     |     |
ANR_LART_*  *  Master data of wage type included in operation (see general
description above)
| MNR    | C  20  | Machine number from personnel posting  |     |     |
| ------ | ------ | -------------------------------------- | --- | --- |
| MNR_*  | *      | Master data of machine                 |     |     |
(see general description above)
| ADEPRO_*  | *   | Data of posting  |     |     |
| --------- | --- | ---------------- | --- | --- |
(see general description above)
ADEPRO_LART_*  *  Master data of wage type included in posting
(see general description above)
LEISTGRP_*  *  Master data of premium group (see general description
above)
Available as of hyl_compute.exe|out 8.1.1.93 (04/2018)

Export parameters:

| LLE-FPL_81.docx  |     | Version: 1.0.23049  |     | Page 22 of 62  |
| ---------------- | --- | ------------------- | --- | -------------- |

Bonus Wages/Incentive Wages Based on Formulas
Parameter Typ Contents
e
LART C 4 Wage type of time ticket, the wage type of the personnel
posting is prepopulated (standard processing)
2.4.4 Identifying the time type
The user exit is only called when time tickets are created via BDE personnel postings and when
bonuses/deductions are created. With other original records, you can only change the time type using the
user exit lsv00000.hsc.
The time type specifies how the time ticket is calculated. Only time tickets with time type AKK (piecework)
are calculated as piecework and are assigned a performance efficiency rate by HYDRA.
The following time types are available (see also documentation LLE-BP):
Time Meaning
type
AKK Piecework
Only piecework time tickets get a performance efficiency rate
ZUS Bonuses and deductions
Time tickets of bonuses and deductions recorded
ZL Time wage
Time tickets with time wage can be generated for production orders that are not calculated
using a piecework wage type or for production orders with piecework that had malfunction
times.
EA On-the-job training
Rarely used time type. Is created if persons of the HR master data have the indicator "On-
the-job training".
GK Overheads
This time type results from the editing of overhead orders.
KAR Waiting period
Results from postings generated via the HYDRA waiting period processing.
GRP Group bonus
Results from times posted for premium groups that are also stored for the individual
allocation.
PZE Labor time from PZE
Results from times that were recorded and calculated via the HYDRA Time & Attendance
PZE.
LLE-FPL_81.docx Version: 1.0.23049 Page 23 of 62

    Bonus Wages/Incentive Wages Based on Formulas

User exit "lsz00000.hsc"
Import parameters:
| Parameter  | Type   | Contents                                        |     |     |
| ---------- | ------ | ----------------------------------------------- | --- | --- |
| ART        | C10    | Source of time ticket                           |     |     |
|            |        | PB   : time ticket from ADE personnel postings  |     |     |
|            |        | PZ  : time ticket from PZE wage type posting    |     |     |
|            |        | ZUS  : time ticket from bonus                   |     |     |
| PNR        | N      | Person: personnel number                        |     |     |
| PNR_*      | *      | Data of person (see general description above)  |     |     |
| ANR        | C  40  | Order number from personnel posting             |     |     |
| ANR_*      | *      | Operation data (see general description above)  |     |     |
ANR_LART_*  *  Master data of wage type included in operation (see general
description above)
| MNR    | C  20  | Machine number from personnel posting  |     |     |
| ------ | ------ | -------------------------------------- | --- | --- |
| MNR_*  | *      | Master data of machine                 |     |     |
(see general description above)
| ADEPRO_*  | *   | Data of posting  |     |     |
| --------- | --- | ---------------- | --- | --- |
(see general description above)
ADEPRO_LART_*  *  Master data of wage type included in posting
(see general description above)
LART  C  4  Wage type of time ticket, prepopulated using the wage type of
the time ticket
TLS_LART*  *  Master data of wage type included in time ticket
(see general description above)
LEISTGRP_*  *  Master data of premium group (see general description
above)
Available as of hyl_compute.exe|out 8.1.1.93 (04/2018)

Export parameters:
| Parameter  | Typ Contents  |     |     |     |
| ---------- | ------------- | --- | --- | --- |
e
ZEIART  C  3  Time type of time ticket, prepopulated using standard
processing.

2.4.5  Recalculation of time tickets
When HYDRA has performed all steps of the standard processing of a time ticket, you can use the
following user exit to recalculate the time ticket.

| LLE-FPL_81.docx  |     | Version: 1.0.23049  |     | Page 24 of 62  |
| ---------------- | --- | ------------------- | --- | -------------- |

    Bonus Wages/Incentive Wages Based on Formulas

User exit "lsv00000.hsc"
Import parameters:
| Parameter  | Type   | Contents                                        |     |     |
| ---------- | ------ | ----------------------------------------------- | --- | --- |
| ART        | C10    | Source of time ticket                           |     |     |
|            |        | PB   : time ticket from ADE personnel postings  |     |     |
|            |        | PZ  : time ticket from PZE wage type posting    |     |     |
|            |        | ZUS  : time ticket from bonus                   |     |     |
| PNR        | N      | Person: personnel number                        |     |     |
| PNR_*      | *      | Data of person (see general description above)  |     |     |
| ANR        | C  40  | Order number from personnel posting             |     |     |
| ANR_*      | *      | Operation data (see general description above)  |     |     |
| MNR        | C  20  | Machine number from personnel posting           |     |     |
| MNR_*      | *      | Master data of machine                          |     |     |
(see general description above)
| ADEPRO_*  | *   | Data of posting  |     |     |
| --------- | --- | ---------------- | --- | --- |
(see general description above)
| LART*  | *   | Master data of wage type included in time ticket  |     |     |
| ------ | --- | ------------------------------------------------- | --- | --- |
(see general description above)
LEISTGRP_*  *  Master data of premium group (see general description
above)
Available as of hyl_compute.exe|out 8.1.1.93 (04/2018)

Export parameters:
All export parameters are prepopulated using the results of the standard processing. In particular the
premium accounts and premium indicators can be used to make separate calculations. Only change the
other export parameters in exceptional cases via user exit.
| Parameter  | Typ Contents  |     |     |     |
| ---------- | ------------- | --- | --- | --- |
e
| L_*  | *   | Data for time ticket, see section above.  |     |     |
| ---- | --- | ----------------------------------------- | --- | --- |

2.4.6  Importing time tickets into person day performance
The time tickets calculated using the available data, are imported into the person day performance:
User exit "hyl_tls2pnrtag.hsc"
Import parameters:

| LLE-FPL_81.docx  |     | Version: 1.0.23049  |     | Page 25 of 62  |
| ---------------- | --- | ------------------- | --- | -------------- |

    Bonus Wages/Incentive Wages Based on Formulas

Parameter  Type
Contents
| PNR  N      | Person: personnel number                 |     |
| ----------- | ---------------------------------------- | --- |
| PNR_*  *    | Data of person, see section above.       |     |
| ANR  C  40  | Operation number of time ticket          |     |
| ANR_*  *    | Operation data, see section above.       |     |
| MNR  C  20  | Machine of time ticket                   |     |
| MNR_*  *    | Machine data, see section above.         |     |
| TLS_ *  *   | Data of time ticket, see section above.  |     |
TLS_LART_*  *  Wage type data of time ticket, see section above

Export parameters:
| Parameter  Type  | Contents                        |     |
| ---------------- | ------------------------------- | --- |
| PNRTAG_*  *      | Data of person day performance  |     |
BUFFER_1 and BUFFER_2  C  Free buffer variables. The content of these variables is kept
32000  during the complete calculation of the person day
performance. Using these variables, you can save values in
BAPI format from the import of time tickets into the day
performance up to the distribution of the day performance on
time tickets.
When the calculation of a person day performance is started,
the buffer variables are emptied.

This user exit requests two functions:
Function  Task
main()  Distributes the data of a time ticket into the fields of the person day performance
final_calc()  Final calculation of the person day performance.
In this case, only the import/export variables of the person day performance are useful. The
time ticket data remain empty.
2.4.7  Using person day performance with time tickets
The person day performances can then be used for the time tickets to make calculations that require day
totals.
One example is the calculation of a performance efficiency rate if specific proportions of the time wage
must be deducted from the total labor time of the day to calculate the actual duration. The day-related
performance efficiency rate can then be assigned to the separate piecework time tickets.

| LLE-FPL_81.docx  | Version: 1.0.23049  | Page 26 of 62  |
| ---------------- | ------------------- | -------------- |

    Bonus Wages/Incentive Wages Based on Formulas

If required, you can also use this user exit to change the person day performance.
User exit "hyl_pnrtag2tls.hsc"
Import parameters:
| Parameter  Type  | Contents                            |     |
| ---------------- | ----------------------------------- | --- |
| PNR  N           | Person: personnel number            |     |
| PNR_*  *         | Data of person, see section above.  |     |
| ANR  C  40       | Operation number of time ticket     |     |
| ANR_*  *         | Operation data, see section above.  |     |
| MNR  C  20       | Machine of time ticket              |     |
| MNR_*  *         | Machine data, see section above.    |     |
TLS_LART_*  *  Wage type data of time ticket, see section above

Export parameters:
| Parameter  Type  | Contents                                 |     |
| ---------------- | ---------------------------------------- | --- |
| TLS_ *  *        | Data of time ticket, see section above.  |     |
| PNRTAG_*  *      | Data of person day performance           |     |
BUFFER_1 and BUFFER_2  C  Free buffer variables. The content of these variables is kept
32000  during the complete calculation of the person day
performance. Using these variables, you can save values in
BAPI format from the import of time tickets into the day
performance up to the distribution of the day performance on
time tickets.
When the calculation of a person day performance is started,
the buffer variables are emptied.

2.5  Group allocation
2.5.1  Overview
The postings for orders and persons recorded via ADE are the data basis of the premium wage based on
formulas. These postings include the run times, separated into main production time and malfunction
times. And the quantities produced. These postings also include the wage specifications like wage type,
t , t  and t  Here, they are checked and can be manually corrected and changed for each separate
e eb r.
posting, if required. Bonuses and deductions are also integrated in the calculation.
The data is recorded for machines, orders and persons.

| LLE-FPL_81.docx  | Version: 1.0.23049  | Page 27 of 62  |
| ---------------- | ------------------- | -------------- |

|     |     |     |     |     |   Bonus Wages/Incentive Wages Based on Formulas  |     |     |     |     |     |
| --- | --- | --- | --- | --- | ------------------------------------------------ | --- | --- | --- | --- | --- |

The illustration below helps to understand the interrelations. The illustration shows a sample premium
system.

BDE-postings
|     | 06:00  |                               | 10:00  |     |     | 14:00                              |     | 18:00  |     | 22:00  |
| --- | ------ | ----------------------------- | ------ | --- | --- | ---------------------------------- | --- | ------ | --- | ------ |
|     |        | Production order 1234: 8,0 h  |        |     |     | Overhead cost order  XYZ: , 8,0 h  |     |        |     |        |
Machine/AP 1
|     |     | Time productive /     |     | t  , t   , t   , Wage type, n  |     | Time productive /     |     | t  , t   , t   , wage type,  |      |     |
| --- | --- | --------------------- | --- | ------------------------------ | --- | --------------------- | --- | ---------------------------- | ---- | --- |
|     |     |                       |     | e eb r                         |     |                       |     | e                            | eb r |     |
|     |     | malfunction period,   |     |                                |     | malfunction period,   |     |                              | n    |     |
4,0h * ½  = 2,0 h
Person    1
Time productive/
malfunction period
|               |     | Production order 6789: 8,0 h  |     |     |     | Overhead cost order  XYZ: , 8,0 h  |     |     |     |     |
| ------------- | --- | ----------------------------- | --- | --- | --- | ---------------------------------- | --- | --- | --- | --- |
| Machine/AP 2  |     |                               |     |     |     |                                    |     |     |     |     |
Time productive /  t  , t   , t   , Wage type, n  Time productive /  t  , t   , t   , Wage type, n
|     |     |                       |     | e eb r |     |                       |     | e   | eb r |     |
| --- | --- | --------------------- | --- | ------ | --- | --------------------- | --- | --- | ---- | --- |
|     |     | malfunction period,   |     |        |     | malfunction period,   |     |     |      |     |
4.0h * ½  + 4,0h = 6,0 h
| Person  |  1   |     |     |     |     |     |     |     |     |     |
| ------- | ---- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
Time productive /

|     |     | malfu8n,0c thio n period   |     |     |     |     |     |     |     |     |
| --- | --- | -------------------------- | --- | --- | --- | --- | --- | --- | --- | --- |
Person    2
Time productive /
malfunction period
Incentive wage determination
|           |      |     |     | n  t  |  t     |     |     |     | n  t   t  |       |
| --------- | ---- | --- | --- | ------ | ------- | --- | --- | --- | ----------- | ----- |
|           |      |     |     |        | e   r   |     |     |     | eb   r      |       |
| Step     |      |     |     |        |         |     |     |     |             |       |
| Assign.   |  of  | A   | B   |   C    | D       | E   | F   | G   | H           |   I   |
post. to
p r e m ium fact. per
|     |     | P r es e | nce Breakd.  | Std . -  | W a g e |   M a c h | .  .  P r o d .  |   M a c h | . .  P e r f o | r m .  T o t a l   |
| --- | --- | -------- | ------------ | -------- | ------- | --------- | ---------------- | --------- | -------------- | ------------------ |
Pd ar oy
|           |     | ti m e   |                  | ti m e  | in ten s i ty |   ru n ti m | e   M a n . |   t a rg                 | e p e r   | d a y  r e s u l t   |
| --------- | --- | -------- | ---------------- | ------- | ------------- | ----------- | ----------- | ------------------------ | --------- | -------------------- |
|           |     |          |                  |         |               |             | .t ime      | Octc- up.                |           |                      |
| Step     |     |          |                  |         |               |             |             |                          |           |                      |
|           |     |          | C                |         |               | G           |             |                          |           |                      |
|           |     | D       |  1, 3   100 %  |         | H            |  100 %     |             | I  D  70 %  H  30 %  |           |                      |
|           |     | A  B    |                  |         |               | F           |             |                          |           |                      |
Calculation of
day
group results by
user-defined
formulas
| Step     |     |     |     |       |     |     |     |     |     |       |
| --------- | --- | --- | --- | ----- | --- | --- | --- | --- | --- | ----- |
|           |     | A   | B   |   C   | D   | E   | F   | G   | H   |   I   |
Calculation of
 month
|     |     | Σ   | Σ   | Σ   | Σ   | Σ   | Σ   | Σ   | Σ   | Σ   |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
group results by
 user-defined  Month  Month  Month  Month  Month  Month  Month  Month  Month
 formulas
|     |     |     |     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|     |     |     | C   |     |     | G   |     |     |     |     |
  D    1, 3   100 %  H    100 %  I  D  70 %  H  30 %
|     |     | A  B  |     |     |     | F   |     |     |     |     |
| --- | --- | ------ | --- | --- | --- | --- | --- | --- | --- | --- |
Formulas as in step 2.
The formulas for month results may very from the one for day results

Illustration: Schema to illustrate the premium wage calculation based on formulas in HYDRA.

| LLE-FPL_81.docx  |     |     |     | Version: 1.0.23049  |     |     |     |     |     | Page 28 of 62  |
| ---------------- | --- | --- | --- | ------------------- | --- | --- | --- | --- | --- | -------------- |

Bonus Wages/Incentive Wages Based on Formulas
Explanatory notes:
HYDRA provides premium accounts that you are free to define for the calculation of premium wages
based on formulas. The accounts have the letters A to I in the illustration. You use these accounts to
record data like standard times or actual times. And you can calculate these premium accounts using
other premium accounts.
It is possible to store different schemes for different forms of premiums.
In general, you calculate premium wages in three steps.
1. Sorting of the posted data into premium accounts on a daily basis
In the first step, you control the sorting of the data from postings into the premium accounts via script
language. In the illustration, this is shown with the arrows. The arrows only represent one posting in
the illustration. But of course, all postings of the same type are sorted the same way:
- Premium account A: the account records the total personnel processing time that results from
the personnel postings.
- Premium account B: this account records for each premium group the total malfunction time
that was included in the personnel processing time resulting from personnel postings.
- Premium account C: this account records for each premium group the person-related standard
time for the personnel postings. The standard time is calculated using the data of the postings via the
formula n * t + t .
e r
- Premium account E: this account records for each premium group the total order run time at
the machines.
- Premium account F: this account records for each premium group the productive order run
time at the machines (based on production orders, without malfunction times).
- Premium account G: this account records for each premium group the order/machine-related
standard time using the order postings. The standard time is calculated using the data of the postings
via the formula n * t + t .
eb r
2. Calculation of daily group results
In this step, you can calculate daily interim results using the data recorded in the premium accounts
when all postings of a premium group have been processed for the day. The illustration shows the
formulas used in the example. The premium accounts D, H and I are calculated using the formulas.
The user can define the formulas via script language.
3. Calculation of monthly group results
In this step, you can make calculations based on the premium accounts that are totaled on a monthly
basis. To this end, the same formulas are used as in step 2. The results are then assigned again to
the dependent premium accounts D, H and I. Also other formulas or extended calculations can be
implemented. The user can define the formulas via script language.
The flexibility of the script language allows not only simple calculations of a performance efficiency rate,
but you can also realize monetary evaluations. As part of an implementation support, you can map
existing premium models.
In LLE version 7.2, another step is available. You can also assign the result calculated for the group on
the day time tickets of the persons belonging to the relevant group. This assignment is only made if the
relevant user exit is available.
2.5.2 Step 1: distribution of data to premium accounts
User exit "lpv00000.hsc"
LLE-FPL_81.docx Version: 1.0.23049 Page 29 of 62

Bonus Wages/Incentive Wages Based on Formulas
2.5.2.1 Initialization
User exit " lpv1000.hsc", function init().
At start of processing, the function init() is called in user exit lpv1000.hsc. In this function, you use the
export variables USES_ART to control which data types are processed in the calculation. Only the data
required to calculate the wage data must be requested.
The import and export variables are described in the section below.
With the function init() it is important to make sure that the import variables are not filled. The import
variables are empty or 0.
...
export USES_ART char(50);
...
/*---------------------------------------------------------------------------*/
long init()
{
// The export variable USES_ART controls which data is processed.
// USES_ART = "AU AE PB ZUS TLS MDE";
// AU : U records (ADE order interruption)
// AE : E records (ADE order end)
// PB : B records (ADE personnel postings)
// ZUS : Bonuses (from LLE)
// TLS : Time tickets (also include PZE times from wage types for group incentives)
// [MDE : MDE log data, not available in the standard)]
// You cannot explicitly control the group result that is used to calculate bonuses (type "GRP").
USES_ART = "ZUS TLS"; // Only time tickets and bonuses are required.
return 0;
}
2.5.2.2 Data distribution to premium accounts
User exit "lpv00000.hsc"
Import parameters:
Note: The column KAR specifies the data that results from BDE waiting period processing with order and
personnel postings. You can identify these postings via the order type ANR_AART.
Parameter Type Contents AU/ KAR ZUS
AE/
PB
ART C 4 Posting type. X X X
"AU"/"AE": order posting interruption/end
"PB": personnel posting (operator)
"ZUS": bonus
"GRP": group result to calculate
incentives. Here, no data of orders,
machines, persons, bonus reasons and
postings/bookings is available. The
variable PNR_LEISTGRP includes the ID
LLE-FPL_81.docx Version: 1.0.23049 Page 30 of 62

    Bonus Wages/Incentive Wages Based on Formulas

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
| ANR       | C  40  | Order number            | X   | X  X  |
| --------- | ------ | ----------------------- | --- | ----- |
| ANR_AART  | C  5   | Operation: order type:  | X   | X  X  |
0 = PPS order, production order
1 = overhead order
2 = rework order
3 = capacity OP
4 = overhead order type II
… other customer-specific
     order types
ANR_AARTKAT  C  2  Operation: category of order type  X  X  X
| ANR_SZY  | N   | Operation: target cycle of machine in  | X   |   X  |
| -------- | --- | -------------------------------------- | --- | ---- |
seconds per 1000 cycles.
ANR_TLG  N  Operation: target partitioning of machine  X    X
| ANR_DATB  | D   | Operation: date of first logon  | X   |   X  |
| --------- | --- | ------------------------------- | --- | ---- |
ANR_ZEIB  N  Operation: time of first logon in seconds  X    X
| ANR_PRKZ  | C  1  | Operation: premium indicator  | X   |   X  |
| --------- | ----- | ----------------------------- | --- | ---- |
ANR_PARAM_K1  C  8  Operation: free parameter, text 1  X    X
ANR_PARAM_K2  C  8  Operation: free parameter, text 2  X    X
| ANR_KDPARAM_1  | C   | Operation: general information  | X   |   X  |
| -------------- | --- | ------------------------------- | --- | ---- |
100
ANR_KDPARAM_2  C  20  Operation: general information 2  X    X
| ...  | ...  | ...  |     |     |
| ---- | ---- | ---- | --- | --- |
ANR_KDPARAM_5  C  20  Operation: general information 5  X    X
| ANR_LART  | C  4  | Operation: planned wage type  | X   |   X  |
| --------- | ----- | ----------------------------- | --- | ---- |
ANR_LART_*  *  Master data of wage type, refer to section  X    X
further ahead.
| ANR_TE  | F   | Operation: planned standard time t | e  in  X  |   X  |
| ------- | --- | ---------------------------------- | --------- | ---- |
seconds per 1000 pieces
ANR_TR  F  Operation: planned setup specification t in  r X    X
seconds
ANR_TEB  F  Operation: planned standard time t eb  in  X    X
seconds per 1000 pieces
ANR_ADATF  D  Operation: planned earliest start date  X    X

| LLE-FPL_81.docx  |     | Version: 1.0.23049  |     | Page 31 of 62  |
| ---------------- | --- | ------------------- | --- | -------------- |

    Bonus Wages/Incentive Wages Based on Formulas

ANR_AZEIF  N  Operation: planned earliest start time in  X    X
seconds
| ANR_ADATB  | D   | Operation: planned start date  | X    | X   |
| ---------- | --- | ------------------------------ | ---- | --- |
ANR_AZEIB  N  Operation: planned start time in seconds  X    X
| ANR_ADATE  | D   | Operation: planned end date  | X    | X   |
| ---------- | --- | ---------------------------- | ---- | --- |
ANR_AZEIE  N  Operation: planned end time in seconds  X    X
| ANR_ADATS  | D   | Operation: planned latest end date     | X    | X   |
| ---------- | --- | -------------------------------------- | ---- | --- |
| ANR_AZEIS  | N   | Operation: planned latest end time in  | X    | X   |
seconds
| ANR_ATK          | C  25  | Operation: article number            | X    | X   |
| ---------------- | ------ | ------------------------------------ | ---- | --- |
| ANR_PARAM_1      | N      | from 02/06: free parameter, value 1  | X    | X   |
| ANR_PARAM_2      | N      | from 02/06: free parameter, value 2  | X    | X   |
| ANR_PARAM_3      | N      | from 02/06: free parameter, value 3  | X    | X   |
| ANR_BEM_1        | C  15  | from 02/06: comment 1                | X    | X   |
| ANR_BEM_2        | C  15  | from 02/06: comment 2                | X    | X   |
| ANR_KDBEZ        | C  16  | from 02/06: customer name            | X    | X   |
| ANR_MBVERH_NORM  | F      | from 02/06: number of employees      | X    | X   |
production
ANR_MBVERH_RUE  F  from 02/06: number of employees setup  X    X
ANR_OPTKRIT  C  20  from 02/06: optimization criteria  X    X
ANR_OPTKZ  C  1  Operation: optimization identicator  X    X
| ANR_COLOR  | C  20  | from 02/06: color                  | X    | X   |
| ---------- | ------ | ---------------------------------- | ---- | --- |
| ANR_FU01   | D      | from 02/06: user field in ADE 7.2  | X    | X   |
| …          |        |                                    |      |     |
| ANR_FU06   | D      | from 02/06: user field in ADE 7.2  | X    | X   |
| ANR_FU07   | N      | from 02/06: user field in ADE 7.2  | X    | X   |
| …          |        |                                    |      |     |
| ANR_FU22   | N      | from 02/06: user field in ADE 7.2  | X    | X   |
| ANR_FU23   | F      | from 02/06: user field in ADE 7.2  | X    | X   |
| …          |        |                                    |      |     |
| ANR_FU28   | F      | from 02/06: user field in ADE 7.2  | X    | X   |
| ANR_FU29   | C  1   | from 02/06: user field in ADE 7.2  | X    | X   |
| …          |        |                                    |      |     |
| ANR_FU44   | C  1   | from 02/06: user field in ADE 7.2  | X    | X   |
| ANR_FU45   | C10    | from 02/06: user field in ADE 7.2  | X    | X   |
| …          |        |                                    |      |     |
| ANR_FU50   | C10    | from 02/06: user field in ADE 7.2  | X    | X   |
| ANR_FU51   | C  20  | from 02/06: user field in ADE 7.2  | X    | X   |
| …          |        |                                    |      |     |

| LLE-FPL_81.docx  |     | Version: 1.0.23049  | Page 32 of 62  |     |
| ---------------- | --- | ------------------- | -------------- | --- |

    Bonus Wages/Incentive Wages Based on Formulas

| ANR_FU63  | C  20  | from 02/06: user field in ADE 7.2  | X    | X   |
| --------- | ------ | ---------------------------------- | ---- | --- |
| ANR_FU65  | C  40  | from 02/06: user field in ADE 7.2  | X    | X   |
| ANR_FU66  | C  40  | from 02/06: user field in ADE 7.2  | X    | X   |

Data of person
| PNR           | N     | Person: personnel number   | X  X  | X   |
| ------------- | ----- | -------------------------- | ----- | --- |
| PNR_PRKZ      | C  1  | Person: premium indicator  | X  X  | X   |
| PNR_ABT       | C  8  | Person: department         | X  X  | X   |
| PNR_BER       | C  8  | Person: area               | X  X  | X   |
| PNR_EINTRITT  | D     | Person: date of joining    | X  X  | X   |
| PNR_FIR       | C  4  | Person: company            | X  X  | X   |
| PNR_KST       | C10   | Person: cost center        | X  X  | X   |
PNR_LEISTGRP  C  8  Person: regular premium group of person  X  X  X
PNR_ANTFAKTLBON  N  Person: proport. factor for incentive bonus  X  X  X
| PNR_GEBDAT  | D   | Person: date of birth  | X  X  | X   |
| ----------- | --- | ---------------------- | ----- | --- |
PNR_GESCHLECHT  C  1  Person: gender M/W (male/female)  X  X  X
| PNR_INFODAT_1   | D      | Person: free date field 1    | X  X  | X   |
| --------------- | ------ | ---------------------------- | ----- | --- |
| ...             | ...    | ...                          |       |     |
| PNR_INFODAT_5   | D      | Person: free date field 5    | X  X  | X   |
| PNR_INFOTXT_01  | C  40  | Person: free text field 1    | X  X  | X   |
| ...             | ...    | ...                          |       |     |
| PNR_INFOTXT_20  | C  40  | Person: free text field 20   | X  X  | X   |
| PNR_INFOWERT_1  | N      | Person: free number field 1  | X  X  | X   |
| ...             | ...    | ...                          |       |     |
| PNR_INFOWERT_5  | N      | Person: free number field 5  | X  X  | X   |
Machine data
| MNR       | C  20  | Machine number              | X  X  | X   |
| --------- | ------ | --------------------------- | ----- | --- |
| MNR_PRKZ  | C  1   | Machine: premium indicator  | X  X  | X   |
MNR_LEISTGRP  C10  Machine: premium group populated by  X  X  X
default
| MNR_*  | *   | Master data of machine  |     |     |
| ------ | --- | ----------------------- | --- | --- |
(see general description above)
Important: this general master data is available only as of
program versions 06/2010. In older versions, only the three
fields mentioned above are available as machine master data.

| LLE-FPL_81.docx  |     | Version: 1.0.23049  | Page 33 of 62  |     |
| ---------------- | --- | ------------------- | -------------- | --- |

    Bonus Wages/Incentive Wages Based on Formulas

Data of premium group
Also with type = "GRP" (distribution of premium group results to the accounts of the premium areas)
the master data of the premium group is included here.
| LEISTGRP  | C10  | Premium group (cid:129) |     | X  X  | X   |
| --------- | ---- | ----------------------- | --- | ----- | --- |
LEISTGRP_*  *  Data of premium group, see section above.  X  X  X
Data of bonuses and bonus reasons
| CERTIFY  | C  1  | Requires approval J/N  |     |     | X   |
| -------- | ----- | ---------------------- | --- | --- | --- |
If the bonus actually requires approval, but
the option Allocate if still subject to
authorization is activated, then the bonus
does not require approval here and the
parameter CERTIFY is set to "N".
| SIGN  | C  1  | Approved J/N/A  |     |     | X   |
| ----- | ----- | --------------- | --- | --- | --- |
A=rejected
| ZUSCHLGR  | N   | Bonus reason  |     |     | X   |
| --------- | --- | ------------- | --- | --- | --- |
ZUSCHLGR_SZ  C  1  Bonus reason: is bonus for target or actual      X
time? (S/I)

| Date from posting/booking  |     |     |     |     |     |
| -------------------------- | --- | --- | --- | --- | --- |
Note: special assignment with TYPE="TLS", see separate table below.
| ADEPRO_DAT  | D   | Date  |     | X  X  | X   |
| ----------- | --- | ----- | --- | ----- | --- |
ADEPRO_BMK01  F  Resource performance account 1 in hours  X  X
| ...  |     |     |     | X  X  |     |
| ---- | --- | --- | --- | ----- | --- |
ADEPRO_BMK11  F  Resource performance account 11 in  X  X  X
hours. With bonuses, here bonus duration.
| ADEPRO_BMK12  | F   | Resource performance account 12 in  |     | X  X  |     |
| ------------- | --- | ----------------------------------- | --- | ----- | --- |
hours
ADEPRO_PDAUER  F  Labor time in hours. With bonuses, bonus  X  X  X
duration.
| ADEPRO_KST  | C10  | Cost center                           |     | X  X  |     |
| ----------- | ---- | ------------------------------------- | --- | ----- | --- |
| ADEPRO_TE   | F    | t  recorded in hours per 1000 pieces  |     | X     |     |
e
| ADEPRO_TR   | F   | t recorded in hours  r                |     | X    |     |
| ----------- | --- | ------------------------------------- | --- | ---- | --- |
| ADEPRO_TEB  | F   | t  recorded in hours per 1000 pieces  |     | X    |     |
eb
| ADEPRO_LART  | C  4  | Wage type  |     | X    |     |
| ------------ | ----- | ---------- | --- | ---- | --- |
ADEPRO_LART_*  *  Master data of wage type, refer to section  X
further ahead. (Available as of
November/2005)
| ADEPRO_GUT   | F   | Yield (primary quantity)             |     | X    |     |
| ------------ | --- | ------------------------------------ | --- | ---- | --- |
| ADEPRO_AUS   | F   | Scrap quantity (primary quantity)    |     | X    |     |
| ADEPRO_NAC   | F   | Rework quantity (primary quantity)   |     | X    |     |
| ADEPRO_PRB   | F   | Problem quantity (primary quantity)  |     | X    |     |
| ADEPRO_DATB  | D   | Logon date                           |     | X    | X   |

| LLE-FPL_81.docx  |     | Version: 1.0.23049  |     | Page 34 of 62  |     |
| ---------------- | --- | ------------------- | --- | -------------- | --- |

    Bonus Wages/Incentive Wages Based on Formulas

| ADEPRO_ZEIB  | F    | Logon time in seconds           | X     | X   |
| ------------ | ---- | ------------------------------- | ----- | --- |
| ADEPRO_DATE  | D    | Logoff date                     | X     | X   |
| ADEPRO_ZEIE  | F    | Logoff time in seconds          | X     | X   |
| ADEPRO_SKNR  | N    | Shift number                    | X  X  |     |
| ADEPRO_BPOS  | C10  | Operator position/function      | X     |     |
| ADEPRO_LPKZ  | C10  | Premium indicator (wage group)  | X     |     |
ADEPRO_USER_01 to  C  40  Customer-specific log data. See notes
| ADEPRO_USER_05  |     | below.  |     |     |
| --------------- | --- | ------- | --- | --- |
Note: in the script, the function init()
controls the assignment of these variables;
for this reason, define these variables as
export variables.

Export parameters:
| Parameter  | Typ Contents  |     |     |     |
| ---------- | ------------- | --- | --- | --- |
e
| DAUER   | F  Duration in hours       |     |     |     |
| ------- | -------------------------- | --- | --- | --- |
| VORG    | F  Standard time in hours  |     |     |     |
ZUSCHL  F  Bonuses in hours. Normally used for bonuses that refer to the
standard time.
| UPZ    | F  Non-productive time in hours  |     |     |     |
| ------ | -------------------------------- | --- | --- | --- |
| AUSFZ  | F  Downtime in hours             |     |     |     |
| GKZ    | F  Overhead cost times in hours  |     |     |     |
GUTSCHR  F  Bonus time in hours, normally used for bonuses that refer to the
actual time.
| WARTEN   | F  Waiting time in hours                          |     |     |     |
| -------- | ------------------------------------------------- | --- | --- | --- |
| PRKTO01  | F  Value that is allocated to premium account 1   |     |     |     |
| ...      | ...  ...                                          |     |     |     |
| PRKTO30  | F  Value that is allocated to premium account 30  |     |     |     |
PRKZ01  C   Premium indicator 1. Prepopulated using the previously set
20  premium indicator
| ...     | ...  ...                            |     |     |     |
| ------- | ----------------------------------- | --- | --- | --- |
| PRKZ05  | C   Premium indicator 5, see above  |     |     |     |
20

Special assignment of data from posting/booking in the processing of time tickets.
In the processing of group time tickets, the time tickets are passed to the user exit in the structure of the
ADE postings in order to limit the number of import/export variables. In this case, a special assignment of
the fields ADEPRO_* is used.

| LLE-FPL_81.docx  |     | Version: 1.0.23049  | Page 35 of 62  |     |
| ---------------- | --- | ------------------- | -------------- | --- |

    Bonus Wages/Incentive Wages Based on Formulas

Data from posting/booking
| ADEPRO_DAT  | D   | Date  | x      |
| ----------- | --- | ----- | ------ |
ADEPRO_BMK01  F  Value of premium account 1 of time ticket.  x
Because of conversion rules of the past,
this value must be multiplied by 0,0036 for
further use (3600 / 1000000    =  0,0036).
| ...           |     |                                      | x      |
| ------------- | --- | ------------------------------------ | ------ |
| ADEPRO_BMK10  | F   | Value of premium account 10 of time  | x      |
ticket. Because of conversion rules of the
past, this value must be multiplied by
0,0036 for further use.
| ADEPRO_BMK11   | F    | Standard time of time ticket  | x      |
| -------------- | ---- | ----------------------------- | ------ |
| ADEPRO_BMK12   | F    | Fixed 0.                      | -      |
| ADEPRO_PDAUER  | F    | Duration of time ticket       | x      |
| ADEPRO_KST     | C10  | Cost center                   | x      |
| ADEPRO_TE      | F    | t  in hours per 1000 pieces   | x      |
e
| ADEPRO_TR    | F     | t in hours  r | x      |
| ------------ | ----- | ------------- | ------ |
| ADEPRO_TEB   | F     | Always 0.     | -      |
| ADEPRO_LART  | C  4  | Wage type     | x      |
ADEPRO_LART_*  *  Master data of wage type, refer to section  x
further ahead.
| ADEPRO_GUT         | F      | Yield                     | x      |
| ------------------ | ------ | ------------------------- | ------ |
| ADEPRO_AUS         | F      | Scrap                     | x      |
| ADEPRO_NAC         | F      | Always 0                  | -      |
| ADEPRO_PRB         | F      | Always 0                  | -      |
| ADEPRO_DATB        | D      | Logon date                | x      |
| ADEPRO_ZEIB        | F      | Logon time in seconds     | x      |
| ADEPRO_DATE        | D      | Logoff date               | x      |
| ADEPRO_ZEIE        | F      | Logoff time in seconds    | x      |
| ADEPRO_SKNR        | N      | Shift number              | x      |
| ADEPRO_BPOS        | C10    | Always empty.             | -      |
| ADEPRO_LPKZ        | C10    | Time type of time ticket  | x      |
| ADEPRO_USER_01 to  | C  40  | Always empty.             | -      |
ADEPRO_USER_05
Further data
| ZUSCHLGR  | N   | Bonus reason  | x      |
| --------- | --- | ------------- | ------ |

| LLE-FPL_81.docx  |     | Version: 1.0.23049  | Page 36 of 62  |
| ---------------- | --- | ------------------- | -------------- |

Bonus Wages/Incentive Wages Based on Formulas
2.5.2.3 User-specific log data
Using the export variables ADEPRO_USER_01 to ADEPRO_USER_05, you can additionally select
customer-specific data from the database (ADE log data, order backlog data or other master data). This
can be user fields of the log data or of the machines, for example. You require detailed knowledge of the
database structures and the internal processes of wage calculation to this end.
You initialize the fields using the user exit described above "lpv00000.hsc" by calling the function init().
Assign SQL fragments (column names) to the variables of data that must be selected additionally. When
the function main() is called in the following requests, the variables then include the relevant data. In the
function init(), SQL fragments are assigned to the variables ADEPRO_USER_01 to ADEPRO_USER_05.
For this reason, they must be declared as export variables.
Available database tables:
Table Alias Contents
ade_protokoll ap. ADE log data
auftrag_status ast. Status information on the operation
maschinen m. Maschine master data
lle_leist_grp lg. Master data of premium groups
If you select columns that do not have data type "char(n)", you must phrase the column so that the
database selects this column as char(n). With Oracle and SQL server, you can use the relevant type
conversions according to the database used. See example below. If you do not respect this, a database
error is produced because of a UNION select.
Example:
...
export ADEPRO_USER_01 char(40);
export ADEPRO_USER_02 char(40);
export ADEPRO_USER_03 char(40);
export ADEPRO_USER_04 char(40);
export ADEPRO_USER_05 char(40);
...
/*---------------------------------------------------------------------------*/
/* Init */
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
LLE-FPL_81.docx Version: 1.0.23049 Page 37 of 62

Bonus Wages/Incentive Wages Based on Formulas
return 0;
}
/*---------------------------------------------------------------------------*/
/* main function */
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
2.5.3 Step 2+3: daily/monthly calculation of premium accounts
User exit "lpb00000.hsc"
Import parameters:
Note: the person-related import parameters are only filled for the person (PNR_xxx), if the user exit is
called for the list Personal group participation.
Parameter Type Contents
ART C 1 T: script is run for daily calculation
M: script is run for monthly calculation
P: script is run to calculate the personal group participation.
DAT D Date.
With type P or M, the date is the last day of the period used
for the calculation (end of month).
MDEFEITG C 1 With type T: Is the day stored as public holiday in the MDE
public holidays J/N
Otherwise: empty
PDAUER N With type P: working time of a person in the premium group in
seconds.
Otherwise: 0.
Data of premium group
When premium areas are calculated, the premium area master data is included.
LEISTGRP C10 Premium group (cid:129)
LEISTGRP_* * Data of premium group, see section above.
Data of person
They are only filled if the user exit is called for the list Personal group participation.
PNR N Person: personnel number
PNR_PRKZ C 1 Person: premium indicator
PNR_ABT C 8 Person: department
LLE-FPL_81.docx Version: 1.0.23049 Page 38 of 62

    Bonus Wages/Incentive Wages Based on Formulas

| PNR_BER  C  8          | Person: area                             |     |
| ---------------------- | ---------------------------------------- | --- |
| PNR_EINTRITT  D        | Person: date of joining                  |     |
| PNR_FIR  C  4          | Person: company                          |     |
| PNR_GEBDAT  D          | Person: date of birth                    |     |
| PNR_GESCHLECHT  C  1   | Person: gender M/W (male/female)         |     |
| PNR_INFODAT_1  D       | Person: free date field 1                |     |
| ...  ...               | ...                                      |     |
| PNR_INFODAT_5  D       | Person: free date field 5                |     |
| PNR_INFOTXT_01  C  40  | Person: free text field 1                |     |
| ...  ...               | ...                                      |     |
| PNR_INFOTXT_20  C  40  | Person: free text field 20               |     |
| PNR_INFOWERT_1  N      | Person: free number field 1              |     |
| ...  ...               | ...                                      |     |
| PNR_INFOWERT_5  N      | Person: free number field 5              |     |
| PNR_KST  C10           | Person: cost center                      |     |
| PNR_LEISTGRP  C  8     | Person: regular premium group of person  |     |
PNR_ANTFAKTLBON  N  Person: proport. factor for incentive bonus

Export parameter:
| Parameter  Typ Contents  |     |     |
| ------------------------ | --- | --- |
e
| VORG  N  | Standard time in seconds  |     |
| -------- | ------------------------- | --- |
ZUSCHL  N  Bonuses in seconds.  Is normally used for bonuses that refer
to the standard time.
| UPZ  N     | Non-productive time in seconds  |     |
| ---------- | ------------------------------- | --- |
| DAUER   N  | Duration in seconds             |     |
| AUSFZ  N   | Downtime in seconds.            |     |
| GKZ  N     | Overhead cost times in seconds  |     |
GUTSCHR  N  Time credit in seconds. Is normally used for bonuses that refer
to the actual time.
| WARTEN  N      | Waiting time in seconds       |     |
| -------------- | ----------------------------- | --- |
| LEISTGRAD  F   | Performance level in percent  |     |
| PRKTO01  F     | Premium account 1             |     |
| ...  ...       |                               |     |
| PRKTO20  F     | Premium account 20            |     |
| PRKZ01  C  20  | Premium indicator 1           |     |
| ...  ...       | ...                           |     |

| LLE-FPL_81.docx  | Version: 1.0.23049  | Page 39 of 62  |
| ---------------- | ------------------- | -------------- |

    Bonus Wages/Incentive Wages Based on Formulas

| PRKZ05  C  20  | Premium indicator 5  |     |
| -------------- | -------------------- | --- |

2.5.4  Group time tickets
For the labor time, group time tickets are created. You can change these time tickets via the user exit
"lsv00000.hsc": "Recalculation of time tickets". This user exit is described in a paragraph above in section
"Individual allocation". This user exit used the time type "GRP" for group time tickets.
2.5.5  Assigning group results to time tickets
When the group results are calculated, you can use the user exit "hyl_leistgrp2tls.hsc" to assign the group
results to the day time tickets of the persons. The user exit is called for each time ticket with premium
group. As import parameter, it includes the daily premium group result and as export parameter the time
ticket data. For example, you can assign a performance efficiency rate to the time ticket that has been
calculated for the group and you can enter a calculated standard time in the time ticket.
Import parameters:
| Parameter  Typ Contents  |     |     |
| ------------------------ | --- | --- |
e
| PNR  N      | Personnel number                                |     |
| ----------- | ----------------------------------------------- | --- |
| PNR_*  *    | Data of person, see section above.              |     |
| ANR  C  40  | Operation number of time ticket                 |     |
| ANR_*  *    | Operation data, see section above.              |     |
| MNR  C  20  | Machine of time ticket                          |     |
| MNR_*  *    | Data of time ticket machine, see section above  |     |
L_LART_*  *  Wage type data of time ticket, see section above.
LEISTGRP_*  *  Master data of premium group, see section above.
Data of premium group result
| VORG  N  | Standard time in seconds  |     |
| -------- | ------------------------- | --- |
ZUSCHL  N  Bonuses in seconds.  Is normally used for bonuses that refer
to the standard time.
| UPZ  N     | Non-productive time in seconds  |     |
| ---------- | ------------------------------- | --- |
| DAUER   N  | Duration in seconds             |     |
| AUSFZ  N   | Downtime in seconds.            |     |
| GKZ  N     | Overhead cost times in seconds  |     |
GUTSCHR  N  Time credit in seconds. Is normally used for bonuses that refer
to the actual time.
| WARTEN  N     | Waiting time in seconds       |     |
| ------------- | ----------------------------- | --- |
| LEISTGRAD  F  | Performance level in percent  |     |

| LLE-FPL_81.docx  | Version: 1.0.23049  | Page 40 of 62  |
| ---------------- | ------------------- | -------------- |

    Bonus Wages/Incentive Wages Based on Formulas

| PRKTO01  F     | Premium account 1    |     |
| -------------- | -------------------- | --- |
| ...  ...       |                      |     |
| PRKTO20  F     | Premium account 20   |     |
| PRKZ01  C  20  | Premium indicator 1  |     |
| ...  ...       | ...                  |     |
| PRKZ05  C  20  | Premium indicator 5  |     |

Export parameters:
| Parameter  Typ Contents  |     |     |
| ------------------------ | --- | --- |
e
| L_  *  | Data for time ticket, see section above.  |     |
| ------ | ----------------------------------------- | --- |

2.5.6  Info function on the PZE terminal CT-WIN/CT-AIP
2.5.6.1  Overview
When the info is displayed on the PZE terminal, an information on the activities performed in the premium
group is shown in addition to the account balances.
Flextime  :  00:00
Flexitime  : 154:00
Leave account  :  27.00
05 B3P       102% :  12:30
| 04 350      118%  :  7:30  |     |     |
| -------------------------- | --- | --- |
04 B3P      122%  : 112:30

For more information on this info function, refer to the document describing the HR functions of the data
collection software (status 2018: documents AIP-HRF and AIP-HRL).
You can change or disable the info display if you customize the incentive wage module using the user exit
described in the following.
2.5.6.2  Formatting via user exit
2.5.6.3  Data rows
Use the user exit "hyl_info.hsc" to format the terminal info on your own, to show further data and to
display total lines. This user exit is the equivalent to the user exit used to calculate the group results with
personal group participation ("lpb00000.hsc", ART=P). This user exit only includes four other parameters
that are used to format the info row.

| LLE-FPL_81.docx  | Version: 1.0.23049  | Page 41 of 62  |
| ---------------- | ------------------- | -------------- |

Bonus Wages/Incentive Wages Based on Formulas
Import parameters:
Parameter Typ Contents
e
LEN_DIS_BEZ N Obsolete: some PZE terminals (DOS) send an information on
the maximum length of the name. This information is provided
here.
LEN_DIS_WERT N Obsolete: maximum length of value (normally 7)
Import/export parameters:
Parameter Typ Contents
e
DIS_BEZ max Formatted name that is displayed on the terminal. If the name
C100 is empty, the row is not displayed on the terminal.
DIS_WERT max Formatted time value that is displayed on the terminal
C7
2.5.6.4 Total line
All premium accounts (fixed and flexible) are totaled for the premium groups once a month. This sum total
is then provided when the user exit "hyl_info.hsc" is called the next time. The user exit does not provide
any information on the premium group and the persons. "SUM" is only assigned to the premium group
LEISTGRP.
The name does not have a default formatting for the total line. Without formatting in the user exit, the total
line is not shown.
See also the example below.
2.5.6.5 Example 1 – Extension of display
In the example that follows, the info displays the performance efficiency rate and additionally the premium
account 1. And a total standard time is provided for the total line of premium account 10.
In the total line, the duration recorded and the standard time recorded is used to calculate a total
performance efficiency rate that is shown in the total line on the terminal.
hydra basic;
// import data general
import ART char(1); // request type of script.
// P: script is executed for the calculation of the
// personal group participation.
import DAT date; // date
import PDAUER long; // working time of a person in seconds.
import LEISTGRP char(10); // premium group
LLE-FPL_81.docx Version: 1.0.23049 Page 42 of 62

Bonus Wages/Incentive Wages Based on Formulas
export LEISTGRAD double; // performance level in percent
export PRKTO01 double; // premium account 1 (PKZ)
export PRKTO10 double; // premium account 10 (standard time)
// Import maximum length of name and value
import LEN_DIS_BEZ long; // maximum length of name
import LEN_DIS_WERT long; // maximum length of value (normally 7)
// Import/Export name and value
export DIS_BEZ char(80); // name of info
export DIS_WERT char(8); // value of info
/*---------------------------------------------------------------------------*/
/* Main function */
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
Flextime : 00:00
Flexitime : 154:00
Leave account : 27.00
05 B3P: 57%( 55) : 12:30
05 total: 57% : 12:30
04 350: 118%( 95) : 7:30
04 B3P: 122%(116) : 112:30
04 total: 122% : 120:00
LLE-FPL_81.docx Version: 1.0.23049 Page 43 of 62

Bonus Wages/Incentive Wages Based on Formulas
Other example of a terminal display on CTWIN:
2.5.6.6 Example 2 – Suppressing display
hydra basic;
// // import data general
// import ART char(1); // request type of script.
// // P: script is executed for the calculation of the
// // personal group participation.
// import DAT date; // date
// import PDAUER long; // working time of a person in seconds.
//
// import LEISTGRP char(10); // premium group
//
// export LEISTGRAD double; // performance level in percent
// export PRKTO01 double; // premium account 1 (PKZ)
// ...
// export PRKTO10 double; // premium account 10 (standard time)
//
// // Import maximum length of name and value
// import LEN_DIS_BEZ long; // maximum length of name
// import LEN_DIS_WERT long; // maximum length of value (normally 7)
// Import/Export name and value
export DIS_BEZ char(80); // name of info
export DIS_WERT char(8); // value of info
/*---------------------------------------------------------------------------*/
/* Main function */
/*---------------------------------------------------------------------------*/
long main()
{
// set name to empty --> output of the row is suppressed.
DIS_BEZ = "";
return 0;
}
/*---------------------------------------------------------------------------*/
LLE-FPL_81.docx Version: 1.0.23049 Page 44 of 62

    Bonus Wages/Incentive Wages Based on Formulas

| 2.6  Calculating period results  |     |     |     |
| -------------------------------- | --- | --- | --- |
This function is available as of MW 3.0, service pack 6 (end 2014). Older versions do not meet
the software requirements. The user exit described below is not called.

With HYDRA systems MW 3.0 and an initial installation before February 2015, you must check
if the HYDRA database fulfills the requirements before you use the function. If required, you

must first execute the patches for MW 3.0 of service pack 6 status.
You can persist the results of complete settlement periods in the database for a further customer-specific
processing for persons and premium groups. In HYDRA, the settlement periods of the Incentive Wage
are fixed to calendar months.
As part of the wage calculation, the settlement period is identified that must be recalculated for the
persons or premium groups. A settlement period must be recalculated if at least one day result of the
settlement period has been recalculated.
A user exit is then called for each settlement period and person or premium group. With each call, the
user exit can calculate one period result. To calculate the result, the user exit uses SQL database
accesses  that  usually  total  the  relevant  day  results.  Then,  the  totaled  result  is  calculated  for  the
settlement period and assigned to the export variable. The wage calculation automatically saves the
result. The HYDRA system provides examples of user exits for persons or premium groups.
| 2.6.1                           | Settlement period results for persons  |                         |     |
| ------------------------------- | -------------------------------------- | ----------------------- | --- |
| User exit:                      |                                        | hyl_pnrperiod_calc.hsc  |     |
| Function:                       |                                        | long final_calc()       |     |
| Parameter of function:  -none-  |                                        |                         |     |
Return value:      is not processed. The function must return the value 0.
Import parameters:
| Parameter  |     | Typ Contents  |     |
| ---------- | --- | ------------- | --- |
e
| PNR       |     | N  Personnel number                    |     |
| --------- | --- | -------------------------------------- | --- |
| PERSON_*  |     | *  Data of person, see section above.  |     |

Export parameter:
| Parameter          |     | Type  Contents                |     |
| ------------------ | --- | ----------------------------- | --- |
| PERSONPERIOD_YEAR  |     | N  Year of settlement period  |     |

| LLE-FPL_81.docx  |     | Version: 1.0.23049  | Page 45 of 62  |
| ---------------- | --- | ------------------- | -------------- |

    Bonus Wages/Incentive Wages Based on Formulas

| PERSONPERIOD_PERIOD  |     | N  Settlement period (calendar month)  |     |     |
| -------------------- | --- | -------------------------------------- | --- | --- |
PERSONPERIOD_ACC_DATB  D  First day of settlement period (first day of calendar month)
PERSONPERIOD_ACC_DATE  D  Last day of settlement period (last day of calendar month)
| PERSONPERIOD_ACTUALTIME    |     | F  (Actual) duration [h]  |     |     |
| -------------------------- | --- | ------------------------- | --- | --- |
| PERSONPERIOD_STANDARDTIME  |     | F  Standard time [h]      |     |     |
| PERSONPERIOD_PERFEFFRATE   |     | F  Performance level      |     |     |
PERSONPERIOD_MINPERFLEVEL  F  Minimum day performance level of settlement period
PERSONPERIOD_MAXPERFLEVEL  F  Maximum day performance level of settlement period
| PERSONPERIOD_DURATION_ADE  |     | F  Duration ADE [h] (optional)  |     |     |
| -------------------------- | --- | ------------------------------- | --- | --- |
| PERSONPERIOD_DURATION_PZE  |     | F  Duration PZE [h] (optional)  |     |     |
| PERSONPERIOD_DURATION_LLE  |     | F  Duration LLE [h] (optional)  |     |     |
PERSONPERIOD_PRACC_01 to  F  Premium accounts that the user can define
PERSONPERIOD_PRACC_30
PERSONPERIOD_PRATTR_01 to  C   Premium indicators that the user can define
| PERSONPERIOD_PRATTR_05  |     | 20  |     |     |
| ----------------------- | --- | --- | --- | --- |

| 2.6.2                           | Settlement period results for premium groups  |                           |     |     |
| ------------------------------- | --------------------------------------------- | ------------------------- | --- | --- |
| User exit:                      |                                               | hyl_prgrpperiod_calc.hsc  |     |     |
| Function:                       |                                               | long final_calc()         |     |     |
| Parameter of function:  -none-  |                                               |                           |     |     |
Return value:      is not processed. The function must return the value 0.
Import parameters:
| Parameter  |     | Typ Contents  |     |     |
| ---------- | --- | ------------- | --- | --- |
e
PERSON_*  *  Master data of premium group, see section above.

Export parameter:
Parameter  Type  Contents
| PRGRPPERIOD_PRGRP  |     | C  8  Premium group (cid:129) |     |     |
| ------------------ | --- | ----------------------------- | --- | --- |
PRGRPPERIOD_YEAR  N  Year of settlement period
PRGRPPERIOD_PERIOD  N  Settlement period (calendar month)
PRGRPPERIOD_ACC_DATB  date  First day of settlement period (first day of calendar month)
PRGRPPERIOD_ACC_DATE  date  Last day of settlement period (last day of calendar month)
PRGRPPERIOD_ACTUALTIME  F  (Actual) duration [h]
PRGRPPERIOD_STANDARDTIME  F  Standard time [h]

| LLE-FPL_81.docx  |     | Version: 1.0.23049  |     | Page 46 of 62  |
| ---------------- | --- | ------------------- | --- | -------------- |

Bonus Wages/Incentive Wages Based on Formulas
PRGRPPERIOD_PERFEFFRATE F Performance level
PRGRPPERIOD_MINPERFLEVEL F Minimum day performance level of settlement period
PRGRPPERIOD_MAXPERFLEVEL F Maximum day performance level of settlement period
PRGRPPERIOD_OFFTIME F Downtime [h]
PRGRPPERIOD_PREMIUMAVERAGE F Time of premium average (overhead times) [h]
PRGRPPERIOD_CREDITNOTE F Time credit [h]. Is normally used for bonuses that refer to
the actual time.
PRGRPPERIOD_UNPRODTIME F Non-productive time [h]
PRGRPPERIOD_WAITINGTIME F Waiting time [h]
PRGRPPERIOD_BONUSES F Bonuses [h]. Is normally used for bonuses that refer to
the standard time.
PERSONPERIOD_PRACC_01 to F Premium accounts that the user can define
PERSONPERIOD_PRACC_30
PERSONPERIOD_PRATTR_01 to C Premium indicators that the user can define
PERSONPERIOD_PRATTR_05 20
2.7 Interface to payroll accounting
2.7.1 Overview
The interface to payroll accounting is an interface that can be used universally to transfer all relevant data
from the HYDRA Incentive Wage and HYDRA Time and Attendance to any payroll accounting system.
The payroll accounting system only requires a defined possibility to read a sequential ASCII file.
The customer or the MPDV Consulting can specify the format of the output file via user exit. Via user exit,
the customer or the MPDV Consulting can also specify the contents of the output file that use the
available data. For example, the degree of aggregation can be specified (per day or month, for each cost
center or none). It is also possible to make additional calculations, for example average values.
2.7.2 Data that can be processed
2.7.2.1 Incentive Wage - individual time tickets
This data is equivalent to the data that is shown on the HYDRA console in the LLE menu, item
Reports/time ticket log.
This data is the basis for the payment of persons with an individual allocation of piecework or time wage.
LLE-FPL_81.docx Version: 1.0.23049 Page 47 of 62

Bonus Wages/Incentive Wages Based on Formulas
2.7.2.2 Incentive Wage - personal group participation
This data is shown on the HYDRA console in the LLE menu, item Reports/Group reports/Personal group
participation.
This data is the basis for the payment of persons with group-related allocation.
2.7.2.3 Incentive Wage - monthly group results
This data is shown on the HYDRA console in the LLE menu, item Reports/Group reports/Monthly group
results.
This data does not refer to a person and is only required in the interface if the payroll accounting system
uses the group results identified in HYDRA to calculate other values or if the results are used for
calculation purposes.
2.7.2.4 Time & Attendance - wage types
This data is shown on the HYDRA console in the PZE menu, item Reports/Monthly wage types. If this
HYDRA Time and Attendance data is used for calculation, this data is the basis for the payment of
persons.
2.7.3 Procedure to create interface file
All relevant data is transferred one after the other to a user exit. In this user exit, the required data types
are selected. From this data, the key values (e.g. personnel number and wage type) and data (e.g.
duration or monetary value) are identified and written in a buffer. The write process is explicitly triggered
in the user exit and using one single input data record, any number of entries can be created in the buffer
(it might also be useful to create no entry at all).
In the next step, the data of the buffer is aggregated to key values and the data fields are totaled. This
aggregated data is transferred to a user exit. The user exit converts the data into a character string that is
written in the interface file and triggers this write process in the interface file.
LLE-FPL_81.docx Version: 1.0.23049 Page 48 of 62

Bonus Wages/Incentive Wages Based on Formulas
LLE individual time tickets
LLE Personal group Intermediate
participation buffer
LLE Group results month
PZE wage types month
Ascii file
2.7.4 User exits
2.7.4.1 Initialization
[Initialization available as of hyl_rck72.exe|out 7.2.1.10]
User exit "lrck1000.hsc", function init().
At start of processing, the function init() is called in user exit lpv1000.hsc. In this function, you use the
export variables USES_ART to control which data types are processed in the interface. Only the data
required to create the interface file must be requested.
The import and export variables are described in the section below.
With the function init() you must make sure that only the import variables DAT_VON and DAT_BIS are
filled with values. The other import variables are empty or 0.
LLE-FPL_81.docx Version: 1.0.23049 Page 49 of 62

Bonus Wages/Incentive Wages Based on Formulas
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
2.7.4.2 Step 1: Data collection
User exit "lrck1000.hsc", function main().
This user exit controls the data collection
1) which data records are relevant for the interface
2) which fields of the data are relevant key fields for the interface
3) which fields of the data are relevant data fields that are totaled for the interface.
The parameter ART specifies the data type for which the user exit is called to process the data.
Note: the import parameters of the user exit are filled with reference to the parameter ART. For example,
in the processing of Time and Attendance data, no data of a premium group is available.
Parameter Type Contents
VERARBKZ C10 Field Processing of the selection criteria when you create the
interface file.
ART C 3 ELS: Individual time tickets (from individual allocation, AKK,
ZL, GK, ...)
GRP: Personal group participation (with relevant
group results)
GRE: Group results (without reference to a person)
PZE: Wage type postings of the Time and Attendance
PZM: PZE monthly results. Available as of 09/2010.
PNR: HR master data. Available as of 04/2012 (8.1.1.23).
Only import variables of the
HR master data are populated.
DAT_VON D Start date of evaluation period
DAT_BIS D End date of evaluation period
SATZNR N Unique sequence number of data record, starting with 1
Export parameter
Parameter Type Contents
USES_ART C 50 Only relevant if the interface is initialized via function init().
LLE-FPL_81.docx Version: 1.0.23049 Page 50 of 62

    Bonus Wages/Incentive Wages Based on Formulas

You can enter the abbreviations described for parameter ART
in this variable. Separate by space character. This variable
then controls which data is selected by the interface program.
For example:
  USES_ART = "ELS GRP";

Further import parameters
Data of the person at the end of the evaluation period (only with ART = ELS, GRP, PZE and PNR)
| PNR  N  | Person: personnel number  |     |
| ------- | ------------------------- | --- |
PNR_NACHNAME  C  40  Person: last name. (as of version 8.1.1.23 04/2012)
PNR_VORNAME  C  20  Person: first name. (as of version 8.1.1.23 04/2012)
PNR_NAME  C  62  Person: last name, first name. (as of version 8.1.1.23
04/2012)
| PNR_PRKZ  C  1         | Person: premium indicator                |     |
| ---------------------- | ---------------------------------------- | --- |
| PNR_ABT  C  8          | Person: department                       |     |
| PNR_BER  C  8          | Person: area                             |     |
| PNR_EINTRITT  D        | Person: date of joining                  |     |
| PNR_FIR  C  4          | Person: company                          |     |
| PNR_GEBDAT  D          | Person: date of birth                    |     |
| PNR_GESCHLECHT  C  1   | Person: gender M/W (male/female)         |     |
| PNR_INFODAT_1  D       | Person: free date field 1                |     |
| ...  ...               | ...                                      |     |
| PNR_INFODAT_5  D       | Person: free date field 5                |     |
| PNR_INFOTXT_01  C  40  | Person: free text field 1                |     |
| ...  ...               | ...                                      |     |
| PNR_INFOTXT_20  C  40  | Person: free text field 20               |     |
| PNR_INFOWERT_1  N      | Person: free number field 1              |     |
| ...  ...               | ...                                      |     |
| PNR_INFOWERT_5  N      | Person: free number field 5              |     |
| PNR_KST  C10           | Person: cost center                      |     |
| PNR_LEISTGRP  C  8     | Person: regular premium group of person  |     |
PNR_ANTFAKTLBON  N  Person: proport. factor for incentive bonus

Time ticket of person
(only with type ELS, GRP and PZE, special assignment with type PZM, see below)
| L_DAT  D  | Date  |     |
| --------- | ----- | --- |
L_ANR  C  40  Order number. (not populated with ART PZE and GRP).

| LLE-FPL_81.docx  | Version: 1.0.23049  | Page 51 of 62  |
| ---------------- | ------------------- | -------------- |

Bonus Wages/Incentive Wages Based on Formulas
L_SKNR N Shift number (not populated with ART PZE and GRP).
L_MNR C 20 Machine number
L_BMKNR N Number of resource performance account (only populated
with ART ELS)
L_ZEIART C 3 Time type of time ticket. (not populated with ART PZE).
L_LART C 4 Wage type of time ticket (not populated with ART GRP).
L_TE F Target t of the time ticket in seconds for 1000 pieces (not
e
populated with ART PZE and GRP).
L_TR F Target t of the time ticket in seconds for 1000 pieces (not
r
populated with ART PZE and GRP).
L_GUT F Yield of time ticket (not populated with ART PZE and GRE).
L_AUS F Scrap of time ticket (not populated with ART PZE and GRE).
L_DAUER N Type ELS: duration of time ticket in seconds [s]
Type GRP: personal group participation with person-related
time proportions [s]
Type PZE: Total of attendance time and absence time [s]
L_VGZ N Standard time of time ticket in seconds (not populated with
ART PZE and GRE).
L_ZUSCHL N Bonus time of time ticket in seconds (not populated with ART
PZE and GRE).
L_ZUSCHLGR N Bonus reason of time ticket (not populated with ART GRP).
L_KST C10 Cost center of time ticket (not populated with ART GRP).
L_LOHNGRP C 4 Wage group of time ticket (not populated with ART GRP).
L_ZEITGRAD F Performance efficiency rate of time ticket in percent.
Performance efficiency rates are only calculated for time
tickets of the AKK time type (piecework). (not populated with
ART PZE).
L_REFNR C 20 Reference number of time ticket. Is usually empty, can be
shown for customer-specific information in the time ticket log.
(not populated with ART PZE and GRP).
L_PRKTO_01 F Premium account of time ticket 1 that can be defined by user.
With type PZE, this parameter contains the attendance time of
the month recorded for the wage type of an employee. (not
populated with ART GRP).
L_PRKTO_02 F Premium account of time ticket 2 that can be defined by user.
With type PZE, this parameter contains the absence time of
the month recorded for the wage type of an employee. (not
populated with ART GRP).
L_PRKTO_03 F Premium account of time ticket 3 that can be defined by user.
With type PZE, this parameter contains the number of full
absence days of the month recorded for the payment day type
with the wage type number of an employee. (not populated
with ART GRP).
L_PRKTO_04 F Premium account of time ticket 4 that can be defined by user.
With type PZE, this parameter contains the number of partial
absence days of the month recorded for the payment day type
LLE-FPL_81.docx Version: 1.0.23049 Page 52 of 62

    Bonus Wages/Incentive Wages Based on Formulas

with the wage type number of an employee. (not populated
with ART GRP).
L_PRKTO_05  F  Premium account of time ticket 5 that can be defined by user.
With type PZE, this parameter contains the number of leave
days taken (multiplied by factor 10) in the month. (not
populated with ART GRP).
L_PRKTO_06  F  Premium account of time ticket 6 that can be defined by user.
With type PZE, this parameter contains the full attendance
days of an employee in the month (independent of wage
type). (not populated with ART GRP).
L_PRKTO_07  F  Premium account of time ticket 7 that can be defined by user.
With type PZE, this parameter contains the full attendance
hours of an employee in the month (independent of wage
type). (not populated with ART GRP).
| ...  ...  | ...  |     |
| --------- | ---- | --- |
L_PRKTO_10  F  Premium account of time ticket 10 that can be defined by user
(not populated with ART PZE and GRP)
L_PRKZ_01  C  20  Premium account of time ticket 1 that can be defined by user
(not populated with ART PZE and GRP)
| ...  ...  | ...  |     |
| --------- | ---- | --- |
L_PRKZ_05  C  20  Premium account of time ticket 5 that can be defined by user
(not populated with ART PZE and GRP)

Time ticket of person with type PZM
(Only the parameters populated are listed. Other parameters are not populated and are empry
or 0).
| L_DAT  D       | End of PZE settlement period        |     |
| -------------- | ----------------------------------- | --- |
| L_LART  C  4   | Wage type                           |     |
| L_KST  C10     | Cost center                         |     |
| L_DAUER  N     | Total time of person in month       |     |
| L_VGZ  N       | Target time in hours in the month   |     |
| L_PRKTO_01  F  | Attendance time of person in month  |     |
| L_PRKTO_02  F  | Absence                             |     |
| L_PRKTO_03  F  | Days present                        |     |
| L_PRKTO_04  F  | Number of days with absences        |     |
| L_PRKTO_05  F  | Target time in hours in the month   |     |
| L_PRKTO_06  F  | Number of days with target time     |     |

Wage type data
L_LART_*  *  Master data of wage type, refer to section further ahead. The
master data of the wage types is available for all data records
that contain a wage type.

| LLE-FPL_81.docx  | Version: 1.0.23049  | Page 53 of 62  |
| ---------------- | ------------------- | -------------- |

    Bonus Wages/Incentive Wages Based on Formulas

LEISTGRP_LART_  *  Data of the wage type of a premium group (reserved)
Data of the premium group (only with ART = GRE and GRP, also ART = ELS with group time tickets.
With ART = PNR populated with premium group of HR master data.)
| LEISTGRP    | C10  | Premium group (cid:129)                    |     |     |
| ----------- | ---- | ------------------------------------------ | --- | --- |
| LEISTGRP_*  | *    | Data of premium group, see section above.  |     |     |
Results of the premium groups (only with ART = GRE and GRP, also ART = ELS with group time
tickets. Also populated with ART = PNR with the group results in the evaluation period recorded for
the premium group of the HR master data at the end of evaluation period).
| VORG  | F   | Standard time in seconds  |     |     |
| ----- | --- | ------------------------- | --- | --- |
ZUSCHL  F  Bonuses in seconds.  Is normally used for bonuses that refer
to the standard time.
| UPZ     | F   | Non-productive time in seconds  |     |     |
| ------- | --- | ------------------------------- | --- | --- |
| DAUER   | F   | Duration in seconds             |     |     |
| AUSFZ   | F   | Downtime in seconds.            |     |     |
| GKZ     | F   | Overhead cost times in seconds  |     |     |
GUTSCHR  F  Time credit in seconds. Is normally used for bonuses that refer
to the actual time.
| WARTEN     | F      | Waiting time in seconds       |     |     |
| ---------- | ------ | ----------------------------- | --- | --- |
| LEISTGRAD  | F      | Performance level in percent  |     |     |
| PRKTO01    | F      | Premium account 1             |     |     |
| ...        | ...    |                               |     |     |
| PRKTO30    | F      | Premium account 30            |     |     |
| PRKZ01     | C  20  | Premium indicator 1           |     |     |
| ...        | ...    | ...                           |     |     |
| PRKZ05     | C  20  | Premium indicator 5           |     |     |

Callback function:
This user exit includes a callback function INSERT_DATA. This callback function expects a so-called
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

| LLE-FPL_81.docx  |     | Version: 1.0.23049  |     | Page 54 of 62  |
| ---------------- | --- | ------------------- | --- | -------------- |

Bonus Wages/Incentive Wages Based on Formulas
...
data = add_bapi_val( data, "KEYWERT:5", xxx );
data = add_bapi_val( data, "DATAWERT:1", DAUER );
...
data = add_bapi_val( data, "DATAWERT:30", 0.0 );
data = add_bapi_val( data, "MINWERT:1", dat_long ); // as of 11/2005
...
data = add_bapi_val( data, "MINWERT:10", 0.0 ); // as of 11/2005
data = add_bapi_val( data, "MAXWERT:1", dat_long ); // as of 11/2005
...
data = add_bapi_val( data, "MAXWERT:10", 0.0 ); // as of 11/2005
code = CallBack("INSERT_DATA", data );
For information on the data types and the maximum field lengths, refer to the user exit description and the
output of aggregated data below.
Key values are all fields except the fields "DATAWERT:xx", "MINWERT:xx" and "MAXWERT:xx".
The fields "DATAWERT:xx" are totaled in a second step after the key values, and of the fields
"MINWERT:xx" and "MAXWERT:xx" the smallest or the greatest value is identified.
2.7.4.3 Step 2: Output of aggregated data
User exit "lrck2000.hsc".
This user exit is used to write the aggregated data of the buffer in the interface file in step 2 of the
interface generation. To this end, further calculations can be made in the user exit.
The data is aggregated to key values and processed. The following sorting applies: company, personnel
number, date, year, period, KEYTEXT_1 to 5, wage type, cost center, KEYTEXT_6 to 10, KEYWERT_1
to 5.
The import parameters are the fields of the buffer that have been populated by user exit lrck1000.hsc in
step 1.
Parameter Type Contents
VERARBKZ C10 Field Processing of the selection criteria when you create the
interface file.
DAT_VON D Start date of evaluation period
DAT_BIS D End date of evaluation period
SATZNR N Unique sequence number of data record
PNR N Intended for personnel number
FIRMA C 4 Intended for company
NACHNAME C 40 Contains the last name, if PNR contains a valid personnel
number.
LLE-FPL_81.docx Version: 1.0.23049 Page 55 of 62

Bonus Wages/Incentive Wages Based on Formulas
VORNAME C 20 Contains the first name, if PNR contains a valid personnel
number.
NAME C 62 Contains the first and last name separated by comma, if PNR
contains a valid personnel number.
DATUM D Intended for a date.
JAHR N Intended for the settlement year
PERIODE N Intended for the settlement period (month)
LART C 4 Intended for wage type
LART_* * Master data of wage type, refer to section further ahead.
KST C10 Intended for cost center
KEYTEXT_1 to 10 C 20 Character string for further keys that can be used by the user
KEYWERT_1 to 5 F Numeric values for further keys that can be used by the user
DATAWERT_1 to 30 F Free data values that can be used. These values are totaled
using the single values of all key fields mentioned above.
MINWERT_1 to 10 F Free data values that can be used. The smallest values of
these values are identified using the single values of all key
fields mentioned above.
Available from 11/2005.
MAXWERT_1 to 10 F Free data values that can be used. The largest values of
these values are identified using the single values of all key
fields mentioned above.
Available from 11/2005.
The user exit does not contain any export parameters.
Callback function:
This user exit includes several callback functions. All callback functions expect a character string as
second parameter.
OUTPUT Outputs the character string in the interface file and shows it on the HYDRA
console in the dialog to create the interface file.
OUTPUT.DATA Outputs the character string only in the interface file. An output on the HYDRA
console is not performed.
OUTPUT.DISPLAY Outputs the character string only on the HYDRA console in the dialog to create
the interface file. An output in the interface file is not performed.
LLE-FPL_81.docx Version: 1.0.23049 Page 56 of 62

    Bonus Wages/Incentive Wages Based on Formulas

2.8  User field configuration with premium accounts
2.8.1  User field key
The incentive wage based on formulas requires the following user field keys. The user field keys are
fixed, other user field keys are not processed.
| Object      | User field key  |     |
| ----------- | --------------- | --- |
| LEISTGRP    | SYSTEM          |     |
| LEISTGRPTG  | SYSTEM          |     |
| LLEPNRTAG   | SYSTEM          |     |
| TLS         | SYSTEM          |     |

2.8.2  Type definitions
Default type definitions are specified. They must not be changed. If you want to use deviating type
definitions, you must create customer-specific type definitions.
The following other type definitions are provided for the LLE:

| LLE-FPL_81.docx  | Version: 1.0.23049  | Page 57 of 62  |
| ---------------- | ------------------- | -------------- |

Bonus Wages/Incentive Wages Based on Formulas
Older systems might use deviating type definitions: LEISTGRPFAKT??, LEISTGRPMOD?,
LEISTGRPTGPRKTO??, LEISTGRPTGPRKZ??, TLSPRKTO?? and TLSPRKZ?. These type definitions
should not be used anymore.
2.8.3 User fields
In the user fields in field Designation, you can select the label text of the user fields on the MOC.
Object type User field key Field ID Default field Purpose
type
LEISTGRP SYSTEM 1 to 30 LLE_DEC_10_3 Numeric default values of premium
groups
LEISTGRP SYSTEM 101 to LLE_PRKZ_10 Alphanumeric default values of premium
105 groups
LEISTGRPTG SYSTEM 1 to 30 LLE_DEC_10_3 Premium accounts in the result of
premium groups
LEISTGRPTG SYSTEM 101 to LLE_PRKZ_10 Premium indicator in the result of
105 premium groups
LLEPNRTAG SYSTEM 1 to 30 LLE_DEC_10_3 Premium accounts in the person day
performance
LLEPNRTAG SYSTEM 101 to LLE_PRKZ_10 Premium indicator in the person day
105 performance
TLS SYSTEM 1 to 30 LLE_DEC_10_3 Premium accounts in the time tickets of
the person
TLS SYSTEM 101 to LLE_PRKZ_10 Premium indicators in the time tickets of
105 the person.
LLE-FPL_81.docx Version: 1.0.23049 Page 58 of 62

Bonus Wages/Incentive Wages Based on Formulas
3 Changing Groups
Summary
Menu Data Collection  Incentive Wages  Change of Groups
Transaction code grpch
Function authorization grpch.*
Changing of premium groups is one possibility to build premium groups and to assign recorded data to
these premium groups. There is a separate document dealing with the different possibilities of building
premium groups.
Premium groups are changed if labor times from PZE wage type postings are included in the computation
of group bonuses. If the wage type is configured in such a way that it is to be included as labor time into
the group bonus and the premium group is determined by the change of groups, changes of groups can
and must be kept here. This is especially reasonable in connection with the additional feature
“premium/incentive wage based on formulas”. The standard premiums “incentive bonus and utilization
bonus” are still computed on the basis of HYDRA-ADE postings relating to orders and personnel without
taking into account group changes. They are only considered for the generation of group time tickets and,
thus for the personal group participation.
The collection can be performed subsequently or in advance at the HYDRA client. A change of groups
applies until another change of groups is recorded.
LLE-FPL_81.docx Version: 1.0.23049 Page 59 of 62

Bonus Wages/Incentive Wages Based on Formulas
Selection Criteria
The application provides the following, special selection criteria:
Show deleted
Provided that a change of groups that was originally collected at the ADE terminal, is deleted, it is
only designated as “deleted” but remains in the database. If the “show deleted” option is checked
such original postings are displayed additionally. They are displayed in italics and with a gray
background and can no longer be changed.
Field Descriptions
Person
Person for which the change of groups is performed.
LLE-FPL_81.docx Version: 1.0.23049 Page 60 of 62

Bonus Wages/Incentive Wages Based on Formulas
Premium group
Premium group to which the person switches. The premium group can also be empty. An empty
premium group field means that the person does not work in group bonus as of this point in time.
If “DEFAULT” is entered as premium group, premium groups will be assigned in the corresponding
period of time as if no change of groups was collected (default assignment without “change of
groups”, e.g. using the posted machine or time in individual piecework).
Comment
Optional, detailed description or comment on the change of groups.
Start
Date and time as of which the premium group is assigned.
End
The system fills out this field automatically. A change of groups automatically applies until the next
change of groups starts.
Last editing
Last editor including date and time.
Type
Edited: Manually collected or edited at the client
Original: Originally collected at the ADE terminal
Deleted: Deleted original data
Terminal
Number of the terminal where the change of groups was recorded (additional feature).
LLE-FPL_81.docx Version: 1.0.23049 Page 61 of 62

Bonus Wages/Incentive Wages Based on Formulas
Editing Functions
The below dialog opens to edit a data record:
The system automatically fills out the fields of the end time. A change of groups automatically applies until
the next change of groups starts.
The terminal field cannot be edited as it is only kept for data records that are originally entered at the
terminal.
LLE-FPL_81.docx Version: 1.0.23049 Page 62 of 62