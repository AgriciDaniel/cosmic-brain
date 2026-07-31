Konzept Schnittstelle WinLine ERP zu HYDRA
MES

Version 1.08

framas Kunststofftechnik GmbH

Inhalt
Versionshistorie ..................................................................................................................................... 5

Projektbeschreibung ............................................................................................................................... 7

Projektparameter ................................................................................................................................ 7

Technische Details ........................................................................................................................... 7

Fehlerbehandlung ........................................................................................................................... 7

Ansprechpartner ................................................................................................................................. 8

framas .............................................................................................................................................. 8

SOFTAGE .......................................................................................................................................... 8

Projektphasen und -prioritäten ............................................................................................................... 8

Phase 1 / Priorität 1 ............................................................................................................................. 8

ERP zu MES ...................................................................................................................................... 8

MES zu ERP ...................................................................................................................................... 8

Neue Tabellenspalten in ERP (MDP 2) ............................................................................................ 8

Neue Felder in Kundenstamm ..................................................................................................... 9

Tabellenerweiterung ............................................................................................................... 9

Neue Felder im Artikelstamm ..................................................................................................... 9

Tabellenerweiterung ............................................................................................................... 9

Neue Tabelle Positionsinformationen (T697) ............................................................................. 9

Neue Felder in Kundenauftrag .................................................................................................. 10

Tabellenerweiterung ............................................................................................................. 10

Neue Tabelle Priority Matrix ..................................................................................................... 11

Neue Tabelle Specific Event-Priority ......................................................................................... 15

Neue Tabelle Priority Classification ........................................................................................... 15

Neue Felder in Produktionsauftrag ........................................................................................... 15

Tabellenerweiterung ............................................................................................................. 16

Neue Belegarten ........................................................................................................................ 16

Belegkopftexte .......................................................................................................................... 16

Lieferterminberechnung WinLine ................................................................................................. 16

Auftragsersterfassung: .............................................................................................................. 17

Rückmeldung Hydra .................................................................................................................. 18

Weitere Phasen ......................................................................................................................... 19

Statusspalten ............................................................................................................................. 19

Schnittstelle ........................................................................................................................... 19

- 2 -

Termin ................................................................................................................................... 19

Weitere Phasen ................................................................................................................................. 19

Beschreibung Schnittstellendatenbank EIS-DBI .................................................................................... 19

Schnittstellentabellen........................................................................................................................ 20

Aufbau Transaktionsnummer ........................................................................................................ 20

HYSAP_INBOUND_DATA ............................................................................................................... 20

Spalten ....................................................................................................................................... 20

HYSAP_INBOUND_CTRL ................................................................................................................ 22

Spalten ....................................................................................................................................... 22

HYSAP_OUT_DATA ........................................................................................................................ 25

Spalten ....................................................................................................................................... 25

HYSAP_OUT_CTRL ......................................................................................................................... 27

Spalten ....................................................................................................................................... 27

Datenstruktur .................................................................................................................................... 30

Nachrichtentyp HY72PPS (Auftrag) ............................................................................................... 30

Typspezifikationen..................................................................................................................... 30

Nachrichtentyp HYADRCK_SC (Feinplanungsdaten) ..................................................................... 31

Typspezifikationen..................................................................................................................... 31

Umsetzung ERP Export zu MES HYDRA ................................................................................................. 32

Organisatorisches .............................................................................................................................. 32

Arbeitsplatz- (=WinLine Ressourcen) und Auftragsnummern ...................................................... 32

Begriffsdefinitionen Auftragsnummer .......................................................................................... 33

Auftragsnummer ....................................................................................................................... 33

Hinweis zu Zeilennummer ..................................................................................................... 33

Hinweis  zur Feldlänge ........................................................................................................... 33

Arbeitsgangnummer .................................................................................................................. 33

Folgennummer .......................................................................................................................... 33

MES Auftragsnummer ............................................................................................................... 34

Datenmapping ERP > HYDRA ............................................................................................................. 35

Auftragsdaten (Nachricht HY72PPS) ............................................................................................. 35

Segment HY72_AU_HD_001 (Auftragskopf) ............................................................................. 36

Hinweis zur MES Auftragsnummer........................................................................................ 36

Segment HY72_AU_INFO_AI_001 (Langtexte) .......................................................................... 38

Segment HY72_AU_USRFLD_001 (Benutzerfelder des Auftragskopfs) .................................... 38

- 3 -

Datenermittlung .................................................................................................................... 38

Segment HY72_AG_HD_001 (Arbeitsgänge) ............................................................................. 39

Ermittlung der Arbeitsgangnummer ..................................................................................... 39

Datenermittlung .................................................................................................................... 45

Segment HY72_AG_USRFLD_001 (Benutzerfelder des Arbeitsgangs) ...................................... 47

Datenermittlung .................................................................................................................... 47

Segment HY72_AG_KOMPL_002 (Komponentenliste) ............................................................. 48

Segment HY72_AFOLG_001 (Sequenzfolgen) ........................................................................... 49

Datenermittlung .................................................................................................................... 49

Ablauf Datenexport ERP > HYDRA ..................................................................................................... 51

Verweis TransaktionsID ................................................................................................................. 51

Umsetzung Import aus MES HYDRA ...................................................................................................... 51

Aktualisierung WinLine Daten ........................................................................................................... 51

Aktualisierung Schnittstellenstatus ............................................................................................... 51

Import HYDRA-Daten..................................................................................................................... 51

Datenmapping HYDRA > ERP ............................................................................................................. 52

IST-Meldungen/Timeticket (Nachricht HY72ADRCK_TT) .............................................................. 52

Hinweis IST-Mengen-Buchungen .............................................................................................. 52

Segment HY72ADRCK_TT (Timetickets) .................................................................................... 53

Feinplanungsdaten aus HYDRA (Nachricht HY72ADRCK_SC) ........................................................ 54

Hinweis Feinplanungsdaten ...................................................................................................... 54

Segment HY72ADRCK_SCHEDULE ............................................................................................. 55

Ablauf Datenimport HYDRA > ERP .................................................................................................... 56

Fragen und Aufgaben ............................................................................................................................ 57

- 4 -

Versionshistorie
Datum
05.08.2019 – 07.08.2019

14.08.2019

26.08.2019

26.08.2019

Mitarbeiter
Tobias Forbrich, tf@softage.de  Erstellt auf Basis des Workshop
vom 23.07.2019 bei Fa. Framas
in Pirmasens

Beschreibung

Tobias Forbrich, tf@softage.de  Erweiterungen auf Basis eMail

Hubert Foidl, hf@softage.de

vom 13.08.2019 und
Telefonkonferenz mit Herrn
Frank vom 14.08.2019
Erweiterung Detailkonzept
„Lieferterminberechnung“

Tobias Forbrich, tf@softage.de  Erweiterungen auf Basis erster

Tests Datenexport
ERP>WinLine mit Herrn Sprau:

Feldlänge der MES
Auftragsnummer sind 8
Zeichen, daher bei längere
Werte kürzen, bzw. kürzere
Werte mit Leerzeichen
auffüllen.
Siehe Auftragsnummer
Anpassung Belegart setzt
Auftragsart und Priorität und
diverse weitere Anpassungen
Feldlängen für interne
Auftragsnummer erweitert
(neue Felder „Folge“ und
„Splitnummer“), eMail vom
04.11.2019
Stücklistenaufbau und
Ermittlung der Arbeitsfolgen
visualisiert:
Beispielstückliste WM78

Erweiterung
Lieferterminberechnung lt.
TELKO 27.11.2019

29.08.2019 – 09.09.2019

Hubert Foidl, hf@softage.de

04.11.2019

Tobias Forbrich, tf@softage.de

14.11.2019

Tobias Forbrich, tf@softage.de

05.12.2019

Hubert Foidl, hf@softage.de

17.02.2020

Tobias Forbrich, tf@softage.de  Erweiterung um

04.06.2020

Hubert Foidl, hf@softage.de

29.06.2020

Hubert Foidl, hf@softage.de

Artikelgruppenbezeichnung /
Hauptartikelnummer
Erweiterung
Lieferterminberechnung
„Specific Event Priority“
Erweiterung
Lieferterminberechnung
Terminberechnungslogiken

04.01.2021

Tobias Forbrich, tf@softage.de  Umstellung der Spalten für die

Lieferterminberechnung auf
eine separate Tabelle
(Konfliktbereinigung mit

- 5 -

bestehenden T026 Spalten der
framas-Niederlassungen)

- 6 -

Projektbeschreibung
Fa. framas Kunststofftechnik setzt die ERP Lösung Mesonic WinLine ein. Die Produktionsfeinplanung
wird jedoch derzeit nicht in der WinLine PPS durchgeführt.

Hierzu wird das MES System HYDRA des Softwareherstellers MPDV schrittweise eingeführt, welches
in mehreren Phasen sowohl in der Firmenzentrale auch in weiteren framas Produktionsstandorten
zum Einsatz kommen soll.

Das primäre Projektziel der ersten Phase dieses Projektes ist die Schaffung einer
Produktionsauftragsschnittstelle zwischen Mesonic WinLine und Hydra MES.

Projektparameter
Die im vorliegenden Projekt beschriebenen Lösungen sollen sowohl in deutscher als auch in
englischer Sprache eingesetzt werden.

Die jeweiligen framas Standorte haben eine eigene IT-Infrastruktur mit WinLine Installation und
Mandant; VPN-Site-to-Site ist eingerichtet, jedoch findet derzeit kein Datenabgleich der WinLine
Mandanten statt.

Als Grundlage zur Entwicklung der MES-Schnittstelle dienen folgende bereitgestellten Dokumente
aus bestehenden Workshops zwischen Fa. framas, Mesonic und MPDV (HYDRA MES):

