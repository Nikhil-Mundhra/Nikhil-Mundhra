"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Education", href: "/#education" },
  { label: "Certifications", href: "/#certifications" },
  { label: "Highlights", href: "/#highlights" },
  { label: "Blogs", href: "/blog" },
];

function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#060916]/80 border-b border-white/[0.08] transition-all duration-300">
      <nav
        aria-label="Primary Navigation"
        className="mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] flex items-center justify-between h-20"
      >
        {/* Brand Identity */}
        <Link
          href="/"
          className="group flex items-center gap-3 no-underline"
        >
          <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#16f2b3] via-violet-600 to-pink-500 p-[1px] flex items-center justify-center shadow-[0_0_20px_rgba(22,242,179,0.2)] group-hover:shadow-[0_0_25px_rgba(22,242,179,0.45)] transition-all">
            <span className="w-full h-full bg-[#090d1f] rounded-[11px] flex items-center justify-center font-mono text-sm font-bold text-[#16f2b3]">
              NM
            </span>
          </span>
          <div className="flex flex-col">
            <span className="text-white font-bold text-lg tracking-tight group-hover:text-[#16f2b3] transition-colors">
              Nikhil Mundhra
            </span>
            <span className="text-[11px] font-mono text-gray-400 hidden sm:inline">
              NYUAD | ML &amp; AI Systems
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="px-3.5 py-2 rounded-lg text-xs font-mono uppercase tracking-wider text-gray-300 hover:text-[#16f2b3] hover:bg-white/[0.04] transition-all no-underline"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right CTA & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/cv"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-semibold uppercase tracking-wider transition-all no-underline ${
              pathname === "/cv"
                ? "bg-[#16f2b3] text-[#060916] shadow-[0_0_20px_rgba(22,242,179,0.4)]"
                : "bg-gradient-to-r from-[#16f2b3]/15 to-violet-500/20 text-[#16f2b3] border border-[#16f2b3]/40 hover:bg-[#16f2b3] hover:text-[#060916]"
            }`}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <line x1="10" y1="9" x2="8" y2="9" />
            </svg>
            <span>Resume / CV</span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            {mobileOpen ? (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#080c1d]/95 backdrop-blur-xl px-6 py-4">
          <ul className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider text-gray-200 hover:text-[#16f2b3] hover:bg-white/5 no-underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

export default Navbar;
