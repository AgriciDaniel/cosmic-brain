---
title: Security
order: 0005.10
category: 10|Get Started
route: /Mcp/Security
icon: Shield
---

# MCP Security & Compliance

This document provides security information about the **Fluent UI Blazor MCP Server** to help SecOps teams evaluate and approve its use within your organization.

## Executive Summary

The Fluent UI Blazor MCP Server is a **read-only documentation provider** that runs locally on developer workstations. It:

- ✅ Does **not** execute arbitrary code
- ✅ Does **not** make external network requests
- ✅ Does **not** access sensitive data
- ✅ Does **not** modify files or system state
- ✅ Operates entirely within the IDE sandbox
- ✅ Only serves pre-generated documentation

## Architecture & Isolation

### Execution Environment

```
┌─────────────────────────────────────────────────┐
│           Developer Workstation                 │
│                                                 │
│  ┌─────────────────┐        ┌─────────────────┐ │
│  │   Visual Studio │◄──────►│   MCP Server    │ │
│  │   or VS Code    │  stdio │   (Local)       │ │
│  └─────────────────┘        └─────────────────┘ │
│         │                           │           │
│         │                           │           │
│         ▼                           ▼           │
│  ┌────────────────┐        ┌─────────────────┐  │
│  │  GitHub Copilot│        │  Documentation  │  │
│  │   (Extension)  │        │  JSON Files     │  │
│  └────────────────┘        └─────────────────┘  │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Communication Protocol

- **Transport**: stdio (standard input/output)
- **Protocol**: JSON-RPC 2.0
- **Scope**: Local process only
- **No network access**: Server runs entirely offline

### Process Isolation

The MCP server runs as a **child process** of your IDE with:

- Limited process permissions
- No elevated privileges required
- Sandboxed by the IDE runtime
- Cannot access resources outside its working directory

### VSCode Native Sandboxing

VS Code provides a built-in **sandbox layer** for locally-running `stdio` MCP servers that restricts file system and network access at the OS level. This is available on **macOS and Linux** and provides an additional defense-in-depth control on top of process isolation.

When sandboxing is enabled, the MCP server can only access the file system paths and network domains explicitly listed in the `sandbox` configuration — all other access is denied by the OS.

Because the Fluent UI Blazor MCP Server requires no network access and no file system writes, it is an ideal candidate for the most restrictive sandbox policy. A minimal configuration is:

```json
{
    "servers": {
        "fluent-ui-blazor": {
            "command": "fluentui-mcp",
            "sandboxEnabled": true
        }
    }
}
```

This configuration grants zero file system write permissions and zero network access — matching the server's actual capability profile.

> [!NOTE]
> When `sandboxEnabled` is `true`, VS Code may handle tool confirmations differently because the server runs in a controlled environment. The exact behavior can depend on the VS Code version and configuration, so verify the current behavior against the official VS Code documentation and your local setup.

For the full list of `sandbox` properties (`filesystem.allowWrite`, `filesystem.denyRead`, `network.allowedDomains`, etc.), see the [VS Code MCP Sandbox Configuration](https://code.visualstudio.com/docs/copilot/reference/mcp-configuration#_sandbox-configuration) reference.

## Permission Model

### What the MCP Server CAN Do

| Action | Scope | Security Impact |
|--------|-------|-----------------|
| Read documentation files | Local JSON files only | ⚪ None - Read-only access to public documentation |
| Serve component metadata | Pre-generated data | ⚪ None - No dynamic code execution |
| List available resources | Static catalog | ⚪ None - Public API information |
| Return documentation text | Markdown content | ⚪ None - Non-executable text |

### What the MCP Server CANNOT Do

| Prohibited Action | Enforcement |
|-------------------|-------------|
| ❌ Execute arbitrary code | No script execution capabilities |
| ❌ Access file system | Limited to documentation directory |
| ❌ Make network requests | No network APIs used |
| ❌ Modify files | Read-only operations only |
| ❌ Access environment variables | No environment access |
| ❌ Launch other processes | No process spawning |
| ❌ Access system resources | Sandboxed execution |
| ❌ Read user credentials | No credential APIs |

## Data Access & Privacy

### Data Sources

The MCP server accesses only:

1. **Pre-generated documentation files** (`mcp-documentation.json`)
   - Created at build time
   - Contains only public API documentation
   - No user data or secrets

2. **Component metadata** (from library assembly)
   - Public properties and methods
   - XML documentation comments
   - Publicly available information

### Data Flow

```
1. IDE Request ──► MCP Server ──► Read JSON ──► Return Markdown
                       │
                       └──► No external calls
                       └──► No data persistence
                       └──► No logging of queries
