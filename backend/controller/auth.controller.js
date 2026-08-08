import User from "../model/User.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import EnquireForm from "../model/enquireForm.js";
import ContactForm from "../model/contactForm.js";
import Career from "../model/career.js";
import BrochureForm from "../model/brochureForm.js";
export const register = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    const userExists =
      await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message:
          "Email already exists",
      });
    }

    const hashedPassword =
      await argon2.hash(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message:
        "Registration successful. Please wait for super admin approval before login.",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        status: user.status,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (
  req,
  res
) => {
  try {
    const { email, password } =
      req.body;

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid Credentials",
      });
    }

    const isMatch =
      await argon2.verify(
        user.password,
        password
      );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid Credentials",
      });
    }

    if (user.role !== "superadmin" && user.status !== "approved") {
      return res.status(403).json({
        success: false,
        message:
          user.status === "rejected"
            ? "Your account has been rejected"
            : "Your account is pending approval",
      });
    }

    const accessToken =
      generateAccessToken(
        user._id,
        user.role
      );

    const refreshToken =
      generateRefreshToken(user._id);

    user.refreshToken =
      refreshToken;

    await user.save();

    const isProd =
      process.env.NODE_ENV === "production" || process.env.RENDER === "true";

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      path: "/",
    });

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
      accessToken,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No refresh token",
      });
    }

    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== token) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    const accessToken = generateAccessToken(user._id, user.role);

    res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid refresh token",
    });
  }
};

export const logout = async (req, res) => {
  try {
    const isProd =
      process.env.NODE_ENV === "production" || process.env.RENDER === "true";

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      path: "/",
    });
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPendingUsers = async (req, res) => {
  try {
    const users = await User.find({ status: "pending" }).select(
      "-password -refreshToken"
    );

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "superadmin" } }).select(
      "-password -refreshToken"
    );

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const approveUser = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["admin", "editor"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role must be admin or editor",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role, status: "approved" },
      { new: true }
    ).select("-password -refreshToken");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `User approved as ${role}`,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const rejectUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    ).select("-password -refreshToken");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User rejected",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["admin", "editor"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role must be admin or editor",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password -refreshToken");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Role updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserData=async(req,res)=>{
  try {
    const user=await User.find();
    res.status(200).json({success:true,message:"Data fetched successfully",user});
  } catch (error) {
    res.status(500).json({success:false,message:error.message});
  }
}

export const enquireData=async(req,res)=>{
  try {
    const { name, email, message,phone,project } = req.body;
    if(!name || !email || !message || !phone || !project) {
      res.status(400).json({success:false,message:"All fields are required"})
      return;
    }
    const enquireData = await EnquireForm.create({ name, email, message,phone,project });
    res.status(200).json({success:true,message:"Data submitted successfully",enquireData});
  } catch (error) {
    res.status(500).json({success:false,message:error.message});
  }
};

export const getEnquireData=async(req,res)=>{
  try {
    const user=await EnquireForm.find();
    res.status(200).json({success:true,message:"Data fetched successfully",user});  
  } catch (error) {
    res.status(500).json({success:false,message:error.message});
  }
}




export const contactData=async(req,res)=>{
  try {
    const { name, email, message,phone } = req.body;
    if(!name || !email || !message || !phone) {
      res.status(400).json({success:false,message:"All fields are required"})
      return;
    }
    const contactData = await ContactForm.create({ name, email, message,phone });
    res.status(200).json({success:true,message:"Data submitted successfully",contactData});
  } catch (error) {
    res.status(500).json({success:false,message:error.message});
  }
}

export const getContactData=async(req,res)=>{
  try {
    const user=await ContactForm.find();
    res.status(200).json({sucess:false,message:"Data fetched successfully",user});
  } catch (error) {
    res.status(500).json({success:false,message:error.message});
  }
}

export const createCareer = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { name, email, mobile, designation } = req.body;

    if (!name || !email || !mobile || !designation) {
      return res.status(400).json({
        success: false,
        message: "Name, Email, Mobile and Designation are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required",
      });
    }

    const career = await Career.create({
      name,
      email,
      mobile,
      designation,
      resume: req.file.path,
    });

    return res.status(201).json({
      success: true,
      message: "Career application submitted successfully",
      data: career,
    });

  } catch (error) {
    console.error("Career Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const getCareerData=async(req,res)=>{
  try {
    const user=await Career.find();
    res.status(200).json({success:true,message:"Data fetched successfully",user});
  } catch (error) {
    res.status(500).json({success:false,message:error.message});
  }
}

export const brochureData = async (req, res) => {
  try {
    const { name, email, phone, project } = req.body;
    if (!name || !email || !phone || !project) {
      res.status(400).json({ success: false, message: "All fields are required" });
      return;
    }
    const brochure = await BrochureForm.create({ name, email, phone, project });
    res.status(200).json({
      success: true,
      message: "Brochure form submitted successfully",
      brochure,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBrochureData = async (req, res) => {
  try {
    const user = await BrochureForm.find();
    res.status(200).json({ success: true, message: "Data fetched successfully", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};