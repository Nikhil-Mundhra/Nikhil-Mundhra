// @flow strict
import Image from "next/image";
import GlowCard from "../../helper/glow-card";

function Highlights() {
  const highlights = [
    {
      id: 1,
      title: "NYUAD's First Integration Bee",
      image: "/highlights/integration-bee.png"
    },
    {
      id: 2,
      title: "Recommendation from Alstom",
      image: "/highlights/alstom-recommendation.png"
    },
    {
      id: 3,
      title: "Y Combinator Office Hours",
      image: "/highlights/yc-office-hours.png"
    }
  ];

  return (
    <div id="highlights" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
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
            Highlights
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((highlight) => (
            <GlowCard key={highlight.id} identifier={`highlight-${highlight.id}`}>
              <div className="p-4 relative text-white h-full flex flex-col items-center justify-between text-center group cursor-pointer">
                <div className="relative w-full h-64 md:h-72 lg:h-80 rounded-lg overflow-hidden mb-4 bg-[#0a0f25]/50 flex items-center justify-center p-2">
                  <Image
                    src={highlight.image}
                    alt={highlight.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain transition-transform duration-700 group-hover:scale-105 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
                  />
                </div>
                <div className="px-3 pb-2">
                  <p className="text-base sm:text-lg font-medium text-violet-400 group-hover:text-[#16f2b3] transition-colors duration-300">
                    {highlight.title}
                  </p>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Highlights;
