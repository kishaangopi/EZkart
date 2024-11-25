"use client";

import React, { Children } from "react";

interface ButtonProps {
  content: string;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Button: React.FC<ButtonProps> = ({ content, setShowSearch }) => {
  const handleClick = () => {
    setShowSearch(true);
  };
  return (
    <button
      className="rounded-sm bg-[#A657F6] px-4 py-2 font-semibold text-black"
      onClick={handleClick}
    >
      <span>{content}</span>
    </button>
  );
};
