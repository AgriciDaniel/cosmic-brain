Attendance Overview

1  Attendance Overview

Overview

Menu

Human resources management  Reports  Attendance overview

Transaction code

paov

Function authorization

paov

A person's current status is shown in the attendance overview

Selection criteria

The application provides the following selection criteria:

Status

The  flags  can  be  used  to  select  whether  to  display  those  who  are  present,  persons  who  are

planned absent or who are unplanned absent or who have time off.

MOC_PersonalAttendanceOverview.docx  Version: 1.0.18468

Page 1 of 3

Attendance Overview

Field descriptions

Status

Present since

The employee is present since the point in time displayed. The date is only shown if it deviates from

the current date.

Absent since

The status Absent since is displayed if the employee is absent, if he was present within the last six

hours and if no working time is planned at the current point in time.

Planned absent

The employee is absent and absence planning exists.

Unplanned absent since

The employee is absent and, based on the planned shift time or the core work time for flextime and

flexible shift employees, should be present.

Off

The employee is absent and no work time is planned for the current day.

Off until

The  employee  is  absent  and,  based  on  the  working  time  schedule,  should  be  present  at  the

specified point in time.

Off since

The  employee  was  unplanned  absent  and  the  planned  shift  or  rather  core  time  is  already  over.

Person does not clock

For  employees  for  whom  the  flag  Person  does  not  clock  is  set  in  the  HR  master  data,  the  flag

"Status person clocks" is not displayed in the skeleton time.

Location

For  employees  who  are  present,  the  location  of  the  terminal  at  which  the  employee  clocked  in  is

displayed in this column.

Present at

For  absent  employees,  displayed  in  this  column  is  on  which  day  the  employee  should  again  be

present according to current planning.

Absence

Designation of the planned absence reason.

The  display  showing  absences  may  be  hidden  depending  on  which  user  is  logged  in.  The

configuration that defines which absences should be hidden is made via the responsibility area in

the  absence  payment.  If  a  responsibility  area  is  entered  for  an  absence  payment,  then  these

absences  are  only  shown  for  the  users  that  have  the  Display  authorization  for  this  responsibility

area:

The absence time is hidden for users who do not have authorization for the relevant responsibility

area.

MOC_PersonalAttendanceOverview.docx  Version: 1.0.18468

Page 2 of 3

Attendance Overview

Any  discrepancies  in  the  attendance  and  absence  overview  may  have  been  caused  because

persons have forgotten to clock out. These persons should be listed as absent on the next day

at the latest.

In the Date column for the Status category, a date may only be displayed if it deviates from the

current day.

Toolbar

 HR master data

Call up HR master data.

 Labor time maintenance

Calling up Labor time maintenance:

Personnel scheduling

Calling up Personnel scheduling.

 Send e-mail

If an e-mail address is defined for the person selected in the HR master data, then an e-mail can be

created via this flag with this person as the addressee.

Detail applications

Operations logged on

For the person selected, the Operations logged on are displayed in the list Attendance overview.

Image

If an image is stored in the HR master data, then it is displayed here.

MOC_PersonalAttendanceOverview.docx  Version: 1.0.18468

Page 3 of 3

