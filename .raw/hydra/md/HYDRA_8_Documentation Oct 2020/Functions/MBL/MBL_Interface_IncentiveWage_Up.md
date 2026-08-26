Premium/ Incentive Wage Uploads

1  Premium/ Incentive Wage Uploads

Wage types are transferred to the payroll or HR information system in the hylrck.dat file.

1.1  Data record structure for incentive wage uploads

The  interface  structure  matches  that  of  the  PZE  interface  file  except  that  some  of  its  unused  fields  are

filled in with specific incentive wage data.

Therefore, the information in the Data type column has the same meaning as in the PZE interface file, so

we will not explain it again here.

This file is structured as follows:

Field/ meaning

Position

Data type

Record type

Company

Area

Settlement year

Settlement month

Settlement number

Personnel number (left justified, filled with EMPTY)

Last evaluation day

Wage type (left justified, filled with EMPTY)

Preceding sign for wage type hours

Hours for wage type

Full days absent

Partial days absent

Different wage group

Different hourly rate

Amount

Year of supplementary payment

Month of supplementary payment

Executing (master) cost center

Charged cost center

Order number

Work sequence

Comments

Premium group

1

4

7

15

19

21

22

30

32

36

37

42

45

48

51

56

63

67

69

77

85

95

99

always "760"

C3

C8

N4

N2

C1 = EMPTY

C8

N2

C4

C1 = +

N5.2

N3 = 000

N3 = 000

C3 = EMPTY

N5 = 0

N7 = 0

N4 = Empty

N2 = Empty

C8

C8

C10 = EMPTY

C4 = EMPTY

C18 = EMPTY

117

C10

MBL_Interface_IncentiveWage_Up.docx

Version: 1.0.1362

Page 1 of 3

Premium/ Incentive Wage Uploads

Performance efficiency rate

Reserved for other incentive wage data

Document number

Posting indicator

127

133

142

147

N6.3

C9 = EMPTY

C5 = EMPTY

C1 = "1"

1.2  Description of data fields for incentive wage uploads

Company:

The company from HR master data is entered here.

Area:

The area from HR master data is entered here.

Last evaluation day:

The last day of the date selection, e.g. "30" or "31"

Wage type:

Wage type from the personal time tickets

Preceding sign for wage type hour:

Is always "+".

Wage type hours:

Time that is to be posted to the wage type entered in the data record. The two decimal places are

stored in industrial minutes.

Full days absent:

Filled in with 000.

Partial days absent:

Filled in with 000.

Year, month of supplementary payment:

Empty.

Executing cost center:

Person's master cost center.

Charged cost center:

Cost center from time tickets. The wage type sum is transferred separately to cost centers.

Order number, work sequence

Unused in the default.

Premium group

Premium  group  from  time  ticket.  The  sum  total  on  the  wage  types  is  transferred  separately  to

premium groups.

MBL_Interface_IncentiveWage_Up.docx

Version: 1.0.1362

Page 2 of 3

Premium/ Incentive Wage Uploads

Performance efficiency rate

The total performance efficiency rate shown on piece-work time tickets for the settlement period is

transferred  in  this  field  using  three  decimal  places.  A  performance  efficiency  rate  of  131.234%  is

converted to 131234 in this field. Six zeros (000000) are transferred on non-piece work time tickets.

1.3  Example file:

1       10        20        30        40        50        60        70        80        90       100       110       120       130       140    147
+--------+---------+---------+---------+---------+---------+---------+---------+---------+---------+---------+---------+---------+---------+-------
760BSPLLE     200802 40563   294000+11531000000   000000000000      105     105                                               122907              1
760BSPLLE     200802 40563   294017+00139000000   000000000000      105     105                                               000000              1
760BSPLLE     200802 40789   2901  +00464000000   000000000000      105                                                       000000              1
760BSPLLE     200802 40789   294000+11613000000   000000000000      105     105                                               131619              1
760BSPLLE     200802 40789   294012+03519000000   000000000000      105     105                                               000000              1
760BSPLLE     200802 40789   294017+00133000000   000000000000      105     105                                               000000              1

MBL_Interface_IncentiveWage_Up.docx

Version: 1.0.1362

Page 3 of 3

