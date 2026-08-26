Work Plan - Edit Orders
1 Work Plan - Edit Orders
Overview
HYDRA menu Order management  Routing management  Work plan - edit orders
FEDRA menu Detailed Scheduling  Order management  Work plan - edit orders
Transaction code edwor
Function authorization edwor
Available user fields
Where Object type/user field key Source (type)
Table AUNR/SYSTEM Work plan - order (MF-D)
How to configure user fields? Which user field types are available?
The "Work plan - edit orders" application provides the user with a comfortable option to create or change
work plans and to generate orders from work plans. A work plan is a kind of "empty envelope" for orders
and is used to generate real orders.
Selection criteria
The application provides the following selection criteria:
Work plan
You can select a specific work plan if you directly enter the work plan number.
Order type
Use the combo boxes to select work plans of specific order types. You can check several options.
Article
Use the article field to search for work plans for a specific article. You can also use wildcards.
Sales order, project number, planned order
Using these fields, you can search by inventory data of the order header. You can also use
wildcards.
Customer name
If work plans have been created for separate customers, you can search by the "customer
designation". You can also use wildcards.
Field descriptions
Order header fields are described here
MOC_WPLEditOrders.docx Last changed on: Page 1 of 4

Work Plan - Edit Orders
Notes
 Only selected data is available in the table:
o Work plan
o Order type
o Article
o Article designation
o Target quantity (B)
o Target scrap (B)
o Unit (B)
o Customer name
o Sales order
o Planned order
o Project number
 The below-mentioned values cannot be edited in the work plan order:
o Basic start date
o Basic end date
o Scheduled start time
o Scheduled end time
Editing functions
Please use the available buttons to create or edit work plan orders.
If a responsibility area is stored for the order, the editing of data is only possible if the options to display,
insert, modify and delete are enabled in the configuration of the responsibility areas or profiles.
MOC_WPLEditOrders.docx Last changed on: Page 2 of 4

|     |     |     | Work Plan - Edit Orders  |     |
| --- | --- | --- | ------------------------ | --- |

Toolbar
 Generate order
| Function authorization: or.generate  |     |     |     |     |
| ------------------------------------ | --- | --- | --- | --- |
You can generate an order from the currently selected work plan by calling this function. For further
information on this, please refer to the section Generate order.
 Edit long texts of orders
| Function authorization: edwortx  |     |     |     |     |
| -------------------------------- | --- | --- | --- | --- |
Calls the application Work plan - edit long texts of orders.
 Edit order sequences
| Function authorization: edwseq  |     |     |     |     |
| ------------------------------- | --- | --- | --- | --- |
Calls the application Work plan - edit order sequences.
 Edit operations
| Function authorization: edwop  |     |     |     |     |
| ------------------------------ | --- | --- | --- | --- |
Calls the application Work plan - Edit operations.
Generate order
Please proceed as follows to generate an order from the work plan:
  Select the work plan, from which you want to generate an order, from the table.
  Open the function using the button  . The "generate order" dialog opens.
  In the "order" field, enter the order number for the order that is generated. The field can be left
empty if numbers are assigned automatically for the order type (customization).
  In the dialog, the input fields are populated with the work plan data. If required, change or add
field values.
|   Confirm the dialog by clicking  |     | .   |     |     |
| ---------------------------------- | --- | --- | --- | --- |
An order is now generated from the work plan. By default, the application "Edit orders" opens with the
new order that you have just generated.

| MOC_WPLEditOrders.docx  |     | Last changed on:   |     | Page 3 of 4  |
| ----------------------- | --- | ------------------ | --- | ------------ |

|     |     |     | Work Plan - Edit Orders  |     |
| --- | --- | --- | ------------------------ | --- |

Note: The Edit orders application is opened in a separate window with each order that is generated. It is
therefore recommended to close the application before generating a new order.
If  you  want  to  suppress  that  the  application  Edit  orders  opens,  you  can  configure  this  via  INI
configuration/INI data configuration. When the order is successfully generated, a popup informs that the
"order xxxx has been successfully generated". Confirm by clicking OK.
Menu: System administration  System settings  INI configuration / INI data configuration
| Name:      | BDE                                                   |     |     |     |
| ---------- | ----------------------------------------------------- | --- | --- | --- |
| MOC user:  | 0                                                     |     |     |     |
| Comment:   | Settings for  Shop Floor Data Collection              |     |     |     |
| Section:   | EDWOR                                                 |     |     |     |
| Key:       | GENERATE_ORDER                                        |     |     |     |
| Value:     | SUPPRESS_EDOR                                         |     |     |     |
| Active:    |                                                       |     |     |     |
| Comment:   | Suppress automatic call of application "edit orders"  |     |     |     |
Notes

  The order cannot be generated if a responsibility area is specified for which the user is not
authorized.
  The article number is transferred to the operations of the order.
  The order quantity and the unit are transferred to the order header as (basic) target quantity or
target unit and to all operations as basic target quantity or target unit.
  The entered quantity is transferred 1:1 as primary quantity, if the primary quantity unit (primary
unit of input) of the operations is identical to the unit that is specified as quantity unit above. If
conversion factors are defined for the operation of the order or work plan to be copied, they are
used to calculate the primary quantity. In case, no conversion factors are defined and the base
quantity unit and primary quantity unit are different, the system tries to convert the base quantity
into the primary quantity unit using an internal conversion table (system customization). This
procedure generally also applies for the secondary quantity and the tertiary quantity.

| MOC_WPLEditOrders.docx  |     | Last changed on:   |     | Page 4 of 4  |
| ----------------------- | --- | ------------------ | --- | ------------ |