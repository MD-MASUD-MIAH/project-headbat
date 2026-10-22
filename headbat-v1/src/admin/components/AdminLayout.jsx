import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate, useLocation } from "react-router";
import {
  LayoutDashboard,
  Sparkles,
  Users,
  Briefcase,
  HelpCircle,
  MessageSquare,
  Award,
  Layers,
  PhoneCall,
  Settings,
  LogOut,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Database,
  Sliders,
  CheckCircle,
  Globe,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const navItems = [
    { name: "Overview", path: "/admin", icon: LayoutDashboard, exact: true },
    { name: "SEO & Brand", path: "/admin/seo", icon: Globe },
    { name: "Hero Section", path: "/admin/hero", icon: Sparkles },
    { name: "Clients Logos", path: "/admin/clients", icon: Award },
    { name: "Projects & Cases", path: "/admin/projects", icon: Briefcase },
    { name: "Why Choose Us", path: "/admin/why-choose-us", icon: Layers },
    { name: "Services", path: "/admin/services", icon: Sliders },
    { name: "About Us", path: "/admin/about", icon: Users },
    { name: "Testimonials", path: "/admin/testimonials", icon: MessageSquare },
    { name: "Statistics", path: "/admin/stats", icon: Award },
    { name: "Team Section", path: "/admin/team", icon: Users },
    { name: "FAQ Section", path: "/admin/faq", icon: HelpCircle },
    { name: "Contact & Footer", path: "/admin/footer", icon: PhoneCall },
    { name: "Inquiries Inbox", path: "/admin/messages", icon: MessageSquare },
    { name: "Settings & DB", path: "/admin/settings", icon: Settings },
  ];

  const currentNavItem = navItems.find((item) =>
    item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path)
  );

  return (
    <div className="min-h-screen bg-[#090a0d] text-neutral-100 flex flex-col font-sans selection:bg-white selection:text-black">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 h-16 bg-[#0f1115]/90 border-b border-white/10 backdrop-blur-xl px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:text-white"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/admin" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-black font-black text-sm tracking-tighter">
              HB
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
                HeadBat <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/10 text-neutral-300 border border-white/10">CMS</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-3 md:gap-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-neutral-200 transition-colors"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-white/10">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-neutral-700 to-neutral-500 flex items-center justify-center text-xs font-bold text-white uppercase">
              {admin?.name ? admin.name.charAt(0) : "A"}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold text-neutral-200 leading-tight">
                {admin?.name || "Admin"}
              </span>
              <span className="text-[10px] text-neutral-400 leading-none">
                {admin?.email || "admin@headbat.com"}
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Log out"
            className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-neutral-400 hover:text-rose-300 border border-white/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#0d0e12] border-r border-white/10 flex flex-col justify-between transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
            isSidebarOpen ? "translate-x-0 pt-16" : "-translate-x-full md:pt-0"
          }`}
        >
          <div className="p-4 flex-1 overflow-y-auto space-y-1">
            <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
              Content Management
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? "bg-white text-black shadow-lg font-semibold"
                        : "text-neutral-400 hover:text-white hover:bg-white/5"
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>

          {/* Database Status footer in sidebar */}
          <div className="p-4 border-t border-white/5 bg-black/20">
            <div className="flex items-center justify-between text-[11px] text-neutral-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                MongoDB Live
              </span>
              <Link
                to="/admin/settings"
                className="hover:text-white transition-colors underline"
              >
                Config
              </Link>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm md:hidden"
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-[#090a0d]">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Breadcrumb Bar */}
            <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
              <Link to="/admin" className="hover:text-neutral-300 transition-colors">
                Admin
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-neutral-200 font-semibold">
                {currentNavItem?.name || "Dashboard"}
              </span>
            </div>

            {/* Sub-view rendering */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
