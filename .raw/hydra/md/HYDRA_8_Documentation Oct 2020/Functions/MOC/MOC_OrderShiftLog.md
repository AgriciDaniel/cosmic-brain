Order Shift Log

1  Order Shift Log

Overview

Menu

Order management  Production reports  Order shift log

Transaction code

ospr

Function authorization

ospr

Available user fields

Where?

Table

Table

Object type/user field key

Source (type)

AUNR/SYSTEM

AGNR/SYSTEM

Order (MF-D)

Operation (MF-D)

How to configure user fields?

Which user field types are available?

Purpose

The order shift log is a very useful tool for shift supervisors and foremen. It provides the information that

persons responsible in production need for their daily reports.

The  order  shift  log  is  a  function  of  the  production  management.  The  individually  configurable  user

interface presents shift-specific order data in a clear and comprehensive way.

The shift log evaluates the collected order data (quantities and times) in relation to the recorded shifts.

Integration

The order shift log shows all operations that meet the restrictions made in the selection panel. Only BDE

log records of record type “U” and “E” are used.

This  function  provides  the  information  about  the  operations  completed  during  a  shift.  In  addition  to  the

quantities  produced,  the  log  also  shows  the  times  needed.  The  log  provides  this  data  for  each

order/operation.

You can correct the recorded order data using the function Order-related postings.

Selection criteria

The  application  provides  the  following  selection  criteria.  If  you  request  data,  the  system  checks  the

responsibility area that includes the workplace of the relevant BDE log records.

MOC_OrderShiftLog.docx

Version: 1.14.18468

Page 1 of 9

Order Shift Log

Date from ... to ...

Enter a period of time to narrow down the log records displayed. The system selects the log records

with a start date (logon date) in the period defined.

Default  setting  from  "yesterday"  until  "today".  The  date  is  calculated  based  on  the  Gregorian

calendar.

Shift: all, 1, 2, 3, 4

Within the entered period, only those log records are selected that are assigned to the shift entered

according to the shift model.

At the time the data is selected, the system does not include operations that were

logged  on  during  the  currently  running  shift,  because  no  log  records  have  been

generated for them yet.

Workplace from … to …

Selects the log records that have been posted for the specified workplace. This workplace must be

included in the responsibility area the user is authorized for. You can use wildcards in the field.

Group from … to …

Selects  the  log  records  that  have  been  posted  for  the  workplaces  that  are  included  in  the  user's

responsibility area and that are assigned to the entered group. You can use wildcards in the field.

Cost center

Selects  the  log  records  that  have  been  posted  for  the  workplaces  that  are  included  in  the  user's

responsibility area and that are assigned to the specified cost center. You can also use wildcards.

Report group

The selection criterion Report group refers to the report groups. The application shows all machines

or workplaces that are assigned to the selected Report group.

Order

Selects the log records that have been posted for the specified order.

Operation

Selects the log records that have been posted for the specified operation.

Article

Selects the log records that have been posted for operations with the specified article.

Tool

Selects the log records that have been posted for operations with the specified tool.

Check responsibility area

Using this option, the user can specify if the system checks the responsibility area of the workplace

or the responsibility area of the object operation/order to display data. To use this selection option,

you require the function authorization chkresp.

MOC_OrderShiftLog.docx

Version: 1.14.18468

Page 2 of 9

Order Shift Log

This selection option is only available, if you enable the extension ospr2.

Additional notes on the selection

Long-term data

If  the  selection  period  exceeds  the  period  of  time  of  the  online  data  area,  the  system  implicitly

selects the  data  of the  medium-term data area.  You  need  not  explicitly activate the access to the

medium-term data area.

Order shift log detail application

The detail application provides the following fields:

Shift category

Shift date

Shift date of the shift that included the production of the operation (basis: BDE log record).

Shift

Shift in which the operation was produced (basis: BDE log record).

Order category

Category

Order  category  of  the  order/operation,  e.g.  production  order  (FA)  or  overhead  cost  order  (GK).

