import { ProductType } from "@/app/types";

const puppeteer = require("puppeteer");

export async function scrapeFlipkart(query: string) {
  const searchQuery = query.replace(/\s+/g, "+");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const searchUrl = `https://www.flipkart.com/search?q=${searchQuery}`;
  console.log(searchUrl);
  try {
    await page.goto(searchUrl, { waitUntil: "domcontentloaded" });

    // Scraping logic using CSS selectors
    const flipkartData = await page.evaluate(() => {
      const productElements = document.querySelectorAll(
        "._1sdMkc.LFEi7Z, .slAVV4, ._75nlfW",
      );
      const FlipkartResults: ProductType[] = [];

      productElements.forEach((productElement) => {
        const productName =
          productElement.querySelector(".syl9yP")?.innerText ||
          productElement.querySelector(".wjcEIp")?.innerText ||
          productElement.querySelector(".KzDlHZ")?.innerText;
        const productDescription =
          productElement.querySelector(".WKTcLC.BwBZTg")?.innerText ||
          productElement.querySelector(".NqpwHC")?.innerText;
        const productPrice = productElement.querySelector(".Nx9bqj")?.innerText;
        const productImageLink =
          productElement.querySelector("._53J4C-")?.src ||
          productElement.querySelector(".DByuf4")?.src;
        const productLink =
          productElement.querySelector(".WKTcLC.BwBZTg")?.href ||
          productElement.querySelector(".VJA3rP")?.href ||
          productElement.querySelector(".CGtC98")?.href;

        const productRating =
          productElement.querySelector(".XQDdHH")?.innerText;
        FlipkartResults.push({
          productName,
          productDescription,
          productPrice,
          productImageLink,
          productLink,
          productRating, // Assuming product rating isn't available in this context
        });
      });
      return FlipkartResults;
    });

    return flipkartData;
  } catch (error) {
    console.error("Error while scraping Flipkart:", error);
  } finally {
    await browser.close();
  }
}
