const CourseEnq = require('../Models/courseEnq');

// POST: create new course enquiry
const submitCourseEnq = async (req, res) => {
  try {
    const { fullName, mobile1, email, mobile2, courseName, enquiryType } = req.body;

    if (!fullName || !mobile1 || !email || !courseName || !enquiryType) {
      return res.status(400).json({
        success: false,
        error: 'Required fields missing'
      });
    }

    const doc = new CourseEnq({
      fullName: fullName.trim(),
      mobile1,
      email: email.toLowerCase().trim(),
      mobile2,
      courseName: courseName.trim(),
      enquiryType
    });

    await doc.save();

    console.log(`✅ New Course Enquiry: ${fullName} | ${courseName} | ${enquiryType}`);

    res.json({
      success: true,
      message: 'Course enquiry submitted successfully!',
      id: doc._id
    });
  } catch (err) {
    console.error('Course Enquiry Error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// GET: admin – all course enquiries
const getAllCourseEnq = async (req, res) => {
  try {
    const list = await CourseEnq.find()
      .sort({ createdAt: -1 })
      .select('-__v');

    res.json({
      success: true,
      count: list.length,
      enquiries: list
    });
  } catch (err) {
    console.error('Get Course Enq Error:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch course enquiries'
    });
  }
};

module.exports = { submitCourseEnq, getAllCourseEnq };
