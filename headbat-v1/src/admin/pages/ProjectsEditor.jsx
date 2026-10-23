import { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Search,
  Save,
  X,
  Sparkles,
  Layers,
  ArrowUpRight,
  Eye,
} from "lucide-react";
import { useContent } from "../../context/ContentContext";
import api from "../../services/api";
import MediaUploader from "../components/MediaUploader";
import Toast from "../components/Toast";

const emptyProject = {
  title: "",
  slug: "",
  year: "2026",
  category: "Web & Product Design",
  client: "",
  location: "",
  role: "",
  duration: "",
  liveUrl: "",
  tagline: "",
  imageDefault: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80",
  imageHover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80",
  overview: "",
  challenge: "",
  solution: "",
  metrics: [
    { value: "100%", label: "Satisfaction" },
    { value: "2x", label: "Conversion Rate" },
  ],
  keyFeatures: [
    { title: "Smart Architecture", description: "Engineered for speed and responsiveness.", tag: "Core" },
  ],
  techStack: ["React 19", "Tailwind CSS"],
  testimonial: { quote: "", author: "", role: "", company: "" },
  gallery: [],
};

export default function ProjectsEditor() {
  const { projects, reloadContent } = useContent();
  const [search, setSearch] = useState("");
  const [editingProject, setEditingProject] = useState(null); // null or project object
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState("general"); // 'general' | 'media' | 'casestudy' | 'metrics' | 'testimonial'

  const filteredProjects = projects.filter(
    (p) =>
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase()) ||
      p.client?.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenCreate = () => {
    setEditingProject({ ...emptyProject });
    setActiveTab("general");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setEditingProject({
      ...project,
      metrics: project.metrics || [],
      keyFeatures: project.keyFeatures || [],
      techStack: project.techStack || [],
      testimonial: project.testimonial || { quote: "", author: "", role: "", company: "" },
      gallery: project.gallery || [],
    });
    setActiveTab("general");
    setIsModalOpen(true);
  };

  const handleDelete = async (project) => {
    if (!window.confirm(`Are you sure you want to delete "${project.title}"?`)) return;
    try {
      await api.deleteProject(project._id || project.slug || project.id);
      await reloadContent();
      setToast({ type: "success", message: `Project "${project.title}" deleted.` });
    } catch (err) {
      setToast({ type: "error", message: err.message || "Failed to delete project" });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingProject.title || !editingProject.imageDefault) {
      alert("Title and default image are required.");
      return;
    }

    try {
      setIsSaving(true);
      if (editingProject._id) {
        await api.updateProject(editingProject._id, editingProject);
        setToast({ type: "success", message: "Project updated in MongoDB!" });
      } else {
        await api.createProject(editingProject);
        setToast({ type: "success", message: "New project created in MongoDB!" });
      }
      await reloadContent();
      setIsModalOpen(false);
    } catch (err) {
      setToast({ type: "error", message: err.message || "Failed to save project" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Featured Projects & Case Studies
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Create, edit, or remove featured portfolio items and detailed case study pages.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors shadow-lg"
        >
          <Plus className="w-4 h-4" /> Add New Project
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex items-center gap-3 bg-[#111216] p-2.5 rounded-2xl border border-white/10">
        <Search className="w-4 h-4 text-neutral-500 ml-2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects by title, category, or client..."
          className="bg-transparent text-sm text-white placeholder:text-neutral-500 outline-none flex-1"
        />
        <span className="text-xs text-neutral-500 mr-2 font-mono">
          Showing {filteredProjects.length} of {projects.length}
        </span>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((p) => (
          <div
            key={p._id || p.slug || p.id}
            className="group bg-[#111216] rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-white/30 transition-all shadow-sm"
          >
            {/* Project Thumbnail Image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
              <img
                src={p.imageDefault}
                alt={p.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/10">
                  {p.category}
                </span>
              </div>
              <div className="absolute top-3 right-3 text-xs font-mono text-white/80 bg-black/60 px-2 py-0.5 rounded">
                {p.year}
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-semibold text-base text-white group-hover:text-indigo-300 transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-neutral-400 line-clamp-2">
                  {p.tagline || p.overview || "No tagline configured."}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <a
                  href={p.link || `/cases/${p.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" /> View Case
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(p)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-200 transition-colors"
                    title="Edit project"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(p)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400 transition-colors"
                    title="Delete project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {isModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121318] border border-white/15 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-fade-in">
            {/* Modal Top Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">
                  {editingProject._id ? `Edit: ${editingProject.title}` : "Create New Project"}
                </h2>
                <p className="text-xs text-neutral-400">
                  Fill in project details and case study metrics.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex items-center gap-2 px-6 pt-3 border-b border-white/10 text-xs overflow-x-auto">
              {[
                { id: "general", label: "General & Links" },
                { id: "media", label: "Visual Media" },
                { id: "casestudy", label: "Case Study Story" },
                { id: "metrics", label: "Features & Metrics" },
                { id: "testimonial", label: "Client Testimonial" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 px-3 font-medium transition-colors border-b-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-white text-white font-semibold"
                      : "border-transparent text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* TAB 1: General Info */}
              {activeTab === "general" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-300">
                        Project Title*
                      </label>
                      <input
                        type="text"
                        required
                        value={editingProject.title}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, title: e.target.value })
                        }
                        className="w-full bg-[#181920] text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-300">
                        URL Slug (e.g. passion-finder)
                      </label>
                      <input
                        type="text"
                        value={editingProject.slug}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, slug: e.target.value })
                        }
                        placeholder="auto-generated from title"
                        className="w-full bg-[#181920] text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-300">Year</label>
                      <input
                        type="text"
                        value={editingProject.year}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, year: e.target.value })
                        }
                        className="w-full bg-[#181920] text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-300">
                        Category Tag
                      </label>
                      <input
                        type="text"
                        value={editingProject.category}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, category: e.target.value })
                        }
                        className="w-full bg-[#181920] text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-300">Client</label>
                      <input
                        type="text"
                        value={editingProject.client}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, client: e.target.value })
                        }
                        className="w-full bg-[#181920] text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-300">
                        Location
                      </label>
                      <input
                        type="text"
                        value={editingProject.location}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, location: e.target.value })
                        }
                        className="w-full bg-[#181920] text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-300">Duration</label>
                      <input
                        type="text"
                        value={editingProject.duration}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, duration: e.target.value })
                        }
                        className="w-full bg-[#181920] text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-300">
                        Live Website URL
                      </label>
                      <input
                        type="text"
                        value={editingProject.liveUrl}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, liveUrl: e.target.value })
                        }
                        placeholder="https://..."
                        className="w-full bg-[#181920] text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-300">
                      Tagline / Summary
                    </label>
                    <textarea
                      rows={2}
                      value={editingProject.tagline}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, tagline: e.target.value })
                      }
                      className="w-full bg-[#181920] text-white text-sm rounded-xl p-3 border border-white/10 outline-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: Visual Media */}
              {activeTab === "media" && (
                <div className="space-y-6">
                  <MediaUploader
                    label="Primary Cover Image (Default)*"
                    value={editingProject.imageDefault}
                    onChange={(url) =>
                      setEditingProject({ ...editingProject, imageDefault: url })
                    }
                    helper="Displayed on the home page and as case study cover"
                  />

                  <MediaUploader
                    label="Hover Portal Reveal Image"
                    value={editingProject.imageHover}
                    onChange={(url) =>
                      setEditingProject({ ...editingProject, imageHover: url })
                    }
                    helper="Revealed via circular portal animation on desktop hover"
                  />
                </div>
              )}

              {/* TAB 3: Case Study Narrative */}
              {activeTab === "casestudy" && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-300">
                      Project Overview
                    </label>
                    <textarea
                      rows={3}
                      value={editingProject.overview}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, overview: e.target.value })
                      }
                      className="w-full bg-[#181920] text-white text-sm rounded-xl p-3 border border-white/10 outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-300">
                      The Challenge
                    </label>
                    <textarea
                      rows={3}
                      value={editingProject.challenge}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, challenge: e.target.value })
                      }
                      className="w-full bg-[#181920] text-white text-sm rounded-xl p-3 border border-white/10 outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-300">
                      Our Solution & Execution
                    </label>
                    <textarea
                      rows={3}
                      value={editingProject.solution}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, solution: e.target.value })
                      }
                      className="w-full bg-[#181920] text-white text-sm rounded-xl p-3 border border-white/10 outline-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB 4: Metrics & Features */}
              {activeTab === "metrics" && (
                <div className="space-y-6">
                  {/* Key Metrics */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
                        Impact Metrics
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setEditingProject({
                            ...editingProject,
                            metrics: [
                              ...editingProject.metrics,
                              { value: "400%", label: "Growth" },
                            ],
                          })
                        }
                        className="text-xs text-neutral-300 hover:text-white"
                      >
                        + Add Metric
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {editingProject.metrics.map((m, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 bg-[#181920] p-2 rounded-xl border border-white/10"
                        >
                          <input
                            type="text"
                            value={m.value}
                            onChange={(e) => {
                              const updated = [...editingProject.metrics];
                              updated[i].value = e.target.value;
                              setEditingProject({ ...editingProject, metrics: updated });
                            }}
                            placeholder="Value (e.g. 89%)"
                            className="w-1/3 bg-transparent text-white text-xs px-2 py-1 outline-none font-bold"
                          />
                          <input
                            type="text"
                            value={m.label}
                            onChange={(e) => {
                              const updated = [...editingProject.metrics];
                              updated[i].label = e.target.value;
                              setEditingProject({ ...editingProject, metrics: updated });
                            }}
                            placeholder="Metric Label"
                            className="flex-1 bg-transparent text-white text-xs px-2 py-1 outline-none text-neutral-400"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = editingProject.metrics.filter((_, idx) => idx !== i);
                              setEditingProject({ ...editingProject, metrics: updated });
                            }}
                            className="text-neutral-500 hover:text-rose-400 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
                      Tech Stack (comma separated)
                    </label>
                    <input
                      type="text"
                      value={editingProject.techStack?.join(", ") || ""}
                      onChange={(e) => {
                        const tags = e.target.value.split(",").map((t) => t.trim()).filter(Boolean);
                        setEditingProject({ ...editingProject, techStack: tags });
                      }}
                      placeholder="React 19, TypeScript, Tailwind CSS, WebGL..."
                      className="w-full bg-[#181920] text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 outline-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB 5: Client Testimonial */}
              {activeTab === "testimonial" && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-300">
                      Client Quote
                    </label>
                    <textarea
                      rows={3}
                      value={editingProject.testimonial?.quote || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          testimonial: { ...editingProject.testimonial, quote: e.target.value },
                        })
                      }
                      className="w-full bg-[#181920] text-white text-sm rounded-xl p-3 border border-white/10 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-300">
                        Author Name
                      </label>
                      <input
                        type="text"
                        value={editingProject.testimonial?.author || ""}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            testimonial: { ...editingProject.testimonial, author: e.target.value },
                          })
                        }
                        className="w-full bg-[#181920] text-white text-sm rounded-xl px-4 py-2 border border-white/10 outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-300">Role</label>
                      <input
                        type="text"
                        value={editingProject.testimonial?.role || ""}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            testimonial: { ...editingProject.testimonial, role: e.target.value },
                          })
                        }
                        className="w-full bg-[#181920] text-white text-sm rounded-xl px-4 py-2 border border-white/10 outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-neutral-300">Company</label>
                      <input
                        type="text"
                        value={editingProject.testimonial?.company || ""}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            testimonial: { ...editingProject.testimonial, company: e.target.value },
                          })
                        }
                        className="w-full bg-[#181920] text-white text-sm rounded-xl px-4 py-2 border border-white/10 outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </form>

            {/* Modal Bottom Action Bar */}
            <div className="p-6 border-t border-white/10 flex items-center justify-end gap-3 bg-[#0e0f13]">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-neutral-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors shadow-lg disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isSaving ? "Saving to Database..." : "Save Project"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Toast
        message={toast?.message}
        type={toast?.type}
        onClose={() => setToast(null)}
      />
    </div>
  );
}
