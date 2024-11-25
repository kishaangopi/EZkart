"use client";

import { Button } from "@/components/Button";
import { ScrapedDataType } from "../types";
import ProductContainer from "./ProductContainer";
import { useRouter } from "next/navigation";

interface ProductPageProps {
  scrapedData: ScrapedDataType;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProductPage: React.FC<ProductPageProps> = ({
  scrapedData,
  setShowSearch,
}) => {
  const router = useRouter();
  const clearLocalSotrage = () => {
    localStorage.removeItem("scrapedData");
    window.location.reload();
  };

  return (
    <div className="scrollbarHidden h-full overflow-y-scroll px-10 pb-10">
      <div className="flex items-center justify-between">
        <h1 className="mb-5 text-xl font-semibold">
          Showing search results for
          <span className="ml-2 text-2xl font-black text-[#A657F6]">{`${scrapedData.searchString}`}</span>
        </h1>
        <div className="flex gap-2">
          <Button content="Search" setShowSearch={setShowSearch} />
          <button
            className="rounded-sm border-2 border-red-500 px-3 py-2"
            onClick={clearLocalSotrage}
          >
            Clear
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {scrapedData.amazon[0].productName != "not choosen" && (
          <ProductContainer title="Amazon" data={scrapedData.amazon} />
        )}
        <ProductContainer title="Flipkart" data={scrapedData.flipkart} />
      </div>
    </div>
  );
};