-
-
-
-
-

FRAM_interface_datamapping_17052019_Ergaenzung_23072019.xlsx
20190521_FRAM_GK_INTERFACES.pdf
EIS-DBI_30 de.pdf
EIS-EFD_81 de.pdf
EIS-EP_81 de.pdf

Technische Details
Bei der Umsetzung des vorliegenden Projektes kommen folgende Technologien zum Einsatz:

-  Microsoft .NET Framework (Versionen 2.0 und 4.6)

o  SOFTAGE .NET Framework (zentrale Methoden zur Anwendungssteuerung,

objektbasierter Datenzugriff auf die Mesonic Daten)

o  COM-Technologie als Kapselung der Schnittstellenapplikation zur Integration in die

Mesonic WinLine

-  Microsoft SQL-Server Objekte (SQL Server ab SQL 2005)

o  SOFTAGE SQL Framework (Funktionen/Prozeduren/Sichten) zum Zugriff auf Mesonic

WinLine Daten

o  Anwendungsdatenbank zur Speicherung von Einstellungen und Protokollen

-  Mesonic MDP / Objektmodell

o  Erweiterung der Programmoberfläche um Schaltflächen und Funktionsaufrufe

(CTK/Fensterscripts/Systemscripts)

o  Erweiterung der Tabellenstruktur um Spalten (MDP2)

Fehlerbehandlung
Die Anwendung verwendet eine Protokollfunktion (SQL-Tabelle) mit entsprechender Möglichkeit
diese in der Konfigurationsapplikation sowie aus der WinLine heraus auszurufen. Des weiteren wird

- 7 -

die NLOG-Komponente zur benutzerdefinierten Benachrichtigung bei auftretenden Fehler
verwendet.

Ansprechpartner

Funktion
Senior IT Manager
Ansprechpartner für Gesamtprojekt
PPIC manager
KeyUser für HYDRA MES und
Mesonic WinLine PPS
Projektleitung

Kontaktdaten
Tel: 06331/51 52 361
eMail: kai.frank@framas.com
Tel: 06331/51 52 220
eMail: fabian.sprau@framas.com

framas
Name
Kai Frank

Fabian Sprau

Sascha Berger

SOFTAGE
Name
Tobias Forbrich

Funktion
Projektleiter und Entwickler

Emanuel Wimmer

Ansprechpartner WinLine PPS

Hubert Foidl

Ansprechpartner Teilprojekt
Lieferterminberechnung

Projektphasen und -prioritäten

Kontaktdaten
Tel: 08641/9540-652
eMail: tf@softage.de
Tel: 08641/9540-501
eMail: ew@softage.de
Tel: 08641/9540-518
eMail: hf@softage.de

Phase 1 / Priorität 1
Die wichtigste Anforderung im Projekt ist die Erstellung der Schnittstelle ERP <> MES mit folgenden
Grundfunktionalitäten:

ERP zu MES

-

Export Produktionsauftrag

o  Arbeitsschritte und Tätigkeiten
o  Sequenzdaten / Arbeitsfolgen (parallel/sequenziell)

MES zu ERP

-

Import Termine

o  Geplante Produktionstermine in Arbeitsschritte, Produktionsauftrag und

Kundenauftrag speichern

o  Status zur Auswertung für den Vertrieb in Kundenauftrag setzen (Prozess

„Kundenterminbestätigung“)

Neue Tabellenspalten in ERP (MDP 2)
Referenzdokument: WL interface – calculations.xlsx

Die folgenden Terminfelder sind notwendig, um alle für die Lieferung und Vertragsvereinbarung
relevanten Termine im Kundenauftrag und Produktionsauftrag vorzuhalten. Des Weiteren werden
die vom MES System errechneten Feinplanungsdaten und der Status der Schnittstellenverarbeitung
gespeichert.

- 8 -

Neue Felder in Kundenstamm

o  Versandtage (Mehrfachauswahleigenschaft Montag bis Sonntag) = Shippingdays

Tabellenerweiterung

Neue Felder im Artikelstamm

o  Marke (Eigenschaftstyp 7- fix Drilldown) = Brand

o  z. B. Adidas Nike

Tabellenerweiterung

Neue Tabelle Positionsinformationen (T697)

