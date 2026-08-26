Single Sign On Configuration

1  Single Sign On Configuration

This document describes the configurations required to enable Single Sign On functions.

Purpose

Single Sign On enables correspondingly configured users to log in to HYDRA using the MES Operation

Center (MOC).

Prerequisites

For using Single Sign On:







the license SIS-SSO is required.

the corresponding function needs to be enabled in the MES Operation Center.

the HYDRA users to be logged in by Single Sign On have to be configured.

Procedure: Activation of the Single Sign On function in the MES Operation

Center

The configuration option “EnableSso” has to be set to the value “true” in the file “system.config” to enable

the Single Sign On function. This should be configured in the “local” configuration level to perform this for

the entire system.

To do so, the file %moc%\local\conf\MOC\system.config has to include the below rows:

<?xml version="1.0" encoding="utf-8"?>
<Settings Version="0.0.0.0">
  <Setting Key="EnableSso" Description="" LastChanged="2012-04-10T11:40:21.6741804Z"

ValueType="System.Boolean" Version="0.0.0.0">

    <Value>
      <boolean>true</boolean>
    </Value>
  </Setting>
</Settings>

In  case  the  file  does  not  yet  exist,  it  has  to  be  created  and  the  above-mentioned  content  needs  to  be

entered.

If the file is already available it is sufficient to copy the blue rows only.

The  document  MOC  Configuration  Settings  (MOC_Configurations)  describes  the  procedure  of

distributing the file to all clients.

SSO_Configuration.docx

Version: 1.0.7418

Page 1 of 2

Single Sign On Configuration

Result

If  MOC  is  started  with  the  configuration  levels  “Local“  or  “User“  the  login  dialog  includes  an  option  that

allows for Single Sign On to be enabled.

Procedure: Activation of the function Single Sign On for HYDRA users

Single  Sign  On  transfers  the  Windows  login  details  (user  name  and  domain)  to  HYDRA.  HYDRA

searches for the user that has been assigned this login information. If HYDRA finds such a user this user

will be used for the login.

The  below  fields  have  to  be  edited  in  the  “users”  application  in  order  to  assign  a  HYDRA  user  to  a

Windows user







“SSO active” needs to be selected.

“SSO user” has to include the Windows user’s name.

“SSO domain” has to include the Windows user’s domain.

User and domain names are case-sensitive.

Result

The Windows user may check the option “Single Sign On” in the MOC login dialog and, as a result, log in

to the HYDRA system.

SSO_Configuration.docx

Version: 1.0.7418

Page 2 of 2

