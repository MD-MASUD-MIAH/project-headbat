import { useState } from "react";
import { useContent } from "../../context/ContentContext";

export default function Services() {
  const { content } = useContent();
  const servicesData = content?.services || {};
  const serviceList = servicesData.items || [
    {
      number: "001",
      title: "Web & App Design",
      description:
        "Modern, responsive, and user-friendly websites and apps designed to engage users and drive conversions.",
      tags: [
        "Web & App UI",
        "iOS & Android",
        "Cross-Platform Design",
        "Animations & Microinteractions",
        "Prototyping & User Flows",
        "Design Systems & UI Kits",
      ],
    },
    {
      number: "002",
      title: "Development",
      description:
        "We offer full-stack development for websites and web apps, including architecture, performance optimization, QA, and ongoing support.",
      tags: [
        "Website Development",
        "Web App Development",
        "Frontend",
        "Backend",
        "iOS & Android Development",
        "QA & Testing",
        "Maintenance & Support",
      ],
    },
    {
      number: "003",
      title: "Branding",
      description:
        "Distinctive, memorable brand experiences that communicate your values and create emotional connections with your customers.",
      tags: [
        "Offline Branding",
        "Logo design",
        "Rebranding",
        "Typography",
        "Guidelines",
        "Visual identity",
        "Digital brand presence",
        "Color systems",
      ],
    },
    {
      number: "004",
      title: "3D",
      description:
        "We create high-quality 3D animations and visuals for websites, apps, and videos – adding depth, motion, and a polished edge to your product.",
      tags: ["3D Animation", "3D Rendering", "3D Assets", "Video & Motion Use"],
    },
  ];

  // 001 default open
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      data-theme="dark"
      data-aos="fade-up"
      className="w-full bg-[#080808] black-section text-white py-20 md:py-28 selection:bg-white selection:text-black"
      id="services"
    >
      {/* Container: 1300px max-width, w-11/12 on mobile, no horizontal padding */}
      <div className="w-11/12 max-w-[1300px] mx-auto px-0">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] items-start gap-4 lg:gap-12 mb-14 md:mb-20">
          <p className="text-sm md:text-base text-neutral-400 font-normal leading-snug">
            {servicesData.sectionLabel || "What we do"}
          </p>
          <h2 className="text-4xl sm:text-6xl md:text-[3.25rem] font-semibold text-white tracking-tight leading-none">
            {servicesData.heading || "Services"}
          </h2>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col">
          {serviceList.map((service, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="border-t border-neutral-800 transition-colors duration-300"
              >
                <div
                  onClick={() => toggleAccordion(index)}
                  className="grid grid-cols-1 lg:grid-cols-[180px_1fr] items-start gap-4 lg:gap-12 py-7 md:py-9 cursor-pointer group"
                >
                  {/* Left Column: Item Number */}
                  <div className="text-sm md:text-base text-neutral-400 font-normal pt-1.5">
                    {service.number}
                  </div>

                  {/* Right Column: Title, Content & Button */}
                  <div className="flex items-start justify-between gap-6 w-full">
                    <div className="flex-1">
                      {/* Service Title */}
                      <h3
                        className={`text-2xl sm:text-3xl md:text-[1.375rem] font-semibold tracking-tight transition-colors duration-300 ${isOpen ? "text-white" : "text-neutral-200 group-hover:text-white"}`}
                      >
                        {service.title}
                      </h3>

                      {/* Expandable Accordion Body */}
                      <div
                        className={`grid transition-all duration-500 ease-[cubic-bezier(0.25,1,0.35,1)] ${
                          isOpen
                            ? "grid-rows-[1fr] opacity-100 mt-6 md:mt-8"
                            : "grid-rows-[0fr] opacity-0 mt-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                            {/* Left: Description */}
                            <div className="lg:col-span-5">
                              <p className="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed max-w-md">
                                {service.description}
                              </p>
                            </div>

                            {/* Right: Categories & Tags */}
                            <div className="lg:col-span-7 flex flex-col gap-3">
                              <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                Categories
                              </span>
                              <div className="flex flex-wrap gap-2 md:gap-2.5">
                                {service.tags.map((tag, tagIndex) => (
                                  <span
                                    key={tagIndex}
                                    className="inline-block bg-white text-neutral-950 text-xs sm:text-sm font-medium px-4 py-2 rounded-full whitespace-nowrap shadow-sm hover:bg-neutral-200 transition-colors"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Plus / Minus Action Button */}
                    <button
                      type="button"
                      aria-label={isOpen ? "Close" : "Open"}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-neutral-800 flex items-center justify-center shrink-0 group-hover:border-neutral-600 transition-colors duration-300 relative mt-0.5"
                    >
                      <span
                        className={`relative w-4 h-4 flex items-center justify-center transition-transform duration-500 ease-in-out ${
                          isOpen ? "rotate-[360deg]" : "rotate-0"
                        }`}
                      >
                        {/* Horizontal Line */}
                        <span className="absolute w-3.5 h-[1.5px] bg-white" />

                        {/* Vertical Line */}
                        <span
                          className={`absolute w-[1.5px] h-3.5 bg-white transition-opacity duration-300 ${
                            isOpen ? "opacity-0" : "opacity-100"
                          }`}
                        />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          {/* Bottom Border */}
          <div className="border-t border-neutral-800" />
        </div>

        {/* Bottom Call To Action Button */}
        <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] items-start gap-4 lg:gap-12 mt-12 md:mt-16">
          <div className="hidden lg:block" />
          <div>
            <a
              href="#contact"
              className="group/btn relative inline-flex items-center justify-center bg-white text-neutral-950 text-sm md:text-base font-semibold px-8 py-3.5 rounded-full overflow-hidden transition-colors duration-300 hover:bg-neutral-200 shadow-sm"
            >
              {/* Rolling Text Transition */}
              <span className="relative block overflow-hidden h-[1.35rem]">
                <span className="flex flex-col transition-transform dur ation-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/btn:-translate-y-1/2">
                  <span className="block leading-[1.35rem] whitespace-nowrap">
                    Get started
                  </span>
                  <span className="block leading-[1.35rem] whitespace-nowrap">
                    Get started
                  </span>
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
