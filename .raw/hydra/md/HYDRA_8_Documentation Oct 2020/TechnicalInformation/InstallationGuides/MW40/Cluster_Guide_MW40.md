HYDRA Documentation

Cluster Guide for HYDRA
MW4.0pe

Version 1.0.23049

Last changed on: 02.09.2020

Cluster Guide for HYDRA MW4.0pe

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of Oracle Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

Cluster_Guide_MW40.docx

Version: 1.0.23049

Page 2 of 18

Cluster Guide for HYDRA MW4.0pe

Contents

1

Introduction .................................................................................................. 4

2  Cluster Basics .............................................................................................. 5

2.1  Overview ............................................................................................................. 5

2.2  Terms and Definitions ......................................................................................... 7

3  HYDRA in a Cluster ................................................................................... 11

3.1  Requirements .................................................................................................... 11

3.2

3.3

Installing the HYDRA Database......................................................................... 12

Installing HYDRA .............................................................................................. 13

3.3.1  Dependencies ....................................................................................... 16

3.3.2  Function Tests ....................................................................................... 16

3.3.3

get_stat Information ............................................................................... 17

3.4  Special Configurations ...................................................................................... 18

Cluster_Guide_MW40.docx

Version: 1.0.23049

Page 3 of 18

Cluster Guide for HYDRA MW4.0pe

1

Introduction

HYDRA8 MW4.0pe can be installed on a cluster system.

HYDRA MW4.0pe is based on MPDVs Manufacturing Integration Platform (MIP).

MPDV Mikrolab GmbH does not set up and install cluster hardware and software for its customers.

MPDV will not offer detailed technical expertise about cluster environments.

Cluster systems are complex units where special hardware and software (including the database software)

is involved so that expert knowledge and experience is necessary to set up such a system.

There are specialized system vendors out there which will happily provide such knowledge and which will

set up a cluster system for any interested party.

It’s the customers responsibility to provide a properly functioning cluster environment.

To install HYDRA on a cluster system it is mandatory that MPDV and the customer’s cluster specialist are

working closely together.

The cluster expert needs to be briefed by MPDV about how HYDRA is working, what its requirements are

and what are the dos and don’ts.

Together they have to make sure that HYDRA will be integrated into the cluster environment and into the

cluster management software so that it is functioning properly.

This manual will focus on cluster systems using a Windows operating system and a SQL Server database.

The use of other operating systems and databases is possible as long as they are approved by MPDV for

the use with HYDRA MW4.0pe (see the hardware and software guide for HYDRA).

Apart from that the basic installation and configuration mechanisms  for a cluster system  are always the

same.

Note:

If the customer’s cluster environment or the way HYDRA is supposed to be integrated into a customer’s

cluster  environment  deviates  from  this  manual  it’s  the  sole  responsibility  of  the  customer  to  ensure  the

proper functionality of that cluster system and the installed HYDRA software.

MPDV Mikrolab GmbH will not support any cluster hardware, software or its configurations.

MPDV will only support the HYDRA software itself.

Cluster_Guide_MW40.docx

Version: 1.0.23049

Page 4 of 18

Cluster Guide for HYDRA MW4.0pe

2  Cluster Basics

2.1  Overview

A  server  cluster  is  a  collection  of  independent  servers  that  together  provide  a  single,  highly  available

platform for hosting applications.

Clusters are usually deployed to improve the availability over that of a single server.

A cluster system typically consists of two connected servers (cluster nodes) that work together so that, in

many respects, they can be viewed as a single system.

Server  clusters  have  each  node  set  to  perform  the  same  task  (clustered  applications  and  services),

controlled and scheduled by software (cluster management software).

Each node is running its own instance of an operating system.

In most circumstances, all of the nodes use the same hardware and the same operating system.

The clustered servers (nodes) are connected by a private network connection (heartbeat network) and are

controlled by a cluster management software.

If one of the cluster nodes fail the other node begin to provide service (a process known as failover).

In addition, the clustered applications and services are proactively monitored to verify that they are working

properly.

If they are not working, they are either restarted or moved to another node (failover).

