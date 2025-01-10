import express from "express";
import { getReviews } from "../controllers/reviewsController.js";

const router = express.Router();

router.get("/api/reviews", getReviews);

export default (app) => {
  app.use(router);
};
