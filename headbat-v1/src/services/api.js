const API_BASE = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

// Helper to make API requests
async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  const headers = { ...options.headers };

  // Attach auth token if available and not explicitly skipped
  const token = localStorage.getItem("headbat_admin_token");
  if (token && !headers["Authorization"]) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Set JSON content-type if body is JSON
  if (options.body && !(options.body instanceof FormData) && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error = new Error(data.message || `Request failed with status ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`[API Error] ${options.method || "GET"} ${url}:`, error.message);
    throw error;
  }
}

export const api = {
  // Public Content API
  getContent: () => request("/content"),
  getSectionContent: (section) => request(`/content/${section}`),
  updateSectionContent: (section, data) =>
    request(`/content/${section}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  resetSectionContent: (section) =>
    request(`/content/${section}/reset`, {
      method: "POST",
    }),

  // Projects API
  getProjects: () => request("/projects"),
  getProjectBySlug: (slug) => request(`/projects/${slug}`),
  createProject: (projectData) =>
    request("/projects", {
      method: "POST",
      body: JSON.stringify(projectData),
    }),
  updateProject: (id, projectData) =>
    request(`/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(projectData),
    }),
  deleteProject: (id) =>
    request(`/projects/${id}`, {
      method: "DELETE",
    }),

  // Contact Messages API
  submitContactMessage: (messageData) =>
    request("/messages", {
      method: "POST",
      body: JSON.stringify(messageData),
    }),
  getMessages: () => request("/messages"),
  updateMessageStatus: (id, status) =>
    request(`/messages/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    }),
  deleteMessage: (id) =>
    request(`/messages/${id}`, {
      method: "DELETE",
    }),

  // Upload API
  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return request("/upload", {
      method: "POST",
      body: formData,
    });
  },

  // Auth API
  login: (email, password) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  getMe: () => request("/auth/me"),
  changePassword: (currentPassword, newPassword) => {
    const payload =
      typeof currentPassword === "object" && currentPassword !== null
        ? currentPassword
        : { currentPassword, newPassword };
    return request("/auth/change-password", {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },
  updateProfile: (profileData) =>
    request("/auth/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    }),

  // Health check
  getHealth: () => request("/health"),
  checkHealth: () => request("/health"),
};

export default api;
