import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  profileID: { type: String },
  name: { type: String },
  email: { type: String },
});

export const UserModel = mongoose.model("users", UserSchema);
