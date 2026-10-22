import { useContent } from "../../context/ContentContext";
import promo from "../../../public/promo.mp4";

export default function WhyChooseUs() {
  const { content } = useContent();
  const data = content?.whyChooseUs || {};

  const avatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80",
  ];

  const card1 = data.card1 || {
    statValue: "600+",
    title: "Successful projects completed",
    description:
      "We've helped launch over 600 digital products and experiences that make brands stand out and feel human.",
  };

  const card2 = data.card2 || {
    statValue: "100%",
    title: "UpWork rating",
    badgeText: "17+",
  };

  return (
    <section
      data-theme="light"
      data-aos="fade-up"
      className="w-full bg-[#f8f8f8] py-20 md:py-28 selection:bg-neutral-900 selection:text-white"
    >
      {/* Container: 1300px max-width, w-11/12 on mobile, no horizontal padding */}
      <div className="w-11/12 max-w-[1300px] mx-auto px-0">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] items-start gap-4 lg:gap-12 mb-16 md:mb-24">
          <p className="text-sm md:text-base text-neutral-500 font-normal leading-snug">
            {data.sectionLabel || "Why choose us"}
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-[3.75rem] font-semibold text-neutral-950 tracking-tight leading-[1.08]">
            {data.headingPrefix || "We design for results - "}{" "}
            <span className="text-neutral-400 font-normal">
              {data.headingHighlight || "helping your business meet its goals."}
            </span>
          </h2>
        </div>

        {/* Main 3-Column Layout (Video / Filler Gap / Stats Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-start">
          {/* 1. Left: Phone Mockup Video (Width ~28% / 3.5 cols) */}
          <div className="lg:col-span-4  object-cover  xl:col-span-3 w-full aspect-[9/16] max-h-[560px] rounded-[2rem] overflow-hidden  shadow-sm flex items-center justify-center">
            <video
              src={data.videoUrl || promo}
              autoPlay
              loop
              muted
              playsInline
              key={data.videoUrl || promo}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 2. Middle: Empty Filler Gap (Exact space from reference image) */}
          <div className="hidden lg:block lg:col-span-1 xl:col-span-2" />

          {/* 3. Right: Subtitle & Two White Stat Cards (Width ~60% / 7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between self-stretch">
            {/* Subtitle Pitch Text */}
            <p className="text-lg sm:text-xl md:text-[1.3rem] text-neutral-900 font-normal leading-snug max-w-[480px] mb-14 lg:mb-24">
              {data.pitchText || "Easy-to-use interfaces, seamless development, and lasting impressions keep your users coming back."}
            </p>

            {/* Stat Cards Row */}
            <div className="flex justify-end">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 max-w-[600px]">
                {/* Card 1: 600+ Projects */}
                <div className="bg-white rounded-[24px] p-8 flex flex-col justify-between h-[400px] shadow-sm">
                  <div>
                    <div className="text-4xl md:text-5xl font-semibold text-neutral-950 tracking-tight mb-2">
                      {card1.statValue}
                    </div>
                    <h3 className="text-base font-medium text-neutral-900">
                      {card1.title}
                    </h3>
                  </div>

                  <div>
                    <p className="text-sm text-neutral-500 font-normal leading-relaxed">
                      {card1.description}
                    </p>
                  </div>
                </div>

                {/* Card 2: 100% UpWork Rating */}
                <div className="bg-white rounded-[24px] p-8 flex flex-col justify-between h-[400px] shadow-sm">
                  <div>
                    <div className="text-4xl md:text-5xl font-semibold text-neutral-950 tracking-tight mb-2">
                      {card2.statValue}
                    </div>
                    <h3 className="text-base font-medium text-neutral-900">
                      {card2.title}
                    </h3>
                  </div>

                  {/* Bottom Row: Upwork Icon & Avatars */}
                  <div className="flex items-center justify-between pt-4">
                    {/* Upwork Hex Badge */}
                    <div className="w-10 h-10 rounded-xl bg-[#4EA52F] flex items-center justify-center shadow-sm">
                      <svg
                        className="w-5 h-5 text-white fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.229l.228-1.076.008-.039c.205-1.143.85-3.064 2.838-3.064 1.488 0 2.7 1.213 2.7 2.705 0 1.489-1.212 2.703-2.7 2.703zm0-7.854c-2.535 0-4.502 1.652-5.303 4.366-1.222-1.835-2.146-4.037-2.686-5.892h-2.73v7.114a2.547 2.547 0 0 1-2.543 2.543 2.547 2.547 0 0 1-2.542-2.543V3.778H0v7.114c-.01 2.912 2.358 5.303 5.27 5.303 2.908 0 5.277-2.391 5.277-5.303v-1.195c.53 1.108 1.181 2.227 1.971 3.221l-1.674 7.874h2.797l1.212-5.711c1.061.68 2.282 1.107 3.68 1.107 2.996 0 5.434-2.455 5.434-5.453 0-2.997-2.438-5.432-5.436-5.432z" />
                      </svg>
                    </div>

                    {/* Overlapping Avatars + Badge */}
                    <div className="flex items-center -space-x-2">
                      {avatars.map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt="Team member"
                          className="w-7 h-7 rounded-full object-cover border-2 border-white"
                          loading="lazy"
                        />
                      ))}
                      <div className="w-7 h-7 rounded-full bg-neutral-950 text-white text-[10px] font-semibold flex items-center justify-center border-2 border-white">
                        {card2.badgeText || "17+"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
