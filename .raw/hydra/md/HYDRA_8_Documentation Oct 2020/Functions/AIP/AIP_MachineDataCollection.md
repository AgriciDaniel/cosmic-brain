Specific Features of Machine Data Collection

1  Specific Features of Machine Data Collection

The functions described in the paragraphs that follow are only active at workplaces meeting the following

requirements:

  The machine/workplace has been configured as “individual workplace”

  The  machine/workplace  is  assigned  to  a  terminal,  which  has  been  configured  in  the  “MDE”

operation mode

These functions are not available at group workplaces.

To  ensure  proper  processing  and  posting,  terminals  with  "MDE"  operation  mode  must  not  be

switched off during times without shift.

1.1  Shift automatic

A shift model has to be assigned to each  workplace/machine. Due to the  information given  by this shift

calendar, the terminal is able to determine automatically the beginning and end of shifts for its assigned

machines.

By the shift automatic option, functions are activated that ease data collection as well as operability:





the OP that is logged on is automatically interrupted at the end of the shift.

this OP is logged on at the beginning of the next shift

  Staff can log on in advance to a terminal within a certain period of time prior to the beginning of the

shift. When the shift starts the next time, the terminal logs them on to the OP. This period of time is

defined within the terminal configuration (option: waiting period for advance logon of staff).

Since data collection at terminals must not be interrupted and it is impossible for all terminals to send all

postings simultaneously at the end of the shift, log records are buffered. The buffer is now transferred to

the  server  in  short  intervals.  This  process  depends  on  the  number  of  machines  defined  for  a  terminal.

Postings made during that time are buffered as well.

The following diagram shows a time flow of logons and logoffs during a change of shifts.

AIP_MachineDataCollection.docx

Version:

Page 1 of 7

Specific Features of Machine Data Collection

Description of the process

1)

An OP was logged on during shift 1 and its production is also to be continued in the following shift

2.

2)

Person1 logs on to the workplace.

3)

Person 2 arrives shortly before the shift ends and logs on to the workplace. Since the logon takes

place within the 30 minutes of advance logon time, the terminal recognizes an advance logon.

4)

The  registered  OP  is  automatically  interrupted  when  the  shifts  end  and  the  staff  logged  on  is

logged off.

5)

  The OP, which  was interrupted  beforehand,  is logged on again  when the shift starts. Moreover,

the persons who logged on in advance are logged on as well.

1.2  Downtime monitoring

