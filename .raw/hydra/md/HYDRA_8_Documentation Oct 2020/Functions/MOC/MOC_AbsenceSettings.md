Control of Absences

1  Control of Absences

Overview

HYDRA menu

Master data  Labor time  Control of absences

FEDRA menu

Advanced resource planning  Master data  Control of absences

Transaction code

abse

Function authorization

abse

You  use  the  Control  of  absences  application  to  configure  and  control  the  planned  absences  of

employees.

MOC_AbsenceSettings.docx

Version: 1.1.23494

Page 1 of 5

Control of Absences

Field descriptions

Field descriptions of the Absence tab

Abbreviation: Full-day absence

The  comment  entered  here  is  used  to  fill  the  field  Abbreviation  of  the  Absence  planning.  This

comment is therefore also entered in the graphic Absence Planning. With unplanned absences that

are  allocated  to  a  specific  payment  type  using  specified  evaluation  parameters,  you  can  use  this

field to define a different abbreviation for "unplanned" absences = "UNG". The new abbreviation is

then displayed in the absence year overview.

Abbreviation: Partly absent

If  a  part-time  absence  is  available  for  a  day,  this  comment  is  entered  instead  of  the  abbreviation

Full-day absence. You can then see in the graphic Absence planning, if the absence is a full-day or

a part-time absence.

Priority

Priority of the absence payment; possible values are 0 to 99; a higher value means higher priority. If

two  absences  are  planned  for  an  employee  on  the  same  day,  the  absence  with  higher  priority  is

used.

Percentage

Percentage used to multiply the planned time (e.g. 80% continued pay in case of sick leave or 50%

for half a leave day).

Category

Allocation of the absence to a particular group of absences. The different  absence categories are

displayed in the work day statistics.

Color

Color  used  to display the  absence  in  the graphic absence planning,  in the  year overview and  the

personnel scheduling.

Context menu

If  you  make  an  entry  in  this  field,  the  absence  is  displayed  in  the  context  menu  of  the  graphic

absence planning and the personnel scheduling. You can then assign this absence without calling

the editing dialog. The absences in the context menu are sorted by the value specified here. The

system also checks if the user is authorized for the responsibility area of the absence payment. The

context menu only shows entries the user is authorized for. You can enter values between 1 and 9.

If you use a value multiple times, the number of the payment day type is used for sorting within the

value.

MOC_AbsenceSettings.docx

Version: 1.1.23494

Page 2 of 5

Duration

  Target time

The absence time is calculated using the target time planned for this day in the  Working time day

Control of Absences

types.

  Normal time

The absence time is calculated using the normal time planned for this day in the Working time day

types.

  Average working time

The absence time is calculated using the average working time entered in the HR master data.

  Absence

The absence time is generated using the specified time.

Set target time as absence time

If this option is activated, the target time is used to specify the absence time planned for the day.

This  is  useful  if  the  normal  time  or  the  average  working  time  defined  in  the  HR  master  data  are

used  to  calculate  the  absence  time.  If  you  use  the  target  time  as  absence  time,  you  avoid  that

overtime or undertime is generated for the respective day.

Minimum duration

Only  after  the  minimum  time  specified  in  this  field,  an  absence  time  is  generated.  Example: With

short time, you use this setting to generate an absence only after the specified minimum time.

Maximum duration

If the absence time exceeds the  value entered here, it is cut to  this maximum duration.  Example:

You can use this option to limit an appointment at the doctor's to two hours.

Field descriptions of the Settings tab

Authorization required

The absence planning must be approved.

Generate complete absence despite attendance

If  this  option  is  set,  the  complete  absence  is  allocated  even  though  the  employee  was  present.

Example: This option must be set for half a leave day.

MOC_AbsenceSettings.docx

Version: 1.1.23494

Page 3 of 5

Control of Absences

Partly absent, Fill up target time to

Enter percentage values in this field. Values between 1 and 100 result in an absence record. The

absence record is created in any case, even if the employee  was present. The system then uses

the

entered

percentage

to

fill

up

the

target

time  with

absence

time.

The  absence  time  is  calculated  using  the  attendance  time  and  the  specified  percentage  of  target

time.

Use this field, for example, if an employee gets ill during the workday or when it comes to short-time

work.

Modification enabled

If  this  option  is  not  activated,  the  input  fields  in  the  absence  planning  dialog,  which  refer  to  the

default values defined here, are disabled. In this case,  you cannot change the values specified in

the relevant fields.

Display as planned absence

You  use  this  field  to  define  if  the  absence  is  used  to  display  the  employee  in  the  Overview  of

periods  of  the  Personnel  scheduling  as  available  or  not  available.  The  employees  are  then

integrated in the number of available employees in the Personnel scheduling although an absence

is  stored  for  the  respective  employees.  This  can  be  useful  with  part-time  absences  because  of

school or short time. If this option is deactivated, the graphic absence planning and the personnel

scheduling display the comment of part-time absences with planned absences.

Days  with  2  absence  times  planned  and  a  total  absence  time,  which  is  equal  to  the  target  or  the

normal time, are displayed as planned absence irrespective of the setting of this option. Example:

Half a leave day and half a day public holiday.

Compensation

Allocate actual time

Default setting. The absence time is added to the actual working time.

Allocate as undertime

The  absence  time  is  not  added  to  the  actual  working  time.  Using  the  overtime  type,  the  resulting

undertime is deducted from the account and there is no actual time displayed on the time sheet.

Allocate leave day, half a leave day

If one of the two fields is activated for absences, one day or half a day is deducted from the leave

account (account number 4). For half a leave day, the option "Partly absent" must not be set.

Absence may be requested

The button specifies whether you can request the absence time using the Web interface.

Request needs to be approved

This  parameter  is  used  to  specify  whether  the  absence  time  requested  via  the  absence  workflow

has to be approved by the supervisor or whether it is automatically approved.

MOC_AbsenceSettings.docx

Version: 1.1.23494

Page 4 of 5

Control of Absences

Color of requested absence

This parameter is used to specify the color used to display the absence requested via the absence

workflow  in  the  personnel  scheduling.  The  different  colors  help  to  distinguish  between  the

requested and the planned/approved absences.

The color for requested absences is only available if the extension abseApply is activated.

Continued pay

If you have entered a period of time in the field Period of continued pay, the system automatically

changes to the absence payment (specified in the field Subseq. payment) after the time specified

here. The period is counted in calendar days and does therefore not count the number of actually

planned working days and weekends. In Germany, the period of continued pay is usually 6 weeks.

You therefore enter 42 in the field Period of continued pay in Germany.

Upload to payroll accounting

These fields are only processed in a few customer-specific interfaces. You use the option Upload to

payroll accounting to specify if the absence is passed to the absence interface. In the field Absence

reason,  you  can  enter  a  number  or  name  that  is  different  to  the  one  specified  in  the  Absence

payment. You can also pass a control indicator.

MOC_AbsenceSettings.docx

Version: 1.1.23494

Page 5 of 5

