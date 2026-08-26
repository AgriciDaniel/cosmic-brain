White Paper
WinLine
"MDP - WebServices"

Seite 2

Inhaltsverzeichnis

1.

2.
2.1.
2.2.
2.3.

3.
3.1.
3.2.
3.3.
3.4.
3.5.
3.5.1.
3.5.2.
3.5.3.
3.5.4.
3.5.5.
3.5.6.
3.5.7.
3.5.8.
3.5.9.
3.5.10.
3.5.11.
3.5.12.
3.5.13.
3.5.14.
3.5.15.
3.5.16.
3.5.17.
3.5.18.
3.5.19.
3.5.20.
3.5.21.
3.5.22.
3.5.23.
3.5.24.
3.5.25.
3.5.26.
3.6.
3.6.1.
3.6.2.
3.6.3.
3.6.4.
3.6.5.
3.6.6.
3.6.7.
3.6.8.
3.6.9.
3.6.10.
3.6.11.

Allgemeine Einführung................................................................................................. 4

Voraussetzungen ......................................................................................................... 5
Lizenzen .............................................................................................................................. 5
Vorlagen - Allgemein ............................................................................................................ 5
Vorlagen - Zusätzliche WebService-Funktionen ....................................................................... 7

Funktionen ................................................................................................................. 12
Login ................................................................................................................................. 12
Logout ............................................................................................................................... 13
Test .................................................................................................................................. 13
Reports ............................................................................................................................. 14
Export ............................................................................................................................... 17
Export - Key - Allgemein ..................................................................................................... 20
Export - Key - 01 - Personenkonten ..................................................................................... 20
Export - Key - 02 - Sachkonten ........................................................................................... 20
Export - Key - 03 - Interessenten ........................................................................................ 21
Export - Key - 04 - Artikel ................................................................................................... 21
Export - Key - 05 - Preise .................................................................................................... 21
Export - Key - 06 - Arbeitnehmer A ..................................................................................... 21
Export - Key - 07 - Kontakte ............................................................................................... 21
Export - Key - 08 - Anlage .................................................................................................. 21
Export - Key - 09 - Kostenstelle ........................................................................................... 21
Export - Key - 10 - Kostenart .............................................................................................. 21
Export - Key - 11 - Kostenträger.......................................................................................... 22
Export - Key - 15 - Projekte ................................................................................................ 22
Export - Key - 17 - Bankverbindungen ................................................................................. 22
Export - Key - 19 - Lagerort - Zuordnung ............................................................................. 22
Export - Key - 20 - Mitarbeiter............................................................................................. 22
Export - Key - 30 - Belege................................................................................................... 22
Export - Key - 31 - Buchungsstapel ..................................................................................... 22
Export - Key - 34 - CRM ...................................................................................................... 23
Export - Key - 36 - Fehlzeitenerfassung A (WinLine SMART TIME) ......................................... 23
Export - Key - 38 - Lagerbuchungen .................................................................................... 24
Export - Key - 39 - Kommissionierung .................................................................................. 24
Export - Key - 40 - Produktion ............................................................................................. 24
Export - Key - 41 - Inventur ................................................................................................ 28
Export - Key - 42 - PPS Zeiten ............................................................................................. 28
Export - Key - 50 - FORM Datenquellen ............................................................................... 29
Import ............................................................................................................................... 29
Import Personenkonten ...................................................................................................... 33
Import - Kontakte .............................................................................................................. 33
Import - Belege .................................................................................................................. 34
Import - CRM ..................................................................................................................... 38
Import - Lagerbuchungen ................................................................................................... 41
Import - Kommissionierung ................................................................................................. 42
Import - Produktionsauftrag ................................................................................................ 43
Import - PPS Zeiten ............................................................................................................ 47
Import - Inventur ............................................................................................................... 48
Import - IST-Zeiten (Zeiterfassung) ..................................................................................... 50
Import - FORM Datenquellen .............................................................................................. 50

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 3

3.7.
3.8.
3.9.
3.9.1.

Macro ................................................................................................................................ 51
LIST .................................................................................................................................. 52
POSTING ........................................................................................................................... 54
Voucherdownload ............................................................................................................... 55

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 4

1.  Allgemeine Einführung

Gültig ab WinLine Edition 2023 - Version 12.17.
Die WinLine MDP-WebServices dienen dazu, bestimmte Daten an die WinLine zu übergeben bzw. abzuholen,
ohne direkte Funktionen der WinLine (Programmmakros, ActionServer oder dergleichen) verwenden zu
müssen.

Derzeit werden folgende WebServices in der WinLine Edition 2023 - Version 12 unterstützt:

✓
✓
✓
✓
✓
✓
✓
✓
✓
✓

✓
✓

Auswertungen können über ein WebService als PDF Ausgabe abgerufen werden
Auswertungen von LIST - Listen als PDF oder als JSON
Export und Import von diversen Stammdaten (z.B. Personenkonten oder Artikel)
Export und Import von FIBU-Buchungsstapeln mit der Möglichkeit des direkten Verbuchens
Export und Import von FAKT-Belegen mit der Möglichkeit des direkten Drucks
Export und Import von CRM-Workflow-Schritten und CRM-Aktionen
Export und Import von Lagerbuchungszeilen der WinLine FAKT
Import von Kommissionierungszeilen der WinLine FAKT
Export und Import von Inventurdaten der WinLine FAKT
Export und Import von Produktionsaufträgen, Löschen von Produktionsaufträgen und
Materialentnahmen der WinLine PPS
Ausführung von Makros
Export und Import von FORM-Datenquellen

Hinweis
Für alle WebServices der Bereiche Export und Import ist der übergebende Stream im XML-Format. Der Inhalt
des Formats wird über WinLine Vorlagen des Typs "Export/Import-Vorlagen" definiert.

Nachfolgend finden Sie eine Beschreibung der Voraussetzungen bzw. eine Liste der Funktionen, welche
unterstützt werden.

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 5

2.  Voraussetzungen

In den folgenden Kapiteln werden die Voraussetzungen für die Verwendung von MDP-WebServices
beschrieben.

2.1.

Lizenzen

Die MDP-WebServices benötigen mindestens eine WinLine corporate Lizenz der betreffenden Applikation,
das Modul WinLine EXIM, eine MDP-Lizenz (Runtime oder Developer), sowie eine 64-Bit-Architektur /
Umgebung - Applikationsserver-Lizenz. Des Weiteren muss die Implementierung / Wartung von einem MDP
Partner erfolgen.
WinLine compact wird der WinLine corporate Lizenz gleichgesetzt, es muss aber im Rahmen der WinLine
compact ein 64-Bit-Architektur / Umgebung - Applikationsserver für EUR 161,-/p.m. lizenziert werden.

Für die Nutzung der WinLine WebServices wird ein freier WinLine business/corporate Benutzer benötigt.

Jede natürliche Person, die auf WinLine Datenbanken gleich welcher Konstellation (z.B. direkt oder indirekt,
repliziert oder kopiert, synchron oder asynchron) lesend oder schreibend zugreift, ist als WinLine Benutzer zu
lizenzieren. Dies unabhängig davon über welches Device, welche Software (sei dies mesonic Software oder
Drittsoftware) oder in welcher Form der Zugriff generell erfolgt.

Es gelten die Bestimmungen der AGB und der Lizenzmeldung idgF.

2.2.

Vorlagen - Allgemein

Für die meisten WebService-Funktionen werden Vorlagen benötigt, mit deren Hilfe die Datenfelder bzw.
auch der Dateninhalt bestimmt wird. Hierfür können im WinLine START über den Menüpunkt





Vorlagen
Vorlagen Anlage
Export-/Import-Vorlagen

eigene Vorlagen angelegt werden. Derzeit können für folgende Bereiche WebService-Vorlagen angelegt
werden:

✓
✓
✓
✓
✓
✓
✓
✓
✓
✓
✓
✓
✓
✓
✓
✓
✓

Personenkonten
Sachkonten
Interessenten
Artikel
Preise
Arbeitnehmer A
Kontakte
Anlagen
Kostenstellen
Kostenarten
Kostenträger
Projekte
Bankverbindungen
Mitarbeiter
Belege
Buchungsstapel
CRM

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 6

✓
✓
✓
✓
✓
✓
✓

Fehlzeitenerfassung A (WinLine SMART TIME)
Lagerbuchung
Kommissionierung
Produktionsauftrag
Inventur
Lagerort - Zuordnung
PPS Zeiten

Hinweis

Grundsätzlich können die Vorlagen so angelegt werden, wie sie auch in der WinLine Verwendung finden (mit
Vorbelegungen, Platzhaltern, etc.). Allerdings muss für die Nutzung der Vorlage im WebService zunächst die
Option "Webservice-Vorlage" aktiviert werden.

Achtung
Es muss darauf geachtet werden, dass der Benutzer, über welchen in weiterer Folge die WebServices
ausgeführt werden sollen, auch die Berechtigung aufweist auf die Vorlage zuzugreifen zu dürfen.

➢  Webservice-Vorlage
Wenn diese Checkbox aktiviert wird, so kann die Vorlage beim Export/Import mit WebServices verwendet
werden. Zusätzlich kann die Vorlage auch in den EXIM-Fenstern (EXIM Stammdaten, Buchungsstapel-EXIM,
Batchbeleg, Inventur - EXIM, etc.) mit ODBC-Treiberoption "97 XML (WebService)" verwendet werden.

Hinweis - Produktionsauftrag
Für die Produktion muss im weiteren Verlauf zusätzlich der sogenannte "Aktionscode" angegeben werden.
Pro Aktionscode gibt es unterschiedliche "Pflichtfelder", die in der Vorlagedefinition vorhanden sein müssen!
Natürlich ist möglich mit derselben Vorlage die unterschiedlichen Aktionen abhängig vom Aktionscode
ausführen zu lassen, dabei werden dann entsprechende Felder der Vorlage verwendet.

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 7

✓

✓

✓

✓

✓

2 - Produktionsauftragsanlage
Vorlagen-Pflichtfelder: Produktionsauftragsnummer, Artikelnummer (=Produktionsartikel),
Produktionsdatum, Auftragsmenge (Produktionsmenge)
3 - Produktionsauftrag löschen
Vorlagen-Pflichtfelder: Produktionsauftragsnummer, Kurzcode (= Arbeitsschrittnummer)
4 - Einfügen von Artikelzeilen
Vorlagen-Pflichtfelder: Produktionsauftragsnummer, JournalKey, Artikelnummer (Rohmaterial),
Auftragsmenge (Produktionsmenge), Produktionsdatum
5 - Einfügen von Artikelzeilen plus Ausgabe des Mat.Scheines (Materialentnahme)
Wie 4 und 6
6 - Ausgabe des Mat.Scheines (Materialentnahme)
Vorlagen-Pflichtfelder: Produktionsauftragsnummer, JournalKey, Journalzeilennummer,
Materialmenge, Auftragsmenge, Produktionsdatum

Hinweis
Bei dem Journalkey können die letzten 3 Stellen mit 000 belegt sein. In diesem Fall sucht sich die WinLine
die nächste Journalkey-Nummer automatisch.

Beispiel
✓

001-000  => es soll einen Artikel beim Arbeitsschritt 1 (sofern dieser natürlich die Journalkey-

Nummer 001 hat) hinzugefügt werden

2.3.

Vorlagen - Zusätzliche WebService-Funktionen

Sobald die Option "Webservice-Vorlage" aktiviert wurde stehen folgende zusätzliche Funktionen im
Vorlagenfenster zur Verfügung:

WebService(XML)

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 8

In diesem Bereich kann eine WebService Vorlage getestet werden, wenn der Fokus auf einer Webservice-
Vorlage liegt.

➢  Selektion
Über das Eingabefeld werden die Parameter für die Daten-Selektion bei einem Export definiert (mit welchem
Datensatz getestet werden soll). Folgende Parameter stehen zu Verfügung:

✓

✓

✓

✓

✓

Datensatz (Key)
Es wird der zu exportierende Datensatz (z.B. eine Kontonummer oder eine Artikelnummer -
abhängig vom Vorlagentyp) hinterlegt (Syntax => Datensatz). Nähere Information entnehmen Sie
bitte dem Kapitel "Export - Key".

Beispiel
Es soll das Personenkonto "230A001" exportiert werden. Hierfür muss im Feld "Selektion" nur die
Kontonummer 230A001 hinterlegt werden.

Mehrere Datensätze
Es werden die zu exportierende Datensätze (z.B. eine Kontonummer oder eine Artikelnummer -
abhängig vom Vorlagentyp) hinterlegt. Diese müssen mit einem Komma getrennt werden und die
Nummern sind in einfache Anführungsstriche zu setzen (Syntax => 'Datensatz','Datensatz').

Beispiel
Es sollen die Personenkonten "230A001", "230B002" und "230C005" exportiert werden. Hierfür
muss im Feld "Selektion" die Hinterlegung mit '230A001', '230B002', '230C005' erfolgen.

Filter
Es wird ein Filter für die Selektion verwendet (Syntax => FilterFiltername). Hierfür muss der Filter
für den entsprechenden Vorlagentyp zunächst im EXIM (WinLine START - Vorlagen - EXIM)
angelegt werden.

Beispiel
Es wurde für den Typ "Personenkonten" ein Filter mit dem Namen "TopKunden" angelegt. Durch
die Eingabe FilterTopKunden wird der Filter bei dem Export verwendet.

Zählliste
Für den Export von Inventurdaten (Typ "Inventur") steht die Möglichkeit zur Verfügung, auf
Zähllisten zuzugreifen, welche zuvor in dem Programm "Zähllisten - Definition" (WinLine FAKT -
Erfassen - Inventur) angelegt wurde (Syntax => ZaehllisteZähllistennummer).

Beispiel
Es wurde eine Zählliste mit dem Namen "Schnelldreher" angelegt. Durch die Eingabe
ZaehllisteSchnelldreher wird die Zählliste bei dem Export verwendet.

Achtung
In der entstehenden XML-Datei wird genutzte Zählliste automatisch als Attribut hinterlegt.

Buchungsnummer
Sofern der Export eine Selektion auf die Buchungsnummer unterstützt, so kann diese direkt oder
mit einem "von / bis"-Bereich angegeben werden (Syntax => JNummer oder JvonNummer-
bisNummer).

Beispiel
Es sollen die Buchungsnummern "100" bis "150" des Artikeljournals (Typ "Lagerbuchung")
ausgegeben werden. Hierfür muss im Feld "Selektion" die Hinterlegung mit J100-150 erfolgen.

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 9

✓

Periode
Sofern der Export eine Selektion auf die Periode unterstützt, so kann diese direkt oder mit einem
"von / bis"-Bereich angegeben werden (Syntax => PPeriode oder PvonPeriode-bisPeriode).

Beispiel
Es sollen die FIBU-Buchungen der Perioden 3 und 4 (Typ "Buchungsstapel") ausgegeben werden.
Hierfür muss im Feld "Selektion" die Hinterlegung mit P3-4 erfolgen.

 Export

➢
Durch Anwahl dieses Buttons wird gemäß Selektion ein Webservice-Export gestartet. Die zurückgelieferte
XML-Datei wird im Standardprogramm für XML-Dateien angezeigt und im Verzeichnis "MESOWebservice" des
WinLine-Ordners abgelegt. Der Name der Datei lautet MESOVorlagentypVorlagennameSelektion.xml (z.B.
MESOInventurErfassungsdatenZaehllisteSchnelldreher.xml).

 Prüfen

