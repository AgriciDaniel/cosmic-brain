Setting Outputs Depending on Status and Posting Scenario

1  Setting Outputs Depending on Status and Posting Scenario

Usage

Under advanced configurations,  it is possible to set the  machine's digital outputs to account for  when a

certain machine status and a defined posting scenario coincide.

The following combination of machine status and posting scenario can be configured:

  A status is active without a production lock

  A status is active with a production lock

  A status is active, but no operation is logged on

  A status is active and at least one operation is logged on

  A status is active, but no person is logged on

  A status is active and at least one person is logged on

If the situation changes (status modification, activate or deactivate P lock, OP posting, personnel posting),

the terminal checks the logical configured outputs and sets them as necessary.

In  doing  so,  there  is  the  option  to  set  exactly  the  same  logical  output  for  several  statuses  within  one

machine as well as several statuses of different machines.

If  a  logical  output  is  set  for  different  conditions  at  the  same  status,  then  it  will  be  set  if  one  of  the

conditions is met (OR link).

Requirements

  This function is only available at the Windows CTWIN or AIP terminals.

  For this purpose, the terminal must be configured in operation mode "MDE".

  The machine must be permanently assigned to the "MDE terminal".

  Output signals that are used for this function may not be configured anywhere else at the same time
(e.g. machine lock). This must be assured during configuration. This is not checked automatically.

  The terminal must be restarted any time a change is made to the configuration of the logical outputs.

  The outputs configured here may not be used simultaneously with the "inputs/ outputs" configuration

that exists in the resource configurations.

MDE_digital_output_depending_on_scenario.docxVersion: 1.1.18468

Page 1 of 2

Setting Outputs Depending on Status and Posting Scenario

Procedure

The configurations required for this are defined in the so-called "object-related configuration".

Object type

fix "MSTAT“ (Machine STATus)

ID1

ID2

ID3

ID4

Parameters

Machine number

for a numeric machine number, always add leading zeros to make it eight digits

Machine status number

(leave empty)

(leave empty)

The following parameters are supported:
MST_NO_PLOCK
MST_PLOCK
MST_NO_ANR

Output/ signal for "Status active without production lock“
Output/ signal for "Status active with production lock“
Output/ signal for "A status is active, but no operation is logged
on“
Output/ signal for "A status is active and (at least) one operation is
logged on"
Output/ signal for "A status is active, but no person is logged on“
Output/ signal for "A status is active and (at least) one person is
logged on"

MST_WITH_ANR

MST_NO_PNR
MST_WITH_PNR

Parameter value

The parameter value is always the number of the logical output that is to be set.

Active

Fix "J"

Example

Output  1  is  to  be  set  at  machine  100  if  either  setup  (status  2)  or  dismantling  (status  9)  is  active  with  a

production lock.

Output 2 is to be set at machine 100 if production (status 1) is active although no operation is logged on.

Object
type

MSTAT

MSTAT

MSTAT

ID 1

ID 2

ID 3

ID 4

Parameters

Parameter value  Activ

100

100

100

2

9

1

MST_PLOCK

MST_PLOCK

MST_NO_ANR

1

1

2

e

Y

Y

Y

MDE_digital_output_depending_on_scenario.docxVersion: 1.1.18468

Page 2 of 2

