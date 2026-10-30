// @flow strict

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";

const impactMetrics = [
  {
    value: "0.953",
    label: "Surface Dice",
    detail: "4.71 um RNFL error (+64.6% audit gain)",
  },
  {
    value: "88,800+",
    label: "OCT B-Scans",
    detail: "98% triage F1 across 12 pathologies",
  },
  {
    value: "8x",
    label: "Faster Inference",
    detail: "7.1s vs. 45-60s heuristic baseline",
  },
  {
    value: "98%",
    label: "GPU SM Util",
    detail: "PyTorch DDP on H200 / A100 / 4x V100",
  },
];

function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-between py-8 lg:py-16">
      <Image
        src="/hero.svg"
        alt="Hero ambient background"
        width={1572}
        height={795}
        className="absolute -top-[98px] -z-10 opacity-75 pointer-events-none"
        priority
      />

      <div className="grid grid-cols-1 items-center lg:grid-cols-12 lg:gap-10 gap-y-10 w-full">
        {/* Left Column: Editorial Headline, Bio & Actions */}
        <div className="lg:col-span-7 flex flex-col items-start justify-center">
          {/* Live Research Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#101736]/90 border border-[#16f2b3]/30 mb-6 shadow-[0_0_25px_rgba(22,242,179,0.12)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16f2b3] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16f2b3]"></span>
            </span>
            <span className="text-xs font-mono text-gray-200 tracking-wide">
              NYUAD Center for Brain &amp; Health | Targeting{" "}
              <a
                href="https://ipmi2027.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#16f2b3] underline hover:text-white transition-colors"
              >
                IPMI 2027
              </a>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold leading-[1.18] tracking-tight text-white">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-[#16f2b3] via-cyan-300 to-violet-400 bg-clip-text text-transparent">
              {personalData.name}
            </span>
            <span className="block mt-2 text-2xl sm:text-3xl lg:text-[2.1rem] font-bold text-gray-200">
              {personalData.designation}
            </span>
          </h1>

          <p className="mt-5 text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
            Undergraduate Researcher at{" "}
            <span className="text-white font-medium">
              New York University Abu Dhabi
            </span>{" "}
            (BSc in Computer Science with Economics &amp; Applied Math, GPA 3.5/4.0).
            Building 3D volumetric medical vision models, multi-GPU HPC training
            pipelines, and production agentic AI platforms.
          </p>

          {/* Quantitative Impact Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full my-7">
            {impactMetrics.map((metric) => (
              <div
                key={metric.label}
                className="p-3.5 rounded-xl bg-[#0b1026]/85 border border-white/[0.08] hover:border-[#16f2b3]/40 transition-all backdrop-blur-md"
              >
                <div className="text-xl sm:text-2xl font-extrabold font-mono text-[#16f2b3]">
                  {metric.value}
                </div>
                <div className="text-xs font-semibold text-white uppercase tracking-wider mt-0.5">
                  {metric.label}
                </div>
                <div className="text-[11px] text-gray-400 mt-1 leading-snug">
                  {metric.detail}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons & Social Links */}
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <Link
              href="/cv"
              role="button"
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#16f2b3] to-violet-600 px-6 py-3.5 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-[#060916] shadow-[0_0_25px_rgba(22,242,179,0.3)] hover:shadow-[0_0_35px_rgba(22,242,179,0.55)] transition-all no-underline"
            >
              <span>View Updated CV</span>
              <MdDownload size={18} />
            </Link>

            <Link
              href="#contact"
              className="bg-gradient-to-r to-pink-500 from-violet-600 p-[1px] rounded-full transition-all duration-300 hover:from-pink-500 hover:to-violet-600 no-underline"
            >
              <span className="px-6 py-3.5 bg-[#090d20] rounded-full text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-white flex items-center gap-2 hover:bg-[#111736] transition-all">
                <span>Contact Me</span>
                <RiContactsFill size={16} />
              </span>
            </Link>

            <div className="flex items-center gap-3 ml-1 pl-3 border-l border-white/10">
              {personalData.github && (
                <Link
                  href={personalData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="p-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-gray-300 hover:text-[#16f2b3] hover:border-[#16f2b3]/50 transition-all"
                >
                  <BsGithub size={20} />
                </Link>
              )}
              {personalData.linkedIn && (
                <Link
                  href={personalData.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-gray-300 hover:text-[#16f2b3] hover:border-[#16f2b3]/50 transition-all"
                >
                  <BsLinkedin size={20} />
                </Link>
              )}
              {personalData.instagram && (
                <Link
                  href={personalData.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="p-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-gray-300 hover:text-pink-400 hover:border-pink-400/50 transition-all"
                >
                  <FaInstagram size={20} />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Neural Compute & Architecture Terminal */}
        <div className="lg:col-span-5 w-full">
          <div className="from-[#0a0f25]/95 to-[#080b1c]/95 border-[#253268] relative rounded-2xl border bg-gradient-to-b shadow-[0_20px_60px_rgba(0,0,0,0.65)] backdrop-blur-xl overflow-hidden">
            <div className="flex flex-row">
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#16f2b3] to-violet-600"></div>
              <div className="h-[2px] w-full bg-gradient-to-r from-violet-600 via-pink-500 to-transparent"></div>
            </div>

            {/* Terminal Title Bar */}
            <div className="px-5 py-3.5 flex items-center justify-between bg-[#060918]/80 border-b border-white/[0.07]">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-400/90"></div>
                <div className="h-3 w-3 rounded-full bg-amber-400/90"></div>
                <div className="h-3 w-3 rounded-full bg-emerald-400/90"></div>
              </div>
              <span className="font-mono text-xs text-gray-400">
                nikhil@jubail-hpc: ~/research_profile.ts
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#16f2b3]/15 text-[#16f2b3] border border-[#16f2b3]/30">
                DDP ACTIVE
              </span>
            </div>

            {/* Code Content */}
            <div className="px-5 lg:px-7 py-5 lg:py-6 overflow-x-auto">
              <code className="font-mono text-xs sm:text-sm leading-relaxed block">
                <div>
                  <span className="text-pink-400">const</span>{" "}
                  <span className="text-[#16f2b3] font-semibold">researcher</span>{" "}
                  <span className="text-pink-400">=</span>{" "}
                  <span className="text-gray-400">{"{"}</span>
                </div>

                <div className="ml-4 sm:ml-6 mt-1">
                  <span className="text-gray-300">name:</span>{" "}
                  <span className="text-amber-300">&apos;Nikhil Mundhra&apos;</span>
                  <span className="text-gray-500">,</span>
                </div>

                <div className="ml-4 sm:ml-6">
                  <span className="text-gray-300">institution:</span>{" "}
                  <span className="text-cyan-300">
                    &apos;NYU Abu Dhabi (CS + Econ &amp; Math)&apos;
                  </span>
                  <span className="text-gray-500">,</span>
                </div>

                <div className="ml-4 sm:ml-6">
                  <span className="text-gray-300">lab:</span>{" "}
                  <span className="text-violet-300">
                    &apos;Center for Brain and Health&apos;
                  </span>
                  <span className="text-gray-500">,</span>
                </div>

                <div className="ml-4 sm:ml-6 mt-1">
                  <span className="text-gray-300">architectures:</span>{" "}
                  <span className="text-gray-400">{"["}</span>
                  <div className="ml-4 text-amber-300">
                    &apos;2.5D Bi-Planar ResNet&apos;
                    <span className="text-gray-500">,</span>{" "}
                    &apos;3D U-Net&apos;
                    <span className="text-gray-500">,</span>
                  </div>
                  <div className="ml-4 text-amber-300">
                    &apos;Hybrid TransUNet&apos;
                    <span className="text-gray-500">,</span>{" "}
                    &apos;ConvNeXt V2 + CBAM&apos;
                  </div>
                  <span className="text-gray-400">{"],"}</span>
                </div>

                <div className="ml-4 sm:ml-6 mt-1">
                  <span className="text-gray-300">computeCluster:</span>{" "}
                  <span className="text-gray-400">{"["}</span>
                  <span className="text-[#16f2b3]">&apos;NVIDIA H200&apos;</span>
                  <span className="text-gray-500">, </span>
                  <span className="text-[#16f2b3]">&apos;A100&apos;</span>
                  <span className="text-gray-500">, </span>
                  <span className="text-[#16f2b3]">&apos;4x V100 DDP&apos;</span>
                  <span className="text-gray-400">{"],"}</span>
                </div>

                <div className="ml-4 sm:ml-6 mt-1">
                  <span className="text-gray-300">stack:</span>{" "}
                  <span className="text-gray-400">{"["}</span>
                  <span className="text-amber-300">&apos;PyTorch&apos;</span>
                  <span className="text-gray-500">, </span>
                  <span className="text-amber-300">&apos;MONAI&apos;</span>
                  <span className="text-gray-500">, </span>
                  <span className="text-amber-300">&apos;FastAPI&apos;</span>
                  <span className="text-gray-500">, </span>
                  <span className="text-amber-300">&apos;Next.js&apos;</span>
                  <span className="text-gray-500">, </span>
                  <span className="text-amber-300">&apos;SQL/RAG&apos;</span>
                  <span className="text-gray-400">{"],"}</span>
                </div>

                <div className="ml-4 sm:ml-6 mt-1">
                  <span className="text-gray-300">contact:</span>{" "}
                  <span className="text-cyan-300">
                    &apos;nikhil.mundhra@nyu.edu&apos;
                  </span>
                </div>

                <div>
                  <span className="text-gray-400">{"};"}</span>
                </div>
              </code>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
