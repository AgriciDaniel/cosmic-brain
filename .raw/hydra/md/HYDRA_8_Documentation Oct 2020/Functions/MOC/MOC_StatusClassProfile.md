Status Class Profile

1  Status Class Profile

Summary

Menu

Operating facilities management  Status analyses  Status class profile

Transaction code

stclpf

Function authorization

stclpf

Usage

The status class profile evaluates the status classes by shift, by day, by calendar week or by month over

a certain period of time. The result depends on the selection and therefore on the selection criteria made

available on the selection panel.

Selection criteria

The application provides the following selection criteria:

Workplace

Search by machine/ by workplace. You can run a search using wildcards.

Group

Search by workplaces/ machines that are assigned to the group that was entered. The selection is

made using the field Group in the  workplace/ machine configuration.  You can run  a search using

wildcards.

Cost center

Search  by  workplaces/  machines  that  are  assigned  to  the  cost  center  that  was  entered.  You  can

run a search using wildcards.

Company

Search by workplaces/ machines that are assigned to the company that was entered. You can run

a search using wildcards.

Responsibility area

This selection criterion references the responsibility area in the machine master data. Keep in mind

that only machines are displayed that the user has also assigned responsibility areas to.

Report group

This selection criterion references the report groups. All machines or workplaces are displayed that

are assigned to the selected report group.

MOC_StatusClassProfile.docx

Version: 1.0.1362

Page 1 of 4

Status Class Profile

Short designation

This  selection  criterion  references  the  short  name  of  the  machines  in  the  master  data.  All  of  the

machines or workplaces are displayed that match the string that was entered. You can also run a

search using wildcards.

Designation

This selection criterion references the short name of the machines and workplaces in the machine's

master  data.  The  machines  or  workplaces  are  displayed  that  are  identical  to  the  string  that  was

entered. You can also run a search using wildcards (placeholders *) in this field.

Date

The period of time from which data should be selected.

When  selecting  via  shift(s),  the  shift  date  is  evaluated,  whereas  when  selecting  by  time,  the

selection is based on the start date. Please keep in mind that a selection by shift is only supported

for BDE and MDE data, not for WRM data.

Shift(s)/ time

Selection by shift (only BDE and MDE events) or by time period. If no shift has been selected, all

shifts are considered.

The two times each refer to the start or to the end of the date periods listed above.

Order/ article

When you choose the option "Order", you must enter an order or an article.

For  this  kind  of  evaluation  type,  only  the  finished  BDE  postings  are  considered.  If  the  order  is

currently still running on the machine, the time period between the last log on and now is not taken

into  account.  As such, it  is by all means possible that there are  differences between the machine

evaluation  and  the  order-related  evaluation.  Only  BDE  postings  are  taken  into  account  that  have

started during the evaluation period. If necessary, the selection period must be selected so that the

BDE  postings  that  are  to  be  taken  into  account  are  within  this  selection  period.  For  this  order-

related evaluation, MPDV recommends the shift-related selection option.

The  following  illustration  shows  an  example  of  an  overlapping  of  BDE  and  MDE  postings.  The  BDE

postings take priority in this evaluation type. The yellow areas illustrate the results of this evaluation. MDE

quantities and durations are calculated on a pro rata basis to achieve the result.

MOC_StatusClassProfile.docx

Version: 1.0.1362

Page 2 of 4

Status Class Profile

If orders are logged  on in parallel at the machine, for this evaluation type, the full machine time (yellow

area)  and  quantity  is  assigned  to  each  order.  The  fact  that  orders  are  run  in  parallel  will  not  result  in  a

proportionate calculation.

Resource type/ resource

When choosing the option "Resource", a resource must be entered.

For  this  kind  of  evaluation  type,  here  again  only  the  finished  postings  are  considered.  For  this

evaluation type, only the resource postings take priority. The principle is the same as when running

an evaluation by order.

Additional selection notes

Long term data

If the selection period exceeds the period for the online data  area, the system applies the implicit

solution and selects the medium-term data area as well. Therefore, there is no need for an explicit

activation in order to be able to access the medium-term data set.

MOC_StatusClassProfile.docx

Version: 1.0.1362

Page 3 of 4

Status Class Profile

Determining a shift-adjusted quantity

This option known from MDE  7.2  is set by default in MOC. What this means  is that postings that

were generated as a result of a shift change are not considered when determining the quantity. All

that is accounted for here is the exact moment when a machine status was set. If this moment is

outside of the evaluation interval, in this case the output will be 0.

Status class profile detail application

Tabular presentation of the status class profile with the following columns:

Shift date/ shift/ calendar week/ year

The durations of the status classes are displayed per shift (i.e. shift date/ shift number). Calendar

week, month and year (based on the shift date) are provided as additional sorting/ grouping criteria.

Status class/ abbreviation/ designation

Number, abbreviation and designation used for the status class

Duration

Time duration in which the status class was created/ set within the evaluation period.

Quantity

Number of times that the status class was created/ set within the evaluation period.

Pivot table detail application

You can evaluate status classes based on additional criteria in the pivot table detail view.

The bar colors in the chart are set "arbitrarily" using a color chart defined internally.

MOC_StatusClassProfile.docx

Version: 1.0.1362

Page 4 of 4

