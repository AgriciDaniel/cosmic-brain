qs-STAT® Data Export

1  qs-STAT® Data Export

Summary

This  document  describes  the  application  "qs-STAT®  data  export"  within  the  Manufacturing  Operation

Center (MOC).

Starting the Function

Menu

Quality management --> QM evaluation --> qs-STAT® data export

Transaction code

qsstat

Function authorization

qsstat.export

Default Application Layout

Utilization

This  application  allows  for  characteristics  (sample  data)  to  be  transferred  to  the  program  package  qs-

STAT® for further analysis. The amount of data selected can be restricted by a variety of filters based on

orders, available inspection plans, characteristics and samples.

Selection criteria

At least the fields

  Area type

  Area

MOC_QsStatExport.docx

Version: 1.0.1362

Page 1 of 2

qs-STAT® Data Export

have to be filled out to be able request data. An error message occurs if data is requested and these two

filter criteria are not filled out.

If  the  checkbox  "summarize  characteristics"  is  checked,  all  inspection  results  matching  the  filter  criteria

are exported as "one characteristic" to qs-STAT®. This is also the case if HYDRA inspection results are

recorded based on several different characteristics.

The other filter criteria are not explained in detail here, as they are self-explanatory.

Selection of the data set

In  this  application  characteristics  can  generally  be  identified  either  by  the  OP  sequence  number  or  the

characteristic number.

If filtered by the OP sequence, a characteristic can be identified uniquely within an inspection plan. This

can  be  useful,  for  example,  even  if  an  inspection  plan  includes  several  characteristics  with  identical

characteristic number.

If  filtered  by  the  characteristic  number,  reports  can  also  be  started  if  the  number  and/or  order  of

characteristics has changed over several inspection plans.

Automatic start of qs-STAT®

The  user  has  to  make  sure  that  the  file  extension  is  connected  with  the  correct  program  to  start  the

relevant qs-STAT® program automatically after an export. If assistance is required Q-DAS (manufacturer

of qs-STAT®) has to be contacted.

MOC_QsStatExport.docx

Version: 1.0.1362

Page 2 of 2

