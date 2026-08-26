Operation Status

1  Operation Status

Definition

Since  order  data  is  entered  in  relation  to  operations,  the  system  keeps  a  status  for  each  individual

operation. This status represents the current operation status. Possible statuses are (default values):

 prepared:

The operation has not yet been started

 running:

The operation is currently logged on

 automatically interrupted:

The operation is currently logged on, but was interrupted automatically by

the shift automation at the end of the shift

 interrupted

The operation has been interrupted.

 finished:

The operation has been logged off.

The  operation  status  can  be  configured  to  a  defined  extent  (HYDRA  Customizing).  Please  note  in  this

context  that  an  operation  status  with  exactly  one  control  indicator  is  configured  for  each  order  type

(exception: status with control indicator “S” may exist several times).

Please note for the “automatically interrupted“ status (control indicator “F“)

This  status  is  set  automatically  by  the  shift  automation  for  a  running  operation  at  the  end  of  the  shift.

When the next shift starts, the status is again set to the status assigned to the control indicator “running”

(“L”). If this status is shown this might be due to:

1)  No shift is defined

2)  The  terminal  has  sent  the  end  of  the  shift,  but  no  beginning  of  the  shift,  e.g.  as  it  was  fully

switched off or was booting

Orders cannot be posted for an operation assigned to the “automatically interrupted” status.

Please also see

Order status

GLOSSARY_OperationStatus.docx

Version: 1.0.18468

Page 1 of 1

