"use client";
import { useEffect, useState } from "react";
import { Loader } from "@/components/Loader";
import { SearchComponent } from "@/components/SearchComponent";
import { Button } from "@/components/Button";
import { ScrapedDataType } from "../types";
import { ProductPage } from "./ProductPage";

const page = () => {
  const [scrapedData, setScrapedData] = useState<ScrapedDataType>({
    amazon: [],
    flipkart: [],
    myntra: [],
    empty: true,
    searchString: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("scrapedData");
    if (data) {
      setScrapedData(JSON.parse(data));
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div
      className={`h-screen overflow-y-hidden bg-black ${!scrapedData.empty ? "pt-[90px]" : "flex items-center justify-center"} text-white`}
    >
      {!showSearch && !loading && scrapedData.empty && (
        <div className="text-center">
          <h1 className="text-lg font-medium">
            Click on the button to search for a product
          </h1>
          <Button content="Search" setShowSearch={setShowSearch} />
        </div>
      )}
      {showSearch && (
        <SearchComponent
          setLoading={setLoading}
          setShowSearch={setShowSearch}
          setScrapedData={setScrapedData}
        />
      )}
      {loading && <Loader />}
      {!scrapedData.empty && (
        <ProductPage scrapedData={scrapedData} setShowSearch={setShowSearch} />
      )}
    </div>
  );
};

export default page;
