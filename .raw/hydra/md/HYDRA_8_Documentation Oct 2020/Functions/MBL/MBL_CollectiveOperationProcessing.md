Processing of Merged Operations
1 Processing of Merged Operations
Purpose
Merged operations are a special form of the serial production. In the relevant planning level (e.g. in
HYDRA shop floor scheduling) or on the shop floor terminal, you combine different operations with a short
run time each to a logic group, which then has a manageable run time. This group of operations is called
"merged operation". The system creates a "substitute" operation representing the merged operation. You
then plan and log on only the "substitute" operation that contains all single operations. You use different
configurable perspectives to distribute the data recorded.
Integration
To create a merged operation, HYDRA provides two methods:
Creating merged operations on the terminal
The operator creates the merged operation on the terminal. When you log on a merged operation,
you enter the single operations one after the other and assign them to the relevant person. When
you log off or interrupt this merged operation, you must only enter the person.
Creating merged operations on the MOC
The function Generate merged operation combines separate operations and builds a substitute
operation that stands in for all the other short operations. You log on the substitute operation on the
terminal.
If you have created a merged operation on the MOC, you can schedule this merged operation
using the MOC planning functions. This is not possible with merged operations created on the
terminal.
Requirements
You cannot create merged operations on the terminal and on the MOC. This is incompatible. You must
configure in the HYDRA basic settings which one of the two methods is used. Subject to this
configuration, the functions for merged operations are available either on the terminal or on the MOC
only.
1.1 Creating merged operations on the terminal
Using the function Merged operation on the terminal, you can combine several operations and build one
merged operation (MOP) on the terminal.
Order processing using merged operations is useful if:
MBL_CollectiveOperationProcessing.docx Version: 1.8.18468 Page 1 of 11

Processing of Merged Operations
 several operations with short run times are combined to build one operation (lower posting
efforts),
 several operations are produced using one workplace at the same time. The system cannot make
timely logon/logoff postings for the separate operations (for example during hardening in the
metal industry or smoking in the food industry).
1.1.1 Different posting types of merged operations
The below-mentioned types of postings for merged operations are specified in the Terminal configuration.
"Generation per person"
When you log on a MOP, you log on the combination of person and orders. The person who combines
several operations to build a MOP is automatically logged on to all separate operations included in the
MOP.
Only one MOP is possible per person. If a person performs another MOP logon at a later time, then these
separate operations are automatically assigned to the already existing MOP.
A MOP can only be logged on, logged off or interrupted. You cannot log on additional persons to a
person-related MOP.
"Generation per machine"
With this configuration, you can use the function Log on merged operation on the terminal to combine
several OPs and build one MOP. Per machine, you can create one MOP.
Just as it is the case for single operations, several persons can log on to this MOP. If you interrupt or log
off the MOP, all persons logged on are automatically logged off. The posting of quantities and the
distribution of times is made in accordance with the specifications described in the sections that follow.
1.1.2 Posting of merged operations on the terminal
For information on how to create merged operations on the terminal, refer to the relevant terminal
documentation (for Windows or DOS terminals).
Merged operations are created on the terminal as described in the relevant documentation. The terminal
generates a substitute order number for the merged operation. Depending on the posting type, the user's
badge number or the machine/workplace number is integrated in this order number:
Merged operation number for the "generation per person" option
Depending on the length of the order number and staff badge number configured in the system, the
number of the merged operation is created as follows:
MBL_CollectiveOperationProcessing.docx Version: 1.8.18468 Page 2 of 11

Processing of Merged Operations
The length of the order no. is at least four characters longer than the staff badge no.:
SAM-XXXXX xxxxx represents the staff badge no.
The length of the order no. is at least two characters longer than the staff badge no.:
S-XXXXX xxxxx represents the staff badge no.
The order number length is not at least two characters longer than the staff badge number:
In this case, the standard function "merged operations on the terminal" cannot be used.
Merged operation number for the "generation per machine" option
Depending on the length of the order number and the machine number configured in the system, the
number of the merged operation is created as follows:
Length of the order number is at least two characters longer than the length of the machine/workplace
number:
S-XXXXX xxxxx represents the machine/workplace number
Length of the order number is at least four characters longer than the length of the machine/workplace
number:
SAM-XXXXX xxxxx represents the machine/workplace number
The length of the order number is not at least two characters longer than the length of the
machine/workplace number:
In this case, the standard function "merged operations on the terminal" cannot be used.
1.1.3 Booking of merged operations created on the terminal
The actual times recorded for the MOP can be distributed according to the following methods:
According to the standard times, i.e. in relation to the standard times of the separate OPs
According to the default quantities, i.e. in relation to the target quantities of the separate OPs
According to the individual OP, i.e. according to the number of the logged on single OPs
The posting method is defined in the Basic settings.
MBL_CollectiveOperationProcessing.docx Version: 1.8.18468 Page 3 of 11