The  monitoring  type  is  configured  in  the  workplace/machine  configuration  (MDE  configuration  tab  >

Monitoring Type. The following values may be set:

Cyclic monitoring

Cycle time monitoring

Monitoring via operating signal

Operating signal monitoring

No monitoring

No automatic monitoring

If,  after  a  production  phase  (cycle  time  monitoring),  the  specified  target  cycle  time  is  exceeded  for  the

logged on order/OP, the terminal detects a downtime and expects a status to be entered. In this case the

current terminal status is “NOT ASSIGNED”. The same principle applies to operation signal monitoring.

AIP_MachineDataCollection.docx

Version:

Page 2 of 7

Specific Features of Machine Data Collection

Monitoring of cycle time

When counter pulses arrive, the status is switched to “Production".

The  cycle  time  is  calculated  from  the  target  cycle  of  the  OP  multiplied  by  the  value  entered  in  the

workplace/machine configuration (MDE Configuration tab > Monitoring type > Cycle extension”).

A disturbance/malfunction can only be entered, if the AIP terminal requests it (no production).

As  a  part  of  customizing,  it  is  possible  to  activate  a  back  posting  for  this  terminal  version,  in  order  to

record the point in time when the last pulse arrives for cycle time monitoring or the point in time when the

operating signal stops for operating signal monitoring.

Operating signal monitoring

By setting the operating signal, status is changed to “Production”.

A disturbance has to last for a certain time, before it will be identified as such and reported. This period is

defined by “…MDE Configuration > Monitoring type > Minimum disturbance time”.

A disturbance can only be entered, if the terminal requests it (no production).

AIP_MachineDataCollection.docx

Version:

Page 3 of 7

Specific Features of Machine Data Collection

As  a  part  of  customizing,  it  is  possible  to  activate  a  back  posting  for  this  terminal  version,  in  order  to

record the point in time when the last pulse arrives for cycle time monitoring or the point in time when the

operating signal stops for operating signal monitoring.

No automatic monitoring

It  is  possible  at  all  times  to  define  a  new  machine  status.  The  “Production”  status must  also  be

manually assigned.

1.3  Lock production status (production lock)

The “lock production status” button of the “workplaces/machines” section enables the user to prevent the

terminal  from  switching  automatically  to  the  “production”  status,  when  new  clock  pulses  arrive  from  the

machine. Thus, switching to “production” is disabled (“production lock”).

In case a workplace/machine is unable to switch to the “production” status, the “note” column shows this

by “production status locked”.

In this case, the current status remains – despite the machine pulses received.

All  items  produced  during  the  lock  are  either  posted  as  yield,  scrap  or  not  at  all,  depending  on  the

workplace configuration.

The production lock may be enabled or disabled explicitly by clicking the “lock production status” button.

AIP_MachineDataCollection.docx

Version:

Page 4 of 7

Specific Features of Machine Data Collection

If the workplace/machine status is configured accordingly (menu: master data > machines/workplaces >

status assignment), the production lock may also be set automatically i.e. along with setting a status.

Authorization checking when setting the production lock manually

It is possible to allow the manual (explicit) setting or removing of the production lock only via a respective

authorization.

For  this  purpose,  the  dynamic  dialog  M_PSPERRE  is  to  be  activated  (customizing).  The  plant  ID  card

(staff badge number) must be entered in this dialog.

If the dialog is active it will be opened, when the worker clicks the “lock production status” button. Once

the badge number has been entered, it is checked whether this person is authorized to activate/remove

the  production  lock.  This  is  checked  against  the  “change  of  production  lock”  authorization  in  the  HR

master (BDE tab).

The OFFLINE performance depends on the terminal configuration (“checking required" option).

Logging of the production lock

The manual activation/deactivation of the production lock is recorded as event at the server and may be

evaluated within the machine history.

Please  note  in  this  context,  that  only  the  event  of  setting/removing  the  production  lock manually  will  be

recorded.

.

But  if  the  production  lock  is  enabled  or  disabled  implicitly  by  a  status  change,  no  explicit  event  will  be

recorded and, as a result it cannot be evaluated at the client.

In  case  a  machine  is  locked  for  production  and  the  AIP  terminal  is  restarted,  this  production  lock  is

automatically  disabled  after  the  restart.  The  process  of  changing  the  production  lock  is  lock  is  neither

recorded.

1.4  Machine lock

It can be defined for each status whether or not a “machine lock” is to be enabled as soon as this status is

assigned. This can be configured in (status assignment > tab: control > other settings > set machine lock

output).

Setting a machine lock leads to an output being set, which may trigger a relay, for example. In this case,

the  logical  output  is  defined  within  the  workplace/machine  configuration  (tab:  MDE  configuration  >

inputs/outputs > machine lock).

AIP_MachineDataCollection.docx

Version:

Page 5 of 7

Specific Features of Machine Data Collection

Notes on using the machine lock at DS 100 terminals

The value “1” has to be  entered in the “machine lock” field of the configuration of machines/workplaces

(tab: MDE configuration > inputs/outputs), provided that the relay is to be set at the DS100 terminal.

The relay is set for all statuses assigned to the “machine lock” as well as for the “not assigned” status.

1.5  Output “target quantity reached"

An output may be set to trigger a lamp, for example, via a relay (to be provided by the customer), when

the target quantity of the currently registered operation has been reached.

The logical output is defined in the menu: master data > machines/workplaces > inputs/outputs > target

quantity reached.

The target quantity of a machine is checked:

  once the terminal program AIP has been restarted

  after changing the target quantity using the corresponding posting dialog

  once an operation has been logged on, off or interrupted

  after posting manual quantities (partial uploads)

  after local quantity events of the MDE module (automatic quantities)

  once the order list has been reloaded

If several operations are logged on to a workplace/machine at the same time the logical output is set as

soon as the target quantity has been reached for one of the orders. The signal will be reset if this OP is

interrupted.

1.6  Scrap reasons depending on status & production lock

Two scrap reasons can be defined for a status. One scrap reason applying for the active production lock

(see  section  Error!  Reference  source  not  found.  Lock  production  status  (production  lock))  as  well  as

one scrap reason applying for an inactive production lock. If a scrap reason is defined for the status that

is currently available at the machine the counted scrap will be posted with this specified scrap reason.

AIP_MachineDataCollection.docx

Version:

Page 6 of 7

Specific Features of Machine Data Collection

Provided that a scrap reason is configured at the counting input, this one takes priority. Consequently, a

counter  that  is  assigned  to  a  fixed  scrap  reason  keeps  this  scrap  reason  even  if  another  reason  is

configured for the currently available status.









1.7  Setting of outputs subject to the status and posting

scenarios

By  way  of  an  advanced  configuration,  digital  outputs  of  the  machine  may  be  set  if  a  specific  machine

status and a defined posting scenario coincide. Further details on this configuration can be found in the

document entitled MDE_digital_output_depending_on_scenario.pdf.

Please note the following for the local administration of the machine status at the terminal:

If  status  changes  are  posted  using  PDM  or  at  another  terminal  the  machine  status  is  only  transferred

when  reloading

the  machine

list,  provided

that

this  has  been  configured  explicitly  by

the

“FollowExternStatus“ option:

HYTNRCFG.INI

[Tnr Konfiguration 0]
FollowExternStatus=on

When the status is changed by reloading the list, the terminal checks the configured logical outputs and

sets or resets them, if required.

AIP_MachineDataCollection.docx

Version:

Page 7 of 7

