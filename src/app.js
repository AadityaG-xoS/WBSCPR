import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import setReviewRoutes from './routes/reviewsRoutes.js';  // Ensure the correct file extension is used

const app = express();
const PORT = process.env.PORT || 10000;  // Ensure the PORT is being used from environment variable

// Middleware
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(path.resolve(), "../public")));  // Use path.resolve() for better compatibility

// Root Route: Serve the index.html from the public directory
app.get("/", (req, res) => {
  res.sendFile(path.join(path.resolve(), "../public/index.html"));  // Ensure the correct path to index.html
});

// Setup Routes
setReviewRoutes(app);

// Start Server (use process.env.PORT for Render)
if (import.meta.url === `file://${path.resolve()}/src/app.js`) {
  app.listen(PORT, () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);  // Use correct port
  });
}

export default app;



