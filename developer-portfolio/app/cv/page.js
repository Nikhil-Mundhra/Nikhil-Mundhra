"use client";

import Link from "next/link";
import { useState } from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { HiExternalLink } from "react-icons/hi";
import { MdDownload } from "react-icons/md";

export default function CVPage() {
  const [viewMode, setViewMode] = useState("split");

  return (
    <div className="min-h-screen py-8 sm:py-12">
      {/* Top Action Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
        <div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-mono text-gray-400 hover:text-[#16f2b3] transition-colors inline-flex items-center gap-1.5 no-underline"
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
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>Back to Portfolio</span>
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-xs font-mono text-[#16f2b3] uppercase tracking-wider">
              Curriculum Vitae
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            Nikhil Mundhra - Resume &amp; CV
          </h1>
        </div>

        {/* View Switcher & Download Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center p-1 rounded-full bg-[#0b1026] border border-white/10">
            <button
              type="button"
              onClick={() => setViewMode("split")}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                viewMode === "split"
                  ? "bg-[#16f2b3] text-[#060916] font-bold"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Split View
            </button>
            <button
              type="button"
              onClick={() => setViewMode("interactive")}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                viewMode === "interactive"
                  ? "bg-[#16f2b3] text-[#060916] font-bold"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Interactive CV
            </button>
            <button
              type="button"
              onClick={() => setViewMode("pdf")}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                viewMode === "pdf"
                  ? "bg-[#16f2b3] text-[#060916] font-bold"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              PDF Viewer
            </button>
          </div>

          <a
            href="/cv.pdf?v=20261030"
            download="Nikhil_Mundhra_CV.pdf"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#16f2b3] to-violet-600 text-[#060916] font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(22,242,179,0.3)] hover:shadow-[0_0_30px_rgba(22,242,179,0.5)] transition-all no-underline"
          >
            <MdDownload size={16} />
            <span>Download PDF</span>
          </a>

          <a
            href="/cv.pdf?v=20261030"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/10 text-gray-200 border border-white/10 font-mono text-xs uppercase tracking-wider transition-all no-underline"
          >
            <span>Open Raw PDF</span>
            <HiExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className={`grid grid-cols-1 gap-8 items-start ${
          viewMode === "split" ? "xl:grid-cols-12" : ""
        }`}
      >
        {/* Interactive Web CV Sheet */}
        {(viewMode === "split" || viewMode === "interactive") && (
          <div
            className={`${
              viewMode === "split" ? "xl:col-span-7" : "max-w-4xl mx-auto w-full"
            } rounded-2xl bg-[#0a0f24]/90 border border-white/10 p-6 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.6)] backdrop-blur-xl`}
          >
            {/* CV Document Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/15">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Nikhil Mundhra
                </h2>
                <p className="text-xs sm:text-sm font-mono text-[#16f2b3] mt-1">
                  Abu Dhabi, UAE | +971 503526342 |{" "}
                  <a
                    href="mailto:nikhil.mundhra@nyu.edu"
                    className="underline hover:text-white"
                  >
                    nikhil.mundhra@nyu.edu
                  </a>
                </p>
              </div>
              <div className="flex items-center gap-3 font-mono text-xs">
                <a
                  href="https://www.linkedin.com/in/mundhra-nikhil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-gray-200 hover:text-[#16f2b3] hover:border-[#16f2b3]/40 transition-all no-underline"
                >
                  <BsLinkedin size={13} />
                  <span>mundhra-nikhil</span>
                </a>
                <a
                  href="https://github.com/Nikhil-Mundhra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-gray-200 hover:text-[#16f2b3] hover:border-[#16f2b3]/40 transition-all no-underline"
                >
                  <BsGithub size={13} />
                  <span>Nikhil-Mundhra</span>
                </a>
              </div>
            </div>

            {/* 1. EDUCATION & SKILLS */}
            <div className="mt-6">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#16f2b3] pb-1.5 border-b border-white/10">
                Education &amp; Skills
              </h3>
              <div className="mt-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm sm:text-base font-bold text-white">
                    BSc. in Computer Science with Economics &amp; Applied Math{" "}
                    <span className="font-normal text-violet-300">
                      | New York University Abu Dhabi
                    </span>
                  </p>
                  <span className="text-xs font-mono text-[#16f2b3]">
                    Aug 2023 - May 2027
                  </span>
                </div>
                <ul className="mt-1.5 space-y-1 text-xs sm:text-sm text-gray-300 list-disc list-inside">
                  <li>
                    <strong className="text-white">
                      Cumulative GPA: 3.5 / 4.0
                    </strong>{" "}
                    | Focus Areas: Machine Learning and AI Engineering
                  </li>
                  <li>
                    Selected for and completed Study Away terms at{" "}
                    <strong className="text-white">
                      NYU CAS, NYU Tandon, and NYU Paris
                    </strong>{" "}
                    (Jan 2025 - Dec 2025)
                  </li>
                </ul>

                <div className="mt-3 space-y-1 text-xs sm:text-sm text-gray-300">
                  <p>
                    <strong className="text-white">
                      UAE Top 3 Adaptive City Hackathon Award Winner
                    </strong>{" "}
                    | Organized by the Transpose Platform
                  </p>
                  <p>
                    <strong className="text-white">
                      Distinction Certificate
                    </strong>{" "}
                    | CEMC Waterloo CCC (Canadian Computing Competition)
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-white/[0.07] space-y-1.5 text-xs sm:text-sm text-gray-300">
                  <p>
                    <strong className="text-white">Languages:</strong> Python |
                    SQL | C++ | Bash | JavaScript | TypeScript | C | Java | R
                  </p>
                  <p>
                    <strong className="text-white">
                      AI &amp; Machine Learning:
                    </strong>{" "}
                    PyTorch | TensorFlow | NumPy | Scikit-Learn | Pandas | LLMs
                    | RAG | LangGraph | Time-Series
                  </p>
                  <p>
                    <strong className="text-white">
                      MLOps, Cloud &amp; Systems:
                    </strong>{" "}
                    Linux | Docker &amp; Kubernetes | CI/CD (Github &amp; Azure
                    DevOps) | Git | GCP | AWS | NYUAD HPC
                  </p>
                  <p>
                    <strong className="text-white">
                      Software &amp; Backend Systems:
                    </strong>{" "}
                    PostgreSQL | Redis | Flask | REST APIs | Pytest
                  </p>
                </div>
              </div>
            </div>

            {/* 2. PROFESSIONAL EXPERIENCE */}
            <div className="mt-7">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#16f2b3] pb-1.5 border-b border-white/10">
                Professional Experience
              </h3>

              {/* NYUAD ML Researcher */}
              <div className="mt-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm sm:text-base font-bold text-white">
                    Machine Learning Researcher (
                    <a
                      href="https://github.com/nikhil-Mundhra/OCT-Analyser-Capstone/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#16f2b3] underline hover:text-white"
                    >
                      Capstone Project
                    </a>
                    ) |{" "}
                    <a
                      href="https://nyuad.nyu.edu/en/research/faculty-labs-and-projects/center-for-brain-and-health.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-300 hover:underline"
                    >
                      NYU Abu Dhabi, Center for Brain and Health
                    </a>
                  </p>
                  <span className="text-xs font-mono text-[#16f2b3]">
                    May 2026 - Present
                  </span>
                </div>
                <ul className="mt-1.5 space-y-1.5 text-xs sm:text-sm text-gray-300 list-disc list-inside leading-relaxed">
                  <li>
                    Engineered 2.5D Bi-Planar ResNet, 3D U-Net, and Hybrid
                    TransUNet models for RNFL segmentation (320x768x320) under{" "}
                    <em>Dr. Bas Rokers</em>, achieving{" "}
                    <strong className="text-white">0.953 Surface Dice</strong>{" "}
                    and <strong className="text-white">4.71 um</strong>{" "}
                    (~1.5-px) boundary error (beating commercial
                    Solix/Heidelberg baselines with{" "}
                    <strong className="text-white">+64.6%</strong> audit gain
                    and <strong className="text-white">47%</strong> lower P95
                    tail error).
                  </li>
                  <li>
                    Developed a hierarchical ConvNeXt V2 classifier with
                    multi-scale CBAM attention and Grad-CAM across{" "}
                    <strong className="text-white">
                      88,800+ OCT B-scans (7,536 patients)
                    </strong>
                    , achieving{" "}
                    <strong className="text-white">98% triage F1</strong> across
                    12 retinal pathologies under zero-leakage strict
                    cross-validation.
                  </li>
                  <li>
                    Architected end-to-end PyTorch, MONAI, and scikit-learn
                    pipelines for automated multi-task training (Tversky,
                    continuous boundary regression, and BMO cup losses),
                    validation, and clinical reporting across 237 volumetric 3D
                    scans (~75,800 slices), reducing per-volume inference
                    latency by up to <strong className="text-white">8x</strong>{" "}
                    (7.1s vs. 45-60s heuristic baseline).
                  </li>
                  <li>
                    Scaled distributed multi-GPU training on NYUAD&apos;s Jubail
                    HPC cluster across NVIDIA H200, A100, and 4x V100 GPUs (128
                    GB VRAM) via PyTorch DDP under <em>Prof. Gabriel Falcao</em>
                    , optimizing mixed-precision (BF16/FP16 with FP32 loss
                    upcasting) at effective batch size 64 to reach{" "}
                    <strong className="text-white">95%-98%</strong> GPU SM
                    utilization.
                  </li>
                  <li>
                    Targeting publication at{" "}
                    <a
                      href="https://ipmi2027.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#16f2b3] underline"
                    >
                      IPMI
                    </a>{" "}
                    for a comparative study of ML architectures and their
                    biomarker detection accuracy.
                  </li>
                </ul>
              </div>

              {/* Kanerika */}
              <div className="mt-4 pt-3 border-t border-white/[0.07]">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm sm:text-base font-bold text-white">
                    AI Intern |{" "}
                    <a
                      href="https://kanerika.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-300 hover:underline"
                    >
                      Kanerika Software Pvt. Ltd.
                    </a>{" "}
                    - Hyderabad, India
                  </p>
                  <span className="text-xs font-mono text-[#16f2b3]">
                    Jun 2026 - Aug 2026
                  </span>
                </div>
                <ul className="mt-1.5 space-y-1 text-xs sm:text-sm text-gray-300 list-disc list-inside leading-relaxed">
                  <li>
                    Engineered an agentic fraud engine that synthesizes
                    financial typologies (rent skimming, subsidy theft) into
                    persistent SQL rules across a data lake, pairing
                    deterministic flagging with LLM audit explainability.
                  </li>
                  <li>
                    Developed a legal document compliance AI engine with a
                    multi-tenant distributed Microsoft WOPI architecture and
                    native Word add-in end-to-end, enabling seamless integration
                    into client ecosystems.
                  </li>
                  <li>
                    Conducting functional and technical REST API testing and
                    debugging of Kanerika AI Labs&apos; products (including
                    Karl).
                  </li>
                </ul>
              </div>

              {/* Alstom */}
              <div className="mt-4 pt-3 border-t border-white/[0.07]">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm sm:text-base font-bold text-white">
                    Cyber Security &amp; Project Management Intern | Alstom -
                    India
                  </p>
                  <span className="text-xs font-mono text-[#16f2b3]">
                    Jun 2025 - Aug 2025
                  </span>
                </div>
                <ul className="mt-1.5 space-y-1 text-xs sm:text-sm text-gray-300 list-disc list-inside leading-relaxed">
                  <li>
                    Conducted multi-site research of RS17 Trains, analyzing the
                    DfQ V-cycle, gate reviews, and system V&amp;V checkpoints.
                  </li>
                  <li>
                    Shadowed development of OT cybersecurity models, including
                    network segmentation and IEC 62443 compliance.
                  </li>
                </ul>
              </div>

              {/* Phool.Co */}
              <div className="mt-4 pt-3 border-t border-white/[0.07]">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm sm:text-base font-bold text-white">
                    Marketing Analyst Intern | Phool.Co - New Delhi, India
                  </p>
                  <span className="text-xs font-mono text-[#16f2b3]">
                    Jun 2024 - Aug 2024
                  </span>
                </div>
                <ul className="mt-1.5 space-y-1 text-xs sm:text-sm text-gray-300 list-disc list-inside leading-relaxed">
                  <li>
                    Reported geographical, financial, and seasonal buying
                    behaviors using multi-variable data models in STATA &amp; R.
                  </li>
                </ul>
              </div>
            </div>

            {/* 3. PROJECTS */}
            <div className="mt-7">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#16f2b3] pb-1.5 border-b border-white/10">
                Projects
              </h3>
              <div className="mt-3 space-y-3 text-xs sm:text-sm text-gray-300">
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-bold text-white">
                      Developer (Team Lead) |{" "}
                      <a
                        href="https://challengeon-dct-nyuad.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#16f2b3] underline"
                      >
                        AeroLodge Metrics
                      </a>{" "}
                      - Department of Culture &amp; Tourism, UAE funded project
                    </p>
                    <span className="text-xs font-mono text-[#16f2b3]">
                      Aug 2026 - Oct 2026
                    </span>
                  </div>
                  <p className="mt-1">
                    Facilitated flight routes &amp; hotel capacity decisions for
                    the DCT using proprietary data by curating a lake
                    architecture, and modeling noisy multi-horizon time-series
                    via Constrained Convolution Filters, outperforming deep
                    neural baselines.
                  </p>
                </div>

                <div className="pt-2 border-t border-white/[0.06]">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-bold text-white">
                      Developer (Team Lead) |{" "}
                      <a
                        href="https://github.com/Nikhil-Mundhra/Wealth-Advisor"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#16f2b3] underline"
                      >
                        Wealth Advisor
                      </a>{" "}
                      - A Shenzhen FinTechathon project
                    </p>
                    <span className="text-xs font-mono text-[#16f2b3]">
                      Sep 2026 - Oct 2026
                    </span>
                  </div>
                  <p className="mt-1">
                    Built a B2B2C Dynamic Expat Wealth Agent (DEWA) for
                    autonomous AI wealth advisory for advisors and end-clients.
                  </p>
                </div>

                <div className="pt-2 border-t border-white/[0.06]">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-bold text-white">
                      Founder |{" "}
                      <a
                        href="http://vivahgo.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#16f2b3] underline"
                      >
                        VivahGo Planners
                      </a>{" "}
                      - An AI-driven SaaS platform for wedding workspaces
                    </p>
                    <span className="text-xs font-mono text-[#16f2b3]">
                      Mar 2026 - Present
                    </span>
                  </div>
                  <p className="mt-1">
                    Handled Marketing, Operations, Software Development,
                    Finances, and Legal compliances of founding a startup.
                  </p>
                </div>

                <div className="pt-2 border-t border-white/[0.06]">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-bold text-white">
                      Developer (Solo) |{" "}
                      <a
                        href="https://github.com/Nikhil-Mundhra/whatsapp-ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#16f2b3] underline"
                      >
                        TakeOver
                      </a>{" "}
                      - Vercel &amp; GCP Deployed Full Stack AI Harness for
                      WhatsApp
                    </p>
                    <span className="text-xs font-mono text-[#16f2b3]">
                      Jul 2026 - Sep 2026
                    </span>
                  </div>
                  <p className="mt-1">
                    Engineered TakeOver agent pipeline to use semantic chat
                    context, user guidelines, and smart permission polling.
                  </p>
                </div>
              </div>
            </div>

            {/* 4. LEADERSHIP */}
            <div className="mt-7">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#16f2b3] pb-1.5 border-b border-white/10">
                Leadership
              </h3>
              <div className="mt-3 space-y-2.5 text-xs sm:text-sm text-gray-300">
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-bold text-white">
                      Founder and President | Hindu Student Association
                      (Peacock), NYU Abu Dhabi
                    </p>
                    <span className="text-xs font-mono text-[#16f2b3]">
                      Mar 2024 - Present
                    </span>
                  </div>
                  <p className="mt-0.5">
                    Kickstarted a thriving community of 300+ members, averaging
                    50-200 attendees per event, with under AED 20,000 p.a.
                  </p>
                </div>

                <div className="pt-2 border-t border-white/[0.06]">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-bold text-white">
                      Treasurer (Founding Team) | Code Paris - NYU Paris, France
                    </p>
                    <span className="text-xs font-mono text-[#16f2b3]">
                      Jan 2025 - May 2025
                    </span>
                  </div>
                  <p className="mt-0.5">
                    Designed educational frameworks and held workshops on NumPy,
                    AI models, and advanced programming concepts.
                  </p>
                </div>

                <div className="pt-2 border-t border-white/[0.06]">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-bold text-white">
                      Team Leader of 5 NYUAD undergraduates | Bloomberg Trading
                      Challenge
                    </p>
                    <span className="text-xs font-mono text-[#16f2b3]">
                      Sep 2023 - Nov 2023
                    </span>
                  </div>
                  <p className="mt-0.5">
                    Globally ranked 243, with net profit of 5% in 30 days over a
                    diverse 1 million virtual USD portfolio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Embedded PDF Viewer */}
        {(viewMode === "split" || viewMode === "pdf") && (
          <div
            className={`${
              viewMode === "split" ? "xl:col-span-5 xl:sticky xl:top-24" : "w-full"
            } h-[85vh] rounded-2xl border border-white/15 overflow-hidden bg-[#0a0f24] shadow-[0_25px_70px_rgba(0,0,0,0.6)]`}
          >
            <iframe
              src="/cv.pdf?v=20261030"
              className="w-full h-full"
              title="Nikhil Mundhra Resume / CV PDF"
            />
          </div>
        )}
      </div>
    </div>
  );
}
