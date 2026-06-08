# Current vs Target IA Comparison

## Executive Summary

The current documentation has **67 pages** organized into the following top-level sections:
- Getting Started
- Application Types
- Guides
- Activities
- Expressions
- Extensibility
- Multitenancy
- Operate
- Optimize
- Hosting
- Studio
- Authentication
- Features

The **target IA** proposes a more intuitive structure aligned with user personas and their journey stages.

## Pages to Keep (Minimal/No Changes)

These pages are in good shape and align well with the target IA:

| Current Path | Target Path | Notes |
|--------------|-------------|-------|
| `README.md` | `/docs/overview/what-is-elsa.md` | Minor updates for V3 |
| `getting-started/concepts/` | `/docs/fundamentals/` | Keep structure |
| `expressions/` | `/docs/reference/expressions/` | Move to reference |
| `getting-started/containers/docker-compose/` | `/docs/deployment/docker.md` | Consolidate |
| `multitenancy/` | `/docs/deployment/configuration.md` | Integrate into config |
| `features/alterations/` | `/docs/observability/alterations.md` | Move |
| `features/logging-framework.md` | `/docs/observability/logging.md` | Move |
| `operate/incidents/` | `/docs/observability/troubleshooting.md` | Integrate |

## Pages to Move/Rename

Major restructuring needed:

| Current Path | Target Path | Action | Priority |
|--------------|-------------|--------|----------|
| `getting-started/hello-world.md` | `/docs/getting-started/hello-world.md` | **Fix/Update** | Critical |
| `application-types/` | `/docs/deployment/application-types/` | **Move** | Medium |
| `guides/http-workflows/designer.md` | `/docs/getting-started/first-http-workflow.md` | **Fix/Move** | Critical |
| `guides/http-workflows/programmatic.md` | `/docs/guides/http-workflows/programmatic.md` | **Fix** | High |
| `guides/loading-workflows-from-json.md` | `/docs/guides/loading-workflows.md` | **Keep** | Low |
| `guides/external-application-interaction.md` | `/docs/guides/external-integration.md` | **Rename** | Medium |
| `extensibility/custom-activities.md` | `/docs/extensibility/custom-activities.md` | **Complete Rewrite** | Critical |
| `hosting/distributed-hosting.md` | `/docs/deployment/clustering.md` | **Expand** | High |
| `studio/` | `/docs/using-studio/` | **Expand Significantly** | High |
| `authentication/authentication.md` | `/docs/deployment/authentication.md` | **Expand** | Critical |

## Pages to Deprecate/Archive

Low value or outdated content:

| Current Path | Reason | Replacement |
|--------------|--------|-------------|
| None currently | - | - |

**Note**: No pages should be deleted outright. Outdated pages should be updated or replaced.

## New Pages to Create

Critical gaps in current documentation:

### Critical Priority (Week 1-2)

1. `/docs/deployment/database-config.md` - **NEW**
   - SQL Server, PostgreSQL, MongoDB, EF Core
   - Addresses issues #2, #6, #11
   
2. `/docs/getting-started/docker-quickstart.md` - **NEW**
   - Quick Docker deployment guide
   - Phase 1 deliverable

3. `/docs/migration/v2-to-v3.md` - **NEW**
   - Most requested documentation
   - Issues #23, #86
   
4. `/docs/deployment/authentication.md` - **EXPAND**
   - OIDC, API keys, custom providers
   - Issues #16, #29

### High Priority (Week 3-4)

5. `/docs/overview/architecture.md` - **NEW**
   - System architecture, execution model
   - Issue #14
   
6. `/docs/deployment/kubernetes.md` - **NEW**
   - K8s deployment guide
   - Issues #35, #75

7. `/docs/using-studio/studio-tour.md` - **NEW**
   - Guided tour of Studio UI
   - Phase 1 deliverable

8. `/docs/using-studio/testing-debugging.md` - **NEW**
   - Troubleshooting failed workflows
   - High user demand

9. `/docs/extensibility/blocking-trigger-activities.md` - **NEW**
   - How to create blocking/trigger activities
   - Issue #18

10. `/docs/using-studio/studio-embedding.md` - **NEW**
    - React, Angular, Blazor integration
    - Issue #13

### Medium Priority (Week 5-6)

11. `/docs/deployment/clustering.md` - **EXPAND**
    - Distributed locking, load balancing
    - Issues #22, #41

12. `/docs/observability/monitoring.md` - **NEW**
    - Prometheus, Grafana integration
    - Critical for production

13. `/docs/observability/troubleshooting.md` - **NEW**
    - Common issues & solutions
    - FAQ content

14. `/docs/guides/workflow-patterns.md` - **NEW**
    - Common patterns library
    - Loops, conditionals, parallel execution

15. `/docs/extensibility/plugins-modules.md` - **NEW**
    - Plugin/module development
    - Issue #73

16. `/docs/fundamentals/workflow-context.md` - **NEW**
    - V3 version needed
    - Issue #20

### Lower Priority

