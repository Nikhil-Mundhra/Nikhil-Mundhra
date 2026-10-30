// @flow strict
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";

function Footer() {
  return (
    <footer className="relative z-10 border-t bg-[#060916]/90 backdrop-blur-md border-white/10 text-white">
      <div className="mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-6 lg:py-8">
        <div className="flex justify-center -z-40">
          <div className="absolute top-0 h-[1px] w-1/2 bg-gradient-to-r from-transparent via-[#16f2b3]/50 to-transparent"></div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-gray-400 font-mono">
            Nikhil Mundhra | Machine Learning Researcher &amp; AI Systems Engineer
          </p>
          <div className="flex items-center gap-5 text-xs font-mono">
            <Link
              href="/cv"
              className="text-gray-300 hover:text-[#16f2b3] uppercase tracking-wider transition-colors no-underline"
            >
              Resume / CV
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/mundhra-nikhil"
              className="flex items-center gap-1.5 text-gray-300 hover:text-[#16f2b3] uppercase tracking-wider transition-colors no-underline"
            >
              <BsLinkedin size={14} />
              <span>LinkedIn</span>
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/Nikhil-Mundhra"
              className="flex items-center gap-1.5 text-gray-300 hover:text-[#16f2b3] uppercase tracking-wider transition-colors no-underline"
            >
              <BsGithub size={14} />
              <span>GitHub</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
