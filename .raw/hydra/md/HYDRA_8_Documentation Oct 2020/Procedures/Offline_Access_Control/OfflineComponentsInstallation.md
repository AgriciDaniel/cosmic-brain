Installation of Offline Component Connection

1

Installation of Offline Component Connection

1.1

Installation of an update for HYDRA

HYDRA systems initially installed before the third quarter of 2014 usually require an installation procedure

on the HYDRA server, even if current Service Packs have been installed.

This installation procedure is used to provide the necessary prerequisites in the HYDRA database.

This  subsequent  installation  is  coordinated  by  the  MPDV  project  management,  if  required,  and

implemented with the aid of a separate installation manual.

HYDRA  systems  initially  installed  from  the  third  quarter  of  2014  onwards  in  the  version  of

Service Pack 5 already meet the requirements on the HYDRA server so that an installation is

not necessary there.

1.2  Requirements

  The HYDRA server must have Java version 1.5 as a minimum requirement.

  The KABA B-COMM software (server + GUI) must have been installed. The installation guide for

the KABA B-COMM software is included as PDF file on the installation medium.

OfflineComponentsInstallation.docx

Version: 2.0.18468

Page 1 of 7

1.3  Basic configurations in the B-COMM GUI

Installation of Offline Component Connection

1.3.1  CardLink instance

A  CardLink  instance  with  the  name  "CardLink"  has  to  be  created  manually.  The  option  "instance  for

CardLink" has to be activated. Subsequently, a USB channel named BCSCW01 is automatically created

in the "CardLink" instance.

The name "CardLink" for the instance synchronized from HYDRA is fixed.

All  settings  related  to  the  instance  and  channel  must  be  managed  in  B-COMM.  HYDRA  will  not

synchronize any data in the instance or channel.

1.3.2  Administration area

An  administration  area  must  be  created  manually  in  this  CardLink  instance  in  B-COMM.  By  default,

HYDRA synchronizes with the administration area with Number 1.

The data of the tabs Parameters and Master must be maintained in the administration area in B-COMM.

HYDRA will not synchronize any data in these tabs, since there are no corresponding settings in HYDRA.

When  creating  an  administration  area,  it  must  be  observed  that  the  media  technology  is  set

correctly, since it cannot be changed subsequently.

OfflineComponentsInstallation.docx

Version: 2.0.18468

Page 2 of 7

Installation of Offline Component Connection

Parameters tab

Number

By  default,  HYDRA  expects  an  administration  area  with  Number  1.  Another  number  can  also  be

used.  This  must  then  be  taken  into  consideration  when  the  interface  is  set  up  in  HYDRA,  see

below.

Name

Assign a meaningful name.

Validation periods and validation method

The validation period 3 must be configured, e.g. for 1 or 2 days. This validation period will be used

by HYDRA for all components and badges.

Other fields

The other fields must be maintained in accordance with the B-COMM documentation.

Master tab

Other fields

The other fields must be maintained in accordance with the B-COMM documentation.

The data in the tabs Door (groups) and Days off/Special days must not be entered manually in

B-COMM, but are maintained in HYDRA and synchronized to B-COMM.

1.3.3  Create component

The  components  include  settings  and  parameters  not  known  by  HYDRA.  For  this  reason,  automatic

synchronization requires a  "copy  template" in order to be able to create new components via automatic

synchronization. This copy template must be created once in B-COMM upon installation.

Please use door number 512 and the component type you will primarily use for this purpose!

HYDRA  will  then  always  use  the  component  with  the  lowest  door  number  (Door  (groups)  tab,  Door

number  field)  as  copy  template,  if  new  accesses  not  yet  existing  in  B-COMM  are  created  in  HYDRA.

Please observe that valid door numbers for CardLink start from 512.

The  key  for  synchronizing  the  HYDRA  accesses  to  the  components  in  B-COMM  is  the  Door  number

managed in the Door (groups) tab.

OfflineComponentsInstallation.docx

Version: 2.0.18468

Page 3 of 7

Installation of Offline Component Connection

