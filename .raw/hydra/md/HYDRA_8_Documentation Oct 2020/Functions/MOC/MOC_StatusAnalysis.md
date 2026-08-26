Status Analysis

1  Status Analysis

Summary

Menu

Operating facilities management  Status analyses  Status analysis

Transaction code

stata

Function authorization

stata

Usage

Because of how flexible it is, the status analysis answers all questions relating to downtimes, malfunction

reasons and production times, information that is useful for the shift foreman and team leaders, from the

production controller to the production manager.

The recorded production times represent the basic data made available by the status analysis. The status

postings are provided here in the finest detail and using the pivot table function, they can be compiled to

generate informative reports.

Selection criteria

The application provides the following selection criteria:

Report group

This selection criterion references the report groups. All machines or workplaces are displayed that

are assigned to the selected report group.

Cost center

Search  by  workplaces/  machines  that  are  assigned  to  the  cost  center  that  was  entered.  You  can

search using wild cards.

Workplace

Search by machine/ by workplace. You can search using wild cards.

Responsibility area

This selection criterion references the responsibility area in the machine master data. Keep in mind

that only machines are displayed that the user has also assigned responsibility areas to.

Company

Search  by  workplaces/  machines  that  are  assigned  to  the  company  that  was  entered.  You  can

search using wild cards.

Group

Search by workplaces/ machines that are assigned to the group that was entered.

MOC_StatusAnalysis.docx

Version: 1.2.1362

Page 1 of 3

Status Analysis

Date

The period of time from which data should be selected.

When  selecting  via  shift(s),  the  shift  date  is  evaluated,  whereas  when  selecting  by  time  the

selection is based on the start date. Please keep in mind that a selection by shift is only supported

for ADE and MDE data, not for WRM data.

Shift/ time

Selection by shift or by time period. If no shift has been selected, all shifts are considered.

The two times each refer to the start or to the end of the date periods listed above.

Additional selection notes

Long term data

If the selection period exceeds the period for the online data area, the system applies the implicit

solution and selects the medium-term data area as well. Therefore, there is no need for an explicit

activation in order to be able to access the medium-term data set.

Determining a shift-adjusted quantity

This option known from MDE  7.2  is set by default in MOC. What this means  is that postings that

were generated as a result of a shift change are not considered when determining the quantity. All

that is accounted for here is the exact moment when a machine status was set. If this moment is

outside of the evaluation interval, in this case the output will be 0.

Status analysis detail application

The results that were found are displayed in this detail application in tabular form. The results answer the

question: When was a certain status recorded for which machine and for how long?

The following columns are shown, among others:

Workplace/ short designation

Number and short name of the workplace

Beginning/ end

Beginning period or ending period of the status respectively.

Shift date/ shift number

Shift date and shift in which the status applied.

Status/ status text

Number and designation of the active status

Duration

Duration of the status

MOC_StatusAnalysis.docx

Version: 1.2.1362

Page 2 of 3

Status Analysis

Quantity

The Quantity field reflects how often a status applied. Because only one status is displayed here at

a time, generally a 1 is displayed as the quantity.

A 0 is displayed  if the status was set due to an  automatic status change that took place during a

shift change and it is no different than the previous status (before the shift change).

Pivot table detail application

Available in the detail application "Pivot table" are data found that are used for a pivot analysis. Functions

such as those known from Microsoft Excel® can be used for this purpose.

The colors used in the graphic do not depend on the colors used for status configuration.

MOC_StatusAnalysis.docx

Version: 1.2.1362

Page 3 of 3