A cluster system usually uses a shared storage system.

Typically only the active cluster node has access to the shared storage system.

For access by clients the cluster provides a public IP address (virtual IP address) and a public hostname

(virtual hostname).

Typically only the active cluster node is responding to the public IP address and the public hostname.

Cluster_Guide_MW40.docx

Version: 1.0.23049

Page 5 of 18

Typical HYDRA cluster configuration:

Cluster Guide for HYDRA MW4.0pe

Server clusters can dramatically reduce planned and unplanned downtime.

However, even with server clusters, a server could still experience downtime from the following events:

Failover time:

If a server cluster recovers from a server or application failure, or if it is used to move applications from one

server  to  another,  the  application(s)  will  be  unavailable  for  a  non-zero  period  of  time  (typically  under  a

minute).

Failures from which Server clusters cannot recover:

There are types of failure that server clusters do not protect against, such as loss of a disk not protected

by RAID, loss of power when a UPS is not used, or loss of a site when there is no fast-recovery disaster

recovery plan. Most of these can be survived with minimal downtime if precautions are taken in advance.

Server maintenance that requires downtime:

Server clusters can keep applications and data online through many types of server maintenance, but not

all (e.g.: installing a new version of an application which requires changing preexisting data).

Note:

A cluster system does not protect you against the loss of data or against the destruction of data.

Regular backups are still required.

Cluster_Guide_MW40.docx

Version: 1.0.23049

Page 6 of 18

Cluster Guide for HYDRA MW4.0pe

2.2  Terms and Definitions

High-availability clusters

Also known as HA clusters or fail-over clusters are groups of computers that support server applications

that can be reliably utilized with a minimum of down-time.

They operate by using high availability software to harness redundant computers in groups or clusters that

provide continued service when system components fail.

Node

A server system that is an active or inactive member of a server cluster.

Cluster resource

A physical or logical entity that can be owned by a node, brought online and taken offline, moved between

nodes, and managed as a cluster object.

A cluster resource is the lowest level unit of management in a server cluster.

A resource represents a physical object or an instance of running code. For example, a physical disk, an

IP address, an MSMQ queue or a COM object. All of these things are considered to be resources.

From  a  management  perspective,  resources  can  be  independently  started  and  stopped  and  each  is

monitored to ensure that it is healthy.

A cluster resource can be owned by only a single node at any point in time.

Resource group

A resource group is a collection of one or more resources that are managed and monitored as a single unit.

Typically a resource group contains all of the cluster resources that are required to run a specific application

or service.

A resource group can be started or stopped.

If a resource group is started, each resource in the group is started (taking into account any start order

defined by the dependencies between resources in the group).

If a resource group is stopped, all of the resources in the group are stopped.

Dependencies between resources cannot span a group.

In other words, the set of resources within a group is an autonomous unit that can be started and stopped

independently from any other group.

A group is a single, indivisible unit that is hosted on one server in a Server cluster at any point in time and

it is the unit of failover.

Failover and failback always act on resource groups.

Cluster_Guide_MW40.docx

Version: 1.0.23049

Page 7 of 18

Cluster Guide for HYDRA MW4.0pe

Resource dependency

A resource on which another resource depends.

A complete application actually consists of multiple pieces or multiple resources, some pieces are code

and others are physical resources required by the application.

The resources are related in different ways; for example, an application that writes to a disk or to a database

cannot  come  online  until  the  disk  or  the  database  is  online.  If  the  disk  or  the  database  fails,  then,  by

definition, the application cannot continue to run since it writes to the disk or to the database.

Resource dependencies can be defined by the application developer or system administrator to capture

these relationships.

Resource dependencies define the order that resources are brought online and control how failures are

propagated to the various pieces of the application.

Resource dependencies are confined to a single resource group.

Network name resource (virtual network name or virtual hostname)

A virtual network name (hostname) that is managed as a cluster resource.

A network name resource must be used with an IP address resource.

The virtual hostname has a resource dependency on one or more virtual IP addresses.

IP address resource (virtual IP address)

A virtual IP address that is managed as a cluster resource.

