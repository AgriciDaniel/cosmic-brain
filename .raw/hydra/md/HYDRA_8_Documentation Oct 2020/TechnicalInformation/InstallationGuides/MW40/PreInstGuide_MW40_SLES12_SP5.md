HYDRA Documentation

HYDRA MW4.0pe
Preparation Guide for SLES12
SP5

Version 1.0.23049

Last changed on: 02.09.2020

Preparation Guide for SLES12 SP5

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of Oracle Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

PreInstGuide_MW40_SLES12_SP5.docx  Version: 1.0.23049

Page 2 of 19

Preparation Guide for SLES12 SP5

Contents

1

Introduction .................................................................................................. 4

2  Operating System ........................................................................................ 5

2.1  Administration Console PC ................................................................................ 16

2.2  Web Browser Software ...................................................................................... 16

3  Hard Disk Layout ........................................................................................ 17

4  Directories .................................................................................................. 18

5  Database ORACLE .................................................................................... 19

PreInstGuide_MW40_SLES12_SP5.docx  Version: 1.0.23049

Page 3 of 19

Preparation Guide for SLES12 SP5

1

Introduction

This configuration manual explains how to configure SUSE Linux Enterprise Server 12 SP5 (SLES12 SP5)

for  use  as  a  server  for  MPDVs  Manufacturing  Integration  Platform  (MIP)  based  products  like  MIP  1.1,

HYDRA MW4.0pe or FEDRA 1.1.

The  configuration  of  the  server  should  always  be  based  on  MPDVs  hardware  and  software

recommendations for the respective MIP based product.

See manuals: HW_SW_GUIDE.pdf

!ATTENTION!

The Server must be a dedicated server for running any MIP based products.

There  must  be  no  additional  functionality  used,  e.g.  like  File  Server,  Print  Server,  OPC  Server,

Domain Controller (PDC, BDC), Active Directory Controller or similar.

If  the  configuration  of  your  server  deviates  from  the  configuration  described  in  this  manual,

additional efforts and expenses might be necessary for the installation of MIP based products.

Already  agreed  shipping  or  installation  appointments  might  be  delayed  or  may  have  to  be

postponed.

MIP based products might not be able to work properly on such a server.

It might even be impossible to perform a successful installation on such a server.

It might not be possible to install different MIP based products on the same server.

PreInstGuide_MW40_SLES12_SP5.docx  Version: 1.0.23049

Page 4 of 19

Preparation Guide for SLES12 SP5

2  Operating System

  Server platform according to the hardware and software recommendations of MPDV Mikrolab GmbH

is required.

  The  version  of  your  operating  system  must  meet  the  recent  recommendations  of  MPDV  Mikrolab

GmbH. For the time being that is:

SUSE Linux Enterprise Server 12 SP5 (x86_64)  (SLES12 SP5)

  The server must be a dedicated server for running any MIP based product.

There must be no additional functionality be used, e.g. like File Server, Mail Server, Print Server, OPC

Server, Domain Controller (PDC, BDC), Active Directory Controller or similar.

In such cases it might be impossible to perform a successful installation of MIP based products.

  Set the system language as “English (US)”:

  Choose the keyboard layout according to your local environment, e.g. “German”:

  Agree to the License Terms:

  No “Add On Products” are required for use as a server for MIP based products:

PreInstGuide_MW40_SLES12_SP5.docx  Version: 1.0.23049

Page 5 of 19

Preparation Guide for SLES12 SP5

  System Role

To install the Oracle database software a graphic X-Window user interface (e.g. KDE or GNOME) is

mandatory. GNOME is the default desktop environment of SLES12.

Install system role “Default System”:

  Suggested Partitioning

For information about disk requirements and partitioning see chapter “3 Hard Disk Layout”.

All partitions except the swap partition must be formatted with file system type “ext3”.

Use the “Expert Partitioner” to set up the appropriate file systems:

  File Systems

All partitions except the swap partition must be formatted with file system type “ext3”.

e.g.:

  Swap Partition

Use file system type “swap”

The size of the swap partition must be at least 2 times of the size of the available amount of RAM,

