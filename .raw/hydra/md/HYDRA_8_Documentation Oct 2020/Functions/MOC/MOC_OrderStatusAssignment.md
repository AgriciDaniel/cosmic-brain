Order Status Assignment

1  Order Status Assignment

Overview

HYDRA menu

Master data  Order  Order status assignment

FEDRA menu

Detailed Scheduling  Master data  Order status assignment

Transaction code

ost

Function authorization  mdost

Purpose

You can use the Order status assignment to configure the order statuses for the different order types. The

order status provides the current status of the order.

Integration

Because order data are recorded in the system based on the operation, the system manages one status

for each individual operation. The status indicates whether the operation has not yet begun, for example,

or whether it has begun, was interrupted or has already been finished.

In addition, a status is also kept in the order header, which provides information on whether the order has

not yet begun, whether it is currently being processed or whether it is already finished. At the time the last

operation that can be posted is finished, the status is set to finished in the order header. Operations that

cannot be posted will not be automatically finished when this occurs.

Both  order  and  operation  statuses  can  be  configured.  To  do  so,  the  status  texts  must  be  defined  first.

Then, the status texts are assigned to the individual statuses. What must be kept in mind is that for each

order  type,  the  order  status  or  the  operation  status  must  be  configured  with  one  control  indicator  each

(exception: statuses with a control indicator "S" may exist multiple times).

All possible order and operation statuses are configured in status assignment and are assigned to status

texts  using  unique  status  numbers.  The  selection  dialog  allows  you  to  select  and  display  statuses  that

have already been assigned to an order type.

Requirement

The order status texts and order types must be created first.

MOC_OrderStatusAssignment.docx

Version: 1.4.23561

Page 1 of 8

Order Status Assignment

Selection criteria

Status type

Selection of the assigned status type

Status text

Defined status text

Order type

Order type that was assigned to the status

Field descriptions

This  dialog  is  used  to  define  the  statuses  used  in  both  the  order  (header)  as  well  as  in  the  separate

operations. There is also another option that allows you to define an operation in relation to the secondary

status. To differentiate which identifier is relevant for which status type, the corresponding status type is

written in parenthesis after the field:

  A = Order status

  G = Operation status

  S = Secondary status

Order type [A G S]

The status is configured based on the order type. This means that for each order type the relevant

order  and  operation  statuses  must  be  defined.  Enter  a  valid  order  type  in  this  field,  for  which  the

status should apply.

Status type (A/G/S)

A

G

S

Status refers to the (entire) order

Status refers to the operation

This is the preparation status (=secondary status) at the operation.

Status (A/G/S)

This is the externally valid status.

Status tab

Status text no.  (A, G, S)

Reference to the order status text table

MOC_OrderStatusAssignment.docx

Version: 1.4.23561

Page 2 of 8

Order Status Assignment

Symbol  (G)

Symbol  assigned  to  the  status.  It  is  displayed  in  different  functions/  evaluations  (e.g.  order

overview).

The following values are allowed (case sensitive):

Color of the LED

Light green

Dark green

Gray

Yellow

Yellow/ light green

Pink

Black

Blue

Red

Color  (G)

Value that needs to be
entered in the editing
dialog.

Value shown in the detail
panel.

l.bmp

e.bmp

v.bmp

u.bmp

f.bmp

n.bmp

a.bmp

p.bmp

x.bmp

LED_LIGHT_GREEN

LED_GREEN

LED_GREY

LED_YELLOW

LED_YELLOW_GREEN

LED_PINK

LED_BLACK

LED_BLUE

LED_RED

Color of the relevant status (text). At this time, this color is only used in the shop floor scheduling.

Entry tab

Control

Status type A (order status)

V

L

E

S

Prepared

Release (for automatic release)

Running

At least one OP was started

Finished

All OPs are finished or deleted.

None

All others

  Status type G (OP status)

V

Prepared

