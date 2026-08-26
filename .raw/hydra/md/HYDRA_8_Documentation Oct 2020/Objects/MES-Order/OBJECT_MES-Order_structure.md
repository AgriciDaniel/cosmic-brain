Data Structure of Orders

1  Data Structure of Orders

This  document  describes  each  of  the  fields  for  an  order  header.  The  actual  sequence  of  the  editing

dialogs and reports/overviews may deviate from the one illustrated here.

In  order  to  simplify  matters,  the  term  order  will  generally  be  used,  regardless  of  whether  an  order  or  a

work  plan  is  being  discussed.  Only  in  examples  in  which  it  would  make  sense  for  the  overall

understanding to differentiate between the two will we use the term work plan.

General tab

Order / work plan

The order number or rather the work plan number is an upper-level number, under which each of

the operations is compiled.

Order type

Order  types  are  issued  to  structure  the  orders  in  accordance  with  their  use.  Each  order  type

includes various control information that is decisive when managing orders.

The glossary describes the order types that are available by default in the system. You can define

additional order types when customizing the system.

Article/Item

Material number/ item number/ article numbers of the (final) article to be produced with this order. If

no  article  is  entered  for  the  operation,  the  system  transfers  the  article  included  in  this  field  to  the

operations.

Article name

Name of the article. Any changes to the article name are transferred to all operations of the order

(redundant information). You cannot edit the article name in relation to operations.

Drawing issue number

Drawing issue number of the article, also referred to as index (available as of BDE 8.2).

Customer name

Customer name

Sales order

Sales order number

Sales order item  In addition to the sales order number, you can also enter the line item number of the

sales order that this order refers to.

Priority

You can use the "priority" as a control tool for the order. The priority is a single digit, numeric value.

The value increases in ascending order ("0" = lowest priority, "9" = highest priority).

OBJECT_MES-Order_structure.docx

Version: 1.3.18468

Page 1 of 6

Data Structure of Orders

This  value  specifies  the  color  for  the  operation  bar  in  the  graphic  planning  board  (Shop  Floor

Scheduling). The colored bar graphically indicates the priority of the operation. You can assign the

colors to the priorities in the graphic planning board settings of the Shop Floor Scheduling product

group.

During the customization process, you can determine based on the order type

- whether the priority of the order header is transferred unchanged to each of the operations

- whether priority management should be enabled.

Order index

The order index can be seen as an alternative to the priority. You can integrate the order index, for

example, in sorting the graphic detailed planning (if configured accordingly).

The order index is numerical with a valid value range (-999.9 to +999.9).

Target quantity

Quantity  specification  for  the  production  order  in  base  quantity  unit.  The  indicated  target  quantity

may include a target scrap quantity that might have been entered.

Target scrap

Planned scrap quantity for the production order in base quantity unit. The indicated scrap quantity

can be considered as part of the transferred target quantity.

Unit

Quantity unit of the order for the (final) article to be produced. The unit allows you to compare, for

example, scrap from different operations. That is why, the unit is included as a base quantity unit in

each operation (redundant information).

Material type

Material type of the (final)  article to be produced. If the field  does not include a material type, the

MES inserts the value "SYSTEM" here.

Batch number

The batch number reserved for the order; is generally provided by the ERP system.

Dates tab

Basic start date

The basic start date of the order. In general, the ERP system specifies this date.

Basic end date

The basic end date of the order. In general, the ERP system specifies this date. This date is based

on  the  required  date/  delivery  date  set  in  the  ERP  system  and,  if  necessary,  also  includes  buffer

times.

OBJECT_MES-Order_structure.docx

Version: 1.3.18468

Page 2 of 6

Data Structure of Orders

Scheduled start time

Scheduled start date; result of the lead-time scheduling as compared to infinite capacities.

If the scheduling is run outside of the system, the scheduled dates in the order header should be

applied. If the scheduling is run in MES, these fields are overwritten.

Scheduled end time

Scheduled end date; result of the lead-time scheduling as compared to infinite capacities.

If the scheduling is run outside of MES, the scheduled dates in the order header should be applied.

If the scheduling is run in MES, these fields are overwritten.

Scheduling type

The scheduling type describes whether the order is scheduled forward (V) or backward (R) during

lead-time scheduling in MES. If scheduled forward, the order is scheduled based on the basic start

date  specified  in  the  ERP  system.  If  scheduled  backward,  the  order  is  scheduled  based  on  the

specified basic end date.

If no scheduling type is set in the order, the scheduling type defined in Basic Settings is used.

Reduction strategy

If it turns out during scheduling that the lead time for a given order is longer than the allotted time

available, then MES will attempt to take reduction measures to shorten the lead time accordingly.

Reducible times are the waiting times and the transport times.

