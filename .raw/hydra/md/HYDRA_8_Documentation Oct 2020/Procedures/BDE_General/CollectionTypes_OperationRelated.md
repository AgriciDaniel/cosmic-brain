HYDRA-BDE Input Types (relating to operations)

1  HYDRA-BDE Input Types (relating to operations)

1.1  Serial production

The  serial  production  is  the  "classic"  approach  of  manufacturing  operations.  This  means  that  only  one

operation is produced at a machine at a time.

Serial production has the advantage that machine efficiency can be easily planned.

1.2  Parallel production

Parallel  production  means  that  more  than  one  operation  is  processed  simultaneously  on  the  same

machine.

At individual workplaces the system assumes that the two operations belong together (e.g. production

of  upper  and  lower  parts  with  the  same  tool  as  two  separated  operations).  Consequently,  the  system

connects each person (who is logged on) with every operation. However, the labor utilization relating to

operations is thereby halved.

At group workplaces, in contrast, parallel production is possible without the system linking the person to

all  operations  that  are  currently  being  processed.  This  is  mainly  used  at  assembly  workstations  where

several workers at the "Assembly" workstation process several operations in parallel. A disadvantage of

this option is that the planning of such workstations is difficult.

1.3  Merged operations

This is a special type of serial production. At the planning stage (e.g. HYDRA shop floor scheduling) or at

the shop floor terminal, different short running operations are grouped together in logical blocks with an

easy  to  handle  running  time  (i.e.  merged  operations).  For  these  merged  operations  HYDRA  creates  a

“representative” operation, which is logged on for all individual operations included. The entered data is

divided according to different configurable perspectives.

CollectionTypes_OperationRelated.docx  Version: 1.0.11891

Page 1 of 2

HYDRA-BDE Input Types (relating to operations)

1.4  Splits

If an operation should  be  processed on several machines in parallel, the HYDRA shop floor scheduling

module allows for the operation to be split into several "splits". These splits are handled by HYDRA like

separate operations and can separately be logged on and off independently of each other. The collection

of all actual data then pertains to the particular splits and to the original operation (master split), which is

known to the PPS system.

1.5  Multiple machine production

If  no  planning  tool  is  used  in  HYDRA  (e.g.  HYDRA  shop  floor  scheduling  module),  the  system  can  be

configured in a way that allows for an operation to be processed, i.e. logged on, on several machines at

the same time, without having to be split. Data is collected separately for every machine. A disadvantage

of this variant is that planning becomes very difficult.

1.6

"Mixed operation"

As regards the shop floor, HYDRA generally supports all forms of mixed operation. Consequently, splits,

merged  operations  and  "normal"  operations  can  be  processed  serially,  in  parallel  or  as  multi-machine

production. Data collection refers in each case to the collection forms presented above.

In this way, it might be possible in HYDRA, for example, that while an upper and lower part are produced,

the operation called "compression lower part" can be logged on to another workstation at the same time

for reworking purposes (e.g. debur).

CollectionTypes_OperationRelated.docx  Version: 1.0.11891

Page 2 of 2

