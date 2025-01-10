const express = require("express");
const { getReviews } = require("../controllers/reviewsController.js");

const router = express.Router();

// GET /api/reviews
router.get("/api/reviews", getReviews);

module.exports = (app) => {
  app.use(router);
};
