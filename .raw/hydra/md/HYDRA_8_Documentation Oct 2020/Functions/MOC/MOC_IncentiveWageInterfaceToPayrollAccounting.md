Interface to Payroll Accounting

1

Interface to Payroll Accounting

Overview

Menu

Human  Resources  Management    Incentive Wage    Interface  to  Payroll
Accounting

Transaction code

iwipr

Function authorization

iwipr.*

The  uploads  to  the  payroll  accounting  are  not  performed  automatically.  The  uploads  are  performed

manually. For the upload, the time sheets and the bonuses of all employees are provided in an interface

file on the HYDRA server in the HYDRA directory. This interface file covers a period of time that you are

free to specify. A new file (hylrueck.dat) is created each time you call the upload function. You can save

the file under any name on a data medium using a function key on the HYDRA console. For information on

the  data  record  structure  of  the  upload  file,  refer  to  the  section  "Upload  of  wages"  in  the  HYDRA

documentation "Interface to payroll accounting".

If you use the "incentive wage based on formulas", you can define the contents and formats of the interface

using custom formulas and scripts that are different to the ones shown in this document.

Note:

While  the  wage  calculation  is  running,  some  wage  data  is  not  available  for  other  evaluations.  For  this

reason, you cannot create the LLE interface file and run the wage calculation at the same time. A locking

mechanism is used to ensure this. In this case, the system does not show the usual screen of the interface

file, but a respective warning.

MOC_IncentiveWageInterfaceToPayrollAccounting.docx

Version: 1.0.14695

Page 1 of 4

When you have started the evaluation, the interface file is displayed.

Interface to Payroll Accounting

Selection criteria

Date from / to

You  can  create  the  interface  for  single  days,  if  required.  But  usually,  the  upload  is  performed  for

calendar  months.  The  system  populates  the  date  fields  with  beginning  and  end  of  the  previous

calendar month.

If required, the system automatically archives the  incentive  wage data (time tickets and results of

premium groups) in the long-term data area. If you process other data with the "incentive wage based

on formulas", e.g. data of the personnel time management, you must ensure via customization that

the data is stored for a sufficient period of time.

Transfer data to SAP

If an additional function for the direct upload of data to SAP-HR is active and if this option is enabled,

the data is directly uploaded to SAP (update run). If this option is disabled, the data is only displayed

on the screen (test run). You can make as many test runs as required before finally upload the data

to SAP.

Identification and customization of the source system SOURCE_SYS

Many upload interfaces to SAP include the target SAP system as SOURCE_SYS in the data passed.

MOC_IncentiveWageInterfaceToPayrollAccounting.docx

Version: 1.0.14695

Page 2 of 4

Interface to Payroll Accounting

When the HR master data has been downloaded in SAP format to HYDRA using the HR-PDC, SAP

also  transfers  the  source  system  of  the  person.  This  system  is  stored  in  the  sixteenth  freely

configurable info field of the HYDRA HR master data. No further configuration is required.

If the HR master data is maintained in a different way, this entry might not exist. You can then identify

the  source  system  for  the  upload  using  the  ALE  configuration  in  HYDRA  (ALE  =  Application  Link

Enabling). To this end, the source system of an active logical SAP system is read. You can set this

system in HYDRA via INI configuration.

You  identify  the  source  system  using  the  following  rule  and  priority.  If  a  source  system  could  be

identified using the listed rules in the specified order, then the other rules are not executed.

1)  Entry in info field 16 of the HR master data

If an entry is available in this field, this entry is interpreted as source system for the upload.

2)  Via logical system from INI configuration for personnel number

Via INI configuration, a logical SAP system is specified for the personnel number:

  Name of INI

"HR-LOGSYS"

Section

required logical system

Key

Value

"PNR"

Personnel number of the required person.

The active source system of the logical system is then identified.

3)  Via logical system from INI configuration for the company

Via  INI  configuration,  a  logical  SAP  system  is  specified  for  the  company  defined  in  the  HR

master data:

  Name of INI

"HR-LOGSYS"

Section

required logical system

Key

Value

"FIR"

Company.

The active source system of the logical system is then identified.

4)  Via logical system from INI configuration, default entry

Via INI configuration, you can make an entry to generally specify a logical SAP system:

  Name of INI

"HR-LOGSYS"

Section

required logical system

Key

Value

"ALL"

"Y"

The active source system of the logical system is then identified.

5)  Default identification

The active source system of the logical system "SAP" is identified.

MOC_IncentiveWageInterfaceToPayrollAccounting.docx

Version: 1.0.14695

Page 3 of 4

Interface to Payroll Accounting

If no source system could be identified using the listed rules, the field remains empty.

Detail applications

You can switch between the display of the text file and the data file. By  default, the display is identical. If

you use the "incentive wage based on formulas", you can display readable information in the text file via

customization by a specialist.

MOC_IncentiveWageInterfaceToPayrollAccounting.docx

Version: 1.0.14695

Page 4 of 4

