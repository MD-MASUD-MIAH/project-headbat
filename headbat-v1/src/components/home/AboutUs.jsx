import { useRef, useState } from "react";
import { useContent } from "../../context/ContentContext";
import web2 from "../../../public/web2.mp4";

const defaultIcons = [
  // Icon 1: Sync
  (
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="none" viewBox="0 0 60 60">
      <path stroke="#161616" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M20 26.433a3.937 3.937 0 0 1 7.87 0c0 4.917-7.867 4.917-7.867 10.742h7.867m14.382-7.257-6.73-.073a.697.697 0 0 1-.687-.695V22.5m7.405.157v14.52" />
      <path stroke="#161616" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M51.25 17.5C46.77 9.428 39.235 4.975 30 5 16.192 5 5 16.193 5 30s11.192 25 25 25 25-11.192 25-25" />
      <path stroke="#161616" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M52.858 12.5v5.358H47.5" />
    </svg>
  ),
  // Icon 2: Collab
  (
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="none" viewBox="0 0 60 60">
      <path stroke="#161616" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="m33.975 4.4-2.7 2.7m-20-2.7 2.5 2.5m8.85-4.4v3.525M42.651 17.6l-4.545-4.55a3.75 3.75 0 0 0-5.302 0 3.75 3.75 0 0 0 0 5.302" />
      <path stroke="#161616" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M20.972 17.65a3.753 3.753 0 0 1 0-5.302 3.753 3.753 0 0 1 5.302 0l9.723 9.722 5.302 5.303V20.65a3.886 3.886 0 0 1 7.695-.762l2.798 13.992a17.9 17.9 0 0 1-4.9 16.18 17.91 17.91 0 0 1-25.333 0l-6.775-6.777-6.187-6.188a3.753 3.753 0 0 1 0-5.302 3.753 3.753 0 0 1 5.302 0" />
      <path stroke="#161616" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M21.337 39.23 9.847 27.74a3.75 3.75 0 0 1 0-5.3 3.753 3.753 0 0 1 5.302 0m11.49 11.485L11.614 18.9a3.75 3.75 0 0 1 0-5.302 3.753 3.753 0 0 1 5.303 0l15.025 15.025" />
    </svg>
  ),
  // Icon 3: Tailored
  (
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="none" viewBox="0 0 60 60">
      <path stroke="#161616" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="m31.192 36.347 4.387 2.263c.392.203.87.168 1.227-.087.36-.256.538-.688.466-1.118l-.838-4.793 3.55-3.392c.317-.302.432-.758.295-1.17a1.15 1.15 0 0 0-.94-.777l-4.907-.698-2.193-4.363c-.197-.39-.6-.634-1.045-.634-.442 0-.848.245-1.043.634l-2.195 4.366-4.904.697c-.44.063-.805.363-.943.777-.135.413-.023.868.297 1.17l3.55 3.393-.84 4.792c-.162.933.835 1.646 1.69 1.206l4.39-2.263" />
      <path stroke="#161616" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M18.236 7.5c-.817 0-1.595.345-2.137.947-2.433 2.706-2.45 6.353-.038 9.076.54.612 1.318.962 2.143.967.828 0 1.607-.348 2.152-.947 2.433-2.703 2.448-6.353.038-9.075a2.87 2.87 0 0 0-2.145-.968" />
    </svg>
  ),
  // Icon 4: Results
  (
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="none" viewBox="0 0 60 60">
      <path stroke="#161616" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M7.5 22.512h45M27.498 7.5l-.013.013.013.012.012-.013zm-6.25 0-.013.013.013.012.012-.013zm-6.25 0-.013.013.013.012.012-.013zM27.512 15l-.012.012.012.013.013-.013-.012-.012zm-6.25 0-.012.012.012.013.013-.013-.012-.012zm-6.25 0-.012.012.012.013.013-.013zm35.953 28.483-4.332 1.822c-.595.25-1.07.723-1.32 1.318l-1.828 4.345a2.5 2.5 0 0 1-2.445 1.525 2.5 2.5 0 0 1-2.257-1.79l-3.68-12.495a2.498 2.498 0 0 1 3.105-3.105l12.495 3.675a2.501 2.501 0 0 1 .262 4.705" />
      <path stroke="#161616" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M30 52.5H15A7.5 7.5 0 0 1 7.5 45V15A7.5 7.5 0 0 1 15 7.5h30a7.5 7.5 0 0 1 7.5 7.5v15" />
    </svg>
  ),
];

