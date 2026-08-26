Event Durations

1  Event Durations

Summary

Menu

Quality management  Process analysis  Event durations analysis

Transaction code

pevedrp

Function authorization

pevedrp

This application is used for the event analysis of process events that have been recorded in the process

data collection of the machine. These events are evaluated as intervals.

Usage

The  application  "Event  durations"  lists  the  process  events  in  table  form.  It  is  assumed  here  that  a  start

event  (bit  value  =  1)  and  an  end  event  (bit  value  =  0)  belong  together  and  form  an  interval.  The

application shows these intervals and their durations. In addition, by grouping the events, a quantity and

total time of occurrence of this event becomes visible.

Integration

The events and thus digital process values are recorded from the machine using the PDV module, similar

to  analog  measured  values,  i.e.  process  parameters  for  defined  process  characteristics.  These  can  be

unevaluated signals, error signals or message signals.

The events displayed in the "process events" application are processed further here.

Requirement

The process data collection must be set up for collecting the events.

Selection parameters

The following selection criteria are available in the application:

Machine

The machine to be evaluated.

Event type

Based on the configuration in the event master data,  the type of the events may be  filtered here,

e.g. "F" or "H".

MOC_ProcessEventDurationReport.docx

Version:

Page 1 of 2

Period from - until

Limitation of the search for events to this period. The start and end events are selected within this

period. In so doing, open end intervals are always calculated up to the end of the selection period.

In addition, the start and end time may be selected by defining a relative date.

Event Durations

Consider long-term data

Long-term data may also be taken into account by clicking the relevant checkbox.

Field descriptions

Machine category

Master data of the machine such as machine, short name and designation

Event category

Master data of the recorded process event

Period category

Start, end and duration of the interval

Grouping:

If grouped by the event designation, the number of events and their total duration are displayed in

the total line.

MOC_ProcessEventDurationReport.docx

Version:

Page 2 of 2

