const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    mobile1: { type: String, required: true },
    email1: { type: String, required: true },

    mobile2: { type: String },
    email2: { type: String },

    position: { type: String, required: true },   // Apply page se aayega
    location: { type: String },                   // e.g. Delhi, Mumbai
    positionType: { type: String },               // e.g. Full-time, Part-time

    // File paths (server par kaha store hua)
    resumePath: { type: String },                 // /uploads/jobApplications/xyz.pdf
    aviationCertificatePath: { type: String },    // /uploads/jobApplications/abc.pdf
  },
  { timestamps: true }                            // createdAt, updatedAt
);

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
