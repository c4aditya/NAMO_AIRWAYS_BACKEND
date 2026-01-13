const express = require('express');
const router = express.Router();
const {
  applyForJob,
  getAllJobApplications,
} = require('../Controller/JobApplcation');
const { authAdmin } = require('../Controller/AdminController');

// User: apply for job
router.post('/job/apply', applyForJob);

// Admin: get all job applications
router.get('/job/apply', authAdmin, getAllJobApplications);

module.exports = router;