|     |     |     | Processing of Merged Operations  |
| --- | --- | --- | -------------------------------- |

The options "according to standard time" or "according to default quantity" must not be used
together with the option Proportionate RPA posting in personnel postings in the basic settings.

Please contact MPDV Support to configure the MOP posting method.

Example - Distribution according to standard time
Distribution of the actual times of the MOP according to the standard times of the separate OPs:
3 operations are combined and form one MOP:
| OP    | Standard time  |     |     |
| ----- | -------------- | --- | --- |
|       |                |     |     |
| OP01  |   8000 sec     |     |     |
| OP02  |   600 sec      |     |     |
| OP03  |   6000 sec     |     |     |
A log record for the MOP with the run time of 12000 sec must now be distributed to the separate OPs.
The following formula is used to distribute the times
| Totaldurationof | thelogrecord*standardtimeof |     | individualOP |
| --------------- | --------------------------- | --- | ------------ |
Postedtimes

|     | Totalof thestandardtimesof | allOPs |     |
| --- | -------------------------- | ------ | --- |
The following values result for the separate OPs:
| OP                                 | Run time booked  |     |     |
| ---------------------------------- | ---------------- | --- | --- |
|                                    |                  |     |     |
| OP01                               |   6575 sec       |     |     |
| OP02                               |   493 sec        |     |     |
| OP03                               |   4932 sec       |     |     |
|     Sample calculation for OP 01:  |                  |     |     |
Sum of standard times of all separate OPs = 8000 + 600 + 6000 = 14600
Run time booked = 12000 * 8000/14600 = 6575 sec
PLEASE NOTE:
The standard time of an operation is calculated using the target setup time + target duration.
Example - Distribution according to standard time
Distribution of the actual times of the MOP according to the target quantities of the separate OPs:
3 operations are combined to form one MOP:

MBL_CollectiveOperationProcessing.docx Version: 1.8.18468  Page 4 of 11

|     |     |     |     | Processing of Merged Operations  |
| --- | --- | --- | --- | -------------------------------- |

| OP    | Target quantity  |       |     |     |
| ----- | ---------------- | ----- | --- | --- |
|       |                  |       |     |     |
| OP01  |                  | 1000  |     |     |
| OP02  |                  | 500   |     |     |
| OP03  |                  | 2500  |     |     |

A log record for the merged OP with the run time 12000 sec must now be booked to the different OPs. To
distribute the times, the following formula applies
| Totaldurationof | logrecord*targetquantityof |     |     | individualOP |
| --------------- | -------------------------- | --- | --- | ------------ |
Postedtime
|     | Totalof target | quantitiesof | allindividualOPs |     |
| --- | -------------- | ------------ | ---------------- | --- |
The following values result for the separate OPs:
| OP    | Run time booked  |           |     |     |
| ----- | ---------------- | --------- | --- | --- |
|       |                  |           |     |     |
| OP01  |                  | 3000 sec  |     |     |
| OP02  |                  | 1500 sec  |     |     |
| OP03  |                  | 7500 sec  |     |     |

Sample calculation for OP01:
Sum of target quantities of all separate OPs = 1000 + 500 + 2500 = 4000
Run time booked = 12000 * 1000/4000 = 3000 sec
Example – Distribution according to the number of separate operations
Distribution of actual times of the MOP according to single OPs
3 OPs are combined to form one MOP:
A log record for the MOP with the run time 12000 sec must now be distributed to the different OPs. To
distribute the times, the following formula applies

| Totaldurationof | thelogrecord |     |     |     |
| --------------- | ------------ | --- | --- | --- |
Postedtime
| numberof | individualOPs |     |     |     |
| -------- | ------------- | --- | --- | --- |
The following values result for the separate OPs:
| OP    | Run time booked  |           |     |     |
| ----- | ---------------- | --------- | --- | --- |
|       |                  |           |     |     |
| OP01  |                  | 4000 sec  |     |     |
| OP02  |                  | 4000 sec  |     |     |
| OP03  |                  | 4000 sec  |     |     |

