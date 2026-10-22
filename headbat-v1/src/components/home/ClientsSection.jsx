import { useContent } from "../../context/ContentContext";

export default function ClientsSection() {
  const { content } = useContent();
  const clientsData = content?.clients || {};

  const defaultLogoMap = {
    Lenovo: (
      <span className="font-bold text-2xl tracking-tighter text-[#0A0A0A]">
        Lenovo
      </span>
    ),
    YouTube: (
      <div className="flex items-center gap-1.5">
        <div className="w-7 h-5 bg-[#0A0A0A] rounded-[6px] flex items-center justify-center">
          <div className="w-0 h-0 border-y-[3.5px] border-y-transparent border-l-[6px] border-l-white ml-0.5" />
        </div>
        <span className="font-bold text-xl tracking-tight text-[#0A0A0A]">
          YouTube
        </span>
      </div>
    ),
    NBA: (
      <div className="flex items-center gap-1">
        <div className="w-4 h-9 border border-[#0A0A0A] rounded-sm flex items-center justify-center">
          <div className="w-2 h-4 bg-[#0A0A0A] rounded-full" />
        </div>
        <span className="font-extrabold text-2xl tracking-tighter text-[#0A0A0A]">
          NBA
        </span>
      </div>
    ),
    AUD: (
      <div className="flex items-center gap-1">
        <span className="font-serif font-bold text-2xl tracking-wide text-[#0A0A0A]">
          AUD
        </span>
        <span className="text-[7px] leading-[8px] font-semibold uppercase tracking-tighter text-[#0A0A0A] border-l border-[#0A0A0A] pl-1">
          American
          <br />
          University
          <br />
          in Dubai
        </span>
      </div>
    ),
    Dribbble: (
      <span className="font-serif italic font-bold text-2xl tracking-tight text-[#0A0A0A]">
        Dribbble
      </span>
    ),
    Lexus: (
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#0A0A0A] flex items-center justify-center italic font-bold text-lg leading-none">
          L
        </div>
        <span className="text-[10px] font-bold tracking-[0.25em] text-[#0A0A0A] uppercase mt-0.5">
          Lexus
        </span>
      </div>
    ),
    Toyota: (
      <div className="flex flex-col items-center">
        <div className="w-8 h-6 rounded-full border-2 border-[#0A0A0A] flex items-center justify-center">
          <div className="w-4 h-4 rounded-full border border-[#0A0A0A]" />
        </div>
        <span className="text-[10px] font-bold tracking-[0.2em] text-[#0A0A0A] uppercase mt-1">
          Toyota
        </span>
      </div>
    ),
    Near: (
      <div className="flex items-center gap-1.5">
        <span className="text-2xl font-black text-[#0A0A0A]">Ⓝ</span>
        <span className="font-medium text-2xl tracking-tight text-[#0A0A0A]">
          near
        </span>
      </div>
    ),
    Pampers: (
      <div className="flex flex-col items-center">
        <span className="text-xs text-[#0A0A0A]">♥</span>
        <span className="font-bold text-2xl tracking-tight text-[#0A0A0A] -mt-1 font-serif">
          Pampers
        </span>
      </div>
    ),
    "California Community Colleges": (
      <div className="flex items-center gap-2 max-w-[140px]">
        <div className="w-7 h-7 rounded-full border-2 border-[#0A0A0A] flex items-center justify-center shrink-0">
          <div className="w-3.5 h-3.5 border-t-2 border-r-2 border-[#0A0A0A] rotate-45" />
        </div>
        <span className="text-[9px] font-semibold leading-[11px] text-[#0A0A0A]">
          California Community Colleges
        </span>
      </div>
    ),
    MIT: (
      <div className="flex items-end gap-1 text-[#0A0A0A]">
        <div className="w-2 h-7 bg-[#0A0A0A]" />
        <div className="w-2 h-5 bg-[#0A0A0A]" />
        <div className="w-2 h-7 bg-[#0A0A0A]" />
        <div className="w-2 h-4 bg-[#0A0A0A]" />
        <div className="w-2 h-7 bg-[#0A0A0A]" />
      </div>
    ),
    HP: (
      <div className="w-11 h-11 rounded-full bg-[#0A0A0A] flex items-center justify-center text-white italic font-bold text-xl tracking-tighter">
        hp
      </div>
    ),
  };

  const clientList = clientsData.items || [
    { name: "Lenovo" },
    { name: "YouTube" },
    { name: "NBA" },
    { name: "AUD" },
    { name: "Dribbble" },
    { name: "Lexus" },
    { name: "Toyota" },
    { name: "Near" },
    { name: "Pampers" },
    { name: "California Community Colleges" },
    { name: "MIT" },
    { name: "HP" },
  ];

  return (
    <section data-theme="light" data-aos="fade-up" className="relative w-full bg-[#f6f6f6]">
      <div className="  mx-auto flex flex-col gap-10 w-11/12 md:max-w-[1300px] py-10 md:py-20  ">
        {/* Title */}
        <div>
          <h2 className="text-base md:text-lg  text-[#0A0A0A]">
            {clientsData.title || "Our clients"}
          </h2>
        </div>

        {/* Client Cards Grid (2 rows, 6 columns on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
          {clientList.map((client, idx) => {
            const logoEl =
              client.logoUrl || client.image ? (
                <img
                  src={client.logoUrl || client.image}
                  alt={client.name}
                  className="max-h-12 max-w-[120px] object-contain"
                />
              ) : defaultLogoMap[client.name] ? (
                defaultLogoMap[client.name]
              ) : (
                <span className="font-bold text-xl tracking-tight text-[#0A0A0A]">
                  {client.logoText || client.name}
                </span>
              );

            return (
              <div
                key={client.name || idx}
                className="group flex items-center justify-center h-28 md:h-36 bg-white rounded-2xl md:rounded-3xl border border-black/[0.04] shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
              >
                <div className="transition-transform duration-300 group-hover:scale-105 select-none">
                  {logoEl}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
