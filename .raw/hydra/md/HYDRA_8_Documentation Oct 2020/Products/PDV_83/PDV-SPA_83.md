Manual

Statistical Process Analysis
PDV-SPA 8.3

Version 1.0.23049

Last changed on: 02.09.2020

Statistical Process Analysis

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

PDV-SPA_83.docx

Version: 1.0.23049

Page 2 of 11

Statistical Process Analysis

Contents

1  Overview: Statistical Process Analysis ........................................................ 4

2  Process Data Log for Operation................................................................... 5

3  Process Data Log for Order ......................................................................... 9

PDV-SPA_83.docx

Version: 1.0.23049

Page 3 of 11

Statistical Process Analysis

1

 Overview: Statistical Process Analysis

Overview

Purpose

This product includes the statistical process data logs. You use the applications to analyze the collected

process  data  of  orders  and  operations.  The  data  is  displayed  in  a  tabular  overview  that  shows  the

statistical parameters of the process.

Integration

For this product, the following requirements must be fulfilled:

- machine interface for data collection in the Process Communication Controller (PCC),

- license PDV-PDM to collect and process process data.

Features

This product provides evaluation options of the process data logs:

  Process  data  log  for  order:  evaluation  of  the  order-related  statistical  parameters  using  the

collected process data of an order.

  Process data log for operation: evaluation of the operation-related statistical parameters using the

collected process data of an operation.

PDV-SPA_83.docx

Version: 1.0.23049

Page 4 of 11

Statistical Process Analysis

2  Process Data Log for Operation

Overview

Menu

Quality management  Process analysis  Process data log for operation

Transaction code

pdsop

Function authorization

pdsop

The application Process data log for operation provides a quick overview of the process data recorded for

an operation.

Purpose

The application provides an analysis of the process data recorded for an operation. The data is displayed

in an operation-specific tabular overview.

Integration

The function shows the process parameters recorded in combination with the data of the shop floor data

collection.

Requirements

To use the application, the process and the shop floor data (orders/operations) must be collected.

Selection criteria

The application provides the following selection criteria:

Operation

This  selection  criterion  defines  the  operation  for  which  the  measured  values  are  displayed.  The

operation is specified via MES order number (combined order and operation number).

Period from / until

This selection criterion defines the evaluation period for which the measured values are displayed.

Consider long-term data

If  you  activate  this  selection  parameter,  the  long-term  data  is  also  used  in  the  data  selection  to

identify the article number and name.

PDV-SPA_83.docx

Version: 1.0.23049

Page 5 of 11

To identify the operations of the period selected, only the operation logon time is used. The

operation logoff time is not relevant for the selection.

Statistical Process Analysis

Field descriptions

Operation

The operation is specified via MES order number (combined order and operation number).

OP

This field shows the operation number for which the process parameter was recorded.

Article number of OP

This  field  provides  the  article  number  of  the  specified  operation.  The  Article  number  of  OP  is

specified via the data of the backlog of orders.

Article designation/name

This field provides the article name of the specified operation. The Article name is specified via the

data of the backlog of orders.

Process parameter

This field specifies the process parameter recorded for the specified order.

Mean value (AVG - order sequencing list)

This  field  shows  all  calculated  mean  values  of  all  measured  values  recorded  for  the  specified

process parameter.

Maximum value

This  field  shows  the  maximum  value  of  all  measured  values  recorded  for  the  specified  process

parameter.

Minimum value

This  field  shows  the  minimum  value  of  all  measured  values  recorded  for  the  specified  process

parameter.

Range of values

The value range is calculated using the difference between maximum and minimum value.

Number of measured values

This field shows the number of measured values recorded for the specified process parameter.

Standard deviation

This field shows the calculated standard deviation of the measured values of the relevant process

parameter.

PDV-SPA_83.docx

Version: 1.0.23049

Page 6 of 11

Statistical Process Analysis

cp

cpk

The process capability index Cp is shown in the column Cp. The index for process capability cp is

calculated using the following factors:

  Upper and lower tolerance limit

  Standard deviation.

The process capability index CpK is shown in the column cpk. The index for process capability cpk

is calculated using the following factors:

  Mean value

  Standard deviation

  Upper and lower tolerance limit

A high cpk value shows that the production lies solidly within the specification limits.

Lower tolerance limit

This  field  shows  the  value  of  the  lower  tolerance  limit  for  the  specified  process  parameter.  The

value that was valid at the last operation logoff is used.

Lower process action limit

