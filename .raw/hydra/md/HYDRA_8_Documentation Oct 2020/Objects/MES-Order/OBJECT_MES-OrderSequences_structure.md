1  Data Structure of Order Sequences

Data Structure of Order Sequences

Each  of  the  fields  for  a  sequence  is  described  below.  The  actual  sequence  of  the  editing  dialogs  may

deviate  from  the  one  illustrated  here.  Information  about  sequences  can  be  found  in  the  document  edit

sequences.

In  order  to  simplify  matters,  the  term  order  will  generally  be  used,  regardless  of  whether  an  order  or  a

work  plan  is  being  discussed.  Only  in  examples  in  which  it  would  make  sense  for  the  overall

understanding to differentiate between the two will we use the term work plan.

Order/ work plan

Order for which the sequence is defined. A sequence can only be set up for an order, if the order

header already exists in MES.

Sequence

Identification of the sequence within an order.

Please note: The standard sequence always has the sequence number 0.

If the "sequence" field is not shown, the sequence number length is 0 in the basic

parameter settings. Please contact MPDV.

Designation

Description of the sequence.

Sequence category

S = Standard sequence

There is only one standard sequence for every order; it cannot be deleted.

P = Parallel sequence to the standard sequence

There can be several parallel sequences for each order.

A = Alternative sequence to the standard sequence

There can be several alternative sequences for each order.

Please note:

The sequence category cannot be edited after a sequence has been set up!

Active

The qualification "Active" is only relevant for alternative sequences:

J = Active

N = Not active

OBJECT_MES-OrderSequences_structure.docx Version: 1.2.1362

Page 1 of 3

Data Structure of Order Sequences

If a new alternative sequence is set up, it is set as not active.

For standard sequences and alternative sequences, this qualification is always set to active.

Orientation

If  there  are  several  parallel  sequences,  the  lead  times  generally  vary  in  length.  This  creates  time

buffers  in  the  sequences.  The  orientation  function  controls  whether  these  buffers  are  at  the

beginning or the end of the sequences. The following options are available:

F = Earliest due date

If the sequence is set for the earliest date, the buffer will be at the end of the sequence.

S = Latest due date

If the sequence is set for the latest date, the buffer will be at the beginning of the sequence.

N = Not relevant; this is the case for standard sequences and alternative sequences.

If  there  are  several  parallel  sequences  for  a  given  standard  sequence,  the  orientation  of  the

standard sequence is used for all segments of the standard sequence for which parallel sequences

exist.

Version

Change number/version; for information purposes only.

Branch operation

Operation number of a standard sequence operation,

before which a parallel sequence should branch off, or

from which on an alternative sequence should be replaced.

This is a mandatory field for parallel and alternative sequences. For a standard sequence, this field

must remain empty.

If  manually  setting  up  an  alternative  or  parallel  sequence,  the  branch  operation  of  the  standard

sequence  must  already  exist  in  the  orders  on  hand.  When  a  sequence  is  handed  over  via  an

interface, a valid order number also must be handed off (there is no plausibility check).

Return operation

Operation number of a standard sequence operation,

after which a parallel sequence should branch off, or

up to which an alternative sequence should be replaced.

This is a mandatory field for parallel and alternative sequences. For a standard sequence, this field

must remain empty.

If manually setting up an alternative or parallel sequence, the branch-off operation of the standard

sequence  must  already  exist  in  the  orders  on  hand.  When  a  sequence  is  handed  over  via  an

interface, a valid operation number also must be handed off (there is no plausibility check).

OBJECT_MES-OrderSequences_structure.docx Version: 1.2.1362

Page 2 of 3

Data Structure of Order Sequences

Reference sequence

The  reference  sequence  determines  the  sequence  in  the  order  that  the  reference  operations

(branch and return) refer to. This is always the standard sequence (sequence number 0).

This  is  a  mandatory  field  for  parallel  and  alternative  sequences.  The  standard  sequence  must

already exist.

For a standard sequence, this field must remain empty.

OBJECT_MES-OrderSequences_structure.docx Version: 1.2.1362

Page 3 of 3

