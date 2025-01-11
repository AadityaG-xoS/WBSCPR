import { extractReviewsWithPuppeteer } from '../services/reviewsService.js';

/**
 * Controller to handle review extraction requests with pagination support.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getReviews = async (req, res) => {
  const { url, page = 1, maxPages = 5 } = req.query;

  // Check if the URL is provided
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

    // Validate the pagination parameters (must be numeric)
    if (isNaN(currentPage) || isNaN(maxPagesToScrape)) {
      return res.status(400).json({
        reviews_count: 0,
        reviews: [],
        error: "Invalid page or maxPages parameter. Must be numeric.",
      });
    }

    // Ensure the pagination does not exceed the maximum allowable pages
    if (currentPage < 1 || maxPagesToScrape < 1) {
      return res.status(400).json({
        reviews_count: 0,
        reviews: [],
        error: "Page and maxPages must be greater than or equal to 1.",
      });
    }

    // Extract reviews with pagination using Puppeteer
    const reviewsData = await extractReviewsWithPuppeteer(url, currentPage, maxPagesToScrape);

    // If there's an error in extracting reviews, return an error response
    if (reviewsData.error) {
      return res.status(500).json({
        reviews_count: 0,
        reviews: [],
        error: reviewsData.error,
      });
    }

    // Respond with the extracted reviews data
    res.status(200).json({
      reviews_count: reviewsData.reviews.length,
      reviews: reviewsData.reviews,
    });
  } catch (error) {
    console.error("Error in getReviews:", error.message);
    res.status(500).json({
      reviews_count: 0,
      reviews: [],
      error: "Failed to extract reviews. Please try again later.",
    });
  }
};

export { getReviews };