(basis: backlog of orders).

Order type

Order type of the order (basis: backlog of orders).

Order

Order number of the order/operation (basis: backlog of orders).

Sequence

Sequence

number

of

the

operation

(basis:

backlog

of

orders,

subject

to

customization/configuration).

Operation

Operation number of the operation (basis: backlog of orders).

Split

Split number of the operation, provided that it is a split operation (basis: backlog of orders, subject

to configuration).

MOC_OrderShiftLog.docx

Version: 1.14.18468

Page 3 of 9

Order Shift Log

Operation designation

Designation of the operation (basis: backlog of orders).

Article/article designation

Article number and article designation of the operation (basis: backlog of orders).

Workplace category

Workplace/group/cost center

In  addition  to  the  order  and  article  number,  the  workplace  is  displayed  (including  group  and  cost

center  of  the  workplace)  where  the  operation  has  been  produced  in  the  selected  shift.  (Basis:

workplace: BDE log record; group, cost center: workplace/resource master data).

Primary quantity category

Target quantity

Total target quantity of the operation in the relevant quantity unit (primary quantity unit, secondary

quantity unit, tertiary quantity unit, base quantity unit – basis: backlog of orders).

For this column, no total is calculated. In some cases, one  operation is produced

during several shifts and here it is not correct to calculate totals.

Target quantity per shift

This  field  includes  the  theoretical  target  quantity  for  the  posting.  The  duration  of  the  posting  may

even  be  shorter  than  the  shift  duration  if  the  operation,  for  example,  was  not  logged  on  over  the

entire  shift.  If  the  posting  covers  the  entire  shift,  the  target  quantity  is  calculated  for  each  shift,

otherwise the target quantity is only calculated for the shorter posting period.

To  calculate  the  values  in  the  totals  row,  the  system  uses  the  totals  of  the  RPA  times  and  the

average (not evaluated) of the target cycle values or the partitioning values (see totals row).

Yield

The yield posted for this operation – relating to the selected shift (basis: BDE log record).

Scrap

The scrap posted for this operation – relating to the selected shift (basis: BDE log record).

Rework

The rework quantity posted for this operation – relating to the selected shift (basis: BDE log record).

Open quantity

Open quantity posted for this operation – relating to the selected shift (basis: BDE log record).

MOC_OrderShiftLog.docx

Version: 1.14.18468

Page 4 of 9

TLGANRSZYANRBMKEGRANR.*0.1000.:.SSKGUT1101

Order Shift Log

Quantity unit

The respective quantity unit (basis: BDE log record).

Duration category

Target duration

The total operation-related target duration is calculated using the following formula (basis: backlog

of orders):

𝑆𝑜𝑙𝑙𝑑𝑎𝑢𝑒𝑟 =

Sollzyklus [pro 1000]𝐴𝐺
1000

 ∗Sollmenge (P)𝐴𝐺

Teiligkeit 𝐴𝐺
Impulsfaktor 𝐴𝐺

+ 𝑠𝑡𝑎𝑡𝑖𝑠𝑐ℎ𝑒 𝑅ü𝑠𝑡𝑧𝑒𝑖𝑡𝐴𝐺

If a pulse factor > 0 is not stored for the operation, the value 1 is preset.

If a partitioning > 0 is not stored for the operation, then the target duration is not calculated.

For this column, no total is displayed. In some cases, one operation requires several

shifts for its production and a correct calculation of totals is then not possible.

Production

The  production  time  recorded  for  this  operation  -  relating  to  the  selected  shift  (basis:  BDE  log

record).

Downtime

The downtime recorded for this operation - relating to the selected shift (basis: BDE log record).

Total

Total of all production times and downtimes (sum of columns Production + Downtime).

RPA category

RPA

Detailed  presentation  of  times  recorded  on  the  level  of  resource  performance  accounts  .  (Basis:

BDE log record) .

Key figures category

Rate of capacity utilization

