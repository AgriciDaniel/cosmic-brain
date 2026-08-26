Configuration of Time Sheet Layouts

1  Configuration of Time Sheet Layouts

Summary

The configurable time sheet allows users to create their own time sheets. In HYDRA, you can configure

as many time sheets as you like, so time sheets can be created for various employee subgroups.

Prerequisite

The layout of the time sheets can only be modified if the license PZW-ZNW is available.

 Configuration of time sheets

If a new time sheet is to be created it first has to be created in the configuration of time sheets.

 Report Designer

An existing report can be changed by calling the Report Designer function.

MOC_ReportPersonalTimeSheet.docx

Version: 1.1.20816

Page 1 of 7

Configuration of Time Sheet Layouts

Filing time sheets on the HYDRA server

Time sheets are saved within the report path of the HYDRA server. The "MOCREP"  path is required for

this purpose. The path always has to refer to <system>/custom/reports. It is not allowed to change this.

The current scope of MOC is taken into account when saving on the server:







If the scope is "User“ or "Local“, the report file will be saved as "<reportname>_local.lul“.

If the scope is "Custom“, the report file will be saved as "<reportname>_custom.lul“.

If the scope is "Standard“, the report file will be saved as "<reportname>.lul“.

The current MOC scope is considered for the load order:

  Scope "User“ or "Local“

File

from

the

report  directory  of

the

server

“<reportname>_local.lul”  prior

to

“<reportname>_custom.lul“ prior to “<reportname>.lul“. If none of these three files is available, it

is searched on the client (user=>local=>custom=>standard).

  Scope "Custom“

File from the report directory of the server "<reportname>_custom.lul“ prior to “<reportname>.lul“.

If none of these two is available, it is searched on the client (custom=>standard).

  Scope "Standard“

File  from  the  report  directory  of  the  server  “<reportname>.lul“.  If  this  file  is  not  available,  it  is

searched on the client (standard).

Starting the Report Designer

The currently selected and displayed time sheet can be modified by using the "Report Designer" button.

To do so, the entry "PersonalTimeSheet_10" is selected and the "edit" button is clicked.

MOC_ReportPersonalTimeSheet.docx

Version: 1.1.20816

Page 2 of 7

Configuration of Time Sheet Layouts

The report to be changed is shown in the "TemplateFile" field of the ReportConfiguration. The List&Label

Designer is started by clicking the "Report Designer" button.

These settings must not be changed.

MOC_ReportPersonalTimeSheet.docx

Version: 1.1.20816

Page 3 of 7

Configuration of Time Sheet Layouts

Editing functions

The  report  can  be  edited  by  clicking  the  "Report  Designer"  button.  Data  should  have  been  requested

beforehand. The external Report Designer is used for designing.

The following special features are available:

