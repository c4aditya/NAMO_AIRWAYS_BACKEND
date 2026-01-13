const express = require('express');
const router = express.Router();
const { register, login, dashboard, authAdmin } = require('../Controller/AdminController');

// POST /api/v1/admin/register  -> create admin
router.post('/admin/register', register);

// POST /api/v1/admin/login     -> login admin (email + password + role check)
router.post('/admin/login', login);

// GET /api/v1/admin/dashboard  -> protected, sirf admin with valid token
router.get('/admin/dashboard', authAdmin, dashboard);

module.exports = router;
