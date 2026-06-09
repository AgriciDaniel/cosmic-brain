Monitoring Availability Dates

1  Monitoring Availability Dates

Requirement

You  defined  the  process  time  defaults  for  minimum  storage  time,  warning  time  and/or  expiry  time  in

Material type or in Assignment of material to material type.

You scheduled the job in the scheduler.

Procedure the system follows during cyclic monitoring

Batches,  which  because  of  the  minimum  storage  time  configuration,  were  set  to  status  "M"  (minimum

storage time) at the time the batch was created are set to status "F" (free) once the minimum storage time

has expired.

A batch is considered expired if the period of time between when the batch was created and the current

time is greater than the period of time defined in the Expiry limit configuration. If this is the case, the batch

is set to status "V" (expired).

The status modification as a result of the processing step is logged and is shown in the batch history.

Procedure the system follows during input batch logon

When  a  batch  is  logged  on  as  an  input  batch,  a  plausibility  check  is  run  to  verify  the  minimum  storage

time and the expiry time.

MBL_Material-Monitoring.docx

Version: 1.0.18468

Page 1 of 1