➢
Durch Anklicken des Buttons "Prüfen" kann eine XML-Datei auf ihre Richtigkeit geprüft werden. Zuerst muss
über den Öffnen-Dialog eine XML-Datei gewählt werden, welche der ausgewählten Vorlage entspricht.
Nach der Auswahl der Datei im Öffnen-Dialog erfolgt dann die Prüfung, wobei das Prüfergebnis sofort am
Bildschirm angezeigt wird (im Standardprogramm für XML-Dateien). Zusätzlich wird im WinLine-
Unterverzeichnis "MESO WebService" eine XML-Datei mit der Bezeichnung
"MESOVorlagentypVorlagennameDatumTUhrzeit.xml" (z.B. MESOResultBuchungsstapelStapel2017-05-
04T12-03-44.xml) angelegt, welche auch das Prüfergebnis beinhaltet.

 Import

➢
Durch Anklicken des Buttons "Import" kann eine XML-Datei direkt importiert werden. Zuerst muss über den
Öffnen-Dialog eine XML-Datei gewählt werden, welche der ausgewählten Vorlage entspricht.
Nach der Auswahl der Datei im Öffnen-Dialog erfolgt dann die Übernahme, wobei das Ergebnis (erfolgreicher
Import oder Fehlermeldung) sofort am Bildschirm angezeigt wird (im Standardprogramm für XML-Dateien).
Zusätzlich wird im Unterverzeichnis "MESO WebService" eine XML-Datei mit der Bezeichnung
"MESOVorlagentypVorlagennameDatumTUhrzeit.xml" (z.B. MESOResultBuchungsstapelStapel2017-05-
04T13-15-10.xml) angelegt, welche auch das Importergebnis beinhaltet. Des Weiteren wird bei diesem
Schritt ein Eintrag ins "Webservice-Protokoll" vorgenommen.

Ribbon

➢  Webservice-Schema exportieren
In der Ribbonleiste steht, wenn eine Vorlage ausgewählt wurde, welche als "Webservice-Vorlage" definiert
wurde, der Button "Webservice-Schema exportieren" zur Verfügung.
Durch Anklicken dieses Buttons wird auf Basis der ausgewählten Vorlage eine XSD-Datei (XML Schema
Definition) erzeugt, in welcher die Struktur des XML-Dokuments beschrieben wird. Diese Datei ist vor allem
für die Erstellung der XML-Dateien hilfreich, die mit den WebServices verarbeitet werden sollen.

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 10

Beispiel für eine XSD-Datei für eine Personenkontenvorlage

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 11

Beispiel für eine XSD-Datei für einen Belegimport

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 12

3.

Funktionen

In den folgenden Kapiteln werden die MDP-WebService-Funktionen und deren Syntax erläutert.

3.1.

Login

Mit der folgenden Funktion kann eine SessionId gebildet werden.

Syntax
http://<WinLineServer>/ewlservice/login?user=xx&password=yy&company=zzzz

Parameter
Der Befehl unterstützt die folgenden Parameter:

➢  User=
Benutzername, der am WinLine Server als Schattenbenutzer angemeldet wird.

Achtung
Der Benutzer muss in der WinLine angelegt und als EWL-Benutzer definiert sein.

➢  Password=
Passwort des Benutzers

➢  Company=
Angabe des Mandanten

➢  CompanyYear=
Angabe des Wirtschaftsjahrs (optional)
Mit diesem Parameter kann das Wirtschaftsjahr angegeben werden, das in der Session verwendet werden
soll. Dabei muss das WJ so angegeben werden, wie es die Anzeige in der WJ-Auswahllistbox dargestellt wird
z.B. 2021 für das WJ 1-12/2021 oder 2021(5) für das WJ 5/2021 bis 4/2022. Wird kein "CompanyYear" mit
angegeben, so wird das aktuellste Wirtschaftsjahr verwendet.

➢  Language=
Angabe der Sprache (optional)
Die gewünschte Sprache für Ausgaben kann mit diesem Parameter angegeben werden (Sprache "Deutsch"
ist die Rückfallsprache falls nicht angegeben). Die folgenden Sprachen sind der WinLine Standardversion
verfügbar:

✓
✓
✓
✓
✓
✓
✓
✓
✓
✓
✓
✓

0= Deutsch
1=Englisch
3=Italienisch
4=Türkisch
5=Ungarisch
7=Tschechisch
8=Polnisch
9=Spanisch
11=Rumänisch
12=Kroatisch
14=Chinesisch
15=Albanisch

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 13

Die entsprechenden Sprachdateien müssen in der WinLine vorliegen und installiert sein, inklusive der
erforderlichen Sprachlizenzen.

Ergebnis
Das Ergebnis ist eine SessionId, die genau in dem Format zurückgeliefert wird, wie sie dann in den weiteren
Befehlen eingefügt werden kann:

✓

Session=845743da-94f7-11e1-ccce-4487fc4877d6-3948-2416

Die Session, die damit am Server eingerichtet ist (und automatisch am WinLine Server als Schattenbenutzer
eingeloggt ist), läuft ab dem jeweils zuletzt abgegebenen Befehl eine Stunde.

Hinweis
Mit dem Eintrag "MaxHTTPSessionKeepAliveTime=" in der server.config kann eingestellt werden, wie lange
die Session geöffnet bleiben soll (der Standardwert beträgt 3600 Sekunden). Danach wird der Benutzer am
WinLine Server automatisch ausgeloggt (der Schattenbenutzer gelöscht) und die Session beendet.

3.2.

Logout

Eine SessionId kann man auch schon vor der Zeit mit dem folgenden Befehl beenden.

Syntax
http://<WinLineServer>/ewlservice/logout?Session=845743da-94f7-11e1-ccce-4487fc4877d6-3948-2416

Parameter
Der Befehl unterstützt die folgenden Parameter:

➢  Session=
Nummer der Session

Ergebnis
Die Session wird beendet und kann nicht weiter genutzt werden.

3.3.

Test

Mit dieser Funktion kann überprüft werden, ob eine bestimmte Session noch vorhanden ist:

Syntax
http://<WinLineServer>/ewlservice/test?Session=845743da-94f7-11e1-ccce-4487fc4877d6-3948-2416

Parameter
Der Befehl unterstützt die folgenden Parameter:

➢  Session=
Nummer der Session

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 14

Ergebnis
Als Ergebnis wird entweder…
✓

Success! Session="Session-ID"

… oder…

✓

Error! The requested Session was not found on the server.

zurückgegeben.

3.4.  Reports

Dieser Befehl öffnet das in den Parametern angegebene Fenster und führt es mit F5 aus. Die sich ergebende
Liste wird als Acrobat PDF zurückgeliefert.

Syntax
http://<WinLineServer>/ewlservice/reports?Session=845743da-94f7-11e1-ccce-4487fc4877d6-3948-
2416&App=xx&Win=yy&Id105=230A001

Parameter
Der Befehl unterstützt die folgenden Parameter:

➢  Session=
Nummer der Session
Der Befehl kann auch ohne Sessions verwendet werden, dann muss im Befehl das Login durchgeführt
werden (Parameter "User=", "Password=" und "Company="). Damit wird der Befehl nach dem Login
durchgeführt und das Login am WinLine Server auch sofort wieder beendet. Durch das während des Befehls
durchgeführt Login/Logout gibt es einen Performancenachteil gegenüber einer Aktion mit einer vorhandenen
Session. Wird eine Session und die Login-Informationen übergeben, wird immer die Session verwendet.

➢  User=
Benutzer, falls ohne Sessions gearbeitet wird

Achtung
Der Benutzer muss in der WinLine angelegt und als EWL-Benutzer definiert sein.

➢  Password=
Passwort, falls ohne Sessions gearbeitet wird

➢  Company=
Mandant, falls ohne Sessions gearbeitet wird

➢  CompanyYear=
Angabe des Wirtschaftsjahrs (optional)
Mit diesem Parameter kann das Wirtschaftsjahr angegeben werden, das in der Session verwendet werden
soll. Dabei muss das WJ so angegeben werden, wie es die Anzeige in der WJ-Auswahllistbox dargestellt wird
z.B. 2021 für das WJ 1-12/2021 oder 2021(5) für das WJ 5/2021 bis 4/2022. Wird kein "CompanyYear" mit
angegeben, wird das aktuellste Wirtschaftsjahr verwendet.

➢  App=
Nummer der Anwendung, in welcher die Auswertung geöffnet wird

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 15

➢  Win=
Fensternummer der Auswertung

➢  Id
<Nummer des Fensterelements>=<Inhalt des Fensterelements>
Der Id<Nummer des Fensterelements>=<Inhalt des Fensterelements>-Parameter kann beliebig oft
verwendet werden, um mit dem Aufruf mehrere Felder im Auswertungsfenster füllen zu können.

➢  Language=
Angabe der Sprache (optional)
Die gewünschte Sprache für die Report-Ausgabe kann mit diesem Parameter angegeben werden (Sprache
"Deutsch" ist die Rückfallsprache falls nicht angegeben). Die folgenden Sprachen sind der WinLine
Standardversion verfügbar:

✓
✓
✓
✓
✓
✓
✓
✓
✓
✓
✓
✓

0= Deutsch
1=Englisch
3=Italienisch
4=Türkisch
5=Ungarisch
7=Tschechisch
8=Polnisch
9=Spanisch
11=Rumänisch
12=Kroatisch
14=Chinesisch
15=Albanisch

Die entsprechenden Sprachdateien müssen in der WinLine vorliegen und installiert sein, inklusive der
erforderlichen Sprachlizenzen.

➢  Exec=
ID des Buttons, welcher die Liste ausführt; Default ist der Button, der mit F5 ausgelöst wird (optional)
Der Button bei Exec= muss nur angegeben werden, wenn ein Button für den Report genutzt werden soll,
welche nicht auf F5 reagiert (d.h. z.B. der "OK"-Button oder der "Ausgabe"-Buttons funktionieren ohne den
Parameter).

➢  WinAndId
<Fensternummer*1000 + Feldnummer>= <Inhalt des Fensterelements>
Der WinAndId<ErmittelteNummer>=<Inhalt des Fensterelements>-Parameter ist für Sonderfälle
vorgesehen, bei denen durch den WebService-Befehl ein weiteres Fenster geöffnet wird (derzeit wird das
nur bei der Bilanz unterstützt). Damit können die Felder des zweiten Fensters gefüllt werden (z.B.
WinAndId168124=1). Der Parameter kann auch für das aktuelle Fenster verwendet werden, d.h. ist
gleichwertig mit dem Parameter Id<Nummer> im Fenster Win=<Fensternummer>.

➢  Grid<Id>R<Zeile>C<Spalte>=
<Wert in der Grid>
Mit dem Grid<Id>R<Zeile>C<Spalte>=-Parameter kann der Wert in der Tabelle gesetzt werden.

➢  AlternativeForm=
Nummer des Alternativformulars, beginnend bei 1
Der AlternativeForm=- Parameter wird verwendet, wenn das ausgegebene Formular mehrere
Ersatzformulare hinterlegt hat und bei dem Aufruf in der CWL/MWL die Auswahl des Formulars am
Bildschirm angezeigt würde.

➢  Filter=
Name des zu verwendenden Filters

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 16

➢  Where=
SQL Ausdruck, der im Filter verwendet werden soll
Wird ein Where-Ausdruck angegeben, dann muss auch ein Filter angegeben werden, damit die Selektion
über das SQL-Statement ausgelöst wird. Welcher Filter angegeben wird, ist nicht relevant, d.h. es kann auch
immer der "<temporärer Filter>"-Filter verwendet werden.
Des Weiteren ist zu beachten, dass in der URL nur Zeichen mit ASCII < 127 verwendet werden können und
auch hier nicht alle (z.B. kein Leerzeichen, keine < und >, ... etc). Manche Browser konvertieren die
Angaben automatisch beim Abschicken (z.B. Chrome).

Achtung

Damit das Where-Statement auch vom WebService verarbeitet wird, muss in der Datei "server.config" der
Eintrag "AllowWhereStatementInWebService=1" vorhanden sein. Dieses dient als Sicherheitsmaßnahme,
weil bei dem Where-Statement auch andere Statements "verpackt" werden könnten, die ggf. Schaden am
SQL-Server verursachen könnten!

Beispiele
✓

Journalabfrage, wo im Notizfeld nach dem Wert "Notiz" gefiltert wird (optimiert für den Internet
Explorer)
http://<WinLineServer>/ewlservice/reports?User=a&Password=b&Company=300M&
App=1&Win=52&Id154=1&Filter=<temporärer Filter>&Where=WHERE(t028.c017 like
'%Notiz%')
Bilanzabfrage mit Vorjahresvergleich der WJ 2014 und 2013
http://<WinLineServer>/ewlservice/reports?User=a&Password=b&Company=300M&
App=1&Win=168&Id165=12&Id175=1&Grid176R1C1=2014&Grid176R2C1=2013

Hinweis
Der Bereich "&Grid176R1C1=2014&Grid176R2C1=2013" des Aufrufs füllt die Tabelle des
Auswertefensters mit den Vorjahresmandanten.

Grid176 steht für ID der Tabelle
R1 steht für die Zeile 1 (dieser Wert muss anhängig von der Anzahl der Einträge entsprechend
erhöht werden)
C1=2014 steht für die Spalte 1, die dann mit dem Wert des WJ gefüllt wird

Im Prinzip können mit diesem Befehl beliebige Fensteraktionen durchführt werden (man kann ja
auch den gedrückten Button mit dem Exec - Parameter selbst bestimmen, allerdings wird nach
dem durchgeführten Befehl das Fenster sofort wieder geschlossen). Es sind nicht mehrere Befehle
auf ein geöffnetes Fenster möglich.

OP-Liste des aktuellen WJ für das Konto 230A001
http://<WinLineServer>/ewlservice/reports?Session=845743da-94f7-11e1-ccce-
4487fc4877d6-3948-2416&&App=01&Win=44&Id108=230A001&Id109=230A001

✓

✓
✓

✓

✓

Ergebnis
Der Report wird als PDF-Datei im Browser ausgegeben. Zusätzlich werden die ausgegebenen Reports per
Default in das TEMP-Verzeichnis des Benutzers am Server gestellt und werden mit dem Beenden der Session
automatisch gelöscht.

Hinweis
Wenn durch die Einstellungen mehrere eigenständige Dokumente ausgegeben werden würden (z.B. UVA-
Auswertung mit Steuerbeleg, Journal und UVA-Formulare), dann werden alle Dokumente zu einer Datei
zusammengefasst.

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 17

3.5.

Export

Dieser Befehl führt den Datenexport aus und liefert die exportierten Daten in XML - Form.

Syntax
http://<WinLineServer>/ewlservice/export?Session=845743da-94f7-11e1-ccce-4487fc4877d6-3948-
2416&Type=1&Vorlage=2&Key=230A001

Parameter

Der Befehl unterstützt die folgenden Parameter:

➢  Session=
Nummer der Session
Der Befehl kann auch ohne Sessions verwendet werden, dann muss im Befehl das Login durchgeführt
werden (Parameter "User=", "Password=" und "Company="). Damit wird der Befehl nach dem Login
durchgeführt und das Login am WinLine Server auch sofort wieder beendet. Durch das während des Befehls
durchgeführt Login/Logout gibt es einen Performancenachteil gegenüber einer Aktion mit einer vorhandenen
Session. Wird eine Session und die Login-Informationen übergeben, wird immer die Session verwendet.

➢  User=
Benutzer falls ohne Sessions gearbeitet wird

Achtung
Der Benutzer muss in der WinLine angelegt und als EWL-Benutzer definiert sein.

➢  Password=
Passwort, falls ohne Sessions gearbeitet wird

➢  Company=
Mandant, falls ohne Sessions gearbeitet wird

