Bonus Reasons

1  Bonus Reasons

Summary

Menu

Master Data  Incentive Wages  Bonus Reasons

Transaction code

bonrea

Function authorization

bonrea.*

Bonus reasons are configured in this application.

MOC_BonusReasons.docx

Version: 1.0.1362

Page 1 of 3

Bonus Reasons

Selection Criteria

The application provides the following selection criteria:

Show authorized entries only

Bonus  reasons  are  assigned  to  a  responsibility  area.  If  this  option  is  checked  only  those  bonus

reasons are displayed for which the user has the corresponding responsibility area authorization for

editing.  Provided  that  the  option  is  not  active,  all  other  bonus  reasons  may  be  displayed  but  not

edited.

Field Descriptions

Reason, designation

Number and description of the bonus reason.

Affects

Affects target time or actual time when group bonuses are computed. Consequently, the bonus is

processed  as  credit  above  the  fraction  line  (target  time)  or  below  the  fraction  line  (actual  time),

when the performance efficiency rate is calculated for the premium group.

This option does not affect bonuses for individual piecework. These bonuses/deductions are always

charged to the standard time of piecework.

Posting indicator

Optional  input.  If  this  field  includes  “-AKK”  bonuses/deductions  with  this  bonus/deduction  reason

are  not  offset  with  piecework  time  tickets.  This  allows  for  any  data  to  be  recorded  with

bonuses/deductions, which exactly is not to be charged to piecework time  tickets. The field is also

used in premium/incentive wages based on formulas.

Responsibility area

Responsibility area to check authorizations. The responsibility area may also remain empty.

BDE authorization

If the bonus is  entered by  operators at the  terminal:  Authorization level for terminal postings. The

person  sending  the  posting  must  at  least  have  the  authorization  level  that  is  entered  here.  If  no

authorization level is entered the person sending the posting must at least be assigned to level 3.

Authorization required

If the bonus is entered by operators at the terminal:

If this option is checked the bonus requires approval if it is entered at the terminal.

If  the  bonus  is  entered  by  an  administrator  at  the  HYDRA  client  it  is  automatically  considered  as

being approved.

MOC_BonusReasons.docx

Version: 1.0.1362

Page 2 of 3

Allocate if still subject to authorization

If the bonus is entered by operators at the terminal: If this option is checked the bonus is allocated

for the computing of wages even if it is still subject to authorization. If the option is not checked

bonuses that are subject to authorization are only allocated, once they have been approved.

Bonus Reasons

MOC_BonusReasons.docx

Version: 1.0.1362

Page 3 of 3

