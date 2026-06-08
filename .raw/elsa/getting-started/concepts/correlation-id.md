# Correlation ID

### Overview

A **Correlation ID** is a flexible identifier used to associate related workflow instances with each other and with external domain entities. This feature is particularly useful in scenarios where workflows are distributed, triggered asynchronously, or involve parent-child relationships. By assigning a Correlation ID to workflow instances, users can trace and analyze the journey of related workflows as they execute across systems or tie them to specific business objects like documents, customers, or orders.

### How is Correlation ID Used?

A **Correlation ID** is typically used to link workflow instances that are logically connected but run independently. The Correlation ID can also link workflows to specific domain entities. Here are some common use cases:

* **Parent-Child Workflow Relationship**: When a parent workflow dispatches child workflows (e.g., via message queues like RabbitMQ), each child workflow can share the same Correlation ID as the parent. This allows users to trace the entire execution chain across multiple workflows.
* **Correlating Workflows with Domain Entities**: In business processes, workflows often operate on domain entities such as **Documents**, **Customers**, **Orders**, or **Transactions**. A workflow can use a Correlation ID based on these entities' unique identifiers to track workflows related to a specific domain object.
* **Multi-Step Processes**: In long-running processes where different workflows represent different stages (e.g., order processing, shipping, billing), the same Correlation ID can be used to tie these stages together, enabling users to monitor and manage the entire process as one cohesive operation.
* **Distributed Systems**: In distributed systems where workflows may be triggered by events or messages across multiple services, the Correlation ID ensures that related workflows are easily identifiable, even though they run in different contexts or environments.

### When is Correlation ID Assigned?

The Correlation ID can be assigned in two ways:

1. **Manual Assignment**: When creating or dispatching a workflow instance, the Correlation ID can be explicitly set via API calls or workflow triggers. This is useful when the Correlation ID is already known, such as when the workflow is part of a larger business process or is tied to a specific domain entity like a customer or order.
2.  **Correlate Activity**: You can use the **Correlate Activity** within the workflow to dynamically assign or update the Correlation ID during workflow execution. This is especially useful when the Correlation ID is only known after the workflow has started. For example, in a workflow processing an order, you can use a JavaScript expression that retrieves the **Order ID** (or any other domain-specific identifier) and assigns it as the Correlation ID. This ensures that the workflow is correlated with the appropriate entity, even if the identifier is determined at runtime.

    ```javascript
    // Example JavaScript expression to set the Correlation ID
    getOrder().Id
    ```

    In this scenario, the **Correlate Activity** will associate the current workflow instance with the provided Correlation ID, allowing it\
    to be linked to other workflows or entities, such as customers or documents. This method is powerful for scenarios where the Correlation ID depends on dynamic data that is only available during the execution of the workflow.

### Correlation with Domain Entities

One of the most powerful features of the Correlation ID is its ability to link workflows to domain entities. Here are some examples:

#### Documents

A document processing system may involve multiple workflows to handle the lifecycle of a document (e.g., reviewing, approving, and archiving). Each of these workflows can be assigned the **Document ID** as the Correlation ID, ensuring that all workflows related to the same document can be tracked together.

#### Customers

In customer-facing systems, workflows might handle different aspects of a customer lifecycle, such as registration, onboarding, and support. By using the **Customer ID** as the Correlation ID, you can group workflows that relate to the same customer, providing a unified view of all processes associated with them.

#### Orders

For e-commerce or order management systems, workflows often manage different stages of order fulfilment (e.g., processing, shipping, invoicing). Assigning the **Order ID** as the Correlation ID allows you to track all workflows involved in completing an order, ensuring traceability from the moment the order is placed to its delivery.

### Restrictions on Correlation ID

There are minimal restrictions on what can be used as a Correlation ID, making the system very flexible. However, some best practices are recommended:

* **String Format**: The Correlation ID is a string. It can be any alphanumeric value, UUID, or any other string-based identifier that suits the application's needs.
* **Uniqueness Across Instances**: While Elsa does not enforce uniqueness, the Correlation ID should ideally be unique across logically distinct workflow groups to avoid confusion during tracking and monitoring. For example, a **Document ID** or **Customer ID** should be used consistently to avoid overlapping identifiers.
* **Length and Characters**: Although Elsa does not impose strict length restrictions, it is recommended to keep the Correlation ID concise and easily readable. Avoid special characters that might interfere with logging systems or external tools used for monitoring.

### Monitoring and Observability

In many applications, workflows emit telemetry signals to monitoring tools (such as OpenTelemetry) that help track their execution. The **Correlation ID** plays a central role in this by ensuring that all related workflows are grouped together in the telemetry data. This makes it easy to:

* **Trace execution paths**: Visualize how data and actions flow between related workflows and domain entities.
* **Identify bottlenecks**: Quickly find delays or errors in a sequence of related workflows tied to a specific domain entity.
* **Improve debugging**: Simplify troubleshooting by focusing on the entire set of related workflows using the Correlation ID.

### Conclusion

The Correlation ID is a powerful tool for associating and tracking related workflow instances, as well as linking workflows to domain entities like **Documents**, **Customers**, or **Orders**. By leveraging Correlation IDs, developers can implement workflows that are traceable, observable, and better suited for complex, distributed, or asynchronous systems. The flexibility in assigning Correlation IDs allows them to be customized to the needs of any application or business process, ensuring easy integration with monitoring and observability solutions.