➢  CompanyYear=
Angabe des Wirtschaftsjahrs (optional)
Mit diesem Parameter kann das Wirtschaftsjahr angegeben werden, das in der Session verwendet werden
soll. Dabei muss das WJ so angegeben werden, wie es die Anzeige in der WJ-Auswahllistbox dargestellt wird
z.B. 2021 für das WJ 1-12/2021 oder 2021(5) für das WJ 5/2021 bis 4/2022. Wird kein "CompanyYear" mit
angegeben, wird das aktuellste Wirtschaftsjahr verwendet.

➢  Type=
Typ der Vorlage, dabei werden folgende Werte unterstützt:

✓
✓
✓
✓
✓
✓
✓
✓
✓
✓
✓
✓
✓

1= Personenkonten
2 = Sachkonten
3 = Interessenten
4 = Artikel
5 = Preise
6 = Arbeitnehmer A
7 = Kontakte
8 = Anlagen
9 = Kostenstellen
10 = Kostenarten
11 = Kostenträger
15 = Projekte
17 = Bankverbindungen

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 18

✓
✓
✓
✓
✓
✓
✓
✓
✓
✓
✓
✓

19 = Lagerort - Zuordnung
20 = Mitarbeiter
30 = Belege
31 = Buchungsstapel
34 = CRM
36 = Fehlzeitenerfassung A (WinLine SMART TIME)
38 = Lagerbuchungen
39 = Kommissionierung
40 = Produktionsauftrag
41 = Inventur
42 = PPS Zeiten
50 = FORM Datenquellen

➢  Vorlage=
Name der Vorlage

➢  Key=
Schlüsselwert des zu exportierenden Stammsatzes
Je nach Typ werden unterschiedliche Keys gefordert. Eine Übersicht ist dem nachfolgenden Kapitelbereich
"Export - Key" zu entnehmen.

Hinweis

Damit beim Parameter "Key" mehrere Datensätze angegeben werden können, muss in der Datei
"server.config" im EWL-Verzeichnis der Eintrag "AllowWhereStatementInWebService=1" hinzugefügt
werden. Dann können bei "Key=" mehrere Datensätze in der Form 'Nummer1', 'Nummer2' und 'Nummer3'
angegeben werden.

➢  Format=
Format des Ergebnisses
Der Parameter Format kann nur den Wert 1 haben und bedeutet, dass das XML im UTF8 Format
ausgegeben wird.

➢  byref=
Ergebnis in eine Datei am Server
Mit byref=1 kann die Ausgabe in eine Datei auf dem Server erfolgen, wobei dem Browser nur der Link auf
diese Datei zurückgegeben wird.

➢  data=
Wird mit Data kein Dateiname angegeben, wird ein temporärer Name generiert, mit dem die Datei im Temp-
Verzeichnis des WinLine Servers erzeugt wird. Wird ein Name übergeben, wird die Datei im CWL
Serververzeichnis erzeugt. In diesem Fall wird als Ergebnis im Browser nur angezeigt, dass die Datei erzeugt
wurde. Bei Verwendung eines temporären Namens wird der Inhalt der erzeugten XML-Datei im Browser
angezeigt. Wird byref nicht verwendet, wird das Ergebnis als XML im Browser ausgegeben (ohne dass eine
Datei am Server erzeugt wird).

Interaktiver Export

Um die Verwendung einfach demonstrieren zu können, kann das folgende HTML verwendet werden:

<HTML>
<HEAD>
<META HTTP-EQUIV="Content-type" CONTENT="text/html; charset=UTF-8">
<TITLE>Testseite</TITLE>
<BODY >
<form method="POST" action="http://<WinLineServer>/ewlservice/export" id=form1
name=form1>

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 19

<input type='hidden' id='user' name='user' value='a'>
<input type='hidden' id='password' name='password' value='b'>
Mandant:<input type='text' id='company' name='company' value='300M'><br>
<input type='hidden' id='type' name='type' value='1'>
<input type='hidden' id='format' name='format' value='1'>
Vorlage:<input type='text' id='Vorlage' name='vorlage' value='Vorlagenname'><br>
Kontonummer:<input type='text' id='Key' name='key' value='230A001'><br>
<input type='submit'>

</form>
</BODY>
</HTML>

Nach Aufruf des Formulars mit einem HTML - Browser, kann mit der Eingabe von Mandant und
Kontonummer (auch mehrere getrennt durch Beistriche) der jeweilige Datensatz (die Sätze) exportiert
werden.

Hinweis
Der Benutzer "a", das Passwort "b" und der Typ "1" sind im Formular versteckt angegeben; der Servername
muss entsprechend angepasst werden.

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 20

3.5.1.  Export - Key - Allgemein

Je nach Typ werden unterschiedliche Angaben für den Bereich "Key" benötigt. Neben der direkten Key-
Angabe kann für die Typen "01 - 17" + "41") auch ein Filter genutzt werden.
Hierfür muss der Filter für den entsprechenden Vorlagentyp zunächst im EXIM (WinLine START - Vorlagen -
EXIM) angelegt werden.

Syntax
Filterxxx

➢  Filter
Angabe des Filternamens

Beispiel
Es wurde für den Typ "Personenkonten" ein Filter mit dem Namen "TopKunden" angelegt. Durch den Key
"FilterTopKunden" (ohne "") wird der Filter bei dem Export verwendet.

3.5.2.  Export - Key - 01 - Personenkonten

Als Key dient die Nummer des Personenkontos. Zusätzlich dazu kann in einem Where-Statement auf
spezifische Felder abgefragt werden, wobei hier die Tabellen T051, T054, T055 und T058 zur Verfügung
stehen. Damit können dann Suchabfragen oder dergleichen durchgeführt werden, wobei das Ergebnis auch
wieder als XML zurückgegeben wird.

Beispiele
✓

http://<WinLineServer>/ewlservice/export?User=a&password=b&company=300M&Type=1
&Vorlage=Suche&Key=where T055.C003 Like '%%sport%%'&Format=1&byref=1

Es werden alle Konten angezeigt, wo im Namen (T055.C003) der Begriff "Sport" vorkommt

✓

✓

http://<WinLineServer>/ewlservice/export?User=a&password=b&company=300M&Type=1
&Vorlage=Suche&Key=where T058.C022 Like 'DE81%%' and T055.C004 =
2&Format=1&byref=1

Es werden alle Kunden (T055.C004 = 2) angezeigt, wo die UID-Nummer (T058.C022) mit "DE81"
beginnt.

http://<WinLineServer>/ewlservice/export?User=a&password=b&company=300M&Type=1
&Vorlage=Suche&Key=where T051.C240 = '47110815'&Format=1&byref=1

Es werden die Konten angezeigt, wo die Firmenbuchnummer (T051.C240) gleich 47110815
hinterlegt ist.

3.5.3.  Export - Key - 02 - Sachkonten

Als Key dient die Nummer des Sachkontos.

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 21

3.5.4.  Export - Key - 03 - Interessenten

Als Key dient die Nummer des Interessenten.

3.5.5.  Export - Key - 04 - Artikel

Als Key dient die Nummer des Artikels.

3.5.6.  Export - Key - 05 - Preise

Als Key dient die Nummer des Artikels.

3.5.7.  Export - Key - 06 - Arbeitnehmer A

Als Key dient der "AN-Key" des Arbeitnehmers. Zusätzlich dazu kann in einem Where-Statement auf
spezifische Felder der Tabelle T045 abgefragt werden. Damit können Suchabfragen oder dergleichen
durchgeführt werden, wobei das Ergebnis auch wieder als XML zurückgegeben wird.

Beispiele
✓

http://<WinLineServer>/ewlservice/export?User=a&password=b&company=300M&Type=7
&Vorlage=Suche&Key=where T045.C001 = 'Müller'&Format=1&byref=1

Es werden alle Ansprechpartner/Kontakte angezeigt, wo der Name (T045.C001) gleich Müller ist.

✓

http://<WinLineServer>/ewlservice/export?User=a&password=b&company=300M&Type=7
&Vorlage=Suche&Key=where T045.C039 = '230A001'&Format=1&byref=1

Es werden alle Ansprechpartner des Kunden 230A001 (T045.C039) angezeigt.

3.5.8.  Export - Key - 07 - Kontakte

Als Key dient der Nachname des Kontakts.

3.5.9.  Export - Key - 08 - Anlage

Als Key dient die Nummer der Anlage.

3.5.10.  Export - Key - 09 - Kostenstelle

Als Key dient die Nummer der Kostenstelle.

3.5.11.  Export - Key - 10 - Kostenart

Als Key dient die Nummer der Kostenart.

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 22

3.5.12.  Export - Key - 11 - Kostenträger

Als Key dient die Nummer des Kostenträgers.

3.5.13.  Export - Key - 15 - Projekte

Als Key dient die Nummer des Projekts.

3.5.14.  Export - Key - 17 - Bankverbindungen

Als Key dient die Nummer des Personenkontos.

3.5.15.  Export - Key - 19 - Lagerort - Zuordnung

Als Key dient die Nummer des Artikels oder der Artikeluntergruppe.

3.5.16.  Export - Key - 20 - Mitarbeiter

Als Key dient die Mitarbeiternummer.

3.5.17.  Export - Key - 30 - Belege

Für den Export von Belegen muss der Key in Form "Kontonummer-Laufnummer" angegeben werden. Wenn
mehrere Belege ausgewählt werden sollen, so müssen diese extra angeführt werden und zwar in der Form
'Kontonummer-Laufnummer', ' Kontonummer-Laufnummer', ' Kontonummer-Laufnummer', etc. (z.B.
'230A001-247', '230B001-47', '230C001-11').

3.5.18.  Export - Key - 31 - Buchungsstapel

Für den Export eines Buchungsstapels kann die Stapelnummer eingetragen werden. Alternativ kann der
Export aus dem FIBU-Journal erfolgen, die Buchungen können dabei nach Buchungsnummer und Periode
selektiert werden. Die nachfolgenden Angaben werden entsprechend geprüft und ungültige Selektionen mit
einer Fehlermeldung abgewiesen.

Syntax

[Jxxx[-yyy]][Paa[-bb]][A]

➢  J
Buchungsnummer von / bis

➢  P
Periode von / bis

➢  A
Es wird die Exportoption "Automatikbuchungen unterdrücken" berücksichtigt.

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 23

Beispiele - gültige Selektion
✓
✓
✓
✓

=>  Buchungsnummer 100 wird selektiert
=>  Buchungsnummern 100 bis 150 werden selektiert

J100
J100-150
J100-150P1-2 =>  Buchungsnummern 100 bis 150 der Periode 1 bis 2 werden selektiert
J100A

=>  Buchungsnummer 100 wird selektiert, Automatikbuchungen werden

✓

P3

=>  alle Buchungen der Periode 3 werden selektiert

  unterdrückt

Beispiele - ungültige Selektionen
✓
✓
✓

J-100
P100
A

=>  ungültige Selektion!
=>  ungültige Selektion! (Periode ist unbekannt)
=>  ungültige Selektion! (Option kann nur in Verbindung mit einer Selektion

✓

J100-105X   =>  ungültige Selektion! (nur Ziffern, das "-" und die obenstehenden

Buchstabendürfen bzw. die Option "A" dürfen verwendet werden)

verwendet werden)

3.5.19.  Export - Key - 34 - CRM

Als Key kann entweder die Workflow-Nummer oder der Aktionsschritt (mit negativen Vorzeichen) ausgewählt
werden.

Beispiele
✓

100, 101, 102  =>  gibt die Workflows 100, 101, und 102 aus, wobei jeweils alle Schritte

✓

berücksichtigt werden
-100, -101, -102  =>  gibt die Aktionsschritte 100, 101 und 102 aus

3.5.20.  Export - Key - 36 - Fehlzeitenerfassung A (WinLine SMART TIME)

Der Key kann unterschiedlichen Parametern zusammengesetzt werden, wobei folgende Parameter zur
Verfügung stehen, wobei die Parameter jeweils mit ' getrennt werden:

✓
✓
✓
✓
✓
✓
✓
✓
✓
✓

AF = Arbeitnehmer von
AT = Arbeitnehmer bis
BF = Betrieb von
BT = Betrieb bis
DF = Datum von
DT = Datum bis
F1 = Fehlzeiten
S1 = Sollzeiten
I1 = Istzeiten
P1 = Pause

Beispiel
✓

'AF1'AT2'DF01-01-2021'DT31-01-2021'F1'S1'I1
Es werden alle Fehl-, Soll- und Istzeiten der AN 1 bis 2 vom Datum 01.01.2021 bis 31.01.2021
exportiert.

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 24

3.5.21.  Export - Key - 38 - Lagerbuchungen

Die Lagerbuchungszeilen können nach Buchungsnummer und Periode selektiert ausgegeben werden, wobei
die Syntax zu beachten ist. Die nachfolgenden Angaben werden entsprechend geprüft und ungültige
Selektionen mit einer Fehlermeldung abgewiesen

Syntax
[Jxxx[-yyy]][Paa[-bb]]MCHANGE

➢  J
Buchungsnummer von / bis

➢  P
Periode von / bis
➢  MCHANGE
Handelt es sich bei dem Artikel der Buchungszeile um einen Menge2-Artikel, so kann mit Hilfe des
Parameters "MCHANGE" das Feld "Menge" mit der Rückstandsmenge und das Feld "Menge2" mit der Nicht-
Rückstandsmenge belegt werden, d.h. die Felder werden so gefüllt, wie sie ursprünglich auch erfasst
wurden. Das Feld "Menge2" muss hierfür einen Wert ungleich 0 aufweisen.

Beispiele - gültige Selektion
✓
J100-150P1-2
✓
J100-150
✓
J100-150MCHANGE  =>  Buchungsnummern 100 bis 150 werden selektiert und dabei die

=>  Buchungsnummer 100 bis 150 und Periode 1 bis 2 wird selektiert
=>  Buchungsnummern 100 bis 150 werden selektiert

Option "Rückstandsmenge bei Menge2-Artikeln verwenden" angewendet

✓
✓

J100
P3

=>  Buchungsnummer 100 wird selektiert
=>  alle Buchungen der Periode 3 werden selektiert

Beispiele - ungültige Selektion
✓
✓
✓
✓

J-100
P100
J100MCHAN
J100-105X

=>  ungültige Selektion!
=>  ungültige Selektion! (Periode 100 unbekannt)
=>  ungültige Selektion! (Option "MCHAN" ist nicht bekannt)
=>  ungültige Selektion! (nur Ziffern, das "-" und die obenstehenden

Buchstabendürfen bzw. die Option "MCHANGE" dürfen verwendet
werden)

3.5.22.  Export - Key - 39 - Kommissionierung

Für den Export von Kommissionierungsdaten muss der Key in Form "Kontonummer-Laufnummer"
angegeben werden. Wenn mehrere Aufträge ausgewählt werden sollen, so müssen diese extra angeführt
werden und zwar in der Form 'Kontonummer-Laufnummer', ' Kontonummer-Laufnummer', ' Kontonummer-
Laufnummer', etc. (z.B. '230A001-247', '230B001-47', '230C001-11').

3.5.23.  Export - Key - 40 - Produktion

Für den Export von Produktionsdaten gibt es 2 Key-Varianten, wobei eine erste ab Version 11 verwendet
werden kann.

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 25

Exportparameter-Norm gültig bis inkl. Version 10.5
Diese Norm kann auch noch in Version 11.0 und höher verwendet werden. Als Key dient der
Produktionsauftrag, der Arbeitsschritt (optional) und ein Kennzeichen (optional), wobei die einzelnen
Elemente mit einem "+" getrennt werden. Folgende Kennzeichen stehen hierbei zur Verfügung:

✓
✓
✓
✓
✓
✓
✓

0 - gewählter Arbeitsschritt und seine Komponenten
1 - nur die Komponenten vom gewählten Arbeitsschritt
2 - nur der Arbeitsschritt
3 - nur die Komponenten vom gewählten Arbeitsschritt inkl. Subebenen
4 - gewählter Arbeitsschritt und seine Komponenten inkl. Subebenen
10 - 14 wie 0 - 4 - allerdings kommen nur die AS
20 - 24 wie 0 - 4 - allerdings kommen nur Komponenten