Either that IP address or the virtual hostname is used by clients to access the cluster system.

The virtual IP address and the virtual hostname are assigned to the active node.

Failover cluster instance

An instance of a (Windows) service that manages an IP address resource, a network name resource, and

additional  resources  that  are  required  to  run  one  or  more  applications  or  services.  Clients  can  use  the

network  name  to  access  the  resources  in  the  group,  similar  to  using  a  computer  name  to  access  the

services on a physical server. However, because a failover cluster instance is a group, it can be failed over

to another node without affecting the underlying name or address.

Virtual server

A virtual server is a resource group that contains an IP address resource and a network name resource.

When an application is hosted in a virtual server, the application can be accessed by clients using the IP

address or network name in that resource group.

As the resource group fails over across the cluster, the IP address and network name remain the same,

therefore the client becomes unaware of the physical location of the application and will continue to work

in the event of a failure of one of the servers in the cluster.

Cluster_Guide_MW40.docx

Version: 1.0.23049

Page 8 of 18

Cluster Guide for HYDRA MW4.0pe

Heartbeat

A heartbeat is a periodic signal generated by hardware or software to indicate normal operation.

Usually a heartbeat is sent between nodes at a regular interval in the order of seconds. If a heartbeat isn't

received  for  a  time,  usually  a  few  heartbeat  intervals,  the  node  that  should  have  sent  the  heartbeat  is

assumed to have failed.

Failover

Server clusters monitor the health of the nodes in the cluster and the resources in the cluster. In the event

of a server failure, the cluster software re-starts the failed server's workload on one or more of the remaining

servers. If an individual resource or application fails (but the server does not), server clusters will typically

try to re-start the application on the same server. If that fails, it moves the application's resources and re-

starts  it  on  the  other  server.  The  process  of  detecting  failures  and  restarting  the  application  on  another

server in the cluster is known as failover or failover switch.

Failback

In the event of the failure of a server in a cluster, the applications and resources are failed over to another

node in the cluster. When the failed node rejoins the cluster (after reboot for example), that node now is

free to be used by applications. A cluster administrator can set policies on resources and resource groups

that allow an application to automatically move back to a node if it becomes available, thus automatically

taking advantage of a node rejoining the cluster. These policies are known as failback policies. You should

take  care  when  defining  automatic  failback  policies  since  depending  on  the  application,  automatically

moving the application (which was working just fine) may have undesirable consequences on the clients

using the applications.

Quorum resource

Server clusters require a quorum resource to function.

The quorum resource, like any other resource, is a resource which can only be owned by one server at a

time, and for which servers can negotiate for ownership. Negotiating for the quorum resource allows Server

clusters to avoid "split-brain" situations where the servers are active and think the other servers are down.

This can happen when, for example, the cluster interconnect (private network) is lost and network response

time is problematic. The quorum resource is used to store the definitive copy of the cluster configuration so

that regardless of any sequence of failures, the cluster configuration will always remain consistent.

Cluster_Guide_MW40.docx

Version: 1.0.23049

Page 9 of 18

Cluster Guide for HYDRA MW4.0pe

Active/Active versus Active/Passive

Active/Active and Active/Passive are terms used to describe how applications are deployed in a cluster.

Unfortunately, they mean different things to different people and so the terms tend to cause confusion.

Here is MPDVs understanding of those terms:

From the perspective of a single application, e.g. HYDRA:

  Active/Active  means  that  the  same  application  or  pieces  of  the  same  service  can  be  run

concurrently on different nodes in the cluster.

 Not supported by the HYDRA application!

  Active/Passive means that only one node in the cluster can be hosting the given application.

 Typical for the HYDRA application

From the perspective of the cluster:

  Active/Active means that all nodes in the cluster are running applications.

For example the database is running on one node and the application is running on the second

node.

 Basically supported by the HYDRA application.

But special attention has to be paid to the dependencies between the HYDRA application

and its database (see chapter “3.3.1 Dependencies”).

  Active/Passive  means  that  one  of  the  cluster  nodes  is  spare  and  not  being  used  to  host

