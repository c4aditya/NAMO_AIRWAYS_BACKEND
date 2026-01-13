const mongoose = require('mongoose');

const courseEnqSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  mobile1: { type: String, required: true },
  email: { type: String, required: true },
  mobile2: { type: String },
  courseName: { type: String, required: true },
  enquiryType: { type: String, enum: ['buy', 'course-enquiry'], required: true }, // Buy Now / Enquiry Now
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('CourseEnq', courseEnqSchema);
