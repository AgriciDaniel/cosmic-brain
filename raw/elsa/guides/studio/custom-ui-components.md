---
description: >-
  Learn how to create custom UI components for Elsa Studio, including custom property editors for activity inputs and integration of React/Angular components via web components.
---

# Custom UI Components in Studio

Elsa Studio provides a rich, extensible UI for designing workflows, but sometimes you need custom editors for specific activity properties. This guide explains how Studio renders activity editors, how to create custom property editors, and how to integrate them with your activities.

## Overview

Elsa Studio's workflow designer allows you to create and configure activities visually. Each activity has properties (inputs and outputs) that are edited through property editors in the property panel. While Studio provides default editors for common types (text, numbers, booleans, etc.), you can create **custom property editors** for specialized data types or enhanced user experiences.

### What You Can Customize

- **Property Editors**: Custom input controls for activity properties
- **Content Visualizers**: Custom display components for activity output values
- **Field Extensions**: Additional UI functionality for specific fields
- **Activity Pickers**: Custom selection interfaces for choosing activities

## How Studio Renders Activity Editors

When you select an activity in the workflow designer, Studio:

1. **Loads Activity Descriptor**: Retrieves metadata about the activity's inputs and outputs
2. **Determines Property Types**: Identifies the data type of each property
3. **Selects Editor Components**: Chooses appropriate UI components based on:
   - Property data type (string, number, boolean, etc.)
   - UI Hints (custom editor identifiers)
   - Expression type (Literal, JavaScript, C#, etc.)
4. **Renders Property Panel**: Displays editors in the inspector panel
5. **Binds Data**: Connects editors to the workflow definition's property values

### Default Property Editors

Studio includes built-in editors for common types:

| Data Type | Default Editor | Description |
|-----------|---------------|-------------|
| `string` | Single-line text | Basic text input |
| `string` (multi-line) | Multi-line text | Textarea for longer text |
| `number` | Number input | Numeric input with validation |
| `boolean` | Checkbox/Toggle | True/false selection |
| `object` | JSON editor | Monaco editor for JSON |
| `array` | List editor | Add/remove items interface |

## UI Hints: Requesting Custom Editors

The `UIHint` attribute tells Studio which custom editor to use for a property:

```csharp
[Activity("MyCompany", "Data", "Processes customer data")]
public class ProcessCustomer : CodeActivity
{
    [Input(
        Description = "Customer email address",
        UIHint = "email-input")]  // Custom editor
    public Input<string> Email { get; set; } = default!;

    [Input(
        Description = "Customer phone number",
        UIHint = "phone-input")]  // Custom editor
    public Input<string> PhoneNumber { get; set; } = default!;

    [Input(
        Description = "Customer preferences",
        UIHint = "preference-selector")]  // Custom editor
    public Input<Dictionary<string, bool>> Preferences { get; set; } = default!;

    protected override void Execute(ActivityExecutionContext context)
    {
        // Activity logic
    }
}
```

The `UIHint` value (e.g., `"email-input"`) identifies which custom editor component Studio should use for that property.

## Creating Custom Property Editors

Custom property editors are web components that conform to Studio's component interface. Studio is built with modern web standards, allowing you to create editors using any framework that can compile to web components.

### Architecture: Backend + Frontend

Custom property editors involve both backend and frontend:

1. **Backend (Elsa Core)**:
   - Activity definition with `UIHint` attributes
   - Optional: UI hint handler for metadata/validation
   - Optional: Custom serialization for complex types

2. **Frontend (Elsa Studio)**:
   - Custom web component implementing the editor
   - Registration of the component with Studio
   - Styling and user interaction logic

### Example: Custom Email Input Editor

Let's create a custom email input with validation and suggestions.

#### Backend: Activity with UI Hint

```csharp
using Elsa.Workflows;
using Elsa.Workflows.Attributes;

namespace MyCompany.Activities;

[Activity("MyCompany", "Communication", "Sends an email")]
public class SendCustomEmail : CodeActivity
{
    [Input(
        Description = "Recipient email address",
        UIHint = "custom-email-input",  // Our custom editor
        DefaultValue = "user@example.com")]
    public Input<string> ToEmail { get; set; } = default!;

    [Input(
        Description = "Email subject",
        UIHint = "single-line")]
    public Input<string> Subject { get; set; } = default!;

    [Input(
        Description = "Email body",
        UIHint = "multi-line")]
    public Input<string> Body { get; set; } = default!;

    protected override void Execute(ActivityExecutionContext context)
    {
        var email = context.Get(ToEmail);
        var subject = context.Get(Subject);
        var body = context.Get(Body);
        
        // Send email logic
    }
}
```

#### Backend: UI Hint Handler (Optional)

UI hint handlers provide metadata and validation for custom editors:

```csharp
using Elsa.Workflows.UIHints;

namespace MyCompany.UIHints;

public class EmailInputUIHintHandler : IUIHintHandler
{
    public string UIHint => "custom-email-input";

    public object GetDefaultValue()
    {
        return "user@example.com";
    }

    public object? ParseValue(string value)
    {
        // Optional: Parse and validate the value
        return string.IsNullOrWhiteSpace(value) ? null : value.Trim();
    }

    public string? FormatValue(object? value)
    {
        // Optional: Format the value for display
        return value?.ToString()?.Trim();
    }
}
```

Register the handler in your feature:

```csharp
public override void Configure()
{
    Module.ConfigureWorkflowOptions(options =>
    {
        options.RegisterUIHintHandler<EmailInputUIHintHandler>("custom-email-input");
    });
}
```

#### Frontend: Custom Web Component

Create a web component for the email editor:

```typescript
// custom-email-input.ts
import { customElement, property } from 'lit/decorators.js';
import { html, LitElement, css } from 'lit';

@customElement('custom-email-input')
export class CustomEmailInput extends LitElement {
  // The current value
  @property({ type: String })
  value: string = '';

  // Whether the field is in an expression mode
  @property({ type: Boolean })
  isExpression: boolean = false;

  // Suggestions for autocomplete
  private suggestions: string[] = [
    'user@example.com',
    'admin@example.com',
    'support@example.com'
  ];

  static styles = css`
    :host {
      display: block;
    }

    .email-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    input {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
    }

    input:focus {
      outline: none;
      border-color: #007bff;
    }

    input.invalid {
      border-color: #dc3545;
    }

    .suggestions {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }

    .suggestion-chip {
      padding: 4px 8px;
      background: #e9ecef;
      border-radius: 12px;
      font-size: 12px;
      cursor: pointer;
      user-select: none;
    }

    .suggestion-chip:hover {
      background: #dee2e6;
    }

    .validation-message {
      color: #dc3545;
      font-size: 12px;
    }
  `;

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    
    // Dispatch change event for Studio to capture
    this.dispatchEvent(new CustomEvent('valueChanged', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  private selectSuggestion(suggestion: string) {
    this.value = suggestion;
    
    this.dispatchEvent(new CustomEvent('valueChanged', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const isValid = this.value === '' || this.validateEmail(this.value);

    return html`
      <div class="email-container">
        <input
          type="email"
          .value=${this.value}
          @input=${this.handleInput}
          class=${!isValid ? 'invalid' : ''}
          placeholder="Enter email address"
          ?disabled=${this.isExpression}
        />
        
        ${!isValid ? html`
          <div class="validation-message">
            Please enter a valid email address
          </div>
        ` : ''}
        
        ${!this.isExpression && this.value === '' ? html`
          <div class="suggestions">
            ${this.suggestions.map(suggestion => html`
              <div
                class="suggestion-chip"
                @click=${() => this.selectSuggestion(suggestion)}
              >
                ${suggestion}
              </div>
            `)}
          </div>
        ` : ''}
      </div>
    `;
  }
}
```

#### Frontend: Register the Component

Register your component with Elsa Studio:

```typescript
// studio-extensions.ts
import './custom-email-input';

// Register the component with Studio's property editor registry
export function registerCustomEditors() {
  // Studio's property editor registry
  const registry = (window as any).elsa?.propertyEditors;
  
  if (registry) {
    registry.register('custom-email-input', 'custom-email-input');
  }
}

// Call during Studio initialization
document.addEventListener('DOMContentLoaded', () => {
  registerCustomEditors();
});
```

#### Frontend: Include in Studio Build

Add your custom component to Studio's build configuration:

```json
// package.json (in your Studio customization project)
{
  "name": "elsa-studio-extensions",
  "version": "1.0.0",
  "scripts": {
    "build": "tsc && vite build"
  },
  "dependencies": {
    "lit": "^3.0.0",
    "@elsa-workflows/studio": "^3.0.0"
  }
}
```

Include the built extension in your Studio deployment:

```html
<!-- wwwroot/index.html -->
<!DOCTYPE html>
<html>
<head>
    <title>Elsa Studio</title>
    <script type="module" src="/_content/Elsa.Studio/elsa-studio.js"></script>
    <script type="module" src="/extensions/studio-extensions.js"></script>
</head>
<body>
    <elsa-studio-root></elsa-studio-root>
</body>
</html>
```

## Integrating React Components

React components can be integrated via web components. Here's how:

### Step 1: Create React Component

```tsx
// EmailInputReact.tsx
import React, { useState, useEffect } from 'react';

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const EmailInputReact: React.FC<EmailInputProps> = ({
  value,
  onChange,
  disabled = false
}) => {
  const [email, setEmail] = useState(value);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(email === '' || emailRegex.test(email));
  }, [email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setEmail(newValue);
    onChange(newValue);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <input
        type="email"
        value={email}
        onChange={handleChange}
        disabled={disabled}
        style={{
          padding: '8px',
          border: `1px solid ${isValid ? '#ccc' : '#dc3545'}`,
          borderRadius: '4px'
        }}
        placeholder="Enter email address"
      />
      {!isValid && (
        <div style={{ color: '#dc3545', fontSize: '12px' }}>
          Please enter a valid email address
        </div>
      )}
    </div>
  );
};
```

### Step 2: Wrap in Web Component

```tsx
// email-input-wrapper.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { EmailInputReact } from './EmailInputReact';

class EmailInputWebComponent extends HTMLElement {
  private root: ReactDOM.Root | null = null;
  private _value: string = '';

  static get observedAttributes() {
    return ['value', 'disabled'];
  }

  connectedCallback() {
    const mountPoint = document.createElement('div');
    this.appendChild(mountPoint);
    this.root = ReactDOM.createRoot(mountPoint);
    this.render();
  }

  disconnectedCallback() {
    this.root?.unmount();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  get value() {
    return this._value;
  }

  set value(val: string) {
    this._value = val;
    this.render();
  }

  private handleChange = (newValue: string) => {
    this._value = newValue;
    this.dispatchEvent(new CustomEvent('valueChanged', {
      detail: { value: newValue },
      bubbles: true,
      composed: true
    }));
  };

  private render() {
    if (this.root) {
      const disabled = this.hasAttribute('disabled');
      this.root.render(
        <EmailInputReact
          value={this._value}
          onChange={this.handleChange}
          disabled={disabled}
        />
      );
    }
  }
}

customElements.define('react-email-input', EmailInputWebComponent);
```

### Step 3: Register with Studio

```typescript
// Register the React-based component
export function registerReactEditors() {
  const registry = (window as any).elsa?.propertyEditors;
  
  if (registry) {
    registry.register('react-email-input', 'react-email-input');
  }
}
```

## Integrating Angular Components

Angular components can also be wrapped as web components:

### Step 1: Create Angular Component

```typescript
// email-input.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-email-input',
  template: `
    <div class="email-container">
      <input
        type="email"
        [(ngModel)]="value"
        (ngModelChange)="onValueChange($event)"
        [class.invalid]="!isValid"
        [disabled]="disabled"
        placeholder="Enter email address"
      />
      <div *ngIf="!isValid" class="validation-message">
        Please enter a valid email address
      </div>
    </div>
  `,
  styles: [`
    .email-container { display: flex; flex-direction: column; gap: 8px; }
    input { padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
    input.invalid { border-color: #dc3545; }
    .validation-message { color: #dc3545; font-size: 12px; }
  `]
})
export class EmailInputComponent {
  @Input() value: string = '';
  @Input() disabled: boolean = false;
  @Output() valueChange = new EventEmitter<string>();

  get isValid(): boolean {
    if (this.value === '') return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.value);
  }

  onValueChange(newValue: string) {
    this.value = newValue;
    this.valueChange.emit(newValue);
  }
}
```

### Step 2: Convert to Web Component

```typescript
// app.module.ts
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { EmailInputComponent } from './email-input.component';

@NgModule({
  declarations: [EmailInputComponent],
  imports: [BrowserModule, FormsModule],
  entryComponents: [EmailInputComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    const emailInput = createCustomElement(EmailInputComponent, { injector });
    customElements.define('angular-email-input', emailInput);
  }

  ngDoBootstrap() {
    // No bootstrapping needed for custom elements
  }
}
```

## Property Editor Interface

All custom property editors must implement this interface:

```typescript
interface IPropertyEditor {
  // Current value of the property
  value: any;
  
  // Whether the property is in expression mode
  isExpression: boolean;
  
  // Property metadata from the activity descriptor
  propertyDescriptor: PropertyDescriptor;
  
  // Fired when the value changes
  // Event detail: { value: any }
  valueChanged: CustomEvent;
}
```

## Best Practices

### 1. Handle Expression Mode
When `isExpression` is true, the property contains an expression (JavaScript, C#, etc.) rather than a literal value. Disable or hide your custom UI in this mode:

```typescript
render() {
  if (this.isExpression) {
    return html`<div>Expression mode: editor disabled</div>`;
  }
  
  // Regular editor UI
  return html`<input .value=${this.value} />`;
}
```

### 2. Emit Value Changes
Always dispatch a `valueChanged` event when the value changes:

```typescript
this.dispatchEvent(new CustomEvent('valueChanged', {
  detail: { value: this.value },
  bubbles: true,
  composed: true
}));
```

### 3. Validate Input
Provide immediate validation feedback to users:

```typescript
private validateValue(): boolean {
  // Validation logic
  return true;
}
```

### 4. Responsive Design
Ensure your editor works in Studio's property panel (usually 300-400px wide):

```css
:host {
  display: block;
  width: 100%;
}
```

### 5. Accessibility
Make your editors keyboard-accessible and screen-reader friendly:

```html
<input
  type="email"
  aria-label="Email address"
  aria-invalid="${!isValid}"
  aria-describedby="error-message"
/>
<div id="error-message" role="alert">
  ${validationMessage}
</div>
```

## Debugging Custom Editors

### Browser DevTools
- Use browser DevTools to inspect your web component
- Check the component's properties and attributes
- Monitor event dispatching with event listeners

### Studio Debug Mode
Enable Studio's debug mode to see editor registration and loading:

```typescript
// In browser console
localStorage.setItem('elsa:debug', 'true');
location.reload();
```

### Placeholder for Screenshots
_[Screenshot: Custom email editor in Studio property panel]_

_[Screenshot: Custom editor validation in action]_

_[Screenshot: React-based custom editor example]_

## Further Reading

- **[UI Hints](../../studio/workflow-editor/ui-hints.md)** - Detailed UI hint documentation
- **[Field Extensions](../../studio/workflow-editor/field-extensions.md)** - Extending property editors
- **[Content Visualisers](../../studio/workflow-editor/content-visualisers-3.6-preview.md)** - Custom output visualization
- **[Custom Activities](../../extensibility/custom-activities.md)** - Creating activities that use custom editors

## Summary

Creating custom UI components for Elsa Studio involves:
1. **Backend**: Define activities with `UIHint` attributes
2. **Frontend**: Create web components implementing the property editor interface
3. **Registration**: Register components with Studio's property editor registry
4. **Integration**: React/Angular components can be wrapped as web components

Custom property editors enable rich, domain-specific editing experiences while maintaining compatibility with Studio's workflow designer.