The quantities and the times recorded are also posted for the person who processes the MOP.

MBL_CollectiveOperationProcessing.docx Version: 1.8.18468  Page 5 of 11

Processing of Merged Operations
1.1.4 Notes on the configuration and the processing
Configuration and use
 By default, the “merged operation” function is not active and must be enabled for a specific terminal in
the terminal configuration.
 Only the ADE terminal provides MOP functions on DOS terminalsCT56x und CT73x . On Windows
terminals, the MOP functions can also be used in "MDE" operation mode.
 To produce a MOP, the option Logon of several OPs must be set in the workplace/machine
configuration, i.e. it is permitted to log on several operations at this workplace.
 When you create merged operations on the terminal, the option Max. OPs per person of the HR
master data is used. If the option Max. OPs per person is set to =1 for the person, the person can
only log on one operation as merged operation.
 A person can use a maximum of 20 separate operations to build a merged operation.
 When you log on a MOP on a DOS terminal Typ CT56x und CT73x , a sequencing list is not
supported, i.e. you must enter the order numbers via barcode or manually.
 If the number of pieces is not recorded for a merged operation, the actual quantity produced is set to
the target number of pieces of the separate OPs when the MOP is logged off.
 If the quantity is recorded for a merged operation, the quantity entered for each operation is posted to
the different operations when the merged operation is interrupted or logged off.
 For merged operations that are logged on to workplaces/machines with automatic recording of
quantities, the proportionate quantity is posted to each separate operation. The quantities are
distributed according to the same key as it is the case for times. See the sections above.
 When the MOP is logged off/interrupted, you must only enter the badge number (MOP person). All
operations included in a person's merged operation are logged off automatically.
Supported automatic functions/data collection options
 Terminate OP when reaching target quantity, only option "Y" (as of SP10/2016)
When the MOP is interrupted, the system checks if the single OP has reached its target quantity. If
yes, the relevant OP is finished instead of interrupted. The system does not automatically log off a
single OP from a merged operation, if the target quantity of a single OP is reached or exceeded with
an upload of a partial quantity or an automatic recording of quantities.
 Terminate OP instead of interrupting it
When you interrupt the MOP, the system checks if the single OP is finished and not interrupted.
 Interrupt OP instead of terminating it
When you log off the MOP, the system checks if the single OP is interrupted and not finished.
 Automatic release of succeeding OP
MBL_CollectiveOperationProcessing.docx Version: 1.8.18468 Page 6 of 11

Processing of Merged Operations
 Configurable posting behavior with change/end/beginning of shift
The order type specifies if the behavior is configured for the machine or the person. Special feature:
With person-related MOPs, the merged operation is interrupted when the person is logged off,
regardless of the OP setting.
Not supported or restricted automatic functions/data collection options
 Terminate OP when reaching target quantity: options U, F and K
 Option Proportionate posting of machine time with parallel OPs in the machine configuration because
this option performs the proportionate posting that is configured for the MOP.
 Target quantity reached output (is only performed for the total quantity of the MOP)
 Collection of serial number
 Data collection with batch management requirement
 Posting of resources
 With the milestone processing, you must be aware that a single OP of a MOP cannot be unmerged
from the MOP when a posting is made for the preceding or succeeding OP.
Example:
When you log off an OP, the preceding OP cannot be logged off automatically if the preceding OP is
included in a merged OP (person or machine).
The MOP must be logged off manually.
 Other restrictions exist with the CAQ integration and the data collection for MOPs, for example the
automatic logon and logoff of inspection OPs.
Waiting period processing
If you must postdate a MOP logon because of the waiting period processing, the first single operation of
this merged operation is postdated. Further OPs that might be added to the MOP at a later time need not
be postdated.
If a clock-out is posted in the PZE for the person that processed the MOP, then all included operations
are automatically interrupted.
If the waiting period processing function is configured accordingly, it is also possible that the person who
processes the MOP is automatically logged on again as soon as they clock-in in HYDRA-PZE.
1.2 Creating merged operations on the MOC
You can use this function to combine separate operations to build merged operations on the MOC.
The functions to create and cancel merged operations are available in the Order overview and in the
Order sequencing dialog (to call the order sequencing, the BDE-FST must be licensed).
MBL_CollectiveOperationProcessing.docx Version: 1.8.18468 Page 7 of 11

