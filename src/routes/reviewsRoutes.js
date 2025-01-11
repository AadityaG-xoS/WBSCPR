const express = require("express");
const { getReviews } = require("../controllers/reviewsController");

const router = express.Router();

/**
 * GET /api/reviews
 * Route to fetch reviews with optional pagination support.
 * Query Parameters:
 * - url (string): The base URL of the page to scrape.
 * - page (number): The starting page for scraping (default is 1).
 * - maxPages (number): The maximum number of pages to scrape (default is 5).
 */
router.get("/api/reviews", async (req, res) => {
  try {
    const { url, page = 1, maxPages = 5 } = req.query;

    if (!url) {
      return res.status(400).json({
        error: "URL is required to fetch reviews.",
      });
    }

    const reviewsData = await getReviews(url, page, maxPages);
    res.status(200).json(reviewsData);
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    res.status(500).json({
      error: "An error occurred while fetching reviews.",
    });
  }
});

module.exports = (app) => {
  app.use(router);
};
