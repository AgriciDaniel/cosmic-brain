HYDRA Documentation

Installation Guide Oracle 19c
for SLES12
for HYDRA MW4.0pe

Version 1.0.23049

Last changed on: 02.09.2020

Installation Guide Oracle 19c for SLES12

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of Oracle Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 2 of 39

Installation Guide Oracle 19c for SLES12

Contents

1

Introduction .................................................................................................. 4

2

Installation Requirements ............................................................................. 5

3

Installing Oracle 19c Database .................................................................... 7

3.1  Preinstallation Tasks ........................................................................................... 7

3.2  Database Software Installation .......................................................................... 12

4

Installing Oracle Patch Set ......................................................................... 20

5  Post Installation Configuration ................................................................... 21

6  MIP Database ............................................................................................ 23

6.1  Create MIP Database ........................................................................................ 24

6.2  Check Database Connection ............................................................................. 31

6.3  Check Oracle Listener ....................................................................................... 32

6.4  Check Automatic Startup Database ................................................................... 33

6.5  Check Oracle Enterprise Manager .................................................................... 34

7  Oracle 64Bit Client on Application Server .................................................. 35

8  Post installation configuration .................................................................... 38

8.1

tnsnames.ora .................................................................................................... 38

9  Additional Documents ................................................................................ 39

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 3 of 39

Installation Guide Oracle 19c for SLES12

1

Introduction

Attention:

To  perform  the  following  procedures  advanced  knowledge  of  your  server  operating  system,  the

intended database software and common IT systems is required.

These procedures are performed on your own responsibility.

MPDV Mikrolab GmbH is not liable for any loss of or destruction of data.

In case of doubt place an order with MPDV Mikrolab GmbH to perform these tasks for you.

This manual explains how to install an Oracle Database 19c (19.3.0.0.0) on a server with a SUSE Linux

Enterprise Server 12 SP5 (SLES12 SP5) operating system for use with MPDVs Manufacturing Integration

Platform (MIP) based products like MIP 1.1, HYDRA MW4.0pe or FEDRA 1.1.

Other than MIP the applications HYDRA and FEDRA allow for a multi system installation (multiple HYDRA

or FEDRA systems on the same (application) server).

For multi system installations every HYDRA or FEDRA system needs its own database.

Name your databases mip1, mip2, mip3, etc.

With  multi  system  installations  it  is  strongly  recommended  that  every  database  has  its  own  database

instance available, e.g.: MIP1, MIP2, MIP3, etc.

If the database installation is meant as preliminary installation for MPDV personnel to install a MIP based

product on  your server  you can stop as soon as  you are finished with chapter “5 Installing Oracle 32Bit

Client”.

Attention: Do not run these installation procedures on a computer where MIP based products like MIP 1.1,

HYDRA MW4.0pe or FEDRA 1.1 are already running.

By doing so, you might destroy your existing MIP based system.

Please be extremely cautious if you decide to do it anyway.

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 4 of 39

Installation Guide Oracle 19c for SLES12

2

Installation Requirements

  Server hardware and software according to the recommendations of MPDV Mikrolab GmbH for the

respective MIP based product.

See manuals: HW_SW_GUIDE.pdf

  English operating system:

SUSE Linux Enterprise Server 12 SP5 (x86_64)



Important:  Server  configuration  according  to  MPDVs  server  configuration  manuals  for  the

respective MIP based product, e.g.:

"Preparation Guide for SLES12 SP5" (e.g.: PreInstGuide_MW40_SLES12_SP5.pdf)



Installation files for the required edition of "Oracle Database 19c (19.3) for Linux x86-64”

LINUX.X64_193000_db_home.zip

Link: https://www.oracle.com/database/technologies/oracle19c-linux-downloads.html



Installation files for the client software " Oracle Database 19c Client (19.3) for Linux x86-64"

LINUX.X64_193000_client_home.zip

Link:

http://www.oracle.com/technetwork/database/enterprise-edition/downloads/database19c-

linux-download-2240591.html

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 5 of 39

Installation Guide Oracle 19c for SLES12

  Minimum hard disk configuration:

Partition \ (root) with a minimum of 100 GB disk space available and file system EXT3 for the

LINUX installation

Partition \u1 with a minimum of 200 GB disk space available and file system EXT3 for the

installation of the MIP based product

Partition \u2 with a minimum of 400 GB disk space available and file system EXT3 for database

data (default configuration)

  Note: If you are using a different disk layout you must make sure that it matches the configuration

used in the database installation scripts (see chapter 6.1 Create MIP Database).

  Screen resolution with min. 1024x768 pixel.

  Local LINUX users mipadm and oracle must be available.

(see server configuration manual, e.g. PreInstGuide_MW40_SLES12_SP5.pdf)

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 6 of 39

Installation Guide Oracle 19c for SLES12

3

Installing Oracle 19c Database

3.1  Preinstallation Tasks

Login as user "root".

Check the file /etc/hosts

