// reviewsService.js (or your specific service file)
import puppeteer from 'puppeteer';

/**
 * Function to scrape reviews using Puppeteer for the given URL.
 * @param {string} url - The URL of the product to scrape reviews from.
 * @param {number} page - The current page for pagination.
 * @param {number} maxPages - The maximum number of pages to scrape.
 * @returns {Object} - Reviews data including review count and reviews.
 */
const extractReviewsWithPuppeteer = async (url, page, maxPages) => {
  let allReviews = [];
  let totalReviewsCount = 0;

  try {
    const browser = await puppeteer.launch({ headless: true }); // Launch the browser
    const pageInstance = await browser.newPage(); // Open a new page

    // Loop through pages if there are multiple pages
    for (let currentPage = 1; currentPage <= maxPages; currentPage++) {
      const currentPageUrl = `${url}?page=${currentPage}`;
      console.log(`Fetching reviews from: ${currentPageUrl}`);

      await pageInstance.goto(currentPageUrl, { waitUntil: 'domcontentloaded' }); // Wait until the page content is loaded

      // Get reviews (you may need to adjust the selector based on the site's structure)
      const reviews = await pageInstance.evaluate(() => {
        const reviewsArray = [];
        const reviewElements = document.querySelectorAll('.review'); // Adjust this selector based on the website

        reviewElements.forEach((reviewElement) => {
          const title = reviewElement.querySelector('.review-title')?.innerText || null;
          const body = reviewElement.querySelector('.review-body')?.innerText || null;
          const rating = parseFloat(reviewElement.querySelector('.review-rating')?.innerText || 0);
          const reviewer = reviewElement.querySelector('.reviewer-name')?.innerText || null;

          reviewsArray.push({
            title,
            body,
            rating,
            reviewer,
          });
        });

        return reviewsArray;
      });

      // If reviews are found on the current page, add them to the list
      if (reviews.length > 0) {
        allReviews = allReviews.concat(reviews);
        totalReviewsCount += reviews.length;
      } else {
        console.log(`No reviews found on page ${currentPage}. Stopping pagination.`);
        break; // Stop if no reviews are found
      }
    }

    await browser.close(); // Close the browser once done

    return {
      reviews_count: totalReviewsCount,
      reviews: allReviews,
    };
  } catch (error) {
    console.error("Error extracting reviews with Puppeteer:", error.message);
    return {
      reviews_count: 0,
      reviews: [],
      error: "Failed to extract reviews using Puppeteer.",
    };
  }
};

export { extractReviewsWithPuppeteer };