Accesses for Kaba offline components must be created in HYDRA in an access number range

from  512  to  4511.  Synchronization  with  B-COMM  only  takes  place  for  accesses  where  the

Offline component option is set.

Details as to which tabs and fields are synchronized upon synchronization from HYDRA can be found in

the document dealing with the configuration of offline components.

If  you  use  offline  components  of  different  Types,  it  may  be  necessary  to  make  a  manual

correction  after  synchronization,  since  the  type  of  the  component  with  the  lowest  number  will

also be copied.

1.4  Set up the interface to B-COMM in HYDRA

The  settings  for  the  interface  have  to  be  made  in  HYDRA.  The  configurations  are  managed  via  the  INI

configuration .

For this purpose, the INI configuration CARDLINK has to be entered first.

Subsequently, a number of INI data configurations have to be made:

Section BCOMM, key JAVA_INST_PATH

Installation  path  of  Java  installation,  e.g.  "c:\Program  Files\Java\jdk1.5.0_16\bin".  Setting  the

parameter  is  mandatory  to  ensure  correct  assignment  of  the  Java  version.  The  path  must  be

indicated without the trailing slash/backslash!

Section BCOMM, key RMI_SERVER

Name  or  IP  address  of  the  computer  on  which  the  B-COMM  server  is  installed.  Specification  is

mandatory.

Section BCOMM, key RMI_PORT

RMI port number. Specification is optional, default value is 1099.

Section BCOMM, key ADMIN_AREA_IDX

Number of the administration area  managed by HYDRA. Specification is optional, default value is

Administration area 1.

OfflineComponentsInstallation.docx

Version: 2.0.18468

Page 4 of 7

Installation of Offline Component Connection

1.5  Setup of provision of CardLink data

The  authorizations  for  the  access  at  Kaba  offline  components  are  provided  cyclically  on  the  HYDRA

server  and  loaded  cyclically  by  the  HYDRA  PZE  terminals  in  order  to  write  them  on  the  badges  of  the

employees. This configuration only  provides authorizations for accesses with  KABA offline components.

This refers to accesses assigned to a terminal of the type "KABA Programmer".

1.5.1  Configuration of badge type

The  type  of  the  badges  used  for  CardLink  must  be  set  via  an  INI  configuration.  A  standardized  badge

type must be used for each HYDRA system.

For this purpose, the INI configuration CARDLINK has to be entered first, if required.

Subsequently, the following INI data configuration has to be made:

Section OPTIONS, key BADGETYPE

The badge type is indicated as a number:

  1 = Legic Prime (default)

2 = Mifare/Legic Advant

OfflineComponentsInstallation.docx

Version: 2.0.18468

Page 5 of 7

Installation of Offline Component Connection

1.5.2  Activation in scheduler

The  HYDRA  server  cyclically  updates  and  provides  the  data  required  to  load  authorizations  on  the

badges. For this purpose, an entry must be set up in the Scheduler.

The job is to be set up as 5-minute interval job.

"Comment" tab:

Type

Kind

Visible

Active

Product key

License key

S=Standard

I=Interval

Visible

[X] Activated

ZKS

ZKS-SOK

Command (depending on the server operating system)

Windows:

sh cardlink.scr

Linux:

cardlink.scr

The  administration  area  can  be  transferred  to  the  shell  script  cardlink.scr  as  a  parameter.  Multiple

administration areas are used, for example, if several productive  instances are installed on one HYDRA

server.

Comment

Provision of authorizations for CardLink

OfflineComponentsInstallation.docx

Version: 2.0.18468

Page 6 of 7

Installation of Offline Component Connection

"Interval" tab:

Interval

0:05:00

With  the  default  settings,  the  authorizations  are  provided  on  the  server  every  5  minutes  and

loaded to the PZE terminals every 5 minutes, too. So it may take up to 10  minutes with these

settings until a modified authorization is available at the PZE-terminal and can be loaded on the

badge.

OfflineComponentsInstallation.docx

Version: 2.0.18468

Page 7 of 7

