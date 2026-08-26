Recording the Cavity-Related Partitioning on AIP

1  Recording of the Cavity-Related Partitioning on the AIP

Purpose

You use this function to document changes when tool cavities are opened or closed.

Integration

If you change the so-called partitioning (i.e. the parts per cycle), the partitioning stored for the operation

selected is changed. The change of the partitioning is documented in the machine history.

If you use the Tool and Resource Management (WRM) and if you change the cavity-related partitioning,

then the system also changes the partitioning that is stored for the currently logged on tool.

Requirements

This  functionality  requires  a  license.  The  configuration  requirements  are  described  in  section

Configuration.

Function description

When you open the dialog, the order information is transferred from the operation selected and displayed

in the dialog. Except the field Comment, all fields of the dialog must be filled.

Cavity number (mandatory field)

You can select the cavity number via list (only in connection with WRM) or enter the number manually.

Reason (mandatory field)

The  selection  list  of  the  Reason  shows  reasons  that  you  can  select  according  to  the  "type  of  change"

selected.

Configure the reasons on the client in the configuration "reasons". Distinguish between increase (reason

type "E") and reduction (reason type "R").

Comment (optional field)

You can enter a comment for the posting.

Staff badge number (mandatory field)

Enter the ID/badge number of the person making the posting.

The person must be authorized in the HR master data to change the cycle/partitioning.

AIP_M_TLG_NEST.docx

Version: 1.3.18468

Page 1 of 3

Recording the Cavity-Related Partitioning on AIP

The partitioning is changed on the server. For this reason, you can only change the partitioning

on the server in ONLINE mode because the lists on the terminal cannot be updated otherwise.

Configuration

Configuration on the MOC

To  use  the  function,  you  must  configure  reasons  for  the  increase  or  reduction  of  the  partitioning.  First

create the reason texts on the MOC, then assign them to the reasons. When you configure the reasons,

you  must  distinguish  between  increase  of  partitioning  (reason  type  "E")  and  reduction  of  partitioning

(reason type "R").

Configuration AIP 8.1 or AIP 8.2 in list mode

In the standard configuration file ctaipbut.ini, the configuration has been prepared as follows.

Standard configuration

...
[MNR-ALL-Page2]
;1=M_TLG_NEST,L,Kavität ändern,Objects.png
1=M_TLG,L,Teiligkeit ändern,Objects.png
...

After change of the configuration

...
[MNR-ALL-Page2]
1=M_TLG_NEST,L,Kavität ändern,Objects.png
;1=M_TLG,L,Teiligkeit ändern,Objects.png
...

Configuration AIP 8.2 in tile mode

Please  note  the  specifications  made  for  any  customer-specific  configuration  on  the  AIP.  The

configuration  options  are  presented  in  the  training  EAT-AIP  Extended  Application  Training

MES-Terminal.

1.  Close the shop floor software, if started.

2.  Call the Windows Explorer (e.g. using the shortcut <Windows> + e).

3.  Change to the AIP subdirectory gui.

4.  Create a backup of the file l_anr.xml.

5.  Start an editor (e.g. notepad) and open the file l_anr.xml.

6.  Search for the line, that includes M_TLG :

<OnClick Identifier="M_TLG" Parameterprozessor="TFocusedDataRows">Notify</OnClick>

AIP_M_TLG_NEST.docx

Version: 1.3.18468

Page 2 of 3

Recording the Cavity-Related Partitioning on AIP

7.  Change the identifier from M_TLG to M_TLG_NEST:

<OnClick Identifier="M_TLG_NEST" Parameterprozessor="TFocusedDataRows">Notify</OnClick>

8.  Save the file l_anr.xml.

9.  Start the shop floor software.

AIP_M_TLG_NEST.docx

Version: 1.3.18468

Page 3 of 3

