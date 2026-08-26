HYDRA Documentation

Installation Guide Oracle 19c
for Windows
for HYDRA MW4.0pe

Version 1.0.23049

Last changed on: 02.09.2020

Installation Guide Oracle 19c for Windows

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of Oracle Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 2 of 38

Installation Guide Oracle 19c for Windows

Contents

1

Introduction .................................................................................................. 4

2

Installation Requirements ............................................................................. 5

3

Installing Oracle Server Software ................................................................. 7

3.1  Users and Groups ............................................................................................. 16

4

Installing Oracle Patch Set ......................................................................... 17

5  Post Installation Configuration ................................................................... 18

5.1  Registry Settings ............................................................................................... 18

5.2  Network Connectivity ......................................................................................... 19

6  MIP Database ............................................................................................ 22

6.1  Create MIP Database ........................................................................................ 23

6.2  Check Database Connection ............................................................................. 28

6.3  Check Oracle Listener ....................................................................................... 29

6.4  Check Automatic Startup Database ................................................................... 30

6.5  Check Oracle Enterprise Manager .................................................................... 31

7  Oracle 64Bit Client on Application Server .................................................. 32

8  Post Installation Configuration ................................................................... 36

8.1  Registry Settings ............................................................................................... 36

8.2

tnsnames.ora .................................................................................................... 37

9  Additional Documents ................................................................................ 38

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 3 of 38

Installation Guide Oracle 19c for Windows

1

Introduction

Attention:

To  perform  the  following  procedures  advanced  knowledge  of  your  server  operating  system,  the

intended database software and common IT systems is required.

These procedures are performed on your own responsibility.

MPDV Mikrolab GmbH is not liable for any loss of or destruction of data.

In case of doubt place an order with MPDV Mikrolab GmbH to perform these tasks for you.

This manual explains how to install Oracle Database 19c (19.3.0.0.0) on a server with a Windows Server

2019 operating system for use with MPDVs Manufacturing Integration Platform (MIP) based products like

MIP 1.1, HYDRA MW4.0pe or FEDRA 1.1.

Other than MIP the applications HYDRA and FEDRA allow for a multi system installation (multiple HYDRA

or FEDRA systems on the same (application) server).

For multi system installations every HYDRA or FEDRA system needs its own database.

Name your databases mip1, mip2, mip3, etc.

With  multi  system  installations  it  is  strongly  recommended  that  every  database  has  its  own  database

instance available, e.g.: MIP1, MIP2, MIP3, etc.

If the database installation is meant as preliminary installation for MPDV personnel to install a MIP based

product on your server you can stop as soon as you are finished with chapter “5 Installing Oracle 64 Bit

Client Software”.

Attention: Do not run these installation procedures on a computer where MIP based products like MIP 1.1,

HYDRA MW4.0pe or FEDRA 1.1 are already running.

By doing so, you might destroy your existing MIP based system.

Please be extremely cautious if you decide to do it anyway.

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 4 of 38

2

Installation Requirements

Installation Guide Oracle 19c for Windows

  Server hardware and software according to the recommendations of MPDV Mikrolab GmbH for the

respective MIP based product.

See manuals: HW_SW_GUIDE.pdf

  English operating system according to the recommendations of MPDV Mikrolab GmbH.



Important:  Server  configuration  according  to  MPDVs  server  configuration  manuals  for  the

respective MIP based product, e.g.:

"Preparation Guide for Windows Server 2019" (e.g.: PreInstGuide_MW40_WIN2019.pdf)



Installation file for the required edition of "Oracle Database 19c (19.3) for Microsoft Windows

x64 (64-bit)”

WINDOWS.X64_193000_db_home.zip

e.g.:  https://www.oracle.com/database/technologies/oracle19c-windows-downloads.html#license-

lightbox



Installation files for the 64-bit  version of the  "Oracle  Database 19c Client (19.3) for Microsoft

Windows x64 (64-bit)”

WINDOWS.X64_193000_client_home.zip

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 5 of 38

Installation Guide Oracle 19c for Windows

  Minimum hard disk configuration:

Partition C:\ with a minimum of 100 GB disk space available and file system NTFS for the Windows

installation

Partition  D:\  with  a  minimum  of  200  GB  disk  space  available  and  file  system  NTFS  for  the

installation of the MIP based product

Partition E:\ with a minimum of 400 GB disk space available and file system NTFS for database

