Print Time Tickets

1  Print Time Tickets

Summary

Menu

Production control  Production support  Pool of orders

Transaction code

- (plop for pool of orders)

Function authorization

reptimet

Usage

The purpose of these functions is to generate a time ticket. A separate time ticket (or goods issue/ goods

receipt document) can be created and printed for each order.

Integration

The function is called up from the order backlog application. Depending on the order/ orders selected, a

separate time ticket is displayed in the preview screen for each order, which can be printed from there.

To print the time ticket/ time tickets, follow the steps listed below:

1.

In the list, highlight the orders/ operations you would like to print out on the time ticket. Click on

the top left-side corner of the table if you want to highlight all operations.

2.  Click on the "time ticket" icon to call up the print preview screen. In it, there will be one new page

for each order.

3.  Click on the icon "Print report"

 in the print preview to print out the time tickets on the default

printer set in MOC.

Please note: Printing the time tickets will cause an indicator "printed" to be set at the relevant operation.

The indicator is made available for display in the order overview.

A  printout  contains  all  important  barcodes  needed  to  post  all  of  this  order's  operations.  The  information

displayed is defined in the relevant order header.

Notes about the selected fields

Start date

Planned start as specified in the operation (Dates index tab).

Finish date

Planned end as specified in the operation (Dates index tab).

MOC_PrintSFTimeTickets.docx

Version: 1.0.1362

Page 1 of 3

Print Time Tickets

Set up

Setup time as specified in the operation (Dates index tab).

Please note: Any existing setup time addition is not taken into account.

Processing

Processing time as specified in the operation (Durations index tab).

Please note: In the event of any change in the target cycle and/or the partitioning (e.g. planning in

HLS using production variants), this will not update the processing time at the operation.

Tr

Te

Target tr as specified in the operation (Durations index tab).

Target te as specified in the operation (Durations index tab).

The layout can be adjusted to customer specifications when HYDRA is customized.

MOC_PrintSFTimeTickets.docx

Version: 1.0.1362

Page 2 of 3

Print Time Tickets

MOC_PrintSFTimeTickets.docx

Version: 1.0.1362

Page 3 of 3

