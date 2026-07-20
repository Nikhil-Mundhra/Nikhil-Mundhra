---
name: docmancer
description: How to correctly run the docmancer CLI in PowerShell to query context and fetch documentation without syntax errors.
when_to_use: "When needing to query local documentation, fetch public docs, or get API references using docmancer CLI."
allowed-tools: Read, Glob, Grep, Bash
---

# Running Docmancer in PowerShell

Docmancer is used to compress documentation context so coding agents spend tokens on code, not on rereading raw docs.

The executable is located at `'C:\Users\Int202613\AppData\Local\Programs\Python\Python312\Scripts\docmancer.exe'` and requires the config `'C:\Users\Int202613\.docmancer\docmancer.yaml'`.

## Important PowerShell Execution Requirement

Because the executable path is provided as a quoted string, **you must use the PowerShell call operator (`&`)** to execute it. If you try to run it directly without the call operator, PowerShell will treat it as a string and fail with an error like `Unexpected token 'config' in expression or statement`.

### Correct usage example:
```powershell
& 'C:\Users\Int202613\AppData\Local\Programs\Python\Python312\Scripts\docmancer.exe' --config 'C:\Users\Int202613\.docmancer\docmancer.yaml' query "how to change text within a document in MS Word Add-in Office.js"
```

## Core Commands Reference

*(Note: Replace `docmancer` in the below examples with the full `& 'C:\...' --config 'C:\...'` command string as shown above)*

```bash
docmancer setup
docmancer ingest ./docs
docmancer add https://docs.example.com
docmancer update
docmancer query "how to authenticate"
docmancer query "how to authenticate" --limit 10
docmancer query "how to authenticate" --expand
docmancer query "how to authenticate" --expand page
docmancer query "how to authenticate" --format json
docmancer query "how to authenticate" --allow-degraded
docmancer clear --dry-run
docmancer list
docmancer inspect
docmancer remove <source>
docmancer doctor
docmancer fetch <url> --output <dir>
```

## Usage Guidelines
- When documentation context is relevant, do not rely only on model memory or latest-only hosted docs. 
- Always query docmancer first, then cite or summarize the relevant local sections in the response.
- Use `--expand` for adjacent sections; use `--expand page` only when the surrounding page is necessary.
