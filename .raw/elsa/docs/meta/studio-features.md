# Elsa Studio Features

This document identifies major UI features and components in the elsa-studio repository.

## Overview

Elsa Studio is the visual designer and management interface for Elsa Workflows. It provides a web-based UI for:
- Creating and editing workflows visually
- Managing workflow definitions and instances
- Monitoring workflow execution
- Configuring triggers and schedules
- Managing activities and extensions


## Core UI Features

Based on typical Elsa Studio functionality and common workflow designer patterns:

### 1. Workflow Designer
**Purpose**: Visual workflow creation and editing

**Key Capabilities**:
- Drag-and-drop activity placement
- Visual connection drawing between activities
- Activity property configuration panel
- Flowchart layout and organization
- Zoom and pan controls
- Activity palette/toolbox
- Search and filter activities

**User Experience**:
- Canvas-based editing
- Real-time validation
- Undo/redo support
- Grid snapping
- Auto-layout options

### 2. Workflow Definitions List
**Purpose**: Browse and manage workflow definitions

**Key Capabilities**:
- List all workflow definitions
- Search and filter workflows
- Create new workflows
- Edit existing workflows
- Delete workflows
- Import/export workflows (JSON)
- Version management
- Publish/unpublish workflows

### 3. Workflow Instances
**Purpose**: Monitor and manage running workflows

**Key Capabilities**:
- View active workflow instances
- See instance status (Running, Suspended, Completed, Faulted)
- Inspect instance variables and state
- View execution history/timeline
- Resume suspended instances
- Cancel running instances
- Retry failed instances
- Filter by status, date, correlation ID

### 4. Workflow Instance Details
**Purpose**: Deep inspection of individual workflow execution

**Key Capabilities**:
- Execution timeline with activity transitions
- Variable values at each step
- Activity input/output visualization
- Bookmark information
- Error details and stack traces
- Journal/audit log
- Visual execution path highlighting

### 5. Activity Configuration
**Purpose**: Configure individual activities within workflows

**Key Capabilities**:
- Property editors for each activity type
- Expression editors (C#, JavaScript, Liquid, Python)
- Syntax highlighting and IntelliSense
- Input/output mapping
- Validation feedback
- Common property settings (name, description)
- UI hints and field extensions

### 6. Triggers and Events
**Purpose**: Configure workflow start conditions

**Key Capabilities**:
- HTTP endpoint configuration
- Timer/cron schedule setup
- Message queue bindings
- Custom event triggers
- Trigger activation/deactivation
- Trigger testing

### 7. Settings and Configuration
**Purpose**: System-wide configuration

**Key Capabilities**:
- Server connection settings
- Authentication configuration
- Default preferences
- Feature flags
- Plugin/extension management
- Localization settings

### 8. Activity Library/Palette
**Purpose**: Browse available activities

**Key Capabilities**:
- Categorized activity list
- Activity search
- Activity descriptions and documentation
- Custom activity visibility
- Favorite activities
- Recently used activities

### 9. Logs and Diagnostics
**Purpose**: System monitoring and troubleshooting

**Key Capabilities**:
- Workflow execution logs
- System logs
- Performance metrics (optional)
- Error reporting
- Debug information

### 10. Import/Export
**Purpose**: Workflow portability

**Key Capabilities**:
- Export workflow as JSON
- Import workflow from JSON
- Bulk operations
- Version compatibility checks

## Studio Architecture

### Frontend Technology
- **Framework**: Blazor WebAssembly (WASM) or Blazor Server
- **Component Model**: Modular component-based architecture
- **State Management**: Blazor state management
- **Styling**: Modern, responsive UI

### Backend Integration
- **API Communication**: REST API calls to Elsa Server
- **Real-time Updates**: SignalR for live updates (if applicable)
- **Authentication**: Token-based or cookie authentication

### Extensibility
- **Custom Activities**: Register and display custom activity types
- **UI Hints**: Customize activity property editors
- **Content Visualizers**: Custom visualization for complex data
- **Field Extensions**: Extend property input controls
- **Activity Pickers**: Custom activity selection UIs
- **Localization**: Multi-language support

## User Workflows

### Creating a Workflow
1. Navigate to Workflow Definitions
2. Click "Create Workflow"
3. Enter workflow name and description
4. Open in designer
5. Add activities from palette
6. Connect activities
7. Configure activity properties
8. Save workflow
9. Publish workflow

### Monitoring Execution
1. Navigate to Workflow Instances
2. Filter by status or date
3. Click instance to view details
4. Review execution timeline
5. Inspect variables and errors
6. Take action (resume, cancel, retry)

### Debugging Failed Workflows
1. Find failed instance in list
2. Open instance details
3. Review error message and stack trace
4. Check activity that failed
5. Inspect input data and variables
6. Identify root cause
7. Fix workflow definition or data
8. Retry instance or start new execution

## Common UI Patterns

### Activity Property Editors
- **Text Input**: Simple string values
- **Number Input**: Numeric values with validation
- **Dropdown**: Enumeration selection
- **Checkbox**: Boolean values
- **Expression Editor**: Multi-language expressions
- **Object Editor**: Complex JSON objects
- **Array Editor**: Collections of items

### Navigation Structure
- **Sidebar**: Main navigation menu
- **Top Bar**: User profile, settings, notifications
- **Breadcrumbs**: Current location indicator
- **Tabs**: Multiple views within a page

## Gaps in Current Documentation

1. ❌ No comprehensive Studio tour/walkthrough
2. ❌ No designer keyboard shortcuts documentation
3. ❌ Limited connection configuration guide
4. ⚠️ Activity picker documentation exists (3.7-preview) but incomplete
5. ⚠️ Content visualizers documented (3.6-preview) but could be expanded
6. ⚠️ UI hints documented but lacks examples
7. ❌ No troubleshooting guide for Studio connection issues
8. ❌ No best practices for workflow organization in Studio
9. ❌ No Studio performance optimization tips
10. ❌ No accessibility documentation

## Priority Documentation Needs

1. **Getting Started with Studio**
   - Installation and connection setup
   - First workflow creation walkthrough
   - UI overview and navigation guide

2. **Designer Guide**
   - Comprehensive designer feature documentation
   - Keyboard shortcuts and productivity tips
   - Layout and organization best practices

3. **Activity Configuration**
   - Complete guide to activity property types
   - Expression editing tips and tricks
   - Common configuration patterns

4. **Monitoring and Operations**
   - How to effectively monitor workflow execution
   - Interpreting instance timelines and logs
   - Debugging failed workflows

5. **Advanced Features**
   - Custom UI hints and visualizers
   - Extending Studio with plugins
   - Integration with external systems

