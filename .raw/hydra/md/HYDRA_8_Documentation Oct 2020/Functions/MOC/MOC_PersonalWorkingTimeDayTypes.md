Working Time Day Types

1  Working Time Day Types

Summary

HYDRA menu

Human resource management  Models  Working time day types

FEDRA menu

Advanced resource planning  Master data  Working time day types

Transaction code

wtdt

Function authorization  wtdt

All of the various employee working times are defined in the working time day types.

Usage

To  specify  the  working  time  for  a  shift  worker,  all  of  the  shifts  that  occur  in  a  day  are  entered  in  the

working  time  day  type.  Each  shift  of  the  day  is  represented  in  a  working  time  day  type,  each  of  which

contains an identifier referring to the corresponding shift, e.g. 'F' for early shift, 'S' for late shift, etc.

MOC_PersonalWorkingTimeDayTypes.docxVersion: 1.1.23500

Page 1 of 5

Working Time Day Types

Field descriptions for the Working time tab

Type

Selection regarding whether the type is flextime or shift day type.

Shift type

In  working  time  planning  in  the  shift  rhythm  model,  the  shift  type  field  is  used  to  plan  one  of  the

shifts defined in the day type for the employee. The designation can be freely selected although the

system  is  case  sensitive.  The  shift  types  within  one  day  type  must  be  different.  Self-explanatory

abbreviations, such as "F" for early shift and "N" for night shift, are useful.

A  night  shift  that  is  to  be  compensated  on  the  following  day  is  configured  using  a

negative  start  time  in  skeleton  and  normal  time.  For  example,  the  entry  "-2:00"  means

that  the  shift  starts  two  hours  before  0:00,  or  at  22:00  on  the  previous  day.  If  the  core

time  is  also  to  begin  on  the  previous  day,  a  negative  time must  also  be  entered  in  the

corresponding field.

Target time

Specification  of  the  daily  target  working  time  in  hours  and  minutes.  For  day  types  for  occasional

Saturday or Sunday work, the value 00:00 is entered in this field to specify that there is no target

working  time for  this  day.  For  employees  that  are  not  present,  this means  that  an  absence  is  not

generated  for  this  day.  For  employees  that  are  present,  the  attendance  time  is  evaluated  as

overtime.

Max. working time

The  entry  in  the  Max.  working  time  field  causes  a  message  to  appear  in  the  day  evaluation  if  an

employee  exceeds  the  maximum  working  time  on  the  day  evaluated.  Otherwise,  the  entry  in  this

field has no other effect, i.e. working time that exceeds the maximum working time is compensated.

If this field is empty (entry of 00:00), no message is generated.

Rest period

The rest period specifies how long after the end of the working time employees have to rest before

they are allowed to resume work on the next day. Planning scenarios violating the rest period are

highlighted in pink in Personnel Scheduling. Provided that the rest period has not been respected,

Labor Time Calculation generates a respective message that is shown in Messages listing

The "rest period" field is only available if the modification PZW_RUHEZ is enabled.

Beginning, end of skeleton time

Specification of the period in which employee presence is allowed. Control of labor time calculation

can be used to define whether or not the working time before or after the beginning/ end of skeleton

time is to be compensated.

MOC_PersonalWorkingTimeDayTypes.docxVersion: 1.1.23500

Page 2 of 5

Working Time Day Types

Beginning, end of core time

Specification  of  the  period  in  which  the  employee  must  be  present.  If  the  employee  leaves  the

workplace early or the clock-in is late, a message is generated in the messages listing.

For day types  without core time, an entry  must be made  anyway  in the core  time field  within the

skeleton time (e.g. core time from 11:30 to 11:30).

Beginning, end of normal time

If an employee does not provide a clocking on the day to be evaluated even though the employee

was  assigned  target  working  time,  i.e.  the  employee  was  absent  the  entire  day,  normal  working

time is compensated. The absence record created for the employee starts at the normal start time,

contains the normal breaks and ends such that the target time or the set absence time is reached.

The rounding of clockings is also set based on the normal working time. The normal working time is

also needed for the assignment regarding whether the working time belongs to the current day or

the following day. For this reason, it is imperative that an entry be made in this field.

Field descriptions for the Breaks tab

Break 1 to Break 3

In these three groups, a skeleton time, a minimum duration and a normal time can be entered for

each break. In addition, a specification can be made regarding whether the break is unpaid or paid.

While unpaid breaks are subtracted from the working time, paid breaks count as working time and

are  considered  in  the  compensation  of  breaks  depending  on  working  time,  for  example.  For  day