|     |     |     |     | Processing of Merged Operations  |
| --- | --- | --- | --- | -------------------------------- |

If a merged operation is created on the MOC, then the “members” of a merged operation are no longer
displayed. Also in the sequencing list on the terminals, the member operations are no longer displayed.
The number of members in a merged operation is not limited. You can only add prepared orders/OPs to
merged operations that are not already contained in other merged operations.
You cannot integrate merged operations themselves into other merged operations.
All postings of a merged operation on the terminal are made for all "members" of a merged operation.
You can log on, interrupt and log off merged operations on the terminal exactly like normal operations.
| 1.2.1  | Creating merged operations on the MOC  |     |     |     |
| ------ | -------------------------------------- | --- | --- | --- |
The method to create merged operations is described here.
| 1.2.2  | Booking of merged operations  |     |     |     |
| ------ | ----------------------------- | --- | --- | --- |
(created on the MOC)
To distribute the quantities and times recorded for a merged operation among the included operations,
the system supports the "homogeneous" and the "inhomogeneous" method for the merged operations
that were not created on the MOC.
Homogeneous merged operations
With a homogeneous merged operation, quantities and times are distributed using the overrun principle:
all separate operations are “filled up” one after the other according to the specified target number of
pieces. If the production surpasses the quantity planned for the total merged operation, then this excess
and the respective times are added to the single operation having the largest order number.
| Simplified example:  |     |                  |                  |     |
| -------------------- | --- | ---------------- | ---------------- | --- |
| OP                   |     | Target quantity  | Target run time  |     |
| OP01                 |     | 200              | 4.0 hours        |     |
| OP02                 |     | 450              | 9.0 hours        |     |
| OP03                 |     | 250              | 4.5 hours        |     |

A log record of the merged operation containing the real quantity 500 and real duration 5.0 hours must
now be redistributed among the separate operations. The number of pieces is posted to the separate
OPs one after the other (up to the specified target quantity). Depending on the posted number of pieces,
| the following formula is used to calculate the times:  |     |     |     |     |
| ------------------------------------------------------ | --- | --- | --- | --- |

Totallogrecordtime*postedquantity
| Postedtime |                 |              |     |     |
| ----------- | --------------- | ------------ | --- | --- |
|             | Totalquantityof | thelogrecord |     |     |

MBL_CollectiveOperationProcessing.docx Version: 1.8.18468  Page 8 of 11

|     |     |     |     | Processing of Merged Operations  |
| --- | --- | --- | --- | -------------------------------- |

| The following values result for the separate OPs:  |     |                  |                  |     |
| -------------------------------------------------- | --- | ---------------- | ---------------- | --- |
| OP                                                 |     | Posted quantity  | Run time booked  |     |
| Single OP01                                        |     | 200              | 2.0 hours        |     |
| Single OP02                                        |     | 300              | 3.0 hours        |     |
| Single OP03                                        |     | 0                | 0.0 hours        |     |

Non-homogeneous merged operations
With an inhomogeneous merged operation, the quantities and times are posted proportionately to the
separate operations included. If excess production takes place, then the excess is distributed among the
different operations.
| Simplified example:  |     |                  |                |     |
| -------------------- | --- | ---------------- | -------------- | --- |
| OP                   |     | Target quantity  | Standard time  |     |
| Single OP01          |     | 400              | 8.0 hours      |     |
| Single OP02          |     | 20               | 0.5 hours      |     |
| Single OP03          |     | 30               | 1.0 hours      |     |

