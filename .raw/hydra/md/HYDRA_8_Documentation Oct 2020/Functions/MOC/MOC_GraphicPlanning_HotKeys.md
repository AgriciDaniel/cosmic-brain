Graphic Planning Board - Debugging Information
1 Graphic Planning Board - Debugging Information
Usage
This document describes the possibilities of technical analysis.
Among other features, hot keys to be used in the graphic planning board of MOC are described. Hot keys
activate internal configurations and log files used for support and debugging purposes.
Requirements
The use of such hot keys is only allowed for support purposes.
Hot keys
Hot key Description
Ctrl+Alt+Shift+F1
Ctrl+Alt+Shift+F2 Display of internal netronic Gantt bar definitions:
Ctrl+Alt+Shift+F3 Display of internal netronic Gantt grouping definitions:
MOC_GraphicPlanning_HotKeys.docx Version: 1.0.1362 Page 1 of 5

    Graphic Planning Board - Debugging Information

| Hot key  | Description  |     |
| -------- | ------------ | --- |

Ctrl+Alt+Shift+F4  Display of internal netronic Gantt table definitions:

| Ctrl+Alt+Shift+F5  | Activation/deactivation of "NodeInfo":  |     |
| ------------------ | --------------------------------------- | --- |

MOC_GraphicPlanning_HotKeys.docx  Version: 1.0.1362  Page 2 of 5

    Graphic Planning Board - Debugging Information

| Hot key  | Description  |     |
| -------- | ------------ | --- |
When activated, double-clicking shows an operation bar displaying
the stored node information (after closing the "Change target data"
dialog):

| Ctrl+Alt+Shift+F6  |     |     |
| ------------------ | --- | --- |
| Ctrl+Alt+Shift+F7  |     |     |
Ctrl+Alt+Shift+F8  Generation and display of dump information of planning component:

| Ctrl+Alt+Shift+F9  | Set debugging level to 1:  |     |
| ------------------ | -------------------------- | --- |

Controls the scope written in the log file
|     | "c:\Dokumente  und  | Einstellungen\<User>\Anwendungsdaten\  |
| --- | ------------------- | -------------------------------------- |
MPDV\MOC\log\hypk32_<User>.log".
| Ctrl+Alt+Shift+F10  | Set debugging level to 5:  |     |
| ------------------- | -------------------------- | --- |

MOC_GraphicPlanning_HotKeys.docx  Version: 1.0.1362  Page 3 of 5

    Graphic Planning Board - Debugging Information

| Hot key  | Description  |     |
| -------- | ------------ | --- |

|     |  Attention: the document          |                                        |
| --- | --------------------------------- | -------------------------------------- |
|     | "c:\Dokumente  und                | Einstellungen\<User>\Anwendungsdaten\  |
|     | MPDV\MOC\log\hypk32_<User>.log"   |                                        |
can become very large.
| Ctrl+Alt+Shift+F11  | Set debugging level to 9:  |     |
| ------------------- | -------------------------- | --- |

|     |  Attention: the log file          |                                        |
| --- | --------------------------------- | -------------------------------------- |
|     | "c:\Dokumente  und                | Einstellungen\<User>\Anwendungsdaten\  |
|     | MPDV\MOC\log\hypk32_<User>.log"   |                                        |
will become extremely large (several hundred MB). It may take many
minutes to call up data. Example: MOC Demo: 797 MB, duration: 10
minutes!
Ctrl+Alt+Shift+F12  Display of netronic version information:

When active, a Save under dialog is called up by pressing Alt+d twice
in sequence. Here, a file name (ideally the same) is entered in each
case. Files with the extensions INI, IDF and/or CSV are generated.

MOC_GraphicPlanning_HotKeys.docx  Version: 1.0.1362  Page 4 of 5

Graphic Planning Board - Debugging Information
Hot key Description
These contain the Gantt information (configurations as well as data)
which netronic uses to analyze problems.
Ruby File
The Ruby file is written into the MOC subdirectory "spool", e.g. c:\moc\spool. Prerequisite: the directory
must exist.
MOC_GraphicPlanning_HotKeys.docx Version: 1.0.1362 Page 5 of 5