data (default configuration)

  Note: If you are using a different disk layout you must make sure that it matches the configuration

used in the database installation scripts (see chapter 6.2 Create MIP Database).

  Screen resolution with min. 1024x768 pixel.

  Local Windows user mipadm

(see server configuration manual, e.g. PreInstGuide_MW40_WIN2019.pdf)

The user mipadm must be member of the local group Administrators.

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 6 of 38

Installation Guide Oracle 19c for Windows

3

Installing Oracle Server Software

Before starting the installation of the Oracle database software it is recommended to review the standard

installation  documentation  from  Oracle.  Especially  regarding  the  topic  installation  of  multiple  Oracle

database and client versions of the same hardware.

https://docs.oracle.com/en/database/oracle/oracle-database/19/ntdbi/database-installation-guide-

microsoft-windows.pdf

https://docs.oracle.com/en/database/oracle/oracle-database/19/ntcli/database-client-installation-guide-

microsoft-windows.pdf

This document only covers the installation of the Oracle 19c database software on a system without any

other installed versions.

Login as local user mipadm.

Unblock the downloaded zip file (see chapter 2 Installation Requirements) if the download was done with

the Internet Explorer.

If the file properties look like below select “Unblock” in the file properties of the ZIP file before extracting

its contents:

Unzip the Oracle installation file to your intended ORACLE_HOME location (e.g.: D:\oracle\ora19):

For performance reasons you might want to exclude the destination directory (e.g.: D:\oracle\ora19) from

scanning with the Windows Defender and/or other anti-virus software.

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 7 of 38

Installation Guide Oracle 19c for Windows

After the extraction of the Oracle ZIP file you have to adapt the Oracle database response file before you

can proceed with the installation.

The installation will be executed as a silent installation. The response file is stored at

D:\mip1\db_sql\oracle19\windows\db_inst\ora19db_inst.rsp.

Before you could with the installation some (red) values must checked. The preconfigured values comply

to the MPDV recommendations. Dissenting installations could be performed in charge of the customer.

####################################################################
 ##
## Copyright(c) Oracle Corporation 1998,2019. All rights reserved.
 ##
##
 ##
## Specify values for the variables listed below to customize
 ##
## your installation.
 ##
##
 ##
## Each variable is associated with a comment. The comment
 ##
## can help to populate the variables with the appropriate
 ##
## values.
 ##
##
 ##
## IMPORTANT NOTE: This file contains plain text passwords and
 ##
## should be secured to have read permission only by oracle user
 ##
## or db administrator who owns this installation.
##
 ##
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
UNIX_GROUP_NAME=

#-------------------------------------------------------------------------------
# Specify the complete path of the Oracle Base.
#-------------------------------------------------------------------------------
ORACLE_BASE=D:\oracle

#-------------------------------------------------------------------------------
# Specify the installation edition of the component.
#
# The value should contain only one of these choices.

#   - EE     : Enterprise Edition

#   - SE2     : Standard Edition 2

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 8 of 38

Installation Guide Oracle 19c for Windows

#-------------------------------------------------------------------------------

oracle.install.db.InstallEdition=SE2
###############################################################################
         #
#
         #
# PRIVILEGED OPERATING SYSTEM GROUPS
         #
# ------------------------------------------
         #
# Provide values for the OS groups to which SYSDBA and SYSOPER privileges
         #
# needs to be granted. If the install is being performed as a member of the
         #
# group "dba", then that will be used unless specified otherwise below.
         #
#
         #
# The value to be specified for OSDBA and OSOPER group is only for UNIX based
         #
# Operating System.
#
         #
###############################################################################

#------------------------------------------------------------------------------
# The OSDBA_GROUP is the OS group which is to be granted SYSDBA privileges.
#-------------------------------------------------------------------------------
oracle.install.db.OSDBA_GROUP=

#------------------------------------------------------------------------------
# The OSOPER_GROUP is the OS group which is to be granted SYSOPER privileges.
# The value to be specified for OSOPER group is optional.
#------------------------------------------------------------------------------
oracle.install.db.OSOPER_GROUP=

#------------------------------------------------------------------------------
# The OSBACKUPDBA_GROUP is the OS group which is to be granted SYSBACKUP privileges.
#------------------------------------------------------------------------------
oracle.install.db.OSBACKUPDBA_GROUP=

