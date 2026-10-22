import { useState, useEffect } from "react";
import { Save, RotateCcw, Plus, Trash2, Star, MessageSquare } from "lucide-react";
import { useContent } from "../../context/ContentContext";
import api from "../../services/api";
import MediaUploader from "../components/MediaUploader";
import Toast from "../components/Toast";

export default function TestimonialsEditor() {
  const { content, reloadContent } = useContent();
  const [formData, setFormData] = useState({
    sectionLabel: "Testimonials",
    heading: "Experiences",
    clutchCard: {
      highlight: "We've delivered 600+ projects",
      description:
        " that helped companies streamline operations, boost engagement, and grow revenue.",
      reviewCountText: "25 reviews",
      clutchUrl: "https://clutch.co/profile/nixtio-digital-agency",
      badgeText: "25+",
    },
    reviews: [],
  });

  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (content?.testimonials) {
      setFormData((prev) => ({
        ...prev,
        ...content.testimonials,
        clutchCard: {
          ...prev.clutchCard,
          ...(content.testimonials.clutchCard || {}),
        },
        reviews: content.testimonials.reviews || [],
      }));
    }
  }, [content]);

  const handleReviewChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.reviews];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, reviews: updated };
    });
  };

  const handleAddReview = () => {
    setFormData((prev) => ({
      ...prev,
      reviews: [
        ...prev.reviews,
        {
          name: "Client Name",
          role: "CEO at Company",
          quote: "Outstanding work! Fast delivery and great communication.",
          platform: "linkedin",
          avatar:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
          rating: 5,
        },
      ],
    }));
  };

  const handleRemoveReview = (index) => {
    setFormData((prev) => ({
      ...prev,
      reviews: prev.reviews.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await api.updateSectionContent("testimonials", formData);
      if (res.success) {
        setToast({
          type: "success",
          message: "Testimonials updated successfully! Live website refreshed.",
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
    if (!window.confirm("Reset Testimonials to default data?")) return;
    try {
      const res = await api.resetSectionContent("testimonials");
      if (res.success) {
        setToast({ type: "success", message: "Reset to defaults." });
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
            Testimonials Editor
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Manage client reviews, ratings, platform badges, and the Clutch credential card.
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
        {/* Section Headings */}
        <div className="bg-[#141416] border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-semibold text-white">Section Headings</h2>
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
                Section Heading
              </label>
              <input
                type="text"
                value={formData.heading}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, heading: e.target.value }))
                }
                className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-orange-500/50 focus:outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* Clutch Showcase Card */}
        <div className="bg-[#141416] border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
            Clutch Credential Card
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Highlight Text
              </label>
              <input
                type="text"
                value={formData.clutchCard.highlight}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    clutchCard: { ...prev.clutchCard, highlight: e.target.value },
                  }))
                }
                className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-orange-500/50 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Review Count Badge Text
              </label>
              <input
                type="text"
                value={formData.clutchCard.reviewCountText}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    clutchCard: {
                      ...prev.clutchCard,
                      reviewCountText: e.target.value,
                    },
                  }))
                }
                className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-orange-500/50 focus:outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              Description Suffix
            </label>
            <input
              type="text"
              value={formData.clutchCard.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  clutchCard: { ...prev.clutchCard, description: e.target.value },
                }))
              }
              className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-orange-500/50 focus:outline-none transition"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Clutch Profile URL
              </label>
              <input
                type="url"
                value={formData.clutchCard.clutchUrl}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    clutchCard: { ...prev.clutchCard, clutchUrl: e.target.value },
                  }))
                }
                className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-orange-500/50 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Corner Badge Text (e.g. 25+)
              </label>
              <input
                type="text"
                value={formData.clutchCard.badgeText}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    clutchCard: { ...prev.clutchCard, badgeText: e.target.value },
                  }))
                }
                className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-orange-500/50 focus:outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="bg-[#141416] border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-orange-400" />
                Client Testimonials ({formData.reviews.length})
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Each card displays reviewer photo, role, verified platform, and quote.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddReview}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 text-xs font-medium border border-orange-500/20 transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Review
            </button>
          </div>

          <div className="space-y-4">
            {formData.reviews.map((rev, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-black/30 border border-white/10 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      className="w-10 h-10 rounded-full object-cover border border-white/10"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        {rev.name || `Reviewer #${idx + 1}`}
                      </h4>
                      <p className="text-xs text-neutral-400">{rev.role}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveReview(idx)}
                    className="p-2 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Reviewer Name
                    </label>
                    <input
                      type="text"
                      value={rev.name}
                      onChange={(e) =>
                        handleReviewChange(idx, "name", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white text-xs focus:border-orange-500/50 focus:outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Role / Company
                    </label>
                    <input
                      type="text"
                      value={rev.role}
                      onChange={(e) =>
                        handleReviewChange(idx, "role", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white text-xs focus:border-orange-500/50 focus:outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Platform Badge
                    </label>
                    <select
                      value={rev.platform}
                      onChange={(e) =>
                        handleReviewChange(idx, "platform", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white text-xs focus:border-orange-500/50 focus:outline-none transition"
                    >
                      <option value="linkedin">LinkedIn</option>
                      <option value="clutch">Clutch</option>
                      <option value="upwork">Upwork</option>
                      <option value="google">Google</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Testimonial Quote
                  </label>
                  <textarea
                    rows={2}
                    value={rev.quote}
                    onChange={(e) =>
                      handleReviewChange(idx, "quote", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white text-xs focus:border-orange-500/50 focus:outline-none transition resize-none"
                  />
                </div>

                <MediaUploader
                  label="Reviewer Photo (Avatar)"
                  accept="image"
                  value={rev.avatar}
                  onChange={(val) => handleReviewChange(idx, "avatar", val)}
                  helperText="Upload or enter image URL. Circular display in testimonial card."
                />
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
