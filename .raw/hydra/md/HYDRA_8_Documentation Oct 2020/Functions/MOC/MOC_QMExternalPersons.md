External Persons

1  External Persons

Overview

Menu

Master data  Quality management  External persons

Transaction code

extper

Function authorization

extper

The  catalog  of  “external  persons”  has  been  designed  to  define  persons  that  are  not  edited  in  the  HR

master. Provided that there is an interface to a higher-level system (e.g. ERP system), external persons

can be created or changed automatically by interface.

Purpose

The personal number uniquely identifies external persons in all QM applications referring to this catalog.

The complaint management, in particular, uses the catalog of external persons.

The contact partners of customers, suppliers and manufacturers are defined in this catalog, for example.

As  the  integrated  HR  master  is  not  always  available,  it  is  also  possible  to  include  “internal”  staff  in  this

catalog. The same also applies for a licensed HR master. However, it is important that this catalog is not

connected with the HR master and does not replace it. The catalog of external persons is currently only

used in QM applications.

The “personal no.” field is the key field, i.e. when a new person is saved it is checked whether or not a

person already exists with this key information.

The differentiation between active and inactive persons determines whether or not these persons are still

available  in  specific  selection  lists.  For  example,  an  inactive  person  cannot  be  assigned  as  being

responsible for a measure. But inactive persons can be reactivated at any time.

In addition to the personal number and designation, substantial address and contact data as well as the

assignment to a company and department may be defined.

If  a  person  is  designated  as  being  “responsible”  this  person  is  also  included  in  the  selection  list  for  the

“persons in charge”. Such selection lists are integrated in different detail applications. The list of parties

responsible is mainly used in complaint management and when measures are created.

Integration

“External persons” is a global catalog used in many QM applications. The list below shows some of the

applications referring to this catalog.

MOC_QMExternalPersons.docx

Version: 1.0.1362

Page 1 of 3

External Persons

  Customers

  Manufacturers

  Suppliers

  Departments

  Measures

  Complaint management

Prerequisite

There are no special requirements.

Selection criteria

The  last  name,  first  name as  well  as  the  initial  may  be  used  as  filter  criteria  in  addition  to  the  personal

number.

Using the filter field “inactive”, active or inactive persons can be selected.

Field descriptions

The fields are self-explanatory and not described in more detail for this reason.

MOC_QMExternalPersons.docx

Version: 1.0.1362

Page 2 of 3

Editing functions

This dialog opens for editing of a data record.

External Persons

Toolbar

There are no other special function buttons besides the standard functions.

MOC_QMExternalPersons.docx

Version: 1.0.1362

Page 3 of 3