Beispiele
✓

LAGER4711

LAGER4711+2

✓

✓

=> der gesamte Produktionsauftrag LAGER4711 wird ausgegeben (alle
 Produktionsartikel und Materialzeilen) identisch mit "LAGER4711+0+0"
=> vom Produktionsauftrag LAGER4711 wird nur der Arbeitsschritt 2
 ausgegeben identisch mit LAGER4711+2+0

LAGER4711+2+1  => vom Produktionsauftrag LAGER4711 / Arbeitsschritt 2 werden die

 Komponenten ausgegeben

Exportparameter-Norm gültig ab Version 11
Als Key können bei dieser Norm vordefinierte Parameter zur Selektion genutzt werden. Die Parameter
starten immer mit einem "+", wobei die erste Parameterangabe zusätzlich mit "++" anfangen muss (d.h. die
erste Angabe beginnt in der Regel mit "+++")!

Syntax (ohne Leerzeichen)
++P=S

➢  ++
Die Key-Syntax muss mit "++" beginnen. Danach folgenden nacheinander die Angabe von Parameter und
Selektion. Hierbei können auch mehrere "Parameter / Selektion"-Pärchen angegeben werden.

➢  P
Hinterlegung des Parameters für welchen eine Selektion erfolgen soll. Es können die folgenden Parameter
angegeben werden:

✓
✓

✓
✓

✓
✓

✓

✓
✓
✓

+T324C002 = Produktionsauftragsnummer
+T324C021 = Arbeitsschritt
Kann nur 1x angegeben werden (d.h. kein "Von / Bis"). Auch wenn Produktionsaufträge mit "Von /
Bis" angegeben werden, so kann dieser Parameter nur mit einem Produktionsauftrag gesetzt
werden. Ist der Produktionsauftrag nicht gesetzt, so wird dieser Parameter nicht berücksichtigt.
+T324C004 = Artikelnummer
+T324C015 = Datum
Der Datumswert ist mit Format "TT-MM-JJJJ" anzugeben!
+T324C023 = Kundenkontonummer
+T324C033 = Produktionstyp
Kann nur 1x angegeben werden (d.h. kein "Von / Bis").
+T324C037 = Belegdruckstatus
Kann nur 1x angegeben werden (d.h. kein "Von / Bis").
+T324C066 = Stapelnummer
+T324.C085 = Positionstext
+T324.C085 = Positionsnummer

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 26

✓

✓

✓

✓

✓

+T324ORDERxy
Mit dieser Option kann die Standard-Sortierung angewendet werden, welche auch im Programm in
den Comboboxen verwendet wird (z.B. in den Auswertungsfenster "Stücklisten",
"Materialentnahmeschein", etc.). Hier übergibt man an der ersten Stelle die Sortierung…
✓
✓
✓
✓
✓

0 - Reihenfolge
1 - Artikel
6 - Priorität
7 - Positionsnummer
8 - Positionstext

… und die zweite Stelle (optional) bestimmt die Richtung an:

✓
✓

0 - Aufsteigend
1 - Absteigend

+C037MATS = Combobox-Value "Druckstatus Materialentnahmeschein"
Es können die folgenden Werte angegeben werden, wobei diese den Parameter T324C037
übersteuern:

✓
✓
✓

0 - Alle
1 - muss
2 - darf nicht

+C037AS = Combobox-Value "Druckstatus Arbeitsschein"
Es können die folgenden Werte angegeben werden, wobei diese den Parameter T324C037
übersteuern:

✓
✓
✓

0 - Alle
1 - muss
2 - darf nicht

+QUERY = Query-Statement
Es ist nur eine Angabe möglich - ohne WHERE oder AND, z.B. "+++QUERYC002 LIKE
'190053%'+FLAG0"

+FLAG
Über den Flag wird gesteuert, welche Art von Daten exportiert werden sollen (abhängig vom
Vorlagentyp), wobei nur eine Angabe möglich ist.
Hierbei können die folgende Flagwerte angegeben werden, abhängig davon, ob ein Arbeitsschritt
beim Export angeben wurde:

✓
✓
✓
✓
✓
✓
✓

0 - gewählter Arbeitsschritt und seine Komponenten
1 - nur die Komponenten vom gewählten Arbeitsschritt
2 - nur der Arbeitsschritt
3 - gewählter Arbeitsschritt und seine Komponenten inkl. Subebenen
4 - gewählter Arbeitsschritt und seine Komponenten inkl. Subebenen
10 - 14 wie 0 - 4 allerdings werden nur die Arbeitsschritte exportiert
20 - 24 wie 0 - 4 allerdings werden nur die Komponente exportiert

Wurde kein Arbeitsschritt angegeben, so wirken die Flagwerte wie folgt:

✓
✓
✓

0 - Ausgabe aller Zeiten
1 - nur Komponenten (ohne Arbeitsschritte)
2 - nur Arbeitsschritte

➢  S
Angabe des Selektionswertes.
WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 27

Beispiele
Die Syntax könnte wie folgt aussehen, wobei noch zu beachten ist, dass manche Parametervorläufe zweimal
angegeben werden können, wonach der gesamte Parameter als "Von / Bis" interpretiert wird.
✓

+++T324C002=25343
Dieser Parameter setzt eine Einschränkung auf Records in T324 mit der
Produktionsauftragsnummer = 25343.
+++T324C002=25343+T324C002=25346
Diese Parameterangabe gibt eine Einschränkung auf Records in T324 mit der
Produktionsauftragsnummer von "25343 bis 25346" an.
+++T324C002Lager1478+ORDERBYC086 DESC
Über diese Parameterangabe werden die Komponenten des Produktionsauftrags Lager1478
absteigend nach der Positionsnummer exportiert.
+++T324C002Lager4792+T324ORDER11
Der Produktionsauftrag "Lager4792" wird nach Artikel absteigend sortiert ausgegeben. Hinter dem
Order erfolgt keine Angabe, so wird die Standardsortierung vorgenommen, was dem
+T324ORDER00 entspricht.

✓

✓

✓

Beispiel - Flags
✓

http://<WinLineServer>/ewlservice/export?user=a&Password=b&Company=300M&Type=40
&Vorlage=Vorlagename&Format=1&byref=1&Data=exportDatei.xml&Key=+++T324C002255
01+T324C0215+Flag1

Mit diesen Parametern werden die Komponenten für Arbeitsschritt 5 vom Produktionsauftrag 25501
in eine xml-Datei exportiert.

✓

http://<WinLineServer>/ewlservice/export?user=a&Password=b&Company=300M&Type=4
0&Vorlage=Vorlagename&Format=1&byref=1&Data=exportDatei.xml&Key=+++T324C02323
0a001+T324c00419001+Flag1

Mit diesen Parametern wird Artikel 19001 aus Produktionsaufträgen für Kundenkonto 230A001 in
eine xml-Datei exportiert.

Beispiel für den Export von einem Arbeitsschritt aus einem Produktionsauftrag
http://<WinLineServer>/ewlservice/export?User=a&password=b&company=300M&Type=40&Vorlage
=prodauftragexport&Format=1&byref=1&Data=Auftrag25444.xml&Key=25444+1+2

✓

✓

✓

✓

✓

Type=40
Dieses gibt den Vorlagentyp an.
Vorlage=prodauftragexport
Es wird die Vorlage "prodauftragexport" verwendet, die auch vorhanden sein muss.
Data= Auftrag25444.xml
Da keine weitere Verzeichnisangabe erfolgt, wird die Datei "Auftrag25444.xml" im WinLine-Server-
Verzeichnis erzeugt.
byref=1
Die Daten werden als Datei übergeben.
Key= 25444+1+2
Die Arbeitsschrittnummer 1 mit Flag "2 nur Arbeitsschritt" wird für Produktionsauftragsnummer
25444 exportiert (Exportparameter-Norm gültig bis inkl. Version 10.5)

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 28

3.5.24.  Export - Key - 41 - Inventur

Als Key dient die Nummer eines Artikels oder eine zuvor definiert Zählliste.

Syntax - Zählliste
Zaehllistexxx

➢  Zaehlliste
Angabe der Zählliste

Beispiel
Es wurde eine Zählliste mit dem Namen "Schnelldreher" angelegt. Durch die Eingabe
"ZaehllisteSchnelldreher" (ohne "") wird die Zählliste bei dem Export verwendet.

3.5.25.  Export - Key - 42 - PPS Zeiten

Als Key können vordefinierte Parameter zur Selektion genutzt werden. Die Parameter starten immer mit
einem "+", wobei die erste Parameterangabe zusätzlich mit "++" anfangen muss (d.h. die erste Angabe
beginnt in der Regel mit "+++")!

Syntax (ohne Leerzeichen)
++P=S

➢  ++
Die Key-Syntax muss mit "++" beginnen. Danach folgenden nacheinander die Angabe von Parameter und
Selektion. Hierbei können auch mehrere "Parameter / Selektion"-Pärchen angegeben werden.

➢  P
Hinterlegung des Parameters für welchen eine Selektion erfolgen soll. Es können die folgenden Parameter
angegeben werden:

✓
✓

✓
✓

✓
✓
✓

✓

+T160C007= Produktionsauftragsnummer
+T160C003 = Datum
Der Datumswert ist mit Format "TT-MM-JJJJ" anzugeben!
+T160C024 = Stapelnummer
+T160C034 = Schicht
Kann nur 1x angegeben werden (d.h. kein "Von / Bis").
+T160C011 = Ressource
+T160C015 = Tätigkeit
+QUERY = Query-Statement
Es ist nur eine Angabe möglich - ohne WHERE oder AND, z.B. "+++QUERYC007 LIKE
'LAGER4003%'+FLAG0"
+FLAG
Über den Flag wird gesteuert, welche Art von Daten exportiert werden sollen (abhängig vom
Vorlagentyp), wobei nur eine Angabe möglich ist. Die folgende Werte können angegeben werden:
✓
✓

0 - SOLL-Zeiten
4 - IST-Zeiten

Hinweis
Nur IST-Zeiten, welche noch nicht endgemeldet sind, können exportiert werden.

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 29

➢  S
Angabe des Selektionswertes.

Beispiele - Syntax
Die Syntax könnte wie folgt aussehen, wobei noch zu beachten ist, dass manche Parametervorläufe zweimal
angegeben werden können, wonach der gesamte Parameter als "Von / Bis" interpretiert wird.

✓

✓

+++T160C007=25343
Dieser Parameter setzt eine Einschränkung auf Records in T160 mit Produktionsauftragsnummer =
25343
+++T160C007=25343+T160C007=25346
Dieser Parameter setzt eine Einschränkung auf Zeiten in T160 mit Produktionsauftragsnummer von
25343 auf 25346.

Beispiel - Export von SOLL-Zeiten
✓

http://<WinLineServer>/ewlservice/export?user=a&Password=b&Company=300M&Type=4
2&Vorlage=Sollzeiten&Format=1&byref=1&Data=sollzeiten.xml&Key=+++T160C00725505+T
160c0115-1+T160c00327032020+Flag0

Es erfolgt ein Export von SOLL-Zeiten für Produktionsauftrag 25505, Ressource 5-1, am
27.03.2020.

3.5.26.  Export - Key - 50 - FORM Datenquellen

Wenn im FORM ein Form-Schlüsselobjekt hinterlegt wurde, dann kann dieser Wert als Key übergeben
werden, ansonsten ist der Mesokey aus der Tabelle der Wert, der angegeben werden muss.

3.6.

Import

Dieser Befehl führt den Import aus, wobei die Daten im XML-Format vorhanden sein müssen. Das Ergebnis
des Imports ist wieder im XML-Format.

Syntax
http://<WinLineServer>/ewlservice/import?Session=845743da-94f7-11e1-ccce-4487fc4877d6-3948-
2416&Type=31&Vorlage=Buchen&Data=webservice/mydata.xml&byref=1

Parameter

Der Befehl unterstützt die folgenden Parameter:

➢  Session=
Nummer der Session
Der Befehl kann auch ohne Sessions verwendet werden, dann muss im Befehl das Login durchgeführt
werden (Parameter "User=", "Password=" und "Company="). Damit wird der Befehl nach dem Login
durchgeführt und das Login am WinLine Server auch sofort wieder beendet. Durch das während des Befehls
durchgeführt Login/Logout gibt es einen Performancenachteil gegenüber einer Aktion mit einer vorhandenen
Session. Wird eine Session und die Login-Informationen übergeben, wird immer die Session verwendet.

➢  User=
Benutzer falls ohne Sessions gearbeitet wird

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 30

Achtung
Der Benutzer muss in der WinLine angelegt und als EWL-Benutzer definiert sein.

➢  Password=
Passwort, falls ohne Sessions gearbeitet wird

➢  Company=
Mandant, falls ohne Sessions gearbeitet wird

➢  CompanyYear=
Angabe des Wirtschaftsjahrs (optional)
Mit diesem Parameter kann das Wirtschaftsjahr angegeben werden, das in der Session verwendet werden
soll. Dabei muss das WJ so angegeben werden, wie es die Anzeige in der WJ-Auswahllistbox dargestellt wird
z.B. 2021 für das WJ 1-12/2021 oder 2021(5) für das WJ 5/2021 bis 4/2022. Wird kein "CompanyYear" mit
angegeben, wird das aktuellste Wirtschaftsjahr verwendet.

➢  Type=
Typ der Vorlage, dabei werden folgende Werte unterstützt:

✓
✓
✓
✓
✓
✓
✓
✓
✓
✓
✓
✓
✓
✓
✓
✓
✓
✓
✓
✓
✓
✓
✓
✓
✓

1= Personenkonten
2 = Sachkonten
3 = Interessenten
4 = Artikel
5 = Preise
6 = Arbeitnehmer A
7 = Kontakte
8 = Anlagen
9 = Kostenstellen
10 = Kostenarten
11 = Kostenträger
15 = Projekte
17 = Bankverbindungen
19 = Lagerort - Zuordnung
20 = Mitarbeiterstamm
30 = Belege
31 = Buchungsstapel
34 = CRM
36 = Fehlzeitenerfassung A (WinLine SMART TIME)
38 = Lagerbuchungen
39 = Kommissionierung
40 = Produktionsauftrag
41 = Inventur
42 = PPS-Zeiten
50 = FORM Datenquellen

➢  Vorlage=
Name der Vorlage

➢  Actioncode=
Angabe des Actioncodes (optional)
Als Actioncodes können "0" (nur prüfen) und "1" (importieren - Default) übergeben werden. Bei der Option
"nur Prüfen" passiert im Prinzip exakt dasselbe wie beim Import, allerdings wird vor dem Schreiben der
Records abgebrochen.

Hinweis - Buchungsstapel
WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 31

Bei dem Import von Buchungsstapeln kann auch die Option "2" verwendet werden, wodurch der importierte
Stapel auch gleich gebucht wird.

Hinweis - Produktionsauftrag
Für den Typ "40 - Produktionsauftrag" stehen andere Codes zur Verfügung. Nähere Informationen
entnehmen Sie bitte dem Kapitel "Import - Produktionsauftrag".

➢  Data=
Dateiname der Daten, oder das XML direkt

➢  Format=
Format des Ergebnisses
Der Parameter Format kann nur den Wert 1 haben, und bedeutet, dass das XML im UTF8 Format erwartet
wird.

➢  byref=
Daten sind eine Datei am Server
Mit byref=1 wird in Data nur der Pfad auf die Importdatei übergeben. Dieser Pfad ist relativ zum CWL -
Serververzeichnis. Mit byref=0 müssen die XML-Daten im Data-Parameter übergeben werden (konvertiert in
das Format, das eine URI enthalten kann, d.h. nur Zeichen mit ASCII Werten < 127).