If there is the hostname with the IP-address 127.0.0.2 in /etc/hosts deactivate or delete that line, e.g.:

# 127.0.0.2       linux01.mpdv.local linux01

Make sure that /etc/hosts contains the hostname of your server with its correct IP-Address, e.g.:

192.168.20.232       linux01.mpdv.local linux01

Edit the following files belonging to the software package orarun:

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

Activate the new kernel parameters by running the following command as user root:

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 7 of 39

Installation Guide Oracle 19c for SLES12

cd /etc/init.d

./oracle start

Check the actual kernel parameter with the following commands:

/sbin/sysctl -a | grep aio-max-nr

/sbin/sysctl -a | grep file-max

/sbin/sysctl -a | grep shm

/sbin/sysctl -a | grep sem

/sbin/sysctl -a | grep ip_local_port_range

/sbin/sysctl -a | grep rmem_default

/sbin/sysctl -a | grep rmem_max

/sbin/sysctl -a | grep wmem_default

/sbin/sysctl -a | grep wmem_max

/sbin/sysctl -a | grep kernel.panic_on_oops

The following values must be set at least to:

fs.aio-max-nr = 1048576

fs.file-max = 6815744

kernel.shmmax = minimum 4294967295 or more

kernel.shmall = 2097152

kernel.shmmni = 4096

kernel.sem = 1250  32000 100  256

net.ipv4.ip_local_port_range = 9000 65535

net.core.rmem_default = 262144

net.core.rmem_max = 4194304

net.core.wmem_default = 262144

net.core.wmem_max = 1048576

kernel.panic_on_oops = 1

If the actual values are too small or missing completely then they must be set in the file:

/etc/sysctl.conf

Edit the file and add the desired parameter(s), e.g.:

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 8 of 39

Installation Guide Oracle 19c for SLES12

kernel.shmmax = 4294967295

net.ipv4.ip_local_port_range = 9000 65535

kernel.panic_on_oops = 1

After editing the file it has to be ensured that the SUSE Enterprise Server will read the file /etc/sysctl.conf

and that the changes are available in the  active kernel memory:

/sbin/sysctl -p

With the following command you can check if the values are set correctly:

/sbin/sysctl –a

Login as user "oracle" at the KDE desktop.

Do not "su – oracle" from another user account!

Copy the installation file LINUX.X64_193000_db_home.zip to the directory $ORACLE_HOME on the

server, e.g. to: /u1/oracle/ora19

cp /u1/install/LINUX.X64_193000_db_home.zip /u1/oracle/ora19

Unzip the installation file to your intended ORACLE_HOME location, e.g. /u1/oracle/ora19:

cd /u1/oracle/ora19

unzip LINUX.X64_193000_db_home.zip

Change the following settings inside /u1/oracle/ora19/cv/cvdata/cvu_prereq.xml

Delete the following lines:

<PACKAGE NAME="gcc-c++" VALUE="4.8" SEVERITY="IGNORABLE" ARCHITECTURE="x86_64"/>

<PACKAGE NAME="libstdc++33" VALUE="3.3.3-62.1" SEVERITY="CRITICAL" ARCHITECTURE="x86_64"/>

<PACKAGE NAME="gcc-c++" VALUE="7" SEVERITY="IGNORABLE" ARCHITECTURE="x86_64"/>

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 9 of 39

Installation Guide Oracle 19c for SLES12

<PACKAGE NAME="libstdc++33" VALUE="3.3.3-62.1" SEVERITY="CRITICAL"/>

<PACKAGE NAME="gcc-c++-32bit" VALUE="7-1.563" SEVERITY="IGNORABLE"/>

<PACKAGE NAME="gcc-c++" VALUE="7-1.563" SEVERITY="IGNORABLE"/>

<PACKAGE NAME="gcc-32bit" VALUE="7-1.563" SEVERITY="IGNORABLE"/>

<PACKAGE NAME="gcc" VALUE="7-1.563" SEVERITY="IGNORABLE"/>

<PACKAGE NAME="JDK" VALUE="1.8.0.5.151" SEVERITY="IGNORABLE"/>

Edit the following lines:

<PACKAGE NAME="libstdc++6" VALUE="4.8.3"  SEVERITY="IGNORABLE"/> to "CRITICAL"

<PACKAGE NAME="libstdc++6" VALUE="7.3.1" SEVERITY="IGNORABLE"/> to "CRITICAL"

<PACKAGE NAME="libpcre16" VALUE="0-8.41" SEVERITY="IGNORABLE"/> to

<PACKAGE NAME="libpcre16-0" VALUE="8.41" SEVERITY="IGNORABLE"/>

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 10 of 39

Installation Guide Oracle 19c for SLES12

Note: Alternatively the installation can be executed remotely.

Therefore a X-Windows program must run on the executing desktop PC (e.g. Xming).

After that a connection via putty must be initiated to the appropriate system.

In the "Session settings" the checkbox "Enable X11 forwarding" must be set.

