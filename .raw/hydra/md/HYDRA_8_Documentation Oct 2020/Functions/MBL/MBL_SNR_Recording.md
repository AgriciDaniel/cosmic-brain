Collection of Serial Numbers
1 Collection of Serial Numbers
General
Serial numbers are assigned to be able to differentiate between individual items of material. Wikipedia
provides the following definition for serial numbers:
A serial number (also manufacturer's serial number or MSN) is a unique, alphanumeric code
assigned for identification of a single unit. Although usually called a number, it may include
letters, though ending with digits. Serial numbers are used to identify elements pertaining to
series production also providing information about production conditions and thus enabling
traceability of the used components, also for electronic products.
Serial numbers can be:
 generated/assigned at the end of the production process
 generated/assigned in earlier stages of the production process and monitored by the process
 integrated as used components in the production process and monitored by the process
Merging serial numbers represents the assembly of several components listed by serial number
into one component part listed by serial number.
MES supports manufacturing businesses in many ways with the collection of serial numbers and enables
complete traceability based on the data recorded in MES.
Definition of the supported variants
MES provides different variants to record serial numbers:
Variant Description of the variant Description Documentation
MBL_SNR_Recording.docx Version: 1.0.18468 Page 1 of 10

|     |     |     |     |     |     |     | Collection of Serial Numbers  |     |
| --- | --- | --- | --- | --- | --- | --- | ----------------------------- | --- |

Variant  Description of the variant  Description  Documentation
1  Entry of serial numbers for  Recording of serial numbers for operations  here
OPs that are not subject to  that are not managed in batches enables
management in batches  the collection in relation to serial numbers if
|     |     |     | incorporated  |     | materials  their  | batches   | and     |     |
| --- | --- | --- | ------------- | --- | ----------------- | --------- | ------- | --- |
|     |     |     | consumptions  |     | are  not          | required  | to  be  |     |
recorded.
|     |     |     | The  production  |     | order  specifies  |     | the  serial  |     |
| --- | --- | --- | ---------------- | --- | ----------------- | --- | ------------ | --- |
|     |     |     | numbers          | to  | be  processed     | as  | part  of  a  |     |
production order.
For each operation the user identifies the
|     |     |     | serial     | numbers  | and            | classifies  | them  |     |
| --- | --- | --- | ---------- | -------- | -------------- | ----------- | ----- | --- |
|     |     |     | according  | to       | the  produced  | quality.    | The   |     |
system makes sure that this process can
|     |     |     | only  | be  performed  | once  | for  each  | serial  |     |
| --- | --- | --- | ----- | -------------- | ----- | ---------- | ------- | --- |
number and operation.
2a  Entry of serial numbers for  The user enters the serial number and the  here
OPs  that  are  subject  to  system is informed about it. In this case, the
management  in  batches  -  serial  number  is  generated  in  another
|     | manual  input  | of  the  serial  | system.  |     |     |     |     |     |
| --- | -------------- | ---------------- | -------- | --- | --- | --- | --- | --- |
number
The recorded serial number is assigned a
HYDRA batch number.
2b  Entry of serial numbers for  In this case, the system generates the serial  here
OPs  that  are  subject  to  number  in  an  unambiguous  format
management  in  batches  -  applicable  to  the  whole  system.  Serial
automatic  assignment  of  numbers  are  generated  according  to  the
|     | serial numbers  |     | rules applying for the generation of batch  |     |     |     |     |     |
| --- | --------------- | --- | ------------------------------------------- | --- | --- | --- | --- | --- |
numbers.
In this case, the serial number matches the
HYDRA batch number.

| MBL_SNR_Recording.docx  |     |     | Version: 1.0.18468  |     |     |     |     | Page 2 of 10  |
| ----------------------- | --- | --- | ------------------- | --- | --- | --- | --- | ------------- |

|     |     |     |     |     | Collection of Serial Numbers  |     |
| --- | --- | --- | --- | --- | ----------------------------- | --- |

Variant  Description of the variant  Description  Documentation
2c  Entry of serial numbers for  In this case, the system generates the serial  Here
OPs  that  are  subject  to  number  in  an  unambiguous  format
management  in  batches  -  applicable  to  the  whole  system.  Serial
automatic  assignment  of  numbers  are  generated  according  to  the
|     | serial numbers  | rules applying for the generation of batch  |     |     |     |     |
| --- | --------------- | ------------------------------------------- | --- | --- | --- | --- |
numbers.
|     |     | The serial number  |     | is  assigned  | a HYDRA  |     |
| --- | --- | ------------------ | --- | ------------- | -------- | --- |
batch number.
2d  Entry of serial numbers for  In addition, to the conventional generation of  This document
OPs  that  are  subject  to  output  batches,  the  system  particularly
management  in  batches  -  supports the generation of merged batches
automatic transfer of serial  including  individually  assigned  serial
numbers  by  using  input  numbers.  There  is  a  direct  connection
|     | batches.  | between individual serial numbers and the  |            |           |                   |     |
| --- | --------- | ------------------------------------------ | ---------- | --------- | ----------------- | --- |
|     |           | generated                                  | output     | batch     | (merged  batch),  |     |
|     |           | which                                      | logically  | embraces  | the  serial       |     |
numbers.
Serial numbers are taken over as individual
|     |     | batches  | provided  | by  logging  | an  input  |     |
| --- | --- | -------- | --------- | ------------ | ---------- | --- |
batch/merged batch on. The serial number
is the batch number.
|     |     | In  addition,  | individual  | serial  | numbers  are  |     |
| --- | --- | -------------- | ----------- | ------- | ------------- | --- |
assigned to a superordinate merged batch.

HYDRA batch number vs. serial number
In HYDRA the HYDRA batch number is unambiguous throughout the entire system. The serial number is
kept  throughout  the  complete  process,  provided  that  serial  numbers  have  not  been  merged.
Consequently, it is differentiated between the internal and external HYDRA batch number to represent the
collection of serial numbers:
HYDRA batch number
The HYDRA batch number is the ID by which the serial number is managed in HYDRA throughout
the complete collection process.
The HYDRA batch number is used on labels to identify the material.

| MBL_SNR_Recording.docx  |     | Version: 1.0.18468  |     |     |     | Page 3 of 10  |
| ----------------------- | --- | ------------------- | --- | --- | --- | ------------- |

Collection of Serial Numbers
To ensure unambiguity within the system, an internal HYDRA batch number is assigned and
managed for every HYDRA batch number when recording serial numbers.
Internal HYDRA batch number
The internal HYDRA batch number represents a system-wide, unambiguous ID identifying batches
and serial numbers as an alternative to the HYDRA batch number.
In contrast to the HYDRA batch number; this ID has to be changed from production step to
production step to keep unambiguity.
This example explains the procedure:
A production order has the following structure:
The interface provided a merged batch with the serial number "BXC6GF7H". Upon posting this serial
number, the HYDRA batch number and the internal HYDRA batch number change as follows:
MBL_SNR_Recording.docx Version: 1.0.18468 Page 4 of 10

    Collection of Serial Numbers

Process step  Batch status  HYDRA  batch  Internal  HYDRA  Comment
|     |     |     | number  | batch number  |     |     |
| --- | --- | --- | ------- | ------------- | --- | --- |
Status after transferring the  FREE  BXC6GF7H  BXC6GF7H  Initial status when
| number                        | to  MES  via  the  |     |     |     | the HYDRA batch   |           |
| ----------------------------- | ------------------ | --- | --- | --- | ----------------- | --------- |
| material interface and prior  |                    |     |     |     | number            | and  the  |
| to logging the input batch    |                    |     |     |     | internal          | HYDRA     |
| on.                           |                    |     |     |     | batch number are  |           |
identical.
Status  after  logging  the  RUNNING  BXC6GF7H  BXC6GF7H  No changes
| merged  | batch  on  to  OP  |     |     |     |     |     |
| ------- | ------------------ | --- | --- | --- | --- | --- |
0010
Status  after  entering  the  Processed  BXC6GF7H  BXC6GF7H  The "old" batch is
| serial number at OP 0010  |     |     |     |     | assigned  | the  |
| ------------------------- | --- | --- | --- | --- | --------- | ---- |
"processed"
status.
|     |     | FREE  | BXC6GF7H  | PR1111X112  | The  "new"       | batch     |
| --- | --- | ----- | --------- | ----------- | ---------------- | --------- |
|     |     |       |           |             | is  assigned     | the       |
|     |     |       |           |             | "free"  status,  | the       |
|     |     |       |           |             | same             | HYDRA     |
|     |     |       |           |             | batch            | number    |
|     |     |       |           |             | (serial          | number)   |
|     |     |       |           |             | and              | a  new    |
|     |     |       |           |             | HYDRA            | internal  |
batch number
Status  after  entering  the  Processed  BXC6GF7H  BXC6GF7H  The "old" batch is
| serial  number  | for  the  OP  |     |     |     | assigned     | the  |
| --------------- | ------------- | --- | --- | --- | ------------ | ---- |
| 0020            |               |     |     |     | "processed"  |      |
status.
|     |     | Processed  | BXC6GF7H  | PR1111X112  | The "old" batch is  |      |
| --- | --- | ---------- | --------- | ----------- | ------------------- | ---- |
|     |     |            |           |             | assigned            | the  |
"processed"
status.

| MBL_SNR_Recording.docx  |     |     | Version: 1.0.18468  |     | Page 5 of 10  |     |
| ----------------------- | --- | --- | ------------------- | --- | ------------- | --- |

    Collection of Serial Numbers

Process step  Batch status  HYDRA  batch  Internal  HYDRA  Comment
|     |     |       | number    | batch number  |                  |           |
| --- | --- | ----- | --------- | ------------- | ---------------- | --------- |
|     |     | Free  | BXC6GF7H  | PR1111X113    | The  "new"       | batch     |
|     |     |       |           |               | is  assigned     | the       |
|     |     |       |           |               | "free"  status,  | the       |
|     |     |       |           |               | same             | HYDRA     |
|     |     |       |           |               | batch            | number    |
|     |     |       |           |               | (serial          | number)   |
|     |     |       |           |               | and              | a  new    |
|     |     |       |           |               | HYDRA            | internal  |
batch number
Status  after  entering  the  Processed  BXC6GF7H  BXC6GF7H  The "old" batch is
| serial  number  | for  the  OP  |     |     |     | assigned     | the  |
| --------------- | ------------- | --- | --- | --- | ------------ | ---- |
| 0030            |               |     |     |     | "processed"  |      |
status.
|     |     | Processed  | BXC6GF7H  | PR1111X112  | The "old" batch is  |      |
| --- | --- | ---------- | --------- | ----------- | ------------------- | ---- |
|     |     |            |           |             | assigned            | the  |
"processed"
status.
|     |     | Processed  | BXC6GF7H  | PR1111X113  | The "old" batch is  |      |
| --- | --- | ---------- | --------- | ----------- | ------------------- | ---- |
|     |     |            |           |             | assigned            | the  |
"processed"
status.
|     |     | Free  | BXC6GF7H  | PR1111X114  | The  "new"       | batch     |
| --- | --- | ----- | --------- | ----------- | ---------------- | --------- |
|     |     |       |           |             | is  assigned     | the       |
|     |     |       |           |             | "free"  status,  | the       |
|     |     |       |           |             | same             | HYDRA     |
|     |     |       |           |             | batch            | number    |
|     |     |       |           |             | (serial          | number)   |
|     |     |       |           |             | and              | a  new    |
|     |     |       |           |             | HYDRA            | internal  |
batch number

As regards a HYDRA batch number (serial number), there might exist 1-n HYDRA batches at different
times, whereas only one of the batches may be "free" or "running" at a time.

| MBL_SNR_Recording.docx  |     |     | Version: 1.0.18468  |     | Page 6 of 10  |     |
| ----------------------- | --- | --- | ------------------- | --- | ------------- | --- |

|     |     |     |     |     |     |     |     | Collection of Serial Numbers  |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ----------------------------- | --- | --- |

Please note for the supply via interface
Merged batches and serial numbers can be transferred from other systems (e.g. ERP systems) to MES
via the material staging interface. Some particularities have to be taken into account when transferring the
merged batch/combination of serial numbers:
  This order has to be observed when transferring serial numbers and their merged batches from
Navision to HYDRA:
|     |     | 1.  Transfer of serial numbers           |     |     |     |     |     |     |     |     |
| --- | --- | ---------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- |
|     |     | 2.  Transfer of the merged batch record  |     |     |     |     |     |     |     |     |
  The below table shows how specific fields are assigned differently when being transferred to
HYDRA.
| Logical field  |     |     | Interface field  |     |     | Merged batch  |     |     | Serial number  |     |
| -------------- | --- | --- | ---------------- | --- | --- | ------------- | --- | --- | -------------- | --- |
HYDRA internal batch  HY_LOSNR  Merged batch number  Serial number
|     |                      | number     |     |            |     | specified by ERP     |               |     |                      | specified by ERP  |
| --- | -------------------- | ---------- | --- | ---------- | --- | -------------------- | ------------- | --- | -------------------- | ----------------- |
|     | HYDRA batch number   |            |     | DLL        |     | Merged batch number  |               |     |                      | Serial number     |
|     |                      |            |     |            |     | specified by ERP     |               |     |                      | specified by ERP  |
|     |                      | PPS batch  |     | PPS batch  |     |                      | Batch number  |     |                      | Batch number      |
|     |                      |            |     |            |     | specified by ERP     |               |     |                      | specified by ERP  |
|     | Merged batch number  |            |     | MCNR       |     |                      | BLANK         |     | Merged batch number  |                   |
specified by ERP
|     | Merged batch ID  |     |     | SLOS  |     | Fixed "J" (upper case  |     |     |     | BLANK  |
| --- | ---------------- | --- | --- | ----- | --- | ---------------------- | --- | --- | --- | ------ |
"j")
|     | Merged batch type  |     |     | SLOSTYP  |     | Fixed "J" (upper case  |     |     |     | BLANK  |
| --- | ------------------ | --- | --- | -------- | --- | ---------------------- | --- | --- | --- | ------ |
"j")

| MBL_SNR_Recording.docx  |     |     |     | Version: 1.0.18468  |     |     |     |     |     | Page 7 of 10  |
| ----------------------- | --- | --- | --- | ------------------- | --- | --- | --- | --- | --- | ------------- |

|     |     |     |     |     |     |     | Collection of Serial Numbers  |     |     |
| --- | --- | --- | --- | --- | --- | --- | ----------------------------- | --- | --- |

| Logical field  |                       |     | Interface field  |     | Merged batch        |                 |     | Serial number  |      |
| -------------- | --------------------- | --- | ---------------- | --- | ------------------- | --------------- | --- | -------------- | ---- |
|                | HU level              |     | HULEVEL          |     |                     | 1               |     |                | 0    |
|                | Inventory type        |     | BESTART          |     |                     | Fixed "H“       |     |                | "S“  |
|                | Number of individual  |     | SLOS             |     | Number of included  |                 |     |                | 0    |
|                | batches               |     |                  |     |                     | serial numbers  |     |                |      |

Posting of serial numbers
If a merged batch with assigned serial numbers is finished, the system updates data and generates new
documents in the form of log records and goods movements.
Transfer of data from the operation
This data is taken over from the running operation and transferred to the merged batch and the
assigned serial numbers:
|     | o  Material and material name  |     |     |     |     |     |     |     |     |
| --- | ------------------------------ | --- | --- | --- | --- | --- | --- | --- | --- |
|     | o  Material type               |     |     |     |     |     |     |     |     |
Transfer of entered data to serial numbers and the merged batch
The machine, producing operation, person performing the posting, material buffer and the transport
unit are transferred to the merged batch and the serial numbers included in the merged batch.
Any comment that might be entered is transferred to the merged batch as additional information on
the batch.
The status of the merged batch and serial numbers is set subject to the specified quality/class of
the output batch:
|     | Selected class  |         | Assigned batch status  |         |     | Reason accepted  |      |     |     |
| --- | --------------- | ------- | ---------------------- | ------- | --- | ---------------- | ---- | --- | --- |
|     |                 | Yield   |                        | Free    |     |                  | No   |     |     |
|     |                 | Scrap   |                        | Locked  |     |                  | Yes  |     |     |
|     |                 | Rework  |                        | Free    |     |                  | Yes  |     |     |

| MBL_SNR_Recording.docx  |     |     | Version: 1.0.18468  |     |     |     |     |     | Page 8 of 10  |
| ----------------------- | --- | --- | ------------------- | --- | --- | --- | --- | --- | ------------- |

Collection of Serial Numbers
Selected class Assigned batch status Reason accepted
Open quantity Free Yes
Batch attributes collected in relation to the merged batch are transferred to the merged batch as
batch attributes.
Batch attributes collected in relation to the serial number are transferred to serial numbers as batch
attributes.
Document links collected in relation to the merged batch are transferred to the merged batch as
document links.
Document links collected in relation to the serial number are transferred to serial numbers as
document links.
Quantities of the merged batch
The generated merged batch includes the total quantities of the serial numbers assigned to the
merged batch.
The number of assigned serial numbers is defined for the merged batch as number of individual
batches.
Activities for serial numbers
New batches with a new, internal HYDRA batch number are generated for the serial numbers
included in the merged batch (for further details on this procedure, please see section HYDRA
batch number vs. serial number) and the preceding batches are assigned the "processed" status.
Generation of ADE log records
An H record is generated for the merged batch. This one includes the quantity(ies) of the merged
batch, which in turn result(s) from the quantities of the assigned serial numbers. The batch number
of the merged batch is stored at the H record.
Separate log records are not generated for serial numbers.
Generation of goods movements
The generation of goods movements can be controlled individually for consumptions as well as for
the output material on the level of serial numbers and merged batches.
Consequently, it is possible to adjust the upload of these goods movements to the conditions of the
relevant ERP system.
Details on how to configure goods movements can be found in the configuration guidelines for
serial number recording.
Tracing
Tracing information is updated for the merged batch and serial numbers in the system:
MBL_SNR_Recording.docx Version: 1.0.18468 Page 9 of 10

Collection of Serial Numbers
o The generated merged batch is connected with all integrated input batches logged on at the
time of logging the merged batch on (by logging the OP on or by completing a merged batch
beforehand) or that have been logged on since then.
o The serial numbers included in the merged batch are also connected with all integrated input
batches logged on at the time of logging the merged batch on (by logging the OP on or by
completing a merged batch beforehand) or that have been logged on since then.
Establishing the connection between serial numbers and input batches can be disabled if required.
MBL_SNR_Recording.docx Version: 1.0.18468 Page 10 of 10