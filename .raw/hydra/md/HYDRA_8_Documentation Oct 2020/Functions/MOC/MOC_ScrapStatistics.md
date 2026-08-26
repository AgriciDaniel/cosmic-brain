Scrap Statistics

1  Scrap Statistics

Overview

Menu

Order management  Order controlling  Scrap statistics

Transaction code

scrst

Function authorization

scrst

Any person in a company who wants to reduce scrap must have knowledge of how and where scrap is

accrued.  The  Scrap  statistics  provide  an  overview  of  all  scrap  reasons  and  scrap  quantities  that  were

recorded  in  a  specified  period  of  time.  The  report  also  includes  the  scrap  that  has  been  recorded

automatically. The Scrap statistics use graphic displays to show ranking lists of the most frequent scrap

reasons.

Integration

The order-related log records of record type "T" are the data basis used to display quantities in the scrap

statistics.  The  log  records  are  generated  on  the  shop  floor  terminal  when  part  quantities  are  manually

uploaded or when an operation is interrupted or logged off and quantities are recorded.

Selection criteria

The application provides the following selection criteria:

Workplace/short name/group/cost center/company/responsibility area

These fields specify the workplaces/machines that are used for the evaluation. To select an entry,

you access the master data of the workplace/machine configuration.

Article/article designation

Selection by article or article designation

Order/order type

You can limit the evaluation to one order or order type.

Date

Shift

Enter  a  period  of  time  to  narrow  down  the  log  records  displayed.  The  application  selects  the  log

records of record type "T" with a posting time that is included in the period of time specified.

In the period of time specified above, only those log records are selected that are assigned to the

shift specified.

MOC_ScrapStatistics.docx

Version: 1.5.18468

Page 1 of 4

Time

In the period of time specified above, only those log records are selected that were booked in the

Scrap Statistics

time specified.

Reason

Selection based on a specific scrap reason.

Sales order

If a sales order is assigned to the production order, this sales order can be used to select the data.

Project number

If a project number is assigned to the production order, this number can be used to select the data.

Report group

Use

the  option  Report  group

to  narrow  down

the  selection

to  a  specific  group  of

workplaces/machines. You must define the report group in the group configuration.

Show yield

If this option is enabled, the yield recorded in the specified period of time is also displayed for the

selected  operation.  Additional  entries  are  added  to  the  table.  Note:  the  column  Yield  is  not

displayed by default. Use the column configurator to show the column.

Check responsibility area

Using this option, the user can specify if the system checks the responsibility area of the workplace

or the responsibility area of the object operation/order to display data. To use this selection option,

you require the following function authorizations: scrstPerf + chkresp.

This selection option is only available, if you enable the extension scrst82.

Detail application Scrap statistics

The detail application Scrap statistics provides an overview of all scrap reasons and scrap quantities that

were recorded in a specified period of time. The data selected is based on the order-related log records of

record  type  "T".  The  quantities  identified  are  always  displayed  in  the  primary  quantity  unit.  To  total  the

quantities, the system does not convert any quantity units.

The  Scrap  statistics  only  show  operations  that  had  at  least  one  upload  of  a  part  quantity

including scrap in the specified evaluation period.

Note:  the  column  Yield  (P)  only  displays  yield  quantities,  if  the  option  Show  yield  is  enabled.  Yield  is

shown in a separate row for each order/OP and workplace.

MOC_ScrapStatistics.docx

Version: 1.5.18468

Page 2 of 4

Scrap Statistics

Notes on specific columns:

Scrap

The column Scrap shows the scrap quantity with reference to the scrap reason, the workplace and

the order/operation.

Note: the scrap quantity shown can also be a negative quantity in certain cases. For example, this

can be the case if scrap is offset against yield.

Scrap rate

Share  of  scrap  (primary  quantity  unit)  in  the  total  quantity  produced  (primary  quantity  unit)  of  the

operation in the evaluation period.

The  total  quantity  is  equal  to  the  total  of  all  four  quantity  accounts  (yield,  scrap,  rework,  open

quantity). Note: rework quantity and open quantity are not shown in the Scrap statistics.

Calculation:

Scrap rate = 100.0 * EGR_AUS / (ANR_GUTP+ANR_AUSP+ANR_NCHP+ANR_PRBP)

Detail application Comparison: yield - scrap

This  detail  application  provides  a  comparison  of  the  yield  and  scrap  quantity  (both  in  primary  quantity

unit).  The  comparison  is  shown  in  a  bar  chart.  The  bars  show  the  ratio  of  the  two  quantity  types.  The

percentage is visualized for each bar.

Note:  the  yield  displayed  is  calculated  using  the  total  of  all  yield  quantities  of  the  operations

identified. If the selection includes several process steps (workplaces), the yield quantities of all

workplaces selected are totaled. It does not matter if several operations of one order are then

included.

Use the application Order-related statistic to get an overview of one order only.

Detail application Scrap ranking list (scrap reasons)

The Scrap ranking list (scrap reasons) shows the scrap quantities recorded for the different scrap reasons

in a graphic form.

The  entries  selected  in  the  tabular  detail  application  control  the  display  of  the  bar  chart.  To  show  all

entries of the table in the graphic, select the complete table. To select the complete table, click the table

field in the top left corner. To select entries, we recommend to disable the option Show yield.

Each bar of the bar chart shows the totaled value for each scrap reason. The total is calculated using all

entries  selected.  The  bar  also  shows  the  percentage  of  this  scrap  reason  in  the  total  scrap  quantity

recorded  in  the  evaluation  period.  This  total  scrap  quantity  is  displayed  in  the  total  line  of  the  Scrap

statistics detail application.

MOC_ScrapStatistics.docx

Version: 1.5.18468

Page 3 of 4

Scrap Statistics

Example: the detail application Scrap statistics shows a total scrap quantity of 1,171 in the total line for a

selected period. If you select a single entry with a scrap quantity of 122, the graphic shows a percentage

of 14.42.

Detail application Scrap ranking list (workplaces)

The  Scrap  ranking

list  (workplaces)  shows

the  scrap  quantities  recorded

for

the  different

workplaces/machines in a graphic form.

The  entries  selected  in  the  tabular  detail  application  control  the  display  of  the  bar  chart.  To  show  all

entries of the table in the graphic, select the complete table. To select the complete table, click the table

field in the top left corner. To select entries, we recommend to disable the option Show yield.

Each  bar  of  the  bar  chart  shows  the  totaled  value  for  each  workplace.  The  total  is  calculated  using  all

entries  selected.  The  bar  also  shows  the  percentage  of  this  scrap  reason  in  the  total  scrap  quantity

recorded  in  the  evaluation  period.  This  total  scrap  quantity  is  displayed  in  the  total  line  of  the  Scrap

statistics detail application.

Toolbar

 Order information

Calls the Order information for the currently selected order.

 Failure mode analysis (function authorization faep)

Click this button to call the Failure mode analysis.

You can only call the Failure mode analysis, if the extension scrst82 is activated.

MOC_ScrapStatistics.docx

Version: 1.5.18468

Page 4 of 4

