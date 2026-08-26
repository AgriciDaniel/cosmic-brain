|     |     |     | Data Structure of Batches  |     |
| --- | --- | --- | -------------------------- | --- |

1  Data Structure of Batches
Summary
In the system every batch is identified by a unique batch ID (ID / batch number). The batch is managed
as object based on the specific batch number in the system. In addition to the batch number, the "batch"
object has many different pieces of information, data and indicators representing its specific status. The
object definition describes the connection between the batch's individual data structures.
The exact data structure of a batch and individual data fields are described in this document.
General
Batch
A batch number is a unique batch ID for the entire system.
The batch number depends on whether it is created manually by the operator or automatically by
the system. In case of its automatic generation – and to the extent that the configuration is set
correspondingly – this system-wide uniqueness is ensured.
Material
When the output batch is created at the shop floor terminal, the number of the material is taken
from the order currently logged on.
Designation
When the output batch is created at the shop floor terminal, the material designation from the order
currently logged in will be adopted. Since no material master is managed in the system, the material
designation within a batch description will be saved in redundant fashion.
Material type
The individual materials are assigned to material types. These material types are then subject to the
same transport and handling directives.
Material category
The material type is used to further classify the materials and/or batches in HYDRA. By the
generation of a batch, the category stored under material type will be adopted for the batch. The
following material categories are available, for example.
| E   | Finished product  |     |     |     |
| --- | ----------------- | --- | --- | --- |
| H   | Material type     |     |     |     |
| L   | Batch             |     |     |     |
| P   | Pallet (package)  |     |     |     |
| R   | Reel              |     |     |     |
| T   | Carrier material  |     |     |     |
| V   | Packing           |     |     |     |

| OBJECT_MES-Batch_structure.docx  |     | Version:   |     | Page 1 of 10  |
| -------------------------------- | --- | ---------- | --- | ------------- |

|     |     |     | Data Structure of Batches  |     |
| --- | --- | --- | -------------------------- | --- |

