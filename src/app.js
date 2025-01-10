import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import setReviewRoutes from './routes/reviewsRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

setReviewRoutes(app);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});

export default app;
