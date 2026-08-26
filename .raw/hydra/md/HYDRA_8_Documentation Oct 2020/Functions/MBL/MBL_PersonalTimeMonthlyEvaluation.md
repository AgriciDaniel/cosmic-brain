Monthly calculation process
1 Monthly Calculation Process
Summary
In the monthly evaluation the wage type postings are summarized for the settlement period and account
limitations are carried out. The monthly evaluation can also be started for the current, ongoing month. In
this case, only the previously existing results will be summarized. In contrast, accounts are only limited for
past months.
When the daily results from previous months are corrected and reevaluated, the monthly evaluation for
this month runs with the labor time calculation. Other months that lie between that month and the current
month will also be evaluated.
This ensures that once the corrections have been made, the limitation of the accounts will again be made
on the basis of the current data and that the account balances at the beginning and at the end of the
month will also be corrected.
Messages resulting from the monthly evaluation
For company ... the settlement period for the year ... is missing Period ...
This message will be displayed for persons, for whose company no monthly periods are stored in
the current year.
Wage type posting subject to authorization is available for monthly evaluation
This message will be created when there are still postings subject to authorization for this period in
a monthly evaluation.
Locked at monthly calculation by application ...
When the monthly calculation was carried out, the person was locked. The application will show
why the lock was set.
Account ... limited from ... to ...
If an account was limited during the monthly evaluation, this will be recorded together with a
corresponding message in the month's messages listing.
Monthly evaluation has to be performed
When data are changed that are older than one month, the months between that and the current
month will be subjected to an evaluation. The messages listing of the month will then show through
this message that the current monthly result is no longer up to date.
MBL_PersonalTimeMonthlyEvaluation.docxVersion: 1.0.1362 Page 1 of 2

|     |     | Monthly calculation process  |
| --- | --- | ---------------------------- |

Blocking time and attendance data after end of month
When the interface file is created, the monthly events for the people concerned are marked as finished.
The function authorization PZD (PZE temporary data access) can be used as a control mechanism for
specific users to define that data can no longer be modified once the month has been settled. Here, the
authorization level determines how many months the user is allowed access:

PZD function authorization  Meaning
| Does not exist         | Unlimited access                          |     |
| ---------------------- | ----------------------------------------- | --- |
| Authorization level 1  | Access to the current month               |     |
| Authorization level 2  | Access to the current and the previously  |     |
completed month
Authorization level 3  Access to the current and the two previously
completed months
...  ...

MBL_PersonalTimeMonthlyEvaluation.docxVersion: 1.0.1362  Page 2 of 2