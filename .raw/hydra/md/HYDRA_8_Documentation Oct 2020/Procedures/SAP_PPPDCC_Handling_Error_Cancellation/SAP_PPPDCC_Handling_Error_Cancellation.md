Manual Maintenance
1 Manual Maintenance
Usage
If the automatic cancellation via the correction functions for the PP-PDC interfacing module was not
successful, you will have to maintain manually.
Requirements:
Use the HYDRA interfacing module to SAP PP via PP-PDC and the correction functions for the PP-PDC
interfacing module.
Approach
If a specific data record cannot automatically be canceled in SAP, it will be presented as incorrect in the
MLE Outbound transactions (status "DONE ERROR" + red light). In this case, the data record must be
canceled manually in SAP. To do so:
cancel the data records via the field "EX_IDENT" of the PP-PDC interface. Also the segment
E2BP_PP_TIMETICKET contains this field for the data record to be canceled. The content of this data
record will be displayed in the MLE Outbound transactions via the function "Show data segments for the
transaction".
SAP will generate an internal number - the confirmation counter - for each confirmed time ticket. In the
production order, the confirmation counter of the original record can be determined as follows:
SAP production order (CO02/ CO03)  transaction overview  transaction details  Transaction
confirmations (Menu)  Transaction confirmations: Detail
In the "Administration" tab the field "Ext. Key" presenting the contents of the field EX_IDENT from the
interface will be displayed. This field can be used to identify the data record and to determine the
confirmation counter.
As soon as the confirmation counter has been determined like that, the original data record can be
canceled using the SAP transaction "CO13". EX_IDENT can again be controlled in the presentation of
this transaction.
Result
You will have proceeded manually to a cancellation that could not be made automatically.
SAP_PPPDCC_Handling_Error_Cancellation.docxVersion: 1.0.18468 Page 1 of 2

|     |     | Manual Maintenance  |
| --- | --- | ------------------- |

SAP_PPPDCC_Handling_Error_Cancellation.docxVersion: 1.0.18468  Page 2 of 2