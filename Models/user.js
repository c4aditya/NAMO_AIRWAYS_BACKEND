const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  fatherName: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: String, required: true },
  DOB: { type: Date, required: true },
  gender: { type: String, required: true },
  education: { type: String, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true }, 
  position: { type: String, required: true },
  aadhaarNumber: { type: String, required: true },
  passportSizePhoto: { type: String },
  avaitionCertificate: { type: String }
});

module.exports = mongoose.model("User", userSchema);