types that include fewer than three breaks, the other break fields remain empty.

For paid breaks, the field Minimum duration is processed as maximum duration.

Note regarding the processing of flexible breaks

Flexible  breaks  are  unpaid  breaks  in  which  the  period  of  the  break  frame  is  longer  than  the

minimum duration of the break. The following rules apply for processing flexible breaks:

  1.  The employee is present, but does not create a clocking within the break frame. If the system does

not  find  a  clocking  within  the  break  frame,  the  employee  is  credited  with  the  normal  time  for  the

respective break.

  2.  If  the  employee  creates  a  clocking  within  a  break  frame  and  the  clocked  time  is  longer  than  the

minimum break, exactly that clocked time is subtracted for the employee.

  3.  If  the  employee  creates  a  clocking  within  a  break  frame  and  the  clocked  time  is  shorter  than  the

minimum break, the minimum break is subtracted for the employee.

MOC_PersonalWorkingTimeDayTypes.docxVersion: 1.1.23500

Page 3 of 5

Working Time Day Types

  4.  If  only  one  of  the  two  clockings  lies  within  the  break  frame,  only  the  time  within  the  frame  is

evaluated as a break. The time outside of the frame is subtracted as an interruption of the working

time. This takes effect if only a small part of the clocked break is within the frame because in this

case, the minimum break is allocated as the break and the time outside of the break frame is also

subtracted.

  5.  If the employee uses the final clock-out for the respective day before the end frame of a break, the

time for this break is not credited.

  6.  If the employee uses the first clock-in for the respective day after the start frame of a break, the time

for this break is not credited either.

  7.  Clockings within the break frame time can have their own rounding interval defined for them in the

evaluation parameters.

  8.  Normal breaks are always allocated for absence records.

Note regarding the processing of paid breaks

The following rules apply for processing paid breaks:

  1.  If no clocking is created for the break, nothing is subtracted for the break. The duration of the paid

break is still considered in the compensation of the breaks depending on working time.

  2.  If a break clocking is created within the frame of a paid break, it is filled with working time up to the

minimum  duration  of  the  break.  To  do  this,  an  additional  clocking  record  of  type  "Paid  break"  is

generated.  If  the  break  was  longer  than  the  minimum  duration,  the  remainder  is  subtracted  as  an

unpaid break.

  3.  To  determine  the  break  duration,  only  the  absence  within  the  break  frame  is  used.  Absence  time

outside of the break frame is allocated as a working time interruption and is not considered when the

interruption is filled with a paid break.

Only  one  paid  break may  be  clocked  per  break frame.  Multiple  paid  breaks  within  one  break

frame cannot be processed correctly.

Field descriptions for the On-call duty tab

Beginning, end of on-call duty

Up to two on-call duty intervals can be stored in the working time day type. Setting up on-call duty is

described in the On-call duty documentation.

The  fields  in  the  On-call  duty  tab  can  only  be  accessed  if  the  Personnel  Scheduling  license

(PZW-PZP) is active (only applicable if HYDRA is used).

MOC_PersonalWorkingTimeDayTypes.docxVersion: 1.1.23500

Page 4 of 5

Working Time Day Types

Field descriptions for the Payment tab

Day type

The entry in this field is the payment day type that is to be compensated together with this working

time day type.

As  an  alternative,  there  is  an  option  to  specify  the  payment  using  the  payment  model  assigned

using  the  HR  master  data  sheet.  If  a  payment  day  type  is  entered  in  this  payment  model,  it  has

precedence over the payment day type entered here in the working time day type.

Field descriptions for the Options tab

Free break

In  addition  to  the  three  breaks  in  the  Working  time  tab,  a  free  break  can  be  subtracted  from  the

working time of each employee. This break can be distributed over the day. This field is not used to

enter the total of all breaks. The free break is always subtracted at the end of the day regardless of

the amount of working time, i.e. it is even allocated if an employee was only present for a short

time.

Compensation of target time starting

This option can be used to select if the compensation of the target time is to occur beginning with

the start of the working time, the frame, the normal time or the core time. For example, if the start of

the frame is set and the employee  worked overtime, the target time is filled  with the working time

after  the  start  of  the  frame  and  the  previous  time  (time  before  frame  start  or  parts  of  it)  are

compensated  as  overtime.  With  the  Working  time  start  setting,  any  possible  existing  overtime  is

always compensated at the end of the working time.

MOC_PersonalWorkingTimeDayTypes.docxVersion: 1.1.23500

Page 5 of 5

