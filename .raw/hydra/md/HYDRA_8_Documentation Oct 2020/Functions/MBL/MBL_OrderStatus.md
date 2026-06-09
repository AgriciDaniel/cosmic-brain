Updating of the Posting Status

1  Updating of the Posting Status

1.1

1.1  Summary

The functional area "updating of the posting status" has been designed to calculate statuses on the basis

of recorded events. A status describes the condition of an object regarding the values that vary over time

(e.g. OP status, posting status, etc.) and the relations between objects (e.g. OP is logged on to machine,

person is logged on to OP and machine).

Usually,  posting  relations  are  generated  for  logons  (operation  to  machine,  person  to  machine  and

operation) and canceled when they are interrupted/logged off.

An object's posting status is updated every time when the event to be posted directly or indirectly affects

the object.

Examples:

  By logging an operation on, this registered operation is set to the "running" status. The "operation

logon" event directly affects the operation.

  By  way  of  automatically  recorded  machine  counters,  resulting  quantities  are  posted  onto  the

operations  that  are  currently  active  at  the  machine.  The  "automatic  counter  posting"  event

indirectly affects the operation(s).

The posting status also has an essential influence on which events are triggered by a dialog. Thus, the

"log all persons off" dialog (P_AAB), for example, determines all persons who are active at the machine

from the posting status and generates or posts a "personnel logoff" event for each person.

MBL_OrderStatus.docx

Version: 1.0.1362

Page 1 of 1

