Manual

Cavity-Related Change of
Partitioning
BDE-NBT 8.2

Version 1.2.23049

Last changed on: 01.09.2020

Cavity-Related Change of Partitioning

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

BDE-NBT_82.docx

Version: 1.2.23049

Page 2 of 11

Cavity-Related Change of Partitioning

Contents

1  Overview: Cavity-Related Change in Partitioning ........................................ 4

2  Recording of the Cavity-Related Partitioning on the AIP ............................. 5

3  Reason Texts ............................................................................................... 8

4  Reasons ....................................................................................................... 9

BDE-NBT_82.docx

Version: 1.2.23049

Page 3 of 11

Cavity-Related Change of Partitioning

1

 Overview: Cavity-Related Change in Partitioning

Purpose

This  component  is  used  if  you  wish  to  perform  and  document  cavity-related  changes  in  partitioning  or

cavity.

Integration

The  cavity-related  change  in  partitioning  is  performed  at  Windows  shop  floor  terminals.  The  function

represents an extension of the posting dialog "Change partitioning" (M_TLG) available in the BDE/MDE.

If you use the Tool and Resource Management module (WRM) and its WRM-NST component, extended

tests against WRM master data are feasible.

Features

  Definition of reasons for the change in partitioning/cavities at Windows shop floor terminals

  Recording  of  released  and  blocked  cavities  at  Windows  shop  floor  terminals.  Input  of  the  cavity

number, selection of a reason and entry of an optional comment

  Checking  partitioning  when  logging  on  the  order  against  the  partitioning  of  the  tool  resource

(precondition: WRM-NST) and warning if exceeded.

  Display of a list for selection of a cavity and validation check of the cavity number against the cavities

defined at the tool resource (precondition: WRM-NST).

  Reducing  or  increasing  the  partitioning  of  the  machine  and  the  active  operation  by  the  number  of

released or blocked cavities

  Additional  activation/deactivation  of  the  mold  cavity  master  data  and  calculation  of  the  current

partitioning in the tool master data record (precondition: WRM-NST).

  Logging of the posting "Change in partitioning" as an event

  Display of the logged posting in the workplace/machine history (precondition: MDE-MMD).

Please note: The posting dialogs are activated as part of HYDRA customizing.

BDE-NBT_82.docx

Version: 1.2.23049

Page 4 of 11

Cavity-Related Change of Partitioning

2  Recording of the Cavity-Related Partitioning on the AIP

Purpose

You use this function to document changes when tool cavities are opened or closed.

Integration

If you change the so-called partitioning (i.e. the parts per cycle), the partitioning stored for the operation

selected is changed. The change of the partitioning is documented in the machine history.

If you use the Tool and Resource Management (WRM) and if you change the cavity-related partitioning,

then the system also changes the partitioning that is stored for the currently logged on tool.

Requirements

This  functionality  requires  a  license.  The  configuration  requirements  are  described  in  section

Configuration.

Function description

When you open the dialog, the order information is transferred from the operation selected and displayed

in the dialog. Except the field Comment, all fields of the dialog must be filled.

Cavity number (mandatory field)

You can select the cavity number via list (only in connection with WRM) or enter the number manually.

Reason (mandatory field)

The  selection  list  of  the  Reason  shows  reasons  that  you  can  select  according  to  the  "type  of  change"

selected.

Configure the reasons on the client in the configuration "reasons". Distinguish between increase (reason

type "E") and reduction (reason type "R").

Comment (optional field)

You can enter a comment for the posting.

Staff badge number (mandatory field)

Enter the ID/badge number of the person making the posting.

The person must be authorized in the HR master data to change the cycle/partitioning.

BDE-NBT_82.docx

Version: 1.2.23049

Page 5 of 11

Cavity-Related Change of Partitioning

The partitioning is changed on the server. For this reason, you can only change the partitioning

on the server in ONLINE mode because the lists on the terminal cannot be updated otherwise.

Configuration

Configuration on the MOC

To  use  the  function,  you  must  configure  reasons  for  the  increase  or  reduction  of  the  partitioning.  First

create the reason texts on the MOC, then assign them to the reasons. When you configure the reasons,

you  must  distinguish  between  increase  of  partitioning  (reason  type  "E")  and  reduction  of  partitioning

(reason type "R").

Configuration AIP 8.1 or AIP 8.2 in list mode

In the standard configuration file ctaipbut.ini, the configuration has been prepared as follows.

Standard configuration

...
[MNR-ALL-Page2]
;1=M_TLG_NEST,L,Kavität ändern,Objects.png
1=M_TLG,L,Teiligkeit ändern,Objects.png
...

After change of the configuration

...
[MNR-ALL-Page2]
1=M_TLG_NEST,L,Kavität ändern,Objects.png
;1=M_TLG,L,Teiligkeit ändern,Objects.png
...

Configuration AIP 8.2 in tile mode

Please  note  the  specifications  made  for  any  customer-specific  configuration  on  the  AIP.  The

configuration  options  are  presented  in  the  training  EAT-AIP  Extended  Application  Training

MES-Terminal.

1.  Close the shop floor software, if started.

2.  Call the Windows Explorer (e.g. using the shortcut <Windows> + e).

3.  Change to the AIP subdirectory gui.

4.  Create a backup of the file l_anr.xml.

5.  Start an editor (e.g. notepad) and open the file l_anr.xml.

6.  Search for the line, that includes M_TLG :

<OnClick Identifier="M_TLG" Parameterprozessor="TFocusedDataRows">Notify</OnClick>

