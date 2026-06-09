Evaluation date

1  Evaluation Date

Definition

The settlement date defines to which logical settlement date a data record belongs. In particular in night

shifts the settlement date may be different from the posting date.

Synonyms

Settlement date, settlement day.

Example

A  night  shift  starts  on  10:00  pm  and  ends  on  6:00  am  of  the  next  day.  An  order  posting  or  a  clocking

record from personnel time management from 4:00 am to 6:00 am of the following day will, however, still

belong to that day on which the night shift starts. The settlement date will be that day, on which the shift

starts.

Assignment of the evaluation date of postings from shop floor data

collection for incentive wage and labor time comparison

Both the labor time comparison and the incentive  wage calculation depend on  a uniform assignment of

the time and labor data from time and attendance and of the recorded postings from the shop floor data

collection to one consistent settlement day. In particular in case of night shifts and irregular working times

this is a certain challenge since the definition of the settlement date in PZW and  BDE itself is not carried

out according to exactly the same rules. In general, the assignment of the working time of a person to a

settlement date from PZW is leading since the subsequent day calculation carried out by PZW allows for

a  coherent  assessment  of  a  work  day,  which  is  not  possible  in  the  online  recording  of  BDE.  In  BDE,  a

personnel  posting  is  saved  online  without  that  it  is  known  whether  there  will  be  additional  personnel

postings for the same work day or not.

If therefore day-wide shift models with a  night shift possibility are  defined in the PZW or  BDE, this may

lead to differences between PZE and BDE in the labor time comparison since BDE postings are assigned

to  a  different  day  than  the  corresponding  PZW  time  due  to  varying  shift  models  and  for  evaluation

purposes.

Please check in those cases the BDE postings also for the adjacent days in the maintenance of postings

dialog.  To  assign  the  BDE  personnel  postings  to  a  settlement  date,  two  columns  are  used  that  can  be

displayed in the list of the maintenance of postings dialog:

GLOSSARY_EvaluationDate.docx

Version: 1.0.1362

Page 1 of 3

Evaluation date

Field settl. date

If the settlement date is completed, the BDE-posting will be assigned to that day. The field will be

completed  by  the  PZW  labor  time  calculation  or  the  editing  of  postings  relating  to  orders  or  the

wage calculation.

This means that the field for all postings of the current day will normally first be empty and only be

updated on the next  morning through the  PZE  labor time calculation and/or the  wage calculation.

This means that postings of the current day may initially be incorrectly assigned to the day before.

This incorrect assignment will in general automatically disappear on the next day.

Please  note:  The  PZW  labor  time  calculation  only  fills  out  the  settlement  date  in  the  personnel

postings of BDE if one of the functions LLE-BPL (calculation of bonus/incentive wages), SIS-APB

(comparison of labor/shop floor times) or SIS-NPB (subsequent input of labor/shop floor postings)

has been licensed.

Field shift date

If the field Settl.date is empty, the field shift date will be used for assignment purposes. If the shift

date does regularly not match the PZE assignment, the BDE shift models must be adapted.

Assignment by labor time calculation (personnel time management)

By  default,  the  assignment  of  the  BDE  postings  to  PZE  work  days  is  made  according  to  the  following

rules.  Please  note that  these default rules may have  been changed by the customizing of the incentive

wage determination.

BDE personnel postings (B records)

Personnel  postings  are  assigned  to  the  PZE  personal  performance  (day)  if  they  reach  into  the

rounded working times of the posting person in a time frame of +/- 2 hours. If a personnel posting

takes several days, it will be assigned to the first possible PZW personal performance (day) since

the log-off has usually been forgotten in those cases.

Order related BDE postings

Order-related BDE postings may be accounted for in the calculation of  a LLE group incentive. For

the BDE/PZE comparison itself they are not important.

BDE  order  postings  (U/E/T  records)  are  assigned  to  the  PZE  personal  performance  (day)  of  the

posting person to the extent that their log-off time lies in a time frame of +/- 2 hours to the rounded

working times of the posting person. If a BDE order posting takes several days, it will be assigned

to  the  last  possible  PZE  personal  performance  (day)  since  the  posting  person  of  the  BDE  order

posting  will  be  defined  from  the  log-off  event  and  since  the  person,  who  logs  off,  posts  the

quantities. If no personnel number is recorded in the BDE order posting, the settlement date cannot

be assigned on the basis of the time and attendance function.

GLOSSARY_EvaluationDate.docx

Version: 1.0.1362

Page 2 of 3

Evaluation date

Assignment by wage calculation (incentive wages)

Even if Personnel Time Management (PZW) is not used in HYDRA, wage calculation as part of incentive

wage  determination  results  in  BDE  personnel  postings  being  assigned  to  a  settlement  day  that  might

deviate from the BDE shift date. This is due to the fact that a person’s working day is to be considered as

completed even though the person works from night shift until the next day’s early shift.

Please  note  that  these  default  rules  may  have  been  changed  by  the  customizing  of  the  incentive  wage

determination.

BDE personnel postings (B records)

By default, the assignment is made according to the following rules:

1)

If a BDE personnel posting starts between 10.00 a.m. and 11.00 p.m. it pertains in any case to

the date of logging in.

2)  All BDE personnel postings starting after 11.00 p.m. and not starting later than 2.00 hours after

the previous BDE personnel posting are still assigned the considered settlement day, provided

they do not start later than 10.00 a.m. of the next day.

3)

If  a  BDE  personnel  posting  ends  after  11.00  p.m.  and  has  a  gross  duration  of  more  than  12

hours, this posting will not be affected by this rule. This is reasonable as it avoids unintentional

summarization of working days over night if persons forgot to log off.

If HYDRA Personnel Time Management (PZW) is in use, the end of day limit (11.00 p.m.) is taken

dynamically  from  the  PZW  end  time  of  the  affected  daily  personnel  performance.  The  end  of  day

limit is defined based on the PZW end time. Optionally, this limit can be extended by a configurable

tolerance by MPDV customizing services.

The start of day limit (10.00 a.m.), end of day limit (11.00 p.m.) and the maximum gap (2.00 hours)

can be modified by MPDV customizing, if required, to be able to assign the night shift to the next

day, for example (start of day limit 2.00 a.m., end of day limit 3.00 p.m.).

BDE postings relating to orders

Order-related  BDE  postings  might  be  included  in  the  calculation  of  an  LLE  group  bonus.  In  this

case,  wage  calculation  does  not  assign  them  separately  to  a  settlement  day  but  takes  over  the

assignment made in BDE (shop floor data collection) or PZW (personnel time management).

GLOSSARY_EvaluationDate.docx

Version: 1.0.1362

Page 3 of 3

