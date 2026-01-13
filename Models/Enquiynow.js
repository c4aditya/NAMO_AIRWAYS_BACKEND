const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
  travelDate: { type: Date },
  people: { type: Number, required: true, min: 1 },
  message: { type: String, trim: true }
}, { timestamps: true });

module.exports = mongoose.model('Enquiry', enquirySchema);
