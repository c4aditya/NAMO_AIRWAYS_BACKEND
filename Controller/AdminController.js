const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../Models/AdminModel');
require('dotenv').config();

// Token generate helper (id + role store)
const generateToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '24h' });

/**
 * ✅ Middleware: sirf valid admin ko aage jane dega
 */
const authAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      return res.status(401).json({ success: false, error: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(401).json({ success: false, error: "Admin not found" });
    }

    if (admin.role !== 'admin') {
      return res.status(403).json({ success: false, error: "Not authorized as admin" });
    }

    req.admin = admin;
    req.adminId = admin._id;
    next();
  } catch (err) {
    console.error("authAdmin error:", err);
    res.status(401).json({ success: false, error: "Token is not valid" });
  }
};

/**
 * ✅ Register admin (sirf role: 'admin')
 */
const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password required' });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ success: false, error: 'Email already exists' });
    }

    const newAdmin = new Admin({ email, password, role: 'admin' });
    await newAdmin.save();

    const token = generateToken(newAdmin._id, newAdmin.role);
    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      token,
      admin: { id: newAdmin._id, email: newAdmin.email, role: newAdmin.role }
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * ✅ Login admin (email + password + role check)
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ success: false, error: 'Email not found' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid password' });
    }

    if (admin.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Not authorized as admin' });
    }

    const token = generateToken(admin._id, admin.role);
    res.json({
      success: true,
      token,
      message: 'Admin login successful',
      admin: { id: admin._id, email: admin.email, role: admin.role }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

/**
 * ✅ Protected admin dashboard (authAdmin ke baad hi chalega)
 */
const dashboard = async (req, res) => {
  const admin = await Admin.findById(req.adminId).select('-password');
  res.json({ success: true, message: 'Admin Dashboard', admin });
};

module.exports = { register, login, dashboard, authAdmin };
