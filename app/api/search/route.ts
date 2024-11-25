import { scrapeAmazon } from "@/libs/ScrapeAmazon";
import { NextResponse } from "next/server";
import { ScrapedDataType } from "@/app/types";
import { scrapeFlipkart } from "@/libs/ScrapeFlipkart";
import getCurrentUser from "@/app/actions/getCurrentUser";

export const POST = async (req: Request) => {
  const { query } = await req.json();
  const currentUser = await getCurrentUser();
  let ScrapedResults: ScrapedDataType = {
    amazon: [],
    flipkart: [],
    myntra: [],
    empty: true,
    searchString: query,
  };
  try {
    const amazonResults = currentUser.amazon
      ? await scrapeAmazon(query)
      : [{ productName: "not choosen" }];
    const flipkartResults = currentUser.flipkart
      ? await scrapeFlipkart(query)
      : [{ productName: "not choosen" }];
    ScrapedResults.amazon = amazonResults;
    ScrapedResults.flipkart = flipkartResults;
    ScrapedResults.empty = false;
  } catch (e) {
    console.log(e);
  }
  return NextResponse.json(ScrapedResults);
};
