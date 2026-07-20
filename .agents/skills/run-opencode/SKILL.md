---
name: run-opencode
description: Run OpenCode CLI for AI-powered code analysis, refactoring, and troubleshooting. Use for direct prompts, file context analysis, and terminal output processing. Optimized for use with a weaker local model — tasks are scoped narrowly, constrained explicitly, and verified after every run.
---

# OpenCode CLI

OpenCode is an AI-powered coding assistant CLI that can analyze code, refactor files, fix errors, and process terminal output.

**Model note:** this workflow assumes OpenCode is running on a smaller/weaker model, not a frontier model. 
- Use **qwen35b** for general tasks and faster results.
- Use **qwen27b** for more specialized coding tasks and slower results.

Every section below is written around that constraint — narrow scope, explicit guardrails, and mandatory verification. Do not skip the verification steps even when output "looks fine"; weak models produce plausible-looking wrong answers more often than obviously broken ones.

## Installation

OpenCode should be installed globally via npm:

```bash
npm install -g opencode
```

Check installation:

```bash
opencode --version
```

## Core Principle: Scope Every Task Down

A weak model's accuracy drops sharply as task size, file size, and ambiguity increase. Before running anything, break the work into the smallest unit that's still useful.

- Bad: "Refactor @src/api/client.ts to be cleaner"
- Good: "Extract the retry logic in @src/api/client.ts into a standalone `retryWithBackoff` function. Don't change anything else."

Rules of thumb:
- One file, one concern, per prompt. If a task touches multiple files or multiple unrelated concerns, split it into separate `opencode run` calls.
- If a file is large, point the model at the relevant function/section instead of the whole file where possible.
- Prefer mechanical, well-specified asks (rename, extract, add types, fix this specific error) over open-ended ones (improve this, optimize this, clean this up).

## Always Add Explicit Constraints

Weak models wander without guardrails. Every prompt should state what NOT to do, not just what to do.

```bash
opencode run "Fix the null pointer error on line 42 of @src/utils/parser.ts. Only change that function. Do not modify imports, exports, or any other function. Do not change formatting elsewhere in the file."
```

Useful constraint patterns to default to:
- "Only modify X, leave everything else untouched"
- "Do not change the function signature"
- "Output only the corrected code block, no explanation"
- "Do not add new dependencies"
- "Preserve existing variable/function names unless explicitly asked to rename"

If the model's output violates a stated constraint, that's a signal to shrink the task further next time, not to just re-prompt and hope.

## Basic Usage

### Direct Prompts

```bash
opencode run "Explain what the main entry point of this project does"
```

Read-only/explanatory prompts (no code changes) are lower-risk and don't need the full verification pass below — just sanity-check the explanation against the actual code.

### File Context Analysis

Include specific files in your prompt using the `@` symbol:

```bash
opencode run "Refactor @src/index.js to use modern async/await syntax. Only touch the function bodies, not the exports."
```

Avoid passing more than 2-3 files in a single prompt. If a task genuinely needs more context than that, it's too big for a single weak-model call — split it.

### Terminal Output Processing

Pipe terminal output directly into OpenCode for debugging and analysis:

```bash
# Fix failing tests
npm test | opencode run "Fix whatever error is causing this test suite to fail. Only modify the failing test or the minimal code needed to make it pass."

# Generate git commit messages
git diff | opencode run "Generate a clear, professional git commit message based on these changes. Output only the commit message, nothing else."

# Analyze build errors
npm run build 2>&1 | opencode run "Explain and fix these build errors. List each fix separately before applying."
```

Trim piped output before sending it where possible (e.g. `| tail -50`) — long, noisy input increases the chance of the model latching onto the wrong part of the log.

## Mandatory Verification Pass

Treat every code-modifying OpenCode output as a draft, not a finished change. Never apply a diff without running this pass.

1. **Re-run the original signal.** If OpenCode "fixed" a failing test or build error, re-run that exact command yourself to confirm it actually passes now. Don't trust the model's own claim that it fixed the issue.
2. **Lint/typecheck.** Run your project's linter and/or type checker on any changed file before accepting it.
3. **Diff review.** Always read the actual diff before applying:
   ```bash
   git diff
   ```
   Check specifically: did it touch anything outside what you scoped? Did it quietly change behavior beyond the stated fix?
4. **Second-pass self-review.** Pipe the diff back through OpenCode for a sanity check. This catches a meaningful fraction of mistakes even on the same weak model:
   ```bash
   git diff | opencode run "Review this diff strictly against the instruction: '<paste original instruction>'. Flag anything that goes beyond that instruction."
   ```
5. **Human review for anything non-trivial.** Mechanical changes (renames, formatting, simple extractions) can go straight to step 1-4. Anything touching logic, auth, data handling, public APIs, or architecture needs a human to read the diff before merge — don't let OpenCode self-certify those.

