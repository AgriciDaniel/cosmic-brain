Manual

SMA-FTP Touch2Plan
SMA-FTP 8.2

Version 1.0.23049

Last changed on: 02.09.2020

SMA-FTP Touch2Plan

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

SMA-FTP Touch2Plan

Version: 1.0.23049

Page 2 of 13

SMA-FTP Touch2Plan

Contents

1  SMA-FTP Touch2Plan ................................................................................. 4

2  Touch2Plan .................................................................................................. 5

2.1  General ............................................................................................................... 5

2.2  Overview ............................................................................................................. 5

2.3

Individual applications ......................................................................................... 6

2.3.1  Planning .................................................................................................. 6

2.3.2  Configuration ........................................................................................... 8

2.3.3  Resource configuration ............................................................................ 9

2.4  Examples .......................................................................................................... 12

2.4.1  Create machine ..................................................................................... 12

2.4.2  To process a machine ........................................................................... 12

2.4.3  Plan an order ......................................................................................... 13

2.4.4  Finalize order ......................................................................................... 13

2.4.5  Reschedule an order ............................................................................. 13

SMA-FTP Touch2Plan

Version: 1.0.23049

Page 3 of 13

SMA-FTP Touch2Plan

1  SMA-FTP Touch2Plan

Purpose

The function package SMA-FTP Touch2Plan  includes functions for production control,  work scheduling,

production  management  and  for  supervisors  for  rapid,  mobile  planning  and  consideration  of  the  current

production plan with the following features:



Individual configuration options for each machine to be displayed

  Clear calendar presentation of the production plan



Intuitive operating elements

  Planning functions for allocating, reallocating or deallocating operations

  Conflict verifications (check for violations of basic dates and capacity over-utilization) in planning

  Real-time synchronization with the HYDRA server

SMA-FTP Touch2Plan

Version: 1.0.23049

Page 4 of 13

SMA-FTP Touch2Plan

2  Touch2Plan

2.1  General

Using Touch2Plan a member of staff can directly  control planned orders  in  production.   An overview  of

planned orders in form of a calendar is now available.

2.2  Overview

On  the  home  page  of  the  application  Touch2Plan  you  have  the  option  to  select  "Planning",

"Configuration"  and  "Resource  configuration".    Selecting  one  of  the  three  options  a  corresponding

application opens automatically.

SMA-FTP Touch2Plan

Version: 1.0.23049

Page 5 of 13

SMA-FTP Touch2Plan

2.3

Individual applications

2.3.1 Planning

The planning application presents the currently configured machines and planned orders clearly.  Using

this application the production supervisor can obtain information about the current production planning for

the next few days or can carry out planned activities (planning, canceling or rescheduling of orders).

SMA-FTP Touch2Plan

Version: 1.0.23049

Page 6 of 13

SMA-FTP Touch2Plan

Function keys

 Planning mode activated/diactivated

This function enables the planning mode to be activated or disactivated.  Please note that planning

activities can only be issued when the planning mode is active.

 Update

Using this function current data (planned orders and order backlog) is downloaded from the HYDRA

server and displayed in the Touch2Plan application.

 Release planning

This function enables to store  the current  planning state.   That means that  planned  events of the

modified orders are transferred to the HYDRA server and updated.

 "Today"

Requesting the function today's date is used as the first day in the calendar and appears to the left.

Using the search function you can find orders with the aid of the order number.

  Search

 Showing times

Requesting this function on the left next to the calendar you can see for each time block the time of

day. The individual time block presents the time of day.

 Browse through the calendar

Using the arrows of the calendar you can scroll backward and forwards.

SMA-FTP Touch2Plan

Version: 1.0.23049

Page 7 of 13

SMA-FTP Touch2Plan

2.3.2 Configuration

The application "Configuration" includes the setting of the overall application.  This configuration specifies

the settings of the overall application.  You can define here, additionally to the display, the planned period

for the machine.

Field Description

Display?

Should be machine be displayed in the application when it has been planned in?

Sorting

This  numbering  defines  the  sequence  of  the  display  in  the  planning  application.    The  smaller  the