➢  ImportID=
notwendige ID für den Import von Buchungsstapeln (Typ "31 - Buchungsstapel")
Die ImportID wird beim Buchungsstapel-Import verwendet um zu verhindern, dass derselbe Stapel 2x
importiert wird (ImportID wird beim Speichern des Stapels in die T330 geschrieben; bei einem weiteren
Import wird geprüft, ob die ImportID bereits in der T330 vorhanden ist und ggfs. der Import abgebrochen).

Beispiel - Import via WebService-Call
http://<WinLineServer>/ewlservice/import?User=a&Password=b&Company=300M&Type=1&
Vorlage=WEBImport&ActionCode=1&Data=NeueKunden.xml&byref=1

✓

✓

✓

✓

✓

Type=1
Hierdurch erfolgt die Angabe des Vorlagentyps
Vorlage=WEBImport
Es wird die Vorlage "WEBService" verwendet, welche auch vorhanden sein muss.
ActionCode=1
Es erfolgt eine Prüfung der zu importierenden Stammdaten, gefolgt von dem Import der Daten.
Data=NeueKunden.xml
Da keine weitere Verzeichnisangabe erfolgt, wird die Datei "NeueKunden.xml" im WinLineServer-
Verzeichnis erwartet.
byref=1
Die Daten werden als Datei übergeben.

Interaktiver Import
Neben der Übermittlung von Daten via WebService-Syntax kann für eine interaktive Übergabe von XML-
Daten das folgende HTML (Stammdaten - Typ "1") verwendet werden:

<HTML>
<HEAD>
<META HTTP-EQUIV="Content-type" CONTENT="text/html; charset=UTF-8">
<TITLE>Testseite</TITLE>
<BODY >

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 32

<form method="POST" action="http://<WinLineServer>/ewlservice/import" id=form1
name=form1>

<input type='hidden' id='user' name='user' value='a'>
<input type='hidden' id='password' name='password' value='b'>
Mandant:<input type='text' id='company' name='company' value='300M'><br>
<input type='hidden' id='type' name='type' value='1'>
<input type='hidden' id='format' name='format' value='1'>
Vorlage:<input type='text' id='Vorlage' name='vorlage' value='Konten'><br>
Kontonummer:<input type='text' id='Key' name='key' value='230A001'><br>
<input type='hidden' id='ImportID' name='ImportID' value=''>
<textarea id='data' name='data' rows=30 cols=70></textarea><br>
<input type='submit'>

</form>
</BODY>
</HTML>

Nach Aufruf des Formulars mit einem HTML - Browser, kann in das große Eingabefeld der Inhalt der XML-
Datei eingefügt werden, welche zum Server gesendet werden soll.

Hinweis

Der Benutzer "a", das Passwort "b" und der Typ "1" sind im Formular versteckt angegeben; der Servername
muss entsprechend angepasst werden!

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 33

3.6.1.

Import Personenkonten

Damit ein Personenkonto (Debitor oder Kreditor) via WebService neu angelegt werden kann, muss ein
eindeutiger Key - die Kontonummer - vorhanden sein. Dieses Feld ist auch ein Mussfeld und ist daher auch
mit einem Wert zu versorgen.

Nun gibt es mehrere Möglichkeiten, wie eine Kontonummer "vergeben" werden kann:

✓

✓

Nummerneingabe
Es wird eine fixe Nummer im Feld abgestellt. Ist die Kontonummer im Mandanten nicht vorhanden,
wird sie neu angelegt, ist die Kontonummer bereits vorhanden, werden die Daten aktualisiert.

Automatische Nummernvergabe
Es gibt auch die Möglichkeit, die Nummernvergabe automatisch vom System her durchführen zu
lassen, wobei diese Variante nur für die Neuanlage verwendet werden kann.

Bei der automatischen Nummernvergabe gibt es unterschiedliche Varianten, wie das System eine neue
Kontonummer finden kann:

✓

✓

✓

Kontonummer = +
Statt der Kontonummer wird nur ein + eingegeben. In diesem Fall wird geprüft, ob es für
Personenkonten einen Standardnummernkreis gibt. Ist ein Standardnummernkreis vorhanden, wird
dort die nächste freie Nummer herangezogen. Ist kein Standardnummernkreis vorhanden, dann wird
anhand der Kontenvorbelegung (FIBU-Parameter / Kontenbereiche) die nächste freie Nummer
herangezogen.

Kontonummer = Nummernkreis+
Statt der Kontonummer wird der gewünschte Nummernkreis mit einem dahinterstehendem +
eingegeben. In diesem Fall wird dann von der letzten Nummer des Nummernkreises hochgezählt. Ist
der angegebene Nummernkreis nicht vorhanden, kann das Konto nicht angelegt werden.

Kontonummer = Startnummer+
Statt der Kontonummer wird eine Startnummer mit einem dahinterstehendem + angegeben. In
diesem Fall wird dann von der Startnummer ausgehend die nächste freie Nummer gesucht.

Hinweis:
Diese Logik der Nummernfindung wird auch beim Import von Interessenten, Artikel, Sachkonten,
Arbeitnehmer, Kontakte, Anlagen, Kostenstellen, Kostenarten, Kostenträger, Projekte, Mitarbeiter und FORM
Datenquellen unterstützt, wobei die Logik mit dem Nummernkreis nur dort funktioniert, wo auch
Nummernkreise definiert werden können.

3.6.2.

Import - Kontakte

Hinweis zum Importieren von Kontakten
Das Inaktiv-Kennzeichen im Kontaktestamm ist ein Datumsfeld. Datumsfelder können via XML ganz normal
importiert werden, wodurch dann ein Kontakt auf "Inaktiv" gesetzt wird. Bei einem XML-Import können aber
keine leeren Datumsfelder importiert werden, d.h. via XML kann kein Kontakt von Inaktiv auf Aktiv gesetzt
werden. Um das doch zu ermöglichen, kann das Datum mit dem Wert "31.12.2999" (im jeweils gültigen
Datumsformat) beschickt werden, dann erkennt das Programm, dass in dem Fall beim Kontakt das Inaktiv-
Kennzeichen deaktiviert werden soll.

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 34

3.6.3.

Import - Belege

In der XML-Datei für den Belegimport werden folgende Optionen/Attribute zusätzlich unterstützt:

➢  option=""
Über das Attribut option= kann gesteuert werden, wie der Beleg in der WinLine behandelt werden soll,
wobei es folgende Möglichkeiten gibt:

✓
✓
✓
✓
✓
✓

0 - neuen Beleg erstellen
1 - Lieferschein zu Auftragsbestätigung
2 - Rechnung zu Lieferschein
3 - Beleg editieren
4 - Beleg stornieren
5 - Lieferschein editieren

Hinweise:
Wenn Belege "bearbeitet" werden sollen (Lieferschein zu Auftrag oder Beleg editieren), sollte in der Vorlage
das Feld "Zeilennummer (intern)" vorhanden sein, damit eine eindeutige Zuordnung der Artikel- und auch
Textzeilen erfolgen kann.
Wenn beim "Belege editieren" auch Zeilen gelöscht werden sollen, so muss zusätzlich noch das Feld "Zeile
entfernen" vorhanden sein, wo dann das Kennzeichen 0/1 bzw. false/true gesetzt werden muss.
Wenn ein gedruckter Auftrag editiert werden soll, so muss in der Vorlage das Feld "Menge bestellt"
verwendet werden, das Pflichtfeld "Menge geliefert" wird in diesem Fall ignoriert.

➢  extInsert=""
Mit dieser Option gibt es die Möglichkeit beim Import von Ausprägungen den Haupt- bzw. Zwischenartikel
für Ausprägungen einzufügen. Folgende Optionen stehen zur Verfügung:

✓

✓

✓

0 - Hauptartikel nicht einfügen
Beim Import werden die Ausprägungen als eigene Artikelzeilen eingefügt.
1 - Hauptartikel einfügen
In der Importdatei sind nur die Ausprägungsartikel vorhanden. Mit dieser Option wird der
Hauptartikel zusätzlich automatisch eingefügt.
2 - Hauptartikel und Zwischenartikel einfügen
In der Importdatei sind nur die Ausprägungsartikel vorhanden. Mit dieser Option werden der
Hauptartikel und alle möglichen Zwischenartikel zusätzlich automatisch eingefügt.
✓

Bei Artikel mit 2 Ausprägungen wird als Zwischenartikel der Artikel mit Ausprägung1
eingefügt.
Bei Artikel mit 1 Ausprägung und Charge/Ident wird als Zwischenartikel der Artikel mit
Ausprägung1 eingefügt.
Bei Artikel mit 2 Ausprägungen und Charge/Ident werden als Zwischenartikel der Artikel
mit Ausprägung1 und der Artikel mit Ausprägung1 und Ausprägung2 eingefügt.

✓

✓

➢  amount=""
Mit Hilfe des Attributs amount= kann die Liefermengen-Option definiert werden.

✓
✓
✓

0 - lt. Belegart
1 - auf 0 setzen
2 - nur importierte Zeilen drucken

➢  extEntry=""
Dieses Attribut steuert die Option "Ausprägungen anlegen". Dabei gibt es folgende Möglichkeiten:

✓

extEntry ="0"
Die 0 steht für "Nein", d.h. wenn in der Import-Datei eine Ausprägung vorhanden ist, die im
Artikelstamm nicht vorkommt, so wird der Import mit einem Fehler abgebrochen.

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 35

✓

✓

extEntry = "1"
Die 1 steht für "Ja, wenn nicht vorhanden", d.h. wenn in der Import-Datei eine Ausprägung
vorhanden ist, die im Artikelstamm nicht vorkommt, so wird die Ausprägung entsprechend
angelegt.
extEntry = "2"
Die 2 steht für "Chargen immer anlegen (auch wenn vorhanden)", d.h. mit dieser Option werden
Chargen-, FIFO- und LIFO-Artikel immer neu angelegt, auch wenn schon Artikel mit der gleichen
Chargennummer im System vorhanden sind.

➢  printVoucher=""
Damit kann definiert werden, ob und in welcher Stufe ein importierter Beleg gedruckt werden soll. Gültige
Werte sind:

✓
✓
✓
✓
✓

0 - nicht drucken
1 - Angebot
2 - Auftrag
3 - Lieferschein
4 - Rechnung

Dabei sind folgende Punkte zu beachten:

✓

✓
✓

Es können nur Belege gedruckt werden, die in der angegebenen Stufe den Druckstatus M oder A
haben.
Beim Import von Lieferschein zu Auftrag kann der Beleg nur als Lieferschein gedruckt werden.
Beim Import von Rechnung zu Lieferschein kann der Beleg nur als Rechnung gedruckt werden

completedVoucher=""

➢
Diese Option kann nur gesetzt werden, wenn der Parameter "option=" auf 1 (Lieferschein zu Auftrag
importieren) oder 2 (Rechnung zu Lieferschein importieren) gesetzt wurde. Damit kann entschieden werden,
was passieren soll, wenn der Beleg, zu dem die Daten importiert werden sollen, bereits erledigt oder
gelöscht ist. Dabei stehen folgende Optionen zur Verfügung:

✓

✓

0 gelöschte und erledigte Belege als neue Belege importieren
Das ist die Standardeinstellung und mit dieser Option wird dann ein neuer Beleg erstellt.

1 gelöschte und erledigte Belege nicht berücksichtigen
Mit dieser Option wird dann das Erstellen des Beleges nicht durchgeführt und entsprechend
ausgewiesen (in der Bildschirmtabelle oder im Importprotokoll).

➢  ChangeLotSize="1"
Wenn dieses Attribut gesetzt ist, dann wird beim Import von neuen Belegen überprüft, ob im Artikelstamm
eine Losgröße hinterlegt ist. Abhängig von der Einstellung im Artikel bezüglich "Losgrößenverkauf (VK)" wird
dann die importierte Menge geprüft und entsprechend der Einstellung bearbeitet, wobei Warnungen beim
Import nicht protokolliert werden.

Achtung
Bei Verwendung der Optionen/Attribute ist auf die Groß-/Kleinschreibung zu achten, d.h. die Attribute
müssen wie hier beschrieben verwendet werden, sonst kann es zu einer Fehlermeldung kommen.

Hinweis 1
Falls die Optionen / Attribute nicht in der XML-Datei vorhanden sind, so wird für alle oben beschriebenen
Werte 0 angenommen ("ChangeLotSize" wird nicht genutzt).

Hinweis 2
Für Notizfelder wird beim Export die RTF-Formatierung entfernt und der "Plain-Text" exportiert.
Datumsfelder müssen den fixen Aufbau YYYY-MM-DD haben und dürfen auch nicht leer bleiben. Checkboxen
werden als "boolean"-Felder dargestellt und dürfen die Werte "true", "false", "0" und "1" enthalten.

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 36

Wenn der Import inkl. Belegdruck erfolgreich durchgeführt wurde, wird ein Result zurückgegeben. Dieses
erhält neben der Laufnummer auch die Belegnummer.

Beispiel für ein Result nach Import einer Rechnung:

-<MESOWebServiceResult>

<OverallSuccess>true</OverallSuccess>
-<ResultDetails>

<KeyValue>BELEGKEY: 1</KeyValue>
<VoucherNumber>517</VoucherNumber>
<Success>true</Success>

</ResultDetails>
-<ResultDetails>

<KeyValue>BELEGKEY: 1 - Beleg wurde erfolgreich gedruckt</KeyValue>
<VoucherNumber>FD17-4367</VoucherNumber>
<Success>true</Success>

</ResultDetails>

</MESOWebServiceResult>

Import von Belegzeilen mit Lieferdatum und Uhrzeit

In den FAKT-Parametern kann grundsätzlich eingestellt werden, dass die Datumsspalten in der
Belegerfassung auch mit Uhrzeit erfasst werden können. Damit diese Information auch ex- bzw. importiert
werden kann, muss im ersten Schritt die Vorlage neu gespeichert werden - damit wird der Datentyp so
angepasst, dass auch Datumswerte mit Uhrzeit verarbeitet werden können.

Danach können in der Importdatei Datumswerte mit Uhrzeit erfasst werden, z.B.
<Lieferdatum>2022-06-13T15:30:00</Lieferdatum>.

Beispiel - Import via WebService-Call
http://<WinLineServer>/ewlservice/import?User=a&Password=b&Company=300M&Type=30&
Vorlage=WEBService&ActionCode=0&Data=Beleg230A001-277.xml&byref=1

✓

✓

✓

✓

✓

Type=30
Hierdurch erfolgt die Angabe des Vorlagentyps.
Vorlage=WEBService
Es wird die Vorlage "WEBService" verwendet, welche auch vorhanden sein muss.
ActionCode=0
Es erfolgt nur eine Prüfung, ob die Daten korrekt sind, d.h. es wird kein Import durchgeführt.
Data=Beleg230A001-277.xml
Da keine weitere Verzeichnisangabe erfolgt, wird die Datei "Beleg230A001-277.xml" im
WinLineServer-Verzeichnis erwartet.
byref=1
Die Daten werden als Datei übergeben.

Interaktiver Import
Mit folgendem Beispielcode kann eine interaktive Übergabe erfolgen, wobei in das große Eingabefeld der
Inhalt der XML-Datei, in welcher die Beleginformationen enthalten sind, kopiert werden können.

<HTML>
<HEAD>
<META HTTP-EQUIV="Content-type" CONTENT="text/html; charset=UTF-8">

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 37

<TITLE>Testseite</TITLE>
<BODY >
<form method="POST" action="http://<WinLineServer>/ewlservice/import" id=form1
name=form1>

