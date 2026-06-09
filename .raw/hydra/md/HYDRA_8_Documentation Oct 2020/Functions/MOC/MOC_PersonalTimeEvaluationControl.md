Control of Labor Time Calculation

1  Control of Labor Time Calculation

Summary

Menu

Master Data --> Time and Labor Data --> Control of Labor Time Calculation

Transaction code

ptec

Function authorization

ptec

Rounding  rules  and  further  basic  parameter  settings  of  the  HYDRA-PZE  module  are  defined  within  the

control of labor time calculation function.

Utilization

In  addition  to  the  general  settings,  personal  parameters  are  available  for  the  control  of  labor  time

evaluation  to  be  able  to  define  exceptions  for  individual  people,  companies,  departments  or  employee

groups. The following priorities apply in this context:

1)  The general settings are read first.

2)  Entries  for  the  relevant  company,  department,  cost  center,  employee  and  other  employee

groups are then checked.

MOC_PersonalTimeEvaluationControl.docxVersion: 1.1.1362

Page 1 of 8

Control of Labor Time Calculation

When personal settings are created, only such fields that are to be overwritten have to be

entered. The other fields remain empty and are taken over from the general settings or from

personal parameters of lower priority.

If  customers  have  several  sites  or  different  companies  it  is  reasonable  to  create  personal

settings for each company. The fields of  which have to be filled out completely to prevent the

changes made to the general settings of one site/company from affecting all sites or companies.

A  user  is  only  allowed  to  edit  the  parameters  for  a  group  of  people  (e.g.  a  cost  center)  if  the

user is at least authorized for the assigned responsibility area of one person in this group.

Field description of the “validity” tab

Type

Defines whether or not it is about general or personal settings.

Company

Restricts the  validity  of personal  evaluation parameters to a particular company.  If this field is  left

empty, the personal evaluation parameters apply for all companies.

Personnel selection, value

Defines whether the personal evaluation parameters are to be configured for an employee or for a

group  of  employees.  The  available  employee  groups  include  area,  cost  center,  department,

employee subgroup, activity and employment relationship.

Valid from, until

Restricts  the  validity  of  the  personal  evaluation  parameters  to  a  particular  period.  If  only  one  of

these two fields is filled out, the entry is either valid from or until that date.

Priority

If personal evaluation parameters are defined for different employee groups and more than one of

these configurations apply to a single employee, the priority determines which entry takes priority.

Comment

A comment may be entered in this field.

This field  is  only  available  if  the modification  PersonalTimeEvaluationControlComment  is

enabled.

MOC_PersonalTimeEvaluationControl.docxVersion: 1.1.1362

Page 2 of 8

Control of Labor Time Calculation

Field description for the "settings" tab

Generate unplanned absences

Determines whether or not, when unplanned absences occur, a clocking record should be created

automatically that fills up the planned working time.

Authorization required:

An  absence  time  record  is  created  automatically  and  the  associated  wage  type  postings

require authorization.

Yes:

An absence record is created automatically.

No:

An absence record is not created automatically.

As attendance time:

Unplanned  absences  are  generated  as  attendance  time. This method  is mainly  applicable  to

employees  who  do  not  clock  to  post  their  target  time  as  attendance  time  for  Labor  time

statistics.

The

"as  attendance

time"  option

is  only  available

if

the  modification

PersonalTimeEvaluationControlAttendance is enabled.

The  selection  option  "person  does  not  clock"  is  only  available  if  the  modification

PersonalTimeEvaluationControlDoesNotClock is enabled.

Absence payment

This  field  is  used  to  define  a  payment  day  type  which  controls  the  allocation  of  unplanned

absences.  If  unplanned  absences  are  to  be  deducted  from  an  account,  it  should  be  ensured  that

the  previous  option  “Generate  unplanned  absence”  is  set  to  "yes"  (J),  as  times  requiring

authorization cannot be set off against other accounts.

Automatic shift identification

Yes: If a shift worker works another shift than the one planned, the system searches automatically

for the correct shift type from the shift day type. This is done by comparing the start times of

the shifts with the employee’s clock-in and selecting the shift where the time difference is the

smallest. If the "search shift type" option is activated by entering "yes", every shift worker must

still  be  assigned  a  shift  rhythm  model,  so  that  an  absence  record  can  be  created  if  the

employee is absent.

No:  The shift type specified in the shift rhythm model is always allocated. The normal time is used

