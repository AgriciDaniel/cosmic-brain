# Contributing to Elsa Workflows Documentation

Thank you for your interest in improving the Elsa Workflows documentation!

## Documentation Structure

This repository uses GitBook to manage documentation. The structure is defined in `SUMMARY.md`, which serves as the table of contents.

### Key Files and Directories

- `SUMMARY.md` - Table of contents and navigation structure
- `README.md` - Landing page (Elsa Workflows 3 introduction)
- `getting-started/` - Getting started guides and tutorials
- `guides/` - In-depth guides for specific scenarios
- `activities/` - Activity reference documentation
- `studio/` - Elsa Studio documentation
- `hosting/`, `operate/`, `optimize/` - Operational documentation
- `docs/meta/` - Analysis artifacts and metadata (generated)

## Local Development

### Option 1: GitBook Editor (Recommended)

The easiest way to preview the documentation is using the GitBook web interface:

1. Visit [GitBook.com](https://www.gitbook.com/)
2. Connect your GitHub account
3. Import the elsa-gitbook repository
4. Make changes through the GitBook editor

### Option 2: Local Markdown Preview

Since this is a GitBook repository without local build tools installed, you can:

1. Use any markdown editor with preview (VS Code, Typora, etc.)
2. View individual `.md` files directly on GitHub
3. Use the GitBook CLI (requires separate installation):

```bash
# Install GitBook CLI (legacy)
npm install -g gitbook-cli

# Install dependencies
cd /path/to/elsa-gitbook
gitbook install

# Serve locally
gitbook serve
# Opens at http://localhost:4000
```

**Note**: The GitBook CLI is deprecated. For the best experience, use the GitBook web interface.

## Making Changes

### Content Guidelines

1. **Keep it clear and concise** - Documentation should be accessible to developers of all skill levels
2. **Provide examples** - Include code samples and real-world scenarios
3. **Update navigation** - If adding new pages, update `SUMMARY.md`
4. **Cross-link** - Link to related topics and external resources (guides, samples repos)
5. **Validate code samples** - Ensure code examples compile and work with the latest Elsa version

### File Naming Conventions

- Use lowercase with hyphens: `my-new-guide.md`
- Place files in appropriate directories based on topic
- Keep file names descriptive but concise

### Front Matter

Each markdown file should include front matter when needed:

```markdown
---
description: Brief description of the page content
---

# Page Title
```

## Submitting Changes

1. Create a feature branch: `git checkout -b docs/my-improvement`
2. Make your changes
3. Commit with clear messages: `git commit -m "docs: add HTTP workflow troubleshooting guide"`
4. Push and open a Pull Request
5. Reference any related issues in the PR description

## Analysis Artifacts

The `docs/meta/` directory contains machine-generated analysis files:

- `sitemap.json` - Complete map of all documentation pages
- `current-coverage.md` - Summary of existing documentation coverage
- `core-concepts.md` - Key concepts from elsa-core repository
- `studio-features.md` - UI features from elsa-studio repository
- `personas.md` - User personas and their needs
- `doc-signals-*.md` - Issues and pain points from various repositories
- `gap-matrix.md` - Documentation gaps by persona and lifecycle stage
- `target-ia.yaml` - Proposed information architecture
- `ia-diff.md` - Comparison of current vs. target IA
- `backlog.md` - Prioritized documentation tasks

These files help guide documentation improvements and should be updated periodically.

## Questions?

If you have questions about contributing, please:

- Open an issue in this repository
- Join the Elsa Workflows community discussions
- Check existing documentation first

Thank you for helping improve Elsa Workflows documentation!
