---
title: Usage Examples
order: 0005.07
category: 10|Get Started
route: /Mcp/Examples
icon: Code
---

# Usage Examples

This page demonstrates real-world scenarios of using the Fluent UI Blazor MCP Server with AI assistants in Visual Studio and Visual Studio Code.

> [!NOTE] The AI responses shown on this page are **examples only**. Actual responses from GitHub Copilot or other AI assistants **may vary** depending on:
> - The AI model version and its training data
> - The context of your conversation
> - Your workspace configuration
> - The MCP Server version installed

 Use these examples as a guide for the types of interactions possible, not as exact expected outputs.

## Example 1: Discovering Components

### Scenario
You're starting a new project and want to know what button components are available.

### Visual Studio Code

1. Open GitHub Copilot Chat (`Ctrl+Shift+I`)
2. Type your question:

```
What button components are available in Fluent UI Blazor?
```

3. Copilot will use the `ListComponents` tool to find all button-related components:

**AI Response (example - actual response may vary):**
> Based on the Fluent UI Blazor library, here are the available button components:
>
> - **FluentButton**: Standard button with various appearances
> - **FluentAnchorButton**: Button that renders as an anchor link
> - **FluentCompoundButton**: Button with primary and secondary text
> - **FluentMenuButton**: Button that opens a menu
> - **FluentSplitButton**: Button split between action and dropdown
> - **FluentToggleButton**: Button that maintains a pressed state

### Visual Studio 2026

The interaction is similar - open Copilot Chat and ask the same question.

---

## Example 2: Getting Component Details

### Scenario
You need to understand all the parameters available for `FluentDataGrid`.

### Conversation

**You:**
```
Show me all parameters for FluentDataGrid
```

**AI Response (example - actual response may vary):**
> Here are the parameters for FluentDataGrid:
>
> | Parameter | Type | Default | Description |
> |-----------|------|---------|-------------|
> | Items | IQueryable<TGridItem> | - | The data source |
> | ItemsProvider | GridItemsProvider<TGridItem> | - | Async data provider |
> | Pagination | PaginationState | null | Pagination configuration |
> | RowClass | Func<TGridItem, string> | null | CSS class per row |
> | ...
>
> Would you like me to show you an example of how to use pagination?

---

## Example 3: Building a Form

### Scenario
You want to create a user registration form with validation.

### Conversation

**You:**
```
Create a user registration form using Fluent UI Blazor with fields for:
- Username (required, min 3 characters)
- Email (required, valid email format)
- Password (required, min 8 characters)
- Confirm Password (must match password)
Include a submit button and show validation errors.
```

**AI Response (example - actual response may vary):**
```razor
@using System.ComponentModel.DataAnnotations

<EditForm Model="@model" OnValidSubmit="@HandleSubmit">
    <DataAnnotationsValidator />
    
    <FluentStack Orientation="Orientation.Vertical" VerticalGap="16">
        <FluentField Label="Username">
            <FluentTextInput @bind-Value="@model.Username" 
                             Placeholder="Enter username" />
            <ValidationMessage For="@(() => model.Username)" />
        </FluentField>
        
        <FluentField Label="Email">
            <FluentTextInput @bind-Value="@model.Email" 
                             TextInputType="TextInputType.Email"
                             Placeholder="Enter email" />
            <ValidationMessage For="@(() => model.Email)" />
        </FluentField>
        
        <FluentField Label="Password">
            <FluentTextInput @bind-Value="@model.Password"
                             TextInputType="TextInputType.Password"
                             Placeholder="Enter password" />
            <ValidationMessage For="@(() => model.Password)" />
        </FluentField>
        
        <FluentField Label="Confirm Password">
            <FluentTextInput @bind-Value="@model.ConfirmPassword"
                             TextInputType="TextInputType.Password"
                             Placeholder="Confirm password" />
            <ValidationMessage For="@(() => model.ConfirmPassword)" />
        </FluentField>
        
        <FluentButton Type="ButtonType.Submit" 
                      Appearance="ButtonAppearance.Primary">
            Register
        </FluentButton>
    </FluentStack>
</EditForm>

@code {
    private RegistrationModel model = new();
    
    private async Task HandleSubmit()
    {
        // Handle registration logic
    }
    
    public class RegistrationModel
    {
        [Required]
        [MinLength(3, ErrorMessage = "Username must be at least 3 characters")]
        public string Username { get; set; } = "";
        
        [Required]
        [EmailAddress]
        public string Email { get; set; } = "";
        
        [Required]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters")]
        public string Password { get; set; } = "";
        
        [Required]
        [Compare(nameof(Password), ErrorMessage = "Passwords do not match")]
        public string ConfirmPassword { get; set; } = "";
    }
}
```

---

## Example 4: Understanding Enums

