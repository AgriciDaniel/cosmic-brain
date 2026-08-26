Cost Center Posting

1  Cost Center Posting

Summary

The  additional  module  “cost  center  posting”  allows  for  a  cost  center  to  be  recorded  in  addition  to  the

clock-in  and  clock-out  times.  The  cost  center  is  entered  every  time  when  it  comes  to  a  clock-in  or  an

alternate  clocking.  If  no  cost  center  is  entered  the  system  posts  the  hours  worked  onto  the  employee’s

master cost center.

Consequently, it can be requested how much time has been posted onto the individual cost centers over

any  period  of  time.  Another  report  shows  how  much  time  an  employee  has  spent  on  the  different  cost

centers.

The times are divided by wage types, which makes it possible to calculate the amount with which the cost

center is to be charged.

Definition of cost centers

Cost centers are defined in the cost centers application.

Collection of cost centers at the terminal

There are different possibilities to enter the cost center at the terminal:

By cost center badges

In this context, a cost center badge is read in at the terminal before the clock-in is performed. The

corresponding  cost  center  is  displayed  and  entered  along  with  the  clock-in  that  follows.  This  cost

center will be charged until the next clock-in (with or without another cost center card) or clock-out

takes place.

By cost center buttons

With this option, one or several function keys of the terminal are assigned to a cost center. Before

clocking-in,  the  user  has  to  decide  on  which  cost  center  the  time  is  to  be  posted.  In  this  case  as

well, this cost center will be charged until the next clocking follows.

By a cost center list

With  this  option,  a  function  key  of  the  terminal  is  assigned  to  the  cost  center  list  function.  This

function key has to be selected prior to clocking-in. After posting using the staff badge, a list opens

that  includes  all  cost  centers  that  exist  for  the  employee’s  company.  The  employee  may  select  a

cost  center  from  the  list.  After  affirming  this  by  clicking  “OK”,  the  cost  center  is  posted  with  the

clocking. In this case as well, this cost center will be charged until the next clocking follows.

MOC_CostCenterBooking.docx

Version: 1.1.18468

Page 1 of 5

Cost Center Posting

By terminal configuration

If  a  cost  center  is  entered  within  the  terminal  configuration,  all  clocking  records  performed  at  this

terminal will be posted on to the entered cost center. This cost center can be overridden by a cost

center entered at the terminal using the cost center badges, cost center buttons or cost center list.

In  the  basic  parameter  settings  of  PZE,  it  is  possible  to  automatically  interpret  several,

successive  clocking-ins  as  alternate  clockings.  In  this  context,  the  previous  clocking-in  is

automatically completed with a clocking-out.

Only terminals of the type series CT-36x, CT-37x and CT-38x support cost center lists.

Print Cost Center Badges

The cost centers application describes how cost center badges are printed.

Cost  center  badges  require  card  cases  that  are  wider  than  those  for  staff  badges.  The

corresponding perforated paper can also be purchased from MPDV.

Cost center badges can only be printed  if the corresponding company  and cost center  do not

include lower case letters. Upper case letters are allowed only.

MOC_CostCenterBooking.docx

Version: 1.1.18468

Page 2 of 5

Configuration of a Cost Center Button

Cost center buttons are configured in the terminal configuration in the “HR functions” tab:

Cost Center Posting

By entering “KST”, the corresponding button is defined as cost center button. The cost center is defined

within the corresponding text. The designation of this cost center may be entered behind the cost center,

separated by  a blank. If a  comma is inserted between the cost center and  its designation  only the cost

center designation will be displayed on the function key and when cost centers are posted.

Cost center keys are only supported by terminals of the types series CT-36x, CT-37x and CT-

38x.

Configuration of a Cost Center List

The key for the cost center list  is also configured  within  the  terminal configuration in the “HR functions”

tab:

MOC_CostCenterBooking.docx

Version: 1.1.18468

Page 3 of 5

Cost Center Posting

The entry “KSL” defines the corresponding key for the cost center list. The key labeling is defined within

the designation field.

Only terminals of the type series CT-36x, CT-37x and CT-38x support cost center lists.

MOC_CostCenterBooking.docx

Version: 1.1.18468

Page 4 of 5

Cost Center Posting

Evaluations By Cost Centers

The wage type statistics dialog provides the “charged cost center” category.

A  list  showing  the  times  incurred  per  cost  center  is  displayed  by  grouping  the  “charged  cost  center”

column, for example.

The cost center in the “person” category is the person’s master cost center.

When the  wage  types statistics function  is configured, it  has to be  taken into account that the

time to be evaluated (e.g. the attendance time) is completely represented by the selected wage

types.  In  addition,  it  has  to  be  ensured  that  no  wage  data  is  used,  which  includes  the

corresponding time twice or several times.

MOC_CostCenterBooking.docx

Version: 1.1.18468

Page 5 of 5

