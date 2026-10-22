import { createBrowserRouter, Navigate } from "react-router";
import Home from "../components/home/Home";
import MainLayout from "../layout/MainLayout";
import ProjectDetails from "../pages/ProjectDetails";

// Admin Route Components
import AdminProtectedRoute from "../admin/components/AdminProtectedRoute";
import AdminLayout from "../admin/components/AdminLayout";
import AdminLogin from "../admin/pages/AdminLogin";
import DashboardOverview from "../admin/pages/DashboardOverview";
import SeoBrandEditor from "../admin/pages/SeoBrandEditor";
import HeroEditor from "../admin/pages/HeroEditor";
import ClientsEditor from "../admin/pages/ClientsEditor";
import ProjectsEditor from "../admin/pages/ProjectsEditor";
import WhyChooseUsEditor from "../admin/pages/WhyChooseUsEditor";
import ServicesEditor from "../admin/pages/ServicesEditor";
import AboutEditor from "../admin/pages/AboutEditor";
import TestimonialsEditor from "../admin/pages/TestimonialsEditor";
import StatisticsEditor from "../admin/pages/StatisticsEditor";
import TeamEditor from "../admin/pages/TeamEditor";
import FAQEditor from "../admin/pages/FAQEditor";
import FooterEditor from "../admin/pages/FooterEditor";
import MessagesManager from "../admin/pages/MessagesManager";
import SettingsManager from "../admin/pages/SettingsManager";

export const router = createBrowserRouter([
  // Admin Login
  {
    path: "/admin/login",
    Component: AdminLogin,
  },

  // Protected Admin Dashboard
  {
    path: "/admin",
    element: (
      <AdminProtectedRoute>
        <AdminLayout />
      </AdminProtectedRoute>
    ),
    children: [
      { index: true, Component: DashboardOverview },
      { path: "seo", Component: SeoBrandEditor },
      { path: "hero", Component: HeroEditor },
      { path: "clients", Component: ClientsEditor },
      { path: "projects", Component: ProjectsEditor },
      { path: "why-choose-us", Component: WhyChooseUsEditor },
      { path: "services", Component: ServicesEditor },
      { path: "about", Component: AboutEditor },
      { path: "testimonials", Component: TestimonialsEditor },
      { path: "stats", Component: StatisticsEditor },
      { path: "statistics", Component: StatisticsEditor },
      { path: "team", Component: TeamEditor },
      { path: "faq", Component: FAQEditor },
      { path: "footer", Component: FooterEditor },
      { path: "messages", Component: MessagesManager },
      { path: "settings", Component: SettingsManager },
      { path: "*", element: <Navigate to="/admin" replace /> },
    ],
  },

  // Public Website Routes
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "cases/:slug", Component: ProjectDetails },
      { path: "projects/:slug", Component: ProjectDetails },
      { path: "cases", element: <Navigate to="/#projects" replace /> },
      { path: "projects", element: <Navigate to="/#projects" replace /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
