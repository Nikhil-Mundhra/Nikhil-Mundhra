"use client";

import { experiences } from "@/utils/data/experience";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsPersonWorkspace } from "react-icons/bs";
import { HiExternalLink } from "react-icons/hi";
import experienceLottie from "../../../assets/lottie/code.json";
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";

const filterTabs = [
  { id: "featured", label: "Featured (6)" },
  { id: "all", label: "Full CV Timeline (11)" },
  { id: "Research & Industry", label: "Research & Industry" },
  { id: "Projects & Ventures", label: "Projects & Ventures" },
  { id: "Leadership", label: "Leadership" },
];

function renderDetailText(text) {
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s)]+)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[1] && match[2]) {
      parts.push(
        <a
          key={match.index}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#16f2b3] underline hover:text-white transition-colors font-medium"
        >
          {match[1]}
        </a>
      );
    } else if (match[3]) {
      parts.push(
        <a
          key={match.index}
          href={match[3]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#16f2b3] underline hover:text-white transition-colors font-medium"
        >
          {match[3]}
        </a>
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

function Experience() {
  const [activeTab, setActiveTab] = useState("featured");

  const filteredExperiences = experiences.filter((exp) => {
    if (activeTab === "featured") return exp.featured;
    if (activeTab === "all") return true;
    return exp.category === activeTab;
  });

  return (
    <section
      id="experience"
      className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]"
    >
      <Image
        src="/section.svg"
        alt="Section background"
        width={1572}
        height={795}
        className="absolute top-0 -z-10 opacity-70 pointer-events-none"
        priority
      />

      {/* Section Header */}
      <div className="flex flex-col items-center my-6 lg:py-8">
        <div className="flex items-center">
          <span className="w-16 sm:w-24 h-[2px] bg-gradient-to-r from-transparent to-[#16f2b3]"></span>
          <span className="bg-[#121738] border border-[#2a3366] w-fit text-white p-2 px-6 text-lg sm:text-xl font-mono font-bold rounded-full uppercase tracking-widest shadow-[0_0_25px_rgba(22,242,179,0.12)]">
            Experience &amp; Research
          </span>
          <span className="w-16 sm:w-24 h-[2px] bg-gradient-to-l from-transparent to-[#16f2b3]"></span>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#16f2b3] text-[#060916] font-bold shadow-[0_0_20px_rgba(22,242,179,0.35)]"
                  : "bg-[#0d1229]/90 text-gray-300 border border-white/10 hover:border-[#16f2b3]/40 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Sticky Column: Visual + Research Dossier */}
          <div className="lg:col-span-4 flex flex-col items-center justify-start lg:sticky lg:top-28 self-start gap-6">
            <div className="w-full max-w-sm rounded-2xl bg-[#0a0f25]/80 border border-white/[0.08] p-5 backdrop-blur-md">
              <div className="w-full max-w-[260px] mx-auto">
                <AnimationLottie animationPath={experienceLottie} />
              </div>
              <div className="border-t border-white/10 pt-4 mt-2">
                <p className="font-mono text-xs uppercase tracking-wider text-[#16f2b3] font-semibold">
                  Current Focus
                </p>
                <p className="text-sm text-white font-semibold mt-1">
                  3D Retinal OCT Biomarker Discovery &amp; Multi-Scale Triage
                </p>
                <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
                  Training 2.5D Bi-Planar ResNet, 3D U-Net, Hybrid TransUNet, and
                  ConvNeXt V2 models on NYUAD Jubail HPC (NVIDIA H200 / A100 / 4x
                  V100 DDP).
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <Link
                    href="/cv"
                    className="w-full text-center py-2.5 px-4 rounded-xl bg-white/[0.06] hover:bg-[#16f2b3] text-gray-200 hover:text-[#060916] border border-white/10 font-mono text-xs font-semibold uppercase tracking-wider transition-all no-underline"
                  >
                    Open Full Interactive CV
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Experience Cards */}
          <div className="lg:col-span-8">
            <div className="flex flex-col gap-6">
              {filteredExperiences.map((exp) => (
                <GlowCard key={exp.id} identifier={`experience-${exp.id}`}>
                  <div className="p-5 sm:p-7 relative text-white">
                    <Image
                      src="/blur-23.svg"
                      alt="Card glow"
                      width={1080}
                      height={200}
                      className="absolute bottom-0 opacity-70 pointer-events-none"
                    />

                    {/* Top Row: Category, Duration & Location */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-[#1a1443] text-[#16f2b3] border border-[#16f2b3]/30">
                          {exp.duration}
                        </span>
                        {exp.category && (
                          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.05] text-violet-300 border border-white/10">
                            {exp.category}
                          </span>
                        )}
                      </div>
                      {exp.location && (
                        <span className="text-xs font-mono text-gray-400">
                          {exp.location}
                        </span>
                      )}
                    </div>

                    {/* Title and Organization */}
                    <div className="flex items-start gap-x-4 mb-3">
                      <div className="text-[#16f2b3] p-2.5 rounded-xl bg-[#16f2b3]/10 border border-[#16f2b3]/25 mt-0.5 transition-all duration-300 shrink-0">
                        <BsPersonWorkspace size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                            {exp.title}
                          </h3>
                          {exp.projectUrl && (
                            <Link
                              href={exp.projectUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-[#16f2b3]/15 text-[#16f2b3] border border-[#16f2b3]/30 hover:bg-[#16f2b3] hover:text-[#060916] transition-all inline-flex items-center gap-1 no-underline"
                            >
                              <span>{exp.projectName || "Repository"}</span>
                              <HiExternalLink size={12} className="shrink-0" />
                            </Link>
                          )}
                        </div>

                        <div className="text-sm sm:text-base text-gray-200 font-medium flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
                          {exp.companyUrl ? (
                            <Link
                              href={exp.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-violet-300 hover:text-[#16f2b3] transition-colors inline-flex items-center gap-1 no-underline"
                            >
                              <span>{exp.company}</span>
                              <HiExternalLink size={14} className="shrink-0" />
                            </Link>
                          ) : (
                            <span className="text-violet-300">{exp.company}</span>
                          )}
                        </div>

                        {exp.subNote && (
                          <p className="text-xs text-gray-400 mt-1 font-mono">
                            {exp.subNote}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Key Metric Highlights */}
                    {exp.metrics && exp.metrics.length > 0 && (
                      <div className="flex flex-wrap gap-2 my-3">
                        {exp.metrics.map((metric, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md bg-gradient-to-r from-[#16f2b3]/15 to-violet-500/15 text-white border border-[#16f2b3]/25"
                          >
                            {metric}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Detail Bullets */}
                    {exp.details && exp.details.length > 0 && (
                      <ul className="mt-3 space-y-2.5 text-xs sm:text-sm text-gray-200 border-t border-white/10 pt-3.5">
                        {exp.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="text-[#16f2b3] mt-1 shrink-0">
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <polyline points="9 18 15 12 9 6" />
                              </svg>
                            </span>
                            <span className="leading-relaxed">
                              {renderDetailText(detail)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Tech Tools Tags */}
                    {exp.tools && exp.tools.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-white/[0.07]">
                        {exp.tools.map((tool, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-[#0c1029] text-gray-300 border border-[#2a2e5a]"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
