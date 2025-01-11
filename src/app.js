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
app.use(express.static(path.resolve('public')));  // Adjusted path to public directory

// Setup Routes
setReviewRoutes(app);

// Start Server (use process.env.PORT for Render)
if (import.meta.url === `file://${path.resolve()}/src/app.js`) {
  app.listen(PORT, () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);  // Use correct port
  });
}

export default app;



