import axiosInstance from "./axiosInstance";

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

axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = async (body) => {
  const { data } = await axiosInstance.post("/register", body);
  return data;
};

export const submitEnquireData = async (body) => {
  const { data } = await axiosInstance.post("/enquire-data", body);
  return data;
};

export const submitContactData = async (body) => {
  const { data } = await axiosInstance.post("/contact-data", body);
  return data;
};

export const submitCareerApplication = async (formData) => {
  const { data } = await axiosInstance.post("/career", formData, {
    headers: {
      "Content-Type": undefined,
    },
  });
  return data;
};

export const authApi = {
  register: registerUser,

  login: async (body) => {
    const { data } = await axiosInstance.post("/login", body);
    if (data.accessToken) setAccessToken(data.accessToken);
    return data;
  },

  logout: async () => {
    await axiosInstance.post("/logout");
    setAccessToken(null);
  },

  getMe: async () => {
    const { data } = await axiosInstance.get("/auth/me");
    return data;
  },

  refreshToken: async () => {
    const { data } = await axiosInstance.post("/refresh-token");
    if (data.accessToken) setAccessToken(data.accessToken);
    return data;
  },
};

export const adminApi = {
  getPendingUsers: async () => {
    const { data } = await axiosInstance.get("/admin/pending-users");
    return data;
  },

  getAllUsers: async () => {
    const { data } = await axiosInstance.get("/admin/users");
    return data;
  },

  approveUser: async (id, role) => {
    const { data } = await axiosInstance.patch(`/admin/users/${id}/approve`, {
      role,
    });
    return data;
  },

  rejectUser: async (id) => {
    const { data } = await axiosInstance.patch(`/admin/users/${id}/reject`);
    return data;
  },

  updateUserRole: async (id, role) => {
    const { data } = await axiosInstance.patch(`/admin/users/${id}/role`, {
      role,
    });
    return data;
  },

  getEnquireData: async () => {
    const { data } = await axiosInstance.get("/get-enquire-data");
    return data;
  },

  getContactData: async () => {
    const { data } = await axiosInstance.get("/get-contact-data");
    return data;
  },

  getCareerData: async () => {
    const { data } = await axiosInstance.get("/get-career-data");
    return data;
  },
};
