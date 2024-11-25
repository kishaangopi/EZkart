import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import getCurrentUser from "./actions/getCurrentUser";
import { Toaster } from "react-hot-toast";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EZkart",
  description: "Find the Best Deals Instantly with EZkart",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={rubik.className}>
        <Toaster position="bottom-center" reverseOrder={false} />
        <Navbar user={currentUser} />
        {children}
      </body>
    </html>
  );
}
