Waiting Period Processing - Machine

1  Waiting Period Processing - Machine

Summary

Utilization

Similar to the waiting period processing for staff, this function enables the waiting period processing for

machines. Provided that this function is activated, it generates machine-related waiting period postings

in the system for times when no operation is logged on.

This data represents the unused capacities and, as a result, allows for a statement to be made about

the actual utilization of capacities.

Prerequisite

The waiting period processing has been activated in the "basic parameter settings" BDE

 waiting period processing of the machine.

Finding  of  waiting  period  OPs  with  waiting  period  processing  based  on

machines

Upload to the PPS system

By default, waiting period postings are not uploaded to the higher-level ERP system. However, if it is
required  to  upload  these  postings  as  well,  HYDRA  can  be  customized  accordingly.  To  do  so,  the
HYDRA standard interface has to be used.

MBL_Waiting_period_Machine.docx

Version: 1.1.18468

Page 1 of 2

Waiting Period Processing - Machine

Status of a waiting period operation

By  default,  a  waiting  period  operation  is  always  assigned  to  the  status  "available  (waiting  period)",
irrespective  of  whether  the  waiting  period  operation  has  already  been  posted  or  if  a  person  or  a
machine "is waiting".

Processing  is  not  affected,  if  the  status  of  a  waiting  period  operation  or  a  waiting  period  order  is
changed  to the  "completed" status  using the function  "change status"  in the  order overview  or order
information dialog. The defined waiting period operation is still posted. Please also take into account
the notes on changing a waiting period operation in the basic parameter settings.

Reactivation of a waiting period operation

Processing  is  not  affected,  if  a  waiting  period  operation  is  reactivated  using  the  "reactivate  OP"
function in the order overview dialog. By default, the status is set to "available (waiting period)" again
in HYDRA (this is an internal status with control indicator "U").

MBL_Waiting_period_Machine.docx

Version: 1.1.18468

Page 2 of 2

