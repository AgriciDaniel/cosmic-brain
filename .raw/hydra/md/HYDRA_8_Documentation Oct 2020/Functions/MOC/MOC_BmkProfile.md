PRA Profile

1  PRA Profile

Summary

Menu

Operating facilities management  Status analyses  RPA profile

Transaction code

rparp

Function authorization

rparp

Usage

The  RPA  profile  provides  status  information  for  a  specific  period  of  time  and  a  certain  number  of

workplaces. In it, the status of resource performance accounts that were assigned in a previous step are

consolidated and displayed by shift.

Selection criteria

The application provides the following selection criteria:

Workplace

Search by machine/ by workplace You can also run a search using wildcards.

Group

Search by workplaces/ machines that are assigned to the group that was entered. The selection is

made  using  the  field  Group  in  the  workplace/  machine  configuration.  You  can  also  run  a  search

using wildcards.

Cost center

Search  by  workplaces/  machines  that  are  assigned  to  the  cost  center  that  was  entered.  You  can

also run a search using wildcards.

Company

Search by workplaces/ machines that are assigned to the company that was entered. You can also

run a search using wildcards.

Responsibility area

This selection criterion references the responsibility area in the machine master data. Keep in mind

that only machines are displayed that the user has also assigned responsibility areas to.

Report group

This selection criterion references the report groups. All machines or workplaces are displayed that

are assigned to the selected report group.

MOC_BmkProfile.docx

Version: 1.1.1362

Page 1 of 4

PRA Profile

Short name

This  selection  criterion  references  the  short  name  of  the  machines  in  the  master  data.  All  of  the

machines or workplaces are displayed that match the string that was entered.  You can also run a

search using wildcards.

Designation

This field references the designation (in HYDRA: comment) used for the machines and workplaces

in the machine master data. At the bottom, only those machines are displayed that are identical to

the string that was entered. There is also the option to use wild cards (placeholders *) in this field.

Inclusive status for RPA 11

Accounts for the status for RPA 11 (usually, this is the "Production" status).

Date

The period of time from which data should be selected.

When selecting via shift(s), the shift date is evaluated, while when selecting by time the selection is

based on the start date. Please keep in mind that a selection by shift is only supported for BDE and

MDE data, not for WRM data.

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

MOC_BmkProfile.docx

Version: 1.1.1362

Page 2 of 4

PRA Profile

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

If the selection period exceeds the period for the online data area, the system applies the implicit

solution and selects the medium-term data area as well. Therefore, there is no need for an explicit

activation in order to be able to access the medium-term data set.

Determining a shift-adjusted quantity

This option known  from MDE  7.2  is set by default in MOC. What this means  is that postings that

were generated as a result of a shift change are not considered when determining the quantity. All

that is accounted for here is the exact moment when a machine status was set. If this moment is

outside of the evaluation interval, in this case the output will be 0.

MOC_BmkProfile.docx

Version: 1.1.1362

Page 3 of 4

PRA Profile

Overview of detail application

Shift date/ shift/ calendar week/ year

The durations in the resource performance accounts are displayed in groups by shift (i.e. shift date/

shift number).

Calendar  week  and  year  are  displayed  as  a  possible  sorting/  grouping  criterion.

The calendar week and the year match the shift date.

RPA/ abbreviation/ designation

When delivered from the factory, the durations set for the resource performance accounts 1-10 are

listed  in  the  pool  of  columns.  They  are  stored  there  with  their  abbreviation  and  can  be  shown  as

needed.

Duration

Time duration in which the status was created/ set within the evaluation period.

Quantity

Number of times that the status was created/ set within the evaluation period.

Duration detail application

In the duration detail application, the resource performance account durations are displayed in the form of

a  stacked  bar  chart.  They  are  displayed  in  chronological  form  (X  axis)  or  accumulated  to  shift  date  (Y

axis).  The color code for each of the resource performance accounts is in accordance with the standard

definitions.

Quantity detail application

In the quantity detail application, the number of statuses for the selected machines are displayed in the

form of a stacked bar chart, broken down by  RPA. They are displayed in chronological form (X axis) or

accumulated  to  shift  date  (Y  axis).  The  color  code  for  each  of  the  resource  performance  accounts  is  in

accordance with the standard definitions.

MOC_BmkProfile.docx

Version: 1.1.1362

Page 4 of 4

