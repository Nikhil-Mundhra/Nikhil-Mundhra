---
name: quality-assurance
description: "Automatic quality control, testing patterns, and static analysis procedures. Covers linting, formatting, test suite architecture (Unit/Integration/E2E), and mocking strategies."
when_to_use: "When writing unit tests, running linters, setting up integration tests, or performing code health checks."
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Quality Assurance & Testing

> **MANDATORY:** Run appropriate validation tools after EVERY code change. Do not finish a task until the code is error-free.

## 1. The Quality Loop
1. **Write/Edit Code**
2. **Lint & Format**: Run the ecosystem-specific linter (e.g. `npm run lint` or `ruff check`).
3. **Type Check**: Run static analysis (e.g. `npx tsc --noEmit` or `mypy`).
4. **Test**: Run unit and integration tests.

## 2. Testing Pyramid & Patterns
- **Unit (Many)**: Fast (<100ms), isolated logic testing. Mock all external dependencies.
- **Integration (Some)**: API, DB queries, cross-module communication. Use fixtures and realistic data.
- **E2E (Few)**: Critical user flows (e.g., Playwright smoke tests).

### The AAA Pattern
- **Arrange**: Set up test data, factories, and fixtures.
- **Act**: Execute the specific code path under test.
- **Assert**: Verify the expected outcome (One logical assert per test).

## 3. Mocking Principles
- **Mock**: External APIs, Database calls (in unit tests), network, time, and randomness.
- **Don't Mock**: Pure functions, simple internal utilities, the actual code under test.

**Tests are documentation.** If someone can't understand what the code does from the tests, rewrite them.
