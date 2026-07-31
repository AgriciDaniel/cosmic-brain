Arbeiten mit Makros

Gültig ab

WinLine Edition 2022 - Version 12

WinLine Makros

mesonic © 11/2021

Inhaltsverzeichnis

Einleitung ................................................................................................................................. 3
1.
Makros ..................................................................................................................................... 4
2.
Anlage und Aufnahme von Makros ............................................................................................. 4
2.1.
2.1.1.
Eigenschaften ........................................................................................................................... 7
2.1.2.  Methoden ................................................................................................................................. 9
Ereignisse ............................................................................................................................... 28
2.1.3.
Verwaltung von Makros ........................................................................................................... 28
2.2.
Was kann mit Makros gemacht werden? ................................................................................... 29
2.3.
Starten der Makros aus den Favoriten ...................................................................................... 29
2.3.1.
Starten des Makros mit dem Programm .................................................................................... 30
2.3.2.
Starten des Makros aus den externen Programmen ................................................................... 31
2.3.3.
Starten des Makros aus dem Cockpit ........................................................................................ 31
2.3.4.

WinLine Makros

mesonic © 11/2021

Seite 3

1.

Einleitung

In der WinLine ist die VB-Script-Engine eingebaut, die in verschiedenen Teilbereichen unterschiedliche Funk-
tionen ausführen kann:















WinLine FIBU
Formelsprache für das Berechnen von Beträgen in Buchungsarten.

WinLine FAKT
Formelsprache für die Abarbeitung von Formeln in Zusammenhang mit Artikelgruppen (Frachtkos-
tenberechnung, Transportversicherung etc. - ist im Standard möglich).

WinLine LOHN
Formelsprache für die Abarbeitung von Lohnarten (ist im Standard möglich).

WinLine ANBU
Formelsprache für die Berechnung der Staffel-AfA

Makros
Aufzeichnen und Abspielen von immer wieder kehrenden Ereignissen (durchführen von Abschluss-
arbeiten, Datensicherung etc. - ist im Standard möglich)

System Skripten
Programmaufrufe oder Ereignisse können unabhängig vom gerade aktiven Fenster ausgeführt
werden (WinLine - unabhängige Auswertungen etc. - nur mit eigener Lizenz möglich).

Fenster Skripten
Aktionen, die an ein bestimmtes Fenster und dort an ein bestimmtes Ereignis (Anklicken eines But-
tons) geknüpft sind - nur mit eigener Lizenz möglich.

WinLine Makros

mesonic © 07/2020

Seite 4

2.  Makros

Makros sind die Zusammenstellung von einzelnen Ereignissen, die immer den gleichen Ablauf haben und die
auch immer die gleichen Einstellungen erfordern.

Beispiele für Makros sind:




etc.

Tägliche Datensicherung
monatliche Auswertungen
Durchführung Zahlungsverkehr

2.1.

Anlage und Aufnahme von Makros

Makros können auf zwei Arten angelegt werden:




Über einen eigenen Menüpunkt
Über den Ribbon

Die Anlage über den Ribbon " Info Center und Makros" ist die einfachere Methode, da über den Menüpunkt
die Aufnahme nicht gestartet werden kann.

Der Ribbon " Info Center und Makros"

bietet folgende Funktionen:

➢  Eingabefeld
Das Eingabefeld bietet zwei Möglichkeiten





Auswahl eines bestehenden Makros
Aus der Auswahllistbox kann ein bereits vorhandenes Makro ausgewählt werden, das dann zur wei-
teren Bearbeitung zur Verfügung steht.

Anlage eines neuen Makros
Ein neues Makro kann angelegt werden, indem im Eingabefeld der Name des neuen Makros einge-
tragen wird. Wird diese Eingabe bestätigt, erhalten Sie die Abfrage, ob ein neues Makro angelegt
werden soll.

Nachdem ein Makro ausgewählt wurde, können zwei Buttons ausgewählt werden:

➢  Makro Aufzeichnen
Wird dieser Button angeklickt, wird die Aufzeichnung des Makros gestartet. Es wird jede Aktion, die inner-
halb der WinLine ausgeführt wird, aufgezeichnet.

Nach Starten der Aufzeichnung kann eine Beschreibung des Makros eingegeben werden.

WinLine Makros

mesonic © 07/2020

Seite 5

Welche Aktionen können aufgezeichnet werden?
Grundsätzlich werden alle Tastatureingaben aufgezeichnet. Dazu wird auch jeder Mausklick (z.B. auf den
Despoolen-Button oder auf den OK-Button etc.) aufgezeichnet.

Innerhalb des Makros können aber auch Eingaben durchgeführt werden. Dazu muss während der Aufnahme
im gewünschten Feld die rechte Maustaste geklickt und dann die Option

➢  Pause Macro for Input

gewählt werden. Diese Option ist aber nur in Eingabefeldern möglich und kann innerhalb einer Tabelle (z.B.
"Buchen Dialog Stapel" oder "Belegerfassung") nicht verwendet werden.

➢  Makro wiedergeben
Wird dieser Button angeklickt, wird das eingegebene Makro "abgespielt", wobei alle Aktionen wie bei der
Aufnahme durchgeführt werden.

Wurde im Makro die Option "Pause Macro for Input" verwendet, dann bleibt das Makro im entsprechendem
Eingabefeld stehen und es kann die erforderliche Eingabe durchgeführt werden. In diesem Fall wird auch der
Pause-Button aktiviert. Das Makro wird durch Drücken der F11-Taste (diese Information wird auch beim
entsprechendem Eingabefeld angezeigt) bzw. durch Anklicken des Pause-Buttons fortgesetzt.

Wurde eine Makroaufnahme gestartet, steht der Stop-Button zur Verfügung. Damit kann die Aufnahme des
Makros gestoppt werden. Beim Abspielen von Makros hat der Button nur dann eine Funktion, wenn eine
Eingabe gefordert wird.

Wurde bei einer Aufnahme der Stop-Button angeklickt, wird anschließend das Fenster dargestellt, in dem
das Makro in VB-Script angezeigt wird.

WinLine Makros

mesonic © 07/2020

Seite 6

In diesem Fenster können auch noch notwendige Änderungen vorgenommen werden, wobei darauf zu ach-
ten ist, dass diese Änderungen so vorzunehmen sind, dass der Ablauf des Programms nicht beeinträchtigt
wird.

Im Folgendem finden Sie eine Aufstellung aller Eigenschaften und Methoden, die die WinLine - Makros zulas-
sen. Zusätzlich können alle VB-Script Befehle verwendet.

Um eine Liste aller Funktionen der WinLine im Formelfenster angezeigt zu bekommen, muss nur ein . einge-
tragen werden.

Dadurch wird das Feld
"CWLMacro" in das Fenster übernommen. Wenn danach nochmals ein . eingegeben wird, wird eine Listbox
mit allen Funktionen angezeigt - es kann die gewünschte Funktion ausgewählt werden.

 angezeigt. Wird dieses angewählt, dann wird das Wort

Wenn man sich durch Drücken der Pfeil-nach-Unten-Taste durch die einzelnen Einträge der Listbox bewegt,
wird die Verwendung der aktuellen Funktion in einem eigenen Fenster

WinLine Makros

mesonic © 07/2020

Seite 7

"
mit Parametern aufrufen muss oder nicht.

" angezeigt. Dadurch lässt sich erkennen, ob man die Funktion

Wenn vor dem Eintrag in der Listbox das Symbol
Wenn vor dem Eintrag in der Listbox das Symbol

 angezeigt wird, handelt es sich um eine Funktion.
angezeigt wird, handelt es sich um eine Variable.

2.1.1.  Eigenschaften

BSTR Mname
(readonly)
Enthält den Namen des Makros.

short MLastMessageResult;
(readonly)
Wird bei der Aufzeichnung verwendet und enthält jeweils das Resultat der während der Aufzeichnung ausge-
lösten Abfragen (z.B.: Wollen Sie speichern ? (JA/NEIN)). Beim Abspielen des Makros wird dieser Wert ver-
wendet, damit das Abspielen nicht durch eine Abfrage unterbrochen wird. Die Variable enthält 0 wenn keine
Bildschirmmeldung aufgezeichnet wurde.

VARIANT_BOOL MPrintToArchive;
(read/write)
Entspricht dem Archiv - Button in der Toolbar Leiste. Wird die Eigenschaft auf "TRUE" gesetzt, wird auch der
entsprechende Button gedrückt.

VARIANT_BOOL MPrintToSpool;
(read/write)
Entspricht dem Spooler/Drucker - Button in der Toolbar Leiste. Wird die Eigenschaft auf "TRUE" gesetzt,
wird auch der entsprechende Button gedrückt.

