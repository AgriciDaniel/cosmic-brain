Manual

Palletizing / Packaging /
Assembling
TRT-PPK 8.1

Version 1.0.54

Last changed on: 19.06.2020

Palletizing / Packaging / Assembling

Copyright

©Copyright 2012 All rights reserved.
SAP® and R/3® are registered trademarks of SAP AG.
WINDOWS® is a registered trademark of Microsoft Corporation.
MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.
ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.
The information contained in this documentation is subject to change without prior notice.

TRT-PPK_81.docx

Version: 1.0.18468

Page 2 of 10

Palletizing / Packaging / Assembling

Contents

1  Palletize / Package / Assemble .................................................................... 4

2  Activating Palletizing/ Packaging/ Assembling ............................................. 5

3  Palletizing/ Packaging/ Assembling at the Terminal .................................... 7

TRT-PPK_81.docx

Version: 1.0.18468

Page 3 of 10

Palletizing / Packaging / Assembling

1

 Palletize / Package / Assemble

Overview

Purpose

The  function  package  Palletize  /  Package  /  Assemble  expands  the  material  and  production  logistics  as

well as tracking and tracing with functions to support the logistic processes processing and palletizing and

to integrate into the data entry and tracing system.

Implementation Considerations

Use  this  function  package  in  combination  with  the  function  package  Material  and  Production  Logistics

and/or Tracking & Tracing to document the summary of material in handling units in the system to

  use the data for tracing purposes



label and identify the generated handling units

Features

  Packaging station configuration

o  Configuring a work place as a packaging station

  Special posting process

o  Mapping specific input processing for palletizing and packaging procedures at packaging

stations

o  Function to generate handling units on Windows based BDE terminals

  HU Corrections

o  Function to edit the handling units (e.g. assigning batches to and removing batches and

from the handling unit)

  Printing labels at the HU

o  Capability  to  print  a  label  at  the  handling  unit  when  the  label  was  created  using  the

HYDRA Designer for labels and production papers (HYD-ETD)

TRT-PPK_81.docx

Version: 1.0.18468

Page 4 of 10

Palletizing / Packaging / Assembling

2  Activating Palletizing/ Packaging/ Assembling

Requirements

Ensure that:

  The flag "Batch management requirement" is set at the operation

  The operation material type does not have the flag "Consumption balance"

  The primary quantity unit for the operation is "KG"

Ensure that at the workplace:

  The flag "Batch administration" is set

  The machine type "Packing location" is selected

  Machine monitoring is not activated

Procedure

Assign the workplace to a terminal. Reboot the terminal.

Results

The following specific dialogs are available at the terminal for the configured packing location:

Dialog

A_AN_HU

A_P_AN_HU

CE_AN_HU

CA_WL_HU

A_UN_HU

A_AB_HU

A_AUT_HU

C_VLOS_HU

Description

Log packing OP on (no input batches)

Log packing OP on (no input batches, with person)

Assign batch to running OP/ TPU

Complete TPU (output batch change)

Interrupt packing OP

Finish packing OP

Log off/ interrupt OP selection

Display preceding TPU

The TPU batch numbers created are permanently generated at the terminal with the prefix HU.

The prefix is not currently configurable.

There is no off-line entry capability

TRT-PPK_81.docx

Version: 1.0.18468

Page 5 of 10

Palletizing / Packaging / Assembling

TRT-PPK_81.docx

Version: 1.0.18468

Page 6 of 10

Palletizing / Packaging / Assembling

3  Palletizing/ Packaging/ Assembling at the Terminal

Log on packing OP

Using the following entry function (dialog A_AN_HU or A_P_AN_HU) the operator can log a packing OP

on that is subject to batch management:

When the OP is logged on, an operation is selected from the sequencing list and then logged on at the

machine.  OPs  without  input  material  requiring  batch  management  are  logged  on  and  posted  using  the

PDM command A_AN or A_P_AN.

If the machine is configured so that a person must be logged on with the OP, then the command A_P_AN

is used and the badge number must be available as an entry field.

Assign batches

Using  the  following  entry  function  (dialog  CE_AN_HU)  on  a  terminal,  batches  for  a  current  TPU  (active

output batch) can be assigned to an active OP requiring batch processing:

