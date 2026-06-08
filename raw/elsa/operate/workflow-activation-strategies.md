# Workflow Activation Strategies

Workflows can be configured with an **activation strategy**, which controls whether a given workflow can be executed or not. For example, the _Always_ strategy will always allow the workflow to be executed, while the _Singleton_ strategy will only allow the workflow to be executed if an existing workflow instance isn't already in the _Running_ state.

Out of the box, Elsa ships with the following activation strategies:

<table><thead><tr><th>Strategy</th><th width="394">Description</th></tr></thead><tbody><tr><td>Always</td><td>Always allow the workflow to execute.</td></tr><tr><td>Singleton</td><td>Only allow the workflow to execute if there isn't already an instance of the same workflow running.</td></tr><tr><td>Correlation</td><td>Only allow the workflow to execute with a given correlation ID if there isn't already any other workflow running with the same correlation ID.</td></tr><tr><td>Correlated Singleton</td><td>Only allow the workflow to execute with a given correlation ID if there isn't already an instance of the same workflow running with the same correlation ID.</td></tr></tbody></table>