#------------------------------------------------------------------------------
# The OSDGDBA_GROUP is the OS group which is to be granted SYSDG privileges.
#------------------------------------------------------------------------------
oracle.install.db.OSDGDBA_GROUP=

#------------------------------------------------------------------------------
# The OSKMDBA_GROUP is the OS group which is to be granted SYSKM privileges.
#------------------------------------------------------------------------------
oracle.install.db.OSKMDBA_GROUP=

#------------------------------------------------------------------------------
# The OSRACDBA_GROUP is the OS group which is to be granted SYSRAC privileges.
#------------------------------------------------------------------------------
oracle.install.db.OSRACDBA_GROUP=
################################################################################
           #
#
           #
#                         Privileged user configuration
#
           #
################################################################################

###############################################################################
         #
#
         #
#                               Grid Options
#
         #
###############################################################################

#------------------------------------------------------------------------------
# Value is required only if the specified install option is INSTALL_DB_SWONLY
#
# Specify the cluster node names selected during the installation.
#
# Example : oracle.install.db.CLUSTER_NODES=node1,node2
#------------------------------------------------------------------------------
oracle.install.db.CLUSTER_NODES=

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 9 of 38

Installation Guide Oracle 19c for Windows

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
# is to be done manually, then set it to false.
#------------------------------------------------------------------------------
oracle.install.db.config.starterdb.memoryOption=false

#-------------------------------------------------------------------------------
# Specify the total memory allocation for the database. Value(in MB) should be
# at least 256 MB, and should not exceed the total physical memory available
# on the system.
# Example: oracle.install.db.config.starterdb.memoryLimit=512
#-------------------------------------------------------------------------------

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 10 of 38

Installation Guide Oracle 19c for Windows

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
oracle.install.db.config.starterdb.managementOption=DEFAULT

#-------------------------------------------------------------------------------
# Specify the OMS host to connect to Cloud Control.
# Applicable only when oracle.install.db.config.starterdb.managementOption=CLOUD_CONTROL
#-------------------------------------------------------------------------------
oracle.install.db.config.starterdb.omsHost=

#-------------------------------------------------------------------------------
# Specify the OMS port to connect to Cloud Control.

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 11 of 38

Installation Guide Oracle 19c for Windows

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
#-------------------------------------------------------------------------------
oracle.install.db.config.asm.diskGroup=

#-------------------------------------------------------------------------------
# Specify the password for ASMSNMP user of the ASM instance.
#
# Applicable only when oracle.install.db.config.starterdb.storage=ASM_STORAGE
#-------------------------------------------------------------------------------
oracle.install.db.config.asm.ASMSNMPPassword=

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 12 of 38

Installation Guide Oracle 19c for Windows

#----------------------------------------------------------------------------------------------
# Specify the Oracle Home user.
#
# Oracle recommends that you specify a Windows User Account with limited privilege to install
# and configure a secure Oracle home. Set oracle.install.IsVirtualAccount to true
# if you want to use Virtual Account.
#
# Set oracle.install.IsBuiltInAccount and oracle.install.IsVirtualAccount to false if you want to use Windows Account user
# as Oracle Home user.
#------------------------------------------------------------------------------------------------
oracle.install.IsBuiltInAccount=false
oracle.install.IsVirtualAccount=false
oracle.install.OracleHomeUserName=orahome
oracle.install.OracleHomeUserPassword=ORAhome!!2019

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 13 of 38

Start the installation inside the extracted directory (e.g.: D:\oracle\ora19) in a command line:

D:\oracle\ora19>setup.exe -silient -noconfig -responseFile

Installation Guide Oracle 19c for Windows

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 14 of 38

Installation Guide Oracle 19c for Windows

Check the end of command line output: “Successfully Setup Software”

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 15 of 38

Installation Guide Oracle 19c for Windows

3.1  Users and Groups

The following groups are created when installing Oracle 19c:

User orahome was added as additional Windows User:

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 16 of 38

Installation Guide Oracle 19c for Windows

4

Installing Oracle Patch Set

  The latest Oracle patch set approved by MPDV Mikrolab GmbH must be installed.

Version: currently there is no approved patch set to be installed

  Please take note of the "Patch Set Notes" delivered with the patch set.

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 17 of 38

Installation Guide Oracle 19c for Windows

5  Post Installation Configuration

5.1  Registry Settings

Change the Windows Registry (regedit):

