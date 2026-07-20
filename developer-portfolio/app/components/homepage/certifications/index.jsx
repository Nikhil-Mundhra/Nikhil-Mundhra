// @flow strict
import { certifications } from "@/utils/data/certifications";
import Image from "next/image";
import { FaCertificate } from "react-icons/fa";
import GlowCard from "../../helper/glow-card";

function Certifications() {
  return (
    <div id="certifications" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
        priority
      />
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent  w-full" />
        </div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md uppercase">
            Certifications
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {
            certifications.map(cert => (
              <GlowCard key={cert.id} identifier={`certification-${cert.id}`}>
                <div className="p-3 relative text-white h-full flex flex-col items-center text-center">
                  <Image
                    src="/blur-23.svg"
                    alt="Hero"
                    width={1080}
                    height={200}
                    className="absolute bottom-0 opacity-80"
                  />
                  <div className="flex items-center justify-center p-4">
                    <div className="text-violet-500 transition-all duration-300 hover:scale-125">
                      <FaCertificate size={48} />
                    </div>
                  </div>
                  <div className="px-3 pb-5">
                    <p className="text-base sm:text-xl font-medium">
                      {cert.title}
                    </p>
                  </div>
                </div>
              </GlowCard>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Certifications;
