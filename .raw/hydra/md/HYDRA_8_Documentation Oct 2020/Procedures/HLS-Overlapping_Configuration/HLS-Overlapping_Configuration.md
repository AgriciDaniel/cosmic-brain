Configuration of overlapping operations

1  Configuration of overlapping operations

Overview

You  commonly  define  dependencies  between  operations  (OPs)  as  finish-to-start  relationships.  When

scheduling  operations,  the  finish-to-start  relationship  has  the  effect  that  the  succeeding  OP  cannot  be

started (change from status prepared to status running) until the preceding OP is finished 100 % (status

finished). In the HYDRA shop floor scheduling (HLS), operations that are dependent on each other must

never overlap; this is shown in the following screenshot:

You can change existing dependencies using the "overlapping" function.  With the overlapping function,

you can schedule the succeeding OP even if the preceding OP has not yet been finished 100 % and is still

in status running. An overlapping might be useful if the succeeding OP can start with a part quantity that

has been produced by the preceding OP.

The necessary configurations for an overlapping of two operations are described in the following.

Configurations in the Processing code

Menu

Master data  Order  Processing codes

Transaction code

Pc

Function authorization  Mdpc

Each operation is based on a processing code. You can find the processing code of an existing operation

in the application Order information, tab Operations, sub-tab Processing.

If you want to enable overlapping, configure the processing code of the respective operations as follows.

1.  Go to the application Processing codes.

2.  Select the processing code for which you want to configure overlapping and click the button Edit.

3.  Go to the tab Planning and select the entry S Target overlapping of the drop-down menu in the

field Overlapping.

Further information on processing codes and the configuration possibilities can be found here.

HLS-Overlapping_Configuration.docx

Version: 1.0.18468

Page 1 of 3

Configuration of overlapping operations

Configurations in the Operation

Menu

Order Management  Order Management  Edit Operations

Transaction code

edop

Function authorization

edop

By configuring the processing code you have enabled overlapping. In the application Operation, you must

configure if and when the overlapping of two operations should take place.

1.  Go to the application Edit operations.

2.  Select the preceding OP and edit it.

Two settings are relevant for the overlapping:

-  Send-ahead quantity

-  Synchronization time

Change to the tab Quantities. In the field Send-ahead quantity, enter the quantity needed to start with the

succeeding OP.

This configuration has the effect that e.g. in the  Graphic planning the succeeding OP can be scheduled

free of conflicts for the (calculated) point in time when the preceding OP will have produced the send-ahead

quantity. The calculation of the point in time when the preceding OP will have produced the send-ahead

quantity is based on the value stored in the field Target processing time in the tab Durations.

The  calculation  of  the  time  when  the  send-ahead  quantity  is  reached  always  depends  on  the

value in the field Target processing time. This also applies if you want to identify the operation

time/remaining run time in the Graphic planning using the target cycle.

The  formula  stored  in  the  field  Processing  time  formula  is  used  to  calculate  the  value  that  is

displayed in the field Target processing time.

If you want to avoid that a succeeding OP starts too early despite a sufficient send-ahead quantity of the

preceding OP, you must configure a maximum synchronization time. The maximum synchronization time

is  the  time  the  preceding  OP  must  have  been  processed  at  least  before  the  succeeding  OP  can  be

scheduled free of conflicts. A possible configuration of the preceding OP would be as follows:

-  Target quantity: 10,000 pieces

-  Target processing time: 30 hours

-  Send-ahead quantity: 1,000 pieces

  The succeeding OP could start after 3 hours.

HLS-Overlapping_Configuration.docx

Version: 1.0.18468

Page 2 of 3

-  Maximum synchronization time: 10 hours

  The succeeding OP is only scheduled after the preceding OP has been processed

Configuration of overlapping operations

for 10 hours.

Effects of the configurations

Menu

Production control  Production preparation  Graphic planning

Transaction code

grap

Function authorization

grap

You have enabled an overlapping of two operations by way of the above mentioned configurations. For

example, the Graphic planning is affected by the configurations made. Here, you can now plan overlapping

operations free of conflicts by manual assignment or via automatic assignment as shown in the screenshot

below.

In addition, a start-to-start relationship is established for the operations that are affected by the overlapping.

In case of a start-to-start relationship, the start of the succeeding OP depends on the start of the preceding

OP.

HLS-Overlapping_Configuration.docx

Version: 1.0.18468

Page 3 of 3