o  RTD = Requested Time Delivery (Kundenwunschdatum)
o  RTC = Requested Time Completion (Fertigstellungstermin zur Erreichung RTD)
o  LTC = Limited Time Completion (Fertigstellungsdatum zur Erreichung des LTD)
o  LTDF = Limited Time Delivery forecast (Kundenwunschdatum oder vertraglich

vereinbartes Lieferdatum

o  LTDB = Limited Time Delivery backwards (Vertraglich vorgegebenes Lieferdatum unter

Berücksichtigung des Verschiffungstages)

o  LTCB = Limited Time Completion Backwards (Fertigstellungstermin zur Erreichung LTDB)
o  CSD = Customer Shipping Date ( wenn durch Kunde angegeben)
o  ETD = Estimated Time of delivery (errechnets Versanddatum)
o  CDDD = Confirmed delivery date distribution (vom Vertrieb bestätigtes Lieferdatum)
o  CDDC = confirmed delivery date customer (vom Kunde bestätigtes Lieferdatum)
o  Order Type (Auftragsart)
o
Item Type (Dekoration)

- 9 -

Neue Felder in Kundenauftrag
(Bisherige Spalten zur Lieferterminverechnung wurden umgestellt auf separate Tabelle Neue Tabelle
Positionsinformationen)

o  ETC = Estimated Time of completion (geplantes Fertigungsdatum MES Hydra) (bei

Rückmeldung durch Schnittstelle)

o  LTD = Limited Time Delivery (Vertraglich vorgegebenes Lieferdatum gemäß

Kundenvereinbarung/Zusatzfeldern)

o  Statusspalte HYDRA Schnittstelle (siehe Statusspalten)
o  Statusspalte Termin HYDRA Schnittstelle (siehe Statusspalten)
o  Tatsächlicher Produktionsbeginn (IST > Hydra)
o  Positions GUID (Veknüpfung zu Neue Tabelle Positionsinformationen (T697))

Tabellenerweiterung

- 10 -

Neue Tabelle Priority Matrix

Diese Daten können in der WinLine über einen neuen Menüpunkt aufgerufen und
geändert/erweitert werden. Aktuelle Matrix:

Brand
ALL

ALL

ALL

ALL

ALL

ALL

ALL

ALL

ALL

ALL

ALL

ALL

adidas

Voucher Type
322 Sample Claim
oversea
322 Sample Claim
oversea
122 Sample Claim
domestic
122 Sample Claim
domestic
323 Production Claim
oversea
323 Production Claim
oversea
123 Production Claim
domestic
123 Production Claim
domestic
332 Sample Order
oversea
332 Sample Order
oversea
132 Sample Order
domestic
132 Sample Order
domestic
Production Order of
Priority Item

Order Type
ALL

Item Type
with decoration

LT [d]
3

Priority
99

without decoration  3

with decoration

3

without decoration  3

with decoration

7

without decoration  7

with decoration

7

without decoration  7

with decoration

10

without decoration  10

with decoration

10

without decoration  10

ALL

0

98

97

96

94

93

92

91

89

88

87

86

84

ALL

ALL

ALL

ALL

ALL

ALL

ALL

ALL

ALL

ALL

ALL

ALL

- 11 -

adidas

adidas

adidas

adidas

adidas

adidas

adidas

adidas

adidas

adidas

adidas

adidas

adidas

adidas

adidas

adidas

adidas

adidas

adidas

adidas

adidas

adidas

adidas

adidas

adidas

Production Order of
Priority Item
Production Order of
Priority Item
Production Order of
Priority Item
Production Order of
Priority Item
Production Order of
Priority Item
333 Production Order
oversea
333 Production Order
oversea
133 Production Order
domestic
133 Production Order
domestic
333 Production Order
oversea
333 Production Order
oversea
133 Production Order
domestic
133 Production Order
domestic
333 Production Order
oversea
333 Production Order
oversea
133 Production Order
domestic
133 Production Order
domestic
333 Production Order
oversea
333 Production Order
oversea
133 Production Order
domestic
133 Production Order
domestic
333 Production Order
oversea
333 Production Order
oversea
133 Production Order
domestic
133 Production Order
domestic

ALL

ALL

ALL

ALL

ALL

S1

S1

S1

S1

SR

SR

SR

SR

CR

CR

CR

CR

PR

PR

PR

PR

P1

P1

P1

P1

- 12 -

ALL

ALL

ALL

ALL

ALL

with decoration

0

0

0

0

0

0

without decoration  0

with decoration

0

without decoration  0

with decoration

0

without decoration  0

with decoration

0

without decoration  0

with decoration

0

without decoration  0

with decoration

0

without decoration  0

with decoration

0

without decoration  0

with decoration

0

without decoration  0

with decoration

0

without decoration  0

with decoration

0

without decoration  0

83

82

75

70

65

49

48

47

46

44

43

42

41

39

38

37

36

34

33

32

31

29

28

27

26

adidas

adidas

adidas

adidas

adidas

adidas

adidas

adidas

adidas

adidas

adidas

adidas

New
Balance
New
Balance
New
Balance
New
Balance
New
Balance
New
Balance
New
Balance
New
Balance
New
Balance
New
Balance
New
Balance
New
Balance
New
Balance

333 Production Order
oversea
333 Production Order
oversea
133 Production Order
domestic
133 Production Order
domestic
333 Production Order
oversea
333 Production Order
oversea
133 Production Order
domestic
133 Production Order
domestic
333 Production Order
oversea
333 Production Order
oversea
133 Production Order
domestic
133 Production Order
domestic
Production Order of
Priority Item
Production Order of
Priority Item
333 Production Order
oversea
333 Production Order
oversea
133 Production Order
domestic
133 Production Order
domestic
333 Production Order
oversea
333 Production Order
oversea
133 Production Order
domestic
133 Production Order
domestic
333 Production Order
oversea
333 Production Order
oversea
133 Production Order
domestic

P2 / FX

P2 / FX

P2 / FX

P2 / FX

P3

P3

P3

P3

ALL

ALL

with decoration

0

without decoration  0

with decoration

0

without decoration  0

with decoration

0

without decoration  0

with decoration

0

without decoration  0

with decoration

0

without decoration  0

with decoration

0

without decoration  0

ALL

ALL

0

0

0

Premium

with decoration

Premium

without decoration  0

Premium

with decoration

0

Premium

without decoration  0

Speedlane

with decoration

0

Speedlane

without decoration  0

Speedlane

with decoration

0

Speedlane

without decoration  0

Regular

Regular

Regular

with decoration

0

without decoration  0

with decoration

0

- 13 -

24

23

22

21

24

23

22

21

19

18

17

16

84

84

49

48

47

46

44

43

42

41

24

23

22

New
Balance
New
Balance
New
Balance
New
Balance
New
Balance
New
Balance
New
Balance
New
Balance
New
Balance
PUMA

PUMA

PUMA

PUMA

PUMA

PUMA

PUMA

PUMA

133 Production Order
domestic
333 Production Order
oversea
333 Production Order
oversea
133 Production Order
domestic
133 Production Order
domestic
333 Production Order
oversea
333 Production Order
oversea
133 Production Order
domestic
133 Production Order
domestic
333 Production Order
oversea
333 Production Order
oversea
133 Production Order
domestic
133 Production Order
domestic
333 Production Order
oversea
333 Production Order
oversea
133 Production Order
domestic
133 Production Order
domestic

Regular

without decoration  0

with decoration

0

without decoration  0

with decoration

0

without decoration  0

Pre-Buy

with decoration

0

Pre-Buy

without decoration  0

Pre-Buy

with decoration

0

Pre-Buy

without decoration  0

Fast Forward

with decoration

0

Fast Forward

without decoration  0

Fast Forward

with decoration

0

Fast Forward

without decoration  0

with decoration

0

without decoration  0

with decoration

0

without decoration  0

21

24

23

22

21

19

18

17

16

49

48

47

46

24

23

22

21

- 14 -

Neue Tabelle Specific Event-Priority

Neue Tabelle Priority Classification

Neue Felder in Produktionsauftrag

o  Statusspalte HYDRA Schnittstelle (siehe Statusspalten)
o  Statusspalte Termin HYDRA Schnittstelle (siehe Statusspalten)
o  Ursprüngliches Datum Ende
o  Aktuelles Enddatum Hydra (bei Rückmeldung durch Schnittstelle)
o  TID HYDRA Schnittstelle (eindeutige TransaktionsID, die beim Export generiert wird; als

Referenz zu HYSAP_INBOUND_CTRL)

- 15 -

Tabellenerweiterung

Neue Belegarten
Es müssen neue Belegarten in allen Mandanten angelegt. Die Belegartennummern können aus der
oben angegebenen Priority Matrix entnommen werden. Die Belegartennummern setzten sich dabei
wie folgt zusammen:

-

Erste Stelle:

o  1 für Inland (domestic)
o  3 für Drittland ( oversea)

-

Zweite Stelle

o  2 für Reklamation (Claim)
o  3 für Bestellung(Order)

-  Dritte Stelle

o  2 für Muster (Sample)
o  3 für Produktion (Production)

Belegkopftexte
In Belegkopftext 3 (RSM) stehen drei Auswahlmöglichkeiten zur Verfügung

-
Sea
-  Air
-

Land

Lieferterminberechnung WinLine
In der WinLine gibt es zwei Status für die Lieferterminberechnung in Aufträgen:

o  Auftragsersterfassung
o  Rückmeldungsverarbeitung Hydra

- 16 -

Auftragsersterfassung:
Zum Zeitpunkt der Auftragserfassung werden die nachfolgenden Felder über eine Zeilenformel in der
WinLine wie folgt berechnet/befüllt. Die Zeilenformel öffnet bei der ersten Artikelzeile ein
Erfassungsfenster, in welchem der Anwender auswählt, um welche Auftragsart es sich handelt. Es
werden nur die möglichen Typen lt. Priority Matrix zur Verfügung gestellt. Wenn es sich um einen
Artikel handelt, welcher in der Specific Event-Priority für das Auftragsdatum für den aktuellen
Kunden einen Eintrag hat, muss zusätzlich der Prio Type angegeben werden, wobei hier der PrioType
mit der höchsten Priorität vorbelegt ist.

Bemerkung
Ausgangsbasis für nachfolgende Berechnungen
Manuelle Eingabe
Dieses Datum wird als Zieldatum an Hydra
übergeben

Kundenwunschdatum
Zieldatum für Fertigstellung

Auftragsdatum zzgl. LT aus Priority Matrix oder
TLT Specific Event Priority, wenn für die
Kombination Artikel/Kunde ein
Preislisteneintrag vorhanden ist. Gibt es keinen
Preislisteneintrag und keinen Eintrag in der
Priority Matrix für die gewählte Belegart mit
einem LT > 0, wird ein entsprechende Hinweis
angezeigt.

RTD wenn nach LTD, sonst LTD
Rückwärtsgerechnetes mögliches LTD unter
Berücksichtigung eines vom Kunden
angegebenen Verschiffungsdatums. Wenn nicht
angegeben, dann LTDB = LTDF.
Berechnung = CSD (TLT – EST (Kundenstamm) –
SLT) – EST (Kundenstamm) Wenn berechnetes
LTDB < LTD dann LTDB = LTD

Berechnung
Feld
Auftragsdatum  Bestelldatum
RTD (Kopf)
Lieferdatum
(je Zeile)

Kundenwunschdatum
= berechnetes Datum RTD
abzgl. möglicher
Verschiffungstag abzgl.
Puffertage Einkauf im
Artikelstamm
Kundenwunschdatum
= berechnetes Datum RTD
abzgl. möglicher
Verschiffungstag abzgl.
Puffertage Einkauf im
Artikelstamm
= Auftragsdatum plus LT aus
der Priority Matrix

RTD
RTC

LTD

LTC

LTDF
LTDB

LTDC

= berechnetes Datum LTD
abzgl. möglicher
Verschiffungstag abzgl.
Puffertage Einkauf im
Artikelstamm
= LTDF
= LTDB

= berechnetes Datum LTDB
abzgl. möglicher
Verschiffungstag abzgl.
Puffertage Einkauf im
Artikelstamm

- 17 -

CSD

ETC
ETD
CDDD
CDDC
Priorität

= Customer Shipping Date
manuelle Erfassung
Keine
Keine
Keine
Keine
Wird berechnet aus Priority
Matrix oder Specific Event
Priority

Kommentar
(Comment)

Keine

Manuelle Erfassung

Zum Zeitpunkt Auftragserfassung nicht bekannt
Zum Zeitpunkt Auftragserfassung nicht bekannt
Zum Zeitpunkt Auftragserfassung nicht bekannt
Zum Zeitpunkt Auftragserfassung nicht bekannt
Wenn die Kombination Artikel und Kunde zum
Auftragsdatum in der Tabelle Specific Event
Priority einen Eintrag hat, wird die Priorität der
Artikelzeile aus der Summe SLT und der
Basispriorität in der Tabelle Priority
Classification berechnet, ansonsten wird die
Priorität aus der Priority Matrix verwendet.

Rückmeldung Hydra
Sobald aus Hydra ein ETC geliefert wurde, muss der Vertrieb die Auftragsdaten prüfen und dem
Kunden entsprechende Termine kommunizieren und ggf. ändern. Hilfsmittel für den Vertrieb kann
dabei z. B. eine Cockpitliste sein, welche auf den Terminstatus der Belegzeile gefiltert ist. Ein Auftrag
in dieser Liste muss durch den Vertrieb bearbeitet werden. Der Vertrieb kann dabei Werte frei auf
Basis des ETC mit dem Kunden vereinbaren oder sich durch erneutes Ausführen der Zeilenformel
weitere Zielwerte berechnen lassen:

Bemerkung

Ist bei Status = 2 in Status MES und Status MES
Date > 0 das Lieferdatum (je Zeile)

Berechnung
Feld
Auftragsdatum  Bestelldatum
Lieferdatum
(je Zeile)
RTD
RTC
LTD

Kundenwunschdatum
Siehe Auftragsersterfassung
Siehe Auftragsersterfassung

= Aktualisiertes ETC au Hydra

LTC

LTDF
LTDB
LTCB
CSD
ETC

ETD

CDDD

CDDC

Status MES

Siehe Auftragsersterfassung

Siehe Auftragsersterfassung
Siehe Auftragsersterfassung
Siehe Auftragsersterfassung
Siehe Auftragsersterfassung
= Lieferdatum der Zeile

ETC zzgl. Puffertage Einkauf
Artikel) unter
Berücksichtigung der
Verschiffungstage des Kunden
= manuell zu pflegen durch
Vertrieb
= manuell zu pflegen durch
Vertrieb
Wird durch Hydra gefüllt

- 18 -

Status MES
Date
Priorität
Kommentar
(Comment)

Wird durch Hydra gefüllt

Siehe Auftragsersterfassung
Hinweistext Lieferstatus unter
Berücksichtigung möglicher
Lieferzeiten für Sea, Air oder
Land (Auftragsabhängig)

NPSF = ETC + SLT (inkl. Verschiffungstag)
-
-