VARIANT_BOOL MBalloonHelp;
(read/write)
Entspricht dem Aktive Hilfe - Button in der Toolbar Leiste. Wird die Eigenschaft auf "TRUE" gesetzt, wird
auch der entsprechende Button gedrückt.

VARIANT_BOOL MSilentMode;
(read/write)
Wird diese Eigenschaft auf "TRUE" gesetzt, dann erfolgt beim Abspielen des Makros keine sichtbare Rück-
meldung, erst wenn der Modus zurückgesetzt wird, oder das Makro beendet wird, wird der Bildschirm wieder
neu aufgebaut.

VARIANT MParameters;
(read only)
Diese Eigenschaft enthält ein Feld mit den an das Makro übergebenen Parametern. Im Normalfall stehen
hier die Systemvariablen 1 bis 19 zur Verfügung, die die Werte des aktuell ausgewählten Mandanten wieder-
spiegeln.
Makros, die aus Formularen heraus (über Hyperlinks) gestartet werden, haben den Inhalt des Hyperlinkfel-
des als ersten Applikationsparameter im Feld an Position 20.
Beim Starten von externen Applikationen können ebenfalls Makros hinterlegt werden, dort können zusätzli-
che Parameter an das Makro übergeben werden, die dann ebenfalls ab Position 20 im Feld stehen.

WinLine Makros

mesonic © 07/2020

Seite 8

Damit die Feldwerte im Makro verwendet werden können, müssen sie zuerst an eine Variable zugewiesen
werden.

Beispiel
Im folgenden Beispiel werden im Makro die Systemvariablen in einer Bildschirmmeldung ausgegeben:

Sub RunMacro

'
params = MParameters  ' unbedingt notwendig um auf die Parameter

Your macro code

' als Feld zugreifen zu können

CRLF = chr(13)&chr(10)
msg = "Parameter:" & CRLF

' Der Feldwert 0 ist immer leer deshalb beginnt
' die Schleife bei 1
For i = 1 To ubound(params)

msg = msg & i & ".: " & params(i) & CRLF

Next

' gefundene Parameter anzeigen
msgbox msg

End Sub

Im Programm WinLine START, im Menüpunkt


können auch Makros eingetragen werden. Zusätzlich zum Makronamen können dort zusätzliche Parameter
angegeben werden:

Applikationen
Externe Programme...

MACRO:MACRONAME {Art:Wert}{Art:Wert}…. usw.

WinLine Makros

mesonic © 07/2020

Seite 9

wobei Art


sein kann.

- CompanyValue (Wert aus dem Mandantenstamm = Spaltennummer) oder
- Constant (Wert ist eine beliebige Zeichenkette)

Beispiel:
MACRO:TEST {CompanyValue:1}{CompanyValue:2}{CompanyValue:3}
MACRO:TEST {Constant:Ein Test}{Constant:100,20}

short MCurrentPeriod;
(readonly)
In dieser Eigenschaft steht immer die aktuelle Periode (das aktuelle Monat).

2.1.2.  Methoden

void MWait(long lMilliseconds);
Das Abspielen des Makros wird für die angegebene Zeitspanne angehalten.

➢  Parameter:
lMilliseconds

Anzahl der Millisekunden, die das Makro warten soll

➢  Rückgabe:
keine

VARIANT_BOOL MSetFieldFocus(short nWinId, short nFieldId);
Setzt den Cursor auf das angegebene Feld. Ist mit einem Mausklick des Anwenders zu vergleichen.

➢  Parameter:
nWinId
nFieldId

Nummer des Fensters, in dem sich das gewünschte Feld befindet
Nummer des Feldes, das den Focus erhalten soll

➢  Rückgabe:
True/False, abhängig davon ob der Focus versetzt werden konnte

void MSetFieldValue(short nWinId, short nFieldId, BSTR strValue);
Setzt den Wert des angegebenen Feldes. Hat denselben Effekt als ob der Benutzer in dem Feld den Text
eingibt und danach die ENTER Taste drückt.

➢  Parameter:
nWinId
nFieldId

Nummer des Fensters in dem das gewünschte Feld sich befindet
Nummer des Feldes, das den Wert erhalten soll

➢  Rückgabe:
keine

BSTR MGetFieldValue(short nWinId, short nFieldId);
Gibt den Wert des angegebenen Feldes als Text zurück.

➢  Parameter:
nWinId

Nummer des Fensters in dem das gewünschte Feld sich befindet

WinLine Makros

mesonic © 07/2020

Seite 10

nFieldId

Nummer des Feldes, von dem der Wert geholt werden soll

➢  Rückgabe:
Der Feldinhalt als Text

void MSetGridValue(short nWinId, short nFieldId, short nRow, short nColumn, BSTR strValue);
Setzt den Cursor in der Tabelle auf die angegebene Zeile/Spalte und fügt dort den Text ein.

➢  Parameter:
nWinId
nFieldId
nRow
nColumn
strValue

Nummer des Fensters in dem sich die Tabelle befindet
Nummer der Tabelle
die aktuelle Zeile in der Tabelle
die aktuelle Spalte in der Tabelle
der Text, der in der Zelle eingefügt werden soll

➢  Rückgabe:
keine

long MPushButton(short nWinId, short nButtonId, long lParam);
Der angegebene Button wird gedrückt. Der Parameter lParam kann auf 0 belassen werden. Bei der Auf-
nahme des Makros könnte der Wert allerdings auf ungleich 0 stehen (Beim Verlassen der Applikation erhält
der Ende - Button hier einen speziellen Wert, damit das Fenster erkennen kann, dass es in Folge des Pro-
grammendes geschlossen wird).

➢  Parameter:
nWinId
nButtonId
lParam

Nummer des Fensters in dem der Button sich befindet
Nummer des Buttons, der gedrückt werden soll
im Standardfall 0

➢  Rückgabe:
Nicht definiert

long MGridMatchCode(short nWinId, short nFieldId, short nRow, short nColumn, BSTR
strSearchText, BOOL bExtended);

Entspricht dem Klick auf die Lupe in einer Tabelle (bzw. der <F9> Taste).
➢  Parameter:
nWinId
nFieldId
nRow
nColumn
strSearchText  der Text den das Editfeld enthielt als <F9> gedrückt wurde
bExtended

Nummer des Fensters in dem sich die Tabelle befindet
Nummer der Tabelle
die aktuelle Zeile in der Tabelle
die aktuelle Spalte in der Tabelle

ist TRUE falls auf die Lupe geklickt wurde, bzw. <SHIFT><F9> gedrückt wurde

➢  Rückgabe:
Ist abhängig von der Applikation, normalerweise 0

long MTreeExpand(short nWinId, short nFieldId, long lParam, long lTreeData);
Dieses Kommando wird aufgezeichnet, wenn in einer Baumstruktur auf das Symbol
der dort enthaltene Zweig aufgeklappt wird. Das Kommando sollte nicht manuell eingefügt werden, weil die
Daten in lParam und lTreeData nur bei der Aufzeichnung richtig gesetzt werden können.

 geklickt wurde, sodass

➢  Parameter:
nWinId

Nummer des Fensters in dem sich das Baumelement befindet

WinLine Makros

mesonic © 07/2020

Seite 11

nFieldId
lParam
lTreeData

Nummer des Baumelements
(nur für interne Zwecke)
(nur für interne Zwecke)

➢  Rückgabe:
1

falls kein Fehler auftrat, sonst 0

long MTreeCollapse(short nWinId, short nFieldId, long lParam, long lTreeData);
Dieses Kommando wird aufgezeichnet, wenn ein aufgeklappter Baum in einer Baumstruktur vom Benutzer
geschlossen wird (anklicken des
Daten in lParam und lTreeData nur bei der Aufzeichnung richtig gesetzt werden können.

 Symbols). Das Kommando sollte nicht manuell eingefügt werden, weil die

➢  Parameter:
nWinId
nFieldId
lParam
lTreeData

Nummer des Fensters in dem sich das Baumelement befindet
Nummer des Baumelements
(nur für interne Zwecke)
(nur für interne Zwecke)

➢  Rückgabe:
1

falls kein Fehler auftrat, sonst 0

long MTreeSelChange(short nWinId, short nFieldId, long lParam, long lTreeData);
Dieses Kommando wird aufgezeichnet, wenn der Benutzer in einer Baumstruktur einen Eintrag auswählt.
Das Kommando sollte nicht manuell eingefügt werden, weil die Daten in lParam und lTreeData nur bei
der Aufzeichnung richtig gesetzt werden können.

➢  Parameter:
nWinId
nFieldId
lParam
lTreeData

Nummer des Fensters in dem sich das Baumelement befindet
Nummer des Baumelements
(nur für interne Zwecke)
(nur für interne Zwecke)

