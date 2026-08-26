Customers

1  Customers

Summary

Menu

Master data  Quality management  Customers

Transaction code

cto

Function authorization

cto

The customer catalog has been designed to edit/keep customers. Provided that there is an interface to a

higher-level system (e.g. ERP system), customers can be created automatically via interface. As soon as

a  new  customer  is  created  or  changed  in  the  ERP  system,  for  example,  the  customer  data  record  is

automatically created or changed in the customer catalog including the defined information.

Utilization

The  customer  number  uniquely  identifies  customers  in  all  QM  applications  that  refer  to  the  customer

catalog. The customer catalog is used as basis in particular for inspection requirements of production and

and the goods issue as well as for the complaint management.

The  “customer  number”  field  is  the  key  field,  i.e.  if  a  new  customer  is  saved  it  is  verified  whether  a

customer with this key information exists already.

By  distinguishing  between  active  and  inactive  customers,  it  may  be  defined  whether  or  not  they  are

available  in  certain  selection  lists.  Thus,  no  complaint  can  be  created  for  an  inactive  customer,  for

example. However, inactive customers may be evaluated at any time. Moreover, inactive  customers can

be reactivated at any time.

Extensive  address  and  contact  data  can  be  defined  in  addition  to  the  customer  number  and  the

designation.

If a customer is designated as “party in charge” they will be included in the selection list for the parties in

charge. Such selection lists are integrated in different detail applications. The list of the parties in charge

is accessed mainly in the complaint management function and when measures are generated.

Integration

Customer  data  is  a  global  catalog  that  is  used  in  many  QM  applications.  The  below  list  shows  the

applications referring to the customer catalog.

  External people

  Departments

MOC_Customer.docx

Version: 1.1.1362

Page 1 of 3

Customers

  Production inspection planning

  Production inspection requirements

  Complaint management

  Failure mode analysis

Prerequisite

There are no special requirements.

Selection criteria

The address fields 1, 2, and 3 are available in addition to the customer number and customer name.

The active or inactive customers can be restricted using the filter field “inactive”.

Field Descriptions

The available fields are self-explanatory and are not described separately, except for the address fields.

The content of the individual address fields is not specified by default and, as a result, may be defined by

the user. Normally, address field 1 should include further details on the company, e.g. “site X”. As there is

no field defined for the street, address field 2 or 3 (to be preferred) is to be used for the street including

street number.

MOC_Customer.docx

Version: 1.1.1362

Page 2 of 3

Editing functions

The below dialog opens to edit a data record.

Customers

Toolbar

There are no other special function buttons in addition to the standard functions.

MOC_Customer.docx

Version: 1.1.1362

Page 3 of 3

