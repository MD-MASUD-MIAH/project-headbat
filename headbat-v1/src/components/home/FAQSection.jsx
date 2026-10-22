import { useState } from "react";
import { useContent } from "../../context/ContentContext";

export default function FAQSection() {
  const { content } = useContent();
  const data = content?.faq || {};

  const faqItems = data.items || [
    {
      question: "How long does it take to build a website?",
      answer:
        "The timeline for building a website depends on its complexity and specific requirements. We'll provide a detailed timeline during the initial consultation to ensure clear expectations.",
    },
    {
      question: "Do you offer custom websites or use templates?",
      answer:
        "We create fully custom websites tailored to your brand. No generic templates - just unique, high-performing designs.",
    },
    {
      question: "What's included in your SEO services?",
      answer:
        "We optimize your site structure, content, and speed, ensuring better search rankings and visibility.",
    },
    {
      question: "How does the monthly subscription model work?",
      answer:
        "You pay a fixed monthly fee, and we handle everything - design, updates, and ongoing support. No large upfront costs, just a seamless experience.",
    },
    {
      question: "Can you redesign my existing website?",
      answer:
        "Yes! We can refresh your current site while improving its design, functionality, and performance.",
    },
    {
      question: "How do I get started?",
      answer:
        "Just reach out! We'll discuss your needs, create a plan, and get to work on your website.",
    },
  ];

  // Last item is open by default as shown in the reference image
  const [openIndex, setOpenIndex] = useState(faqItems.length > 0 ? faqItems.length - 1 : 0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      data-theme="light"
      data-aos="fade-up"
      className="w-full bg-[#f8f8f8] py-20 md:py-28 selection:bg-neutral-900 selection:text-white"
    >
      {/* Container: 1300px max-width, w-11/12 on mobile, no horizontal padding */}
      <div className="w-11/12 max-w-[1300px] mx-auto px-0">
        {/* Main Content: 2-Column Layout */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16">
          {/* Left Info: Title & Description */}
          <div className="flex flex-col items-start gap-6 md:gap-[1.875rem] w-full lg:max-w-[31.38rem]">
            <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-medium text-neutral-950 tracking-tight leading-none">
              {data.heading || "FAQ"}
            </h2>
            <p className="text-sm md:text-[0.95rem] text-neutral-500 font-normal leading-relaxed max-w-[23.75rem]">
              {data.subHeading || "Got questions? We've got answers. Here's everything you need to know about working with us."}
            </p>
          </div>

          {/* Right Accordion List */}
          <div className="flex flex-col gap-1 md:gap-[0.25rem] w-full lg:max-w-[35.125rem] xl:max-w-[50rem]">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="bg-white rounded-[1.56rem] overflow-hidden transition-colors duration-300"
                >
                  {/* Question Button */}
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 p-6 md:p-7 text-left cursor-pointer transition-colors"
                  >
                    <span className="text-sm sm:text-base font-semibold text-neutral-950 leading-[140%] flex-1">
                      {item.question}
                    </span>

                    {/* Circular Icon with 45deg (135deg) Rotation into 'X' */}
                    <span className="w-5 h-5 min-w-5 shrink-0 flex items-center justify-center text-neutral-950">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 16"
                        className={`w-4 h-4 transition-transform duration-300 ease-out will-change-transform ${
                          isOpen ? "rotate-[135deg]" : "rotate-0"
                        }`}
                      >
                        <path
                          fill="currentColor"
                          d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16"
                        />
                        <path fill="#fff" d="M7.111 4.444H8.89v7.111H7.111z" />
                        <path fill="#fff" d="M11.555 7.111V8.89h-7.11V7.111z" />
                      </svg>
                    </span>
                  </button>

                  {/* Expandable Answer Content */}
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 md:px-7 md:pb-7 pt-0">
                        <p className="text-xs sm:text-sm text-neutral-500 font-normal leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
