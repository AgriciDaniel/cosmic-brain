Transferring Account Balances
1 Transferring Account Balances
A person's current account balances can be set using the PNRKTO.UPDATE dialog.
To perform account modifications, the following combination of values can be transferred:
Combination Compensation in HYDRA Logging (e.g. in the "Account
journal" list)
New account The actual current account balance The actual old account balance is
balance will be set to the new account revised by the difference made up of
balance that was transferred. the new to the old balance.
Account The actual current account balance The actual account balance is revised
modification is revised by the transferred account by the transferred modification.
modification.
New and old The desired modification is derived The old transferred account balance is
account balance from the difference between the revised by the calculated modification.
transferred old and new account Please keep in mind that the
balance. The actual current account transferred account balance may
balance is revised by the calculated deviate from the actual account balance
account modification. at the time of the modification.
The details about the account balances and the account modifications are provided in different formats
and do not depend on the account type:
1. Time accounts
The values are transferred in seconds for time accounts. Example: To achieve an account
modification of one hour, the value "|PNRKTO.KTODIFF=3600|" is transferred. If there are any
decimal places, these are ignored.
2. Day accounts
For day accounts, the values are expected as decimal places. Example: To achieve an account
modification to the leave account by four and a half days, the value "|PNRKTO.KTODIFF=4.5|" is
transferred. If there are any decimal places, they are only considered allowing for the number of
decimal places defined at the time the accounts were configured.
If the value is negative, a minus sign is placed in front of the number.
MBL_Interface_PersonalAccountBalances_Down.docx Version: 1.0.1362 Page 1 of 2

|     |     |     |     | Transferring Account Balances  |     |     |
| --- | --- | --- | --- | ------------------------------ | --- | --- |

| 1.1  | Parameters for transferring the balance accounts  |     |     |     |     |     |
| ---- | ------------------------------------------------- | --- | --- | --- | --- | --- |
In the "Must" column in the table shown below you will see IDs that show the fields where the dialogs are
necessary:
| U   | For UPDATE  |     |     |     |     |     |
| --- | ----------- | --- | --- | --- | --- | --- |
The following parameters are available:
Dialog: PNRKTO.UPDATE
| Parameter   |     | Type  Must  | Content  | Description       |     |     |
| ----------- | --- | ----------- | -------- | ----------------- | --- | --- |
| PNRKTO.FIR  |     | C4          | Company  | Person's company  |     |     |
PNRKTO.PNR  N8  U  Personnel number  Person's personnel number
PNRKTO.KTO  N1  U  Account  number  Number  of  the  account  to  be
|     |     |     | (1 to 8)  | modified.  | The  assignment  | is  |
| --- | --- | --- | --------- | ---------- | ---------------- | --- |
shown at the console when the
PZE accounts are configured.
| PNRKTO.KTODIFF   |     | N9.3  see  | Account              |     |     |     |
| ---------------- | --- | ---------- | -------------------- | --- | --- | --- |
|                  |     | above      | modification         |     |     |     |
| PNRKTO.KTOSTAND  |     | N9.3  see  | Old account balance  |     |     |     |
above
| PNRKTO.KTOSTAND:Z  |     | N9.3  see  | New account  |     |     |     |
| ------------------ | --- | ---------- | ------------ | --- | --- | --- |
|                    |     | above      | balance      |     |     |     |

| 1.2  | Data record as an example of an account modification  |     |     |     |     |     |
| ---- | ----------------------------------------------------- | --- | --- | --- | --- | --- |
The following example reduces the account balance of the account with the number 4 (usually a leave
account) by one day:
DLG=PNRKTO.UPDATE|PNRKTO.PNR=906000|PNRKTO.KTO=4|PNRKTO.KTODIFF=-1.0|

MBL_Interface_PersonalAccountBalances_Down.docx Version: 1.0.1362  Page 2 of 2