BDE-NBT_82.docx

Version: 1.2.23049

Page 6 of 11

Cavity-Related Change of Partitioning

7.  Change the identifier from M_TLG to M_TLG_NEST:

<OnClick Identifier="M_TLG_NEST" Parameterprozessor="TFocusedDataRows">Notify</OnClick>

8.  Save the file l_anr.xml.

9.  Start the shop floor software.

BDE-NBT_82.docx

Version: 1.2.23049

Page 7 of 11

Cavity-Related Change of Partitioning

3  Reason Texts

Summary

Doku-Eigenschaft „Version“ hinzugefügt

Menu

Master data  Workplaces / Machines  Reason texts

Transaction code

reat

Function authorization  mdreat

Usage

Use this function to create or to change the reason texts available in the system.

Integration

The basic texts saved to the system will be shown upon the definition of the Reasons as reference.

Field descriptions

Reason texts

Unique number to identify the text

Designation

Designation of the reason text

BDE-NBT_82.docx

Version: 1.2.23049

Page 8 of 11

Cavity-Related Change of Partitioning

4  Reasons

Summary

Menu

Master data  Workplaces / Machines  Reasons

Transaction code

reas

Function authorization  mdreas

Usage

Use this configuration to create or to change the reasons available in the system. Reasons may either be

created for the entire system or referred to a workplace

Integration

The  reasons  that  are  saved  to  the  system  will  be  available  for  collection  on  the  terminal  as  well  as  in

different applications. They are used to classify quantities of materials or modifications.

In order for the settings or the changes made to be able to be interpreted by the terminal shop

floor program, the terminal, which the workplace/machine is assigned to, has to be restarted. All

terminals should be restarted, provided that new reasons have been created or reasons affecting

the entire system have been changed.

Requirements

You have defined reason texts in the system.

Selection criteria

The following selection criteria are available in the application:

Type

Reason type, e.g. scrap

Workplace

Workplace selection.

Reasons that are configured for the "workplace" SYSTEM, will always be displayed even if

a workplace will explicitly be restricted.

Reason

Unique reason number

BDE-NBT_82.docx

Version: 1.2.23049

Page 9 of 11

Cavity-Related Change of Partitioning

Designation

Designation of the reason. Wildcards can be used.

Superior reason

Selection of a superior reason. All reasons will be selected that have the selected reason as (direct)

superior reason.

Field descriptions

Workplace

Assignment of a reason text to a workplace. If "SYSTEM" is entered, this will apply as system-wide

assignment.

System-wide  reasons  will  always  apply  in  addition  to  the  workplace-specific  reasons  and

will therefore also be displayed in the terminal's selection list.

Type

Classification and/or grouping of reasons

Possible values:

A

N

P

G

L

R

E

Scrap reason

Rework reason

Open quantity reason (before: problematic quantity)

Yield reason: will be interpreted as deviation reason

Reasons for batch logs (relevant in connection with MPL)

Reduce (partitioning) reason (relevant in connection with WRM)

Increase (partitioning) reason (relevant in connection with WRM)

Reason

Identification number of the reason.

As  system-wide  reasons  always  apply  in  addition  to  reasons  relating  to  workplaces,  their

numbers  have  to  be  unique,  i.e.  a  scrap  reason  with  the  number  99  for  the  SYSTEM

workplace  must  not  be  defined  at  the  same  time  as  workplace-related  scrap  reason

assigned to the number 99.

Reason text no.

Identification number of the reason text

Designation

Related reason text from the reason text configuration.

BDE-NBT_82.docx

Version: 1.2.23049

Page 10 of 11

Ext. reference

For  each  assignment  exists  an  alphanumeric    representation  that  can  be  uploaded  back  to  the

Cavity-Related Change of Partitioning

interface, for example

Scrap material

Is used in connection with HYDRA-MPL

Superior reason

The reference to a superior reason is reserved for further extensions/modifications; at present it has

no function and should consequently not be completed.

“Copy“ detail application

The "copy" button can be used to copy reasons defined in relation to a workplace from one workstation to

the next. Reasons of the "workplace" SYSTEM cannot be copied.

The below-mentioned options are supported while copying:

  Copy currently selected reason

This  option  can  be  used  to  copy  the  currently  selected  reason.  For  this  purpose,  enter  the  below

pieces of information in the fields below "To":

  Workplace: target workplace for which the reason is to be copied

  Type:  Choose  the  reason  type  under  which  the  reason  is  to  be  created  for  the  target

workplace. The field is assigned by default to the type of the currently selected reason.

  Reason:  Enter  the  reason  number  under  which  the  reason  is  to  be  created  for  the  target

workplace. The field is assigned by default to the type of the currently selected reason.

  Copy all reasons

This option allows copying of all reasons defined for a workplace to another workplace. However, a

prerequisite for this is that reasons have not yet been configured for the target workplace. To do so,

enter the target workplace for which the reasons are to be copied in the "workplace" field. Please note

that all workplace reasons are always copied, irrespective of the type of the reason.

  Copy missing reasons

In contrast to the previous option, this function allows for reasons to be copied to another workplaces,

even if reasons are already assigned to this workplace. To do so, enter the target workplace for which

the  reasons  are  to  be  copied  in  the  "workplace"  field.  Please  note  that  all  workplace  reasons  will

always be copied, irrespective of the type of the reason.

BDE-NBT_82.docx

Version: 1.2.23049

Page 11 of 11

