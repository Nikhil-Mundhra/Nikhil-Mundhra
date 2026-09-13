"""
html_to_pdf.py — Convert any HTML file to PDF using headless Chrome or Edge.

Respects all print CSS already embedded in the HTML file:
  - @page margins
  - page-break-before / break-before
  - .no-print classes

Usage:
    python html_to_pdf.py --input "path/to/report.html"
    python html_to_pdf.py --input "path/to/report.html" --output "path/to/report.pdf"
    python html_to_pdf.py --input "path/to/report.html" --timeout 60
"""

import os
import sys
import argparse
import subprocess
from pathlib import Path


CHROME_CANDIDATES = [
    # macOS
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    # Windows
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    os.path.expandvars(r"%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"),
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    os.path.expandvars(r"%PROGRAMFILES%\Microsoft\Edge\Application\msedge.exe"),
    # Linux
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium",
]


def find_browser() -> str | None:
    import glob
    playwright_candidates = glob.glob(os.path.expanduser("~/Library/Caches/ms-playwright/**/chrome-headless-shell"), recursive=True)
    for candidate in playwright_candidates + CHROME_CANDIDATES:
        if os.path.exists(candidate) and os.access(candidate, os.X_OK):
            return candidate
    return None


def convert(input_path: Path, output_path: Path, timeout: int = 30) -> None:
    input_path = input_path.resolve()
    output_path = output_path.resolve()

    if not input_path.exists():
        print(f"Error: Input file not found:\n  {input_path}")
        sys.exit(1)

    browser = find_browser()
    if not browser:
        print(
            "Error: Could not locate Chrome or Edge.\n"
            "Install Google Chrome or Microsoft Edge and try again."
        )
        sys.exit(1)

    print(f"Browser : {browser}")
    print(f"Input   : {input_path}")
    print(f"Output  : {output_path}")
    print("Generating PDF...")

    try:
        result = subprocess.run(
            [
                browser,
                "--headless",
                "--disable-gpu",
                "--no-pdf-header-footer",
                f"--print-to-pdf={output_path}",
                str(input_path),
            ],
            capture_output=True,
            text=True,
            timeout=timeout,
        )

        if result.returncode == 0 and output_path.exists():
            size_kb = output_path.stat().st_size // 1024
            print(f"\nSUCCESS: {output_path}  ({size_kb} KB)")
        else:
            print(f"FAIL: Browser exited with code {result.returncode}")
            if result.stderr.strip():
                print(f"       {result.stderr.strip()}")
            sys.exit(1)

    except subprocess.TimeoutExpired:
        print(f"Error: Browser timed out after {timeout}s. Try --timeout <seconds>.")
        sys.exit(1)
    except Exception as exc:
        print(f"Error: {exc}")
        sys.exit(1)


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Convert an HTML file to PDF using headless Chrome or Edge."
    )
    parser.add_argument(
        "-i", "--input",
        required=True,
        help="Path to the input HTML file.",
    )
    parser.add_argument(
        "-o", "--output",
        default=None,
        help="Output PDF path. Defaults to <input_name>.pdf in the same directory.",
    )
    parser.add_argument(
        "--timeout",
        type=int,
        default=30,
        help="Seconds to wait for the browser (default: 30).",
    )
    args = parser.parse_args()

    input_path = Path(args.input)
    output_path = Path(args.output) if args.output else input_path.with_suffix(".pdf")

    convert(input_path, output_path, timeout=args.timeout)


if __name__ == "__main__":
    main()