e.g.: 64 GB swap space for 32 GB RAM

PreInstGuide_MW40_SLES12_SP5.docx  Version: 1.0.23049

Page 6 of 19

Preparation Guide for SLES12 SP5

  Region and Time Zone

Set Region and Time Zone according to the location of your server,

e.g.:

  Date and Time

Set checkbox for “Hardware Clock Set to UTC”

Set Date and Time according to your local date and time.

  Local User “mipadm”

The password for user “mipadm” should be set to "Mip74821".

Optionally any other password can be used which must then be disclosed to the MPDV employees who

are installing the MIP based product for you.

The following characters are not allowed for the password:

- Characters with ASCII Code > 126 (e.g. German umlauts, French “umlauts”, etc.)

- Pipe: |

- Ampersand: &

PreInstGuide_MW40_SLES12_SP5.docx  Version: 1.0.23049

Page 7 of 19

Preparation Guide for SLES12 SP5

  User “root”

The password for user "root" is free to choose.

Be  prepared  to  disclose  that  password  to  the  MPDV  employees  who  are  installing  the  MIP  based

product for you.

  Software packages for SLES12

Additional to the default software packages of SLES12 add the following packages:

"C/C++ Compiler and Tools" and "Oracle Server Base":

  Firewall

The local firewall must be disabled.

  OpenSSH is the required SSH software for Oracle Databases.

The SSH implementation coming with SUSE Linux Enterprise Server is OpenSSH.

Ensure that SSH is enabled on your server.

PreInstGuide_MW40_SLES12_SP5.docx  Version: 1.0.23049

Page 8 of 19

  Desktop Resolution

The desktop resolution should be set at least to 1024x768.

Preparation Guide for SLES12 SP5

The monitor must be configured to display at least 256 colors.

  Network Configuration

TCP/IP (IPv4) network protocol based on a Ethernet network must be available.

At least the following TCP/IP ports and port ranges must be available for MIP based products:

1521, 3300-3399, 3299, 8080, 9000-9005, 10000, 10100, 10103, 10111, 10120-10127, 10150, 10177,

18080, 30101-30108

If  these  ports  (especially  port  10000  for  HYDRA)  are  not  available  there  might  be  additional  efforts

necessary during the installation.

Additional ports  will be required when the MIP based product is supposed to be installed as a multi

system installation (e.g. HYDRA) or when additional functionality should be used.



IP address and hostname are free to choose.

It is mandatory that the MIP based product server uses a dedicated IP address.

It is not possible for the MIP server to receive its IP address from a DHCP server.

All other settings like subnet mask, name server, router or gateway, etc. must be set according to your

local network configuration.

  xinetd

The “Network Service Configuration (xinetd)” must be enabled:

PreInstGuide_MW40_SLES12_SP5.docx  Version: 1.0.23049

Page 9 of 19

Preparation Guide for SLES12 SP5



telnet, ftp

Depending on the system environment it might be necessary that one or more of the following services

must be activated in the Network Service Configuration (xinetd):

telnet (not necessary if connection type SSH (=Default) is to be used)

To activate telnet the installation-DVD, e.g. "SLE-12-SP5-Server-DVD-x86_64-GM-DVD1.iso", must be

available at the server to install the additional software package “telnet-server”.

ftp (required for exchanging files between MIP based products and 3rd party systems like ERP, DNC,

etc.)

  Modify file /etc/vsftpd.conf

Check that the following settings are enabled:

write_enable=YES

local_enable=YES

local_umask=022

listen=NO

Disable “listen_ipv6”:

# listen_ipv6=YES

  Modify file /etc/ftpusers

Enable FTP access for user oracle:

# oracle

  Group mip

A new group “mip” must be created.

The group ID (gid) can be set at your discretion.

  Group dba

In SLES12 the group “dba” should be available as default (set filter: “System Groups”).

If not, create it. The group ID (gid) can be set at your discretion.

PreInstGuide_MW40_SLES12_SP5.docx  Version: 1.0.23049

Page 10 of 19

Preparation Guide for SLES12 SP5

  User mipadm