To calculate the  values in  the totals row, the system uses the totals  of the  RPA times (see totals

row).

Output rate

MOC_OrderShiftLog.docx

Version: 1.14.18468

Page 5 of 9

1101:.BMK11:ANR.EGR*0.100BMKEGRANRNGRADSZYANRTLGANRBMKEGRANRGUTPEGRANR.*.*:.*0.1000:.*0.100AUSBGD1101

To calculate the values in the totals row, the system uses the totals of the RPA times and the yield

quantities  (P)  as  well  as  the  arithmetic  mean  (unweighted)  of  the  target  cycle  values  or  the

partitioning values (see totals row).

Scrap rate

Order Shift Log

To calculate the values in the totals row, the system uses the totals of the yield quantities (P) and

the scrap quantities (P) (see totals row).

Assignment utilization rate

To calculate the  values in  the totals row, the system uses the totals  of the  RPA times (see totals

row).

The KPIs above can be changed according to the customer's requirements using

the  formula  management.  For  the  KPI  definition,  the  acronyms  below  are

available.

Acronyms
for
formula definition

the

Description

ANR.EGR:BMK01
ANR.EGR:BMK02
ANR.EGR:BMK03
ANR.EGR:BMK04
ANR.EGR:BMK05
ANR.EGR:BMK06
ANR.EGR:BMK07
ANR.EGR:BMK08
ANR.EGRBMK09
ANR.EGR:BMK10
ANR.EGR:BMK11
ANR.EGR:BMK12
ANR.EGR:AUSP
ANR.EGR:AUSB
ANR.EGR:AUST
ANR.EGR:AUSS
ANR.EGR:GUTP
ANR.EGR:GUTB
ANR.EGR:GUTT
ANR.EGR:GUTS
ANR.EGR:PRBP
ANR.EGR:PRBB
ANR.EGR:PRBT

Times

recorded

for

the

resource  performance

accounts 1-12

Scrap  quantity

recorded

in

the  units  primary,

secondary, base and tertiary

Yield  quantity

recorded

in

the  units  primary,

secondary, base and tertiary

Open  quantity

recorded

in

the  units  primary,

MOC_OrderShiftLog.docx

Version: 1.14.18468

Page 6 of 9

AUSPEGRANRGUTPEGRANRAUSPEGRANRAQUOTE:.:.:.*0.10011:.10:.09:.08:.05:.04:.03:.02:.01:.BMK11:ANR.EGR*0.100BMKEGRANRBMKEGRANRBMKEGRANRBMKEGRANRBMKEGRANRBMKEGRANRBMKEGRANRBMKEGRANRBMKEGRANRBNGRAD

ANR.EGR:PRBS

secondary, base and tertiary

Order Shift Log

Rework  quantity  recorded  in  the  units  primary,

secondary, base and tertiary

Cycles recorded and cycles recorded for yield.

Target  cycle,  partitioning  and  pulse  factor  of  the

operation.

ANR.EGR:NCHP
ANR.EGR:NCHB
ANR.EGR:NCHT
ANR.EGR:NCHS
ANR.EGR:HUBG
ANR.EGR:HUB

ANR.SZY
ANR.TLG
ANR.IMPFAKT

Machine category

Target cycle

Time planned for 1000 cycles of the machine. This value is the default value of the HYDRA-MDE

machine  monitoring  (cycle  monitoring).  The  value  specified  for  the  operation  is  used  to  populate

this  field.  If  the  target  cycle  is  changed  when  the  operation  is  logged  on,  the  change  is  not

integrated.

For this column, the totals row shows the arithmetic mean (unweighted) of all target cycle values.

This value is also used in the totals rows of the different key figures.

Actual cycle

For this column, the totals row shows the arithmetic mean (unweighted) of all actual cycle values.

Note: The duration in the field RPA 11 depends on the workplace setting  Posting

of  machine  time  with  operations  logged  on  simultaneously.  If  a  proportional

