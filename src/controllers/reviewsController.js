// reviewsController.js
import { extractReviewsWithPuppeteer } from '../services/reviewsService.js';

/**
 * Controller to handle review extraction requests with pagination support.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getReviews = async (req, res) => {
  const { url, page = 1, maxPages = 5 } = req.query;

  if (!url) {
    return res.status(400).json({
      reviews_count: 0,
      reviews: [],
      error: "URL parameter is required.",
    });
  }

  try {
    // Convert query parameters to numbers for pagination
    const currentPage = parseInt(page, 10);
    const maxPagesToScrape = parseInt(maxPages, 10);

    if (isNaN(currentPage) || isNaN(maxPagesToScrape)) {
      return res.status(400).json({
        reviews_count: 0,
        reviews: [],
        error: "Invalid page or maxPages parameter. Must be numeric.",
      });
    }

    // Extract reviews with pagination using Puppeteer
    const reviewsData = await extractReviewsWithPuppeteer(url, currentPage, maxPagesToScrape);

    if (reviewsData.error) {
      return res.status(500).json({
        reviews_count: 0,
        reviews: [],
        error: reviewsData.error,
      });
    }

    res.status(200).json({
      reviews_count: reviewsData.reviews.length,
      reviews: reviewsData.reviews,
    });
  } catch (error) {
    console.error("Error in getReviews:", error.message);
    res.status(500).json({
      reviews_count: 0,
      reviews: [],
      error: "Failed to extract reviews.",
    });
  }
};

export { getReviews };
