Performance Accounts

Resource

Performance

AccountsResource

1  Resource Performance Accounts

Overview

Menu

System  Administration    System  Settings    Resource  Performance
Accounts

Transaction code

rpa

Function authorization  mdrpa.*

Application to define the resource performance accounts.

Usage

The resource performance accounts (RPA) consist of 12 time accounts, which are processed by HYDRA

in relation to both operation and machine. They are used for classified time recording, as is customary in

REFA, and can be used in various reports and evaluations.

Depending on the current status of the machine, the time is charged to the resource performance account

that was defined for this particular status during system configuration.

MOC_ResourcePerformanceAccounts.docxVersion: 1.0.1362

Page 1 of 3

Resource

Performance

AccountsResource

Performance Accounts

Integration

Prerequisites

Selection Criteria

The following selection criteria are available to the application:

RPA Abbreviation

Unique resource performance account abbreviation

RPA Number

Unique running resource performance account number

Designation

Resource performance account designation

Field Descriptions

RPA Abbreviation

Unique resource performance account abbreviation

RPA Number

Unique running resource performance account number

Designation

Resource performance account designation

Details

The following resource performance accounts are available in HYDRA by default:

RPA  Abbreviation  Designation

1

2

3

SUT

Secondary usage time

DCI

LCI

Disturbance-caused interruption
Defect related interruption
(= technical interruption)

Logistics-caused interruption
Process related interruption
(= organizational interruption)

Color

Dark Green

Red

Pink (Magenta)

MOC_ResourcePerformanceAccounts.docxVersion: 1.0.1362

Page 2 of 3

Resource

Performance

AccountsResource

Performance Accounts

RPA  Abbreviation  Designation

SCI

IMN

IMS

Staff-caused interruption
Staff related interruption

Idle mode, not scheduled
Not in use, not planned

Idle mode, scheduled
Not in use, planned

SET

Setup

STA

Startup

U8

U9

Free (e.g. test production)

Free

MUT

Main usage time; "Production"

4

5

6

7

8

9

10

11

12

Color

Violet (Purple)

Black

Dark Gray

Light Turquoise

Light Blue

Dark Blue

Brown

Light Green

BKS

Neutral time, e.g. off, breaks: times not collected

Olive Green

The  number  of  resource  performance  accounts  is  exactly  12.  It  is  not  possible  to  define  new  resource

performance accounts or delete existing accounts. Only a resource performance account designation can

be modified.

A HYDRA consultant can define the usage of the resource performance accounts as part of the

customization process to meet customer requirements. The following restrictions are applicable:

  Productive times are always posted to RPA 11.

  Neutral times (e.g. no-shift times like weekends) are always posted to RPA 12.

  The  capacity  utilization  rate  is  calculated  using  the  fixed  formula  described  in  the

capacity utilization rate.

No status can be collected for group workplaces. The system collects all times to RPA 11.

MOC_ResourcePerformanceAccounts.docxVersion: 1.0.1362

Page 3 of 3

