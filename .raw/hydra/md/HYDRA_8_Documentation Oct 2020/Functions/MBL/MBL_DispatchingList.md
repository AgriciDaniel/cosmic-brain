Controlling the Sequencing List

1  Controlling the Sequencing List

General

The  sequencing  list  of  the  shop  floor  terminal  is  flexible  and  can  be  adjusted  to  meet  specific

requirements.  The  settings  described  below  control  how  data  is  provided  in  the  sequencing  list.  Please

keep in mind that certain settings can only be made during the customizing process.

Workplace/ machine configuration: "Sequencing list" setting

Description

Which  order  pool  is  used  to  generate  the  sequencing  list  can  be  defined  in  the  sequencing  list
configuration of the workplace configuration dialog.

The  pool  of  orders  is  determined  by  planning  in  HYDRA  shop  floor  scheduling  or  by  the  specifications

from the PPS system and is a result of whether the OP was planned directly for a machine or a machine

group.

Possible settings

S - Basic setting
The value is transferred from the option with the same name in the HYDRA basic parameter settings.

M - Pool of workplaces
Only the operations planned for the workplace are displayed in the sequencing list at the terminal.

G - Pool of workplaces and groups
The sequencing list at the terminal displays those OPs that are either planned for the current workplace
or for a different workplace in the group or that are still in the pool of groups.

K - Pool of workplaces and categories
The sequencing list at the terminal displays only the operations that are planned for workplaces in the
same machine category.

H - Group control
The sequencing list at the terminal displays those OPs that are either planned for the current workplace
or for a different workplace in the group.

Workplace/ machine configuration: "Number of OPs" setting

Description

The maximum number of OPs for the sequencing list can be configured by the option "number of OPs"
within  the  workplace  configuration.  The  OPs  are  selected  in  ascending  order  based  on  how  the
sequencing list is sorted.

Possible settings

0

= no restriction (display all existing OPs)

1-999  = maximum number of OPs

MBL_DispatchingList.docx

Version: 1.2.18468

Page 1 of 3

Controlling the Sequencing List

Order types: "Sequencing list" setting

Description

The configuration is made at order level in the sequencing list option under order types.

This setting can only be changed during customizing.

Possible settings

J

F

The OP should be displayed in the sequencing list.

The OP should only be displayed in the sequencing list if it is fixed.

N

The OP should not be displayed in the sequencing list.

Processing code: "Sequencing list" setting

Description

Whether or not an OP with this processing code should be displayed in the sequencing list can also be
defined in the processing codes ..\..\functions\moc\MOC_ProcessingCodes.pdfconfiguration.

This setting can only be changed during customizing.

Possible settings

J

The OP should be displayed in the sequencing list.

N

The OP should not be displayed in the sequencing list.

Order status assignment: "Sequencing list" setting

Description

Whether an OP should appear in the sequencing list based on its status can be defined using this option
under  order  status  assignment.  If  an  "N"  is  defined  here,  an  OP  in  this  status  is  not  displayed  in  the
sequencing list.

This  is  used  as  a  standard  feature  to  ensure  that  only  prepared  or  interrupted  OPs  appear  in  the
sequencing list.

Furthermore, it can be configured that running OPs also appear in the sequencing list.

This setting can only be changed during customizing.

Possible settings

J

The OP should be displayed in the sequencing list.

N

The OP should not be displayed in the sequencing list.

MBL_DispatchingList.docx

Version: 1.2.18468

Page 2 of 3

Controlling the Sequencing List

Miscellaneous notes

Generally, the following operations never appear in the sequencing list:

  Locked operations



Individual operations from merged operations that were generated at MOC.

  The original operation for split operations

  Operations of inactive alternative sequences

Order of operations in the sequencing list

Generally,  the  data  listed  below  defines  how  the  operations  are  ordered  in  the  sequencing  list  at  the

terminal:

1.

Internal field for the planned start date (auftrags_bestand.sort_dat)

2.

Internal field for the planned start time (auftrags_bestand.sort_dat)

3.  HYDRA combined order/ operation number (auftrags_bestand.auftrag_nr)

The system fills in the internal fields for the planned start date and planned start time. This depends on

how  the  operation  was  created  in  the  system  (transferred  via  the  interface  or  manually  created  in  the

system) and on the planning functions used subsequently. How the system does this is described in each

applicable documentation.

  Manual editing via the user interface or via the system interface – initial data creation

  Manual editing via the user interface or via the system interface - modification

  Using HYDRA Shop Floor Scheduling

  Using HYDRA Order Sequencing

When using order sequencing, we recommend to only use the "M" option (pool of workplaces)

to  configure  the  sequencing  list;  the  order  within  the  sequencing  list  at  the  terminal  is  not

defined when the other options are used.

MBL_DispatchingList.docx

Version: 1.2.18468

Page 3 of 3