posting  is  configured  here,  also  the  duration  shown  in  this  field  is  a  proportional

duration.

Partitioning

Integer value that specifies the number of parts produced per clock pulse.  The value specified for

the  operation  is  used  to  populate  this  field.  If  the  partitioning  is  changed  when  the  operation  is

logged on, the change is not integrated.

For  this  column,  the  totals  row  shows  the  arithmetic  mean  (unweighted)  of  all  partitioning  values.

This value is also used in the totals rows of the different key figures.

Total cycles

Number  of  cycles  recorded  while  the  operation  was  logged  on.  For  this  column,  no  total  is

calculated.

MOC_OrderShiftLog.docx

Version: 1.14.18468

Page 7 of 9

HUBGEGRANR:.BMK11:ANR.EGR*0.1000IZYCLC

Order Shift Log

Pulse factor

Integer value that specifies the number of parts produced per clock pulse.  The value specified for

the operation is used to populate this field. For this column, no total is calculated.

Note

Displaying the actual quantities and the actual durations (RPA)

The shift automatic option is not available for workplaces that are not assigned to any terminal or

that  are  assigned  to  a  terminal  configured  as  a  BDE  terminal  (shop  floor  data  collection).  This

means  that  there  are  no  automatic  order  or  person-related  postings  at  the  end  of  shifts.  In  this

case,  you  cannot  exactly  assign  the  recorded  quantities  and  durations  to  the  shifts.  The  system

therefore  assigns  quantities  and  durations  proportionally.  This  assignment  is  based  on  the

workplace's shift calendar.

Example:

In the example, the shift model is as follows: shift 1: 6:00 to 14:00 ; and shift 2: 14:00 to 22:00. This

shift  model  is  assigned  to  a  workplace  matching  the  above-mentioned  criteria.  An  OP  has  been

logged on at 13:00 and off at 16:00. For the OP logoff, 90 is uploaded as the yield.

In this case, the shift log for the operation in shift 1 will calculate an order duration of 60 minutes

and a yield of 30. For shift 2, an order duration of 120 minutes is calculated and a yield of 60. The

RPA-related durations are also calculated based on the shift model that the workplace is based on.

At the time the data is selected, the system does not include operations that were

logged  on  during  the  currently  running  shift,  because  no  log  records  have  been

generated for them yet.

Durations acc. to article detail application

The detail application Durations acc. to article shows the durations that have been posted for the article in

a bar chart. Only the operations selected in the detail application Order shift log are used to calculate the

values.

The  bar  chart  shows  the  article  numbers  of  the  selected  operations  on  the  y-axis  and  absolute  values

(durations)  are  displayed  on  the  x-axis.  The  respective  quantity  accounts  specify  the  color  of  the  bars

(production/RPA  11:  green;  downtimes/RPA  1-11:  red).  Bars  are  sorted  in  descending  order  by

production duration.

You can use a multi-combo box to define the durations that are shown as a bar:

- Production

- Downtimes

MOC_OrderShiftLog.docx

Version: 1.14.18468

Page 8 of 9

Order Shift Log

The bars are shown in a "stacked" form so that the total quantity can be defined differently for each user.

Activate the check box "Show labels", to show the values on the bars. Note: These labels are displayed

for the selected duration.

Quantities acc. to article detail application

The detail application Quantities acc to article shows the quantities that have been posted for the article in

a bar chart. Only the operations selected in the detail application Order shift log are used to calculate the

values.

The  bar  chart  shows  the  article  numbers  of  the  selected  operations  on  the  y-axis  and  absolute  values

(quantities) are displayed on the x-axis. Bars are sorted in descending order by production duration.

Toolbar

When you call a function or target application, the parameters of the table are generally transferred. For

this reason, always select an entry before calling an application.

 Order information (function authorization: orin)

Use this button to call the application Order information.

 Order overview (function authorization: orov)

Use this button to call the application Order overview.

MOC_OrderShiftLog.docx

Version: 1.14.18468

Page 9 of 9