➢  Rückgabe:
Ist abhängig von der Applikation, normalerweise 0

long MTreeDelete(short nWinId, short nFieldId, long lParam, long lTreeData);
Dieses Kommando wird aufgezeichnet, wenn der Benutzer in einer Baumstruktur einen Eintrag löscht. Das
Kommando sollte nicht manuell eingefügt werden, weil die Daten in lParam und lTreeData nur bei der
Aufzeichnung richtig gesetzt werden können.

➢  Parameter:
nWinId
nFieldId
lParam
lTreeData

Nummer des Fensters in dem sich das Baumelement befindet
Nummer des Baumelements
(nur für interne Zwecke)
(nur für interne Zwecke)

➢  Rückgabe:
1

falls kein Fehler auftrat, sonst 0

long MTreeDblClick(short nWinId, short nFieldId, long lParam, BSTR  strItemText);
Dieses Kommando wird aufgezeichnet, wenn der Benutzer in einer Baumstruktur einen Eintrag doppelt an-
klickt. Das Kommando sollte nicht manuell eingefügt werden, weil die Daten in lParam nur bei der Auf-

WinLine Makros

mesonic © 07/2020

Seite 12

zeichnung richtig gesetzt werden können. Der Parameter strItemText enthält den Text des selektierten
Items.

➢  Parameter:
nWinId
nFieldId
lParam
strItemText

Nummer des Fensters in dem sich das Baumelement befindet
Nummer des Baumelements
(nur für interne Zwecke)
der Text des gewählten Elements

➢  Rückgabe:
Ist abhängig von der Applikation, normalerweise 0

long MMatchCode(short nWinId, short nFieldId, long lParam, BSTR strSearchText, VARI-
ANT_BOOL bExtended);

Entspricht dem Anklicken der Lupe bei einem Eingabefeld bzw. dem Drücken der F9-Taste in einem Eingabe-
feld.

➢  Parameter:
nWinId
nFieldId
lParam
strSearchText  der Text den das Eingabefeld enthielt als F9 gedrückt wurde
bExtended

Nummer des Fensters in dem sich das Eingabefeld befindet
Nummer des Eingabefeldes
immer 0

ist "TRUE" falls auf die Lupe geklickt wurde, bzw. <SHIFT><F9> gedrückt wurde

➢  Rückgabe:
Ist abhängig von der Applikation, normalerweise 0

long MGridLeftClick(short nWinId, short nFieldId, short nRow, short nColumn);
Entspricht dem Klick mit der linken Maustaste auf eine Zelle in einer Tabelle (die Zelle darf kein Eingabefeld,
keine Auswahllistbox oder keine Checkbox enthalten). Das Kommando wird aufgezeichnet, wenn der Benut-
zer die Aktion durchführt. Dies führt beim Abspielen aber nicht zu einem Klick auf die Tabelle, sondern die
Applikation reagiert als ob der Klick durchgeführt worden wäre.

➢  Parameter:
nWinId
nFieldId
nRow
nColumn

Nummer des Fensters in dem sich die Tabelle befindet
Nummer der Tabelle
die aktuelle Zeile in der Tabelle
die aktuelle Spalte in der Tabelle

➢  Rückgabe:
Ist abhängig von der Applikation, normalerweise 0

long MGridRightClick(short nWinId, short nFieldId, short nRow, short nColumn);

➢
Entspricht dem Klick mit der rechten Maustaste auf eine Zelle in einer Tabelle (die Zelle darf kein Eingabe-
feld, keine Auswahllistbox oder keine Checkbox enthalten). Das Kommando wird aufgezeichnet, wenn der
Benutzer die Aktion durchführt. Dies führt beim Abspielen aber nicht zu einem Klick auf die Tabelle, sondern
die Applikation reagiert als ob der Klick durchgeführt worden wäre.

➢  Parameter:
nWinId
nFieldId
nRow
nColumn

Nummer des Fensters in dem sich die Tabelle befindet
Nummer der Tabelle
die aktuelle Zeile in der Tabelle
die aktuelle Spalte in der Tabelle

WinLine Makros

mesonic © 07/2020

Seite 13

➢  Rückgabe:
Ist abhängig von der Applikation, normalerweise 0

long MGridDblClick(short nWinId, short nFieldId, short nRow, short nColumn);
Entspricht dem Doppelklick mit der linken Maustaste auf eine Zelle in einer Tabelle (die Zelle darf kein Ein-
gabefeld, keine Auswahllistbox oder keine Checkbox enthalten). Das Kommando wird aufgezeichnet, wenn
der Benutzer die Aktion durchführt. Dies führt beim Abspielen aber nicht zu einem Klick auf die Tabelle, son-
dern die Applikation reagiert als ob der Klick durchgeführt worden wäre.

➢  Parameter:
nWinId
nFieldId
nRow
nColumn

Nummer des Fensters in dem sich die Tabelle befindet
Nummer der Tabelle
die aktuelle Zeile in der Tabelle
die aktuelle Spalte in der Tabelle

➢  Rückgabe:
Ist abhängig von der Applikation, normalerweise 0

long MGridColLeftClick(short nWinId, short nFieldId, short nColumn);
Entspricht dem Klick mit der linken Maustaste auf eine Zelle im Kopf einer Tabelle. Das Kommando wird
aufgezeichnet, wenn der Benutzer die Aktion durchführt. Dies führt beim Abspielen aber nicht zu einem Klick
auf die Tabelle, sondern die Applikation reagiert als ob der Klick durchgeführt worden wäre.

➢  Parameter:
nWinId
nFieldId
nRow
nColumn

Nummer des Fensters in dem sich die Tabelle befindet
Nummer der Tabelle
die aktuelle Zeile in der Tabelle
die aktuelle Spalte in der Tabelle

➢  Rückgabe:
Ist abhängig von der Applikation, normalerweise 0

long MGridInfo(short nWinId, short nFieldId, short nRow, short nColumn);
Dieses Kommando wird eingefügt, wenn in einer Tabelle in einem Eingabefeld oder einer Auswahllistbox die
Taste <F8> gedrückt wird

➢  Parameter:
nWinId
nFieldId
nRow
nColumn

Nummer des Fensters in dem sich die Tabelle befindet
Nummer der Tabelle
die aktuelle Zeile in der Tabelle
die aktuelle Spalte in der Tabelle

➢  Rückgabe:
Ist abhängig von der Applikation, normalerweise 0

long MGridCheckbox(short nWinId, short nFieldId, short nRow, short nColumn, VARIANT_BOOL
bChecked);

Entspricht dem Klick mit der linken Maustaste auf eine Zelle einer Tabelle die eine Checkbox enthält. Beim
Abspielen wird der Focus auf die entsprechende Zelle gesetzt und die Checkbox entsprechend dem Wert in
bChecked gesetzt.

➢  Parameter:
nWinId

Nummer des Fensters in dem sich die Tabelle befindet

WinLine Makros

mesonic © 07/2020

Seite 14

nFieldId
nRow
nColumn
bChecked

Nummer der Tabelle
die aktuelle Zeile in der Tabelle
die aktuelle Spalte in der Tabelle
enthält TRUE falls die Checkbox gecheckt werden soll, andernfalls FALSE

➢  Rückgabe:
Ist abhängig von der Applikation, normalerweise 0

long MGridLeave(short nWinId, short nFieldId, short nToFgId, short nFromRow);

Dieses Kommando wird aufgezeichnet, wenn der Benutzer eine Tabelle verlässt (auf ein anderes Feld im
Fenster klickt, oder mit TAB aus der Tabelle springt)

➢  Parameter:
nWinId
nFieldId
nToFgId
nFromRow

Nummer des Fensters in dem sich die Tabelle befindet
Nummer der Tabelle
die Nummer des Elements, das nach Verlassen der Tabelle aktiv wurde
die aktuelle Zeile in der Tabelle

➢  Rückgabe:
Ist abhängig von der Applikation, normalerweise 0

long MGridComboSelchange(short nWinId, short nFieldId, short nRow, short nColumn, BSTR
strFieldText);

Dieses Kommando wird aufgezeichnet, wenn der Anwender die Selektion in einer Combobox in einer Tabelle
ändert. Beim Abspielen wird der Wert in strFieldText in die Combobox eingefügt.

➢  Parameter:
nWinId
nFieldId
nRow
nColumn
strFieldText

Nummer des Fensters in dem sich die Tabelle befindet
Nummer der Tabelle
die aktuelle Zeile in der Tabelle
die aktuelle Spalte in der Tabelle
der selektierte Text aus der Combobox

➢  Rückgabe:
Ist abhängig von der Applikation, normalerweise 0

long MDrillDown(short nWinId, short nFieldId, long lParam);