This field shows the value of the lower process action limit for the specified process parameter. The

value that was valid at the last operation logoff is used.

Target value

This field shows the target value of the specified process parameter. The value that was valid at the

last operation logoff is used.

Upper process action limit

This field shows the value of the upper process action limit for the specified process parameter. The

value that was valid at the last operation logoff is used.

Upper tolerance limit

This  field  shows  the  value  of  the  upper  tolerance  limit  for  the  specified  process  parameter.  The

value that was valid at the last operation logoff is used.

Distribution

Graphic display of the distribution of the measured values for the specified process parameter.

PDV-SPA_83.docx

Version: 1.0.23049

Page 7 of 11

Statistical Process Analysis

The fields Article number of OP and Article name are selected from the data of the order

backlog. If this data is archived and not available in the HYDRA database, then these fields

remain empty.

PDV-SPA_83.docx

Version: 1.0.23049

Page 8 of 11

Statistical Process Analysis

3  Process Data Log for Order

Overview

Menu

Quality management  Process analysis  Process data log for order

Transaction code

pdsor

Function authorization

pdsor

The application Process data log for order provides a quick overview of the process data recorded for an

order.

Purpose

The application provides an analysis of the process data recorded for an order. The data is displayed in

an order-specific tabular overview. The data is displayed in combination with the statistical parameters of

the process parameter.

Integration

The function shows the process parameters recorded in combination with the data of the shop floor data

collection.

Requirements

To use the application, the process and the shop floor data (orders/operations) must be collected.

Selection criteria

The application provides the following selection criteria:

Order

This selection criterion defines the order for which the measured values are displayed.

Period from / until

This selection criterion defines the evaluation period for which the measured values are displayed.

Consider long-term data

If  you  activate  this  selection  parameter,  the  long-term  data  is  also  used  in  the  data  selection  to

identify the article number and name.

PDV-SPA_83.docx

Version: 1.0.23049

Page 9 of 11

Statistical Process Analysis

Field descriptions

Order

This field shows the order number for which the process parameter has been collected.

Final article

This field shows the final article of the specified order. The  Final article is specified via the data of

the backlog of orders.

Article designation/name

This field shows the article name of the specified order. The Article name is specified via the data of

the backlog of orders.

Process parameter

This field specifies the process parameter recorded for the specified order.

Mean value

This  field  shows  all  calculated  mean  values  of  all  measured  values  recorded  for  the  specified

process parameter.

Maximum value

This  field  shows  the  maximum  value  of  all  measured  values  recorded  for  the  specified  process

parameter.

Minimum value

This  field  shows  the  minimum  value  of  all  measured  values  recorded  for  the  specified  process

parameter.

Range of values

The value range is calculated using the difference between maximum and minimum value.

Quantity

This field shows the number of measured values recorded for the specified process parameter.

Standard deviation

This field shows the calculated standard deviation of the measured values of the relevant process

parameter.

cp

The process capability index Cp is shown in the column Cp. The index for process capability cp is

calculated using the following factors:

  Upper and lower tolerance limit

  Standard deviation.

PDV-SPA_83.docx

Version: 1.0.23049

Page 10 of 11

cpk

The process capability index CpK is shown in the column cpk. The index for process capability cpk

Statistical Process Analysis

is calculated using the following factors:

  Mean value

  Standard deviation

  Upper and lower tolerance limit

A high cpk value shows that the production lies solidly within the specification limits.

Lower tolerance limit

This  field  shows  the  value  of  the  lower  tolerance  limit  for  the  specified  process  parameter.  The

system uses the value that was valid at the last order logoff.

Lower process action limit

This field shows the value of the lower process action limit for the specified process parameter. The

system uses the value that was valid at the last order logoff.

Target value

This  field  shows  the  target  value  of  the  specified  process  parameter.  The  system  uses  the  value

that was valid at the last order logoff.

Upper process action limit

This field shows the value of the upper process action limit for the specified process parameter. The

system uses the value that was valid at the last order logoff.

Upper tolerance limit

This  field  shows  the  value  of  the  upper  tolerance  limit  for  the  specified  process  parameter.  The

system uses the value that was valid at the last order logoff.

Distribution

Graphic display of the distribution of the measured values for the specified process parameter.

The fields Final article and Article name are selected from the data of the order backlog. If this

data is archived and not available in the HYDRA database, then these fields remain empty.

PDV-SPA_83.docx

Version: 1.0.23049

Page 11 of 11