For testing purpose you can start the program "xclock".

You should see the following window appearing at your PC.

Now you can start the installation as described below.

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 11 of 39

Installation Guide Oracle 19c for SLES12

3.2  Database Software Installation

Before starting the installation of the Oracle database software it is recommended to review the standard

installation  documentation  from  Oracle.  Especially  regarding  the  topic  installation  of  multiple  Oracle

database and client versions of the same hardware, e.g.:

https://docs.oracle.com/en/database/oracle/oracle-database/19/ladbi/database-installation-guide-linux.pdf

https://docs.oracle.com/en/database/oracle/oracle-database/19/lacli/database-client-installation-guide-

linux.pdf

This document only covers the installation of the Oracle 19c database software on a system without any

other installed versions.

Unzip

the  Oracle

installation

file

to

your

intended  ORACLE_HOME

location

({hostname}:oracle:MIP1:/u1/oracle/ora19):

After the extraction of the Oracle ZIP file you have to adapt the Oracle database response file before you

can proceed with the installation.

The installation will be executed as a silent installation.

The response file is stored at:

/u1/mip1/db_sql/oracle19/linux/db_inst/ora19db_inst.rsp

Before you could  proceed with the installation some (red) values must be checked.

The preconfigured values comply to the MPDV recommendations.

Dissenting installations could be performed in charge of the customer.

####################################################################
  ##
## Copyright(c) Oracle Corporation 1998,2019. All rights reserved.
##
  ##
## Specify values for the variables listed below to customize                                     ##
## your installation.                                                                                                      ##
##                                                                                                                                 ##
## Each variable is associated with a comment. The comment
                  ##
## can help to populate the variables with the appropriate                                         ##
## values.                                                                                                                    ##
##                                                                                                                                ##
## IMPORTANT NOTE: This file contains plain text passwords and                          ##
## should be secured to have read permission only by oracle user                           ##

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 12 of 39

Installation Guide Oracle 19c for SLES12

## or db administrator who owns this installation.                                                      ##
##                                                                                                                                ##
####################################################################

#------------------------------------------------------------------------------
# Do not change the following system generated value.
#------------------------------------------------------------------------------
oracle.install.responseFileVersion=/oracle/install/rspfmt_dbinstall_response_schema_v19.0.0

#-------------------------------------------------------------------------------
# Specify the installation option.
# It can be one of the following:
#   - INSTALL_DB_SWONLY
#   - INSTALL_DB_AND_CONFIG
#-------------------------------------------------------------------------------
oracle.install.option=INSTALL_DB_SWONLY

#-------------------------------------------------------------------------------
# Specify the Unix group to be set for the inventory directory.
#-------------------------------------------------------------------------------
UNIX_GROUP_NAME=oinstall

#-------------------------------------------------------------------------------
# Specify the location which holds the inventory files.
# This is an optional parameter if installing on
# Windows based Operating System.
#-------------------------------------------------------------------------------
INVENTORY_LOCATION=/u1/oraInventory

#-------------------------------------------------------------------------------
# Specify the complete path of the Oracle Base.
#-------------------------------------------------------------------------------
ORACLE_BASE=/u1/oracle

#-------------------------------------------------------------------------------
# Specify the installation edition of the component.
#
# The value should contain only one of these choices.

#   - EE     : Enterprise Edition

#   - SE2     : Standard Edition 2

#-------------------------------------------------------------------------------

oracle.install.db.InstallEdition=SE2
###############################################################################
#
# PRIVILEGED OPERATING SYSTEM GROUPS
# ------------------------------------------
# Provide values for the OS groups to which SYSDBA and SYSOPER privileges
# needs to be granted. If the install is being performed as a member of the
# group "dba", then that will be used unless specified otherwise below.
#
# The value to be specified for OSDBA and OSOPER group is only for UNIX based
# Operating System.
#
###############################################################################

#
#
#
#
                #
#
#
#
#
#

#------------------------------------------------------------------------------
# The OSDBA_GROUP is the OS group which is to be granted SYSDBA privileges.
#-------------------------------------------------------------------------------
oracle.install.db.OSDBA_GROUP=dba

#------------------------------------------------------------------------------

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 13 of 39

Installation Guide Oracle 19c for SLES12

# The OSOPER_GROUP is the OS group which is to be granted SYSOPER privileges.
# The value to be specified for OSOPER group is optional.
#------------------------------------------------------------------------------
oracle.install.db.OSOPER_GROUP=dba

#------------------------------------------------------------------------------
# The OSBACKUPDBA_GROUP is the OS group which is to be granted SYSBACKUP privileges.
#------------------------------------------------------------------------------
oracle.install.db.OSBACKUPDBA_GROUP=dba

#------------------------------------------------------------------------------
# The OSDGDBA_GROUP is the OS group which is to be granted SYSDG privileges.
#------------------------------------------------------------------------------
oracle.install.db.OSDGDBA_GROUP=dba

