import os
import subprocess
import argparse
import sys
import tempfile
import re
import glob
import shutil


def protect_and_convert_markdown(md_text: str) -> str:
    # Fix lists that don't have a blank line before them (strict markdown requirement)
    lines = md_text.split('\n')
    fixed_lines = []
    list_pattern = re.compile(r'^\s*([\*\-\+]|\d+\.)\s')
    for i, line in enumerate(lines):
        if i > 0 and list_pattern.match(line):
            prev_line = lines[i - 1].strip()
            if prev_line and not list_pattern.match(lines[i - 1]):
                fixed_lines.append('')
        fixed_lines.append(line)
    md_text = '\n'.join(fixed_lines)

    # 1. Protect code blocks and inline code from math extraction
    code_blocks = []
    code_inlines = []

    def save_code_block(m):
        idx = len(code_blocks)
        code_blocks.append(m.group(0))
        return f"@@CODE_BLOCK_{idx}@@"

    def save_code_inline(m):
        idx = len(code_inlines)
        code_inlines.append(m.group(0))
        return f"@@CODE_INLINE_{idx}@@"

    md_text = re.sub(r"(```[\s\S]*?```)", save_code_block, md_text)
    md_text = re.sub(r"(`[^`\n]+?`)", save_code_inline, md_text)

    # 2. Protect LaTeX and math expressions from python-markdown mangle
    math_blocks = []
    math_inlines = []

    def save_math_block(m):
        idx = len(math_blocks)
        math_blocks.append(m.group(0))
        return f"@@MATH_BLOCK_{idx}@@"

    def save_math_inline(m):
        idx = len(math_inlines)
        math_inlines.append(m.group(0))
        return f"@@MATH_INLINE_{idx}@@"

    # Block math: $$...$$ or \[...\]
    md_text = re.sub(r"(?<!\\)\$\$([\s\S]+?)(?<!\\)\$\$", save_math_block, md_text)
    md_text = re.sub(r"(?<!\\)\\\[([\s\S]+?)(?<!\\)\\\]", save_math_block, md_text)
    # Inline math: \(...\) or $...$
    md_text = re.sub(r"(?<!\\)\\\(([\s\S]+?)(?<!\\)\\\)", save_math_inline, md_text)
    md_text = re.sub(r"(?<![\$\\])\$(?!\s)([^\$\n]+?)(?<!\s)(?<!\\)\$", save_math_inline, md_text)

    # 3. Restore code blocks and inlines so markdown processes code syntax
    for i, c in enumerate(code_blocks):
        md_text = md_text.replace(f"@@CODE_BLOCK_{i}@@", c)
    for i, c in enumerate(code_inlines):
        md_text = md_text.replace(f"@@CODE_INLINE_{i}@@", c)

    # 4. Convert markdown to HTML
    try:
        import markdown
        html_body = markdown.markdown(md_text, extensions=['extra', 'sane_lists', 'md_in_html'])
    except ImportError:
        print("Error: The 'markdown' Python package is not installed. Please run: pip install markdown")
        sys.exit(1)

    # 5. Restore math expressions into HTML
    for i, m in enumerate(math_blocks):
        # Normalize double-escaped LaTeX commands (e.g. \\text -> \text)
        clean_m = re.sub(r'\\\\([a-zA-Z])', r'\\\1', m)
        html_body = html_body.replace(f"@@MATH_BLOCK_{i}@@", clean_m)
    for i, m in enumerate(math_inlines):
        # Normalize double-escaped LaTeX commands
        clean_m = re.sub(r'\\\\([a-zA-Z])', r'\\\1', m)
        html_body = html_body.replace(f"@@MATH_INLINE_{i}@@", clean_m)

    return html_body


def find_browser() -> str | None:
    if sys.platform == 'darwin':
        # Prioritize Playwright chrome-headless-shell to bypass macOS display link latency/hangs
        playwright_candidates = glob.glob(
            os.path.expanduser("~/Library/Caches/ms-playwright/**/chrome-headless-shell"),
            recursive=True
        )
        mac_candidates = playwright_candidates + [
            "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
            "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
            "/Applications/Chromium.app/Contents/MacOS/Chromium",
        ]
        for c in mac_candidates:
            if os.path.exists(c) and os.access(c, os.X_OK):
                return c
    elif sys.platform == 'win32':
        candidates = [
            r"C:\Program Files\Google\Chrome\Application\chrome.exe",
            r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
            os.path.expandvars(r"%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"),
            r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
            os.path.expandvars(r"%PROGRAMFILES%\Microsoft\Edge\Application\msedge.exe"),
        ]
        for c in candidates:
            if os.path.exists(c):
                return c
    else:
        for c in ["google-chrome", "google-chrome-stable", "chromium-browser", "chromium"]:
            found = shutil.which(c)
            if found:
                return found
    return None


