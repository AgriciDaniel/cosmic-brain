Personnel Scheduling

1  Personnel Scheduling

Overview

HYDRA menu

Human resources management  Planning  Personnel scheduling

FEDRA menu

Advanced resource planning  Master data  Personnel scheduling

Transaction code

ptpl

Function authorization

ptpl

Available user fields

Where

Table

Object type/user field key

Source (type)

PNR/SYSTEM

HR master data (HR)

How to configure user fields?

Which user field types are available?

Personnel scheduling can be used to gain an overview of employee shift sequences and working times.

The annual overview shows an employee's shift and absence planning for the entire year.

MOC_PersonalTimePlanning.docx

Version: 1.3.23453

Page 1 of 10

As an  alternative to the annual overview,  you can  view  the information for a  group of employees  in the

Overview of periods.

Personnel Scheduling

Purpose

Below the selection criteria, the year overview shows the current account balance and the account balance

for the end of the year for the leave account (account with the number 4 when configuring accounts).

The  application  shows  absences  with  the  comment  from  the  Control  of  absences  or  from  the  absence

planning  for  the  respective  day.  For  days  with  multiple  planned  absences,  the  application  shows  the

absence reason with the greatest priority in the upper part and the absence that is of lower priority is shown

below. Absences that have been requested via the absence workflow but not yet approved are displayed

in italics.

For the staff displayed,  you can show additional columns in the grid. This  includes the person's current

account balances, the account balances at the start and end of the selected period and at the end of the

year.

By right-clicking, you can plan an absence, a personal shift type or a personal working time for the selected

period. In the Control of absences application, you can define the absences displayed in the context menu

and their colors. The submenu Personal day type shows the shift types of the working time day types.

MOC_PersonalTimePlanning.docx

Version: 1.3.23453

Page 2 of 10

Personnel Scheduling

In addition, you can plan Personal models and comments using the context menu. If a comment is defined

for a day and you go with the mouse over this day, the comment will be shown as tooltip in the calendar. A

small, red triangle in the top right edge of the relevant day shows if a tooltip is available.

Personal  models

and

comments

are

only

available

if

the

extensions

PersonalTimePlanningPersonalModels and/or PersonalTimePlanningComment are activated.

In  the  Overview  of  periods,  you  can  plan  absences  and  personal  shift  types  for  several  employees

simultaneously. To do so, select the relevant period for these employees. You can only plan an absence

and/or personal shift type for several employees simultaneously if you use the absence entry and/or the

shift type in the context menu.

In case two absences are planned for one day, you can only edit or delete the first absence (that

with the higher priority) using the Edit absence and Delete absence functions. Use the absence

planning function to edit the second absence.

This restriction does not apply if you enable the extension PersonalTimePlanning2Absences. If

you enable this extension, the context menu shows both absences and  you can edit or delete

these absences.

The table in the lower area of the window shows a list of the persons planned to be present and absent per

shift type. Use this list to check if enough employees are present for the shift. A distinction is made between

employees that are available, not available or off work (free).

In the Overview of periods, you can delete absences. To delete absences, two options are available. If you

select Delete complete absence, the complete absence is deleted as it has been planned before. If you

only want to delete a single day of a planned absence, select Delete selected period.

MOC_PersonalTimePlanning.docx

Version: 1.3.23453

Page 3 of 10

Personnel Scheduling

This option is only available if the extension pabpModPe is activated.

If the planned working time does not respect the rest period, the affected days will be highlighted in pink:

This option is only available if the extension PZW_RUHEZ is activated.

In the Overview of periods of the Personnel scheduling, the calendar weeks are displayed.

The calendar weeks are only available, if the extension PersonalTimePlanningCW is activated.

MOC_PersonalTimePlanning.docx

Version: 1.3.23453

Page 4 of 10

Integration

Employees  can  view  their  shift  plan  via  the  PZE  terminal.  The  configuration  is  described  in  the

documentation dealing with the terminal shift plan (only applicable if HYDRA is used).

Personnel Scheduling

Selection criteria

The application provides the following selection criteria:

Data to be displayed

Three information  items can be  displayed per  day. Use the three selection fields to specify  which

data should be displayed for a day.

Shift plan

Displays any possibly planned absence and the planned shift type on work days. For the days

evaluated, the application outputs actual data and for days that are not evaluated, the application

outputs the planning.

Absence

Displays any possibly planned absence.

Absence 2

Displays any possibly planned second absence for the day.

Attendance time

Displays the completed working time.

Target time

Displays the planned target time.

Normal time

Displays the planned normal time.

Planned start time

Displays the planned start time.

Planned end time

Displays the planned end time.

Working time day type

Displays the planned working time day type.

Shift type

Shows the shift type used for the previous days and the planned shift type for the current and

future days. To identify the planned shift type, the system uses both the personal day types and

the personal working time. The application only shows the shift type for planned working days.

MOC_PersonalTimePlanning.docx

Version: 1.3.23453

Page 5 of 10

Personnel Scheduling

Planned shift type

Displays the planned shift type from a personal shift rhythm model or a model stored in the HR

master data. The application only shows the planned shift type for planned working days.

Different shift type

This field always contains the actually used shift type if this shift type differs from the planned

