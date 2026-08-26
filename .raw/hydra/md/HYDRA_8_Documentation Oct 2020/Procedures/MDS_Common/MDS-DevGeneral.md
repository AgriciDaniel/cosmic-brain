General notes on the MES Development Suite

1  General Notes

1.1  Overview

This document provides general information on the development and configuration of software using the

MES Development Suite.

You can use the MDS to customize existing software or to create your own applications.

1.2  Namespaces and scopes

1.2.1  Namespaces

Use namespaces to ensure that software of MPDV and of customers can be installed and operated free

of conflicts in the system. Namespaces are implemented using naming conventions of identifiers.

If  the  customer  makes  customizations  or  extensions,  the  customer  must  use  new  identifiers  in  the

customer namespace "u_???".

Category

Namespace

Explanatory notes

Customer

u_???

Names of artifacts, objects or other identifiers, which are
created by the customer or specifically for the customer,
must start with the prefix "u_". Case-sensitivity is not globally
specified. You use upper or lower case letters according to
the context.

Example of a service name (upper case letter):

U_MyObjectName.listObjects

Example of a database table (lower case letter):

u_myobjectname

MPDV

All other

Artifacts, objects or other identifiers, which are not included
in the namespace of customers, are reserved for
components of the standard system.

1.2.2  Scopes

The  system  contains  different  customization  levels  (scopes).  You  can  therefore  customize  standard

applications without changing the actual application. With this concept, you store the software artifacts in

customization levels (scopes) that overwrite the artifacts of the standard.

The following scopes are provided:

MDS-DevGeneral.docx

Version: 1.4.21554

Page 1 of 3

General notes on the MES Development Suite

Standard

MPDV delivers the standard applications in the standard scope.

Custom

In  the  custom  scope,  MPDV  delivers  customizations  of  the  standard  software  in  the  standard

namespace or customer-specific software in the customer namespace "u_???"..

Local

Customers use the local scope to customize the applications. In the local scope, you can customize

all applications, regardless of the namespace. The end customer is responsible for the content of

the local scope.

Software  artifacts  of  the  special  scopes  take  priority  over  the  artifacts  of  the  general  scopes.  The  local

scope has the highest priority, the standard scope the lowest priority.

Software  artifacts of the special scopes override the  artifacts of the  general scopes.  There are different

forms of overriding artifacts:

  Sequential execution: With program code (e.g. user exits of services), all existing program parts

of the different scopes are executed one after the other. First the program code of the general

scope  is  executed,  then  the  code  of  the  special  scope.  In  an  ideal  case,  the  underlying  data

structures  are  built  in  a  way  so  that  the  more  special  scopes  can  undo  actions  of  the  general

scopes.

  Merge:  A  file  or  object  of  the  special  scope  is  added  to  the  object  of  the  general  scope.  The

individual contents of the special scope overwrite and add to the defined contents of the file or the

object of the general scope. Example 1:  you can add further columns to a service configured in

the  standard  scope.  Here,  only  the  additional  columns  are  listed  in  a  configuration  file  in  the

custom  scope.  Example  2:  the  permitted  operators  of  a  service  parameter  can  be  overwritten

because the service parameter of the general scope is completely overwritten with the contents

of the more special scope.

  Replace:  A  file  or  object  of  the  special  scope  completely  replaces  the  object  of  the  general

scope, e.g. configuration files.

1.3

Important notes

Respect the namespaces and scopes.

Only use latin letters, underlines, numbers and dots in identifiers. Do not use a number as  first

character  of  an  identifier.  Only  use  dots  if  this  is  necessary  to  structure  an  identifier,  e.g.  to

structure service parameters (e.g. "person.name").

MDS-DevGeneral.docx

Version: 1.4.21554

Page 2 of 3

General notes on the MES Development Suite

Do not use special characters!

Special  characters  like  hyphen,  slant  line  or  umlauts  or  characters  outside  of  the  ASCII

character set can lead to errors in the system.

To  finally  install  your  extensions,  always  use  an  Update  Package  and  the  Maintenance

Manager. If you have only  deployed your extensions via "deploy by copy", the extensions can

be deleted in the course of a later update using the Maintenance Manager.

MDS-DevGeneral.docx

Version: 1.4.21554

Page 3 of 3