Dieses Kommando wird aufgezeichnet, wenn der Anwender in einem beliebigen Element in einem Fenster
die Taste <F8> drückt, der Parameter lParam ist immer 0.

➢  Parameter:
nWinId
nFieldId
lParam

Nummer des Fensters in dem das aktive Feld ist
Nummer des Feldes, indem <F8> gedrückt wurde
immer 0

➢  Rückgabe:
Ist abhängig von der Applikation, normalerweise 0

long MListboxSelChange(short nWinId, short nFieldId, long nItemIndex);
Dieses Kommando wird aufgezeichnet, wenn der Anwender in einer Listbox die Selektion ändert. In nIt-
emIndex wird der Index des selektierten Eintrags übergeben.

WinLine Makros

mesonic © 07/2020

Seite 15

➢  Parameter:
nWinId
nFieldId
nItemIndex

Nummer des Fensters in dem sich die Listbox befindet
Nummer der Listbox
Index des gewählten Listbox Elements

➢  Rückgabe:
Ist abhängig von der Applikation, normalerweise 0

long MListbox(short nWinId, short nFieldId, long lItemIndex);

Dieses Kommando wird aufgezeichnet, wenn der Anwender in einer Listbox ein Item mit ENTER oder Dop-
pelklick auswählt. In nItemIndex wird der Index des selektierten Eintrags übergeben.

➢  Parameter:
nWinId
nFieldId
nItemIndex

Nummer des Fensters in dem sich die Listbox befindet
Nummer der Listbox
Index des gewählten Listbox Elements

➢  Rückgabe:
Ist abhängig von der Applikation, normalerweise 0

long MCheckbox(short nWinId, short nFieldId, BOOL bChecked);
Dieses Kommando wird aufgezeichnet, wenn der Anwender auf eine Checkbox klickt. In bChecked wird der
Status der Checkbox übergeben.

➢  Parameter:
nWinId
nFieldId
nItemIndex

Nummer des Fensters in dem sich die Checkbox befindet
Nummer der Checkbox
Index des gewählten Checkbox Elements

➢  Rückgabe:
Ist abhängig von der Applikation, normalerweise 0

long MRadiobutton(short nWinId, short nFieldId, long lIndex);
Dieses Kommando wird aufgezeichnet, wenn der Anwender auf einen Radiobutton klickt. In lIndex wird
der Index des gewählten Button übergeben (Radiobuttons sind in Gruppen organisiert wobei jeder Button in
der Gruppe einen Index beginnend bei 0 hat)

➢  Parameter:
nWinId
nFieldId
nItemIndex

Nummer des Fensters in dem sich der Radiobutton befindet
Nummer des Radiobutton
Index des gewählten Radiobutton Elements

➢  Rückgabe:
Ist abhängig von der Applikation, normalerweise 0

long MComboSelchange(short nWinId, short nFieldId, BSTR  strFieldText);
Dieses Kommando wird aufgezeichnet, wenn der Anwender die Selektion in einer Combobox in einem Fens-
ter ändert. Beim Abspielen wird der Wert in strFieldText in die Combobox eingefügt.

➢  Parameter:
nWinId
nFieldId
strFieldText

Nummer des Fensters in dem sich die Combobox befindet
Nummer der Combobox
der Text des selektierten Combobox Eintrags

WinLine Makros

mesonic © 07/2020

Seite 16

➢  Rückgabe:
Ist abhängig von der Applikation, normalerweise 0

long MChangeGridCell (short nWinId, short nFieldId, long lParam);
Dieses Kommando wird aufgezeichnet, wenn der Anwender sich in der Tabelle bewegt (entweder über die
Tastatur oder mit der Maus).
lParam beschreibt welche Methode der Anwender verwendet hat. Wurde die Tastatur verwendet, dann
enthält dieser Parameter die Nummer der verwendeten Taste (13 = ENTER, 39 = Cursor Rechts, 37 = Cur-
sor links, 40 = Cursor hinab, 38 = Cursor hinauf, 35 = Cursor Ende, 36 = Cursor Pos1,  33 = Cursor Bild
hinauf, 34 = Cursor Bild hinunter). Wurde mit der Maus geklickt, dann enthält lParam die Zeile/Spalte der
Zelle, wobei die Zeile in den unteren 16 Bit kodiert ist, die Spalte in den oberen 16 Bit.

➢  Parameter:
nWinId
nFieldId
lParam

nColumn

Nummer des Fensters in dem sich die Tabelle befindet
Nummer der Tabelle
abhängig von der Art, wie die Zelle aktiviert wurde, entweder ein Tastencode oder ein
zusammengesetzter Wert aus Zeile und Spalte
die aktuelle Spalte in der Tabelle

➢  Rückgabe:
1

falls kein Fehler auftrat, sonst 0

long MWindow (short nWinId, VARIANT_BOOL bQuiet, VARIANT Param);
Dieses Kommando wird aufgezeichnet, wenn der Anwender ein Fenster öffnet oder zwischen verschiedenen
Fenstern hin und her wechselt. Der Parameter bQuiet wird nur dann auf "TRUE" gesetzt, wenn das Fenster
neu geöffnet wird, dabei aber nicht angezeigt werden soll. Der Parameter ist normalerweise immer FALSE.
Der Parameter Param wird beim Aufzeichnen eines Makros nie erzeugt. Er kann verwendet werden, wenn
der Aufruf selbst programmiert wird und das aufgerufene Fenster den zusätzlichen Parameter optional für
bestimmte Funktionen verwendet.

➢  Parameter:
nWinId
bQuiet
Param

Nummer des Fensters das geöffnet/aktiviert werden soll
TRUE falls ein neu geöffnetes Fenster nicht sichtbar sein soll, normalerweise FALSE
optionaler Parameter für den Fensteraufruf

➢  Rückgabe:
1 falls das Fenster geöffnet/aktiviert wurde, sonst 0

MApplication (short ApplicationNr);
Dieses Kommando wird aufgezeichnet, wenn der Anwender zu einer anderen Applikation innerhalb der Win-
Line wechselt. Der Parameter ApplicationNr kann folgende Werte annehmen:

Programm
START
FIBU
FAKT
LOHN A
LIST
KORE
ANBU
ADMIN
EXIM
INFO

Nummer

0
1
2
3
4
5
6
8
9
11

WinLine Makros

mesonic © 07/2020

LOHN D
PROD

Seite 17

18
20

➢  Parameter:
ApplicationNr  Nummer des Applikation

➢  Rückgabe:
1 falls zu der Applikation gewechselt werden konnte

MExternalApplication (short nId);
Dieses Kommando wird aufgezeichnet, wenn der Anwender über den Menüpunkt ‘Applikationen’ eine selbst
definierte Applikation startet. Der Parameter nId ist der Index der gestarteten Applikation, wobei die erste
eingetragene Applikation den Index 0 hat.

➢  Parameter:
nId

Index der benutzerdefinierten Applikation

➢  Rückgabe:
1 falls die Applikation gestartet werden konnte

void MToClipboard ();
Dieses Kommando wird aufgezeichnet, wenn der Anwender in einem Eingabefeld den markierten Inhalt in
die Zwischenablage kopiert. Beim Abspielen des Makros wird mit diesem Kommando die gerade aktive Selek-
tion im aktuellen Eingabefeld in die Zwischenablage kopiert.

➢  Parameter:
keine

➢  Rückgabe:
keine

void MFromClipboard ();
Dieses Kommando wird aufgezeichnet, wenn der Anwender in ein Eingabefeld die Zwischenablage einfügt.
Beim Abspielen des Makros wird mit diesem Kommando der zu dem Zeitpunkt des Abspielens vorhandene
Zwischenablageinhalt in das gerade aktive Editfeld eingefügt.

➢  Parameter:
keine

➢  Rückgabe:
keine

void MStop ();
Dieses Kommando wird nicht aufgezeichnet. Es kann vom Anwender in das Makro eingefügt werden, wenn
die Makroabarbeitung zu einem bestimmten Zeitpunkt beendet werden soll.

➢  Parameter:
keine

➢  Rückgabe:
keine

WinLine Makros

mesonic © 07/2020

Seite 18

void MPauseForInput (BSTR strNextRoutineAfterPause, short nWinId, short nFieldId);
Dieses Kommando wird aufgezeichnet, wenn der Benutzer in einem Editfeld über die rechte Maustaste den
Menüpunkt ‘Pause Macro for Input’ anwählt. Dies führt beim Ausführen des Makros dazu, dass die Makroab-
arbeitung genau bei diesem Schritt anhält, um dem Benutzer eine Eingabe zu erlauben. Danach kann das
Makro mit der Funktionstaste <F11> weiter abgearbeitet werden. Der Befehl sollte auf keinen Fall manuell
eingefügt werden.

➢  Parameter:
strNextRoutineAfterPause

