---
name: document-manipulation
description: Toolkit for manipulating documents including docx to mdx/html conversions and markdown to PDF.
---

# Document Manipulation Skill

This skill provides a suite of scripts for automated document conversions. When you need to convert `.docx` or `.md` files, invoke the corresponding script.

## Available Scripts

All scripts are located in the `scripts/` directory of this skill.

### 1. DOCX to HTML
Extracts HTML content from a `.docx` file using `mammoth`. If output is `.json`, it wraps the HTML in a JSON object.

**Usage:**
```bash
node C:\Users\Int202613\.gemini\config\skills\document-manipulation\scripts\docx_to_html.js --input "path/to/input.docx" --output "path/to/output.html"
```

### 2. DOCX to MDX
Converts a `.docx` file directly to a clean `.mdx` file using `mammoth` and `turndown`. It applies specific cleanup rules to structure the resulting MDX document nicely.

**Usage:**
```bash
node C:\Users\Int202613\.gemini\config\skills\document-manipulation\scripts\docx_to_mdx.js --input "path/to/input.docx" --output "path/to/output.mdx"
```

### 3. Markdown to PDF
Converts a markdown (`.md`) file to a formatted `.pdf` using headless Google Chrome.

**Usage:**
```bash
python C:\Users\Int202613\.gemini\config\skills\document-manipulation\scripts\md_to_pdf.py --input "path/to/input.md" --output "path/to/output.pdf"
```

## Auto-Installation
The scripts are designed to auto-install any missing dependencies (`mammoth`, `turndown`, `turndown-plugin-gfm` via npm; and `markdown` via pip for python). However, you should ensure Python and Google Chrome are available for the PDF conversion.
