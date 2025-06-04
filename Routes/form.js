const express = require('express');

const router = express.Router();

const user = require("../Controller/applyNow")

router.post("/applynow" , user)

module.exports= router;