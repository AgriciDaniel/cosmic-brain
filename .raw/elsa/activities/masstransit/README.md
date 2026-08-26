# MassTransit

MassTransit is an open-source distributed application framework for .NET that provides a consistent abstraction on top of the supported message transports.

It enables .NET developers to model messages as C# types, which can then be sent & received. To receive messages, one would typically write a Consumer.

When using the MassTransit module with Elsa, there is an additional method of sending & handling messages; through workflow activities.

## Messages as Activities﻿

Elsa makes it easy to send and receive messages that are modeled as .NET type. All you need to do is define your type and then register it with the MassTransit feature.

When a message type is registered, two new activities will be automatically available for use:

* Publish {activity type}
* {activity type}

The first activity will _publish_ your message. The second activity acts as a trigger and will start or resume your workflow when a message of this type is received.