17. `/docs/fundamentals/execution-model.md` - **NEW**
18. `/docs/deployment/configuration.md` - **NEW**
19. `/docs/deployment/scaling.md` - **NEW**
20. `/docs/deployment/migrations.md` - **NEW**
21. `/docs/using-studio/customization.md` - **NEW**
22. `/docs/extensibility/custom-ui-hints.md` - **NEW**
23. `/docs/extensibility/custom-ui-components.md` - **NEW**
24. `/docs/extensibility/custom-icons.md` - **NEW**
25. `/docs/extensibility/workflow-providers.md` - **NEW**
26. `/docs/extensibility/custom-types.md` - **NEW**
27. `/docs/integrations/identity-providers.md` - **NEW**
28. `/docs/integrations/monitoring.md` - **NEW**
29. `/docs/observability/distributed-tracing.md` - **NEW**
30. `/docs/observability/performance-tuning.md` - **NEW**
31. `/docs/reference/configuration.md` - **NEW**
32. `/docs/reference/studio-api.md` - **NEW**
33. `/docs/faq.md` - **NEW**
34. `/docs/community/case-studies.md` - **NEW**

## Navigation Restructuring

### Current Structure (SUMMARY.md)
```
- Getting Started
- Application Types
- Guides
- Activities
- Expressions
- Extensibility
- Multitenancy
- Operate
- Optimize
- Hosting
- Studio
- Authentication
- Features
```

### Proposed Structure
```
- Overview
  - What is Elsa?
  - Features
  - What's New in V3
  - Architecture
  - Use Cases
- Getting Started
  - Prerequisites
  - Hello World
  - Docker Quickstart
  - Your First HTTP Workflow
- Fundamentals
  - Workflows
  - Activities
  - Inputs & Outputs
  - Variables
  - Expressions
  - Bookmarks
  - Triggers
  - Workflow Context
  - Execution Model
  - Persistence
- Using Elsa Studio
  - Overview
  - Setup
  - Studio Tour
  - Designing Workflows
  - Testing & Debugging
  - Managing Instances
  - Customization
  - Embedding Studio
- Guides
  - HTTP Workflows
  - Timer & Scheduled Workflows
  - Loading Workflows from JSON
  - Invoking Workflows
  - Common Workflow Patterns
  - External System Integration
  - Long-Running Workflows
  - Error Handling & Retry
- Deployment & Configuration
  - Hosting Options
  - Application Types
  - Database Configuration
  - Authentication & Authorization
  - Configuration Management
  - Docker Deployment
  - Kubernetes
  - Clustering & Distributed Hosting
  - Scaling & Performance
  - Database Migrations
- Extensibility
  - Custom Activities
  - Blocking & Trigger Activities
  - Activity Type Providers
  - Custom UI Hints
  - Custom UI Components
  - Custom Icons
  - Workflow Providers
  - Plugins & Modules
  - Registering Custom Types
- Integrations
  - Identity Providers
  - MassTransit
  - Hangfire
  - Monitoring & Observability
- Observability & Troubleshooting
  - Logging
  - Monitoring & Alerting
  - Distributed Tracing
  - Troubleshooting Guide
  - Performance Tuning
  - Alterations
- Migration
  - V2 to V3 Migration
  - Breaking Changes
- Reference
  - Activity Reference
  - Expression Reference
  - API Reference
  - Configuration Reference
  - Studio API
- FAQ
- Community & Resources
```

## Implementation Plan

### Phase 1 (Week 1-2): Critical Fixes & New Content
1. Fix Hello World example (#72)
2. Fix HTTP Workflows guide (#69, #71, #85)
3. Create Database Configuration guide
4. Create Docker Quickstart
5. Create V2 to V3 Migration guide
6. Expand Authentication guide

### Phase 2 (Week 3-4): High-Impact Additions
7. Create Architecture overview
8. Create Kubernetes deployment guide
9. Create Studio Tour
10. Create Testing & Debugging guide
11. Rewrite Custom Activities for V3
12. Create Blocking & Trigger Activities guide
13. Create Studio Embedding guide

### Phase 3 (Week 5-6): Medium-Priority Content
14. Expand Clustering guide
15. Create Monitoring guide
16. Create Troubleshooting guide
17. Create Workflow Patterns guide
18. Create Plugins & Modules guide
19. Create Workflow Context V3 guide

### Phase 4 (Week 7-8): Polish & Complete
20. Update all remaining navigation
21. Create remaining integration guides
22. Expand reference documentation
23. Create FAQ from issues
24. Add case studies

## Migration Strategy

1. **Keep current URLs working**: Use redirects where possible
2. **Add "moved" notices**: On pages that relocate
3. **Update all internal links**: After moves are complete
4. **Test all examples**: Validate code samples work
5. **Run link checker**: Ensure no broken links
6. **Visual QA**: Check formatting, images, code blocks

## Success Metrics

- **Coverage**: 80%+ of persona-stage cells with ✅ Good rating
- **Issues Resolved**: Close 30+ documentation-related issues
- **Time to First Workflow**: Reduce from hours to minutes
- **Support Reduction**: 40% fewer configuration questions
