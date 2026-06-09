|     |     |     | HYDRA MDE Log Records  |     |
| --- | --- | --- | ---------------------- | --- |

1  HYDRA MDE Log Records
General
HYDRA-MDE log records describe postings based on machines/workplaces. A HYDRA-MDE log record
is an evaluated data record that is generated due to posting events. An MDE log record documents
among other things:
|    | Period of time (beginning, end) for which the log record applies,  |     |     |     |
| --- | ------------------------------------------------------------------ | --- | --- | --- |
|    | Duration since the last status change,                             |     |     |     |
|    | Created status,                                                    |     |     |     |
|    | Resource performance account which the status is assigned to,      |     |     |     |
  Target cycle that was set when the status changed (end of log record),
  Partitioning that was set when the status changed (end of log record),
  The number of cycles that have been recorded within the period of the log record,
  Computed quantities for meter readings that have been recorded within the period of the log
record.
HYDRA-MDE log records do not have a direct relation to HYDRA-BDE log records. Thus, the period of an
MDE log record does not depend on HYDRA-BDE log records. In exceptional cases, there might even be
MDE log records without that an operation was logged on during that period of time (and as a result,
without generating HYDRA-BDE log records for it). Which MDE log record is generated at what point in
time  depends,  in  particular,  on  the  triggering  posting  event.  The  different  log  record  types  are
distinguished by their record type. The machine-related record types that are described in the sections
that follow are to be distinguished.
Record type P
General
A log record of the record type P is generated when the workplace/machine status is changed. It has
been configured to be able to evaluate the period of time when a status occurred.

| MES-MachineBooking.docx  |     | Version: 1.0.1362  |     | Page 1 of 2  |
| ------------------------ | --- | ------------------ | --- | ------------ |

|     |     |     |     | HYDRA MDE Log Records  |     |
| --- | --- | --- | --- | ---------------------- | --- |

Triggering events and dialogs
| Events:   | Machine status change (M_MST)    |     |     |     |     |
| --------- | -------------------------------- | --- | --- | --- | --- |
| Dialog:   | Machine status change (M_MST),   |     |     |     |     |
Special remarks
The quantities included in an MDE log record are the quantities posted in this period of time. These
quantities result from manual quantity postings (partial uploads A_TR) or from automatically recorded
meter readings which might have been converted using conversion factors (partitioning, pulse factor).
The values in the "counter" fields do not include deltas, but quantities and cycles that have been added
up since the beginning of the shift. The delta quantities (as of HYDRA-MDE 7.2) are provided in separate
fields for evaluation purposes.
Record type N
General
A log record of the record type N is generated when the shift ends (automatic shift change, requires a
HYDRA-MDE machine). It has been configured to evaluate the period of time prior to the shift end when
the status already existed.
Triggering events and dialogs
| Events:   | Machine status change (M_MST)  |     |     |     |     |
| --------- | ------------------------------ | --- | --- | --- | --- |
| Dialog:   | End of shift (A_AAB)           |     |     |     |     |
Special remarks
The notes given for record type "P" also apply in this context.

| MES-MachineBooking.docx  |     | Version: 1.0.1362  |     |     | Page 2 of 2  |
| ------------------------ | --- | ------------------ | --- | --- | ------------ |