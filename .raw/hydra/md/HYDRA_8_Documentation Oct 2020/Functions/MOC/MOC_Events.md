PDV Events

1  PDV Events

Summary

Menu

Master Data  Process Data Processing  Events

Transaction code

peve

Function authorization

peve

Utilization

With  PDV  events,  various  events  that  can  occur  on  the  machine  can  be  configured  and  collected.  In

addition,  the  configured  PDV  events  can  be  identified  as  an  alarm,  which  can  create  an  appropriate

output signal if it occurs on the machine.

The assignment of the PDV events to a physical channel on a machine is performed by configuring the

logical  channels.  A  log,  or  the  time-related  documentation  of  the  events  that  occur,  can  be  carried  out

using the protocol dialog described in the "Process events" application.

PLEASE NOTE!

To do this, in the configuration of the logical channels both the type (E) and the related control must be

correctly parameterized.

Selection parameters

The following selection criteria are available in the respective application:

Event ID

Option to search for an event identification with a wildcard function.

Designation

Option to search for an event designation with a wildcard function.

Field description

The PDV event configuration contains the following information:

Event ID

Unique identification of the configured event

Designation

Optional parameter with which a designation can be assigned to an event configuration

Alert

Identifier as to whether or not the event is to trigger an alarm (physical signal) when it occurs

MOC_Events.docx

Version: 1.2.1362

Page 1 of 2

PDV Events

Alert duration

Delay  time  specifying  how  long  after  the  event  has  occurred,  the  alert  is  to  remain  at  the  alarm

channel. The unit is entered in seconds.

Event type

Declaration of the event type: entered as event (F) or as hint (H). If no type is defined, the default

type (P) will be entered.

Event category

Category  to  classify  events  (also  referred  to  as  malfunctions)  and  notes  e.g.  in  the  evaluation  of

process events.

MOC_Events.docx

Version: 1.2.1362

Page 2 of 2

