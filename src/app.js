require("dotenv").config();
const express = require("express");
const path = require("path");
const setReviewRoutes = require("./routes/reviewsRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Setup Routes
setReviewRoutes(app);

// Start Server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
