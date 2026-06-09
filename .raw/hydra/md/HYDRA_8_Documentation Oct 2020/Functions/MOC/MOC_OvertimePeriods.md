Periods for Overtime Calculation

1  Periods for Overtime Calculation

Summary

Menu

Master Data  Labor Time  Periods for Overtime Calculation

Transaction code

ptop

Function authorization

ptop

The periods for overtime calculation are defined in this dialog.

Utilization

Overtimes may be compensated on the level of days, weeks or settlement periods. The selected period

affects the process of evaluations:

-  Overtime compensation on a daily basis has the advantage that wage types are evaluated quickly

and  posted  clearly.  Provided  that  no  urgent  reasons  in  favor  of  longer  periods  are  available,  we

recommend to configured the “daily” period.

MOC_OvertimePeriods.docx

Version: 1.1.18468

Page 1 of 3

Periods for Overtime Calculation

-  Overtime  compensation  on  a  weekly  basis  is  used  if  weekly  remuneration  rules  are  available  and

results  in  overtime  and  reduced  working  hours  to  be  balanced  during  the  week  and  the  result  of

overtime or reduced working time to be compensated at the end of the week using the overtime type

that  is  entered  in  the  HR  master.  The  entire  week  is  recalculated  if  a  clocking  record  changes  as

overtime or reduced working hours might have changed as well. For this reason the daily evaluation

for weekly overtime periods takes a little bit longer.

Examples for weekly remuneration rules:

The first five hours of “overtime” during the week are paid with an overtime bonus of 25%. A bonus

of 50% is paid once five hours of overtime have been exceeded during the week.

-  When it comes to the compensation on the basis of settlement periods the entire settlement period

is recalculated. This kind of settlement is rarely used. Remuneration rules on the basis of settlement

periods are mostly represented by account limits.

Periods for overtime calculation that apply to periods of the past cannot be deleted. Changing of

periods for  overtime calculation applying to the past  might lead to  errors in the  compensation.

The  validity  end  date  of  the  current  configuration  has  to  be  set  and  a  new  entry  needs  to  be

created to avoid this.

Field Descriptions

Valid, until

Validity  period  to  configure  periods  for  over  time  calculation.  The  configuration  applies  without

restrictions  if  both  fields  remain  empty.  The  validity  end  date  normally  remains  empty  and  is  only

set if the periods for overtime calculation change as of a specific date.

Type

Daily

Daily periods for overtime calculation are configure using this option.

Weekly

This option configures weekly periods for overtime calculation.  Partial periods are generated at the

end of the settlement period if this  option is set. The  results of the first partial  week are taken  into

account, when the second partial week is evaluated. But wage types that have already been posted

are no longer changed.

Settlement periods

If  this  field  is  selected  periods  for  overtime  calculation  are  processed  just  as  it  is  the  case  for

settlement periods.

Periods

If this field is selected configurations for fixed periods can be created.

MOC_OvertimePeriods.docx

Version: 1.1.18468

Page 2 of 3

Periods for Overtime Calculation

Duration of a period

Only enabled for the “periods” type:

Duration of a period in days. “7” is entered here for weekly compensations.

Start of first period

Only enabled for the “periods” type:

Defines on which day the first period is supposed to start for the overtime calculation. This field may

include the following entries:

<Leer>:

The

first  period  starts  on

the  entered  validity  start  date.

Mon/Tue/Wed/Thu/Fri/Sat/Sun:  Weekday

in

the

first  week  after

the  validity  start  date

when the first period starts.

Partial periods at the end of settlement periods

Only enabled for the “periods” type:

If  this  option  is  checked  partial  periods  are  generated  at  the  end  of  the  settlement  period.  The

results of the first partial week are taken into account, when the second partial week is evaluated.

But  wage  types  that  have  already  been  posted  are  not  changed  anymore.  This  configuration  is

required if the settlement is to be made before the second partial week is over.

If this option is disabled the month-end closing may only be performed once the complete week is

over  that  includes  the  two  different  settlement  periods,  as  evaluated  days  of  the  new  settlement

period may affect the data of the previous settlement period.

MOC_OvertimePeriods.docx

Version: 1.1.18468

Page 3 of 3