def main():
    parser = argparse.ArgumentParser(description="Convert Markdown to PDF using Headless Chrome with KaTeX math support")
    parser.add_argument('-i', '--input', required=True, help="Path to the input Markdown file")
    parser.add_argument('-o', '--output', required=True, help="Path to the output PDF file")
    parser.add_argument('--timeout', type=int, default=30, help="Timeout in seconds for PDF generation (default: 30)")
    args = parser.parse_args()

    md_path = os.path.abspath(args.input)
    pdf_path = os.path.abspath(args.output)

    if not os.path.exists(md_path):
        print(f"Error: Input file '{md_path}' does not exist.")
        sys.exit(1)

    with open(md_path, 'r', encoding='utf-8') as f:
        md_text = f.read()

    html_body = protect_and_convert_markdown(md_text)

    md_dir_uri = 'file:///' + os.path.dirname(md_path).replace(os.sep, '/') + '/'

    html_content = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <base href="{md_dir_uri}">
    <title>{os.path.basename(md_path)}</title>
    <!-- KaTeX CSS & JS for Math Typesetting -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
    <script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"></script>
    <script>
        window.addEventListener("load", function() {{
            if (typeof renderMathInElement === "function") {{
                renderMathInElement(document.body, {{
                    delimiters: [
                        {{left: "$$", right: "$$", display: true}},
                        {{left: "\\\\[", right: "\\\\]", display: true}},
                        {{left: "$", right: "$", display: false}},
                        {{left: "\\\\(", right: "\\\\)", display: false}}
                    ],
                    throwOnError: false
                }});
            }}
        }});
    </script>
    <style>
        @page {{
            margin: 1in 0.5in;
        }}
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
            color: #24292f;
            line-height: 1.6;
            padding: 0;
            padding-bottom: 30px;
            max-width: 900px;
            margin: 0 auto;
        }}
        ul, ol {{
            margin: 15px 0;
            padding-left: 30px;
        }}
        li {{
            margin-bottom: 8px;
        }}
        h1, h2, h3, h4, h5, h6 {{
            color: #1f2328;
            page-break-after: avoid;
            break-after: avoid;
        }}
        h1 {{
            color: #0969da;
            border-bottom: 1px solid #d0d7de;
            padding-bottom: 0.3em;
        }}
        h2 {{
            color: #1a7f37;
            page-break-before: always;
            break-before: page;
            border-bottom: 1px solid #d8dee4;
            padding-bottom: 0.3em;
            margin-top: 24px;
        }}
        h3 {{
            color: #24292f;
            margin-top: 20px;
        }}
        code {{
            background-color: rgba(175, 184, 193, 0.2);
            padding: 0.2em 0.4em;
            border-radius: 6px;
            font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
            font-size: 85%;
        }}
        pre {{
            background-color: #f6f8fa;
            padding: 16px;
            border-radius: 6px;
            overflow-x: auto;
            font-size: 85%;
            line-height: 1.45;
        }}
        pre code {{
            background-color: transparent;
            padding: 0;
            border-radius: 0;
        }}
        table {{
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 13px;
        }}
        th, td {{
            border: 1px solid #d0d7de;
            padding: 8px 12px;
            text-align: left;
        }}
        th {{
            background-color: #f6f8fa;
            font-weight: 600;
        }}
        tr:nth-child(2n) {{
            background-color: #fcfcfc;
        }}
        img {{
            max-width: 100%;
            height: auto;
            border: 1px solid #d0d7de;
            border-radius: 6px;
            margin: 15px 0;
            display: block;
        }}
        hr {{
            height: 0.25em;
            padding: 0;
            margin: 24px 0;
            background-color: #d0d7de;
            border: 0;
        }}
        blockquote {{
            margin: 16px 0;
            padding: 0 1em;
            color: #57606a;
            border-left: 0.25em solid #d0d7de;
        }}
        .katex-display {{
            margin: 1em 0;
            overflow-x: auto;
            overflow-y: hidden;
        }}
    </style>
</head>
<body>
    <div style="position: fixed; bottom: 0; left: 0; width: 100%; text-align: center; font-size: 9pt; color: #6e7781; padding-bottom: 5px; background: white;">
        {os.path.basename(md_path)} | Nikhil Mundhra
    </div>
    {html_body}
</body>
</html>
"""

    fd, html_path = tempfile.mkstemp(suffix=".html", text=True)
    with os.fdopen(fd, 'w', encoding='utf-8') as f:
        f.write(html_content)

    chrome_path = find_browser()
    if not chrome_path:
        print("Error: No Chromium, Chrome, or Edge executable found.")
        os.remove(html_path)
        sys.exit(1)

    print(f"Browser : {chrome_path}")
    print(f"Input   : {md_path}")
    print(f"Output  : {pdf_path}")
    print("Generating PDF with KaTeX math typesetting...")

    try:
        result = subprocess.run([
            chrome_path,
            '--headless',
            '--disable-gpu',
            '--no-pdf-header-footer',
            '--virtual-time-budget=4000',
            '--run-all-compositor-stages-before-draw',
            f'--print-to-pdf={pdf_path}',
            html_path
        ], capture_output=True, text=True, timeout=args.timeout)

        if result.returncode == 0 and os.path.exists(pdf_path):
            size_kb = os.path.getsize(pdf_path) // 1024
            print(f"\nSUCCESS: {pdf_path} ({size_kb} KB)")
        else:
            print(f"FAIL: Browser exited with code {result.returncode}")
            if result.stderr.strip():
                print(f"       {result.stderr.strip()}")
            sys.exit(1)

    except subprocess.TimeoutExpired:
        print(f"Error: Browser timed out after {args.timeout}s.")
        sys.exit(1)
    except Exception as exc:
        print(f"Exception while generating PDF: {exc}")
        sys.exit(1)
    finally:
        if os.path.exists(html_path):
            os.remove(html_path)


if __name__ == "__main__":
    main()