applications.

 Typical for a HYDRA cluster because all dependencies between the HYDRA application

and its database are easy to provide.

Cluster_Guide_MW40.docx

Version: 1.0.23049

Page 10 of 18

Cluster Guide for HYDRA MW4.0pe

3  HYDRA in a Cluster

3.1  Requirements

Before installing HYDRA on a cluster system make sure that:

  The cluster hardware and software is preinstalled either by the customer or by a system vendor.

  The  installed  edition  and  version  of  the  operating  system  on  both  cluster  nodes  is  approved  by

MPDV for the use with HYDRA (see the hardware and software guide for HYDRA).

  The  database  server  software  is  preinstalled  on  both  cluster  nodes  according  to  the  cluster

requirements either by the customer or by a system vendor.

Prior to the database installation MPDV should provide its public database installation manual  to

the customer’s cluster specialist so that he or she could merge the requirements for HYDRA with

the required installation and configuration steps for the cluster system itself.

  The installed edition and version of the database server software on both cluster nodes is approved

by MPDV for the use with HYDRA (see the hardware and software guide for HYDRA).

  The HYDRA database files can be stored on the shared storage device.

  All installation directories for the HYDRA server software, HYDRA client software to be installed on

the server, e.g. HYDRA MOC, and any additional HYDRA server software, e.g. smartMES (SMA),

SCS-HCKZ, SCS-HCKP, B-COMM, etc. can be stored on the shared storage device.

  All cluster resources necessary for the basic cluster configuration, e.g. like storage device(s), virtual

IP address and virtual hostname, are set up correctly.

  All dependencies between the cluster resources are set up correctly.

The resources for the virtual IP address and the virtual hostname should be at the very end of that

chain of dependencies.

  The cluster specialist who set up the cluster system is available on site during the installation of

HYDRA.

Cluster_Guide_MW40.docx

Version: 1.0.23049

Page 11 of 18

Cluster Guide for HYDRA MW4.0pe

3.2

Installing the HYDRA Database

Due to the requirements in chapter “3.1 Requirements” the appropriate database software should already

be installed and be available on both cluster nodes.

Make sure that the database installation and configuration matches the requirements defined in MPDVs

database installation manual.

Create the HYDRA database(s) according to MPDVs database installation manual.

Make sure that the HYDRA database files are stored on the shared storage device.

Make sure that the cluster specialist creates new cluster resources for each HYDRA database instance like

this (X = number of the HYDRA system):

  Resource  “SQL  Server  (MIPMSX)”  for  Windows  service  “SQL  Server  (MIPMSX)”  (database

instance for HYDRA system X)

  Resource “SQL Server Agent (MIPMSX)” for Windows service “SQL Server Agent (MIPMSX)”

  Resource “SQL Server Browser” for Windows service “SQL Server Browser”

Repeat that process for all installed HYDRA database instances.

Make sure that all SQL Server services using startup type “Automatic” as default are set to “Manual” and

are controlled by the cluster management software.

The functionality of the HYDRA database depends on the basic cluster resources like storage device(s),

virtual IP address and virtual hostname (see chapter “3.1 Requirements”).

The following dependencies must be set in the cluster management software:

  Resource “SQL Server (MIPMSX)” depends on the basic cluster resources like storage device(s),

virtual IP address and virtual hostname.

  Resource “SQL Server Agent (MIPMSX)” depends on resource “SQL Server (MIPMSX)”

  Resource “SQL Server Browser” depends on the basic cluster resources like storage device(s),

virtual IP address and virtual hostname.

Repeat that process for all installed HYDRA database instances.

Make sure that when you switch to the other cluster node the database is available and accessible there

as well.

Cluster_Guide_MW40.docx

Version: 1.0.23049

Page 12 of 18

Cluster Guide for HYDRA MW4.0pe

3.3

Installing HYDRA

The HYDRA installation process is basically the same as on any single server.

With a cluster system you have to run the whole HYDRA installation process on every cluster node.

When  installing  on  the  second  cluster  node  some  installation  steps  can  be  skipped  because  they  are

already available from the installation performed on node number one, e.g. where configuration files need