<input type='hidden' id='user' name='user' value='a'>
<input type='hidden' id='password' name='password' value='b'>
Mandant:<input type='text' id='company' name='company' value='300M'><br>
0=Check,1=Import:<input type='integer' id='Actioncode' name='Actioncode'
value='1'><br>
<input type='hidden' id='format' name='format' value='1'>
<input type='hidden' id='type' name='type' value='30'>
Vorlage:<input type='text' id='Vorlage' name='vorlage' value='webservice'><br>
<input type='hidden' id='ImportID' name='ImportID' value=''>
<textarea id='data' name='data' rows=30 cols=70></textarea><br>
<input type='submit'>

</form>
</BODY>
</HTML>

Hinweis
Der Benutzer "a", das Passwort "b" und der Typ "1" sind im Formular versteckt angegeben; der Servername
muss entsprechend angepasst werden!

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 38

3.6.4.

Import - CRM

Beispiel - Import via WebService-Call
http://<WinLineServer>/ewlservice/import?User=a&Password=b&Company=300M&Type=34&
Vorlage=WEBCRM&Data=CRMImport.xml&byref=1

✓

✓

✓

✓

Type=34
Hierdurch erfolgt die Angabe des Vorlagentyps.
Vorlage=WEBCRM
Es wird die Vorlage "WEBCRM" verwendet, welche auch vorhanden sein muss.
Data=CRMImport.xml
Da keine weitere Verzeichnisangabe erfolgt, wird die Datei " CRMImport.xml" im WinLineServer-
Verzeichnis erwartet.
byref=1
Die Daten werden als Datei übergeben.

Interaktive Übergabe
Mit folgendem Beispielcode kann eine interaktive Übergabe erfolgen.

<HTML>
<HEAD>
<META HTTP-EQUIV="Content-type" CONTENT="text/html; charset=UTF-8">
<TITLE>Testseite</TITLE>

<style type="text/css">
body, td, input
{

font-family :  Verdana;
font-size :  12px;
color : #333333;
text-decoration: none;

}
</style>

<script type="text/javascript">
function check_and_post_form()
{

xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
xml += "<MESOWebService TemplateType=\"34\" Template=\"EXIMThomas\">";
xml += "<EXIMThomas>";
xml += "<WorkflowNummer>"+ document.getElementById("WorkflowNummer").value

+"</WorkflowNummer>";

xml += "<Zeilennummer>1</Zeilennummer>";
xml += "<ID>0</ID>";
xml += "<Artikel>"+ document.getElementById("Artikel").value

+"</Artikel>";

xml += "<Kundenkonto>"+ document.getElementById("Kundenkonto").value

+"</Kundenkonto>";

xml += "<KontaktKunde>"+ document.getElementById("KontaktKunde").value

+"</KontaktKunde>";

xml += "<Kurzbeschreibung>"+

document.getElementById("Kurzbeschreibung").value +"</Kurzbeschreibung>";

xml += "<Langbeschreibungintern>"+

document.getElementById("Langbeschreibungintern").value
+"</Langbeschreibungintern>";

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 39

xml += "<Langbeschreibungextern>"+

document.getElementById("Langbeschreibungintern").value
+"</Langbeschreibungextern>";

xml += "<Spezifikation>"+ document.getElementById("Spezifikation").value

+"ZF1</Spezifikation>";

xml += "<RMANummer>"+ document.getElementById("RMANummer").value

+"</RMANummer>";

xml += "<Klassifizierung>"+

document.getElementById("Klassifizierung").value +"</Klassifizierung>";

xml += "<Schweregrad>"+ document.getElementById("Schweregrad").value

+"</Schweregrad>";

xml += "</EXIMThomas>";
xml += "</MESOWebService>";

document.getElementById("key").value = ""; // +

document.getElementById("p1").value;

document.getElementById("data").value = xml;
document.form1.submit();

}
</script>

<BODY >

<form  id="values" name="values">

<table border=0>
<tr><td colspan=2 align=center><b>mesonic CRM WebService</b></td></tr>
<tr><td colspan=2 align=center>&nbsp;</td></tr>
<tr><td width=150>WorkflowNummer</td><td>
<select id="WorkflowNummer">
   <option value="100">Anruf</option>
   <option value="101">Aufgabe erstellen</option>
   <option value="102">Termin festlegen</option>
   <option value="103">Notiz</option>
   <option value="104">Warnung</option>
   <option value="105">Faxmitteilung</option>
   <option value="106">Mailversand</option>
   <option value="107">Brief-Korrespondenz</option>
   <option value="108">Serviceaktivitaet</option>
</select>
</td></tr>
<tr><td width=150>Artikel</td><td><input type="text" value=""
id="Artikel"></td></tr>
<tr><td width=150>Kundenkonto</td><td><input type="text" value="230A001"
id="Kundenkonto"></td></tr>
<tr><td width=150>KontaktKunde</td><td><input type="text" value="0"
id="KontaktKunde"></td></tr>
<tr><td width=150>Kurzbeschreibung</td><td><input type="text"
value="Testschritt" id="Kurzbeschreibung"></td></tr>
<tr><td width=150>Langbeschreibungintern</td><td><textarea value=""
id="Langbeschreibungintern"></textarea></td></tr>
<tr><td width=150>Langbeschreibungextern</td><td><textarea value=""
id="Langbeschreibungextern"></textarea></td></tr>
<tr><td width=150>Spezifikation</td><td><input type="text" value="ZF1"
id="Spezifikation"></td></tr>
<tr><td width=150>RMANummer</td><td><input type="text" value="10.00"
id="RMANummer"></td></tr>
<tr><td width=150>Klassifizierung</td><td>
<select id="Klassifizierung">
   <option value="Sehr hoch">Sehr hoch</option>

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 40

   <option value="Hoch">Hoch</option>
   <option value="Normal">Normal</option>
   <option value="Niedrig">Niedrig</option>
   <option value="Sehr niedrig">Sehr niedrig</option>
   <option value="</select>
   <option value="</td></tr>
<tr><td width=150>Schweregrad</td><td>
<select id="Schweregrad">
   <option value="Sehr hoch">Sehr hoch</option>
   <option value="Hoch">Hoch</option>
   <option value="Normal">Normal</option>
   <option value="Niedrig">Niedrig</option>
   <option value="Sehr niedrig">Sehr niedrig</option>
</select>
</td></tr>
<tr><td colspan=2 align=center>&nbsp;</td></tr>
<tr><td align=center>&nbsp;</td><td align=center><input type="button"
value="Save" onClick="javascript: check_and_post_form();" ></td></tr>
</table>

</form>

<form method="POST" action="http://<WinLineServer>/ewlservice/import" id="form1"
name="form1">
<input type="hidden" id="user" name="user" value="a">
<input type="hidden" id="password" name="password" value="b">
<input type="hidden" id="company" name="company" value="300M"><br>
<input type="hidden" id="type" name="type" value="34">
<input type="hidden" id="format" name="format" value="1">
<input type="hidden" id="Vorlage" name="vorlage" value="WEBCRM"><br>
<input type="hidden" id="key" name="key" value="1"><br>
<input type="hidden" id="ImportID" name="ImportID" value="">
<textarea style="display:none;" id="data" value="" name="data"></textarea><br>
</form>
</BODY>
</HTML>

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 41

Hinweis
Der Benutzer "a", das Passwort "b", der Mandant "300M", der Typ "34" und die Vorlage "WEBCRM" sind im
Formular versteckt angegeben; der Servername muss entsprechend angepasst werden!

3.6.5.

Import - Lagerbuchungen

In der XML-Datei für den Lagerbuchungsimport werden folgende Optionen/Attribute zusätzlich unterstützt:

➢  extEntry
Dieses Attribut steuert die Option "Ausprägungen anlegen". Dabei gibt es folgende Möglichkeiten:

✓

✓

✓

extEntry="0"
Die 0 steht für "Nein", d.h. wenn in der Import-Datei eine Ausprägung vorhanden ist, die im
Artikelstamm nicht vorkommt, so wird der Import mit einem Fehler abgebrochen.
extEntry="1"
Die 1 steht für "Ja, wenn nicht vorhanden", d.h. wenn in der Import-Datei eine Ausprägung
vorhanden ist, die im Artikelstamm nicht vorkommt, so wird die Ausprägung entsprechend
angelegt.
extEntry="2"
Die 2 steht für "Chargen immer anlegen (auch wenn vorhanden)", d.h. mit dieser Option werden
Chargen-, FIFO- und LIFO-Artikel immer neu angelegt, auch wenn schon Artikel mit der gleichen
Chargennummer im System vorhanden sind.

➢  checkstorage="1"

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 42

Für Artikel mit hinterlegter Lagerortstruktur kann mit Hilfe dieser Option angegeben werden, ob mögliche
Lagerort-Eigenschaften bzw. Lagerort-Zuordnung geprüft werden sollen. D.h. wird ein Lagerort angegeben,
welcher z.B. lt. Zuordnung verboten ist, so würde der Import bei angegebener Option nicht möglich sein.
Der Eintrag muss dafür in der Datendatei bzw. im Datenstring vorhanden sein (nicht im WebService-Aufruf).

➢  optionTotal=
Mit dieser Option kann gesteuert werden, wie sich das Programm verhalten soll, wenn der Gesamtbetrag in
der Importdatei nicht der Multiplikation aus "Menge * Einzelpreis" entspricht. Dieser Eintrag muss in der
Datendatei bzw. im Datenstring vorhanden sein (nicht im WebService-Aufruf). Dabei gibt es drei mögliche
Varianten:

✓

✓

✓

optionTotal = "1"
Buchungszeilen, bei denen der Gesamtbetrag in der Importdatei nicht mit dem berechneten Betrag
übereinstimmt, werden so gebucht, wie sie in der Importdatei vorhanden sind.
optionTotal = "2"
Buchungszeilen, bei denen der Gesamtbetrag in der Importdatei nicht mit dem berechneten Betrag
übereinstimmt, werden nicht gebucht.
optionTotal = "3"
Buchungszeilen, bei denen der Gesamtbetrag in der Importdatei nicht mit dem berechneten Betrag
übereinstimmt, werden mit dem berechneten Gesamtbetrag gebucht.

Beispiel für den Import von Lagerbuchungszeilen
http://<WinLineServer>/ewlservice/import?User=a&Password=b&Company=300M&Type=38&
Vorlage=Lager&ActionCode=1&Data=Lager.xml&byref=1

✓

✓

✓

✓

✓

Type=38
Hierdurch erfolgt die Angabe des Vorlagentyps.
Vorlage=Lager
Es wird die Vorlage "Lager" verwendet, welche auch vorhanden sein muss.
ActionCode=1
Es erfolgt eine Prüfung der Buchungen, gefolgt von dem Import der Daten.
Data=Lager.xml
Da keine weitere Verzeichnisangabe erfolgt, wird die Datei "Lager.xml" im WinLineServer-
Verzeichnis erwartet.
byref=1
Die Daten werden als Datei übergeben.

3.6.6.

Import - Kommissionierung

Besonderheiten
Beim Import von Kommissionierungen wird nur die Verpackungsart 1 berücksichtigt. Die Folgeverpackungen
2 und 3 werden nicht importiert!

Beispiel für den Import von Kommissionierung
http://<WinLineServer>/ewlservice/import?User=a&Password=b&Company=300M&Type=39&
Vorlage=KOMMIM&Data=Kommissionierungen.xml&byref=1

✓

✓

Type=39
Hierdurch erfolgt die Angabe des Vorlagentyps.
Vorlage=KOMMIM
Es wird die Vorlage "KOMMIM" verwendet, welche auch vorhanden sein muss.

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 43

✓

✓

Data=Kommissionierung.xml
Da keine weitere Verzeichnisangabe erfolgt, wird die Datei " Kommissionierung.xml" im
WinLineServer-Verzeichnis erwartet.
byref=1
Die Daten werden als Datei übergeben.

3.6.7.

Import - Produktionsauftrag

In der XML-Datei für den Produktionsimport wird folgende Option zusätzlich unterstützt:

➢  Actioncode=
Angabe des Actioncodes
Für den Typ "Produktionsauftrag" ist die Angabe eines Codes zwingend erforderlich. Pro Aktionscode gibt es
unterschiedliche "Pflichtfelder", die in der Vorlagedefinition vorhanden sein müssen! Natürlich ist möglich mit
derselben Vorlage die unterschiedlichen Aktionen abhängig vom Aktionscode ausführen zu lassen, dabei
werden dann entsprechende Felder der Vorlage verwendet.

✓

✓

✓

✓

✓

✓

2 - Produktionsauftragsanlage
Vorlagen-Pflichtfelder: Produktionsauftragsnummer, Artikelnummer (=Produktionsartikel),
Produktionsdatum, Auftragsmenge (Produktionsmenge)
3 - Produktionsauftrag löschen
Vorlagen-Pflichtfelder: Produktionsauftragsnummer, Kurzcode (= Arbeitsschrittnummer)
4 - Einfügen von Artikelzeilen
Vorlagen-Pflichtfelder: Produktionsauftragsnummer, JournalKey, Artikelnummer (Rohmaterial),
Auftragsmenge (Produktionsmenge), Produktionsdatum
5 - Einfügen von Artikelzeilen plus Ausgabe des Mat.Scheines (Materialentnahme)
Wie 4 und 6
6 - Ausgabe des Mat.Scheines (Materialentnahme)
Vorlagen-Pflichtfelder: Produktionsauftragsnummer, JournalKey, Journalzeilennummer,
Materialmenge, Auftragsmenge, Produktionsdatum
9 - Schnellendmeldung
Vorlagen-Pflichtfelder: Journalkey, Produktionsauftragsnummer, Ebene, Artikelnummer,
Materialmenge, MengeAuftrag, Produktionsdatum, MengezuProduzieren

Hinweis
Bei dem Journalkey können die letzten 3 Stellen mit 000 belegt sein. In diesem Fall sucht sich die WinLine
die nächste Journalkey-Nummer automatisch.

Beispiel
✓

001-000  => es soll einen Artikel beim Arbeitsschritt 1 (sofern dieser natürlich die   Journalkey-
Nummer 001 hat) hinzugefügt werden

1. Beispiel - Import von Produktionsaufträgen
http://<WinLineServer>/ewlservice/import?User=a&Password=b&Company=300M&Type=40&
Vorlage=Prodauftraganlage&Format=1&byref=1&Data=Auftrag25447.xml&Actioncode=2

✓

✓

✓

✓

Type=40
Hierdurch erfolgt die Angabe des Vorlagentyps.
Vorlage=Prodauftraganlage
Es wird die Vorlage "Prodauftragsanlage" verwendet, welche auch vorhanden sein muss.
Format=1
Die XML-Datei liegt im UTF8-Format vor.
byref=1
Die Daten werden als Datei übergeben.

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 44

✓

✓

Data=Auftrag25447.xml
Da keine weitere Verzeichnisangabe erfolgt, wird die Datei "Auftrag25447.xml" im WinLineServer-
Verzeichnis erwartet.
ActionCode=2
Es wird ein Produktionsauftrag angelegt.

Achtung
Die Importdaten müssen Angaben zu der Produktionsauftragsnummer, der Produktionsartikelnummer, dem
Produktionsdatum und der Auftragsmenge (Produktionsmenge) beinhalten.

1. XML-Datei für den Import von Produktionsaufträgen
<?xml version="1.0" encoding="UTF-8"?><MESOWebService TemplateType="40"
Template="Prodauftraganlage">
<Prodauftraganlage>
<JournalKey>001</JournalKey>
<Produktionsauftragsnummer>25448</Produktionsauftragsnummer>
<Ebene>0</Ebene>
<ArtikelNummer>19005</ArtikelNummer>
<MengeAuftrag>11.00</MengeAuftrag>
<Produktionsdatum>2017-08-13</Produktionsdatum>
</Prodauftraganlage>
</MESOWebService>

