import { useState, useEffect } from "react";
import { Save, RotateCcw, Share2, Plus, Trash2 } from "lucide-react";
import { useContent } from "../../context/ContentContext";
import api from "../../services/api";
import Toast from "../components/Toast";

export default function FooterEditor() {
  const { content, reloadContent } = useContent();
  const [formData, setFormData] = useState({
    heading: "Let's talk",
    pitchHighlight: "Have an idea in mind",
    pitchText: " — website, app, or rebrand? Let's make it real.",
    feature1Title: "Quick response.",
    feature1Description:
      "We'll reach out within 24 hours to discuss your goals and expectations.",
    feature2Title: "Clear next steps.",
    feature2Description:
      "After the consultation, we'll provide you with a detailed plan and timeline.",
    formTitlePrefix: "Have a project ",
    formTitleHighlight: "in mind?",
    submitButtonText: "Send Message",
    privacyText: "By submitting, you agree to our Privacy Policy and Cookie Policy.",
    copyrightText: "© 2010-2026 HeadBat. All rights reserved.",
    socials: [],
  });

  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (content?.contactFooter) {
      setFormData((prev) => ({
        ...prev,
        ...content.contactFooter,
        socials: content.contactFooter.socials || prev.socials,
      }));
    }
  }, [content]);

  const handleSocialChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.socials];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, socials: updated };
    });
  };

  const handleAddSocial = () => {
    setFormData((prev) => ({
      ...prev,
      socials: [...prev.socials, { name: "Network", url: "https://" }],
    }));
  };

  const handleRemoveSocial = (index) => {
    setFormData((prev) => ({
      ...prev,
      socials: prev.socials.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await api.updateSectionContent("contactFooter", formData);
      if (res.success) {
        setToast({
          type: "success",
          message: "Contact & Footer section updated successfully! Website updated in real-time.",
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
    if (!window.confirm("Reset Contact & Footer to defaults?")) return;
    try {
      const res = await api.resetSectionContent("contactFooter");
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
            Contact & Footer Editor
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Manage contact form text, guarantee guarantees, social media links, and copyright notices.
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
        {/* Left Column Pitch & Promises */}
        <div className="bg-[#141416] border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-semibold text-white">Left Column - Pitch & Promises</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Header (e.g. "Let's talk")
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
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Pitch Highlight (White Text)
              </label>
              <input
                type="text"
                value={formData.pitchHighlight}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    pitchHighlight: e.target.value,
                  }))
                }
                className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-orange-500/50 focus:outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              Pitch Continuation (Subtle Text)
            </label>
            <input
              type="text"
              value={formData.pitchText}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, pitchText: e.target.value }))
              }
              className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-orange-500/50 focus:outline-none transition"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="space-y-3 p-4 rounded-xl bg-black/30 border border-white/10">
              <label className="block text-xs font-semibold text-orange-400 uppercase tracking-wider">
                Promise #1
              </label>
              <input
                type="text"
                placeholder="Title (e.g. Quick response.)"
                value={formData.feature1Title}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    feature1Title: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white text-xs focus:border-orange-500/50 focus:outline-none transition"
              />
              <textarea
                rows={2}
                placeholder="Description"
                value={formData.feature1Description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    feature1Description: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white text-xs focus:border-orange-500/50 focus:outline-none transition resize-none"
              />
            </div>

            <div className="space-y-3 p-4 rounded-xl bg-black/30 border border-white/10">
              <label className="block text-xs font-semibold text-orange-400 uppercase tracking-wider">
                Promise #2
              </label>
              <input
                type="text"
                placeholder="Title (e.g. Clear next steps.)"
                value={formData.feature2Title}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    feature2Title: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white text-xs focus:border-orange-500/50 focus:outline-none transition"
              />
              <textarea
                rows={2}
                placeholder="Description"
                value={formData.feature2Description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    feature2Description: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white text-xs focus:border-orange-500/50 focus:outline-none transition resize-none"
              />
            </div>
          </div>
        </div>

        {/* Form Labels & Legal Text */}
        <div className="bg-[#141416] border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-semibold text-white">Contact Form Labels & Footer Info</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Form Title Prefix
              </label>
              <input
                type="text"
                value={formData.formTitlePrefix}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    formTitlePrefix: e.target.value,
                  }))
                }
                className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-orange-500/50 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Form Title Highlight
              </label>
              <input
                type="text"
                value={formData.formTitleHighlight}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    formTitleHighlight: e.target.value,
                  }))
                }
                className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-orange-500/50 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Submit Button Text
              </label>
              <input
                type="text"
                value={formData.submitButtonText}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    submitButtonText: e.target.value,
                  }))
                }
                className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-orange-500/50 focus:outline-none transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Privacy Notice Disclaimer
              </label>
              <input
                type="text"
                value={formData.privacyText}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, privacyText: e.target.value }))
                }
                className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-orange-500/50 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Copyright String
              </label>
              <input
                type="text"
                value={formData.copyrightText}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    copyrightText: e.target.value,
                  }))
                }
                className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-orange-500/50 focus:outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-[#141416] border border-white/10 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <Share2 className="w-4 h-4 text-orange-400" />
                Social Media Links ({formData.socials.length})
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Pill buttons displayed on the bottom bar of the website.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddSocial}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 text-xs font-medium border border-orange-500/20 transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Social Link
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {formData.socials.map((social, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-black/30 border border-white/10 flex items-center gap-3"
              >
                <div className="w-1/3">
                  <input
                    type="text"
                    value={social.name}
                    onChange={(e) =>
                      handleSocialChange(idx, "name", e.target.value)
                    }
                    placeholder="Name"
                    className="w-full px-2.5 py-1.5 bg-black/40 border border-white/10 rounded-lg text-white text-xs focus:border-orange-500/50 focus:outline-none transition"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="url"
                    value={social.url}
                    onChange={(e) =>
                      handleSocialChange(idx, "url", e.target.value)
                    }
                    placeholder="URL (https://...)"
                    className="w-full px-2.5 py-1.5 bg-black/40 border border-white/10 rounded-lg text-white text-xs focus:border-orange-500/50 focus:outline-none transition"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveSocial(idx)}
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