to be edited or the part where the database is loaded with initial HYDRA data.

Other  installation  steps  will  need  some  special  preparation  because  certain  target  directories  and  their

contents already exist because of the installation performed on node number one, e.g. the installation of

the WSP (Web Service Provider) and EMQTT services.

Make  sure  that  wherever  you  would  use  the  IP  address  or  the  hostname  of  a  single  server  during  the

HYDRA installation you are now using the virtual IP address or virtual hostname of your cluster system

instead.

Make sure that the HYDRA application directory (e.g.: d:\mip1) is located on the shared storage device.

Install HYDRA on the first cluster node according to the HYDRA installation manual.

During that installation whenever you install Windows Services using startup type “Automatic” make sure

to set the startup type to “Manual”.

All those services need to be monitored and controlled by the cluster management software later.

That applies at least to the following services (X = number of the HYDRA system):



“MIP IPC-Server”

Inter Process Communication Server as part of the HYDRA Base System

(provides communication services for all installed HYDRA systems)



“MIP Server Agent”

Server Agent for the HYDRA Base System

Cluster_Guide_MW40.docx

Version: 1.0.23049

Page 13 of 18



“MIPX Server Agent”  Server Agent for HYDRA system X

Cluster Guide for HYDRA MW4.0pe



“MIPX Maintenance Manager” Maintenance Manager for HYDRA system X

Make sure that the cluster specialist creates new cluster resources for HYDRA like this:

(X = number of the HYDRA system)

  Resource “HYDRA Base System” for service “MIP Server Agent”

  Resource “HYDRA IPC-Server” for service “MIP IPC-Server”

  Resource “HYDRA System X” for service "MIPX Server Agent"

  Resource “Maintenance Manager HYDRAX” for service "MIPX Maintenance Manager"

By design the “Server Agents” of each HYDRA system (e.g. “HYDRA Base System”, “HYDRA System X”)

are  monitoring  all  HYDRA  services  belonging  to  the  according  system  (except  “HYDRAX  Maintenance

Manager”) and will (re)start them if necessary, e.g. during a system start or after a program crash.

Whenever a “Server Agent” is stopped it will stop all those services of the corresponding HYDRA system

as well.

If the “HYDRA Base System” is stopped it will stop all available HYDRA systems “HYDRA System X” as

well.

Therefore  it  is  not  necessary  to  have  most  of  the  other  HYDRA  services  monitored  by  the  cluster

management software.

Make sure that HYDRA is running ok on the first node.

Make sure that all new HYDRA resources are set “offline” in the cluster management software then switch

to the second cluster node.

Install HYDRA on the second cluster node according to the HYDRA installation manual.

Cluster_Guide_MW40.docx

Version: 1.0.23049

Page 14 of 18

Cluster Guide for HYDRA MW4.0pe

On the second cluster node some installation steps can be skipped, e.g. where configuration files need to

be edited or the part where the database is loaded with the initial HYDRA data.

Those steps were already done during the installation on node one.

Other  installation  steps  will  need  some  special  preparation  because  certain  target  directories  and  their

contents already exist because of the installation performed on node number one, e.g. the installation of

the WSP (Web Service Provider) and EMQTT services.

Make sure that HYDRA is running ok on the second node as well.

HYDRA client software to be installed on the server, e.g. HYDRA MOC, and any additional HYDRA server

software, e.g. smartMES (SMA), SCS-HCKZ, SCS-HCKP, B-COMM, etc. must be installed on both cluster

nodes according to their installation manuals.

Make sure that all their installation directories are located on the shared storage device.

Make sure that the cluster specialist creates new cluster resources  for every installed additional HYDRA

server software, e.g. smartMES (SMA), SCS-HCKZ, SCS-HCKP, B-COMM, etc.

Make sure that the HYDRA client software and all additional HYDRA server software is running ok on both

cluster nodes.

Cluster_Guide_MW40.docx

Version: 1.0.23049

Page 15 of 18

Cluster Guide for HYDRA MW4.0pe

3.3.1  Dependencies

The following rules always apply for HYDRA systems:



If HYDRA is running the database must be available continuously (an unavailable database, even

for just a few seconds, could cause problems for HYDRA services and HYDRA clients).

  Shutdown HYDRA first before you shut down the database (even if it is only down for just a few

seconds).

  Startup HYDRA only as soon as the database is up and running.

  Shutdown and Startup of HYDRA always means shutting down and starting up the corresponding

HYDRA Maintenance Manager as well.

Make sure that those rules are always be applied in your cluster configuration.

The following dependencies must be set in the cluster management software:

  Resource “HYDRA Base System” depends on the basic cluster resources especially on the virtual

IP address and the virtual hostname.

  Resource “HYDRA IPC-Server” depends on the resource “HYDRA Base System”.

  Resource “HYDRA System X” depends on the resources “HYDRA Base System”, “HYDRA IPC-

Server” and “SQL Server (MIPMSX)”.

  Resource “Maintenance Manager HYDRAX” depends on the resource “HYDRA System X”.

  All resources for additionally installed HYDRA server software, e.g. smartMES (SMA), SCS-HCKZ,

SCS-HCKP, B-COMM, etc. usually depend on the resource “HYDRA System X”.

3.3.2

Function Tests

Make sure that all HYDRA resources are set “online” in the cluster management software then check the

proper functionality of HYDRA on every cluster node by simulating failover switches to each cluster node.

Make sure that the HYDRA clients (e.g.: MOC, AIP 8.2 (AIP2), SMA clients, etc.) are working properly no

matter which cluster node is the active one.

Cluster_Guide_MW40.docx

Version: 1.0.23049

Page 16 of 18

Cluster Guide for HYDRA MW4.0pe

3.3.3

get_stat Information

After the HYDRA installation is fully completed the current settings and configurations of the system need

to be documented and be backed up.

Logon to the HYDRA server as local user “mipadm”.

Open the environment for the HYDRA system you want to work in.

e.g. start the command prompt "MS-DOS MIP 1"

Run the following commands:

cd d:\mip1\inbetr

get_statm.bat

get_statm.bat creates a folder like get_stat_YYYY-MM-DD.1 (e.g.: get_stat_2019-05-21.1).

Rename that folder to: get_stat_YYYY-MM-DD.1.node1

Switch to the second cluster node and create the get_stat information there again.

Rename that folder to: get_stat_YYYY-MM-DD.1.node2

Please compress those folders, e.g. by using ZIP and make them available to MPDV Mikrolab GmbH.

That data will be stored in the customer archive of MPDV Mikrolab GmbH and is used as basic information

for future requests for support at the MPDV hotline.

Cluster_Guide_MW40.docx

Version: 1.0.23049

Page 17 of 18

Cluster Guide for HYDRA MW4.0pe

3.4  Special Configurations

When using a cluster system sometimes the customers want to use both cluster nodes at the same time.

See terms “Active/Active versus Active/Passive” in chapter “2.2 Terms and Definitions”.

Please be aware that HYDRA can only run on one cluster node at any point in time.

With  HYDRA  it  would  basically  be  possible  to  run  the  HYDRA  application  on  one  cluster  node  and  the

HYDRA database on the other node.

In  that  case  all  notes  regarding  “separate  HYDRA  application  and  database  servers”  in  MPDVs

installation manuals would apply and must be followed.

In a cluster environment such a configuration would make the use of additional virtual IP addresses and

virtual hostnames necessary.

At least one set for the application and one set for the database would be necessary.

To run the HYDRA application on a different cluster node than the HYDRA database would require to have

the application and the database set up in different resource groups.

Because  resource  dependencies  are  confined  to  a  single  resource  group  that  setting  will  not  allow  the

configuration of the required dependencies between the HYDRA application and its database (see chapter

“3.3.1 Dependencies”).

With such a configuration the customer has to ensure the integrity of the dependencies between

the HYDRA application and its database by other means.

Those dependency rules need to be followed either by a real person like the system administrator or by a

piece of software like a cluster management software.

Cluster_Guide_MW40.docx

Version: 1.0.23049

Page 18 of 18

