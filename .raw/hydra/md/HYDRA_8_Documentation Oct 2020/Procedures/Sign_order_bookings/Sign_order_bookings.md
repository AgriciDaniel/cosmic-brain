Postings

Setting  for  Approved  PostingsSetting  for  Approved

1  Setting for Approved Postings

Activation on order type

In order to activate the transfer via the interface only for approved postings, you have to set the following

parameters at the order type:

Parameter name

Approved order postings only

Approved personnel postings only

Setting for the interface

Value

Active

Active

If  you  wish  to  change  the  default  setting  for  the  transfer  of  unapproved  postings,  you  have  to  set  the

following,  additional  program  parameters  for  the  confirmation  program  myerprck.exe/out  in  the  HYDRA

Scheduler for the entry of the interface in use:

Parameter name

Value

Command (Windows):

sh.exe  ./myerprck.scr  <already  existing  parameters>

/ABZEICH=xx

Command (Unix):

./myerprck.scr

<already

existing

parameters>

/ABZEICH=xx

Sign_order_bookings.docx

Version: 1.0.18468

Page 1 of 1