A log record for the merged operation including an actual quantity 200 and a run time 4 hours must now
be redistributed to the separate operations. The following formulas apply:
| Distribution of times  |     |     |     |     |
| ---------------------- | --- | --- | --- | --- |
𝑆𝑡𝑎𝑛𝑑𝑎𝑟𝑑 𝑡𝑖𝑚𝑒 𝑜𝑓 𝑖𝑛𝑑𝑖𝑣𝑖𝑑𝑢𝑎𝑙 𝑂𝑃∗
| 𝑃𝑜𝑠𝑡𝑒𝑑 𝑡𝑖𝑚𝑒 | = ( |     | )∗𝑇𝑜𝑡𝑎𝑙 𝑑𝑢𝑟𝑎𝑡𝑖𝑜𝑛 𝑜𝑓 𝑙𝑜𝑔 𝑟𝑒𝑐𝑜𝑟𝑑  |     |
| ----------- | --- | --- | ------------------------------- | --- |
𝑆𝑢𝑚 𝑡𝑜𝑡𝑎𝑙 𝑜𝑓 𝑎𝑙𝑙 𝑖𝑛𝑑𝑖𝑣𝑖𝑑𝑢𝑎𝑙 𝑂𝑃𝑠

| Distribution of quantities  |     |     |     |     |
| --------------------------- | --- | --- | --- | --- |

𝑇𝑎𝑟𝑔𝑒𝑡 𝑞𝑢𝑎𝑛𝑡𝑖𝑡𝑦 𝑜𝑓 𝑖𝑛𝑑𝑖𝑣𝑖𝑑𝑢𝑎𝑙 𝑂𝑃
| 𝑃𝑜𝑠𝑡𝑒𝑑 𝑞𝑢𝑎𝑛𝑡𝑖𝑡𝑦 | = ( |     | )∗𝐴𝑐𝑡𝑢𝑎𝑙 𝑞𝑢𝑎𝑛𝑡𝑖𝑡𝑦 𝑜𝑓 𝑙𝑜𝑔 𝑟𝑒𝑐𝑜𝑟𝑑  |     |
| --------------- | --- | --- | -------------------------------- | --- |
𝑆𝑢𝑚 𝑡𝑜𝑡𝑎𝑙 𝑜𝑓 𝑎𝑙𝑙 𝑖𝑛𝑑𝑖𝑣𝑖𝑑𝑢𝑎𝑙 𝑂𝑃𝑠

MBL_CollectiveOperationProcessing.docx Version: 1.8.18468  Page 9 of 11

|     |     |     |     | Processing of Merged Operations  |     |
| --- | --- | --- | --- | -------------------------------- | --- |

The following values result for the separate OPs:
| OP    |     | Posted quantity  | Run time booked  |     |     |
| ----- | --- | ---------------- | ---------------- | --- | --- |
| OP01  |     | 178              | 3.4 hours        |     |     |
| OP02  |     |   9              | 0.2 hours        |     |     |
| OP03  |     | 13               | 0.4 hours        |     |     |
Sample calculation (for single OP01)
Run time booked = 8/9.5 * 4 = 3.4
Quantity booked = 400/450 * 200 = 178 pieces.
The standard time of an operation is calculated using the target setup time + processing
time. All data required for this calculation is contained in the order backlog of the operation.

If uneven values like 2.666 result when the piece number is distributed, the calculated quantity
is cut off and 2 pieces are booked for the operation. Exception: With the last operation, the

difference between quantity posted and quantity already booked is used.
The type used for the merged operation in the entire system is specified once in the HYDRA basic
settings using the BDE option Process merged operations.
The upload of the times recorded to the PPS system is performed according to the definition of the
merged operation type – homogeneous or inhomogeneous.
If a member of a merged operation is finished e.g. via ERP interface, then this operation is skipped during
the calculations described above.
| 1.2.3  | Further notes  |     |     |     |     |
| ------ | -------------- | --- | --- | --- | --- |
Validation checks
Validation checks, which are performed during the booking process (e.g. target quantity validation
for upload of a part quantity), are only performed for the merged operation and not for the separate
operations assigned to the merged operation.
Changing OP data
| Changing the MOP   |     |     |     |     |     |
| ------------------ | --- | --- | --- | --- | --- |
If you make changes to the merged operation, the single OPs included are NOT changed.
| Changing a member of a merged operation  |     |     |     |     |     |
| ---------------------------------------- | --- | --- | --- | --- | --- |
If you make changes to one of the operations included in a merged operation, the master operation
ist not changed.
Whether you can make changes or not depends on the relevant status of the operation (same
process as with a normal operation).

MBL_CollectiveOperationProcessing.docx Version: 1.8.18468  Page 10 of 11

|     |     | Processing of Merged Operations  |
| --- | --- | -------------------------------- |

MBL_CollectiveOperationProcessing.docx Version: 1.8.18468  Page 11 of 11