### Scenario
You want to know what appearance options are available for buttons.

### Conversation

**You:**
```
What are the possible values for ButtonAppearance?
```

**AI Response (example - actual response may vary):**
> The `ButtonAppearance` enum has the following values:
>
> | Value | Description |
> |-------|-------------|
> | Primary | Emphasized button for primary actions |
> | Secondary | Standard button for secondary actions |
> | Outline | Button with visible border, no fill |
> | Subtle | Low-emphasis button, minimal styling |
> | Transparent | Button with no background |
>
> **Usage example:**
> ```razor
> <FluentButton Appearance="ButtonAppearance.Primary">Save</FluentButton>
> <FluentButton Appearance="ButtonAppearance.Secondary">Cancel</FluentButton>
> ```

---

## Example 5: Creating a Data Grid

### Scenario
You need to display a list of products with sorting and pagination.

### Conversation

**You:**
```
Create a FluentDataGrid to display products with columns for:
- Product Name (sortable)
- Price (sortable, formatted as currency)
- Category
- In Stock (boolean)

Add pagination with 15 items per page.
```

**AI Response (example - actual response may vary):**
```razor
@inject IProductService ProductService

<FluentDataGrid Items="@products" Pagination="@pagination">
    <PropertyColumn Property="@(p => p.Name)" 
                    Title="Product Name" 
                    Sortable="true" />
    
    <PropertyColumn Property="@(p => p.Price)" 
                    Title="Price" 
                    Sortable="true"
                    Format="C2" />
    
    <PropertyColumn Property="@(p => p.Category)" 
                    Title="Category" />
    
    <TemplateColumn Title="In Stock">
        <FluentIcon Value="@(context.InStock 
            ? new Icons.Regular.Size16.Checkmark() 
            : new Icons.Regular.Size16.Dismiss())" 
            Color="@(context.InStock ? Color.Success : Color.Error)" />
    </TemplateColumn>
</FluentDataGrid>

<FluentPaginator State="@pagination" />

@code {
    private IQueryable<Product> products = default!;
    private PaginationState pagination = new() { ItemsPerPage = 15 };
    
    protected override async Task OnInitializedAsync()
    {
        var allProducts = await ProductService.GetProductsAsync();
        products = allProducts.AsQueryable();
    }
}
```

---

## Example 6: Creating a Dialog

### Scenario
You want to create a confirmation dialog before deleting an item.

### Conversation

**You:**
```
How do I show a confirmation dialog before deleting an item using FluentDialogService?
```

**AI Response (example - actual response may vary):**
```razor
@inject IDialogService DialogService

<FluentButton Appearance="ButtonAppearance.Primary"
              OnClick="@ConfirmDelete">
    Delete Item
</FluentButton>

@code {
    private async Task ConfirmDelete()
    {
        var result = await DialogService.ShowConfirmationAsync(
            message: "Are you sure you want to delete this item?",
            title: "Confirm Deletion",
            primaryText: "Delete",
            secondaryText: "Cancel");
        
        if (result.Cancelled)
        {
            return;
        }
        
        // Proceed with deletion
        await DeleteItemAsync();
        await DialogService.ShowSuccessAsync("Item deleted successfully");
    }
    
    private async Task DeleteItemAsync()
    {
        // Your deletion logic here
    }
}
```

---

## Tips for Effective Conversations

### 1. Be Specific About Requirements
```
❌ "Make a table"
✅ "Create a FluentDataGrid with sortable columns for Name and Date, 
   and pagination with 20 items per page"
```

### 2. Reference Components by Name
```
❌ "How do I make a dropdown?"
✅ "How do I use FluentSelect with custom option templates?"
```

### 3. Ask Follow-up Questions
```
User: "Show me FluentButton parameters"
AI: [provides list]
User: "Now show me an example with the Loading state"
```

### 4. Request Complete Examples
```
✅ "Show me a complete working example including the @code section"
```

## Why Responses May Vary

AI assistants like GitHub Copilot generate responses dynamically based on multiple factors:

| Factor | Impact |
|--------|--------|
| **Model version** | Different AI model versions may produce different outputs |
| **Conversation context** | Previous messages in the chat affect the response |
| **Temperature settings** | AI randomness settings can cause variation |
| **MCP data freshness** | The component documentation returned by tools may differ between versions |
| **Prompt interpretation** | The AI may interpret your question differently each time |

> [!TIP]
> If you don't get the expected response, try:
> - Rephrasing your question
> - Being more specific about what you need
> - Attaching relevant MCP resources for additional context
> - Starting a new chat session

## Next Steps

- Return to [MCP Overview](/Mcp)
- Learn more about [MCP Tools](/Mcp/Tools)
- Explore [MCP Resources](/Mcp/Resources)
