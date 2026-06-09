Posting of Quantities

1  Posting of Quantities

1.1  General

Manually collected quantities

Manual  quantities  are  always  posted  onto  the  registered  operation  and,  subject  to  the  respective

configurations in HYDRA, to the person carrying out the posting as well. The below table shows whether

or when manually collected quantities are posted onto the operation and/or the reporting person.

Posting

Posting to operation

Posting to reporting person

Interrupt OP

Log OP off

Partial
confirmation/uploa
d

Log person off

Yes

Yes

Yes

Yes

*) compare the "Notes on personal posting of quantities"

No *)  **)

No *)  **)

Yes **)

Yes

**)  The  person  who  performs  the  posting  needs  to  enter  his/her  personal  badge  number  in  the  posting

dialog.

Please note for entering the quantity when personnel is logged off:

If  several  operations  are  logged  on  simultaneously,  the  quantities  will  be  posted  onto  all  operations.

Recommendation:

The  relevant  quantities  based  on  operations  should  be  recorded  as  partial  upload  for  each  operation,

before the person logs off (without entering a quantity).

Automatically collected quantities

All OPs and employees logged on to the machine are assigned automatic quantities. Automatic quantities

result, for example from counter collection.

MBL_OrderBookingOfQuantities.docx

Version: 1.2.18468

Page 1 of 3

Posting of Quantities

The quantities to be posted are computed according to the partitioning/cavity that is respectively defined

for the operation and operations or staff are posted.

Notes on the personal posting of quantities

The  personal  posting  of  quantities  depends  on  the  workplace  on  which  an  operation  was  produced.  In

general: automatically collected quantities are always posted onto all persons who are logged on.

Individual workplace (EAP)

If quantities are neither recorded automatically nor with respect to staff (i.e. no quantity is entered when a

person logs off), no quantities will be taken over to the person. Consequently, the quantity fields within the

personal posting dialog (posting of record type "B") are empty (0).

Exceptions:

a)  The "quantity posting to staff" configuration option within the machine/workplace configuration allows

for the manually recorded quantity to be posted onto the person who has so far been logged on for

the longest time, when an OP is interrupted or logged off.

b)  Using  the  option  of  the  HYDRA  basic  parameter  settings  "post  manual  quantities  as  automatic

quantities" allows for manually recorded quantities to be posted like automatically collected quantities,

i.e. they are posted onto all OPs and persons logged on.

Group workplace (GWP/GAP)

At  group  workplaces,  the  quantity  is  always  taken  over  to  the  person  when  the  OP  is  interrupted  or

finished, as a unique assignment between person and operation has been established.

1.2  Special features

The following configuration options may influence the above-mentioned quantity posting:

Post manual quantities as automatic quantities

Cross-system configuration in the basic parameter settings of HYDRA.

Quantity posting to staff

Configuration based on workplaces.

MBL_OrderBookingOfQuantities.docx

Version: 1.2.18468

Page 2 of 3

Posting of Quantities

Merged operations

If  several  operations  are  grouped  into  a  merged  operation,  quantities  are  distributed  onto  the  individual

operations according to different configurations.

Split operations

Further information on how to post split operations or their split master can be found here.

MBL_OrderBookingOfQuantities.docx

Version: 1.2.18468

Page 3 of 3

