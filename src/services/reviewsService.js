import { smartScraper } from "scrapegraph-js";

/**
 * Extract reviews and their CSS selectors from the given URL.
 * @param {string} url - Target webpage URL.
 * @returns {Object} Object containing extracted reviews and their CSS selectors.
 */
const extractReviews = async (url) => {
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

  try {
    const response = await smartScraper(apiKey, url, prompt);
    console.log("Extracted Reviews:", response.result);

    if (response && response.result) {
      console.log("Extracted Reviews:", response.result);
      return response.result; // Returning the extracted reviews as JSON
    } else {
      throw new Error("No reviews found in the response.");
    }
  } catch (error) {
    console.error("Error extracting reviews:", error.message);
    return {
      reviews_count: 0,
      reviews: [],
      error: "Failed to extract reviews from the provided URL.",
    };
  }
};

export { extractReviews };
