const express = require('express');

const router = express.Router();

const user = require("../Controller/applyNow")

const user_data = require("../Controller/userData")

router.post("/applynow" , user)

router.get("/userData" , user_data)

module.exports= router;