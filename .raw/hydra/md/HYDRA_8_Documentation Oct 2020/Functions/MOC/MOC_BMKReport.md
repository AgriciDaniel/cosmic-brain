RPA Report

1  RPA Report

Overview

Menu

Production facility management  Status analyses  RPA report

Transaction code

rparp

Function authorization

rparp

Purpose

The  RPA  report  provides  status  information  of  workplaces/machines  over  a  specified  time  and  for  a

specified number of workplaces. For the report, the workplace/machine statuses are assigned to resource

performance accounts where they are totaled.

Selection criteria

The application provides the following selection criteria:

Workplace

Selection by machine/workplace. You can use wildcards.

Group

Selection by workplaces/machines that are assigned to the machine group specified. The selection

is made using the field Group in the Workplace/machine configuration. You can use wildcards.

Cost center

Selection  by  workplaces/machines  that  are  assigned  to  the  cost  center  specified.  You  can  use

wildcards.

Company

Selection  by  workplaces/machines  that  are  assigned  to  the  company  specified.  You  can  use

wildcards.

Responsibility area

This  selection  criterion  refers  to  the  responsibility  area  stored  in  the  machine  master  data.  Note:

The user can only view those machines that are included in the responsibility areas assigned to the

user.

Report group

This selection criterion refers to the report groups. The application shows all workplaces/machines

assigned to the selected report group.

MOC_BMKReport.docx

Version: 1.2.18210

Page 1 of 4

RPA Report

Short name

This  selection  criterion  refers  to  the  short  name  of  machines  in  the  master  data.  The  application

shows  all  machines  or  workplaces  matching  the  entered  character  string.  You  can  also  use

wildcards.

Designation

This  field  refers  to  the  designation/name  of  machines  and  workplaces  defined  in  the  machine

master  data  (in  HYDRA:  comment).  The  application  only  shows  the  machines  matching  the

character string specified. You can also use wildcards (placeholders *).

Including status for RPA 11

The status assigned to RPA 11 is integrated in the report (usually status "production").

Date

The data included in the period of time specified is used.

If  you  perform  the  selection  using  shift(s),  the  shift  date  is  evaluated,  if  you  use  the  time  for

selection, the selection is based on the start date. Note: a selection by shift is only supported with

BDE and MDE data, not with WRM data.

Shift(s)/time

Selection  by  shifts  (HYDRA-BDE  and  HYDRA-MDE  events  only)  or  using  a  period  of  time.  If  no

shift is selected, all shifts are used.

Both times refer to the beginning or end of the date period specified above.

Order/article

If you selct the option Order, you must specify an order or an article.

With this selection type,  only completed  BDE postings are used. If the order is still running  at the

machine,  the  system  does  not  integrate  the  time  period  between  the  last  logon  and  now.  It  is

therefore possible that there is a difference between the machine evaluation and the order-related

evaluation. The system only uses BDE postings that start in the evaluation period. If required, you

must  specify  the  selection  period  so  that  the  required  BDE  postings  are  actually  included  in  this

period. For this order-related evaluation, MPDV recommends to select data by shift.

The illustration below shows an example of how BDE and MDE postings can overlap. The BDE postings

take priority with this evaluation type. The yellow fields show the result of this evaluation. MDE quantities

and times are used proportionately to calculate the result.

MOC_BMKReport.docx

Version: 1.2.18210

Page 2 of 4

RPA Report

If  several  orders  are  logged  on  to  the  machine  at  the  same  time,  this  evaluation  type  assigns  the

complete machine  time and number of pieces to  each of the orders (yellow field). Times and quantities

are not assigned proportionately when orders are logged on in parallel.

Resource type/resource

If you selct the option Resource, you must specify a resource.

Also  with  this  selection  type,  only  completed  postings  are  used.  With  this  evaluation  type,  the

resource postings take priority. The principle is the same as for evaluations by order.

Additional notes on the selection

Long-term data

If  the  selection  period  exceeds  the  period  of  time  of  the  online  data  area,  the  system  implicitly

selects the  data  of the medium-term data area.  You  need  not  explicitly activate the access to the

medium-term data area.

Using quantities during time of shift only

This  option  known  from  MDE  7.2  is  set  by  default  in  MOC. With  this  option,  the  postings  created

during  shift  change  are  not  used  when  the  quantity  is  identified.  The  machine  status  must  have

been set and only then the quantities produced are used. If this moment is outside of the evaluation

interval, then the output is 0.

MOC_BMKReport.docx

Version: 1.2.18210

Page 3 of 4

RPA Report

Detail application RPA report

RPA / Abbrev. / Designation

Number, abbreviation and name of the resource performance account.

Duration

Time that the status lasted/was set that is assigned to this RPA.

%

Share of time in the total time.

Quantity

Number of times that the status assigned to this RPA was available/set.

%

Share of the number of times in the total number of times.

Detail application Duration

The  detail  application  Duration  displays  the  durations  of  the  resource  performance  accounts  in  a  bar

chart.  The  durations  are  sorted  and  displayed  in  descending  order.  The  different  resource  performance

accounts are colored according to the default definition.

Detail application Quantity

The detail application  Quantity displays the number of times that a status  was available at the selected

machine. The statuses are displayed according to the RPA in a bar chart. The number of times are sorted

and displayed in descending order. The different resource performance accounts are colored according to

the default definition.

MOC_BMKReport.docx

Version: 1.2.18210

Page 4 of 4

