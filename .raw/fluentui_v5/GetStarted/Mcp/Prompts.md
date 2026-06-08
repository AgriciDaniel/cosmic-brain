---
title: MCP Prompts
order: 0005.05
category: 10|Get Started
route: /Mcp/Prompts
icon: Chat
---

# MCP Prompts

MCP Prompts are **pre-defined prompt templates** that help you accomplish common tasks with Fluent UI Blazor. They provide structured starting points for conversations with your AI assistant.

## Available Prompts

{{ MCP Type=prompts }}

> [!NOTE] The Fluent UI Blazor MCP Server focuses primarily on **Tools** and **Resources** for documentation access. Prompt templates may be added in future versions based on community feedback.

## Suggested Prompt Patterns

The MCP server includes built-in prompts for common tasks. You can also use the patterns below when interacting with your AI assistant.

### Component Discovery

```
List all Fluent UI Blazor components in the [category] category
with their main purpose and key parameters.
```

**Example:**
```
List all Fluent UI Blazor components in the Input category
with their main purpose and key parameters.
```

### Component Implementation

```
Create a [component] with the following requirements:
- [requirement 1]
- [requirement 2]
- [requirement 3]

Show me the complete Razor code with explanations.
```

**Example:**
```
Create a FluentDataGrid with the following requirements:
- Display a list of products with Name, Price, and Category columns
- Enable sorting on all columns
- Add pagination with 10 items per page

Show me the complete Razor code with explanations.
```

### Parameter Exploration

```
Show me all parameters for [component], organized by:
1. Required parameters
2. Common optional parameters
3. Advanced/rarely used parameters

Include examples for each group.
```

### Enum Discovery

```
What are all possible values for [EnumName]?
Explain when to use each value with practical examples.
```

**Example:**
```
What are all possible values for ButtonAppearance?
Explain when to use each value with practical examples.
```

### Migration Assistance

```
I'm migrating from [old framework/version] to Fluent UI Blazor.
How do I convert this code:

[paste your current code]

Show me the equivalent Fluent UI Blazor implementation.
```

### Troubleshooting

```
I'm having an issue with [component]:
- Expected behavior: [what you expect]
- Actual behavior: [what happens]
- Current code:

[paste your code]

What might be wrong and how can I fix it?
```

### Best Practices Query

```
What are the best practices for using [component] in a [scenario]?
Include:
- Performance considerations
- Accessibility guidelines
- Common pitfalls to avoid
```

## Creating Custom Prompt Files

You can create your own prompt templates for your team:

### Step 1: Create a Prompts Directory

```
your-project/
├── .prompts/
│   ├── fluent-datagrid.md
│   ├── fluent-form.md
│   └── fluent-dialog.md
```

### Step 2: Write Prompt Templates

**`.prompts/fluent-datagrid.md`:**
```markdown
# Create a Fluent UI DataGrid

## Context
I need to create a data grid using FluentDataGrid component.

## Requirements
- Data source: [describe your data]
- Columns needed: [list columns]
- Features: [sorting/filtering/pagination]

## Expected Output
Please provide:
1. Complete Razor component code
2. C# code-behind for data loading
3. Any required CSS for custom styling
```

### Step 3: Reference in Chat

In your AI assistant chat:
```
@workspace Use the template in .prompts/fluent-datagrid.md to create
a grid for displaying customer orders with columns for OrderId,
CustomerName, OrderDate, and TotalAmount. Enable sorting and pagination.
```

## Future Prompt Support

The MCP specification supports server-provided prompts. Future versions of the Fluent UI Blazor MCP Server may include:

- **Component scaffold prompts** - Generate complete component templates
- **Form builder prompts** - Create forms with validation
- **Layout prompts** - Design page layouts with Fluent UI
- **Theme customization prompts** - Apply custom theming

## Contributing Prompts

Have a great prompt pattern that works well? Consider contributing it to the Fluent UI Blazor project:

1. Fork the repository
2. Add your prompt template
3. Submit a pull request

## Next Steps

- Explore [MCP Tools](/Mcp/Tools)
- Learn about [MCP Resources](/Mcp/Resources)
- See [Usage Examples](/Mcp/Examples)
- Return to [MCP Overview](/Mcp)
