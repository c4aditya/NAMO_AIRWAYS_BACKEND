// server.js
const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
require("dotenv").config();

// addid cros 

const cors = require("cors")

app.use(cors());

// Database connection
const db_connect = require("./config/database");
db_connect();

// Middleware
app.use(express.json());
app.use(fileUpload());

// Routes
const formRoute = require("./routes/form");
app.use("/api/v1", formRoute);

const PORT = process.env.PORT || 5700;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