„RTD conform“ = ETC <= RTC
„LTD conform“ = ETC > RTC +NPSF <=
LTD
„CSD conform“ = ETC > RTC + NPSF <=
LTDB
„Serious Delay“ = ETC > RTC +
NPSF>LTDB

-

-

Weitere Phasen

-
Technische Umsetzung Berechnungen
-  Optische Umsetzung in Vertriebscockpits
-

Implementierung von Prozessen für den Vertrieb über das Modul WinLine-CRM

Statusspalten
Sowohl in der WinLine Belegzeilentabelle (T026), als auch in der Produktionsauftragstabelle (T324)
wird eine Status-Spalte für die Schnittstelle (generelle Übertragung), sowie für den Termin (Bei
Rückmeldungen) eingefügt.

Schnittstelle
Hierbei werden folgende Statuswerte gespeichert:

Wert
0
1
2
99

Termin
Wert
0
1

2

3

Beschreibung
Keine/Neu
Export erfolgt
Rückmeldung erfolgt
Fehler

Beschreibung
Keine/Neu
Feinplanung erfolgt

Umplanung erfolgt

Ausplanung erfolgt (Zurück
in Gruppenvorrat)

Bemerkung
Nicht relevant für Schnittstelle bzw. noch nicht übertragen
Siehe Datenmapping ERP > HYDRA
Siehe Datenmapping HYDRA > ERP
Fehler bei der Übertragung

Bemerkung
Nicht relevant bzw. noch keine Rückmeldung
Siehe Feinplanungsdaten aus HYDRA (Nachricht
HY72ADRCK_SC)
Siehe Feinplanungsdaten aus HYDRA (Nachricht
HY72ADRCK_SC)
Siehe Feinplanungsdaten aus HYDRA (Nachricht
HY72ADRCK_SC)

Weitere Phasen

-  Bereitstellung Materialien/Komponenten
-  Bereitstellung Dokumente
-  Rückmeldung IST-Mengen

Beschreibung Schnittstellendatenbank EIS-DBI
Als Schnittstelle der im folgenden Konzept festgelegten Schnittstellenbereiche kommt die im
Dokument EIS-DBI_30 de.pdf beschriebene MS SQL Interface Datenbank „EIS-DBI“ zum Einsatz, in

- 19 -

welcher sowohl die an das MES zu übertragen Aufträge (ORDER/OPERATION DOWNLOAD), als auch
die vom MES generierten Termine (TIMETICKETS UPLOAD)  sowie die dazugehörenden Status in
staging-Tabellen gespeichert werden.

Schnittstellentabellen
Referenzdokumente: 20190521_FRAM_GK_INTERFACES.pdf, EIS-DBI 30.pdf

Die im folgenden genannten Tabellen werden als Schnittstellen-Tabellen zum Austausch des iDOC-
Nachrichtentyp HY72PPS, Auftragsdaten (ERP > HYDRA) sowie des Nachrichtentyp HY72ADRCK_SC,
Feinplanungsdaten (HYDRA > ERP) verwendet.

Jede Nachricht wird über eine eindeutige Transaktions-ID gekennzeichnet, welche zwischen der
Datentabelle und der zugehörenden Kontrolltabelle den Verweis-Schlüssel darstellt.

Jedes Segment in einer Nachricht wird als ein Datensatz in der Schnittstellen-Tabellen gespeichert.

Aufbau Transaktionsnummer
DBLINKYYYYMMDDHHMMSSsss (z.B DBLINK20190509143210)

HYSAP_INBOUND_DATA

-  Datentransfer zwischen ERP und MES HYDRA

o  Neue Produktionsaufträge und Arbeitsschritte
o

In späterer Projektausbaustufe auch Rohmaterialien/Komponenten

-

Jeder Datensatz stellt ein Segment einer Nachricht dar

Spalten
Referenzdokument: FRAM_interface_datamapping_17052019.xlsx, EIS-DBI_30 de.pdf

Es werden nur die für die Schnittstelle relevanten Spalten aufgeführt (Auszug).

- 20 -

Feld

Typ

ta_id

CHAR(30)

Beschreibung
HYDRA
Transaktionsnummer  Wird zur Laufzeit generiert

Quelle

ds_status

CHAR(3)

Segment Status

Konstant „000“

ds_savdate

DATE

Datum der
Speicherung

Datum der Erzeugung
Format mm/dd/yyyy

ds_savtime

INTEGER

sap_segnam  CHAR(30)
sap_docnum  CHAR(16)
sap_segnum  CHAR(6)
sap_psgnum  CHAR(6)

sap_hlevel
sap_sdata

CHAR(2)
CHAR(2000)

Uhrzeit der
Speicherung
Segment
Nummer des iDoc
Segmentnummer
Nummer des
Elternelementes
Hierarchieebene
IDoc Daten

Uhrzeit der Erzeugung
Sekunden seit Mitternacht
Bezeichnung des Segmentes
Konstant „0000000000000000“
Konstant „0000000“
Konstant „0000000“

Konstant „00“
Segmentdaten gemäß
Datenmapping ERP > HYDRA

Bemerkung

Beispiel

Verknüpfung zwischen Tabelle
HYSAP_INBOUND_DATA und
HYSAP_INBOUND_CTRL
Die Status-Spalte wird zur
Ablaufsteuerung (Ablauf Datenexport
ERP > HYDRA) genutzt

DBLINK20190509143210

000

08/06/2019

68423

HY_AU_HD_001_A
0000000000000000
0000000
0000000

00
<Segmentdaten>

HYSAP_INBOUND_CTRL

-

Tabelle mit Kontrolldaten zur Steuerung des Datentransfer zwischen ERP und MES HYDRA

Spalten
Referenzdokument: FRAM_interface_datamapping_17052019.xlsx, EIS-DBI_30 de.pdf

Es  werden nur die für die Schnittstelle relevanten Spalten aufgeführt (Auszug).

Feld

ta_id

Typ

CHAR(30)

Beschreibung
HYDRA
Transaktionsnummer  Wird zur Laufzeit generiert

Quelle

Bemerkung

Beispiel

Verknüpfung zwischen Tabelle
HYSAP_INBOUND_DATA und
HYSAP_INBOUND_CTRL

DBLINK20190509143210

ta_type

CHAR(5)

ta_status

CHAR(3)

ta_lines

INTEGER

Ta_ldone

INTEGER

Ta_lunknown

INTEGER

Ta_lerror

INTEGER

Ta_savdate

DATE

Ta_savtime

INTEGER

Beschreibung der
Strukturart
Status der
Verarbeitung
Anzahl der
Datensätze in der
Transaktion
Anzahl der
verarbeiteten
Datensätze in der
Transaktion
Anzahl der
ungbekannten
Datensätze in der
Transaktion
Anzahl der
fehlerhaften
Datensätze in der
Transaktion
Datum der
Erzeugung
Uhrzeit der
Erzeugung

Konstant „IDOC“

Konstant „000“

Wird von der Schnittstelle
berechnet (Anzahl Datensätze
mit derselben ta_id)
Konstant 0

Konstant 0

Konstant 0

Format mm/dd/yyyy

Anzahl Sekunden seit
Mitternacht

IDOC

000

8

0

0

0

08/06/2019

65498

Sap_tabnam

CHAR(10)

Sap_mestyp

CHAR(30)

Name der
Tabellenstruktur
Nachrichtentyp

Konstant „EDI_DC40“

Konstant „HY72PPS“

EDI_DC40

HY72PPS

- 24 -

HYSAP_OUT_DATA

-  Datentransfer MES HYDRA  > ERP

