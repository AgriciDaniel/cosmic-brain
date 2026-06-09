Edit Long Texts of Orders

1  Edit Long Texts of Orders

Overview

HYDRA menu

FEDRA menu

Order management  Order management  Edit long texts of orders

Detailed Scheduling  Order management  Edit long texts of orders

Transaction code

edortx

Function authorization

edortx

Purpose

By  applying  the  function  “edit  long  texts  of  orders”,  order-related  additional  texts  can  be  displayed  or

edited. You use this function if:

  You  would  like  long  texts  belonging  to  the  order  header  to  be  visible  and  available  in  the

administrative client while processing the order.

  You are using the MES Development Suite Label Designer component and the data you entered

is to be printed on labels.

Keep in mind that for each order you use a maximum of one long text.

Integration

Long  texts  can  also  be  transferred  via  the  info  interface  (record  type  "AI").  Additional  information  about

the interface can be found in the respective interface document.

Only long texts relating to the operation are displayed at the terminal.

Requirements

The corresponding order must already be defined.

Long texts included in the online data area may generally be edited, i.e. irrespective of the order status

(added, modified or deleted).

MOC_EditOrderLongTexts.docx

Status: 25.09.2020

Page 1 of 2

Edit Long Texts of Orders

Selection criteria

The application provides the following selection criteria:

Order

The long text for a specific order can be selected by entering the order number.

Field descriptions

The fields for long texts of orders are described here

Editing functions

To create a new operation or to edit one, you use the icons provided.

The  long  text  entry  function,  which  for  the  most  part  is  equivalent  to  the  functions  of  a  text  editor

(highlighting of text passages; deleting or inserting of lines of text, as well as the merging of lines of text;

copying  with  the  key  combination  Ctrl+C,  cutting  with  the  key  combination  Ctrl+X,  and  pasting  with  the

key combination  Ctrl+V).  Lines may  have more than  80 characters when entered. When a document is

saved, however, the system inserts a hard line break after the 80th character.

Toolbar

 Edit orders

Function authorization: edor

For the currently selected data record, this will call the application Edit orders.

MOC_EditOrderLongTexts.docx

Status: 25.09.2020

Page 2 of 2

