|     |     |     | BDE Log Records  |
| --- | --- | --- | ---------------- |

1  BDE Log Records
| 1.1  | General  |     |     |
| ---- | -------- | --- | --- |
The "posting" function generates log records from recorded events. Log records describe a period of time
and include the evaluation of different values, such as quantities, durations or performances.
A BDE log record is an evaluated data record that is generated due to posting events. "Evaluated" means
that this data record
  generally refers to a period of time (in an extreme case, this period of time is reduced to a point
in time),
and
  includes durations (machine times, labor utilization, resource performance accounts) or
|    | evaluated quantities (e.g. yield, scrap)  |     |     |
| --- | ----------------------------------------- | --- | --- |
HYDRA-BDE log records describe postings based on operations, staff and batches. Which log record is
generated  at  which  point  in  time  depends  on  different  factors,  such  as  triggering  posting  events,
configured  posting  rules  or  the  HYDRA  modules  in  use.  The  different  types  of  log  records  are
differentiated by their record type. The following record types based on orders are distinguished:
| 1.2  | Record type A  |     |     |
| ---- | -------------- | --- | --- |
General
A log record of the record type A is generated when an operation is logged on. It has been designed to be
able to upload operation logons to the higher-level ERP/PPS system.
Triggering events and dialogs
Events: Logon of operation (A_AN)

| MES-OrderBooking.docx  |     | Version: 1.2.18468  | Page 1 of 7  |
| ---------------------- | --- | ------------------- | ------------ |

|     |     |     |     | BDE Log Records  |
| --- | --- | --- | --- | ---------------- |

| Dialogs: Log operation on (A_AN),   |                                                    |     |     |     |
| ----------------------------------- | -------------------------------------------------- | --- | --- | --- |
|                                     | Log operation and person on (together) (A_P_AN),   |     |     |     |
|                                     | Log operation on with output batch (A_AN_MPL),     |     |     |     |
|                                     | Beginning of shift (A_AAN)                         |     |     |     |
|                                     | etc.                                               |     |     |     |
Special remarks
Using optional configurations, different other dialogs can also cause an operation to be logged on (e.g.
change order if the machine status changes).
The log record is not displayed in the maintenance of postings function. Consequently, it cannot be edited
(changed, deleted).
| 1.3  | Record type T  |     |     |     |
| ---- | -------------- | --- | --- | --- |
General
A log record of the record type T is generated when "partial uploads/confirmations" are recorded. In
contrast to all other record types that refer to a period of time, this log record always refers to exactly one
point in time (beginning of posting and end of posting are identical in the log record). Thus, this log record
does not include durations, i.e. fields relating to durations do not include a value (0). The log record
contains the quantities recorded with the upload.
Triggering events and dialogs
Events: all events that include a manual quantity (A_TR, A_UN, A_AB, etc.)
| Dialogs:  | all dialogs that include a manual quantity .  |     |     |     |
| --------- | --------------------------------------------- | --- | --- | --- |
Special remarks
In general, a partial upload may be performed for an operation that is logged on. However, the "posting
onto OPs that are not logged on" configuration (workplace/machine configuration) allows for an inactive
operation to be uploaded by way of a "quantity upload”.
All quantities posted onto an operation are included in the single partial uploads (record type T) and as
total in the log records "interruption of operation" (record type U) and "logoff of operation" (record type E).
Thus, a T record is generated for each quantity that is collected and posted on an operation.

| MES-OrderBooking.docx  |     | Version: 1.2.18468  |     | Page 2 of 7  |
| ---------------------- | --- | ------------------- | --- | ------------ |

BDE Log Records
Manual quantities may be recorded in any dialogs, e.g. in a partial upload, when personnel is logged off,
when an operation is interrupted or logged off, when batches are posted, etc. The log record of the record
type T with manual quantities is directly generated, when the dialog is recorded/posted (not only when the
operation is logged off/interrupted, for example).
In addition, the automatic collection of counters allows for quantities to be posted onto active operations.
T records are generated for these quantities as well. HYDRA accumulates the quantities from the
automatic collection over a period of time and generates the corresponding T record(s), but only if the
scenario changes. This may be, for example, an order or person that is logged on manually, a manual,
partial upload/confirmation or a manual or automatic machine status change.
The single partial uploads/confirmations also represent the collection of quantities with different reasons
(e.g. scrap reasons).
Example:
Scrap (quantity 1) with the reasons 1, 2 and 3 each was recorded for an operation. The U or E record
shows a total scrap quantity of 3. In addition, HYDRA records three T records each with a scrap quantity
of 1 and the corresponding reason.
1.4 Record type U
General
A log record of the record type U is generated, when an operation is interrupted. Either the user can
interrupt the OP manually or it can also be made automatically, for example, by the "shift automatic" of
HYDRA-MDE at the end of the shift.
The log record of an operation includes the period of time between logon and interruption of the
operation. The durations included in the log record refer to exactly this period of time and are
synchronized with the shift model of the workplace to which the operation was logged on: the times are
distributed onto the individual resource performance accounts according to the workplace/machine
statuses that occurred during this period of time. The breaks that are included according to the shift
model are posted onto the resource performance account 12.
The quantities and times posted in the log record are also posted onto the operation status.
Triggering events and dialogs
Events: Interruption of operation (A_UN),
Quantity upload to an inactive operation (A_MR)
MES-OrderBooking.docx Version: 1.2.18468 Page 3 of 7

|     |     |     |     |     | BDE Log Records  |
| --- | --- | --- | --- | --- | ---------------- |

