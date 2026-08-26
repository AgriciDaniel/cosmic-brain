Scrap Statistics

1  Scrap Statistics

Overview

The scrap statistics provide a tool that allows not only the scrap quantity to be reported, but also all of the

scrap reasons that applied during a selected period. In it, scrap recorded automatically  is considered in

the evaluation. The scrap statistics use graphic illustrations to provide the user with a hit list of the most

frequent scrap reasons.

Integration

The order-related log records for the record type "T" form the data basis used to display quantities in the

scrap statistics. These are generated as a result of manual partial confirmations during OP interruptions

or log-offs (if quantities are entered in the process) or are caused by automatic entry of scrap quantities.

Selection criteria

The application provides the following selection criteria:

Workplace from … to …

Select  the  log  records  posted  to  the  workplace  that  was  entered,  the  responsibility  area  of  which

the user has authorized rights to. You can also run a search using wildcards in the field.

Group from … to …

Select  the  log  records  posted  to  the  workplace  that  was  entered,  the  responsibility  area  of  which

the user has authorized rights to, and that are assigned to the entered group. You can also  run a

search using wildcards in the field.

Cost center

Select  the  log  records  posted  to  the  workplace  that  was  entered,  the  responsibility  area  of  which

the  user has  authorized rights to,  and that are assigned to the entered cost center.  You can also

run a search using wildcards.

Date from ... to ...

The  time  period  entered  restricts  the  selection  by  log  records.  Select  the  log  records  that  have  a

posted shift date or login date within the defined period.

The  preset  value  is  "Today  minus  7  days"  to  "Today".  The  date  is  calculated  based  on  the

Gregorian calendar.

Shift 1, 2, 3, 4

Within the entered period, only those log records are selected that are assigned to the shift entered

according to the shift model.

HWEB_ScrapStatistics.docx

Version: 1.0.1362

Page 1 of 3

Operations that are logged in during the currently running shift at the time the data

are selected are not considered, because no log records have been generated for

Scrap Statistics

them yet.

Time from … to …

The  time  period  entered  restricts  the  selection  by  log  records.  Select  the  log  records  that  have  a

start date within the defined period. The preset value is from "12.00 AM" to "11.59 pm".

Scrap statistics

The scrap statistics detail  application  generates a table  view of all of the scrap reasons accrued over a

selected period of time along with the scrap quantity. The order-related log records for the record type "T"

form  the  data  basis  for  the  selection.  The  quantities  calculated  generally  relate  to  the  primary  quantity

unit. When these are summed up, the different quantity units are not converted.

In the scrap statistics, only operations are displayed that posted at least one partial confirmation

with scrap during the evaluation period.

The following fields are displayed in the table:

Workplace

Workplace number

Order

Order number of the order/ operation.

Operation

Operation number for the operation

Article

Article number of the operation.

Reason

Unique number for a stored scrap reason.

Scrap reason

Designation for a scrap reason.

Scrap (P)

The  scrap  column  shows  the  scrap  quantity  relating  to  scrap  reason,  workplace  and  order/

operation.

HWEB_ScrapStatistics.docx

Version: 1.0.1362

Page 2 of 3

Scrap Statistics

Please keep in mind that the scrap quantity shown may also be negative in certain constellations.

This can be the case, for example, if scrap is offset against yield.

Scrap rate

Proportion  of  scrap  (primary  quantity  unit)  as  compared  to  the  total  quantity  produced  (primary

quantity unit) for an operation during the evaluation period.

The  term  total  quantity  is  understood  as  the  sum  total  of  all  four  quantity  accounts  (yield,  scrap,

rework,  open  quantity).  Please  keep  in  mind  that  the  rework  quantity  and  open  quantity  is  not

shown in the scrap statistics.

Calculation:

Scrap rate = 100.0 * Scrap / (yield + scrap + rework + open quantity)

Graphic scrap statistic

After values have been collected to be shown in a chart, a menu item "Graphic scrap statistic" will appear

to  the  left  of  the  menu  item.  The  following  graphics  are  displayed  after  this  detail  application  has  been

called up:

Comparison yield - scrap detail application graphic

This detail application provides a comparison of the yield and scrap quantity shown in the form of a bar

chart. In it, the bars represent the relationship between the two quantity types.

Scrap hit list (scrap reasons) graphic

The  scrap  hit  list  (scrap  reasons)  is  a  compilation  of  the  recorded  scrap  quantities,  grouped  by  scrap

reason and shown in graphic form. The bar chart shows in each bar one cumulative value for each scrap

reason and the proportion in percent based on the total scrap quantity calculated in the evaluation period.

Scrap hit list (workplaces) graphic

The scrap hit  list (workplaces) is a compilation  of the  recorded scrap  quantities,  grouped  by  workplace/

machine and shown in graphic form.

The  bar  chart  shows  in  each  bar  one  cumulative  value  for  each  scrap  reason  for  all  highlighted  entries

and the proportion in percent based on the total scrap quantity calculated in the evaluation period.

HWEB_ScrapStatistics.docx

Version: 1.0.1362

Page 3 of 3

