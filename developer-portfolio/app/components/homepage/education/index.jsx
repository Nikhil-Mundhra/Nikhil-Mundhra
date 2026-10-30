// @flow strict
import { educations } from "@/utils/data/educations";
import Image from "next/image";
import { BsPersonWorkspace } from "react-icons/bs";
import lottieFile from "../../../assets/lottie/study.json";
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";

function Education() {
  return (
    <section
      id="education"
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
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-16 sm:w-24 h-[2px] bg-gradient-to-r from-transparent to-[#16f2b3]"></span>
          <span className="bg-[#121738] border border-[#2a3366] w-fit text-white p-2 px-6 text-lg sm:text-xl font-mono font-bold rounded-full uppercase tracking-widest">
            Education
          </span>
          <span className="w-16 sm:w-24 h-[2px] bg-gradient-to-l from-transparent to-[#16f2b3]"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-5 flex justify-center items-start">
            <div className="w-3/4 h-3/4">
              <AnimationLottie animationPath={lottieFile} />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="flex flex-col gap-6">
              {educations.map((education) => (
                <GlowCard
                  key={education.id}
                  identifier={`education-${education.id}`}
                >
                  <div className="p-5 sm:p-6 relative text-white">
                    <Image
                      src="/blur-23.svg"
                      alt="Card glow"
                      width={1080}
                      height={200}
                      className="absolute bottom-0 opacity-75 pointer-events-none"
                    />
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-[#1a1443] text-[#16f2b3] border border-[#16f2b3]/30">
                        {education.duration}
                      </span>
                      {education.gpa && (
                        <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/30">
                          GPA: {education.gpa}
                        </span>
                      )}
                    </div>
                    <div className="flex items-start gap-x-4">
                      <div className="text-[#16f2b3] p-2.5 rounded-xl bg-[#16f2b3]/10 border border-[#16f2b3]/25 mt-0.5 shrink-0">
                        <BsPersonWorkspace size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base sm:text-xl font-bold text-white">
                          {education.title}
                        </h3>
                        <p className="text-sm sm:text-base text-violet-300 font-medium mt-1">
                          {education.institution}
                        </p>
                        {education.highlights &&
                          education.highlights.length > 0 && (
                            <ul className="mt-3 space-y-1.5 text-xs sm:text-sm text-gray-300 border-t border-white/10 pt-3">
                              {education.highlights.map((item, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2"
                                >
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
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                      </div>
                    </div>
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

export default Education;
