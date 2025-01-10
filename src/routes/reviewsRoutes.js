// In reviewsRoutes.js
const express = require("express");
const { getReviews } = require("../controllers/reviewsController.js");

const router = express.Router();

// GET /reviews
router.get("/reviews", getReviews);

module.exports = (app, basePath) => {
  app.use(basePath, router);
};
