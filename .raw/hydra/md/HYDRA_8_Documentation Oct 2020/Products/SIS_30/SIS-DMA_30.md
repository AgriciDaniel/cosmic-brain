Manual
Printing of Staff Badges
SIS-DMA 3.0/3.1
Version 1.0.16727
Last changed on: 19.06.2020

Printing of Staff Badges
Copyright
©Copyright 2020 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.
Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.
SIS-DMA_30.docx Version: 1.0.19468 Page 2 of 10

|     |     |     | Printing of Staff Badges  |
| --- | --- | --- | ------------------------- |

Contents
1  Printing Employee Badges - Overview ........................................................ 4
1.  Print Staff Badges ........................................................................................ 5

| SIS-DMA_30.docx  |     | Version: 1.0.19468  | Page 3 of 10  |
| ---------------- | --- | ------------------- | ------------- |

Printing of Staff Badges
1 Printing Employee Badges - Overview
Purpose
Application service for creating a layout for employee badges and for printing the badges.
Implementation Considerations
You use the function package if:
 you intend to create employee badges yourself. This may be necessary, for example, if the
badges are to be personalized by names or photographs.
Integration
This functional package may be used if the HR master data (function package SIS-IPS) is used.
Features
 Printing of employee badges
o Graphic report generator for staff badge layout design. Employee photographs and
company logos can be integrated
o Printing of employee badges via a card printer
o Printing of badge number as bar code (e.g. to be read at terminals for order data entry)
SIS-DMA_30.docx Version: 1.0.19468 Page 4 of 10

Printing of Staff Badges
1. Print Staff Badges
Summary
Menu Master data  Staff  HR master data  Print staff badges
Function authorization pepb
For the people selected in the HR master data table, the following window opens to print the staff badges
of the employees:
Requirement
The print out of the staff badges can be modified with function authorization pepb.print.The layout of the
staff badges can be modified with function authorization pepb. layout.
Report-Designer
With Button „Report-Designer“ select „PrintStaffBadges“ and press Edit:
SIS-DMA_30.docx Version: 1.0.19468 Page 5 of 10

|     |     |     | Printing of Staff Badges  |
| --- | --- | --- | ------------------------- |

Please click Button „Report Designer“ in ReportConfiguration to start List&Label Designer.

| SIS-DMA_30.docx  |     | Version: 1.0.19468  | Page 6 of 10  |
| ---------------- | --- | ------------------- | ------------- |

Printing of Staff Badges
Editing functions
The following window opens for editing the layout. Please don’t forget to request data before editing:
Press F1 for Help. User manual of integrated Designer will open.
Report Structure:
The Report Structure contains the table BOPersonList with all data of persons. For each person possibly
there is an image in table MultipleImageDownload.
SIS-DMA_30.docx Version: 1.0.19468 Page 7 of 10

|     |     |     | Printing of Staff Badges  |
| --- | --- | --- | ------------------------- |

