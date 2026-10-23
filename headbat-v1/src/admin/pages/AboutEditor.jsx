import { useState, useEffect } from "react";
import { Save, RotateCcw, Plus, Trash2 } from "lucide-react";
import { useContent } from "../../context/ContentContext";
import api from "../../services/api";
import MediaUploader from "../components/MediaUploader";
import Toast from "../components/Toast";

export default function AboutEditor() {
  const { content, reloadContent } = useContent();
  const [formData, setFormData] = useState({
    sectionLabel: "About us",
    headingPrefix: "We craft solutions ",
    headingHighlight: "designed for your niche",
    description:
      "From SaaS dashboards and CRMs to eCommerce, healthcare, fintech, and Web3, we bring innovation and usability together.",
    videoUrl: "/web2.mp4",
    featureBlocks: [
      { title: "Always in Sync", iconType: "sync" },
      { title: "Creating as One", iconType: "collab" },
      { title: "Tailored for Success", iconType: "tailored" },
      { title: "Results You Can See", iconType: "results" },
    ],
  });

  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (content?.aboutUs) {
      setFormData((prev) => ({
        ...prev,
        ...content.aboutUs,
        featureBlocks: content.aboutUs.featureBlocks || prev.featureBlocks,
      }));
    }
  }, [content]);

  const handleBlockChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.featureBlocks];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, featureBlocks: updated };
    });
  };

  const handleAddBlock = () => {
    setFormData((prev) => ({
      ...prev,
      featureBlocks: [
        ...prev.featureBlocks,
        { title: "New Feature Block", iconType: "sync" },
      ],
    }));
  };

  const handleRemoveBlock = (index) => {
    setFormData((prev) => ({
      ...prev,
      featureBlocks: prev.featureBlocks.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await api.updateSectionContent("aboutUs", formData);
      if (res.success) {
        setToast({
          type: "success",
          message: "About Us section updated successfully! Website updated in real-time.",
        });
        await reloadContent();
      } else {
        setToast({ type: "error", message: res.message || "Failed to update." });
      }
    } catch (err) {
      setToast({ type: "error", message: err.message || "An error occurred." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm("Reset About Us section to defaults?")) return;
    try {
      const res = await api.resetSectionContent("aboutUs");
      if (res.success) {
        setToast({ type: "success", message: "Reset to default content." });
        await reloadContent();
      }
    } catch (err) {
      setToast({ type: "error", message: "Failed to reset: " + err.message });
    }
  };

  return (
    <div className="space-y-6">
      {toast && <Toast toast={toast} onClose={() => setToast(null)} />}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            About Us Editor
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Manage the About Us showcase section, headings, niche narrative, and animated cards.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 text-xs font-semibold transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-orange-500/20 transition cursor-pointer"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Headings & Narrative */}
        <div className="bg-[#141416] border border-white/10 rounded-2xl p-6 space-y-5">
          <h2 className="text-base font-semibold text-white">
            Headings & Narrative
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Section Label Badge
              </label>
              <input
                type="text"
                value={formData.sectionLabel}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, sectionLabel: e.target.value }))
                }
                className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-orange-500/50 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Heading Prefix
              </label>
              <input
                type="text"
                value={formData.headingPrefix}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, headingPrefix: e.target.value }))
                }
                className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-orange-500/50 focus:outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              Heading Highlighted Text (Gradient)
            </label>
            <input
              type="text"
              value={formData.headingHighlight}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, headingHighlight: e.target.value }))
              }
              className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-orange-500/50 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              Description Paragraph
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-orange-500/50 focus:outline-none transition resize-none"
            />
          </div>
        </div>

        {/* Video Showcase Asset */}
        <div className="bg-[#141416] border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-semibold text-white">
            Showcase Video
          </h2>
          <MediaUploader
            label="Section Video (.mp4 / .webm)"
            accept="video"
            value={formData.videoUrl}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, videoUrl: val }))
            }
            helperText="Plays in a looped glassmorphic showcase container next to the narrative."
          />
        </div>

        {/* 4 Feature Blocks */}
        <div className="bg-[#141416] border border-white/10 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">Feature Blocks</h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Glassmorphic pill cards highlighting team principles and workflows.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddBlock}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 text-xs font-medium border border-orange-500/20 transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Block
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.featureBlocks.map((block, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-500">
                    Card #{idx + 1}
                  </span>
                  {formData.featureBlocks.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveBlock(idx)}
                      className="text-neutral-500 hover:text-red-400 transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Card Title
                  </label>
                  <input
                    type="text"
                    value={block.title}
                    onChange={(e) =>
                      handleBlockChange(idx, "title", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white text-xs focus:border-orange-500/50 focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Icon Type
                  </label>
                  <select
                    value={block.iconType}
                    onChange={(e) =>
                      handleBlockChange(idx, "iconType", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white text-xs focus:border-orange-500/50 focus:outline-none transition"
                  >
                    <option value="sync">Sync / Dual Refresh Arrows</option>
                    <option value="collab">Collaboration / Two Users</option>
                    <option value="tailored">Tailored / Precision Target</option>
                    <option value="results">Results / Ascending Sparkle Graph</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Preview Box */}
        <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/5 flex items-start gap-3">
          <Info className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
          <p className="text-xs text-neutral-400 leading-relaxed">
            Changes to the About Us section will take effect on the public website immediately after saving without rebuilding or restarting the application.
          </p>
        </div>
      </form>
    </div>
  );
}
