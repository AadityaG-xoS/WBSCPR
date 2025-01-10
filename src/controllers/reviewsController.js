import { extractReviews } from "../services/reviewsService.js";

const getReviews = async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      reviews_count: 0,
      reviews: [],
      error: "URL parameter is required.",
    });
  }

  try {
    const reviewsData = await extractReviews(url);

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
