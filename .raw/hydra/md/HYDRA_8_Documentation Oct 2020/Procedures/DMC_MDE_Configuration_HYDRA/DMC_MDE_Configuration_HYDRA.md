DMC MDE: Configuration in HYDRA

1  DMC-MDE: Configuration in HYDRA

Workplace configuration

Configure  the  machine  in  the  Workplace  configuration    MDE  configuration  with  the  following  data  to

integrate the machine in HYDRA DMC:

Parameter name

Value

Monitoring type

Cyclic monitoring

Monitoring via operating signal

No monitoring

Min. cycle/disturbance time

Min.  cycle/disturbance

time

(cycles  monitoring

enabled)

Cycle extension

Cycle extension (cycles monitoring enabled)

Counter configuration

Maintain the counters in use per machine in the Counter configuration

 with

the

following  data

to

integrate the counters in HYDRA DMC:

Parameter name

Value

Counter input

Number/Input of the counter

Identifier "Cycles monitoring"

If  this  identifier  is  set  for  a  channel,  incoming

counter  pulses  are  considered  during  cycle

monitoring.

Only the first counter configured with the identifier

"For  monitoring"  is  used  to  calculate  the  actual

cycle.  Also  set  this  counter  if  monitoring  via

operating signal is enabled and an actual cycle is

to be calculated at the same time.

Posting as cycles

Yes or No

DMC_MDE_Configuration_HYDRA.docx  Version: 1.1.18468

Page 1 of 2

DMC MDE: Configuration in HYDRA

Parameter name

Posting as

Value

Yield

Scrap quantity

Rework quantity

Open quantity

Machine status configuration

Maintain the machine statuses in use in the Status assignment of machines/workplaces with the following

data to integrate the machine statuses in HYDRA DMC:

Parameter name

Value

Production identifier

Create  statuses  with  the  following  production

identifiers:

P

S

Production

Other status

Identifier "Activate production lock"

Set  the  identifier,  if  you  want  to  set  a  production

lock with this status.

Identifier "Set machine lock output"

Set the identifier, if you want to set the output with

this status.

Identifier  "Automatically  via  digital  input"  and

Set  the  identifier,  if  you  want  to  record  the  status

"Digital input"

via a digital input, and assign the digital input used

to this end.

DMC_MDE_Configuration_HYDRA.docx  Version: 1.1.18468

Page 2 of 2

