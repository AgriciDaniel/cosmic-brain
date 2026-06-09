Beispiel: Verwendung MES-interner Aufträge

1  Example: Using MES-Internal Orders

Usage

HYDRA overhead cost orders are orders that are created in HYDRA. They are not known in SAP. These

orders can be used then, for example, if a special service has been rendered by one cost center and will

be invoiced to another.

The  HKMCO-ILV  interface  allows  to  map  these  processes  and  using  the  confirmation,  to  charge  the

rendered service directly to the receiving cost center. These are two quick steps to realize this.

Order number = receiving cost center

In this approach the receiving cost center is part of the order number. The confirmation configuration will

define in this case which interval of the order number represents the cost center number.

The activity type is stored to the operation number. Here too, the confirmation configuration can be used

to define which interval of the operation number will represent the activity type.

The  sending  (performing)  cost  center  can  either  be  taken  from  the  workplace  or  the  personnel.  To  this

end, the these data must be maintained in HYDRA.

Based on these conventions, this will lead to the following order structure:

SAP_COILV_Imp_Examples.docx

Version: 1.0.1362

Page 1 of 4

Order number

Cost center

Beispiel: Verwendung MES-interner Aufträge

Operation number

Operation number

Operation number

Operation number

Activity type

Activity type

Activity type

Activity type

In the realization, special attention must be paid to the number ranges of the other order types

known in HYDRA and to the lengths of the order numbers configured in HYDRA.

Order number = sending/ receiving cost center

In another form of mapping the orders can be stored to both - the sending and receiving cost center in the

HYDRA  order  number.  Here  too,  the  configuration  of  the  confirmations  will  define  which  interval  of  the

order number will represent which cost center.

As  in  the  previous  example,  the  activity  type  will  be  stored  to  the  operation  number.  Based  on  these

conventions, this will lead to the following order structure:

SAP_COILV_Imp_Examples.docx

Version: 1.0.1362

Page 2 of 4

Order number

Rec . CC/ Send. CC

Beispiel: Verwendung MES-interner Aufträge

Operation number

Operation number

Operation number

Operation number

Activity type

Activity type

Activity type

Activity type

In the realization, special attention must be paid to the number ranges of the other order types

known in HYDRA and to the lengths of the order numbers configured in HYDRA.

SAP_COILV_Imp_Examples.docx

Version: 1.0.1362

Page 3 of 4

Beispiel: Verwendung MES-interner Aufträge

SAP_COILV_Imp_Examples.docx

Version: 1.0.1362

Page 4 of 4