2. Beispiel - Löschen von Produktionsaufträgen per Import
http://<WinLineServer>/ewlservice/import?User=a&Password=b&Company=300M&Type=40&
Vorlage=Prodauftragdelete&Format=1&byref=1&Data=Auftrag25447delete.xml&Actioncode=3

✓

✓

✓

✓

✓

✓

Type=40
Hierdurch erfolgt die Angabe des Vorlagentyps.
Vorlage=Prodauftragdelete
Es wird die Vorlage "Prodauftragdelete" verwendet, welche auch vorhanden sein muss.
Format=1
Die XML-Datei liegt im UTF8-Format vor.
byref=1
Die Daten werden als Datei übergeben.
Data=Auftrag25447delete.xml
Da keine weitere Verzeichnisangabe erfolgt, wird die Datei "Auftrag25447delete.xml" im
WinLineServer-Verzeichnis erwartet.
ActionCode=3
Es wird ein Produktionsauftrag gelöscht.

Achtung
Die Importdaten müssen Angaben zu der Produktionsauftragsnummer und der Arbeitsschrittnummer
(Vorlagenfeld "Kurzcode") beinhalten.

2. XML-Datei zum Löschen eines Produktionsauftrages
<?xml version="1.0" encoding="UTF-8"?><MESOWebService TemplateType="40"
Template="Prodauftragdelete">
<Prodauftragdelete>
<JournalKey>001</JournalKey>
<Produktionsauftragsnummer>25446</Produktionsauftragsnummer>
<Kurzcode>1</Kurzcode>

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 45

<Ebene>0</Ebene>
<ArtikelNummer>19003</ArtikelNummer>
/Prodauftragdelete>
</MESOWebService>

3. Besonderheiten beim Import von Materialentnahmen für einen Produktionsauftrag
http://<WinLineServer>/ewlservice/import?User=a&Password=b&Company=300M&Type=40&
Vorlage=Prodauftragentnahme&Format=1&byref=1&Data=Auftrag25444entnahme.xml&
Actioncode=6

✓

✓

✓

✓

✓

✓

Type=40
Hierdurch erfolgt die Angabe des Vorlagentyps.
Vorlage=Prodauftragentnahme
Es wird die Vorlage "Prodauftragentnahme" verwendet, welche auch vorhanden sein muss.
Format=1
Die XML-Datei liegt im UTF8-Format vor.
byref=1
Die Daten werden als Datei übergeben.
Data=Auftrag25447entnahme.xml
Da keine weitere Verzeichnisangabe erfolgt, wird die Datei "Auftrag25447entnahme.xml" im
WinLineServer-Verzeichnis erwartet.
ActionCode=6
Es werden Materialentnahmezeilen für den Produktionsauftrag importiert.

Achtung
Die Importdaten müssen Angaben zu der Produktionsauftragsnummer, der Arbeitsschrittnummer
(Vorlagenfeld "Kurzcode"), die "Journalzeile", die "Materialmenge" (d.h. Entnahmemenge), dem
Produktionsdatum (d.h. Entnahmedatum) und der "Menge Auftrag" (d.h. Produktionsmenge) beinhalten.

3. XML-Datei zum Import von Materialentnahmen
<?xml version="1.0" encoding="UTF-8"?><MESOWebService TemplateType="40"
Template="Prodauftragentnahme">
<Prodauftragentnahme>
<JournalKey>001-003</JournalKey>
<Produktionsauftragsnummer>25444</Produktionsauftragsnummer>
<Ebene>1</Ebene>
<Journalzeile>4</Journalzeile>
<ArtikelNummer>190033</ArtikelNummer>
<MengeAuftrag>3.00</MengeAuftrag>
<Materialmenge>2.00</Materialmenge>
<Produktionsdatum>2017-03-19</Produktionsdatum>
</Prodauftragentnahme>
<Prodauftragentnahme>
<JournalKey>001-004</JournalKey>
<Produktionsauftragsnummer>25444</Produktionsauftragsnummer>
<Ebene>1</Ebene>
<Journalzeile>5</Journalzeile>
<ArtikelNummer>190034</ArtikelNummer>
<MengeAuftrag>3.00</MengeAuftrag>
<Materialmenge>1.00</Materialmenge>
<Produktionsdatum>2017-03-14</Produktionsdatum>
</Prodauftragentnahme>
</MESOWebService>

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 46

4. Import von neuen Artikelzeilen zu einem Produktionsauftrag
http://<WinLineServer>/ewlservice/import?User=a&Password=b&Company=300M&Type=40&
Vorlage=Prodauftraginsert&Format=1&byref=1&Data=Auftrag25444insert.xml&Actioncode=4

✓

✓

✓

✓

✓

✓

Type=40
Hierdurch erfolgt die Angabe des Vorlagentyps.
Vorlage=Prodauftraginsert
Es wird die Vorlage "Prodauftraginsert" verwendet, welche auch vorhanden sein muss.
Format=1
Die XML-Datei liegt im UTF8-Format vor.
byref=1
Die Daten werden als Datei übergeben.
Data=Auftrag25447insert.xml
Da keine weitere Verzeichnisangabe erfolgt, wird die Datei "Auftrag25447insert.xml" im
WinLineServer-Verzeichnis erwartet.
ActionCode=4
Es werden neuen Artikelzeilen in die Stückliste eines Arbeitsschrittes zu einem bestehenden
Produktionsauftrag importiert.

Achtung
Die Importdaten müssen Angaben zu der Produktionsauftragsnummer, der Arbeitsschrittnummer
(Vorlagenfeld "Kurzcode"), dem Journalkey, dem Produktionsdatum und der "Menge Auftrag" (d.h.
Produktionsmenge) beinhalten.

4. XML-Datei zum Import von neuen Artikelzeilen
<?xml version="1.0" encoding="UTF-8"?><MESOWebService TemplateType="40"
Template="Prodauftraginsert">
<Prodauftraginsert>
<JournalKey>001-006-003-000</JournalKey>
<Produktionsauftragsnummer>25445</Produktionsauftragsnummer>
<Ebene>3</Ebene>
<ArtikelNummer>30001</ArtikelNummer>
<MengeAuftrag>16.00</MengeAuftrag>
<Produktionsdatum>2017-07-14</Produktionsdatum>
</Prodauftraginsert>
</MESOWebService>

5. Import der Schnellendmeldung für einen Produktionsauftrag
http://localhost:81/ewlservice/import?User=&Password=b&Company=300M&Type=40&Vorlage=En
dmeldung&Format=1&byref=1&Data=Endmeldung25506.xml&ActionCode=9

✓

✓

✓

✓

✓

✓

Type=40
Hierdurch erfolgt die Angabe des Vorlagentyps.
Vorlage=Endmeldung
Es wird die Vorlage "Endmeldung" verwendet, welche auch vorhanden sein muss und auch als
Webservice-Vorlage aktiviert ist.
Format=1
Die XML-Datei liegt im UTF8-Format vor.
byref=1
Die Daten werden als Datei übergeben.
Data=Endmeldung25506.xml
Da keine weitere Verzeichnisangabe erfolgt, wird die Datei "Endmeldung25506.xml" im
WinLineServer-Verzeichnis erwartet.
ActionCode=9
Es wird der in den xml-Daten angegebene Arbeitsschritt schnellendgemeldet.

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 47

Achtung
Die Importdaten müssen Angaben zu der Produktionsmenge (=Materialmenge), dem Produktionsdatum und
evt. wenn Teilmenge schon endgemeldet wurde, zur bisher produzierten Mengen für den Arbeitsschritt
(Menge zu produzieren).

<?xml version="1.0" encoding="UTF-8"?><MESOWebService TemplateType="40"
Template="Endmeldung"><Endmeldung>
<JournalKey>001-006-003</JournalKey>
<Produktionsauftragsnummer>25506</Produktionsauftragsnummer>
<Ebene>2</Ebene>
<ArtikelNummer>190053</ArtikelNummer>
<Materialmenge>3.00</Materialmenge>
<MengeAuftrag>6.00</MengeAuftrag>
<Produktionsdatum>2020-04-15</Produktionsdatum>
<MengeVomLager>0.00</MengeVomLager>
<MengeZuProduzieren>0.00</MengeZuProduzieren>
<MengeAusschuss>0.00</MengeAusschuss>
</Endmeldung></MESOWebService>

3.6.8.

Import - PPS Zeiten

Per Import können IST-Zeiten erfasst (ActionCode=0) und gelöscht (Actioncode=1) mit Vorlagentyp "42 -
PPS Zeiten" werden. Importierte IST-Zeiten werden stets als Typ "erfasste IST-Zeiten (noch nicht
endgemeldet)" angelegt.

Hinweis
Beim Import von IST-Zeiten für einen bestimmten Arbeitsschritt von einem Produktionsauftrag muss Feld
"Prod.Auftragsnummer od. Projektnummer" bzw. auch "Ebene / AS bei IST-Zeiten" in der Vorlage definiert
und angegeben werden!

1. Beispiel - Import von IST-Zeiterfassung
http://<WinLineServer>/ewlservice/import?user=a&Password=b&Company=300M&Type=42&Vorlag
e=istzeitenimport&Format=1&byref=1&Data=xmlDatei.xml&ActionCode=0

✓

✓

✓

✓

✓

✓

Type=42
Hierdurch erfolgt die Angabe des Vorlagentyps.
Vorlage=Vorlagenname
Eine EXIM-Vorlage vom Typ "PPS Zeiten" muss hier angegeben werden.
Format=1
Die XML-Datei liegt im UTF8-Format vor.
byref=1
Die Daten werden als Datei übergeben.
Data=xml-Dateiname
Da keine weitere Verzeichnisangabe erfolgt, wird die Datei im WinLineServer-Verzeichnis erwartet.
ActionCode=0
Neu IST-Zeiterfassungen können mit ActionCode 0 zu dem Produktionsauftrag und Arbeitsschritt
importiert werden, die in den Importdaten bzw. über die Importvorlage angegeben werden.

XML-Datei für den Import von einer neuen IST-Zeit:

<?xml version="1.0" encoding="UTF-8"?>
<MESOWebService TemplateType="42" Template="istzeitenimport">
<newistzeitenimport>
WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 48

<Typ>10</Typ>
<Prod.Auftragsnummerod.Projektnummer>25504</Prod.Auftragsnummerod.Projektnummer>
<Taetigkeit>Laufband fertigen</Taetigkeit>
<Ressource>1-2</Ressource>
<Datum>2019-10-05</Datum>
<UhrzeitVon>2019-10-05T03:55:00</UhrzeitVon>
<UhrzeitBis>2019-10-05T09:11:00</UhrzeitBis>
<Dauer>0.00</Dauer>
<Schemanummer>-10</Schemanummer>
<SchemaSchichtDatumderAnlage>1</SchemaSchichtDatumderAnlage>
<Einplanungsreihenfolge>0</Einplanungsreihenfolge>
<Produktionsjournalkey>001-006-004-001</Produktionsjournalkey>
<Kalenderwoche>40</Kalenderwoche>
<Dispoflag>3</Dispoflag>
<EbeneASbeiIST-Zeiten>5</EbeneASbeiIST-Zeiten>
</newistzeitenimport>
</MESOWebService>

Hinweis
Über die Angabe der Vorlagen "SchemaSchichtDatumderAnlage" kann gesteuert warden, wie die importierte
IST-Zeit in Bezug auf evt. Vorhandenen SOLL-Zeiten für den Arbeitschritt/Tätigkeit berücksichtigt wird.
Wenn das Feld in der Vorlage bzw. Importdaten vorhanden ist und wenn der Feldwert zur entsprechenden
SOLL-Zeit übereinstimmt, dann wird nur die importierte IST-Zeit bei Import einer Endmeldung gebucht.
Wenn das Feld dagegen nicht mit der IST-Zeit importiert wird, wird die vorhandene SOLL-Zeit als IST-Zeit
beim Import der Endmeldung gebucht, und die importierte IST-Zeit wird zusätzlich auch gebucht.

2. Beispiel - Löschen von IST->Zeiterfassung
Die importierte IST-Zeit aus dem obigen Beispiel kann mit der gleichen xml-Datei mit dem folgenden http-
Call gelöscht werden:

http://<WinLineServer>/ewlservice/import?user=a&Password=b&Company=300M&Type=42&Vorlag
e= istzeitenimport &Format=1&byref=1&Data= xmlDatei.xml&ActionCode=1

3.6.9.

Import - Inventur

In der XML-Datei für den Inventurimport werden folgende Optionen/Attribute zusätzlich unterstützt:

➢  ZListe=
Über das Attribut ZListe= wird die Zählliste angegeben, für welche der Import erfolgen soll.

➢  option=
Über dieses Attribut kann gesteuert werden, ob die Option "Bestehende Erfassungen ergänzen" aktiviert
oder deaktiviert wird:

✓
✓

0 - Option deaktiviert (Standard)
1 - Option aktiviert

inactive=

➢
Über dieses Attribut kann gesteuert werden, ob die Option "inkl. inaktive Artikel" aktiviert oder deaktiviert
wird:

✓
✓

0 - Option deaktiviert (Standard)
1 - Option aktiviert

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 49

Hinweis
Wenn mit Zähllisten gearbeitet wird, so wird die Option über die Definition der Zählliste bestimmt und kann
daher nicht separat eingestellt werden.

Beispiel für den Import von Inventurdaten
http://<WinLineServer>/ewlservice/import?User=a&Password=b&Company=300M&Type=41&
Vorlage=Inventur&ActionCode=1&Data=Inventur.xml&byref=1

✓

✓

✓

✓

✓

Type=41
Hierdurch erfolgt die Angabe des Vorlagentyps
Vorlage=Inventur
Es wird die Vorlage "Lager" verwendet, welche auch vorhanden sein muss.
ActionCode=1
Es erfolgt eine Prüfung der Inventurerfassungen, gefolgt von dem Import der Daten.
Data=Inventur.xml
Da keine weitere Verzeichnisangabe erfolgt, wird die Datei "Inventur.xml" im WinLineServer-
Verzeichnis erwartet.
byref=1
Die Daten werden als Datei übergeben.

XML-Datei für den Import von Inventurdaten (ohne Zählliste)
<?xml version="1.0" encoding="UTF-8"?><MESOWebService TemplateType="41" Template="Inventur"
option="1" inactive="0">
<Inventur>
<Artikelnummer>10017</Artikelnummer>
<Zeilennummer>1</Zeilennummer>
<Inventurdatum>2017-03-03</Inventurdatum>
<Zaehlliste>NULL</Zaehlliste>
<Menge1>5.00</Menge1>
<Menge2>0.00</Menge2>
<Arbeitnehmer>0</Arbeitnehmer>
<Nummer>11</Nummer>
<EAN-Code></EAN-Code>
<RFID></RFID>
<Lagerort1>Köln</Lagerort1>
<Lagerort2>Wareneingang</Lagerort2>
<Lagerort3>Fläche A</Lagerort3>
<Lagerort4></Lagerort4>
<Lagerort5></Lagerort5>
<Lagerort6></Lagerort6>

XML-Datei für den Import von Inventurdaten (mit Zählliste)
<?xml version="1.0" encoding="UTF-8"?><MESOWebService TemplateType="41" Template="Inventur"
ZListe="Schnelldreher" option="1">
<Inventur>
<Artikelnummer>10017</Artikelnummer>
<Zeilennummer>1</Zeilennummer>
<Inventurdatum>2017-03-03</Inventurdatum>
<Zaehlliste>Schnelldreher</Zaehlliste>
<Menge1>5.00</Menge1>
<Menge2>0.00</Menge2>
<Arbeitnehmer>0</Arbeitnehmer>

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 50

