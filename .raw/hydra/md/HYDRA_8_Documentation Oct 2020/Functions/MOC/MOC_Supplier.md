Suppliers

1  Suppliers

Summary

Menu

Master data  Quality management  Suppliers

Transaction code

sup

Function authorization

sup

The supplier catalog has been designed to edit and update the list of suppliers. Provided that there is an

interface  to  a  higher-level  system  (e.g.  ERP  system),  suppliers  may  be  created  automatically  by  the

interface. As soon as a new supplier is created or an existing supplier is changed in the ERP system, the

data record for this supplier is automatically created or changed including the specified information within

the HYDRA-CAQ supplier catalog.

Utilization

The supplier number uniquely identifies suppliers in all QM applications that access the supplier catalog.

The  supplier  catalog  is  used,  in  particular,  for  inspection  requests  of  goods  receipt  and  the  complaint

management.

The "supplier number" field is the key field, i.e. while saving a new supplier, the system checks whether or

not there is already a supplier with this key information.

By  distinguishing  between  active  and  inactive  suppliers,  it  may  be  defined  whether  or  not  the  suppliers

are  available  in  certain  selection  lists.  Consequently,  it  is,  for  example,  impossible  to  create  a  goods

receipt inspection request for an inactive supplier. However, inactive suppliers may be evaluated at any

time. Moreover, inactive suppliers may also be reactivated at any time.

In addition to the supplier number and designation, it is possible to specify comprehensive address and

contact details.

Being identified as “party in charge”, this supplier is included in the selection list for responsible parties.

Such  selection  lists  are  integrated  in  different  detail  applications.  The  list  of  the  parties  responsible  is

mainly used within complaint management and for the creation of measures.

Integration

Supplier  data  is  a  global  catalog  that  is  used  in  many  QM  applications.  Please  find  below  some

applications that refer to the supplier catalog.

  External people

MOC_Supplier.docx

Version: 1.0.1362

Page 1 of 3

Suppliers

  Departments

  Goods receipt inspection planning

  Goods receipt inspection requests

  Complaints management

  Failure mode analysis

Prerequisite

There are no special requirements.

Selection criteria

The address fields 1, 2 and 3 are available in addition to the supplier number and the designation.

The "inactive" filter field allows for the data set to be restricted to active or inactive suppliers.

Field descriptions

The available fields are self-explanatory and are not explained separately, except for the address fields.

The content of the individual address fields is not specified explicitly and, as a result, may be defined by

the user. Normally, the address field 1 should include an addition to the company's name, e.g. "site X". As

no field has explicitly been defined for the street, the address field 2 or 3 (to be preferred) is to be used for

entering the street and street number.

MOC_Supplier.docx

Version: 1.0.1362

Page 2 of 3

Editing functions

The following dialog opens to edit a data record.

Suppliers

Toolbar

There are no other special function buttons in addition to the standard functions.

MOC_Supplier.docx

Version: 1.0.1362

Page 3 of 3

