HYDRA-BDE Input Types (relating to personnel)

1  HYDRA-BDE Input Types (relating to personnel)

1.1

1.1  Summary

The  sections  that  follow  describe  the  different  personnel-related  views  by  way  of  examples.  Postings

based  on  people  and  on  operations  are  displayed.  To  simplify  matters,  breaks  are  not  included  in  the

calculation of time intervals.

1.2  Single machine operation

"Single machine operation" means that one person works alone on an operation at one workstation.

1.3  Multiple machine operation

Multi machine operation means that one person processes several operations at several  workstations at

the  same  time.  This  is  normal,  for  example,  on  semi  or  fully  automatic  machines,  where  one  person

monitors  several  machines,  feeding  them  with  raw  material  and  removing  the  finished  parts.  The  labor

utilization  relating  to  operations  is  reduced  according  to  the  number  of  machines  that  are  operated

simultaneously.

CollectionTypes_PersonnelRelated.docx  Version: 1.0.11891

Page 1 of 4

HYDRA-BDE Input Types (relating to personnel)

Example

One person processes two operations at the same time on two machines.

                                             │ Record  │ Dur-  │  Labor     │
                                             │ type    │ ation │  duration  │
                                             ├─────────┼───────┼────────────┤
MACHINE 1                                    │         │       │            │
                                             │         │       │ d1    2.00 │
OP1 ╠═══════════════════╣                    │    U    │  5.00 │ d2/p  1.50 │
                                             │         │       │ Total 3.50 │
                                             ├─────────┼───────┼────────────┤
                                             │         │       │ d1    2.00 │
P1  ├───────────────────┤                    │    B    │  5.00 │ d2/p  1.50 │
                                             │         │       │ Total 3.50 │
MACHINE 2                                    ├─────────┼───────┼────────────┤
                                             │         │       │ d2/p  1.50 │
OP2         ╠══════════════════════════╣     │    U    │  6.00 │ d3    3.00 │
                                             │         │       │ Total 4.50 │
                                             ├─────────┼───────┼────────────┤
                                             │         │       │ d2/p  1.50 │
P1          ├──────────────────────────┤     │    B    │  6.00 │ d3    3.00 │
                                             │         │       │ Total 4.50 │
                                             └─────────┴───────┴────────────┘

    ├───────┼───────────┼─────────────┤  Time intervals
      d1=2h     d2=3h        d3=3h
       p=1       p=2          p=1
    ├────────────────┴────────────────┤  Time scale in h
   8.00            12.00            16.00

   p : the number of times the same person has logged in
   di: time interval i

1.4  Group work

Group  work  means  that  several  people  process  a  single  operation  at  one  workstation.  With  every

additional person who is logged on, the labor utilization increases accordingly.

Example

Three people process an operation on one machine.

                                          │ Record  │ Dur-  │ Labor    │
                                          │ type    │ ation │ duration │
                                          ├─────────┼───────┼──────────┤
OP ╠════════════════════════════════╣     │    U    │  8.00 │   15.00  │
                                          ├─────────┼───────┼──────────┤
P1 ├───────────────┤                      │    B    │  4.00 │    4.00  │
                                          ├─────────┼───────┼──────────┤
P2         ├────────────────────────┤     │    B    │  6.00 │    6.00  │
                                          ├─────────┼───────┼──────────┤
P3             ├────────────────────┤     │    B    │  5.00 │    5.00  │
                                          └─────────┴───────┴──────────┘

   ├───────┴───┴───┴────────────────┤  Time scale
  8.00            12.00            16.00

CollectionTypes_PersonnelRelated.docx  Version: 1.0.11891

Page 2 of 4

HYDRA-BDE Input Types (relating to personnel)

1.5

"Mixed operation"

HYDRA allows for all of the above-mentioned variants to be mixed, that is, HYDRA correctly handles the

situation where a person with multi-machine operation is additionally logged on to a machine with group

work.

Example

Several  people  process

several  operations  on

several  machines

(parallel  production).

Machine 1 is an individual workplace