<Nummer>11</Nummer>
<EAN-Code></EAN-Code>
<RFID></RFID>
<Lagerort1>Köln</Lagerort1>
<Lagerort2>Wareneingang</Lagerort2>
<Lagerort3>Fläche A</Lagerort3>
<Lagerort4></Lagerort4>
<Lagerort5></Lagerort5>
<Lagerort6></Lagerort6>

3.6.10.  Import - IST-Zeiten (Zeiterfassung)

Beim Import von Zeiterfassungszeilen kann über u.a. über die Vorlage bestimmt werden, wie Zeilen beim
Import behandelt werden sollen (Neuanlage oder Editieren). In diesem Zusammenhang kann mit einer
Option gesteuert werden, wie Meldungen, die dann beim Import erzeugt werden, behandelt werden sollen:

➢  addInfo="X"
Dabei sind drei Optionen möglich:

✓

✓

✓

0 - nicht anzeigen
Beim Import werden in der Importvorschau keine Hinweise nach der Prüfung angezeigt.
1 - anzeigen
Beim Import werden in der Importvorschau nach der Prüfung Hinweise angezeigt. Diese können
sein:

✓
✓
✓
✓

Zeile nicht gefunden -> wird neu angelegt
Mehrfache Zeilen vorhanden -> wird neu eingefügt
Änderung von Datum bis
Änderung von Zeitart

Beim Doppelklick auf die Hinweisspalte wird das Zeitmanagement (ohne Editiermöglichkeit)
aufgerufen, und die betroffene(n) Zeile(n) angezeigt.
Wenn eine Zeile aktualisiert werden soll, die so schon bereits vorhanden ist (gleicher AN/MA,
gleiche Zeitart, gleiche von - bis Datum/Uhrzeit) wird kein Hinweis angezeigt.
2 - anzeigen und drucken
Mit dieser Option werden die Hinweise nicht nur in der Importtabelle angezeigt, sondern auch beim
Importprotokoll mit angedruckt.

3.6.11.  Import - FORM Datenquellen

Wenn eine FORM Datenquelle importiert werden soll, so muss beim Parameter
➢
der Name des FORM angegeben werden, in das die Daten importiert werden sollen.

Vorlage=

Wenn im FORM ein "FORM-Schlüsselobjekt" vorhanden ist, dann kann durch den Import auch eine neue
Nummer vergeben werden, indem im Importfeld der Startwert mit der Endung + angegeben werden, z.B.
78000+ - in diesem Fall wird innerhalb der FORM-Datenquelle der Wert 78000 so lange hochgezählt, bis die
nächste freie Nummer gefunden wird.

Ist in der Datenquelle kein FORM-Schlüsselobjekt vorhanden, dann erfolgt die Nummerierung anhand des
MESOKEY. Da gilt dann: wird die Spalte MESOKEY in den Importdaten übergeben, dann werden vorhandene
Nummern überschrieben, nicht vorhandene Werte werden neu angelegt.

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 51

3.7.  Macro

Dieser Befehl führt ein Makro auf dem Server aus, welche zusätzlichen Parameter übergeben werden
können.

Syntax
http://<WinLineServer>/ewlservice/macro?Session=845743da-94f7-11e1-ccce-4487fc4877d6-3948-
2416&Name=AUDIT&OutputFormat=pdf

Parameter
Der Befehl unterstützt die folgenden Parameter:

➢  Session=
Nummer der Session

➢  User=
Benutzer falls ohne Sessions gearbeitet wird

Achtung
Der Benutzer muss in der WinLine angelegt und als EWL-Benutzer definiert sein.

➢  Password=
Passwort, falls ohne Sessions gearbeitet wird

➢  Company=
Mandant, falls ohne Sessions gearbeitet wird

➢  CompanyYear=
Angabe des Wirtschaftsjahrs (optional)
Mit diesem Parameter kann das Wirtschaftsjahr angegeben werden, das in der Session verwendet werden
soll. Dabei muss das WJ so angegeben werden, wie es die Anzeige in der WJ-Auswahllistbox dargestellt wird
z.B. 2021 für das WJ 1-12/2021 oder 2021(5) für das WJ 5/2021 bis 4/2022. Wird kein "CompanyYear" mit
angegeben, wird das aktuellste Wirtschaftsjahr verwendet.

➢  Name=
Name des Makros

Achtung
Das Makro muss am Server vorhanden sein!

➢  Param<Nr>=
Parameter
Die Parameter, welche an das Makro übergeben werden, haben dort die Indexe ab 20 (0 bis 19 sind die
Systemvariablen). Die Nummer, die hier angegeben wird, bestimmt nur die Reihenfolge der Parameter

Achtung
Es handelt sich um keine numerische Sortierung, also die Nummer am besten mitführender 0 angeben, falls
es mehr als 10 sind oder gleich die Nummern verwenden, welche im Makro verwendet wird (d.h. 20, 21,
etc.).

➢  OutputFormat=
Format des Ergebnisses
Der Parameter OutputFormat=pdf ermöglicht es, die Ausgabe eines PDFs während des Makrolaufs, in ein
Acrobat PDF umzuleiten, und dieses als Ergebnis des WebService Befehls zurückzuerhalten (wie bei

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 52

REPORTS), oder festzulegen, dass das Ergebnis in einer XML-Datei (OutputFormat=xml) zurückgegeben
wird oder ob kein Ergebnis erwartet wird (OutputFormat nicht angegeben).

Beispiel - Ausgabe der CRM-Fallansicht
http://192.168.15.98:50002/ewlservice/macro?User=a&Password=b&Company=300M&
Name=CRM&Param20=10124&OutputFormat=pdf

✓

✓

✓

Name=CRM
Es wird das Makro "CRM" verwendet, welches am Server vorhanden sein muss.
Param20=10124
Es wird der MParameters-Wert 20 mit "10124" gefüllt.

OutputFormat=pdf
Durch das Makro wird das CRM Showcenter geöffnet und die Fallnummer "10124" eingetragen. Die
darauf resultierende Fallansicht soll als PDF-Datei ausgegeben werden.

Macro-Code für Ausgabe der Fallansicht
Sub RunMacro
'

Your macro code

mypara = Mparameters
MApplication 11
MWindow 526, False
MSetFieldFocus 526, 101
MActivateWindow 526
MSetFieldValue 526, 101, mypara(20)
MWindow 652, False
MActivateWindow 652
MSetFieldFocus 526, 500
MPushButton 652, 301, 0
MSetFieldFocus 652, 100

End Sub

3.8.

LIST

Dieser Befehl gibt eine Liste aus.

Syntax
http://<WinLineServer>/ewlservice/LIST?Session=845743da-94f7-11e1-ccce-4487fc4877d6-3948-
2416&Name=kundenumsatz&OutputFormat=pdf

Parameter
Der Befehl unterstützt die folgenden Parameter:

➢  Session=
Nummer der Session

➢  User=
Benutzer falls ohne Sessions gearbeitet wird

Achtung

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 53

Der Benutzer muss in der WinLine angelegt und als EWL-Benutzer definiert sein.

➢  Password=
Passwort, falls ohne Sessions gearbeitet wird

➢  Company=
Mandant, falls ohne Sessions gearbeitet wird

➢  CompanyYear=
Angabe des Wirtschaftsjahrs (optional)
Mit diesem Parameter kann das Wirtschaftsjahr angegeben werden, das in der Session verwendet werden
soll. Dabei muss das WJ so angegeben werden, wie es die Anzeige in der WJ-Auswahllistbox dargestellt wird
z.B. 2018 für das WJ 1-12/2018 oder 2018(5) für das WJ 5/2018 bis 4/2019. Wird kein "CompanyYear" mit
angegeben, wird das aktuellste Wirtschaftsjahr verwendet.

➢  Name=
Name der Liste

➢  OutputFormat=
Format des Ergebnisses
Der Parameter OutputFormat= lässt die Optionen pdf und json zu. Abhängig vom gewählten Format wird
das Ergebnis dann entsprechend angezeigt.

OutputFile=<Pfad und Dateiname>

➢
Mit diesem Parameter kann optional eine Datei im angegebenen Format erstellt werden. Dabei ist darauf zu
achten, dass der Pfad (das Zielverzeichnis) aus Sicht des WinLine Servers erreichbar sein muss. Wird dieser
Parameter verwendet, erfolgt keine Anzeige der Daten.

Beispiel
http://127.0.0.1/ewlservice/LIST?User=a&Password=b&Company=300M&companyyear=2023&Name=Artike
ldaten&OutputFormat=json&OutputFile=c:\temp\Artikel.json

Damit wird die Liste "Artikeldaten" als Datei Artikel.json in das Verzeichnis C:\TEMP am WinLine Server
abgelegt.

➢  Filter=
Name des zu verwendenden Filters.

✓

✓

✓

Kein Filter angegeben / Parameter nicht gesetzt
Wenn bei dem Aufruf kein Filter angegeben wird, dann wird automatisch der Standardfilter der
Liste genutzt.
Filter angegeben
Wenn bei dem Aufruf ein Filter angegeben wird, dann wird dieses genutzt. Sollte es den Filter nicht
geben, dann wird die Liste ohne Filter ausgegeben.

Hinweis

Wenn ein nichtexistierender Filter angegeben wird und zusätzlich die Parameter "DatasourceSel1"
bis "DatasourceSel4" genutzt werden, dann wird eine Datenquelle unter diesem
(nichtexistierenden) Filternamen erzeugt.
Ohne Filter
Wenn die Liste ohne Filter ausgegeben werden soll, dann kann dieses unter Zuhilfenahme des
Filternamens <NOFILTER> realisiert werden.

➢  Where=<SQL Ausdruck, der im Filter verwendet werden soll>
Details zu Filter und Where entnehmen Sie bitte dem Kapitel "Reports".

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 54

Hinweis
Der Parameter "Where" wird nicht unterstützt, wenn mit einem Parameter "DatasourceSelx" (x = 1 bis 4)
gearbeitet wird.

➢  DatasourceSel1 bis 4=
Mit Hilfe der Parameter kann eine Datenquelle zur Datenausgabe genutzt werden. Ist die Datenquelle noch
nicht vorhanden, so wird diese zuvor angelegt (in Abhängigkeit des Filters). Folgende Vorgaben für die
Datenquellenselektion sind möglich:

✓
✓
✓
✓

DatasourceSel1= Textselektion für die Datenquelle
DatasourceSel2= Textselektion für die Datenquelle
DatasourceSel3= Numerische Selektion für die Datenquelle
DatasourceSel4= Numerische Selektion für die Datenquelle

3.9.

POSTING

Dieser Befehl bucht einen Buchungsstapel, der zuvor mit dem WebService-IMPORT (Typ 31) importiert
wurde. Es können mit dem MDP-WebService keine anderen Buchungsstapel gebucht werden.

Syntax
http://<WinLineServer>/ewlservice/POSTING?Session=845743da-94f7-11e1-ccce-4487fc4877d6-3948-
2416&ImportID=Id

Parameter
Der Befehl unterstützt die folgenden Parameter:

➢  Session=
Nummer der Session

➢  User=
Benutzer falls ohne Sessions gearbeitet wird

➢  Password=
Passwort, falls ohne Sessions gearbeitet wird

➢  Company=
Mandant, falls ohne Sessions gearbeitet wird

➢  CompanyYear=
Angabe des Wirtschaftsjahrs (optional)
Mit diesem Parameter kann das Wirtschaftsjahr angegeben werden, das in der Session verwendet werden
soll. Dabei muss das WJ so angegeben werden, wie es die Anzeige in der WJ-Auswahllistbox dargestellt wird
z.B. 2021 für das WJ 1-12/2021 oder 2021(5) für das WJ 5/2021 bis 4/2022. Wird kein "CompanyYear" mit
angegeben, wird das aktuellste Wirtschaftsjahr verwendet.

➢  ImportID=
ID, die beim Import des Stapels vergeben wurde

➢  RemoveStack=
Angabe bezüglich Löschen des Stapels nach dem Buchen (optional)
Es können die Vorgaben 1 (Stapel wird gelöscht - Standard) oder 0 (Stapel bleibt bestehen) übergeben
werden.

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 55

Beispiel - Buchen via WebService-Call
✓

Buchen des Stapels mit der ID "201705160803"
http://<WinLineServer>/ewlservice/POSTING?User=a&Password=b&Company=300M&
ImportID=201705160803

Interaktives Buchen

Um die Verwendung einfach demonstrieren zu können, kann das folgende HTML verwendet werden:

<HTML>
<HEAD>
<META HTTP-EQUIV="Content-type" CONTENT="text/html; charset=UTF-8">
<TITLE>Testseite</TITLE>
<BODY >
<form method="POST" action="http://<WinLineServer>/ewlservice/posting" id=form1
name=form1>

<input type='hidden' id='user' name='user' value='a'>
<input type='hidden' id='password' name='password' value='b'>
Mandant:<input type='text' id='company' name='company' value='300M'><br>
ImportId<input type='text' id='ImportID' name='ImportID' value=''><br>
<input type='submit'>

</form>
</BODY>
</HTML>

Nach Aufruf des Formulars mit einem HTML - Browser, kann mit der Eingabe des Mandanten und der
ImportID, welche beim Import des Stapels vergeben wurde, dieser Stapel mit dem Submit - Button gebucht
werden.

Hinweis
Der Benutzer "a" und das Passwort "b" sind im Formular versteckt angegeben; der Servername muss
entsprechend angepasst werden!

3.9.1.  Voucherdownload

Mit dieser Funktion können gedruckte Belege abgefragt werden, wobei die Belege als PDF in einem eigenen
Unterverzeichnis abgelegt werden.

Parameter
Der Befehl unterstützt die folgenden Parameter:

WinLine "MDP - WebServices"

mesonic © 10/2023

Seite 56

➢  Session=
Nummer der Session

➢  User=
Benutzer falls ohne Sessions gearbeitet wird

➢  Password=
Passwort, falls ohne Sessions gearbeitet wird

➢  Company=
Mandant, falls ohne Sessions gearbeitet wird

➢  Account=
Hier muss die Kontonummer angegeben werden, für das ein Beleg ausgegeben werden soll.

➢  SerialNo=
Angabe der Laufnummer, die ausgegeben werden soll. Dieser Wert ist optional.

➢  VoucherNo=
Angabe der Belegnummer des Belegs, der ausgegeben werden soll. Dieser Wert ist optional.

Hinweis
Bei der Durchführung der WebService-Anfrage muss entweder der Parameter "SerialNo" oder "VoucherNo"
angegeben werden, die Kontonummer muss immer vorhanden sein.

Bei der Durchführung der WebService Anfrage wird der Beleg in das Verzeichnis
"MESOWebserviceVoucherinfo" vom WinLine Server mit dem Namen "MESOWS-Voucher-Konotnummer-
Laufnummer-DatumTUhrzeit.PDF" erzeugt. Als Ergebnis des WebService selbst wird nur entweder "true"
oder eine entsprechende Fehlermeldung z.B.

✓
✓
✓

False Vouchernumber and Serialnumber are missing
False Voucher not found
Error! Unknown Command.

zurückgegeben.

Hinweis
Wenn die Abfrage mit "VoucherNo" erfolgt, so kann es durchaus sein, dass mehrere Belege ausgegeben
werden, wenn ein Beleg alle Belegstufen durchlaufen hat. Z.B. werden, wenn mehrere Lieferscheine zu einer
Sammelrechnung zusammengefasst wurden und auf die Rechnungsnummer abgefragt werden, dann auch
alle Lieferscheine zur Rechnung mit ausgegeben, weil in allen Belegen die Rechnungsnummer
zurückgeschrieben wird.

WinLine "MDP - WebServices"

mesonic © 10/2023

