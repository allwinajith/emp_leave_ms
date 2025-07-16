import {
  findAdminByUserNameModel,
  getAdminModel,
  getCredentialModel,
  postAdminModel,
  updatePasswordModel,
} from "../models/adminModel.js";

import bcrypt from 'bcryptjs'

export const getAdminController = async (req, res) => {
  try {
    const data = await getAdminModel();

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No admin data found",
      });
    }
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("DB fetching error:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching admin, please try again later.",
    });
  }
};

export const postAdminController = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existing = await findAdminByUserNameModel(username);
    if (existing.usercount > 0)
      return res.status(409).json({ message: "Username already exists" });

    const salt = bcrypt.genSaltSync(10);
    const password_hash = bcrypt.hashSync(password, salt);
    const adminId = await postAdminModel(username, password_hash, salt);
    res.status(201).json({ message: "Admin created", adminId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error in creation of admin, please try again later.",
    });
  }
};

export const changeAdminPasswordController = async (req, res) => {
  const { currentPassword, newPassword, userId } = req.body;

  if (!currentPassword || !newPassword || !userId)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const user = await getCredentialModel(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isMatch)
      return res.status(401).json({ error: "Current password is incorrect" });

    const salt = await bcrypt.genSalt(10);
    const newHash = await bcrypt.hash(newPassword, salt);

    const affectedRows = await updatePasswordModel(userId, newHash, salt);
    if (affectedRows === 0) throw new Error("Update failed");

    res.json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Password change failed" });
  }
};
