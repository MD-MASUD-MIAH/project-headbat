import { useEffect, useRef, useState } from "react";
import { useContent } from "../../context/ContentContext";

// Animated Counter Component
const AnimatedCounter = ({ target, duration = 2000, startAnimation }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

    // const start = 0;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      setCount(Math.floor(progress * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [startAnimation, target, duration]);

  return <span>{startAnimation ? count : 0}</span>;
};

export default function StatisticsSection() {
  const { content } = useContent();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Toggle animation every time it enters/exits the viewport
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.25, // Triggers when 25% of the section is visible
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = content?.statistics?.items || [
    {
      value: 500,
      suffix: "+",
      label: "Clients worldwide",
    },
    {
      value: 45,
      suffix: "+",
      label: "Successful projects per year",
    },
    {
      value: 60,
      suffix: "%",
      label: "Clients who came to us by referrals",
    },
    {
      value: 42,
      suffix: "",
      label: "Clutch Awards",
    },
  ];

  return (
    <section
      ref={sectionRef}
      data-theme="light"
      className="w-full bg-[#f8f8f8] py-20 md:pb-28 md:pt-2 selection:bg-neutral-900 selection:text-white"
    >
      {/* Container: 1300px max-width, w-11/12 on mobile, no horizontal padding */}
      <div className="w-11/12 max-w-[1300px] mx-auto px-0">
        {/* Flex layout with justify-between across the width */}
        <div className="grid grid-cols-2 justify-center  sm:flex-row flex-wrap items-start sm:justify-between gap-10 sm:gap-6 lg:gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col justify-start items-start gap-2 md:gap-[1.12rem] min-w-[200px]"
            >
              {/* Value Number & Suffix */}
              <div className="text-neutral-950 font-semibold text-5xl sm:text-6xl md:text-7xl lg:text-[5.3125rem] tracking-[-0.3718rem] leading-none flex items-baseline">
                <AnimatedCounter
                  target={stat.value}
                  duration={2200}
                  startAnimation={isVisible}
                />
                {stat.suffix && (
                  <span className="font-semibold tracking-normal ml-0.5">
                    {stat.suffix}
                  </span>
                )}
              </div>

              {/* Label */}
              <div className="text-neutral-600 text-sm md:text-[0.875rem] font-medium leading-[130%] tracking-[-0.04rem] max-w-[220px]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
