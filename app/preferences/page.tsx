"use client";
import { useEffect, useState } from "react";
import { MdLogout } from "react-icons/md";
import Choices from "./Choices";
import axios from "axios";
import { Loader } from "@/components/Loader";
import { userType } from "../types";
import { signOut } from "next-auth/react";

const page = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<userType>({
    name: "",
    email: "",
    provider: "",
    accountId: "",
    image: "",
    amazon: false,
    flipkart: false,
    myntra: false,
    meesho: false,
  });
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await axios
        .get("/api/preferences")
        .catch((err) => {
          console.log(err);
        })
        .then((res) => {
          if (res?.data) setUser(res.data);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "Amazon")
      setUser((prev) => ({ ...prev, amazon: !prev.amazon }));
    else if (e.target.name === "Flipkart")
      setUser((prev) => ({ ...prev, flipkart: !prev.flipkart }));
    else if (e.target.name === "Myntra")
      setUser((prev) => ({ ...prev, myntra: !prev.myntra }));
    else if (e.target.name === "Meesho")
      setUser((prev) => ({ ...prev, meesho: !prev.meesho }));
  };

  const handleSubmitPreference = async () => {
    await axios
      .post("/api/preferences", user)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  if (loading) return <Loader />;
  else
    return (
      <div className="h-screen w-screen bg-black text-white">
        <div className="absolute left-1/2 top-1/2 flex w-[85%] -translate-x-1/2 -translate-y-1/2 gap-[60px]">
          <div className="flex flex-col gap-8 rounded-md border-2 border-[#A657F6] p-9">
            <h1 className="text-2xl font-semibold">
              Set your preferences for product search
            </h1>
            <div className="flex flex-col gap-4">
              <Choices
                state={user?.amazon}
                name="Amazon"
                handleChange={handleChange}
              />
              <Choices
                state={user?.flipkart}
                name="Flipkart"
                handleChange={handleChange}
              />
              <Choices
                state={user?.myntra}
                name="Myntra"
                handleChange={handleChange}
              />
              <Choices
                state={user?.meesho}
                name="Meesho"
                handleChange={handleChange}
              />
            </div>
            <button
              className="w-fit rounded-sm bg-[#A657F6] px-4 py-2 text-lg font-medium text-black outline-none"
              onClick={handleSubmitPreference}
            >
              Save Preferences
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-6 rounded-md bg-[#21262C] p-10">
            <div className="flex items-center gap-10">
              <img
                src={`${user.image == "" ? "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" : user.image}`}
                alt="userImage"
                className="h-[120px] w-[120px] rounded-full bg-white object-cover"
              />
              <div className="text-xs text-gray-300">
                <button className="mb-2 rounded-md border border-white px-2 py-1 text-base text-white">
                  Upoad new photo
                </button>
                <p>At least 800x800 px recommended</p>
                <p>JPG or PNG is allowed</p>
              </div>
            </div>
            <div className="rounded-md border border-white p-4">
              <h3 className="mb-2 text-lg font-semibold">
                Personal Information
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-gray-400">Full Name</span>
                  <span className="font text-base font-medium">
                    {user?.name}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-gray-400">Email</span>
                  <span className="font text-base font-medium">
                    {user?.email}
                  </span>
                </div>
              </div>
            </div>
            <button
              className="flex w-full items-center justify-center gap-2 rounded-sm bg-red-600 py-1 font-medium text-black"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <MdLogout />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    );
};
export default page;
