import mongoose from "mongoose";
import { Schema } from "mongoose";

const profileSchema = new Schema({
  amazon: { type: Boolean, required: true, default: true },
  flipkart: { type: Boolean, required: true, default: true },
  myntra: { type: Boolean, required: true, default: false },
  meesho: { type: Boolean, required: true, default: false },
  image: { type: String, required: true },
  accountId: { type: String, required: true },
  provider: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
});

export const Profile =
  mongoose.models.Profile || mongoose.model("Profile", profileSchema);
