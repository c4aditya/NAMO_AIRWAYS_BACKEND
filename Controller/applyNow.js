const ApplyForm = require("../Models/user");
const path = require("path");
const fs = require("fs");

// Create upload directories if they don't exist
const dirPassport = path.join(__dirname, "./passportPhotos");
const dirAviation = path.join(__dirname, "./aviationCertificates");

if (!fs.existsSync(dirPassport)) fs.mkdirSync(dirPassport, { recursive: true });
if (!fs.existsSync(dirAviation)) fs.mkdirSync(dirAviation, { recursive: true });

async function applyNow(req, res) {
  try {
    const requiredFields = [
      'fullName', 'fatherName', 'email', 'number', 'DOB', 
      'gender', 'education', 'address', 'state', 'pincode', 
      'position', 'aadhaarNumber'
    ];

    // Check for missing fields
    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
        missingFields: missingFields.map(field => ({
          fieldName: field,
          message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
        }))
      });
    }

    // Check if files are present
    if (!req.files || !req.files.passportSizePhoto || !req.files.avaitionCertificate) {
      return res.status(400).json({
        success: false,
        message: "Please upload both the passport photo and aviation certificate"
      });
    }

    const passportPhoto = req.files.passportSizePhoto;
    const aviationCert = req.files.avaitionCertificate;

    // Save passport photo
    const passportExt = path.extname(passportPhoto.name);
    const passportPath = path.join(dirPassport, Date.now() + passportExt);
    await passportPhoto.mv(passportPath);

    // Save aviation certificate
    const aviationExt = path.extname(aviationCert.name);
    const aviationPath = path.join(dirAviation, Date.now() + aviationExt);
    await aviationCert.mv(aviationPath);

    // Create user in DB
    const userData = await ApplyForm.create({
      fullName: req.body.fullName,
      fatherName: req.body.fatherName,
      email: req.body.email,
      number: req.body.number,
      DOB: req.body.DOB,
      gender: req.body.gender,
      education: req.body.education,
      address: req.body.address,
      state: req.body.state,
      pincode: req.body.pincode,
      position: req.body.position,
      aadhaarNumber: req.body.aadhaarNumber,
      passportSizePhoto: passportPath,
      avaitionCertificate: aviationPath,
    });

    res.status(200).json({
      success: true,
      message: "Your data has been submitted successfully",
      data: userData
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while submitting the form",
      error: error.message
    });
  }
}

module.exports = applyNow;
