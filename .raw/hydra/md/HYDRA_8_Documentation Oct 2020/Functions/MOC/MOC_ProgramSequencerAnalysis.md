Sequencer Analysis

1  Sequencer Analysis

Summary

Menu

Production facilities management  Status analyses, machine data

Transaction code

psa

Function authorization

psa

Usage

The sequencer monitoring is used to monitor machine programs that are programmed in sequencers; in

this  way  it  is  easy  to  determine  if  programs,  e.g.  cleaning,  have  not  run  without  errors.  A  machine  or

aggregate can have several sequencers that run in parallel.

A sequencer consists of

  Programs

  Modules

  Steps:

A machine can have multiple, independent, parallel sequencers. These are then defined by further TAGs.

The  evaluation  only  considers  data  within  the  related  evaluation  period.  In  this  way  it  cannot  be

determined  which  program  was  most  recently  active  before  the  evaluation  period.  Due  to  this  fact,  the

starting  point  of  the  evaluation  must  be  selected  such  that  at  least  one  posting  of  the  program  to  be

evaluated is present after the starting  point. Otherwise, the first program displayed is that  which  has its

first posting after the evaluation start.

MOC_ProgramSequencerAnalysis.docx  Version: 1.1.1362

Page 1 of 4

Example:

Sequencer Analysis

Integration

Due  to  the  quantity  of  data,  sequencers  are  recorded  as  process  values,  but  are  interpreted  for  the

evaluation as having parallel status. For this reason, both the parallel status and the PRD collection must

be configured accordingly. The configuration is explained in the separate documentation for setting up the

sequencer collection by a specific project.

Prerequisite

The sequencers are based on status words that are present in a control for the sequencers. These must

be present on the machine.

Selection parameters

The following selection criteria are available in the application:

Machine

Selection of a machine for which the data is to be determined and displayed.

Period

Period for which the data is determined and then displayed.

MOC_ProgramSequencerAnalysis.docx  Version: 1.1.1362

Page 2 of 4

Schrittkette A13:54 - 14:55Programm 312:34 - 13:54Programm 212:00 - 12:34Programm 113:24 - 13:54Modul 113:04 - 13:24Modul 212:34 - 13:04Modul 112:34 - 13:54SchritteStatusverlauf der SchritteSchrittkette B13:54 - 14:55Programm 312:34 - 13:54Programm 212:00 - 12:34Programm 113:24 - 13:54Modul 113:04 - 13:24Modul 212:34 - 13:04Modul 112:34 - 13:54SchritteStatusverlauf der SchritteSchrittketten einer Maschine

Sequencer Analysis

Consider long-term data

This flag can be used so that even data that has already been archived can be accessed.

Detail application programs

The  program  is  the  machine  program  that  is  currently  running;  do  not  confuse  this  program  with  the

"program" of the Weihenstephan standard status model (#00200); instead it is the KHS machine program.

Detail application module

A module consists of a defined sequence of steps. Each module fulfills a certain task, which can be used

multiple times within a program in another context. For example, the module "Fill boiler" can be used for

filling with either water or cleaning medium.

MOC_ProgramSequencerAnalysis.docx  Version: 1.1.1362

Page 3 of 4

Sequencer Analysis

Note  on  determining  the  first  module  for  the  selected  program:  Using  the  starting  point  of  the

program, the data are determined minus one minute and the end point of the program due to the

inaccuracy of the measurement. In the end, the first data record selected is one with an entry time

that is less than or equal to the start of the program. If the point in time of this entry lies before the

start of the program, it is corrected to the start of the program. If the start of the entry lies after the

start of the program, another entry  is inserted before  it,  which assumes the starting point of the

program and has the value 99 (corresponds with "Module unknown").

The last entry contains the ending point of the program as the ending point.

Detail application steps

Each step has a certain, defined task. For each step there is a uniquely defined machine function (with a

defined location of all process valves). Switching from one step to the next can be connected to various

criteria.

Note on determining the first step for the selected module: This procedure with the steps is analogous to

the determination of the modules.

MOC_ProgramSequencerAnalysis.docx  Version: 1.1.1362

Page 4 of 4

