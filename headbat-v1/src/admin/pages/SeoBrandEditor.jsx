import { useState, useEffect } from "react";
import {
  Globe,
  Save,
  RotateCcw,
  Search,
  Image as ImageIcon,
  Share2,
  Info,
  CheckCircle,
} from "lucide-react";
import { useContent } from "../../context/ContentContext";
import api from "../../services/api";
import MediaUploader from "../components/MediaUploader";
import Toast from "../components/Toast";

export default function SeoBrandEditor() {
  const { content, reloadContent } = useContent();

  const [formData, setFormData] = useState({
    brandName: "HeadBat",
    metaTitle: "HeadBat - Custom Branding, Web & App Design, 3D Solutions",
    metaDescription:
      "Through bespoke design, development, and animation that turn visitors into buyers, leads into returning clients, and startups into success stories.",
    keywords:
      "branding, web design, app development, 3d solutions, ui ux, digital agency, case studies",
    author: "HeadBat Studio",
    faviconUrl: "/logo2.png",
    logoDark: "/logobg.png",
    logoLight: "/logo2.png",
    ogImage: "/hero-poster.avif",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (content?.seo || content?.header) {
      setFormData((prev) => ({
        ...prev,
        ...(content.header || {}),
        ...(content.seo || {}),
      }));
    }
  }, [content]);

  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    try {
      setIsSaving(true);

      // Save to 'seo' section
      await api.updateSectionContent("seo", formData);

      // Also keep header section in sync for logos & brandName
      if (content?.header) {
        await api.updateSectionContent("header", {
          ...content.header,
          brandName: formData.brandName,
          logoDark: formData.logoDark,
          logoLight: formData.logoLight,
        });
      }

      await reloadContent();
      setToast({
        type: "success",
        message: "SEO, Meta tags, and Brand Logos saved successfully!",
      });
    } catch (err) {
      setToast({
        type: "error",
        message: err.message || "Failed to save SEO settings",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (
      !window.confirm("Reset SEO and Brand Identity to initial default settings?")
    )
      return;
    try {
      setIsSaving(true);
      await api.resetSectionContent("seo");
      await reloadContent();
      setToast({
        type: "success",
        message: "Reset SEO settings to defaults",
      });
    } catch (err) {
      setToast({ type: "error", message: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {toast && <Toast toast={toast} onClose={() => setToast(null)} />}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Globe className="w-5 h-5 text-indigo-400" /> SEO & Brand Identity
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Manage browser tab title, Google search description, favicon icon,
            and dark/light website logos.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-neutral-300 border border-white/10 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors shadow-lg disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Brand Name & Logos */}
        <div className="bg-[#111216] p-6 rounded-2xl border border-white/10 space-y-5">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-orange-400" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-200">
              Brand Identity & Logos
            </h2>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
              Brand / Company Name
            </label>
            <input
              type="text"
              value={formData.brandName || ""}
              onChange={(e) => handleChange("brandName", e.target.value)}
              placeholder="e.g. HeadBat"
              className="w-full bg-[#16171d] text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 outline-none focus:border-white/40"
            />
            <p className="text-[11px] text-neutral-500 mt-1">
              Used in the header logo alt text, tab fallback, and footer copyright.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Favicon */}
            <div className="space-y-3 p-4 rounded-xl bg-black/40 border border-white/5">
              <div>
                <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                  Favicon Icon
                </h3>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Appears in browser tabs and bookmarks (.png / .ico / .svg).
                </p>
              </div>
              <MediaUploader
                label="Favicon File or URL"
                accept="image"
                value={formData.faviconUrl || ""}
                onChange={(val) => handleChange("faviconUrl", val)}
                helperText="Square 32x32 or 64x64 recommended."
              />
            </div>

            {/* Dark Mode Logo */}
            <div className="space-y-3 p-4 rounded-xl bg-black/40 border border-white/5">
              <div>
                <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                  Logo (Dark Mode)
                </h3>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  White/light logo displayed over dark background sections.
                </p>
              </div>
              <MediaUploader
                label="Dark Background Logo"
                accept="image"
                value={formData.logoDark || ""}
                onChange={(val) => handleChange("logoDark", val)}
                helperText="Transparent PNG or SVG."
              />
            </div>

            {/* Light Mode Logo */}
            <div className="space-y-3 p-4 rounded-xl bg-black/40 border border-white/5">
              <div>
                <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                  Logo (Light Mode)
                </h3>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Dark/black logo displayed when scrolling over light sections.
                </p>
              </div>
              <MediaUploader
                label="Light Background Logo"
                accept="image"
                value={formData.logoLight || ""}
                onChange={(val) => handleChange("logoLight", val)}
                helperText="Transparent PNG or SVG."
              />
            </div>
          </div>
        </div>

        {/* Search Engine Optimization (SEO) */}
        <div className="bg-[#111216] p-6 rounded-2xl border border-white/10 space-y-5">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-200">
              Search Engine Optimization (SEO)
            </h2>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
                Meta Title (Page / Tab Title)
              </label>
              <span className="text-[11px] text-neutral-500 font-mono">
                {(formData.metaTitle || "").length} / 60 recommended chars
              </span>
            </div>
            <input
              type="text"
              value={formData.metaTitle || ""}
              onChange={(e) => handleChange("metaTitle", e.target.value)}
              placeholder="e.g. HeadBat - Creative Agency & Digital Brand Studio"
              className="w-full bg-[#16171d] text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 outline-none focus:border-white/40"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
                Meta Description
              </label>
              <span className="text-[11px] text-neutral-500 font-mono">
                {(formData.metaDescription || "").length} / 160 recommended chars
              </span>
            </div>
            <textarea
              rows={3}
              value={formData.metaDescription || ""}
              onChange={(e) => handleChange("metaDescription", e.target.value)}
              placeholder="Summary of your agency services, brand value, and offerings..."
              className="w-full bg-[#16171d] text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 outline-none focus:border-white/40 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                Meta Keywords
              </label>
              <input
                type="text"
                value={formData.keywords || ""}
                onChange={(e) => handleChange("keywords", e.target.value)}
                placeholder="Comma separated: branding, web design, 3d, ui/ux"
                className="w-full bg-[#16171d] text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 outline-none focus:border-white/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                Author / Publisher Name
              </label>
              <input
                type="text"
                value={formData.author || ""}
                onChange={(e) => handleChange("author", e.target.value)}
                placeholder="e.g. HeadBat Studio"
                className="w-full bg-[#16171d] text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 outline-none focus:border-white/40"
              />
            </div>
          </div>
        </div>

        {/* Social Sharing & OpenGraph */}
        <div className="bg-[#111216] p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-sky-400" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-200">
              Social Media Preview (OpenGraph Banner)
            </h2>
          </div>

          <MediaUploader
            label="Social Share Image (OG Image)"
            accept="image"
            value={formData.ogImage || ""}
            onChange={(val) => handleChange("ogImage", val)}
            helperText="Image displayed when your link is shared on Facebook, Twitter, LinkedIn, Slack (1200x630 recommended)."
          />
        </div>

        {/* Real-time Google Search & Tab Preview */}
        <div className="bg-[#111216] p-6 rounded-2xl border border-white/10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-200 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            Live Search & Browser Preview
          </h2>

          {/* Browser Tab Preview */}
          <div className="rounded-xl border border-white/10 bg-[#0d0e12] p-3 max-w-sm space-y-1.5">
            <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold block">
              Browser Tab Preview
            </span>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1a1b22] border border-white/10 w-fit max-w-full">
              {formData.faviconUrl ? (
                <img
                  src={formData.faviconUrl}
                  alt="fav"
                  className="w-4 h-4 rounded-sm object-contain shrink-0"
                />
              ) : (
                <div className="w-4 h-4 rounded-sm bg-neutral-600 shrink-0" />
              )}
              <span className="text-xs text-neutral-200 font-medium truncate max-w-[220px]">
                {formData.metaTitle || "HeadBat"}
              </span>
            </div>
          </div>

          {/* Google Result Preview */}
          <div className="rounded-xl border border-white/10 bg-[#0d0e12] p-5 space-y-2 max-w-2xl">
            <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold block">
              Google Search Result Snippet
            </span>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                <span className="text-emerald-400">https://headbat.com</span>
              </div>
              <h3 className="text-base font-medium text-[#8ab4f8] hover:underline cursor-pointer line-clamp-1">
                {formData.metaTitle || "HeadBat"}
              </h3>
              <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                {formData.metaDescription ||
                  "Through bespoke design, development, and animation that turn visitors into buyers, leads into returning clients, and startups into success stories."}
              </p>
            </div>
          </div>
        </div>

        {/* Informational Notice */}
        <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/5 flex items-start gap-3">
          <Info className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
          <p className="text-xs text-neutral-400 leading-relaxed">
            Changes to the Title, Favicon, and Logos will update your website
            immediately upon saving without needing to restart the server or
            rebuild the project.
          </p>
        </div>
      </form>
    </div>
  );
}