```

### Privacy Guarantees

- ✅ No telemetry or analytics
- ✅ No data sent to external services
- ✅ No logging of user queries
- ✅ No storage of conversation history
- ✅ No access to workspace files
- ✅ No access to source code

## Network & Connectivity

### Network Requirements

**None.** The MCP server:

- Runs entirely offline
- Does not require internet access
- Does not open network ports
- Does not make outbound connections

### Firewall Considerations

- ⚪ **No firewall rules needed**
- ⚪ **No ports to open**
- ⚪ **No proxy configuration required**

## Audit & Compliance

### Auditability

Organizations can audit the MCP server:

1. **Source code**: Fully open source on GitHub
   - Repository: `microsoft/fluentui-blazor`
   - License: MIT
   - All code is publicly reviewable

2. **NuGet package**: Signed and verified
   - Package: `FluentUI.Blazor.McpServer`
   - Publisher: Microsoft
   - Digital signature verification available

3. **Documentation generation**: Deterministic
   - Build-time only
   - No runtime code generation
   - Reproducible builds

### Logging & Monitoring

The MCP server logs:

- ✅ Startup/shutdown events (to IDE console)
- ✅ Request/response messages (JSON-RPC only)
- ❌ No sensitive data logged
- ❌ No external logging services

Organizations can monitor MCP usage through:

- IDE output logs
- Process monitoring tools
- Network monitoring (will show zero external traffic)

## Security Best Practices

### For Organizations

> [!TIP]
> **Recommended Policies**

1. **Source Verification**
   ```bash
   # Verify NuGet package signature
   dotnet nuget verify FluentUI.Blazor.McpServer
   ```

2. **Network Isolation**
   - MCP server can run on air-gapped systems
   - No special network permissions required

3. **User Permissions**
   - Standard user account is sufficient
   - No administrator privileges needed

4. **Code Review**
   - Source code available for security review
   - Open-source license allows auditing

### For Developers

1. **Install from Official Sources**
   ```bash
   # Use official NuGet feed only
   dotnet tool install FluentUI.Blazor.McpServer --global
   ```

2. **Keep Updated**
   ```bash
   # Check for security updates
   dotnet tool update FluentUI.Blazor.McpServer --global
   ```

3. **Verify IDE Integration**
   - Use official IDE extensions only
   - GitHub Copilot from Microsoft
   - Official VS/VS Code extensions

## Threat Model

### Attack Surface Analysis

| Vector | Risk Level | Mitigation |
|--------|------------|------------|
| Code injection | 🟢 **None** | No user input execution |
| Network attacks | 🟢 **None** | No network access |
| File system access | 🟢 **Low** | Read-only, limited scope |
| Privilege escalation | 🟢 **None** | Runs as user process |
| Data exfiltration | 🟢 **None** | No external communication |
| Supply chain | 🟡 **Low** | NuGet package verification available |

### Security Controls

| Control | Implementation |
|---------|----------------|
| **Input Validation** | All requests validated against JSON-RPC schema |
| **Output Encoding** | Markdown output, no executable content |
| **Access Control** | Limited to documentation files only |
| **Least Privilege** | Runs with minimal permissions |
| **Secure Defaults** | No configuration required, secure by default |

## Compliance Considerations

### Industry Standards

The Fluent UI Blazor MCP Server aligns with:

- ✅ **OWASP Top 10** - No applicable vulnerabilities
- ✅ **CWE/SANS Top 25** - No identified weaknesses
- ✅ **NIST Cybersecurity Framework** - Defense in depth approach

### Regulatory Compliance

Suitable for organizations subject to:

- **GDPR** - No personal data processing
- **SOC 2** - Minimal attack surface
- **ISO 27001** - Documented security controls
- **HIPAA** - No PHI access or processing
- **PCI DSS** - No payment data handling

### Data Classification

Content served by MCP:

- **Classification**: Public
- **Sensitivity**: Non-sensitive
- **Distribution**: Publicly available documentation

## Vulnerability Management

### Security Updates

- Security patches released through NuGet
- Automatic update notifications in IDEs
- Subscribe to security advisories on GitHub

## FAQ for SecOps Teams

### Q: Does the MCP server access our source code?

**A:** No. The MCP server only reads pre-generated documentation files. It does not scan, access, or analyze your source code or workspace files.

### Q: Can the AI see our proprietary code through MCP?

**A:** No. The MCP server only provides Fluent UI Blazor library documentation. Your code is never sent to the MCP server. GitHub Copilot's analysis of your code is separate and governed by your Copilot license terms.

### Q: Does this create a backdoor or remote access vector?

**A:** No. The MCP server runs entirely locally with no network access. It cannot be remotely controlled or exploited as an entry point.

### Q: What data leaves the developer's machine?

**A:** Zero data from the MCP server. Only your IDE (GitHub Copilot) may send data according to your Copilot settings and privacy controls. The MCP server itself sends nothing.

### Q: Can we run this in a secure/classified environment?

**A:** Yes. The MCP server works in air-gapped environments and requires no internet connectivity.

### Q: How do we verify the integrity of the MCP server?

**A:**
1. Verify NuGet package signature
2. Review open-source code on GitHub
3. Build from source for additional assurance

### Q: What happens if the MCP server is compromised?

**A:** Impact is minimal - it can only serve documentation. No ability to execute code, access files, or make network connections. Standard process isolation limits blast radius.

### Q: Do we need to add exceptions to our security tools?

**A:** Typically no. The MCP server behaves like any other developer tool and should not trigger security alerts. If needed, whitelist the process in:
- Endpoint protection (process monitoring)
- DLP tools (read-only documentation access)

### Q: Can we host our own MCP server?

**A:** Yes. You can:
1. Clone the repository
2. Build from source
3. Deploy internally
4. Configure IDEs to use your instance

### Q: What about supply chain attacks via NuGet?

**A:** Microsoft signs all packages. Verify signatures with `dotnet nuget verify`. Consider:
- Using private NuGet feeds with approved packages
- Running security scans on dependencies
- Building from audited source code

## Security Checklist for Approval

Use this checklist when evaluating the Fluent UI Blazor MCP Server:

- [ ] Review source code on GitHub
- [ ] Verify NuGet package signature
- [ ] Confirm no network requirements
- [ ] Test in isolated environment
- [ ] Review process permissions
- [ ] Check compatibility with security tools
- [ ] Verify no data exfiltration
- [ ] Confirm read-only operations
- [ ] Test on non-production machine first
- [ ] Document approval and restrictions

## Additional Resources

- **Source Code**: https://github.com/microsoft/fluentui-blazor
- **NuGet Package**: https://www.nuget.org/packages/FluentUI.Blazor.McpServer
- **Security Policy**: https://github.com/microsoft/fluentui-blazor/security/policy
- **Microsoft Security**: https://www.microsoft.com/security

---

> [!NOTE]
> This document is maintained by the Fluent UI Blazor team. Last updated: 2026.
> For the latest security information, visit the GitHub repository.
