import Hero from "@/components/Hero";
import "./globals.css";
import { get } from "http";
import getCurrentUser from "./actions/getCurrentUser";

export default async function Home() {
  const currentUser = await getCurrentUser();
  return (
    <div className="bg-black">
      <Hero user={currentUser} />
    </div>
  );
}
