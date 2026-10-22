import { useState } from "react";
import { useParams, Link } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Layers,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Compass,
  Quote,
  ShieldCheck,
  Eye,
} from "lucide-react";
import { useContent } from "../context/ContentContext";
import { getProjectBySlug as fallbackGetBySlug, getAdjacentProjects as fallbackGetAdjacent } from "../data/projectsData";

export default function ProjectDetails() {
  const { slug } = useParams();
  const { getProjectBySlug, getAdjacentProjects } = useContent();
  const project = getProjectBySlug ? getProjectBySlug(slug) : fallbackGetBySlug(slug);
  const { prev, next, currentIndex, total } = getAdjacentProjects ? getAdjacentProjects(slug) : fallbackGetAdjacent(slug);
  const [activeImageTab, setActiveImageTab] = useState("default");


  if (!project) {
    return (
      <main className="min-h-screen bg-[#080808] text-white flex items-center justify-center px-6 py-28">
        <div className="max-w-md text-center flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white">
            <Compass className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Project Not Found</h1>
          <p className="text-neutral-400 text-sm leading-relaxed">
            The project case study you are looking for might have been moved or does not exist.
          </p>
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 bg-white text-black font-semibold text-sm px-6 py-3 rounded-full hover:bg-neutral-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Featured Projects
          </Link>
        </div>
      </main>
    );
  }

  const projectNumber = String(currentIndex + 1).padStart(2, "0");
  const totalCount = String(total).padStart(2, "0");

  return (
    <article data-theme="dark" className="w-full bg-[#0a0a0a] text-white selection:bg-white selection:text-black">
      {/* 1. HERO SECTION */}
      <section className="relative w-full pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden border-b border-white/10">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neutral-800/40 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-neutral-700/20 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="w-11/12 max-w-[1300px] mx-auto px-0 flex flex-col gap-8 md:gap-12">
          {/* Top Breadcrumb & Back Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs md:text-sm">
            <Link
              to="/#projects"
              className="group inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
            >
              <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <ArrowLeft className="w-4 h-4" />
              </span>
              <span className="font-medium">Back to Projects</span>
            </Link>

            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1 rounded-full bg-white/10 text-white font-medium text-xs tracking-wider uppercase border border-white/15">
                {project.category}
              </span>
              <span className="text-neutral-500 font-mono text-xs">
                {projectNumber} / {totalCount}
              </span>
            </div>
          </div>

          {/* Main Title & Hero Intro */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-baseline gap-4 md:gap-6">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.02]">
                {project.title}
              </h1>
              <span className="text-neutral-400 text-lg sm:text-2xl font-light">
                / {project.year}
              </span>
            </div>

            <p className="max-w-3xl text-lg sm:text-xl md:text-2xl text-neutral-300 font-normal leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Metadata Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/10">
            <div>
              <p className="text-xs uppercase tracking-wider text-neutral-400 font-medium mb-1.5">
                Client & Location
              </p>
              <p className="text-sm md:text-base font-semibold text-white">
                {project.client}
              </p>
              <p className="text-xs text-neutral-400">{project.location}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-neutral-400 font-medium mb-1.5">
                Timeline
              </p>
              <p className="text-sm md:text-base font-semibold text-white">
                {project.duration}
              </p>
              <p className="text-xs text-neutral-400">Completed in {project.year}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-neutral-400 font-medium mb-1.5">
                Services & Role
              </p>
              <p className="text-sm md:text-base font-semibold text-white line-clamp-2">
                {project.role}
              </p>
            </div>

            <div className="flex items-center md:justify-end">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 bg-white text-black font-semibold text-xs md:text-sm px-5 py-3 rounded-full hover:bg-neutral-200 transition-all duration-200 shadow-md"
              >
                <span>Live Website</span>
                <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN INTERACTIVE SHOWCASE BANNER */}
      <section className="w-11/12 max-w-[1300px] mx-auto px-0 py-12 md:py-16">
        <div className="flex flex-col gap-4">
          {/* Showcase Control Tabs */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-neutral-900 p-1 rounded-xl border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => setActiveImageTab("default")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeImageTab === "default"
                    ? "bg-white text-black shadow"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Default View
              </button>
              <button
                type="button"
                onClick={() => setActiveImageTab("hover")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeImageTab === "hover"
                    ? "bg-white text-black shadow"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Interactive Portal View
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <Eye className="w-3.5 h-3.5" />
              <span>Hover or toggle above to view case visual states</span>
            </div>
          </div>

          {/* Main Visual Display Frame */}
          <div className="group relative w-full aspect-[16/10] md:aspect-[16/9] rounded-2xl md:rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl">
            <img
              src={
                activeImageTab === "default"
                  ? project.imageDefault
                  : project.imageHover
              }
              alt={`${project.title} Interface Showcase`}
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.03]"
            />

            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-white/80 pointer-events-none">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono">
                  {activeImageTab === "default" ? "Standard Interface View" : "Active Flow & Interactive State"}
                </span>
              </div>
              <span className="hidden sm:inline bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 font-mono">
                HeadBat Design Studio
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROJECT STORY: THE CHALLENGE & THE SOLUTION */}
      <section className="w-full bg-[#111111] py-16 md:py-24 border-y border-white/10">
        <div className="w-11/12 max-w-[1300px] mx-auto px-0 flex flex-col gap-16">
          {/* Narrative Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 md:gap-16 items-start">
            <div>
              <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-3">
                Project Overview
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
                Crafting meaningful digital experiences.
              </h2>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-neutral-300 font-normal leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Split Cards: Challenge vs Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* The Challenge */}
            <div className="p-8 md:p-10 rounded-2xl md:rounded-3xl bg-neutral-900/80 border border-white/10 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-rose-400 mb-2">
                <Layers className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase tracking-wider text-rose-400 font-semibold">
                The Problem
              </span>
              <h3 className="text-2xl md:text-3xl font-semibold text-white">
                The Challenge
              </h3>
              <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            {/* The Solution */}
            <div className="p-8 md:p-10 rounded-2xl md:rounded-3xl bg-neutral-900/80 border border-white/10 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 mb-2">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                The Innovation
              </span>
              <h3 className="text-2xl md:text-3xl font-semibold text-white">
                Our Strategic Solution
              </h3>
              <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. KEY FEATURES & INNOVATIONS */}
      <section className="w-11/12 max-w-[1300px] mx-auto px-0 py-16 md:py-24">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
              Product Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">
              Key Features & Innovations
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.keyFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="group p-6 md:p-8 rounded-2xl bg-neutral-900/50 hover:bg-neutral-900 border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between gap-6"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-white/10 text-neutral-300">
                      0{idx + 1}
                    </span>
                    <span className="text-xs text-neutral-400 font-medium">
                      {feature.tag}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-neutral-100 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-neutral-400 group-hover:text-white transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Validated & Deployed</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. VISUAL SHOWCASE GALLERY */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="w-full bg-[#0d0d0d] py-16 md:py-24 border-t border-white/10">
          <div className="w-11/12 max-w-[1300px] mx-auto px-0 flex flex-col gap-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-2">
                  Visual Systems
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">
                  Design Gallery
                </h2>
              </div>
              <p className="text-xs md:text-sm text-neutral-400 max-w-md">
                A closer inspection of key UI viewports, kinetic design components, and interactive user flows.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {project.gallery.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-3 rounded-2xl md:rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 p-3"
                >
                  <div className="relative aspect-[16/11] overflow-hidden rounded-xl bg-black">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="px-3 py-2 flex flex-col gap-1">
                    <h4 className="text-base font-semibold text-white">
                      {item.title}
                    </h4>
                    <p className="text-xs text-neutral-400">{item.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. QUANTIFIABLE RESULTS & IMPACT */}
      <section className="w-11/12 max-w-[1300px] mx-auto px-0 py-16 md:py-24">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Measurable Outcomes
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">
              Impact & Results
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-6 md:p-8 rounded-2xl bg-neutral-900/60 border border-white/10 flex flex-col justify-between gap-4"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                  {metric.value}
                </div>
                <div className="text-xs md:text-sm text-neutral-400 font-medium">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CLIENT TESTIMONIAL & TECH STACK */}
      <section className="w-full bg-[#111111] py-16 md:py-24 border-y border-white/10">
        <div className="w-11/12 max-w-[1300px] mx-auto px-0 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Testimonial Quote */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
              <Quote className="w-6 h-6" />
            </div>

            <blockquote className="text-xl sm:text-2xl md:text-3xl text-neutral-200 font-light leading-relaxed italic">
              "{project.testimonial.quote}"
            </blockquote>

            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
              <div className="w-12 h-12 rounded-full bg-neutral-800 border border-white/20 flex items-center justify-center font-bold text-lg text-white">
                {project.testimonial.author[0]}
              </div>
              <div>
                <p className="font-semibold text-white text-base">
                  {project.testimonial.author}
                </p>
                <p className="text-xs text-neutral-400">
                  {project.testimonial.role} · {project.testimonial.company}
                </p>
              </div>
            </div>
          </div>

          {/* Tech Stack ecosystem */}
          <div className="lg:col-span-5 flex flex-col gap-6 p-8 rounded-2xl md:rounded-3xl bg-neutral-900/80 border border-white/10">
            <div className="flex items-center gap-3">
              <Cpu className="w-5 h-5 text-neutral-400" />
              <h3 className="text-xl font-semibold text-white">
                Technologies & Tools
              </h3>
            </div>
            <p className="text-xs md:text-sm text-neutral-400">
              Battle-tested frameworks and modern libraries selected specifically for peak performance, smooth rendering, and scalability.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-neutral-200 hover:border-white/30 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-3 text-xs text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Full accessibility, SEO optimization & 60fps animations</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. NEXT / PREVIOUS PROJECT NAVIGATION */}
      <section className="w-11/12 max-w-[1300px] mx-auto px-0 py-16 md:py-24">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
              Explore More Case Studies
            </span>
            <Link
              to="/#projects"
              className="text-xs font-medium text-neutral-400 hover:text-white transition-colors"
            >
              All Projects ({total})
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Prev Project Card */}
            {prev && (
              <Link
                to={prev.link}
                className="group p-6 md:p-8 rounded-2xl bg-neutral-900/50 hover:bg-neutral-900 border border-white/10 hover:border-white/30 transition-all flex items-center justify-between gap-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all shrink-0">
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 uppercase tracking-wider">
                      Previous Project
                    </span>
                    <h4 className="text-lg md:text-xl font-semibold text-white group-hover:text-neutral-200 transition-colors">
                      {prev.title}
                    </h4>
                    <span className="text-xs text-neutral-400">
                      {prev.year} · {prev.category}
                    </span>
                  </div>
                </div>

                <div className="w-20 h-14 rounded-lg overflow-hidden shrink-0 hidden sm:block border border-white/10">
                  <img
                    src={prev.imageDefault}
                    alt={prev.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </Link>
            )}

            {/* Next Project Card */}
            {next && (
              <Link
                to={next.link}
                className="group p-6 md:p-8 rounded-2xl bg-neutral-900/50 hover:bg-neutral-900 border border-white/10 hover:border-white/30 transition-all flex items-center justify-between gap-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 uppercase tracking-wider">
                      Next Project
                    </span>
                    <h4 className="text-lg md:text-xl font-semibold text-white group-hover:text-neutral-200 transition-colors">
                      {next.title}
                    </h4>
                    <span className="text-xs text-neutral-400">
                      {next.year} · {next.category}
                    </span>
                  </div>
                </div>

                <div className="w-20 h-14 rounded-lg overflow-hidden shrink-0 hidden sm:block border border-white/10">
                  <img
                    src={next.imageDefault}
                    alt={next.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* 9. BOTTOM CONVERSION CTA BANNER */}
      <section className="w-11/12 max-w-[1300px] mx-auto px-0 pb-20">
        <div className="rounded-3xl bg-gradient-to-br from-neutral-900 via-black to-neutral-950 border border-white/15 p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex flex-col gap-3 max-w-xl">
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
              Have a similar vision?
            </span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight">
              Let's create your next breakthrough.
            </h3>
            <p className="text-sm md:text-base text-neutral-400">
              From concept and UX strategy to full-stack execution and 3D web experiences, we turn ambitious ideas into digital market leaders.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 bg-white text-black font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-neutral-200 transition-all shadow-lg hover:scale-105"
            >
              Start a Project
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
