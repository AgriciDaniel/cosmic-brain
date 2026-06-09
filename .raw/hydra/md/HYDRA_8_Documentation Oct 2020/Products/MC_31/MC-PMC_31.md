Manual

MES-Cockpit Client
Production Monitoring
MC-PMC 3.1

Version 1.0.23049

Last changed on: 01.09.2020

MES-Cockpit Client Production Monitoring

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

MC-PMC_31.docx

Version: 1.0.23049

Page 2 of 7

MES-Cockpit Client Production Monitoring

Contents

1  MES-Cockpit - Production Monitoring .......................................................... 4

1.1  General ............................................................................................................... 4

1.2  Selection criteria .................................................................................................. 4

1.3  Objects of online overview ................................................................................... 4

1.3.1  Machines/workplaces .............................................................................. 4

1.3.2  Running operations ................................................................................. 5

1.3.3  Registered orders .................................................................................... 6

1.3.4  Downtime hit list ...................................................................................... 7

1.3.5  Produced quantities ................................................................................. 7

1.3.6  KPI diagram............................................................................................. 7

MC-PMC_31.docx

Version: 1.0.23049

Page 3 of 7

MES-Cockpit Client Production Monitoring

1  MES-Cockpit - Production Monitoring

1.1  General

The production monitoring provides the user with an system-independent status overview for the following

objects:

  Machines/workplaces

  Running operations

  Registered orders

  Downtime hit list

  Produced quantities

  KPI diagram

Please note: Data of the online overview are updated in a cyclic interval every three minutes by

the connected HYDRA systems:

1.2  Selection criteria

The following selection criteria are provided in selection lists:

  Workplaces/ machines

  Machine groups

  Cost centers

  Article/item (restricts the displayed operations)

Please note: There are no selection criteria to narrow down time periods as the displayed data

refers to the current shift of the objects.

1.3  Objects of online overview

1.3.1 Machines/workplaces

The  overview  of machines/workplaces  provides  current  information  about  workplaces  (in  table  form) for

which  the  registered  user  is  authorized  by  the  responsibility  area  and  that  match  the  entered  selection

criteria.

This information is shown for workplaces:

  Machine number

MC-PMC_31.docx

Version: 1.0.23049

Page 4 of 7

MES-Cockpit Client Production Monitoring

  Machine name

  Cost center

  Machine group

  Site

  Current status (status text, status color and number)

  Status since

  Duration so far

  Target cycle of machine

  Actual cycle of machine

  Produced yield and scrap quantity of the machine of the current shift

  Actual cycles of machine

  Actual cycles (yield) of machine

1.3.2 Running operations

The overview of running operations shows the currently registered operations in table form. Filters are set

as follows:

  Only those operations are shown that are logged on to a workplace displayed in the overview of

workplaces.  Therefore,  if  the  displayed  data  is  filtered  by  workplaces,  the  list  of  operations  will

also be affected.

The following information is shown for operations:

  MES order number

  Article number

  Article description

  Order number

  Site

  Date/time of logon

  OP description

  Target quantity

  Yield quantity

  Scrap

  Unit (P)

  Workplace

  First logon

  Last logoff

  Last interruption

  Planned start

MC-PMC_31.docx

Version: 1.0.23049

Page 5 of 7

MES-Cockpit Client Production Monitoring

  Planned end

  Earliest start

  Latest end

  Scheduled start

  Scheduled end

  Total setup time

  Processing time

Please note: If an OP is logged on to two machines at the same time, it will only be shown once

in the list. But if filtering is based on machines, it will be shown for both machines.

1.3.3 Registered orders

The overview of registered orders represents in table form information on order headers for which at least

one operation is currently logged on. Filters are set as follows:

  Therefore, if the displayed data is filtered by operations, the list of orders will also be affected.

The following information is shown for orders:

  Order number

  Finished article

  Article description

  Sales order

  Site

  Current status (status text and colors)

  Status since

  Basic start date

  Basic end date

  Scheduled start

  Scheduled end Target quantity (B)

  Yield (B)

  Scrap (B)

  Planned lead time

  Target setup time

  Target processing time

  Target labor utilization

  Target execution time

MC-PMC_31.docx

Version: 1.0.23049

Page 6 of 7

MES-Cockpit Client Production Monitoring

  Retention period of order

  Lead time

  Setup time

  Processing time

  Downtime

  Assignment time

  Labor utilization

1.3.4 Downtime hit list

A bar chart shows the malfunctions that have occurred in the current shift providing information about the

duration and number of workplaces displayed and/or selected in the overview.

1.3.5 Produced quantities

A bar chart shows the produced yield and scrap quantities of the current shift for each cost center.

1.3.6 KPI diagram

The  KPI  diagram  shows  the  following  key  performance  indicators  for  the  current  shift  and  all  selected

and/or displayed workplaces:

  Rate of capacity utilization

  Setup rate

  Scrap rate

The specified formula of formula management is used as basis for calculation.

MC-PMC_31.docx

Version: 1.0.23049

Page 7 of 7

