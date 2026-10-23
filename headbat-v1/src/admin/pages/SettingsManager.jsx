import { useState, useEffect } from "react";
import {
  RotateCcw,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useContent } from "../../context/ContentContext";
import api from "../../services/api";
import Toast from "../components/Toast";

export default function SettingsManager() {
  const { user, login } = useAuth();
  const { reloadContent } = useContent();

  const [profileForm, setProfileForm] = useState({
    name: user?.name || "Admin",
    email: user?.email || "admin@headbat.com",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [systemHealth, setSystemHealth] = useState({
    status: "checking",
    database: "checking",
    uptime: 0,
  });

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || "Admin",
        email: user.email || "admin@headbat.com",
      });
    }

    // Check system health
    const healthFn = api.getHealth || api.checkHealth;
    if (typeof healthFn === "function") {
      healthFn()
        .then((data) => {
          const dbStatus =
            typeof data?.database === "object" && data.database !== null
              ? data.database.status || (data.database.connected ? "connected" : "disconnected")
              : data?.database || "connected";

          setSystemHealth({
            status: data?.status || "ok",
            database: String(dbStatus),
            uptime: data?.uptime || 0,
          });
        })
        .catch(() => {
          setSystemHealth({
            status: "offline",
            database: "disconnected",
            uptime: 0,
          });
        });
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const res = await api.updateProfile(profileForm);
      if (res.success) {
        setToast({ type: "success", message: "Profile updated successfully." });
      } else {
        setToast({ type: "error", message: res.message || "Failed to update profile." });
      }
    } catch (err) {
      setToast({ type: "error", message: err.message });
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setToast({ type: "error", message: "New passwords do not match." });
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setToast({
        type: "error",
        message: "New password must be at least 6 characters long.",
      });
      return;
    }

    setSavingPassword(true);
    try {
      const res = await api.changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      if (res.success) {
        setToast({
          type: "success",
          message: "Password changed successfully! Keep your new password safe.",
        });
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        setToast({ type: "error", message: res.message || "Failed to change password." });
      }
    } catch (err) {
      setToast({ type: "error", message: err.message });
    } finally {
      setSavingPassword(false);
    }
  };

  const handleFullReset = async () => {
    if (
      !window.confirm(
        "Are you sure you want to reset ALL website sections to original defaults? Any custom text changes will be reverted."
      )
    )
      return;

    try {
      const sections = [
        "hero",
        "clients",
        "whyChooseUs",
        "services",
        "aboutUs",
        "testimonials",
        "statistics",
        "team",
        "faq",
        "contactFooter",
      ];
      for (const section of sections) {
        await api.resetSectionContent(section);
      }
      await reloadContent();
      setToast({
        type: "success",
        message: "All website sections successfully reset to initial defaults.",
      });
    } catch (err) {
      setToast({ type: "error", message: "Failed full reset: " + err.message });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {toast && <Toast toast={toast} onClose={() => setToast(null)} />}

      <div className="pb-5 border-b border-white/10">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Settings & Account
        </h1>
        <p className="text-sm text-neutral-400 mt-1">
          Manage administrator security, database connection status, and website resets.
        </p>
      </div>

      {/* System Health / MongoDB Status */}
      <div className="bg-[#141416] border border-white/10 rounded-2xl p-6 space-y-4">
        <h2 className="text-base font-semibold text-white">
          System & Database Connection
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-1">
            <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider">
              Backend Status
            </span>
            <div className="flex items-center gap-2 pt-1">
              <span
                className={`w-2 h-2 rounded-full ${
                  systemHealth.status === "ok" ? "bg-emerald-400" : "bg-amber-400"
                }`}
              ></span>
              <span className="text-sm font-semibold text-white capitalize">
                {systemHealth.status === "ok" ? "Online & Healthy" : systemHealth.status}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-1">
            <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider">
              MongoDB Database
            </span>
            <div className="flex items-center gap-2 pt-1">
              <span
                className={`w-2 h-2 rounded-full ${
                  systemHealth.database === "connected"
                    ? "bg-emerald-400"
                    : "bg-amber-400"
                }`}
              ></span>
              <span className="text-sm font-semibold text-white capitalize">
                {systemHealth.database === "connected"
                  ? "Connected (Live)"
                  : systemHealth.database}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-1">
            <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider">
              API Base Route
            </span>
            <p className="text-xs font-mono text-neutral-300 pt-1 truncate">
              {import.meta.env.VITE_API_URL || "/api"}
            </p>
          </div>
        </div>
      </div>

      {/* Admin Profile Form */}
      <form
        onSubmit={handleUpdateProfile}
        className="bg-[#141416] border border-white/10 rounded-2xl p-6 space-y-4"
      >
        <h2 className="text-base font-semibold text-white">
          Admin Profile Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={profileForm.name}
              onChange={(e) =>
                setProfileForm((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-orange-500/50 focus:outline-none transition"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              Login Email
            </label>
            <input
              type="email"
              value={profileForm.email}
              onChange={(e) =>
                setProfileForm((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-orange-500/50 focus:outline-none transition"
              required
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={savingProfile}
            className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-orange-500/20 transition cursor-pointer"
          >
            {savingProfile ? "Saving Profile..." : "Update Profile"}
          </button>
        </div>
      </form>

      {/* Change Password Form */}
      <form
        onSubmit={handleChangePassword}
        className="bg-[#141416] border border-white/10 rounded-2xl p-6 space-y-4"
      >
        <h2 className="text-base font-semibold text-white">
          Change Password
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              Current Password
            </label>
            <input
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) =>
                setPasswordForm((prev) => ({
                  ...prev,
                  currentPassword: e.target.value,
                }))
              }
              className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-orange-500/50 focus:outline-none transition"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              New Password
            </label>
            <input
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) =>
                setPasswordForm((prev) => ({
                  ...prev,
                  newPassword: e.target.value,
                }))
              }
              placeholder="Min 6 characters"
              className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-orange-500/50 focus:outline-none transition"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) =>
                setPasswordForm((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:border-orange-500/50 focus:outline-none transition"
              required
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={savingPassword}
            className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-orange-500/20 transition cursor-pointer"
          >
            {savingPassword ? "Updating Password..." : "Change Password"}
          </button>
        </div>
      </form>

      {/* Danger Zone: Full Content Reset */}
      <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/20 space-y-4">
        <h2 className="text-base font-semibold text-white">Reset All Content</h2>
        <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl">
          Reset all sections (Hero, Clients, Services, About Us, Testimonials, Stats, Team, FAQ, and Footer) back to their original factory defaults. This action cannot be undone.
        </p>
        <button
          type="button"
          onClick={handleFullReset}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 text-xs font-semibold transition cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset All Website Content to Defaults
        </button>
      </div>
    </div>
  );
}
