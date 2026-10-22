import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  Sparkles,
  Briefcase,
  Users,
  MessageSquare,
  Award,
  Layers,
  ArrowRight,
  Database,
  ExternalLink,
  Plus,
  Clock,
  CheckCircle2,
  Globe,
} from "lucide-react";
import { useContent } from "../../context/ContentContext";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

export default function DashboardOverview() {
  const { content, projects } = useContent();
  const { admin } = useAuth();
  const [messages, setMessages] = useState([]);
  const [dbHealth, setDbHealth] = useState({ connected: true, status: "Checking..." });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [msgRes, healthRes] = await Promise.allSettled([
          api.getMessages(),
          api.checkHealth(),
        ]);

        if (msgRes.status === "fulfilled" && msgRes.value?.data) {
          setMessages(msgRes.value.data);
        }

        if (healthRes.status === "fulfilled" && healthRes.value?.database) {
          setDbHealth(healthRes.value.database);
        }
      } catch (err) {
        console.warn("Failed to load dashboard overview data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const unreadMessagesCount = messages.filter((m) => m.status === "unread").length;

  const quickSections = [
    { title: "SEO & Brand Identity", desc: "Meta title, description, favicon & logos", path: "/admin/seo", icon: Globe },
    { title: "Hero Section", desc: "Tagline, brand title, stats & video", path: "/admin/hero", icon: Sparkles },
    { title: "Featured Projects", desc: `${projects.length} Case studies & portfolio works`, path: "/admin/projects", icon: Briefcase },
    { title: "Services", desc: "4 Core offerings & category tags", path: "/admin/services", icon: Layers },
    { title: "Testimonials", desc: "Client quotes, Clutch badge & rating", path: "/admin/testimonials", icon: MessageSquare },
    { title: "Why Choose Us", desc: "Pitch statement & achievement cards", path: "/admin/why-choose-us", icon: Award },
    { title: "Team Section", desc: "Team members list & mission copy", path: "/admin/team", icon: Users },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#15171d] via-[#121317] to-[#101114] border border-white/10 rounded-3xl p-6 sm:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>MongoDB Dynamic CMS Online</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Welcome back, {admin?.name || "Administrator"}!
            </h1>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-xl">
              All website copy, case studies, images, and video assets can be updated here without touching source code.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/admin/projects"
              className="inline-flex items-center gap-2 bg-white text-black font-semibold text-xs px-4 py-2.5 rounded-xl hover:bg-neutral-200 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add Project
            </Link>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-xs px-4 py-2.5 rounded-xl transition-colors"
            >
              <ExternalLink className="w-4 h-4" /> View Site
            </a>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Projects */}
        <div className="bg-[#111216] p-6 rounded-2xl border border-white/10 flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Active Projects
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">{projects.length}</div>
            <p className="text-[11px] text-neutral-500 mt-1">Full case studies loaded</p>
          </div>
        </div>

        {/* Card 2: Contact Inquiries */}
        <div className="bg-[#111216] p-6 rounded-2xl border border-white/10 flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Inquiries Inbox
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white flex items-baseline gap-2">
              {messages.length}
              {unreadMessagesCount > 0 && (
                <span className="text-xs font-normal text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  {unreadMessagesCount} new
                </span>
              )}
            </div>
            <p className="text-[11px] text-neutral-500 mt-1">Contact form leads submitted</p>
          </div>
        </div>

        {/* Card 3: Site Sections */}
        <div className="bg-[#111216] p-6 rounded-2xl border border-white/10 flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Managed Sections
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">12</div>
            <p className="text-[11px] text-neutral-500 mt-1">Hero, Clients, FAQ, Footer, etc.</p>
          </div>
        </div>

        {/* Card 4: Database Status */}
        <div className="bg-[#111216] p-6 rounded-2xl border border-white/10 flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Database Sync
            </span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Connected
            </div>
            <p className="text-[11px] text-neutral-500 mt-1 truncate">
              {dbHealth.host ? `${dbHealth.host}` : "MongoDB Atlas / Local"}
            </p>
          </div>
        </div>
      </div>

      {/* Content Sections Quick Management */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white tracking-tight">Website Sections</h2>
          <span className="text-xs text-neutral-500">Click any card to edit its content</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickSections.map((sec) => {
            const Icon = sec.icon;
            return (
              <Link
                key={sec.path}
                to={sec.path}
                className="group p-5 rounded-2xl bg-[#111216] border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between min-h-[140px] hover:-translate-y-0.5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                    <Icon className="w-4 h-4" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-neutral-100">
                    {sec.title}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">{sec.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Contact Inquiries */}
      <div className="bg-[#111216] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Recent Inquiries</h2>
            <p className="text-xs text-neutral-500">Leads and messages sent from the Contact form</p>
          </div>
          <Link
            to="/admin/messages"
            className="text-xs text-neutral-300 hover:text-white flex items-center gap-1"
          >
            <span>View All ({messages.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {messages.length === 0 ? (
          <div className="py-8 text-center text-xs text-neutral-500 font-mono">
            No inquiries received yet. Submissions from the public website contact form will appear here.
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {messages.slice(0, 4).map((msg) => (
              <div
                key={msg._id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{msg.name}</span>
                    <span className="text-neutral-500 font-mono">({msg.email})</span>
                    {msg.status === "unread" && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 font-medium border border-emerald-500/20">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-neutral-400 text-xs line-clamp-1">{msg.message}</p>
                </div>
                <div className="text-neutral-500 text-[11px] font-mono shrink-0">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