in HKEY_LOCAL_MACHINE\SOFTWARE\ORACLE\KEY_OraDB19Home1 the contents for key

NLS_LANG must be changed:

new:  AMERICAN_AMERICA.AL32UTF8

Should HKEY_LOCAL_MACHINE\SOFTWARE\ORACLE\* contain other entries for NLS_LANG change

them as well.

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 18 of 38

Installation Guide Oracle 19c for Windows

5.2  Network Connectivity

To perform the following steps either the MIP based application software must already be available

on the server, the following files must be provided to you by MPDV or you need to create those files

from scratch!

Starting with HYDRA MW4.0pe every instance will have its own Oracle Listener configuration.

Copy the files from directory d:\mip1\db_sql\oracle19\windows\network\server\*  to directory

d:\oracle\ora19\network\admin\*:

Check and edit the configuration file of the Oracle Listener:

d:\oracle\ora19\network\admin\listener.ora
# listener.ora Network Configuration File: D:\oracle\ora19\NETWORK\ADMIN\listener.ora
# Generated by Oracle configuration tools.

SID_LIST_LISTENER_MIP1 =
  (SID_LIST =
    (SID_DESC =
      (SID_NAME = CLRExtProc)
      (ORACLE_HOME = D:\oracle\ora19)
      (PROGRAM = extproc)
      (ENVS = "EXTPROC_DLLS=ONLY:D:\oracle\ora19\bin\oraclr19.dll")
    )
  )

LISTENER_MIP1 =
  (DESCRIPTION_LIST =
    (DESCRIPTION =
      (ADDRESS = (PROTOCOL = TCP)(HOST = [FQDN NAME])(PORT = 1521))
      (ADDRESS = (PROTOCOL = IPC)(KEY = EXTPROC1521))
    )
  )

LISTENER_MIP2 =
  (DESCRIPTION_LIST =
    (DESCRIPTION =
      (ADDRESS = (PROTOCOL = TCP)(HOST = [FQDN NAME])(PORT = 1522))
    )
  )

Attention!

For [FQDN NAME] you should use the hostname (FQDN) instead of the IP-address.

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 19 of 38

Installation Guide Oracle 19c for Windows

Check the tnsnames.ora file and add necessary alias configurations for the HYDRA databases (Default:

MIP1, MIP2):

d:\oracle\ora19\network\admin\tnsnames.ora

# tnsnames.ora Network Configuration File: D:\oracle\ora19\NETWORK\ADMIN\tnsnames.ora
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

ORACLR_CONNECTION_DATA =
  (DESCRIPTION =
    (ADDRESS_LIST =
      (ADDRESS = (PROTOCOL = IPC)(KEY = EXTPROC1521))
    )
    (CONNECT_DATA =
      (SID = CLRExtProc)
      (PRESENTATION = RO)
    )
  )

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 20 of 38

Installation Guide Oracle 19c for Windows

Start a Windows Command Prompt and run the following command:

D:\oracle\ora19\bin>lsnrctl start LISTENER_MIP1

Check the Listener Status:

D:\oracle\ora19\bin>lsnrctl status LISTENER_MIP1

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 21 of 38

Installation Guide Oracle 19c for Windows

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

CreateMIP1_ora19_win.sql

MIP1_ora19_win.bat

MIP1_ora19_win.sql

initMIP1.ora

Either those files were provided to  you in advance by MPDV or  you might  have the HYDRA application

installed at least as far as chapter “4.5 MIP Database” according to the HYDRA installation manual:

InstallationGuide_MW40_Windows.pdf

Note:

The installation manual for HYDRA MW4.0pe will be provided to selected customers only.

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 22 of 38

Installation Guide Oracle 19c for Windows

6.1  Create MIP Database

Attention:

Do not run these  installation procedures on a computer where  a MIP based product  is already running.

By doing so, you might destroy your existing MIP based system.

Please be extremely cautious if you decide to do it anyway.

Logon to the server as local user “mipadm”.

Copy the following four files from d:\mip1\db_sql\oracle19\windows\mip1\* to directory

%ORACLE_HOME%\database, e.g. d:\oracle\ora19\database\.

Edit the scripts and make sure that all path configurations are set corresponding to your system

environment.

All paths used in the database creation scripts must exist on your server. They will be interactive created

by the script MIP1_ora19_win.bat.

Do not change or remove settings regarding user configurations and authorizations or any other

permissions without consulting with MPDV first!

