Remaining Run Time

1  Remaining Run Time

Definition

The remaining run  time is  the  amount of time that remains to process an  operation, accounting for any

materials or parts that have already been processed or produced.

If the quantity that has already been produced is 0, the remaining run time is equal to the processing time

for the operation.

Using the remaining run time option in HYDRA shop floor scheduling

The remaining run time is calculated for HYDRA shop floor scheduling based on a formula stored for an

operation.  To  accomplish  this,  a  reference  to  a  formula  must  be  defined  in  formula  management  in  the

field  "Formula  RRT1"  at  the  operation.  The  formula  is  either  defined  manually  via  the  corresponding

update  function  or  it  is  transferred  at  the  PPS  interface.  If  no  customer  specific  formulas  have  been

defined,  enter  the  value  "RRT"  here.  In  this  case,  the  remaining  run  time  is  calculated  based  on  the

"Target  cycle  /  1,000  /  TLG  *  (target  quantity  -  yield  produced  up  until  now)".  Care  should  be  taken  to

ensure that the fields target cycle and partitioning have been filled in correctly for the operation.

As  a  rule:  The  display  is  not  updated  (showing  the  new  calculation  of  the  remaining  run  time)  in  the

graphic planning board until the data has been requested again.

The  field  "Remaining  run  time  2"  is  provided  for  a  second,  alternative  remaining  run  time;  it  is  also

displayed in the order overview. This formula is not used in the HYDRA shop floor scheduling module.

Error! Reference source not found.Cycle/ quantity-based remaining run times

The default remaining run time formula RRT set from the factory calculates the remaining run time based

on the target cycle defined for the operation:

(((ANR.SZY/1000)*(ANR.SGR:GUTP-ANR.EGR:GUTP)/ANR.TLG)*(ANR.SGR:GUTP-

ANR.EGR:GUTP>0))

If  the  remaining  run  time  should  be  calculated  based  on  the  operation's  actual  cycle,  then  a  new

remaining run time formula must be defined for this:

((((ANR.IZY  >  0)  *  ANR.IZY  +  (ANR.IZY  <=  0)  *  ANR.SZY)/1000)*(ANR.SGR:GUTP-

ANR.EGR:GUTP)/ANR.TLG)*(ANR.SGR:GUTP-ANR.EGR:GUTP>0)

The formula accounts for the fact that the target cycle is used for operations with an actual cycle 0 (e.g.

for operations with status "prepared").

GLOSSARY_RemainingRunTime.docx

Version: 1.0.16964

Page 1 of 2

Remaining Run Time

Time-based remaining run time

If the remaining run time should not be calculated based on the produced quantities, but instead based on

the (posted) time that has already elapsed, this can be done, for example, using the following formula:

(ANR.BEARBZ - ANR.EGR:BMK11)  *  (ANR.BEARBZ - ANR.EGR:BMK11 > 0)

The  value  ANR.BEARBZ  uses  the  value  "processing  time"  from  the  order  backlog  (auftrags_bestand

table),  whereas  the  value  ANR.EGR:BMK11  is  drawn  from  the  order  status  (auftrag_status  table).

Time/duration progresses in the order status (auftrag_status table) in the event of a

  Manual status change (M_MST)

  OP interrupt (A_UN)

  OP logoff (A_AB)

  Partial confirmation (A_TR)

  Log-ons or log-offs by a person (P_AN, P_AB)

  Any auto status (M_AST), i.e. approx. every 120 seconds

The  last  option  (M_AST)  requires  that  the  workplace  is  configured  as  an  MDE  workplace,  i.e.  it  is

assigned  to  a  terminal  that  is  running  in  operation  mode  MDE  (defined  in  the  terminal  configuration  or

alternately  in  the  terminal  assignment).  Therefore,  where  ADE  workplaces  are  concerned,  the

times/durations do not progress.

GLOSSARY_RemainingRunTime.docx

Version: 1.0.16964

Page 2 of 2