export default function AboutUs() {
  const { content } = useContent();
  const data = content?.aboutUs || {};
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const featureBlocks = data.featureBlocks || [
    { title: "Always in Sync" },
    { title: "Creating as One" },
    { title: "Tailored for Success" },
    { title: "Results You Can See" },
  ];

  return (
    <section
      data-theme="light"
      data-aos="fade-up"
      className="w-full bg-[#f8f8f8] py-20 md:py-28 selection:bg-neutral-900 selection:text-white"
      id="studio"
    >
      {/* Container: 1300px max-width, w-11/12 on mobile, no horizontal padding */}
      <div className="w-11/12 max-w-[1300px] mx-auto px-0">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] items-start gap-4 lg:gap-12 mb-14 md:mb-20">
          <p className="text-sm md:text-base text-neutral-500 font-normal leading-snug">
            {data.sectionLabel || "About us"}
          </p>
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl sm:text-5xl md:text-[3.75rem] font-semibold text-neutral-950 tracking-tight leading-[1.08]">
              {data.headingPrefix || "We craft solutions "}{" "}
              <span className="text-neutral-400 font-normal">
                {data.headingHighlight || "designed for your niche"}
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-[1.05rem] text-neutral-500 font-normal leading-relaxed max-w-2xl">
              {data.description || "From SaaS dashboards and CRMs to eCommerce, healthcare, fintech, and Web3, we bring innovation and usability together."}
            </p>
          </div>
        </div>

        {/* 4 Feature Cards Grid: 0.25rem (gap-1) between cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 md:gap-[0.25rem] mb-1 md:mb-[0.25rem]">
          {featureBlocks.map((block, index) => (
            <div
              key={index}
              className="bg-white p-7 md:p-8 min-h-[14rem] md:min-h-[17.25rem] flex flex-col justify-between items-start border border-neutral-200 rounded-3xl transition-all duration-300 hover:bg-neutral-50"
            >
              <div className="w-15 h-15 flex items-center justify-start">
                {block.icon || defaultIcons[index % defaultIcons.length]}
              </div>

              <h3 className="text-lg md:text-xl font-semibold text-neutral-900 leading-snug tracking-tight">
                {block.title === "Results You Can See" ? (
                  <>
                    Results <br className="hidden sm:block" /> You Can See
                  </>
                ) : (
                  block.title
                )}
              </h3>
            </div>
          ))}
        </div>

        {/* Big Video Showcase Container */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/10] rounded-2xl md:rounded-3xl overflow-hidden bg-neutral-950 shadow-sm group">
          <video
            ref={videoRef}
            src={data.videoUrl || web2}
            key={data.videoUrl || web2}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Sound / Mute Toggle Button at Bottom Left */}
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            className="absolute bottom-5 left-5 md:bottom-8 md:left-8 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-neutral-900 transition-transform duration-300 hover:scale-110 active:scale-95 shadow-lg"
          >
            {isMuted ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.75"
                  d="M7.894 8.626H5.519a1 1 0 0 0-1 1v4.75a1 1 0 0 0 1 1h2.375l3.979 3.371a.999.999 0 0 0 1.646-.763V6.018c0-.852-.997-1.314-1.646-.763zM16 9l6 6m0-6l-6 6"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.75"
                  d="M7.894 8.626H5.519a1 1 0 0 0-1 1v4.75a1 1 0 0 0 1 1h2.375l3.979 3.371a.999.999 0 0 0 1.646-.763V6.018c0-.852-.997-1.314-1.646-.763zM17.519 15.972c1.162-.722 1.963-2.224 1.963-3.973s-.8-3.252-1.963-3.983"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