Either create a new local user account “mipadm” (if not done already during the software installation,

see above) or edit the settings of the already existing user account “mipadm”.

The user ID (uid) can be set at your discretion.

The password for user “mipadm” is free to choose.

Be  prepared  to  disclose  that  password  to  the  MPDV  employees  who  are  installing  the  MIP  based

product for you.

Set “Home Directory” to /u1/mip1/sys (assuming the hard disk layout matches the recommendations

in chapter “3 Hard Disk Layout”).

The “Login Shell” must be set to /bin/mksh.

The user’s “Default Group” must be changed to "mip".



.profile

Add the following lines to the shell configuration file (/u1/mip1/sys/.profile) of user "mipadm":

HN=`uname -n`

export PS1='$HN:$LOGNAME:$PWD> '

set -o vi

  User oracle

In SLES12 there is a disabled user account “oracle” available as default (set filter: “System Users”).

The user account “oracle” must be enabled.

If there might be no such user account, create it. The user ID (uid) can be set at your discretion.

The password for user “oracle” is free to choose.

Be  prepared  to  disclose  that  password  to  the  MPDV  employees  who  are  installing  the  MIP  based

product for you.

Set “Home Directory” to /home/oracle (must not coincide with $ORACLE_BASE, e.g. /u1/oracle)

The “Login Shell” must be set to /bin/mksh.

The user’s “Default Group” must be changed to "dba".

Under “Additional Groups” add “oinstall” and “dba” as well.



.profile

Create the shell configuration file /home/oracle/.profile for the user “oracle” and add the following lines:

umask 022

HN=`uname -n`

export PS1='$HN:$LOGNAME:$ORACLE_SID:$PWD> '

set -o vi

cd $ORACLE_BASE

PreInstGuide_MW40_SLES12_SP5.docx  Version: 1.0.23049

Page 11 of 19

Preparation Guide for SLES12 SP5

  System Console

All users must have write permission on the system console:

chmod 666 /dev/console

  Tape Drive (if available)

Access to the tape device (e.g.: /dev/st0 or /dev/rmt0) must be available for all user accounts, e.g.:

chmod 777 /dev/st0

  Message Queues

The amount of available message queues must be > 64.

Check with command "ipcs -l":

------ Messages Limits --------

max queues system wide = 32000

  System Activity

For use of the system activity report tools sar and iostat the software package sysstat is necessary

(in SLES12 available by default).

PreInstGuide_MW40_SLES12_SP5.docx  Version: 1.0.23049

Page 12 of 19

  Kernel Parameter

The necessary kernel parameters are set by the package "orarun" provided by "Oracle Server Base".

Preparation Guide for SLES12 SP5

Therefore the following files need to be configured:

/etc/sysconfig/oracle

ORACLE_BASE=/u1/oracle

START_ORACLE_DB="yes"

START_ORACLE_DB_LISTENER="yes"

START_ORACLE_DB_EMANAGER="yes"

SHMMAX= Recommended: SHMMAX = 0.5*(physical memory)

example for 24GB RAM: SHMMAX=12884901888

  do not use values smaller than SHMMAX=4294967295

/etc/profile.d/oracle.sh

ORACLE_BASE=/u1/oracle

  ORACLE_HOME=$ORACLE_BASE/ora19

  ORACLE_SID=MIP1

Check that the following settings are disabled:

  # export ORA_CRS_HOME=$ORACLE_BASE/product/12cR1/crs

  # export ORA_ASM_HOME=$ORACLE_BASE/product/12cR1/asm

/etc/profile.d/oracle.csh

setenv ORACLE_BASE /u1/oracle

  setenv ORACLE_HOME ${ORACLE_BASE}/ora19

  setenv ORACLE_SID MIP1

Check that the following settings are disabled:

  # setenv ORA_CRS_HOME ${ORACLE_BASE}/product/12cR1/crs

  # setenv ORA_ASM_HOME ${ORACLE_BASE}/product/12cR1/asm

  Activate the new kernel parameters by running the following command as user “root”:

cd /etc/init.d

./oracle start

