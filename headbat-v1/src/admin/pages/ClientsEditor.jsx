import { useState, useEffect } from "react";
import { Save, Plus, Trash2, RotateCcw, Award } from "lucide-react";
import { useContent } from "../../context/ContentContext";
import api from "../../services/api";
import MediaUploader from "../components/MediaUploader";
import Toast from "../components/Toast";

export default function ClientsEditor() {
  const { content, reloadContent } = useContent();
  const [formData, setFormData] = useState({
    title: "Our clients",
    items: [],
  });

  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (content?.clients) {
      setFormData({
        title: content.clients.title || "Our clients",
        items: content.clients.items || [],
      });
    }
  }, [content]);

  const handleClientChange = (index, field, value) => {
    const updated = [...formData.items];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, items: updated }));
  };

  const addClient = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          name: "New Client",
          logoText: "Brand",
          logoUrl: "",
        },
      ],
    }));
  };

  const removeClient = (index) => {
    const updated = formData.items.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, items: updated }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await api.updateSectionContent("clients", formData);
      await reloadContent();
      setToast({ type: "success", message: "Clients section updated successfully!" });
    } catch (err) {
      setToast({ type: "error", message: err.message || "Failed to save clients" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm("Reset clients section to default logos?")) return;
    try {
      setIsSaving(true);
      await api.resetSectionContent("clients");
      await reloadContent();
      setToast({ type: "success", message: "Clients section reset to defaults" });
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
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-400" /> Clients Logos Editor
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Manage the client brand logos and heading on the home page.
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

      <div className="bg-[#111216] p-6 rounded-2xl border border-white/10 space-y-4">
        <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
          Section Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
          className="w-full bg-[#16171d] text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 outline-none focus:border-white/40"
        />
      </div>

      {/* Clients Cards List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
            Client Brands ({formData.items.length})
          </h2>
          <button
            type="button"
            onClick={addClient}
            className="inline-flex items-center gap-1.5 text-xs text-black font-semibold bg-white hover:bg-neutral-200 px-4 py-2 rounded-xl transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" /> Add Client Logo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {formData.items.map((client, i) => (
            <div
              key={i}
              className="bg-[#111216] p-4 rounded-2xl border border-white/10 flex flex-col justify-between gap-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-500">#{i + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeClient(i)}
                    className="p-1 text-neutral-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-neutral-400">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={client.name || ""}
                    onChange={(e) => handleClientChange(i, "name", e.target.value)}
                    className="w-full bg-[#16171d] text-white text-xs rounded-lg px-3 py-2 border border-white/10 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-neutral-400">
                    Logo Image URL (Optional)
                  </label>
                  <input
                    type="text"
                    value={client.logoUrl || client.image || ""}
                    onChange={(e) => handleClientChange(i, "logoUrl", e.target.value)}
                    placeholder="https://... or upload"
                    className="w-full bg-[#16171d] text-white text-xs rounded-lg px-3 py-2 border border-white/10 outline-none font-mono"
                  />
                </div>
              </div>

              {client.logoUrl && (
                <div className="h-14 bg-white/5 rounded-xl p-2 flex items-center justify-center border border-white/5">
                  <img
                    src={client.logoUrl}
                    alt={client.name}
                    className="max-h-10 object-contain"
                  />
                </div>
              )}
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