If a verification step fails, don't just re-run the same prompt — shrink the task or add a tighter constraint and try again.

## Session Management — Use Deliberately

Sessions carry context forward, which helps consistency but also means a confused session stays confused. Manage this actively rather than defaulting to `--continue` on autopilot.

```bash
# Continue the last session (only when prior context is still correct)
opencode run --continue "Continue with the refactoring"

# Fork before anything risky, so a bad attempt doesn't pollute the working session
opencode run --session <session-id> --fork "Try a different approach"
```

Guidelines:
- Fork before trying an alternative approach, a larger change, or anything you're unsure about.
- If a session has produced a wrong or off-scope answer, don't `--continue` it — start fresh. Weak models tend to repeat or compound earlier mistakes rather than self-correct mid-session.
- List sessions periodically and discard stale ones rather than accumulating ambiguous context:
  ```bash
  opencode session list
  ```

## What to Use OpenCode For (and What to Escalate)

Reserve OpenCode for tasks where mistakes are cheap, obvious, and easy to verify:

**Good fit:**
- Boilerplate generation (config files, repetitive scaffolding)
- Mechanical refactors (extract function, rename, convert syntax)
- Adding type annotations / JSDoc to already-correct code
- Commit message generation
- First-pass triage of logs/test failures (to point you at the right place, not to trust the fix blindly)
- Formatting and lint-fix passes

**Escalate elsewhere (don't trust OpenCode alone for):**
- Security-sensitive code (auth, crypto, input validation, anything handling untrusted data)
- Architectural decisions or cross-cutting changes
- Anything where a subtle bug would be expensive or hard to catch later
- Ambiguous or underspecified requirements — clarify and narrow the task yourself first rather than letting the model guess

When in doubt, use OpenCode for the rough first pass, then verify or finish the work yourself.

## Common Workflows

### Code Review

```bash
git diff HEAD~1 | opencode run "Review this diff for potential bugs and improvements. List findings as a numbered list, do not modify any files."

opencode run "Review @src/components/Header.tsx for accessibility issues. List issues only, do not apply fixes."
```

Use OpenCode for review/triage even on sensitive code — just don't let it apply the fix unsupervised.

### Error Troubleshooting

```bash
pytest | opencode run "Analyze these test failures and suggest fixes. List each failure and proposed fix separately before changing anything."

cat error.log | opencode run "Explain this error and suggest how to fix it. Do not apply changes, just explain."
```

### Refactoring

```bash
opencode run "Extract the formatting logic in @src/utils/formatters.ts into a separate function called formatCurrency. Do not change any other function in the file."

opencode run "Add explicit return types to the exported functions in @src/api/client.ts. Do not change function logic or behavior."
```

### Documentation

```bash
opencode run "Generate JSDoc comments for the functions in @src/utils/helpers.ts. Do not modify any code, only add comments."
```

## Advanced Options

### Output Format

```bash
# JSON output for scripting
opencode run --format json "Analyze this code" > output.json
```

### File Attachments

```bash
opencode run --file src/main.ts --file config.json "Analyze these files"
```

## Gotchas

- OpenCode requires network connectivity to reach AI providers.
- File paths with `@` must be relative to current directory.
- Piped input is treated as context, not as the primary prompt — be explicit about what the actual instruction is.
- Session continuity depends on session ID persistence; a confused session stays confused, so fork or restart rather than pushing through.
- Large file outputs may need to be trimmed before piping — both for the model's accuracy and to keep noise out of the diff.
- A weak model will sometimes report success ("fixed!", "tests now pass") without it being true. Always independently re-verify; never accept the model's own status claim as confirmation.

## Troubleshooting

### Command not found

```bash
which opencode
npm install -g opencode
```

### File context not working

Ensure file paths are correct and relative to current directory:

```bash
# Correct
opencode run "Analyze @src/index.ts"

# Incorrect (absolute path)
opencode run "Analyze @/usr/local/project/src/index.ts"
```

### Pipe not processing

Some commands buffer output. Use `2>&1` to merge stderr:

```bash
npm test 2>&1 | opencode run "Fix these errors"
```

### Session lost

Sessions have limited retention. For important work, save outputs and don't rely solely on session memory:

```bash
opencode run "Complex analysis" > analysis-results.txt
```

### Output looks plausible but is wrong

This is the most common failure mode with a weaker model — confident, well-formatted, incorrect output. If something feels off:
- Re-read the diff against the original instruction line by line.
- Re-run the original test/build/lint command yourself rather than trusting the model's summary.
- Shrink the task and re-prompt rather than asking the model to "try again" on the same broad instruction.
