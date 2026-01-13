const Enquiry = require('../Models/Enquiynow');  // Tumhara model path

const submitEnquiry = async (req, res) => {
  try {
    const { firstName, lastName, contact, email, travelDate, people, message } = req.body;

    // Validation
    if (!firstName?.trim() || !lastName?.trim() || !contact || !email || people < 1) {
      return res.status(400).json({
        success: false,
        error: 'Required fields missing'
      });
    }

    const enquiry = new Enquiry({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      contact,
      email: email.toLowerCase().trim(),
      travelDate: travelDate ? new Date(travelDate) : null,
      people: parseInt(people),
      message: message?.trim() || ''
    });

    await enquiry.save();

    console.log(`✅ New Enquiry: ${firstName} ${lastName} (${email})`);

    res.json({
      success: true,
      message: 'Enquiry submitted successfully!',
      enquiryId: enquiry._id
    });
  } catch (error) {
    console.error('Enquiry Error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// NEW GET API - Admin dekhega saare enquiries
const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find()
      .sort({ createdAt: -1 })  // Latest first
      .select('firstName lastName email contact people travelDate message createdAt');  // Specific fields

    res.json({
      success: true,
      count: enquiries.length,
      enquiries
    });
  } catch (error) {
    console.error('Get Enquiries Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch enquiries'
    });
  }
};

module.exports = { submitEnquiry, getAllEnquiries };
