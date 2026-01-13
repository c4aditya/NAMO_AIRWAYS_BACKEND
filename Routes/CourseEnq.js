const express = require('express');
const router = express.Router();
const { submitCourseEnq, getAllCourseEnq } = require('../Controller/CourseEnq');

// POST /api/v1/course/enq  - Course Buy/Enquiry form
router.post('/course/enq', submitCourseEnq);

// GET /api/v1/course/enq   - Admin: get all course enquiries
router.get('/course/enq', getAllCourseEnq);

module.exports = router;
