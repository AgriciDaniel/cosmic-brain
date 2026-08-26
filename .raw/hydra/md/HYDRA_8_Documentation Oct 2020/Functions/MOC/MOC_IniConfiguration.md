INI Configuration

1

INI Configuration

Summary

Menu

System Administration  System Settings  INI Configuration

Transaction code

inicfg

Function authorization

inicfg.*

Utilization

The INI configuration allows for existing INI entries to be changed or new entries to be created.

Integration

Keys/value pairs can be recorded for the generated INI entries using the INI data configuration

The individual functions and applications individually define which INI configurations are used within the

system and which possible entries exist for them.

Field Descriptions

Name

Technical name of the INI entry.

MOC User

Entries  may  be  created  for  a  specific  user  (a  uniquely  identifiable  GUI  user).  The  interpreting

application determines whether or not such a specific configuration is possible.

If this is not the case the field is assigned to “0”.

Comment

User-defined text for detailed descriptions

Responsibility area

Reference of the configuration to a responsibility area.

It might be necessary to create further detail records for the generated header record using the

INI Data Configuration.

MOC_IniConfiguration.docx

Version: 1.1.23272

Page 1 of 1

