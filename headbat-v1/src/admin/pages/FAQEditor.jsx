import { useState, useEffect } from "react";
import { Save, RotateCcw, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { useContent } from "../../context/ContentContext";
import api from "../../services/api";
import Toast from "../components/Toast";

export default function FAQEditor() {
  const { content, reloadContent } = useContent();
  const [formData, setFormData] = useState({
    heading: "FAQ",
    subHeading:
      "Got questions? We've got answers. Here's everything you need to know about working with us.",
    items: [],
  });

  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (content?.faq) {
      setFormData({
        heading: content.faq.heading || "FAQ",
        subHeading: content.faq.subHeading || "",
        items: content.faq.items || [],
      });
    }
  }, [content]);

  const handleItemChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.items];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, items: updated };
    });
  };

  const handleAddFaq = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          question: "New Frequently Asked Question?",
          answer: "Comprehensive answer explaining the process or deliverables.",
        },
      ],
    }));
  };

  const handleRemoveFaq = (index) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleMoveFaq = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= formData.items.length) return;
    setFormData((prev) => {
      const items = [...prev.items];
      const temp = items[index];
      items[index] = items[targetIdx];
      items[targetIdx] = temp;
      return { ...prev, items };
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await api.updateSectionContent("faq", formData);
      if (res.success) {
        setToast({
          type: "success",
          message: "FAQ section updated successfully! Website accordion refreshed.",
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
    if (!window.confirm("Reset FAQ section to default questions?")) return;
    try {
      const res = await api.resetSectionContent("faq");
      if (res.success) {
        setToast({ type: "success", message: "Reset to default questions." });
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
            FAQ Section Editor
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Manage interactive accordion questions and answers on the homepage.
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
        {/* Headings */}
        <div className="bg-[#141416] border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-semibold text-white">Section Headings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Section Title
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
                Sub-heading Description
              </label>
              <textarea
                rows={2}
                value={formData.subHeading}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, subHeading: e.target.value }))
                }
                className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-orange-500/50 focus:outline-none transition resize-none"
              />
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="bg-[#141416] border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">
                Frequently Asked Questions ({formData.items.length})
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Add, reorder, or edit questions and answers.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddFaq}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 text-xs font-medium border border-orange-500/20 transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add FAQ
            </button>
          </div>

          <div className="space-y-4">
            {formData.items.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-black/30 border border-white/10 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-xs font-mono text-orange-400">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-medium text-neutral-400">
                      Question #{idx + 1}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveFaq(idx, -1)}
                      className="p-1 rounded hover:bg-white/5 disabled:opacity-30 text-neutral-400 hover:text-white transition cursor-pointer"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === formData.items.length - 1}
                      onClick={() => handleMoveFaq(idx, 1)}
                      className="p-1 rounded hover:bg-white/5 disabled:opacity-30 text-neutral-400 hover:text-white transition cursor-pointer"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveFaq(idx)}
                      className="p-1 rounded hover:bg-red-500/10 text-neutral-500 hover:text-red-400 transition cursor-pointer ml-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Question Text
                  </label>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) =>
                      handleItemChange(idx, "question", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white text-sm focus:border-orange-500/50 focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Answer Content
                  </label>
                  <textarea
                    rows={3}
                    value={faq.answer}
                    onChange={(e) =>
                      handleItemChange(idx, "answer", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white text-xs leading-relaxed focus:border-orange-500/50 focus:outline-none transition resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
