Process Events

1  Process Events

Summary

Menu

Quality Management  Process Analysis  Process Events

Transaction code

pevea

Function authorization

pevea

This application is used for the event analysis of process events that have been recorded in the process

data collection of the machine.

Usage

The application lists the process events in table form. An entry is made for each event regarding whether

the event was started (bit value = 1) or ended (bit value = 0).

Integration

The  way  analog  measured  values,  i.e.  process  parameters  for  defined  process  characteristics  are

recorded from the machine using PDV, the events are digital process values. These can be unevaluated

signals, error signals or message signals.

Prerequisite

The process data collection must be set up for collecting the events.

Selection criteria

The following selection criteria are available in the application:

Machine

The machine to be evaluated.

Event ID

The event to be evaluated or, with wildcards, multiple events.

Event from - to

Limitation of the search for events to this period. The start and end events are selected within this

period. In addition, the start and end time of an event may be selected by defining a relative date.

MOC_ProcessEvents.docx

Version: 1.1.1362

Page 1 of 2

Detail application: process events

This tabular report shows the process events recorded and saved in the database including the following

Process Events

information:

Machine

Machine where the process event was recorded

Short designation

Short name of the machine where the process event was recorded

Designation

Name of the machine where the process event was recorded

Event ID

Technical name of the recorded event

Designation

Event name

Event time

Time of measurement of the process event

Value

Value of the recorded process event

MOC_ProcessEvents.docx

Version: 1.1.1362

Page 2 of 2