| Dialogs:  | Interruption of operation (A_UN),                |     |     |     |     |
| --------- | ------------------------------------------------ | --- | --- | --- | --- |
|           | Quantity upload to an inactive operation (A_MR)  |     |     |     |     |
|           | End of shift (A_AUN)                             |     |     |     |     |
|           | etc.                                             |     |     |     |     |
Special remarks
In general, an operation may only be interrupted if it was logged on before. However, the "posting onto
OPs that are not logged on" configuration (workplace/machine configuration) allows for an inactive
operation to be uploaded using a "quantity upload”. In this case, the log record refers to a point in time
and, as a result, does not include any durations.
An operation may also be triggered to be interrupted even by different other dialogs through optional
configurations (e.g. order change when the machine status is changed or automatic interruption of the
operation when the target quantity is reached).
| 1.5  | Record type E  |     |     |     |     |
| ---- | -------------- | --- | --- | --- | --- |
General
A log record of the record type E is generated, when an operation is logged off. As regards content, this
data record corresponds to a log record of the record type U.
Triggering events and dialogs
Events: Operation is logged off (A_AB),
|           | An inactive operation is terminated (A_BE)  |     |     |     |     |
| --------- | ------------------------------------------- | --- | --- | --- | --- |
| Dialogs:  | Operation is logged off (A_AB),             |     |     |     |     |
|           | An inactive operation is terminated (A_BE)  |     |     |     |     |
|           | etc.                                        |     |     |     |     |
Special remarks
If an inactive operation is finished the log record refers to a point in time and, as a result, does not include
any durations.
An operation may also be triggered to be logged off even by different other dialogs through optional
configurations (e.g. the operation is logged off automatically, when the target quantity is reached or
predecessor operations are logged off automatically).

| MES-OrderBooking.docx  |     | Version: 1.2.18468  |     |     | Page 4 of 7  |
| ---------------------- | --- | ------------------- | --- | --- | ------------ |

BDE Log Records
1.6 Record type H
General
A log record of the record type H is generated, when an (output) batch is changed/logged off (ADE-CHV,
MPL). Either the user can change the batch manually or it can also be made automatically, for example,
by a machine signal or by interrupting the operation or by the "shift automatic" of HYDRA-MDE at the end
of the shift.
The log record includes the period of time between logon and logoff of the batch to/from the machine and
operation. The durations included in the log record refer to exactly this period of time and are
synchronized with the shift model of the workplace to which the batch and operation were logged on: the
times are distributed onto the individual resource performance accounts according to the
workplace/machine statuses that occurred during this period of time. The breaks that are included
according to the shift model are posted onto the resource performance account 12.
The quantities posted in the log record are also posted onto the batch.
Triggering events and dialogs
Events: Logoff of (output) batch (CA_AB)
Dialogs: (Output) batch change (CA_WL)
Interruption or logoff of operation (A_UN, A_AB),
End of shift (A_AUN) etc.
Special remarks
A batch posting does neither include labor utilization nor personal resource performance accounts.
A batch may also be triggered to be posted even by different other dialogs through optional
configurations.
1.7 Record type B
General
A log record of the record type B is generated if a person is logged off from a workplace and an operation
that is active at this workstation. Either the user can log the person off manually or it can also be made
automatically, for example, by interrupting the operation or by the person clocking out (HYDRA-PZE: out)
or by the "shift automatic" of HYDRA-MDE at the end of the shift.
MES-OrderBooking.docx Version: 1.2.18468 Page 5 of 7

|     |     |     | BDE Log Records  |
| --- | --- | --- | ---------------- |

The log record includes the period of time between the person being logged on and logged off to and
from the workplace and operation. The durations included in the log record refer to exactly this period of
time and, subject to the respective configuration, they are compared with the shift model of the workplace
to which the person and operation were logged on or with the person's BDE shift model: the times are
distributed  onto  the  individual  resource  performance  accounts  according  to  the  workplace/machine
statuses that occurred during this period of time. The breaks that are included according to the shift
model are posted onto the resource performance account 12.
Triggering events and dialogs
| Events:   | Log person off (P_AB)        |     |     |
| --------- | ---------------------------- | --- | --- |
| Dialogs:  | Person is logged off (P_AB)  |     |     |
    Interruption or logoff of operation (A_UN, A_AB),
  End of shift (A_AUN)
|     | HYDRA-PZE out (P_GEH)  |     |     |
| --- | ---------------------- | --- | --- |
|     | etc.                   |     |     |
Special remarks
A person may also be triggered to be logged off even by different other dialogs through optional
configurations (e.g. staff is logged off when the machine status is changed).
| 1.8  | Special features  |     |     |
| ---- | ----------------- | --- | --- |
Evaluation date
The field “evaluation date” is defined for the work day evaluation of PZW (Personnel Time Management)
and the wage calculation of the LLE module. It has been designed to assign postings to a settlement day
for the LLE module and for the BDE/PZW comparison. Due to flexible working times, this settlement day
may differ from the ADE shift date, in particular for night shifts.
Further information can be found in the document entitled GLOSSARY_EvaluationDate.pdf.
Corresponding shift
The time stamp for logging off pertaining to a BDE log record determines the shift (shift date, shift
number) to which the log record belongs.

| MES-OrderBooking.docx  |     | Version: 1.2.18468  | Page 6 of 7  |
| ---------------------- | --- | ------------------- | ------------ |

BDE Log Records
Operation splits
When it comes to split operations, the log record is ONLY generated for the split operation. A log record is
not generated for the split master itself. The status of the split master is only updated.
Merged operations
Log records are generated for merged operations as well as for individual operations. The statuses of
individual operations are also updated accordingly. While posting, the recorded quantities and times of a
merged operation are distributed to the corresponding individual operations according to different
configurations. The log records of individual operations only include proportionate quantities and times.
MES-OrderBooking.docx Version: 1.2.18468 Page 7 of 7