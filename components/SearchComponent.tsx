import { ScrapedDataType } from "@/app/types";
import axios from "axios";
import React, { KeyboardEvent, useState } from "react";
import { IoSearch } from "react-icons/io5";

interface SearchComponentProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  setScrapedData: React.Dispatch<React.SetStateAction<ScrapedDataType>>;
}

export const SearchComponent: React.FC<SearchComponentProps> = ({
  setLoading,
  setShowSearch,
  setScrapedData,
}) => {
  const [search, setSearch] = useState("");

  const handleSubmit = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setShowSearch(false);
      setLoading(true);
      await axios
        .post("/api/search", { query: search })
        .catch((err) => {
          console.log(err);
        })
        .then((res) => {
          if (res?.data) {
            setScrapedData(res.data);
            localStorage.setItem("scrapedData", JSON.stringify(res.data));
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
    if (e.key === "Escape") setShowSearch(false);
  };

  return (
    <div className="absolute left-0 top-0 z-10 flex h-screen w-screen items-center justify-center backdrop-blur-sm">
      <div className="custom-shadow flex w-[700px] items-center gap-5 rounded-lg border bg-black p-5">
        <IoSearch className="h-8 w-8" />
        <input
          type="text"
          autoFocus
          placeholder="Search for products"
          className="w-full bg-black text-lg text-white outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSubmit}
        />
      </div>
    </div>
  );
};
