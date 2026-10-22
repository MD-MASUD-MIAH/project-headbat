import { useState, useEffect } from "react";
import {
  Inbox,
  Mail,
  Clock,
  Trash2,
  CheckCircle,
  Eye,
  Search,
  Filter,
  DollarSign,
  Tag,
  RefreshCw,
  X,
} from "lucide-react";
import api from "../../services/api";
import Toast from "../components/Toast";

export default function MessagesManager() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState(null);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const res = await api.getMessages();
      if (res.success) {
        setMessages(res.data);
      }
    } catch (err) {
      setToast({ type: "error", message: "Failed to load inquiries: " + err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await api.updateMessageStatus(id, status);
      if (res.success) {
        setMessages((prev) =>
          prev.map((msg) => (msg._id === id ? { ...msg, status } : msg))
        );
        if (selectedMessage && selectedMessage._id === id) {
          setSelectedMessage((prev) => ({ ...prev, status }));
        }
        setToast({ type: "success", message: `Marked as ${status}.` });
      }
    } catch (err) {
      setToast({ type: "error", message: err.message });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Permanently delete this inquiry?")) return;
    try {
      const res = await api.deleteMessage(id);
      if (res.success) {
        setMessages((prev) => prev.filter((m) => m._id !== id));
        if (selectedMessage && selectedMessage._id === id) {
          setSelectedMessage(null);
        }
        setToast({ type: "success", message: "Message deleted." });
      }
    } catch (err) {
      setToast({ type: "error", message: err.message });
    }
  };

  const filteredMessages = messages.filter((msg) => {
    const matchesStatus =
      filterStatus === "all" ? true : msg.status === filterStatus;
    const matchesSearch =
      (msg.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (msg.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (msg.message || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const unreadCount = messages.filter((m) => m.status === "unread").length;

  return (
    <div className="space-y-6">
      {toast && <Toast toast={toast} onClose={() => setToast(null)} />}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Inbox className="w-6 h-6 text-orange-400" />
            Client Inquiries & Leads
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Review incoming project inquiries submitted via the website contact form.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadMessages}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 text-xs font-semibold transition cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, or message keyword..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#141416] border border-white/10 rounded-xl text-white text-xs placeholder:text-neutral-500 focus:border-orange-500/50 focus:outline-none transition"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setFilterStatus("all")}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
              filterStatus === "all"
                ? "bg-orange-500 text-white"
                : "bg-white/5 text-neutral-400 hover:text-white border border-white/10"
            }`}
          >
            All ({messages.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus("unread")}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              filterStatus === "unread"
                ? "bg-amber-500 text-white"
                : "bg-white/5 text-neutral-400 hover:text-white border border-white/10"
            }`}
          >
            Unread
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-red-500 text-white">
                {unreadCount}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus("read")}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
              filterStatus === "read"
                ? "bg-emerald-500 text-white"
                : "bg-white/5 text-neutral-400 hover:text-white border border-white/10"
            }`}
          >
            Read
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus("archived")}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
              filterStatus === "archived"
                ? "bg-neutral-600 text-white"
                : "bg-white/5 text-neutral-400 hover:text-white border border-white/10"
            }`}
          >
            Archived
          </button>
        </div>
      </div>

      {/* Main Grid: List + Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Messages List Column */}
        <div
          className={`space-y-3 ${
            selectedMessage ? "lg:col-span-7" : "lg:col-span-12"
          }`}
        >
          {loading && messages.length === 0 ? (
            <div className="text-center py-16 text-neutral-500 text-sm">
              Loading inquiries...
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[#141416] border border-white/10">
              <Inbox className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
              <h3 className="text-white font-semibold text-sm">No inquiries found</h3>
              <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                {searchQuery || filterStatus !== "all"
                  ? "No messages match your search or filter."
                  : "When prospective clients submit the contact form on your website, their messages will appear here."}
              </p>
            </div>
          ) : (
            filteredMessages.map((msg) => {
              const isSelected = selectedMessage?._id === msg._id;
              const isUnread = msg.status === "unread";

              return (
                <div
                  key={msg._id}
                  onClick={() => {
                    setSelectedMessage(msg);
                    if (isUnread) handleUpdateStatus(msg._id, "read");
                  }}
                  className={`p-4 rounded-xl border transition cursor-pointer ${
                    isSelected
                      ? "bg-orange-500/10 border-orange-500/40"
                      : isUnread
                      ? "bg-[#16161a] border-amber-500/30 hover:border-amber-500/50"
                      : "bg-[#141416] border-white/5 hover:border-white/15"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      {isUnread && (
                        <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0"></span>
                      )}
                      <h4
                        className={`text-sm ${
                          isUnread ? "font-bold text-white" : "font-medium text-neutral-200"
                        }`}
                      >
                        {msg.name}
                      </h4>
                      <span className="text-xs text-neutral-400">· {msg.email}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-neutral-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {msg.message}
                  </p>

                  <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-white/5 text-[11px]">
                    {msg.budget && (
                      <span className="px-2 py-0.5 rounded-md bg-white/5 text-neutral-300 font-mono">
                        Budget: {msg.budget}
                      </span>
                    )}
                    {msg.services && msg.services.length > 0 && (
                      <span className="px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-400 truncate max-w-xs">
                        {Array.isArray(msg.services)
                          ? msg.services.join(", ")
                          : msg.services}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Message Preview Column */}
        {selectedMessage && (
          <div className="lg:col-span-5 sticky top-24 bg-[#141416] border border-white/10 rounded-2xl p-6 space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-lg font-bold text-white">
                  {selectedMessage.name}
                </h3>
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="text-xs text-orange-400 hover:underline flex items-center gap-1.5 mt-1"
                >
                  <Mail className="w-3.5 h-3.5" />
                  {selectedMessage.email}
                </a>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="inline-flex items-center gap-1 text-neutral-500 hover:text-white text-xs cursor-pointer"
              >
                <X className="w-3.5 h-3.5" /> Close
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-1">
                  Received At
                </span>
                <p className="text-xs text-neutral-300 font-mono">
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </p>
              </div>

              {selectedMessage.budget && (
                <div>
                  <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-1">
                    Project Budget
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg w-fit">
                    <DollarSign className="w-3.5 h-3.5" />
                    {selectedMessage.budget}
                  </div>
                </div>
              )}

              {selectedMessage.services && (
                <div>
                  <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-1">
                    Requested Services / Scope
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-lg w-fit">
                    <Tag className="w-3.5 h-3.5" />
                    {Array.isArray(selectedMessage.services)
                      ? selectedMessage.services.join(", ")
                      : selectedMessage.services}
                  </div>
                </div>
              )}

              <div>
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-1.5">
                  Project Message
                </span>
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-neutral-200 text-xs leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <a
                href={`mailto:${selectedMessage.email}?subject=Regarding%20your%20HeadBat%20Inquiry`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold transition"
              >
                <Mail className="w-3.5 h-3.5" />
                Reply via Email
              </a>

              <div className="flex items-center gap-2">
                {selectedMessage.status !== "unread" && (
                  <button
                    type="button"
                    onClick={() =>
                      handleUpdateStatus(selectedMessage._id, "unread")
                    }
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white text-xs transition cursor-pointer"
                    title="Mark Unread"
                  >
                    Mark Unread
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleDelete(selectedMessage._id)}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition cursor-pointer"
                  title="Delete Inquiry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
