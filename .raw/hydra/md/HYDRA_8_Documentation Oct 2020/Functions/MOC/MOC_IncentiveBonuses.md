Bonuses
1 Bonuses
Summary
Menu Data Collection  Incentive Wages  Bonuses
Transaction code bonus
Function authorization bonus
Bonuses allow for corrective action to be taken with respect to calculating wages. Bonuses may be
assigned for piecework for each day, person and order. For group premiums they may be allocated for
each premium group and day.
Bonuses may have a positive or negative effect for employees. A bonus that has a negative effect also
has a negative algebraic sign and is also designated as deduction.
MOC_IncentiveBonuses.docx Version: 1.1.1362 Page 1 of 4

Bonuses
Within the framework of wage computation that has been adjusted by the “premium/incentive wage based
on formulas” option, bonuses are occasionally used to record external data.
Field Descriptions
Person, order/OP, premium group
Key to assign the bonus/deduction. When it comes to bonuses without premium group, the
personnel number as well as the order number need to be indicated. However, personnel and order
numbers are no mandatory fields for premium groups bonuses.
Article, planned workplace
Shows the article and workplace onto which the operation is planned. These fields derive from the
operation and cannot be changed.
Reason
Reason for which the bonus/deduction has been assigned. The configuration of bonus reasons is
described in a separate document.
Date, time
When it comes to bonuses/deductions for people, all bonuses are imputed to the person’s time
ticket that corresponds to the order/OP using the “date” criterion. In case the bonus/deduction
matches several time tickets, it is divided among these time tickets.
For bonuses/deductions for premium groups, the bonus/deduction is assigned by the “date” and
“premium group” and allocated on the corresponding premium group day.
Please note: The “time” factor does not affect the calculation of wages. It only specifies the input
time when bonuses/deductions are recorded at the terminal.
Value
Bonus as decimal value. By default, the bonus is a point in time stated in the industrial minutes
format HH,III. A negative algebraic sign identifies a “deduction”. Bonuses might be entered in other
units, e.g. as percentage rates or quantities, when it comes to customer-specific wage calculation
that is adjusted by the “premium/incentive wage based on formulas” option.
Quantity, t , approver
e
Instead of an absolute value, it is possible to enter a bonus t and a quantity, which is then
e
automatically converted to an absolute value if the bonus was entered at the terminal. The values
that were originally entered at the terminal are saved here.
The approving foreman may also be entered at the terminal and saved here.
MOC_IncentiveBonuses.docx Version: 1.1.1362 Page 2 of 4

|     |     |     | Bonuses  |
| --- | --- | --- | -------- |

Editing Functions
The below window opens in which a data record can be edited:

Toolbar
 Authorize
| Function authorization: bonus.sign  |     |     |     |
| ----------------------------------- | --- | --- | --- |
Sign bonus.

| MOC_IncentiveBonuses.docx  |     | Version: 1.1.1362  | Page 3 of 4  |
| -------------------------- | --- | ------------------ | ------------ |

|     |     |     | Bonuses  |
| --- | --- | --- | -------- |

Bonuses entered at the terminal might be subject to authorization if this is configured at the bonus
reason.
 Reject
| Function authorization: bonus.reject  |     |     |     |
| ------------------------------------- | --- | --- | --- |
Reject bonus. The bonus is not allocated in this case.
Bonuses entered at the terminal might be subject to authorization if this is configured at the bonus
reason.

| MOC_IncentiveBonuses.docx  |     | Version: 1.1.1362  | Page 4 of 4  |
| -------------------------- | --- | ------------------ | ------------ |