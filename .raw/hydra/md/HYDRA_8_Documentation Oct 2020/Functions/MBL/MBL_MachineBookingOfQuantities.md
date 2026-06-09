Booking of Quantities

1  Booking of Quantities

Data collection in different quantity types and quantity accounts

At  the  machine  or  workplace,  you  can  collect  the  quantities  in  different  quantity  types  and  for

different quantity accounts.

The following quantity accounts are supported:

  Yield

  Scrap

  Rework

  Open quantity (problem quantity)

The following quantity types are supported with each quantity account:

  Primary quantity

  Secondary quantity

  Tertiary quantity

  Base quantity

The automatic collection of quantities on the terminal always refers to the primary quantity.

Conversion to alternative quantity units

Bookings for alternative quantity accounts can be performed as follows:

  direct (manual) input

  conversion

o

from other quantity types with manual input

o

from primary quantity with automatically collected quantities

MBL_MachineBookingOfQuantities.docx  Version: 1.4.18696

Page 1 of 8

Booking of Quantities

Direct (manual) input

If  a  quantity  is  directly  (manually)  entered  in  a  quantity  unit  of  a  quantity  type,  an  automatic

conversion is not performed.

Conversion from other quantity types

If alternative quantity accounts are not collected, the server converts the quantities to alternative

accounts using the conversion factors or quantity units, which are configured in the master data

of the machine/workplace on the console.

In general, conversion first takes place into the base quantity unit (unless this one is recorded

manually) and from the base quantity unit into the alternative unit (unless this one is recorded

manually).

Identical quantity units

If quantity units are identical they are converted via numerator and denominator in the master

data  of  machines/workplaces.  If  numerator  and/or  denominator  =  0,  then  the  quantities  are

taken over 1 to 1 without being converted.

Different quantity units

If quantity units are different, conversion is performed in the following order of priorities:

  Conversion using the numerator and denominator defined in the workplace/machine master

data (always convert into base quantity unit first, then into the alternative unit);

If numerator and/or denominator = 0

  Conversion using the formulas of the quantity units  .

No quantity units

If quantity units are not assigned for the machine, no conversion is performed.

Conversion of quantity 0

A quantity 0 is generally not converted into alternative units, even if a value that is not 0 could

be calculated (e.g. using a formula).

MBL_MachineBookingOfQuantities.docx  Version: 1.4.18696

Page 2 of 8

Booking of Quantities

Quantity conversion of automatically collected quantities

To convert automatically recorded quantities using formulas, you can use

- fixed factors/values or values based on machines/workplaces (user fields);

- data that is specific to the operation, such as length, width, weight per piece, etc.

You use the operation logged on the longest to identify the OP-specific data. Consequently, the

following (logical) restriction arises for operations that are logged on at the same time when it

comes to quantity conversion:

- the operations must produce the same material;

- the operations must have the same default data (length, width, weight per piece).

Any further requirements must be taken into account as part of customer projects.

Basis for HYDRA-MDE quantity conversion

In  the  Workplace/machine  configuration,  tab  Configurations  >  Quantities,  you  can  use  the

configuration option Basis for HYDRA-MDE quantity conversion to use the configured quantity

conversion  of  the  running  operations  also  for  the  machine.  This  option  ensures  a  correct

calculation of quantities even if more than one operation is active :

M – conversion factors of the workplace (APZ) [default]

A – conversion factors of the OP if logged on, otherwise workplace

Notes

If  configuration  A  and  different  quantity  units  of  operations  are  used,  the  quantities  are

accumulated and booked to the machine accounts without reference to the units.

When  you  edit  postings,  the  MDE-related  quantity  conversion  using  the  operation  data  or  the

machine/workplace values (user fields) is not supported. In this case, do not enable the option

Convert quantities in the editing dialog of the maintenance of postings.

Display of alternative quantity units on the terminal

The  (manual)  collection  and  display  of  alternative  quantity  units  is  only  possible  on  Windows

terminals  (requires  customization).  Note:  The  terminal  itself  does  not  perform  any  local

conversion  into  alternative  quantity  units;  the  quantities  are  only  displayed  when  data  is

reloaded from the HYDRA server.

MBL_MachineBookingOfQuantities.docx  Version: 1.4.18696

Page 3 of 8

Booking of Quantities

Automatic collection of quantities

You configure the counters for each machine. The following options are available:

  Posting of yield, scrap, rework, open quantity, no posting

  Posting of cycles (strokes)

  The  quantity  is  calculated  using  partitioning  (parts  produced  per  cycle)  and/or  pulse

factor

  Cycle monitoring

  Reason (e.g. scrap reason)

  Offset against “quantity account"

e.g. scrap is deducted from yield

Quantities  that  are  issued  by  automatically  recorded  counters  are  always  posted  in  primary

quantity.  The  conversion  into  other  quantity  types  is  described  in  the  previous  section.  The

HYDRA  server  can  use  different  quantity  accounts  to  calculate  a  quantity  (e.g.  to  record  the

total quantity).

If the cycles are collected, not every single cycle is transferred to the server, but the collected

