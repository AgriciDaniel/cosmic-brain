Advanced Object Configuration

1

  Advanced Object Configuration

Overview

HYDRA menu

System Administration  System Settings  Advanced Object Configuration

FEDRA menu

System Administration  System Settings  Advanced Object Configuration

Transaction code

adoc

Function authorization

adoc

Purpose

You can use the Advanced object configuration to configure specific objects additionally.

Integration

Advanced  object  configuration  is  a  central  function  used  by  numerous  applications/functions.  How  this

function is to be used is described in the documents dealing with the corresponding detail applications.

The user’s responsibility area is checked if they want do display and change defined configurations.

Field Descriptions

Object Type

Object type for which the configuration applies (MNR, TNR; MATTYP, …).

Object ID 1 – 4

Further keys by way of which an object (including the object type) can be identified uniquely. (DB

mapping object type => hyd_obj_attributes.key1: Object ID 1 – 4 => hyd_obj_attributes.key 2-5).

Parameter

The actual parameter for the configuration of the system object.

Parameter value

Value for the configuration

Responsibility area

Responsibility area of the configuration

Active

A filter with three statuses (tri-state)

-

-

active: all active configurations are displayed;

inactive: all inactive configurations are displayed;

MOC_AdvancedObjectConfiguration.docx Version: 1.2.23372

Page 1 of 2

Advanced Object Configuration

-

grayed out: active as well as inactive configurations are displayed.

Reference

Unique database reference to a data record (configuration). This reference does not have a specific

function and has been designed for information purposes.

Further notes

Please find below an overview of functions and processing methods configured by the advanced object

configuration.

This list does not make any claim to being exhaustive.

Area

Processing

MDE 8.1

Setting of outputs subject to status and posting scenarios

BDE 8.1

Waiting period processing machine: machine-specific definitions

Link

Link

Link

MOC_AdvancedObjectConfiguration.docx Version: 1.2.23372

Page 2 of 2