o  Zeitplanungsdaten (Feinplanungsdaten aus HYDRA (Nachricht HY72ADRCK_SC)
o  Ggf. künftig IST-Daten (IST-Meldungen/Timeticket (Nachricht HY72ADRCK_TT))

-

Jeder Datensatz stellt ein Segment einer Nachricht dar

Spalten
Referenzdokument: FRAM_interface_datamapping_17052019.xlsx, EIS-DBI_30 de.pdf

Es  werden nur die für die Schnittstelle relevanten Spalten aufgeführt (Auszug).

Feld

ta_id

Typ

CHAR(30)

Beschreibung
HYDRA
Transaktionsnummer  Wird nach der Verarbeitung

Quelle

ds_status

CHAR(3)

Segment Status

ds_savdate

DATE

ds_savtime

INTEGER

ds_workdate  DATE

ds_worktime

INTEGER

sap_segnam  CHAR(30)

Datum der
Speicherung durch
HYDRA
Datum des Erhalts in
HYDRA
Datum der
Bearbeitung durch
ERP
Uhrzeit der
Bearbeitung durch
ERP
Segment

sap_sdata

CHAR(2000)

IDoc Daten

durch die Schnittstelle zur
Laufzeit generiert
Vor der Übergabe „000“.
Während der Übergabe
„100“.
Nach erfolgreicher
Übergabe Änderung auf
„099“
Datum der Erzeugung
Format mm/dd/yyyy

Uhrzeit der Erzeugung
Sekunden seit Mitternacht
Datum der Bearbeitung durch
ERP
Format mm/dd/yyyy
Uhrzeit der Bearbeitung durch
ERP
Sekunden seit Mitternacht
Bezeichnung des Segmentes

Segmentdaten gemäß
Datenmapping HYDRA > ERP

Bemerkung

Beispiel

Verknüpfung zwischen Tabelle
HYSAP_OUT_DATA und
HYSAP_OUT_CTRL
Die Status-Spalte wird zur
Ablaufsteuerung (siehe Ablauf
Datenimport HYDRA > ERP) genutzt

DBLINK20190509143210

000

08/06/2019

68423

Durch Sschnittstelle setzen

08/06/2019

Durch Sschnittstelle setzen

69265

Aktuell wird nur HYADRCK_SCHEDULE
verarbeitet

HYADRCK_SCHEDULE

<Segmentdaten>

HYSAP_OUT_CTRL

-

Tabelle mit Kontrolldaten zur Steuerung des Datentransfer zwischen MES HYDRA  und ERP

Spalten
Referenzdokument: FRAM_interface_datamapping_17052019.xlsx, EIS-DBI_30 de.pdf

Es  werden nur die für die Schnittstelle relevanten Spalten aufgeführt (Auszug).

Feld

ta_id

Typ

CHAR(30)

Beschreibung
HYDRA
Transaktionsnummer  Wird nach der Verarbeitung

Quelle

ta_type

CHAR(5)

ta_status

CHAR(3)

ta_lines

INTEGER

Ta_ldone

INTEGER

Ta_savdate

DATE

Ta_savtime

INTEGER

Ta_workdate  DATE
Ta_worktime

INTEGER

Sap_tabnam

CHAR(10)

Sap_mestyp

CHAR(30)

durch die Schnittstelle zur
Laufzeit generiert
Konstant „IDOC“

Wird von der Schnittstelle
berechnet (Anzahl Datensätze
mit derselben ta_id)
Wird von der Schnittstelle
berechnet (Anzahl Datensätze
mit derselben ta_id)

Konstant „099“

Beschreibung der
Strukturart
Status der
Verarbeitung
Anzahl der
Datensätze in der
Transaktion
Anzahl der
verarbeiteten
Datensätze in der
Transaktion
Datum des Erhalts
aus HYDRA
Uhrzeit des Erhalts
aus HYDRA
Datum der Übergabe  Format mm/dd/yyyy
Anzahl Sekunden seit
Uhrzeit der
Mitternacht
Übergabe
Konstant „EDI_DC40“
Name der
Tabellenstruktur
Nachrichtentyp

Anzahl Sekunden seit
Mitternacht

Format mm/dd/yyyy

Aktuell werden nur Nachrichten
HY72ADRCK_SC (siehe
Feinplanungsdaten aus HYDRA

Bemerkung

Beispiel

Verknüpfung zwischen Tabelle
HYSAP_OUT_DATA und
HYSAP_OUT_CTRL

DBLINK20190509143210

IDOC

099

8

0

08/06/2019

65498

08/06/2019
65500

EDI_DC40

HY72ADRCK_SC

Sap_mesfct

CHAR(3)

Nachrichtenfunktion  Nicht relevant

(Nachricht HY72ADRCK_SC))
verarbeitet

- 29 -

Datenstruktur
Als Datenstruktur in den Schnittstellen-Tabellen kommt das SAP iDOC Format mit folgenden
Nachrichtentypen zum Einsatz:

Nachrichtentyp HY72PPS (Auftrag)
Referenzdokumente: 20190521_FRAM_GK_INTERFACES,
FRAM_interface_datamapping_17052019_Ergaenzung_2307.xlsx

Dieser Nachrichtentyp enthält folgende Segmente; die für die aktuelle Projektphase relevanten
Segmente sind mit einem ! gekennzeichnet:

HY72_AU_HD_001_A (order header) !
│ ├ HY72_AU_INFO_AI_001_A (long texts)  !
│ └ HY72_AU_USRFLD_001_A (user fields) !
├ HY72_AFOLG_001_A (Sequence) !*
├ HY72_AG_HD_001_A (operation data – part 1)  !
│ ├ HY72_AG_HD_002_A (operation data – part 2)
│ ├ HY72_AG_KOMPL_001_A (component list)
│ │ └ HY72_AG_KOMPL_USRFLD_001_A (comp. user fields)
│ ├ HY72_AG_FHM_001_A (PRT / resources)
│ ├ HY72_AG_DOC_001_A (documents)
│ ├ HY72_AG_INFO_AI_001_A (long texts)
│ ├ HY72_AG_USRFLD_001_A (user fields) !
│ └ HY72_AG_RF_001_A (MPL-RF-specific data)
└ HY72_FERTVAR_001_A (production variants)

* Zu diesen Segmenten steht noch eine Detailabsprache und Bereitstellung von Beispieldaten aus

Typspezifikationen
Innerhalb der Segmentdaten gelten bei der ausgehenden Nachricht (HY72PPS) folgende
Datentypspezifikationen als Grundlage:

Nachrichtentyp HYADRCK_SC (Feinplanungsdaten)
Referenzdokumente: 20190521_FRAM_GK_INTERFACES,
FRAM_interface_datamapping_17052019_Ergaenzung_2307.xlsx, EIS-EFD_81 de.pdf

Dieser Nachrichtentyp enthält folgende Segmente; die für die aktuelle Projektphase relevanten
Segmente sind mit einem ! gekennzeichnet:

HY72ADRCK_SCHEDULE (Feinplanungsdaten) !

Typspezifikationen
Innerhalb der Segmentdaten gelten bei der eingehenden Nachricht (HY72ADRCK_SC) folgende
Datentypspezifikationen als Grundlage:

- 31 -

Umsetzung ERP Export zu MES HYDRA
Produktionsaufträge aus der WinLine sollen vom verantwortlichen Mitarbeiter selektiv aus dem
WinLine PPS Leitstand exportiert werden.

Hierzu wird in der Maske „Leitstand“ eine neue Schaltfläche „Übergabe MES“ bereitgestellt, welche
alle im Leitstand selektierten Produktionsaufträge als Nachrichtentyp HY72PPS in die
Schnittstellentabellen bereitstellt.

Organisatorisches

Arbeitsplatz- (=WinLine Ressourcen) und Auftragsnummern
Referenzdokument: EIS-ERP_81 de.pdf (S. 10)

Im MES System müssen bestimmte Konventionen hinsichtlich der Nummern eingehalten werden, da
diese aus den WinLine ERP Daten resultieren, müssen diese bei der Stammdatenpflege eingehalten
werden:

-
-
-

Keine Kleinbuchstaben
Keine Leerzeichen
Keine Umlaute bzw. Sonderzeichen

- 32 -

Begriffsdefinitionen Auftragsnummer
Referenzdokument: EIS-ERP_81 de.pdf (S.11)

In der MES Schnittstelle wird hinsichtlich der Auftragsnummer wie folgt unterschieden:

Auftragsnummer
Das Feld Auftragsnummer (AUNR) enthält die reine Auftragsnummer, wie sie in der WinLine PPS
bekannt ist.

Hinweis zu Zeilennummer
Der Bestandteil Positionsnummer der Auftragsnummer soll 2stellig alphanumerisch übergeben
werden („00“-„99“); hierzu wird das Feld Positionsnummer (alphanumerisch) über einen SQL Trigger
mit dem 2stelligen Wert aus der internen Zeilennummer (numerisch) befüllt.

Diese wird dann als Bestandteil der PPS Auftragsnummer verwendet.

Hinweis  zur Feldlänge
Die Länge der Auftragsnummer ist in HYDRA mit 8 Stellen definiert, daher werden längere Werte
linksbündig abgeschnitten, bzw. kürzere Werte mit Leerzeichen aufgefüllt:

AB12345.01 => AB12345.01

INTERN55  => INTERN55

TEST1 => TEST1. . . (3 leerzeichen)

Arbeitsgangnummer
Die Arbeitsgangnummer (Feld AGNR) bezeichnet einen WinLine Arbeitsschritt eines Auftrages.

Folgennummer
Bei framas kommt das MES Modul APF zum Einsatz, welches es ermöglicht Arbeitsgänge in parallele
Folgen einzuplanen.

Hierbei ist die Stammfolge 0 der Hauptstrang der Produktion und jede parallele Folge wird ab 1
fortlaufend nummeriert (Referenzdokument BDE-APF_82.pdf).

In der WinLine werden parallel stattfindende Prozesse durch dieselbe Reihenfolgennummer
innerhalb der Stückliste gekennzeichnet. Der Aufbau wird im Abschnitt Ermittlung der
Arbeitsgangnummer erläutert.

Hinweis: geschachtelte Parallele Tätigkeiten werden nicht unterstützt!

- 33 -

MES Auftragsnummer
Die MES Auftragsnummer (Feld ANR) fasst die Auftrags-, Folgen- (bei paralleler/sequenzieller
Bearbeitung von Arbeitsgängen) und Arbeitsgangnummer zusammen.

Auftrag AB68841, Position 01 wird zu:

68841.0100400
<Auftragsnummer(8stellig)><Folgennummer(1stellig)><Arbeitsgangnummer(4stellig)>

- 34 -

Datenmapping ERP > HYDRA

Auftragsdaten (Nachricht HY72PPS)
Referenzdokumente: FRAM_interface_datemapping_17052019_Ergaenzung_2307.xlsx,
20190521_FRAM_GJ_INTERFACES.pdf, EIS-DBI_30.pdf

Im Folgenden werden nun aus der Gesamtmenge aller Nachrichtenfeldern die Felder aufgelistet,
welche aus von der WinLine befüllt werden (relevanter Auszug).

Abbildung 1 Auftragsdatenhierarchie

- 35 -

Segment HY72_AU_HD_001 (Auftragskopf)
Es wird in der aktuellen Projektphase immer das Segment-Suffix „_A“ (für Neuanlage) angehängt (also HY72_AU_HD_001_A)

Hinweis zur MES Auftragsnummer
Diese ist in HYDRA mit 8 stellen definiert, daher werden längere Werte links abgeschnitten, bzw. kürzere Werte mit Leerzeichen aufgefüllt:

AB12345.01 => AB12345.01

INTERN55  => INTERN55

TEST1 => …TEST1

Feld
AUNR

Typ
CHAR(40)

Beschreibung HYDRA  Quelle
Auftragsnummer

Produktionsauftragsnummer

Bemerkung
Diese besteht bei Kundenaufträgen aus
„Kundenauftragsnummer.Zeilennummer“;

Beispiel
AB12345.01

AUART

CHAR(5)

HYDRA Auftragsart

Auftragskategorie

Hinweis zu Zeilennummer:
Der Bestandteil Positionsnummer der
Auftragsnummer soll 2stellig
alphanumerisch übergeben werden („00“-
„99“); hierzu wird das Feld
Positionsnummer (alphanumerisch) über
einen SQL Trigger mit dem 2stelligen Wert
aus der internen Zeilennummer
(numerisch) befüllt.
Diese wird dann als Bestandteil der PPS
Auftragsnummer verwendet
Die in der WinLine hinterlegte
Auftragskategorie muss auch in HYDRA
vorhanden sein.

0

ATK

CHAR(40)

Artikelnummer

Artikelnummer
Produktionsauftrag

1112010001-069-860

ATKBEZ

CHAR(40)

Artikelbezeichnung

Artikelbezeichnung

KDBEZ

CHAR(40)

Kundenbezeichnung

Kontoname

KDAUNR
EXTPRIO
SGE:B

CHAR(25)
CHAR(1)
CHAR(3)

Auftragsnummer
Priorität
Mengeneinheit

Auftragsnummer Kundenauftrag
Produktionsauftragspriorität
Colli EK des Artikels

SGR:GUTB  DEC(13, 3)
SGR:AUSB  DEC(13, 3)

Ziel Menge (Gut)
Ziel Menge
(Ausschuss)

Auftragsmenge
Errechnete Ausschussmenge

MATTYP

CHAR(10)  Materialtyp des

Konstante „SYSTEM“

Die ersten 40 Zeichen der
Artikelbezeichnung.
Bei längeren Bezeichnungen wird die
Artikelbezeichnung abgeschnitten und
erneut in die Infotext-Felder des Segment
HY72_AU_INFO_AI_001 (Langtexte)
geschrieben
Die ersten 40 Zeichen des Kontoname des
dem Produktionsauftrag hinterlegten
Kunden

Die Einheit muss auch in HYDRA vorhanden
sein

Aktuelles Tagesdatum + Pufferzeit  Die Anzahl der zu addierenden

DATFB

DATE

ZEIFB

TIME

DATSE

DATE

ZEISE

TIME

TERMART  CHAR(1)

Aktuelles Uhrzeit + Pufferzeit

Artikels
Früherster Start
(Datum)
Früherster Start
(Uhrzeit)
Spätestes Ende
(Datum)
Spätestens Ende
(Uhrzeit)
Terminberechnungsart  Kennzeichen Produktionsart

Produktionsende Uhrzeut

Produktionsende Datum

Zeiteinheiten ist noch zu definieren
Die Anzahl der zu addierenden
Zeiteinheiten ist noch zu definieren
Errechnetes Produktionsende der WinLine
PPS
Errechnetes Produktionsende der WinLine
PPS
R – Rückwärtsberechnung (Ende)
V – Vorwärtberechnung  (Start)

(Start-/Endeproduktion)

- 37 -

WM78

Adidas

AB123456
1
PRS

+0000001000.000
+0000000050.000

SYSTEM

08.05.2019

10:00:00

30.05.2019

14:00:00

R

Segment HY72_AU_INFO_AI_001 (Langtexte)
Segment wird nur übertragen, sofern ein zu übermittelnder Inhalt vorhanden ist (aktuell nur lange Artikelbezeichnung)

Es wird in der aktuellen Projektphase immer das Segment-Suffix „_A“ (für Neuanlage) angehängt (also HY72_AU_INFO_AI_001_A)

Feld

Typ

CHAR(40)

KEY

TYP

Beschreibung
HYDRA
Auftragsnummer

Quelle

Bemerkung

Beispiel

Produktionsauftragsnummer

Diese besteht bei Kundenaufträgen aus
„Kundenauftragsnummer.Zeilennummer“;

AB12345.01

Al

00000000
00000001
Artikelbezeichnung

Nur falls Artikelbezeichnung länger als 40
Zeichen

CHAR(2)

Datensatztyp

Konstant „Al“

SUBKEY:1  NUM(8)
SUBKEY:2  NUM(8)
INFO:BEZ

CHAR(20)

Reserviert
Zähler
Kurzbezeichnung

INFO:1
INFO:2
INFO:3
INFO:4

CHAR(80)
CHAR(80)
CHAR(80)
CHAR(80)

Infotext 1
Infotext 2
Infotext 3
Infotext 4

Konstant „00000000“
Konstant „00000001“
Konstant „Artikelbezeichnung“
sofern in Segment
HY72_AU_HD_001 (Auftragskopf)
die Artikelbezeichnung länger als
40 Zeichen ist
Artikelbezeichnung (1-80)
Artikelbezeichnung (81-160)
Artikelbezeichnung (161 – 240)
Artikelbezeichnung (241 – 255)

Segment HY72_AU_USRFLD_001 (Benutzerfelder des Auftragskopfs)
Segment wird nur übertragen, sofern ein zu übermittelnder Inhalt vorhanden ist (aktuell Lieferdatum)

Es wird in der aktuellen Projektphase immer das Segment-Suffix „_A“ (für Neuanlage) angehängt (also HY72_AU_USRFLD_001_A)

Datenermittlung

-

Produktionsauftragskopf (Arbeitsschritt 1 / Ebene 0) des WinLine Produktionsauftrages

- 38 -

Quelle

Bemerkung

Feld

Typ

AUNR

CHAR(40)

USRFLD

CHAR(8)

FU:1

DATE(10)

Beschreibung
HYDRA
Auftragsnummer

Schlüssel
Benutzerfeld
Benutzerfeld 1

Produktionsauftragsnummer

Konstant „U_FRAM“

LTC

FU:2

DATE(10)

Benutzerfeld 2

LTCB

Beispiel

AB12345.01

U_FRAM

05/15/2019

05/15/2019

Diese besteht bei Kundenaufträgen aus
„Kundenauftragsnummer.Zeilennummer“;
Noch nicht final festgelegt

Aus Kundenauftragszeile. Siehe Neue
Terminfelder in ERP
Berechnung der Liefertermine, siehe
Referenzdokument ETD Calculation
Template.xlsx
Aus Kundenauftragszeile. Siehe Neue
Terminfelder in ERP
Berechnung der Liefertermine, siehe
Referenzdokument ETD Calculation
Template.xlsx

Segment HY72_AG_HD_001 (Arbeitsgänge)
Arbeitsgänge entsprechen den WinLine Arbeitsschritten kombiniert mit den darin enthalten Tätigkeiten.

Es wird in der aktuellen Projektphase immer das Segment-Suffix „_A“ (für Neuanlage) angehängt (also HY72_AG_HD_001_A)

Ermittlung der Arbeitsgangnummer
In der WinLine wird aus jedem Halbfertigerzeugnis ein Arbeitsschritt, wobei das Endprodukt immer den Arbeitsschritt 1 darstellt, und die Halbfertigprodukte
hierarchisch von der untersten Ebene bis zum Endprodukt (oberste Ebene) als Arbeitsschritte nummeriert werden.

Die in den Arbeitsschritten enthaltenen Tätigkeiten werden innerhalb des Arbeitsschrittes in der gemäß Stücklistenstamm eingestellten Reihenfolge
eingeplant.

Parallel stattfindende Prozesse werden durch die Vergabe derselben Reihenfolgennummer in der Stückliste gekennzeichnet. Diese werden dann in der
Schnittstelle als fortlaufend nummerierte Folge bereitgestellt (siehe Segment HY72_AFOLG_001 (Sequenzfolgen))

- 39 -

Anhand der folgenden exemplarischen Stückliste wird verdeutlicht wie aus der WinLine Struktur (Arbeitsschritte und Tätigkeiten) die MES HYDRA
Arbeitsgangnummer erzeugt wird, wobei die Reihenfolge der Arbeitsschritte umgedreht wird, da die Produktion von unten nach oben erfolgen muss.

Die Arbeitsgangnummer wird hierbei auf 4 Stellen (führende Null) aufgefüllt.

- 40 -

Beispielstückliste WM78
Hier ein Screenshot der WinLine Stückliste des Endprodukts; durch die mehrfache Vergabe der Reihenfolge 1 werden die Erzeugung der Halbfertigprodukte
HF02 und HF03 als parallel stattfindender Prozess (HF02 parallel zu HF03) gekennzeichnet und wird somit als Folge bereitgestellt:

In den parallel zu planenden Arbeitsgängen (hier das Halbfertigprodukt HF02) wird über die Textspalten „Absprungtätigkeit“ und „Rücksprungtätigkeit“
gekennzeichnet welche Arbeitsgänge in der Schnittstelle als Absprungtätigkeit/Rücksprungtätigkeit übergeben wird (in diesem Praxisbeispiel sind diese
identisch):

Visualisierung WinLine Produktionsauftrag
Die o.g. Beispielstückliste WM78 führt durch die Erzeugung eines Produktionsauftrages zu folgender Arbeitsschritt- und Tätigkeitsstruktur:

- 42 -

Durch die Festlegung derselben Reihenfolgennummer bei den Halbfertigprodukten HF03 und HF02 werden diese in der Schnittstelle als Folge übertragen; es
ergibt sich also folgende Reihenfolge bei der Übertragung der Arbeitsgänge:

- 43 -

Auftragsnummer 12345.01 (Kundenauftrag AB12345, Pos. 01)

Datensatzreihenfolge:

Folge 0 (Stammfolge)

12345.0100300 Spritzen Maschgr1 (Tätigkeiten Reihenfolge 0 im AS 3)
12345.0100102 Spritzgießen (Tätigkeiten Reihenfolge 2 im AS 1)

Folge 1 (Parallele Folge 1)
(Absprungsarbeitsgang „Spritzen Maschgr1“ 12345.010300)

12345.0110200 Spritzen Maschgr 2 (Tätigkeiten Reihenfolge 0 im Arbeitsschritt 2)

(Rücksprungarbeitsgang „Spritzen Maschgr1“ 12345.010300)

Visualisiert als Arbeitsgangnummern

- 44 -

Datenermittlung

-

Selektion Arbeitsschritte des WinLine Produktionsauftrages in der eingeplanten Reihenfolge

o

Innerhalb jedes Arbeitsschrittes werden die Tätigkeiten in der eingeplanten Reihenfolge zu einem kombinierten Datensatz ARBEITSSCHRITT-
TAETIGKEIT

Feld
ANR

Typ
CHAR(40)

Beschreibung HYDRA
MES Auftragsnummer

Quelle
[Auftragsnummer (max 8
Zeichen)][Folgennummer(stellig)][4
stellige Arbeitsgangnummer
bestehend aus Arbeitsschritt und
Reihenfolge der Tätigkeit]

Bemerkung

Beispiel
12345.0100101

AGBEZ
ATK

CHAR(40)
CHAR(40)

Arbeitsgangbezeichnung  Tätigkeitenbezeichnung
Artikelnummer

Artikelnummer

ATKBEZ

CHAR(40)

Artikelbezeichnung

Artikelbezeichnung

EXTPRIO
MGRP

CHAR(1)
CHAR(8)

Priorität
Ressourcengruppe

Produktionsauftragspriorität
Ressourcengruppennummer

OPT:PLAN
COLOR

ASTUFE
SGR:GUTB

CHAR(1)
CHAR(20)

Geplant
Farbe des Materials

Konstant „G“ (Gruppenplanung)
Ausprägungsbezeichnung „Farbe“

CHAR(1)
DEC(13, 3)

Berechtigungsstufe
Ziel Menge (Gut)

Konstant „1“
Auftragsmenge des
Halbfertig/Fertigproduktes

- 45 -

Halbfertig- oder Fertigprodukt
(je nach Ebene des
Produtionsauftrages)
Bezeichnung (40 Zeichen) des
Halbfertig- oder Fertigprodukt
(je nach Ebene des
Produtionsauftrages)

Es muss hier in der Stückliste
eine Ressourcengruppe
(Maschinengruppe) hinterlegt
werden (Kapazitätsplanung)

Falls Halbfertig/Fertigprodukt
mit Ausprägung geführt wird

Spritzen
HF-01

Biegezone

1
AR200H

G
Black

1
+0000001000.000

SGR:GUTP

DEC(13, 3)

SGR:AUSB

DEC(13, 3)

SGR:AUSP

DEC(13, 3)

SGE:B

SGE:P

CHAR(3)

Ziel Menge (Gut) für
primäre Mengeneinheit
Ziel Menge (Ausschuss)

Ziel Menge (Ausschuss)
für primäre
Mengeneinheit
Mengeneinheit

Auftragsmenge des
Halbfertig/Fertigproduktes
Errechnete Ausschussmenge des
Halbfertig/Fertigproduktes
Errechnete Ausschussmenge des
Halbfertig/Fertigproduktes

Colli EK des Artikels

CHAR(3)

Primäre Mengeneinheit

Colli EK des Artikels

RUEZ
RUEZ:ZUSCHL

NUM(8)
NUM(8)

Rüstzeit
Zusätzliche Rüstzeit

FREMDFERT

CHAR(1)

RLZ:EXPR
VERARBCODE
OPT:ERF
OPT:MULTIMNR

OPT:CNR
SZY

CHAR(6)
CHAR(6)
CHAR(1)
CHAR(1)

CHAR(1)
NUM(8)

Rüstzeit der Tätigkeit in Sekunden
Zusätzliche Rüstzeit der Tätigkeit in
Sekunden
Konstant „N“

Konstant „RLFZ“
Konstant „SYSTEM“
Konstant „J“
Konstant „N“

Kennzeichen
Fremdfertigung J/N
Restlaufzeit (Formel 1)
Verarbeitungscode
Erfassbar J/N
Parallele Fertigung J/N

Chargenpflichtig J/N
Sollzyklus in
Sekunden/1000

Konstant „N“
Zusatzfeld Artikelstamm
„Zyklusstamm“

TLG

NUM(8)

Teiligkeit

IMPFAKT
OPT:SPLIT

DEC(13, 3)
CHAR(1)

Impulsfaktor
Splittbar V/N
V = Ja, Arbeitsgang darf
gesplittet werden

- 46 -

Zusatzfeld Artikelstamm
„Multiplikator“
Konstant 1
Konstant „V“

+0000001000.000

+0000000050.000

+0000000050.000

Die Einheit muss auch in HYDRA
vorhanden sein
Die Einheit muss auch in HYDRA
vorhanden sein

Konstant 0

PRS

PRS

1800
0

Aktuell immer ein fixer Wert

N

Aktuell immer ein fixer Wert
Aktuell immer ein fixer Wert
Aktuell immer ein fixer Wert
Aktuell immer ein fixer Wert
(Telko 04.11.2019)
Aktuell immer ein fixer Wert
Im Zusatzfeld ist der Wert in
Sekunden gespeichert >>
umrechnen

Aktuell immer ein fixer Wert

RLFZ
SYSTEM
J
N

N
60000

1

1
V

N = Nein, Arbeitsgang
darf nicht gesplittet
werden
Hinweis:
V nur relevant bei BDE-
SSG, ADE-SPL, HLS-AGS,
ansonsten muss N
übergeben werden.
Max. Splittanzahl

Konstant 1000
Konstant 90
Konstant W
Konstant 110
Konstant W

Aktuell immer ein fixer Wert

1000
90
W
110
W

NUM(8)

MAXANZSPLIT
MENGEPROZ:UNTLI  DEC
OPT:UNTLI
MENGEPROZ:UEBLE  DEC
OPT:UEBLI

CHAR(1)

CHAR(1)

Segment HY72_AG_USRFLD_001 (Benutzerfelder des Arbeitsgangs)
Segment wird nur übertragen, sofern ein zu übermittelnder Inhalt vorhanden ist (aktuell die Ausprägung „Größe“ des Arbeitsganges)

Es wird in der aktuellen Projektphase immer das Segment-Suffix „_A“ (für Neuanlage) angehängt (also HY72_AG_USRFLD_001_A)

Datenermittlung

-
-

Siehe Segment HY72_AG_HD_001 (Arbeitsgänge)
Selektion Arbeitsschritte des WinLine Produktionsauftrages in der eingeplanten Reihenfolge

o

Innerhalb jedes Arbeitsschrittes werden die Tätigkeiten in der eingeplanten Reihenfolge zu einem kombinierten Datensatz ARBEITSSCHRITT-
TAETIGKEIT

Feld
ANR

Typ
Beschreibung HYDRA
CHAR(40)  MES Auftragsnummer

USRFLD

CHAR(8)

Schlüssel Benutzerfeld

Quelle
Auftrag - Arbeitsschritt -
sequence Number aus Stückliste
Konstant „U_FRAM“

Bemerkung

Beispiel
12345.0100101

Noch nicht final festgelegt

U_FRAM

FU:51

CHAR(20)

Benutzerfeld 10

Artikelgruppenbezeichnung

32

- 47 -

FU:52
FU:53

CHAR(20)
CHAR(20)

Benutzerfeld 11
Benutzerfeld 53

Hauptartikelnummer
Ausprägungsbezeichnung
„Größe“ des
Halbfertigproduktes

Dieses Feld wird am BDE-Terminal im
Feld Bemerkung 1
angezeigt

32
32

Segment HY72_AG_KOMPL_002 (Komponentenliste)
Komponentenliste entspricht den verwendeten Materialien des jeweiligen Arbeitsschrittes.

Es wird in der aktuellen Projektphase immer das Segment-Suffix „_A“ (für Neuanlage) angehängt (also HY72_AG_KOMPL_002_A)

NOCH OFFEN OB IN AKTUELLER PROJEKTPHASE BENÖTIGT

Bemerkung

Quelle
Auftrag - Arbeitsschritt -
sequence Number aus Stückliste
Artikelnummer
Komponente/Rohmaterial
Artikelbezeichnung
Komponente/Rohmaterial
Zeilennummer/Position der Zeile
in der Stückliste
Fix 1
Fix „M“

Beispiel
12345.0100101

PAKPW005

Pebax 5533

1

1
M

Feld
ANR

ATK

Typ
Beschreibung HYDRA
CHAR(40)  MES Auftragsnummer

CHAR(40)  Materialnummer

ATKBEZ

CHAR(40)  Materialbezeichnung

SLP

SLS
ART

CHAR(10)

Stücklistenposition

NUM(8)
CHAR(2)

Stücklistenstufe
Materialart:
"M" (Verbrauchs-
)Material
"T" Trägermaterial (nur
MPL für
Rollenfertigung)
"A" Abfallkomponente
(nur MPL für
Rollenfertigung)

- 48 -

"Z" Zuzweiger (nur MPL
für Rollenfertigung)
"I" Infokomponente

CHAR(10)  Materialtyp
MATTYP
VERBR
CHAR(1)
OPT_ERSB  CHAR(1)
OPT_WZW  CHAR(1)
SGR:GUT

Verbrauchsart
MPL-Rollenfertigung
MPL-Wechselpflichtig

DEC(13,3)  MPL: Einsatzmenge,

Fix „SYSTEM“
Fix „L“
Fix „N“
Fix „N“
Stücklistenmenge

Umgerechnet auf Fertigung eines Stücks

SYSTEM
L
N
N
0,015

bezogen auf die
Fertigung von 1
Artikel in der
Primärmengeneinheit
am Arbeitsgang
MPL: Mengeneinheit

SGE:GUT

CHAR(3)

Colli-EK aus Artikelstamm

KG

Segment HY72_AFOLG_001 (Sequenzfolgen)
Einstellung bzgl. Arbeitsgangreihenfolgen und Steuerung sequentieller / paralleler Prozesse. Siehe Beispielstückliste WM78

Es wird in der aktuellen Projektphase immer das Segment-Suffix „_A“ (für Neuanlage) angehängt (also HY72_AFOLG_001_A)

Datenermittlung

-
Selektion Arbeitsschritte des WinLine Produktionsauftrages in der eingeplanten Reihenfolge
-  Bei identischer Reihenfolgennummer wird dies als parallel stattfindender Arbeitsschritt eingeplant
-

Jede parallele Folge wird bei 1 beginnenden fortlaufend Nummeriert (0 = Stammfolge, 1 = 1. Paralleler Prozess, 2 = 2. Paralleler Prozess)

Feld
AUNR

Typ
CHAR(40)

Beschreibung HYDRA
Auftragsnummer

Quelle
Produktionsauftragsnummer

AFOLG
CHAR(6)
FOLGART  CHAR(1)

Folgennummer
Folgenart:

- 49 -

Bemerkung
Diese besteht bei Kundenaufträgen aus
„Kundenauftragsnummer.Zeilennummer“;

Beispiel
12345.01

Muss 0 bei Sequentieller Folge sein

1
P

AKTIV
ANRA

CHAR(1)
CHAR(40)

ANRR

CHAR(40)

S = Hauptsequenz
P = Parallelsequenz
A = Alternativsequenz
Aktiv J/N
Referenz
Absprungoperation
(MES Auftragsnummer)
Referenz
Rücksprungoperation
(MES Auftragsnummer)

Bei sequentieller Folge > LEER

Wenn befüllt dann ist es eine parallele
OP, sonst S

J
12345.0010101

Bei sequentieller Folge > LEER

Wenn befüllt dann ist es eine parallele
OP, sonst S

12345.0100101

- 50 -

Ablauf Datenexport ERP > HYDRA
Referenzdokumente: 20190521_FRAM_GK_INTERFACES.pdf, EIS-DBI_30.pdf

Um eine korrekte Verarbeitung der Datensätze zu gewährleisten, ist ein konkreter Ablauf
einzuhalten. Zuerst sind die Datensätze in die Tabelle HYSAP_INBOUND_DATA zu schreiben und
anschließend den Kontrolldatensatz in die Tabelle HYSAP_INBOUND_CTRL mit dem ds_Status ‚000‘.

Die Datensätze innerhalb einer Nachricht werden sequentiell verarbeitet, somit ist die Reihenfolge
ausschlaggebend für die Verarbeitung in HYDRA (siehe Segment HY72_AG_HD_001 (Arbeitsgänge)).

Verweis TransaktionsID
Nach dem Export in die Schnittstellen-Tabellen wird die generierte eindeutige TransaktionsID in die
dafür vorgesehene Spalte des Produktionsauftrages gespeichert, womit eine Referenzierung
Produktionsauftrag zu Schnittstellen-Tabelle ermöglicht wird.

Wird ein Auftrag mehrmals exportiert, wird immer die letzte TransaktionsID gespeichert.

Umsetzung Import aus MES HYDRA
Das einlesen der Feinplanungsdaten in die WinLine sollen vom verantwortlichen Mitarbeiter selektiv
aus dem WinLine PPS Leitstand angestoßen werden.

In einer weiteren Ausbaustufe kann dies auch zeitgesteuert im Hintergrund durchgeführt werden.

Hierzu wird in der Maske „Leitstand“ eine neue Schaltfläche „Einlesen aus MES“ bereitgestellt,
welche alle neuen Datensätze aus der Tabelle HYSAP_OUT_DATA abruft und verarbeitet (siehe
Ablauf Datenimport HYDRA > ERP).

Aktualisierung WinLine Daten

Aktualisierung Schnittstellenstatus
Beim Aufruf der Methode zum Import der MES Daten, wird anhand der Verweis TransaktionsID auch
der Status des vorigen Datenexports (ERP>MES) aktualisiert

Import HYDRA-Daten
Die vom MES zurückgelieferten Daten (Termine) werden in die entsprechenden WinLine Felder
geschrieben (siehe Neue Tabellenspalten in ERP (MDP 2)). Des Weiteren werden die Statusspalten
entsprechend aktualisiert.

Neben den Terminfeldern des Kundenauftrages, werden die Produktionstermine (Von/Bis) des
jeweiligen Arbeitsschrittes aktualisiert.

Datenmapping HYDRA > ERP

IST-Meldungen/Timeticket (Nachricht HY72ADRCK_TT)
Referenzdokumente: FRAM_interface_datemapping_17052019_Ergaenzung_2307.xlsx,
20190521_FRAM_GJ_INTERFACES.pdf, EIS-DBI_30.pdf

Im Folgenden werden nun aus der Gesamtmenge der Nachrichtenfeldern der Rückmeldungsdaten
die Felder aufgelistet, welche von der Schnittstelle in die WinLine übertragen werden (relevanter
Auszug).

Hinweis IST-Mengen-Buchungen
Die IST Mengen sind im ersten Projektschritt noch nicht relevant, da die Produktionsbuchungen
(Mengen) über die mobile Scannerlösung abgebildet werden.

Ansatz: Mengen als Information (Fortschritt) in den WinLine Arbeitsschritt zurückschreiben, um eine
Kontrolle der Lagerbuchungen im Vergleich zu den HYDRA Buchungen zu ermöglichen.

- 52 -

Segment HY72ADRCK_TT (Timetickets)
Beschreibung
HYDRA

Feld

Typ

Ziel

Bemerkung

ANR

CHAR(40)  MES

--- Zuordnungskriterium --

Beispiel

12345.0010101

KENN

CHAR(1)

EGR:GUTP  DEC_O(13,

3)

EGR:AUSP  DEC_O(13,

DATB

3)
DATE

DATE

DATE

Auftragsnummer
Kennzeichen des
Arbeitsschrittstatus
L – Wird
durchgeführt
E – Abgeschlossen
U – Unterbrochen
Produzierte Menge
(Gut)
Produzierte Menge
(Ausschss)
Zeitpunkt der
Terminalbuchung
(Login)
Datum der
Terminalbuchung
(Logoff)

--- nur Filtermerkmal --

Nur KENN = E und KENN = U ist relevant

E

IST Menge Produktionsbuchung  Wird in den Arbeitsschritt gespeichert

IST Menge Ausschussbuchung

Wird in den Arbeitsschritt gespeichert

NOCH NICHT RELEVANT

20190806

NOCH NICHT RELEVANT

20190806

Feinplanungsdaten aus HYDRA (Nachricht HY72ADRCK_SC)
Referenzdokumente: EIS-EFD_81.pdf,
FRAM_interface_datemapping_17052019_Ergaenzung_2307.xlsx,
20190521_FRAM_GJ_INTERFACES.pdf, EIS-DBI_30.pdf

Im Folgenden werden nun aus der Gesamtmenge der Nachrichtenfeldern der Rückmeldungsdaten
die Felder aufgelistet, welche von der Schnittstelle in die WinLine übertragen werden (relevanter
Auszug).

Hinweis Feinplanungsdaten
Die Feinplanungsdaten (Schedule) aus HYDRA werden bei folgenden Operationen bereitgestellt:

1. Einplanung einer Operation

2. Neuplanung einer bereits geplanten Operation

3. Entfernen einer bereits geplanten Operation

Segment HY72ADRCK_SCHEDULE

Feld

Typ

Beschreibung
HYDRA

Ziel

ANR

CHAR(40)  MES

--- Zuordnungskriterium --

Bemerkung

Beispiel

12345.0010101

DATB

DATE(8)

ZEIB

TIME(6)

DATE

DATE(8)

ZEIE

TIME(6)

AKTION

CHAR(2)

Auftragsnummer
Geplanter
Starttermin der
Produktion
Geplante Startzeit
der Produktion
Geplanter Endtermin
der Produktion
Geplanter
Endzeitpunkt der
Produktion
Aktionskennzeichen:
M – Die Operation
eingeplant
U – Die Operation
wurde umgeplant
G – Die Operation
wurde ausgeplant

Arbeitsschritt Start

Format JJJJMMTT

20190806

Arbeitsschritt Start

Format HHMMSS

Arbeitsschritt Ende

Format JJJJMMTT

Arbeitsschritt Ende

Format HHMMSS

134010

20190807

101510

Aktualisierung der Termin- und
Statusspalten  (siehe Neue Terminfelder in
ERP sowie Statusspalten)

M

M / U:
eintragen / setzen der Termine
G:
entfernen der Termine

Ablauf Datenimport HYDRA > ERP
Referenzdokumente: 20190521_FRAM_GK_INTERFACES.pdf, EIS-DBI_30 de.pdf, EIS-EFD_81 de.pdf

Die Datensätze der Rückmeldungsinformationen werden von HYDRA in die Tabelle
HYSAP_OUT_DATA mit dem Status DS_STATUS=000 geschrieben.

Die Schnittstelle setzt dann Status aller neuen Datensätze wie folgt:

-  Verarbeitung: HYSAP_OUT_DATA.DS_STATUS = 100
-  Verarbeitung abgeschlossen: HYSAP_OUT_DATA.DS_STATUS = 099
-

Erzeugen des Kontrolldatensatz in HYSAP_OUT_CTRL und Verknüpfung mit einer eindeutigen
Transaktionsnummer

Fragen und Aufgaben
Frage / Aufgabe
Bearbeitung der gelb
markierten Rückfragen
Freigabe Konzept

Zuständig
framas

framas

Status / Antwort

Termin

