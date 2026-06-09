Automatic generation of orders - processing

1  Automatic generation of orders - processing

Overview



Menu

Production
Maintenance calendar  button "Generate order"

facility  (resource)  management    Current

information  

Function authorization

rmcalgenorder

Menu

Production facility (resource) management  Current information
 Resource overview  button "Generate order“

Function authorization

-

Menu

Production facility (resource) management  Resource analysis
 Resource history  button "Generate order“

Function authorization

reshigenorder

Menu

Production facility (resource) management  Resource analysis
 Machine history  button "Generate order“

Function authorization  wphigenorder

Purpose

You can call the function "Generate order" from different MOC applications. Use this function to generate

an order from a work plan.

Integration

You can use one of the following applications to create an order:

  Maintenance calendar

  Resource overview

  Resource history

  Machine history

  Production variants

MOC_GeneratingOfOrders.docx

Version: 1.5.18468

Page 1 of 4

Automatic generation of orders - processing

For this purpose, the toolbar of these applications provides the button

 "Generate order".

Requirements

You need a license to call the function "generate order".

You also have to configure the following in the MOC:

-  Correct configuration of Number ranges:

o  Object: order number

o  Key: order type

o  Value: 6

o  Type: automatic number assignment

o  Prefix: IH *)

o  Ranging from: 100000 *)

o  Ranging to: 999999 *)

*) Assumption: 8-digit order number length.

-  The work plans used according to the configuration must exist

(By default: work plan IH100000)

Generating orders

Proceed as described below to execute the function "generate order":

  Select a resource / data record.

  Click the function "generate order".

  Enter the data requested in the respective dialog.

Once you have entered and confirmed the data, the system transfers the data entered in the input fields

(including invisible fields) to the service. The order is generated based on the transferred work plan.

Result of order generation

The system generates the order.

If order generation was successful, the application Edit orders opens automatically. The input field Order

includes the new order number and data is requested automatically.

Note:

MOC_GeneratingOfOrders.docx

Version: 1.5.18468

Page 2 of 4

Automatic generation of orders - processing

If the Additional data tab does not include the order number (or the dialog has been customized and the

field is no longer available), you have to configure the automatic number assignment since no target order

number is indicated.

The system issues an error message (e.g. order number is missing) if the order could not be generated.

Configuration

By default, work plan number "IH100000" (the number of zeros matches the order number length defined

in the basic settings) is predefined for all maintenance orders. The work plan number is configured in the

MOC  application  Order  generation.  If  necessary,  you  can  change  this  number  according  to  your

requirements. To do so, you need the corresponding license.

You can change the work plans, if you have purchased the corresponding license.

Default dialogs

Maintenance calendar

Field

Default assignment

Resource type

Resource type

Resource

Resource

OP name/designation

Description of the activity

Basic start date

Current date

Basic end date

(none)

Order

Work plan number
The  system  takes  the  number  of  the  work  plan  that  should  be
used  to  generate  an  order  from  the  configuration  "Order
generation".
You  have  to  select  a  work  plan  if  the  configuration  does  not
include a work plan.

Final article

Resource

Transfer as production
resources and tools

Resource type = MNR
No default assignment
Resource type <> MNR
Checked  by  default  "“.  In  this  case,  the  resource  is  also
created as production resource and tool.

Resource overview

Like the maintenance calendar, except for the OP name. Here, the OP name is "maintenance order".

Resource history, machine history

MOC_GeneratingOfOrders.docx

Version: 1.5.18468

Page 3 of 4

Like the maintenance calendar, except for the OP name. Here, the OP name is "maintenance order".

Automatic generation of orders - processing

You  can  use  the  MES  Development  Suite  to  configure  the  default  assignments  in  the  MOC

application  dialogs  where  you  started  the  Generate  order  function.  You  need  a  license  and

training in order to use the MES Development Suite.

MOC_GeneratingOfOrders.docx

Version: 1.5.18468

Page 4 of 4