PreInstGuide_MW40_SLES12_SP5.docx  Version: 1.0.23049

Page 13 of 19

Preparation Guide for SLES12 SP5

  Check the current size of your shared memory file system /dev/shm (use command df -h).

Filesystem      Size  Used Avail Use% Mounted on

tmpfs            12G   80K   12G   1% /dev/shm

The  shared  memory

file  system

/dev/shm  must  be  big  enough

to  accommodate

the

MEMORY_TARGET and MEMORY_MAX_TARGET values of all installed database instances.

Otherwise Oracle will throw the following error message:

“ORA-00845: MEMORY_TARGET not supported on this system”.

To adjust the shared memory file system size add the following line to the file "/etc/fstab":

Make sure that the value for “size=” suits your system settings.

tmpfs

/dev/shm

tmpfs

size=24g

0 0

Reboot your server afterwards.

  Software Packages

The following software packages need to be installed manually as user root because they are not part

of the default installation of SLES12 SP5:

yast --install libjpeg-turbo

yast --install libjpeg62

yast --install libjpeg62-turbo

yast --install pixz

yast --install rdma-core

The installation-DVD, e.g. "SLE-12-SP5-Server-DVD-x86_64-GM-DVD1.iso", must be available at the

server.

  The latest released versions of the following packages are required by Oracle 19c (see Oracle database

installation guide “19c for Linux”).

All packages are part of a default SLES12 SP5 installation except those specially marked.

To check which packages are installed use “rpm –qa <package-name>”:

bc

binutils

glibc

glibc-devel

libX11

libXau6

libXtst6

libcap-ng-utils

libcap-ng0

libcap-progs

PreInstGuide_MW40_SLES12_SP5.docx  Version: 1.0.23049

Page 14 of 19

Preparation Guide for SLES12 SP5

libcap1

libcap2

libelf-devel

libgcc_s1

libjpeg-turbo

libjpeg62

(not installed as default in SLES12 SP5, see above)

(not installed as default in SLES12 SP5, see above)

libjpeg62-turbo

(not installed as default in SLES12 SP5, see above)

libpcap1

libpcre1

libpcre16-0

libpng16-16

libstdc++6

libtiff5

libaio-devel

libaio1

libXrender1

make

mksh

net-tools (for Oracle RAC and Oracle Clusterware)

nfs-kernel-server (for Oracle ACFS)

(not installed as default in SLES12 SP5, see above)

(not installed as default in SLES12 SP5, see above)

pixz

rdma-core

smartmontools

sysstat

xorg-x11-libs

xz

PreInstGuide_MW40_SLES12_SP5.docx  Version: 1.0.23049

Page 15 of 19

Preparation Guide for SLES12 SP5

2.1  Administration Console PC

With a MIP based product running on a Linux server you must have a dedicated Windows PC available

where certain administration tools and certain client software like the MES Operation Center (MOC) or the

APS Operation Center (AOC) will be installed.

That Windows PC will serve as access point for remote support sessions by MPDV Mikrolab GmbH.

The Administration Console PC is mandatory for all support and maintenance purposes by MPDV!

The Windows operating system of this PC should meet the requirements for the HYDRA client software

MES Operation Center (MOC), e.g. Windows 10 64bit.

For more detailed information please see the hardware and software recommendations of MPDV Mikrolab

GmbH: HW_SW_GUIDE.pdf

2.2  Web Browser Software

If  you plan to use  MPDV’s product  Smart MES Applications (SMA) version  8.2  you must be aware that

Microsoft’s Internet Explorer (IE) is no longer supported by MPDV.

You  need  to  provide  an  alternative  web  browser  software  like  Google  Chrome  which  is  MPDV’s

recommended web browser software for using SMA 8.2.

Please make sure that Google Chrome is installed on your Administration Console PC.

PreInstGuide_MW40_SLES12_SP5.docx  Version: 1.0.23049

Page 16 of 19

Preparation Guide for SLES12 SP5

3  Hard Disk Layout

The storage demand of a MIP based system and its database usually increases over time.

Therefore the available disk storage should be large enough right from the start.