MOC_OrderStatusAssignment.docx

Version: 1.4.23561

Page 3 of 8

"Release indicator" for status; before OP is edited for the first time

Order Status Assignment

L

U

F

E

S

Running

Is set automatically once OP is logged on

Interrupted

Is set automatically once OP is interrupted

Autom. interrupted

Is set by the server if you want the OP to be interrupted automatically at the

time of a shift change (when using HYDRA and the MDE function on the

terminal)

Finished

Is set automatically once OP is finished

None

Other status; not automatically set. Means that no work has yet been done on

the OP

Please note

An OP has not yet begun if its status is set with a control indicator: "V" or "S".

Explicitly setting an order to the status using the control indicator "E" will result in all OPs being set

to the status with the control indicator "E".

The  control  indicator  "A"  means  "archived";  it  is  not  set  via  configuration,  but  is  instead  a  fixed

setting made at the time the data are transferred into the long-term table.

Can be logged on

Check  to  assure  if  the  CURRENT  status  has  set  this  indicator.  If  the  operation  is  interrupted/

finished, the field is ignored. .

Please note: If an OP  or  an order have been set  with the flag "locked", then the OP may not  be

logged on under any circumstances (irrespective of this setting)

Sequencing list

If this status is set, the operation is shown in the sequencing list at the terminal.

Please  note:  if  an  OP  or  an  order  has  been  set  with  the  flag  "locked",  then  the  OP  may  not  be

displayed under any circumstances (irrespective of this setting).

Successor can be logged on

If the indicator "Check of preceding OP" ("Plausibilities" index tab) is set to “S" = status at the order

type, then this indicator is used to check whether the subsequent OP can be logged on.

The indicator relates to the preceding OP!

MOC_OrderStatusAssignment.docx

Version: 1.4.23561

Page 4 of 8

Order Status Assignment

If, for example, an OP logon of the subsequent OP is not to be allowed until the preceding OP has

at  least  begun,  then  this  indicator  must  be  set  if  the  status  is  "running",  "interrupted",  "finished"

(possibly "deleted").

If, for example, an OP logon of the subsequent OP is not to be allowed until the preceding OP has

finished, then this indicator needs only to be set if the status is "finished" (possibly "deleted").

All  preceding  OPs  resulting  from  relationships  in  ADE_AUFTRAGSNETZ,  are  checked  in  this

regard.

Successor can be logged off

If the indicator "Can be finished" ("Entry" index tab) is set to “S" = status at the order type, then this

indicator is used to check whether the subsequent OP can be logged off.

The indicator relates to the preceding OP!

Example 1: If an OP logoff of the subsequent OP is not to be allowed until the preceding OP has

also  at  least  begun,  then  this  indicator  must  be  set  to  "J"  (y  –  yes)  if  the  status  is  "running",

"interrupted" or "finished".

Example 2: If an OP logoff of the subsequent OP is not to be allowed until the preceding OP has

finished, then this indicator needs only to be set if the status is "finished" .

All  preceding  OPs  resulting  from  relationships  in  ADE_AUFTRAGSNETZ,  are  checked  in  this

regard.

Release of subsequent OP

The  release  is  only  processed  if  the  operation  status  has  changed  after  an  operation

posting (logon, interruption, logoff).

If this indicator is set, then setting the status will result in the status of the subsequent OP(s) being

set to the release status, i.e. set to the status assigned with the control indicator "V".

This only happens if the subsequent OP(s) has (have) not yet been run, was (were) interrupted or

has (have) been finished.

Thus, this option only makes sense if new operations are not created/ transferred using the status

with the control indicator "V".

Planning tab

Planning

N

T

F

No planning (no transfer to the planning component)

Scheduling only

Scheduling and detailed planning (dispatching) - also includes the simulation

MOC_OrderStatusAssignment.docx

Version: 1.4.23561

Page 5 of 8

Order Status Assignment

