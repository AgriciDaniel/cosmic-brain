Personnel day results

1  Personnel day results

Overview

Menu

Human resources management  Incentive wage  Personnel day results

Transaction code

perpd

Function authorization

perpd.*

The application "Personnel day results" offers an overview of incentives relating to individual persons.  The

"Personnel day results" application adds up information from the time ticket of the relevant person.  The

evaluation lists one line per person and day and displays the result in a summarized form for the day. The

evaluation is used to check piecework results of the employee.

Only persons are displayed on the system who are actually working at the company.  Also, only persons

are displayed that have an LLE premium indicator attached.  Person days with a value for the result columns

are always displayed, even if the person has already left or does not have a premium indicator.

MOC_DailyPersonalPerformance.docx

Version: 1.1.20367

Page 1 of 4

Field descriptions

Performance level

The performance level is calculated from the standard time and duration.

Personnel day results

Duration

The duration includes the actual time to calculate the daily performance efficiency rate.

The  actual  time  depends  on  the  setting  for  the  "Incentive  wages"  in  the  field  "Piecwork  calc.  of

perf.eff.rate" of the set calculation time for the "Daily perf. effc. rate":

Only in the BDE:

Contains the sum of the actual time of the daily piecework time tickets.

From BDE and PZE

The actual time for piecework is calculated daily from the PZE time of the person minus the time that

is collected on other time tickets.

Times of the time ticket types are deducted in the PZE time which are:

Time wage

On-the-job training

Overhead costs

Waiting times

Group premiums The remaining time is the actual time to calculate piece work in the person day

results.

The PZE time Tpze derives from the time ticket with the time type "Attendance". These are generated

as follows:

1. If there is a wage type with an activated indicator "Personnel time for incentive wage", then the

PZE time derives from the "PZE wage type postings" and is the sum of all wage types with active

indicator "Personnel time for incentive wage".

2. If there is no wage type with the indicator "Personnel time for incentive wage", then the PZE time

is taken from the PZE daily result.

Standard time

The column includes the standard time from the piecework tickets.  It also contains the bonuses.

MOC_DailyPersonalPerformance.docx

Version: 1.1.20367

Page 2 of 4

%100DauertVorgabezeiradLeistungsgGRPKARGKEAZLpzeTTTTTTIstzeit

Time ticket duration

This is the duration of all time tickets of an employee per day. An exception is the time ticket with the

Personnel day results

time type "Attendance".

PZE time

Duration from time tickets of the time type "Attendance".

BDE time

This column is not filled in the standard.

Start, end

This time period shows the time tickets from this person's BDE postings.

Max. perform. level, min. perform. level

You can find in this colum the min. and max. performance level from the piecework time ticket for a

specific person on this day.  This allows outliers to be found quickly.

Archived

Archived, daily results cannot be recalculated.

Year, month, calendar week, day

You can activate these columns with the column configurator and get a statistical view.

Toolbar

Time tickets

Branching to the time tickets for the selected "Person day".

Labor time maintenance

You can directly go to "Labor time maintenance" to edit time in the Personnel Time Management.

Order-related postings

This button directly opens the order-related posting dialog to correct or analyze times of the Shop

Floor Data Collection module.

MOC_DailyPersonalPerformance.docx

Version: 1.1.20367

Page 3 of 4

Detail applications

There is a pivot table integrated in the detail panel.  This pivot table can be used to create summary reports

based on the data displayed in the table.

Personnel day results

MOC_DailyPersonalPerformance.docx

Version: 1.1.20367

Page 4 of 4

