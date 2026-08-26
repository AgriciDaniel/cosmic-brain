Time Type

1  Time Type

Definition

The time type classifies the time tickets in the premium/ incentive wage. By default, the time type is used

to control the calculations for time tickets.

The master data of the wage types and the LLE basic settings can be used to define which time times are

to be created by HYDRA and how the time tickets will then be calculated.

"Piecework" time type

The piecework time tickets serve as basis for individual piecework. Only for piecework time tickets there

is a calculation of the performance efficiency rate based on standard time, bonuses and reductions and

actual time.

Depending  on  the  wage  type  and  the  basic  settings,  the  yield,  scrap  and  set-up  standard  time  tr  of  the

personnel postings (B-records) will be taken into account in the calculation of the standard time.

Granted bonuses will be noted in a separate column in the time ticket and be transferred to the standard

time when the performance efficiency rate is calculated.

By default, piecework time tickets will be accounted for in the daily personal performance with duration,

standard  time  and  bonuses.  This  is  how  they  define  the  performance  level  of  the  daily  personal

performance.

Time type "bonus"

The  granted  bonuses  are  also  available  as  time  ticket.  As  time  type  for  these  time  tickets  the  smallest

wage type with the time type "bonus" ZUS is used. If there is no such wage type, the wage type "01" is

assigned.

Time type "Time wage"

Time-related  time  tickets  are  used  to  pay  for  production  orders  that  are  not  piecework-relevant  by  an

hourly rate.

Time-related time tickets from piecework orders

GLOSSARY_TimeType.docx

Version: 1.0.16965

Page 1 of 3

Time Type

These time-related time tickets are used to pay for non-piecework-relevant times orders from piecework-

relevant  production  orders  by  an  hourly  rate.  A  time  ticket  will  be  generated  for  each  non-piecework-

relevant resource performance account. Also for overhead cost orders such time tickets will be generated

to the extent that the processing of overhead cost order time tickets is activated in the LLE basic settings.

The  assignment  of  resource  performance  accounts  to  time  wages  from  piecework  is  made  in  the

incentive wage basic settings.

"On-the-job training" time type

Time tickets for on-the-job-training are used to pay for specially identified employees per hourly rate. As

regards their compensation scheme they are identical to the time wage and have their own time type only

for evaluation purposes.

"Overhead costs" time type

Time tickets for overhead costs are used to pay for overhead cost orders as time wage. As regards their

compensation  scheme  they  are  identical  to  the  time  wage  and  have  their  own  time  type  only  for

evaluation purposes.

Depending on the order type, it must be specified in the wage type determination that a wage type of the

time type "overhead costs" will be used. By default, these are the order types 1 (GK) or 4 (GK II).

"Waiting period" time type

Time tickets for waiting periods are used to pay for ADE waiting periods as time wage. As regards their

compensation  scheme  they  are  identical  to  the  time  wage  and  have  their  own  time  type  only  for

evaluation  purposes.  Waiting  period  postings  result  from  the  shop  floor  data  collection  when  waiting

period  processing  is  activated  in  the  basic  settings  and  the  allowed  waiting  periods  between  postings

have been exceeded.

When PZE time and attendance is used in HYDRA, the determination of the performance efficiency rate

related to PZE should be preferred to waiting period postings.

"Attendance time" time type

Time  tickets  with  the  time  type  "attendance  times"  will  be  determined  from  the  attendance  time  of  the

HYDRA  personnel  time  management.  They  are  only  used  to  represent  the  PZE  time  in  the  HYDRA

incentive  wage  and  are  taken  into  account  as  duration  in  the  daily  personal  performance  if  the  basic

settings for the incentive wage are made correspondingly and will thus define the performance level in the

performance level computation in personnel time management.

GLOSSARY_TimeType.docx

Version: 1.0.16965

Page 2 of 3

Time type

GLOSSARY_TimeType.docx

Version: 1.0.16965

Page 3 of 3

