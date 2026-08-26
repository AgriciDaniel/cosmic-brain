|     |     |     |     | Print Status List  |
| --- | --- | --- | --- | ------------------ |

1  Print Status List
Summary
Menu  Master data  Workplaces/ machine status assignment  Status list
Transaction code  - (mst for machines/ workplace status assignment)
| Function authorization  mdmst.print  |     |     |     |     |
| ------------------------------------ | --- | --- | --- | --- |

Usage
The purpose of this function is to generate a status list with clear text and barcodes. A barcode provides
the ability to enter the status at a terminal using a barcode reader (e.g. a scanner gun).
Integration
The function is called up from the status assignment of machines/ workplaces.
A printed barcode provides the ability to enter the status at a terminal using a barcode reader (e.g. a
scanner gun).
To print a status list, follow the steps listed below:
1.  In the list, highlight the status you would like to print out on the status list. Click on the top left-
side corner of the table if you want to highlight all statuses.
2.  Click on the "status list" icon to call up the print preview screen. In it, there will be one new page
for each workplace/ machine.
3.  Click on the icon "Print report"   in the print preview to print out the status lists on the default
printer set in MOC.
Structure of the workplace/ machine status barcode
*NNNNN0*
| Place                                       | Designation  |     | Length   |     |
| ------------------------------------------- | ------------ | --- | -------- | --- |
| *  Asterisk                                 |              |     | 1        |     |
| N  Machine status, with preceding zeros     |              |     | 5        |     |
| 0  fixed: 0                                 |              |     | 1        |     |
| *  Asterisk                                 |              |     | 1        |     |
| Length of status barcode without asterisks  |              |     | 6        |     |

MOC_PrintMachineStatusList.docx  Version: 1.0.1362  Page 1 of 2

Print Status List
Please note:
By default, HYDRA supports the barcodes "39", "128" and "Interleaved 2 of 5"
The system only supports barcode detection and automatic assignment to the corresponding input
fields at the terminal for barcode readers that are connected at the serial port (COM port). This is
not possible for barcode readers that are "looped in" through the keyboard.
MOC_PrintMachineStatusList.docx Version: 1.0.1362 Page 2 of 2