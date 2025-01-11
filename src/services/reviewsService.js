import { smartScraper } from "scrapegraph-js";

/**
 * Extract reviews and their CSS selectors from the given URL, handling pagination.
 * @param {string} baseUrl - Base URL for the reviews page.
 * @param {string} paginationQuery - Query parameter or path for pagination (e.g., "?page=").
 * @param {number} maxPages - Maximum number of pages to scrape.
 * @returns {Object} Object containing extracted reviews and their CSS selectors across all pages.
 */
const extractReviews = async (baseUrl, paginationQuery = "?page=", maxPages = 5) => {
  const prompt = `
    You are an expert review extractor. Extract the reviews from the given webpage and return the data in the following structured JSON format:

    {
      "reviews_count": <total_number_of_reviews>,
      "reviews": [
        {
          "title": "Review Title",
          "body": "Review body text",
          "rating": <numeric_rating>,
          "reviewer": "Reviewer Name"
        },
        ...
      ]
    }

    Ensure the JSON is valid and contains no extraneous characters or explanations. Use 'null' for missing fields.
  `;

  const apiKey = process.env.SGAI_APIKEY;
  let allReviews = [];
  let totalReviewsCount = 0;

  try {
    for (let page = 1; page <= maxPages; page++) {
      const url = `${baseUrl}${paginationQuery}${page}`;
      console.log(`Fetching reviews from: ${url}`);

      const response = await smartScraper(apiKey, url, prompt);

      if (response && response.result) {
        console.log(`Extracted Reviews from page ${page}:`, response.result);

        const { reviews_count, reviews } = response.result;
        totalReviewsCount += reviews_count || 0;

        if (reviews && reviews.length > 0) {
          allReviews = allReviews.concat(reviews);
        } else {
          console.log(`No reviews found on page ${page}. Stopping pagination.`);
          break; // Stop if no reviews are found on the current page
        }
      } else {
        console.log(`No response received for page ${page}.`);
        break; // Stop if the scraper fails to return a valid response
      }
    }

    return {
      reviews_count: totalReviewsCount,
      reviews: allReviews,
    };
  } catch (error) {
    console.error("Error extracting reviews:", error.message);
    return {
      reviews_count: totalReviewsCount,
      reviews: allReviews,
      error: "Failed to extract reviews from the provided URL.",
    };
  }
};

export { extractReviews };
