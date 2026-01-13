// server.js
const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
require("dotenv").config();

const cors = require("cors");

// ✅ CORS middleware (frontend origin yahan set karo)
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:3000"], // React app URL
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true
}));

// Database connection
const db_connect = require("./config/database");
db_connect();

// Middleware
app.use(express.json());
app.use(fileUpload());

// Routes
const formRoute = require("./routes/form");
app.use("/api/v1", formRoute);

const adminRoute = require("./Routes/AdminRoute");
app.use("/api/v1", adminRoute);

const enqFrom = require("./Routes/fromRoute"); // Enquiry form
app.use("/api/v1", enqFrom);

const courseEnqRoute = require("./Routes/CourseEnq");
app.use("/api/v1", courseEnqRoute);

const path = require("path");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const jobApplicationRoute = require("./Routes/JobApplication");
app.use("/api/v1", jobApplicationRoute);

const PORT = process.env.PORT || 5700;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
