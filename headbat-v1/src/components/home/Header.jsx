import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router";
import { useContent } from "../../context/ContentContext";
import logo2 from "../../../public/logo2.png";
import logo from "../../../public/logobg.png";

export default function Header() {
  const { content } = useContent();
  const headerData = content?.header || {};
  const [isDarkBg, setIsDarkBg] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const headerRef = useRef(null);


  useEffect(() => {
    const handleScrollAndTheme = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 40);

      // Vertical point corresponding to the header/logo level in viewport
      const checkY = 48;
      const checkX = Math.min(60, window.innerWidth / 2);

      let themeFound = null;

      // 1. Inspect elements at the logo point using elementsFromPoint
      if (typeof document.elementsFromPoint === "function") {
        const elements = document.elementsFromPoint(checkX, checkY);
        for (const el of elements) {
          // Skip header element and its children
          if (headerRef.current && headerRef.current.contains(el)) continue;

          // Check for data-theme attribute on element or ancestors
          const themed = el.closest("[data-theme]");
          if (themed) {
            themeFound = themed.getAttribute("data-theme");
            break;
          }

          // Fallback: check computed background color
          const computedBg = window.getComputedStyle(el).backgroundColor;
          if (
            computedBg &&
            computedBg !== "transparent" &&
            computedBg !== "rgba(0, 0, 0, 0)"
          ) {
            const rgb = computedBg.match(/\d+/g);
            if (rgb && rgb.length >= 3) {
              const r = Number(rgb[0]);
              const g = Number(rgb[1]);
              const b = Number(rgb[2]);
              const a = rgb[3] !== undefined ? Number(rgb[3]) : 1;
              if (a > 0.15) {
                const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
                themeFound = luminance < 128 ? "dark" : "light";
                break;
              }
            }
          }
        }
      }

      // 2. Direct bounding-rect check of all [data-theme] sections across the page
      if (!themeFound) {
        const sections = document.querySelectorAll("[data-theme]");
        for (const sec of sections) {
          const rect = sec.getBoundingClientRect();
          if (rect.top <= checkY && rect.bottom > checkY) {
            themeFound = sec.getAttribute("data-theme");
            break;
          }
        }
      }

      // 3. Fallback default: if at top (< 400px), hero is dark; else light
      if (themeFound) {
        setIsDarkBg(themeFound === "dark");
      } else {
        setIsDarkBg(scrollY < 400);
      }
    };

    handleScrollAndTheme();
    window.addEventListener("scroll", handleScrollAndTheme, { passive: true });
    window.addEventListener("resize", handleScrollAndTheme, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScrollAndTheme);
      window.removeEventListener("resize", handleScrollAndTheme);
    };
  }, [pathname]);

  const navLinks = headerData.navLinks || [
    { name: "Projects", href: "/#projects" },
    { name: "Studio", href: "/#studio" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "Contact", href: "/#contact" },
  ];
  const ctaButton = headerData.ctaButton || {
    text: "Start a Project",
    href: "/#contact",
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-transparent transition-all duration-300"
    >
      <div
        className={`flex items-center justify-between gap-4 transition-all duration-300 ${
          isScrolled
            ? "py-3.5 px-6 md:px-8"
            : "px-[2.2rem] pt-[1.8rem] pb-[0.75rem] max-md:px-6 max-md:pt-3.5 max-md:pb-2"
        }`}
      >
        {/* Main Logo: WHITE on Black/Dark bg, BLACK on White/Light bg */}
        <Link
          to="/"
          aria-label="Go to homepage"
          className="block shrink-0 group"
        >
          <img
            className="h-10 w-12 object-contain transition-all duration-300 ease-in-out group-hover:rotate-[1080deg]"
            src={
              isDarkBg
                ? (content?.seo?.logoDark || headerData.logoDark || logo)
                : (content?.seo?.logoLight || headerData.logoLight || logo2)
            }
            alt={content?.seo?.brandName || headerData.brandName || "Logo"}
          />
        </Link>

        {/* Desktop Navigation Pill Bar */}
        <nav
          className={`hidden md:flex items-center justify-around gap-10 rounded-[1.875rem] py-3.5 px-8 font-medium text-sm transition-all duration-300 ${
            !isScrolled
              ? "w-full max-w-[51rem] bg-transparent text-white"
              : isDarkBg
              ? "w-full max-w-[36rem] bg-neutral-900/85 text-white shadow-2xl border border-white/15 backdrop-blur-md"
              : "w-full max-w-[36rem] bg-white text-black shadow-lg border border-black/5"
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`transition-colors duration-200 ${
                !isScrolled || isDarkBg
                  ? "hover:text-neutral-300 text-white/90"
                  : "hover:text-neutral-500 text-black/90"
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0 md:gap-4">
          <a
            href={ctaButton.href || "/#contact"}
            className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 md:px-6 md:py-3 text-sm font-semibold transition-all duration-300 shadow-sm ${
              isDarkBg
                ? "bg-white text-black hover:bg-neutral-200"
                : "bg-neutral-950 text-white hover:bg-neutral-800"
            }`}
          >
            {ctaButton.text || "Start a Project"}
          </a>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`flex md:hidden flex-col justify-center items-center gap-1.5 w-10 h-10 rounded-full p-2 shadow-sm transition-all duration-300 ${
              isDarkBg
                ? "bg-white/10 text-white border border-white/20"
                : "bg-white text-black border border-black/10"
            }`}
          >
            <span
              className={`w-5 h-0.5 rounded-full transition-all duration-300 ${
                isDarkBg ? "bg-white" : "bg-black"
              } ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`w-5 h-0.5 rounded-full transition-opacity duration-300 ${
                isDarkBg ? "bg-white" : "bg-black"
              } ${isMobileMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`w-5 h-0.5 rounded-full transition-all duration-300 ${
                isDarkBg ? "bg-white" : "bg-black"
              } ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden mx-4 p-6 rounded-3xl shadow-xl flex flex-col gap-4 text-center transition-all duration-300 border ${
            isDarkBg
              ? "bg-neutral-900/95 text-white border-white/10 backdrop-blur-xl"
              : "bg-white text-black border-black/5"
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-base font-medium transition-colors ${
                isDarkBg
                  ? "text-white hover:text-neutral-300"
                  : "text-black hover:text-neutral-600"
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
