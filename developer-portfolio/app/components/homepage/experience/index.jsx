// @flow strict

import { experiences } from "@/utils/data/experience";
import Image from "next/image";
import Link from "next/link";
import { BsPersonWorkspace } from "react-icons/bs";
import { HiExternalLink } from "react-icons/hi";
import experienceLottie from '../../../assets/lottie/code.json';
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";

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
          className="text-[#16f2b3] underline hover:text-white transition-colors"
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
          className="text-[#16f2b3] underline hover:text-white transition-colors"
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
  return (
    <div id="experience" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
        priority
      />

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md uppercase tracking-wide">
            Experiences
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-5 flex justify-center items-start lg:sticky lg:top-28 self-start">
            <div className="w-full max-w-md">
              <AnimationLottie animationPath={experienceLottie} />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="flex flex-col gap-6">
              {experiences.map((exp) => (
                <GlowCard key={exp.id} identifier={`experience-${exp.id}`}>
                  <div className="p-5 sm:p-7 relative text-white">
                    <Image
                      src="/blur-23.svg"
                      alt="Hero"
                      width={1080}
                      height={200}
                      className="absolute bottom-0 opacity-80 pointer-events-none"
                    />

                    {/* Top Row: Duration & Location */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="text-xs sm:text-sm font-mono font-medium px-3 py-1 rounded-full bg-[#1a1443] text-[#16f2b3] border border-[#2a2e5a]">
                        {exp.duration}
                      </span>
                      {exp.location && (
                        <span className="text-xs sm:text-sm text-gray-400 font-mono">
                          {exp.location}
                        </span>
                      )}
                    </div>

                    {/* Title and Organization */}
                    <div className="flex items-start gap-x-4 mb-3">
                      <div className="text-violet-500 mt-1 transition-all duration-300 hover:scale-110 shrink-0">
                        <BsPersonWorkspace size={28} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-semibold text-white tracking-wide">
                          {exp.title}
                        </h3>

                        <div className="text-sm sm:text-base text-gray-300 font-medium flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
                          {exp.companyUrl ? (
                            <Link
                              href={exp.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-violet-400 hover:text-[#16f2b3] transition-colors inline-flex items-center gap-1"
                            >
                              <span>{exp.company}</span>
                              <HiExternalLink size={14} className="shrink-0" />
                            </Link>
                          ) : (
                            <span>{exp.company}</span>
                          )}

                          {exp.projectUrl && (
                            <>
                              <span className="text-gray-500">|</span>
                              <Link
                                href={exp.projectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#16f2b3] hover:underline transition-colors text-xs sm:text-sm inline-flex items-center gap-1"
                              >
                                <span>{exp.projectName || "Project"}</span>
                                <HiExternalLink size={12} className="shrink-0" />
                              </Link>
                            </>
                          )}
                        </div>

                        {exp.subNote && (
                          <p className="text-xs text-gray-400 mt-1 italic">
                            {exp.subNote}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Detail Bullets */}
                    {exp.details && exp.details.length > 0 && (
                      <ul className="mt-4 space-y-2 text-xs sm:text-sm text-gray-300 border-t border-[#1b2c6860] pt-3">
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
                      <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-[#1b2c6860]">
                        {exp.tools.map((tool, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#10132e] text-[#16f2b3] border border-[#2a2e5a]"
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
    </div>
  );
}

export default Experience;
