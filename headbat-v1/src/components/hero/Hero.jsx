import { useEffect, useState } from "react";
import { useContent } from "../../context/ContentContext";
import heroimg from '../../../public/hero-poster.avif'

export default function HeroSection() {
  const { content } = useContent();
  const heroData = content?.hero || {};
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight || 800;
      // স্ক্রল রেঞ্জ ক্যালকুলেট (০ থেকে ১ পর্যন্ত)
      const progress = Math.min(Math.max(scrollY / windowHeight, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const translateY = scrollProgress * -40;
  const rotateX = scrollProgress * -20;
  const scale = 1 - scrollProgress * 0.08; // হালকা স্কেল ডাউন

  const stats = heroData.stats || [
    { label: "50+ employees" },
    { label: "6 countries" },
    { label: "Founded in 2010" }
  ];

  return (
    <div data-theme="dark" className="w-full [perspective:1400px]">
      <section data-theme="dark" className="relative z-10 flex min-h-screen w-full p-2 md:p-3 pb-0 bg-transparent">
        {/* 3D Animated Hero Container */}
        <div
          style={{
            transform: `translate3d(0px, ${translateY}px, 0px) rotateX(${rotateX}deg) scale(${scale})`,
            transformOrigin: "50% 100%",
            transition: "transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)",
            willChange: "transform",
          }}
          className="relative w-full overflow-hidden rounded-[10px]  md:rounded-[20px] bg-black text-white shadow-2xl shadow-white border border-white/5"
        >
          {/* Background Video & Dark Overlay */}
          <div className="absolute inset-0 z-0 h-full w-full">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              poster={heroData.posterUrl || heroimg}
              className="absolute inset-0 h-full w-full object-cover"
              key={heroData.videoUrl || "/videos/home/hero.mp4"}
            >
              <source src={heroData.videoUrl || "/videos/home/hero.mp4"} type="video/mp4" />
            </video>
            {/* Subtle Gradient for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />
          </div>

          {/* Hero Content Wrapper */}
          <div className="relative z-10 flex min-h-[96vh] flex-col justify-between w-11/12 md:max-w-[1300px] mx-auto py-10 md:py-20">
            {/* 1. Empty top space for header */}
            <div className="w-full h-12" />

            {/* 2. Middle & Main Hero Branding */}
            <div className="flex flex-col gap-10 max-w-[1400px] ">
              {/* Brand SVG Logo & Top Right Tagline */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div className="w-full max-w-[44rem]">
                  <h1 className=" text-7xl lg:text-[140px] font-bold">
                    {heroData.brandName || "HeadBat"}
                  </h1>
                </div>

                <p className="w-full max-w-[18rem] text-sm md:text-base font-medium leading-snug text-neutral-200">
                  {heroData.tagline || "Custom branding, web & app design, development, 3D solutions."}
                </p>
              </div>

              {/* Stats Bar */}
              <div className="flex flex-wrap items-center gap-6 md:gap-12 text-sm md:text-base font-medium text-white/90">
                {stats.map((stat, i) => (
                  <div key={i}>{typeof stat === 'string' ? stat : stat.label}</div>
                ))}
              </div>

              {/* Bottom Description */}
              <div className="max-w-[34rem] text-sm md:text-base leading-relaxed text-neutral-400">
                <span className="font-semibold text-white">
                  {heroData.highlightText || "We create digital brands that stand out and scale up."}
                </span>{" "}
                {heroData.description || "Through bespoke design, development, and animation that turn visitors into buyers, leads into returning clients, and startups into success stories."}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