number the further on the left the machine is displayed.

Planning horizon

This  value  determines  how  many  days  in  advance  planning  can  be  issued.    Please  note  that  the

performance of the application relates to the number of data being displayed.

Period in the past

Defining the past enables one to obtain an overview over production of the previous few days. The

past defines therefore how many days from the past must be displayed for planning purposes.

SMA-FTP Touch2Plan

Version: 1.0.23049

Page 8 of 13

SMA-FTP Touch2Plan

2.3.3 Resource configuration

The application "Resource configuration" includes the function to configure machines for the Touch2Plan

application.

Function keys

Using  this  function  a  new  machine  for  display  and  planning  purposes  can  be  set  up  in  the

Touch2Plan.  If this function is requested a separate input tab appears where required data can be

inserted.

This button can download an existing resource configuration.  If an existing resource configuration

is downloaded the name of the downloaded resource appears in the selection list.

This function enables to add breaks to a machine (times when the machine is not producing).  If this

function is requested a separate input tab appears where start and end of breaks can be stored.

SMA-FTP Touch2Plan

Version: 1.0.23049

Page 9 of 13

SMA-FTP Touch2Plan

This function can delete the currently downloaded machine configuration.  Please note that deleting

only refers to the application in the Touch2Plan and has no effect on the HYDRA configuration.

Using this function you can directly change to the planning application.

When using the saving function the currently entered values for the selected machine are stored on

the mobile device.

Using this function the not yet saved entries can be rejected.

SMA-FTP Touch2Plan

Version: 1.0.23049

Page 10 of 13

SMA-FTP Touch2Plan

Field Description

Capacity (per thousands)

This value defines how many orders can be planned in simultaneously on a machine.  Please note

that every order has a demand of 1000 by default.

Percentage

This number defines when a time block is considered "assigned" (in percentages).

Time block factor

This value defines the period of time represented by a time block.  For example time block factors =

120min are selected meaning that the time block for this machine is always 2 hours. Available times

must be entered like the following: 0:00 - 2:00. 2:00 - 4:00, 4:00 - 6:00 etc.

Available times from/until

Both times define from what time and until when the machine is available.

Number of displayed days

This value can specify how many days are simultaneously displayed in the calendar of the planning

application.

Break times

If there is a break specified for the machine then it is shown in the list of break times.  Break time

can be added using the function

.

Shift duration

This value specifies the times after which an optical separation is inserted into the time blocks.

SMA-FTP Touch2Plan

Version: 1.0.23049

Page 11 of 13

SMA-FTP Touch2Plan

2.4  Examples

2.4.1 Create machine

In order to create a new machine for the application  you must request the function

in  the  application  "Resource  configuration".    You  can  enter  the  required  information  in  the  screen  now

opening (see screenshot).

In the above example machine 33021 is created available daily from 06.00 until 22.00.  Each time block in

the planning calendar represents one hour (60 min).

2.4.2 To process a machine

In order to process an existing machine select in the box

.  The current valid data of the

machine is displayed in the screen and can be changed there.

SMA-FTP Touch2Plan

Version: 1.0.23049

Page 12 of 13

SMA-FTP Touch2Plan

2.4.3 Plan an order

Please proceed as follows to plan an order:

1.

(Optional) Activate planning function by the selecting the function

2.  Select the order to be planned (highlighted in color)

3.  Select time block for the order to be planned

4.  Release planning using the function

2.4.4 Finalize order

Please proceed as follows to finalize an order:

1.

(Optional) Activate planning function by the selecting the function

2.  Select  the  finalized  order  (highlighted  in  color  and  a  symbol  is  additionally

attached)

3.

 Select symbol (the order is then transferred into the order backlog)

4.  Release planning using the function

2.4.5 Reschedule an order

Please proceed as follows to reschedule an order:

1.

(Optional) Activate planning function by the selecting the function

2.  Select the order to be reschedule (highlighted in color and an X is additionally attached).

3.  Select

 function

4.  Select time block in order to reschedule the order

5.  Release planning using the function

SMA-FTP Touch2Plan

Version: 1.0.23049

Page 13 of 13

