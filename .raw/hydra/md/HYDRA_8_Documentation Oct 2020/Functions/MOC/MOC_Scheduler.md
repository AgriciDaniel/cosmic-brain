Scheduler

1  Scheduler

Overview

HYDRA menu

System administration  System settings  Scheduler

FEDRA menu

System administration  System settings  Scheduler

Transaction code

sced

Function authorization

sced.*

Purpose

Use this application if you:

  wish to have an overview of the background jobs planned in the system,

  wish to plan or extend the planning of new background jobs.

Integration

All components, applications and functions use this application to execute background jobs.

Field descriptions - Command

Type

Type of the entry

S = Standard target in line with the MPDV installation.

C = Customer entry

Type

I = Interval:

Means cyclical execution, see the Interval tab

F = Fixed point(s) in time:

means the execution at specific points in time, see the Fix tab

O = execution once:

stands for the unique execution as soon as the point in time is reached, see the Once tab

Alterable

Non alterable: the command cannot be altered

Alterable: the customer may change the command.

Visible

Invisible: the command will no longer be displayed in the search mask

MOC_Scheduler.docx

Version: 1.0.23292

Page 1 of 4

Scheduler

Visible: the command will be displayed in the search mask

Product key

Product key (for license verification), this field will not be completed in case of customer entries.

License key

If this field is occupied, the scheduler entry will only be active if the licenses specified in the field are

available. Several licenses are separated by space characters. For customer entries this field must

not be used.

HYDRA user

HYDRA user number of the user, who entered the command.

PID

Process ID of the command to the extent that the command is being executed.

Command

Command to execute

Comment

Description/ Comment

Field description – Interval tab

If the interval type is selected in the General tab, the command can be controlled using the Interval tab.

Interval

Time difference between two command requests.

From

Earliest start time to execute a command

To

Latest start time to execute a command

Example:

Interval 00:05 AM, from 06:00 AM until 06:00 PM

between  06:00  AM  and  06:00  PM  this  command  will  be  called  every  5  min  by  the  central

computer.

Interval 12:05 AM, 06:00 PM until 6:00 AM

between 06:00 AM and 06:00 PM this command will not be called but only between 06:00 PM

and 6:00 AM of the next day.

Interval  00:10  AM,  From  and  To  empty

-

the  command  will  be  called  every

10 minutes.

MOC_Scheduler.docx

Version: 1.0.23292

Page 2 of 4

Scheduler

Field description - Fixed point in time tab

If in the "General" tab the type "Fix" or "Once" is selected, the  tabs "Fix" and/or "Once" will be displayed

with the same contents and functions. "Once" entries will always be executed as soon as the conditions

will meet again the specified criteria. "Fix" entries will always be executed as soon as the conditions will

meet the specified criteria. Blank fields mean that the evaluation of this field is irrelevant for the execution

of the command.

Hour, minute

Leads to a point in time to start the command

Day, month, year

Leads a fixed date to start the command

Weekday

Leads to a weekday to start the command

Button

By  clicking  on  this  button,  the  console  will  check  whether  the  indicated  date  and  weekday  match

each other. If not the entry from the Weekday field will be deleted.

Examples:

The combination of the entry possibilities leads to a multitude of variants,

1st: Type Fix, hour 23, minute 50, weekday Thursday, all other fields blank:

- the command will be started each Thursday at 11:50 PM

2nd: Type Once, hour 22, minute 00, day 1:

- the command will be started at the first of a month at 10:00 PM

3rd: Type Fix, hour 20, minute 15, weekday Monday, month 8:

- the command will be started at each Monday in September at 8:15 PM

4th.: Type Once, month 3:

- the command will be executed at one day in the month of April, if April is the current month,

the command will directly be executed

Please note: The months are specified from 0 – 11. 0  January 11  December

The weekdays are specified from 0 – 6. 0  Sunday 6  Saturday

MOC_Scheduler.docx

Version: 1.0.23292

Page 3 of 4

Scheduler

Field description – Status tab

Active

Green:  Command is currently active and will be executed if condition is met

Grey:

Command inactive, it is only saved to the database

Status

Green:

Command is being executed

Dark green:

Command is waiting for execution

Red:

Command could not be started (error)

Magenta:

Commando not licensed

Start / End of last run

Start and/or end date and time of the last command execution

MOC_Scheduler.docx

Version: 1.0.23292

Page 4 of 4

