---
title: "Vorlagendefinition - Individuelle Formulare"
source: "https://www.mesonic.com/cwlhelp/index.html#!WordDocuments/vorlagendefinitionindividuelleformulare.htm"
author:
published:
created: 2026-05-25
description:
tags:
  - "clippings"
---
### Template definition - Custom forms

In this program area, existing templates can be edited or new templates can be defined.

![](https://www.mesonic.com/cwlhelp/ImagesExt/image862_959.jpg)

The basic template settings can be found in the upper section. Below that, the template can be customized in the "Template Definition" section.

Template

![](https://www.mesonic.com/cwlhelp/ImagesExt/image862_960.png)

Template type

This section displays the type of template, i.e., in which program area of WinLine it can be used.

Ø Designation

The name of the template can be entered here.

Notice

When creating a new template, an existing template can be copied by pressing the F9 key.

![](https://www.mesonic.com/cwlhelp/ImagesExt/image862_961.png)

Options

![](https://www.mesonic.com/cwlhelp/ImagesExt/image862_962.png)

This section allows you to configure various important settings. The following options are described in the ["Transaction Data - Receipts" section of the Templates](https://www.mesonic.com/cwlhelp/WordDocuments/vorlagendestypsbewegungsdatenbelege.htm) chapter:

Document center as a table

menu item

ü Changeable document center

WebService template

If this checkbox is activated, the template can be used for export/import with web services. Additionally, the template can also be used in the EXIM windows (EXIM master data, batch posting EXIM, batch document) with the ODBC driver option "97 XML (Web service)". Furthermore, a template defined in this way can also be integrated into the "HTML editor".

Ø Anonymization template

If this option is enabled, the template can also be used for anonymization processes (see also the chapter "Anonymization").

Ø Number replacement

This setting can only be selected if the template is of the type "Custom Form" and corresponds to the following template type:

Master data - personal accounts

Master data - prospective customers

Master data - Contacts

Movement data - CRM

By activating "number replacement", the name of the record is displayed in the input field instead of the number (account numbers, prospect number or contact number) after entering a number.

Example - Personal account master data

![](https://www.mesonic.com/cwlhelp/ImagesExt/image862_963.png)

Update submandant

This option is only available for "individual forms" in the "Master Data" area. It allows you to control whether records edited with this template are also "copied" to the sub-clients, meaning the changes are also transferred to the associated sub-clients.

Notice

This function can only be used if the "Group Consolidation" program is licensed.

Ø Copy additional fields

This option is only available when using a template from the "Master Data" section. Activating the checkbox ensures that additional and property fields are also copied when copying master data (F9 key).

Advertisement

![](https://www.mesonic.com/cwlhelp/ImagesExt/image862_964.png)

Show description

This option can only be selected if the template is a "Custom Form". It causes the result to be displayed next to the input fields containing a matchcode. The description fields offer the same option as in many forms: switching directly to different windows (selectable with the right mouse button).

Example - Personal account master data

![](https://www.mesonic.com/cwlhelp/ImagesExt/image862_965.png)

Notice

In WinLine mobile, the description is always displayed due to the space-saving display.

Display OIF

If the template is of the type "Individual Form", this option allows you to display an object-oriented information form (OIF) in the right-hand area or below the form (to be defined separately for each device). This displays specific information about the currently active record, and the information displayed can be customized via form adjustments.

Danger

If the option has been enabled in the template, the OIF can be disabled at any time while using the template by clicking the "Show OIF" button. However, this setting is not saved for each user.

Example - Personal account master data

![](https://www.mesonic.com/cwlhelp/ImagesExt/image862_966.png)

Note - OIF form customization

A standard form is displayed in the OIF area for each template type:

Master data personal accounts - P99W504OIF

Master data general ledger accounts - P99W527OIF

Master data of prospective customers - P99W528OIF

Master data article - P99W529OIF

Master data contacts - P99W572OIF

Project master data - P99W638OIF

ü Movement data receipts (program "Record receipts") - P99W625OIF

ü Movement data receipts (program "Batch entry of receipts") - P99W570OIF

CRM movement data - P99W520OIF

However, an alternative form can also be used for each template, whereby **Vxxx** (xxx => template number) must be appended to the standard name.

Example

P99W504OIF **V15** \- this form is used for the personal account template with the number 15.

Ø Window width

The "Window width" setting can only be edited for "custom forms". This setting controls the width of the opened window for each device, which in turn makes the input fields appear wider. The following options are available:

ü 0 - automatically  
The window width is based on the largest entry (column "Columns") from the definition table.

For 1 to 4 columns:  
The window width is displayed according to the selected setting. The largest entry (column "Columns") from the definition table must not be less than the width shown.

Template definition

![](https://www.mesonic.com/cwlhelp/ImagesExt/image862_967.jpg)

In the template definition section, the required fields can be assigned to the template. Depending on the template type and format, different data ranges are available in the left-hand data fields table. Special fields, including those of the "CRM" and "Documents" types, are described in detail in the [Excursus chapter.](https://www.mesonic.com/cwlhelp/WordDocuments/exkurs.htm)

Table "Data Fields"

![](https://www.mesonic.com/cwlhelp/ImagesExt/image862_968.png)

Search term

Here, you can enter and confirm a search term in the provided data fields to find matching entries. Removing and confirming the (empty) search term will display all entries in the data table again.

Notice

This is a full-text search, meaning that entering "leit" would find the "Postal Code" field.

Table "Data fields"

Depending on the template type and format, different data ranges are available in the table. Selecting the folder icon allows you to open these ranges and copy fields into the definition table.

A field can be added by pressing "Enter", "double-clicking", "drag and drop", or by using the icon . To remove a field, the icon must be selected.

Notice

Once a field has been copied, it is no longer available in the "Data Fields" table. This means each field can only appear once in the template.

Special features

The table also displays several areas intended for special cases:

Export Fields :  
The export fields section displays data fields that can only be exported (account balances, inventory levels, etc.). These fields can only be used if the template is intended for data export.

Placeholders are only used for data import if,  
for example, the file to be imported contains a field that cannot or should not be imported.

Tabs:  
When using the "Custom Form" template type, the template fields can be divided into tabs to make the data entry form clearer. Double-clicking a tab moves it to the right side, where its label can be changed; this new label will then be used as the tab name.

Tables:  
With the template type "Individual form", complete tables (e.g., a contact person table, a relationship table, or an XRM table) can be integrated into the template for certain template types.

Extension Fields :  
The extension fields are freely definable input fields. These were originally designed for the WinLine PDMS and are displayed there automatically. If these fields are used in a template used elsewhere, they are generally available during data entry, with storage taking place in a so-called "XML bag."  
This data cannot be accessed via WinLine LIST or other standard WinLine reports!

Table " Template Data Fields "

![](https://www.mesonic.com/cwlhelp/ImagesExt/image862_972.jpg)

The " Template Data Fields" table displays the fields contained in the template. When a new template is created, the so-called "required fields" are displayed here.

Note - Required fields

In the master data area, there are fields that must either be pre-filled or entered when creating a new account (e.g., "BKZ 1" and "BKZ 1 Change Account" in the account master). These fields are automatically checked in the "Display" column when a new template is opened. There are several ways to combine these columns for editing.

In the first option, the field is locked for editing and the value in the "Default" column is fixed. Otherwise, newly created accounts cannot be saved.

Example

![](https://www.mesonic.com/cwlhelp/ImagesExt/image862_973.png)

Alternatively, the field can be enabled for editing, but the desired value can be automatically pre-filled. In this case, the value can still be overwritten if desired .

Example

![](https://www.mesonic.com/cwlhelp/ImagesExt/image862_974.jpg)

As a third option, the data field can be enabled for editing and NO value can be suggested.

Example

![](https://www.mesonic.com/cwlhelp/ImagesExt/image862_975.jpg)

Ø License plate

The first column indicates the type of field. The following options are available:

ü \- Mandatory field  
These are the fields that cannot be removed from the template and must always be present.

ü \- Normal field  
These are "normal" fields that have been added to the template.

ü \- Export field  
These are fields that may only be used for exporting data.

ü \- Placeholder  
These are fields that are present in an import file, for example, but are not used or needed in WinLine.

Tabs \-  
If templates are also used for data entry, the fields can be divided into different tabs. Such tabs are indicated by this symbol and can be titled in the "Field" column.  
Additionally, the "Columns (xxx)" column allows you to specify how many columns the tab should be divided into, with options "1 to 4" available. This determines how many columns the subsequent fields (up to the next tab or heading) should be divided into. The program then handles this division automatically.

Headings divide fields into sections. The heading label can be entered in the "Field" column. Additionally , the "Columns (xxx)" column allows you to specify how many columns the heading fields should be divided into, with options "0 to 4". With the "0 - automatic" option, WinLine uses the tab setting.  

Table \-  
For certain template types for custom forms, tables for entering information can be integrated into the template (e.g., contact persons for personal accounts). If a table has been inserted into the template, the number of rows to be displayed in the (last) column, "Rows," can be defined.

Ø Selection

By checking the box, multiple entries can be removed from the table at once by selecting the remove icon.

Notice

This checkbox cannot be selected for mandatory fields.

Ø Field

The field name is displayed here and can be edited. The original name can be viewed at any time in the "Original Name" column.

Ø Display (Desktop)

By checking the box, it is decided whether the field will be visible later when accessed via CWL or via WinLine mobile with the Desktop view and thus be available for editing or not.

Average display (tablet)

By checking the box, it is decided whether the field will later be visible via WinLine mobile in tablet view and thus be available for editing or not.

Average display (Phone)

Durch Setzen der Checkbox wird entschieden, ob das Feld später via WinLine mobile mit der Ansicht Phone sichtbar ist und damit zur Bearbeitung freigegeben sein soll oder nicht.

Ø Vorbelegen

Durch Aktivierung der Checkbox kann eine Vorbelegung (siehe Feld "Vorbelegung") hinterlegt werden.

Ø Vorbelegung

In diesem Feld kann durch Eingabe eines Textes oder Wertes das entsprechende Datenfeld für die Bearbeitung vorbelegen werden.

Hinweis

Die u.a. für die Typen "CRM" und "Belege" bestehenden Sondereinstellungen können dem Kapitel [Exkurs](https://www.mesonic.com/cwlhelp/WordDocuments/exkurs.htm) entnommen werden.

Ø Pflichtfeld

Diese Option steht nur bei "individuellen Formularen" zur Verfügung. Damit kann gesteuert werden, wie das Feld im Fenster behandelt werden soll, wobei es 4 verschiedene Möglichkeiten gibt:

ü 0 - Eingabefeld  
Es handelt sich um ein normales Eingabefeld.

ü 1 - Nur-Lese-Feld  
Der Inhalt des Feldes wird angezeigt, das Feld darf aber nicht bearbeitet werden - das Feld wird "gegrayed".

ü 2 - Pflichtfeld (muss aufgesucht werden)  
Das Feld muss einmal den Focus erhalten haben. Hierbei erfolgt keine Prüfung, ob das Feld auch ausgefüllt wurde (außer bei den Feldern, die vom Programm her einen Wert haben müssen). Diese Felder werden im Formular gelb hinterlegt dargestellt. Beim Speichern wird geprüft, ob auch wirklich alle Felder aufgesucht wurden.

ü 3 - Pflichtfeld (darf nicht leer bleiben)  
Das Feld muss einen Wert hinterlegt haben, sonst kann der Datensatz nicht gespeichert werden.

Hinweis

Diese Auswahl steht für alle aktiven (Option "Anzeigen" aktiviert), importierbaren Stammdatenfelder, Zusatzfelder, Eigenschaften und die Berechtigung zur Verfügung. Für alle anderen Feldtypen (Platzhalter, Register, Tabellen,...) kann in diesem Feld nichts eingegeben werden.

Ø Eingabe Beschreibung

Die "Eingabe Beschreibung" wurde grundsätzlich für "Erweiterungsfelder" konzipiert, welche wiederum ein Bestandteil des WinLine PDMS sind.

Wird diese Option in anderweitig genutzten Vorlage aktiviert, so kann neben dem Eingabefeld eine weitere Inforation erfasst werden, wobei der Typ der Eingabe hier definiert werden kann.

Achtung

Die Speicherung dieser Informationen findet in einem sogenannten "XML-Rucksack" stattfindet. Per WinLine LIST oder anderen WinLine Standard-Auswertungen kann auf diese Daten nicht zugegriffen werden!

Ø Spalten / Zeilen / Datum

Je nach Feld kann in dieser Spalte eingestellt werden…

ü … wie viel Spalten das Register erhalten soll.

ü … wie viel Spalten die Überschrift erhalten soll.

ü … wie viel Zeile die Tabelle erhalten soll.

ü … ob es sich um ein Datumsfeld mit oder ohne Uhrzeit handelt.

Ø Original-Bezeichnung

In dieser Spalte wird die originale Feld-Bezeichnung lt. WinLine angezeigt.

Ø Tabelle / Tabellenspalte

In diesen Spalten wird angezeigt, in welcher Tabelle und Spalte sich das Feld in der Datenbank befindet.

Ø AI-Frage

Hier wird, sofern vorhanden, eine AI-Frage angezeigt. Durch einen Doppelklick auf die Spalte wird - sofern für dieses Feld eine AI-Frage erlaubt ist - im unteren Bereich ein Feld geöffnet, wo die AI-Frage eingetragen werden kann.

Tabellenbuttons

![](https://www.mesonic.com/cwlhelp/ImagesExt/image862_984.png)

Ø Zeile hinauf / Zeile hinunter

Mit diesen Buttons können Felder innerhalb der Vorlage verschoben werden, wobei dieses auch per Drag & Drop möglich ist.

Ø Einschränkungen bearbeiten

Wird dieser Button aktiviert (kann nur bei Export/Import-Vorlagen des Vorlagentyps "Stammdaten" erfolgen), dann können Einschränkungen (über 2 neu eingeblendete Spalten) für das Programm "Stammdaten editieren" vorgenommen werden.

Beispiel

Wird z.B. das Feld "Preisliste" mit einer Einschränkung 1 bis 2 belegt, so erhält man eine entsprechende Meldung, wenn ein Wert außerhalb des eingeschränkten Bereiches (1-2) Feld eingetragen wird.

Ø AI-Frage bearbeiten

This button is only available for templates of the types "Personal Accounts", "Articles" and "CRM" and for the following field types:

Import /Export fields

Properties

ü authorization

Expansion fields

When the button is activated, another input field will appear.

Edit AI question

Opened. Here, a question can be entered that MesoAI should execute during the data import process and transfer the result to the corresponding field.

![An image containing text, a series, font, or a screenshot. Automatically generated description.](https://www.mesonic.com/cwlhelp/ImagesExt/image862_985.png "An image containing text, a series, font, or a screenshot. Automatically generated description.")

Once the text is confirmed, it will be transferred to the AI Question column in the table. Clicking the button again will close the field.

Average Excel output

By selecting the "Output to Excel" button, the contents of the table are transferred to Microsoft Excel.

Save table settings

The columns of a table can generally be moved to any position or adjusted in width. By selecting the "Save table settings" button, the settings are saved for each user and will be suggested again the next time the program is accessed.

Save all settings

Unlike "Save table settings", "Save overall settings" allows you to save multiple table layouts and load them as needed. Additionally, special table functions (e.g., "Group column") are also preserved during the saving process.