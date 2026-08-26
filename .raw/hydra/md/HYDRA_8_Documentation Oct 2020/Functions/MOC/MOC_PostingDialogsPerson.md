Personal Posting Functions

1  Personal Posting Functions

Usage

Personal posting functions enable persons to be logged on or off workplaces/machines.

Integration

The functions are integrated in the following applications:

  Order overview

  Workplace overview

  Personnel overview (log off person only)

Prerequisite

In order to post persons, these persons and the respective workplaces must exist in the system. Logging

on a person at a workplace is only possible if a minimum of one operation is logged on to this workplace.

The functions described here may only be used at workplaces configured as so-called individual

workplaces  in  the  system.  For  workplaces  configured  as  group  workplaces,  the  order-related

posting functions Log operation on / Interrupt operation / Log operation off are to be used.

Log person on

Function authorization

pn.logon

Posting dialog

P_AN

This function can be used to log persons on to a workplace / operation. The following fields are contained:

Workplace

Workplace at which the person is to be logged on.  By default, this field contains the workplace  of

the currently selected operation.

Badge

Badge number of the person to be logged on.

After confirming the posting dialog, the person is logged on to the relevant machine in the system.

MOC_PostingDialogsPerson.docx

Version: 1.1.18468

Page 1 of 2

Personal Posting Functions

Log person off

Function authorization

pn.logoff

Posting dialog

P_AB

This function can be used to log persons off a workplace when they are logged on to this workplace. The

following fields are contained:

Workplace

Workplace at which the person is to be logged off.  By default, this field contains the workplace of

the currently selected operation.

Badge

Badge number of the person to be logged off.

Yield

Yield to be confirmed for the person.

Scrap

Scrap to be confirmed for the person.

Reason

If a scrap quantity was indicated, an appropriate scrap reason is to be indicated here.

After confirming the posting dialog, the person is logged off the workplace in the system.

MOC_PostingDialogsPerson.docx

Version: 1.1.18468

Page 2 of 2

