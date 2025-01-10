require("dotenv").config();
const express = require("express");
const path = require("path");
const setReviewRoutes = require("./routes/reviewsRoutes");

const app = express();
const PORT = process.env.PORT || 10000;  // Ensure the PORT is being used from environment variable

// Middleware
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Setup Routes
setReviewRoutes(app);
app.get("/", (req, res) => {
  res.send("Welcome to the reviews app!");
});

// Start Server (use process.env.PORT for Render)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);  // Use correct port
  });
}

module.exports = app;


