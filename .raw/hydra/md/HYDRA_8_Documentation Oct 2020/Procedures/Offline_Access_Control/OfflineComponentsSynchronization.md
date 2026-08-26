Synchronization of KABA Offline Components

1  Synchronization of KABA Offline Components

1.1  Overview

The  initialization  of  Kaba  offline  components  (digital  cylinders  and  electronic  door  mounts)  and  the

synchronization of specific configurations (e.g. access time models and public holidays) are implemented

via the Kaba Programmer 1460, which is loaded via the Kaba B-COMM software.

An interface between HYDRA and the B-COMM server automatically synchronizes accesses configured

in HYDRA and other access configurations with Kaba B-COMM.

1.2  Configuration of the interface

The technical settings  and  configurations regarding  the interface connection to the B-COMM server are

described in a separate document on the installation of the CardLink function.

1.3

Initiation and process of synchronization

The  synchronization  of  the  B-COMM  offline  components  is  initiated  directly  and  automatically  upon  the

modification of master data in HYDRA Access Control. Every time, the complete administration area with

all  sub-elements

is  synchronized.  The

following  modifications

to  master  data  will

initiate  a

synchronization:

  Accesses

  Access groups

  Opening hours

  Access time models

  Access periods

  Public holidays

Since only one synchronization can run at a time, modifications which are made at virtually the same time

at various clients in HYDRA will be transferred to the B-COMM server one after the other. This may result

in minor synchronization delays.

1.4  Logging

Synchronization  runs  are  recorded  in  the  HYDRA  system  logs.  They  are  identifiable  as  BCOMM

application. The system logs must be checked regularly for errors.

OfflineComponentsSynchronization.docx  Version: 2.0.18468

Page 1 of 2

Synchronization of KABA Offline Components

All started synchronization runs are recorded  in the log file err\zksoffline.pro of the HYDRA server. This

file  also  indicates  when  several  interface  calls  are  serialized  due  to  the  simultaneous  modification  of

master data at different HYDRA clients.

1.5  Access log

The  access  logs  can  be  read  from  the  offline  components  by  means  of  the  Kaba  Programmer  and

evaluated in B-COMM.

An interface transferring the access logs from B-COMM to HYDRA does not exist.

OfflineComponentsSynchronization.docx  Version: 2.0.18468

Page 2 of 2