Field descriptions
Field list
Two files are available in the field explorer as database fields.
The file BOPersonList contains all HR master data fields.
| Data field BOPersonList              |     | Meaning           |     |
| ------------------------------------ | --- | ----------------- | --- |
| person.additional_leave_entitlement  |     | Additional leave  |     |
person.allocate_average_working_time  Allocate average working time
| person.annual_leave_entitlement     |     | Annual leave               |     |
| ----------------------------------- | --- | -------------------------- | --- |
| person.area                         |     | Area                       |     |
| person.auth.ade_level               |     | BDE authorization          |     |
| person.auth.change_production_lock  |     | Change of production lock  |     |
person.auth.change_target_cycle  Change of cycle/ partitioning
| person.auth.change_target_quantity  |     | Change of target quantity    |     |
| ----------------------------------- | --- | ---------------------------- | --- |
| person.auth.dnc_download            |     | DNC download                 |     |
| person.auth.dnc_upload              |     | DNC upload                   |     |
| person.auth.log_all_persons_off     |     | Log all people off           |     |
| person.auth.log_op_off              |     | Log OP off                   |     |
| person.auth.log_op_on               |     | Log OP on                    |     |
| person.auth.mde_level               |     | MDE authorization            |     |
| person.auth.record_measures         |     | Enter measures               |     |
| person.auth.release_dnc_resource    |     | DNC release                  |     |
| person.auth.reset_maintenances      |     | Reset maintenances           |     |
| person.auth.short_business_trip     |     | Business trip authorization  |     |
| person.auth.wrm_level               |     | Status change of resources   |     |
person.automatic_logoff_at_shiftend  Autom. logoff of personnel when shift ends
| person.automatic_op_change   |     | Autom. OP change      |     |
| ---------------------------- | --- | --------------------- | --- |
| person.average_working_time  |     | Average working time  |     |
Cardnumber for barcode print including systemnumber
person.barcode
and checkkey
| person.bde_lock_indicator  |     | Lock person (BDE)  |     |
| -------------------------- | --- | ------------------ | --- |
| person.card_id             |     | Badge              |     |
person.change_status_only_logged_on  Change only if the person is logged on
person.check_if_person_is_logged_on  Check whether person is logged on
| person.company                    |     | Company                    |     |
| --------------------------------- | --- | -------------------------- | --- |
| person.costcenter                 |     | Cost center                |     |
| person.date_of_birth              |     | Date of birth              |     |
| person.date_of_joining            |     | Date of joining            |     |
| person.date_of_latest_evaluation  |     | Date of latest evaluation  |     |
| person.date_of_leaving            |     | Date of leaving            |     |
| person.department                 |     | Department                 |     |
| person.doesnotclock               |     | Person does not clock      |     |
| person.domicile                   |     | Domicile                   |     |
| person.email_company              |     | Company e-mail             |     |
| person.email_public               |     | Private e-mail             |     |
| person.employee_subgroup          |     | Employee subgroup          |     |
| person.employment_relationship    |     | Employment relationship    |     |
| person.family_status              |     | Family status              |     |
| person.first_evaluation           |     | First allocation           |     |
| person.firstname                  |     | First name                 |     |
| person.function                   |     | Activity                   |     |
| person.id                         |     | Personnel number           |     |
| person.infodate1                  |     | Additional info Date 1     |     |
| person.infodate2                  |     | Additional info Date 2     |     |

| SIS-DMA_30.docx  |     | Version: 1.0.19468  | Page 8 of 10  |
| ---------------- | --- | ------------------- | ------------- |

|     |     |     | Printing of Staff Badges  |
| --- | --- | --- | ------------------------- |

| person.infodate3       |     | Additional info Date 3   |     |
| ---------------------- | --- | ------------------------ | --- |
| person.infodate4       |     | Additional info Date 4   |     |
| person.infodate5       |     | Additional info Date 5   |     |
| person.infotext1       |     | Additional info Text 1   |     |
| person.infotext10      |     | Additional info Text 10  |     |
| person.infotext11      |     | Additional info Text 11  |     |
| person.infotext10      |     | Additional info Text 10  |     |
| person.infotext11      |     | Additional info Text 11  |     |
| person.infotext12      |     | Additional info Text 12  |     |
| person.infotext13      |     | Additional info Text 13  |     |
| person.infotext14      |     | Additional info Text 14  |     |
| person.infotext15      |     | Additional info Text 15  |     |
| person.infotext16      |     | Additional info Text 16  |     |
| person.infotext17      |     | Additional info Text 17  |     |
| person.infotext18      |     | Additional info Text 18  |     |
| person.infotext19      |     | Additional info Text 19  |     |
| person.infotext2       |     | Additional info Text 2   |     |
| person.infotext20      |     | Additional info Text 20  |     |
| person.infotext3       |     | Additional info Text 3   |     |
| person.infotext4       |     | Additional info Text 4   |     |
| person.infotext5       |     | Additional info Text 5   |     |
| person.infotext6       |     | Additional info Text 6   |     |
| person.infotext7       |     | Additional info Text 7   |     |
| person.infotext8       |     | Additional info Text 8   |     |
| person.infotext9       |     | Additional info Text 9   |     |
| person.infovalue1      |     | Additional info Value 1  |     |
| person.infovalue2      |     | Additional info Value 2  |     |
| person.infovalue3      |     | Additional info Value 3  |     |
| person.infovalue4      |     | Additional info Value 4  |     |
| person.infovalue5      |     | Additional info Value 5  |     |
| person.lastname        |     | Last name                |     |
| person.lock_indicator  |     | Lock person              |     |
person.logon_multiple_machines  Log on to several workplaces
| person.maximum_number_of_ops    |     | Max. OPs per person      |     |
| ------------------------------- | --- | ------------------------ | --- |
| person.maximum_target_quantity  |     | Maximum target quantity  |     |
| person.middlename               |     | Middle name              |     |
| person.minimum_target_quantity  |     | Minimum target quantity  |     |
| person.mobile_company           |     | Company mobile           |     |
| person.mobile_public            |     | Private mobile           |     |
| person.modified_by              |     | Editor                   |     |
| person.modified_ts              |     | Modified on              |     |
| person.mount_demount_resource   |     | Mount/demount resource   |     |
| person.name                     |     | Last name                |     |
| person.nationality              |     | Nationality              |     |
| person.operatorposition         |     | Operator position        |     |
| person.overtime_type            |     | Overtime type            |     |
person.overtime_type.designation  Designation of overtime type
| person.part_time_rate      |     | Part-time rate                       |     |
| -------------------------- | --- | ------------------------------------ | --- |
| person.personnel_group     |     | Employee group                       |     |
| person.pincode             |     | Pin code                             |     |
| person.premium_factor      |     | Proport. factor for incentive bonus  |     |
| person.premium_group       |     | Premium group                        |     |
| person.premium_indicator   |     | Premium indicator                    |     |
| person.pze_ade_comparison  |     | BDE/ PZE comparison                  |     |
| person.regular_machine     |     | Workplace                            |     |
| person.regular_yearmodel   |     | Year model                           |     |
| person.responsabilityarea  |     | Responsibility area                  |     |

