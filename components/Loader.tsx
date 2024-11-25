import React from "react";
import "../app/globals.css";

export const Loader = () => {
  return (
    <div className="absolute left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-black">
      <span className="loader"></span>
    </div>
  );
};
