SAP - PP-PDC

1  SAP - PP-PDC

Definition

PP-PDC  (Production  Planning  –  Plant  Data  Collection)  serves  as  interface  to  the  SAP  ECC  production

control. It replaces the previous interface that was supplied under the name of communication channel 2

(CC2) and extends its functions.

The  interface  is  implemented  to  connect  MES  subsystems,  which  are  also  used  to  enter  operation

confirmations. To perform a data collection plausibility check in the sub-system, PP-PDC offers download

capabilities for transactions (initial, delta and deletion download) and of workplaces, variance reasons and

quantity units.

This  is  implemented  on  the  basis  of  the  BAPI  technology,  whereas  the  SAP  transceiver  that  had  been

applied  before  is  no  longer  being  used.  This  approach  constitutes  the  future  communication  standard

within an integrated SAP system architecture. The BAPI technology is now used to  connect HYDRA on

business level.

GLOSSARY_SAP_PP-PDC.docx

Version: 1.0.1362

Page 1 of 1

