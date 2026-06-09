|     |     |     | Time Sheet  |
| --- | --- | --- | ----------- |

1  Time Sheet
| 1.1  | General  |     |     |
| ---- | -------- | --- | --- |
The employees can use this application to display their own time sheets for the current and for past
settlement periods.
If clockings are missing, you can also make subsequent clockings and forward them to the supervisor for
approval.
| 1.2  | Overview  |     |     |
| ---- | --------- | --- | --- |
If you call the application, the following screen opens:

You can specify the time sheet layout for each employee in the HR master data. If no time sheet is entered
here, the time sheet number 10 is processed.
The time sheets are displayed as PDF. The browser must natively support the display (example:
Chrome) or you must install a plug-in in the browser (example: Adobe Reader plug-in). It therefore
  depends on the browser and viewer/plug-in how you can control the display. If configured
accordingly, it is possible that the PDF is not displayed, but the document is downloaded.

| PersonalTimeSheet.docx  |     | Version: 1.1.20442  | Page 1 of 2  |
| ----------------------- | --- | ------------------- | ------------ |

Time Sheet
Function keys
Previous month
Displays the time sheet of the previous settlement period.
Subsequent entry of clocking
This button opens the dialog to record a subsequent clocking:
When you have filled the field and confirmed the dialog by clicking OK, the clocking is forwarded to
the supervisor for approval.
The button Subsequent entry of clocking is only available with HYDRA 8. To activate this
button, set the entry "PersonEditClockings“ to "true“ in the file Web.config of the SMA
installation (default storage location: "C:\inetpub\wwwroot\SMA\Web.config“):
<!-- Person edit clockings -->
<add key="PersonEditClockings" value="true"/>
Next month
Displays the time sheet of the next settlement period.
By default, the settlement periods of the current year and of the last two years are available. If no
data or no more data is available for a specific month because of data storage, an empty time
sheet is issued.
PersonalTimeSheet.docx Version: 1.1.20442 Page 2 of 2