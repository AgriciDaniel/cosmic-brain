Reasons

1  Reasons

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

MOC_Reasons.docx

Version: 1.0.18468

Page 1 of 3

Designation

Designation of the reason. Wildcards can be used.

Superior reason

Selection of a superior reason. All reasons will be selected that have the selected reason as (direct)

Reasons

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

MOC_Reasons.docx

Version: 1.0.18468

Page 2 of 3

Ext. reference

For  each  assignment  exists  an  alphanumeric    representation  that  can  be  uploaded  back  to  the

Reasons

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

MOC_Reasons.docx

Version: 1.0.18468

Page 3 of 3

