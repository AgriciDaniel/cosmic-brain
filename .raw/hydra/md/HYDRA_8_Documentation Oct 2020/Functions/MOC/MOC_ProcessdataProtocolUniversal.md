Process Data Protocol

1  Process Data Protocol

Overview

Menu

Quality management  Process analysis  Process data protocol

Transaction code

pdpu

Function authorization

pdpu

The Process data protocol is used for the process analysis in the quality management and in the process

data processing.

Purpose

The process data protocol  is a summary of recorded  values to get a quick overview during the process

analysis.

The table view of the detail application offers an overview of existing entries. The system sorts the displayed

information using table functions and complying with specified selection parameters. Each user can change

the display of fields with the context menu.

Integration

The function displays recorded measured values of process characteristics in aggregated form based on

selection criteria. These values must have been previously recorded in the system.

Selection parameters

The application provides the following selection criteria:

Type of evaluation

The evaluation type defines the relating object for the summary or if the user requires a calculation

for single values for all process parameters. The following relating objects can be selected:

  Order

  OP (operation)

  Machine + shift date

  Machine + shift date + shift number

Machine

The system offers a detailed search for the machine using the pool application.

Evaluation period from - to

Specifies the time interval to be selected.

MOC_ProcessdataProtocolUniversal.docx            Version:1.1.14892

Page 1 of 4

Process Data Protocol

Order

The system offers a detailed search for the order using the pool application. This field is mandatory

if the user selects the evaluation type "Order" or "Operation".

Operation

The  system  offers  a  detailed  search  for  the  operation  using  the  pool  application.  This  field  is

mandatory if the user selects the evaluation type "OP".

Include long-term data

Long-term data is included.

Please  note  that  the  system  keeps  all  data  used  for  these  evaluations/reports  in  the  server  memory.

Consequently, we do not recommend to select long periods of time and large data sets.

Technical background info:

Every time the system requests data in the client applications, it stores this data in the server memory and

only  then  transfers  the  data  to  the  client.  If  you  require  more memory  space,  you  need  to  increase  the

server memory reserved for the Java application accordingly. Please refer to the MPDV support.

Detail application "Process data protocol"

The tabular report process data protocol displays the process data recorded and saved in the database

including the following information: Please note that not all columns are filled with information depending

on the selected evaluation type.

Category Statistic parameter

Process parameter

Technical name of the recorded process parameter

Mean value (AVG - order sequencing list)

Mean value of the recorded process parameter values.  If the value exceeds the specification limit,

the system highlights the field accordingly.

Maximum value

Maximum  value  of  the  recorded  process  parameter  values.  If  the  value  exceeds  the  specification

limit, the system highlights the field accordingly.

Minimum value

Minimum  value  of  the  recorded  parameter  values.  If  the  value  exceeds  the  specification  limit,  the

system highlights the field accordingly.

Number of measured values

Number of recorded measured values meeting the selection criteria for the process parameter.

MOC_ProcessdataProtocolUniversal.docx            Version:1.1.14892

Page 2 of 4

Process Data Protocol

Category Order

Order

Order number for which the process parameter was entered.

Article number of order

Stored article number of the order.

Article name of order

Stored article name of the order.

Category "Operation"

Operation

MES order number for which the process parameter was recorded.

OP

OP number for which the process parameter was recorded.

OP name/designation

Stored OP designation of the operation

Article number of OP

Stored article name of the operation.

Article name of OP

Stored article name of the operation.

Category "Production parameter"

Machine

Workplace/machine number indicating where the process parameter values were recorded.

Shift date

Shift date indicating when the process parameter values were recorded.

Shift number

Shift number of the recorded process parameter values.

Category "Primary quantities"

Yield (P)

Recorded yield (primary) of the OP/machine

Scrap (P)

Recorded scrap quantity (primary) of the OP/machine

MOC_ProcessdataProtocolUniversal.docx            Version:1.1.14892

Page 3 of 4

Process Data Protocol

Quantity unit (P)

Quantity unit of the recorded quantity (primary)

Actual times category

Runtime

Runtime of the OP/machine

Time of production

Production time of the OP/machine

Downtime

Downtimes of the OP/machine

Category "Specification"

Target value (TV)

The target value for the collected process parameter.

Upper TL

The upper tolerance limit defined for this recorded process parameter.

UPAL (upper process action limit)

The upper process action limit defined for this recorded process parameter.

Lower TL

The lower tolerance limit defined for this recorded process parameter.

LPAL (lower process action limit)

The lower process action limit defined for this recorded process parameter.

Distribution

Graphical display of the distribution of measured values

Cp

CpK

The process capability index Cp is shown in the column Cp. The calculation of the process capability

index  Cp  is  based  on  the  upper  and  lower  specification  limit  and  the  corresponding  standard

deviation.

The  process  capability  index  CpK  is  shown  in  the  column  CpK.  The  calculation  of  the  process

capability index CpK is based on the mean value, the corresponding standard deviation and the upper

or lower specification limit. A high value shows that the production lies solidly within the specification

limits.

Process location

Graphic display of information on mean value, minimum and maximum value and UTL and LTL.

MOC_ProcessdataProtocolUniversal.docx            Version:1.1.14892

Page 4 of 4

