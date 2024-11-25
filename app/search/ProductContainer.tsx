"use client";

import { ProductType } from "../types";
import ProductCard from "./ProductCard";

interface ProductContainerProps {
  title: string;
  data: ProductType[];
}

const ProductContainer: React.FC<ProductContainerProps> = ({ title, data }) => {
  return (
    <div>
      <h1 className="mb-5 text-2xl font-bold">{title}</h1>
      <div className="scrollStyled2 flex h-fit gap-5 overflow-x-scroll py-2">
        {data?.map((item) => {
          return <ProductCard data={item} />;
        })}
      </div>
    </div>
  );
};

export default ProductContainer;