#------------------------------------------------------------------------------
# The OSKMDBA_GROUP is the OS group which is to be granted SYSKM privileges.
#------------------------------------------------------------------------------
oracle.install.db.OSKMDBA_GROUP=dba

#------------------------------------------------------------------------------
# The OSRACDBA_GROUP is the OS group which is to be granted SYSRAC privileges.
#------------------------------------------------------------------------------
oracle.install.db.OSRACDBA_GROUP=dba
################################################################################
           #
#
           #
#                      Root script execution configuration
#
           #
################################################################################

#-------------------------------------------------------------------------------------------------------
# Specify the root script execution mode.
#
#   - true  : To execute the root script automatically by using the appropriate configuration methods.
#   - false : To execute the root script manually.
#
# If this option is selected, password should be specified on the console.
#-------------------------------------------------------------------------------------------------------
oracle.install.db.rootconfig.executeRootScript=true

#--------------------------------------------------------------------------------------
# Specify the configuration method to be used for automatic root script execution.
#
# Following are the possible choices:
#   - ROOT
#   - SUDO
#--------------------------------------------------------------------------------------
oracle.install.db.rootconfig.configMethod=ROOT
#--------------------------------------------------------------------------------------
# Specify the absolute path of the sudo program.
#
# Applicable only when SUDO configuration method was chosen.
#--------------------------------------------------------------------------------------
oracle.install.db.rootconfig.sudoPath=

#--------------------------------------------------------------------------------------
# Specify the name of the user who is in the sudoers list.
# Applicable only when SUDO configuration method was chosen.
#  Note:For  Single  Instance  database  installations,the  sudo  user  name  must  be  the  username  of  the  user  installing  the
database.
#--------------------------------------------------------------------------------------
oracle.install.db.rootconfig.sudoUserName=

###############################################################################
#
          #
#                               Grid Options                                                                                                       #
#                                                                                                                                                          #

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 14 of 39

Installation Guide Oracle 19c for SLES12

###############################################################################

#------------------------------------------------------------------------------
# Value is required only if the specified install option is INSTALL_DB_SWONLY
#
# Specify the cluster node names selected during the installation.
#
# Example : oracle.install.db.CLUSTER_NODES=node1,node2
#------------------------------------------------------------------------------
oracle.install.db.CLUSTER_NODES=

###############################################################################
         #
#
         #
#                        Database Configuration Options
         #
#
###############################################################################

#-------------------------------------------------------------------------------
# Specify the type of database to create.
# It can be one of the following:
#   - GENERAL_PURPOSE
#   - DATA_WAREHOUSE
# GENERAL_PURPOSE: A starter database designed for general purpose use or transaction-heavy applications.
# DATA_WAREHOUSE : A starter database optimized for data warehousing applications.
#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.type=GENERAL_PURPOSE

#-------------------------------------------------------------------------------
# Specify the Starter Database Global Database Name.
#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.globalDBName=

#-------------------------------------------------------------------------------
# Specify the Starter Database SID.
#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.SID=

#-------------------------------------------------------------------------------
# Specify whether the database should be configured as a Container database.
# The value can be either "true" or "false". If left blank it will be assumed
# to be "false".
#-------------------------------------------------------------------------------
oracle.install.db.ConfigureAsContainerDB=false

#-------------------------------------------------------------------------------
# Specify the  Pluggable Database name for the pluggable database in Container Database.
#-------------------------------------------------------------------------------
oracle.install.db.config.PDBName=

#-------------------------------------------------------------------------------
# Specify the Starter Database character set.
#
#  One of the following
#  AL32UTF8, WE8ISO8859P15, WE8MSWIN1252, EE8ISO8859P2,
#  EE8MSWIN1250, NE8ISO8859P10, NEE8ISO8859P4, BLT8MSWIN1257,
#  BLT8ISO8859P13, CL8ISO8859P5, CL8MSWIN1251, AR8ISO8859P6,
#  AR8MSWIN1256, EL8ISO8859P7, EL8MSWIN1253, IW8ISO8859P8,
#  IW8MSWIN1255, JA16EUC, JA16EUCTILDE, JA16SJIS, JA16SJISTILDE,
#  KO16MSWIN949, ZHS16GBK, TH8TISASCII, ZHT32EUC, ZHT16MSWIN950,
#  ZHT16HKSCS, WE8ISO8859P9, TR8MSWIN1254, VN8MSWIN1258
#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.characterSet=

#------------------------------------------------------------------------------
# This variable should be set to true if Automatic Memory Management
# in Database is desired.
# If Automatic Memory Management is not desired, and memory allocation

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 15 of 39

Installation Guide Oracle 19c for SLES12

# is to be done manually, then set it to false.
#------------------------------------------------------------------------------
oracle.install.db.config.starterdb.memoryOption=false

