const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
  if (typeof window !== "undefined") {
    if (token) {
      sessionStorage.setItem("accessToken", token);
    } else {
      sessionStorage.removeItem("accessToken");
    }
  }
};

export const getAccessToken = () => {
  if (accessToken) return accessToken;
  if (typeof window !== "undefined") {
    accessToken = sessionStorage.getItem("accessToken");
  }
  return accessToken;
};

async function apiRequest(path, options = {}) {
  const token = getAccessToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export const authApi = {
  register: (body) =>
    apiRequest("/api/register", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  login: async (body) => {
    const data = await apiRequest("/api/login", {
      method: "POST",
      body: JSON.stringify(body),
    });
    if (data.accessToken) setAccessToken(data.accessToken);
    return data;
  },

  logout: async () => {
    await apiRequest("/api/logout", { method: "POST" });
    setAccessToken(null);
  },

  getMe: () => apiRequest("/api/auth/me"),

  refreshToken: async () => {
    const data = await apiRequest("/api/refresh-token", { method: "POST" });
    if (data.accessToken) setAccessToken(data.accessToken);
    return data;
  },
};

export const adminApi = {
  getPendingUsers: () => apiRequest("/api/admin/pending-users"),
  getAllUsers: () => apiRequest("/api/admin/users"),
  approveUser: (id, role) =>
    apiRequest(`/api/admin/users/${id}/approve`, {
      method: "PATCH",
      body: JSON.stringify({ role }),
    }),
  rejectUser: (id) =>
    apiRequest(`/api/admin/users/${id}/reject`, { method: "PATCH" }),
  updateUserRole: (id, role) =>
    apiRequest(`/api/admin/users/${id}/role`, {
      method: "PATCH",
      body: JSON.stringify({ role }),
    }),
};