Illustration:  Assign batches dialog - CE_AN_HU

By entering a  batch number that is known in HYDRA and  pressing the "Assign batch" key, the batch is

logically  assigned  to  the  current  TPU.  After  it  is  successfully  assigned,  the  batch  is  in  the  "processed"

status and is displayed in the list of TPU batches.

General note: Only batches with the same material number may be assigned.

TRT-PPK_81.docx

Version: 1.0.18468

Page 7 of 10

Palletizing / Packaging / Assembling

Using the "Remove batch" button, you can remove a batch from assignment by selecting it (double click

on the line). This switches the batch back to the "free" status.

The number of assigned batches and the sum of their total quantity in kg are displayed in the window as

supplementary status information about the current TPU.

The content of the grid "Batches in transport unit" is configured in the file ctaiplay.ini using the section [

C_PAL_ZUORD.LST ].

Complete TPU

By  using  the  following  entry  function  (dialog  CA_WL_HU)  on  the  terminal,  the  currently  active  output

batch (TPU/handling unit) can be completed.

Illustration:  Complete TPU dialog – CA_WL_HU

Using the "Complete TPU" function, a TPU can be completed by entering the weight and the status good

/ blocked / scrap. When the TPU is completed, the active output batch is posted with quantity (net weight)

and completed, and  a goods receipt (movement type 101)  is posted.  At the same time, the next  output

batch is logged on at the OP.

The following data can be entered at this posting:

Target buffer

Material buffer the TPU batch is posted to. Default assignment is the machine's output buffer.

Gross weight / Tare Weight / Net weight

TRT-PPK_81.docx

Version: 1.0.18468

Page 8 of 10

Palletizing / Packaging / Assembling

The  net  weight  is  preset  with  the  sum  (in  kilograms)  of  the  assigned  individual  batches.

If entered manually, the calculation is as follows:

Gross weight = tare weight + net weight

The values gross weight and tare weight are also stored as batch attributes at the TPU batch:

  Gross weight

-  batch attribute 301 (ATTR:301)

Tare weight

-  batch attribute 302 (ATTR:302)

Transp. unit (Transport unit)

By  selecting  a  transport  unit  available  in  the  system,  an  assignment  can  be  made  to  the  TPU

batch.

 Please note: The transport unit's defined  weight is currently  not  assumed as the tare  weight in

the input mask.

Status (free / blocked / scrap)

In  addition  to  the  “free”  status  (yield),  the  generated  TPU  batch  can  also  be  generated  on  the

"blocked" status (Class yield) or as a scrap batch (Class scrap).

In the case of scrap, the quantity is also posted as scrap at the operation by entering a reason.

Number of batches

Shows  the  number  of  batches  currently  assigned  to  the  TPU.  The  value  is  stored  with  a  fixed

value as batch attribute 201 (ATTR:201).

After  confirming  with  OK,  additional  batch  attributes  may  be  entered  if  they  were  defined  at  the

operation's material type.

After the posting is successfully completed, the TPU batch is generated as a so-called merged batch and

the quantity and goods movement relating to the operation are entered.

Log OP off/ interrupt OP

Using the following entry function (dialog A_UN_HU  or A_AB_HU) on the terminal, the packing OP can

be interrupted or logged off.

TRT-PPK_81.docx

Version: 1.0.18468

Page 9 of 10

After a selection is made, the operator can interrupt or terminate the packing OP:

Palletizing / Packaging / Assembling

Illustration: Interrupt packing OP dialog – A_UN_HU

After confirming with OK, the active packing OP is interrupted/ terminated.

Please note/ restrictions:

  The  last  active  output  batch  at  the  packing  OP  is  completed  without  a  quantity  by  setting  the

status "deleted".



If  there  are  still  assigned  batches  on  the  TPU  when  logging  off,  the  posting  is  refused  with  an

error message.

  The ADE inspections relating to the operation's over/ underdelivery are inactive using this posting

function.



It is not possible to post a quantity using this function.

TRT-PPK_81.docx

Version: 1.0.18468

Page 10 of 10

