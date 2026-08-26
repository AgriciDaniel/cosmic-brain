Implementation PZW

1

Implementation PZW

This  list  contains  all  steps,  which  must  be  carried  out  in  order  to  start  the  module  Personnel  Time

Management:

1.Definition of holidays

2.Creation of the working time day types

3. Creating working times and shift rhythm models

4. Input of wage types

5. Creation of remuneration day types, absence remunerations and overtime types

6. Creating payment models

7. Maintenance of absence remuneration for the holidays

8. Setting control of labor time calculation

9. Definition of user names and passwords

10.Assignment of function authorizations and responsibility areas

11.Creation of employees

12.Assignment of clocking authorization

13.Creating periods overtime calculation (per company if deviating from daily)

14.Creating settlement periods (per company)

15.Prepare the employee identification (staff badges)

16.Configuration of the PZE terminal and introduction of employees to the terminal

17.Transfer account balances from the old system (see section)

Implementing_PZW.docx

Version: 1.0.5771

Page 1 of 2

Implementation PZW

Transfer account balances from the old system

Can  holiday  and  time  accounts  from  a  previous  system  be  integrated  into  HYDRA  if  HYDRA  PZW  is

introduced into a company?  Usually,  at the time of the transfer from one system to the other, the exact

values of the accounts are not yet known. For example, applications for leave and sick notes are still missing

or incorrect clockings are in the system.

Example:

Up to now, working time has been recorded in your company using a conventional time clock. The

clocking cards were evaluated manually; a leave account and a flextime account were kept using file

cards. HYDRA PZE has been successfully used for one month. A trial run was carried out using a

few  "sample"  employees  (tip:  do  no  use  real  personnel  numbers  in  the  trial  run,  as  it  is  more

convenient if employees start without a previous history in HYDRA). From the 1st August, time and

attendance should be carried out in HYDRA exclusively.

Procedure:

1.  Enter personnel into HR master data before the 1st of August. Set the entry date to the date

when the person had entered the company. Enter the date in the field "First allocation" in the tab

"Personnel time" to the 1st of August in order to avoid premature allocation.  Assign working

time and payment models to the staff. Enter holiday entitlements for the whole year.  The entry

has not effect on the current holiday account.  Leave all accounts of the staff on 0.

2.  During August, calculate the account balances for the end of July from the leave and flextime

accounts of the old time and attendance system.

3.

Then during August, enter the account balances from the old time and attendance system in the

current  account  balances  in  HYDRA  (Account  balance  dialog).  The  account  balances,  which

have  already  been  accumulated  in  HYDRA,  must  be  merged  with  the  balances  from  the  old

system. Example: After the transfer, 17.0 days of leave from the old system and a HYDRA leave

account balance of -2.0 days, give a new account balance of 15.0 days. After the transfer, a

flexitime account balance of 10.45 hours from the old system and a HYDRA flexitime account

balance of 0:47 hours result in a flextime account balance of 11:32 hours.

It is important that this transfer take place during the first month, so that the month evaluation

can book the changes in the first month.

Implementing_PZW.docx

Version: 1.0.5771

Page 2 of 2

