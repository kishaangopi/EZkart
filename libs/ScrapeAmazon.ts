import { ProductType, ScrapedDataType } from "@/app/types";

const puppeteer = require("puppeteer");

export async function scrapeAmazon(query: string) {
  const searchQuery = query.replace(/\s+/g, "+");
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  const searchUrl = `https://www.amazon.in/s?k=${searchQuery}`;
  try {
    await page.goto(searchUrl, {
      waitUntil: "domcontentloaded",
    });

    // Scraping logic
    const amazonData = await page.evaluate(() => {
      const productElements = document.querySelectorAll(
        ".a-section.a-spacing-base.a-text-center, .puisg-row, .a-section.a-spacing-base",
      );
      const AmazonResults: ProductType[] = [];

      productElements.forEach((productElement) => {
        const productName =
          productElement.querySelector(".a-size-base-plus.a-color-base")
            ?.innerText ||
          productElement.querySelector(
            ".a-size-medium.a-color-base.a-text-normal",
          )?.innerText;
        const productRating =
          productElement.querySelector(".a-icon-alt")?.innerText;
        const productDescription =
          productElement.querySelector(
            ".a-size-base-plus.a-color-base.a-text-normal",
          )?.innerText || "";
        const productPrice =
          productElement.querySelector(".a-offscreen")?.innerText;

        const productImageLink =
          productElement.querySelector(".s-image.s-image-optimized-rendering")
            ?.src || productElement.querySelector(".s-image")?.src;
        const productLink =
          productElement.querySelector(
            ".a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal",
          )?.href ||
          productElement.querySelector(".a-link-normal.s-no-outline")?.href;

        if (productName && productPrice && productLink) {
          AmazonResults.push({
            productName,
            productDescription,
            productPrice,
            productImageLink,
            productLink,
            productRating,
          });
        }
      });
      return AmazonResults;
    });

    return amazonData;
  } catch (error) {
    console.error("Error while scraping Amazon:", error);
  } finally {
    // Close the browser
    await browser.close();
  }
}