For a MIP based system we recommend the following hard disk capacity to be available:

200 GB for the MIP based application including possible archive data to be generated in the future

400 GB for the MIP based product database (default configuration)

Apart from sufficiently large root (≥ 50 GB) and swap (size = 2 x RAM) partitions there should be at least

another partition with file system /u1 available which must provide the above mentioned disk capacity of at

least 600 GB.

If there are additional hard disks and partitions available, e.g. like /u2, /u3, /u4, /u5 etc., the data files for

the MIP based product database could be spread for performance reasons.

When using online backup solutions for the database software the use of a dedicated hard disk and file

system is highly recommended.

All partitions except the swap partition must be formatted with file system type ext3.

Configuration example for a SLES12 server with 5 hard disks (each 500GB in size):

1. hard disk:

/

50 GB

Standard root file system

swap

2 x RAM

Swap Partition

/u1

~350 GB

MIP based product and database application

2. hard disk:

/u2

500 GB

database data files

3. hard disk:

/u3

500 GB

database data files

4. hard disk:

/u4

500 GB

database data files

5. hard disk (additional disk for online backup solutions):

/u5

500 GB

backup files for online backup solutions

PreInstGuide_MW40_SLES12_SP5.docx  Version: 1.0.23049

Page 17 of 19

Preparation Guide for SLES12 SP5

4  Directories

Directory /u1/mip1 must be set to owner mipadm and group mip

chown mipadm:mip /u1/mip1

The access permissions must be set to 775, e.g.:

chmod 775 /u1/mip1

drwxrwxr-x 3 mipadm mip   4096 Jan 28 16:05 mip1

Create a new directory /u1/export

mkdir /u1/export

Directory /u1/export must be set to owner mipadm and group mip

chown mipadm:mip /u1/export

The access permissions must be set to 775, e.g.:

chmod 775 /u1/export

drwxrwxr-x 2 mipadm mip   4096 Jan 28 16:30 export

Create new directories /u1/oracle, /u2/oracle, /u3/oracle, /u4/oracle, /u5/oracle, etc.

mkdir /u1/oracle, etc.

All directories /u1/oracle, /u2/oracle, /u3/oracle, /u4/oracle, /u5/oracle, etc. must be set to owner oracle

and group dba e.g.:

chown oracle:dba /u1/oracle, etc.

The access permissions should be set to 755 by default, e.g.:

chmod 755 /u1/oracle, etc.

drwxr-xr-x 2 oracle dba    4096 Dec  8 12:39 /u1/oracle

Access permission for all directories /u1, /u2, /u3, etc. must be set to 777, e.g.:

chmod 777 /u1

drwxrwxrwx  14 root root  4096 Dec  1 16:19 u1

PreInstGuide_MW40_SLES12_SP5.docx  Version: 1.0.23049

Page 18 of 19

Preparation Guide for SLES12 SP5

5  Database ORACLE

For information about currently supported database versions please consult the recent recommendations

regarding hardware and software by MPDV Mikrolab GmbH.

If  the  Oracle  database  software  is  supposed  to  be  preinstalled  by  the  customer  himself,  please

contact MPDV Mikrolab GmbH first.

You will then be provided with the proper database installation and configuration manual(s) which will allow

you to do the installation and configuration according to the needs of the MIP based product.

If you plan to have separate application and database servers the 64Bit Oracle client software needs to be

installed on the MIP application server.

All MIP based product databases are supposed to use the character set AL32UTF8.

The use of other character sets is not supported and may cause problems with the MIP based application.

The Archive Log Mode for Oracle databases installed by MPDV Mikrolab GmbH is deactivated by default.

This will prevent an unnoticed overflow of file systems and therefore the halt of all database functionality.

The Archive Log Mode will be activated by MPDV Mikrolab GmbH on special request by the customer only.

When using online backup solutions with an activated Archive Log Mode the use of a dedicated hard disk

to store Oracle’s archive log files is highly recommended.

See chapter “3 Hard Disk Layout”.

PreInstGuide_MW40_SLES12_SP5.docx  Version: 1.0.23049

Page 19 of 19

