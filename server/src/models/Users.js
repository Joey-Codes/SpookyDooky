import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  profileID: { type: String },
  name: { type: String },
  email: { type: String },
  savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipe" }],
});

export const UserModel = mongoose.model("users", UserSchema);

/* UserSchema.pre('save', function (next) {
  const user = this;
  const token = generateToken(user._id);
  user.token = token; // Store the token in the user instance
  next();
});

const generateToken = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);
  return token;
};
 */