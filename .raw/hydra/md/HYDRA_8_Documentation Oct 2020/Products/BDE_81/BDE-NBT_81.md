Manual

Cavity-Related Change in
Partitioning
BDE-NBT 8.1

Version 1.1.4716

Last changed on: 19.06.2020

Cavity-Related Change in Partitioning

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

BDE-NBT_81.docx

Version: 1.1.8703

Page 2 of 6

Cavity-Related Change in Partitioning

Contents

1  Übersicht Nestbezogene Teiligkeitsänderung ............................................. 4

2  Entering Cavity-Related Partitioning at AIP ................................................. 5

BDE-NBT_81.docx

Version: 1.1.8703

Page 3 of 6

Cavity-Related Change in Partitioning

1

 Übersicht Nestbezogene Teiligkeitsänderung

Purpose

This component is used when you wish to perform and document a cavity-related change in partitioning

or cavity.

Integration

The cavity-related change in partitioning is performed at the Windows-based BDE terminal. It represents

an extension of the posting dialog "Change partitioning" (M_TLG) available in the BDE/MDE.

If  you  use  the  tool  and  resource  management  system  (WRM)  and  its WRM-NST  component,  extended

tests against WRM master data are possible.

Features

  Definition of reasons for the change in partitionings/cavities at the Windows-based BDE terminal

  Collection of cavity fade-in or cavity dimming at the Windows-based BDE terminal. Input of the cavity

number, selection of a reason and entry of an optional comment



Inspection  of  the  partitioning  at  posting  of  the  order  against  the  partitioning  of  the  tool  resource

(precondition: WRM-NST) and warning if exceeded.

  Display of a list for selection of a cavity and plausibility check of the cavity number against the cavities

defined at the tool resource (precondition: WRM-NST).

  Reducing  or  increasing  the  partitioning  of  the  machine  and  the  active  operation  by  the  number  of

faded-in or dimmed cavities

  Additional  activation/deactivation  of  the  mold  cavity  master  data  and  calculation  of  the  current

partitioning in the tool master data record (precondition: WRM-NST).

  Logging of the posting "Change in partitioning" as an event

  Display of the logged posting in the workplace/machine history (precondition: MDE-MMD).

Please note: The posting dialogs are activated during HYDRA customizing.

BDE-NBT_81.docx

Version: 1.1.8703

Page 4 of 6

Cavity-Related Change in Partitioning

2  Entering Cavity-Related Partitioning at AIP

Usage

You use this function if you would like to access documentation relating to cavities that concern covering

and uncovering tool cavities.

Integration

The  partitioning  defined  on  the  selected  operation  is  changed  by  modifying  partitioning.  Partitioning

modifications are documented in machine history.

When tool and resource management (WRM) is used, the partitioning defined on the currently logged-on

tool is also modified due to the effects of the cavity-related partitioning change.

Prerequisite

A  relevant  license  is  required  for  this  function  to  work.  The  configuration  requirements  are  described  in

the section Configuration.

Display on the AIP

The M_TLG_NEST dialog can be configured on the AIP instead of the M_TLG dialog. This configuration

is done at the time the system is customized by MPDV.

Description of function

When  the  dialog  is  opened,  the  order-specific  information  is  extracted  from  the  selected  operation  and

displayed. Except for the "Comment" field, all fields must be filled in.

Cavity number (mandatory field)

The cavity number can be selected from a list (only when used with WRM) or entered manually.

Reason (mandatory field)

In the list of choices for a reason, reasons are displayed to choose from based on the selection criteria

"Type of change".

Each  reason  must  be  configured  in  the  "Reasons"  configuration  on  the  client  separately  by  increase

(reason type "E") or decrease (reason type "R").

Comment (optional field)

BDE-NBT_81.docx

Version: 1.1.8703

Page 5 of 6

Cavity-Related Change in Partitioning

A comment for the posting can be entered here.

Staff badge number (mandatory field)

Staff badge number entry for the person to be logged on.

The  cavity  change  is  made  on  the  server.  Thus,  a  cavity  change  can  only  be  made  on  the

terminal in online mode, because otherwise the lists on the terminal cannot be updated.

Configuration

The configuration was set up in the default configuration file ctaipbut.ini as follows.

Standard configuration

...
[MNR-ALL-Page2]
;1=M_TLG_NEST,L,Kavität ändern,Objects.png
1=M_TLG,L,Teiligkeit ändern,Objects.png
...

Configuration after customizing

...
[MNR-ALL-Page2]
1=M_TLG_NEST,L,Kavität ändern,Objects.png
;1=M_TLG,L,Teiligkeit ändern,Objects.png
...

BDE-NBT_81.docx

Version: 1.1.8703

Page 6 of 6

