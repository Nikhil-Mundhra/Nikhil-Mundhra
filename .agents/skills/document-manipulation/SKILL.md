---
name: document-manipulation
description: Toolkit for manipulating documents including docx to mdx/html conversions and markdown to PDF.
---

# Document Manipulation Skill

This skill provides a suite of scripts for automated document conversions. When you need to convert `.docx` or `.md` files, invoke the corresponding script.

## Available Scripts

All scripts are located in the `scripts/` directory of this skill.

### 1. DOCX to HTML
Extracts HTML content from a `.docx` file using `mammoth`. Supports extracting embedded Word images to an `assets/` folder via `--extract-images`.

**Usage:**
```bash
node C:\Users\Int202613\.gemini\config\skills\document-manipulation\scripts\docx_to_html.js --input "path/to/input.docx" --output "path/to/output.html" [--extract-images]
```

### 2. DOCX to MDX
Converts a `.docx` file directly to a clean `.mdx` file using `mammoth` and `turndown`. Optional `--clean-junk` strips legacy project headings, and `--extract-images` extracts embedded assets.

**Usage:**
```bash
node C:\Users\Int202613\.gemini\config\skills\document-manipulation\scripts\docx_to_mdx.js --input "path/to/input.docx" --output "path/to/output.mdx" [--clean-junk] [--extract-images]
```

### 3. Markdown to PDF
Converts a markdown (`.md`) file to a formatted `.pdf` using headless Chromium, Google Chrome, or Microsoft Edge.
- **LaTeX / Mathematical Typesetting**: Full support for inline math (`$0.9025$`, `$P_{95}$`, `$\mu\text{m}$`, `\( ... \)`) and display equations (`$$ ... $$`, `\[ ... \]`) via KaTeX auto-rendering.
- **Syntax Protection**: Automatically isolates math expressions before Markdown parsing so underscores and symbols are not mangled into HTML tags.
- **Deterministic Headless Rendering**: Utilizes Chrome virtual time budget flags (`--virtual-time-budget=4000`, `--run-all-compositor-stages-before-draw`) to ensure sub-pixel typography and equations are settled before snapshotting.
- **Browser Discovery**: Auto-detects Playwright `chrome-headless-shell` (bypassing macOS display link latency), standard Google Chrome, Microsoft Edge, and Chromium.

**Usage:**
```bash
python <path_to_skill>/scripts/md_to_pdf.py --input "path/to/input.md" --output "path/to/output.pdf" [--timeout 30]
```

## Auto-Installation
The scripts are designed to auto-install any missing dependencies (`mammoth`, `turndown`, `turndown-plugin-gfm` via npm; and `markdown` via pip for python). However, you should ensure Python and Google Chrome or Microsoft Edge are available for PDF conversion.

### 4. HTML to PDF
Converts a fully-rendered `.html` file directly to a `.pdf` using headless Chrome or Edge with full background color rendering (`--print-background`). Respects all print CSS already in the HTML file (`@page` margins, `page-break-before`, `break-before`, `.no-print` classes).

**Usage:**
```bash
python C:\Users\Int202613\.gemini\config\skills\document-manipulation\scripts\html_to_pdf.py --input "path/to/report.html" --output "path/to/report.pdf"
```

**Options:**
| Flag | Description |
| :--- | :--- |
| `-i` / `--input` | Path to the input `.html` file (required) |
| `-o` / `--output` | Output `.pdf` path. Defaults to `<input_name>.pdf` in the same directory |
| `--timeout` | Seconds to wait for Chrome (default: `30`) |

**Browser detection order:** Chrome (Program Files) → Chrome (x86) → Chrome (LocalAppData) → Edge (Program Files) → Edge (env). Exits with a clear error if none are found.

**Example — export the forensic audit report:**
```bash
python C:\Users\Int202613\.gemini\config\skills\document-manipulation\scripts\html_to_pdf.py \
  --input "C:\Users\Int202613\Downloads\FD_R07_Client_Forensic_Report.html" \
  --output "C:\Users\Int202613\Downloads\FD_R07_Client_Forensic_Report.pdf"
```

