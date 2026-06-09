Absence Planning

1  Absence Planning

Overview

Menu

Human resource management  Planning  Absence planning

Transaction code

pabp

Function authorization

pabp

You use the absence planning function to plan and display absences for persons and groups of persons.

Purpose

The  application  shows  the  planned  absences  in  descending  order  and  sorted  by  date,  i.e.  current  and

future absences are displayed on top. The requested absences are displayed in blue and italic font and

the rejected absence requests are displayed in red and italic font.

MOC_PersonalAbsencePlanning.docx

Version: 1.2.18468

Page 1 of 6

Absence Planning

In general, absence times and attendance times are managed via clocking records. The Type field of the

clocking  records  is  used  to  identify  absence  and  attendance  times.  Absence  is  the  clocking  type  for

absence times.

The  system  automatically  generates  absence  records  during  the    Labor  time  calculation  if  no  clocking

records are available for employees, although working time is planned. When it comes to absences, the

system  subtracts  the  standard  breaks  defined  in  the  working  time  model.  You  can  create  absences

manually and you can edit absence records that are generated automatically.

The system differentiates  between  planned and unplanned absences. If an  employee is absent, though

working time is planned for that day and there is no absence planning, then it is an unplanned absence.

In  the  Control  of  labor  time  calculation,  you  can  configure  how  unplanned  absences  are  generated.

The system automatically deletes unplanned absences during  Labor time calculation, if attendance time

exists for the relevant day.

When you plan absences, the below priorities apply:

1st priority from Control of absences

and within the same priority:

1st person, 2nd cost center, 3rd area, 4th company

This means that within the same priority, personal planning overwrites planning on cost center

level. Absences for an area take priority over absences relating to companies.

Selection criteria

The application provides the following selection criteria:

Status

The selection is narrowed  down to the requested absences. Example:  You can  use this selection

criterion to display a processing list of all holiday requests that have not yet been approved.

This field is only available if the extension PersonalAbsencePlanningStatus is activated.

Field descriptions in the Absence tab

Company, personnel selection

If you want to plan an absence, you use these fields to select a person or a group of persons. You

must  additionally  select  the  company  if  several  companies  are  managed  in  the  system  and  the

allocation by company is not clear and unambiguous.

MOC_PersonalAbsencePlanning.docx

Version: 1.2.18468

Page 2 of 6

Absence Planning

Valid from, valid until

Start and end time of the planned absence.

Payment

Enter the payment day type used to allocate the absence time. If specifications are defined for the

selected  payment  day  type  in  the  Control  of  absences,  the  system  automatically  enters  these

specifications  in  the  absence  planning  when  you  enter  this  payment  day  type.  If  the  Modification

enabled  option  is  not  checked  in  the  Control  of  absences,  the  relevant  fields  are  blocked  in  the

graphical user interface. Therefore, you cannot change these entries.

Comment

Comment on the absence that can be entered by the employee when requesting the absence. The

Attendance  overview  shows  this  comment  for  the  relevant  period.  The    Personnel  Scheduling

shows this comment in the tooltip of the relevant days.

Internal comment

The  internal  comment  is  only  visible  when  you  plan  and  edit  absences  in  the    Personnel

Scheduling.

This field is only available if the extension ABSPLAN_PZW82 is activated.

Number of calendar days

The field Number of calendar days shows the absence time in calendar days for absences with a

subsequent  payment  (defined  in  the  Control  of  absences  application,  tab  Settings,  section

Continued pay).

Duration

Planned target time

If  you  select  this  field,  the  system  generates  an  absence  with  the  duration  of  the  planned  target

time.

Planned normal time

If  you  select  this  field,  the  system  generates  an  absence  with  the  duration  of  the  planned  normal

time. For employees with flextime or flexible shifts, this time can deviate from the target time.

Average working time

If you select this option, the system offsets the absence against the average working time specified

in the HR master data.

Absence

If you select this field, the system uses the duration entered below for the absence time.

MOC_PersonalAbsencePlanning.docx

Version: 1.2.18468

Page 3 of 6

Absence Planning

Time from, time until

Time of the planned absence. The Workplace assignment integrates the period entered here if it is

at the beginning or end of the shift. If only one of the two fields is completed, the planned absence

starts  or  ends  automatically  at  the  beginning  or  end  of  the  shift.  The    Labor  time  calculation  also

integrates this period, if it is not a partial absence (see the field "partly absent") or a half day off.

The two fields are only available if the extension ABSPLAN_PZW82 is activated.

Authorization required

Use  this  option  to  specify  whether  the  absence  and  the  respective  wage  type  postings  must  be

approved.

Partly absent, Fill up target time to

Enter percentage values in this field. Values between 1 and 100 result in an absence record. The

absence

record

is  created

in  any  case,  even

if

the  employee  was  present.

Use this field, for example, if an employee gets ill during working hours and goes home earlier. The

application calculates the following if  you enter "100"  in this field and  you select  the "Target time"

option for the Duration field: The attendance time is allocated as specified in the payment day type.

The application uses absence time (e.g. illness) to fill up the time that is missing to reach the target

time (100% of target time).

Field descriptions in the Settings tab

Validity

Use  these  options  to  specify  if  the  absence  planning  is  valid  for  all  weekdays  or  for  separate

weekdays  only.  Use  this  option,  for  example,  for  trainees  who  are  always  absent  on  the  same

weekday(s) (vocational school).

Previous illness

The fields Period of continued pay, Duration and Start date are displayed in this section if you plan

absences where the monitoring of continued pay is activated in the Control of absences.

Absence request

Shows the date and time of the absence request.

Monitoring of continued pay - previous illness

The  fields  Period  of  continued  pay,  Duration  and  Start  date  are  displayed  in  this  section  if  you  plan

absences where the monitoring of continued pay is activated in the Control of absences:

MOC_PersonalAbsencePlanning.docx

Version: 1.2.18468

Page 4 of 6

Absence Planning

If you use the selection list of the Duration field, a dialog opens where you can select the previous illness:

Once you have selected the illness, the system automatically enters the duration and the start date in the

relevant fields. Or you can manually enter the duration and the start date.

Toolbar

 Approve application

Function authorization: pabp.sign

Click this button to approve a requested absence. Further processing is the same as approving a

request in the Escalation Management module.

The

button  Approve

application

is

only

available

if

the

extension

PersonalAbsencePlanningSign is activated.

MOC_PersonalAbsencePlanning.docx

Version: 1.2.18468

Page 5 of 6

Absence Planning

 Reject application

Function authorization: pabp.reject

Click  this  button  to  reject  a  requested  absence.  Further  processing  is  the  same  as  rejecting  a

request in the Escalation Management module.

The

button  Reject

application

is

only

available

if

the

extension

PersonalAbsencePlanningReject is activated.

 Personnel Scheduling

Click this button to call the  Personnel Scheduling.

The  Personnel

scheduling

button

is

only

available

if

the

extension

PersonalAbsencePlanningNewLinks is activated.

 Labor Time Maintenance

Click this button to call the Labor Time Maintenance.

The  Labor

time  maintenance  button

is  only  available

if

the  extension

PersonalAbsencePlanningNewLinks is activated.

 Reset labor time calculation

Click this button to call the function Reset labor time calculation

The  button  Reset

labor

time  calculation

is  only  available

if

the  extension

PersonalAbsencePlanningNewLinks is activated.

MOC_PersonalAbsencePlanning.docx

Version: 1.2.18468

Page 6 of 6

