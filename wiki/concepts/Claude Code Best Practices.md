---
type: concept
title: "Claude Code Best Practices"
created: 2026-05-25
updated: 2026-05-25
address: c-000034
status: developing
tags:
  - claude-code
  - best-practices
  - workflow
  - context-management
  - anthropic
related:
  - "[[Claude Code Context Management]]"
  - "[[LLM Wiki Pattern]]"
  - "[[claude-code-best-practices]]"
---

# Claude Code Best Practices

Anthropic's official guide for getting the most out of Claude Code. The central insight: **Claude's context window is the most important resource to manage.** Most best practices derive from this constraint.

## Core Principle: Context Window Discipline

The context window holds the entire conversation (messages, file reads, command outputs). Performance degrades as it fills — Claude "forgets" earlier instructions and makes more mistakes. Track usage with a [custom status line](https://code.claude.com/docs/en/statusline). See [[Claude Code Context Management]] for detailed strategies.

## 1. Give Claude a Way to Verify Its Work

The single highest-leverage practice. Without clear success criteria, you become the only feedback loop.

| Strategy | Example |
|---|---|
| **Provide test cases** | "write a validateEmail function. test cases: user@example.com is true, invalid is false" |
| **Verify UI visually** | "paste screenshot, implement design, take screenshot, compare, list differences, fix" |
| **Address root causes** | "build fails with this error. fix it and verify build succeeds. address root cause" |

UI verification via the [Chrome extension](https://code.claude.com/docs/en/chrome). Verification can also be a test suite, linter, or Bash command.

## 2. Explore First, Then Plan, Then Code

Separate research and planning from implementation. Use [plan mode](https://code.claude.com/docs/en/permission-modes#analyze-before-you-edit-with-plan-mode) for multi-file changes.

**When to plan:** uncertain approach, multi-file changes, unfamiliar code.
**When to skip:** clear scope, small fix, describable diff in one sentence.

## 3. Provide Specific Context in Prompts

| Strategy | Before | After |
|---|---|---|
| **Scope the task** | "add tests for foo.py" | "write a test for foo.py covering logged-out edge case. avoid mocks." |
| **Point to sources** | "why does ExecutionFactory have a weird api?" | "look through ExecutionFactory's git history and summarize how its api came to be" |
| **Reference patterns** | "add a calendar widget" | "look at existing widgets to understand patterns. HotDogWidget is a good example. follow the pattern." |
| **Describe symptoms** | "fix the login bug" | "users report login fails after session timeout. check auth flow in src/auth/, especially token refresh. write failing test, then fix" |

Vague prompts are useful for exploration. "What would you improve in this file?" can surface unexpected insights.

### Rich Content

- `@` references to files
- Paste/drag images
- URLs for docs and APIs
- Pipe data: `cat error.log | claude`
- Let Claude fetch context itself via Bash, MCP, or file reads

## 4. Configure Your Environment

### CLAUDE.md

Run `/init` for a starter file based on project structure. Include Bash commands, code style, and workflow rules. Keep it short and human-readable.

| Include | Exclude |
|---|---|
| Bash commands Claude can't guess | Anything Claude can figure out from code |
| Code style rules differing from defaults | Standard language conventions |
| Testing instructions | Detailed API docs (link instead) |
| Repo etiquette | Frequently-changing info |
| Architectural decisions | Long explanations or tutorials |
| Dev environment quirks | File-by-file codebase descriptions |
| Common gotchas | "write clean code" platitudes |

**Placement:** `~/.claude/CLAUDE.md` (global), `./CLAUDE.md` (project, git), `./CLAUDE.local.md` (personal, gitignored), parent/child directories for monorepos. Import additional files with `@path/to/file`.

**Maintenance:** If Claude ignores a rule, the file is too long. If Claude asks about things in CLAUDE.md, the phrasing is ambiguous. Treat like code: review when things go wrong, prune regularly, test changes.

### Permissions

Three ways to reduce approval fatigue:
- **Auto mode**: classifier blocks only risky actions (scope escalation, unknown infra, hostile content)
- **Allowlists**: permit known-safe tools (`npm run lint`, `git commit`)
- **Sandboxing**: OS-level isolation for defined boundaries

### CLI Tools

Install `gh`, `aws`, `gcloud`, `sentry-cli`. CLI tools are the most context-efficient way to interact with external services. Claude can learn new CLI tools: "Use 'foo-cli-tool --help' to learn about foo tool, then use it to solve A, B, C."

### MCP Servers

Run `claude mcp add` to connect Notion, Figma, databases, issue trackers, monitoring.

### Hooks

Scripts that run deterministically at specific points in Claude's workflow. Unlike CLAUDE.md (advisory), hooks guarantee execution. "Write a hook that runs eslint after every file edit."

### Skills

`SKILL.md` files in `.claude/skills/` for domain knowledge and reusable workflows. Use `disable-model-invocation: true` for side-effect-heavy workflows triggered manually.

### Subagents

Defined in `.claude/agents/`. Run in isolated context with own tool set. Useful for tasks that read many files (research, security review) without consuming main context.

### Plugins

Run `/plugin` to browse marketplace. Bundle skills, hooks, subagents, MCP servers. Install code intelligence plugins for typed languages.

## 5. Communicate Effectively

### Ask Codebase Questions

Ask Claude what you'd ask a senior engineer: "How does logging work?", "How do I make a new API endpoint?", "What edge cases does CustomerOnboardingFlowImpl handle?"

### Let Claude Interview You

For larger features, start with a minimal prompt and ask Claude to interview you using `AskUserQuestion`. It asks about technical implementation, UI/UX, edge cases, tradeoffs. Write a spec to SPEC.md, then start a fresh session to implement.

## 6. Manage Your Session

### Course-Correct Early

- **Esc**: stop mid-action, context preserved
- **Esc+Esc or /rewind**: open rewind menu, restore conversation/code/both
- **"Undo that"**: revert changes
- **/clear**: reset between unrelated tasks

After two failed corrections on the same issue: `/clear` and start fresh with an improved prompt.

### Manage Context Aggressively

- `/clear` between unrelated tasks
- Auto-compaction preserves important code and decisions
- `/compact <instructions>` for manual compaction with focus hints
- `/rewind` → **Summarize from here** or **Summarize up to here**
- `/btw` for side questions that don't enter history

Customize compaction in CLAUDE.md: "When compacting, preserve the full list of modified files and test commands."

### Subagents for Investigation

"Use subagents to investigate X." They explore in separate context, report summaries. Also useful for verification: "use a subagent to review this code for edge cases."

### Rewind with Checkpoints

Every prompt creates a checkpoint. Restore conversation, code, or both. Checkpoints persist across sessions (not a git replacement).

### Resume Conversations

Name sessions with `/rename`. `claude --continue` for most recent, `claude --resume` to pick from list.

## 7. Automate and Scale

### Non-Interactive Mode

`claude -p "prompt"` for CI, pre-commit hooks, scripts. Output formats: plain text, JSON (`--output-format json`), streaming JSON (`--output-format stream-json`).

### Parallel Sessions

- **Worktrees**: isolated git checkouts per session
- **Desktop app**: visual session management
- **Claude Code on the web**: cloud VM sessions
- **Agent teams**: automated multi-session coordination

### Writer/Reviewer Pattern

Session A implements, Session B reviews with fresh context. Same pattern works for test-first: one Claude writes tests, another writes code to pass them.

### Fan-Out

Loop through tasks with `claude -p` for each. Use `--allowedTools` for scoped permissions on batch operations.

### Auto Mode

`claude --permission-mode auto -p "fix all lint errors"`. Classifier blocks only risky actions. For non-interactive runs, aborts if repeatedly blocked.

## 8. Common Failure Patterns

| Pattern | Symptom | Fix |
|---|---|---|
| **Kitchen sink session** | Unrelated tasks in same session, irrelevant context | `/clear` between tasks |
| **Correcting over and over** | Multiple corrections on same issue | After 2 failures, `/clear` and write better prompt |
| **Over-specified CLAUDE.md** | Rules getting ignored | Ruthlessly prune; convert to hooks |
| **Trust-then-verify gap** | Plausible but incorrect implementation | Always provide verification |
| **Infinite exploration** | Claude reads hundreds of files | Scope narrowly or use subagents |

## 9. Develop Intuition

The patterns are starting points, not absolute rules. Sometimes accumulate context (deep complex problem), sometimes skip planning (exploratory), sometimes be vague (see how Claude interprets). Pay attention to what works and what doesn't. Develop intuition over time.
