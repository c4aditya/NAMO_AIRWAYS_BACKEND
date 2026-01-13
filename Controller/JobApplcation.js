const path = require('path');
const fs = require('fs');
const JobApplication = require('../Models/job');

const applyForJob = async (req, res) => {
  try {
    const {
      fullName,
      mobile1,
      email1,
      mobile2,
      email2,
      position,
      location,
      positionType,
    } = req.body;

    if (!fullName || !mobile1 || !email1 || !position) {
      return res
        .status(400)
        .json({ success: false, error: 'Required fields missing' });
    }

    if (!req.files || !req.files.resume || !req.files.aviationCertificate) {
      return res.status(400).json({
        success: false,
        error: 'Resume and Aviation Certificate are required',
      });
    }

    const resume = req.files.resume;
    const aviationCert = req.files.aviationCertificate;

    const uploadDir = path.join(__dirname, '..', 'uploads', 'jobApplications');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const timestamp = Date.now();
    const resumeFileName = `${timestamp}_resume_${resume.name}`;
    const aviationFileName = `${timestamp}_aviation_${aviationCert.name}`;

    const resumePath = path.join(uploadDir, resumeFileName);
    const aviationPath = path.join(uploadDir, aviationFileName);

    await resume.mv(resumePath);
    await aviationCert.mv(aviationPath);

    const doc = new JobApplication({
      fullName,
      mobile1,
      email1,
      mobile2,
      email2,
      position,
      location,
      positionType,
      resumePath: `/uploads/jobApplications/${resumeFileName}`,
      aviationCertificatePath: `/uploads/jobApplications/${aviationFileName}`,
    });

    await doc.save();

    res.json({
      success: true,
      message: 'Job application submitted successfully',
      id: doc._id,
    });
  } catch (err) {
    console.error('Job apply error:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const getAllJobApplications = async (req, res) => {
  try {
    const list = await JobApplication.find()
      .sort({ createdAt: -1 })
      .select('-__v');

    res.json({
      success: true,
      count: list.length,
      applications: list,
    });
  } catch (err) {
    console.error('Get job applications error:', err);
    res
      .status(500)
      .json({ success: false, error: 'Failed to fetch job applications' });
  }
};

module.exports = { applyForJob, getAllJobApplications };
