import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "@/libs/MongoClient";
import { connectDB } from "@/libs/Mongoose";
import { Profile } from "@/models/Profile";

export const options = {
  adapter: MongoDBAdapter(client),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      await connectDB();
      console.log(account);
      const existingProfile = await Profile.findOne({
        accountId: account?.providerAccountId,
      });
      if (!existingProfile) {
        const newProfile = new Profile({
          accountId: account?.providerAccountId,
          provider: account?.provider,
          email: user.email,
          name: user.name,
          image: user.image,
        });
        await newProfile.save();
      }

      return true;
    },
    async redirect() {
      return "/search";
    },
  },

  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
