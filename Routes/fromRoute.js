const express = require('express');
const router = express.Router();
const { submitEnquiry ,getAllEnquiries} = require('../Controller/EnqFrom');

// POST /api/v1/form - Submit enquiry
router.post('/enqFrom', submitEnquiry);
router.get('/enqFrom', getAllEnquiries);

module.exports = router;
