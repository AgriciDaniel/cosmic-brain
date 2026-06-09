Order-Related Statistics

1  Order-Related Statistics

Overview

A detailed report about orders is found in the form of the order statistics. There is the option to obtain a

graphic report showing quantities and time for selected orders.

Integration

Depending  on  the  selection  in  the  selection  panel,  all  orders  are  shown  line-by-line  in  the  order-related

statistics.  The  data  shown  here  are  both  order  backlog  data  as  well  as  an  order's  current  status

information.

Selection criteria

This application does not have the option to limit by order status. What this means

is  that  even  such  orders  are  selected  that  have  not  yet  begun  if  they  match  the

selection criteria.

The application provides the following selection criteria:

Order

Here the order number can be entered directly.

Final product

This selection criterion refers to the article in the order header. All orders with the selected article

are displayed. You can also run a search using wildcards.

Designation

This  selection  criterion  refers  to  the  article  designation  in  the  order  header  (finished  article

designation).  All  orders  with  the  selected  article  designation  are  displayed.  You  can  also  run  a

search using wildcards.

Basic date start from/ to

This selection criterion relates to the basic date start defined in the order header. Only orders are

displayed that are scheduled on or between the selected basic date start.

Please note: these fields are not predefined.

Basic date end from/ to

This selection criterion relates to the  basic date end  defined in the order header. Only orders are

displayed that are scheduled on or between the selected basic date end.

Please note: these fields are not predefined.

HWEB_OrderRelatedStatistics.docx

Version: 1.0.1362

Page 1 of 3

Order-Related Statistics

Order-related statistics

The following fields are displayed in the table:

(no designation), order status

The status of the entire production order is shown via the order status. Possible states include:

(Gray) - prepared: the order has not yet been started

(Light green) - started: the order has already started

(Green) - ready: the order is finished

(Purple) - orders on hold are set with the status not free, because they are not actively logged on.

Order

Order number of the order.

Please note: By default, the list is sorted based on this field.

Final product

Article number of the operation.

Article designation

Name of the article.

Number of OPs

Number of operations for the order displayed.

Target quantity

The yield planned for this order.

Yield

The yield posted to this order.

Scrap

The scrap posted for all of the order's operations.

Unit

Order's unit of quantity.

Target setup time

Sum total of the target setup times of all of the order's operations.

Setup time

Sum total of the times for all of the order's operations posted to the resource performance account

7 (SET).

Processing time

Sum total of the times for all of the order's operations posted to the resource performance account

11 (MUT).

HWEB_OrderRelatedStatistics.docx

Version: 1.0.1362

Page 2 of 3

Order-Related Statistics

Standstill period

Sum total of the times for all of the order's operations posted to the resource performance accounts

1-6, 8, 9 and 10.

Actual labor utilization

Sum total of time and labor data for all of the order's operations posted as labor utilization.

Graphic order-related statistics

In  addition  to  the  reporting  the  data  in  table  form,  the  statistics  can  also  be  displayed  in  the  form  of  a

graphic. After selecting an order, the selection option "Order-related statistics - graphic" will appear in the

detailed  reports  frame.  The  graphic  is  divided  into  the  categories  quantities,  duration  and  resource

performance accounts distribution.

Graphic quantities section

The graphic shows a comparison between yield and scrap

Graphic durations section

The graphic presentation of the durations compares order durations (always 100%), production duration

and downtimes for the selected order combined as a ratio in percent.

Graphic RPA distribution section

Compared  in  the  graphic  presentation  of  the  RPA  distribution  are  the  times  posted  to  the  resource

performance accounts 1-6, 8, 9, 10 and 12 as a ratio in percent.

HWEB_OrderRelatedStatistics.docx

Version: 1.0.1362

Page 3 of 3

