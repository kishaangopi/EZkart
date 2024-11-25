"use client";

import { ProductType } from "../types";
import "../globals.css";

interface ProductCardProps {
  data: ProductType;
}
const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const ratingRegex = /(\d+\.?\d*)/;
  const match = ratingRegex.exec(data.productRating);

  return (
    <div className="min-w-[240px] rounded-sm">
      <a
        className="flex h-[210px] w-full items-center justify-center rounded-t-sm bg-white"
        href={data.productLink}
      >
        <img
          src={data.productImageLink}
          alt=""
          className="h-[200px] w-[200px] rounded-t-sm object-contain"
        />
      </a>
      <div className="rounded-b-sm border p-2">
        <h3 className="text-base text-gray-100">
          {" "}
          {data.productName.length > 50
            ? `${data.productName.slice(0, 58)}...`
            : data.productName}
        </h3>
        <p className="text text-lg font-bold">
          Rating : {match ? match[1] : "-"}/5
        </p>
        <p className="mt-1 text-2xl font-semibold text-[#A657F6]">
          {data.productPrice}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