Note about database user name “mipadm”:

MPDV strongly recommends not to change MIPs default database user name!

Changing the default database user name is not supported when using Oracle databases!

With  Oracle  databases  it  is  not  possible  to  use  different  database  user  names  other  than  MIPs  default

(CREATE USER MIPADM).

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 23 of 38

Installation Guide Oracle 19c for Windows

Note about password for database user “mipadm”:

For security reasons MPDV strongly recommends to use a secure password for the database user

mipadm!

The new password must be disclosed to MPDV.

The following characters are not allowed for the password:

- Characters with ASCII Code > 126 (e.g. German umlauts, French “umlauts”, etc.)

- Pipe: |

- Ampersand: &

Inside  initMIP1x.ora  check  the  memory  settings  "sga_target"/”pga_aggregate_target”  and  adjust  it  if

necessary.

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

To  install  additional  database  instances,  e.g.  MIP2,  there  are  corresponding  scripts  available

(d:\mip1\db_sql\oracle19\windows\mip2)

When installing additional database instances make sure to change the port settings for “EM Express” in

file “createMIPx_ora19_win.sql” so that there will be no port conflicts, e.g.:

MIP1:

MIP2:

exec dbms_xdb_config.sethttpsport(5500);

exec dbms_xdb_config.sethttpsport(5501);

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 24 of 38

Installation Guide Oracle 19c for Windows

Open a Windows Command Prompt (cmd.exe).

Change to directory %ORACLE_HOME%\database, e.g.:

cd d:\oracle\ora19\database

Execute file MIP1_ora19_win.bat and enter the following information. The  values in parentheses are

default values and have to be insert:

Enter ORACLE_BASE (d:\oracle): d:\oracle

Enter ORACLE_HOME (d:\oracle\ora19): d:\oracle\ora19

Enter MIP_DIRECTORY_NAME (mip1): mip1

Enter ORACLE_SID (MIP1): MIP1

Enter ORACLE_HOME_USER (orahome): orahome

Enter ORACLE_DEFAULT_DATA_DIRECTORY (d:\oracle\oradata): d:\oracle\oradata