and  also  the  calculated  cycles  and  the  evaluated  counters  are  cyclically  transferred  to  the

server.  The  values  transferred  are  then  integrated  into  the  events  or  into  the  calculated

quantities of the machine-related postings (MDE log records).

Example 1:

A yield counter and a scrap counter are defined for the machine. The scrap collected is offset

against the yield collected.

The  events  and  postings  include  the  offset  and  calculated  quantities.  Not  for  each  cycle,  a

posting is created.

MBL_MachineBookingOfQuantities.docx  Version: 1.4.18696

Page 4 of 8

Booking of Quantities

Example 2:

A  defined calculation of a counter  reading  can  also  result  in negative quantities in the  posting

records:

Counters that are configured with the "no posting" option do not post any quantities to a quantity

account. Using these counters, the following use cases can be integrated:

  Cycle monitoring only

MBL_MachineBookingOfQuantities.docx  Version: 1.4.18696

Page 5 of 8

Booking of Quantities

  Cycle monitoring and posting as cycles (strokes)

  Posting as cycles (strokes) without cycle monitoring

Quantity calculation and parallel make-to-order production

With operations that are logged on at the same time, quantities are posted with respect to the

order according to the relevant specifications (partitioning, pulse factor) of the operation.

This specific calculation of quantities is performed with all quantity accounts that are recorded

automatically  (yield,  scrap,  rework,  open  quantity).  Counter  pulses  or  quantities  resulting  from

this  calculation  are  generally  posted  onto  all  OPs  that  are  logged  on  (according  to  the

configuration: with activated partitioning/pulse factor or not).

Specifications are identified as follows:

Partitioning/cavity (TLG)

Partitioning of the machine (parts per cycle): (TLG OP1 + TLG OP2 + TLG OPn) * TLG Machine

If  a  partitioning  is  specified  for  a  machine,  the  partitioning  of  the  operations  and  the  machine

partitioning are multiplied.

If  you  interrupt/log  off an operation,  the  partitioning  of  the  machine  is  updated,  i.e. the total  of

the remaining operations is recalculated.

If the last operation is interrupted or logged off, the partitioning is reset to 1 and multiplied by the

machine-specific partitioning.

Partitioning of the operation: TLGOP * TLG Machine

Changing the partitioning on the terminal

If  the  partitioning  of  the  operation  is  changed,  the  partitioning  of  the  machine  and  of  the

operation is changed/updated.

MBL_MachineBookingOfQuantities.docx  Version: 1.4.18696

Page 6 of 8

Booking of Quantities

Pulse factor (IMPFAKT)

Pulse  factor  of  the  machine  =  minimum(IMPFAKTOP1,  IMPFAKTOP2,…  IMPFAKTOPn)  *

IMPFAKTMachine

Pulse factor of the OP = minimum(IMPFAKTOP1, IMPFAKTOP2,… IMPFAKTOPn) * IMPFAKTMachine

Note:

The same pulse factor applies for all active operations. Therefore, you must ensure that parallel

operations get the same default pulse factor.

This means: The same pulse factor is used for all operations when quantities are calculated.

Quantity calculation on the basis of partitioning and pulse factor

Quantity of the machine = <number of cycles> * partitioning of the machine / pulse factor of the

machine

Quantity of the operation = <number of cycles> * partitioning of the operation / pulse factor of

the operation

Note:

The pulse factor is calculated as a fraction. When the quantity is calculated, the pulse is used as

denominator and the partitioning is the numerator.

Display on terminal

On  the  terminal,  the  field  Partitioning  shows  the  factor  that  is  relevant  for  the  quantity

calculation of the machine. It is

partitioning of the machine / pulse factor of the machine.

As  described  above,  the  different  default  values  of  the  machine  (e.g.  machine-specific

partitioning) and of the active operations are used to calculate this factor.

On  the  terminal,  the  field  Target  cycle  shows  the  relevant  current  target  cycle  (the  cycle

extension is not integrated). This is max(SZYOP1..n) for OPs that are logged on at the same time.

MBL_MachineBookingOfQuantities.docx  Version: 1.4.18696

Page 7 of 8

Booking of Quantities

Output "target quantity reached"

The target quantity output of the machine interface, e.g. setting a lamp, is set when the smallest

target  quantity  of  a  logged  on  order  is  reached.  If  the  OP  with  the  smallest  target  quantity  is

interrupted or finished, the next OP with the smallest target quantity is used.

Manual collection of quantities

You can also use the configurations below to book manually recorded quantities:

  Offset quantities (accounts) against other quantity accounts (Allocation with option)

e.g. deducting manually recorded scrap from yield

  Post manual quantities as cycles

Offsetting against another quantity account

You  can  offset  automatically  and  manually  recorded  quantities  against  another  quantity

account, e.g. you can deduct the manually recorded scrap from the yield.

You can use the Allocation with option for

  automatically recorded quantities in the counter configuration

  manually recorded quantities in the machine configuration.

If you use these options, bookings (BDE log records, MDE log records) with negative quantities

or negative order quantities can result.

MBL_MachineBookingOfQuantities.docx  Version: 1.4.18696

Page 8 of 8