nWinId
nFieldId

➢  Rückgabe:
keine

Der Name der Subroutine, die nach der Benutzerunterbrechung zur
Fortführung des Makros gestartet werden soll
Die Nummer des Fensters in dem die Unterbrechung erfolgt
Die Nummer des Feldes in dem die Unterbrechung erfolgte

void MPauseForFilter (BSTR strNextRoutineAfterPause);
Dieses Kommando wird aufgezeichnet, wenn der Benutzer im Filtereingabefenster über die rechte Maustaste
den Menüpunkt "Makro für die Filtereingabe pausieren" anwählt. Dies führt beim Ausführen des Makros da-
zu, dass die Makroabarbeitung während der Eingabe in der Filtereingabe pausiert, um dem Benutzer spezifi-
sche Eingaben zu erlauben. Sobald das Fenster mit F5 oder ESC geschlossen wird, wird das Makro weiter
ausgeführt (bei OK wird die Auswertung entsprechend den getätigten Filterbedingungen ausgeführt).

➢  Parameter:
strNextRoutineAfterPause

➢  Rückgabe:
keine

Der Name der Subroutine, die nach der Benutzerunterbrechung zur
Fortführung des Makros gestartet werden soll

void MRunMacro (BSTR MacroName);
Dieses Kommando wird nicht aufgezeichnet. Es kann vom Anwender in das Makro eingefügt werden, um ein
weiteres Makro zu starten. Nachdem dieses andere Makro die Abarbeitung beendet hat, läuft das aktuelle
Makro nach diesem Kommando weiter.

➢  Parameter:
MacroName

➢  Rückgabe:
keine

Name des Makros das gestartet werden soll

void MRunForm (BSTR MacroName, short bMode);
Dieses Kommando wird nicht aufgezeichnet. Es kann vom Anwender in das Makro eingefügt werden, um ein
System Skript zu starten. Mit dem Parameter bMode kann der Modus festgelegt werden, wie das System
Skript ablaufen soll (0.. als normales Fenster, 1.. als modales Fenster, 2... als applikationsübergreifendes
Fenster, das immer im Vordergrund ist)

➢  Parameter:
MacroName
bMode
0…
1…
2…

Name des System Skripts das gestartet werden soll
Modus mit dem das System Skript ablaufen soll
normale (wird beim Umschalten auf andere Appl. Versteckt)
modal (erst nach Schließen des Skripts kann in der Appl. Weitergearbeitet werden)
applikationsübergreifend (bleibt auch beim Umschalten auf andere Appl. im Vordergrund)

WinLine Makros

mesonic © 07/2020

Seite 19

➢  Rückgabe:
keine

long MChangeFilter(short nWinId, short nFieldId, BSTR FilterName);
Dieses Kommando wird aufgezeichnet, wenn der Benutzer in einem Fenster mit Filter-Funktion einen Filter
aus der Auswahllistbox auswählt. Der Parameter FilterName enthält den Namen des gewählten Filters.
➢  Parameter:
nWinId
nFieldId
FilterName
➢  Rückgabe:
Immer 0

Nummer des Fensters in dem sich der Filter befindet
immer 0
Name des ausgewählten Filters

void MLastDialogResult (BOOL bResult, VARIANT value, BSTR Remark);
Dieses Kommando wird aufgezeichnet, wenn im Programm ein Lohn- oder Faktformelfenster während des
Makroaufzeichnens geöffnet wird. Das Kommando registriert das Ergebnis des Dialogs um beim Abspielen
des Makros das Ergebnis der Aufzeichnung zur Hand zu haben und das Formelfenster nicht mehr geöffnet
werden muss.

➢  Parameter:
bResult
value
Remark

True wenn das Formelfenster mit OK beendet wurde, andernfalls False
der Rückgabewert des Formelfensters
wird zur Zeit nicht verwendet

➢  Rückgabe:
keine

void MLastReplacedForm (short Number);
Dieses Kommando wird aufgezeichnet, wenn im Programm der Formularersetzen Dialog eingeblendet wird,
in dem der Benutzer ein vom Standardformular abweichendes Formular auswählen kann.

➢  Parameter:
Number die Nummer des ausgewählten Ersatzformulars

➢  Rückgabe:
keine

BOOL MChangePreviewPage (short WinId, short PreviewId, short PageNumber);
Dieses Kommando wird aufgezeichnet, wenn im Programm in einer Druckvorschau die angezeigte Seite ge-
ändert wird (d.h. in der Druckvorschau geblättert wird).

➢  Parameter:
WinId
PreviewId
PageNumber

die Nummer des Druckvorschaufensters
die interne Nummer des Druckvorschauelements
die Seitennummer zu der geblättert wurde

➢  Rückgabe:
True/False, abhängig davon ob beim Abspielen des Makros zu der Seite gewechselt werden konnte

WinLine Makros

mesonic © 07/2020

Seite 20

BOOL MGridSort (short WinId, short FieldId, short SortColumn1, short SortColumn2, short
SortDirection);

Dieses Kommando wird aufgezeichnet, wenn im Programm in einer Tabelle eine Spalte sortiert wird.

➢  Parameter:
WinId
FieldId
SortColumn1
SortColumn2
wird)
SortDirection  1... aufwärts, 2... abwärts