as shift start time for flexible shift models.

MOC_PersonalTimeEvaluationControl.docxVersion: 1.1.1362

Page 3 of 8

Control of Labor Time Calculation

Only with the same target time:

The  shift  type  is  determined  automatically  as  if  "yes"  was  selected.  But  only  shifts  are

considered having the same target time as the planned shift.

The  option  "Only  with  the  same  target  time"  is  only  available  if  the  modification

PersonalTimeEvaluationControlShiftDetection is enabled.

Limit between shifts

The  percentage  value  entered  in  this  field  divides  the  time  between  the  previous  and  the

subsequent  shift  starts.  This  field  is  only  applicable  if  the  "search  shift  type"  option  has  been

activated by "yes". Example: If the early shift starts at 6.00 am and the late shift starts at 2.00 pm,

then there is a period of 8 hours between the shifts. With a gradation of 75 %, a clock-in during the

first  6  hours  (up  to  12.00  noon)  belongs  to  the  early  shift  and  a  clock-in  during  the  remaining  2

hours (after 12.00 noon) belongs to the late shift.

Adopt shift type of previous day

If this field is set to ‘J’ (yes), then absences are created with the same shift type that was allocated

on the previous day. This processing only  applies, provided that target  working time was planned

on the previous day.

Minimum duration of a break

If  a  clocking-out  and  the  subsequent  clocking-in  are  within  the  specified  period,  times  which  are

rounded will be set to the same time. Consequently, it can be specified here how long a break or

absence must take at least in order for it to be allocated.

Assign clocking record to current day until

Specifies until what time a clocking record should still belong to the current evaluation day, even if

no working time has been planned for this day. This refers to the clocking-in time. The value of this

field only needs to be changed if night shifts are supposed to belong to the following day. Default

value: 11.00 pm

Hours after end of skeleton time

This  period  specifies  how  long  after  the  planned  end  time,  clocking-ins  are  still  assigned  to  the

current evaluation day. For flextime employees this time refers to the skeleton time end and for shift

employees it refers to the shift end. Default value: 4.00 hours

Field description of the “rounding” tab

Rounding type

With the rounding  type  ‘exact to the second’, clocked times are processed exactly  to the second.

With rounding type ‘exact to the minute’, the seconds included in clocking times are always rounded

down to avoid rounding errors in the minute range which could be caused by the seconds. Default

value: "exact to the minute"

MOC_PersonalTimeEvaluationControl.docxVersion: 1.1.1362

Page 4 of 8

Control of Labor Time Calculation

Flextime day type

Interval

The  rounding  interval  determines  the  times  to  which  it  is  possible  to  round  up  or  down.  With  an

interval of e.g. 10 minutes and a working time start at 8.00 am (according to the working time day

type) , it is possible to round to 7.40 am, 7.50 am, 8.00 am 8.10 am, etc.

The following reference point applies for rounding: start of normal time

Waiting period, clocking-in

The  waiting  period  for  the  clocking-in  specifies  from  what  time  on  a  clocking-in,  within  the  period

given by the rounding interval, should be rounded up. Staying with the previous example, a waiting

period of 3 minutes would mean that the time is rounded down between 7:40 and 7:43 (to 7:40 am)

and that from 7:43 to 7:50 the time is rounded up (to 7:50 am). The rounding procedure is the same

in the other time intervals.

The value “0” is to be entered if a clocking-in is always to be rounded to the end of the period.

Waiting period, clocking-out

The waiting periods for clocking-outs can be defined separately and have the reverse effect, i.e., a

waiting period of 3 minutes, in the above example, would mean that the time is rounded down in the

first 7 minutes of the 10 minutes interval and then rounded up in the remaining 3 minutes. Example:

a limit of three minutes would mean that the time is rounded down to 4.00 pm between 4.00 pm to

4.07 pm and rounded up to 4.10 pm between 4.07 to 4.10 pm.

The value “0” is to be entered if it is to be rounded to the beginning of the period for clocking-outs.

Shift day type

Interval

The  rounding  interval  determines  the  times  to  which  it  is  possible  to  round  up  or  down.  With  an

interval of e.g. 10 minutes and a beginning of the working time at 8.00 am according to the working

time day type, it is possible to round to 7.40 am, 7.50 am, 8.00 am, 8.10 am. The configurations for

flexible shift workers are made in the shift fields.

The following reference point applies for rounding:

Beginning of the shift and end of the shift or beginning and end of the break.

