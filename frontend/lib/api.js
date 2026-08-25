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
  if (typeof FormData !== "undefined" && config.data instanceof FormData) {
    delete config.headers["Content-Type"];
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

export const submitBrochureData = async (body) => {
  const { data } = await axiosInstance.post("/brochure-data", body);
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

  getBrochureData: async () => {
    const { data } = await axiosInstance.get("/get-brochure-data");
    return data;
  },

  uploadImage: async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const { data } = await axiosInstance.post("/admin/upload", formData);
    return data;
  },

  getBlogs: async () => {
    const { data } = await axiosInstance.get("/admin/blogs");
    return data;
  },
  createBlog: async (body) => {
    const { data } = await axiosInstance.post("/admin/blogs", body);
    return data;
  },
  updateBlog: async (id, body) => {
    const { data } = await axiosInstance.put(`/admin/blogs/${id}`, body);
    return data;
  },
  deleteBlog: async (id) => {
    const { data } = await axiosInstance.delete(`/admin/blogs/${id}`);
    return data;
  },

  getJobs: async () => {
    const { data } = await axiosInstance.get("/admin/jobs");
    return data;
  },
  createJob: async (body) => {
    const { data } = await axiosInstance.post("/admin/jobs", body);
    return data;
  },
  updateJob: async (id, body) => {
    const { data } = await axiosInstance.put(`/admin/jobs/${id}`, body);
    return data;
  },
  deleteJob: async (id) => {
    const { data } = await axiosInstance.delete(`/admin/jobs/${id}`);
    return data;
  },

  getAwards: async () => {
    const { data } = await axiosInstance.get("/admin/awards");
    return data;
  },
  createAward: async (body) => {
    const { data } = await axiosInstance.post("/admin/awards", body);
    return data;
  },
  updateAward: async (id, body) => {
    const { data } = await axiosInstance.put(`/admin/awards/${id}`, body);
    return data;
  },
  deleteAward: async (id) => {
    const { data } = await axiosInstance.delete(`/admin/awards/${id}`);
    return data;
  },

  getGallery: async () => {
    const { data } = await axiosInstance.get("/admin/gallery");
    return data;
  },
  createGalleryImage: async (body) => {
    const { data } = await axiosInstance.post("/admin/gallery", body);
    return data;
  },
  updateGalleryImage: async (id, body) => {
    const { data } = await axiosInstance.put(`/admin/gallery/${id}`, body);
    return data;
  },
  deleteGalleryImage: async (id) => {
    const { data } = await axiosInstance.delete(`/admin/gallery/${id}`);
    return data;
  },
};
