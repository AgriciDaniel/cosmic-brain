MLE.OUTBOUND_CONF_ERROR

1  MLE.OUTBOUND_CONF_ERROR

Description

The MLE.OUTBOUND_CONF_ERROR event is provided as cyclical event. This means that a monitoring

cycle  can  be  defined  in  the  configuration  of  the  escalation  management.  As  soon  as  there  will  be  a

throughput, the related event will be made available. The configuration of the escalation management can

then be used to store, from which duration on an escalation shall be triggered.

In doing so, the system will determine the duration since the last provision and/or transfer of confirmation

data referred to a posting/ segment type of the MLE output. In doing so, it is first controlled whether new

segments  are  available  for  this  posting  type  in  the  outbound  transactions.  If  yes,  the  system  will

determine the duration between their provision to the MLE outbound transactions and the current point in

time. An additional flag will be used to show that data records are available that are ready to be collected.

If no new data records are found in the MLE outbound transactions, the system will check when the last

transfer  was  effected  for  the  corresponding  posting/  segment  type  and  will  determine  the  duration

between  this  and  the  current  point  in  time.  To  this  end  both,  online  tables  and  archive  tables  are

supported. An additional flag will be used to show that no data records are available in this case.

If neither new data records nor such data records are found that were already transferred, this will also be

marked by an additional flag. In this case a zero will be transferred for the duration.

The event will provide the following data:

  MESTYP (key 1)

The outbound posting type that was checked

  PROVFLAG (key 2)

Flag indicating the availability:

"N"

"D"

There are new data records in the MLE outbound transactions

There  are  no  new  data  records  and  the  duration  was  calculated  based  on  the  last

transfer.

"Z"

There are neither new nor already transferred data records.

  SEGNAM

The SEGNAM identification includes the segment name, for which the upload was made.



IDOCTYP

The IDoc type of these data records.

MBL_ESK_MLE_OUTBOUND_CONF_ERROR.docx

Version:1.0.1362

Page 1 of 3

  LOGSYS

Logical  system  from  the  HYDRA  MLE  configuration,  for  which  this  data  record  is  to  be

MLE.OUTBOUND_CONF_ERROR

transferred.

  DSSTA

Status of the last found data record:

"000"  New data record (NEW)

"001"  Repeated transfer (TODO)

"079"  Transfer error (DONE ERROR)

"099"  Transfer successful (DONE)

If the "Z"  value  is transferred in the  acronym PROVFLAG it  was not  possible to determine data

records and the acronym will be transferred without value.

  DUR

Duration - calculated duration since the last provision of new data records and/or the last transfer

in  seconds.  If  the  "Z"  value  is  transferred  in  the  acronym  PROVFLAG  it  was  not  possible  to

determine data records and the acronym will be transferred with zero.

MBL_ESK_MLE_OUTBOUND_CONF_ERROR.docx

Version:1.0.1362

Page 2 of 3

MLE.OUTBOUND_CONF_ERROR

MBL_ESK_MLE_OUTBOUND_CONF_ERROR.docxVersion:

1.0.1362

Page 3 of 3

