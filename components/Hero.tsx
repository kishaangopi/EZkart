"use client";
import { signIn } from "next-auth/react";
import heroImage from "../assets/backgroud.jpg";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
import { userType } from "@/app/types";
import { useRouter } from "next/navigation";

interface homeProps {
  user: userType;
}

const Hero: React.FC<homeProps> = ({ user }) => {
  const router = useRouter();
  return (
    <div className="flex h-[100vh] items-center justify-center pl-[100px] text-white">
      <div className="max-w-[700px]">
        <h1 className="text-[50px] font-black">
          Find the Best Deals Instantly with EZkart
        </h1>
        <p className="mb-4 text-2xl font-medium text-[#A657F6]">
          Compare prices across top online stores effortlessly
        </p>
        <p>
          Tired of hopping between different online stores to find the best
          prices for your favorite products? With EZkart, you can search once
          and see results from multiple platforms like Amazon, Flipkart, and
          more. Save time, save money, and shop smarter with EZkart!
        </p>
        <button
          className="mt-8 rounded-md bg-[#A657F6] px-4 py-3 font-semibold text-black"
          onClick={() => {
            if (user != null) router.push("/search");
            else return signIn("google");
          }}
        >
          <span>Login to Start Browsing</span>
          <FaArrowRightLong className="ml-2 inline" />
        </button>
      </div>
      <Image
        src={heroImage}
        alt="heroImage"
        width={450}
        className="custom-shadow mx-auto rounded-xl"
      />
    </div>
  );
};

export default Hero;
