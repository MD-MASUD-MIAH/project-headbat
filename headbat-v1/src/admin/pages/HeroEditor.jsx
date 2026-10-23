import { useState, useEffect } from "react";
import { Save, RotateCcw, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { useContent } from "../../context/ContentContext";
import api from "../../services/api";
import MediaUploader from "../components/MediaUploader";
import Toast from "../components/Toast";

export default function HeroEditor() {
  const { content, reloadContent } = useContent();
  const [formData, setFormData] = useState({
    brandName: "HeadBat",
    tagline: "Custom branding, web & app design, development, 3D solutions.",
    stats: [
      { label: "50+ employees" },
      { label: "6 countries" },
      { label: "Founded in 2010" },
    ],
    highlightText: "We create digital brands that stand out and scale up.",
    description:
      "Through bespoke design, development, and animation that turn visitors into buyers, leads into returning clients, and startups into success stories.",
    videoUrl: "/videos/home/hero.mp4",
    posterUrl: "/hero-poster.avif",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (content?.hero) {
      setFormData((prev) => ({
        ...prev,
        ...content.hero,
      }));
    }
  }, [content]);

  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleStatChange = (index, val) => {
    const updated = [...formData.stats];
    updated[index] = { label: val };
    setFormData((prev) => ({ ...prev, stats: updated }));
  };

  const addStat = () => {
    setFormData((prev) => ({
      ...prev,
      stats: [...prev.stats, { label: "New Stat Metric" }],
    }));
  };

  const removeStat = (index) => {
    const updated = formData.stats.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, stats: updated }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await api.updateSectionContent("hero", formData);
      await reloadContent();
      setToast({ type: "success", message: "Hero section content updated and saved to MongoDB!" });
    } catch (err) {
      setToast({ type: "error", message: err.message || "Failed to save Hero section" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm("Reset Hero section to default initial content?")) return;
    try {
      setIsSaving(true);
      await api.resetSectionContent("hero");
      await reloadContent();
      setToast({ type: "success", message: "Hero section reset to default values" });
    } catch (err) {
      setToast({ type: "error", message: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {toast && <Toast toast={toast} onClose={() => setToast(null)} />}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Hero Section Editor
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Update the main hero title, taglines, stats metrics, and background video.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-neutral-300 border border-white/10 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Default
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors shadow-lg disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" /> {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-[#111216] p-6 rounded-2xl border border-white/10 space-y-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
            Brand & Primary Messaging
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Brand Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
                Hero Brand Title
              </label>
              <input
                type="text"
                value={formData.brandName || ""}
                onChange={(e) => handleChange("brandName", e.target.value)}
                className="w-full bg-[#16171d] text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 outline-none focus:border-white/40"
              />
            </div>

            {/* Tagline */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
                Top Tagline (Next to title)
              </label>
              <input
                type="text"
                value={formData.tagline || ""}
                onChange={(e) => handleChange("tagline", e.target.value)}
                className="w-full bg-[#16171d] text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 outline-none focus:border-white/40"
              />
            </div>
          </div>

          {/* Highlight description text */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
              Highlight Sentence (Bold text)
            </label>
            <input
              type="text"
              value={formData.highlightText || ""}
              onChange={(e) => handleChange("highlightText", e.target.value)}
              className="w-full bg-[#16171d] text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 outline-none focus:border-white/40"
            />
          </div>

          {/* Full description */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
              Supporting Narrative Description
            </label>
            <textarea
              rows={3}
              value={formData.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              className="w-full bg-[#16171d] text-white text-sm rounded-xl p-4 border border-white/10 outline-none focus:border-white/40 leading-relaxed"
            />
          </div>
        </div>

        {/* Stats Metrics Bar */}
        <div className="bg-[#111216] p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
              Stats Horizontal Bar Items
            </h2>
            <button
              type="button"
              onClick={addStat}
              className="inline-flex items-center gap-1 text-xs text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Metric
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {formData.stats.map((stat, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-[#16171d] p-2 rounded-xl border border-white/5"
              >
                <input
                  type="text"
                  value={stat.label || ""}
                  onChange={(e) => handleStatChange(i, e.target.value)}
                  className="flex-1 bg-transparent text-white text-xs px-2 py-1 outline-none font-medium"
                />
                <button
                  type="button"
                  onClick={() => removeStat(i)}
                  className="p-1.5 text-neutral-500 hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Background Media */}
        <div className="bg-[#111216] p-6 rounded-2xl border border-white/10 space-y-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
            Background Media & Poster
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MediaUploader
              label="Background Video (MP4)"
              value={formData.videoUrl}
              onChange={(url) => handleChange("videoUrl", url)}
              accept="video/mp4,video/webm"
              helper="Uploaded file will be stored in /uploads and served with high performance"
            />

            <MediaUploader
              label="Video Poster Image (AVIF / WebP / JPG)"
              value={formData.posterUrl}
              onChange={(url) => handleChange("posterUrl", url)}
              accept="image/*"
              helper="Thumbnail displayed before video autoplays"
            />
          </div>
        </div>
      </form>

      <Toast
        message={toast?.message}
        type={toast?.type}
        onClose={() => setToast(null)}
      />
    </div>
  );
}
