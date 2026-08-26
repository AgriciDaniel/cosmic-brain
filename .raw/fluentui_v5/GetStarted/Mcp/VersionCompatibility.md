---
title: Version Compatibility
order: 0005.08
category: 10|Get Started
route: /Mcp/VersionCompatibility
icon: ShieldCheckmark
---

# Version Compatibility

The MCP server and the `Microsoft.FluentUI.AspNetCore.Components` NuGet package are **published together with the same version number** (e.g. `5.0.0-rc.1-26049.2`).
Because the documentation served by the MCP server is generated from a specific version of the component library, your project **must** reference the matching version to ensure the documentation is accurate.

## Why It Matters

When versions are **mismatched**, the documentation provided by the MCP server may:

- Reference **parameters, events, or methods** that do not exist in your version.
- Provide **code examples** that do not compile.
- Document **new components** that are not yet available, or still mention **deprecated** ones.

## Built-in Version Checking Tools

The MCP server exposes two tools to help you verify compatibility:

| Tool | Description |
|------|-------------|
| `GetVersionInfo` | Returns the MCP server version and the exact `PackageReference` your project should use. |
| `CheckProjectVersion` | Accepts your project's component library version and reports **COMPATIBLE** or **INCOMPATIBLE** with detailed guidance. |

## How It Works

### Step 1 — Get the expected version

Ask the AI assistant (or have it call the tool automatically):

```
What version of Fluent UI Blazor does this MCP server target?
```

The AI calls `GetVersionInfo` and receives:

- The MCP server version (e.g. `5.0.0-rc.1-26049.2`)
- The expected `PackageReference`:

```xml
<PackageReference Include="Microsoft.FluentUI.AspNetCore.Components" Version="5.0.0-rc.1-26049.2" />
```

### Step 2 — Validate your project

The AI reads your `.csproj` file and calls `CheckProjectVersion` with the version it finds.

#### Compatible result

If the versions match, the tool confirms that all documentation is accurate for your project.

#### Incompatible result

If there is a mismatch, the tool returns:

- A **warning** explaining the risks.
- The exact **PackageReference** XML to update in your `.csproj`:

```xml
<PackageReference Include="Microsoft.FluentUI.AspNetCore.Components" Version="5.0.0" />
```

- The equivalent **CLI command**:

```bash
dotnet add package Microsoft.FluentUI.AspNetCore.Components --version 5.0.0
```

## Typical Conversation

```
User: "I want to use FluentDataGrid in my project."

AI: [Calls GetVersionInfo → reads .csproj → Calls CheckProjectVersion("4.9.0")]

AI: "Your project references version 4.9.0 of the component library,
     but this MCP server provides documentation for version 5.0.0-rc.1-26049.2.
     Parameters and APIs may differ.
     I recommend upgrading:
     dotnet add package Microsoft.FluentUI.AspNetCore.Components --version 5.0.0-rc.1-26049.2"
```

## Best Practices

1. **Keep versions in sync** — Always use the same version for the MCP server tool and the component library NuGet package.
2. **Update both together** — When upgrading the component library, also update the MCP server:
   ```bash
   dotnet tool update -g Microsoft.FluentUI.AspNetCore.McpServer
   ```
3. **Pin a specific version with dnx** — If you use `dnx`, you can pin the version:
   ```json
   {
       "servers": {
           "fluent-ui-blazor": {
               "command": "dnx",
               "args": [
                   "Microsoft.FluentUI.AspNetCore.McpServer@5.0.0-rc.1-26049.2"
               ]
           }
       }
   }
   ```

## Next Steps

- [MCP Tools](/Mcp/Tools) — Full list of available tools
- [Usage Examples](/Mcp/Examples) — See more real-world examples
- [Security & Compliance](/Mcp/Security) — Security information for SecOps teams