die Nummer des Fensters
die interne Nummer des Tabellenelements
die 1. logische Spaltennummer die sortiert wird
die 2. logische Spaltennummer die sortiert wird (ist 0, wenn nur nach einer Spalte sortiert

➢  Rückgabe:
True/False, abhängig davon ob das Sortieren beim Abspielen des Makros durchgeführt werden konnte

long MRetChar (short nWinId, short nFieldId, short Key);
Dieses Kommando wird aufgezeichnet, wenn der Anwender in einem Editfeld eine Taste drückt, die von der
Applikation speziell behandelt wird.

➢  Parameter:
nWinId Nummer des Fensters in dem sich das Editfeld befindet
nFieldId
Key

Nummer des Editfeldes
die gedrückte Taste

➢  Rückgabe:
Ist abhängig von der Applikation, normalerweise 0

long MMessageF3 (short nWinId, short nFieldId, BOOL bShift);
Dieses Kommando wird aufgezeichnet, wenn der Anwender in einem Editfeld die Taste F3 drückt, die ab-
hängig vom Typ des Editfeldes unterschiedliche Aktionen auslöst.

➢  Parameter:
nWinId
nFieldId
bShift

Nummer des Fensters in dem sich das Editfeld befindet
Nummer des Editfeldes
True falls <UMSCHALT> <F3> gedrückt wurde

➢  Rückgabe:
Ist abhängig von der Applikation, normalerweise 0

MQuitApplication ()
Dieses Kommando beendet die Applikation. Es wird die Auswahl des Menüpunkts ‚Datei|Ende’ simuliert. Da-
nach darf und kann kein Macrobefehl mehr kommen, weil die Applikation geschlossen wird und damit die
Makroabarbeitung ebenfalls endet.

➢  Parameter:
keine

➢  Rückgabe:
keine

WinLine Makros

mesonic © 07/2020

Seite 21

BOOL MStartExecutable (BSTR Application, BSTR Parameters)
Dieses Kommando startet ein beliebiges Programm.

➢  Parameter:
Application
Parameters

Der Name des zu startenden Programmes inclusive Pfad wenn notwendig
Programmparameter, falls welche notwendig sind.

➢  Rückgabe:
True/False

Meldet den Erfolgreichen Start der Applikation

BSTR MGetPlainRTFFieldValue (short nWinId, short nFieldId)
Dieses Kommando holt den Text aus einem RTF Feld und konvertiert diesen in reinen ANSI Text (ohne For-
matierungen).

➢  Parameter:
nWinId
nFieldId

Nummer des Fensters in dem sich das Editfeld befindet
Nummer des Editfeldes

➢  Rückgabe:
Der konvertierte RTF Text.

MClosePreview (short nWinId)
Schließt ein Druckvorschaufenster mit der Fenster Nummer nWinId.

➢  Parameter:
nWinId

Nummer des Fensters in dem sich die Druckvorschau befindet

➢  Rückgabe:
Keine

MActivateWindow (short nWinId)
Aktiviert das Fenster mit der Nummer nWinId. Ist das angegebene Fenster bereits aktiv wird nichts gemacht,
andernfalls wird das neue Fenster zum aktiven Fenster.

➢  Parameter:
nWinId

Nummer des Fensters das aktiviert werden soll

➢  Rückgabe:
keine

long MCompanyYearChange (short nWinId, short InternalYearValue);
Bei Fenstern, die in der Werkzeugleiste eine Liste der Wirtschaftsjahre aufweisen (z.B. Kontoblatt), kann mit
diesem Befehl das ausgewählte Wirtschaftsjahr verändert werden.

➢  Parameter:
nWinId Nummer des Fensters das aktiviert werden soll
InternalYearValue

das Wirtschaftsjahr im internen numerischen Format

➢  Rückgabe:
Keine

WinLine Makros

mesonic © 07/2020

Seite 22

long MTreeCheck(short nWinId, short nFieldId, long lParam);
Dieses Kommando wird aufgezeichnet, wenn der Benutzer eine Baumstruktur mit TAB oder der Maus ver-
lässt. Das Kommando sollte nicht manuell eingefügt werden, weil die Daten in lParam nur bei der Aufzeich-
nung richtig gesetzt werden können.

➢  Parameter:
nWinId
nFieldId
lParam

Nummer des Fensters in dem sich das Baumelement befindet
Nummer des Baumelements
(nur für interne Zwecke)

➢  Rückgabe:
Ist abhängig von der Applikation, normalerweise 1

long MTreeCheckbox(short nWinId, short nFieldId, long lParam);
Dieses Kommando wird aufgezeichnet, wenn der Benutzer in einer Baumstruktur, die Checkboxen enthält,
den Inhalt dieser verändert. Das Kommando sollte nicht manuell eingefügt werden, weil die Daten in lPa-
ram nur bei der Aufzeichnung richtig gesetzt werden können.

➢  Parameter:
nWinId
nFieldId
lParam

Nummer des Fensters in dem sich das Baumelement befindet
Nummer des Baumelements
(nur für interne Zwecke)

➢  Rückgabe:
Ist abhängig von der Applikation, normalerweise 1

void MPrintGrid (short nWinId, short nFieldId);
Mit diesem Befehl wird eine Tabelle ausgedruckt (es wird das gleiche durchgeführt wie bei der Auswahl des
Kontextmenübefehls: ‚Tabelle ausdrucken’.

➢  Parameter:
nWinId
nFieldId

Nummer des Fensters in dem sich die Tabelle befindet
Nummer der Tabelle

➢  Rückgabe:
keine

long MCompanyChange (BSTR Company, short CompanyYear);
Mit diesem Befehl wird der aktuelle Mandant gewechselt. Der Befehl wird aufgezeichnet, wenn in der
Hauptwerkzeugleiste des Programms ein anderer Mandant oder ein anderes Wirtschaftsjahr ausgewählt
wird.

➢  Parameter:
Company
CompanyYear  Das gewünschte Wirtschaftsjahr im internen numerischen Format

Die Nummer des Mandanten (z.B. ‚300M’)

➢  Rückgabe:
1

bei erfolgreichem Mandantenwechsel, andernfalls 0.

MPrintPreview (short nWinId, short nFieldId, BSTR Printer);
Dieses Kommando wird aufgezeichnet, wenn in einem Druckvorschaufenster auf den Druckschaltknopf ge-
drückt wird. Abhängig davon ob in dem darauf folgenden Dialog ein neuer Drucker ausgewählt wird, oder

WinLine Makros

mesonic © 07/2020

Seite 23

der Standarddrucker verwendet wird, wird im Parameter PrinterDescription der gewählte Drucker überge-
ben, oder der Parameter bleibt leer.

➢  Parameter:
nWinId
bFieldId
Printer

Fenster Nummer des Druckvorschaufensters
Feldnummer der Druckvorschau
falls ein Drucker ausgewählt wurde, die Druckerbeschreibung, andernfalls leer
(Standarddrucker)

➢  Rückgabe:
keine

long MMessageDynamicMenuCommand (short nWinId, short nFieldId, short CommandIndex);
Das Kommando wird aufgezeichnet, wenn der Benutzer in der Werkzeugleiste eines Fensters eine Schaltflä-
che mit integrierten Menü anwählt. Dieser Schaltflächentyp wird in der aktuellen Programmversion für die
Ausgabe einer Auswertung auf verschiedene Zielmedien verwendet (z.B: Ausgabe auf Drucker oder Bild-
schirm).

➢  Parameter:
nWinId
nFieldId
nCommandIndex

Nummer des Fensters
Nummer der Schaltfläche in der Werkzeugleiste
der ausgewählte Befehl aus dem Menü, wobei die Befehle von 0 weggezählt werden

➢  Rückgabe:
Ist abhängig von der Applikation, normalerweise 0

long MToolbarMenuCommand (short nWinId, short nFieldId, short CommandIndex);
Das Kommando wird aufgezeichnet, wenn der Benutzer in der Werkzeugleiste eines Fensters einen der Me-
nüpunkte aufruft, der von der gedrückten Schaltfläche angezeigt worden ist. Im Gegensatz zum MMessa-
geDynamicMenuCommand - Befehl beruht dieses Menü auf einer anderen Technologie und wird intern an-
ders verarbeitet. Im Makro wird an dieser Stelle immer zuerst ein MPushbutton - Befehl für diese Schaltflä-
che erzeugt (dieser Befehl füllt das Menü) und der MToolbarMenuCommand bei der Auswahl eines der Me-
nüpunkte.

➢  Parameter:
NWinId
nFieldId
nCommandIndex

Nummer des Fensters
Nummer der Schaltfläche in der Werkzeugleiste
der ausgewählte Befehl aus dem Menü, wobei die Befehle von 0 weggezählt werden

➢  Rückgabe:
Ist abhängig von der Applikation, normalerweise 0

void MSavePreview (short nWinId, short nFieldId, BSTR  strFilename, short nType);
Dieses Kommando wird nicht aufgezeichnet. Es kann vom Anwender in das Makro eingefügt werden, um
eine Druckvorschau zu exportieren. Mit dem Parameter nType wird der Typ der exportierten Datei festge-
legt, wobei alle Typen verwendet werden können, die auch beim manuellen Export über das Kontextmenü
zur Verfügung stehen. Eine bestehende Datei wird kommentarlos überschrieben.

➢  Parameter:
nWinId

nFieldId

strFilename

WinLine Makros

Nummer des Fensters in dem sich die Vorschau befindet (wenn 0 dann wird die
erste dargestellte Vorschau verwendet)
Nummer des Vorschauelements (in Standard Vorschaufenstern immer 100) (wenn 0,
wird 100 verwendet)
Name der exportierten Datei

mesonic © 07/2020

Seite 24

Typ der exportierten Datei
0 … SPL - Datei
1 … MHT - Datei
2 … HTML
4 … SPL - Datei Version 2.0 (früheres Format)
5 … Acrobat PDF
6 … RTF Format (Microsoft Word)
7 … RTF Format
8 … Tabulatorgetrennter Text
9 … Text

nType

➢  Rückgabe:
Keine

MPutIntoCampaign (short nWinId, short nFieldId, BOOL bAdd, BOOL bShowWindow, short Re-
lateType, BSTR name);

Dieses Kommando wird aufgezeichnet wenn in einer Druckvorschau der Befehl ‚Zur Merkliste hinzufügen‘
gewählt wird, und im darauffolgenden Dialog eine Merkliste ausgewählt wird.

➢  Parameter:
nWinId

nFieldId

bAdd

bShowWindow

RelateType

Nummer des Fensters in dem sich die Vorschau befindet (wenn 0 dann wird ein
geöffnetes Fenster mit einer Vorschau gesucht)
Nummer des Vorschauelements (in Standard Vorschaufenstern immer 100) (wenn 0,
wird 100 verwendet)
ob die gefunden Objekte zu der gewählten Merkliste dazugefügt werden, oder diese
ersetzen
ob das Merklistenfenster sich öffnen soll, oder ob die Merkliste ohne das Fenster zu
öffnen gespeichert werden soll.
der Typ der Daten, die aus der Vorschau in die Merkliste übernommen weren sollen
0… alle möglichen Typen
1… Artikel
2… Arbeitnehmer
3… Projekte
4… CRM Fälle
5… Vertreter
6… Kontakte

Name

Der Name der Merkliste

➢  Rückgabe:
keine

VARIANT MGetLastUsedObjects (short Type);

Dieses Kommando wird nicht aufgezeichnet. Es kann vom Anwender in das Makro eingefügt werden, um das
zuletzt verwendete globale Objekt verwenden zu können. Die globalen Objekte, die in einer Liste der letzten
zehn verwendeten Objekte verwaltet werden, sind: Konten, Artikel, Projekte und Arbeitnehmer.

➢  Parameter:
Type

Typ des globalen Objekts, dessen Liste zurückgegeben werden soll
1… Konten
41… Produkte
30… Projekte
91… Arbeitnehmer

WinLine Makros

mesonic © 07/2020

Seite 25

➢  Rückgabe:
Array mit den bis zu 10 zuletzt verwendeten Objekten

Beispiel
Im folgenden Beispiel werden im Makro die globalen Objekte aller vier Typen in einer Msgbox ausgegeben:

Sub RunMacro

Your macro code

'
Test = "Liste der zuletzt verwendeten Objekte:"
Testarraccounts = Cwlmacro.Mgetlastusedobjects (1)
Testarrproducts = Cwlmacro.Mgetlastusedobjects (41)
Testarrprojects = Cwlmacro.Mgetlastusedobjects (30)
Testarran = Cwlmacro.Mgetlastusedobjects (91)

Accountlist = "Konten"
For I = 0 To Ubound (Testarraccounts)

Accountlist = Accountlist & Chr(13) & Chr (10) & Testarraccounts(I)

Next

Productlist = "Artikel"
For I = 0 To Ubound (Testarrproducts)

Productlist = Productlist & Chr(13) & Chr (10) & Testarrproducts(I)

Next

Projectlist = "Projekte"
For I = 0 To Ubound (Testarrprojects)

Projectlist = Projectlist & Chr(13) & Chr (10) & Testarrprojects(I)

Next

Anlist = "AN"
For I = 0 To Ubound (Testarran)

Anlist = Anlist & Chr(13) & Chr (10) & Testarran(I)

Next
Msgbox Accountlist & Chr(13) & Chr (10) & Productlist & Chr(13) & Chr (10) & Projectlist
& Chr(13) & Chr (10) & Anlist

End Sub

MRunMacroSuspended (BSTR macroname, VARIANT params);
Dieses Kommando wird nicht aufgezeichnet. Es kann vom Anwender in das Makro eingefügt werden, um ein
weiteres Makro zu starten, das aber nicht sofort ausgeführt wird, sondern erst wenn das aufrufende Makro
aus dem aktuellen Aufruf zurückgekehrt ist. Ein Anwendungsfall wäre, aus einem MDP Fensterscript heraus
das Fenster zu schließen in dessen Kontext das Script abläuft. Dies würde beim direkten Aufruf zu einer
Ausnahme führen. Über den Umweg über ein weiteres Makro, aufgerufen mit diesem Kommando, kann dies
durchgeführt werden.

➢  Parameter:
macroname
params

➢  Rückgabe:
keine

Der Name des aufgerufenen Makros
Ein Array mit Parametern, auf die das Aufgerufene Makro mit der MParameters –
Funktion zugreifen kann.

MChooseFile (BSTR Filename, short ret);
Dieses Kommando wird aufgezeichnet wenn im Programm eine Dateiauswahl aufgerufen wird. Bei der Aus-
führung des Makros, wird der bei der Aufzeichnung gewählte Dateiname und der beim Aufruf der Original-
funktion zurückgegebene Ergebniswert verwendet.

➢  Parameter:
Filename
ret
WinLine Makros

Der gewählte Dateiname mit Pfad
der Ergebniswert des Originalaufrufs (0 bei Abbruch, 1 bei Auswahl einer Datei)

mesonic © 07/2020

Seite 26

➢  Rückgabe:
keine

MDoModal (BSTR Value, short ret);
Dieses Kommando wird aufgezeichnet wenn im Programm ein modales Fenster aufgerufen wird. Das einzige
mit diesem Aufruf unterstützte modale Fenster ist die modale Auswahl einer Grafik aus dem Grafikmatch-
code (z.B. im Artikelstamm).

➢  Parameter:
Value

ret

➢  Rückgabe:
keine

Der aktuelle Wert der globalen Variable, die bei Matchcode-Aufrufen den gewählten
Wert enthält (im Falle des Grafikmatchcodes ist dies der Name der Grafik).
der Ergebniswert des Originalaufrufs (0 bei Abbruch, 1 bei Beendigung des Fensters
mit OK.

MExecDrillDown (short nWinId, short nFieldId, BSTR ItemText, BSTR HiddenText);
Dieses Kommando wird aufgezeichnet wenn in einer Druckvorschau ein Hyperlink angeklickt wird. Bei der
Ausführung des Kommandos wird die gleiche Aktion durchgeführt, die der Klick auf den Hyperlink ausführen
würde.

➢  Parameter:
nWinId
nFieldId

ItemText
HiddenText

➢  Rückgabe:
keine

Nummer des Fensters in dem sich die Vorschau befindet
Nummer des Vorschauelements (in Standard Vorschaufenstern immer 100) (wenn 0,
wird 100 verwendet)
der angezeigte Wert des angeklickten Hyperlinks
der versteckte Wert des Hyperlinks, der die beim Klick des Hyperlinks durchzufüh-
rende Aktion beschreibt.

MExecGridDrillDown (short nWinId, short nFieldId, int line, short col, BSTR ItemText, BSTR
HiddenText);

Dieses Kommando wird aufgezeichnet wenn in einer Bildschirmtabelle ein Hyperlink angeklickt wird. Bei der
Ausführung des Kommandos wird die gleiche Aktion durchgeführt, die der Klick auf den Hyperlink ausführen
würde.

➢  Parameter:
nWinId
nFieldId
line
col
ItemText
HiddenText

➢  Rückgabe:
keine

Nummer des Fensters in dem sich die Bildschirmtabelle befindet
Nummer der Bildschirmtabelle
Zeile in der Bildschirmtabelle
Spalte in der Bildschirmtabelle
der angezeigte Wert des angeklickten Hyperlinks
der versteckte Wert des Hyperlinks, der die beim Klick des Hyperlinks durchzufüh-
rende Aktion beschreibt.

WinLine Makros

mesonic © 07/2020

Seite 27

MOpenGridAsXls (short nWinId, short nFieldId);
Dieses Kommando wird aufgezeichnet wenn in einer Bildschirmtabelle die ‘Ausgabe Excel’ - Schaltfläche
gedrückt wird.

➢  Parameter:
nWinId
nFieldId

➢  Rückgabe:
Keine

Nummer des Fensters in dem sich die Bildschirmtabelle befindet
Nummer der Bildschirmtabelle

MGetRelativeDate (short nWhatDate);
Dieses Kommando wird nicht direkt aufgezeichnet, kann aber nach einer Aufzeichnung anstatt eines Datums
eingegeben werden, damit beim Abspielen des Makros immer ein Datum relativ zum gerade aktiven Datum
verwendet wird.

➢  Parameter:
nWhatDate

➢  Rückgabe:
Das Datum ohne Zeit.

Nummer des Datums, das beschreibt welches Datum relativ zum aktuellen verwen-
det werden soll:
0 oder 1
2
3
4
5
6
7
8
9
10

das aktuelle Datum
ein Tag vor dem aktuellen Tag
Anfang des Monats
Ende des Monats
Anfang des letzten Monats
Ende des letzten Monats
Anfang der Woche
Ende der Woche
Anfang der letzten Woche
Ende der letzten Woche

MSaveFullGridSettings (short nWinId, short nFieldId, BSTR Setting);
Dieses Kommando wird aufgezeichnet wenn die Gesamteinstellungen einer Bildschirmtabelle gespeichert
werden.

➢  Parameter:
nWinId
nFieldId
Setting

➢  Rückgabe:
TRUE/FALSE

Nummer des Fensters in dem sich die Bildschirmtabelle befindet
Nummer der Bildschirmtabelle
der Name der gespeicherten Einstellungen. Der Name ist leer wenn die <Stan-
dardeinstellungen> gespeichert werden.

MLoadFullGridSettings (short nWinId, short nFieldId, BSTR Setting);

Dieses Kommando wird aufgezeichnet wenn in einer Bildschirmtabelle die Gesamteinstellungen geladen wer-
den.

➢  Parameter:
nWinId
nFieldId

WinLine Makros

Nummer des Fensters in dem sich die Bildschirmtabelle befindet
Nummer der Bildschirmtabelle

mesonic © 07/2020

Seite 28

Setting

der Name der geladenen Einstellungen. Der Name ist leer wenn die <Standardein-
stellungen> geladen werden.

➢  Rückgabe:
TRUE/FALSE

MPreviewButton (short nWinId, short nFieldId, short ButtonId, short AddParam);
Dieses Kommando wird aufgezeichnet wenn in einer Druckvorschau der PowerReport - Button ausgewählt
wird.

➢  Parameter:
nWinId
nFieldId
ButtonId
AddParam

Nummer des Fensters der Druckvorschau
Nummer des Druckvorschauelements im Fenster (100)
Die interne Id des PowerReport Buttons (15022)
Ein zusätzlicher Parameter, der immer mit 1 übergeben wird

➢  Rückgabe:
Keine

2.1.3.  Ereignisse

void OnRunMacro();
Dieses Kommando wird nicht aufgezeichnet. Das Ereignis wird ausgelöst (= die Funktion im Makro aufgeru-
fen), wenn das Makro startet.

void OnStopMacro();
Dieses Kommando wird nicht aufgezeichnet. Das Ereignis wird ausgelöst (= die Funktion im Makro aufgeru-
fen), wenn das Makro beendet wird.

2.2.

Verwaltung von Makros

Die Verwaltung der Makros erfolgt im Programm WinLine START im Menüpunkt



Parameter
Programm Makros

Dort können neue Makros angelegt, bestehende Makros verändert oder gelöscht und auch Makros gestartet
werden. Über dieses Fenster können allerdings keine Makros aufgezeichnet werden.

Das Fenster ist in drei Register verteilt, wobei ohne zusätzliche Lizenz nur das Register "Makros" zur Verfü-
gung steht.

Die Register "Fenster Skripten" und "System Skripten" können nur dann angewählt werden, wenn die ent-
sprechende MDP-RunTime-Lizenz zur Verfügung steht.

Im Register "Makros" werden alle Makros, die bereits erfasst wurden, angezeigt.

➢  Starten
Durch Anklicken des Starten-Buttons wird das gerade aktive Makro (dieses ist gelb hinterlegt) ausgeführt.

WinLine Makros

mesonic © 07/2020

Seite 29

➢  Editieren
Durch Anklicken des Editieren-Buttons kann der Inhalt des Makros angesehen und auch verändert werden.

➢  Löschen
Durch Anklicken des Löschen-Buttons wird das aktuell ausgewählte Makro gelöscht.

➢  Exportieren
Durch Anklicken des Exportieren-Buttons kann das gerade aktive Makro (dieses ist gelb hinterlegt) in eine
Textdatei exportiert werden. Diese Datei bekommt die Erweiterung MMR.

➢  Importieren
Durch Anklicken des Importieren-Buttons kann ein Makro (auch mehrere Makros) aus einer Textdatei impor-
tiert werden (ist auch mittels Drag & Drop möglich). Damit können Makros von einer Installation zu einer
anderen transferiert werden.

➢  Ende
Durch Drücken der ESC-Taste wird das Fenster geschlossen.

➢  Ohne Fenster ausführen
Wird diese Option aktiviert, dann werden alle Makros im "Silent-Mode" ausgeführt, d.h. es werden keine
Meldungen ausgegeben, die ggf. beim Aufnehmen des Makros angezeigt wurden. Das bewirkt auch, dass die
einzelnen Fenster nur kurz geöffnet und wieder geschlossen werden und somit eine "zuckenden Effekt" aus-
lösen.

2.3.  Was kann mit Makros gemacht werden?

Makros können auf 4 verschiedene Arten aufgerufen und abgearbeitet werden:











Aus der Buttonleiste bzw. aus dem Menüpunkt Parameter/Programm Makros im WinLine START.
Diese Vorgangsweise wurde bereits in den vorherigen Kapiteln dargestellt.

Aus den Favoriten

Aus einer Befehlszeile z.B. einer Batchdatei oder einem Icon, wobei dem WinLine - Programm eini-
ge Parameter mitgegeben werden können.

Aus der Funktion externe Programme (z.B. über die Buttonleiste Tools)

Aus dem Cockpit, wo das Makro eingebunden und mit einen einfachen Klick gestartet werden
kann.

2.3.1.  Starten der Makros aus den Favoriten

Damit Makros aus den Favoriten gestartet werden können, ist folgende Vorgangsweise einzuhalten.







Aufnahme und abspeichern des gewünschten Makros.

Aufruf der Favoriten (rechte Maustaste in der Buttonleiste, Option Favoriten).

Das Fenster "Favoriten" aktivieren und dort wieder mit der rechten Maustaste die Option "Neuer
Eintrag" auswählten.

WinLine Makros

mesonic © 07/2020

Seite 30



Im Feld "Bezeichnung" wird der Text eingetragen, unter dem man das Makro aufrufen möchte. Als
Option wird "Makro/Script" eingestellt. Daraufhin kann aus der Listbox eines der angelegten Mak-
ros ausgewählt werden. Durch Anklicken des OK-Buttons wird der Eintrag in die Favoriten einge-
fügt.

2.3.2.  Starten des Makros mit dem Programm

Mit dieser Option kann z.B. ein Sicherungslauf in der WinLine automatisch zu einer bestimmten Zeit durchge-
führt werden. Dabei ist wieder folgende Vorgangsweise einzuhalten:





Aufnahme und abspeichern des Makros. Dabei ist zu beachten, dass das Makro vom Schritt nach
der Mandantenbestätigung (sofern vorhanden) aufgezeichnet werden muss.
Einrichten der Befehlszeile, wobei folgende Parameter mitgegeben werden müssen:

/USERX
X steht für den Benutzer, mit dem das Makro ablaufen soll.

/PASSWDY
Y steht für das Password, das der Benutzer verwendet.

/COMPANYZ
Z steht für die Mandantennummer, mit der das Makro abgearbeitet werden soll. Diese Option muss nur dann
mitgegeben werden, wenn das Programm WinLine START aufgerufen werden soll.

WinLine Makros

mesonic © 07/2020

Seite 31

/YEARXXXX
XXXX steht für das Wirtschaftsjahr, das im Mandanten geöffnet werden soll. Das Wirtschaftsjahr muss so
geschrieben werden, wie es auch in der Auswahllistbox des Mandantenwechsels angezeigt wird (z.B.
/YEAR2003(10). Dieser Parameter kann Optional verwendet werden. Wird der Parameter nicht gesetzt, wird
der Mandant mit dem letzten WJ (Standard) gestartet.

/MACROMAKRO
MAKRO steht für den Makronamen, das durchgeführt werden soll.

/QUITAFTERMACRO
Mit diesem Parameter wird das Programm, nachdem das Makro abgearbeitet wurde, wieder beendet.

Beispiel:
So sieht die Befehlszeile aus, wenn ein Datensicherungsmakro automatisch gestartet werden soll:

C:\WinLine\ADMN.EXE /USERa /PASSWDb /MACROSICHERN /QUITAFTERMACRO

Dadurch wird das Programm WinLine ADMIN gestartet, der Benutzer a loggt sich mit Password b ein und
danach wird sofort das Makro "Sichern" ausgeführt. Nachdem das Makro ausgeführt wurde, wird auch das
Programm WinLine ADMIN wieder beendet.

2.3.3.  Starten des Makros aus den externen Programmen

Makros können bei den externen Programmen unter dem Menüpunkt


hinterlegt werden.

Applikationen
externe Programme

In der Spalte, wo man normalerweise das Verzeichnis des Programms einträgt, wird bei einem Makro fol-
gendes eingetragen:
MACRO:XXX (XXX steht für den Namen des Makros).

Das Makro kann nun entweder über den Menüpunkt


oder über die Buttonleiste "Tools" aufgerufen werden.

Applikationen
Makroname

2.3.4.  Starten des Makros aus dem Cockpit

Damit ein Makro im Cockpit hinterlegt werden kann, sind folgende Schritte durchzuführen:

Zuerst muss das Cockpit ausgewählt werden, in dem das Makro hinterlegt werden soll. Dort wird dann auf
den "Bearbeiten"-Link geklickt, wodurch die Bearbeitung möglich wir. Hier kann nun ein neuer Eintrag er-
fasst werden, wobei die Option "Makro" verwendet werden muss.

WinLine Makros

mesonic © 07/2020

Seite 32

Folgende Einstellungen können vorgenommen werden:

➢  Name
Eingabe des Namens, der in weiterer Folge im Cockpit angezeigt werden soll. Der Name wird aus dem ge-
wählten Makro übernommen und kann nachträglich noch verändert werden

Im unteren Teil des Fensters werden alle Makros angezeigt, die aufgenommen wurden. Aus diesen Einträgen
kann der gewünschte ausgewählt werden.

Der Eintrag kann durch Drücken der F5-Taste oder durch Anklicken des VOR-Buttons gespeichert werden.

Im Cockpit wird in der entsprechenden Rubrik ein zusätzlicher Eintrag dargestellt, wobei dieser mit dem Icon
 dargestellt wird. Wird dieser Eintrag angeklickt, wird das hinterlegte Makro aufgerufen und abgearbeitet.

WinLine Makros

mesonic © 07/2020

Seite 33

Hinweis:
In diesem Zusammenhang ist es wichtig, dass die Makros so aufgenommen werden, dass sie immer vom
Programm WinLine START aus abgearbeitet werden können. D.h. im Makro sollte auch der Wechsel vom
WinLine START in die entsprechende Applikation mit aufgenommen werden, damit der Aufruf auch vom
Cockpit aus funktioniert. Fehlt der Aufruf der Applikation, dann wird das Makro entweder falsch abgearbeitet
(falscher Menüpunkt wird aufgerufen) oder scheitert bereits am Menüaufruf.

WinLine Makros

mesonic © 07/2020