Machine 2 is a group workplace

                                                       │ Record │ Dur-   │  Labor       │
                                                       │ type   │ ation  │  duration    │
                                                       ├────────┼────────┼──────────────┤
Machine 1 Individual Workplace                         │        │        │              │
                                                       │        │ d1    2│ d1    2.0  P1│
OP 1 ╠═════════════════════════╣                       │   U    │ d2    1│ d2/2  0.5  P1│
                                                       │        │ d3    2│ d3/3  0.7  P1│
                                                       │        │ Total 5│ Total 3.2    │
                                                       ├────────┼────────┼──────────────┤
                                                       │        │ d1    2│ d1    2.0    │
P1  ├─────────────────────────┤                        │   B    │ d2    1│ d2/2  0.5    │
                                                       │        │ d3    2│ d3/3  0.7    │
                                                       │        │ Total 5│ Total 3.2    │
                                                       ├────────┼────────┼──────────────┤
                                                       │        │ d2    1│ d2/2  0.5  P1│
OP2           ╠══════════════════════════════════╣     │   U    │ d3    2│ d3/3  0.7  P1│
                                                       │        │ d4    1│ d4/2  0.5  P1│
                                                       │        │ d5    2│ d3/2  1.0  P1│
                                                       │        │ d6    1│ d6    1.0  P1│
                                                       │        │ Total 7│ Total 3.7    │
                                                       ├────────┼────────┼──────────────┤
                                                       │        │ d2    1│ d2/2  0.5    │
P1            ├──────────────────────────────────┤     │   B    │ d3    2│ d3/3  0.7    │
                                                       │        │ d4    1│ d4/2  0.5    │
                                                       │        │ d5    2│ d5/2  1.0    │
                                                       │        │ d6    1│ d6    1.0    │
                                                       │        │ Total 7│ Total 3.7    │
                                                       └────────┴────────┴──────────────┘

CollectionTypes_PersonnelRelated.docx  Version: 1.0.11891

Page 3 of 4

HYDRA-BDE Input Types (relating to personnel)

                                                       ┌────────┬────────┬──────────────┐
Machine 2 Group Workplace                              │        │        │              │
                                                       │        │ d1    2│ d1    2.0  P2│
OP 3 ╠═════════════════════════════╣                   │   U    │ d2    1│ d2    1.0  P2│
                                                       │        │ d3    2│ d3    2.0  P2│
                                                       │        │ d4    1│ d4    1.0  P2│
                                                       │        │ Total 6│ Total 6.0    │
                                                       ├────────┼────────┼──────────────┤
                                                       │        │ d1    2│ d1    2.0    │
P2  ├─────────────────────────────┤                    │   B    │ d2    1│ d2    1.0    │
                                                       │        │ d3    2│ d3    2.0    │
                                                       │        │ d4    1│ d4    1.0    │
                                                       │        │ Total 6│ Total 6.0    │
                                                       ├────────┼────────┼──────────────┤
                                                       │        │ d3    2│ d3/3  0.7  P1│
OP 4                ╠════════════════════════╣         │   U    │ d4    1│ d4/2  0.5  P1│
                                                       │        │ d5    2│ d5/2  1.0  P1│
                                                       │        │ Total 5│ Total 2.2    │
                                                       ├────────┼────────┼──────────────┤
                                                       │        │ d3    2│ d3/3  0.7    │
P1                 ├────────────────────────┤          │   B    │ d4    1│ d4/2  0.5    │
                                                       │        │ d5    2│ d5/2  1.0    │
                                                       │        │ Total 5│ Total 2.2    │
                                                       └────────┴────────┴──────────────┘

    ├─────────┼────┼─────────┼────┼─────────┼────┤  Time intervals
       d1=2h  d2=1h  d3=2h   d4=1h   d5=2h   d6=1h

    ├────┴────┴────┴────┴────┴────┴────┴────┴────┤  Time scale in h
  08:00     10:00     12:00     14:00     16:00

   di: Time interval i

CollectionTypes_PersonnelRelated.docx  Version: 1.0.11891

Page 4 of 4

