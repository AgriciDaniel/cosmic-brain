Article Profile

1  Article Profile

Summary

Menu

Order Management  Order Controlling  Article Profile

Transaction code

artpf

Function authorization

artpf

The  Article  profile  application  is  designed  for  users  in  the  departments  Production  controlling,  Order

controlling or Final costing. It  compares orders across a defined period of time that produced the same

article and displays comparisons of their production times and downtimes. Based on the selection made

via the order header article (the order's final product) and, optionally, a defined period of time, all orders

that produced that article are displayed along with their results.

Integration

The application is based on the order-related quantities and times entered during production.

Requirement

The application only looks at production orders - not individual operations. Only those production orders

are  considered  that  have  the  control  status  "finished"  in  their  order  headers.  Production  orders  with  a

different control status are not considered.

Selection criteria

The  application  provides  the  selection  criteria  listed  below:  Irrespective  of  these  selection  criteria,

generally only orders are selected that have already started (in process) or that are finished.

Final product

This  selection  criterion  refers  to  the  article  in  the  order  header.  All  orders  are  displayed,  to  which

the article entered has been assigned. The use of wildcards (placeholders *) is allowed.

Article designation

This selection criterion refers to the article designation defined in the order. All orders are displayed

that contain the article designation selected.

Order status

This  selection  criterion  refers  to  the  status  of  the  order.  Only  those  orders  are  displayed  with  an

order status that matches the criteria entered. Irrespective of this restriction, generally only orders

are considered and selected that have already started (in process) or that are finished.

MOC_ArticleProfile.docx

Version:

Page 1 of 4

Article Profile

Category

This  selection  criterion  refers  to  the  order  type  category  of  the  order.  Only  those  orders  are

displayed with an order type that is associated with the category entered.

Order

This  selection  criterion  refers  to  the  order  number.  Orders  are  displayed  that  contain  the  order

number entered. There is an option to use wildcards (placeholders *).

Order type

This selection criterion refers to the order type. Orders of the order type entered are displayed.

Order end ... until ...

This selection criterion refers to the point in time at which the order(header) is changed to "finished"

status. In this case, only the finished orders are displayed with an actual end that is set between the

selected dates. This occurs irrespective of whether there is a restriction on the order status.

The responsibility area is not checked in this application.

Article profile detail application (table)

All  orders  that  match  the  selections  entered  are  displayed  in  the  article  profile  detail  application  table

view. A selection of columns is described below:

Status

Current  status  of  the  order.  Generally,  only  orders  are  considered  that  have  started  or  that  are

finished.

Status since date, status since time

Point in time as of which the current status of the order applies.

Order

Order number of the order

Final product

Article number of the order(header).

Article designation

Name of the article listed in the order(header).

SUT, DCI, SCI, LCI, IMS, IMN, SET, STA, U8, U9, MUT

The  durations  that  were  posted  to  each  resource  performance  account  are  displayed  in  the

columns.

MOC_ArticleProfile.docx

Version:

Page 2 of 4

Article Profile

Retention period of order

The retention period of the order is the period between the time the order was first transferred from

the PPS system ("order release" = order header creation date in HYDRA) and the time of the actual

logoff (in terms of time) of the last active operation of the order.

Please note: Whether the time of the order transfer is the time it was first transferred from the PPS

system or the time it was re-transferred because it had been deleted in the meantime for technical

reasons, cannot be determined or taken into consideration using HYDRA. If an order is transferred

more than once, and with each transfer the previous order is deleted, the creation date of the order

header is the time of the last transfer.

Please note: If the order is not yet finished, the value calculated here is not significant.

Lead time

The order duration is the period between the time the first operation of the order is logged on and

the time the last active operation is logged off.

Please note: If the order is not yet finished, the value calculated here is not significant.

Processing time

The processing time of the order is the sum of the main utilization times (RPA 11) of all recordable

active operations.

Downtime period

The  downtime  period  of  the  order  is  the  sum  of  the  downtimes  (RPA  1..6,  RPA  8..10)  of  all

recordable active operations.

Please note: the setup time can be found in the corresponding resource performance account (RPA

7/ SET).

Assignment time

The  occupancy  time  is  the  sum  of  the  setup  time  (RPA  7),  processing  time  (RPA  11)  and

downtimes (RPA 1..6, RPA 8..10) of all recordable active operations.

Yield

Recorded  yield in base quantity unit of the  last recordable operation. This requires that the unit in

which the quantity is entered (primary quantity unit) can be converted into the base quantity unit.

Scrap

Sum of the scrap quantities entered for all operations posted in base quantity unit.

Rework

Sum of the rework quantities entered for all operations posted in base quantity unit.

Open quantity

Sum of the recorded problem quantities entered for all operations posted in base quantity unit.

MOC_ArticleProfile.docx

Version:

Page 3 of 4

Article Profile

Unit

Quantity unit of the order

Rate of capacity utilization

The  rate  of  capacity  utilization  is  the  ratio  of  processing  time  (RPA  11)  to  occupancy  time  (RPA

1..11)

Setup rate

The setup rate is the ratio of setup time (RPA 7) to occupancy time (RPA 1..11)

Article profile detail application (graphic)

By selecting one or more orders in the table, the following information is displayed in the graphic for those

orders:

Upper graphic

In the upper graphic of the article profile, three bars are displayed for each of the orders  selected in the

table:

  On the left: Scrap in percent based on the finished total quantity of the order (yield + scrap + rework +

problem quantity in base quantity unit).



In the middle: Main utilization time in percent based on the occupancy time of the order

  On the right: Downtime periods (RPA 1 to 10) in percent based on the occupancy time ( RPA 1 to 11)

of the order

The colors of the time bars correspond to the defined RPA colors; scrap bars are generally displayed in

red.

Lower graphic

In the lower graphic of the article profile, the absolute values of a single RPA or of the scrap are displayed

in bar form for each selected order. The user determines which value is displayed by clicking in the upper

graphic.

The individual order numbers are displayed on the X axis, while the unit of the value is displayed on the Y

axis. If durations are greater than 24 hours, they are displayed in days.hours:minutes:seconds.

Each  value  selected  (scrap  or  name  of  the  resource  performance  account)  is  displayed  beneath  the

graphic.

MOC_ArticleProfile.docx

Version:

Page 4 of 4