Do you want to create additional data directories (Y(es) or N(o)? y

Enter optional DATA_DIR directory (e:\oracle\oradata): e:\oracle\oradata

Do you want to create additional data directories (Y(es) or N(o)? n

Enter ARCHIVE_DIR Archive directory (e:\oracle\oradata\mip1\archive\log\):

e:\oracle\oradata\mip1\archive\log

Enter password for Oracle service user: ORAhome!!2019 (see above)

Enter new password for SYS: MW40pe!!2019

Enter new password for SYSTEM: MW40pe!!2019

Enter password for SYS: MW40pe!!2019

For security reasons you should want to use different passwords for user SYS and SYSTEM.

Please make sure to disclose the new passwords to MPDV.

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 25 of 38

Example for installation of database “MIP1”

Installation Guide Oracle 19c for Windows

Depending on your server environment the installation will run for at least 20 – 30 minutes or longer.

Under no circumstances should you interrupt the installation process!

The installation is finished as soon as “create EM Express” is through and the Windows prompt is visible

again, e.g.:

The database creation must complete without errors.

Check all log files of the installation which can be found in the following directory:

%ORACLE_BASE%\admin\<database name>\scripts

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 26 of 38

Installation Guide Oracle 19c for Windows

Make a backup copy of all the files you used to create your HYDRA database, e.g.:

copy d:\oracle\ora19\database\createMIP1_ora19_win.sql d:\mip1\db_sql

copy d:\oracle\ora19\database\MIP1_ora19_win.bat d:\mip1\db_sql

copy d:\oracle\ora19\database\MIP1_ora19_win.sql d:\mip1\db_sql

copy d:\oracle\ora19\database\initMIP1.ora d:\mip1\db_sql

Repeat these procedures for every HYDRA database and its instance.

Should there have been a problem while creating the database you might need to run the whole process

again after you fixed the problems which occurred the first time.

It might be that the database is already running after a faulty attempt.

Before you can try it a second time you need to shut down the database first and you need to delete an

already created database instance and already created control files.

Shut down the database within a Windows Command Prompt:

d:\oracle\ora19\bin\sqlplus /nolog

connect /as sysdba

SQL> shutdown abort

SQL> exit

Delete Oracle instance MIP1 within a Windows Command Prompt:

d:\oracle\ora19\bin\oradim -delete -sid MIP1

Delete already created control files, e.g.:

del d:\oracle\oradata\mip1\MIP1_control01.ctl

del d:\oracle\fast_recovery_area\mip1\MIP1_control02.ctl

Check if the relevant Windows services where deleted.

Now you might run the database creation process again.

Check the Windows service for the Oracle services

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 27 of 38

Installation Guide Oracle 19c for Windows

6.2  Check Database Connection

Check that the new database is accessible using the tnsping command.

Open a Windows command prompt:

d:\oracle\ora19\bin\tnsping mip1

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 28 of 38

Installation Guide Oracle 19c for Windows

6.3  Check Oracle Listener

After installing the HYDRA database(s) MIP1 (MIP2, MIP3, etc.) check that all services are running using

the lsnrctl command.

d:\oracle\ora19\bin\lsnrctl status LISTENER_MIP1

Check if a service “mip1” is available

Additional listener could be called by its service name (LISTENER_MIP2, LISTENER_MIP2)

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 29 of 38

Installation Guide Oracle 19c for Windows

6.4  Check Automatic Startup Database

When you start your server the database(s) must start automatically.

Make sure that “Startup Type” is set to “Automatic” for at least the following services:

Database(s):

OracleServiceMIPx

Oracle Listener:

OracleOraDB19Home1TNSListenerLISTENER_MIPx

As soon as you are finished with the installation check that the automatic startup is working correctly.

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 30 of 38

Installation Guide Oracle 19c for Windows

6.5  Check Oracle Enterprise Manager

After  a  successful  installation  you  can  test  the  connection  to  the  Oracle  Enterprise  Manager  (Database

Express) by using the Internet Explorer (e.g. to https://servername:5500/em).

Note: For using the Oracle Enterprise Manager (Database Express) a web browser with Adobe Flash Player

Plugin is needed.

The Oracle Enterprise Manager (Database Express) is only available if the database is running.

Login with user “system” and the defined password

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 31 of 38

Installation Guide Oracle 19c for Windows

7  Oracle 64Bit Client on Application Server

With separate application and database servers for MIP based products the Oracle Client software must

always be installed on the application server.

Login as local user mipadm.

Unblock the downloaded zip file (see chapter 2 Installation Requirements) if the download was done with

the Internet Explorer.

Unzip the Oracle Client installation files to a temporary destination directory (e.g.: D:\oracle\client):

Start the installation:

D:\oracle\client>setup.exe

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 32 of 38

Installation Guide Oracle 19c for Windows

User: orahome

Password: ORAhome!!2019

If you have an existing user account you must use the relevant credentials

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 33 of 38

Installation Guide Oracle 19c for Windows

Start the installation

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 34 of 38

Installation Guide Oracle 19c for Windows

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 35 of 38

Installation Guide Oracle 19c for Windows

8  Post Installation Configuration

8.1  Registry Settings

HKEY_LOCAL_MACHINE\SOFTWARE\ORACLE\KEY_OraClient19Home1 the contents for key

NLS_LANG must be changed:

new:  AMERICAN_AMERICA.AL32UTF8

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 36 of 38

Installation Guide Oracle 19c for Windows

8.2

tnsnames.ora

Copy the content of d:\mip1\db_sql\oracle19\windows\network\client\* to D:\oracle\client\network\admin\*

On  the  HYDRA  application  server  check  the  tnsnames.ora  file  of  the  client  and  add  necessary  alias

configurations for the HYDRA databases (Default: MIP1):

d:\oracle\network\admin\tnsnames.ora

exit# tnsnames.ora Network Configuration File: D:\oracle\client\NETWORK\ADMIN\tnsnames.ora
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

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 37 of 38

Installation Guide Oracle 19c for Windows

9  Additional Documents

Oracle Database Installation Guide, 19c for Microsoft Windows:

Database Installation Guide for Microsoft Windows

https://docs.oracle.com/en/database/oracle/oracle-database/19/ntdbi/index.html

Database Client Installation Guide for Microsoft Windows

https://docs.oracle.com/en/database/oracle/oracle-database/19/ntcli/index.html

Database Administrator’s Guide

https://docs.oracle.com/en/database/oracle/oracle-database/19/admin/index.html

InstallationGuide_MW40_Oracle19c_Windows.docxVersion: 1.0.23049

Page 38 of 38

