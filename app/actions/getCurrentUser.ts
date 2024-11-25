import { Profile } from "@/models/Profile";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

export default async function getCurrentUser() {
  try {
    const session = await getServerSession(options);

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await Profile.findOne({
      email: session?.user?.email,
    });
    const plainUser = currentUser.toObject();
    plainUser._id = plainUser._id.toString();

    if (!currentUser) return null;
    return {
      ...plainUser,
    };
  } catch (e: any) {
    return null;
  }
}
