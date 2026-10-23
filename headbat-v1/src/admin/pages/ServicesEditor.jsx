import { useState, useEffect } from "react";
import { Save, Plus, Trash2, RotateCcw } from "lucide-react";
import { useContent } from "../../context/ContentContext";
import api from "../../services/api";
import Toast from "../components/Toast";

export default function ServicesEditor() {
  const { content, reloadContent } = useContent();
  const [formData, setFormData] = useState({
    sectionLabel: "What we do",
    heading: "Services",
    ctaText: "Get started",
    ctaHref: "#contact",
    items: [],
  });

  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (content?.services) {
      setFormData({
        sectionLabel: content.services.sectionLabel || "What we do",
        heading: content.services.heading || "Services",
        ctaText: content.services.ctaText || "Get started",
        ctaHref: content.services.ctaHref || "#contact",
        items: content.services.items || [],
      });
    }
  }, [content]);

  const handleServiceChange = (index, field, val) => {
    const updated = [...formData.items];
    updated[index] = { ...updated[index], [field]: val };
    setFormData((prev) => ({ ...prev, items: updated }));
  };

  const handleTagsChange = (index, tagsString) => {
    const tagsArray = tagsString
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const updated = [...formData.items];
    updated[index] = { ...updated[index], tags: tagsArray };
    setFormData((prev) => ({ ...prev, items: updated }));
  };

  const addService = () => {
    const nextNumber = String(formData.items.length + 1).padStart(3, "0");
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          number: nextNumber,
          title: "New Service Offering",
          description: "High performance bespoke digital design and architecture.",
          tags: ["UI/UX", "Strategy", "Execution"],
        },
      ],
    }));
  };

  const removeService = (index) => {
    const updated = formData.items.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, items: updated }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await api.updateSectionContent("services", formData);
      await reloadContent();
      setToast({ type: "success", message: "Services section saved to MongoDB!" });
    } catch (err) {
      setToast({ type: "error", message: err.message || "Failed to save services" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm("Reset services to default values?")) return;
    try {
      setIsSaving(true);
      await api.resetSectionContent("services");
      await reloadContent();
      setToast({ type: "success", message: "Services reset to defaults" });
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
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Services Section Editor
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Manage the interactive expandable accordion services and category tags.
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

      <div className="bg-[#111216] p-6 rounded-2xl border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-300">
            Section Label
          </label>
          <input
            type="text"
            value={formData.sectionLabel}
            onChange={(e) =>
              setFormData({ ...formData, sectionLabel: e.target.value })
            }
            className="w-full bg-[#16171d] text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-300">
            Main Heading
          </label>
          <input
            type="text"
            value={formData.heading}
            onChange={(e) =>
              setFormData({ ...formData, heading: e.target.value })
            }
            className="w-full bg-[#16171d] text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 outline-none"
          />
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
            Services List ({formData.items.length})
          </h2>
          <button
            type="button"
            onClick={addService}
            className="inline-flex items-center gap-1.5 text-xs text-black font-semibold bg-white hover:bg-neutral-200 px-4 py-2 rounded-xl transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" /> Add Service
          </button>
        </div>

        <div className="space-y-4">
          {formData.items.map((service, i) => (
            <div
              key={i}
              className="bg-[#111216] p-6 rounded-2xl border border-white/10 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <span className="text-xs font-mono text-indigo-400 font-bold">
                  Service #{service.number || `00${i + 1}`}
                </span>
                <button
                  type="button"
                  onClick={() => removeService(i)}
                  className="p-1.5 text-neutral-500 hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300">
                    Number Tag (e.g. 001)
                  </label>
                  <input
                    type="text"
                    value={service.number || ""}
                    onChange={(e) => handleServiceChange(i, "number", e.target.value)}
                    className="w-full bg-[#16171d] text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 outline-none font-mono"
                  />
                </div>

                <div className="sm:col-span-3 space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-300">
                    Service Title
                  </label>
                  <input
                    type="text"
                    value={service.title || ""}
                    onChange={(e) => handleServiceChange(i, "title", e.target.value)}
                    className="w-full bg-[#16171d] text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 outline-none font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300">
                  Service Description
                </label>
                <textarea
                  rows={2}
                  value={service.description || ""}
                  onChange={(e) =>
                    handleServiceChange(i, "description", e.target.value)
                  }
                  className="w-full bg-[#16171d] text-white text-sm rounded-xl p-3 border border-white/10 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-300">
                  Category Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={service.tags?.join(", ") || ""}
                  onChange={(e) => handleTagsChange(i, e.target.value)}
                  placeholder="Web & App UI, iOS & Android, Microinteractions..."
                  className="w-full bg-[#16171d] text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Toast
        message={toast?.message}
        type={toast?.type}
        onClose={() => setToast(null)}
      />
    </div>
  );
}
