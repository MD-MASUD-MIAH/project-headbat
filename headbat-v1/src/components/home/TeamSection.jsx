import { useContent } from "../../context/ContentContext";

export default function TeamSection() {
  const { content } = useContent();
  const data = content?.team || {};

  const teamMembers = data.members || [
    {
      name: "Bogdan",
      role: "CEO & Founder",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
    },
    {
      name: "Alina",
      role: "Designer",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80",
    },
    {
      name: "Arsen",
      role: "CCO",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
    },
    {
      name: "Anna",
      role: "Project Manager",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section data-theme="light" data-aos="fade-up" className="w-full bg-[#f8f8f8] py-16 md:py-18 selection:bg-neutral-900 selection:text-white">
      {/* Container: 1300px max-width, w-11/12 on mobile, no horizontal padding */}
      <div className="w-11/12 max-w-[1300px] mx-auto px-0">
        {/* Main Big White Wrapper Card: padding 0.625rem (p-2.5) & rounded-[1.5625rem] */}
        <div className="bg-white rounded-[1.5625rem] p-2.5 md:p-3 shadow-sm flex flex-col lg:flex-row items-stretch justify-between gap-8 lg:gap-0 overflow-hidden">
          {/* Left Content Area: Exact SCSS padding 3.75rem (p-8 md:p-14) */}
          <div className="flex-1 flex flex-col justify-between items-start gap-8 md:gap-12 p-6 sm:p-10 md:p-14">
            {/* Top Heading */}
            <h2 className="text-4xl sm:text-5xl md:text-[3.75rem] font-semibold text-neutral-950 tracking-tight leading-[1.08]">
              {data.headingPrefix || "Our team, "}<br />
              <span className="text-neutral-400 font-normal">{data.headingHighlight || "your vision"}</span>
            </h2>

            {/* Bottom 2 Columns Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 w-full items-end">
              {/* Column 1: Join Mission + Apply Button */}
              <div className="flex flex-col items-start gap-3 max-w-[17rem]">
                <h3 className="text-base md:text-lg font-semibold text-neutral-900 leading-snug">
                  {data.joinMissionTitle || "Join our mission"}
                </h3>
                <p className="text-xs md:text-sm text-neutral-500 font-normal leading-relaxed">
                  {data.joinMissionDescription || "If you're ready to create and collaborate, we'd love to hear from you."}
                </p>

                {/* Apply Now Rolling Text Button */}
                <a
                  href={data.applyButtonHref || "#contact"}
                  className="group/btn relative inline-flex items-center gap-3 bg-neutral-950 hover:bg-neutral-900 text-white text-xs md:text-sm font-medium px-5 py-2.5 rounded-full overflow-hidden transition-colors duration-300 mt-2 shadow-sm"
                >
                  <span className="relative block overflow-hidden h-[1.2rem]">
                    <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/btn:-translate-y-1/2">
                      <span className="block leading-[1.2rem] whitespace-nowrap">
                        {data.applyButtonText || "Apply now"}
                      </span>
                      <span className="block leading-[1.2rem] whitespace-nowrap">
                        {data.applyButtonText || "Apply now"}
                      </span>
                    </span>
                  </span>
                  <span className="w-1.5 h-1.5 bg-white rounded-full transition-transform duration-300 group-hover/btn:scale-125"></span>
                </a>
              </div>

              {/* Column 2: Teamwork Pitch */}
              <div className="flex flex-col items-start">
                <p className="text-sm md:text-[0.95rem] text-neutral-500 font-normal leading-relaxed">
                  <span className="text-neutral-950 font-medium">
                    {data.teamworkPitchHighlight || "We thrive on teamwork, turning individual strengths into shared success."}
                  </span>{" "}
                  {data.teamworkPitchText || "Together, we turn ideas into digital products that solve real problems for real people."}
                </p>
              </div>
            </div>
          </div>

          {/* Right: 2x2 Team Image Grid: max-w-[31.25rem] (500px) & gap-[0.25rem] */}
          <div className="w-full lg:w-[500px] shrink-0 grid grid-cols-2 gap-1 md:gap-[0.25rem]">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group relative rounded-[1.125rem] overflow-hidden aspect-[4/5] sm:aspect-square lg:aspect-[4/5] min-h-[18.825rem] bg-neutral-100 cursor-pointer"
              >
                {/* Team Member Photo */}
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Bottom Slide-Up Hover Overlay */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end items-center text-center text-white pb-8 gap-1 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.35,1)]">
                  <p className="text-base md:text-lg font-semibold tracking-tight">
                    {member.name}
                  </p>
                  <p className="text-xs text-white/80 font-normal">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
