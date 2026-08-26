Automatic Logon of Continuous Monitoring Orders: Configuration

1  Automatic Logon of Continuous Monitoring Orders:

Configuration

Create a specific order type

Copy order type "0" to create a new Order type for continuous monitoring orders.

Activate the automatic logon of continuous monitoring orders for the entire

system

Enable the automatic logon of continuous monitoring orders in the HYDRA INI configuration:

Parameter name

INI name

Section

Key

Value

Active

Comment

Value

BDE

AUTOMATIC_OPERATION_LOGON

ACTIVE

Yes

No (by default)

Y

N

Yes

…

Activate the automatic logon of continuous monitoring orders for specific

workstations

Enable the automatic logon of continuous monitoring orders in the HYDRA INI configuration:

Parameter name

INI name

Section

Key

Value

BDE

AUTOMATIC_OPERATION_LOGON

<Machine/workplace>

Setup_ContinousMonitoringLogOn.docx  Version: 1.1.18468

Page 1 of 4

Automatic Logon of Continuous Monitoring Orders: Configuration

Parameter name

Value

Active

Comment

Yes

No (by default)

Value

Y

N

Yes

…

Configure the order type

Specify the order type in the HYDRA INI configuration:

Parameter name

INI name

Section

Key

Value

Active

Comment

Value

BDE

AUTOMATIC_OPERATION_LOGON

ORDERTYPE

<Order type to be integrated>

Yes

…

Specify the logon mode for running operations

In the HYDRA INI configuration specify if:

- you only want to log on the operation with the earliest planned start date or

- all found operations in the order of their planned start dates:

Parameter name

INI name

Section

Key

Value

BDE

AUTOMATIC_OPERATION_LOGON

ITERATE

Setup_ContinousMonitoringLogOn.docx  Version: 1.1.18468

Page 2 of 4

Automatic Logon of Continuous Monitoring Orders: Configuration

Parameter name

Value

Value

Active

Comment

All operations

Only the operation with the earliest

planned start date (by default)

Y

N

Yes

…

Specify the logoff mode for running operations

Specify in the HYDRA INI configuration how to proceed with running operations: if you want to interrupt or

finish these operations:

Parameter name

INI name

Section

Key

Value

Active

Comment

Value

BDE

AUTOMATIC_OPERATION_LOGON

LOGOFFTYPE

Interruption

Logoff (by default)

I

F

Yes

…

Generate orders and operations

Generate orders with the created order type. Generate at least one operation for this order.

It doesn't matter to the processing if orders and operations are:

- transferred from an ERP system

- created manually in HYDRA or

- generated manually from work plans in HYDRA.

Irrespective of their origin, you must add at least the following data to the orders and operations:

Setup_ContinousMonitoringLogOn.docx  Version: 1.1.18468

Page 3 of 4

Field

Order header

Order type

Operation

Planned for

Workplace

Automatic Logon of Continuous Monitoring Orders: Configuration

Value

Created order type

Machine

<Workstation the OP is logged on to>.

Planned  start  (go

to:  Order

information  

Date and time of the planned start date.

Operations    Operation    Dates    Planned

dates  Planned start).

You might have to add additional  data, such  as the target cycle, in order to  view specific target data in

evaluations and reports. This depends on the evaluations you want to use.

Setup_ContinousMonitoringLogOn.docx  Version: 1.1.18468

Page 4 of 4

