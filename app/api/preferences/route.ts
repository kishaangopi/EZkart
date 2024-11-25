import getCurrentUser from "@/app/actions/getCurrentUser";
import { Profile } from "@/models/Profile";
import { NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export const GET = async () => {
  try {
    const currentUser = await getCurrentUser();
    return NextResponse.json(currentUser);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 },
    );
  }
};

export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(options);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "User not found" });
    }
    const newData = await req.json();
    const updatedProfile = await Profile.findOneAndUpdate(
      { email: session?.user?.email },
      newData,
    );

    return NextResponse.json(updatedProfile);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch user" });
  }
};
