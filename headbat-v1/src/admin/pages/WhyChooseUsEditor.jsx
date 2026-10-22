import { useState, useEffect } from "react";
import { Save, RotateCcw, Layers } from "lucide-react";
import { useContent } from "../../context/ContentContext";
import api from "../../services/api";
import MediaUploader from "../components/MediaUploader";
import Toast from "../components/Toast";

export default function WhyChooseUsEditor() {
  const { content, reloadContent } = useContent();
  const [formData, setFormData] = useState({
    sectionLabel: "Why choose us",
    headingPrefix: "We design for results - ",
    headingHighlight: "helping your business meet its goals.",
    videoUrl: "/promo.mp4",
    pitchText:
      "Easy-to-use interfaces, seamless development, and lasting impressions keep your users coming back.",
    card1: {
      statValue: "600+",
      title: "Successful projects completed",
      description:
        "We've helped launch over 600 digital products and experiences that make brands stand out and feel human.",
    },
    card2: {
      statValue: "100%",
      title: "UpWork rating",
      badgeText: "17+",
    },
  });

  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (content?.whyChooseUs) {
      setFormData((prev) => ({
        ...prev,
        ...content.whyChooseUs,
        card1: { ...prev.card1, ...(content.whyChooseUs.card1 || {}) },
        card2: { ...prev.card2, ...(content.whyChooseUs.card2 || {}) },
      }));
    }
  }, [content]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await api.updateSectionContent("whyChooseUs", formData);
      await reloadContent();
      setToast({ type: "success", message: "Why Choose Us section updated successfully!" });
    } catch (err) {
      setToast({ type: "error", message: err.message || "Failed to save section" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm("Reset this section to default content?")) return;
    try {
      setIsSaving(true);
      await api.resetSectionContent("whyChooseUs");
      await reloadContent();
      setToast({ type: "success", message: "Section reset to default content" });
    } catch (err) {
      setToast({ type: "error", message: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-300" /> Why Choose Us Section
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Edit pitch statements, video mockup, and stat cards.
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
        <div className="bg-[#111216] p-6 rounded-2xl border border-white/10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
            Headings & Subtitle
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300">
                Heading Main Text
              </label>
              <input
                type="text"
                value={formData.headingPrefix}
                onChange={(e) =>
                  setFormData({ ...formData, headingPrefix: e.target.value })
                }
                className="w-full bg-[#16171d] text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300">
                Heading Highlighted Text (Light grey)
              </label>
              <input
                type="text"
                value={formData.headingHighlight}
                onChange={(e) =>
                  setFormData({ ...formData, headingHighlight: e.target.value })
                }
                className="w-full bg-[#16171d] text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300">
              Pitch Narrative Text
            </label>
            <textarea
              rows={2}
              value={formData.pitchText}
              onChange={(e) =>
                setFormData({ ...formData, pitchText: e.target.value })
              }
              className="w-full bg-[#16171d] text-white text-sm rounded-xl p-3 border border-white/10 outline-none"
            />
          </div>
        </div>

        {/* Video Mockup */}
        <div className="bg-[#111216] p-6 rounded-2xl border border-white/10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
            Mockup Video
          </h2>
          <MediaUploader
            label="Phone Mockup Video (MP4)"
            value={formData.videoUrl}
            onChange={(url) => setFormData({ ...formData, videoUrl: url })}
            accept="video/*"
            helper="Plays on loop inside the sleek vertical card on desktop & mobile"
          />
        </div>

        {/* Two Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-[#111216] p-6 rounded-2xl border border-white/10 space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
              Stat Card 1
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300">Metric Value</label>
              <input
                type="text"
                value={formData.card1?.statValue || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    card1: { ...formData.card1, statValue: e.target.value },
                  })
                }
                className="w-full bg-[#16171d] text-white text-sm rounded-xl px-4 py-2 border border-white/10 outline-none font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300">Card Title</label>
              <input
                type="text"
                value={formData.card1?.title || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    card1: { ...formData.card1, title: e.target.value },
                  })
                }
                className="w-full bg-[#16171d] text-white text-sm rounded-xl px-4 py-2 border border-white/10 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300">
                Card Description
              </label>
              <textarea
                rows={3}
                value={formData.card1?.description || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    card1: { ...formData.card1, description: e.target.value },
                  })
                }
                className="w-full bg-[#16171d] text-white text-sm rounded-xl p-3 border border-white/10 outline-none text-xs"
              />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#111216] p-6 rounded-2xl border border-white/10 space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
              Stat Card 2 (Upwork Rating)
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300">Metric Value</label>
              <input
                type="text"
                value={formData.card2?.statValue || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    card2: { ...formData.card2, statValue: e.target.value },
                  })
                }
                className="w-full bg-[#16171d] text-white text-sm rounded-xl px-4 py-2 border border-white/10 outline-none font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300">Card Title</label>
              <input
                type="text"
                value={formData.card2?.title || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    card2: { ...formData.card2, title: e.target.value },
                  })
                }
                className="w-full bg-[#16171d] text-white text-sm rounded-xl px-4 py-2 border border-white/10 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300">
                Avatar Circle Badge (e.g. 17+)
              </label>
              <input
                type="text"
                value={formData.card2?.badgeText || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    card2: { ...formData.card2, badgeText: e.target.value },
                  })
                }
                className="w-full bg-[#16171d] text-white text-sm rounded-xl px-4 py-2 border border-white/10 outline-none font-mono"
              />
            </div>
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
