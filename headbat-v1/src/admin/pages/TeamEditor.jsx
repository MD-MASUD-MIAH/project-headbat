import { useState, useEffect } from "react";
import { Save, RotateCcw, Plus, Trash2 } from "lucide-react";
import { useContent } from "../../context/ContentContext";
import api from "../../services/api";
import MediaUploader from "../components/MediaUploader";
import Toast from "../components/Toast";

export default function TeamEditor() {
  const { content, reloadContent } = useContent();
  const [formData, setFormData] = useState({
    headingPrefix: "Our team, ",
    headingHighlight: "your vision",
    joinMissionTitle: "Join our mission",
    joinMissionDescription:
      "If you're ready to create and collaborate, we'd love to hear from you.",
    applyButtonText: "Apply now",
    applyButtonHref: "#contact",
    teamworkPitchHighlight:
      "We thrive on teamwork, turning individual strengths into shared success.",
    teamworkPitchText:
      " Together, we turn ideas into digital products that solve real problems for real people.",
    members: [],
  });

  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (content?.team) {
      setFormData((prev) => ({
        ...prev,
        ...content.team,
        members: content.team.members || prev.members,
      }));
    }
  }, [content]);

  const handleMemberChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.members];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, members: updated };
    });
  };

  const handleAddMember = () => {
    setFormData((prev) => ({
      ...prev,
      members: [
        ...prev.members,
        {
          name: "New Member",
          role: "Creative Specialist",
          image:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
        },
      ],
    }));
  };

  const handleRemoveMember = (index) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await api.updateSectionContent("team", formData);
      if (res.success) {
        setToast({
          type: "success",
          message: "Team section updated successfully! Website updated in real-time.",
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
    if (!window.confirm("Reset Team section to defaults?")) return;
    try {
      const res = await api.resetSectionContent("team");
      if (res.success) {
        setToast({ type: "success", message: "Reset to default team." });
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
            Team & Culture Editor
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Manage team member profiles, photos, titles, and recruitment mission copy.
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
        {/* Headings & Mission */}
        <div className="bg-[#141416] border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-semibold text-white">Section Headings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Heading Highlighted Text (Gradient)
              </label>
              <input
                type="text"
                value={formData.headingHighlight}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    headingHighlight: e.target.value,
                  }))
                }
                className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-orange-500/50 focus:outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* Join Mission Card Settings */}
        <div className="bg-[#141416] border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-semibold text-white">
            "Join our mission" Recruitment Card
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Card Title
              </label>
              <input
                type="text"
                value={formData.joinMissionTitle}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    joinMissionTitle: e.target.value,
                  }))
                }
                className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-orange-500/50 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                Button Text
              </label>
              <input
                type="text"
                value={formData.applyButtonText}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    applyButtonText: e.target.value,
                  }))
                }
                className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-orange-500/50 focus:outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              Mission Description
            </label>
            <textarea
              rows={2}
              value={formData.joinMissionDescription}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  joinMissionDescription: e.target.value,
                }))
              }
              className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-orange-500/50 focus:outline-none transition resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              Teamwork Pitch Highlight
            </label>
            <input
              type="text"
              value={formData.teamworkPitchHighlight}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  teamworkPitchHighlight: e.target.value,
                }))
              }
              className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-orange-500/50 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              Teamwork Pitch Text (Continuation)
            </label>
            <textarea
              rows={2}
              value={formData.teamworkPitchText}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  teamworkPitchText: e.target.value,
                }))
              }
              className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-orange-500/50 focus:outline-none transition resize-none"
            />
          </div>
        </div>

        {/* Team Members */}
        <div className="bg-[#141416] border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">
                Team Members ({formData.members.length})
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Manage member portraits and job titles displayed in the carousel.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddMember}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 text-xs font-medium border border-orange-500/20 transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Member
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.members.map((member, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-black/30 border border-white/10 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-500">
                    Member #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(idx)}
                    className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) =>
                        handleMemberChange(idx, "name", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white text-xs focus:border-orange-500/50 focus:outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Role / Position
                    </label>
                    <input
                      type="text"
                      value={member.role}
                      onChange={(e) =>
                        handleMemberChange(idx, "role", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white text-xs focus:border-orange-500/50 focus:outline-none transition"
                    />
                  </div>
                </div>

                <MediaUploader
                  label="Portrait Photo"
                  accept="image"
                  value={member.image}
                  onChange={(val) => handleMemberChange(idx, "image", val)}
                  helperText="Upload a high-resolution photo of the team member."
                />
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
