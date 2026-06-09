Workplaces/Machines

1  Workplaces/Machines

1.1  General

App name

Workplaces/Machines

Short name of app

Workplaces

Function authorization

sma.wpov

The  tabular  overview  Workplaces/Machines  visualizes  the  current  machine  status  (status,  point  in  time

since when the status is available) including basic information on the workplace/machine. The application

helps to increase transparency in the shop floor. The user gets a clear overview of the current statuses of

machines and workplaces.

Selection criteria

The application provides the following selection criteria:

Resource

Enter the resource number (workplace number) to select from the workplaces.

Status text

Select the relevant status text to select the status that is displayed.

Field descriptions – List

Image

Shows the picture of the machine stored in the configuration of workplaces and resources.

Note: The picture is loaded when the selection is made. Before selection, a dummy image is shown

for the different machines.

Workplace number - workplace designation

Shows  the  workplace  number  and  workplace  name.  The  system  only  shows  the  workplaces  that

are included in the responsibility area the user is authorized for.

Group

Workplace group of the machine

Status

The  respective  workplace  statuses  are  presented  with  the  following  colors  used  for  the  available

resource performance accounts:

  RPA 1: dark-green

WorkplaceOverview.docx

Version: 1.5.20440

Page 1 of 5

Workplaces/Machines

  RPA 2: red

  RPA 3: pink (fuchsia)

  RPA 4: purple

  RPA 5: black

  RPA 6: dark-gray

  RPA 7: light turquoise

  RPA 8: pale blue

  RPA 9: dark blue

  RPA 10: brown

  RPA 11: light green

  RPA 12: turquoise

Field descriptions – Detail

Image

See description "List".

Workplace number - workplace designation

See description "List".

Status

See description "List".

Status text

Defined status text of the current status

Status since

Date when the status was set

Duration so far

Duration of the status (until now)

Expected end

If specified, the estimated end of the current status

Article

Article logged on to the machine

Article name

Name of the article/item logged on to the machine

WorkplaceOverview.docx

Version: 1.5.20440

Page 2 of 5

Workplaces/Machines

MES order number

MES order number of the operation currently logged on. If several operations are logged on to the

workplace at the same time, the operation is displayed that was logged on last.

If you click the MES order number, you are redirected to the Operation overview.

OP name

Name of the OP logged on

Company

Company of the workplace

Cost center

Cost center of the workplace.

Group

Workplace group of the workplace

1.2  Functions

Subject to the purchased licenses and the available authorizations, the application Workplaces/Machines

provides the following functions:

 TOP 5 of malfunctions during shift

Shows the ranking list of the TOP 5 downtimes at the machine including information on the duration

and

how

frequently

the  malfunction

occurred

at

the

respective  machine.

It is also possible to show the TOP 5 based on the frequency or total duration.

 Running OPs (Operations logged on)

The list shows all operations logged on to the machine. If you click the operation, you can change

to the Operation overview.

 Last 10 malfunctions

The list shows the 10 malfunctions that last occurred at the machine.

 Change status

Use  this  function  to  change  the  status  of  the  selected  machine.  A  list  of  the  possible  machine

statuses is provided. Select the relevant status.

Note: This function is included in the package SMA-AMF. Function authorization: sma.setstatus

WorkplaceOverview.docx

Version: 1.5.20440

Page 3 of 5

Workplaces/Machines

 Operation overview

Click  this  button  to  switch  to  the  Operation  overview  and  to  display  detail  information  on  the

operation, which was displayed in the detail view of the machine.

 Log operation on

Use  the  dialog  Log  operation  on  to  log  an  operation  on  to  the  currently  selected  workplace.

Select the operation (MES order number) and machine status via search dialog from a list.

Note: All HYDRA standard validation checks are performed.

Note: This function is included in the package SMA-AMF. Function authorization: sma.logon

 Log operation off

Use  the  dialog  Log  operation  off  to  log  an  operation  off  from  the  currently  selected  workplace.

You can use the logoff dialog to enter the operation number (MES order number), yield and scrap

quantities,  the  relevant  scrap  reason  and  a  new  machine  status.  You  can  use  a  search  dialog  to

select the MES order number, the scrap reason and the machine status from a list.

Note: All HYDRA standard validation checks are performed.

Note: This function is included in the package SMA-AMF. Function authorization: sma.logoff

 Interrupt operation

Use  the  dialog  Interrupt  operation  to  interrupt  an  operation  logged  on  to  the  currently  selected

workplace.

You can enter the operation number (MES order number), yield and scrap quantities, the relevant

scrap  reason  and  a  new  machine  status  in  the  dialog.  You  can  use  a  search  dialog  to  select  the

MES order number, the scrap reason and the machine status from a list.

Note: All HYDRA standard validation checks are performed.

Note: This function is included in the package SMA-AMF. Function authorization: sma.interrupt

 Posting of part quantity (partial confirmation)

You can use the Partial confirmation dialog to post part quantities for an operation logged on to the

currently selected workplace.

You  can  enter  the  operation  number  (MES  order  number),  yield  and  scrap  quantities  and  the

relevant scrap reason in the dialog. You can use a search dialog to select the MES order number

and the scrap reason.

Note: All HYDRA standard validation checks are performed.

Note: This function is included in the package SMA-AMF. Function authorization: sma.partial conf

WorkplaceOverview.docx

Version: 1.5.20440

Page 4 of 5

Workplaces/Machines

 Change partitioning

Use  the  Change  partitioning  dialog  to  change  the  current  partitioning  for  the  workplace  currently

selected.

The operation number (MES order number) and the new partitioning can be entered in the dialog.

You can use a search dialog to select the MES order number from the list of operations logged on.

Note: All HYDRA standard validation checks are performed.

Note: This function is included in the package SMA-AMF. Function authorization: sma.partition

 Application settings

In this dialog, you can make specific settings for this application.

  Reload machine status:

o  No: The open application is not automatically updated.

o  Cyclic  loading:  If  this  option  is  set,  the  status  of  the  displayed  workplaces/machines  is

cyclically  updated.  The  duration  between  two  updates  is  defined  via  the  option  Reload

time.

o  EMQTT:  The  machine  status  is  promptly  updated  when  the  status  of  the  machine

changes  (via  EMQTT).  Requirement:  You  use  the  centralized  MDE  and  the  relevant

settings are made. If data collection is not performed via centralized MDE for the machine

and  if  the  machine  is  then  not  updated  via  MQTT,  an  update  in  the  application

Workplaces/Machines is also not possible.

  Reload time: The reload time specifies the time between the status updates. You can define a

value between 30 and 300 seconds as reload time.

To  enable  the  settings,  click  Save  after  having  performed  the  changes  and  close  the

application using

.

WorkplaceOverview.docx

Version: 1.5.20440

Page 5 of 5

