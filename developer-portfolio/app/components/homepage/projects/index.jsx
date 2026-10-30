"use client";

import { projectsData } from "@/utils/data/projects-data";
import { useState } from "react";
import ProjectCard from "./project-card";

const Projects = () => {
  const [layoutMode, setLayoutMode] = useState("grid");

  return (
    <section id="projects" className="relative z-50 my-12 lg:my-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-4">
          <span className="bg-[#121738] border border-[#2a3366] w-fit text-white px-6 py-2.5 text-lg sm:text-xl font-mono font-bold rounded-full uppercase tracking-widest shadow-[0_0_25px_rgba(22,242,179,0.12)]">
            Featured Projects
          </span>
          <span className="hidden md:block w-32 lg:w-64 h-[2px] bg-gradient-to-r from-[#16f2b3] to-transparent"></span>
        </div>

        {/* Layout Mode Switcher */}
        <div className="inline-flex items-center p-1 rounded-full bg-[#0b1026] border border-white/10 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setLayoutMode("grid")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
              layoutMode === "grid"
                ? "bg-[#16f2b3] text-[#060916] font-bold"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Bento Grid
          </button>
          <button
            type="button"
            onClick={() => setLayoutMode("stack")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
              layoutMode === "stack"
                ? "bg-[#16f2b3] text-[#060916] font-bold"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Sticky Stack
          </button>
        </div>
      </div>

      {layoutMode === "grid" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {projectsData.map((project, index) => (
            <div
              key={project.id || index}
              className="flex rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      ) : (
        <div className="pt-8">
          <div className="flex flex-col gap-6">
            {projectsData.map((project, index) => (
              <div
                id={`sticky-card-${index + 1}`}
                key={project.id || index}
                className="sticky-card w-full mx-auto max-w-3xl sticky"
              >
                <div className="box-border flex items-center justify-center rounded shadow-[0_0_30px_0_rgba(0,0,0,0.3)] transition-all duration-500">
                  <ProjectCard project={project} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
