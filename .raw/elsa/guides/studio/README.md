---
description: >-
  A comprehensive guide to using Elsa Studio, the visual designer and admin UI for Elsa Workflows v3.
---

# Elsa Studio

Elsa Studio is the visual designer and administrative interface for Elsa Workflows v3. It provides a web-based environment where you can create, edit, and manage workflows visually, monitor workflow executions, and configure your workflow automation system.

## What is Elsa Studio?

Elsa Studio is a Blazor-based web application that connects to an Elsa Server as its backend. It serves as your primary tool for:

- **Visual Workflow Design**: Create and edit workflows using an intuitive drag-and-drop interface
- **Workflow Management**: Organize, version, and publish workflow definitions
- **Instance Monitoring**: Track workflow executions, view their status, and inspect variables
- **Administration**: Manage workflow configurations and settings

Whether you're building simple automation tasks or complex business processes, Elsa Studio provides the tools you need to design and manage your workflows efficiently.

## Core Concepts for Studio Users

Before diving into the Studio interface, it's helpful to understand these key concepts:

### Workflows

A **workflow** is a sequence of activities that represents a business process or automation task. In Studio, you create workflows by placing activities on a canvas and connecting them to define the execution flow.

### Activities

**Activities** are the building blocks of workflows. Each activity represents a single unit of work, such as:
- Writing to a log
- Sending an HTTP request
- Making a decision based on conditions
- Setting or reading variables
- Triggering events

Activities have properties that you configure in the property panel, and they can produce outputs that other activities can use.

### Variables

**Variables** allow you to store and retrieve data within a workflow. You can:
- Define variables at the workflow level
- Set variable values using activities like `SetVariable`
- Access variable values in expressions throughout your workflow
- Pass data between activities using variables

Variables are essential for building dynamic workflows that respond to data and conditions.

### Inputs and Outputs

**Inputs** are data that workflows and activities receive:
- **Workflow inputs**: Data passed to the workflow when it starts
- **Activity inputs**: Properties you configure on each activity

**Outputs** are data that activities produce:
- Activities can have named outputs that subsequent activities can reference
- The last executed activity's result is available as `LastResult`
- Outputs can be used in expressions to make decisions or pass data forward

### Expressions

**Expressions** allow you to write dynamic values for activity properties. Instead of hardcoding values, you can use expressions to:
- Reference workflow variables
- Access activity outputs
- Perform calculations
- Make decisions based on data

Studio supports multiple expression types including JavaScript, C#, Liquid, and more. See the [Expressions guide](expressions.md) for detailed information.

## Studio Interface Overview

When you open Elsa Studio, you'll see several key areas:

### Sidebar Navigation

The left sidebar provides access to the main sections of Studio:

- **Workflows**: View and manage all workflow definitions
- **Workflow Instances**: Monitor running and completed workflow executions
- **Settings**: Configure Studio preferences (availability depends on your deployment)

### Workflow List

When you click "Workflows" in the sidebar, you'll see a list of all workflow definitions. From here you can:
- Create new workflows
- Edit existing workflows
- Publish or unpublish workflows
- Delete workflows
- View workflow versions

### Designer Canvas

The workflow designer is where you build your workflows:

- **Activity Toolbox**: Browse and search available activities (usually on the left)
- **Canvas**: The main area where you drag activities and connect them
- **Connections**: Visual lines showing the flow between activities
- **Zoom Controls**: Zoom in/out and fit the workflow to the screen

### Activity Inspector / Property Panel

When you select an activity on the canvas, the property panel (usually on the right) displays:

- **Activity Name**: Give your activity a descriptive name
- **Properties**: Configure the activity's input properties
- **Expression Type Selector**: Choose how to provide values (Literal, JavaScript, C#, etc.)
- **Output Settings**: Configure which outputs to capture as variables

This is where you'll spend much of your time configuring activities and writing expressions.

## Getting Started with Studio

To start working with Elsa Studio:

1. **Access Studio**: Navigate to your Elsa Studio URL (e.g., `https://localhost:6001`)
2. **Login**: Use your credentials (default: username `admin`, password `password`)
3. **Create a Workflow**: Click "Workflows" in the sidebar, then "Create Workflow"
4. **Add Activities**: Drag activities from the toolbox onto the canvas
5. **Configure Activities**: Click an activity to open its properties in the inspector panel
6. **Connect Activities**: Drag from an activity's outcome port to another activity
7. **Test Your Workflow**: Save and run your workflow to see it in action

## Further Reading

Explore these guides to learn more about using Elsa Studio effectively:

- **[Expressions](expressions.md)**: Learn how to use JavaScript and C# expressions to reference variables and create dynamic workflows
- **[Custom UI Components](custom-ui-components.md)**: Create custom property editors for activity inputs
- **[Integration](integration/README.md)**: Integrate Elsa Studio into React, Angular, Blazor, or MVC applications
- **[Studio Tour & Troubleshooting](../../studio/studio-tour-troubleshooting.md)**: Detailed walkthrough of the Studio interface with troubleshooting tips
- **[Workflow Editor](../../studio/workflow-editor/README.md)**: Advanced features of the workflow editor
- **[Running Workflows](../running-workflows/using-elsa-studio.md)**: How to execute and test your workflows

## Tips for Success

{% hint style="info" %}
**Naming Conventions**: Give your activities descriptive names. This makes it easier to reference their outputs and understand your workflow at a glance.
{% endhint %}

{% hint style="info" %}
**Start Simple**: Begin with simple workflows to learn the basics, then gradually add complexity as you become more comfortable with the tools.
{% endhint %}

{% hint style="info" %}
**Use Variables**: Variables are your friends! They make workflows more readable and maintainable by giving names to important values.
{% endhint %}

{% hint style="warning" %}
**Expression Types Matter**: When configuring activity properties, make sure you select the correct expression type (Literal, JavaScript, C#, etc.) for your use case. Using the wrong type is a common source of errors.
{% endhint %}

## Next Steps

Ready to dive deeper? Here are some recommended paths:

- **[Expressions guide](expressions.md)** - Learn how to work with variables and create dynamic workflows using JavaScript and C# expressions
- **[Custom UI Components](custom-ui-components.md)** - Learn how to create custom property editors for specialized activity inputs
- **[Integration guide](integration/README.md)** - Discover how to integrate Elsa Studio into your existing React, Angular, Blazor, or MVC application