Please note:

The  indicator  "N"  at  the  order  overrides  the  indicator  at  the  operations.  Conversely,  the

indicators at the operations override the indicator "J" (y – yes) at the order

Posting tab

Posting order duration

Posting

M

Posting to the RPA of the workplace status

A posting to the RPA of the operation is made using the RPA of the status

currently active at the workplace (default).

Posting RPA

Reserved; currently not used

Options tab

Initial status

This relates to the initial status that should be set at the time an order (A) or an OP (G, S) is set.

Exactly one status must be set using this indicator for both the order as well as the operation.

Please note: If the initial status is not the status with the control indicator "V", then the status of the

first operation as well as that of the order is set using the control indicator "V" after the first

scheduling, provided that the indicator "Scheduling without implicit order release" is not set at the

order type.

Status can be set manually

Reserved; currently not used.

Authorization

Reserved; currently not used

Change of secondary status

Change of secondary status allowed (J (y – yes)/N)

Priority check

Checking the priority in the priority management (order group)

If the priority control is activated in the configuration of the Order types, then the system performs a

check using the priority management (Order group) when an order is created or changed.

The check includes all orders with the status where this option is enabled.

MOC_OrderStatusAssignment.docx

Version: 1.4.23561

Page 6 of 8

Note: The priority is ony checked if actually the priority was changed.

Alterable order data

If this status is set, the order or the OP may either be altered by the PPS system or manually or it

Order Status Assignment

may no longer be altered.

J = console and MLE interface (PPS=J) alterable

N = console and MLE interface not alterable

K = Only console alterable (not via the MLE interface)

M = Only MLE interface alterable (not via the console)

This option does not refer to the priority, notes, long texts, secondary statuses.

Deletable

May the order or the operation be deleted in this status (manually, via PPS system)?

Order

Yes, BUT only if the operations can be deleted, i.e. at no operation may a status be set that has a

control indicator "L” AND for which the "deletable" indicator is set to "N".

  Operation

If the OP is running, then the deletion flag  is set.

Please note: Operations with a current status with a control indicator "L" or "F" may as a rule not be

deleted, irrespective of this setting.

Action

Behavior indicating how the order or the operation should respond during the deletion process, i.e.

at the time of deletion (now) or when a deletion flag is triggered:

Order

L

E

If something is physically deleted and all operations are physically deleted as

well (order header controls the behavior)

Order is set to the status with the control indicator "E".

WARNING: Only the order header, i.e. for the OPs the indicator must also be

set!

D

Order is set to status with control indicator "D" and is deleted/ archived using

the archiving/ deletion program (data management) after the set period. How

the  operations  are  treated  is  described  via  the  indicator  RESET  ACTION

(LOESCHAKTION) at the status of each OP.

X

If the action was triggered by the MLE interface:

Order is set to the status with the control indicator "E".

WARNING: Only the order header, i.e. for the OPs the indicator must also be

MOC_OrderStatusAssignment.docx

Version: 1.4.23561

Page 7 of 8

Order Status Assignment

set!

If the action was NOT triggered by the MLE interface:

If something is physically deleted and all operations are physically deleted as

well (order header controls the behavior)

Operation

L

D

E

X

Is physically deleted.

Is set to the status with the control indicator "D".

OP is set to the status with the control indicator "E" (fixed).

If the action was triggered by the MLE interface:

OP is set to the status with the control indicator "E" (fixed).

If the action was NOT triggered by the MLE interface:

OP is physically deleted.

The reset/deletion action should be the same for both the order header as well as for the

OPs,  because  currently  the  settings  each  relate  to  the  order  or  to  OPs  and  the  OPs  do

not "inherit" anything from their order header.

To assure that an order or an operation can no longer be deleted as of a certain status,

the indicator must be set at all corresponding statuses.

MOC_OrderStatusAssignment.docx

Version: 1.4.23561

Page 8 of 8