Status
The entries in the following fields are defined indicators specifying the status of a batch by their individual
combination and selection.
(Batch) status
The  batch  status  describes  system  and  production-related  statuses  that  have  the  following
meaning. A batch status is modified at the shop floor terminal by logging in and off input batches
and by logging off output batches (output batch change). In addition, MOC provides a change
function ('Change status' function).
| F   | Free (light green)    |     |     |     |
| --- | --------------------- | --- | --- | --- |
The batch is in the material buffer and can be used for further processing.
| S   | Locked (red)    |     |     |     |
| --- | --------------- | --- | --- | --- |
The batch is locked. A batch lock is set either manually in MOC ('Change status' function) or at the
shop floor terminal (e.g. in case of quality deficits).
| M   | Min. storage time (fuchsia)  |     |     |     |
| --- | ---------------------------- | --- | --- | --- |
The min. storage time of the batch has not been reached yet. The system will automatically set this
status to "free" once the min. storage time has been reached.
| P   | Inspection (yellow)    |     |     |     |
| --- | ---------------------- | --- | --- | --- |
The batch will also be locked for the period of the material inspection in the laboratory. This
temporary lock is indicated by the status "inspection". This status is set manually in MOC ('Change
status' function).
| V   | Expired (red)    |     |     |     |
| --- | ---------------- | --- | --- | --- |
The shelf life of the material is exceeded and the batch has therefore expired. The system will
automatically set this status once the expiry date has been reached.
| T   | Transport (blue)    |     |     |     |
| --- | ------------------- | --- | --- | --- |
If a batch is being transported from one plant (site) to another, the status "Transport" will be set as
soon as the original site is left and be re-set to "Free" at the goods receipt of the destination site as
soon as the batch has arrived at the destination buffer.
| L   | Running (dark green)   |     |     |     |
| --- | ---------------------- | --- | --- | --- |
The batch is currently being processed at a machine as input batch.
| A   | Processed (gray)    |     |     |     |
| --- | ------------------- | --- | --- | --- |
The batch has been processed at a machine and has physically no longer a quantity. The batch is
kept in the system for evaluation purposes.
| E   | Finished   |     |     |     |
| --- | ---------- | --- | --- | --- |
The batch has been finished.

| OBJECT_MES-Batch_structure.docx  |     | Version:   |     | Page 2 of 10  |
| -------------------------------- | --- | ---------- | --- | ------------- |

|     |     |     | Data Structure of Batches  |     |
| --- | --- | --- | -------------------------- | --- |

| G   | Delivered    |     |     |     |
| --- | ------------ | --- | --- | --- |
The batch is identified as "delivered".
| R   | Returned    |     |     |     |
| --- | ----------- | --- | --- | --- |
The batch is identified as "returned".
| I   | Announced    |     |     |     |
| --- | ------------ | --- | --- | --- |
The batch has been announced. Batches having this status are not available (on stock) but
expected to arrive from other systems or production.
| D   | Deleted (white)    |     |     |     |
| --- | ------------------ | --- | --- | --- |
The  batch  has  been  deleted.  The  batch  has  been  planned  for  deletion  using  the  archiving
mechanisms.
Class
Batch  class  provides  information  about  the  quality  of  the  material  contained  in  the  batch.
Classification of the material is an important batch indicator, since scrap is also managed by way of
material batches. This indicator is specifically defined when an output batch is formed and assigned
by the system. Batch class may be set accordingly at terminals using the entry dialog boxes.
Batch class  Meaning
G  Yield
A  Scrap
N  Rework
O  Open quantity

The  batch  classes  "rework"  and  "open  quantity"  are  only  available  if  the  modification
|     | qualityclassextension is enabled.   |     |     |     |
| --- | ----------------------------------- | --- | --- | --- |
Quality status
The following quality statuses are possible:
| F   | Free                   |     |     |     |
| --- | ---------------------- | --- | --- | --- |
| S   | Blocked                |     |     |     |
| O   | Not checked            |     |     |     |
| P   | Sample processing      |     |     |     |
| E   | Defective              |     |     |     |
| G   | Checked without error  |     |     |     |
Material status
The material status identifies a logical status such as packed, checked
Transport status
The following list describes the possible transport statuses:

| OBJECT_MES-Batch_structure.docx  |     | Version:   |     | Page 3 of 10  |
| -------------------------------- | --- | ---------- | --- | ------------- |

Data Structure of Batches
F "Normal" batch in the system.
B The batch is to be posted to an external stock but the transfer has not been
made yet.
Such batches can only be explicitly reposted within the system (using the
'Repost batch' function). This will revoke the clearance/booking outs to an
external stock. Implicit reposting (by logging in to a machine) is not allowed.
This transport status can only appear in "stock posting buffers".
L The batch has been cleared/booked out and transferred to an external stock.
Batches with this transport status will be managed in the external stock
system.
It is not possible to repost such batches within the system. Therefore, a login
to a machine is neither allowed.
Reposting per interface (triggered by the stock system) is possible.
O The batch has been cleared/booked out to an external stock but the transfer
has not been made yet.
Such batches can only be explicitly reposted within the system (using the
'Repost batch' function). This will revoke the clearance/booking out to an
external site. Implicit reposting (by logging in to a machine) is not allowed.
I The batch has been received by an external site but has not been posted yet.
T The batch has been transferred to an external site and is there.
It is not possible to repost such batches within the system. A login to a
machine is therefore not allowed.
Batches having this transport status can be booked in by an external site
using the interface. This will change the transport status to I.
The user cannot change this indicator, which will be set by the system.
Manual Q status
The following manual quality statuses are possible:
F Free
S Blocked
I Not set
Reason/ type
If the batch is a scrap batch, a scrap reason will be assigned to the batch.
OBJECT_MES-Batch_structure.docx Version: Page 4 of 10

Data Structure of Batches
Workplace
Workplace / machine at which the batch was generated or used at last.
Merged batch
In MES it is possible to create so called superordinate/parent batches or merged batches. For each
parent batch there are assigned child/subordinate batches in the system. In the system,
subordinate batches are assigned to the superordinate batch via the merged batch number in the
merged batch field. The user cannot change this indicator, which will be set by the system and/or
reset after the posting.
Person
The personnel number of the person editing the batch
Company
Company indicator (master data)
Status change
The date and time when the batch status was changed at last are saved.
Quantity/ stock
Quantity
Quantity postings regarding output batches can either be made manually or automatically at the
shop floor terminals. In case of an automatic entry of quantities, the automatically entered batch
quantity will be assigned to the output batch when the output batch is being changed.
Remaining quantity
If a batch is consumed as input batch the remaining quantity will be shown here.
Unit
Unit, in which the (main) quantity of the batch is maintained.
Remaining quantity indicator
This indicator will automatically be set when the operator logs off an input batch with a remaining
quantity.
The quantity unit of a produced batch is the same as the primary quantity unit of the producing
operation.
Material buffer
Each batch can uniquely be assigned to a material buffer.
Transport unit
Transport unit refers to the batch. Several batches can be assigned to a transport unit.
Activity 1 – Activity 6
Additional quantity fields of a batch
OBJECT_MES-Batch_structure.docx Version: Page 5 of 10

Data Structure of Batches
Remainder 1 – Remainder 6
Remaining quantity of the batch in further quantity units
Unit 1 – Unit 6
Unit of the others
Properties
Manufacturing date/ time
Date and time of the origin of the batch in the system
Availability date/ time
The availability date and availability time result from the time of production and a time-related offset
related to the minimum storage time.
Expiry date/ time
The expiry date and expiry time result from the time of production and a time-related offset related
to the batch's shelf life.
Warning time
The warning date and warning time result from the time of production and a time-related offset
related to the warning limit.
Material properties
Width
Width of the batch (of the reel) in mm.
Mass per unit area
Specific mass per unit area in g/m2.
Area per piece
Area per piece in mm/piece.
Merged batch properties
Number of individual batches
If the batch is a merged batch, the number of individual batches belonging to the merged batch will
be shown here. This information is maintained even after the posting process has been completed.
The user cannot change this field, which will be set by the system.
Flag for same type
If a merged batch is of the same type, the quantity of the merged batch will be updated when a
batch is assigned.
Vice versa (flag is not set), the quantity of the merged batch is not changed. The merged batch just
represents a logical "bracket".
OBJECT_MES-Batch_structure.docx Version: Page 6 of 10

Data Structure of Batches
Flag for merged batch
The "merged batch" flag is set if the batch is a merged batch. A merged batch comprises several
individual batches and combines them into one specific merged batch number. The number of
individual batches pertaining to the merged batch is shown.
If the batch data overview is selected by the merged batch number, all individual batches assigned
to this merged batch will be displayed.
Info
PPS storage location
If the PPS system has transferred a storage location in the course of material staging, this will be
shown here.
PPS storage bin
If the PPS system has transferred a storage bin in the course of material staging, this will be shown
here.
PPS batch
If a PPS batch has been transferred in the course of material staging, this will be shown here.
When used, the PPS batch number must not have more than 10 characters.
Tech. info
No processing, the field is used as comment.
Alternative batch number 1 – 5
These fields are used as reserve for the realization of customer-specific requests.
Batch number
This field is used as reserve for the realization of customer-specific requests.
Serial number
Serial number assigned to that batch.
Stock type
Identifies the specific stock type of a batch (e.g. S = serial number, H = handling unit).
Position (reel cutting)
This field will be populated in case of cut reels (output batches). It documents the serial number of
the reel relating to the mother operation.
Mother OP 1 10 8 6 4 2
Mother OP 1 9 7 5 3 1
OBJECT_MES-Batch_structure.docx Version: Page 7 of 10

|     |     |     |     |     | Data Structure of Batches  |     |
| --- | --- | --- | --- | --- | -------------------------- | --- |

This numbering does not depend on whether several output materials (reels of different widths) are
produced during cutting.
| Mother OP 1  |     | 15  | 12  | 9   | 6   | 3   |
| ------------ | --- | --- | --- | --- | --- | --- |
| Mother OP 1  |     | 14  | 11  | 8   | 5   | 2   |
| Child OP 2   |     | 13  | 10  | 7   | 4   | 1   |

Number of reels (reel cutting)
This field is completed for cut reels (output batches) and includes the number of reels that were
produced per section (output batch change) for the mother and/or child OPs.
Mother OP 1  Number  of  Number  of  Number  of  Number  of  Number  of
|     |     | reels: 2  | reels: 2  | reels: 2  | reels: 2  | reels: 2   |
| --- | --- | --------- | --------- | --------- | --------- | ---------- |
Mother OP 1  Number  of  Number  of  Number  of  Number  of  Number  of
|     |     | reels: 2  | reels: 2  | reels: 2  | reels: 2  | reels: 2  |
| --- | --- | --------- | --------- | --------- | --------- | --------- |
Child OP 2  Number  of  Number  of  Number  of  Number  of  Number  of
|     |     | reels: 1  | reels: 1  | reels: 1  | reels: 1  | reels: 1  |
| --- | --- | --------- | --------- | --------- | --------- | --------- |
In the example above, a quantity 2 is stored for all reels that were produced for the mother OP 1 (2
reels per section); for the child OP 2 the number 1 is stored (only 1 reel per section).
Cut number (reel cutting)
This field will be completed for (input) batches that were logged in as carrier material (identified as
the "T" type in the component list). For each section the cut number (technically: output batch
change) will be increased by 1 and will thus show the number of sections related to this carrier
batch.
Number of output batches (reel cutting)
This field will be completed for (input) batches that were logged in as carrier material (identified as
the "T" type in the component list). For each section (technically: output batch change) the field will
be increased by the number of cut reels (output batches) and will thus show the total number of
reels that were produced from this carrier batch.
Roll index
<no entry>
Reservation
Reservation
Not reserved
The batch is not reserved and can therefore be logged in with every order/ operation.

| OBJECT_MES-Batch_structure.docx  |     |     |     | Version:   |     | Page 8 of 10  |
| -------------------------------- | --- | --- | --- | ---------- | --- | ------------- |

Data Structure of Batches
Reserved for OP
The batch is reserved for the OP that is entered into the entry field. Any attempt to log this field in to
a machine, at which this operation is not logged in, will be rejected.
Reserved for order
The batch is reserved for the order that is entered into the entry field. Any attempt to log this batch
in to a machine, at which no OP of this order is logged in, will be rejected.
Reserved by planning
The batch is reserved by planning. This is a comment field, in which text reservations can be made.
The system, however, is configured such that the batch can be logged in everywhere.
Reserved for
OP:
The "reserved for OP" indicator is set. The batch is reserved for the specified order/OP.
Order:
The "reserved for order" indicator is set. The batch is reserved for the specified order/OP.
Comment:
The "reserved by planning" indicator is set. A comment is entered here for reservations made due
to planning (optional text field):
Advance logon
"Advance logon" flag
A batch assigned to this indicator is currently logged in as input batch to the order/operation in
advance. The input batch is logged on in advance at the AIP terminal.
Order
The advance logon of the input batch applies for the order/operation displayed here.
BOM item
The input batch is logged on in advance for the BOM item of the order/operation displayed here.
Specific batch data
Field 1 ... 10
Fields used for specific customer purposes.
Order type
Order type of the order/ operation that created the batch.
Inspection order
Inspection order from the CAQ sector.
Article index
Article index from the CAQ sector.
OBJECT_MES-Batch_structure.docx Version: Page 9 of 10

|     |     |     | Data Structure of Batches  |     |
| --- | --- | --- | -------------------------- | --- |

Administration
Modified by
User who changed the data record at last.
Modified on
Date when this data record was edited at last.
Editing function
"Generate goods movement" option
Using this option allows for the inventory posting to be triggered as material movement.
At  the  moment  this  function  is  only  available  for  "specific  projects"  if  the  modification
|     | creatematerialmovement is enabled.   |     |     |     |
| --- | ------------------------------------ | --- | --- | --- |

| OBJECT_MES-Batch_structure.docx  |     | Version:   |     | Page 10 of 10  |
| -------------------------------- | --- | ---------- | --- | -------------- |