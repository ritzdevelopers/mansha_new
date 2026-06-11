import React, { useState } from "react";
import { authApi, registerUser } from "../../../lib/api";

const DashboardAuth = ({ onSuccess }) => {
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const data = await authApi.login({
        email: formData.email,
        password: formData.password,
      });

      onSuccess?.(data.user);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const data = await registerUser(formData);
      setMessage(
        data.message ||
          "Registration successful. Please wait for super admin approval."
      );
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      setMode("login");
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 w-full p-6 border rounded-lg shadow">
      <div className="mb-6 flex gap-2">
        <button
          type="button"
          onClick={() => {
            setMode("login");
            setError("");
            setMessage("");
          }}
          className={`flex-1 cursor-pointer rounded-md p-2 font-montserrat text-[14px] ${
            mode === "login"
              ? "bg-black text-white"
              : "border border-[#DDDDDD] text-[#333333]"
          }`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("register");
            setError("");
            setMessage("");
          }}
          className={`flex-1 cursor-pointer rounded-md p-2 font-montserrat text-[14px] ${
            mode === "register"
              ? "bg-black text-white"
              : "border border-[#DDDDDD] text-[#333333]"
          }`}
        >
          Register
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-6">
        {mode === "login" ? "Login" : "Register"}
      </h1>

      {error ? (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-[14px] text-red-600">
          {error}
        </p>
      ) : null}

      {message ? (
        <p className="mb-4 rounded-md bg-green-50 px-3 py-2 text-[14px] text-green-700">
          {message}
        </p>
      ) : null}

      <form onSubmit={mode === "login" ? handleLogin : handleRegister}>
        {mode === "register" ? (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 mb-3"
            required
          />
        ) : null}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer bg-black text-white p-2 disabled:opacity-60"
        >
          {loading
            ? "Please wait..."
            : mode === "login"
              ? "Login"
              : "Register"}
        </button>
      </form>

      {mode === "login" ? (
        <p className="mt-4 text-center font-montserrat text-[13px] text-[#666666]">
          Super admin can login directly. New admin/editor users must register
          first and wait for approval.
        </p>
      ) : null}
    </div>
  );
};

export default DashboardAuth;