Waiting period, clocking-in

The waiting period for clocking-in specifies from what time on a clocking-in, within the period given

by the rounding interval, should be rounded up. (see flextime day type).

Waiting period, clocking-out

The  waiting  periods  for  clocking-outs  can  be  defined  separately  and  have  the  reverse  effect  (see

flextime day type).

MOC_PersonalTimeEvaluationControl.docxVersion: 1.1.1362

Page 5 of 8

Control of Labor Time Calculation

Working time before skeleton time start

The time prior to the beginning of the working time can be rounded. For shift workers, the working

time refers to the start of the shift and for flextime employees it refers to the start of the skeleton

time. Rounding is performed using the parameters "interval" and "waiting time".

Working time after end of skeleton time

The time after the working time end can be rounded. For shift workers, the working time refers to

the end of the shift and for flextime employees it refers to the end of the skeleton time. Rounding is

performed using  the  parameters "interval" and  "waiting period".  If both  parameters are left empty,

the settings for interval and waiting period, which apply for the target time, are used.

Within working time

Rounds within the  working time. This allows for another interval to  be defined for rounding  during

the working time. For example: an interval of five minutes is defined for rounding within the working

time, in contrast to the ten minutes interval for the first clocking-in and last clocking-out.

Within the break frame

Defines rounding rules that are applicable during the break period.

Actual working time

Rounds the calculated actual working time. In this case, the employee’s last clocking-out is rounded

in order for the actual working time to meet the rounding criteria.

Overtime

Defines special rounding rules for any overtime worked.

Active

The "active" field determines for which groups of employees these rules are to be applied:

Shift day type:

The rounding rule applies for shift workers and flexible shift workers.

Flextime day type:

This rounding rule is used for employees working flextime.

'Yes':

The working time is rounded for shift workers and people working flextime.

'No': ´

The rounding rule  is not active. Consequently,  the  working time is neither taken into account

nor allocated in the lines "working time before beginning of skeleton  time" and  "working time

after end of skeleton time".

Interval

The rounding interval determines the times to which it is possible to round up or down.

MOC_PersonalTimeEvaluationControl.docxVersion: 1.1.1362

Page 6 of 8

Control of Labor Time Calculation

Waiting period

The waiting period specifies from what time on a clocking, within the period given by the rounding

interval, should be rounded up or down.

Field description of the "blocking/waiting period" tab

Reference

This  field  determines  whether,  for  flextime  employees,  the  following  waiting  period  rules  and

blocking rules refer to the "normal working time" (‘N’), the "core working time" (‘K’) or the "skeleton

time"  (‘R’).  It  is  possible  to  choose  between  planned  working  time  (‘S’)  and  normal  time  (‘N’)  for

waiting periods and blocking which occur during target time.

Start time - waiting time, blocking

The waiting period is  allocated in favor  of the  employee  if they arrive too late. The  waiting period

specifies  the  time  an  employee  is  allowed  to  arrive  late,  so  that  it  is  still  possible  to  round  to  the

start  of  the  working  time  according  to  the  working  time  frame.  The  "blocking"  option  defines  the

duration  prior  to  the  beginning  of  the  working  time  that  is  not  allocated  if  the  employee  clocks  in

during  this  period.  It  is  always  rounded  to  the  beginning  of  the  working  time  within  this  blocking

period.

End time - waiting time, blocking

The waiting period is allocated in favor of the employee if they leave too early. The waiting period

specifies the time an employee is allowed to leave too early, so that it is still possible to round to the

end of the working time. The "blocking" option specifies the duration prior to the end of the working

time that is not allocated if the employee clocks out during this period of time. It is always rounded

to the end of the working time within this blocking period.

MOC_PersonalTimeEvaluationControl.docxVersion: 1.1.1362

Page 7 of 8

Control of Labor Time Calculation

Target time - waiting period, blocking

A  waiting  period  and  blocking  period  for  the  target  time  may  be  entered  here.  The  target  time  is

allocated completely, provided that the target time has not been reach entirely but the time missing

is  still  within  the  entered  waiting  period.  In  contrast  to  this,  the  blocking  time  controls  that  no

overtime will be allocated if the employee leaves after reaching the target time but this time is still

within the blocking time period. Within the blocking time it is always rounded to the end of the target

time.

MOC_PersonalTimeEvaluationControl.docxVersion: 1.1.1362

Page 8 of 8