#-------------------------------------------------------------------------------
# Specify the total memory allocation for the database. Value(in MB) should be
# at least 256 MB, and should not exceed the total physical memory available
# on the system.
# Example: oracle.install.db.config.starterdb.memoryLimit=512
#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.memoryLimit=

#-------------------------------------------------------------------------------
# This variable controls whether to load Example Schemas onto
# the starter database or not.
# The value can be either "true" or "false". If left blank it will be assumed
# to be "false".
#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.installExampleSchemas=false

###############################################################################
         #
#
         #
# Passwords can be supplied for the following four schemas in the
         #
# starter database:
         #
#   SYS
         #
#   SYSTEM
         #
#   DBSNMP (used by Enterprise Manager)
         #
#
         #
# Same password can be used for all accounts (not recommended)
         #
# or different passwords for each account can be provided (recommended)
#
         #
###############################################################################

#------------------------------------------------------------------------------
# This variable holds the password that is to be used for all schemas in the
# starter database.
#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.password.ALL=

#-------------------------------------------------------------------------------
# Specify the SYS password for the starter database.
#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.password.SYS=

#-------------------------------------------------------------------------------
# Specify the SYSTEM password for the starter database.
#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.password.SYSTEM=

#-------------------------------------------------------------------------------
# Specify the DBSNMP password for the starter database.
# Applicable only when oracle.install.db.config.starterdb.managementOption=CLOUD_CONTROL
#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.password.DBSNMP=

#-------------------------------------------------------------------------------
# Specify the PDBADMIN password required for creation of Pluggable Database in the Container Database.
#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.password.PDBADMIN=

#-------------------------------------------------------------------------------
# Specify the management option to use for managing the database.
# Options are:
# 1. CLOUD_CONTROL - If you want to manage your database with Enterprise Manager Cloud Control along with Database
Express.
# 2. DEFAULT   -If you want to manage your database using the default Database Express option.
#-------------------------------------------------------------------------------

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 16 of 39

Installation Guide Oracle 19c for SLES12

oracle.install.db.config.starterdb.managementOption=DEFAULT

#-------------------------------------------------------------------------------
# Specify the OMS host to connect to Cloud Control.
# Applicable only when oracle.install.db.config.starterdb.managementOption=CLOUD_CONTROL
#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.omsHost=

#-------------------------------------------------------------------------------
# Specify the OMS port to connect to Cloud Control.
# Applicable only when oracle.install.db.config.starterdb.managementOption=CLOUD_CONTROL
#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.omsPort=0

#-------------------------------------------------------------------------------
# Specify the EM Admin user name to use to connect to Cloud Control.
# Applicable only when oracle.install.db.config.starterdb.managementOption=CLOUD_CONTROL
#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.emAdminUser=

#-------------------------------------------------------------------------------
# Specify the EM Admin password to use to connect to Cloud Control.
# Applicable only when oracle.install.db.config.starterdb.managementOption=CLOUD_CONTROL
#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.emAdminPassword=

###############################################################################
         #
#
         #
# SPECIFY RECOVERY OPTIONS
         #
# ------------------------------------
         #
# Recovery options for the database can be mentioned using the entries below
#
         #
###############################################################################

#------------------------------------------------------------------------------
# This variable is to be set to false if database recovery is not required. Else
# this can be set to true.
#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.enableRecovery=false

#-------------------------------------------------------------------------------
# Specify the type of storage to use for the database.
# It can be one of the following:
#   - FILE_SYSTEM_STORAGE
#   - ASM_STORAGE
#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.storageType=

#-------------------------------------------------------------------------------
# Specify the database file location which is a directory for datafiles, control
# files, redo logs.
#
# Applicable only when oracle.install.db.config.starterdb.storage=FILE_SYSTEM_STORAGE
#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.fileSystemStorage.dataLocation=

#-------------------------------------------------------------------------------
# Specify the recovery location.
#
# Applicable only when oracle.install.db.config.starterdb.storage=FILE_SYSTEM_STORAGE
#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.fileSystemStorage.recoveryLocation=

#-------------------------------------------------------------------------------
# Specify the existing ASM disk groups to be used for storage.
#
# Applicable only when oracle.install.db.config.starterdb.storageType=ASM_STORAGE

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 17 of 39

Installation Guide Oracle 19c for SLES12

#-------------------------------------------------------------------------------
oracle.install.db.config.asm.diskGroup=

#-------------------------------------------------------------------------------
# Specify the password for ASMSNMP user of the ASM instance.
#
# Applicable only when oracle.install.db.config.starterdb.storage=ASM_STORAGE
#-------------------------------------------------------------------------------
oracle.install.db.config.asm.ASMSNMPPassword=

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 18 of 39

Installation Guide Oracle 19c for SLES12

Change to the ORACLE_HOME directory (e.g. cd /u1/oracle/ora19)

Start the installation:

./runInstaller -silent -noconfig -responseFile

/u1/mip1/db_sql/oracle19/linux/db_inst/ora19db_inst.rsp

During the installation you will be asked for the “root” password

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 19 of 39