shift type of the shift rhythm model defined in the HR master and/or a personal model.

Payment day type

Displays the planned payment day type.

Working time model

Shows the planned working time model.

Shift rhythm model

Displays the planned shift rhythm model.

Payment model

Shows the planned payment model.

The Working time model, Shift rhythm model and Payment model are only available if the

extension PersonalPlanningDataModels is activated.

Overtime type

Displays the planned overtime type.

Personal working time

Displays any possibly planned personal working time. The personal working time is represented

by an X.

Personal working time day type

Displays any possibly planned personal working time day type.

Personal shift type

Displays any possibly planned personal shift type.

Personal payment day type

Displays any possibly planned personal payment day type.

Personal working time model

Displays any possibly planned personal working time year model.

Personal shift rhythm

Displays any possibly planned personal shift rhythm model.

Personal payment model

Displays any possibly planned personal payment year model.

MOC_PersonalTimePlanning.docx

Version: 1.3.23453

Page 6 of 10

Personnel Scheduling

Personal overtime type

Displays any possibly planned personal overtime type.

On-call duty 1

Start time of the first interval of on-call duty.

On-call duty 2

Start time of the second on-call duty interval.

Show absence reason

If this option is disabled, the application shows all planned absences in “red” and with the text “N/A”

for "Not present (Nicht Anwesend)".

If  the  application  does  not  show  an  abbreviation  for  the  corresponding  days  in  the  graphic

absence  planning  after  you  have  planned  an  absence,  it  might  be  that  there  is  no  target  time

defined for these days. You can check the planned working time for the corresponding days in

the Working time information.

If you plan absences for a period in the past, in some cases the absence can only be displayed

after the labor time calculation has been carried out.

If you only change the period for a planned absence, the system only resets the respective period

and recalculates it with the next labor time calculation.

Field descriptions in the Overview of periods tab

Attendance rate

The attendance rate is calculated from the sum of the target time and/or normal time of the employees

planned to  be present divided by the sum of the target time and/or normal time of all employees.

When half days are off, the system only allows for the duration of the planned attendance time.

The result is displayed as a percentage and rounded (without decimal places) before totaling the first

shift.

Available

Staff who is planned to be present, i.e. the target and/or normal time for the day is greater than 0

hours.

Not available

Staff who is planned to be absent, i.e. an absence is planned for that day.

Free (off work)

Staff for whom no target and/or normal time has been planned, i.e. the employee is not required to

be present on this day.

MOC_PersonalTimePlanning.docx

Version: 1.3.23453

Page 7 of 10

Personnel Scheduling

On-call duty

The number of staff with on-call duty is displayed in the lower section of the overview of periods per

shift and as a grand total.

The specification as to whether the target time or normal time is used for the above-described

fields depends on the setting Identification of available staff on the basis of target time/ normal

time.

Toolbar

 Labor time maintenance

Click this button to call the Labor time maintenance.

 Labor time calculation

Click this button to call the labor time calculation.

The  option  Labor

time

calculation

is  only  available

if

the

extension

PersonalTimePlanningLinks is activated.

 Reset labor time calculation

Click this button to call the function Reset labor time calculation

The  button  Reset

labor

time  calculation

is  only  available

if

the  extension

PersonalTimePlanningLinks is activated.

 Absence planning

Click this button to call the absence planning.

 Year overview

Click this button to call the  Year overview. This button is only available if the  Year overview tab is

activated.

 Current account balances

Click this button to call the application Current account balances

The  button  Current  account  balances

is  only  available

if

the  extension

PersonalTimePlanningLinks is activated.

MOC_PersonalTimePlanning.docx

Version: 1.3.23453

Page 8 of 10

Personnel Scheduling

 Labor time schedule

Click this button to call the labor time schedule.

Settings for personnel scheduling

 Settings

Click this button to call up the settings for personnel scheduling.

Field description

Identification of available staff on the basis of target time/ normal time

If you have to plan additional shifts on the weekend or on days off, it may be required that the available

staff be identified based on the normal time because on such days there is usually no planned target

time. For flextime and flexible shift day types, the normal start and end time specify the duration of

the normal time. Note that this setting also specifies how the planned absences are displayed. For

example, leave is also displayed on weekends although it is not set off in the day evaluation due to

the missing target time. The display is updated only after you have refreshed the data.

MOC_PersonalTimePlanning.docx

Version: 1.3.23453

Page 9 of 10

Personnel Scheduling

Selection for planning

Use this option in the planning of a shift type to specify if only those shift types contained in the current

planning are to be displayed via the context menu or if a selection can be made from all of the shift

types available in the working time day types. The number of shift types to be displayed is limited to

10.

Shift type - case sensitive

In  totaling  the  employees,  depending  on  the  setting,  the  shift  types  are  not  case  sensitive.  For

example, the number of shifts identified by "F" and "f" is displayed as a common total.

Attendance rate

Use this option to specify for the logged in user if the attendance rate should be displayed. The setting

Identification of available staff on the basis of target time/ normal time specifies if the normal time or

the target time will be set off.

The settings for the display in personnel scheduling are stored per user.

MOC_PersonalTimePlanning.docx

Version: 1.3.23453

Page 10 of 10

