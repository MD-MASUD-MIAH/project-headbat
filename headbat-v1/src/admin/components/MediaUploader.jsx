import { useState, useRef } from "react";
import { Upload, Link as LinkIcon, Check, Loader2, Image as ImageIcon } from "lucide-react";
import api from "../../services/api";

export default function MediaUploader({
  label = "Upload File or Enter URL",
  value = "",
  onChange,
  accept = "image/*,video/*",
  helper = "Supports PNG, JPG, WebP, SVG, AVIF, or MP4",
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState("url"); // 'url' | 'upload'
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setError(null);
      const res = await api.uploadFile(file);
      if (res?.success && res.url) {
        onChange(res.url);
      } else {
        throw new Error(res?.message || "Upload failed");
      }
    } catch (err) {
      setError(err.message || "Failed to upload file");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const isVideo =
    value?.toLowerCase().endsWith(".mp4") ||
    value?.toLowerCase().endsWith(".webm") ||
    value?.includes("video");

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
          {label}
        </label>
        <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded-lg border border-white/10 text-xs">
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-2.5 py-1 rounded-md transition-all ${
              mode === "url"
                ? "bg-white text-black font-medium shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <LinkIcon className="w-3 h-3" /> URL
            </span>
          </button>
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`px-2.5 py-1 rounded-md transition-all ${
              mode === "upload"
                ? "bg-white text-black font-medium shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Upload className="w-3 h-3" /> Upload
            </span>
          </button>
        </div>
      </div>

      {mode === "url" ? (
        <div className="relative">
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://... or /uploads/..."
            className="w-full bg-[#121316] text-white text-sm rounded-xl px-4 py-2.5 border border-white/10 outline-none focus:border-white/40 focus:ring-1 focus:ring-white/30 transition-all font-mono"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
            id={`file-input-${label.replace(/[^a-zA-Z0-9]/g, "")}`}
          />
          <label
            htmlFor={`file-input-${label.replace(/[^a-zA-Z0-9]/g, "")}`}
            className="cursor-pointer flex items-center justify-center gap-2 w-full bg-[#121316] hover:bg-[#1a1c22] text-neutral-200 text-sm rounded-xl px-4 py-3 border border-dashed border-white/20 hover:border-white/50 transition-all text-center"
          >
            {isUploading ? (
              <span className="flex items-center gap-2 text-white font-medium">
                <Loader2 className="w-4 h-4 animate-spin text-white" /> Uploading to server...
              </span>
            ) : (
              <span className="flex items-center gap-2 text-neutral-300">
                <Upload className="w-4 h-4" /> Click to choose a file from your computer
              </span>
            )}
          </label>
        </div>
      )}

      {error && <p className="text-xs text-rose-400">{error}</p>}

      {/* Media Preview Box */}
      {value && (
        <div className="flex items-center gap-3 p-2 bg-[#121316] rounded-xl border border-white/5 mt-1">
          <div className="w-12 h-12 rounded-lg bg-black/50 overflow-hidden flex items-center justify-center shrink-0 border border-white/10">
            {isVideo ? (
              <video src={value} className="w-full h-full object-cover" muted />
            ) : (
              <img
                src={value}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-neutral-300 truncate font-mono">{value}</p>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
              <Check className="w-3 h-3" /> Selected media active
            </span>
          </div>
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs text-neutral-500 hover:text-rose-400 px-2 py-1 transition-colors"
          >
            Clear
          </button>
        </div>
      )}

      {helper && <p className="text-[11px] text-neutral-500">{helper}</p>}
    </div>
  );
}
