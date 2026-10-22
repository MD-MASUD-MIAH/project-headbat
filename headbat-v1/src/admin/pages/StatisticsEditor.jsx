import { useState, useEffect } from "react";
import { Save, RotateCcw, BarChart3, Plus, Trash2, Info } from "lucide-react";
import { useContent } from "../../context/ContentContext";
import api from "../../services/api";
import Toast from "../components/Toast";

export default function StatisticsEditor() {
  const { content, reloadContent } = useContent();
  const [formData, setFormData] = useState({
    items: [
      { value: 500, suffix: "+", label: "Clients worldwide" },
      { value: 45, suffix: "+", label: "Successful projects per year" },
      { value: 60, suffix: "%", label: "Clients who came to us by referrals" },
      { value: 42, suffix: "", label: "Clutch Awards" },
    ],
  });

  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (content?.statistics?.items) {
      setFormData({
        items: content.statistics.items,
      });
    }
  }, [content]);

  const handleItemChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.items];
      updated[index] = {
        ...updated[index],
        [field]: field === "value" ? Number(value) || 0 : value,
      };
      return { ...prev, items: updated };
    });
  };

  const handleAddItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { value: 100, suffix: "+", label: "New Impact Metric" },
      ],
    }));
  };

  const handleRemoveItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await api.updateSectionContent("statistics", formData);
      if (res.success) {
        setToast({
          type: "success",
          message: "Statistics updated successfully! Live website counter updated.",
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
    if (!window.confirm("Reset Statistics to defaults?")) return;
    try {
      const res = await api.resetSectionContent("statistics");
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
            Statistics & Metrics Editor
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Manage the animated counter cards displayed on the homepage.
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
        <div className="bg-[#141416] border border-white/10 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-orange-400" />
                Animated Stat Cards ({formData.items.length})
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                The number values animate on viewport scroll on the frontend.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddItem}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 text-xs font-medium border border-orange-500/20 transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Stat Card
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.items.map((stat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-black/30 border border-white/10 space-y-4 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-500">
                    Stat Card #{idx + 1}
                  </span>
                  {formData.items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(idx)}
                      className="text-neutral-500 hover:text-red-400 transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Counter Value (Number)
                    </label>
                    <input
                      type="number"
                      value={stat.value}
                      onChange={(e) =>
                        handleItemChange(idx, "value", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white font-mono text-base focus:border-orange-500/50 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Suffix (e.g. +, %, M)
                    </label>
                    <input
                      type="text"
                      value={stat.suffix || ""}
                      onChange={(e) =>
                        handleItemChange(idx, "suffix", e.target.value)
                      }
                      placeholder="e.g. +"
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white font-mono text-base focus:border-orange-500/50 focus:outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Metric Label / Description
                  </label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) =>
                      handleItemChange(idx, "label", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white text-xs focus:border-orange-500/50 focus:outline-none transition"
                  />
                </div>

                {/* Preview Mini badge */}
                <div className="pt-2 border-t border-white/5 flex items-baseline gap-2">
                  <span className="text-xl font-bold text-white tracking-tight">
                    {stat.value}
                    <span className="text-orange-400">{stat.suffix}</span>
                  </span>
                  <span className="text-xs text-neutral-400 truncate">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/5 flex items-start gap-3">
          <Info className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
          <p className="text-xs text-neutral-400 leading-relaxed">
            The counter animation on the homepage automatically uses the updated target value when visitors scroll into view.
          </p>
        </div>
      </form>
    </div>
  );
}
