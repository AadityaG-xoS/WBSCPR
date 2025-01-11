import puppeteer from 'puppeteer';

/**
 * Extract reviews using Puppeteer from a product URL with pagination support.
 * @param {string} url - The product URL to scrape reviews from.
 * @param {number} page - The page number to scrape.
 * @param {number} maxPages - The number of pages to scrape.
 * @returns {Object} - An object containing reviews and an optional error.
 */
export const extractReviewsWithPuppeteer = async (url, page, maxPages) => {
  let reviews = [];
  let error = null;

  try {
    const browser = await puppeteer.launch();
    const pageInstance = await browser.newPage();

    await pageInstance.goto(url, { waitUntil: 'networkidle2' });

    // Use page and maxPages to navigate to multiple pages if needed
    for (let i = 1; i <= maxPages; i++) {
      const reviewsOnPage = await pageInstance.evaluate(() => {
        const reviewElements = document.querySelectorAll('.review');  // Update this selector based on actual page structure
        return Array.from(reviewElements).map(review => ({
          username: review.querySelector('.username').innerText,
          rating: review.querySelector('.rating').innerText,
          comment: review.querySelector('.comment').innerText,
        }));
      });

      reviews = reviews.concat(reviewsOnPage);
      
      if (i < maxPages) {
        // Move to the next page (adjust based on actual pagination button structure)
        const nextPageButton = await pageInstance.$('.next-page');
        if (nextPageButton) {
          await nextPageButton.click();
          await pageInstance.waitForSelector('.review', { visible: true });
        }
      }
    }

    await browser.close();

    return { reviews, error };
  } catch (err) {
    error = `Error during Puppeteer scraping: ${err.message}`;
    console.error(error);
    return { reviews: [], error };
  }
};

