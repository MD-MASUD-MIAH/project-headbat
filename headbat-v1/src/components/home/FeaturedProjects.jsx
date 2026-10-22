import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { useContent } from "../../context/ContentContext";

export default function FeaturedProjects() {
  const { content, projects } = useContent();
  const intro = content?.featuredProjectsIntro || {};

  return (
    <section data-theme="light" data-aos="fade-up" id="projects" className="w-full py-16">
      <style>{`
        /* Smooth Portal Hover Transition */
        .portal-layer {
          clip-path: circle(0% at 50% 50%);
          opacity: 0;
          filter: blur(6px);
          transition: 
            clip-path 1.3s cubic-bezier(0.25, 1, 0.35, 1),
            opacity 1.1s cubic-bezier(0.25, 1, 0.35, 1),
            filter 1.1s cubic-bezier(0.25, 1, 0.35, 1);
        }

        .group:hover .portal-layer {
          clip-path: circle(140% at 50% 50%);
          opacity: 1;
          filter: blur(0px);
        }

        .ambient-scale {
          transition: transform 1.3s cubic-bezier(0.25, 1, 0.35, 1);
        }
        .group:hover .ambient-scale {
          transform: scale(1.06);
        }
      `}</style>

      {/* Container: 1300px max-width, w-11/12 on mobile, no horizontal padding */}
      <div className="w-11/12 max-w-[1300px] mx-auto px-0">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] items-start gap-4 md:gap-8 mb-10 md:mb-14">
          <p className="text-sm md:text-[0.95rem] text-neutral-600 font-normal leading-snug">
            {intro.subHeading || "Unique solutions that generate leads"}
          </p>
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold text-neutral-950 tracking-tight leading-none">
              {intro.heading || "Featured Projects"}
            </h2>
            <p className="text-xs md:text-sm text-neutral-500 mt-1">
              {intro.description || "Click on any project to explore full case studies, UI systems, and impact metrics."}
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {projects.map((project, index) => (
            <Link
              key={project.id || index}
              to={project.link}
              className="group rounded-2xl relative flex flex-col bg-white overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300 border border-neutral-100"
            >
              {/* Project Info Bar */}
              <div className="bg-white h-[3.75rem] px-6 py-4 flex items-center justify-between z-20">
                <div className="flex items-baseline gap-[0.63rem]">
                  <h3 className="text-base md:text-lg font-semibold text-neutral-900 leading-none group-hover:text-neutral-950 transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-xs font-semibold text-neutral-500 relative top-[1px] before:content-['/_'] before:text-neutral-400 leading-none">
                    {project.year}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs font-medium text-neutral-400 group-hover:text-black transition-colors">
                  <span className="hidden sm:inline">View Case</span>
                  <span className="w-7 h-7 rounded-full bg-neutral-100 group-hover:bg-black group-hover:text-white flex items-center justify-center transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Image Frame Container */}
              <div className="relative w-full aspect-[16/11] overflow-hidden bg-neutral-900">
                {/* 1. Default Base Image */}
                <img
                  src={project.imageDefault}
                  alt={project.title}
                  loading="lazy"
                  className="ambient-scale absolute inset-0 w-full h-full object-cover"
                />

                {/* 2. Hover Reveal Image */}
                <div className="portal-layer absolute inset-0 w-full h-full overflow-hidden">
                  <img
                    src={project.imageHover}
                    alt={`${project.title} Preview`}
                    loading="lazy"
                    className="ambient-scale w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Category Pill Tag */}
                <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
                  <span className="bg-black/60 backdrop-blur-md text-white text-[0.7rem] uppercase tracking-wider font-medium px-3 py-1 rounded-full border border-white/10">
                    {project.category}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Rolling Text Button */}
        <div className="mt-10 md:mt-12 flex">
          <a
            href="#projects"
            className="group/btn relative inline-flex items-center gap-3 bg-neutral-950 hover:bg-neutral-900 text-white text-[0.875rem] font-medium px-6 py-3 rounded-full overflow-hidden transition-colors duration-300"
          >
            {/* Rolling Text Wrapper */}
            <span className="relative block overflow-hidden h-[1.25rem]">
              <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/btn:-translate-y-1/2">
                <span className="block leading-[1.25rem] whitespace-nowrap">
                  All Featured Works ({projects.length})
                </span>
                <span className="block leading-[1.25rem] whitespace-nowrap">
                  All Featured Works ({projects.length})
                </span>
              </span>
            </span>

            {/* Icon Dot */}
            <span className="w-2 h-2 bg-white rounded-full transition-transform duration-300 group-hover/btn:scale-125"></span>
          </a>
        </div>
      </div>
    </section>
  );
}
