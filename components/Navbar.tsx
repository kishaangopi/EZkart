"use client";

import Link from "next/link";
import { UserDetails } from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface NavbarProps {
  user: UserDetails | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const router = useRouter();
  const handleRouting = (route: string) => {
    if (user) {
      router.push(`/${route}`);
    } else {
      toast.error("Login to view the content");
    }
  };
  return (
    <div className="fixed left-0 top-0 z-20 flex w-full items-center justify-center bg-black text-white">
      <div className="flex w-[90%] items-center justify-between border-b-[1px] border-[#414141] px-8 py-3">
        <h1 className="text-3xl font-bold text-[#A657F6]">EZkart</h1>
        <div className="flex items-center gap-10">
          <Link
            href={"/"}
            className="cursor-pointer font-medium hover:text-[#A657F6]"
          >
            Home
          </Link>
          <a
            onClick={() => handleRouting("search")}
            className="cursor-pointer font-medium hover:text-[#A657F6]"
          >
            Search
          </a>
          <a
            onClick={() => handleRouting("preferences")}
            className="cursor-pointer font-medium hover:text-[#A657F6]"
          >
            Preferences
          </a>
        </div>
        <Image
          src={`${user ? user.image : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"} `}
          alt="userImage"
          className="h-10 w-10 cursor-pointer rounded-full bg-white object-cover"
          width={40}
          height={40}
        />
      </div>
    </div>
  );
};

export default Navbar;
