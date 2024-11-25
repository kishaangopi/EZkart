export interface ProductType {
  productName: string;
  productDescription: string;
  productPrice: string;
  productImageLink: string;
  productLink: string;
  productRating: string;
}

export interface ScrapedDataType {
  amazon: ProductType[];
  flipkart: ProductType[];
  myntra: ProductType[];
  empty: boolean;
  searchString: string;
}

export interface userType {
  email: string;
  name: string;
  image: string;
  provider: string;
  accountId: string;
  amazon: boolean;
  flipkart: boolean;
  myntra: boolean;
  meesho: boolean;
}
