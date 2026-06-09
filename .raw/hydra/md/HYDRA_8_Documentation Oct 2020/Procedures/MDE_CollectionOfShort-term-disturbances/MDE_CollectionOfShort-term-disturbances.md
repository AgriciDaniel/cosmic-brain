Entry of Short-Term Malfunctions

1  Entry of Short-Term Malfunctions

Utilization

To  improve  the  overview,  e.g.  for  the  status  protocol  one  status  per  machine  may  be  defined  as  short-

term disturbance. This status is used as “container” for  unconfirmed statuses, which were only available

for a specific (short) time while monitoring the machine.

If  a  downtime  is  automatically  detected  at  the  terminal  and  the  machine  goes  back  into  production

automatically, the system verifies if the duration of this disturbance is shorter than the duration configured

for this machine as short-term disturbances.

If  it  is,  then  the  disturbance  showing  no  reasons  up  until  now  is  set  with  a  reason  using  the  status

configured  at  the  machine  as  the  status  for  "short-term  disturbances"  (MDE  configuration  -->

Administration --> Waiting period for short-term disturbances).

Such  automatic  status  postings  (reasons)  for  short-term  disturbances  are  displayed  within  HYDRA  in

exactly the same manner as if they had been given a reason by an operator.

Configuration of short-term status - status assignment

Within status assignment 1 status (at most) is defined with the control indicator “short-term disturbance”.

Configuration of the short-term status - configuration of

machines/workplaces

The  time  until  which  a  disturbance  is  still  interpreted  as  short-term  disturbance  is  defined  within  the

configuration of machines/workplaces. If the time configured for short-term disturbances is 0 the function

is deactivated.

Processing - scenarios

Scenario  1:  Machine  monitoring,  manual  disturbance  message  before  short-term  disturbance

expires

  Time A: beginning of malfunction; terminal does not receive signal
  Time C: expiry of minimum cycle time including cycle extension according to HYDRA-MDE machine

configuration  terminal switches to “not assigned" (30000)

  Time D: manual confirmation of disturbance reason disturbance reason is assigned to time A

MDE_CollectionOfShort-term-disturbances.docxVersion: 1.0.1362

Page 1 of 3

Entry of Short-Term Malfunctions

Scenario  2:  Machine  monitoring;  manual  disturbance  message  after  short-term  disturbance  has

expired

  Time A: beginning of malfunction; terminal does not receive signal
  Time C: Expiry of minimum cycle time including cycle extension according to HYDRA-MDE machine

configuration  terminal switches to “not assigned" (30000)

  Time E: manual confirmation of disturbance reason  disturbance reason is assigned to time A

Scenario 3: Machine monitoring; no manual disturbance message

  Time A: beginning of malfunction; terminal does not receive signal
  Time C: Expiry of minimum cycle time including cycle extension according to HYDRA-MDE machine

configuration  terminal switches to “not assigned" (30000)

  Time B: Expiry of "short-term disturbance time “
  Time F: beginning of production  the time between A and F is posted to "not assigned”  ( general

malfunction).

Scenario 4: Machine monitoring; beginning of production before short-term disturbance expires

  Time A: beginning of malfunction; terminal does not receive signal
  Time C: Expiry of minimum cycle time including cycle extension according to HYDRA-MDE machine

configuration  terminal switches to “not assigned" (30000)

  Time B: Expiry of "short-term disturbance time“
  Time  G:  Signal  from  machine    the  time  between  A  and  G  is  posted  to  “short-term  disturbance

reason“.

MDE_CollectionOfShort-term-disturbances.docxVersion: 1.0.1362

Page 2 of 3

Entry of Short-Term Malfunctions

Please note

In  connection  with  the  shift  automatic  option  it  might  be  the  case  that  a  short-term  disturbance  is

generated  when shifts are changed if the time between detection of the malfunction (status 30000) and

the end of the shift is less than the “short-term disturbance time” defined. A short-term disturbance is also

generated when the period of time between the beginning of the shift and restarting of production is less

than  the  “short-term  disturbance  time”  defined.  This  is  also  the  case,  when  the  sum  of  both  periods

(before and after the change of shifts) is greater than the short-term disturbance time configured.

MDE_CollectionOfShort-term-disturbances.docxVersion: 1.0.1362

Page 3 of 3

