Data Collection in HYDRA-BDE

1  Data Collection in HYDRA-BDE

1.1

1.1  Summary

In HYDRA data is generally recorded by collecting and processing dialogs. Processing of a dialog results

in events that are the basis for updating (calculation of statuses) and posting (generation of log records).

Core functions of data acquisition are the functions to resolve dialogs into events as well as checking and

processing functions that lead to the generation of events within the system.

Dialogs

Dialogs represent the system's interface with the shop floor.

Events  are  generated  by  resolving  the  dialog.  Resolving  of  the  dialog  into  individual  events  is

performed  based  on  dialog  data,  the  processing  logic  of  the  dialog  (incl.  configurations)  and  the

context of the dialog (posting status).

Some of the HYDRA-BDE input dialogs are:

Dialog

A_AN

Meaning

Log operation on

A_P_AN

Log operation and person on (together)

A_TR

A_UN

A_AB

P_AN

P_AB

P_AAB

SA_AN

SA_TR

SA_AB
SA_ABME

Confirm/upload OP partially

Interrupt operation

Log operation off

Log person on

Log person off

Log all persons off (1... n P_AB)

Log merged operation on

Partial upload of merged operation

Log merged operation off

Events

Events result from resolving dialogs and are thus the result of  data input. Which events get to the

system at what times, as a result, represents an important point of controlling the software.

MBL_OrderBookingOverview.docx

Version: 1.0.11892

Page 1 of 2

Data Collection in HYDRA-BDE

Further, partly optional, data acquisition functions are:

 logging of the dialog and the resulting event,

 provision of the posting result,

 provision  of  current

information

in

the

form  of

lists

(e.g.  machine

lists,  order

lists),

 escalations.

MBL_OrderBookingOverview.docx

Version: 1.0.11892

Page 2 of 2