| SIS-DMA_30.docx  |     | Version: 1.0.19468  | Page 9 of 10  |
| ---------------- | --- | ------------------- | ------------- |

|     |     |     | Printing of Staff Badges  |
| --- | --- | --- | ------------------------- |

person.setup.process_check_digit  Identifier Process check digit from the basic settings
person.setup.systemnumber  System number from the basic settings
| person.sex                    |     | Gender              |     |
| ----------------------------- | --- | ------------------- | --- |
| person.shiftrhythm_yearmodel  |     | Shift rhythm model  |     |
person.shiftrhythm_yearmodel.designation  Designation of shift rhythm model
| person.special_leave_entitlement  |     | Special leave                 |     |
| --------------------------------- | --- | ----------------------------- | --- |
| person.standard_console           |     | Standard console              |     |
| person.street                     |     | Street                        |     |
| person.supervisor_company         |     | Company                       |     |
| person.supervisor_id              |     | Supervisor                    |     |
| person.symbol                     |     | Graphic file                  |     |
| person.target_quantity_check      |     | Target quantity check         |     |
| person.telephone_number.business  |     | Company phone                 |     |
| person.telephone_number.public    |     | Private phone                 |     |
| person.time_sheet                 |     | Time sheet                    |     |
| person.title                      |     | Title                         |     |
| person.valid_from                 |     | Valid from                    |     |
| person.valid_to                   |     | Valid to                      |     |
| person.wage_group                 |     | Wage group                    |     |
| person.wage_indicator             |     | Wage/ premium indicator       |     |
| person.wage_model                 |     | Payment model                 |     |
| person.wage_model.designation     |     | Designation of payment model  |     |
| person.wage_type                  |     | Wage type                     |     |
| person.waiting_period_op          |     | Waiting period OP             |     |
| person.working_time_model         |     | Working time model            |     |
person.working_time_model.designation  Designation of working time model
| person.zip_code  |     | ZIP code  |     |
| ---------------- | --- | --------- | --- |

The file MultipleImageDownload contains all HR master data images.
| Data field MultipleImageDownload  |     | Meaning                   |     |
| --------------------------------- | --- | ------------------------- | --- |
| file.data                         |     | Image                     |     |
| file.name                         |     | Name of the graphic file  |     |

 Insert image
To print the company logo on the staff badge, select Insert image:

| SIS-DMA_30.docx  |     | Version: 1.0.19468  | Page 10 of 10  |
| ---------------- | --- | ------------------- | -------------- |