mpdvTranslate("language key“)

"Language  key“  is  an  entry  from  the  translation  file  in  the  form  "lkXXX“.  Depending  on  the

configured language, translations are performed in MOC.

mpdvTimeFromSeconds(<SekundenSeitMitternacht>)

A numeric value in seconds since midnight is converted to a time and formatted. Format: hh:ss

mpdvDuration(<SekundenSeitMitternacht>)

A numeric value in seconds since midnight is converted to a duration and formatted. Format: h:ss

mpdvScript("PzeReportingScriptBalance",<Kontostand>)

The entered account balance is formatted based on the configuration of the account.

By clicking the F1 key the manual about the integrated Designer  opens.

MOC_ReportPersonalTimeSheet.docx

Version: 1.1.20816

Page 4 of 7

Report structure:

Configuration of Time Sheet Layouts

The report container includes the PersonalData table including the data about the selected persons. For

every person there is the DailyData table including the daily data of the evaluation period as well as the

WageTypes table including the monthly results.

  The PersonalData table includes the page header that is displayed as header on every page of

the list and that includes personal data.

  Daily  data  including  weekly  and  monthly  totals  are  shown  in  the  sub-element  DailyData.

It also shows the  account  balances at the beginning  and end  of the month as well as the carry

forward of accounts for the subsequent month.

  The monthly wage types are shown in the WageTypes sub-report.

  The footer is displayed on each page of the list.

Field descriptions

List of variables/fields: Fields PersonalData

Data about the person is provided:

Data field

personaltimesheet.personaldata.accountingperiod.year
personaltimesheet.personaldata.errorcode
personaltimesheet.personaldata.evaluation_begin
personaltimesheet.personaldata.evaluation_end
personaltimesheet.personaldata.key_person
personaltimesheet.personaldata.period
personaltimesheet.personaldata.person.area
personaltimesheet.personaldata.person.card_id
personaltimesheet.personaldata.person.company
personaltimesheet.personaldata.person.costcenter
personaltimesheet.personaldata.person.department
personaltimesheet.personaldata.person.employee_subgroup
personaltimesheet.personaldata.person.firstname
personaltimesheet.personaldata.person.id
personaltimesheet.personaldata.person.lastname
personaltimesheet.personaldata.person.name
personaltimesheet.personaldata.personalaccounts.designation1
personaltimesheet.personaldata.personalaccounts.id1 - 8

Meaning

Year
Error code
Start of the settlement period.
End of the settlement period.
Key for linking the data sources
Settlement period
Area
Badge
Company
Cost center
Department
Employee subgroup
First name
Personnel number
Last name
Name
Designation, account 1-8
Account 1-8

MOC_ReportPersonalTimeSheet.docx

Version: 1.1.20816

Page 5 of 7

Configuration of Time Sheet Layouts

personaltimesheet.personaldata.personalaccounts_carryforward.balance1-
8
personaltimesheet.personaldata.personalaccounts_carryforward.designatio
n1 - 8
personaltimesheet.personaldata.personalaccounts_carryforward.id1 - 8

personaltimesheet.personaldata.personalaccounts_endbalance1 - 8

personaltimesheet.personaldata.personalaccounts_startbalance1 - 8

personaltimesheet.personaldata.personalremainingleave
personaltimesheet.personaldata.personaltimesheetconfiguration.id
personaltimesheet.personaldata.shifttype
personaltimesheet.personaldata.timesheet_identification

Account carryforward, account 1-8
Des. account carry forward, account 1-
8
Number, account carry forward,
account 1-8
Account balance, end of month,
account 1-8
Account balance, beginning of month,
account 1-8
Remaining leave
Number of the time sheet
Shift type
Identification, time sheet

List of variables/fields: Fields  DailyData

The person's daily data is provided:

Data field

personaltimesheet.dailydata.absence.color
personaltimesheet.dailydata.absencetime
personaltimesheet.dailydata.absencetime.personalperformance
personaltimesheet.dailydata.balance.account1 - 8
personaltimesheet.dailydata.accountbalancechange1 - 8
personaltimesheet.dailydata.accountingperiod.begin_date
personaltimesheet.dailydata.accountingperiod.end_date
personaltimesheet.dailydata.accountingperiod.period
personaltimesheet.dailydata.accountingperiod.year
personaltimesheet.dailydata.actualattendancetime
personaltimesheet.dailydata.actualtargettime
personaltimesheet.dailydata.actualtime
personaltimesheet.dailydata.actualtime.personalperformance
personaltimesheet.dailydata.actualtime.without_paidbreak
personaltimesheet.dailydata.attendancetime
personaltimesheet.dailydata.attendancetime.personalperformance
personaltimesheet.dailydata.authorization.color
personaltimesheet.dailydata.authorized
personaltimesheet.dailydata.begin_date
personaltimesheet.dailydata.break
personaltimesheet.dailydata.certify
personaltimesheet.dailydata.clocking.status
personaltimesheet.dailydata.clocking.type
personaltimesheet.dailydata.clocking_begin
personaltimesheet.dailydata.clocking_end
personaltimesheet.dailydata.comment
personaltimesheet.dailydata.commentary
personaltimesheet.dailydata.costcenter.executing
personaltimesheet.dailydata.date
personaltimesheet.dailydata.duration
personaltimesheet.dailydata.edited
personaltimesheet.dailydata.evaluation_date
personaltimesheet.dailydata.evaluation_date_clocking
personaltimesheet.dailydata.indicator_summerwintertime_in
personaltimesheet.dailydata.indicator_summerwintertime_out
personaltimesheet.dailydata.infofield01 - 20
personaltimesheet.dailydata.key_person
personaltimesheet.dailydata.modified_by
personaltimesheet.dailydata.modified_ts
personaltimesheet.dailydata.oncallduty
personaltimesheet.dailydata.overtime
personaltimesheet.dailydata.overtimeperiod_begin

Meaning

Absence color
Absence time
Workday result: absence
Account balance 1-8
Account modifications 1-8
Start of the settlement period.
End of the settlement period
Settlement period
Year
Attendance time
Difference attendance/ target time
Actual time
Workday result: actual time
Actual time without paid breaks
Attendance time
Workday result: attendance time
Authorization color
Authorized
Start date
Break
Authorization comment
Clocking status
Status
Start of the clocking
End of the clocking
Comment from clocking
Abbreviation from clocking
Executing cost center
Date
Duration
Edited
Settlement date
Evaluation date
CEST
CEST
Information field 1-20
Key field
Editor
Processing time
On-call duty
Overtime
Start of the period for overtime

MOC_ReportPersonalTimeSheet.docx

Version: 1.1.20816

Page 6 of 7

Configuration of Time Sheet Layouts

calculation
End of the period for overtime
calculation
Start of the evaluation date
End of the evaluation date
Paid break
Designation of  payment day type
Payment day type
Company
Cost center
Personnel number
Name
Designation of working time day type
Working time day type
Beginning of rounded times
End of rounded times
Shift type
Authorization
Authorized
Stand-by duty
Status
Target time
Number of the time sheet
Total break
Wage type
Week
Weekday (0=Sunday, …, 6=Saturday)
Weekend color

personaltimesheet.dailydata.overtimeperiod_end

personaltimesheet.dailydata.overtimeperiod_evaluation_begin
personaltimesheet.dailydata.overtimeperiod_evaluation_end
personaltimesheet.dailydata.paidbreak
personaltimesheet.dailydata.paymentdaytype.designation
personaltimesheet.dailydata.paymentdaytype.id
personaltimesheet.dailydata.person.company
personaltimesheet.dailydata.person.costcenter
personaltimesheet.dailydata.person.id
personaltimesheet.dailydata.person.name
personaltimesheet.dailydata.personalworkingtimedaytype.designation
personaltimesheet.dailydata.personalworkingtimedaytype.id
personaltimesheet.dailydata.roundedtime_begin
personaltimesheet.dailydata.roundedtime_end
personaltimesheet.dailydata.shifttype
personaltimesheet.dailydata.signcertify
personaltimesheet.dailydata.signed
personaltimesheet.dailydata.standbyduty
personaltimesheet.dailydata.status
personaltimesheet.dailydata.targettime
personaltimesheet.dailydata.timesheet_identification
personaltimesheet.dailydata.totalbreak
personaltimesheet.dailydata.wagetype.id
personaltimesheet.dailydata.week
personaltimesheet.dailydata.weekday
personaltimesheet.dailydata.weekend.color

List of variables/fields: Fields WageTypes

The person's monthly report data is provided here:

Data field

personaltimesheet.wagetypes.person.company
Personaltimesheet.wagetypes.person.id
personaltimesheet.wagetypes.timesheet_identification
personaltimesheet.wagetypes.wagetype.designation
personaltimesheet.wagetypes.wagetype.duration
personaltimesheet.wagetypes.wagetype.id

Meaning

Company
Personnel number
Number of the time sheet
Wage type designation
Wage type duration
Wage type

MOC_ReportPersonalTimeSheet.docx

Version: 1.1.20816

Page 7 of 7

