Personal Day Types

1  Personal Day Types

Overview

HYDRA menu

Human resources management  Planning  Personal day types

FEDRA menu

Advanced Resource Planning  Master data  Personal day types

Transaction code

pdat

Function authorization

pdat

You can use the application Personal day types to assign a working time day type or payment day type to

a person, a cost center, an area or an entire company for a specified period. This entry then overrides the

specification in the relevant working time or payment model.

Using  this  function,  you  can  make  short-term  and  individual  changes  of  the  working  time  and  payment

without having to change the relevant models.

MOC_PersonalDayTypes.docx

Version: 1.1.23476

Page 1 of 5

Personal Day Types

Purpose

The display of planned personal models is sorted in descending order by date, i.e., the current and future

plans are on top.

When you define personal day types, the following priorities apply:

1. Person

2. Cost center

3. Area

4. Company

That means that person-related plans override cost center related plans. Personal day types for

an area override company-related plans.

Selection criteria

The application provides the following selection criteria:

Valid from, valid until

Only the personal day types included in this period are available for selection.

Field descriptions

Company, Person, Cost center, Area

Selection criteria for the person or group of persons for which you want to plan a personal day type.

You must additionally select the company if several companies are managed in the system and the

allocation by company is not clear and unambiguous.

Valid from, to

Start and end date of the planning of the personal day type. If you leave the end date field empty, a

plan without time limit is created.

Working time day type

Working time day type that is used to evaluate the selected person or group of persons.

Shift type

Shift type of the working time day type.

Payment day type

The Payment day type used to settle the working time.

MOC_PersonalDayTypes.docx

Version: 1.1.23476

Page 2 of 5

Personal Day Types

Using  the  function  Personal  day  types,  you  can  plan  the  working  time,  the  payment  or  both.

Information  that  is  missing  during  planning  is  completed  with  values  from  the  models  of  the

relevant person. Example: To plan a different shift type, you do not  need to enter the shift day

type.

If  you  want  to  use  a  personal  day  type  to  store  a  different  working  time  day  type  for  a  longer

period, then you usually have to create a separate planning for each week. Otherwise the target

time is also stored for the weekends.

Comment

You  can  enter  a  comment  in  this  field.  You  can  enter  the  reason  why  a  personal  day  type  is

created, for example.

Color

You can use this field to specify a color that identifies the days for which a personal day type is

stored. Using different colors you can identify the changes of different users. In this case, each

user highlights the personal day types with a different color.

The

field

Color

is

only

available

if

the

extension

PersonalDayTypesInPersonalTimeMaintenance is activated.

Working time before beginning of skeleton time

If the field Working time before beginning of skeleton time is set to Rejected, then the working

time before start of skeleton time is rounded up  to the start of the skeleton time. These fields

therefore override the rounding settings specified in the Control of labor time calculation.

If the field Working time before beginning of skeleton time is set to Approved, then the working

time  before  start  of  skeleton  time  is  rounded  using  the  rounding  settings  Working  time  before

beginning  of  skeleton  time  specified  in  the  Control  of  labor  time  calculation.  If  these  rounding

settings are empty, the time is rounded using the normal rounding settings for  flextime or shift.

Times that are blocked in the Control of labor time calculation are not processed if the working

time  before  start  of  skeleton  time  is  approved  (it  does  not  matter  if  the  blocked  times  are

included  in  the  skeleton,  core  or  normal  time  because  in  all  3  cases  the  working  time  before

start of skeleton time can be subject to blocking).

If the field Working time before beginning of skeleton time is set to Approved and if a payment

rule  is  set  for  the  Working  time  before  beginning  of  skeleton  time  that  requires  authorization,

then this authorization requirement is reset.

MOC_PersonalDayTypes.docx

Version: 1.1.23476

Page 3 of 5

Personal Day Types

The field  Working time before beginning of skeleton time is only available if the extension

PersonalDayTypesInPersonalTimeMaintenance is activated.

Working time after end of skeleton time

If the field Working time after end of skeleton time is set to Rejected, then the working time after

end  of  skeleton  time  is  rounded  down  to  the  end  of  the  skeleton  time.  These  fields  therefore

override the rounding settings specified in the Control of labor time calculation.

If  the  field  Working  time  after  end  of  skeleton  time  is  set  to  Approved,  then  the  working  time

after  end  of  skeleton  time  is  rounded  using  the  rounding  settings  Working  time  after  end  of

skeleton  time  specified  in  the  Control  of  labor  time  calculation.  If  these  rounding  settings  are

empty, the time is rounded using the normal rounding settings for  flextime or shift. Times that

are blocked in the Control of labor time calculation are not processed if the working time after

end  of  skeleton  time  is  approved  (it  does  not  matter  if  the  blocked  times  are  included  in  the

skeleton, core or normal time because in all 3 cases the working time after end of skeleton time

can be subject to blocking).

If the field Working time after end of skeleton time is set to Approved and if a payment rule is

set  for  the  Working  time  after  end  of  skeleton  time  that  requires  authorization,  then  this

authorization requirement is reset.

The  field    Working  time  after  end  of  skeleton  time  is  only  available  if  the  extension

PersonalDayTypesInPersonalTimeMaintenance is activated.

Breaks not taken

The options in the group  Breaks not taken hide the respective breaks. The options also have

an  effect  when  you  plan  a  personal  working  time.  The  personal  working  time  therefore  takes

priority  over  the  working  time  day  types  und  the  shift  type  in  the  personal  day  type.  But  the

personal  working  time  has  a  lower  priority  than  the  options  of  group  Breaks  not  taken.  If  a

Break  depending  on  working  time  is  stored,  this  break  is  processed  and  the  setting  of  the

options in group Breaks not taken has no effect. This can have the effect that the break of the

working time day type is not processed, but the break depending on working time is processed.

The

field

Breaks

not

taken

is

only

available

if

the

extension

PersonalDayTypesInPersonalTimeMaintenance is activated.

MOC_PersonalDayTypes.docx

Version: 1.1.23476

Page 4 of 5

Personal Day Types

Toolbar

Reset labor time calculation

In the dialog Reset labor time calculation, you must reset the results of the labor time calculation for

plannings  of  the  past  for  the  persons  and  dates  selected.  Only  then  the  changes  can  become

effective.

MOC_PersonalDayTypes.docx

Version: 1.1.23476

Page 5 of 5

