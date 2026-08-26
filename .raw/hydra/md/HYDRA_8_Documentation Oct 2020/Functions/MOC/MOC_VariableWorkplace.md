Variable Workplaces

1  Variable Workplaces

Summary

Menu

Master data  Quality management  Variable workplaces

Transaction code

vawo

Function authorization

vawo

Although  inspection  planning  is  performed  in  a  higher-level  system  (e.g.  SAP-QM),  this  application

addresses  the  group  of  inspection  planners,  as  this  application  determines  which  inspections  (QM

operations/processes) are performed at which workplaces.

This  function  does  not  belong  to  inspection  planning  of  the  higher-level  system  but  complements  it  on

sub-system level by defining the actual inspection stations/workstations in detail.

Utilization

If linked QM operations/processes are used in SAP, for example, it cannot be planned in SAP to  which

workplace/machine the QM operations are to be logged on. For this reason, it has to be defined for the

workstation transferred by QM-IDI (or any other ERP interface) to which productive workplace (reference

workplace) it pertains and onto which QM workplace (target workplace) it is to be logged on.

MOC_VariableWorkplace.docx

Version: 1.0.1362

Page 1 of 4

Variable Workplaces

This  controls  where  the  QM  operations  0021  and  0025  are  to  be  logged  on  along  with  logging  the

productive  operation  0020  on.  The  QM  operation  0021  is  logged  on,  for  example,  on  the  terminal  onto

which the productive operation is logged on as well. The QM operation 0025, however, is logged on to the

"laboratory" workplace of another shop floor terminal.

If  linked  QM  operations/processes  are  used  an  assignment  has  to  be  established  while  the  system  is

customized.  Ideally,  a  "concept"  defining  the  connection  rules  should  defined  in  advance.  It  is

indispensable to customize the system according to the user's requirements to be able to implement the

connection rules that are to be defined.

It is not sufficient to only use this application.

The below example describes a possible connection rule.

  The operation number links the productive operations and QM operations.

  An operation template is created for the combination of workplace and order type including

the assigned processing code. In this context, it does not play a role which order is assigned.

SYSCAQ = is to be linked

CAQPUR = separate QM operation

  Creating the QM operation in HYDRA triggers the search for an OP template taking into

account the workplace and the order type (derives from the QM-IDI interface). The

processing code, which in turn determines whether or not the QM operation is to be linked, is

determined in the template that is found.

  A productive, preceding operation is searched in the corresponding production order for an

QM operation that is transferred via the interface. The operation number specifies the search

order. The productive operation with the next least operation number is searched. An

operation that is found in this way is entered as master operation for the QM operation.

  The application of variable workplaces defines which  QM operations are to be logged on to

which workplaces/machines.

If workplaces are defined as mere QM workstations in HYDRA they have to be assigned the type "CAQ

inspection station" as individual workplace.

Integration

This  application  is  only  required  if  linked  QM  operations/processes  are  in  use.  For  this  reason,  the

application is restricted to being used in connection with HYDRA used as QM subsystem, e.g. with SAP-

QM.

MOC_VariableWorkplace.docx

Version: 1.0.1362

Page 2 of 4

In exceptional cases, which have to be checked in each individual case, this application may also be used

with HYDRA inspection planning in the HYDRA inspection planning/inspection requirements application,

Variable Workplaces

provided that linked QM operations are in use.

Prerequisite

Linked QM operations/processes need to be used.

Selection criteria

The application provides the following selection criteria:

Reference workplace

Direct  input  (match  code)  or  selection  list  of  the  machine/workplace  catalog  including  acceptance

function.

Placeholder

Direct  input  (match  code)  or  selection  list  of  the  machine/workplace  catalog  including  acceptance

function.

Target workplace

Direct  input  (match  code)  or  selection  list  of  the  machine/workplace  catalog  including  acceptance

function.

Field descriptions

Reference workplace

Direct input or selection list of the machine/workplace catalog including acceptance function.

Placeholder

Direct input or selection list of the machine/workplace catalog including acceptance function.

Target workplace

Direct input or selection list of the machine/workplace catalog including acceptance function.

MOC_VariableWorkplace.docx

Version: 1.0.1362

Page 3 of 4

Editing functions

The following dialog opens to edit a data record:

Variable Workplaces

Toolbar

The toolbar does not provide any special functions/features.

MOC_VariableWorkplace.docx

Version: 1.0.1362

Page 4 of 4

