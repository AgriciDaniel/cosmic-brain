ExternalUtils

1  ExternalUtils

1.1  Introduction

This document describes the ExternalUtils. You can use the ExternalUtils to store help functions or

libraries for all scopes in user exits and ExternalServices.

1.2  Availability

ExternalUtils are available from Service Pack7.

1.3  ExternalUtils

There are two directories where you can store utilities and libraries for all scopes. These two directories

are located in the instance directory of the WSP configuration (jdir/MOC/<InstanceNo> or

JHYDRADIR/MOC/<InstanceNo>).

1.3.1  Directory ext_util_jar

This directory must only include *.jar files in subfolders. Path: "jdir/MOC/<InstanceNo>/ext_util_jar“ bzw.

„JHYDRADIR/MOC/<InstanceNo>/ext_util_jar“.

JAR files must be stored in at least one subfolder with the company initials because otherwise

MPDV could overwrite the libraries of customers or vice versa. To prevent overwriting within the

company, you should use additional subfolders.

Using the directory "ext_util_jar", you can integrate libraries in ExternalJavaServices and user exits that

are accessible from all scopes. You can also integrate external libraries. The JAR files are only read once

upon the Tomcat start. New files are not recognized later on. Changes to existing files are reloaded when

the respective entry point is reloaded (ExternalService or user exit).

Example: A library MyLib.jar in ext_util_jar is used in an ExternalService "MySample.list". The respective

class is MySampleList.class. The class MySampleList.class provides the entry point for the request. The

class MySampleList would still be the entry point if the library MyLib.jar were used in another class

MyHelper.class if MyHelper.class is requested in MySampleList.class.

Class MySampleList.class in

jdir/MOC/<InstanceNo>/externalService/<Scope>/de/mpdv/MySampleList.class  or

JHYDRADIR/MOC/<InstanceNo>/externalService/<Scope>/de/mpdv/MySampleList.class

is reloaded because the time stamp of the file has changed and the development mode is enabled. Then

also the library MyLib.jar is reloaded.

MDS-ExternalUtils.docx

Version: 1.1.22381

Page 1 of 2

ExternalUtils

The same is true for the user exits.

This directory must not include *.class files!

1.3.2  Directory ext_util_classes

This directory must only include *.class files and configuration files in a JAVA package structure. Path:

jdir/MOC/<InstanceNo>/ext_util_classes“or „JHYDRADIR/MOC/<InstanceNo>/ext_util_classes“ The

package structure is important, otherwise MPDV might overwrite customers' libraries or a customer might

overwrite MPDV's.

You require a basis package that is based on the internet address, but without "www". (Example:

Internet address www.mpdv.de => basis package: de.mpdv). Under this basis package, you must

at least create one further package with the domain name from the repository, completely in lower

case letters.

Under this package, you can create any number of additional packages. You use these packages to keep

the *.class files of the own company from being overwritten by accident.

The *.class files are always reloaded when the entry points are reloaded. The changed, the new and the

missing *.class files are then considered at runtime. This behavior is only active if the development mode

is enabled. Otherwise the *.class files are only read once when the entry points are first requested. For

examples and description of the entry points, refer to the "directory ext_util_jar".

This directory must not include *.jar files!

MDS-ExternalUtils.docx

Version: 1.1.22381

Page 2 of 2

