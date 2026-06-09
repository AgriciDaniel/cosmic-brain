Manual

Enhanced Shop Floor Posting
Functions
BDE-EBF 8.1

Version 1.0.4716

Last changed on: 19.06.2020

Enhanced Shop Floor Posting Functions

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying  and  distribution  of  this  documentation  or  any  part  thereof,  for  any  purpose  or  in  any  form,  is  prohibited  without  prior  written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

BDE-EBF_81.docx

Version: 1.0.18468

Page 2 of 9

Enhanced Shop Floor Posting Functions

Contents

1  Überblick Erweiterte BDE-Buchungsfunktionen ........................................... 4

2  Reasons ....................................................................................................... 6

3  Reason Texts ............................................................................................... 9

BDE-EBF_81.docx

Version: 1.0.18468

Page 3 of 9

Enhanced Shop Floor Posting Functions

1

 Überblick Erweiterte BDE-Buchungsfunktionen

Purpose

The  function  package  for  enhanced  BDE  posting  functions  enhances  the  BDE  with  additional  collection

variants and options.

Implementation considerations

You use the enhanced BDE posting functions if

  You would also like to enter the reasons associated with the scrap quantities recorded in order to be

able to evaluate them and, if necessary, assign a monetary value to them.

  You  would  like  to  have  a  system-supported  recording  of  free  text  information  in  production  that  is

available for later shifts and, if required, for evaluations.

  The  materials  to  be  produced  are  stocked  in  several  different  quantity  units  and  you  would  like  to

manage these quantity units at the operation level, record them during production, and you need the

system to convert the various quantity units accordingly.

  You would like to have additional plausibility checks during posting of operations in order to increase

the quality of the data collected and/or to increase or ensure process reliability.

Integration

The scrap reasons recorded:

  are  used  as  a  basis  in  the  evaluations  performed  by  the  controlling  business  data  /  order  data

feature



can be uploaded to a upper-level ERP system via interfaces along with the entered quantities

The comments entered are available in the monitoring order information of business data function package.

Features

  Order-related data entry and posting functions

o  Entry of scrap reasons

o  Entry  of  OP-related  comments  (free  texts)  added  to  any  particularities  documented  during

the course of the order

  Automatic  conversion  of  the  quantities  entered  into  other  units  and  posting  to  special  quantity

accounts (requires that the conversion factors have been defined for the operation).

  Order-related entry and posting functions:

BDE-EBF_81.docx

Version: 1.0.18468

Page 4 of 9

Enhanced Shop Floor Posting Functions

o  Extensive, configurable plausibility checks for OP postings (e.g. checking whether quantities

are under or over delivered)

o  Entry of reasons for deviation in the event of over or underdelivery

BDE-EBF_81.docx

Version: 1.0.18468

Page 5 of 9

Enhanced Shop Floor Posting Functions

2  Reasons

Summary

Menu

Master data  Workplaces / Machines  Reasons

Transaction code

reas

Function authorization  mdreas

Usage

Use  this  configuration  to  create  or  to  change  the  reasons  available  in  the  system.  Reasons may  either  be

created for the entire system or referred to a workplace

Integration

The reasons that are saved to the system will be available for collection on the terminal as well as in different

applications. They are used to classify quantities of materials or modifications.

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

BDE-EBF_81.docx

Version: 1.0.18468

Page 6 of 9

Enhanced Shop Floor Posting Functions

Designation

Designation of the reason. Wildcards can be used.

Superior reason

Selection of a superior reason. All reasons  will be selected that have the selected reason as (direct)

superior reason.

Field descriptions

Workplace

Assignment  of  a  reason  text  to  a  workplace.  If  "SYSTEM"  is  entered,  this  will  apply  as  system-wide

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

BDE-EBF_81.docx

Version: 1.0.18468

Page 7 of 9

Ext. reference

For  each  assignment  exists  an  alphanumeric    representation  that  can  be  uploaded  back  to  the

Enhanced Shop Floor Posting Functions

interface, for example

Scrap material

Is used in connection with HYDRA-MPL

Superior reason

The reference to a superior reason is reserved for further extensions/modifications; at present it has no

function and should consequently not be completed.

“Copy“ detail application

The "copy" button can be used to copy reasons defined in relation to a workplace from one workstation to the

next. Reasons of the "workplace" SYSTEM cannot be copied.

The below-mentioned options are supported while copying:

  Copy currently selected reason

This option can be used to copy the currently selected reason. For this purpose, enter the below pieces

of information in the fields below "To":

  Workplace: target workplace for which the reason is to be copied

  Type: Choose the reason type under which the reason is to be created for the target workplace.

The field is assigned by default to the type of the currently selected reason.

  Reason:  Enter  the  reason  number  under  which  the  reason  is  to  be  created  for  the  target

workplace. The field is assigned by default to the type of the currently selected reason.

  Copy all reasons

This  option  allows  copying  of  all  reasons  defined  for  a  workplace  to  another  workplace.  However,  a

prerequisite  for  this  is  that  reasons  have  not  yet  been  configured  for  the  target  workplace.  To  do  so,

enter the target workplace for which the reasons are to be copied in the "workplace" field. Please note

that all workplace reasons are always copied, irrespective of the type of the reason.

  Copy missing reasons

In contrast to the previous  option, this function allows for reasons to be copied to another  workplaces,

even if reasons are already assigned to this workplace. To do so, enter the target workplace for which

the reasons are to be copied in the "workplace" field. Please note that all workplace reasons will always

be copied, irrespective of the type of the reason.

BDE-EBF_81.docx

Version: 1.0.18468

Page 8 of 9

3  Reason Texts

Summary

Enhanced Shop Floor Posting Functions

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

BDE-EBF_81.docx

Version: 1.0.18468

Page 9 of 9

