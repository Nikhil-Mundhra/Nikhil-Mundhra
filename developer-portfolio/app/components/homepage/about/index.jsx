// @flow strict

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";


function AboutSection() {
  return (
    <div id="about" className="my-12 lg:my-16 relative">
      <div className="hidden lg:flex flex-col items-center absolute top-16 -right-8">
        <span className="bg-[#1a1443] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md">
          ABOUT ME
        </span>
        <span className="h-36 w-[2px] bg-[#1a1443]"></span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="order-2 lg:order-1">
          <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">
            Who I am?
          </p>
          <p className="text-gray-200 text-sm lg:text-lg">
            {personalData.description}
          </p>
        </div>
        <div className="flex justify-center order-1 lg:order-2 items-center">
          <div className="relative rounded-[2rem] p-[2px] bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 shadow-[0_0_40px_rgba(139,92,246,0.3)] transition-all duration-500 hover:shadow-[0_0_60px_rgba(139,92,246,0.5)] hover:-translate-y-2 cursor-pointer group">
            <div className="bg-[#0a0f25] rounded-[2rem] p-4 h-full w-full relative overflow-hidden flex items-end justify-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gradient-to-tr from-[#16f2b3] to-fuchsia-500 rounded-full blur-[3rem] opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <Image
                src={personalData.profile}
                width={280}
                height={280}
                alt="Nikhil Mundhra"
                className="relative z-10 transition-all duration-500 group-hover:scale-105 drop-shadow-[0_15px_15px_rgba(0,0,0,0.8)]"
                style={{ width: 'auto', height: 'auto', maxHeight: '350px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;