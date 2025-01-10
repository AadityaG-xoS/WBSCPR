import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import setReviewRoutes from "./routes/reviewsRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

export default app;

