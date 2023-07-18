import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    profileID: { type: String },
    name: { type: String },
    email: { type: String },
    savedRecipes: [{type: mongoose.Schema.Types.ObjectId, ref: "recipe"}],
});

export const UserModel = mongoose.model("users", UserSchema);