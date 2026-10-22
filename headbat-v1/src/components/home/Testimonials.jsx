import { useContent } from "../../context/ContentContext";

// Star Rating Component
const StarRating = () => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className="w-2.5 h-2.5 text-[#FB9826] fill-current"
        viewBox="0 0 9 9"
      >
        <path d="M3.459.593c.352-.79 1.474-.79 1.826 0l.51 1.143c.145.326.453.55.808.586l1.244.131c.86.092 1.208 1.159.565 1.738l-.93.838a1 1 0 0 0-.308.95l.259 1.225c.18.846-.728 1.506-1.478 1.073l-1.083-.625a1 1 0 0 0-1 0l-1.083.625c-.75.433-1.658-.227-1.478-1.073L1.57 5.98a1 1 0 0 0-.308-.952l-.93-.836c-.643-.58-.296-1.647.565-1.739l1.244-.13a1 1 0 0 0 .808-.587z" />
      </svg>
    ))}
  </div>
);

export default function Testimonials() {
  const { content } = useContent();
  const data = content?.testimonials || {};
  const clutchCard = data.clutchCard || {};
  const reviews = data.reviews || [];

  const clutchAvatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80",
  ];

  return (
    <section
      data-theme="light"
      data-aos="fade-up"
      id="testimonials"
      className="w-full bg-[#f8f8f8] py-20 md:py-28 selection:bg-neutral-900 selection:text-white"
    >
      {/* Container: 1300px max-width, w-11/12 on mobile, no horizontal padding */}
      <div className="w-11/12 max-w-[1300px] mx-auto px-0">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] items-start gap-4 lg:gap-12 mb-14 md:mb-20">
          <p className="text-sm md:text-base text-neutral-500 font-normal leading-snug">
            {data.sectionLabel || "Testimonials"}
          </p>
          <h2 className="text-4xl sm:text-6xl md:text-[3.75rem] font-semibold text-neutral-950 tracking-tight leading-none">
            {data.heading || "Experiences"}
          </h2>
        </div>

        {/* Testimonials 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 md:gap-[0.25rem]">
          {/* Card 1: Clutch Highlight Card */}
          <div className="bg-white rounded-3xl p-7 md:p-8 flex flex-col justify-between min-h-[460px] md:min-h-[540px] shadow-sm">
            <p className="text-sm md:text-[0.95rem] text-neutral-500 font-normal leading-relaxed">
              <span className="text-neutral-950 font-medium">
                {clutchCard.highlight || "We've delivered 600+ projects"}
              </span>{" "}
              {clutchCard.description || "that helped companies streamline operations, boost engagement, and grow revenue."}
            </p>

            <div className="flex flex-col gap-5 pt-8">
              {/* Overlapping Avatars */}
              <div className="flex items-center -space-x-2">
                {clutchAvatars.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="Reviewer"
                    className="w-9 h-9 rounded-full object-cover border-2 border-white ring-1 ring-black/5"
                    loading="lazy"
                  />
                ))}
                <div className="w-9 h-9 rounded-full bg-neutral-950 text-white text-[11px] font-semibold flex items-center justify-center border-2 border-white">
                  {clutchCard.badgeText || "25+"}
                </div>
              </div>

              {/* Clutch Review Info */}
              <div className="flex flex-col gap-1.5">
                <StarRating />
                <span className="text-xs text-neutral-500 font-medium">
                  <strong className="text-neutral-950 font-semibold">
                    Clutch
                  </strong>{" "}
                  {clutchCard.reviewCountText || "25 reviews"}
                </span>
              </div>

              {/* See on Clutch Link */}
              <a
                href={clutchCard.clutchUrl || "https://clutch.co/profile/nixtio-digital-agency"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-900 hover:text-neutral-600 transition-colors pt-2"
              >
                <span>See on Clutch</span>
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="none">
                  <path
                    fill="currentColor"
                    d="M14.861 13.406a.313.313 0 0 1-.312-.313v-7.2l-9.19 9.19a.313.313 0 0 1-.441-.443l9.189-9.189h-7.2a.313.313 0 0 1 0-.625h7.954a.31.31 0 0 1 .313.312v7.955a.313.313 0 0 1-.313.313"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Dynamic Review Cards */}
          {(reviews.length > 0
            ? reviews
            : [
                {
                  name: "Torstein Gustavsen",
                  role: "CEO at Tixio.io",
                  quote:
                    "I like working with Bogdan. Always delivers on time, and they come up with great solutions. Will be working with him and his team again.",
                  platform: "linkedin",
                  avatar:
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
                },
                {
                  name: "Vishrut Malhotra",
                  role: "Co-Founder, Inspect Hoa",
                  quote:
                    "Nixtio did a spectacular service on all their deliverables, providing exceptional designs on both the platform and product.",
                  platform: "custom",
                  avatar:
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
                },
                {
                  name: "Robert Avram",
                  role: "Founder at Nuovo",
                  quote:
                    "Working with Nixtio was an amazing experience from start to finish. They completed all the projects successfully and with outstanding results.",
                  platform: "upwork",
                  avatar:
                    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&auto=format&fit=crop&q=80",
                },
              ]
          ).map((rev, idx) => {
            const isTopQuote = idx % 2 === 1;

            const platformBadge =
              rev.platform === "linkedin" ? (
                <div className="w-10 h-10 rounded-full bg-[#007EBB] flex items-center justify-center z-10 border-2 border-white shadow-sm">
                  <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </div>
              ) : rev.platform === "upwork" ? (
                <div className="w-10 h-10 rounded-full bg-[#14A800] flex items-center justify-center z-10 border-2 border-white shadow-sm">
                  <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.229l.228-1.076.008-.039c.205-1.143.85-3.064 2.838-3.064 1.488 0 2.7 1.213 2.7 2.705 0 1.489-1.212 2.703-2.7 2.703zm0-7.854c-2.535 0-4.502 1.652-5.303 4.366-1.222-1.835-2.146-4.037-2.686-5.892h-2.73v7.114a2.547 2.547 0 0 1-2.543 2.543 2.547 2.547 0 0 1-2.542-2.543V3.778H0v7.114c-.01 2.912 2.358 5.303 5.27 5.303 2.908 0 5.277-2.391 5.277-5.303v-1.195c.53 1.108 1.181 2.227 1.971 3.221l-1.674 7.874h2.797l1.212-5.711c1.061.68 2.282 1.107 3.68 1.107 2.996 0 5.434-2.455 5.434-5.453 0-2.997-2.438-5.432-5.436-5.432z" />
                  </svg>
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#E62415] flex items-center justify-center z-10 border-2 border-white text-white font-bold text-base shadow-sm">
                  {rev.name ? rev.name.charAt(0) : "★"}
                </div>
              );

            const authorInfo = (
              <div className="flex flex-col gap-3">
                <div className="flex items-center -space-x-2">
                  {platformBadge}
                  {rev.avatar && (
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white"
                      loading="lazy"
                    />
                  )}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-neutral-900 leading-tight">
                    {rev.name}
                  </h3>
                  <p className="text-xs text-neutral-400 font-normal">
                    {rev.role}
                  </p>
                </div>
              </div>
            );

            const quoteInfo = (
              <div className="flex flex-col gap-3">
                <StarRating />
                <p className="text-base md:text-lg font-medium text-neutral-950 leading-snug">
                  {rev.quote}
                </p>
              </div>
            );

            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 md:p-8 flex flex-col justify-between min-h-[460px] md:min-h-[540px] shadow-sm"
              >
                {isTopQuote ? (
                  <>
                    {quoteInfo}
                    {authorInfo}
                  </>
                ) : (
                  <>
                    {authorInfo}
                    {quoteInfo}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
