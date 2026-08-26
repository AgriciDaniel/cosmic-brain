Scrap Profile

1  Scrap profile

Overview

Menu

Order management  Order controlling  Scrap profile

Transaction code

scrpf

Function authorization

scrpf

Any person in a company who wants to reduce scrap must have knowledge of how and where scrap is

accrued.  The  Scrap  profile  provides  an  overview  of  all  scrap  reasons  and  scrap  quantities  that  were

recorded in a specified period of time.

Selection criteria

The application provides the following selection criteria:

Date

Shift

Time

Enter a period of time to narrow down the log records displayed. The application selects the BDE

log records of record type T with a posting time that is included in the period of time specified.

In the period of time specified above, only those log records are selected that are assigned to the

shift specified.

In the period of time specified above, only those log records are selected that were booked in the

time specified.

Workplace/group/cost center/company/short name/designation/responsibility area

These  entries  specify  the  workplaces/machines  used  for  the  evaluation.  To  select  an  entry,  you

access the master data of the workplace/machine configuration.

Report group

Use

the  option  Report  group

to  narrow  down

the  selection

to  a  specific  group  of

workplaces/machines. You must define the report group in the group configuration.

Reason

Selection based on a specific scrap reason.

Order/order type

You can limit the evaluation to one order.

Article

Selection according to the article

MOC_ScrapProfile.docx

Version: 1.3.18468

Page 1 of 3

Scrap Profile

Sales order

If a sales order is assigned to the production order, this sales order can be used to select the data.

Project number

If a project number is assigned to the production order, this number can be used to select the data.

Check responsibility area

Using this option, the user can specify if the system checks the responsibility area of the workplace

or the responsibility area of the object operation/order to display data. To use this selection option,

you require the function authorization chkresp.

This selection option is only available, if you enable the extension scrpf2.

If the selection period exceeds the period of time of the online data area, the system implicitly

selects  the  data  of  the  medium-term  data  area.  You  need  not  explicitly  activate  the  access  to

the medium-term data area.

Condition:  the  data  retention  periods  of  orders  (object  ANR)  and  of  log  records  (object

ADEPRO) must be identical.

Detail application Scrap profile

The  detailed  report  Scrap  profile  provides  a  table  including  all  scrap  reasons  and  scrap  quantities  that

were recorded in a specified period of time.

Note on the column Scrap rate:

The  scrap  rate  refers  to  the  total  quantity  booked  in  the  selected  period  of  time  (total  of  yield,  scrap,

rework  quantity  and  open  quantity  in  primary  quantity  unit)  for  the  combination  workplace/MES  order

number.

Example: in a specified period of time, the following quantities have been recorded at a workplace for an

order/operation:

Day

Yield

Scrap

1

2

3

4

5

10

12

0

14

8

1

0

0

1

2

MOC_ScrapProfile.docx

Version: 1.3.18468

Page 2 of 3

Scrap Profile

If  you  select  the  period  of  time  Day  2  -  Day  5,  then  the  days  4  and  5  show  scrap  quantities  that  are

displayed in the Scrap profile. The scrap rate refers to the total quantity booked in the selected period of

time (here: 12+14+8+1+2 = 37):

Day

4

5

Scrap

Scrap rate

1

2

2.7

5.4

To calculate the scrap rate, the system also uses postings that only include a  yield, but  no

scrap. Entries in the result line with a scrap quantity of 0 are therefore possible.

You can hide these entries using the Filter editor.

Detail application PivotGrid

The  detailed  report  PivotGrid  provides  an  overview  of  all  scrap  reasons  and  scrap  quantities  that  were

recorded in a specified period of time. According to the settings of the pivot table, the application shows

e.g. one column for each scrap reason. The scrap recorded automatically is displayed separately.

Scrap (P)

This pivot element includes the primary quantities.

Scrap reason

This pivot element includes the scrap reasons (number of the scrap reason).

Date

This pivot element includes the dates when the scrap was recorded.

The  detail  application  contains  not  only  the  fields  mentioned  here,  but  numerous  other  fields.  You  can

select these fields using the field list. Right-click the area above the column headers to open the context

menu and select Show field list.

To calculate the scrap rate, the system also uses postings that only include  a  yield, but no

scrap. Entries in the result line with a scrap quantity of 0 are therefore possible.

You can hide these entries using the Filter editor.

MOC_ScrapProfile.docx

Version: 1.3.18468

Page 3 of 3