Installation Guide Oracle 19c for SLES12

4

Installing Oracle Patch Set

The latest Oracle patch set approved by MPDV Mikrolab GmbH must be installed.

Version: currently there is no approved patch set to be installed

Please take note of the "Patch Set Notes" delivered with the patch set.

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 20 of 39

Installation Guide Oracle 19c for SLES12

5  Post Installation Configuration

To perform the following steps either the MIP based application software must already be available

on the server or the following files must be provided to you by MPDV or you need to create those

files from scratch!

Starting with HYDRA MW4.0pe every instance will have an own Oracle Listener configuration.

Logon to the (database) server as local user “oracle”.

Copy

the

following

files

from

directory

/u1/mip1/db_sql/oracle19/network/

to

$ORACLE_HOME/network/admin (e.g. /u1/oracle/ora19/network/admin):

listener.ora

sqlnet.ora

tnsnames.ora

cp /u1/mip1/db_sql/oracle19/linux/network/* /u1/oracle/ora19/network/admin

Check the configuration file for the Oracle Listener and change contents where necessary, e.g. hostname

for the server:

$ORACLE_HOME/network/admin/listener.ora

Attention: For (“HOST = ’SERVERNAME’) use the hostname instead of the IP address.

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 21 of 39

Check the network configuration file “$ORACLE_HOME/network/admin/tnsnames.ora” and change  its

contents where necessary:

Installation Guide Oracle 19c for SLES12

Check the network configuration file “$ORACLE_HOME/network/admin/sqlnet.ora”

Change the access permissions to the files like follows:

chmod 644 listener.ora

chmod 644 sqlnet.ora

chmod 644 tnsnames.ora

For additional instances (e.g. MIP2, MIP3 etc.) and additional databases (e.g. mip2, mip3 etc.) repeat the

above mentioned steps.

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 22 of 39

Installation Guide Oracle 19c for SLES12

6  MIP Database

Every MIP system needs its own MIP database.

Every MIP database needs its own database instance.

Name your MIP databases “mip1”, “mip2”, “mip3”, etc.

Name your MIP database instances “MIP1”, “MIP2”, “MIP3”, etc.

Do not proceed with this chapter if the database installation was meant as preliminary installation

for MPDV personnel to install a MIP based product on your server.

Before  you  might  proceed  with  creating  the  MIP  database(s)  on  your  own  you  need  to  have  four  files

available for each MIP database and database instance you want to create.

Example files for MIP database and database instance 1:

CreateMIP1_ora19_lin.sql

MIP1_ora19_lin.sh

MIP1_ora19_lin.sql

initMIP1.ora

Either those files were provided to  you in advance by MPDV or  you might have the HYDRA application

installed at least as far as chapter “4.5 HYDRA Database” according to the HYDRA installation manual:

InstallationGuide_MW40_SLES12.pdf

Note:

The installation manual for HYDRA MW4.0pe will be provided to selected customers only.

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 23 of 39

Installation Guide Oracle 19c for SLES12

6.1  Create MIP Database

Attention:

Do not run these  installation procedures on a computer where  a MIP based product  is already running.

By doing so, you might destroy your existing MIP based system.

Please be extremely cautious if you decide to do it anyway.

Logon to the server where the database is locate as local the user “oracle”.

Copy the following four files into the directory $ORACLE_HOME/dbs, e.g. /u1/oracle/ora19/dbs.

CreateMIP1_ora19_lin.sql

MIP1_ora19_lin.sh

MIP1_ora19_lin.sql

initMIP1.ora

If those files were provided to you by MPDV in advance make sure to copy them to the destination

directory, e.g. /u1/oracle/ora19/dbs.

If the HYDRA application might already be installed at least as far as chapter “4.5 HYDRA Database”

according to the HYDRA installation manual you can copy those files from the following directory:

$HYDRADIR/db_sql/oracle19/mip1, e.g.: /u1/mip1/db_sql/oracle19/linux/mip1

cp /u1/mip1/db_sql/oracle19/linux/mip1/* /u1/oracle/ora19/dbs/

Edit all four database creation scripts and make sure that all path configurations are set corresponding to

your system environment. All paths used in the database creation scripts must exist on your server!

A few of them will be automatically created by the script MIP1_ora19_lin.sh.

initMIP1.ora

By default, automatic memory management is disabled when you perform typical installation on a node
that has more than 4 GB of RAM.

Design fundamentals:

Application server and database sharing the same resources  = 30% of available System RAM
Application server and database server on different hardware = 80% of available System RAM

Set the following parameter:

"sga_target" = SGA size desired for the database (70% of the calculated RAM Size)
"pga_aggregate_target" = PGA size desired for the database (30% of the calculated RAM Size)

This are global recommendations of MPDV. For more information about memory settings for Oracle
database visit the Oracle documentation.

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 24 of 39

Installation Guide Oracle 19c for SLES12

Depending on the total amount of RAM memory available on the server and the system requirements by

the MIP based product please set the size for “sga_target” so that as much memory as possible will be

used by the database instance

The size of “sga_target” will have direct influence on the performance of the MIP based application because

with bigger sizes more data can be cached by the database.

As long as it is ensured that there will be enough RAM left for the requirements of the server’s operating

system (~2GB), the MIP based application services (depending on the system size ~1,5-8GB per instance),

the MIP WSP service (depending on the system size ~2-12GB per instance) and other database instances

installed on the same server you should use as much memory for “sga_target” as possible.

Make  sure  that  the  available  server  memory  (RAM)  is  used  to  full  capacity  without  forcing  your

server into swapping.

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 25 of 39

Installation Guide Oracle 19c for SLES12

Do not change or remove settings regarding user configurations and authorizations or any other

permissions without consulting with MPDV first!

By doing so it might be possible that the HYDRA application will not work properly.

Note about database user name “mipadm”:

MPDV strongly recommends not to change MIPs default database user name!

Changing the default database user name is not supported when using Oracle databases!

With  Oracle  databases  it  is  not  possible  to  use  different  database  user  names  other  than  MIPs  default

(CREATE USER MIPADM).

Note about password for database user “mipadm”:

For security reasons MPDV strongly recommends to use a secure password for the database user

mipadm!

The new password must be disclosed to MPDV.

The following characters are not allowed for the password:

- Characters with ASCII Code > 126 (e.g. German umlauts, French “umlauts”, etc.)

- Pipe: |

- Ampersand: &

To install additional database instances, e.g. MIP2, there are corresponding scripts available, e.g.:

CreateMIP2_ora19_lin.sql

MIP2_ora19_lin.sh

MIP2_ora19_lin.sql

initMIP2.ora

Example files can be found in a HYDRA installation, e.g. in: /u1/mip1/db_sql/oracle19/linux/mip2

When installing additional database instances make sure to change the port settings for “EM Express” in

file “createMIPx_ora19_lin.sql” so that there will be no port conflicts, e.g.:

MIP1:

MIP2:

exec dbms_xdb_config.sethttpsport(5500);

exec dbms_xdb_config.sethttpsport(5501);

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 26 of 39

Installation Guide Oracle 19c for SLES12

Change to directory $ORACLE_HOME/dbs, e.g.:

cd /u1/oracle/ora19/dbs

chmod u+x CreateMIP1_ora19_lin.sh

./CreateMIP1_ora19_lin.sh

Enter  ORACLE_BASE  (/u1/oracle)  Hit  'Return'  if  you  want  to  use  the  default

values :

Enter ORACLE_HOME: (/u1/oracle/ora19) Hit 'Return' if you want to use the default

values :

Enter database service name (mip1) Hit 'Return' if you want to use the default

values :

Enter ORACLE_SID (MIP1 Hit 'Return' if you want to use the default values :

Enter new password for SYS: MW40pe!!2020

Enter new password for SYSTEM: MW40pe!!2020

Enter password for SYS: MW40pe!!2020

Example for database instance „MIP1“ and database „mip1“:

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 27 of 39

Installation Guide Oracle 19c for SLES12

At the end of the installation process you must add the entry in the /etc/oratab for an automatic start of the

database after starting or rebooting of the database server.

Depending on your server environment the installation will run for at least 10 - 20 minutes or longer.

Under no circumstances you should interrupt the installation process!

The installation is finished as soon as „create EM Express“ is through and the Linux prompt is visible again,

e.g.:

The database creation must complete without errors.

Check all log files of the installation which can be found in the following directory:

$ORACLE_BASE/admin/<database name>/scripts

e.g. /u1/oracle/admin/mip1/scripts/

Start the Oracle Listener:

lsnrctl start LISTENER_MIP1

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 28 of 39

Installation Guide Oracle 19c for SLES12

Check the status after a few minutes

Use sqlplus to test the connection to the database(s).

sqlplus /nolog

connect / as sysdba

SQL> show sga

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 29 of 39

Installation Guide Oracle 19c for SLES12

SQL> exit

Logon to the server as local user “mipadm”.

Make a backup copy of all the files you used to create your HYDRA database, e.g.:

cp /u1/oracle/ora19/dbs/createMIP1_ora19_lin.sql /u1/mip1/db_sql

cp /u1/oracle/ora19/dbs/MIP1_ora19_lin.sh /u1/mip1/db_sql

cp /u1/oracle/ora19/dbs/MIP1_ora19_lin.sql /u1/mip1/db_sql

cp /u1/oracle/ora19/dbs/initMIP1.ora /u1/mip1/db_sql

Repeat these procedures for every HYDRA database and its instance.

Should there have been a problem while creating the database you might need to run the whole process

again after you fixed the problems which occurred the first time.

It might be that the instance is already running after a faulty attempt.

Before you can try it a second time you need to shut down the instance first and you need to delete already

created control files.

Shut down the database:

sqlplus /nolog

connect / as sysdba

SQL> shutdown abort

SQL> exit

Delete already created control files, e.g.:

rm /u1/oracle/oradata/mip1/MIP1_control01.ctl

rm /u1/oracle/fast_recovery_area/mip1/MIP1_control02.ctl

rm –rf /u1/oracle/oradata/mip1

Now you might run the database creation process again.

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 30 of 39

Installation Guide Oracle 19c for SLES12

6.2  Check Database Connection

Check that the new database is accessible using the tnsping command.

Open a command prompt:

/u1/oracle/ora19/bin/tnsping mip1

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 31 of 39

Installation Guide Oracle 19c for SLES12

6.3  Check Oracle Listener

After installing the HYDRA database(s) MIP1 (MIP2, MIP3, etc.) check that all services are running using

the lsnrctl command.

/u1/oracle/ora19/bin/lsnrctl status LISTENER_MIP1

Check if a service “mip1” is available

Additional listener could be called by its service name (LISTENER_MIP2, LISTENER_MIP2)

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 32 of 39

Installation Guide Oracle 19c for SLES12

6.4  Check Automatic Startup Database

Logon to the HYDRA (database) server as local user “root”.

For an automatic startup of the Oracle database, the Listener and the Enterprise Manager the following

entries must be set to "yes" in the file /etc/sysconfig/oracle:

START_ORACLE_DB="yes"

START_ORACLE_DB_LISTENER="yes"

START_ORACLE_DB_EMANAGER="yes"

Those settings should already be done if your server was properly configured according to the following

MPDV manual:

"Preparation Guide for SLES12 SP5" (e.g.: PreInstGuide_MW40_SLES12_SP5.pdf)

Additionally in file /etc/oratab there must be an entry for every Oracle instance (e.g. MIP1 and MIP2) with

the correct path for $ORACLE_HOME and a “Y” at the end of each line, e.g.:

MIP1:/u1/oracle/ora19:Y

MIP2:/u1/oracle/ora19:Y

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 33 of 39

Installation Guide Oracle 19c for SLES12

6.5  Check Oracle Enterprise Manager

After  a  successful  installation  you  can  test  the  connection  to  the  Oracle  Enterprise  Manager  (Database

Express) by using the Internet Explorer (e.g. to https://servername:5500/em).

Note: For using the Oracle Enterprise Manager (Database Express) a web browser with Adobe Flash Player

Plugin is needed.

The Oracle Enterprise Manager (Database Express) is only available if the database is running.

Login with user “system” and the defined password

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 34 of 39

Installation Guide Oracle 19c for SLES12

7  Oracle 64Bit Client on Application Server

With separate application and database servers for MIP based products the Oracle Client software must

always be installed on the application server.

Login as user oracle

Unzip the Oracle client installation file to the destination directory (e.g.: /u1/oracle/client)

Start the installation

/u1/oracle/client/runInstaller

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 35 of 39

Installation Guide Oracle 19c for SLES12

Next

Install

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 36 of 39

Installation Guide Oracle 19c for SLES12

Close

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 37 of 39

Installation Guide Oracle 19c for SLES12

8  Post installation configuration

8.1

tnsnames.ora

Copy the content of /u1/mip1/db_sql/oracle19/linux/network/client/* to /u1/oracle/client/network\admin\*

On  the  HYDRA  application  server  check  the  tnsnames.ora  file  of  the  client  and  add  necessary  alias

configurations for the HYDRA databases (Default: MIP1):

/u1/oracle/client/network/admin/tnsnames.ora

# tnsnames.ora Network Configuration File: /u1/oracle/client/network/admin/tnsnames.ora
# Generated by Oracle configuration tools.

MIP1 =
  (DESCRIPTION =
    (ADDRESS_LIST =
      (ADDRESS = (PROTOCOL = TCP)(HOST = [IP ADDRESS or FQDN NAME])(PORT = 1521))
    )
    (CONNECT_DATA =
      (SERVICE_NAME = mip1)
    )
  )

MIP2 =
  (DESCRIPTION =
    (ADDRESS_LIST =
      (ADDRESS = (PROTOCOL = TCP)(HOST = [IP ADDRESS or FQDN NAME])(PORT = 1522))
    )
    (CONNECT_DATA =
      (SERVICE_NAME = mip2)
    )
  )

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 38 of 39

Installation Guide Oracle 19c for SLES12

9  Additional Documents

Oracle Database Installation Guide, 19c for Microsoft Windows:

Database Installation Guide for Linux

https://docs.oracle.com/en/database/oracle/oracle-database/19/ladbi/index.html

Database Client Installation Guide for Linux

https://docs.oracle.com/en/database/oracle/oracle-database/19/lacli/index.html

Database Administrator’s Guide

https://docs.oracle.com/en/database/oracle/oracle-database/19/admin/index.html

InstallationGuide_MW40_Oracle19c_SLES12.docxVersion: 1.0.23049

Page 39 of 39