The document hls-bk.doc describes in the chapter Reduction Strategies how to configure reduction

strategies. The configuration is performed as part of the customization process.

Assignment tab

Order group

If the field order group includes a value and the Priority control is enabled, the system checks the

following when you attempt to create a new order:

- how many orders do exist for this order group and the specified priority in the system

- does this new order exceed the limit defined in the MOC application Order groups. If this new

order exceeds the specified limit, the system will reject the order. If the priority control function is

enabled, you must:

- consider the order group as a mandatory field in the order and

- define a preset value range in the MOC application order groups.

Note for SAP users

The term order group corresponds to the SAP production scheduler. To ensure a consistent data

exchange  between  SAP  and  HYDRA,  you  should  synchronize  the  possible  SAP  production

schedulers with the MES order groups.

OBJECT_MES-Order_structure.docx

Version: 1.3.18468

Page 3 of 6

MRP controller

The  MRP  controller  for  the  order.  You  can  transfer  the  MRP  controller  from  SAP  to  the  MES  for

informational  purposes.  You  can  display  the  MRP  controller  in  the  MES.  But  the  MES  does  not

Data Structure of Orders

provide a predefined value range.

Project number

Project order number

Planned order

Planned order number, e.g. in serial production.

Cost object

Cost object number

Work plan

Work plan number of the work plan that served as the template for generating the production order.

Work plan version

Version number of the work plan that served as the template for generating the production order.

BOM version

Version of the bill of material assigned to the production order.

Production version

Production  version  on  which  the  order  is  based.  This  field  is  currently  only  completed  if  planned

orders are transferred via the HKMPP-REM interface.

Closed loop

ID of the closed loop / supply relationship for which a Kanban order has been generated.

Inspection order

Inspection order/ inspection batch number for the order

Sample type

Type of sample for the order

Calculation tab

The  calculation  index  tab  includes  additional  data  fields  where  calculation-related  values  or  information

can be stored. These entries are for information purposes only.

Machine costs

Calculated value for the machine costs that are incurred in the production of this order.

Labor costs

Calculated value for the labor costs that are incurred in the production of this order.

OBJECT_MES-Order_structure.docx

Version: 1.3.18468

Page 4 of 6

Data Structure of Orders

Material costs

Calculated value for the material costs that are incurred in the production of this order.

Other costs

Calculated value for other costs that are incurred in the production of this order.

Material value

Calculated value of the produced final article for each base quantity unit.

Scrap value

Calculated scrap value for each base quantity unit.

User fields tab

User fields allow you to store further customer-specific information to the MES in addition to the fields that

are available by default. The order information shows the order-related user fields. The order information

dialog  provides  the  user  fields  index  tab  for  the  order  header.  This  tab  shows  the  user  field  key,  the

defined user fields including the names and units of measure. The user fields tab includes eight sub-index

tabs,  which  each  have  eight  additional  user  fields.  The  so-called  user  field  key  determines  which  user

fields are involved and which meaning they have.

User field key

Every user field key describes a combination of user fields. The management of the user field key

(and therefore the purpose of the fields) varies from one object to the next.

User fields

The  following  user  fields  are  available  for  the  order  header  (object  type  AUNR)  after  customizing

the system:

Field ID /
index
1 - 6
7 - 22

23 -28
29 - 44
45 - 50
51 - 64
65 - 66

Field data type

Date
Numeric,
time, duration
Decimal value
Text field, length 1
Text field, length 10
Text field, length 20
Text field, length 40

Number of
fields
6
16

6
16
6
14
2

User field keys are defined in coordination with the customer during the customization process.

Administration tab

The administration index tab includes technical  information on the data record. The dialogs "Insert" and

"Copy" do not provide this index tab.

OBJECT_MES-Order_structure.docx

Version: 1.3.18468

Page 5 of 6

Data Structure of Orders

Created by

User who created the order.

Created on

Time and date when the order was created.

Modified by

User who most recently changed the order header.

Modified on

Time and date when this modification was made.

Transferred by

Here, you can enter the source from where the order was transferred.

Transferred on /Transfer time

If the ERP system transfers the order (PPS=J), the system automatically sets the transfer time and

date to the time and date when the order was stored in MES.

Modified HYDRA

Specifies that the order was modified in MES. This identifier is automatically set to "J", if the order

was changed in MES.

Modified PPS

Specifies that the production order was changed in the ERP system. This identifier is automatically

set  to  "J",  if  the  production  order  was  changed  in  the  ERP  system  (PPS=J).  The  identifier  is  not

reset.

Deletion flag

Used for internal processing purposes. Cannot be modified.

Responsibility area

If a responsibility area is entered here, the user must have been authorized to view and edit orders

and/or work plan orders.

OBJECT_MES-Order_structure.docx

Version: 1.3.18468

Page 6 of 6

